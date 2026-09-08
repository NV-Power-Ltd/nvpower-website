import type { Locale } from "../config/site";
import { responseWithin, responseBadge } from "../config/site";

/* Routing lives in ./routes so client-side islands can import the helpers
   without pulling this whole translation dictionary into their bundle. */
export { routes, href, r, alternates, enPath, type RouteKey } from "./routes";

/* ------------------------------------------------------------------ */


export const ui = {
  bg: {
    nav: {
      tok: "Изкупуване",
      dostavka: "Доставка",
      solar: "Соларни системи",
      proekti: "Проекти",
      info: "Инфо",
      kontakti: "Контакти",
      oferta: "Вземи оферта",
    },
    a11y: {
      skip: "Към съдържанието",
      openMenu: "Отвори менюто",
      closeMenu: "Затвори менюто",
      primaryNav: "Основна навигация",
      footerNav: "Навигация в долната част",
      langSwitch: "Switch to English",
      call: "Обади се",
      backToTop: "Обратно към началото на страницата",
    },
    promises: {
      response: responseBadge.bg,
      noFees: "Без скрити такси",
      offer2min: "Оферта за 2 минути",
      noDeposit: "Без депозити",
      financing: "Възможност за финансиране",
    },
    cta: {
      title: "Готов за енергийна независимост?",
      text: `Вземи оферта онлайн или ни се обади, отговаряме ${responseWithin.bg}.`,
      primary: "Вземи оферта",
      call: "Обади се",
    },
    footer: {
      oneLiner:
        "Ток на ясна цена и соларни централи с батерии, от един партньор, който мисли за твоята дългосрочна независимост.",
      services: "Услуги",
      company: "Компания",
      information: "Информация",
      legal: "Правни",
      contact: "Контакти",
      links: {
        tok: "Изкупуване на ток от ВЕИ",
        dostavka: "Доставка на електроенергия",
        solar: "Соларни системи и батерии",
        solarHome: "Соларна система за дома",
        solarBiz: "Соларна система за бизнеса",
        kalkulator: "Соларен калкулатор",
        oferta: "Вземи оферта",
        zaNas: "За нас",
        proekti: "Проекти",
        kontakti: "Контакти",
        info: "Информационен център",
        privacy: "Политика за поверителност",
        terms: "Общи условия",
        aiInfo: "Информация за AI системи",
        cookieSettings: "Настройки за бисквитки",
      },
      rights: "Всички права запазени.",
    },
    consent: {
      title: "Използваме бисквитки",
      text: "Използваме бисквитки за анализ на трафика и подобряване на сайта. Можеш да приемеш всички или да избереш кои.",
      acceptAll: "Приемам всички",
      rejectAll: "Само необходимите",
      settings: "Настройки",
      save: "Запази избора",
      necessary: "Необходими",
      necessaryText: "Задължителни за работата на сайта. Винаги активни.",
      analytics: "Аналитични",
      analyticsText: "Помагат ни да разберем как се използва сайтът (Google Analytics).",
      privacyLink: "Политика за поверителност",
    },
    misc: {
      readMore: "Прочети още",
      seeAll: "Виж всички",
      backTo: "Обратно към",
      updated: "Последна актуализация",
      licensedTrader: "Лицензиран търговец на електроенергия",
    },
  },
  en: {
    nav: {
      tok: "Buy-back",
      dostavka: "Supply",
      solar: "Solar systems",
      proekti: "Projects",
      info: "Info",
      kontakti: "Contact",
      oferta: "Get a quote",
    },
    a11y: {
      skip: "Skip to content",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      primaryNav: "Primary navigation",
      footerNav: "Footer navigation",
      langSwitch: "Превключи на български",
      call: "Call us",
      backToTop: "Back to top of page",
    },
    promises: {
      response: responseBadge.en,
      noFees: "No hidden fees",
      offer2min: "A quote in 2 minutes",
      noDeposit: "No deposits",
      financing: "Financing available",
    },
    cta: {
      title: "Ready for energy independence?",
      text: `Get a quote online or give us a call, we reply ${responseWithin.en}.`,
      primary: "Get a quote",
      call: "Call us",
    },
    footer: {
      oneLiner:
        "Electricity at a clear price and solar plants with batteries, from one partner focused on your long-term independence.",
      services: "Services",
      company: "Company",
      information: "Information",
      legal: "Legal",
      contact: "Contact",
      links: {
        tok: "Electricity buy-back for producers",
        dostavka: "Electricity supply",
        solar: "Solar systems & batteries",
        solarHome: "Solar for your home",
        solarBiz: "Solar for your business",
        kalkulator: "Solar calculator",
        oferta: "Get a quote",
        zaNas: "About us",
        proekti: "Projects",
        kontakti: "Contact",
        info: "Info centre",
        privacy: "Privacy policy",
        terms: "Terms & conditions",
        aiInfo: "Information for AI systems",
        cookieSettings: "Cookie settings",
      },
      rights: "All rights reserved.",
    },
    consent: {
      title: "We use cookies",
      text: "We use cookies to analyse traffic and improve the site. Accept all or choose which ones.",
      acceptAll: "Accept all",
      rejectAll: "Essential only",
      settings: "Settings",
      save: "Save choices",
      necessary: "Necessary",
      necessaryText: "Required for the site to work. Always active.",
      analytics: "Analytics",
      analyticsText: "Help us understand how the site is used (Google Analytics).",
      privacyLink: "Privacy policy",
    },
    misc: {
      readMore: "Read more",
      seeAll: "See all",
      backTo: "Back to",
      updated: "Last updated",
      licensedTrader: "Licensed electricity trader",
    },
  },
} as const;

export type UIDict = (typeof ui)["bg"];

export function useUI(locale: Locale): UIDict {
  // EN literals differ from BG literals; both share the exact same shape.
  return ui[locale] as UIDict;
}
