import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

@Injectable()
export class UserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const publicRoutes = [
      { method: 'POST', path: '/auth/signup' },
      { method: 'POST', path: '/auth/signin' },
    ]

    // Allow public auth routes
    if (publicRoutes.some(route => route.method === req.method && route.path === req.path)) {
      return next()
    }

    // Allow public redirect routes like GET /:slug (e.g. GET /abc123)
    if (req.method === 'GET' && /^\/[a-zA-Z0-9_-]{6}$/.test(req.path)) {
      return next()
    }

    const userId = req.headers['x-user-id'] as string

    if (!userId) {
      return res.status(401).json({
        statusCode: 401,
        message: 'Missing x-user-id header',
        error: 'Unauthorized',
      })
    }

    req['userId'] = userId
    next()
  }
}