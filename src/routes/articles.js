import { Router } from 'express';
import { getArticles, getArticleById } from '../db/repository.js';
import { createLogger } from '../utils/logger.js';

const log = createLogger('Routes:Articles');
const router = Router();

/**
 * GET /api/articles
 * List generated articles with pagination.
 * Query params: limit, offset
 */
router.get('/', (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit || '20', 10), 100);
    const offset = parseInt(req.query.offset || '0', 10);

    const articles = getArticles({ limit, offset });

    // Parse JSON fields for the response
    const parsed = articles.map(a => ({
      ...a,
      sources: safeParse(a.sources_json),
      flags: safeParse(a.flags_json),
      sources_json: undefined,
      flags_json: undefined,
    }));

    res.json({ count: parsed.length, articles: parsed });
  } catch (err) {
    log.error('Failed to list articles', { error: err.message });
    res.status(500).json({ error: 'Failed to retrieve articles' });
  }
});

/**
 * GET /api/articles/:id
 * Get a single generated article by ID.
 */
router.get('/:id', (req, res) => {
  try {
    const article = getArticleById(parseInt(req.params.id, 10));
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    res.json({
      ...article,
      sources: safeParse(article.sources_json),
      flags: safeParse(article.flags_json),
      sources_json: undefined,
      flags_json: undefined,
    });
  } catch (err) {
    log.error('Failed to get article', { error: err.message });
    res.status(500).json({ error: 'Failed to retrieve article' });
  }
});

function safeParse(json) {
  try {
    return JSON.parse(json);
  } catch {
    return [];
  }
}

export default router;
