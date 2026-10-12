import { Example } from "@/components/demo/Example";
import { Ic } from "@/components/demo/Ic";
import { SpecSheet } from "@/components/demo/SpecSheet";
import { ScreenWidths, WEB_SCREENS } from "@/components/demo/ScreenWidths";
import { PaginationArt } from "@/components/art/pagination";
import { Code, Do, Dont, T, Table } from "../dev-kit";
import { PaginationDemo, RailPaginationDemo, SrStyles } from "./pagination.demo";
import type { ComponentContent } from "./types";

/* ---------------------------------------------------------------------------
   Pagination — the register footer. Service Report is canonical.
   Facts: DESIGN_SYSTEM.md › Register pagination, Service Schedule work-order
   rail; sr/sr-list.js › srPagination, srSetPage, srGoToPage, srSetPer;
   sr/sr-settings.js › SR_PAGE_SIZES; sr/sr.css (.sr-foot … .sr-total and the
   900/600px rules); styles.css (.wo-queue-pagination, .schedule-list-foot);
   script.js (register footers with aria-current, queuePaginationHTML).
   --------------------------------------------------------------------------- */

const HTML_FOOT = `
<div class="sr-foot">
  <span class="lbl">Rows per page</span>
  <select class="finp" aria-label="Rows per page">
    <option>10</option><option selected>20</option><option>25</option><option>50</option><option>100</option>
  </select>
  <div class="sr-pg">
    <button disabled aria-label="Previous page"><!-- ic('cleft', 15) --></button>
    <button class="on" aria-current="page">1</button>
    <button>2</button>
    <button>3</button>
    <button>4</button>
    <button>5</button>
    <button>6</button>
    <button>7</button>
    <span class="lbl">…</span><button>21</button>
    <button aria-label="Next page"><!-- ic('cright', 15) --></button>
  </div>
  <label class="sr-goto"><span class="lbl">Go to</span>
    <input class="finp" inputmode="numeric" value="1" aria-label="Go to page" />
  </label>
  <div class="sp"></div>
  <span class="sr-total">Showing <b>1–20</b> of <b>415</b> · Esco Micro Pte. Ltd.</span>
</div>
`;

const HTML_MIDDLE = `
<div class="sr-pg">
  <button aria-label="Previous page">…</button>
  <button>1</button><span class="lbl">…</span>
  <button>7</button><button>8</button><button>9</button>
  <button class="on" aria-current="page">10</button>
  <button>11</button><button>12</button><button>13</button>
  <span class="lbl">…</span><button>21</button>
  <button aria-label="Next page">…</button>
</div>
`;

const HTML_RAIL = `
<div class="wo-queue-pagination" aria-label="Work order pagination">
  <span>1–5 of 23</span>
  <div class="sr-pg">
    <button disabled aria-label="Previous work order page"><!-- ic('cleft', 15) --></button>
    <span class="wo-page-label">1 / 5</span>
    <button aria-label="Next work order page"><!-- ic('cright', 15) --></button>
  </div>
</div>
`;

const JS_WINDOW = `
// sr/sr-list.js — at most seven numbers around the current page
const from = Math.max(1, Math.min(p - 3, pages - 6));
const to = Math.min(pages, from + 6);
// first page and "…" before the window when from > 1,
// "…" and last page after it when to < pages
`;

/* ---- usage ---------------------------------------------------------------- */

function Overview() {
  return (
    <div className="prose">
      <p>
        Pagination sits in the footer of a register. It sets how many rows show, moves between pages, jumps to a page,
        and says which rows are on screen. Service Report is the reference; every register uses the same controls and
        order.
      </p>
      <Example
        title="Register footer"
        description="Live: change rows per page, step through pages, or type a page in Go to and press Enter."
        layout="none"
        pad={false}
        code={{ lang: "HTML", code: HTML_FOOT }}
      >
        <PaginationDemo entity="Esco Micro Pte. Ltd." />
      </Example>
    </div>
  );
}

function WhenToUse() {
  return (
    <div className="prose">
      <ul className="dodont">
        <Do>Use it under any register that can hold more rows than one page.</Do>
        <Do>Keep the order: Rows per page, page navigation, Go to, optional business scope, then Showing X–Y of Z.</Do>
        <Do>
          Include Go to when there are many pages. A 415-row register at 20 rows is 21 pages; stepping is not enough.
        </Do>
        <Do>In a narrow rail, show the range, current and total pages, and previous and next only.</Do>
        <Dont>Render every page number. Use the bounded window.</Dont>
        <Dont>Shrink labels or targets to fit the footer on one line.</Dont>
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
            "Rows per page",
            <>
              <T>.lbl</T> + <T>select.finp</T>
            </>,
            "10, 20, 25, 50, or 100. Default 20. Changing it returns to page 1",
          ],
          [
            "Previous, next",
            <T>.sr-pg button</T>,
            "Chevron icons at 15px with names. Disabled on the first and last page",
          ],
          [
            "Page numbers",
            <T>.sr-pg button</T>,
            "Up to seven around the current page, plus first and last with an ellipsis",
          ],
          ["Current page", <T>.sr-pg button.on</T>, "Filled primary"],
          [
            "Go to",
            <T>.sr-goto</T>,
            "Numeric field, 60px wide. Enter or leaving the field jumps; out-of-range values clamp",
          ],
          ["Spacer", <T>.sp</T>, "Pushes the total to the right"],
          ["Total", <T>.sr-total</T>, "Showing X–Y of Z, with the entity when one is chosen"],
        ]}
      />
      <Code title="Page window" lang="js">
        {JS_WINDOW}
      </Code>
    </div>
  );
}

function Variants() {
  return (
    <div className="prose">
      <Example
        title="Middle of a long register"
        description="First and last stay reachable; the window follows the current page."
        layout="none"
        pad={false}
        code={{ lang: "HTML", code: HTML_MIDDLE }}
      >
        <PaginationDemo startPage={10} />
      </Example>
      <Example
        title="Few pages"
        description="With seven pages or fewer, every number shows and no ellipsis appears."
        layout="none"
        pad={false}
      >
        <PaginationDemo total={96} />
      </Example>
      <Example
        title="Narrow rail"
        description="For a side rail such as the Service Schedule work-order queue. No page-number list."
        layout="center"
        code={{ lang: "HTML", code: HTML_RAIL }}
      >
        <RailPaginationDemo />
      </Example>
    </div>
  );
}

function Behavior() {
  return (
    <div className="prose">
      <ul className="dev-notes">
        <li>
          Hover gives a page button a quiet <T>--muted-2</T> fill. Focus shows the shared 2px primary ring.
        </li>
        <li>Previous is disabled on page 1 and next on the last page. Disabled buttons drop to 40% opacity.</li>
        <li>Go to ignores anything that is not a number and clamps to the first or last page.</li>
        <li>Changing rows per page returns to page 1.</li>
        <li>Below 900px the footer stops wrapping and scrolls sideways.</li>
        <li>Below 600px Go to hides first. Labels and targets keep their size.</li>
        <li>The narrow rail keeps previous and next pinned to the bottom of the rail.</li>
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
        the picture looks. The footer rules come from the Service Report stylesheet, which is loaded with these
        examples.
      </p>
      <SpecSheet
        title="Register footer"
        description="A short register, five pages and no Go to, so the footer fits at real size."
        scale={1}
        targets={[{ sel: ".sr-foot", name: "Footer", width: "fill" }]}
      >
        <PaginationDemo total={96} goTo={false} />
      </SpecSheet>
      <SpecSheet
        title="Page buttons"
        targets={[
          {
            sel: ".sr-pg button:not(.on):not(:disabled)",
            name: "Page button, rest",
            width: "hug",
          },
          {
            sel: ".sr-pg button.on",
            name: "Page button, current",
            width: "hug",
            marks: true,
          },
          {
            sel: ".sr-pg button:disabled",
            name: "Previous, disabled",
            width: "fixed",
          },
        ]}
      >
        <SrStyles />
        <nav className="sr-pg" aria-label="Measured pagination">
          <button type="button" disabled aria-label="Previous page">
            <Ic n="cleft" s={15} />
          </button>
          <button type="button" className="on" aria-current="page">
            1
          </button>
          <button type="button">2</button>
          <button type="button">3</button>
        </nav>
      </SpecSheet>
      <SpecSheet
        title="Rows per page and Go to"
        targets={[
          {
            sel: ".sr-foot select.finp",
            name: "Rows per page select",
            width: "hug",
          },
          {
            sel: ".sr-goto input.finp",
            name: "Go to field",
            width: "fixed",
            marks: true,
          },
        ]}
      >
        <SrStyles />
        <div className="sr-foot">
          <span className="lbl" aria-hidden="true">
            Rows per page
          </span>
          <select className="finp" aria-label="Rows per page" defaultValue="20">
            {[10, 20, 25, 50, 100].map((n) => (
              <option key={n}>{n}</option>
            ))}
          </select>
          <label className="sr-goto">
            <span className="lbl">Go to</span>
            <input className="finp" inputMode="numeric" aria-label="Go to page" defaultValue="1" />
          </label>
        </div>
      </SpecSheet>
      <SpecSheet
        title="Narrow rail"
        scale={1}
        targets={[
          {
            sel: ".wo-queue-pagination",
            name: "Narrow rail pagination",
            width: "fill",
          },
        ]}
      >
        <RailPaginationDemo />
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
          change: "Below 900 px the footer stays on one line and scrolls sideways. It is 68 px tall.",
        },
        {
          screen: "phone",
          width: WEB_SCREENS.phone,
          change: "Below 600 px Go to is hidden first. Labels and 40 px targets keep their size; the footer scrolls.",
        },
        {
          screen: "mobile-app",
          width: WEB_SCREENS.app,
          change:
            "The mobile app sources have no pagination component. If you need one, use the narrow form: range, current / total, previous and next, with 48 px targets.",
        },
      ]}
    />
  );
}

function StyleColor() {
  return (
    <Table
      head={["Element", "Background", "Text", "Hover"]}
      rows={[
        [
          "Footer",
          <>
            #FFFFFF, top border <T>--border</T>
          </>,
          "—",
          "—",
        ],
        ["Page button", "transparent", <T>--fg-2</T>, <T>--muted-2</T>],
        ["Current page", <T>--primary</T>, "#FFFFFF", "—"],
        ["Labels: Rows per page, Go to, ellipsis", "—", <T>--fg-3</T>, "—"],
        [
          "Total",
          "—",
          <>
            <T>--fg-3</T>; numbers <T>--fg-2</T>
          </>,
          "—",
        ],
        [
          "Rows per page, Go to fields",
          "#FFFFFF",
          <>
            <T>--fg</T>, border <T>--border-input</T>
          </>,
          "—",
        ],
        ["Narrow rail page label", "—", <T>--fg-2</T>, "—"],
      ]}
    />
  );
}

function StyleSpec() {
  return (
    <div className="prose">
      <Table
        head={["Property", "Value"]}
        rows={[
          ["Footer height", "59: 40 px controls, 9 px above and below, 1 px top border. Minimum 58 (68 below 900px)"],
          [
            "Footer padding · gap",
            <>
              9 <T>--gutter</T> 24 · 8
            </>,
          ],
          ["Page buttons gap", "3"],
          [
            "Page button",
            <>
              min 40 × 40 · padding 0 8 · <T>--radius-control</T> 6
            </>,
          ],
          ["Page button text", "12.5 · 500"],
          ["Disabled", "40% opacity"],
          ["Rows per page field", "Min height 40 · 12.5"],
          ["Go to field", "60 wide · min height 40 · centred, tabular numbers"],
          ["Labels", "12"],
          [
            "Total",
            <>
              <T>--fs-help</T> 11.5 · numbers 600 · tabular
            </>,
          ],
          ["Arrow icons", "15"],
        ]}
      />
      <Table
        head={["Narrow rail property", "Value"]}
        rows={[
          ["Height · padding · gap", "53: 40 px buttons, 6 px above and below, 1 px top border. Minimum 52 · 6 10 · 8"],
          ["Buttons", "40 × 40"],
          [
            "Range text",
            <>
              <T>--fs-help</T> 11.5 · <T>--fg-3</T> · tabular
            </>,
          ],
          [
            "Page label",
            <>
              min 38 wide · 600 · <T>--fg-2</T>
            </>,
          ],
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
        {HTML_FOOT + HTML_RAIL}
      </Code>
      <Code title="React" lang="tsx">{`
import { Pagination } from "@/components/ui/Pagination";

<Pagination
  total={rows.length}
  page={page}
  pageSize={pageSize}
  onPageChange={setPage}
  onPageSizeChange={(n) => { setPageSize(n); setPage(1); }}
  scope={entity === ALL_ENTITIES ? undefined : entity}
/>

<Pagination variant="rail" total={queue.length} page={page} pageSize={5} onPageChange={setPage} />
`}</Code>
      <Table
        head={["Prop", "Type", "Default"]}
        rows={[
          [<T>total</T>, <T>number</T>, "—"],
          [<T>page</T>, <T>number</T>, <T>1</T>],
          [<T>pageSize</T>, <T>10 | 20 | 25 | 50 | 100</T>, <T>20</T>],
          [<T>onPageChange</T>, <T>(page: number) =&gt; void</T>, "—"],
          [<T>onPageSizeChange</T>, <T>(size: number) =&gt; void</T>, "—"],
          [<T>scope</T>, <T>string</T>, "—"],
          [<T>goTo</T>, <T>boolean</T>, <T>true</T>],
          [<T>variant</T>, <T>"register" | "rail"</T>, <T>"register"</T>],
        ]}
      />
    </div>
  );
}

function CodeFlutter() {
  return (
    <div className="prose">
      <p>Material has no pagination widget. On a phone, use the narrow-rail form with 48px targets.</p>
      <Code title="Flutter" lang="dart">{`
Row(
  mainAxisAlignment: MainAxisAlignment.spaceBetween,
  children: [
    Text('$first–$last of $total', style: Theme.of(context).textTheme.bodyMedium),
    Row(children: [
      IconButton(
        tooltip: 'Previous page',
        icon: const Icon(Icons.chevron_left),
        onPressed: page > 1 ? () => setPage(page - 1) : null,
      ),
      Semantics(
        liveRegion: true,
        child: Text('$page / $pages', style: const TextStyle(fontWeight: FontWeight.w600)),
      ),
      IconButton(
        tooltip: 'Next page',
        icon: const Icon(Icons.chevron_right),
        onPressed: page < pages ? () => setPage(page + 1) : null,
      ),
    ]),
  ],
);
`}</Code>
    </div>
  );
}

function CodeIos() {
  return (
    <div className="prose">
      <p>SwiftUI has no pagination control either. Use the same narrow form.</p>
      <Code title="SwiftUI" lang="swift">{`
HStack {
    Text("\\(first)–\\(last) of \\(total)")
        .font(.escoMeta)
        .monospacedDigit()
    Spacer()
    Button("Previous page", systemImage: "chevron.left") { page -= 1 }
        .labelStyle(.iconOnly)
        .disabled(page == 1)
    Text("\\(page) / \\(pages)")
        .font(.escoMeta.weight(.semibold))
        .monospacedDigit()
    Button("Next page", systemImage: "chevron.right") { page += 1 }
        .labelStyle(.iconOnly)
        .disabled(page == pages)
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
        ["Tab", "Moves through rows per page, previous, each page number, next, then Go to"],
        ["Enter, Space", "Activates the focused page button"],
        ["Arrow keys on rows per page", "Changes the page size"],
        ["Enter in Go to", "Jumps to the typed page"],
      ]}
    />
  );
}

function A11yNames() {
  return (
    <div className="prose">
      <ul className="dodont">
        <Do>
          Wrap the page buttons in a <T>nav</T> with a name, such as “Pagination”, or a specific one such as “Work order
          pagination”.
        </Do>
        <Do>
          Mark the current page with <T>aria-current="page"</T>. The fill alone is not enough.
        </Do>
        <Do>Name the arrows: Previous page, Next page. Name the fields: Rows per page, Go to page.</Do>
        <Do>Announce the new range in a polite status region after a page change.</Do>
        <Do>
          Use real <T>disabled</T> on previous and next at the ends.
        </Do>
        <Dont>Let the ellipsis be read as content. Hide it from assistive technology.</Dont>
      </ul>
    </div>
  );
}

function A11yContrast() {
  return (
    <Table
      head={["Pair", "Ratio", "Requirement"]}
      rows={[
        ["White on the current page (primary)", "9.6:1", "4.5:1 text"],
        [
          <>
            Page numbers <T>--fg-2</T> on white
          </>,
          "8.4:1",
          "4.5:1 text",
        ],
        [
          <>
            Page numbers <T>--fg-2</T> on hover <T>--muted-2</T>
          </>,
          "7.4:1",
          "4.5:1 text",
        ],
        [
          <>
            Labels and total <T>--fg-3</T> on white
          </>,
          "6.2:1",
          "4.5:1 text",
        ],
        ["Focus ring on white", "9.6:1", "3:1 non-text"],
        ["Disabled arrows", "Exempt", "Inactive controls have no contrast requirement"],
      ]}
    />
  );
}

export const pagination: ComponentContent = {
  lead: "The register footer: rows per page, a bounded set of page numbers, Go to, and the visible range. Service Report is the reference.",
  art: PaginationArt,
  usage: [
    { id: "overview", title: "Overview", body: <Overview /> },
    { id: "when-to-use", title: "When to use", body: <WhenToUse /> },
    { id: "anatomy", title: "Anatomy", body: <Anatomy /> },
    { id: "variants", title: "Variants", body: <Variants /> },
    { id: "behavior", title: "Behavior and states", body: <Behavior /> },
    {
      id: "related",
      title: "Related",
      body: <p className="prose-p">Table for the register above it; Select for rows per page; Text field for Go to.</p>,
      more: { href: "/components/table", label: "Table" },
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
