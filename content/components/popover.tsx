import { Example } from "@/components/demo/Example";
import { Ic } from "@/components/demo/Ic";
import { SpecSheet } from "@/components/demo/SpecSheet";
import { ScreenWidths, WEB_SCREENS } from "@/components/demo/ScreenWidths";
import { PopoverArt } from "@/components/art/popover";
import { Code, Do, Dont, T, Table } from "../dev-kit";
import { PreviewPopoverDemo, SrPopStyle, TemplatePopoverDemo } from "./popover.demo";
import type { ComponentContent } from "./types";

/* ---------------------------------------------------------------------------
   Popover — facts come from:
   - NPD-FSM/DESIGN_SYSTEM.md › Popovers and menus, Service Schedule guardrails
   - NPD-FSM/.claude/skills/fsm-design/references/ux-rules.md › Overlays
   - NPD-FSM/sr/sr.css (.sr-pop, .sr-pop-h, .sr-pop-b, .sr-opt) and
     sr/sr-core.js srMenu() for placement; sr/sr-detail.js srTemplatePop()
   - NPD-FSM/styles.css (.popover-close, header icon tile, .jd-quick-pop) and
     script.js openJobQuickCompare() for the preview popover
   --------------------------------------------------------------------------- */

const HTML_POPOVER = `
<button type="button" class="selbox trigger-open" aria-haspopup="dialog" aria-expanded="true" aria-controls="tpl-pop">
  <!-- ic('report', 14) --> Default Template <!-- ic('down', 14) -->
</button>

<div class="sr-pop" id="tpl-pop" role="dialog" aria-labelledby="tpl-title"
     style="left:…px; top:…px; width:280px; max-height:…px">
  <div class="sr-pop-h">
    <!-- ic('report', 14) -->
    <b id="tpl-title">Report template</b>
    <button type="button" class="popover-close" aria-label="Close popover"><!-- ic('x', 14) --></button>
  </div>
  <div class="sr-pop-b">
    <button type="button" class="sr-opt on" aria-pressed="true">
      <span class="sr-radio"></span><span class="sr-opt-t"><b>Default Template</b></span>
    </button>
    <button type="button" class="sr-opt" aria-pressed="false">
      <span class="sr-radio"></span><span class="sr-opt-t"><b>UK / Europe Template</b></span>
    </button>
  </div>
</div>
`;

const HTML_PREVIEW = `
<aside class="jd-quick-pop shared-schedule-preview" role="dialog" aria-label="Quick view Helix Biomed"
       style="left:…px; top:…px">
  <div class="jdqp-head">
    <span>Schedule preview</span>
    <span class="pill b-issued"><span class="d"></span>Confirmed</span>
    <button type="button" aria-label="Close quick view"><!-- ic('x', 14) --></button>
  </div>
  <div class="jdqp-body">…compact schedule details…</div>
  <div class="jdqp-foot">
    <button type="button" class="btn btn-primary btn-sm jdqp-open">Open this schedule <!-- ic('cright', 12) --></button>
  </div>
</aside>
`;

const HTML_STEP = `
<!-- a drill-in step replaces the panel content in place -->
<div class="csf-date-step-head">
  <button type="button" class="icon-btn sm" aria-label="Back to search filters"><!-- ic('cleft', 14) --></button>
  <b>Choose date</b>
</div>
`;

/* ---- shared static markup ------------------------------------------------- */

function TemplatePopoverStatic() {
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <SrPopStyle />
      <button type="button" className="selbox trigger-open" aria-haspopup="dialog" aria-expanded="true">
        <Ic n="report" s={14} />
        <span>Default Template</span>
        <Ic n="down" s={14} />
      </button>
      <div
        className="sr-pop"
        role="dialog"
        aria-labelledby="tpl-static-title"
        style={{ position: "absolute", top: "calc(100% + 6px)", left: 0, width: 280 }}
      >
        <div className="sr-pop-h">
          <Ic n="report" s={14} />
          <b id="tpl-static-title">Report template</b>
          <button type="button" className="popover-close" aria-label="Close popover">
            <Ic n="x" s={14} />
          </button>
        </div>
        <div className="sr-pop-b">
          {["Default Template", "Template with Test Summary", "UK / Europe Template"].map((t, i) => (
            <button key={t} type="button" className={`sr-opt${i === 0 ? " on" : ""}`} aria-pressed={i === 0}>
              <span className="sr-radio" />
              <span className="sr-opt-t">
                <b>{t}</b>
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---- usage ---------------------------------------------------------------- */

function Overview() {
  return (
    <div className="prose">
      <p>
        A popover is a small panel anchored to the control that opened it. Use it for a quick choice or a quick
        comparison without leaving the page. The page behind stays visible and usable.
      </p>
      <Example
        title="Popover"
        description="Open it, pick a template, or press Escape. Focus returns to the trigger."
        layout="stack"
        minHeight={340}
        code={{ lang: "HTML", code: HTML_POPOVER }}
      >
        <TemplatePopoverDemo />
      </Example>
    </div>
  );
}

function WhenToUse() {
  return (
    <div className="prose">
      <ul className="dodont">
        <Do>Use a popover for a quick choice tied to one control: a template, a filter, a date.</Do>
        <Do>Use a preview popover to compare a record without leaving the list. End it with one route to full details.</Do>
        <Do>Keep the header to an icon, one concise title, and the close button.</Do>
        <Dont>Open a popover from inside a popover. Expand inline, step in place with Back, or open a dialog.</Dont>
        <Dont>Rely on hover to open it. Hover fails on touch and keyboard, and long content needs a click.</Dont>
        <Dont>Use a popover for a task that must be finished or abandoned. That is a dialog.</Dont>
      </ul>
    </div>
  );
}

function Anatomy() {
  return (
    <div className="prose">
      <Example title="Anatomy" description="Trigger in its open state, header, body." layout="stack" minHeight={300}>
        <TemplatePopoverStatic />
      </Example>
      <Table
        head={["Part", "Rule"]}
        rows={[
          ["Trigger", <>Stays visibly open while the popover exists. Carries <T>aria-expanded</T> and a chevron</>],
          ["Surface", <>White, 1px <T>--border</T>, <T>--radius-card</T>, <T>--shadow-lg</T>. Aligned to the trigger’s edge</>],
          ["Header", "Optional. Icon, one concise title, optional quiet action such as Clear all, then the close button"],
          ["Close", <>Final, far-right control. 30px bordered icon button with <T>aria-label="Close popover"</T></>],
          ["Body", "Scrolls inside the panel. Choices apply at once, or the footer holds the actions"],
          ["Footer", <>Optional. Shared <T>.btn</T> variants only, never restyled</>],
        ]}
      />
    </div>
  );
}

function Variants() {
  return (
    <div className="prose">
      <h3>Quick choice</h3>
      <p>
        The <T>.sr-pop</T> grammar: a header and a list of options. Picking an option applies it and closes the popover.
        A filter popover may apply choices at once and offer Reset and Done.
      </p>
      <Code title="Quick choice" lang="html">{HTML_POPOVER}</Code>

      <h3>Preview</h3>
      <p>
        A preview popover shows a compact read of one record next to its card. It ends with one explicit route to the
        full record, here Open this schedule. The source card stays marked while the preview is open.
      </p>
      <Example
        title="Preview popover"
        description="Open the preview. The footer holds the one route to details."
        layout="stack"
        minHeight={600}
        code={{ lang: "HTML", code: HTML_PREVIEW }}
      >
        <PreviewPopoverDemo />
      </Example>

      <h3>Step in place</h3>
      <p>
        When a choice needs a second screen, such as a date inside search filters, replace the panel content in place. A
        Back control returns to the previous content. Never open a second popover somewhere else on the screen.
      </p>
      <Code title="Drill-in step" lang="html">{HTML_STEP}</Code>

      <h3>Menu</h3>
      <p>
        A list of actions or a single choice with no header uses the <T>.menu</T> grammar. See Menu.
      </p>
    </div>
  );
}

function Behavior() {
  return (
    <div className="prose">
      <ul className="dev-notes">
        <li>Opens 6px below the trigger, aligned to its left edge, or to its right edge when the panel would not fit.</li>
        <li>Clamped 12px inside the viewport on both axes. Flips above the trigger when there is less than 260px below and more room above.</li>
        <li>Clicking the same trigger again closes it. Clicking another trigger swaps it.</li>
        <li>Click outside or Escape closes it. Focus returns to the trigger. A window resize closes it.</li>
        <li>Opens with a 120ms fade. The body scrolls; the header stays.</li>
        <li>It never opens another popover. A second screen steps in place, with Back.</li>
      </ul>
    </div>
  );
}

/* ---- style ---------------------------------------------------------------- */

function TemplatePopoverSpec() {
  return (
    <div>
      <SrPopStyle />
      <div className="sr-pop" role="dialog" aria-labelledby="spec-tpl-title" style={{ position: "static", width: 280 }}>
        <div className="sr-pop-h">
          <Ic n="report" s={14} />
          <b id="spec-tpl-title">Report template</b>
          <button type="button" className="popover-close" aria-label="Close popover">
            <Ic n="x" s={14} />
          </button>
        </div>
        <div className="sr-pop-b">
          {["Default Template", "UK / Europe Template"].map((t, i) => (
            <button key={t} type="button" className={`sr-opt${i === 0 ? " on" : ""}`} aria-pressed={i === 0}>
              <span className="sr-radio" />
              <span className="sr-opt-t">
                <b>{t}</b>
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
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
        title="Quick choice popover"
        description="The Report template popover."
        scale={1}
        targets={[
          { sel: ".sr-pop", name: "Popover box", width: "fixed" },
          { sel: ".sr-pop-h", name: "Popover header", width: "fill" },
          { sel: ".sr-pop-b", name: "Popover body", width: "fill" },
        ]}
      >
        <TemplatePopoverSpec />
      </SpecSheet>
      <SpecSheet title="Option" description="One row in the list." targets={[{ sel: ".sr-opt.on", name: "Popover option", width: "fill" }]}>
        <TemplatePopoverSpec />
      </SpecSheet>
      <SpecSheet title="Close button" description="The last control in the header." targets={[{ sel: ".popover-close", name: "Popover close button", width: "fixed" }]}>
        <TemplatePopoverSpec />
      </SpecSheet>
      <SpecSheet title="Trigger" description="The control that opens the popover, in its open state." targets={[{ sel: ".selbox", name: "Popover trigger, open", width: "hug" }]}>
        <button type="button" className="selbox trigger-open" aria-haspopup="dialog" aria-expanded="true">
          <Ic n="report" s={14} />
          <span>Default Template</span>
          <Ic n="down" s={14} />
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
        { screen: "phone", width: WEB_SCREENS.phone, same: true },
        { screen: "mobile-app", width: WEB_SCREENS.app, change: "Use a bottom sheet instead of an anchored popover. It has four ways out: the back button, dragging down, tapping outside, and Escape." },
      ]}
    />
  );
}

function StyleColor() {
  return (
    <Table
      head={["Part", "Background", "Border", "Text or icon"]}
      rows={[
        ["Surface", "#FFFFFF", <T>--border</T>, "—"],
        ["Header", "#FFFFFF", <>bottom <T>--border</T></>, <>title <T>--fg</T></>],
        ["Header icon tile", <T>--primary-50</T>, "—", <T>--primary</T>],
        ["Header action (Clear all)", "transparent", "—", <T>--primary</T>],
        ["Close", "#FFFFFF", <T>--border</T>, <T>--fg-2</T>],
        ["Option, hover", <T>--muted</T>, "—", <T>--fg</T>],
        ["Option, selected", "—", "—", <>radio <T>--primary</T>, label 600</>],
      ]}
    />
  );
}

function StyleSpec() {
  return (
    <Table
      head={["Property", "Value"]}
      rows={[
        ["Width", "260 default, set per popover (280 for the template choice)"],
        ["Offset from trigger", "6"],
        ["Viewport margin", "12"],
        ["Radius", <><T>--radius-card</T> 10</>],
        ["Shadow", <><T>--shadow-lg</T> 0 14px 40px rgba(16,32,44,.16)</>],
        ["Header", "47 tall: the 30 px close button, 8 px above and below, and a 1 px bottom border. 10 px left and right, 8 gap; title 12.5 · 600"],
        ["Header icon tile", "28 × 28, 6 padding, 6 radius"],
        ["Close button", "30 × 30, 6 radius, 1px border"],
        ["Body padding", "8, 2 between options"],
        ["Option", "Minimum 44 tall, 11px 12px padding, 8 radius, 16px radio"],
        ["Preview popover", "430 wide, up to 548 tall, footer action full width"],
        ["Enter", "Fade, 120ms"],
      ]}
    />
  );
}

/* ---- code ----------------------------------------------------------------- */

function CodeWeb() {
  return (
    <div className="prose">
      <Code title="HTML" lang="html">{HTML_POPOVER}</Code>
      <Code title="React" lang="tsx">{`
import { Popover } from "@/components/ui/Popover";

<Popover
  trigger={<SelectBox icon={<Ic n="report" s={14} />}>{template}</SelectBox>}
  title="Report template"
  icon={<Ic n="report" s={14} />}
  width={280}
>
  {(close) =>
    TEMPLATES.map((t) => (
      <Option key={t} selected={t === template} onSelect={() => { setTemplate(t); close(); }}>
        {t}
      </Option>
    ))
  }
</Popover>
`}</Code>
      <Table
        head={["Prop", "Type", "Default"]}
        rows={[
          [<T>trigger</T>, <T>ReactElement</T>, "—"],
          [<T>title</T>, <T>string</T>, "—"],
          [<T>icon</T>, <T>ReactNode</T>, "—"],
          [<T>width</T>, <T>number</T>, <T>260</T>],
          [<T>align</T>, <T>"start" | "end"</T>, "Fits the viewport"],
          [<T>children</T>, <T>{"(close: () => void) => ReactNode"}</T>, "—"],
        ]}
      />
    </div>
  );
}

function CodeFlutter() {
  return (
    <Code title="Flutter" lang="dart">{`
// Phone: a quick choice is a bottom sheet, never an anchored panel
final picked = await showModalBottomSheet<String>(
  context: context,
  useSafeArea: true,
  showDragHandle: true,
  builder: (context) => TemplateSheet(selected: template),
);

// Tablet and desktop: anchor the panel to its trigger
MenuAnchor(
  builder: (context, controller, child) => OutlinedButton.icon(
    onPressed: () => controller.isOpen ? controller.close() : controller.open(),
    icon: const Icon(Icons.description_outlined, size: 18),
    label: Text(template),
  ),
  menuChildren: [
    for (final t in templates)
      RadioMenuButton<String>(value: t, groupValue: template, onChanged: setTemplate, child: Text(t)),
  ],
);
`}</Code>
  );
}

function CodeIos() {
  return (
    <Code title="SwiftUI" lang="swift">{`
Button { choosingTemplate = true } label: {
    Label(template, systemImage: "doc.text")
}
.popover(isPresented: $choosingTemplate, arrowEdge: .bottom) {
    TemplatePicker(selection: $template)
        .presentationCompactAdaptation(.sheet)   // iPhone: a sheet; iPad: anchored
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
        ["Enter, Space", "On the trigger, opens or closes the popover. On an option, picks it"],
        ["Tab, Shift+Tab", "Moves through the controls inside the popover"],
        ["Escape", "Closes the popover. Focus returns to the trigger"],
      ]}
    />
  );
}

function A11yNames() {
  return (
    <div className="prose">
      <ul className="dodont">
        <Do>Give the trigger <T>aria-haspopup="dialog"</T>, <T>aria-expanded</T>, and <T>aria-controls</T> while open.</Do>
        <Do>Give the panel <T>role="dialog"</T> and name it from its title with <T>aria-labelledby</T>, or with <T>aria-label</T>.</Do>
        <Do>Mark the chosen option in code, with <T>aria-pressed</T> or <T>aria-checked</T>, not by color alone.</Do>
        <Do>Name every icon-only control: Close popover, Close quick view, Back to search filters.</Do>
        <Dont>Set <T>aria-modal</T> on a popover. The page behind stays available.</Dont>
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
          [<>Title <T>--fg</T> on white</>, "11.5:1", "4.5:1 text"],
          [<>Header action <T>--primary</T> on white</>, "9.6:1", "4.5:1 text"],
          [<>Header icon <T>--primary</T> on <T>--primary-50</T></>, "8.4:1", "3:1 non-text"],
          [<>Panel edge <T>--border</T> on white</>, "1.2:1", <>Below 3:1. The <T>--shadow-lg</T> and the open trigger separate it from the page</>],
          ["Focus ring on white", "9.6:1", "3:1 non-text"],
        ]}
      />
      <p>Keyboard focus shows the 2px <T>--primary</T> ring. Ratios are computed from the token values.</p>
    </div>
  );
}

export const popover: ComponentContent = {
  lead: "A small panel anchored to its trigger, for a quick choice or a quick comparison. Never nested.",
  art: PopoverArt,
  usage: [
    { id: "overview", title: "Overview", body: <Overview /> },
    { id: "when-to-use", title: "When to use", body: <WhenToUse /> },
    { id: "anatomy", title: "Anatomy", body: <Anatomy /> },
    { id: "variants", title: "Variants", body: <Variants /> },
    { id: "behavior", title: "Behavior and states", body: <Behavior /> },
    {
      id: "related",
      title: "Related",
      body: <p className="prose-p">Menu for actions and single choices without a header; Dialog for a task that blocks the page; Tooltip for a short label on hover and focus.</p>,
      more: { href: "/components/menu", label: "Menu" },
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
