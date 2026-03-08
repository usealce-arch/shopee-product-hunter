ALTER TABLE products_current ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'all';
CREATE INDEX IF NOT EXISTS idx_products_category ON products_current(category);
