import { ProductDemo, type StageLayout } from "./ProductDemo";

export type ExampleCode = { lang: string; label?: string; code: string };

/** A live example rendered with the product stylesheet, with its source underneath. */
export function Example({
  title,
  description,
  children,
  code,
  layout,
  bg,
  pad,
  minHeight,
}: {
  title?: string;
  description?: React.ReactNode;
  children: React.ReactNode;
  code?: ExampleCode | ExampleCode[];
  layout?: StageLayout;
  bg?: "muted" | "white";
  pad?: boolean;
  minHeight?: number;
}) {
  const codes = code ? (Array.isArray(code) ? code : [code]) : [];
  return (
    <figure className="example">
      {(title || description) && (
        <figcaption className="ex-head">
          {title && <strong>{title}</strong>}
          {description && <span>{description}</span>}
        </figcaption>
      )}
      <ProductDemo layout={layout} bg={bg} pad={pad} minHeight={minHeight} label={title ? `${title} example` : "Example"}>
        {children}
      </ProductDemo>
      {codes.map((c) => (
        <details key={c.label ?? c.lang} className="ex-code">
          <summary>{c.label ?? `Show ${c.lang}`}</summary>
          <pre tabIndex={0}>
            <code>{c.code.replace(/^\n/, "").replace(/\s+$/, "")}</code>
          </pre>
        </details>
      ))}
    </figure>
  );
}
