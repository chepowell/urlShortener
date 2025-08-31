// server/src/url/url.controller.ts
import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Res,
  Req,
} from '@nestjs/common'
import { UrlService } from './url.service'
import { ConfigService } from '@nestjs/config'
import { Response } from 'express'

@Controller()
export class UrlController {
  constructor(
    private readonly urlService: UrlService,
    private readonly config: ConfigService
  ) {}

  @Post('urls')
  async createShortUrl(
    @Body('originalUrl') originalUrl: string,
    @Headers('x-user-id') userId: string
  ) {
    if (!userId) throw new Error('Missing x-user-id header')
    const result = await this.urlService.create(originalUrl, userId)

    return {
      shortUrl: `${this.config.get('BASE_URL') || 'http://localhost:3000'}/${result.slug}`,
    }
  }

  @Get('/urls')
  getUrls(@Req() req: Request) {
    const userId = req.headers['x-user-id'] as string
    console.log('GET /urls - userId:', userId)

    return this.urlService.findByUser(userId)
}

  @Get(':slug')
  async redirect(@Param('slug') slug: string, @Res() res: Response) {
    const url = await this.urlService.findBySlug(slug)
    if (url) {
      await this.urlService.incrementVisitCount(slug)
      return res.redirect(url.originalUrl)
    }
    return res.status(404).json({ message: 'URL not found' })
  }
}