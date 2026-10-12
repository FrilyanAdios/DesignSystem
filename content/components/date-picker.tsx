import { Example } from "@/components/demo/Example";
import { Ic } from "@/components/demo/Ic";
import { SpecSheet } from "@/components/demo/SpecSheet";
import { ScreenWidths, WEB_SCREENS } from "@/components/demo/ScreenWidths";
import { DatePickerArt } from "@/components/art/date-picker";
import { Code, Do, Dont, T, Table } from "../dev-kit";
import { DateRangeDemo, MonthPickerSheet } from "./date-picker.demo";
import type { ComponentContent } from "./types";

/* ---------------------------------------------------------------------------
   Date picker — facts from DESIGN_SYSTEM.md › Service Schedule search and
   report toolbar and › Service Schedule overlays and date pickers;
   styles.css (.dpill, .dp-*, .mcal-*, .mcd*, .mc-dd*, .report-range-actions);
   calendar.js (month grid, keyboard, month panel, status filter, footer);
   script.js (flexibleRangeControl, renderReportRangePicker);
   FSM-Mobile COMPONENT_SYSTEM.md › Day bar and css/calendar-system.css.
   --------------------------------------------------------------------------- */

const HTML_RANGE = `
<div class="dpill flexible-range" role="group" aria-label="List date range">
  <button type="button" class="dp-nav" aria-label="Previous range"><!-- ic('cleft', 15) --></button>
  <button type="button" class="dp-gran" aria-haspopup="menu">Week <!-- ic('down', 11) --></button>
  <button type="button" class="dp-range" aria-haspopup="dialog" aria-expanded="false">5 Oct – 18 Oct 2026 · Wk 41–42</button>
  <button type="button" class="dp-nav" aria-label="Next range"><!-- ic('cright', 15) --></button>
</div>
`;

const HTML_PERIOD = `
<!-- List search mode drops the range-length menu: prev · range · next -->
<div class="dpill flexible-range" role="group" aria-label="List date range">
  <button type="button" class="dp-nav" aria-label="Previous range">…</button>
  <button type="button" class="dp-range" aria-haspopup="dialog">5 Oct – 18 Oct 2026 · Wk 41–42</button>
  <button type="button" class="dp-nav" aria-label="Next range">…</button>
</div>
`;

const HTML_PICKER = `
<div class="menu rangepick mcal-pop" role="dialog" aria-label="Choose list date range">
  <div class="mcal-head">
    <button type="button" class="sp-icn" aria-label="Previous month">…</button>
    <button type="button" class="mcal-title" aria-expanded="false"
      aria-label="Choose month and year, currently October 2026"><b>October</b><span>2026</span>…</button>
    <button type="button" class="sp-icn" aria-label="Next month">…</button>
  </div>
  <div class="mcal-presets" role="group" aria-label="Range presets">
    <button type="button" class="mcal-preset on" aria-pressed="true">Current cycle</button>
    <button type="button" class="mcal-preset" aria-pressed="false">This month</button>
    <button type="button" class="mcal-preset" aria-pressed="false">Last 30 days</button>
  </div>
  <div class="mc-dd">
    <button type="button" class="selbox mc-ddbtn" aria-haspopup="menu" aria-expanded="false">
      <i class="mc-status-swatch all"></i><span class="lbl">All statuses</span><b class="mc-ddn">84 schedules</b>…
    </button>
  </div>
  <div class="mcal" role="grid" aria-label="October 2026">
    <div class="mcal-row mcal-headrow" role="row">
      <span class="mcal-wk" role="columnheader" title="ISO week number">Wk</span>
      <span class="mcal-dow" role="columnheader" title="Monday">Mon</span> …
    </div>
    <div class="mcal-row" role="row">
      <span class="mcal-wk" role="rowheader">41</span>
      <button type="button" class="mcd on" role="gridcell" tabindex="0"
        aria-label="Monday, October 5 2026, selected, 3 schedules, Confirmed: 2, Tentative: 1">
        <span class="mcd-n">5</span>
        <span class="mcd-load" aria-hidden="true"><span class="mcd-fill" style="width:64%">
          <i class="mcd-seg open" style="flex:2"></i><i class="mcd-seg tentative" style="flex:1"></i>
        </span></span>
      </button> …
    </div>
  </div>
  <div class="mcal-foot">
    <span class="mcal-foot-main"><b>5 Oct – 18 Oct 2026</b><span>14 days</span></span>
    <span class="mcal-foot-n">42 in range</span>
  </div>
  <div class="report-range-actions">
    <button type="button" class="btn btn-sm btn-ghost">Reset</button>
    <button type="button" class="btn btn-sm btn-primary">Apply range</button>
  </div>
</div>
`;

const HTML_DAYBAR = `
<!-- FSM-Mobile: js/calendar-system.js, css/calendar-system.css -->
<div class="calendar-block fsm-calendar" data-calendar="schedules">
  <div class="fsm-daybar">
    <button class="fsm-daybar-step ripple" aria-label="Previous day">…</button>
    <button class="fsm-daybar-label ripple" id="schedulesWeekLabel" aria-haspopup="dialog">…</button>
    <button class="fsm-daybar-step ripple" aria-label="Next day">…</button>
  </div>
  <!-- optional two-week strip -->
  <div class="fsm-daystrip" id="schedulesWeekStrip" role="group" aria-label="Select a day"></div>
</div>
`;

/* ---- usage ---------------------------------------------------------------- */

function Overview() {
  return (
    <div className="prose">
      <p>
        The date range control answers “which slice of time am I looking at”. It is one composed control: previous, range
        length, the range with ISO week numbers, next. Selecting the range opens the shared month picker, where the user
        picks a start and an end, then applies them together.
      </p>
      <Example
        title="Date range with month picker"
        description="Step with the arrows, change the length, or open the range to pick dates. Schedule counts are sample data."
        layout="none"
        bg="white"
        minHeight={700}
        code={{ lang: "HTML", code: HTML_RANGE }}
      >
        <DateRangeDemo startOpen />
      </Example>
    </div>
  );
}

function WhenToUse() {
  return (
    <div className="prose">
      <ul className="dodont">
        <Do>Use the range control in List and Reports, where the range can be any start and end, longer or shorter than two weeks.</Do>
        <Do>Use the same pill in Calendar, where the range is a fixed two-week cycle.</Do>
        <Do>Reuse the one month picker everywhere: same width, header, status selector, week numbers, workload bars, and summary.</Do>
        <Do>Default the range to the current cycle.</Do>
        <Dont>Split previous, length, range, and next into separate toolbar groups.</Dont>
        <Dont>Open a popover from inside the picker. The month and year panel replaces the grid in place.</Dont>
        <Dont>Recreate the footer buttons. Use the shared <T>.btn</T> variants.</Dont>
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
          ["Pill", <T>.dpill</T>, <>One bordered control, <T>role="group"</T> with a name</>],
          ["Previous, next", <T>.dp-nav</T>, "Step back or forward by the current range length"],
          ["Range length", <T>.dp-gran</T>, <>Week (two weeks), 1 week, 4 weeks, or Custom. Opens a menu</>],
          ["Range", <T>.dp-range</T>, <>Formatted range plus ISO weeks, for example <T>5 Oct – 18 Oct 2026 · Wk 41–42</T>. Opens the month picker</>],
          ["Picker header", <T>.mcal-head</T>, "Previous month, month and year (opens the month panel), next month"],
          ["Presets", <T>.mcal-preset</T>, <><T>Current cycle</T>, <T>This month</T>, <T>Last 30 days</T>. They fill the draft, not apply it</>],
          ["Status selector", <T>.mc-ddbtn</T>, <><T>All statuses</T> plus a schedule count. Dims days without the chosen status</>],
          ["Month grid", <T>.mcal</T>, "Week number column, Monday first, one row per week"],
          ["Day", <T>.mcd</T>, "Date, then a workload bar sized to the busiest day and split by status"],
          ["Summary", <T>.mcal-foot</T>, "The chosen range, its length in days, and the schedules in range"],
          ["Actions", <T>.report-range-actions</T>, <><T>Reset</T> (tertiary) and <T>Apply range</T> (primary)</>],
        ]}
      />
      <Code title="Month picker · HTML" lang="html">{HTML_PICKER}</Code>
    </div>
  );
}

function Variants() {
  return (
    <div className="prose">
      <div className="examples two">
        <Example title="Range with length" description="List and Reports. Prev, length, range, next." layout="center" code={{ lang: "HTML", code: HTML_RANGE }}>
          <div className="dpill" role="group" aria-label="List date range">
            <button type="button" className="dp-nav" aria-label="Previous range">
              <Ic n="cleft" s={15} />
            </button>
            <button type="button" className="dp-gran" aria-haspopup="menu">
              Week
              <Ic n="down" s={11} />
            </button>
            <button type="button" className="dp-range" aria-haspopup="dialog">
              5 Oct – 18 Oct 2026 · Wk 41–42
            </button>
            <button type="button" className="dp-nav" aria-label="Next range">
              <Ic n="cright" s={15} />
            </button>
          </div>
        </Example>
        <Example title="Period only" description="List search mode. Prev, range, next." layout="center" code={{ lang: "HTML", code: HTML_PERIOD }}>
          <div className="dpill" role="group" aria-label="List date range">
            <button type="button" className="dp-nav" aria-label="Previous range">
              <Ic n="cleft" s={15} />
            </button>
            <button type="button" className="dp-range" aria-haspopup="dialog">
              5 Oct – 18 Oct 2026 · Wk 41–42
            </button>
            <button type="button" className="dp-nav" aria-label="Next range">
              <Ic n="cright" s={15} />
            </button>
          </div>
        </Example>
      </div>
      <h3>Mobile day bar and month sheet</h3>
      <p>
        On mobile, the bar shows one day at a time: step back, the day, step forward. The day reads like{" "}
        <T>Monday, 31 Aug 2026</T>, adds a <T>Today</T> tag on today, and a dot when the day holds work. Tapping the day
        opens the month sheet, which marks the same days with the same dot. Schedules add a two-week strip under the bar;
        Coordinator View uses the bar alone.
      </p>
      <Code title="HTML · FSM-Mobile" lang="html">{HTML_DAYBAR}</Code>
      <Code title="JavaScript · FSM-Mobile" lang="js">{`
fsmRenderCalendarBar({ labelId, date, today, marks, markLabel });
fsmRenderCalendarStrip({ stripId, start, days, selected, today, marks, markLabel, onSelect });
fsmRenderCalendarMonth({ gridId, labelId, month, selected, today, marks, markLabel, onSelect });
`}</Code>
    </div>
  );
}

function Behavior() {
  return (
    <div className="prose">
      <ul className="dev-notes">
        <li>Previous and next move the whole range by its own length. Calendar keeps a fixed two-week viewing cycle.</li>
        <li>The trigger keeps an open state while its panel is up: the range tints, the length button fills.</li>
        <li>The first click in the grid sets the start, and the footer asks for the end. The second click sets the end; an earlier date swaps them.</li>
        <li>Nothing changes on the page until <T>Apply range</T>. It stays disabled until both dates are set. <T>Reset</T> returns the draft to the current cycle and keeps the picker open.</li>
        <li>The month title opens a 12-month panel with a year stepper in place of the grid.</li>
        <li>A selected day has a navy edge on a tint, never a navy fill, so it doesn’t read as a status. Days in between take the light tint.</li>
        <li>Today is a neutral hairline ring with a bold number. It is position, not selection.</li>
        <li>The status selector dims days without that status but keeps the month’s shape. The selected day never dims.</li>
        <li>Click outside or Escape closes the picker; focus returns to the range.</li>
        <li>On mobile, the month sheet is a bottom sheet with four exits: back chevron, drag down, backdrop tap, and Escape.</li>
        <li>In the mobile strip, the number carries the selection, not the cell. The strip re-anchors only when the day leaves it.</li>
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
        title="Date range control"
        description="One bordered control with four parts inside."
        targets={[
          { sel: ".dpill", name: "Date range control" },
          { sel: ".dp-nav", name: "Previous or next arrow", width: "fixed" },
          { sel: ".dp-gran", name: "Range length button" },
          { sel: ".dp-range", name: "Range button" },
        ]}
      >
        <div className="dpill" role="group" aria-label="List date range">
          <button type="button" className="dp-nav" aria-label="Previous range">
            <Ic n="cleft" s={15} />
          </button>
          <button type="button" className="dp-gran" aria-haspopup="menu">
            Week
            <Ic n="down" s={11} />
          </button>
          <button type="button" className="dp-range" aria-haspopup="dialog">
            5 Oct – 18 Oct 2026 · Wk 41–42
          </button>
          <button type="button" className="dp-nav" aria-label="Next range">
            <Ic n="cright" s={15} />
          </button>
        </div>
      </SpecSheet>
      <SpecSheet
        title="Month picker"
        description="The shared picker, shown in place. Schedule counts are sample data."
        scale={1}
        targets={[
          { sel: ".mcal-pop", name: "Month picker", width: "fixed" },
          { sel: ".mcal-preset", name: "Preset button", width: "fill" },
          { sel: ".mc-ddbtn", name: "Status selector", width: "fill" },
          { sel: ".mcd.on", name: "Selected day (start or end)", width: "fill" },
          { sel: ".mcd.inrange:not(.today)", name: "Day inside the range", width: "fill" },
          { sel: ".mcd:not(.on):not(.inrange)", name: "Day, resting", width: "fill" },
        ]}
      >
        <MonthPickerSheet />
      </SpecSheet>
    </div>
  );
}

function Screens() {
  return (
    <ScreenWidths
      rows={[
        { screen: "desktop", width: WEB_SCREENS.desktop, same: true },
        { screen: "laptop", width: WEB_SCREENS.laptop, change: "The range button is held between 170 and 190 px wide. Longer text ends with an ellipsis." },
        { screen: "tablet", width: WEB_SCREENS.tablet, change: "Below 700 px the range button is 140 to 150 px wide, and the month picker becomes the screen width minus 24 px." },
        { screen: "phone", width: WEB_SCREENS.phone, change: "The month picker is the screen width minus 24 px. Presets wrap, two per row." },
        { screen: "mobile-app", width: WEB_SCREENS.app, change: "A day bar replaces the range: step back, the day, step forward, 52 px tall. Tapping the day opens the month sheet from the bottom." },
      ]}
    />
  );
}

function StyleColor() {
  return (
    <Table
      head={["Part", "Rest", "Hover", "Open or selected"]}
      rows={[
        ["Pill", <>White, border <T>--border</T></>, <>Border <T>--border-hover</T></>, "—"],
        ["Previous, next", <T>--fg-2</T>, <><T>--muted</T>, icon <T>--primary</T></>, "—"],
        ["Range length", <><T>--primary</T> on <T>--primary-50</T></>, <T>--primary-75</T>, <>White on <T>--navy-active</T></>],
        ["Range", <T>--fg</T>, <><T>--muted</T>, text <T>--primary</T></>, <><T>--primary</T> on <T>--primary-50</T></>],
        ["Day", <T>--fg-2</T>, <T>--muted-2</T>, <><T>--row-sel</T>, 1.5px <T>--primary</T> edge, <T>--primary</T> text</>],
        ["Day in range", <T>--primary-50</T>, <T>--row-sel-hover</T>, "—"],
        ["Today", <>1px <T>--border-hover</T> ring, bold <T>--fg</T></>, "—", "—"],
        ["Week numbers, weekdays", <T>--fg-4</T>, "—", "—"],
        ["Workload segments", <><T>--issued-fg</T> Confirmed, <T>--tentative-border</T> Tentative, <T>--approved-fg</T> Closed, <T>--rejected-fg</T> Cancelled, <T>--pending-fg</T> Rescheduled</>, "—", "—"],
        ["Mobile day bar", <>Border <T>--outline</T>, arrows <T>--esco-blue</T>, label <T>--on-surface</T></>, <T>--esco-tint</T>, <>Today tag <T>--esco-blue</T> on <T>--esco-tint</T></>],
        ["Mobile day", <T>--on-surface</T>, <T>--esco-tint</T>, <>White on <T>--esco-blue</T>; today ring <T>--esco-blue</T></>],
      ]}
    />
  );
}

function StyleSpec() {
  return (
    <Table
      head={["Property", "Value"]}
      rows={[
        ["Pill", <><T>--h-md</T> 36 high, padding 0 3, gap 2, radius <T>--radius-field</T> 8</>],
        ["Previous, next", <>28 × <T>--h-xs</T> 28, radius <T>--radius-control</T> 6, icon 15</>],
        ["Range length", <><T>--h-xs</T> 28 high, 12.5 · 600, chevron 11</>],
        ["Range", <><T>--h-xs</T> 28 high, min width 150, 12.5 · 600</>],
        ["Picker", <>400 wide, padding 14, radius <T>--radius-card</T> 10, <T>--shadow-lg</T></>],
        ["Picker header", <>Month and arrow buttons <T>--h-sm</T> 32; month <T>--fs-section</T> 16 · 600, year 12.5</>],
        ["Presets, status selector", <><T>--h-sm</T> 32 high</>],
        ["Grid", "24 week column, 7 equal day columns, gap 2"],
        ["Day", <>Min 44 high, number <T>--fs-body</T> 13.5 · 500, workload bar 4 high</>],
        ["Month panel", <>3 columns, buttons <T>--h-lg</T> 40</>],
        ["Footer", <>Range 13.5 · 600, length 12.5; actions <T>.btn-sm</T> 32</>],
        ["Mobile day bar", "52 high, steps 48 wide, radius 12, label 15 · 600, icon 17"],
        ["Mobile strip day", "46 wide, number circle 34, dot 4"],
        ["Mobile month sheet", "Square day cells, label 15 · 500, dot 4, weekday 13"],
      ]}
    />
  );
}

/* ---- code ----------------------------------------------------------------- */

function CodeWeb() {
  return (
    <div className="prose">
      <Code title="HTML" lang="html">{HTML_RANGE}</Code>
      <Code title="React" lang="tsx">{`
import { DateRange } from "@/components/ui/DateRange";

<DateRange
  label="List date range"
  value={{ from: "2026-10-05", to: "2026-10-18" }}
  onChange={setRange}              // fires on Apply range, not on each click
  lengths={[14, 7, 28]}            // Week · 2 weeks, 1 week, 4 weeks
  defaultRange={currentCycle}      // Reset target
  workload={statusCountsByDay}     // drives the bars and the status selector
/>
`}</Code>
      <Table
        head={["Prop", "Type", "Notes"]}
        rows={[
          [<T>label</T>, <T>string</T>, "Group name, for example List date range"],
          [<T>value</T>, <T>{"{ from: string; to: string }"}</T>, "ISO dates"],
          [<T>onChange</T>, <T>{"(range) => void"}</T>, "Called on Apply range and on previous or next"],
          [<T>lengths</T>, <T>number[]</T>, "Range length menu. Omit for the period-only variant"],
          [<T>defaultRange</T>, <T>{"{ from; to }"}</T>, "The current cycle; Reset returns here"],
          [<T>workload</T>, <T>{"Record<string, Record<Status, number>>"}</T>, "Per-day schedule counts by status"],
        ]}
      />
    </div>
  );
}

function CodeFlutter() {
  return (
    <Code title="Flutter" lang="dart">{`
// Mobile day bar: step · day · step, 52 tall, 48-wide steps
Container(
  height: EscoSize.field,
  decoration: BoxDecoration(
    border: Border.all(color: Theme.of(context).colorScheme.outlineVariant),
    borderRadius: BorderRadius.circular(EscoRadius.control),
  ),
  child: Row(children: [
    IconButton(tooltip: 'Previous day', icon: const Icon(Icons.chevron_left), onPressed: () => step(-1)),
    Expanded(
      child: TextButton(
        onPressed: () => openMonthSheet(context),   // showModalBottomSheet
        child: Text(DateFormat('EEEE, d MMM y').format(day)),
      ),
    ),
    IconButton(tooltip: 'Next day', icon: const Icon(Icons.chevron_right), onPressed: () => step(1)),
  ]),
);

// Range on larger layouts: Material 3 date range picker
final range = await showDateRangePicker(
  context: context,
  firstDate: DateTime(2020),
  lastDate: DateTime(2030),
  initialDateRange: DateTimeRange(start: from, end: to),
  saveText: 'Apply range',
);
`}</Code>
  );
}

function CodeIos() {
  return (
    <Code title="SwiftUI" lang="swift">{`
// Mobile day bar
HStack(spacing: 0) {
    Button { step(-1) } label: { Image(systemName: "chevron.left").frame(width: EscoSize.touch) }
        .accessibilityLabel("Previous day")
    Divider()
    Button { showingMonth = true } label: {
        Text(day, format: .dateTime.weekday(.wide).day().month(.abbreviated).year())
            .font(.escoBody.weight(.semibold))
            .frame(maxWidth: .infinity)
    }
    Divider()
    Button { step(1) } label: { Image(systemName: "chevron.right").frame(width: EscoSize.touch) }
        .accessibilityLabel("Next day")
}
.frame(height: EscoSize.field)
.overlay(RoundedRectangle(cornerRadius: EscoRadius.control).stroke(Color.escoOutline))
.sheet(isPresented: $showingMonth) {
    DatePicker("Day", selection: $day, displayedComponents: .date)
        .datePickerStyle(.graphical)
        .tint(.escoPrimary)
        .presentationDetents([.medium])
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
        ["Tab", "Moves through previous, length, range, next. The month grid is a single tab stop"],
        ["Enter, Space on the range", "Opens the month picker"],
        ["Left, Right", "Previous or next day"],
        ["Up, Down", "Same day in the previous or next week"],
        ["Home, End", "First or last day of the week row"],
        ["Page Up, Page Down", "Previous or next month"],
        ["Arrow past the edge", "Moves into the neighbouring month"],
        ["Enter, Space on a day", "Sets the start, then the end"],
        ["Escape", "Closes the picker and returns focus to the range"],
      ]}
    />
  );
}

function A11yNames() {
  return (
    <div className="prose">
      <ul className="dodont">
        <Do>Name the pill with <T>role="group"</T> and a label such as <T>List date range</T>. Name the arrows <T>Previous range</T> and <T>Next range</T>.</Do>
        <Do>Give each day a full label: weekday, date, today, selected, and its schedule count by status.</Do>
        <Do>Mark today with <T>aria-current="date"</T>, and the week numbers as row headers.</Do>
        <Do>Name the workload in words. The colored bar is <T>aria-hidden</T>.</Do>
        <Do>On mobile, the day button announces that it opens a dialog with <T>aria-haspopup="dialog"</T>.</Do>
        <Dont>Show selection or status by color alone. The edge, the label text, and the footer summary carry it too.</Dont>
      </ul>
    </div>
  );
}

function A11yContrast() {
  return (
    <Table
      head={["Pair", "Ratio", "Requirement"]}
      rows={[
        [<><T>--fg</T> range on white</>, "11.6:1", "4.5:1 text"],
        [<><T>--primary</T> length on <T>--primary-50</T></>, "8.4:1", "4.5:1 text"],
        [<><T>--primary</T> selected day on <T>--row-sel</T></>, "8.4:1", "4.5:1 text"],
        [<><T>--fg-4</T> week numbers on white</>, "4.7:1", "4.5:1 text"],
        [<>Dimmed day (34% opacity)</>, "1.8:1", "Below 4.5:1. The full count stays in the day’s label"],
        [<><T>--border-hover</T> today ring on white</>, "1.5:1", "Below 3:1. Today also has a bold number and aria-current"],
        ["Focus ring on white", "9.6:1", "3:1 non-text"],
        [<>Mobile: white on <T>--esco-blue</T></>, "9.6:1", "4.5:1 text"],
      ]}
    />
  );
}

export const datePicker: ComponentContent = {
  lead: "Moves through dates as one composed range control, with a shared month picker for exact start and end dates.",
  art: DatePickerArt,
  usage: [
    { id: "overview", title: "Overview", body: <Overview /> },
    { id: "when-to-use", title: "When to use", body: <WhenToUse /> },
    { id: "anatomy", title: "Anatomy", body: <Anatomy /> },
    { id: "variants", title: "Variants", body: <Variants /> },
    { id: "behavior", title: "Behavior and states", body: <Behavior /> },
    { id: "related", title: "Related", body: <p className="prose-p">Text field for a single date in a form; Search, whose filter panel opens the same picker; Bottom sheet for the mobile month sheet.</p>, more: { href: "/components/text-field", label: "Text field" } },
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
