import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { SECTIONS, getSection, toneAt } from "@/lib/nav";

type Params = Promise<{ section: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return SECTIONS.map((s) => ({ section: s.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const section = getSection((await params).section);
  return { title: section?.title };
}

export default async function SectionPage({ params }: { params: Params }) {
  const section = getSection((await params).section);
  if (!section) notFound();
  let index = 0;

  return (
    <div className="page no-toc">
      <div className="content">
        <header className="page-head">
          <h1>{section.title}</h1>
          <p className="lead">{section.description}</p>
        </header>

        {section.groups.map((group, gi) => (
          <section
            key={group.title ?? gi}
            className="gallery-group"
            aria-label={group.title ?? section.title}
          >
            {group.title && <h2>{group.title}</h2>}
            <div className="gallery">
              {group.items.map((item) => {
                const Icon = item.icon;
                const i = index++;
                return (
                  <Link
                    key={item.slug}
                    href={`/${section.slug}/${item.slug}`}
                    className={`gallery-card tone-${toneAt(i)}`}
                    style={{ "--i": i } as React.CSSProperties}
                  >
                    <span className="thumb" aria-hidden="true">
                      <Icon size={32} strokeWidth={1.5} />
                    </span>
                    <span className="meta">
                      <span>{item.title}</span>
                      <ArrowRight size={16} aria-hidden="true" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
