import config from '../config.js';
import { createLogger } from '../utils/logger.js';
import { insertStories } from '../db/repository.js';

const log = createLogger('Discovery');

/**
 * Fetch top-headlines from NewsAPI for a given country + category.
 * @param {string} country — 2-letter country code (us, gb, in, etc.)
 * @param {string} category — one of: technology, science, business, health, general
 * @returns {Promise<object[]>} — array of raw article objects
 */
async function fetchHeadlines(country, category) {
  const params = new URLSearchParams({
    country,
    category,
    pageSize: String(config.newsapi.pageSize),
    apiKey: config.newsapi.key,
  });

  const url = config.newsapi.baseUrl + '/top-headlines?' + params.toString();
  log.info('Fetching headlines: country=' + country + ', category=' + category);

  const res = await fetch(url);

  if (!res.ok) {
    const body = await res.text();
    throw new Error('NewsAPI error ' + res.status + ': ' + body);
  }

  const data = await res.json();

  if (data.status !== 'ok') {
    throw new Error('NewsAPI returned status: ' + data.status + ' — ' + (data.message || ''));
  }

  const count = data.articles ? data.articles.length : 0;
  log.info('Received ' + count + ' articles for ' + country + '/' + category);
  return (data.articles || []).filter(function(a) {
    return a.url && a.title && a.title !== '[Removed]';
  });
}

/**
 * Build a flat list of all (country, category) combos for rotation.
 * With 3 countries × 5 categories = 15 combos.
 * Each scheduled poll picks the next combo in sequence.
 */
function buildRotation() {
  const combos = [];
  for (const country of config.newsapi.countries) {
    for (const cat of config.newsapi.categories) {
      combos.push({ country, category: cat });
    }
  }
  return combos;
}

const rotation = buildRotation();
let _rotationIndex = 0;

/**
 * Run a single discovery cycle for one country+category combo.
 * If no arguments given, picks the next combo in rotation.
 * @param {object} [opts] — { country, category }
 * @returns {Promise<{ country: string, category: string, fetched: number, inserted: number }>}
 */
export async function discoverStories(opts) {
  let country, category;

  if (opts && opts.country && opts.category) {
    country = opts.country;
    category = opts.category;
  } else if (opts && opts.category) {
    // Default country to first in list
    country = config.newsapi.countries[0];
    category = opts.category;
  } else {
    // Auto-rotate
    const combo = rotation[_rotationIndex % rotation.length];
    country = combo.country;
    category = combo.category;
    _rotationIndex++;
  }

  const articles = await fetchHeadlines(country, category);

  // Tag each article with category and country before inserting
  const tagged = articles.map(function(a) {
    return Object.assign({}, a, { category: category, region: country });
  });
  const inserted = insertStories(tagged);

  log.info('Discovery complete: ' + country + '/' + category + ', fetched=' + articles.length + ', new=' + inserted);

  return { country, category, fetched: articles.length, inserted };
}

/**
 * Run discovery for ALL country+category combos.
 * Use sparingly — costs (countries × categories) API calls.
 * With 3 countries × 5 categories = 15 calls.
 */
export async function discoverAll() {
  const results = [];
  for (const combo of rotation) {
    try {
      const r = await discoverStories(combo);
      results.push(r);
    } catch (err) {
      log.error('Discovery failed for ' + combo.country + '/' + combo.category, { error: err.message });
      results.push({
        country: combo.country,
        category: combo.category,
        fetched: 0,
        inserted: 0,
        error: err.message,
      });
    }
  }
  return results;
}
