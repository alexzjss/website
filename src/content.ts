export type Copy = { 'pt-BR': string; en: string }
export type Category = 'software' | 'research' | 'creative'
export type Kind = 'work' | 'research' | 'academic' | 'program'
export type CaseStudy = { problem: Copy; solution: Copy; result: Copy }
export type Project = { id: string; name: string; description: Copy; categories: Category[]; stack: string[]; url: string; demo?: string; image?: string; imageAlt?: Copy; fit?: 'cover' | 'contain'; position?: string; caseStudy?: CaseStudy }
export type Media = { src: string; alt: Copy }
export type Entry = { id: string; kind?: Kind; link?: { href: string; label: Copy }; name: string; role: Copy; period: Copy; sortKey: number; summary: Copy; details: Copy; logo?: string; photo?: Media; photos?: Media[] }
export const c = (pt: string, en: string): Copy => ({ 'pt-BR': pt, en })
export const tx = (value: Copy, lang: 'pt-BR' | 'en') => value[lang]

export const site = {
  url: 'https://alexjsz.vercel.app',
  email: 'benalex511@gmail.com',
  github: 'https://github.com/alexzjss',
  linkedin: 'https://www.linkedin.com/in/alex-jsz/',
}

export const highlights: Entry[] = [
  {
    id: 'safra', kind: 'work', name: 'Banco Safra', sortKey: 202701,
    role: c('Estagiário · Dados | Empréstimos Pessoa Física', 'Intern · Data | Personal Loans'), period: c('Jan 2027 — Fev 2027', 'Jan 2027 — Feb 2027'),
    summary: c('Estágio na área de dados, com foco em empréstimos para pessoa física.', 'Internship in the data area, focused on personal loans.'),
    details: c('Atua com dados na área de empréstimos de pessoa física do Banco Safra, aplicando na prática a base em dados, Python e SQL construída na graduação e na pesquisa.', 'Works with data in Banco Safra’s personal loans area, applying in practice the data, Python, and SQL foundation built through coursework and research.'),
    logo: '/images/organizations/banco-safra.jpg',
  },
  {
    id: 'claude', kind: 'program', name: 'Claude Campus Ambassador', sortKey: 202610,
    role: c('Embaixador de campus', 'Campus Ambassador'), period: c('Out 2026 — Atual', 'Oct 2026 — Present'),
    summary: c('Programa de embaixadores da Claude, conforme registrado no currículo.', 'Claude ambassador program, as listed on the résumé.'),
    details: c('O currículo registra a participação desde outubro de 2026, sem detalhar as responsabilidades do programa.', 'The résumé lists this role starting in October 2026 but does not detail the program responsibilities.'),
    logo: '/images/organizations/claude.jpg', photo: { src: '/images/experiences/claude-campus-ambassador.jpeg', alt: c('Arte de divulgação do programa Claude Campus Ambassador', 'Claude Campus Ambassador program graphic') },
  },
  {
    id: 'sintese', kind: 'work', name: 'Síntese Jr.', sortKey: 202609,
    role: c('Trainee de Desenvolvimento Back-end | Vendas Consultivas B2B', 'Backend Development Trainee | B2B Consultative Sales'), period: c('Set 2026 — Atual', 'Sep 2026 — Present'),
    summary: c('Atuação em desenvolvimento back-end e vendas consultivas B2B em uma empresa júnior de consultoria de TI.', 'Backend development and B2B consultative sales at a junior IT consulting firm.'),
    details: c('Desenvolve e mantém sistemas back-end para clientes, aplica boas práticas de programação e bancos de dados e participa de prospecção, levantamento de requisitos e negociação. Faz a ponte entre necessidades de negócio e soluções técnicas.', 'Develops and maintains backend systems for clients, applies programming and database best practices, and takes part in prospecting, requirements gathering, and negotiation. Connects business needs with technical solutions.'),
    logo: '/images/organizations/sintese-jr.jpg',
  },
  {
    id: 'pet', kind: 'academic', name: 'PET-SI · EACH-USP', sortKey: 202608,
    role: c('Bolsista do Programa de Educação Tutorial', 'Tutorial Education Program Scholar'), period: c('Ago 2026 — Atual', 'Aug 2026 — Present'),
    summary: c('Bolsista do PET-SI, com participação nos três eixos do programa: ensino, pesquisa e extensão.', 'Scholar in PET-SI, participating in the program’s three pillars: teaching, research, and outreach.'),
    details: c('Contribui com pesquisa aplicada e produção acadêmica em Sistemas de Informação, apoia atividades de ensino e mentoria entre estudantes e desenvolve projetos de extensão universitária.', 'Contributes to applied research and academic work in Information Systems, supports teaching and peer mentoring, and develops university outreach projects.'),
    logo: '/images/organizations/pet-si.jpg', photo: { src: '/images/experiences/pet-si.jpg', alt: c('Alex ao lado do painel do podcast Fala, Coruja! do PET-SI', 'Alex beside the PET-SI Fala, Coruja! podcast display') },
    photos: [{ src: '/images/experiences/pet-si-mascot.jpg', alt: c('Alex com o mascote do PET-SI', 'Alex with the PET-SI mascot') }],
  },
  {
    id: 'saeg', kind: 'research', name: 'SAEG · USP', sortKey: 202607,
    role: c('Bolsista de Iniciação Científica (PUB-USP)', 'Undergraduate Research Scholar (PUB-USP)'), period: c('Jul 2026 — Atual', 'Jul 2026 — Present'),
    summary: c('Pesquisa em teste e depuração de software no grupo SAEG, orientada pelo Prof. Dr. Marcos Lordello Chaim.', 'Software testing and debugging research at the SAEG group, supervised by Prof. Dr. Marcos Lordello Chaim.'),
    details: c('Coleta dados de cobertura de linhas com o Jaguar 2 em programas Java do benchmark Defects4J: 875 versões defeituosas reais de 17 projetos open source, executadas em larga escala com Java e Apache Maven.', 'Collects line-coverage data with Jaguar 2 on Java programs from the Defects4J benchmark: 875 real buggy versions across 17 open-source projects, executed at scale with Java and Apache Maven.'),
    link: { href: '#research', label: c('Ver a pesquisa completa', 'See the full research') },
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
    photos: [
      { src: '/images/experiences/semana-si-portrait.jpg', alt: c('Alex durante a Semana de Sistemas de Informação', 'Alex during Information Systems Week') },
      { src: '/images/experiences/semana-si-stage.jpg', alt: c('Alex no palco durante a Semana de Sistemas de Informação', 'Alex on stage during Information Systems Week') },
      { src: '/images/experiences/semana-si-etec.jpg', alt: c('Integrantes da Semana SI em atividade na Etec São Mateus', 'Information Systems Week members at an event at Etec São Mateus') },
    ],
  },
  {
    id: 'dasi', name: 'DASI USP', sortKey: 202603,
    role: c('Coordenador de Projetos de TI', 'IT Project Coordinator'), period: c('Mar 2026 — Atual', 'Mar 2026 — Present'),
    summary: c('Coordena projetos de TI e também atua como membro acadêmico do Diretório Acadêmico de Sistemas de Informação.', 'Coordinates IT projects and also serves as an academic member of the Information Systems Student Council.'),
    details: c('Desenvolve e mantém sistemas internos, faz a ligação entre docentes e estudantes para melhorias pedagógicas e resolução de questões acadêmicas e administra a infraestrutura de tecnologia da organização.', 'Develops and maintains internal systems, connects faculty and students to improve teaching and resolve academic issues, and manages the organization’s technology infrastructure.'),
    logo: '/images/organizations/dasi.jpg', photo: { src: '/images/experiences/dasi-visit-pg.jpg', alt: c('Alex em visita à P&G com o DASI', 'Alex on a DASI visit to P&G') },
    photos: [
      { src: '/images/experiences/dasi-build-with-ai.jpg', alt: c('Auditório do evento Build with AI, com marcas do DASI USP Leste e GDG Cloud SP', 'Build with AI event auditorium featuring DASI USP Leste and GDG Cloud SP branding') },
      { src: '/images/experiences/dasi-b3-visit.jpg', alt: c('Alex em visita à sede da B3', 'Alex visiting B3 headquarters') },
    ],
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

// Order reflects relevance for data and back-end roles: the two case studies first,
// then research and data-oriented work, then the remaining builds.
export const projects: Project[] = [
  {
    id: 'sampanav', name: 'SampaNav', categories: ['software', 'research'], stack: ['Python', 'FastAPI', 'MapLibre GL', 'H3', 'OpenStreetMap', 'PWA'],
    description: c('Rotas a pé, de bicicleta ou de carro em São Paulo que equilibram tempo de deslocamento e exposição a ocorrências criminais registradas pela SSP-SP.', 'Walking, cycling, and driving routes in São Paulo that balance travel time against exposure to crime incidents recorded by SSP-SP.'),
    url: 'https://github.com/alexzjss/SampaNav', demo: 'https://sampanav.vercel.app', image: '/images/projects/sampanav.jpg', imageAlt: c('Tela do SampaNav com três rotas a pé coloridas pelo risco de cada trecho', 'SampaNav screen showing three walking routes colored by the risk of each segment'),
    caseStudy: {
      problem: c('Apps de mapa otimizam só tempo e distância e ignoram o risco de cada trecho do caminho, algo que importa para quem anda a pé ou de bicicleta em uma cidade grande.', 'Map apps optimize only time and distance and ignore the risk of each segment, which matters for people walking or cycling in a large city.'),
      solution: c('Um motor de rotas em FastAPI que modela a cidade como grafo sobre OpenStreetMap, agrega ocorrências da SSP-SP em células H3 e calcula até três perfis (mais rápida, equilibrada e mais segura) pesando risco contra tempo.', 'A FastAPI routing engine that models the city as a graph on OpenStreetMap, aggregates SSP-SP incidents into H3 cells, and computes up to three profiles (fastest, balanced, safest) by weighing risk against time.'),
      result: c('Aplicativo web instalável (PWA) no ar, com mapa de calor por período do dia, modo de navegação e comparação de quanto cada rota reduz a exposição em troca de quanto tempo a mais. Alternativas que não reduzem o risco em pelo menos 5% são descartadas.', 'An installable web app (PWA) in production, with a heat map by time of day, a navigation mode, and a comparison of how much each route reduces exposure for how much extra time. Alternatives that do not cut risk by at least 5% are discarded.'),
    },
  },
  {
    id: 'dasiboard', name: 'DaSIboard', categories: ['software'], stack: ['React', 'TypeScript', 'Vite', 'Supabase', 'PostgreSQL', 'Vitest'],
    description: c('Plataforma dos alunos de Sistemas de Informação da EACH-USP: grade horária, currículo, comunidade, entidades e calendário colaborativo.', 'Platform for EACH-USP Information Systems students: class schedule, curriculum, community, student organizations, and a collaborative calendar.'),
    url: 'https://github.com/alexzjss/dasiboard-omg', demo: 'https://dasiboard.vercel.app', image: '/images/projects/dasiboard.jpg', imageAlt: c('Tela inicial do DaSIboard com a linha do tempo do dia e a semana', 'DaSIboard home screen with the day timeline and the week'),
    caseStudy: {
      problem: c('Informações do curso ficavam espalhadas entre JupiterWeb, grupos de mensagem e planilhas, e os alunos não tinham um lugar único para planejar o semestre.', 'Course information was scattered across JupiterWeb, chat groups, and spreadsheets, and students had no single place to plan the semester.'),
      solution: c('Um app full-stack que monta a grade a partir dos códigos das disciplinas, mostra o currículo com pré-requisitos (em lista ou constelação), reúne a comunidade e as entidades estudantis e permite propor eventos com fila de revisão e assinatura no Google Calendar.', 'A full-stack app that builds the schedule from course codes, shows the curriculum with prerequisites (list or constellation view), brings together the community and student organizations, and lets students propose events through a review queue with Google Calendar subscription.'),
      result: c('Mais de 700 estudantes atendidos, segundo o currículo. Tema claro e escuro, interface responsiva e testes automatizados com Vitest.', 'More than 700 students served, according to the résumé. Light and dark themes, a responsive interface, and automated tests with Vitest.'),
    },
  },
  {
    id: 'jflp', name: 'JFLP Studio', categories: ['research'], stack: ['Python', 'Java', 'Jaguar 2', 'Maven', 'Defects4J', 'Bugs.jar'],
    description: c('Ferramenta local para rodar Maven, Jaguar 2 e Jaguar 1 sobre versões defeituosas de projetos Java, guardar os resultados brutos de cada execução e compará-los. Gera em escala dados de cobertura de linhas para pesquisa em localização de falhas.', 'A local tool for running Maven, Jaguar 2, and Jaguar 1 on buggy versions of Java projects, storing the raw results of each run, and comparing them. It generates line-coverage data at scale for fault-localization research.'),
    url: 'https://github.com/alexzjss/jflp', image: '/images/projects/jflp.jpg', imageAlt: c('Painel do JFLP Studio com execuções e resultados por bug', 'JFLP Studio dashboard with runs and results per bug'), position: 'top',
  },
  {
    id: 'engrama', name: 'Engrama', categories: ['software', 'creative'], stack: ['Python', 'Ollama', 'Reinforcement Learning', 'Local LLM'],
    description: c('Criatura digital que vive no desktop, estilo tamagotchi: nasce de um ovo, evolui por ramos conforme o cuidado, envelhece e renasce. A mente é uma simulação (necessidades, afeto, aprendizado por reforço) e o LLM local via Ollama só dá a voz. Tudo roda offline, no Windows e no Linux.', 'A desktop digital creature in the tamagotchi tradition: it hatches from an egg, evolves along branches depending on care, ages, and is reborn. Its mind is a simulation (needs, affect, reinforcement learning) and a local LLM through Ollama only provides the voice. Everything runs offline, on Windows and Linux.'),
    url: 'https://github.com/alexzjss/engrama', image: '/images/projects/engrama.jpg', imageAlt: c('Seis linhagens de criaturas do Engrama, do ovo à forma final', 'Six Engrama creature lineages, from egg to final form'), fit: 'contain',
  },
  {
    id: 'vttrpg', name: 'VTT RPG', categories: ['software'], stack: ['React', 'TypeScript', 'Vite', 'Supabase', 'Monorepo'],
    description: c('Mesa virtual para RPG de mesa: o mestre organiza a campanha e os jogadores acompanham em tempo real. Funciona offline no navegador e tem modo online para campanhas compartilhadas. Reconstruído como monorepo, com o domínio em um pacote separado e testado.', 'A virtual tabletop for RPGs: the game master runs the campaign and players follow along in real time. It works offline in the browser and has an online mode for shared campaigns. Rebuilt as a monorepo with the domain model in a separate, tested package.'),
    url: 'https://github.com/alexzjss/vttrpg',
  },
  {
    id: 'algoricmos', name: 'algoriCmos', categories: ['software'], stack: ['Python', 'CLI'],
    description: c('Gerador de exercícios aleatórios, em português, para estudar programação em C, análise de algoritmos e estruturas de dados. Roda no terminal, sem dependências externas, com filtros por tópico e dificuldade.', 'A random exercise generator in Portuguese for studying C programming, algorithm analysis, and data structures. It runs in the terminal with no external dependencies and filters by topic and difficulty.'),
    url: 'https://github.com/alexzjss/algoriCmos',
  },
  {
    id: 'modaloop', name: 'ModaLoop', categories: ['software'], stack: ['React', 'TypeScript', 'Vite'],
    description: c('Plataforma de economia circular que conecta pessoas a pontos de coleta, doação e reciclagem de roupas e resíduos têxteis, com geolocalização e informações ambientais.', 'A circular-economy platform connecting people with clothing and textile collection, donation, and recycling points, with geolocation and environmental information.'),
    url: 'https://github.com/alexzjss/modaloop', image: '/images/projects/modaloop.jpg', imageAlt: c('Página inicial do ModaLoop com o texto "Sua roupa merece outro rolê"', 'ModaLoop landing page reading “Sua roupa merece outro rolê”'),
  },
  {
    id: 'ecofruta', name: 'Eco Fruta', categories: ['software'], stack: ['Next.js', 'React', 'TypeScript', 'Zustand'],
    description: c('Feira virtual de orgânicos que aproxima consumidores de pequenos produtores. Reúne catálogo pesquisável, filtros de produtos, carrinho e contato direto com produtores pelo WhatsApp.', 'A virtual organic market connecting consumers with small producers. It includes a searchable catalog, product filters, a shopping cart, and direct contact with producers through WhatsApp.'),
    url: 'https://github.com/alexzjss/eco-fruta', demo: 'https://eco-fruta.vercel.app',
  },
  {
    id: 'icndy', name: 'ICNDY', categories: ['software'], stack: ['React Native', 'Expo', 'TypeScript', 'SQLite'],
    description: c('Aplicativo Android offline-first para acompanhar treinos Cindy, com sessões Classic e Beginner configuráveis, cronômetro, registro de rounds, histórico local, métricas de progresso, lembretes opcionais e backup em JSON.', 'An offline-first Android app for tracking Cindy workouts, with configurable Classic and Beginner sessions, a workout timer, round tracking, local history, progress metrics, optional reminders, and JSON backup.'),
    url: 'https://github.com/alexzjss/ICNDY', image: '/images/projects/icndy.jpg', imageAlt: c('Ícone do aplicativo ICNDY, uma letra C em verde sobre fundo preto', 'ICNDY app icon, a green letter C on a black background'),
  },
  {
    id: 'vat', name: 'VAT', categories: ['creative'], stack: ['Godot 4', 'GDScript'],
    description: c('Protótipo de RPG com combate em tempo real por barra de ATB, feito em Godot 4 com GDScript tipado. Evoluiu por marcos: elementos, marcas e reações, estados, mapa-múndi, dungeons, save em três slots e editores visuais de conteúdo, até uma demo jogável de ponta a ponta.', 'An RPG prototype with real-time ATB combat, built in Godot 4 with typed GDScript. It grew through milestones: elements, marks and reactions, status effects, a world map, dungeons, three-slot saves, and visual content editors, up to an end-to-end playable demo.'),
    url: 'https://github.com/alexzjss/vat',
  },
  {
    id: 'gems', name: 'Gems Hype', categories: ['software', 'creative'], stack: ['HTML', 'Gemini Gems'],
    description: c('Projeto criado para o Hackathon do Hype USP usando Gems do Gemini.', 'A project built for the Hype USP hackathon using Gemini Gems.'),
    url: 'https://github.com/alexzjss/gems-hype',
  },
  {
    id: 'nakano', name: 'Desafio Nakano', categories: ['creative'], stack: ['HTML', 'CSS', 'JavaScript'],
    description: c('Quiz interativo em homenagem ao Prof. Fábio Nakano, da EACH-USP, apresentado em aula. Mistura perguntas sobre a carreira do professor com questões de C para a turma, em um único arquivo HTML com partículas, confete e um modo caos na tela final.', 'An interactive quiz honoring Prof. Fábio Nakano of EACH-USP, presented in class. It mixes questions about the professor’s career with C questions for the class, in a single HTML file with particles, confetti, and a chaos mode on the final screen.'),
    url: 'https://github.com/alexzjss/quiz-nakano',
  },
]

export const educationPhotos = [
  { src: '/images/education/usp-career-fair.jpg', alt: c('Alex na Feira de Profissões da USP, em frente ao estande da EACH', 'Alex at the USP Career Fair in front of the EACH booth'), caption: c('Feira de Profissões da USP', 'USP Career Fair') },
  { src: '/images/education/usp-clock-square.jpg', alt: c('Alex na Praça do Relógio da Cidade Universitária da USP', 'Alex at Clock Square on USP’s University City campus'), caption: c('Cidade Universitária · USP', 'University City · USP') },
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
