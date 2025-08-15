import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Res,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { UrlService } from './url.service';
import { Response } from 'express';
import { isURL } from 'validator';

@Controller()
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post('/shorten')
  async shortenUrl(
    @Body('originalUrl') originalUrl: string,
  ): Promise<{ slug: string; shortUrl: string }> {
    const userId = 'default-user'; // Replace with real user ID when auth is added

    console.log('[Controller] Received originalUrl:', originalUrl);

    // Use relaxed validation (allow underscore, allow protocol-less URLs)
    if (
      !isURL(originalUrl, {
        require_protocol: true,
        protocols: ['http', 'https'],
        require_host: true,
        allow_underscores: true,
        allow_trailing_dot: false,
      })
    ) {
      throw new BadRequestException('Invalid URL format');
    }

    return this.urlService.createShortUrl(originalUrl, userId);
  }

  @Get('/:slug')
  async redirect(@Param('slug') slug: string, @Res() res: Response) {
    const originalUrl = await this.urlService.getOriginalUrl(slug);

    if (originalUrl) {
      console.log(`[Redirect] Found original URL: ${originalUrl}`);
      return res.redirect(originalUrl);
    } else {
      throw new NotFoundException('Slug not found');
    }
  }

  @Get('/urls')
  async getAll() {
    return this.urlService.getAllUrls();
  }
}
