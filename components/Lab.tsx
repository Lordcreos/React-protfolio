'use client'
import { useState } from 'react'
import { Reveal } from './Reveal'

interface LabCard {
  title: string
  meta: string
  body: string
  stack: string[]
  link: string | null
  image: string | null
}

interface LabProps {
  cards: LabCard[]
}

const LAB_PAGE_SIZE = 6

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

export function Lab({ cards }: LabProps) {
  const [page, setPage] = useState(0)
  const totalPages = Math.ceil(cards.length / LAB_PAGE_SIZE)
  const shown = cards.slice(page * LAB_PAGE_SIZE, (page + 1) * LAB_PAGE_SIZE)

  return (
    <section id="lab" style={{ borderTop: '1px solid var(--hairline)', background: 'rgba(19,19,22,0.45)' }}>
      <div className="container" style={{ paddingTop: 128, paddingBottom: 128 }}>
        <Reveal style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 32, gap: 24, flexWrap: 'wrap' }}>
          <div className="sec-label">04 / Lab</div>
          <h2 className="sec-title" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', margin: 0 }}>
            Where I tinker with <em style={{ fontStyle: 'italic', color: 'var(--signal)' }}>agents</em>.
          </h2>
        </Reveal>
        <Reveal>
          <p className="bone-muted" style={{ maxWidth: 560, fontSize: 15, lineHeight: 1.6, margin: '0 0 64px 0' }}>
            Side projects that go beyond IDE-level AI assistance — designing multi-agent systems, prompt evaluation loops, and tool-calling architectures.
          </p>
        </Reveal>
        <Reveal>
          <div key={page} className="lab-cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}>
            {shown.map((c, i) => (
              <div key={i} className={`lab-card ${c.link?.trim() ? 'lab-card-link' : ''}`}>
                {c.link?.trim() && (
                  <a
                    className="lab-card-cover-link"
                    href={c.link.trim()}
                    target={/^https?:\/\//i.test(c.link.trim()) ? '_blank' : undefined}
                    rel={/^https?:\/\//i.test(c.link.trim()) ? 'noreferrer' : undefined}
                    aria-label={`Open ${c.title}`}
                  />
                )}
                <div style={{ aspectRatio: '16/9', background: 'var(--ink-3)', overflow: 'hidden', position: 'relative' }}>
                  {c.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={c.image}
                      alt={c.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span className="mono bone-faint" style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase' }}>[ coming soon ]</span>
                    </div>
                  )}
                </div>
                <div style={{ marginTop: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
                  <h3 className="display" style={{ fontSize: 'clamp(1.4rem, 2vw, 1.9rem)', color: 'var(--bone)', margin: 0, lineHeight: 1.1 }}>{c.title}</h3>
                  <span className="arrow-up" style={{ fontSize: 22, lineHeight: 1 }}>↗</span>
                </div>
                {c.link?.trim() && (
                  <div className="lab-preview-label mono">
                    Preview available
                  </div>
                )}
                <div className="mono bone-faint" style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: 12 }}>{c.meta}</div>
                <p className="bone-muted" style={{ fontSize: 14, lineHeight: 1.6, margin: '16px 0 0 0' }}>{c.body}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 24, paddingTop: 24, borderTop: '1px solid var(--hairline)' }}>
                  {c.stack.map((s) => <span key={s} className="tag">{s}</span>)}
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 64, paddingTop: 24, borderTop: '1px solid var(--hairline)' }}>
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
      </div>
    </section>
  )
}
