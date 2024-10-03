import type { Request, Response, NextFunction } from 'express';

export function loggerMiddleware(
  req: Request,
  _: Response,
  next: NextFunction
) {
  const now = new Date().toISOString();
  const httpMethod = req.method;
  const path = req.originalUrl;
  console.log(`[${now}] ${httpMethod} ${path}`);
  next();
}
