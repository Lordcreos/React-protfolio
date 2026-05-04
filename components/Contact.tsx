'use client'

import { useState, useEffect } from 'react'
import { Reveal } from './Reveal'

interface SocialLink { label: string; href: string }
interface ContactProps {
  email: string
  location: string
  timezone: string
  languages: string
  social: SocialLink[]
  footerBuild: string
}

export function Contact({ email, location, timezone, languages, social, footerBuild }: ContactProps) {
  const [time, setTime] = useState('')

  useEffect(() => {
    const tick = () => {
      try {
        const t = new Intl.DateTimeFormat('en-DE', { timeZone: timezone, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).format(new Date())
        setTime(t)
      } catch {
        setTime(new Date().toLocaleTimeString())
      }
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [timezone])

  return (
    <section id="contact" className="container" style={{ paddingTop: 128, paddingBottom: 64, borderTop: '1px solid var(--hairline)' }}>
      <Reveal>
        <h2 className="display" style={{ fontSize: 'clamp(3rem, 12vw, 10rem)', letterSpacing: '-0.04em', lineHeight: 0.95, margin: 0, fontWeight: 300, color: 'var(--bone)' }}>
          Have a brief?<br />
          Ship me an <a href={`mailto:${email}`} className="mail-link">email</a>.
        </h2>
      </Reveal>

      <Reveal className="grid12" style={{ marginTop: 96 }}>
        <div className="contact-info-col" style={{ gridColumn: 'span 3' }}>
          <div className="mono bone-faint" style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 8 }}>Email</div>
          <div style={{ fontSize: 15, color: 'var(--bone)' }}>
            <a href={`mailto:${email}`} className="ext-link">{email}</a>
          </div>
        </div>
        <div className="contact-info-col" style={{ gridColumn: 'span 3' }}>
          <div className="mono bone-faint" style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 8 }}>Based in</div>
          <div style={{ fontSize: 15, color: 'var(--bone)' }}>{location}</div>
        </div>
        <div className="contact-info-col" style={{ gridColumn: 'span 3' }}>
          <div className="mono bone-faint" style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 8 }}>Languages</div>
          <div style={{ fontSize: 15, color: 'var(--bone)' }}>{languages}</div>
        </div>
        <div className="contact-info-col" style={{ gridColumn: 'span 3' }}>
          <div className="mono bone-faint" style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 8 }}>Elsewhere</div>
          <div style={{ fontSize: 15, color: 'var(--bone)', display: 'flex', flexDirection: 'column', gap: 6 }}>
            {social.map((s) => (
              <a key={s.label} href={s.href} className="ext-link">{s.label} ↗</a>
            ))}
          </div>
        </div>
      </Reveal>

      <div style={{ marginTop: 128, paddingTop: 32, borderTop: '1px solid var(--hairline)', display: 'flex', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }} className="mono bone-faint">
        <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase' }}>© 2026 Leonardo Sánchez · All rights reserved</div>
        <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          <span style={{ color: 'var(--signal)' }}>●</span> Berlin {time}
        </div>
        <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase' }}>{footerBuild}</div>
      </div>
    </section>
  )
}
