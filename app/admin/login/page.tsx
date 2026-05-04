'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    setLoading(false)
    if (res.ok) {
      router.push('/admin')
      router.refresh()
    } else {
      setError('Wrong password.')
    }
  }

  return (
    <div className="admin-login-wrap">
      <div className="admin-login-box">
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#FF5B1F', marginBottom: 4 }}>Portfolio CMS</div>
          <div style={{ fontSize: 22, color: '#e8e5df', fontFamily: 'var(--font-fraunces), serif', fontStyle: 'italic', fontWeight: 300 }}>Admin access</div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="admin-field">
            <label className="admin-label" htmlFor="pwd">Password</label>
            <input
              id="pwd"
              type="password"
              className="admin-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
              required
            />
          </div>
          {error && <div style={{ fontSize: 11, color: '#f87171', marginBottom: 16, letterSpacing: '0.1em' }}>{error}</div>}
          <button type="submit" className="admin-btn" disabled={loading} style={{ width: '100%', justifyContent: 'center' }}>
            {loading ? 'Checking...' : 'Enter →'}
          </button>
        </form>
      </div>
    </div>
  )
}
