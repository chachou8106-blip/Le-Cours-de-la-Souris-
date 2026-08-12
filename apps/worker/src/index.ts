import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { prettyJSON } from 'hono/pretty-json';
import { healthRouter } from './routes/health';
import { countriesRouter } from './routes/countries';
import { reportsRouter } from './routes/reports';
import { indexRouter } from './routes/index';
import { chatRouter } from './routes/chat';
import { croqRouter } from './routes/croq';
import { adminRouter } from './routes/admin';
import { officialRatesRouter } from './routes/official-rates';
import { turnstileMiddleware } from './middleware/turnstile';
import { rateLimitMiddleware } from './middleware/rate-limit';
import { errorHandler } from './middleware/error';

const app = new Hono();

// Middleware global
app.use('*', logger(), cors(), prettyJSON(), rateLimitMiddleware);

// Routes publiques
app.route('/api/v1/health', healthRouter);
app.route('/api/v1/countries', countriesRouter);
app.route('/api/v1/reports', reportsRouter);
app.route('/api/v1/index', indexRouter);
app.route('/api/v1/chat', chatRouter);
app.route('/api/v1/croq', croqRouter);
app.route('/api/v1/official-rates', officialRatesRouter);

// Routes admin (protégées)
app.route('/api/v1/admin', adminRouter);

// Middleware de gestion des erreurs
app.onError(errorHandler);

// Route par défaut
app.get('*', (c) => c.json({ message: 'Bienvenue sur Le Cours de la Souris API!' }));

export default app;

export type AppType = typeof app;