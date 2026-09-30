# Upgrade plan

## Current state

Score: 7/10 (was 5/10) — the "playlist" now exists: add/reorder/remove with persisted running order and total time; catalog is still static.

## Backlog

- P1: Let the user add their own track entries (title/artist/duration) to the shelf.
- P1: Export the running order as text/M3U.
- P2: Replace the `--font-geist-mono` CSS reference (font is never loaded) with a loaded mono face or system stack.
- P2: Playwright smoke test for add/reorder/remove.

## Done in this pass

- CI (`.github/workflows/ci.yml`): `npm ci`, lint, typecheck, vitest, `next build` on every push and PR.
- `/api/mcp` uses a typed JSON-RPC handler (`lib/mcp.ts`, tested) with proper error codes and an honest `get_app_info` tool; this fixed the template's lint errors.
- `/more-projects` renders from `lib/related-projects.ts` (was ~980 lines of unrolled links plus an unused data copy) and no longer links to itself; removed the stale `app/page.tsx.backup`.
- Catalog, filtering, durations and playlist editing moved to `lib/playlist.ts` (tested); stored playlists are validated against known track ids.
- New playlist panel: add from the staged card, move up/down, remove, live total duration (`aria-live`), all buttons labelled.
- Mood filter changed from an incomplete `tablist` (no tabpanel) to a pressed-button group; search input is `type=search`.

## Done in this pass (pass 2)

- Canonical host is config-driven: `lib/site.ts` resolves `NEXT_PUBLIC_SITE_URL` (validated, clear error on a non-http(s) value) and feeds `metadataBase`, generated `app/sitemap.ts` / `app/robots.ts` and the MCP `get_app_info` URL; removed the stale template `public/sitemap.xml` / `robots.txt` (they pointed at `bookchaowalit.com` and a `*.vercel.app` name that differs from the project URL). Tested in `lib/site.test.ts`.
