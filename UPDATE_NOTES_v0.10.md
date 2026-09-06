# HFR Encyclopedia v0.10 — North America Precision Cartography

**Date:** 2026-08-21

v0.10 is a focused interactive-globe cartography update. It incorporates the latest user-supplied USA–Vinland, Gulf, Great Lakes, Vinland-island, アラスカ, and UTA control geometry; corrects USA island/state ownership; increases the requested shared-border density to 500+ nodes; and introduces size-weighted river visibility.

## Important implementation rule

User coordinates and named geographic features remain the authoritative anchors. Added intermediate nodes are rendering geometry only and do not create new canon. River-following sections are snapped toward the globe's hydrology dataset; ridge/road/frontier sectors preserve the approved control corridor and are densified rather than treated as new surveyed boundaries.

## Ownership corrections

- Cape Breton Island, Long Island, Florida → United States
- Cuba → politically blank
- Greenland, Newfoundland, Anticosti and approved Arctic islands → Vinland/Scandinavian color
- Iceland → blank
- Pacific ownership updated from the supplied アラスカ and UTA polygons
- Lower Mississippi/New Orleans delta leakage corrected toward Caesar's Legions

## Border precision

The following border renderings now exceed 500 nodes: USA–CL, CL–UTA, CL–Great Basin, MDE–Great Basin, NCR–MDE, UTA–アラスカ, Vinland–アラスカ, UTA–Vinland, USA–Vinland, and USA–Iroquois.

## Rivers

The base hydrology remains subtle. Medium and major river overlays increase visibility according to line prominence while preserving small-river restraint.
