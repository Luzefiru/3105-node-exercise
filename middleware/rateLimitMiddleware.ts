import type { Request, Response, NextFunction } from 'express';
import { env } from '../config/env';

const requestCounts: Record<string, { count: number; startTime: number }> = {};

export function rateLimitMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const clientIp = req.ip;
  const currentTime = Date.now();

  let { count, startTime } = requestCounts[clientIp] || {
    count: 0,
    startTime: currentTime,
  };

  if (isWindowExpired(startTime, currentTime)) {
    count = 1;
    startTime = currentTime;
  } else {
    count += 1;
  }

  requestCounts[clientIp] = { count, startTime };

  if (count > env.MAX_REQUESTS) {
    return res
      .status(429)
      .json({ msg: 'Too many requests. Please try again later.' });
  }

  next();
}

/**
 *
 * @param startTime time (ms) of specific client's first request
 * @param currentTime the current time (ms)
 * @returns
 */
function isWindowExpired(startTime: number, currentTime: number) {
  return currentTime - startTime > env.RATE_LIMIT_WINDOW_MS;
}
