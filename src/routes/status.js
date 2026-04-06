import { Router } from 'express';
import { getStats } from '../db/repository.js';
import { getQueueDepth } from '../services/gemini.js';
import { createLogger } from '../utils/logger.js';

const log = createLogger('Routes:Status');
const router = Router();

/**
 * GET /api/status
 * Pipeline health dashboard: story counts, queue depth, uptime.
 */
router.get('/', (req, res) => {
  try {
    const stats = getStats();
    const queueDepth = getQueueDepth();
    const uptimeSeconds = Math.floor(process.uptime());

    res.json({
      status: 'ok',
      uptime: `${Math.floor(uptimeSeconds / 60)}m ${uptimeSeconds % 60}s`,
      pipeline: {
        stories: stats.stories,
        totalArticles: stats.totalArticles,
        lastDiscovery: stats.lastDiscovery,
        generationQueueDepth: queueDepth,
      },
    });
  } catch (err) {
    log.error('Failed to get status', { error: err.message });
    res.status(500).json({ status: 'error', error: err.message });
  }
});

export default router;
