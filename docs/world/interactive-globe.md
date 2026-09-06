---
title: Interactive Globe
---

<span class="hfr-eyebrow">Experimental atlas · shared-boundary + continuous-river rebuild</span>

# Interactive Globe

Explore the political geography of **1604 ATL** as a movable globe. This first prototype focuses on North America and the Scandinavian Arctic while leaving undeveloped regions politically blank.

<div class="hfr-globe-shell" id="hfr-globe" data-hfr-globe>
  <div class="hfr-globe-toolbar" aria-label="Globe controls">
    <div class="hfr-globe-toolbar__group">
      <label for="hfr-globe-jump">Focus</label>
      <select id="hfr-globe-jump">
        <option value="north-america">North America</option>
        <option value="usa">United States</option>
        <option value="cl">Caesar's Legions</option>
        <option value="uta">United Tribes of America</option>
        <option value="iroquois">Iroquois Confederacy</option>
        <option value="vinland">Vinland</option>
        <option value="alaska">アラスカ</option>
        <option value="ncr">New California Republic</option>
        <option value="mde">Mexica Double Eagle Empire</option>
        <option value="new-vegas">New Vegas</option>
        <option value="great-basin">Great Basin Mosaic</option>
      </select>
    </div>
    <div class="hfr-globe-toolbar__group hfr-globe-toolbar__buttons">
      <button type="button" class="md-button" id="hfr-globe-zoom-in" aria-label="Zoom in">+</button>
      <button type="button" class="md-button" id="hfr-globe-zoom-out" aria-label="Zoom out">−</button>
      <button type="button" class="md-button" id="hfr-globe-reset">Reset view</button>
    </div>
    <div class="hfr-globe-toolbar__group hfr-globe-toolbar__toggles">
      <label><input type="checkbox" id="hfr-globe-labels" checked> Labels</label>
      <label><input type="checkbox" id="hfr-globe-rivers" checked> Rivers</label>
      <label><input type="checkbox" id="hfr-globe-provisional" checked> Provisional lines</label>
    </div>
  </div>

  <div class="hfr-globe-layout">
    <div class="hfr-globe-stage" id="hfr-globe-stage" aria-label="Interactive political globe of How Few Remain in 1604 ATL">
      <div class="hfr-globe-loading" id="hfr-globe-loading">Preparing political globe…</div>
    </div>

    <aside class="hfr-globe-panel" id="hfr-globe-panel" aria-live="polite">
      <span class="hfr-globe-panel__eyebrow">Atlas dossier</span>
      <h2 id="hfr-globe-panel-title">North America · 1604 ATL</h2>
      <p id="hfr-globe-panel-copy">Drag the globe to rotate it. Scroll or use the zoom controls to move from continental views into much closer regional views. The increased zoom range is intended to support future state/provincial borders and makes small polities such as New Vegas easier to inspect. Select a colored polity for its encyclopedia link and map status.</p>
      <div class="hfr-globe-panel__status" id="hfr-globe-panel-status">Prototype geometry</div>
      <a class="md-button md-button--primary hfr-globe-panel__link" id="hfr-globe-panel-link" href="#" hidden>Open article</a>
    </aside>
  </div>

  <div class="hfr-globe-legend" aria-label="Map legend">
    <span><i class="hfr-globe-legend__solid"></i> Confirmed political frontier</span>
    <span><i class="hfr-globe-legend__loose"></i> Loose Great Basin frontier</span>
    <span><i class="hfr-globe-legend__dash"></i> Deliberately unresolved frontier</span>
    <span><i class="hfr-globe-legend__fragmented"></i> Great Basin Mosaic · fragmented / internally unmapped</span>
    <span><i class="hfr-globe-legend__blank"></i> Undeveloped / unmapped land</span>
  </div>
</div>


!!! info "v0.10.1 cartographic architecture test"
    **Caesar’s Legions is the first polity rebuilt with a shared-boundary model.** Its maroon political fill is generated from the same USA, UTA, Great Basin, MDE, and Gulf perimeter used by the visible border lines. This version deliberately does **not** attempt the later USA–Vinland or UTA–アラスカ rebuild yet; those will use the same method only after the CL geometry is visually approved.


!!! info "v0.10.2 river + shared-boundary rebuild"
    The globe now uses **Natural Earth 1:10m ranked river geometry as its primary display layer when online**, with the bundled vector network as an offline/drag-time fallback. Caesar’s Legions restores unsimplified river-following geometry on its river sectors, while **USA–Vinland** and **UTA–アラスカ** now use one shared border to partition both neighboring country fills. This is the architectural fix for the earlier problem where a black border could move without the country colors moving with it.


!!! info "v0.10.3 Iroquois + river-system rebuild"
    **USA–Iroquois** now uses true shared topology: the same approved frontier divides the two political fills, including the Great Lakes water boundary. The river display has also been simplified to Natural Earth’s **1:50m base network** rather than the much denser North America supplement. A named river now receives one consistent importance class along its entire mapped course, and smaller rivers appear only at closer zoom levels.


!!! info "v0.10.4 — Shared geographic frontiers"
    This patch preserves the approved North American border routes while making the map use them consistently. Explicit river-frontier sections now render from the exact political-border geometry, and neighboring fills are locally repartitioned against those same lines. The cleaner v0.10.3 Natural Earth river hierarchy is unchanged.


!!! info "v0.10.5 — Border & selection polish"
    No border geometry changes in this patch. **Every political frontier now renders black**, including river-frontier overlays, so a blue river cannot visually overwrite an international boundary. Clicking a country now brightens that polity, gently mutes neighboring political fills, and redraws the selected country's complete perimeter above the other map layers with a thicker black stroke.


!!! info "v0.10.6 — Final globe cleanup"
    The accidental disconnected UTA fragments north of the Colorado system have been removed and their Great Basin holes closed; New Vegas remains untouched. Dragging and wheel-zooming now enter a temporary lightweight rendering mode that uses simplified polity/lake geometry and hides secondary overlays until motion stops, reducing interaction lag without lowering the resting map's fidelity.

!!! warning "Prototype geometry — not a replacement for canon notes"
    The globe uses the border decisions established in the project as its political basis. User-supplied coordinates are treated as **control points rather than straight-line vertices**, and named rivers, ridgelines, roads, coastlines, and other geographic features govern the intended path. This first implementation uses prototype-resolution interpolation between some named anchors; those technical interpolations are **not new canon** and can be refined without changing the approved border concept.

## Current coverage

The prototype currently colors the **United States, Caesar's Legions, Mexica Double Eagle Empire, United Tribes of America, Iroquois Confederacy, New California Republic, New Vegas, Vinland (including Greenland, Newfoundland, Labrador, and the Scandinavian-controlled Arctic shown under the Vinland color for now), and Japanese アラスカ**. The **Great Basin Mosaic** now uses a muted beige-gray regional fill so it is visually distinct from neighboring states while still representing a fragmented political zone whose internal Indigenous polities have not yet been individually mapped.

The MDE's southern frontier is shown as a **dashed approximate line** around the northern Nicaraguan mountain zone. Central America south of that line, the Caribbean, South America, most of Africa, and other undeveloped regions remain politically blank.

## Cartographic principles

- No satellite or terrain imagery is used.
- Political colors are part of each polity's visual identity.
- Major rivers and lakes remain visible over political fills, with larger river systems rendered more prominently than smaller tributaries.
- The globe still avoids street-level zoom, while the current prototype permits close regional inspection so future state/provincial boundaries and small polities can be legible.
- Confirmed islands and colonial possessions are retained where visible at this scale.
- An unresolved border should never become solid merely because a technically convenient line can be drawn.

## Prototype color key

| Polity | Map color |
|---|---|
| United States | Atlantic Steel Blue |
| Caesar's Legions | Imperial Maroon |
| Mexica Double Eagle Empire | Mexican Green |
| United Tribes of America | Prairie Ochre |
| Iroquois Confederacy | Wampum Purple |
| New California Republic | Brighter California Gold |
| New Vegas | Vegas Teal |
| Vinland / Scandinavian Arctic | Vinland Blue-Gray |
| アラスカ | Japanese Imperial Red |
| Great Basin Mosaic | Muted beige-gray |


### Hydrology source

The primary online display uses Natural Earth’s **1:50m base Rivers + Lake Centerlines dataset**, filtered to North America and rivers only. The map normalizes visual importance by the river's full name, so different source segments of the Mississippi, St. Lawrence, Mackenzie, and other systems do not independently change thickness or disappear. Major rivers are visible at continental scale, medium rivers appear at regional scale, and minor rivers appear only when zoomed closer.
