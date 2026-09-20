# Site pessoal — Alex de Jesus Santana

Site de duas faces. A tela inicial divide o navegador ao meio: à esquerda o dossiê
profissional, à direita o arcade. Cada lado tem visual, tipografia e navegação próprios.

Stack: Vite + React 18 + TypeScript + React Router. Sem backend e sem CMS — todo o
conteúdo mora em arquivos TypeScript tipados em `src/content/`.

## Rodando

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # gera dist/
npm run preview  # serve o dist/ localmente
npm run lint     # ESLint
npm run format   # Prettier
```

## O que tem em cada tela

**Landing (`/`)** — dois painéis que reagem ao cursor, grade neon em perspectiva, estrelas
piscando, glitch no título do arcade, costura animada no meio e flash na transição. Setas
escolhem o lado, Enter entra.

**Dossiê (`/pro`)** — barra de progresso de leitura, nav translúcida, manchete que entra
palavra por palavra, foto que reduz conforme você rola, contadores animados, esteira
infinita de tecnologias, linha do tempo com marcadores que pulsam, bloco dedicado ao
currículo em PDF, cartão no formato do LinkedIn e formulário de contato.

**Caso de projeto (`/pro/projetos/:slug`)** — página própria por projeto profissional, com
números destacados, texto em seções (problema, solução, aprendizado), barra lateral com o
que você fez e link para o próximo projeto.

**Arcade (`/arcade`)** — start screen de fliperama, seleção de modo e cinco telas: grade de
projetos pessoais com detalhe em modal, troféus estilo PlayStation, linha do tempo, prateleira
de reviews com capa, filtro por gênero e ordenação, e uma página por review. Trilha 8-bit
opcional no canto superior.

## Onde editar cada coisa

| Arquivo | O que controla |
| --- | --- |
| `src/content/profile.ts` | Nome, manchete, contato, fotos, caminho do currículo e as métricas do topo |
| `src/content/skills.ts` | Competências e certificações |
| `src/content/experience.ts` | Experiências (linha do tempo) e formação |
| `src/content/projects.ts` | Projetos — `tipo`, selo, números e o conteúdo da página de caso |
| `src/content/arcade.ts` | Modos do menu, troféus, linha do tempo de eventos e redes |
| `src/content/reviews/*.ts` | Uma review por arquivo |
| `src/content/types.ts` | Formato de cada tipo de conteúdo |

O TypeScript avisa se faltar um campo obrigatório, então é difícil quebrar o site editando dados.

### Fotos

Já estão em `public/images/`: `alex.jpg` (retrato 4:5 do hero) e `alex-avatar.jpg`
(quadrada, usada no cartão do LinkedIn e no ícone de toque do iOS). Para trocar, substitua
os arquivos mantendo as proporções, ou aponte outros caminhos em `profile.ts`.

### Currículo em PDF

O arquivo servido é `public/curriculo.pdf`, gerado a partir do seu currículo atual. Para
atualizar, substitua o arquivo — ou edite e rode o gerador:

```bash
pip install reportlab
python3 scripts/gerar-curriculo-pdf.py
```

### Formulário de contato

Funciona sem configurar nada: sem chave, ele abre o cliente de e-mail do visitante já
preenchido. Para receber as mensagens direto na caixa de entrada, crie uma conta gratuita
em [web3forms.com](https://web3forms.com), copie `.env.example` para `.env` e preencha:

```
VITE_WEB3FORMS_KEY=sua-chave
```

### Projeto profissional × projeto pessoal, e página de caso

Em `src/content/projects.ts`, cada projeto declara `tipo: 'profissional'` (dossiê) ou
`tipo: 'pessoal'` (grade do arcade). Os campos opcionais `numeros`, `papel` e `detalhes`
alimentam a página `/pro/projetos/<slug>`; sem eles, a página cai no texto de `descricao`.
`selo` é a etiqueta do card (ex.: "Iniciação científica · bolsa PUB").

### Troféus, linha do tempo e reviews

- **Troféus** (`conquistas`, em `arcade.ts`): `tier` define a cor (`platina`, `ouro`,
  `prata`, `bronze`) e `raridade` é a porcentagem mostrada à direita. Nível e barra de
  progresso são calculados a partir dos tiers.
- **Linha do tempo** (`eventos`): use `data` em `AAAA-MM`; a ordenação é automática e
  `destaque: true` deixa o marcador dourado.
- **Reviews**: um arquivo por jogo em `src/content/reviews/`. A listagem lê a pasta sozinha
  (`import.meta.glob`), e o filtro por gênero é montado a partir das `tags`.

**Capas.** `src/lib/capas.ts` monta a URL da CDN pública da Steam a partir do `steamAppId`
(o número na URL da loja: `store.steampowered.com/app/367520/...` → `367520`). Para jogos
fora da Steam, use `capa: './images/capas/jogo.jpg'`. Se a imagem falhar ou não existir,
entra `public/images/capas/generica.jpg`. Quer cobertura total de plataformas? Conta
gratuita na RAWG, chave em `VITE_RAWG_KEY` e troque a função — o comentário no arquivo explica.

### Trilha sonora

É gerada na hora com a Web Audio API (`src/lib/chiptune.ts`) — nenhum arquivo de áudio e
nenhuma licença envolvida. Começa desligada, liga no botão do topo e lembra a escolha
durante a sessão. Para mudar a música, edite os arrays `MELODIA` e `BAIXO`: são semitons
a partir de A4, e `null` é pausa.

### Cores, animações e acessibilidade

Cores em `src/styles/base.css`, no `:root` (primeiro bloco: dossiê; segundo: arcade). As
animações reutilizáveis estão em `src/lib/useAnimacoes.ts`, todas respeitando
`prefers-reduced-motion`. O visual "pixel" do arcade não usa fonte externa: é mono pesada
com tracking e contorno, aplicada pela classe `.pixel`. O modal prende o foco do teclado
(`useFocusTrap`) e todas as páginas têm link "pular para o conteúdo".

## Estrutura

```
src/
  routes/          Landing, Pro, ProjetoPage, Arcade, ArcadeSection, ReviewPage, NaoEncontrado
  components/
    SkipLink.tsx
    pro/           FormularioContato
    arcade/        StartScreen, ProjectGrid, Trophies, Timeline, ReviewGrid, BotaoSom
  lib/             useAnimacoes, capas, chiptune, seo, useFocusTrap, datas
  content/         todos os dados
  styles/          base.css (tokens + landing), pro.css, arcade.css
scripts/           gerador do currículo em PDF
.github/workflows/ CI (build + lint) e deploy no GitHub Pages
```

## Publicando

Build estático com `HashRouter`, então funciona em qualquer hospedagem sem configurar
redirecionamento.

- **GitHub Pages**: a Action `deploy-pages.yml` publica sozinha a cada push na branch
  principal. Só habilite Pages → Source: GitHub Actions nas configurações do repositório.
- **Vercel**: `vercel.json` já vem pronto — é só importar o repositório.
- **Netlify**: `netlify.toml` já vem pronto.

Antes de publicar, troque a URL em três lugares: as meta tags `og:url`/`og:image` em
`index.html`, o `public/sitemap.xml` e o `public/robots.txt`.

Para URLs sem `#`, troque `HashRouter` por `BrowserRouter` em `src/main.tsx` (Vercel e
Netlify já fazem o fallback; no GitHub Pages seria preciso um `404.html`).

## Ideias para depois

- Versão em inglês, duplicando `src/content/` e lendo o idioma da URL.
- Imagens reais nos cards de projeto pessoal (campo `capa` já existe).
- Meta tags Open Graph específicas por rota (hoje são globais).
- Busca por texto nas reviews, quando a lista crescer.
