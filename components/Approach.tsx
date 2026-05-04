import { Reveal } from './Reveal'

interface Principle { n: string; t: string; b: string }
interface ApproachProps { headline: string; principles: Principle[] }

export function Approach({ principles }: ApproachProps) {
  return (
    <section id="approach" className="container" style={{ paddingTop: 160, paddingBottom: 160, borderTop: '1px solid var(--hairline)' }}>
      <Reveal>
        <h2 className="display" style={{ fontSize: 'clamp(2.8rem, 8vw, 7rem)', letterSpacing: '-0.04em', lineHeight: 0.95, margin: '0 0 96px 0', maxWidth: '14ch', fontWeight: 300, color: 'var(--bone)' }}>
          Judgment over velocity.<br />
          Velocity <em style={{ fontStyle: 'italic', color: 'var(--signal)' }}>with</em> AI.
        </h2>
      </Reveal>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 48 }}>
        {principles.map((p, i) => (
          <Reveal key={p.n} delay={i * 90}>
            <div className="mono signal" style={{ fontSize: 13, letterSpacing: '0.2em' }}>→ {p.n}</div>
            <h3 className="display" style={{ fontSize: 'clamp(1.3rem, 2vw, 1.7rem)', color: 'var(--bone)', margin: '16px 0', letterSpacing: '-0.02em', lineHeight: 1.1, fontWeight: 300 }}>{p.t}</h3>
            <p className="bone-muted" style={{ fontSize: 14, lineHeight: 1.6, margin: 0 }}>{p.b}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
