import { existsSync, writeFileSync } from 'node:fs'

const gamesUrl = 'https://backloggd.com/u/zackxz/games/played/categories:games/'
const feedUrl = 'https://backloggd.com/u/zackxz/reviews/rss/'
const outputPath = new URL('../src/content/reviews/backloggd.ts', import.meta.url)

function decodeXml(value) {
  return value
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([\da-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16)))
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
}

function tagValue(item, tag) {
  const match = item.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`))
  return match ? decodeXml(match[1].trim()) : ''
}

function toDate(value) {
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? new Date().toISOString().slice(0, 10) : date.toISOString().slice(0, 10)
}

function htmlValue(value) {
  return decodeXml(value.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim())
}

function parseGames(html) {
  return [...html.matchAll(/<div class="row pt-2 pb-1 review-card">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/g)]
    .map(([, card]) => {
      const game = card.match(/<a href="(\/games\/[^"?]+)"[^>]*>([^<]+)<\/a>/i)
      const cover = card.match(/<img[^>]+src="([^"]+)"[^>]+alt="([^"]+)"/i)
      const rating = card.match(/stars-top" style="width:(\d+)%/i)
      const status = card.match(/play-type completed/i)
      const platform = card.match(/review-platform[^>]*>[\s\S]*?<p[^>]*>([^<]+)</i)
      const date = card.match(/<time datetime="([^"]+)"/i)

      if (!game || !status) return null

      const titulo = htmlValue(game[2])
      const slug = game[1].replace(/^\/games\//, '').replace(/\/$/, '')

      return {
        slug: `backloggd-game-${slug}`,
        titulo,
        plataforma: platform ? htmlValue(platform[1]) : 'Backloggd',
        nota: rating ? Number(rating[1]) / 10 : 0,
        data: toDate(date?.[1] || ''),
        resumo: 'Jogo zerado no Backloggd.',
        tags: ['Backloggd', 'Zerados'],
        ...(cover ? { capa: cover[1] } : {}),
        origemUrl: `https://backloggd.com${game[1]}`,
        corpo: [{ tipo: 'p', texto: 'Jogo zerado no Backloggd.' }],
      }
    })
    .filter(Boolean)
}

function normalizeTitle(title) {
  return title
    .toLowerCase()
    .replace(/\s*\([^)]*\)\s*$/, '')
    .replace(/[^\da-z]+/g, '')
}

function parseFeed(xml) {
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(([, item]) => {
    const title = tagValue(item, 'title').replace(/\s+-\s+★.*$/, '')
    const guid = tagValue(item, 'guid').replace(/^backloggd-review-/, '')
    const reviewUrl = tagValue(item, 'link')
    const cover = tagValue(item, 'url')

    return {
      slug: `backloggd-${guid}`,
      titulo: title,
      plataforma: 'Backloggd',
      nota: Number(tagValue(item, 'backloggd:user_rating')) || 0,
      data: toDate(tagValue(item, 'pubDate')),
      resumo: tagValue(item, 'description'),
      tags: ['Backloggd'],
      ...(cover ? { capa: cover } : {}),
      ...(reviewUrl ? { origemUrl: reviewUrl } : {}),
      corpo: [{ tipo: 'p', texto: tagValue(item, 'description') }],
    }
  })
}

function mergeGames(games, reviewed) {
  const reviewsByTitle = new Map(reviewed.map((review) => [normalizeTitle(review.titulo), review]))

  return games.map((game) => {
    const review = reviewsByTitle.get(normalizeTitle(game.titulo))
    return review ? { ...game, ...review, slug: game.slug } : game
  })
}

function render(reviews) {
  return `import type { Review } from '../types'

// Gerado por scripts/sincronizar-backloggd.mjs. Nao edite manualmente.
export const reviews: Review[] = ${JSON.stringify(reviews, null, 2)}
`
}

try {
  const [gamesResponse, feedResponse] = await Promise.all([fetch(gamesUrl), fetch(feedUrl)])
  if (!gamesResponse.ok) throw new Error(`jogos HTTP ${gamesResponse.status}`)
  if (!feedResponse.ok) throw new Error(`reviews HTTP ${feedResponse.status}`)

  const games = parseGames(await gamesResponse.text())
  const reviewed = parseFeed(await feedResponse.text())
  const reviews = mergeGames(games, reviewed)
  writeFileSync(outputPath, render(reviews), 'utf8')
  console.log(`Backloggd sincronizado: ${reviews.length} jogo(s) zerado(s), ${reviewed.length} com review.`)
} catch (error) {
  if (existsSync(outputPath)) {
    console.warn(`Nao foi possivel sincronizar o Backloggd; usando o snapshot local. ${error.message}`)
  } else {
    writeFileSync(outputPath, render([]), 'utf8')
    console.warn(`Nao foi possivel sincronizar o Backloggd; criando lista vazia. ${error.message}`)
  }
}