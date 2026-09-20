import type { Review } from '../content/types'

export const CAPA_GENERICA = '/images/capas/generica.jpg'

export function capaVertical(review: Review): string {
  return review.capa || (review.steamAppId
    ? `https://cdn.cloudflare.steamstatic.com/steam/apps/${review.steamAppId}/library_600x900.jpg`
    : CAPA_GENERICA)
}

export function capaHorizontal(review: Review): string | null {
  return review.capa || (review.steamAppId
    ? `https://cdn.cloudflare.steamstatic.com/steam/apps/${review.steamAppId}/header.jpg`
    : null)
}
