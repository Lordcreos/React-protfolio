import { Reveal } from './Reveal'

interface StackCol { label: string; items: string[] }
interface StackProps { cols: StackCol[] }

export function Stack({ cols }: StackProps) {
  return (
    <section className="container" style={{ paddingTop: 128, paddingBottom: 128, borderTop: '1px solid var(--hairline)' }}>
      <Reveal style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 64, gap: 24, flexWrap: 'wrap' }}>
        <div className="sec-label">05 / Stack</div>
        <h2 className="sec-title" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', margin: 0 }}>
          Tools I <em style={{ fontStyle: 'italic', color: 'var(--signal)' }}>trust</em>.
        </h2>
      </Reveal>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 48, marginTop: 32 }}>
        {cols.map((col, i) => (
          <Reveal key={col.label} delay={i * 80}>
            <div className="mono signal" style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', paddingBottom: 16, borderBottom: '1px solid var(--hairline-strong)' }}>{col.label}</div>
            <div style={{ marginTop: 16 }}>
              {col.items.map((it) => (
                <span key={it} className="display stack-item" style={{ fontSize: 20, color: 'var(--bone)', lineHeight: 1.3 }}>{it}</span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
