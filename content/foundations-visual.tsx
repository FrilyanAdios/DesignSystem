import { ArrowRight, Calendar, ChevronDown, Download, Layers, Palette, Search, Shapes, SquareMousePointer, Type } from "lucide-react";
import type { PageContent } from "./index";
import { Btn, Pill, Rule } from "./principles";
import { Do, Dont, Hex, MOBILE_COLOR, MOBILE_TYPE, STATUS, T, Table, WEB_COLOR } from "./dev-kit";
import { IconSpec, ShapeSpec, TypeSpec } from "./specs";

/* ---------------------------------------------------------------------------
   Foundations · Visual — color, typography, iconography, elevation, shape.
   Rules come from NPD-FSM/DESIGN_SYSTEM.md and the fsm-design skill
   references; values from content/dev-kit.tsx.
   --------------------------------------------------------------------------- */


/* ============================================================================
   COLOR
   ============================================================================ */

const pick = (...tokens: string[]) => WEB_COLOR.filter((c) => tokens.includes(c.token));

function SwatchGrid({ tokens }: { tokens: string[] }) {
  return (
    <ul className="swatch-grid">
      {pick(...tokens).map((c) => (
        <li key={c.token}>
          <span className="sg-chip" style={{ background: c.value }} />
          <span className="sg-text">
            <code className="tok-code">{c.token}</code>
            <Hex v={c.value} />
            <span className="sg-use">{c.use}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}

function ColorOverview() {
  return (
    <div className="prose">
      <Rule icon={Palette}>
        White and light gray build the structure. <strong className="hl">Navy is scarce</strong>: it means action,
        selection, navigation, or focus. Pastels mean status, never decoration.
      </Rule>
      <div className="color-ratio" aria-hidden="true">
        <span style={{ flex: 70, background: "#fff" }}>Surfaces 70%</span>
        <span style={{ flex: 20, background: "var(--muted)" }}>Gray 20%</span>
        <span style={{ flex: 6, background: "var(--primary)", color: "#fff" }}>Navy</span>
        <span style={{ flex: 4, background: "var(--approved-bg)" }} />
      </div>
      <p className="ho-caption">A typical screen, by area. Navy is a few percent: one button, the active item, the focus ring.</p>
    </div>
  );
}

function ColorBrand() {
  return (
    <div className="prose">
      <SwatchGrid tokens={["--primary", "--primary-700", "--primary-100", "--primary-50"]} />
      <ul className="dodont">
        <Do>Use navy for the one primary action, the active nav item or tab, links, and focus.</Do>
        <Dont>Fill large areas, headers, or ordinary cards with navy. Selection is a soft tint, not an outline.</Dont>
      </ul>
    </div>
  );
}

function ColorText() {
  return (
    <div className="prose">
      <ul className="text-ramp">
        {pick("--fg", "--fg-2", "--fg-3", "--fg-4").map((c) => (
          <li key={c.token}>
            <span className="tr-sample" style={{ color: c.value }}>
              Service report SR-2041 · Airstream AC2
            </span>
            <code className="tok-code">{c.token}</code>
            <span className="tr-use">{c.use}</span>
          </li>
        ))}
      </ul>
      <p>
        <T>--fg-4</T> is the lightest gray allowed for text. <T>--hairline</T> and <T>--icon-quiet</T> look like grays
        but fail contrast; they are only for dividers and decorative glyphs.
      </p>
    </div>
  );
}

function ColorSurfaces() {
  return (
    <div className="prose">
      <SwatchGrid tokens={["--bg", "--muted", "--surface-2", "--row-hover", "--row-sel", "--border", "--border-input"]} />
      <p>
        Hover is always a quiet gray (<T>--muted</T>, <T>--row-hover</T>), never a blue fill. Inputs get the stronger{" "}
        <T>--border-input</T> so the field edge is visible at rest.
      </p>
    </div>
  );
}

function ColorStatus() {
  return (
    <div className="prose">
      <ul className="status-row">
        {STATUS.map((s) => (
          <li key={s.family}>
            <Pill tone={s.family}>{s.examples.split(",")[0]}</Pill>
            <strong>{s.meaning}</strong>
            <span>{s.examples}</span>
          </li>
        ))}
      </ul>
      <ul className="dodont">
        <Do>Map a new business word to the nearest family: “Awaiting parts” is revision, “Dispatched” is issued.</Do>
        <Dont>Create a color per status, or show status with color alone. The pill always carries the word.</Dont>
      </ul>
    </div>
  );
}

function ColorMobile() {
  const rows = MOBILE_COLOR.filter((c) => ["--esco-blue", "--esco-tint", "--bg", "--surface", "--on-surface", "--on-surface-var", "--outline-strong"].includes(c.token));
  return (
    <div className="prose">
      <p>
        Mobile uses the same navy and status families, a cooler canvas, and a full dark theme. In dark mode, navy can’t
        carry text, so primary becomes a light tint and filled controls take near-black text.
      </p>
      <Table head={["Role", "Token", "Light", "Dark"]} rows={rows.map((c) => [c.role, <T>{c.token}</T>, <Hex v={c.light} />, <Hex v={c.dark} />])} />
    </div>
  );
}

function ColorA11y() {
  return (
    <div className="prose">
      <Table
        head={["Pair", "Ratio", "Requirement"]}
        rows={[
          [<><T>--fg</T> on white</>, "11.5:1", "Body text 4.5:1"],
          [<><T>--fg-3</T> on white</>, "6.2:1", "Body text 4.5:1"],
          [<><T>--fg-4</T> on white</>, "4.7:1", "Body text 4.5:1, the floor"],
          [<><T>--icon-quiet</T> on white</>, "3.0:1", "Non-text only: 3:1"],
          [<>Mobile inactive nav label <T>#5D7485</T></>, "4.79:1", "Body text 4.5:1"],
          [<>Mobile success <T>#146C34</T> on its pastel</>, "> 4.5:1", <>Replaces <T>#15803D</T> (4.49:1) on mobile</>],
        ]}
      />
    </div>
  );
}

export const color: PageContent = {
  lead: "A calm, mostly white palette where navy marks what you can act on and five pastel families say what state a record is in.",
  art: "color",
  sections: [
    { id: "overview", title: "Overview", body: <ColorOverview /> },
    { id: "brand", title: "Brand and primary", body: <ColorBrand /> },
    { id: "text", title: "Text", body: <ColorText /> },
    { id: "surfaces-and-borders", title: "Surfaces and borders", body: <ColorSurfaces /> },
    { id: "status", title: "Status families", body: <ColorStatus />, more: { href: "/components/status-pill", label: "Status pill" } },
    { id: "mobile-and-dark", title: "Mobile and dark theme", body: <ColorMobile />, more: { href: "/foundations/design-tokens", label: "All color tokens" } },
    { id: "contrast", title: "Contrast", body: <ColorA11y />, more: { href: "/foundations/accessibility", label: "Accessibility" } },
  ],
};

/* ============================================================================
   TYPOGRAPHY
   ============================================================================ */

function TypeOverview() {
  return (
    <div className="prose">
      <Rule icon={Type}>
        One family, <strong className="hl">Noto Sans</strong>, in three weights. Hierarchy comes from size and weight,
        never from a second font or color.
      </Rule>
      <TypeSpec standalone />
    </div>
  );
}

function TypeMobile() {
  return (
    <div className="prose">
      <p>
        Mobile type is larger because it is read at arm’s length, often outdoors. Sizes are logical pixels in Flutter and
        points on iOS, and they scale with the system text size.
      </p>
      <Table
        head={["Role", "Size", "Weight", "Flutter", "iOS relative to"]}
        rows={MOBILE_TYPE.map((t) => [t.role, t.size, t.weight, <T>{t.m3}</T>, <T>{t.ios}</T>])}
      />
    </div>
  );
}

function TypeRules() {
  return (
    <div className="prose">
      <ul className="dodont">
        <Do>Use sentence case for titles, buttons, tabs, labels, and column headers.</Do>
        <Do>Use tabular figures for dates, times, durations, and counts so columns line up.</Do>
        <Do>Put one page title per page. It is calm (19px, regular), not promotional.</Do>
        <Dont>Put essential text below 11.5px on web or 13 on mobile. Let the table scroll instead.</Dont>
        <Dont>Use all caps, except the few compact structural labels already in the product.</Dont>
        <Dont>Truncate a value unless the full value is in the detail view or an accessible label.</Dont>
      </ul>
      <div className="num-demo" aria-hidden="true">
        <span>
          <em>Proportional</em>
          <span>11:10 – 14:45</span>
          <span>08:00 – 09:30</span>
        </span>
        <span className="tabular">
          <em>Tabular</em>
          <span>11:10 – 14:45</span>
          <span>08:00 – 09:30</span>
        </span>
      </div>
    </div>
  );
}

export const typography: PageContent = {
  lead: "Noto Sans in seven web roles and six mobile roles, sized for dense operational screens and readable in the field.",
  art: "typography",
  sections: [
    { id: "typeface", title: "Typeface and scale", body: <TypeOverview /> },
    { id: "mobile", title: "Mobile scale", body: <TypeMobile /> },
    { id: "rules", title: "Rules", body: <TypeRules />, more: { href: "/foundations/content", label: "Content and writing" } },
  ],
};

/* ============================================================================
   ICONOGRAPHY
   ============================================================================ */

function IconOverview() {
  return (
    <div className="prose">
      <Rule icon={Shapes}>
        One outline family on a 24 grid, <strong className="hl">stroke 1.9</strong>, round caps and joins, colored by the
        text around it. No emoji, no filled packs, no mixing.
      </Rule>
      <IconSpec standalone />
    </div>
  );
}

function IconSizes() {
  return (
    <div className="prose">
      <Table
        head={["Size", "Where"]}
        rows={[
          ["12–13", "Inline with metadata, inside pills and table cells"],
          ["14", "Inside buttons, including Export all"],
          ["16", "Default on web: toolbar icon buttons, row icons, the register view switch"],
          ["18", "Mobile chips and dense rows"],
          ["20", "Mobile default, navigation"],
        ]}
      />
      <p>
        The icon and its label share one color. On web, call <T>ic(name, size)</T>; on mobile, the shared icon set in{" "}
        <T>icons.js</T>. Native iOS uses SF Symbols as its one set.
      </p>
    </div>
  );
}

function IconUsage() {
  return (
    <div className="prose">
      <div className="icon-demos" aria-hidden="true">
        <span className="cmp-canvas">
          <Btn>
            <Download size={14} /> Export all
          </Btn>
          <span className="icon-cap">Icon before the label</span>
        </span>
        <span className="cmp-canvas">
          <Btn>
            Entity <ChevronDown size={14} />
          </Btn>
          <span className="icon-cap">Trailing chevron: opens something</span>
        </span>
        <span className="cmp-canvas">
          <span className="mk-btn mk-sec icon-only">
            <Search size={16} />
          </span>
          <span className="icon-cap">Icon only, named “Search”</span>
        </span>
      </div>
      <ul className="dodont">
        <Do>Put an action’s icon before its label. A trailing chevron or arrow means disclosure, a menu, or navigation.</Do>
        <Do>Keep icon-only buttons for universal actions (search, close, refresh, settings) with an accessible name and tooltip.</Do>
        <Dont>Use a trailing chevron as decoration, or an icon whose meaning needs a tooltip to guess.</Dont>
        <Dont>Mix emoji, filled icons, or a second library into a screen.</Dont>
      </ul>
    </div>
  );
}

export const iconography: PageContent = {
  lead: "A single outline icon family that supports labels, marks universal actions, and never carries meaning alone.",
  art: "iconography",
  sections: [
    { id: "icon-set", title: "Icon set", body: <IconOverview /> },
    { id: "sizes", title: "Sizes", body: <IconSizes /> },
    { id: "usage", title: "Usage", body: <IconUsage />, more: { href: "/components/icon-button", label: "Icon button" } },
  ],
};

/* ============================================================================
   ELEVATION
   ============================================================================ */

const LEVELS = [
  { name: "Flat", token: "none", use: "Sections, tables, grouped content. The default", shadow: "none" },
  { name: "Resting", token: "--shadow-sm", use: "Cards for repeatable records", shadow: "var(--shadow-sm)" },
  { name: "Raised", token: "--shadow", use: "Raised control, dragged item", shadow: "var(--shadow)" },
  { name: "Overlay", token: "--shadow-lg", use: "Popover, menu, dialog", shadow: "var(--shadow-lg)" },
];

function ElevationLevels() {
  return (
    <div className="prose">
      <Rule icon={Layers}>
        Hierarchy comes from <strong className="hl">spacing and hairlines first</strong>. Shadow is for things that sit
        above the page.
      </Rule>
      <ul className="elev-row">
        {LEVELS.map((l) => (
          <li key={l.name}>
            <span className="elev-card" style={{ boxShadow: l.shadow }} />
            <strong>{l.name}</strong>
            <code className="tok-code">{l.token}</code>
            <span>{l.use}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ElevationRules() {
  return (
    <div className="prose">
      <ul className="dodont">
        <Do>Group sections inside one shared frame with spacing and a divider.</Do>
        <Do>Use cards for records that are independently selectable, draggable, or repeated.</Do>
        <Do>Put every modal on the <T>--scrim</T> overlay.</Do>
        <Dont>Wrap every section in its own rounded card, or stack raised cards inside raised cards.</Dont>
        <Dont>Open a popover inside a popover, or a modal inside a modal. Expand inline instead.</Dont>
      </ul>
      <p>
        In mobile dark mode, shadows almost disappear on a dark canvas, so surfaces step lighter toward the front:
        background, surface, then container.
      </p>
    </div>
  );
}

export const elevation: PageContent = {
  lead: "Four levels, mostly flat. Shadow is reserved for what floats above the page: popovers, menus, and dialogs.",
  art: "elevation",
  sections: [
    { id: "levels", title: "Levels", body: <ElevationLevels /> },
    { id: "rules", title: "When to raise", body: <ElevationRules />, more: { href: "/components/dialog", label: "Dialog" } },
  ],
};

/* ============================================================================
   SHAPE
   ============================================================================ */

function ShapeWeb() {
  return (
    <div className="prose">
      <Rule icon={SquareMousePointer}>
        Radius follows <strong className="hl">role, not taste</strong>. Small controls are tighter, surfaces are softer,
        and only status and chips are fully round.
      </Rule>
      <ShapeSpec standalone />
    </div>
  );
}

function ShapeMobile() {
  return (
    <div className="prose">
      <p>Mobile shapes are larger to match larger controls and the Material 3 feel.</p>
      <Table
        head={["Token", "Value", "Use"]}
        rows={[
          [<T>--ds-radius-small</T>, "8", "Chip, small tile"],
          [<T>--ds-radius-control</T>, "12", "Button, field, segmented control"],
          [<T>--ds-radius-card</T>, "16", "Card, grouped list, report"],
          [<T>--ds-radius-sheet</T>, "28", "Top corners of a bottom sheet"],
        ]}
      />
      <ul className="dodont">
        <Do>Nest radii so the inner one is smaller than the outer one.</Do>
        <Dont>Use the pill radius for buttons, or invent a radius between steps.</Dont>
      </ul>
      <div className="icon-demos" aria-hidden="true">
        <span className="cmp-canvas">
          <Pill tone="issued">Confirmed</Pill>
          <span className="icon-cap">Pill: status only</span>
        </span>
        <span className="cmp-canvas">
          <Btn kind="pri">
            Save schedule <ArrowRight size={14} />
          </Btn>
          <span className="icon-cap">Button: field radius</span>
        </span>
        <span className="cmp-canvas">
          <span className="mk-card shape-demo-card">
            <Calendar size={14} /> Card: card radius
          </span>
          <span className="icon-cap">Surface: card radius</span>
        </span>
      </div>
    </div>
  );
}

export const shape: PageContent = {
  lead: "A small set of corner radii assigned by role, so a control, a card, and a status pill are recognizable by shape alone.",
  art: "shape",
  sections: [
    { id: "web", title: "Web radii", body: <ShapeWeb /> },
    { id: "mobile", title: "Mobile radii and rules", body: <ShapeMobile /> },
  ],
};
