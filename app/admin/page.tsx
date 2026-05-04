import { redirect } from 'next/navigation'
import { isAuthenticated } from '@/lib/auth'
import { AdminShell } from '@/components/admin/AdminShell'
import Link from 'next/link'

const sections = [
  { href: '/admin/hero', label: 'Hero', desc: 'Headline, bio, metrics, marquee' },
  { href: '/admin/now', label: 'Now', desc: 'Current company, university, highlight' },
  { href: '/admin/work', label: 'Work', desc: 'Selected projects & case studies' },
  { href: '/admin/lab', label: 'Lab', desc: 'Side projects & experiments' },
  { href: '/admin/stack', label: 'Stack', desc: 'Technology categories & tools' },
  { href: '/admin/approach', label: 'Approach', desc: 'Principles & philosophy' },
  { href: '/admin/services', label: 'Services', desc: 'Offerings & pricing' },
  { href: '/admin/contact', label: 'Contact', desc: 'Email, social links, timezone' },
]

export default async function AdminDashboard() {
  if (!(await isAuthenticated())) redirect('/admin/login')

  return (
    <AdminShell>
      <h1 className="admin-page-title">Dashboard</h1>
      <p className="admin-page-subtitle">Select a section to edit its content</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
        {sections.map((s) => (
          <Link key={s.href} href={s.href} style={{ textDecoration: 'none' }}>
            <div className="admin-card" style={{ cursor: 'pointer' }}>
              <div className="admin-card-title">{s.label}</div>
              <div style={{ fontSize: 12, color: '#A8A39A', lineHeight: 1.5 }}>{s.desc}</div>
              <div style={{ marginTop: 16, fontSize: 11, color: '#FF5B1F', letterSpacing: '0.1em' }}>Edit →</div>
            </div>
          </Link>
        ))}
      </div>
    </AdminShell>
  )
}
