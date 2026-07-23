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
    defineField({name:'mission', title:'Mission', type:'text', rows:5, hidden:true}),
    defineField({name:'challenge', title:'Challenge', type:'text', rows:5, hidden:true}),
    defineField({name:'summaryHeading', title:'Summary heading', type:'string', hidden:true}),
    defineField({name:'missionHeading', title:'Mission heading', type:'string', hidden:true}),
    defineField({name:'challengeHeading', title:'Challenge heading', type:'string', hidden:true}),
    defineField({name:'contributionHeading', title:'Contribution heading', type:'string', hidden:true}),
    defineField({name:'contributionDescription', title:'Contribution description', type:'text', rows:5, hidden:true}),
    defineField({name:'insight', title:'Customer insight', type:'text', rows:5, hidden:true}),
    defineField({name:'strategy', title:'Strategy', type:'text', rows:5, hidden:true}),
    defineField({name:'decisions', title:'Key design decisions', type:'array', hidden:true, of:[defineArrayMember({type:'string'})]}),
    defineField({name:'system', title:'Design system', type:'text', rows:5, hidden:true}),
    defineField({name:'designSystemImage', title:'Design system image', type:'image', hidden:true, options:{hotspot:true}}),
    defineField({name:'validation', title:'Validation', type:'text', rows:5, hidden:true}),
    defineField({name:'validationImage', title:'Validation image', type:'image', hidden:true, options:{hotspot:true}}),
    defineField({name:'impactHeading', title:'Impact heading', type:'string', hidden:true}),
    defineField({name:'impactDescription', title:'Impact description', type:'text', rows:4, hidden:true}),
    defineField({name:'showImpact', title:'Show legacy Impact section', type:'boolean', hidden:true}),
    defineField({name:'impactMetrics', title:'Impact metrics', type:'array', hidden:true, of:[defineArrayMember({type:'object', name:'impactMetric', fields:[defineField({name:'value',type:'string'}),defineField({name:'label',type:'text'})]})]}),
    defineField({name:'results', title:'Results', type:'array', hidden:true, of:[defineArrayMember({type:'string'})]}),
    defineField({name:'reflection', title:'Reflection', type:'text', rows:5, hidden:true}),
    defineField({
      name:'pageSections', title:'Flexible case-study sections', type:'array',
      description:'Every visible heading lives here. Click any section to edit its heading, description and images. Drag sections to reorder them, or use the item menu to duplicate or remove them.',
      of:[
        defineArrayMember({
          type:'object', name:'summarySection', title:'Summary section',
          initialValue:{heading:'Summary',headingLevel:'h2',items:[{_type:'summaryItem',_key:'mission',heading:'Mission',headingLevel:'h3',description:''},{_type:'summaryItem',_key:'challenge',heading:'Challenge',headingLevel:'h3',description:''},{_type:'summaryItem',_key:'contribution',heading:'My contribution',headingLevel:'h3',description:''}],sidebarItems:[{_type:'sidebarItem',_key:'project',heading:'Project',headingLevel:'h3',description:''},{_type:'sidebarItem',_key:'role-team',heading:'Role & team',headingLevel:'h3',description:''},{_type:'sidebarItem',_key:'focus',heading:'Focus',headingLevel:'h3',description:''}]},
          fields:[
            defineField({name:'hidden',title:'Hide this section',type:'boolean',initialValue:false}),
            defineField({name:'heading',title:'Section heading',type:'string',initialValue:'Summary',validation:rule=>rule.required()}),
            defineField({name:'headingLevel',title:'Summary heading size',type:'string',initialValue:'h2',options:{list:[{title:'H2 — main heading',value:'h2'},{title:'H3 — subheading',value:'h3'}],layout:'dropdown'}}),
            defineField({name:'items',title:'Left-column content',type:'array',description:'Click an item to edit its heading, heading size and description. Drag to reorder or remove it.',of:[defineArrayMember({type:'object',name:'summaryItem',title:'Heading and description',initialValue:{heading:'New heading',headingLevel:'h3'},fields:[defineField({name:'heading',title:'Heading',type:'string',validation:rule=>rule.required()}),defineField({name:'headingLevel',title:'Heading size',type:'string',initialValue:'h3',options:{list:[{title:'H3 — standard',value:'h3'},{title:'H2 — main heading',value:'h2'}],layout:'dropdown'}}),defineField({name:'description',title:'Description',type:'text',rows:6})],preview:{select:{title:'heading',subtitle:'description',level:'headingLevel'},prepare:({title,subtitle,level})=>({title:title||'Untitled heading',subtitle:`${(level||'h3').toUpperCase()} · ${subtitle||''}`})}})]}),
            defineField({name:'sidebarItems',title:'Right-column content',type:'array',description:'Project, Role & team and Focus are fully editable. Click, drag, add or remove them just like the left column.',of:[defineArrayMember({type:'object',name:'sidebarItem',title:'Right-column item',initialValue:{heading:'New heading',headingLevel:'h3'},fields:[defineField({name:'heading',title:'Heading',type:'string',validation:rule=>rule.required()}),defineField({name:'headingLevel',title:'Heading size',type:'string',initialValue:'h3',options:{list:[{title:'H3 — standard',value:'h3'},{title:'H2 — main heading',value:'h2'}],layout:'dropdown'}}),defineField({name:'description',title:'Description',type:'text',rows:5})],preview:{select:{title:'heading',subtitle:'description',level:'headingLevel'},prepare:({title,subtitle,level})=>({title:title||'Untitled right-column item',subtitle:`${(level||'h3').toUpperCase()} · ${subtitle||''}`})}})]}),
          ],
          preview:{select:{title:'heading',hidden:'hidden'},prepare:({title,hidden})=>({title:`${hidden?'Hidden — ':''}${title||'Summary'}`,subtitle:'Editable and reorderable summary content'})},
        }),
        defineArrayMember({
          type:'object', name:'regularSection', title:'Heading, text and images',
          initialValue:{heading:'New section',headingLevel:'h3'},
          fields:[
            defineField({name:'hidden',title:'Hide this section',type:'boolean',initialValue:false}),
            defineField({name:'heading',title:'Heading',type:'string',validation:rule=>rule.required()}),
            defineField({name:'headingLevel',title:'Heading size',type:'string',initialValue:'h3',description:'H3 is standard. Choose H2 to start a new main group; following H3 sections will sit closer beneath it.',options:{list:[{title:'H3 — standard',value:'h3'},{title:'H2 — main heading',value:'h2'}],layout:'dropdown'}}),
            defineField({name:'description',title:'Description',type:'text',rows:7}),
            defineField({name:'images',title:'Images',type:'array',description:'Add, remove and reorder as many images as this section needs.',of:[defineArrayMember({type:'image',options:{hotspot:true},fields:[defineField({name:'alt',title:'Alternative text',type:'string'})]})]}),
            defineField({name:'image',title:'Legacy image',type:'image',hidden:true,options:{hotspot:true}}),
          ],
          preview:{select:{title:'heading',subtitle:'description',media:'images.0',hidden:'hidden'},prepare:({title,subtitle,media,hidden})=>({title:`${hidden?'Hidden — ':''}${title||'Untitled section'}`,subtitle,media})},
        }),
        defineArrayMember({
          type:'object', name:'impactSection', title:'Impact section',
          initialValue:{heading:'Impact',headingLevel:'h2',hidden:false},
          fields:[
            defineField({name:'hidden',title:'Hide Impact section',type:'boolean',initialValue:false}),
            defineField({name:'heading',title:'Heading',type:'string',initialValue:'Impact',validation:rule=>rule.required()}),
            defineField({name:'headingLevel',title:'Heading size',type:'string',initialValue:'h2',options:{list:[{title:'H2 — main heading',value:'h2'},{title:'H3 — subheading',value:'h3'}],layout:'dropdown'}}),
            defineField({name:'description',title:'Description',type:'text',rows:5}),
            defineField({name:'metrics',title:'Metrics',type:'array',of:[defineArrayMember({type:'object',name:'sectionMetric',title:'Metric',fields:[defineField({name:'value',title:'Metric value',type:'string',validation:rule=>rule.required()}),defineField({name:'label',title:'Metric description',type:'text',rows:2,validation:rule=>rule.required()})],preview:{select:{title:'value',subtitle:'label'}}})]}),
          ],
          preview:{select:{title:'heading',subtitle:'description',hidden:'hidden'},prepare:({title,subtitle,hidden})=>({title:`${hidden?'Hidden — ':''}${title||'Impact'}`,subtitle})},
        }),
      ],
    }),
    defineField({name:'sectionsVersion',title:'Sections version',type:'number',hidden:true}),
    defineField({name:'contentSections', title:'Legacy additional sections', type:'array', hidden:true, description:'Kept for compatibility with previously published content.', of:[defineArrayMember({type:'object', name:'contentSection', title:'Content section', fields:[defineField({name:'heading',title:'Heading',type:'string'}),defineField({name:'text',title:'Text',type:'text',rows:6}),defineField({name:'image',title:'Image',type:'image',options:{hotspot:true},fields:[defineField({name:'alt',title:'Alternative text',type:'string'})]})], preview:{select:{title:'heading',subtitle:'text',media:'image'},prepare:({title,subtitle,media})=>({title:title||'Untitled section',subtitle,media})}})]}),
  ],
  preview:{select:{title:'title',subtitle:'outcome',media:'thumbnail'}},
})

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [siteSettings, caseStudy],
}
