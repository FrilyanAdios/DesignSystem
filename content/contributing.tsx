import {
  ClipboardCheck,
  Code2,
  FileText,
  GitMerge,
  GitPullRequest,
  Lightbulb,
  ListChecks,
  PenTool,
  Rocket,
  Search,
  type LucideIcon,
} from "lucide-react";
import type { PageContent } from "./index";
import { Rule } from "./principles";
import { Checks, Code, T, Table } from "./dev-kit";

/* ---------------------------------------------------------------------------
   Contributing — how a change gets into the system, from "is this already
   solved?" to a changelog entry. The exception rule comes from
   NPD-FSM/DESIGN_SYSTEM.md; the rest is the system's working process.
   --------------------------------------------------------------------------- */

/* ---- 1. ways to contribute ------------------------------------------------ */

function Ways() {
  return (
    <div className="prose">
      <Rule icon={Lightbulb}>
        Everyone who builds Esco products owns the system. The smallest contribution, a{" "}
        <strong className="hl">bug report with a screenshot</strong>, is as welcome as a new component.
      </Rule>
      <Table
        head={["Contribution", "Example", "Effort", "Needs a proposal"]}
        rows={[
          ["Report a problem", "A pill fails contrast in dark mode", "Minutes", "No"],
          ["Fix the documentation", "A wrong token value, a missing example", "Under an hour", "No"],
          ["Fix a component", "Focus ring missing on the icon button", "Hours", "No, link the issue"],
          ["Add a variant", "A compact size for the date picker", "Days", "Yes, short"],
          ["Add a token", "A new status word that fits no family", "Days", "Yes, short"],
          ["Add a component or pattern", "A signature pad shared by two modules", "Weeks", "Yes, full"],
        ]}
      />
    </div>
  );
}

/* ---- 2. check first ------------------------------------------------------- */

function CheckFirst() {
  return (
    <div className="prose">
      <Rule icon={Search}>
        Most requests are <strong className="hl">already solved</strong>. Search components, patterns, and existing
        screens before proposing anything new.
      </Rule>
      <Table
        head={["If", "Then"]}
        rows={[
          ["A component already does it", "Use it as it is. Don’t restyle it in your module"],
          ["One exists but lacks a size, state, or option", "Propose a variant of that component"],
          ["Only one screen in one module needs it", "Build it locally and document it as an exception"],
          ["Two or more modules or products need it", "Propose it for the shared system"],
          ["It changes how an existing component behaves", "Propose it, and list every screen it affects"],
        ]}
      />
      <p>
        The rule of two keeps the system small: a pattern becomes shared once a second team needs it, not before. Until
        then, a well-documented local build is the right answer.
      </p>
    </div>
  );
}

/* ---- 3. process ----------------------------------------------------------- */

const STAGES: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: FileText, title: "Propose", body: "Describe the problem with evidence. Not the solution yet." },
  { icon: ClipboardCheck, title: "Review", body: "Design and engineering agree it belongs in the system." },
  { icon: PenTool, title: "Design", body: "Every state, real content, tokens only, all platforms considered." },
  { icon: Code2, title: "Build", body: "Shared code, tests, and a documentation page." },
  { icon: Rocket, title: "Release", body: "Versioned, in the changelog, announced to teams." },
];

function Process() {
  return (
    <div className="prose">
      <Rule icon={GitPullRequest}>
        Five stages. A small fix skips straight to <strong className="hl">Build</strong>; a new component goes through
        all five.
      </Rule>
      <ol className="steps">
        {STAGES.map(({ icon: Icon, title, body }, i) => (
          <li key={title}>
            <span className="st-icon" aria-hidden="true">
              <Icon size={20} />
            </span>
            <span className="st-num">Stage {i + 1}</span>
            <h3>{title}</h3>
            <p>{body}</p>
          </li>
        ))}
      </ol>
      <p>
        A proposal can stop at Review with “use this existing component instead”. That is a good outcome: the system
        stayed consistent and the team got an answer quickly.
      </p>
    </div>
  );
}

/* ---- 4. proposal ---------------------------------------------------------- */

function Proposal() {
  return (
    <div className="prose">
      <p>
        A good proposal is short and concrete. Lead with the problem and the screens where it hurts; reviewers decide on
        evidence, not on a polished mock-up.
      </p>
      <Code title="proposal.md" lang="markdown">{`
## Problem
What users can't do, or what is inconsistent today. One paragraph.

## Evidence
- Screens and modules where it appears (screenshots or links)
- How often it comes up; which teams need it

## Why existing components don't work
Which components were tried, and what each one is missing.

## Proposal
Variant, new token, or new component. A rough sketch is enough.

## Scope
- Platforms: Web / Flutter / iOS
- States: rest, hover, focus, selected, disabled, loading, empty, error
- Accessibility: keyboard, screen reader, contrast, target size
- Screens that change if this is adopted
`}</Code>
    </div>
  );
}

/* ---- 5. design contribution ----------------------------------------------- */

function DesignContribution() {
  return (
    <div className="prose">
      <Checks
        items={[
          "Built from existing library components and token variables. No detached instances, no new hex values.",
          "Every state drawn, plus empty and error.",
          "Real content, including the longest realistic value.",
          "Behavior shown for web breakpoints and mobile widths.",
          "Light and dark shown for mobile.",
          "Platform differences called out: what the Flutter and iOS versions do differently, and why.",
          "The hand-off checklist from For designers passes.",
        ]}
      />
    </div>
  );
}

/* ---- 6. code contribution ------------------------------------------------- */

function CodeContribution() {
  return (
    <div className="prose">
      <Table
        head={["Platform", "Where it goes", "Must include"]}
        rows={[
          ["Web", <T>components/ui/</T>, "Variants as props, all states, axe test, keyboard support"],
          ["Flutter", <T>lib/widgets/</T>, "Theme-driven colors, 48 targets, guideline tests"],
          ["iOS", <T>Components/</T>, "Asset-catalog colors, Dynamic Type, VoiceOver labels"],
        ]}
      />
      <p>
        Tokens only, one implementation per pattern, and no module-prefixed copies. Open the pull request with the
        design-system checklist from <strong className="hl">For developers</strong> and screenshots of every new state.
      </p>
      <p>
        A shared component is only finished when its documentation page exists: Usage, Style, Code, and Accessibility.
      </p>
    </div>
  );
}

/* ---- 7. documentation ----------------------------------------------------- */

function Docs() {
  return (
    <div className="prose">
      <p>
        This site is a Next.js app. Every page in the sidebar comes from <T>lib/nav.ts</T>; a page shows its empty outline
        until it has content.
      </p>
      <Table
        head={["To", "Do this"]}
        rows={[
          ["Write a page", <>Add <T>content/&lt;page&gt;.tsx</T> exporting a <T>PageContent</T>, then register its URL in <T>content/index.ts</T></>],
          ["Add a page", <>Add an item to the right group in <T>lib/nav.ts</T>. Sidebar, search, and prev/next update themselves</>],
          ["Make it a guide", <>Set <T>guide</T> and give sections a <T>part</T>, <T>summary</T>, and <T>takeaway</T></>],
          ["Add title art", <>Set <T>art</T>, or add a new motif in <T>components/PageArt.tsx</T></>],
          ["Change a token value", <>Change it in the product source first, then in <T>content/dev-kit.tsx</T> and <T>app/globals.css</T></>],
        ]}
      />
      <Code title="content/my-page.tsx" lang="tsx">{`
import type { PageContent } from "./index";

export const myPage: PageContent = {
  lead: "One sentence: what this page helps the reader do.",
  sections: [
    { id: "overview", title: "Overview", body: <p>…</p> },
    { id: "guidelines", title: "Guidelines", body: <p>…</p> },
  ],
};
`}</Code>
      <ul className="dev-notes">
        <li>Sentence case. Short sentences. One idea per paragraph.</li>
        <li>Name tokens and components exactly as they appear in code.</li>
        <li>Show the rule, then why it matters, then an example.</li>
        <li>Write for someone new to the team: no unexplained abbreviations or internal nicknames.</li>
      </ul>
    </div>
  );
}

/* ---- 8. review ------------------------------------------------------------ */

function Review() {
  return (
    <div className="prose">
      <Rule icon={ListChecks}>
        Reviewers ask the same six questions of every contribution, big or small.
      </Rule>
      <Checks
        items={[
          "Does it follow the seven design principles?",
          "Does it reuse what exists instead of duplicating it?",
          "Are all states and both themes covered?",
          "Does it pass the accessibility criteria on every platform it touches?",
          "Is it consistent across web, Flutter, and iOS, or is the difference explained?",
          "Is it documented well enough that the next person won’t need to ask?",
        ]}
      />
    </div>
  );
}

/* ---- 9. release ----------------------------------------------------------- */

function Release() {
  return (
    <div className="prose">
      <Rule icon={GitMerge}>
        The version number tells teams <strong className="hl">how careful to be</strong> when they update.
      </Rule>
      <Table
        head={["Change", "Version", "Example"]}
        rows={[
          ["Fix that changes nothing anyone relies on", "Patch  1.4.0 → 1.4.1", "Focus ring restored on icon button"],
          ["Something new, nothing removed", "Minor  1.4.0 → 1.5.0", "New compact date picker variant, new token"],
          ["Something removed, renamed, or behaving differently", "Major  1.4.0 → 2.0.0", "Token renamed, dialog footer order changed"],
        ]}
      />
      <p>
        Before removing anything, mark it deprecated, point to the replacement, and keep it for at least one minor
        release. Every release gets a changelog entry.
      </p>
      <Code title="Changelog entry" lang="markdown">{`
## 1.5.0 — 2026-10-20
### Added
- Date picker: compact variant for dense toolbars (web).
### Fixed
- Icon button: visible focus ring restored (web, Flutter).
### Deprecated
- \`--radius\`: use \`--radius-control\`. Removed in 2.0.0.
`}</Code>
    </div>
  );
}

/* ---- 10. exceptions ------------------------------------------------------- */

function Exceptions() {
  return (
    <div className="prose">
      <p>
        Sometimes a screen genuinely can’t meet the system. The design contract allows that, on one condition: prefer a{" "}
        <strong className="hl">small, reversible exception</strong> over a new parallel design language, and write the
        reason beside the code.
      </p>
      <Code title="Exception comment" lang="css">{`
/* DS EXCEPTION — Service Schedule calendar cells
   Rule:    controls visible at rest
   Why:     an "Add note" button in every empty cell made the calendar unreadable
   Instead: shown on cell hover and keyboard focus; notes themselves stay visible
   Review:  fold into the calendar component, or remove, by 2.0.0 */
`}</Code>
      <p>
        Exceptions are reviewed at each major release. One that keeps coming back is a sign the system is missing
        something, and becomes a proposal.
      </p>
    </div>
  );
}

export const contributing: PageContent = {
  lead: "How a fix, a token, or a new component gets into the system: check what exists, propose with evidence, build it everywhere, release it with a version.",
  art: "contributing",
  guide: {
    meta: ["About 9 minutes", "10 chapters in 3 parts", "For designers, developers, and QA"],
    questions: [
      { q: "Can I just fix a typo or a bug?", id: "ways-to-contribute" },
      { q: "Should this be a shared component?", id: "check-first" },
      { q: "What goes in a proposal?", id: "proposal" },
      { q: "How do I add a page to this site?", id: "documentation" },
      { q: "Is my change a major version?", id: "release" },
      { q: "My screen can’t follow a rule. Now what?", id: "exceptions" },
    ],
  },
  sections: [
    {
      id: "ways-to-contribute",
      title: "Ways to contribute",
      part: { title: "Before you start", description: "What kind of change it is, and whether it’s needed." },
      summary: "From a bug report to a new component.",
      body: <Ways />,
      takeaway: "Small fixes go straight in. Anything new starts with a proposal.",
    },
    {
      id: "check-first",
      title: "Check what exists",
      summary: "Use, extend, keep local, or propose.",
      body: <CheckFirst />,
      takeaway: "Shared once a second team needs it. Until then, local and documented.",
      more: { href: "/components", label: "Components" },
    },
    {
      id: "process",
      title: "The five stages",
      part: { title: "Make the change", description: "From proposal to merged code and documentation." },
      summary: "Propose, review, design, build, release.",
      body: <Process />,
      takeaway: "Problem first, solution second. “Use what exists” is a valid answer.",
    },
    {
      id: "proposal",
      title: "Writing a proposal",
      summary: "A template that gets a quick decision.",
      body: <Proposal />,
      takeaway: "Evidence and scope beat a polished mock-up.",
    },
    {
      id: "design-contribution",
      title: "Contributing design",
      summary: "What the Figma file includes before review.",
      body: <DesignContribution />,
      takeaway: "Library components, every state, real content, all platforms.",
      more: { href: "/get-started/designing", label: "For designers" },
    },
    {
      id: "code-contribution",
      title: "Contributing code",
      summary: "Where code goes on each platform and what it must include.",
      body: <CodeContribution />,
      takeaway: "Tokens, states, tests, and a documentation page. Then it’s done.",
      more: { href: "/get-started/developing", label: "For developers" },
    },
    {
      id: "documentation",
      title: "Contributing documentation",
      summary: "How this site is put together, and how to write for it.",
      body: <Docs />,
      takeaway: "One content file, one line in the index, one item in the nav.",
    },
    {
      id: "review",
      title: "How contributions are reviewed",
      part: { title: "After the change", description: "Review, release, and the exceptions that remain." },
      summary: "Six questions asked of everything.",
      body: <Review />,
      takeaway: "Principles, reuse, states, accessibility, consistency, documentation.",
      more: { href: "/get-started/principles", label: "Design principles" },
    },
    {
      id: "release",
      title: "Versions and the changelog",
      summary: "Patch, minor, major, and how to deprecate.",
      body: <Release />,
      takeaway: "Deprecate first, remove in the next major, and log every release.",
      more: { href: "/resources/changelog", label: "Changelog" },
    },
    {
      id: "exceptions",
      title: "Exceptions",
      summary: "When a rule can’t be followed.",
      body: <Exceptions />,
      takeaway: "Small, reversible, written beside the code, and reviewed every major release.",
    },
  ],
};
