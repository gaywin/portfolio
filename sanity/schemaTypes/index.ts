import {defineArrayMember, defineField, defineType, type SchemaTypeDefinition} from 'sanity'

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
    defineField({name:'theme', title:'Colour theme', type:'string', options:{list:[{title:'Lime',value:'lime'},{title:'Violet',value:'violet'},{title:'Orange',value:'orange'}]}}),
    defineField({name:'thumbnail', title:'Project thumbnail', type:'image', options:{hotspot:true}, fields:[defineField({name:'alt',title:'Alternative text',type:'string',validation:r=>r.required()})]}),
    defineField({name:'heroImage', title:'Case-study hero image', type:'image', options:{hotspot:true}, fields:[defineField({name:'alt',title:'Alternative text',type:'string',validation:r=>r.required()})]}),
    defineField({name:'outcome', title:'Outcome-led headline', type:'text', rows:3, validation:r=>r.required()}),
    defineField({name:'artLabel', title:'Card label', type:'string'}),
    defineField({name:'artStat', title:'Headline metric', type:'string'}),
    defineField({name:'overview', title:'Overview', type:'text', rows:4}),
    defineField({name:'role', title:'Role', type:'string'}),
    defineField({name:'team', title:'Team', type:'text', rows:2}),
    defineField({name:'challenge', title:'Challenge', type:'text', rows:5}),
    defineField({name:'insight', title:'Customer insight', type:'text', rows:5}),
    defineField({name:'strategy', title:'Strategy', type:'text', rows:5}),
    defineField({name:'decisions', title:'Key design decisions', type:'array', of:[defineArrayMember({type:'string'})]}),
    defineField({name:'system', title:'Design system', type:'text', rows:5}),
    defineField({name:'validation', title:'Validation', type:'text', rows:5}),
    defineField({name:'results', title:'Results', type:'array', of:[defineArrayMember({type:'string'})]}),
    defineField({name:'reflection', title:'Reflection', type:'text', rows:5}),
  ],
  preview:{select:{title:'title',subtitle:'outcome',media:'thumbnail'}},
})

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [siteSettings, caseStudy],
}
