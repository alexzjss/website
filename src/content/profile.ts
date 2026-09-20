import type { Metrica, Profile } from './types'

export const profile: Profile = {
  nome: 'Alex de Jesus Santana',
  apelido: 'Alex',
  titulo: 'Dados, Inteligência Artificial e Engenharia de Software',
  subtitulo: 'Sistemas de Informação — USP',
  manchete: 'Construo software que sai do papel e chega em produção.',
  resumo: [
    'Estudante de Sistemas de Informação na USP atuando em Ciência de Dados, Inteligência Artificial e Engenharia de Software com Python, Java, JavaScript e SQL.',
    'Coordeno projetos multidisciplinares em cinco organizações estudantis e pesquiso teste e depuração de software no grupo SAEG. Procuro estágio em Tecnologia da Informação com foco em Dados e IA e desenvolvimento de software.',
  ],
  local: 'São Paulo, SP — Brasil',
  email: 'alexzjss@gmail.com',
  telefone: '+55 (11) 92220-9858',
  foto: './images/alex.jpg',
  avatar: './images/alex-avatar.jpg',
  cv: './curriculo.pdf',
  linkedin: 'https://www.linkedin.com/in/alex-jsz/',
  github: 'https://github.com/alexzjss',
  links: [
    { rotulo: 'LinkedIn', url: 'https://www.linkedin.com/in/alex-jsz/' },
    { rotulo: 'GitHub', url: 'https://github.com/alexzjss' },
    { rotulo: 'E-mail', url: 'mailto:alexzjss@gmail.com' },
  ],
}

/** Números que aparecem logo abaixo da dobra, no lado profissional. */
export const metricas: Metrica[] = [
  { valor: '700+', rotulo: 'alunos atendidos pelo DaSIboard' },
  { valor: '4', rotulo: 'primeiros lugares em competições' },
  { valor: '5', rotulo: 'organizações estudantis' },
  { valor: '1', rotulo: 'bolsa de iniciação científica' },
]
