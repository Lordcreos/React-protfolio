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

const key = env['SUPABASE_SERVICE_ROLE_KEY']
const url = env['NEXT_PUBLIC_SUPABASE_URL']

const pdfPath = join(__dirname, '..', 'public', 'assets', 'Resume-Leonardo-Sanchez .pdf')
const pdf = readFileSync(pdfPath)

const res = await fetch(`${url}/storage/v1/object/uploads/cv/resume.pdf`, {
  method: 'POST',
  headers: {
    apikey: key,
    Authorization: `Bearer ${key}`,
    'Content-Type': 'application/pdf',
    'x-upsert': 'true',
  },
  body: pdf,
})

const data = await res.json()

if (res.ok) {
  const publicUrl = `${url}/storage/v1/object/public/uploads/cv/resume.pdf`
  console.log('✅  CV uploaded:', publicUrl)
  console.log('\nPublic URL:', publicUrl)
} else {
  console.error('❌  Error:', JSON.stringify(data))
}
