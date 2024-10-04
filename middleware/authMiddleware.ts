import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      // Makes the JWT payload accessible via res.locals.decodedToken
      res.locals.decodedToken = jwt.verify(
        authorization.substring(7),
        env.JWT_SECRET
      );
    } catch {
      return res.status(401).json({ msg: 'Your auth token is invalid.' });
    }
  } else {
    return res.status(401).json({ msg: 'Your auth token is missing.' });
  }
  next();
}
