import type { Review } from '../types'

export const review: Review = {
  slug: 'hollow-knight',
  titulo: 'Hollow Knight',
  plataforma: 'PC',
  nota: 9.5,
  data: '2026-08-14',
  tempoDeJogo: '42 h',
  resumo: 'Um metroidvania que confia no jogador a ponto de quase não explicar nada — e acerta.',
  steamAppId: 367520,
  tags: ['Metroidvania', 'Souls-like', 'Indie'],
  corpo: [
    {
      tipo: 'p',
      texto:
        'Hallownest é construído como um sistema de trancas: quase tudo que parece bloqueado é, na verdade, uma pista de que existe uma habilidade em outro canto do mapa. O jogo nunca avisa isso. Ele deixa você bater na parede até entender sozinho.',
    },
    { tipo: 'h', texto: 'O que funciona' },
    {
      tipo: 'lista',
      itens: [
        'Mapa desenhado à mão que exige um NPC e um item para ser preenchido — navegação vira progressão.',
        'Combate com poucas ferramentas e muita variação de leitura de inimigo.',
        'Silêncio narrativo: a história está no cenário, não em cutscene.',
      ],
    },
    { tipo: 'h', texto: 'O que incomoda' },
    {
      tipo: 'p',
      texto:
        'A penalidade de morte no começo é dura o suficiente para afastar quem está aprendendo, e algumas áreas tardias esticam o backtracking mais do que precisavam.',
    },
    {
      tipo: 'citacao',
      texto: 'É o tipo de jogo que fica melhor em retrospecto do que na primeira hora.',
    },
  ],
}
