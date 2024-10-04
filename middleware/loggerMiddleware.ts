import type { Request, Response, NextFunction } from 'express';

export function loggerMiddleware(
  req: Request,
  _: Response,
  next: NextFunction
) {
  const currentTime = new Date().toISOString();
  const httpMethod = req.method;
  const path = req.originalUrl;
  console.log(`[${currentTime}] ${httpMethod} ${path}`);
  next();
}
