'use client'

import { useState, useEffect } from 'react'
import { AdminShell } from '@/components/admin/AdminShell'
import { SaveBar } from '@/components/admin/SaveBar'

export default function NowEditor() {
  const [data, setData] = useState<Record<string, string> | null>(null)

  useEffect(() => {
    fetch('/api/content/now').then((r) => r.json()).then(setData)
  }, [])

  if (!data) return <AdminShell><div style={{ color: '#6B6862', fontSize: 11 }}>Loading...</div></AdminShell>

  function setField(key: string, val: string) {
    setData((prev) => prev ? { ...prev, [key]: val } : prev)
  }

  return (
    <AdminShell>
      <h1 className="admin-page-title">02 · Now</h1>
      <p className="admin-page-subtitle">Current status statement shown below the hero</p>

      <div className="admin-card">
        <div className="admin-card-title">Content</div>
        <div className="admin-field">
          <label className="admin-label">Company name</label>
          <input className="admin-input" value={data.company} onChange={(e) => setField('company', e.target.value)} />
        </div>
        <div className="admin-field">
          <label className="admin-label">University name</label>
          <input className="admin-input" value={data.university} onChange={(e) => setField('university', e.target.value)} />
        </div>
        <div className="admin-field">
          <label className="admin-label">Highlighted activity (shown in signal orange, italic)</label>
          <input className="admin-input" value={data.highlight} onChange={(e) => setField('highlight', e.target.value)} />
        </div>
      </div>

      <div className="admin-card" style={{ opacity: 0.6 }}>
        <div className="admin-card-title">Preview (read-only)</div>
        <p style={{ fontSize: 14, color: '#A8A39A', lineHeight: 1.6, margin: 0 }}>
          Currently: Senior Frontend Engineer at{' '}
          <strong style={{ color: '#e8e5df' }}>{data.company}</strong>, pursuing an M.Sc. in AI at{' '}
          <strong style={{ color: '#e8e5df' }}>{data.university}</strong>, and building{' '}
          <em style={{ color: '#FF5B1F' }}>{data.highlight}</em> for fun.
        </p>
      </div>

      <SaveBar section="now" data={data} />
    </AdminShell>
  )
}
