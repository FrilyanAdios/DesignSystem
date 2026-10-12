import { Example } from "@/components/demo/Example";
import { SpecSheet } from "@/components/demo/SpecSheet";
import { ScreenWidths, WEB_SCREENS } from "@/components/demo/ScreenWidths";
import { TabsArt } from "@/components/art/tabs";
import { Code, Do, Dont, T, Table } from "../dev-kit";
import { FieldOpsTabs, TestReportTabs } from "./tabs.demo";
import type { ComponentContent } from "./types";

/* ---------------------------------------------------------------------------
   Tabs (.tabs) — facts from DESIGN_SYSTEM.md › Segmented controls and tabs and
   styles.css (.tabs, .tabs button.on, .rp-tools .tabs). Markup from script.js
   (Field operations, Work Order, Service and Test Report status filters).
   The product's markup carries only the .on class; the role/aria attributes
   below are the "appropriate tab semantics" DESIGN_SYSTEM.md asks for.
   --------------------------------------------------------------------------- */

const HTML_TABS = `
<div class="tabs" role="tablist" aria-label="Field operations">
  <button type="button" role="tab" id="tab-map" class="on" aria-selected="true" aria-controls="panel" tabindex="0">Map</button>
  <button type="button" role="tab" id="tab-eng" aria-selected="false" aria-controls="panel" tabindex="-1">Engineer</button>
  <button type="button" role="tab" id="tab-att" aria-selected="false" aria-controls="panel" tabindex="-1">Check-in / out</button>
</div>
<div role="tabpanel" id="panel" aria-labelledby="tab-map" tabindex="0">…</div>
`;

const HTML_COUNTS = `
<div class="rp-tools">
  <div class="tabs" role="tablist" aria-label="Test report status">
    <button type="button" role="tab" class="on" aria-selected="true" tabindex="0">All <b>24</b></button>
    <button type="button" role="tab" aria-selected="false" tabindex="-1">Pass <b>17</b></button>
    <button type="button" role="tab" aria-selected="false" tabindex="-1">Conditional <b>4</b></button>
    <button type="button" role="tab" aria-selected="false" tabindex="-1">Fail <b>3</b></button>
    <button type="button" role="tab" aria-selected="false" tabindex="-1">Expiring <b>2</b></button>
  </div>
  <!-- search sits beside the tabs in the same row -->
</div>
`;

/* ---- usage ---------------------------------------------------------------- */

function Overview() {
  return (
    <div className="prose">
      <p>
        Tabs switch between content categories within the same surface. They sit directly above the content they
        control. The selected tab has navy text and a 2px underline.
      </p>
      <Example
        title="Field operations"
        description="Click a tab, or focus one and use the arrow keys."
        layout="stack"
        bg="white"
        code={{ lang: "HTML", code: HTML_TABS }}
      >
        <FieldOpsTabs />
      </Example>
    </div>
  );
}

function WhenToUse() {
  return (
    <div className="prose">
      <ul className="dodont">
        <Do>Use tabs for categories of the same content: Map, Engineer, Check-in / out.</Do>
        <Do>Use them to filter a register by status, with the count in each tab.</Do>
        <Do>Place them above the content they control, with sentence case labels.</Do>
        <Dont>Use tabs for actions, or to reach unrelated destinations. Use buttons or the sidebar.</Dont>
        <Dont>Use tabs to change how the same data is shown. Use a segmented control.</Dont>
      </ul>
    </div>
  );
}

function Anatomy() {
  return (
    <div className="prose">
      <Example title="Anatomy" description="A row of tab buttons on a 1px divider, and the panel below." layout="stack" bg="white">
        <FieldOpsTabs />
      </Example>
      <Table
        head={["Part", "Rule"]}
        rows={[
          ["Tab list", <><T>.tabs</T> with <T>role="tablist"</T> and a name. 1px <T>--border</T> divider underneath</>],
          ["Tab", <>Real <T>{"<button>"}</T> with <T>role="tab"</T>. The selected tab gets <T>.on</T> and <T>aria-selected="true"</T></>],
          ["Underline", <>2px <T>--primary</T> on the selected tab, sitting on the divider</>],
          ["Count", <>Optional, in a <T>{"<b>"}</T> after the label, inside a <T>.rp-tools</T> toolbar</>],
          ["Panel", <><T>role="tabpanel"</T>, labelled by its tab, 20px below the tab list</>],
        ]}
      />
    </div>
  );
}

function Variants() {
  return (
    <div className="prose">
      <Example
        title="Categories"
        description="Content categories within one surface."
        layout="stack"
        bg="white"
        code={{ lang: "HTML", code: HTML_TABS }}
      >
        <FieldOpsTabs />
      </Example>
      <Example
        title="Status filter with counts"
        description="In a register toolbar. The count turns navy with its tab."
        layout="stack"
        bg="white"
        code={{ lang: "HTML", code: HTML_COUNTS }}
      >
        <TestReportTabs />
      </Example>
    </div>
  );
}

function Behavior() {
  return (
    <div className="prose">
      <ul className="dev-notes">
        <li>Selecting a tab swaps the panel straight away. There is no apply step.</li>
        <li>Unselected tabs use <T>--fg-3</T> text. The selected tab uses <T>--primary</T> text and underline.</li>
        <li>Keyboard focus shows the 2px primary ring plus the <T>--muted-2</T> fill.</li>
        <li>In a <T>.rp-tools</T> toolbar the tab list drops its bottom margin and wraps when space runs out.</li>
      </ul>
    </div>
  );
}

/* ---- style ---------------------------------------------------------------- */

function Measurements() {
  return (
    <div className="prose">
      <p>
        Every number below is read from the product stylesheet, not typed by hand. Tabs have no fill and no rounded
        corners. The selected tab is shown by a straight 2 px line under its label.
      </p>
      <SpecSheet
        title="Categories"
        description="Field operations."
        targets={[
          { sel: ".tabs button.on", name: "Selected tab" },
          { sel: ".tabs button:not(.on)", name: "Tab at rest" },
          { sel: ".tabs", name: "Tab list with its divider", width: "fill" },
        ]}
      >
        <div className="tabs" role="tablist" aria-label="Field operations" style={{ marginBottom: 0 }}>
          <button type="button" role="tab" className="on" aria-selected="true" tabIndex={0}>
            Map
          </button>
          <button type="button" role="tab" aria-selected="false" tabIndex={-1}>
            Engineer
          </button>
          <button type="button" role="tab" aria-selected="false" tabIndex={-1}>
            Check-in / out
          </button>
        </div>
      </SpecSheet>
      <SpecSheet
        title="Status filter with counts"
        description="In a register toolbar."
        targets={[
          { sel: ".tabs button.on", name: "Selected tab with count" },
          { sel: ".tabs button.on b", name: "Count" },
        ]}
      >
        <div className="rp-tools">
          <div className="tabs" role="tablist" aria-label="Test report status">
            <button type="button" role="tab" className="on" aria-selected="true" tabIndex={0}>
              All <b>24</b>
            </button>
            <button type="button" role="tab" aria-selected="false" tabIndex={-1}>
              Pass <b>17</b>
            </button>
            <button type="button" role="tab" aria-selected="false" tabIndex={-1}>
              Fail <b>3</b>
            </button>
          </div>
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
        { screen: "tablet", width: WEB_SCREENS.tablet, change: "Tabs keep their size. In a register toolbar they wrap to a new row when they do not fit." },
        { screen: "phone", width: WEB_SCREENS.phone, change: "Tabs keep their size. In a register toolbar they wrap to a new row when they do not fit." },
        { screen: "mobile-app", width: WEB_SCREENS.app, change: "No underline. Tabs become a joined group with an outline and fully rounded ends, equal widths, at least 48 px tall. The selected tab gets a tinted fill and semibold text. Long labels wrap instead of being cut." },
      ]}
    />
  );
}


function StyleColor() {
  return (
    <Table
      head={["Part", "Text", "Underline", "Count"]}
      rows={[
        ["Tab at rest", <T>--fg-3</T>, "transparent", <T>--fg-3</T>],
        ["Selected tab", <T>--primary</T>, <T>--primary</T>, <T>--primary</T>],
        ["Focus", <>Fill <T>--muted-2</T></>, "—", <>Ring <T>--primary</T></>],
        ["Divider", "—", <T>--border</T>, "—"],
      ]}
    />
  );
}

function StyleSpec() {
  return (
    <Table
      head={["Property", "Value"]}
      rows={[
        ["Tab height", "40 (padding, line height, and the 2px underline)"],
        ["Tab padding", "10 vertical, 16 horizontal"],
        ["Label", <><T>--fs-body</T> 13.5 · 500</>],
        ["Count", "700, tabular numerals, 5px after the label"],
        ["Gap between tabs", "2"],
        ["Underline", "2px, overlaps the 1px divider"],
        ["Space below the tab list", "20 (0 inside a toolbar)"],
      ]}
    />
  );
}

/* ---- code ----------------------------------------------------------------- */

function CodeWeb() {
  return (
    <div className="prose">
      <Code title="HTML" lang="html">{HTML_TABS + HTML_COUNTS}</Code>
      <Code title="React" lang="tsx">{`
export function Tabs<T extends string>({ label, value, onChange, tabs }: {
  label: string; value: T; onChange: (v: T) => void; tabs: { value: T; label: string; count?: number }[];
}) {
  const id = useId();
  const move = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const n = tabs.length;
    const next = { ArrowRight: (i + 1) % n, ArrowLeft: (i - 1 + n) % n, Home: 0, End: n - 1 }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    onChange(tabs[next].value);
    (e.currentTarget.parentElement?.children[next] as HTMLElement | undefined)?.focus();
  };
  return (
    <div className="tabs" role="tablist" aria-label={label}>
      {tabs.map((t, i) => (
        <button key={t.value} type="button" role="tab" id={\`\${id}-\${t.value}\`}
          aria-selected={t.value === value} aria-controls={\`\${id}-panel\`}
          tabIndex={t.value === value ? 0 : -1} className={t.value === value ? "on" : undefined}
          onClick={() => onChange(t.value)} onKeyDown={(e) => move(e, i)}>
          {t.label}{t.count !== undefined && <> <b>{t.count}</b></>}
        </button>
      ))}
    </div>
  );
}
`}</Code>
      <Table
        head={["Prop", "Type", "Default"]}
        rows={[
          [<T>label</T>, <T>string</T>, "Required. Names the tab list"],
          [<T>value</T>, <T>T</T>, "Required"],
          [<T>onChange</T>, <T>(value: T) =&gt; void</T>, "Required"],
          [<T>tabs</T>, <T>{"{ value, label, count? }[]"}</T>, "Required"],
        ]}
      />
    </div>
  );
}

function CodeFlutter() {
  return (
    <Code title="Flutter" lang="dart">{`
DefaultTabController(
  length: 3,
  child: Column(children: [
    const TabBar(
      isScrollable: true,
      tabs: [Tab(text: 'Map'), Tab(text: 'Engineer'), Tab(text: 'Check-in / out')],
    ),
    Expanded(
      child: TabBarView(children: [MapPane(), EngineerPane(), AttendancePane()]),
    ),
  ]),
);
`}</Code>
  );
}

function CodeIos() {
  return (
    <Code title="SwiftUI" lang="swift">{`
enum FieldTab: String, CaseIterable { case map, engineer, attendance }

VStack(spacing: EscoSpace.s16) {
    Picker("Field operations", selection: $tab) {
        Text("Map").tag(FieldTab.map)
        Text("Engineer").tag(FieldTab.engineer)
        Text("Check-in / out").tag(FieldTab.attendance)
    }
    .pickerStyle(.segmented)

    switch tab {
    case .map: MapPane()
    case .engineer: EngineerPane()
    case .attendance: AttendancePane()
    }
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
        ["Tab", "Moves focus into the tab list, onto the selected tab. Tab again moves to the panel"],
        ["Left arrow, Right arrow", "Moves to the previous or next tab and selects it. Wraps at the ends"],
        ["Home, End", "Moves to the first or last tab and selects it"],
      ]}
    />
  );
}

function A11yNames() {
  return (
    <div className="prose">
      <ul className="dodont">
        <Do>Use <T>role="tablist"</T> with an <T>aria-label</T>, <T>role="tab"</T> on each button, and <T>role="tabpanel"</T> on the content.</Do>
        <Do>Keep <T>aria-selected</T> in sync with the <T>.on</T> class, and link tab and panel with <T>aria-controls</T> and <T>aria-labelledby</T>.</Do>
        <Do>Keep the count inside the tab, so it is read with the label: Pass 17.</Do>
        <Dont>Show selection with the class or the underline alone.</Dont>
        <Dont>Put every tab in the Tab order. Only the selected tab is reachable with Tab; arrows move between tabs.</Dont>
      </ul>
    </div>
  );
}

function A11yContrast() {
  return (
    <Table
      head={["Pair", "Ratio", "Requirement"]}
      rows={[
        [<><T>--primary</T> on white (selected)</>, "9.6:1", "4.5:1 text"],
        [<><T>--fg-3</T> on white (rest)</>, "6.2:1", "4.5:1 text"],
        ["Underline on white", "9.6:1", "3:1 non-text"],
        ["Focus ring on white", "9.6:1", "3:1 non-text"],
      ]}
    />
  );
}

export const tabs: ComponentContent = {
  lead: "Switches between content categories within one surface. The selected tab has navy text and a 2px underline.",
  art: TabsArt,
  usage: [
    { id: "overview", title: "Overview", body: <Overview /> },
    { id: "when-to-use", title: "When to use", body: <WhenToUse /> },
    { id: "anatomy", title: "Anatomy", body: <Anatomy /> },
    { id: "variants", title: "Variants", body: <Variants /> },
    { id: "behavior", title: "Behavior and states", body: <Behavior /> },
    { id: "related", title: "Related", body: <p className="prose-p">Segmented control for switching how the same data is shown; Breadcrumb for where the page sits.</p>, more: { href: "/components/segmented-control", label: "Segmented control" } },
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
