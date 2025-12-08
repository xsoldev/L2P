import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth;

  // Public routes that don't require authentication
  const publicRoutes = ["/", "/auth/signin", "/auth/signup", "/auth/error", "/certificate"];
  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));

  // API routes are handled separately
  const isApiRoute = pathname.startsWith("/api");

  // Allow public routes and API routes without auth check
  if (isPublicRoute || isApiRoute) {
    return NextResponse.next();
  }

  // Redirect to signin if not logged in
  if (!isLoggedIn) {
    const signInUrl = new URL("/auth/signin", req.url);
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
