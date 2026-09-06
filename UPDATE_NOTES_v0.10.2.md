# HFR Encyclopedia v0.10.2 — River & Shared-Boundary Rebuild

## Scope

Focused cartographic-engine update. No new lore.

## Rivers

- Natural Earth 1:10m North America rivers are loaded as the primary stationary display layer when the browser has internet access.
- Source `scalerank` controls major/medium/minor rendering.
- The bundled hydrology remains an offline and drag-time fallback.

## Borders

- CL river sections restore unsimplified river-source geometry rather than target node counts.
- USA–Vinland and UTA–アラスカ are converted to shared topology: the visible border is used to partition both countries' fills.
- This should eliminate the prior black-line / wrong-color disagreement on those rebuilt frontiers.
