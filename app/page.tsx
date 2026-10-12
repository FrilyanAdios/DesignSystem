import Link from "next/link";
import { ArrowRight, Component, Rocket } from "lucide-react";
import { SECTIONS, toneAt } from "@/lib/nav";
import { Placeholder } from "@/components/Placeholder";
import { HeroPattern } from "@/components/HeroPattern";

export default function Home() {
  return (
    <>
      <section className="hero hero-split">
        <div className="hero-inner">
          <h1>Esco Design System</h1>
          <p>One shared language of foundations, components, and patterns for building Esco digital products.</p>
          <div className="hero-actions">
            <Link href="/get-started" className="btn btn-primary btn-lg">
              <Rocket size={16} aria-hidden="true" />
              Get started
            </Link>
            <Link href="/components" className="btn btn-lg">
              <Component size={16} aria-hidden="true" />
              Browse components
            </Link>
          </div>
        </div>
        <div className="hero-art">
          <HeroPattern />
        </div>
      </section>

      <div className="home-body">
        <section aria-labelledby="explore">
          <h2 id="explore" className="block-title">Explore the system</h2>
          <div className="card-grid">
            {SECTIONS.map((s, i) => {
              const Icon = s.icon;
              return (
                <Link
                  key={s.slug}
                  href={`/${s.slug}`}
                  className={`card-link tone-${toneAt(i)}`}
                  style={{ "--i": i } as React.CSSProperties}
                >
                  <span className="tile" aria-hidden="true">
                    <Icon size={20} />
                  </span>
                  <h3>{s.title}</h3>
                  <p>{s.description}</p>
                  <ArrowRight size={18} className="go" aria-hidden="true" />
                </Link>
              );
            })}
          </div>
        </section>

        <section aria-labelledby="whats-new">
          <div className="block-head">
            <div>
              <h2 id="whats-new">What&apos;s new</h2>
            </div>
            <Link href="/resources/changelog" className="link-arrow">
              View changelog <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
          <Placeholder />
        </section>
      </div>
    </>
  );
}
