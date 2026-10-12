import { Example } from "@/components/demo/Example";
import { Ic } from "@/components/demo/Ic";
import { SpecSheet } from "@/components/demo/SpecSheet";
import { ScreenWidths, WEB_SCREENS } from "@/components/demo/ScreenWidths";
import { SelectArt } from "@/components/art/select";
import { Code, Do, Dont, T, Table } from "../dev-kit";
import { EntityPickerDemo } from "./select.demo";
import type { ComponentContent } from "./types";

/* ---------------------------------------------------------------------------
   Select — facts from DESIGN_SYSTEM.md › Text fields and selects and
   › Component equivalence, styles.css (select.finp, .entity-control,
   .menu.entity-menu, .em-*, .sf-ent, .selbox), entity-picker.js, and
   FSM-Mobile COMPONENT_SYSTEM.md › Bottom sheet.
   --------------------------------------------------------------------------- */

const HTML_SELECT = `
<div class="field">
  <label for="engineer">Service engineer</label>
  <select id="engineer" class="finp" aria-describedby="engineer-help">…</select>
  <p id="engineer-help" class="fhelp">One engineer per day in the selected range.</p>
</div>
`;

const HTML_ENTITY = `
<!-- entity-picker.js upgrades every .entity-control select into the searchable menu -->
<label class="entity-control">
  <span class="sr-only">Esco entity</span>
  <!-- ic('building', 14) -->
  <select aria-label="Esco entity" onchange="setEntity(this.value)">
    <option value="All Entities (Esco Lifesciences Group)">All entities</option>
    <option value="Esco Micro Pte. Ltd.">Esco Micro Pte. Ltd.</option>
    …
  </select>
  <!-- ic('down', 12) -->
</label>
`;

const HTML_MENU = `
<!-- rendered by entity-picker.js while open -->
<div class="menu entity-menu" role="dialog" aria-label="Esco entity">
  <div class="em-search">
    <svg class="ic" width="14" height="14">…</svg>
    <input class="finp" placeholder="Search entity…" aria-label="Search entity" autocomplete="off">
  </div>
  <div class="em-list" role="listbox" aria-label="Entities">
    <button type="button" class="sf-ent on" role="option" aria-selected="true"><span>All entities</span><svg class="ic">…</svg></button>
    <button type="button" class="sf-ent" role="option" aria-selected="false"><span>Esco Micro Pte. Ltd.</span></button>
  </div>
  <div class="em-empty" hidden>No entity matches</div>
</div>
`;

const HTML_SELBOX = `
<button type="button" class="selbox" aria-haspopup="menu" aria-expanded="false">
  <span class="lbl">All statuses</span>
  <!-- ic('down', 12) -->
</button>
<!-- while its menu is open: class="selbox open" aria-expanded="true" -->
`;

/* ---- usage ---------------------------------------------------------------- */

function Overview() {
  return (
    <div className="prose">
      <p>
        A select picks one value from a known list. In forms it is a native select with the field styling. Scoping a whole
        module to an entity uses the entity control, which opens a searchable list.
      </p>
      <Example title="Form select" description="Label above, helper below." layout="stack" bg="white" code={{ lang: "HTML", code: HTML_SELECT }}>
        <div className="field" style={{ width: 320 }}>
          <label htmlFor="ov-eng">Service engineer</label>
          <select id="ov-eng" className="finp" defaultValue="Alejandro Cruz" aria-describedby="ov-eng-help">
            <option>Alejandro Cruz</option>
            <option>Aisha Al-Farsi</option>
          </select>
          <p id="ov-eng-help" className="fhelp">
            One engineer per day in the selected range.
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
        <Do>Use a select when the user picks exactly one value from a fixed list.</Do>
        <Do>Use the entity control to scope a module. It sits beside the page title, before the primary action.</Do>
        <Do>Start entity scope at <T>All entities</T>, using the Service Report legal entity set.</Do>
        <Do>Use a neutral first value such as <T>All statuses</T> for a filter that can be off.</Do>
        <Dont>Build a module-specific entity dropdown. Add the <T>.entity-control</T> markup and an <T>onchange</T> handler.</Dont>
        <Dont>Use a select for free text, or for a list long enough to need search without the searchable menu.</Dont>
      </ul>
    </div>
  );
}

function Anatomy() {
  return (
    <div className="prose">
      <Example title="Entity control" description="Building icon, entity select, trailing chevron. Open it to see the menu." layout="none" bg="white" minHeight={460}>
        <EntityPickerDemo />
      </Example>
      <Table
        head={["Part", "Rule"]}
        rows={[
          ["Control", <><T>{"<label class=\"entity-control\">"}</T> with a visually hidden name</>],
          ["Leading icon", <>Shared <T>building</T> icon, 14px</>],
          ["Select", <>Native <T>{"<select>"}</T>. First visible option is <T>All entities</T></>],
          ["Trailing chevron", <>Shared <T>down</T> icon, 12px. Marks the disclosure</>],
          ["Menu search", <><T>.em-search</T> with <T>Search entity…</T>, focused when the menu opens</>],
          ["Options", <><T>.sf-ent</T> rows. The current entity is tinted and carries a check</>],
          ["Empty state", <><T>.em-empty</T>: <T>No entity matches</T></>],
        ]}
      />
    </div>
  );
}

function Variants() {
  return (
    <div className="prose">
      <div className="examples two">
        <Example title="Form select" description="Native select, 40px, chevron at the right edge." layout="stack" bg="white" code={{ lang: "HTML", code: HTML_SELECT }}>
          <div className="field" style={{ width: "100%" }}>
            <label htmlFor="v-st">Schedule status</label>
            <select id="v-st" className="finp" defaultValue="Tentative">
              <option>Tentative</option>
              <option>Confirmed</option>
            </select>
          </div>
        </Example>
        <Example title="Dropdown trigger" description="A button that opens a menu. It looks like a control at rest." code={{ lang: "HTML", code: HTML_SELBOX }}>
          <button type="button" className="selbox" aria-haspopup="menu" aria-expanded="false">
            <span className="lbl">All statuses</span>
            <Ic n="down" s={12} />
          </button>
          <button type="button" className="selbox open" aria-haspopup="menu" aria-expanded="true">
            <span className="lbl">Confirmed</span>
            <Ic n="down" s={12} />
          </button>
        </Example>
      </div>
      <Example
        title="Entity control"
        description="The searchable entity picker. Type to narrow the list."
        layout="none"
        bg="white"
        minHeight={460}
        code={[
          { lang: "HTML", label: "Show control HTML", code: HTML_ENTITY },
          { lang: "HTML", label: "Show menu HTML", code: HTML_MENU },
        ]}
      >
        <EntityPickerDemo />
      </Example>
    </div>
  );
}

function Behavior() {
  return (
    <div className="prose">
      <Example title="States" description="Rest, disabled, and the open dropdown trigger." layout="row" bg="white">
        <div className="field" style={{ width: 200 }}>
          <label htmlFor="st-r">Rest</label>
          <select id="st-r" className="finp" defaultValue="Tentative">
            <option>Tentative</option>
            <option>Confirmed</option>
          </select>
        </div>
        <div className="field" style={{ width: 200 }}>
          <label htmlFor="st-d">Disabled</label>
          <select id="st-d" className="finp" disabled defaultValue="Confirmed">
            <option>Confirmed</option>
          </select>
        </div>
      </Example>
      <ul className="dev-notes">
        <li>Hover darkens the border. Focus draws the 2px primary ring, like every field.</li>
        <li>A dropdown trigger keeps an open state while its menu is up: primary tint, accent border, and a flipped chevron.</li>
        <li>The entity control opens on click, Enter, Space, the arrow keys, F4, or Alt+Down. It never shows the native list.</li>
        <li>Choosing an entity sets the select’s value and fires its own change event, so the module’s handler does the work.</li>
        <li>The menu closes on Escape, Tab, a click outside, scroll, or window resize. Escape returns focus to the control.</li>
        <li>Errors follow the text field: an error border plus a message that says what to fix.</li>
        <li>Disabled selects drop to 50% opacity and ignore the pointer.</li>
        <li>On mobile, every “pick one” opens a bottom sheet with <T>.sheet-option</T> rows, never a pushed page.</li>
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
      <SpecSheet title="Form select" description="The select fills its column, like a text field." targets={[{ sel: "select.finp", name: "Select, resting", width: "fill" }]}>
        <div className="field" style={{ width: 320 }}>
          <label htmlFor="ms-eng">Service engineer</label>
          <select id="ms-eng" className="finp" defaultValue="Alejandro Cruz">
            <option>Alejandro Cruz</option>
            <option>Aisha Al-Farsi</option>
          </select>
        </div>
      </SpecSheet>
      <SpecSheet title="Entity control" description="Rounded rectangle, not a pill. Grows with the entity name up to 230 px." targets={[{ sel: ".entity-control", name: "Entity control" }]}>
        <label className="entity-control">
          <span className="sr-only">Esco entity</span>
          <Ic n="building" s={14} />
          <select aria-label="Esco entity" defaultValue="all">
            <option value="all">All entities</option>
          </select>
          <Ic n="down" s={12} />
        </label>
      </SpecSheet>
      <SpecSheet
        title="Entity menu, open"
        description="The searchable list the entity control opens."
        scale={1}
        targets={[
          { sel: ".entity-menu", name: "Entity menu" },
          { sel: ".em-search input", name: "Search field in the menu", width: "fill" },
          { sel: ".sf-ent.on", name: "Current entity row", width: "fill" },
          { sel: ".sf-ent:not(.on)", name: "Other entity row", width: "fill" },
        ]}
      >
        <div className="menu entity-menu" role="dialog" aria-label="Esco entity">
          <div className="em-search">
            <Ic n="search" s={14} />
            <input className="finp" placeholder="Search entity…" aria-label="Search entity" autoComplete="off" />
          </div>
          <div className="em-list" role="listbox" aria-label="Entities">
            <button type="button" className="sf-ent on" role="option" aria-selected="true">
              <span>All entities</span>
              <Ic n="check" s={14} />
            </button>
            <button type="button" className="sf-ent" role="option" aria-selected="false">
              <span>Esco Micro Pte. Ltd.</span>
            </button>
            <button type="button" className="sf-ent" role="option" aria-selected="false">
              <span>Esco Philippines, Inc.</span>
            </button>
          </div>
        </div>
      </SpecSheet>
      <SpecSheet title="Dropdown trigger" description="Resting and open." targets={[{ sel: ".selbox:not(.open)", name: "Dropdown trigger, resting" }, { sel: ".selbox.open", name: "Dropdown trigger, open" }]}>
        <div style={{ display: "flex", gap: 16 }}>
          <button type="button" className="selbox" aria-haspopup="menu" aria-expanded="false">
            <span className="lbl">All statuses</span>
            <Ic n="down" s={12} />
          </button>
          <button type="button" className="selbox open" aria-haspopup="menu" aria-expanded="true">
            <span className="lbl">Confirmed</span>
            <Ic n="down" s={12} />
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
        { screen: "tablet", width: WEB_SCREENS.tablet, same: true },
        { screen: "phone", width: WEB_SCREENS.phone, change: "The entity control grows to 44 px tall. It stays at most 230 px wide, or the screen width minus 32 px if that is less." },
        { screen: "mobile-app", width: WEB_SCREENS.app, change: "Every pick-one opens a bottom sheet over the screen, with full-width option rows. Select fields are at least 52 px tall with 12 px corners." },
      ]}
    />
  );
}

function StyleColor() {
  return (
    <Table
      head={["Part", "Rest", "Hover", "Focus or open"]}
      rows={[
        ["Form select border", <T>--border-input</T>, <T>--border-hover</T>, <>2px <T>--primary</T> ring</>],
        ["Form select text", <T>--fg</T>, <T>--fg</T>, <T>--fg</T>],
        ["Entity control", <>White, border <T>--border</T>, text <T>--fg-2</T></>, <><T>--muted</T>, border <T>--border-hover</T></>, <><T>--primary-50</T>, border <T>--border-hover</T></>],
        ["Entity icons", <T>--fg-3</T>, <T>--fg-3</T>, <T>--fg-3</T>],
        ["Entity option", <T>--fg-2</T>, <T>--muted</T>, <>Selected: <T>--primary-50</T> fill, <T>--primary</T> text and check</>],
        ["Dropdown trigger", <>White, border <T>--border</T>, text <T>--fg-2</T></>, <><T>--muted</T>, border <T>--border-hover</T></>, <><T>--primary-50</T>, border <T>--navy-active</T>, text <T>--primary</T></>],
        ["Menu surface", <>White, border <T>--border</T>, <T>--shadow-lg</T></>, "—", "—"],
      ]}
    />
  );
}

function StyleSpec() {
  return (
    <Table
      head={["Property", "Form select", "Entity control", "Dropdown trigger"]}
      rows={[
        ["Height", <><T>--h-lg</T> 40</>, <>34; 44 below 640px</>, <><T>--h-md</T> 36</>],
        ["Padding", "0 36 0 12", "0 30 0 12", "0 12"],
        ["Radius", <><T>--radius-field</T> 8</>, <><T>--radius-field</T> 8</>, <><T>--radius-field</T> 8</>],
        ["Font", <><T>--fs-body</T> 13.5</>, <><T>--fs-sub</T> 12.5 · 500</>, "12.5 · 500"],
        ["Icons", "16 chevron, 12 from the right", "14 building, 12 chevron", "Trailing chevron"],
        ["Max width", "Fills its column", "230", "—"],
        ["Menu", "Native list", <>Min width 300, max height min(70vh, 440), padding 8</>, <><T>.menu</T>, radius <T>--radius-card</T> 10</>],
        ["Menu search", "—", <>36 high, 12.5, icon 14</>, "—"],
        ["Mobile", <>Field min 52, radius 12, bottom sheet list</>, "—", "—"],
      ]}
    />
  );
}

/* ---- code ----------------------------------------------------------------- */

function CodeWeb() {
  return (
    <div className="prose">
      <Code title="HTML" lang="html">{HTML_SELECT + HTML_ENTITY}</Code>
      <Code title="React" lang="tsx">{`
<div className="field">
  <label htmlFor={id}>Service engineer</label>
  <select id={id} className="finp" value={engineer} onChange={(e) => setEngineer(e.target.value)}>
    {engineers.map((e) => <option key={e.id} value={e.id}>{e.name}</option>)}
  </select>
</div>

{/* entity-picker.js turns this into the searchable menu */}
<label className="entity-control">
  <span className="sr-only">Esco entity</span>
  <Ic n="building" s={14} />
  <select aria-label="Esco entity" value={entity} onChange={(e) => setEntity(e.target.value)}>
    <option value={ALL_ENTITIES}>All entities</option>
    {ENTITY_OPTIONS.map((e) => <option key={e.n} value={e.n}>{e.n}</option>)}
  </select>
  <Ic n="down" s={12} />
</label>
`}</Code>
      <Table
        head={["Attribute", "Element", "Purpose"]}
        rows={[
          [<T>className="finp"</T>, <T>select</T>, "Form select styling, 40px"],
          [<T>className="entity-control"</T>, <T>label</T>, "Entity scope wrapper. Its select is upgraded to the searchable menu"],
          [<T>aria-label</T>, <T>select</T>, "Name when no visible label is present (entity control)"],
          [<T>onChange</T>, <T>select</T>, "Fires for native and menu choices alike"],
        ]}
      />
    </div>
  );
}

function CodeFlutter() {
  return (
    <Code title="Flutter" lang="dart">{`
// Every "pick one" opens a bottom sheet over the current screen.
Future<String?> pickEntity(BuildContext context, String current) {
  return showModalBottomSheet<String>(
    context: context,
    isScrollControlled: true,
    showDragHandle: true,
    builder: (context) => ListView(
      children: [
        for (final e in entities)
          ListTile(
            title: Text(e),
            selected: e == current,
            trailing: e == current ? const Icon(Icons.check) : null,
            onTap: () => Navigator.pop(context, e),
          ),
      ],
    ),
  );
}

// Searchable list in a form: Material 3 DropdownMenu
DropdownMenu<String>(
  label: const Text('Entity'),
  enableFilter: true,
  requestFocusOnTap: true,
  dropdownMenuEntries: [for (final e in entities) DropdownMenuEntry(value: e, label: e)],
  onSelected: (e) => setState(() => entity = e),
);
`}</Code>
  );
}

function CodeIos() {
  return (
    <Code title="SwiftUI" lang="swift">{`
Picker("Schedule status", selection: $status) {
    Text("Tentative").tag(Status.tentative)
    Text("Confirmed").tag(Status.confirmed)
}
.pickerStyle(.menu)
.tint(.escoPrimary)

// Entity scope: a sheet with a searchable list
.sheet(isPresented: $pickingEntity) {
    NavigationStack {
        List(filteredEntities, id: \\.self) { e in
            Button { entity = e; pickingEntity = false } label: {
                HStack { Text(e); Spacer(); if e == entity { Image(systemName: "checkmark") } }
            }
        }
        .searchable(text: $entityQuery, prompt: "Search entity…")
        .navigationTitle("Entity")
    }
    .presentationDetents([.medium, .large])
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
        ["Tab", "Moves focus to the select"],
        ["Enter, Space, Up, Down, F4, Alt+Down", "Opens the entity menu with focus in its search field"],
        ["Typing", "Narrows the entity list"],
        ["Down", "Moves to the next entity. Wraps to the first"],
        ["Up", "Moves to the previous entity. From the first, returns to the search field"],
        ["Enter in search", "Chooses the entity when one is left; otherwise moves to the first match"],
        ["Enter on an entity", "Chooses it and closes the menu"],
        ["Escape", "Closes the menu and returns focus to the control"],
        ["Tab in the menu", "Closes the menu"],
      ]}
    />
  );
}

function A11yNames() {
  return (
    <div className="prose">
      <ul className="dodont">
        <Do>Give the form select a real <T>{"<label for>"}</T>. Give the entity select <T>aria-label="Esco entity"</T>.</Do>
        <Do>Mark the open menu as a dialog with a <T>listbox</T> of <T>option</T> rows and <T>aria-selected</T> on the current one.</Do>
        <Do>Set <T>aria-expanded</T> on the select while its menu is open.</Do>
        <Do>Show the selected entity with a tint and a check, not color alone.</Do>
        <Dont>Remove the native select. It keeps the value, the change event, and the name for assistive technology.</Dont>
      </ul>
    </div>
  );
}

function A11yContrast() {
  return (
    <Table
      head={["Pair", "Ratio", "Requirement"]}
      rows={[
        [<><T>--fg</T> on white</>, "11.6:1", "4.5:1 text"],
        [<><T>--fg-2</T> entity label on white</>, "8.4:1", "4.5:1 text"],
        [<><T>--fg-2</T> on <T>--primary-50</T> (focused control)</>, "7.4:1", "4.5:1 text"],
        [<><T>--primary</T> selected option on <T>--primary-50</T></>, "8.4:1", "4.5:1 text"],
        [<><T>--border-input</T> edge on white</>, "1.5:1", "Below 3:1. The label and chevron identify the control"],
        ["Focus ring on white", "9.6:1", "3:1 non-text"],
      ]}
    />
  );
}

export const select: ComponentContent = {
  lead: "Picks one value from a known list. Entity scope uses a searchable menu instead of the native list.",
  art: SelectArt,
  usage: [
    { id: "overview", title: "Overview", body: <Overview /> },
    { id: "when-to-use", title: "When to use", body: <WhenToUse /> },
    { id: "anatomy", title: "Anatomy", body: <Anatomy /> },
    { id: "variants", title: "Variants", body: <Variants /> },
    { id: "behavior", title: "Behavior and states", body: <Behavior /> },
    { id: "related", title: "Related", body: <p className="prose-p">Text field for typed values; Search for finding records; Menu for actions rather than values.</p>, more: { href: "/components/text-field", label: "Text field" } },
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
