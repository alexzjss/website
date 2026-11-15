import { useEffect, useMemo, useState } from 'react'
import { flushSync } from 'react-dom'
import { inTrail, projects, type Area, type TrailFilter } from './content'
import { Backdrop, SiteFooter, SiteHeader, useMeta, usePrefs } from './shell'
import { CaseStudyCard, ProjectCard } from './projectCards'
import './styles.css'

const trailKeys: TrailFilter[] = ['all', 'rec', 'pes', 'com']
const areaKeys: Area[] = ['data', 'research', 'web', 'creative']

function readTrail(): TrailFilter {
  try {
    const query = new URLSearchParams(window.location.search).get('trilha') as TrailFilter | null
    if (query && trailKeys.includes(query)) return query
    const saved = localStorage.getItem('alex-trail') as TrailFilter | null
    return saved && trailKeys.includes(saved) ? saved : 'all'
  } catch { return 'all' }
}

export default function ProjectsPage() {
  const { lang, theme, text, toggleLang, toggleTheme } = usePrefs()
  const [trail, setTrail] = useState<TrailFilter>(readTrail)
  const [area, setArea] = useState<Area | 'all'>('all')
  useMeta(text.projectsMetaTitle, text.projectsPageLead)

  useEffect(() => { try { localStorage.setItem('alex-trail', trail) } catch { /* storage can be unavailable */ } }, [trail])

  const inScope = useMemo(() => projects.filter((project) => inTrail(project.trails, trail)), [trail])
  const counts = useMemo(() => Object.fromEntries(areaKeys.map((key) => [key, inScope.filter((project) => project.area === key).length])) as Record<Area, number>, [inScope])
  const visible = area === 'all' ? inScope : inScope.filter((project) => project.area === area)
  const studies = visible.filter((project) => project.caseStudy)
  const others = visible.filter((project) => !project.caseStudy)

  // Filter changes animate with the same View Transitions used across the site.
  const change = (apply: () => void) => {
    const start = (document as Document & { startViewTransition?: (callback: () => void) => unknown }).startViewTransition
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!start || reduced) { apply(); return }
    start.call(document, () => flushSync(apply))
  }

  return <div className="page-shell subpage">
    <Backdrop text={text}/>
    <SiteHeader current="projects" lang={lang} theme={theme} text={text} onLang={toggleLang} onTheme={toggleTheme}/>
    <main id="main" tabIndex={-1} className="section-wrap">
      <header className="page-head">
        <h1>{text.projects}</h1>
        <p className="page-lead">{text.projectsPageLead}</p>
      </header>

      <div className="filters">
        <div className="filter-row" role="group" aria-label={text.trailLabel}>
          <span className="filter-name" aria-hidden="true">{text.trailLabel}</span>
          {trailKeys.map((key) => <button key={key} className={`chip glass${trail === key ? ' on' : ''}`} aria-pressed={trail === key} onClick={() => change(() => { setTrail(key); setArea('all') })}>{text.trails[key].name}</button>)}
        </div>
        <div className="filter-row" role="group" aria-label={text.areaFilter}>
          <span className="filter-name" aria-hidden="true">{text.areaName}</span>
          <button className={`chip glass${area === 'all' ? ' on' : ''}`} aria-pressed={area === 'all'} onClick={() => change(() => setArea('all'))}>{text.areaAll} <small>{inScope.length}</small></button>
          {areaKeys.filter((key) => counts[key] > 0).map((key) => <button key={key} className={`chip glass${area === key ? ' on' : ''}`} aria-pressed={area === key} onClick={() => change(() => setArea(key))}>{text.areas[key]} <small>{counts[key]}</small></button>)}
        </div>
        <p className="filter-count" role="status">{visible.length} {visible.length === 1 ? text.projectCountOne : text.projectCountMany}</p>
      </div>

      {studies.length > 0 && <section className="page-section" aria-labelledby="studies-title">
        <h2 id="studies-title">{text.caseStudies}</h2>
        <div className="featured">{studies.map((project) => <CaseStudyCard key={project.id} project={project} lang={lang} text={text}/>)}</div>
      </section>}

      {others.length > 0 && <section className="page-section" aria-labelledby="others-title">
        <h2 id="others-title">{studies.length ? text.moreProjects : text.projects}</h2>
        <div className="project-grid">{others.map((project) => <ProjectCard key={project.id} project={project} lang={lang} text={text}/>)}</div>
      </section>}

      {visible.length === 0 && <p className="empty-state page-empty">{text.empty} <button onClick={() => change(() => { setTrail('all'); setArea('all') })}>{text.clearFilters}</button></p>}
    </main>
    <SiteFooter text={text}/>
  </div>
}
