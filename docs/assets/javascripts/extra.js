(() => {
  const VERSION = "v0.10.8";

  const pageProfiles = {
    polity: {
      label: "Polity dossier",
      icon: "⚑",
      feature: "Future political map, flag, seal, or national panorama",
      gallery: ["Flag or state emblem", "Political or regional map", "Capital or defining landscape"]
    },
    event: {
      label: "Historical event file",
      icon: "⚔",
      feature: "Future campaign map, historical artwork, or event reconstruction",
      gallery: ["Campaign or battle map", "Historical scene or artifact", "Commander or key participant"]
    },
    history: {
      label: "Historical archive",
      icon: "⌛",
      feature: "Future timeline artwork, historical map, or archival montage",
      gallery: ["Period map", "Primary-source style image", "Key person or institution"]
    },
    world: {
      label: "World atlas",
      icon: "◎",
      feature: "Future world map, strategic diagram, or geopolitical visualization",
      gallery: ["Political map", "Trade or infrastructure map", "Regional comparison"]
    },
    language: {
      label: "Language record",
      icon: "A",
      feature: "Future script sample, language map, or annotated manuscript",
      gallery: ["Writing sample", "Distribution map", "Pronunciation or grammar graphic"]
    },
    place: {
      label: "Atlas gazetteer",
      icon: "⌖",
      feature: "Future city plan, regional map, skyline, or landscape",
      gallery: ["Regional map", "City plan or streetscape", "Landmark or infrastructure"]
    },
    culture: {
      label: "Cultural record",
      icon: "◇",
      feature: "Future cultural scene, material object, dress, or regional map",
      gallery: ["People or dress", "Material culture", "Cultural region map"]
    },
    religion: {
      label: "Religious record",
      icon: "✦",
      feature: "Future sacred site, symbol, ritual scene, or religious map",
      gallery: ["Sacred symbol", "Ritual or institution", "Religious geography"]
    },
    reference: {
      label: "Editorial reference",
      icon: "§",
      feature: "Future workflow diagram, canon chart, or reference graphic",
      gallery: ["Process diagram", "Status key", "Reference example"]
    }
  };

  function classifyPage(pathname) {
    const path = pathname.toLowerCase();
    if (path.includes("/polities/")) return "polity";
    if (path.includes("/history/events/")) return "event";
    if (path.includes("/history/")) return "history";
    if (path.includes("/world/")) return "world";
    if (path.includes("/languages/")) return "language";
    if (path.includes("/places/")) return "place";
    if (path.includes("/cultures/")) return "culture";
    if (path.includes("/religions/")) return "religion";
    if (path.includes("/reference/") || path.includes("/templates/")) return "reference";
    return null;
  }

  function slugFromPath(pathname) {
    const cleaned = pathname.replace(/\/$/, "");
    const last = cleaned.split("/").pop() || "index";
    return last.replace(/\.html$/, "") || "index";
  }

  function assetFolder(type) {
    if (type === "event" || type === "history") return "history";
    if (type === "language") return "languages";
    if (type === "place") return "places";
    if (type === "culture") return "cultures";
    if (type === "religion") return "religions";
    if (type === "world") return "world";
    if (type === "reference") return "reference";
    return "polities";
  }

  function addProgressBar() {
    if (document.querySelector(".hfr-reading-progress")) return;
    const bar = document.createElement("div");
    bar.className = "hfr-reading-progress";
    bar.setAttribute("aria-hidden", "true");
    document.body.appendChild(bar);

    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(100, Math.max(0, (window.scrollY / max) * 100)) : 0;
      bar.style.width = `${progress}%`;
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
  }

  function addKicker(content, profile) {
    if (content.querySelector(".hfr-page-kicker") || content.querySelector(".hfr-home-hero")) return;
    const h1 = content.querySelector("h1");
    if (!h1) return;
    const kicker = document.createElement("div");
    kicker.className = "hfr-page-kicker";
    kicker.textContent = profile.label;
    h1.insertAdjacentElement("beforebegin", kicker);
  }

  function featureAnchor(content, h1) {
    let anchor = h1;
    const badges = [...content.querySelectorAll(".canon-badge")];
    if (badges.length) {
      const finalBadge = badges[badges.length - 1];
      const parent = finalBadge.parentElement;
      anchor = parent && parent.tagName === "P" ? parent : finalBadge;
    }
    return anchor;
  }

  function addFeatureSlot(content, type, profile, slug) {
    if (content.querySelector(".hfr-globe-shell")) return;
    if (
      content.querySelector(".hfr-feature-slot") ||
      content.querySelector(".hfr-feature-image") ||
      content.querySelector(".hfr-home-hero") ||
      type === "reference" ||
      slug === "index"
    ) return;

    const h1 = content.querySelector("h1");
    if (!h1) return;
    const folder = assetFolder(type);
    const path = `assets/images/${folder}/${slug}-hero.webp`;

    const figure = document.createElement("figure");
    figure.className = "hfr-feature-slot";
    figure.setAttribute("role", "img");
    figure.setAttribute("aria-label", `Image placeholder: ${profile.feature}`);
    figure.innerHTML = `
      <figcaption class="hfr-feature-slot__content">
        <span class="hfr-feature-slot__icon"><span>${profile.icon}</span></span>
        <span class="hfr-feature-slot__title">Visual archive awaiting illustration</span>
        <span class="hfr-feature-slot__description">${profile.feature}. Replace this automatic slot when canon artwork or cartography is ready.</span>
        <span class="hfr-feature-slot__path">${path}</span>
      </figcaption>`;

    featureAnchor(content, h1).insertAdjacentElement("afterend", figure);
  }

  function arrangeArticleAside(content) {
    const infobox = content.querySelector(".hfr-infobox");
    const feature = content.querySelector(
      ".hfr-feature-slot, img.hfr-feature-image, figure.hfr-feature-image, .hfr-wiki-figure"
    );

    if (!infobox || !feature) return;

    let stack = content.querySelector(".hfr-article-aside");
    if (!stack) {
      stack = document.createElement("div");
      stack.className = "hfr-article-aside";
      stack.setAttribute("aria-label", "Article image and fact summary");
      infobox.insertAdjacentElement("beforebegin", stack);
    }

    if (feature.parentElement !== stack) stack.appendChild(feature);
    if (infobox.parentElement !== stack) stack.appendChild(infobox);
  }

  function addVisualDossier(content, type, profile) {
    if (content.querySelector(".hfr-globe-shell")) return;
    if (
      content.querySelector(".hfr-visual-dossier") ||
      content.querySelector(".hfr-visual-gallery") ||
      content.querySelector(".hfr-home-hero") ||
      type === "reference"
    ) return;

    const headings = [...content.querySelectorAll("h2")];
    const canonHeading = headings.find((h) => /canon and source notes/i.test(h.textContent || ""));
    if (!canonHeading) return;

    const section = document.createElement("section");
    section.className = "hfr-visual-dossier";
    section.setAttribute("aria-label", "Future image placeholders");
    section.innerHTML = `
      <div class="hfr-visual-dossier__heading">
        <span>Future visual dossier</span>
        <span>Three reserved image positions</span>
      </div>
      <div class="hfr-visual-dossier__grid">
        ${profile.gallery.map((item, index) => `
          <div class="hfr-visual-card">
            <span>
              <strong>${item}</strong>
              <small>Reserved visual ${index + 1}</small>
            </span>
          </div>`).join("")}
      </div>`;
    canonHeading.insertAdjacentElement("beforebegin", section);
  }

  function addFooterVersion() {
    const footer = document.querySelector(".md-footer-meta__inner");
    if (!footer || footer.querySelector(".hfr-footer-version")) return;
    const version = document.createElement("span");
    version.className = "hfr-footer-version";
    version.textContent = `Encyclopedia ${VERSION}`;
    footer.appendChild(version);
  }

  function randomArticleCandidates() {
    const current = new URL(window.location.href);
    const seen = new Set();
    const excludedLabels = new Set([
      "Home", "Browse Polities", "Event Index", "Language Index",
      "Places", "Peoples & Cultures", "Religions", "Templates Overview"
    ]);
    return [...document.querySelectorAll(".md-nav__link[href]")]
      .map((link) => ({ link, url: new URL(link.href, window.location.href) }))
      .filter(({ link }) => !excludedLabels.has((link.textContent || "").trim()))
      .filter(({ url }) => url.origin === current.origin)
      .filter(({ url }) => url.pathname !== current.pathname || url.search !== current.search)
      .filter(({ url }) => !url.hash)
      .filter(({ url }) => {
        const key = `${url.pathname}${url.search}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .map(({ url }) => url.href);
  }

  function openRandomArticle(event) {
    if (event) event.preventDefault();
    const candidates = randomArticleCandidates();
    if (!candidates.length) return;
    const choice = candidates[Math.floor(Math.random() * candidates.length)];
    window.location.assign(choice);
  }

  function addRandomArticleControl() {
    const header = document.querySelector(".md-header__inner");
    if (header && !header.querySelector(".hfr-random-button")) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "hfr-random-button";
      button.title = "Open a random encyclopedia article";
      button.setAttribute("aria-label", "Open a random encyclopedia article");
      button.innerHTML = '<span class="hfr-random-button__icon" aria-hidden="true">⤨</span><span class="hfr-random-button__label">Random article</span>';
      button.addEventListener("click", openRandomArticle);
      const searchToggle = header.querySelector('label[for="__search"]');
      header.insertBefore(button, searchToggle || null);
    }

    document.querySelectorAll(".hfr-random-trigger").forEach((trigger) => {
      if (trigger.dataset.hfrRandomBound === "true") return;
      trigger.dataset.hfrRandomBound = "true";
      trigger.addEventListener("click", openRandomArticle);
    });
  }



  function initHfrGlobe() {
    const root = document.querySelector("[data-hfr-globe]");
    if (!root || root.dataset.hfrGlobeReady === "true") return;
    root.dataset.hfrGlobeReady = "true";

    const stage = root.querySelector("#hfr-globe-stage");
    const loading = root.querySelector("#hfr-globe-loading");
    const panelTitle = root.querySelector("#hfr-globe-panel-title");
    const panelCopy = root.querySelector("#hfr-globe-panel-copy");
    const panelStatus = root.querySelector("#hfr-globe-panel-status");
    const panelLink = root.querySelector("#hfr-globe-panel-link");
    if (!stage || typeof window.d3 === "undefined") {
      if (loading) loading.textContent = "Globe library unavailable. The atlas data remains available in the map registry.";
      return;
    }

    const d3 = window.d3;
    const script = [...document.scripts].find((item) => /assets\/javascripts\/extra\.js(?:\?|$)/.test(item.src));
    const assetBase = script ? new URL("../data/", script.src) : new URL("../../assets/data/", window.location.href);
    const url = (name) => new URL(name, assetBase).href;

    function loadJson(name) {
      return new Promise((resolve, reject) => {
        d3.json(url(name), (error, data) => error ? reject(error) : resolve(data));
      });
    }

    const NATURAL_EARTH_RIVERS_URL = "https://cdn.jsdelivr.net/gh/nvkelso/natural-earth-vector@ca96624a56bd078437bca8184e78163e5039ad19/geojson/ne_50m_rivers_lake_centerlines.geojson";

    function loadNaturalEarthRivers() {
      if (!window.fetch) return Promise.reject(new Error("fetch unavailable"));
      return fetch(NATURAL_EARTH_RIVERS_URL, {mode: "cors"}).then((response) => {
        if (!response.ok) throw new Error(`Natural Earth rivers HTTP ${response.status}`);
        return response.json();
      });
    }

    const HFR_MAJOR_RIVERS = new Set([
      "mississippi","missouri","st lawrence","mackenzie","yukon","rio grande",
      "colorado","columbia","fraser","ohio","nelson","saskatchewan"
    ]);
    const HFR_MEDIUM_RIVERS = new Set([
      "arkansas","red","tennessee","cumberland","ottawa","athabasca","slave",
      "liard","peace","platte","republican","susquehanna","delaware","hudson",
      "connecticut","savannah","alabama","mobile","pearl"
    ]);

    function normalizeRiverName(value) {
      let name = String(value || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      name = name.replace(/saint/g, "st").replace(/[^a-z0-9]+/g, " ").trim();
      const aliases = {
        "st lawrence river": "st lawrence", "st laurent": "st lawrence", "fleuve st laurent": "st lawrence",
        "rio bravo": "rio grande", "rio bravo del norte": "rio grande",
        "mackenzie river": "mackenzie", "mississippi river": "mississippi", "missouri river": "missouri",
        "colorado river": "colorado", "columbia river": "columbia", "fraser river": "fraser",
        "ohio river": "ohio", "yukon river": "yukon", "pearl river": "pearl"
      };
      return aliases[name] || name.replace(/ river$/, "");
    }

    function featureTouchesNorthAmerica(feature) {
      const geometry = feature && feature.geometry;
      if (!geometry) return false;
      let hit = false;
      const visit = (coords) => {
        if (hit || !coords) return;
        if (typeof coords[0] === "number") {
          const lon = +coords[0], lat = +coords[1];
          if (((lon >= -170 && lon <= -50) || lon >= 170) && lat >= 15 && lat <= 85) hit = true;
          return;
        }
        coords.forEach(visit);
      };
      visit(geometry.coordinates);
      return hit;
    }

    function classifyNaturalEarthRivers(fc) {
      const candidates = (fc.features || []).filter((feature) => {
        const p = feature.properties || {};
        return p.featurecla === "River" && featureTouchesNorthAmerica(feature) && normalizeRiverName(p.name_en || p.name || p.name_alt);
      });

      // Natural Earth can split one named river into several features with different
      // local ranks. Compute one best rank for the whole named system so the river
      // never becomes thick/thin or visible/invisible halfway along its course.
      const bestRank = new Map();
      candidates.forEach((feature) => {
        const p = feature.properties || {};
        const key = normalizeRiverName(p.name_en || p.name || p.name_alt);
        const rank = Number.isFinite(+p.scalerank) ? +p.scalerank : 8;
        bestRank.set(key, Math.min(bestRank.has(key) ? bestRank.get(key) : 99, rank));
      });

      const groups = {major: [], medium: [], minor: []};
      candidates.forEach((feature) => {
        const p = feature.properties || {};
        const key = normalizeRiverName(p.name_en || p.name || p.name_alt);
        const rank = bestRank.get(key) ?? 8;
        if (HFR_MAJOR_RIVERS.has(key) || rank <= 2) groups.major.push(feature);
        else if (HFR_MEDIUM_RIVERS.has(key) || rank <= 4) groups.medium.push(feature);
        else if (rank <= 6) groups.minor.push(feature);
      });
      return {
        major: {type: "FeatureCollection", features: groups.major},
        medium: {type: "FeatureCollection", features: groups.medium},
        minor: {type: "FeatureCollection", features: groups.minor}
      };
    }

    // D3 v3 uses spherical ring winding to decide whether a polygon means the
    // small enclosed region or its globe-sized complement. A tiny reversed
    // island fragment can therefore paint almost the entire sphere with one
    // polity color. Normalize any impossible (> hemisphere) component before
    // it reaches the renderer so a bad micro-polygon can never wash out the map.
    function normalizeSphericalPolygonWinding(featureCollection) {
      if (!featureCollection || !featureCollection.features) return featureCollection;
      const hemisphere = 2 * Math.PI;
      featureCollection.features.forEach((feature) => {
        if (!feature || !feature.geometry) return;
        const geometry = feature.geometry;
        const normalizePolygon = (polygon) => {
          const area = d3.geo.area({type: "Polygon", coordinates: polygon});
          if (area > hemisphere) {
            polygon.forEach((ring) => ring.reverse());
          }
        };
        if (geometry.type === "Polygon") normalizePolygon(geometry.coordinates);
        if (geometry.type === "MultiPolygon") geometry.coordinates.forEach(normalizePolygon);
      });
      return featureCollection;
    }

    const WIDTH = 960;
    const HEIGHT = 650;
    let scale = 286;
    const projection = d3.geo.orthographic()
      .translate([WIDTH / 2, HEIGHT / 2])
      .scale(scale)
      .clipAngle(90)
      .precision(0.35)
      .rotate([101, -43, 0]);
    const path = d3.geo.path().projection(projection);
    const graticule = d3.geo.graticule().step([15, 15]);

    const svg = d3.select(stage).append("svg")
      .attr("viewBox", `0 0 ${WIDTH} ${HEIGHT}`)
      .attr("role", "img")
      .attr("aria-label", "Movable political globe showing the developed North American states of How Few Remain in 1604 ATL");

    const ocean = svg.append("path").datum({type: "Sphere"}).attr("class", "hfr-globe-ocean");
    const graticulePath = svg.append("path").datum(graticule()).attr("class", "hfr-globe-graticule");
    const landPath = svg.append("path").attr("class", "hfr-globe-land");
    const polityGroup = svg.append("g").attr("class", "hfr-globe-polities");
    const lakePath = svg.append("path").attr("class", "hfr-globe-lakes");
    const riverGroup = svg.append("g").attr("class", "hfr-globe-rivers-group");
    const riverPath = riverGroup.append("path").attr("class", "hfr-globe-rivers hfr-globe-rivers--minor");
    const riverMediumPath = riverGroup.append("path").attr("class", "hfr-globe-rivers hfr-globe-rivers--medium");
    const riverMajorPath = riverGroup.append("path").attr("class", "hfr-globe-rivers hfr-globe-rivers--major");
    const borderGroup = svg.append("g").attr("class", "hfr-globe-borders");
    const hydroBorderGroup = svg.append("g").attr("class", "hfr-globe-hydro-borders");
    // Selection outline sits above every political/river-border layer so interior frontiers
    // remain unmistakable while the selected country keeps a black boundary.
    const selectionGroup = svg.append("g").attr("class", "hfr-globe-selection");
    const selectionOutline = selectionGroup.append("path")
      .attr("class", "hfr-globe-selection-outline")
      .style("display", "none");
    const islandGroup = svg.append("g").attr("class", "hfr-globe-islands");
    const labelGroup = svg.append("g").attr("class", "hfr-globe-labels");

    let land, polities, lakes, rivers, riversMedium, riversMajor, borders, hydroBorders, meta;
    let landFast, politiesFast, lakesFast, riversFast;
    let naturalEarthRivers = null;
    let usingFastGeometry = false;
    let interactionActive = false;
    let renderQueued = false;
    let politySelection, borderSelection, hydroBorderSelection, labelSelection, islandSelection;
    let selectedId = null;

    const summaries = {
      usa: "Principal Atlantic Roman-successor state of eastern North America. Its prototype polygon follows the confirmed CL, UTA, Iroquois, Vinland, Great Lakes, St. Lawrence, and island decisions.",
      cl: "Gulf and interior Roman-American successor state. The boundary follows the Pearl/Mississippi system, Ozarks, Missouri–Republican corridor, Rocky Mountain interfaces, and Rio Grande frontier.",
      uta: "Large Indigenous interior power stretching from the Great Lakes and Missouri system to the Pacific Northwest and northern interior. Several Basin-facing sectors are intentionally loose frontiers.",
      iroquois: "Great Lakes and St. Lawrence Indigenous power. The prototype preserves the supplied northeastern control-point chain, Great Lakes hydrography, Drummond Island, and UTA/Vinland junctions.",
      vinland: "Scandinavian North Atlantic colony extending through the Hudson Bay and Arctic system. Greenland and some Arctic possessions share its prototype color even where administration remains TBD.",
      alaska: "Japanese colony アラスカ. It controls territory west of the Skagit–Fraser–Liard/Mackenzie frontier, including Vancouver Island, and does not border the NCR.",
      ncr: "Pacific successor state controlling California, the southern Columbia frontier, the Sierra-facing edge of the Great Basin, and northern Baja north of the MDE frontier.",
      mde: "Mexica great power centered on Mesoamerica and the Southwest marches. Its northern and western frontiers are established; its southern Nicaraguan-zone frontier remains deliberately approximate.",
      "new-vegas": "Independent Mojave city-state. The displayed perimeter uses the supplied New Vegas coordinate loop and is intended to follow surrounding ridgelines and Colorado River geography at finer resolution.",
      "great-basin": "Fragmented Indigenous political region. It now uses a muted beige-gray regional fill while its internal states and mobile zones of control remain individually unmapped.",
    };

    const focus = {
      "north-america": {lon: -101, lat: 43, scale: 286},
      usa: {lon: -79, lat: 38, scale: 370},
      cl: {lon: -99, lat: 33, scale: 385},
      uta: {lon: -106, lat: 47, scale: 335},
      iroquois: {lon: -79, lat: 45, scale: 470},
      vinland: {lon: -78, lat: 58, scale: 315},
      alaska: {lon: -137, lat: 59, scale: 330},
      ncr: {lon: -120, lat: 38, scale: 455},
      mde: {lon: -102, lat: 24, scale: 365},
      "new-vegas": {lon: -115.15, lat: 36.1, scale: 3400},
      "great-basin": {lon: -115, lat: 40.5, scale: 455}
    };

    function frontFacing(lon, lat) {
      const r = projection.rotate();
      const center = [-r[0], -r[1]];
      return d3.geo.distance([lon, lat], center) < Math.PI / 2;
    }

    function setGeometryDetail(fast) {
      if (!land || !polities || !lakes || !rivers) return;
      // v0.10.6 interaction mode: use the already-bundled simplified polity/lake
      // geometry while the globe is moving, then snap back to full fidelity at rest.
      // Both polity datasets are normalized for D3 spherical winding before use.
      usingFastGeometry = Boolean(fast && lakesFast && politiesFast);
      landPath.datum(land);
      lakePath.datum(usingFastGeometry ? lakesFast : lakes);
      if (naturalEarthRivers) {
        riverPath.datum(rivers);
        riverMediumPath.datum(riversMedium);
        riverMajorPath.datum(riversMajor);
      } else {
        riverPath.datum({type: "FeatureCollection", features: []});
        riverMediumPath.datum(riversMedium);
        riverMajorPath.datum(riversMajor);
      }
      if (politySelection) {
        politySelection.data((usingFastGeometry ? politiesFast : polities).features);
      }
    }

    function setInteractionMode(active) {
      interactionActive = Boolean(active);
      root.classList.toggle("is-interacting", interactionActive);
      projection.precision(interactionActive ? 1.05 : 0.35);
      setGeometryDetail(interactionActive);
    }

    function updateRiverVisibility() {
      // Progressive disclosure: a clean continental map first, more hydrography only when useful.
      riverMajorPath.style("display", null);
      riverMediumPath.style("display", scale >= 330 ? null : "none");
      riverPath.style("display", scale >= 850 ? null : "none");
    }

    function redraw() {
      // While dragging/zooming, redraw only the layers needed to perceive motion.
      // Heavy borders, hydrography, labels, islands, selection outlines, and the
      // graticule stay hidden until interaction ends, greatly reducing path work.
      ocean.attr("d", path);
      if (land) landPath.attr("d", path);
      if (lakes) lakePath.attr("d", path);
      if (politySelection) politySelection.attr("d", path);
      if (interactionActive) return;

      updateRiverVisibility();
      graticulePath.attr("d", path);
      if (rivers) riverPath.attr("d", path);
      if (riversMedium) riverMediumPath.attr("d", path);
      if (riversMajor) riverMajorPath.attr("d", path);
      if (borderSelection) borderSelection.attr("d", path);
      if (hydroBorderSelection) hydroBorderSelection.attr("d", path);
      if (selectedId && selectionOutline) selectionOutline.attr("d", path);
      if (labelSelection) {
        labelSelection
          .attr("transform", (d) => {
            const p = projection([d.lon, d.lat]);
            return p ? `translate(${p[0]},${p[1]})` : "translate(-1000,-1000)";
          })
          .style("display", (d) => frontFacing(d.lon, d.lat) ? null : "none");
      }
      if (islandSelection) {
        islandSelection
          .attr("cx", (d) => { const p = projection([d.lon, d.lat]); return p ? p[0] : -1000; })
          .attr("cy", (d) => { const p = projection([d.lon, d.lat]); return p ? p[1] : -1000; })
          .style("display", (d) => frontFacing(d.lon, d.lat) ? null : "none");
      }
    }

    function scheduleRedraw() {
      if (renderQueued) return;
      renderQueued = true;
      window.requestAnimationFrame(() => {
        renderQueued = false;
        redraw();
      });
    }

    function setSelectedPolity(id) {
      selectedId = id || null;
      const feature = selectedId && polities
        ? polities.features.find((x) => x.properties.id === selectedId)
        : null;

      if (politySelection) {
        politySelection
          .classed("is-selected", (x) => Boolean(feature) && x.properties.id === selectedId)
          .classed("is-dimmed", (x) => Boolean(feature) && x.properties.id !== selectedId && !x.properties.unfilled);
      }

      polityGroup.classed("has-selection", Boolean(feature));

      if (feature) {
        selectionOutline
          .datum(feature)
          .attr("d", path)
          .style("display", null);
      } else {
        selectionOutline.style("display", "none");
      }
    }

    function updatePanel(d) {
      const p = d.properties || d;
      const id = p.id || null;
      setSelectedPolity(id);
      panelTitle.textContent = p.name || "North America · 1604 ATL";
      panelCopy.textContent = summaries[id] || p.summary || "Political geography in the current HFR prototype.";
      panelStatus.textContent = p.status || "Prototype geometry";
      if (p.article) {
        panelLink.hidden = false;
        panelLink.href = new URL(p.article, window.location.href).href;
        panelLink.textContent = "Open encyclopedia article";
      } else {
        panelLink.hidden = true;
      }
    }

    function focusOn(key) {
      const f = focus[key] || focus["north-america"];
      setInteractionMode(false);
      scale = f.scale;
      projection.scale(scale).rotate([-f.lon, -f.lat, 0]);
      redraw();
      const feature = polities && polities.features.find((x) => x.properties.id === key);
      if (feature) updatePanel(feature);
      else if (key === "north-america") {
        setSelectedPolity(null);
        panelTitle.textContent = "North America · 1604 ATL";
        panelCopy.textContent = "Drag the globe to rotate it. Scroll or use the zoom controls to move from continental views into closer regional views. Select a colored polity for its encyclopedia link and map status.";
        panelStatus.textContent = "Prototype geometry";
        panelLink.hidden = true;
      }
    }

    const MIN_SCALE = 220;
    const MAX_SCALE = 5600;

    const drag = d3.behavior.drag()
      .on("dragstart", () => {
        setInteractionMode(true);
        redraw();
      })
      .on("drag", () => {
        const r = projection.rotate();
        const sensitivity = 72 / projection.scale();
        projection.rotate([r[0] + d3.event.dx * sensitivity, Math.max(-89, Math.min(89, r[1] - d3.event.dy * sensitivity)), r[2]]);
        scheduleRedraw();
      })
      .on("dragend", () => {
        setInteractionMode(false);
        redraw();
      });
    svg.call(drag);

    let wheelTimer = null;
    svg.on("wheel", () => {
      if (d3.event && d3.event.preventDefault) d3.event.preventDefault();
      const direction = d3.event.deltaY < 0 ? 1.10 : 0.91;
      scale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, scale * direction));
      projection.scale(scale);
      setInteractionMode(true);
      scheduleRedraw();
      if (wheelTimer) window.clearTimeout(wheelTimer);
      wheelTimer = window.setTimeout(() => {
        setInteractionMode(false);
        redraw();
      }, 120);
    });

    Promise.all([
      loadJson("world-land.geojson"),
      loadJson("hfr-na-polities.geojson"),
      loadJson("north-america-lakes.geojson"),
      loadJson("north-america-rivers.geojson"),
      loadJson("north-america-rivers-medium.geojson"),
      loadJson("north-america-rivers-major.geojson"),
      loadJson("hfr-na-borders.geojson"),
      loadJson("hfr-na-hydro-borders.geojson"),
      loadJson("hfr-na-globe-meta.json"),
      loadJson("world-land-fast.geojson"),
      loadJson("hfr-na-polities-fast.geojson"),
      loadJson("north-america-lakes-fast.geojson"),
      loadJson("north-america-rivers-fast.geojson")
    ]).then((data) => {
      [land, polities, lakes, rivers, riversMedium, riversMajor, borders, hydroBorders, meta, landFast, politiesFast, lakesFast, riversFast] = data;
      // v0.10.3 intentionally suppresses the dense local minor-river layer. The bundled
      // major/medium sets remain as a clean offline fallback until the 1:50m base loads.
      rivers = {type: "FeatureCollection", features: []};
      normalizeSphericalPolygonWinding(polities);
      normalizeSphericalPolygonWinding(politiesFast);
      riverMediumPath.datum(riversMedium);
      riverMajorPath.datum(riversMajor);
      setGeometryDetail(false);

      // Upgrade the globe to Natural Earth 1:50m base rivers when online.
      // The bundled layer remains the drag-time/offline fallback, so globe interaction never depends on the network.
      loadNaturalEarthRivers().then((remoteRivers) => {
        naturalEarthRivers = classifyNaturalEarthRivers(remoteRivers);
        rivers = naturalEarthRivers.minor;
        riversMedium = naturalEarthRivers.medium;
        riversMajor = naturalEarthRivers.major;
        riverMediumPath.datum(riversMedium);
        riverMajorPath.datum(riversMajor);
        setInteractionMode(false);
        redraw();
        root.dataset.hfrRiverSource = "natural-earth-50m-base";
      }).catch((error) => {
        console.warn("Natural Earth 50m river upgrade unavailable; using curated bundled fallback", error);
        root.dataset.hfrRiverSource = "bundled-fallback";
      });

      politySelection = polityGroup.selectAll("path")
        .data(polities.features)
        .enter().append("path")
        .attr("class", (d) => `hfr-globe-polity${d.properties.unfilled ? " hfr-globe-polity--unfilled" : ""}`)
        .style("fill", (d) => d.properties.unfilled ? "rgba(255,255,255,0.002)" : d.properties.color)
        .style("opacity", (d) => d.properties.unfilled ? 1 : 0.94)
        .on("click", function(d) { updatePanel(d); d3.event.stopPropagation(); })
        .on("dblclick", function(d) {
          if (focus[d.properties.id]) focusOn(d.properties.id);
          d3.event.stopPropagation();
        });
      politySelection.append("title").text((d) => `${d.properties.name} — ${d.properties.status}`);

      borderSelection = borderGroup.selectAll("path")
        .data(borders.features)
        .enter().append("path")
        .attr("class", (d) => {
          const status = (d.properties.status || "").toLowerCase();
          if (status.includes("topology")) return "hfr-globe-border hfr-globe-border--review";
          if (d.properties.dash) return "hfr-globe-border hfr-globe-border--provisional";
          if (status.includes("loose") || status.includes("broad")) return "hfr-globe-border hfr-globe-border--loose";
          return "hfr-globe-border";
        });

      hydroBorderSelection = hydroBorderGroup.selectAll("path")
        .data((hydroBorders && hydroBorders.features) || [])
        .enter().append("path")
        .attr("class", "hfr-globe-hydro-border");
      hydroBorderSelection.append("title").text((d) => `${d.properties.feature} — international river frontier`);

      labelSelection = labelGroup.selectAll("text")
        .data(meta.labels)
        .enter().append("text")
        .attr("class", (d) => `hfr-globe-label${d.status === "unfilled" ? " hfr-globe-label--blank" : ""}`)
        .text((d) => d.text.replace(/\n/g, " "));

      islandSelection = islandGroup.selectAll("circle")
        .data(meta.islands)
        .enter().append("circle")
        .attr("class", "hfr-globe-island")
        .attr("r", 3.4)
        .style("fill", (d) => d.color)
        .on("click", function(d) {
          setSelectedPolity(null);
          panelTitle.textContent = d.name;
          panelCopy.textContent = `${d.name} is confirmed territory of ${d.owner}. The marker is used because this island may be simplified away by the continental-scale coastline dataset.`;
          panelStatus.textContent = "Confirmed island ownership";
          panelLink.hidden = true;
          d3.event.stopPropagation();
        });
      islandSelection.append("title").text((d) => `${d.name} — ${d.owner}`);

      if (loading) loading.remove();
      redraw();
    }).catch((error) => {
      console.error("HFR globe failed to load", error);
      if (loading) loading.textContent = "The globe data could not be loaded. Check that the site is being served through MkDocs rather than opened as a raw file.";
    });

    svg.on("click", () => {
      if (d3.event.defaultPrevented) return;
      setSelectedPolity(null);
    });

    root.querySelector("#hfr-globe-zoom-in")?.addEventListener("click", () => {
      scale = Math.min(MAX_SCALE, scale * 1.18);
      projection.scale(scale); redraw();
    });
    root.querySelector("#hfr-globe-zoom-out")?.addEventListener("click", () => {
      scale = Math.max(MIN_SCALE, scale / 1.18);
      projection.scale(scale); redraw();
    });
    root.querySelector("#hfr-globe-reset")?.addEventListener("click", () => focusOn("north-america"));
    root.querySelector("#hfr-globe-jump")?.addEventListener("change", (event) => focusOn(event.target.value));
    root.querySelector("#hfr-globe-labels")?.addEventListener("change", (event) => {
      labelGroup.style("display", event.target.checked ? null : "none");
    });
    root.querySelector("#hfr-globe-rivers")?.addEventListener("change", (event) => {
      riverGroup.style("display", event.target.checked ? null : "none");
    });
    root.querySelector("#hfr-globe-provisional")?.addEventListener("change", (event) => {
      borderGroup.selectAll(".hfr-globe-border--provisional, .hfr-globe-border--review")
        .style("display", event.target.checked ? null : "none");
    });
  }

  function enhance() {
    document.documentElement.dataset.hfrBuildYear = String(new Date().getFullYear());
    const content = document.querySelector(".md-content__inner");
    if (!content || content.dataset.hfrEnhanced === "true") return;
    content.dataset.hfrEnhanced = "true";

    const type = classifyPage(window.location.pathname);
    if (type) {
      const profile = pageProfiles[type];
      const slug = slugFromPath(window.location.pathname);
      content.classList.add("hfr-page", `hfr-page--${type}`);
      addKicker(content, profile);
      addFeatureSlot(content, type, profile, slug);
      arrangeArticleAside(content);
      addVisualDossier(content, type, profile);
    }

    addProgressBar();
    addFooterVersion();
    addRandomArticleControl();
    initHfrGlobe();
  }

  if (typeof document$ !== "undefined") {
    document$.subscribe(enhance);
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", enhance);
  } else {
    enhance();
  }
})();
