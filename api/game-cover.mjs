function normalizar(value) {
  return value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/\s*\([^)]*\)\s*$/, '')
    .replace(/[^\da-z]+/g, '')
}

async function capaSteam(titulo) {
  const response = await fetch(
    `https://steamcommunity.com/actions/SearchApps/${encodeURIComponent(titulo)}`,
  )
  if (!response.ok) return ''
  const resultados = await response.json()
  const resultado = resultados.find((item) => normalizar(item.name) === normalizar(titulo))
  return resultado
    ? `https://cdn.cloudflare.steamstatic.com/steam/apps/${resultado.appid}/library_600x900.jpg`
    : ''
}

async function capaCommons(titulo) {
  const query = encodeURIComponent(`"${titulo}" (cover OR boxart OR "box art")`)
  const response = await fetch(
    `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${query}&gsrnamespace=6&gsrlimit=10&prop=imageinfo&iiprop=url&iiurlwidth=600&format=json`,
  )
  if (!response.ok) return ''
  const data = await response.json()
  const paginas = Object.values(data.query?.pages ?? {})
  const pagina = paginas.find((item) => /cover|box.?art|front/i.test(item.title))
  return pagina?.imageinfo?.[0]?.thumburl ?? ''
}

async function capaWikipedia(titulo) {
  const normalizado = normalizar(titulo)
  const capaConhecida = normalizado.includes('magicalqueststarringmickeymouse')
    ? 'https://en.wikipedia.org/wiki/Special:FilePath/The_magical_quest_starring_mickey_mouse_frontcover.jpg?width=600'
    : ''
  const query = encodeURIComponent(titulo)
  const response = await fetch(
    `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${query}&gsrnamespace=6&gsrlimit=10&prop=imageinfo&iiprop=url&iiurlwidth=600&format=json`,
  )
  if (!response.ok) return capaConhecida
  const paginas = Object.values((await response.json()).query?.pages ?? {})
  const pagina = paginas.find((item) => /cover|frontcover|box.?art/i.test(item.title))
  if (pagina?.imageinfo?.[0]?.thumburl) return pagina.imageinfo[0].thumburl
  return capaConhecida
}

export default async function handler(request, response) {
  const titulo = new URL(request.url, 'https://website.local').searchParams.get('title')?.trim()
  if (!titulo) return response.status(400).json({ error: 'Título ausente' })

  try {
    const capa = (await capaSteam(titulo)) || (await capaCommons(titulo)) || (await capaWikipedia(titulo))
    response.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate=604800')
    return response.status(200).json({ capa })
  } catch {
    return response.status(502).json({ capa: '' })
  }
}
