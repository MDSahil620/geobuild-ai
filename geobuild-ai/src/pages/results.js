// Results Page
import { DEMO_SAMPLE_IMAGES, DEMO_CONFIDENCE_DISTRIBUTION, DEMO_BUILDING_AREA } from '../data/demoData.js';

export function renderResults(container, options = {}) {
  const uploadedImage = window.AppState.uploadedImage;
  const config = window.AppState.detectionConfig || {};

  // Use demo data
  const sample = DEMO_SAMPLE_IMAGES.find(s => s.id === 'sample-urban') || DEMO_SAMPLE_IMAGES[0];
  const imageUrl = uploadedImage?.url || sample.imageUrl;
  const imageName = uploadedImage?.name || 'demo_urban_area.jpg';
  const buildingCount = uploadedImage?.buildings || 247;
  const confidence = config.confidence ? Math.round(config.confidence * 100) : 87;
  const processingTime = 34.2;
  const area = 3.2;

  container.innerHTML = `
    <div class="fade-in">
      <div class="page-header">
        <div class="breadcrumb">
          <span onclick="navigateTo('dashboard')" style="cursor:pointer;color:var(--text-muted);">Dashboard</span>
          <span class="breadcrumb-sep">›</span>
          <span onclick="navigateTo('detection')" style="cursor:pointer;color:var(--text-muted);">Detection</span>
          <span class="breadcrumb-sep">›</span>
          <span>Results</span>
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;">
          <div>
            <h1 class="page-title">Detection Results</h1>
            <p class="page-subtitle">${imageName} <span class="badge badge-demo" style="margin-left:8px;">DEMO ANALYSIS</span></p>
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            <button class="btn btn-secondary btn-sm" onclick="exportResult('image')" id="exp-img">📸 Image</button>
            <button class="btn btn-secondary btn-sm" onclick="exportResult('csv')" id="exp-csv">📊 CSV</button>
            <button class="btn btn-secondary btn-sm" onclick="exportResult('json')" id="exp-json">📋 JSON</button>
            <button class="btn btn-secondary btn-sm" onclick="exportResult('geojson')" id="exp-geojson">🗺 GeoJSON</button>
            <button class="btn btn-primary btn-sm" onclick="exportResult('report')" id="exp-report">📄 Full Report</button>
          </div>
        </div>
      </div>

      <div class="content-area">
        <!-- Demo notice -->
        <div class="demo-banner" role="alert">
          ⚠️ <strong>DEMO DATA:</strong> These results are pre-generated example outputs for demonstration purposes. They do NOT represent real AI inference on this image.
        </div>

        <!-- Stats Overview -->
        <div class="stats-grid mb-24">
          <div class="stats-mini-card">
            <div class="stats-mini-value">${buildingCount}</div>
            <div class="stats-mini-label">Buildings Detected</div>
          </div>
          <div class="stats-mini-card">
            <div class="stats-mini-value">${confidence}%</div>
            <div class="stats-mini-label">Avg. Confidence <span style="font-size:0.65rem;">(est.)</span></div>
          </div>
          <div class="stats-mini-card">
            <div class="stats-mini-value">${area} km²</div>
            <div class="stats-mini-label">Est. Built-up Area</div>
          </div>
          <div class="stats-mini-card">
            <div class="stats-mini-value">${processingTime}s</div>
            <div class="stats-mini-label">Processing Time</div>
          </div>
          <div class="stats-mini-card">
            <div class="stats-mini-value">68%</div>
            <div class="stats-mini-label">Image Coverage</div>
          </div>
          <div class="stats-mini-card">
            <div class="stats-mini-value">12.4</div>
            <div class="stats-mini-label">Avg. Area/Bldg (m²)</div>
          </div>
        </div>

        <!-- Image Comparison (Side by Side) -->
        <div class="card card-lg mb-24">
          <div class="card-header">
            <div>
              <div class="card-title">Detection Visualization</div>
              <div class="card-subtitle">Original vs. AI-generated building detection overlay</div>
            </div>
            <div class="overlay-controls">
              <button class="overlay-btn active" onclick="setOverlay('original', this)" id="ov-original">Original</button>
              <button class="overlay-btn" onclick="setOverlay('detected', this)" id="ov-detected">Detected</button>
              <button class="overlay-btn" onclick="setOverlay('overlay', this)" id="ov-overlay">Overlay</button>
              <button class="overlay-btn" onclick="setOverlay('mask', this)" id="ov-mask">Mask</button>
            </div>
          </div>

          <div class="results-comparison">
            <!-- Original -->
            <div class="result-panel">
              <img
                src="${imageUrl}"
                alt="Original satellite image"
                style="width:100%;display:block;"
                onerror="this.src='https://via.placeholder.com/640x400/020b18/38bdf8?text=Original+Image'"
              />
              <div class="result-panel-label original">Original Image</div>
            </div>
            <!-- Detected -->
            <div class="result-panel" id="detected-panel">
              <img
                src="${imageUrl}"
                alt="Satellite image with building detection overlay"
                style="width:100%;display:block;opacity:0.8;"
                id="detected-img"
                onerror="this.src='https://via.placeholder.com/640x400/020b18/38bdf8?text=Detection+Overlay'"
              />
              <!-- Simulated building overlay (colored rectangles) -->
              <svg
                id="detection-svg"
                style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;"
                viewBox="0 0 100 100" preserveAspectRatio="none"
                aria-hidden="true"
              >
                <!-- High confidence buildings (green) -->
                <rect x="8" y="10" width="15" height="10" fill="rgba(34,197,94,0.35)" stroke="#22c55e" stroke-width="0.3"/>
                <rect x="30" y="20" width="20" height="14" fill="rgba(34,197,94,0.35)" stroke="#22c55e" stroke-width="0.3"/>
                <rect x="60" y="8" width="12" height="9" fill="rgba(34,197,94,0.35)" stroke="#22c55e" stroke-width="0.3"/>
                <rect x="75" y="40" width="18" height="13" fill="rgba(34,197,94,0.35)" stroke="#22c55e" stroke-width="0.3"/>
                <!-- Medium confidence (blue) -->
                <rect x="48" y="55" width="16" height="12" fill="rgba(59,130,246,0.35)" stroke="#3b82f6" stroke-width="0.3"/>
                <rect x="15" y="60" width="14" height="10" fill="rgba(59,130,246,0.35)" stroke="#3b82f6" stroke-width="0.3"/>
                <rect x="70" y="65" width="18" height="14" fill="rgba(59,130,246,0.35)" stroke="#3b82f6" stroke-width="0.3"/>
                <!-- Low confidence (orange) -->
                <rect x="38" y="75" width="12" height="9" fill="rgba(245,158,11,0.35)" stroke="#f59e0b" stroke-width="0.3"/>
                <rect x="5" y="78" width="18" height="12" fill="rgba(245,158,11,0.35)" stroke="#f59e0b" stroke-width="0.3"/>
              </svg>
              <div class="result-panel-label detected">Detected Buildings (DEMO)</div>
            </div>
          </div>

          <!-- Opacity slider -->
          <div style="display:flex;align-items:center;gap:12px;margin-top:14px;padding-top:14px;border-top:1px solid var(--border-color);">
            <span style="font-size:0.82rem;color:var(--text-muted);white-space:nowrap;">Overlay Opacity:</span>
            <input type="range" min="0" max="100" value="70" id="opacity-slider" oninput="updateOpacity(this.value)" aria-label="Detection overlay opacity" style="flex:1;max-width:200px;" />
            <span class="font-mono text-cyan" id="opacity-display" style="font-size:0.82rem;">70%</span>
          </div>

          <!-- Legend -->
          <div class="detection-legend" style="margin-top:12px;" role="list" aria-label="Detection confidence legend">
            <div class="legend-item" role="listitem"><div class="legend-color high"></div> High Confidence (>90%)</div>
            <div class="legend-item" role="listitem"><div class="legend-color medium"></div> Medium Confidence (70-90%)</div>
            <div class="legend-item" role="listitem"><div class="legend-color low"></div> Low Confidence (<70%)</div>
          </div>
        </div>

        <!-- Before / After Comparison Slider -->
        <div class="card card-lg mb-24">
          <div class="card-header">
            <div>
              <div class="card-title">Interactive Before / After Comparison</div>
              <div class="card-subtitle">Drag the divider to compare original and detection results</div>
            </div>
          </div>
          <div class="comparison-slider" id="comparison-slider" aria-label="Before and after image comparison">
            <!-- After (detected) — behind -->
            <div class="comparison-after">
              <img src="${imageUrl}" alt="Detected building overlay" onerror="this.src='https://via.placeholder.com/800x450/020b18/38bdf8?text=Detection+Result'" />
              <svg style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                <rect x="8" y="10" width="15" height="10" fill="rgba(34,197,94,0.4)" stroke="#22c55e" stroke-width="0.4"/>
                <rect x="30" y="20" width="20" height="14" fill="rgba(34,197,94,0.4)" stroke="#22c55e" stroke-width="0.4"/>
                <rect x="60" y="8" width="12" height="9" fill="rgba(34,197,94,0.4)" stroke="#22c55e" stroke-width="0.4"/>
                <rect x="48" y="55" width="16" height="12" fill="rgba(59,130,246,0.4)" stroke="#3b82f6" stroke-width="0.4"/>
                <rect x="15" y="60" width="14" height="10" fill="rgba(59,130,246,0.4)" stroke="#3b82f6" stroke-width="0.4"/>
                <rect x="38" y="75" width="12" height="9" fill="rgba(245,158,11,0.4)" stroke="#f59e0b" stroke-width="0.4"/>
              </svg>
            </div>
            <!-- Before (original) — on top, clipped -->
            <div class="comparison-before" id="comp-before" style="width:50%;">
              <img src="${imageUrl}" alt="Original satellite image" onerror="this.src='https://via.placeholder.com/800x450/020b18/38bdf8?text=Original+Image'" />
            </div>
            <!-- Divider -->
            <div class="comparison-divider" id="comp-divider" style="left:50%;">
              <div class="comparison-handle" aria-hidden="true">↔</div>
            </div>
            <div class="comparison-label left">Original</div>
            <div class="comparison-label right">Detected (DEMO)</div>
          </div>
        </div>

        <!-- Charts -->
        <div class="grid grid-2 mb-24" style="gap:20px;">
          <div class="card">
            <div class="card-header">
              <div>
                <div class="card-title">Confidence Distribution</div>
                <div class="card-subtitle"><span class="badge badge-demo">DEMO</span> Estimated values</div>
              </div>
            </div>
            <div class="chart-container">
              <canvas id="confidence-chart" class="chart-canvas" aria-label="Confidence distribution chart"></canvas>
            </div>
          </div>
          <div class="card">
            <div class="card-header">
              <div>
                <div class="card-title">Building Area Distribution</div>
                <div class="card-subtitle"><span class="badge badge-demo">DEMO</span> Estimated values</div>
              </div>
            </div>
            <div class="chart-container">
              <canvas id="area-chart" class="chart-canvas" aria-label="Building area distribution chart"></canvas>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div style="display:flex;gap:12px;justify-content:flex-end;flex-wrap:wrap;">
          <button class="btn btn-secondary" onclick="navigateTo('detection')" id="new-detection-btn">🔄 New Detection</button>
          <button class="btn btn-secondary" onclick="navigateTo('map')" id="view-on-map-btn">🗺 View on Map</button>
          <button class="btn btn-primary" onclick="exportResult('report')" id="gen-report-btn">📄 Generate Report</button>
        </div>
      </div>
    </div>
  `;

  // Overlay controls
  window.setOverlay = function(type, btn) {
    document.querySelectorAll('.overlay-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const svg = document.getElementById('detection-svg');
    const img = document.getElementById('detected-img');
    if (type === 'original') { svg.style.display = 'none'; img.style.filter = ''; }
    else if (type === 'detected') { svg.style.display = 'block'; img.style.filter = ''; }
    else if (type === 'overlay') { svg.style.display = 'block'; img.style.filter = 'brightness(0.8)'; }
    else if (type === 'mask') { svg.style.display = 'block'; img.style.filter = 'grayscale(1) brightness(0.5)'; }
  };

  window.updateOpacity = function(val) {
    document.getElementById('opacity-display').textContent = val + '%';
    const svg = document.getElementById('detection-svg');
    if (svg) svg.style.opacity = val / 100;
  };

  // Comparison slider
  const slider = document.getElementById('comparison-slider');
  const divider = document.getElementById('comp-divider');
  const before = document.getElementById('comp-before');
  let isDragging = false;

  function updateSlider(clientX) {
    const rect = slider.getBoundingClientRect();
    const pct = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    divider.style.left = pct + '%';
    before.style.width = pct + '%';
  }

  divider.addEventListener('mousedown', (e) => { isDragging = true; e.preventDefault(); });
  document.addEventListener('mousemove', (e) => { if (isDragging) updateSlider(e.clientX); });
  document.addEventListener('mouseup', () => { isDragging = false; });
  divider.addEventListener('touchstart', (e) => { isDragging = true; }, { passive: true });
  document.addEventListener('touchmove', (e) => { if (isDragging && e.touches[0]) updateSlider(e.touches[0].clientX); }, { passive: true });
  document.addEventListener('touchend', () => { isDragging = false; });

  // Helper to trigger browser file download
  function downloadBlob(content, filename, contentType) {
    const blob = new Blob([content], { type: contentType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  // Export functions with real file generation
  window.exportResult = function(type) {
    if (type === 'json') {
      const exportData = {
        metadata: {
          platform: 'GeoBuild AI',
          project: 'Ahmedabad Urban Area',
          image: imageName,
          timestamp: new Date().toISOString(),
          model: config.model || 'U-Net ResNet-34',
          confidenceThreshold: confidence / 100,
          totalBuildingsDetected: buildingCount,
          estimatedBuiltAreaKm2: area,
          processingTimeSec: processingTime
        },
        polygons: Array.from({ length: 15 }, (_, i) => ({
          id: `BLDG-${i + 1}`,
          type: i % 3 === 0 ? 'Commercial' : 'Residential',
          confidence: parseFloat((0.75 + (i * 0.015)).toFixed(2)),
          areaM2: Math.round(150 + Math.sin(i) * 80),
          coordinates: [
            [23.0225 + (i * 0.001), 72.5714 + (i * 0.001)],
            [23.0230 + (i * 0.001), 72.5714 + (i * 0.001)],
            [23.0230 + (i * 0.001), 72.5720 + (i * 0.001)],
            [23.0225 + (i * 0.001), 72.5720 + (i * 0.001)],
            [23.0225 + (i * 0.001), 72.5714 + (i * 0.001)]
          ]
        }))
      };
      downloadBlob(JSON.stringify(exportData, null, 2), `geobuild_${imageName.split('.')[0]}_detection.json`, 'application/json');
      window.showToast('Downloaded detection metadata as JSON!', 'success');
    } else if (type === 'csv') {
      let csv = 'Building_ID,Confidence,Area_SqMeters,Classification,Latitude,Longitude\n';
      for (let i = 1; i <= 35; i++) {
        const confVal = (0.72 + (i % 25) * 0.01).toFixed(2);
        const areaSq = Math.round(120 + (i * 14.5));
        const cls = i % 4 === 0 ? 'Industrial' : i % 3 === 0 ? 'Commercial' : 'Residential';
        const lat = (23.0225 + (i * 0.0008)).toFixed(6);
        const lng = (72.5714 + (i * 0.0008)).toFixed(6);
        csv += `BLD_${String(i).padStart(4, '0')},${confVal},${areaSq},${cls},${lat},${lng}\n`;
      }
      downloadBlob(csv, `geobuild_${imageName.split('.')[0]}_buildings.csv`, 'text/csv');
      window.showToast('Downloaded building footprints as CSV!', 'success');
    } else if (type === 'geojson') {
      const geojson = {
        type: 'FeatureCollection',
        crs: { type: 'name', properties: { name: 'urn:ogc:def:crs:OGC:1.3:CRS84' } },
        features: Array.from({ length: 10 }, (_, i) => ({
          type: 'Feature',
          properties: {
            id: `footprint_${i + 1}`,
            building_type: i % 2 === 0 ? 'Residential' : 'Commercial',
            confidence: parseFloat((0.8 + i * 0.018).toFixed(2)),
            area_m2: 210 + i * 35
          },
          geometry: {
            type: 'Polygon',
            coordinates: [[
              [72.5714 + (i * 0.002), 23.0225 + (i * 0.002)],
              [72.5730 + (i * 0.002), 23.0225 + (i * 0.002)],
              [72.5730 + (i * 0.002), 23.0238 + (i * 0.002)],
              [72.5714 + (i * 0.002), 23.0238 + (i * 0.002)],
              [72.5714 + (i * 0.002), 23.0225 + (i * 0.002)]
            ]]
          }
        }))
      };
      downloadBlob(JSON.stringify(geojson, null, 2), `geobuild_${imageName.split('.')[0]}_footprints.geojson`, 'application/geo+json');
      window.showToast('Downloaded GIS FeatureCollection as GeoJSON!', 'success');
    } else if (type === 'report') {
      window.print();
    } else if (type === 'image') {
      window.showToast('Opening high-resolution detection composite...', 'info');
      const a = document.createElement('a');
      a.href = imageUrl;
      a.download = `detection_${imageName}`;
      a.target = '_blank';
      a.click();
    }
  };

  // Charts
  setTimeout(() => {
    const confCtx = document.getElementById('confidence-chart')?.getContext('2d');
    if (confCtx && window.Chart) {
      new window.Chart(confCtx, {
        type: 'doughnut',
        data: {
          labels: DEMO_CONFIDENCE_DISTRIBUTION.map(d => d.label),
          datasets: [{
            data: DEMO_CONFIDENCE_DISTRIBUTION.map(d => d.value),
            backgroundColor: DEMO_CONFIDENCE_DISTRIBUTION.map(d => d.color + '88'),
            borderColor: DEMO_CONFIDENCE_DISTRIBUTION.map(d => d.color),
            borderWidth: 2
          }]
        },
        options: {
          plugins: { legend: { labels: { color: 'var(--text-secondary)', font: { family: 'Inter' } } } },
          cutout: '60%'
        }
      });
    }

    const areaCtx = document.getElementById('area-chart')?.getContext('2d');
    if (areaCtx && window.Chart) {
      new window.Chart(areaCtx, {
        type: 'bar',
        data: {
          labels: DEMO_BUILDING_AREA.map(d => d.range),
          datasets: [{
            label: 'Building Count',
            data: DEMO_BUILDING_AREA.map(d => d.count),
            backgroundColor: 'rgba(56,189,248,0.3)',
            borderColor: 'rgba(56,189,248,0.8)',
            borderWidth: 2,
            borderRadius: 4
          }]
        },
        options: {
          plugins: { legend: { display: false } },
          scales: {
            x: { ticks: { color: 'var(--text-muted)', font: { size: 10 } }, grid: { color: 'rgba(56,189,248,0.05)' } },
            y: { ticks: { color: 'var(--text-muted)' }, grid: { color: 'rgba(56,189,248,0.05)' } }
          }
        }
      });
    }
  }, 100);
}
