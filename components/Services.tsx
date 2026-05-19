'use client'
import { useState } from 'react'
import { Reveal } from './Reveal'

interface ServiceItem {
  label: string
  title: string
  body: string
  priceLabel: string
  price: string
}

interface ServicesProps { items: ServiceItem[] }

const PER_PAGE = 3

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

export function Services({ items }: ServicesProps) {
  const isCarousel = items.length > PER_PAGE
  const [page, setPage] = useState(0)
  const totalPages = Math.ceil(items.length / PER_PAGE)
  const shown = isCarousel ? items.slice(page * PER_PAGE, (page + 1) * PER_PAGE) : items

  return (
    <section id="services" style={{ borderTop: '1px solid var(--hairline)', background: 'rgba(19,19,22,0.45)' }}>
      <div className="container" style={{ paddingTop: 128, paddingBottom: 128 }}>
        <Reveal style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 64, gap: 24, flexWrap: 'wrap' }}>
          <div className="sec-label">06 / Services</div>
          <h2 className="sec-title" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', margin: 0, maxWidth: '18ch', textAlign: 'right' }}>
            Services that turn ideas into <em style={{ fontStyle: 'italic', color: 'var(--signal)' }}>real requests</em>.
          </h2>
        </Reveal>
        <Reveal>
          <div key={page} className={`services-grid${isCarousel ? ' services-page-fade' : ''}`}>
            {shown.map((s) => (
              <div key={s.title} className="service-cell">
                <div className="mono bone-faint" style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase' }}>{s.label}</div>
                <h3 className="display" style={{ fontSize: 'clamp(1.4rem, 2.2vw, 1.9rem)', color: 'var(--bone)', margin: '16px 0 16px 0', lineHeight: 1.1, fontWeight: 300 }}>{s.title}</h3>
                <p className="bone-muted" style={{ fontSize: 14, lineHeight: 1.6, margin: '0 0 32px 0' }}>{s.body}</p>
                <div style={{ marginBottom: 24 }}>
                  <div className="mono bone-faint" style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase' }}>{s.priceLabel}</div>
                  <div className="mono signal" style={{ fontSize: 22, marginTop: 6 }}>{s.price}</div>
                </div>
                <a href="#contact" className="service-apply">Request service -&gt;</a>
              </div>
            ))}
          </div>
          {isCarousel && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 24, paddingTop: 24, borderTop: '1px solid var(--hairline)' }}>
              <NavBtn onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}>
                &lt;- prev
              </NavBtn>
              <span className="mono bone-faint" style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                [ {page + 1} / {totalPages} ]
              </span>
              <NavBtn onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page === totalPages - 1}>
                next -&gt;
              </NavBtn>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  )
}
