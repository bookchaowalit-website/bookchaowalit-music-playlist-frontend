# Music Playlist

Track list with moods.

## Features
- Search and mood filter over a small curated shelf
- Stage a track, add it to your playlist, reorder or remove it
- Running order and total duration saved in localStorage

## Limitations
- Static demo content; no audio stream or music provider is attached

## Run
```bash
npm install
npm run dev
```

## Honesty
Portfolio demo. Not multi-tenant SaaS. Prefer local-only state over fake production claims.

## Checks

```bash
npm ci
npm run lint
npm run typecheck
npm test
npm run build
```

CI runs the same checks on every push (`.github/workflows/ci.yml`).
