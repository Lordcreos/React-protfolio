'use client'

import { useState, useEffect } from 'react'
import { AdminShell } from '@/components/admin/AdminShell'
import { SaveBar } from '@/components/admin/SaveBar'

interface StackCol { label: string; items: string[] }

export default function StackEditor() {
  const [cols, setCols] = useState<StackCol[] | null>(null)

  useEffect(() => {
    fetch('/api/content/stack').then((r) => r.json()).then(setCols)
  }, [])

  if (!cols) return <AdminShell><div style={{ color: '#6B6862', fontSize: 11 }}>Loading...</div></AdminShell>

  function updateCol(i: number, field: keyof StackCol, val: unknown) {
    setCols((prev) => prev ? prev.map((c, idx) => idx === i ? { ...c, [field]: val } : c) : prev)
  }

  return (
    <AdminShell>
      <h1 className="admin-page-title">05 · Stack</h1>
      <p className="admin-page-subtitle">Technology categories — each column is a group</p>

      {cols.map((col, i) => (
        <div key={i} className="admin-card">
          <div className="admin-field">
            <label className="admin-label">Category label</label>
            <input className="admin-input" value={col.label} onChange={(e) => updateCol(i, 'label', e.target.value)} />
          </div>
          <div className="admin-field">
            <label className="admin-label">Items (one per line)</label>
            <textarea className="admin-textarea" rows={Math.max(4, col.items.length + 1)} value={col.items.join('\n')} onChange={(e) => updateCol(i, 'items', e.target.value.split('\n').map((s) => s.trim()).filter(Boolean))} />
          </div>
        </div>
      ))}

      <SaveBar section="stack" data={cols} />
    </AdminShell>
  )
}
