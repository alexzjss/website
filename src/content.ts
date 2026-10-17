export type Copy = { 'pt-BR': string; en: string }
export type Category = 'software' | 'research' | 'creative'
export type Project = { name: string; description: Copy; categories: Category[]; stack: string[]; url: string }
export type Media = { src: string; alt: Copy }
export type Entry = { id: string; name: string; role: Copy; period: Copy; sortKey: number; summary: Copy; details: Copy; logo?: string; photo?: Media }
export const c = (pt: string, en: string): Copy => ({ 'pt-BR': pt, en })
export const tx = (value: Copy, lang: 'pt-BR' | 'en') => value[lang]

export const highlights: Entry[] = [
  {
    id: 'claude', name: 'Claude Campus Ambassador', sortKey: 202610,
    role: c('Embaixador de campus', 'Campus Ambassador'), period: c('Out 2026 — Atual', 'Oct 2026 — Present'),
    summary: c('Programa de embaixadores da Claude, conforme registrado no currículo.', 'Claude ambassador program, as listed on the résumé.'),
    details: c('O currículo registra a participação desde outubro de 2026, sem detalhar as responsabilidades do programa.', 'The résumé lists this role starting in October 2026 but does not detail the program responsibilities.'),
    logo: '/images/organizations/claude.jpg', photo: { src: '/images/experiences/claude-campus-ambassador.jpeg', alt: c('Arte de divulgação do programa Claude Campus Ambassador', 'Claude Campus Ambassador program graphic') },
  },
  {
    id: 'sintese', name: 'Síntese Jr.', sortKey: 202609,
    role: c('Trainee de Desenvolvimento Back-end | Vendas Consultivas B2B', 'Backend Development Trainee | B2B Consultative Sales'), period: c('Set 2026 — Atual', 'Sep 2026 — Present'),
    summary: c('Atuação em desenvolvimento back-end e vendas consultivas B2B em uma empresa júnior de consultoria de TI.', 'Backend development and B2B consultative sales at a junior IT consulting firm.'),
    details: c('Desenvolve e mantém sistemas back-end para clientes, aplica boas práticas de programação e bancos de dados e participa de prospecção, levantamento de requisitos e negociação. Faz a ponte entre necessidades de negócio e soluções técnicas.', 'Develops and maintains backend systems for clients, applies programming and database best practices, and takes part in prospecting, requirements gathering, and negotiation. Connects business needs with technical solutions.'),
    logo: '/images/organizations/sintese-jr.jpg',
  },
  {
    id: 'pet', name: 'PET-SI · EACH-USP', sortKey: 202608,
    role: c('Bolsista do Programa de Educação Tutorial', 'Tutorial Education Program Scholar'), period: c('Ago 2026 — Atual', 'Aug 2026 — Present'),
    summary: c('Bolsista do PET-SI, com participação nos três eixos do programa: ensino, pesquisa e extensão.', 'Scholar in PET-SI, participating in the program’s three pillars: teaching, research, and outreach.'),
    details: c('Contribui com pesquisa aplicada e produção acadêmica em Sistemas de Informação, apoia atividades de ensino e mentoria entre estudantes e desenvolve projetos de extensão universitária.', 'Contributes to applied research and academic work in Information Systems, supports teaching and peer mentoring, and develops university outreach projects.'),
    logo: '/images/organizations/pet-si.jpg', photo: { src: '/images/experiences/pet-si.jpg', alt: c('Alex ao lado do painel do podcast Fala, Coruja! do PET-SI', 'Alex beside the PET-SI Fala, Coruja! podcast display') },
  },
]

export const organizations: Entry[] = [
  {
    id: 'eits', name: 'Each In The Shell (EITS)', sortKey: 202609,
    role: c('Pesquisador de Cibersegurança', 'Cybersecurity Researcher'), period: c('Set 2026 — Atual', 'Sep 2026 — Present'),
    summary: c('Pesquisa em cibersegurança e segurança de redes.', 'Research in cybersecurity and network security.'),
    details: c('Investiga vulnerabilidades em sistemas e redes, estuda técnicas ofensivas e defensivas (pentest e CTF) e produz conteúdo técnico sobre boas práticas de segurança da informação.', 'Investigates system and network vulnerabilities, studies offensive and defensive techniques (pentesting and CTF), and produces technical content on information security practices.'),
    logo: '/images/organizations/each-in-the-shell.jpg',
  },
  {
    id: 'conway', name: 'Conway USP', sortKey: 202604,
    role: c('Líder de Design e Comunicação (ago–atual); organizador de projetos (abr–ago)', 'Design & Communications Lead (Aug–present); Project Organizer (Apr–Aug)'), period: c('Abr 2026 — Atual', 'Apr 2026 — Present'),
    summary: c('Grupo de extensão universitária dedicado a desenvolvimento de jogos e computação gráfica.', 'University outreach group focused on game development and computer graphics.'),
    details: c('Como organizador de projetos, coordenou cronogramas e escopo, facilitou a comunicação entre programação, arte e áudio, aplicou Scrum/Kanban e organizou documentação de design (GDD). Desde agosto, lidera design e comunicação, criando materiais e identidade visual e cuidando da comunicação institucional e redes sociais.', 'As Project Organizer, coordinated schedules and scope, facilitated communication across programming, art, and audio teams, applied Scrum/Kanban, and organized game design documentation (GDD). Since August, leads design and communications, creating visual materials and identity and managing institutional communications and social media.'),
    logo: '/images/organizations/conway-usp.jpg',
  },
  {
    id: 'codelab', name: 'USPCodeLab Leste', sortKey: 202606,
    role: c('Gerente de Projetos de Desenvolvimento Web', 'Web Development Project Manager'), period: c('Jun 2026 — Atual', 'Jun 2026 — Present'),
    summary: c('Gerencia projetos de desenvolvimento web no laboratório de extensão tecnológica da EACH-USP.', 'Manages web development projects at EACH-USP’s technology outreach lab.'),
    details: c('Planeja e acompanha cronogramas, coordena equipes multidisciplinares de desenvolvimento e aplica metodologias ágeis de gestão de projetos.', 'Plans and tracks project timelines, coordinates cross-functional development teams, and applies agile project management methods.'),
    logo: '/images/organizations/usp-code-lab-leste.jpg', photo: { src: '/images/experiences/codelab-hackfools.jpg', alt: c('Alex com o troféu do Hackfools 2026', 'Alex with the Hackfools 2026 trophy') },
  },
  {
    id: 'hype', name: 'Hype — Data & AI', sortKey: 202605,
    role: c('Pesquisador de Dados e IA', 'Data & AI Researcher'), period: c('Mai 2026 — Atual', 'May 2026 — Present'),
    summary: c('Pesquisa acadêmica em ciência de dados e inteligência artificial no grupo de extensão da USP.', 'Academic research in data science and artificial intelligence at USP’s outreach group.'),
    details: c('Participa de pesquisas e projetos internos de IA usando Python e bancos de dados. Conquistou o primeiro lugar no Hackathon de Construção de Agentes de IA do grupo.', 'Takes part in research and internal AI projects using Python and databases. Won first place in the group’s AI Agent Building Hackathon.'),
    logo: '/images/organizations/hype-usp.jpg',
  },
  {
    id: 'semana', name: 'Semana de Sistemas de Informação', sortKey: 202603,
    role: c('Membro da comissão organizadora — Patrocínio/Financeiro e Criação/Comunicação', 'Organizing Committee — Sponsorship/Finance and Creative/Communications'), period: c('Mar 2026 — Atual', 'Mar 2026 — Present'),
    summary: c('Organização do evento acadêmico anual do curso de Sistemas de Informação da USP.', 'Organizes the annual academic event for USP’s Information Systems program.'),
    details: c('Prospecta patrocínios, administra o orçamento do evento, desenvolve identidade visual e estratégias de marketing e mantém comunicação com parceiros e patrocinadores.', 'Prospects sponsors, manages the event budget, develops visual identity and marketing strategies, and communicates with partners and sponsors.'),
    logo: '/images/organizations/semana-si.jpg', photo: { src: '/images/experiences/semana-si-presenter.jpg', alt: c('Alex apresentando durante a Semana de Sistemas de Informação', 'Alex presenting during Information Systems Week') },
  },
  {
    id: 'dasi', name: 'DASI USP', sortKey: 202603,
    role: c('Coordenador de Projetos de TI', 'IT Project Coordinator'), period: c('Mar 2026 — Atual', 'Mar 2026 — Present'),
    summary: c('Coordena projetos de TI e também atua como membro acadêmico do Diretório Acadêmico de Sistemas de Informação.', 'Coordinates IT projects and also serves as an academic member of the Information Systems Student Council.'),
    details: c('Desenvolve e mantém sistemas internos, faz a ligação entre docentes e estudantes para melhorias pedagógicas e resolução de questões acadêmicas e administra a infraestrutura de tecnologia da organização.', 'Develops and maintains internal systems, connects faculty and students to improve teaching and resolve academic issues, and manages the organization’s technology infrastructure.'),
    logo: '/images/organizations/dasi.jpg', photo: { src: '/images/experiences/dasi-visit-pg.jpg', alt: c('Alex em visita à P&G com o DASI', 'Alex on a DASI visit to P&G') },
  },
]

export const collective = {
  period: c('Mar 2026 — Atual', 'Mar 2026 — Present'),
  summary: c('Um único bloco reúne seis frentes de participação no ecossistema universitário.', 'One collective entry brings together six roles in the university community.'),
}

export const research = {
  title: c('Geração de dados para experimentação em teste e depuração de software', 'Data Generation for Software Testing and Debugging Experimentation'),
  period: c('Jul 2026 — Atual', 'Jul 2026 — Present'),
  institution: 'Universidade de São Paulo · SAEG · PUB-USP',
  advisor: 'Prof. Dr. Marcos Lordello Chaim',
  summary: c('Iniciação científica no Programa Unificado de Bolsas da USP, no grupo SAEG (Software Analysis and Experimentation Group). A pesquisa investiga técnicas de teste e depuração com programas Java do benchmark Defects4J.', 'Undergraduate research through USP’s Unified Scholarship Program with SAEG (Software Analysis and Experimentation Group). The work investigates testing and debugging techniques using Java programs from the Defects4J benchmark.'),
  method: c('Com Jaguar 2, coleta dados de cobertura de fluxo de controle (cobertura de linhas) durante a execução de testes. O currículo informa o uso de 875 versões defeituosas reais de 17 projetos open source e execução em larga escala com Java e Apache Maven.', 'Uses Jaguar 2 to collect control-flow coverage data (line coverage) while running tests. The résumé reports 875 real buggy versions across 17 open-source projects and large-scale execution with Java and Apache Maven.'),
  status: c('O currículo indica como objetivo apresentar o trabalho em eventos científicos, como o SICUSP; não informa resultados publicados.', 'The résumé lists presentation at scientific events such as SICUSP as an aim; it does not report published results.'),
  tools: ['Java', 'Apache Maven', 'Jaguar 2', 'Defects4J'],
}

export const projects: Project[] = [
  { name: 'DaSIboard', description: c('Painel acadêmico full-stack para estudantes de Sistemas de Informação: reúne tarefas, notas, frequência, calendário, salas colaborativas e fluxograma curricular. O currículo registra mais de 700 estudantes atendidos. Inclui login com Google e integração para consultar grades do Júpiter.', 'A full-stack academic dashboard for Information Systems students, bringing together tasks, grades, attendance, a calendar, collaborative study rooms, and a curriculum map. Your résumé reports more than 700 students served. It includes Google sign-in and integration for retrieving Júpiter schedules.'), categories: ['software'], stack: ['React', 'TypeScript', 'Vite', 'Supabase'], url: 'https://github.com/alexzjss/dasiboard-omg' },
  { name: 'ModaLoop', description: c('Plataforma de economia circular que conecta pessoas a pontos de coleta, doação e reciclagem de roupas e resíduos têxteis, com geolocalização e informações ambientais.', 'A circular-economy platform connecting people with clothing and textile collection, donation, and recycling points, with geolocation and environmental information.'), categories: ['software'], stack: ['React', 'TypeScript', 'Vite'], url: 'https://github.com/alexzjss/modaloop' },
  { name: 'RPG Codex VTT', description: c('Mesa virtual para RPG tático narrativo, com mapa e combate por turnos, gestão de personagens e arsenal, painel do mestre e modo online para jogadores. Mantém dados localmente e sincroniza campanhas online pelo Supabase.', 'A virtual tabletop for tactical narrative RPGs, with a scene map and turn-based combat, character and arsenal management, a game-master dashboard, and an online player mode. It stores data locally and syncs campaigns online through Supabase.'), categories: ['software'], stack: ['React', 'TypeScript', 'Supabase', 'IndexedDB'], url: 'https://github.com/alexzjss/vttrpg' },
  { name: 'JFLP', description: c('Pipeline experimental modular para executar e comparar técnicas de localização de falhas baseada em espectro em programas Java. Automatiza a preparação de benchmarks, coleta de espectros com Jaguar 2 e avaliação por métricas como EXAM e Top-N.', 'A modular experimental pipeline for running and comparing spectrum-based fault-localization techniques on Java programs. It automates benchmark setup, spectrum collection with Jaguar 2, and evaluation using metrics such as EXAM and Top-N.'), categories: ['research'], stack: ['Python', 'Java', 'Jaguar 2', 'Maven / Gradle'], url: 'https://github.com/alexzjss/jflp' },
  { name: 'Eco Fruta', description: c('Feira virtual de orgânicos que aproxima consumidores de pequenos produtores. Reúne catálogo pesquisável, filtros de produtos, carrinho e contato direto com produtores pelo WhatsApp.', 'A virtual organic market connecting consumers with small producers. It includes a searchable catalog, product filters, a shopping cart, and direct contact with producers through WhatsApp.'), categories: ['software'], stack: ['Next.js', 'React', 'TypeScript', 'Zustand'], url: 'https://github.com/alexzjss/eco-fruta' },
  { name: 'ICNDY', description: c('Aplicativo Android offline-first para acompanhar treinos Cindy, com sessões Classic e Beginner configuráveis, cronômetro, registro de rounds, histórico local, métricas de progresso, lembretes opcionais e backup em JSON.', 'An offline-first Android app for tracking Cindy workouts, with configurable Classic and Beginner sessions, a workout timer, round tracking, local history, progress metrics, optional reminders, and JSON backup.'), categories: ['software'], stack: ['React Native', 'Expo', 'TypeScript', 'SQLite'], url: 'https://github.com/alexzjss/ICNDY' },
  { name: 'SampaNav', description: c('Planejador local de rotas para um cenário de sobrevivência. Representa setores como um grafo e compara o caminho mais curto com rotas que reduzem a exposição a terreno hostil, zonas de perigo e sonares.', 'A local route planner for a survival scenario. It models sectors as a graph and compares the shortest path with routes that reduce exposure to hostile terrain, danger zones, and sonar.'), categories: ['software'], stack: ['Node.js', 'JavaScript', 'Dijkstra', 'SVG'], url: 'https://github.com/alexzjss/SampaNav' },
]

export const skillGroups = [
  { title: c('Linguagens', 'Languages'), items: ['Python', 'Java', 'TypeScript', 'JavaScript', 'SQL'] },
  { title: c('Back-end e APIs', 'Backend & APIs'), items: ['FastAPI', 'Node.js', 'REST APIs'] },
  { title: c('Dados e bancos de dados', 'Data & Databases'), items: ['PostgreSQL', 'MySQL', 'Machine Learning', 'Data Science', 'Data Analysis', 'Matplotlib'] },
  { title: c('Infraestrutura e ferramentas', 'Infrastructure & Tools'), items: ['Docker', 'Git', 'GitHub', 'Linux', 'Unix'] },
  { title: c('IA generativa', 'Generative AI'), items: ['Generative AI', 'Claude Cowork'] },
]

export const awards = [
  c('Medalha de bronze — OBMEP', 'Bronze Medal — OBMEP'),
  c('1º lugar — Hackathon de Construção de Agentes de IA (Hype)', '1st Place — AI Agent Building Hackathon (Hype)'),
  c('Campeão — Hackfools 2026', 'Champion — Hackfools 2026'),
  c('Campeão — Capture The Flag', 'Champion — Capture The Flag'),
]

export const certifications: Copy[] = [
  c('Certificado de conclusão: Claude 101', 'Certificate of Completion: Claude 101'),
  c('Introdução ao Linux', 'Introduction to Linux'),
  c('AWS Educate: Introdução à IA Generativa', 'AWS Educate: Introduction to Generative AI'),
  c('Ciência de Dados e Machine Learning', 'Data Science and Machine Learning'),
  c('Conceitos de desenvolvimento de jogos', 'Game Development Concepts'),
]
