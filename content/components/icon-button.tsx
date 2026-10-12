import { Example } from "@/components/demo/Example";
import { Ic } from "@/components/demo/Ic";
import { SpecSheet } from "@/components/demo/SpecSheet";
import { ScreenWidths, WEB_SCREENS } from "@/components/demo/ScreenWidths";
import { IconButtonArt } from "@/components/art/icon-button";
import { Code, Do, Dont, T, Table } from "../dev-kit";
import type { ComponentContent } from "./types";

/* ---------------------------------------------------------------------------
   Icon button — facts from DESIGN_SYSTEM.md › Buttons (Icon only row), the
   modal close rule, and styles.css (.icon-btn, .icon-btn.sm, .icon-btn.lg, the
   register toolbar override). Real labels come from sr/, bd/, dr/ and script.js.
   --------------------------------------------------------------------------- */

const HTML_DEFAULT = `
<button type="button" class="icon-btn" title="Table settings — columns, sort and page size" aria-label="Table settings">
  <!-- ic('gear', 16) -->
  <svg class="ic" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">…</svg>
</button>
`;

const HTML_SIZES = `
<button type="button" class="icon-btn sm" aria-label="Previous day with schedules">…</button> <!-- 32 -->
<button type="button" class="icon-btn" aria-label="Close dialog">…</button>                  <!-- 36 · default -->
<button type="button" class="icon-btn lg" aria-label="Table settings">…</button>             <!-- 40 -->
`;

const HTML_DANGER = `
<button type="button" class="icon-btn btn-danger" title="Delete breakdown log" aria-label="Delete breakdown log">
  <!-- ic('trash', 15) -->
</button>
`;

const HTML_RECORD = `
<button type="button" class="icon-btn" title="Edit this breakdown log" aria-label="Edit this breakdown log"><!-- ic('edit', 15) --></button>
<button type="button" class="icon-btn" title="Email the requestor" aria-label="Email the requestor"><!-- ic('mail', 15) --></button>
<button type="button" class="icon-btn btn-danger" title="Delete breakdown log" aria-label="Delete breakdown log"><!-- ic('trash', 15) --></button>
`;

/* ---- usage ---------------------------------------------------------------- */

function Overview() {
  return (
    <div className="prose">
      <p>
        An icon button runs a universal action with an icon and no visible label: close, settings, edit, move up. The
        icon must be one people already know. The accessible name is mandatory.
      </p>
      <Example
        title="Register toolbar"
        description="Export all with its label, then table settings as an icon button."
        layout="row"
        code={{ lang: "HTML", code: HTML_DEFAULT }}
      >
        <button type="button" className="btn btn-sm export-btn">
          <Ic n="download" s={14} />
          Export all
        </button>
        <button type="button" className="icon-btn" title="Table settings — columns, sort and page size" aria-label="Table settings">
          <Ic n="gear" s={16} />
        </button>
      </Example>
    </div>
  );
}

function WhenToUse() {
  return (
    <div className="prose">
      <ul className="dodont">
        <Do>Use it for universal actions with a well-known icon: close, settings, edit, delete, move up or down.</Do>
        <Do>Give every icon button an <T>aria-label</T> and a matching <T>title</T> tooltip.</Do>
        <Do>Name the target in the label when there are several on a page: Move Serial number up, Remove item 2.</Do>
        <Dont>Use an icon button for an action people need to read, like Export all or Create service report. Use a labelled button.</Dont>
        <Dont>Use a decorative or ambiguous icon, or mix icon styles. Use the shared icon set.</Dont>
      </ul>
    </div>
  );
}

function Anatomy() {
  return (
    <div className="prose">
      <Example title="Anatomy" description="A square container with one centered icon." layout="center">
        <button type="button" className="icon-btn" aria-label="Close dialog" title="Close dialog">
          <Ic n="x" s={16} />
        </button>
      </Example>
      <Table
        head={["Part", "Rule"]}
        rows={[
          ["Container", "Real <button type=\"button\">, square, 1px border, white fill"],
          ["Icon", "One shared icon, centered. 14 to 16px in most places; never a filled or emoji icon"],
          ["Accessible name", <><T>aria-label</T>, required. Use the same text in <T>title</T> for the tooltip</>],
        ]}
      />
    </div>
  );
}

function Variants() {
  return (
    <div className="prose">
      <div className="examples two">
        <Example title="Default" description="Settings, close, edit, and other universal actions." code={{ lang: "HTML", code: HTML_DEFAULT }}>
          <button type="button" className="icon-btn" title="Table settings — columns, sort and page size" aria-label="Table settings">
            <Ic n="gear" s={16} />
          </button>
        </Example>
        <Example title="Destructive" description="Add the danger class. It opens the confirmation dialog." code={{ lang: "HTML", code: HTML_DANGER }}>
          <button type="button" className="icon-btn btn-danger" title="Delete breakdown log" aria-label="Delete breakdown log">
            <Ic n="trash" s={15} />
          </button>
        </Example>
      </div>
      <Example
        title="Record actions"
        description="A record header groups a few icon buttons. Each has its own name."
        layout="row"
        code={{ lang: "HTML", code: HTML_RECORD }}
      >
        <button type="button" className="icon-btn" title="Edit this breakdown log" aria-label="Edit this breakdown log">
          <Ic n="edit" s={15} />
        </button>
        <button type="button" className="icon-btn" title="Email the requestor" aria-label="Email the requestor">
          <Ic n="mail" s={15} />
        </button>
        <button type="button" className="icon-btn btn-danger" title="Delete breakdown log" aria-label="Delete breakdown log">
          <Ic n="trash" s={15} />
        </button>
      </Example>
    </div>
  );
}

function Sizes() {
  return (
    <div className="prose">
      <Example title="Sizes" layout="row" code={{ lang: "HTML", code: HTML_SIZES }}>
        <button type="button" className="icon-btn sm" aria-label="Previous day with schedules" title="Previous day with schedules">
          <Ic n="cleft" s={14} />
        </button>
        <button type="button" className="icon-btn" aria-label="Close dialog" title="Close dialog">
          <Ic n="x" s={16} />
        </button>
        <button type="button" className="icon-btn lg" aria-label="Table settings" title="Table settings">
          <Ic n="gear" s={16} />
        </button>
      </Example>
      <Table
        head={["Size", "Class", "Size (px)", "Use"]}
        rows={[
          ["Small", <T>.icon-btn.sm</T>, "32 × 32", "Day steppers, compact popover headers"],
          ["Default", <T>.icon-btn</T>, "36 × 36", "Lines up with 36px toolbar controls; dialog close"],
          ["Large", <T>.icon-btn.lg</T>, "40 × 40", "Next to 40px fields"],
        ]}
      />
      <p className="prose-p">
        Inside register toolbars the icon button is always 36 × 36 with the field radius, so it lines up with the other
        toolbar controls.
      </p>
    </div>
  );
}

function Behavior() {
  return (
    <div className="prose">
      <Example title="States" description="Hover and focus are live: try them." layout="row">
        <button type="button" className="icon-btn" aria-label="Edit this breakdown log" title="Edit this breakdown log">
          <Ic n="edit" s={15} />
        </button>
        <button type="button" className="icon-btn" aria-label="Move Serial number up" title="Move Serial number up">
          <Ic n="up" s={14} />
        </button>
        <button type="button" className="icon-btn" aria-label="Move Serial number down" title="Move Serial number down">
          <Ic n="down" s={14} />
        </button>
      </Example>
      <ul className="dev-notes">
        <li>Hover adds the <T>--muted</T> fill, darkens the icon to <T>--fg</T>, and strengthens the border.</li>
        <li>Keyboard focus shows the 2px primary ring with a 2px offset, plus a quiet <T>--muted-2</T> fill.</li>
        <li>When an action is not available, like moving the first item up, set the <T>disabled</T> attribute.</li>
        <li>A destructive icon button opens the confirmation workflow. It never acts straight away.</li>
        <li>The close button is the last control on the right of a dialog header, 32 to 40px, named Close dialog.</li>
      </ul>
    </div>
  );
}

/* ---- style ---------------------------------------------------------------- */

function Measurements() {
  return (
    <div className="prose">
      <p>
        Every number below is read from the product stylesheet, not typed by hand. The icon button is a square with
        slightly rounded corners. It is never a circle.
      </p>
      <SpecSheet title="Default size" description="Settings, close, edit, and other universal actions." targets={[{ sel: ".icon-btn", name: "Icon button, default", width: "fixed" }]}>
        <button type="button" className="icon-btn" aria-label="Table settings" title="Table settings">
          <Ic n="gear" s={16} />
        </button>
      </SpecSheet>
      <SpecSheet title="Small size" description="Day steppers and compact popover headers." targets={[{ sel: ".icon-btn", name: "Icon button, small", width: "fixed" }]}>
        <button type="button" className="icon-btn sm" aria-label="Previous day with schedules" title="Previous day with schedules">
          <Ic n="cleft" s={14} />
        </button>
      </SpecSheet>
      <SpecSheet title="Large size" description="Next to 40 px fields." targets={[{ sel: ".icon-btn", name: "Icon button, large", width: "fixed" }]}>
        <button type="button" className="icon-btn lg" aria-label="Table settings" title="Table settings">
          <Ic n="gear" s={16} />
        </button>
      </SpecSheet>
      <SpecSheet title="In a register toolbar" description="The toolbar sets 36 px and the field corner." targets={[{ sel: ".icon-btn", name: "Icon button in a register toolbar", width: "fixed" }]}>
        <div className="sr-tools">
          <button type="button" className="icon-btn" aria-label="Table settings" title="Table settings — columns, sort and page size">
            <Ic n="gear" s={16} />
          </button>
        </div>
      </SpecSheet>
      <SpecSheet title="Destructive" description="Opens the confirmation dialog." targets={[{ sel: ".icon-btn", name: "Destructive icon button", width: "fixed" }]}>
        <button type="button" className="icon-btn btn-danger" aria-label="Delete breakdown log" title="Delete breakdown log">
          <Ic n="trash" s={15} />
        </button>
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
        { screen: "phone", width: WEB_SCREENS.phone, change: "Touch controls must be at least 44 px. The stylesheet has no phone size for icon buttons, so check the target." },
        { screen: "mobile-app", width: WEB_SCREENS.app, change: "Every touch target is at least 48 × 48. Header back and notification controls are 48 px." },
      ]}
    />
  );
}


function StyleColor() {
  return (
    <Table
      head={["Variant", "Background", "Border", "Icon", "Hover"]}
      rows={[
        ["Default", "#FFFFFF", <T>--border</T>, <T>--fg-2</T>, <><T>--muted</T>, icon <T>--fg</T>, border <T>--border-hover</T></>],
        ["Destructive", "#FFFFFF", <T>--error-line</T>, <T>--error</T>, "Same as default"],
        ["Focus", <T>--muted-2</T>, "—", "—", <>Ring <T>--primary</T></>],
      ]}
    />
  );
}

function StyleSpec() {
  return (
    <Table
      head={["Property", "Default", "Small", "Large"]}
      rows={[
        ["Size", <><T>--h-md</T> 36</>, <><T>--h-sm</T> 32</>, <><T>--h-lg</T> 40</>],
        ["Radius", <><T>--radius-control</T> 6</>, <><T>--radius-control</T> 6</>, <><T>--radius-panel</T> 10</>],
        ["Border", "1px", "1px", "1px"],
        ["Icon size", "14–16", "13–14", "—"],
        ["Focus ring", "2px, 2px offset", "2px, 2px offset", "2px, 2px offset"],
        ["Transition", "120ms", "120ms", "120ms"],
      ]}
    />
  );
}

/* ---- code ----------------------------------------------------------------- */

function CodeWeb() {
  return (
    <div className="prose">
      <Code title="HTML" lang="html">{HTML_DEFAULT + HTML_SIZES + HTML_DANGER}</Code>
      <Code title="React" lang="tsx">{`
import { IconButton } from "@/components/ui/Button";

<IconButton label="Table settings" icon={<Ic n="gear" s={16} />} onClick={openSettings} />
<IconButton label="Close dialog" icon={<Ic n="x" s={16} />} onClick={onClose} />
<IconButton label="Delete breakdown log" className="icon-btn btn-danger" icon={<Ic n="trash" s={15} />} onClick={askDelete} />
`}</Code>
      <Table
        head={["Prop", "Type", "Default"]}
        rows={[
          [<T>label</T>, <T>string</T>, "Required. Becomes aria-label and title"],
          [<T>icon</T>, <T>ReactNode</T>, "Required"],
          [<T>disabled</T>, <T>boolean</T>, <T>false</T>],
          [<T>...rest</T>, <T>ButtonHTMLAttributes</T>, "—"],
        ]}
      />
    </div>
  );
}

function CodeFlutter() {
  return (
    <Code title="Flutter" lang="dart">{`
IconButton(
  tooltip: 'Close dialog',          // also the semantics label
  icon: const Icon(Icons.close),
  onPressed: () => Navigator.pop(context),
);

IconButton.outlined(
  tooltip: 'Table settings',
  icon: const Icon(Icons.settings_outlined),
  onPressed: openSettings,
);
`}</Code>
  );
}

function CodeIos() {
  return (
    <Code title="SwiftUI" lang="swift">{`
Button(action: close) {
    Image(systemName: "xmark")
        .frame(width: EscoSize.touch, height: EscoSize.touch)
}
.accessibilityLabel("Close dialog")

Button(role: .destructive, action: askDelete) {
    Image(systemName: "trash")
}
.accessibilityLabel("Delete breakdown log")
`}</Code>
  );
}

/* ---- accessibility -------------------------------------------------------- */

function A11yKeyboard() {
  return (
    <Table
      head={["Key", "Action"]}
      rows={[
        ["Tab", "Moves focus to the icon button"],
        ["Enter, Space", "Activates it"],
      ]}
    />
  );
}

function A11yNames() {
  return (
    <div className="prose">
      <ul className="dodont">
        <Do>Give every icon button an <T>aria-label</T> that says the action: Close dialog, Table settings.</Do>
        <Do>Include the target when the same icon repeats: Move Serial number up, Remove item 2.</Do>
        <Do>Keep the icon hidden from assistive technology with <T>aria-hidden="true"</T>. The label is the name.</Do>
        <Dont>Rely on <T>title</T> alone. It is a tooltip for pointer users, not a reliable accessible name.</Dont>
        <Dont>Name it after the icon, like Gear or X. Name the action.</Dont>
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
          [<><T>--fg-2</T> icon on white</>, "8.4:1", "3:1 non-text"],
          [<><T>--error</T> icon on white</>, "5.4:1", "3:1 non-text"],
          [<><T>--border</T> edge on white</>, "1.2:1", "The icon identifies the control, not the border"],
          ["Focus ring on white", "9.6:1", "3:1 non-text"],
        ]}
      />
      <p className="prose-p">
        Targets are 40px on desktop where practical and at least 44px on mobile. The 32px small size is for dense desktop
        headers only.
      </p>
    </div>
  );
}

export const iconButton: ComponentContent = {
  lead: "Runs a universal action with an icon alone. Three sizes, and an accessible name every time.",
  art: IconButtonArt,
  usage: [
    { id: "overview", title: "Overview", body: <Overview /> },
    { id: "when-to-use", title: "When to use", body: <WhenToUse /> },
    { id: "anatomy", title: "Anatomy", body: <Anatomy /> },
    { id: "variants", title: "Variants", body: <Variants /> },
    { id: "sizes", title: "Sizes", body: <Sizes /> },
    { id: "behavior", title: "Behavior and states", body: <Behavior /> },
    { id: "related", title: "Related", body: <p className="prose-p">Button for actions that need a visible label; Segmented control for icon-only view switches like Register and Split.</p>, more: { href: "/components/button", label: "Button" } },
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
