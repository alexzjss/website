import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Trilha 8-bit gerada na hora com a Web Audio API — nenhum arquivo de áudio
 * para baixar e nenhuma questão de licença. Só começa depois de um clique,
 * como os navegadores exigem, e a preferência fica guardada na sessão.
 *
 * Para mudar a música: edite MELODIA (semitons a partir de A4, `null` = pausa)
 * e BAIXO. Cada número dura um SEMICOLCHEIA * 2.
 */
const MELODIA: (number | null)[] = [
  0,
  4,
  7,
  12,
  7,
  4,
  0,
  null,
  2,
  5,
  9,
  14,
  9,
  5,
  2,
  null,
  3,
  7,
  10,
  15,
  10,
  7,
  3,
  null,
  -2,
  2,
  5,
  10,
  5,
  2,
  -2,
  null,
]
const BAIXO: (number | null)[] = [
  -24,
  null,
  -12,
  null,
  -22,
  null,
  -10,
  null,
  -21,
  null,
  -9,
  null,
  -26,
  null,
  -14,
  null,
]
const PASSO = 0.16 // segundos por nota

function freq(semitom: number) {
  return 440 * Math.pow(2, semitom / 12)
}

export function useChiptune() {
  const [tocando, setTocando] = useState(false)
  const ctxRef = useRef<AudioContext | null>(null)
  const timerRef = useRef<number | null>(null)
  const passoRef = useRef(0)

  const parar = useCallback(() => {
    if (timerRef.current) window.clearInterval(timerRef.current)
    timerRef.current = null
    ctxRef.current?.close()
    ctxRef.current = null
    setTocando(false)
    sessionStorage.setItem('arcade-som', 'off')
  }, [])

  const tocar = useCallback(() => {
    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (!Ctx) return
    const ctx = new Ctx()
    ctxRef.current = ctx
    const mestre = ctx.createGain()
    mestre.gain.value = 0.045 // volume baixo de propósito
    mestre.connect(ctx.destination)

    const nota = (semitom: number, tipo: OscillatorType, duracao: number, ganho: number) => {
      const osc = ctx.createOscillator()
      const g = ctx.createGain()
      osc.type = tipo
      osc.frequency.value = freq(semitom)
      g.gain.setValueAtTime(0.0001, ctx.currentTime)
      g.gain.exponentialRampToValueAtTime(ganho, ctx.currentTime + 0.01)
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duracao)
      osc.connect(g)
      g.connect(mestre)
      osc.start()
      osc.stop(ctx.currentTime + duracao + 0.02)
    }

    timerRef.current = window.setInterval(() => {
      const i = passoRef.current
      const m = MELODIA[i % MELODIA.length]
      const b = BAIXO[i % BAIXO.length]
      if (m !== null) nota(m, 'square', PASSO * 0.9, 0.9)
      if (b !== null) nota(b, 'triangle', PASSO * 1.6, 0.7)
      passoRef.current = i + 1
    }, PASSO * 1000)

    setTocando(true)
    sessionStorage.setItem('arcade-som', 'on')
  }, [])

  const alternar = useCallback(() => {
    if (tocando) parar()
    else tocar()
  }, [tocando, parar, tocar])

  // retoma se o visitante já tinha ligado o som nesta sessão
  useEffect(() => {
    if (sessionStorage.getItem('arcade-som') === 'on' && !ctxRef.current) tocar()
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current)
      ctxRef.current?.close()
      ctxRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { tocando, alternar }
}
