import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { json } from 'express';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors();
  // Ensure body parsing works (should already be default, but safe to include)
  app.use(json());

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 5053;

  await app.listen(port);
  console.log(`🚀 Server running at http://localhost:${port}`);
}
bootstrap();
