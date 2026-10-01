# Upgrade plan

## Current state

Score: 7/10 (was 5/10) — the "playlist" now exists: add/reorder/remove with persisted running order and total time; catalog is still static.

## Backlog

- P1: Let the user add their own track entries (title/artist/duration) to the shelf.
- P2: M3U export once tracks carry a real media URL (an M3U without paths would be misleading).
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
- "Copy running order" exports the playlist as numbered plain text with durations and total (`playlistText` in `lib/playlist.ts`, tested); clipboard result announced via `role="status"`; visible focus on shelf buttons.

## Done in this pass (pass 3)
- Edge-case pass on `lib/playlist.ts` (regression tests in `lib/playlist.test.ts`):
  - `parseDuration` used `Number()` per field, so `0x1:00` / `1e1:00` / `:30`
    parsed as durations and `3:75` overflowed silently. It now accepts only
    ASCII digits with 00-59 minute/second fields.
  - `formatDuration` printed `NaN:NaN`, negative or fractional seconds; it now
    floors and clamps to `0:00`.
- Security deps: `next` 16.1.6 -> 16.3.8 (and `eslint-config-next`) clears critical GHSA-2xp9-vwfh-vxw4 (Image Optimization RCE) plus bundled postcss/sharp highs; lockfile regenerated with same-major `npm audit fix`. `npm audit --omit=dev`: C1/H3/M1/L0 [nanoid:h,next:c,postcss:h,sharp:h] -> C0/H0/M0/L0.
