'use client'

import { useState } from 'react'

interface SaveBarProps {
  section: string
  data: unknown
  onSaved?: () => void
}

export function SaveBar({ section, data, onSaved }: SaveBarProps) {
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function save() {
    setStatus('saving')
    setMessage('')
    try {
      const res = await fetch(`/api/content/${section}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setStatus('saved')
        onSaved?.()
        setTimeout(() => setStatus('idle'), 3000)
      } else {
        const payload = await res.json().catch(() => null)
        setMessage(payload?.error || `Save failed with status ${res.status}`)
        setStatus('error')
        setTimeout(() => setStatus('idle'), 5000)
      }
    } catch (err) {
      setMessage((err as Error).message || 'Network error')
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, paddingTop: 24, marginTop: 8, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
      <button className="admin-btn" onClick={save} disabled={status === 'saving'}>
        {status === 'saving' ? 'Saving...' : 'Save changes ->'}
      </button>
      {status === 'saved' && <span className="admin-status success">Saved</span>}
      {status === 'error' && <span className="admin-status error">{message || 'Error - check console'}</span>}
    </div>
  )
}
