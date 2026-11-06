// Content lives in src/data/*.json (edit those to update the site). This module only types and re-exports it.
import siteData from './data/site.json'
import experienceData from './data/experience.json'
import projectsData from './data/projects.json'
import researchData from './data/research.json'
import profileData from './data/profile.json'
import awardsData from './data/awards.json'
import galleryData from './data/gallery.json'
import detailsData from './data/details.json'

export type Lang = 'pt-BR' | 'en'
export type Copy = { 'pt-BR': string; en: string }
export type Trail = 'rec' | 'pes' | 'com'
export type TrailFilter = Trail | 'all'
export type Kind = 'work' | 'research' | 'academic' | 'program'
export type Area = 'data' | 'research' | 'web' | 'creative'
export type CaseStudy = { problem: Copy; solution: Copy; result: Copy }
export type Project = { id: string; name: string; description: Copy; tagline: Copy; area: Area; status: 'live' | 'repo'; size: 'md' | 'wide'; trails: Trail[]; stack: string[]; url: string; demo?: string; image?: string; imageAlt?: Copy; fit?: 'cover' | 'contain'; position?: string; caseStudy?: CaseStudy }
export type Entry = { id: string; kind?: Kind; trails: Trail[]; link?: { href: string; label: Copy }; name: string; role: Copy; period: Copy; sortKey: number; summary: Copy; details: Copy; logo?: string }
export type Award = { id: string; year?: string; title: Copy; context: Copy; image?: { src: string; alt: Copy } }
export type Photo = { id: string; src: string; width: number; height: number; alt: Copy; caption: Copy; trails: Trail[] }

export type Evidence = { kind: 'project' | 'entry'; id: string }
export type Skill = { name: string; evidence: Evidence[] }
export type DiagramNode = { id: string; label: Copy; sub?: Copy }
export type Diagram = { layers: { title: Copy; nodes: DiagramNode[] }[]; edges: [string, string][] }
export type Detail = { metrics: { value: string; label: Copy }[]; decisions: { title: Copy; text: Copy }[]; limits?: Copy[]; diagram: Diagram; diagramCaption: Copy }

export const tx = (value: Copy, lang: Lang) => value[lang]

export const site = siteData as { url: string; email: string; github: string; linkedin: string; name: string }
export const highlights = experienceData.highlights as Entry[]
export const organizations = experienceData.organizations as Entry[]
export const collective = experienceData.collective as { period: Copy; summary: Copy }
export const projects = projectsData as Project[]
export const research = researchData as { title: Copy; period: Copy; institution: string; advisor: string; summary: Copy; method: Copy; status: Copy; tools: string[] }
export const skillGroups = profileData.skillGroups as { title: Copy; items: Skill[] }[]
export const certifications = profileData.certifications as Copy[]
export const awards = awardsData as Award[]
export const gallery = galleryData as Photo[]

export const inTrail = (trails: Trail[], trail: TrailFilter) => trail === 'all' || trails.includes(trail)
export const details = detailsData as unknown as Record<string, Detail>
export const hasDetail = (id: string) => id in details
export const projectHref = (project: Project) => hasDetail(project.id) ? `/projetos/${project.id}` : project.demo ?? project.url
