'use client'

import { useState, useEffect } from 'react'
import { AdminShell } from '@/components/admin/AdminShell'
import { SaveBar } from '@/components/admin/SaveBar'
import { ImageUploader } from '@/components/admin/ImageUploader'

interface LabCard {
  title: string
  meta: string
  body: string
  stack: string[]
  link: string | null
  image: string | null
}

const EMPTY_CARD: LabCard = {
  title: 'New project',
  meta: '2026 · In progress',
  body: '',
  stack: [],
  link: null,
  image: null,
}

export default function LabEditor() {
  const [cards, setCards] = useState<LabCard[]>([])
  const [loading, setLoading] = useState(true)
  const [active, setActive] = useState(0)

  useEffect(() => {
    fetch('/api/content/lab').then((r) => r.json()).then((data) => {
      setCards(data)
      setLoading(false)
    })
  }, [])

  if (loading) return <AdminShell><div style={{ color: '#6B6862', fontSize: 11 }}>Loading...</div></AdminShell>

  const card = cards[active]

  function update(field: keyof LabCard, val: unknown) {
    setCards((prev) => prev.map((c, i) => i === active ? { ...c, [field]: val } : c))
  }

  function addCard() {
    const nextLen = cards.length
    setCards((prev) => [...prev, { ...EMPTY_CARD }])
    setActive(nextLen)
  }

  function removeCard() {
    if (cards.length <= 1) return
    const next = cards.filter((_, i) => i !== active)
    setCards(next)
    setActive(Math.min(active, next.length - 1))
  }

  return (
    <AdminShell>
      <h1 className="admin-page-title">04 · Lab</h1>
      <p className="admin-page-subtitle">Side projects & AI experiments</p>

      <div className="admin-tabs">
        {cards.map((c, i) => (
          <button key={i} className={`admin-tab ${i === active ? 'active' : ''}`} onClick={() => setActive(i)}>
            {c.title.length > 22 ? c.title.slice(0, 22) + '…' : c.title}
          </button>
        ))}
        <button className="admin-tab-add" onClick={addCard} title="Add project">+</button>
      </div>

      <div className="admin-card" style={{ margin: 0 }}>
        <ImageUploader
          label="Project image (16:9 recommended)"
          value={card.image}
          onChange={(src) => update('image', src)}
        />

        <div className="admin-divider" />

        <div className="admin-field">
          <label className="admin-label">Title</label>
          <input className="admin-input" value={card.title} onChange={(e) => update('title', e.target.value)} />
        </div>
        <div className="admin-field">
          <label className="admin-label">Meta (year · status)</label>
          <input className="admin-input" value={card.meta} onChange={(e) => update('meta', e.target.value)} />
        </div>
        <div className="admin-field">
          <label className="admin-label">Description</label>
          <textarea className="admin-textarea" rows={4} value={card.body} onChange={(e) => update('body', e.target.value)} />
        </div>
        <div className="admin-field">
          <label className="admin-label">Stack (comma-separated)</label>
          <input className="admin-input" value={card.stack.join(', ')}
            onChange={(e) => update('stack', e.target.value.split(',').map((s) => s.trim()).filter(Boolean))} />
        </div>
        <div className="admin-field">
          <label className="admin-label">Link (optional)</label>
          <input className="admin-input" value={card.link ?? ''} onChange={(e) => update('link', e.target.value || null)} />
        </div>

        {cards.length > 1 && (
          <div style={{ marginTop: 8 }}>
            <button className="admin-btn admin-btn-danger" style={{ fontSize: 10 }} onClick={removeCard}>
              Delete «{card.title.slice(0, 30)}»
            </button>
          </div>
        )}
      </div>

      <SaveBar section="lab" data={cards} />
    </AdminShell>
  )
}
