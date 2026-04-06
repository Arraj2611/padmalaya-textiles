-- ─────────────────────────────────────────────────────────────────
-- Padmalaya Textiles — Supabase schema
-- Run once in the Supabase SQL editor (or via supabase db push)
-- ─────────────────────────────────────────────────────────────────

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id            UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  name          TEXT        NOT NULL,
  slug          TEXT        NOT NULL UNIQUE,
  size          TEXT,
  weight        TEXT,
  tag           TEXT,
  description   TEXT,
  image_url     TEXT,
  images        TEXT[]      DEFAULT '{}',
  features      TEXT[]      DEFAULT '{}',
  colors        TEXT[]      DEFAULT '{}',
  is_featured   BOOLEAN     DEFAULT false,
  display_order INTEGER     DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT now(),
  updated_at    TIMESTAMPTZ DEFAULT now()
);

-- Enquiries table (quote form submissions)
CREATE TABLE IF NOT EXISTS enquiries (
  id                UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  name              TEXT        NOT NULL,
  email             TEXT        NOT NULL,
  company           TEXT,
  message           TEXT,
  selected_products TEXT[]      DEFAULT '{}',
  clerk_user_id     TEXT,
  status            TEXT        DEFAULT 'new'
                                CHECK (status IN ('new', 'contacted', 'quoted', 'closed')),
  created_at        TIMESTAMPTZ DEFAULT now()
);

-- Admin users table (linked to Clerk)
CREATE TABLE IF NOT EXISTS admin_users (
  id            UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  clerk_user_id TEXT        NOT NULL UNIQUE,
  role          TEXT        DEFAULT 'admin'
                            CHECK (role IN ('admin', 'super_admin')),
  created_at    TIMESTAMPTZ DEFAULT now()
);

-- updated_at trigger for products
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS products_updated_at ON products;
CREATE TRIGGER products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ─── Row Level Security ───────────────────────────────────────────
ALTER TABLE products    ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries   ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Products: anyone can read
CREATE POLICY IF NOT EXISTS "Products are viewable by everyone"
  ON products FOR SELECT USING (true);

-- Enquiries: anyone can insert (form submission), only service role can read
CREATE POLICY IF NOT EXISTS "Anyone can submit enquiries"
  ON enquiries FOR INSERT WITH CHECK (true);

-- ─── Indexes ─────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_products_slug          ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_display_order ON products(display_order);
CREATE INDEX IF NOT EXISTS idx_enquiries_status       ON enquiries(status);
CREATE INDEX IF NOT EXISTS idx_enquiries_created_at   ON enquiries(created_at DESC);
