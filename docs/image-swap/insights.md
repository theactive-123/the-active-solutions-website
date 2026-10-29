# Image swap — Insights (`/insights`, `/insights/[slug]`)

Temporary images cropped from the Figma frame screenshots or composed from those crops.
Replace each file 1:1 (same path, same aspect ratio) when the originals arrive.

| public path | Figma frame | node id (from spec) | what it is |
| --- | --- | --- | --- |
| `/images/insights/orb-3d.png` (600×600) | 08-insights | 2175:534 (also 2175:538 in the subscribe band) | 3D red orb with orbit ring — listing hero visual and "Get new insights in your inbox" band. Rendered with `.figma-crop`; swap for a transparent PNG/WebP and drop the class. |
| `/images/insights/cube-3d.png` (622×622) | 09-insight-detail | 2175:979 (also 2175:971 in the CTA) | 3D red cube — article hero visual and closing CTA visual. Same `.figma-crop` note. |
| `/images/insights/cover-fallback.jpg` (1600×1000) | 08-insights / 09-insight-detail | 2175:454 | Used only for WordPress posts without a featured image (generated stand-in). |

Article covers now come from each post's **featured image in WordPress**. Cards crop them to
520:367, the featured slot to 705:504 and the article page to 1620:626 (16:10 on mobile), so keep
the subject near the centre. The featured image is also the article's Open Graph image.
The author avatar reuses `/images/team/mirza-abbas.png` (Figma node 2175:877 is an empty circle).
