import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SkipLink from '../components/SkipLink'
import { profile } from '../content/profile'
import { prefereMenosMovimento } from '../lib/useAnimacoes'
import { usePagina } from '../lib/seo'

type Lado = 'pro' | 'arcade'

export default function Landing() {
  usePagina()
  const navigate = useNavigate()
  const [ativo, setAtivo] = useState<Lado | null>(null)
  const [entrando, setEntrando] = useState<Lado | null>(null)
  const [pronto, setPronto] = useState(false)

  // animação de entrada da tela
  useEffect(() => {
    const t = window.setTimeout(() => setPronto(true), 60)
    return () => window.clearTimeout(t)
  }, [])

  // setas escolhem o lado, Enter entra
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowLeft') setAtivo('pro')
      else if (e.key === 'ArrowRight') setAtivo('arcade')
      else if (e.key === 'Enter' && ativo) entrar(ativo)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  function entrar(lado: Lado) {
    if (entrando) return
    setEntrando(lado)
    window.setTimeout(
      () => navigate(lado === 'pro' ? '/pro' : '/arcade'),
      prefereMenosMovimento() ? 0 : 620,
    )
  }

  const classe = (lado: Lado) =>
    [
      'landing-choice',
      `choice-${lado}`,
      ativo === lado ? 'is-active' : '',
      ativo && ativo !== lado ? 'is-recuado' : '',
      entrando === lado ? 'is-entrando' : '',
      entrando && entrando !== lado ? 'is-saindo' : '',
    ]
      .filter(Boolean)
      .join(' ')

  return (
    <main
      className={`landing ${pronto ? 'is-pronto' : ''}`}
      data-ativo={ativo ?? undefined}
      data-entrando={entrando ?? undefined}
    >
      <SkipLink />
      <div className="landing-atmosfera" aria-hidden="true">
        <div className="landing-brilho landing-brilho-pro" />
        <div className="landing-brilho landing-brilho-arcade" />
        <div className="grade-neon" />
        <div className="estrelas">
          {Array.from({ length: 18 }).map((_, i) => (
            <span key={i} style={{ '--i': i } as React.CSSProperties} />
          ))}
        </div>
        <div className="scanlines" />
      </div>

      <header className="landing-topo">
        <span className="landing-marca">ALEX<span>/</span>01</span>
        <span className="landing-status">
          <i aria-hidden="true" /> arquivo pessoal online
        </span>
      </header>

      <section className="landing-conteudo" id="conteudo">
        <div className="landing-identidade">
          <div className="landing-avatar-wrap">
            <img className="landing-avatar" src={profile.avatar} alt="" />
            <span className="landing-avatar-sinal" aria-hidden="true" />
          </div>
          <p className="landing-kicker">Duas formas de conhecer meu trabalho</p>
          <h1 className="landing-nome">{profile.nome}</h1>
          <p className="landing-intro">
            Tecnologia, curiosidade e projetos que merecem ser explorados com calma.
          </p>
        </div>

        <div className="landing-escolhas" aria-label="Escolha uma experiência">
          <a
            href="#/pro"
            className={classe('pro')}
            onMouseEnter={() => setAtivo('pro')}
            onMouseLeave={() => setAtivo(null)}
            onFocus={() => setAtivo('pro')}
            onBlur={() => setAtivo(null)}
            onClick={(e) => {
              e.preventDefault()
              entrar('pro')
            }}
          >
            <span className="landing-choice-index">01 / trabalho</span>
            <span className="landing-choice-title">Dossiê profissional</span>
            <span className="landing-choice-description">
              Dados, inteligência artificial, software e experiência.
            </span>
            <span className="landing-choice-action">
              Entrar no dossiê <span aria-hidden="true">↗</span>
            </span>
          </a>

          <a
            href="#/arcade"
            className={classe('arcade')}
            onMouseEnter={() => setAtivo('arcade')}
            onMouseLeave={() => setAtivo(null)}
            onFocus={() => setAtivo('arcade')}
            onBlur={() => setAtivo(null)}
            onClick={(e) => {
              e.preventDefault()
              entrar('arcade')
            }}
          >
            <span className="landing-choice-index">02 / curiosidade</span>
            <span className="landing-choice-title arcade-title pixel" data-texto="ARCADE">
              ARCADE
            </span>
            <span className="landing-choice-description">
              Projetos pessoais, troféus, linha do tempo e reviews de jogos.
            </span>
            <span className="landing-choice-action arcade-cta">
              Inserir ficha <span aria-hidden="true">▶</span>
            </span>
          </a>
        </div>

        <p className="landing-hint">
          <kbd>←</kbd><kbd>→</kbd> navegar <span aria-hidden="true">·</span> <kbd>Enter</kbd> escolher
        </p>
      </section>

      <footer className="landing-rodape">
        <span>São Paulo, Brasil</span>
        <span> sistemas de informação · usp</span>
      </footer>
      <div className="landing-flash" aria-hidden="true" />
    </main>
  )
}
