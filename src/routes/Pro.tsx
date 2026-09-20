import { Link } from 'react-router-dom'
import SkipLink from '../components/SkipLink'
import FormularioContato from '../components/pro/FormularioContato'
import { usePagina } from '../lib/seo'
import { metricas, profile } from '../content/profile'
import { certificacoes, skills } from '../content/skills'
import { experiencias, formacao } from '../content/experience'
import { projetosPro } from '../content/projects'
import { conquistas } from '../content/arcade'
import {
  useContador,
  useProgressoScroll,
  useReveal,
  useRevealGroup,
  useScrollY,
} from '../lib/useAnimacoes'

const secoes = [
  { id: 'sobre', rotulo: 'Sobre' },
  { id: 'curriculo', rotulo: 'Currículo' },
  { id: 'experiencia', rotulo: 'Experiência' },
  { id: 'projetos', rotulo: 'Projetos' },
  { id: 'stack', rotulo: 'Stack' },
  { id: 'reconhecimentos', rotulo: 'Reconhecimentos' },
  { id: 'contato', rotulo: 'Contato' },
]

function Metrica({ valor, rotulo }: { valor: string; rotulo: string }) {
  const { ref, texto } = useContador(valor)
  return (
    <div className="metrica">
      <span className="metrica-valor" ref={ref}>
        {texto}
      </span>
      <span className="metrica-rotulo">{rotulo}</span>
    </div>
  )
}

export default function Pro() {
  usePagina(
    'Dossiê profissional',
    'Currículo, experiência, pesquisa e projetos de Alex de Jesus Santana — Sistemas de Informação na USP.',
  )
  const progresso = useProgressoScroll()
  const y = useScrollY()
  const heroRef = useReveal<HTMLDivElement>()
  const metricasRef = useRevealGroup<HTMLDivElement>()
  const projetosRef = useRevealGroup<HTMLDivElement>()
  const experienciaRef = useRevealGroup<HTMLOListElement>('li')
  const certRef = useRevealGroup<HTMLDivElement>()
  const premiosRef = useRevealGroup<HTMLUListElement>('li')
  const stackRef = useReveal<HTMLDivElement>()
  const cvRef = useReveal<HTMLDivElement>()

  const escala = Math.max(0.86, 1 - y / 2600)
  const opacidadeHero = Math.max(0, 1 - y / 520)

  return (
    <div className="pro">
      <SkipLink />
      <div
        className="pro-progresso"
        style={{ transform: `scaleX(${progresso})` }}
        aria-hidden="true"
      />

      <header className="pro-bar">
        <Link to="/" className="pro-bar-home">
          {profile.apelido}
        </Link>
        <nav className="pro-bar-nav" aria-label="Seções">
          {secoes.map((s) => (
            <a key={s.id} href={`#${s.id}`}>
              {s.rotulo}
            </a>
          ))}
        </nav>
        <Link to="/arcade" className="pro-bar-switch">
          Arcade
        </Link>
      </header>

      <main id="conteudo">
        {/* ---------------- hero ---------------- */}
        <section className="hero" id="sobre">
          <div className="hero-aura" aria-hidden="true" />
          <div className="hero-texto" ref={heroRef} style={{ opacity: opacidadeHero }}>
            <p className="hero-eyebrow">{profile.subtitulo}</p>
            <h1 className="hero-titulo">
              {profile.manchete.split(' ').map((palavra, i) => (
                <span key={i} className="palavra" style={{ '--i': i } as React.CSSProperties}>
                  {palavra}{' '}
                </span>
              ))}
            </h1>
            <p className="hero-sub">{profile.titulo}</p>
            <div className="hero-acoes">
              <a
                className="botao botao-primario"
                href={profile.cv}
                target="_blank"
                rel="noreferrer"
              >
                Baixar currículo em PDF
              </a>
              <a
                className="botao botao-secundario"
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                Ver no LinkedIn
              </a>
            </div>
          </div>

          <div className="hero-foto" style={{ transform: `scale(${escala})` }}>
            <img src={profile.foto} alt={`Retrato de ${profile.nome}`} />
            <div className="hero-foto-nome">
              <strong>{profile.nome}</strong>
              <span>{profile.local}</span>
            </div>
          </div>

          <p className="hero-rolagem" aria-hidden="true">
            role para conhecer
          </p>
        </section>

        {/* ---------------- métricas ---------------- */}
        <section className="faixa-metricas">
          <div className="metricas" ref={metricasRef}>
            {metricas.map((m) => (
              <Metrica key={m.rotulo} valor={m.valor} rotulo={m.rotulo} />
            ))}
          </div>
          <div className="resumo">
            {profile.resumo.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>

        {/* ---------------- currículo + linkedin ---------------- */}
        <section className="secao" id="curriculo">
          <h2 className="secao-titulo">Currículo e LinkedIn</h2>
          <div className="destaque revela" ref={cvRef}>
            <article className="cartao-cv">
              <div className="cartao-cv-topo">
                <span className="selo">PDF · 1 página</span>
                <h3>Currículo completo</h3>
                <p>
                  Formação, sete experiências, projetos, competências técnicas, certificações e
                  prêmios — na versão que vai para processos seletivos.
                </p>
              </div>
              <div className="cartao-cv-acoes">
                <a
                  className="botao botao-primario"
                  href={profile.cv}
                  target="_blank"
                  rel="noreferrer"
                >
                  Abrir currículo
                </a>
                <a className="botao botao-fantasma" href={profile.cv} download>
                  Baixar
                </a>
              </div>
            </article>

            <article className="cartao-linkedin">
              <div className="linkedin-capa" aria-hidden="true" />
              <img className="linkedin-foto" src={profile.avatar} alt="" />
              <h3>{profile.nome}</h3>
              <p className="linkedin-headline">{profile.titulo}</p>
              <p className="linkedin-local">{profile.local}</p>
              <ul className="linkedin-destaques">
                <li>Bolsista de IC no grupo SAEG — teste e depuração de software</li>
                <li>Coordenador de Projetos de TI na DASI USP</li>
                <li>Pesquisador de Dados e IA na Hype USP</li>
              </ul>
              <a
                className="botao botao-linkedin"
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                Conectar no LinkedIn
              </a>
            </article>
          </div>
        </section>

        {/* ---------------- experiência ---------------- */}
        <section className="secao" id="experiencia">
          <h2 className="secao-titulo">Experiência</h2>
          <ol className="linha-tempo" ref={experienciaRef}>
            {experiencias.map((e) => (
              <li key={`${e.organizacao}-${e.cargo}`}>
                <span className="ponto" aria-hidden="true" />
                <div className="linha-periodo">
                  {e.inicio} — {e.fim}
                </div>
                <div className="linha-corpo">
                  <h3>{e.cargo}</h3>
                  <p className="linha-org">
                    {e.organizacao}
                    {e.local ? ` · ${e.local}` : ''}
                  </p>
                  <p>{e.descricao}</p>
                  {e.tags?.length ? (
                    <p className="tags">
                      {e.tags.map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </p>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>

          <div className="formacao">
            {formacao.map((f) => (
              <div key={f.curso}>
                <h3>{f.curso}</h3>
                <p className="linha-org">{f.instituicao}</p>
                <p className="formacao-periodo">{f.periodo}</p>
                {f.detalhes?.map((d, i) => (
                  <p key={i} className="formacao-detalhe">
                    {d}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* ---------------- projetos ---------------- */}
        <section className="secao" id="projetos">
          <h2 className="secao-titulo">Projetos</h2>
          <div className="grade-projetos" ref={projetosRef}>
            {projetosPro.map((p) => (
              <article key={p.slug} className="projeto">
                <header>
                  <span className="projeto-emoji" aria-hidden="true">
                    {p.emoji}
                  </span>
                  <span className="projeto-periodo">{p.periodo}</span>
                </header>
                {p.selo ? <p className="projeto-selo">{p.selo}</p> : null}
                <h3>
                  <Link to={`/pro/projetos/${p.slug}`}>{p.nome}</Link>
                </h3>
                <p className="projeto-resumo">{p.resumo}</p>
                <p className="projeto-descricao">{p.descricao}</p>
                {p.destaque ? <p className="projeto-destaque">{p.destaque}</p> : null}
                <p className="tags">
                  {p.stack.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </p>
                <p className="projeto-links">
                  <Link to={`/pro/projetos/${p.slug}`} className="projeto-ver">
                    Ver o caso completo
                  </Link>
                  {p.links?.map((l) => (
                    <a key={l.url} href={l.url} target="_blank" rel="noreferrer">
                      {l.rotulo}
                    </a>
                  ))}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* ---------------- stack ---------------- */}
        <section className="secao" id="stack">
          <h2 className="secao-titulo">Competências</h2>
          <div className="esteira" aria-hidden="true">
            <div className="esteira-linha">
              {[...skills[0].itens, ...skills[2].itens, ...skills[0].itens, ...skills[2].itens].map(
                (t, i) => (
                  <span key={i}>{t}</span>
                ),
              )}
            </div>
          </div>
          <div className="grade-skills revela" ref={stackRef}>
            {skills.map((g) => (
              <div key={g.grupo} className="skill-grupo">
                <h3>{g.grupo}</h3>
                {g.nota ? <p className="skill-nota">{g.nota}</p> : null}
                <ul>
                  {g.itens.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ---------------- prêmios e certificações ---------------- */}
        <section className="secao" id="reconhecimentos">
          <h2 className="secao-titulo">Prêmios e certificações</h2>
          <ul className="premios" ref={premiosRef}>
            {conquistas.map((c) => (
              <li key={c.titulo}>
                <span className="premio-posicao">{c.posicao}</span>
                <div>
                  <h3>{c.titulo}</h3>
                  <p>
                    {c.evento} · {c.ano}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="certificacoes" ref={certRef}>
            {certificacoes.map((c) => (
              <div key={c.nome} className="certificacao">
                <h3>{c.nome}</h3>
                <p>
                  {c.emissor} · {c.ano}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ---------------- contato ---------------- */}
        <section className="secao contato" id="contato">
          <h2 className="contato-titulo">Vamos conversar</h2>
          <p className="contato-texto">
            Procuro estágio em Tecnologia da Informação com foco em Dados e IA e desenvolvimento de
            software. Se fizer sentido, é só chamar.
          </p>
          <FormularioContato />

          <p className="contato-meta">
            {profile.telefone} · {profile.local}
          </p>
          <div className="hero-acoes">
            <a
              className="botao botao-primario"
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            <a
              className="botao botao-secundario"
              href={profile.github}
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <a className="botao botao-fantasma" href={profile.cv} target="_blank" rel="noreferrer">
              Currículo
            </a>
          </div>
        </section>
      </main>

      <footer className="pro-rodape">
        <span>
          © {new Date().getFullYear()} {profile.nome}
        </span>
        <Link to="/arcade">Entrar no arcade →</Link>
      </footer>
    </div>
  )
}
