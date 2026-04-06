import { createLogger } from '../utils/logger.js';

const log = createLogger('RateLimiter');

/**
 * A simple serial queue with minimum delay between executions.
 * Designed for API rate-limit compliance.
 */
export class RateLimiter {
  /**
   * @param {object} opts
   * @param {number} opts.maxPerMinute — max requests per minute
   * @param {number} opts.maxRetries — retry count on 429 errors
   * @param {string} opts.name — label for logging
   */
  constructor({ maxPerMinute = 12, maxRetries = 3, name = 'default' } = {}) {
    this.minDelayMs = Math.ceil(60_000 / maxPerMinute);
    this.maxRetries = maxRetries;
    this.name = name;
    this._queue = [];
    this._running = false;
    this._lastRequestTime = 0;
  }

  /**
   * Enqueue an async function to run within rate limits.
   * Returns a promise that resolves/rejects with the function's result.
   * @param {() => Promise<T>} fn
   * @returns {Promise<T>}
   */
  schedule(fn) {
    return new Promise((resolve, reject) => {
      this._queue.push({ fn, resolve, reject });
      this._process();
    });
  }

  async _process() {
    if (this._running) return;
    this._running = true;

    while (this._queue.length > 0) {
      const { fn, resolve, reject } = this._queue.shift();

      // Enforce minimum delay
      const elapsed = Date.now() - this._lastRequestTime;
      if (elapsed < this.minDelayMs) {
        const wait = this.minDelayMs - elapsed;
        log.debug(`[${this.name}] Waiting ${wait}ms before next request`);
        await sleep(wait);
      }

      let lastError = null;
      for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
        try {
          this._lastRequestTime = Date.now();
          const result = await fn();
          resolve(result);
          lastError = null;
          break;
        } catch (err) {
          lastError = err;
          const status = err?.status || err?.httpStatus || err?.code;

          if (status === 429 || status === '429') {
            const backoff = Math.min(2 ** attempt * 2000, 30_000);
            log.warn(`[${this.name}] Rate limited (429). Retry ${attempt}/${this.maxRetries} after ${backoff}ms`);
            await sleep(backoff);
          } else {
            // Non-retryable error
            log.error(`[${this.name}] Request failed (attempt ${attempt})`, {
              error: err.message || err,
            });
            break;
          }
        }
      }

      if (lastError) {
        reject(lastError);
      }
    }

    this._running = false;
  }

  get queueDepth() {
    return this._queue.length;
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
