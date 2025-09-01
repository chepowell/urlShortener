import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { json } from 'express';
import { UserMiddleware } from './middleware/user.middleware'; // ✅ Import it

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(json());

  // ✅ Register the UserMiddleware globally
  app.use(new UserMiddleware().use);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 5053;

  await app.listen(port, '0.0.0.0');
}
bootstrap();
