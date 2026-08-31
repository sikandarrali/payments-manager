# Graph Report - payments-manager  (2026-09-01)

## Corpus Check
- 150 files · ~58,460 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 674 nodes · 1527 edges · 88 communities (38 shown, 50 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `56a1da2a`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- button.jsx
- workbox-7144475a.js
- utils.js
- AddItemDialog.jsx
- AuthContext.js
- Changelog
- cn
- (authenticated)/page.jsx
- package.json
- Navbar.jsx
- toast.jsx
- components.json
- alert-dialog.jsx
- dependencies
- DarkModeToggle.jsx
- removeExtraSpaces
- manifest.json
- dialog.jsx
- toggle-group.jsx
- CreatedUpdatedBy.jsx
- alert.jsx
- { useI18n, useScopedI18n, I18nProviderClient, useChangeLocale, useCurrentLocale }
- DatePickerWithLabel.jsx
- tabs.jsx
- reusableStyles.js
- .eslintrc.json
- compilerOptions
- postcss.config.mjs
- appwrite
- class-variance-authority
- clsx
- cmdk
- date-fns
- @ducanh2912/next-pwa
- formik
- framer-motion
- js-cookie
- lucide-react
- next
- next.config.mjs
- @next/font
- next-international
- next-themes
- @radix-ui/react-checkbox
- @radix-ui/react-context-menu
- @radix-ui/react-dialog
- @radix-ui/react-dropdown-menu
- @radix-ui/react-icons
- @radix-ui/react-label
- @radix-ui/react-popover
- @radix-ui/react-progress
- @radix-ui/react-select
- @radix-ui/react-separator
- @radix-ui/react-switch
- @radix-ui/react-tabs
- @radix-ui/react-toast
- @radix-ui/react-toggle
- @radix-ui/react-toggle-group
- @radix-ui/react-tooltip
- react
- react-day-picker
- react-dom
- react-number-format
- react-responsive
- react-toastify
- sharp
- sonner
- tailwind-merge
- tailwindcss-animate
- vaul
- yup
- zustand
- tailwind.config.js

## God Nodes (most connected - your core abstractions)
1. `cn()` - 181 edges
2. `Button` - 33 edges
3. `UIText()` - 32 edges
4. `useAuth()` - 30 edges
5. `Changelog` - 28 edges
6. `useData()` - 15 edges
7. `PopoverContent` - 14 edges
8. `StrategyHandler` - 14 edges
9. `removeExtraSpaces()` - 11 edges
10. `Router` - 11 edges

## Surprising Connections (you probably didn't know these)
- `Page()` --calls--> `useAuth()`  [EXTRACTED]
  app/[locale]/(authenticated)/page.jsx → components/contexts/AuthContext.js
- `RootLayout()` --calls--> `cn()`  [EXTRACTED]
  app/[locale]/layout.js → lib/utils.js
- `MenuItem()` --calls--> `cn()`  [EXTRACTED]
  components/nav/Navbar.jsx → lib/utils.js
- `DatePickerWithLabel()` --calls--> `cn()`  [EXTRACTED]
  components/theme/form/DatePickerWithLabel.jsx → lib/utils.js
- `InputFieldWithLabel()` --calls--> `cn()`  [EXTRACTED]
  components/theme/form/InputFieldWithLabel.jsx → lib/utils.js

## Import Cycles
- None detected.

## Communities (88 total, 50 thin omitted)

### Community 0 - "button.jsx"
Cohesion: 0.11
Nodes (26): Page(), Home(), account, teams, CookieBanner(), Homepage(), frameworks, Logo() (+18 more)

### Community 1 - "workbox-7144475a.js"
Cohesion: 0.06
Nodes (15): cacheMatchIgnoreParams(), Deferred, executeQuotaErrorCallbacks(), NetworkFirst, NetworkOnly, TODO: Remove this log message in v4., RegExpRoute, Route (+7 more)

### Community 2 - "utils.js"
Cohesion: 0.09
Nodes (34): Page(), Settings(), AppContext, AppProvider(), useApp(), useAuth(), EditFontSize(), EditLanguage() (+26 more)

### Community 3 - "AddItemDialog.jsx"
Cohesion: 0.08
Nodes (33): databases, collections, db, AddItemDialog(), DeleteItem(), EditItem(), SingleItem(), TypeTabs() (+25 more)

### Community 4 - "AuthContext.js"
Cohesion: 0.07
Nodes (34): APP_OG_IMAGE, fontHeading, fontSans, metadata, RootLayout(), AuthContext, AuthProvider(), fetchGoogleUserData() (+26 more)

### Community 5 - "Changelog"
Cohesion: 0.06
Nodes (34): 1.0.0, 1.1.0, 1.2.0, 1.2.1, 1.3.0, 1.3.1, 1.3.2, 1.3.3 (+26 more)

### Community 6 - "cn"
Cohesion: 0.11
Nodes (25): DeductionDate(), DropdownCurrencySelectFieldWithLabel(), CommandSeparator, CommandShortcut(), ContextMenuCheckboxItem, ContextMenuContent, ContextMenuItem, ContextMenuLabel (+17 more)

### Community 7 - "(authenticated)/page.jsx"
Cohesion: 0.12
Nodes (21): Dashboard(), Page(), client, DataContext, DataProvider(), useData(), MarkAsPaid(), MONTH_NAMES (+13 more)

### Community 8 - "package.json"
Cohesion: 0.08
Nodes (24): dotenv-cli, eslint, eslint-config-next, devDependencies, dotenv-cli, eslint, eslint-config-next, postcss (+16 more)

### Community 9 - "Navbar.jsx"
Cohesion: 0.15
Nodes (16): AppVersion(), MenuItem(), Navbar(), Sidebar(), Badge(), badgeVariants, Separator, SheetContent (+8 more)

### Community 10 - "toast.jsx"
Cohesion: 0.18
Nodes (17): Toast, ToastAction, ToastClose, ToastDescription, ToastTitle, toastVariants, ToastViewport, Toaster() (+9 more)

### Community 11 - "components.json"
Cohesion: 0.14
Nodes (13): aliases, components, utils, rsc, $schema, style, tailwind, baseColor (+5 more)

### Community 12 - "alert-dialog.jsx"
Cohesion: 0.26
Nodes (10): UIDialogFooter(), AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter(), AlertDialogHeader(), AlertDialogOverlay (+2 more)

### Community 13 - "dependencies"
Cohesion: 0.15
Nodes (13): axios, holy-loader, node-appwrite, dependencies, axios, holy-loader, node-appwrite, @radix-ui/react-accordion (+5 more)

### Community 14 - "DarkModeToggle.jsx"
Cohesion: 0.20
Nodes (10): modes, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut() (+2 more)

### Community 15 - "removeExtraSpaces"
Cohesion: 0.32
Nodes (6): DiarySchema, PageSchema, ProfileSchema, RecordSchema, removeExtraSpaces(), SearchSchema

### Community 16 - "manifest.json"
Cohesion: 0.22
Nodes (8): background_color, display, icons, name, orientation, short_name, start_url, theme_color

### Community 17 - "dialog.jsx"
Cohesion: 0.29
Nodes (6): DialogContent, DialogDescription, DialogFooter(), DialogHeader(), DialogOverlay, DialogTitle

### Community 18 - "toggle-group.jsx"
Cohesion: 0.43
Nodes (5): ToggleGroup, ToggleGroupContext, ToggleGroupItem, Toggle, toggleVariants

### Community 19 - "CreatedUpdatedBy.jsx"
Cohesion: 0.53
Nodes (3): AccordionContent, AccordionItem, AccordionTrigger

### Community 20 - "alert.jsx"
Cohesion: 0.50
Nodes (4): Alert, AlertDescription, AlertTitle, alertVariants

### Community 23 - "tabs.jsx"
Cohesion: 0.50
Nodes (3): TabsContent, TabsList, TabsTrigger

### Community 24 - "reusableStyles.js"
Cohesion: 0.50
Nodes (3): SheetStylesFixedHeight, SheetStylesFlexibleHeight, SheetStylesMAxHeight90

## Knowledge Gaps
- **153 isolated node(s):** `extends`, `next/core-web-vitals`, `fontSans`, `fontHeading`, `APP_OG_IMAGE` (+148 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **50 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `cn` to `button.jsx`, `utils.js`, `AddItemDialog.jsx`, `AuthContext.js`, `(authenticated)/page.jsx`, `Navbar.jsx`, `toast.jsx`, `alert-dialog.jsx`, `DarkModeToggle.jsx`, `dialog.jsx`, `toggle-group.jsx`, `CreatedUpdatedBy.jsx`, `alert.jsx`, `DatePickerWithLabel.jsx`, `tabs.jsx`?**
  _High betweenness centrality (0.175) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `package.json`, `appwrite`, `class-variance-authority`, `clsx`, `cmdk`, `date-fns`, `@ducanh2912/next-pwa`, `formik`, `framer-motion`, `js-cookie`, `lucide-react`, `next`, `@next/font`, `next-international`, `next-themes`, `@radix-ui/react-checkbox`, `@radix-ui/react-context-menu`, `@radix-ui/react-dialog`, `@radix-ui/react-dropdown-menu`, `@radix-ui/react-icons`, `@radix-ui/react-label`, `@radix-ui/react-popover`, `@radix-ui/react-progress`, `@radix-ui/react-select`, `@radix-ui/react-separator`, `@radix-ui/react-switch`, `@radix-ui/react-tabs`, `@radix-ui/react-toast`, `@radix-ui/react-toggle`, `@radix-ui/react-toggle-group`, `@radix-ui/react-tooltip`, `react`, `react-day-picker`, `react-dom`, `react-number-format`, `react-responsive`, `react-toastify`, `sharp`, `sonner`, `tailwind-merge`, `tailwindcss-animate`, `vaul`, `yup`, `zustand`?**
  _High betweenness centrality (0.032) - this node is a cross-community bridge._
- **What connects `extends`, `next/core-web-vitals`, `fontSans` to the rest of the system?**
  _153 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `button.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.11048951048951049 - nodes in this community are weakly interconnected._
- **Should `workbox-7144475a.js` be split into smaller, more focused modules?**
  _Cohesion score 0.06328320802005012 - nodes in this community are weakly interconnected._
- **Should `utils.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08521870286576169 - nodes in this community are weakly interconnected._
- **Should `AddItemDialog.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08078231292517007 - nodes in this community are weakly interconnected._