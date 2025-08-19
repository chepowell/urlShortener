// server/src/middleware/user.middleware.ts
import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

export interface RequestWithUser extends Request {
  userId?: string
}

@Injectable()
export class UserMiddleware implements NestMiddleware {
  use(req: RequestWithUser, res: Response, next: NextFunction) {
    // Allow signup/signin without requiring user ID
    if (req.path.startsWith('/auth')) {
      return next()
    }

    const userId = req.header('x-user-id')

    console.log('🧠 x-user-id header:', userId) // <-- log for debugging

    if (!userId) {
      throw new UnauthorizedException('Missing x-user-id header')
    }

    req.userId = userId
    next()
  }
}
