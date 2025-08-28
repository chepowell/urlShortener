import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { nanoid } from 'nanoid'

@Injectable()
export class UrlService {
  constructor(private prisma: PrismaService) {}

  async create(originalUrl: string, userId: string) {
    const slug = nanoid(6)

    return await this.prisma.url.create({
      data: {
        originalUrl,
        slug,
        createdById: userId,
      },
    })
  }

  async findAllByUser(userId: string) {
    return this.prisma.url.findMany({
      where: { createdById: userId },
      orderBy: { createdAt: 'desc' },
    })
  }

  async updateSlug(id: string, newSlug: string, userId: string) {
    return this.prisma.url.update({
      where: { id },
      data: {
        slug: newSlug,
      },
    })
  }

  async incrementVisit(slug: string) {
    return this.prisma.url.update({
      where: { slug },
      data: {
        visits: { increment: 1 },
      },
    })
  }

  async findBySlug(slug: string) {
    return this.prisma.url.findUnique({ where: { slug } })
  }
}