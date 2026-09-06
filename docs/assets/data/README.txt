HFR v0.8 Interactive Globe data

- world-land.geojson: real-world coastline/land reference geometry for rendering context.
- north-america-lakes.geojson: real geographic lake geometry.
- north-america-rivers.geojson: real geographic river geometry.
- hfr-na-polities.geojson: prototype HFR 1604 ATL political polygons derived from approved border anchors and corridors.
- hfr-na-borders.geojson: confirmed, loose, provisional, and geometry-review border paths.
- hfr-na-globe-meta.json: labels and small-island ownership markers.

- world-land-fast.geojson: simplified drag-time land geometry for continuous interaction.
- hfr-na-polities-fast.geojson: simplified drag-time HFR polity geometry.
- north-america-lakes-fast.geojson: simplified drag-time lakes.
- north-america-rivers-fast.geojson: simplified drag-time hydrology so rivers rotate continuously with the globe.

IMPORTANT: HFR coordinate sequences are control points, not a command to connect points with simplistic straight lines. Named rivers, ridgelines, roads, shorelines, and other geographic features govern the intended border. Some interpolation between named anchors remains prototype-resolution and is not new canon.


v0.8 keeps the full land and political fill geometry mounted during interaction and swaps only hydrology to lighter drag-time geometry. This prevents ocean-color projection artifacts while preserving continuous river/lake movement. Border geometry for CL, Vinland, the Great Lakes, and northern frontiers is also substantially denser and more closely fitted to the stated rivers/ridgelines.


v0.10: precision coastline/island assignments, user-supplied USA–Vinland and Great Lakes control chains, 500+ node shared-border upgrades, and medium/major river overlay files. User control points remain canon anchors; interpolated/snap points are cartographic implementation only.


v0.10.1 shared-topology test:
- Caesar’s Legions political fill is constructed directly from the same international-boundary lines used for rendering.
- v0.10 target-node densification is not used for CL.
- The continental river-display replacement is intentionally deferred until the shared-topology CL test is visually approved.


v0.10.2:
- CL river-following segments preserve unsimplified stable hydrographic geometry.
- USA–Vinland and UTA–アラスカ political fills are partitioned by their exact visible shared-border line.
- Natural Earth 1:10m rivers are the primary online stationary display; bundled local hydrology remains fallback/drag-time.


v0.10.3:
- USA–Iroquois converted to shared topology.
- River display switches to Natural Earth 1:50m base network, with consistent name-level visual classification and zoom-based disclosure.
- Dense local minor fallback is suppressed; bundled major/medium layers remain as offline fallback.
