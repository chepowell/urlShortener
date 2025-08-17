import { Injectable, BadRequestException } from '@nestjs/common';
import { nanoid } from 'nanoid';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UrlService {
  constructor(private prisma: PrismaService) {}

  async createShortUrl(
    originalUrl: string,
    userId: string,
  ): Promise<{ slug: string; shortUrl: string }> {
    const slug = nanoid(6);
    const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
    const shortUrl = `${baseUrl}/${slug}`;

    await this.prisma.url.create({
      data: {
        originalUrl,
        slug,
        createdById: userId,
      },
    });
    

    return { slug, shortUrl };
  }

  async getOriginalUrl(slug: string): Promise<string | null> {
    const url = await this.prisma.url.findUnique({
      where: { slug },
    });
  
    if (!url) return null;
  
    // Increment the visit count
    // await this.prisma.url.update({
    //   where: { slug },
    //   data: { visits: { increment: 1 } },
    // });
  
    return url.originalUrl;
  }

  async getAllUrls() {
    return this.prisma.url.findMany();
  }

  async updateSlug(id: string, slug: string) {
    return this.prisma.url.update({
      where: { id },
      data: { slug },
    })
  }
  
  
}
