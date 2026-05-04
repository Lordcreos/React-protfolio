'use client'

import { useState, useEffect } from 'react'
import { AdminShell } from '@/components/admin/AdminShell'
import { SaveBar } from '@/components/admin/SaveBar'

interface Principle { n: string; t: string; b: string }
interface ApproachData { headline: string; principles: Principle[] }

export default function ApproachEditor() {
  const [data, setData] = useState<ApproachData | null>(null)

  useEffect(() => {
    fetch('/api/content/approach').then((r) => r.json()).then(setData)
  }, [])

  if (!data) return <AdminShell><div style={{ color: '#6B6862', fontSize: 11 }}>Loading...</div></AdminShell>

  function updatePrinciple(i: number, field: keyof Principle, val: string) {
    setData((prev) => prev ? {
      ...prev,
      principles: prev.principles.map((p, idx) => idx === i ? { ...p, [field]: val } : p)
    } : prev)
  }

  return (
    <AdminShell>
      <h1 className="admin-page-title">06 · Approach</h1>
      <p className="admin-page-subtitle">Working principles & philosophy</p>

      <div className="admin-card">
        <div className="admin-card-title">Section headline</div>
        <div className="admin-field">
          <label className="admin-label">Headline (shown above principles — use \n for line break)</label>
          <textarea className="admin-textarea" rows={2} value={data.headline} onChange={(e) => setData((prev) => prev ? { ...prev, headline: e.target.value } : prev)} />
        </div>
      </div>

      {data.principles.map((p, i) => (
        <div key={i} className="admin-card">
          <div className="admin-card-title">Principle {p.n}</div>
          <div className="admin-field">
            <label className="admin-label">Title</label>
            <input className="admin-input" value={p.t} onChange={(e) => updatePrinciple(i, 't', e.target.value)} />
          </div>
          <div className="admin-field">
            <label className="admin-label">Body</label>
            <textarea className="admin-textarea" rows={3} value={p.b} onChange={(e) => updatePrinciple(i, 'b', e.target.value)} />
          </div>
        </div>
      ))}

      <SaveBar section="approach" data={data} />
    </AdminShell>
  )
}
