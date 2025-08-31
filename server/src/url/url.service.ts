import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { nanoid } from 'nanoid';

@Injectable()
export class UrlService {
  constructor(private readonly prisma: PrismaService) {}

  async create(originalUrl: string, userId: string) {
    const slug = nanoid(6);
    return this.prisma.url.create({
      data: {
        originalUrl,
        slug,
        userId,
        visitCount: 0,
      },
    });
  }

  async findBySlug(slug: string) {
    return this.prisma.url.findUnique({
      where: { slug },
    });
  }
}