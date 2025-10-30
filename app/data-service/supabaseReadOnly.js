import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function getServerSupabaseClientReadyOnly() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_ANON_KEY,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value;
        },
        // ⛔ no set/remove here – read-only
      },
    }
  );
}
