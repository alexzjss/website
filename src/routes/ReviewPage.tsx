import { useEffect } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { getReview, reviews } from '../content/reviews'
import { CAPA_GENERICA, capaHorizontal, capaVertical } from '../lib/capas'
import SkipLink from '../components/SkipLink'
import { usePagina } from '../lib/seo'
import { formatarData } from '../lib/datas'

export default function ReviewPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const review = slug ? getReview(slug) : undefined
  usePagina(review ? `${review.titulo} — review` : undefined, review?.resumo)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') navigate('/arcade/reviews')
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [navigate])

  if (!review) return <Navigate to="/arcade/reviews" replace />

  const banner = capaHorizontal(review)
  const capa = capaVertical(review)
  const indice = reviews.findIndex((r) => r.slug === review.slug)
  const proxima = reviews[(indice + 1) % reviews.length]

  return (
    <div className="arcade">
      <SkipLink />
      <div className="scanlines" aria-hidden="true" />
      <header className="arcade-topo">
        <Link to="/arcade/reviews" className="arcade-voltar">
          ◀ reviews
        </Link>
        <p className="arcade-player">{review.plataforma}</p>
      </header>

      <div className="post-banner" aria-hidden="true">
        {banner ? <img src={banner} alt="" /> : null}
      </div>

      <main className="post" id="conteudo">
        <div className="post-cabecalho">
          <span className="post-capa">
            <img
              src={capa}
              alt={`Capa de ${review.titulo}`}
              loading="lazy"
              onError={(e) => {
                if (e.currentTarget.src !== new URL(CAPA_GENERICA, window.location.href).href) {
                  e.currentTarget.src = CAPA_GENERICA
                }
              }}
            />
          </span>
          <div>
            <p className="post-data">{formatarData(review.data)}</p>
            <h1>{review.titulo}</h1>
            <p className="post-resumo">{review.resumo}</p>
            <p className="post-tags">
              {review.tags.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </p>
          </div>
        </div>

        <div className="post-ficha">
          <div>
            <span className="post-ficha-rotulo">Nota</span>
            <span className="post-ficha-valor destaque-nota">{review.nota.toFixed(1)}</span>
          </div>
          <div>
            <span className="post-ficha-rotulo">Plataforma</span>
            <span className="post-ficha-valor">{review.plataforma}</span>
          </div>
          {review.tempoDeJogo ? (
            <div>
              <span className="post-ficha-rotulo">Tempo de jogo</span>
              <span className="post-ficha-valor">{review.tempoDeJogo}</span>
            </div>
          ) : null}
        </div>

        <article className="post-corpo">
          {review.corpo.map((bloco, i) => {
            if (bloco.tipo === 'h') return <h2 key={i}>{bloco.texto}</h2>
            if (bloco.tipo === 'citacao') return <blockquote key={i}>{bloco.texto}</blockquote>
            if (bloco.tipo === 'lista')
              return (
                <ul key={i}>
                  {bloco.itens.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              )
            return <p key={i}>{bloco.texto}</p>
          })}
        </article>

        {proxima && proxima.slug !== review.slug ? (
          <Link to={`/arcade/reviews/${proxima.slug}`} className="post-proxima">
            <span>próxima review</span>
            <strong>{proxima.titulo} ▶</strong>
          </Link>
        ) : null}
      </main>
    </div>
  )
}
