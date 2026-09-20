import type { Review } from '../types'

export const review: Review = {
  slug: 'pokemon-legends-arceus',
  titulo: 'Pokémon Legends: Arceus',
  plataforma: 'Nintendo Switch',
  nota: 8.0,
  data: '2026-06-02',
  tempoDeJogo: '55 h',
  resumo:
    'A primeira vez que capturar um Pokémon virou gameplay de verdade, e não uma tela de menu.',
  capa: '', // jogo fora da Steam: aponte uma imagem sua em public/images/capas/
  tags: ['RPG', 'Mundo aberto', 'Pokémon'],
  corpo: [
    {
      tipo: 'p',
      texto:
        'O loop muda de lugar: o interessante deixou de ser a batalha e passou a ser a aproximação. Agachar no mato, calcular o arremesso e errar por meio metro é mais tenso do que qualquer ginásio da série principal.',
    },
    { tipo: 'h', texto: 'Onde ele tropeça' },
    {
      tipo: 'p',
      texto:
        'Tecnicamente é pobre — pop-in agressivo, texturas datadas e um mundo mais vazio do que gostaria de ser. Nada disso derruba a ideia, mas atrapalha a imersão.',
    },
    {
      tipo: 'lista',
      itens: [
        'Pokédex por tarefas é a melhor mudança de design da franquia em anos.',
        'História com mais ambição do que execução.',
        'Combate por estilos (forte/ágil) é simples e ainda assim tático.',
      ],
    },
  ],
}
