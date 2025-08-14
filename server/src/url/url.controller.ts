import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Res,
  NotFoundException,
  Req,
} from '@nestjs/common';
import { UrlService } from './url.service';
import { Response, Request } from 'express';

@Controller()
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post('/shorten')
  async shortenUrl(@Body('originalUrl') originalUrl: string, @Req() req: Request) {
    const userId = req.auth?.userId || req.user?.id;

    if (!userId) {
      throw new NotFoundException('User not authenticated');
    }

    return this.urlService.createShortUrl(originalUrl, userId);
  }

  @Get('/:slug')
  async redirect(@Param('slug') slug: string, @Res() res: Response) {
    const originalUrl = await this.urlService.getOriginalUrl(slug);
    if (originalUrl) {
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
