import { useId } from 'react'
import { tx, type Diagram as DiagramData, type Lang } from './content'

type Box = { id: string; x: number; y: number; w: number; h: number; layer: number; label: string; sub?: string }

function layout(data: DiagramData, lang: Lang, vertical: boolean) {
  const nodeW = vertical ? 156 : 176, nodeH = vertical ? 62 : 68
  const gapMain = vertical ? 46 : 62, gapCross = vertical ? 14 : 16, pad = 12, titleH = 26
  const counts = data.layers.map((layer) => layer.nodes.length)
  const longest = Math.max(...counts) * (vertical ? nodeW : nodeH) + (Math.max(...counts) - 1) * gapCross
  const boxes: Box[] = []
  data.layers.forEach((layer, index) => {
    const span = layer.nodes.length * (vertical ? nodeW : nodeH) + (layer.nodes.length - 1) * gapCross
    const offset = (longest - span) / 2
    layer.nodes.forEach((node, position) => {
      const along = offset + position * ((vertical ? nodeW : nodeH) + gapCross)
      boxes.push(vertical
        ? { id: node.id, layer: index, x: pad + along, y: pad + index * (titleH + nodeH + gapMain) + titleH, w: nodeW, h: nodeH, label: tx(node.label, lang), sub: node.sub && tx(node.sub, lang) }
        : { id: node.id, layer: index, x: pad + index * (nodeW + gapMain), y: pad + titleH + along, w: nodeW, h: nodeH, label: tx(node.label, lang), sub: node.sub && tx(node.sub, lang) })
    })
  })
  const width = vertical ? pad * 2 + longest : pad * 2 + data.layers.length * nodeW + (data.layers.length - 1) * gapMain
  const height = vertical ? pad * 2 + data.layers.length * (titleH + nodeH) + (data.layers.length - 1) * gapMain : pad * 2 + titleH + longest
  const titles = data.layers.map((layer, index) => vertical
    ? { x: pad, y: pad + index * (titleH + nodeH + gapMain) + 16, text: tx(layer.title, lang) }
    : { x: pad + index * (nodeW + gapMain), y: pad + 16, text: tx(layer.title, lang) })
  return { boxes, titles, width, height }
}

function Graph({ data, lang, vertical, label }: { data: DiagramData; lang: Lang; vertical: boolean; label?: string }) {
  const marker = useId().replace(/:/g, '')
  const { boxes, titles, width, height } = layout(data, lang, vertical)
  const byId = Object.fromEntries(boxes.map((box) => [box.id, box]))
  const last = data.layers.length - 1
  return <svg className={`dg ${vertical ? 'dg-v' : 'dg-h'}`} viewBox={`0 0 ${width} ${height}`} role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true} focusable="false">
    <defs><marker id={marker} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M1 1 9 5 1 9" className="dg-arrow"/></marker></defs>
    {titles.map((title) => <text key={title.text} className="dg-title" x={title.x} y={title.y}>{title.text.toUpperCase()}</text>)}
    {data.edges.map(([from, to]) => {
      const a = byId[from], b = byId[to]
      if (!a || !b) return null
      const path = vertical
        ? `M${a.x + a.w / 2} ${a.y + a.h} C${a.x + a.w / 2} ${a.y + a.h + 26} ${b.x + b.w / 2} ${b.y - 26} ${b.x + b.w / 2} ${b.y - 2}`
        : `M${a.x + a.w} ${a.y + a.h / 2} C${a.x + a.w + 30} ${a.y + a.h / 2} ${b.x - 30} ${b.y + b.h / 2} ${b.x - 2} ${b.y + b.h / 2}`
      return <path key={`${from}-${to}`} className="dg-edge" d={path} markerEnd={`url(#${marker})`}/>
    })}
    {boxes.map((box) => <g key={box.id} className={`dg-node${box.layer === 0 ? ' dg-first' : box.layer === last ? ' dg-last' : ''}`}>
      <rect x={box.x} y={box.y} width={box.w} height={box.h} rx="16"/>
      <text className="dg-label" x={box.x + box.w / 2} y={box.y + (box.sub ? box.h / 2 - 4 : box.h / 2 + 5)} textAnchor="middle">{box.label}</text>
      {box.sub && <text className="dg-sub" x={box.x + box.w / 2} y={box.y + box.h / 2 + 15} textAnchor="middle">{box.sub}</text>}
    </g>)}
  </svg>
}

export default function ArchDiagram({ data, lang, caption, name }: { data: DiagramData; lang: Lang; caption: string; name: string }) {
  const summary = `${name}: ${data.layers.map((layer) => `${tx(layer.title, lang)} (${layer.nodes.map((node) => tx(node.label, lang)).join(', ')})`).join(' → ')}`
  return <figure className="diagram">
    <div className="diagram-canvas glass"><Graph data={data} lang={lang} vertical={false} label={summary}/><Graph data={data} lang={lang} vertical/></div>
    <figcaption>{caption}</figcaption>
  </figure>
}
