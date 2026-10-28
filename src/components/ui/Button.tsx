import Link from "next/link";
import type { ComponentProps } from "react";
import styles from "./Button.module.css";

export type ButtonVariant = "red" | "light" | "dark" | "outline-light" | "outline-dark" | "white";

type Common = { variant?: ButtonVariant; size?: "md" | "sm"; arrow?: boolean; className?: string; children: React.ReactNode };
type AsLink = Common & { href: string } & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;
type AsButton = Common & { href?: undefined } & Omit<ComponentProps<"button">, "className" | "children">;

export function Arrow({ className }: { className?: string }) {
  return (
    <svg className={className} width="72" height="10" viewBox="0 0 72 10" fill="none" aria-hidden="true">
      <path d="M0 5h70M66 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Pill button from the design: label + long arrow. Renders a Link when `href` is given. */
export function Button(props: AsLink | AsButton) {
  const { variant = "red", size = "md", arrow = true, className, children, ...rest } = props;
  const cls = [styles.btn, styles[variant], size === "sm" && styles.sm, className].filter(Boolean).join(" ");
  const inner = (
    <>
      <span className={styles.label}>{children}</span>
      {arrow && (
        <span className={styles.arrowWrap}>
          <Arrow className={styles.arrow} />
        </span>
      )}
    </>
  );

  if ("href" in rest && rest.href !== undefined) {
    const { href, ...linkRest } = rest as AsLink;
    return (
      <Link href={href} className={cls} data-magnetic="0.18" {...linkRest}>
        {inner}
      </Link>
    );
  }
  return (
    <button className={cls} data-magnetic="0.18" {...(rest as Omit<AsButton, keyof Common>)}>
      {inner}
    </button>
  );
}
