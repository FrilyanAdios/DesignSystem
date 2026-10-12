import { Example } from "@/components/demo/Example";
import { Ic } from "@/components/demo/Ic";
import { SpecSheet } from "@/components/demo/SpecSheet";
import { ScreenWidths, WEB_SCREENS } from "@/components/demo/ScreenWidths";
import { NavbarArt } from "@/components/art/navbar";
import { Code, Do, Dont, T, Table } from "../dev-kit";
import { AppNavbar, SidebarDemo } from "./sidebar.demo";
import type { ComponentContent } from "./types";

/* ---------------------------------------------------------------------------
   Navbar — the global 64px bar, the page header (.topbar) under it, and the
   mobile app bar + bottom navigation.
   Facts: NPD-FSM/index.html (header.navbar, header.topbar), styles.css
   (APP SHELL block, entity-control), script.js (ic() calls, ACTION,
   updateBellBadge, toggleMobileSearch), sr/sr-main.js (module header),
   DESIGN_SYSTEM.md (Component equivalence, Responsive behavior), and
   FSM-Mobile (MOBILE_DESIGN_NOTES.md, esco-fsm-prototype.html, css/).
   --------------------------------------------------------------------------- */

const HTML_NAVBAR = `
<header class="navbar">
  <button class="nb-menu-btn" aria-label="Toggle menu">
    <!-- ic('menu', 20) -->
  </button>
  <div class="nb-brand">
    <img src="assets/logo-blue.png" alt="Esco Lifesciences" />
  </div>
  <div class="nb-search tb-search">
    <!-- ic('search') -->
    <input aria-label="Search across the whole application" placeholder="Search everything…" />
  </div>
  <button class="nb-search-btn" aria-label="Search">
    <!-- ic('search', 18) -->
  </button>
  <div class="nb-right">
    <button class="tb-bell" aria-label="Notifications — 3 unread">
      <span class="bell-badge on" aria-hidden="true">3</span>
      <!-- ic('bell', 18) -->
    </button>
  </div>
</header>
`;

const HTML_TOPBAR = `
<header class="topbar">
  <h1>Work Order</h1>
  <div class="topbar-right">
    <button class="btn btn-primary btn-sm">
      <!-- ic('plus', 15) --> Assign / Create WO
    </button>
  </div>
</header>
`;

const HTML_TOPBAR_SCOPE = `
<header class="topbar">
  <h1>Service Report</h1>
  <div class="topbar-right">
    <label class="entity-control btn-md">
      <span class="sr-only">Esco entity</span>
      <!-- ic('building', 14) -->
      <select aria-label="Esco entity">
        <option>All entities</option>
        <option>Esco Micro Pte. Ltd.</option>
      </select>
      <!-- ic('down', 12) -->
    </label>
    <button type="button" class="btn btn-primary btn-md">
      <!-- ic('plus', 16) --> Create service report
    </button>
  </div>
</header>
`;

const HTML_MOBILE = `
<!-- Home app bar (FSM-Mobile/screens/dashboard.js) -->
<header class="appbar home-toolbar">
  <div class="brand">
    <img class="brand-logo" src="image/escologo.png" alt="Esco Lifesciences Group" />
    <span class="brand-divider" aria-hidden="true"></span>
    <span class="brand-name">FSM</span>
  </div>
  <button class="iconbtn search-trigger" aria-label="Search pages"
          aria-expanded="false" aria-controls="homeSuggestions">…</button>
</header>

<!-- Bottom navigation (FSM-Mobile/esco-fsm-prototype.html) -->
<nav class="navbar" aria-label="Main navigation">
  <div class="nav-item active" data-nav="dashboard" aria-current="page">
    <div class="indi"><i data-icon="home"></i></div><span class="nl">Today</span>
  </div>
  <div class="nav-item" data-nav="modules">
    <div class="indi"><i data-icon="grid"></i></div><span class="nl">Modules</span>
  </div>
  <div class="nav-item" data-nav="notifications">
    <div class="indi"><i data-icon="bell"></i></div><span class="nl">Notifications</span>
  </div>
  <div class="nav-item" data-nav="profile">
    <div class="indi"><i data-icon="user"></i></div><span class="nl">Profile</span>
  </div>
</nav>
`;

function EntityScope() {
  return (
    <label className="entity-control btn-md">
      <span className="sr-only">Esco entity</span>
      <Ic n="building" s={14} />
      <select aria-label="Esco entity" defaultValue="All entities">
        <option>All entities</option>
        <option>Esco Micro Pte. Ltd.</option>
        <option>Esco Philippines, Inc.</option>
      </select>
      <Ic n="down" s={12} />
    </label>
  );
}

/* ---- usage ---------------------------------------------------------------- */

function Overview() {
  return (
    <div className="prose">
      <p>
        The navbar is the 64px bar at the top of every screen. It holds the logo, the global search, and notifications.
        It stays the same in every module. Under it, beside the sidebar, the page header names the current page and
        carries its one primary action.
      </p>
      <p>
        User identity is not in the navbar. The product keeps the user and role at the top of the sidebar, so the navbar
        reads as brand on the left and tools on the right.
      </p>
      <Example
        title="Application shell"
        description="Navbar, sidebar, and page header as they ship. Pick a page in the sidebar; collapse it with the chevron."
        layout="none"
        pad={false}
        minHeight={560}
        code={{ lang: "HTML", code: HTML_NAVBAR }}
      >
        <SidebarDemo navbar height={560} />
      </Example>
    </div>
  );
}

function WhenToUse() {
  return (
    <div className="prose">
      <ul className="dodont">
        <Do>Use the one shared navbar on every module, including sibling workspaces such as CSM.</Do>
        <Do>Name the page in the page header, sentence case, one title per page.</Do>
        <Do>
          End the page header with the module’s single primary action on the far right. Put entity scope just before it.
        </Do>
        <Dont>Add module links, tabs, or the user menu to the navbar. Navigation lives in the sidebar.</Dont>
        <Dont>
          Add a second page search beside the title. The global search is in the navbar; page search belongs to the
          toolbar.
        </Dont>
        <Dont>Put Export all in the page header when the page has a register toolbar.</Dont>
      </ul>
    </div>
  );
}

function Anatomy() {
  return (
    <div className="prose">
      <Example title="Navbar" layout="none" pad={false} bg="white" code={{ lang: "HTML", code: HTML_NAVBAR }}>
        <AppNavbar />
      </Example>
      <Table
        head={["Part", "Class", "Rule"]}
        rows={[
          ["Menu button", <T>.nb-menu-btn</T>, "Hidden on desktop. Opens the sidebar drawer below 900px"],
          ["Logo", <T>.nb-brand</T>, "80 × 32, in the same 20px gutter as the sidebar content below"],
          [
            "Global search",
            <T>.nb-search</T>,
            "Quiet field, muted fill, no border until focus. Searches the whole application",
          ],
          ["Search button", <T>.nb-search-btn</T>, "Replaces the field below 640px"],
          ["Notifications", <T>.tb-bell</T>, "40 × 40 bordered button with the bell icon at 18px"],
          ["Unread count", <T>.bell-badge</T>, "Count, not a dot. Hidden at zero, capped at 99+"],
        ]}
      />
      <Example title="Page header" layout="none" pad={false} code={{ lang: "HTML", code: HTML_TOPBAR }}>
        <header className="topbar">
          <h1>Work Order</h1>
          <div className="topbar-right">
            <button type="button" className="btn btn-primary btn-sm">
              <Ic n="plus" s={15} /> Assign / Create WO
            </button>
          </div>
        </header>
      </Example>
      <Table
        head={["Part", "Class", "Rule"]}
        rows={[
          ["Title", <T>.topbar h1</T>, "The page name. One per page"],
          ["Right group", <T>.topbar-right</T>, "Entity scope, then the one primary action"],
        ]}
      />
    </div>
  );
}

function Variants() {
  return (
    <div className="prose">
      <Example
        title="Global navbar"
        description="Unread notifications show a count on the bell."
        layout="none"
        pad={false}
        bg="white"
        code={{ lang: "HTML", code: HTML_NAVBAR }}
      >
        <AppNavbar unread={12} />
      </Example>
      <Example
        title="Navbar, no unread"
        description="At zero the badge is hidden, so a quiet inbox looks quiet."
        layout="none"
        pad={false}
        bg="white"
      >
        <AppNavbar unread={0} />
      </Example>
      <Example
        title="Page header with entity scope"
        description="Register modules scope the page by entity. The primary action closes the row."
        layout="none"
        pad={false}
        code={{ lang: "HTML", code: HTML_TOPBAR_SCOPE }}
      >
        <header className="topbar">
          <h1>Service Report</h1>
          <div className="topbar-right">
            <EntityScope />
            <button type="button" className="btn btn-primary btn-md">
              <Ic n="plus" s={16} />
              Create service report
            </button>
          </div>
        </header>
      </Example>
      <Example
        title="Page header, title only"
        description="When a page has no primary action, the button is not rendered."
        layout="none"
        pad={false}
        code={{
          lang: "HTML",
          code: `<header class="topbar">\n  <h1>Dashboard</h1>\n  <div class="topbar-right"></div>\n</header>`,
        }}
      >
        <header className="topbar">
          <h1>Dashboard</h1>
          <div className="topbar-right" />
        </header>
      </Example>
      <h3>Mobile app bar and bottom navigation</h3>
      <p>
        The mobile app has no web navbar. Home uses a branded app bar: logo, a fine divider, the FSM label, and a search
        button. Root pages (Modules, Notifications, Profile) use a large leading title. Pushed pages use a centred title
        with equal 48px action slots on both sides.
      </p>
      <p>
        Root screens share a bottom navigation bar with four destinations: Today, Modules, Notifications, Profile. It is
        a white rounded bar inset from the screen edges. It is hidden inside modules.
      </p>
      <Code title="Mobile markup" lang="html">
        {HTML_MOBILE}
      </Code>
    </div>
  );
}

function Behavior() {
  return (
    <div className="prose">
      <ul className="dev-notes">
        <li>The navbar never changes between modules. Only the page header changes with the page.</li>
        <li>
          The bell badge updates after every change to the notifications. Its count is part of the bell’s accessible
          name.
        </li>
        <li>
          The global search field has no outline at rest. Hover deepens the fill; focus turns it white with the 2px
          primary ring.
        </li>
        <li>
          Below 900px the menu button appears and opens the sidebar as a 260px drawer beneath the navbar, over a scrim.
        </li>
        <li>
          Below 640px the search field becomes a search button. Pressing it opens the field across the bar and hides the
          logo and the bell until search closes. The page header uses a 16px gutter.
        </li>
        <li>At 640px and below, the entity control and medium header buttons grow to 44px for touch.</li>
        <li>
          On mobile, changing screen moves focus to the new page title. The bottom navigation marks the current
          destination with <T>aria-current="page"</T>.
        </li>
      </ul>
    </div>
  );
}

/* ---- style ---------------------------------------------------------------- */

function Measurements() {
  return (
    <div className="prose">
      <p>
        Every number below is read from the product stylesheet, not typed by hand. Build to these numbers, not to how
        the picture looks.
      </p>
      <SpecSheet
        title="Navbar"
        description="The whole bar on a desktop screen."
        scale={1}
        targets={[{ sel: ".navbar", name: "Navbar", width: "fill" }]}
      >
        {/* desktop markup only: the menu and search buttons are hidden at this width */}
        <header className="navbar" style={{ width: 640 }}>
          <div className="nb-brand">
            <img src="/Logo/logo-blue.png" alt="Esco Lifesciences" width={80} height={32} />
          </div>
          <div className="nb-search tb-search">
            <Ic n="search" />
            <input aria-label="Search across the whole application" placeholder="Search everything…" />
          </div>
          <div className="nb-right">
            <button type="button" className="tb-bell" aria-label="Notifications — 3 unread">
              <span className="bell-badge on" aria-hidden="true">
                3
              </span>
              <Ic n="bell" s={18} />
            </button>
          </div>
        </header>
      </SpecSheet>
      <SpecSheet
        title="Search and notifications"
        description="The right side of the bar."
        targets={[
          {
            sel: ".nb-search input",
            name: "Global search field",
            width: "fixed",
          },
          {
            sel: ".tb-bell",
            name: "Notifications button",
            width: "fixed",
            marks: true,
          },
          { sel: ".bell-badge", name: "Unread count", width: "hug" },
        ]}
      >
        <header className="navbar" style={{ width: 400 }}>
          <div className="nb-search tb-search">
            <Ic n="search" />
            <input aria-label="Search across the whole application" placeholder="Search everything…" />
          </div>
          <div className="nb-right">
            <button type="button" className="tb-bell" aria-label="Notifications — 3 unread">
              <span className="bell-badge on" aria-hidden="true">
                3
              </span>
              <Ic n="bell" s={18} />
            </button>
          </div>
        </header>
      </SpecSheet>
      <SpecSheet
        title="Page header"
        description="Title, entity scope, and the one primary action."
        scale={1}
        targets={[
          { sel: ".topbar", name: "Page header", width: "fill" },
          { sel: ".topbar h1", name: "Page title" },
          { sel: ".entity-control", name: "Entity scope", width: "hug" },
          { sel: ".btn-primary", name: "Primary action" },
        ]}
      >
        <header className="topbar" style={{ width: 640 }}>
          <h1>Service Report</h1>
          <div className="topbar-right">
            <EntityScope />
            <button type="button" className="btn btn-primary btn-md">
              <Ic n="plus" s={16} />
              Create service report
            </button>
          </div>
        </header>
      </SpecSheet>
    </div>
  );
}

function Screens() {
  return (
    <ScreenWidths
      rows={[
        { screen: "desktop", width: WEB_SCREENS.desktop, same: true },
        { screen: "laptop", width: WEB_SCREENS.laptop, same: true },
        {
          screen: "tablet",
          width: WEB_SCREENS.tablet,
          change: "A menu button appears at the left of the bar. It opens the sidebar as a drawer under the bar.",
        },
        {
          screen: "phone",
          width: WEB_SCREENS.phone,
          change:
            "The search field becomes a search button. Opening it hides the logo and the bell. The page header gutter is 16 px. Entity scope and medium header buttons are 44 px tall.",
        },
        {
          screen: "mobile-app",
          width: WEB_SCREENS.app,
          change:
            "No web navbar. Home has a branded app bar; other pages have a title app bar, 64 px. Root pages share a bottom navigation bar: Today, Modules, Notifications, Profile.",
        },
      ]}
    />
  );
}

function StyleColor() {
  return (
    <div className="prose">
      <Table
        head={["Element", "Background", "Border", "Text or icon", "Hover"]}
        rows={[
          [
            "Navbar",
            "#FFFFFF",
            <>
              bottom <T>--border</T>
            </>,
            "—",
            "—",
          ],
          [
            "Global search",
            <T>--muted</T>,
            "transparent",
            <>
              placeholder and icon <T>--fg-3</T>
            </>,
            <T>--muted-2</T>,
          ],
          [
            "Global search, focus",
            "#FFFFFF",
            <>
              2px <T>--primary</T> ring
            </>,
            <T>--fg</T>,
            "—",
          ],
          ["Notifications", <T>--muted</T>, <T>--border</T>, <T>--fg-2</T>, <T>--muted-2</T>],
          ["Unread count", <T>--primary</T>, "2px #FFFFFF", "#FFFFFF", "—"],
          ["Menu and search buttons", "transparent", "—", <T>--fg-2</T>, <T>--muted</T>],
          [
            "Page header",
            <T>--bg</T>,
            <>
              bottom <T>--border</T>
            </>,
            <>
              title <T>--fg</T>
            </>,
            "—",
          ],
          [
            "Entity scope",
            "#FFFFFF",
            <T>--border</T>,
            <>
              <T>--fg-2</T>, icon <T>--fg-3</T>
            </>,
            <>
              <T>--muted</T>, border <T>--border-hover</T>
            </>,
          ],
        ]}
      />
      <Table
        head={["Mobile element", "Token", "Light"]}
        rows={[
          ["Inactive label", <T>--nav-muted</T>, "#5D7485"],
          ["Inactive icon", <T>--nav-icon-muted</T>, "#738B9D"],
          ["Active label, icon, and dot", <T>--esco-blue</T>, "#00467F"],
          ["Bar surface", "—", "#FBFDFF"],
        ]}
      />
    </div>
  );
}

function StyleSpec() {
  return (
    <div className="prose">
      <Table
        head={["Property", "Value"]}
        rows={[
          ["Navbar height", "64"],
          ["Navbar padding · gap", "0 20 · 16"],
          ["Logo", "80 × 32"],
          ["Global search width", "Up to 260, pushed right"],
          [
            "Global search height · radius",
            <>
              <T>--h-sm</T> 32 · <T>--radius-field</T> 8
            </>,
          ],
          ["Global search text", "12.5 · left padding 34 for the 16px icon"],
          ["Right group gap · margin", "10 · 12"],
          [
            "Notifications",
            <>
              <T>--h-lg</T> 40 × 40 · <T>--radius-control</T> 6 · icon 18
            </>,
          ],
          [
            "Unread count",
            <>
              20 high, min 20 wide · <T>--radius-pill</T> · 11 · 700 · offset −7, −7
            </>,
          ],
          [
            "Menu and search buttons",
            <>
              36 × <T>--h-md</T> 36 · <T>--radius-field</T> 8 · icons 20 and 18
            </>,
          ],
          ["Page header height", "56"],
          ["Page header padding · gap", <>0 24 · 16 (0 16 below 640px)</>],
          [
            "Page title",
            <>
              <T>--fs-page</T> 19 · 400 · <T>--fg</T>
            </>,
          ],
          [
            "Header action group gap",
            <>
              <T>--sp-2</T> 8
            </>,
          ],
          [
            "Entity scope",
            <>
              <T>--h-md</T> 36 · max 230 wide · <T>--radius-field</T> 8 · 44 below 640px
            </>,
          ],
        ]}
      />
      <Table
        head={["Mobile property", "Value"]}
        rows={[
          ["App bar min height", "64"],
          ["Root page title", "20 · 500, leading"],
          ["Pushed page title", "Centred, 48px action slots on both sides"],
          ["Bottom bar radius", "24, inset 16 from the screen edges"],
          ["Destination min height", "56"],
          ["Destination icon", "21"],
          ["Label", "13 · 400; active 600"],
          ["Active dot", "4 × 4"],
          ["Touch target", "48 × 48 minimum"],
        ]}
      />
    </div>
  );
}

/* ---- code ----------------------------------------------------------------- */

function CodeWeb() {
  return (
    <div className="prose">
      <Code title="HTML" lang="html">
        {HTML_NAVBAR + HTML_TOPBAR_SCOPE}
      </Code>
      <Code title="React" lang="tsx">{`
import { AppNavbar, PageHeader } from "@/components/ui/AppShell";

<AppNavbar unread={unreadCount} onMenu={openDrawer} onSearch={search} onNotifications={openPanel} />

<PageHeader
  title="Service Report"
  scope={<EntityScope value={entity} onChange={setEntity} />}
  action={<Button variant="primary" size="md" icon={<Ic n="plus" s={16} />}>Create service report</Button>}
/>
`}</Code>
      <Table
        head={["Prop", "Component", "Type", "Default"]}
        rows={[
          [<T>unread</T>, "AppNavbar", <T>number</T>, <T>0</T>],
          [<T>onMenu</T>, "AppNavbar", <T>() =&gt; void</T>, "—"],
          [<T>onSearch</T>, "AppNavbar", <T>(q: string) =&gt; void</T>, "—"],
          [<T>onNotifications</T>, "AppNavbar", <T>() =&gt; void</T>, "—"],
          [<T>title</T>, "PageHeader", <T>string</T>, "—"],
          [<T>scope</T>, "PageHeader", <T>ReactNode</T>, "—"],
          [<T>action</T>, "PageHeader", <T>ReactNode</T>, "—"],
        ]}
      />
    </div>
  );
}

function CodeFlutter() {
  return (
    <Code title="Flutter" lang="dart">{`
Scaffold(
  appBar: AppBar(
    title: const Text('Modules'),            // root page: leading title
    actions: [
      IconButton(
        tooltip: 'Search pages',
        icon: const Icon(Icons.search),
        onPressed: openSearch,
      ),
    ],
  ),
  body: pages[index],
  bottomNavigationBar: NavigationBar(
    selectedIndex: index,
    onDestinationSelected: (i) => setState(() => index = i),
    destinations: const [
      NavigationDestination(icon: Icon(Icons.home_outlined), label: 'Today'),
      NavigationDestination(icon: Icon(Icons.grid_view), label: 'Modules'),
      NavigationDestination(icon: Icon(Icons.notifications_outlined), label: 'Notifications'),
      NavigationDestination(icon: Icon(Icons.person_outline), label: 'Profile'),
    ],
  ),
);

// Pushed page: centred title, back button in the leading 48px slot.
AppBar(centerTitle: true, title: const Text('Service report'));
`}</Code>
  );
}

function CodeIos() {
  return (
    <Code title="SwiftUI" lang="swift">{`
TabView {
    NavigationStack { TodayView() }
        .tabItem { Label("Today", systemImage: "house") }
    NavigationStack { ModulesView() }
        .tabItem { Label("Modules", systemImage: "square.grid.2x2") }
    NavigationStack { NotificationsView() }
        .tabItem { Label("Notifications", systemImage: "bell") }
    NavigationStack { ProfileView() }
        .tabItem { Label("Profile", systemImage: "person") }
}
.tint(.escoPrimary)

// Inside a tab
ModulesView()
    .navigationTitle("Modules")
    .toolbar {
        ToolbarItem(placement: .primaryAction) {
            Button("Search pages", systemImage: "magnifyingglass", action: openSearch)
        }
    }

// Pushed page
ServiceReportView()
    .navigationTitle("Service report")
    .navigationBarTitleDisplayMode(.inline)
`}</Code>
  );
}

/* ---- accessibility -------------------------------------------------------- */

function A11yKeyboard() {
  return (
    <Table
      head={["Key", "Action"]}
      rows={[
        ["Tab", "Moves through menu button (below 900px), search, and notifications, in that order"],
        ["Enter, Space", "Activates the focused button"],
        ["Typing in search", "Searches across the whole application"],
        ["Tab in the page header", "Reaches entity scope, then the primary action"],
      ]}
    />
  );
}

function A11yNames() {
  return (
    <div className="prose">
      <ul className="dodont">
        <Do>Give every icon-only control a name: Toggle menu, Search, Notifications.</Do>
        <Do>
          Put the unread count in the bell’s name, for example “Notifications — 3 unread”. Hide the badge itself from
          assistive technology.
        </Do>
        <Do>Label the global search field: “Search across the whole application”. The placeholder is not a label.</Do>
        <Do>
          Use one <T>h1</T> per page, in the page header.
        </Do>
        <Do>
          On mobile, label the bottom bar as a navigation landmark and mark the current destination with{" "}
          <T>aria-current="page"</T>.
        </Do>
        <Dont>Rely on the logo as the page name, or announce the badge number twice.</Dont>
      </ul>
    </div>
  );
}

function A11yContrast() {
  return (
    <Table
      head={["Pair", "Ratio", "Requirement"]}
      rows={[
        [
          <>
            Page title <T>--fg</T> on white
          </>,
          "11.5:1",
          "4.5:1 text",
        ],
        [
          <>
            Bell icon <T>--fg-2</T> on <T>--muted</T>
          </>,
          "8.1:1",
          "3:1 non-text",
        ],
        [
          <>
            Search placeholder <T>--fg-3</T> on <T>--muted</T>
          </>,
          "5.9:1",
          "4.5:1 text",
        ],
        ["White count on primary", "9.6:1", "4.5:1 text"],
        ["Focus ring on white", "9.6:1", "3:1 non-text"],
        [
          <>
            Mobile inactive label <T>--nav-muted</T> on #FBFDFF
          </>,
          "4.8:1",
          "4.5:1 text",
        ],
        [
          <>
            Mobile inactive icon <T>--nav-icon-muted</T> on #FBFDFF
          </>,
          "3.5:1",
          "3:1 non-text",
        ],
      ]}
    />
  );
}

export const navbar: ComponentContent = {
  lead: "The 64px global bar with logo, search, and notifications, plus the page header that names the page and holds its primary action.",
  art: NavbarArt,
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
          Sidebar for module navigation and the user block; Button for the page header action; Select for entity scope.
        </p>
      ),
      more: { href: "/components/sidebar", label: "Sidebar" },
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
