"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SereneBackground from "@/components/SereneBackground";
import { createClient } from "@/utils/supabase/client";

const ACTIVE_SESSION_STORAGE_KEY = "timesheet:activeSessionId";
const DAY_MS = 24 * 60 * 60 * 1000;
const HISTORY_DEFAULT_PAGE_SIZE = 10;

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

function toDatetimeLocalValue(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const yyyy = String(d.getFullYear());
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const hh = String(d.getHours()).padStart(2, "0");
  const mi = String(d.getMinutes()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}T${hh}:${mi}`;
}

function safeDateFromDatetimeLocal(value) {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  return d;
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

  const [historyRows, setHistoryRows] = useState([]);
  const [historyCount, setHistoryCount] = useState(0);
  const [historyPage, setHistoryPage] = useState(1);
  const [historyPageSize, setHistoryPageSize] = useState(HISTORY_DEFAULT_PAGE_SIZE);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyError, setHistoryError] = useState("");
  const [historyValidationError, setHistoryValidationError] = useState("");
  const [historyCategoryFilter, setHistoryCategoryFilter] = useState("");
  const [historyCategories, setHistoryCategories] = useState([]);
  const [editingId, setEditingId] = useState("");
  const [draftStartedAt, setDraftStartedAt] = useState("");
  const [draftEndedAt, setDraftEndedAt] = useState("");
  const [draftCategory, setDraftCategory] = useState("");
  const [historyMutatingId, setHistoryMutatingId] = useState("");

  const [newSessionCategory, setNewSessionCategory] = useState("");

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
      await fetchHistoryPage(1, data.user, historyPageSize);
      await fetchHistoryCategories(data.user);
      if (!isMounted) return;
      setLoading(false);
    }

    bootstrap();

    if (!supabase) return () => { };

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

  async function fetchHistoryCategories(currentUser = user) {
    if (!supabase) return;
    if (!currentUser) return;

    const { data, error: categoriesError } = await supabase
      .from("timesheet_sessions")
      .select("category")
      .eq("user_id", currentUser.id)
      .not("ended_at", "is", null)
      .not("category", "is", null)
      .order("category", { ascending: true })
      .limit(1000);

    if (categoriesError) return;

    const uniq = new Set();
    for (const row of data || []) {
      const v = typeof row?.category === "string" ? row.category.trim() : "";
      if (v) uniq.add(v);
    }
    setHistoryCategories(Array.from(uniq).sort((a, b) => a.localeCompare(b)));
  }

  async function fetchHistoryPage(nextPage, currentUser = user, pageSize = historyPageSize) {
    if (!supabase) return { ok: false, rowsLength: 0 };
    if (!currentUser) return { ok: false, rowsLength: 0 };
    setHistoryLoading(true);
    setHistoryError("");
    setHistoryValidationError("");

    const clampedPage = Math.max(1, nextPage || 1);
    const size = Math.max(1, pageSize || HISTORY_DEFAULT_PAGE_SIZE);
    const from = (clampedPage - 1) * size;
    const to = from + size - 1;

    let query = supabase
      .from("timesheet_sessions")
      .select("id, user_id, started_at, ended_at, category", { count: "exact" })
      .eq("user_id", currentUser.id)
      .not("ended_at", "is", null)
      .order("started_at", { ascending: false });

    if (historyCategoryFilter === "__uncat__") {
      query = query.is("category", null);
    } else if (historyCategoryFilter) {
      query = query.eq("category", historyCategoryFilter);
    }

    const { data, error: historyErr, count } = await query.range(from, to);

    if (historyErr) {
      setHistoryError(historyErr.message);
      setHistoryLoading(false);
      return { ok: false, rowsLength: 0 };
    }

    const rows = data || [];
    setHistoryRows(rows);
    setHistoryCount(typeof count === "number" ? count : 0);
    setHistoryPage(clampedPage);
    setHistoryPageSize(size);

    if (editingId && !rows.some((r) => r.id === editingId)) {
      setEditingId("");
      setDraftStartedAt("");
      setDraftEndedAt("");
    }

    setHistoryLoading(false);
    return { ok: true, rowsLength: rows.length };
  }

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
        .select("id, user_id, started_at, ended_at, category")
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
        .select("id, user_id, started_at, ended_at, category")
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
      .select("id, user_id, started_at, ended_at, category")
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
        .select("id, user_id, started_at, ended_at, category")
        .eq("user_id", user.id)
        .is("ended_at", null)
        .order("started_at", { ascending: false })
        .limit(1);

      if (openError) throw openError;

      if (open?.[0]) {
        // If user entered a category and the open session doesn't have one, apply it.
        const normalizedCategory = newSessionCategory.trim() || null;
        if (normalizedCategory && !open[0].category) {
          await supabase.from("timesheet_sessions").update({ category: normalizedCategory }).eq("id", open[0].id);
        }
        setNewSessionCategory("");
        setActiveSession({ ...open[0], category: normalizedCategory || open[0].category || null });
        try {
          window.localStorage.setItem(ACTIVE_SESSION_STORAGE_KEY, open[0].id);
        } catch {
          // ignore
        }
        await refreshSessionsAndActive(user);
        return;
      }

      const normalizedCategory = newSessionCategory.trim() || null;
      const { data: inserted, error: insertError } = await supabase
        .from("timesheet_sessions")
        .insert({
          user_id: user.id,
          started_at: new Date().toISOString(),
          ended_at: null,
          category: normalizedCategory,
        })
        .select("id, user_id, started_at, ended_at, category")
        .single();

      if (insertError) throw insertError;

      setActiveSession(inserted);
      setNewSessionCategory("");
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
        .select("id, user_id, started_at, ended_at, category")
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
      await fetchHistoryPage(1, user, historyPageSize);
      await fetchHistoryCategories(user);
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
  const historyTotalPages = Math.max(1, Math.ceil((historyCount || 0) / (historyPageSize || HISTORY_DEFAULT_PAGE_SIZE)));

  return (
    <div className="relative min-h-screen w-full">
      <SereneBackground />

      <header className="relative z-10 flex items-center justify-between px-6 py-5 max-w-6xl mx-auto">

        <div className="flex items-center gap-3 ml-auto">

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

              <div className="mt-6 w-full max-w-md">
                <label className="block text-left text-xs text-neutral-600">
                  Category (optional)
                  <input
                    type="text"
                    placeholder="work, personal, etc."
                    value={newSessionCategory}
                    onChange={(e) => setNewSessionCategory(e.target.value)}
                    disabled={loading || mutating}
                    className="mt-2 w-full rounded-2xl border border-black/10 bg-white/70 backdrop-blur px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-4 focus:ring-black/10 disabled:opacity-60"
                  />
                </label>
              </div>

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

        <div className="mt-6 rounded-3xl border border-black/10 bg-white/60 backdrop-blur shadow-[0_12px_40px_rgba(0,0,0,0.08)] p-6 md:p-10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h2 className="text-xl md:text-2xl font-semibold text-neutral-900">History</h2>
              <p className="mt-1 text-sm text-neutral-600">View and edit your completed sessions.</p>
            </div>

            <div className="flex items-center gap-3">
              <label className="text-xs text-neutral-600">
                Filter{" "}
                <select
                  className="ml-2 rounded-lg border border-black/10 bg-white/70 px-2 py-1 text-xs text-neutral-900"
                  value={historyCategoryFilter}
                  onChange={async (e) => {
                    const next = e.target.value;
                    setHistoryCategoryFilter(next);
                    await fetchHistoryPage(1, user, historyPageSize);
                  }}
                  disabled={!user || historyLoading}
                >
                  <option value="">All</option>
                  <option value="__uncat__">Uncategorized</option>
                  {historyCategories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </label>
              <label className="text-xs text-neutral-600">
                Page size{" "}
                <select
                  className="ml-2 rounded-lg border border-black/10 bg-white/70 px-2 py-1 text-xs text-neutral-900"
                  value={historyPageSize}
                  onChange={async (e) => {
                    const nextSize = Number(e.target.value) || HISTORY_DEFAULT_PAGE_SIZE;
                    await fetchHistoryPage(1, user, nextSize);
                  }}
                  disabled={!user || historyLoading}
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
              </label>
            </div>
          </div>

          {historyError && (
            <p className="mt-4 text-sm text-red-600" role="alert">
              {historyError}
            </p>
          )}
          {historyValidationError && (
            <p className="mt-4 text-sm text-red-600" role="alert">
              {historyValidationError}
            </p>
          )}

          <div className="mt-6 overflow-x-auto">
            <table className="min-w-[920px] w-full text-left">
              <thead>
                <tr className="text-xs uppercase tracking-wide text-neutral-600">
                  <th className="py-2 pr-4">Category</th>
                  <th className="py-2 pr-4">Date</th>
                  <th className="py-2 pr-4">Start</th>
                  <th className="py-2 pr-4">End</th>
                  <th className="py-2 pr-4">Duration</th>
                  <th className="py-2 pr-4">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm text-neutral-900">
                {historyLoading && (
                  <tr>
                    <td className="py-4 text-neutral-600" colSpan={6}>
                      Loading history…
                    </td>
                  </tr>
                )}
                {!historyLoading && historyRows.length === 0 && (
                  <tr>
                    <td className="py-4 text-neutral-600" colSpan={6}>
                      No completed sessions yet.
                    </td>
                  </tr>
                )}
                {!historyLoading &&
                  historyRows.map((row) => {
                    const isEditing = editingId === row.id;
                    const started = new Date(row.started_at);
                    const ended = row.ended_at ? new Date(row.ended_at) : null;
                    const durationMs = ended ? Math.max(0, ended.getTime() - started.getTime()) : 0;

                    return (
                      <tr key={row.id} className="border-t border-black/5">
                        <td className="py-3 pr-4 whitespace-nowrap">
                          {isEditing ? (
                            <input
                              type="text"
                              value={draftCategory}
                              onChange={(e) => setDraftCategory(e.target.value)}
                              placeholder="work, personal, etc."
                              className="w-44 rounded-lg border border-black/10 bg-white/70 px-2 py-1 text-sm"
                              disabled={historyMutatingId === row.id}
                            />
                          ) : (
                            <span className="text-neutral-700">{row.category ? row.category : "Uncategorized"}</span>
                          )}
                        </td>
                        <td className="py-3 pr-4 whitespace-nowrap text-neutral-700">
                          {started.toLocaleDateString()}
                        </td>
                        <td className="py-3 pr-4 whitespace-nowrap">
                          {isEditing ? (
                            <input
                              type="datetime-local"
                              value={draftStartedAt}
                              onChange={(e) => setDraftStartedAt(e.target.value)}
                              className="rounded-lg border border-black/10 bg-white/70 px-2 py-1 text-sm"
                              disabled={historyMutatingId === row.id}
                            />
                          ) : (
                            <span className="text-neutral-900">{started.toLocaleString()}</span>
                          )}
                        </td>
                        <td className="py-3 pr-4 whitespace-nowrap">
                          {isEditing ? (
                            <input
                              type="datetime-local"
                              value={draftEndedAt}
                              onChange={(e) => setDraftEndedAt(e.target.value)}
                              className="rounded-lg border border-black/10 bg-white/70 px-2 py-1 text-sm"
                              disabled={historyMutatingId === row.id}
                            />
                          ) : (
                            <span className="text-neutral-900">{ended ? ended.toLocaleString() : "—"}</span>
                          )}
                        </td>
                        <td className="py-3 pr-4 whitespace-nowrap text-neutral-700">{formatHours(durationMs)}</td>
                        <td className="py-3 pr-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            {!isEditing ? (
                              <button
                                type="button"
                                className="text-xs rounded-full border border-black/10 bg-white/60 backdrop-blur px-3 py-1 text-neutral-900 hover:bg-white/80 transition disabled:opacity-60"
                                disabled={!user || historyLoading || historyMutatingId === row.id}
                                onClick={() => {
                                  setHistoryValidationError("");
                                  setEditingId(row.id);
                                  setDraftStartedAt(toDatetimeLocalValue(row.started_at));
                                  setDraftEndedAt(toDatetimeLocalValue(row.ended_at));
                                  setDraftCategory(row.category || "");
                                }}
                              >
                                Edit
                              </button>
                            ) : (
                              <>
                                <button
                                  type="button"
                                  className="text-xs rounded-full border border-black/10 bg-emerald-600 px-3 py-1 text-white hover:bg-emerald-700 transition disabled:opacity-60"
                                  disabled={!user || historyLoading || historyMutatingId === row.id}
                                  onClick={async () => {
                                    if (!supabase || !user) return;
                                    setHistoryValidationError("");
                                    setHistoryError("");

                                    const startDate = safeDateFromDatetimeLocal(draftStartedAt);
                                    const endDate = safeDateFromDatetimeLocal(draftEndedAt);

                                    if (!startDate || !endDate) {
                                      setHistoryValidationError("Please provide both a valid start and end time.");
                                      return;
                                    }
                                    if (endDate.getTime() < startDate.getTime()) {
                                      setHistoryValidationError("End time must be after start time.");
                                      return;
                                    }

                                    const normalizedCategory = draftCategory.trim() || null;
                                    setHistoryMutatingId(row.id);
                                    try {
                                      const { error: updateError } = await supabase
                                        .from("timesheet_sessions")
                                        .update({
                                          started_at: startDate.toISOString(),
                                          ended_at: endDate.toISOString(),
                                          category: normalizedCategory,
                                        })
                                        .eq("id", row.id)
                                        .select("id")
                                        .single();

                                      if (updateError) throw updateError;

                                      setEditingId("");
                                      setDraftStartedAt("");
                                      setDraftEndedAt("");
                                      setDraftCategory("");
                                      await refreshSessionsAndActive(user);
                                      await fetchHistoryPage(historyPage, user, historyPageSize);
                                      await fetchHistoryCategories(user);
                                    } catch (e) {
                                      setHistoryError(e?.message || "Failed to update session.");
                                    } finally {
                                      setHistoryMutatingId("");
                                    }
                                  }}
                                >
                                  Save
                                </button>
                                <button
                                  type="button"
                                  className="text-xs rounded-full border border-black/10 bg-white/60 backdrop-blur px-3 py-1 text-neutral-900 hover:bg-white/80 transition disabled:opacity-60"
                                  disabled={historyMutatingId === row.id}
                                  onClick={() => {
                                    setHistoryValidationError("");
                                    setEditingId("");
                                    setDraftStartedAt("");
                                    setDraftEndedAt("");
                                    setDraftCategory("");
                                  }}
                                >
                                  Cancel
                                </button>
                              </>
                            )}
                            <button
                              type="button"
                              className="text-xs rounded-full border border-black/10 bg-rose-600 px-3 py-1 text-white hover:bg-rose-700 transition disabled:opacity-60"
                              disabled={!user || historyLoading || historyMutatingId === row.id}
                              onClick={async () => {
                                if (!supabase || !user) return;
                                setHistoryValidationError("");
                                setHistoryError("");
                                const ok = window.confirm("Delete this session? This cannot be undone.");
                                if (!ok) return;

                                setHistoryMutatingId(row.id);
                                const pageBefore = historyPage;
                                try {
                                  const { error: deleteError } = await supabase
                                    .from("timesheet_sessions")
                                    .delete()
                                    .eq("id", row.id)
                                    .select("id");

                                  if (deleteError) throw deleteError;

                                  setEditingId("");
                                  setDraftStartedAt("");
                                  setDraftEndedAt("");
                                  setDraftCategory("");

                                  await refreshSessionsAndActive(user);
                                  const res = await fetchHistoryPage(pageBefore, user, historyPageSize);
                                  if (res.ok && res.rowsLength === 0 && pageBefore > 1) {
                                    await fetchHistoryPage(pageBefore - 1, user, historyPageSize);
                                  }
                                  await fetchHistoryCategories(user);
                                } catch (e) {
                                  setHistoryError(e?.message || "Failed to delete session.");
                                } finally {
                                  setHistoryMutatingId("");
                                }
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="text-xs text-neutral-600">
              {historyCount === 0 ? "0 sessions" : `${historyCount} sessions`} ·{" "}
              {historyCount === 0 ? "Page 1 of 1" : `Page ${historyPage} of ${historyTotalPages}`}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="text-xs rounded-full border border-black/10 bg-white/60 backdrop-blur px-4 py-2 text-neutral-900 hover:bg-white/80 transition disabled:opacity-60"
                disabled={!user || historyLoading || historyPage <= 1}
                onClick={async () => {
                  await fetchHistoryPage(historyPage - 1, user, historyPageSize);
                }}
              >
                Prev
              </button>
              <button
                type="button"
                className="text-xs rounded-full border border-black/10 bg-white/60 backdrop-blur px-4 py-2 text-neutral-900 hover:bg-white/80 transition disabled:opacity-60"
                disabled={!user || historyLoading || historyCount === 0 || historyPage >= historyTotalPages}
                onClick={async () => {
                  await fetchHistoryPage(historyPage + 1, user, historyPageSize);
                }}
              >
                Next
              </button>
            </div>
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

