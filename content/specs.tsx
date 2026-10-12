import {
  Bell,
  Calendar,
  Download,
  Filter,
  Search,
  Settings,
  SlidersHorizontal,
  Trash2,
  type LucideIcon,
} from "lucide-react";
import { MoreButton } from "@/components/DocSections";

/* ---------------------------------------------------------------------------
   Spec sheets — an "industrial" presentation of the foundations: numbered
   frames, mono token labels, graph-paper canvases, and dimension lines.
   Same palette and hairlines as the rest of the system; only the framing is
   more technical.
   --------------------------------------------------------------------------- */

type FrameProps = {
  code: string;
  title: string;
  meta: string;
  href?: string;
  label?: string;
  children: React.ReactNode;
};

function SpecFrame({ code, title, meta, href, label, children }: FrameProps) {
  return (
    <section className="spec" aria-label={title}>
      <header className="spec-head">
        <span className="spec-code">{code}</span>
        <h3>{title}</h3>
        <span className="spec-meta">{meta}</span>
        {href && label && <MoreButton href={href} label={label} />}
      </header>
      {children}
    </section>
  );
}

/* ---- typography ---------------------------------------------------------- */

const TYPE = [
  { role: "Page title", token: "--fs-page", size: 19, weight: 400, use: "One per page" },
  { role: "Section title", token: "--fs-section", size: 16, weight: 600, use: "Content group, dialog title" },
  { role: "Card title", token: "--fs-card", size: 14, weight: 600, use: "Record identity" },
  { role: "Body", token: "--fs-body", size: 13.5, weight: 400, use: "Content, tables, inputs" },
  { role: "Secondary", token: "--fs-sub", size: 12.5, weight: 400, use: "Metadata, compact controls" },
  { role: "Label", token: "--fs-label", size: 12, weight: 600, use: "Form label, above the field" },
  { role: "Caption", token: "--fs-help", size: 11.5, weight: 400, use: "Help text, never essential" },
];

export function TypeSpec({ standalone }: { standalone?: boolean } = {}) {
  return (
    <SpecFrame
      code="F.01"
      title="Typography"
      meta="Noto Sans · 7 roles"
      href={standalone ? undefined : "/foundations/typography"}
      label="Typography"
    >
      <div className="type-hero">
        <div className="type-glyph" aria-hidden="true">
          Aa
        </div>
        <dl className="spec-list">
          <div>
            <dt>Family</dt>
            <dd>Noto Sans</dd>
          </div>
          <div>
            <dt>Weights</dt>
            <dd>
              <span style={{ fontWeight: 400 }}>400 Regular</span>
              <span style={{ fontWeight: 500 }}>500 Medium</span>
              <span style={{ fontWeight: 600 }}>600 Semibold</span>
            </dd>
          </div>
          <div>
            <dt>Case</dt>
            <dd>Sentence case everywhere</dd>
          </div>
          <div>
            <dt>Minimum</dt>
            <dd>11.5px for any meaningful text</dd>
          </div>
        </dl>
      </div>

      <div className="spec-table-wrap">
        <table className="spec-table">
          <thead>
            <tr>
              <th scope="col">Specimen</th>
              <th scope="col">Token</th>
              <th scope="col" className="num">Size</th>
              <th scope="col" className="num">Weight</th>
              <th scope="col">Use</th>
            </tr>
          </thead>
          <tbody>
            {TYPE.map((t) => (
              <tr key={t.token}>
                <th scope="row" style={{ fontSize: t.size, fontWeight: t.weight }}>
                  {t.role}
                </th>
                <td>
                  <code>{t.token}</code>
                </td>
                <td className="num">
                  <code>{t.size}px</code>
                </td>
                <td className="num">
                  <code>{t.weight}</code>
                </td>
                <td className="use">{t.use}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SpecFrame>
  );
}

/* ---- spacing ------------------------------------------------------------- */

const SPACE = [
  { token: "--sp-1", px: 4, use: "Text to its metadata" },
  { token: "--sp-2", px: 8, use: "Label to field, button gap" },
  { token: "--sp-3", px: 12, use: "Icon to label" },
  { token: "--sp-4", px: 16, use: "Card padding, between fields" },
  { token: "--sp-5", px: 24, use: "Page gutter, section gap" },
  { token: "--sp-6", px: 32, use: "Large section break" },
  { token: "--sp-7", px: 40, use: "Page block separation" },
];

export function SpacingSpec({ standalone }: { standalone?: boolean } = {}) {
  return (
    <SpecFrame code="F.02" title="Spacing" meta="4px base · 7 steps" href={standalone ? undefined : "/foundations/spacing"} label="Spacing">
      <ol className="ruler">
        {SPACE.map((s, i) => (
          <li key={s.token}>
            <span className="step">{String(i + 1).padStart(2, "0")}</span>
            <code className="tok">{s.token}</code>
            <span className="track grid-paper">
              <span className="dim" style={{ width: s.px * 6 }}>
                <span className="dim-label">{s.px}</span>
              </span>
            </span>
            <span className="use">{s.use}</span>
          </li>
        ))}
      </ol>
      <p className="spec-note">
        Scale drawn at 6× · every value is a multiple of 4 · nothing off-scale.
      </p>
    </SpecFrame>
  );
}

/* ---- shape --------------------------------------------------------------- */

const SHAPE = [
  { token: "--radius-tick", r: 4, use: "Checkbox, micro badge" },
  { token: "--radius-control", r: 6, use: "Compact button, menu item" },
  { token: "--radius-field", r: 8, use: "Input, standard button" },
  { token: "--radius-card", r: 10, use: "Card, dialog, popover" },
  { token: "--radius-pill", r: 20, use: "Status pill, chip" },
];

export function ShapeSpec({ standalone }: { standalone?: boolean } = {}) {
  return (
    <SpecFrame code="F.03" title="Shape" meta="5 radii · by role" href={standalone ? undefined : "/foundations/shape"} label="Shape">
      <ul className="shape-grid">
        {SHAPE.map((s) => (
          <li key={s.token}>
            <div className="shape-canvas grid-paper">
              <span className="shape-box" style={{ borderRadius: s.r * 2 }}>
                <span className="corner" style={{ width: s.r * 2, height: s.r * 2 }} />
              </span>
              <span className="shape-r">r {s.r}</span>
            </div>
            <code className="tok">{s.token}</code>
            <span className="use">{s.use}</span>
          </li>
        ))}
      </ul>
      <p className="spec-note">Corners drawn at 2× · one surface radius (10px) for everything raised.</p>
    </SpecFrame>
  );
}

/* ---- icons --------------------------------------------------------------- */

const ICONS: { icon: LucideIcon; name: string }[] = [
  { icon: Search, name: "search" },
  { icon: Filter, name: "filter" },
  { icon: Download, name: "download" },
  { icon: Calendar, name: "calendar" },
  { icon: Bell, name: "bell" },
  { icon: Settings, name: "settings" },
  { icon: SlidersHorizontal, name: "sliders" },
  { icon: Trash2, name: "trash-2" },
];

export function IconSpec({ standalone }: { standalone?: boolean } = {}) {
  return (
    <SpecFrame
      code="F.04"
      title="Iconography"
      meta="Lucide style · outline · stroke 1.9"
      href={standalone ? undefined : "/foundations/iconography"}
      label="Iconography"
    >
      <div className="icon-spec">
        <div className="icon-sizes">
          {[14, 16, 20].map((size) => (
            <div key={size} className="icon-size">
              <span className="keyline" style={{ width: size * 3, height: size * 3 }}>
                <Search size={size * 3} strokeWidth={1.9} aria-hidden="true" />
              </span>
              <code>{size}px</code>
              <span className="use">{size === 14 ? "Inside buttons" : size === 16 ? "Default on web" : "Default on mobile"}</span>
            </div>
          ))}
        </div>
        <dl className="spec-list">
          <div>
            <dt>Library</dt>
            <dd>Lucide-style shapes, inlined: <code>ic(name, size)</code> on web, <code>icons.js</code> on mobile</dd>
          </div>
          <div>
            <dt>Style</dt>
            <dd>Outline only, round caps and joins</dd>
          </div>
          <div>
            <dt>Stroke</dt>
            <dd>1.9 at a 24 artboard</dd>
          </div>
          <div>
            <dt>Color</dt>
            <dd>Inherits text color</dd>
          </div>
          <div>
            <dt>Rule</dt>
            <dd>One family. No emoji, no filled packs.</dd>
          </div>
        </dl>
      </div>
      <ul className="icon-grid">
        {ICONS.map(({ icon: Icon, name }) => (
          <li key={name}>
            <span className="keyline small">
              <Icon size={20} strokeWidth={1.9} aria-hidden="true" />
            </span>
            <code>{name}</code>
          </li>
        ))}
      </ul>
      <p className="spec-note">Size specimens drawn at 3× · library set shown at actual 20px.</p>
    </SpecFrame>
  );
}
