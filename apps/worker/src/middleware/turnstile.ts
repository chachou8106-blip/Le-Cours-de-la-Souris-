import { Context, Next } from 'hono';

interface TurnstileResponse {
  success: boolean;
  challenge_ts: string;
  hostname: string;
  'error-codes'?: string[];
}

export const turnstileMiddleware = async (c: Context, next: Next) => {
  if (c.req.method !== 'POST') {
    return next();
  }

  const token = c.req.header('CF-Turnstile-Response');
  if (!token) {
    return c.json({ error: 'Turnstile token manquant' }, 400);
  }

  try {
    const TURNSTILE_SECRET = c.env.TURNSTILE_SECRET;
    const response = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `secret=${TURNSTILE_SECRET}&response=${token}`,
      }
    );

    const data: TurnstileResponse = await response.json();
    if (!data.success) {
      return c.json({ error: 'Échec de la vérification Turnstile' }, 403);
    }

    return next();
  } catch (error) {
    return c.json({ error: 'Erreur de vérification Turnstile' }, 500);
  }
};