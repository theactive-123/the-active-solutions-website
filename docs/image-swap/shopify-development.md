# Image swap list: Shopify Development (`/services/shopify-development`)

Crops taken from the Figma frame screenshots while the original exports are pending. Replace each file 1:1 (same path, ideally transparent PNG at 2x).

| public path | Figma frame | node id (from spec) | what it is |
| --- | --- | --- | --- |
| `/images/shopify-development/hero-cube.png` | 02-svc1 | 2157:858 (CTA copy: 2157:867) | Red glass 3D cube, used in the hero and the closing CTA banner |

Notes:
- The "client proof" laptop (Figma group 2131:1213, "Slim Macbook Concept") is drawn in CSS (`src/components/shopify-development/Laptop.tsx`). Its screen uses the existing case-study asset `/images/work/thermolab.png`. The Figma screen showed an unrelated third-party site; swap in any approved project screenshot.
- The testimonial in the client proof card is a PLACEHOLDER (it was empty in Figma). Replace the quote/name in `src/components/shopify-development/ClientProof.tsx` with a real, approved client quote.
