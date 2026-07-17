"use client";

import { useMemo, useState } from "react";
import {
  ALL_ODU,
  LabOdu,
  glyphOf,
  leftLegOf,
  markGlyph,
  relatedTextOf,
  rightLegOf,
  summaryOf,
  themesOf,
} from "../corpus";
import { SectionHeading } from "./SectionHeading";
import { useLabProgress } from "./progress";

// Section 04 — searchable grid of the full corpus with a detail panel.
export function OduExplorer() {
  const { markFlag } = useLabProgress();
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<LabOdu | null>(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return ALL_ODU;
    return ALL_ODU.filter(
      (o) =>
        o.name.toLowerCase().includes(q) ||
        o.slug.includes(q) ||
        o.signature.includes(q) ||
        o.altNames.some((n) => n.toLowerCase().includes(q)),
    );
  }, [search]);

  return (
    <section id="odu" className="bg-ifa-bg px-10 pb-[120px] pt-[110px]">
      <div className="mx-auto max-w-[1120px]">
        <SectionHeading num="04" title="Explore all 256 Odù" />
        <div className="mt-[26px] flex items-center gap-[18px]">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search — Ogbè, Oyeku, Ojuani, 1122…"
            className="max-w-[420px] flex-1 rounded-xl border border-ifa-border bg-ifa-surface px-[18px] py-[13px] text-[14.5px] text-ifa-cream outline-none placeholder:text-ifa-cream/40"
          />
          <div className="font-mono text-[13px] text-ifa-sage">{filtered.length} figures</div>
        </div>

        {selected ? (
          <div
            className="mt-[26px] grid grid-cols-[auto_1fr_auto] items-start gap-[34px] rounded-[18px] border border-ifa-gold/50 p-[30px]"
            style={{
              background: "linear-gradient(160deg, rgba(201,162,39,.12), transparent), #241b14",
              animation: "omFadeUp .4s ease both",
            }}
          >
            <div className="flex gap-[30px] rounded-xl bg-ifa-cream/5 px-6 py-[18px]">
              <LegColumn label="LEFT" leg={leftLegOf(selected)} />
              <LegColumn label="RIGHT" leg={rightLegOf(selected)} />
            </div>
            <div>
              <div className="text-[11px] tracking-[0.24em] text-ifa-gold">
                {selected.isPrimary ? "PRINCIPAL ODÙ · MÉJÌ" : "COMBINED ODÙ · ÀMÚLÙ"}
              </div>
              <h3 className="mb-0 mt-1.5 font-serif text-[34px] font-medium text-ifa-cream">
                {selected.name}
              </h3>
              <div className="mt-2 font-mono text-[12.5px] text-ifa-cream/60">
                rank {selected.rank} / 256 · sig {selected.signature} · bin{" "}
                {selected.signature.replace(/2/g, "0").replace("|", " ")}
              </div>
              <p className="mb-0 mt-3.5 max-w-[560px] text-[14.5px] leading-[1.7] text-ifa-cream/85">
                {summaryOf(selected)}
              </p>
              <div className="mt-3 text-[13px] text-ifa-sage">Themes — {themesOf(selected)}</div>
              <div className="mt-3 max-w-[560px] text-[12.5px] leading-relaxed text-ifa-cream/55">
                {relatedTextOf(selected)}
              </div>
            </div>
            <button
              onClick={() => setSelected(null)}
              aria-label="Close detail"
              className="h-[34px] w-[34px] cursor-pointer rounded-full border border-ifa-border bg-transparent text-[15px] text-ifa-cream hover:border-ifa-gold"
            >
              ✕
            </button>
          </div>
        ) : null}

        <div className="mt-7 grid grid-cols-8 gap-2.5">
          {filtered.map((o) => {
            const isSel = selected?.slug === o.slug;
            return (
              <button
                key={o.slug}
                onClick={() => {
                  setSelected(o);
                  markFlag("odu");
                }}
                className={`cursor-pointer rounded-xl border px-2 py-3.5 text-center transition-all duration-200 hover:-translate-y-0.5 hover:border-ifa-gold ${
                  isSel
                    ? "border-ifa-gold/80"
                    : o.isPrimary
                      ? "border-ifa-gold/35"
                      : "border-ifa-border"
                } ${o.isPrimary ? "bg-ifa-gold/[0.06]" : "bg-ifa-surface"}`}
              >
                <div className="whitespace-pre font-mono text-xs leading-[1.7] text-ifa-gold">
                  {glyphOf(o)}
                </div>
                <div className="mt-2 overflow-hidden text-ellipsis whitespace-nowrap text-[11px] text-ifa-cream/80">
                  {o.name}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function LegColumn({ label, leg }: { label: string; leg: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      {leg.split("").map((c, i) => (
        <div key={i} className="min-w-[44px] text-center font-mono text-[21px] text-ifa-gold">
          {markGlyph(c)}
        </div>
      ))}
      <div className="text-[10px] tracking-[0.18em] text-ifa-sage">{label}</div>
    </div>
  );
}
