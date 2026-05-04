'use client'
import { useState } from 'react'
import { Reveal } from './Reveal'

interface Metric { n: string; label: string }
interface WorkImage { src: string; alt: string }

function NavBtn({ onClick, disabled, children }: { onClick: () => void; disabled: boolean; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="mono"
      style={{
        background: 'transparent',
        border: '1px solid var(--hairline)',
        color: disabled ? 'var(--bone-faint)' : 'var(--bone-muted)',
        fontSize: 11,
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        padding: '10px 24px',
        cursor: disabled ? 'default' : 'pointer',
        transition: 'border-color 0.2s, color 0.2s',
        opacity: disabled ? 0.4 : 1,
      }}
      onMouseEnter={e => { if (!disabled) { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--signal)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--signal)' } }}
      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--hairline)'; (e.currentTarget as HTMLButtonElement).style.color = disabled ? 'var(--bone-faint)' : 'var(--bone-muted)' }}
    >
      {children}
    </button>
  )
}

interface WorkCardProps {
  index: number
  year: string
  client: string
  sector: string
  title: string
  body: string
  metrics: Metric[]
  tags: string[]
  image: WorkImage | null
  imageLeft: boolean
}

function WorkCard({ index, year, client, sector, title, body, metrics, tags, image, imageLeft }: WorkCardProps) {
  const Img = (
    <div className="work-col-img" style={{ gridColumn: imageLeft ? '1 / span 7' : '6 / span 7' }}>
      <div className="work-img-wrap">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image.src} alt={image.alt} className="work-img" />
        ) : (
          <div className="placeholder">[ no image yet ]</div>
        )}
      </div>
    </div>
  )

  const Txt = (
    <div className="work-col-txt" style={{ gridColumn: imageLeft ? '8 / span 5' : '1 / span 5', paddingLeft: imageLeft ? 32 : 0, paddingRight: imageLeft ? 0 : 32, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
        <span className="mono signal" style={{ fontSize: 11, letterSpacing: '0.2em' }}>[ {String(index).padStart(2, '0')} ]</span>
        <span style={{ flex: 1, height: 1, background: 'var(--hairline)' }} />
        <span className="mono bone-faint" style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase' }}>{year}</span>
      </div>
      <div className="mono bone-faint" style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 8 }}>{client} · {sector}</div>
      <h3 className="display" style={{ fontSize: 'clamp(1.6rem, 2.6vw, 2.6rem)', color: 'var(--bone)', margin: '0 0 24px 0', lineHeight: 1.05 }}>{title}</h3>
      <p className="bone-muted" style={{ fontSize: 15, lineHeight: 1.6, margin: '0 0 32px 0' }}>{body}</p>

      <div style={{ display: 'flex', gap: 32, marginBottom: 32, flexWrap: 'wrap' }}>
        {metrics.map((m, i) => (
          <div key={i}>
            <div className="mono signal" style={{ fontSize: 22 }}>{m.n}</div>
            <div className="mono bone-faint" style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: 6 }}>{m.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {tags.map((t) => <span key={t} className="tag">{t}</span>)}
      </div>
    </div>
  )

  return (
    <Reveal className="grid12 work-card-grid" style={{ alignItems: 'center' }}>
      {imageLeft ? <>{Img}{Txt}</> : <>{Txt}{Img}</>}
    </Reveal>
  )
}

interface WorkProps {
  cards: WorkCardProps[]
}

const WORK_PAGE_SIZE = 3

export function Work({ cards }: WorkProps) {
  const [page, setPage] = useState(0)
  const totalPages = Math.ceil(cards.length / WORK_PAGE_SIZE)
  const shown = cards.slice(page * WORK_PAGE_SIZE, (page + 1) * WORK_PAGE_SIZE)

  return (
    <section id="work" className="container" style={{ paddingTop: 128, paddingBottom: 128, borderTop: '1px solid var(--hairline)' }}>
      <Reveal style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 80, gap: 24, flexWrap: 'wrap' }}>
        <div className="sec-label">03 / Selected work</div>
        <h2 className="sec-title" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', margin: 0 }}>
          Selected <em style={{ fontStyle: 'italic', color: 'var(--bone-muted)' }}>work</em>.
        </h2>
      </Reveal>
      <Reveal>
        <div key={page} className="work-cards-list" style={{ display: 'flex', flexDirection: 'column', gap: 128 }}>
          {shown.map((c) => <WorkCard key={c.index} {...c} />)}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 80, paddingTop: 24, borderTop: '1px solid var(--hairline)' }}>
          <NavBtn onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}>
            ← prev
          </NavBtn>
          <span className="mono bone-faint" style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            [ {page + 1} / {totalPages} ]
          </span>
          <NavBtn onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page === totalPages - 1}>
            next →
          </NavBtn>
        </div>
      </Reveal>
    </section>
  )
}
