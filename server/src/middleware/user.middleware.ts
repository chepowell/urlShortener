import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const userId = req.headers['x-user-id'];

    if (typeof userId === 'string') {
      (req as any).userId = userId;
    } else {
      (req as any).userId = undefined;
    }

    next();
  }
}