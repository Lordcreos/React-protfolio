'use client'

import React, { useState, useEffect } from 'react'

interface Metric { n: string; label: string }
interface WordConfig { t: string; italic?: boolean; signal?: boolean; br?: boolean }

interface HeroProps {
  headlineConfig: WordConfig[]
  role: string
  location: string
  availability: string
  bio: string
  metrics: Metric[]
  marqueeStack: string[]
}

export function Hero({ headlineConfig, role, location, availability, bio, metrics, marqueeStack }: HeroProps) {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 80); return () => clearTimeout(t) }, [])

  const marqueeSeq = [...marqueeStack, ...marqueeStack]

  return (
    <section id="top" style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      <video
        autoPlay loop muted playsInline preload="auto" aria-hidden
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0, opacity: 0.55, mixBlendMode: 'screen', pointerEvents: 'none' }}
      >
        <source src="/assets/hero.mp4" type="video/mp4" />
      </video>

      <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', background: 'radial-gradient(ellipse at 30% 60%, rgba(10,10,11,0.55) 0%, rgba(10,10,11,0.85) 60%, rgba(10,10,11,0.95) 100%)' }} />
      <div className="hero-bg-radial" style={{ zIndex: 2 }} />

      <svg className="spin-slow hero-deco-svg" width="220" height="220" viewBox="0 0 220 220" style={{ position: 'absolute', top: 110, right: 60, opacity: 0.4, pointerEvents: 'none', zIndex: 3 }} aria-hidden>
        <circle cx="110" cy="110" r="100" fill="none" stroke="var(--signal)" strokeWidth="1" strokeDasharray="2 8" />
        <circle cx="110" cy="110" r="78" fill="none" stroke="var(--signal)" strokeWidth="1" strokeDasharray="1 6" opacity="0.6" />
        <circle cx="110" cy="110" r="3" fill="var(--signal)" opacity="0.7" />
      </svg>

      <div className="container grid12" style={{ paddingTop: 128, paddingBottom: 64, position: 'relative', zIndex: 3 }}>
        <div style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 56, flexWrap: 'wrap', gap: 16 }} className="mono bone-faint hero-header-row">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            <span className="pulse-dot" />
            <span>[ {location} ]</span>
          </div>
          <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase' }}>{role}</div>
          <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase' }}>[ {availability} ]</div>
        </div>

        <h1 className="display" style={{ gridColumn: '1 / -1', fontSize: 'clamp(3.5rem, 11vw, 11rem)', fontWeight: 300, lineHeight: 0.95, letterSpacing: '-0.04em', margin: 0, color: 'var(--bone)', maxWidth: '14ch' }}>
          {headlineConfig.map((w, i) => (
            <React.Fragment key={i}>
              <span
                className={`hero-word ${loaded ? 'in' : ''}`}
                style={{ transitionDelay: `${i * 90}ms`, fontStyle: w.italic ? 'italic' : 'normal', color: w.signal ? 'var(--signal)' : 'inherit', marginRight: w.t === '.' ? 0 : '0.22em' }}
              >{w.t}</span>
              {w.br && <br />}
            </React.Fragment>
          ))}
        </h1>

        <div className="grid12" style={{ gridColumn: '1 / -1', marginTop: 48 }}>
          <div className="hero-bio-col" style={{ gridColumn: 'span 7', display: 'flex', flexDirection: 'column', gap: 24 }}>
            <p className="bone-muted" style={{ maxWidth: 480, fontSize: 16, lineHeight: 1.6, margin: 0 }}>{bio}</p>
          </div>
          <div className="hero-metrics-col hero-metrics-grid" style={{ gridColumn: 'span 5', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            {metrics.map((m, i) => (
              <div key={i} style={{ borderTop: '1px solid var(--hairline)', paddingTop: 16 }}>
                <div className="mono" style={{ fontSize: 30, color: 'var(--bone)', lineHeight: 1 }}>{m.n}</div>
                <div className="mono" style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--bone-faint)', marginTop: 8 }}>{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="marquee" style={{ position: 'absolute', bottom: 32, left: 0, right: 0 }}>
        <div className="marquee-track mono" style={{ fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--bone-faint)' }}>
          {[0, 1].map((rep) => (
            <span key={rep} style={{ display: 'inline-flex', gap: 28, paddingRight: 28 }}>
              {marqueeSeq.map((s, i) => (
                <span key={`${rep}-${i}`} style={{ color: s === '◆' ? 'var(--signal)' : 'inherit' }}>{s}</span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
