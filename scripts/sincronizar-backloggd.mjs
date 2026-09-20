import { existsSync, writeFileSync } from 'node:fs'

const gamesUrl = 'https://backloggd.com/u/zackxz/games/played/categories:games/'
const feedUrl = 'https://backloggd.com/u/zackxz/reviews/rss/'
const gamesPages = Array.from({ length: 10 }, (_, index) =>
  index === 0 ? gamesUrl : `${gamesUrl}?page=${index + 1}`,
)
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

function imageUrl(card) {
  const image = card.match(/<img\b[^>]*>/i)?.[0] ?? ''
  const source = image.match(/\b(?:src|data-src|data-original)=["']([^"']+)["']/i)?.[1]
  if (source) return source

  const srcset = image.match(/\bsrcset=["']([^"']+)["']/i)?.[1]
  return srcset?.split(',').at(-1)?.trim().split(/\s+/)[0] ?? ''
}

function parseGames(html) {
  return [...html.matchAll(/<a\s+[^>]*href=["'](\/games\/[^"'?]+)["'][^>]*>[\s\S]{0,5000}?<\/a>/gi)]
    .map(([, gamePath]) => {
      const start = Math.max(0, html.indexOf(gamePath) - 1200)
      const card = html.slice(start, Math.min(html.length, start + 6500))
      const rating = card.match(/data-rating=["']([\d.]+)["']/i)
      const cover = imageUrl(card)

      if (!gamePath) return null

      const titleMatch = card.match(/<div[^>]*class=["'][^"']*game-text-centered[^"']*["'][^>]*>([\s\S]*?)<\/div>/i)
      const titulo = htmlValue(titleMatch?.[1] ?? '')
      const slug = gamePath.replace(/^\/games\//, '').replace(/\/$/, '')
      if (!titulo) return null

      return {
        slug: `backloggd-game-${slug}`,
        titulo,
        plataforma: 'Backloggd',
        nota: rating ? Number(rating[1]) : 0,
        data: new Date().toISOString().slice(0, 10),
        resumo: 'Jogo zerado no Backloggd.',
        tags: ['Backloggd', 'Zerados'],
        ...(cover ? { capa: cover } : {}),
        origemUrl: `https://backloggd.com${gamePath}`,
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
  const [gameResponses, feedResponse] = await Promise.all([
    Promise.all(gamesPages.map((url) => fetch(url))),
    fetch(feedUrl),
  ])
  const failedGamesResponse = gameResponses.find((response) => !response.ok)
  if (failedGamesResponse) throw new Error(`jogos HTTP ${failedGamesResponse.status}`)
  if (!feedResponse.ok) throw new Error(`reviews HTTP ${feedResponse.status}`)

  const games = (await Promise.all(gameResponses.map((response) => response.text()))).flatMap(parseGames)
  const reviewed = parseFeed(await feedResponse.text())
  if (games.length === 0) throw new Error('nenhum jogo encontrado; resposta pode ser o desafio anti-bot')
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