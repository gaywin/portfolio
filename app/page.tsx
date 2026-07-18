import Link from "next/link";
import { getCaseStudies, getSiteSettings } from "../sanity/content";

const Arrow = () => <span aria-hidden="true">↗</span>;

export default async function Home() {
  const [caseStudies,settings]=await Promise.all([getCaseStudies(),getSiteSettings()]);
  return <main className="refined-home">
    <a className="skip-link" href="#main-content">Skip to content</a>
    <section className="dark-shell hero-ref" id="main-content">
      <header className="ref-header page-width">
        <Link className="ref-logo" href="/" aria-label="Gaywin Walters home">gaywin<span>.design</span></Link>
        <nav aria-label="Main navigation"><a href="#work">Work</a><a href="#services">Capabilities</a><a href="#about">About</a><Link href="/resume">Résumé</Link><a href="mailto:hello@gaywinwalters.com">Contact</a></nav>
      </header>
      <div className="hero-grid" aria-hidden="true" />
      <div className="page-width ref-hero-content">
        <div className="discipline-list"><span>Product Strategy</span><i/> <span>UX Design</span><i/> <span>Design Systems</span></div>
        <h1>{settings.hero} <b className="hero-avatar" aria-label="Gaywin Walters">GW</b> {settings.heroSupporting} <em>{settings.heroEmphasis}</em></h1>
        <div className="ref-actions"><a className="blue-button" href={`mailto:${settings.contactEmail}`}>Let’s talk</a><a className="text-arrow" href="#work">View selected work <span>↓</span></a></div>
      </div>
      <div className="proof-strip page-width" aria-label="Career highlights">
        <div><strong>20+</strong><span>years in digital<br/>design & technology</span></div>
        <div><strong>10+</strong><span>years in product<br/>and UX</span></div>
        <div><strong>100K+</strong><span>people reached<br/>by products</span></div>
        <div><strong>0→1</strong><span>concepts to<br/>scaled systems</span></div>
      </div>
    </section>

    <section className="featured-ref" id="work">
      <div className="page-width">
        <p className="ref-label">Featured work</p><h2>Design that gets results</h2>
        <div className="ref-projects">
          {caseStudies.map((study,index)=><Link className={`ref-project ${index % 2 ? "image-left" : ""}`} href={`/work/${study.slug}`} key={study.slug}>
            <div className="project-info"><h3>{study.outcome}</h3><p>{study.overview}</p><div className="card-result"><strong>{study.artStat}</strong><span>{study.results[0]}</span></div></div>
            <div className="project-thumb" data-theme={study.theme}>{study.thumbnailUrl?<img className="cms-project-image" src={study.thumbnailUrl} alt={study.thumbnailAlt||`${study.title} product interface`} />:
              <div className="thumb-window"><div className="thumb-bar"><i/><i/><i/></div><div className="thumb-body"><small>{study.artLabel}</small><b>{study.title}</b><span/><span className="short"/><em>{index===0?"LIVE":index===1?"PORTFOLIO":"REPORTING"}</em></div></div>
            }</div>
          </Link>)}
        </div>
        <Link className="more-link" href="/work/gameon-sportsbozza">Explore the first case study <Arrow /></Link>
      </div>
    </section>

    <section className="services-ref dark-shell" id="services">
      <div className="page-width"><div className="section-lead"><div><p className="ref-label">Capabilities</p><h2>{settings.capabilitiesHeading}</h2></div><p>{settings.capabilitiesIntro}</p></div>
        <div className="service-grid">
          {[["01","Product direction","Opportunity framing, product strategy, zero-to-one definition and cross-functional alignment."],["02","Experience design","Research, interaction design, prototyping and clear workflows for complex products."],["03","Systems at scale","Design systems, operating models and standards that improve quality and speed."],["04","AI-assisted product development","Responsible AI concepts and rapid, testable prototypes that turn emerging capability into useful products."]].map(([n,title,copy])=><article key={n}><span>{n}</span><h3>{title}</h3><p>{copy}</p><ul>{title==="Product direction"?<><li>Product strategy</li><li>Discovery & framing</li><li>Team alignment</li></>:title==="Experience design"?<><li>UX & interaction design</li><li>Prototyping</li><li>Validation</li></>:title==="Systems at scale"?<><li>Design systems</li><li>Governance</li><li>Design operations</li></>:<><li>AI product strategy</li><li>Rapid prototyping</li><li>Human-centred AI</li></>}</ul></article>)}
        </div>
      </div>
    </section>

    <section className="results-ref dark-shell"><div className="page-width"><p className="ref-label">Outcome-oriented approach</p><div className="results-heading"><h2>Design is only useful when it moves something forward.</h2><p>Every engagement is different, but the standard stays the same: make the customer experience clearer and the product more valuable.</p></div><div className="result-rail"><div><strong>100K+</strong><span>sports fans reached</span></div><div><strong>3</strong><span>complex product ecosystems</span></div><div><strong>20+</strong><span>years connecting design and code</span></div><div><strong>1</strong><span>clear source of truth</span></div></div></div></section>

    <section className="about-ref" id="about"><div className="page-width"><p className="ref-label">About</p><div className="about-ref-grid"><h2>{settings.aboutHeading}</h2><div><p className="about-big">{settings.aboutLead}</p><p>{settings.aboutBody}</p><Link className="more-link" href="/resume">View résumé <Arrow /></Link></div></div></div></section>

    <section className="cta-ref dark-shell"><div className="page-width"><p className="ref-label">Let’s work together</p><h2>{settings.contactHeading}</h2><a className="blue-button" href={`mailto:${settings.contactEmail}`}>Get in touch <Arrow /></a></div></section>
    <footer className="ref-footer dark-shell"><div className="page-width"><Link className="ref-logo" href="/">gaywin<span>.design</span></Link><div><a href="#work">Work</a><a href="#services">Capabilities</a><Link href="/resume">Résumé</Link><a href="mailto:hello@gaywinwalters.com">Contact</a></div><p>Senior product designer · Cape Town<br/>© {new Date().getFullYear()} Gaywin Walters</p></div></footer>
  </main>;
}
