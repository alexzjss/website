import { useChiptune } from '../../lib/chiptune'

/** Liga/desliga a trilha 8-bit do arcade. Fica desligada até alguém pedir. */
export default function BotaoSom() {
  const { tocando, alternar } = useChiptune()
  return (
    <button
      type="button"
      className={`botao-som ${tocando ? 'is-tocando' : ''}`}
      onClick={alternar}
      aria-pressed={tocando}
      title={tocando ? 'Desligar a trilha' : 'Ligar a trilha 8-bit'}
    >
      <span className="botao-som-icone" aria-hidden="true">
        {tocando ? '♪' : '✕'}
      </span>
      <span className="botao-som-texto">{tocando ? 'som ligado' : 'som'}</span>
      <span className="botao-som-barras" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
    </button>
  )
}
