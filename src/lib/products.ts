export interface StaticProduct {
  id: string;
  name: string;
  slug: string;
  size: string;
  weight: string;
  tag: string;
  description: string;
  image_url: string;
  images: string[];
  features: string[];
  colors: string[];
  is_featured: boolean;
  display_order: number;
}

const U = "https://images.unsplash.com";
const Q = (w: number, h: number) => `auto=format&fit=crop&w=${w}&h=${h}&q=85&ixlib=rb-4.0.3`;

export const STATIC_PRODUCTS: StaticProduct[] = [
  {
    id: "1",
    name: "Classic Terry Bath Towel",
    slug: "classic-terry-bath-towel",
    size: "70×140 cm",
    weight: "500 GSM",
    tag: "Bestseller",
    description:
      "Plush, absorbent, and built to last through hundreds of washes — our signature double-loop terry weave delivers hotel-grade performance for hospitality and retail. Each towel undergoes GSM verification and lot traceability before export.",
    image_url: `${U}/photo-1584622650111-993a426fbf0a?${Q(960, 720)}`,
    images: [
      `${U}/photo-1584622650111-993a426fbf0a?${Q(960, 720)}`,
      `${U}/photo-1563291074-2bf8677ac8e5?${Q(960, 720)}`,
      `${U}/photo-1556228453-efd6c1ff04f6?${Q(960, 720)}`,
      `${U}/photo-1507652313519-d4e9174996dd?${Q(960, 720)}`,
    ],
    features: [
      "Double-loop terry construction for superior absorbency",
      "OEKO-TEX certified yarn",
      "500 GSM — hotel-grade weight",
      "Colourfast reactive dyes, 40°C washable",
      "MOQ from 500 pcs per colour",
      "Private label & custom packaging available",
    ],
    colors: ["Ivory", "White", "Charcoal", "Sage", "Navy", "Blush"],
    is_featured: true,
    display_order: 0,
  },
  {
    id: "2",
    name: "Premium Face Towel Set",
    slug: "premium-face-towel-set",
    size: "30×30 cm",
    weight: "450 GSM",
    tag: "New",
    description:
      "Ultra-soft face towels engineered for gentle skin contact. The 450 GSM ring-spun cotton construction is ideal for spa, hotel amenity kits, and retail gifting. Supplied as sets of 4 or 6 with matching gift packaging on request.",
    image_url: `${U}/photo-1563291074-2bf8677ac8e5?${Q(960, 720)}`,
    images: [
      `${U}/photo-1563291074-2bf8677ac8e5?${Q(960, 720)}`,
      `${U}/photo-1584622650111-993a426fbf0a?${Q(960, 720)}`,
      `${U}/photo-1556910103-1c02745aae4d?${Q(960, 720)}`,
      `${U}/photo-1600585154340-be6161a56a0c?${Q(960, 720)}`,
    ],
    features: [
      "Ring-spun combed cotton for silky hand feel",
      "450 GSM — lightweight yet absorbent",
      "OEKO-TEX certified yarn",
      "Salon & spa safe — lint-free finish",
      "Sold individually or as sets of 4/6",
      "Custom embroidery available",
    ],
    colors: ["White", "Ivory", "Blush", "Sage", "Stone"],
    is_featured: false,
    display_order: 1,
  },
  {
    id: "3",
    name: "Luxury Hand Towel",
    slug: "luxury-hand-towel",
    size: "40×70 cm",
    weight: "550 GSM",
    tag: "Premium",
    description:
      "Double-loop terry for maximum absorbency and a velvety hand feel. At 550 GSM this hand towel sits at the premium end of hospitality specifications — used by 5-star properties across the Middle East and Europe.",
    image_url: `${U}/photo-1556228453-efd6c1ff04f6?${Q(960, 720)}`,
    images: [
      `${U}/photo-1556228453-efd6c1ff04f6?${Q(960, 720)}`,
      `${U}/photo-1584622650111-993a426fbf0a?${Q(960, 720)}`,
      `${U}/photo-1507652313519-d4e9174996dd?${Q(960, 720)}`,
      `${U}/photo-1563291074-2bf8677ac8e5?${Q(960, 720)}`,
    ],
    features: [
      "550 GSM double-loop terry",
      "Velvety pile — premium hand feel",
      "OEKO-TEX certified yarn",
      "Colourfast up to 60°C wash",
      "Dobby border weave available",
      "MOQ 300 pcs per colour",
    ],
    colors: ["White", "Ivory", "Charcoal", "Teal", "Burgundy", "Navy"],
    is_featured: false,
    display_order: 2,
  },
  {
    id: "4",
    name: "Hotel Bath Sheet",
    slug: "hotel-bath-sheet",
    size: "90×180 cm",
    weight: "600 GSM",
    tag: "Bulk",
    description:
      "Oversized bath sheets for 5-star hospitality. At 90×180 cm and 600 GSM, these are the heaviest towels in our range. Private labeling, custom dobby borders, and embroidered crests are all available. Packed in export cartons per your specification.",
    image_url: `${U}/photo-1600585154340-be6161a56a0c?${Q(960, 720)}`,
    images: [
      `${U}/photo-1600585154340-be6161a56a0c?${Q(960, 720)}`,
      `${U}/photo-1584622650111-993a426fbf0a?${Q(960, 720)}`,
      `${U}/photo-1556228453-efd6c1ff04f6?${Q(960, 720)}`,
      `${U}/photo-1507652313519-d4e9174996dd?${Q(960, 720)}`,
    ],
    features: [
      "600 GSM — heavyweight luxury specification",
      "90×180 cm oversized format",
      "OEKO-TEX certified yarn",
      "Private label & dobby border weave",
      "Embroidered crest service",
      "Export cartons per buyer spec",
    ],
    colors: ["White", "Ivory", "Charcoal", "Navy", "Sage"],
    is_featured: true,
    display_order: 3,
  },
  {
    id: "5",
    name: "Terry Kitchen Napkin",
    slug: "terry-kitchen-napkin",
    size: "45×65 cm",
    weight: "350 GSM",
    tag: "Popular",
    description:
      "Lint-free, quick-dry cotton for professional kitchens, café counters, and foodservice. The 350 GSM open-loop weave dries 40% faster than standard terry. Supplied flat-packed or rolled per your preference.",
    image_url: `${U}/photo-1556910103-1c02745aae4d?${Q(960, 720)}`,
    images: [
      `${U}/photo-1556910103-1c02745aae4d?${Q(960, 720)}`,
      `${U}/photo-1584622650111-993a426fbf0a?${Q(960, 720)}`,
      `${U}/photo-1563291074-2bf8677ac8e5?${Q(960, 720)}`,
      `${U}/photo-1600585154340-be6161a56a0c?${Q(960, 720)}`,
    ],
    features: [
      "350 GSM open-loop quick-dry weave",
      "Lint-free — foodservice certified",
      "40% faster dry time than standard terry",
      "Flat-pack or roll supply format",
      "Custom stripe and check weaves available",
      "MOQ 1000 pcs",
    ],
    colors: ["White", "Red Stripe", "Blue Stripe", "Black", "Sage"],
    is_featured: false,
    display_order: 4,
  },
  {
    id: "6",
    name: "Spa Wrap Towel",
    slug: "spa-wrap-towel",
    size: "80×150 cm",
    weight: "480 GSM",
    tag: "Luxury",
    description:
      "Full-body spa wraps with secure tuck closure. The 480 GSM loop-terry construction provides warmth and coverage for spa treatments, thermal suites, and wellness retreats. Available in 22 standard colours with custom dye lots on request.",
    image_url: `${U}/photo-1507652313519-d4e9174996dd?${Q(960, 720)}`,
    images: [
      `${U}/photo-1507652313519-d4e9174996dd?${Q(960, 720)}`,
      `${U}/photo-1584622650111-993a426fbf0a?${Q(960, 720)}`,
      `${U}/photo-1600585154340-be6161a56a0c?${Q(960, 720)}`,
      `${U}/photo-1556228453-efd6c1ff04f6?${Q(960, 720)}`,
    ],
    features: [
      "480 GSM loop-terry with tuck closure",
      "Full-body 80×150 cm coverage",
      "22 standard colours in stock",
      "Custom dye lots available (MOQ 200 pcs)",
      "OEKO-TEX certified yarn",
      "Spa & wellness sector specialists",
    ],
    colors: ["White", "Ivory", "Blush", "Sage", "Stone", "Charcoal", "Teal"],
    is_featured: false,
    display_order: 5,
  },
];

export function getProductBySlug(slug: string): StaticProduct | undefined {
  return STATIC_PRODUCTS.find((p) => p.slug === slug);
}
