// Sanity checks for src/data/*.json: bilingual copy present, referenced images exist, ids unique.
import { readFileSync, existsSync } from 'node:fs'

const load = (name) => JSON.parse(readFileSync(`src/data/${name}.json`, 'utf8'))
const errors = []
const isCopy = (value) => value && typeof value['pt-BR'] === 'string' && typeof value.en === 'string' && value['pt-BR'] && value.en
const copy = (value, where) => { if (!isCopy(value)) errors.push(`${where}: missing pt-BR/en copy`) }
const image = (src, where) => { if (src && !existsSync(`public${src}`)) errors.push(`${where}: missing file public${src}`) }
const unique = (items, where) => { const seen = new Set(); for (const item of items) { if (seen.has(item.id)) errors.push(`${where}: duplicate id ${item.id}`); seen.add(item.id) } }
const trails = new Set(['rec', 'pes', 'com'])
const trailCheck = (list, where) => { if (!Array.isArray(list) || !list.length || list.some((t) => !trails.has(t))) errors.push(`${where}: invalid trails`) }

const experience = load('experience')
const entries = [...experience.highlights, ...experience.organizations]
unique(entries, 'experience')
for (const e of entries) {
  for (const key of ['role', 'period', 'summary', 'details']) copy(e[key], `experience/${e.id}.${key}`)
  image(e.logo, `experience/${e.id}.logo`); trailCheck(e.trails, `experience/${e.id}`)
}
const projects = load('projects')
unique(projects, 'projects')
for (const p of projects) {
  for (const key of ['description', 'tagline']) copy(p[key], `projects/${p.id}.${key}`)
  if (p.image) { image(p.image, `projects/${p.id}.image`); copy(p.imageAlt, `projects/${p.id}.imageAlt`) }
  if (p.caseStudy) for (const key of ['problem', 'solution', 'result']) copy(p.caseStudy[key], `projects/${p.id}.caseStudy.${key}`)
  trailCheck(p.trails, `projects/${p.id}`)
}
const details = load('details')
const nodeIds = (d) => new Set(d.diagram.layers.flatMap((layer) => layer.nodes.map((n) => n.id)))
for (const [id, d] of Object.entries(details)) {
  if (!projects.some((p) => p.id === id)) errors.push(`details/${id}: no matching project`)
  copy(d.diagramCaption, `details/${id}.diagramCaption`)
  d.metrics.forEach((m, i) => copy(m.label, `details/${id}.metrics[${i}]`))
  d.decisions.forEach((x, i) => { copy(x.title, `details/${id}.decisions[${i}].title`); copy(x.text, `details/${id}.decisions[${i}].text`) })
  for (const l of d.limits ?? []) copy(l, `details/${id}.limits`)
  const ids = nodeIds(d)
  d.diagram.layers.forEach((layer, i) => { copy(layer.title, `details/${id}.layer[${i}]`); layer.nodes.forEach((n) => { copy(n.label, `details/${id}.${n.id}.label`); if (n.sub) copy(n.sub, `details/${id}.${n.id}.sub`) }) })
  for (const [a, b] of d.diagram.edges) if (!ids.has(a) || !ids.has(b)) errors.push(`details/${id}: edge ${a}->${b} references a missing node`)
}
const profile = load('profile')
for (const group of profile.skillGroups) for (const skill of group.items) for (const e of skill.evidence) {
  const pool = e.kind === 'project' ? projects : entries
  if (!pool.some((x) => x.id === e.id)) errors.push(`skills/${skill.name}: unknown ${e.kind} ${e.id}`)
}
const gallery = load('gallery')
unique(gallery, 'gallery')
for (const g of gallery) { image(g.src, `gallery/${g.id}`); copy(g.alt, `gallery/${g.id}.alt`); copy(g.caption, `gallery/${g.id}.caption`); trailCheck(g.trails, `gallery/${g.id}`) }
const awards = load('awards')
unique(awards, 'awards')
for (const a of awards) { copy(a.title, `awards/${a.id}.title`); copy(a.context, `awards/${a.id}.context`); if (a.image) { image(a.image.src, `awards/${a.id}`); copy(a.image.alt, `awards/${a.id}.alt`) } }

if (errors.length) { console.error(errors.join('\n')); process.exit(1) }
console.log(`content ok: ${entries.length} experiences, ${projects.length} projects, ${gallery.length} photos, ${awards.length} awards`)
