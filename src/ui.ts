import type { Area, Kind, Lang, Trail } from './content'

type Strings = {
  nav: Record<string, string>
  trails: Record<Trail | 'all', { name: string; short: string; blurb: string; lead: string }>
  [key: string]: unknown
}

const pt = {
  nav: { home: 'Início', experience: 'Experiência', projects: 'Projetos', research: 'Pesquisa', awards: 'Conquistas', gallery: 'Em fotos', about: 'Sobre', contact: 'Contato' },
  trails: {
    all: { name: 'Tudo', short: 'Tudo', blurb: 'O site completo.', lead: 'Sou estudante de Sistemas de Informação na USP e desenvolvo software, participo de pesquisa em teste de software e de projetos universitários nas áreas de dados, IA e tecnologia.' },
    rec: { name: 'Recrutador', short: 'Recrut', blurb: 'Estágio, projetos entregues, stack e currículo. O caminho mais curto.', lead: 'Estudante de Sistemas de Informação na USP, com estágio em dados no Banco Safra e sistemas de back-end e dados usados por mais de 700 alunos.' },
    pes: { name: 'Pesquisa', short: 'Pesq', blurb: 'Iniciação científica, JFLP Studio, Defects4J e o trabalho com dados e IA.', lead: 'Pesquiso teste e depuração de software no grupo SAEG da USP, com 875 versões defeituosas reais analisadas, e trabalho com dados e IA no Hype.' },
    com: { name: 'Comunidade', short: 'Comun', blurb: 'DASI, PET-SI, Conway, Hype, Semana SI e os eventos.', lead: 'Coordeno projetos de TI no DASI, organizo a Semana de SI e participo de PET-SI, Conway, CodeLab e Hype: a universidade como laboratório.' },
  },
  trailTitle: 'Três jeitos de conhecer meu trabalho', trailLead: 'A página se reorganiza conforme o seu interesse. “Tudo” mostra o site completo.', trailShowing: 'Mostrando', trailAll: 'Ver tudo', openTrail: 'Abrir trilha', trailLabel: 'Trilha de leitura',
  scroll: 'Role para explorar', projects: 'Projetos', experience: 'Experiência', research: 'Pesquisa', about: 'Sobre', contact: 'Contato',
  experienceLead: 'Dados, desenvolvimento e pesquisa, do mercado à universidade.', projectLead: 'Sistemas e ferramentas para necessidades reais.',
  researchTitle: 'Geração de dados para teste e depuração de software', researchMethod: 'Método', researchTools: 'Ferramentas', researchStatus: 'Andamento',
  aboutTitle: 'Engenharia de software, dados e pesquisa.', aboutText: 'Sou estudante de Sistemas de Informação na Universidade de São Paulo (USP), com previsão de conclusão em 2029. Minha experiência combina desenvolvimento de software, pesquisa acadêmica e projetos de tecnologia. Tenho interesse em engenharia de software e back-end, engenharia de dados, machine learning e inteligência artificial.',
  skills: 'Competências técnicas', certifications: 'Certificações e cursos', languages: 'Idiomas', languagesLine: 'Português — nativo ou bilíngue · Inglês — profissional',
  education: 'Formação', educationProgram: 'Bacharelado em Sistemas de Informação', educationInstitution: 'Universidade de São Paulo · Escola de Artes, Ciências e Humanidades (EACH-USP)', educationStatus: '2026 — 2029 · Em andamento',
  contactTitle: 'Vamos conversar?', contactText: 'Encontre meus projetos e entre em contato pelos meus perfis profissionais.', github: 'GitHub', linkedin: 'LinkedIn', sendEmail: 'Enviar e-mail',
  cv: 'Currículo', cvPt: 'CV · PT: baixar currículo em português', cvEn: 'CV · EN: baixar currículo em inglês', cvPage: 'Versão para impressão',
  details: 'Ver detalhes', close: 'Fechar detalhes', orgs: 'Organizações universitárias', collectiveRole: 'Organizações · uma frente de atuação',
  kinds: { work: 'Profissional', research: 'Pesquisa', academic: 'Universidade', program: 'Programa' } as Record<Kind, string>,
  areas: { data: 'Dados e ferramentas', research: 'Pesquisa', web: 'Web e mobile', creative: 'Jogos e criativo' } as Record<Area, string>,
  areaAll: 'Todos', areaFilter: 'Filtrar por área', status: { live: 'No ar', repo: 'Código aberto' },
  caseStudies: 'Estudos de caso', moreProjects: 'Mais projetos', caseLabel: 'Estudo de caso', problem: 'Problema', solution: 'Solução', result: 'Resultado', demo: 'Ver demo', code: 'Código', open: 'abre em nova aba', empty: 'Nenhum projeto nesta combinação.',
  awardsTitle: 'Conquistas e títulos', awardsLead: 'Competições, hackathons e olimpíadas.',
  galleryTitle: 'Eventos, palestras e visitas', galleryLead: 'Bastidores da vida universitária.', openPhoto: 'Ampliar foto', closePhoto: 'Fechar', prevPhoto: 'Foto anterior', nextPhoto: 'Foto seguinte',
  stats: ['alunos usam o DaSIboard', 'versões defeituosas reais na pesquisa', 'prêmios e títulos', 'projetos publicados'],
  copyEmail: 'Copiar e-mail', copied: 'E-mail copiado', copyFail: 'Não consegui copiar, use o botão de e-mail',
  themeLight: 'Ativar tema claro', themeDark: 'Ativar tema escuro', language: 'Mudar idioma para inglês', navLabel: 'Navegação por seções', menu: 'Abrir navegação', closeMenu: 'Fechar navegação', progress: 'Progresso de leitura',
  photoHero: 'Retrato de Alex Santana', skip: 'Pular para o conteúdo', hello: 'Oi, eu sou', portfolio: 'PORTFÓLIO', back: 'Voltar ao topo ↑', numbers: 'Números',
  statusChip: 'Estagiário de dados · Banco Safra · Jan 2027', viewProjects: 'Ver projetos',
  title: 'Alex Santana — Sistemas, software e pesquisa', description: 'Portfólio de Alex Santana, estudante de Sistemas de Informação na USP: dados, back-end e pesquisa em teste de software.',
  cvTitle: 'Alex Santana — Currículo', cvHeadline: 'Estudante de Sistemas de Informação · USP · Dados, back-end e pesquisa', cvPrint: 'Imprimir ou salvar PDF', cvBack: 'Voltar ao portfólio',
  cvSections: { summary: 'Resumo', experience: 'Experiência', research: 'Pesquisa', projects: 'Projetos selecionados', skills: 'Competências', education: 'Formação', awards: 'Conquistas', certs: 'Certificações', languages: 'Idiomas', orgs: 'Organizações universitárias' },
  cvSummary: 'Estudante de Sistemas de Informação na USP com foco em engenharia de software, back-end, dados e inteligência artificial. Combino desenvolvimento, pesquisa em teste e depuração de software e projetos de tecnologia na comunidade universitária.',
} satisfies Strings

const en = {
  nav: { home: 'Home', experience: 'Experience', projects: 'Projects', research: 'Research', awards: 'Awards', gallery: 'Photos', about: 'About', contact: 'Contact' },
  trails: {
    all: { name: 'All', short: 'All', blurb: 'The full site.', lead: 'I study Information Systems at USP, work on software testing research, and take part in university technology projects across data, AI, and software development.' },
    rec: { name: 'Recruiter', short: 'Recruit', blurb: 'Internship, shipped projects, stack, and résumé. The shortest path.', lead: 'Information Systems student at USP, with a data internship at Banco Safra and backend and data systems used by more than 700 students.' },
    pes: { name: 'Research', short: 'Research', blurb: 'Undergraduate research, JFLP Studio, Defects4J, and my data and AI work.', lead: 'I research software testing and debugging at USP’s SAEG group, with 875 real buggy versions analyzed, and work on data and AI at Hype.' },
    com: { name: 'Community', short: 'Commun', blurb: 'DASI, PET-SI, Conway, Hype, Information Systems Week, and events.', lead: 'I coordinate IT projects at DASI, organize Information Systems Week, and take part in PET-SI, Conway, CodeLab, and Hype: the university as a lab.' },
  },
  trailTitle: 'Three ways to explore my work', trailLead: 'The page reorganizes around your interest. “All” shows the full site.', trailShowing: 'Showing', trailAll: 'Show everything', openTrail: 'Open path', trailLabel: 'Reading path',
  scroll: 'Scroll to explore', projects: 'Projects', experience: 'Experience', research: 'Research', about: 'About', contact: 'Contact',
  experienceLead: 'Data, software development, and research, from industry to university.', projectLead: 'Systems and tools built around practical needs.',
  researchTitle: 'Data generation for software testing and debugging', researchMethod: 'Method', researchTools: 'Tools', researchStatus: 'Status',
  aboutTitle: 'Software engineering, data, and research.', aboutText: 'I study Information Systems at the University of São Paulo (USP), with an expected graduation in 2029. My experience combines software development, academic research, and technology projects. My interests include software and backend engineering, data engineering, machine learning, and artificial intelligence.',
  skills: 'Technical skills', certifications: 'Certificates and courses', languages: 'Languages', languagesLine: 'Portuguese — native or bilingual · English — professional working proficiency',
  education: 'Education', educationProgram: 'BSc in Information Systems', educationInstitution: 'University of São Paulo · School of Arts, Sciences and Humanities (EACH-USP)', educationStatus: '2026 — 2029 · In progress',
  contactTitle: 'Let’s talk.', contactText: 'Explore my projects and get in touch through my professional profiles.', github: 'GitHub', linkedin: 'LinkedIn', sendEmail: 'Send email',
  cv: 'Résumé', cvPt: 'CV · PT: download résumé in Portuguese', cvEn: 'CV · EN: download résumé in English', cvPage: 'Print version',
  details: 'View details', close: 'Close details', orgs: 'University organizations', collectiveRole: 'Organizations · one area of involvement',
  kinds: { work: 'Professional', research: 'Research', academic: 'University', program: 'Program' } as Record<Kind, string>,
  areas: { data: 'Data & tooling', research: 'Research', web: 'Web & mobile', creative: 'Games & creative' } as Record<Area, string>,
  areaAll: 'All', areaFilter: 'Filter by area', status: { live: 'Live', repo: 'Open source' },
  caseStudies: 'Case studies', moreProjects: 'More projects', caseLabel: 'Case study', problem: 'Problem', solution: 'Solution', result: 'Result', demo: 'View demo', code: 'Code', open: 'opens in a new tab', empty: 'No projects in this combination.',
  awardsTitle: 'Awards and titles', awardsLead: 'Competitions, hackathons, and olympiads.',
  galleryTitle: 'Events, talks, and visits', galleryLead: 'Behind the scenes of university life.', openPhoto: 'Enlarge photo', closePhoto: 'Close', prevPhoto: 'Previous photo', nextPhoto: 'Next photo',
  stats: ['students use DaSIboard', 'real buggy versions in the research', 'awards and titles', 'published projects'],
  copyEmail: 'Copy email', copied: 'Email copied', copyFail: 'Could not copy, use the email button',
  themeLight: 'Switch to light theme', themeDark: 'Switch to dark theme', language: 'Mudar idioma para português', navLabel: 'Section navigation', menu: 'Open navigation', closeMenu: 'Close navigation', progress: 'Reading progress',
  photoHero: 'Portrait of Alex Santana', skip: 'Skip to content', hello: 'Hi, I’m', portfolio: 'PORTFOLIO', back: 'Back to top ↑', numbers: 'By the numbers',
  statusChip: 'Data intern · Banco Safra · Jan 2027', viewProjects: 'View projects',
  title: 'Alex Santana — Systems, software, and research', description: 'Portfolio of Alex Santana, Information Systems student at USP: data, backend, and software testing research.',
  cvTitle: 'Alex Santana — Résumé', cvHeadline: 'Information Systems student · USP · Data, backend, and research', cvPrint: 'Print or save as PDF', cvBack: 'Back to portfolio',
  cvSections: { summary: 'Summary', experience: 'Experience', research: 'Research', projects: 'Selected projects', skills: 'Skills', education: 'Education', awards: 'Awards', certs: 'Certificates', languages: 'Languages', orgs: 'University organizations' },
  cvSummary: 'Information Systems student at USP focused on software engineering, backend, data, and artificial intelligence. I combine development, software testing and debugging research, and technology projects in the university community.',
} satisfies Strings

export const ui: Record<Lang, typeof pt> = { 'pt-BR': pt, en }
export type UI = typeof pt
