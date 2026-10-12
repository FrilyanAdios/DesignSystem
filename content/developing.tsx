import { Accessibility, Braces, Layers, ListChecks, MonitorSmartphone, Smartphone, TabletSmartphone, Globe, type LucideIcon } from "lucide-react";
import Link from "next/link";
import type { PageContent } from "./index";
import { Rule } from "./principles";
import { Checks, Code, PLATFORM_REFS, Refs, T, Table } from "./dev-kit";

/* ---------------------------------------------------------------------------
   For developers — the cross-platform contract. Platform detail lives in the
   three platform guides; this page is what every developer reads first.
   Facts mirror NPD-FSM/DESIGN_SYSTEM.md and FSM-Mobile/COMPONENT_SYSTEM.md.
   --------------------------------------------------------------------------- */

/* ---- 1. platforms --------------------------------------------------------- */

const PLATFORMS: { icon: LucideIcon; name: string; stack: string; follows: string; href: string }[] = [
  { icon: Globe, name: "Web", stack: "React, Next.js App Router, TypeScript", follows: "React and Next.js docs, WAI-ARIA APG", href: "/get-started/react" },
  { icon: Smartphone, name: "Mobile, cross-platform", stack: "Flutter, Dart, Material 3", follows: "Material Design 3", href: "/get-started/flutter" },
  { icon: TabletSmartphone, name: "iOS native", stack: "Swift, SwiftUI, UIKit where needed", follows: "Apple Human Interface Guidelines", href: "/get-started/ios" },
];

function Platforms() {
  return (
    <div className="prose">
      <Rule icon={MonitorSmartphone}>
        The platform decides <strong className="hl">how things behave</strong>. Esco decides{" "}
        <strong className="hl">how they look and what they say</strong>.
      </Rule>
      <p>
        Navigation, gestures, system controls, and text scaling follow the platform, because that is what users of the
        platform already know. Color, type, spacing, status, wording, and information order follow Esco tokens, so the
        product reads as one system on every screen.
      </p>
      <ul className="platforms">
        {PLATFORMS.map(({ icon: Icon, name, stack, follows, href }) => (
          <li key={name}>
            <Link href={href}>
              <span className="pf-icon" aria-hidden="true">
                <Icon size={20} />
              </span>
              <strong>{name}</strong>
              <span className="pf-stack">{stack}</span>
              <span className="pf-follows">Follows {follows}</span>
            </Link>
          </li>
        ))}
      </ul>
      <h3 className="sub-title">When the platform and Esco disagree</h3>
      <Table
        head={["Question", "Winner", "Example"]}
        rows={[
          ["How do I go back?", "Platform", "iOS keeps the edge swipe; Android keeps the system back"],
          ["Which control picks a date?", "Platform", "Native date picker, styled with Esco tokens"],
          ["Which color is the primary action?", "Esco", <><T>--primary</T> #00467F everywhere</>],
          ["What color is “Awaiting parts”?", "Esco", "The revision family, on every platform"],
          ["How large is a touch target?", "Stricter of the two", "48 on mobile: above Apple’s 44 pt and equal to Material’s 48 dp"],
          ["Which font?", "Esco", "Noto Sans, bundled, scaling with the system text size"],
        ]}
      />
    </div>
  );
}

/* ---- 2. tokens ------------------------------------------------------------ */

function Tokens() {
  return (
    <div className="prose">
      <Rule icon={Braces}>
        A component never contains a hex value, a pixel guess, or a font name. It names a{" "}
        <strong className="hl">token</strong>.
      </Rule>
      <h3 className="sub-title">Three tiers</h3>
      <Table
        head={["Tier", "What it is", "Example", "Who uses it"]}
        rows={[
          ["Primitive", "A raw value", "#00467F, 16, Noto Sans", "Only the token file"],
          ["Semantic", "A role with a meaning", <><T>--primary</T>, <T>--fg-3</T>, <T>--sp-4</T></>, "Every component"],
          ["Component", "A role inside one component", <><T>--h-lg</T> on a button, <T>--pill-h</T></>, "That component"],
        ]}
      />
      <p>
        Components reference semantic or component tokens only. Changing the brand, adding dark mode, or fixing a
        contrast issue then happens in one file instead of a hundred.
      </p>
      <h3 className="sub-title">One name, four spellings</h3>
      <Table
        head={["Token", "CSS", "TypeScript", "Dart", "Swift"]}
        rows={[
          ["Primary", <T>--primary</T>, <T>color.primary</T>, <T>EscoColors.primary</T>, <T>Color.escoPrimary</T>],
          ["Helper text", <T>--fg-3</T>, <T>color.fg3</T>, <T>EscoColors.fg3</T>, <T>Color.escoFg3</T>],
          ["Card padding", <T>--sp-4</T>, <T>space[4]</T>, <T>EscoSpace.s16</T>, <T>EscoSpace.s16</T>],
          ["Card radius", <T>--radius-card</T>, <T>radius.card</T>, <T>EscoRadius.card</T>, <T>EscoRadius.card</T>],
        ]}
      />
      <p>
        Until a shared token package exists, the source of truth is <T>NPD-FSM/styles.css</T> for web and{" "}
        <T>FSM-Mobile/css</T> for mobile. A value that is not in either file is not a token yet: ask for one instead of
        inventing it.
      </p>
    </div>
  );
}

/* ---- 3. rules ------------------------------------------------------------- */

const RULES: React.ReactNode[] = [
  <>Reuse the <strong className="hl">shared component</strong>. Never write a module-prefixed copy of one that exists.</>,
  <>No <strong className="hl">hex, px, or font name</strong> inside a component. Reference the token.</>,
  <>One filled <strong className="hl">primary action</strong> per action region: page, dialog footer, form step.</>,
  <>Use the <strong className="hl">real element</strong>: <code>&lt;button&gt;</code>, <code>FilledButton</code>, <code>Button</code>. Not a tappable div.</>,
  <>Status is a <strong className="hl">pill with text</strong>. Color is never the only cue.</>,
  <>Nothing is reachable <strong className="hl">only on hover</strong> or only by long-press.</>,
  <>Every <strong className="hl">icon-only</strong> control has an accessible name.</>,
  <>Never <strong className="hl">shrink text</strong> to fit. Scroll, wrap, or reflow.</>,
  <>Never <strong className="hl">drop business data</strong> to simplify. Regroup or disclose it.</>,
  <>An exception is <strong className="hl">documented beside the code</strong>, small and reversible.</>,
];

function Rules() {
  return (
    <div className="prose">
      <p>The design contract, read as code-review rules. A pull request that breaks one is sent back.</p>
      <ol className="rules">
        {RULES.map((r, i) => (
          <li key={i}>
            <span className="r-num">{String(i + 1).padStart(2, "0")}</span>
            <p>{r}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ---- 4. component map ----------------------------------------------------- */

function ComponentMap() {
  return (
    <div className="prose">
      <Rule icon={Layers}>
        <strong className="hl">The same intent uses the same component</strong>: element, size, icon, label grammar,
        and states all come with it.
      </Rule>
      <Table
        head={["Intent", "Web (React)", "Flutter (Material 3)", "iOS (SwiftUI)"]}
        rows={[
          ["Primary action", <T>.btn.btn-primary</T>, <T>FilledButton</T>, <T>.borderedProminent</T>],
          ["Secondary action", <T>.btn</T>, <T>OutlinedButton</T>, <T>.bordered</T>],
          ["Tertiary, cancel, back", <T>.btn.btn-ghost</T>, <T>TextButton</T>, <T>.borderless</T>],
          ["Destructive", <T>.btn.btn-danger</T>, <><T>FilledButton</T> + error colors</>, <T>{"Button(role: .destructive)"}</T>],
          ["Icon only", <><T>.icon-btn</T> + <T>aria-label</T></>, <><T>IconButton</T> + <T>tooltip</T></>, <><T>Button</T> + <T>accessibilityLabel</T></>],
          ["Record status", <T>.pill.b-*</T>, <T>EscoStatusPill</T>, <T>EscoStatusPill</T>],
          ["View switch", <T>.viewsw</T>, <T>SegmentedButton</T>, <T>{"Picker(.segmented)"}</T>],
          ["Content tabs", <T>.tabs</T>, <T>TabBar</T>, <T>{"Picker(.segmented)"}</T>],
          ["Pick one of many", <><T>.menu</T> popover</>, "Modal bottom sheet", <><T>.sheet</T> or <T>Menu</T></>],
          ["Confirm a decision", <T>.ov &gt; .modal</T>, <T>AlertDialog.adaptive</T>, <><T>.confirmationDialog</T> or <T>.alert</T></>],
          ["App navigation", <T>.sidebar</T>, <T>NavigationBar</T>, <T>TabView</T>],
          ["Brief feedback", "Toast", <T>SnackBar</T>, "Inline banner"],
        ]}
      />
      <p>
        On mobile, a record action sits full width at the foot of its record and is always outlined. Filled navy is
        reserved for the screen’s single primary action, usually in a fixed bottom bar.
      </p>
    </div>
  );
}

/* ---- 5. states ------------------------------------------------------------ */

function States() {
  return (
    <div className="prose">
      <Rule icon={Layers}>
        States are part of the component’s API. A component that ships without them is <strong className="hl">not done</strong>.
      </Rule>
      <Table
        head={["State", "Rule", "Implementation"]}
        rows={[
          ["Resting", "Shape and label visible without hover", "Border, fill, chevron, or underline at rest"],
          ["Hover", "Quiet gray fill or stronger border", <><T>--muted</T>, <T>--row-hover</T>, <T>--border-hover</T></>],
          ["Pressed", "Optional 1px move down on buttons", "Material ripple on Flutter, system highlight on iOS"],
          ["Focus", "2px primary ring, 2px offset", <><T>:focus-visible</T> on web. Never remove it</>],
          ["Selected", "Soft fill plus a text or icon cue", <><T>--row-sel</T>, <T>--primary-50</T>, check icon</>],
          ["Disabled", "50% opacity, no interaction", <><T>disabled</T> attribute, <T>onPressed: null</T>, <T>.disabled(true)</T></>],
          ["Loading", "Same size, label kept", <><T>aria-busy</T>, progress inside the control, no layout jump</>],
          ["Empty, error", "What happened and what to do next", "A sentence and one action, never a blank area"],
        ]}
      />
      <h3 className="sub-title">Motion</h3>
      <Table
        head={["Use", "Duration", "Curve"]}
        rows={[
          ["Color, border, and fill changes", "120–200ms (180ms on mobile)", "ease"],
          ["Sheets, search expansion, page reveal", "320ms (360ms for search)", <T>cubic-bezier(.22, 1, .36, 1)</T>],
          ["Reduced motion turned on", "0", "Remove nonessential transitions entirely"],
        ]}
      />
    </div>
  );
}

/* ---- 6. accessibility ----------------------------------------------------- */

function A11y() {
  return (
    <div className="prose">
      <Rule icon={Accessibility}>
        These are <strong className="hl">acceptance criteria</strong>. A story is not done until they pass.
      </Rule>
      <Table
        head={["Criterion", "Web", "Flutter", "iOS"]}
        rows={[
          ["Text contrast 4.5:1, UI boundaries 3:1", "Tokens already pass. Don’t mix in new grays", <><T>textContrastGuideline</T> test</>, "Asset catalog with dark and high-contrast variants"],
          ["Target size", "40px desktop, 44px touch", "48 × 48 dp", "48 × 48 pt (HIG minimum is 44)"],
          ["Visible focus", <><T>:focus-visible</T> ring</>, "Theme focus color", "System focus, keep it"],
          ["Every control is named", <><T>&lt;label&gt;</T>, <T>aria-label</T></>, <><T>Semantics</T>, <T>tooltip</T></>, <T>accessibilityLabel</T>],
          ["Text scales to 200%", "Rem-based sizes, zoom allowed", <><T>MediaQuery.textScaler</T>, no clamping</>, <><T>Font.custom(relativeTo:)</T>, Dynamic Type</>],
          ["Reduced motion", <T>prefers-reduced-motion</T>, <T>MediaQuery.disableAnimationsOf</T>, <T>accessibilityReduceMotion</T>],
          ["Test with", "Keyboard only, axe, a screen reader", "TalkBack, guideline tests", "VoiceOver, Accessibility Inspector"],
        ]}
      />
    </div>
  );
}

/* ---- 7. responsive -------------------------------------------------------- */

function Responsive() {
  return (
    <div className="prose">
      <Table
        head={["Width", "Web", "Mobile"]}
        rows={[
          ["≥ 1180", "Full multi-panel layouts", "—"],
          ["< 1180", "Multi-column detail and stats collapse to one column", "—"],
          ["< 900", "Sidebar becomes a 260px drawer, split views stack, tables scroll", "—"],
          ["< 780", "Toolbars move optional controls into overflow", "—"],
          ["≥ 600", "—", "24 gutter, two columns where content allows"],
          ["< 640 / < 600", "16px gutters, full-width bottom-sheet dialogs, 44px controls", "16 gutter, single column"],
        ]}
      />
      <p>
        Lay out by the space the component actually has, not by device name: container queries on web,{" "}
        <T>LayoutBuilder</T> in Flutter, size classes or <T>ViewThatFits</T> on iOS. Text-bearing content never gets a
        fixed height.
      </p>
      <p>
        Check every screen at <strong className="hl">320, 360, 390, and 600</strong> wide, in landscape, at 200% text,
        and with the longest real customer and unit names.
      </p>
    </div>
  );
}

/* ---- 8. pull request ------------------------------------------------------ */

const PR = [
  "Shared components reused. No module-prefixed copy of an existing one.",
  "No unexplained color, spacing, radius, height, or shadow. Tokens only.",
  "Noto Sans and the shared icon set only.",
  "Exactly one primary action per action region.",
  "Rest, hover, focus, selected, disabled, loading, empty, and error states exist.",
  "Every control is discoverable without hover, and every icon-only control is named.",
  "Essential information preserved. Nothing meaningful below 11.5px on web or 13 on mobile.",
  "Dialogs and sheets trap focus, close with Escape or a gesture, and restore focus.",
  "Checked at the breakpoints, at 200% text, with reduced motion, and in dark mode on mobile.",
  "Screenshots of new or changed states attached to the pull request.",
];

function PullRequest() {
  return (
    <div className="prose">
      <Rule icon={ListChecks}>
        Paste this into the pull request description. The reviewer checks <strong className="hl">every box</strong>.
      </Rule>
      <Checks items={PR} />
      <Code title="PULL_REQUEST_TEMPLATE.md" lang="markdown">{`
## Design system
- [ ] Shared components reused; no new class or widget duplicates one
- [ ] Tokens only (no hex, px, or font names in components)
- [ ] One primary action per region
- [ ] All states: rest, hover, focus, selected, disabled, loading, empty, error
- [ ] Icon-only controls named; nothing hover-only
- [ ] Breakpoints, 200% text, reduced motion, dark mode (mobile) checked
- [ ] Screenshots attached

Exceptions (and why):
`}</Code>
      <Refs items={[PLATFORM_REFS.wcag, PLATFORM_REFS.apg, PLATFORM_REFS.m3, PLATFORM_REFS.hig]} />
    </div>
  );
}

export const developing: PageContent = {
  lead: "The contract every Esco developer builds to, on web, Flutter, and iOS. Start here, then open the guide for your platform.",
  art: "developing",
  guide: {
    meta: ["About 10 minutes", "8 chapters in 3 parts", "Based on the FSM design contract"],
    questions: [
      { q: "Which guide is for my platform?", id: "platforms" },
      { q: "Can I use a hex value just this once?", id: "tokens" },
      { q: "Which widget is a secondary button?", id: "component-map" },
      { q: "How long should an animation be?", id: "states" },
      { q: "How big is a touch target?", id: "accessibility" },
      { q: "What do I check before opening a PR?", id: "pull-request" },
    ],
  },
  sections: [
    {
      id: "platforms",
      title: "Platforms and references",
      part: { title: "How the system reaches code", description: "Which stack, which reference, and who wins a conflict." },
      summary: "Three stacks, one design language.",
      body: <Platforms />,
      takeaway: "Behave like the platform. Look and speak like Esco.",
    },
    {
      id: "tokens",
      title: "Tokens are the contract",
      summary: "Three tiers and one name spelled four ways.",
      body: <Tokens />,
      takeaway: "Components name semantic tokens. Raw values live in one file per platform.",
      more: { href: "/foundations/design-tokens", label: "Design tokens reference" },
    },
    {
      id: "rules",
      title: "Ten rules in code review",
      part: { title: "Build it right", description: "The rules, the components, and the states." },
      summary: "The non-negotiables, as a reviewer reads them.",
      body: <Rules />,
      takeaway: "Reuse, tokens, one primary, real elements, nothing hidden, nothing dropped.",
      more: { href: "/get-started/designing", label: "For designers" },
    },
    {
      id: "component-map",
      title: "One intent, one component",
      summary: "The same action, mapped across web, Flutter, and iOS.",
      body: <ComponentMap />,
      takeaway: "Find the intent in the table, then use that component on your platform.",
    },
    {
      id: "states",
      title: "States and motion",
      summary: "Eight states and three motion speeds.",
      body: <States />,
      takeaway: "Focus is always visible, loading keeps its size, and reduced motion means no motion.",
      more: { href: "/foundations/interaction-states", label: "Interaction states" },
    },
    {
      id: "accessibility",
      title: "Accessibility",
      summary: "The acceptance criteria and how to test them on each platform.",
      body: <A11y />,
      takeaway: "Contrast from tokens, 48 targets on mobile, a name on every control, text that scales.",
      more: { href: "/foundations/accessibility", label: "Accessibility" },
    },
    {
      id: "responsive",
      title: "Responsive and adaptive",
      summary: "Breakpoints for web, widths for mobile.",
      body: <Responsive />,
      takeaway: "Reflow by available space. Never squeeze, never fix the height of text.",
      more: { href: "/foundations/responsive", label: "Responsive behavior" },
    },
    {
      id: "pull-request",
      title: "Before you open a pull request",
      part: { title: "Ship it", description: "What the reviewer checks." },
      summary: "Ten checks and a template to paste.",
      body: <PullRequest />,
      takeaway: "If a box can’t be ticked, write the exception and the reason beside the code.",
      more: { href: "/get-started/contributing", label: "Contributing" },
    },
  ],
};
