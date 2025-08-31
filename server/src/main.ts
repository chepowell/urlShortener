import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(json());

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 5053;

  await app.listen(port, '0.0.0.0');
  console.log(`🚀 Server running at http://localhost:${port}`);
}
bootstrap();