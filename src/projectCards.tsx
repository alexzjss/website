// Project cards shared by the home page (featured case studies) and /projetos (the full list).
import { hasDetail, projectHref, tx, type Lang, type Project } from './content'
import type { UI } from './ui'

type CardProps = { project: Project; lang: Lang; text: UI }
const external = (project: Project) => hasDetail(project.id) ? {} : { target: '_blank', rel: 'noreferrer' }

export function ProjectLinks({ project, text }: { project: Project; text: UI }) {
  const study = hasDetail(project.id)
  return <div className="project-links">
    {study && <a className="pill primary" href={`/projetos/${project.id}`} aria-label={`${text.viewStudy}: ${project.name}`}>{text.viewStudy} <span aria-hidden="true">→</span></a>}
    {project.demo && <a className={`pill${study ? '' : ' primary'}`} href={project.demo} target="_blank" rel="noreferrer" aria-label={`${text.demo}: ${project.name} (${text.open})`}>{text.demo} <span aria-hidden="true">↗</span></a>}
    <a className="pill" href={project.url} target="_blank" rel="noreferrer" aria-label={`${text.code}: ${project.name} — GitHub (${text.open})`}>{text.code} <span aria-hidden="true">↗</span></a>
  </div>
}

export function CaseStudyCard({ project, lang, text }: CardProps) {
  return <article className="case-study" style={{ viewTransitionName: `c-${project.id}` }}>
    {project.image && <a className="case-media" href={projectHref(project)} {...external(project)} tabIndex={-1} aria-hidden="true"><img src={project.image} alt="" width="1200" height="750" style={hasDetail(project.id) ? { viewTransitionName: `img-${project.id}` } : undefined} loading="lazy" decoding="async"/></a>}
    <div className="case-body"><p className="eyebrow">{text.caseLabel} · {text.areas[project.area]}</p><h3>{project.name}</h3><p className="case-lead">{tx(project.description, lang)}</p>
      {project.caseStudy && <dl className="case-facts"><div><dt>{text.problem}</dt><dd>{tx(project.caseStudy.problem, lang)}</dd></div><div><dt>{text.solution}</dt><dd>{tx(project.caseStudy.solution, lang)}</dd></div><div><dt>{text.result}</dt><dd>{tx(project.caseStudy.result, lang)}</dd></div></dl>}
      <div className="tags">{project.stack.map((tech) => <span key={tech}>{tech}</span>)}</div><ProjectLinks project={project} text={text}/></div>
  </article>
}

export function ProjectCard({ project, lang, text }: CardProps) {
  return <article className={`pcard${project.size === 'wide' ? ' wide' : ''}${project.image ? ' has-image' : ''}`} style={{ viewTransitionName: `p-${project.id}` }}>
    {project.image && <a className={`pcard-media${project.fit === 'contain' ? ' contain' : ''}`} href={projectHref(project)} {...external(project)} tabIndex={-1} aria-hidden="true"><img src={project.image} alt="" width="1200" height="750" style={{ objectPosition: project.position, ...(hasDetail(project.id) ? { viewTransitionName: `img-${project.id}` } : {}) }} loading="lazy" decoding="async"/></a>}
    <div className="pcard-body"><p className="eyebrow"><span className={`area-dot area-${project.area}`} aria-hidden="true"/>{text.areas[project.area]} · {text.status[project.status]}</p><h3>{project.name}</h3><p className="tagline">{tx(project.tagline, lang)}</p><p className="desc">{tx(project.description, lang)}</p><div className="tags">{project.stack.slice(0, 5).map((tech) => <span key={tech}>{tech}</span>)}</div><ProjectLinks project={project} text={text}/></div>
  </article>
}
