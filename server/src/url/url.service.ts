import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UrlService {
  constructor(private configService: ConfigService) {}

  async generateSlug(originalUrl: string): Promise<string> {
    const { nanoid } = await import('nanoid'); // ← dynamic import here
    const slug = nanoid(6);

    const baseUrl = this.configService.get<string>('BASE_URL') || 'http://localhost:5053';
    return `${baseUrl}/${slug}`;
  }
}
