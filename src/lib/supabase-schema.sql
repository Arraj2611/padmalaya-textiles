-- ─────────────────────────────────────────────
-- Padmalaya Textiles — Supabase schema
-- Run once in the Supabase SQL editor
-- ─────────────────────────────────────────────

-- Products table
CREATE TABLE products (
  id            UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  name          TEXT        NOT NULL,
  slug          TEXT        UNIQUE NOT NULL,
  description   TEXT,
  size          TEXT,
  weight        TEXT,
  tag           TEXT,
  image_url     TEXT,
  is_featured   BOOLEAN     DEFAULT false,
  display_order INT         DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT now(),
  updated_at    TIMESTAMPTZ DEFAULT now()
);

-- Enquiries table
CREATE TABLE enquiries (
  id               UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  name             TEXT        NOT NULL,
  email            TEXT        NOT NULL,
  company          TEXT,
  phone            TEXT,
  product_interest TEXT,
  message          TEXT        NOT NULL,
  status           TEXT        DEFAULT 'new'
                               CHECK (status IN ('new', 'read', 'responded', 'archived')),
  created_at       TIMESTAMPTZ DEFAULT now()
);

-- Admin users (for dashboard auth)
CREATE TABLE admin_users (
  id            UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  email         TEXT        UNIQUE NOT NULL,
  password_hash TEXT        NOT NULL,
  name          TEXT,
  role          TEXT        DEFAULT 'admin'
                            CHECK (role IN ('admin', 'super_admin')),
  created_at    TIMESTAMPTZ DEFAULT now()
);

-- Product views tracking
CREATE TABLE product_views (
  id         UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID        REFERENCES products(id) ON DELETE SET NULL,
  viewed_at  TIMESTAMPTZ DEFAULT now(),
  user_agent TEXT,
  referrer   TEXT
);

-- ─── updated_at trigger ───────────────────────
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ─── Row Level Security ───────────────────────
ALTER TABLE products      ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries     ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users   ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_views ENABLE ROW LEVEL SECURITY;

-- Public can read products
CREATE POLICY "Products are publicly readable"
  ON products FOR SELECT USING (true);

-- Public can insert enquiries
CREATE POLICY "Anyone can submit enquiries"
  ON enquiries FOR INSERT WITH CHECK (true);

-- Product views insertable by anyone
CREATE POLICY "Anyone can log product views"
  ON product_views FOR INSERT WITH CHECK (true);

-- Admin users only readable with service role (no public policy)
