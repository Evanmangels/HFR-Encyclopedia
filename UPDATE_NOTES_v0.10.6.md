# HFR Encyclopedia v0.10.6

## Final Globe Cleanup

This patch makes two tightly scoped globe changes before article work resumes.

### UTA / Great Basin cleanup
- Removed the three tiny disconnected UTA polygon fragments north of the Colorado system that were artifacts of earlier polygon repartitioning.
- Closed the corresponding accidental holes in the Great Basin polygon.
- Preserved New Vegas as the one intentional Great Basin hole.
- No established border-line geometry was moved.

### Interaction performance
- Added a lightweight interaction mode for drag and wheel zoom.
- During motion, polity and lake layers use their bundled simplified geometry.
- Projection precision temporarily relaxes from 0.35 to 1.05 while moving.
- Heavy secondary layers (rivers, explicit borders, hydro-border overlays, labels, islands, graticule, and selection outline) are temporarily suppressed during motion.
- Full-detail rendering returns immediately after dragging stops or wheel zoom settles.
- Country fill strokes remain visible during movement, so political geography remains readable.

### Unchanged
- All established frontier lines except the removal of the accidental UTA fragments.
- Black political-border styling from v0.10.5.
- Selected-country appearance at rest.
- River hierarchy and political colors.
- Encyclopedia article content.
