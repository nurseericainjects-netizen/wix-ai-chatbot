import { type NextRequest, NextResponse } from "next/server";

// Minimal placeholder proxy to avoid build errors.
// You can later expand this if you really need proxying.
export async function proxy(request: NextRequest) {
  return NextResponse.next();
}
