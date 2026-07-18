"use client";

import { useEffect, useRef, useState } from "react";
import { GRAPH_CAT_NAMES, GRAPH_COLORS, GRAPH_EDGES, GRAPH_LEGEND, GRAPH_NODES } from "@/lib/content/graph";
import { markProgressFlag } from "@/lib/progress";

const W = 1120;
const H = 560;

// Clickable concept map. Edges are drawn on a canvas; nodes are absolutely
// positioned buttons. Selecting a node zooms the stage toward it.
export function KnowledgeGraphExplorer() {
  const [sel, setSel] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, W, H);
    const pos: Record<string, [number, number]> = {};
    GRAPH_NODES.forEach((n) => (pos[n.id] = [(n.x * W) / 100, (n.y * H) / 100]));
    for (const [a, b] of GRAPH_EDGES) {
      const hot = sel !== null && (a === sel || b === sel);
      ctx.strokeStyle = hot ? "rgba(201,162,39,.85)" : "rgba(201,162,39,.18)";
      ctx.lineWidth = hot ? 2 : 1;
      ctx.beginPath();
      ctx.moveTo(...pos[a]);
      ctx.lineTo(...pos[b]);
      ctx.stroke();
    }
  }, [sel]);

  const selNode = GRAPH_NODES.find((n) => n.id === sel) ?? null;
  const transform = selNode
    ? `scale(1.7) translate(${50 - selNode.x}%, ${50 - selNode.y}%)`
    : "scale(1) translate(0,0)";

  return (
    <>
      <div className="mt-5 flex flex-wrap items-center gap-4 text-xs">
        {GRAPH_LEGEND.map((gl) => (
          <span key={gl.label} className="inline-flex items-center gap-[7px] text-ifa-ink/75">
            <span className="h-[11px] w-[11px] rounded-full" style={{ background: gl.color }} />
            {gl.label}
          </span>
        ))}
        <button
          onClick={() => setSel(null)}
          className="ml-auto cursor-pointer rounded-full border border-ifa-border/30 bg-transparent px-4 py-1.5 text-xs text-ifa-ink hover:border-ifa-rust"
        >
          Reset view
        </button>
      </div>
      <div className="relative mt-5 h-[560px] overflow-hidden rounded-[18px] border border-ifa-border bg-ifa-surface">
        <div className="absolute inset-0 transition-transform duration-700" style={{ transform, transitionTimingFunction: "cubic-bezier(.3,.7,.2,1)" }}>
          <canvas ref={canvasRef} width={W} height={H} className="absolute inset-0 h-full w-full" />
          {GRAPH_NODES.map((n) => {
            const hot = sel === n.id;
            const linked = sel !== null && GRAPH_EDGES.some(([a, b]) => (a === sel && b === n.id) || (b === sel && a === n.id));
            const dim = sel !== null && !hot && !linked;
            const color = GRAPH_COLORS[n.cat];
            return (
              <button
                key={n.id}
                onClick={() => {
                  setSel((s) => (s === n.id ? null : n.id));
                  markProgressFlag("graph");
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer whitespace-nowrap rounded-full transition-all duration-300 hover:scale-[1.12]"
                style={{
                  left: n.x + "%",
                  top: n.y + "%",
                  padding: n.id === "corpus" ? "12px 22px" : "8px 15px",
                  fontSize: n.id === "corpus" ? 15 : 12.5,
                  border: `1.5px solid ${hot ? "#c9a227" : color + (dim ? "44" : "99")}`,
                  background: hot ? "rgba(201,162,39,.22)" : "rgba(26,20,15,.85)",
                  color: dim ? "rgba(243,233,217,.35)" : "#f3e9d9",
                  boxShadow: hot ? "0 0 26px rgba(201,162,39,.4)" : "none",
                }}
              >
                {n.label}
              </button>
            );
          })}
        </div>
        {selNode ? (
          <div className="absolute bottom-5 left-5 max-w-[380px] rounded-[14px] border border-ifa-gold/50 bg-ifa-bg/[0.92] px-5 py-[18px] backdrop-blur-lg" style={{ animation: "omFadeUp .35s ease both" }}>
            <div className="text-[10.5px] tracking-[0.22em] text-ifa-gold">{GRAPH_CAT_NAMES[selNode.cat]}</div>
            <div className="mt-1 font-serif text-[21px] text-ifa-cream">{selNode.label}</div>
            <p className="mb-0 mt-2 text-[13px] leading-relaxed text-ifa-cream/80">{selNode.desc}</p>
          </div>
        ) : null}
      </div>
    </>
  );
}
