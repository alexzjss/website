const cache = new Map<string, string>()

export async function buscarCapaRemota(titulo: string): Promise<string> {
  const existente = cache.get(titulo)
  if (existente !== undefined) return existente

  const response = await fetch(`/api/game-cover?title=${encodeURIComponent(titulo)}`)
  if (!response.ok) throw new Error(`Capa indisponível para ${titulo}`)
  const { capa } = (await response.json()) as { capa?: string }
  const resultado = capa ?? ''
  cache.set(titulo, resultado)
  return resultado
}
