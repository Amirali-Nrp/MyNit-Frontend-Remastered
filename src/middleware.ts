// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { authed_routes } from "./constants/routes";
import { auth } from "./lib/auth";
import type { AuthorizeResponse } from "./types";

/** Admin route prefixes (covers /admin and nested like /admin/studentInfo/[id]) */
const ADMIN_PREFIXES = ["/admin"];

/** Skip middleware for these paths */
const SKIP_PREFIXES = ["/api", "/_next", "/assets", "/images", "/public"];
const SKIP_EXACT = new Set<string>([
  "/favicon.ico",
  "/robots.txt",
  "/sitemap.xml",
]);

/** Single API base (you said you only have NEXT_PUBLIC_API_URL) */
const API_BASE = process.env.NEXT_PUBLIC_API_URL;

/** Helpers */
const norm = (p: string) => (p !== "/" && p.endsWith("/") ? p.slice(0, -1) : p);
const isAdminRoute = (p: string) =>
  ADMIN_PREFIXES.some((prefix) => p === prefix || p.startsWith(prefix + "/"));
const isAuthedRoute = (p: string) => authed_routes.includes(p);
const shouldSkip = (p: string) =>
  SKIP_EXACT.has(p) || SKIP_PREFIXES.some((pre) => p.startsWith(pre));

/** Edge-safe fetch with timeout */
async function postAuthorize(
  urlBase: string,
  accessToken: string,
  timeoutMs = 3500
): Promise<AuthorizeResponse | null> {
  const ctrl = new AbortController();
  const id = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(`${urlBase}/authorize`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
      signal: ctrl.signal,
      body: JSON.stringify({ access_token: accessToken }),
    });
    if (!res.ok) return null;
    return (await res.json()) as AuthorizeResponse;
  } catch {
    return null;
  } finally {
    clearTimeout(id);
  }
}

export async function middleware(request: NextRequest) {
  const pathname = norm(request.nextUrl.pathname);

  // Skip static/api/internals
  if (shouldSkip(pathname)) return NextResponse.next();

  // Read session (no secret/salt)
  const session = await auth();
  const accessToken = session?.user?.token as string | undefined;
  const isAdmin = Boolean(session?.user?.isAdmin);

  const redirectTo = (path: string) =>
    NextResponse.redirect(new URL(path, request.url));

  // Keep "/" public to avoid loops
  if (pathname === "/") return NextResponse.next();

  // Helper to validate token using NEXT_PUBLIC_API_URL
  const validate = async (): Promise<boolean> => {
    if (!accessToken) return false;
    if (!API_BASE) {
      // If you prefer to hard-fail when not set, replace with:
      // throw new Error("NEXT_PUBLIC_API_URL is not set");
      return true; // don't block if missing during local dev
    }
    const result = await postAuthorize(API_BASE, accessToken);
    if (!result) return false;
    return result.detail !== "unauthorized"; // adapt if your API returns a different shape
  };

  // ADMIN: must be logged in + valid token + admin
  if (isAdminRoute(pathname)) {
    if (!accessToken) return redirectTo("/");
    const ok = await validate();
    if (!ok) return redirectTo("/");
    if (!isAdmin) return redirectTo("/");
    return NextResponse.next();
  }

  // AUTH-REQUIRED PAGES
  if (isAuthedRoute(pathname)) {
    if (!accessToken) return redirectTo("/");
    const ok = await validate();
    if (!ok) return redirectTo("/");
    return NextResponse.next();
  }

  // Other pages: public
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
