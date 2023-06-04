import { NextResponse } from "next/server";

export async function middleware(req) {
  const jwtToken = req ? req.cookies.get("jwt")?.value : null;

  const { pathname } = req.nextUrl;

  const url = req.nextUrl.clone();

  if (!jwtToken && pathname !== "/login") {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  } else if (jwtToken && pathname === "/login") {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
