/**
 * Seed script: migrates local JSON content files to Supabase.
 * Usage: node scripts/seed-supabase.mjs
 *
 * Requires SUPABASE_SERVICE_ROLE_KEY in .env.local to bypass RLS.
 * Get it from: Supabase dashboard → Project Settings → API → service_role key
 */
import { createClient } from '@supabase/supabase-js'
import { readFileSync, readdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Load .env.local manually
const envPath = join(__dirname, '..', '.env.local')
const env = Object.fromEntries(
  readFileSync(envPath, 'utf-8')
    .split('\n')
    .filter(l => l && !l.startsWith('#') && l.includes('='))
    .map(l => l.split('=').map((p, i) => i === 0 ? p.trim() : l.slice(l.indexOf('=') + 1).trim()))
)

const url = env['NEXT_PUBLIC_SUPABASE_URL']
const serviceKey = env['SUPABASE_SERVICE_ROLE_KEY']

if (!serviceKey) {
  console.error('\n❌  Missing SUPABASE_SERVICE_ROLE_KEY in .env.local')
  console.error('   Get it from: Supabase dashboard → Project Settings → API → service_role\n')
  process.exit(1)
}

const supabase = createClient(url, serviceKey)
const contentDir = join(__dirname, '..', 'content')

const sections = ['hero', 'now', 'work', 'lab', 'stack', 'approach', 'services', 'contact']

for (const section of sections) {
  const file = join(contentDir, `${section}.json`)
  const data = JSON.parse(readFileSync(file, 'utf-8'))

  const { error } = await supabase
    .from('content')
    .upsert({ section, data }, { onConflict: 'section' })

  if (error) {
    console.error(`❌  ${section}: ${error.message}`)
  } else {
    console.log(`✅  ${section} seeded`)
  }
}

console.log('\nDone.')
