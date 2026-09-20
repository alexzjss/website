import { useEffect, useState } from 'react'
import { conquistas } from '../../content/arcade'
import { prefereMenosMovimento } from '../../lib/useAnimacoes'

const ordem = { platina: 0, ouro: 1, prata: 2, bronze: 3 } as const

/** Tela de troféus no estilo PlayStation: nível, barra de progresso e lista por raridade. */
export default function Trophies() {
  const [progresso, setProgresso] = useState(0)
  const [aberto, setAberto] = useState<string | null>(null)

  const total = conquistas.length
  const pontos = conquistas.reduce(
    (soma, c) => soma + { platina: 300, ouro: 90, prata: 30, bronze: 15 }[c.tier],
    0,
  )
  const nivel = Math.min(99, Math.floor(pontos / 60) + 1)
  const dentroDoNivel = Math.round(((pontos % 60) / 60) * 100)

  useEffect(() => {
    if (prefereMenosMovimento()) {
      setProgresso(dentroDoNivel)
      return
    }
    const t = window.setTimeout(() => setProgresso(dentroDoNivel), 250)
    return () => window.clearTimeout(t)
  }, [dentroDoNivel])

  const contagem = {
    platina: conquistas.filter((c) => c.tier === 'platina').length,
    ouro: conquistas.filter((c) => c.tier === 'ouro').length,
    prata: conquistas.filter((c) => c.tier === 'prata').length,
    bronze: conquistas.filter((c) => c.tier === 'bronze').length,
  }

  return (
    <div className="trofeus-tela">
      <header className="trofeu-perfil">
        <div className="trofeu-nivel">
          <span className="trofeu-nivel-numero">{nivel}</span>
          <span className="trofeu-nivel-rotulo">nível</span>
        </div>
        <div className="trofeu-barra-area">
          <div className="trofeu-barra">
            <span style={{ width: `${progresso}%` }} />
          </div>
          <p className="trofeu-barra-info">
            {total} troféus conquistados · {pontos} pontos
          </p>
        </div>
        <ul className="trofeu-contagem">
          {(['platina', 'ouro', 'prata', 'bronze'] as const).map((t) => (
            <li key={t} className={`c-${t}`}>
              <span className="trofeu-icone" aria-hidden="true">
                🏆
              </span>
              <span>{contagem[t]}</span>
            </li>
          ))}
        </ul>
      </header>

      <ul className="trofeu-lista">
        {[...conquistas]
          .sort((a, b) => ordem[a.tier] - ordem[b.tier])
          .map((c, i) => (
            <li
              key={c.titulo}
              className={`trofeu-item c-${c.tier} ${aberto === c.titulo ? 'is-aberto' : ''}`}
              style={{ '--atraso': `${i * 90}ms` } as React.CSSProperties}
            >
              <button
                type="button"
                onClick={() => setAberto(aberto === c.titulo ? null : c.titulo)}
              >
                <span className="trofeu-medalha" aria-hidden="true">
                  🏆
                </span>
                <span className="trofeu-texto">
                  <span className="trofeu-titulo">{c.titulo}</span>
                  <span className="trofeu-evento">
                    {c.evento} · {c.ano}
                  </span>
                  <span className="trofeu-posicao">{c.posicao}</span>
                </span>
                <span className="trofeu-raridade">
                  <span className="trofeu-tier">{c.tier}</span>
                  <span className="trofeu-pct">{c.raridade}%</span>
                </span>
              </button>
              {aberto === c.titulo && c.detalhe ? (
                <p className="trofeu-detalhe">{c.detalhe}</p>
              ) : null}
            </li>
          ))}
      </ul>
      <p className="trofeu-nota">Clique em um troféu para ver o detalhe.</p>
    </div>
  )
}
