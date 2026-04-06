import express from 'express';
import cors from 'cors';
import config, { validateConfig } from './config.js';
import { initDatabase } from './db/schema.js';
import { startScheduler } from './services/scheduler.js';
import { createLogger } from './utils/logger.js';

import storiesRouter from './routes/stories.js';
import articlesRouter from './routes/articles.js';
import statusRouter from './routes/status.js';

const log = createLogger('Server');

// ─── Validate configuration ────────────────────────────────────────
const missing = validateConfig();
if (missing.length > 0) {
  log.error(`Missing required environment variables: ${missing.join(', ')}`);
  log.error('Copy .env.example to .env and fill in your API keys.');
  process.exit(1);
}

// ─── Initialize database ───────────────────────────────────────────
initDatabase();

// ─── Create Express app ────────────────────────────────────────────
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Request logging
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    log.info(`${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms`);
  });
  next();
});

// ─── API Routes ────────────────────────────────────────────────────
app.use('/api/stories', storiesRouter);
app.use('/api/articles', articlesRouter);
app.use('/api/status', statusRouter);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'Truth Engine',
    version: '1.0.0',
    description: 'Autonomous newsroom pipeline API',
    endpoints: {
      stories: '/api/stories',
      articles: '/api/articles',
      status: '/api/status',
      discover: 'POST /api/stories/discover',
      generate: 'POST /api/stories/:id/generate',
    },
  });
});

// ─── Error handler ─────────────────────────────────────────────────
app.use((err, req, res, _next) => {
  log.error('Unhandled error', { error: err.message, stack: err.stack });
  res.status(500).json({ error: 'Internal server error' });
});

// ─── Start server ──────────────────────────────────────────────────
app.listen(config.port, () => {
  log.info(`Truth Engine API running on http://localhost:${config.port}`);

  // Start background discovery scheduler
  startScheduler();
  log.info('Background discovery scheduler started');
});
