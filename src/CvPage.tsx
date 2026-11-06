import { useEffect, useState } from 'react'
import { awards, certifications, highlights, organizations, projects, site, skillGroups, tx, type Lang } from './content'
import { ui } from './ui'
import './styles.css'

const cvProjects = ['sampanav', 'dasiboard', 'jflp', 'engrama', 'vttrpg']
const links = [
  { label: 'alexjsz.vercel.app', href: site.url },
  { label: 'github.com/alexzjss', href: site.github },
  { label: 'linkedin.com/in/alex-jsz', href: site.linkedin },
]

function initialLang(): Lang {
  try {
    const param = new URLSearchParams(window.location.search).get('lang')
    if (param === 'en') return 'en'
    if (param === 'pt') return 'pt-BR'
    return localStorage.getItem('alex-lang') === 'en' ? 'en' : 'pt-BR'
  } catch { return 'pt-BR' }
}

export default function CvPage() {
  const [lang, setLang] = useState<Lang>(initialLang)
  const text = ui[lang]
  const s = text.cvSections

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dataset.theme = 'light'
    document.title = text.cvTitle
  }, [lang, text])

  const experience = [...highlights].sort((a, b) => b.sortKey - a.sortKey)
  const orgs = [...organizations].sort((a, b) => b.sortKey - a.sortKey)
  const chosen = cvProjects.map((id) => projects.find((project) => project.id === id)!)

  return <div className="cv-shell">
    <div className="cv-controls">
      <a className="cv-back" href="/">← {text.cvBack}</a>
      <div className="cv-actions">
        <button onClick={() => setLang(lang === 'pt-BR' ? 'en' : 'pt-BR')} aria-label={text.language}>{lang === 'pt-BR' ? 'PT → EN' : 'EN → PT'}</button>
        <button className="primary" onClick={() => window.print()}>{text.cvPrint}</button>
      </div>
    </div>
    <article className="cv">
      <header>
        <h1>{site.name}</h1>
        <p className="cv-headline">{text.cvHeadline}</p>
        <p className="cv-contact"><a href={`mailto:${site.email}`}>{site.email}</a>{links.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}</p>
      </header>
      <div className="cv-grid">
        <div className="cv-main">
          <section><h2>{s.summary}</h2><p>{text.cvSummary}</p></section>
          <section><h2>{s.experience}</h2>
            {experience.map((item) => <div className="cv-item" key={item.id}><div className="cv-row"><h3>{item.name}</h3><span>{tx(item.period, lang)}</span></div><p className="cv-role">{tx(item.role, lang)}</p><p>{tx(item.summary, lang)}</p></div>)}
          </section>
          <section><h2>{s.projects}</h2>
            {chosen.map((project) => <div className="cv-item" key={project.id}><div className="cv-row"><h3>{project.name}</h3><span>{project.stack.slice(0, 4).join(' · ')}</span></div><p>{tx(project.tagline, lang)}</p></div>)}
          </section>
          <section><h2>{s.orgs}</h2>
            <ul className="cv-orgs">{orgs.map((item) => <li key={item.id}><strong>{item.name}</strong> · {tx(item.role, lang)}</li>)}</ul>
          </section>
        </div>
        <aside className="cv-side">
          <section><h2>{s.education}</h2><p><strong>{text.educationProgram}</strong><br />{text.educationInstitution}<br />{text.educationStatus}</p></section>
          <section><h2>{s.skills}</h2>{skillGroups.map((group) => <p key={group.title.en}><strong>{tx(group.title, lang)}</strong><br />{group.items.join(', ')}</p>)}</section>
          <section><h2>{s.awards}</h2><ul>{awards.map((award) => <li key={award.id}>{tx(award.title, lang)}</li>)}</ul></section>
          <section><h2>{s.certs}</h2><ul>{certifications.map((item) => <li key={item.en}>{tx(item, lang)}</li>)}</ul></section>
          <section><h2>{s.languages}</h2><p>{text.languagesLine}</p></section>
        </aside>
      </div>
    </article>
  </div>
}
