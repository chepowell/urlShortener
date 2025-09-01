import { Controller, Get, Param, Res } from '@nestjs/common'
import { UrlService } from '../url/url.service'
import { Response } from 'express'

@Controller()
export class RedirectController {
  constructor(private readonly urlService: UrlService) {}

  @Get(':slug')
  async redirectToOriginal(@Param('slug') slug: string, @Res() res: Response) {
    const url = await this.urlService.findBySlug(slug)
    if (url?.originalUrl) {
      await this.urlService.incrementVisitCount(slug)
      return res.redirect(url.originalUrl)
    } else {
      return res.status(404).json({ error: 'Slug not found' })
    }
  }
}