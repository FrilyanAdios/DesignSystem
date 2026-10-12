import { Example } from "@/components/demo/Example";
import { Ic } from "@/components/demo/Ic";
import { ScreenWidths, WEB_SCREENS } from "@/components/demo/ScreenWidths";
import { SpecSheet } from "@/components/demo/SpecSheet";
import { TooltipArt } from "@/components/art/tooltip";
import { Code, Do, Dont, T, Table } from "../dev-kit";
import { Tip } from "./tooltip.demo";
import type { ComponentContent } from "./types";

/* ---------------------------------------------------------------------------
   Tooltip — the hover and focus tip on icon-only controls.
   Facts: DESIGN_SYSTEM.md (principles, table toolbar, report header),
   .claude/skills/fsm-design/references/ux-rules.md › Discoverability,
   NPD-FSM/script.js (TIP_SEL, queueTip, showTip, hideTip; data-tip anchors),
   styles.css (.tip-pop, #tipHost, .tip).
   --------------------------------------------------------------------------- */

const HTML_ANCHOR = `
<!-- an anchor opts in with BOTH .tip and data-tip -->
<button class="sp-icn sm tip" data-tip="Open full day agenda" aria-label="Open full day agenda">
  <!-- ic('report',15) -->
</button>

<!-- one host at the end of <body>; showTip() renders the bubble here -->
<div id="tipHost"></div>
<!-- <div class="tip-pop on" style="left:…px;top:…px">Open full day agenda</div> -->
`;

const HTML_DESCRIBED = `
<button type="button" class="ssp-info tip" aria-label="About On-Key Service Schedule Search"
        aria-describedby="ssp-tip"
        data-tip="On-Key Service Schedule Search (Account Name, PO#, SVSO#, Location and Service abbreviation)">i</button>
<div id="ssp-tip" role="tooltip" class="tip-pop">On-Key Service Schedule Search (Account Name, PO#, SVSO#, Location and Service abbreviation)</div>
`;

const HTML_LABELED = `
<button type="button" class="btn btn-sm tb-today tip" data-tip="Jump back to today" aria-label="Jump back to today">Today</button>
`;

/* ---- usage ---------------------------------------------------------------- */

function Overview() {
  return (
    <div className="prose">
      <p>
        A tooltip names the result of an icon-only control when the pointer rests on it or the control gets focus. It
        reinforces what the screen already shows. It is never the only way to learn what a control does.
      </p>
      <Example
        title="Icon-only controls"
        description="Live. Rest the pointer for under half a second, or tab to a button."
        layout="row"
        minHeight={140}
        code={{ lang: "HTML", code: HTML_ANCHOR }}
      >
        <Tip tip="Collapse engineer panel">
          <button type="button" className="sp-icn sm" aria-label="Collapse engineer panel">
            <Ic n="cleft" s={14} />
          </button>
        </Tip>
        <Tip tip="Open full day agenda">
          <button type="button" className="sp-icn sm" aria-label="Open full day agenda">
            <Ic n="report" s={15} />
          </button>
        </Tip>
        <Tip tip="Manage schedule">
          <button type="button" className="sp-icn sm" aria-label="Manage schedule">
            <Ic n="more" s={15} />
          </button>
        </Tip>
      </Example>
    </div>
  );
}

function WhenToUse() {
  return (
    <div className="prose">
      <ul className="dodont">
        <Do>Give every icon-only control a tooltip that says the result of pressing it: "Open full day agenda".</Do>
        <Do>Use icon-only only for universally understood actions, such as open, download, print, refresh, close.</Do>
        <Do>Use a tip to add detail to a visible label, like the full search scope behind an info button.</Do>
        <Dont>Hide the only instruction, a required value, or an error in a tooltip. Touch users never see it.</Dont>
        <Dont>Put links, buttons, or anything to select inside a tooltip. Use a popover.</Dont>
      </ul>
    </div>
  );
}

function Anatomy() {
  return (
    <div className="prose">
      <Example title="Anatomy" description="Anchor, then the bubble below it on the ink surface." layout="center" minHeight={150}>
        <Tip tip="Open full day agenda" open>
          <button type="button" className="sp-icn sm" aria-label="Open full day agenda">
            <Ic n="report" s={15} />
          </button>
        </Tip>
      </Example>
      <Table
        head={["Part", "Rule"]}
        rows={[
          ["Anchor", "The control. Opts in with both the .tip class and a data-tip attribute"],
          ["Bubble", ".tip-pop, rendered into one fixed #tipHost layer so no card or cell can clip it"],
          ["Text", "Sentence case. The result of activating the control. Line breaks in data-tip are kept"],
          ["Placement", "Centered below the anchor, 8px away. Flips above when there is no room; stays 8px inside the window"],
        ]}
      />
    </div>
  );
}

function Variants() {
  return (
    <div className="prose">
      <div className="examples two">
        <Example title="Icon button" description="The tip repeats the accessible name." layout="center" minHeight={140} code={{ lang: "HTML", code: HTML_ANCHOR.split("\n").slice(0, 5).join("\n") }}>
          <Tip tip="Manage schedule" open>
            <button type="button" className="sp-icn sm" aria-label="Manage schedule">
              <Ic n="more" s={15} />
            </button>
          </Tip>
        </Example>
        <Example title="Labeled button" description="A tip can expand a short label." layout="center" minHeight={140} code={{ lang: "HTML", code: HTML_LABELED }}>
          <Tip tip="Jump back to today" open>
            <button type="button" className="btn btn-sm tb-today" aria-label="Jump back to today">
              Today
            </button>
          </Tip>
        </Example>
        <Example title="Extra detail" description="The tip adds to the name, so it is linked as a description." layout="center" minHeight={170} code={{ lang: "HTML", code: HTML_DESCRIBED }}>
          <Tip tip="On-Key Service Schedule Search (Account Name, PO#, SVSO#, Location and Service abbreviation)" describes open>
            <button type="button" className="ssp-info" aria-label="About On-Key Service Schedule Search">
              i
            </button>
          </Tip>
        </Example>
        <Example title="Action bar" description="Icon-only actions in a bar still get tips." layout="center" minHeight={140}>
          <Tip tip="Select notifications" open>
            <button type="button" className="notif-act icon ghost" aria-label="Select notifications">
              <Ic n="checkmini" s={15} />
            </button>
          </Tip>
        </Example>
      </div>
    </div>
  );
}

function Behavior() {
  return (
    <div className="prose">
      <ul className="dev-notes">
        <li>Hover: the tip appears after the pointer rests 420ms on one anchor, so sweeping across a grid does not flash tips.</li>
        <li>Focus: the tip appears at once. The user landed there on purpose.</li>
        <li>It fades in over 100ms. It hides on pointer down, click, scroll, blur, or when the pointer leaves the anchor.</li>
        <li>Only one tip shows at a time. Nested anchors resolve to the innermost one.</li>
        <li>The bubble ignores the pointer, so it never blocks what is under it.</li>
        <li>Opening a menu from an anchor hides its tip first.</li>
        <li>Escape is not handled by the prototype yet. Add it: a tip that appears on hover or focus must be dismissible.</li>
        <li>Touch has no hover. On touch screens the meaning must already be on screen; the tip adds nothing there.</li>
      </ul>
    </div>
  );
}

/* ---- style ---------------------------------------------------------------- */

function StyleColor() {
  return (
    <Table
      head={["Element", "Token"]}
      rows={[
        ["Bubble", <T>--ink</T>],
        ["Text", "#FFFFFF"],
        ["Shadow", <T>--shadow-lg</T>],
      ]}
    />
  );
}

function StyleSpec() {
  return (
    <Table
      head={["Property", "Value"]}
      rows={[
        ["Padding", "9 12"],
        ["Radius", <><T>--radius-field</T> 8</>],
        ["Text", "11.5, line height 1.6, line breaks kept"],
        ["Max width", "270"],
        ["Offset from anchor", "8, and at least 8 from the window edge"],
        ["Hover delay", "420ms"],
        ["Fade", "100ms opacity"],
        ["Layer", "#tipHost, fixed, z-index 95"],
      ]}
    />
  );
}

function Measurements() {
  return (
    <div className="prose">
      <p>
        Every number below is read from the product stylesheet, not typed by hand. Build to these numbers, not to how the
        picture looks.
      </p>
      <SpecSheet
        title="Tooltip bubble"
        description="Centered 8 px below its icon button. It wraps at 270 px."
        targets={[
          { sel: ".tip-pop", name: "Tooltip bubble" },
          { sel: ".sp-icn", name: "Icon button", width: "fixed", marks: false },
        ]}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <button type="button" className="sp-icn sm" aria-label="Open full day agenda">
            <Ic n="report" s={15} />
          </button>
          <div className="tip-pop on" role="tooltip" style={{ position: "static" }}>
            Open full day agenda
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
        { screen: "desktop", width: WEB_SCREENS.desktop, change: "Appears after 420 ms of hover, or at once on focus. Centered below the control; flips above when there is no room." },
        { screen: "laptop", width: WEB_SCREENS.laptop, same: true },
        { screen: "tablet", width: WEB_SCREENS.tablet, same: true },
        { screen: "phone", width: WEB_SCREENS.phone, change: "Touch has no hover, so the meaning must already be on screen. The bubble stays at least 8 px inside the window." },
        { screen: "mobile-app", width: WEB_SCREENS.app, change: "The mobile prototype has no tooltips. Controls carry a visible label or an accessible name." },
      ]}
    />
  );
}

/* ---- code ----------------------------------------------------------------- */

function CodeWeb() {
  return (
    <div className="prose">
      <Code title="HTML" lang="html">{HTML_ANCHOR + HTML_DESCRIBED}</Code>
      <Code title="React" lang="tsx">{`
import { Tooltip } from "@/components/ui/Tooltip";
import { IconButton } from "@/components/ui/Button";

// The tip repeats the name: aria-label is enough.
<Tooltip content="Open full day agenda">
  <IconButton aria-label="Open full day agenda" icon={<Ic n="report" s={15} />} onClick={openAgenda} />
</Tooltip>

// The tip adds detail: link it with aria-describedby.
<Tooltip content="On-Key Service Schedule Search (Account Name, PO#, SVSO#, Location and Service abbreviation)" describes>
  <button type="button" className="ssp-info" aria-label="About On-Key Service Schedule Search">i</button>
</Tooltip>
`}</Code>
      <Table
        head={["Prop", "Type", "Default"]}
        rows={[
          [<T>content</T>, <T>string</T>, "—"],
          [<T>describes</T>, <T>boolean</T>, <T>false</T>],
          [<T>delay</T>, <T>number</T>, <T>420</T>],
        ]}
      />
    </div>
  );
}

function CodeFlutter() {
  return (
    <Code title="Flutter" lang="dart">{`
// Material 3: IconButton.tooltip shows on long press and sets the semantic label.
IconButton(
  icon: const Icon(Icons.more_horiz),
  tooltip: 'Manage schedule',
  onPressed: openScheduleMenu,
);

// Any other widget
Tooltip(
  message: 'Jump back to today',
  child: TextButton(onPressed: goToday, child: const Text('Today')),
);
`}</Code>
  );
}

function CodeIos() {
  return (
    <Code title="SwiftUI" lang="swift">{`
Button(action: openScheduleMenu) { Image(systemName: "ellipsis") }
    .accessibilityLabel("Manage schedule")
    .help("Manage schedule")   // pointer hover on iPad and Mac

// Touch has no hover: the label carries the meaning, .help only reinforces it.
`}</Code>
  );
}

/* ---- accessibility -------------------------------------------------------- */

function A11yKeyboard() {
  return (
    <Table
      head={["Key", "Action"]}
      rows={[
        ["Tab", "Focusing the anchor shows its tip at once"],
        ["Shift + Tab", "Moving focus away hides it"],
        ["Escape", "Should hide the tip and keep focus on the anchor. Not yet in the prototype"],
      ]}
    />
  );
}

function A11yNames() {
  return (
    <div className="prose">
      <ul className="dodont">
        <Do>Give every icon-only control a unique <T>aria-label</T>. The tooltip does not replace it.</Do>
        <Do>When the tip only repeats the name, rely on <T>aria-label</T>. Don&apos;t also link the tip, or it is read twice.</Do>
        <Do>When the tip adds detail, give it <T>role="tooltip"</T> and an id, and point to it with <T>aria-describedby</T>.</Do>
        <Do>Show the tip on keyboard focus, not only on hover.</Do>
        <Dont>Use the native <T>title</T> attribute as the only name. It is not shown on focus or touch, and screen readers treat it inconsistently.</Dont>
      </ul>
    </div>
  );
}

function A11yContrast() {
  return (
    <Table
      head={["Pair", "Ratio", "Requirement"]}
      rows={[
        [<>White on <T>--ink</T></>, "16.6:1", "4.5:1 text"],
        ["Anchor focus ring", "2px primary, 9.6:1 on white", "3:1 non-text"],
      ]}
    />
  );
}

export const tooltip: ComponentContent = {
  lead: "Names the result of an icon-only control on hover or focus. It reinforces the screen; it is never the only instruction.",
  art: TooltipArt,
  usage: [
    { id: "overview", title: "Overview", body: <Overview /> },
    { id: "when-to-use", title: "When to use", body: <WhenToUse /> },
    { id: "anatomy", title: "Anatomy", body: <Anatomy /> },
    { id: "variants", title: "Variants", body: <Variants /> },
    { id: "behavior", title: "Behavior and states", body: <Behavior /> },
    { id: "related", title: "Related", body: <p className="prose-p">Icon button for the controls that need tips; Popover for content the user can act on.</p>, more: { href: "/components/icon-button", label: "Icon button" } },
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
