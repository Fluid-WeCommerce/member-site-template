# Site

A blank site: a static Vite and React app that runs on a company's storefront at
`/accounts/<handle>`, inside the storefront's cart, sign-in and account menu. Mist starts
every new member site from this folder (features/member-sites, task 036-7); it is the
content of the `Fluid-WeCommerce/member-site-template` repository.

## What's in it

| Path                 | What it is                                                                       |
| -------------------- | -------------------------------------------------------------------------------- |
| `src/main.tsx`       | Imports `@fluid-app/sites` once, which connects the site to the storefront       |
| `src/App.tsx`        | The pages, by path: one home page, and a not-found page for any other path       |
| `src/MistMark.tsx`   | The animated Mist mark on the home page (`src/mist-logo.js`). Delete it freely   |
| `src/router.ts`      | A small router, with the storefront's Back and Forward, and `src/Link.tsx`       |
| `src/styles.css`     | Plain CSS tokens at the top: the only place a color or size is named             |
| `config/meta.json`   | Each page's title and description, for link previews. Only the home page for now |
| `config/access.json` | The Fluid API scopes the site asks for. None                                     |

There is no `db/` folder: a new site has no database, and no database billing, until it
adds a table.

## Develop and publish

```sh
npm install
npm run build              # typechecks, then writes dist/
fluid sites lint           # checks dist/ and config/ against the contracts
fluid sites publish        # uploads only what changed, and makes it live
```

`npm run dev` serves the app on its own, outside the storefront: the cart and sign-in
answer only once the site is published and opened at its storefront address.

## Growing it

Ask Mist. It knows how to add pages, a shop with add to cart and checkout, storefront links
that keep the visit's credit, database tables, and content that changes for signed-in
members.
