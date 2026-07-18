import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Résumé — Gaywin Walters", description: "Experience and capabilities of senior product designer Gaywin Walters." };

export default function ResumePage() {
  return <main className="resume-page">
    <header className="site-header shell"><Link className="wordmark" href="/">GW<span>.</span></Link><nav><Link href="/">Portfolio</Link><a className="nav-contact" href="mailto:hello@gaywinwalters.com">Contact ↗</a></nav></header>
    <article className="shell resume">
      <div className="resume-head"><p className="eyebrow">Résumé · Cape Town, South Africa</p><h1>Gaywin<br/><em>Walters</em></h1><p>Senior product designer connecting strategy, craft, systems and technology to make complex digital products clear and scalable.</p></div>
      <section><p className="eyebrow">Profile</p><div><p className="resume-lead">10+ years in product and UX, backed by more than 20 years in digital design and front-end development.</p><p>Experienced across zero-to-one concepts, scaled platforms, design systems and AI-assisted product development.</p></div></section>
      <section><p className="eyebrow">Selected work</p><div className="resume-items"><p><strong>GameOn + SportsBozza</strong><span>Sports platform · Reached 100K+ fans</span></p><p><strong>Wealth Migrate</strong><span>Global property investment platform</span></p><p><strong>Impact platform</strong><span>Enterprise impact data and reporting</span></p></div></section>
      <section><p className="eyebrow">Core capabilities</p><div className="resume-tags"><span>Product direction</span><span>Experience design</span><span>Design systems</span><span>Research & validation</span><span>Prototyping</span><span>AI-assisted products</span><span>Front-end fluency</span></div></section>
      <section><p className="eyebrow">Contact</p><div><a className="resume-email" href="mailto:hello@gaywinwalters.com">hello@gaywinwalters.com ↗</a><p>For a detailed employment history or references, please get in touch.</p></div></section>
    </article>
  </main>;
}
