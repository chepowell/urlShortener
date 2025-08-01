import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UrlModule } from './url/url.module';

@Module({
  imports: [UrlModule],
  controllers: [AppController],
})
export class AppModule {}

