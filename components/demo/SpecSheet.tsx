"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Check, X } from "lucide-react";
import { ProductDemo } from "./ProductDemo";
import { loadTokenMap, readPaint, type Paint } from "./tokens";

/* ---------------------------------------------------------------------------
   SpecSheet — measures the real product component and explains it plainly.

   The component is rendered with the product stylesheet, enlarged, and read
   back from the DOM: size, corners, inner space, border, colors, text, icon.
   Nothing on the sheet is typed by hand, so it cannot drift from the CSS.

   Written for every reader, including people with cognitive impairments:
   the same seven cards in the same order on every page, one fact per line,
   plain words first and the technical term in brackets, units always shown,
   and corner shape named and pictured, never left to a guess.
   --------------------------------------------------------------------------- */

export type SpecTarget = {
  /** CSS selector inside the example, e.g. ".btn-primary" */
  sel: string;
  /** what the reader calls it, e.g. "Primary button" */
  name: string;
  /** how the width behaves: grows with content, is fixed, or fills the space */
  width?: "hug" | "fixed" | "fill";
  /** draw dimension lines on this target (default: first target only) */
  marks?: boolean;
};

type Measure = {
  name: string;
  width: number;
  height: number;
  widthMode: SpecTarget["width"];
  radius: number;
  /** the value written in CSS, when it differs from what is drawn (999px, 50%) */
  radiusCss: string | null;
  pad: [number, number, number, number];
  border: { width: number; style: string; paint: Paint | null };
  bg: Paint | null;
  text: Paint | null;
  font: { size: number; weight: number; line: number };
  gap: number | null;
  icon: { w: number; h: number; paint: Paint | null } | null;
  shadow: boolean;
  rect: { x: number; y: number; w: number; h: number };
  marks: boolean;
};

const px = (v: string) => parseFloat(v) || 0;
const round = (n: number) => Math.round(n * 10) / 10;

/** What the corner actually draws: percentages resolve, oversized radii clamp to half the short side. */
function readRadius(css: string, w: number, h: number) {
  const first = css.split(" ")[0];
  const raw = first.endsWith("%") ? (parseFloat(first) / 100) * Math.min(w, h) : px(first);
  const drawn = round(Math.min(raw, Math.min(w, h) / 2));
  return { radius: drawn, radiusCss: Math.abs(raw - drawn) > 0.5 || first.endsWith("%") ? first : null };
}

/* ---- inside the shadow root: enlarged component + redlines ---------------- */

function Stage({
  targets,
  scale,
  onMeasure,
  children,
}: {
  targets: SpecTarget[];
  scale: number;
  onMeasure: (m: Measure[]) => void;
  children: React.ReactNode;
}) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ w: 0, h: 0 });
  const [marks, setMarks] = useState<Measure[]>([]);

  const measure = useCallback(async () => {
    const wrap = outer.current;
    const el = inner.current;
    if (!wrap || !el) return;
    const tokens = await loadTokenMap();
    setBox({ w: el.offsetWidth, h: el.offsetHeight });
    const base = wrap.getBoundingClientRect();
    const out: Measure[] = [];
    targets.forEach((t, i) => {
      const node = el.querySelector<HTMLElement>(t.sel);
      if (!node) return;
      const cs = getComputedStyle(node);
      const r = node.getBoundingClientRect();
      const svg = node.querySelector<SVGSVGElement>("svg");
      const bw = px(cs.borderTopWidth);
      const gap = cs.columnGap && cs.columnGap !== "normal" ? px(cs.columnGap) : null;
      out.push({
        name: t.name,
        width: round(node.offsetWidth),
        height: round(node.offsetHeight),
        widthMode: t.width ?? "hug",
        ...readRadius(cs.borderTopLeftRadius, node.offsetWidth, node.offsetHeight),
        pad: [px(cs.paddingTop), px(cs.paddingRight), px(cs.paddingBottom), px(cs.paddingLeft)].map(round) as Measure["pad"],
        border: { width: bw, style: cs.borderTopStyle, paint: bw > 0 && cs.borderTopStyle !== "none" ? readPaint(cs.borderTopColor, tokens) : null },
        bg: readPaint(cs.backgroundColor, tokens),
        text: readPaint(cs.color, tokens),
        font: { size: round(px(cs.fontSize)), weight: parseInt(cs.fontWeight, 10) || 400, line: round(px(cs.lineHeight)) },
        gap: gap && gap > 0 ? round(gap) : null,
        icon: svg
          ? {
              w: round(svg.getBoundingClientRect().width / scale),
              h: round(svg.getBoundingClientRect().height / scale),
              paint: readPaint(getComputedStyle(svg).color, tokens),
            }
          : null,
        shadow: cs.boxShadow !== "none",
        rect: { x: r.left - base.left, y: r.top - base.top, w: r.width, h: r.height },
        marks: t.marks ?? i === 0,
      });
    });
    // Redlines need room: skip a target whose marks would collide with one already drawn.
    const drawn: Measure["rect"][] = [];
    for (const m of out) {
      if (!m.marks) continue;
      const zone = { x: m.rect.x - 70, y: m.rect.y - 34, w: m.rect.w + 160, h: m.rect.h + 90 };
      const hit = drawn.some((d) => zone.x < d.x + d.w && d.x < zone.x + zone.w && zone.y < d.y + d.h && d.y < zone.y + zone.h);
      if (hit) m.marks = false;
      else drawn.push(zone);
    }
    setMarks(out);
    onMeasure(out);
  }, [targets, scale, onMeasure]);

  useLayoutEffect(() => {
    measure();
    document.fonts?.ready.then(measure);
    const ro = new ResizeObserver(() => measure());
    if (inner.current) ro.observe(inner.current);
    if (outer.current) ro.observe(outer.current);
    return () => ro.disconnect();
  }, [measure]);

  const RED = "#C2185B";
  return (
    <div ref={outer} style={{ position: "relative", display: "flex", justifyContent: "center", padding: "56px 96px 72px 56px", overflowX: "auto" }}>
      <div style={{ width: box.w * scale, height: box.h * scale, flexShrink: 0 }}>
        <div ref={inner} style={{ transform: `scale(${scale})`, transformOrigin: "0 0", width: "max-content" }}>
          {children}
        </div>
      </div>
      <svg aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", overflow: "visible" }}>
        {marks.filter((m) => m.marks).map((m) => {
          const { x, y, w, h } = m.rect;
          const s = scale;
          const [, pr, , pl] = m.pad;
          const bw = m.border.width * s;
          const label = (lx: number, ly: number, text: string, anchor: "middle" | "start" | "end" = "middle") => {
            const tw = text.length * 7 + 12;
            const bx = anchor === "middle" ? lx - tw / 2 : anchor === "end" ? lx - tw : lx;
            return (
              <g>
                <rect x={bx} y={ly - 10} width={tw} height={20} rx={10} fill={RED} />
                <text x={bx + tw / 2} y={ly} fill="#fff" fontSize="12" fontWeight={600} textAnchor="middle" dominantBaseline="central" fontFamily="ui-monospace, Menlo, monospace">
                  {text}
                </text>
              </g>
            );
          };
          return (
            <g key={m.name}>
              {/* inner space (padding) bands */}
              {pl > 0 && <rect x={x + bw} y={y + bw} width={pl * s} height={h - 2 * bw} fill={RED} fillOpacity=".14" />}
              {pr > 0 && <rect x={x + w - bw - pr * s} y={y + bw} width={pr * s} height={h - 2 * bw} fill={RED} fillOpacity=".14" />}
              {pl > 0 && label(x + bw + (pl * s) / 2, y - 22, `${pl}`)}
              {/* height */}
              <path d={`M${x + w + 22} ${y} V${y + h} M${x + w + 16} ${y} H${x + w + 28} M${x + w + 16} ${y + h} H${x + w + 28}`} stroke={RED} strokeWidth="1.5" />
              {label(x + w + 34, y + h / 2, `${m.height} px`, "start")}
              {/* width */}
              <path d={`M${x} ${y + h + 22} H${x + w} M${x} ${y + h + 16} V${y + h + 28} M${x + w} ${y + h + 16} V${y + h + 28}`} stroke={RED} strokeWidth="1.5" />
              {label(x + w / 2, y + h + 44, `${m.width} px`)}
              {/* corner radius */}
              {m.radius > 0 && (
                <>
                  <path
                    d={`M${x} ${y + Math.min(m.radius, h / 2) * s} A${Math.min(m.radius, h / 2) * s} ${Math.min(m.radius, h / 2) * s} 0 0 1 ${x + Math.min(m.radius, h / 2) * s} ${y}`}
                    fill="none"
                    stroke={RED}
                    strokeWidth="3"
                  />
                  {label(x - 10, y + 4, `r ${m.radius}`, "end")}
                </>
              )}
              {m.radius === 0 && label(x - 10, y + 4, "r 0", "end")}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* ---- outside: the readable fact cards ------------------------------------- */

const WEIGHT: Record<number, string> = { 300: "Light", 400: "Regular", 500: "Medium", 600: "Semibold", 700: "Bold" };

type Shape = "square" | "almost" | "rounded" | "pill" | "circle";
function shapeOf(m: Measure): Shape {
  if (m.radius === 0) return "square";
  if (m.radius >= m.height / 2 - 0.5) return Math.abs(m.width - m.height) < 1 ? "circle" : "pill";
  if (m.radius <= 4) return "almost";
  return "rounded";
}
const SHAPES: { key: Shape; label: string }[] = [
  { key: "square", label: "Square" },
  { key: "almost", label: "Almost square" },
  { key: "rounded", label: "Rounded" },
  { key: "pill", label: "Pill" },
  { key: "circle", label: "Circle" },
];
const SHAPE_NOTE: Record<Shape, string> = {
  square: "Sharp corners. Do not round them.",
  almost: "A very small curve. It should still look square.",
  rounded: "Gently rounded corners. Not a pill, not a circle.",
  pill: "Fully round ends. The radius is half the height.",
  circle: "A perfect circle: equal width and height, fully round.",
};

function ShapeIcon({ shape, on }: { shape: Shape; on: boolean }) {
  const rx = { square: 0, almost: 2, rounded: 6, pill: 11, circle: 11 }[shape];
  const w = shape === "circle" ? 22 : 34;
  return (
    <svg width="40" height="28" viewBox="0 0 40 28" aria-hidden="true">
      <rect x={(40 - w) / 2} y="3" width={w} height="22" rx={rx} fill={on ? "var(--primary-50)" : "none"} stroke={on ? "var(--primary)" : "var(--fg-4)"} strokeWidth={on ? 2 : 1.5} strokeDasharray={on ? undefined : "3 3"} />
    </svg>
  );
}

function Swatch({ role, paint }: { role: string; paint: Paint | null }) {
  return (
    <li className="ss-color">
      <span className="ss-chip" style={{ background: paint ? paint.css : "transparent" }} data-none={!paint || undefined} />
      <span className="ss-role">{role}</span>
      {paint ? (
        <>
          <code className="tok-code">{paint.token ?? "no token"}</code>
          {paint.also && <span className="ss-also">also {paint.also.join(", ")}</span>}
          <span className="ss-hex">
            {paint.hex}
            {paint.alpha < 1 && ` · ${Math.round(paint.alpha * 100)}%`}
          </span>
        </>
      ) : (
        <span className="ss-hex">None (transparent)</span>
      )}
    </li>
  );
}

function Row({ n, label, term, value, children }: { n: number; label: string; term?: string; value: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="ss-row">
      <dt>
        <span className="ss-n" aria-hidden="true">
          {n}
        </span>
        <span>
          {label}
          {term && <span className="ss-term">({term})</span>}
        </span>
      </dt>
      <dd className="ss-value">{value}</dd>
      <dd className="ss-detail">{children}</dd>
    </div>
  );
}

function Facts({ m }: { m: Measure }) {
  const shape = shapeOf(m);
  const [pt, pr, pb, pl] = m.pad;
  const widthText =
    m.widthMode === "fixed" ? `${m.width} px, always` : m.widthMode === "fill" ? `Fills the space (${m.width} px here)` : `Grows with the content (${m.width} px here)`;
  return (
    <div className="ss-facts">
      <h4 className="ss-name">{m.name}</h4>
      <dl className="ss-rows">
        <Row n={1} label="Size" value={<>{m.height} <small>px tall</small></>}>
          Width: {widthText}
        </Row>

        <Row n={2} label="Corners" value={<>{SHAPES.find((s) => s.key === shape)!.label} <small>{m.radius} px</small></>}>
          <p>{SHAPE_NOTE[shape]}</p>
          {m.radiusCss && (
            <p>
              Written in CSS as <code className="tok-code">{m.radiusCss}</code>, which draws {m.radius} px.
            </p>
          )}
          <ul className="ss-shapes" aria-label="Corner shape">
            {SHAPES.filter((s) => s.key !== "circle" || shape === "circle").map((s) => (
              <li key={s.key} data-on={s.key === shape || undefined}>
                <ShapeIcon shape={s.key} on={s.key === shape} />
                <span>
                  {s.key === shape ? <Check size={12} aria-hidden="true" /> : <X size={12} aria-hidden="true" />}
                  {s.label}
                </span>
                <span className="sr-only">{s.key === shape ? "(this one)" : "(not this)"}</span>
              </li>
            ))}
          </ul>
        </Row>

        <Row n={3} label="Space inside" term="padding" value={<>{pl === pr ? pl : `${pl} / ${pr}`} <small>px left and right</small></>}>
          Top {pt} px · Bottom {pb} px
          {m.gap !== null && <> · Gap between items {m.gap} px</>}
        </Row>

        <Row n={4} label="Border" value={m.border.paint ? <>{m.border.width} <small>px {m.border.style}</small></> : <>None</>}>
          {m.border.paint ? (
            <ul className="ss-colors">
              <Swatch role="Border" paint={m.border.paint} />
            </ul>
          ) : (
            "No border on this part."
          )}
        </Row>

        <Row n={5} label="Colors" value={<>{[m.bg, m.text, m.icon?.paint].filter(Boolean).length} <small>colors</small></>}>
          <ul className="ss-colors">
            <Swatch role="Background" paint={m.bg} />
            <Swatch role="Text" paint={m.text} />
            {m.icon && <Swatch role="Icon" paint={m.icon.paint} />}
          </ul>
        </Row>

        <Row n={6} label="Text" value={<>{m.font.size} <small>px</small></>}>
          {WEIGHT[m.font.weight] ?? "Weight"} ({m.font.weight}) · Noto Sans
          {m.font.line > 0 && <> · Line height {m.font.line} px</>}
        </Row>

        <Row n={7} label="Icon" value={m.icon ? <>{m.icon.w} × {m.icon.h} <small>px</small></> : <>None</>}>
          {m.icon ? "Outline, stroke 1.9, same color as the text." : "No icon in this example."}
          {m.shadow && <> Has a shadow (elevation).</>}
        </Row>
      </dl>
    </div>
  );
}

export function SpecSheet({
  title,
  description,
  targets,
  scale = 2,
  bg = "white",
  children,
}: {
  title: string;
  description?: React.ReactNode;
  targets: SpecTarget[];
  scale?: number;
  bg?: "muted" | "white";
  children: React.ReactNode;
}) {
  const [data, setData] = useState<Measure[]>([]);
  const onMeasure = useCallback((m: Measure[]) => setData(m), []);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <figure className="spec-sheet">
      <figcaption className="ex-head">
        <strong>{title}</strong>
        <span>
          {description ?? "Measured live from the product stylesheet."} Shown at {scale}× size; the numbers are real size.
        </span>
      </figcaption>
      <ProductDemo layout="none" pad={false} bg={bg} label={`${title}, measured`}>
        <Stage targets={targets} scale={scale} onMeasure={onMeasure}>
          {children}
        </Stage>
      </ProductDemo>
      <div className="ss-body">
        {mounted && data.length === 0 && <p className="ss-wait">Measuring…</p>}
        {data.map((m) => (
          <Facts key={m.name} m={m} />
        ))}
      </div>
    </figure>
  );
}
