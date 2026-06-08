import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { verifyPassword } from "@/lib/auth/password";
import { signSession, setSessionCookie } from "@/lib/auth/session";

const Body = z.object({ email: z.string().email(), password: z.string().min(1) });

// POST /api/auth/login — verify credentials and start a session.
export async function POST(req: NextRequest) {
  try {
    const { email, password } = Body.parse(await req.json());
    const user = await prisma.user.findUnique({ where: { email } });
    // Same generic error whether the user exists or not.
    if (!user?.passwordHash || !(await verifyPassword(password, user.passwordHash))) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }
    setSessionCookie(signSession({ userId: user.id, role: user.role, isGuest: false }));
    await prisma.auditLog.create({
      data: { actorUserId: user.id, action: "LOGIN", entityType: "User", entityId: user.id },
    });
    return NextResponse.json({ user: { id: user.id, email: user.email, role: user.role } });
  } catch (err) {
    return NextResponse.json({ error: `${err}` }, { status: 400 });
  }
}
