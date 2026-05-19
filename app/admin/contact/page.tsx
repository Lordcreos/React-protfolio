'use client'

import { useEffect, useState } from 'react'
import { AdminShell } from '@/components/admin/AdminShell'
import { SaveBar } from '@/components/admin/SaveBar'

interface SocialLink { label: string; href: string }
interface ContactFormData {
  headline: string
  highlight: string
  intro: string
  sectionLabel: string
  nameLabel: string
  namePlaceholder: string
  emailLabel: string
  emailPlaceholder: string
  companyLabel: string
  companyPlaceholder: string
  serviceLabel: string
  budgetLabel: string
  budgetOptions: string[]
  timelineLabel: string
  timelineOptions: string[]
  messageLabel: string
  messagePlaceholder: string
  submitLabel: string
  whatsappLabel: string
  destinationEmail: string
  whatsappHref: string
  emailSubjectPrefix: string
  whatsappMessagePrefix: string
}
interface ContactData {
  email: string
  location: string
  timezone: string
  languages: string
  social: SocialLink[]
  form: ContactFormData
  footerBuild: string
}

const EMPTY_SOCIAL: SocialLink = {
  label: 'New Link',
  href: '#',
}

const DEFAULT_FORM: ContactFormData = {
  headline: 'Tell me what you need.',
  highlight: 'website sell',
  intro: 'Fill out the form with the basic context. I will reply with next steps, recommended scope, and an initial estimate.',
  sectionLabel: '07 / Request a service',
  nameLabel: 'Name',
  namePlaceholder: 'Your name',
  emailLabel: 'Email',
  emailPlaceholder: 'you@email.com',
  companyLabel: 'Company or project',
  companyPlaceholder: 'Your business name',
  serviceLabel: 'Service',
  budgetLabel: 'Budget / rate',
  budgetOptions: ['To be defined', 'EUR 25 - EUR 50 / hr', 'Small fixed scope', 'Monthly support'],
  timelineLabel: 'Ideal timeline',
  timelineOptions: ['This week', 'This month', '1 - 2 months', 'I just want a quote'],
  messageLabel: 'Project context',
  messagePlaceholder: 'What do you want to sell, what problem do you need to solve, and what result are you expecting?',
  submitLabel: 'Send request ->',
  whatsappLabel: 'Quick WhatsApp',
  destinationEmail: '',
  whatsappHref: '',
  emailSubjectPrefix: 'Service request',
  whatsappMessagePrefix: 'Hi Leonardo, I want to request',
}

function normalizeContact(data: Partial<ContactData>): ContactData {
  return {
    email: data.email ?? '',
    location: data.location ?? '',
    timezone: data.timezone ?? 'Europe/Berlin',
    languages: data.languages ?? '',
    social: data.social ?? [],
    form: { ...DEFAULT_FORM, ...(data.form ?? {}) },
    footerBuild: data.footerBuild ?? '',
  }
}

function listToText(items: string[]) {
  return items.join('\n')
}

function textToList(value: string) {
  return value.split(/\r?\n/).map((item) => item.trim()).filter(Boolean)
}

export default function ContactEditor() {
  const [data, setData] = useState<ContactData | null>(null)

  useEffect(() => {
    fetch('/api/content/contact')
      .then((r) => r.json())
      .then((payload) => setData(normalizeContact(payload)))
  }, [])

  if (!data) return <AdminShell><div style={{ color: '#6B6862', fontSize: 11 }}>Loading...</div></AdminShell>
  const contact = data

  function setField(key: keyof ContactData, val: unknown) {
    setData((prev) => prev ? { ...prev, [key]: val } : prev)
  }

  function setFormField(key: keyof ContactFormData, val: string | string[]) {
    setData((prev) => prev ? { ...prev, form: { ...prev.form, [key]: val } } : prev)
  }

  function updateSocial(i: number, field: keyof SocialLink, val: string) {
    setData((prev) => prev ? {
      ...prev,
      social: prev.social.map((s, idx) => idx === i ? { ...s, [field]: val } : s),
    } : prev)
  }

  function addSocial() {
    setData((prev) => prev ? { ...prev, social: [...prev.social, { ...EMPTY_SOCIAL }] } : prev)
  }

  function removeSocial(i: number) {
    setData((prev) => prev ? { ...prev, social: prev.social.filter((_, idx) => idx !== i) } : prev)
  }

  return (
    <AdminShell>
      <h1 className="admin-page-title">08 - Contact</h1>
      <p className="admin-page-subtitle">Email, form copy, social links, footer</p>

      <div className="admin-card">
        <div className="admin-card-title">Contact info</div>
        <div className="admin-field">
          <label className="admin-label">Email</label>
          <input className="admin-input" type="email" value={contact.email} onChange={(e) => setField('email', e.target.value)} />
        </div>
        <div className="admin-field">
          <label className="admin-label">Location</label>
          <input className="admin-input" value={contact.location} onChange={(e) => setField('location', e.target.value)} />
        </div>
        <div className="admin-field">
          <label className="admin-label">Timezone (IANA format, e.g. Europe/Berlin)</label>
          <input className="admin-input" value={contact.timezone} onChange={(e) => setField('timezone', e.target.value)} />
        </div>
        <div className="admin-field">
          <label className="admin-label">Languages</label>
          <input className="admin-input" value={contact.languages} onChange={(e) => setField('languages', e.target.value)} />
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-card-title">Contact form</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div className="admin-field">
            <label className="admin-label">Headline first line</label>
            <input className="admin-input" value={contact.form.headline} onChange={(e) => setFormField('headline', e.target.value)} />
          </div>
          <div className="admin-field">
            <label className="admin-label">Headline highlighted text</label>
            <input className="admin-input" value={contact.form.highlight} onChange={(e) => setFormField('highlight', e.target.value)} />
          </div>
        </div>
        <div className="admin-field">
          <label className="admin-label">Intro copy</label>
          <textarea className="admin-textarea" rows={3} value={contact.form.intro} onChange={(e) => setFormField('intro', e.target.value)} />
        </div>
        <div className="admin-field">
          <label className="admin-label">Section label</label>
          <input className="admin-input" value={contact.form.sectionLabel} onChange={(e) => setFormField('sectionLabel', e.target.value)} />
        </div>

        <div className="admin-divider" />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div className="admin-field">
            <label className="admin-label">Name label</label>
            <input className="admin-input" value={contact.form.nameLabel} onChange={(e) => setFormField('nameLabel', e.target.value)} />
          </div>
          <div className="admin-field">
            <label className="admin-label">Name placeholder</label>
            <input className="admin-input" value={contact.form.namePlaceholder} onChange={(e) => setFormField('namePlaceholder', e.target.value)} />
          </div>
          <div className="admin-field">
            <label className="admin-label">Email label</label>
            <input className="admin-input" value={contact.form.emailLabel} onChange={(e) => setFormField('emailLabel', e.target.value)} />
          </div>
          <div className="admin-field">
            <label className="admin-label">Email placeholder</label>
            <input className="admin-input" value={contact.form.emailPlaceholder} onChange={(e) => setFormField('emailPlaceholder', e.target.value)} />
          </div>
          <div className="admin-field">
            <label className="admin-label">Company label</label>
            <input className="admin-input" value={contact.form.companyLabel} onChange={(e) => setFormField('companyLabel', e.target.value)} />
          </div>
          <div className="admin-field">
            <label className="admin-label">Company placeholder</label>
            <input className="admin-input" value={contact.form.companyPlaceholder} onChange={(e) => setFormField('companyPlaceholder', e.target.value)} />
          </div>
          <div className="admin-field">
            <label className="admin-label">Service label</label>
            <input className="admin-input" value={contact.form.serviceLabel} onChange={(e) => setFormField('serviceLabel', e.target.value)} />
          </div>
          <div className="admin-field">
            <label className="admin-label">Budget label</label>
            <input className="admin-input" value={contact.form.budgetLabel} onChange={(e) => setFormField('budgetLabel', e.target.value)} />
          </div>
        </div>

        <div className="admin-field">
          <label className="admin-label">Budget options (one per line)</label>
          <textarea className="admin-textarea" rows={4} value={listToText(contact.form.budgetOptions)} onChange={(e) => setFormField('budgetOptions', textToList(e.target.value))} />
        </div>
        <div className="admin-field">
          <label className="admin-label">Timeline label</label>
          <input className="admin-input" value={contact.form.timelineLabel} onChange={(e) => setFormField('timelineLabel', e.target.value)} />
        </div>
        <div className="admin-field">
          <label className="admin-label">Timeline options (one per line)</label>
          <textarea className="admin-textarea" rows={4} value={listToText(contact.form.timelineOptions)} onChange={(e) => setFormField('timelineOptions', textToList(e.target.value))} />
        </div>
        <div className="admin-field">
          <label className="admin-label">Message label</label>
          <input className="admin-input" value={contact.form.messageLabel} onChange={(e) => setFormField('messageLabel', e.target.value)} />
        </div>
        <div className="admin-field">
          <label className="admin-label">Message placeholder</label>
          <textarea className="admin-textarea" rows={3} value={contact.form.messagePlaceholder} onChange={(e) => setFormField('messagePlaceholder', e.target.value)} />
        </div>

        <div className="admin-divider" />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div className="admin-field">
            <label className="admin-label">Submit button label</label>
            <input className="admin-input" value={contact.form.submitLabel} onChange={(e) => setFormField('submitLabel', e.target.value)} />
          </div>
          <div className="admin-field">
            <label className="admin-label">WhatsApp button label</label>
            <input className="admin-input" value={contact.form.whatsappLabel} onChange={(e) => setFormField('whatsappLabel', e.target.value)} />
          </div>
          <div className="admin-field">
            <label className="admin-label">Destination email for form requests</label>
            <input className="admin-input" type="email" value={contact.form.destinationEmail} onChange={(e) => setFormField('destinationEmail', e.target.value)} placeholder={contact.email} />
            <p className="admin-help">Send request opens an email to this address. If empty, it uses Contact info email.</p>
          </div>
          <div className="admin-field">
            <label className="admin-label">WhatsApp destination link</label>
            <input className="admin-input" value={contact.form.whatsappHref} onChange={(e) => setFormField('whatsappHref', e.target.value)} placeholder="https://api.whatsapp.com/send?phone=..." />
            <p className="admin-help">Quick WhatsApp sends messages here. If empty, it uses the WhatsApp social link.</p>
          </div>
          <div className="admin-field">
            <label className="admin-label">Email subject prefix</label>
            <input className="admin-input" value={contact.form.emailSubjectPrefix} onChange={(e) => setFormField('emailSubjectPrefix', e.target.value)} />
          </div>
          <div className="admin-field">
            <label className="admin-label">WhatsApp message prefix</label>
            <input className="admin-input" value={contact.form.whatsappMessagePrefix} onChange={(e) => setFormField('whatsappMessagePrefix', e.target.value)} />
          </div>
        </div>
      </div>

      <div className="admin-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, marginBottom: 20, flexWrap: 'wrap' }}>
          <div>
            <div className="admin-card-title" style={{ marginBottom: 8 }}>Social links</div>
            <p style={{ color: '#6B6862', fontSize: 11, lineHeight: 1.6, margin: 0, letterSpacing: '0.08em' }}>
              Elsewhere buttons are generated from this list. Quick WhatsApp uses the Contact form WhatsApp destination link first, then falls back to the social link whose label includes "WhatsApp".
            </p>
          </div>
          <button className="admin-btn admin-btn-secondary" onClick={addSocial} type="button">Add link</button>
        </div>

        {contact.social.map((s, i) => (
          <div key={i} className="admin-social-row">
            <div>
              <label className="admin-label">Label</label>
              <input className="admin-input" value={s.label} onChange={(e) => updateSocial(i, 'label', e.target.value)} />
            </div>
            <div>
              <label className="admin-label">URL</label>
              <input className="admin-input" value={s.href} onChange={(e) => updateSocial(i, 'href', e.target.value)} />
            </div>
            <button className="admin-btn admin-btn-danger admin-social-delete" onClick={() => removeSocial(i)} type="button">
              Delete
            </button>
          </div>
        ))}

        {contact.social.length === 0 && (
          <p style={{ color: '#6B6862', fontSize: 11, margin: 0 }}>No social links yet. Add one to show it in the contact section.</p>
        )}
      </div>

      <div className="admin-card">
        <div className="admin-card-title">Footer</div>
        <div className="admin-field">
          <label className="admin-label">Build credit text</label>
          <input className="admin-input" value={contact.footerBuild} onChange={(e) => setField('footerBuild', e.target.value)} />
        </div>
      </div>

      <SaveBar section="contact" data={data} />
    </AdminShell>
  )
}
