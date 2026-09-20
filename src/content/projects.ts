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
    resumo: 'Dashboard acadêmico completo para o curso de Sistemas de Informação da USP.',
    descricao:
      'Arquitetei um dashboard acadêmico com autenticação, módulo social, PostgreSQL e Docker, com API REST em Python e frontend em TypeScript. Usado por mais de 700 alunos de Sistemas de Informação.',
    periodo: 'Mar 2026 — Atual',
    status: 'em produção',
    stack: ['Python', 'TypeScript', 'PostgreSQL', 'Docker', 'API REST'],
    destaque: '700+ alunos',
    emoji: '🎓',
    links: [
      { rotulo: 'Repositório', url: 'https://github.com/alexzjss/dasiboard-omg' },
      { rotulo: 'dasiboard.online', url: 'https://dasiboard.online' },
    ],
    numeros: [
      { valor: '700+', rotulo: 'alunos do curso atendidos' },
      { valor: '4', rotulo: 'serviços em Docker' },
      { valor: '2026', rotulo: 'em produção desde' },
    ],
    papel: [
      'Arquitetura da aplicação, do banco ao frontend',
      'API REST em Python com autenticação e módulo social',
      'Modelagem e manutenção do PostgreSQL',
      'Empacotamento e deploy com Docker',
    ],
    detalhes: [
      {
        titulo: 'O problema',
        texto:
          'As informações do curso de Sistemas de Informação ficavam espalhadas entre grupos de mensagem, planilhas e avisos soltos. Nada era pesquisável e quase nada sobrevivia ao fim do semestre.',
      },
      {
        titulo: 'A solução',
        texto:
          'Um workspace único com autenticação, materiais organizados por disciplina e um módulo social para o que antes vivia nos grupos. O backend em Python expõe uma API REST consumida por um frontend em TypeScript, com PostgreSQL por trás e tudo rodando em Docker.',
      },
      {
        titulo: 'O que eu aprendi',
        texto:
          'Colocar software na mão de gente de verdade muda as prioridades: performance de query e recuperação de erro passaram a importar mais do que qualquer refinamento de interface.',
      },
    ],
    tipo: 'profissional',
  },
  {
    slug: 'modaloop',
    nome: 'ModaLoop',
    resumo: 'Aplicação web de sustentabilidade têxtil com geolocalização em tempo real.',
    descricao:
      'Idealizei e desenvolvi, em equipe, uma aplicação web de sustentabilidade têxtil em React/TypeScript, com geolocalização em tempo real usando a Geolocation API e a fórmula de Haversine. Deploy via GitHub Pages.',
    periodo: 'Mai 2026 — Jul 2026',
    status: 'concluído',
    stack: ['React', 'TypeScript', 'Geolocation API', 'GitHub Pages'],
    destaque: 'Haversine em tempo real',
    emoji: '♻️',
    links: [{ rotulo: 'Repositório', url: 'https://github.com/alexzjss/modaloop' }],
    numeros: [
      { valor: '3 meses', rotulo: 'da ideia ao deploy' },
      { valor: 'Haversine', rotulo: 'cálculo de distância' },
    ],
    papel: [
      'Idealização do produto junto com a equipe',
      'Frontend em React com TypeScript',
      'Geolocalização em tempo real com a Geolocation API',
      'Deploy contínuo no GitHub Pages',
    ],
    detalhes: [
      {
        titulo: 'A ideia',
        texto:
          'Aproximar quem quer desapegar de roupa de quem procura peça de segunda mão por perto, reduzindo descarte têxtil sem depender de logística de entrega.',
      },
      {
        titulo: 'A parte técnica',
        texto:
          'A posição do usuário vem da Geolocation API do navegador e a distância até cada peça é calculada com a fórmula de Haversine, direto no cliente — sem servidor de mapas e sem custo de API.',
      },
      {
        titulo: 'Encerramento',
        texto:
          'O projeto foi concluído em julho de 2026, com o código aberto no GitHub para quem quiser continuar.',
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
    nome: 'TrendSurfer Bot',
    resumo: 'Estratégia quantitativa long/short de momentum no IBOV.',
    descricao:
      'Construído para o Desafio Quant AI da Itaú Asset Management: pipeline de dados de mercado, sinal de momentum, construção de carteira long/short e backtest com métricas de risco.',
    periodo: '2026',
    status: 'concluído',
    stack: ['Python', 'pandas', 'NumPy', 'Backtesting'],
    destaque: 'Desafio Quant AI — Itaú Asset',
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
