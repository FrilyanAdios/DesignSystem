import { Example } from "@/components/demo/Example";
import { Ic } from "@/components/demo/Ic";
import { Code, Do, Dont, T, Table } from "../dev-kit";
import { MobileFilterChips, MobileScopeChips, ServiceChips } from "./tag.demo";
import { SpecSheet } from "@/components/demo/SpecSheet";
import { ScreenWidths, WEB_SCREENS } from "@/components/demo/ScreenWidths";
import { TagArt } from "@/components/art/tag";
import type { ComponentContent } from "./types";

/* ---------------------------------------------------------------------------
   Tag — facts from:
   - styles.css › STATUS SYSTEM tier B .flag (+ --flag-h, --flag-fs),
     .wo-fu-flag.needs / .planned, .report-svc-chip, .sd-chip
   - DESIGN_SYSTEM.md › Status, badge, and editable state ("quiet pastel
     treatment" for product and category chips)
   - script.js (follow-up flags, Schedule Breakdown service chips, tools),
     csm.html (entity, business unit, brand, End user, Soon)
   - FSM-Mobile/COMPONENT_SYSTEM.md › Chip, css/components.css › .chip
   The read-only record status (.pill) is the Status pill page.
   --------------------------------------------------------------------------- */

const HTML_FLAG = `
<span class="flag">Warranty</span>
<span class="flag" title="Business unit" aria-label="Business unit: Scientific">Scientific</span>
<span class="flag">End user</span>
`;

const HTML_FLAG_TONE = `
<span class="flag wo-fu-flag needs">
  <!-- ic('flag', 11) --> Needs follow-up
</span>
<span class="flag wo-fu-flag planned">
  <!-- ic('schedule', 11) --> Follow-up · 14 Mar
</span>
`;

const HTML_IN_TAB = `
<button type="button" class="detail-tab" role="tab" aria-selected="false"
        aria-disabled="true" disabled title="Not available yet">
  Notes<span class="flag">Soon</span>
</button>
`;

const HTML_SVC = `
<div class="report-cat-svcs">
  <span class="report-svc-chip">Preventive Maintenance<b>14</b></span>
  <span class="report-svc-chip">Certification<b>9</b></span>
  <span class="report-svc-chip">Calibration Service<b>4</b></span>
  <button type="button" class="report-svc-chip more" aria-expanded="false">+2 more</button>
</div>
`;

const HTML_TOOLS = `
<div class="sd-tools">
  <span class="sd-chip"><!-- ic('tool', 13) --> Multimeter</span>
  <span class="sd-chip"><!-- ic('tool', 13) --> Airflow Meter</span>
</div>
`;

const HTML_CHIP = `
<div class="chip-row" role="group" aria-label="Schedule filters">
  <button type="button" class="chip" aria-haspopup="dialog">
    <i data-icon="filter" aria-hidden="true"></i>
    <span>All entities</span>
    <i data-icon="chev-down" aria-hidden="true"></i>
  </button>
  <button type="button" class="chip">
    <i data-icon="calendar" aria-hidden="true"></i><span>Today</span>
  </button>
</div>

<div class="chip-row" role="group" aria-label="Group templates">
  <button type="button" class="chip" aria-pressed="true">Product family</button>
  <button type="button" class="chip" aria-pressed="false">Document type</button>
</div>
`;

/* ---- usage ---------------------------------------------------------------- */

function Overview() {
  return (
    <div className="prose">
      <p>
        A tag labels a record with a secondary fact: Warranty, a business unit, a brand, a service and its count. It is
        read, not operated, and it is never the record&rsquo;s status. Status uses the status pill.
      </p>
      <Example
        title="Secondary attributes"
        description="Quiet flags beside a record's identity."
        layout="row"
        code={{ lang: "HTML", code: HTML_FLAG }}
      >
        <strong style={{ fontSize: "var(--fs-card)" }}>WO-2418</strong>
        <span className="pill b-issued">
          <span className="d" />
          Confirmed
        </span>
        <span className="flag">Warranty</span>
        <span className="flag" title="Business unit" aria-label="Business unit: Scientific">
          Scientific
        </span>
      </Example>
    </div>
  );
}

function WhenToUse() {
  return (
    <div className="prose">
      <ul className="dodont">
        <Do>Use a flag for a secondary yes-or-no attribute or a short category: Warranty, End user, a brand.</Do>
        <Do>Use one quiet treatment for product and category chips, so they never compete with status.</Do>
        <Do>On mobile, use a chip for a scope or filter above a list, such as the entity or Today.</Do>
        <Dont>Use bold, saturated blue chips for product names.</Dont>
        <Dont>Show a record&rsquo;s status as a flag, or make a flag clickable. Status is a pill; a status you can change is a status control.</Dont>
        <Dont>Rely on color alone. Every tag carries its own text.</Dont>
      </ul>
    </div>
  );
}

function Anatomy() {
  return (
    <div className="prose">
      <Example title="Anatomy" description="Optional 11px icon, then a short label, in a rounded capsule." layout="center">
        <span className="flag wo-fu-flag needs">
          <Ic n="flag" s={11} />
          Needs follow-up
        </span>
        <span className="report-svc-chip">
          Certification<b>9</b>
        </span>
      </Example>
      <Table
        head={["Part", "Rule"]}
        rows={[
          ["Container", <>Pill radius, no border on <T>.flag</T>; a 1px border on the counted chip</>],
          ["Icon", "Optional. 11px in a flag, 13px in a tool chip, 18 on mobile chips"],
          ["Label", "One to three words, sentence case or the record's own name"],
          ["Count", <>Counted chips end with a bold number in <T>{"<b>"}</T></>],
        ]}
      />
    </div>
  );
}

function Variants() {
  return (
    <div className="prose">
      <div className="examples two">
        <Example title="Flag" description="Neutral, for an attribute." code={{ lang: "HTML", code: HTML_FLAG }}>
          <span className="flag">Warranty</span>
          <span className="flag">End user</span>
          <span className="flag" title="Esco entity">
            Esco Philippines
          </span>
        </Example>
        <Example title="Flag with tone" description="A follow-up note on a work order, with an icon and status color." code={{ lang: "HTML", code: HTML_FLAG_TONE }}>
          <span className="flag wo-fu-flag needs">
            <Ic n="flag" s={11} />
            Needs follow-up
          </span>
          <span className="flag wo-fu-flag planned">
            <Ic n="schedule" s={11} />
            Follow-up · 14 Mar
          </span>
        </Example>
        <Example title="Counted chip" description="A service and how many times it was done. Extra chips fold behind +n more." code={{ lang: "HTML", code: HTML_SVC }}>
          <ServiceChips />
        </Example>
        <Example title="Tool chip" description="A list of items to bring, on a quiet fill." code={{ lang: "HTML", code: HTML_TOOLS }}>
          <div className="sd-tools">
            <span className="sd-chip">
              <Ic n="tool" s={13} /> Multimeter
            </span>
            <span className="sd-chip">
              <Ic n="tool" s={13} /> Airflow Meter
            </span>
          </div>
        </Example>
        <Example title="In a tab" description="Marks a tab that is not available yet." code={{ lang: "HTML", code: HTML_IN_TAB }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--fg-3)", fontSize: "var(--fs-body)" }}>
            Notes<span className="flag">Soon</span>
          </span>
        </Example>
      </div>
      <h3>Mobile chip</h3>
      <div className="examples two">
        <Example title="Scope chips" description="Assist chips above a calendar. A row scrolls sideways." layout="none" code={{ lang: "HTML", code: HTML_CHIP }}>
          <MobileScopeChips />
        </Example>
        <Example title="Filter chips" description="aria-pressed gives the selected tint. Try it." layout="none" code={{ lang: "HTML", code: HTML_CHIP }}>
          <MobileFilterChips />
        </Example>
      </div>
    </div>
  );
}

function Behavior() {
  return (
    <div className="prose">
      <ul className="dev-notes">
        <li>Flags and counted chips are static text. They take no hover, focus, or click.</li>
        <li>
          The <T>+n more</T> chip is a real button with <T>aria-expanded</T>. It reveals the rest in place and turns
          into <T>Show less</T>.
        </li>
        <li>Flags and tags never wrap; a row of tags wraps between tags instead.</li>
        <li>A mobile chip row scrolls sideways rather than wrapping, so the content below never shifts.</li>
        <li>A mobile chip states the current scope. It never grows into a primary control. Disabled is 50% opacity.</li>
      </ul>
    </div>
  );
}

/* ---- style ---------------------------------------------------------------- */

function Measurements() {
  return (
    <div className="prose">
      <p>
        Every number below is read from the product stylesheet, not typed by hand. Build to these numbers, not to how the
        picture looks. Flags and counted chips are pills; tool chips and mobile chips are rounded rectangles.
      </p>
      <SpecSheet
        title="Flag"
        scale={3}
        targets={[
          { sel: ".flag:not(.wo-fu-flag)", name: "Flag" },
          { sel: ".wo-fu-flag", name: "Flag with icon and tone", marks: false },
        ]}
      >
        <div style={{ display: "flex", gap: 16 }}>
          <span className="flag">Warranty</span>
          <span className="flag wo-fu-flag needs">
            <Ic n="flag" s={11} />
            Needs follow-up
          </span>
        </div>
      </SpecSheet>
      <SpecSheet title="Counted chip and tool chip" targets={[{ sel: ".report-svc-chip", name: "Counted chip" }, { sel: ".sd-chip", name: "Tool chip" , marks: true }]}>
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          <span className="report-svc-chip">
            Certification<b>9</b>
          </span>
          <span className="sd-chip">
            <Ic n="tool" s={13} /> Multimeter
          </span>
        </div>
      </SpecSheet>
      <SpecSheet
        title="Mobile chip, artwork size"
        description="The chip as drawn: 32 tall, 8 px corner. Not a pill."
        targets={[
          { sel: '.chip[aria-pressed="true"]', name: "Mobile chip, pressed" },
          { sel: '.chip[aria-pressed="false"]', name: "Mobile chip, not pressed", marks: false },
        ]}
      >
        <MobileFilterChips plain />
      </SpecSheet>
      <SpecSheet
        title="Mobile chip, in a screen"
        description="Inside app screens the chip grows to a 44 tall touch target."
        targets={[{ sel: '.chip[aria-pressed="true"]', name: "Mobile chip in a screen" }]}
      >
        <MobileFilterChips />
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
        { screen: "phone", width: WEB_SCREENS.phone, change: "Tags keep their size. A row of tags wraps between tags." },
        { screen: "mobile-app", width: WEB_SCREENS.app, change: "Chips are 32 tall as drawn and 44 tall in screens, with an 8 px corner. A chip row scrolls sideways instead of wrapping." },
      ]}
    />
  );
}

function StyleColor() {
  return (
    <Table
      head={["Variant", "Background", "Border", "Text"]}
      rows={[
        ["Flag", <T>--muted-2</T>, "none", <T>--fg-2</T>],
        ["Flag, needs follow-up", <><T>--warning-bg</T> (same value as <T>--revision-bg</T>)</>, "none", <><T>--warning</T> (same value as <T>--revision-fg</T>)</>],
        ["Flag, follow-up planned", <T>--info-bg</T>, "none", <T>--info</T>],
        ["Counted chip", "#FFFFFF", <T>--border</T>, <><T>--fg-2</T>, count <T>--fg</T></>],
        ["Counted chip, more", <>#FFFFFF; hover <T>--primary-50</T></>, <>hover <T>--primary-100</T></>, <T>--primary</T>],
        ["Tool chip", <T>--muted</T>, <T>--border-2</T>, <><T>--fg-2</T>, icon <T>--icon-quiet</T></>],
        ["Mobile chip", <T>--surface</T>, <T>--outline</T>, <><T>--on-surface</T>, icon <T>--esco-blue</T></>],
        ["Mobile chip, pressed", <T>--esco-tint</T>, <T>--esco-blue</T>, <T>--esco-blue</T>],
      ]}
    />
  );
}

function StyleSpec() {
  return (
    <Table
      head={["Property", "Flag", "Counted chip", "Tool chip", "Mobile chip"]}
      rows={[
        ["Height", <><T>--flag-h</T> 20</>, "24", "33 (6 above and below)", "32 min; 44 in screens"],
        ["Horizontal padding", <><T>--sp-2</T> 8</>, "10", "11", "12"],
        ["Radius", <><T>--radius-pill</T> 20</>, <><T>--radius-pill</T> 20</>, <><T>--radius-field</T> 8</>, "8"],
        ["Label", <><T>--flag-fs</T> 11 · 600</>, <><T>--fs-help</T> 11.5</>, "12.5", "14 · 500"],
        ["Icon", "11", "—", "13", "18"],
        ["Gap", "5", "6", "6", "8"],
      ]}
    />
  );
}

/* ---- code ----------------------------------------------------------------- */

function CodeWeb() {
  return (
    <div className="prose">
      <Code title="HTML" lang="html">{HTML_FLAG + HTML_FLAG_TONE + HTML_SVC}</Code>
      <Code title="HTML (mobile)" lang="html">{HTML_CHIP}</Code>
      <Code title="React" lang="tsx">{`
import { Flag, CountChip } from "@/components/ui/Tag";

<Flag>Warranty</Flag>
<Flag tone="needs" icon={<Ic n="flag" s={11} />}>Needs follow-up</Flag>
<Flag label="Business unit: Scientific">Scientific</Flag>

<CountChip count={14}>Preventive Maintenance</CountChip>
`}</Code>
      <Table
        head={["Prop", "Type", "Default"]}
        rows={[
          [<T>tone</T>, <T>"neutral" | "needs" | "planned"</T>, <T>"neutral"</T>],
          [<T>icon</T>, <T>ReactNode</T>, "—"],
          [<T>label</T>, <T>string</T>, "— (accessible name when the text needs context)"],
          [<T>count</T>, <T>number</T>, "— (CountChip only)"],
        ]}
      />
    </div>
  );
}

function CodeFlutter() {
  return (
    <Code title="Flutter" lang="dart">{`
// scope chip: opens a sheet
ActionChip(
  avatar: const Icon(Icons.filter_list, size: 18),
  label: const Text('All entities'),
  onPressed: openEntitySheet,
);

// filter chip: selected state is announced
FilterChip(
  label: const Text('Product family'),
  selected: group == Group.family,
  onSelected: (_) => setState(() => group = Group.family),
);

// chips sit in one row that scrolls sideways
SingleChildScrollView(
  scrollDirection: Axis.horizontal,
  padding: const EdgeInsets.symmetric(horizontal: EscoSpace.s16, vertical: EscoSpace.s8),
  child: Row(children: [/* chips, spaced EscoSpace.s8 */]),
);
`}</Code>
  );
}

function CodeIos() {
  return (
    <Code title="SwiftUI" lang="swift">{`
ScrollView(.horizontal, showsIndicators: false) {
    HStack(spacing: EscoSpace.s8) {
        Button { openEntitySheet() } label: {
            Label("All entities", systemImage: "line.3.horizontal.decrease")
        }
        Button("Product family") { group = .family }
            .accessibilityAddTraits(group == .family ? .isSelected : [])
    }
    .buttonStyle(.bordered)
    .buttonBorderShape(.roundedRectangle(radius: EscoRadius.small))
    .tint(.escoPrimary)
    .font(.escoMeta.weight(.medium))
    .padding(.horizontal, EscoSpace.s16)
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
        ["Tab", <>Skips flags and counted chips. Stops on <T>+n more</T> and on mobile chips</>],
        ["Enter, Space", <>Toggles <T>+n more</T>; activates or presses a mobile chip</>],
      ]}
    />
  );
}

function A11yNames() {
  return (
    <div className="prose">
      <ul className="dodont">
        <Do>Let the visible text be the name. Add an <T>aria-label</T> when the text needs context: “Business unit: Scientific”.</Do>
        <Do>Hide decorative icons with <T>aria-hidden</T>; the label carries the meaning.</Do>
        <Do>Expose a filter chip&rsquo;s state with <T>aria-pressed</T>, and a group of chips with a named <T>role="group"</T>.</Do>
        <Dont>Rely on a title tooltip as the only explanation. It is not reachable by touch or keyboard.</Dont>
      </ul>
    </div>
  );
}

function A11yContrast() {
  return (
    <Table
      head={["Pair", "Ratio", "Requirement"]}
      rows={[
        [<><T>--fg-2</T> on <T>--muted-2</T> (flag)</>, "7.4:1", "4.5:1 text"],
        [<><T>--warning</T> on <T>--warning-bg</T></>, "4.5:1", "4.5:1 text, just met"],
        [<><T>--info</T> on <T>--info-bg</T></>, "5.7:1", "4.5:1 text"],
        [<><T>--fg-2</T> on white (counted chip)</>, "8.4:1", "4.5:1 text"],
        [<><T>--esco-blue</T> on <T>--esco-tint</T> (mobile, pressed)</>, "8.4:1", "4.5:1 text"],
        [<><T>--outline</T> chip edge on white (mobile)</>, "Below 3:1", "Chips are identified by label and shape; pressed adds a primary edge (9.6:1) and a tint"],
      ]}
    />
  );
}

export const tag: ComponentContent = {
  lead: "Labels a record with a secondary fact, like Warranty or a service count. Quiet, read-only, and never the status.",
  art: TagArt,
  usage: [
    { id: "overview", title: "Overview", body: <Overview /> },
    { id: "when-to-use", title: "When to use", body: <WhenToUse /> },
    { id: "anatomy", title: "Anatomy", body: <Anatomy /> },
    { id: "variants", title: "Variants", body: <Variants /> },
    { id: "behavior", title: "Behavior and states", body: <Behavior /> },
    {
      id: "related",
      title: "Related",
      body: <p className="prose-p">Status pill for a record&rsquo;s own state; Segmented control for view modes; Search and filter for removable filter chips.</p>,
      more: { href: "/components/status-pill", label: "Status pill" },
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
