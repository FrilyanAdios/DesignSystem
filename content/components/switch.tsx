import { Example } from "@/components/demo/Example";
import { Code, Do, Dont, T, Table } from "../dev-kit";
import { BareSwitch, SafeToUseRow, SwitchPairSpec } from "./switch.demo";
import { SpecSheet } from "@/components/demo/SpecSheet";
import { ScreenWidths, WEB_SCREENS } from "@/components/demo/ScreenWidths";
import { SwitchArt } from "@/components/art/switch";
import type { ComponentContent } from "./types";

/* ---------------------------------------------------------------------------
   Switch — a mobile component. Facts from:
   - FSM-Mobile/css/components.css › .switch, .switch-track, .switch-knob
   - FSM-Mobile/css/create-sr.css › .src-switch-row ("switches rather than
     checkboxes for on/off"), js/create-sr.js (markup)
   - FSM-Mobile/MOBILE_DESIGN_NOTES.md ("switches for on/off")
   - Platform guides: Flutter Switch, SwiftUI Toggle for on or off
   The web product (NPD-FSM) has no switch; on/off there is a labelled
   checkbox (sr/sr-form.js "With Service Time").
   Exported as `switchComponent` because `switch` is a reserved word.
   --------------------------------------------------------------------------- */

const HTML_ROW = `
<label class="src-switch-row">
  <span>
    <strong>Asset safe to use</strong>
    <small>Yes — the customer may use it</small>
  </span>
  <span class="switch">
    <input type="checkbox" role="switch" checked>
    <span class="switch-track"><span class="switch-knob"></span></span>
  </span>
</label>
`;

const HTML_FRAMED = `
<!-- inside #page-createsr; add .bad while the switch is off -->
<label class="src-switch-row bad">
  <span>
    <strong>Asset safe to use</strong>
    <small>No — the customer is told in the report</small>
  </span>
  <span class="switch">
    <input type="checkbox" role="switch">
    <span class="switch-track"><span class="switch-knob"></span></span>
  </span>
</label>
`;

const HTML_BARE = `
<label class="switch" title="Include in this report">
  <input type="checkbox" role="switch" checked aria-label="Include SN 2019-118842 in this report">
  <span class="switch-track"><span class="switch-knob"></span></span>
</label>
`;

/* ---- usage ---------------------------------------------------------------- */

function Overview() {
  return (
    <div className="prose">
      <p>
        A switch turns one setting on or off, and the change applies straight away. It is a mobile component: the
        Esco mobile app uses switches for every on or off choice. The web product has no switch; there, a labelled
        checkbox does the same job.
      </p>
      <Example
        title="Setting row"
        description="Mobile, Create service report. The whole row is the target. Try it."
        code={{ lang: "HTML", code: HTML_ROW }}
      >
        <SafeToUseRow />
      </Example>
      <p className="prose-p">
        Demos on this page render the mobile rules from <T>FSM-Mobile/css/components.css</T> and{" "}
        <T>create-sr.css</T>, with mobile light-theme colors.
      </p>
    </div>
  );
}

function WhenToUse() {
  return (
    <div className="prose">
      <ul className="dodont">
        <Do>Use a switch on mobile for a single on or off setting: include a unit in the report, mark an asset safe to use.</Do>
        <Do>Use a checkbox on web for the same need, and for picking several items on any platform.</Do>
        <Do>Use a radio group or segmented control when the choice has more than two named answers.</Do>
        <Dont>Use a two-option segmented control, or a checkbox, for on or off on mobile.</Dont>
      </ul>
    </div>
  );
}

function Anatomy() {
  return (
    <div className="prose">
      <Example title="Anatomy" description="Track, knob, and a hidden native input that keeps the semantics." layout="row">
        <BareSwitch label="Include in this report, off" />
        <BareSwitch label="Include in this report, on" initial />
      </Example>
      <Table
        head={["Part", "Rule"]}
        rows={[
          ["Input", <>Native <T>{'<input type="checkbox" role="switch">'}</T>, transparent, covering the whole control</>],
          ["Track", "52 × 32 capsule with a 2px edge. Fills with primary when on"],
          ["Knob", "16px when off, grows to 24px and slides right when on"],
          ["Label", "The setting name, before the switch. Optional state line below it"],
          ["Row", <>Optional <T>.src-switch-row</T> wrapper, so the full 48dp row takes the tap</>],
        ]}
      />
    </div>
  );
}

function Variants() {
  return (
    <div className="prose">
      <div className="examples two">
        <Example title="Setting row" description="Label, state line, switch. The row carries the tap." code={{ lang: "HTML", code: HTML_ROW }}>
          <SafeToUseRow />
        </Example>
        <Example
          title="Framed setting"
          description="Inside a unit card. Off turns the frame to the danger tint."
          code={{ lang: "HTML", code: HTML_FRAMED }}
        >
          <SafeToUseRow framed />
        </Example>
        <Example title="Beside a heading" description="No visible label of its own, so it is named with aria-label." code={{ lang: "HTML", code: HTML_BARE }}>
          <BareSwitch label="Include SN 2019-118842 in this report" initial />
        </Example>
        <Example title="Disabled" description="45% opacity on the track. Not operable.">
          <BareSwitch label="Include in this report, disabled" disabled />
          <BareSwitch label="Include in this report, disabled and on" initial disabled />
        </Example>
      </div>
    </div>
  );
}

function Behavior() {
  return (
    <div className="prose">
      <ul className="dev-notes">
        <li>The change applies at once. Turning a unit off collapses it to “Not included in this report”.</li>
        <li>A state line under the label can restate the result in words, so the meaning never rests on the knob position alone.</li>
        <li>The knob slides and grows over 160ms. Reduced motion removes the transition.</li>
        <li>Keyboard focus draws a 2px primary outline 3px outside the track.</li>
        <li>Disabled lowers the track to 45% opacity.</li>
      </ul>
    </div>
  );
}

/* ---- style ---------------------------------------------------------------- */

function Measurements() {
  return (
    <div className="prose">
      <p>
        Every number below is read from the mobile stylesheet, not typed by hand. Build to these numbers, not to how the
        picture looks. The track is a pill. The knob is a circle: 16 across when off, 24 when on.
      </p>
      <SpecSheet
        title="Track, off and on"
        description="The track keeps its size. Only the fill and the knob change."
        targets={[
          { sel: '[data-s="off"] .switch-track', name: "Track, off", width: "fixed" },
          { sel: '[data-s="on"] .switch-track', name: "Track, on", width: "fixed", marks: true },
        ]}
      >
        <SwitchPairSpec />
      </SpecSheet>
      <SpecSheet
        title="Setting row"
        description="Create service report. The row fills the width and is at least 48 tall."
        scale={1}
        targets={[{ sel: ".src-switch-row", name: "Setting row", width: "fill" }]}
      >
        <div style={{ width: 360 }}>
          <SafeToUseRow />
        </div>
      </SpecSheet>
    </div>
  );
}

function Screens() {
  return (
    <ScreenWidths
      rows={[
        { screen: "desktop", width: WEB_SCREENS.desktop, change: "The web product has no switch. Use a labelled checkbox." },
        { screen: "laptop", width: WEB_SCREENS.laptop, same: true },
        { screen: "tablet", width: WEB_SCREENS.tablet, same: true },
        { screen: "phone", width: WEB_SCREENS.phone, same: true },
        { screen: "mobile-app", width: WEB_SCREENS.app, change: "The switch lives here: a 52 × 32 track in a row at least 48 tall. The whole row takes the tap." },
      ]}
    />
  );
}

function StyleColor() {
  return (
    <Table
      head={["Part", "Off", "On"]}
      rows={[
        ["Track fill", <T>--surface-2</T>, <T>--esco-blue</T>],
        ["Track edge", <T>--outline-strong</T>, <T>--esco-blue</T>],
        ["Knob", <T>--outline-strong</T>, <T>--surface</T>],
        ["Focus ring", <T>--esco-blue</T>, <T>--esco-blue</T>],
        ["Row divider", <T>--outline</T>, <T>--outline</T>],
        ["State line", <T>--on-surface-var</T>, <T>--on-surface-var</T>],
        ["Framed row, off", <><T>--danger</T> edge on the danger tint</>, "—"],
      ]}
    />
  );
}

function StyleSpec() {
  return (
    <Table
      head={["Property", "Value"]}
      rows={[
        ["Track", "52 × 32, fully rounded, 2px edge, 3px inner padding"],
        ["Knob", "16 off, 24 on; moves 21 to the right"],
        ["Row height", <>At least <T>--touch</T> 48</>],
        ["Row padding", <><T>--space-12</T> 12 top and bottom; framed: 12 × 16, radius 12</>],
        ["Label to switch gap", <><T>--space-12</T> 12</>],
        ["Label", "15 · 500"],
        ["State line", "13 · 400, line height 1.5"],
        ["Focus ring", "2px, 3px offset"],
        ["Disabled", "45% opacity"],
        ["Motion", "160ms"],
      ]}
    />
  );
}

/* ---- code ----------------------------------------------------------------- */

function CodeWeb() {
  return (
    <div className="prose">
      <p>
        These classes live in the mobile web prototype (<T>FSM-Mobile/css/components.css</T>), not in the web product
        stylesheet. On web, use a labelled checkbox.
      </p>
      <Code title="HTML (mobile)" lang="html">{HTML_ROW + HTML_BARE}</Code>
      <Code title="React" lang="tsx">{`
import { Switch } from "@/components/ui/Switch";

<Switch checked={safe} onChange={setSafe} description={safe ? "Yes — the customer may use it" : "No — the customer is told in the report"}>
  Asset safe to use
</Switch>

<Switch checked={unit.on} onChange={toggleUnit} aria-label={\`Include \${unit.sn} in this report\`} />
`}</Code>
      <Table
        head={["Prop", "Type", "Default"]}
        rows={[
          [<T>checked</T>, <T>boolean</T>, <T>false</T>],
          [<T>onChange</T>, <T>(checked: boolean) =&gt; void</T>, "—"],
          [<T>children</T>, <T>ReactNode</T>, "— (label)"],
          [<T>description</T>, <T>ReactNode</T>, "—"],
          [<T>aria-label</T>, <T>string</T>, "— (only without a visible label)"],
          [<T>disabled</T>, <T>boolean</T>, <T>false</T>],
        ]}
      />
      <ul className="dev-notes">
        <li>Keep the native checkbox and add <T>role="switch"</T>. The mobile prototype omits the role today, so it is announced as a checkbox.</li>
      </ul>
    </div>
  );
}

function CodeFlutter() {
  return (
    <Code title="Flutter" lang="dart">{`
SwitchListTile(
  value: safe,
  onChanged: (v) => setState(() => safe = v),
  title: const Text('Asset safe to use'),
  subtitle: Text(safe ? 'Yes — the customer may use it' : 'No — the customer is told in the report'),
);

// no visible label: name it for TalkBack and VoiceOver
Semantics(
  label: 'Include \${unit.sn} in this report',
  child: Switch(value: unit.on, onChanged: toggleUnit),
);
// Switch.adaptive gives the Cupertino look on iOS
`}</Code>
  );
}

function CodeIos() {
  return (
    <Code title="SwiftUI" lang="swift">{`
Toggle(isOn: $safe) {
    Text("Asset safe to use").font(.escoBody)
    Text(safe ? "Yes — the customer may use it" : "No — the customer is told in the report")
        .font(.escoMeta)
        .foregroundStyle(Color.escoTextSecondary)
}
.tint(.escoPrimary)

Toggle("Include \\(unit.sn) in this report", isOn: $unit.on)
    .labelsHidden()
    .tint(.escoPrimary)
`}</Code>
  );
}

/* ---- accessibility -------------------------------------------------------- */

function A11yKeyboard() {
  return (
    <Table
      head={["Key or gesture", "Action"]}
      rows={[
        ["Tab", "Moves focus to the switch"],
        ["Space", "Turns it on or off"],
        ["Double-tap (TalkBack, VoiceOver)", "Turns it on or off"],
      ]}
    />
  );
}

function A11yNames() {
  return (
    <div className="prose">
      <ul className="dodont">
        <Do>Announce it as a switch: <T>role="switch"</T> on web, <T>Switch</T> in Flutter, <T>Toggle</T> in SwiftUI.</Do>
        <Do>Name the setting, not the state. “Asset safe to use”, read with on or off.</Do>
        <Do>Wrap the row in the label so the 48dp row is the target and the label is the name.</Do>
        <Dont>Change the label text to say the state, such as Active and Inactive. The state is already announced.</Dont>
      </ul>
    </div>
  );
}

function A11yContrast() {
  return (
    <Table
      head={["Pair (mobile, light)", "Ratio", "Requirement"]}
      rows={[
        [<><T>--outline-strong</T> track edge and knob on white</>, "3.3:1", "3:1 non-text"],
        [<><T>--esco-blue</T> track on white</>, "9.6:1", "3:1 non-text"],
        [<>White knob on <T>--esco-blue</T></>, "9.6:1", "3:1 non-text"],
        [<><T>--on-surface-var</T> state line on white</>, "5.5:1", "4.5:1 text"],
        ["Focus ring on white", "9.6:1", "3:1 non-text"],
      ]}
    />
  );
}

export const switchComponent: ComponentContent = {
  lead: "Turns one setting on or off, and applies it at once. A mobile component; web uses a labelled checkbox.",
  art: SwitchArt,
  usage: [
    { id: "overview", title: "Overview", body: <Overview /> },
    { id: "when-to-use", title: "When to use", body: <WhenToUse /> },
    { id: "anatomy", title: "Anatomy", body: <Anatomy /> },
    { id: "variants", title: "Variants", body: <Variants /> },
    { id: "behavior", title: "Behavior and states", body: <Behavior /> },
    {
      id: "related",
      title: "Related",
      body: <p className="prose-p">Checkbox for on or off on web and for picking several items; Radio button and Segmented control for named answers.</p>,
      more: { href: "/components/checkbox", label: "Checkbox" },
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
