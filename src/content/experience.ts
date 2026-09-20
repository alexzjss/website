import type { Education, Experience } from './types'

/** Ordem: mais recente primeiro. */
export const experiencias: Experience[] = [
  {
    cargo: 'Membro bolsista — PET-SI',
    organizacao: 'EACH-USP',
    inicio: 'Ago 2026',
    fim: 'Atual',
    local: 'São Paulo, SP',
    descricao:
      'Membro do Programa de Educação Tutorial de Sistemas de Informação. Participo de programas voltados para educação, pesquisa e extensão, e desenvolvo oficinas.',
    tags: ['Ensino', 'Pesquisa', 'Extensão'],
  },
  {
    cargo: 'Bolsista de Iniciação Científica (PUB) — Grupo SAEG',
    organizacao: 'EACH-USP',
    inicio: 'Jul 2026',
    fim: 'Fev 2027',
    local: 'São Paulo, SP',
    descricao:
      'Pesquiso teste e depuração de software (Java, Apache Maven) em benchmarks com dados reais e open-source, voltados à melhoria das ferramentas de teste e depuração, sob orientação do Prof. Dr. Marcos Lordello Chaim, com foco em inovação metodológica, de cobertura e de tecnologias.',
    tags: ['Java', 'Maven', 'Benchmarks', 'Pesquisa'],
  },
  {
    cargo: 'Coordenador de Projetos de TI',
    organizacao: 'DASI USP',
    inicio: 'Mar 2026',
    fim: 'Atual',
    local: 'São Paulo, SP',
    descricao:
      'Lidero equipe técnica multidisciplinar na infraestrutura tecnológica da entidade, otimizando o fluxo de informações para mais de 700 estudantes.',
    tags: ['Liderança', 'Infraestrutura'],
  },
  {
    cargo: 'Pesquisador de Dados e Inteligência Artificial',
    organizacao: 'Hype USP',
    inicio: 'Jun 2026',
    fim: 'Atual',
    local: 'São Paulo, SP',
    descricao:
      'Conduzo pesquisas aplicadas em equipe em Ciência de Dados, IA e Machine Learning, disseminando conhecimento técnico no ecossistema universitário.',
    tags: ['Python', 'Machine Learning', 'IA'],
  },
  {
    cargo: 'Desenvolvedor Full-Stack',
    organizacao: 'USP Code Lab Leste',
    inicio: 'Jun 2026',
    fim: 'Atual',
    local: 'São Paulo, SP',
    descricao:
      'Desenvolvo, em equipe, soluções de software Full-Stack e Mobile com impacto social real, da concepção à produção.',
    tags: ['TypeScript', 'React', 'Mobile'],
  },
  {
    cargo: 'Design, Criação e Comunicação',
    organizacao: 'Conway USP',
    inicio: 'Abr 2026',
    fim: 'Atual',
    local: 'São Paulo, SP',
    descricao:
      'Atuo no setor responsável por marketing, divulgação, estratégias, postagens e identidade visual da Conway USP, voltada ao mundo dos jogos e ao público jovem.',
    tags: ['Design', 'Comunicação'],
  },
  {
    cargo: 'Gestão Comercial e Financeira',
    organizacao: 'COSSI USP — Semana de Sistemas de Informação',
    inicio: 'Mar 2026',
    fim: 'Atual',
    local: 'São Paulo, SP',
    descricao:
      'Negocio parcerias estratégicas com empresas em equipe, viabilizando as atividades comerciais e financeiras do evento.',
    tags: ['Negociação', 'Financeiro'],
  },
]

export const formacao: Education[] = [
  {
    curso: 'Bacharelado em Sistemas de Informação',
    instituicao: 'Universidade de São Paulo (USP)',
    periodo: 'Fev 2026 — Dez 2029',
    detalhes: ['Escola de Artes, Ciências e Humanidades (EACH) — São Paulo, SP'],
  },
]
