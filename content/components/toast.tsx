import { Example } from "@/components/demo/Example";
import { Ic } from "@/components/demo/Ic";
import { ScreenWidths, WEB_SCREENS } from "@/components/demo/ScreenWidths";
import { SpecSheet } from "@/components/demo/SpecSheet";
import { ToastArt } from "@/components/art/toast";
import { Code, Do, Dont, T, Table } from "../dev-kit";
import { SnackbarDemo, ToastDemo } from "./toast.demo";
import { SNACK_STYLE, TOAST_STYLE } from "./toast.styles";
import type { ComponentContent } from "./types";

/* ---------------------------------------------------------------------------
   Toast — short confirmation after an action.
   Facts: toast(m) in NPD-FSM/script.js (inline styles, 2200ms) and its call
   sites; FSM-Mobile snack(msg) in js/ui.js, .snackbar in css/styles.css,
   the #snackbar element in esco-fsm-prototype.html, MOBILE_DESIGN_NOTES.md.
   --------------------------------------------------------------------------- */

/* shown in place: a static copy of the toast, not fixed to the stage */
const STATIC_TOAST: React.CSSProperties = { ...TOAST_STYLE, position: "static", transform: "none" };

const HTML_TOAST = `
<!-- toast('Schedule note saved') creates this, then removes it after 2200ms -->
<div style="position:fixed;bottom:24px;left:50%;transform:translateX(-50%);
            background:#11202c;color:#fff;padding:11px 18px;border-radius:8px;
            font-size:13px;z-index:90;box-shadow:var(--shadow-lg)">
  Schedule note saved
</div>
`;

const JS_TOAST = `
function toast(m){
  const d=document.createElement('div');
  d.textContent=m;
  d.style.cssText='position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:#11202c;color:#fff;padding:11px 18px;border-radius:8px;font-size:13px;z-index:90;box-shadow:var(--shadow-lg)';
  document.body.appendChild(d);
  setTimeout(()=>d.remove(),2200);
}

toast('Schedule note saved');
toast(\`\${n} notification\${n===1?'':'s'} marked as read\`);
`;

const HTML_SNACKBAR = `
<!-- FSM-Mobile: one element, placed before the bottom navigation -->
<div class="snackbar" id="snackbar" role="status" aria-live="polite" aria-atomic="true">
  <i data-icon="check-circle"></i><span id="snackText"></span>
</div>
<nav class="navbar" aria-label="Main navigation">…</nav>

<script>
  snack('Schedule note saved');   // adds .show, removes it after 2600ms
</script>
`;

/* ---- usage ---------------------------------------------------------------- */

function Overview() {
  return (
    <div className="prose">
      <p>
        A toast confirms that an action just happened: saved, exported, moved. It appears at the bottom center, says the
        result in a few words, and leaves on its own. It never asks for a decision.
      </p>
      <Example title="Toast" description="Live. Press an action to see its confirmation." layout="none" minHeight={180} code={{ lang: "JavaScript", code: JS_TOAST }}>
        <ToastDemo />
      </Example>
    </div>
  );
}

function WhenToUse() {
  return (
    <div className="prose">
      <ul className="dodont">
        <Do>Confirm an action the user just took, with its result: "12 records exported", "Schedule note saved".</Do>
        <Do>Include the count and the object when there is one: "3 notifications moved to history".</Do>
        <Do>Say when nothing happened: "Nothing unread", "No read notifications to clear".</Do>
        <Dont>Put an error that blocks the user in a toast. Show it inline, next to the control that has to change.</Dont>
        <Dont>Put information the user must act on later in a toast. It disappears. Use the notification panel.</Dont>
      </ul>
    </div>
  );
}

function Anatomy() {
  return (
    <div className="prose">
      <div className="examples two">
        <Example title="Web" description="One line of text on the ink surface." layout="center">
          <div style={STATIC_TOAST}>Schedule note saved</div>
        </Example>
        <Example title="Mobile" description="Check icon, message, full width above navigation." layout="none" bg="white">
          <div style={SNACK_STYLE}>
            <span style={{ color: "#7FD1A8", display: "flex" }}>
              <Ic n="check" s={19} />
            </span>
            <span>Schedule note saved</span>
          </div>
        </Example>
      </div>
      <Table
        head={["Part", "Rule"]}
        rows={[
          ["Container", <>Web: <T>--ink</T> surface, 8 radius, large shadow. Mobile: 16 radius, no shadow</>],
          ["Message", "Plain text, sentence case. The result first, no trailing period"],
          ["Icon", "Mobile only: a check circle at 19, before the message"],
          ["Action", "None in use. The mobile stylesheet has an action slot (.sAction); snack() shows text only"],
        ]}
      />
    </div>
  );
}

function Variants() {
  return (
    <div className="prose">
      <div className="examples two">
        <Example title="Web toast" description="Bottom center of the window, above everything." layout="center" code={{ lang: "HTML", code: HTML_TOAST }}>
          <div style={STATIC_TOAST}>12 records exported</div>
        </Example>
        <Example title="Mobile snackbar" description="Live. It takes its own row above navigation, so it never covers records." layout="none" bg="white" minHeight={500} code={{ lang: "HTML", code: HTML_SNACKBAR }}>
          <SnackbarDemo />
        </Example>
      </div>
    </div>
  );
}

function Behavior() {
  return (
    <div className="prose">
      <ul className="dev-notes">
        <li>Web: the toast stays for 2.2 seconds, then is removed. It has no close button and takes no focus.</li>
        <li>Mobile: the snackbar stays for 2.6 seconds. A new message replaces the current one and restarts the timer.</li>
        <li>Mobile: the snackbar sits in the layout above the bottom navigation, so content above it stays visible.</li>
        <li>Toasts follow actions, including bulk ones. A destructive action is confirmed in a dialog first; the toast reports the result.</li>
      </ul>
    </div>
  );
}

/* ---- style ---------------------------------------------------------------- */

function StyleColor() {
  return (
    <Table
      head={["Platform", "Surface", "Text", "Icon"]}
      rows={[
        ["Web", <><T>--ink</T> #11202C</>, "#FFFFFF", "—"],
        ["Mobile, light", "#2B3947", "#F1F4F7", "#7FD1A8"],
        ["Mobile, dark", "#E8EEF4", "#0F151C", "#146C34"],
      ]}
    />
  );
}

function StyleSpec() {
  return (
    <Table
      head={["Property", "Web", "Mobile"]}
      rows={[
        ["Position", "Fixed, 24 from the bottom, centered", "In flow, before the bottom navigation"],
        ["Padding", "11 18", "12 16, margin 8 12"],
        ["Radius", <><T>--radius-field</T> 8</>, "16"],
        ["Text", "13", "14 (0.875rem)"],
        ["Icon", "—", "19, gap 12"],
        ["Shadow", <T>--shadow-lg</T>, "None"],
        ["Layer", "z-index 90", "—"],
        ["Duration", "2200ms", "2600ms"],
      ]}
    />
  );
}

function Measurements() {
  return (
    <div className="prose">
      <p>
        Every number below is read from the product code, not typed by hand. The web toast is styled inline by toast();
        the snackbar uses the FSM-Mobile stylesheet values. Build to these numbers, not to how the picture looks.
      </p>
      <SpecSheet title="Web toast" description="Bottom center of the window." targets={[{ sel: "[data-part='toast']", name: "Toast" }]}>
        <div data-part="toast" style={STATIC_TOAST}>
          Schedule note saved
        </div>
      </SpecSheet>
      <SpecSheet
        title="Mobile snackbar"
        description="Shown in a 320 px wide phone. It fills the width, less 12 px on each side."
        targets={[{ sel: "[data-part='snackbar']", name: "Snackbar", width: "fill" }]}
      >
        <div style={{ width: 320 }}>
          <div data-part="snackbar" style={SNACK_STYLE}>
            <span style={{ color: "#7FD1A8", display: "flex" }}>
              <Ic n="check" s={19} />
            </span>
            <span>Schedule note saved</span>
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
        { screen: "desktop", width: WEB_SCREENS.desktop, change: "Fixed 24 px above the bottom of the window, centered. Stays 2.2 seconds." },
        { screen: "laptop", width: WEB_SCREENS.laptop, same: true },
        { screen: "tablet", width: WEB_SCREENS.tablet, same: true },
        { screen: "phone", width: WEB_SCREENS.phone, same: true },
        { screen: "mobile-app", width: WEB_SCREENS.app, change: "A snackbar takes its own row above the bottom navigation, 12 px from each side, so it never covers records. Stays 2.6 seconds." },
      ]}
    />
  );
}

/* ---- code ----------------------------------------------------------------- */

function CodeWeb() {
  return (
    <div className="prose">
      <Code title="JavaScript" lang="js">{JS_TOAST}</Code>
      <Code title="React" lang="tsx">{`
import { useToast } from "@/components/ui/Toast";

const toast = useToast();

async function save() {
  await saveNote(note);
  toast("Schedule note saved");
}

// in the root layout, once: one polite live region that renders the current message
<ToastRegion />
`}</Code>
      <Table
        head={["Prop", "Type", "Default"]}
        rows={[
          [<T>message</T>, <T>string</T>, "—"],
          [<T>duration</T>, <T>number</T>, <T>2200</T>],
        ]}
      />
    </div>
  );
}

function CodeFlutter() {
  return (
    <Code title="Flutter" lang="dart">{`
ScaffoldMessenger.of(context)
  ..hideCurrentSnackBar()   // a new message replaces the current one
  ..showSnackBar(
    const SnackBar(
      content: Row(children: [
        Icon(Icons.check_circle_outline, size: 19),
        SizedBox(width: 12),
        Expanded(child: Text('Schedule note saved')),
      ]),
      duration: Duration(milliseconds: 2600),
      behavior: SnackBarBehavior.floating,   // sits above the NavigationBar
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.all(Radius.circular(16))),
    ),
  );
`}</Code>
  );
}

function CodeIos() {
  return (
    <Code title="SwiftUI" lang="swift">{`
// SwiftUI has no snackbar. Show a small overlay above the tab bar and announce it.
.safeAreaInset(edge: .bottom) {
    if let message {
        Label(message, systemImage: "checkmark.circle")
            .padding(.vertical, 12).padding(.horizontal, 16)
            .frame(maxWidth: .infinity, alignment: .leading)
            .background(Color.escoText, in: RoundedRectangle(cornerRadius: 16))
            .foregroundStyle(.white)
            .padding(.horizontal, 12)
            .transition(.move(edge: .bottom).combined(with: .opacity))
    }
}
.onChange(of: message) { _, new in
    guard let new else { return }
    AccessibilityNotification.Announcement(new).post()
    Task { try? await Task.sleep(for: .milliseconds(2600)); message = nil }
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
        ["None", "The toast takes no focus and has no controls. Focus stays on the control that started the action"],
      ]}
    />
  );
}

function A11yNames() {
  return (
    <div className="prose">
      <ul className="dodont">
        <Do>Render one live region with <T>role="status"</T>, <T>aria-live="polite"</T>, and <T>aria-atomic="true"</T>, and put the message inside it. The mobile snackbar does this.</Do>
        <Do>Keep the live region in the page before the message arrives, so screen readers announce the change.</Do>
        <Do>Write the full result in the text. "Exported" alone does not say what.</Do>
        <Dont>Append a new element with no role for each message. Web toast() does this today, so screen readers miss it.</Dont>
        <Dont>Put a link or button in a toast that disappears. Keyboard and screen reader users cannot reach it in time.</Dont>
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
        ["Mobile text #F1F4F7 on #2B3947", "10.7:1", "4.5:1 text"],
        ["Mobile icon #7FD1A8 on #2B3947", "6.5:1", "3:1 non-text"],
      ]}
    />
  );
}

export const toast: ComponentContent = {
  lead: "Confirms an action the user just took, in a few words, then leaves on its own.",
  art: ToastArt,
  usage: [
    { id: "overview", title: "Overview", body: <Overview /> },
    { id: "when-to-use", title: "When to use", body: <WhenToUse /> },
    { id: "anatomy", title: "Anatomy", body: <Anatomy /> },
    { id: "variants", title: "Variants", body: <Variants /> },
    { id: "behavior", title: "Behavior and states", body: <Behavior /> },
    { id: "related", title: "Related", body: <p className="prose-p">Notification for events the user reads later; Dialog to confirm a destructive action before the toast reports it.</p>, more: { href: "/components/notification", label: "Notification" } },
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
