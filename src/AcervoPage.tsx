import { useEffect, useRef, useState } from 'react'
import { acervoDate, findAcervo } from './acervo'
import { Backdrop, SiteFooter, SiteHeader, useMeta, usePrefs } from './shell'
import 'katex/dist/katex.min.css'
import './styles.css'

const cache = new Map<string, string>()
const widgetLoader = '/acervo/widgets/carregar.js'
type WidgetLoader = { montarWidgets: (root: Element) => Promise<void> }

/** Corpo já renderizado: no servidor vem do pré-render, no cliente do HTML pré-renderizado da própria página. */
function initialHtml(slug: string): string | null {
  const known = cache.get(slug)
  if (known) return known
  if (typeof window === 'undefined') return (globalThis as { __ACERVO_PAGES__?: Record<string, string> }).__ACERVO_PAGES__?.[slug] ?? null
  return document.querySelector<HTMLElement>(`[data-acervo-body="${slug}"]`)?.innerHTML ?? null
}

export default function AcervoPage({ slug }: { slug: string }) {
  const { lang, theme, text, toggleLang, toggleTheme } = usePrefs()
  const entry = findAcervo(slug)
  const [html, setHtml] = useState<string | null>(() => initialHtml(slug))
  const [failed, setFailed] = useState(false)
  const [tocOpen, setTocOpen] = useState(false)
  const [active, setActive] = useState('')
  const body = useRef<HTMLDivElement>(null)
  useMeta(entry ? `${entry.title} — Alex Santana` : text.contentMetaTitle, entry?.description ?? text.contentLead)

  useEffect(() => {
    if (html !== null || !entry) return
    fetch(`/acervo/${slug}.html`).then((response) => response.ok ? response.text() : Promise.reject(new Error(String(response.status))))
      .then((text) => { cache.set(slug, text); setHtml(text) }, () => setFailed(true))
  }, [html, slug, entry])

  // Ferramentas interativas: módulos servidos de /acervo/widgets/.
  useEffect(() => {
    if (html === null || !entry?.widgets.length || !body.current) return
    const root = body.current
    void (import(/* @vite-ignore */ widgetLoader) as Promise<WidgetLoader>).then((module) => module.montarWidgets(root)).catch((error) => console.error(error))
  }, [html, entry])

  // Item atual do sumário: o último título que já passou do topo da tela.
  useEffect(() => {
    if (html === null || !entry) return
    const ids = entry.toc.flatMap((section) => [section.id, ...section.children.map((child) => child.id)])
    const update = () => {
      let current = ''
      for (const id of ids) { const node = document.getElementById(id); if (node && node.getBoundingClientRect().top < 140) current = id }
      setActive(current)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [html, entry])

  if (!entry) return <main className="pp-missing"><p><a href="/conteudos">← {text.allContent}</a></p></main>
  const activeSection = entry.toc.find((section) => section.id === active || section.children.some((child) => child.id === active))?.id

  return <div className="page-shell subpage acervo-page">
    <Backdrop text={text}/>
    <SiteHeader current="content" lang={lang} theme={theme} text={text} onLang={toggleLang} onTheme={toggleTheme}/>
    <main id="main" tabIndex={-1} className="section-wrap">
      <a className="back-link" href="/conteudos"><span aria-hidden="true">←</span> {text.allContent}</a>
      <p className="acervo-meta">
        <span>{text.acervoTypes[entry.type] ?? entry.type}</span>
        {entry.state !== 'concluido' && <span className="acervo-state">{text.acervoState[entry.state]}</span>}
        {entry.updated && <span>{text.acervoUpdated} <time dateTime={entry.updated}>{acervoDate(entry.updated, lang)}</time></span>}
        {entry.lang !== lang && !(lang === 'pt-BR' && entry.lang.startsWith('pt')) && <span>{text.acervoLangNote}</span>}
      </p>
      <div className="acervo-layout">
        {entry.toc.length > 0 && <nav className={`acervo-toc glass${tocOpen ? ' open' : ''}`} aria-label={text.acervoToc}>
          <button className="acervo-toc-toggle" aria-expanded={tocOpen} onClick={() => setTocOpen((open) => !open)}>{text.acervoToc} <span aria-hidden="true">{tocOpen ? '−' : '+'}</span></button>
          <ol>{entry.toc.map((section) => <li key={section.id} className={activeSection === section.id ? 'on' : undefined}>
            <a href={`#${section.id}`} aria-current={active === section.id ? 'location' : undefined} onClick={() => setTocOpen(false)}>{section.title}{section.mark && <em>{section.mark}</em>}</a>
            {activeSection === section.id && section.children.length > 0 && <ol>{section.children.map((child) => <li key={child.id}><a href={`#${child.id}`} aria-current={active === child.id ? 'location' : undefined} onClick={() => setTocOpen(false)}>{child.title}</a></li>)}</ol>}
          </li>)}</ol>
        </nav>}
        <article className="acervo" lang={entry.lang}>
          {html === null
            ? <p className="acervo-loading" role="status">{failed ? text.acervoFail : text.acervoLoading}</p>
            : <div ref={body} data-acervo-body={slug} dangerouslySetInnerHTML={{ __html: html }}/>}
        </article>
      </div>
    </main>
    <SiteFooter text={text}/>
  </div>
}
