import Image from "next/image";
import Link from "next/link";
import type { InsightAuthor } from "@/content/insights";
import styles from "./Article.module.css";

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter((w) => /^\p{L}/u.test(w))
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");

export function AuthorCard({ author }: { author: InsightAuthor }) {
  return (
    <div className={styles.author}>
      {author.photo ? (
        <Image src={author.photo} alt="" width={132} height={132} className={styles.avatar} />
      ) : (
        <span className={`${styles.avatar} ${styles.monogram}`} aria-hidden="true">
          {initials(author.name)}
        </span>
      )}
      <div>
        <p className={styles.authorName}>[ AUTHOR <span style={{ whiteSpace: "nowrap" }}>{author.name} ]</span></p>
        <p className={styles.authorRole}>{author.role}</p>
      </div>
      <p className={styles.authorText}>Writes about Shopify builds, growth and the decisions behind them.</p>
      <Link href="/about" className={styles.authorLink}>
        Meet the team
      </Link>
    </div>
  );
}
