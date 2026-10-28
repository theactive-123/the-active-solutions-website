import { Process, type ProcessStep } from "@/components/sections/Process";
import styles from "./RedProcess.module.css";

/** Shared Process timeline re-coloured for a `theme-red` section (ink progress line and dots, white copy). */
export function RedProcess({ steps }: { steps: ProcessStep[] }) {
  return (
    <div className={styles.wrap}>
      <Process theme="dark" steps={steps} />
    </div>
  );
}
