import type { Education, Experience } from './types'

/** Ordem: mais recente primeiro. */
export const experiencias: Experience[] = [
  {
    cargo: 'Trainee de Backend e Vendas B2B Consultivas',
    organizacao: 'Síntese Jr',
    inicio: 'Set 2026',
    fim: 'Atual',
    local: 'São Paulo, SP',
    descricao:
      'Desenvolvimento e manutenção de sistemas backend para clientes, com boas práticas de programação e bancos de dados. Participação em vendas consultivas B2B, com prospecção, levantamento de requisitos e negociação, conectando necessidades de negócio a soluções técnicas.',
    tags: ['Backend', 'Bancos de dados', 'Vendas B2B', 'Consultoria'],
  },
  {
    cargo: 'Bolsista PET',
    organizacao: 'PET-SI EACH-USP',
    inicio: 'Ago 2026',
    fim: 'Atual',
    local: 'São Paulo, SP',
    descricao:
      'Atuação nos pilares de pesquisa aplicada, ensino e extensão, com apoio a atividades acadêmicas, mentoria entre pares e participação em iniciativas de formação e impacto social.',
    tags: ['Ensino', 'Pesquisa', 'Extensão'],
  },
  {
    cargo: 'Bolsista de Iniciação Científica (PUB)',
    organizacao: 'Universidade de São Paulo — grupo SAEG',
    inicio: 'Jul 2026',
    fim: 'Atual',
    local: 'São Paulo, SP',
    descricao:
      'Pesquisa em geração de dados para experimentação em teste e depuração de software, com uso da ferramenta Jaguar 2 para coletar cobertura de fluxo de controle em programas Java do benchmark Defects4J. O trabalho compara benchmarks Java e seleciona Bugs.jar como base principal para automação em larga escala, com Java e Apache Maven.',
    tags: ['Java', 'Apache Maven', 'Teste de software', 'Pesquisa'],
  },
  {
    cargo: 'Pesquisador de Cibersegurança',
    organizacao: 'Each In The Shell (EITS)',
    inicio: 'Set 2026',
    fim: 'Atual',
    local: 'São Paulo, SP',
    descricao:
      'Análise de vulnerabilidades em sistemas e redes, com abordagem ofensiva e defensiva em pentest e CTF. Produção de conteúdo técnico sobre boas práticas e segurança digital.',
    tags: ['Segurança', 'Pentest', 'CTF', 'Redes'],
  },
  {
    cargo: 'Pesquisador de Dados e IA',
    organizacao: 'Hype — Data & AI',
    inicio: 'Mai 2026',
    fim: 'Atual',
    local: 'São Paulo, SP',
    descricao:
      'Pesquisa aplicada em ciência de dados, bancos de dados, IA e machine learning, além de participação em desafios internos e hackathons do grupo. Resultado: 1º lugar no Hackathon de Construção de Agentes de IA da Hype USP.',
    tags: ['Python', 'Machine Learning', 'IA', 'Dados'],
  },
  {
    cargo: 'Projetos de TI',
    organizacao: 'DASI USP',
    inicio: 'Mar 2026',
    fim: 'Atual',
    local: 'São Paulo, SP',
    descricao:
      'Desenvolvimento e manutenção de sistemas internos para a comunidade estudantil, gestão da infraestrutura tecnológica e atuação como elo entre docentes e discentes em melhorias pedagógicas e operacionais.',
    tags: ['Infraestrutura', 'Liderança', 'Sistemas acadêmicos'],
  },
  {
    cargo: 'Projetos Web',
    organizacao: 'USPCodeLab Leste',
    inicio: 'Jun 2026',
    fim: 'Atual',
    local: 'São Paulo, SP',
    descricao:
      'Planejamento de prazos, acompanhamento de projetos web e coordenação de times multifuncionais em metodologia ágil, com foco em entrega, comunicação e execução de soluções digitais.',
    tags: ['Web', 'Agile', 'Coordenação', 'Full-Stack'],
  },
  {
    cargo: 'Membro da Comissão Organizadora',
    organizacao: 'Semana de Sistemas de Informação',
    inicio: 'Mar 2026',
    fim: 'Atual',
    local: 'São Paulo, SP',
    descricao:
      'Atuação em patrocínio e financeiro, além de criação e comunicação, com prospecção de parceiros, gestão do orçamento e estratégias para fortalecer a visibilidade do evento.',
    tags: ['Patrocínio', 'Financeiro', 'Comunicação'],
  },
  {
    cargo: 'Líder de Design e Comunicação / Organizador de Projetos',
    organizacao: 'Conway USP',
    inicio: 'Abr 2026',
    fim: 'Atual',
    local: 'São Paulo, SP',
    descricao:
      'Responsável por materiais gráficos, identidade visual, comunicação institucional e redes sociais, atuando também na organização de cronogramas, escopo e integração entre programação, arte e som; documentação técnica em GDD e trabalho em Scrum/Kanban.',
    tags: ['Design', 'Comunicação', 'Gestão de projetos', 'Game Dev'],
  },
]

export const formacao: Education[] = [
  {
    curso: 'Bacharelado em Sistemas de Informação',
    instituicao: 'Universidade de São Paulo (USP)',
    periodo: '2026 — Dez 2029',
    detalhes: ['Escola de Artes, Ciências e Humanidades (EACH) — São Paulo, SP'],
  },
]
