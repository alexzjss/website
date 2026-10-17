export type Copy = { 'pt-BR': string; en: string }
export type Category = 'software' | 'research' | 'creative'
export type Project = { name: string; description: Copy; categories: Category[]; stack: string[]; url: string }
export type Entry = { id: string; name: string; role: Copy; period: Copy; summary: Copy; details: Copy }
export const c = (pt: string, en: string): Copy => ({ 'pt-BR': pt, en })
export const tx = (value: Copy, lang: 'pt-BR' | 'en') => value[lang]

// Confirm dates, roles, and activities against a first-party career source before replacing these placeholders.
export const highlights: Entry[] = [
  { id: 'sintese', name: 'Síntese Jr.', role: c('Experiência — função a confirmar', 'Experience — role to be confirmed'), period: c('Período a confirmar', 'Dates to be confirmed'), summary: c('Participação indicada no briefing; detalhes ainda sem fonte documental disponível.', 'Participation named in the brief; details are not yet supported by an available source.'), details: c('Adicione cargo, datas e atividades após confirmar essas informações em um currículo ou fonte institucional.', 'Add role, dates, and activities after confirming them against a résumé or institutional source.') },
  { id: 'pet', name: 'PET-SI', role: c('Experiência — função a confirmar', 'Experience — role to be confirmed'), period: c('Período a confirmar', 'Dates to be confirmed'), summary: c('Participação indicada no briefing; detalhes ainda sem fonte documental disponível.', 'Participation named in the brief; details are not yet supported by an available source.'), details: c('Adicione cargo, datas e atividades após confirmar essas informações em um currículo ou fonte institucional.', 'Add role, dates, and activities after confirming them against a résumé or institutional source.') },
  { id: 'claude', name: 'Claude Campus Ambassador', role: c('Experiência — função a confirmar', 'Experience — role to be confirmed'), period: c('Período a confirmar', 'Dates to be confirmed'), summary: c('Participação indicada no briefing; detalhes ainda sem fonte documental disponível.', 'Participation named in the brief; details are not yet supported by an available source.'), details: c('Adicione cargo, datas e atividades após confirmar essas informações em um currículo ou fonte institucional.', 'Add role, dates, and activities after confirming them against a résumé or institutional source.') },
]

const organizationNames = [
  ['dasi', 'DASI'], ['hype', 'Hype'], ['codelab', 'USPCodeLab Leste'], ['conway', 'Conway USP'], ['eits', 'Each In The Shell'], ['semana', 'Semana de SI'],
] as const
export const organizations: Entry[] = organizationNames.map(([id, name]) => ({ id, name, role: c('Participação — função a confirmar', 'Involvement — role to be confirmed'), period: c('Período a confirmar', 'Dates to be confirmed'), summary: c('Organização universitária citada no briefing; descrição específica pendente de confirmação.', 'University organization named in the brief; specific details are pending confirmation.'), details: c('Inclua cargo, período, atividades e links após validação.', 'Add role, dates, activities, and links after verification.') }))

export const projects: Project[] = [
  { name: 'DaSIboard', description: c('Plataforma apresentada no perfil público como um espaço para estudantes de Sistemas de Informação, com tarefas, notas, frequência, calendário e recursos colaborativos.', 'A platform described on the public profile as a space for Information Systems students, with tasks, grades, attendance, a calendar, and collaborative features.'), categories: ['software'], stack: ['TypeScript'], url: 'https://github.com/alexzjss/dasiboard-omg' },
  { name: 'ModaLoop', description: c('Aplicação web para encontrar pontos de coleta de roupas e apoiar o descarte têxtil responsável. O README documenta dados estáticos e uso opcional de geolocalização no navegador.', 'A web app for finding clothing collection points and supporting responsible textile disposal. Its README documents static data and optional browser geolocation.'), categories: ['software'], stack: ['React', 'TypeScript', 'Vite'], url: 'https://github.com/alexzjss/modaloop' },
]
