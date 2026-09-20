import type { Review } from '../types'

export const review: Review = {
  slug: 'hades',
  titulo: 'Hades',
  plataforma: 'PC',
  nota: 9.2,
  data: '2026-09-05',
  tempoDeJogo: '61 h',
  steamAppId: 1145360,
  resumo: 'O roguelite que resolveu o maior problema do gênero: morrer virou parte da história.',
  tags: ['Roguelite', 'Ação', 'Mitologia'],
  corpo: [
    {
      tipo: 'p',
      texto:
        'Cada tentativa fracassada devolve você para a mesma sala, e é justamente ali que o jogo avança. Personagens comentam a última corrida, relações mudam de tom e o progresso narrativo fica amarrado à repetição em vez de brigar com ela.',
    },
    { tipo: 'h', texto: 'O que me prendeu' },
    {
      tipo: 'lista',
      itens: [
        'Bênçãos dos deuses como construção de build: as corridas raramente se repetem.',
        'Diálogo escrito em volume absurdo, sem soar reciclado.',
        'Medida de dificuldade ajustável pelo Pacto do Castigo, sem tirar o mérito.',
      ],
    },
    { tipo: 'h', texto: 'O que pesa' },
    {
      tipo: 'p',
      texto:
        'Depois de vencer algumas vezes, a curva de recursos fica lenta e o grind aparece com mais clareza do que gostaria.',
    },
    { tipo: 'citacao', texto: 'Morrer 40 vezes nunca foi tão bem justificado por um roteiro.' },
  ],
}
