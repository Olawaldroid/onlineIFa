// ===========================================================================
// Cookie session: a compact, HMAC-signed token (dependency-free).
// ---------------------------------------------------------------------------
// Token format: base64url(JSON payload) + "." + base64url(HMAC-SHA256).
// Signed/verified with AUTH_SECRET. This is a real, minimal session layer; a
// later phase can swap in Auth.js (OAuth/magic-link) behind the same helpers.
// ===========================================================================

import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { UserRole } from "@prisma/client";

export const SESSION_COOKIE = "ifa_session";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 days

export interface SessionPayload {
  userId: string;
  role: UserRole;
  isGuest: boolean;
  exp: number; // unix seconds
}

function secret(): string {
  return process.env.AUTH_SECRET || "dev-insecure-secret-change-me";
}

function b64url(input: Buffer | string): string {
  return Buffer.from(input).toString("base64url");
}

export function signSession(payload: Omit<SessionPayload, "exp">, maxAge = MAX_AGE_SECONDS): string {
  const full: SessionPayload = { ...payload, exp: Math.floor(Date.now() / 1000) + maxAge };
  const body = b64url(JSON.stringify(full));
  const sig = createHmac("sha256", secret()).update(body).digest("base64url");
  return `${body}.${sig}`;
}

export function verifySession(token: string | undefined | null): SessionPayload | null {
  if (!token || !token.includes(".")) return null;
  const [body, sig] = token.split(".");
  const expected = createHmac("sha256", secret()).update(body).digest("base64url");
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString()) as SessionPayload;
    if (payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}

// --- Server helpers (Node runtime: route handlers & server components) -----

export function setSessionCookie(token: string): void {
  cookies().set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  });
}

export function clearSessionCookie(): void {
  cookies().set(SESSION_COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 });
}

export function getSession(): SessionPayload | null {
  return verifySession(cookies().get(SESSION_COOKIE)?.value);
}

/** Whether strict auth enforcement is on. Off by default so the app stays
 *  browsable in development without seeded users. */
export function authEnforced(): boolean {
  return process.env.AUTH_ENFORCED === "true";
}

/** Returns the session if the user has one of the allowed roles, else null.
 *  When enforcement is OFF, returns a synthetic admin session so pages render. */
export function requireRole(roles: UserRole[]): SessionPayload | null {
  const session = getSession();
  if (!authEnforced()) {
    return session ?? { userId: "dev", role: "ADMIN", isGuest: false, exp: 0 };
  }
  if (session && roles.includes(session.role)) return session;
  return null;
}
