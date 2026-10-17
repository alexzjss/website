import { useEffect, useMemo, useState } from 'react'

type Lang = 'pt-BR' | 'en'
type Copy = { pt: string; en: string }
type Category = 'software' | 'data' | 'research' | 'creative'
type Project = { name: string; description: Copy; categories: Category[]; tech: string[]; repo?: string }
type TimelineItem = { id: string; name: string; role: Copy; period: Copy; description: Copy; tags: string[]; collective?: boolean }

const t = (copy: Copy, lang: Lang) => (lang === 'pt-BR' ? copy.pt : copy.en)

const labels = {
  pt: { home: 'Início', experience: 'Experiência', projects: 'Projetos', research: 'Pesquisa', about: 'Sobre', contact: 'Contato', intro: 'Software, dados e pesquisa.', lead: 'Estudo Sistemas de Informação na USP e construo ferramentas que conectam problemas reais a soluções claras.', selected: 'Uma trajetória entre construir, investigar e colaborar.', viewProjects: 'Ver projetos', cv: 'Abrir currículo', present: 'Atual', readMore: 'Ver detalhes', close: 'Fechar', all: 'Todos', researchTitle: 'Pesquisa aplicada, com rigor e curiosidade.', researchText: 'Na iniciação científica PUB-USP, junto ao grupo SAEG da EACH-USP, investigo teste e depuração de software em benchmarks Java. O trabalho aborda espectros de execução e localização de falhas, sob orientação do Prof. Dr. Marcos Lordello Chaim.', aboutTitle: 'Aprendo fazendo — e faço melhor em equipe.', aboutText: 'Meu trabalho transita por engenharia de software, dados, inteligência artificial e produto. Também participo da vida universitária por meio de ensino, extensão, comunicação e liderança.', contactTitle: 'Vamos conversar?', contactText: 'Estou aberto a conversas sobre tecnologia, pesquisa e oportunidades de colaboração.', based: 'São Paulo, Brasil' },
  en: { home: 'Home', experience: 'Experience', projects: 'Projects', research: 'Research', about: 'About', contact: 'Contact', intro: 'Software, data and research.', lead: 'I study Information Systems at USP and build tools that connect real problems to clear solutions.', selected: 'A path between building, investigating and collaborating.', viewProjects: 'See projects', cv: 'Open résumé', present: 'Present', readMore: 'See details', close: 'Close', all: 'All', researchTitle: 'Applied research, with rigor and curiosity.', researchText: 'As a PUB-USP undergraduate researcher with SAEG at EACH-USP, I investigate software testing and debugging using Java benchmarks. The work explores execution spectra and fault localization, advised by Prof. Dr. Marcos Lordello Chaim.', aboutTitle: 'I learn by making — and make better with a team.', aboutText: 'My work moves across software engineering, data, artificial intelligence and product. I also take part in university life through teaching, outreach, communication and leadership.', contactTitle: 'Let’s talk?', contactText: 'I am open to conversations about technology, research and collaboration opportunities.', based: 'São Paulo, Brazil' },
} as const

const experiences: TimelineItem[] = [
  { id: 'pet', name: 'PET-SI', role: { pt: 'Membro bolsista', en: 'Scholar member' }, period: { pt: 'Ago 2026 — Atual', en: 'Aug 2026 — Present' }, description: { pt: 'Programa de Educação Tutorial de Sistemas de Informação: educação, pesquisa, extensão e oficinas.', en: 'Information Systems Tutorial Education Program: education, research, outreach and workshops.' }, tags: ['Ensino / Teaching', 'Pesquisa / Research'] },
  { id: 'saeg', name: 'SAEG · EACH-USP', role: { pt: 'Bolsista de iniciação científica (PUB)', en: 'Undergraduate research scholar (PUB)' }, period: { pt: 'Jul 2026 — Fev 2027', en: 'Jul 2026 — Feb 2027' }, description: { pt: 'Pesquisa em teste e depuração de software com Java, Maven e benchmarks open source.', en: 'Research in software testing and debugging with Java, Maven and open-source benchmarks.' }, tags: ['Java', 'Maven', 'Benchmarks'] },
  { id: 'claude', name: 'Claude Campus Ambassador', role: { pt: 'Embaixador de campus', en: 'Campus ambassador' }, period: { pt: '2026 — Atual', en: '2026 — Present' }, description: { pt: 'Comunidade e aprendizagem sobre inteligência artificial no ambiente universitário.', en: 'Community and learning around artificial intelligence in the university environment.' }, tags: ['IA / AI', 'Comunidade / Community'] },
  { id: 'hype', name: 'Hype USP', role: { pt: 'Pesquisador de Dados e IA', en: 'Data and AI researcher' }, period: { pt: 'Jun 2026 — Atual', en: 'Jun 2026 — Present' }, description: { pt: 'Pesquisas aplicadas em Ciência de Dados, IA e Machine Learning.', en: 'Applied research in Data Science, AI and Machine Learning.' }, tags: ['Python', 'Machine Learning'] },
  { id: 'codelab', name: 'USPCodeLab Leste', role: { pt: 'Desenvolvedor Full-Stack', en: 'Full-stack developer' }, period: { pt: 'Jun 2026 — Atual', en: 'Jun 2026 — Present' }, description: { pt: 'Soluções Full-Stack e Mobile desenvolvidas em equipe para problemas de impacto social.', en: 'Team-built Full-Stack and Mobile solutions for problems with social impact.' }, tags: ['TypeScript', 'React', 'Mobile'] },
  { id: 'university', name: 'Organizações universitárias', role: { pt: 'Ecossistema de colaboração', en: 'Collaboration ecosystem' }, period: { pt: '2026 — Atual', en: '2026 — Present' }, description: { pt: 'Um bloco coletivo para seis organizações e iniciativas da USP.', en: 'A collective block for six USP organizations and initiatives.' }, tags: ['DASI', 'Hype', 'USPCodeLab Leste', 'Conway USP', 'Each In The Shell', 'Semana de SI'], collective: true },
]

const projects: Project[] = [
  { name: 'DaSIboard', description: { pt: 'Dashboard acadêmico para o curso de Sistemas de Informação da USP.', en: 'Academic dashboard for USP’s Information Systems program.' }, categories: ['software', 'data'], tech: ['TypeScript', 'React'], repo: 'https://github.com/alexzjss' },
  { name: 'ModaLoop', description: { pt: 'Produto digital explorando tecnologia e novas formas de interação.', en: 'A digital product exploring technology and new forms of interaction.' }, categories: ['software', 'creative'], tech: ['JavaScript', 'Product'] },
  { name: 'Benchmark Selection for Software Testing & Debugging', description: { pt: 'Ferramenta e investigação para selecionar benchmarks em teste e depuração de software.', en: 'A tool and investigation for benchmark selection in software testing and debugging.' }, categories: ['research'], tech: ['Java', 'Maven', 'Research'], repo: 'https://github.com/alexzjss' },
  { name: 'TrendSurfer', description: { pt: 'Experimento orientado a dados para descobrir e interpretar tendências.', en: 'A data-driven experiment for discovering and interpreting trends.' }, categories: ['data'], tech: ['Python', 'Data'] },
]

const categoryLabels: Record<Category, Copy> = { software: { pt: 'Software', en: 'Software' }, data: { pt: 'Dados e IA', en: 'Data & AI' }, research: { pt: 'Pesquisa', en: 'Research' }, creative: { pt: 'Criativo', en: 'Creative' } }

function App() {
  const [lang, setLang] = useState<Lang>(() => (localStorage.getItem('alex-lang') as Lang) || 'pt-BR')
  const [theme, setTheme] = useState<'light' | 'dark'>(() => (localStorage.getItem('alex-theme') as 'light' | 'dark') || 'light')
  const [filter, setFilter] = useState<Category | 'all'>('all')
  const [open, setOpen] = useState<string | null>(null)
  const copy = labels[lang === 'pt-BR' ? 'pt' : 'en']
  const filteredProjects = useMemo(() => filter === 'all' ? projects : projects.filter((project) => project.categories.includes(filter)), [filter])

  useEffect(() => { localStorage.setItem('alex-lang', lang); document.documentElement.lang = lang; document.title = lang === 'pt-BR' ? 'Alex Santana — Software, dados e pesquisa' : 'Alex Santana — Software, data and research' }, [lang])
  useEffect(() => { localStorage.setItem('alex-theme', theme); document.documentElement.dataset.theme = theme }, [theme])

  return <div>
    <header className="site-header">
      <a className="wordmark" href="#home" aria-label="Alex Santana">A<span>.</span></a>
      <nav aria-label={lang === 'pt-BR' ? 'Navegação principal' : 'Main navigation'}>{[['experience', copy.experience], ['projects', copy.projects], ['research', copy.research], ['about', copy.about], ['contact', copy.contact]].map(([id, label]) => <a href={`#${id}`} key={id}>{label}</a>)}</nav>
      <div className="controls"><button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} aria-label={theme === 'light' ? 'Ativar tema escuro' : 'Ativar tema claro'}>{theme === 'light' ? '◐' : '○'}</button><button className="lang" onClick={() => setLang(lang === 'pt-BR' ? 'en' : 'pt-BR')} aria-label="Change language">{lang === 'pt-BR' ? 'EN' : 'PT'}</button></div>
    </header>

    <main>
      <section id="home" className="hero section">
        <div className="hero-copy"><p className="eyebrow">01 / {copy.home}</p><h1>Oi, eu sou<br /><em>Alex.</em></h1><p className="hero-lead">{copy.lead}</p><div className="hero-actions"><a className="button button-dark" href="#projects">{copy.viewProjects} <span>↘</span></a><a className="text-link" href="/curriculo.pdf" target="_blank" rel="noreferrer">{copy.cv} ↗</a></div></div>
        <div className="hero-art" aria-label={copy.intro}><div className="portrait-placeholder"><span>AS</span></div><div className="art-note">Sistemas de Informação<br />USP · São Paulo</div><div className="shape shape-circle" /><div className="shape shape-square" /></div>
        <a className="scroll-cue" href="#experience"><span>↓</span> scroll to explore</a>
      </section>

      <section id="experience" className="section">
        <div className="section-intro"><p className="eyebrow">02 / {copy.experience}</p><h2>{copy.selected}</h2></div>
        <div className="timeline">{experiences.map((item, index) => <article className={`timeline-item ${item.collective ? 'collective' : ''}`} key={item.id}><div className="timeline-marker">{String(index + 1).padStart(2, '0')}</div><div className="timeline-content"><div className="item-top"><span className="period">{t(item.period, lang)}</span><span className="item-index">0{index + 1}</span></div><h3>{item.name}</h3><p className="role">{t(item.role, lang)}</p><p>{t(item.description, lang)}</p><div className="tags">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>{item.collective && <button className="details-toggle" onClick={() => setOpen(open === item.id ? null : item.id)} aria-expanded={open === item.id}>{open === item.id ? copy.close : copy.readMore} <span>{open === item.id ? '↑' : '↓'}</span></button>}{item.collective && open === item.id && <div className="org-grid">{item.tags.map((org) => <div key={org}><strong>{org}</strong><span>{lang === 'pt-BR' ? 'Participação universitária' : 'University involvement'}</span></div>)}</div>}</div></article>)}</div>
      </section>

      <section id="projects" className="section projects-section"><div className="section-intro split"><div><p className="eyebrow">03 / {copy.projects}</p><h2>{lang === 'pt-BR' ? 'Ideias que viram sistemas.' : 'Ideas turned into systems.'}</h2></div><p>{copy.intro}</p></div><div className="filters" role="group" aria-label={lang === 'pt-BR' ? 'Filtrar projetos' : 'Filter projects'}>{(['all', 'software', 'data', 'research', 'creative'] as const).map((category) => <button className={filter === category ? 'active' : ''} onClick={() => setFilter(category)} key={category}>{category === 'all' ? copy.all : t(categoryLabels[category], lang)}</button>)}</div><div className="project-grid">{filteredProjects.map((project, index) => <article className="project-card" key={project.name}><div className="project-number">0{index + 1}</div><h3>{project.name}</h3><p>{t(project.description, lang)}</p><div className="tags">{project.tech.map((tech) => <span key={tech}>{tech}</span>)}</div>{project.repo && <a className="card-link" href={project.repo} target="_blank" rel="noreferrer">GitHub ↗</a>}</article>)}</div></section>

      <section id="research" className="section research-section"><p className="eyebrow">04 / {copy.research}</p><div className="research-layout"><h2>{copy.researchTitle}</h2><div><p className="large-copy">{copy.researchText}</p><div className="research-facts"><div><span>01</span><strong>SAEG</strong><small>EACH — USP</small></div><div><span>02</span><strong>Java</strong><small>Benchmarks & tools</small></div><div><span>03</span><strong>PUB-USP</strong><small>Undergraduate research</small></div></div></div></div></section>

      <section id="about" className="section about-section"><div className="section-intro"><p className="eyebrow">05 / {copy.about}</p><h2>{copy.aboutTitle}</h2></div><div className="about-grid"><p className="large-copy">{copy.aboutText}</p><div><p className="eyebrow">{lang === 'pt-BR' ? 'Áreas de interesse' : 'Areas of interest'}</p><ul className="interest-list"><li>Software engineering</li><li>Data & artificial intelligence</li><li>Research & experimentation</li><li>Product development</li></ul></div></div></section>

      <section id="contact" className="contact-section"><p className="eyebrow">06 / {copy.contact}</p><h2>{copy.contactTitle}</h2><p>{copy.contactText}</p><a className="contact-email" href="mailto:alexzjss@gmail.com">alexzjss@gmail.com ↗</a><div className="socials"><a href="https://github.com/alexzjss" target="_blank" rel="noreferrer">GitHub</a><a href="https://www.linkedin.com/in/alex-jsz/" target="_blank" rel="noreferrer">LinkedIn</a><span>{copy.based}</span></div></section>
    </main>
    <footer><span>© {new Date().getFullYear()} Alex Santana</span><span>{copy.intro}</span></footer>
  </div>
}

export default App
