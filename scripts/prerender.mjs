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

await rm(ssrDir, { recursive: true, force: true })
console.log('prerendered dist/index.html and dist/cv/index.html')
