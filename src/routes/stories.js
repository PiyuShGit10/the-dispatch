import { Router } from 'express';
import { getStories, getStoryById } from '../db/repository.js';
import { generateArticle } from '../services/gemini.js';
import { runDiscoveryNow, } from '../services/scheduler.js';
import { createLogger } from '../utils/logger.js';

const log = createLogger('Routes:Stories');
const router = Router();

/**
 * GET /api/stories
 * List stories with optional filtering and pagination.
 * Query params: status (pending|generating|generated|failed), limit, offset
 */
router.get('/', (req, res) => {
  try {
    const status = req.query.status || undefined;
    const limit = Math.min(parseInt(req.query.limit || '20', 10), 100);
    const offset = parseInt(req.query.offset || '0', 10);

    const stories = getStories({ status, limit, offset });
    res.json({ count: stories.length, stories });
  } catch (err) {
    log.error('Failed to list stories', { error: err.message });
    res.status(500).json({ error: 'Failed to retrieve stories' });
  }
});

/**
 * GET /api/stories/:id
 * Get a single story by ID.
 */
router.get('/:id', (req, res) => {
  try {
    const story = getStoryById(parseInt(req.params.id, 10));
    if (!story) {
      return res.status(404).json({ error: 'Story not found' });
    }
    res.json(story);
  } catch (err) {
    log.error('Failed to get story', { error: err.message });
    res.status(500).json({ error: 'Failed to retrieve story' });
  }
});

/**
 * POST /api/stories/:id/generate
 * Trigger article generation for a specific story.
 * Returns the generated article on success.
 */
router.post('/:id/generate', async (req, res) => {
  const storyId = parseInt(req.params.id, 10);

  try {
    const story = getStoryById(storyId);
    if (!story) {
      return res.status(404).json({ error: 'Story not found' });
    }

    log.info(`Generation requested for story ${storyId}`);
    const article = await generateArticle(storyId);

    res.json({
      message: 'Article generated successfully',
      article,
    });
  } catch (err) {
    log.error(`Generation failed for story ${storyId}`, { error: err.message });

    if (err.message.includes('already being generated')) {
      return res.status(409).json({ error: err.message });
    }
    if (err.message.includes('already exists')) {
      return res.status(200).json({ message: 'Article already generated', cached: true });
    }

    res.status(500).json({ error: 'Article generation failed', details: err.message });
  }
});

/**
 * POST /api/discover
 * Manually trigger a discovery cycle.
 * Optional body: { "category": "technology", "country": "us" }
 */
router.post('/discover', async (req, res) => {
  try {
    const opts = {};
    if (req.body?.category) opts.category = req.body.category;
    if (req.body?.country) opts.country = req.body.country;
    const result = await runDiscoveryNow(Object.keys(opts).length > 0 ? opts : undefined);
    res.json({ message: 'Discovery complete', ...result });
  } catch (err) {
    log.error('Manual discovery failed', { error: err.message });
    res.status(500).json({ error: 'Discovery failed', details: err.message });
  }
});

export default router;
