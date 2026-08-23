
# Payments Manager

Payments Manager keeps every recurring bill and paycheck in one place. Add income and expense sources that repeat monthly — or one-time payments for anything that doesn't — and each month view auto-calculates what's paid, what's still due, and your running balance in small summary widgets up top. Items are listed sorted by due date, can be marked paid/unpaid with one tap, and can be given an end date so they quietly drop off once they're no longer relevant. It's a full PWA, installable on any device, and built mobile-first — the UI is designed primarily for phone-sized screens.

[![Demo](https://img.shields.io/badge/demo-pm.sikandar.info-blue)](https://pm.sikandar.info)

## Features
- **Recurring & one-time payments** — track monthly income/expense sources, or add a single one-off payment
- **Month-by-month view** — flip between months; each month recalculates its own totals
- **Live summary widgets** — balance, amount still due, and after-due balance update automatically
- **Mark as paid/unpaid** — one tap to toggle status per item
- **End dates** — set an end date on a recurring item and it stops appearing after that
- **Multi-language** — UI translations managed via Localazy (English, Urdu)
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

## Changelog
See [CHANGELOG.md](CHANGELOG.md).
