import { NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import { join } from 'path'
import { requireAdmin } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const authResponse = await requireAdmin()
    if (authResponse) return authResponse

    const formData = await request.formData()
    const file = formData.get('file') as File
    const type = formData.get('type') as string // 'image' or 'pdf'

    if (!file) {
      return NextResponse.json(
        { error: 'No se proporcionó ningún archivo' },
        { status: 400 }
      )
    }

    // Validar tipo de archivo
    if (type === 'image' && !file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'El archivo debe ser una imagen' },
        { status: 400 }
      )
    }

    if (type === 'pdf' && file.type !== 'application/pdf') {
      return NextResponse.json(
        { error: 'El archivo debe ser un PDF' },
        { status: 400 }
      )
    }

    // Validar tamaño (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'El archivo es demasiado grande (máximo 5MB)' },
        { status: 400 }
      )
    }

    // Obtener extensión del archivo
    const extension = file.name.split('.').pop()
    
    // Crear nombre único para el archivo
    const timestamp = Date.now()
    const fileName = type === 'image' 
      ? `profile-${timestamp}.${extension}`
      : `resume-${timestamp}.${extension}`

    // Convertir el archivo a buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Guardar el archivo en la carpeta public
    const publicPath = join(process.cwd(), 'public', fileName)
    await writeFile(publicPath, buffer)

    // Retornar la URL del archivo
    const fileUrl = `/${fileName}`

    return NextResponse.json({ 
      success: true, 
      url: fileUrl,
      fileName: fileName
    })
  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json(
      { error: 'Error al subir el archivo' },
      { status: 500 }
    )
  }
}
