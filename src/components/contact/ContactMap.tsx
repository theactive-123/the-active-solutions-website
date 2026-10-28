"use client";

import { useState } from "react";
import { site } from "@/lib/site";
import styles from "./ContactMap.module.css";

/** Approximate position of AG Trade Center, Block 14 Gulistan-e-Johar, Karachi. */
const LAT = 24.9139;
const LON = 67.1302;
const D = 0.0085;
const SRC = `https://www.openstreetmap.org/export/embed.html?bbox=${LON - D * 1.6}%2C${LAT - D}%2C${LON + D * 1.6}%2C${LAT + D}&layer=mapnik`;
const ADDRESS = `${site.address.street}, ${site.address.city}, ${site.address.postalCode}`;
const DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`AG Trade Center, ${ADDRESS}, ${site.address.countryName}`)}`;

/**
 * OpenStreetMap embed (no API key). The map stays inert until activated so wheel / touch
 * scrolling the page never gets trapped inside the iframe.
 */
export function ContactMap() {
  const [active, setActive] = useState(false);

  return (
    <div className={styles.wrap} data-reveal="clip">
      <div className={styles.map} data-active={active || undefined}>
        <iframe
          className={styles.frame}
          title={`Map showing our office: ${ADDRESS}`}
          src={SRC}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          tabIndex={active ? 0 : -1}
        />
        {!active && (
          <button type="button" className={styles.activate} onClick={() => setActive(true)}>
            <span className={styles.activateLabel}>Click to explore the map</span>
          </button>
        )}
        <div className={styles.pin} aria-hidden="true">
          <span />
        </div>
      </div>
      <div className={styles.card}>
        <p className={styles.cardAddress}>
          {site.address.street},
          <br />
          {site.address.city}, {site.address.postalCode}
        </p>
        <a className={styles.directions} href={DIRECTIONS} target="_blank" rel="noopener noreferrer">
          Get directions<span className="sr-only"> (opens Google Maps in a new tab)</span>
          <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
            <path d="M3 9l6-6M4 3h5v5" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" />
          </svg>
        </a>
      </div>
    </div>
  );
}
