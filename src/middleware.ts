import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const pathname = request.nextUrl.pathname;

  if (
    token &&
    (pathname.startsWith("/auth") || pathname.startsWith("/register"))
  ) {
    return NextResponse.redirect(new URL("/minigames", request.url));
  }

  if (pathname.startsWith("/minigames")) {
    if (!token) {
      return NextResponse.redirect(new URL("/auth", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth", "/minigames/:path*"],
};
