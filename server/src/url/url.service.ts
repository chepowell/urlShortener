// server/src/url/url.service.ts

import { Injectable } from '@nestjs/common'
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
      orderBy: { visitCount: 'desc' }, // sort by most visited for dashboard
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

  async updateSlug(id: string, slug: string) {
    try {
      return await this.prisma.url.update({
        where: { id },
        data: { slug },
      })
    } catch (err: any) {
      if (err.code === 'P2002') {
        // Prisma unique constraint violation
        throw new Error('Slug already exists')
      }
      throw err
    }
  }
}