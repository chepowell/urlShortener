import { Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';
import { PrismaService } from '../prisma/prisma.service';

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
    const record = await this.prisma.url.findUnique({
      where: { slug },
    });

    return record?.originalUrl || null;
  }

  async getAllUrls() {
    return this.prisma.url.findMany();
  }
}
