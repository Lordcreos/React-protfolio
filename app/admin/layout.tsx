import type { Metadata } from 'next'
import './globals-admin.css'

export const metadata: Metadata = { title: 'Admin — Portfolio CMS' }

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
