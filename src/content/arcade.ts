import type { ArcadePath, Award, EventItem, Social } from './types'

/** Modos do menu do arcade. A rota é /arcade/<id>. */
export const caminhos: ArcadePath[] = [
  {
    id: 'projetos',
    rotulo: 'Projetos pessoais',
    descricao: 'O que eu construo fora do trabalho e da faculdade',
    icone: '▤',
    cor: 'ciano',
  },
  {
    id: 'conquistas',
    rotulo: 'Conquistas',
    descricao: 'Troféus: hackathons, CTFs e olimpíadas',
    icone: '🏆',
    cor: 'ambar',
  },
  {
    id: 'eventos',
    rotulo: 'Linha do tempo',
    descricao: 'Eventos, competições e marcos, em ordem',
    icone: '⌁',
    cor: 'verde',
  },
  {
    id: 'reviews',
    rotulo: 'Reviews',
    descricao: 'Jogos que eu zerei e o que achei de cada um',
    icone: '★',
    cor: 'magenta',
  },
  {
    id: 'contato',
    rotulo: 'Contato',
    descricao: 'Redes, e-mail e canais abertos',
    icone: '✉',
    cor: 'roxo',
  },
]

/**
 * tier define a cor do troféu (platina, ouro, prata, bronze).
 * raridade é a porcentagem de "jogadores" que conseguiram — só enfeite.
 */
export const conquistas: Award[] = [
  {
    titulo: 'Agente de IA campeão',
    evento: 'Hackathon de Construção de Agentes de IA — Hype USP',
    ano: '2026',
    posicao: '1º lugar',
    detalhe: 'Cerca de 60 competidores na disputa.',
    tier: 'platina',
    raridade: 1.6,
  },
  {
    titulo: 'EACH in the Shell X SSI',
    evento: 'Capture The Flag — EACH-USP',
    ano: '2026',
    posicao: 'Campeão',
    detalhe: 'Competição de segurança ofensiva da faculdade.',
    tier: 'ouro',
    raridade: 3.2,
  },
  {
    titulo: 'HackFools Codelab',
    evento: 'IME-USP',
    ano: '2026',
    posicao: 'Campeão',
    detalhe: 'Hackathon do Codelab no Instituto de Matemática e Estatística.',
    tier: 'ouro',
    raridade: 4.1,
  },
  {
    titulo: 'Medalha de bronze na OBMEP',
    evento: 'Olimpíada Brasileira de Matemática das Escolas Públicas',
    ano: '2025',
    posicao: 'Medalha de bronze',
    tier: 'bronze',
    raridade: 12.4,
  },
  {
    titulo: 'Bolsa PUB de Iniciação Científica',
    evento: 'USP — grupo SAEG',
    ano: '2026',
    posicao: 'Bolsista aprovado',
    detalhe: 'Pesquisa em teste e depuração de software em Java.',
    tier: 'prata',
    raridade: 8.7,
  },
]

/**
 * Linha do tempo. Para adicionar um marco, basta acrescentar um item —
 * a ordenação é feita pela data (AAAA-MM), do mais recente para o mais antigo.
 */
export const eventos: EventItem[] = [
  {
    nome: 'Entrada no PET-SI',
    papel: 'Membro bolsista',
    data: '2026-08',
    local: 'EACH-USP',
    descricao:
      'Aprovado no Programa de Educação Tutorial de Sistemas de Informação, com práticas de ensino, pesquisa e extensão.',
    tags: ['Ensino', 'Pesquisa'],
    destaque: true,
  },
  {
    nome: 'Início da Iniciação Científica',
    papel: 'Bolsista PUB — grupo SAEG',
    data: '2026-07',
    local: 'EACH-USP',
    descricao:
      'Começo da pesquisa em teste e depuração de software em Java, sob orientação do Prof. Dr. Marcos Lordello Chaim.',
    tags: ['Java', 'Pesquisa'],
  },
  {
    nome: 'Hackathon de Agentes de IA',
    papel: 'Campeão',
    data: '2026-06',
    local: 'Hype USP',
    descricao: '1º lugar entre cerca de 60 competidores construindo agentes de IA.',
    tags: ['IA', 'Hackathon'],
    destaque: true,
  },
  {
    nome: 'HackFools Codelab',
    papel: 'Campeão',
    data: '2026-05',
    local: 'IME-USP',
    descricao: 'Primeiro lugar no hackathon do Codelab no IME.',
    tags: ['Hackathon'],
    destaque: true,
  },
  {
    nome: 'EACH in the Shell X SSI',
    papel: 'Campeão',
    data: '2026-04',
    local: 'EACH-USP',
    descricao: 'Vitória no Capture The Flag de segurança ofensiva da faculdade.',
    tags: ['Segurança', 'CTF'],
    destaque: true,
  },
  {
    nome: 'Desafio Quant AI',
    papel: 'Competidor',
    data: '2026-03',
    local: 'Itaú Asset Management',
    descricao: 'Desenvolvi o TrendSurfer Bot, estratégia long/short de momentum no IBOV.',
    tags: ['Python', 'Quant'],
  },
  {
    nome: 'Início na USP',
    papel: 'Calouro de Sistemas de Informação',
    data: '2026-02',
    local: 'EACH-USP',
    descricao: 'Começo do bacharelado e entrada nas primeiras organizações estudantis.',
    tags: ['USP'],
  },
  {
    nome: 'OBMEP',
    papel: 'Medalhista de bronze',
    data: '2025-10',
    descricao: 'Medalha de bronze na Olimpíada Brasileira de Matemática das Escolas Públicas.',
    tags: ['Matemática'],
  },
]

export const redes: Social[] = [
  {
    rede: 'GitHub',
    handle: '@alexzjss',
    url: 'https://github.com/alexzjss',
    descricao: 'Código, experimentos e o README de perfil em SVG.',
  },
  {
    rede: 'LinkedIn',
    handle: '/in/alex-jsz',
    url: 'https://www.linkedin.com/in/alex-jsz/',
    descricao: 'Versão formal da história, para recrutadores.',
  },
  {
    rede: 'E-mail',
    handle: 'alexzjss@gmail.com',
    url: 'mailto:alexzjss@gmail.com',
    descricao: 'O canal mais rápido para falar comigo.',
  },
  {
    rede: 'E-mail USP',
    handle: 'alexjsz@usp.br',
    url: 'mailto:alexjsz@usp.br',
    descricao: 'Para assuntos acadêmicos e de pesquisa.',
  },
]
