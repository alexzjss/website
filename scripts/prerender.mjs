// Injects the server-rendered HTML of the app into dist/index.html so crawlers and
// first paint get real content. The client uses createRoot, which replaces it on load.
import { readFile, writeFile, rm } from 'node:fs/promises'
import { pathToFileURL } from 'node:url'
import { resolve } from 'node:path'

const ssrDir = resolve('dist-ssr')
const entry = pathToFileURL(resolve(ssrDir, 'entry-server.js')).href
const { render } = await import(entry)
const html = await readFile('dist/index.html', 'utf8')
if (!html.includes('<div id="root"></div>')) throw new Error('root placeholder not found in dist/index.html')
await writeFile('dist/index.html', html.replace('<div id="root"></div>', `<div id="root">${render()}</div>`))
await rm(ssrDir, { recursive: true, force: true })
console.log('prerendered dist/index.html')
