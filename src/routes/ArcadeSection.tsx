import { useEffect } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { caminhos, redes } from '../content/arcade'
import ProjectGrid from '../components/arcade/ProjectGrid'
import Trophies from '../components/arcade/Trophies'
import Timeline from '../components/arcade/Timeline'
import ReviewGrid from '../components/arcade/ReviewGrid'
import BotaoSom from '../components/arcade/BotaoSom'
import SkipLink from '../components/SkipLink'
import { usePagina } from '../lib/seo'

export default function ArcadeSection() {
  const { secao } = useParams()
  const navigate = useNavigate()
  const caminho = caminhos.find((c) => c.id === secao)
  usePagina(caminho?.rotulo, caminho?.descricao)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') navigate('/arcade')
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [navigate])

  if (!caminho) return <Navigate to="/arcade" replace />

  return (
    <div className="arcade">
      <SkipLink />
      <div className="grade-neon" aria-hidden="true" />
      <div className="scanlines" aria-hidden="true" />

      <header className="arcade-topo">
        <Link to="/arcade" className="arcade-voltar">
          ◀ menu
        </Link>
        <div className="arcade-topo-dir">
          <p className="arcade-player">{caminho.rotulo.toLowerCase()}</p>
          <BotaoSom />
        </div>
      </header>

      <main className={`arcade-secao cor-${caminho.cor}`} id="conteudo">
        <h1 className="arcade-h1 entra">{caminho.rotulo}</h1>
        <p className="arcade-legenda entra atraso-1">{caminho.descricao}</p>

        {secao === 'projetos' && <ProjectGrid />}
        {secao === 'conquistas' && <Trophies />}
        {secao === 'eventos' && <Timeline />}
        {secao === 'reviews' && <ReviewGrid />}

        {secao === 'contato' && (
          <div className="cards">
            {redes.map((r, i) => (
              <a
                key={r.rede}
                href={r.url}
                target="_blank"
                rel="noreferrer"
                className="card card-link"
                style={{ '--atraso': `${i * 80}ms` } as React.CSSProperties}
              >
                <header>
                  <h2>{r.rede}</h2>
                  <span className="card-status">{r.handle}</span>
                </header>
                <p>{r.descricao}</p>
              </a>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
