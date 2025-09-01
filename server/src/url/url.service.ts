// server/src/url/url.service.ts
import { Injectable, BadRequestException } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { nanoid } from 'nanoid'

@Injectable()
export class UrlService {
  constructor(private prisma: PrismaService) {}

  async create(originalUrl: string, userId: string) {
    const slug = nanoid(6)
    return this.prisma.url.create({
      data: {
        slug,
        originalUrl,
        userId,
        visitCount: 0,
      },
    })
  }

  async findByUser(userId: string) {
    return this.prisma.url.findMany({
      where: { userId },
      orderBy: { visitCount: 'desc' },
    })
  }

  async findBySlug(slug: string) {
    return this.prisma.url.findUnique({
      where: { slug },
    })
  }

  async incrementVisitCount(slug: string) {
    return this.prisma.url.update({
      where: { slug },
      data: {
        visitCount: { increment: 1 },
      },
    })
  }

  async updateSlug(id: string, newSlug: string) {
    const existing = await this.prisma.url.findUnique({ where: { slug: newSlug } })
    if (existing) {
      throw new BadRequestException('Slug already taken')
    }

    return this.prisma.url.update({
      where: { id },
      data: { slug: newSlug },
    })
  }
}