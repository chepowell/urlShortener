import { Controller, Post, Body, Req, Get, Param, Res } from '@nestjs/common';
import { UrlService } from './url.service';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';

@Controller()
export class UrlController {
  constructor(
    private readonly urlService: UrlService,
    private readonly config: ConfigService
  ) {}

  @Post('urls')
  async createShortUrl(@Body('originalUrl') originalUrl: string, @Req() req: Request) {
    const userId = (req as any).userId;

    if (!userId) {
      return {
        statusCode: 401,
        message: 'Missing x-user-id header',
      };
    }

    if (!originalUrl || !/^https?:\/\//.test(originalUrl)) {
      return {
        statusCode: 400,
        message: 'Invalid or missing URL',
      };
    }

    const result = await this.urlService.create(originalUrl, userId);

    return {
      shortUrl: `${this.config.get('BASE_URL') || 'http://localhost:3000'}/${result.slug}`,
    };
  }

  @Get(':slug')
  async redirect(@Param('slug') slug: string, @Res() res: Response) {
    const url = await this.urlService.findBySlug(slug);
    if (!url) {
      return res.status(404).json({ message: 'URL not found' });
    }

    return res.redirect(url.originalUrl);
  }
}