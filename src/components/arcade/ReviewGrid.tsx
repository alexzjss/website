import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { reviews } from '../../content/reviews'
import { CAPA_GENERICA, capaVertical } from '../../lib/capas'

type Ordem = 'data' | 'nota'

function Capa({ url, titulo }: { url: string; titulo: string }) {
  return (
    <span className="capa">
      <img
        src={url}
        alt={`Capa de ${titulo}`}
        loading="lazy"
        onError={(e) => {
          if (e.currentTarget.src.endsWith(CAPA_GENERICA.replace('./', ''))) return
          e.currentTarget.src = CAPA_GENERICA
        }}
      />
    </span>
  )
}

/** Prateleira de reviews com capa, filtro por gênero e ordenação. */
export default function ReviewGrid() {
  const [tag, setTag] = useState<string | null>(null)
  const [ordem, setOrdem] = useState<Ordem>('data')

  const tags = useMemo(() => {
    const todas = reviews.flatMap((r) => r.tags)
    return Array.from(new Set(todas)).sort((a, b) => a.localeCompare(b, 'pt-BR'))
  }, [])

  const lista = useMemo(() => {
    const filtradas = tag ? reviews.filter((r) => r.tags.includes(tag)) : reviews
    return [...filtradas].sort((a, b) =>
      ordem === 'nota' ? b.nota - a.nota : a.data < b.data ? 1 : -1,
    )
  }, [tag, ordem])

  if (reviews.length === 0)
    return (
      <p className="vazio">
        Nenhuma review ainda. Crie um arquivo em src/content/reviews/ para publicar a primeira.
      </p>
    )

  return (
    <>
      <div className="filtros">
        <div className="filtros-grupo" role="group" aria-label="Filtrar por gênero">
          <button
            type="button"
            className={`chip ${tag === null ? 'is-ativo' : ''}`}
            onClick={() => setTag(null)}
          >
            todos
          </button>
          {tags.map((t) => (
            <button
              key={t}
              type="button"
              className={`chip ${tag === t ? 'is-ativo' : ''}`}
              onClick={() => setTag(tag === t ? null : t)}
            >
              {t.toLowerCase()}
            </button>
          ))}
        </div>

        <div className="filtros-ordem">
          <span>ordenar por</span>
          <button
            type="button"
            className={`chip ${ordem === 'data' ? 'is-ativo' : ''}`}
            onClick={() => setOrdem('data')}
          >
            data
          </button>
          <button
            type="button"
            className={`chip ${ordem === 'nota' ? 'is-ativo' : ''}`}
            onClick={() => setOrdem('nota')}
          >
            nota
          </button>
        </div>
      </div>

      <p className="filtros-contagem" aria-live="polite">
        {lista.length} {lista.length === 1 ? 'review' : 'reviews'}
        {tag ? ` em ${tag}` : ''}
      </p>

      <div className="prateleira">
        {lista.map((r, i) => (
          r.origemUrl ? (
            <a
              key={r.slug}
              href={r.origemUrl}
              target="_blank"
              rel="noreferrer"
              className="review-card"
              style={{ '--atraso': `${i * 70}ms` } as React.CSSProperties}
            >
              <Capa url={capaVertical(r)} titulo={r.titulo} />
              <span className="review-nota-bolha">{r.nota.toFixed(1)}</span>
              <span className="review-card-corpo">
                <span className="review-card-titulo">{r.titulo}</span>
                <span className="review-card-meta">
                  {r.plataforma}
                  {r.tempoDeJogo ? ` · ${r.tempoDeJogo}` : ''}
                </span>
                <span className="review-card-resumo">{r.resumo}</span>
              </span>
            </a>
          ) : (
            <Link
              key={r.slug}
              to={`/arcade/reviews/${r.slug}`}
              className="review-card"
              style={{ '--atraso': `${i * 70}ms` } as React.CSSProperties}
            >
              <Capa url={capaVertical(r)} titulo={r.titulo} />
              <span className="review-nota-bolha">{r.nota.toFixed(1)}</span>
              <span className="review-card-corpo">
                <span className="review-card-titulo">{r.titulo}</span>
                <span className="review-card-meta">
                  {r.plataforma}
                  {r.tempoDeJogo ? ` · ${r.tempoDeJogo}` : ''}
                </span>
                <span className="review-card-resumo">{r.resumo}</span>
              </span>
            </Link>
          )
        ))}
      </div>
    </>
  )
}
