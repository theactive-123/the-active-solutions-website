import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/lib/site";

export const alt = `${site.name}: Shopify & DTC growth agency`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Default social card for every page that doesn't define its own. */
export default async function OpengraphImage() {
  const mark = await readFile(join(process.cwd(), "public/images/brand/logo-mark.png"));
  const markSrc = `data:image/png;base64,${mark.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          color: "#fff",
          background: "radial-gradient(70% 90% at 92% 0%, rgba(234,34,41,0.75) 0%, rgba(160,18,26,0.4) 35%, #0b0b0c 75%)",
          backgroundColor: "#0b0b0c",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain <img> */}
          <img src={markSrc} width={64} height={59} alt="" />
          <span style={{ fontSize: 30, letterSpacing: -0.5 }}>{site.name}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 22, color: "rgba(255,255,255,0.7)", marginBottom: 20 }}>
            [ SHOPIFY &amp; DTC GROWTH AGENCY · KARACHI, WORLDWIDE ]
          </span>
          <span style={{ fontSize: 84, fontWeight: 700, lineHeight: 1.02, letterSpacing: -3 }}>Shopify stores built</span>
          <span style={{ fontSize: 84, fontWeight: 700, lineHeight: 1.02, letterSpacing: -3 }}>
            to&nbsp;<span style={{ color: "#ea2229", fontStyle: "italic" }}>grow</span>&nbsp;brands.
          </span>
        </div>
      </div>
    ),
    size,
  );
}
