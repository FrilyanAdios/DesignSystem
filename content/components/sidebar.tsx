import { Example } from "@/components/demo/Example";
import { Ic } from "@/components/demo/Ic";
import { SpecSheet } from "@/components/demo/SpecSheet";
import { ScreenWidths, WEB_SCREENS } from "@/components/demo/ScreenWidths";
import { SidebarArt } from "@/components/art/sidebar";
import { Code, Do, Dont, T, Table } from "../dev-kit";
import { SidebarDemo } from "./sidebar.demo";
import type { ComponentContent } from "./types";

/* ---------------------------------------------------------------------------
   Sidebar — the canonical FSM application navigation.
   Facts: DESIGN_SYSTEM.md › Application sidebar, Responsive behavior;
   styles.css (APP SHELL block: .sidebar … .sidebar.collapsed, the 900px
   drawer); index.html (aside.sidebar); script.js (NAV, buildNav,
   toggleSidebarCollapse, toggleMobileSidebar).
   --------------------------------------------------------------------------- */

const HTML_SIDEBAR = `
<aside class="sidebar" id="sidebar">
  <div class="sidebar-user" role="button" tabindex="0">
    <div class="av">FA</div>
    <div class="profile-txt">
      <div class="un">Frilyan J. Adios</div>
      <div class="ur">Coordinator</div>
    </div>
    <span class="profile-chev"><!-- ic('down', 14) --></span>
  </div>
  <nav class="nav" aria-label="Main navigation">
    <div class="nav-group">Overview</div>
    <a class="nav-item" href="#dashboard" title="Dashboard"><!-- ic('dashboard', 18) --><span>Dashboard</span></a>
    <div class="nav-group">Operations</div>
    <a class="nav-item active" href="#servicereport" title="Service Report" aria-current="page">
      <!-- ic('report', 18) --><span>Service Report</span>
    </a>
    …
  </nav>
  <button class="sidebar-collapse-btn" aria-label="Collapse sidebar" aria-expanded="true">
    <!-- ic('cleft', 16); ic('cright', 16) when collapsed -->
  </button>
  <div class="sidebar-footer">
    <div class="sf-title">Field Service Management</div>
    <div class="sf-sub">Service Management System</div>
  </div>
</aside>
`;

const HTML_COLLAPSED = `
<aside class="sidebar collapsed">…</aside>   <!-- 72px: icons stay, labels hide -->
`;

const HTML_DRAWER = `
<!-- below 900px: the same aside, off-canvas under the navbar -->
<div class="sidebar-overlay show" onclick="closeMobileSidebar()"></div>
<aside class="sidebar mobile-open">…</aside>
`;

/* ---- usage ---------------------------------------------------------------- */

function Overview() {
  return (
    <div className="prose">
      <p>
        The sidebar is the application’s main navigation. It sits on the left under the navbar and holds the signed-in
        user, the module links in groups, a collapse control, and the workspace name. Every FSM workspace uses this one
        sidebar.
      </p>
      <Example
        title="Sidebar"
        description="Choose a page to move the current item. Use the chevron to collapse to icons and back."
        layout="none"
        pad={false}
        minHeight={620}
        code={{ lang: "HTML", code: HTML_SIDEBAR }}
      >
        <SidebarDemo height={620} />
      </Example>
    </div>
  );
}

function WhenToUse() {
  return (
    <div className="prose">
      <ul className="dodont">
        <Do>Use the sidebar for moving between modules and workspaces.</Do>
        <Do>
          In a sibling workspace such as CSM, keep the same classes and geometry. Change only labels, icons, user role,
          and footer name.
        </Do>
        <Do>Group items under short labels: Overview, Operations, Customer Service, Account.</Do>
        <Dont>Build a module-prefixed copy of the sidebar, or change its spacing for one module.</Dont>
        <Dont>Replace the collapse chevron with a module-specific glyph.</Dont>
        <Dont>Use the sidebar for page actions or filters. Those belong in the page header or toolbar.</Dont>
      </ul>
    </div>
  );
}

function Anatomy() {
  return (
    <div className="prose">
      <Table
        head={["Part", "Class", "Rule"]}
        rows={[
          [
            "User block",
            <T>.sidebar-user</T>,
            "36px avatar with initials, name, role, and a chevron. Opens the user menu",
          ],
          ["Navigation", <T>.nav</T>, "Scrolls when the window is short. The scrollbar is not drawn"],
          ["Group label", <T>.nav-group</T>, "Short, sentence case. Not a link"],
          ["Item", <T>.nav-item</T>, "Icon at 18px, then the label. The current page is filled"],
          [
            "Collapse control",
            <T>.sidebar-collapse-btn</T>,
            "Centred 36px square with the shared left or right chevron",
          ],
          ["Footer", <T>.sidebar-footer</T>, "Workspace name and system name"],
        ]}
      />
    </div>
  );
}

function Variants() {
  return (
    <div className="prose">
      <div className="examples two">
        <Example
          title="Expanded"
          description="240px. The default on desktop."
          layout="none"
          pad={false}
          minHeight={620}
          code={{ lang: "HTML", code: `<aside class="sidebar">…</aside>` }}
        >
          <SidebarDemo height={620} start="dashboard" />
        </Example>
        <Example
          title="Collapsed"
          description="72px. Icons stay, labels, groups, and footer hide."
          layout="none"
          pad={false}
          minHeight={620}
          code={{ lang: "HTML", code: HTML_COLLAPSED }}
        >
          <SidebarDemo height={620} startCollapsed start="schedule" />
        </Example>
      </div>
      <h3>Drawer, below 900px</h3>
      <p>
        At widths below 900px the same sidebar becomes a 260px off-canvas drawer beneath the 64px navbar. The navbar’s
        menu button opens it over the scrim; tapping the scrim closes it. The drawer always shows the full layout, even
        if the sidebar was collapsed on desktop, and the collapse control is hidden.
      </p>
      <Code title="Drawer" lang="html">
        {HTML_DRAWER}
      </Code>
    </div>
  );
}

function Behavior() {
  return (
    <div className="prose">
      <ul className="dev-notes">
        <li>
          Hover fills an item with the navy hover tint. The current page uses the stronger active fill and medium
          weight.
        </li>
        <li>
          Collapsing animates the width over 200ms. Labels, group names, user text, and the footer hide; items centre
          their icons.
        </li>
        <li>The collapse button swaps its chevron and its name: Collapse sidebar, Expand sidebar.</li>
        <li>
          Collapsed items keep the label in <T>title</T>, so pointer users get a tooltip and the link keeps a name.
        </li>
        <li>The drawer slides in over 220ms; the scrim fades over 180ms.</li>
        <li>Do not compress the desktop spacing for small screens. The drawer keeps it.</li>
      </ul>
      <Example
        title="States"
        description="Rest, hover, and current. Hover over an item to see it."
        layout="none"
        pad={false}
        minHeight={200}
      >
        <div className="sidebar" style={{ height: 200 }}>
          <nav className="nav" aria-label="States example">
            <a className="nav-item" href="#rest" style={{ textDecoration: "none" }}>
              <Ic n="wo" s={18} />
              <span>Work Order</span>
            </a>
            <a className="nav-item active" href="#current" aria-current="page" style={{ textDecoration: "none" }}>
              <Ic n="report" s={18} />
              <span>Service Report</span>
            </a>
            <a className="nav-item" href="#rest-2" style={{ textDecoration: "none" }}>
              <Ic n="wrench" s={18} />
              <span>Test Report</span>
            </a>
          </nav>
        </div>
      </Example>
    </div>
  );
}

/* ---- style ---------------------------------------------------------------- */

const noLine = { textDecoration: "none" } as const;

function UserBlock({ chevron = true }: { chevron?: boolean }) {
  return (
    <div className="sidebar-user" role="button" tabIndex={0}>
      <div className="av" aria-hidden="true">
        FA
      </div>
      <div className="profile-txt">
        <div className="un">Frilyan J. Adios</div>
        <div className="ur">Coordinator</div>
      </div>
      {chevron && (
        <span className="profile-chev">
          <Ic n="down" s={14} />
        </span>
      )}
    </div>
  );
}

function Footer() {
  return (
    <div className="sidebar-footer">
      <div className="sf-title">Field Service Management</div>
      <div className="sf-sub">Service Management System</div>
    </div>
  );
}

function Measurements() {
  return (
    <div className="prose">
      <p>
        Every number below is read from the product stylesheet, not typed by hand. Build to these numbers, not to how
        the picture looks.
      </p>
      <SpecSheet
        title="Expanded sidebar"
        scale={1}
        targets={[{ sel: ".sidebar", name: "Sidebar, expanded", width: "fixed" }]}
      >
        <aside className="sidebar" style={{ height: 520 }}>
          <UserBlock />
          <nav className="nav" aria-label="Measured sidebar">
            <div className="nav-group">Operations</div>
            <a className="nav-item" href="#wo" style={noLine}>
              <Ic n="wo" s={18} />
              <span>Work Order</span>
            </a>
            <a className="nav-item active" href="#sr" aria-current="page" style={noLine}>
              <Ic n="report" s={18} />
              <span>Service Report</span>
            </a>
          </nav>
          <button type="button" className="sidebar-collapse-btn" aria-label="Collapse sidebar" aria-expanded="true">
            <Ic n="cleft" s={16} />
          </button>
          <Footer />
        </aside>
      </SpecSheet>
      <SpecSheet
        title="Collapsed sidebar"
        scale={1}
        targets={[{ sel: ".sidebar", name: "Sidebar, collapsed", width: "fixed" }]}
      >
        {/* the user chevron is hidden when collapsed, so it is left out here */}
        <aside className="sidebar collapsed" style={{ height: 520 }}>
          <UserBlock chevron={false} />
          <nav className="nav" aria-label="Measured collapsed sidebar">
            <a className="nav-item" href="#wo" title="Work Order" style={noLine}>
              <Ic n="wo" s={18} />
              <span>Work Order</span>
            </a>
            <a className="nav-item active" href="#sr" title="Service Report" aria-current="page" style={noLine}>
              <Ic n="report" s={18} />
              <span>Service Report</span>
            </a>
          </nav>
          <button type="button" className="sidebar-collapse-btn" aria-label="Expand sidebar" aria-expanded="false">
            <Ic n="cright" s={16} />
          </button>
          <Footer />
        </aside>
      </SpecSheet>
      <SpecSheet
        title="User block"
        targets={[
          { sel: ".sidebar-user", name: "User block", width: "fill" },
          { sel: ".av", name: "Avatar", width: "fixed" },
        ]}
      >
        <div className="sidebar" style={{ height: "auto" }}>
          <UserBlock />
        </div>
      </SpecSheet>
      <SpecSheet
        title="Group label and items"
        targets={[
          {
            sel: ".nav-item:not(.active)",
            name: "Nav item, rest",
            width: "fill",
          },
          {
            sel: ".nav-item.active",
            name: "Nav item, active",
            width: "fill",
            marks: true,
          },
          { sel: ".nav-group", name: "Group label", width: "fill" },
        ]}
      >
        <div className="sidebar" style={{ height: "auto" }}>
          <nav className="nav" aria-label="Measured items">
            <div className="nav-group">Operations</div>
            <a className="nav-item" href="#wo" style={noLine}>
              <Ic n="wo" s={18} />
              <span>Work Order</span>
            </a>
            <a className="nav-item active" href="#sr" aria-current="page" style={noLine}>
              <Ic n="report" s={18} />
              <span>Service Report</span>
            </a>
          </nav>
        </div>
      </SpecSheet>
      <SpecSheet
        title="Collapse control and footer"
        targets={[
          {
            sel: ".sidebar-collapse-btn",
            name: "Collapse button",
            width: "fixed",
          },
          {
            sel: ".sidebar-footer",
            name: "Footer",
            width: "fill",
            marks: true,
          },
        ]}
      >
        <div className="sidebar" style={{ height: "auto" }}>
          <button type="button" className="sidebar-collapse-btn" aria-label="Collapse sidebar" aria-expanded="true">
            <Ic n="cleft" s={16} />
          </button>
          <Footer />
        </div>
      </SpecSheet>
    </div>
  );
}

function Screens() {
  return (
    <ScreenWidths
      rows={[
        {
          screen: "desktop",
          width: WEB_SCREENS.desktop,
          change: "240 px wide. The chevron collapses it to 72 px, icons only.",
        },
        { screen: "laptop", width: WEB_SCREENS.laptop, same: true },
        {
          screen: "tablet",
          width: WEB_SCREENS.tablet,
          change:
            "Becomes a 260 px drawer under the 64 px navbar. The navbar menu button opens it over a scrim. The collapse control is hidden.",
        },
        {
          screen: "phone",
          width: WEB_SCREENS.phone,
          change: "The same 260 px drawer as on tablet. Spacing is not compressed.",
        },
        {
          screen: "mobile-app",
          width: WEB_SCREENS.app,
          change:
            "No sidebar. A bottom navigation bar with four destinations: Today, Modules, Notifications, Profile. It is hidden inside modules.",
        },
      ]}
    />
  );
}

function StyleColor() {
  return (
    <Table
      head={["Element", "Token", "Value"]}
      rows={[
        ["Sidebar background", <T>--navy</T>, "#00467F"],
        ["Item and name text", <T>--navy-text</T>, "#FFFFFF"],
        ["Item hover", <T>--navy-hover</T>, "rgba(20,97,150,.5)"],
        ["Current item", <T>--navy-active</T>, "#146196"],
        ["Group label, footer subtitle", <T>--navy-muted</T>, "#BCBCBC"],
        ["Dividers", <T>--navy-border</T>, "#365C8E"],
        [
          "Avatar",
          <>
            <T>--primary-50</T> fill, <T>--navy</T> initials
          </>,
          "—",
        ],
        ["Role", "White at 65%", "—"],
        ["Collapse chevron", "White at 75%; white on hover", "—"],
        ["Drawer scrim", <T>--scrim</T>, "rgba(17,32,44,.42)"],
      ]}
    />
  );
}

function StyleSpec() {
  return (
    <Table
      head={["Property", "Value"]}
      rows={[
        ["Width · collapsed · drawer", "240 · 72 · 260"],
        ["User block height", "70"],
        ["User block padding · gap", "16 20 · 12 (collapsed 16 8)"],
        ["Avatar", "36 · 12.5 · 600"],
        ["Name · role", "13 · 500 · role 11"],
        [
          "Navigation padding",
          <>
            <T>--sp-4</T> 16 sides and top, <T>--sp-2</T> 8 bottom
          </>,
        ],
        ["Item height", "36"],
        ["Item padding · gap · spacing", "8 · 12 icon to label · 8 to the next item"],
        [
          "Item radius",
          <>
            <T>--radius-control</T> 6
          </>,
        ],
        [
          "Item text",
          <>
            <T>--fs-body</T> 13.5 · 400; current 500
          </>,
        ],
        ["Item icon", "18"],
        ["Group label", "11.5 · 400 · padding 18 8 10 (first group 2 on top)"],
        [
          "Collapse control",
          <>
            36 × <T>--h-md</T> 36 · <T>--radius-field</T> 8 · margin 10 auto · icon 16
          </>,
        ],
        ["Footer padding", "12 20 16"],
        ["Footer title · subtitle", "11.5 · 600 · subtitle 10"],
        ["Collapse transition", "Width 200ms ease"],
        ["Drawer transition", "Transform 220ms ease; scrim 180ms"],
      ]}
    />
  );
}

/* ---- code ----------------------------------------------------------------- */

function CodeWeb() {
  return (
    <div className="prose">
      <Code title="HTML" lang="html">
        {HTML_SIDEBAR}
      </Code>
      <Code title="React" lang="tsx">{`
import { Sidebar } from "@/components/ui/Sidebar";

const NAV = [
  { group: "Overview", items: [{ id: "dashboard", label: "Dashboard", icon: "dashboard" }] },
  { group: "Operations", items: [
    { id: "workorder", label: "Work Order", icon: "wo" },
    { id: "servicereport", label: "Service Report", icon: "report" },
  ]},
];

<Sidebar
  user={{ initials: "FA", name: "Frilyan J. Adios", role: "Coordinator" }}
  nav={NAV}
  current={page}
  collapsed={collapsed}
  onCollapsedChange={setCollapsed}
  footer={{ title: "Field Service Management", subtitle: "Service Management System" }}
/>
`}</Code>
      <Table
        head={["Prop", "Type", "Default"]}
        rows={[
          [<T>user</T>, <T>{"{ initials, name, role }"}</T>, "—"],
          [<T>nav</T>, <T>{"{ group, items: { id, label, icon, href? }[] }[]"}</T>, "—"],
          [<T>current</T>, <T>string</T>, "—"],
          [<T>collapsed</T>, <T>boolean</T>, <T>false</T>],
          [<T>onCollapsedChange</T>, <T>(collapsed: boolean) =&gt; void</T>, "—"],
          [<T>footer</T>, <T>{"{ title, subtitle }"}</T>, "—"],
        ]}
      />
    </div>
  );
}

function CodeFlutter() {
  return (
    <div className="prose">
      <p>
        The phone app has no sidebar; it uses the bottom <T>NavigationBar</T>. On a wide layout, map the expanded
        sidebar to <T>NavigationDrawer</T> and the collapsed one to <T>NavigationRail</T>.
      </p>
      <Code title="Flutter" lang="dart">{`
NavigationDrawer(
  selectedIndex: index,
  onDestinationSelected: (i) => setState(() => index = i),
  children: const [
    Padding(padding: EdgeInsets.fromLTRB(28, 16, 16, 10), child: Text('Operations')),
    NavigationDrawerDestination(icon: Icon(Icons.assignment_outlined), label: Text('Work Order')),
    NavigationDrawerDestination(icon: Icon(Icons.calendar_month_outlined), label: Text('Service Schedule')),
    NavigationDrawerDestination(icon: Icon(Icons.description_outlined), label: Text('Service Report')),
  ],
);

// Collapsed: icons only
NavigationRail(
  selectedIndex: index,
  onDestinationSelected: (i) => setState(() => index = i),
  labelType: NavigationRailLabelType.none,
  destinations: const [
    NavigationRailDestination(icon: Icon(Icons.assignment_outlined), label: Text('Work Order')),
    NavigationRailDestination(icon: Icon(Icons.description_outlined), label: Text('Service Report')),
  ],
);
`}</Code>
    </div>
  );
}

function CodeIos() {
  return (
    <div className="prose">
      <p>
        On iPhone, use the <T>TabView</T> from the iOS guide. On iPad, a <T>NavigationSplitView</T> sidebar plays the
        same role.
      </p>
      <Code title="SwiftUI" lang="swift">{`
NavigationSplitView(columnVisibility: $columns) {
    List(selection: $page) {
        Section("Overview") {
            Label("Dashboard", systemImage: "square.grid.2x2").tag(Page.dashboard)
        }
        Section("Operations") {
            Label("Work Order", systemImage: "clipboard").tag(Page.workOrder)
            Label("Service Report", systemImage: "doc.text").tag(Page.serviceReport)
        }
    }
    .navigationTitle("FSM")
} detail: {
    PageView(page)
}
.tint(.escoPrimary)
`}</Code>
    </div>
  );
}

/* ---- accessibility -------------------------------------------------------- */

function A11yKeyboard() {
  return (
    <Table
      head={["Key", "Action"]}
      rows={[
        ["Tab", "Moves through the user block, each item, then the collapse control"],
        ["Enter", "Opens the item’s page, or the user menu from the user block"],
        ["Enter, Space on the collapse control", "Collapses or expands the sidebar"],
        ["Escape (drawer)", "Should close the drawer and return focus to the menu button"],
      ]}
    />
  );
}

function A11yNames() {
  return (
    <div className="prose">
      <ul className="dodont">
        <Do>
          Wrap the items in a <T>nav</T> landmark with a name, such as “Main navigation”.
        </Do>
        <Do>
          Use links for items and mark the current page with <T>aria-current="page"</T>, not only the fill.
        </Do>
        <Do>
          Keep a name on collapsed items. The visible label is hidden, so keep the label in <T>title</T> or{" "}
          <T>aria-label</T>.
        </Do>
        <Do>
          Name the collapse control by what it does, and report the state with <T>aria-expanded</T>.
        </Do>
        <Dont>Build items as clickable divs. They are not reachable by keyboard and have no role.</Dont>
        <Dont>Read group labels as links. They are plain text.</Dont>
      </ul>
    </div>
  );
}

function A11yContrast() {
  return (
    <div className="prose">
      <Table
        head={["Pair", "Ratio", "Requirement"]}
        rows={[
          [
            <>
              White item text on <T>--navy</T>
            </>,
            "9.6:1",
            "4.5:1 text",
          ],
          [
            <>
              White on the current item <T>--navy-active</T>
            </>,
            "6.6:1",
            "4.5:1 text",
          ],
          [
            <>
              White on hover <T>--navy-hover</T> over navy
            </>,
            "7.9:1",
            "4.5:1 text",
          ],
          [
            <>
              Group label <T>--navy-muted</T> on navy
            </>,
            "5.1:1",
            "4.5:1 text",
          ],
          ["Role, white at 65%, on navy", "5.0:1", "4.5:1 text"],
          ["Collapse chevron, white at 75%, on navy", "6.1:1", "3:1 non-text"],
          [
            <>
              <T>--navy-active</T> against <T>--navy</T>
            </>,
            "1.5:1",
            "The fill alone does not mark the current page. Weight and aria-current do",
          ],
        ]}
      />
      <p>
        Known gap. The product’s shared focus rule gives a focused <T>.nav-item</T> the light <T>--muted-2</T> fill,
        which leaves white text unreadable, and the 2px <T>--primary</T> ring matches the navy background. A keyboard
        user cannot see focus on sidebar items. Give sidebar items a focus style that works on navy before shipping.
      </p>
    </div>
  );
}

export const sidebar: ComponentContent = {
  lead: "The application’s main navigation: user, grouped module links, and a collapse control. 240px, 72px collapsed, a 260px drawer below 900px.",
  art: SidebarArt,
  usage: [
    { id: "overview", title: "Overview", body: <Overview /> },
    { id: "when-to-use", title: "When to use", body: <WhenToUse /> },
    { id: "anatomy", title: "Anatomy", body: <Anatomy /> },
    { id: "variants", title: "Variants", body: <Variants /> },
    { id: "behavior", title: "Behavior and states", body: <Behavior /> },
    {
      id: "related",
      title: "Related",
      body: (
        <p className="prose-p">
          Navbar for the global bar above it and the page header beside it; Dialog for the scrim the drawer shares.
        </p>
      ),
      more: { href: "/components/navbar", label: "Navbar" },
    },
  ],
  style: [
    { id: "measurements", title: "Measurements", body: <Measurements /> },
    { id: "screen-widths", title: "Screen widths", body: <Screens /> },
    { id: "color", title: "Color", body: <StyleColor /> },
    { id: "specifications", title: "Specifications", body: <StyleSpec /> },
  ],
  code: [
    {
      id: "web",
      title: "Web",
      body: <CodeWeb />,
      more: { href: "/get-started/react", label: "React guide" },
    },
    {
      id: "flutter",
      title: "Flutter",
      body: <CodeFlutter />,
      more: { href: "/get-started/flutter", label: "Flutter guide" },
    },
    {
      id: "ios",
      title: "iOS",
      body: <CodeIos />,
      more: { href: "/get-started/ios", label: "iOS guide" },
    },
  ],
  accessibility: [
    {
      id: "keyboard-interaction",
      title: "Keyboard interaction",
      body: <A11yKeyboard />,
    },
    { id: "screen-readers", title: "Screen readers", body: <A11yNames /> },
    {
      id: "contrast-and-focus",
      title: "Contrast and focus",
      body: <A11yContrast />,
    },
  ],
};
