/* Sample register rows: the first transcribed rows of NPD-FSM/sr/sr-data.js,
   plus the schedule states and date format the register uses. Plain data, so
   both the server page and the client demo can import it. */

export type Status = "open" | "fup" | "closed";
export type Row = {
  no: string;
  account: string;
  safe: [number, number];
  chargeable: boolean;
  followUp: boolean;
  date: string;
  by: string;
  status: Status;
};

export const SR_ROWS: Row[] = [
  { no: "ZWSE-26-0415", account: "HOBERT TESTING QUICK ADD ACCOUNT", safe: [1, 1], chargeable: false, followUp: false, date: "2026-08-04", by: "Kevin Golfik", status: "open" },
  { no: "ZWSP-26-0414", account: "Sample Account (For Test Report Demo)", safe: [1, 1], chargeable: false, followUp: false, date: "2026-05-20", by: "Charisse Eugenio", status: "open" },
  { no: "ZWSE-26-0413", account: "Sample Account (For Test Report Demo)", safe: [0, 1], chargeable: false, followUp: true, date: "2026-05-20", by: "Charisse Eugenio", status: "open" },
  { no: "ZWSE-26-0411", account: "Sample Account (For Test Report Demo)", safe: [0, 1], chargeable: true, followUp: true, date: "2025-12-18", by: "Truman Mendoza (Test)", status: "open" },
  { no: "ZWSE-26-0402", account: "Sample Account (For Test Report Demo)", safe: [0, 1], chargeable: false, followUp: true, date: "2026-02-24", by: "Guilbert Raga", status: "fup" },
  { no: "ZWSE-25-0397", account: "ABC Company", safe: [1, 1], chargeable: false, followUp: false, date: "2025-12-12", by: "Sherwin Pitao", status: "open" },
];

/* sr/sr-data.js › SR_SCHED_STATES */
export const STATE: Record<Status, { label: string; pill: string }> = {
  open: { label: "Open", pill: "open" },
  fup: { label: "Follow-up ongoing", pill: "issued" },
  closed: { label: "Closed", pill: "pending" },
};

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
/* sr/sr-core.js › srFmt: "August 04, 2026" */
export const fmt = (iso: string) => {
  const [y, m, d] = iso.split("-");
  return `${MONTHS[Number(m) - 1]} ${d}, ${y}`;
};

