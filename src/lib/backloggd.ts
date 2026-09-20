import type { Review } from '../content/types'

const CACHE_KEY = 'backloggd-reviews-v3'

export async function buscarReviewsBackloggd(): Promise<Review[]> {
  try {
    const armazenado = sessionStorage.getItem(CACHE_KEY)
    if (armazenado) return JSON.parse(armazenado) as Review[]
  } catch {
    // A sessão pode não ter armazenamento disponível.
  }

  const response = await fetch('/api/backloggd-reviews')
  if (!response.ok) throw new Error(`Backloggd respondeu HTTP ${response.status}`)
  const resultado = (await response.json()) as Review[]

  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(resultado))
  } catch {
    // O resultado continua utilizável sem cache local.
  }
  return resultado
}
