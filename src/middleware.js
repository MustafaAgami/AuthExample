// middleware.js
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(
  async function middleware(request) {
    const url = request.nextUrl.clone();
    console.log("Inside sign in url", url.pathname);
    console.log("Middleware called::", request.nextauth);
    const isAutorized = request.nextauth.token;
    if (!isAutorized && url.pathname !== "/login") {
      console.log("Not authorized", url.pathname);
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
    if (isAutorized && url.pathname === "/login") {
      console.log("Inside sign in url", url.pathname);
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        console.log("Authorize middleware called::", token);
        return true;
      },
    },
  }
);
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/api/:path*",
    "/dashboard",
    "/login",
  ],
};
