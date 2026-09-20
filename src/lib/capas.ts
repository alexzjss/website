import type { Review } from '../content/types'

/** Usada quando não há capa nem appId, ou quando a imagem externa falha. */
export const CAPA_GENERICA = './images/capas/generica.jpg'

/**
 * Capa do jogo, sem precisar de chave de API.
 *
 * 1. `capa` definida na review (arquivo local ou URL) tem prioridade;
 * 2. senão, monta a URL da CDN pública da Steam a partir do `steamAppId`;
 * 3. senão, devolve a capa genérica.
 *
 * Achar o appId: abra o jogo na loja Steam e leia o número da URL
 * (store.steampowered.com/app/367520/Hollow_Knight -> 367520).
 *
 * Quer usar a RAWG (cobre jogos fora da Steam)? Crie uma conta gratuita em
 * rawg.io/apidocs, guarde a chave em .env como VITE_RAWG_KEY e troque esta
 * função por uma busca em https://api.rawg.io/api/games?search=...&key=...
 */
export function capaVertical(review: Review): string {
  if (review.capa) return review.capa
  if (review.steamAppId)
    return `https://cdn.cloudflare.steamstatic.com/steam/apps/${review.steamAppId}/library_600x900.jpg`
  return CAPA_GENERICA
}

/** Imagem horizontal, usada como fundo do cabeçalho do post. */
export function capaHorizontal(review: Review): string | null {
  if (review.steamAppId)
    return `https://cdn.cloudflare.steamstatic.com/steam/apps/${review.steamAppId}/header.jpg`
  return review.capa || null
}
