# Alex Santana — personal portfolio

This is a static, bilingual portfolio built with React, TypeScript and Vite. It has no backend, CMS or runtime translation: Portuguese and English content live together in typed data structures.

## Run locally

```bash
npm install
npm run dev
npm run build
npm run lint
```

The production build is in `dist/` and can be deployed to Vercel using the default Vite settings (`npm run build`, output `dist`).

## Content maintenance

The page content currently lives in `src/App.tsx` in the `experiences`, `projects`, `labels` and `categoryLabels` records. Every `Copy` value must contain both `pt` and `en` strings. Add an experience to `experiences` with a stable `id`; the timeline renders it automatically. Keep the six university organizations inside the single `university` collective item and add internal entries to its `tags` array.

Add projects to `projects` with one or more `categories` (`software`, `data`, `research`, or `creative`). The filter buttons are generated from these categories. Add an optional `repo` only when a verified destination exists.

The hero currently uses a restrained initials placeholder because the supplied working tree has no image assets. To use the verified portrait, place it at `public/images/alex.jpg` and replace the `.portrait-placeholder` markup in `src/App.tsx` with an `<img>` that has localized alt text. Do not add an image that does not document Alex.

Language selection is persisted in `localStorage` as `alex-lang`, updates `document.documentElement.lang`, and changes the document title without reloading. Theme selection is persisted as `alex-theme`. Update both language versions whenever adding visible copy, including labels and accessible names.

## Deployment

Push changes to GitHub and import the repository in Vercel. Vercel detects Vite automatically; each push to the configured production branch triggers a new deployment. No deployment or external service connection is included in this repository.
