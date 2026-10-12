import { PATHS } from "./icons";

export type IconName = keyof typeof PATHS;

/** React twin of the product's ic(name, size): same paths, same `.ic` stroke grammar. */
export function Ic({ n, s = 16 }: { n: IconName; s?: number }) {
  return (
    <svg
      className="ic"
      width={s}
      height={s}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      dangerouslySetInnerHTML={{ __html: PATHS[n] ?? "" }}
    />
  );
}
