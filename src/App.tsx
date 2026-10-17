import { useEffect, useMemo, useState } from 'react'
import { c, highlights, organizations, projects, tx, type Category, type Entry } from './content'
import './styles.css'

type Lang = 'pt-BR' | 'en'

const ui = {
  'pt-BR': {
    nav: ['Experiência', 'Projetos', 'Pesquisa', 'Sobre', 'Contato'],
    intro: 'Estudo Sistemas de Informação na Universidade de São Paulo. Tenho interesse em construir software, trabalhar com dados e IA e investigar como sistemas funcionam.',
    scroll: 'Role para explorar', projects: 'Projetos', all: 'Todos', experience: 'Experiência', research: 'Pesquisa', about: 'Sobre', contact: 'Contato',
    experienceLead: 'Construir, aprender e colaborar na universidade.', projectLead: 'Projetos públicos com informações verificáveis nos repositórios.',
    researchTitle: 'Teste e depuração de software', researchText: 'O material de referência fornecido descreve uma iniciação científica PUB-USP relacionada a teste e depuração de software, benchmarks Java e localização de falhas. As ferramentas, orientação, método, período e resultados ainda precisam de confirmação documental; por isso, não são atribuídos aqui.',
    researchNote: 'Escopo descrito no briefing; dados acadêmicos detalhados pendentes de validação.', aboutTitle: 'Um percurso entre sistemas e pessoas.', aboutText: 'Sou estudante de Sistemas de Informação na USP. Meu trabalho e meus estudos passam por desenvolvimento de software, dados, inteligência artificial e pesquisa. Também faço parte de projetos e comunidades universitárias.',
    contactTitle: 'Vamos conversar?', contactText: 'Encontre meus projetos e perfil profissional pelos links públicos.', github: 'GitHub', linkedin: 'LinkedIn', cv: 'Currículo não disponível', current: 'Atual', details: 'Ver detalhes', close: 'Fechar detalhes', orgs: 'Organizações universitárias',
    filters: { software: 'Software', research: 'Pesquisa e ferramentas', creative: 'Criativos' }, themeLight: 'Ativar tema claro', themeDark: 'Ativar tema escuro', language: 'Mudar idioma para inglês', sourcePending: 'Informações a confirmar', noPhoto: 'Retrato não fornecido',
  },
  en: {
    nav: ['Experience', 'Projects', 'Research', 'About', 'Contact'],
    intro: 'I study Information Systems at the University of São Paulo. I am interested in building software, working with data and AI, and investigating how systems work.',
    scroll: 'Scroll to explore', projects: 'Projects', all: 'All', experience: 'Experience', research: 'Research', about: 'About', contact: 'Contact',
    experienceLead: 'Building, learning, and collaborating at university.', projectLead: 'Public projects with information that can be verified in their repositories.',
    researchTitle: 'Software testing and debugging', researchText: 'The supplied brief describes a PUB-USP undergraduate research project related to software testing and debugging, Java benchmarks, and fault localization. The tools, advisor, method, dates, and results still need documentary confirmation, so they are not attributed here.',
    researchNote: 'Scope described in the brief; detailed academic information is pending verification.', aboutTitle: 'A path across systems and people.', aboutText: 'I am an Information Systems student at USP. My work and studies span software development, data, artificial intelligence, and research. I also take part in university projects and communities.',
    contactTitle: 'Let’s talk.', contactText: 'Find my projects and professional profile through these public links.', github: 'GitHub', linkedin: 'LinkedIn', cv: 'Résumé not available', current: 'Present', details: 'View details', close: 'Close details', orgs: 'University organizations',
    filters: { software: 'Software', research: 'Research & tools', creative: 'Creative' }, themeLight: 'Switch to light theme', themeDark: 'Switch to dark theme', language: 'Mudar idioma para português', sourcePending: 'Details to be confirmed', noPhoto: 'No portrait supplied',
  },
} as const

function readPreference<T extends string>(key: string, allowed: T[], fallback: T): T {
  try { const value = localStorage.getItem(key) as T | null; return value && allowed.includes(value) ? value : fallback } catch { return fallback }
}

function App() {
  const [lang, setLang] = useState<Lang>(() => readPreference('alex-lang', ['pt-BR', 'en'], 'pt-BR'))
  const [theme, setTheme] = useState<'light' | 'dark'>(() => readPreference('alex-theme', ['light', 'dark'], window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'))
  const [filter, setFilter] = useState<Category | 'all'>('all')
  const [open, setOpen] = useState<string[]>([])
  const text = ui[lang]
  const visibleProjects = useMemo(() => filter === 'all' ? projects : projects.filter((project) => project.categories.includes(filter)), [filter])

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dataset.theme = theme
    document.title = lang === 'pt-BR' ? 'Alex Santana — Sistemas, software e pesquisa' : 'Alex Santana — Systems, software, and research'
    const description = lang === 'pt-BR' ? 'Portfólio de Alex Santana, estudante de Sistemas de Informação na USP.' : 'Portfolio of Alex Santana, Information Systems student at USP.'
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', document.title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description)
    try { localStorage.setItem('alex-lang', lang); localStorage.setItem('alex-theme', theme) } catch { /* storage can be unavailable */ }
  }, [lang, theme])

  const toggle = (id: string) => setOpen((previous) => previous.includes(id) ? previous.filter((item) => item !== id) : [...previous, id])
  const entry = (item: Entry, nested = false) => {
    const expanded = open.includes(item.id)
    return <article className={nested ? 'organization' : 'timeline-entry'} key={item.id}>
      {!nested && <span className="timeline-dot" aria-hidden="true" />}
      <div className="entry-head"><div><p className="period">{tx(item.period, lang)}</p><h3>{item.name}</h3><p className="role">{tx(item.role, lang)}</p></div><span className="pending-mark">{text.sourcePending}</span></div>
      <p>{tx(item.summary, lang)}</p>
      <button className="disclosure" aria-expanded={expanded} aria-controls={`detail-${item.id}`} onClick={() => toggle(item.id)}>{expanded ? text.close : text.details}<span aria-hidden="true">{expanded ? '−' : '+'}</span></button>
      {expanded && <div className="entry-details" id={`detail-${item.id}`}><p>{tx(item.details, lang)}</p></div>}
    </article>
  }

  return <div className="page-shell">
    <header className="site-header"><a className="brand" href="#home" aria-label="Alex Santana — home">AS<span>.</span></a><nav aria-label={lang === 'pt-BR' ? 'Navegação principal' : 'Main navigation'}>{['experience', 'projects', 'research', 'about', 'contact'].map((key, index) => <a key={key} href={`#${key}`}>{text.nav[index]}</a>)}</nav><div className="header-tools"><button className="tool-button" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} aria-label={theme === 'light' ? text.themeDark : text.themeLight}>{theme === 'light' ? '◐' : '☼'}</button><button className="language-button" onClick={() => setLang(lang === 'pt-BR' ? 'en' : 'pt-BR')} aria-label={text.language}>{lang === 'pt-BR' ? 'EN' : 'PT'}</button></div></header>
    <main>
      <section className="hero section-wrap" id="home"><div className="hero-copy"><p className="eyebrow">{lang === 'pt-BR' ? 'PORTFÓLIO' : 'PORTFOLIO'} · {new Date().getFullYear()}</p><h1 key={lang}><span>{lang === 'pt-BR' ? 'Oi, eu sou' : 'Hi, I’m'}</span><br />Alex<span className="accent">.</span></h1><p className="hero-intro">{text.intro}</p><div className="hero-links"><a href="https://github.com/alexzjss" target="_blank" rel="noreferrer">GitHub <span>↗</span></a><a href="https://www.linkedin.com/in/alex-jsz/" target="_blank" rel="noreferrer">LinkedIn <span>↗</span></a><span className="cv-unavailable">{text.cv}</span></div></div><div className="hero-composition" role="img" aria-label={text.noPhoto}><div className="portrait-frame"><span className="monogram">A<span>.</span></span><span className="portrait-caption">USP<br />SÃO PAULO</span></div><span className="orbit orbit-one"/><span className="orbit orbit-two"/><span className="orbit-dot"/><span className="cross-mark">+</span></div><a className="scroll-cue" href="#experience"><span className="scroll-line"/>{text.scroll}<span aria-hidden="true">↓</span></a></section>
      <section className="section-wrap section" id="experience"><SectionHeading number="01" label={text.experience} title={text.experienceLead}/><div className="timeline">{highlights.map((item) => entry(item))}<article className="timeline-entry collective-entry"><span className="timeline-dot" aria-hidden="true"/><p className="period">{lang === 'pt-BR' ? 'Períodos a confirmar' : 'Dates to be confirmed'}</p><h3>{text.orgs}</h3><p className="role">DASI · Hype · USPCodeLab Leste · Conway USP · Each In The Shell · Semana de SI</p><p>{c('Um único grupo para as seis organizações universitárias indicadas no briefing.', 'One collective entry for the six university organizations named in the brief.')[lang]}</p><div className="organization-list">{organizations.map((item) => entry(item, true))}</div></article></div></section>
      <section className="section-wrap section" id="projects"><SectionHeading number="02" label={text.projects} title={text.projectLead}/><div className="filter-row" role="group" aria-label={lang === 'pt-BR' ? 'Filtrar projetos' : 'Filter projects'}>{(['all', 'software', 'research', 'creative'] as const).map((item) => <button key={item} className={filter === item ? 'filter active' : 'filter'} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item === 'all' ? text.all : text.filters[item]}</button>)}</div><div className="project-list">{visibleProjects.length ? visibleProjects.map((project, index) => <article className="project-row" key={project.name}><span className="project-index">0{index + 1}</span><div className="project-copy"><h3>{project.name}</h3><p>{tx(project.description, lang)}</p><div className="tags">{project.stack.map((tech) => <span key={tech}>{tech}</span>)}</div></div><a className="project-link" href={project.url} target="_blank" rel="noreferrer" aria-label={`${project.name} — GitHub`}>↗</a></article>) : <p className="empty-state">{lang === 'pt-BR' ? 'Nenhum projeto nesta categoria por enquanto.' : 'There are no projects in this category yet.'}</p>}</div></section>
      <section className="research-band" id="research"><div className="section-wrap research-inner"><SectionHeading number="03" label={text.research} title={text.researchTitle}/><div className="research-copy"><p>{text.researchText}</p><span className="research-note">{text.researchNote}</span></div></div></section>
      <section className="section-wrap section about-section" id="about"><SectionHeading number="04" label={text.about} title={text.aboutTitle}/><div className="about-content"><p>{text.aboutText}</p><div className="interest-block"><span className="eyebrow">{lang === 'pt-BR' ? 'INTERESSES' : 'INTERESTS'}</span><ul><li>{lang === 'pt-BR' ? 'Engenharia de software' : 'Software engineering'}</li><li>{lang === 'pt-BR' ? 'Dados e inteligência artificial' : 'Data and artificial intelligence'}</li><li>{lang === 'pt-BR' ? 'Pesquisa e experimentação' : 'Research and experimentation'}</li><li>{lang === 'pt-BR' ? 'Desenvolvimento de produto' : 'Product development'}</li></ul><span className="stack-note">{lang === 'pt-BR' ? 'Tecnologias demonstradas nos repositórios incluídos: TypeScript, React e Vite.' : 'Technologies demonstrated in the included repositories: TypeScript, React, and Vite.'}</span></div></div></section>
      <section className="contact-section" id="contact"><div className="section-wrap contact-inner"><SectionHeading number="05" label={text.contact} title={text.contactTitle}/><div className="contact-content"><p>{text.contactText}</p><div className="contact-links"><a href="https://github.com/alexzjss" target="_blank" rel="noreferrer">{text.github}<span>↗</span></a><a href="https://www.linkedin.com/in/alex-jsz/" target="_blank" rel="noreferrer">{text.linkedin}<span>↗</span></a></div></div></div></section>
    </main><footer className="site-footer"><span>© {new Date().getFullYear()} Alex Santana</span><a href="#home">{lang === 'pt-BR' ? 'Voltar ao topo ↑' : 'Back to top ↑'}</a></footer>
  </div>
}

function SectionHeading({ number, label, title }: { number: string; label: string; title: string }) { return <div className="section-heading"><span className="section-number">{number} /</span><div><p className="eyebrow">{label}</p><h2>{title}</h2></div></div> }
export default App
