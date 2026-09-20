import { Link, Navigate, useParams } from 'react-router-dom'
import { getProjeto, projetosPro } from '../content/projects'
import { usePagina } from '../lib/seo'
import SkipLink from '../components/SkipLink'
import { profile } from '../content/profile'

export default function ProjetoPage() {
  const { slug } = useParams()
  const projeto = slug ? getProjeto(slug) : undefined
  usePagina(projeto?.nome, projeto?.resumo)

  if (!projeto || projeto.tipo !== 'profissional') return <Navigate to="/pro" replace />

  const indice = projetosPro.findIndex((p) => p.slug === projeto.slug)
  const proximo = projetosPro[(indice + 1) % projetosPro.length]

  return (
    <div className="pro">
      <SkipLink />
      <header className="pro-bar">
        <Link to="/pro" className="pro-bar-home">
          ← {profile.apelido}
        </Link>
        <span className="pro-bar-migalha">Projetos · {projeto.nome}</span>
      </header>

      <main id="conteudo">
        <article className="caso">
          <header className="caso-topo">
            <p className="caso-meta">
              {projeto.periodo} · {projeto.status}
              {projeto.selo ? ` · ${projeto.selo}` : ''}
            </p>
            <h1>{projeto.nome}</h1>
            <p className="caso-resumo">{projeto.resumo}</p>
            <p className="tags">
              {projeto.stack.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </p>
            {projeto.links?.length ? (
              <p className="projeto-links">
                {projeto.links.map((l) => (
                  <a key={l.url} href={l.url} target="_blank" rel="noreferrer">
                    {l.rotulo}
                  </a>
                ))}
              </p>
            ) : null}
          </header>

          {projeto.numeros?.length ? (
            <div className="caso-numeros">
              {projeto.numeros.map((n) => (
                <div key={n.rotulo}>
                  <span className="caso-numero">{n.valor}</span>
                  <span className="caso-numero-rotulo">{n.rotulo}</span>
                </div>
              ))}
            </div>
          ) : null}

          <div className="caso-corpo">
            <div className="caso-texto">
              {projeto.detalhes?.map((d) => (
                <section key={d.titulo}>
                  <h2>{d.titulo}</h2>
                  <p>{d.texto}</p>
                </section>
              )) ?? <p>{projeto.descricao}</p>}
            </div>

            {projeto.papel?.length ? (
              <aside className="caso-papel">
                <h2>O que eu fiz</h2>
                <ul>
                  {projeto.papel.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </aside>
            ) : null}
          </div>

          {proximo && proximo.slug !== projeto.slug ? (
            <Link to={`/pro/projetos/${proximo.slug}`} className="caso-proximo">
              <span>Próximo projeto</span>
              <strong>{proximo.nome}</strong>
            </Link>
          ) : null}
        </article>
      </main>

      <footer className="pro-rodape">
        <Link to="/pro">← Voltar ao dossiê</Link>
        <Link to="/arcade">Arcade</Link>
      </footer>
    </div>
  )
}
