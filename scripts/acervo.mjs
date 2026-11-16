// Sincroniza o acervo (https://github.com/alexzjss/acervo) com o site.
//
// Lê conteudo/**/*.html, renderiza as fórmulas LaTeX com KaTeX e escreve:
//   src/generated/acervo.json        índice (metadados + sumário) importado pelo site
//   public/acervo/<slug>.html        corpo de cada conteúdo, já com as fórmulas renderizadas
//   public/acervo/widgets/*          módulos das ferramentas interativas
//
// Fonte: a variável ACERVO_DIR (pasta local) ou, por padrão, um clone raso do repositório
// em .acervo-cache/ (ACERVO_REPO muda o endereço). Se o acervo não puder ser lido, o build
// continua com o que já foi gerado antes, ou com um índice vazio.
import { execFileSync } from 'node:child_process'
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { basename, extname, join, relative } from 'node:path'
import katex from 'katex'
import { parse } from 'node-html-parser'

const repo = process.env.ACERVO_REPO || 'https://github.com/alexzjss/acervo'
const cache = '.acervo-cache'
const outIndex = 'src/generated/acervo.json'
const outDir = 'public/acervo'

const empty = () => { mkdirSync('src/generated', { recursive: true }); if (!existsSync(outIndex)) writeFileSync(outIndex, '[]\n') }

function source() {
  if (process.env.ACERVO_DIR) return process.env.ACERVO_DIR
  try {
    if (existsSync(join(cache, '.git'))) {
      execFileSync('git', ['-C', cache, 'fetch', '--depth=1', 'origin', 'main'], { stdio: 'pipe' })
      execFileSync('git', ['-C', cache, 'reset', '--hard', 'FETCH_HEAD'], { stdio: 'pipe' })
    } else {
      rmSync(cache, { recursive: true, force: true })
      execFileSync('git', ['clone', '--depth=1', repo, cache], { stdio: 'pipe' })
    }
    return cache
  } catch (error) {
    console.warn(`acervo: não consegui baixar ${repo} (${String(error.message).split('\n')[0]})`)
    return existsSync(join(cache, 'conteudo')) ? cache : null
  }
}

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    return statSync(path).isDirectory() ? walk(path) : [path]
  })
}

const entities = (text) => text.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&amp;/g, '&')
const escapeHtml = (text) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const plain = (node) => node.text.replace(/\s+/g, ' ').trim()

function renderMath(html, where) {
  return html.replace(/\\\((.*?)\\\)|\\\[(.*?)\\\]/gs, (match, inline, block) => {
    const tex = entities(inline ?? block)
    try {
      return katex.renderToString(tex, { displayMode: block !== undefined, throwOnError: true, strict: 'ignore' })
    } catch (error) {
      throw new Error(`${where}: fórmula inválida "${tex.slice(0, 60)}": ${error.message}`)
    }
  })
}

function summary(article) {
  const sections = article.querySelectorAll('section[id]')
  if (sections.length) {
    return sections.map((section) => ({
      id: section.id,
      title: plain(section.querySelector('h2') ?? section),
      mark: section.getAttribute('data-marca') || undefined,
      children: section.querySelectorAll('h3[id]').map((h) => ({ id: h.id, title: plain(h) })),
    }))
  }
  return article.querySelectorAll('h2[id]').map((h) => ({ id: h.id, title: plain(h), children: [] }))
}

function convert(file, root) {
  const where = relative(root, file)
  const doc = parse(readFileSync(file, 'utf8'))
  const article = doc.querySelector('article')
  if (!article) throw new Error(`${where}: sem <article>`)
  article.querySelectorAll('script, style, link, iframe, object, embed').forEach((node) => node.remove())
  for (const node of article.querySelectorAll('*')) {
    for (const name of Object.keys(node.attributes)) if (/^on/i.test(name)) node.removeAttribute(name)
  }
  const meta = Object.fromEntries(doc.querySelectorAll('meta[name]').map((m) => [m.getAttribute('name'), m.getAttribute('content') ?? '']))
  const title = plain(doc.querySelector('title') ?? article.querySelector('h1') ?? article)
  const slug = basename(file, extname(file))
  const folder = relative(join(root, 'conteudo'), file).split(/[\\/]/)[0]
  const body = article.innerHTML
  return {
    entry: {
      slug,
      type: folder === basename(file) ? 'outros' : folder,
      title,
      description: meta.description ?? '',
      tags: (meta.keywords ?? '').split(',').map((t) => t.trim()).filter(Boolean),
      created: meta['acervo:criado'] ?? '',
      updated: meta['acervo:atualizado'] || meta['acervo:criado'] || '',
      state: meta['acervo:estado'] || 'concluido',
      lang: doc.querySelector('html')?.getAttribute('lang') ?? 'pt-BR',
      math: /\\\(|\\\[/.test(body),
      widgets: [...new Set(article.querySelectorAll('[data-widget]').map((w) => w.getAttribute('data-widget')))],
      toc: summary(article),
    },
    html: renderMath(body, where),
  }
}

const root = source()
if (!root || !existsSync(join(root, 'conteudo'))) {
  console.warn('acervo: nenhum conteúdo disponível; mantendo o índice atual')
  empty()
  process.exit(0)
}

const entries = []
const pages = new Map()
for (const file of walk(join(root, 'conteudo')).sort()) {
  if (extname(file) === '.md') { console.warn(`acervo: ${relative(root, file)} ignorado (Markdown ainda não é publicado pelo site)`); continue }
  if (extname(file) !== '.html') continue
  const { entry, html } = convert(file, root)
  if (pages.has(entry.slug)) throw new Error(`acervo: slug repetido: ${entry.slug}`)
  if (entry.state === 'rascunho' && !process.env.ACERVO_DRAFTS) { console.log(`acervo: rascunho ${entry.slug} não publicado`); continue }
  pages.set(entry.slug, html)
  entries.push(entry)
}
entries.sort((a, b) => b.updated.localeCompare(a.updated) || a.slug.localeCompare(b.slug))

rmSync(outDir, { recursive: true, force: true })
mkdirSync(outDir, { recursive: true })
for (const [slug, html] of pages) writeFileSync(join(outDir, `${slug}.html`), html)
if (existsSync(join(root, 'widgets'))) {
  cpSync(join(root, 'widgets'), join(outDir, 'widgets'), { recursive: true, filter: (src) => extname(src) !== '.md' })
}
mkdirSync('src/generated', { recursive: true })
writeFileSync(outIndex, JSON.stringify(entries, null, 1) + '\n')
console.log(`acervo: ${entries.length} conteúdo(s) sincronizado(s): ${entries.map((e) => e.slug).join(', ') || '—'}`)
