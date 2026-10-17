import type { Project } from './types'

/**
 * tipo: 'profissional' -> aparece no dossiê (/pro)
 * tipo: 'pessoal'      -> aparece na grade de projetos do arcade
 * Para mostrar o mesmo projeto nos dois lados, duplique o item com outro slug e tipo.
 */
export const projetos: Project[] = [
  {
    slug: 'dasiboard',
    nome: 'DaSIboard',
    resumo: 'Dashboard acadêmico voltado para o curso de Sistemas de Informação da USP.',
    descricao:
      'Plataforma acadêmica criada por Alex para apoiar alunos de SI com tarefas, notas, frequência, calendário de eventos, salas de estudo colaborativas, perfil com conquistas e fluxograma curricular. O projeto foi pensado para um público-alvo de ~700 alunos do curso.',
    periodo: 'Mar 2026 — Atual',
    status: 'em produção',
    stack: ['TypeScript', 'Python', 'PostgreSQL', 'Docker'],
    destaque: '~700 alunos',
    emoji: '🎓',
    links: [
      { rotulo: 'Repositório', url: 'https://github.com/alexzjss/dasiboard-omg' },
      { rotulo: 'dasiboard.online', url: 'https://dasiboard.online' },
    ],
    numeros: [
      { valor: '~700', rotulo: 'alunos de SI no público-alvo' },
      { valor: '4', rotulo: 'módulos principais da plataforma' },
      { valor: '2026', rotulo: 'lançamento inicial' },
    ],
    papel: [
      'Concepção e arquitetura da plataforma',
      'Definição da experiência de uso para comunidade acadêmica',
      'Estrutura de backend, banco de dados e infraestrutura',
      'Acompanhamento de entrega com foco em uso real da comunidade',
    ],
    detalhes: [
      {
        titulo: 'O problema',
        texto:
          'A comunicação e a organização acadêmica do curso estavam fragmentadas entre grupos, planilhas e canais informais. A informação era dispersa e pouco acessível para a rotina de alunos e professores.',
      },
      {
        titulo: 'A solução',
        texto:
          'Criei uma plataforma centralizada para tarefas, calendário, frequência, salas de estudo, perfil de conquistas e fluxograma curricular, com uma stack em TypeScript, Python, PostgreSQL e Docker. O foco era simplificar a rotina e melhorar a experiência do curso.',
      },
      {
        titulo: 'Aprendizados',
        texto:
          'O projeto reforçou a importância de pensar em produto e uso real desde o início: organização, clareza de informação e manutenção técnica importam tanto quanto a interface.',
      },
    ],
    tipo: 'profissional',
  },
  {
    slug: 'modaloop',
    nome: 'ModaLoop',
    resumo: 'Aplicação web de descarte têxtil consciente, com indicação de pontos de coleta próximos.',
    descricao:
      'Aplicação web de sustentabilidade têxtil em React/TypeScript, com geolocalização em tempo real usando a Geolocation API e cálculo de distância por Haversine. O projeto conecta usuários a pontos de coleta de roupas usadas e informa sobre o impacto ambiental.',
    periodo: 'Mai 2026 — Jul 2026',
    status: 'concluído',
    stack: ['React', 'TypeScript', 'Geolocation API', 'GitHub Pages'],
    destaque: 'Geolocalização em tempo real',
    emoji: '♻️',
    links: [{ rotulo: 'Repositório', url: 'https://github.com/alexzjss/modaloop' }],
    numeros: [
      { valor: '3 meses', rotulo: 'da ideia ao deploy' },
      { valor: 'Haversine', rotulo: 'cálculo de distância' },
    ],
    papel: [
      'Idealização do produto junto com a equipe',
      'Desenvolvimento do frontend em React/TypeScript',
      'Implementação de geolocalização com Geolocation API',
      'Deploy no GitHub Pages',
    ],
    detalhes: [
      {
        titulo: 'A ideia',
        texto:
          'Aproximar quem deseja doar ou descartar roupas usadas de quem busca pontos de coleta próximos, contribuindo para reduzir o descarte têxtil sem depender de logística de entrega.',
      },
      {
        titulo: 'A parte técnica',
        texto:
          'A localização do usuário vem da Geolocation API do navegador, e a distância até cada ponto é calculada diretamente no cliente com a fórmula de Haversine.',
      },
      {
        titulo: 'Encerramento',
        texto:
          'O projeto foi concluído em julho de 2026 e publicado no GitHub para continuidade e referências futuras.',
      },
    ],
    tipo: 'profissional',
  },
  {
    slug: 'benchmarks-java',
    nome: 'Seleção de benchmarks Java',
    resumo: 'Comparação sistemática de 11 benchmarks de defeitos para teste e depuração.',
    descricao:
      'Estudo de IC comparando Defects4J, Bugs.jar, GitBug-Java, Bears, BugSwarm e outros benchmarks de defeitos Java para uso com a ferramenta Jaguar 2 do grupo SAEG. Bugs.jar foi selecionado como benchmark primário: 1.158 defeitos, 8 projetos Apache, 100% em Maven.',
    periodo: 'Jul 2026 — Atual',
    status: 'ativo',
    stack: ['Java', 'Maven', 'Defects4J', 'Bugs.jar'],
    destaque: '11 benchmarks avaliados',
    emoji: '🔬',
    selo: 'Iniciação científica · bolsa PUB',
    numeros: [
      { valor: '11', rotulo: 'benchmarks comparados' },
      { valor: '1.158', rotulo: 'defeitos no benchmark escolhido' },
      { valor: '8', rotulo: 'projetos Apache cobertos' },
    ],
    papel: [
      'Levantamento e leitura da literatura de benchmarks de defeitos Java',
      'Critérios de comparação: reprodutibilidade, build, cobertura e manutenção',
      'Execução e validação dos candidatos com a ferramenta Jaguar 2',
      'Escrita do relatório de seleção para o grupo SAEG',
    ],
    detalhes: [
      {
        titulo: 'A pergunta',
        texto:
          'Para avaliar uma ferramenta de localização de defeitos, é preciso um conjunto de bugs reais, reproduzíveis e bem documentados. A questão era qual benchmark serve melhor à ferramenta Jaguar 2 hoje — e por quê.',
      },
      {
        titulo: 'O método',
        texto:
          'Comparei Defects4J, Bugs.jar, GitBug-Java, Bears, BugSwarm, growingBugs, Defexts, QuixBugs, ManySStuBs4J, Vul4J e JETO-Bench segundo reprodutibilidade, sistema de build, tamanho e manutenção ativa.',
      },
      {
        titulo: 'O resultado',
        texto:
          'Bugs.jar foi escolhido como benchmark primário: 1.158 defeitos, 8 projetos Apache e 100% em Maven, o que simplifica a automação. Bears entra como secundário condicional. Pesquisa orientada pelo Prof. Dr. Marcos Lordello Chaim, no grupo SAEG da EACH-USP.',
      },
    ],
    tipo: 'profissional',
  },

  /* ---------- projetos pessoais (arcade) ---------- */
  {
    slug: 'aethervtt',
    nome: 'AetherVTT',
    resumo: 'Mesa virtual de RPG tático baseado em cartas, para desktop.',
    descricao:
      'Aplicação desktop com sistema elemental Vínculo, pilha de combate LIFO, Fog of War, IPC multi-janela e editores CRUD completos. Renderização em Canvas 2D e estado em Zustand.',
    periodo: '2026',
    status: 'em desenvolvimento',
    stack: ['Tauri', 'React', 'TypeScript', 'Zustand', 'Canvas 2D'],
    destaque: 'Sistema de RPG autoral',
    emoji: '🎲',
    tipo: 'pessoal',
  },
  {
    slug: 'trendsurfer',
    nome: 'Vórtex — Desafio Quant AI',
    resumo: 'Robô quantitativo long/short de momentum sobre o universo point-in-time do IBOV.',
    descricao:
      'Estratégia desenvolvida em equipe para o Desafio Quant AI da Itaú Asset Management, com engenharia de features, backtest em 252 pregões entre 03/02/2025 e 03/11/2025 e avaliação de risco. Resultado líquido: +6,26% contra +19,44% do IBOV, Sharpe de 0,37 e MDD de -22,35%, com ganho concentrado no lado long. O backtest de 2019–2023 foi descartado por falta de dados históricos viáveis.',
    periodo: 'Jul 2026 — Ago 2026',
    status: 'concluído',
    stack: ['Python', 'pandas', 'NumPy', 'Backtesting'],
    destaque: 'Backtest 252 pregões',
    emoji: '📈',
    tipo: 'pessoal',
  },
  {
    slug: 'agente-ia',
    nome: 'Agente de IA vencedor',
    resumo: 'O agente que ganhou o hackathon da Hype USP.',
    descricao:
      'Agente de IA construído durante o Hackathon de Construção de Agentes de IA da Hype USP, que terminou em 1º lugar entre cerca de 60 competidores.',
    periodo: '2026',
    status: 'concluído',
    stack: ['Python', 'LLMs', 'Tool use', 'MCP'],
    destaque: '1º lugar entre ~60',
    emoji: '🤖',
    tipo: 'pessoal',
  },
  {
    slug: 'github-dossie',
    nome: 'Perfil GitHub em SVG',
    resumo: 'README de perfil gerado como painéis SVG com tema automático.',
    descricao:
      'Script em Python que gera mais de 26 painéis SVG com estética de dossiê/terminal, seções numeradas, mapa de ecossistema e troca automática entre tema claro e escuro.',
    periodo: '2026',
    status: 'ativo',
    stack: ['Python', 'SVG', 'GitHub API'],
    emoji: '🖥️',
    links: [{ rotulo: 'github.com/alexzjss', url: 'https://github.com/alexzjss' }],
    tipo: 'pessoal',
  },
  {
    slug: 'terminal-pokefetch',
    nome: 'Terminal com pokefetch',
    resumo: 'Terminal do CachyOS com sprite aleatório de Pokémon e paleta dinâmica.',
    descricao:
      'Integração de fastfetch com pokeget-rs no fish shell: sorteia um sprite de Pokémon a cada abertura e extrai a paleta de cores dos próprios códigos ANSI do sprite.',
    periodo: '2026',
    status: 'ativo',
    stack: ['Arch/CachyOS', 'fish', 'fastfetch', 'Shell'],
    emoji: '🐧',
    tipo: 'pessoal',
  },
  {
    slug: 'jogos-zerados',
    nome: 'Jogos Zerados pelo Alex',
    resumo: 'Tracker pessoal de jogos finalizados desde 2022.',
    descricao:
      'Planilha-dashboard com validação por dropdown, formatação condicional, caixas de estatística e zebra striping, registrando tudo que zerei desde 2022. É a fonte das reviews deste arcade.',
    periodo: 'desde 2022',
    status: 'ativo',
    stack: ['Planilhas', 'Dashboards'],
    emoji: '🏁',
    tipo: 'pessoal',
  },
]

export const projetosPro = projetos.filter((p) => p.tipo === 'profissional')
export const projetosPessoais = projetos.filter((p) => p.tipo === 'pessoal')

export function getProjeto(slug: string) {
  return projetos.find((p) => p.slug === slug)
}
