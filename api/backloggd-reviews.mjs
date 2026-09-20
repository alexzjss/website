const gamesUrl = 'https://backloggd.com/u/zackxz/games/played/categories:games/'
const feedUrl = 'https://backloggd.com/u/zackxz/reviews/rss/'
const gamesPages = Array.from({ length: 10 }, (_, index) =>
  index === 0 ? gamesUrl : `${gamesUrl}?page=${index + 1}`,
)

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

function htmlValue(value) {
  return decodeXml(value.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim())
}

function tagValue(item, tag) {
  const match = item.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`))
  return match ? decodeXml(match[1].trim()) : ''
}

function parseGames(html) {
  return [...html.matchAll(/<a\s+[^>]*href=["'](\/games\/[^"'?]+)["'][^>]*>[\s\S]{0,5000}?<\/a>/gi)]
    .map(([, gamePath]) => {
      const start = Math.max(0, html.indexOf(gamePath) - 1200)
      const card = html.slice(start, Math.min(html.length, start + 6500))
      const titleMatch = card.match(/<div[^>]*class=["'][^"']*game-text-centered[^"']*["'][^>]*>([\s\S]*?)<\/div>/i)
      const image = card.match(/<img\b[^>]*>/i)?.[0] ?? ''
      const cover = image.match(/\b(?:src|data-src|data-original)=["']([^"']+)["']/i)?.[1] ?? ''
      const rating = card.match(/data-rating=["']([\d.]+)["']/i)
      const titulo = htmlValue(titleMatch?.[1] ?? '')
      if (!titulo) return null
      const slug = gamePath.replace(/^\/games\//, '').replace(/\/$/, '')
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
  return title.toLowerCase().replace(/\s*\([^)]*\)\s*$/, '').replace(/[^\da-z]+/g, '')
}

function parseFeed(xml) {
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(([, item]) => ({
    slug: `backloggd-${tagValue(item, 'guid').replace(/^backloggd-review-/, '')}`,
    titulo: tagValue(item, 'title').replace(/\s+-\s+★.*$/, ''),
    plataforma: 'Backloggd',
    nota: Number(tagValue(item, 'backloggd:user_rating')) || 0,
    data: tagValue(item, 'pubDate') || new Date().toISOString().slice(0, 10),
    resumo: tagValue(item, 'description'),
    tags: ['Backloggd'],
    ...(tagValue(item, 'link') ? { origemUrl: tagValue(item, 'link') } : {}),
    corpo: [{ tipo: 'p', texto: tagValue(item, 'description') }],
  }))
}

export default async function handler(request, response) {
  try {
    const responses = await Promise.all([...gamesPages.map(fetch), fetch(feedUrl)])
    const failed = responses.find((item) => !item.ok)
    if (failed) throw new Error(`Backloggd respondeu HTTP ${failed.status}`)
    const bodies = await Promise.all(responses.map((item) => item.text()))
    const games = bodies.slice(0, -1).flatMap(parseGames)
    if (!games.length) throw new Error('Backloggd retornou uma página sem jogos')
    const reviewed = parseFeed(bodies.at(-1))
    const byTitle = new Map(reviewed.map((item) => [normalizeTitle(item.titulo), item]))
    const result = games.map((game) => {
      const review = byTitle.get(normalizeTitle(game.titulo))
      return review ? { ...game, ...review, slug: game.slug } : game
    })
    response.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=3600')
    response.status(200).json(result)
  } catch (error) {
    response.status(502).json({ error: error instanceof Error ? error.message : 'Falha ao consultar Backloggd' })
  }
}
