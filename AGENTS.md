# AGENTS.md - Quiniela Mundial 2026

## Quick Start

```bash
npm run dev      # Start dev server (http://localhost:5173)
npm run build    # Production build
npm run deploy   # Build + deploy to gh-pages
```

## Architecture

**Stack**: Vite 8 + React 19 + CSS (no framework). **No backend** - all data in `localStorage`.

### Directory Structure

```
src/
├── App.jsx                    # Main app, routing via state (grupos/ranking/eliminatorias)
├── main.jsx                   # Entry point, imports design-system CSS
├── data/
│   ├── groups.js              # 12 groups (A-L), 72 matches, official FIFA data (CEST times)
│   └── knockout.js            # 31 knockout matches, bracket structure, round labels
├── utils/
│   ├── share.js               # URL encoding (pako gzip + base64), export JSON/CSV
│   ├── users.js               # localStorage user management, ranking calculation
│   └── knockout.js            # Group standings, bracket resolution, knockout points
├── components/                # ShareModal, UserNameModal
├── pages/
│   ├── GroupsPage.jsx         # Group selector + GroupView
│   ├── GroupView.jsx          # Standings table + MatchCards per date
│   ├── RankingPage.jsx        # User ranking with medals (top 3)
│   ├── UserPredictions.jsx    # View another user's predictions
│   └── EliminatoriasPage.jsx  # Knockout bracket view with predictions
└── design-system/             # Custom design system (no UI library)
    ├── tokens/                # CSS variables: colors, spacing, typography, effects
    ├── components/            # Button, Input, Card, Badge, Modal, Tabs, Table, Avatar
    ├── domain/                # MatchCard, StandingsTable, BracketView, GroupCard, EliminatoriasPage
    └── layout/                # Layout, Header, Main, Footer, PageHeader, Grid
```

### Key Data Flow

1. **Predictions**: Stored per-user in `localStorage` key `quiniela-users` (includes group + knockout predictions)
2. **Results**: Stored in `localStorage` keys `quiniela-mundial-2026-results` (groups) and `quiniela-mundial-2026-knockout-results` (knockout)
3. **Current user**: `localStorage` key `quiniela-current-user`
4. **Sharing**: Predictions encoded via `pako.gzip()` → base64 → URL param `?user=Name&data=...`
5. **Ranking**: Calculated from predictions vs results (groups: 10/7/3pts, knockout: 15/10/5pts)

### Important Conventions

- **All times in CEST** (Europe Central). Match dates/times in `data/groups.js` are authoritative.
- **Match IDs**: lowercase letter + number (e.g., `a1`, `b6`, `l6`). Used as keys everywhere.
- **Team codes**: ISO country codes (e.g., `mx`, `us`, `br`). Flags from `flagcdn.com/w40/{code}.png`.
- **Design system**: CSS-only components with `ds-` prefix. No Tailwind, no UI library.
- **No router**: Navigation via `activePage` state in `App.jsx` (`grupos`, `ranking`, `eliminatorias`, `user-predictions`).
- **Knockout bracket**: 31 matches (16 round of 32, 8 round of 16, 4 quarters, 2 semis, 3rd place, final)

### Deploy

- **gh-pages** branch, base path `/Quiniela_mundial_2026/` (case-sensitive, matches repo name).
- `npm run deploy` runs `predeploy` (build) then `gh-pages -d dist`.
- Live URL: `https://RafaVazquezSilva.github.io/Quiniela_mundial_2026/`

### Testing

No test framework configured. Manual testing via:
1. Admin panel → enter group results → verify standings and knockout bracket
2. Admin panel → enter knockout results → verify bracket progression
3. Make predictions → verify points calculation in ranking
4. Share link → open in new tab → verify import works

### Common Pitfalls

- **URL sharing fails**: Check `pako` is installed. Encoding uses `pako.gzip()` + `btoa()`.
- **Ranking shows 0 points**: Results must be entered via Admin panel first. Predictions alone don't generate points.
- **Deploy 404s**: `vite.config.js` `base` must match repo name exactly (`/Quiniela_mundial_2026/`).
- **localStorage cleared**: All user data is client-side only. No server backup.

### Adding New Features

- **New page**: Add to `App.jsx` routing, add nav link in `navLinks` array.
- **New component**: Place in `src/design-system/components/` (base) or `src/design-system/domain/` (business logic).
- **New data**: Update `src/data/groups.js`. Match IDs must be unique across all groups.
- **New export format**: Add function to `src/utils/share.js`, add button to `ShareModal.jsx`.
