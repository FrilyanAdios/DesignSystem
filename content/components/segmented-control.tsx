import { Example } from "@/components/demo/Example";
import { Ic } from "@/components/demo/Ic";
import { SpecSheet } from "@/components/demo/SpecSheet";
import { ScreenWidths, WEB_SCREENS } from "@/components/demo/ScreenWidths";
import { SegmentedControlArt } from "@/components/art/segmented-control";
import { Code, Do, Dont, T, Table } from "../dev-kit";
import { GroupBySwitch, RegisterShapeSwitch, ScheduleViewSwitch } from "./segmented-control.demo";
import type { ComponentContent } from "./types";

/* ---------------------------------------------------------------------------
   Segmented control (.viewsw) — facts from DESIGN_SYSTEM.md › Segmented controls
   and tabs, › Component equivalence (Register/Split switch), and styles.css
   (.viewsw and the shared :is(.viewsw,.srsw,…) grammar). Markup from script.js
   (Schedule view), reports-fse.js (Group by), sr/sr-list.js (Register/Split).
   --------------------------------------------------------------------------- */

const HTML_LABEL = `
<span id="group-l">Group by</span>
<div class="viewsw" role="group" aria-labelledby="group-l">
  <button type="button" class="on" aria-pressed="true">No grouping</button>
  <button type="button" aria-pressed="false">Engineer</button>
</div>
`;

const HTML_ICON_LABEL = `
<div class="viewsw" role="group" aria-label="Schedule view">
  <button type="button" class="on" aria-pressed="true" title="Calendar view">
    <!-- ic('grid', 14) --><span class="lbl">Calendar</span>
  </button>
  <button type="button" aria-pressed="false" title="List view">
    <!-- ic('list', 14) --><span class="lbl">List</span>
  </button>
  <button type="button" aria-pressed="false" title="Reports view">
    <!-- ic('report', 14) --><span class="lbl">Reports</span>
  </button>
</div>
`;

const HTML_ICON_ONLY = `
<div class="viewsw" role="group" aria-label="View">
  <button type="button" class="on" aria-pressed="true" aria-label="Register view" title="Register — every column">
    <!-- ic('table', 16) -->
  </button>
  <button type="button" aria-pressed="false" aria-label="Split view" title="Split — list beside the report">
    <!-- ic('panel', 16) -->
  </button>
</div>
`;

/* ---- usage ---------------------------------------------------------------- */

function Overview() {
  return (
    <div className="prose">
      <p>
        A segmented control switches between views of the same data: calendar or list, register or split. Only one
        segment is on at a time. It changes how the content is shown, not what is in it.
      </p>
      <Example
        title="Schedule view"
        description="Click a segment. The selected one turns white with navy text."
        layout="center"
        code={{ lang: "HTML", code: HTML_ICON_LABEL }}
      >
        <ScheduleViewSwitch />
      </Example>
    </div>
  );
}

function WhenToUse() {
  return (
    <div className="prose">
      <ul className="dodont">
        <Do>Use it for two to a few mutually exclusive view modes, like Calendar, List, and Reports.</Do>
        <Do>Name the group: <T>aria-label</T> or <T>aria-labelledby</T> on the container.</Do>
        <Do>Use the icon-only form for the Register and Split switch, the same in every module.</Do>
        <Dont>Use it to switch content categories within a surface. Use tabs.</Dont>
        <Dont>Use it for actions, or show a thick outline for the selected segment.</Dont>
      </ul>
    </div>
  );
}

function Anatomy() {
  return (
    <div className="prose">
      <Example title="Anatomy" description="A quiet gray container holding toggle buttons." layout="center">
        <ScheduleViewSwitch />
      </Example>
      <Table
        head={["Part", "Rule"]}
        rows={[
          ["Container", <><T>.viewsw</T> with <T>role="group"</T> and a name, <T>--muted</T> fill, 3px inset</>],
          ["Segment", <>Real <T>{"<button>"}</T> with <T>aria-pressed</T>. The selected one also gets <T>.on</T></>],
          ["Icon", "Optional. 14px with a label, 16px when icon-only"],
          ["Label", <>Sentence case, 12.5px semibold. Wrap it in <T>.lbl</T> when an icon is present</>],
        ]}
      />
    </div>
  );
}

function Variants() {
  return (
    <div className="prose">
      <div className="examples two">
        <Example title="Text" description="Short labels. Named by a visible label." code={{ lang: "HTML", code: HTML_LABEL }}>
          <GroupBySwitch />
        </Example>
        <Example title="Icon only" description="Register and Split. Each segment has its own name." code={{ lang: "HTML", code: HTML_ICON_ONLY }}>
          <RegisterShapeSwitch />
        </Example>
      </div>
      <Example title="Icon and label" description="Icon before the label, 14px." layout="center" code={{ lang: "HTML", code: HTML_ICON_LABEL }}>
        <ScheduleViewSwitch />
      </Example>
    </div>
  );
}

function Behavior() {
  return (
    <div className="prose">
      <Example title="States" description="Selected, rest, and disabled. Hover and focus are live." layout="center">
        <div className="viewsw" role="group" aria-label="Schedule view">
          <button type="button" className="on" aria-pressed="true" title="Calendar view">
            <Ic n="grid" s={14} />
            <span className="lbl">Calendar</span>
          </button>
          <button type="button" aria-pressed="false" title="List view">
            <Ic n="list" s={14} />
            <span className="lbl">List</span>
          </button>
          <button type="button" aria-pressed="false" title="Reports view" disabled>
            <Ic n="report" s={14} />
            <span className="lbl">Reports</span>
          </button>
        </div>
      </Example>
      <ul className="dev-notes">
        <li>Selecting a segment switches the view straight away. There is no apply step.</li>
        <li>Hover adds the <T>--muted-2</T> fill to a segment at rest. The selected segment stays white.</li>
        <li>Keyboard focus shows the 2px primary ring plus the <T>--muted-2</T> fill.</li>
        <li>Disabled segments drop to 50% opacity and ignore the pointer.</li>
        <li>Below 1720px, a switch named View hides its <T>.lbl</T> labels so the toolbar stays on one row. Icons and tooltips stay.</li>
        <li>Below 640px each segment grows to at least 36 × 36.</li>
      </ul>
    </div>
  );
}

/* ---- style ---------------------------------------------------------------- */

function Measurements() {
  return (
    <div className="prose">
      <p>
        Every number below is read from the product stylesheet, not typed by hand. The track and the segments have
        rounded corners. Neither is a pill.
      </p>
      <SpecSheet
        title="Icon and label"
        description="The Schedule view switch."
        targets={[
          { sel: ".viewsw", name: "Track (the gray container)" },
          { sel: ".viewsw button.on", name: "Selected segment" },
          { sel: ".viewsw button:not(.on)", name: "Segment at rest" },
        ]}
      >
        <div className="viewsw" role="group" aria-label="Schedule view">
          <button type="button" className="on" aria-pressed="true" title="Calendar view">
            <Ic n="grid" s={14} />
            <span className="lbl">Calendar</span>
          </button>
          <button type="button" aria-pressed="false" title="List view">
            <Ic n="list" s={14} />
            <span className="lbl">List</span>
          </button>
          <button type="button" aria-pressed="false" title="Reports view">
            <Ic n="report" s={14} />
            <span className="lbl">Reports</span>
          </button>
        </div>
      </SpecSheet>
      <SpecSheet
        title="Text only"
        description="The Group by switch."
        targets={[
          { sel: ".viewsw button.on", name: "Selected segment, text only" },
          { sel: ".viewsw button:not(.on)", name: "Segment at rest, text only" },
        ]}
      >
        <div className="viewsw" role="group" aria-label="Group by">
          <button type="button" className="on" aria-pressed="true">
            No grouping
          </button>
          <button type="button" aria-pressed="false">
            Engineer
          </button>
        </div>
      </SpecSheet>
      <SpecSheet
        title="Icon only"
        description="The Register and Split switch, named View."
        targets={[
          { sel: ".viewsw", name: "Track, icon only" },
          { sel: ".viewsw button.on", name: "Selected segment, icon only" },
        ]}
      >
        <div className="viewsw" role="group" aria-label="View">
          <button type="button" className="on" aria-pressed="true" aria-label="Register view" title="Register — every column">
            <Ic n="table" s={16} />
          </button>
          <button type="button" aria-pressed="false" aria-label="Split view" title="Split — list beside the report">
            <Ic n="panel" s={16} />
          </button>
        </div>
      </SpecSheet>
    </div>
  );
}

function Screens() {
  return (
    <ScreenWidths
      rows={[
        { screen: "desktop", width: WEB_SCREENS.desktop, change: "Below 1720 px, a switch named View hides its labels. Icons and tooltips stay, and segment padding drops to 10 px." },
        { screen: "laptop", width: WEB_SCREENS.laptop, change: "Below 1050 px, the Schedule view switch hides its labels. Icons and tooltips stay." },
        { screen: "tablet", width: WEB_SCREENS.tablet, change: "Below 780 px, Breakdown Log and Defect Reports hide their view switch so the search keeps its room." },
        { screen: "phone", width: WEB_SCREENS.phone, change: "Each segment is at least 36 × 36 px. Below 600 px, the Service Report switch shows icons only." },
        { screen: "mobile-app", width: WEB_SCREENS.app, change: "A joined group with an outline and fully rounded ends. Segments share the width equally and are at least 48 px tall. The selected one gets a tinted fill and semibold text." },
      ]}
    />
  );
}


function StyleColor() {
  return (
    <Table
      head={["Part", "Background", "Text and icon", "Hover"]}
      rows={[
        ["Container", <T>--muted</T>, "—", "—"],
        ["Segment at rest", "transparent", <T>--fg-2</T>, <T>--muted-2</T>],
        ["Selected segment", <>#FFFFFF with <T>--shadow-sm</T></>, <T>--primary</T>, "No change"],
        ["Focus", <T>--muted-2</T>, "—", <>Ring <T>--primary</T></>],
      ]}
    />
  );
}

function StyleSpec() {
  return (
    <Table
      head={["Property", "Value"]}
      rows={[
        ["Container height", <><T>--h-md</T> 36</>],
        ["Container padding", "3"],
        ["Container radius", <><T>--radius-field</T> 8</>],
        ["Gap between segments", "2"],
        ["Segment height", <><T>--h-xs</T> 28</>],
        ["Segment padding", <><T>--sp-3</T> 12 horizontal (10 for a switch named View below 1720 px)</>],
        ["Segment radius", <><T>--radius-control</T> 6</>],
        ["Label", <><T>--fs-sub</T> 12.5 · 600</>],
        ["Icon size", "14 with label, 16 icon-only"],
        ["Icon gap", "6"],
        ["Touch size below 640px", "At least 36 × 36 per segment"],
      ]}
    />
  );
}

/* ---- code ----------------------------------------------------------------- */

function CodeWeb() {
  return (
    <div className="prose">
      <Code title="HTML" lang="html">{HTML_ICON_LABEL + HTML_ICON_ONLY}</Code>
      <Code title="React" lang="tsx">{`
type Segment<T extends string> = { value: T; label: string; icon?: ReactNode; iconOnly?: boolean };

export function SegmentedControl<T extends string>({ label, value, onChange, segments }: {
  label: string; value: T; onChange: (v: T) => void; segments: Segment<T>[];
}) {
  return (
    <div className="viewsw" role="group" aria-label={label}>
      {segments.map((s) => (
        <button key={s.value} type="button" className={s.value === value ? "on" : undefined}
          aria-pressed={s.value === value} aria-label={s.iconOnly ? s.label : undefined}
          title={s.label} onClick={() => onChange(s.value)}>
          {s.icon}
          {!s.iconOnly && <span className="lbl">{s.label}</span>}
        </button>
      ))}
    </div>
  );
}

<SegmentedControl label="Schedule view" value={view} onChange={setView} segments={[
  { value: "calendar", label: "Calendar", icon: <Ic n="grid" s={14} /> },
  { value: "list", label: "List", icon: <Ic n="list" s={14} /> },
]} />
`}</Code>
      <Table
        head={["Prop", "Type", "Default"]}
        rows={[
          [<T>label</T>, <T>string</T>, "Required. Names the group"],
          [<T>value</T>, <T>T</T>, "Required"],
          [<T>onChange</T>, <T>(value: T) =&gt; void</T>, "Required"],
          [<T>segments</T>, <T>{"{ value, label, icon?, iconOnly? }[]"}</T>, "Required"],
        ]}
      />
    </div>
  );
}

function CodeFlutter() {
  return (
    <Code title="Flutter" lang="dart">{`
enum ScheduleView { calendar, list, reports }

SegmentedButton<ScheduleView>(
  segments: const [
    ButtonSegment(value: ScheduleView.calendar, label: Text('Calendar'), icon: Icon(Icons.grid_view)),
    ButtonSegment(value: ScheduleView.list, label: Text('List'), icon: Icon(Icons.list)),
    ButtonSegment(value: ScheduleView.reports, label: Text('Reports'), icon: Icon(Icons.description_outlined)),
  ],
  selected: {view},
  showSelectedIcon: false,
  onSelectionChanged: (s) => setState(() => view = s.first),
);
`}</Code>
  );
}

function CodeIos() {
  return (
    <Code title="SwiftUI" lang="swift">{`
enum ScheduleView: String, CaseIterable { case calendar, list, reports }

Picker("Schedule view", selection: $view) {
    Text("Calendar").tag(ScheduleView.calendar)
    Text("List").tag(ScheduleView.list)
    Text("Reports").tag(ScheduleView.reports)
}
.pickerStyle(.segmented)
.tint(.escoPrimary)
`}</Code>
  );
}

/* ---- accessibility -------------------------------------------------------- */

function A11yKeyboard() {
  return (
    <Table
      head={["Key", "Action"]}
      rows={[
        ["Tab, Shift+Tab", "Moves focus to each segment in turn"],
        ["Enter, Space", "Selects the focused segment and switches the view"],
      ]}
    />
  );
}

function A11yNames() {
  return (
    <div className="prose">
      <ul className="dodont">
        <Do>Use <T>role="group"</T> on the container and name it: Schedule view, View, Group by.</Do>
        <Do>Set <T>aria-pressed</T> on every segment and keep it in sync with the <T>.on</T> class.</Do>
        <Do>Give icon-only segments an <T>aria-label</T> (Register view, Split view) and a descriptive <T>title</T>.</Do>
        <Dont>Show selection with the class alone. Screen readers only hear <T>aria-pressed</T>.</Dont>
        <Dont>Use <T>role="tab"</T> here. A view switch is a set of toggle buttons, not tabs.</Dont>
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
        [<><T>--fg-2</T> on <T>--muted</T> (rest)</>, "8.1:1", "4.5:1 text"],
        [<><T>--fg-2</T> on <T>--muted-2</T> (hover)</>, "7.4:1", "4.5:1 text"],
        ["White segment on the container", "1.05:1", "Selection is also shown by navy text and aria-pressed, not the fill alone"],
        ["Focus ring on white", "9.6:1", "3:1 non-text"],
      ]}
    />
  );
}

export const segmentedControl: ComponentContent = {
  lead: "Switches between views of the same content. One segment is on at a time.",
  art: SegmentedControlArt,
  usage: [
    { id: "overview", title: "Overview", body: <Overview /> },
    { id: "when-to-use", title: "When to use", body: <WhenToUse /> },
    { id: "anatomy", title: "Anatomy", body: <Anatomy /> },
    { id: "variants", title: "Variants", body: <Variants /> },
    { id: "behavior", title: "Behavior and states", body: <Behavior /> },
    { id: "related", title: "Related", body: <p className="prose-p">Tabs for content categories within one surface; Icon button for a single universal action.</p>, more: { href: "/components/tabs", label: "Tabs" } },
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
