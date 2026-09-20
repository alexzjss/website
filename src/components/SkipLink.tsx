/** Link que aparece ao primeiro Tab e pula a navegação. */
export default function SkipLink({ alvo = '#conteudo' }: { alvo?: string }) {
  return (
    <a className="skip-link" href={alvo}>
      Pular para o conteúdo
    </a>
  )
}
