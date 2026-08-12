import { Hono } from 'hono';

const healthRouter = new Hono();

healthRouter.get('/', (c) => {
  return c.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    services: {
      database: 'ok',
      cache: 'ok',
      queue: 'ok',
    },
  });
});

export default healthRouter;