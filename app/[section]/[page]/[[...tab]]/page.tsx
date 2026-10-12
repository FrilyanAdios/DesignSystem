import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ALL_PAGES, COMPONENT_TABS, OUTLINES, getPage, slugify, type TabSlug } from "@/lib/nav";
import { DocSections, GuideMap, GuideSections, toChapters } from "@/components/DocSections";
import { ArtFrame, PageArt } from "@/components/PageArt";
import { PrevNext } from "@/components/PrevNext";
import { Toc } from "@/components/Toc";
import { CONTENT } from "@/content";
import { COMPONENTS } from "@/content/components";

type Params = Promise<{ section: string; page: string; tab?: string[] }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return ALL_PAGES.flatMap((p) => {
    const base = { section: p.section.slug, page: p.slug };
    if (p.kind !== "component") return [{ ...base, tab: [] }];
    return [{ ...base, tab: [] }, ...COMPONENT_TABS.map((t) => ({ ...base, tab: [t.slug] }))];
  });
}

async function resolve(params: Params) {
  const { section, page: slug, tab } = await params;
  const page = getPage(section, slug);
  if (!page || (tab && tab.length > 1)) return null;
  const isComponent = page.kind === "component";
  const activeTab = (tab?.[0] ?? (isComponent ? "usage" : undefined)) as TabSlug | undefined;
  if (!isComponent && activeTab) return null;
  if (isComponent && !COMPONENT_TABS.some((t) => t.slug === activeTab)) return null;
  return { page, activeTab };
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const r = await resolve(params);
  return { title: r?.page.title };
}

export default async function DocPage({ params }: { params: Params }) {
  const r = await resolve(params);
  if (!r) notFound();
  const { page, activeTab } = r;
  const written = activeTab ? undefined : CONTENT[page.href];
  const comp = activeTab ? COMPONENTS[page.href] : undefined;
  const outline = (activeTab ? comp?.[activeTab] : written?.sections) ?? OUTLINES[activeTab ?? "doc"].map((title) => ({ id: slugify(title), title }));
  const chapters = written?.guide ? toChapters(outline) : undefined;
  const toc = chapters
    ? chapters.map(({ id, title, partTitle }) => ({ id, title, group: partTitle }))
    : outline.map(({ id, title }) => ({ id, title }));

  return (
    <div className="page">
      <article className={`content${chapters ? " is-guide" : ""}`}>
        <Link href={`/${page.section.slug}`} className="back-link">
          <ArrowLeft size={16} aria-hidden="true" />
          Back to {page.section.title}
        </Link>
        <header className={`page-head${written?.art || comp?.art || comp?.preview ? " has-art" : ""}`}>
          <div className="page-head-text">
            <h1>{page.title}</h1>
            <p className="lead">{written?.lead ?? comp?.lead ?? `Description for ${page.title.toLowerCase()} will be added here.`}</p>
          </div>
          {written?.art && <PageArt kind={written.art} />}
          {comp?.art ? (
            <ArtFrame>
              <comp.art />
            </ArtFrame>
          ) : (
            comp?.preview && <div className="page-art page-preview">{comp.preview}</div>
          )}
        </header>

        {activeTab && (
          <nav className="page-tabs" aria-label={`${page.title} documentation`}>
            {COMPONENT_TABS.map((t) => (
              <Link
                key={t.slug}
                href={t.slug === "usage" ? page.href : `${page.href}/${t.slug}`}
                aria-current={t.slug === activeTab ? "page" : undefined}
                scroll={false}
              >
                {t.title}
              </Link>
            ))}
          </nav>
        )}

        {chapters ? (
          <>
            <GuideMap items={chapters} meta={written?.guide?.meta} questions={written?.guide?.questions} />
            <GuideSections items={chapters} />
          </>
        ) : (
          <DocSections items={outline} />
        )}
        <PrevNext href={page.href} />
      </article>
      <Toc key={activeTab ?? page.href} items={toc} />
    </div>
  );
}
