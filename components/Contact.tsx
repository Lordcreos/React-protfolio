'use client'

import type { FormEvent } from 'react'
import { useEffect, useMemo, useState } from 'react'
import { Reveal } from './Reveal'

interface SocialLink { label: string; href: string }
interface ContactFormConfig {
  headline?: string
  highlight?: string
  intro?: string
  sectionLabel?: string
  nameLabel?: string
  namePlaceholder?: string
  emailLabel?: string
  emailPlaceholder?: string
  companyLabel?: string
  companyPlaceholder?: string
  serviceLabel?: string
  budgetLabel?: string
  budgetOptions?: string[]
  timelineLabel?: string
  timelineOptions?: string[]
  messageLabel?: string
  messagePlaceholder?: string
  submitLabel?: string
  whatsappLabel?: string
  destinationEmail?: string
  whatsappHref?: string
  emailSubjectPrefix?: string
  whatsappMessagePrefix?: string
}
interface ContactProps {
  email: string
  location: string
  timezone: string
  languages: string
  social: SocialLink[]
  footerBuild: string
  form?: ContactFormConfig
  serviceOptions?: string[]
}

const defaultForm: Required<ContactFormConfig> = {
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

const NETLIFY_FORM_NAME = 'service-request'
const NETLIFY_FORM_ACTION = '/'

export function Contact({ email, location, timezone, languages, social, footerBuild, form: formConfig, serviceOptions = [] }: ContactProps) {
  const settings = { ...defaultForm, ...formConfig }
  const budgetOptions = settings.budgetOptions.length ? settings.budgetOptions : defaultForm.budgetOptions
  const timelineOptions = settings.timelineOptions.length ? settings.timelineOptions : defaultForm.timelineOptions
  const [time, setTime] = useState('')
  const [form, setForm] = useState({
    name: '',
    company: '',
    replyTo: '',
    service: serviceOptions[0] ?? 'Sales landing page',
    budget: budgetOptions[0],
    timeline: timelineOptions[timelineOptions.length - 1],
    message: '',
  })
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [submitMessage, setSubmitMessage] = useState('')

  useEffect(() => {
    const tick = () => {
      try {
        const t = new Intl.DateTimeFormat('en-DE', { timeZone: timezone, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).format(new Date())
        setTime(t)
      } catch {
        setTime(new Date().toLocaleTimeString())
      }
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [timezone])

  useEffect(() => {
    if (!form.service && serviceOptions[0]) {
      setForm((prev) => ({ ...prev, service: serviceOptions[0] }))
    }
  }, [form.service, serviceOptions])

  const whatsappHref = useMemo(() => {
    const whatsapp = settings.whatsappHref || social.find((s) => s.label.toLowerCase().includes('whatsapp'))?.href
    if (!whatsapp) return ''
    const text = `${settings.whatsappMessagePrefix}: ${form.service}. Budget/rate: ${form.budget}. Timeline: ${form.timeline}.`
    const separator = whatsapp.includes('?') ? '&' : '?'
    return `${whatsapp}${separator}text=${encodeURIComponent(text)}`
  }, [form.budget, form.service, form.timeline, settings.whatsappMessagePrefix, social])

  function update(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const subject = `${settings.emailSubjectPrefix}: ${form.service}`
    const payload = new URLSearchParams({
      'form-name': NETLIFY_FORM_NAME,
      'bot-field': '',
      name: form.name,
      email: form.replyTo,
      company: form.company || 'Not provided',
      service: form.service,
      budget: form.budget,
      timeline: form.timeline,
      message: form.message,
      destinationEmail: settings.destinationEmail || email,
      subject,
    })

    setSubmitStatus('sending')
    setSubmitMessage('')

    try {
      const res = await fetch(NETLIFY_FORM_ACTION, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: payload.toString(),
      })

      if (!res.ok) throw new Error(`Request failed with status ${res.status}`)

      setSubmitStatus('sent')
      setSubmitMessage('Request sent. I will reply as soon as possible.')
      setForm((prev) => ({ ...prev, name: '', company: '', replyTo: '', message: '' }))
    } catch {
      setSubmitStatus('error')
      setSubmitMessage('The request could not be sent. Please use WhatsApp or try again.')
    }
  }

  return (
    <section id="contact" className="container" style={{ paddingTop: 128, paddingBottom: 64, borderTop: '1px solid var(--hairline)' }}>
      <Reveal>
        <h2 className="display" style={{ fontSize: 'clamp(3rem, 12vw, 9rem)', letterSpacing: '-0.04em', lineHeight: 0.95, margin: 0, fontWeight: 300, color: 'var(--bone)' }}>
          {settings.headline}<br />
          Let&apos;s make your <span className="mail-link">{settings.highlight}</span>.
        </h2>
      </Reveal>

      <Reveal className="contact-layout" style={{ marginTop: 96 }}>
        <div className="contact-copy">
          <div className="sec-label">{settings.sectionLabel}</div>
          <p className="bone-muted" style={{ fontSize: 'clamp(1.1rem, 2vw, 1.6rem)', lineHeight: 1.45, margin: '24px 0 32px 0' }}>
            {settings.intro}
          </p>
          <div className="contact-detail-list">
            <div>
              <span>Email</span>
              <a href={`mailto:${email}`} className="ext-link">{email}</a>
            </div>
            <div>
              <span>Based in</span>
              <strong>{location}</strong>
            </div>
            <div>
              <span>Languages</span>
              <strong>{languages}</strong>
            </div>
            <div>
              <span>Elsewhere</span>
              <div className="contact-socials">
                {social.map((s) => (
                  <a key={`${s.label}-${s.href}`} href={s.href} className="contact-social-button">{s.label}</a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <form className="contact-form" name={NETLIFY_FORM_NAME} method="POST" action={NETLIFY_FORM_ACTION} data-netlify="true" data-netlify-honeypot="bot-field" onSubmit={submitContact}>
          <input type="hidden" name="form-name" value={NETLIFY_FORM_NAME} />
          <input type="hidden" name="bot-field" value="" />
          <input type="hidden" name="destinationEmail" value={settings.destinationEmail || email} />
          <input type="hidden" name="subject" value={`${settings.emailSubjectPrefix}: ${form.service}`} />
          <div className="form-row">
            <label>
              <span>{settings.nameLabel}</span>
              <input name="name" value={form.name} onChange={(e) => update('name', e.target.value)} required placeholder={settings.namePlaceholder} />
            </label>
            <label>
              <span>{settings.emailLabel}</span>
              <input name="email" type="email" value={form.replyTo} onChange={(e) => update('replyTo', e.target.value)} required placeholder={settings.emailPlaceholder} />
            </label>
          </div>

          <label>
            <span>{settings.companyLabel}</span>
            <input name="company" value={form.company} onChange={(e) => update('company', e.target.value)} placeholder={settings.companyPlaceholder} />
          </label>

          <div className="form-row">
            <label>
              <span>{settings.serviceLabel}</span>
              <select name="service" value={form.service} onChange={(e) => update('service', e.target.value)}>
                {(serviceOptions.length ? serviceOptions : ['Sales landing page', 'Web app', 'AI integrations']).map((service) => (
                  <option key={service} value={service}>{service}</option>
                ))}
              </select>
            </label>
            <label>
              <span>{settings.budgetLabel}</span>
              <select name="budget" value={form.budget} onChange={(e) => update('budget', e.target.value)}>
                {budgetOptions.map((budget) => (
                  <option key={budget} value={budget}>{budget}</option>
                ))}
              </select>
            </label>
          </div>

          <label>
            <span>{settings.timelineLabel}</span>
            <select name="timeline" value={form.timeline} onChange={(e) => update('timeline', e.target.value)}>
              {timelineOptions.map((timeline) => (
                <option key={timeline} value={timeline}>{timeline}</option>
              ))}
            </select>
          </label>

          <label>
            <span>{settings.messageLabel}</span>
            <textarea name="message" value={form.message} onChange={(e) => update('message', e.target.value)} required rows={6} placeholder={settings.messagePlaceholder} />
          </label>

          <div className="contact-actions">
            <button type="submit" disabled={submitStatus === 'sending'}>
              {submitStatus === 'sending' ? 'Sending...' : settings.submitLabel}
            </button>
            {whatsappHref && <a href={whatsappHref}>{settings.whatsappLabel}</a>}
          </div>
          {submitMessage && (
            <p className={`contact-form-status ${submitStatus === 'error' ? 'error' : 'success'}`}>
              {submitMessage}
            </p>
          )}
        </form>
      </Reveal>

      <form name={NETLIFY_FORM_NAME} data-netlify="true" data-netlify-honeypot="bot-field" hidden>
        <input type="hidden" name="form-name" value={NETLIFY_FORM_NAME} />
        <input type="text" name="bot-field" />
        <input type="text" name="name" />
        <input type="email" name="email" />
        <input type="text" name="company" />
        <input type="text" name="service" />
        <input type="text" name="budget" />
        <input type="text" name="timeline" />
        <textarea name="message" />
        <input type="email" name="destinationEmail" />
        <input type="text" name="subject" />
      </form>

      <div style={{ marginTop: 128, paddingTop: 32, borderTop: '1px solid var(--hairline)', display: 'flex', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }} className="mono bone-faint">
        <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase' }}>(c) 2026 Leonardo Sanchez - All rights reserved</div>
        <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          <span style={{ color: 'var(--signal)' }}>o</span> Berlin {time}
        </div>
        <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase' }}>{footerBuild}</div>
      </div>
    </section>
  )
}
