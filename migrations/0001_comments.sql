-- migrations/0001_comments.sql
-- Run with: npx wrangler d1 execute astralearnia-comments --remote --file=./migrations/0001_comments.sql

CREATE TABLE IF NOT EXISTS comments (
  id         INTEGER  PRIMARY KEY AUTOINCREMENT,
  slug       TEXT     NOT NULL,
  name       TEXT     NOT NULL,
  email      TEXT,
  message    TEXT     NOT NULL,
  status     TEXT     NOT NULL DEFAULT 'approved',
  created_at DATETIME NOT NULL DEFAULT (datetime('now'))
);

-- Fast lookups by post slug
CREATE INDEX IF NOT EXISTS idx_comments_slug_status
  ON comments (slug, status, created_at DESC);