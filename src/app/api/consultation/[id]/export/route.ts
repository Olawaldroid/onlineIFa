import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET /api/consultation/:id/export — printable export of a consultation.
// Returns a self-contained HTML document the browser can print to PDF. A later
// phase can swap this for server-side PDF generation.
export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const c = await prisma.consultation
    .findUnique({ where: { id: params.id }, include: { odu: true, notes: true } })
    .catch(() => null);

  if (!c) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const html = `<!doctype html><html><head><meta charset="utf-8">
<title>Online Ifá — Consultation ${c.id}</title>
<style>body{font-family:Georgia,serif;max-width:640px;margin:40px auto;color:#241b14}
h1{color:#a8431f} .meta{color:#666;font-size:14px} .note{border-left:3px solid #c9a227;padding-left:12px;margin:8px 0}</style>
</head><body>
<h1>Online Ifá — Consultation</h1>
<p class="meta">Odù: <strong>${c.odu?.name ?? "—"}</strong> · Signature: ${c.odu?.signature ?? "—"}</p>
<p class="meta">Area: ${c.concernArea ?? "—"} · Mode: ${c.castingMode}</p>
<p><strong>Question:</strong> ${escapeHtml(c.question ?? "")}</p>
<h2>Private notes</h2>
${c.notes.map((n) => `<div class="note">${escapeHtml(n.body)}</div>`).join("") || "<p>None.</p>"}
<hr>
<p class="meta">Online Ifá is an educational tool and does not replace a trained Babalawo or professional advice.</p>
</body></html>`;

  return new NextResponse(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}
