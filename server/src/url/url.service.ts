import { Injectable } from '@nestjs/common';

@Injectable()
export class UrlService {
  private urlMap = new Map<string, string>();

  async generateSlug(originalUrl: string): Promise<string> {
    const slug = Math.random().toString(36).substring(2, 8);
    this.urlMap.set(slug, originalUrl);
    return slug;
  }

  getOriginalUrl(slug: string): string | undefined {
    return this.urlMap.get(slug);
  }
}
