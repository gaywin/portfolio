import {getCliClient} from 'sanity/cli'

const client=getCliClient({apiVersion:'2026-07-23'}).withConfig({perspective:'raw'})
const documents=await client.fetch(`*[_type == "caseStudy"]{
  _id,title,sector,year,role,team,outcome,overview,mission,challenge,insight,strategy,decisions,system,designSystemImage,validation,validationImage,
  impactHeading,impactDescription,impactMetrics,results,reflection,contentSections,pageSections,sectionsVersion,
  summaryHeading,missionHeading,challengeHeading,contributionHeading,contributionDescription
}`)

const metricFromResult=(result,index)=>{
  const bits=result.match(/^([\dK+→]+|one|more than [\d,]+)\s*(.*)$/i)
  return {_type:'sectionMetric',_key:`result-${index}`,value:bits?.[1]||String(index+1).padStart(2,'0'),label:bits?.[2]||result}
}
const imageArray=image=>image?[{...image,_key:image._key||'primary-image'}]:[]
const mainHeadingKeys=new Set(['problem','direction','reflection'])
const headingLevelFor=key=>mainHeadingKeys.has(key)?'h2':'h3'
const regular=(key,heading,description,images=[])=>({_type:'regularSection',_key:key,hidden:false,heading,headingLevel:headingLevelFor(key),description:description||'',images})
const migratedKeys=new Set(['problem','customer-insight','direction','strategy','key-decisions','design-system','validation','reflection'])

let transaction=client.transaction()
let updated=0

for(const document of documents){
  if(document.sectionsVersion>=3) continue

  const existing=document.pageSections||[]
  if(document.sectionsVersion>=2&&existing.length){
    const pageSections=existing.map(section=>{
      if(section._type==='summarySection') return {...section,headingLevel:section.headingLevel||'h2',items:(section.items||[]).map(item=>({...item,headingLevel:item.headingLevel||'h3'})),sidebarItems:section.sidebarItems?.length?section.sidebarItems:[
        {_type:'sidebarItem',_key:'project',heading:'Project',headingLevel:'h3',description:[document.title,document.sector,document.year].filter(Boolean).join('\n')},
        {_type:'sidebarItem',_key:'role-team',heading:'Role & team',headingLevel:'h3',description:[document.role,document.team].filter(Boolean).join('\n')},
        {_type:'sidebarItem',_key:'focus',heading:'Focus',headingLevel:'h3',description:'Product strategy\nExperience design\nDesign systems\nValidation'},
      ]}
      if(section._type==='impactSection') return {...section,headingLevel:section.headingLevel||'h2'}
      return {...section,headingLevel:section.headingLevel||headingLevelFor(section._key)}
    })
    transaction=transaction.patch(document._id,{set:{pageSections,sectionsVersion:3}})
    updated++
    continue
  }
  const existingSummary=existing.find(section=>section._type==='summarySection')
  const existingImpact=existing.find(section=>section._type==='impactSection')
  const contribution=document.contributionDescription||[document.overview,document.strategy].filter(Boolean).join(' ')
  const decisions=(document.decisions||[]).map((decision,index)=>`${String(index+1).padStart(2,'0')} — ${decision}`).join('\n')
  const legacyRegular=new Map(existing.filter(section=>section._type==='regularSection').map(section=>[section._key,section]))
  const customExisting=existing.filter(section=>section._type==='regularSection'&&!migratedKeys.has(section._key)&&!['direction','design-system','validation','problem'].includes(section._key))
  const customLegacy=(document.contentSections||[]).filter(section=>!customExisting.some(existingSection=>existingSection._key===section._key)).map((section,index)=>regular(section._key||`additional-${index}`,section.heading||'Untitled section',section.text||'',imageArray(section.image)))

  const pageSections=[
    existingSummary||{_type:'summarySection',_key:'summary',hidden:false,heading:document.summaryHeading||'Summary',headingLevel:'h2',items:[
      {_type:'summaryItem',_key:'mission',heading:document.missionHeading||'Mission',headingLevel:'h3',description:document.mission||document.overview||''},
      {_type:'summaryItem',_key:'challenge',heading:document.challengeHeading||'Challenge',headingLevel:'h3',description:document.challenge||''},
      {_type:'summaryItem',_key:'contribution',heading:document.contributionHeading||'My contribution',headingLevel:'h3',description:contribution||''},
    ],sidebarItems:[
      {_type:'sidebarItem',_key:'project',heading:'Project',headingLevel:'h3',description:[document.title,document.sector,document.year].filter(Boolean).join('\n')},
      {_type:'sidebarItem',_key:'role-team',heading:'Role & team',headingLevel:'h3',description:[document.role,document.team].filter(Boolean).join('\n')},
      {_type:'sidebarItem',_key:'focus',heading:'Focus',headingLevel:'h3',description:'Product strategy\nExperience design\nDesign systems\nValidation'},
    ]},
    existingImpact||{_type:'impactSection',_key:'impact',hidden:false,heading:document.impactHeading||'Impact',headingLevel:'h2',description:document.impactDescription||document.outcome||'',metrics:(document.impactMetrics?.length?document.impactMetrics.map((metric,index)=>({...metric,_type:'sectionMetric',_key:metric._key||`metric-${index}`})):(document.results||[]).map(metricFromResult))},
    regular('problem',legacyRegular.get('problem')?.heading||'Finding the right problem','A complex product becomes tractable when the team shares a clear view of the customer’s real job.'),
    regular('customer-insight','Customer insight',document.insight||''),
    regular('direction',legacyRegular.get('direction')?.heading||'Turning insight into direction',''),
    regular('strategy','Strategy',document.strategy||''),
    regular('key-decisions','Key design decisions',decisions),
    regular('design-system','Design system',document.system||'',legacyRegular.get('design-system')?.images||imageArray(legacyRegular.get('design-system')?.image||document.designSystemImage)),
    regular('validation','Validation',document.validation||'',legacyRegular.get('validation')?.images||imageArray(legacyRegular.get('validation')?.image||document.validationImage)),
    ...customExisting.map(section=>({...section,images:section.images||imageArray(section.image)})),
    ...customLegacy,
    regular('reflection','Reflection',document.reflection||''),
  ]

  transaction=transaction.patch(document._id,{set:{pageSections,sectionsVersion:3}})
  updated++
}

if(updated){
  await transaction.commit()
  console.log(`Upgraded ${updated} published/draft case studies with heading levels and editable sidebars.`)
}else console.log('All case studies already use fully flexible sections.')
