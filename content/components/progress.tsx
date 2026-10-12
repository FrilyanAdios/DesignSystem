import { Example } from "@/components/demo/Example";
import { ScreenWidths, WEB_SCREENS } from "@/components/demo/ScreenWidths";
import { SpecSheet } from "@/components/demo/SpecSheet";
import { ProgressArt } from "@/components/art/progress";
import { Code, Do, Dont, T, Table } from "../dev-kit";
import { NOTIF_THEME_CSS } from "./notification.theme";
import { LinearProgressView, LoadingButtonDemo, StepperView, WizardDemo } from "./progress.demo";
import type { ComponentContent } from "./types";

/* ---------------------------------------------------------------------------
   Progress and loading.
   Facts: NPD-FSM/styles.css (.btn.loading, .skel, .ncard-skel), script.js
   (skeletonCal, notifSkeletonHTML, loadScheduleAttachments), DESIGN_SYSTEM.md
   › Interaction states. Mobile: FSM-Mobile js/wizard-stepper.js,
   css/wizard-stepper.css, css/create-sr.css, screens/createsr.js,
   MOBILE_DESIGN_NOTES.md.
   --------------------------------------------------------------------------- */

const HTML_BUTTON = `
<!-- keeps its width; the label stays in the DOM as the accessible name -->
<button type="button" class="btn btn-primary loading" aria-busy="true">Save schedule</button>
<button type="button" class="btn loading" aria-busy="true">Export all</button>
`;

const HTML_SKELETON = `
<!-- a skeleton mirrors the shape of what is coming -->
<div class="ncard-skel" aria-hidden="true">
  <div class="skel sk-ic"></div>
  <div class="sk-lines">
    <div class="skel sk-l1"></div><div class="skel sk-l2"></div><div class="skel sk-l3"></div>
  </div>
</div>
`;

const HTML_TEXT = `
<div class="jd-attachments-body" aria-busy="true">Loading attachments…</div>
<!-- then -->
<div class="jd-attachments-body">No attachments have been added to WO-2422.</div>
`;

const HTML_STEPPER = `
<!-- renderWizardStepper(host, ['Customer','Delivery','Problem'], 1) -->
<nav class="flow-stepper wizard-stepper" aria-label="Defect report steps">
  <div class="flow-step complete"><span class="flow-step-dot">1</span><span class="flow-step-name">Customer</span></div>
  <span class="flow-step-line complete" aria-hidden="true"></span>
  <div class="flow-step active" aria-current="step"><span class="flow-step-dot">2</span><span class="flow-step-name">Delivery</span></div>
  <span class="flow-step-line" aria-hidden="true"></span>
  <div class="flow-step"><span class="flow-step-dot">3</span><span class="flow-step-name">Problem</span></div>
</nav>
`;

const HTML_LINEAR = `
<div class="src-progress" role="progressbar" aria-label="Service report progress"
     aria-valuemin="1" aria-valuemax="3" aria-valuenow="2"
     aria-valuetext="Step 2 of 3, Work orders" style="--src-progress:.66"></div>
`;

/* the notif.css layer, rendered on the server so it arrives with the markup it styles */
const NotifStyle = () => <style>{NOTIF_THEME_CSS}</style>;

/* ---- usage ---------------------------------------------------------------- */

function Overview() {
  return (
    <div className="prose">
      <p>
        Progress tells the user that work is happening and how far it has come. A control that is waiting keeps its size
        and its name. Content that is loading shows its future shape. A multi-step task shows the steps and where the user
        is.
      </p>
      <Example title="Loading button" description="Live. Press Save schedule." layout="row" code={{ lang: "HTML", code: HTML_BUTTON }}>
        <LoadingButtonDemo />
      </Example>
    </div>
  );
}

function WhenToUse() {
  return (
    <div className="prose">
      <ul className="dodont">
        <Do>Put the spinner in the button that started the work. The button keeps its width.</Do>
        <Do>Use a skeleton that mirrors the layout being loaded, so nothing reflows when content arrives.</Do>
        <Do>Show steps and a determinate bar in a wizard, with "Step 2 of 3" for assistive technology.</Do>
        <Do>Replace a loading message with a real result, including an empty one: "No attachments have been added to WO-2422."</Do>
        <Dont>Cover the page with a spinner, or shrink a control to a spinner. Loading preserves dimensions and the label.</Dont>
      </ul>
    </div>
  );
}

function Anatomy() {
  return (
    <div className="prose">
      <Table
        head={["Pattern", "Parts", "Where"]}
        rows={[
          ["Button spinner", "14px ring with a transparent top, centered; label kept but transparent", "Any .btn while an action runs"],
          ["Skeleton", "Shimmering blocks in the shape of the coming content", "Calendar grid, notification history, schedule history"],
          ["Loading text", "A short sentence in the space the content will fill, with aria-busy", "Attachments, history count (\"Loading…\")"],
          ["Wizard stepper", "Numbered dots joined by lines; current step ringed and named in bold blue; finished steps filled", "Mobile wizards"],
          ["Linear progress", "4dp track with a determinate fill", "Mobile wizards"],
        ]}
      />
    </div>
  );
}

function Variants() {
  return (
    <div className="prose">
      <div className="examples two">
        <Example title="Button spinner" description="Primary and secondary. Both keep their width." layout="row" code={{ lang: "HTML", code: HTML_BUTTON }}>
          <button type="button" className="btn btn-primary loading" aria-busy="true">
            Save schedule
          </button>
          <button type="button" className="btn loading" aria-busy="true">
            Export all
          </button>
        </Example>
        <Example title="Skeleton" description="Notification history while it loads." layout="none" bg="white" code={{ lang: "HTML", code: HTML_SKELETON }}>
          <div style={{ width: "100%", border: "1px solid var(--border-2)", borderRadius: 10, overflow: "hidden" }} aria-busy="true" aria-label="Loading notifications">
            {[0, 1, 2].map((i) => (
              <div key={i} className="ncard-skel" aria-hidden="true">
                <div className="skel sk-ic" />
                <div className="sk-lines">
                  <div className="skel sk-l1" />
                  <div className="skel sk-l2" />
                  <div className="skel sk-l3" />
                </div>
              </div>
            ))}
          </div>
        </Example>
        <Example title="Layout skeleton" description="The calendar loads as its own grid: header strip, engineer column, rows." layout="none" bg="white">
          <div style={{ width: "100%", border: "1px solid var(--border)", borderRadius: 10, overflow: "hidden" }} aria-busy="true" aria-label="Loading schedule">
            <div style={{ display: "flex", gap: 10, padding: "8px 16px", borderBottom: "1px solid var(--border)" }}>
              <div className="skel" style={{ width: 120, height: 34 }} />
              <div className="skel" style={{ flex: 1, height: 34, opacity: 0.6 }} />
            </div>
            <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
              {[0, 1, 2].map((i) => (
                <div key={i} style={{ display: "flex", gap: 10 }}>
                  <div className="skel" style={{ width: 120, height: 76, borderRadius: 8 }} />
                  <div className="skel" style={{ flex: 1, height: 76, borderRadius: 8, opacity: 0.7 }} />
                </div>
              ))}
            </div>
          </div>
        </Example>
        <Example title="Loading text" description="For short waits inside a section." layout="stack" bg="white" code={{ lang: "HTML", code: HTML_TEXT }}>
          <div aria-busy="true" style={{ fontSize: 13, color: "var(--fg-3)" }}>
            Loading attachments…
          </div>
          <div style={{ fontSize: 13, color: "var(--fg-3)" }}>No attachments have been added to WO-2422.</div>
        </Example>
        <Example title="Wizard stepper" description="Mobile. Finished, current, and next steps." layout="none" bg="white" code={{ lang: "HTML", code: HTML_STEPPER }}>
          <StepperView names={["Customer", "Delivery", "Problem"]} current={1} />
        </Example>
        <Example title="Linear progress" description="Mobile. 4dp determinate track." layout="stack" bg="white" code={{ lang: "HTML", code: HTML_LINEAR }}>
          <LinearProgressView value={2} max={3} label="Service report progress" valueText="Step 2 of 3, Work orders" />
        </Example>
      </div>
      <Example title="Mobile wizard" description="Live. Next and Back move the stepper and the progress bar together." layout="none" bg="muted" minHeight={360}>
        <WizardDemo />
      </Example>
    </div>
  );
}

function Behavior() {
  return (
    <div className="prose">
      <ul className="dev-notes">
        <li>A loading button ignores pointer input until the work ends. Its label stays as the accessible name.</li>
        <li>The skeleton shimmer runs on a 1.4s loop. The notification history shows it for 280ms; the calendar shows it until the grid is ready.</li>
        <li>Loading text is replaced by the result, including an empty result that says what is missing.</li>
        <li>The stepper marks the current step with <T>aria-current="step"</T>. Finished steps fill blue; the line to them turns blue.</li>
        <li>The linear bar animates its width in 320ms. Create service report also announces "Step 1 of 3 · Work orders" in a status region.</li>
        <li>In Create service report the 4dp bar is visually hidden today; the stepper carries the visual progress and the bar keeps the value for assistive technology.</li>
        <li>On mobile, reduced motion turns animations and transitions off.</li>
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
        ["Spinner on primary", "#FFFFFF ring"],
        ["Spinner on other buttons", <T>--fg-2</T>],
        ["Skeleton shimmer", <><T>--muted-2</T> to <T>--border-2</T></>],
        ["Stepper: current and finished dot", <><T>--esco-blue</T>, ring <T>--esco-tint</T> on the current one</>],
        ["Stepper: next dot and line", <><T>--outline-strong</T></>],
        ["Stepper: current name", <T>--esco-blue</T>],
        ["Linear progress", <>Fill <T>--esco-blue</T>, track <T>--esco-tint</T></>],
      ]}
    />
  );
}

function StyleSpec() {
  return (
    <Table
      head={["Property", "Value"]}
      rows={[
        ["Button spinner", "14 × 14, 2px ring, 0.6s linear rotation"],
        ["Skeleton", <><T>--radius-field</T> 8, shimmer 1.4s ease, infinite</>],
        ["Notification skeleton row", <>Tile 36 × 36; lines 11, 10, 9 tall at 62%, 44%, 28% width; corners <T>--radius-field</T> 8 (the shared .skel rule wins)</>],
        ["Stepper dot", "28 × 28, 1.5px border, 13 · 600; current ring 4px"],
        ["Stepper name", "13, current 600"],
        ["Stepper line", "2 tall, 13 from the top, 2 radius"],
        ["Stepper step", "Up to 96 wide, at least 48"],
        ["Linear progress", "4 tall, fill width animates 320ms"],
      ]}
    />
  );
}

function Measurements() {
  return (
    <div className="prose">
      <p>
        Every number below is read from the product stylesheet, not typed by hand. The stepper and the progress track use
        the FSM-Mobile values. Build to these numbers, not to how the picture looks.
      </p>
      <SpecSheet
        title="Loading button"
        description="Same size as at rest. The 14 px spinner is drawn by the stylesheet in the middle of the button."
        targets={[{ sel: ".btn-primary.loading", name: "Loading button" }]}
      >
        <button type="button" className="btn btn-primary loading" aria-busy="true">
          Save schedule
        </button>
      </SpecSheet>
      <SpecSheet
        title="Skeleton row"
        description="Notification history while it loads. The fill is a moving gradient from --muted-2 to --border-2, so the color card reads it as none."
        targets={[
          { sel: ".sk-ic", name: "Skeleton tile", width: "fixed" },
          { sel: ".sk-l1", name: "First line", width: "fill", marks: true },
        ]}
      >
        <NotifStyle />
        <div style={{ width: 360 }}>
          <div className="ncard-skel" aria-hidden="true">
            <div className="skel sk-ic" />
            <div className="sk-lines">
              <div className="skel sk-l1" />
              <div className="skel sk-l2" />
              <div className="skel sk-l3" />
            </div>
          </div>
        </div>
      </SpecSheet>
      <SpecSheet
        title="Wizard step"
        description="Mobile. The current step is ringed and named in bold blue."
        targets={[{ sel: "[aria-current='step'] > span:first-child", name: "Current step dot", width: "fixed" }]}
      >
        <div style={{ width: 340 }}>
          <StepperView names={["Customer", "Delivery", "Problem"]} current={1} />
        </div>
      </SpecSheet>
      <SpecSheet
        title="Progress track"
        description="Mobile. Shown in a 320 px wide screen; the track fills the width."
        targets={[{ sel: "[role='progressbar']", name: "Progress track", width: "fill" }]}
      >
        <div style={{ width: 320 }}>
          <LinearProgressView value={2} max={3} label="Service report progress" valueText="Step 2 of 3, Work orders" />
        </div>
      </SpecSheet>
    </div>
  );
}

function Screens() {
  return (
    <ScreenWidths
      rows={[
        { screen: "desktop", width: WEB_SCREENS.desktop, change: "Loading buttons keep their size. Skeletons take the shape of the content they replace." },
        { screen: "laptop", width: WEB_SCREENS.laptop, same: true },
        { screen: "tablet", width: WEB_SCREENS.tablet, same: true },
        { screen: "phone", width: WEB_SCREENS.phone, same: true },
        { screen: "mobile-app", width: WEB_SCREENS.app, change: "Wizards show the numbered stepper under the app bar and a 4 dp progress value. Reduced motion turns animation off." },
      ]}
    />
  );
}

/* ---- code ----------------------------------------------------------------- */

function CodeWeb() {
  return (
    <div className="prose">
      <Code title="HTML" lang="html">{HTML_BUTTON + HTML_SKELETON + HTML_TEXT}</Code>
      <Code title="React" lang="tsx">{`
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";

<Button variant="primary" loading={saving} onClick={save}>Save schedule</Button>

<section aria-busy={loading}>
  {loading ? <Skeleton rows={4} /> : <NotificationList items={items} />}
</section>
`}</Code>
      <Table
        head={["Prop", "Type", "Default"]}
        rows={[
          [<>Button <T>loading</T></>, <T>boolean</T>, <T>false</T>],
          [<>Skeleton <T>rows</T></>, <T>number</T>, "—"],
        ]}
      />
    </div>
  );
}

function CodeFlutter() {
  return (
    <Code title="Flutter" lang="dart">{`
// 4dp determinate progress at the top of a wizard
Semantics(
  label: 'Service report progress',
  value: 'Step \${step + 1} of \${steps.length}, \${steps[step]}',
  child: LinearProgressIndicator(
    value: (step + 1) / steps.length,
    minHeight: 4,
    color: Theme.of(context).colorScheme.primary,
    backgroundColor: Theme.of(context).colorScheme.primaryContainer,
  ),
);

// Loading button: same size, spinner in place of the label
FilledButton(
  onPressed: saving ? null : save,
  child: saving
      ? const SizedBox.square(dimension: 18, child: CircularProgressIndicator(strokeWidth: 2))
      : const Text('Save schedule'),
);
`}</Code>
  );
}

function CodeIos() {
  return (
    <Code title="SwiftUI" lang="swift">{`
// 4pt determinate progress at the top of a wizard
ProgressView(value: Double(step + 1), total: Double(steps.count))
    .progressViewStyle(.linear)
    .tint(.escoPrimary)
    .accessibilityLabel("Service report progress")
    .accessibilityValue("Step \\(step + 1) of \\(steps.count), \\(steps[step])")

// Loading button: same size, spinner in place of the label
Button(action: save) {
    Text("Save schedule").opacity(saving ? 0 : 1)
        .overlay { if saving { ProgressView() } }
}
.buttonStyle(.borderedProminent)
.disabled(saving)
`}</Code>
  );
}

/* ---- accessibility -------------------------------------------------------- */

function A11yKeyboard() {
  return (
    <Table
      head={["Key", "Action"]}
      rows={[
        ["Tab", "A loading button stays in the tab order with its name. Skeletons and progress bars take no focus"],
        ["Enter, Space", "Must not start the action twice. pointer-events: none stops the pointer only, so the handler also ignores keys while loading"],
      ]}
    />
  );
}

function A11yNames() {
  return (
    <div className="prose">
      <ul className="dodont">
        <Do>Set <T>aria-busy="true"</T> on the button or region that is loading, and remove it when done.</Do>
        <Do>Hide skeleton blocks with <T>aria-hidden="true"</T>. They have no meaning to read.</Do>
        <Do>Give a progress bar <T>role="progressbar"</T>, a label, <T>aria-valuemin</T>, <T>aria-valuemax</T>, <T>aria-valuenow</T>, and a text value such as "Step 2 of 3, Work orders".</Do>
        <Do>Mark the current wizard step with <T>aria-current="step"</T>.</Do>
        <Dont>Remove the button label while loading. Without it the button has no name.</Dont>
      </ul>
    </div>
  );
}

function A11yContrast() {
  return (
    <Table
      head={["Pair", "Ratio", "Requirement"]}
      rows={[
        [<>Linear fill <T>--esco-blue</T> on track <T>--esco-tint</T></>, "8.4:1", "3:1 non-text"],
        [<>Current step name <T>--esco-blue</T> on white</>, "9.6:1", "4.5:1 text"],
        ["Spinner (white) on primary", "9.6:1", "3:1 non-text"],
        ["Skeleton blocks", "Below 3:1", "Decorative and hidden from assistive technology; the region carries aria-busy"],
      ]}
    />
  );
}

export const progress: ComponentContent = {
  lead: "Shows that work is underway and how far it has come, without moving the layout.",
  art: ProgressArt,
  usage: [
    { id: "overview", title: "Overview", body: <Overview /> },
    { id: "when-to-use", title: "When to use", body: <WhenToUse /> },
    { id: "anatomy", title: "Anatomy", body: <Anatomy /> },
    { id: "variants", title: "Variants", body: <Variants /> },
    { id: "behavior", title: "Behavior and states", body: <Behavior /> },
    { id: "related", title: "Related", body: <p className="prose-p">Button for the loading state of an action; Notification for the history skeleton; Toast to confirm the result.</p>, more: { href: "/components/button", label: "Button" } },
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
