import Image from "next/image";
import Link from "next/link";
import type { InsightAuthor } from "@/content/insights";
import styles from "./Article.module.css";

export function AuthorCard({ author }: { author: InsightAuthor }) {
  return (
    <div className={styles.author}>
      <Image src={author.photo} alt="" width={132} height={132} className={styles.avatar} />
      <div>
        <p className={styles.authorName}>[ AUTHOR {author.name} ]</p>
        <p className={styles.authorRole}>{author.role}</p>
      </div>
      <p className={styles.authorText}>Writes about Shopify builds, growth and the decisions behind them.</p>
      <Link href="/about" className={styles.authorLink}>
        Meet the team
      </Link>
    </div>
  );
}
