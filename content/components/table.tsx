import { Example } from "@/components/demo/Example";
import { Ic } from "@/components/demo/Ic";
import { SpecSheet } from "@/components/demo/SpecSheet";
import { ScreenWidths, WEB_SCREENS } from "@/components/demo/ScreenWidths";
import { TableArt } from "@/components/art/table";
import { Code, Do, Dont, T, Table } from "../dev-kit";
import { RegisterDemo } from "./table.demo";
import { FRAME_STYLE, SR_REGISTER_CSS } from "./table.styles";
import type { ComponentContent } from "./types";

/* ---------------------------------------------------------------------------
   Table — the Service Report register (.sr-table) is the canonical table.
   Facts: DESIGN_SYSTEM.md › Tables and registers, Register selection and
   export, Table toolbar and row actions, Register pagination; sr/sr.css;
   sr/sr-columns.js, sr/sr-list.js; export-dialog.js; wo/wo-list.js (refresh
   and overflow); dr/dr-list.js (Register/Split switch on .viewsw).
   The register rules live in sr/sr.css, which the demo stage does not load,
   so examples add them with <style>{SR_REGISTER_CSS}</style>.
   --------------------------------------------------------------------------- */

/* The product's refresh glyph (sr/sr-core.js › refresh). Not in the shared ic() map. */
function RefreshIc({ s = 16 }: { s?: number }) {
  return (
    <svg className="ic" width={s} height={s} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M8 16H3v5" />
    </svg>
  );
}

const HTML_TOOLBAR = `
<div class="sr-tools">
  <div class="fsm-search">
    <button class="fsm-search-trigger" aria-expanded="false">
      <!-- ic('search') --> <span>Search service reports…</span>
    </button>
  </div>
  <!-- dataset action -->
  <button type="button" class="btn btn-sm export-btn"><!-- ic('download', 14) -->Export all</button>
  <!-- table settings, refresh, overflow -->
  <button class="icon-btn" aria-label="Table settings" title="Table settings — columns, sort and page size"><!-- ic('gear', 16) --></button>
  <button class="icon-btn" aria-label="Refresh table data" title="Refresh table data"><!-- ic('refresh', 16) --></button>
  <button class="icon-btn" aria-label="More table options" title="More table options"><!-- ic('more', 16) --></button>
  <!-- shape -->
  <div class="viewsw" role="group" aria-label="View">
    <button class="on" aria-pressed="true" aria-label="Register view" title="Register — every column"><!-- ic('table', 16) --></button>
    <button aria-pressed="false" aria-label="Split view" title="Split — list beside the report"><!-- ic('panel', 16) --></button>
  </div>
</div>
`;

const HTML_TABLE = `
<div class="sr-table-scroll" role="region" aria-label="Service reports" tabindex="0">
  <table class="sr-table" aria-label="Service reports" style="min-width:/* column widths + 64 */">
    <colgroup><col style="width:64px"><col style="width:168px"> … <col style="width:168px"></colgroup>
    <thead><tr>
      <th scope="col" class="sr-tick"><label class="sr-ck">
        <input type="checkbox" aria-label="Select every report on this page"></label></th>
      <th scope="col" class="sortable on" aria-sort="descending" title="Sort by Service Report No">
        <span class="th-in"><span class="th-t">Service Report No</span>
        <span class="sar"><!-- ic('down', 12) --></span></span></th>
      …
      <th scope="col" class="sortable ctr pin" aria-sort="none">…Schedule Status…</th>
    </tr></thead>
    <tbody>
      <tr class="picked">
        <td class="sr-tick"><label class="sr-ck">
          <input type="checkbox" checked aria-label="Select ZWSE-26-0415"></label></td>
        <td><span class="sr-no">ZWSE-26-0415</span></td>
        <td><span class="sr-1line" title="HOBERT TESTING QUICK ADD ACCOUNT">HOBERT TESTING QUICK ADD ACCOUNT</span></td>
        <td class="ctr"><span class="sr-frac">1/1</span></td>
        <td class="ctr"><span class="sr-tick yes" role="img" aria-label="Yes">…</span></td>
        …
        <td class="ctr pin">
          <button type="button" class="statectl b-open"><span class="d"></span>Open<!-- ic('down', 14) --></button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
`;

const HTML_BULK = `
<!-- under the table, above the pager; only while rows are picked -->
<div class="sr-bulk" role="region" aria-label="Selected reports">
  <span class="sr-bulk-n"><!-- ic('checkmini', 14) --><b>2</b> reports selected</span>
  <div class="sp"></div>
  <button class="btn btn-sm"><!-- ic('mail', 14) -->Email</button>
  <button class="btn btn-sm export-btn"><!-- ic('download', 14) -->Export selected (2)</button>
  <button class="btn btn-sm btn-primary"><!-- ic('download', 14) -->Download 2 reports</button>
  <button class="sr-bulk-x" aria-label="Clear the selection"><!-- ic('x', 14) --></button>
</div>
`;

const HTML_EMPTY = `
<tr><td colspan="9">
  <div class="sr-empty">
    <div class="ico"><!-- ic('report', 26) --></div>
    <h4>No service report matches this filter</h4>
    <p>Clear the search or pick a different saved view. …</p>
  </div>
</td></tr>
`;

/* ---- usage ---------------------------------------------------------------- */

function Toolbar() {
  return (
    <div className="sr-tools" style={{ width: "100%" }}>
      <div className="fsm-search">
        <button type="button" className="fsm-search-trigger" aria-expanded="false">
          <Ic n="search" s={16} />
          <span>Search service reports…</span>
        </button>
      </div>
      <button type="button" className="btn btn-sm export-btn">
        <Ic n="download" s={14} />
        Export all
      </button>
      <button type="button" className="icon-btn" aria-label="Table settings" title="Table settings — columns, sort and page size">
        <Ic n="gear" s={16} />
      </button>
      <button type="button" className="icon-btn" aria-label="Refresh table data" title="Refresh table data">
        <RefreshIc />
      </button>
      <button type="button" className="icon-btn" aria-label="More table options" title="More table options">
        <Ic n="more" s={16} />
      </button>
      <div className="viewsw" role="group" aria-label="View">
        <button type="button" className="on" aria-pressed="true" aria-label="Register view" title="Register — every column">
          <Ic n="table" s={16} />
        </button>
        <button type="button" aria-pressed="false" aria-label="Split view" title="Split — list beside the report">
          <Ic n="panel" s={16} />
        </button>
      </div>
    </div>
  );
}

function Overview() {
  return (
    <div className="prose">
      <p>
        A table is a register: many records of one kind, read down a column and compared across a row. Service Report is
        the reference. Every new operational table copies its anatomy, its toolbar, its selection bar, and its pager.
      </p>
      <Example
        title="Service report register"
        description="Sort any column, pick rows, and the selection bar appears under the table. Scroll sideways: Schedule Status stays pinned."
        layout="none"
        code={{ lang: "HTML", code: HTML_TABLE }}
      >
        <RegisterDemo />
      </Example>
    </div>
  );
}

function WhenToUse() {
  return (
    <div className="prose">
      <ul className="dodont">
        <Do>Use a table when people scan many records of the same kind and compare values in columns.</Do>
        <Do>Put one principal value in each cell. A register is read down a column.</Do>
        <Do>Make the row, or its record number, the route to the record. Put record actions on the detail screen.</Do>
        <Do>Let the table scroll sideways when columns don’t fit.</Do>
        <Dont>Stack unrelated subtext under a value, or shrink the font to fit more columns.</Dont>
        <Dont>Put a kebab menu or an eye button on every row when the row has one destination.</Dont>
        <Dont>Use a table for a handful of records that each need several actions. Use cards.</Dont>
      </ul>
    </div>
  );
}

function Anatomy() {
  return (
    <div className="prose">
      <Table
        head={["Part", "Rule"]}
        rows={[
          ["Toolbar", "Search, then dataset actions, table settings, refresh, overflow. The Register/Split switch closes the row"],
          ["Header row", "Sticky, sentence-case labels, 48px as shipped. Every sortable column shows a sort icon"],
          ["Selection column", "64px track outside the data columns, a 40px hit box around an 18px checkbox"],
          ["Cells", "One line, 52px rows as shipped, ellipsis when bounded"],
          ["Pinned column", <>The one column the register exists to report, sticky on the right edge (<T>.pin</T>)</>],
          ["Selection bar", "Under the table, above the pager. Only while rows are selected"],
          ["Pager", <>Rows per page, page numbers, previous and next, Go to, then <T>Showing X–Y of Z</T></>],
        ]}
      />
    </div>
  );
}

function Variants() {
  return (
    <div className="prose">
      <Example
        title="Toolbar"
        description="Dataset actions, table settings, refresh, then overflow. Overflow holds only row height and the column filter row."
        layout="none"
        pad={false}
        code={{ lang: "HTML", code: HTML_TOOLBAR }}
      >
        <style>{SR_REGISTER_CSS}</style>
        <Toolbar />
      </Example>
      <Example
        title="With selection"
        description="Two rows picked. The count is inside each action label."
        layout="none"
        code={{ lang: "HTML", code: HTML_BULK }}
      >
        <RegisterDemo initialPicked={["ZWSE-26-0413", "ZWSE-26-0411"]} />
      </Example>
      <Example title="Empty" description="Say what happened and what to do next." layout="none" code={{ lang: "HTML", code: HTML_EMPTY }}>
        <div style={FRAME_STYLE}>
          <style>{SR_REGISTER_CSS}</style>
          <div className="sr-empty">
            <div className="ico">
              <Ic n="report" s={26} />
            </div>
            <h4>No service report matches this filter</h4>
            <p>
              Clear the search or pick a different saved view. Reports are only listed for the entity selected above, and
              for the schedule state chosen in the footer.
            </p>
          </div>
        </div>
      </Example>
      <Table
        head={["Cell", "Markup", "Use"]}
        rows={[
          ["Record number", <T>.sr-no</T>, "Monospace, never wraps"],
          ["Bounded text", <T>.sr-1line</T>, <>Ellipsis, full value in <T>title</T> and on the detail screen</>],
          ["Ratio", <><T>.sr-frac</T>, <T>.short</T></>, "1/1 stays neutral; a short count turns amber"],
          ["Yes or no", <T>span.sr-tick.yes</T>, "A tick or a cross with an accessible name. Never a disabled checkbox"],
          ["No value", <><T>.sr-null</T>, <T>.sr-na</T></>, "Null means nothing entered; N/A means the question does not apply"],
          ["Status you can change", <T>.statectl</T>, "The one interactive cell. Pinned right"],
        ]}
      />
    </div>
  );
}

function Behavior() {
  return (
    <div className="prose">
      <ul className="dev-notes">
        <li>Sorting: select a header to sort by it; select it again to reverse. Report number and dates start descending.</li>
        <li>Hover fills the row with <T>--row-hover</T>. A picked row uses <T>--primary-50</T>.</li>
        <li>The header checkbox acts on the current page only. It shows a dash when some rows on the page are picked.</li>
        <li>Selection survives sorting, filtering, and paging. Clearing it hides the selection bar.</li>
        <li>
          Export has two entry points with fixed meanings. Toolbar <T>Export all</T> and bar <T>Export selected (n)</T>{" "}
          open the same export dialog, preset to the full result or the selected rows. The dialog sets records, applied
          filters, columns and their order, and the file format (CSV or Excel).
        </li>
        <li>Registers whose checkboxes exist only for export reach them from the dialog. Cancel or export clears selection.</li>
        <li>Empty: the table keeps its header and explains what to change.</li>
        <li>Loading: keep the table’s dimensions and its accessible name.</li>
        <li>
          Below 900px the table scrolls sideways; type never shrinks. Below 780px the toolbar may move optional controls
          into overflow. Below 600px the pager hides Go to first and scrolls.
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
        Every number below is read from the product stylesheet, not typed by hand. Build to these numbers, not to how the
        picture looks.
      </p>
      <SpecSheet
        title="Header and body cells"
        description="Service Report register, as it ships."
        scale={1}
        targets={[
          { sel: "thead th.sortable:not(.on)", name: "Header cell", width: "fixed" },
          { sel: "tbody td.cell-text", name: "Body cell", width: "fixed" },
        ]}
      >
        <MiniRegister />
      </SpecSheet>
      <SpecSheet title="Row checkbox" description="A 40 px hit box around an 18 px box." scale={3} targets={[{ sel: ".sr-ck", name: "Checkbox hit box", width: "fixed" }, { sel: ".sr-ck input", name: "Checkbox", width: "fixed", marks: true }]}>
        <style>{SR_REGISTER_CSS}</style>
        <table className="sr-table" style={{ width: 64 }} aria-label="Checkbox measurement">
          <tbody>
            <tr>
              <td className="sr-tick">
                <label className="sr-ck">
                  <input type="checkbox" defaultChecked aria-label="Select ZWSE-26-0415" />
                </label>
              </td>
            </tr>
          </tbody>
        </table>
      </SpecSheet>
      <SpecSheet title="Sort button" description="The label and its sort icon, inside the header cell." scale={2} targets={[{ sel: ".th-in", name: "Sort button", width: "fill" }]}>
        <style>{SR_REGISTER_CSS}</style>
        <table className="sr-table" style={{ width: 200 }} aria-label="Sort measurement">
          <thead>
            <tr>
              <th scope="col" className="sortable on" aria-sort="descending">
                <button type="button" className="th-in" style={{ width: "100%", font: "inherit", color: "inherit", textAlign: "inherit" }}>
                  <span className="th-t">Service Report No</span>
                  <span className="sar">
                    <Ic n="down" s={12} />
                  </span>
                </button>
              </th>
            </tr>
          </thead>
        </table>
      </SpecSheet>
      <SpecSheet
        title="Selection bar"
        description="Under the table, above the pager."
        scale={1}
        targets={[
          { sel: ".sr-bulk", name: "Selection bar", width: "fill" },
          { sel: ".sr-bulk .btn-primary", name: "Download button" },
          { sel: ".sr-bulk-x", name: "Clear selection button", width: "fixed" },
        ]}
      >
        <style>{SR_REGISTER_CSS}</style>
        <div style={{ width: 720 }}>
          <div className="sr-bulk" role="region" aria-label="Selected reports">
            <span className="sr-bulk-n">
              <Ic n="checkmini" s={14} />
              <b>2</b> reports selected
            </span>
            <div className="sp" />
            <button type="button" className="btn btn-sm export-btn">
              <Ic n="download" s={14} />
              Export selected (2)
            </button>
            <button type="button" className="btn btn-sm btn-primary">
              <Ic n="download" s={14} />
              Download 2 reports
            </button>
            <button type="button" className="sr-bulk-x" aria-label="Clear the selection">
              <Ic n="x" s={14} />
            </button>
          </div>
        </div>
      </SpecSheet>
      <SpecSheet
        title="Pinned status cell"
        description="Sticky on the right edge. Holds the one control in the row."
        scale={2}
        targets={[
          { sel: "td.pin", name: "Pinned status cell", width: "fixed" },
          { sel: "td.pin .statectl", name: "Status control" },
        ]}
      >
        <style>{SR_REGISTER_CSS}</style>
        <table className="sr-table" style={{ width: 336 }} aria-label="Pinned cell measurement">
          <colgroup>
            <col style={{ width: 168 }} />
            <col style={{ width: 168 }} />
          </colgroup>
          <tbody>
            <tr>
              <td>
                <span className="sr-no">ZWSE-26-0415</span>
              </td>
              <td className="ctr pin">
                <button type="button" className="statectl b-open" aria-label="Schedule status: Open. Open the schedule card">
                  <span className="d" />
                  Open
                  <Ic n="down" s={14} />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </SpecSheet>
    </div>
  );
}

/* A three-column register for measuring: same classes, fewer columns. */
function MiniRegister() {
  return (
    <div style={{ width: 600 }}>
      <style>{SR_REGISTER_CSS}</style>
      <table className="sr-table" aria-label="Service reports, measured">
        <colgroup>
          <col style={{ width: 64 }} />
          <col style={{ width: 168 }} />
          <col style={{ width: 260 }} />
        </colgroup>
        <thead>
          <tr>
            <th scope="col" className="sr-tick">
              <label className="sr-ck">
                <input type="checkbox" aria-label="Select every report on this page" />
              </label>
            </th>
            <th scope="col" className="sortable on" aria-sort="descending">
              <span className="th-in">
                <span className="th-t">Service Report No</span>
                <span className="sar">
                  <Ic n="down" s={12} />
                </span>
              </span>
            </th>
            <th scope="col" className="sortable" aria-sort="none">
              <span className="th-in">
                <span className="th-t">Company Name</span>
                <span className="sar">
                  <Ic n="sort" s={12} />
                </span>
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="sr-tick">
              <label className="sr-ck">
                <input type="checkbox" aria-label="Select ZWSE-26-0415" />
              </label>
            </td>
            <td>
              <span className="sr-no">ZWSE-26-0415</span>
            </td>
            <td className="cell-text">
              <span className="sr-1line">HOBERT TESTING QUICK ADD ACCOUNT</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function Screens() {
  return (
    <ScreenWidths
      rows={[
        { screen: "desktop", width: WEB_SCREENS.desktop, change: "Full register. If the columns are wider than the screen, the table scrolls sideways and Schedule Status stays pinned on the right." },
        { screen: "laptop", width: WEB_SCREENS.laptop, change: "Same as desktop. More columns sit off-screen, so sideways scrolling is more common. Type never shrinks." },
        { screen: "tablet", width: WEB_SCREENS.tablet, change: "The table scrolls sideways. Below 780 px the toolbar may move optional controls into the overflow menu." },
        { screen: "phone", width: WEB_SCREENS.phone, change: "The table still scrolls sideways at full type size. Below 600 px the pager hides Go to and scrolls. Controls are 44 px." },
        { screen: "mobile-app", width: WEB_SCREENS.app, change: "No register. The app lists records as cards; see Card." },
      ]}
    />
  );
}

function StyleColor() {
  return (
    <Table
      head={["Element", "Token"]}
      rows={[
        ["Header background", <T>--muted</T>],
        ["Header label", <><T>--fg-2</T> as shipped (contract: <T>--fg</T>)</>],
        ["Header rule", <T>--border</T>],
        ["Cell text", <T>--fg-2</T>],
        ["Row separator", <T>--border-2</T>],
        ["Row hover", <T>--row-hover</T>],
        ["Picked row", <T>--primary-50</T>],
        ["Sort icon, rest", <T>--icon-quiet</T>],
        ["Sort icon and label, hover or sorted", <T>--primary</T>],
        ["Record number", <T>--navy-active</T>],
        ["Null, N/A", <><T>--fg-4</T>, italic</>],
        ["Checkbox border, rest", <T>--border-input</T>],
        ["Checkbox, checked", <T>--primary</T>],
        ["Selection bar", <><T>--primary-50</T>, top border <T>--primary-100</T></>],
        ["Selection count", <><T>--primary-700</T>, number <T>--primary</T></>],
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
          ["Layout", <><T>table-layout: fixed</T>, widths from the column registry</>],
          ["Header height", "48 as shipped (contract: 56). Sticky"],
          ["Header label", "12 · 600 as shipped (contract: 12.5). Sentence case"],
          ["Cell text", "13 as shipped (contract: 13.5)"],
          ["Cell padding", "12 vertical, 16 horizontal as shipped (contract: 13 vertical). First column 24 left"],
          ["Row height", "52 minimum as shipped. 64 in a register with the 40 px checkbox box"],
          ["Sort icon", "12"],
          ["Selection column", "64 track, 40 hit box, 18 checkbox, 4 radius"],
          ["Toolbar row", <>54 minimum, controls <T>--h-md</T> 36, gap 8</>],
          ["Selection bar", "52 minimum, 32 buttons"],
          ["Pager controls", "40 minimum height, page numbers 40 minimum width"],
          ["Pinned column", "Sticky right, 1px left border, soft left shadow"],
        ]}
      />
      <p className="prose-p">
        Two sets of numbers exist. The design system and the shared register rule in the product stylesheet say 56px
        header, 12.5px labels, 13.5px cells with 13px padding; Test Report, Breakdown Log and Survey draw those. Service
        Report’s own stylesheet loads after and draws 48px, 12px and 13px with 12px padding. The measured values above
        are what Service Report ships.
      </p>
    </div>
  );
}

/* ---- code ----------------------------------------------------------------- */

function CodeWeb() {
  return (
    <div className="prose">
      <Code title="HTML" lang="html">{HTML_TOOLBAR + HTML_TABLE + HTML_BULK}</Code>
      <Code title="React" lang="tsx">{`
import { RegisterTable } from "@/components/ui/RegisterTable";

<RegisterTable
  label="Service reports"
  columns={columns}            // { key, label, width, align?, pinned?, cell(row) }
  rows={pageRows}
  rowKey={(r) => r.id}
  sort={sort}                  // { key: "no", dir: "desc" }
  onSortChange={setSort}
  selected={picked}            // Set of ids; survives sort, filter, paging
  onSelectedChange={setPicked}
  rowHref={(r) => \`/reports/\${r.id}\`}
  empty={<EmptyState title="No service report matches this filter" />}
/>
`}</Code>
      <Table
        head={["Prop", "Type", "Default"]}
        rows={[
          [<T>label</T>, <T>string</T>, "—"],
          [<T>columns</T>, <T>Column&lt;T&gt;[]</T>, "—"],
          [<T>rows</T>, <T>T[]</T>, "—"],
          [<T>sort</T>, <T>{"{ key: string; dir: \"asc\" | \"desc\" }"}</T>, "—"],
          [<T>selected</T>, <T>Set&lt;string&gt;</T>, "—"],
          [<T>rowHref</T>, <T>(row: T) =&gt; string</T>, "—"],
          [<T>empty</T>, <T>ReactNode</T>, "—"],
        ]}
      />
    </div>
  );
}

function CodeFlutter() {
  return (
    <div className="prose">
      <p className="prose-p">
        The mobile app lists records as cards, not tables. When a tablet layout needs a register, use{" "}
        <T>DataTable</T> inside a horizontal scroll view.
      </p>
      <Code title="Flutter" lang="dart">{`
SingleChildScrollView(
  scrollDirection: Axis.horizontal,
  child: DataTable(
    headingRowHeight: 56,
    sortColumnIndex: sortIndex,
    sortAscending: ascending,
    columns: [
      DataColumn(label: const Text('Service report no'), onSort: (i, asc) => sortBy(i, asc)),
      DataColumn(label: const Text('Company name'), onSort: (i, asc) => sortBy(i, asc)),
      const DataColumn(label: Text('Schedule status')),
    ],
    rows: [
      for (final r in reports)
        DataRow(
          selected: picked.contains(r.id),
          onSelectChanged: (on) => toggle(r.id, on ?? false),
          cells: [
            DataCell(Text(r.no)),
            DataCell(Text(r.account, overflow: TextOverflow.ellipsis)),
            DataCell(EscoStatusPill(label: r.statusLabel, family: r.family)),
          ],
        ),
    ],
  ),
);
`}</Code>
    </div>
  );
}

function CodeIos() {
  return (
    <div className="prose">
      <p className="prose-p">
        On iPhone, show records in a <T>List</T>. On iPad, <T>Table</T> gives sortable columns and multi-select; in a
        compact width it shows only the first column, so keep identity there.
      </p>
      <Code title="SwiftUI" lang="swift">{`
Table(reports, selection: $picked, sortOrder: $sortOrder) {
    TableColumn("Service report no", value: \\.no)
    TableColumn("Company name", value: \\.account)
    TableColumn("Date of service", value: \\.date) { Text($0.date, format: .dateTime.day().month().year()) }
    TableColumn("Schedule status", value: \\.statusLabel) { EscoStatusPill(label: $0.statusLabel, family: $0.family) }
}
.onChange(of: sortOrder) { _, order in reports.sort(using: order) }
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
        ["Tab", "Moves through the toolbar, the scroll region, the header checkbox, each sort header, then each row’s checkbox and status control"],
        ["Enter, Space", "On a sort header, sorts by that column or reverses it"],
        ["Space", "On a checkbox, picks or clears the row"],
        ["Arrow keys", "With the scroll region focused, scroll the table sideways and down"],
        ["Enter", "On the record link, opens the record"],
      ]}
    />
  );
}

function A11yNames() {
  return (
    <div className="prose">
      <ul className="dodont">
        <Do>Name the table, and the scroll region around it, so the region can take focus and announce what it holds.</Do>
        <Do>Use <T>th scope="col"</T> and set <T>aria-sort</T> on the sorted header only.</Do>
        <Do>Put the sort control in a button inside the header cell so it is reachable and announced as a button.</Do>
        <Do>Name every checkbox with its record: <T>Select ZWSE-26-0415</T>. Name the header box <T>Select every report on this page</T>.</Do>
        <Do>Give yes or no glyphs <T>role="img"</T> and a name. Give the selection bar <T>role="region"</T> and a name.</Do>
        <Do>Render the record number as a link to the record. A row click is a pointer shortcut, not the only route.</Do>
        <Dont>Rely on hover or color alone to show a picked row. The checkbox state carries it.</Dont>
      </ul>
    </div>
  );
}

function A11yContrast() {
  return (
    <Table
      head={["Pair", "Ratio", "Requirement"]}
      rows={[
        [<><T>--fg</T> header on <T>--muted</T></>, "11.1:1", "4.5:1 text"],
        [<><T>--fg-2</T> cell on white</>, "8.4:1", "4.5:1 text"],
        [<><T>--fg-2</T> on <T>--row-hover</T></>, "7.6:1", "4.5:1 text"],
        [<><T>--fg-2</T> on picked <T>--primary-50</T></>, "7.4:1", "4.5:1 text"],
        [<><T>--navy-active</T> record number on white</>, "6.6:1", "4.5:1 text"],
        [<><T>--fg-4</T> Null on white</>, "4.7:1", "4.5:1 text"],
        [<><T>--primary-700</T> count on <T>--primary-50</T></>, "11.1:1", "4.5:1 text"],
        [<><T>--icon-quiet</T> sort icon on <T>--muted</T></>, "2.9:1", "Below 3:1. The label and aria-sort carry the meaning"],
        [<><T>--border-input</T> checkbox edge on white</>, "1.5:1", "Below 3:1 non-text. Known gap"],
        ["Focus ring on white", "9.6:1", "3:1 non-text"],
      ]}
    />
  );
}

export const table: ComponentContent = {
  lead: "A register of records you scan, sort, select, and export. Service Report is the reference for every table.",
  art: TableArt,
  usage: [
    { id: "overview", title: "Overview", body: <Overview /> },
    { id: "when-to-use", title: "When to use", body: <WhenToUse /> },
    { id: "anatomy", title: "Anatomy", body: <Anatomy /> },
    { id: "variants", title: "Variants", body: <Variants /> },
    { id: "behavior", title: "Behavior and states", body: <Behavior /> },
    {
      id: "related",
      title: "Related",
      body: <p className="prose-p">Card for records that need several actions each; Status pill for the status cell; Button for the toolbar and selection bar actions.</p>,
      more: { href: "/components/card", label: "Card" },
    },
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
