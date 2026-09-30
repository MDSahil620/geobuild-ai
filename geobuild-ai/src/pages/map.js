// Map Page — Leaflet Interactive Map
import { DEMO_BUILDING_POLYGONS } from '../data/demoData.js';

export function renderMap(container) {
  let map = null;
  let buildingLayer = null;
  let currentLayer = 'street';

  container.innerHTML = `
    <div class="fade-in map-page">
      <!-- Map Toolbar -->
      <div class="map-toolbar">
        <h1 style="font-size:1rem;font-weight:700;margin-right:4px;">🗺 Interactive Map</h1>
        <div style="height:20px;width:1px;background:var(--border-color);margin:0 4px;"></div>

        <button class="btn btn-secondary btn-sm" id="layer-street" onclick="switchLayer('street')" aria-pressed="true">
          🗺 Street View
        </button>
        <button class="btn btn-ghost btn-sm" id="layer-satellite" onclick="switchLayer('satellite')" aria-pressed="false">
          🛰️ Satellite View
        </button>

        <div style="width:1px;height:20px;background:var(--border-color);margin:0 4px;"></div>

        <button class="btn btn-ghost btn-sm" id="toggle-buildings-btn" onclick="toggleBuildings()" aria-pressed="true">
          🏗️ Building Layer
        </button>

        <div style="margin-left:auto;display:flex;gap:8px;align-items:center;">
          <span class="badge badge-demo">DEMO COORDINATES</span>
          <button class="btn btn-ghost btn-sm" onclick="resetMapView()" id="reset-map-btn">🔄 Reset View</button>
          <button class="btn btn-primary btn-sm" onclick="navigateTo('results')" id="map-results-btn">← Back to Results</button>
        </div>
      </div>

      <!-- Map Container -->
      <div class="map-container">
        <div id="leaflet-map" role="application" aria-label="Interactive building detection map"></div>

        <!-- Info Panel -->
        <div class="map-info-panel">
          <div class="map-info-title">Detection Summary</div>
          <div class="map-stat-row">
            <span class="map-stat-key">Buildings</span>
            <span class="map-stat-val">247 <span style="font-size:0.65rem;color:var(--text-muted);">(DEMO)</span></span>
          </div>
          <div class="map-stat-row">
            <span class="map-stat-key">Coverage</span>
            <span class="map-stat-val">3.2 km²</span>
          </div>
          <div class="map-stat-row">
            <span class="map-stat-key">Avg. Conf.</span>
            <span class="map-stat-val">87%</span>
          </div>
          <div class="map-stat-row">
            <span class="map-stat-key">Mode</span>
            <span class="map-stat-val">Balanced</span>
          </div>
          <div style="margin-top:12px;font-size:0.72rem;color:var(--text-muted);line-height:1.6;">
            Click a building polygon to see details.
          </div>
          <div style="margin-top:10px;display:flex;flex-direction:column;gap:6px;">
            <div style="display:flex;align-items:center;gap:6px;font-size:0.75rem;">
              <div style="width:12px;height:12px;border-radius:2px;background:rgba(34,197,94,0.5);border:1.5px solid #22c55e;"></div>
              High Confidence
            </div>
            <div style="display:flex;align-items:center;gap:6px;font-size:0.75rem;">
              <div style="width:12px;height:12px;border-radius:2px;background:rgba(59,130,246,0.5);border:1.5px solid #3b82f6;"></div>
              Medium Confidence
            </div>
            <div style="display:flex;align-items:center;gap:6px;font-size:0.75rem;">
              <div style="width:12px;height:12px;border-radius:2px;background:rgba(245,158,11,0.5);border:1.5px solid #f59e0b;"></div>
              Low Confidence
            </div>
          </div>
        </div>

        <!-- Coordinates notice -->
        <div class="demo-coords-notice" role="status">
          ⚠️ Image-coordinate mode — Demo GPS coordinates only
        </div>
      </div>
    </div>
  `;

  // Initialize Leaflet map after DOM is ready
  setTimeout(() => {
    if (!window.L) {
      container.querySelector('.map-container').innerHTML = `
        <div style="display:flex;align-items:center;justify-content:center;height:100%;text-align:center;padding:40px;">
          <div>
            <div style="font-size:48px;margin-bottom:16px;">🗺️</div>
            <div style="font-size:1rem;font-weight:600;margin-bottom:8px;">Leaflet Map could not load</div>
            <div style="font-size:0.85rem;color:var(--text-muted);">Please check your internet connection for the Leaflet CDN to load.</div>
          </div>
        </div>
      `;
      return;
    }

    // Center on Ahmedabad, India (demo coordinates)
    map = window.L.map('leaflet-map', {
      center: [23.022505, 72.571365],
      zoom: 14,
      zoomControl: true,
      attributionControl: true
    });

    // Base layers
    const streetLayer = window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    });

    const satelliteLayer = window.L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: '© Esri, DigitalGlobe',
      maxZoom: 18
    });

    streetLayer.addTo(map);

    // Demo building polygons
    buildingLayer = window.L.layerGroup();

    const buildings = [
      { id: 1, bounds: [[23.025, 72.568], [23.027, 72.571]], confidence: 0.94, area: 245, type: 'Residential' },
      { id: 2, bounds: [[23.020, 72.574], [23.023, 72.578]], confidence: 0.87, area: 312, type: 'Commercial' },
      { id: 3, bounds: [[23.029, 72.565], [23.032, 72.569]], confidence: 0.71, area: 189, type: 'Residential' },
      { id: 4, bounds: [[23.018, 72.580], [23.021, 72.585]], confidence: 0.92, area: 421, type: 'Industrial' },
      { id: 5, bounds: [[23.026, 72.580], [23.028, 72.583]], confidence: 0.83, area: 156, type: 'Residential' },
      { id: 6, bounds: [[23.033, 72.575], [23.036, 72.579]], confidence: 0.65, area: 278, type: 'Commercial' },
      { id: 7, bounds: [[23.015, 72.568], [23.018, 72.572]], confidence: 0.90, area: 342, type: 'Residential' },
      { id: 8, bounds: [[23.022, 72.562], [23.024, 72.566]], confidence: 0.76, area: 198, type: 'Mixed' },
    ];

    buildings.forEach(b => {
      const color = b.confidence >= 0.85 ? '#22c55e' : b.confidence >= 0.70 ? '#3b82f6' : '#f59e0b';
      const rect = window.L.rectangle(b.bounds, {
        color: color,
        fillColor: color,
        fillOpacity: 0.3,
        weight: 2
      });
      rect.bindPopup(`
        <div style="font-family:var(--font-sans,sans-serif);min-width:180px;">
          <div style="font-weight:700;margin-bottom:8px;font-size:0.9rem;">Building #${b.id}</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;font-size:0.8rem;">
            <span style="color:#888;">Type:</span><span style="font-weight:600;">${b.type}</span>
            <span style="color:#888;">Confidence:</span><span style="font-weight:600;color:${color};">${Math.round(b.confidence*100)}%</span>
            <span style="color:#888;">Est. Area:</span><span style="font-weight:600;">${b.area} m²</span>
          </div>
          <div style="margin-top:8px;padding:4px 8px;background:rgba(245,158,11,0.15);border-radius:4px;font-size:0.7rem;color:#f59e0b;">
            ⚠️ DEMO DATA — Not real coordinates
          </div>
        </div>
      `);
      buildingLayer.addLayer(rect);
    });

    buildingLayer.addTo(map);

    // Layer switching
    let buildingsVisible = true;
    window.switchLayer = function(type) {
      currentLayer = type;
      if (type === 'street') {
        map.removeLayer(satelliteLayer);
        streetLayer.addTo(map);
        document.getElementById('layer-street')?.classList.replace('btn-ghost', 'btn-secondary');
        document.getElementById('layer-satellite')?.classList.replace('btn-secondary', 'btn-ghost');
        document.getElementById('layer-street')?.setAttribute('aria-pressed', 'true');
        document.getElementById('layer-satellite')?.setAttribute('aria-pressed', 'false');
      } else {
        map.removeLayer(streetLayer);
        satelliteLayer.addTo(map);
        document.getElementById('layer-satellite')?.classList.replace('btn-ghost', 'btn-secondary');
        document.getElementById('layer-street')?.classList.replace('btn-secondary', 'btn-ghost');
        document.getElementById('layer-satellite')?.setAttribute('aria-pressed', 'true');
        document.getElementById('layer-street')?.setAttribute('aria-pressed', 'false');
      }
    };

    window.toggleBuildings = function() {
      buildingsVisible = !buildingsVisible;
      const btn = document.getElementById('toggle-buildings-btn');
      if (buildingsVisible) {
        map.addLayer(buildingLayer);
        btn?.classList.remove('btn-ghost');
        btn?.classList.add('btn-secondary');
        btn?.setAttribute('aria-pressed', 'true');
      } else {
        map.removeLayer(buildingLayer);
        btn?.classList.add('btn-ghost');
        btn?.classList.remove('btn-secondary');
        btn?.setAttribute('aria-pressed', 'false');
      }
    };

    window.resetMapView = function() {
      map.setView([23.022505, 72.571365], 14);
    };

    // Resize map on window resize
    window.addEventListener('resize', () => map && map.invalidateSize());

  }, 200);
}
