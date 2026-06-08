import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";

// GET /api/auth/session — return the current session payload (or null).
export async function GET() {
  return NextResponse.json({ session: getSession() });
}
