import { existsSync, readFileSync, writeFileSync } from 'node:fs'

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

function render(reviews) {
  return `import type { Review } from '../types'

// Gerado por scripts/sincronizar-backloggd.mjs. Nao edite manualmente.
export const reviews: Review[] = ${JSON.stringify(reviews, null, 2)}
`
}

try {
  const response = await fetch(feedUrl)
  if (!response.ok) throw new Error(`HTTP ${response.status}`)

  const reviews = parseFeed(await response.text())
  writeFileSync(outputPath, render(reviews), 'utf8')
  console.log(`Backloggd sincronizado: ${reviews.length} review(s).`)
} catch (error) {
  if (existsSync(outputPath)) {
    console.warn(`Nao foi possivel sincronizar o Backloggd; usando o snapshot local. ${error.message}`)
  } else {
    writeFileSync(outputPath, render([]), 'utf8')
    console.warn(`Nao foi possivel sincronizar o Backloggd; criando lista vazia. ${error.message}`)
  }
}