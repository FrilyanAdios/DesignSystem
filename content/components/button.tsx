import { Example } from "@/components/demo/Example";
import { Ic } from "@/components/demo/Ic";
import { SpecSheet } from "@/components/demo/SpecSheet";
import { ScreenWidths, WEB_SCREENS } from "@/components/demo/ScreenWidths";
import { ButtonArt } from "@/components/art/button";
import { Code, Do, Dont, T, Table } from "../dev-kit";
import type { ComponentContent } from "./types";

/* ---------------------------------------------------------------------------
   Button — reference page for every component page:
   - Examples render real product markup inside <Example>, styled by
     NPD-FSM/styles.css (see components/demo/ProductDemo.tsx).
   - Facts come from DESIGN_SYSTEM.md › Buttons and styles.css (.btn …).
   - Code tab: Web (HTML classes + React), Flutter, SwiftUI — matching the
     platform guides.
   --------------------------------------------------------------------------- */

const HTML_VARIANTS = `
<button type="button" class="btn btn-primary">Save schedule</button>
<button type="button" class="btn">Discard</button>
<button type="button" class="btn btn-ghost">Back to calendar</button>
<button type="button" class="btn btn-danger">Delete report</button>
<button type="button" class="btn btn-solid-danger">Cancel schedule</button>
`;

const HTML_SIZES = `
<button type="button" class="btn btn-sm">Export all</button>   <!-- 32 · card header, dense toolbar -->
<button type="button" class="btn btn-md">Table settings</button> <!-- 36 · toolbar alignment -->
<button type="button" class="btn">Apply filters</button>          <!-- 40 · default -->
`;

const HTML_ICON = `
<button type="button" class="btn btn-sm export-btn">
  <!-- ic('download', 14) -->
  <svg class="ic" width="14" height="14" viewBox="0 0 24 24">…</svg>
  Export all
</button>
`;

/* ---- usage ---------------------------------------------------------------- */

function Overview() {
  return (
    <div className="prose">
      <p>
        A button starts an action on the current page: save, apply, export, cancel. Its label says the result, starting
        with a verb. To go somewhere else, use a link or make the whole row the route.
      </p>
      <Example
        title="Action region"
        description="One primary, its alternative, and a quiet way back."
        layout="row"
        code={{ lang: "HTML", code: HTML_VARIANTS.split("\n").slice(0, 4).join("\n") }}
      >
        <button type="button" className="btn btn-ghost">
          Back to calendar
        </button>
        <span style={{ flex: 1 }} />
        <button type="button" className="btn">
          Discard
        </button>
        <button type="button" className="btn btn-primary">
          Save schedule
        </button>
      </Example>
    </div>
  );
}

function WhenToUse() {
  return (
    <div className="prose">
      <ul className="dodont">
        <Do>Use one filled primary per action region: the page header, a dialog footer, or a form step.</Do>
        <Do>Write labels as verb plus result: Save schedule, Apply filters, Export to Excel.</Do>
        <Do>Use the same word for the same intent everywhere: Update for changing an existing report.</Do>
        <Dont>Place two filled primaries side by side, or use a button as a link to another page.</Dont>
        <Dont>Put a button on every table row when the row has one destination. Make the row the route.</Dont>
      </ul>
    </div>
  );
}

function Anatomy() {
  return (
    <div className="prose">
      <Example title="Anatomy" description="Optional leading icon, label, optional trailing chevron for menus." layout="center">
        <button type="button" className="btn btn-sm export-btn">
          <Ic n="download" s={14} />
          Export all
        </button>
        <button type="button" className="btn">
          Entity
          <Ic n="down" s={14} />
        </button>
      </Example>
      <Table
        head={["Part", "Rule"]}
        rows={[
          ["Container", "Real <button type=\"button\">, 1px border, field radius"],
          ["Leading icon", "Optional. Shared icon at 14px, before the label"],
          ["Label", "Sentence case, verb first, 13.5px semibold (12.5px on small and medium)"],
          ["Trailing chevron", "Only when the button opens a menu or disclosure"],
        ]}
      />
    </div>
  );
}

function Variants() {
  return (
    <div className="prose">
      <div className="examples two">
        <Example title="Primary" description="The one main action in the region." code={{ lang: "HTML", code: `<button type="button" class="btn btn-primary">Save schedule</button>` }}>
          <button type="button" className="btn btn-primary">
            Save schedule
          </button>
        </Example>
        <Example title="Secondary" description="An alternative or supporting action." code={{ lang: "HTML", code: `<button type="button" class="btn">Discard</button>` }}>
          <button type="button" className="btn">
            Discard
          </button>
        </Example>
        <Example title="Tertiary" description="Back, cancel, or low emphasis." code={{ lang: "HTML", code: `<button type="button" class="btn btn-ghost">Back to calendar</button>` }}>
          <button type="button" className="btn btn-ghost">
            Back to calendar
          </button>
        </Example>
        <Example title="Destructive" description="Before confirmation. Opens the confirmation dialog." code={{ lang: "HTML", code: `<button type="button" class="btn btn-danger">Delete report</button>` }}>
          <button type="button" className="btn btn-danger">
            <Ic n="trash" s={14} />
            Delete report
          </button>
        </Example>
        <Example title="Confirmed destructive" description="Only the final action inside a confirmation dialog." code={{ lang: "HTML", code: `<button type="button" class="btn btn-solid-danger">Cancel schedule</button>` }}>
          <button type="button" className="btn btn-solid-danger">
            Cancel schedule
          </button>
        </Example>
        <Example title="With icon" description="Icon before the label, 14px." code={{ lang: "HTML", code: HTML_ICON }}>
          <button type="button" className="btn btn-sm export-btn">
            <Ic n="download" s={14} />
            Export all
          </button>
        </Example>
      </div>
    </div>
  );
}

function Sizes() {
  return (
    <div className="prose">
      <Example title="Sizes" layout="row" code={{ lang: "HTML", code: HTML_SIZES }}>
        <button type="button" className="btn btn-sm">
          Export all
        </button>
        <button type="button" className="btn btn-md">
          Table settings
        </button>
        <button type="button" className="btn">
          Apply filters
        </button>
      </Example>
      <Table
        head={["Size", "Class", "Height", "Use"]}
        rows={[
          ["Small", <T>.btn-sm</T>, "32", "Card header, dense toolbar"],
          ["Medium", <T>.btn-md</T>, "36", "Aligns with 36px toolbar controls"],
          ["Default", <T>.btn</T>, "40", "Forms, dialog footers, page header"],
        ]}
      />
    </div>
  );
}

function Behavior() {
  return (
    <div className="prose">
      <Example title="States" description="Rest, disabled, and loading. Hover, press, and focus are live: try them." layout="row">
        <button type="button" className="btn btn-primary">
          Rest
        </button>
        <button type="button" className="btn btn-primary" disabled>
          Disabled
        </button>
        <button type="button" className="btn btn-primary loading" aria-busy="true">
          Saving
        </button>
        <button type="button" className="btn loading" aria-busy="true">
          Loading
        </button>
      </Example>
      <ul className="dev-notes">
        <li>Hover darkens the primary or adds a quiet gray fill. Pressing moves the button down 1px.</li>
        <li>Focus shows the 2px primary ring with a 2px offset.</li>
        <li>Loading keeps the width and shows a spinner in place of the label. The label stays as the accessible name.</li>
        <li>A destructive button opens the confirmation workflow. It never acts straight away.</li>
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
        picture looks.
      </p>
      <SpecSheet title="Default size, primary and secondary" targets={[{ sel: ".btn-primary", name: "Primary button" }, { sel: ".btn:not(.btn-primary)", name: "Secondary button" }]}>
        <div style={{ display: "flex", gap: 16 }}>
          <button type="button" className="btn">
            Discard
          </button>
          <button type="button" className="btn btn-primary">
            Save schedule
          </button>
        </div>
      </SpecSheet>
      <SpecSheet title="Small size with icon" description="Card headers and dense toolbars." targets={[{ sel: ".btn-sm", name: "Small button with icon" }]}>
        <button type="button" className="btn btn-sm export-btn">
          <Ic n="download" s={14} />
          Export all
        </button>
      </SpecSheet>
      <SpecSheet title="Medium size" description="Lines up with 36 px toolbar controls." targets={[{ sel: ".btn-md", name: "Medium button" }]}>
        <button type="button" className="btn btn-md">
          Table settings
        </button>
      </SpecSheet>
      <SpecSheet title="Destructive" targets={[{ sel: ".btn-danger", name: "Destructive button" }, { sel: ".btn-solid-danger", name: "Confirmed destructive button" }]}>
        <div style={{ display: "flex", gap: 16 }}>
          <button type="button" className="btn btn-danger">
            <Ic n="trash" s={14} />
            Delete report
          </button>
          <button type="button" className="btn btn-solid-danger">
            Cancel schedule
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
        { screen: "desktop", width: WEB_SCREENS.desktop, same: true },
        { screen: "laptop", width: WEB_SCREENS.laptop, same: true },
        { screen: "tablet", width: WEB_SCREENS.tablet, change: "Toolbars below 780 px move optional buttons into the overflow menu. The primary action stays." },
        { screen: "phone", width: WEB_SCREENS.phone, change: "Touch targets grow to 44 px. Dialog footer buttons become 44 px tall." },
        { screen: "mobile-app", width: WEB_SCREENS.app, change: "48 tall on every button. The one primary sits in a fixed bottom bar; record actions are outlined and full width." },
      ]}
    />
  );
}


function StyleColor() {
  return (
    <Table
      head={["Variant", "Background", "Border", "Text", "Hover"]}
      rows={[
        ["Primary", <T>--primary</T>, <T>--primary</T>, "#FFFFFF", <T>--primary-700</T>],
        ["Secondary", "#FFFFFF", <T>--border</T>, <T>--fg</T>, <><T>--muted</T>, border <T>--border-hover</T></>],
        ["Tertiary", "transparent", "transparent", <T>--fg-2</T>, <T>--muted</T>],
        ["Destructive", "#FFFFFF", <T>--error-line</T>, <T>--error</T>, <T>--error-bg</T>],
        ["Confirmed destructive", <T>--error</T>, <T>--error</T>, "#FFFFFF", <T>--error-700</T>],
      ]}
    />
  );
}

function StyleSpec() {
  return (
    <Table
      head={["Property", "Default", "Medium", "Small"]}
      rows={[
        ["Height", <><T>--h-lg</T> 40</>, <><T>--h-md</T> 36</>, <><T>--h-sm</T> 32</>],
        ["Horizontal padding", <><T>--sp-4</T> 16</>, "14", <><T>--sp-3</T> 12</>],
        ["Radius", <><T>--radius-field</T> 8</>, <><T>--radius-control</T> 6</>, <><T>--radius-control</T> 6</>],
        ["Label", <><T>--fs-body</T> 13.5 · 600</>, <><T>--fs-sub</T> 12.5 · 600</>, <><T>--fs-sub</T> 12.5 · 600</>],
        ["Icon gap", <><T>--sp-2</T> 8</>, "8", "6"],
        ["Icon size", "14", "14", "14"],
        ["Transition", "120ms", "120ms", "120ms"],
      ]}
    />
  );
}

/* ---- code ----------------------------------------------------------------- */

function CodeWeb() {
  return (
    <div className="prose">
      <Code title="HTML" lang="html">{HTML_VARIANTS + HTML_SIZES}</Code>
      <Code title="React" lang="tsx">{`
import { Button, IconButton } from "@/components/ui/Button";

<Button variant="primary" onClick={save}>Save schedule</Button>
<Button size="sm" icon={<Ic n="download" s={14} />}>Export all</Button>
<Button variant="primary" loading={saving}>Save schedule</Button>
`}</Code>
      <Table
        head={["Prop", "Type", "Default"]}
        rows={[
          [<T>variant</T>, <T>"primary" | "secondary" | "ghost" | "danger" | "solid-danger"</T>, <T>"secondary"</T>],
          [<T>size</T>, <T>"sm" | "md" | "lg"</T>, <T>"lg"</T>],
          [<T>icon</T>, <T>ReactNode</T>, "—"],
          [<T>loading</T>, <T>boolean</T>, <T>false</T>],
          [<T>type</T>, <T>"button" | "submit"</T>, <T>"button"</T>],
        ]}
      />
    </div>
  );
}

function CodeFlutter() {
  return (
    <Code title="Flutter" lang="dart">{`
FilledButton(onPressed: save, child: const Text('Save schedule'));      // primary
OutlinedButton(onPressed: open, child: const Text('Open report'));      // secondary, record action
TextButton(onPressed: back, child: const Text('Back'));                 // tertiary
FilledButton(
  style: FilledButton.styleFrom(
    backgroundColor: Theme.of(context).colorScheme.error,
    foregroundColor: Theme.of(context).colorScheme.onError,
  ),
  onPressed: confirmCancel,
  child: const Text('Cancel schedule'),
);                                                                      // confirmed destructive
FilledButton.icon(onPressed: export, icon: const Icon(Icons.download, size: 18), label: const Text('Export'));
`}</Code>
  );
}

function CodeIos() {
  return (
    <Code title="SwiftUI" lang="swift">{`
Button("Save schedule", action: save)
    .buttonStyle(.borderedProminent)
    .controlSize(.large)
    .tint(.escoPrimary)

Button("Open report", action: open).buttonStyle(.bordered)          // secondary
Button("Back", action: back).buttonStyle(.borderless)               // tertiary
Button("Cancel schedule", role: .destructive, action: cancel)       // confirmed destructive
    .buttonStyle(.borderedProminent)
`}</Code>
  );
}

/* ---- accessibility -------------------------------------------------------- */

function A11yKeyboard() {
  return (
    <Table
      head={["Key", "Action"]}
      rows={[
        ["Tab", "Moves focus to the button"],
        ["Enter, Space", "Activates it"],
      ]}
    />
  );
}

function A11yNames() {
  return (
    <div className="prose">
      <ul className="dodont">
        <Do>Use a real button element. It brings focus, keyboard activation, and the button role for free.</Do>
        <Do>Let the visible label be the accessible name. Add <T>aria-label</T> only to icon-only buttons.</Do>
        <Do>Set <T>aria-busy="true"</T> while loading; keep the label in the DOM.</Do>
        <Do>Prefer leaving a button enabled and explaining what’s missing over disabling it without a reason.</Do>
        <Dont>Make a div or span clickable, or name two buttons the same when they do different things.</Dont>
      </ul>
    </div>
  );
}

function A11yContrast() {
  return (
    <Table
      head={["Pair", "Ratio", "Requirement"]}
      rows={[
        ["White on primary", "9.6:1", "4.5:1 text"],
        [<><T>--fg</T> on white</>, "11.5:1", "4.5:1 text"],
        [<><T>--border</T> edge on white</>, "Below 3:1", "Secondary is identified by its label and shape, not the border alone"],
        ["Focus ring on white", "9.6:1", "3:1 non-text"],
      ]}
    />
  );
}

export const button: ComponentContent = {
  lead: "Starts an action on the current page. Five variants, three sizes, one filled primary per action region.",
  art: ButtonArt,
  usage: [
    { id: "overview", title: "Overview", body: <Overview /> },
    { id: "when-to-use", title: "When to use", body: <WhenToUse /> },
    { id: "anatomy", title: "Anatomy", body: <Anatomy /> },
    { id: "variants", title: "Variants", body: <Variants /> },
    { id: "sizes", title: "Sizes", body: <Sizes /> },
    { id: "behavior", title: "Behavior and states", body: <Behavior /> },
    { id: "related", title: "Related", body: <p className="prose-p">Icon button for universal icon-only actions; Menu for a button that opens choices; Dialog for confirmation.</p>, more: { href: "/components/icon-button", label: "Icon button" } },
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
