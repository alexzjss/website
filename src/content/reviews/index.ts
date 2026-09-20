import type { Review } from '../types'

/**
 * Cada review é um arquivo .ts nesta pasta exportando `const review: Review`.
 * Crie um arquivo novo e ele aparece sozinho na listagem — não precisa registrar nada aqui.
 */
const modulos = import.meta.glob<{ review?: Review; reviews?: Review[] }>('./*.ts', { eager: true })

export const reviews: Review[] = Object.entries(modulos)
  .filter(([caminho]) => !caminho.endsWith('/index.ts') && !caminho.endsWith('/backloggd.ts'))
  .flatMap(([, modulo]) => (modulo.review ? [modulo.review] : (modulo.reviews ?? [])))
  .sort((a, b) => (a.data < b.data ? 1 : -1))

export function getReview(slug: string): Review | undefined {
  return reviews.find((r) => r.slug === slug)
}
