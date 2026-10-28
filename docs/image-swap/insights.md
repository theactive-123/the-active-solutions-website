# Image swap — Insights (`/insights`, `/insights/[slug]`)

Temporary images cropped from the Figma frame screenshots or composed from those crops.
Replace each file 1:1 (same path, same aspect ratio) when the originals arrive.

| public path | Figma frame | node id (from spec) | what it is |
| --- | --- | --- | --- |
| `/images/insights/orb-3d.png` (600×600) | 08-insights | 2175:534 (also 2175:538 in the subscribe band) | 3D red orb with orbit ring — listing hero visual and "Get new insights in your inbox" band. Rendered with `.figma-crop`; swap for a transparent PNG/WebP and drop the class. |
| `/images/insights/cube-3d.png` (622×622) | 09-insight-detail | 2175:979 (also 2175:971 in the CTA) | 3D red cube — article hero visual and closing CTA visual. Same `.figma-crop` note. |
| `/images/insights/cover-shopify-plus.jpg` (1600×1000) | 08-insights / 09-insight-detail | 2174:402 (featured image), 2175:855 ("IMG SLOT · article cover image") | Cover for "Do you need Shopify Plus?". Figma slot is an empty black placeholder; this is a generated stand-in (orb + cube on the brand glow). |
| `/images/insights/cover-cro-traffic.jpg` | 08-insights | 2175:425 | Cover for "How much traffic does your store need for CRO?" (placeholder in Figma; generated stand-in). |
| `/images/insights/cover-cro-audit.jpg` | 08-insights | 2175:430 | Cover for "What a CRO audit should actually include" (generated stand-in). |
| `/images/insights/cover-migration-seo.jpg` | 08-insights | 2175:431 | Cover for "Migrating from Magento or BigCommerce to Shopify without losing SEO" (generated stand-in). |
| `/images/insights/cover-klaviyo-flows.jpg` | 08-insights / 09-insight-detail | 2175:452 / 2175:886 | Cover for "The Klaviyo flows every Shopify store should consider" (generated stand-in). |
| `/images/insights/cover-meta-email.jpg` | 08-insights / 09-insight-detail | 2175:453 / 2175:887 | Cover for "Meta Ads and email: building one connected strategy" (generated stand-in). |
| `/images/insights/cover-custom-theme.jpg` | 08-insights / 09-insight-detail | 2175:454 / 2175:888 | Cover for "Custom theme or customization?" (generated stand-in). |

Covers are 1600×1000 (16:10); cards crop them to 520:367, the featured slot to 705:504 and the
article page to 1620:626 (16:10 on mobile), so keep the subject near the centre. They are also the
Open Graph image of each article. Paths are set per article in `src/content/insights.ts` (`cover`).
The author avatar reuses `/images/team/mirza-abbas.png` (Figma node 2175:877 is an empty circle).
