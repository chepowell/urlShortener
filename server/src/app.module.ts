import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';

import { UrlModule } from './url/url.module';
import { AuthModule } from './auth/auth.module';
import { RedirectModule } from './redirect/redirect.module';
import { UserMiddleware } from './middleware/user.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot({
      throttlers: [{ limit: 10, ttl: 60 }],
    }),
    UrlModule,
    AuthModule,
    RedirectModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserMiddleware)
      .exclude(
        { path: ':slug', method: RequestMethod.GET },
        { path: 'auth/signup', method: RequestMethod.POST },
        { path: 'auth/signin', method: RequestMethod.POST },
      )
      .forRoutes(
        { path: 'urls', method: RequestMethod.GET },
        { path: 'urls', method: RequestMethod.POST },
        { path: 'urls/:id', method: RequestMethod.PATCH },
      );
  }
}
