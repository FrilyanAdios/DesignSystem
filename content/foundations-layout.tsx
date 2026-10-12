import { AppWindow, Grid3x3, Laptop, Monitor, Ruler, Smartphone, Tablet, type LucideIcon } from "lucide-react";
import type { PageContent } from "./index";
import { Rule } from "./principles";
import { T, Table } from "./dev-kit";
import { SpacingSpec } from "./specs";

/* ---------------------------------------------------------------------------
   Foundations · Layout — spacing, layout and grid, responsive behavior.
   Shell geometry and breakpoints from NPD-FSM/DESIGN_SYSTEM.md; mobile
   values from FSM-Mobile/MATERIAL_SPACING.md.
   --------------------------------------------------------------------------- */

/* ============================================================================
   SPACING
   ============================================================================ */

function SpacingScale() {
  return (
    <div className="prose">
      <Rule icon={Ruler}>
        Every gap is a step on the <strong className="hl">4px scale</strong>, with an 8px rhythm for layout. If a value
        isn’t on the scale, it isn’t a spacing value.
      </Rule>
      <SpacingSpec standalone />
    </div>
  );
}

function SpacingRoles() {
  return (
    <div className="prose">
      <p>Pick spacing by relationship: the closer two things are in meaning, the closer they sit.</p>
      <Table
        head={["Relationship", "Web", "Mobile"]}
        rows={[
          ["Text and its metadata", "4", "4"],
          ["Label and its field", "8", "8"],
          ["Related controls in a group", "8", "8"],
          ["Icon and its label", "8–12", "8–12"],
          ["Between fields", "16", "16"],
          ["Card padding", "16", "16"],
          ["Between sections", "24", "24"],
          ["Page gutter", "24, or 16 below 640", "16, or 24 at 600 and wider"],
          ["Dialog or sheet body", "20–24", "24, content gap 16"],
        ]}
      />
    </div>
  );
}

function SpacingSizes() {
  return (
    <div className="prose">
      <Table
        head={["Height", "Web token", "Use"]}
        rows={[
          ["28", <T>--h-xs</T>, "In-cell control, micro button"],
          ["32", <T>--h-sm</T>, "Compact button, pager, compact select"],
          ["36", <T>--h-md</T>, "Toolbar control, segmented control, icon button"],
          ["40", <T>--h-lg</T>, "The default: input, select, button"],
          ["44", <T>--h-xl</T>, "Tab bar, large choice, touch on web"],
          ["48", <T>--ds-touch</T>, "Every touch target on mobile"],
          ["52", <T>--ds-field</T>, "Text field on mobile"],
        ]}
      />
      <p>
        Exceptions to the grid are deliberate: zero gap for joined controls such as a segmented control, OS safe-area
        insets, and 1–2px optical offsets.
      </p>
    </div>
  );
}

export const spacing: PageContent = {
  lead: "A 4px scale with an 8px rhythm, chosen by how closely two things relate, plus the control heights that sit on it.",
  art: "spacing",
  sections: [
    { id: "scale", title: "Scale", body: <SpacingScale /> },
    { id: "by-relationship", title: "Spacing by relationship", body: <SpacingRoles /> },
    { id: "control-heights", title: "Control heights", body: <SpacingSizes />, more: { href: "/foundations/design-tokens", label: "All size tokens" } },
  ],
};

/* ============================================================================
   LAYOUT AND GRID
   ============================================================================ */

function Shell() {
  return (
    <div className="prose">
      <Rule icon={AppWindow}>
        Every web module sits in the same shell: a <strong className="hl">64px navbar</strong>, a 240px sidebar, and the
        page. Modules change their destinations, never the geometry.
      </Rule>
      <div className="shell-demo" aria-hidden="true">
        <div className="sd-nav">Navbar · 64</div>
        <div className="sd-body">
          <div className="sd-side">
            Sidebar
            <span>240 · collapsed 72</span>
          </div>
          <div className="sd-page">
            <div className="sd-head">Page title · entity · primary action</div>
            <div className="sd-tool">Toolbar</div>
            <div className="sd-main">Content · 24 gutter</div>
          </div>
        </div>
      </div>
      <Table
        head={["Part", "Size", "Detail"]}
        rows={[
          ["Navbar", "64 tall", "Global; stays on every page"],
          ["Sidebar", "240, collapsed 72", "Nav items: 8 padding, 12 icon gap, 8 between items"],
          ["Sidebar below 900", "260 drawer", "Off-canvas, under the navbar. Same spacing as desktop"],
          ["Page gutter", "24, 16 below 640", <T>--gutter</T>],
          ["Page header", "Title left, primary action far right", "Entity scope sits before the primary action"],
        ]}
      />
    </div>
  );
}

function Regions() {
  return (
    <div className="prose">
      <p>
        The main content gets width before any side panel. A side panel that competes with the task collapses or hides,
        like the Work Order queue in split view.
      </p>
      <div className="split-demo" aria-hidden="true">
        <span style={{ flex: 40 }}>Information or form · 40%</span>
        <span style={{ flex: 60 }}>Document viewer · 60%</span>
      </div>
      <Table
        head={["Layout", "Rule"]}
        rows={[
          ["Report detail and edit", "40:60 on wide desktop, one divider, stacked below the split width"],
          ["Toolbar", "One row when it fits; 8 between related controls, whitespace or one divider between groups"],
          ["Long values", "Address, instructions, descriptions get a full-width row, not a narrow column"],
          ["Repeated items", "A table, not a stack of identical cards"],
          ["Dialog", "440–560 default, 620–760 wide, up to 1040; 24 viewport margin"],
        ]}
      />
    </div>
  );
}

function Hierarchy() {
  return (
    <div className="prose">
      <Rule icon={Grid3x3}>
        Alignment and whitespace create structure <strong className="hl">before</strong> borders and cards do.
      </Rule>
      <Table
        head={["Order", "A detail screen answers"]}
        rows={[
          ["1", "Where am I? Back action, identity, date"],
          ["2", "What is the state? Status and priority"],
          ["3", "Who and when? Engineer and schedule range"],
          ["4", "What work? Work order, unit, service jobs"],
          ["5", "What else? Address, contact, instructions, notes, tools"],
          ["6", "Anything related? Behind a disclosure"],
        ]}
      />
      <p>
        Repeated records follow one row grammar: icon or number, primary identity, then time or customer, then
        metadata, with status on the right.
      </p>
    </div>
  );
}

function MobileLayout() {
  return (
    <div className="prose">
      <Table
        head={["Part", "Rule"]}
        rows={[
          ["Structure", "Safe area, app bar, scrolling content, persistent bottom navigation"],
          ["Navigation", "Four destinations: Today, Modules, Notifications, Profile"],
          ["Gutter", "16; 24 when the app is 600 or wider"],
          ["Columns", "One; two only where content allows at 600 and wider"],
          ["Primary action", "Fixed bottom bar, above the home indicator"],
          ["Feedback", "Snackbar takes space above the navigation, never covers records"],
          ["Heights", "Natural. Nothing that holds text gets a fixed height"],
        ]}
      />
    </div>
  );
}

export const grid: PageContent = {
  lead: "One application shell, content-first regions, and a reading order that puts identity and state before everything else.",
  art: "grid",
  sections: [
    { id: "shell", title: "Application shell", body: <Shell />, more: { href: "/components/sidebar", label: "Sidebar" } },
    { id: "regions", title: "Content regions", body: <Regions /> },
    { id: "hierarchy", title: "Hierarchy and read order", body: <Hierarchy />, more: { href: "/get-started/designing", label: "For designers" } },
    { id: "mobile", title: "Mobile layout", body: <MobileLayout /> },
  ],
};

/* ============================================================================
   RESPONSIVE
   ============================================================================ */

const BREAKS: { icon: LucideIcon; at: string; label: string; what: string[] }[] = [
  { icon: Monitor, at: "≥ 1180", label: "Desktop", what: ["Full multi-panel layouts", "Split views side by side"] },
  { icon: Laptop, at: "< 1180", label: "Small laptop", what: ["Multi-column detail and stats collapse to one column"] },
  { icon: Tablet, at: "< 900", label: "Tablet", what: ["Sidebar becomes a 260 drawer", "Split views stack", "Tables scroll sideways"] },
  { icon: Tablet, at: "< 780", label: "Narrow tablet", what: ["Toolbars move optional controls into overflow"] },
  { icon: Smartphone, at: "< 640", label: "Phone", what: ["16 gutters", "Dialogs become full-width bottom sheets", "44 touch controls"] },
];

function Breakpoints() {
  return (
    <div className="prose">
      <Rule icon={AppWindow}>
        Reflow, <strong className="hl">don’t squeeze</strong>. When space runs out, change the layout and keep the
        hierarchy. Never shrink type or targets to fit.
      </Rule>
      <ol className="bp-list">
        {BREAKS.map(({ icon: Icon, at, label, what }) => (
          <li key={at}>
            <span className="bk-icon" aria-hidden="true">
              <Icon size={20} />
            </span>
            <span className="bp-at">{at}px</span>
            <strong>{label}</strong>
            <ul>
              {what.map((w) => (
                <li key={w}>{w}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Patterns() {
  return (
    <div className="prose">
      <Table
        head={["Element", "When space runs out"]}
        rows={[
          ["Table", "Scrolls horizontally, headers kept. Identity or status pinned only when it preserves context"],
          ["Pagination", "Below 600, hide Go to first, then let the footer scroll. Targets stay 40"],
          ["Toolbar", "Optional controls go to overflow; search, scope, and the primary action stay"],
          ["Split view", "Stacks, with the pane being operated first"],
          ["Dialog", "Bottom-aligned, full width, 44 actions"],
          ["Long text", "Wraps. Truncation only with a route to the full value"],
        ]}
      />
    </div>
  );
}

function Testing() {
  return (
    <div className="prose">
      <Table
        head={["Platform", "Check at"]}
        rows={[
          ["Web", "1440, 1180, 900, 780, 640, 360, and 200% browser zoom"],
          ["Mobile", "320, 360, 390, 600, landscape, 200% text, longest real names"],
        ]}
      />
      <p>
        The space a component actually has decides its layout, not the device name. Use container queries on web,{" "}
        <T>LayoutBuilder</T> in Flutter, and size classes on iOS.
      </p>
    </div>
  );
}

export const responsive: PageContent = {
  lead: "Five web breakpoints and a few mobile widths, each with a defined change, so every screen reflows instead of squeezing.",
  art: "responsive",
  sections: [
    { id: "breakpoints", title: "Breakpoints", body: <Breakpoints /> },
    { id: "patterns", title: "Reflow patterns", body: <Patterns /> },
    { id: "testing", title: "What to test", body: <Testing />, more: { href: "/get-started/developing", label: "For developers" } },
  ],
};
