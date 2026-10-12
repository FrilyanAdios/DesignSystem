import { Example } from "@/components/demo/Example";
import { Ic } from "@/components/demo/Ic";
import { SpecSheet } from "@/components/demo/SpecSheet";
import { ScreenWidths, WEB_SCREENS } from "@/components/demo/ScreenWidths";
import { CardArt } from "@/components/art/card";
import { Code, Do, Dont, T, Table } from "../dev-kit";
import type { ComponentContent } from "./types";

/* ---------------------------------------------------------------------------
   Card — facts from DESIGN_SYSTEM.md › Cards and rows, Spacing, size, and
   shape; styles.css (.card, .ch, .jd-card + .report-rail-card, .wcard,
   .wq-flag); sr/sr-list.js › srRowCard (the record card); script.js ›
   renderQueue (the Work Order card); FSM-Mobile COMPONENT_SYSTEM.md › Card
   action, css/components.css, css/styles.css (.report).
   --------------------------------------------------------------------------- */

type Rec = { n: number; no: string; account: string; site: string; time: string; date: string; pill: string; label: string; po: string; svso: string; jobs: string };

const RECORDS: Rec[] = [
  { n: 1, no: "ZWSE-26-0415", account: "HOBERT TESTING QUICK ADD ACCOUNT", site: "Sample Street Sample Sample 1111", time: "09:00 to 11:30", date: "04 Aug 2026", pill: "open", label: "Open", po: "Not set", svso: "Not set", jobs: "1 work order · RCERT-01" },
  { n: 2, no: "ZWSE-26-0402", account: "Sample Account (For Test Report Demo)", site: "25 Ayer Rajah Crescent, Block B, Singapore 139947", time: "13:00 to 15:00", date: "24 Feb 2026", pill: "issued", label: "Follow-up ongoing", po: "PO-88120", svso: "SVSO-4401", jobs: "1 work order · RPM-01" },
  { n: 3, no: "ZWSE-25-0397", account: "ABC Company", site: "14 Harare Industrial Park, Harare, Zimbabwe", time: "10:00 to 12:00", date: "12 Dec 2025", pill: "open", label: "Open", po: "PO-88121", svso: "SVSO-4402", jobs: "1 work order · RCERT-01" },
];

function RecordCard({ r, on }: { r: Rec; on?: boolean }) {
  return (
    <article className={`jd-card report-rail-card${on ? " on" : ""}`}>
      <button type="button" className="jd-card-main" aria-current={on ? "true" : undefined}>
        <span className="jd-card-top">
          <span className="jd-card-n">{r.n}</span>
          <span className="jd-card-time">{r.time}</span>
          <span className={`pill b-${r.pill}`}>
            <span className="d" />
            {r.label}
          </span>
        </span>
        <span className="jd-card-cust">
          <Ic n="user" s={12} />
          <span>{r.account}</span>
        </span>
        <span className="jd-card-site" title={r.site}>
          <Ic n="pin" s={12} />
          <span>{r.site}</span>
        </span>
        <span className="jd-card-meta">
          PO#: {r.po} · SVSO#: {r.svso}
        </span>
        <span className="jd-card-meta">{r.jobs}</span>
        <span className="jd-card-meta report-rail-identity">
          {r.no} · {r.date}
        </span>
      </button>
    </article>
  );
}

function RecordList({ selected = 0 }: { selected?: number }) {
  return (
    <div style={{ width: 340 }}>
      {RECORDS.map((r, i) => (
        <RecordCard key={r.no} r={r} on={i === selected} />
      ))}
    </div>
  );
}

function WorkOrderCard({ wo, serial, model, category, sv, po, last, flag, flagLabel }: { wo: string; serial: string; model: string; category: string; sv: string; po: string; last: string; flag: string; flagLabel: string }) {
  return (
    <div className="wcard">
      <div className="wcard-top">
        <span className="drag" title="Drag to calendar">
          <Ic n="grip" s={14} />
        </span>
        <span className="wi">
          <Ic n="wo" s={13} />
        </span>
        <div className="wc-main">
          <div className="wcard-id">
            <span className="wn">{serial}</span>
            <span aria-hidden="true">·</span>
            <span className="wmodel">{model}</span>
          </div>
          <div className="wcategory">{category}</div>
          <div className="wcard-meta">
            <span>SV: {sv}</span>
            <span>PO: {po}</span>
            <span>Last: {last}</span>
          </div>
        </div>
        <button type="button" className="icon-btn wq-preview-trigger" aria-label={`Preview ${wo}`} aria-haspopup="dialog" aria-expanded="false">
          <Ic n="eye" s={14} />
        </button>
        <div className="wcard-flags">
          <button type="button" className={`wq-flag ${flag}`} title="Change scheduling readiness" aria-label={`Scheduling readiness: ${flagLabel}. Change`} aria-haspopup="menu">
            <span>{flagLabel}</span>
            <Ic n="down" s={10} />
          </button>
        </div>
      </div>
    </div>
  );
}

function WorkOrderQueue() {
  return (
    <div className="sched" style={{ display: "block", width: 320 }}>
      <div className="acct queue-account">
        <div className="acct-h">
          <span className="drag">
            <Ic n="grip" s={13} />
          </span>
          <span className="bi">
            <Ic n="building" s={18} />
          </span>
          <span className="an">Aurora Dynamics</span>
          <span className="cnt">2 WO</span>
          <button type="button" className="icon-btn wq-account-toggle" aria-label="Toggle Aurora Dynamics work orders" aria-expanded="true">
            <Ic n="down" s={14} />
          </button>
        </div>
        <div className="wq-group-items">
          <WorkOrderCard wo="WO-3101" serial="2026-003101" model="LA2-4A1-E-M" category="Biological Safety cabinet" sv="4401" po="88120" last="12 May" flag="waiting-for-customer" flagLabel="Waiting for customer" />
          <WorkOrderCard wo="WO-3102" serial="2026-003102" model="LA2-4A1-E-M" category="Biological Safety cabinet" sv="4401" po="88120" last="12 May" flag="ready-to-schedule" flagLabel="Ready to schedule" />
        </div>
      </div>
    </div>
  );
}

const HTML_CARD = `
<div class="card">
  <div class="ch"><!-- ic('wo', 18) --><span class="t">Work order detail</span></div>
  …
</div>
`;

const HTML_RECORD = `
<article class="jd-card report-rail-card on">
  <button type="button" class="jd-card-main" aria-current="true">
    <span class="jd-card-top">
      <span class="jd-card-n">1</span>
      <span class="jd-card-time">09:00 to 11:30</span>
      <span class="pill b-open"><span class="d"></span>Open</span>
    </span>
    <span class="jd-card-cust"><!-- ic('user', 12) --><span>HOBERT TESTING QUICK ADD ACCOUNT</span></span>
    <span class="jd-card-site" title="Sample Street Sample Sample 1111"><!-- ic('pin', 12) --><span>Sample Street Sample Sample 1111</span></span>
    <span class="jd-card-meta">PO#: Not set · SVSO#: Not set</span>
    <span class="jd-card-meta">1 work order · RCERT-01</span>
    <span class="jd-card-meta report-rail-identity">ZWSE-26-0415 · 04 Aug 2026</span>
  </button>
</article>
`;

const HTML_WO = `
<div class="wcard" draggable="true">
  <div class="wcard-top">
    <span class="drag" title="Drag to calendar"><!-- ic('grip', 14) --></span>
    <span class="wi"><!-- ic('wo', 13) --></span>
    <div class="wc-main">
      <div class="wcard-id"><span class="wn">2026-003101</span><span aria-hidden="true">·</span><span class="wmodel">LA2-4A1-E-M</span></div>
      <div class="wcategory">Biological Safety cabinet</div>
      <div class="wcard-meta"><span>SV: 4401</span><span>PO: 88120</span><span>Last: 12 May</span></div>
    </div>
    <button type="button" class="icon-btn wq-preview-trigger" aria-label="Preview WO-3101" aria-haspopup="dialog" aria-expanded="false"><!-- ic('eye', 14) --></button>
    <div class="wcard-flags">
      <button type="button" class="wq-flag waiting-for-customer" aria-label="Scheduling readiness: Waiting for customer. Change" aria-haspopup="menu">
        <span>Waiting for customer</span><!-- ic('down', 10) -->
      </button>
    </div>
  </div>
</div>
`;

const HTML_MOBILE = `
<!-- FSM-Mobile: record card with its card action -->
<article class="report">
  <div class="rHead">
    <span class="rCode">ZWSE-26-0415</span>
    <span class="pill-tag" data-status-tone="approved">Submitted</span>
  </div>
  <div class="kv"><i data-icon="file-text"></i> HOBERT TESTING QUICK ADD ACCOUNT</div>
  <div class="rGrid">
    <div class="g">SVSO No.<b>SVSO-4401</b></div>
    <div class="g">PO No.<b>PO-88120</b></div>
  </div>
  <!-- full width, outlined, 12 below the content -->
  <button type="button" class="btn-block"><i data-icon="file-text"></i> Open report</button>
</article>
`;

/* ---- usage ---------------------------------------------------------------- */

function Overview() {
  return (
    <div className="prose">
      <p>
        A card holds one record that people pick, drag, or repeat in a list. Identity comes first, then time or customer,
        then location and service metadata. Status sits on the right when the layout allows.
      </p>
      <Example title="Service report list" description="The list beside an open report. The first card is selected." layout="center" code={{ lang: "HTML", code: HTML_RECORD }}>
        <RecordList />
      </Example>
    </div>
  );
}

function WhenToUse() {
  return (
    <div className="prose">
      <ul className="dodont">
        <Do>Use a card for a record that is selected, dragged, or repeated in a list.</Do>
        <Do>Make the whole card the route when the record has one destination.</Do>
        <Do>Keep nested controls reachable by keyboard, and stop their clicks from also opening the card.</Do>
        <Dont>Wrap every page section in a rounded card. Use spacing and a divider inside one shared frame.</Dont>
        <Dont>Add an eye or preview button to a card whose whole surface already opens the record.</Dont>
        <Dont>Give ordinary cards a permanent blue outline to make them look clickable.</Dont>
      </ul>
    </div>
  );
}

function Anatomy() {
  return (
    <div className="prose">
      <Code title="Repeated record" lang="text">{`
[icon/number]  Primary identity                         [status]
               Time or customer
               Location / PO / SVSO / service metadata
`}</Code>
      <Table
        head={["Part", "Rule"]}
        rows={[
          ["Container", <>White, 1px border, card radius. A record card in a list uses the field radius</>],
          ["Leading number or icon", "Position in the list, or the record type"],
          ["Primary identity", "The record, customer, or product it is about"],
          ["Status", <>A read-only <T>.pill</T>, on the right when there is room</>],
          ["Metadata", "Time, location, PO, SVSO. Long values truncate with the full value in a title or the detail view"],
          ["Card action (mobile)", "One outlined, full-width action at the foot of the record"],
        ]}
      />
    </div>
  );
}

function Variants() {
  return (
    <div className="prose">
      <Example title="Panel" description="A titled surface on a detail page. Not clickable." layout="stack" code={{ lang: "HTML", code: HTML_CARD }}>
        <div className="card" style={{ width: "100%", maxWidth: 420 }}>
          <div className="ch">
            <Ic n="wo" s={18} />
            <span className="t">Work order detail</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            {[
              ["Customer", "Aurora Dynamics"],
              ["Asset", "LA2-4A1-E-M"],
              ["Engineer", "Kevin Golfik"],
              ["Scheduled", "12 May"],
            ].map(([k, v]) => (
              <div key={k} style={{ padding: "14px 18px", borderBottom: "1px solid var(--border-2)" }}>
                <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: ".4px", color: "var(--fg-4)", fontWeight: 600 }}>{k}</div>
                <div style={{ marginTop: 5 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </Example>
      <Example
        title="Record card"
        description="The whole card is one button. Hover is a quiet gray fill; selected is a tint with a navy edge."
        layout="center"
        code={{ lang: "HTML", code: HTML_RECORD }}
      >
        <RecordList selected={1} />
      </Example>
      <Example
        title="Work Order card"
        description="Service Schedule queue. Drag it onto the calendar; the readiness flag opens a menu."
        layout="center"
        code={{ lang: "HTML", code: HTML_WO }}
      >
        <WorkOrderQueue />
      </Example>
      <Code title="Mobile record card" lang="html">{HTML_MOBILE}</Code>
      <ul className="dev-notes">
        <li>The card action is outlined, never filled. A record action is one of many on a list screen.</li>
        <li>It sits 12 below the content, so it reads as part of the record. Filled blue stays for the screen’s one primary action.</li>
        <li>Once the report is sent, the action turns into a quiet success state.</li>
      </ul>
    </div>
  );
}

function Behavior() {
  return (
    <div className="prose">
      <ul className="dev-notes">
        <li>Hover uses <T>--muted</T> or <T>--row-hover</T>, never a blue fill.</li>
        <li>
          Selected uses <T>--row-sel</T> or <T>--primary-50</T> with a restrained accent edge, and{" "}
          <T>aria-current="true"</T> on the card button.
        </li>
        <li>Focus shows the 2px primary ring, drawn inside the card so the list never clips it.</li>
        <li>A nested control (a preview button, a readiness flag) stops propagation and keeps its own keyboard access.</li>
        <li>A Work Order card drags onto the calendar. While dragging it fades and its border turns dashed.</li>
        <li>Empty: the list says what is missing and how to change the search or filters.</li>
        <li>Long values truncate to one line only when the full value is in a title or on the detail screen.</li>
      </ul>
    </div>
  );
}

/* ---- style ---------------------------------------------------------------- */

/* FSM-Mobile css/components.css › card action, with the tokens it reads
   (spacing-tokens.css, styles.css, white-theme.css) resolved on .report. */
const MOBILE_ACTION_CSS = `
.report{--space-8:8px;--space-12:12px;--space-16:16px;--esco-blue:#00467F;--outline-strong:#7d8f9f;--font:'Noto Sans',sans-serif;width:320px}
.report .btn-block{
  width:100%;max-width:none;margin:var(--space-12) 0 0;
  min-height:44px;padding:var(--space-8) var(--space-16);
  display:flex;align-items:center;justify-content:center;gap:var(--space-8);
  line-height:1.2;
  background:transparent;color:var(--esco-blue);
  border:1px solid var(--outline-strong);border-radius:10px;
  font:500 .9375rem var(--font);
}
`;

function Measurements() {
  return (
    <div className="prose">
      <p>
        Every number below is read from the product stylesheet, not typed by hand. Build to these numbers, not to how the
        picture looks.
      </p>
      <SpecSheet
        title="Panel card"
        description="A titled surface on a detail page."
        scale={1}
        targets={[
          { sel: ".card", name: "Panel card", width: "fill" },
          { sel: ".ch", name: "Card header", width: "fill" },
          { sel: ".ch .t", name: "Card title" },
        ]}
      >
        <div className="card" style={{ width: 420 }}>
          <div className="ch">
            <Ic n="wo" s={18} />
            <span className="t">Work order detail</span>
          </div>
          <div style={{ padding: "14px 18px" }}>Aurora Dynamics</div>
        </div>
      </SpecSheet>
      <SpecSheet
        title="Record card"
        description="Service report list, selected."
        scale={1}
        targets={[
          { sel: ".report-rail-card", name: "Record card", width: "fill" },
          { sel: ".jd-card-main", name: "Record card inner button", width: "fill" },
          { sel: ".jd-card-cust", name: "Card title (customer)" },
        ]}
      >
        <div style={{ width: 340 }}>
          <RecordCard r={RECORDS[0]} on />
        </div>
      </SpecSheet>
      <SpecSheet title="Record number tile" scale={3} targets={[{ sel: ".jd-card-n", name: "Record number tile", width: "fixed" }]}>
        <div className="report-rail-card" style={{ border: 0 }}>
          <span className="jd-card-top">
            <span className="jd-card-n">1</span>
          </span>
        </div>
      </SpecSheet>
      <SpecSheet
        title="Work Order card"
        description="Service Schedule queue."
        scale={1}
        targets={[
          { sel: ".wcard", name: "Work Order card", width: "fill" },
          { sel: ".wcard-top", name: "Work Order card top row", width: "fill" },
          { sel: ".wq-flag", name: "Readiness flag" },
        ]}
      >
        <WorkOrderQueue />
      </SpecSheet>
      <SpecSheet title="Mobile card action" description="FSM-Mobile. Outlined, full width, at the foot of the record." scale={1} targets={[{ sel: ".btn-block", name: "Card action", width: "fill" }]}>
        <style>{MOBILE_ACTION_CSS}</style>
        <div className="report">
          <button type="button" className="btn-block">
            Open report
          </button>
        </div>
      </SpecSheet>
    </div>
  );
}

function Screens() {
  return (
    <ScreenWidths
      rows={[
        { screen: "desktop", width: WEB_SCREENS.desktop, change: "Cards sit in a rail beside the open record, for example the report list beside the report." },
        { screen: "laptop", width: WEB_SCREENS.laptop, change: "Below 1100 px the report split view stacks: the card list goes above the report." },
        { screen: "tablet", width: WEB_SCREENS.tablet, change: "Stacked, as on a small laptop. Long values still truncate to one line, with the full value in a title or the detail view." },
        { screen: "phone", width: WEB_SCREENS.phone, change: "Gutters drop to 16 px and touch controls grow to 44 px. Card content keeps its order." },
        { screen: "mobile-app", width: WEB_SCREENS.app, change: "Record cards with one outlined, full-width card action at the foot. The action is at least 44 tall." },
      ]}
    />
  );
}

function StyleColor() {
  return (
    <Table
      head={["Element", "Rest", "Hover", "Selected"]}
      rows={[
        [<T>.card</T>, <>White, border <T>--border</T>, <T>--shadow-sm</T></>, "—", "—"],
        ["Record card", <>White, border <T>--border</T></>, <><T>--muted</T>, border <T>--border-hover</T></>, <><T>--primary-50</T>, border <T>--primary</T></>],
        ["Record number tile", <><T>--primary</T>, white text</>, "—", "—"],
        ["Customer, time", <T>--fg</T>, "—", "—"],
        ["Site", <T>--fg-2</T>, "—", "—"],
        ["Metadata", <T>--fg-3</T>, "—", "—"],
        ["Work Order icon tile", <><T>--primary-50</T>, icon <T>--primary</T></>, "—", "—"],
        ["Work Order with breakdown", <><T>--rejected-bg</T>, icon <T>--error</T></>, "—", "—"],
        ["Mobile card action", <>Border <T>--outline-strong</T>, text <T>--esco-blue</T></>, <><T>--esco-tint</T>, border <T>--esco-blue</T></>, "—"],
      ]}
    />
  );
}

function StyleSpec() {
  return (
    <div className="prose">
    <Table
      head={["Property", "Card", "Record card", "Work Order card"]}
      rows={[
        ["Radius", <><T>--radius-card</T> 10</>, <><T>--radius-field</T> 8</>, <><T>--radius-card</T> 10; square inside a queue group</>],
        ["Border", "1", "1", "1 on its own. Inside a queue group: no left edge, and a 1 top divider between cards (none on the first)"],
        ["Padding", "By content", <><T>--sp-3</T> 12</>, "12 top, 8 sides, 8 bottom in the queue"],
        ["Gap between cards", "—", <><T>--sp-2</T> 8</>, "Dividers inside a group"],
        ["Leading tile", "—", "18 number, 4 radius", "24 icon, 6 radius"],
        ["Identity", "14.5 · 500 header title", <><T>--fs-sub</T> 12.5 · 500 customer</>, "12 · 600 model"],
        ["Metadata", "—", <><T>--fs-help</T> 11.5</>, "11.5"],
      ]}
    />
      <p className="prose-p">
        Record card padding sits on its inner button, not on the card. Work Order card padding sits on its top row. The
        mobile card action is 44 minimum height, 10 radius, a 15px label at weight 500, and 12 above.
      </p>
    </div>
  );
}

/* ---- code ----------------------------------------------------------------- */

function CodeWeb() {
  return (
    <div className="prose">
      <Code title="HTML" lang="html">{HTML_RECORD}</Code>
      <Code title="React" lang="tsx">{`
import { RecordCard } from "@/components/ui/RecordCard";

<RecordCard
  index={1}
  title="HOBERT TESTING QUICK ADD ACCOUNT"
  time="09:00 to 11:30"
  status={<StatusPill label="Open" />}
  meta={["Sample Street Sample Sample 1111", "PO#: Not set · SVSO#: Not set"]}
  identity="ZWSE-26-0415 · 04 Aug 2026"
  selected={selectedId === report.id}
  onSelect={() => setSelectedId(report.id)}
/>
`}</Code>
      <Table
        head={["Prop", "Type", "Default"]}
        rows={[
          [<T>title</T>, <T>string</T>, "—"],
          [<T>status</T>, <T>ReactNode</T>, "—"],
          [<T>meta</T>, <T>string[]</T>, <T>[]</T>],
          [<T>selected</T>, <T>boolean</T>, <T>false</T>],
          [<T>onSelect</T>, <T>() =&gt; void</T>, "—"],
          [<T>href</T>, <T>string</T>, "—"],
        ]}
      />
    </div>
  );
}

function CodeFlutter() {
  return (
    <Code title="Flutter" lang="dart">{`
Card.outlined(
  clipBehavior: Clip.antiAlias,
  child: InkWell(
    onTap: () => open(report),                       // the whole card is the route
    child: Padding(
      padding: const EdgeInsets.all(16),
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Row(children: [
          Expanded(child: Text(report.no, style: Theme.of(context).textTheme.titleMedium)),
          EscoStatusPill(label: report.statusLabel, family: report.family),
        ]),
        const SizedBox(height: 8),
        Text(report.account, style: Theme.of(context).textTheme.bodyLarge),
        Text('PO \${report.po} · SVSO \${report.svso}', style: Theme.of(context).textTheme.bodyMedium),
        const SizedBox(height: 12),
        SizedBox(
          width: double.infinity,
          child: OutlinedButton(onPressed: () => open(report), child: const Text('Open report')),
        ),                                           // card action: outlined, full width
      ]),
    ),
  ),
);
`}</Code>
  );
}

function CodeIos() {
  return (
    <Code title="SwiftUI" lang="swift">{`
List(reports) { report in
    NavigationLink(value: report) {                 // the whole row is the route
        VStack(alignment: .leading, spacing: 4) {
            HStack {
                Text(report.no).font(.escoBody.weight(.semibold))
                Spacer()
                EscoStatusPill(label: report.statusLabel, family: report.family)
            }
            Text(report.account).font(.escoBody)
            Text("PO \\(report.po) · SVSO \\(report.svso)")
                .font(.escoMeta)
                .foregroundStyle(.escoTextSecondary)
        }
        .accessibilityElement(children: .combine)
    }
}
.listStyle(.insetGrouped)
`}</Code>
  );
}

/* ---- accessibility -------------------------------------------------------- */

function A11yKeyboard() {
  return (
    <Table
      head={["Key", "Action"]}
      rows={[
        ["Tab", "Moves to the card, then to each nested control inside it"],
        ["Enter, Space", "Opens or selects the record"],
        ["Enter, Space on a nested control", "Runs that control only. The card does not also open"],
      ]}
    />
  );
}

function A11yNames() {
  return (
    <div className="prose">
      <ul className="dodont">
        <Do>Make a clickable card a real button or link. Let its visible text be its name, so status and time are read too.</Do>
        <Do>Mark the selected card with <T>aria-current="true"</T>, not color alone.</Do>
        <Do>Name icon-only nested controls with the record: <T>Preview WO-3101</T>.</Do>
        <Do>Give a menu trigger inside a card <T>aria-haspopup</T> and a name that states its current value.</Do>
        <Dont>Put a button inside a card button. Lay nested controls out beside the card’s main button.</Dont>
      </ul>
    </div>
  );
}

function A11yContrast() {
  return (
    <Table
      head={["Pair", "Ratio", "Requirement"]}
      rows={[
        [<><T>--fg</T> on white</>, "11.6:1", "4.5:1 text"],
        [<><T>--fg</T> on selected <T>--primary-50</T></>, "10.1:1", "4.5:1 text"],
        [<><T>--fg-3</T> metadata on white</>, "6.2:1", "4.5:1 text"],
        [<><T>--fg-3</T> on <T>--primary-50</T></>, "5.4:1", "4.5:1 text"],
        [<><T>--fg-3</T> on hover <T>--muted</T></>, "5.9:1", "4.5:1 text"],
        [<>White on <T>--primary</T> number tile</>, "9.6:1", "4.5:1 text"],
        [<><T>--border</T> card edge on white</>, "1.2:1", "Cards are identified by content and layout, not the edge"],
        [<>Selected edge <T>--primary</T> on <T>--primary-50</T></>, "8.4:1", "3:1 non-text"],
        [<>Mobile <T>--esco-blue</T> action text on white</>, "9.6:1", "4.5:1 text"],
      ]}
    />
  );
}

export const card: ComponentContent = {
  lead: "Holds one record that people select, drag, or repeat in a list. The whole card is the route when there is one destination.",
  art: CardArt,
  usage: [
    { id: "overview", title: "Overview", body: <Overview /> },
    { id: "when-to-use", title: "When to use", body: <WhenToUse /> },
    { id: "anatomy", title: "Anatomy", body: <Anatomy /> },
    { id: "variants", title: "Variants", body: <Variants /> },
    { id: "behavior", title: "Behavior and states", body: <Behavior /> },
    {
      id: "related",
      title: "Related",
      body: <p className="prose-p">Table for many records compared in columns; Status pill for the status on the right; Button for the mobile card action.</p>,
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
