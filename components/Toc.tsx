"use client";

import { useEffect, useState } from "react";

export type TocItem = { id: string; title: string; num?: string; group?: string };

export function Toc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const headings = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => !!el);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -65% 0px" },
    );
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [items]);

  if (!items.length) return null;

  return (
    <aside className="toc" aria-labelledby="toc-title">
      <div className="toc-title" id="toc-title">
        On this page
      </div>
      <ul>
        {items.map((item, i) => (
          <li key={item.id}>
            {item.group && item.group !== items[i - 1]?.group && <span className="toc-group">{item.group}</span>}
            <a href={`#${item.id}`} aria-current={active === item.id ? "location" : undefined}>
              {item.num && <span className="toc-num">{item.num}</span>}
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
