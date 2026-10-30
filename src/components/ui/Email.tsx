import { encodeEmail } from "@/lib/contact-email";
import { RevealEmail } from "./RevealEmail";

/** Server wrapper: passes only the encoded address to the client "click to reveal" button. */
export function Email(props: { label?: string; subject?: string; body?: string; className?: string }) {
  return <RevealEmail code={encodeEmail()} {...props} />;
}
