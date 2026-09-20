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
  const [fotoArcadeDisponivel, setFotoArcadeDisponivel] = useState(true)

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
    <main
      className={`split ${pronto ? 'is-pronto' : ''}`}
      data-ativo={ativo ?? undefined}
      data-entrando={entrando ?? undefined}
    >
      <SkipLink />
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
        <div className="split-pro-bg" aria-hidden="true" />
        <div className="split-inner">
          <p className="split-eyebrow">Ambiente profissional</p>
          <img className="split-photo-pro" src={profile.foto} alt={`Retrato de ${profile.nome}`} />
          <p className="split-label">{profile.subtitulo}</p>
          <h1 className="split-title">{profile.nome}</h1>
          <p className="split-sub">Currículo, pesquisa, stack e entregas.</p>
          <span className="split-cta">Abrir o dossiê <span aria-hidden="true">→</span></span>
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
          <p className="split-eyebrow arcade-eyebrow">Ambiente divertido</p>
          {fotoArcadeDisponivel ? (
            <img
              className="split-photo-arcade"
              src="./images/alex-arcade.jpg"
              alt="Retrato de Alex no ambiente arcade"
              onError={() => setFotoArcadeDisponivel(false)}
            />
          ) : (
            <div className="split-photo-arcade split-photo-placeholder" aria-hidden="true">
              <span>SUA FOTO</span>
              <small>adicione alex-arcade.jpg em public/images</small>
            </div>
          )}
          <h2 className="split-title arcade-title pixel" data-texto="ARCADE">ARCADE</h2>
          <p className="split-sub arcade-sub">Projetos pessoais, jogos, troféus e reviews.</p>
          <span className="split-cta arcade-cta">Inserir ficha <span aria-hidden="true">▶</span></span>
        </div>
        <div className="scanlines" aria-hidden="true" />
      </a>

      <div className="split-seam" aria-hidden="true" />
      <p className="split-hint"><kbd>←</kbd> <kbd>→</kbd> escolher <span>·</span> <kbd>Enter</kbd> entrar</p>
      <div className="split-flash" aria-hidden="true" />
    </main>
  )
}
