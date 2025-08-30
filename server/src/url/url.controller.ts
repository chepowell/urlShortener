import { BadRequestException, Body, Controller, Headers, Post } from '@nestjs/common'
import { UrlService } from './url.service'
import { ConfigService } from '@nestjs/config'

@Controller()
export class UrlController {
  constructor(
    private readonly urlService: UrlService,
    private readonly config: ConfigService
  ) {}

  @Post('urls')
  async createShortUrl(
    @Body() body: any,
    @Headers('x-user-id') userId: string
  ) {
    const originalUrl = body?.originalUrl
    console.log('📦 Received originalUrl:', originalUrl)
    console.log('🧠 x-user-id header:', userId)

    if (!userId || !originalUrl) {
      throw new BadRequestException('Missing x-user-id header or originalUrl in body')
    }

    const result = await this.urlService.create(originalUrl, userId)

    return {
      shortUrl: `${this.config.get('BASE_URL') || 'http://localhost:3000'}/${result.slug}`,
    }
  }
}