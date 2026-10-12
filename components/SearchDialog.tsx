"use client";

import { useRouter } from "next/navigation";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { ArrowRight, CornerDownLeft, Search, SearchX } from "lucide-react";
import { ALL_PAGES, type FlatPage } from "@/lib/nav";

const RECOMMENDED = ["introduction", "color", "typography", "button", "table", "dialog"];
const LIMIT = 8;

export function SearchDialog({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const titleId = useId();
  const listId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const results: FlatPage[] = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return RECOMMENDED.map((s) => ALL_PAGES.find((p) => p.slug === s)!).filter(Boolean);
    return ALL_PAGES.filter((p) =>
      [p.title, p.section.title, p.group ?? ""].some((t) => t.toLowerCase().includes(q)),
    )
      .sort((a, b) => Number(!a.title.toLowerCase().startsWith(q)) - Number(!b.title.toLowerCase().startsWith(q)))
      .slice(0, LIMIT);
  }, [query]);

  useEffect(() => setActive(0), [query]);

  // focus the field on open, restore focus to the trigger on close, lock page scroll
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    inputRef.current?.focus();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, []);

  const go = (page?: FlatPage) => {
    if (!page) return;
    onClose();
    router.push(page.href);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      onClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      go(results[active]);
    } else if (e.key === "Tab") {
      // keep focus inside the dialog
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>("input, button, [href]");
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  useEffect(() => {
    document.getElementById(`${listId}-${active}`)?.scrollIntoView({ block: "nearest" });
  }, [active, listId]);

  return (
    <div className="ov" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div
        ref={dialogRef}
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onKeyDown={onKeyDown}
      >
        <h2 id={titleId} className="sr-only">
          Search documentation
        </h2>
        <div className="search-field">
          <Search size={18} aria-hidden="true" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search components, foundations, patterns…"
            role="combobox"
            aria-expanded="true"
            aria-controls={listId}
            aria-activedescendant={results.length ? `${listId}-${active}` : undefined}
            aria-label="Search documentation"
            autoComplete="off"
            spellCheck={false}
          />
          <button type="button" className="btn btn-ghost" onClick={onClose}>
            Cancel
          </button>
        </div>

        <div className="search-body">
          {results.length ? (
            <>
              <div className="search-label">{query.trim() ? `Results (${results.length})` : "Recommended"}</div>
              <ul id={listId} role="listbox" aria-label="Search results">
                {results.map((page, i) => {
                  const Icon = page.icon;
                  return (
                    <li
                      key={page.href}
                      id={`${listId}-${i}`}
                      role="option"
                      aria-selected={i === active}
                      className="result"
                      onMouseEnter={() => setActive(i)}
                      onClick={() => go(page)}
                    >
                      <span className="tile" aria-hidden="true">
                        <Icon size={16} />
                      </span>
                      <span className="r-text">
                        <span className="r-title">{page.title}</span>
                        <span className="r-meta">
                          {page.section.title}
                          {page.group ? ` / ${page.group}` : ""}
                        </span>
                      </span>
                      <ArrowRight size={16} className="r-go" aria-hidden="true" />
                    </li>
                  );
                })}
              </ul>
            </>
          ) : (
            <div className="search-empty" role="status">
              <SearchX size={28} aria-hidden="true" style={{ margin: "0 auto 12px", color: "var(--icon-quiet)" }} />
              <strong>No results for “{query}”</strong>
              Try a component name such as “button” or a foundation such as “color”.
            </div>
          )}
        </div>

        <div className="search-foot" aria-hidden="true">
          <span>
            <kbd className="kbd">↑</kbd>
            <kbd className="kbd">↓</kbd> to move
          </span>
          <span>
            <kbd className="kbd">
              <CornerDownLeft size={11} />
            </kbd>{" "}
            to open
          </span>
          <span>
            <kbd className="kbd">Esc</kbd> to close
          </span>
        </div>
      </div>
    </div>
  );
}
