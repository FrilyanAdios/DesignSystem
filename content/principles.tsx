import {
  Check,
  ChevronDown,
  ChevronRight,
  Download,
  Droplet,
  Eye,
  Feather,
  Filter,
  ListChecks,
  ListTree,
  MousePointer2,
  MousePointerClick,
  Plus,
  Rows3,
  Sparkles,
  Target,
  X,
  type LucideIcon,
} from "lucide-react";
import type { PageContent } from "./index";

/* ---------------------------------------------------------------------------
   Design principles — the seven rules from the Introduction, one chapter
   each: the rule, why it matters, and a do / don't picture drawn with the
   real tokens. Mock UI uses mk-* classes; keep it schematic, not a component.
   --------------------------------------------------------------------------- */

export function Rule({ icon: Icon, children }: { icon: LucideIcon; children: React.ReactNode }) {
  return (
    <div className="pr-rule">
      <span className="pr-icon" aria-hidden="true">
        <Icon size={22} />
      </span>
      <p>{children}</p>
    </div>
  );
}

function Compare({ good, bad, goodNote, badNote }: { good: React.ReactNode; bad: React.ReactNode; goodNote: string; badNote: string }) {
  return (
    <div className="compare">
      <figure className="cmp is-do">
        <div className="cmp-canvas" aria-hidden="true">
          {good}
        </div>
        <figcaption>
          <span className="cmp-tag">
            <Check size={14} aria-hidden="true" /> Do
          </span>
          {goodNote}
        </figcaption>
      </figure>
      <figure className="cmp is-dont">
        <div className="cmp-canvas" aria-hidden="true">
          {bad}
        </div>
        <figcaption>
          <span className="cmp-tag">
            <X size={14} aria-hidden="true" /> Don’t
          </span>
          {badNote}
        </figcaption>
      </figure>
    </div>
  );
}

function Principle({
  icon,
  rule,
  why,
  ...compare
}: {
  icon: LucideIcon;
  rule: React.ReactNode;
  why: React.ReactNode;
  good: React.ReactNode;
  bad: React.ReactNode;
  goodNote: string;
  badNote: string;
}) {
  return (
    <div className="prose">
      <Rule icon={icon}>{rule}</Rule>
      <p>{why}</p>
      <Compare {...compare} />
    </div>
  );
}

/* ---- small mock pieces ---------------------------------------------------- */

export const Pill = ({ tone, children }: { tone: string; children: React.ReactNode }) => (
  <span className={`pill b-${tone}`}>
    <span className="d" />
    {children}
  </span>
);

const Row = ({ title, meta, end }: { title: string; meta?: string; end?: React.ReactNode }) => (
  <div className="mk-row">
    <span className="mk-row-text">
      <strong>{title}</strong>
      {meta && <span>{meta}</span>}
    </span>
    {end}
  </div>
);

export const Field = ({ k, v }: { k: string; v: string }) => (
  <div className="mk-kv">
    <span>{k}</span>
    <strong>{v}</strong>
  </div>
);

export const Btn = ({ kind = "sec", children }: { kind?: "pri" | "sec" | "ghost"; children: React.ReactNode }) => (
  <span className={`mk-btn mk-${kind}`}>{children}</span>
);

/* ---- chapters ------------------------------------------------------------- */

function Calm() {
  return (
    <Principle
      icon={Feather}
      rule={
        <>
          Pick the <strong className="hl">calmest option</strong> that still works. Nothing should surprise,
          decorate, or compete.
        </>
      }
      why="People use these screens every day, often under time pressure and without training. A familiar, quiet screen is faster to read than a clever one."
      good={
        <div className="mk-card">
          <Row title="Pump inspection" meta="Site A · 09:00" end={<Pill tone="issued">Confirmed</Pill>} />
          <Row title="Filter change" meta="Site B · 11:30" end={<Pill tone="revision">Tentative</Pill>} />
          <Row title="Annual service" meta="Site C · 14:00" end={<Pill tone="approved">Closed</Pill>} />
        </div>
      }
      goodNote="Plain rows, one status each. The eye goes straight to the data."
      bad={
        <div className="mk-card mk-loud">
          <div className="mk-banner">
            <Sparkles size={14} /> Today’s jobs!
          </div>
          <Row title="Pump inspection" meta="Site A · 09:00" end={<span className="mk-badges"><b>NEW</b><b>HOT</b></span>} />
          <Row title="Filter change" meta="Site B · 11:30" end={<span className="mk-badges"><b>!!</b><b>URGENT</b></span>} />
        </div>
      }
      badNote="Gradients, shouting badges, and decoration compete with the work."
    />
  );
}

function Navy() {
  return (
    <Principle
      icon={Droplet}
      rule={
        <>
          Navy means one thing: <strong className="hl">you can act here</strong>, or you are here.
        </>
      }
      why="Use navy only for the primary button, active navigation, the selected tab, links, and focus. Because it is rare, people learn to trust it."
      good={
        <div className="mk-card">
          <div className="mk-toolbar">
            <span className="mk-title">Work orders</span>
            <span className="mk-actions">
              <Btn><Filter size={12} /> Filter</Btn>
              <Btn><Download size={12} /> Export</Btn>
              <Btn kind="pri"><Plus size={12} /> New order</Btn>
            </span>
          </div>
          <Row title="WO-1042" meta="Pump inspection" />
          <Row title="WO-1043" meta="Filter change" />
        </div>
      }
      goodNote="Dark heading, quiet buttons. Navy marks the one action."
      bad={
        <div className="mk-card">
          <div className="mk-toolbar mk-navybar">
            <span className="mk-title">Work orders</span>
            <span className="mk-actions">
              <Btn kind="pri">Filter</Btn>
              <Btn kind="pri">Export</Btn>
              <Btn kind="pri">New order</Btn>
            </span>
          </div>
          <Row title="WO-1042" meta="Pump inspection" />
          <Row title="WO-1043" meta="Filter change" />
        </div>
      }
      badNote="Navy heading, navy bar, navy everything. Nothing stands out."
    />
  );
}

function Structure() {
  return (
    <Principle
      icon={Rows3}
      rule={
        <>
          Build hierarchy with <strong className="hl">whitespace, alignment, and a 1px hairline</strong> before
          reaching for boxes.
        </>
      }
      why="Cards are for records you can select, drag, or repeat. Wrapping every section in a box adds borders and shadows without adding meaning."
      good={
        <div className="mk-card">
          <span className="mk-group">Customer</span>
          <Field k="Name" v="Acme Labs" />
          <Field k="Site" v="Singapore" />
          <span className="mk-group mk-split">Equipment</span>
          <Field k="Model" v="Airstream AC2" />
          <Field k="Serial" v="2024-118" />
        </div>
      }
      goodNote="Two groups, a label and a hairline. Nothing more is needed."
      bad={
        <div className="mk-card mk-nested">
          <div className="mk-box">
            <span className="mk-group">Customer</span>
            <div className="mk-box">
              <Field k="Name" v="Acme Labs" />
            </div>
            <div className="mk-box">
              <Field k="Site" v="Singapore" />
            </div>
          </div>
          <div className="mk-box">
            <span className="mk-group">Equipment</span>
            <div className="mk-box">
              <Field k="Model" v="Airstream AC2" />
            </div>
          </div>
        </div>
      }
      badNote="Boxes inside boxes. Every border and shadow is noise."
    />
  );
}

function Reorganize() {
  return (
    <Principle
      icon={ListTree}
      rule={
        <>
          Make a screen cleaner by <strong className="hl">grouping, ordering, and disclosing</strong>, never by
          deleting business data.
        </>
      }
      why="Someone, somewhere, needs that field to do their job. Show the essentials first and keep the rest one click away."
      good={
        <div className="mk-card">
          <Field k="Customer" v="Acme Labs" />
          <Field k="Equipment" v="Airstream AC2" />
          <Field k="Due" v="12 Oct 2026" />
          <span className="mk-more">
            Show 5 more details <ChevronDown size={12} />
          </span>
        </div>
      }
      goodNote="Summary first, the full record on demand."
      bad={
        <div className="mk-card">
          <Field k="Customer" v="Acme Labs" />
          <Field k="Due" v="12 Oct 2026" />
          <div className="mk-removed">Serial, site, and contract removed to look clean</div>
        </div>
      }
      badNote="Fields gone. The screen looks tidy and the engineer is stuck."
    />
  );
}

function ShowOnce() {
  return (
    <Principle
      icon={Target}
      rule={
        <>
          Every value lives in <strong className="hl">its strongest place</strong>, once.
        </>
      }
      why="Repeating a status or a number in neighbouring areas is not reinforcement. It makes people compare copies and wonder which one is right."
      good={
        <div className="mk-card">
          <div className="mk-toolbar">
            <span className="mk-title">WO-1042</span>
            <Pill tone="approved">Closed</Pill>
          </div>
          <Field k="Customer" v="Acme Labs" />
          <Field k="Engineer" v="R. Tan" />
        </div>
      }
      goodNote="Status once, next to the record it describes."
      bad={
        <div className="mk-card">
          <div className="mk-toolbar">
            <span className="mk-title">WO-1042</span>
            <Pill tone="approved">Closed</Pill>
          </div>
          <div className="mk-band">
            Status: <strong>Closed</strong>
          </div>
          <Field k="Status" v="Closed" />
          <Field k="Customer" v="Acme Labs" />
        </div>
      }
      badNote="The same status three times in one view."
    />
  );
}

function Visible() {
  return (
    <Principle
      icon={Eye}
      rule={
        <>
          Every action has a <strong className="hl">shape, label, chevron, or underline at rest</strong>. Hover only
          confirms.
        </>
      }
      why="Touch screens have no hover, and nobody should have to sweep the mouse around to find a feature. If it can be done, it can be seen."
      good={
        <div className="mk-card">
          <Row
            title="Pump inspection"
            meta="Site A · 09:00"
            end={
              <span className="mk-inline">
                <span className="mk-link">Edit</span>
                <ChevronRight size={14} />
              </span>
            }
          />
          <Row
            title="Filter change"
            meta="Site B · 11:30"
            end={
              <span className="mk-inline">
                <span className="mk-link">Edit</span>
                <ChevronRight size={14} />
              </span>
            }
          />
        </div>
      }
      goodNote="The action and the way in are visible without touching anything."
      bad={
        <div className="mk-card">
          <Row title="Pump inspection" meta="Site A · 09:00" end={<span className="mk-ghost" />} />
          <Row title="Filter change" meta="Site B · 11:30" />
          <span className="mk-tip">
            <MousePointer2 size={12} /> Hover a row to see actions
          </span>
        </div>
      }
      badNote="Actions hidden until hover. On a tablet they never appear."
    />
  );
}

function OnePrimary() {
  return (
    <Principle
      icon={MousePointerClick}
      rule={
        <>
          Each page, dialog footer, or form step has <strong className="hl">exactly one</strong> filled navy button.
        </>
      }
      why="The primary button answers “what do I do next?”. Two of them ask the user to decide what the screen should have decided."
      good={
        <div className="mk-card mk-dialog">
          <span className="mk-title">Close work order?</span>
          <span className="mk-text">The report is sent to the customer.</span>
          <span className="mk-foot">
            <Btn kind="ghost">Cancel</Btn>
            <Btn>Save draft</Btn>
            <Btn kind="pri">Close order</Btn>
          </span>
        </div>
      }
      goodNote="One filled button. The others are secondary or ghost."
      bad={
        <div className="mk-card mk-dialog">
          <span className="mk-title">Close work order?</span>
          <span className="mk-text">The report is sent to the customer.</span>
          <span className="mk-foot">
            <Btn kind="pri">Cancel</Btn>
            <Btn kind="pri">Save draft</Btn>
            <Btn kind="pri">Close order</Btn>
          </span>
        </div>
      }
      badNote="Three primaries. Which one is the point of this dialog?"
    />
  );
}

const CHECKS = [
  { q: "Is this the calmest version that still works?", id: "calm-beats-clever" },
  { q: "Is every navy element something you can act on, or where you are?", id: "navy-is-scarce" },
  { q: "Could a hairline and some space replace this box?", id: "structure-before-decoration" },
  { q: "Is every business field still reachable?", id: "reorganize-never-remove" },
  { q: "Does each value appear only once?", id: "show-each-fact-once" },
  { q: "Can every action be seen without hovering?", id: "visible-before-hover" },
  { q: "Is there exactly one primary button per region?", id: "one-primary-action" },
];

function Checklist() {
  return (
    <div className="prose">
      <Rule icon={ListChecks}>
        Before you hand off a screen, answer these <strong className="hl">seven questions</strong>. Each “no” points to
        the chapter that fixes it.
      </Rule>
      <ol className="checklist">
        {CHECKS.map((c, i) => (
          <li key={c.id}>
            <span className="ck-box" aria-hidden="true">
              <Check size={14} />
            </span>
            <span className="ck-q">{c.q}</span>
            <a href={`#${c.id}`} className="ck-link">
              Chapter {i + 1}
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
}

export const principles: PageContent = {
  lead: "Seven rules that settle design decisions before they become debates. Each one comes with a picture of what to do and what to avoid.",
  art: "principles",
  guide: {
    meta: ["About 6 minutes", "7 principles in 3 parts", "Plus a hand-off checklist"],
    questions: [
      { q: "Can I use navy for a heading?", id: "navy-is-scarce" },
      { q: "How many primary buttons can a dialog have?", id: "one-primary-action" },
      { q: "Should this section be a card?", id: "structure-before-decoration" },
      { q: "Can I hide fields to make it cleaner?", id: "reorganize-never-remove" },
      { q: "Is an action that appears on hover OK?", id: "visible-before-hover" },
      { q: "The status shows twice. Is that fine?", id: "show-each-fact-once" },
    ],
  },
  sections: [
    {
      id: "calm-beats-clever",
      title: "Calm beats clever",
      part: { title: "How it looks", description: "Restraint in style, color, and structure." },
      summary: "A quiet screen is a fast screen.",
      body: <Calm />,
      takeawayLabel: "Quick check",
      takeaway: "Remove one decoration. If nothing is lost, leave it out.",
      more: { href: "/foundations/color", label: "Color" },
    },
    {
      id: "navy-is-scarce",
      title: "Navy is scarce",
      summary: "The brand color is a signal, not a paint.",
      body: <Navy />,
      takeawayLabel: "Quick check",
      takeaway: "Point at every navy element. Can you click it, or does it show where you are? If not, make it neutral.",
      more: { href: "/components/button", label: "Button" },
    },
    {
      id: "structure-before-decoration",
      title: "Structure before decoration",
      summary: "Space and hairlines first. Boxes only for records.",
      body: <Structure />,
      takeawayLabel: "Quick check",
      takeaway: "Is this a record someone can select, drag, or repeat? If not, it is a section, not a card.",
      more: { href: "/components/card", label: "Card" },
    },
    {
      id: "reorganize-never-remove",
      title: "Reorganize, never remove",
      part: { title: "What it shows", description: "How information is kept complete and honest." },
      summary: "Clean means well ordered, not emptied.",
      body: <Reorganize />,
      takeawayLabel: "Quick check",
      takeaway: "Compare with the previous version. Every field that was there is still reachable.",
      more: { href: "/foundations/grid", label: "Layout and grid" },
    },
    {
      id: "show-each-fact-once",
      title: "Show each fact once",
      summary: "One value, one place.",
      body: <ShowOnce />,
      takeawayLabel: "Quick check",
      takeaway: "Search the screen for each status and number. Each one appears once.",
      more: { href: "/components/status-pill", label: "Status pill" },
    },
    {
      id: "visible-before-hover",
      title: "Visible before hover",
      part: { title: "How it behaves", description: "What people can find and what they should do next." },
      summary: "If it can be done, it can be seen.",
      body: <Visible />,
      takeawayLabel: "Quick check",
      takeaway: "Look at the screen without moving the mouse. Every action is still findable.",
      more: { href: "/foundations/interaction-states", label: "Interaction states" },
    },
    {
      id: "one-primary-action",
      title: "One primary action",
      summary: "Every region answers “what next?” with one button.",
      body: <OnePrimary />,
      takeawayLabel: "Quick check",
      takeaway: "Count the filled navy buttons in each page, dialog footer, or form step. The answer is one.",
      more: { href: "/components/dialog", label: "Dialog" },
    },
    {
      id: "before-you-hand-off",
      title: "Before you hand off",
      part: { title: "Put them to work", description: "The principles as a checklist." },
      summary: "Seven yes-or-no questions for every screen.",
      body: <Checklist />,
      takeaway: "Seven yeses and the screen is ready for review.",
    },
  ],
};
