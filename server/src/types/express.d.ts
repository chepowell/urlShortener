import 'express';

declare module 'express' {
  interface Request {
    auth?: {
      userId: string;
      // any other Clerk auth data
    };
    user?: {
      id: string;
      email?: string;
    };
  }
}
