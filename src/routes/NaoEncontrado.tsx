import { Link } from 'react-router-dom'
import { usePagina } from '../lib/seo'

export default function NaoEncontrado() {
  usePagina('Página não encontrada')
  return (
    <div className="arcade erro404">
      <div className="grade-neon" aria-hidden="true" />
      <div className="scanlines" aria-hidden="true" />
      <main className="erro404-caixa">
        <p className="erro404-codigo">erro 404</p>
        <h1 className="pixel erro404-titulo">game over</h1>
        <p className="erro404-texto">
          Essa página não existe — ou existia e foi movida. Escolha para onde continuar.
        </p>
        <div className="erro404-acoes">
          <Link to="/" className="botao botao-primario">
            Tela inicial
          </Link>
          <Link to="/pro" className="botao botao-fantasma botao-claro">
            Dossiê profissional
          </Link>
          <Link to="/arcade" className="botao botao-fantasma botao-claro">
            Arcade
          </Link>
        </div>
      </main>
    </div>
  )
}
