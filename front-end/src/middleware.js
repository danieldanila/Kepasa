import { NextResponse } from "next/server";

export async function middleware(req) {
  const jwtToken = req ? req.cookies.get("jwt")?.value : null;

  const { pathname } = req.nextUrl;

  if (!jwtToken && pathname !== "/login") {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
