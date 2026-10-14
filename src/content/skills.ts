import type { Certification, SkillGroup } from './types'

export const skills: SkillGroup[] = [
  {
    grupo: 'Linguagens',
    itens: ['Python', 'Java', 'TypeScript', 'JavaScript', 'SQL', 'C'],
  },
  {
    grupo: 'Dados e IA',
    nota: 'Onde quero concentrar a carreira',
    itens: [
      'Data Analysis',
      'Data Science',
      'Machine Learning',
      'IA Generativa',
      'PostgreSQL',
      'MySQL',
      'Matplotlib',
    ],
  },
  {
    grupo: 'Backend e infraestrutura',
    itens: ['FastAPI', 'Node.js', 'REST APIs', 'React', 'Docker', 'Git/GitHub', 'Linux/Unix', 'Apache Maven'],
  },
  {
    grupo: 'Engenharia e trabalho em equipe',
    itens: [
      'Teste e depuração de software',
      'Cobertura de código',
      'Metodologias ágeis',
      'Liderança de equipes',
      'Gestão de projetos',
      'Comunicação',
      'Negociação',
      'Adaptabilidade',
    ],
  },
]

export const certificacoes: Certification[] = [
  { nome: 'Claude 101 e Claude Code 101', emissor: 'Anthropic', ano: '2026' },
  { nome: 'Introduction to Model Context Protocol (MCP)', emissor: 'Anthropic', ano: '2026' },
  { nome: 'AWS Educate — Introduction to Generative AI', emissor: 'AWS', ano: '2026' },
  { nome: 'Introdução ao Machine Learning', emissor: 'Hype USP', ano: '2026' },
  { nome: 'Introdução ao Linux', emissor: 'USP / Hype USP', ano: '2026' },
  { nome: 'Ciência de Dados e Machine Learning', emissor: 'Hype USP', ano: '2026' },
  { nome: 'Conceitos de Gamedev', emissor: 'Conway USP', ano: '2026' },
]
