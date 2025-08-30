import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async signup(email: string, password: string) {
    const hash = await bcrypt.hash(password, 10)
    const user = await this.prisma.user.create({
      data: { email, password: hash },
    })
    return { userId: user.id }
  }

  async signin(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } })
    if (!user) throw new Error('User not found')

    const match = await bcrypt.compare(password, user.password)
    if (!match) throw new Error('Invalid password')

    return { userId: user.id }
  }
}