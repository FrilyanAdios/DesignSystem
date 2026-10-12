import { Example } from "@/components/demo/Example";
import { Ic } from "@/components/demo/Ic";
import { SpecSheet } from "@/components/demo/SpecSheet";
import { ScreenWidths, WEB_SCREENS } from "@/components/demo/ScreenWidths";
import { DialogArt } from "@/components/art/dialog";
import { Code, Do, Dont, T, Table } from "../dev-kit";
import { CancelScheduleDemo, ExportDialogDemo } from "./dialog.demo";
import type { ComponentContent } from "./types";

/* ---------------------------------------------------------------------------
   Dialog — facts come from:
   - NPD-FSM/DESIGN_SYSTEM.md › Modal dialogs, Service Schedule guardrails
   - NPD-FSM/.claude/skills/fsm-design/references/ux-rules.md › Overlays
   - NPD-FSM/styles.css: .ov, .modal, .wide, .xl, .mh/.mb/.mf, and the canonical
     chrome under `#modalHost .modal` / `.ov > .modal` (the last rules win)
   - NPD-FSM/script.js: modal(), closeModal(), openCancelSchedule(), openOtherSchedules()
   - FSM-Mobile/COMPONENT_SYSTEM.md › Bottom sheet, css/sheet-system.css,
     js/sheet-system.js, js/menu-modal.js
   Static examples omit aria-modal so they never hide the docs page from
   assistive technology; the interactive ones in dialog.demo.tsx set it.
   --------------------------------------------------------------------------- */

const HTML_DIALOG = `
<div class="ov">                                  <!-- scrim; a click on it closes -->
  <div class="modal" role="dialog" aria-modal="true" aria-labelledby="dlg-title" tabindex="-1">
    <div class="mh">
      <span class="mi"><!-- ic('download', 17) --></span>
      <h3 id="dlg-title">Export schedules</h3>
      <button type="button" class="x" aria-label="Close dialog"><!-- ic('x', 17) --></button>
    </div>
    <div class="mb">
      …scrollable body…
    </div>
    <div class="mf">
      <button type="button" class="btn">Cancel</button>
      <button type="button" class="btn btn-primary">Export CSV</button>
    </div>
  </div>
</div>
`;

const HTML_SIZES = `
<div class="modal">…</div>      <!-- default · 440 -->
<div class="modal wide">…</div> <!-- wide · 620 -->
<div class="modal xl">…</div>   <!-- extra large · min(1040px, 94vw) -->
`;

const HTML_CONFIRM = `
<div class="modal cancel-prompt-modal" role="dialog" aria-modal="true" aria-labelledby="dlg-title">
  <div class="mh state-danger">
    <span class="mi"><!-- ic('calx', 17) --></span>
    <h3 id="dlg-title">Cancel schedule?</h3>
    <button type="button" class="x" aria-label="Close dialog"><!-- ic('x', 17) --></button>
  </div>
  <div class="mb cancel-prompt">
    <div class="cancel-context"><b>Helix Biomed</b><span>SCH-2431 · 3 work orders</span></div>
    <p><b>All work orders (3)</b> in this schedule will return to <b>Pending</b>.</p>
    <div class="cancel-warning">
      <!-- ic('alert', 15) -->
      <span><b>You cannot undo this action.</b><small>The schedule will be marked Cancelled.</small></span>
    </div>
    <label class="nt-lbl" for="cancel-reason">Reason for cancellation <span aria-hidden="true">*</span></label>
    <textarea class="ftext" id="cancel-reason" rows="3" maxlength="500" required
              aria-describedby="cancel-error"></textarea>
    <p class="nt-err" id="cancel-error" role="alert" hidden>Enter a reason for cancellation.</p>
  </div>
  <div class="mf">
    <button type="button" class="btn">Keep schedule</button>
    <button type="button" class="btn btn-solid-danger">Cancel schedule</button>
  </div>
</div>
`;

const HTML_CHILD = `
<div class="mh">
  <div>
    <h3 class="a11y-only" id="dlg-title">All schedules</h3>
    <button type="button" class="modal-drill-back">
      <!-- ic('cleft', 14) --><span>Back to schedule details</span>
    </button>
  </div>
  <button type="button" class="x" aria-label="Close dialog"><!-- ic('x', 17) --></button>
</div>
`;

const HTML_SHEET = `
<!-- FSM-Mobile: every "pick one" is a bottom sheet -->
<div class="modal" id="engineerSheet" role="dialog" aria-modal="true" aria-labelledby="engineerSheetTitle" hidden>
  <div class="modal-backdrop" onclick="closeModal('engineerSheet')"></div>
  <div class="modal-sheet sheet">
    <div class="sheet-grabber"></div>
    <header class="sheet-head">
      <button class="sheet-back ripple" aria-label="Back" onclick="closeModal('engineerSheet')">
        <i data-icon="chev-left"></i>
      </button>
      <h2 id="engineerSheetTitle">Choose engineer</h2>
    </header>
    <div class="sheet-body">
      <button class="sheet-option" role="option" aria-selected="true"><span>…</span></button>
    </div>
    <div class="sheet-foot"><button class="sheet-cancel ripple">Cancel</button></div>
  </div>
</div>
`;

/* ---- shared static markup ------------------------------------------------- */

function ExportDialogStatic({ scrim = true }: { scrim?: boolean }) {
  const dialog = (
    <div className="modal" role="dialog" aria-labelledby="dlg-export-title">
      <div className="mh">
        <span className="mi">
          <Ic n="download" s={17} />
        </span>
        <h3 id="dlg-export-title">Export schedules</h3>
        <button type="button" className="x" aria-label="Close dialog">
          <Ic n="x" s={17} />
        </button>
      </div>
      <div className="mb list-export-body">
        <div className="state-summary">
          <b>128 filtered records</b>
          <span>The current entity, date range, engineer and status filters will be applied.</span>
        </div>
        <label className="field">
          <span>Columns</span>
          <select className="finp" defaultValue="visible">
            <option value="visible">Visible table columns</option>
            <option value="all">All available fields</option>
          </select>
        </label>
        <p className="modal-help">The file will be downloaded in CSV format.</p>
      </div>
      <div className="mf">
        <button type="button" className="btn">
          Cancel
        </button>
        <button type="button" className="btn btn-primary">
          <Ic n="download" s={14} />
          Export CSV
        </button>
      </div>
    </div>
  );
  return <div id="modalHost">{scrim ? <div className="ov">{dialog}</div> : dialog}</div>;
}

/* ---- usage ---------------------------------------------------------------- */

function Overview() {
  return (
    <div className="prose">
      <p>
        A dialog holds one focused task or one decision on top of the current page: export a list, confirm a
        cancellation, edit a profile. The page stays behind a scrim. The user finishes or leaves, then returns to where
        they were.
      </p>
      <Example
        title="Dialog"
        description="Open it, press Tab to move through it, then Escape or Cancel to close. Focus returns to the button."
        layout="center"
        pad={false}
        minHeight={460}
        code={{ lang: "HTML", code: HTML_DIALOG }}
      >
        <ExportDialogDemo />
      </Example>
    </div>
  );
}

function WhenToUse() {
  return (
    <div className="prose">
      <ul className="dodont">
        <Do>Use a dialog for a short task or a decision that must be finished or abandoned before going on.</Do>
        <Do>Use it for every destructive action. The confirmation states the result and that it cannot be undone.</Do>
        <Do>Keep one concise title. Put account, date, or counts in the body, not in a subtitle.</Do>
        <Dont>Open a dialog inside a dialog. Expand inline, or switch to a child view with a Back action.</Dont>
        <Dont>Use a dialog for a quick choice next to a control. Use a popover or a menu, anchored to the trigger.</Dont>
      </ul>
      <Table
        head={["Surface", "Use for", "Anchored"]}
        rows={[
          ["Dialog", "A focused task or a confirmation that blocks the page", "No. Centered over a scrim"],
          ["Popover", "A quick choice or a quick comparison", "Yes, to its trigger"],
          ["Menu", "A short list of actions or one choice", "Yes, to its trigger"],
          ["Bottom sheet (mobile)", "Every “pick one” on the phone: a date, an entity, an action list", "Bottom edge of the screen"],
        ]}
      />
    </div>
  );
}

function Anatomy() {
  return (
    <div className="prose">
      <Example title="Anatomy" description="Header, scrollable body, footer, over a scrim." layout="none" pad={false} minHeight={440}>
        <ExportDialogStatic />
      </Example>
      <Table
        head={["Part", "Rule"]}
        rows={[
          ["Scrim", <><T>.ov</T>. Fills the viewport with <T>--scrim</T> and keeps 24px around the dialog</>],
          ["Container", <><T>.modal</T>. White, 1px <T>--border</T>, <T>--radius-card</T>, <T>--shadow-lg</T></>],
          ["Icon tile", <>30px, <T>--primary</T> icon on <T>--primary-50</T>. Omit it only when an avatar or record icon already identifies the content</>],
          ["Title", <>One concise <T>h3</T>, <T>--fs-section</T> 600 in <T>--fg</T>. It names the dialog through <T>aria-labelledby</T></>],
          ["Close", <>The final, far-right control. 32px bordered icon button with <T>aria-label="Close dialog"</T></>],
          ["Body", <><T>.mb</T>. The only part that scrolls</>],
          ["Footer", <><T>.mf</T>. White with a top border. Actions right-aligned: secondary first, primary last</>],
        ]}
      />
    </div>
  );
}

function Variants() {
  return (
    <div className="prose">
      <h3>Sizes</h3>
      <p>Pick the width from the content. Header, body, and footer stay the same at every size.</p>
      <Table
        head={["Size", "Class", "Width", "Use"]}
        rows={[
          ["Default", <T>.modal</T>, "440", "A short form or one decision. The guideline range is 440–560"],
          ["Wide", <T>.modal.wide</T>, "620", "Two columns, a list with detail. The guideline range is about 620–760"],
          ["Extra large", <T>.modal.xl</T>, "min(1040px, 94vw)", "Review or comparison that needs the room"],
        ]}
      />
      <Code title="Sizes" lang="html">{HTML_SIZES}</Code>

      <h3>Confirmation</h3>
      <p>
        A destructive action opens a confirmation. It names the record, states what will happen, says it cannot be
        undone, and asks for a reason when the product requires one. Cancel schedule requires a reason.
      </p>
      <Example
        title="Confirm a destructive action"
        description="Try Cancel schedule with an empty reason: the error appears and focus moves to the field."
        layout="center"
        pad={false}
        minHeight={560}
        code={{ lang: "HTML", code: HTML_CONFIRM }}
      >
        <CancelScheduleDemo />
      </Example>
      <ul className="dev-notes">
        <li>The header tile turns <T>--rejected-fg</T> on <T>--rejected-bg</T>. The title stays <T>--fg</T>.</li>
        <li>The final action is the solid destructive button. The way out keeps the record: Keep schedule.</li>
        <li>A menu item never changes status directly. It opens this confirmation.</li>
      </ul>

      <h3>Child view</h3>
      <p>
        A step inside a dialog flow replaces the content in place. A visible Back returns to the parent. Close still exits
        the whole flow. Done never leaves the user outside the parent.
      </p>
      <Example title="Child view with Back" layout="none" pad={false} minHeight={300} code={{ lang: "HTML", code: HTML_CHILD }}>
        <div id="modalHost">
          <div className="ov">
            <div className="modal wide" role="dialog" aria-labelledby="dlg-child-title">
              <div className="mh">
                <div>
                  <h3 className="a11y-only" id="dlg-child-title">
                    All schedules
                  </h3>
                  <button type="button" className="modal-drill-back">
                    <Ic n="cleft" s={14} />
                    <span>Back to schedule details</span>
                  </button>
                </div>
                <button type="button" className="x" aria-label="Close dialog">
                  <Ic n="x" s={17} />
                </button>
              </div>
              <div className="mb">
                <div className="mrow">
                  <Ic n="building" s={14} />
                  Helix Biomed · 2 schedules
                </div>
                <div className="mrow">
                  <Ic n="schedule" s={14} />
                  SCH-2431
                </div>
              </div>
            </div>
          </div>
        </div>
      </Example>

      <h3>Mobile bottom sheet</h3>
      <p>
        On the phone, every “pick one” opens as a bottom sheet over the current screen, never a pushed page. The context
        stays visible, and leaving costs no navigation step.
      </p>
      <Code title="FSM-Mobile" lang="html">{HTML_SHEET}</Code>
      <ul className="dev-notes">
        <li>Four equivalent exits: the back chevron, a drag down, a tap on the backdrop, and Escape.</li>
        <li>The header is pinned. Only <T>.sheet-body</T> scrolls, so the way out is always on screen.</li>
        <li>Drag starts on the handle or the header only, so scrolling a list never dismisses the sheet.</li>
        <li>A drag past 96px, or a flick faster than 0.6px/ms, dismisses. A shorter drag settles back.</li>
        <li>Rows are <T>.sheet-option</T> with <T>role="option"</T> and <T>aria-selected</T>. Kebab action sheets reuse the same row.</li>
      </ul>
    </div>
  );
}

function Behavior() {
  return (
    <div className="prose">
      <ul className="dev-notes">
        <li>Opening moves focus into the dialog, to the first meaningful control. Tab and Shift+Tab stay inside.</li>
        <li>Escape, the close button, and a click on the scrim close it. Focus returns to the control that opened it.</li>
        <li>Maximum height is 90vh, inside 24px of scrim. Header and footer stay visible; only the body scrolls.</li>
        <li>The scrim fades in over 150ms.</li>
        <li>Menus and dropdowns opened from inside a dialog sit above it: z-index 84 over the scrim’s 78.</li>
        <li>Inline validation stays in the body. The dialog stays open until the error is fixed or the user leaves.</li>
      </ul>
      <h3>Responsive</h3>
      <ul className="dev-notes">
        <li>Below 640px the dialog goes full width, up to 94dvh tall, with only its top corners rounded.</li>
        <li>Footer buttons grow to 44px (<T>--h-xl</T>) touch targets.</li>
        <li>On the mobile app, use the bottom sheet above instead of a centered dialog.</li>
      </ul>
    </div>
  );
}

/* ---- style ---------------------------------------------------------------- */

function DialogSpecMarkup() {
  return (
    <div id="modalHost">
      <div className="modal" role="dialog" aria-labelledby="spec-dlg-title">
        <div className="mh">
          <span className="mi">
            <Ic n="download" s={17} />
          </span>
          <h3 id="spec-dlg-title">Export schedules</h3>
          <button type="button" className="x" aria-label="Close dialog">
            <Ic n="x" s={17} />
          </button>
        </div>
        <div className="mb">
          <p className="modal-help">The file will be downloaded in CSV format.</p>
        </div>
        <div className="mf">
          <button type="button" className="btn">
            Cancel
          </button>
          <button type="button" className="btn btn-primary">
            Export CSV
          </button>
        </div>
      </div>
    </div>
  );
}

function DialogHeaderSpec() {
  /* header only, narrowed inline so the 2× view fits; the tile and close button keep their real size */
  return (
    <div id="modalHost">
      <div className="modal" role="dialog" aria-labelledby="spec-hdr-title" style={{ width: 260 }}>
        <div className="mh">
          <span className="mi">
            <Ic n="download" s={17} />
          </span>
          <h3 id="spec-hdr-title">Export</h3>
          <button type="button" className="x" aria-label="Close dialog">
            <Ic n="x" s={17} />
          </button>
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
        title="Whole dialog"
        description="Default size, without the scrim."
        scale={1}
        targets={[
          { sel: ".modal", name: "Dialog box", width: "fixed" },
          { sel: ".mh", name: "Dialog header", width: "fill" },
          { sel: ".mb", name: "Dialog body", width: "fill" },
          { sel: ".mf", name: "Dialog footer", width: "fill" },
        ]}
      >
        <DialogSpecMarkup />
      </SpecSheet>
      <SpecSheet title="Icon tile" description="The square at the start of the header." targets={[{ sel: ".mi", name: "Dialog icon tile", width: "fixed" }]}>
        <DialogHeaderSpec />
      </SpecSheet>
      <SpecSheet title="Close button" description="The last control in the header." targets={[{ sel: ".x", name: "Dialog close button", width: "fixed" }]}>
        <DialogHeaderSpec />
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
        { screen: "phone", width: WEB_SCREENS.phone, change: "The dialog fills the width. Only its top corners are rounded. It can be up to 94% of the screen tall. Footer buttons become 44 px tall." },
        { screen: "mobile-app", width: WEB_SCREENS.app, change: "Use a bottom sheet instead. It has four ways out: the back button, dragging down, tapping outside, and Escape." },
      ]}
    />
  );
}

function StyleColor() {
  return (
    <Table
      head={["Part", "Background", "Border", "Text or icon"]}
      rows={[
        ["Scrim", <T>--scrim</T>, "—", "—"],
        ["Container", "#FFFFFF", <T>--border</T>, "—"],
        ["Header", "#FFFFFF", <>bottom <T>--border</T></>, <>title <T>--fg</T></>],
        ["Icon tile", <T>--primary-50</T>, "—", <T>--primary</T>],
        ["Icon tile, destructive", <T>--rejected-bg</T>, "—", <T>--rejected-fg</T>],
        ["Close", "#FFFFFF", <T>--border</T>, <T>--fg-2</T>],
        ["Close, hover", <T>--muted</T>, <T>--border-hover</T>, <T>--fg</T>],
        ["Footer", "#FFFFFF", <>top <T>--border</T></>, "—"],
        ["Warning block", <T>--error-bg</T>, <T>--error-line</T>, <T>--error-700</T>],
      ]}
    />
  );
}

function StyleSpec() {
  return (
    <Table
      head={["Property", "Value"]}
      rows={[
        ["Width", "440 default · 620 wide · min(1040px, 94vw) extra large"],
        ["Maximum height", "90vh, inside 24px scrim padding"],
        ["Radius", <><T>--radius-card</T> 10</>],
        ["Shadow", <><T>--shadow-lg</T> 0 14px 40px rgba(16,32,44,.16)</>],
        ["Scrim", <><T>--scrim</T> rgba(17,32,44,.42)</>],
        ["Header", "Minimum 58 tall, 12px 18px padding, 10 gap"],
        ["Icon tile", "30 × 30, 6 padding, 6 radius, 17px icon"],
        ["Title", <><T>--fs-section</T> 16 · 600 · line height 1.4</>],
        ["Close button", <><T>--h-sm</T> 32 × 32, <T>--radius-control</T> 6, 1px border</>],
        ["Body padding", <><T>--sp-4</T> 16 · <T>--sp-5</T> 24</>],
        ["Footer", <>61 tall with 40 px buttons (minimum 58), 10px 18px padding, <T>--sp-2</T> 8 gap</>],
        ["Below 640px", <>Full width, 94dvh maximum, top corners only, footer buttons <T>--h-xl</T> 44</>],
        ["Mobile sheet", "28 top radius, 32 × 4 handle, 40 × 40 back button, 48 rows"],
      ]}
    />
  );
}

/* ---- code ----------------------------------------------------------------- */

function CodeWeb() {
  return (
    <div className="prose">
      <Code title="HTML" lang="html">{HTML_DIALOG}</Code>
      <Code title="React" lang="tsx">{`
import { Dialog } from "@/components/ui/Dialog";

<Dialog
  open={exporting}
  onClose={() => setExporting(false)}
  title="Export schedules"
  icon={<Ic n="download" s={17} />}
  footer={
    <>
      <Button onClick={() => setExporting(false)}>Cancel</Button>
      <Button variant="primary" onClick={exportCsv}>Export CSV</Button>
    </>
  }
>
  <ExportOptions />
</Dialog>
`}</Code>
      <Table
        head={["Prop", "Type", "Default"]}
        rows={[
          [<T>open</T>, <T>boolean</T>, "—"],
          [<T>onClose</T>, <T>{"() => void"}</T>, "—"],
          [<T>title</T>, <T>string</T>, "—"],
          [<T>icon</T>, <T>ReactNode</T>, "—"],
          [<T>footer</T>, <T>ReactNode</T>, "—"],
          [<T>children</T>, <T>ReactNode</T>, "—"],
        ]}
      />
    </div>
  );
}

function CodeFlutter() {
  return (
    <Code title="Flutter" lang="dart">{`
// Confirmation: Material on Android, Cupertino on iOS
final cancel = await showAdaptiveDialog<bool>(
  context: context,
  builder: (context) => AlertDialog.adaptive(
    title: const Text('Cancel schedule?'),
    content: const Text('All work orders will return to Pending. You cannot undo this action.'),
    actions: [
      TextButton(onPressed: () => Navigator.pop(context, false), child: const Text('Keep schedule')),
      TextButton(onPressed: () => Navigator.pop(context, true), child: const Text('Cancel schedule')),
    ],
  ),
);

// Pick one: a bottom sheet, never a pushed page
final picked = await showModalBottomSheet<Engineer>(
  context: context,
  useSafeArea: true,
  isScrollControlled: true,
  showDragHandle: true,
  builder: (context) => const EngineerSheet(), // pinned header, scrolling list
);
`}</Code>
  );
}

function CodeIos() {
  return (
    <Code title="SwiftUI" lang="swift">{`
// Confirmation before a destructive action
.confirmationDialog("Cancel schedule?", isPresented: $confirmingCancel, titleVisibility: .visible) {
    Button("Cancel schedule", role: .destructive) { cancelSchedule() }
    Button("Keep schedule", role: .cancel) {}
} message: {
    Text("All work orders will return to Pending. You cannot undo this action.")
}

// Pick one: a sheet with detents
.sheet(isPresented: $choosingEngineer) {
    EngineerPicker(selection: $engineerID)
        .presentationDetents([.medium, .large])
        .presentationDragIndicator(.visible)
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
        ["Tab, Shift+Tab", "Moves between controls inside the dialog. Focus wraps; it never reaches the page behind"],
        ["Escape", "Closes the dialog. Focus returns to the trigger"],
        ["Enter, Space", "Activates the focused button"],
      ]}
    />
  );
}

function A11yNames() {
  return (
    <div className="prose">
      <ul className="dodont">
        <Do>Set <T>role="dialog"</T>, <T>aria-modal="true"</T>, and <T>aria-labelledby</T> pointing at the title.</Do>
        <Do>Give the close button <T>aria-label="Close dialog"</T>. Every icon-only control needs a name.</Do>
        <Do>In a child view, keep a visually hidden title so the dialog still has a name.</Do>
        <Do>Announce a validation error with <T>role="alert"</T> and tie it to the field with <T>aria-describedby</T>.</Do>
        <Dont>Leave focus on the page behind, or drop it on the body when the dialog closes.</Dont>
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
          [<>Body <T>--fg-2</T> on white</>, "8.4:1", "4.5:1 text"],
          [<>Tile icon <T>--primary</T> on <T>--primary-50</T></>, "8.4:1", "3:1 non-text"],
          [<>Warning text <T>--error-700</T> on <T>--error-bg</T></>, "5.9:1", "4.5:1 text"],
          ["Focus ring on white", "9.6:1", "3:1 non-text"],
        ]}
      />
      <p>
        The close button shows the 2px <T>--primary</T> ring with a 2px offset on keyboard focus. Ratios are computed
        from the token values.
      </p>
    </div>
  );
}

export const dialog: ComponentContent = {
  lead: "Holds one focused task or decision over the page. Header, scrolling body, footer, and four ways out.",
  art: DialogArt,
  usage: [
    { id: "overview", title: "Overview", body: <Overview /> },
    { id: "when-to-use", title: "When to use", body: <WhenToUse /> },
    { id: "anatomy", title: "Anatomy", body: <Anatomy /> },
    { id: "variants", title: "Variants", body: <Variants /> },
    { id: "behavior", title: "Behavior and states", body: <Behavior /> },
    {
      id: "related",
      title: "Related",
      body: <p className="prose-p">Popover for a quick anchored choice; Menu for actions on a record; Button for the destructive and primary actions in the footer.</p>,
      more: { href: "/components/popover", label: "Popover" },
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
