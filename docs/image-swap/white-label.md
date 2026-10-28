# Image swap: white-label (`/services/white-label-shopify`)

| public path | Figma frame | node id (from spec) | what it is |
| --- | --- | --- | --- |
| `public/images/white-label/atom-3d.png` | 03-svc2 | 2142:2230 (hero, "Group 2085662953"); also used for CTA 2144:2507 "3D object — rings (Three.js)" | Red 3D atom/rings object, cropped with padding from the hero; used in PageHero and CtaBanner (`figma-crop`) |

Not cropped: the Proof section "IMG SLOT · genuine deliverable example / process visual" (2144:2412) was an empty black placeholder. It is replaced by a coded "project handover" card (`src/components/white-label/DeliveryProof.tsx`). Swap in a real deliverable/process image when the client supplies one.
