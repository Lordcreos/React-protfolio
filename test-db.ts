// Script para probar la conexión a MongoDB Atlas
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
})

async function testConnection() {
  try {
    console.log('🔄 Intentando conectar a MongoDB Atlas...')
    console.log('Connection string:', process.env.DATABASE_URL?.replace(/\/\/.*:.*@/, '//***:***@'))
    
    // Intentar una operación simple
    await prisma.$connect()
    console.log('✅ Conexión exitosa a MongoDB Atlas!')
    
    // Intentar listar las colecciones
    const experiences = await prisma.experience.findMany()
    console.log(`📊 Experiencias encontradas: ${experiences.length}`)
    
    const skills = await prisma.skill.findMany()
    console.log(`🛠️ Skills encontradas: ${skills.length}`)
    
    await prisma.$disconnect()
    console.log('✅ Test completado exitosamente')
  } catch (error) {
    console.error('❌ Error de conexión:', error)
    console.log('\n📋 Pasos para solucionar:')
    console.log('1. Ve a MongoDB Atlas → Database Access')
    console.log('2. Asegúrate de que el usuario "portfolio" existe')
    console.log('3. Verifica que la contraseña sea "Portfolio1"')
    console.log('4. Ve a Network Access → Agrega 0.0.0.0/0')
    console.log('5. Espera 1-2 minutos para que los cambios se propaguen')
    process.exit(1)
  }
}

testConnection()
