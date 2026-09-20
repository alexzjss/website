import apiHandler from '../../api/backloggd-reviews.mjs'

export async function handler() {
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

  await apiHandler({}, response)
  return { statusCode: response.code, headers: response.headers, body: response.body }
}
