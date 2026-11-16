// Injects server-rendered HTML into dist so crawlers and first paint get real content.
// The client uses createRoot, which replaces it on load (no hydration mismatches).
import { readFile, writeFile, rm, mkdir } from 'node:fs/promises'
import { pathToFileURL } from 'node:url'
import { resolve } from 'node:path'

const ssrDir = resolve('dist-ssr')
const { render } = await import(pathToFileURL(resolve(ssrDir, 'entry-server.js')).href)
const template = await readFile('dist/index.html', 'utf8')
if (!template.includes('<div id="root"></div>')) throw new Error('root placeholder not found in dist/index.html')
const inject = (html, body) => html.replace('<div id="root"></div>', `<div id="root">${body}</div>`)

await writeFile('dist/index.html', inject(template, render('/')))

// /cv: same shell, own title and canonical URL.
const cv = inject(template, render('/cv'))
  .replace(/<title>[^<]*<\/title>/, '<title>Alex Santana — Currículo</title>')
  .replace('<link rel="canonical" href="https://alexjsz.vercel.app/" />', '<link rel="canonical" href="https://alexjsz.vercel.app/cv" />')
  .replace('<meta property="og:url" content="https://alexjsz.vercel.app/" />', '<meta property="og:url" content="https://alexjsz.vercel.app/cv" />')
await mkdir('dist/cv', { recursive: true })
await writeFile('dist/cv/index.html', cv)

// Section pages: same shell, own title, description and canonical URL.
const page = (path, title, description) => inject(template, render(path))
  .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
  .replace('<link rel="canonical" href="https://alexjsz.vercel.app/" />', `<link rel="canonical" href="https://alexjsz.vercel.app${path}" />`)
  .replace('<meta property="og:url" content="https://alexjsz.vercel.app/" />', `<meta property="og:url" content="https://alexjsz.vercel.app${path}" />`)
  .replace(/(<meta (?:property="og:title"|name="twitter:title") content=")[^"]*(")/g, `$1${title}$2`)
  .replace(/(<meta (?:name="description"|property="og:description"|name="twitter:description") content=")[^"]*(")/g, `$1${description}$2`)
for (const [path, title, description] of [
  ['/projetos', 'Projetos — Alex Santana', 'Todos os projetos de Alex Santana: estudos de caso, ferramentas de dados, web e experimentos.'],
  ['/conteudos', 'Conteúdos — Alex Santana', 'Vídeos, workshops e materiais do Claude Builders Club na USP, por Alex Santana, Campus Ambassador do Claude.'],
]) {
  await mkdir(`dist${path}`, { recursive: true })
  await writeFile(`dist${path}/index.html`, page(path, title, description))
}

// One static page per project case study.
const projects = JSON.parse(await readFile('src/data/projects.json', 'utf8'))
const details = JSON.parse(await readFile('src/data/details.json', 'utf8'))
const origin = 'https://alexjsz.vercel.app'
for (const id of Object.keys(details)) {
  const project = projects.find((item) => item.id === id)
  const title = `${project.name} — Alex Santana`
  const tagline = project.tagline['pt-BR']
  const html = inject(template, render(`/projetos/${id}`))
    .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
    .replace(`<link rel="canonical" href="${origin}/" />`, `<link rel="canonical" href="${origin}/projetos/${id}" />`)
    .replace(`<meta property="og:url" content="${origin}/" />`, `<meta property="og:url" content="${origin}/projetos/${id}" />`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${title}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${title}$2`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${tagline}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${tagline}$2`)
    .replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${tagline}$2`)
  await mkdir(`dist/projetos/${id}`, { recursive: true })
  await writeFile(`dist/projetos/${id}/index.html`, html)
}

// One static page per acervo piece (alexzjss/acervo). The body is injected by the component from globalThis.
const acervo = JSON.parse(await readFile('src/generated/acervo.json', 'utf8'))
const attr = (text) => text.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
globalThis.__ACERVO_PAGES__ = {}
for (const entry of acervo) globalThis.__ACERVO_PAGES__[entry.slug] = await readFile(`public/acervo/${entry.slug}.html`, 'utf8')
for (const entry of acervo) {
  const path = `/conteudos/${entry.slug}`
  const title = attr(`${entry.title} — Alex Santana`)
  const description = attr(entry.description)
  const html = inject(template, render(path))
    .replace(/<title>[^<]*<\/title>/, () => `<title>${title}</title>`)
    .replace(`<link rel="canonical" href="${origin}/" />`, () => `<link rel="canonical" href="${origin}${path}" />`)
    .replace(`<meta property="og:url" content="${origin}/" />`, () => `<meta property="og:url" content="${origin}${path}" />`)
    .replace(/(<meta (?:property="og:title"|name="twitter:title") content=")[^"]*(")/g, (_, a, b) => `${a}${title}${b}`)
    .replace(/(<meta (?:name="description"|property="og:description"|name="twitter:description") content=")[^"]*(")/g, (_, a, b) => `${a}${description}${b}`)
  await mkdir(`dist${path}`, { recursive: true })
  await writeFile(`dist${path}/index.html`, html)
}
if (acervo.length) {
  const sitemap = await readFile('dist/sitemap.xml', 'utf8')
  const urls = acervo.map((entry) => `  <url>\n    <loc>${origin}/conteudos/${entry.slug}</loc>\n    <lastmod>${entry.updated || entry.created}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>\n`).join('')
  await writeFile('dist/sitemap.xml', sitemap.replace('</urlset>', `${urls}</urlset>`))
}

await rm(ssrDir, { recursive: true, force: true })
console.log(`prerendered index, cv, projetos, conteudos, ${Object.keys(details).length} project pages and ${acervo.length} acervo pages`)
