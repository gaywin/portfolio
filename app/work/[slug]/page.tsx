import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies, getCaseStudy } from "../case-studies";

export function generateStaticParams() { return caseStudies.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const study = getCaseStudy((await params).slug);
  return study ? { title: `${study.title} — Gaywin Walters`, description: study.outcome } : {};
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const study = getCaseStudy((await params).slug);
  if (!study) notFound();
  const index = caseStudies.findIndex(({ slug }) => slug === study.slug);
  const next = caseStudies[(index + 1) % caseStudies.length];

  return (
    <main className="case-page">
      <a className="skip-link" href="#case-content">Skip to case study</a>
      <header className="site-header shell">
        <Link className="wordmark" href="/" aria-label="Gaywin Walters, home">GW<span>.</span></Link>
        <nav aria-label="Case study navigation"><Link href="/#work">All work</Link><a className="nav-contact" href="mailto:hello@gaywinwalters.com">Let’s talk ↗</a></nav>
      </header>
      <article id="case-content">
        <header className="case-hero shell">
          <p className="eyebrow">{study.sector} · {study.year}</p>
          <h1>{study.outcome}</h1>
          <div className="case-meta"><p>{study.title}</p><p>{study.role}</p></div>
        </header>
        <div className="case-art shell" data-theme={study.theme} aria-hidden="true">
          <div className="case-art-card"><span>{study.artLabel}</span><strong>{study.artStat}</strong><i /></div>
        </div>
        <div className="case-body shell">
          <aside aria-label="Case study contents">
            <p className="eyebrow">In this study</p>
            {caseSections.map((section, i) => <a key={section.id} href={`#${section.id}`}>{String(i + 1).padStart(2, "0")} {section.label}</a>)}
          </aside>
          <div className="case-content">
            <CaseSection id="overview" label="Overview"><p className="case-lead">{study.overview}</p></CaseSection>
            <CaseSection id="outcome" label="Outcome"><h2>{study.outcome}</h2><ul className="results">{study.results.map(result => <li key={result}>{result}</li>)}</ul></CaseSection>
            <CaseSection id="role" label="Role and team"><div className="split"><div><span>Role</span><p>{study.role}</p></div><div><span>Team</span><p>{study.team}</p></div></div></CaseSection>
            <CaseSection id="challenge" label="Challenge"><p>{study.challenge}</p></CaseSection>
            <CaseSection id="insight" label="Customer insight"><blockquote>“{study.insight}”</blockquote></CaseSection>
            <CaseSection id="strategy" label="Strategy"><p>{study.strategy}</p></CaseSection>
            <CaseSection id="decisions" label="Key design decisions"><ol className="decision-list">{study.decisions.map((decision, i) => <li key={decision}><span>0{i + 1}</span><p>{decision}</p></li>)}</ol></CaseSection>
            <CaseSection id="system" label="Design system"><p>{study.system}</p><div className="system-swatch" data-theme={study.theme} aria-label="Illustrative design system tokens"><i/><i/><i/><b/><b/><b/></div></CaseSection>
            <CaseSection id="validation" label="Validation"><p>{study.validation}</p></CaseSection>
            <CaseSection id="results" label="Results"><ul className="results">{study.results.map(result => <li key={result}>{result}</li>)}</ul></CaseSection>
            <CaseSection id="reflection" label="Reflection"><blockquote>“{study.reflection}”</blockquote></CaseSection>
          </div>
        </div>
      </article>
      <section className="next-case"><div className="shell"><p className="eyebrow">Next case study</p><Link href={`/work/${next.slug}`}>{next.outcome}<span>↗</span></Link></div></section>
    </main>
  );
}

const caseSections = [
  ["overview", "Overview"], ["outcome", "Outcome"], ["role", "Role and team"], ["challenge", "Challenge"], ["insight", "Customer insight"], ["strategy", "Strategy"], ["decisions", "Key decisions"], ["system", "Design system"], ["validation", "Validation"], ["results", "Results"], ["reflection", "Reflection"]
].map(([id, label]) => ({ id, label }));

function CaseSection({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return <section id={id} className="case-section"><p className="eyebrow">{label}</p>{children}</section>;
}
