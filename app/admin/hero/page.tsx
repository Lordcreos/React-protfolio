'use client'

import { useState, useEffect, useRef } from 'react'
import { AdminShell } from '@/components/admin/AdminShell'
import { SaveBar } from '@/components/admin/SaveBar'

function CvUploader({ onUploaded }: { onUploaded: (url: string) => void }) {
  const [status, setStatus] = useState<'idle' | 'uploading' | 'done' | 'error'>('idle')
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleFile(file: File) {
    if (file.type !== 'application/pdf') { setStatus('error'); return }
    setStatus('uploading')
    const fd = new FormData()
    fd.append('file', file)
    const res = await fetch('/api/upload', { method: 'POST', body: fd })
    if (!res.ok) { setStatus('error'); return }
    const { src } = await res.json()
    onUploaded(src)
    setStatus('done')
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
      <input ref={inputRef} type="file" accept="application/pdf" style={{ display: 'none' }} onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f) }} />
      <button
        type="button"
        className="admin-btn"
        onClick={() => inputRef.current?.click()}
        disabled={status === 'uploading'}
        style={{ opacity: status === 'uploading' ? 0.5 : 1 }}
      >
        {status === 'uploading' ? '↑ Uploading…' : '↑ Upload PDF'}
      </button>
      {status === 'done' && <span className="admin-status success">✓ Uploaded — save to apply</span>}
      {status === 'error' && <span className="admin-status error">✗ Error — PDF only</span>}
    </div>
  )
}

interface Metric { n: string; label: string }

export default function HeroEditor() {
  const [data, setData] = useState<Record<string, unknown> | null>(null)

  useEffect(() => {
    fetch('/api/content/hero').then((r) => r.json()).then(setData)
  }, [])

  if (!data) return (
    <AdminShell>
      <div style={{ color: '#6B6862', fontSize: 11, letterSpacing: '0.1em' }}>Loading...</div>
    </AdminShell>
  )

  const metrics: Metric[] = data.metrics as Metric[]
  const marquee: string[] = data.marqueeStack as string[]

  function setField(key: string, val: unknown) {
    setData((prev) => prev ? { ...prev, [key]: val } : prev)
  }

  function setMetric(i: number, field: 'n' | 'label', val: string) {
    const next = metrics.map((m, idx) => idx === i ? { ...m, [field]: val } : m)
    setField('metrics', next)
  }

  return (
    <AdminShell>
      <h1 className="admin-page-title">01 · Hero</h1>
      <p className="admin-page-subtitle">Main banner — headline, bio, metrics, availability</p>

      <div className="admin-card">
        <div className="admin-card-title">Identity</div>
        <div className="admin-field">
          <label className="admin-label">Role / tagline</label>
          <input className="admin-input" value={data.role as string} onChange={(e) => setField('role', e.target.value)} />
        </div>
        <div className="admin-field">
          <label className="admin-label">Location</label>
          <input className="admin-input" value={data.location as string} onChange={(e) => setField('location', e.target.value)} />
        </div>
        <div className="admin-field">
          <label className="admin-label">Availability</label>
          <input className="admin-input" value={data.availability as string} onChange={(e) => setField('availability', e.target.value)} />
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-card-title">Bio paragraph</div>
        <div className="admin-field">
          <textarea className="admin-textarea" rows={4} value={data.bio as string} onChange={(e) => setField('bio', e.target.value)} />
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-card-title">Metrics (4 stats)</div>
        {metrics.map((m, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 12, marginBottom: 12 }}>
            <div>
              <label className="admin-label">Value</label>
              <input className="admin-input" value={m.n} onChange={(e) => setMetric(i, 'n', e.target.value)} />
            </div>
            <div>
              <label className="admin-label">Label</label>
              <input className="admin-input" value={m.label} onChange={(e) => setMetric(i, 'label', e.target.value)} />
            </div>
          </div>
        ))}
      </div>

      <div className="admin-card">
        <div className="admin-card-title">Marquee stack (comma-separated, use ◆ as separator)</div>
        <div className="admin-field">
          <textarea
            className="admin-textarea"
            rows={3}
            value={marquee.join(', ')}
            onChange={(e) => setField('marqueeStack', e.target.value.split(',').map((s) => s.trim()).filter(Boolean))}
          />
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-card-title">CV / Resume</div>
        <div className="admin-field">
          <label className="admin-label">Current CV URL</label>
          <input className="admin-input" value={(data.cvUrl as string) ?? ''} onChange={(e) => setField('cvUrl', e.target.value)} placeholder="/assets/cv.pdf" />
        </div>
        <div className="admin-field">
          <label className="admin-label">Upload new PDF (replaces existing)</label>
          <CvUploader onUploaded={(url) => setField('cvUrl', url)} />
        </div>
      </div>

      <SaveBar section="hero" data={data} />
    </AdminShell>
  )
}
