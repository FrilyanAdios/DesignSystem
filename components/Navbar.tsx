"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, X } from "lucide-react";
import { SECTIONS } from "@/lib/nav";

type Props = {
  menuOpen: boolean;
  onToggleMenu: () => void;
  onOpenSearch: () => void;
};

export function Navbar({ menuOpen, onToggleMenu, onOpenSearch }: Props) {
  const pathname = usePathname();
  const current = pathname.split("/")[1];

  return (
    <header className="navbar">
      <button
        type="button"
        className="icon-btn nb-menu-btn"
        aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={menuOpen}
        aria-controls="sidebar"
        onClick={onToggleMenu}
      >
        {menuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <Link href="/" className="nb-brand" aria-label="Esco Design System home">
        <img src="/Logo/logo-blue.png" alt="Esco Lifesciences" />
        <span className="nb-brand-divider" aria-hidden="true" />
        <span className="nb-brand-name">Design System</span>
      </Link>

      <nav className="nb-links" aria-label="Sections">
        {SECTIONS.map((s) => (
          <Link
            key={s.slug}
            href={`/${s.slug}`}
            className="nb-link"
            aria-current={current === s.slug ? "page" : undefined}
          >
            {s.title}
          </Link>
        ))}
      </nav>

      <div className="nb-right">
        <button type="button" className="nb-search" onClick={onOpenSearch} aria-label="Search documentation">
          <Search size={15} aria-hidden="true" />
          <span>Search…</span>
          <kbd className="kbd">⌘K</kbd>
        </button>
        <button
          type="button"
          className="icon-btn nb-search-btn"
          aria-label="Search documentation"
          onClick={onOpenSearch}
        >
          <Search size={20} />
        </button>
      </div>
    </header>
  );
}
