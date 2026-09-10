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
      solar: "ВЕИ системи",
      proekti: "Проекти",
      info: "Ресурси",
      kontakti: "Контакти",
      oferta: "Заявете оферта",
    },
    a11y: {
      skip: "Към съдържанието",
      openMenu: "Отворете менюто",
      closeMenu: "Затвори менюто",
      primaryNav: "Основна навигация",
      footerNav: "Навигация в долната част",
      langSwitch: "Switch to English",
      call: "Обадете се",
      backToTop: "Обратно към началото на страницата",
    },
    promises: {
      response: responseBadge.bg,
      noFees: "Без скрити такси",
      offer2min: "Оферта за 2 минути",
      noDeposit: "Без депозити",
      financing: "Възможност за финансиране",
    },
    ctaVariants: {
      general: {
        title: "Готов за енергийна независимост?",
        text: `Заяви оферта или ни се обади, отговаряме ${responseWithin.bg}.`,
        primary: "Вземи оферта",
        call: "Обади се",
      },
      producer: {
        title: "Искате оферта за изкупуване на произведената електроенергия?",
        text: `Изпратете мощността, точката на присъединяване и профила на производство, и ще получите оферта по формула ${responseWithin.bg}.`,
        primary: "Заявете оферта за изкупуване",
        call: "Обадете се",
      },
      supply: {
        title: "Искате оферта за доставка на електроенергия?",
        text: `Изпратете данните на обекта и товаровия профил, ако разполагате с него. Отговаряме ${responseWithin.bg}.`,
        primary: "Заявете оферта за доставка",
        call: "Обадете се",
      },
      solarHome: {
        title: "Искаш предварителна оценка за обекта си?",
        text: `Изпрати ни данните за покрива и потреблението и ще получиш конкретни числа ${responseWithin.bg}.`,
        primary: "Вземи оферта",
        call: "Обади се",
      },
      solarBiz: {
        title: "Искате предварителна оценка за Вашия обект?",
        text: `Изпратете товаровия профил и данните за площта, и ще получите оценка с финансов модел ${responseWithin.bg}.`,
        primary: "Заявете оферта",
        call: "Обадете се",
      },
      company: {
        title: "Кажете ни какво търсите",
        text: `Изкупуване, доставка или соларна централа, ще Ви насочим към правилното направление ${responseWithin.bg}.`,
        primary: "Свържете се с нас",
        call: "Обадете се",
      },
    },
    footer: {
      oneLiner:
        "Лицензиран търговец на електроенергия в България. Прозрачни условия, индивидуален подход и оптимизиран процес.",
      services: "Услуги",
      company: "Компания",
      information: "Информация",
      legal: "Правни",
      contact: "Контакти",
      links: {
        tok: "Изкупуване на електроенергия",
        dostavka: "Доставка на електроенергия",
        solar: "Соларни системи и батерии",
        solarHome: "Соларна система за дома",
        solarBiz: "Соларна система за бизнеса",
        kalkulator: "Соларен калкулатор",
        oferta: "Заявете оферта",
        zaNas: "За нас",
        proekti: "Проекти",
        kontakti: "Контакти",
        info: "Информационен център",
        glossary: "Речник на термините",
        privacy: "Политика за поверителност",
        terms: "Общи условия",
        cookieSettings: "Настройки за бисквитки",
      },
      rights: "Всички права запазени.",
    },
    consent: {
      title: "Настройки за бисквитки",
      text: "Използваме бисквитки, за да работи сайтът коректно и, ако се съгласите, за да разберем как се използва. Подробностите са в",
      settings: "Настрой бисквитките",
      acceptAll: "Приемам всички",
      rejectAll: "Отказвам всички",
      save: "Запази избора",
      necessary: "Задължителни",
      necessaryText: "Само тези, които поддържат основните функции и сигурността. Не могат да се изключат.",
      analytics: "Аналитични и функционални",
      analyticsText: "За събиране на статистика и запомняне на предпочитания (Google Analytics).",
      marketing: "Маркетингови",
      marketingText: "За показване на реклами спрямо Вашите интереси.",
      /* Said plainly, because it is true today and the toggle would otherwise
         suggest tracking that is not happening. */
      marketingNone: "В момента сайтът не използва маркетингови бисквитки. Изборът Ви се запазва и важи, ако бъдат добавени.",
      privacyLink: "Политиката за поверителност",
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
      tok: "Electricity offtake",
      dostavka: "Supply",
      solar: "Solar systems",
      proekti: "Projects",
      info: "Resources",
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
    ctaVariants: {
      general: {
        title: "Ready for energy independence?",
        text: `Request a quote or give us a call, we reply ${responseWithin.en}.`,
        primary: "Get a quote",
        call: "Call us",
      },
      producer: {
        title: "Want a quote for the electricity your plant generates?",
        text: `Send us the capacity, the connection point and the generation profile, and you will have a formula-based offer ${responseWithin.en}.`,
        primary: "Request an offtake offer",
        call: "Call us",
      },
      supply: {
        title: "Want a quote for electricity supply?",
        text: `Send us the site details and the load profile, if you have one. We reply ${responseWithin.en}.`,
        primary: "Request a supply offer",
        call: "Call us",
      },
      solarHome: {
        title: "Want an indicative estimate for your home?",
        text: `Send us your roof and consumption details and you will have real numbers ${responseWithin.en}.`,
        primary: "Get a quote",
        call: "Call us",
      },
      solarBiz: {
        title: "Want an indicative estimate for your site?",
        text: `Send us the load profile and the available area, and you will have an estimate with a financial model ${responseWithin.en}.`,
        primary: "Request a quote",
        call: "Call us",
      },
      company: {
        title: "Tell us what you are looking for",
        text: `Offtake, supply or a solar plant, we will point you to the right area ${responseWithin.en}.`,
        primary: "Get in touch",
        call: "Call us",
      },
    },
    footer: {
      oneLiner:
        "A licensed electricity trader in Bulgaria. Transparent terms, an individual approach and a streamlined process.",
      services: "Services",
      company: "Company",
      information: "Information",
      legal: "Legal",
      contact: "Contact",
      links: {
        tok: "Electricity offtake for generators",
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
        glossary: "Glossary of terms",
        privacy: "Privacy policy",
        terms: "Terms & conditions",
        cookieSettings: "Cookie settings",
      },
      rights: "All rights reserved.",
    },
    consent: {
      title: "Cookie settings",
      text: "We use cookies to make the site work and, if you agree, to understand how it is used. The details are in",
      settings: "Customise cookies",
      acceptAll: "Accept all",
      rejectAll: "Reject all",
      save: "Save choice",
      necessary: "Strictly necessary",
      necessaryText: "Only those supporting core functionality and security. These cannot be switched off.",
      analytics: "Analytics and functional",
      analyticsText: "For usage statistics and remembering your preferences (Google Analytics).",
      marketing: "Marketing",
      marketingText: "For showing advertising based on your interests.",
      marketingNone: "The site uses no marketing cookies at present. Your choice is stored and applies if any are added.",
      privacyLink: "the Privacy Policy",
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
