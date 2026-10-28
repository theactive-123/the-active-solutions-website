"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Article.module.css";

/** "[ SHARE ]" — LinkedIn, X and copy-link buttons. */
export function ShareLinks({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied("copied");
    } catch {
      setCopied("failed");
    }
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied("idle"), 2500);
  }

  return (
    <div className={styles.share}>
      <h2 className={styles.asideLabel}>[ SHARE ]</h2>
      <ul role="list" className={styles.shareList}>
        <li>
          <a
            className={styles.shareBtn}
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${u}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on LinkedIn (opens in a new tab)"
          >
            <span aria-hidden="true">in</span>
          </a>
        </li>
        <li>
          <a
            className={styles.shareBtn}
            href={`https://x.com/intent/post?url=${u}&text=${t}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on X (opens in a new tab)"
          >
            <span aria-hidden="true">X</span>
          </a>
        </li>
        <li>
          <button type="button" className={`${styles.shareBtn} ${copied === "copied" ? styles.shareDone : ""}`} onClick={copy} aria-label="Copy link to this article">
            {copied === "copied" ? (
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M3 8.5 6.5 12 13 4.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                <path
                  d="M6.8 9.2a3 3 0 0 0 4.2 0l2.2-2.2a3 3 0 0 0-4.2-4.2l-.9.9M9.2 6.8a3 3 0 0 0-4.2 0L2.8 9a3 3 0 0 0 4.2 4.2l.9-.9"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        </li>
      </ul>
      <p className={styles.copyStatus} role="status" aria-live="polite">
        {copied === "copied" ? "Link copied" : copied === "failed" ? "Couldn't copy. Copy the address bar instead." : ""}
      </p>
    </div>
  );
}
