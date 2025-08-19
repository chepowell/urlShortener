// src/auth/auth.module.ts
import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { PrismaService } from 'prisma/prisma.service'

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService], // ✅ Both need to be here
  exports: [AuthService], // ✅ Export if you need to use AuthService elsewhere
})
export class AuthModule {}
