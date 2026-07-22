import {defineArrayMember, defineField, defineType, type SchemaTypeDefinition} from 'sanity'
import {ColorInput} from '../components/ColorInput'

const siteSettings = defineType({
  name: 'siteSettings', title: 'Homepage', type: 'document',
  fields: [
    defineField({name:'hero', title:'Hero statement', type:'text', rows:3, validation:r=>r.required()}),
    defineField({name:'heroSupporting', title:'Hero supporting statement', type:'text', rows:2}),
    defineField({name:'heroEmphasis', title:'Hero emphasis', type:'string', description:'The final highlighted phrase.'}),
    defineField({name:'capabilitiesHeading', title:'Capabilities heading', type:'string'}),
    defineField({name:'capabilitiesIntro', title:'Capabilities introduction', type:'text', rows:3}),
    defineField({name:'aboutHeading', title:'About heading', type:'string'}),
    defineField({name:'aboutLead', title:'About lead', type:'text', rows:3}),
    defineField({name:'aboutBody', title:'About body', type:'text', rows:5}),
    defineField({name:'contactHeading', title:'Contact heading', type:'string'}),
    defineField({name:'contactEmail', title:'Contact email', type:'string'}),
  ],
  preview:{prepare:()=>({title:'Homepage content'})},
})

const caseStudy = defineType({
  name:'caseStudy', title:'Case studies', type:'document',
  fields:[
    defineField({name:'title', title:'Project title', type:'string', validation:r=>r.required()}),
    defineField({name:'slug', title:'URL slug', type:'slug', options:{source:'title'}, validation:r=>r.required()}),
    defineField({name:'order', title:'Display order', type:'number', initialValue:10}),
    defineField({name:'sector', title:'Sector', type:'string'}),
    defineField({name:'year', title:'Year', type:'string'}),
    defineField({
      name:'theme', title:'Project colour', type:'string',
      description:'Used for the homepage thumbnail and case-study accents.',
      initialValue:'#C8FF00', components:{input:ColorInput},
      validation:rule=>rule.regex(/^#[0-9A-Fa-f]{6}$/, {name:'hex colour'}).error('Enter a valid six-digit colour such as #C8FF00.'),
    }),
    defineField({name:'thumbnail', title:'Project thumbnail', type:'image', options:{hotspot:true}, fields:[defineField({name:'alt',title:'Alternative text',type:'string',validation:r=>r.required()})]}),
    defineField({name:'heroImage', title:'Case-study hero image', type:'image', options:{hotspot:true}, fields:[defineField({name:'alt',title:'Alternative text',type:'string',validation:r=>r.required()})]}),
    defineField({name:'outcome', title:'Outcome-led headline', type:'text', rows:3, validation:r=>r.required()}),
    defineField({name:'artLabel', title:'Card label', type:'string'}),
    defineField({name:'artStat', title:'Headline metric', type:'string'}),
    defineField({name:'overview', title:'Overview', type:'text', rows:4}),
    defineField({name:'role', title:'Role', type:'string'}),
    defineField({name:'team', title:'Team', type:'text', rows:2}),
    defineField({name:'mission', title:'Mission', type:'text', rows:5, description:'What the project set out to achieve.'}),
    defineField({name:'challenge', title:'Challenge', type:'text', rows:5}),
    defineField({name:'summaryHeading', title:'Summary heading', type:'string', initialValue:'Summary'}),
    defineField({name:'missionHeading', title:'Mission heading', type:'string', initialValue:'Mission'}),
    defineField({name:'challengeHeading', title:'Challenge heading', type:'string', initialValue:'Challenge'}),
    defineField({name:'contributionHeading', title:'Contribution heading', type:'string', initialValue:'My contribution'}),
    defineField({name:'contributionDescription', title:'Contribution description', type:'text', rows:5, description:'If left empty, Overview and Strategy are used.'}),
    defineField({name:'insight', title:'Customer insight', type:'text', rows:5}),
    defineField({name:'strategy', title:'Strategy', type:'text', rows:5}),
    defineField({name:'decisions', title:'Key design decisions', type:'array', of:[defineArrayMember({type:'string'})]}),
    defineField({name:'system', title:'Design system', type:'text', rows:5}),
    defineField({name:'designSystemImage', title:'Design system image', type:'image', options:{hotspot:true}, fields:[defineField({name:'alt',title:'Alternative text',type:'string',validation:r=>r.required()})]}),
    defineField({name:'validation', title:'Validation', type:'text', rows:5}),
    defineField({name:'validationImage', title:'Validation — Learning before committing image', type:'image', options:{hotspot:true}, fields:[defineField({name:'alt',title:'Alternative text',type:'string',validation:r=>r.required()})]}),
    defineField({name:'impactHeading', title:'Impact heading', type:'string', description:'The main headline for the Impact section.'}),
    defineField({name:'impactDescription', title:'Impact description', type:'text', rows:4}),
    defineField({name:'showImpact', title:'Show legacy Impact section', type:'boolean', initialValue:true, description:'Turn this off to hide the existing Impact section. Impact sections inside the ordered list have their own visibility control.'}),
    defineField({name:'impactMetrics', title:'Impact metrics', type:'array', of:[defineArrayMember({type:'object', name:'impactMetric', title:'Metric', fields:[defineField({name:'value',title:'Metric value',type:'string',validation:r=>r.required()}),defineField({name:'label',title:'Metric description',type:'text',rows:2,validation:r=>r.required()})], preview:{select:{title:'value',subtitle:'label'}}})]}),
    defineField({name:'results', title:'Results', type:'array', of:[defineArrayMember({type:'string'})]}),
    defineField({name:'reflection', title:'Reflection', type:'text', rows:5}),
    defineField({
      name:'pageSections', title:'Case-study page sections', type:'array',
      description:'Add, remove with the minus menu, and drag sections into the order you want. When this list is empty, the existing case-study layout is used.',
      of:[
        defineArrayMember({
          type:'object', name:'regularSection', title:'Regular section',
          initialValue:{heading:'New section'},
          fields:[
            defineField({name:'hidden',title:'Hide this section',type:'boolean',initialValue:false}),
            defineField({name:'heading',title:'Heading',type:'string',validation:rule=>rule.required()}),
            defineField({name:'description',title:'Description',type:'text',rows:7}),
            defineField({name:'image',title:'Image',type:'image',options:{hotspot:true},fields:[defineField({name:'alt',title:'Alternative text',type:'string'})]}),
          ],
          preview:{select:{title:'heading',subtitle:'description',media:'image',hidden:'hidden'},prepare:({title,subtitle,media,hidden})=>({title:`${hidden?'Hidden — ':''}${title||'Untitled section'}`,subtitle,media})},
        }),
        defineArrayMember({
          type:'object', name:'impactSection', title:'Impact section',
          initialValue:{heading:'Impact',hidden:false},
          fields:[
            defineField({name:'hidden',title:'Hide Impact section',type:'boolean',initialValue:false}),
            defineField({name:'heading',title:'Heading',type:'string',initialValue:'Impact',validation:rule=>rule.required()}),
            defineField({name:'description',title:'Description',type:'text',rows:5}),
            defineField({name:'metrics',title:'Metrics',type:'array',of:[defineArrayMember({type:'object',name:'sectionMetric',title:'Metric',fields:[defineField({name:'value',title:'Metric value',type:'string',validation:rule=>rule.required()}),defineField({name:'label',title:'Metric description',type:'text',rows:2,validation:rule=>rule.required()})],preview:{select:{title:'value',subtitle:'label'}}})]}),
          ],
          preview:{select:{title:'heading',subtitle:'description',hidden:'hidden'},prepare:({title,subtitle,hidden})=>({title:`${hidden?'Hidden — ':''}${title||'Impact'}`,subtitle})},
        }),
      ],
    }),
    defineField({name:'contentSections', title:'Legacy additional sections', type:'array', hidden:true, description:'Kept for compatibility with previously published content.', of:[defineArrayMember({type:'object', name:'contentSection', title:'Content section', fields:[defineField({name:'heading',title:'Heading',type:'string'}),defineField({name:'text',title:'Text',type:'text',rows:6}),defineField({name:'image',title:'Image',type:'image',options:{hotspot:true},fields:[defineField({name:'alt',title:'Alternative text',type:'string'})]})], preview:{select:{title:'heading',subtitle:'text',media:'image'},prepare:({title,subtitle,media})=>({title:title||'Untitled section',subtitle,media})}})]}),
  ],
  preview:{select:{title:'title',subtitle:'outcome',media:'thumbnail'}},
})

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [siteSettings, caseStudy],
}
