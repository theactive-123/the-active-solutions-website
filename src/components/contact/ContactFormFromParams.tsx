"use client";

import { useSearchParams } from "next/navigation";
import { ContactForm } from "./ContactForm";

/**
 * Reads ?type=partner and ?need=a,b from the URL and preselects the form. Must be rendered
 * inside <Suspense> (the page prerenders the plain <ContactForm /> as the fallback).
 */
export function ContactFormFromParams({ emailCode }: { emailCode: string }) {
  const params = useSearchParams();
  const kind = params.get("type") === "partner" ? "partner" : "project";
  const needs = (params.get("need") ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 12);
  return <ContactForm key={`${kind}|${needs.join(",")}`} initialKind={kind} initialNeeds={needs} emailCode={emailCode} />;
}
