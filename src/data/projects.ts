import type { Locale } from "../config/site";

/* ==========================================================================
   §2 [PROJECTS]. Deliberately EMPTY.

   It held three invented installations with real city names, real-looking
   savings and an "В експлоатация · 2025" status, under a page headed „Реални
   системи. Реални икономии." A visitor could not tell them from real client
   sites, and a "замени с реален проект" note was visible on the live page.

   Add entries only for installations that actually exist, with the client's
   permission: location, kWp, battery, photo, segment, measured savings. While
   this list is empty every surface says so honestly instead.
   ========================================================================== */

export type Project = {
  slug: string;
  title: Record<Locale, string>;
  segment: "home" | "business" | "industry" | "agri";
  location: Record<Locale, string>;
  kwp: number;
  batteryKwh: number | null;
  year: number;
  status: Record<Locale, string>;
  annualSavings: Record<Locale, string>;
  story: Record<Locale, string>;
  quote?: { text: Record<Locale, string>; author: Record<Locale, string> };
  image: string; // /images/projects/*.webp – real photos only
  featured: boolean;
  sample?: true; // sample entries only; real installations omit it
};

export const projects: Project[] = [];


export const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);

export const segmentLabels: Record<Project["segment"], Record<Locale, string>> = {
  home: { bg: "Дом", en: "Home" },
  business: { bg: "Бизнес", en: "Business" },
  industry: { bg: "Индустрия", en: "Industry" },
  agri: { bg: "Земеделие", en: "Agriculture" },
};
