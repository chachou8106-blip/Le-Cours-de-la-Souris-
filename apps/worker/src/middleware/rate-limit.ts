import { Context, Next } from 'hono';

export const rateLimitMiddleware = async (c: Context, next: Next) => {
  const ip = c.req.header('CF-Connecting-IP') || 'unknown';
  const KV = c.env.KV;
  const key = `rate-limit:${ip}`;
  
  const RATE_LIMIT_WINDOW = 60; // 1 minute
  const MAX_REQUESTS = 100; // 100 requêtes par minute
  
  const current = await KV.get(key, { type: 'json' });
  const now = Math.floor(Date.now() / 1000);
  
  if (!current) {
    await KV.put(key, JSON.stringify({ count: 1, timestamp: now }), {
      expirationTtl: RATE_LIMIT_WINDOW,
    });
    return next();
  }

  if (now - current.timestamp < RATE_LIMIT_WINDOW) {
    if (current.count >= MAX_REQUESTS) {
      return c.json({ error: 'Trop de requêtes. Veuillez réessayer plus tard.' }, 429);
    }
    await KV.put(
      key,
      JSON.stringify({ count: current.count + 1, timestamp: current.timestamp }),
      { expirationTtl: RATE_LIMIT_WINDOW - (now - current.timestamp) }
    );
  } else {
    await KV.put(key, JSON.stringify({ count: 1, timestamp: now }), {
      expirationTtl: RATE_LIMIT_WINDOW,
    });
  }

  return next();
};