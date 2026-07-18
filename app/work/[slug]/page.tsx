import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCaseStudies, getCaseStudy } from "../../../sanity/content";

export async function generateStaticParams(){return (await getCaseStudies()).map(({slug})=>({slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const study=await getCaseStudy((await params).slug);return study?{title:`${study.title} — Gaywin Walters`,description:study.outcome}:{};}

export default async function CaseStudyPage({params}:{params:Promise<{slug:string}>}){
 const caseStudies=await getCaseStudies();
 const requestedSlug=(await params).slug;
 const study=caseStudies.find(({slug})=>slug===requestedSlug); if(!study)notFound();
 const index=caseStudies.findIndex(({slug})=>slug===study.slug); const next=caseStudies[(index+1)%caseStudies.length];
 return <main className="case-ref-page">
  <a className="skip-link" href="#case-main">Skip to case study</a>
  <div className="case-dark">
   <header className="ref-header page-width"><Link className="ref-logo" href="/">gaywin<span>.design</span></Link><nav aria-label="Case study navigation"><Link href="/#work">Work</Link><Link href="/resume">Résumé</Link><a href="mailto:hello@gaywinwalters.com">Contact</a></nav></header>
   <div className="page-width case-title"><p>{study.sector} · {study.year}</p><h1>{study.outcome}</h1></div>
  </div>
  <div className={`page-width case-hero-ref${study.heroImageUrl?' has-cms-image':''}`} data-theme={study.theme} aria-label={`${study.title} product overview`}>
   {study.heroImageUrl?<img className="cms-case-image" src={study.heroImageUrl} alt={study.heroImageAlt||`${study.title} product interface`} />:<><div className="case-screen"><div className="screen-chrome"><i/><i/><i/><span>{study.title}</span></div><div className="screen-layout"><aside><b>GW</b><span/><span/><span/><span/></aside><div><small>{study.artLabel}</small><h2>{study.artStat}</h2><p>{study.overview}</p><div className="screen-panels"><i/><i/><i/></div></div></div></div>
   <div className="phone-screen"><span>{study.artLabel}</span><b>{study.artStat}</b><i/><i/><i/></div></>}
  </div>

  <article id="case-main" className="case-ref-content">
   <section className="page-width case-summary"><h2>Summary</h2><div className="summary-grid"><div className="summary-main"><h3>Mission</h3><p>{study.challenge}</p><h3>My contribution</h3><p>{study.overview} {study.strategy}</p></div><aside><h3>Project</h3><p>{study.title}<br/>{study.sector}<br/>{study.year}</p><h3>Role & team</h3><p><strong>{study.role}</strong><br/>{study.team}</p><h3>Focus</h3><ul><li>Product strategy</li><li>Experience design</li><li>Design systems</li><li>Validation</li></ul></aside></div></section>

   <section className="impact-ref"><div className="page-width"><div className="impact-intro"><p className="ref-label">Impact</p><h2>{study.outcome}</h2></div><div className="impact-grid">{study.results.map((result,i)=>{const bits=result.match(/^([\dK+→]+|one|more than [\d,]+)\s*(.*)$/i);return <div key={result}><strong>{bits?.[1]||["01","02","03"][i]}</strong><span>{bits?.[2]||result}</span></div>})}</div></div></section>

   <section className="page-width story-ref">
    <div className="story-block"><h2>Finding the right problem</h2><p className="story-lead">A complex product becomes tractable when the team shares a clear view of the customer’s real job.</p><div className="story-copy"><div><h3>Challenge</h3><p>{study.challenge}</p></div><div><h3>Customer insight</h3><p>{study.insight}</p></div></div></div>
    <CaseVisual theme={study.theme} type="flow" label="Journey and opportunity map" />
    <div className="story-block narrow"><h2>Turning insight into direction</h2><p>{study.strategy}</p><h3>Key design decisions</h3><ol>{study.decisions.map((decision,i)=><li key={decision}><span>0{i+1}</span><p>{decision}</p></li>)}</ol></div>
    <CaseVisual theme={study.theme} type="wireframes" label="Product structure and key flows" />
    <div className="story-block split-story"><div><p className="ref-label">Design system</p><h2>Building for consistency and scale</h2></div><p>{study.system}</p></div>
    <CaseVisual theme={study.theme} type="system" label="Reusable product system" />
    <div className="story-block split-story"><div><p className="ref-label">Validation</p><h2>Learning before committing</h2></div><p>{study.validation}</p></div>
    <div className="validation-board" data-theme={study.theme}><div><span>01</span><b>Frame</b></div><i>→</i><div><span>02</span><b>Prototype</b></div><i>→</i><div><span>03</span><b>Validate</b></div><i>→</i><div><span>04</span><b>Refine</b></div></div>
    <div className="story-block reflection"><p className="ref-label">Reflection</p><blockquote>“{study.reflection}”</blockquote></div>
   </section>
  </article>

  <section className="case-cta"><div className="page-width"><p className="ref-label">Have a complex product that needs clarity?</p><h2>Let’s make the next outcome matter.</h2><a className="blue-button" href="mailto:hello@gaywinwalters.com">Get in touch ↗</a></div></section>
  <section className="more-work"><div className="page-width"><p className="ref-label">Next project</p><Link href={`/work/${next.slug}`}><span><b>{next.title}</b><small>{next.sector}</small></span><strong>{next.outcome}</strong><i>↗</i></Link><Link className="all-work" href="/#work">View all work</Link></div></section>
 </main>;
}

function CaseVisual({theme,type,label}:{theme:string;type:"flow"|"wireframes"|"system";label:string}){
 return <figure className={`case-visual-ref ${type}`} data-theme={theme}><div className="visual-canvas">
  {type==="flow"?<><div className="flow-node"><small>01</small><b>Discover</b><span>Customer signal</span></div><i>→</i><div className="flow-node"><small>02</small><b>Define</b><span>Product direction</span></div><i>→</i><div className="flow-node"><small>03</small><b>Deliver</b><span>Scalable system</span></div></>:null}
  {type==="wireframes"?<><div className="wire phone"><i/><b/><span/><span/><span/></div><div className="wire desktop"><i/><b/><span/><span/><span/><span/></div><div className="wire phone alt"><i/><b/><span/><span/></div></>:null}
  {type==="system"?<><div className="token"><i/><b>Colour</b><span>Semantic tokens</span></div><div className="token"><strong>Aa</strong><b>Type</b><span>Clear hierarchy</span></div><div className="token components"><i/><i/><i/><b>Components</b><span>Reusable patterns</span></div></>:null}
 </div><figcaption>{label}</figcaption></figure>;
}
