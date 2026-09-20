/**
 * Tipos de todo o conteúdo do site.
 * Edite os arquivos de dados em src/content/ — nenhum componente precisa ser tocado.
 */

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
  /** versão quadrada, usada no cartão do LinkedIn e no favicon de toque */
  avatar: string
  cv: string
  linkedin: string
  github: string
  links: { rotulo: string; url: string }[]
}

export type Metrica = {
  valor: string
  rotulo: string
}

export type SkillGroup = {
  grupo: string
  nota?: string
  itens: string[]
}

export type Experience = {
  cargo: string
  organizacao: string
  inicio: string
  fim: string
  local?: string
  descricao: string
  tags?: string[]
}

export type Education = {
  curso: string
  instituicao: string
  periodo: string
  detalhes?: string[]
}

export type Certification = {
  nome: string
  emissor: string
  ano: string
}

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
  /** etiqueta curta no card (ex.: 'Iniciação científica') */
  selo?: string
  /** blocos da página de detalhe (/pro/projetos/<slug>) */
  detalhes?: { titulo: string; texto: string }[]
  /** números destacados na página de detalhe */
  numeros?: { valor: string; rotulo: string }[]
  /** o que eu fiz, em tópicos, na página de detalhe */
  papel?: string[]
  /** imagem opcional de capa do projeto (ex.: './images/projetos/x.jpg') */
  capa?: string
  links?: { rotulo: string; url: string }[]
  /** 'profissional' aparece no dossiê; 'pessoal' aparece no arcade */
  tipo: 'profissional' | 'pessoal'
}

export type Award = {
  titulo: string
  evento: string
  ano: string
  posicao: string
  detalhe?: string
  /** estilo PlayStation */
  tier: 'platina' | 'ouro' | 'prata' | 'bronze'
  /** 0 a 100 — porcentagem de jogadores que conseguiram, na tela de troféus */
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

export type Social = {
  rede: string
  handle: string
  url: string
  descricao: string
}

export type Review = {
  slug: string
  titulo: string
  plataforma: string
  nota: number // 0 a 10
  data: string // AAAA-MM-DD
  tempoDeJogo?: string
  resumo: string
  tags: string[]
  /** id do jogo na Steam — a capa vem automaticamente, sem chave de API */
  steamAppId?: number
  /** URL ou caminho local de capa; tem prioridade sobre o steamAppId */
  capa?: string
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
