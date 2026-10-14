import type { Metrica, Profile } from './types'

export const profile: Profile = {
  nome: 'Alex de Jesus Santana',
  apelido: 'Alex',
  titulo: 'Software & Data Engineer | Information Systems @ USP',
  subtitulo: 'Sistemas de Informação — USP',
  manchete: 'Construo software, dados e IA com impacto prático.',
  resumo: [
    'Estudante de Sistemas de Informação na USP com atuação em engenharia de software, dados e IA, com foco em Python, Java, SQL, React e análise de dados.',
    'Tenho vivência em desenvolvimento backend/full-stack, pesquisa aplicada em teste de software, coordenação de projetos acadêmicos e desafios em machine learning e IA. Busco estágio em Tecnologia da Informação com foco em Dados, IA e Backend/Full-Stack.',
  ],
  local: 'São Paulo, SP — Brasil',
  email: 'alexjsz@usp.br',
  telefone: '+55 (11) 92220-9858',
  foto: './images/alex.jpg',
  avatar: './images/alex-avatar.jpg',
  cv: '/curriculo.pdf',
  linkedin: 'https://www.linkedin.com/in/alex-jsz/',
  github: 'https://github.com/alexzjss',
  links: [
    { rotulo: 'LinkedIn', url: 'https://www.linkedin.com/in/alex-jsz/' },
    { rotulo: 'GitHub', url: 'https://github.com/alexzjss' },
    { rotulo: 'E-mail', url: 'mailto:alexjsz@usp.br' },
  ],
}

/** Números que aparecem logo abaixo da dobra, no lado profissional. */
export const metricas: Metrica[] = [
  { valor: '~700', rotulo: 'alunos de SI no público-alvo do DaSIboard' },
  { valor: '3', rotulo: 'conquistas em hackathons e CTFs' },
  { valor: '8+', rotulo: 'entidades estudantis ativas' },
  { valor: '1', rotulo: 'bolsa de iniciação científica' },
]
