import { Module } from '@nestjs/common';
import { RedirectController } from './redirect.controller';
import { UrlService } from '../url/url.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [RedirectController],
  providers: [UrlService, PrismaService],
})
export class RedirectModule {}
