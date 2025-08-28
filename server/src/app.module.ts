// server/src/app.module.ts
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // ✅ import ConfigModule
import { ThrottlerModule } from '@nestjs/throttler'
import { UrlModule } from './url/url.module';
import { AuthModule } from './auth/auth.module';
import { UserMiddleware } from './middleware/user.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // ✅ makes ConfigService available app-wide
    }),
    UrlModule,
    AuthModule,
  ],
})

export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserMiddleware)
      .exclude(
        { path: 'auth/signup', method: RequestMethod.POST },
        { path: 'auth/signin', method: RequestMethod.POST }
      )
      .forRoutes(
        { path: 'shorten', method: RequestMethod.POST },
        { path: 'urls', method: RequestMethod.GET },
        { path: ':slug/slug', method: RequestMethod.PATCH }
      );
  }
}
