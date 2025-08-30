// server/src/app.module.ts
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ThrottlerModule } from '@nestjs/throttler'
import { UrlModule } from './url/url.module'
import { AuthModule } from './auth/auth.module'
import { UserMiddleware } from './middleware/user.middleware'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    // ✅ This is the correct Throttler setup
    ThrottlerModule.forRoot({
      throttlers: [
        {
          limit: 10,
          ttl: 60,
        },
      ],
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
        { path: 'urls', method: RequestMethod.POST },
        { path: 'urls', method: RequestMethod.GET },
        { path: ':slug/slug', method: RequestMethod.PATCH }
      )
  }
}