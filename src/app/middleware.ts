import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export const middleware = async (req: NextRequest) => {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log("the session", req.nextUrl.pathname, session);
  if (!session) return NextResponse.rewrite(new URL("/", req.url));
  console.log("has session", req.nextUrl.pathname);
  if (req.nextUrl.pathname === "/")
    return NextResponse.rewrite(new URL("/dashboard", req.url));
  return res;
};

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
