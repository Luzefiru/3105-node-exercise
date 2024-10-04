import type { Request, Response, NextFunction } from 'express';

const MAX_REQUESTS = 5; // 5 requests
const RATE_LIMIT_WINDOW_MS = 30 * 1000; // 30 seconds

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

  if (count > MAX_REQUESTS) {
    return res.status(429).json({ msg: 'Too many requests' });
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
  return currentTime - startTime > RATE_LIMIT_WINDOW_MS;
}
