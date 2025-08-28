import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async signup(email: string, password: string) {
    const existingUser = await this.prisma.user.findUnique({ where: { email } });
    if (existingUser) throw new BadRequestException('Email already in use');

    const hashed = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashed, 
      },
    });

    return { message: 'Signup successful', userId: user.id };
  }

  async signin(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isMatch = await bcrypt.compare(password, user.password); // 👈 Use `password`, not `passwordHash`
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    const token = this.jwt.sign({ userId: user.id });
    return { token };
  }
}