import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { CardGrid } from "@/components/sections/CardGrid";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { callBlocks, callWindows, zoneName, type Faq, type Point } from "@/content/locations";
import { faqJsonLd } from "@/lib/seo";
import { services } from "@/lib/site";
import { PointsTabs } from "./PointsTabs";
import { WorkingTogether } from "./LocationParts";
import styles from "./Variants.module.css";

export type Theme = "paper" | "sand" | "dark";
/** How a section introduces itself: header above (stack), centred above (center), or a sticky column beside (sticky). */
export type BlockLayout = "stack" | "center" | "sticky";

/* ------------------------------------------------------------------ section frame */

export function Block({
  id,
  theme,
  layout,
  eyebrow,
  title,
  text,
  children,
}: {
  id: string;
  theme: Theme;
  layout: BlockLayout;
  eyebrow: string;
  title: React.ReactNode;
  text?: React.ReactNode;
  children: React.ReactNode;
}) {
  const head = (
    <div className={styles.head}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 id={id} className={`h2 ${styles.headTitle}`} data-split>
        {title}
      </h2>
      {text && (
        <div className={`body ${styles.headText}`} data-reveal>
          {text}
        </div>
      )}
    </div>
  );
  return (
    <section className={`section theme-${theme} ${styles.block} ${styles[layout]}`} aria-labelledby={id}>
      <div className="container">
        {layout === "sticky" ? (
          <div className={styles.stickyGrid}>
            <div className={styles.stickyCol}>{head}</div>
            <div>{children}</div>
          </div>
        ) : (
          <>
            {head}
            {children}
          </>
        )}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ point lists */

export type PointsKind = "index" | "accordion" | "tabs" | "bento" | "scroller" | "timeline" | "cards";

const num = (i: number) => String(i + 1).padStart(2, "0");

/** One list of titled points (sectors, local notes, country essentials), in one of seven layouts. */
export function Points({ items, kind, theme }: { items: Point[]; kind: PointsKind; theme: Theme }) {
  switch (kind) {
    case "index":
      return (
        <ol role="list" className={styles.index} data-reveal-stagger="0.08">
          {items.map((p, i) => (
            <li key={p.title}>
              <span className={styles.indexNum} aria-hidden="true">
                {num(i)}
              </span>
              <h3 className={styles.indexTitle}>{p.title}</h3>
              <p className={styles.indexText}>{p.text}</p>
            </li>
          ))}
        </ol>
      );
    case "accordion":
      return (
        <div className={styles.accordion} data-reveal-stagger="0.06">
          {items.map((p, i) => (
            <details key={p.title} open={i === 0}>
              <summary>
                <span className={styles.accNum} aria-hidden="true">
                  {num(i)}
                </span>
                <h3 className={styles.accTitle}>{p.title}</h3>
                <span className={styles.accIcon} aria-hidden="true" />
              </summary>
              <p className={styles.accText}>{p.text}</p>
            </details>
          ))}
        </div>
      );
    case "tabs":
      return <PointsTabs items={items} />;
    case "bento":
      return (
        <ul role="list" className={styles.bento} data-n={items.length} data-reveal-stagger="0.08">
          {items.map((p, i) => (
            <li key={p.title}>
              <span className={styles.bentoNum} aria-hidden="true">
                {num(i)}
              </span>
              <h3 className={styles.bentoTitle}>{p.title}</h3>
              <p className={styles.bentoText}>{p.text}</p>
            </li>
          ))}
        </ul>
      );
    case "scroller":
      return (
        <div className={styles.scrollWrap}>
          <ul role="list" className={styles.scroller} tabIndex={0} aria-label="Scroll sideways for more" data-reveal-stagger="0.08">
            {items.map((p, i) => (
              <li key={p.title}>
                <span className={styles.scrollNum} aria-hidden="true">
                  {num(i)} / {num(items.length - 1)}
                </span>
                <h3 className={styles.scrollTitle}>{p.title}</h3>
                <p className={styles.scrollText}>{p.text}</p>
              </li>
            ))}
          </ul>
          <p className={styles.scrollHint} aria-hidden="true">
            Scroll sideways →
          </p>
        </div>
      );
    case "timeline":
      return (
        <ol role="list" className={styles.timeline} data-reveal-stagger="0.1">
          {items.map((p, i) => (
            <li key={p.title}>
              <span className={styles.tlDot} aria-hidden="true">
                {num(i)}
              </span>
              <div>
                <h3 className={styles.tlTitle}>{p.title}</h3>
                <p className={styles.tlText}>{p.text}</p>
              </div>
            </li>
          ))}
        </ol>
      );
    default:
      return <CardGrid items={items} tone={theme === "dark" ? "dark" : "light"} columns={items.length % 3 === 0 ? 3 : 2} />;
  }
}

/* ------------------------------------------------------------------ services */

export type ServicesKind = "rows" | "tiles" | "cards";

const serviceCopy = (place: string): Record<string, string> => ({
  "/services/shopify-development": `Custom Shopify and Shopify Plus builds, theme work and migrations for ${place} brands, built so your team can run the store day to day.`,
  "/services/conversion-rate-optimization": `CRO audits, A/B tests and checkout fixes that turn more of your ${place} traffic into orders.`,
  "/services/ecommerce-marketing": `Paid social, search and Klaviyo email & SMS planned around how ${place} shoppers find and buy.`,
  "/services/white-label-shopify": `Shopify delivery capacity for ${place} agencies, shipped under your brand and on your timeline.`,
});

export function Services({ place, kind, theme }: { place: string; kind: ServicesKind; theme: Theme }) {
  const copy = serviceCopy(place);
  const list = services.map((s) => ({ title: s.label, text: copy[s.href] ?? s.description, href: s.href }));
  if (kind === "rows")
    return (
      <ul role="list" className={styles.rows} data-reveal-stagger="0.08">
        {list.map((s, i) => (
          <li key={s.href}>
            <Link href={s.href} className={styles.row}>
              <span className={styles.rowNum}>{num(i)}</span>
              <span className={styles.rowTitle}>{s.title}</span>
              <span className={styles.rowText}>{s.text}</span>
              <span className={styles.rowArrow} aria-hidden="true">
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    );
  if (kind === "tiles")
    return (
      <ul role="list" className={styles.svcTiles} data-reveal-stagger="0.08">
        {list.map((s, i) => (
          <li key={s.href}>
            <Link href={s.href} className={styles.svcTile}>
              <span className={styles.svcTileNum}>{num(i)}</span>
              <span className={styles.svcTileTitle}>{s.title}</span>
              <span className={styles.svcTileText}>{s.text}</span>
              <span className={styles.svcTileGo}>Explore →</span>
            </Link>
          </li>
        ))}
      </ul>
    );
  return <CardGrid columns={2} tone={theme === "dark" ? "dark" : "light"} items={list} />;
}

/* ------------------------------------------------------------------ intros */

export type IntroKind = "magazine" | "sidebar" | "lead";
export type Fact = { label: string; value: string };

export function Intro({ paragraphs, facts, kind }: { paragraphs: string[]; facts: Fact[]; kind: IntroKind }) {
  const [first, ...rest] = paragraphs;
  const factList = (
    <dl className={styles.introFacts} data-reveal-stagger="0.06">
      {facts.map((f) => (
        <div key={f.label}>
          <dt>{f.label}</dt>
          <dd>{f.value}</dd>
        </div>
      ))}
    </dl>
  );
  if (kind === "sidebar")
    return (
      <div className={styles.introSidebar}>
        <aside className={styles.introAside}>{factList}</aside>
        <div className={styles.introProse} data-reveal>
          {paragraphs.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
        </div>
      </div>
    );
  if (kind === "lead")
    return (
      <div className={styles.introLead}>
        <p className={styles.introStatement} data-reveal>
          {first}
        </p>
        <div className={styles.introCols} data-reveal>
          {rest.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
        </div>
        {factList}
      </div>
    );
  return (
    <div className={styles.introMag}>
      <p className={styles.introStatement} data-reveal>
        {first}
      </p>
      <div className={styles.introMagCols} data-reveal>
        {rest.map((p) => (
          <p key={p.slice(0, 40)}>{p}</p>
        ))}
      </div>
      {factList}
    </div>
  );
}

/* ------------------------------------------------------------------ working together */

export type TogetherKind = "card" | "clock";

/** "card": text + call-times card. "clock": the visitor's whole day as a bar, call windows highlighted. */
export function Together({ text, timeZone, place, kind }: { text: string; timeZone: string; place: string; kind: TogetherKind }) {
  if (kind === "card") return <WorkingTogether text={text} timeZone={timeZone} place={place} />;
  const windows = callWindows(timeZone);
  const blocks = callBlocks(timeZone);
  const zone = zoneName(timeZone);
  const pct = (m: number) => `${(m / 1440) * 100}%`;
  return (
    <div className={styles.clock}>
      <div className={styles.clockHead} data-reveal>
        <p className={styles.clockLabel}>
          A day in {place} ({zone}), Monday to Friday
        </p>
        <p className={styles.clockValue}>{windows.label}</p>
        {windows.seasonal && <p className={styles.clockNote}>{windows.seasonal}</p>}
      </div>
      <div className={styles.day} data-reveal="line" role="img" aria-label={`Live call start times in ${place}: ${windows.label}`}>
        {blocks.flatMap((b) =>
          // a block that runs past midnight is drawn in two parts
          b.to > 1440
            ? [
                { from: b.from, to: 1440 },
                { from: 0, to: b.to - 1440 },
              ]
            : [b],
        ).map((b) => (
          <span key={`${b.from}-${b.to}`} className={styles.dayBlock} style={{ left: pct(b.from), width: pct(b.to - b.from) }} />
        ))}
      </div>
      <div className={styles.dayScale} aria-hidden="true">
        {["12am", "6am", "12pm", "6pm", "12am"].map((t, i) => (
          <span key={i}>{t}</span>
        ))}
      </div>
      <div className={styles.clockFoot}>
        <p className={`body ${styles.clockText}`} data-reveal>
          {text}
        </p>
        <div data-reveal data-delay="0.1">
          <Button href="/contact/schedule" variant="outline-light">
            Book a call in your time zone
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ places */

export type PlacesKind = "cards" | "rows" | "chips";
export type PlaceLink = { href: string; name: string; region: string; text?: string; go: string };

export function Places({ items, kind }: { items: PlaceLink[]; kind: PlacesKind }) {
  if (kind === "rows")
    return (
      <ul role="list" className={styles.placeRows} data-reveal-stagger="0.06">
        {items.map((p) => (
          <li key={p.href}>
            <Link href={p.href} className={styles.placeRow}>
              <span className={styles.placeRowRegion}>{p.region}</span>
              <span className={styles.placeRowName}>{p.name}</span>
              {p.text && <span className={styles.placeRowText}>{p.text}</span>}
              <span className={styles.placeRowGo} aria-hidden="true">
                ↗
              </span>
              <span className="sr-only">{p.go}</span>
            </Link>
          </li>
        ))}
      </ul>
    );
  if (kind === "chips")
    return (
      <ul role="list" className={styles.chips} data-reveal-stagger="0.05">
        {items.map((p) => (
          <li key={p.href}>
            <Link href={p.href} className={styles.chip} title={p.go}>
              <span className={styles.chipRegion}>{p.region}</span>
              {p.name}
            </Link>
          </li>
        ))}
      </ul>
    );
  return (
    <ul role="list" className={styles.placeCards} data-reveal-stagger="0.06">
      {items.map((p) => (
        <li key={p.href}>
          <Link href={p.href} className={styles.placeCard}>
            <span className={styles.placeCardRegion}>{p.region}</span>
            <span className={styles.placeCardName}>{p.name}</span>
            {p.text && <span className={styles.placeCardText}>{p.text}</span>}
            <span className={styles.placeCardGo}>{p.go} →</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------------ FAQ as open cards */

/** FAQ with every answer visible, two columns on desktop. Emits FAQPage JSON-LD like the accordion version. */
export function FaqCards({ items, title, text, theme }: { items: Faq[]; title: React.ReactNode; text: string; theme: Theme }) {
  return (
    <section className={`section theme-${theme}`} aria-labelledby="faq-title">
      <div className="container">
        <div className={styles.head}>
          <Eyebrow>FAQ</Eyebrow>
          <h2 id="faq-title" className={`h2 ${styles.headTitle}`} data-split>
            {title}
          </h2>
          <div className={`body ${styles.headText}`} data-reveal>
            <p>{text}</p>
          </div>
        </div>
        <dl className={styles.faqCards} data-reveal-stagger="0.08">
          {items.map((f, i) => (
            <div key={f.question}>
              <dt>
                <span aria-hidden="true">Q{i + 1}</span>
                {f.question}
              </dt>
              <dd>{f.answer}</dd>
            </div>
          ))}
        </dl>
      </div>
      <JsonLd data={faqJsonLd(items)} />
    </section>
  );
}
