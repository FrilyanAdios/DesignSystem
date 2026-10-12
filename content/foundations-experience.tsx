import { Accessibility, AlignLeft, Check, Keyboard, Loader2, MousePointerClick, Move } from "lucide-react";
import type { PageContent } from "./index";
import { Rule } from "./principles";
import { Checks, Do, Dont, PLATFORM_REFS, Refs, T, Table } from "./dev-kit";

/* ---------------------------------------------------------------------------
   Foundations · Experience — accessibility, interaction states, motion,
   content and writing. Rules from NPD-FSM/DESIGN_SYSTEM.md and the
   fsm-design ux-rules reference; mobile from FSM-Mobile notes.
   --------------------------------------------------------------------------- */

/* ============================================================================
   ACCESSIBILITY
   ============================================================================ */

function A11yCriteria() {
  return (
    <div className="prose">
      <Rule icon={Accessibility}>
        These are <strong className="hl">acceptance criteria</strong>, not extras. A screen that fails one isn’t done.
      </Rule>
      <Checks
        items={[
          "Body text meets 4.5:1 contrast. Large text and UI boundaries meet 3:1.",
          "Keyboard focus is always visible.",
          "Every input has a programmatic label. Every icon-only button has a name.",
          "Targets are 40px on desktop, 44px on touch web, 48 on mobile.",
          "Status and validation never rely on color alone.",
          "Tables keep headers and a usable reading order at narrow widths.",
          "Truncated text has a route to its full value.",
          "Dialog focus is contained while open and returned on close.",
          "Text scales to 200% without loss. Reduced motion removes nonessential motion.",
        ]}
      />
    </div>
  );
}

function A11yKeyboard() {
  return (
    <div className="prose">
      <Rule icon={Keyboard}>
        Everything a mouse can do, the keyboard can do, in the <strong className="hl">order the eye reads</strong>.
      </Rule>
      <Table
        head={["Component", "Keys"]}
        rows={[
          ["Button, link", "Tab to reach, Enter or Space to activate"],
          ["Dialog", "Focus moves to the first meaningful control; Tab stays inside; Escape closes and returns focus"],
          ["Popover, menu", "Arrow keys move, Enter selects, Escape closes and returns focus to the trigger"],
          ["Search suggestions", "Up and Down move, Enter opens, Escape closes"],
          ["Tabs, segmented control", "Arrow keys between options; state exposed as selected or pressed"],
          ["Calendar notes", "The dot cluster is a focusable button with a name"],
        ]}
      />
    </div>
  );
}

function A11yScreenReaders() {
  return (
    <div className="prose">
      <Table
        head={["Need", "Provide"]}
        rows={[
          ["Icon-only button", <>A name that says the result: <T>aria-label="Close dialog"</T></>],
          ["Field", "A visible label above it, wired to the input; errors announced and described"],
          ["Status pill", "The word, which already carries the meaning"],
          ["Workload bar", "An accessible label that names every status and count"],
          ["Record row", "One combined element: identity, state, time"],
          ["Result of an action", "An announcement, such as “Report sent”"],
        ]}
      />
    </div>
  );
}

function A11yTesting() {
  return (
    <div className="prose">
      <Table
        head={["Platform", "Automated", "Manual"]}
        rows={[
          ["Web", "axe in end-to-end tests", "Keyboard only, then VoiceOver or NVDA"],
          ["Flutter", <T>meetsGuideline</T>, "TalkBack and VoiceOver, 200% text"],
          ["iOS", "Accessibility Inspector audit", "VoiceOver, largest Dynamic Type size"],
          ["Mobile prototype", <T>tests/theme-contrast.cjs</T>, "Both themes checked against WCAG 2.2 AA"],
        ]}
      />
      <Refs items={[PLATFORM_REFS.wcag, PLATFORM_REFS.apg, PLATFORM_REFS.appleA11y, PLATFORM_REFS.flutterA11y]} />
    </div>
  );
}

export const accessibility: PageContent = {
  lead: "Nine acceptance criteria every Esco screen meets, and how to check them with a keyboard, a screen reader, and automated tests.",
  art: "accessibility",
  sections: [
    { id: "criteria", title: "Acceptance criteria", body: <A11yCriteria /> },
    { id: "keyboard", title: "Keyboard and focus", body: <A11yKeyboard /> },
    { id: "screen-readers", title: "Screen readers", body: <A11yScreenReaders /> },
    { id: "testing", title: "Testing", body: <A11yTesting />, more: { href: "/get-started/developing", label: "For developers" } },
  ],
};

/* ============================================================================
   INTERACTION STATES
   ============================================================================ */

const STATES: { name: string; rule: string; token: React.ReactNode; cls: string; label?: React.ReactNode }[] = [
  { name: "Rest", rule: "Shape and label visible without hover", token: <T>--border</T>, cls: "" },
  { name: "Hover", rule: "Quiet gray fill or stronger border. Never blue", token: <T>--muted</T>, cls: "st-hover" },
  { name: "Pressed", rule: "Optional 1px move down on buttons", token: "translateY(1px)", cls: "st-pressed" },
  { name: "Focus", rule: "2px primary ring, 2px offset; inset for inputs", token: <T>--focus-ring</T>, cls: "st-focus" },
  { name: "Selected", rule: "Soft fill plus a text or icon cue", token: <T>--primary-50</T>, cls: "st-selected", label: <><Check size={12} /> Selected</> },
  { name: "Disabled", rule: "50% opacity, no pointer", token: "opacity .5", cls: "st-disabled" },
  { name: "Loading", rule: "Same size, label kept", token: <T>aria-busy</T>, cls: "st-loading", label: <><Loader2 size={12} className="spin" /> Saving</> },
];

function StatesGallery() {
  return (
    <div className="prose">
      <Rule icon={MousePointerClick}>
        Every interactive component defines <strong className="hl">all seven states</strong>, plus empty and error where
        it shows data.
      </Rule>
      <ul className="states" aria-label="Interaction states">
        {STATES.map((s) => (
          <li key={s.name}>
            <span className="cmp-canvas st-canvas" aria-hidden="true">
              <span className={`mk-btn mk-sec st-btn ${s.cls}`}>{s.label ?? "Export all"}</span>
            </span>
            <strong>{s.name}</strong>
            <span>{s.rule}</span>
          </li>
        ))}
      </ul>
      <Table head={["State", "Token or value"]} rows={STATES.map((s) => [s.name, s.token])} />
    </div>
  );
}

function Selection() {
  return (
    <div className="prose">
      <ul className="dodont">
        <Do>Show selection with <T>--row-sel</T> or <T>--primary-50</T>, plus a check, bold text, or a
            restrained accent edge.</Do>
        <Dont>Use a thick permanent blue outline on ordinary cards, or fade out the unselected ones.</Dont>
        <Dont>Make a read-only status look like a dropdown. Only a clickable state control gets a
            chevron.</Dont>
      </ul>
    </div>
  );
}

function EmptyError() {
  return (
    <div className="prose">
      <Table
        head={["State", "Say", "Offer"]}
        rows={[
          ["Empty, nothing yet", "What will appear here", "The action that creates the first item"],
          ["Empty, filtered", "That nothing matches the filters", "Reset filters"],
          ["Error, recoverable", "What failed, in plain words", "Try again"],
          ["Error, field", "What to fix in this field", "Focus on the field"],
          ["Offline (mobile)", "That changes are saved on the device", "Sync status and retry"],
        ]}
      />
    </div>
  );
}

export const interactionStates: PageContent = {
  lead: "The seven states every control shows, how selection looks, and what to say when there is nothing, or something went wrong.",
  art: "states",
  sections: [
    { id: "states", title: "The seven states", body: <StatesGallery /> },
    { id: "selection", title: "Selection", body: <Selection /> },
    { id: "empty-and-error", title: "Empty and error", body: <EmptyError />, more: { href: "/patterns/empty-states", label: "Empty states" } },
  ],
};

/* ============================================================================
   MOTION
   ============================================================================ */

function MotionPrinciples() {
  return (
    <div className="prose">
      <Rule icon={Move}>
        Motion <strong className="hl">answers an action</strong>. It confirms that something happened and shows where it
        went. It never decorates or waits for attention.
      </Rule>
      <ul className="motion-demo" aria-hidden="true">
        <li>
          <span className="md-track">
            <span className="md-dot md-fast" />
          </span>
          <strong>180ms · ease</strong>
          <span>Color, border, fill</span>
        </li>
        <li>
          <span className="md-track">
            <span className="md-dot md-enter" />
          </span>
          <strong>320ms · enter curve</strong>
          <span>Sheets, panels, reveals</span>
        </li>
      </ul>
    </div>
  );
}

function MotionTokens() {
  return (
    <div className="prose">
      <Table
        head={["Use", "Duration", "Curve"]}
        rows={[
          ["Hover, press, color and border changes", "120–200ms (mobile 180ms)", "ease"],
          ["Bottom sheet, dialog, page reveal", "320ms", <T>cubic-bezier(.22, 1, .36, 1)</T>],
          ["Mobile search expanding in the header", "360ms, short fades delayed", <T>cubic-bezier(.22, 1, .36, 1)</T>],
          ["Accordion chevron", "180ms", "Same enter curve"],
        ]}
      />
      <p>
        The enter curve starts fast and settles gently, so the result is visible almost at once. Use the same curve
        everywhere so the product moves as one thing.
      </p>
    </div>
  );
}

function MotionRules() {
  return (
    <div className="prose">
      <ul className="dodont">
        <Do>Honor reduced motion by removing nonessential transitions entirely.</Do>
        <Do>Keep layout stable: nothing moves under the finger, and loading keeps its size.</Do>
        <Dont>Animate on page load for effect, loop anything in the product, or delay a result
            behind an animation.</Dont>
      </ul>
      <Table
        head={["Platform", "Reduced motion"]}
        rows={[
          ["Web", <T>@media (prefers-reduced-motion: reduce)</T>],
          ["Flutter", <T>MediaQuery.disableAnimationsOf(context)</T>],
          ["iOS", <T>@Environment(\.accessibilityReduceMotion)</T>],
        ]}
      />
    </div>
  );
}

export const motion: PageContent = {
  lead: "Short, purposeful motion with one curve, used to confirm actions and show where things went, and gone when reduced motion is on.",
  art: "motion",
  sections: [
    { id: "principles", title: "Principles", body: <MotionPrinciples /> },
    { id: "durations-and-curves", title: "Durations and curves", body: <MotionTokens /> },
    { id: "rules", title: "Rules and reduced motion", body: <MotionRules /> },
  ],
};

/* ============================================================================
   CONTENT AND WRITING
   ============================================================================ */

function Voice() {
  return (
    <div className="prose">
      <Rule icon={AlignLeft}>
        Write like a <strong className="hl">calm, competent colleague</strong>: plain words, short sentences, the
        product’s own vocabulary. Users are coordinators and engineers who know their work, not the software.
      </Rule>
      <Table
        head={["Principle", "Instead of", "Write"]}
        rows={[
          ["Say the result", "Submit", "Save schedule"],
          ["Plain words", "Invalid input detected", "Enter a date after the start date"],
          ["Sentence case", "Export To Excel", "Export to Excel"],
          ["Short", "Click here in order to apply the selected filters", "Apply filters"],
          ["Calm", "Error! Something went wrong!!", "The report didn’t save. Try again."],
        ]}
      />
    </div>
  );
}

function Labels() {
  return (
    <div className="prose">
      <ul className="dodont">
        <Do>Start buttons with a verb and name the result: <em>Save schedule</em>,{" "}
            <em>Apply filters</em>, <em>Back to calendar</em>.</Do>
        <Do>Use the same word for the same intent everywhere: <em>Update</em> for changing an existing
            report, never <em>Edit</em> in one view and <em>Update</em> in another.</Do>
        <Do>Keep counts inside the label: <em>Export selected (3)</em>, <em>Download 3 reports</em>.</Do>
        <Dont>Use a placeholder as the label. It disappears as soon as someone types.</Dont>
        <Dont>Add a subtitle under a dialog title. Account, date, and counts go in the body.</Dont>
      </ul>
    </div>
  );
}

function Vocabulary() {
  return (
    <div className="prose">
      <Table
        head={["Use", "Not", "Why"]}
        rows={[
          ["Schedule detail", "Job detail", "The legacy label is retired everywhere"],
          ["Update", "Edit", "One verb for changing an existing report"],
          ["Cancel schedule", "Delete schedule", "The schedule is cancelled, its Work Orders return to Pending"],
          ["Remarks", "Comments, Notes", "The shared free-text field when closing a schedule"],
          ["All entities", "All, Everything", "The first option of every entity scope"],
          ["Whole page, Fit width", "Fit, Zoom to fit", "The two document viewer fit modes"],
        ]}
      />
    </div>
  );
}

function Messages() {
  return (
    <div className="prose">
      <Table
        head={["Message", "Pattern", "Example"]}
        rows={[
          ["Field error", "What to fix", "Enter an email address, like name@company.com"],
          ["Action failed", "What happened. What to do", "The report didn’t send. Check the connection and try again."],
          ["Destructive confirm", "What happens. That it can’t be undone", "Cancel this schedule? All 4 Work Orders return to Pending. This can’t be undone."],
          ["Empty", "What appears here. How to start", "No service reports for this day. Create one from a schedule."],
          ["Success", "What happened, briefly", "Report sent to customer"],
        ]}
      />
    </div>
  );
}

function Formats() {
  return (
    <div className="prose">
      <Table
        head={["Value", "Format", "Example"]}
        rows={[
          ["Date", "Day, short month, year", "12 Oct 2026"],
          ["Date with weekday (mobile day bar)", "Weekday, day, short month, year", "Monday, 31 Aug 2026"],
          ["Time", "24-hour", "09:00 – 11:30"],
          ["Range", "En dash with spaces", "1–14 Oct 2026, 09:00 – 11:30"],
          ["Results", "Showing range of total", "Showing 1–25 of 312"],
          ["Numbers in tables", "Tabular figures, right-aligned when compared", "1,204"],
        ]}
      />
    </div>
  );
}

export const content: PageContent = {
  lead: "How Esco products speak: plain, calm, and specific, with the same word for the same thing on every screen.",
  art: "content",
  sections: [
    { id: "voice", title: "Voice and tone", body: <Voice /> },
    { id: "labels", title: "Buttons and labels", body: <Labels /> },
    { id: "vocabulary", title: "Vocabulary", body: <Vocabulary />, more: { href: "/get-started/introduction", label: "Glossary" } },
    { id: "messages", title: "Messages", body: <Messages /> },
    { id: "formats", title: "Dates, times, and numbers", body: <Formats /> },
  ],
};
