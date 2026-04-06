import cron from 'node-cron';
import config from '../config.js';
import { createLogger } from '../utils/logger.js';
import { discoverStories } from './discovery.js';

const log = createLogger('Scheduler');

let task = null;

/**
 * Start the background discovery scheduler.
 * Polls NewsAPI on the configured cron schedule, rotating through categories.
 */
export function startScheduler() {
  if (task) {
    log.warn('Scheduler already running');
    return;
  }

  const cronExpr = config.discoveryCron;
  if (!cron.validate(cronExpr)) {
    log.error('Invalid cron expression', { cron: cronExpr });
    return;
  }

  task = cron.schedule(cronExpr, async () => {
    log.info('Scheduled discovery cycle starting');
    try {
      const result = await discoverStories(); // auto-rotates category
      log.info('Scheduled discovery complete', result);
    } catch (err) {
      log.error('Scheduled discovery failed', { error: err.message });
    }
  });

  log.info('Scheduler started', { cron: cronExpr });
}

/**
 * Stop the background scheduler.
 */
export function stopScheduler() {
  if (task) {
    task.stop();
    task = null;
    log.info('Scheduler stopped');
  }
}

/**
 * Manually trigger one discovery cycle (for the API endpoint).
 * @param {object} [opts] — { country, category }
 */
export async function runDiscoveryNow(opts) {
  log.info('Manual discovery triggered', opts || { mode: 'auto-rotate' });
  return discoverStories(opts);
}
