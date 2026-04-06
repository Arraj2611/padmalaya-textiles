-- ─────────────────────────────────────────────────────────────────
-- Padmalaya Textiles — seed data
-- Run after schema.sql
-- ─────────────────────────────────────────────────────────────────

INSERT INTO products (name, slug, size, weight, tag, description, image_url, images, features, colors, is_featured, display_order)
VALUES
  (
    'Classic Terry Bath Towel',
    'classic-terry-bath-towel',
    '70×140 cm',
    '500 GSM',
    'Bestseller',
    'Plush, absorbent, and built to last through hundreds of washes — our signature double-loop terry weave delivers hotel-grade performance for hospitality and retail. Each towel undergoes GSM verification and lot traceability before export.',
    'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=960&h=720&q=85&ixlib=rb-4.0.3',
    ARRAY[
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=960&h=720&q=85&ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1563291074-2bf8677ac8e5?auto=format&fit=crop&w=960&h=720&q=85&ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=960&h=720&q=85&ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=960&h=720&q=85&ixlib=rb-4.0.3'
    ],
    ARRAY[
      'Double-loop terry construction for superior absorbency',
      'OEKO-TEX certified yarn',
      '500 GSM — hotel-grade weight',
      'Colourfast reactive dyes, 40°C washable',
      'MOQ from 500 pcs per colour',
      'Private label & custom packaging available'
    ],
    ARRAY['Ivory', 'White', 'Charcoal', 'Sage', 'Navy', 'Blush'],
    true,
    0
  ),
  (
    'Premium Face Towel Set',
    'premium-face-towel-set',
    '30×30 cm',
    '450 GSM',
    'New',
    'Ultra-soft face towels engineered for gentle skin contact. The 450 GSM ring-spun cotton construction is ideal for spa, hotel amenity kits, and retail gifting. Supplied as sets of 4 or 6 with matching gift packaging on request.',
    'https://images.unsplash.com/photo-1563291074-2bf8677ac8e5?auto=format&fit=crop&w=960&h=720&q=85&ixlib=rb-4.0.3',
    ARRAY[
      'https://images.unsplash.com/photo-1563291074-2bf8677ac8e5?auto=format&fit=crop&w=960&h=720&q=85&ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=960&h=720&q=85&ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=960&h=720&q=85&ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=960&h=720&q=85&ixlib=rb-4.0.3'
    ],
    ARRAY[
      'Ring-spun combed cotton for silky hand feel',
      '450 GSM — lightweight yet absorbent',
      'OEKO-TEX certified yarn',
      'Salon & spa safe — lint-free finish',
      'Sold individually or as sets of 4/6',
      'Custom embroidery available'
    ],
    ARRAY['White', 'Ivory', 'Blush', 'Sage', 'Stone'],
    false,
    1
  ),
  (
    'Luxury Hand Towel',
    'luxury-hand-towel',
    '40×70 cm',
    '550 GSM',
    'Premium',
    'Double-loop terry for maximum absorbency and a velvety hand feel. At 550 GSM this hand towel sits at the premium end of hospitality specifications — used by 5-star properties across the Middle East and Europe.',
    'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=960&h=720&q=85&ixlib=rb-4.0.3',
    ARRAY[
      'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=960&h=720&q=85&ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=960&h=720&q=85&ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=960&h=720&q=85&ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1563291074-2bf8677ac8e5?auto=format&fit=crop&w=960&h=720&q=85&ixlib=rb-4.0.3'
    ],
    ARRAY[
      '550 GSM double-loop terry',
      'Velvety pile — premium hand feel',
      'OEKO-TEX certified yarn',
      'Colourfast up to 60°C wash',
      'Dobby border weave available',
      'MOQ 300 pcs per colour'
    ],
    ARRAY['White', 'Ivory', 'Charcoal', 'Teal', 'Burgundy', 'Navy'],
    false,
    2
  ),
  (
    'Hotel Bath Sheet',
    'hotel-bath-sheet',
    '90×180 cm',
    '600 GSM',
    'Bulk',
    'Oversized bath sheets for 5-star hospitality. At 90×180 cm and 600 GSM, these are the heaviest towels in our range. Private labeling, custom dobby borders, and embroidered crests are all available. Packed in export cartons per your specification.',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=960&h=720&q=85&ixlib=rb-4.0.3',
    ARRAY[
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=960&h=720&q=85&ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=960&h=720&q=85&ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=960&h=720&q=85&ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=960&h=720&q=85&ixlib=rb-4.0.3'
    ],
    ARRAY[
      '600 GSM — heavyweight luxury specification',
      '90×180 cm oversized format',
      'OEKO-TEX certified yarn',
      'Private label & dobby border weave',
      'Embroidered crest service',
      'Export cartons per buyer spec'
    ],
    ARRAY['White', 'Ivory', 'Charcoal', 'Navy', 'Sage'],
    true,
    3
  ),
  (
    'Terry Kitchen Napkin',
    'terry-kitchen-napkin',
    '45×65 cm',
    '350 GSM',
    'Popular',
    'Lint-free, quick-dry cotton for professional kitchens, café counters, and foodservice. The 350 GSM open-loop weave dries 40% faster than standard terry. Supplied flat-packed or rolled per your preference.',
    'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=960&h=720&q=85&ixlib=rb-4.0.3',
    ARRAY[
      'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=960&h=720&q=85&ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=960&h=720&q=85&ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1563291074-2bf8677ac8e5?auto=format&fit=crop&w=960&h=720&q=85&ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=960&h=720&q=85&ixlib=rb-4.0.3'
    ],
    ARRAY[
      '350 GSM open-loop quick-dry weave',
      'Lint-free — foodservice certified',
      '40% faster dry time than standard terry',
      'Flat-pack or roll supply format',
      'Custom stripe and check weaves available',
      'MOQ 1000 pcs'
    ],
    ARRAY['White', 'Red Stripe', 'Blue Stripe', 'Black', 'Sage'],
    false,
    4
  ),
  (
    'Spa Wrap Towel',
    'spa-wrap-towel',
    '80×150 cm',
    '480 GSM',
    'Luxury',
    'Full-body spa wraps with secure tuck closure. The 480 GSM loop-terry construction provides warmth and coverage for spa treatments, thermal suites, and wellness retreats. Available in 22 standard colours with custom dye lots on request.',
    'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=960&h=720&q=85&ixlib=rb-4.0.3',
    ARRAY[
      'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=960&h=720&q=85&ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=960&h=720&q=85&ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=960&h=720&q=85&ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=960&h=720&q=85&ixlib=rb-4.0.3'
    ],
    ARRAY[
      '480 GSM loop-terry with tuck closure',
      'Full-body 80×150 cm coverage',
      '22 standard colours in stock',
      'Custom dye lots available (MOQ 200 pcs)',
      'OEKO-TEX certified yarn',
      'Spa & wellness sector specialists'
    ],
    ARRAY['White', 'Ivory', 'Blush', 'Sage', 'Stone', 'Charcoal', 'Teal'],
    false,
    5
  )
ON CONFLICT (slug) DO NOTHING;
