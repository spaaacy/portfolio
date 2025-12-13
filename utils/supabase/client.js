import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    // Avoid crashing during static generation / server render when envs
    // aren't available yet. Callers should handle a null client.
    return null;
  }

  return createBrowserClient(url, anonKey);
}

