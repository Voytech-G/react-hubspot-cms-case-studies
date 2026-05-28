# react-hubspot-cms-case-studies

Practical case studies for building **custom React modules** in **HubSpot CMS**
(the React + HubL framework), created for the HubSpot Ecosystem Mentorship Program.

Each case study introduces one concept at a time — starting from a simple
presentational module and progressing toward interactive and data-driven modules.

## Tech stack

- **HubSpot CMS React** (`@hubspot/cms-components`) — the React + HubL framework
- **HubSpot Projects** — platform version 2026.3
- **React 18** + **TypeScript**
- **CSS Modules** for component-scoped styles
- **Global design tokens** (`:root` CSS custom properties) in `styles/theme.css`
- **ESLint** + **Prettier** (with `@hubspot/prettier-plugin-hubl`)

## Case studies

| #   | Module                      | Concept                                                                                                                | Status  |
| --- | --------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------- |
| CS1 | FeatureCard                 | Presentational module — typed props, multiple field types, CSS Modules                                                 | Done    |
| CS2 | Accordion / Tabs / Carousel | Interactive modules with Islands (client-side hydration)                                                               | Done    |
| CS3 | Team Directory              | Comparative data fetching — one shared UI, multiple data sources (getServerSideProps, hublDataTemplate, GraphQL/HubDB) | Done    |
| CS4 | CrmContacts                 | Serverless function (`app-function`) — calls HubSpot CRM API with a platform-issued token, fetched from an island       | Done    |

## Project structure

```
src/
├── app/                                # CS4 — wrapper app hosting serverless functions
│   ├── app-hsmeta.json                 # auth (static token, requiredScopes), permittedUrls
│   └── functions/
│       ├── crm-contacts-hsmeta.json    # endpoint config (path, methods)
│       ├── crm-contacts.js             # handler — calls HubSpot CRM API
│       └── package.json                # Node runtime declaration
└── theme/
    ├── theme-hsmeta.json
    └── my-theme/
        ├── components/
        │   ├── modules/
        │   │   ├── GettingStarted/         # Quickstart module
        │   │   ├── FeatureCard/            # CS1 — presentational module
        │   │   ├── Accordion/              # CS2 — interactive island
        │   │   ├── Tabs/                   # CS2 — interactive island
        │   │   ├── Carousel/               # CS2 — interactive island (useEffect)
        │   │   ├── TeamDirectory/          # CS3 — data via getServerSideProps
        │   │   ├── TeamDirectoryHubL/      # CS3 — data via hublDataTemplate
        │   │   ├── TeamDirectoryGraphQL/   # CS3 — data via GraphQL
        │   │   └── CrmContacts/            # CS4 — fetches from a serverless function
        │   └── shared/
        │       └── PeopleGrid/             # Shared presentational component (CS3)
        ├── styles/
        │   └── theme.css                   # Global design tokens (:root variables)
        ├── templates/
        │   ├── layouts/
        │   │   └── base.hubl.html
        │   ├── page.hubl.html
        │   └── showcase.hubl.html          # Drag & drop showcase template
        ├── assets/
        ├── Globals.d.ts                    # Ambient module declarations (*.module.css, *?island)
        ├── theme.json
        └── tsconfig.json
```

Each module folder holds an `index.tsx` (the module shell) plus its co-located
`*.module.css`. Interactive CS2 modules also include a `*Island.tsx` (the hydrated
part) and a `types.ts`. CS3 module shells are thin — they fetch data and hand it
to the shared `PeopleGrid`. CS4 wraps a serverless function in `src/app/` and the
React module is an island that calls it via `/hs/serverless/<endpoint>`.

### CS4 — serverless functions (notes)

The `Case Studies App` is declared in `src/app/app-hsmeta.json` with
`auth.type: "static"` and `requiredScopes: ["crm.objects.contacts.read"]`. After
`hs project upload` the developer installs the app once in the portal; HubSpot
then issues a private-app access token and exposes it to the function as
`process.env.PRIVATE_APP_ACCESS_TOKEN` — no secret is hand-rolled or stored in
`secretKeys`. Outbound calls from the function are restricted to the hosts listed
in `permittedUrls.fetch`.

Public endpoint functions (`endpoint.path` in the function hsmeta) require
**Content Hub Enterprise**. The endpoint is callable from the CMS frontend at
`/hs/serverless/<path>` (no `api/` prefix on platform 2026.03).

### Conventions

- **Scoped styles** live in `*.module.css` files co-located with each module.
- **Global design tokens** live in `styles/theme.css` and are imported per module,
  so every module stays self-contained and previewable in isolation.
- Every module follows the HubSpot CMS React contract — it exports `Component`,
  `fields`, and `meta`.
- Module props are explicitly typed (no `any`); the props type mirrors the
  `fields` definition.
- Interactive modules split into a server-rendered shell and a hydrated
  `*Island.tsx` component, referenced with the `?island` import suffix.
- Reusable presentation lives in `components/shared/`, so several modules can
  feed one UI while swapping only the data layer.

## Local development

Prerequisites: Node.js >= 20 and the HubSpot CLI (`npm install -g @hubspot/cli`)
authenticated against a HubSpot account.

```bash
# install dependencies in the project root
npm install

# install dependencies in the theme
cd src/theme/my-theme
npm install

# start the local CMS dev server (from the theme directory)
npm start
```

The dev server renders modules and templates locally with hot reload. Individual
modules can be previewed in isolation, or as part of a template.

## Deploying

```bash
hs project upload
```

This uploads the project files and triggers a build in the connected HubSpot
account.
