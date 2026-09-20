import { useEffect, useRef } from 'react'

const FOCAVEIS =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

/**
 * Prende o foco do teclado dentro de um elemento (modal) enquanto ele estiver aberto
 * e devolve o foco para quem abriu ao fechar.
 */
export function useFocusTrap<T extends HTMLElement>(ativo: boolean) {
  const ref = useRef<T | null>(null)
  const anterior = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!ativo) return
    const el = ref.current
    if (!el) return

    anterior.current = document.activeElement as HTMLElement | null
    const alvos = () => Array.from(el.querySelectorAll<HTMLElement>(FOCAVEIS))
    alvos()[0]?.focus()

    function aoTeclar(e: KeyboardEvent) {
      if (e.key !== 'Tab') return
      const lista = alvos()
      if (lista.length === 0) return
      const primeiro = lista[0]
      const ultimo = lista[lista.length - 1]
      if (e.shiftKey && document.activeElement === primeiro) {
        e.preventDefault()
        ultimo.focus()
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault()
        primeiro.focus()
      }
    }

    document.addEventListener('keydown', aoTeclar)
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', aoTeclar)
      document.body.style.overflow = overflow
      anterior.current?.focus()
    }
  }, [ativo])

  return ref
}
