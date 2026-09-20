import { Suspense, lazy, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Landing from './routes/Landing'

/* Cada rota vira um pedaço separado do bundle: quem abre o dossiê não baixa o arcade. */
const Pro = lazy(() => import('./routes/Pro'))
const ProjetoPage = lazy(() => import('./routes/ProjetoPage'))
const Arcade = lazy(() => import('./routes/Arcade'))
const ArcadeSection = lazy(() => import('./routes/ArcadeSection'))
const ReviewPage = lazy(() => import('./routes/ReviewPage'))
const NaoEncontrado = lazy(() => import('./routes/NaoEncontrado'))

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function Carregando() {
  return (
    <div className="carregando" role="status" aria-live="polite">
      <span className="carregando-barra" aria-hidden="true" />
      <span className="carregando-texto">carregando</span>
    </div>
  )
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<Carregando />}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/pro" element={<Pro />} />
          <Route path="/pro/projetos/:slug" element={<ProjetoPage />} />
          <Route path="/arcade" element={<Arcade />} />
          <Route path="/arcade/reviews/:slug" element={<ReviewPage />} />
          <Route path="/arcade/:secao" element={<ArcadeSection />} />
          <Route path="*" element={<NaoEncontrado />} />
        </Routes>
      </Suspense>
    </>
  )
}
