// Conteúdo do acervo (repositório alexzjss/acervo). O índice é gerado por scripts/acervo.mjs.
import index from './generated/acervo.json'
import type { Lang } from './content'

export type TocSection = { id: string; title: string; mark?: string; children: { id: string; title: string }[] }
export type AcervoEntry = {
  slug: string; type: string; title: string; description: string; tags: string[]
  created: string; updated: string; state: 'rascunho' | 'em-andamento' | 'concluido'
  lang: string; math: boolean; widgets: string[]; toc: TocSection[]
}

export const acervo = index as AcervoEntry[]
export const acervoHref = (entry: AcervoEntry) => `/conteudos/${entry.slug}`
export const findAcervo = (slug: string) => acervo.find((entry) => entry.slug === slug)
export const acervoDate = (iso: string, lang: Lang) => iso ? new Intl.DateTimeFormat(lang, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${iso}T00:00:00Z`)) : ''
