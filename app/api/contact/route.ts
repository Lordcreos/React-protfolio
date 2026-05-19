import { NextRequest, NextResponse } from 'next/server'
import { readContent } from '@/lib/content'

interface ContactFormConfig {
  destinationEmail?: string
  emailSubjectPrefix?: string
}

interface ContactContent {
  email?: string
  form?: ContactFormConfig
}

interface ContactRequest {
  name?: string
  email?: string
  company?: string
  service?: string
  budget?: string
  timeline?: string
  message?: string
}

function clean(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function row(label: string, value: string) {
  return `<tr><td style="padding:8px 12px;color:#666;border-bottom:1px solid #eee;">${label}</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">${escapeHtml(value || 'Not provided')}</td></tr>`
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'Missing RESEND_API_KEY environment variable.' }, { status: 500 })
  }

  const payload = await req.json().catch(() => null) as ContactRequest | null
  if (!payload) {
    return NextResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 })
  }

  const name = clean(payload.name)
  const replyEmail = clean(payload.email)
  const company = clean(payload.company)
  const service = clean(payload.service)
  const budget = clean(payload.budget)
  const timeline = clean(payload.timeline)
  const message = clean(payload.message)

  if (!name || !replyEmail || !service || !message) {
    return NextResponse.json({ error: 'Name, email, service, and message are required.' }, { status: 400 })
  }

  const contact = await readContent<ContactContent>('contact')
  const to = process.env.CONTACT_TO_EMAIL || contact.form?.destinationEmail || contact.email
  if (!to) {
    return NextResponse.json({ error: 'No contact destination email configured.' }, { status: 500 })
  }

  const subjectPrefix = contact.form?.emailSubjectPrefix || 'Service request'
  const subject = `${subjectPrefix}: ${service}`
  const from = process.env.RESEND_FROM_EMAIL || 'Portfolio <onboarding@resend.dev>'
  const text = [
    `Name: ${name}`,
    `Email: ${replyEmail}`,
    `Company/project: ${company || 'Not provided'}`,
    `Service: ${service}`,
    `Budget/rate: ${budget || 'Not provided'}`,
    `Timeline: ${timeline || 'Not provided'}`,
    '',
    'Message:',
    message,
  ].join('\n')
  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.5;color:#111;">
      <h2 style="margin:0 0 16px;">New portfolio service request</h2>
      <table style="border-collapse:collapse;width:100%;max-width:680px;border:1px solid #eee;">
        ${row('Name', name)}
        ${row('Email', replyEmail)}
        ${row('Company/project', company)}
        ${row('Service', service)}
        ${row('Budget/rate', budget)}
        ${row('Timeline', timeline)}
      </table>
      <h3 style="margin:24px 0 8px;">Message</h3>
      <p style="white-space:pre-wrap;margin:0;">${escapeHtml(message)}</p>
    </div>
  `

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      html,
      text,
      reply_to: replyEmail,
    }),
  })

  const result = await res.json().catch(() => null)
  if (!res.ok) {
    return NextResponse.json({ error: result?.message || 'Email could not be sent.' }, { status: 502 })
  }

  return NextResponse.json({ ok: true, id: result?.id })
}
