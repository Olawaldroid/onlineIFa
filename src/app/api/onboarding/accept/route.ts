import { NextRequest, NextResponse } from "next/server";

// POST /api/onboarding/accept — records disclaimer acceptance and routes the
// user onward as a guest. Form-encoded from the disclaimer page. (Auth wiring
// is a later phase; this records intent + routes.)
export async function POST(req: NextRequest) {
  const form = await req.formData();
  const next = (form.get("next") as string) || "/learn";

  // A real implementation persists acceptance against the guest user and sets
  // a session cookie. Here we redirect straight to the chosen destination.
  return NextResponse.redirect(new URL(next, req.url), { status: 303 });
}
