import {getCliClient} from 'sanity/cli'

const client=getCliClient({apiVersion:'2026-07-22'})
const documents=await client.fetch(`*[_type == "caseStudy"]{
  _id,title,outcome,overview,mission,challenge,insight,strategy,decisions,system,designSystemImage,validation,validationImage,
  impactHeading,impactDescription,impactMetrics,results,reflection,contentSections,pageSections,
  summaryHeading,missionHeading,challengeHeading,contributionHeading,contributionDescription
}`)

const metricFromResult=(result,index)=>{
  const bits=result.match(/^([\dK+→]+|one|more than [\d,]+)\s*(.*)$/i)
  return {_type:'sectionMetric',_key:`result-${index}`,value:bits?.[1]||String(index+1).padStart(2,'0'),label:bits?.[2]||result}
}
const regular=(key,heading,description,image)=>({_type:'regularSection',_key:key,hidden:false,heading,description,...(image?{image}:{})})

let transaction=client.transaction()
let updated=0

for(const document of documents){
  if(document.pageSections?.length) continue
  const contribution=document.contributionDescription||[document.overview,document.strategy].filter(Boolean).join(' ')
  const decisions=(document.decisions||[]).map((decision,index)=>`${String(index+1).padStart(2,'0')} — ${decision}`).join('\n')
  const pageSections=[
    {_type:'summarySection',_key:'summary',hidden:false,heading:document.summaryHeading||'Summary',items:[
      {_type:'summaryItem',_key:'mission',heading:document.missionHeading||'Mission',description:document.mission||document.overview||''},
      {_type:'summaryItem',_key:'challenge',heading:document.challengeHeading||'Challenge',description:document.challenge||''},
      {_type:'summaryItem',_key:'contribution',heading:document.contributionHeading||'My contribution',description:contribution||''},
    ]},
    {_type:'impactSection',_key:'impact',hidden:false,heading:document.impactHeading||'Impact',description:document.impactDescription||document.outcome||'',metrics:(document.impactMetrics?.length?document.impactMetrics.map((metric,index)=>({...metric,_type:'sectionMetric',_key:metric._key||`metric-${index}`})):(document.results||[]).map(metricFromResult))},
    regular('problem','Finding the right problem',["A complex product becomes tractable when the team shares a clear view of the customer’s real job.",document.challenge&&`Challenge\n${document.challenge}`,document.insight&&`Customer insight\n${document.insight}`].filter(Boolean).join('\n\n')),
    regular('direction','Turning insight into direction',[document.strategy,decisions&&`Key design decisions\n${decisions}`].filter(Boolean).join('\n\n')),
    regular('design-system','Building for consistency and scale',document.system||'',document.designSystemImage),
    regular('validation','Learning before committing',document.validation||'',document.validationImage),
    ...(document.contentSections||[]).map((section,index)=>regular(section._key||`additional-${index}`,section.heading||'Untitled section',section.text||'',section.image)),
    regular('reflection','Reflection',document.reflection||''),
  ]
  transaction=transaction.patch(document._id,{set:{pageSections}})
  updated++
}

if(updated){
  await transaction.commit()
  console.log(`Migrated ${updated} case studies to editable ordered sections.`)
}else console.log('No case studies needed migration.')
