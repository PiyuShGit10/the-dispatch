import 'dotenv/config';

const config = {
  // Server
  port: parseInt(process.env.PORT || '3000', 10),

  // NewsAPI
  newsapi: {
    key: process.env.NEWSAPI_KEY || '',
    baseUrl: 'https://newsapi.org/v2',
    countries: (process.env.NEWSAPI_COUNTRIES || 'us').split(',').map(c => c.trim()),
    categories: ['technology', 'science', 'business', 'health', 'general'],
    pageSize: 20,
  },

  // Google Gemini
  gemini: {
    key: process.env.GEMINI_API_KEY || '',
    model: process.env.GEMINI_MODEL || 'gemini-2.5-flash',
    maxRpm: parseInt(process.env.GEMINI_MAX_RPM || '12', 10),
    maxRetries: 3,
  },

  // Scheduler
  discoveryCron: process.env.DISCOVERY_CRON || '0 */8 * * *',

  // Database
  dbPath: process.env.DB_PATH || './data/newsroom.db',
};

/**
 * Validate that required API keys are present.
 * Returns array of missing key names (empty if all good).
 */
export function validateConfig() {
  const missing = [];
  if (!config.newsapi.key) missing.push('NEWSAPI_KEY');
  if (!config.gemini.key) missing.push('GEMINI_API_KEY');
  return missing;
}

export default config;
