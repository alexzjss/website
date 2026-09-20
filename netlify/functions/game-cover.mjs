import apiHandler from '../../api/game-cover.mjs'

export async function handler(event) {
  const response = {
    code: 200,
    headers: { 'Content-Type': 'application/json' },
    body: '',
    setHeader(name, value) {
      this.headers[name] = value
    },
    status(code) {
      this.code = code
      return this
    },
    json(value) {
      this.body = JSON.stringify(value)
      return this
    },
  }

  const query = new URLSearchParams(event.queryStringParameters ?? {}).toString()
  await apiHandler({ url: `https://website.local/game-cover?${query}` }, response)
  return { statusCode: response.code, headers: response.headers, body: response.body }
}
