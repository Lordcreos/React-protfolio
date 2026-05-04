'use client'

import { useRef, useState } from 'react'

interface ImageUploaderProps {
  value: string | null
  onChange: (src: string | null) => void
  label?: string
}

export function ImageUploader({ value, onChange, label = 'Image' }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setError('')
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      if (!res.ok) {
        const j = await res.json()
        setError(j.error ?? 'Upload failed')
        return
      }
      const { src } = await res.json()
      onChange(src)
    } catch {
      setError('Upload failed')
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  return (
    <div className="admin-field">
      <label className="admin-label">{label}</label>

      {value && (
        <div style={{ marginBottom: 12, position: 'relative', display: 'inline-block' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt="preview"
            style={{ maxWidth: 280, maxHeight: 160, objectFit: 'cover', border: '1px solid rgba(255,255,255,0.1)', display: 'block' }}
          />
          <button
            type="button"
            onClick={() => onChange(null)}
            title="Remove image"
            style={{
              position: 'absolute', top: 6, right: 6,
              background: 'rgba(10,10,11,0.85)', border: '1px solid rgba(255,255,255,0.15)',
              color: '#f87171', cursor: 'pointer', fontSize: 11, padding: '3px 7px',
              fontFamily: 'var(--font-geist-mono), monospace', letterSpacing: '0.1em',
            }}
          >
            ✕
          </button>
        </div>
      )}

      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
          style={{ display: 'none' }}
          onChange={handleFile}
        />
        <button
          type="button"
          className="admin-btn admin-btn-secondary"
          style={{ fontSize: 10 }}
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
        >
          {uploading ? 'Uploading...' : value ? 'Replace image' : 'Upload image'}
        </button>

        {value && (
          <span style={{ fontSize: 11, color: '#6B6862', fontFamily: 'var(--font-geist-mono), monospace', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 200 }}>
            {value.split('/').pop()}
          </span>
        )}
      </div>

      {error && <div style={{ marginTop: 8, fontSize: 11, color: '#f87171', letterSpacing: '0.1em' }}>{error}</div>}
    </div>
  )
}
