const gamesUrl = 'https://backloggd.com/u/zackxz/games/played/categories:games/'
const feedUrl = 'https://backloggd.com/u/zackxz/reviews/rss/'
const maxGamePages = 50

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

function attributeValue(value, attribute) {
  const match = value.match(new RegExp(`${attribute}=["']([^"']+)["']`, 'i'))
  return match ? decodeXml(match[1]) : ''
}

function tagValue(item, tag) {
  const match = item.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`))
  return match ? decodeXml(match[1].trim()) : ''
}

function parseGames(html) {
  const caminhos = new Set(
    [...html.matchAll(/href=["'](\/games\/[^"'?\s#]+)["']/gi)].map(([, caminho]) => caminho),
  )

  return [...caminhos]
    .map((gamePath) => {
      const inicio = html.indexOf(gamePath)
      const card = html.slice(Math.max(0, inicio - 1800), Math.min(html.length, inicio + 6500))
      const titleMatch = card.match(/<div[^>]*class=["'][^"']*game-text-centered[^"']*["'][^>]*>([\s\S]*?)<\/div>/i)
      const imageMatch = card.match(/<img\b[^>]*(?:src|data-src)=["'][^"']+["'][^>]*>/i)
      const rating = card.match(/data-rating=["']([\d.]+)["']/i)
      const titulo = htmlValue(titleMatch?.[1] ?? attributeValue(imageMatch?.[0] ?? '', 'alt'))
      if (!titulo) return null
      const slug = gamePath.replace(/^\/games\//, '').replace(/\/$/, '')
      const capa = attributeValue(imageMatch?.[0] ?? '', 'data-src') || attributeValue(imageMatch?.[0] ?? '', 'src')
      return {
        slug: `backloggd-game-${slug}`,
        titulo,
        plataforma: 'Backloggd',
        nota: rating ? Number(rating[1]) : 0,
        data: new Date().toISOString().slice(0, 10),
        resumo: 'Jogo zerado no Backloggd.',
        tags: ['Backloggd', 'Zerados'],
        ...(capa ? { capa } : {}),
        origemUrl: `https://backloggd.com${gamePath}`,
        corpo: [{ tipo: 'p', texto: 'Jogo zerado no Backloggd.' }],
      }
    })
    .filter(Boolean)
}

function normalizeTitle(title) {
  return title
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/\s*\([^)]*\)\s*$/, '')
    .replace(/[^\da-z]+/g, '')
}

function parseFeed(xml) {
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(([, item]) => {
    const titulo = tagValue(item, 'title').replace(/\s+-\s+★.*$/, '')
    return {
      slug: `backloggd-${tagValue(item, 'guid').replace(/^backloggd-review-/, '')}`,
      titulo,
      plataforma: 'Backloggd',
      nota: Number(tagValue(item, 'backloggd:user_rating')) || 0,
      data: tagValue(item, 'pubDate') || new Date().toISOString().slice(0, 10),
      resumo: tagValue(item, 'description'),
      tags: ['Backloggd'],
      ...(tagValue(item, 'link') ? { origemUrl: tagValue(item, 'link') } : {}),
      corpo: [{ tipo: 'p', texto: tagValue(item, 'description') }],
    }
  })
}

async function buscarPaginasDeJogos() {
  const jogos = []
  const vistos = new Set()

  for (let pagina = 1; pagina <= maxGamePages; pagina += 1) {
    const url = pagina === 1 ? gamesUrl : `${gamesUrl}?page=${pagina}`
    const response = await fetch(url)
    if (!response.ok) continue
    const novos = parseGames(await response.text()).filter((jogo) => !vistos.has(jogo.slug))
    novos.forEach((jogo) => vistos.add(jogo.slug))
    jogos.push(...novos)
    if (novos.length === 0) break
  }
  return jogos
}

export default async function handler(request, response) {
  try {
    const [games, feedResponse] = await Promise.all([buscarPaginasDeJogos().catch(() => []), fetch(feedUrl)])
    const reviewed = feedResponse.ok ? parseFeed(await feedResponse.text()) : []
    const byTitle = new Map(reviewed.map((item) => [normalizeTitle(item.titulo), item]))
    const result = games.map((game) => {
      const review = byTitle.get(normalizeTitle(game.titulo))
      return review ? { ...game, ...review, slug: game.slug } : game
    })
    const jogosImportados = new Set(result.map((item) => normalizeTitle(item.titulo)))
    const payload = [...result, ...reviewed.filter((item) => !jogosImportados.has(normalizeTitle(item.titulo)))]
    if (!payload.length) throw new Error('Backloggd não retornou jogos ou reviews')
    response.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=3600')
    response.status(200).json(payload)
  } catch (error) {
    response.status(502).json({ error: error instanceof Error ? error.message : 'Falha ao consultar Backloggd' })
  }
}
