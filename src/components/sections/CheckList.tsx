import styles from "./CheckList.module.css";

export function CheckIcon({ variant = "check" }: { variant?: "check" | "cross" }) {
  if (variant === "cross") {
    return (
      <svg className={styles.cross} width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
        <path d="M5 5l12 12M17 5L5 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg className={styles.check} width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
      <circle cx="11" cy="11" r="11" fill="currentColor" />
      <path d="M6.5 11.2l3 3 6-6.4" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type Column = { label?: string; items: string[]; variant?: "check" | "cross" };

/** One or two columns of ruled list items with a check (or cross) bullet. */
export function CheckList({ columns }: { columns: Column[] }) {
  return (
    <div className={styles.wrap} data-cols={columns.length}>
      {columns.map((col, c) => (
        <div key={c}>
          {col.label && (
            <p className={styles.label} data-reveal="fade">
              {col.label}
            </p>
          )}
          <ul role="list" className={styles.list} data-reveal-stagger="0.06">
            {col.items.map((item) => (
              <li key={item} className={styles.item}>
                <CheckIcon variant={col.variant} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
