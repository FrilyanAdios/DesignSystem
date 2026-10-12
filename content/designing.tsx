import {
  ArrowLeft,
  Check,
  Layers,
  LayoutGrid,
  ListChecks,
  Loader2,
  Monitor,
  PenLine,
  Ruler,
  Search,
  ShieldCheck,
  Smartphone,
  Tablet,
  Laptop,
  type LucideIcon,
} from "lucide-react";
import type { PageContent } from "./index";
import { Btn, Field, Pill, Rule } from "./principles";

/* ---------------------------------------------------------------------------
   For designers — how to design an Esco screen, from first search to hand-off.
   Facts mirror NPD-FSM/DESIGN_SYSTEM.md (the FSM design contract) and the
   tokens in globals.css; update both together.
   --------------------------------------------------------------------------- */

/* ---- 1. workflow ---------------------------------------------------------- */

const STEPS: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: Search, title: "Find prior art", body: "Search the components and existing screens. Reuse before you draw." },
  { icon: PenLine, title: "Order the content", body: "List what the user needs, in the order they need it." },
  { icon: LayoutGrid, title: "Compose", body: "Build with existing components and tokens. No new hex values." },
  { icon: Layers, title: "Design every state", body: "Hover, focus, selected, disabled, loading, empty, error." },
  { icon: ListChecks, title: "Check and hand off", body: "Run the checklist, then hand off with token names." },
];

function Workflow() {
  return (
    <div className="prose">
      <Rule icon={Search}>
        Most screens are <strong className="hl">already solved somewhere</strong>. Your job is to find that pattern
        and apply it, not to invent a new one.
      </Rule>
      <ol className="steps">
        {STEPS.map(({ icon: Icon, title, body }, i) => (
          <li key={title}>
            <span className="st-icon" aria-hidden="true">
              <Icon size={20} />
            </span>
            <span className="st-num">Step {i + 1}</span>
            <h3>{title}</h3>
            <p>{body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ---- 2. rules ------------------------------------------------------------- */

const RULES: React.ReactNode[] = [
  <>Reuse an existing <strong className="hl">component and token</strong> before drawing a new one or picking a new color.</>,
  <>Use <strong className="hl">Noto Sans</strong> only. No second UI font.</>,
  <>One filled <strong className="hl">primary button</strong> per page, dialog footer, or form step.</>,
  <>Never use <strong className="hl">color alone</strong> for a state. Pair it with text, a dot, a check, or an icon.</>,
  <>Never <strong className="hl">remove business data</strong> to look clean. Regroup, reorder, or disclose it.</>,
  <>Never <strong className="hl">shrink essential text</strong> to fit. Let the table scroll or the layout reflow.</>,
  <>No permanent <strong className="hl">blue outlines</strong> on ordinary cards. Selection is a soft fill.</>,
  <>Every control is <strong className="hl">visible at rest</strong>: a shape, label, chevron, or underline.</>,
  <><strong className="hl">Icon-only</strong> buttons only for universal actions, and each one has an accessible name.</>,
  <>Keep the <strong className="hl">existing interaction model</strong> unless the change is explicitly requested.</>,
];

function Rules() {
  return (
    <div className="prose">
      <p>These come straight from the design contract. A design that breaks one goes back before review.</p>
      <ol className="rules">
        {RULES.map((r, i) => (
          <li key={i}>
            <span className="r-num">{String(i + 1).padStart(2, "0")}</span>
            <p>{r}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ---- 3. read order -------------------------------------------------------- */

const ORDER = [
  { q: "Where am I?", a: "Back action, record identity, date" },
  { q: "What is the state?", a: "Status and priority" },
  { q: "Who and when?", a: "Engineer and schedule range" },
  { q: "What work?", a: "Work order, unit, service jobs" },
  { q: "What else do I need?", a: "Address, contact, instructions, notes, tools" },
  { q: "Anything related?", a: "Related schedules, behind a disclosure" },
];

const Mark = ({ n }: { n: number }) => <span className="ro-mark">{n}</span>;

function ReadOrder() {
  return (
    <div className="prose">
      <Rule icon={PenLine}>
        A detail screen answers <strong className="hl">six questions, in order</strong>. Put each answer where the eye
        lands when the question comes up.
      </Rule>
      <div className="readorder">
        <div className="cmp-canvas ro-canvas" aria-hidden="true">
          <div className="mk-card ro-card">
            <div className="ro-block">
              <Mark n={1} />
              <span className="mk-inline">
                <ArrowLeft size={12} /> <strong className="mk-title">WO-1042 · Pump inspection</strong>
              </span>
              <span className="ro-date">12 Oct 2026</span>
            </div>
            <div className="ro-block">
              <Mark n={2} />
              <Pill tone="issued">Confirmed</Pill>
              <Pill tone="revision">High priority</Pill>
            </div>
            <div className="ro-block ro-col">
              <Mark n={3} />
              <Field k="Engineer" v="R. Tan" />
              <Field k="Schedule" v="09:00 – 11:30" />
            </div>
            <div className="ro-block ro-col">
              <Mark n={4} />
              <Field k="Unit" v="Airstream AC2" />
              <Field k="Jobs" v="Inspection, filter" />
            </div>
            <div className="ro-block ro-col">
              <Mark n={5} />
              <Field k="Site" v="Singapore, Bldg 4" />
              <Field k="Contact" v="L. Ong" />
            </div>
            <div className="ro-block">
              <Mark n={6} />
              <span className="mk-more">Related schedules (3)</span>
            </div>
          </div>
        </div>
        <ol className="ro-list">
          {ORDER.map((o, i) => (
            <li key={o.q}>
              <span className="ro-mark">{i + 1}</span>
              <span>
                <strong>{o.q}</strong>
                {o.a}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/* ---- 4. layout ------------------------------------------------------------ */

const SPACING = [
  { use: "Text to its metadata", token: "--sp-1", value: "4px" },
  { use: "Label to field, gap between buttons", token: "--sp-2", value: "8px" },
  { use: "Icon to label", token: "--sp-3", value: "12px" },
  { use: "Card padding, between fields", token: "--sp-4", value: "16px" },
  { use: "Page gutter, gap between sections", token: "--sp-5", value: "24px" },
  { use: "Mobile gutter", token: "--gutter-sm", value: "16px" },
];

const SIZES = [
  { use: "Field, standard and primary button", token: "--h-lg", value: "40px" },
  { use: "Toolbar control", token: "--h-md", value: "36px" },
  { use: "Compact control", token: "--h-sm", value: "32px" },
  { use: "Touch target on mobile", token: "--h-xl", value: "44px" },
];

function TokenTable({ rows, head }: { rows: { use: string; token: string; value: string }[]; head: string }) {
  return (
    <div className="table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            <th scope="col">{head}</th>
            <th scope="col">Token</th>
            <th scope="col">Value</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.token}>
              <th scope="row">{r.use}</th>
              <td>
                <code className="tok-code">{r.token}</code>
              </td>
              <td className="nowrap">{r.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Layout() {
  return (
    <div className="prose">
      <Rule icon={Ruler}>
        Every gap is a step on the <strong className="hl">4px scale</strong>. Look up the situation, use the token.
      </Rule>
      <h3 className="sub-title">Spacing</h3>
      <TokenTable head="When you need" rows={SPACING} />
      <h3 className="sub-title">Control height</h3>
      <TokenTable head="For" rows={SIZES} />
      <p>
        Toolbars form one row when they fit, with <strong className="hl">8px</strong> between related controls and
        whitespace or one divider between groups. The main content gets width before any side panel, and a side panel
        that competes with the task should collapse.
      </p>
    </div>
  );
}

/* ---- 5. type and color ---------------------------------------------------- */

const TYPE = [
  { use: "Page title, one per page", token: "--fs-page", value: "19px · 400" },
  { use: "Section or dialog title", token: "--fs-section", value: "16px · 600" },
  { use: "Record identity on a card", token: "--fs-card", value: "14px · 600" },
  { use: "Body, table cell, input", token: "--fs-body", value: "13.5px · 400" },
  { use: "Metadata, compact control", token: "--fs-sub", value: "12.5px" },
  { use: "Form label, above the field", token: "--fs-label", value: "12px · 600" },
  { use: "Help text, never essential", token: "--fs-help", value: "11.5px · 400" },
];

const COLOR = [
  { use: "Primary button, link, active nav, focus", token: "--primary", value: "#00467F" },
  { use: "Titles and main values", token: "--fg", value: "#393939" },
  { use: "Body copy and labels", token: "--fg-2", value: "#4D4D4F" },
  { use: "Metadata, secondary lines", token: "--fg-3", value: "#616161" },
  { use: "Captions, empty values (lowest gray)", token: "--fg-4", value: "#737373" },
  { use: "Component and section borders", token: "--border", value: "#E2E8F0" },
  { use: "Input borders", token: "--border-input", value: "#CBD2D9" },
];

const MAPPING = [
  { word: "Awaiting parts", family: "revision", meaning: "Attention" },
  { word: "Dispatched", family: "issued", meaning: "Informational" },
  { word: "Completed", family: "approved", meaning: "Success" },
  { word: "Rescheduled", family: "pending", meaning: "Neutral" },
  { word: "Rejected by customer", family: "rejected", meaning: "Error" },
];

function TypeColor() {
  return (
    <div className="prose">
      <Rule icon={LayoutGrid}>
        Use <strong className="hl">token names, never hex values</strong>. If a value is missing, ask for a token
        instead of inventing one.
      </Rule>
      <h3 className="sub-title">Type</h3>
      <TokenTable head="For" rows={TYPE} />
      <p>
        Sentence case everywhere. Nothing essential below 11.5px. Use tabular numbers for dates, times, durations,
        and counts.
      </p>
      <h3 className="sub-title">Color</h3>
      <TokenTable head="For" rows={COLOR} />
      <h3 className="sub-title">A new status? Map it, don’t color it</h3>
      <p>
        There are <strong className="hl">five status families</strong>. A new business word joins the nearest one.
        Never create a color per status.
      </p>
      <ul className="mapping">
        {MAPPING.map((m) => (
          <li key={m.word}>
            <span className="mp-word">“{m.word}”</span>
            <span className="mp-arrow" aria-hidden="true">
              →
            </span>
            <Pill tone={m.family}>{m.word}</Pill>
            <span className="mp-meaning">{m.meaning}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---- 6. states ------------------------------------------------------------ */

const STATES: { name: string; rule: string; cls: string; label?: React.ReactNode }[] = [
  { name: "Resting", rule: "Shape and label visible", cls: "" },
  { name: "Hover", rule: "Quiet gray fill or stronger border", cls: "st-hover" },
  { name: "Pressed", rule: "Optional 1px move down", cls: "st-pressed" },
  { name: "Focus", rule: "2px navy ring, 2px offset", cls: "st-focus" },
  { name: "Selected", rule: "Soft fill plus a text or icon cue", cls: "st-selected", label: <><Check size={12} /> Selected</> },
  { name: "Disabled", rule: "50% opacity, no pointer", cls: "st-disabled" },
  { name: "Loading", rule: "Same size, label kept", cls: "st-loading", label: <><Loader2 size={12} className="spin" /> Saving</> },
];

function States() {
  return (
    <div className="prose">
      <Rule icon={Layers}>
        A component is not designed until <strong className="hl">every state</strong> is drawn. Developers build what
        they see, and only what they see.
      </Rule>
      <ul className="states" aria-label="Interaction states">
        {STATES.map((s) => (
          <li key={s.name}>
            <span className="cmp-canvas st-canvas" aria-hidden="true">
              <span className={`mk-btn mk-sec st-btn ${s.cls}`}>{s.label ?? "Export all"}</span>
            </span>
            <strong>{s.name}</strong>
            <span>{s.rule}</span>
          </li>
        ))}
      </ul>
      <p>
        Also design the <strong className="hl">empty and error</strong> states: say what happened and what to do next.
        Motion answers an action and lasts 120 to 200ms.
      </p>
    </div>
  );
}

/* ---- 7. accessibility and responsive -------------------------------------- */

const A11Y = [
  "Body text meets 4.5:1 contrast. Large text and control borders meet 3:1.",
  "Focus is always visible.",
  "Every input has a label. Every icon-only button has a name.",
  "Targets are 40px on desktop and at least 44px on touch.",
  "Status and validation never rely on hue alone.",
  "Truncated text always has a way to see the full value.",
];

const BREAKS: { icon: LucideIcon; at: string; label: string; what: string }[] = [
  { icon: Smartphone, at: "< 640", label: "Phone", what: "16px gutters, full-width dialogs, 44px controls" },
  { icon: Tablet, at: "< 900", label: "Tablet", what: "Sidebar becomes a drawer, split views stack, tables scroll" },
  { icon: Laptop, at: "< 1180", label: "Small laptop", what: "Multi-column details collapse to one column" },
  { icon: Monitor, at: "≥ 1180", label: "Desktop", what: "Full multi-panel layouts" },
];

function A11yResponsive() {
  return (
    <div className="prose">
      <Rule icon={ShieldCheck}>
        Accessible and responsive are <strong className="hl">acceptance criteria</strong>, not extras for later.
      </Rule>
      <h3 className="sub-title">Accessibility</h3>
      <ul className="a11y-list">
        {A11Y.map((a) => (
          <li key={a}>
            <Check size={16} aria-hidden="true" />
            {a}
          </li>
        ))}
      </ul>
      <h3 className="sub-title">Breakpoints</h3>
      <ol className="breaks">
        {BREAKS.map(({ icon: Icon, at, label, what }) => (
          <li key={at}>
            <span className="bk-icon" aria-hidden="true">
              <Icon size={20} />
            </span>
            <span className="bk-at">{at}px</span>
            <strong>{label}</strong>
            <span className="bk-what">{what}</span>
          </li>
        ))}
      </ol>
      <p>
        Toolbars below 780px may move optional controls into an overflow menu. When reflowing,{" "}
        <strong className="hl">keep the hierarchy</strong>. Don’t just squeeze the desktop layout.
      </p>
    </div>
  );
}

/* ---- 8. hand-off ---------------------------------------------------------- */

const HANDOFF = [
  "Every component is an existing one, or the new one is flagged and explained.",
  "Colors, sizes, and spacing are named as tokens, not hex or pixel guesses.",
  "Real content is used, including the longest realistic value.",
  "Every state is drawn: hover, focus, selected, disabled, loading, empty, error.",
  "Truncated values show where the full value lives.",
  "Icon-only buttons have their accessible name written down.",
  "Behavior below 1180px, 900px, and 640px is shown or described.",
  "The design passes the seven principles checklist.",
];

function Handoff() {
  return (
    <div className="prose">
      <Rule icon={ListChecks}>
        A good hand-off means the developer <strong className="hl">never has to guess</strong>. Tick all eight before
        you share the file.
      </Rule>
      <ol className="checklist">
        {HANDOFF.map((h) => (
          <li key={h} className="no-link">
            <span className="ck-box" aria-hidden="true">
              <Check size={14} />
            </span>
            <span className="ck-q">{h}</span>
          </li>
        ))}
      </ol>
      <div className="mk-handoff" aria-hidden="true">
        <Btn kind="pri">Export all</Btn>
        <span className="ho-note">
          <code className="tok-code">.btn.btn-sm.export-btn</code> · <code className="tok-code">download</code> 14px ·
          label “Export all” · sits before table settings
        </span>
      </div>
      <p className="ho-caption">
        A real hand-off note from the contract: component, icon, label, and placement, all named.
      </p>
    </div>
  );
}

export const designing: PageContent = {
  lead: "How to design an Esco screen, from the first search to a hand-off the developer never has to guess at.",
  art: "designing",
  guide: {
    meta: ["About 8 minutes", "8 chapters in 4 parts", "Based on the FSM design contract"],
    questions: [
      { q: "Where do I start a new screen?", id: "workflow" },
      { q: "What font size is a form label?", id: "type-and-color" },
      { q: "In what order should details appear?", id: "read-order" },
      { q: "My status has a new name. Which color?", id: "type-and-color" },
      { q: "Which states do I have to design?", id: "every-state" },
      { q: "What changes on tablet and mobile?", id: "accessible-and-responsive" },
    ],
  },
  sections: [
    {
      id: "workflow",
      title: "The workflow",
      part: { title: "Before you start", description: "How the work flows and which rules never bend." },
      summary: "Five steps from blank canvas to hand-off.",
      body: <Workflow />,
      takeaway: "Search first. Most new screens are an existing pattern with new content.",
      more: { href: "/resources/design-kit", label: "Figma design kit" },
    },
    {
      id: "rules",
      title: "Ten rules that never bend",
      summary: "The non-negotiables from the design contract.",
      body: <Rules />,
      takeaway: "Reuse, one primary, color never alone, no data removed, nothing hidden behind hover.",
      more: { href: "/get-started/principles", label: "Design principles" },
    },
    {
      id: "read-order",
      title: "Read order",
      part: { title: "Design the screen", description: "Where things go and which values to use." },
      summary: "Six questions every detail screen answers, top to bottom.",
      body: <ReadOrder />,
      takeaway: "Identity, state, people and time, the work, supporting detail, then related items.",
      more: { href: "/foundations/grid", label: "Layout and grid" },
    },
    {
      id: "layout-and-spacing",
      title: "Layout and spacing",
      summary: "Which gap and which control height, by situation.",
      body: <Layout />,
      takeaway: "Spacing steps by 4px. Fields and buttons are 40px tall, 44px on touch.",
      more: { href: "/foundations/spacing", label: "Spacing" },
    },
    {
      id: "type-and-color",
      title: "Type and color",
      summary: "A lookup for text sizes, colors, and status.",
      body: <TypeColor />,
      takeaway: "Name the token. A new status joins one of the five families.",
      more: { href: "/foundations/color", label: "Color" },
    },
    {
      id: "every-state",
      title: "Every state",
      part: { title: "Make it complete", description: "What has to be drawn before anything is built." },
      summary: "Seven interaction states, plus empty and error.",
      body: <States />,
      takeaway: "If a state is not in the file, it will not be in the product.",
      more: { href: "/foundations/interaction-states", label: "Interaction states" },
    },
    {
      id: "accessible-and-responsive",
      title: "Accessible and responsive",
      summary: "The acceptance criteria and the four breakpoints.",
      body: <A11yResponsive />,
      takeaway: "Contrast, focus, labels, 44px touch targets, and a layout that reflows instead of squeezing.",
      more: { href: "/foundations/accessibility", label: "Accessibility" },
    },
    {
      id: "hand-off",
      title: "Hand-off",
      part: { title: "Hand off", description: "Sharing a design so it is built as drawn." },
      summary: "Eight things every file includes.",
      body: <Handoff />,
      takeaway: "Name every component, token, state, and breakpoint. Then nothing is left to guess.",
      more: { href: "/get-started/developing", label: "For developers" },
    },
  ],
};
