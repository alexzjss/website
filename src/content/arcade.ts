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
    detalhe: 'Entre cerca de 60 competidores.',
    tier: 'platina',
    raridade: 1.6,
  },
  {
    titulo: 'EACH in the Shell',
    evento: 'Capture The Flag — EACH-USP',
    ano: '2026',
    posicao: 'Campeão',
    detalhe: 'Competição de cibersegurança estudantil.',
    tier: 'ouro',
    raridade: 3.2,
  },
  {
    titulo: 'HackFools',
    evento: 'Hackathon — Codelab / IME-USP',
    ano: '2026',
    posicao: 'Campeão',
    detalhe: 'Vitória em projeto de desenvolvimento e prototipagem.',
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
    titulo: 'Bolsista PUB',
    evento: 'USP — grupo SAEG',
    ano: '2026',
    posicao: 'Iniciação Científica',
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
    nome: 'PET-SI',
    papel: 'Bolsista PET',
    data: '2026-08',
    local: 'EACH-USP',
    descricao:
      'Entrada no Programa de Educação Tutorial de Sistemas de Informação, com atuação em pesquisa aplicada, ensino e extensão.',
    tags: ['Ensino', 'Pesquisa'],
    destaque: true,
  },
  {
    nome: 'Iniciação Científica',
    papel: 'Bolsista PUB — grupo SAEG',
    data: '2026-07',
    local: 'EACH-USP',
    descricao:
      'Início da pesquisa em geração de dados para experimentação em teste e depuração de software, com benchmark Java e uso da ferramenta Jaguar 2.',
    tags: ['Java', 'Pesquisa'],
  },
  {
    nome: 'Hackathon de Agentes de IA',
    papel: 'Campeão',
    data: '2026-06',
    local: 'Hype USP',
    descricao: '1º lugar entre cerca de 60 competidores em construção de agentes de IA.',
    tags: ['IA', 'Hackathon'],
    destaque: true,
  },
  {
    nome: 'HackFools',
    papel: 'Campeão',
    data: '2026-05',
    local: 'IME-USP',
    descricao: 'Vitória no hackathon do Codelab no IME-USP.',
    tags: ['Hackathon'],
    destaque: true,
  },
  {
    nome: 'EACH in the Shell',
    papel: 'Campeão',
    data: '2026-04',
    local: 'EACH-USP',
    descricao: 'Vitória no CTF de cibersegurança da faculdade.',
    tags: ['Segurança', 'CTF'],
    destaque: true,
  },
  {
    nome: 'Desafio Quant AI',
    papel: 'Competidor',
    data: '2026-07',
    local: 'Itaú Asset Management',
    descricao: 'Participação no desafio com estratégia long/short de momentum e backtest no IBOV.',
    tags: ['Python', 'Quant'],
  },
  {
    nome: 'Bacharelado em SI',
    papel: 'Ingressante na USP',
    data: '2026',
    local: 'EACH-USP',
    descricao: 'Início do curso de Sistemas de Informação na USP e das primeiras atuações em organizações estudantis.',
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
    handle: 'alexjsz@usp.br',
    url: 'mailto:alexjsz@usp.br',
    descricao: 'Canal principal para contato profissional e acadêmico.',
  },
  {
    rede: 'E-mail alternativo',
    handle: 'benalex511@gmail.com',
    url: 'mailto:benalex511@gmail.com',
    descricao: 'Contato complementar, útil para networking e comunicação direta.',
  },
]
