# Member site template

A member site: a static Vite and React app that runs on a company's storefront at
`/accounts/<handle>`, inside the storefront's cart, sign-in and account menu. It is the
template Mist builds a new member site from. Mist copies it once to start a project; Fluid
stores only what you publish, not this source.

## What's in it

| Path                 | What it is                                                                                                                                                                                       |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `src/`               | The app: a home page, a shop that adds to the storefront's cart, and a guestbook in the site's own database                                                                                      |
| `src/products.ts`    | The variants the shop recommends. Put your company's variant ids here                                                                                                                            |
| `src/styles.css`     | Plain CSS tokens at the top: the only place a color or size is named                                                                                                                             |
| `db/schema.json`     | The site's database: one `guestbook` table signed-in members read and write. Every row carries `created_by`, the writer's user id, so a table a guest can read (`public`) shows it to guests too |
| `config/meta.json`   | Each page's title, description and image, for link previews                                                                                                                                      |
| `config/access.json` | The Fluid API scopes the site asks for. None                                                                                                                                                     |

## Develop and publish

```sh
npm install
npm run build              # typechecks, then writes dist/
fluid sites lint           # checks dist/, db/ and config/ against the contracts
fluid sites publish        # uploads only what changed, and makes it live
```

`npm run dev` serves the app on its own, outside the storefront: the cart and the database
answer only once the site is published and opened at its storefront address.

## The SDK

`@fluid-app/sites` is imported once, in `src/main.tsx`, and is also at `window.fluid`:

- `fluid.cart.add([{ variant_id, quantity }])`, `.open()`, `.checkout()`: the storefront's
  FairShare cart, run in the storefront's page, not in the site's frame.
- `fluid.db.from("guestbook").select(...)` and `.insert(...)`: the site's database, under
  the rules in `db/schema.json`.
- `fluid.storefront.url("/shop")`: a storefront address that keeps the visit's credit. Use
  it in a plain `<a href>`; the frame cannot move the storefront's window by script.
- `fluid.history.onGo(...)`: Back and Forward for the router in `src/router.ts`.

Inside the Fluid monorepo, `vite.config.ts` builds against the SDK's source; anywhere else
it uses the published package. There, run `npx vite build`: the typecheck in `npm run build`
looks for the installed package.
