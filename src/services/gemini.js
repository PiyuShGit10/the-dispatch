import { GoogleGenAI } from '@google/genai';
import config from '../config.js';
import { createLogger } from '../utils/logger.js';
import { SYSTEM_PROMPT, buildUserMessage } from '../utils/prompts.js';
import { RateLimiter } from './rateLimiter.js';
import {
  getStoryById,
  updateStoryStatus,
  insertArticle,
  getArticleByStoryId,
} from '../db/repository.js';

const log = createLogger('Gemini');

let ai = null;
let limiter = null;

function init() {
  if (ai) return;
  ai = new GoogleGenAI({ apiKey: config.gemini.key });
  limiter = new RateLimiter({
    maxPerMinute: config.gemini.maxRpm,
    maxRetries: config.gemini.maxRetries,
    name: 'gemini',
  });
  log.info('Gemini service initialized', { model: config.gemini.model });
}

/**
 * Extract valid JSON from a Gemini response that may include markdown fences.
 */
function extractJson(text) {
  // Strip markdown code fences if present
  let cleaned = text.trim();
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```(?:json)?\s*\n?/, '').replace(/\n?```\s*$/, '');
  }
  return JSON.parse(cleaned);
}

/**
 * Validate that the parsed article has all required fields.
 */
function validateArticle(obj) {
  const required = ['headline', 'body'];
  for (const field of required) {
    if (!obj[field]) {
      throw new Error(`Generated article missing required field: ${field}`);
    }
  }
  // Ensure sources is an array
  if (!Array.isArray(obj.sources)) {
    obj.sources = [];
  }
  if (!Array.isArray(obj.flags)) {
    obj.flags = [];
  }
  return obj;
}

/**
 * Generate a full article for a story stub.
 * This is the main pipeline entry point — call it from the API route.
 *
 * @param {number} storyId — ID of a story in the DB
 * @returns {Promise<object>} — the generated article row
 */
export async function generateArticle(storyId) {
  init();

  const story = getStoryById(storyId);
  if (!story) {
    throw new Error(`Story not found: ${storyId}`);
  }

  // Prevent double-generation
  const existing = getArticleByStoryId(storyId);
  if (existing) {
    log.info(`Article already exists for story ${storyId}, returning cached`);
    return existing;
  }

  if (story.status === 'generating') {
    throw new Error(`Story ${storyId} is already being generated`);
  }

  // Mark as in-progress
  updateStoryStatus(storyId, 'generating');
  log.info(`Starting generation for story ${storyId}: "${story.newsapi_title}"`);

  try {
    const article = await limiter.schedule(async () => {
      const response = await ai.models.generateContent({
        model: config.gemini.model,
        contents: buildUserMessage(story),
        config: {
          systemInstruction: SYSTEM_PROMPT,
          temperature: 0.7,
          maxOutputTokens: 4096,
        },
      });

      const text = response.text;
      if (!text) {
        throw new Error('Gemini returned empty response');
      }

      log.debug('Raw Gemini response length', { chars: text.length });
      return extractJson(text);
    });

    const validated = validateArticle(article);

    // Persist to database
    const result = insertArticle({
      story_id: storyId,
      headline: validated.headline,
      dek: validated.dek || '',
      section: validated.section || '',
      body: validated.body,
      sources: validated.sources,
      confidence: validated.confidence || 'low',
      flags: validated.flags,
      estimated_read_time: validated.estimated_read_time || 0,
      ai_disclosure: validated.ai_disclosure || 'This article was reported and written by an autonomous AI editorial system.',
    });

    updateStoryStatus(storyId, 'generated');
    log.info(`Generation complete for story ${storyId}: "${validated.headline}"`);

    return getArticleByStoryId(storyId);
  } catch (err) {
    updateStoryStatus(storyId, 'failed');
    log.error(`Generation failed for story ${storyId}`, { error: err.message });
    throw err;
  }
}

/**
 * Get current queue depth for status reporting.
 */
export function getQueueDepth() {
  return limiter?.queueDepth || 0;
}
