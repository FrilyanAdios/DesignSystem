import Link from "next/link";
import { ArrowRight, Link as LinkIcon } from "lucide-react";
import { Placeholder } from "./Placeholder";
import type { TocItem } from "./Toc";

export type MoreLink = { href: string; label: string };
export type Part = { title: string; description?: string };
export type DocSection = TocItem & {
  body?: React.ReactNode;
  more?: MoreLink;
  /** guide pages: one-sentence "what this chapter covers" under the title */
  summary?: string;
  /** guide pages: the one thing to remember, shown at the end of the chapter */
  takeaway?: React.ReactNode;
  /** guide pages: label for the takeaway note (default "In short") */
  takeawayLabel?: string;
  /** guide pages: starts a new part; following sections belong to it */
  part?: Part;
};

/** Numbers written chapters and tags each section with its part. */
export type Chapter = DocSection & { partIndex: number; partTitle?: string };
export function toChapters(items: DocSection[]): Chapter[] {
  let n = 0;
  let partIndex = 0;
  let partTitle: string | undefined;
  return items.map((item) => {
    if (item.part) {
      partIndex += 1;
      partTitle = item.part.title;
    }
    return { ...item, num: item.body ? String(++n).padStart(2, "0") : undefined, partIndex, partTitle };
  });
}

export function MoreButton({ href, label }: MoreLink) {
  return (
    <Link href={href} className="more-link">
      {label}
      <ArrowRight size={14} aria-hidden="true" />
    </Link>
  );
}

function Anchor({ id, title }: { id: string; title: string }) {
  return (
    <a href={`#${id}`}>
      {title}
      <LinkIcon size={16} className="anchor" aria-hidden="true" />
    </a>
  );
}

export function DocSections({ items }: { items: DocSection[] }) {
  return (
    <>
      {items.map((item) => (
        <section key={item.id} className="doc-section" aria-labelledby={item.id}>
          <div className="section-head">
            <h2 id={item.id}>
              <Anchor id={item.id} title={item.title} />
            </h2>
            {item.more && <MoreButton {...item.more} />}
          </div>
          {item.body ?? <Placeholder />}
        </section>
      ))}
    </>
  );
}

/* ---------------------------------------------------------------------------
   Guide layout — long learning pages read like a book: a contents page,
   a quick-answer index, parts, and chapters. Hierarchy comes from type
   weight and whitespace only; no boxes, badges, or tinted panels.
   --------------------------------------------------------------------------- */

const ORDINALS = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
const partName = (i: number) => `Part ${ORDINALS[i - 1] ?? i}`;

export type GuideQuestion = { q: string; id: string };

export function GuideMap({
  items,
  meta,
  questions,
}: {
  items: Chapter[];
  meta?: string[];
  questions?: GuideQuestion[];
}) {
  const parts = items
    .filter((c) => c.part)
    .map((p) => ({ ...p, chapters: items.filter((c) => c.partIndex === p.partIndex && c.num) }))
    .filter((p) => p.chapters.length);
  const byId = new Map(items.map((c) => [c.id, c]));

  return (
    <div className="guide-front">
      {meta && <p className="guide-meta">{meta.join("  ·  ")}</p>}

      {questions && (
        <nav className="guide-finder" aria-labelledby="guide-finder-title">
          <h2 id="guide-finder-title" className="front-title">
            Looking for something?
          </h2>
          <ul>
            {questions.map(({ q, id }) => {
              const c = byId.get(id);
              return (
                <li key={q}>
                  <a href={`#${id}`}>
                    <span className="f-q">{q}</span>
                    <span className="f-to">
                      Chapter {Number(c?.num)}, {c?.title}
                      <ArrowRight size={14} aria-hidden="true" />
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      )}

      <nav className="guide-contents" aria-labelledby="guide-contents-title">
        <h2 id="guide-contents-title" className="front-title">
          Contents
        </h2>
        {parts.map((p) => (
          <div key={p.id} className="contents-part">
            <p className="contents-part-name">
              {partName(p.partIndex)}
              <span>{p.part!.title}</span>
            </p>
            <ol>
              {p.chapters.map((c) => (
                <li key={c.id}>
                  <a href={`#${c.id}`}>
                    <span className="c-num">{Number(c.num)}</span>
                    <span className="c-text">
                      <span className="c-title">{c.title}</span>
                      {c.summary && <span className="c-sum">{c.summary}</span>}
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </nav>
    </div>
  );
}

export function GuideSections({ items }: { items: Chapter[] }) {
  return (
    <div className="guide">
      {items.map((item) => (
        <div key={item.id} className={`guide-block${item.part ? " starts-part" : ""}`}>
          {item.part && (
            <div className="part-opener">
              <span className="part-name">{partName(item.partIndex)}</span>
              <p className="part-title">{item.part.title}</p>
              {item.part.description && <p className="part-desc">{item.part.description}</p>}
            </div>
          )}
          <section className={`chapter${item.body ? "" : " is-empty"}`} aria-labelledby={item.id}>
            <header className="chapter-head">
              {item.num && <span className="chapter-label">Chapter {Number(item.num)}</span>}
              <h2 id={item.id}>
                <Anchor id={item.id} title={item.title} />
              </h2>
              {item.summary && <p className="chapter-summary">{item.summary}</p>}
            </header>
            {item.body ?? <p className="chapter-reserved">Reserved for a later release.</p>}
            {item.takeaway && (
              <aside className="in-short" aria-label={item.takeawayLabel ?? "In short"}>
                <span>{item.takeawayLabel ?? "In short"}</span>
                <p>{item.takeaway}</p>
              </aside>
            )}
            {item.more && (
              <Link href={item.more.href} className="read-next">
                Go deeper: {item.more.label}
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            )}
          </section>
        </div>
      ))}
    </div>
  );
}
