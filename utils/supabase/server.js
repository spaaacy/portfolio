import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Read-only server client for Server Components.
// Cookie mutation must happen in middleware (or a Route Handler / Server Action).
export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY");
  }

  const cookieStore = cookies();

  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll() {
        // no-op: Server Components can't write cookies.
      },
    },
  });
}

