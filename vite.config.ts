import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import backloggdHandler from './api/backloggd-reviews.mjs'
import coverHandler from './api/game-cover.mjs'

function respostaApi(res) {
  return {
    setHeader(nome, valor) {
      res.setHeader(nome, valor)
    },
    status(codigo) {
      res.statusCode = codigo
      return this
    },
    json(dados) {
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(dados))
      return this
    },
  }
}

function apiLocal() {
  return {
    name: 'api-local',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const caminho = req.url?.split('?')[0]
        const handler = caminho === '/api/backloggd-reviews' ? backloggdHandler : caminho === '/api/game-cover' ? coverHandler : null
        if (!handler) {
          next()
          return
        }
        await handler({ url: `http://localhost${req.url}` }, respostaApi(res))
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), apiLocal()],
  base: './',
})
