'use client'

import { useState, useEffect } from 'react'
import { AdminShell } from '@/components/admin/AdminShell'
import { SaveBar } from '@/components/admin/SaveBar'

interface ServiceItem {
  label: string
  title: string
  body: string
  priceLabel: string
  price: string
}

const EMPTY_SERVICE: ServiceItem = {
  label: 'Engagement type',
  title: 'New Service',
  body: '',
  priceLabel: 'Starts at',
  price: '€0',
}

export default function ServicesEditor() {
  const [items, setItems] = useState<ServiceItem[]>([])
  const [loading, setLoading] = useState(true)
  const [active, setActive] = useState(0)

  useEffect(() => {
    fetch('/api/content/services').then((r) => r.json()).then((data) => {
      setItems(data)
      setLoading(false)
    })
  }, [])

  if (loading) return <AdminShell><div style={{ color: '#6B6862', fontSize: 11 }}>Loading...</div></AdminShell>

  const item = items[active]

  function update(field: keyof ServiceItem, val: string) {
    setItems((prev) => prev.map((s, i) => i === active ? { ...s, [field]: val } : s))
  }

  function addItem() {
    const nextLen = items.length
    setItems((prev) => [...prev, { ...EMPTY_SERVICE }])
    setActive(nextLen)
  }

  function removeItem() {
    if (items.length <= 1) return
    const next = items.filter((_, i) => i !== active)
    setItems(next)
    setActive(Math.min(active, next.length - 1))
  }

  return (
    <AdminShell>
      <h1 className="admin-page-title">07 · Services</h1>
      <p className="admin-page-subtitle">Service offerings and pricing</p>

      <div className="admin-tabs">
        {items.map((s, i) => (
          <button key={i} className={`admin-tab ${i === active ? 'active' : ''}`} onClick={() => setActive(i)}>
            {s.title.length > 20 ? s.title.slice(0, 20) + '…' : s.title}
          </button>
        ))}
        <button className="admin-tab-add" onClick={addItem} title="Add service">+</button>
      </div>

      <div className="admin-card" style={{ margin: 0 }}>
        <div className="admin-field">
          <label className="admin-label">Label (engagement type tag)</label>
          <input className="admin-input" value={item.label} onChange={(e) => update('label', e.target.value)} />
        </div>
        <div className="admin-field">
          <label className="admin-label">Title</label>
          <input className="admin-input" value={item.title} onChange={(e) => update('title', e.target.value)} />
        </div>
        <div className="admin-field">
          <label className="admin-label">Description</label>
          <textarea className="admin-textarea" rows={4} value={item.body} onChange={(e) => update('body', e.target.value)} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div className="admin-field">
            <label className="admin-label">Price label</label>
            <input className="admin-input" value={item.priceLabel} onChange={(e) => update('priceLabel', e.target.value)}
              placeholder="Starts at, Fixed, From…" />
          </div>
          <div className="admin-field">
            <label className="admin-label">Price</label>
            <input className="admin-input" value={item.price} onChange={(e) => update('price', e.target.value)}
              placeholder="€8,500 / mo" />
          </div>
        </div>

        {items.length > 1 && (
          <div style={{ marginTop: 8 }}>
            <button className="admin-btn admin-btn-danger" style={{ fontSize: 10 }} onClick={removeItem}>
              Delete «{item.title.slice(0, 30)}»
            </button>
          </div>
        )}
      </div>

      <SaveBar section="services" data={items} />
    </AdminShell>
  )
}
