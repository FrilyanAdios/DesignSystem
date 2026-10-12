import { Laptop, Monitor, Smartphone, Tablet, type LucideIcon } from "lucide-react";

/* ---------------------------------------------------------------------------
   What a component does at each screen width, in plain words. Every row is
   shown, even when nothing changes, so the reader never has to infer.
   --------------------------------------------------------------------------- */

export type ScreenRow = {
  screen: "desktop" | "laptop" | "tablet" | "phone" | "mobile-app";
  /** e.g. "1180 px and wider" */
  width: string;
  /** what changes; omit or set same to show "No change" */
  change?: React.ReactNode;
  same?: boolean;
};

const META: Record<ScreenRow["screen"], { icon: LucideIcon; name: string }> = {
  desktop: { icon: Monitor, name: "Desktop" },
  laptop: { icon: Laptop, name: "Small laptop" },
  tablet: { icon: Tablet, name: "Tablet" },
  phone: { icon: Smartphone, name: "Phone (web)" },
  "mobile-app": { icon: Smartphone, name: "Mobile app" },
};

/** The web breakpoints from the design contract, as a starting set. */
export const WEB_SCREENS = {
  desktop: "1180 px and wider",
  laptop: "900 – 1179 px",
  tablet: "640 – 899 px",
  phone: "Below 640 px",
  app: "Flutter and iOS",
} as const;

export function ScreenWidths({ rows }: { rows: ScreenRow[] }) {
  return (
    <ol className="screens">
      {rows.map((r) => {
        const { icon: Icon, name } = META[r.screen];
        const same = r.same || !r.change;
        return (
          <li key={r.screen + r.width}>
            <span className="sc-icon" aria-hidden="true">
              <Icon size={22} />
            </span>
            <span className="sc-head">
              <strong>{name}</strong>
              <span>{r.width}</span>
            </span>
            <span className={`sc-change${same ? " is-same" : ""}`}>{same ? "No change" : r.change}</span>
          </li>
        );
      })}
    </ol>
  );
}
