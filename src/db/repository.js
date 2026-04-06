import { getDb } from './schema.js';

// ─── Stories ────────────────────────────────────────────────────────

const stmts = {};

function prepare() {
  if (stmts._ready) return;
  const db = getDb();

  stmts.upsertStory = db.prepare(`
    INSERT INTO stories (newsapi_title, newsapi_description, newsapi_url, newsapi_source, newsapi_image_url, newsapi_published_at, category, region)
    VALUES (@newsapi_title, @newsapi_description, @newsapi_url, @newsapi_source, @newsapi_image_url, @newsapi_published_at, @category, @region)
    ON CONFLICT(newsapi_url) DO NOTHING
  `);

  stmts.getStoryById = db.prepare(`SELECT * FROM stories WHERE id = ?`);

  stmts.updateStoryStatus = db.prepare(`UPDATE stories SET status = ? WHERE id = ?`);

  stmts.insertArticle = db.prepare(`
    INSERT INTO articles (story_id, headline, dek, section, body, sources_json, confidence, flags_json, estimated_read_time, ai_disclosure)
    VALUES (@story_id, @headline, @dek, @section, @body, @sources_json, @confidence, @flags_json, @estimated_read_time, @ai_disclosure)
  `);

  stmts.getArticleByStoryId = db.prepare(`SELECT * FROM articles WHERE story_id = ?`);

  stmts.getArticleById = db.prepare(`SELECT * FROM articles WHERE id = ?`);

  stmts._ready = true;
}

/**
 * Insert a story stub, ignoring duplicates by URL.
 * @returns {{ changes: number }} — changes=1 if new, 0 if duplicate
 */
export function insertStory(story) {
  prepare();
  return stmts.upsertStory.run({
    newsapi_title: story.title || '',
    newsapi_description: story.description || null,
    newsapi_url: story.url,
    newsapi_source: story.source?.name || story.source || null,
    newsapi_image_url: story.urlToImage || null,
    newsapi_published_at: story.publishedAt || null,
    category: story.category || null,
    region: story.region || null,
  });
}

/**
 * Bulk insert stories inside a transaction.
 * @returns {number} count of new stories inserted
 */
export function insertStories(stories) {
  prepare();
  const db = getDb();
  let inserted = 0;
  const tx = db.transaction((items) => {
    for (const s of items) {
      const result = stmts.upsertStory.run({
        newsapi_title: s.title || '',
        newsapi_description: s.description || null,
        newsapi_url: s.url,
        newsapi_source: s.source?.name || s.source || null,
        newsapi_image_url: s.urlToImage || null,
        newsapi_published_at: s.publishedAt || null,
        category: s.category || null,
        region: s.region || null,
      });
      if (result.changes > 0) inserted++;
    }
  });
  tx(stories);
  return inserted;
}

export function getStoryById(id) {
  prepare();
  return stmts.getStoryById.get(id);
}

/**
 * List stories with optional status filter and pagination.
 */
export function getStories({ status, limit = 20, offset = 0 } = {}) {
  prepare();
  const db = getDb();
  if (status) {
    return db.prepare(
      `SELECT * FROM stories WHERE status = ? ORDER BY created_at DESC LIMIT ? OFFSET ?`
    ).all(status, limit, offset);
  }
  return db.prepare(
    `SELECT * FROM stories ORDER BY created_at DESC LIMIT ? OFFSET ?`
  ).all(limit, offset);
}

export function updateStoryStatus(id, status) {
  prepare();
  return stmts.updateStoryStatus.run(status, id);
}

// ─── Articles ───────────────────────────────────────────────────────

export function insertArticle(article) {
  prepare();
  return stmts.insertArticle.run({
    story_id: article.story_id,
    headline: article.headline,
    dek: article.dek || null,
    section: article.section || null,
    body: article.body,
    sources_json: JSON.stringify(article.sources || []),
    confidence: article.confidence || 'low',
    flags_json: JSON.stringify(article.flags || []),
    estimated_read_time: article.estimated_read_time || null,
    ai_disclosure: article.ai_disclosure || 'This article was reported and written by an autonomous AI editorial system.',
  });
}

export function getArticleByStoryId(storyId) {
  prepare();
  return stmts.getArticleByStoryId.get(storyId);
}

export function getArticleById(id) {
  prepare();
  return stmts.getArticleById.get(id);
}

/**
 * List generated articles with pagination, joined with story metadata.
 */
export function getArticles({ limit = 20, offset = 0 } = {}) {
  prepare();
  const db = getDb();
  return db.prepare(`
    SELECT
      a.*,
      s.newsapi_title AS original_title,
      s.newsapi_source AS original_source,
      s.newsapi_url AS original_url,
      s.newsapi_image_url,
      s.category,
      s.region
    FROM articles a
    JOIN stories s ON a.story_id = s.id
    ORDER BY a.generated_at DESC
    LIMIT ? OFFSET ?
  `).all(limit, offset);
}

// ─── Stats ──────────────────────────────────────────────────────────

export function getStats() {
  const db = getDb();
  const counts = db.prepare(`
    SELECT status, COUNT(*) as count FROM stories GROUP BY status
  `).all();

  const totalArticles = db.prepare(`SELECT COUNT(*) as count FROM articles`).get();

  const lastDiscovery = db.prepare(
    `SELECT created_at FROM stories ORDER BY created_at DESC LIMIT 1`
  ).get();

  return {
    stories: Object.fromEntries(counts.map(r => [r.status, r.count])),
    totalArticles: totalArticles?.count || 0,
    lastDiscovery: lastDiscovery?.created_at || null,
  };
}
