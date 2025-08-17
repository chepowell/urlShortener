// src/url/url.controller.ts
import { Body, Controller, Get, Param, Patch, Post, Res } from '@nestjs/common'
import { Response } from 'express'
import { UrlService } from './url.service'

@Controller()
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  // Existing endpoints...
  @Post('/shorten')
  createShortUrl(@Body() body: { originalUrl: string }) {
    return this.urlService.createShortUrl(body.originalUrl, 'default-user')
  }

  @Get('/urls')
  getAllUrls() {
    return this.urlService.getAllUrls()
  }

  @Get('/:slug')
  async redirectToOriginal(@Param('slug') slug: string, @Res() res: Response) {
    const url = await this.urlService.getOriginalUrl(slug)
    if (!url) return res.status(404).send('Not Found')
    return res.redirect(url)
  }

  // 🔧 NEW PATCH route for updating slug
  @Patch(':id/slug')
  async updateSlug(
    @Param('id') id: string,
    @Body('slug') slug: string,
  ) {
    const updated = await this.urlService.updateSlug(id, slug)
    return { slug: updated.slug }
  }
}
