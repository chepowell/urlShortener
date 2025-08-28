import { Controller, Post, Body, Headers, Get, Param, Patch } from '@nestjs/common'
import { UrlService } from './url.service'
import { ConfigService } from '@nestjs/config'

@Controller()
export class UrlController {
  constructor(
    private readonly urlService: UrlService,
    private readonly config: ConfigService
  ) {}

  @Post('shorten')
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

  @Get('urls')
  async getUrls(@Headers('x-user-id') userId: string) {
    if (!userId) throw new Error('Missing x-user-id header')
    return this.urlService.findAllByUser(userId)
  }

  @Patch(':id/slug')
  async updateSlug(
    @Param('id') id: string,
    @Body('newSlug') newSlug: string,
    @Headers('x-user-id') userId: string
  ) {
    if (!userId) throw new Error('Missing x-user-id header')
    const result = await this.urlService.updateSlug(id, newSlug, userId)

    return {
      shortUrl: `${this.config.get('BASE_URL') || 'http://localhost:3000'}/${result.slug}`,
    }
  }
}