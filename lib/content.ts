import fs from 'fs'
import path from 'path'
import { supabase, supabaseAdmin } from './supabase'

const contentDir = path.join(process.cwd(), 'content')

export async function readContent<T>(section: string): Promise<T> {
  const { data, error } = await supabase
    .from('content')
    .select('data')
    .eq('section', section)
    .single()

  if (!error && data) {
    return data.data as T
  }

  // Fallback to local JSON during initial migration
  const file = path.join(contentDir, `${section}.json`)
  if (fs.existsSync(file)) {
    const raw = fs.readFileSync(file, 'utf-8')
    return JSON.parse(raw) as T
  }

  throw new Error(`Content not found for section: ${section}`)
}

export async function writeContent(section: string, data: unknown): Promise<void> {
  const { error } = await supabaseAdmin
    .from('content')
    .upsert({ section, data }, { onConflict: 'section' })

  if (error) throw new Error(error.message)
}

export const SECTIONS = ['hero', 'now', 'work', 'lab', 'stack', 'approach', 'services', 'contact'] as const
export type Section = typeof SECTIONS[number]

