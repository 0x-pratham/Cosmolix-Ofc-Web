import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Always allow the maintenance page itself
  if (pathname === "/maintenance") {
    return NextResponse.next();
  }

  const maintenanceMode =
    process.env.MAINTENANCE_MODE === "true";

  const maintenanceUntil = process.env.MAINTENANCE_UNTIL;

  // If maintenance mode is disabled, continue normally
  if (!maintenanceMode) {
    return NextResponse.next();
  }

  // If an expiry date exists and has passed,
  // automatically disable maintenance.
  if (
    maintenanceUntil &&
    new Date() >= new Date(maintenanceUntil)
  ) {
    return NextResponse.next();
  }

  // Redirect everything else to maintenance
  const maintenanceUrl = request.nextUrl.clone();
  maintenanceUrl.pathname = "/maintenance";

  return NextResponse.redirect(maintenanceUrl);
}

export const config = {
  matcher: [
    /*
     * Run Proxy on application routes while excluding
     * Next.js internals and common static files.
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};