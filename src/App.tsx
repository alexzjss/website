import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { awards, certifications, collective, gallery, hasDetail, highlights, inTrail, organizations, projectHref, projects, research, site, skillGroups, tx, type Area, type Entry, type Lang, type Project, type Trail, type TrailFilter } from './content'
import { ui, type UI } from './ui'
import CvPage from './CvPage'
import ProjectPage from './ProjectPage'
import './styles.css'

const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect
const hasWindow = typeof window !== 'undefined'
const trailKeys: TrailFilter[] = ['all', 'rec', 'pes', 'com']
const areaKeys: Area[] = ['data', 'research', 'web', 'creative']

function readPreference<T extends string>(key: string, allowed: readonly T[], fallback: T): T {
  try { const value = localStorage.getItem(key) as T | null; return value && allowed.includes(value) ? value : fallback } catch { return fallback }
}
function readParam(name: string) { try { return new URLSearchParams(window.location.search).get(name) } catch { return null } }
function systemPrefersDark() { return hasWindow && typeof window.matchMedia === 'function' && window.matchMedia('(prefers-color-scheme: dark)').matches }
const reducedMotion = () => hasWindow && typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

function CountUp({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLElement>(null)
  const [shown, setShown] = useState(value)
  useIsoLayoutEffect(() => {
    if (reducedMotion() || !ref.current) return
    setShown(0)
    const observer = new IntersectionObserver(([item]) => {
      if (!item.isIntersecting) return
      observer.disconnect()
      const start = performance.now()
      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / 1300)
        setShown(Math.round(value * (1 - Math.pow(1 - progress, 3))))
        if (progress < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, { threshold: .4 })
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value])
  return <b ref={ref}>{shown}{shown === value ? suffix : ''}</b>
}

function ProjectLinks({ project, text }: { project: Project; text: UI }) {
  const study = hasDetail(project.id)
  return <div className="project-links">
    {study && <a className="pill primary" href={`/projetos/${project.id}`} aria-label={`${text.viewStudy}: ${project.name}`}>{text.viewStudy} <span aria-hidden="true">→</span></a>}
    {project.demo && <a className={`pill${study ? '' : ' primary'}`} href={project.demo} target="_blank" rel="noreferrer" aria-label={`${text.demo}: ${project.name} (${text.open})`}>{text.demo} <span aria-hidden="true">↗</span></a>}
    <a className="pill" href={project.url} target="_blank" rel="noreferrer" aria-label={`${text.code}: ${project.name} — GitHub (${text.open})`}>{text.code} <span aria-hidden="true">↗</span></a>
  </div>
}

function App({ path }: { path?: string }) {
  const currentPath = path ?? (hasWindow ? window.location.pathname : '/')
  const clean = currentPath.replace(/\/+$/, '')
  if (clean === '/cv') return <CvPage />
  const match = clean.match(/^\/projetos\/([\w-]+)$/)
  if (match) return <ProjectPage id={match[1]} />
  return <Portfolio />
}

function Portfolio() {
  const [lang, setLang] = useState<Lang>(() => {
    const param = readParam('lang')
    return param === 'en' ? 'en' : param === 'pt' ? 'pt-BR' : readPreference('alex-lang', ['pt-BR', 'en'], 'pt-BR')
  })
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const param = readParam('theme')
    return param === 'light' || param === 'dark' ? param : readPreference('alex-theme', ['light', 'dark'], systemPrefersDark() ? 'dark' : 'light')
  })
  const [themeManual, setThemeManual] = useState(() => { try { return localStorage.getItem('alex-theme') !== null } catch { return false } })
  const [trail, setTrail] = useState<TrailFilter>(() => {
    const param = readParam('trilha') as TrailFilter | null
    return param && trailKeys.includes(param) ? param : readPreference('alex-trail', trailKeys, 'all')
  })
  const [area, setArea] = useState<Area | 'all'>('all')
  const [open, setOpen] = useState<string[]>([])
  const [activeSection, setActiveSection] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [copyState, setCopyState] = useState('')
  const [lightbox, setLightbox] = useState<number | null>(null)
  const [skill, setSkill] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const heroRef = useRef<HTMLElement>(null)
  const progressRef = useRef<HTMLSpanElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const text = ui[lang]

  const visibleHighlights = useMemo(() => highlights.filter((item) => inTrail(item.trails, trail)).sort((a, b) => b.sortKey - a.sortKey), [trail])
  const visibleOrganizations = useMemo(() => organizations.filter((item) => inTrail(item.trails, trail)).sort((a, b) => b.sortKey - a.sortKey), [trail])
  const featured = useMemo(() => projects.filter((project) => project.caseStudy && inTrail(project.trails, trail)), [trail])
  const others = useMemo(() => projects.filter((project) => !project.caseStudy && inTrail(project.trails, trail)), [trail])
  const visibleProjects = useMemo(() => area === 'all' ? others : others.filter((project) => project.area === area), [area, others])
  const areaCounts = useMemo(() => Object.fromEntries(areaKeys.map((key) => [key, others.filter((project) => project.area === key).length])) as Record<Area, number>, [others])
  const photos = useMemo(() => gallery.filter((photo) => inTrail(photo.trails, trail)), [trail])
  const sectionIds = useMemo(() => ['home', 'experience', 'projects', ...(trail === 'all' || trail === 'pes' ? ['research'] : []), 'awards', ...(photos.length ? ['gallery'] : []), 'about', 'contact'], [trail, photos.length])
  const numberOf = (id: string) => String(sectionIds.indexOf(id)).padStart(2, '0')
  const stats = [{ value: 700, suffix: '+' }, { value: 875, suffix: '' }, { value: awards.length, suffix: '' }, { value: projects.length, suffix: '' }]

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dataset.theme = theme
    document.title = text.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', text.description)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', text.title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', text.description)
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', text.title)
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', text.description)
    const card = `${site.url}${lang === 'pt-BR' ? '/social-card.png' : '/social-card-en.png'}`
    document.querySelector('meta[property="og:image"]')?.setAttribute('content', card)
    document.querySelector('meta[name="twitter:image"]')?.setAttribute('content', card)
    document.querySelector('meta[property="og:image:alt"]')?.setAttribute('content', lang === 'pt-BR' ? 'Portfólio de Alex Santana' : 'Alex Santana portfolio')
    document.querySelector('meta[property="og:locale"]')?.setAttribute('content', lang === 'pt-BR' ? 'pt_BR' : 'en_US')
    try { localStorage.setItem('alex-lang', lang); localStorage.setItem('alex-trail', trail); if (themeManual) localStorage.setItem('alex-theme', theme) } catch { /* storage can be unavailable */ }
  }, [lang, theme, themeManual, trail, text])

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('main section[id]'))
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((item) => item.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: [0, .15, .4, .65] })
    sections.forEach((section) => observer.observe(section))
    const revealObserver = new IntersectionObserver((entries, current) => entries.forEach((item) => {
      if (item.isIntersecting) { item.target.classList.add('is-visible'); current.unobserve(item.target) }
    }), { threshold: .06 })
    const revealTargets = document.querySelectorAll('.section-heading, .timeline-entry, .case-study, .pcard, .award, .photo, .about-content, .about-resume, .research-copy, .contact-card')
    revealTargets.forEach((element) => {
      if (element.classList.contains('is-visible')) return
      if (element.getBoundingClientRect().top < window.innerHeight * .92) { element.classList.add('is-visible'); return }
      element.classList.add('reveal'); revealObserver.observe(element)
    })
    return () => { observer.disconnect(); revealObserver.disconnect() }
  }, [trail, area, lang])

  useEffect(() => {
    const updateProgress = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      const progress = total > 0 ? window.scrollY / total : 0
      progressRef.current?.style.setProperty('transform', `scaleX(${progress})`)
      progressRef.current?.parentElement?.setAttribute('aria-valuenow', String(Math.round(progress * 100)))
      setScrolled(window.scrollY > 40)
      if (heroRef.current && !reducedMotion()) heroRef.current.style.setProperty('--hero', String(Math.min(1, Math.max(0, window.scrollY / (window.innerHeight * .8)))))
      const timeline = timelineRef.current
      if (timeline) {
        const box = timeline.getBoundingClientRect()
        const line = window.innerHeight * .6
        timeline.style.setProperty('--tl', String(Math.min(1, Math.max(0, (line - box.top) / box.height))))
        timeline.querySelectorAll<HTMLElement>('.timeline-dot').forEach((dot) => dot.classList.toggle('passed', dot.getBoundingClientRect().top < line))
      }
    }
    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)
    return () => { window.removeEventListener('scroll', updateProgress); window.removeEventListener('resize', updateProgress) }
  }, [trail])

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const sync = (event: MediaQueryListEvent) => { if (!themeManual) setTheme(event.matches ? 'dark' : 'light') }
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [themeManual])

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  useEffect(() => {
    // The liquid-glass sheen follows the pointer on any glass surface.
    if (reducedMotion()) return
    const move = (event: PointerEvent) => {
      const glass = (event.target as Element | null)?.closest?.<HTMLElement>('.glass')
      if (!glass) return
      const box = glass.getBoundingClientRect()
      glass.style.setProperty('--mx', `${event.clientX - box.left}px`)
      glass.style.setProperty('--my', `${event.clientY - box.top}px`)
    }
    document.addEventListener('pointermove', move, { passive: true })
    return () => document.removeEventListener('pointermove', move)
  }, [])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (lightbox !== null && !dialog.open) dialog.showModal()
    if (lightbox === null && dialog.open) dialog.close()
  }, [lightbox])

  const toggle = (id: string) => setOpen((previous) => previous.includes(id) ? previous.filter((item) => item !== id) : [...previous, id])
  const chooseTrail = (next: TrailFilter) => {
    const apply = () => { setTrail(next); setArea('all') }
    const start = (document as Document & { startViewTransition?: (callback: () => void) => unknown }).startViewTransition
    if (!start || reducedMotion()) { apply(); return }
    start.call(document, () => flushSync(apply))
  }
  const copyEmail = async () => {
    try { await navigator.clipboard.writeText(site.email); setCopyState(text.copied) } catch { setCopyState(text.copyFail) }
    window.setTimeout(() => setCopyState(''), 2600)
  }
  const stepPhoto = (delta: number) => setLightbox((current) => current === null ? null : (current + delta + photos.length) % photos.length)

  const entry = (item: Entry, nested = false) => {
    const expanded = open.includes(item.id)
    return <article className={nested ? 'organization' : 'timeline-entry'} key={item.id} style={{ viewTransitionName: `e-${item.id}` }}>
      {!nested && <span className="timeline-dot" aria-hidden="true" />}
      <div className="entry-heading">{item.logo && <img className="org-logo" src={item.logo} alt="" width="46" height="46" loading="lazy" decoding="async"/>}<div><p className="period">{tx(item.period, lang)}{item.kind && <span className={`kind kind-${item.kind}`}>{text.kinds[item.kind]}</span>}</p><h3>{item.name}</h3><p className="role">{tx(item.role, lang)}</p></div></div>
      <p className="summary">{tx(item.summary, lang)}</p>
      <button className="disclosure" aria-expanded={expanded} aria-controls={`detail-${item.id}`} onClick={() => toggle(item.id)}>{expanded ? text.close : text.details}<span aria-hidden="true">{expanded ? '−' : '+'}</span></button>
      <div className="entry-details" id={`detail-${item.id}`} hidden={!expanded}><p>{tx(item.details, lang)}</p>{item.link && <a className="entry-link" href={item.link.href}>{tx(item.link.label, lang)} <span aria-hidden="true">→</span></a>}</div>
    </article>
  }

  const tiltPortrait = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse' || reducedMotion()) return
    const stage = event.currentTarget
    const box = stage.getBoundingClientRect()
    const x = (event.clientX - box.left) / box.width - .5
    const y = (event.clientY - box.top) / box.height - .5
    stage.style.transition = 'transform 160ms ease-out'
    stage.style.setProperty('--tilt-x', `${-y * 30}deg`)
    stage.style.setProperty('--tilt-y', `${x * 34}deg`)
    stage.style.setProperty('--px', String(x * 2))
    stage.style.setProperty('--py', String(y * 2))
    stage.style.setProperty('--gx', `${(x + .5) * 100}%`)
    stage.style.setProperty('--gy', `${(y + .5) * 100}%`)
    stage.style.setProperty('--glare', '1')
  }
  const resetPortrait = (event: React.PointerEvent<HTMLDivElement>) => {
    const stage = event.currentTarget
    stage.style.transition = 'transform 800ms cubic-bezier(.2,.9,.3,1.25)'
    for (const name of ['--tilt-x', '--tilt-y']) stage.style.setProperty(name, '0deg')
    for (const name of ['--px', '--py']) stage.style.setProperty(name, '0')
    stage.style.setProperty('--glare', '0')
  }

  const photo = lightbox !== null ? photos[lightbox] : null
  const activeSkill = useMemo(() => {
    const found = skillGroups.flatMap((group) => group.items).find((item) => item.name === skill)
    if (!found) return null
    return { name: found.name, evidence: found.evidence.map((item) => {
      if (item.kind === 'project') { const project = projects.find((candidate) => candidate.id === item.id); return project ? { label: project.name, href: projectHref(project) } : null }
      const entryItem = [...highlights, ...organizations].find((candidate) => candidate.id === item.id)
      return entryItem ? { label: entryItem.name, href: '#experience' } : null
    }) }
  }, [skill])

  return <div className="page-shell">
    <div className="blobs" aria-hidden="true"><i/><i/><i/></div>
    <a className="skip-link" href="#main">{text.skip}</a>
    <div className="reading-progress" role="progressbar" aria-label={text.progress} aria-valuemin={0} aria-valuemax={100} aria-valuenow={0}><span ref={progressRef}/></div>

    <div className={`topbar glass${scrolled ? ' scrolled' : ''}`} role="group" aria-label={text.trailLabel}>
      <div className="segment">{trailKeys.map((key) => <button key={key} className={trail === key ? 'on' : ''} aria-pressed={trail === key} aria-label={text.trails[key].name} onClick={() => chooseTrail(key)}><span className="full">{text.trails[key].name}</span><span className="short" aria-hidden="true">{text.trails[key].short}</span></button>)}</div>
      <span className="bar-sep" aria-hidden="true"/>
      <button className="bar-button" onClick={() => setLang(lang === 'pt-BR' ? 'en' : 'pt-BR')} aria-label={text.language}>{lang === 'pt-BR' ? 'PT' : 'EN'}</button>
      <button className="bar-button" onClick={() => { setTheme(theme === 'light' ? 'dark' : 'light'); setThemeManual(true) }} aria-label={theme === 'light' ? text.themeDark : text.themeLight} aria-pressed={theme === 'dark'}>{theme === 'light' ? '☾' : '☀'}</button>
    </div>

    <button className="mobile-nav-trigger glass" aria-label={menuOpen ? text.closeMenu : text.menu} aria-expanded={menuOpen} aria-controls="floating-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? '×' : '☰'}<span>{menuOpen ? text.closeMenu : text.menu}</span></button>
    <nav className={`floating-nav glass${menuOpen ? ' menu-open' : ''}`} id="floating-navigation" aria-label={text.navLabel}>
      {sectionIds.map((id) => <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''} aria-current={activeSection === id ? 'location' : undefined} onClick={() => setMenuOpen(false)}><span className="nav-icon" aria-hidden="true"><NavIcon name={id}/></span><span className="nav-label">{(text.nav as Record<string, string>)[id]}</span></a>)}
    </nav>

    <main id="main" tabIndex={-1}>
      <section className="hero section-wrap" id="home" ref={heroRef}>
        <div className="hero-copy">
          <p className="status-chip glass"><span className="status-dot" aria-hidden="true"/><img src="/images/organizations/banco-safra.jpg" alt="" width="20" height="20"/>{text.statusChip}</p>
          <p className="eyebrow">{text.portfolio} · 2026</p>
          <h1 key={lang}><span>{text.hello}</span><br />Alex<span className="accent">.</span></h1>
          <p className="hero-intro" key={trail}>{text.trails[trail].lead}</p>
          <div className="hero-links">
            <a className="btn glass primary" href="#projects">{text.viewProjects} →</a>
            <a className="btn glass" href="/documents/CV-pt.pdf" download="Alex-Santana-CV-pt.pdf" aria-label={text.cvPt}>CV · PT</a>
            <a className="btn glass" href="/documents/CV-en.pdf" download="Alex-Santana-CV-en.pdf" aria-label={text.cvEn}>CV · EN</a>
            <a className="btn glass" href={site.github} target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
            <a className="btn glass" href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <div className="hero-composition"><div className="portrait-stage" onPointerMove={tiltPortrait} onPointerLeave={resetPortrait}><div className="portrait-frame glass"><div className="portrait-photo"><img src="/images/profile/alex-santana.jpg" alt={text.photoHero} width="709" height="1064" {...{ fetchpriority: 'high' }}/><span className="portrait-glare" aria-hidden="true"/></div></div><span className="portrait-chip glass" aria-hidden="true">USP · SÃO PAULO</span></div></div>
      </section>

      <section className="stats section-wrap" aria-label={text.numbers}><dl>{stats.map((item, index) => <div className="stat glass" key={index}><dt>{text.stats[index]}</dt><dd><CountUp value={item.value} suffix={item.suffix}/></dd></div>)}</dl></section>

      <section className="section-wrap trails" aria-labelledby="trails-title">
        <h2 id="trails-title" className="sr-only">{text.trailTitle}</h2>
        <div className="trail-grid">{trailKeys.filter((key): key is Trail => key !== 'all').map((key) => <button key={key} className={`trail-card glass${trail === key ? ' on' : ''}`} aria-pressed={trail === key} onClick={() => chooseTrail(trail === key ? 'all' : key)}><b>{text.trails[key].name}</b><span>{text.trails[key].blurb}</span><em>{trail === key ? `${text.trailShowing} ✓` : `${text.openTrail} →`}</em></button>)}</div>
        {trail !== 'all' && <p className="trail-status">{text.trailShowing}: <strong>{text.trails[trail].name}</strong> · <button onClick={() => chooseTrail('all')}>{text.trailAll}</button></p>}
      </section>

      <section className="section-wrap section" id="experience"><SectionHeading number={numberOf('experience')} label={text.experience} title={text.experienceLead}/>
        <div className="timeline" ref={timelineRef}>
          {visibleHighlights.map((item) => entry(item))}
          {visibleOrganizations.length > 0 && <article className="timeline-entry collective-entry"><span className="timeline-dot" aria-hidden="true"/><p className="period">{tx(collective.period, lang)}<span className="kind kind-academic">{text.kinds.academic}</span></p><h3>{text.orgs}</h3><p className="role">{text.collectiveRole}</p><p className="summary">{tx(collective.summary, lang)}</p><div className="organization-list">{visibleOrganizations.map((item) => entry(item, true))}</div></article>}
        </div>
      </section>

      <section className="section-wrap section" id="projects"><SectionHeading number={numberOf('projects')} label={text.projects} title={text.projectLead}/>
        {featured.length > 0 && <div className="featured"><h3 className="subheading">{text.caseStudies}</h3>{featured.map((project) => <article className="case-study" key={project.id} style={{ viewTransitionName: `c-${project.id}` }}>
          {project.image && <a className="case-media" href={projectHref(project)} {...(hasDetail(project.id) ? {} : { target: '_blank', rel: 'noreferrer' })} tabIndex={-1} aria-hidden="true"><img src={project.image} alt="" width="1200" height="750" style={hasDetail(project.id) ? { viewTransitionName: `img-${project.id}` } : undefined} loading="lazy" decoding="async"/></a>}
          <div className="case-body"><p className="eyebrow">{text.caseLabel} · {text.areas[project.area]}</p><h3>{project.name}</h3><p className="case-lead">{tx(project.description, lang)}</p>
            {project.caseStudy && <dl className="case-facts"><div><dt>{text.problem}</dt><dd>{tx(project.caseStudy.problem, lang)}</dd></div><div><dt>{text.solution}</dt><dd>{tx(project.caseStudy.solution, lang)}</dd></div><div><dt>{text.result}</dt><dd>{tx(project.caseStudy.result, lang)}</dd></div></dl>}
            <div className="tags">{project.stack.map((tech) => <span key={tech}>{tech}</span>)}</div><ProjectLinks project={project} text={text}/></div>
        </article>)}</div>}
        <h3 className="subheading more">{text.moreProjects}</h3>
        <div className="area-filter" role="group" aria-label={text.areaFilter}>
          <button className={`chip glass${area === 'all' ? ' on' : ''}`} aria-pressed={area === 'all'} onClick={() => setArea('all')}>{text.areaAll} <small>{others.length}</small></button>
          {areaKeys.filter((key) => areaCounts[key] > 0).map((key) => <button key={key} className={`chip glass${area === key ? ' on' : ''}`} aria-pressed={area === key} onClick={() => setArea(key)}>{text.areas[key]} <small>{areaCounts[key]}</small></button>)}
        </div>
        <div className="project-grid">{visibleProjects.length ? visibleProjects.map((project) => <article className={`pcard${project.size === 'wide' ? ' wide' : ''}${project.image ? ' has-image' : ''}`} key={project.id} style={{ viewTransitionName: `p-${project.id}` }}>
          {project.image && <a className={`pcard-media${project.fit === 'contain' ? ' contain' : ''}`} href={projectHref(project)} {...(hasDetail(project.id) ? {} : { target: '_blank', rel: 'noreferrer' })} tabIndex={-1} aria-hidden="true"><img src={project.image} alt="" width="1200" height="750" style={{ objectPosition: project.position, ...(hasDetail(project.id) ? { viewTransitionName: `img-${project.id}` } : {}) }} loading="lazy" decoding="async"/></a>}
          <div className="pcard-body"><p className="eyebrow"><span className={`area-dot area-${project.area}`} aria-hidden="true"/>{text.areas[project.area]} · {text.status[project.status]}</p><h3>{project.name}</h3><p className="tagline">{tx(project.tagline, lang)}</p><p className="desc">{tx(project.description, lang)}</p><div className="tags">{project.stack.slice(0, 5).map((tech) => <span key={tech}>{tech}</span>)}</div><ProjectLinks project={project} text={text}/></div>
        </article>) : <p className="empty-state">{text.empty}</p>}</div>
      </section>

      {(trail === 'all' || trail === 'pes') && <section className="research-band" id="research"><div className="section-wrap research-inner"><SectionHeading number={numberOf('research')} label={text.research} title={text.researchTitle}/><div className="research-copy"><p className="period">{tx(research.period, lang)}</p><p className="research-affiliation">{research.institution}<br/>{research.advisor}</p><p>{tx(research.summary, lang)}</p><div className="research-block"><span className="eyebrow">{text.researchMethod}</span><p>{tx(research.method, lang)}</p></div><div className="research-block"><span className="eyebrow">{text.researchTools}</span><div className="tags">{research.tools.map((tool) => <span key={tool}>{tool}</span>)}</div></div><div className="research-block"><span className="eyebrow">{text.researchStatus}</span><p>{tx(research.status, lang)}</p></div></div></div></section>}

      <section className="section-wrap section" id="awards"><SectionHeading number={numberOf('awards')} label={text.nav.awards} title={text.awardsTitle}/>
        <p className="section-lead">{text.awardsLead}</p>
        <ol className="awards">{awards.map((award) => <li className="award glass" key={award.id} style={{ viewTransitionName: `a-${award.id}` }}><span className="award-dot" aria-hidden="true"/><p className="period">{award.year ?? '—'}</p><h3>{tx(award.title, lang)}</h3><p>{tx(award.context, lang)}</p>{award.image && <img src={award.image.src} alt={tx(award.image.alt, lang)} width="798" height="1064" loading="lazy" decoding="async"/>}</li>)}</ol>
      </section>

      {photos.length > 0 && <section className="section-wrap section" id="gallery"><SectionHeading number={numberOf('gallery')} label={text.nav.gallery} title={text.galleryTitle}/>
        <p className="section-lead">{text.galleryLead}</p>
        <div className="gallery">{photos.map((item, index) => <button className="photo" key={item.id} style={{ viewTransitionName: `ph-${item.id}` }} onClick={() => setLightbox(index)} aria-label={`${text.openPhoto}: ${tx(item.caption, lang)}`}><img src={item.src} alt={tx(item.alt, lang)} width={item.width} height={item.height} loading="lazy" decoding="async"/><span className="photo-caption glass">{tx(item.caption, lang)}</span></button>)}</div>
      </section>}

      <section className="section-wrap section about-section" id="about"><SectionHeading number={numberOf('about')} label={text.about} title={text.aboutTitle}/>
        <div className="about-content"><p>{text.aboutText}</p><div className="education-card glass"><span className="eyebrow">{text.education}</span><h3>{text.educationProgram}</h3><p>{text.educationInstitution}</p><span className="education-period">{text.educationStatus}</span><span className="eyebrow languages-label">{text.languages}</span><p>{text.languagesLine}</p></div></div>
        <div className="about-resume"><div className="skill-groups"><h3>{text.skills}</h3>{skillGroups.map((group) => <div className="skill-group" key={group.title.en}><span>{tx(group.title, lang)}</span><div className="tags skill-tags">{group.items.map((item) => item.evidence.length ? <button key={item.name} className={`skill${skill === item.name ? ' on' : ''}`} aria-pressed={skill === item.name} onClick={() => setSkill(skill === item.name ? null : item.name)}>{item.name}</button> : <span key={item.name}>{item.name}</span>)}</div></div>)}
          <div className="skill-panel glass" aria-live="polite">{activeSkill ? <><p className="eyebrow">{text.usedIn} · {activeSkill.name}</p><ul>{activeSkill.evidence.map((link) => link && <li key={link.label}><a href={link.href}>{link.label} <span aria-hidden="true">→</span></a></li>)}</ul></> : <p>{text.skillsHint}</p>}</div></div><div className="honors-group"><h3>{text.certifications}</h3><ul>{certifications.map((item) => <li key={item.en}>{tx(item, lang)}</li>)}</ul></div></div>
      </section>

      <section className="contact-section" id="contact"><div className="section-wrap"><div className="contact-card glass"><SectionHeading number={numberOf('contact')} label={text.contact} title={text.contactTitle}/><div className="contact-content"><p>{text.contactText}</p><div className="contact-links"><a className="btn glass primary" href={`mailto:${site.email}`}>{text.sendEmail} <span aria-hidden="true">↗</span></a><button className="btn glass" onClick={copyEmail}>{text.copyEmail} <span aria-hidden="true">⧉</span></button><a className="btn glass" href={site.github} target="_blank" rel="noreferrer">{text.github} <span aria-hidden="true">↗</span></a><a className="btn glass" href={site.linkedin} target="_blank" rel="noreferrer">{text.linkedin} <span aria-hidden="true">↗</span></a><a className="btn glass" href="/cv">{text.cvPage}</a></div><p className="copy-status" role="status" aria-live="polite">{copyState}</p></div></div></div></section>
    </main>
    <footer className="site-footer"><span>© {new Date().getFullYear()} Alex Santana</span><a href="#home">{text.back}</a></footer>

    <dialog ref={dialogRef} className="lightbox" onClose={() => setLightbox(null)} onClick={(event) => { if (event.target === event.currentTarget) setLightbox(null) }} onKeyDown={(event) => { if (event.key === 'ArrowRight') stepPhoto(1); if (event.key === 'ArrowLeft') stepPhoto(-1) }} aria-label={photo ? tx(photo.caption, lang) : text.openPhoto}>
      {photo && <figure><img src={photo.src} alt={tx(photo.alt, lang)}/><figcaption className="glass">{tx(photo.caption, lang)}</figcaption></figure>}
      <button className="lb-close glass" onClick={() => setLightbox(null)} aria-label={text.closePhoto}>×</button>
      {photos.length > 1 && <><button className="lb-nav prev glass" onClick={() => stepPhoto(-1)} aria-label={text.prevPhoto}>‹</button><button className="lb-nav next glass" onClick={() => stepPhoto(1)} aria-label={text.nextPhoto}>›</button></>}
    </dialog>
  </div>
}

function SectionHeading({ number, label, title }: { number: string; label: string; title: string }) { return <div className="section-heading"><span className="section-number" aria-hidden="true">{number} /</span><div><p className="eyebrow">{label}</p><h2>{title}</h2></div></div> }
function NavIcon({ name }: { name: string }) {
  const paths: Record<string, React.ReactNode> = {
    home: <><path d="m3 10 9-7 9 7"/><path d="M5 9v12h14V9M9 21v-7h6v7"/></>,
    experience: <><rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V4h8v3M3 12h18M10 12v2h4v-2"/></>,
    projects: <><rect x="3" y="3" width="8" height="8" rx="1.5"/><rect x="13" y="3" width="8" height="8" rx="1.5"/><rect x="3" y="13" width="8" height="8" rx="1.5"/><rect x="13" y="13" width="8" height="8" rx="1.5"/></>,
    research: <><path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V3M8 15h8"/></>,
    awards: <><path d="M8 4h8v5a4 4 0 0 1-8 0V4ZM8 6H4v1a3 3 0 0 0 4 3M16 6h4v1a3 3 0 0 1-4 3M12 13v4M8 21h8M10 17h4"/></>,
    gallery: <><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="1.6"/><path d="m21 16-5-5-8 8"/></>,
    about: <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>,
    contact: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></>,
  }
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" focusable="false">{paths[name]}</svg>
}
export default App
