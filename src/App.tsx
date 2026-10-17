import { useEffect, useMemo, useRef, useState } from 'react'
import { awards, certifications, collective, educationPhotos, highlights, organizations, projects, research, skillGroups, tx, type Category, type Entry } from './content'
import './styles.css'

type Lang = 'pt-BR' | 'en'

const ui = {
  'pt-BR': {
    nav: ['Início', 'Experiência', 'Projetos', 'Pesquisa', 'Sobre', 'Formação', 'Contato'],
    intro: 'Sou estudante de Sistemas de Informação na USP e desenvolvo software, participo de pesquisa em teste de software e de projetos universitários nas áreas de dados, IA e tecnologia.',
    scroll: 'Role para explorar', projects: 'Projetos', all: 'Todos', experience: 'Experiência', research: 'Pesquisa', about: 'Sobre', contact: 'Contato',
    experienceLead: 'Desenvolvimento, pesquisa e colaboração na universidade.', projectLead: 'Sistemas e ferramentas para necessidades reais.',
    researchTitle: 'Geração de dados para teste e depuração de software', researchMethod: 'Método', researchTools: 'Ferramentas', researchStatus: 'Andamento',
    aboutTitle: 'Engenharia de software, dados e pesquisa.', aboutText: 'Sou estudante de Sistemas de Informação na Universidade de São Paulo (USP), com previsão de conclusão em 2029. Minha experiência combina desenvolvimento de software, pesquisa acadêmica e projetos de tecnologia. Tenho interesse em engenharia de software e back-end, engenharia de dados, machine learning e inteligência artificial.',
    skills: 'Competências técnicas', awards: 'Conquistas', certifications: 'Certificações e cursos', languages: 'Idiomas', education: 'Formação', educationTitle: 'Sistemas de Informação na USP', educationProgram: 'Bacharelado em Sistemas de Informação', educationInstitution: 'Universidade de São Paulo · Escola de Artes, Ciências e Humanidades (EACH-USP)', educationStatus: '2026 — 2029 · Em andamento',
    contactTitle: 'Vamos conversar?', contactText: 'Encontre meus projetos e entre em contato pelos meus perfis profissionais.', github: 'GitHub', linkedin: 'LinkedIn', email: 'E-mail', cv: 'Abrir currículo (PDF em inglês)', details: 'Ver detalhes', close: 'Fechar detalhes', orgs: 'Organizações universitárias',
    filters: { software: 'Software', research: 'Pesquisa e ferramentas', creative: 'Criativos' }, themeLight: 'Ativar tema claro', themeDark: 'Ativar tema escuro', language: 'Mudar idioma para inglês', navLabel: 'Navegação por seções', menu: 'Abrir navegação', closeMenu: 'Fechar navegação', progress: 'Progresso de leitura',
    collectiveRole: 'Seis organizações · uma frente de atuação', photoHero: 'Retrato de Alex Santana',
  },
  en: {
    nav: ['Home', 'Experience', 'Projects', 'Research', 'About', 'Education', 'Contact'],
    intro: 'I study Information Systems at USP, work on software testing research, and take part in university technology projects across data, AI, and software development.',
    scroll: 'Scroll to explore', projects: 'Projects', all: 'All', experience: 'Experience', research: 'Research', about: 'About', contact: 'Contact',
    experienceLead: 'Software development, research, and collaboration at university.', projectLead: 'Systems and tools built around practical needs.',
    researchTitle: 'Data generation for software testing and debugging', researchMethod: 'Method', researchTools: 'Tools', researchStatus: 'Status',
    aboutTitle: 'Software engineering, data, and research.', aboutText: 'I study Information Systems at the University of São Paulo (USP), with an expected graduation in 2029. My experience combines software development, academic research, and technology projects. My interests include software and backend engineering, data engineering, machine learning, and artificial intelligence.',
    skills: 'Technical skills', awards: 'Awards', certifications: 'Certificates and courses', languages: 'Languages', education: 'Education', educationTitle: 'Information Systems at USP', educationProgram: 'BSc in Information Systems', educationInstitution: 'University of São Paulo · School of Arts, Sciences and Humanities (EACH-USP)', educationStatus: '2026 — 2029 · In progress',
    contactTitle: 'Let’s talk.', contactText: 'Explore my projects and get in touch through my professional profiles.', github: 'GitHub', linkedin: 'LinkedIn', email: 'Email', cv: 'Open résumé (PDF in English)', details: 'View details', close: 'Close details', orgs: 'University organizations',
    filters: { software: 'Software', research: 'Research & tools', creative: 'Creative' }, themeLight: 'Switch to light theme', themeDark: 'Switch to dark theme', language: 'Mudar idioma para português', navLabel: 'Section navigation', menu: 'Open navigation', closeMenu: 'Close navigation', progress: 'Reading progress',
    collectiveRole: 'Six organizations · one area of involvement', photoHero: 'Portrait of Alex Santana',
  },
} as const

function readPreference<T extends string>(key: string, allowed: T[], fallback: T): T {
  try { const value = localStorage.getItem(key) as T | null; return value && allowed.includes(value) ? value : fallback } catch { return fallback }
}

function App() {
  const [lang, setLang] = useState<Lang>(() => readPreference('alex-lang', ['pt-BR', 'en'], 'pt-BR'))
  const [theme, setTheme] = useState<'light' | 'dark'>(() => readPreference('alex-theme', ['light', 'dark'], window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'))
  const [themeManual, setThemeManual] = useState(() => { try { return localStorage.getItem('alex-theme') !== null } catch { return false } })
  const [filter, setFilter] = useState<Category | 'all'>('all')
  const [open, setOpen] = useState<string[]>([])
  const [activeSection, setActiveSection] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const progressRef = useRef<HTMLSpanElement>(null)
  const portraitRef = useRef<HTMLDivElement>(null)
  const text = ui[lang]
  const visibleProjects = useMemo(() => filter === 'all' ? projects : projects.filter((project) => project.categories.includes(filter)), [filter])
  const sortedOrganizations = useMemo(() => [...organizations].sort((a, b) => b.sortKey - a.sortKey), [])

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dataset.theme = theme
    document.title = lang === 'pt-BR' ? 'Alex Santana — Sistemas, software e pesquisa' : 'Alex Santana — Systems, software, and research'
    const description = lang === 'pt-BR' ? 'Portfólio de Alex Santana, estudante de Sistemas de Informação na USP.' : 'Portfolio of Alex Santana, Information Systems student at USP.'
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', document.title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description)
    document.querySelector('meta[property="og:image"]')?.setAttribute('content', lang === 'pt-BR' ? '/social-card.svg' : '/social-card-en.svg')
    document.querySelector('meta[property="og:image:alt"]')?.setAttribute('content', lang === 'pt-BR' ? 'Portfólio de Alex Santana' : 'Alex Santana portfolio')
    document.querySelector('meta[property="og:locale"]')?.setAttribute('content', lang === 'pt-BR' ? 'pt_BR' : 'en_US')
    try { localStorage.setItem('alex-lang', lang); if (themeManual) localStorage.setItem('alex-theme', theme) } catch { /* storage can be unavailable */ }
  }, [lang, theme, themeManual])

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('main section[id]'))
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((item) => item.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: [0, .15, .4, .65] })
    sections.forEach((section) => observer.observe(section))
    const revealObserver = new IntersectionObserver((entries, current) => entries.forEach((item) => {
      if (item.isIntersecting) { item.target.classList.add('is-visible'); current.unobserve(item.target) }
    }), { threshold: .08 })
    const revealTargets = document.querySelectorAll('.section-heading, .timeline-entry, .project-row, .about-content, .about-resume, .education-overview, .research-copy, .contact-content')
    revealTargets.forEach((element) => { element.classList.add('reveal'); revealObserver.observe(element) })
    const updateProgress = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      const progress = total > 0 ? window.scrollY / total : 0
      progressRef.current?.style.setProperty('transform', `scaleX(${progress})`)
      progressRef.current?.parentElement?.setAttribute('aria-valuenow', String(Math.round(progress * 100)))
    }
    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)
    return () => { observer.disconnect(); revealObserver.disconnect(); window.removeEventListener('scroll', updateProgress); window.removeEventListener('resize', updateProgress) }
  }, [])

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const sync = (event: MediaQueryListEvent) => {
      if (!themeManual) setTheme(event.matches ? 'dark' : 'light')
    }
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [themeManual])

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  const toggle = (id: string) => setOpen((previous) => previous.includes(id) ? previous.filter((item) => item !== id) : [...previous, id])
  const entry = (item: Entry, nested = false) => {
    const expanded = open.includes(item.id)
    return <article className={nested ? 'organization' : 'timeline-entry'} key={item.id}>
      {!nested && <span className="timeline-dot" aria-hidden="true" />}
      <div className="entry-head"><div className="entry-heading">{item.logo && <img className="org-logo" src={item.logo} alt="" loading="lazy"/>}<div><p className="period">{tx(item.period, lang)}</p><h3>{item.name}</h3><p className="role">{tx(item.role, lang)}</p></div></div></div>
      <p>{tx(item.summary, lang)}</p>
      {(item.photo || item.photos?.length) && <div className="entry-gallery">{[...(item.photo ? [item.photo] : []), ...(item.photos ?? [])].map((photo) => <img className="entry-photo" key={photo.src} src={photo.src} alt={tx(photo.alt, lang)} loading="lazy" decoding="async"/>)}</div>}
      <button className="disclosure" aria-expanded={expanded} aria-controls={`detail-${item.id}`} onClick={() => toggle(item.id)}>{expanded ? text.close : text.details}<span aria-hidden="true">{expanded ? '−' : '+'}</span></button>
      <div className="entry-details" id={`detail-${item.id}`} hidden={!expanded}><p>{tx(item.details, lang)}</p></div>
    </article>
  }

  const sections = ['home', 'experience', 'projects', 'research', 'about', 'education', 'contact']
  const tiltPortrait = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse' || window.matchMedia('(pointer: coarse), (prefers-reduced-motion: reduce)').matches) return
    const box = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - box.left) / box.width - .5
    const y = (event.clientY - box.top) / box.height - .5
    event.currentTarget.style.setProperty('--tilt-x', `${-y * 16}deg`)
    event.currentTarget.style.setProperty('--tilt-y', `${x * 16}deg`)
  }
  const resetPortrait = (event: React.PointerEvent<HTMLDivElement>) => { event.currentTarget.style.setProperty('--tilt-x', '0deg'); event.currentTarget.style.setProperty('--tilt-y', '0deg') }

  return <div className="page-shell">
    <div className="reading-progress" role="progressbar" aria-label={text.progress} aria-valuemin={0} aria-valuemax={100}><span ref={progressRef}/></div>
    <div className="corner-controls"><button className="language-button" onClick={() => setLang(lang === 'pt-BR' ? 'en' : 'pt-BR')} aria-label={text.language}>{lang === 'pt-BR' ? 'PT' : 'EN'}<span aria-hidden="true">⌄</span></button><button className="tool-button" onClick={() => { setTheme(theme === 'light' ? 'dark' : 'light'); setThemeManual(true) }} aria-label={theme === 'light' ? text.themeDark : text.themeLight} aria-pressed={theme === 'dark'}>{theme === 'light' ? '☾' : '☀'}</button></div>
    <button className="mobile-nav-trigger" aria-label={menuOpen ? text.closeMenu : text.menu} aria-expanded={menuOpen} aria-controls="floating-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? '×' : '☰'}<span>{menuOpen ? text.closeMenu : text.menu}</span></button>
    <nav className={`floating-nav${menuOpen ? ' menu-open' : ''}`} id="floating-navigation" aria-label={text.navLabel}>
      {sections.map((id, index) => <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''} aria-current={activeSection === id ? 'location' : undefined} onClick={() => setMenuOpen(false)}><span className="nav-icon" aria-hidden="true"><NavIcon name={id}/></span><span className="nav-label">{text.nav[index]}</span></a>)}
    </nav>
    <main>
      <section className="hero section-wrap" id="home"><div className="hero-copy"><p className="eyebrow">{lang === 'pt-BR' ? 'PORTFÓLIO' : 'PORTFOLIO'} · {new Date().getFullYear()}</p><h1 key={lang}><span>{lang === 'pt-BR' ? 'Oi, eu sou' : 'Hi, I’m'}</span><br />Alex<span className="accent">.</span></h1><p className="hero-intro">{text.intro}</p><div className="hero-links"><a href="https://github.com/alexzjss" target="_blank" rel="noreferrer">GitHub <span>↗</span></a><a href="https://www.linkedin.com/in/alex-jsz/" target="_blank" rel="noreferrer">LinkedIn <span>↗</span></a><a className="cv-link" href="/documents/CV.pdf" target="_blank" rel="noreferrer">{text.cv}<span>↗</span></a></div></div><div className="hero-composition"><div className="portrait-frame" ref={portraitRef} onPointerMove={tiltPortrait} onPointerLeave={resetPortrait}><img src="/images/profile/alex-santana.jpg" alt={text.photoHero} fetchPriority="high"/><span className="portrait-caption">USP<br/>SÃO PAULO</span></div></div><a className="scroll-cue" href="#experience"><span className="scroll-line"/>{text.scroll}<span aria-hidden="true">↓</span></a></section>
      <section className="section-wrap section" id="experience"><SectionHeading number="01" label={text.experience} title={text.experienceLead}/><div className="timeline">{highlights.map((item) => entry(item))}<article className="timeline-entry collective-entry"><span className="timeline-dot" aria-hidden="true"/><p className="period">{tx(collective.period, lang)}</p><h3>{text.orgs}</h3><p className="role">{text.collectiveRole}</p><p>{tx(collective.summary, lang)}</p><div className="organization-list">{sortedOrganizations.map((item) => entry(item, true))}</div></article></div></section>
      <section className="section-wrap section" id="projects"><SectionHeading number="02" label={text.projects} title={text.projectLead}/><div className="filter-row" role="group" aria-label={lang === 'pt-BR' ? 'Filtrar projetos' : 'Filter projects'}>{(['all', 'software', 'research', 'creative'] as const).map((item) => <button key={item} className={filter === item ? 'filter active' : 'filter'} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item === 'all' ? text.all : text.filters[item]}</button>)}</div><div className="project-list">{visibleProjects.length ? visibleProjects.map((project, index) => <article className="project-row" key={project.name}><span className="project-index">0{index + 1}</span><div className="project-copy"><h3>{project.name}</h3><p>{tx(project.description, lang)}</p><div className="tags">{project.stack.map((tech) => <span key={tech}>{tech}</span>)}</div></div><a className="project-link" href={project.url} target="_blank" rel="noreferrer" aria-label={`${project.name} — GitHub`}>↗</a></article>) : <p className="empty-state">{lang === 'pt-BR' ? 'Nenhum projeto nesta categoria por enquanto.' : 'There are no projects in this category yet.'}</p>}</div></section>
      <section className="research-band" id="research"><div className="section-wrap research-inner"><SectionHeading number="03" label={text.research} title={text.researchTitle}/><div className="research-copy"><p className="period">{tx(research.period, lang)}</p><p className="research-affiliation">{research.institution}<br/>{research.advisor}</p><p>{tx(research.summary, lang)}</p><div className="research-method"><span className="eyebrow">{text.researchMethod}</span><p>{tx(research.method, lang)}</p></div><div className="research-tools"><span className="eyebrow">{text.researchTools}</span><div className="tags">{research.tools.map((tool) => <span key={tool}>{tool}</span>)}</div></div><div className="research-status"><span className="eyebrow">{text.researchStatus}</span><p>{tx(research.status, lang)}</p></div></div></div></section>
      <section className="section-wrap section about-section" id="about"><SectionHeading number="04" label={text.about} title={text.aboutTitle}/><div className="about-content"><p>{text.aboutText}</p><div className="interest-block"><span className="eyebrow">{text.languages}</span><p className="education-copy">{lang === 'pt-BR' ? 'Português — nativo ou bilíngue · Inglês — profissional' : 'Portuguese — native or bilingual · English — professional working proficiency'}</p></div></div><div className="about-resume"><div className="skill-groups"><h3>{text.skills}</h3>{skillGroups.map((group) => <div className="skill-group" key={group.title.en}><span>{tx(group.title, lang)}</span><div className="tags">{group.items.map((skill) => <span key={skill}>{skill}</span>)}</div></div>)}</div><div className="honors-group"><h3>{text.awards}</h3><ul>{awards.map((award) => <li key={award.en}>{tx(award, lang)}</li>)}</ul><h3>{text.certifications}</h3><ul>{certifications.map((item) => <li key={item.en}>{tx(item, lang)}</li>)}</ul></div></div></section>
      <section className="section-wrap section education-section" id="education"><SectionHeading number="05" label={text.education} title={text.educationTitle}/><div className="education-overview"><div><h3>{text.educationProgram}</h3><p>{text.educationInstitution}</p><span className="education-period">{text.educationStatus}</span></div><div className="education-gallery">{educationPhotos.map((photo) => <figure key={photo.src}><img src={photo.src} alt={tx(photo.alt, lang)} loading="lazy" decoding="async"/><figcaption>{tx(photo.caption, lang)}</figcaption></figure>)}</div></div></section>
      <section className="contact-section" id="contact"><div className="section-wrap contact-inner"><SectionHeading number="06" label={text.contact} title={text.contactTitle}/><div className="contact-content"><p>{text.contactText}</p><div className="contact-links"><a href="https://github.com/alexzjss" target="_blank" rel="noreferrer">{text.github}<span>↗</span></a><a href="https://www.linkedin.com/in/alex-jsz/" target="_blank" rel="noreferrer">{text.linkedin}<span>↗</span></a><a href="mailto:benalex511@gmail.com">{text.email}<span>↗</span></a></div></div></div></section>
    </main><footer className="site-footer"><span>© {new Date().getFullYear()} Alex Santana</span><a href="#home">{lang === 'pt-BR' ? 'Voltar ao topo ↑' : 'Back to top ↑'}</a></footer>
  </div>
}

function SectionHeading({ number, label, title }: { number: string; label: string; title: string }) { return <div className="section-heading"><span className="section-number">{number} /</span><div><p className="eyebrow">{label}</p><h2>{title}</h2></div></div> }
function NavIcon({ name }: { name: string }) {
  const paths: Record<string, React.ReactNode> = {
    home: <><path d="m3 10 9-7 9 7"/><path d="M5 9v12h14V9M9 21v-7h6v7"/></>,
    experience: <><rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V4h8v3M3 12h18M10 12v2h4v-2"/></>,
    projects: <><rect x="3" y="3" width="8" height="8" rx="1.5"/><rect x="13" y="3" width="8" height="8" rx="1.5"/><rect x="3" y="13" width="8" height="8" rx="1.5"/><rect x="13" y="13" width="8" height="8" rx="1.5"/></>,
    research: <><path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V3M8 15h8"/></>,
    about: <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>,
    education: <><path d="m2 9 10-5 10 5-10 5L2 9Z"/><path d="M6 11v5c3.5 3 8.5 3 12 0v-5M22 9v6"/></>,
    contact: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></>,
  }
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" focusable="false">{paths[name]}</svg>
}
export default App
