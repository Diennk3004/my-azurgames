import createMiddleware from "next-intl/middleware";
import { defineRouting } from "next-intl/routing";
import { NextRequest, NextResponse } from "next/server";
import { redirect } from "./utils";
const protectedRoutes = ["/e-voucher-code"];
const publicRoutes = ["/menu/pizza/seafood"];
export default function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);
  const token: string | null = request.cookies.get("access_token")?.value ?? null;
  const isLoggedIn: boolean = token ? true : false;
  const defaultLocale = request.headers.get("x-your-custom-locale") || "en";
  const handleI18nRouting = createMiddleware(
    defineRouting({
      locales: ["en", "vi"],
      defaultLocale: "en",
      localePrefix: "as-needed"
    })
  );
  const response = handleI18nRouting(request);
  response.headers.set("x-your-custom-locale", defaultLocale);
  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/menu/pizza/seafood", request.nextUrl));
  }
  if (isPublicRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/e-voucher-code", request.nextUrl));
  }
  return response;
}
export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)"
};
