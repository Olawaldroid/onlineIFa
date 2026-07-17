"use client";

import { useState } from "react";
import { IFAGRITHM_NOTES, IFAGRITHM_PEOPLE, IFAGRITHM_VIDEO } from "../content";

// Section 08 — claim-vs-research accordion for the "Ifàgrìthm" conversation.
export function Ifagrithm() {
  const [open, setOpen] = useState(0);

  return (
    <section id="ifagrithm" className="border-t border-ifa-border bg-ifa-deep px-10 pb-[120px] pt-[110px]">
      <div className="mx-auto max-w-[1120px]">
        <div className="mb-3.5 text-xs tracking-[0.34em] text-ifa-peri">SECTION 08 · FIELD NOTES</div>
        <h2 className="m-0 font-serif text-[54px] font-medium leading-[1.1] text-ifa-cream">
          IFÀGRÌTHM<span className="text-ifa-gold">.</span>
        </h2>
        <p className="mb-0 mt-5 max-w-[700px] text-base leading-[1.7] text-ifa-cream/75">
          Notes from <em>&ldquo;Ifàgrìthm: The Mathematics in Ifá&rdquo;</em> — Waa Sere in
          conversation with Dr. Túndé Adégbọlá, electrical engineer, computational linguist and
          founder of Alt-i. His thesis: beneath the mythology, Ifá is a rigorous information system.
          Each claim from the conversation is set beside what independent research shows.{" "}
          <a
            href={IFAGRITHM_VIDEO}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ifa-peri hover:text-ifa-peri"
          >
            Watch the source video ↗
          </a>
        </p>
        <div className="mt-[22px] flex gap-[26px] text-[12.5px] text-ifa-cream/65">
          <span className="inline-flex items-center gap-2">
            <span className="h-[9px] w-[9px] rounded-full bg-ifa-gold" />
            What the conversation said
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-[9px] w-[9px] rounded-full bg-ifa-peri" />
            What independent research shows
          </span>
        </div>

        <div className="mt-9 flex flex-col gap-3">
          {IFAGRITHM_NOTES.map((it, i) => {
            const isOpen = open === i;
            return (
              <div
                key={it.title}
                className={`overflow-hidden rounded-[14px] border bg-ifa-surface transition-colors duration-300 ${isOpen ? "border-ifa-peri/50" : "border-ifa-border"}`}
              >
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full cursor-pointer items-center gap-[18px] border-none bg-transparent px-[22px] py-[18px] text-left hover:bg-ifa-cream/[0.04]"
                >
                  <span className="font-mono text-xs text-ifa-peri">{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex-1 font-serif text-[21px] text-ifa-cream">{it.title}</span>
                  <span className="font-mono text-lg text-ifa-gold">{isOpen ? "–" : "+"}</span>
                </button>
                {isOpen ? (
                  <div className="grid grid-cols-2 gap-4 px-[22px] pb-[22px] pt-1">
                    <div className="rounded border-l-[3px] border-ifa-gold bg-ifa-gold/[0.06] px-[18px] py-4">
                      <div className="mb-2.5 font-mono text-[10.5px] tracking-[0.18em] text-ifa-gold">
                        IN THE CONVERSATION
                      </div>
                      <p className="m-0 text-[13.5px] leading-[1.7] text-ifa-cream/[0.88]">{it.claim}</p>
                    </div>
                    <div className="rounded border-l-[3px] border-ifa-peri bg-ifa-peri/[0.06] px-[18px] py-4">
                      <div className="mb-2.5 font-mono text-[10.5px] tracking-[0.18em] text-ifa-peri">
                        WHAT THE RESEARCH SHOWS
                      </div>
                      <p className="m-0 text-[13.5px] leading-[1.7] text-ifa-cream/[0.88]">{it.research}</p>
                      {it.flag ? (
                        <div className="mt-3 border-t border-dashed border-ifa-border pt-[11px]">
                          <div className="mb-1 font-mono text-[10px] tracking-[0.16em] text-ifa-cream/45">
                            CAVEAT
                          </div>
                          <p className="m-0 text-[12.5px] leading-relaxed text-ifa-cream/65">{it.flag}</p>
                        </div>
                      ) : null}
                      <div className="mt-3 font-mono text-[11px]">
                        <a
                          href={it.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-ifa-peri hover:text-ifa-peri"
                        >
                          {it.srcLabel} ↗
                        </a>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>

        <div className="mt-[34px] grid grid-cols-4 gap-3.5">
          {IFAGRITHM_PEOPLE.map((p) => (
            <div key={p.name} className="rounded-xl border border-ifa-border bg-ifa-surface px-5 py-[18px]">
              <div className="font-serif text-[17px] text-ifa-cream">{p.name}</div>
              <p className="mb-0 mt-1.5 text-xs leading-relaxed text-ifa-cream/60">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
