'use client'

import { useState, useEffect } from 'react'

const links = [
  { n: '01', label: 'Work', href: '#work' },
  { n: '02', label: 'Lab', href: '#lab' },
  { n: '03', label: 'Approach', href: '#approach' },
  { n: '04', label: 'Services', href: '#services' },
  { n: '05', label: 'Contact', href: '#contact' },
]

export function Nav({ cvUrl }: { cvUrl?: string }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  function close() { setMenuOpen(false) }

  return (
    <>
      <nav className={`nav-bar ${scrolled ? 'scrolled' : ''}`} style={{ position: 'sticky', top: 0, zIndex: 50 }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 20, paddingBottom: 20 }}>
          <a href="#top" className="ls-mark" style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
            <span className="display" style={{ fontStyle: 'italic', fontSize: 26, fontWeight: 300, lineHeight: 1 }}>LS</span>
            <span className="ls-square" style={{ width: 8, height: 8, background: 'var(--signal)', display: 'inline-block' }} />
          </a>

          <div className="nav-links-wrap">
            {links.map((l) => (
              <a key={l.n} href={l.href} className="nav-link mono" style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.2em' }}>
                <span className="num">{l.n}</span>{l.label}
              </a>
            ))}
          </div>

          <div className="nav-ctas-wrap">
            {cvUrl && (
              <a href={cvUrl} download className="cta-pill">
                <span aria-hidden>↓</span> CV
              </a>
            )}
            <a href="#contact" className="cta-pill">Get in touch <span aria-hidden>↘</span></a>
          </div>

          <button
            className={`nav-hamburger-btn ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div className={`nav-mobile-overlay ${menuOpen ? 'open' : ''}`}>
        {links.map((l) => (
          <a key={l.n} href={l.href} className="nav-mobile-link" onClick={close}>
            {l.label}
          </a>
        ))}
        <div className="nav-mobile-ctas">
          {cvUrl && (
            <a href={cvUrl} download className="cta-pill" onClick={close}>
              <span aria-hidden>↓</span> CV
            </a>
          )}
          <a href="#contact" className="cta-pill" onClick={close}>Get in touch <span aria-hidden>↘</span></a>
        </div>
      </div>
    </>
  )
}
