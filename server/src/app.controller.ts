import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { UrlService } from './url/url.service';

@Controller()
export class AppController {
  constructor(private readonly urlService: UrlService) {}

  @Get(':slug')
  handleRedirect(@Param('slug') slug: string, @Res() res: Response) {
    const originalUrl = this.urlService.getOriginalUrl(slug);
    if (!originalUrl) {
      return res.status(404).send('Not found');
    }

    return res.redirect(originalUrl);
  }
}
