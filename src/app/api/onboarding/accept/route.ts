import { NextRequest, NextResponse } from "next/server";

// POST /api/onboarding/accept — records disclaimer acceptance and routes the
// user onward as a guest or to account creation. Form-encoded from the
// disclaimer page. (Auth wiring is a later phase; this records intent + routes.)
export async function POST(req: NextRequest) {
  const form = await req.formData();
  const next = (form.get("next") as string) || "/learn";
  const mode = (form.get("mode") as string) || "guest";

  // A real implementation persists acceptance against the (guest or new) user
  // and sets a session cookie. Here we redirect to the chosen destination,
  // sending account-mode users through sign-up first.
  const destination = mode === "account" ? `/signup?next=${encodeURIComponent(next)}` : next;
  return NextResponse.redirect(new URL(destination, req.url), { status: 303 });
}
