---
title: Image & Visual Guide
---

# Image & Visual Guide

<span class="canon-badge status-editorial">Editorial interface reference</span>

The v0.4 interface automatically reserves visual space throughout the encyclopedia. These placeholders are intentionally visible so articles can be developed now without losing track of future maps, flags, portraits, diagrams, and setting artwork.

## Automatic feature-image positions

Substantive articles receive a compact feature position beside the opening text, similar to a reference thumbnail or Wikipedia infobox image. The placeholder changes according to the page category:

| Article category | Suggested feature visual |
|---|---|
| Polity | Political map, flag, seal, or national panorama |
| War or event | Campaign map, historical artwork, or reconstruction |
| World page | World map, strategic diagram, or geopolitical visualization |
| Language | Script sample, distribution map, or manuscript |
| Place | City plan, regional map, skyline, or landscape |
| Culture | Cultural scene, material object, dress, or regional map |
| Religion | Sacred site, symbol, ritual scene, or religious map |

Each position displays a suggested file path, such as:

```text
assets/images/polities/scandinavia-hero.webp
```

The displayed path is a naming recommendation, not a requirement. Matching folders are already included under `docs/assets/images/` for polities, history, world, languages, places, cultures, religions, and reference visuals.

## Replacing an automatic feature position

1. Save the final image somewhere under `docs/assets/images/`.
2. Add the image directly to the Markdown article, normally beneath the canon badges.
3. Apply the `hfr-feature-image` class.
4. The automatic placeholder will no longer be generated on that page.

Example:

```markdown
![Political map of Scandinavia in 1604 ATL](../assets/images/polities/scandinavia-hero.webp){ .hfr-feature-image }
```

Relative paths vary according to the article's folder depth. Check the live preview after adding an image.


## Current working world map

The current placeholder world map is stored at:

```text
assets/images/world/world-map-1604-current-placeholder.png
```

It is displayed on the homepage and the World in 1604 article. It remains provisional: handwritten borders, polity labels, and unresolved regions should not be treated as final canon merely because they appear visually.

## Visual dossier positions

Articles with a **Canon and source notes** section also receive a three-position visual dossier immediately before that section.

Typical polity positions are:

1. flag or state emblem;
2. political or regional map;
3. capital or defining landscape.

Typical event positions are:

1. campaign or battle map;
2. historical scene or artifact;
3. commander or key participant.

When a curated gallery is ready, add it to the Markdown with the class `hfr-visual-gallery`. The automatic dossier will then disappear.

Example:

```html
<div class="hfr-visual-gallery" markdown>

![Flag](../assets/images/polities/example-flag.webp)
![Map](../assets/images/polities/example-map.webp)
![Capital](../assets/images/places/example-capital.webp)

</div>
```

## Recommended image specifications

| Use | Recommended shape | Suggested minimum size |
|---|---:|---:|
| Feature image | 16:9, 3:2, 4:3, or portrait when appropriate | 1200 pixels on longest side |
| Political map | 16:9, 4:3, or square | 1600 pixels on longest side |
| Flag or seal | Landscape or square | 1000 pixels on longest side |
| Portrait | 4:5 or 3:4 | 1000 × 1250 pixels |
| Gallery image | Flexible | 1200 pixels on longest side |

Use `.webp` for efficient photographic or painted images, `.png` when transparency is important, and `.svg` for flags, symbols, diagrams, and other vector artwork.

## Canon requirements for visuals

Images are part of the encyclopedia's claims and must follow the same canon controls as prose.

- Do not finalize borders that remain TBD.
- Do not depict an unconfirmed ruler, capital, uniform, flag, or religious symbol as settled canon.
- Label speculative reconstructions clearly in the caption.
- Prefer maps with uncertain frontiers visually distinguished from fixed borders.
- Record important visual decisions in the article's change log and canon/source table.
- Current project-chat corrections outrank older visual material just as they outrank older prose.

## Accessibility and captions

Every image must include concise alternative text describing what the image communicates. Captions should identify the subject, date, and canon status when those details matter.

Good example:

```markdown
![Provisional map showing the broad Novgorodian and Poland–Lithuanian division of Livonia after the 1550s war. Exact frontier remains TBD.](../assets/images/history/livonian-partition-provisional.webp){ .hfr-feature-image }
```

## Suggested first visual set

The highest-value starting images are:

- a clean digital redraw of the current provisional political world map of 1604 ATL;
- a North American political map after the First Great Indian War;
- a Baltic settlement map after the Novgorod–Scandinavian Wars;
- flags or seals for the United States, Caesar's Legions, MDE, Novgorod, Scandinavia, and Poland–Lithuania;
- city images for Cahokia, New Vegas, Novgorod, Constantinople, and the Gulf capital region.
