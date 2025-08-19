// prisma/seed.ts
import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  const users = [
    { email: 'alice@example.com' },
    { email: 'bob@example.com' },
    { email: 'carol@example.com' },
  ]

  const password = 'password'
  const passwordHash = await bcrypt.hash(password, 10)

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        email: user.email,
        passwordHash,
      },
    })
  }

  console.log('✅ Seeded users successfully.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
