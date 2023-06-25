import { NextResponse } from "next/server";
import { verifyToken } from "./utils";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await verifyToken(request);
  if (!token.token) {
    if (request.nextUrl.pathname.startsWith("/me")) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  }
  if (!!token.token) {
    if (
      request.nextUrl.pathname.startsWith("/signin") ||
      request.nextUrl.pathname.startsWith("/signup")
    ) {
      return NextResponse.redirect(
        new URL(`/me/${token.token?.userName}`, request.url)
      );
    }
  }
}
