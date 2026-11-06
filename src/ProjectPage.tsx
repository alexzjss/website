import { useEffect, useState } from 'react'
import { details, projects, site, tx, type Lang } from './content'
import { ui } from './ui'
import ArchDiagram from './Diagram'
import './styles.css'

const hasWindow = typeof window !== 'undefined'
const order = Object.keys(details)

function readLang(): Lang {
  try {
    const param = new URLSearchParams(window.location.search).get('lang')
    if (param === 'en') return 'en'
    if (param === 'pt') return 'pt-BR'
    return localStorage.getItem('alex-lang') === 'en' ? 'en' : 'pt-BR'
  } catch { return 'pt-BR' }
}
function readTheme(): 'light' | 'dark' {
  try {
    const param = new URLSearchParams(window.location.search).get('theme')
    if (param === 'light' || param === 'dark') return param
    const stored = localStorage.getItem('alex-theme')
    if (stored === 'light' || stored === 'dark') return stored
  } catch { /* storage can be unavailable */ }
  return hasWindow && typeof window.matchMedia === 'function' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export default function ProjectPage({ id }: { id: string }) {
  const [lang, setLang] = useState<Lang>(readLang)
  const [theme, setTheme] = useState<'light' | 'dark'>(readTheme)
  const text = ui[lang]
  const project = projects.find((item) => item.id === id)
  const detail = details[id]

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dataset.theme = theme
    if (project) {
      document.title = `${project.name} — Alex Santana`
      document.querySelector('meta[name="description"]')?.setAttribute('content', tx(project.tagline, lang))
      document.querySelector('meta[property="og:title"]')?.setAttribute('content', `${project.name} — Alex Santana`)
      document.querySelector('meta[property="og:description"]')?.setAttribute('content', tx(project.tagline, lang))
    }
    try { localStorage.setItem('alex-lang', lang) } catch { /* ignore */ }
  }, [lang, theme, project])

  if (!project || !detail) return <main className="pp-missing"><p><a href="/">← {text.cvBack}</a></p></main>

  const position = order.indexOf(id)
  const next = projects.find((item) => item.id === order[(position + 1) % order.length])!
  const previous = projects.find((item) => item.id === order[(position - 1 + order.length) % order.length])!

  return <div className="page-shell pp">
    <div className="blobs" aria-hidden="true"><i/><i/><i/></div>
    <a className="skip-link" href="#main">{text.skip}</a>
    <div className="topbar glass pp-bar" role="group">
      <a className="bar-link" href="/#projects">← {text.ppBack}</a>
      <span className="bar-sep" aria-hidden="true"/>
      <button className="bar-button" onClick={() => setLang(lang === 'pt-BR' ? 'en' : 'pt-BR')} aria-label={text.language}>{lang === 'pt-BR' ? 'PT' : 'EN'}</button>
      <button className="bar-button" onClick={() => { const nextTheme = theme === 'light' ? 'dark' : 'light'; setTheme(nextTheme); try { localStorage.setItem('alex-theme', nextTheme) } catch { /* ignore */ } }} aria-label={theme === 'light' ? text.themeDark : text.themeLight} aria-pressed={theme === 'dark'}>{theme === 'light' ? '☾' : '☀'}</button>
    </div>

    <main id="main" tabIndex={-1} className="section-wrap">
      <header className="pp-head">
        <p className="eyebrow"><span className={`area-dot area-${project.area}`} aria-hidden="true"/>{text.areas[project.area]} · {text.status[project.status]}</p>
        <h1>{project.name}</h1>
        <p className="pp-tagline">{tx(project.tagline, lang)}</p>
        <div className="project-links pp-links">
          {project.demo && <a className="btn glass primary" href={project.demo} target="_blank" rel="noreferrer">{text.demo} <span aria-hidden="true">↗</span></a>}
          <a className="btn glass" href={project.url} target="_blank" rel="noreferrer">{text.code} <span aria-hidden="true">↗</span></a>
        </div>
      </header>

      {project.image && <div className={`pp-hero glass${project.fit === 'contain' ? ' contain' : ''}`}><img src={project.image} alt={project.imageAlt ? tx(project.imageAlt, lang) : ''} width="1200" height="750" style={{ viewTransitionName: `img-${project.id}` }} {...{ fetchpriority: 'high' }}/></div>}

      <section className="pp-metrics" aria-label={text.ppMetrics}><dl>{detail.metrics.map((metric) => <div className="stat glass" key={metric.value}><dt>{tx(metric.label, lang)}</dt><dd>{metric.value}</dd></div>)}</dl></section>

      <section className="pp-section"><h2>{text.ppOverview}</h2><p className="pp-lead">{tx(project.description, lang)}</p>
        {project.caseStudy && <dl className="case-facts pp-facts"><div><dt>{text.problem}</dt><dd>{tx(project.caseStudy.problem, lang)}</dd></div><div><dt>{text.solution}</dt><dd>{tx(project.caseStudy.solution, lang)}</dd></div><div><dt>{text.result}</dt><dd>{tx(project.caseStudy.result, lang)}</dd></div></dl>}
      </section>

      <section className="pp-section"><h2>{text.ppHow}</h2><ArchDiagram data={detail.diagram} lang={lang} caption={tx(detail.diagramCaption, lang)} name={text.ppDiagram}/></section>

      <section className="pp-section"><h2>{text.ppDecisions}</h2>
        <ol className="decisions">{detail.decisions.map((decision, index) => <li className="decision glass" key={decision.title.en}><span className="decision-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><h3>{tx(decision.title, lang)}</h3><p>{tx(decision.text, lang)}</p></li>)}</ol>
      </section>

      {detail.limits && <section className="pp-section"><h2>{text.ppLimits}</h2><ul className="limits">{detail.limits.map((item) => <li key={item.en}>{tx(item, lang)}</li>)}</ul></section>}

      <section className="pp-section"><h2>{text.ppStack}</h2><div className="tags pp-tags">{project.stack.map((tech) => <span key={tech}>{tech}</span>)}</div></section>

      <nav className="pp-next" aria-label={text.ppNext}>
        <a className="glass" href={`/projetos/${previous.id}`}><small>← {text.ppPrev}</small><b>{previous.name}</b></a>
        <a className="glass" href={`/projetos/${next.id}`}><small>{text.ppNext} →</small><b>{next.name}</b></a>
      </nav>
    </main>
    <footer className="site-footer"><span>© {new Date().getFullYear()} {site.name}</span><a href="/#projects">{text.ppBack} ↑</a></footer>
  </div>
}
