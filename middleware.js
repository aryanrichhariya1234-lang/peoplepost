import { NextResponse } from "next/server";
import { getServerSupabaseClient } from "./app/data-service/supabaseServer";

export async function middleware(req) {
  const res = NextResponse.next();
  const supabase = await getServerSupabaseClient();
  const user = await supabase.auth.getUser();
  const { data } = user;
  if (!data.user) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/login";
    return NextResponse.redirect(redirectUrl);
  }
  return res;
}
export const config = {
  matcher: ["/report", "/gov-dashboard"],
};
