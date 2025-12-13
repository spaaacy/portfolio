"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SereneBackground from "@/components/SereneBackground";
import { createClient } from "@/utils/supabase/client";

const ACTIVE_SESSION_STORAGE_KEY = "timesheet:activeSessionId";
const DAY_MS = 24 * 60 * 60 * 1000;

function startOfDay(d) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0);
}

function startOfWeekMonday(d) {
  const day = (d.getDay() + 6) % 7; // Mon=0..Sun=6
  const s = startOfDay(d);
  s.setDate(s.getDate() - day);
  return s;
}

function startOfMonth(d) {
  return new Date(d.getFullYear(), d.getMonth(), 1, 0, 0, 0, 0);
}

function endOfDay(d) {
  const e = startOfDay(d);
  e.setDate(e.getDate() + 1);
  return e;
}

function endOfWeekMonday(d) {
  const e = startOfWeekMonday(d);
  e.setDate(e.getDate() + 7);
  return e;
}

function endOfMonth(d) {
  return new Date(d.getFullYear(), d.getMonth() + 1, 1, 0, 0, 0, 0);
}

function formatHMS(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function formatHours(ms) {
  const totalMinutes = Math.round(ms / 60000);
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  if (h <= 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

function durationWithin(session, rangeStart, rangeEnd, now) {
  const sStart = new Date(session.started_at).getTime();
  const sEnd = (session.ended_at ? new Date(session.ended_at) : now).getTime();

  const start = Math.max(sStart, rangeStart.getTime());
  const end = Math.min(sEnd, rangeEnd.getTime());

  return Math.max(0, end - start);
}

export default function TimesheetPage() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  const [user, setUser] = useState(null);
  const [activeSession, setActiveSession] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mutating, setMutating] = useState(false);
  const [error, setError] = useState("");

  const [tick, setTick] = useState(0);
  const tickTimerRef = useRef(null);

  const now = new Date();

  const dayStart = startOfDay(now);
  const dayEnd = endOfDay(now);
  const weekStart = startOfWeekMonday(now);
  const weekEnd = endOfWeekMonday(now);
  const monthStart = startOfMonth(now);
  const monthEnd = endOfMonth(now);

  const effectiveSessions = useMemo(() => {
    // If we have an active session but sessions list hasn't loaded it yet, include it.
    if (!activeSession) return sessions;
    const already = sessions.some((s) => s.id === activeSession.id);
    return already ? sessions : [activeSession, ...sessions];
  }, [activeSession, sessions]);

  const totals = useMemo(() => {
    const nowDate = new Date();
    const nowMs = nowDate.getTime();

    const today = effectiveSessions.reduce((acc, s) => acc + durationWithin(s, dayStart, dayEnd, nowDate), 0);
    const week = effectiveSessions.reduce((acc, s) => acc + durationWithin(s, weekStart, weekEnd, nowDate), 0);
    const month = effectiveSessions.reduce((acc, s) => acc + durationWithin(s, monthStart, monthEnd, nowDate), 0);

    const elapsedDays = Math.floor((dayStart.getTime() - monthStart.getTime()) / DAY_MS) + 1;
    const avgPerDay = elapsedDays > 0 ? Math.round(month / elapsedDays) : 0;

    return { today, week, month, avgPerDay, nowMs };
  }, [effectiveSessions, dayEnd, dayStart, monthEnd, monthStart, weekEnd, weekStart]);

  const elapsedActiveMs = useMemo(() => {
    if (!activeSession) return 0;
    const start = new Date(activeSession.started_at).getTime();
    const end = activeSession.ended_at ? new Date(activeSession.ended_at).getTime() : Date.now();
    return Math.max(0, end - start);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSession, tick]);

  useEffect(() => {
    if (!activeSession) {
      if (tickTimerRef.current) clearInterval(tickTimerRef.current);
      tickTimerRef.current = null;
      return;
    }
    if (tickTimerRef.current) return;
    tickTimerRef.current = setInterval(() => setTick((t) => t + 1), 1000);
    return () => {
      if (tickTimerRef.current) clearInterval(tickTimerRef.current);
      tickTimerRef.current = null;
    };
  }, [activeSession]);

  useEffect(() => {
    let isMounted = true;

    async function bootstrap() {
      setLoading(true);
      setError("");

      if (!supabase) {
        setError("Supabase env vars are not set (NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY).");
        setLoading(false);
        return;
      }

      const { data, error: userError } = await supabase.auth.getUser();
      if (userError) {
        setError(userError.message);
        setLoading(false);
        return;
      }

      if (!data?.user) {
        router.replace("/login?next=/timesheet");
        return;
      }

      if (!isMounted) return;
      setUser(data.user);

      await refreshSessionsAndActive(data.user);
      if (!isMounted) return;
      setLoading(false);
    }

    bootstrap();

    if (!supabase) return () => {};

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      isMounted = false;
      subscription?.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function refreshSessionsAndActive(currentUser) {
    if (!supabase) return;
    setError("");
    let nextActive = null;

    // Resume: try localStorage first
    let storedId = "";
    try {
      storedId = window.localStorage.getItem(ACTIVE_SESSION_STORAGE_KEY) || "";
    } catch {
      storedId = "";
    }

    if (storedId) {
      const { data: byId, error: byIdError } = await supabase
        .from("timesheet_sessions")
        .select("id, user_id, started_at, ended_at")
        .eq("id", storedId)
        .maybeSingle();

      if (!byIdError && byId && !byId.ended_at) {
        nextActive = byId;
      } else {
        try {
          window.localStorage.removeItem(ACTIVE_SESSION_STORAGE_KEY);
        } catch {
          // ignore
        }
      }
    }

    // If no active session found yet, try querying for an open one.
    if (!nextActive) {
      const { data: open, error: openError } = await supabase
        .from("timesheet_sessions")
        .select("id, user_id, started_at, ended_at")
        .eq("user_id", currentUser.id)
        .is("ended_at", null)
        .order("started_at", { ascending: false })
        .limit(1);

      if (!openError && open?.[0]) {
        nextActive = open[0];
        try {
          window.localStorage.setItem(ACTIVE_SESSION_STORAGE_KEY, open[0].id);
        } catch {
          // ignore
        }
      }
    }

    setActiveSession(nextActive);

    const earliest = weekStart < monthStart ? weekStart : monthStart;

    const { data: recent, error: recentError } = await supabase
      .from("timesheet_sessions")
      .select("id, user_id, started_at, ended_at")
      .eq("user_id", currentUser.id)
      .gte("started_at", earliest.toISOString())
      .lt("started_at", monthEnd.toISOString())
      .order("started_at", { ascending: false })
      .limit(500);

    if (recentError) {
      setError(recentError.message);
      return;
    }

    // If active session started after `monthEnd` isn't possible, but keep it robust.
    setSessions(recent || []);

    // If an active session is running, make sure the elapsed timer ticks.
    if (nextActive && !nextActive.ended_at) {
      setTick((t) => t + 1);
    }
  }

  async function onStart() {
    if (!user) return;
    if (!supabase) return;
    if (mutating) return;
    setMutating(true);
    setError("");

    try {
      // Avoid multiple overlapping sessions: reuse an existing open row if it exists.
      const { data: open, error: openError } = await supabase
        .from("timesheet_sessions")
        .select("id, user_id, started_at, ended_at")
        .eq("user_id", user.id)
        .is("ended_at", null)
        .order("started_at", { ascending: false })
        .limit(1);

      if (openError) throw openError;

      if (open?.[0]) {
        setActiveSession(open[0]);
        try {
          window.localStorage.setItem(ACTIVE_SESSION_STORAGE_KEY, open[0].id);
        } catch {
          // ignore
        }
        await refreshSessionsAndActive(user);
        return;
      }

      const { data: inserted, error: insertError } = await supabase
        .from("timesheet_sessions")
        .insert({
          user_id: user.id,
          started_at: new Date().toISOString(),
          ended_at: null,
        })
        .select("id, user_id, started_at, ended_at")
        .single();

      if (insertError) throw insertError;

      setActiveSession(inserted);
      try {
        window.localStorage.setItem(ACTIVE_SESSION_STORAGE_KEY, inserted.id);
      } catch {
        // ignore
      }

      await refreshSessionsAndActive(user);
    } catch (e) {
      setError(e?.message || "Failed to start session.");
    } finally {
      setMutating(false);
    }
  }

  async function onStop() {
    if (!user) return;
    if (!supabase) return;
    if (!activeSession) return;
    if (mutating) return;
    setMutating(true);
    setError("");

    try {
      const { data: updated, error: updateError } = await supabase
        .from("timesheet_sessions")
        .update({ ended_at: new Date().toISOString() })
        .eq("id", activeSession.id)
        .select("id, user_id, started_at, ended_at")
        .single();

      if (updateError) throw updateError;

      setActiveSession(null);
      try {
        window.localStorage.removeItem(ACTIVE_SESSION_STORAGE_KEY);
      } catch {
        // ignore
      }

      // Nudge totals to recalc immediately
      setTick((t) => t + 1);
      await refreshSessionsAndActive(user);
    } catch (e) {
      setError(e?.message || "Failed to stop session.");
    } finally {
      setMutating(false);
    }
  }

  async function signOut() {
    if (!supabase) return;
    setMutating(true);
    setError("");
    try {
      await supabase.auth.signOut();
      try {
        window.localStorage.removeItem(ACTIVE_SESSION_STORAGE_KEY);
      } catch {
        // ignore
      }
      router.replace("/");
    } catch (e) {
      setError(e?.message || "Failed to sign out.");
    } finally {
      setMutating(false);
    }
  }

  const isRunning = Boolean(activeSession && !activeSession.ended_at);

  return (
    <div className="relative min-h-screen w-full">
      <SereneBackground />

      <header className="relative z-10 flex items-center justify-between px-6 py-5 max-w-6xl mx-auto">
        <Link href="/" className="text-sm text-neutral-700 hover:text-neutral-900 underline underline-offset-4">
          Home
        </Link>
        <div className="flex items-center gap-3">
          <Link
            href="/projects"
            className="text-sm text-neutral-700 hover:text-neutral-900 underline underline-offset-4"
          >
            Projects
          </Link>
          <button
            type="button"
            onClick={signOut}
            disabled={mutating}
            className="text-sm rounded-full border border-black/10 bg-white/60 backdrop-blur px-4 py-2 text-neutral-900 hover:bg-white/80 transition disabled:opacity-60"
          >
            Sign out
          </button>
        </div>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-6 pb-10 pt-4">
        <div className="rounded-3xl border border-black/10 bg-white/60 backdrop-blur shadow-[0_12px_40px_rgba(0,0,0,0.08)] p-6 md:p-10">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-3xl md:text-4xl font-semibold text-neutral-900">Timesheet</h1>
            <p className="mt-2 text-sm md:text-base text-neutral-600 max-w-xl">
              Press start to begin a focus session. Press stop when you’re done — sessions are saved to your account.
            </p>

            <div className="mt-10 flex flex-col items-center">
              <div className="text-5xl md:text-6xl font-mono tracking-tight text-neutral-900">
                {isRunning ? formatHMS(elapsedActiveMs) : "00:00:00"}
              </div>
              <p className="mt-3 text-sm text-neutral-600">{isRunning ? "Focused time (running)" : "Focused time"}</p>

              <button
                type="button"
                onClick={isRunning ? onStop : onStart}
                disabled={loading || mutating}
                className={[
                  "mt-8 h-20 w-20 md:h-24 md:w-24 rounded-full font-semibold text-white shadow-[0_16px_40px_rgba(0,0,0,0.18)] transition",
                  "focus:outline-none focus:ring-4 focus:ring-black/10",
                  loading || mutating ? "opacity-60" : "hover:scale-[1.02] active:scale-[0.98]",
                  isRunning ? "bg-rose-600 hover:bg-rose-700" : "bg-emerald-600 hover:bg-emerald-700",
                ].join(" ")}
              >
                {isRunning ? "Stop" : "Start"}
              </button>
            </div>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
              <StatCard label="Today" value={formatHours(totals.today)} sub={`${dayStart.toLocaleDateString()}`} />
              <StatCard
                label="This week"
                value={formatHours(totals.week)}
                sub={`${weekStart.toLocaleDateString()} – ${new Date(weekEnd.getTime() - 1).toLocaleDateString()}`}
              />
              <StatCard
                label="This month"
                value={formatHours(totals.month)}
                sub={`${monthStart.toLocaleDateString()} – ${new Date(monthEnd.getTime() - 1).toLocaleDateString()}`}
              />
              <StatCard label="Avg/day (MTD)" value={formatHours(totals.avgPerDay)} sub="Month-to-date" />
            </div>

            {loading && <p className="mt-6 text-sm text-neutral-600">Loading your sessions…</p>}
            {!loading && user?.email && (
              <p className="mt-6 text-xs text-neutral-500">
                Signed in as <span className="font-medium">{user.email}</span>
              </p>
            )}
            {error && (
              <p className="mt-4 text-sm text-red-600" role="alert">
                {error}
              </p>
            )}
          </div>
        </div>

        <div className="mt-6 text-xs text-neutral-500 max-w-3xl">
          Tip: if you refresh the page while a session is running, it will automatically resume.
        </div>
      </main>
    </div>
  );
}

function StatCard({ label, value, sub }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white/60 backdrop-blur px-5 py-4 text-left">
      <div className="text-sm text-neutral-600">{label}</div>
      <div className="mt-2 text-2xl font-semibold text-neutral-900">{value}</div>
      <div className="mt-1 text-xs text-neutral-500">{sub}</div>
    </div>
  );
}

