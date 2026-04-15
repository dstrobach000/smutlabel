CREATE TABLE IF NOT EXISTS comments (
  id TEXT PRIMARY KEY,
  catalog_id TEXT NOT NULL,
  parent_id TEXT,
  nick TEXT NOT NULL,
  body TEXT NOT NULL,
  created_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_comments_catalog ON comments(catalog_id, created_at);
