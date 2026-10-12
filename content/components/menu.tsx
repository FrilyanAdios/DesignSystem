import { Example } from "@/components/demo/Example";
import { Ic } from "@/components/demo/Ic";
import { SpecSheet } from "@/components/demo/SpecSheet";
import { ScreenWidths, WEB_SCREENS } from "@/components/demo/ScreenWidths";
import { MenuArt } from "@/components/art/menu";
import { Code, Do, Dont, T, Table } from "../dev-kit";
import { EntityMenuDemo, ScheduleMenuDemo, StatusMenuDemo, TableOverflowDemo, WoMenuStyle } from "./menu.demo";
import type { ComponentContent } from "./types";

/* ---------------------------------------------------------------------------
   Menu — facts come from:
   - NPD-FSM/DESIGN_SYSTEM.md › Popovers and menus, Table toolbar and row actions,
     Status, badge, and editable state, Service Schedule guardrails, Responsive
   - NPD-FSM/.claude/skills/fsm-design/references/ux-rules.md
   - NPD-FSM/styles.css: .menu, .mgmt-menu, .mgmt-h, .mgmt-div, .stm, .statectl,
     .entity-menu, .selbox.trigger-open
   - NPD-FSM/script.js: openMenu(), menuToggle(), fitMenu(), closeMenus(),
     openScheduleMenu(), openStatusMenu(), openEntityMenu(); wo/wo-list.js
     woOpenTableMenu()
   - FSM-Mobile/js/menu-modal.js toggleMenu(), esco-fsm-prototype.html
     #scheduleActionsModal, css/sheet-system.css .action-sheet
   --------------------------------------------------------------------------- */

const HTML_MENU = `
<button type="button" class="sp-icn sm" aria-label="Manage schedule" title="Manage schedule"
        aria-haspopup="menu" aria-expanded="true" aria-controls="sched-menu">
  <!-- ic('more', 15) -->
</button>

<div class="mgmt-menu" id="sched-menu" role="menu" aria-label="Manage schedule"
     style="top:…px; left:…px; width:250px">
  <div class="mgmt-h" aria-hidden="true">Manage schedule</div>
  <button type="button" role="menuitem" tabindex="-1">Add work order</button>
  <button type="button" role="menuitem" tabindex="-1">Email schedule details</button>
  <div class="mgmt-div" role="separator"></div>
  <button type="button" role="menuitem" tabindex="-1">Close schedule</button>
  <button type="button" role="menuitem" tabindex="-1" class="danger">Cancel schedule</button>
</div>
`;

const HTML_OVERFLOW = `
<button type="button" class="icon-btn" aria-label="More table options" title="More table options"
        aria-haspopup="menu" aria-expanded="true" aria-controls="table-menu">
  <!-- ic('more', 16) -->
</button>

<div class="menu wo-menu" id="table-menu" role="menu" aria-label="More table options"
     style="position:fixed; top:…px; left:…px">
  <div role="group" aria-labelledby="rh-head">
    <div class="wo-menu-head" id="rh-head">Row height</div>
    <button type="button" role="menuitemradio" aria-checked="true" class="on" tabindex="-1">
      <!-- ic('grid', 14) --> <span>Comfortable</span>
    </button>
    <button type="button" role="menuitemradio" aria-checked="false" tabindex="-1">
      <!-- ic('list', 14) --> <span>Compact</span>
    </button>
  </div>
  <div class="wo-menu-sep" role="separator"></div>
  <button type="button" role="menuitem" tabindex="-1">
    <!-- ic('table', 14) --> <span>Show column filter row</span>
  </button>
</div>
`;

const HTML_STATUS = `
<button type="button" class="statectl b-revision" aria-haspopup="menu" aria-expanded="false"
        aria-label="Schedule status: Tentative. Change status">
  <span class="d"></span>Tentative <!-- ic('down', 12) -->
</button>

<div class="mgmt-menu stm" role="menu" aria-label="Schedule status" style="top:…px; right:…px; width:232px">
  <div class="mgmt-h" aria-hidden="true">Schedule status</div>
  <button type="button" role="menuitemradio" aria-checked="true" class="on">
    <span class="stm-dot st-revision"></span>Tentative <!-- ic('checkmini', 13) -->
  </button>
  <button type="button" role="menuitemradio" aria-checked="false">
    <span class="stm-dot st-issued"></span>Confirmed
  </button>
</div>
`;

const HTML_ENTITY = `
<button type="button" class="selbox trigger-open" aria-haspopup="dialog" aria-expanded="true"
        aria-label="Entity: Esco Micro Pte. Ltd.. Change entity">
  <!-- ic('building', 14) --><span>Esco Micro Pte. Ltd.</span><!-- ic('down', 12) -->
</button>

<div class="menu entity-menu" role="dialog" aria-label="Entity" style="position:fixed; top:…px; right:…px">
  <div class="em-search">
    <!-- ic('search', 14) -->
    <input class="finp" placeholder="Search entity…" aria-label="Search entity">
  </div>
  <div class="em-list" role="menu" aria-label="Entities">
    <button type="button" class="sf-ent on" role="menuitemradio" aria-checked="true">
      <span>Esco Micro Pte. Ltd.</span><!-- ic('checkmini', 14) -->
    </button>
    …
  </div>
  <div class="em-empty" role="status" hidden>No entity matches</div>
</div>
`;

const HTML_SHEET = `
<!-- FSM-Mobile: a kebab opens an action sheet; rows copy the menu's items -->
<div class="modal" id="scheduleActionsModal" role="dialog" aria-modal="true"
     aria-labelledby="scheduleActionsTitle" hidden>
  <div class="modal-backdrop" onclick="closeModal('scheduleActionsModal')"></div>
  <div class="modal-sheet sheet action-sheet">
    <div class="sheet-grabber"></div>
    <header class="sheet-head"><h2 id="scheduleActionsTitle">Schedule actions</h2></header>
    <div class="sheet-body">
      <button class="sheet-option ripple">Create service report</button>
      <button class="sheet-option ripple">View draft reports</button>
    </div>
    <footer class="sheet-foot">
      <button class="sheet-cancel ripple" onclick="closeModal('scheduleActionsModal')">Cancel</button>
    </footer>
  </div>
</div>
`;

/* ---- shared static markup ------------------------------------------------- */

function ScheduleMenuStatic() {
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button
        type="button"
        className="sp-icn sm"
        aria-label="Manage schedule"
        aria-haspopup="menu"
        aria-expanded="true"
      >
        <Ic n="more" s={15} />
      </button>
      <div
        className="mgmt-menu"
        role="menu"
        aria-label="Manage schedule"
        style={{ position: "absolute", top: "calc(100% + 8px)", left: 0, width: 250 }}
      >
        <div className="mgmt-h" aria-hidden="true">
          Manage schedule
        </div>
        <button type="button" role="menuitem" tabIndex={-1}>
          Add work order
        </button>
        <button type="button" role="menuitem" tabIndex={-1}>
          Email schedule details
        </button>
        <div className="mgmt-div" role="separator" />
        <button type="button" role="menuitem" tabIndex={-1}>
          Close schedule
        </button>
        <button type="button" className="danger" role="menuitem" tabIndex={-1}>
          Cancel schedule
        </button>
      </div>
    </div>
  );
}

/* ---- usage ---------------------------------------------------------------- */

function Overview() {
  return (
    <div className="prose">
      <p>
        A menu is a short list of actions or one choice, anchored to the button that opens it. Use it to keep secondary
        actions out of the way: the actions on one record, display options for a table, or a status.
      </p>
      <Example
        title="Menu"
        description="Open it with a click, Enter, or Down arrow. Arrow keys move; Escape closes and returns focus."
        layout="stack"
        minHeight={300}
        code={{ lang: "HTML", code: HTML_MENU }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, width: 280, justifyContent: "flex-end" }}>
          <ScheduleMenuDemo />
        </div>
      </Example>
    </div>
  );
}

function WhenToUse() {
  return (
    <div className="prose">
      <ul className="dodont">
        <Do>Use a menu for the record actions of one item, opened from its header or detail view.</Do>
        <Do>Separate a destructive item with a divider, last in the list. It opens the confirmation dialog.</Do>
        <Do>Keep a table’s overflow to display preferences only: row height and the column filter row.</Do>
        <Dont>Put a kebab on every row when the row has one clear destination. Make the row the route and put record actions on the detail screen.</Dont>
        <Dont>Let a menu item change status or delete straight away. A context menu never mutates status directly.</Dont>
        <Dont>Repeat refresh, reset table, or table settings in the overflow. They already have their own controls.</Dont>
        <Dont>Make a read-only status look like a dropdown. Only a status the user can change gets a chevron.</Dont>
      </ul>
    </div>
  );
}

function Anatomy() {
  return (
    <div className="prose">
      <Example title="Anatomy" description="Trigger, optional header, items, divider, destructive item." layout="stack" minHeight={300}>
        <ScheduleMenuStatic />
      </Example>
      <Table
        head={["Part", "Rule"]}
        rows={[
          ["Trigger", <>A labeled button with a chevron, or an icon-only kebab with an accessible name. Carries <T>aria-haspopup="menu"</T> and <T>aria-expanded</T></>],
          ["Surface", <>White, 1px <T>--border</T>, <T>--radius-card</T>, <T>--shadow-lg</T></>],
          ["Header", "Optional. Names the menu in one short line"],
          ["Item", "Sentence case, verb first. Optional 14px icon before the label"],
          ["Divider", "Separates safe items from items that change the record’s state"],
          ["Destructive item", <>Last, in the error color. Opens a confirmation</>],
        ]}
      />
    </div>
  );
}

function Variants() {
  return (
    <div className="prose">
      <h3>Record actions</h3>
      <p>
        The kebab on a record’s header opens its actions. Safe items come first. A divider separates the items that change
        the record’s state.
      </p>
      <Code title="Record actions" lang="html">{HTML_MENU}</Code>

      <h3>Table overflow</h3>
      <p>
        The last control in a register toolbar. It holds how the table is drawn and nothing that filters data. Table
        settings and refresh keep their own buttons.
      </p>
      <Example
        title="Table overflow"
        description="The toolbar order: export, table settings, then overflow."
        layout="stack"
        minHeight={240}
        code={{ lang: "HTML", code: HTML_OVERFLOW }}
      >
        <TableOverflowDemo />
      </Example>

      <h3>Status selector</h3>
      <p>
        A status the user can change is a <T>.statectl</T>: a compact rounded rectangle with a chevron. It opens a menu
        of the allowed states. The schedule status menu holds only Tentative and Confirmed. Closing and cancelling go
        through their own workflows.
      </p>
      <Example
        title="Status selector"
        description="The current state is checked. Choosing applies it and closes the menu."
        layout="stack"
        minHeight={200}
        code={{ lang: "HTML", code: HTML_STATUS }}
      >
        <StatusMenuDemo />
      </Example>

      <h3>Entity menu</h3>
      <p>
        A long list of one choice gets a search field on top that narrows the list as you type. The panel is a dialog
        holding a menu, so focus starts in the search field.
      </p>
      <Example
        title="Entity menu"
        description="Type to narrow. Down arrow moves into the list."
        layout="stack"
        minHeight={460}
        code={{ lang: "HTML", code: HTML_ENTITY }}
      >
        <EntityMenuDemo />
      </Example>

      <h3>Mobile action sheet</h3>
      <p>
        On the phone, a kebab opens an action sheet instead of a floating menu. Its rows reuse the sheet option row, and
        Cancel closes it.
      </p>
      <Code title="FSM-Mobile" lang="html">{HTML_SHEET}</Code>
    </div>
  );
}

function Behavior() {
  return (
    <div className="prose">
      <ul className="dev-notes">
        <li>Opens 6–8px below the trigger and is pulled back inside the viewport when it would overflow.</li>
        <li>The trigger shows an open state while the menu exists.</li>
        <li>Every menu is a toggle. The same trigger closes it; another trigger swaps it.</li>
        <li>Click outside or Escape closes it. Choosing an item closes it and runs the action.</li>
        <li>A long menu scrolls inside a 320px maximum height.</li>
        <li>A <T>.menu</T> opened from inside a dialog sits above it: z-index 84 over the scrim’s 78.</li>
      </ul>
      <h3>Responsive</h3>
      <ul className="dev-notes">
        <li>Below 780px, toolbars may move optional controls into the overflow menu.</li>
        <li>On the mobile app, kebab menus open as action sheets with large, full-width rows.</li>
      </ul>
    </div>
  );
}

/* ---- style ---------------------------------------------------------------- */

function OverflowMenuSpec() {
  return (
    <div>
      <WoMenuStyle />
      <div className="menu wo-menu" role="menu" aria-label="More table options">
        <div className="wo-menu-head">Row height</div>
        <button type="button" role="menuitemradio" aria-checked="true" className="on" tabIndex={-1}>
          <Ic n="grid" s={14} />
          <span>Comfortable</span>
        </button>
        <button type="button" role="menuitemradio" aria-checked="false" tabIndex={-1}>
          <Ic n="list" s={14} />
          <span>Compact</span>
        </button>
        <div className="wo-menu-sep" role="separator" />
        <button type="button" role="menuitem" tabIndex={-1}>
          <Ic n="table" s={14} />
          <span>Show column filter row</span>
        </button>
      </div>
    </div>
  );
}

function ScheduleMenuSpec() {
  return (
    <div className="mgmt-menu" role="menu" aria-label="Manage schedule" style={{ position: "static", width: 250 }}>
      <div className="mgmt-h" aria-hidden="true">
        Manage schedule
      </div>
      <button type="button" role="menuitem" tabIndex={-1}>
        Add work order
      </button>
      <button type="button" role="menuitem" tabIndex={-1}>
        Email schedule details
      </button>
      <div className="mgmt-div" role="separator" />
      <button type="button" className="danger" role="menuitem" tabIndex={-1}>
        Cancel schedule
      </button>
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
      <SpecSheet title="Table overflow menu" description="The .menu box, used for dropdowns and the table overflow." scale={1} targets={[{ sel: ".menu", name: "Menu box", width: "hug" }]}>
        <OverflowMenuSpec />
      </SpecSheet>
      <SpecSheet title="Menu item" description="One row in a .menu." targets={[{ sel: ".menu button:last-of-type", name: "Menu item", width: "fill" }]}>
        <OverflowMenuSpec />
      </SpecSheet>
      <SpecSheet
        title="Record actions menu"
        description="The Manage schedule menu."
        scale={1}
        targets={[
          { sel: ".mgmt-menu", name: "Record actions menu box", width: "fixed" },
          { sel: ".mgmt-h", name: "Menu header", width: "fill" },
        ]}
      >
        <ScheduleMenuSpec />
      </SpecSheet>
      <SpecSheet title="Record actions item" description="One row in the record actions menu." targets={[{ sel: ".mgmt-menu button", name: "Record actions item", width: "fill" }]}>
        <ScheduleMenuSpec />
      </SpecSheet>
      <SpecSheet title="Kebab trigger" description="The icon button that opens the record actions menu." targets={[{ sel: ".sp-icn", name: "Kebab trigger", width: "fixed" }]}>
        <button type="button" className="sp-icn sm" aria-label="Manage schedule" aria-haspopup="menu" aria-expanded="false">
          <Ic n="more" s={15} />
        </button>
      </SpecSheet>
      <SpecSheet title="Status selector" description="A status the user can change." targets={[{ sel: ".statectl", name: "Status selector", width: "hug" }]}>
        <button type="button" className="statectl b-revision" aria-haspopup="menu" aria-expanded="false" aria-label="Schedule status: Tentative. Change status">
          <span className="d" />
          Tentative
          <Ic n="down" s={12} />
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
        { screen: "tablet", width: WEB_SCREENS.tablet, change: "Below 780 px, toolbars may move optional controls into the overflow menu." },
        { screen: "phone", width: WEB_SCREENS.phone, same: true },
        { screen: "mobile-app", width: WEB_SCREENS.app, change: "A kebab opens an action sheet from the bottom, not a floating menu. Cancel closes it." },
      ]}
    />
  );
}

function StyleColor() {
  return (
    <Table
      head={["Part", "Background", "Border", "Text"]}
      rows={[
        ["Surface", "#FFFFFF", <T>--border</T>, "—"],
        ["Item", "transparent", "—", <T>--fg-2</T>],
        [<>Item, hover (<T>.menu</T>)</>, <T>--muted</T>, "—", <T>--fg-2</T>],
        [<>Item, hover (<T>.mgmt-menu</T>)</>, <T>--primary-50</T>, "—", <T>--primary</T>],
        ["Item, selected", <T>--primary-50</T>, "—", <><T>--primary</T> with a check</>],
        ["Header", <T>--muted</T>, <>bottom <T>--border</T></>, <T>--fg-2</T>],
        ["Divider", <T>--border</T>, "—", "—"],
        ["Destructive item", "transparent", "—", <><T>--error</T> or <T>--rejected-fg</T></>],
        ["Destructive item, hover", <T>--rejected-bg</T>, "—", <T>--rejected-fg</T>],
      ]}
    />
  );
}

function StyleSpec() {
  return (
    <Table
      head={["Property", ".menu", ".mgmt-menu"]}
      rows={[
        ["Width", "Minimum 190", "Set per menu, 230–250"],
        ["Maximum height", "320, scrolls", "—"],
        ["Padding", "6", "0, items run edge to edge"],
        ["Radius", <><T>--radius-card</T> 10</>, <><T>--radius-card</T> 10</>],
        ["Shadow", <T>--shadow-lg</T>, <T>--shadow-lg</T>],
        ["Item padding", "8 × 10", "11 × 14"],
        ["Item text", "13 · 400", "12.5 · 500"],
        ["Item radius", <><T>--radius-control</T> 6</>, "0, 1px rule between items"],
        ["Icon", "14, 8 gap", "—"],
        ["Header", "—", "11 × 14 padding, 11.5 · 700"],
        ["Offset from trigger", "6", "6–8"],
      ]}
    />
  );
}

function StyleStatus() {
  return (
    <Table
      head={["Part", "Value"]}
      rows={[
        ["Status selector", <><T>--statectl-h</T> 28 tall, 0 6 0 10 padding, <T>--radius-control</T> 6, <T>--statectl-fs</T> 11.5 · 600</>],
        ["Selector dot", "6, current color"],
        ["Menu dot", "8, the status family’s foreground"],
        ["Entity menu", "Minimum 300 wide, up to min(70vh, 440px) tall, 8 padding, 36 search field"],
      ]}
    />
  );
}

/* ---- code ----------------------------------------------------------------- */

function CodeWeb() {
  return (
    <div className="prose">
      <Code title="HTML" lang="html">{HTML_MENU}</Code>
      <Code title="React" lang="tsx">{`
import { Menu, MenuItem, MenuSeparator } from "@/components/ui/Menu";

<Menu label="Manage schedule" trigger={<IconButton label="Manage schedule" icon={<Ic n="more" s={15} />} />}>
  <MenuItem onSelect={addWorkOrder}>Add work order</MenuItem>
  <MenuItem onSelect={emailDetails}>Email schedule details</MenuItem>
  <MenuSeparator />
  <MenuItem onSelect={openCloseSchedule}>Close schedule</MenuItem>
  <MenuItem danger onSelect={openCancelConfirmation}>Cancel schedule</MenuItem>
</Menu>
`}</Code>
      <Table
        head={["Prop", "Type", "Default"]}
        rows={[
          [<T>label</T>, <T>string</T>, "—"],
          [<T>trigger</T>, <T>ReactElement</T>, "—"],
          [<T>align</T>, <T>"start" | "end"</T>, <T>"start"</T>],
          [<T>MenuItem.danger</T>, <T>boolean</T>, <T>false</T>],
          [<T>MenuItem.checked</T>, <T>boolean</T>, "— (makes it a radio item)"],
          [<T>MenuItem.onSelect</T>, <T>{"() => void"}</T>, "—"],
        ]}
      />
    </div>
  );
}

function CodeFlutter() {
  return (
    <Code title="Flutter" lang="dart">{`
// Phone: a kebab opens an action sheet
IconButton(
  tooltip: 'Schedule actions',
  icon: const Icon(Icons.more_vert),
  onPressed: () => showModalBottomSheet<void>(
    context: context,
    useSafeArea: true,
    showDragHandle: true,
    builder: (context) => const ScheduleActionsSheet(),
  ),
);

// Tablet and desktop: an anchored menu
MenuAnchor(
  builder: (context, controller, child) => IconButton(
    tooltip: 'Manage schedule',
    icon: const Icon(Icons.more_vert),
    onPressed: () => controller.isOpen ? controller.close() : controller.open(),
  ),
  menuChildren: [
    MenuItemButton(onPressed: addWorkOrder, child: const Text('Add work order')),
    MenuItemButton(onPressed: emailDetails, child: const Text('Email schedule details')),
    const Divider(),
    MenuItemButton(onPressed: confirmCancel, child: const Text('Cancel schedule')),
  ],
);
`}</Code>
  );
}

function CodeIos() {
  return (
    <Code title="SwiftUI" lang="swift">{`
Menu {
    Button("Add work order", action: addWorkOrder)
    Button("Email schedule details", action: emailDetails)
    Divider()
    Button("Close schedule", action: openCloseSchedule)
    Button("Cancel schedule", role: .destructive) { confirmingCancel = true } // opens .confirmationDialog
} label: {
    Label("Manage schedule", systemImage: "ellipsis.circle")
}

// Status selector: a Picker inside a Menu
Menu {
    Picker("Schedule status", selection: $status) {
        Text("Tentative").tag(Status.tentative)
        Text("Confirmed").tag(Status.confirmed)
    }
} label: {
    EscoStatusPill(status: status, showsChevron: true)
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
        ["Enter, Space, Down arrow", "On the trigger, opens the menu and focuses the first item, or the checked one"],
        ["Up arrow", "On the trigger, opens the menu and focuses the last item"],
        ["Down arrow, Up arrow", "Moves to the next or previous item, wrapping at the ends"],
        ["Home, End", "Moves to the first or last item"],
        ["Enter, Space", "Runs the focused item and closes the menu"],
        ["Escape", "Closes the menu. Focus returns to the trigger"],
        ["Tab", "Closes the menu and moves on"],
      ]}
    />
  );
}

function A11yNames() {
  return (
    <div className="prose">
      <ul className="dodont">
        <Do>Give the menu <T>role="menu"</T> and a name, and each item <T>role="menuitem"</T>.</Do>
        <Do>Use <T>menuitemradio</T> with <T>aria-checked</T> for one choice, such as a status or row height.</Do>
        <Do>Name a kebab trigger for what it opens: Manage schedule, More table options. Add a tooltip with the same words.</Do>
        <Do>Name a status selector with its current value and the action: Schedule status: Tentative. Change status.</Do>
        <Dont>Rely on the red color alone for a destructive item. Its label says what it does.</Dont>
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
          [<>Item <T>--fg-2</T> on white</>, "8.4:1", "4.5:1 text"],
          [<>Header <T>--fg-2</T> on <T>--muted</T></>, "8.0:1", "4.5:1 text"],
          [<>Hover <T>--primary</T> on <T>--primary-50</T></>, "8.4:1", "4.5:1 text"],
          [<>Destructive <T>--error</T> on white</>, "5.4:1", "4.5:1 text"],
          [<>Destructive hover <T>--rejected-fg</T> on <T>--rejected-bg</T></>, "4.6:1", "4.5:1 text"],
          [<>Tentative selector <T>--revision-fg</T> on <T>--revision-bg</T></>, "4.5:1", "4.5:1 text"],
        ]}
      />
      <p>
        Keyboard focus on an item shows the 2px <T>--primary</T> ring. Ratios are computed from the token values.
      </p>
    </div>
  );
}

export const menu: ComponentContent = {
  lead: "A short list of actions or one choice, anchored to its trigger. Destructive items confirm first.",
  art: MenuArt,
  usage: [
    { id: "overview", title: "Overview", body: <Overview /> },
    { id: "when-to-use", title: "When to use", body: <WhenToUse /> },
    { id: "anatomy", title: "Anatomy", body: <Anatomy /> },
    { id: "variants", title: "Variants", body: <Variants /> },
    { id: "behavior", title: "Behavior and states", body: <Behavior /> },
    {
      id: "related",
      title: "Related",
      body: <p className="prose-p">Popover for a choice that needs a header or a preview; Dialog for the confirmation a destructive item opens; Status pill for read-only status.</p>,
      more: { href: "/components/dialog", label: "Dialog" },
    },
  ],
  style: [
    { id: "measurements", title: "Measurements", body: <Measurements /> },
    { id: "screen-widths", title: "Screen widths", body: <Screens /> },
    { id: "color", title: "Color", body: <StyleColor /> },
    { id: "specifications", title: "Specifications", body: <><StyleSpec /><StyleStatus /></> },
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
