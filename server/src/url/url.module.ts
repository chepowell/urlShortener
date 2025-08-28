import { Module } from '@nestjs/common';
import { UrlService } from './url.service';
import { UrlController } from './url.controller';
import { PrismaService } from '../../prisma/prisma.service'; 

@Module({
  controllers: [UrlController],
  providers: [UrlService, PrismaService],
  exports: [UrlService],
})
export class UrlModule {}
