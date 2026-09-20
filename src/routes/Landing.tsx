import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
      'split-panel',
      `split-${lado}`,
      ativo === lado ? 'is-active' : '',
      ativo && ativo !== lado ? 'is-recuado' : '',
      entrando === lado ? 'is-entrando' : '',
      entrando && entrando !== lado ? 'is-saindo' : '',
    ]
      .filter(Boolean)
      .join(' ')

  return (
    <main className={`split ${pronto ? 'is-pronto' : ''}`} data-entrando={entrando ?? undefined}>
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
        <div className="split-brilho" aria-hidden="true" />
        <div className="split-inner">
          <p className="split-eyebrow">Lado profissional</p>
          <h1 className="split-title">{profile.nome}</h1>
          <p className="split-sub">
            Currículo, pesquisa, stack e entregas. A versão que vai para o recrutador.
          </p>
          <span className="split-cta">
            Abrir o dossiê
            <span className="split-cta-seta" aria-hidden="true">
              →
            </span>
          </span>
        </div>
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
        <div className="grade-neon" aria-hidden="true" />
        <div className="estrelas" aria-hidden="true">
          {Array.from({ length: 18 }).map((_, i) => (
            <span key={i} style={{ '--i': i } as React.CSSProperties} />
          ))}
        </div>
        <div className="split-inner">
          <p className="split-eyebrow arcade-eyebrow">Player 2</p>
          <h2 className="split-title arcade-title pixel" data-texto="ARCADE">
            ARCADE
          </h2>
          <p className="split-sub arcade-sub">
            Projetos pessoais, troféus, linha do tempo e reviews de jogos.
          </p>
          <span className="split-cta arcade-cta">Inserir ficha</span>
        </div>
        <div className="scanlines" aria-hidden="true" />
      </a>

      <div className="split-seam" aria-hidden="true" />

      <p className="split-hint">
        <kbd>←</kbd> <kbd>→</kbd> escolhem · <kbd>Enter</kbd> entra · ou clique em um lado
      </p>
      <div className="split-flash" aria-hidden="true" />
    </main>
  )
}
