import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!;

function getCookieName(): string {
  const projectRef = supabaseUrl.split("//")[1]?.split(".")[0] || "default";
  return `sb-${projectRef}-auth-token`;
}

export async function createServerClient() {
  const cookieStore = await cookies();
  const cookieName = getCookieName();
  const authCookie = cookieStore.get(cookieName)?.value;

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });

  if (authCookie) {
    try {
      const sessionData = JSON.parse(authCookie);
      if (sessionData?.access_token && sessionData?.refresh_token) {
        await supabase.auth.setSession({
          access_token: sessionData.access_token,
          refresh_token: sessionData.refresh_token,
        });
      }
    } catch {
    }
  }

  return supabase;
}
