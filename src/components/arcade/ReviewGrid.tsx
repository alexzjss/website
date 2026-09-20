import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Review } from '../../content/types'
import { buscarReviewsBackloggd } from '../../lib/backloggd'
import { buscarCapaRemota } from '../../lib/capasRemotas'
import { CAPA_GENERICA, capaVertical } from '../../lib/capas'

type Ordem = 'data' | 'nota'

function Capa({ url, titulo, remota }: { url: string; titulo: string; remota: boolean }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [visivel, setVisivel] = useState(false)
  const [capa, setCapa] = useState(remota && url === CAPA_GENERICA ? '' : url)
  const [falhou, setFalhou] = useState(false)

  useEffect(() => {
    const elemento = ref.current
    if (!elemento) return

    const observador = new IntersectionObserver(
      ([entrada]) => {
        setVisivel(entrada.isIntersecting)
        if (!entrada.isIntersecting) setFalhou(false)
      },
      { rootMargin: '200px 0px' },
    )
    observador.observe(elemento)
    return () => observador.disconnect()
  }, [])

  useEffect(() => {
    if (!visivel || !remota || capa) return
    buscarCapaRemota(titulo)
      .then((resultado) => setCapa(resultado))
      .catch(() => setFalhou(true))
  }, [capa, remota, titulo, visivel])

  return (
    <span className="capa" ref={ref}>
      {visivel ? (
        <img
          src={falhou || !capa ? CAPA_GENERICA : capa}
          alt={`Capa de ${titulo}`}
          loading="lazy"
          onError={() => setFalhou(true)}
        />
      ) : null}
    </span>
  )
}

/** Prateleira de reviews com capa, filtro por gênero e ordenação. */
export default function ReviewGrid() {
  const [dados, setDados] = useState<Review[]>([])
  const [carregando, setCarregando] = useState(true)
  const [falhou, setFalhou] = useState(false)
  const [tag, setTag] = useState<string | null>(null)
  const [ordem, setOrdem] = useState<Ordem>('data')

  useEffect(() => {
    buscarReviewsBackloggd()
      .then(setDados)
      .catch(() => setFalhou(true))
      .finally(() => setCarregando(false))
  }, [])

  const tags = useMemo(() => {
    const todas = dados.flatMap((r) => r.tags)
    return Array.from(new Set(todas)).sort((a, b) => a.localeCompare(b, 'pt-BR'))
  }, [dados])

  const lista = useMemo(() => {
    const filtradas = tag ? dados.filter((r) => r.tags.includes(tag)) : dados
    return [...filtradas].sort((a, b) =>
      ordem === 'nota' ? b.nota - a.nota : a.data < b.data ? 1 : -1,
    )
  }, [dados, tag, ordem])

  if (carregando)
    return <p className="vazio">Importando jogos do Backloggd...</p>

  if (falhou || dados.length === 0)
    return (
      <p className="vazio">
        Não foi possível importar jogos do Backloggd agora. Tente novamente em alguns minutos.
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
              <Capa url={capaVertical(r)} titulo={r.titulo} remota={r.plataforma === 'Backloggd'} />
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
              <Capa url={capaVertical(r)} titulo={r.titulo} remota={r.plataforma === 'Backloggd'} />
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
