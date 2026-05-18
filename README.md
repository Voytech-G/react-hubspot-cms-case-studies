# react-hubspot-cms-case-studies

Practical case studies for building **custom React modules** in **HubSpot CMS**
(the React + HubL framework), created for the HubSpot Ecosystem Mentorship Program.

Each case study introduces one concept at a time — starting from a simple
presentational module and progressing toward interactive and data-driven modules.

## Tech stack

- **HubSpot CMS React** (`@hubspot/cms-components`) — the React + HubL framework
- **HubSpot Projects** — platform version 2025.2
- **React 18** + **TypeScript**
- **CSS Modules** for component-scoped styles
- **Global design tokens** (`:root` CSS custom properties) in `styles/theme.css`
- **ESLint** + **Prettier** (with `@hubspot/prettier-plugin-hubl`)

## Case studies

| #   | Module                      | Concept                                                              | Status  |
| --- | --------------------------- | -------------------------------------------------------------------- | ------- |
| CS1 | FeatureCard                 | Presentational module — typed props, multiple field types, CSS Modules | Done    |
| CS2 | Accordion / Tabs / Carousel | Interactive modules with Islands (client-side hydration)             | Done    |
| CS3 | HubDB module                | Dynamic content sourced from a HubDB table                           | Planned |
| CS4 | API module                  | External data via HubSpot serverless functions                       | Planned |

## Project structure

```
src/theme/
├── theme-hsmeta.json
└── my-theme/
    ├── components/
    │   └── modules/
    │       ├── GettingStarted/        # Quickstart module (typed props)
    │       │   ├── index.tsx
    │       │   └── GettingStarted.module.css
    │       └── FeatureCard/           # CS1 — presentational module
    │           ├── index.tsx
    │           └── FeatureCard.module.css
    ├── styles/
    │   └── theme.css                  # Global design tokens (:root variables)
    ├── templates/
    │   ├── layouts/base.hubl.html
    │   ├── page.hubl.html
    │   └── showcase.hubl.html         # Drag & drop template for showcasing modules
    ├── assets/
    └── theme.json
```

### Conventions

- **Scoped styles** live in `*.module.css` files co-located with each module.
- **Global design tokens** live in `styles/theme.css` and are imported per module,
  so every module stays self-contained and previewable in isolation.
- Every module follows the HubSpot CMS React contract — it exports `Component`,
  `fields`, and `meta`.
- Module props are explicitly typed (no `any`); the props type mirrors the
  `fields` definition.

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
