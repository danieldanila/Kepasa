import { NextResponse } from "next/server";

export async function middleware(req) {
  const jwtToken = req ? req.cookies.get("jwt")?.value : null;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/authentication/tokenExpirationTimestamp`,
    {
      headers: {
        cookie: `jwt=${jwtToken}`,
      },
      credentials: "include",
    }
  );

  const tokenExpirationTimestamp = await response.json();

  const { pathname } = req.nextUrl;

  const url = req.nextUrl.clone();

  if (
    (!jwtToken ||
      (tokenExpirationTimestamp &&
        tokenExpirationTimestamp.message !== null &&
        tokenExpirationTimestamp.message < Date.now())) &&
    pathname !== "/login" &&
    !pathname.startsWith("/resetPassword/")
  ) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  } else if (
    jwtToken &&
    tokenExpirationTimestamp &&
    tokenExpirationTimestamp.message !== null &&
    tokenExpirationTimestamp.message > Date.now() &&
    pathname === "/login"
  ) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
