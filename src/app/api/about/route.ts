import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth'
import { z } from 'zod'

const experienceSchema = z.object({
  company: z.string().min(1),
  designation: z.string().min(1),
  experience: z.string().min(1),
  list: z.array(z.string()),
  order: z.number().optional(),
})

export async function GET() {
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: { order: 'asc' }
    })

    const skillsData = await prisma.skill.findMany({
      orderBy: { order: 'asc' }
    })

    const profile = await prisma.profile.findFirst()

    // Group skills by category with full objects
    const groupedSkills = {
      frontEnd: skillsData.filter(s => s.category === 'frontEnd'),
      backEnd: skillsData.filter(s => s.category === 'backEnd'),
      tools: skillsData.filter(s => s.category === 'tools'),
      other: skillsData.filter(s => s.category === 'other'),
    }

    // Simplified version for backward compatibility
    const skills = {
      frontEnd: skillsData.filter(s => s.category === 'frontEnd').map(s => s.name),
      backEnd: skillsData.filter(s => s.category === 'backEnd').map(s => s.name),
      tools: skillsData.filter(s => s.category === 'tools').map(s => s.name),
      other: skillsData.filter(s => s.category === 'other').map(s => s.name),
    }

    return NextResponse.json({ experiences, skills, groupedSkills, profile })
  } catch (error) {
    console.error('Error fetching about data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch about data' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const authResponse = await requireAdmin()
    if (authResponse) return authResponse

    const body = await request.json()
    const validatedData = experienceSchema.parse(body)

    const experience = await prisma.experience.create({
      data: validatedData,
    })

    return NextResponse.json(experience, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error creating experience:', error)
    return NextResponse.json(
      { error: 'Failed to create experience' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const authResponse = await requireAdmin()
    if (authResponse) return authResponse

    const body = await request.json()
    const { id, ...data } = body
    
    if (!id) {
      return NextResponse.json(
        { error: 'Experience ID is required' },
        { status: 400 }
      )
    }

    const validatedData = experienceSchema.parse(data)

    const experience = await prisma.experience.update({
      where: { id },
      data: validatedData,
    })

    return NextResponse.json(experience)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error updating experience:', error)
    return NextResponse.json(
      { error: 'Failed to update experience' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const authResponse = await requireAdmin()
    if (authResponse) return authResponse

    const body = await request.json()
    const { id } = body
    
    if (!id) {
      return NextResponse.json(
        { error: 'Experience ID is required' },
        { status: 400 }
      )
    }

    await prisma.experience.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Experience deleted successfully' })
  } catch (error) {
    console.error('Error deleting experience:', error)
    return NextResponse.json(
      { error: 'Failed to delete experience' },
      { status: 500 }
    )
  }
}
