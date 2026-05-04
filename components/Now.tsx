import { Reveal } from './Reveal'

interface NowProps {
  company: string
  university: string
  highlight: string
}

export function Now({ company, university, highlight }: NowProps) {
  return (
    <section className="container" style={{ paddingTop: 96, paddingBottom: 96, borderTop: '1px solid var(--hairline)' }}>
      <Reveal className="grid12" style={{ alignItems: 'baseline' }}>
        <div className="sec-label now-label" style={{ gridColumn: 'span 2' }}>02 / Now</div>
        <p className="display now-text" style={{ gridColumn: 'span 10', fontSize: 'clamp(1.5rem, 3.4vw, 3rem)', color: 'var(--bone-muted)', lineHeight: 1.2, margin: 0, fontWeight: 300 }}>
          Currently: Senior Frontend Engineer at{' '}
          <span style={{ color: 'var(--bone)' }}>{company}</span>, pursuing an M.Sc. in AI at{' '}
          <span style={{ color: 'var(--bone)' }}>{university}</span>, and building{' '}
          <em style={{ fontStyle: 'italic', color: 'var(--signal)' }}>{highlight}</em> for fun.
        </p>
      </Reveal>
    </section>
  )
}
