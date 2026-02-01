import Link from 'next/link';

const copy = {
  label: 'Page not found',
  title: "Oops, this route doesn't exist",
  description: "The page you're looking for may have been moved or removed. Head back home or contact me if you need help.",
  ctaHome: 'Go to home',
  ctaContact: 'Contact me'
};

export default function NotFound() {
  const t = copy;

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-6 py-20">
      <div className="relative w-full max-w-4xl">
        <div className="absolute inset-0 -z-10 blur-3xl opacity-40 bg-gradient-to-r from-primary-500/30 via-cyan-500/20 to-blue-500/30" />

        <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] items-center bg-slate-900/70 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl backdrop-blur-xl">
          <div>
            <div className="inline-flex items-center gap-3 rounded-full px-4 py-2 bg-white/5 border border-white/10">
              <span className="text-xs uppercase tracking-[0.3em] text-primary-300">{t.label}</span>
            </div>

            <div className="mt-5 flex items-center gap-4">
              <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-cyan-400">
                404
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">{t.title}</h1>
              </div>
            </div>

            <p className="mt-6 text-gray-300 leading-relaxed">{t.description}</p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link href="/">
                <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-primary-500 to-cyan-500 text-white font-semibold shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 transition-all">
                  {t.ctaHome}
                </button>
              </Link>
              <Link href="/contact">
                <button className="px-6 py-3 rounded-lg border border-primary-500/40 text-gray-200 font-semibold hover:bg-primary-500/10 transition-all">
                  {t.ctaContact}
                </button>
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 -z-10 blur-2xl opacity-70 bg-gradient-to-b from-primary-500/30 via-cyan-500/20 to-transparent" />
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-6 shadow-xl">
              <svg
                viewBox="0 0 420 320"
                className="w-full h-auto"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="glow" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity="0.6" />
                  </linearGradient>
                  <linearGradient id="grid" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0f172a" />
                    <stop offset="100%" stopColor="#020617" />
                  </linearGradient>
                </defs>
                <rect x="0" y="0" width="420" height="320" rx="18" fill="url(#grid)" />
                <g opacity="0.4">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <line key={`h-${i}`} x1="0" y1={40 + i * 28} x2="420" y2={40 + i * 28} stroke="#1e293b" />
                  ))}
                  {Array.from({ length: 9 }).map((_, i) => (
                    <line key={`v-${i}`} x1={30 + i * 40} y1="0" x2={30 + i * 40} y2="320" stroke="#1e293b" />
                  ))}
                </g>
                <circle cx="120" cy="120" r="70" fill="url(#glow)" opacity="0.35" />
                <circle cx="285" cy="150" r="90" fill="url(#glow)" opacity="0.25" />
                <path
                  d="M60 230c40-40 100-60 170-35 50 18 90 65 140 60"
                  fill="none"
                  stroke="url(#glow)"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                <g>
                  <circle cx="150" cy="160" r="10" fill="#38bdf8" />
                  <circle cx="250" cy="190" r="10" fill="#818cf8" />
                  <circle cx="320" cy="110" r="8" fill="#22d3ee" />
                </g>
              </svg>
              <div className="mt-4 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-slate-400">
                <span>Signal lost</span>
                <span>Reconnect</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
