# HFR Encyclopedia v0.7 — Globe Corrections & Performance

**Date:** 2026-08-21

This release is deliberately limited to refining the existing North America interactive globe. It does not add unrelated setting lore.

## Interaction and performance

- Replaced the v0.6 drag shortcut that hid/froze hydrology during motion.
- Added lightweight drag-time versions of the land, polity, lake, and river datasets.
- Rivers and lakes now redraw continuously while the globe moves.
- Full-detail geometry returns when dragging or wheel zooming stops.
- Globe redraws are throttled with `requestAnimationFrame`.

## Zoom and small-polity visibility

- Increased maximum globe scale from 680 to 2200.
- Increased the New Vegas focus scale to 1550.
- The closer zoom range is intended to support later state/province borders without becoming a street-level map.

## Color revision

- NCR changed from `#C4923B` to brighter California Gold `#D8B04C` so it is easier to distinguish from UTA Prairie Ochre `#AD7C3D`.

## North America geography corrections

- UTA controls the Olympic Peninsula and mainland Pacific coast from the Columbia River mouth to the Skagit River frontier.
- アラスカ retains Vancouver Island and now closes visible western/northern coastal gaps, including Aleutian/northern-Alaska geometry and the Mackenzie-delta-side gap.
- No visible unassigned land gaps remain in the developed northern North America layer at prototype scale.
- Vinland now renders Greenland, Newfoundland, Labrador, and the Scandinavian-controlled Arctic under the Vinland prototype color/control layer.
- USA control is restored along the southern side of the Gulf of St. Lawrence/Gaspé-facing region.
- Cuba is removed from USA political fill.
- The Caesar's Legions–MDE Texas frontier now follows the actual Rio Grande river geometry from the local hydrology dataset rather than an offset approximation.

## Cartographic rule retained

User-supplied coordinates remain control points. The project does not convert control points into arbitrary straight-line borders when local rivers, ridgelines, shorelines, roads, valleys, or other stated geographic features govern the intended frontier.
