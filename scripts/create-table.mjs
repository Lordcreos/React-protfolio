/**
 * Creates the content table and RLS policies in Supabase via pg connection.
 * Uses pg (postgres) driver directly.
 */
import { createClient } from '@supabase/supabase-js'
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
const serviceKey = env['SUPABASE_SERVICE_ROLE_KEY']

// Use the Supabase REST API with rpc to run raw SQL via pg_stat_activity workaround
// We'll use the PostgREST direct SQL endpoint available on Supabase
const SQL = `
CREATE TABLE IF NOT EXISTS public.content (
  section TEXT PRIMARY KEY,
  data    JSONB NOT NULL
);

ALTER TABLE public.content ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename='content' AND policyname='public read'
  ) THEN
    CREATE POLICY "public read" ON public.content FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename='content' AND policyname='auth write'
  ) THEN
    CREATE POLICY "auth write" ON public.content FOR ALL USING (auth.role() = 'authenticated');
  END IF;
END $$;
`

const res = await fetch(`${url}/pg/query`, {
  method: 'POST',
  headers: {
    'apikey': serviceKey,
    'Authorization': `Bearer ${serviceKey}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ query: SQL }),
})

const text = await res.text()
if (res.ok) {
  console.log('✅  Table created successfully')
} else {
  console.error('❌  Failed:', text)
}
