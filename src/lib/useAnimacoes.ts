import { useEffect, useRef, useState } from 'react'

export function prefereMenosMovimento() {
  return (
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

/**
 * Revela um elemento quando ele entra na tela.
 * Uso: const ref = useReveal<HTMLDivElement>(); <div ref={ref} className="revela">
 */
export function useReveal<T extends HTMLElement>(margem = '0px 0px -12% 0px') {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefereMenosMovimento()) {
      el.classList.add('is-visivel')
      return
    }
    const obs = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visivel')
            obs.unobserve(e.target)
          }
        })
      },
      { rootMargin: margem, threshold: 0.12 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [margem])

  return ref
}

/** Revela vários filhos em cascata (usa o atributo data-stagger no pai). */
export function useRevealGroup<T extends HTMLElement>(seletor = ':scope > *') {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const filhos = Array.from(el.querySelectorAll<HTMLElement>(seletor))
    filhos.forEach((f, i) => {
      f.classList.add('revela')
      f.style.setProperty('--atraso', `${i * 70}ms`)
    })
    if (prefereMenosMovimento()) {
      filhos.forEach((f) => f.classList.add('is-visivel'))
      return
    }
    const obs = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visivel')
            obs.unobserve(e.target)
          }
        })
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 },
    )
    filhos.forEach((f) => obs.observe(f))
    return () => obs.disconnect()
  }, [seletor])

  return ref
}

/** Conta de 0 até o número final quando entra na tela. Aceita "700+", "4", "1.158". */
export function useContador(valor: string) {
  const ref = useRef<HTMLSpanElement | null>(null)
  const [texto, setTexto] = useState(valor)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const numero = Number(valor.replace(/[^\d]/g, ''))
    const sufixo = valor.replace(/[\d.]/g, '')
    if (!numero || prefereMenosMovimento()) {
      setTexto(valor)
      return
    }
    const obs = new IntersectionObserver(
      (entradas) => {
        if (!entradas[0].isIntersecting) return
        obs.disconnect()
        const duracao = 1100
        const inicio = performance.now()
        const passo = (agora: number) => {
          const t = Math.min(1, (agora - inicio) / duracao)
          const suave = 1 - Math.pow(1 - t, 3)
          setTexto(`${Math.round(numero * suave)}${sufixo}`)
          if (t < 1) requestAnimationFrame(passo)
        }
        requestAnimationFrame(passo)
      },
      { threshold: 0.5 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [valor])

  return { ref, texto }
}

/** Progresso de rolagem da página, de 0 a 1. */
export function useProgressoScroll() {
  const [progresso, setProgresso] = useState(0)

  useEffect(() => {
    let raf = 0
    const atualizar = () => {
      raf = 0
      const total = document.documentElement.scrollHeight - window.innerHeight
      setProgresso(total > 0 ? window.scrollY / total : 0)
    }
    const aoRolar = () => {
      if (!raf) raf = requestAnimationFrame(atualizar)
    }
    window.addEventListener('scroll', aoRolar, { passive: true })
    window.addEventListener('resize', aoRolar)
    atualizar()
    return () => {
      window.removeEventListener('scroll', aoRolar)
      window.removeEventListener('resize', aoRolar)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return progresso
}

/** Posição de rolagem em pixels (para parallax leve). */
export function useScrollY() {
  const [y, setY] = useState(0)
  useEffect(() => {
    if (prefereMenosMovimento()) return
    let raf = 0
    const atualizar = () => {
      raf = 0
      setY(window.scrollY)
    }
    const aoRolar = () => {
      if (!raf) raf = requestAnimationFrame(atualizar)
    }
    window.addEventListener('scroll', aoRolar, { passive: true })
    return () => {
      window.removeEventListener('scroll', aoRolar)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])
  return y
}
