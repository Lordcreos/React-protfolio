import { NextRequest, NextResponse } from 'next/server'
import { readContent, writeContent, SECTIONS } from '@/lib/content'
import { isAuthenticated } from '@/lib/auth'

type Params = { params: Promise<{ section: string }> }

export async function GET(_req: NextRequest, { params }: Params) {
  const { section } = await params
  if (!SECTIONS.includes(section as typeof SECTIONS[number])) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  const data = await readContent(section)
  return NextResponse.json(data)
}

export async function PUT(req: NextRequest, { params }: Params) {
  const { section } = await params
  if (!SECTIONS.includes(section as typeof SECTIONS[number])) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const body = await req.json()
  try {
    await writeContent(section, body)
  } catch (err) {
    console.error('[PUT /api/content]', err)
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
  return NextResponse.json({ ok: true })
}
