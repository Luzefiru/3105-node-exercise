export const env = {
  JWT_SECRET: process.env.JWT_SECRET || 'secret',
  PORT: process.env.PORT || 3000,
  RATE_LIMIT_MAX_REQUESTS: Number(process.env.MAX_REQUESTS) || 5,
  RATE_LIMIT_WINDOW_MS: Number(process.env.RATE_LIMIT_WINDOW_MS) || 30 * 1000,
};
