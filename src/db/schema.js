import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import config from '../config.js';
import { createLogger } from '../utils/logger.js';

const log = createLogger('DB');

let db = null;

/**
 * Initialize the SQLite database and create tables if they don't exist.
 * @returns {Database.Database}
 */
export function initDatabase() {
  if (db) return db;

  // Ensure the data directory exists
  const dir = path.dirname(config.dbPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  db = new Database(config.dbPath);

  // Enable WAL mode for better concurrent read performance
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');

  db.exec(`
    CREATE TABLE IF NOT EXISTS stories (
      id              INTEGER PRIMARY KEY AUTOINCREMENT,
      newsapi_title   TEXT NOT NULL,
      newsapi_description TEXT,
      newsapi_url     TEXT UNIQUE NOT NULL,
      newsapi_source  TEXT,
      newsapi_image_url TEXT,
      newsapi_published_at TEXT,
      category        TEXT,
      region          TEXT,
      status          TEXT NOT NULL DEFAULT 'pending',
      created_at      TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS idx_stories_status ON stories(status);
    CREATE INDEX IF NOT EXISTS idx_stories_created ON stories(created_at);

    CREATE TABLE IF NOT EXISTS articles (
      id                INTEGER PRIMARY KEY AUTOINCREMENT,
      story_id          INTEGER NOT NULL UNIQUE,
      headline          TEXT NOT NULL,
      dek               TEXT,
      section           TEXT,
      body              TEXT NOT NULL,
      sources_json      TEXT,
      confidence        TEXT,
      flags_json        TEXT,
      estimated_read_time INTEGER,
      ai_disclosure     TEXT,
      generated_at      TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (story_id) REFERENCES stories(id)
    );

    CREATE INDEX IF NOT EXISTS idx_articles_story ON articles(story_id);
    CREATE INDEX IF NOT EXISTS idx_articles_generated ON articles(generated_at);
  `);

  log.info('Database initialized', { path: config.dbPath });
  return db;
}

/**
 * Get the active database instance (must call initDatabase first).
 * @returns {Database.Database}
 */
export function getDb() {
  if (!db) throw new Error('Database not initialized. Call initDatabase() first.');
  return db;
}
