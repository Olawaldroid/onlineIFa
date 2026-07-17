"use client";

import { useState } from "react";
import { ODU_BY_SIG, ODU_BY_SLUG } from "../corpus";
import { MATH_TOPICS } from "../content";
import { SectionHeading } from "./SectionHeading";

const TREE_BARS = [1, 2, 3, 4, 5, 6, 7, 8].map((d) => ({
  h: d * 12.5 + "%",
  op: 0.3 + d * 0.09,
  label: `depth ${d} → ${Math.pow(2, d)}`,
}));

// Section 03 — binary explorer slider over all 256 values.
export function Mathematics() {
  const [n, setN] = useState(90);

  const bits = n.toString(2).padStart(8, "0").split("");
  const sigDigits = bits.map((b) => (b === "1" ? "1" : "2"));
  const sig = sigDigits.slice(0, 4).join("") + "|" + sigDigits.slice(4).join("");
  const odu = ODU_BY_SIG[sig];
  const oduNote = odu.isPrimary
    ? "one of the 16 principal Odù"
    : `right leg ${ODU_BY_SLUG[odu.rightSlug].name}, left leg ${ODU_BY_SLUG[odu.leftSlug].name}`;

  return (
    <section id="math" className="bg-ifa-paper px-10 pb-[120px] pt-[110px] text-ifa-ink">
      <div className="mx-auto max-w-[1120px]">
        <SectionHeading num="03" title="The Mathematics of Ifá" light />
        <p className="mb-0 mt-5 max-w-[660px] text-[16.5px] leading-[1.7] text-ifa-ink/75">
          Each figure of Ifá is written as two columns of four positions, and each position holds a
          single or a double mark. Eight binary positions: 2⁸ = 256 figures. The structure has been
          studied in academic and computer-science literature — a byte before the byte had a name.
        </p>

        <div className="mt-12 grid grid-cols-[1.2fr_.8fr] items-stretch gap-6">
          <div className="rounded-2xl border border-ifa-border/[0.16] bg-ifa-parchment p-[30px]">
            <h3 className="m-0 font-serif text-2xl font-medium">Binary explorer</h3>
            <p className="mb-0 mt-2 text-[13.5px] text-ifa-ink/65">
              Slide through all 256 values. Every number from 0–255 is one figure of the corpus.
            </p>
            <input
              type="range"
              min={0}
              max={255}
              value={n}
              onChange={(e) => setN(+e.target.value)}
              className="mt-[22px] w-full accent-ifa-rust"
            />
            <div className="mt-5 flex items-center gap-7">
              <div className="min-w-24 font-mono text-[44px] font-semibold text-ifa-rust">{n}</div>
              <div className="flex gap-2">
                {bits.map((b, i) => (
                  <div key={i} className="w-[42px] text-center">
                    <div
                      className={`rounded-lg py-[7px] font-mono text-[17px] font-semibold ${
                        b === "1" ? "bg-ifa-rust text-ifa-paper" : "bg-ifa-border/[0.14] text-ifa-ink"
                      }`}
                    >
                      {b}
                    </div>
                    <div className="mt-[7px] font-mono text-[15px] text-ifa-ink">
                      {b === "1" ? "ǀ" : "ǁ"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-5 rounded-[10px] bg-ifa-gold/[0.12] px-[18px] py-3.5 text-[14.5px]">
              This is <strong className="font-serif text-[17px]">{odu.name}</strong> —{" "}
              <span className="text-ifa-ink/70">{oduNote}</span>
            </div>
            <p className="mb-0 mt-3.5 text-[11.5px] text-ifa-ink/50">
              Convention: 1 = single mark ǀ, 0 = double mark ǁ. Which mark maps to which digit is a
              representational choice; lineages vary.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex-1 rounded-2xl bg-ifa-surface p-[30px] text-ifa-cream">
              <h3 className="m-0 font-serif text-2xl font-medium text-ifa-gold">16 × 16 = 256</h3>
              <p className="mb-0 mt-3 text-sm leading-[1.7] text-ifa-cream/80">
                The 16 principal Odù (Méjì) are the figures whose two legs are identical. Pairing
                any right leg with any left leg yields the full corpus:
              </p>
              <div className="mt-4 font-mono text-[15px] leading-loose text-ifa-gold">
                16 méjì
                <br />+ 240 combined (àmúlù)
                <br />= 256 Odù · each ≈ 0.39%
              </div>
            </div>
            <div className="rounded-2xl border border-ifa-border/[0.16] bg-ifa-parchment p-[26px]">
              <h4 className="m-0 font-serif text-[19px] font-medium">Recursion &amp; depth</h4>
              <p className="mb-0 mt-2 text-[13.5px] leading-[1.65] text-ifa-ink/70">
                1 cast → 2 outcomes → 4 → 8 … 8 casts → 256. A perfect binary tree of depth 8,
                walked one mark at a time.
              </p>
              <div className="mt-4 flex h-16 items-end gap-[5px]">
                {TREE_BARS.map((tb) => (
                  <div
                    key={tb.label}
                    title={tb.label}
                    className="flex-1 rounded-t-[3px] bg-ifa-rust"
                    style={{ height: tb.h, opacity: tb.op }}
                  />
                ))}
              </div>
              <div className="mt-1.5 flex justify-between font-mono text-[10.5px] text-ifa-ink/55">
                <span>2¹</span>
                <span>2⁸ = 256</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-4 gap-4">
          {MATH_TOPICS.map((mt) => (
            <div
              key={mt.tag}
              className="rounded-[14px] border border-ifa-border/[0.16] bg-ifa-parchment p-[22px] transition-colors hover:border-ifa-rust"
            >
              <div className="mb-2 font-mono text-[11px] text-ifa-rust">{mt.tag}</div>
              <div className="font-serif text-[19px]">{mt.title}</div>
              <p className="mb-0 mt-2 text-[13px] leading-relaxed text-ifa-ink/[0.68]">{mt.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
