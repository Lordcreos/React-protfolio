'use client'

import { useState, useEffect, useRef } from 'react'
import { AdminShell } from '@/components/admin/AdminShell'
import { SaveBar } from '@/components/admin/SaveBar'
import { ImageUploader } from '@/components/admin/ImageUploader'

interface Metric { n: string; label: string }
interface WorkCard {
  index: number
  imageLeft: boolean
  year: string
  client: string
  sector: string
  title: string
  body: string
  metrics: Metric[]
  tags: string[]
  image: { src: string; alt: string } | null
}

const EMPTY_CARD: Omit<WorkCard, 'index'> = {
  imageLeft: true,
  year: '2025',
  client: 'New Client',
  sector: 'Industry',
  title: 'Project title.',
  body: '',
  metrics: [{ n: '', label: '' }],
  tags: [],
  image: null,
}

export default function WorkEditor() {
  const [cards, setCards] = useState<WorkCard[]>([])
  const [loading, setLoading] = useState(true)
  const [active, setActive] = useState(0)
  const [dragOver, setDragOver] = useState<number | null>(null)
  const dragFrom = useRef<number | null>(null)

  useEffect(() => {
    fetch('/api/content/work').then((r) => r.json()).then((data) => {
      setCards(data)
      setLoading(false)
    })
  }, [])

  if (loading) return <AdminShell><div style={{ color: '#6B6862', fontSize: 11 }}>Loading...</div></AdminShell>

  const card = cards[active]

  function update(field: keyof WorkCard, val: unknown) {
    setCards((prev) => prev.map((c, i) => i === active ? { ...c, [field]: val } : c))
  }

  function updateMetric(mi: number, field: keyof Metric, val: string) {
    update('metrics', card.metrics.map((m, i) => i === mi ? { ...m, [field]: val } : m))
  }

  function addMetric() {
    update('metrics', [...card.metrics, { n: '', label: '' }])
  }

  function removeMetric(mi: number) {
    update('metrics', card.metrics.filter((_, i) => i !== mi))
  }

  function addCard() {
    const nextIndex = Math.max(...cards.map((c) => c.index), 0) + 1
    const nextLen = cards.length
    setCards((prev) => [...prev, { index: nextIndex, ...EMPTY_CARD }])
    setActive(nextLen)
  }

  function removeCard() {
    if (cards.length <= 1) return
    const next = cards.filter((_, i) => i !== active)
    setCards(next)
    setActive(Math.min(active, next.length - 1))
  }

  function moveCard(from: number, to: number) {
    if (from === to) return
    setCards((prev) => {
      const next = [...prev]
      const [moved] = next.splice(from, 1)
      next.splice(to, 0, moved)
      return next
    })
    let newActive = active
    if (from === active) {
      newActive = to
    } else {
      if (from < active) newActive = active - 1
      if (to <= newActive) newActive = newActive + 1
    }
    setActive(newActive)
  }

  return (
    <AdminShell>
      <h1 className="admin-page-title">03 · Work</h1>
      <p className="admin-page-subtitle">Selected projects — click a tab to edit, + to add</p>

      <div className="admin-tabs">
        {cards.map((c, i) => (
          <button
            key={i}
            draggable
            className={`admin-tab ${i === active ? 'active' : ''}`}
            style={{ cursor: 'grab', outline: dragOver === i && dragFrom.current !== i ? '2px solid #888' : undefined }}
            onClick={() => setActive(i)}
            onDragStart={() => { dragFrom.current = i }}
            onDragOver={(e) => { e.preventDefault(); setDragOver(i) }}
            onDragLeave={() => setDragOver(null)}
            onDrop={() => { setDragOver(null); if (dragFrom.current !== null) moveCard(dragFrom.current, i); dragFrom.current = null }}
            onDragEnd={() => { setDragOver(null); dragFrom.current = null }}
          >
            {c.client || `Project ${i + 1}`}
          </button>
        ))}
        <button className="admin-tab-add" onClick={addCard} title="Add project">+</button>
      </div>

      <div className="admin-card" style={{ margin: 0 }}>
        <ImageUploader
          label="Project image (4:3 recommended)"
          value={card.image?.src ?? null}
          onChange={(src) => update('image', src ? { src, alt: card.image?.alt ?? '' } : null)}
        />
        {card.image && (
          <div className="admin-field">
            <label className="admin-label">Alt text</label>
            <input className="admin-input" value={card.image.alt}
              onChange={(e) => update('image', { src: card.image!.src, alt: e.target.value })} />
          </div>
        )}

        <div className="admin-divider" />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div className="admin-field">
            <label className="admin-label">Client</label>
            <input className="admin-input" value={card.client} onChange={(e) => update('client', e.target.value)} />
          </div>
          <div className="admin-field">
            <label className="admin-label">Sector</label>
            <input className="admin-input" value={card.sector} onChange={(e) => update('sector', e.target.value)} />
          </div>
          <div className="admin-field">
            <label className="admin-label">Year</label>
            <input className="admin-input" value={card.year} onChange={(e) => update('year', e.target.value)} />
          </div>
          <div className="admin-field">
            <label className="admin-label">Image position</label>
            <select className="admin-input" value={card.imageLeft ? 'true' : 'false'}
              onChange={(e) => update('imageLeft', e.target.value === 'true')}>
              <option value="true">Left</option>
              <option value="false">Right</option>
            </select>
          </div>
        </div>

        <div className="admin-field">
          <label className="admin-label">Title</label>
          <input className="admin-input" value={card.title} onChange={(e) => update('title', e.target.value)} />
        </div>
        <div className="admin-field">
          <label className="admin-label">Body</label>
          <textarea className="admin-textarea" rows={4} value={card.body} onChange={(e) => update('body', e.target.value)} />
        </div>

        <div className="admin-card-title" style={{ marginTop: 4 }}>Metrics</div>
        {card.metrics.map((m, mi) => (
          <div key={mi} style={{ display: 'grid', gridTemplateColumns: '120px 1fr auto', gap: 10, marginBottom: 8, alignItems: 'flex-end' }}>
            <div>
              <label className="admin-label">Value</label>
              <input className="admin-input" value={m.n} onChange={(e) => updateMetric(mi, 'n', e.target.value)} />
            </div>
            <div>
              <label className="admin-label">Label</label>
              <input className="admin-input" value={m.label} onChange={(e) => updateMetric(mi, 'label', e.target.value)} />
            </div>
            <button className="admin-btn admin-btn-danger" style={{ fontSize: 10, alignSelf: 'flex-end' }}
              onClick={() => removeMetric(mi)}>✕</button>
          </div>
        ))}
        <button className="admin-btn admin-btn-secondary" style={{ fontSize: 10, marginBottom: 20 }} onClick={addMetric}>
          + Add metric
        </button>

        <div className="admin-field">
          <label className="admin-label">Tags (comma-separated)</label>
          <input className="admin-input" value={card.tags.join(', ')}
            onChange={(e) => update('tags', e.target.value.split(',').map((s) => s.trim()).filter(Boolean))} />
        </div>

        {cards.length > 1 && (
          <div style={{ marginTop: 8 }}>
            <button className="admin-btn admin-btn-danger" style={{ fontSize: 10 }} onClick={removeCard}>
              Delete «{card.client}»
            </button>
          </div>
        )}
      </div>

      <SaveBar section="work" data={cards} />
    </AdminShell>
  )
}
