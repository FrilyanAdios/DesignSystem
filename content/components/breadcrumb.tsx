import { Example } from "@/components/demo/Example";
import { Ic } from "@/components/demo/Ic";
import { SpecSheet } from "@/components/demo/SpecSheet";
import { ScreenWidths, WEB_SCREENS } from "@/components/demo/ScreenWidths";
import { BreadcrumbArt } from "@/components/art/breadcrumb";
import { Code, Do, Dont, T, Table } from "../dev-kit";
import type { ComponentContent } from "./types";

/* ---------------------------------------------------------------------------
   Breadcrumb — the quiet trail beside a register module's page title.
   Facts from bd/bd-main.js, dr/dr-main.js, sv/sv-main.js (bdHeaderParts, svCrumb)
   and the matching module CSS (.bd-crumb, .dr-crumb, .sr-crumb, .sv-crumb). The
   crumb classes live in module CSS, not styles.css, so the demos restate those
   rules in an injected <style>; .topbar and .btn come from the shared stylesheet.
   DESIGN_SYSTEM.md does not define a breadcrumb; this page documents the
   pattern as it ships.
   --------------------------------------------------------------------------- */

/* the module rules (bd/bd.css, sv/sv.css), injected into the demo stage because
   fsm.css only carries the shared stylesheet */
const CSS_CRUMB = `
.bd-title { display: flex; align-items: baseline; gap: 10px; min-width: 0; }
.bd-crumb { display: flex; align-items: center; gap: 7px; font-size: 12.5px; color: var(--fg-3); min-width: 0; }
.bd-crumb svg { color: var(--icon-quiet); flex-shrink: 0; }
.bd-crumb b { font-weight: 500; color: var(--fg-2); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
`;
const CSS_SV = `
.sv-title { display: flex; align-items: baseline; gap: 10px; min-width: 0; }
.sv-crumb { display: flex; align-items: center; gap: 7px; font-size: 12.5px; color: var(--fg-3); min-width: 0; white-space: nowrap; overflow: hidden; }
.sv-crumb svg { color: var(--icon-quiet); flex-shrink: 0; }
`;
const ModuleCss = () => <style>{CSS_CRUMB + CSS_SV}</style>;

function RecordCrumb({ no, context }: { no: string; context: string }) {
  return (
    <nav className="bd-crumb" aria-label="Breadcrumb">
      <Ic n="chev" s={13} />
      <b aria-current="page">{no}</b>
      <Ic n="chev" s={13} />
      <span>{context}</span>
    </nav>
  );
}

function DetailHeader({ actions = true }: { actions?: boolean }) {
  return (
    <header className="topbar" style={{ width: "100%" }}>
      <ModuleCss />
      <div className="bd-title">
        <h1>Breakdown Log</h1>
        <RecordCrumb no="202507-001" context="Hobert Testing Account #1" />
      </div>
      {actions && (
        <div className="topbar-right">
          <button type="button" className="btn btn-sm">
            <Ic n="back" s={14} />
            Back to List
          </button>
        </div>
      )}
    </header>
  );
}

/* the trail alone, for the enlarged spec sheet (the title is measured on the header sheet) */
function TitleRow() {
  return (
    <div className="bd-title">
      <ModuleCss />
      <RecordCrumb no="202507-001" context="Hobert Testing Account #1" />
    </div>
  );
}

function ScopeHeader() {
  return (
    <header className="topbar" style={{ width: "100%" }}>
      <ModuleCss />
      <div className="sv-title">
        <h1>NPS Survey</h1>
        <div className="sv-crumb">
          <Ic n="chev" s={13} />
          <span>July 1, 2025 — July 31, 2025</span>
        </div>
      </div>
    </header>
  );
}

const HTML_RECORD = `
<header class="topbar">
  <div class="bd-title">
    <h1>Breakdown Log</h1>
    <nav class="bd-crumb" aria-label="Breadcrumb">
      <!-- ic('chev', 13), aria-hidden -->
      <b aria-current="page">202507-001</b>
      <!-- ic('chev', 13), aria-hidden -->
      <span>Hobert Testing Account #1</span>
    </nav>
  </div>
  <div class="topbar-right">
    <button type="button" class="btn btn-sm"><!-- ic('back', 14) -->Back to List</button>
  </div>
</header>
`;

const HTML_RANGE = `
<header class="topbar">
  <div class="sv-title">
    <h1>NPS Survey</h1>
    <div class="sv-crumb">
      <!-- ic('chev', 13), aria-hidden -->
      <span>July 1, 2025 — July 31, 2025</span>
    </div>
  </div>
</header>
`;

/* ---- usage ---------------------------------------------------------------- */

function Overview() {
  return (
    <div className="prose">
      <p>
        A breadcrumb is the quiet trail beside a module's page title. On a record it reads module, record number, then
        whose record it is. It tells people where they are. The Back to List button takes them back.
      </p>
      <Example title="Record header" description="Breakdown Log, one record open." layout="none" pad={false} bg="white" code={{ lang: "HTML", code: HTML_RECORD }}>
        <DetailHeader />
      </Example>
    </div>
  );
}

function WhenToUse() {
  return (
    <div className="prose">
      <ul className="dodont">
        <Do>Use it in the page header of a register module when a record is open: number, then company.</Do>
        <Do>Use it for the scope that gives every number on the page its meaning, like the date range on NPS Survey.</Do>
        <Do>Keep the module name as the page title. The trail starts after it.</Do>
        <Dont>Use it as the only way back. Pair it with a Back to List button.</Dont>
        <Dont>Show it on a register's list view. The page title is enough there.</Dont>
      </ul>
    </div>
  );
}

function Anatomy() {
  return (
    <div className="prose">
      <Example title="Anatomy" description="Title, separator, current record, separator, context." layout="none" pad={false} bg="white">
        <DetailHeader />
      </Example>
      <Table
        head={["Part", "Rule"]}
        rows={[
          ["Page title", <>The module name in the header's <T>h1</T>, 19px regular</>],
          ["Separator", <>Shared <T>chev</T> icon at 13px in <T>--icon-quiet</T>. Decorative, hidden from screen readers</>],
          ["Current record", <>The record number in <T>{"<b>"}</T>, 500 weight, <T>--fg-2</T>. Truncates with an ellipsis</>],
          ["Context", <>Company or date range, 12.5px <T>--fg-3</T></>],
        ]}
      />
    </div>
  );
}

function Variants() {
  return (
    <div className="prose">
      <Example title="Record" description="Module, record number, company." layout="none" pad={false} bg="white" code={{ lang: "HTML", code: HTML_RECORD }}>
        <DetailHeader />
      </Example>
      <Example title="Scope" description="NPS Survey shows the date range that every number on the page depends on." layout="none" pad={false} bg="white" code={{ lang: "HTML", code: HTML_RANGE }}>
        <ScopeHeader />
      </Example>
    </div>
  );
}

function Behavior() {
  return (
    <div className="prose">
      <ul className="dev-notes">
        <li>The trail is text, not links. Back to List in the header actions returns to the register.</li>
        <li>The module builds the trail from the route: empty on the list, filled when a record opens.</li>
        <li>Long record numbers truncate with an ellipsis.</li>
        <li>Service Report replaces the trail on an open record with a Back to list button, a divider, and the report number.</li>
      </ul>
    </div>
  );
}

/* ---- style ---------------------------------------------------------------- */

function Measurements() {
  return (
    <div className="prose">
      <p>
        Every number below is read from the product stylesheet, not typed by hand. The trail is plain text with small
        chevrons. It has no boxes, chips, or underlines.
      </p>
      <SpecSheet
        title="Record trail"
        description="Breakdown Log with one record open. The trail follows the page title."
        targets={[
          { sel: ".bd-crumb", name: "Trail" },
          { sel: ".bd-crumb b", name: "Current record" },
          { sel: ".bd-crumb > span", name: "Context" },
        ]}
      >
        <TitleRow />
      </SpecSheet>
      <SpecSheet
        title="Page header"
        description="The trail sits in the 56 px header, with Back to List on the right."
        scale={1}
        targets={[{ sel: "header.topbar", name: "Page header", width: "fill" }]}
      >
        <DetailHeader />
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
        { screen: "tablet", width: WEB_SCREENS.tablet, change: "In Service Report, below 900 px the header actions move to their own row, which scrolls sideways. Header buttons grow to 44 px. The record line stays visible." },
        { screen: "phone", width: WEB_SCREENS.phone, change: "Page gutters are 16 px. The rest is as on tablet." },
        { screen: "mobile-app", width: WEB_SCREENS.app, change: "No breadcrumb. The header shows the title and a 48 px back control." },
      ]}
    />
  );
}


function StyleColor() {
  return (
    <Table
      head={["Part", "Color"]}
      rows={[
        ["Page title", <T>--fg</T>],
        ["Current record", <T>--fg-2</T>],
        ["Context text", <T>--fg-3</T>],
        ["Separator", <T>--icon-quiet</T>],
      ]}
    />
  );
}

function StyleSpec() {
  return (
    <div className="prose">
      <Table
        head={["Property", "Value"]}
        rows={[
          ["Header height", "56"],
          ["Title to trail gap", "10, baseline aligned"],
          ["Gap between parts", "7"],
          ["Trail text", <><T>--fs-sub</T> 12.5 · 400</>],
          ["Current record", "12.5 · 500"],
          ["Separator icon", "13"],
        ]}
      />
      <Code title="Module CSS" lang="css">{CSS_CRUMB}</Code>
    </div>
  );
}

/* ---- code ----------------------------------------------------------------- */

function CodeWeb() {
  return (
    <div className="prose">
      <Code title="HTML" lang="html">{HTML_RECORD}</Code>
      <Code title="React" lang="tsx">{`
export function Breadcrumb({ current, context }: { current: string; context?: string }) {
  return (
    <nav className="bd-crumb" aria-label="Breadcrumb">
      <Ic n="chev" s={13} />
      <b aria-current="page">{current}</b>
      {context && <><Ic n="chev" s={13} /><span>{context}</span></>}
    </nav>
  );
}

<div className="bd-title">
  <h1>Breakdown Log</h1>
  {record && <Breadcrumb current={record.no} context={record.company} />}
</div>
`}</Code>
      <Table
        head={["Prop", "Type", "Default"]}
        rows={[
          [<T>current</T>, <T>string</T>, "Required. The open record's number"],
          [<T>context</T>, <T>string</T>, "—"],
        ]}
      />
    </div>
  );
}

function CodeFlutter() {
  return (
    <div className="prose">
      <p className="prose-p">
        Mobile has no breadcrumb. The app bar's back button and title carry the location.
      </p>
      <Code title="Flutter" lang="dart">{`
AppBar(
  // the back button is automatic when the route can pop
  title: Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [
      Text(log.no),
      Text(log.company, style: Theme.of(context).textTheme.bodySmall),
    ],
  ),
);
`}</Code>
    </div>
  );
}

function CodeIos() {
  return (
    <div className="prose">
      <p className="prose-p">
        Keep the system back button and edge swipe. The navigation title names the record.
      </p>
      <Code title="SwiftUI" lang="swift">{`
NavigationStack {
    BreakdownList()
        .navigationDestination(for: BreakdownLog.self) { log in
            BreakdownDetail(log: log)
                .navigationTitle(log.no)
        }
}
`}</Code>
    </div>
  );
}

/* ---- accessibility -------------------------------------------------------- */

function A11yKeyboard() {
  return (
    <div className="prose">
      <Table
        head={["Key", "Action"]}
        rows={[
          ["Tab", "Skips the trail, which has no links, and reaches the header actions"],
          ["Enter, Space", "On Back to List, returns to the register"],
        ]}
      />
    </div>
  );
}

function A11yNames() {
  return (
    <div className="prose">
      <ul className="dodont">
        <Do>Wrap the trail in <T>{"<nav aria-label=\"Breadcrumb\">"}</T> so it can be found as a landmark.</Do>
        <Do>Mark the open record with <T>aria-current="page"</T>.</Do>
        <Do>Hide the chevron separators with <T>aria-hidden="true"</T>. They are decoration.</Do>
        <Dont>Rely on the trail for navigation. Keep a labelled Back to List button.</Dont>
        <Dont>Put meaning in the separator color or shape.</Dont>
      </ul>
    </div>
  );
}

function A11yContrast() {
  return (
    <Table
      head={["Pair", "Ratio", "Requirement"]}
      rows={[
        [<><T>--fg-2</T> on white (record)</>, "8.4:1", "4.5:1 text"],
        [<><T>--fg-3</T> on white (context)</>, "6.2:1", "4.5:1 text"],
        [<><T>--icon-quiet</T> on white (separator)</>, "3.0:1", "Decorative only. Never used for text"],
      ]}
    />
  );
}

export const breadcrumb: ComponentContent = {
  lead: "A quiet trail beside the page title that says which record is open.",
  art: BreadcrumbArt,
  usage: [
    { id: "overview", title: "Overview", body: <Overview /> },
    { id: "when-to-use", title: "When to use", body: <WhenToUse /> },
    { id: "anatomy", title: "Anatomy", body: <Anatomy /> },
    { id: "variants", title: "Variants", body: <Variants /> },
    { id: "behavior", title: "Behavior and states", body: <Behavior /> },
    { id: "related", title: "Related", body: <p className="prose-p">Button for Back to List; Tabs for moving between categories on the same page.</p>, more: { href: "/components/button", label: "Button" } },
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
