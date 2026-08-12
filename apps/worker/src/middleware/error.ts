import { Context } from 'hono';

export const errorHandler = (err: Error, c: Context) => {
  console.error(`[${new Date().toISOString()}] Erreur :`, err.message);
  return c.json(
    {
      success: false,
      error: 'Une erreur interne est survenue',
      timestamp: new Date().toISOString(),
    },
    500
  );
};