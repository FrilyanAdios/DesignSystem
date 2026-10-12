import {
  Accessibility,
  Building2,
  Code2,
  Users,
  Copy,
  Eye,
  Feather,
  Layers,
  LayoutList,
  Palette,
  Ruler,
  Search,
  Type,
} from "lucide-react";
import type { PageContent } from "./index";
import { MoreButton } from "@/components/DocSections";
import { IconSpec, ShapeSpec, SpacingSpec, TypeSpec } from "./specs";

function BlockHead({ title, href, label }: { title: string; href: string; label: string }) {
  return (
    <div className="block-row">
      <h3>{title}</h3>
      <MoreButton href={href} label={label} />
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Introduction — the design language extracted from the Esco prototypes
   (NPD-FSM web, FSM Mobile, and sibling modules). Facts here mirror
   NPD-FSM/DESIGN_SYSTEM.md and styles.css; update both together.
   --------------------------------------------------------------------------- */

const PRINCIPLES = [
  {
    title: "Calm beats clever",
    body: "Screens are used every day by people who were never trained on them. Nothing should surprise, decorate, or compete for attention.",
  },
  {
    title: "Navy is scarce",
    body: "Brand navy means one thing: you can act here, or you are here. Primary button, active navigation, selected tab, link, focus. Never a heading or a background.",
  },
  {
    title: "Structure before decoration",
    body: "Whitespace, alignment, and a 1px hairline create hierarchy first. Cards are reserved for records you can select, drag, or repeat.",
  },
  {
    title: "Reorganize, never remove",
    body: "A screen becomes cleaner by grouping, ordering, and disclosing information progressively, not by hiding business data.",
  },
  {
    title: "Show each fact once",
    body: "Every value lives in its strongest place. Repeating a status or a number in two neighbouring bands is noise, not reinforcement.",
  },
  {
    title: "Visible before hover",
    body: "Every action has a shape, label, chevron, or underline at rest. Hover and tooltips only confirm what is already discoverable.",
  },
  {
    title: "One primary action",
    body: "Each page, dialog footer, or form step has exactly one filled navy button. Everything else is secondary, ghost, or a link.",
  },
];

const INFLUENCES = [
  {
    tone: "blue",
    name: "Material 3",
    role: "How it looks",
    points: ["Tokens for color, type, shape", "Surface and state layers", "4px grid, 8px rhythm", "Pastel containers with dark ink"],
  },
  {
    tone: "green",
    name: "Apple HIG",
    role: "How it behaves",
    points: ["Clarity and deference to content", "The way out is always on screen", "Large, stable touch targets", "Nothing moves under the finger"],
  },
  {
    tone: "amber",
    name: "Esco operational rules",
    role: "How dense data stays calm",
    points: ["One register pattern for every table", "Same intent, same component", "Read order for detail screens", "Export and selection rules"],
  },
] as const;

const TECHNIQUES = [
  { icon: Palette, name: "Design tokens", body: "Every color, size, radius, and shadow is a named variable. Components use names, never raw values." },
  { icon: Ruler, name: "4px spacing grid", body: "All spacing is 4, 8, 12, 16, 24, 32, or 40. Nothing sits off the scale." },
  { icon: Type, name: "Typographic hierarchy", body: "Size and weight carry hierarchy, not color. One page title, then section, card, body, and caption." },
  { icon: Eye, name: "Semantic color", body: "Five status families in soft pastel fill with dark text. Color always pairs with a word or a dot." },
  { icon: Feather, name: "Hairline structure", body: "Thin #e2e8f0 borders and dividers group content without heavy boxes." },
  { icon: Layers, name: "Near-flat elevation", body: "Shadows are barely there. Only popovers and dialogs float." },
  { icon: LayoutList, name: "Progressive disclosure", body: "Summary first, detail on demand: expandable rows, split views, drill-in panels." },
  { icon: Copy, name: "Component equivalence", body: "The same intent uses the same component everywhere: same height, icon, label, and states." },
  { icon: Search, name: "Prior art first", body: "Before building, search for the existing pattern and reuse it. A new component is the last resort." },
  { icon: Accessibility, name: "Accessible by default", body: "WCAG AA contrast, visible focus, labelled controls, 40px targets on desktop and 44px or more on touch." },
];

const SWATCHES = [
  { name: "Primary", token: "--primary", value: "#00467F", dark: true },
  { name: "Primary hover", token: "--primary-700", value: "#003559", dark: true },
  { name: "Primary tint", token: "--primary-50", value: "#EBF0F7" },
  { name: "Text", token: "--fg", value: "#393939", dark: true },
  { name: "Helper text", token: "--fg-3", value: "#616161", dark: true },
  { name: "Surface", token: "--muted", value: "#F9FAFB" },
  { name: "Border", token: "--border", value: "#E2E8F0" },
  { name: "White", token: "--bg", value: "#FFFFFF" },
];

const STATUSES = [
  { label: "Confirmed", family: "issued", meaning: "Informational" },
  { label: "Closed", family: "approved", meaning: "Success" },
  { label: "Tentative", family: "revision", meaning: "Attention" },
  { label: "Cancelled", family: "rejected", meaning: "Error" },
  { label: "Pending", family: "pending", meaning: "Neutral" },
];

const GLOSSARY = [
  { say: "Make it clean", mean: "More whitespace, tighter alignment, hairline dividers, fewer competing colors.", not: "Delete fields or hide data." },
  { say: "Minimalist", mean: "Each element earns its place. One accent, quiet neutrals, flat surfaces.", not: "Low contrast or tiny text." },
  { say: "Primary", mean: "The single filled navy button for the main action of the region.", not: "Any important-looking button." },
  { say: "Subtle hover", mean: "A light gray fill (--row-hover) or a slightly stronger border.", not: "A blue background." },
  { say: "Selected", mean: "Pale blue fill (--row-sel) plus a text or icon cue.", not: "A thick blue outline." },
  { say: "Pastel", mean: "Status: pale fill, dark text, plus a dot or label. Identity accents (a course, a category card) may use pastel too, but never look like a status.", not: "Random decoration, or color without a word." },
  { say: "Card", mean: "A repeatable or selectable record with a white surface and 10px radius.", not: "A box around every section." },
  { say: "Consistent", mean: "Reuse the existing class and token: same height, radius, icon, and label.", not: "Looks roughly similar." },
];

function Overview() {
  return (
    <div className="prose">
      <p className="statement">
        Our design language is <strong>quiet operational clarity</strong>: a minimalist, calm interface that
        makes dense information easy to read and safe to act on.
      </p>
      <ul className="keywords" aria-label="Design language keywords">
        {["Minimal", "Calm", "Structured", "Accessible", "Consistent"].map((k) => (
          <li key={k}>{k}</li>
        ))}
      </ul>
      <p>
        White and very light gray surfaces build the structure. A <strong className="hl">single navy accent</strong> marks what you can act on.
        {" "}<strong className="hl">Soft pastel colors</strong> communicate status. Hierarchy comes from typography, spacing, and thin
        dividers rather than from boxes, shadows, or extra color.
      </p>
      <p className="source-note">
        Extracted from the Esco prototypes: Field Service (web and mobile), Customer Support, EscoLMS, Replenishment
        Control, and Ticket. Every one of them shares Noto Sans, the navy accent, pastel status, hairline borders, and
        outline icons.
      </p>
    </div>
  );
}

const AUDIENCES = [
  {
    icon: Users,
    title: "People who use it",
    body: "Coordinators, service engineers, support agents, learners, and planners. They work in the product every day, often under time pressure, and without formal training.",
  },
  {
    icon: Building2,
    title: "People who own it",
    body: "Stakeholders from different departments and business units. Each brings its own requirements, workflows, and definition of success.",
  },
  {
    icon: Code2,
    title: "People who build it",
    body: "Designers, developers, and QA across teams. They need one shared vocabulary so a request is built the same way every time.",
  },
];

const PRODUCTS = [
  { area: "Field service", product: "Service scheduling, reports, work orders", platform: "Web, mobile", challenge: "Dense calendars and dispatch decisions" },
  { area: "Customer support", product: "Tickets and customer cases", platform: "Web", challenge: "Fast triage without losing context" },
  { area: "Learning", product: "EscoLMS for learners and admins", platform: "Web, mobile", challenge: "Clear progress and low friction" },
  { area: "Supply chain", product: "Replenishment Control", platform: "Web", challenge: "Large data tables that stay accurate" },
];

function Audience() {
  return (
    <div className="prose">
      <p>
        We design for Esco as a whole, not for a single team. Every product serves a different department or business
        unit, with different requirements and different design challenges. What connects them is <strong className="hl">one design language</strong>,
        applied the same way on every platform.
      </p>

      <ul className="audiences">
        {AUDIENCES.map(({ icon: Icon, title, body }) => (
          <li key={title}>
            <span className="t-icon" aria-hidden="true">
              <Icon size={18} />
            </span>
            <h3>{title}</h3>
            <p>{body}</p>
          </li>
        ))}
      </ul>

      <h3 className="sub-title">Different problems, one language</h3>
      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th scope="col">Business area</th>
              <th scope="col">Product</th>
              <th scope="col">Platform</th>
              <th scope="col">Main design challenge</th>
            </tr>
          </thead>
          <tbody>
            {PRODUCTS.map((p) => (
              <tr key={p.area}>
                <th scope="row">{p.area}</th>
                <td>{p.product}</td>
                <td className="nowrap">{p.platform}</td>
                <td>{p.challenge}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <dl className="facts">
        <div>
          <dt>Changes per product</dt>
          <dd>Content, workflow, and information density</dd>
        </div>
        <div>
          <dt>Never changes</dt>
          <dd>Tokens, components, interaction, and vocabulary</dd>
        </div>
      </dl>
    </div>
  );
}

function Principles() {
  return (
    <ol className="principles">
      {PRINCIPLES.map((p, i) => (
        <li key={p.title}>
          <span className="num" aria-hidden="true">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div>
            <h3>{p.title}</h3>
            <p>{p.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

function Influences() {
  return (
    <>
      <p className="prose-p">
        We do not invent a style from scratch. We combine <strong className="hl">three sources</strong>, each answering a different question.
      </p>
      <div className="influences">
        {INFLUENCES.map((f) => (
          <div key={f.name} className={`influence tone-${f.tone}`}>
            <span className="role">{f.role}</span>
            <h3>{f.name}</h3>
            <ul>
              {f.points.map((pt) => (
                <li key={pt}>{pt}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}

function Techniques() {
  return (
    <ul className="techniques">
      {TECHNIQUES.map(({ icon: Icon, name, body }) => (
        <li key={name}>
          <span className="t-icon" aria-hidden="true">
            <Icon size={18} />
          </span>
          <div>
            <h3>{name}</h3>
            <p>{body}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

function Theme() {
  return (
    <div className="theme">
      <div className="theme-block">
        <BlockHead title="Color" href="/foundations/color" label="Color" />
        <ul className="swatches">
          {SWATCHES.map((s) => (
            <li key={s.token}>
              <span className="chip" style={{ background: s.value }} data-light={!s.dark || undefined} />
              <span className="s-name">{s.name}</span>
              <code>{s.value}</code>
            </li>
          ))}
        </ul>
      </div>

      <div className="theme-block">
        <BlockHead title="Status" href="/components/status-pill" label="Status pill" />
        <ul className="statuses">
          {STATUSES.map((s) => (
            <li key={s.family}>
              <span className={`pill b-${s.family}`}>
                <span className="d" aria-hidden="true" />
                {s.label}
              </span>
              <span className="s-meaning">{s.meaning}</span>
            </li>
          ))}
        </ul>
      </div>

      <TypeSpec />
      <SpacingSpec />
      <ShapeSpec />
      <IconSpec />
    </div>
  );
}

function Glossary() {
  return (
    <>
      <p className="prose-p">
        Design words mean different things to different people. Use this table when briefing developers so a
        request is built <strong className="hl">the same way every time</strong>.
      </p>
      <div className="table-wrap">
        <table className="glossary">
          <thead>
            <tr>
              <th scope="col">When we say</th>
              <th scope="col">We mean</th>
              <th scope="col">We do not mean</th>
            </tr>
          </thead>
          <tbody>
            {GLOSSARY.map((g) => (
              <tr key={g.say}>
                <th scope="row">“{g.say}”</th>
                <td>{g.mean}</td>
                <td className="not">{g.not}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export const introduction: PageContent = {
  lead: "What our design language is, where it comes from, and the words we use to describe it.",
  art: "introduction",
  guide: {
    meta: ["About 10 minutes", "7 chapters in 3 parts", "No design background needed"],
    questions: [
      { q: "What does our design style look like?", id: "overview" },
      { q: "Which colors can I use, and for what?", id: "theme" },
      { q: "When is a button primary?", id: "principles" },
      { q: "How do I show a status?", id: "theme" },
      { q: "Should I build a new component?", id: "techniques" },
      { q: "How do I brief a developer clearly?", id: "shared-vocabulary" },
    ],
  },
  sections: [
    {
      id: "overview",
      title: "Overview",
      part: { title: "Understand the why", description: "What our design language is and who it serves." },
      summary: "Our design language in one sentence, and what it looks like on screen.",
      body: <Overview />,
      takeaway: "White structure, one navy accent for action, pastel for status. Hierarchy comes from type and spacing, not decoration.",
    },
    {
      id: "who-we-design-for",
      title: "Who we design for",
      summary: "The people and products this system serves, and what stays the same across all of them.",
      body: <Audience />,
      more: { href: "/get-started/contributing", label: "How teams contribute" },
      takeaway: "Content, workflow, and density change per product. Tokens, components, interaction, and vocabulary never do.",
    },
    {
      id: "principles",
      title: "Principles",
      part: { title: "Learn the rules", description: "The beliefs and methods behind every screen." },
      summary: "Seven rules that settle design decisions before they become debates.",
      body: <Principles />,
      more: { href: "/get-started/principles", label: "Design principles" },
      takeaway: "When two options both work, pick the calmer one, and keep exactly one primary action per region.",
    },
    {
      id: "influences",
      title: "Influences",
      summary: "The three sources we borrow from, and the question each one answers.",
      body: <Influences />,
      more: { href: "/get-started/designing", label: "For designers" },
      takeaway: "Material 3 decides how it looks, Apple HIG how it behaves, and Esco rules how dense data stays calm.",
    },
    {
      id: "techniques",
      title: "Techniques",
      summary: "Ten working methods that turn the principles into real screens.",
      body: <Techniques />,
      more: { href: "/foundations/design-tokens", label: "Design tokens" },
      takeaway: "Use tokens and existing components first. A new component is the last resort, not the starting point.",
    },
    {
      id: "theme",
      title: "The theme at a glance",
      part: { title: "Apply it", description: "The values and words you use every day." },
      summary: "The core tokens on one page: color, status, type, spacing, shape, and icons.",
      body: <Theme />,
      more: { href: "/foundations", label: "All foundations" },
      takeaway: "Navy means action, pastel means status, spacing steps by 4px, and every raised surface uses a 10px radius.",
    },
    {
      id: "shared-vocabulary",
      title: "Shared vocabulary",
      summary: "What common design words mean here, so a request gets built the same way every time.",
      body: <Glossary />,
      more: { href: "/foundations/content", label: "Content and writing" },
      takeaway: "Before handing off a brief, check the “We do not mean” column for every word you used.",
    },
  ],
};
