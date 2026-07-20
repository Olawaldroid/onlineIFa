import { NextRequest, NextResponse } from "next/server";
import { oduFactBySlug } from "@/lib/odu/facts";
import { iweVerseForOdu } from "@/lib/content/iweVerses";

export async function GET(request: NextRequest) {
  const oduSlug = request.nextUrl.searchParams.get("oduSlug")?.trim();
  const selectionKey = request.nextUrl.searchParams.get("key")?.trim();
  if (!oduSlug || !selectionKey) {
    return NextResponse.json({ error: "oduSlug and key are required" }, { status: 400 });
  }
  if (!oduFactBySlug(oduSlug)) {
    return NextResponse.json({ error: "Unknown Odù" }, { status: 404 });
  }
  return NextResponse.json({ verse: iweVerseForOdu(oduSlug, selectionKey) });
}
