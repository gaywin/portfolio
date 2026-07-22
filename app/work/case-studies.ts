export type ImpactMetric = {value: string; label: string}
export type FlexibleSection = {
  _key?: string
  heading?: string
  text?: string
  imageUrl?: string
  imageAlt?: string
}
export type PageSection = {
  _key?: string
  _type: 'summarySection' | 'regularSection' | 'impactSection'
  hidden?: boolean
  heading?: string
  description?: string
  imageUrl?: string
  imageAlt?: string
  metrics?: ImpactMetric[]
  items?: Array<{_key?:string; heading?:string; description?:string}>
}

export type CaseStudy = {
  slug: string; title: string; sector: string; year: string; theme: string;
  outcome: string; artLabel: string; artStat: string; overview: string;
  role: string; team: string; mission?: string; challenge: string; insight: string; strategy: string;
  decisions: string[]; system: string; validation: string; results: string[]; reflection: string;
  impactHeading?: string; impactDescription?: string; impactMetrics?: ImpactMetric[];
  showImpact?: boolean;
  summaryHeading?: string; missionHeading?: string; challengeHeading?: string;
  contributionHeading?: string; contributionDescription?: string;
  designSystemImageUrl?: string; designSystemImageAlt?: string;
  validationImageUrl?: string; validationImageAlt?: string;
  contentSections?: FlexibleSection[];
  pageSections?: PageSection[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "gameon-sportsbozza", title: "GameOn + SportsBozza", sector: "Sports · Platform", year: "2024", theme: "lime",
    outcome: "Opening the game to 100K+ underserved sports fans.", artLabel: "LIVE SCORES", artStat: "100K+ fans",
    overview: "A mobile-first sports ecosystem designed to bring local fixtures, scores and community stories to audiences overlooked by mainstream platforms.",
    role: "Lead product designer", team: "Product, engineering, editorial, community partners", mission: "Bring reliable local sports coverage to the fans and communities overlooked by mainstream platforms.", challenge: "Create one coherent experience across live scores, local content and community participation, while working within real device and connectivity constraints.",
    insight: "Fans did not need another global sports feed. They needed reliable, low-friction access to the teams and competitions closest to them.",
    strategy: "Prioritise immediacy, local relevance and low-data interaction; then establish a shared platform language that could support two distinct brands.",
    decisions: ["Put live and upcoming fixtures at the centre of the home experience.", "Design compact information patterns for fast scanning on smaller screens.", "Create clear contribution pathways for community correspondents."],
    system: "A shared token and component foundation gave both products consistency while preserving their individual voices.", validation: "Prototype testing with sports fans and editorial teams shaped navigation, score density and contribution flows before release.",
    results: ["Reached more than 100,000 sports fans", "Established a scalable two-brand product foundation", "Improved access to local and community sport"], reflection: "The strongest product decision was to treat access—not feature volume—as the measure of quality."
  },
  {
    slug: "wealth-migrate", title: "Wealth Migrate", sector: "Fintech · Investment", year: "2022", theme: "violet",
    outcome: "Turning global property investing into one clear, trusted journey.", artLabel: "PORTFOLIO", artStat: "1 platform",
    overview: "A redesign of an international property-investment platform, unifying discovery, due diligence, transactions and portfolio management.",
    role: "Senior product designer", team: "Founders, product, compliance, engineering", mission: "Make international property investment understandable and trustworthy from first discovery to portfolio management.", challenge: "Reduce the cognitive and trust barriers of cross-border investment without hiding the detail people need for confident decisions.",
    insight: "Customers were not struggling with a lack of information; they were struggling to understand what mattered, when, and why it could be trusted.",
    strategy: "Structure the journey around progressive confidence—from opportunity discovery through evidence, commitment and ongoing performance.",
    decisions: ["Reframe investment cards around decision-critical signals.", "Use progressive disclosure for legal and financial complexity.", "Make portfolio status and next actions visible at a glance."],
    system: "A modular financial-product system standardised data display, risk states, documents and transaction steps.", validation: "Moderated concept testing and task-based prototype sessions exposed trust gaps and helped simplify key investment decisions.",
    results: ["Unified a fragmented investment journey", "Made complex opportunity data easier to compare", "Created a foundation for faster product delivery"], reflection: "Clarity builds trust when it preserves the important detail and removes only the work of interpreting it."
  },
  {
    slug: "impact-platform", title: "Impact platform redesign", sector: "Enterprise · Impact", year: "2023", theme: "orange",
    outcome: "Making complex impact data useful—from field teams to the boardroom.", artLabel: "IMPACT", artStat: "1 source of truth",
    overview: "A platform redesign that transformed fragmented impact data into clear workflows, comparable evidence and decision-ready reporting.",
    role: "Product design lead", team: "Product, data, engineering, customer success", mission: "Turn fragmented impact reporting into a shared, decision-ready view of progress.", challenge: "Serve users with very different levels of expertise while improving data quality across long, interdependent reporting workflows.",
    insight: "Reporting felt like administration because the platform captured data without showing users how their work contributed to the bigger outcome.",
    strategy: "Connect everyday tasks to a visible impact narrative, while making system status, ownership and quality unmistakable.",
    decisions: ["Organise the platform around outcomes rather than internal data structures.", "Introduce guided workflows with visible completion and ownership.", "Build reusable patterns for evidence, indicators and reporting."],
    system: "A role-aware design system aligned dense data tables, guided tasks and executive summaries across the product.", validation: "Workflow mapping, customer interviews and iterative prototypes were used to test both expert and occasional-user paths.",
    results: ["Created one coherent model for impact work", "Reduced ambiguity across complex reporting tasks", "Enabled reusable, role-aware product patterns"], reflection: "A system becomes useful when every user can see both the next action and the meaning behind it."
  }
];

export function getCaseStudy(slug: string) { return caseStudies.find((study) => study.slug === slug); }
