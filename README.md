# Alex Santana — portfolio

A static, bilingual portfolio built with React, TypeScript, and Vite. Portuguese and English copy are authored separately. There is no backend, CMS, or runtime translation.

## Run locally

```sh
npm install
npm run dev
npm run build
npm run lint
```

The production site is written to `dist/`. Vercel is configured by `vercel.json` to build with Vite, serve `dist`, and route SPA paths to `index.html`.

## Content files

- `src/App.tsx` contains the interface translations, layout, and interactions. Keep labels, button text, accessibility text, and metadata in both `pt-BR` and `en`.
- `src/content.ts` contains experiences, organizations, project records, research information, skills, awards, and certificates. Content records with `Copy` values must include both languages.
- `src/styles/tokens.css` contains the shared light and dark design tokens. Responsive styles and media presentation are in `src/styles/pro.css`.

### Experiences and timeline

`highlights` stores the three outer entries for Claude Campus Ambassador, Síntese Jr., and PET-SI. Each record has `sortKey` as `YYYYMM`, bilingual role, period, summary, details, and optional `logo` and `photo` paths. Keep this list in descending `sortKey` order.

The six university organizations live in `organizations` and appear inside exactly one outer timeline block. Each organization can expand independently. The interface sorts the inner list by each record’s start month. Add new photos and logos to `public/images/experiences/` or `public/images/organizations/`, then set the explicit `/images/...` path in the record. `photo.alt` also needs Portuguese and English text. Logos are separate from photos; keep logo alt text empty where the adjacent organization name already identifies it.

To add an organization, append an `Entry` to `organizations`; do not add another outer timeline entry. For roles that changed over time within the same organization, keep the full date range and describe both roles in the role and details fields.

### Projects and research

Add projects to `projects` with a stable name, Portuguese and English descriptions, categories, technologies, and a verified repository URL. Filters derive from the category type; if adding a category, update the filter labels in `App.tsx` in both languages.

The `research` record contains the project title, date, group, advisor, summary, method, tools, and status. Update each bilingual field when the source information changes. Do not add unpublished results as findings.

### Profile media and résumé

The hero portrait is `public/images/profile/alex-santana.jpg`. Replace it with an authorized portrait and preserve its explicit path. Experience photos and organization logos are in their respective `public/images/` folders. The résumé download is `public/documents/CV.pdf`; replace it with a current copy when needed. The current PDF is in English, so the website labels it accordingly. The PDF is publicly accessible with the site.

Public profile links and email are in `src/App.tsx`. The phone number is not displayed as website text.

## Publish with GitHub and Vercel

Connect this repository to a Vercel project and use the repository root as the project root. `vercel.json` sets the Vite framework, `npm run build`, and `dist` as the output directory. Pushes to the configured production branch trigger deployments. Confirm that the Vercel project's Root Directory points to the repository root if a deployment does not use this configuration.
