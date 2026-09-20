import { useEffect, useState } from 'react'
import { projetosPessoais } from '../../content/projects'
import type { Project } from '../../content/types'
import { useFocusTrap } from '../../lib/useFocusTrap'

/** Grade de projetos pessoais, com tela de detalhe ao clicar. */
export default function ProjectGrid() {
  const [aberto, setAberto] = useState<Project | null>(null)
  const caixaRef = useFocusTrap<HTMLElement>(aberto !== null)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape' && aberto) {
        e.stopPropagation()
        setAberto(null)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [aberto])

  return (
    <>
      <div className="grade-jogos">
        {projetosPessoais.map((p, i) => (
          <button
            key={p.slug}
            type="button"
            className="jogo"
            style={{ '--atraso': `${i * 70}ms` } as React.CSSProperties}
            onClick={() => setAberto(p)}
          >
            <span className="jogo-capa" aria-hidden="true">
              {p.capa ? (
                <img src={p.capa} alt="" loading="lazy" />
              ) : (
                <span className="jogo-emoji">{p.emoji ?? '▣'}</span>
              )}
            </span>
            <span className="jogo-info">
              <span className="jogo-nome">{p.nome}</span>
              <span className="jogo-meta">
                {p.periodo} · {p.status}
              </span>
              <span className="jogo-resumo">{p.resumo}</span>
            </span>
          </button>
        ))}
      </div>

      {aberto ? (
        <div className="modal" onClick={() => setAberto(null)}>
          <article
            className="modal-caixa"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-titulo"
            ref={caixaRef}
            onClick={(e) => e.stopPropagation()}
          >
            <button type="button" className="modal-fechar" onClick={() => setAberto(null)}>
              fechar ✕
            </button>
            <span className="modal-emoji" aria-hidden="true">
              {aberto.emoji ?? '▣'}
            </span>
            <h2 id="modal-titulo">{aberto.nome}</h2>
            <p className="modal-meta">
              {aberto.periodo} · {aberto.status}
            </p>
            <p className="modal-descricao">{aberto.descricao}</p>
            {aberto.destaque ? <p className="modal-destaque">{aberto.destaque}</p> : null}
            <p className="card-tags">
              {aberto.stack.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </p>
            {aberto.links?.length ? (
              <p className="card-links">
                {aberto.links.map((l) => (
                  <a key={l.url} href={l.url} target="_blank" rel="noreferrer">
                    {l.rotulo} ↗
                  </a>
                ))}
              </p>
            ) : null}
            <p className="modal-dica">Esc fecha</p>
          </article>
        </div>
      ) : null}
    </>
  )
}
