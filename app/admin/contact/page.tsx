'use client'

import { useState, useEffect } from 'react'
import { AdminShell } from '@/components/admin/AdminShell'
import { SaveBar } from '@/components/admin/SaveBar'

interface SocialLink { label: string; href: string }
interface ContactData { email: string; location: string; timezone: string; languages: string; social: SocialLink[]; footerBuild: string }

export default function ContactEditor() {
  const [data, setData] = useState<ContactData | null>(null)

  useEffect(() => {
    fetch('/api/content/contact').then((r) => r.json()).then(setData)
  }, [])

  if (!data) return <AdminShell><div style={{ color: '#6B6862', fontSize: 11 }}>Loading...</div></AdminShell>

  function setField(key: keyof ContactData, val: unknown) {
    setData((prev) => prev ? { ...prev, [key]: val } : prev)
  }

  function updateSocial(i: number, field: keyof SocialLink, val: string) {
    const next = data!.social.map((s, idx) => idx === i ? { ...s, [field]: val } : s)
    setField('social', next)
  }

  return (
    <AdminShell>
      <h1 className="admin-page-title">08 · Contact</h1>
      <p className="admin-page-subtitle">Email, location, social links, footer</p>

      <div className="admin-card">
        <div className="admin-card-title">Contact info</div>
        <div className="admin-field">
          <label className="admin-label">Email</label>
          <input className="admin-input" type="email" value={data.email} onChange={(e) => setField('email', e.target.value)} />
        </div>
        <div className="admin-field">
          <label className="admin-label">Location</label>
          <input className="admin-input" value={data.location} onChange={(e) => setField('location', e.target.value)} />
        </div>
        <div className="admin-field">
          <label className="admin-label">Timezone (IANA format, e.g. Europe/Berlin)</label>
          <input className="admin-input" value={data.timezone} onChange={(e) => setField('timezone', e.target.value)} />
        </div>
        <div className="admin-field">
          <label className="admin-label">Languages</label>
          <input className="admin-input" value={data.languages} onChange={(e) => setField('languages', e.target.value)} />
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-card-title">Social links</div>
        {data.social.map((s, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: 12, marginBottom: 12 }}>
            <div>
              <label className="admin-label">Label</label>
              <input className="admin-input" value={s.label} onChange={(e) => updateSocial(i, 'label', e.target.value)} />
            </div>
            <div>
              <label className="admin-label">URL</label>
              <input className="admin-input" value={s.href} onChange={(e) => updateSocial(i, 'href', e.target.value)} />
            </div>
          </div>
        ))}
      </div>

      <div className="admin-card">
        <div className="admin-card-title">Footer</div>
        <div className="admin-field">
          <label className="admin-label">Build credit text</label>
          <input className="admin-input" value={data.footerBuild} onChange={(e) => setField('footerBuild', e.target.value)} />
        </div>
      </div>

      <SaveBar section="contact" data={data} />
    </AdminShell>
  )
}
