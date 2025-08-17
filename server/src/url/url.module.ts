import { Module } from '@nestjs/common';
import { UrlService } from './url.service';
import { UrlController } from './url.controller';
import { PrismaService } from '../../prisma/prisma.service'; // 👈 Add this import

@Module({
  controllers: [UrlController],
  providers: [UrlService, PrismaService], // 👈 Include PrismaService here
  exports: [UrlService],
})
export class UrlModule {}
