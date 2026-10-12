"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SECTIONS, getSection } from "@/lib/nav";

type Props = {
  collapsed: boolean;
  mobileOpen: boolean;
  onToggleCollapse: () => void;
};

export function Sidebar({ collapsed, mobileOpen, onToggleCollapse }: Props) {
  const pathname = usePathname();
  const [, sectionSlug, pageSlug] = pathname.split("/");
  const section = sectionSlug ? getSection(sectionSlug) : undefined;

  return (
    <aside
      id="sidebar"
      className={`sidebar${collapsed ? " collapsed" : ""}${mobileOpen ? " open" : ""}${section ? "" : " home"}`}
      aria-label="Documentation navigation"
    >
      <nav className="nav">
        {/* sections live in the navbar on desktop; the drawer repeats them on small screens */}
        <div className="nav-mobile-only">
          {SECTIONS.map((s) => {
            const Icon = s.icon;
            return (
              <Link
                key={s.slug}
                href={`/${s.slug}`}
                className="nav-item"
                aria-current={s.slug === sectionSlug && !pageSlug ? "page" : undefined}
              >
                <Icon size={18} aria-hidden="true" />
                <span>{s.title}</span>
              </Link>
            );
          })}
          {section && <div className="nav-divider" />}
        </div>

        {section?.groups.map((group, gi) => (
          <div key={group.title ?? gi} className="nav-block">
            {group.title && <div className="nav-group">{group.title}</div>}
            {group.items.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.slug}
                  href={`/${section.slug}/${item.slug}`}
                  className="nav-item"
                  aria-current={pageSlug === item.slug ? "page" : undefined}
                  title={collapsed ? item.title : undefined}
                >
                  <Icon size={18} aria-hidden="true" />
                  <span>{item.title}</span>
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <button
        type="button"
        className="sidebar-collapse-btn"
        onClick={onToggleCollapse}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        aria-expanded={!collapsed}
      >
        {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </button>
    </aside>
  );
}
