import { Example } from "@/components/demo/Example";
import { Ic } from "@/components/demo/Ic";
import { SpecSheet } from "@/components/demo/SpecSheet";
import { ScreenWidths, WEB_SCREENS } from "@/components/demo/ScreenWidths";
import { TextFieldArt } from "@/components/art/text-field";
import { Code, Do, Dont, T, Table } from "../dev-kit";
import type { ComponentContent } from "./types";

/* ---------------------------------------------------------------------------
   Text field — facts from DESIGN_SYSTEM.md › Text fields and selects,
   styles.css › FORM CONTROLS (.finp, .ftext, .field label, .fhelp, .ferr,
   .has-error), sr/sr-form.js (srCreateField markup), and FSM-Mobile
   css/design-system-unification.css (52px field).
   --------------------------------------------------------------------------- */

const HTML_FIELD = `
<div class="field">
  <label for="src-account">Address service report to <span class="freq">*</span></label>
  <input id="src-account" class="finp" type="text" required aria-describedby="src-account-help">
  <p id="src-account-help" class="fhelp">For dealer work orders, enter the dealer’s name.</p>
</div>
`;

const HTML_TEXTAREA = `
<div class="field">
  <label for="src-remark">Additional remarks / recommendations</label>
  <textarea id="src-remark" class="ftext"></textarea>
</div>
`;

const HTML_DATE = `
<div class="field">
  <label for="wo-date">Scheduled date</label>
  <input id="wo-date" class="finp" type="date">
</div>
`;

const HTML_ERROR = `
<div class="field">
  <label for="tk-name">Component name <span class="freq">*</span></label>
  <input id="tk-name" class="finp has-error" aria-invalid="true" aria-describedby="tk-name-err">
  <p id="tk-name-err" class="ferr">Enter a component name.</p>
</div>
`;

const HTML_DISABLED = `
<div class="field">
  <label for="sr-no">Service report no.</label>
  <input id="sr-no" class="finp" value="ZWSE-26-0415" disabled>
</div>
`;

/* ---- usage ---------------------------------------------------------------- */

function Overview() {
  return (
    <div className="prose">
      <p>
        A text field takes a short typed value: a name, a reference, a date. The label sits above the field. Helper text
        or an error sits below it. Every module uses the same field at the same height, border, and focus ring.
      </p>
      <Example
        title="Labeled field"
        description="Label above, optional helper below."
        layout="stack"
        bg="white"
        code={{ lang: "HTML", code: HTML_FIELD }}
      >
        <div className="field" style={{ width: 320 }}>
          <label htmlFor="ov-account">
            Address service report to <span className="freq">*</span>
          </label>
          <input id="ov-account" className="finp" type="text" required aria-describedby="ov-account-help" />
          <p id="ov-account-help" className="fhelp">
            For dealer work orders, enter the dealer’s name.
          </p>
        </div>
      </Example>
    </div>
  );
}

function WhenToUse() {
  return (
    <div className="prose">
      <ul className="dodont">
        <Do>Use a text field for free text, references, and numbers the user types.</Do>
        <Do>Use a textarea for remarks, actions taken, and other text longer than one line.</Do>
        <Do>Keep a visible label above every field. Use the placeholder only for an example or an instruction.</Do>
        <Dont>Use the placeholder as the label. It disappears as soon as the user types.</Dont>
        <Dont>Use a text field to choose from a known list. Use a select, or the entity picker for entities.</Dont>
      </ul>
    </div>
  );
}

function Anatomy() {
  return (
    <div className="prose">
      <Example title="Anatomy" description="Label with required marker, field, helper text." layout="stack" bg="white">
        <div className="field" style={{ width: 320 }}>
          <label htmlFor="an-contact">
            Verified by <span className="freq">*</span>
          </label>
          <input id="an-contact" className="finp" placeholder="e.g. Marissa Tan" aria-describedby="an-contact-help" />
          <p id="an-contact-help" className="fhelp">
            The customer contact who checked the work.
          </p>
        </div>
      </Example>
      <Table
        head={["Part", "Rule"]}
        rows={[
          ["Label", <>Real <T>{"<label for>"}</T> above the field. 12px semibold, 8px clear of the field</>],
          ["Required marker", <><T>.freq</T> asterisk after the label text, in the error color</>],
          ["Field", <><T>.finp</T> for input and select, <T>.ftext</T> for textarea</>],
          ["Helper text", <><T>.fhelp</T>, 6px below the field. Explains, never carries the only copy of a value</>],
          ["Error message", <><T>.ferr</T>, 6px below the field. Replaces the helper while the error stands</>],
        ]}
      />
    </div>
  );
}

function Variants() {
  return (
    <div className="prose">
      <div className="examples two">
        <Example title="Single line" description="The default field, 40px." layout="stack" bg="white" code={{ lang: "HTML", code: HTML_FIELD }}>
          <div className="field" style={{ width: "100%" }}>
            <label htmlFor="v-acc">Address service report to</label>
            <input id="v-acc" className="finp" defaultValue="Aurora Dynamics" />
          </div>
        </Example>
        <Example title="Textarea" description="Multi-line text. Resizes vertically." layout="stack" bg="white" code={{ lang: "HTML", code: HTML_TEXTAREA }}>
          <div className="field" style={{ width: "100%" }}>
            <label htmlFor="v-remark">Additional remarks / recommendations</label>
            <textarea id="v-remark" className="ftext" />
          </div>
        </Example>
        <Example title="Date" description="A native date input with the same field styling." layout="stack" bg="white" code={{ lang: "HTML", code: HTML_DATE }}>
          <div className="field" style={{ width: "100%" }}>
            <label htmlFor="v-date">Scheduled date</label>
            <input id="v-date" className="finp" type="date" defaultValue="2026-08-04" />
          </div>
        </Example>
        <Example title="With helper text" description="Short guidance under the field." layout="stack" bg="white" code={{ lang: "HTML", code: HTML_FIELD }}>
          <div className="field" style={{ width: "100%" }}>
            <label htmlFor="v-help">
              Service date <span className="freq">*</span>
            </label>
            <input id="v-help" className="finp" type="date" aria-describedby="v-help-note" />
            <p id="v-help-note" className="fhelp">
              Choose a date to see schedules.
            </p>
          </div>
        </Example>
      </div>
    </div>
  );
}

function Behavior() {
  return (
    <div className="prose">
      <Example
        title="States"
        description="Rest, error, and disabled. Hover and focus are live: try them."
        layout="row"
        bg="white"
        code={[
          { lang: "HTML", label: "Show error HTML", code: HTML_ERROR },
          { lang: "HTML", label: "Show disabled HTML", code: HTML_DISABLED },
        ]}
      >
        <div className="field" style={{ width: 220 }}>
          <label htmlFor="st-rest">Rest</label>
          <input id="st-rest" className="finp" placeholder="e.g. ZWSE-26-0415" />
        </div>
        <div className="field" style={{ width: 220 }}>
          <label htmlFor="st-err">
            Component name <span className="freq">*</span>
          </label>
          <input id="st-err" className="finp has-error" aria-invalid="true" aria-describedby="st-err-msg" />
          <p id="st-err-msg" className="ferr">
            <Ic n="alert" s={14} />
            Enter a component name.
          </p>
        </div>
        <div className="field" style={{ width: 220 }}>
          <label htmlFor="st-dis">Service report no.</label>
          <input id="st-dis" className="finp" defaultValue="ZWSE-26-0415" disabled />
        </div>
      </Example>
      <ul className="dev-notes">
        <li>Hover darkens the border slightly. Focus hides the border and draws a 2px primary ring in its place.</li>
        <li>An error turns the border and the focus ring to the error color, and shows a message that says what to fix.</li>
        <li>Error color alone is not enough. Always pair it with the message text.</li>
        <li>Disabled fields drop to 50% opacity and ignore the pointer.</li>
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
      <SpecSheet
        title="Field with label and helper text"
        description="The field fills its column."
        targets={[
          { sel: ".finp", name: "Text field, resting", width: "fill" },
          { sel: ".field label", name: "Label above the field", width: "fill" },
          { sel: ".fhelp", name: "Helper text", width: "fill" },
        ]}
      >
        <div className="field" style={{ width: 320 }}>
          <label htmlFor="ms-acc">Verified by</label>
          <input id="ms-acc" className="finp" placeholder="e.g. Marissa Tan" aria-describedby="ms-acc-help" />
          <p id="ms-acc-help" className="fhelp">
            The customer contact who checked the work.
          </p>
        </div>
      </SpecSheet>
      <SpecSheet
        title="Error state"
        description="A red border and a message in words."
        targets={[
          { sel: ".finp.has-error", name: "Text field with an error", width: "fill" },
          { sel: ".ferr", name: "Error message", width: "fill" },
        ]}
      >
        <div className="field" style={{ width: 320 }}>
          <label htmlFor="ms-err">Component name</label>
          <input id="ms-err" className="finp has-error" aria-invalid="true" aria-describedby="ms-err-msg" />
          <p id="ms-err-msg" className="ferr">
            <Ic n="alert" s={14} />
            Enter a component name.
          </p>
        </div>
      </SpecSheet>
      <SpecSheet title="Textarea" description="For text longer than one line. The user can drag it taller." targets={[{ sel: ".ftext", name: "Textarea, resting", width: "fill" }]}>
        <div className="field" style={{ width: 320 }}>
          <label htmlFor="ms-ta">Additional remarks / recommendations</label>
          <textarea id="ms-ta" className="ftext" />
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
        { screen: "phone", width: WEB_SCREENS.phone, change: "The page edge shrinks to 16 px and dialogs go full width, so fields get wider. The field stays 40 px tall." },
        { screen: "mobile-app", width: WEB_SCREENS.app, change: "Fields are at least 52 px tall, with 16 px text and 12 px corners. The label above is 14 px. Long forms are full-screen steps, not dialogs." },
      ]}
    />
  );
}

function StyleColor() {
  return (
    <Table
      head={["Part", "Rest", "Hover", "Focus", "Error"]}
      rows={[
        ["Border", <T>--border-input</T>, <T>--border-hover</T>, <>transparent, 2px <T>--primary</T> ring</>, <><T>--error</T>, ring <T>--error</T> on focus</>],
        ["Background", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"],
        ["Value", <T>--fg</T>, <T>--fg</T>, <T>--fg</T>, <T>--fg</T>],
        ["Placeholder", <T>--fg-4</T>, <T>--fg-4</T>, <T>--fg-4</T>, <T>--fg-4</T>],
        ["Label", <T>--fg-2</T>, "—", "—", <T>--fg-2</T>],
        ["Helper or error text", <><T>--fg-3</T> helper</>, "—", "—", <><T>--error</T> message</>],
        ["Required marker", <T>--error</T>, "—", "—", <T>--error</T>],
      ]}
    />
  );
}

function StyleSpec() {
  return (
    <Table
      head={["Property", "Web", "Mobile"]}
      rows={[
        ["Height", <><T>--h-lg</T> 40</>, <>min <T>--ds-field</T> 52</>],
        ["Horizontal padding", <><T>--sp-3</T> 12</>, <><T>--space-16</T> 16</>],
        ["Radius", <><T>--radius-field</T> 8</>, <><T>--ds-radius-control</T> 12</>],
        ["Border", <>1px <T>--border-input</T></>, <>1px <T>--outline-strong</T></>],
        ["Value font", <><T>--fs-body</T> 13.5</>, "16 · 400"],
        ["Label", <><T>--fs-label</T> 12 · 600</>, "14 · 500"],
        ["Label to field", <><T>--sp-2</T> 8</>, <><T>--space-8</T> 8</>],
        ["Helper text", <><T>--fs-help</T> 11.5, 6 above</>, "13"],
        ["Textarea", "min 76, padding 10 / 12, line height 1.5", "min 112"],
        ["Focus ring", <>2px <T>--primary</T>, border hidden</>, "—"],
      ]}
    />
  );
}

/* ---- code ----------------------------------------------------------------- */

function CodeWeb() {
  return (
    <div className="prose">
      <Code title="HTML" lang="html">{HTML_FIELD + HTML_TEXTAREA + HTML_ERROR}</Code>
      <Code title="React" lang="tsx">{`
import { TextField } from "@/components/ui/Field";

<TextField label="Verified by" required help="The customer contact who checked the work." />
<TextField label="Component name" error={nameError} value={name} onChange={(e) => setName(e.target.value)} />
<TextField label="Scheduled date" type="date" />
`}</Code>
      <Table
        head={["Prop", "Type", "Default"]}
        rows={[
          [<T>label</T>, <T>string</T>, "required"],
          [<T>help</T>, <T>string</T>, "—"],
          [<T>error</T>, <T>string</T>, "—"],
          [<T>...input</T>, <T>InputHTMLAttributes</T>, "—"],
        ]}
      />
    </div>
  );
}

function CodeFlutter() {
  return (
    <Code title="Flutter" lang="dart">{`
EscoField(
  label: 'Verified by',
  hint: 'e.g. Marissa Tan',
  help: 'The customer contact who checked the work.',
  controller: verifiedBy,
  validator: (v) => (v == null || v.trim().isEmpty) ? 'Enter who verified the work.' : null,
);

// Multi-line: same label grammar, TextFormField with more lines
TextFormField(
  minLines: 4,
  maxLines: null,
  keyboardType: TextInputType.multiline,
  decoration: const InputDecoration(hintText: 'Additional remarks / recommendations'),
);
`}</Code>
  );
}

function CodeIos() {
  return (
    <Code title="SwiftUI" lang="swift">{`
EscoField(label: "Verified by", prompt: "e.g. Marissa Tan", text: $verifiedBy)
    .textContentType(.name)

EscoField(label: "Component name", prompt: "", text: $name, error: nameError)

TextField("Additional remarks / recommendations", text: $remarks, axis: .vertical)
    .lineLimit(4...)
`}</Code>
  );
}

/* ---- accessibility -------------------------------------------------------- */

function A11yKeyboard() {
  return (
    <Table
      head={["Key", "Action"]}
      rows={[
        ["Tab, Shift+Tab", "Moves focus into and out of the field"],
        ["Typing", "Enters the value"],
        ["Enter", "In a form, submits it. In a textarea, adds a new line"],
      ]}
    />
  );
}

function A11yNames() {
  return (
    <div className="prose">
      <ul className="dodont">
        <Do>Connect the label with <T>for</T> and <T>id</T>. The label is the accessible name.</Do>
        <Do>Point <T>aria-describedby</T> at the helper or error text so it is read after the name.</Do>
        <Do>Set <T>aria-invalid="true"</T> with the error, and <T>required</T> on required fields.</Do>
        <Do>On submit, move focus to the first invalid field.</Do>
        <Dont>Rely on the red border or the asterisk alone. Say what is wrong in words.</Dont>
      </ul>
    </div>
  );
}

function A11yContrast() {
  return (
    <Table
      head={["Pair", "Ratio", "Requirement"]}
      rows={[
        [<><T>--fg</T> value on white</>, "11.6:1", "4.5:1 text"],
        [<><T>--fg-4</T> placeholder on white</>, "4.7:1", "4.5:1 text"],
        [<><T>--fg-3</T> helper on white</>, "6.2:1", "4.5:1 text"],
        [<><T>--error</T> message on white</>, "5.4:1", "4.5:1 text"],
        [<><T>--border-input</T> edge on white</>, "1.5:1", "Below 3:1. The label above names the field; the focus ring marks the active one"],
        [<>Mobile <T>--outline-strong</T> edge on white</>, "3.3:1", "3:1 non-text"],
        ["Focus ring on white", "9.6:1", "3:1 non-text"],
      ]}
    />
  );
}

export const textField: ComponentContent = {
  lead: "Takes a short typed value, with the label above and helper or error text below.",
  art: TextFieldArt,
  usage: [
    { id: "overview", title: "Overview", body: <Overview /> },
    { id: "when-to-use", title: "When to use", body: <WhenToUse /> },
    { id: "anatomy", title: "Anatomy", body: <Anatomy /> },
    { id: "variants", title: "Variants", body: <Variants /> },
    { id: "behavior", title: "Behavior and states", body: <Behavior /> },
    { id: "related", title: "Related", body: <p className="prose-p">Select for a choice from a list; Search for finding records; Date picker for date ranges.</p>, more: { href: "/components/select", label: "Select" } },
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
