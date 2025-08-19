// server/src/url/url.controller.ts
import { Controller, Get, Post, Patch, Param, Body, Req } from '@nestjs/common';
import { UrlService } from './url.service';
import { Request } from 'express';

@Controller()
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post('shorten')
  createShortUrl(@Body() body: { originalUrl: string }, @Req() req: Request) {
    return this.urlService.createShortUrl(body.originalUrl, (req as any).userId);
  }

  @Get('urls')
  getAllUrls(@Req() req: Request) {
    return this.urlService.getAllUrls((req as any).userId);
  }

  @Patch(':id/slug')
  updateSlug(@Param('id') id: string, @Body('slug') slug: string, @Req() req: Request) {
    return this.urlService.updateSlug(id, slug);
  }
  @Get(':slug')
  redirectToOriginal(@Param('slug') slug: string) {
    return this.urlService.getOriginalUrl(slug);
  }
}
