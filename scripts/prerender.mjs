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

await rm(ssrDir, { recursive: true, force: true })
console.log(`prerendered index, cv and ${Object.keys(details).length} project pages`)
