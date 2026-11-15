// Shared chrome for every page: language/theme preferences, the top page navigation and the footer.
import { useEffect, useState } from 'react'
import { site, type Lang } from './content'
import { ui, type UI } from './ui'

export type Theme = 'light' | 'dark'
export type PageKey = 'home' | 'projects' | 'content'
const hasWindow = typeof window !== 'undefined'
const pages: { key: PageKey; href: string }[] = [{ key: 'home', href: '/' }, { key: 'projects', href: '/projetos' }, { key: 'content', href: '/conteudos' }]

function param(name: string) { try { return new URLSearchParams(window.location.search).get(name) } catch { return null } }
function stored(key: string) { try { return localStorage.getItem(key) } catch { return null } }
function systemDark() { return hasWindow && typeof window.matchMedia === 'function' && window.matchMedia('(prefers-color-scheme: dark)').matches }

export function readLang(): Lang {
  const query = param('lang')
  if (query === 'en') return 'en'
  if (query === 'pt') return 'pt-BR'
  return stored('alex-lang') === 'en' ? 'en' : 'pt-BR'
}
export function readTheme(): Theme {
  const query = param('theme')
  if (query === 'light' || query === 'dark') return query
  const saved = stored('alex-theme')
  if (saved === 'light' || saved === 'dark') return saved
  return systemDark() ? 'dark' : 'light'
}

/** Language and theme state, persisted and kept in sync with the system theme until the visitor picks one. */
export function usePrefs() {
  const [lang, setLang] = useState<Lang>(readLang)
  const [theme, setTheme] = useState<Theme>(readTheme)
  const [themeManual, setThemeManual] = useState(() => stored('alex-theme') !== null)

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dataset.theme = theme
    try { localStorage.setItem('alex-lang', lang); if (themeManual) localStorage.setItem('alex-theme', theme) } catch { /* storage can be unavailable */ }
  }, [lang, theme, themeManual])

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const sync = (event: MediaQueryListEvent) => { if (!themeManual) setTheme(event.matches ? 'dark' : 'light') }
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [themeManual])

  return {
    lang, theme, text: ui[lang],
    toggleLang: () => setLang((current) => current === 'pt-BR' ? 'en' : 'pt-BR'),
    toggleTheme: () => { setTheme((current) => current === 'light' ? 'dark' : 'light'); setThemeManual(true) },
  }
}

/** Sets the document title and the description/social meta tags for the current page. */
export function useMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title
    for (const selector of ['meta[property="og:title"]', 'meta[name="twitter:title"]']) document.querySelector(selector)?.setAttribute('content', title)
    for (const selector of ['meta[name="description"]', 'meta[property="og:description"]', 'meta[name="twitter:description"]']) document.querySelector(selector)?.setAttribute('content', description)
  }, [title, description])
}

type HeaderProps = { current?: PageKey; lang: Lang; theme: Theme; text: UI; onLang: () => void; onTheme: () => void; scrolled?: boolean }

export function SiteHeader({ current, lang, theme, text, onLang, onTheme, scrolled }: HeaderProps) {
  return <header className={`topbar glass${scrolled ? ' scrolled' : ''}`}>
    <nav className="segment" aria-label={text.pagesLabel}>
      {pages.map((page) => <a key={page.key} href={page.href} className={current === page.key ? 'on' : ''} aria-current={current === page.key ? 'page' : undefined}>{text.pages[page.key]}</a>)}
    </nav>
    <span className="bar-sep" aria-hidden="true"/>
    <button className="bar-button" onClick={onLang} aria-label={text.language}>{lang === 'pt-BR' ? 'PT' : 'EN'}</button>
    <button className="bar-button" onClick={onTheme} aria-label={theme === 'light' ? text.themeDark : text.themeLight} aria-pressed={theme === 'dark'}>{theme === 'light' ? '☾' : '☀'}</button>
  </header>
}

export function SiteFooter({ text }: { text: UI }) {
  return <footer className="site-footer">
    <span>© {new Date().getFullYear()} {site.name}</span>
    <nav aria-label={text.footerLabel}>
      {pages.map((page) => <a key={page.key} href={page.href}>{text.pages[page.key]}</a>)}
      <a href="/cv">{text.cv}</a>
      <a href={site.github} target="_blank" rel="noreferrer">GitHub</a>
      <a href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
    </nav>
  </footer>
}

export function Backdrop({ text }: { text: UI }) {
  return <><div className="blobs" aria-hidden="true"><i/><i/><i/></div><a className="skip-link" href="#main">{text.skip}</a></>
}
