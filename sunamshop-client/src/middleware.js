import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = req.nextUrl;

  // 🔐 Not logged in
  if (!token) {
    if (
      pathname.startsWith("/adminDashboard") ||
      pathname.startsWith("/userDashboard")
    ) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // 🔒 Admin Dashboard Protection
  if (pathname.startsWith("/adminDashboard")) {
    if (token.user?.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // 🔒 User Dashboard Protection
  if (pathname.startsWith("/userDashboard")) {
    if (token.user?.role !== "user") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/adminDashboard/:path*", "/userDashboard/:path*"],
};
