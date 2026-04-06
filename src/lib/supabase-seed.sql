-- ─────────────────────────────────────────────
-- Padmalaya Textiles — seed data
-- Run after supabase-schema.sql
-- ─────────────────────────────────────────────

INSERT INTO products (name, slug, description, size, weight, tag, image_url, is_featured, display_order)
VALUES
  (
    'Classic Terry Bath Towel',
    'classic-terry-bath-towel',
    'Plush, absorbent, and built to last through hundreds of washes — our signature weave.',
    '70×140 cm',
    '500 GSM',
    'Bestseller',
    'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=960&h=720&q=85&ixlib=rb-4.0.3',
    true,
    0
  ),
  (
    'Premium Face Towel Set',
    'premium-face-towel-set',
    'Ultra-soft face towels, gentle on skin. Ideal for hotels and spa settings.',
    '30×30 cm',
    '450 GSM',
    'New',
    'https://images.unsplash.com/photo-1563291074-2bf8677ac8e5?auto=format&fit=crop&w=960&h=720&q=85&ixlib=rb-4.0.3',
    false,
    1
  ),
  (
    'Luxury Hand Towel',
    'luxury-hand-towel',
    'Double-loop terry for maximum absorbency and a velvety hand feel.',
    '40×70 cm',
    '550 GSM',
    'Premium',
    'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=960&h=720&q=85&ixlib=rb-4.0.3',
    false,
    2
  ),
  (
    'Hotel Bath Sheet',
    'hotel-bath-sheet',
    'Oversized bath sheets for 5-star hospitality. Private labeling available.',
    '90×180 cm',
    '600 GSM',
    'Bulk',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=960&h=720&q=85&ixlib=rb-4.0.3',
    true,
    3
  ),
  (
    'Terry Kitchen Napkin',
    'terry-kitchen-napkin',
    'Lint-free, quick-dry cotton for professional kitchens.',
    '45×65 cm',
    '350 GSM',
    'Popular',
    'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=960&h=720&q=85&ixlib=rb-4.0.3',
    false,
    4
  ),
  (
    'Spa Wrap Towel',
    'spa-wrap-towel',
    'Full-body spa wraps with secure tuck closure. Available in 22 colours.',
    '80×150 cm',
    '480 GSM',
    'Luxury',
    'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=960&h=720&q=85&ixlib=rb-4.0.3',
    false,
    5
  );
