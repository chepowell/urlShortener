import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { UrlService } from './url.service';

@Controller('shorten')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post()
  async createShortUrl(@Body() body: { originalUrl: string }) {

    const { originalUrl } = body;

    if (!originalUrl || !originalUrl.startsWith('http')) {
      console.log('[Backend] Invalid URL:', originalUrl);
      throw new BadRequestException('Invalid URL');
    }

    const slug = await this.urlService.generateSlug(originalUrl);
    
    return { slug, shortUrl: `http://localhost:5050/${slug}` };
  }
}

