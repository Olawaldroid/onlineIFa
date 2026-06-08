import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { hashPassword } from "@/lib/auth/password";
import { signSession, setSessionCookie } from "@/lib/auth/session";

const Body = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(200),
  name: z.string().max(120).optional(),
});

// POST /api/auth/signup — create a user with a hashed password and sign them in.
export async function POST(req: NextRequest) {
  try {
    const { email, password, name } = Body.parse(await req.json());
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return NextResponse.json({ error: "Email already registered" }, { status: 409 });

    const user = await prisma.user.create({
      data: {
        email,
        name,
        passwordHash: await hashPassword(password),
        role: "USER",
        disclaimerAcceptedAt: new Date(),
      },
    });

    setSessionCookie(signSession({ userId: user.id, role: user.role, isGuest: false }));
    await prisma.auditLog.create({
      data: { actorUserId: user.id, action: "CREATE", entityType: "User", entityId: user.id, summary: "Sign-up" },
    });
    return NextResponse.json({ user: { id: user.id, email: user.email, role: user.role } }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: `${err}` }, { status: 400 });
  }
}
