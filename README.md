
# Payments Manager

Payments manager keeps every recurring bill and paycheck in one place. Add income and expense sources that repeat monthly or one-time payments for anything that doesn't. Each month view auto-calculates what's paid, what's still due, and your running balance in small summary widgets up top. Items are listed sorted by due date, can be marked paid/unpaid with one tap, and can be given an end date so they quietly drop off once they're no longer relevant. It's a full PWA, installable on any device, and built mobile-first. The UI is designed primarily for phone-sized screens.

[![App Link](https://img.shields.io/badge/App%20Link-payments--manager.sikandar.info-blue)](https://payments-manager.sikandar.info)

## Features
- **Recurring & one-time payments** — track monthly income/expense sources, or add a single one-off payment
- **Month-by-month view** — flip between months; each month recalculates its own totals
- **Live summary widgets** — balance, amount still due, and after-due balance update automatically
- **Mark as paid/unpaid** — one tap to toggle status per item
- **End dates** — set an end date on a recurring item and it stops appearing after that
- **Multi-language infrastructure** — built on [next-international](https://next-international.vercel.app/) with translations synced via [Localazy](https://localazy.com/). The app currently ships English only — a second locale (Urdu) exists but isn't enabled yet, since its translations are incomplete. Translation strings live in [locales/compiled-lang/en/translations.json](locales/compiled-lang/en/translations.json) (and the equivalent `ur/translations.json`), a nested/namespaced JSON keyed by area (`alerts`, `buttons`, `home`, `settings`, etc.) — these files are pulled from Localazy via `npm run localazy:download`. Translation fixes and new languages are welcome via PR: edit/add the relevant `locales/compiled-lang/<lang>/translations.json`, add a thin `locales/<Language>.js` wrapper matching the pattern in [locales/English.js](locales/English.js), then wire it into [locales/client.js](locales/client.js), [locales/server.js](locales/server.js), and the locale list in [middleware.js](middleware.js).
- **Theme switching** — choose from 6 pre-built themes each having their own light/dark modes
- **Installable PWA** — installable like a native app on mobile and desktop

## Tech Stack
- **Framework:** [Next.js](https://nextjs.org/) 14 (App Router), React 18
- **PWA:** [@ducanh2912/next-pwa](https://www.npmjs.com/package/@ducanh2912/next-pwa)
- **UI:** [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/) primitives, [Tailwind CSS](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/), [Lucide](https://lucide.dev/) icons
- **State:** [Zustand](https://github.com/pmndrs/zustand)
- **Forms:** [Formik](https://formik.org/) + [Yup](https://github.com/jquense/yup)
- **Backend/Auth/DB:** [Appwrite](https://appwrite.io/)
- **i18n:** [next-international](https://next-international.vercel.app/), translations synced via [Localazy](https://localazy.com/)
- **Dates:** [date-fns](https://date-fns.org/), [react-day-picker](https://react-day-picker.js.org/)

## Self-Hosting / Local Setup
This app uses [Appwrite](https://appwrite.io/) for auth and data storage. To run your own instance:

1. Create an Appwrite project, then push the included schema with the [Appwrite CLI](https://appwrite.io/docs/tooling/command-line/installation):
   ```bash
   appwrite push databases
   ```
   This creates the `payments-manager` database and its `items` collection from [appwrite.json](appwrite.json).
2. Copy [.env.example](.env.example) to `.env.local` and fill in your Appwrite endpoint, project ID, and API key.
3. Enable the Google OAuth2 provider in your Appwrite project's Auth settings.
4. `npm install` then `npm run dev`.

Note: the `items` collection uses [Appwrite Document Security](https://appwrite.io/docs/products/databases/permissions#document-security) — the collection only grants `create` to authenticated users, and Appwrite auto-grants each document's creator read/update/delete on it. So each user only ever sees their own items.

## Changelog
See [CHANGELOG.md](CHANGELOG.md).

## License
MIT — see [LICENSE](LICENSE). Contributions welcome.
