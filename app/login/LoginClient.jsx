"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

export default function LoginClient() {
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next") || "/timesheet";

  const supabase = useMemo(() => createClient(), []);

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    if (!supabase) return;

    let isMounted = true;

    supabase.auth.getUser().then(({ data }) => {
      if (!isMounted) return;
      setUserEmail(data?.user?.email || "");
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserEmail(session?.user?.email || "");
    });

    return () => {
      isMounted = false;
      subscription?.unsubscribe();
    };
  }, [supabase]);

  async function sendMagicLink(e) {
    e.preventDefault();
    if (!supabase) return;
    setStatus({ type: "loading", message: "" });

    const redirectTo = `${window.location.origin}${nextPath}`;

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: redirectTo },
    });

    if (error) {
      setStatus({ type: "error", message: error.message });
      return;
    }

    setStatus({
      type: "success",
      message: "Check your email for a sign-in link.",
    });
  }

  async function signOut() {
    if (!supabase) return;
    setStatus({ type: "loading", message: "" });
    const { error } = await supabase.auth.signOut();
    if (error) {
      setStatus({ type: "error", message: error.message });
      return;
    }
    setStatus({ type: "idle", message: "" });
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-2xl border border-black/10 bg-white/70 backdrop-blur p-6 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-neutral-900">Sign in</h1>
            <p className="text-sm text-neutral-600 mt-1">Use a magic link to access Timesheet.</p>
          </div>
          <Link href="/" className="text-sm text-neutral-600 hover:text-neutral-900 underline underline-offset-4">
            Back
          </Link>
        </div>

        {!supabase ? (
          <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
            <p className="text-sm text-amber-900 font-medium">Supabase env vars are not set.</p>
            <p className="mt-2 text-xs text-amber-900/80">
              Add <code className="font-mono">NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
              <code className="font-mono">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to your environment and restart the dev
              server.
            </p>
          </div>
        ) : userEmail ? (
          <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
            <p className="text-sm text-emerald-900">
              Signed in as <span className="font-medium">{userEmail}</span>
            </p>
            <div className="flex items-center gap-3 mt-3">
              <Link
                href={nextPath}
                className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-black transition"
              >
                Go to Timesheet
              </Link>
              <button
                type="button"
                onClick={signOut}
                className="inline-flex items-center justify-center rounded-full border border-neutral-900/20 px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-50 transition"
              >
                Sign out
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={sendMagicLink} className="mt-6">
            <label className="text-sm font-medium text-neutral-800" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/30"
            />

            <button
              type="submit"
              disabled={status.type === "loading"}
              className="mt-4 w-full rounded-xl bg-neutral-900 px-4 py-3 text-sm font-semibold text-white hover:bg-black transition disabled:opacity-60 disabled:hover:bg-neutral-900"
            >
              {status.type === "loading" ? "Sending..." : "Send magic link"}
            </button>
          </form>
        )}

        {status.type === "error" && (
          <p className="mt-4 text-sm text-red-600" role="alert">
            {status.message}
          </p>
        )}
        {status.type === "success" && (
          <p className="mt-4 text-sm text-emerald-700" role="status">
            {status.message}
          </p>
        )}

        <p className="mt-6 text-xs text-neutral-500">
          You’ll need a Supabase project configured with Auth and the Timesheet migration applied.
        </p>
      </div>
    </div>
  );
}

