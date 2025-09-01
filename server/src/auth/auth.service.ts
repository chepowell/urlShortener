import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(email: string, password: string) {
    const hashed = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: { email, password: hashed },
    });
    return { userId: user.id };
  }

  async signin(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user || !user.password) {
      throw new Error('Invalid credentials');
    }

    try {
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        throw new Error('Invalid credentials');
      }

      return { userId: user.id };
    } catch (err) {
      console.error('Error comparing password:', err);
      throw new Error('Server error');
    }
  }
}
