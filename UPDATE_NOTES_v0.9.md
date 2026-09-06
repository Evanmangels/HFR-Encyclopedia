# HFR Encyclopedia v0.9 — Globe Visibility Hotfix

**Date:** 2026-08-21

v0.9 is an emergency rendering-only correction. No HFR lore, political borders, or territorial decisions were changed.

## Fixed

- Corrected a tiny reversed Vinland polygon component introduced during the v0.8 precision pass.
- In D3 v3's spherical renderer, the reversed ring was interpreted as the globe-sized complement of the tiny intended polygon, causing Vinland's blue-gray/teal fill to cover nearly the entire sphere.
- Restored normal separation between ocean, neutral land, Great Basin fill, and individual country colors.

## Safeguard

- Added a pre-render spherical-winding validator for political GeoJSON.
- Polygon components whose calculated spherical area is impossibly larger than a hemisphere are automatically reversed before rendering.
- The guard is applied to both full and lightweight political datasets.

## Scope

This hotfix intentionally postpones further border refinement until the globe is visibly stable in local preview.
