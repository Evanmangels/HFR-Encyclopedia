# How Few Remain Encyclopedia

**Current encyclopedia version: v0.10.8**

A private, Markdown-based canon encyclopedia built with MkDocs and Material for MkDocs.

## Windows: first launch

1. Extract the project folder.
2. Double-click `setup_and_run.bat`.
3. Windows may ask for permission to run the script. The script creates a local Python environment, installs the free dependencies, and opens the site at `http://127.0.0.1:8000`.
4. Keep the command window open while using the live preview. Press `Ctrl+C` there to stop it.

After the first setup, double-click `run_site.bat`.

## macOS or Linux

Open a terminal in this folder and run:

```bash
chmod +x setup_and_run.sh
./setup_and_run.sh
```

## Editing

Articles are ordinary Markdown files inside `docs/`. Save a change while the preview server is running and the browser refreshes automatically.

Start with:

- `docs/reference/canon-guide.md`
- `docs/reference/how-to-edit.md`
- `docs/reference/image-guide.md`
- `docs/templates/`

## Build a standalone copy

Windows: double-click `build_site.bat`.

Any platform:

```bash
.venv/bin/mkdocs build --strict
```

The generated static website will appear in `site/`.

## GitHub Pages

A deployment workflow is included at `.github/workflows/deploy-pages.yml`. After placing the project in a GitHub repository, set **Settings → Pages → Source** to **GitHub Actions**. Each push to `main` will then rebuild the site.


## Latest release notes

See `UPDATE_NOTES_v0.10.8.md` for the current Caesar's Legions article expansion. It rebuilds CL as a full Gulf-Roman national dossier while preserving the stable v0.10.6 globe geometry. Earlier release notes remain available alongside it.


## v0.5 layout correction

Article visuals now sit above their fact-summary infoboxes inside a single responsive sidebar, preventing overview text from becoming unreadably narrow.


## v0.6 Interactive Globe

The World section now includes an **Interactive Globe** prototype focused on North America. Run the site through MkDocs (rather than opening Markdown or HTML files directly) so the local GeoJSON layers can load correctly.




## v0.10.1 North America precision cartography

v0.10.1 incorporates the latest user-supplied USA–Vinland, Gulf, Pacific, Great Lakes, Vinland-island, アラスカ, and UTA control polygons. Shared borders named by the user as river/ridgeline corridors are rendered with 500+ nodes, and river visibility now uses minor/medium/major stroke hierarchy.

## v0.10.1 Globe visibility hotfix

v0.10.1 corrects a reversed spherical polygon fragment that caused Vinland's blue-gray fill to cover almost the entire globe. It also adds a runtime winding sanity check so malformed micro-polygons cannot create another full-globe color wash. No lore or border definitions changed in this release.

## v0.8 Precision globe pass

v0.8 keeps full political/land geometry mounted during interaction, increases the zoom ceiling, promotes the Interactive Globe to top-level navigation, colors the Great Basin Mosaic, and substantially densifies/fits CL and Vinland-related frontiers to the specified rivers, ridgelines, and geographic corridors.

## v0.7 Globe correction pass

v0.7 keeps the North America prototype focused on the existing map work while improving continuous drag rendering, deeper zoom, NCR/UTA color separation, and the territorial corrections supplied after the first globe review.
