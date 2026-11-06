import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { inject } from '@vercel/analytics'
import App from './App'
import './styles.css'

// createRoot replaces the prerendered markup on load, so stored language/theme preferences never cause a hydration mismatch.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Cookie-free page-view analytics; only reports when served from Vercel.
if (import.meta.env.PROD) inject()
