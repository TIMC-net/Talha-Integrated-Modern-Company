import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { resolveLegacyPath } from "@/lib/legacyRedirects";

export function middleware(request: NextRequest) {
  const destination = resolveLegacyPath(request.nextUrl.pathname);
  if (!destination) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = destination;
  url.search = request.nextUrl.search;
  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|images/|videos/|icon|apple-icon|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4|pdf|ico|woff2?)$).*)",
  ],
};
