import { Example } from "@/components/demo/Example";
import { Ic } from "@/components/demo/Ic";
import { ScreenWidths, WEB_SCREENS } from "@/components/demo/ScreenWidths";
import { SpecSheet } from "@/components/demo/SpecSheet";
import { NotificationArt } from "@/components/art/notification";
import { Code, Do, Dont, T, Table } from "../dev-kit";
import { NotifCard, NotificationPanelDemo } from "./notification.demo";
import { NOTIF_THEME_CSS, SAMPLE } from "./notification.theme";
import type { ComponentContent } from "./types";

/* ---------------------------------------------------------------------------
   Notification — the notification center at the bell, plus the inline banner.
   Facts: NPD-FSM/script.js (notifCardHTML, renderNotifPanel, renderNotifHistory,
   notifSkeletonHTML), styles.css (NOTIFICATION CENTER, .banner) and
   notif/notif.css (the theme layer loaded after styles.css).
   Mobile: FSM-Mobile screens/notifications.js, MOBILE_DESIGN_NOTES.md.
   --------------------------------------------------------------------------- */

/* fixed overlays are shown in place inside the example */
const IN_PLACE: React.CSSProperties = { position: "relative", top: "auto", right: "auto", maxHeight: "none", animation: "none" };

const HTML_PANEL = `
<div class="notif-panel" role="dialog" aria-label="Notifications">
  <div class="notif-head">
    <span class="t">Notifications</span>
    <span class="notif-head-n">3 new</span>
    <button class="notif-head-link">View history (9)</button>
    <button class="sp-icn sm" aria-label="Close notifications"><!-- ic('x',15) --></button>
  </div>
  <div class="notif-actions" role="region" aria-label="Notification actions">
    <button class="notif-act"><!-- ic('checkmini',14) --><span>Mark all as read</span></button>
    <button class="notif-act"><!-- ic('trash',14) --><span>Clear notifications</span></button>
    <span class="notif-actions-sp"></span>
    <button class="notif-act icon ghost tip" data-tip="Select notifications"
            aria-label="Select notifications"><!-- ic('checkmini',15) --></button>
  </div>
  <div class="notif-body">
    <!-- one .ncard per notification -->
    <button class="notif-load-more">Load 6 more<span class="nlm-n">8 left</span></button>
  </div>
</div>
`;

const HTML_CARD = `
<div class="ncard unread" tabindex="0" role="button"
     aria-label="Unread. New work order assigned. WO-2422 · Lumière Innovations. 2 min ago. Press to open.">
  <span class="ncard-ic"><!-- ic('wo',17) --></span>
  <div class="ncard-main">
    <div class="ncard-t">New work order assigned</div>
    <div class="ncard-desc">WO-2422 · Lumière Innovations</div>
    <div class="ncard-time">2 min ago</div>
  </div>
  <span class="ncard-right">
    <span class="ncard-flag" aria-hidden="true"></span>
    <button class="ncard-more" aria-label="Actions for New work order assigned"><!-- ic('more',15) --></button>
  </span>
</div>
`;

const HTML_SELECTING = `
<div class="notif-actions selecting" role="region" aria-label="Selection actions">
  <button class="notif-selall" aria-pressed="false">
    <span class="notif-selall-box" aria-hidden="true"></span>
    2 selected
  </button>
  <span class="notif-actions-sp"></span>
  <button class="notif-act"><!-- ic('checkmini',14) --><span>Mark as read</span></button>
  <button class="notif-act"><!-- ic('trash',14) --><span>Clear</span></button>
  <button class="notif-act icon ghost tip" data-tip="Cancel selection" aria-label="Cancel selection"><!-- ic('x',15) --></button>
</div>
<!-- each row becomes a checkbox: role="checkbox" aria-checked, class "selecting", "picked" when on -->
<div class="ncard picked selecting" tabindex="0" role="checkbox" aria-checked="true" aria-label="…">
  <span class="ncard-pick"><input type="checkbox" tabindex="-1" checked aria-hidden="true"></span>
  …
</div>
`;

const HTML_EMPTY = `
<div class="notif-empty">
  <span class="notif-empty-ic"><!-- ic('bell',22) --></span>
  <h4>You're all caught up</h4>
  <p>New notifications show up here. Cleared ones stay in history.</p>
  <button class="btn btn-sm"><!-- ic('list',13) --> Open history (9)</button>
</div>
`;

const HTML_SKELETON = `
<div class="ncard-skel" aria-hidden="true">
  <div class="skel sk-ic"></div>
  <div class="sk-lines"><div class="skel sk-l1"></div><div class="skel sk-l2"></div><div class="skel sk-l3"></div></div>
</div>
`;

const HTML_BANNER = `
<div class="banner">
  <!-- ic('lock',15) -->
  These are the fixed five-state statuses used across the whole app.
</div>
`;

function Head({ unread = 3, history = 9 }: { unread?: number; history?: number }) {
  return (
    <div className="notif-head">
      <span className="t">Notifications</span>
      {unread > 0 && <span className="notif-head-n">{unread} new</span>}
      <button type="button" className="notif-head-link">
        View history{history ? ` (${history})` : ""}
      </button>
      <button type="button" className="sp-icn sm" aria-label="Close notifications">
        <Ic n="x" s={15} />
      </button>
    </div>
  );
}

function RestBar() {
  return (
    <div className="notif-actions" role="region" aria-label="Notification actions">
      <button type="button" className="notif-act">
        <Ic n="checkmini" s={14} />
        <span>Mark all as read</span>
      </button>
      <button type="button" className="notif-act">
        <Ic n="trash" s={14} />
        <span>Clear notifications</span>
      </button>
      <span className="notif-actions-sp" />
      <button type="button" className="notif-act icon ghost tip" data-tip="Select notifications" aria-label="Select notifications">
        <Ic n="checkmini" s={15} />
      </button>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="ncard-skel" aria-hidden="true">
      <div className="skel sk-ic" />
      <div className="sk-lines">
        <div className="skel sk-l1" />
        <div className="skel sk-l2" />
        <div className="skel sk-l3" />
      </div>
    </div>
  );
}

/* the notif.css layer, rendered on the server so it arrives with the markup it styles */
const NotifStyle = () => <style>{NOTIF_THEME_CSS}</style>;

/* ---- usage ---------------------------------------------------------------- */

function Overview() {
  return (
    <div className="prose">
      <p>
        The notification panel opens from the bell in the top bar. It lists what changed for you: an assigned work order,
        an engineer check-in, a new report. Each row opens its record. Clearing a row moves it to history. Nothing is
        deleted.
      </p>
      <Example
        title="Notification panel"
        description="Live. Open a row, mark all as read, try selecting mode, or clear the panel."
        layout="none"
        bg="white"
        minHeight={640}
      >
        <NotificationPanelDemo />
      </Example>
    </div>
  );
}

function WhenToUse() {
  return (
    <div className="prose">
      <ul className="dodont">
        <Do>Use the panel for events the user should know about later: assignments, check-ins, submitted reports.</Do>
        <Do>Write the title as what happened, then one description line: the record number and the customer.</Do>
        <Do>Use a toast to confirm an action the user just took. Use a quiet banner for a fact about the current page.</Do>
        <Dont>Send a notification for the action the user just performed. That is a toast.</Dont>
        <Dont>Add a second line of detail, a status color, or a row tint. The card is three lines: title, description, time.</Dont>
      </ul>
    </div>
  );
}

function Anatomy() {
  return (
    <div className="prose">
      <Example title="Anatomy" description="Header, action bar, rows, load more." layout="none" bg="muted" minHeight={420} code={{ lang: "HTML", code: HTML_PANEL }}>
        <NotifStyle />
        <div className="notif-panel" role="dialog" aria-label="Notifications" style={IN_PLACE}>
          <Head />
          <RestBar />
          <div className="notif-body">
            {SAMPLE.slice(0, 3).map((n) => (
              <NotifCard key={n.id} n={n} />
            ))}
            <button type="button" className="notif-load-more">
              Load 6 more<span className="nlm-n">8 left</span>
            </button>
          </div>
        </div>
      </Example>
      <Table
        head={["Part", "Rule"]}
        rows={[
          ["Header", "Title, unread count as \"N new\", View history link with the history count, close button"],
          ["Action bar", "Directly under the header: Mark all as read, Clear notifications, and Select notifications. Fixed 50px tall"],
          ["Icon tile", "36 × 36 tile with the module icon at 17px. Same for read and unread"],
          ["Title", "What happened. Bold when unread"],
          ["Description", "One line: \"WO-2422 · Lumière Innovations\", or \"Alejandro Cruz at Aurora Dynamics\" without a record number. Truncates with an ellipsis"],
          ["Time", "Relative: 2 min ago, Yesterday. History adds \"· In history\""],
          ["Right rail", "The red unread dot. On hover or focus the more button takes the same slot"],
          ["Load more", "Shows six rows per page: \"Load 6 more\" with how many are left"],
        ]}
      />
    </div>
  );
}

function Variants() {
  return (
    <div className="prose">
      <div className="examples two">
        <Example title="Unread and read" description="Unread: bold title and the red dot. Read: regular weight, no dot." layout="none" bg="white" code={{ lang: "HTML", code: HTML_CARD }}>
          <NotifStyle />
          <div style={{ border: "1px solid var(--border-2)", borderRadius: 10, overflow: "hidden", width: "100%" }}>
            <NotifCard n={SAMPLE[0]} />
            <NotifCard n={SAMPLE[3]} />
          </div>
        </Example>
        <Example title="Selecting mode" description="The action bar turns into the selection bar. Rows become checkboxes." layout="none" bg="white" code={{ lang: "HTML", code: HTML_SELECTING }}>
          <NotifStyle />
          <div style={{ border: "1px solid var(--border-2)", borderRadius: 10, overflow: "hidden", width: "100%" }}>
            <div className="notif-actions selecting" role="region" aria-label="Selection actions">
              <button type="button" className="notif-selall" aria-pressed="false">
                <span className="notif-selall-box" aria-hidden="true" />
                2 selected
              </button>
              <span className="notif-actions-sp" />
              <button type="button" className="notif-act">
                <Ic n="checkmini" s={14} />
                <span>Mark as read</span>
              </button>
              <button type="button" className="notif-act">
                <Ic n="trash" s={14} />
                <span>Clear</span>
              </button>
              <button type="button" className="notif-act icon ghost tip" data-tip="Cancel selection" aria-label="Cancel selection">
                <Ic n="x" s={15} />
              </button>
            </div>
            <NotifCard n={SAMPLE[0]} selecting picked />
            <NotifCard n={SAMPLE[1]} selecting picked />
            <NotifCard n={SAMPLE[2]} selecting />
          </div>
        </Example>
        <Example title="Empty" description="Says what happened and where cleared rows went." layout="none" bg="white" code={{ lang: "HTML", code: HTML_EMPTY }}>
          <NotifStyle />
          <div style={{ border: "1px solid var(--border-2)", borderRadius: 10, width: "100%" }}>
            <div className="notif-empty">
              <span className="notif-empty-ic">
                <Ic n="bell" s={22} />
              </span>
              <h4>You&apos;re all caught up</h4>
              <p>New notifications show up here. Cleared ones stay in history.</p>
              <button type="button" className="btn btn-sm">
                <Ic n="list" s={13} /> Open history (9)
              </button>
            </div>
          </div>
        </Example>
        <Example title="Loading" description="History shows skeleton rows while the list is assembled." layout="none" bg="white" code={{ lang: "HTML", code: HTML_SKELETON }}>
          <NotifStyle />
          <div style={{ border: "1px solid var(--border-2)", borderRadius: 10, overflow: "hidden", width: "100%" }} aria-busy="true">
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        </Example>
        <Example title="History row" description="A cleared row keeps its time and adds where it lives." layout="none" bg="white">
          <NotifStyle />
          <div className="notif-hist" style={{ ...IN_PLACE, width: "100%" }}>
            <div className="notif-hist-body">
              <NotifCard n={{ ...SAMPLE[3], time: "6 days ago" }} ctx="history" />
            </div>
          </div>
        </Example>
        <Example title="Inline banner" description="A quiet fact about the current page. Not a notification." layout="none" bg="white" code={{ lang: "HTML", code: HTML_BANNER }}>
          <div className="banner" style={{ marginBottom: 0 }}>
            <Ic n="lock" s={15} />
            These are the fixed five-state statuses used across the whole app.
          </div>
        </Example>
      </div>
    </div>
  );
}

function Behavior() {
  return (
    <div className="prose">
      <ul className="dev-notes">
        <li>The bell toggles the panel. The bell badge counts unread rows in the panel and shows 99+ above 99.</li>
        <li>Opening a row marks it read and goes to its record. In selecting mode the whole row toggles its checkbox.</li>
        <li>Mark all as read is disabled when nothing is unread. Clear and Select are disabled when the panel is empty.</li>
        <li>Clear notifications moves every row to history. It is not destructive, so it needs no confirmation.</li>
        <li>Cleared rows slide out (200ms) before the list redraws. Mark as read, clear, and restore end with a toast, such as "3 notifications moved to history".</li>
        <li>The more button opens a menu: Open, Mark as read (unread only), and Clear (move to history), or Restore to panel in history.</li>
        <li>History has search, a module and type filter shown as removable chips, and its own load more. It shows skeleton rows for 280ms while it loads.</li>
        <li>The panel and history open with a 180ms fade and 6px rise. Below 640px they span the screen with 12px side margins.</li>
        <li>Mobile: Notifications is a bottom navigation destination. Each row is a button with an icon tile, title, one line of detail, and a chevron.</li>
      </ul>
    </div>
  );
}

/* ---- style ---------------------------------------------------------------- */

function StyleColor() {
  return (
    <Table
      head={["Element", "Token", "Note"]}
      rows={[
        ["Panel surface", <>#FFFFFF, border <T>--border-2</T></>, "Two-layer shadow"],
        ["Unread count", <><T>--error</T> on <T>--error-bg</T></>, "Red means unread, nothing else"],
        ["Unread dot, bell badge", <T>--error</T>, "Paired with the bold title"],
        ["Icon tile", <><T>--muted-2</T>, glyph <T>--primary</T></>, <>Unread rows: <T>--primary-50</T></>],
        ["Title, description, time", <><T>--fg</T>, <T>--fg-3</T>, <T>--fg-4</T></>, ""],
        ["View history link", <T>--primary</T>, <>Hover <T>--primary-700</T>, underlined</>],
        ["Action bar", "#FFFFFF", <>Selecting: <T>--primary-50</T>, border <T>--primary-100</T></>],
        ["Row hover", <T>--surface-2</T>, ""],
        ["Picked row", <T>--primary-50</T>, <>Inset 1px <T>--primary-100</T></>],
        ["Banner", <><T>--primary-50</T>, border <T>--primary-100</T></>, <>Text <T>--primary-700</T>, icon <T>--primary</T></>],
      ]}
    />
  );
}

function StyleSpec() {
  return (
    <Table
      head={["Property", "Value"]}
      rows={[
        ["Panel width", "min(392px, 100vw − 32px)"],
        ["Panel position", "Fixed, 74px from top, 24px from right. Max height 78vh"],
        ["Panel radius", <><T>--radius-card</T> 10</>],
        ["Header padding", "16 14 14 18; title 14.5 · 600"],
        ["Action bar", "50 tall; buttons 36 (--h-md), 12 · 500"],
        ["Row padding, gap", "14 16, gap 12 (history rows: 14 18)"],
        ["Icon tile", <>36 × 36, <T>--radius-panel</T> 10, glyph 17</>],
        ["Title, description, time", "13.5 · 500 (700 unread), 12, 11"],
        ["Unread dot", "8 × 8"],
        ["Page size", "6 rows per load"],
        ["Motion", "Open 180ms; hover 150ms; clear 200ms, then redraw at 220ms"],
        ["History width", "min(492px, 100vw − 32px), max height 84vh"],
      ]}
    />
  );
}

function Measurements() {
  return (
    <div className="prose">
      <p>
        Every number below is read from the product stylesheet, including the notification layer (notif.css), not typed
        by hand. Build to these numbers, not to how the picture looks.
      </p>
      <SpecSheet
        title="Notification panel"
        description="Header, action bar, and rows."
        scale={1}
        bg="muted"
        targets={[
          { sel: ".notif-panel", name: "Panel", width: "fixed" },
          { sel: ".notif-actions", name: "Action bar", width: "fill" },
          { sel: ".ncard", name: "Notification row", width: "fill" },
        ]}
      >
        <NotifStyle />
        <div className="notif-panel" role="dialog" aria-label="Notifications" style={IN_PLACE}>
          <Head />
          <RestBar />
          <div className="notif-body">
            {SAMPLE.slice(0, 3).map((n) => (
              <NotifCard key={n.id} n={n} />
            ))}
          </div>
        </div>
      </SpecSheet>
      <SpecSheet title="Unread count in the header" targets={[{ sel: ".notif-head-n", name: "Count chip" }]}>
        <NotifStyle />
        <span className="notif-head-n">3 new</span>
      </SpecSheet>
      <SpecSheet
        title="Row parts"
        description="The icon tile and the unread dot."
        targets={[
          { sel: ".ncard-ic", name: "Icon tile", width: "fixed" },
          { sel: ".ncard-flag", name: "Unread dot", width: "fixed", marks: true },
        ]}
      >
        <NotifStyle />
        <div style={{ width: 392 }}>
          <NotifCard n={SAMPLE[0]} />
        </div>
      </SpecSheet>
      <SpecSheet
        title="Bell and count badge"
        description="The badge shows 99+ above 99."
        targets={[
          { sel: ".tb-bell", name: "Bell button", width: "fixed" },
          { sel: ".bell-badge", name: "Count badge", marks: true },
        ]}
      >
        <NotifStyle />
        <button type="button" className="tb-bell" aria-label="Notifications — 3 unread">
          <span className="bell-badge on" aria-hidden="true">
            3
          </span>
          <Ic n="bell" s={18} />
        </button>
      </SpecSheet>
    </div>
  );
}

function Screens() {
  return (
    <ScreenWidths
      rows={[
        { screen: "desktop", width: WEB_SCREENS.desktop, change: "The panel opens under the bell: 74 px from the top, 24 px from the right, 392 px wide." },
        { screen: "laptop", width: WEB_SCREENS.laptop, same: true },
        { screen: "tablet", width: WEB_SCREENS.tablet, same: true },
        { screen: "phone", width: WEB_SCREENS.phone, change: "The panel and history span the screen with 12 px on each side, 68 px from the top. Mark all as read and Clear show their icon only. The history filter shows one column." },
        { screen: "mobile-app", width: WEB_SCREENS.app, change: "Notifications is a tab in the bottom navigation. It opens a full screen list: icon tile, title, one line of detail, and a chevron." },
      ]}
    />
  );
}

/* ---- code ----------------------------------------------------------------- */

function CodeWeb() {
  return (
    <div className="prose">
      <Code title="HTML" lang="html">{HTML_PANEL + HTML_CARD}</Code>
      <Code title="React" lang="tsx">{`
import { NotificationPanel } from "@/components/ui/NotificationPanel";

<NotificationPanel
  open={open}
  onClose={() => setOpen(false)}
  items={active}                     // uncleared notifications
  historyCount={cleared.length}
  onOpenItem={(n) => openRecord(n)}  // marks read, then routes
  onMarkAllRead={markAllRead}
  onClear={(ids) => moveToHistory(ids)}
  onOpenHistory={() => setView("history")}
/>
`}</Code>
      <Table
        head={["Prop", "Type", "Default"]}
        rows={[
          [<T>open</T>, <T>boolean</T>, <T>false</T>],
          [<T>items</T>, <T>Notification[]</T>, "—"],
          [<T>historyCount</T>, <T>number</T>, <T>0</T>],
          [<T>pageSize</T>, <T>number</T>, <T>6</T>],
          [<T>onOpenItem</T>, <T>(n: Notification) =&gt; void</T>, "—"],
          [<T>onMarkAllRead</T>, <T>() =&gt; void</T>, "—"],
          [<T>onClear</T>, <T>(ids: number[]) =&gt; void</T>, "—"],
          [<T>onOpenHistory</T>, <T>() =&gt; void</T>, "—"],
        ]}
      />
    </div>
  );
}

function CodeFlutter() {
  return (
    <Code title="Flutter" lang="dart">{`
// Notifications is a NavigationBar destination. One row per notification.
ListTile(
  leading: const Icon(Icons.mail_outline),
  title: Text(n.title, style: TextStyle(fontWeight: n.unread ? FontWeight.w700 : FontWeight.w500)),
  subtitle: Text(n.description, maxLines: 1, overflow: TextOverflow.ellipsis),
  trailing: const Icon(Icons.chevron_right),
  onTap: () => openRecord(n),
);

// Bell with an unread count
Badge.count(
  count: unread,
  isLabelVisible: unread > 0,
  child: IconButton(
    icon: const Icon(Icons.notifications_outlined),
    tooltip: 'Notifications',
    onPressed: openNotifications,
  ),
);
`}</Code>
  );
}

function CodeIos() {
  return (
    <Code title="SwiftUI" lang="swift">{`
List(notifications) { n in
    NavigationLink(value: n) {
        Label {
            VStack(alignment: .leading, spacing: 2) {
                Text(n.title).fontWeight(n.unread ? .bold : .medium)
                Text(n.description).lineLimit(1).foregroundStyle(.secondary)
            }
        } icon: { Image(systemName: n.symbol) }
    }
    .accessibilityLabel(n.unread ? "Unread. \\(n.title)" : n.title)
}
.navigationTitle("Notifications")

// Bell with an unread count
Button(action: openNotifications) { Image(systemName: "bell") }
    .badge(unread)
    .accessibilityLabel(unread > 0 ? "Notifications, \\(unread) unread" : "Notifications")
`}</Code>
  );
}

/* ---- accessibility -------------------------------------------------------- */

function A11yKeyboard() {
  return (
    <Table
      head={["Key", "Action"]}
      rows={[
        ["Tab", "Moves through the header, the action bar, each row, and each row's more button"],
        ["Enter, Space on a row", "Opens the record. In selecting mode, toggles the row"],
        ["Enter, Space on a button", "Runs the action"],
      ]}
    />
  );
}

function A11yNames() {
  return (
    <div className="prose">
      <ul className="dodont">
        <Do>Name the panel: <T>role="dialog"</T> with <T>aria-label="Notifications"</T>.</Do>
        <Do>Give each row one spoken sentence: "Unread. New work order assigned. WO-2422 · Lumière Innovations. 2 min ago. Press to open."</Do>
        <Do>Put the unread count in the bell's name: "Notifications — 3 unread". Hide the badge digits with <T>aria-hidden</T>.</Do>
        <Do>In selecting mode, use <T>role="checkbox"</T> and <T>aria-checked</T> on each row, and <T>aria-pressed</T> on Select all.</Do>
        <Do>Name each more button after its row: "Actions for New work order assigned".</Do>
        <Dont>Rely on the red dot alone. Unread rows also have a bold title and the word "Unread" in their name.</Dont>
      </ul>
    </div>
  );
}

function A11yContrast() {
  return (
    <Table
      head={["Pair", "Ratio", "Requirement"]}
      rows={[
        [<><T>--fg</T> title on white</>, "11.6:1", "4.5:1 text"],
        [<><T>--fg-3</T> description on white</>, "6.2:1", "4.5:1 text"],
        [<><T>--fg-4</T> time on white</>, "4.7:1", "4.5:1 text"],
        [<><T>--error</T> count on <T>--error-bg</T></>, "4.7:1", "4.5:1 text"],
        [<><T>--error</T> unread dot on white</>, "5.4:1", "3:1 non-text"],
        ["Row focus", "Inset 2px primary ring, 9.6:1 on white", "3:1 non-text"],
      ]}
    />
  );
}

export const notification: ComponentContent = {
  lead: "Tells the user what changed since they last looked. Rows open their record; clearing moves them to history, never deletes.",
  art: NotificationArt,
  usage: [
    { id: "overview", title: "Overview", body: <Overview /> },
    { id: "when-to-use", title: "When to use", body: <WhenToUse /> },
    { id: "anatomy", title: "Anatomy", body: <Anatomy /> },
    { id: "variants", title: "Variants", body: <Variants /> },
    { id: "behavior", title: "Behavior and states", body: <Behavior /> },
    { id: "related", title: "Related", body: <p className="prose-p">Toast confirms the action the user just took; Progress covers skeletons and loading; Menu for the row's more menu.</p>, more: { href: "/components/toast", label: "Toast" } },
  ],
  style: [
    { id: "measurements", title: "Measurements", body: <Measurements /> },
    { id: "screen-widths", title: "Screen widths", body: <Screens /> },
    { id: "color", title: "Color", body: <StyleColor /> },
    { id: "specifications", title: "Specifications", body: <StyleSpec /> },
  ],
  code: [
    { id: "web", title: "Web", body: <CodeWeb />, more: { href: "/get-started/react", label: "React guide" } },
    { id: "flutter", title: "Flutter", body: <CodeFlutter />, more: { href: "/get-started/flutter", label: "Flutter guide" } },
    { id: "ios", title: "iOS", body: <CodeIos />, more: { href: "/get-started/ios", label: "iOS guide" } },
  ],
  accessibility: [
    { id: "keyboard-interaction", title: "Keyboard interaction", body: <A11yKeyboard /> },
    { id: "screen-readers", title: "Screen readers", body: <A11yNames /> },
    { id: "contrast-and-focus", title: "Contrast and focus", body: <A11yContrast /> },
  ],
};
