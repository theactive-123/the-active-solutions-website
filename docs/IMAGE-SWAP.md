# Image swap list

The Figma MCP quota ran out mid-build, so original image files could only be exported for the
**landing page**. Every other page uses temporary crops taken from full-resolution (1× / 1920px)
screenshots of the Figma frames. They look right but are softer than originals, especially on
retina screens.

To upgrade, export each listed layer from Figma (select layer → Export → PNG @2x, or SVG for
vector icons) and overwrite the file at the given path, keeping the same file name. Nothing else
needs to change. If you export a 3D object with a **transparent background**, also remove the
`figma-crop` class mentioned next to it (search the code for the file name) — that class only
exists to blend the dark-backed crop into the hero glow.

Per-page lists:

- [Shopify development](image-swap/shopify-development.md)
- [Conversion optimization](image-swap/cro.md)
- [White label](image-swap/white-label.md)
- [Partners](image-swap/partners.md)
- [Ecommerce marketing](image-swap/marketing.md)
- [About](image-swap/about.md)
- [Insights](image-swap/insights.md)

## Landing page (originals already in place)

| Public path | What it is | Note |
| --- | --- | --- |
| `/images/brand/logo-3d.png` | 3D logo (hero + CTA) | original export |
| `/images/brand/logo-mark.png` | Flat red mark | rendered from the Figma logo layer at 4× |
| `/images/brand/shopify-partners.png` | Shopify Partners badge | original export, trimmed |
| `/images/clients/*.png` | Trusted-by logos | rendered from Figma vectors at 4× |
| `/images/work/{thermolab,heybuddy,peak-motion}.png` | Store screenshots | original exports |
| `/images/team/*.png` | Team avatars + feature photo | original exports |
| `/images/home/cloud.png` | CTA cloud | original export |
| `/images/icons/{sparkle,atom,infinity,asterisk}.svg` | Pillar icons, marquee asterisk | original SVG exports |

**Missing:** a photo of **Muzammil** (Senior Developer). Figma reused Shahzaib Ali's photo for him,
so the site shows his initials. Add `public/images/team/muzammil.png` (square, ≥178px) and set
`photo: "/images/team/muzammil.png"` for him in `src/components/home/Team.tsx`.
