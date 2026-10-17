export type Profile = {
  nome: string
  apelido: string
  titulo: string
  subtitulo: string
  manchete: string
  resumo: string[]
  local: string
  email: string
  telefone: string
  foto: string
  avatar: string
  cv: string
  linkedin: string
  github: string
  links: { rotulo: string; url: string }[]
}

export type Metrica = { valor: string; rotulo: string }

export type SkillGroup = { grupo: string; nota?: string; itens: string[] }

export type Experience = {
  cargo: string
  organizacao: string
  inicio: string
  fim: string
  local?: string
  descricao: string
  tags?: string[]
}

export type Education = { curso: string; instituicao: string; periodo: string; detalhes?: string[] }
export type Certification = { nome: string; emissor: string; ano: string }

export type Project = {
  slug: string
  nome: string
  resumo: string
  descricao: string
  periodo: string
  status: 'em produção' | 'ativo' | 'concluído' | 'em desenvolvimento' | 'arquivado'
  stack: string[]
  destaque?: string
  emoji?: string
  selo?: string
  detalhes?: { titulo: string; texto: string }[]
  numeros?: { valor: string; rotulo: string }[]
  papel?: string[]
  capa?: string
  links?: { rotulo: string; url: string }[]
  tipo: 'profissional' | 'pessoal'
}

export type Award = {
  titulo: string
  evento: string
  ano: string
  posicao: string
  detalhe?: string
  tier: 'platina' | 'ouro' | 'prata' | 'bronze'
  raridade: number
}

export type EventItem = {
  nome: string
  papel: string
  data: string
  local?: string
  descricao: string
  tags?: string[]
  destaque?: boolean
}

export type Social = { rede: string; handle: string; url: string; descricao: string }

export type Review = {
  slug: string
  titulo: string
  plataforma: string
  nota: number
  data: string
  tempoDeJogo?: string
  resumo: string
  tags: string[]
  steamAppId?: number
  capa?: string
  origemUrl?: string
  corpo: ReviewBlock[]
}

export type ReviewBlock =
  | { tipo: 'p'; texto: string }
  | { tipo: 'h'; texto: string }
  | { tipo: 'lista'; itens: string[] }
  | { tipo: 'citacao'; texto: string }

export type ArcadePath = {
  id: string
  rotulo: string
  descricao: string
  icone: string
  cor: 'magenta' | 'ciano' | 'ambar' | 'verde' | 'roxo'
}
