import { useEffect } from 'react'

const SUFIXO = 'Alex de Jesus Santana'

/**
 * Atualiza o <title> e a meta description da aba conforme a rota.
 * Uso: usePagina('Reviews', 'Jogos que eu zerei e o que achei de cada um.')
 */
export function usePagina(titulo?: string, descricao?: string) {
  useEffect(() => {
    document.title = titulo
      ? `${titulo} · ${SUFIXO}`
      : `${SUFIXO} — Dados, IA e Engenharia de Software`
    if (descricao) {
      let tag = document.querySelector<HTMLMetaElement>('meta[name="description"]')
      if (!tag) {
        tag = document.createElement('meta')
        tag.name = 'description'
        document.head.appendChild(tag)
      }
      tag.content = descricao
    }
  }, [titulo, descricao])
}
