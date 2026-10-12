import type { PageContent } from "./index";
import { Code, Hex, MOBILE_COLOR, MOBILE_TYPE, SPACING, STATUS, T, Table, WEB_COLOR, WEB_TYPE } from "./dev-kit";

/* ---------------------------------------------------------------------------
   Design tokens — the full lookup for developers. Values come from
   content/dev-kit.tsx, which mirrors the product source files.
   --------------------------------------------------------------------------- */

function Overview() {
  return (
    <div className="prose">
      <p>
        Every value on this page has a name. Use the name in code; the value is shown so you can check a build, not so
        you can copy it.
      </p>
      <Table
        head={["Set", "Source file", "Units"]}
        rows={[
          ["Web", <T>NPD-FSM/styles.css</T>, "CSS px"],
          ["Mobile", <><T>FSM-Mobile/css</T>: <T>styles.css</T>, <T>spacing-tokens.css</T>, <T>white-theme.css</T>, <T>theme-dark.css</T></>, "Logical px in Flutter, points on iOS"],
        ]}
      />
      <p>
        Web is a dense desktop tool, so its type and controls are smaller. Mobile is used in the field, one-handed, so it
        uses larger type, 48 targets, and a dark theme. Both share the brand navy, the status families, and the 4-point
        spacing scale.
      </p>
    </div>
  );
}

function WebColor() {
  return (
    <div className="prose">
      <Table head={["Token", "Value", "Use"]} rows={WEB_COLOR.map((c) => [<T>{c.token}</T>, <Hex v={c.value} />, c.use])} />
      <p>
        Text grays below <T>--fg-4</T> fail contrast on white. <T>--hairline</T> and <T>--icon-quiet</T> are for
        decoration only and never carry meaning.
      </p>
    </div>
  );
}

function Status() {
  return (
    <div className="prose">
      <p>
        Five families, no more. A new business word joins the nearest family. Web tokens are <T>--issued-bg</T> /{" "}
        <T>--issued-fg</T>; mobile tokens are <T>--status-issued-bg</T> / <T>--status-issued-fg</T>.
      </p>
      <Table
        head={["Family", "Meaning", "Examples", "Light bg", "Light fg", "Dark bg", "Dark fg"]}
        rows={STATUS.map((s) => [
          <T>{s.family}</T>,
          s.meaning,
          s.examples,
          <Hex v={s.bg} />,
          <>
            <Hex v={s.fg} />
            {s.mobileFg && <span className="tok-note">Mobile {s.mobileFg}</span>}
          </>,
          <Hex v={s.darkBg} />,
          <Hex v={s.darkFg} />,
        ])}
      />
      <p>
        Mobile success text is <T>#146C34</T> instead of <T>#15803D</T>, because the web value measures 4.49:1 on its
        pastel background, just below AA. Dark values exist on mobile only.
      </p>
    </div>
  );
}

function MobileColor() {
  return (
    <div className="prose">
      <Table
        head={["Role", "Token", "Light", "Dark"]}
        rows={MOBILE_COLOR.map((c) => [c.role, <T>{c.token}</T>, <Hex v={c.light} />, <Hex v={c.dark} />])}
      />
      <p>
        In dark mode the brand navy cannot carry text, so primary becomes a light tint. Anything filled with primary
        then takes <T>--on-primary</T> (near black), never white. Every pair is checked against WCAG 2.2 by{" "}
        <T>tests/theme-contrast.cjs</T>.
      </p>
    </div>
  );
}

function Typography() {
  return (
    <div className="prose">
      <p>
        One family: <strong className="hl">Noto Sans</strong>, weights 400, 500, and 600. Sentence case. Tabular figures
        for dates, times, durations, and counts.
      </p>
      <h3 className="sub-title">Web</h3>
      <Table head={["Role", "Token", "Size", "Weight"]} rows={WEB_TYPE.map((t) => [t.role, <T>{t.token}</T>, t.size, t.weight])} />
      <h3 className="sub-title">Mobile</h3>
      <Table
        head={["Role", "Size", "Weight", "Flutter TextTheme", "iOS relative to"]}
        rows={MOBILE_TYPE.map((t) => [t.role, t.size, t.weight, <T>{t.m3}</T>, <T>{t.ios}</T>])}
      />
      <p>
        Mobile sizes are in rem × 16 in the prototype, which equals Flutter logical pixels and iOS points. They scale with
        the system text size; never clamp them.
      </p>
    </div>
  );
}

function Spacing() {
  return (
    <div className="prose">
      <Table
        head={["Web token", "Mobile token", "Value", "Use"]}
        rows={SPACING.map((s) => [<T>{s.token}</T>, <T>{s.mobile}</T>, s.value, s.use])}
      />
      <h3 className="sub-title">Semantic spacing</h3>
      <Table
        head={["Role", "Web", "Mobile"]}
        rows={[
          ["Screen gutter", <><T>--gutter</T> 24, <T>--gutter-sm</T> 16</>, <><T>--layout-gutter</T> 16, 24 at 600 and wider</>],
          ["Card padding", "16", <><T>--card-padding</T> 16</>],
          ["Between sections", "24", <><T>--section-gap</T> 24</>],
          ["Between fields", "16", <><T>--field-gap</T> 16</>],
          ["Between related controls", "8", <><T>--control-gap</T> 8</>],
          ["Sheet padding", "20–24 (dialog body)", "24, content gap 16"],
        ]}
      />
    </div>
  );
}

function Sizes() {
  return (
    <div className="prose">
      <Table
        head={["Token", "Web", "Use"]}
        rows={[
          [<T>--h-xs</T>, "28", "In-cell control, micro button"],
          [<T>--h-sm</T>, "32", "Compact button, pager, compact select"],
          [<T>--h-md</T>, "36", "Toolbar control, segmented control, icon button"],
          [<T>--h-lg</T>, "40", "The default: input, select, button"],
          [<T>--h-xl</T>, "44", "Tab bar, large choice, touch target on web"],
          [<T>--pill-h</T>, "22", "Status pill (11.5px label)"],
          [<T>--flag-h</T>, "20", "Secondary flag such as Late (11px label)"],
          [<T>--statectl-h</T>, "28", "Clickable status selector"],
        ]}
      />
      <Table
        head={["Token", "Mobile", "Use"]}
        rows={[
          [<T>--ds-touch</T>, "48", "Every touch target, including icon buttons"],
          [<T>--ds-field</T>, "52", "Text field and select height"],
          [<T>--ds-icon</T>, "20", "Default icon"],
          [<T>--ds-icon-small</T>, "18", "Icon in a chip or dense row"],
          [<T>.chip</T>, "32", "Assist and filter chip"],
          [<T>.avatar</T>, "32 / 36 / 82", "Small, medium, profile"],
          [<T>.icon-tile</T>, "36 / 40 / 48", "Leading icon in a row or module button"],
        ]}
      />
    </div>
  );
}

function Radius() {
  return (
    <div className="prose">
      <Table
        head={["Web token", "Value", "Use"]}
        rows={[
          [<T>--radius-tick</T>, "4", "Checkbox, micro badge"],
          [<T>--radius-control</T>, "6", "Compact button, pager, menu item"],
          [<T>--radius-field</T>, "8", "Input, select, standard button"],
          [<T>--radius-card</T>, "10", "Card, panel, modal, popover"],
          [<T>--radius-pill</T>, "20", "Status pill, counter, chip"],
        ]}
      />
      <Table
        head={["Mobile token", "Value", "Use"]}
        rows={[
          [<T>--ds-radius-small</T>, "8", "Chip, small tile"],
          [<T>--ds-radius-control</T>, "12", "Button, field, segmented control"],
          [<T>--ds-radius-card</T>, "16", "Card, grouped list, report"],
          [<T>--ds-radius-sheet</T>, "28", "Top corners of a bottom sheet"],
        ]}
      />
    </div>
  );
}

function Elevation() {
  return (
    <div className="prose">
      <Table
        head={["Token", "Value", "Use"]}
        rows={[
          [<T>--shadow-sm</T>, <T>0 1px 2px rgba(16,32,44,.04)</T>, "Cards at rest (near flat)"],
          [<T>--shadow</T>, <T>0 1px 3px rgba(16,32,44,.08), 0 1px 2px rgba(16,32,44,.04)</T>, "Raised control"],
          [<T>--shadow-lg</T>, <T>0 14px 40px rgba(16,32,44,.16)</T>, "Popover, menu, modal"],
          [<T>--scrim</T>, <T>rgba(17,32,44,.42)</T>, "Behind every modal"],
        ]}
      />
      <p>
        Hierarchy comes from spacing and hairline borders first. In mobile dark mode, shadows darken to{" "}
        <T>rgba(0,0,0,.45)</T> and <T>.55</T>, and surfaces step lighter toward the front instead.
      </p>
    </div>
  );
}

function MotionFocus() {
  return (
    <div className="prose">
      <Table
        head={["Token", "Value", "Use"]}
        rows={[
          ["State change", "120–200ms ease (mobile 180ms)", "Color, border, background"],
          [<T>--motion-duration</T>, "320ms", "Sheets, page reveal (mobile)"],
          [<T>--motion-ease</T>, <T>cubic-bezier(.22,1,.36,1)</T>, "Enter and expand"],
          [<T>--focus-ring</T>, <T>2px solid var(--primary)</T>, "Keyboard focus"],
          [<T>--focus-offset</T>, "2px", "Gap between control and ring"],
        ]}
      />
      <p>
        With reduced motion on, all nonessential transitions and animations are removed, not just shortened.
      </p>
    </div>
  );
}

function Breakpoints() {
  return (
    <div className="prose">
      <Table
        head={["Width", "Applies to", "Change"]}
        rows={[
          ["≥ 1180", "Web", "Full multi-panel layout"],
          ["< 1180", "Web", "Multi-column detail collapses"],
          ["< 900", "Web", "Sidebar becomes a drawer, split view stacks"],
          ["< 780", "Web", "Toolbar overflow"],
          ["< 640", "Web", "16 gutter, bottom-sheet dialogs, 44 controls"],
          ["≥ 600", "Mobile", "24 gutter, two columns where content allows"],
        ]}
      />
      <p>
        CSS custom properties can’t be used inside media queries, so web breakpoints are written as literal values. Keep
        them in one place, such as a <T>breakpoints.ts</T> constant mirrored in a single CSS file.
      </p>
    </div>
  );
}

function InCode() {
  return (
    <div className="prose">
      <p>The same three tokens in each platform. The platform guides show the full files.</p>
      <Code title="tokens.css" lang="css">{`
:root {
  --primary: #00467f;
  --fg-3: #616161;
  --sp-4: 16px;
}
.card { padding: var(--sp-4); }
`}</Code>
      <Code title="esco_tokens.dart" lang="dart">{`
abstract final class EscoColors {
  static const primary = Color(0xFF00467F);
  static const onSurfaceVariant = Color(0xFF596B7C);
}
abstract final class EscoSpace {
  static const s16 = 16.0;
}
`}</Code>
      <Code title="EscoTokens.swift" lang="swift">{`
extension Color {
  static let escoPrimary = Color("EscoPrimary")        // asset with Any + Dark
  static let escoTextSecondary = Color("EscoTextSecondary")
}
enum EscoSpace {
  static let s16: CGFloat = 16
}
`}</Code>
    </div>
  );
}

export const designTokens: PageContent = {
  lead: "Every color, size, space, radius, shadow, and timing in the system, with the token name to use in code.",
  art: "tokens",
  sections: [
    { id: "overview", title: "Overview", body: <Overview /> },
    { id: "web-color", title: "Web color", body: <WebColor /> },
    { id: "status", title: "Status families", body: <Status /> },
    { id: "mobile-color", title: "Mobile color, light and dark", body: <MobileColor /> },
    { id: "typography", title: "Typography", body: <Typography /> },
    { id: "spacing", title: "Spacing", body: <Spacing /> },
    { id: "sizes", title: "Sizes and touch targets", body: <Sizes /> },
    { id: "radius", title: "Radius", body: <Radius /> },
    { id: "elevation", title: "Elevation", body: <Elevation /> },
    { id: "motion-and-focus", title: "Motion and focus", body: <MotionFocus /> },
    { id: "breakpoints", title: "Breakpoints", body: <Breakpoints /> },
    { id: "in-code", title: "Tokens in code", body: <InCode />, more: { href: "/get-started/developing", label: "For developers" } },
  ],
};
