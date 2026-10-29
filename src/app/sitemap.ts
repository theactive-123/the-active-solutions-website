import type { MetadataRoute } from "next";
import { insights } from "@/content/insights";
import { caseStudyPath, projects } from "@/content/work";
import { services, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    ...services.map((s) => ({ path: s.href, priority: 0.9, changeFrequency: "monthly" as const })),
    { path: "/work", priority: 0.8, changeFrequency: "monthly" },
    { path: "/case-studies", priority: 0.8, changeFrequency: "monthly" },
    ...projects.map((p) => ({ path: caseStudyPath(p.slug), priority: 0.7, changeFrequency: "yearly" as const })),
    { path: "/partners", priority: 0.8, changeFrequency: "monthly" },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" },
    { path: "/insights", priority: 0.8, changeFrequency: "weekly" },
    { path: "/contact", priority: 0.8, changeFrequency: "yearly" },
    { path: "/contact/schedule", priority: 0.7, changeFrequency: "yearly" },
    { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
  ];

  return [
    ...pages.map((p) => ({ url: `${site.url}${p.path}`, changeFrequency: p.changeFrequency, priority: p.priority })),
    ...insights.map((a) => ({
      url: `${site.url}/insights/${a.slug}`,
      lastModified: a.date,
      changeFrequency: "yearly" as const,
      priority: 0.6,
      images: [`${site.url}${a.cover.src}`],
    })),
  ];
}
