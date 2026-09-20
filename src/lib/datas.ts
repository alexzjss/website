/** AAAA-MM-DD -> DD/MM/AAAA; AAAA-MM -> MM/AAAA. */
export function formatarData(iso: string) {
  const [ano, mes, dia] = iso.split('-')
  return dia ? `${dia}/${mes}/${ano}` : `${mes}/${ano}`
}

const MESES = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']

/** AAAA-MM -> "set 2026", usado na linha do tempo. */
export function rotuloMes(iso: string) {
  const [ano, mes] = iso.split('-')
  return mes ? `${MESES[Number(mes) - 1]} ${ano}` : ano
}
