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
    const userId = 'default-user';

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

  // ✅ MOVE THIS ABOVE :slug
  @Get('/urls')
  async getAll() {
    return this.urlService.getAllUrls();
  }

  @Get('/:slug')
  async redirect(@Param('slug') slug: string, @Res() res: Response) {
    const originalUrl = await this.urlService.getOriginalUrl(slug);

    if (originalUrl) {
      return res.redirect(originalUrl);
    } else {
      return res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3000'}/404`);
    }
  }
}

