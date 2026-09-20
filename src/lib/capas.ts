import type { Review } from '../content/types'
import { capasBackloggdGeradas } from '../content/reviews/backloggd-capas'

/** Usada quando não há capa nem appId, ou quando a imagem externa falha. */
export const CAPA_GENERICA = '/images/capas/generica.jpg'

const appIdsSteam: Record<string, number> = {
  'God of War Ragnarök': 2322010,
  'Life Is Strange': 319630,
  Hades: 1145360,
  'Kaze and the Wild Masks': 829280,
  'Batman: Arkham Origins': 209000,
  'Sonic Generations': 71340,
  'Dragon Ball: Sparking! Zero': 1790600,
  'Dead Cells': 588650,
  'Stardew Valley': 413150,
  'Elden Ring': 1245620,
  'Chrono Trigger': 613830,
  'Hogwarts Legacy': 990080,
  'Resident Evil 4': 2050650,
  'We Were Here Too': 677160,
  'United Heist': 2119740,
  'We Were Here': 582500,
  'Resident Evil Requiem': 3764200,
  'Injustice 2': 627270,
  'Terminator 2D: No Fate': 1718460,
  Balatro: 2379780,
  Portal: 400,
  'Mortal Kombat 11': 976310,
  Dispatch: 2592160,
  'Marvel Cosmic Invasion': 2753970,
  'Clair Obscur: Expedition 33': 1903340,
  'Silent Hill 2': 2124490,
  'Star Wars Jedi: Fallen Order': 1172380,
  'The Last of Us Part I': 1888930,
  'A Short Hike': 1055540,
  'LEGO Batman: The Videogame': 21000,
  Celeste: 504230,
}

const capasBackloggd: Record<string, string> = {
  'Super Mario Odyssey':
    'https://mario.wiki.gallery/images/3/37/SuperMarioOdyssey_-_NA_boxart.jpg',
  'X-Men: Mutant Apocalypse': 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2dgk.jpg',
  'Super Mario World': 'https://images.igdb.com/igdb/image/upload/t_cover_big/co8lo8.jpg',
  'Call of Duty: Warzone': 'https://images.igdb.com/igdb/image/upload/t_cover_big/coa8id.jpg',
  'Super Mario Bros.': 'https://images.igdb.com/igdb/image/upload/t_cover_big/co6pib.jpg',
  'Super Mario Kart': 'https://images.igdb.com/igdb/image/upload/t_cover_big/co21w8.jpg',
  "Disney's Goof Troop": 'https://images.igdb.com/igdb/image/upload/t_cover_big/co63p7.jpg',
  'God of War': 'https://images.igdb.com/igdb/image/upload/t_cover_big/co3ddc.jpg',
  'We Were Here Too': 'https://images.igdb.com/igdb/image/upload/t_cover_big/co3wg8.jpg',
  'United Heist': 'https://images.igdb.com/igdb/image/upload/t_cover_big/co65un.jpg',
  'We Were Here': 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1odo.jpg',
  'The Magical Quest Starring Mickey Mouse': 'https://images.igdb.com/igdb/image/upload/t_cover_big/co63oy.jpg',
  'Minecraft: Pocket Edition': 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1rgc.jpg',
  'Resident Evil Requiem': 'https://images.igdb.com/igdb/image/upload/t_cover_big/cobmj0.jpg',
  'Injustice 2': 'https://images.igdb.com/igdb/image/upload/t_cover_big/co310z.jpg',
  'Terminator 2D: No Fate': 'https://images.igdb.com/igdb/image/upload/t_cover_big/co9s6r.jpg',
  'Shadow of the Colossus': 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1ozz.jpg',
  Balatro: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co9f4g.jpg',
  'Kingdom Hearts Dream Drop Distance HD': 'https://images.igdb.com/igdb/image/upload/t_cover_big/co8m1w.jpg',
  'Sonic Generations': 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1zvv.jpg',
  'Sonic R': 'https://images.igdb.com/igdb/image/upload/t_cover_big/co6zi1.jpg',
  'Kingdom Hearts II Final Mix': 'https://images.igdb.com/igdb/image/upload/t_cover_big/coaevv.jpg',
  'Kingdom Hearts Final Mix': 'https://images.igdb.com/igdb/image/upload/t_cover_big/co30zn.jpg',
  Portal: 'https://images.igdb.com/igdb/image/upload/t_cover_big/coay61.jpg',
  'Mortal Kombat 11': 'https://images.igdb.com/igdb/image/upload/t_cover_big/co20mh.jpg',
  'Mortal Kombat': 'https://images.igdb.com/igdb/image/upload/t_cover_big/co6c1k.jpg',
  Dispatch: 'https://images.igdb.com/igdb/image/upload/t_cover_big/cob5ql.jpg',
  'Marvel Cosmic Invasion': 'https://images.igdb.com/igdb/image/upload/t_cover_big/coakkw.jpg',
  'Clair Obscur: Expedition 33': 'https://images.igdb.com/igdb/image/upload/t_cover_big/co9gam.jpg',
  'Silent Hill 2': 'https://images.igdb.com/igdb/image/upload/t_cover_big/coavaf.jpg',
  Minecraft: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1rne.jpg',
  'Star Wars Jedi: Fallen Order': 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1rbi.jpg',
  'Ultimate Spider-Man': 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2rry.jpg',
  'Super Mario 3D World': 'https://images.igdb.com/igdb/image/upload/t_cover_big/cob8wh.jpg',
  'The Last of Us Part I': 'https://images.igdb.com/igdb/image/upload/t_cover_big/coa1gq.jpg',
  'A Short Hike': 'https://images.igdb.com/igdb/image/upload/t_cover_big/co6e83.jpg',
  'LEGO Batman: The Videogame': 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1qrn.jpg',
  'The Keeper': 'https://images.igdb.com/igdb/image/upload/t_cover_big/co7uzx.jpg',
  'Grand Theft Auto V': 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2lbd.jpg',
  Celeste: 'https://images.igdb.com/igdb/image/upload/t_cover_big/cob9dh.jpg',
}

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
  if (appIdsSteam[review.titulo])
    return `https://cdn.cloudflare.steamstatic.com/steam/apps/${appIdsSteam[review.titulo]}/library_600x900.jpg`
  if (review.steamAppId)
    return `https://cdn.cloudflare.steamstatic.com/steam/apps/${review.steamAppId}/library_600x900.jpg`
  if (review.plataforma === 'Backloggd')
    return capasBackloggdGeradas[review.titulo] ?? capasBackloggd[review.titulo] ?? CAPA_GENERICA
  return CAPA_GENERICA
}

/** Imagem horizontal, usada como fundo do cabeçalho do post. */
export function capaHorizontal(review: Review): string | null {
  if (appIdsSteam[review.titulo])
    return `https://cdn.cloudflare.steamstatic.com/steam/apps/${appIdsSteam[review.titulo]}/header.jpg`
  if (review.steamAppId)
    return `https://cdn.cloudflare.steamstatic.com/steam/apps/${review.steamAppId}/header.jpg`
  return review.capa || capasBackloggdGeradas[review.titulo] || capasBackloggd[review.titulo] || null
}
