import { Example } from "@/components/demo/Example";
import { Ic } from "@/components/demo/Ic";
import { Code, Do, Dont, T, Table } from "../dev-kit";
import { ContextualExport, RegisterCheckboxSpec, SelectAllGroup, SelectionCellSpec } from "./checkbox.demo";
import { SpecSheet } from "@/components/demo/SpecSheet";
import { ScreenWidths, WEB_SCREENS } from "@/components/demo/ScreenWidths";
import { CheckboxArt } from "@/components/art/checkbox";
import type { ComponentContent } from "./types";

/* ---------------------------------------------------------------------------
   Checkbox — facts from:
   - styles.css › .chk (canonical native checkbox), input[disabled], focus reset
   - DESIGN_SYSTEM.md › Register selection and export
   - fsm-design references › ux-rules.md › Contextual selection and export
   - wo/wo-list.js (selection column, woActionBar), wo/wo.css (.wo-actionbar)
   - wo/wo-detail.js (export sections with a mixed group checkbox)
   - sr/sr-form.js ("With Service Time" document setting)
   --------------------------------------------------------------------------- */

const HTML_SINGLE = `
<label class="chk">
  <input type="checkbox" checked>
  With Service Time
</label>
`;

const HTML_GROUP = `
<fieldset>
  <legend class="field-label">Columns to export</legend>
  <label class="chk"><input type="checkbox" checked> Work order</label>
  <label class="chk"><input type="checkbox" checked> Customer</label>
  <label class="chk"><input type="checkbox"> Engineer</label>
</fieldset>
`;

const HTML_MIXED = `
<label class="chk">
  <input type="checkbox" id="select-all-sections">
  Select all sections
</label>
<script>
  // set from the children: some, not all
  document.getElementById("select-all-sections").indeterminate = true;
</script>
`;

const HTML_TABLE = `
<th class="wo-th-sel">
  <label class="chk"><input type="checkbox" aria-label="Select all rows on this page"></label>
</th>
…
<td class="wo-td-sel">
  <label class="chk"><input type="checkbox" aria-label="Select WO-2418"></label>
</td>
`;

const HTML_DISABLED = `
<label class="chk">
  <input type="checkbox" checked disabled>
  Service details <small>Always included.</small>
</label>
`;

const HTML_EXPORT = `
<!-- rest: no checkbox column, one Export action in the toolbar -->
<button type="button" class="btn btn-sm export-btn">
  <!-- ic('download', 14) --> Export
</button>

<!-- selection mode: checkbox column + selection bar under the table -->
<div class="wo-actionbar wo-export-selection" role="region" aria-label="Select work orders to export">
  <span class="wo-export-instruction">
    <!-- ic('info', 15) -->
    <span>
      <b>Select work orders to export</b>
      <small>Use the checkboxes in the first column, then export the selected rows.</small>
    </span>
  </span>
  <div class="spacer"></div>
  <button type="button" class="btn btn-ghost btn-sm">Cancel</button>
  <button type="button" class="btn btn-primary btn-sm export-btn" disabled>
    <!-- ic('download', 14) --> Export selected (0)
  </button>
</div>
`;

/* ---- usage ---------------------------------------------------------------- */

function Overview() {
  return (
    <div className="prose">
      <p>
        A checkbox turns one independent option on or off, or picks several items from a list. Each box has its own
        visible label. Checking a box changes a choice; it does not run an action by itself.
      </p>
      <Example
        title="Document setting"
        description="One option, labelled, with the box before the text."
        code={{ lang: "HTML", code: HTML_SINGLE }}
      >
        <label className="chk">
          <input type="checkbox" defaultChecked />
          With Service Time
        </label>
      </Example>
    </div>
  );
}

function WhenToUse() {
  return (
    <div className="prose">
      <ul className="dodont">
        <Do>Use a checkbox for options that do not affect each other, and for picking several rows or fields.</Do>
        <Do>Use a radio group when exactly one of a few visible options must be chosen.</Do>
        <Do>
          Use a switch on mobile for an on or off setting that applies straight away. The web product has no switch;
          a labelled checkbox does that job there.
        </Do>
        <Do>Keep checkboxes hidden at rest when selection exists only to export.</Do>
        <Dont>Use one checkbox to mean two opposite things, or pair it with a separate Yes and No.</Dont>
        <Dont>Show a permanent checkbox column only so people can export. Export enters selection mode instead.</Dont>
      </ul>
    </div>
  );
}

function Anatomy() {
  return (
    <div className="prose">
      <Example title="Anatomy" description="Native box, then the label, inside one label element." layout="center">
        <label className="chk">
          <input type="checkbox" defaultChecked />
          Customer
        </label>
        <label className="chk">
          <input type="checkbox" />
          Engineer
        </label>
      </Example>
      <Table
        head={["Part", "Rule"]}
        rows={[
          ["Box", <>Native <T>{'<input type="checkbox">'}</T>, 16px, filled with <T>--primary</T> when checked</>],
          ["Label", "Sentence case, 13px, after the box. Clicking the label toggles the box"],
          ["Wrapper", <><T>{'<label class="chk">'}</T> holds both, so the whole line is the target</>],
          ["Group legend", <>Several related boxes sit in a <T>fieldset</T> with a <T>legend</T></>],
        ]}
      />
    </div>
  );
}

function Variants() {
  return (
    <div className="prose">
      <div className="examples two">
        <Example title="Single option" description="A setting with its own label." code={{ lang: "HTML", code: HTML_SINGLE }}>
          <label className="chk">
            <input type="checkbox" defaultChecked />
            With Service Time
          </label>
        </Example>
        <Example title="Group" description="Related options under one legend." code={{ lang: "HTML", code: HTML_GROUP }}>
          <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
            <legend style={{ fontSize: "var(--fs-label)", fontWeight: 600, color: "var(--fg-2)", padding: 0 }}>
              Columns to export
            </legend>
            <label className="chk">
              <input type="checkbox" defaultChecked /> Work order
            </label>
            <label className="chk">
              <input type="checkbox" defaultChecked /> Customer
            </label>
            <label className="chk">
              <input type="checkbox" /> Engineer
            </label>
          </fieldset>
        </Example>
        <Example
          title="Select all, mixed"
          description="The parent shows mixed when some children are checked. Try it."
          code={{ lang: "HTML", code: HTML_MIXED }}
        >
          <SelectAllGroup />
        </Example>
        <Example
          title="Table selection"
          description="A box with no visible label gets an aria-label that names the row."
          code={{ lang: "HTML", code: HTML_TABLE }}
        >
          <label className="chk" style={{ width: "var(--h-lg)", minHeight: "var(--h-lg)", justifyContent: "center", margin: 0 }}>
            <input type="checkbox" aria-label="Select all rows on this page" />
          </label>
          <label className="chk" style={{ width: "var(--h-lg)", minHeight: "var(--h-lg)", justifyContent: "center", margin: 0 }}>
            <input type="checkbox" defaultChecked aria-label="Select WO-2418" />
          </label>
        </Example>
        <Example
          title="Disabled and checked"
          description="A required item that is always included."
          code={{ lang: "HTML", code: HTML_DISABLED }}
        >
          <label className="chk">
            <input type="checkbox" defaultChecked disabled />
            <span>
              Service details{" "}
              <small style={{ color: "var(--fg-3)", fontSize: "var(--fs-help)" }}>Always included.</small>
            </span>
          </label>
        </Example>
      </div>
    </div>
  );
}

function ContextualSelection() {
  return (
    <div className="prose">
      <p>
        When rows are selected only to export them, the table has no checkbox column at rest. Export enters selection
        mode. The count lives inside the action label, never in a separate counter.
      </p>
      <Example
        title="Selection for export"
        description="Select Export, pick rows, then export or cancel. Both return the table to rest."
        layout="none"
        code={{ lang: "HTML", code: HTML_EXPORT }}
      >
        <ContextualExport />
      </Example>
      <ul className="dev-notes">
        <li>Export enters selection mode, reveals the checkbox column, clears any earlier selection, and shows a short instruction.</li>
        <li>
          The action reads <T>Export selected (0)</T> and stays disabled until at least one row is checked.
        </li>
        <li>The selection bar sits under the table and above the pager, never between the toolbar and the table.</li>
        <li>Cancel or a finished export clears the selection and returns the table to rest.</li>
        <li>
          Registers where selection drives routine work beyond export (Service Report, Test Report) keep persistent
          checkboxes. Their bar shows only while rows are selected.
        </li>
      </ul>
    </div>
  );
}

function Behavior() {
  return (
    <div className="prose">
      <Example title="States" description="Unchecked, checked, and disabled. Focus is live: tab to a box." layout="row">
        <label className="chk">
          <input type="checkbox" /> Unchecked
        </label>
        <label className="chk">
          <input type="checkbox" defaultChecked /> Checked
        </label>
        <label className="chk">
          <input type="checkbox" disabled /> Disabled
        </label>
        <label className="chk">
          <input type="checkbox" defaultChecked disabled /> Disabled, checked
        </label>
      </Example>
      <ul className="dev-notes">
        <li>Checked fills the box with the primary color through <T>accent-color</T>. The browser draws the tick.</li>
        <li>Mixed is set with the <T>indeterminate</T> property, not an attribute. It shows when some, not all, children are checked.</li>
        <li>Keyboard focus shows the 2px primary ring with a 2px offset. A pointer click draws no ring.</li>
        <li>Disabled drops the box to 50% opacity and removes the pointer cursor.</li>
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
        picture looks. The canonical <T>.chk</T> box is a native input: the browser draws its 16 × 16 square and its
        corner, so it is not measured here. The register box below is drawn by the product.
      </p>
      <SpecSheet
        title="Register checkbox, drawn by the product"
        description="Service Report table. Here the product draws the box itself: an almost square box with a 4 px corner, never a circle. The stylesheet sets a 1.5 px border; browsers may draw it as 1 px, which is what is measured here."
        scale={3}
        targets={[
          { sel: '[data-s="off"] input', name: "Checkbox, unchecked", width: "fixed", marks: false },
          { sel: '[data-s="on"] input', name: "Checkbox, checked", width: "fixed", marks: true },
          { sel: '[data-s="off"]', name: "Tap area around the box", width: "fixed", marks: false },
        ]}
      >
        <RegisterCheckboxSpec />
      </SpecSheet>
      <SpecSheet
        title="Selection cell in a register"
        description="Work Order table. The cell is an invisible 40 px target around the 16 px box; it has no fill or corner of its own."
        targets={[{ sel: ".wo-td-sel .chk", name: "Selection cell target", width: "fixed" }]}
      >
        <SelectionCellSpec />
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
        { screen: "tablet", width: WEB_SCREENS.tablet, change: "Below 900 px a register scrolls sideways. The checkbox column keeps its size." },
        { screen: "phone", width: WEB_SCREENS.phone, change: "The selection cell target grows from 40 px to 44 px square. The box itself stays 16 px." },
        { screen: "mobile-app", width: WEB_SCREENS.app, change: "A checkbox is 20 × 20 in a row at least 48 tall. On or off settings use a switch instead." },
      ]}
    />
  );
}

function StyleColor() {
  return (
    <Table
      head={["Element", "Token"]}
      rows={[
        ["Checked fill", <T>--primary</T>],
        ["Label", <T>--fg-2</T>],
        ["Focus ring", <T>--primary</T>],
        ["Selected row (export selection)", <T>--row-sel</T>],
        ["Selection bar background", <T>--primary-50</T>],
        ["Selection bar instruction", <><T>--primary-700</T>, sub-line <T>--fg-3</T></>],
      ]}
    />
  );
}

function StyleSpec() {
  return (
    <Table
      head={["Property", "Value"]}
      rows={[
        ["Box size", "16 × 16"],
        ["Box to label gap", <><T>--sp-2</T> 8</>],
        ["Label", "13px, regular"],
        ["Vertical margin", "10px above and below each line"],
        ["Table cell target", <><T>--h-lg</T> 40 square; <T>--h-xl</T> 44 at 640px and below</>],
        ["Focus ring", <>2px <T>--primary</T>, 2px offset</>],
        ["Disabled", "50% opacity"],
        ["Selection bar actions", <><T>.btn-sm</T> 32 tall</>],
      ]}
    />
  );
}

/* ---- code ----------------------------------------------------------------- */

function CodeWeb() {
  return (
    <div className="prose">
      <Code title="HTML" lang="html">{HTML_SINGLE + HTML_GROUP + HTML_TABLE}</Code>
      <Code title="React" lang="tsx">{`
import { Checkbox } from "@/components/ui/Checkbox";

<Checkbox checked={withTime} onChange={setWithTime}>With Service Time</Checkbox>

// table selection: no visible label, so name the row
<Checkbox checked={sel.has(id)} onChange={(v) => toggle(id, v)} aria-label={\`Select \${id}\`} />

// select all: mixed when some rows are selected
<Checkbox checked={all} indeterminate={some} onChange={toggleAll} aria-label="Select all rows on this page" />
`}</Code>
      <Table
        head={["Prop", "Type", "Default"]}
        rows={[
          [<T>checked</T>, <T>boolean</T>, <T>false</T>],
          [<T>indeterminate</T>, <T>boolean</T>, <T>false</T>],
          [<T>onChange</T>, <T>(checked: boolean) =&gt; void</T>, "—"],
          [<T>children</T>, <T>ReactNode</T>, "— (label)"],
          [<T>aria-label</T>, <T>string</T>, "— (only when there is no visible label)"],
          [<T>disabled</T>, <T>boolean</T>, <T>false</T>],
        ]}
      />
      <ul className="dev-notes">
        <li>Render a real input inside a label. Set <T>indeterminate</T> in an effect, since it has no HTML attribute.</li>
      </ul>
    </div>
  );
}

function CodeFlutter() {
  return (
    <Code title="Flutter" lang="dart">{`
// one option, whole row is the target
CheckboxListTile(
  value: withTime,
  onChanged: (v) => setState(() => withTime = v ?? false),
  title: const Text('With Service Time'),
  controlAffinity: ListTileControlAffinity.leading,
);

// select all: null means mixed
Checkbox(
  tristate: true,
  value: all ? true : (some ? null : false),
  onChanged: (_) => toggleAll(),
  semanticLabel: 'Select all rows',
);

// an on or off setting on mobile is a Switch, not a checkbox
`}</Code>
  );
}

function CodeIos() {
  return (
    <Code title="SwiftUI" lang="swift">{`
// iOS has no checkbox. Pick several rows with list selection.
@State private var selection = Set<WorkOrder.ID>()

List(workOrders, selection: $selection) { wo in
    Text(wo.id).font(.escoBody)
}
.environment(\\.editMode, .constant(.active))

Button("Export selected (\\(selection.count))", action: export)
    .disabled(selection.isEmpty)

// an on or off setting is a Toggle
Toggle("With Service Time", isOn: $withTime).tint(.escoPrimary)
`}</Code>
  );
}

/* ---- accessibility -------------------------------------------------------- */

function A11yKeyboard() {
  return (
    <Table
      head={["Key", "Action"]}
      rows={[
        ["Tab", "Moves focus to the next checkbox. Each box is its own tab stop"],
        ["Space", "Checks or unchecks the focused box"],
      ]}
    />
  );
}

function A11yNames() {
  return (
    <div className="prose">
      <ul className="dodont">
        <Do>Use a native checkbox. It announces checked, unchecked, and mixed for free.</Do>
        <Do>Wrap the box and its text in one label, so the text is the accessible name and the click target.</Do>
        <Do>Give label-less table boxes a unique name: Select WO-2418, Select all rows on this page.</Do>
        <Do>Group related boxes in a fieldset whose legend says what the group is.</Do>
        <Do>When Export enters selection mode, move focus to the first row checkbox.</Do>
        <Dont>Draw a checkbox from a div or icon, or name every row box just Select.</Dont>
      </ul>
    </div>
  );
}

function A11yContrast() {
  return (
    <Table
      head={["Pair", "Ratio", "Requirement"]}
      rows={[
        [<><T>--primary</T> checked fill on white</>, "9.6:1", "3:1 non-text"],
        [<><T>--fg-2</T> label on white</>, "8.4:1", "4.5:1 text"],
        ["Unchecked box edge", "Drawn by the browser", "Check it in each supported browser"],
        ["Focus ring on white", "9.6:1", "3:1 non-text"],
      ]}
    />
  );
}

export const checkbox: ComponentContent = {
  lead: "Turns an independent option on or off, or picks several rows. Hidden at rest when selection exists only to export.",
  art: CheckboxArt,
  usage: [
    { id: "overview", title: "Overview", body: <Overview /> },
    { id: "when-to-use", title: "When to use", body: <WhenToUse /> },
    { id: "anatomy", title: "Anatomy", body: <Anatomy /> },
    { id: "variants", title: "Variants", body: <Variants /> },
    { id: "contextual-selection", title: "Selection for export", body: <ContextualSelection /> },
    { id: "behavior", title: "Behavior and states", body: <Behavior /> },
    {
      id: "related",
      title: "Related",
      body: <p className="prose-p">Radio button for one of a few options; Switch for mobile on or off settings; Table for registers; Export for the full export flow.</p>,
      more: { href: "/patterns/export", label: "Export pattern" },
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
