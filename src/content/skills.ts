import type { Certification, SkillGroup } from './types'

export const skills: SkillGroup[] = [
  {
    grupo: 'Linguagens',
    itens: ['Python', 'JavaScript', 'Java', 'C', 'SQL'],
  },
  {
    grupo: 'Dados e IA',
    nota: 'Onde quero concentrar a carreira',
    itens: [
      'Ciência de Dados',
      'Machine Learning',
      'Análise e Modelagem de Dados',
      'IA Generativa',
      'PostgreSQL',
      'MySQL',
    ],
  },
  {
    grupo: 'Backend e infraestrutura',
    itens: ['Docker', 'Git/GitHub', 'Linux', 'CI/CD', 'Model Context Protocol (MCP)', 'API REST'],
  },
  {
    grupo: 'Interpessoais',
    itens: [
      'Liderança de equipes',
      'Trabalho em equipe',
      'Inovação',
      'Comunicação',
      'Pensamento analítico',
      'Gestão de projetos',
      'Negociação',
      'Adaptabilidade',
    ],
  },
]

export const certificacoes: Certification[] = [
  { nome: 'Claude Code 101 e Claude 101', emissor: 'Anthropic', ano: '2026' },
  { nome: 'Introduction to Model Context Protocol (MCP)', emissor: 'Anthropic', ano: '2026' },
  { nome: 'AWS Educate: Introduction to Generative AI', emissor: 'AWS', ano: '2026' },
  { nome: 'Introdução ao Machine Learning', emissor: 'Hype USP', ano: '2026' },
]
