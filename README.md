# Alex Santana — portfolio

A static, bilingual portfolio built with React, TypeScript, and Vite. Content is maintained in the source tree; there is no backend, CMS, or runtime translation. Portuguese and English copy are authored separately.

## Run locally

```sh
npm install
npm run dev
npm run build
npm run lint
```

Vite serves the site locally. The production output is written to `dist/`.

## Update content

The page data is split between `src/content.ts` and `src/App.tsx`:

- `src/App.tsx` holds bilingual interface text in `pt-BR` and `en`. Add or update both values together.
- `highlights` in `src/content.ts` contains the three separately expandable entries: Síntese Jr., PET-SI, and Claude Campus Ambassador.
- `organizations` contains the six independent expanders nested inside one university timeline entry. Keep them in this array so they remain one outer timeline block.
- `projects` is the project catalog. Each project has bilingual copy, categories, stack labels, and a verified repository URL. The project category type also lives in this file.

Each content item has a stable `id` (experiences) or `name` (projects). Experience details are revealed inline. Dates and roles currently say “to be confirmed” because no CV or first-party career document was present in the supplied project materials. Replace them only after checking a reliable source. Keep both language versions current.

## Images, CV, and public links

No personal photo or CV was included in the project. The hero uses an abstract monogram composition, not a generated portrait. If Alex supplies a photograph, put it under `public/images/` and use a localized alternative text. Add a CV link only after placing a confirmed, current document in `public/`.

The public GitHub and LinkedIn URLs are in `src/App.tsx`. The verified projects currently linked are DaSIboard and ModaLoop. Other project leads mentioned in the brief should be inspected and documented before being added. The research section records only the broad topic given in the brief and explicitly flags the details awaiting confirmation.

## Language and theme

The language selector changes all authored UI copy without reloading, updates the document `lang`, title, description, and saves the preference in local storage. Theme selection is also saved; first visit follows the operating system color preference. The shared design tokens live in `src/styles/tokens.css`; responsive layout and reduced-motion rules are in `src/styles/pro.css`.

## Publish with GitHub and Vercel

Connect this repository to a Vercel project. Vercel detects Vite automatically; use `npm run build` as the build command and `dist` as the output directory. Pushing updates to the configured production branch triggers a deployment. A canonical URL is intentionally omitted until the final domain is known.
