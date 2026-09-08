# NV Power – nvpower.bg

**🇧🇬 [Български](#български) · 🇬🇧 [English](#english)**

Двуезичен маркетингов сайт за **NV Power** – търговия с електроенергия и
фотоволтаични централи с батерии.
Bilingual marketing site for **NV Power** – electricity trading and solar plants
with battery storage.

**„Енергия за утрешния ден" / "Energy for tomorrow"**

---

## Български

Пълен двуезичен сайт (BG основен, EN огледален) с **30 индексируеми страници**,
подреден около **три направления**: изкупуване на ток от ВЕИ производители с
поемане на балансирането; доставка на електроенергия по индивидуална оферта за
консуматори над 1 MW; и проектиране и изграждане на фотоволтаични централи с
батерии. Таблицата с маршрутите е в „Маршрути и двуезичност“.

### TO-DO преди публикуване

**Блокери** – сайтът не бива да се промотира преди това:

- [ ] **Домейн / индексиране.** `nvpower.bg` все още е старият (Wix) сайт, затова този деплой е демо и е **noindex** (`SITE_INDEXABLE = false` в `src/config/site.ts`; `robots.txt` връща `Disallow: /`). `SITE_URL` умишлено остава `https://nvpower.bg`, за да са верни canonical/hreflang/og:url/sitemap в момента, в който този build стане реалният сайт – тогава просто обърни флага на `true`. Внимавай и за `www` формата: `nvpower.bg` прави 301 към `www.nvpower.bg`.

- [ ] **Form endpoint.** `site.formEndpoint` е празен низ, затова формите не изпращат нищо – посетителят вижда телефон и имейл. Свържи form service или serverless функция (виж раздел „Форми" по-долу). **Докато е празен, качването на файлове се скрива автоматично** (`CAN_ACCEPT_UPLOADS`): блокът за изпращане на отчитане на `/tok/` и полето за прикачване в контактната форма изчезват, за да не искаме документ, който няма къде да отиде. Връщат се сами щом сложиш endpoint.
- [x] **Цени.** Няма маскирани цени. Сайтът умишлено **не публикува фиксирана цена за ток**: офертите са формула спрямо БНЕБ (IBEX), а формулировката е в `site.pricingBasis` / `pricingBasisShort`. Фирмените данни (телефон, ЕИК, ДДС №, адрес, лиценз Л-878) също са реалните.
- [x] **Примерни проекти.** Премахнати. `src/data/projects.ts` е празен масив, а `/proekti/` казва, че проектите предстоят. Добавяй само реално изградени обекти, с разрешение на клиента.
- [ ] **Останали placeholder-и.** GA4 id (`gaMeasurementId`) и Facebook/Instagram в `site.socials` са празни. **Секцията „Екип" е скрита**, защото `team` е празен масив – попълни го и се показва автоматично. Картата вече е реалната, но се зарежда само след клик (виж „Съгласие и трети страни").

**Изисква бизнес потвърждение – направление „Доставка"** (`/dostavka/`):

- [ ] **Обхватът на доставката е ограничен умишлено.** Страницата обещава само това, което е потвърдено: индивидуални оферти за консуматори **над 1 MW**, без публикувана тарифа. Единственото потвърдено съдържание преди рефакторинга беше един абзац в блока над 1 MW на `/tok/`.
- [ ] Преди страницата да се разшири, бизнесът трябва да потвърди: (1) обслужваме ли обекти под 1 MW и от каква мощност нагоре; (2) как се формира цената по доставка (формула, такси, период); (3) процедурата и срокът за смяна на доставчик; (4) какво влиза в месечната фактура. **Докато това не е потвърдено, не добавяй нищо от изброеното на страницата.**
- [ ] Остатъчният текст за доставка на битови клиенти в `/info/` (3 въпроса: срок за смяна на доставчик, как се чете фактура, ЗкО/акциз) все още е писан за консуматори. Реши дали остава като общообразователен материал, или се преработва за производители.

**След преориентирането към изкупуване** – `/tok/` е основното направление на сайта:

- [ ] **Формата за оферта е скрита и чака преработка.** `OFFER_WIZARD_READY = false` в `src/config/site.ts` – докато е `false`, `/oferta/` показва телефон, имейл и линк към контактите вместо въпросника.

  **Защо е скрита.** `OfferWizard` пита само соларни неща (покрив, конструкция, батерия), а всички CTA-та за изкупуване на `/tok/` водят точно там: производител, който иска да продава ток, попадаше на въпросник за соларна система. Освен това `formEndpoint` е празен, тоест нищо от попълненото не се изпращаше. Седем стъпки на вятъра са по-лошо от липсваща форма.

  **Какво трябва, за да се върне.** Производителски клон във въпросника (мощност, точка на присъединяване, профил на производство, текущ търговец, срок на предизвестие) – конкретните полета зависят от това какво ползва търговският екип, за да остойности оферта. Плюс работещ `formEndpoint`. След двете обърни флага на `true`; страницата, маршрутът и всички 15 входящи линка остават непроменени през цялото време.
- [ ] EN slug-ът на страницата остава `/en/electricity/`. По-точен би бил `/en/power-buy-back/`, но смяната изисква нов 301 в `vercel.json` – реши дали си струва.
- [ ] `0.099` се вижда още на 2 места, и двете като **индикативни допускания за спестявания от солар**, не като цена по оферта: допусканията в `/kalkulator/` и „Примерни числа" в `/solar/za-biznesa/`. Идват от `site.price.eurPerKwh`.

**Инфраструктура:**

- [ ] Вторият Vercel проект (`nvpower-website.vercel.app`) не е свързан с `main` и отдава стар build. Линкът в About на repo-то вече сочи pink деплоя, но старият проект **е обхождаем** (`robots.txt` там още връща `Allow: /` и сочи sitemap към `nvpower.bg`) – изтрий проекта или го насочи към `main`. Само от Vercel dashboard.

**Приятно за имане:**

- [ ] Истинско SVG лого – нужен е векторният оригинал; сегашното е оптимизиран растер (WebP + PNG).
- [ ] Индикация за скролване (градиент отдясно) на широката сравнителна таблица в мобилен изглед.
- [ ] Зони за докосване във футъра. Редовете с линкове са 28px високи, телефонът и имейлът 17px, при препоръчани 44px. По ширина се улучват лесно (335px), по височина са тесни. Същото важи за „Виж всички въпроси и отговори" (20px).

### Стек

- **Astro 7** – изцяло статичен изход, целият текст е в началния HTML (SEO)
- **Tailwind CSS v4** – дизайн токени в `src/styles/global.css` (`@theme inline`)
- **React islands** – само за интерактивното (wizard, калкулатор, форми)
- **Montserrat + Inter** (self-hosted чрез Fontsource), **Lucide** икони

### Команди

```bash
npm run dev      # http://localhost:4321
npm run build    # статичен build в dist/
npm run preview
npx astro check  # типова проверка
```

### ⚠️ Преди публикуване – задължително

**1. Бизнес факти.** Всичко е централизирано в **`src/config/site.ts`**.
Фирмените данни вече са реалните (телефон, ЕИК, ДДС №, адрес, лиценз Л-878,
регистрацията към ЕСО). Умишлено маскирана остава **само цената на тока**
(`site.price`), защото се договаря индивидуално. Празни са още GA4 id, екипът и
Facebook/Instagram профилите.

**2. Проекти.** `src/data/projects.ts` е **празен** и това е правилното
състояние, докато няма реални обекти: и `/proekti/`, и блокът на началната
страница казват честно, че проектите предстоят. Добавяй записи само за реално
изградени системи.

**3. Форми – единственият реален блокер.** Формите POST-ват
`multipart/form-data` (включително прикачения файл) към `site.formEndpoint`.
**Докато е празен низ, нищо не се изпраща:** посетителят вижда телефон и имейл
като резервен вариант, а в конзолата се логва грешка. Никога не се показва
фалшиво потвърждение – по-добре честен провал, отколкото загубен клиент.

Свържи form service (напр. Formspree) или собствена serverless функция с имейл
до office@nvpower.bg, и попълни `site.formEndpoint`.

**Кои форми са живи в момента:** контактната на `/kontakti/` и мини
конфигураторът на началната страница (и двете със същия резервен вариант).
Въпросникът на `/oferta/` е **скрит** зад `OFFER_WIZARD_READY` – виж TO-DO
по-горе. Качването на файлове е скрито зад `CAN_ACCEPT_UPLOADS`.

> **CSP:** ако endpoint-ът е на **друг домейн**, добави origin-а му към
> `connect-src` и `form-action` – на Vercel това е в **`vercel.json`**.
> Endpoint на **същия домейн** (напр. `/api/lead`) не изисква промяна.

### Хостинг (Vercel)

Статичен build в `dist/`. Деплойва се на **Vercel**, затова `public/_headers` и
`public/_redirects` (Netlify / Cloudflare Pages формат) **не се четат** –
реалните HTTP хедъри и 301 редиректите идват от **`vercel.json`**. Файловете за
Netlify са запазени само за преносимост; **промениш ли едното, промени и другото**.

`vercel.json` съдържа: security хедъри (CSP, HSTS, X-Frame-Options,
Permissions-Policy), кеширане на `/_astro/*`, `trailingSlash: true` и 301
редиректи от старите английски адреси към новите.

### Маршрути и двуезичност

**`src/i18n/routes.ts` е единственият източник на истина.** Българските slug-ове
са каноничните; английските живеят под `/en/` със **свои английски slug-ове**
(`/tok/` → `/en/electricity/`), описани в `EN_SLUGS`.

От тази карта се генерират навигацията, езиковият превключвател, `canonical`,
`hreflang` двойките и sitemap-ът. **Липсващ запис чупи всичките наведнъж** – ако
добавяш страница, добави и slug-а.

**Три направления, три маршрута.** Сайтът е подреден около това какво прави
посетителят, не какво правим ние:

| Направление | Маршрут | Аудитория |
| --- | --- | --- |
| Изкупуване и балансиране | `/tok/` · `/en/electricity/` | ВЕИ производители |
| Доставка на електроенергия | `/dostavka/` · `/en/electricity-supply/` | Консуматори над 1 MW |
| Соларни ФЕЦ и BESS | `/solar/` + подстраниците | Дом и бизнес |

Правилото, което държи структурата: **никоя страница не смесва език на продавач
и на купувач.** Преди рефакторинга `/tok/` го правеше – в блока над 1 MW
предлагаше и доставка. Затова доставката има собствен маршрут, а двете страници
се сочат взаимно с явен надпис вместо да делят текст.

**Етикети в навигацията.** `nav.tok` е „Изкупуване", `nav.dostavka` е „Доставка":
етикетът трябва да казва от коя страна на сделката е посетителят, затова не е
„Планове" (планове за какво?). Линковете в хедъра са `whitespace-nowrap`, за да
излезе по-дълъг етикет видимо, вместо да се пренесе тихо; проверено е, че шестте
елемента се събират на един ред при 1024px. Описателният текст живее във футъра.

### Валута

**Само евро.** България е в еврозоната от януари 2026 г.; цените в лева са
премахнати изцяло. Не връщай лева.

**Няма публикувана цена за ток.** Офертите са формула спрямо дневния пазар на
БНЕБ (IBEX), затова никъде не се обявява фиксирано €/кВтч, а формулите по
плановете са в €/MWh (`/tok/`). Изречението, което го казва, е на едно място:
`site.pricingBasis` (пълно) и `site.pricingBasisShort` (за херо и карти).
`site.price.eurPerKwh` **не е цена по оферта** – това е индикативна крайна цена
и служи само за оценка на самопотребената соларна енергия в калкулатора.

### Структура

```
src/
├── config/site.ts            # ⚠️ всички бизнес факти ([PLACEHOLDER])
├── i18n/
│   ├── routes.ts             # ⚠️ маршрути + EN slug карта + hreflang помощници
│   └── ui.ts                 # споделени UI низове (re-export на routes)
├── styles/global.css         # дизайн токени + utility класове (btn, card, field…)
├── layouts/BaseLayout.astro  # SEO head, hreflang, JSON-LD, consent, reveals
├── components/               # Header, Footer, CtaBand, BackToTop, CookieConsent, ConsentMap…
├── islands/                  # React: OfferWizard, SolarCalculator, форми
├── lib/
│   ├── lead.ts               # изпращане на заявки (FormData + файл)
│   └── useHydrated.ts        # заключва submit до хидратация
├── templates/                # по един шаблон на страница (bg+en копи вътре)
├── pages/                    # тънки route файлове; /en/* е огледало
└── data/projects.ts          # проекти (sample данни за замяна)
```

### Достъпност и тема

- Светлата тема е по подразбиране; тъмната се включва от хедъра и се пази в
  `localStorage`.
- Контрастът покрива **WCAG AA** в двете теми. `--accent` е ярък за текст върху
  тъмно, а `--accent-contrast` дава преден план за всичко **върху** accent
  (бутони). Ползвай токена, не `text-white`.
- В тъмната тема текстът на секциите е близо до бялото: `--text-color: #fbfefe`
  и `--text-color-muted: #cddfe1`. Приглушеният тон носи по-голямата част от
  текста, затова държи и по-голямата част от усещането за секцията, а старият
  `#a0c2c5` изглеждаше блед. Контраст върху фона на страницата: 14.27:1 и
  10.50:1; най-тясната двойка, приглушен текст върху карта, е 8.97:1.
- Числата 01/02/03 в „Как работи" са **декоративен воден знак**, не текст за
  четене: 1.24:1 в светлата и 1.35:1 в тъмната тема. Поредността се вижда от
  подредбата и заглавието, затова ниският контраст е нарочен.
- Формите имат видими `<label>`, `autocomplete`, и `<noscript>` резервен вариант.
- Бутонът „нагоре" се появява в края на страницата и връща фокуса в хедъра.
- Мобилно + тъмна тема, проверено на 375×812 на 10 страници (включително EN):
  никъде няма хоризонтално преливане (`scrollWidth` = 375), а всеки текст покрива
  AA. Най-ниската реална стойност е 4.89:1, accent върху карта.
- Полетата във формите са 16px, за да не зумва iOS при фокус.

### Съгласие и трети страни

Сайтът **не поставя собствени бисквитки**. В `localStorage` пази точно три
ключа, изброени и в политиката за поверителност: `nvpower-consent` (избора от
банера), `theme` и `nvpower-map-consent`.

- **Аналитика.** Google Consent Mode v2 с всичко `denied` по подразбиране.
  Скриптът на GA4 се вкарва в страницата **само** след съгласие и само ако
  `site.gaMeasurementId` е попълнен (сега е празен, тоест нищо не се зарежда).
- **Оттегляне.** Бутонът „Настройки за бисквитки" във футъра отваря банера
  наново с текущия избор. Слушателите се закачат независимо дали има запазен
  избор – без това банерът не можеше да се отвори повторно и обещанието в
  политиката беше невярно. Без JS бутонът е скрит.
- **Карта.** `ConsentMap.astro` вместо директен iframe: Google получава IP
  адреса на посетителя само след натискане на бутона. Без JS остава обикновен
  линк към Google Maps.

Добавиш ли трети скрипт, той минава през същия механизъм и се описва в
`PrivacyPage.astro` – иначе политиката става невярна.

### Език и тон

Целият сайт е на приятелско-неформално **„ти"** (никога „Вие"). Английската
версия е **пълно огледало**, не резюме.

**Срок за отговор.** `site.responseTime.confirmed` е `false`, затова целият сайт
казва **„възможно най-скоро"** вместо число. Причината: имаше две обещания
едновременно, „оферта до 1 работен ден" в 16 CTA бутона и „отговор до 3 работни
дни" на 51 други места, понякога едно до друго в едно и също херо. `responseTime`
съществуваше, но само един шаблон го четеше.

Всяка повърхност вече минава през `responseWithin` (в изречение) и
`responseBadge` (самостоятелен етикет) от `src/config/site.ts`. **За да обявите
реален срок:** сложете периода в `responseTime.bg`/`.en` и обърнете `confirmed`
на `true`. Нищо друго не се пипа. CTA бутоните умишлено вече не носят срок.

---

## English

A complete bilingual site (Bulgarian primary, English mirror) of **30 indexable
pages**, organised around **three business areas**: buying electricity from
renewable producers and taking on the balancing; supplying electricity on an
individual offer to consumers above 1 MW; and designing and building solar plants
with battery storage. The route table is under "Routing and i18n".

### TO-DO before launch

**Blockers** – do not promote the site until these are done:

- [ ] **Domain / indexing.** `nvpower.bg` still serves the old (Wix) site, so this deployment is a demo and is **noindex** (`SITE_INDEXABLE = false` in `src/config/site.ts`; `robots.txt` returns `Disallow: /`). `SITE_URL` deliberately stays `https://nvpower.bg` so canonical/hreflang/og:url/sitemap are already correct the moment this build becomes the real site – then just flip the flag to `true`. Mind the `www` form too: `nvpower.bg` 301s to `www.nvpower.bg`.

- [ ] **Form endpoint.** `site.formEndpoint` is an empty string, so forms send nothing – visitors get the phone/email fallback. Wire a form service or serverless function (see the Forms section below). **While it is empty, file uploads hide themselves** (`CAN_ACCEPT_UPLOADS`): the settlement-upload block on `/tok/` and the attachment field in the contact form disappear, so we never ask for a document that has nowhere to go. Both return once an endpoint is set.
- [x] **Prices.** No masked prices left. The site deliberately **publishes no fixed electricity price**: offers are a formula against IBEX (БНЕБ), and the wording lives in `site.pricingBasis` / `pricingBasisShort`. The company facts (phone, company ID, VAT number, address, licence L-878) are the real ones too.
- [x] **Sample projects.** Removed. `src/data/projects.ts` is an empty array and `/proekti/` says the projects are coming. Add only installations actually built, with the client's permission.
- [ ] **Remaining placeholders.** The GA4 id (`gaMeasurementId`) and Facebook/Instagram in `site.socials` are empty. **The Team section is hidden**, because `team` is an empty array – fill it and it reappears automatically. The map is the real one now, but it loads only on click (see "Consent and third parties").

**Needs business confirmation – the Supply area** (`/dostavka/`):

- [ ] **The scope is deliberately narrow.** The page promises only what is confirmed: individual offers for consumers **above 1 MW**, with no published tariff. Before the refactor the only confirmed supply content on the whole site was one paragraph inside the >1 MW block on `/tok/`.
- [ ] Before the page can grow, the business must confirm: (1) whether sites below 1 MW are served, and from what capacity upwards; (2) how a supply price is formed (formula, fees, period); (3) the supplier-switching procedure and its timing; (4) what appears on the monthly invoice. **Until those are confirmed, do not add any of them to the page.**
- [ ] Residual household-supply copy in `/info/` (3 questions: switching timeline, how to read an invoice, ЗкО/excise) is still written for consumers. Decide whether it stays as general educational material or is reworked for producers.

**After the shift to buy-back** – `/tok/` is the site's primary business line:

- [ ] **The quote form is hidden, pending a rework.** `OFFER_WIZARD_READY = false` in `src/config/site.ts` – while it is `false`, `/oferta/` shows the phone number, the email address and a link to the contact page instead of the questionnaire.

  **Why it is hidden.** `OfferWizard` asks solar questions only (roof, mounting, battery), while every buy-back CTA on `/tok/` points straight at it: a producer wanting to sell power was handed a solar questionnaire. On top of that `formEndpoint` is empty, so nothing filled in was ever transmitted. Seven steps for nothing is worse than no form.

  **What it needs to come back.** A producer branch in the questionnaire (capacity, connection point, production profile, current trader, notice period) – the exact fields depend on what the trading desk uses to price an offer. Plus a working `formEndpoint`. With both in place, flip the flag to `true`; the page, its route and all 15 inbound links stay unchanged throughout.
- [ ] The page's EN slug is still `/en/electricity/`. `/en/power-buy-back/` would be more accurate, but changing it means another 301 in `vercel.json` – decide whether it's worth it.
- [ ] `0.099` still appears in 2 places, both as **indicative assumptions for solar savings**, not as an offer price: the `/kalkulator/` assumptions and the "Example numbers" block on `/solar/za-biznesa/`. Both come from `site.price.eurPerKwh`.

**Infrastructure:**

- [ ] The second Vercel project (`nvpower-website.vercel.app`) is not wired to `main` and serves a stale build. The repo's About link now points at the pink deployment, but the old project **is still crawlable** (its `robots.txt` returns `Allow: /` and points a sitemap at `nvpower.bg`) – delete the project or point it at `main`. Vercel dashboard only.

**Nice to have:**

- [ ] A real SVG logo – needs the vector original; the current one is an optimised raster (WebP + PNG).
- [ ] A scroll affordance (right-edge gradient) on the wide comparison table in mobile view.
- [ ] Footer tap targets. Link rows are 28px tall and the phone/email lines 17px, against a recommended 44px. They are easy to hit horizontally (335px wide) but tight vertically. Same for "See all questions & answers" (20px).

### Stack

- **Astro 7** – fully static output; all copy is in the initial HTML (SEO)
- **Tailwind CSS v4** – design tokens in `src/styles/global.css` (`@theme inline`)
- **React islands** – only for the interactive parts (wizard, calculator, forms)
- **Montserrat + Inter** (self-hosted via Fontsource), **Lucide** icons

### Commands

```bash
npm run dev      # http://localhost:4321
npm run build    # static build into dist/
npm run preview
npx astro check  # type check
```

### ⚠️ Before going live – required

**1. Business facts.** All centralised in **`src/config/site.ts`**. The company
facts are now the real ones (phone, company ID, VAT number, address, licence
L-878, the ESO registration). Only **the electricity price** stays masked
(`site.price`), because it is quoted individually. Still empty: the GA4 id, the
team and the Facebook/Instagram profiles.

**2. Sample projects.** `src/data/projects.ts` – entries are flagged
`sample: true`. Replace with real installations or delete them; the site renders
an honest "coming soon" state when the list is empty.

**3. Forms – the one real blocker.** Forms POST `multipart/form-data`
(attachment included) to `site.formEndpoint`. **While it is an empty string
nothing is sent:** the visitor gets the phone/email fallback and the console logs
an error. A false confirmation is never shown – an honest failure beats a lost
lead.

Wire a form service (e.g. Formspree) or your own serverless function that emails
office@nvpower.bg, then set `site.formEndpoint`.

**Which forms are live right now:** the contact form on `/kontakti/` and the
homepage mini configurator (both with the same fallback). The `/oferta/`
questionnaire is **hidden** behind `OFFER_WIZARD_READY` – see the TO-DO above.
File uploads are hidden behind `CAN_ACCEPT_UPLOADS`.

> **CSP:** if the endpoint is on **another domain**, add its origin to
> `connect-src` and `form-action` – on Vercel that lives in **`vercel.json`**.
> A **same-origin** endpoint (e.g. `/api/lead`) needs no change.

### Hosting (Vercel)

Static build in `dist/`. Deployed on **Vercel**, which means `public/_headers`
and `public/_redirects` (Netlify / Cloudflare Pages formats) **are ignored** –
the live HTTP headers and 301s come from **`vercel.json`**. The Netlify files are
kept only for portability; **change one, change the other**.

`vercel.json` holds the security headers (CSP, HSTS, X-Frame-Options,
Permissions-Policy), `/_astro/*` immutable caching, `trailingSlash: true`, and
301s from the old English URLs to the current ones.

### Routing and i18n

**`src/i18n/routes.ts` is the single source of truth.** Bulgarian slugs are
canonical; English pages live under `/en/` with **their own English slugs**
(`/tok/` → `/en/electricity/`), declared in `EN_SLUGS`.

Navigation, the language switcher, `canonical`, the `hreflang` pair and the
sitemap are all derived from that map. **A missing entry breaks all of them at
once** – when you add a page, add its slug too.

**Three areas, three routes.** The site is organised around what the visitor
does, not around what we do:

| Area | Route | Audience |
| --- | --- | --- |
| Buy-back & balancing | `/tok/` · `/en/electricity/` | Renewable producers |
| Electricity supply | `/dostavka/` · `/en/electricity-supply/` | Consumers above 1 MW |
| Solar PV & BESS | `/solar/` + children | Home and business |

The rule that holds the structure together: **no page mixes seller and buyer
language.** Before the refactor `/tok/` did exactly that, offering supply inside
its >1 MW block. Supply therefore has its own route, and the two pages signpost
each other explicitly rather than sharing copy.

**Nav labels.** `nav.tok` is "Изкупуване", `nav.dostavka` is "Доставка": the label
has to say which side of the trade the visitor is on, which is why it is not
"Планове" (plans for what?). Header links are `whitespace-nowrap` so a longer
label overflows visibly instead of wrapping silently; the six items are verified
to fit on one line at 1024px. The descriptive wording lives in the footer.

### Currency

**Euro only.** Bulgaria joined the euro area in January 2026; lev pricing has
been removed entirely. Do not reintroduce the lev.

**No published electricity price.** Offers are a formula against the IBEX
(БНЕБ) day-ahead market, so no fixed €/kWh figure is quoted anywhere, and the
per-plan formulas are in €/MWh (`/tok/`). The sentence that says so lives in one
place: `site.pricingBasis` (full) and `site.pricingBasisShort` (for the hero and
cards). `site.price.eurPerKwh` is **not an offer price** – it is an indicative
retail rate, used only to value self-consumed solar energy in the calculator.

### Structure

```
src/
├── config/site.ts            # ⚠️ every business fact ([PLACEHOLDER])
├── i18n/
│   ├── routes.ts             # ⚠️ routes + EN slug map + hreflang helpers
│   └── ui.ts                 # shared UI strings (re-exports routes)
├── styles/global.css         # design tokens + utilities (btn, card, field…)
├── layouts/BaseLayout.astro  # SEO head, hreflang, JSON-LD, consent, reveals
├── components/               # Header, Footer, CtaBand, BackToTop, CookieConsent, ConsentMap…
├── islands/                  # React: OfferWizard, SolarCalculator, forms
├── lib/
│   ├── lead.ts               # lead submission (FormData + file)
│   └── useHydrated.ts        # gates submit until hydration
├── templates/                # one template per page (bg+en copy inside)
├── pages/                    # thin route files; /en/* mirrors the tree
└── data/projects.ts          # projects (sample data to replace)
```

### Accessibility and theming

- Light theme is the default; dark is toggled from the header and persisted in
  `localStorage`.
- Contrast meets **WCAG AA** in both themes. `--accent` is bright enough for text
  on dark, and `--accent-contrast` supplies the foreground for anything sitting
  **on** accent (buttons). Use the token, not `text-white`.
- In dark mode the section text sits close to white: `--text-color: #fbfefe` and
  `--text-color-muted: #cddfe1`. The muted tone carries most of the body copy, so
  it sets the mood of every section, and the old `#a0c2c5` read dim. Contrast on
  the page background is 14.27:1 and 10.50:1; the tightest pairing, muted text on
  a card, is 8.97:1.
- The 01/02/03 numerals in "How it works" are a **decorative watermark**, not
  reading text: 1.24:1 in light, 1.35:1 in dark. Step order comes from the
  ordering and the title, so the low contrast is deliberate.
- Forms have visible `<label>`s, `autocomplete`, and a `<noscript>` fallback.
- The back-to-top control appears near the page end and returns focus to the
  header, not just the viewport.
- Mobile plus dark theme, checked at 375×812 across 10 pages (English included):
  no horizontal overflow anywhere (`scrollWidth` = 375) and every text run meets
  AA. The lowest real value is 4.89:1, accent on a card.
- Form fields are 16px so iOS does not zoom on focus.

### Consent and third parties

The site **sets no cookies of its own**. It keeps exactly three `localStorage`
keys, the same three listed in the privacy policy: `nvpower-consent` (the banner
choice), `theme` and `nvpower-map-consent`.

- **Analytics.** Google Consent Mode v2 with everything `denied` by default. The
  GA4 script is injected **only** after consent, and only if
  `site.gaMeasurementId` is set (it is empty now, so nothing loads at all).
- **Withdrawal.** The "Cookie settings" button in the footer reopens the banner
  with the current choice preselected. Listeners attach whether or not a choice
  is saved – without that the banner could never be reopened, which made the
  policy's withdrawal promise untrue. The button is hidden without JS.
- **Map.** `ConsentMap.astro` instead of a bare iframe: Google only receives the
  visitor's IP once they press the button. Without JS it degrades to a plain
  Google Maps link.

If you add a third-party script, route it through the same mechanism and
describe it in `PrivacyPage.astro` – otherwise the policy becomes false.

### Voice

The Bulgarian copy uses the informal **„ти"** throughout, never „Вие". The
English version is a **full mirror**, not a summary.

**Response time.** `site.responseTime.confirmed` is `false`, so the whole site
says **"as soon as possible"** rather than a number. The reason: it promised two
periods at once, "оферта до 1 работен ден" in 16 CTA labels and "отговор до
3 работни дни" in 51 other places, sometimes side by side in the same hero.
`responseTime` existed, but only one template read it.

Every surface now goes through `responseWithin` (in a sentence) and
`responseBadge` (a standalone label) from `src/config/site.ts`. **To publish a
real commitment:** put the period in `responseTime.bg`/`.en` and flip `confirmed`
to `true`. Nothing else needs editing. CTA labels deliberately no longer carry a
response time.
