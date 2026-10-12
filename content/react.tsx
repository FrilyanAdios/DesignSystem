import { Accessibility, Braces, Gauge, Layers, ListChecks, Server } from "lucide-react";
import type { PageContent } from "./index";
import { Rule } from "./principles";
import { Checks, Code, PLATFORM_REFS, Refs, T, Table } from "./dev-kit";

/* ---------------------------------------------------------------------------
   Web guide — React and Next.js (App Router, TypeScript).
   Class names follow NPD-FSM/DESIGN_SYSTEM.md; keep them in step.
   --------------------------------------------------------------------------- */

function Setup() {
  return (
    <div className="prose">
      <Rule icon={Braces}>
        Tokens, the font, and the shared components are set up <strong className="hl">once, at the root</strong>.
        Modules only compose.
      </Rule>
      <Code title="Project layout" lang="text">{`
app/
  layout.tsx          root layout: font, tokens, shell
  globals.css         imports tokens.css + base styles
  (modules)/schedule/ one folder per module
components/
  ui/                 shared components: Button, Field, Pill, Dialog …
  schedule/           module compositions only, no restyled copies of ui/
styles/
  tokens.css          every design token, nothing else
lib/
  tokens.ts           typed mirror for JS-only consumers (charts, canvas)
  breakpoints.ts
`}</Code>
      <p>
        Load Noto Sans with <T>next/font</T>. It self-hosts the file, removes the layout shift, and exposes the family as a
        CSS variable that <T>--font</T> points to.
      </p>
      <Code title="app/layout.tsx" lang="tsx">{`
import { Noto_Sans } from "next/font/google";
import "./globals.css";

const noto = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-noto",
  display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={noto.variable}>
      <body>{children}</body>
    </html>
  );
}
`}</Code>
      <p>
        Turn on <T>strict</T> in <T>tsconfig.json</T> and the <T>jsx-a11y</T> ESLint plugin. Both catch design-system
        mistakes before review does.
      </p>
    </div>
  );
}

function Tokens() {
  return (
    <div className="prose">
      <p>
        CSS custom properties are the token layer on web. Copy them from <T>NPD-FSM/styles.css</T> into{" "}
        <T>styles/tokens.css</T> unchanged, then reference them everywhere.
      </p>
      <Code title="styles/tokens.css (excerpt)" lang="css">{`
:root {
  --primary: #00467f;  --primary-700: #003559;  --primary-50: #ebf0f7;
  --fg: #393939;  --fg-2: #4d4d4f;  --fg-3: #616161;  --fg-4: #737373;
  --border: #e2e8f0;  --border-input: #cbd2d9;
  --sp-1: 4px; --sp-2: 8px; --sp-3: 12px; --sp-4: 16px; --sp-5: 24px;
  --h-sm: 32px; --h-md: 36px; --h-lg: 40px; --h-xl: 44px;
  --radius-control: 6px; --radius-field: 8px; --radius-card: 10px; --radius-pill: 20px;
  --fs-page: 19px; --fs-section: 16px; --fs-card: 14px; --fs-body: 13.5px;
  --fs-sub: 12.5px; --fs-label: 12px; --fs-help: 11.5px;
  --font: var(--font-noto), "Noto Sans", system-ui, sans-serif;
  --focus-ring: 2px solid var(--primary);  --focus-offset: 2px;
  --issued-bg: #e6f0fa;   --issued-fg: #0a5187;
  --approved-bg: #e7f6ed; --approved-fg: #15803d;
  --revision-bg: #fdf2e1; --revision-fg: #b45309;
  --rejected-bg: #fdeaea; --rejected-fg: #c2362f;
  --pending-bg: #eef1f5;  --pending-fg: #4a5b69;
}
`}</Code>
      <p>
        Where CSS can’t reach, such as a chart library or a canvas, read a typed mirror. Keep it generated from, or
        checked against, the CSS file so the two never drift.
      </p>
      <Code title="lib/tokens.ts" lang="ts">{`
export const color = {
  primary: "#00467f",
  fg: "#393939",
  fg3: "#616161",
  border: "#e2e8f0",
} as const;

export const status = {
  issued: { bg: "#e6f0fa", fg: "#0a5187" },
  approved: { bg: "#e7f6ed", fg: "#15803d" },
  revision: { bg: "#fdf2e1", fg: "#b45309" },
  rejected: { bg: "#fdeaea", fg: "#c2362f" },
  pending: { bg: "#eef1f5", fg: "#4a5b69" },
} as const;

export type StatusFamily = keyof typeof status;
`}</Code>
      <p>
        Plain CSS, CSS Modules, or a utility framework mapped to these variables are all fine. Runtime CSS-in-JS is not:
        it doesn’t work in Server Components and duplicates the token layer.
      </p>
    </div>
  );
}

function ServerClient() {
  return (
    <div className="prose">
      <Rule icon={Server}>
        Components are <strong className="hl">Server Components by default</strong>. Add <T>"use client"</T> only to the
        small leaf that needs state, effects, or event handlers.
      </Rule>
      <Table
        head={["Server Component", "Client Component"]}
        rows={[
          ["Page, layout, register shell, detail view", "Dialog, menu, popover, search with suggestions"],
          ["Fetches data, reads cookies and headers", "Holds UI state, listens to keyboard and pointer"],
          ["Pill, field label, read-only card", "Table settings, date picker, toast queue"],
        ]}
      />
      <p>
        Pass data down as props; don’t move a whole page to the client to make one button interactive. Shared{" "}
        <T>ui/</T> components that need no interactivity stay server-safe.
      </p>
    </div>
  );
}

function Buttons() {
  return (
    <div className="prose">
      <p>
        One component, a <T>variant</T> prop, the canonical classes underneath. The type system makes the accessible name
        of an icon-only button required.
      </p>
      <Code title="components/ui/Button.tsx" lang="tsx">{`
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger" | "solid-danger";
type Size = "sm" | "md" | "lg";

const VARIANT: Record<Variant, string> = {
  primary: "btn btn-primary",
  secondary: "btn",
  ghost: "btn btn-ghost",
  danger: "btn btn-danger",
  "solid-danger": "btn btn-solid-danger", // final step of a confirmation only
};

type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> & {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  loading?: boolean;
  type?: "button" | "submit";
};

export function Button({ variant = "secondary", size = "lg", icon, loading, children, disabled, type = "button", className, ...rest }: Props) {
  return (
    <button
      type={type}
      className={[VARIANT[variant], size !== "lg" && \`btn-\${size}\`, className].filter(Boolean).join(" ")}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading ? <Spinner aria-hidden /> : icon}
      {children}
    </button>
  );
}

/** Icon-only: universal actions only, and the name is mandatory. */
export function IconButton({ label, icon, ...rest }: { label: string; icon: ReactNode } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type="button" className="icon-btn" aria-label={label} title={label} {...rest}>
      {icon}
    </button>
  );
}
`}</Code>
      <ul className="dev-notes">
        <li>Labels start with a verb and name the result: “Save schedule”, “Export to Excel”.</li>
        <li>An icon sits before the label. A trailing chevron means a menu or disclosure.</li>
        <li>Never two filled primaries side by side.</li>
        <li>Loading keeps the width and the label, so nothing jumps.</li>
      </ul>
    </div>
  );
}

function Fields() {
  return (
    <div className="prose">
      <p>
        The label is above the field, helper text below, and an error replaces the helper with text that says what to
        fix. <T>useId</T> wires them together.
      </p>
      <Code title="components/ui/Field.tsx" lang="tsx">{`
"use client";
import { useId } from "react";

export function TextField({ label, help, error, ...input }: {
  label: string;
  help?: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const id = useId();
  const noteId = \`\${id}-note\`;
  return (
    <div className="field">
      <label className="field-label" htmlFor={id}>{label}</label>
      <input
        id={id}
        className="finp"
        aria-invalid={!!error || undefined}
        aria-describedby={help || error ? noteId : undefined}
        {...input}
      />
      {(error || help) && (
        <p id={noteId} className={error ? "field-error" : "field-help"}>
          {error && <AlertIcon aria-hidden />}
          {error ?? help}
        </p>
      )}
    </div>
  );
}
`}</Code>
      <ul className="dev-notes">
        <li>A placeholder is an example, never the label.</li>
        <li>Validate on submit or blur, not on every keystroke.</li>
        <li>Errors use text and an icon, not red alone. Move focus to the first invalid field.</li>
        <li>Dataset search shows up to six suggestions attached under the field, with Up, Down, Enter, and Escape.</li>
      </ul>
    </div>
  );
}

function Status() {
  return (
    <div className="prose">
      <p>
        Business words map to five families in one place. Components never pick a color for a status themselves.
      </p>
      <Code title="components/ui/StatusPill.tsx" lang="tsx">{`
import type { StatusFamily } from "@/lib/tokens";

const FAMILY: Record<string, StatusFamily> = {
  confirmed: "issued",
  dispatched: "issued",
  completed: "approved",
  closed: "approved",
  tentative: "revision",
  "awaiting parts": "revision",
  rejected: "rejected",
  cancelled: "rejected",
  pending: "pending",
  rescheduled: "pending",
};

export const familyOf = (label: string): StatusFamily => FAMILY[label.toLowerCase()] ?? "pending";

export function StatusPill({ label }: { label: string }) {
  return (
    <span className={\`pill b-\${familyOf(label)}\`}>
      <span className="d" aria-hidden="true" />
      {label}
    </span>
  );
}
`}</Code>
      <p>
        A read-only status is a <T>.pill</T>. A status you can change is a <T>&lt;button className="statectl"&gt;</T>{" "}
        with <T>aria-haspopup="menu"</T> and a chevron. Never make a read-only pill look like a dropdown.
      </p>
    </div>
  );
}

function Overlays() {
  return (
    <div className="prose">
      <Rule icon={Layers}>
        Dialogs use the native <T>&lt;dialog&gt;</T> with <T>showModal()</T>. The browser makes the page behind inert and
        closes on Escape; you restore focus.
      </Rule>
      <Code title="components/ui/Dialog.tsx" lang="tsx">{`
"use client";
import { useEffect, useRef } from "react";

export function Dialog({ open, onClose, title, icon, children, footer }: {
  open: boolean;
  onClose: () => void;
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const trigger = useRef<Element | null>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) {
      trigger.current = document.activeElement;
      d.showModal();
    } else if (!open && d.open) {
      d.close();
    }
  }, [open]);

  // Fires for Escape and for d.close(): always hand focus back to the trigger.
  const handleClose = () => {
    (trigger.current as HTMLElement | null)?.focus();
    onClose();
  };

  return (
    <dialog ref={ref} className="modal" aria-labelledby="dlg-title" onClose={handleClose}>
      <header className="mh">
        {icon && <span className="mh-tile" aria-hidden="true">{icon}</span>}
        <h2 id="dlg-title">{title}</h2>
        <IconButton label="Close dialog" icon={<XIcon />} onClick={onClose} />
      </header>
      <div className="mb">{children}</div>
      <footer className="mf">{footer}</footer>
    </dialog>
  );
}
`}</Code>
      <Table
        head={["Rule", "Detail"]}
        rows={[
          ["Width", <>440–560px default, <T>.wide</T> 620–760px, <T>.xl</T> up to 1040px</>],
          ["Height", "24px viewport margin; only the body scrolls, header and footer stay"],
          ["Header", "30px icon tile, one concise title, close button last"],
          ["Footer", "Secondary then primary, aligned right"],
          ["Below 600px", "Full width, bottom aligned, 44px actions"],
          ["Scrim", <><T>::backdrop</T> replaces <T>.ov</T>, colored with <T>--scrim</T></>],
          ["Never", "A modal inside a modal, or a popover inside a popover. Expand inline instead"],
        ]}
      />
      <p>
        Popovers and menus are anchored to their trigger, clamp to the viewport, close on outside click and Escape, and
        return focus to the trigger. Follow the matching WAI-ARIA pattern for keyboard support.
      </p>
    </div>
  );
}

function Tables() {
  return (
    <div className="prose">
      <p>
        Service Report is the reference register. A new table copies its anatomy instead of designing a new one.
      </p>
      <Code title="Register table" lang="tsx">{`
<div className="table-scroll" role="region" aria-label="Service reports" tabIndex={0}>
  <table className="sr-table">
    <colgroup>{/* widths by content type */}</colgroup>
    <thead>
      <tr>
        <th scope="col" aria-sort="descending">Report date</th>
        <th scope="col">Customer</th>
        <th scope="col">Status</th>
      </tr>
    </thead>
    <tbody>{rows.map((r) => <ReportRow key={r.id} report={r} />)}</tbody>
  </table>
</div>
`}</Code>
      <ul className="dev-notes">
        <li>Fixed layout, 56px sticky header, 13.5px cells with 13px × 16px padding.</li>
        <li>One value per cell. Ellipsis only when the full value is in the detail view or an accessible label.</li>
        <li>Narrow screens scroll horizontally. Font size never shrinks.</li>
        <li>
          Footer order: Rows per page, page numbers, Go to, scope, then <T>Showing X–Y of Z</T>.
        </li>
        <li>A row with one destination is the link. No eye button, no kebab on every row.</li>
      </ul>
    </div>
  );
}

function A11y() {
  return (
    <div className="prose">
      <Rule icon={Accessibility}>
        Use the right element first, ARIA second. A <T>&lt;button&gt;</T> already has the role, focus, and keyboard
        behavior a div would have to fake.
      </Rule>
      <Code title="globals.css" lang="css">{`
:focus-visible {
  outline: var(--focus-ring);
  outline-offset: var(--focus-offset);
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation: none !important;
    transition: none !important;
    scroll-behavior: auto !important;
  }
}
`}</Code>
      <Code title="e2e/a11y.spec.ts" lang="ts">{`
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("service report register has no AA violations", async ({ page }) => {
  await page.goto("/service-reports");
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag22aa"]).analyze();
  expect(results.violations).toEqual([]);
});
`}</Code>
      <p>
        Automated checks find about a third of issues. Also tab through every new screen with the keyboard only, and read
        it once with VoiceOver or NVDA.
      </p>
    </div>
  );
}

function Responsive() {
  return (
    <div className="prose">
      <Code title="lib/breakpoints.ts" lang="ts">{`
/** Mirror of the media queries in styles/layout.css. CSS variables can't be used in @media. */
export const bp = { desktop: 1180, tablet: 900, toolbar: 780, phone: 640 } as const;
`}</Code>
      <Code title="styles/layout.css" lang="css">{`
@media (max-width: 1179px) { .detail-grid { grid-template-columns: 1fr; } }
@media (max-width: 899px)  { .split { flex-direction: column; } }
@media (max-width: 639px)  { .page { padding-inline: var(--gutter-sm); } }

/* A component reflows by its own width, wherever it is placed. */
.report-card { container-type: inline-size; }
@container (max-width: 480px) { .report-card .meta { grid-template-columns: 1fr; } }
`}</Code>
    </div>
  );
}

function Performance() {
  return (
    <div className="prose">
      <Rule icon={Gauge}>
        Fast is part of calm. A register that stutters feels broken, however good it looks.
      </Rule>
      <Table
        head={["Use", "Why"]}
        rows={[
          [<T>next/font</T>, "Self-hosted Noto Sans, no layout shift"],
          [<T>next/image</T>, "Sized, lazy, modern formats for product photos and logos"],
          [<T>next/dynamic</T>, "Load the PDF viewer, charts, and rich editors only when opened"],
          ["Per-icon imports", "Import each icon by name so unused icons are not bundled"],
          ["Server-side paging", "Registers fetch one page, not the whole dataset"],
          ["Skeletons at final size", "Loading never moves the layout when data arrives"],
        ]}
      />
    </div>
  );
}

const CHECKLIST = [
  "Tokens from styles/tokens.css only. No hex or px in component CSS.",
  "Shared ui/ components used; module folders only compose.",
  <><T>"use client"</T> only on interactive leaves.</>,
  "Real buttons with type, labels that start with a verb, one primary per region.",
  "Fields have a label above, helper or error below, wired with aria-describedby.",
  "Dialogs use <dialog>, trap and restore focus, and follow the modal anatomy.",
  "Tables follow the Service Report register and scroll on narrow screens.",
  "axe passes; keyboard-only and screen reader walkthrough done.",
  "Checked at 1180, 900, 780, 640, and 360 wide, and at 200% zoom.",
];

function Checklist() {
  return (
    <div className="prose">
      <Rule icon={ListChecks}>
        Run through this before asking for review.
      </Rule>
      <Checks items={CHECKLIST} />
      <Refs items={[PLATFORM_REFS.react, PLATFORM_REFS.next, PLATFORM_REFS.apg, PLATFORM_REFS.wcag]} />
    </div>
  );
}

export const react: PageContent = {
  lead: "Building Esco web products with React and the Next.js App Router: setup, tokens, the shared components, and the checks before review.",
  art: "react",
  guide: {
    meta: ["About 12 minutes", "12 chapters in 3 parts", "React 19, Next.js App Router, TypeScript"],
    questions: [
      { q: "How do I load Noto Sans?", id: "setup" },
      { q: "Where do the tokens live?", id: "tokens" },
      { q: "Should this be a client component?", id: "server-and-client" },
      { q: "How do I build an accessible dialog?", id: "dialogs-and-popovers" },
      { q: "Which color is this status?", id: "status" },
      { q: "How do I test accessibility?", id: "accessibility" },
    ],
  },
  sections: [
    {
      id: "setup",
      title: "Project setup",
      part: { title: "Set up", description: "Font, tokens, and where files go." },
      summary: "Folder layout, Noto Sans, strict TypeScript.",
      body: <Setup />,
      takeaway: "Font and tokens at the root. ui/ for shared components, module folders only compose.",
    },
    {
      id: "tokens",
      title: "Tokens in CSS and TypeScript",
      summary: "Custom properties first, a typed mirror where CSS can’t reach.",
      body: <Tokens />,
      takeaway: "var(--token) in CSS; lib/tokens.ts only for charts and canvas.",
      more: { href: "/foundations/design-tokens", label: "Design tokens reference" },
    },
    {
      id: "server-and-client",
      title: "Server and client components",
      summary: "Where the \"use client\" line goes.",
      body: <ServerClient />,
      takeaway: "Server by default. Client only for the interactive leaf.",
    },
    {
      id: "buttons",
      title: "Buttons and actions",
      part: { title: "Build the components", description: "The shared pieces every module reuses." },
      summary: "One Button with variants, and an IconButton that requires a name.",
      body: <Buttons />,
      takeaway: "Variant prop, canonical classes, type=\"button\", loading keeps size.",
      more: { href: "/components/button", label: "Button" },
    },
    {
      id: "fields",
      title: "Fields and forms",
      summary: "Label above, note below, errors in words.",
      body: <Fields />,
      takeaway: "useId ties label, input, and note together. Errors say what to fix.",
      more: { href: "/patterns/forms", label: "Forms" },
    },
    {
      id: "status",
      title: "Status pills",
      summary: "Business words mapped to five families, in one place.",
      body: <Status />,
      takeaway: "familyOf(label) decides the color. Components never do.",
      more: { href: "/components/status-pill", label: "Status pill" },
    },
    {
      id: "dialogs-and-popovers",
      title: "Dialogs and popovers",
      summary: "Native dialog, canonical anatomy, focus returned.",
      body: <Overlays />,
      takeaway: "<dialog> plus showModal(), header-body-footer, never nested.",
      more: { href: "/components/dialog", label: "Dialog" },
    },
    {
      id: "tables",
      title: "Tables and registers",
      summary: "Copy the Service Report register.",
      body: <Tables />,
      takeaway: "Fixed layout, sticky header, one value per cell, scroll instead of shrink.",
      more: { href: "/patterns/data-registers", label: "Data registers" },
    },
    {
      id: "accessibility",
      title: "Accessibility",
      part: { title: "Make it solid", description: "Accessible, responsive, fast, then reviewed." },
      summary: "Focus ring, reduced motion, and automated checks.",
      body: <A11y />,
      takeaway: "Semantic HTML first, axe in CI, then a keyboard and screen reader pass.",
    },
    {
      id: "responsive",
      title: "Responsive layout",
      summary: "Literal breakpoints and container queries.",
      body: <Responsive />,
      takeaway: "Pages use the breakpoints; components use container queries.",
    },
    {
      id: "performance",
      title: "Performance",
      summary: "The Next.js features that keep registers quick.",
      body: <Performance />,
      takeaway: "next/font, next/image, next/dynamic, and paging on the server.",
    },
    {
      id: "checklist",
      title: "Web checklist",
      summary: "Nine checks before review.",
      body: <Checklist />,
      takeaway: "Tick all nine, then open the pull request.",
      more: { href: "/get-started/developing", label: "For developers" },
    },
  ],
};
