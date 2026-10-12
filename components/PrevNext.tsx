import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ALL_PAGES } from "@/lib/nav";
import { CONTENT } from "@/content";

/* End of page: a clear "up next" call to action, with a quiet way back. */
export function PrevNext({ href }: { href: string }) {
  const index = ALL_PAGES.findIndex((p) => p.href === href);
  const prev = index > 0 ? ALL_PAGES[index - 1] : undefined;
  const next = index < ALL_PAGES.length - 1 ? ALL_PAGES[index + 1] : undefined;
  const nextLead = next && (CONTENT[next.href]?.lead ?? `Continue with ${next.section.title.toLowerCase()}.`);

  return (
    <nav className="prevnext" aria-label="Previous and next page">
      {next && (
        <div className="next-cta">
          <span className="next-label">
            Up next · {next.section.title}
          </span>
          <p className="next-title">{next.title}</p>
          <p className="next-lead">{nextLead}</p>
          <Link href={next.href} className="btn btn-primary btn-lg next-btn">
            Continue to {next.title}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      )}
      {prev && (
        <Link href={prev.href} className="prev-link">
          <ArrowLeft size={14} aria-hidden="true" />
          Previous: {prev.title}
        </Link>
      )}
    </nav>
  );
}
