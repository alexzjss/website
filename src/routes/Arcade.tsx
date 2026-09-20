import { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import StartScreen from '../components/arcade/StartScreen'
import BotaoSom from '../components/arcade/BotaoSom'
import SkipLink from '../components/SkipLink'
import { usePagina } from '../lib/seo'
import { caminhos } from '../content/arcade'
import { profile } from '../content/profile'
import { reviews } from '../content/reviews'
import { capaHorizontal } from '../lib/capas'

export default function Arcade() {
  usePagina('Arcade', 'Projetos pessoais, troféus, linha do tempo e reviews de jogos.')
  const navigate = useNavigate()
  const [iniciado, setIniciado] = useState(() => sessionStorage.getItem('arcade-start') === 'ok')
  const [cursor, setCursor] = useState(0)

  const iniciar = useCallback(() => {
    sessionStorage.setItem('arcade-start', 'ok')
    setIniciado(true)
  }, [])

  useEffect(() => {
    if (!iniciado) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault()
        setCursor((c) => (c + 1) % caminhos.length)
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault()
        setCursor((c) => (c - 1 + caminhos.length) % caminhos.length)
      } else if (e.key === 'Enter') {
        navigate(`/arcade/${caminhos[cursor].id}`)
      } else if (e.key === 'Escape') {
        navigate('/')
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [iniciado, cursor, navigate])

  if (!iniciado) return <StartScreen aoIniciar={iniciar} />

  return (
    <div className="arcade">
      <SkipLink />
      <div className="arcade-cenarios" aria-hidden="true">
        <div className="arcade-cenarios-faixa">
          {[...reviews, ...reviews].map((review, i) => {
            const capa = capaHorizontal(review)
            return capa ? <span key={`${review.slug}-${i}`} style={{ backgroundImage: `url(${capa})` }} /> : null
          })}
        </div>
        <div className="arcade-cenarios-vinheta" />
      </div>
      <div className="grade-neon" aria-hidden="true" />
      <div className="scanlines" aria-hidden="true" />

      <header className="arcade-topo">
        <Link to="/" className="arcade-voltar">
          ◀ sair
        </Link>
        <div className="arcade-topo-dir">
          <p className="arcade-player">{profile.apelido} · save 01</p>
          <BotaoSom />
        </div>
      </header>

      <main className="arcade-menu" id="conteudo">
        <h1 className="arcade-h1 entra">Selecione o modo</h1>
        <p className="arcade-legenda entra atraso-1">
          Setas e Enter, ou clique. Esc volta para a tela inicial.
        </p>

        <ul className="menu-lista">
          {caminhos.map((c, i) => (
            <li key={c.id} style={{ '--atraso': `${i * 90 + 150}ms` } as React.CSSProperties}>
              <Link
                to={`/arcade/${c.id}`}
                className={`menu-item cor-${c.cor} ${i === cursor ? 'is-cursor' : ''}`}
                onMouseEnter={() => setCursor(i)}
              >
                <span className="menu-icone" aria-hidden="true">
                  {c.icone}
                </span>
                <span className="menu-texto">
                  <span className="menu-rotulo">{c.rotulo}</span>
                  <span className="menu-desc">{c.descricao}</span>
                </span>
                <span className="menu-seta" aria-hidden="true">
                  ▶
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="arcade-rodape">
          Procurando a versão séria? <Link to="/pro">Abrir o dossiê profissional</Link>
        </p>
      </main>
    </div>
  )
}
