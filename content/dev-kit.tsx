import { Check, ExternalLink, X } from "lucide-react";

/* ---------------------------------------------------------------------------
   Building blocks and token data for the developer pages (For developers,
   Design tokens, and the three platform guides).

   Token values mirror the product source files; update both together:
   - Web:    NPD-FSM/styles.css (also carried 1:1 into app/globals.css)
   - Mobile: FSM-Mobile/css — styles.css, spacing-tokens.css, white-theme.css,
             status-badges.css, design-system-unification.css, theme-dark.css
   --------------------------------------------------------------------------- */

/** A titled, scrollable code sample. `title` is usually a file name. */
export function Code({ title, lang, children }: { title?: string; lang: string; children: string }) {
  return (
    <figure className="code-block">
      <figcaption>
        <span>{title ?? lang}</span>
        {title && <span className="cb-lang">{lang}</span>}
      </figcaption>
      <pre tabIndex={0}>
        <code>{children.replace(/^\n/, "").replace(/\s+$/, "")}</code>
      </pre>
    </figure>
  );
}

/** A plain lookup table. The first cell of each row is the row header. */
export function Table({ head, rows }: { head: string[]; rows: React.ReactNode[][] }) {
  return (
    <div className="table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            {head.map((h) => (
              <th key={h} scope="col">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(([first, ...rest], i) => (
            <tr key={i}>
              <th scope="row">{first}</th>
              {rest.map((cell, j) => (
                <td key={j}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export const T = ({ children }: { children: React.ReactNode }) => <code className="tok-code">{children}</code>;

/** A color value with its swatch. */
export const Hex = ({ v }: { v: string }) => (
  <span className="hex">
    <span className="hex-chip" style={{ background: v }} aria-hidden="true" />
    {v}
  </span>
);

export function Checks({ items }: { items: React.ReactNode[] }) {
  return (
    <ol className="checklist">
      {items.map((h, i) => (
        <li key={i} className="no-link">
          <span className="ck-box" aria-hidden="true">
            <Check size={14} />
          </span>
          <span className="ck-q">{h}</span>
        </li>
      ))}
    </ol>
  );
}

export type Ref = { href: string; label: string; note: string };

/** Official external references. Opens in a new tab. */
export function Refs({ items }: { items: Ref[] }) {
  return (
    <ul className="ref-list">
      {items.map((r) => (
        <li key={r.href}>
          <a href={r.href} target="_blank" rel="noreferrer">
            <span className="ref-label">
              {r.label}
              <ExternalLink size={14} aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </span>
            <span className="ref-note">{r.note}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

/* ---- token data ----------------------------------------------------------- */

export type ColorToken = { token: string; value: string; use: string };

/** Web (NPD-FSM/styles.css). */
export const WEB_COLOR: ColorToken[] = [
  { token: "--primary", value: "#00467F", use: "Primary button, active nav or tab, link, focus" },
  { token: "--primary-700", value: "#003559", use: "Hover and pressed primary" },
  { token: "--primary-100", value: "#CFE0EF", use: "Stronger tint, selected chip edge" },
  { token: "--primary-50", value: "#EBF0F7", use: "Selected background, quiet banner, icon tile" },
  { token: "--fg", value: "#393939", use: "Titles and main values (11.5:1)" },
  { token: "--fg-2", value: "#4D4D4F", use: "Body, labels, control text (8.4:1)" },
  { token: "--fg-3", value: "#616161", use: "Metadata, secondary lines (6.2:1)" },
  { token: "--fg-4", value: "#737373", use: "Captions, null values. Lowest text gray (4.7:1)" },
  { token: "--bg", value: "#FFFFFF", use: "Page background" },
  { token: "--muted", value: "#F9FAFB", use: "Toolbar or card hover, quiet section" },
  { token: "--surface-2", value: "#FBFCFE", use: "Alternating, low-emphasis surface" },
  { token: "--row-hover", value: "#F0F3F7", use: "Table row hover" },
  { token: "--row-sel", value: "#E9F1F9", use: "Selected table row" },
  { token: "--border", value: "#E2E8F0", use: "Component and section borders" },
  { token: "--border-input", value: "#CBD2D9", use: "Input, select, textarea borders" },
  { token: "--hairline", value: "#C3C3C3", use: "Dividers inside controls. Never text" },
  { token: "--icon-quiet", value: "#949494", use: "Decorative glyphs only (3.0:1). Never text" },
  { token: "--scrim", value: "rgba(17,32,44,.42)", use: "Every modal overlay" },
];

export type StatusFamily = "issued" | "approved" | "revision" | "rejected" | "pending";

export const STATUS: { family: StatusFamily; meaning: string; examples: string; bg: string; fg: string; mobileFg?: string; darkBg: string; darkFg: string }[] = [
  { family: "issued", meaning: "Informational", examples: "Issued, confirmed, dispatched", bg: "#E6F0FA", fg: "#0A5187", darkBg: "#132335", darkFg: "#8EC2F0" },
  { family: "approved", meaning: "Success", examples: "Approved, completed, closed", bg: "#E7F6ED", fg: "#15803D", mobileFg: "#146C34", darkBg: "#10301E", darkFg: "#6FD79B" },
  { family: "revision", meaning: "Attention", examples: "Tentative, revision, awaiting parts", bg: "#FDF2E1", fg: "#B45309", darkBg: "#32240F", darkFg: "#F3BD70" },
  { family: "rejected", meaning: "Error", examples: "Rejected, cancelled, failed", bg: "#FDEAEA", fg: "#C2362F", darkBg: "#3A1B1A", darkFg: "#FF9D95" },
  { family: "pending", meaning: "Neutral", examples: "Pending, rescheduled, draft", bg: "#EEF1F5", fg: "#4A5B69", darkBg: "#232C36", darkFg: "#C0CDD9" },
];

/** Mobile (FSM-Mobile/css), resolved after every stylesheet in load order. */
export const MOBILE_COLOR: { role: string; token: string; light: string; dark: string }[] = [
  { role: "Primary", token: "--esco-blue", light: "#00467F", dark: "#8FBDEC" },
  { role: "Primary pressed", token: "--esco-blue-int", light: "#003559", dark: "#B6D6F6" },
  { role: "On primary", token: "--on-primary", light: "#FFFFFF", dark: "#08121B" },
  { role: "Primary container", token: "--esco-tint", light: "#EAF1F7", dark: "#1E2A38" },
  { role: "Primary container strong", token: "--esco-tint-strong", light: "#DCE8F2", dark: "#27384C" },
  { role: "Background", token: "--bg", light: "#F6F8FA", dark: "#0F151C" },
  { role: "Surface", token: "--surface", light: "#FFFFFF", dark: "#182028" },
  { role: "Surface container", token: "--surface-container", light: "#FFFFFF", dark: "#1C242E" },
  { role: "Field surface", token: "--field-surface", light: "#FFFFFF", dark: "#131A21" },
  { role: "Text", token: "--on-surface", light: "#243342", dark: "#E8EEF4" },
  { role: "Secondary text", token: "--on-surface-var", light: "#596B7C", dark: "#B6C3CF" },
  { role: "Outline", token: "--outline", light: "#D8E1EA", dark: "#2E3945" },
  { role: "Input border (3:1)", token: "--outline-strong", light: "#7D8F9F", dark: "#5D6D7D" },
  { role: "Success", token: "--success", light: "#146C34", dark: "#5FD08A" },
  { role: "Attention", token: "--amber", light: "#B45309", dark: "#F0B96B" },
  { role: "Error", token: "--danger", light: "#C2362F", dark: "#FF9D95" },
  { role: "Nav label, inactive", token: "--nav-muted", light: "#5D7485", dark: "#A9B7C4" },
  { role: "Nav icon, inactive", token: "--nav-icon-muted", light: "#738B9D", dark: "#A9B7C4" },
];

export const WEB_TYPE = [
  { role: "Page title, one per page", token: "--fs-page", size: "19px", weight: "400" },
  { role: "Section or dialog title", token: "--fs-section", size: "16px", weight: "500–600" },
  { role: "Card title, record identity", token: "--fs-card", size: "14px", weight: "600" },
  { role: "Body, table cell, input", token: "--fs-body", size: "13.5px", weight: "400–500" },
  { role: "Secondary line, compact control", token: "--fs-sub", size: "12.5px", weight: "400–600" },
  { role: "Form label, above the field", token: "--fs-label", size: "12px", weight: "600" },
  { role: "Help text, caption", token: "--fs-help", size: "11.5px", weight: "400" },
  { role: "Micro label, structural only", token: "--fs-micro", size: "11px", weight: "600" },
];

/** Mobile type in logical units: CSS rem × 16 = Flutter logical px = iOS pt. */
export const MOBILE_TYPE = [
  { role: "Today heading", size: "26", weight: "600", m3: "headlineSmall (override)", ios: ".title" },
  { role: "Page title", size: "22", weight: "600", m3: "titleLarge", ios: ".title2" },
  { role: "Section title", size: "17", weight: "600", m3: "titleMedium", ios: ".headline" },
  { role: "Body, record identity", size: "16", weight: "400", m3: "bodyLarge", ios: ".callout" },
  { role: "Metadata", size: "14", weight: "400", m3: "bodyMedium", ios: ".subheadline" },
  { role: "Caption, badge, nav label", size: "13", weight: "500", m3: "labelMedium", ios: ".footnote" },
];

export const SPACING = [
  { token: "--sp-1", mobile: "--space-4", value: "4", use: "Text to its metadata" },
  { token: "--sp-2", mobile: "--space-8", value: "8", use: "Label to field, between related controls" },
  { token: "--sp-3", mobile: "--space-12", value: "12", use: "Icon to label" },
  { token: "--sp-4", mobile: "--space-16", value: "16", use: "Card padding, between fields, mobile gutter" },
  { token: "--sp-5", mobile: "--space-24", value: "24", use: "Between sections, desktop gutter, sheet padding" },
  { token: "--sp-6", mobile: "--space-32", value: "32", use: "Large separation" },
  { token: "--sp-7", mobile: "--space-40", value: "40", use: "Page-level separation" },
];

export const PLATFORM_REFS = {
  react: { href: "https://react.dev/reference/react", label: "React reference", note: "Components, hooks, Server Components" },
  next: { href: "https://nextjs.org/docs/app", label: "Next.js App Router docs", note: "Routing, layouts, fonts, images, data" },
  apg: { href: "https://www.w3.org/WAI/ARIA/apg/patterns/", label: "WAI-ARIA Authoring Practices", note: "Keyboard and ARIA for dialogs, tabs, menus" },
  wcag: { href: "https://www.w3.org/WAI/WCAG22/quickref/", label: "WCAG 2.2 quick reference", note: "The AA criteria every platform meets" },
  m3: { href: "https://m3.material.io/", label: "Material Design 3", note: "Components, color roles, type scale, motion" },
  flutterM3: { href: "https://docs.flutter.dev/ui/design/material", label: "Flutter: Material Design", note: "Material 3 widgets and theming in Flutter" },
  flutterA11y: { href: "https://docs.flutter.dev/ui/accessibility-and-internationalization/accessibility", label: "Flutter accessibility", note: "Semantics, text scaling, guideline tests" },
  hig: { href: "https://developer.apple.com/design/human-interface-guidelines", label: "Apple Human Interface Guidelines", note: "Platform conventions for iOS and iPadOS" },
  swiftui: { href: "https://developer.apple.com/documentation/swiftui", label: "SwiftUI documentation", note: "Views, navigation, presentation, environment" },
  appleA11y: { href: "https://developer.apple.com/design/human-interface-guidelines/accessibility", label: "HIG: Accessibility", note: "Dynamic Type, VoiceOver, contrast, motion" },
} satisfies Record<string, Ref>;

/** Do / don't rules. Wrap several in <ul className="dodont">. */
export const Do = ({ children }: { children: React.ReactNode }) => (
  <li className="dd-do">
    <Check size={16} aria-hidden="true" />
    <span>
      <strong>Do.</strong> {children}
    </span>
  </li>
);

export const Dont = ({ children }: { children: React.ReactNode }) => (
  <li className="dd-dont">
    <X size={16} aria-hidden="true" />
    <span>
      <strong>Don’t.</strong> {children}
    </span>
  </li>
);
