# HFR Encyclopedia v0.10.1 — Shared-Boundary Cartography Test

## Scope

This release intentionally rebuilds **Caesar’s Legions only** as the first shared-topology test for the interactive globe.

## Cartographic engine change

- CL’s political fill is derived from the exact same perimeter geometry used by its visible international borders.
- The USA, UTA, Great Basin, and MDE fills are clipped against that perimeter, eliminating the previous architecture where a border line could move without its underlying country color.
- No arbitrary node quota is used. River-heavy sections retain the bends required by the source geometry; ridgeline, road, and connector sectors are simplified to meaningful control points.
- The v0.10 CL densification experiment is discarded.

## Rivers

HydroRIVERS has been selected as the target river-data model for the next hydrology pass because it contains river order and long-term discharge attributes. The whole river layer is **not** swapped in v0.10.1; this version first tests the shared-boundary architecture on CL.

## Not yet rebuilt

- USA–Vinland
- UTA–アラスカ
- broader Great Lakes / St. Lawrence topology
- continent-wide river styling

These should be converted only after the CL test is visually approved.
