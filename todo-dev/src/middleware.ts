import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const cookie = request.cookies.get("directus_session_token")?.value;

  if (cookie !== undefined) {
    let token = jwt.decode(cookie);

    if (token === null) {
      const customNextResponse = NextResponse.redirect(
        new URL("/", request.nextUrl),
      );

      customNextResponse.cookies.delete("directus_session_token");

      return customNextResponse;
    }
  } else {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/todo/:path*",
};
