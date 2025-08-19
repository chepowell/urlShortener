import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common'
import { PrismaService } from 'prisma/prisma.service'
import * as bcrypt from 'bcrypt'
import { randomUUID } from 'crypto'

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  // auth.service.ts
async signUp(email: string, password: string) {
  const passwordHash = await bcrypt.hash(password, 10)

  try {
    return await this.prisma.user.create({
      data: {
        id: randomUUID(),
        email,
        passwordHash,
      },
    })
  } catch (err) {
    if (
      err.code === 'P2002' &&
      err.meta?.target?.includes('email')
    ) {
      throw new BadRequestException('Email already in use')
    }
    throw err
  }
}


  async signIn(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } })
    if (!user) throw new UnauthorizedException('Invalid credentials')

    const isMatch = await bcrypt.compare(password, user.passwordHash)
    if (!isMatch) throw new UnauthorizedException('Invalid credentials')

    return { id: user.id, email: user.email }
  }
}