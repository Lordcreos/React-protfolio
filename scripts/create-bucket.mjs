import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const envPath = join(__dirname, '..', '.env.local')
const env = Object.fromEntries(
  readFileSync(envPath, 'utf-8')
    .split('\n')
    .filter(l => l && !l.startsWith('#') && l.includes('='))
    .map(l => [l.slice(0, l.indexOf('=')).trim(), l.slice(l.indexOf('=') + 1).trim()])
)

const url = env['NEXT_PUBLIC_SUPABASE_URL']
const key = env['SUPABASE_SERVICE_ROLE_KEY']

const res = await fetch(`${url}/storage/v1/bucket`, {
  method: 'POST',
  headers: {
    apikey: key,
    Authorization: `Bearer ${key}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ id: 'uploads', name: 'uploads', public: true }),
})

const data = await res.json()

if (res.ok) {
  console.log('✅  Bucket "uploads" created (public)')
} else if (data.error === 'Duplicate') {
  console.log('✅  Bucket "uploads" already exists')
} else {
  console.error('❌  Error:', JSON.stringify(data))
}
