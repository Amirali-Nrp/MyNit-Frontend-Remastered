import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { authed_routes } from "./constants/routes";
import { auth } from "./lib/auth";
import { AuthorizeResponse } from "./types";

export async function middleware(request: NextRequest) {
  const session = await auth();

  if (
    request.nextUrl.pathname.startsWith("/") &&
    request.nextUrl.pathname.endsWith("/")
  ) {
    const tokens = {
      access_token: session?.user.token,
    };

    if (tokens.access_token === undefined) {
      return NextResponse.rewrite(new URL("/", request.url));
    }

    try {
      const resposne = await fetch(`${process.env.API_URL}/authorize`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_token: tokens.access_token,
        }),
      });

      const result: AuthorizeResponse = await resposne.json();
      if (result.detail === "unauthorized") {
        return NextResponse.redirect(new URL("/", request.url));
      }
      return NextResponse.redirect(new URL("/Home", request.url));
    } catch (e) {
      // console.log(e);
    }

    return NextResponse.rewrite(new URL("/", request.url));
  } else if (authed_routes.includes(request.nextUrl.pathname)) {
    const tokens = {
      access_token: session?.user.token,
    };

    if (tokens.access_token === undefined) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    try {
      const resposne = await fetch(`${process.env.API_URL}/authorize`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_token: tokens.access_token,
        }),
      });

      const result: AuthorizeResponse = await resposne.json();
      // console.log("res", result);
      if (result.detail === "unauthorized") {
        return NextResponse.rewrite(new URL("/", request.url));
      }
      return NextResponse.rewrite(
        new URL(request.nextUrl.pathname, request.url)
      );
    } catch (e) {
      // console.log(e);
    }

    return NextResponse.rewrite(new URL("/", request.url));
  }
}
