import { useEffect, useRef } from 'react'
import { eventos } from '../../content/arcade'
import { prefereMenosMovimento } from '../../lib/useAnimacoes'
import { rotuloMes } from '../../lib/datas'

/** Linha do tempo com rolagem: cada item aparece conforme entra na tela. */
export default function Timeline() {
  const ref = useRef<HTMLOListElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const itens = Array.from(el.querySelectorAll<HTMLElement>('li'))
    if (prefereMenosMovimento()) {
      itens.forEach((i) => i.classList.add('is-visivel'))
      return
    }
    const obs = new IntersectionObserver(
      (entradas) =>
        entradas.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visivel')
            obs.unobserve(e.target)
          }
        }),
      { threshold: 0.25 },
    )
    itens.forEach((i) => obs.observe(i))
    return () => obs.disconnect()
  }, [])

  const ordenados = [...eventos].sort((a, b) => (a.data < b.data ? 1 : -1))

  return (
    <ol className="tl" ref={ref}>
      {ordenados.map((e) => (
        <li key={`${e.nome}-${e.data}`} className={e.destaque ? 'tl-item is-destaque' : 'tl-item'}>
          <span className="tl-marcador" aria-hidden="true" />
          <span className="tl-data">{rotuloMes(e.data)}</span>
          <div className="tl-corpo">
            <h3>{e.nome}</h3>
            <p className="tl-papel">
              {e.papel}
              {e.local ? ` · ${e.local}` : ''}
            </p>
            <p className="tl-descricao">{e.descricao}</p>
            {e.tags?.length ? (
              <p className="tl-tags">
                {e.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </p>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  )
}
