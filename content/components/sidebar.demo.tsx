"use client";

import { useId, useState } from "react";
import { Ic, type IconName } from "@/components/demo/Ic";

/* ---------------------------------------------------------------------------
   Live application shell for the Navbar and Sidebar pages.
   Markup mirrors NPD-FSM/index.html (header.navbar, aside.sidebar, header.topbar)
   and script.js (NAV, buildNav, toggleSidebarCollapse). Rendered inside the
   product stylesheet by <Example>/<ProductDemo>.
   Differences from the prototype, on purpose, for accessibility:
   - nav items are links with aria-current="page", not clickable divs;
   - the collapse button also reports aria-expanded.
   --------------------------------------------------------------------------- */

type NavEntry = { g: string } | { p: string; t: string; i: IconName };

/** script.js › NAV, in product order. */
export const NAV: NavEntry[] = [
  { g: "Overview" },
  { p: "dashboard", t: "Dashboard", i: "dashboard" },
  { g: "Operations" },
  { p: "workorder", t: "Work Order", i: "wo" },
  { p: "schedule", t: "Service Schedule", i: "schedule" },
  { p: "servicereport", t: "Service Report", i: "report" },
  { p: "testreport", t: "Test Report", i: "wrench" },
  { p: "breakdown", t: "Breakdown Log", i: "breakdown" },
  { p: "defect", t: "Defect Reports", i: "defect" },
  { p: "survey", t: "NPS Survey", i: "survey" },
  { g: "Customer Service" },
  { p: "csm", t: "Customer Service (CSM)", i: "phone" },
  { g: "Account" },
  { p: "profile", t: "Profile & Settings", i: "settings" },
];

const TITLE: Record<string, string> = Object.fromEntries(
  NAV.filter((n): n is { p: string; t: string; i: IconName } => "p" in n).map((n) => [n.p, n.t]),
);

/** The 64px global navbar: menu (below 900px), logo, global search, notifications. */
export function AppNavbar({ unread = 3 }: { unread?: number }) {
  return (
    <header className="navbar">
      <button type="button" className="nb-menu-btn" aria-label="Toggle menu">
        <Ic n="menu" s={20} />
      </button>
      <div className="nb-brand">
        <img src="/Logo/logo-blue.png" alt="Esco Lifesciences" width={80} height={32} />
      </div>
      <div className="nb-search tb-search">
        <Ic n="search" />
        <input aria-label="Search across the whole application" placeholder="Search everything…" />
      </div>
      <button type="button" className="nb-search-btn" aria-label="Search">
        <Ic n="search" s={18} />
      </button>
      <div className="nb-right">
        <button
          type="button"
          className="tb-bell"
          aria-label={unread ? `Notifications — ${unread} unread` : "Notifications"}
        >
          <span className={`bell-badge${unread ? " on" : ""}`} aria-hidden="true">
            {unread > 99 ? "99+" : unread}
          </span>
          <Ic n="bell" s={18} />
        </button>
      </div>
    </header>
  );
}

/**
 * Sidebar beside a page header, with a working collapse toggle and current page.
 * `navbar` adds the global navbar above, for the full shell.
 */
export function SidebarDemo({
  height = 520,
  navbar = false,
  startCollapsed = false,
  start = "servicereport",
}: {
  height?: number;
  navbar?: boolean;
  startCollapsed?: boolean;
  start?: string;
}) {
  const [collapsed, setCollapsed] = useState(startCollapsed);
  const [cur, setCur] = useState(start);
  const navId = useId();

  return (
    <div style={{ width: "100%", height, display: "flex", flexDirection: "column", background: "var(--muted)" }}>
      {navbar && <AppNavbar />}
      <div className="app" style={{ height: navbar ? height - 64 : height, flex: "1 1 auto" }}>
        <aside className={`sidebar${collapsed ? " collapsed" : ""}`}>
          <div className="sidebar-user" role="button" tabIndex={0} aria-haspopup="menu">
            <div className="av" aria-hidden="true">
              FA
            </div>
            <div className="profile-txt">
              <div className="un">Frilyan J. Adios</div>
              <div className="ur">Coordinator</div>
            </div>
            <span className="profile-chev">
              <Ic n="down" s={14} />
            </span>
          </div>
          <nav className="nav" id={navId} aria-label="Main navigation">
            {NAV.map((n) =>
              "g" in n ? (
                <div key={n.g} className="nav-group">
                  {n.g}
                </div>
              ) : (
                <a
                  key={n.p}
                  href={`#${n.p}`}
                  className={`nav-item${cur === n.p ? " active" : ""}`}
                  aria-current={cur === n.p ? "page" : undefined}
                  title={n.t}
                  style={{ textDecoration: "none" }}
                  onClick={(e) => {
                    e.preventDefault();
                    setCur(n.p);
                  }}
                >
                  <Ic n={n.i} s={18} />
                  <span>{n.t}</span>
                </a>
              ),
            )}
          </nav>
          <button
            type="button"
            className="sidebar-collapse-btn"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-expanded={!collapsed}
            aria-controls={navId}
            onClick={() => setCollapsed((c) => !c)}
          >
            <Ic n={collapsed ? "cright" : "cleft"} s={16} />
          </button>
          <div className="sidebar-footer">
            <div className="sf-title">Field Service Management</div>
            <div className="sf-sub">Service Management System</div>
          </div>
        </aside>
        <div className="main">
          <header className="topbar">
            <h1>{TITLE[cur]}</h1>
            <div className="topbar-right" />
          </header>
          <div className="content">
            <p style={{ fontSize: "var(--fs-body)", color: "var(--fg-3)" }}>
              Page content for {TITLE[cur]}. Collapse the sidebar to give it more width.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
