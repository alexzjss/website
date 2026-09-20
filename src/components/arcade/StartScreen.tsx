import { useEffect, useState } from 'react'
import { profile } from '../../content/profile'
import { prefereMenosMovimento } from '../../lib/useAnimacoes'

/** Tela inicial de fliperama: título, "aperte start" e uma ficha para inserir. */
export default function StartScreen({ aoIniciar }: { aoIniciar: () => void }) {
  const [saindo, setSaindo] = useState(false)

  function iniciar() {
    if (saindo) return
    setSaindo(true)
    window.setTimeout(aoIniciar, prefereMenosMovimento() ? 0 : 620)
  }

  useEffect(() => {
    const onKey = () => iniciar()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  return (
    <div
      className={`start ${saindo ? 'is-saindo' : ''}`}
      onClick={iniciar}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && iniciar()}
      aria-label="Iniciar o arcade"
    >
      <div className="grade-neon" aria-hidden="true" />
      <div className="estrelas" aria-hidden="true">
        {Array.from({ length: 26 }).map((_, i) => (
          <span key={i} style={{ '--i': i } as React.CSSProperties} />
        ))}
      </div>

      <div className="start-conteudo">
        <p className="start-supra">Alex de Jesus Santana apresenta</p>
        <h1 className="start-titulo" data-texto="ALEX QUEST">
          ALEX QUEST
        </h1>
        <p className="start-sub">projetos pessoais · troféus · linha do tempo · reviews</p>

        <p className="start-press">aperte start</p>
        <p className="start-dica">clique em qualquer lugar ou pressione qualquer tecla</p>

        <div className="start-rodape">
          <span>1 crédito</span>
          <span>
            {new Date().getFullYear()} · {profile.apelido}
          </span>
        </div>
      </div>

      <div className="scanlines" aria-hidden="true" />
      <div className="start-flash" aria-hidden="true" />
    </div>
  )
}
