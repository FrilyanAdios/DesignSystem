import { Example } from "@/components/demo/Example";
import { Code, Do, Dont, T, Table } from "../dev-kit";
import { ExportScopes, RadioRow } from "./radio.demo";
import { SpecSheet } from "@/components/demo/SpecSheet";
import { ScreenWidths, WEB_SCREENS } from "@/components/demo/ScreenWidths";
import { RadioArt } from "@/components/art/radio";
import type { ComponentContent } from "./types";

/* ---------------------------------------------------------------------------
   Radio button — facts from:
   - tr/tr-form.js + tr/tr.css › .trf-radio fieldset, .trf-rad option rows
     (Test Report form, e.g. "Noise level must not exceed")
   - wo/wo-list.js, export-dialog.js, bd/bd-export.js + wo/wo.css ›
     .wo-export-scopes radio cards ("Records to export")
   - styles.css › global focus reset (radios take the outline ring),
     input[disabled]
   - Mobile guide mapping: pick one = bottom sheet; two to four = segmented
   --------------------------------------------------------------------------- */

const HTML_ROW = `
<fieldset class="trf-radio">
  <legend>Noise level must not exceed</legend>
  <div class="trf-radio-row">
    <label class="trf-rad on"><input type="radio" name="noiseLimit" checked> 65 dBA</label>
    <label class="trf-rad"><input type="radio" name="noiseLimit"> 70 dBA</label>
  </div>
</fieldset>
`;

const HTML_CARDS = `
<fieldset class="wo-export-scopes">
  <legend class="field-label">Records to export</legend>
  <label class="card wo-export-scope">
    <input type="radio" name="exportScope" value="page">
    <span><b>Current page</b><small>20 records on this page</small></span>
  </label>
  <label class="card wo-export-scope">
    <input type="radio" name="exportScope" value="selected">
    <span><b>Selected rows</b><small>3 selected records</small></span>
  </label>
  <label class="card wo-export-scope">
    <input type="radio" name="exportScope" value="full" checked>
    <span><b>Full result</b><small>1,284 records matching filters</small></span>
  </label>
</fieldset>
`;

/* ---- usage ---------------------------------------------------------------- */

function Overview() {
  return (
    <div className="prose">
      <p>
        A radio group asks one question and takes exactly one answer from a short, visible set. The question is the
        legend; each answer is a label. A sensible default is checked from the start.
      </p>
      <Example
        title="Form question"
        description="A Test Report limit with two answers. Try the arrow keys."
        code={{ lang: "HTML", code: HTML_ROW }}
      >
        <RadioRow legend="Noise level must not exceed" options={["65 dBA", "70 dBA"]} />
      </Example>
    </div>
  );
}

function WhenToUse() {
  return (
    <div className="prose">
      <ul className="dodont">
        <Do>Use a radio group when exactly one of a few options must be chosen, and all should be seen at once.</Do>
        <Do>Use checkboxes when several options can be on together.</Do>
        <Do>Use a switch on mobile for a single on or off setting. Use a select for long lists.</Do>
        <Do>Use a segmented control for a view mode, not a radio group.</Do>
        <Dont>Use a single radio on its own. It cannot be unchecked; use a checkbox.</Dont>
        <Dont>Run an action or navigate when a radio is picked. A radio records a choice.</Dont>
      </ul>
    </div>
  );
}

function Anatomy() {
  return (
    <div className="prose">
      <Example title="Anatomy" description="Legend, then option rows, each with a native radio and its label." layout="center">
        <RadioRow legend="Light intensity (IEST-RP-CC002) more than" options={["480 lux", "750 lux"]} />
      </Example>
      <Table
        head={["Part", "Rule"]}
        rows={[
          ["Group", <>A <T>fieldset</T>, so the question is announced with its options</>],
          ["Legend", "The question, in sentence case, above the options"],
          ["Radio", <>Native <T>{'<input type="radio">'}</T>, 16px, one shared <T>name</T> per group</>],
          ["Option label", "Short answer after the radio. The whole row is the target"],
          ["Help line", "Optional. A count or a hint under the answer, in option cards"],
        ]}
      />
    </div>
  );
}

function Variants() {
  return (
    <div className="prose">
      <div className="examples two">
        <Example title="Option row" description="Short answers side by side, in a form." code={{ lang: "HTML", code: HTML_ROW }}>
          <RadioRow legend="Noise level must not exceed" options={["65 dBA", "70 dBA"]} />
        </Example>
        <Example title="Disabled group" description="The whole fieldset is disabled; options drop to 50% opacity.">
          <RadioRow legend="Light intensity (IEST-RP-CC002) more than" options={["480 lux", "750 lux"]} disabled />
        </Example>
      </div>
      <Example
        title="Option cards"
        description="Answers that need a second line, like the export scope with its record count."
        layout="none"
        code={{ lang: "HTML", code: HTML_CARDS }}
      >
        <ExportScopes />
      </Example>
    </div>
  );
}

function Behavior() {
  return (
    <div className="prose">
      <ul className="dev-notes">
        <li>The checked option takes a pastel fill and primary text, so selection reads without the dot alone.</li>
        <li>Hover adds a quiet gray fill. Option cards keep the primary border while checked.</li>
        <li>Keyboard focus uses the global 2px primary outline with a 2px offset. Radios never take the inset field ring.</li>
        <li>Disabled drops the radio to 50% opacity and removes pointer interaction.</li>
        <li>Picking an option changes the draft only. The dialog or form action applies it.</li>
        <li>Option cards stack to one column at 600px and below.</li>
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
        picture looks. The radio itself is drawn by the browser as a 16 × 16 circle.
      </p>
      <SpecSheet
        title="Option row"
        description="Test Report form. A rounded rectangle with an 8 px corner, not a pill."
        targets={[
          { sel: ".trf-rad.on", name: "Option row, chosen" },
          { sel: ".trf-rad:not(.on)", name: "Option row, not chosen", marks: true },
        ]}
      >
        <RadioRow legend="Noise level must not exceed" options={["65 dBA", "70 dBA"]} />
      </SpecSheet>
      <SpecSheet
        title="Option card"
        description="Export dialog. Each card fills its column; three columns side by side."
        scale={1}
        targets={[
          { sel: ".wo-export-scope:has(:checked)", name: "Option card, chosen", width: "fill" },
          { sel: ".wo-export-scope:not(:has(:checked))", name: "Option card, not chosen", width: "fill", marks: false },
        ]}
      >
        <div style={{ width: 640 }}>
          <ExportScopes />
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
        { screen: "phone", width: WEB_SCREENS.phone, change: "Option cards stack into one column at 600 px and below. Option rows wrap onto a new line when they run out of room." },
        { screen: "mobile-app", width: WEB_SCREENS.app, change: "Two to four short options use a segmented control. A longer pick-one list opens in a bottom sheet." },
      ]}
    />
  );
}

function StyleColor() {
  return (
    <Table
      head={["Element", "Rest", "Hover", "Checked"]}
      rows={[
        ["Option row background", "#FFFFFF", <T>--muted</T>, <T>--primary-50</T>],
        ["Option row border", <T>--border</T>, <T>--border</T>, <T>--primary-100</T>],
        ["Option row text", <T>--fg-2</T>, <T>--fg-2</T>, <><T>--primary</T>, 600</>],
        ["Radio dot", "—", "—", <><T>--primary</T> via <T>accent-color</T></>],
        ["Option card background", "#FFFFFF", <T>--muted</T>, <T>--primary-50</T>],
        ["Option card border", <T>--border</T>, <T>--border</T>, <T>--primary</T>],
        ["Legend", <T>--fg-2</T>, "—", "—"],
      ]}
    />
  );
}

function StyleSpec() {
  return (
    <Table
      head={["Property", "Option row", "Option card"]}
      rows={[
        ["Height", <><T>--h-lg</T> 40</>, "Content"],
        ["Padding", "0 14 0 10", <><T>--sp-3</T> 12</>],
        ["Radio to label gap", "8", <><T>--sp-2</T> 8</>],
        ["Gap between options", "8", <><T>--sp-3</T> 12, three columns</>],
        ["Radius", <><T>--radius-field</T> 8</>, <><T>--radius-card</T> 10</>],
        ["Label", "13px; 600 when checked", <>Title; help line <T>--fs-help</T> 11.5</>],
        ["Radio", "16 × 16", "Native size"],
        ["Legend", <><T>--fs-label</T> 12 · 500, 8 below</>, <><T>--fs-card</T> 14 · 600, 8 below</>],
        ["Transition", "120ms", "—"],
      ]}
    />
  );
}

/* ---- code ----------------------------------------------------------------- */

function CodeWeb() {
  return (
    <div className="prose">
      <Code title="HTML" lang="html">{HTML_ROW + HTML_CARDS}</Code>
      <Code title="React" lang="tsx">{`
import { RadioGroup } from "@/components/ui/RadioGroup";

<RadioGroup
  legend="Noise level must not exceed"
  value={noiseLimit}
  onChange={setNoiseLimit}
  options={[
    { value: "65", label: "65 dBA" },
    { value: "70", label: "70 dBA" },
  ]}
/>

<RadioGroup
  variant="card"
  legend="Records to export"
  value={scope}
  onChange={setScope}
  options={[
    { value: "page", label: "Current page", help: \`\${page.length} records on this page\` },
    { value: "selected", label: "Selected rows", help: \`\${selected.length} selected records\` },
    { value: "full", label: "Full result", help: \`\${full.length} records matching filters\` },
  ]}
/>
`}</Code>
      <Table
        head={["Prop", "Type", "Default"]}
        rows={[
          [<T>legend</T>, <T>string</T>, "— (required)"],
          [<T>value</T>, <T>string</T>, "— (one option is always checked)"],
          [<T>onChange</T>, <T>(value: string) =&gt; void</T>, "—"],
          [<T>options</T>, <T>{"{ value; label; help? }[]"}</T>, "—"],
          [<T>variant</T>, <T>"row" | "card"</T>, <T>"row"</T>],
          [<T>disabled</T>, <T>boolean</T>, <T>false</T>],
        ]}
      />
      <ul className="dev-notes">
        <li>Render native inputs that share one <T>name</T> inside a <T>fieldset</T>. The browser handles arrow keys and the single tab stop.</li>
      </ul>
    </div>
  );
}

function CodeFlutter() {
  return (
    <Code title="Flutter" lang="dart">{`
// a short, visible choice inside a form or sheet
RadioGroup<String>(
  groupValue: scope,
  onChanged: (v) => setState(() => scope = v!),
  child: Column(children: const [
    RadioListTile(value: 'page', title: Text('Current page')),
    RadioListTile(value: 'selected', title: Text('Selected rows')),
    RadioListTile(value: 'full', title: Text('Full result')),
  ]),
);

// two to four view options: SegmentedButton. A longer pick-one list: a bottom sheet.
`}</Code>
  );
}

function CodeIos() {
  return (
    <Code title="SwiftUI" lang="swift">{`
// iOS has no radio button. An inline picker shows the choice with a checkmark.
Form {
    Picker("Records to export", selection: $scope) {
        Text("Current page").tag(Scope.page)
        Text("Selected rows").tag(Scope.selected)
        Text("Full result").tag(Scope.full)
    }
    .pickerStyle(.inline)
}
.tint(.escoPrimary)

// two to four options: .pickerStyle(.segmented)
`}</Code>
  );
}

/* ---- accessibility -------------------------------------------------------- */

function A11yKeyboard() {
  return (
    <Table
      head={["Key", "Action"]}
      rows={[
        ["Tab", "Moves focus into the group, onto the checked radio. The group is one tab stop"],
        ["Arrow keys", "Move to the next or previous option and check it"],
        ["Space", "Checks the focused radio when none is checked yet"],
      ]}
    />
  );
}

function A11yNames() {
  return (
    <div className="prose">
      <ul className="dodont">
        <Do>Put the group in a fieldset whose legend is the question. It is read before the first option.</Do>
        <Do>Use native radios that share a name. Position, count, and checked state are announced for free.</Do>
        <Do>Keep each label short and unique within its group.</Do>
        <Dont>
          Draw a radio from a span inside a plain button. If a custom control is unavoidable, it needs{" "}
          <T>role="radio"</T>, <T>aria-checked</T>, a <T>radiogroup</T> parent, and arrow-key handling.
        </Dont>
      </ul>
    </div>
  );
}

function A11yContrast() {
  return (
    <Table
      head={["Pair", "Ratio", "Requirement"]}
      rows={[
        [<><T>--primary</T> checked text on <T>--primary-50</T></>, "8.4:1", "4.5:1 text"],
        [<><T>--fg-2</T> option text on white</>, "8.4:1", "4.5:1 text"],
        [<><T>--primary</T> card border on white</>, "9.6:1", "3:1 non-text"],
        [<><T>--border</T> option edge on white</>, "Below 3:1", "Options are identified by the radio and label, not the edge"],
        ["Focus ring on white", "9.6:1", "3:1 non-text"],
      ]}
    />
  );
}

export const radio: ComponentContent = {
  lead: "Takes exactly one answer from a short, visible set. One question per group, one tab stop, arrows to choose.",
  art: RadioArt,
  usage: [
    { id: "overview", title: "Overview", body: <Overview /> },
    { id: "when-to-use", title: "When to use", body: <WhenToUse /> },
    { id: "anatomy", title: "Anatomy", body: <Anatomy /> },
    { id: "variants", title: "Variants", body: <Variants /> },
    { id: "behavior", title: "Behavior and states", body: <Behavior /> },
    {
      id: "related",
      title: "Related",
      body: <p className="prose-p">Checkbox for several answers; Segmented control for view modes; Select for long lists; Menu for a choice inside a popover.</p>,
      more: { href: "/components/segmented-control", label: "Segmented control" },
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
