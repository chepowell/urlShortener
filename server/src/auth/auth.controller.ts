// server/src/auth/auth.controller.ts
import { Controller, Post, Body, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly prisma: PrismaService, private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() body: { email: string; password: string }) {
    const { email, password } = body;

    const existing = await this.prisma.user.findUnique({ where: { email } });
    if (existing) throw new BadRequestException('User already exists');

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: { email, passwordHash },
    });

    return { id: user.id, email: user.email };
  }

  @Post('signin')
  async signIn(@Body() body: { email: string; password: string }) {
    const user = await this.authService.signIn(body.email, body.password)
    if (!user) {
      throw new UnauthorizedException('Invalid credentials')
    }
    return { userId: user.id }
  }
}
