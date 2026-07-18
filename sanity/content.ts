import {client} from './lib/client'
import {urlFor} from './lib/image'
import {caseStudies as fallbackCaseStudies, type CaseStudy} from '../app/work/case-studies'

export type SiteSettings = {
  hero:string; heroSupporting:string; heroEmphasis:string; capabilitiesHeading:string; capabilitiesIntro:string;
  aboutHeading:string; aboutLead:string; aboutBody:string; contactHeading:string; contactEmail:string;
}

export const fallbackSettings: SiteSettings = {
  hero:'Hi, I’m Gaywin', heroSupporting:'a senior product designer making complex products', heroEmphasis:'clear and scalable.',
  capabilitiesHeading:'Strategy with sleeves rolled up', capabilitiesIntro:'I help product teams move from ambiguity to a clear direction, then stay close enough to the craft to make the details count.',
  aboutHeading:'Designer, builder and systems thinker.', aboutLead:'I’m a senior product designer based in Cape Town, working where design, technology and business meet.',
  aboutBody:'My foundation in front-end development means I understand the systems beneath the interface and design with delivery in mind. I help teams find clarity in complex spaces, align around a direction and build products that can scale.',
  contactHeading:'Have a complex product that needs clarity?', contactEmail:'hello@gaywinwalters.com',
}

export async function getSiteSettings(){
  try { return {...fallbackSettings,...await client.fetch<Partial<SiteSettings>|null>(`*[_type == "siteSettings"][0]{hero,heroSupporting,heroEmphasis,capabilitiesHeading,capabilitiesIntro,aboutHeading,aboutLead,aboutBody,contactHeading,contactEmail}`)} }
  catch { return fallbackSettings }
}

type CmsCase = CaseStudy & {thumbnail?:unknown;heroImage?:unknown;thumbnailUrl?:string;heroImageUrl?:string;thumbnailAlt?:string;heroImageAlt?:string}
export async function getCaseStudies():Promise<CmsCase[]>{
  try {
    const items=await client.fetch<CmsCase[]>(`*[_type == "caseStudy"]|order(order asc){...,"slug":slug.current,"thumbnailAlt":thumbnail.alt,"heroImageAlt":heroImage.alt}`)
    if(!items?.length) return fallbackCaseStudies
    return items.map(item=>({...item,thumbnailUrl:item.thumbnail?urlFor(item.thumbnail).width(1400).height(900).fit('crop').url():undefined,heroImageUrl:item.heroImage?urlFor(item.heroImage).width(1800).height(1100).fit('crop').url():undefined}))
  } catch { return fallbackCaseStudies }
}

export async function getCaseStudy(slug:string){ return (await getCaseStudies()).find(item=>item.slug===slug) }
