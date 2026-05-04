'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

const sections = [
  { href: '/admin', label: '00 · Dashboard' },
  { href: '/admin/hero', label: '01 · Hero' },
  { href: '/admin/now', label: '02 · Now' },
  { href: '/admin/work', label: '03 · Work' },
  { href: '/admin/lab', label: '04 · Lab' },
  { href: '/admin/stack', label: '05 · Stack' },
  { href: '/admin/approach', label: '06 · Approach' },
  { href: '/admin/services', label: '07 · Services' },
  { href: '/admin/contact', label: '08 · Contact' },
]

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [loggingOut, setLoggingOut] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  async function logout() {
    setLoggingOut(true)
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  function closeSidebar() {
    setSidebarOpen(false)
  }

  return (
    <div className="admin-root">
      {/* Mobile header */}
      <header className="admin-mobile-header">
        <span className="admin-mobile-logo">Portfolio CMS</span>
        <button
          className={`admin-hamburger ${sidebarOpen ? 'open' : ''}`}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="admin-sidebar-overlay" onClick={closeSidebar} />
      )}

      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="admin-sidebar-logo">
          <div style={{ fontSize: 10, color: '#FF5B1F', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 4 }}>Portfolio CMS</div>
          <Link href="/" target="_blank" style={{ fontSize: 11, color: '#6B6862', letterSpacing: '0.1em', textDecoration: 'none' }}>
            ↗ View site
          </Link>
        </div>

        <nav style={{ flex: 1 }}>
          {sections.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              onClick={closeSidebar}
              className={`admin-nav-item ${pathname === s.href ? 'active' : ''}`}
            >
              {s.label}
            </Link>
          ))}
        </nav>

        <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(255,255,255,0.07)', marginTop: 16 }}>
          <button className="admin-btn admin-btn-secondary" onClick={logout} disabled={loggingOut} style={{ width: '100%', justifyContent: 'center', fontSize: 10 }}>
            {loggingOut ? '...' : 'Log out'}
          </button>
        </div>
      </aside>

      <main className="admin-main">
        {children}
      </main>
    </div>
  )
}
