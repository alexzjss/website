import { acervo, acervoDate, acervoHref } from './acervo'
import { club, contentItems, formatDate, tx, type ContentItem, type ContentType, type Lang } from './content'
import { Backdrop, SiteFooter, SiteHeader, useMeta, usePrefs } from './shell'
import type { UI } from './ui'
import './styles.css'

const typeOrder: ContentType[] = ['video', 'workshop', 'event']

export function ContentCard({ item, lang, text }: { item: ContentItem; lang: Lang; text: UI }) {
  return <a className={`ccard glass ccard-${item.type}`} href={item.url} target="_blank" rel="noreferrer" aria-label={`${tx(item.title, lang)} — ${text.contentOpen[item.type]} ${item.platform} (${text.open})`}>
    <span className="ccard-poster" aria-hidden="true">
      {item.image ? <img src={item.image} alt="" loading="lazy" decoding="async"/> : <span className="ccard-mark">{item.type === 'video' ? <svg viewBox="0 0 24 24" focusable="false"><path d="M8 5.5v13l11-6.5z" fill="currentColor"/></svg> : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" focusable="false"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4"/></svg>}</span>}
      <span className="ccard-platform">{item.platform}</span>
    </span>
    <span className="ccard-body">
      <span className="ccard-meta">{text.contentKind[item.type]} · <time dateTime={item.date}>{formatDate(item.date, lang)}</time></span>
      <b>{tx(item.title, lang)}</b>
      <span className="ccard-summary">{tx(item.summary, lang)}</span>
      <span className="ccard-cta">{text.contentOpen[item.type]} {item.platform} <span aria-hidden="true">↗</span></span>
    </span>
  </a>
}

export default function ContentPage() {
  const { lang, theme, text, toggleLang, toggleTheme } = usePrefs()
  useMeta(text.contentMetaTitle, text.contentLead)
  const sorted = [...contentItems].sort((a, b) => b.date.localeCompare(a.date))

  return <div className="page-shell subpage">
    <Backdrop text={text}/>
    <SiteHeader current="content" lang={lang} theme={theme} text={text} onLang={toggleLang} onTheme={toggleTheme}/>
    <main id="main" tabIndex={-1} className="section-wrap">
      <header className="page-head">
        <h1>{text.contentTitle}</h1>
        <p className="page-lead">{text.contentLead}</p>
      </header>

      <section className="club glass" aria-labelledby="club-title">
        <img className="club-banner" src={club.banner} alt={text.clubBannerAlt} width="800" height="418"/>
        <div className="club-body">
          <div className="club-id"><img src={club.logo} alt="" width="46" height="46" className="org-logo"/><div><h2 id="club-title">{club.name}</h2><p>@{club.handle}</p></div></div>
          <p className="club-text">{text.clubText}</p>
          <a className="btn glass primary" href={club.url} target="_blank" rel="noreferrer" aria-label={`${text.followClub} (${text.open})`}>{text.followClub} <span aria-hidden="true">↗</span></a>
        </div>
      </section>

      {typeOrder.map((type) => {
        const list = sorted.filter((item) => item.type === type)
        return <section className="page-section" key={type} aria-labelledby={`content-${type}`}>
          <h2 id={`content-${type}`}>{text.contentTypes[type]}{list.length > 0 && <small>{list.length}</small>}</h2>
          {list.length ? <div className="content-grid">{list.map((item) => <ContentCard key={item.id} item={item} lang={lang} text={text}/>)}</div>
            : <p className="content-empty">{text.contentEmpty[type]} <a href={club.url} target="_blank" rel="noreferrer">@{club.handle}</a>.</p>}
        </section>
      })}

      {acervo.length > 0 && <section className="page-section" aria-labelledby="content-acervo">
        <h2 id="content-acervo">{text.acervoTitle}<small>{acervo.length}</small></h2>
        <p className="acervo-lead">{text.acervoLead}</p>
        <div className="acervo-grid">{acervo.map((entry) => <a key={entry.slug} className="acard glass" href={acervoHref(entry)}>
          <span className="ccard-meta">{text.acervoTypes[entry.type] ?? entry.type}{entry.updated && <> · <time dateTime={entry.updated}>{acervoDate(entry.updated, lang)}</time></>}{entry.state !== 'concluido' && <> · {text.acervoState[entry.state]}</>}</span>
          <b>{entry.title}</b>
          <span className="ccard-summary">{entry.description}</span>
          {entry.tags.length > 0 && <span className="tags">{entry.tags.slice(0, 5).map((tag) => <span key={tag}>{tag}</span>)}</span>}
          <span className="ccard-cta">{text.acervoRead} <span aria-hidden="true">→</span></span>
        </a>)}</div>
      </section>}
    </main>
    <SiteFooter text={text}/>
  </div>
}
