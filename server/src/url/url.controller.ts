// server/src/url/url.controller.ts
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Req,
  Res,
  BadRequestException,
} from '@nestjs/common'
import { UrlService } from './url.service'
import { Response } from 'express'

@Controller('urls')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post()
  async create(@Body() body: any, @Req() req: any) {
    const { originalUrl } = body
    const userId = req.userId
    if (!userId) throw new BadRequestException('Missing userId')
    return this.urlService.create(originalUrl, userId)
  }

  @Get()
  async getUrls(@Req() req: any) {
    const userId = req.userId
    return this.urlService.findByUser(userId)
  }

  @Get(':slug')
  async redirect(@Param('slug') slug: string, @Res() res: Response) {
    const url = await this.urlService.findBySlug(slug)
    if (!url) {
      return res.status(404).json({ message: 'URL not found' })
    }

  await this.urlService.incrementVisitCount(slug)
  return res.redirect(url.originalUrl)
}

  @Patch(':id')
  async updateSlug(@Param('id') id: string, @Body() body: any) {
    const { slug } = body
    if (!slug) throw new BadRequestException('Missing slug')
    return this.urlService.updateSlug(id, slug)
  }
}