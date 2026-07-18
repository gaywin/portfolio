import Link from "next/link";
import { Reveal } from "./reveal";
import { caseStudies } from "./work/case-studies";

const Arrow = () => <span aria-hidden="true">↗</span>;

export default function Home() {
  return (
    <main>
      <a className="skip-link" href="#content">Skip to content</a>
      <header className="site-header shell">
        <Link className="wordmark" href="/" aria-label="Gaywin Walters, home">GW<span>.</span></Link>
        <nav aria-label="Main navigation">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a className="nav-contact" href="mailto:hello@gaywinwalters.com">Let’s talk <Arrow /></a>
        </nav>
      </header>

      <div id="content">
        <section className="hero shell" aria-labelledby="hero-title">
          <p className="eyebrow hero-kicker">Senior product designer · Cape Town</p>
          <h1 id="hero-title">I turn complex products into <em>clear, scalable</em> experiences.</h1>
          <div className="hero-footer">
            <p>From zero-to-one concepts to platforms used by hundreds of thousands of people—connecting product strategy, systems thinking and hands-on craft.</p>
            <a className="circle-link" href="#work" aria-label="Explore selected work"><span>Explore<br/>work</span><b aria-hidden="true">↓</b></a>
          </div>
        </section>

        <Reveal className="metrics shell" as="section" aria-label="Experience highlights">
          <div><strong>10+</strong><span>years in product<br/>and UX</span></div>
          <div><strong>20+</strong><span>years shaping<br/>digital experiences</span></div>
          <div><strong>100K+</strong><span>people reached by<br/>products designed</span></div>
          <div><strong>0→1</strong><span>concepts through<br/>to scaled systems</span></div>
        </Reveal>

        <section className="work shell" id="work" aria-labelledby="work-title">
          <Reveal className="section-heading">
            <p className="eyebrow">01 — Selected work</p>
            <h2 id="work-title">Outcomes, not<br/><em>ornament.</em></h2>
          </Reveal>
          <div className="project-list">
            {caseStudies.map((study, index) => (
              <Reveal className="project" key={study.slug}>
                <Link className="project-visual" data-theme={study.theme} href={`/work/${study.slug}`} aria-label={`Read ${study.title} case study: ${study.outcome}`}>
                  <span className="project-index">0{index + 1}</span>
                  <div className="ui-art" aria-hidden="true">
                    <span className="ui-top" />
                    <strong>{study.artLabel}</strong>
                    <span className="ui-copy" />
                    <span className="ui-copy short" />
                    <i>{study.artStat}</i>
                  </div>
                  <span className="project-arrow"><Arrow /></span>
                </Link>
                <div className="project-copy">
                  <p className="eyebrow">{study.sector}</p>
                  <h3><Link href={`/work/${study.slug}`}>{study.outcome}</Link></h3>
                  <div><span>{study.title}</span><span>{study.year}</span></div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="capabilities shell" aria-labelledby="cap-title">
          <Reveal className="cap-intro">
            <p className="eyebrow">02 — Capabilities</p>
            <h2 id="cap-title">Strategy with sleeves<br/><em>rolled up.</em></h2>
          </Reveal>
          <div className="cap-list">
            {[
              ["Product direction", "Framing ambiguous opportunities, aligning teams and turning customer and business signals into a focused product path."],
              ["Experience design", "Making complex workflows feel coherent through research, interaction design, prototyping and thoughtful content."],
              ["Systems at scale", "Building design systems, operating models and shared standards that help product teams move with consistency."],
              ["AI-assisted products", "Using AI as both a product capability and a force multiplier—from responsible concepts to rapid, testable prototypes."],
            ].map(([title, copy], index) => (
              <Reveal className="cap-row" key={title}>
                <span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="about shell" id="about" aria-labelledby="about-title">
          <Reveal className="about-label"><p className="eyebrow">03 — About</p></Reveal>
          <Reveal className="about-copy">
            <h2 id="about-title">Designer, builder and systems thinker.</h2>
            <p className="lead">I’m Gaywin Walters, a senior product designer based in Cape Town. For more than two decades, I’ve worked where design, technology and business meet.</p>
            <div className="about-columns">
              <p>I started in digital design and front-end development before moving deeper into product and UX. That technical foundation still shapes how I work: I understand the systems beneath the interface and design with delivery in mind.</p>
              <p>Today, I help teams find clarity in complex spaces—setting direction, bringing people together, building scalable systems and staying close enough to the craft to make the details count.</p>
            </div>
          </Reveal>
        </section>

        <section className="contact" aria-labelledby="contact-title">
          <div className="shell contact-inner">
            <p className="eyebrow">Available for the right next challenge</p>
            <h2 id="contact-title">Let’s make something<br/><em>matter.</em></h2>
            <div className="contact-actions">
              <a className="button light" href="mailto:hello@gaywinwalters.com">Start a conversation <Arrow /></a>
              <Link className="button text" href="/resume">View résumé <Arrow /></Link>
            </div>
            <footer><span>© {new Date().getFullYear()} Gaywin Walters</span><span>Cape Town · South Africa</span><a href="#content">Back to top ↑</a></footer>
          </div>
        </section>
      </div>
    </main>
  );
}
