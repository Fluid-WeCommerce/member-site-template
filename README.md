# Site

A blank Fluid Site: a static Vite and React app that runs on a company's storefront at
`/home/sites/<handle>`, inside the storefront's cart, sign-in and account menu. The guides
are at [docs.fluid.app/sites](https://docs.fluid.app/sites/overview).

## What's in it

| Path                 | What it is                                                                     |
| -------------------- | ------------------------------------------------------------------------------ |
| `src/main.tsx`       | Imports `@fluid-app/sites` once, which connects the site to the storefront     |
| `src/App.tsx`        | The pages, by path: one home page, and a not-found page for any other path     |
| `src/pages/`         | The home page and the not-found page                                           |
| `src/MistMark.tsx`   | The animated Mist mark on the home page (`src/mist-logo.js`). Delete it freely |
| `src/router.ts`      | A small router, with the storefront's Back and Forward, and `src/Link.tsx`     |
| `src/styles.css`     | Plain CSS tokens at the top: the only place a color or size is named           |
| `config/meta.json`   | Titles and descriptions set in code. Empty: the site's SEO settings decide     |
| `vite.config.ts`     | The build, with `fluidSite()`: head tags, `llms.txt` and `sitemap.xml`         |
| `config/access.json` | The Fluid API scopes the site asks for. None                                   |

Search engines and link previews read each page's title, description and image from the
site's SEO settings, set in the admin or through the API. In `config/meta.json`, a page named
in `routeMeta` or `pages` wins over the SEO settings for that page, and `default` fills in what
the SEO settings leave unset. A new site is not indexed by search engines until indexing is
turned on in its SEO settings.

There is no `db/` folder: a new site has no database, and no database billing, until it
adds a table.

## Develop and publish

With the [Fluid CLI](https://docs.fluid.app/sites/quickstart) installed and `fluid login`
done once:

```sh
npm install
fluid sites dev            # runs the site locally, with its database and functions
fluid deploy               # builds, publishes, and prints the site's address
```

Or step by step:

```sh
npm run build              # typechecks, then writes dist/
fluid sites lint           # checks dist/ and config/ against the contracts
fluid sites publish        # uploads only what changed, and makes it live
```

Locally, the database and server functions work, but `fluid.api`, sign-in and the cart
answer only on the published site, opened at its storefront address
([local development](https://docs.fluid.app/sites/local-development)).

## Growing it

- More pages: add a path in `src/App.tsx` and a component in `src/pages/`.
- A database: add `db/schema.json` ([database](https://docs.fluid.app/sites/database)).
- A backend that calls another service with a secret, or runs on a schedule:
  `fluid sites functions new <name>` ([functions](https://docs.fluid.app/sites/functions)).
- The signed-in member's own data: the
  [Member API](https://docs.fluid.app/sites/member-api) through `fluid.api`.

In Mist, ask the agent: it knows each of these.
