import { Example } from "@/components/demo/Example";
import { Ic } from "@/components/demo/Ic";
import { SpecSheet } from "@/components/demo/SpecSheet";
import { ScreenWidths, WEB_SCREENS } from "@/components/demo/ScreenWidths";
import { StatusPillArt } from "@/components/art/status-pill";
import { Code, Do, Dont, T, Table } from "../dev-kit";
import type { ComponentContent } from "./types";

/* ---------------------------------------------------------------------------
   Status pill — facts from DESIGN_SYSTEM.md › Status, badge, and editable
   state, Color tokens (semantic status families); styles.css (STATUS SYSTEM:
   .pill, .flag, .statectl, .b-*; status tokens); sr/sr-data.js
   (SR_SCHED_STATES); sr/sr-columns.js (srStatusCell); script.js (.flag
   wo-fu-flag, .wq-flag); FSM-Mobile css/status-badges.css,
   js/status-badges.js, css/theme-dark.css, css/design-system-unification.css.
   --------------------------------------------------------------------------- */

/* FSM-Mobile/css/status-badges.css (its :root variables scoped to .screen,
   because the demo renders in a shadow root), plus the caption size that
   css/design-system-unification.css applies to .pill-tag on every screen.
   The demo stage loads the web stylesheet only, so the mobile rules come in here. */
const MOBILE_PILL_CSS = `
.screen{
  --status-issued-bg:#e6f0fa;--status-issued-fg:#0a5187;
  --status-approved-bg:#e7f6ed;--status-approved-fg:#146c34;
  --status-revision-bg:#fdf2e1;--status-revision-fg:#b45309;
  --status-rejected-bg:#fdeaea;--status-rejected-fg:#c2362f;
  --status-pending-bg:#eef1f5;--status-pending-fg:#4a5b69;
}
.screen .pill-tag{
  display:inline-flex;align-items:center;gap:5px;min-height:22px;height:auto;
  padding:2px 9px;border:0;border-radius:999px;box-shadow:none;
  font-size:.75rem;font-weight:600;line-height:18px;white-space:nowrap;
  flex-shrink:0;width:fit-content;font-variant-numeric:tabular-nums;
  background:var(--status-pending-bg);color:var(--status-pending-fg);
}
.screen .pill-tag::before{content:'';width:6px;height:6px;flex:0 0 6px;border-radius:50%;background:currentColor}
.screen .pill-tag[data-status-tone=approved]{background:var(--status-approved-bg);color:var(--status-approved-fg)}
.screen .pill-tag[data-status-tone=revision]{background:var(--status-revision-bg);color:var(--status-revision-fg)}
.screen .pill-tag[data-status-tone=issued]{background:var(--status-issued-bg);color:var(--status-issued-fg)}
.screen .pill-tag[data-status-tone=rejected]{background:var(--status-rejected-bg);color:var(--status-rejected-fg)}
.screen[data-screen] .pill-tag{font-size:.8125rem;line-height:1.4}
`;

const FAMILIES = [
  { k: "issued", label: "Confirmed" },
  { k: "approved", label: "Completed" },
  { k: "revision", label: "Tentative" },
  { k: "rejected", label: "Cancelled" },
  { k: "pending", label: "Rescheduled" },
];

const Pill = ({ k, label }: { k: string; label: string }) => (
  <span className={`pill b-${k}`}>
    <span className="d" aria-hidden="true" />
    {label}
  </span>
);

const HTML_GEOMETRIES = `
<!-- read-only record status -->
<span class="pill b-issued"><span class="d"></span>Confirmed</span>

<!-- secondary attribute -->
<span class="flag"><!-- ic('flag', 11) -->Warranty</span>

<!-- status you can change -->
<button type="button" class="statectl b-revision" aria-haspopup="menu">
  <span class="d"></span>Tentative<!-- ic('down', 14) -->
</button>
`;

const HTML_FAMILIES = `
<span class="pill b-issued"><span class="d"></span>Confirmed</span>
<span class="pill b-approved"><span class="d"></span>Completed</span>
<span class="pill b-revision"><span class="d"></span>Tentative</span>
<span class="pill b-rejected"><span class="d"></span>Cancelled</span>
<span class="pill b-pending"><span class="d"></span>Rescheduled</span>
`;

const HTML_FLAGS = `
<span class="flag"><!-- ic('flag', 11) -->Warranty</span>
<span class="flag wo-fu-flag needs"><!-- ic('flag', 11) -->Needs follow-up</span>
<span class="flag wo-fu-flag planned"><!-- ic('schedule', 11) -->Follow-up · 18 Aug</span>
`;

const HTML_STATECTL = `
<!-- Service Report register: the one interactive cell, pinned right -->
<button type="button" class="statectl b-open" title="Schedule 4F2A9C — click for the schedule card">
  <span class="d"></span>Open<!-- ic('down', 14) -->
</button>
`;

const HTML_MOBILE = `
<!-- FSM-Mobile: tone from statusBadgeTone(label) in js/status-badges.js -->
<span class="pill-tag" data-status-tone="approved">Submitted</span>
<span class="pill-tag" data-status-tone="revision">Pending signature</span>
<span class="pill-tag" data-status-tone="issued">Ready</span>
<span class="pill-tag" data-status-tone="rejected">Failed</span>
<span class="pill-tag" data-status-tone="pending">Draft</span>
`;

/* ---- usage ---------------------------------------------------------------- */

function Overview() {
  return (
    <div className="prose">
      <p>
        A status tells people where a record stands. There are exactly three shapes. A pill is read-only. A flag is a
        secondary attribute. A state control is a status you can click to change, so it looks like a control.
      </p>
      <Example title="Three geometries" description="Pill, flag, and state control." layout="row" code={{ lang: "HTML", code: HTML_GEOMETRIES }}>
        <Pill k="issued" label="Confirmed" />
        <span className="flag">
          <Ic n="flag" s={11} />
          Warranty
        </span>
        <button type="button" className="statectl b-revision" aria-haspopup="menu" aria-label="Status: Tentative. Change">
          <span className="d" aria-hidden="true" />
          Tentative
          <Ic n="down" s={14} />
        </button>
      </Example>
    </div>
  );
}

function WhenToUse() {
  return (
    <div className="prose">
      <ul className="dodont">
        <Do>Use a pill for the record’s own state. One per record.</Do>
        <Do>Use a flag for a secondary yes-or-no attribute, such as Late or Warranty.</Do>
        <Do>Use a state control only where the status can be changed right there.</Do>
        <Do>Map every business word to one of the five families. Always show the word.</Do>
        <Dont>Make a read-only status look like a dropdown, or a changeable one look like a pill.</Dont>
        <Dont>Create a new color for a new status, or use saturated blue chips for product names.</Dont>
        <Dont>Show status by color or dot alone.</Dont>
      </ul>
    </div>
  );
}

function Anatomy() {
  return (
    <div className="prose">
      <Table
        head={["Part", "Pill", "Flag", "State control"]}
        rows={[
          ["Container", "Pastel fill, full pill radius", "Quiet gray fill, full pill radius", "Pastel fill, control radius"],
          ["Dot", "6px, current text color", "—", "6px, current text color"],
          ["Icon", "—", "Optional, 11px, before the label", "Chevron after the label, 60% opacity"],
          ["Label", "Sentence case, spelled out", "Short attribute", "The current status"],
          ["Element", <T>span</T>, <T>span</T>, <T>button</T>],
        ]}
      />
    </div>
  );
}

function Variants() {
  return (
    <div className="prose">
      <Example title="Pill: five families" description="Every status maps to one of these five." layout="row" code={{ lang: "HTML", code: HTML_FAMILIES }}>
        {FAMILIES.map((f) => (
          <Pill key={f.k} k={f.k} label={f.label} />
        ))}
      </Example>
      <Example title="Flag" description="A secondary attribute. Neutral, or tinted when it needs attention." layout="row" code={{ lang: "HTML", code: HTML_FLAGS }}>
        <span className="flag">
          <Ic n="flag" s={11} />
          Warranty
        </span>
        <span className="flag wo-fu-flag needs">
          <Ic n="flag" s={11} />
          Needs follow-up
        </span>
        <span className="flag wo-fu-flag planned">
          <Ic n="schedule" s={11} />
          Follow-up · 18 Aug
        </span>
      </Example>
      <Example
        title="State control"
        description="Service Report’s Schedule Status cell. It opens the schedule card, where the schedule can be closed."
        layout="row"
        code={{ lang: "HTML", code: HTML_STATECTL }}
      >
        <button type="button" className="statectl b-open" aria-haspopup="dialog" aria-label="Schedule status: Open. Open the schedule card">
          <span className="d" aria-hidden="true" />
          Open
          <Ic n="down" s={14} />
        </button>
        <button type="button" className="statectl b-issued" aria-haspopup="dialog" aria-label="Schedule status: Follow-up ongoing. Open the schedule card">
          <span className="d" aria-hidden="true" />
          Follow-up ongoing
          <Ic n="down" s={14} />
        </button>
        <button type="button" className="statectl b-pending" aria-haspopup="dialog" aria-label="Schedule status: Closed. Open the schedule card">
          <span className="d" aria-hidden="true" />
          Closed
          <Ic n="down" s={14} />
        </button>
      </Example>
      <Example title="Mobile" description="FSM-Mobile’s pill: same palette and shape, caption-size label." layout="row" code={{ lang: "HTML", code: HTML_MOBILE }}>
        <style>{MOBILE_PILL_CSS}</style>
        <div className="screen" data-screen="reports" style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          <span className="pill-tag" data-status-tone="approved">Submitted</span>
          <span className="pill-tag" data-status-tone="revision">Pending signature</span>
          <span className="pill-tag" data-status-tone="issued">Ready</span>
          <span className="pill-tag" data-status-tone="rejected">Failed</span>
          <span className="pill-tag" data-status-tone="pending">Draft</span>
        </div>
      </Example>
    </div>
  );
}

function Mapping() {
  return (
    <div className="prose">
      <p className="prose-p">
        Map new business words to the nearest family. Each module keeps its own map in one place, and components never
        pick a color for a status themselves.
      </p>
      <Table
        head={["Family", "Meaning", "Design system examples", "Mobile words"]}
        rows={[
          [<T>issued</T>, "Informational", "Issued, confirmed", "Ready, issued"],
          [<T>approved</T>, "Success", "Accepted, closed", "Open, completed, pass, passed, signed, sent, email sent, synced, submitted"],
          [<T>revision</T>, "Attention", "Tentative, revision", "In progress, awaiting parts, needs signature, pending signature, follow-up"],
          [<T>rejected</T>, "Error", "Cancelled, rejected", "Rejected, failed"],
          [<T>pending</T>, "Neutral", "Pending, rescheduled", "Anything not listed"],
        ]}
      />
      <Table
        head={["Module word", "Family", "Where"]}
        rows={[
          ["Open", <><T>open</T> (the approved colors)</>, "Service Report schedule status"],
          ["Follow-up ongoing", <T>issued</T>, "Service Report schedule status"],
          ["Closed", <T>pending</T>, "Service Report schedule status"],
          ["Ready to schedule", <T>approved</T>, "Work Order readiness flag"],
          ["Waiting for parts", <T>revision</T>, "Work Order readiness flag"],
          ["Waiting for customer", <T>pending</T>, "Work Order readiness flag"],
        ]}
      />
    </div>
  );
}

function Behavior() {
  return (
    <div className="prose">
      <ul className="dev-notes">
        <li>A pill and a flag are not interactive. They take no focus and show no hover.</li>
        <li>A state control darkens slightly on hover, shows the 2px primary focus ring, and opens a menu or card.</li>
        <li>Inside a clickable row, a state control stops its click from also opening the row.</li>
        <li>Labels are sentence case and spelled out: Follow-up ongoing, not FUP.</li>
        <li>Pills never wrap. Numbers inside them use tabular figures.</li>
        <li>On mobile, the tone comes from the label through one function, so every screen reads a status the same.</li>
      </ul>
    </div>
  );
}

/* ---- style ---------------------------------------------------------------- */

function Measurements() {
  return (
    <div className="prose">
      <p>
        Every number below is read from the product stylesheet, not typed by hand. A pill has fully round ends; a state
        control has small rounded corners. Build to these numbers, not to how the picture looks.
      </p>
      <SpecSheet title="Pill" description="Read-only record status." scale={3} targets={[{ sel: ".pill", name: "Status pill, issued" }]}>
        <Pill k="issued" label="Confirmed" />
      </SpecSheet>
      <SpecSheet title="Status dot" description="Inside the pill and the state control. It takes the text color." scale={3} targets={[{ sel: ".d", name: "Status dot", width: "fixed" }]}>
        <Pill k="approved" label="Completed" />
      </SpecSheet>
      <SpecSheet title="Flag" description="Secondary attribute." scale={3} targets={[{ sel: ".flag", name: "Flag, neutral" }]}>
        <span className="flag">
          <Ic n="flag" s={11} />
          Warranty
        </span>
      </SpecSheet>
      <SpecSheet title="State control" description="A status you can change. Shaped like a control." scale={3} targets={[{ sel: ".statectl", name: "State control, revision" }]}>
        <button type="button" className="statectl b-revision" aria-haspopup="menu" aria-label="Status: Tentative. Change">
          <span className="d" aria-hidden="true" />
          Tentative
          <Ic n="down" s={14} />
        </button>
      </SpecSheet>
      <SpecSheet title="Mobile pill" description="FSM-Mobile .pill-tag." scale={3} targets={[{ sel: ".pill-tag", name: "Mobile status pill, approved" }]}>
        <style>{MOBILE_PILL_CSS}</style>
        <div className="screen" data-screen="reports">
          <span className="pill-tag" data-status-tone="approved">
            Submitted
          </span>
        </div>
      </SpecSheet>
    </div>
  );
}

function Screens() {
  return (
    <ScreenWidths
      rows={[
        { screen: "desktop", width: WEB_SCREENS.desktop, same: true },
        { screen: "laptop", width: WEB_SCREENS.laptop, same: true },
        { screen: "tablet", width: WEB_SCREENS.tablet, same: true },
        { screen: "phone", width: WEB_SCREENS.phone, same: true },
        { screen: "mobile-app", width: WEB_SCREENS.app, change: "Uses the mobile pill: same palette and shape, a 13 px label, and a darker green for approved." },
      ]}
    />
  );
}

function StyleColor() {
  return (
    <Table
      head={["Family", "Web fill / text", "Mobile fill / text"]}
      rows={[
        ["Issued", <><T>--issued-bg</T> / <T>--issued-fg</T></>, <><T>--status-issued-bg</T> / <T>--status-issued-fg</T></>],
        ["Approved", <><T>--approved-bg</T> / <T>--approved-fg</T></>, <><T>--status-approved-bg</T> / <T>--status-approved-fg</T> (darker green than web)</>],
        ["Revision", <><T>--revision-bg</T> / <T>--revision-fg</T></>, <><T>--status-revision-bg</T> / <T>--status-revision-fg</T></>],
        ["Rejected", <><T>--rejected-bg</T> / <T>--rejected-fg</T></>, <><T>--status-rejected-bg</T> / <T>--status-rejected-fg</T></>],
        ["Pending", <><T>--pending-bg</T> / <T>--pending-fg</T></>, <><T>--status-pending-bg</T> / <T>--status-pending-fg</T></>],
        ["Open (Service Report)", <><T>--open-bg</T> / <T>--open-fg</T>, same values as approved</>, "—"],
        ["Flag, neutral", <><T>--muted-2</T> / <T>--fg-2</T></>, "—"],
      ]}
    />
  );
}

function StyleSpec() {
  return (
    <Table
      head={["Property", "Pill", "Flag", "State control", "Mobile pill"]}
      rows={[
        ["Height", <><T>--pill-h</T> 22</>, <><T>--flag-h</T> 20</>, <><T>--statectl-h</T> 28</>, "22 minimum"],
        ["Padding", "0 9", <>0 <T>--sp-2</T> 8</>, "0 6 0 10", "2 9"],
        ["Radius", <><T>--radius-pill</T> 20, draws fully round ends</>, <><T>--radius-pill</T> 20, fully round</>, <><T>--radius-control</T> 6, small corners</>, "999, fully round"],
        ["Label", <><T>--pill-fs</T> 11.5 · 600</>, <><T>--flag-fs</T> 11 · 600</>, <><T>--statectl-fs</T> 11.5 · 600</>, "13 · 600"],
        ["Gap", "5", "5", <><T>--sp-1</T> 4</>, "5"],
        ["Dot", "6", "—", "6", "6"],
        ["Hover", "—", "—", "brightness 96%, 120ms", "—"],
      ]}
    />
  );
}

/* ---- code ----------------------------------------------------------------- */

function CodeWeb() {
  return (
    <div className="prose">
      <Code title="HTML" lang="html">{HTML_GEOMETRIES + HTML_FAMILIES}</Code>
      <Code title="React" lang="tsx">{`
import { StatusPill, StateControl, Flag } from "@/components/ui/StatusPill";

<StatusPill label="Confirmed" />                     // family from familyOf(label)
<Flag icon={<Ic n="flag" s={11} />}>Warranty</Flag>
<StateControl label="Tentative" onOpen={openStatusMenu} />
`}</Code>
      <Table
        head={["Prop", "Type", "Default"]}
        rows={[
          [<T>label</T>, <T>string</T>, "—"],
          [<T>family</T>, <T>"issued" | "approved" | "revision" | "rejected" | "pending"</T>, <T>familyOf(label)</T>],
          [<T>onOpen</T>, <><T>() =&gt; void</T> (state control only)</>, "—"],
        ]}
      />
    </div>
  );
}

function CodeFlutter() {
  return (
    <Code title="Flutter" lang="dart">{`
// Read-only: colors come from the EscoStatus theme extension.
EscoStatusPill(label: 'Submitted', family: StatusFamily.approved);

// Changeable: a control that opens a menu, not a pill.
MenuAnchor(
  builder: (context, controller, _) => OutlinedButton.icon(
    onPressed: () => controller.isOpen ? controller.close() : controller.open(),
    icon: const Icon(Icons.expand_more, size: 18),
    iconAlignment: IconAlignment.end,
    label: Text('Status: $label'),
  ),
  menuChildren: [
    for (final s in statuses)
      MenuItemButton(onPressed: () => setStatus(s), child: Text(s.label)),
  ],
);
`}</Code>
  );
}

function CodeIos() {
  return (
    <Code title="SwiftUI" lang="swift">{`
// Read-only
EscoStatusPill(label: "Submitted", family: .approved)

// Changeable: a Menu with the current value as its label
Menu {
    ForEach(statuses) { s in Button(s.label) { setStatus(s) } }
} label: {
    Label("Status: \\(current.label)", systemImage: "chevron.down")
        .labelStyle(.titleAndIcon)
}
`}</Code>
  );
}

/* ---- accessibility -------------------------------------------------------- */

function A11yKeyboard() {
  return (
    <Table
      head={["Key", "Action"]}
      rows={[
        ["Tab", "Skips pills and flags. Moves to a state control"],
        ["Enter, Space", "Opens the state control’s menu or card"],
        ["Arrow keys", "Move between options in the menu"],
        ["Escape", "Closes the menu and returns focus to the state control"],
      ]}
    />
  );
}

function A11yNames() {
  return (
    <div className="prose">
      <ul className="dodont">
        <Do>Keep the word in every status. The dot is decoration; hide it from assistive technology.</Do>
        <Do>Give a state control <T>aria-haspopup</T> and a name with the current value: <T>Schedule status: Open</T>.</Do>
        <Do>When a status changes, announce the new value in a polite live region or toast.</Do>
        <Dont>Make a pill focusable or give it a button role. It does nothing when activated.</Dont>
        <Dont>Use color, the dot, or the chevron as the only difference between two states.</Dont>
      </ul>
    </div>
  );
}

function A11yContrast() {
  return (
    <div className="prose">
      <Table
        head={["Pair", "Ratio", "Requirement"]}
        rows={[
          ["Issued text on fill", "7.2:1", "4.5:1 text"],
          ["Approved text on fill, web", "4.49:1", "Just under 4.5:1. Known gap"],
          ["Approved text on fill, mobile", "5.8:1", "4.5:1 text"],
          ["Revision text on fill", "4.5:1", "4.5:1 text"],
          ["Rejected text on fill", "4.7:1", "4.5:1 text"],
          ["Pending text on fill", "6.2:1", "4.5:1 text"],
          [<>Neutral flag, <T>--fg-2</T> on <T>--muted-2</T></>, "7.4:1", "4.5:1 text"],
          ["Dark theme pairs (mobile)", "7.8:1 to 8.8:1", "4.5:1 text"],
          ["Focus ring on white", "9.6:1", "3:1 non-text"],
        ]}
      />
      <p className="prose-p">
        Web approved and open pairs measure 4.49:1 at 11.5px, a hair under AA. Mobile already uses a darker approved text
        that passes.
      </p>
    </div>
  );
}

export const statusPill: ComponentContent = {
  lead: "Shows where a record stands in one of five families. Three shapes: pill, flag, and state control.",
  art: StatusPillArt,
  usage: [
    { id: "overview", title: "Overview", body: <Overview /> },
    { id: "when-to-use", title: "When to use", body: <WhenToUse /> },
    { id: "anatomy", title: "Anatomy", body: <Anatomy /> },
    { id: "variants", title: "Variants", body: <Variants /> },
    { id: "mapping", title: "Mapping vocabulary", body: <Mapping /> },
    { id: "behavior", title: "Behavior and states", body: <Behavior /> },
    {
      id: "related",
      title: "Related",
      body: <p className="prose-p">Table for the status column; Card for status on a record; Menu for the options a state control opens.</p>,
      more: { href: "/components/table", label: "Table" },
    },
  ],
  style: [
    { id: "measurements", title: "Measurements", body: <Measurements /> },
    { id: "screen-widths", title: "Screen widths", body: <Screens /> },
    { id: "color", title: "Color", body: <StyleColor /> },
    { id: "specifications", title: "Specifications", body: <StyleSpec /> },
  ],
  code: [
    { id: "web", title: "Web", body: <CodeWeb />, more: { href: "/get-started/react", label: "React guide" } },
    { id: "flutter", title: "Flutter", body: <CodeFlutter />, more: { href: "/get-started/flutter", label: "Flutter guide" } },
    { id: "ios", title: "iOS", body: <CodeIos />, more: { href: "/get-started/ios", label: "iOS guide" } },
  ],
  accessibility: [
    { id: "keyboard-interaction", title: "Keyboard interaction", body: <A11yKeyboard /> },
    { id: "screen-readers", title: "Screen readers", body: <A11yNames /> },
    { id: "contrast-and-focus", title: "Contrast and focus", body: <A11yContrast /> },
  ],
};
