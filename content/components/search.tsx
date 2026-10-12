import { Example } from "@/components/demo/Example";
import { SpecSheet } from "@/components/demo/SpecSheet";
import { ScreenWidths, WEB_SCREENS } from "@/components/demo/ScreenWidths";
import { SearchArt } from "@/components/art/search";
import { Code, Do, Dont, T, Table } from "../dev-kit";
import { SIcon, ScopedSearchDemo, SearchRecommendationsDemo } from "./search.demo";
import type { ComponentContent } from "./types";

/* ---------------------------------------------------------------------------
   Search — facts from DESIGN_SYSTEM.md › Text fields and selects, › Component
   equivalence, › Service Schedule list workspace; styles.css (.fsm-search*,
   .search-recommendations, .search-rec-*, .tbs-list-fields); search-ui.js
   (fsmSearchTray, keyboard); sr/sr-list.js, dr/dr-list.js and script.js
   (list composer, field scope); FSM-Mobile MOBILE_DESIGN_NOTES.md › Inline
   search.
   --------------------------------------------------------------------------- */

const HTML_TRIGGER = `
<div class="fsm-search">
  <button type="button" class="fsm-search-trigger" aria-expanded="false">
    <svg class="fsm-search-lucide" width="16" height="16">…</svg>
    <span>Search service reports…</span>
  </button>
</div>
`;

const HTML_COMPOSER = `
<div class="fsm-search searching">
  <div class="fsm-search-composer" role="search" aria-label="Search service reports">
    <span class="fsm-search-input">
      <svg class="fsm-search-lucide" width="16" height="16">…</svg>
      <input id="srQ" placeholder="Search service reports…" autocomplete="off"
        role="combobox" aria-label="Search service reports"
        aria-autocomplete="list" aria-expanded="true" aria-controls="srSearchSuggestions">
      <button type="button" class="fsm-search-clear" aria-label="Clear search">…</button>
    </span>
    <button type="button" class="fsm-search-done" aria-label="Finish searching">… <span>Done</span></button>

    <div class="search-recommendations fsm-search-results">
      <div class="fsm-search-meta"><b>On-key service report search</b><span><strong>128</strong>reports in this view</span></div>
      <div class="search-rec-head" id="srSearchHead">Recommended service reports</div>
      <div role="listbox" id="srSearchSuggestions" aria-labelledby="srSearchHead">
        <button type="button" class="search-rec-row" role="option" aria-selected="false">
          <span class="search-rec-icon">…</span>
          <span class="search-rec-copy"><b>ZWSE-26-0415 · Biological Safety Cabinet</b><small>Aurora Dynamics · 4 Aug 2026 · 09:00–11:30</small></span>
          <span class="search-rec-state">Open</span>
          <svg class="fsm-search-lucide" width="14" height="14">…</svg>
        </button>
        <!-- at most six rows -->
      </div>
      <!-- when nothing matches, instead of rows: -->
      <div class="search-rec-empty">No matching service reports. Try a report number, company, model, or serial number.</div>
    </div>
  </div>
</div>
`;

const HTML_SCOPED = `
<div class="fsm-search searching">
  <div class="fsm-search-composer list-search-composer" role="search" aria-label="Search schedule list">
    <button type="button" class="tbs-list-fields" aria-haspopup="menu" aria-expanded="false"
      aria-label="Search fields: All fields">
      <span>All fields</span> …
    </button>
    <span class="tbs-input fsm-search-input">
      <svg class="fsm-search-lucide" width="16" height="16">…</svg>
      <input placeholder="Search schedules…" role="combobox" aria-label="Search schedules" …>
    </span>
    <button type="button" class="fsm-search-done" aria-label="Finish searching">… <span>Done</span></button>
  </div>
</div>
`;

/* ---- usage ---------------------------------------------------------------- */

function Overview() {
  return (
    <div className="prose">
      <p>
        Search finds records in a register. It opens from one trigger in the module toolbar. As soon as it opens, a panel
        attached under the field recommends up to six records. Typing turns those recommendations into matches.
      </p>
      <Example
        title="Search with recommendations"
        description="Type a report number or company. Use Up and Down, then Enter. Escape or Done closes it."
        layout="none"
        bg="white"
        minHeight={560}
        code={{ lang: "HTML", code: HTML_COMPOSER }}
      >
        <SearchRecommendationsDemo />
      </Example>
    </div>
  );
}

function WhenToUse() {
  return (
    <div className="prose">
      <ul className="dodont">
        <Do>Use the shared recommendation pattern for every dataset search.</Do>
        <Do>Show each result’s identity, useful context, and state, so the right record is clear before opening it.</Do>
        <Do>Keep one search entry point per module, in the toolbar.</Do>
        <Do>Add a field scope before the input when a register needs field-scoped search. Default it to <T>All fields</T>.</Do>
        <Dont>Add a second search field below the content, or a module-prefixed copy of the recommendation panel.</Dont>
        <Dont>Show more than six recommendations. Let the register below show the full result set.</Dont>
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
          ["Trigger", <T>.fsm-search-trigger</T>, "Collapsed state. Search icon and the placeholder as its label"],
          ["Composer", <T>.fsm-search-composer</T>, <>Open state, <T>role="search"</T> with a name</>],
          ["Leading icon", <T>.fsm-search-lucide</T>, "Search icon, 16px"],
          ["Input", <T>.fsm-search-input input</T>, "Takes focus on open"],
          ["Clear", <T>.fsm-search-clear</T>, "Inside the right edge, only when there is a query"],
          ["Filter (optional)", <T>.fsm-search-filter</T>, "Opens result filters. Shows a count when filters are on"],
          ["Done", <T>.fsm-search-done</T>, "Closes search and clears the query"],
          ["Recommendations", <T>.search-recommendations</T>, "Attached directly under the field"],
          ["Context row", <T>.fsm-search-meta</T>, "Optional. Search scope and the number of records in view"],
          ["Heading", <T>.search-rec-head</T>, "Names what the rows are"],
          ["Row", <T>.search-rec-row</T>, "Icon, identity, context line, state, chevron"],
          ["Empty state", <T>.search-rec-empty</T>, "Says nothing matched and what to try"],
        ]}
      />
    </div>
  );
}

function Variants() {
  return (
    <div className="prose">
      <Example title="Collapsed trigger" description="How search rests in the toolbar." layout="row" bg="white" code={{ lang: "HTML", code: HTML_TRIGGER }}>
        <div className="fsm-search">
          <button type="button" className="fsm-search-trigger" aria-expanded="false">
            <SIcon n="search" />
            <span>Search service reports…</span>
          </button>
        </div>
      </Example>
      <Example
        title="Field scope and search"
        description="One compound control. The picked fields narrow both the results and the recommendations."
        layout="none"
        bg="white"
        minHeight={520}
        code={{ lang: "HTML", code: HTML_SCOPED }}
      >
        <ScopedSearchDemo />
      </Example>
    </div>
  );
}

function Behavior() {
  return (
    <div className="prose">
      <Example title="Empty state" description="An explicit message, never a blank panel." layout="none" bg="white" minHeight={260}>
        <div className="fsm-search searching" style={{ maxWidth: 640 }}>
          <div className="fsm-search-composer" role="search" aria-label="Search service reports">
            <span className="fsm-search-input">
              <SIcon n="search" />
              <input
                defaultValue="ZWSE-99"
                role="combobox"
                aria-label="Search service reports"
                aria-autocomplete="list"
                aria-expanded="true"
                aria-controls="search-empty-list"
                autoComplete="off"
              />
              <button type="button" className="fsm-search-clear" aria-label="Clear search">
                <SIcon n="x" s={14} />
              </button>
            </span>
            <button type="button" className="fsm-search-done" aria-label="Finish searching">
              <SIcon n="x" s={14} />
              <span>Done</span>
            </button>
            <div className="search-recommendations fsm-search-results">
              <div className="search-rec-head">Recommended service reports</div>
              <div role="listbox" id="search-empty-list" aria-label="Recommended service reports" />
              <div className="search-rec-empty">No matching service reports. Try a report number, company, model, or serial number.</div>
            </div>
          </div>
        </div>
      </Example>
      <ul className="dev-notes">
        <li>Opening search focuses the input and shows recommendations straight away. No typing is needed first.</li>
        <li>Each keystroke filters the register and the recommendations together. At most six rows show.</li>
        <li>Down moves into the results; Up from the first row returns to the input. Enter opens the highlighted record.</li>
        <li>Escape and Done close search, clear the query, and return the toolbar to its resting state.</li>
        <li>The field scope keeps the query when fields change. At least one field stays selected.</li>
        <li>Below 640px the panel pins under the header, 16px from each edge, at most 55% of the viewport tall.</li>
        <li>
          On mobile, search expands inside the header, and suggestions push content down rather than float over it. Six
          suggestions at most; Enter opens the first match; Escape or Cancel closes and restores focus.
        </li>
        <li>Open and close animate in 160ms. Reduced motion removes the transition.</li>
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
      <SpecSheet title="Search trigger" description="How search rests in the toolbar. Fixed width." targets={[{ sel: ".fsm-search-trigger", name: "Search trigger", width: "fixed" }]}>
        <div className="fsm-search" style={{ margin: 0 }}>
          <button type="button" className="fsm-search-trigger" aria-expanded="false">
            <SIcon n="search" />
            <span>Search service reports…</span>
          </button>
        </div>
      </SpecSheet>
      <SpecSheet
        title="Search field, open"
        description="The field fills the search area, up to 640 px."
        scale={1}
        targets={[
          { sel: ".fsm-search-composer", name: "Search field, open", width: "fill" },
          { sel: ".fsm-search-clear", name: "Clear button", width: "fixed" },
          { sel: ".fsm-search-done", name: "Done button" },
        ]}
      >
        <div style={{ width: 560 }}>
          <div className="fsm-search searching" style={{ margin: 0 }}>
            <div className="fsm-search-composer" role="search" aria-label="Search service reports">
              <span className="fsm-search-input">
                <SIcon n="search" />
                <input defaultValue="ZWSE-26" aria-label="Search service reports" autoComplete="off" />
                <button type="button" className="fsm-search-clear" aria-label="Clear search">
                  <SIcon n="x" s={14} />
                </button>
              </span>
              <button type="button" className="fsm-search-done" aria-label="Finish searching">
                <SIcon n="x" s={14} />
                <span>Done</span>
              </button>
            </div>
          </div>
        </div>
      </SpecSheet>
      <SpecSheet
        title="Recommendations panel"
        description="Attached under the field, as wide as the field. Shown here in place so it can be measured."
        scale={1}
        targets={[
          { sel: ".search-recommendations", name: "Recommendations panel", width: "fill" },
          { sel: ".search-rec-head", name: "Panel heading", width: "fill" },
          { sel: ".search-rec-row", name: "Result row", width: "fill" },
          { sel: ".search-rec-icon", name: "Row icon tile", width: "fixed" },
        ]}
      >
        <div style={{ width: 560, position: "relative" }}>
          <div className="search-recommendations fsm-search-results" style={{ position: "static" }}>
            <div className="search-rec-head">Recommended service reports</div>
            <div role="listbox" aria-label="Recommended service reports">
              {[
                ["ZWSE-26-0415 · Biological Safety Cabinet", "Aurora Dynamics · 4 Aug 2026 · 09:00–11:30", "Open"],
                ["ZWSE-26-0413 · ULT Freezer", "Pacific Genome Centre · 20 May 2026 · 08:30–10:00", "Follow-up ongoing"],
              ].map(([t, m, st]) => (
                <button key={t} type="button" className="search-rec-row" role="option" aria-selected="false">
                  <span className="search-rec-icon">
                    <SIcon n="fileText" s={15} />
                  </span>
                  <span className="search-rec-copy">
                    <b>{t}</b>
                    <small>{m}</small>
                  </span>
                  <span className="search-rec-state">{st}</span>
                  <SIcon n="chevronRight" s={14} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </SpecSheet>
      <SpecSheet title="Field scope" description="Sits directly before the input, inside the same field." scale={1} targets={[{ sel: ".tbs-list-fields", name: "Field scope button" }]}>
        <div style={{ width: 560 }}>
          <div className="fsm-search searching" style={{ margin: 0 }}>
            <div className="fsm-search-composer list-search-composer" role="search" aria-label="Search schedule list">
              <button type="button" className="tbs-list-fields" aria-haspopup="menu" aria-expanded="false" aria-label="Search fields: All fields">
                <span>All fields</span>
                <SIcon n="chevronDown" s={12} />
              </button>
              <span className="tbs-input fsm-search-input">
                <SIcon n="search" />
                <input placeholder="Search schedules…" aria-label="Search schedules" autoComplete="off" />
              </span>
            </div>
          </div>
        </div>
      </SpecSheet>
    </div>
  );
}

function Screens() {
  return (
    <ScreenWidths
      rows={[
        { screen: "desktop", width: WEB_SCREENS.desktop, same: true },
        { screen: "laptop", width: WEB_SCREENS.laptop, change: "Search takes the whole toolbar row. The trigger fills the width, and the trigger and field grow to 44 px tall. The panel is the screen width minus 32 px, up to 680 px." },
        { screen: "tablet", width: WEB_SCREENS.tablet, change: "As on a small laptop: full row, 44 px tall." },
        { screen: "phone", width: WEB_SCREENS.phone, change: "Done shows only its icon and is 44 px wide. The panel pins below the header, 16 px from each side, at most 55% of the screen tall." },
        { screen: "mobile-app", width: WEB_SCREENS.app, change: "Search opens inside the header. Up to six suggestions push the content down instead of floating over it. Each row is at least 52 px tall." },
      ]}
    />
  );
}

function StyleColor() {
  return (
    <Table
      head={["Part", "Rest", "Hover", "Focus or selected"]}
      rows={[
        ["Trigger", <>White, border <T>--border-input</T>, text <T>--fg-3</T></>, <><T>--muted</T>, border <T>--border-hover</T></>, <>Border <T>--primary</T>, 1px <T>--primary-100</T> ring</>],
        ["Composer", <>White, border <T>--border-input</T></>, "—", <>Border <T>--primary</T>, 1px <T>--primary-100</T> ring</>],
        ["Query text", <T>--fg</T>, "—", "—"],
        ["Placeholder", <T>--fg-4</T>, "—", "—"],
        ["Clear and filter", <T>--fg-3</T>, <><T>--muted</T>, icon <T>--primary</T></>, <>Filter on: <T>--primary-50</T>, <T>--primary</T></>],
        ["Done", <>Text <T>--primary</T>, divider <T>--border</T></>, <T>--primary-50</T>, "—"],
        ["Panel", <>White, border <T>--border</T>, <T>--shadow-lg</T></>, "—", "—"],
        ["Context row", <><T>--surface-2</T>, text <T>--fg-3</T>, kicker <T>--primary</T></>, "—", "—"],
        ["Row", <>Title <T>--fg</T>, context and state <T>--fg-3</T></>, <T>--row-hover</T>, <>Highlighted: <T>--row-hover</T></>],
        ["Row icon", <><T>--primary</T> on <T>--primary-50</T></>, "—", "—"],
        ["Empty state", <T>--fg-3</T>, "—", "—"],
      ]}
    />
  );
}

function StyleSpec() {
  return (
    <Table
      head={["Property", "Value"]}
      rows={[
        ["Trigger", <>240 wide, <T>--h-md</T> 36 high, <T>--fs-sub</T> 12.5</>],
        ["Composer", <><T>--h-lg</T> 40 high, up to 640 wide, radius <T>--radius-field</T> 8</>],
        ["Query", <><T>--fs-body</T> 13.5</>],
        ["Icons", "Search 16, clear and Done 14, row chevron 14, row icon 15; stroke 1.75"],
        ["Clear", <><T>--h-sm</T> 32 square, radius <T>--radius-control</T> 6</>],
        ["Filter", <><T>--h-md</T> 36 square</>],
        ["Done", <>Min width 76, <T>--fs-sub</T> 12.5 · 600</>],
        ["Field scope", <>Min width 112, label 12 · 500, divider on the right</>],
        ["Panel", <><T>--sp-2</T> 8 below the field, full field width, radius <T>--radius-card</T> 10</>],
        ["Context row and heading", <><T>--h-lg</T> 40 high, padding 0 16</>],
        ["Row", "Min 54 high; columns 30 icon · text · state · 16 chevron; gap 9"],
        ["Row text", <>Title <T>--fs-sub</T> 12.5 · 600, context and state <T>--fs-help</T> 11.5, one line each</>],
        ["Empty state", <>Min 92 high, <T>--fs-sub</T> 12.5, centered</>],
        ["Motion", "160ms ease-out"],
        ["Mobile suggestion row", "Min 52 high"],
      ]}
    />
  );
}

/* ---- code ----------------------------------------------------------------- */

function CodeWeb() {
  return (
    <div className="prose">
      <Code title="HTML" lang="html">{HTML_COMPOSER}</Code>
      <Code title="JavaScript (search-ui.js)" lang="js">{`
// One tray renderer for every module: at most six rows, head, empty state.
fsmSearchTray({
  id: 'srSearchSuggestions',
  kicker: 'On-key service report search',
  count: srList().length,
  countLabel: 'reports in this view',
  heading: 'Recommended service reports',
  empty: 'No matching service reports. Try a report number, company, model, or serial number.',
  items: suggestions.map((r) => ({ title, meta, state, action })),
});

// Keyboard: input → fsmSearchInputKey, rows → fsmSearchOptionKey
`}</Code>
      <Code title="React" lang="tsx">{`
import { Search } from "@/components/ui/Search";

<Search
  label="Search service reports"
  query={q}
  onQueryChange={setQ}
  heading="Recommended service reports"
  empty="No matching service reports. Try a report number, company, model, or serial number."
  results={reports.slice(0, 6).map((r) => ({ id: r.id, title: \`\${r.no} · \${r.cat}\`, meta: r.when, state: r.status }))}
  onPick={(r) => router.push(\`/reports/\${r.id}\`)}
  onDone={() => setSearching(false)}
/>
`}</Code>
      <Table
        head={["Prop", "Type", "Notes"]}
        rows={[
          [<T>label</T>, <T>string</T>, "Accessible name and placeholder"],
          [<T>query</T>, <T>string</T>, "Controlled query"],
          [<T>results</T>, <T>{"{ id, title, meta, state }[]"}</T>, "Sliced to six"],
          [<T>heading</T>, <T>string</T>, "Panel heading"],
          [<T>empty</T>, <T>string</T>, "Empty state text: what to try"],
          [<T>scope</T>, <T>string[]</T>, "Optional field scope. Empty means all fields"],
          [<T>onPick</T>, <T>{"(result) => void"}</T>, "Opens the record"],
          [<T>onDone</T>, <T>{"() => void"}</T>, "Escape or Done"],
        ]}
      />
    </div>
  );
}

function CodeFlutter() {
  return (
    <Code title="Flutter" lang="dart">{`
// One stable TextField and FocusNode; suggestions in flow, not an overlay.
Column(children: [
  TextField(
    controller: query,
    focusNode: searchFocus,
    textInputAction: TextInputAction.search,
    decoration: const InputDecoration(
      hintText: 'Search',
      prefixIcon: Icon(Icons.search),
    ),
    onSubmitted: (_) { if (results.isNotEmpty) open(results.first); },
  ),
  SizeTransition(
    sizeFactor: reveal,   // skip when MediaQuery.disableAnimations
    child: results.isEmpty
        ? const Padding(padding: EdgeInsets.all(EscoSpace.s16), child: Text('No matches'))
        : Column(children: [
            for (final r in results.take(6))
              ListTile(
                minTileHeight: 52,
                title: Text(r.title),
                subtitle: Text(r.meta),
                trailing: Text(r.state),
                onTap: () => open(r),
              ),
          ]),
  ),
]);
`}</Code>
  );
}

function CodeIos() {
  return (
    <Code title="SwiftUI" lang="swift">{`
NavigationStack {
    List(reports) { r in NavigationLink(r.title, value: r) }
        .searchable(text: $query, prompt: "Search service reports")
        .searchSuggestions {
            ForEach(matches.prefix(6)) { r in
                VStack(alignment: .leading) {
                    Text(r.title).font(.escoBody)
                    Text(r.meta).font(.escoMeta).foregroundStyle(Color.escoTextSecondary)
                }
                .searchCompletion(r.no)
            }
        }
        .overlay {
            if matches.isEmpty && !query.isEmpty {
                ContentUnavailableView.search(text: query)
            }
        }
}
`}</Code>
  );
}

/* ---- accessibility -------------------------------------------------------- */

function A11yKeyboard() {
  return (
    <Table
      head={["Key", "Action"]}
      rows={[
        ["Enter, Space on the trigger", "Opens search with focus in the input"],
        ["Typing", "Filters the register and the recommendations"],
        ["Down", "Highlights the next result. Wraps to the first"],
        ["Up", "Highlights the previous result. From the first, returns to the input"],
        ["Enter", "Opens the highlighted record"],
        ["Escape", "Closes search, like Done"],
        ["Tab", "Moves to clear, filter or field scope, then Done"],
      ]}
    />
  );
}

function A11yNames() {
  return (
    <div className="prose">
      <ul className="dodont">
        <Do>Wrap the composer in <T>role="search"</T> with a name such as <T>Search service reports</T>.</Do>
        <Do>Give the input <T>role="combobox"</T>, <T>aria-expanded</T>, and <T>aria-controls</T> pointing at the <T>listbox</T>.</Do>
        <Do>Mark rows as <T>option</T>. Track the highlighted one with <T>aria-selected</T> and <T>aria-activedescendant</T>.</Do>
        <Do>Name icon-only buttons: <T>Clear search</T>, <T>Finish searching</T>, <T>Filters, 2 active</T>.</Do>
        <Do>Announce the result count, and the empty state, through a polite live region.</Do>
        <Dont>Rely on the tinted row alone to show the highlight. The state comes from <T>aria-selected</T>.</Dont>
      </ul>
    </div>
  );
}

function A11yContrast() {
  return (
    <Table
      head={["Pair", "Ratio", "Requirement"]}
      rows={[
        [<><T>--fg</T> title on <T>--row-hover</T></>, "10.4:1", "4.5:1 text"],
        [<><T>--fg-3</T> context on <T>--row-hover</T></>, "5.6:1", "4.5:1 text"],
        [<><T>--fg-3</T> trigger text on white</>, "6.2:1", "4.5:1 text"],
        [<><T>--fg-4</T> placeholder on white</>, "4.7:1", "4.5:1 text"],
        [<><T>--primary</T> Done on white</>, "9.6:1", "4.5:1 text"],
        [<><T>--border-input</T> edge on white</>, "1.5:1", "Below 3:1. The icon and placeholder identify the field"],
        ["Focus: 1px primary border on white", "9.6:1", "3:1 non-text"],
      ]}
    />
  );
}

export const search: ComponentContent = {
  lead: "Finds records in a register, with up to six recommendations attached under the field.",
  art: SearchArt,
  usage: [
    { id: "overview", title: "Overview", body: <Overview /> },
    { id: "when-to-use", title: "When to use", body: <WhenToUse /> },
    { id: "anatomy", title: "Anatomy", body: <Anatomy /> },
    { id: "variants", title: "Variants", body: <Variants /> },
    { id: "behavior", title: "Behavior and states", body: <Behavior /> },
    { id: "related", title: "Related", body: <p className="prose-p">Text field for typed values; Select and the entity picker for choosing a scope; Date picker for the range a register shows.</p>, more: { href: "/components/select", label: "Select" } },
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
