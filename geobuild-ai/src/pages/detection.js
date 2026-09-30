// Detection Workspace Page
import { DEMO_SAMPLE_IMAGES } from '../data/demoData.js';

export function renderDetection(container) {
  const uploadedImage = window.AppState.uploadedImage;
  let confidence = 50;
  let selectedMode = 'balanced';
  let selectedModel = 'segmentation';

  const imageUrl = uploadedImage?.url || DEMO_SAMPLE_IMAGES[0].imageUrl;
  const imageName = uploadedImage?.name || 'demo_urban_area.jpg';

  container.innerHTML = `
    <div class="fade-in" style="display:flex;flex-direction:column;height:calc(100vh - var(--navbar-height));">
      <!-- Workspace Toolbar -->
      <div style="padding:12px 20px;border-bottom:1px solid var(--border-color);display:flex;align-items:center;justify-content:space-between;background:var(--bg-card);flex-shrink:0;">
        <div style="display:flex;align-items:center;gap:12px;">
          <button class="btn btn-ghost btn-sm" onclick="navigateTo('upload')" id="back-upload-btn">← Back</button>
          <div style="height:20px;width:1px;background:var(--border-color);"></div>
          <div>
            <div style="font-size:0.85rem;font-weight:700;">Detection Workspace</div>
            <div style="font-size:0.72rem;color:var(--text-muted);">${imageName}</div>
          </div>
          ${uploadedImage?.isDemo ? '<span class="badge badge-demo" style="margin-left:8px;">DEMO IMAGE</span>' : ''}
        </div>
        <div style="display:flex;gap:8px;">
          <button class="btn btn-ghost btn-sm" onclick="navigateTo('upload')" id="change-image-btn">🔄 Change Image</button>
          <button class="btn btn-primary" id="run-detection-btn" onclick="runDetection()">
            🔍 Run Building Detection
          </button>
        </div>
      </div>

      <!-- Main Workspace -->
      <div style="display:grid;grid-template-columns:240px 1fr 260px;flex:1;overflow:hidden;">

        <!-- LEFT PANEL: Image Settings -->
        <div class="workspace-panel">
          <div class="panel-title">Image Settings</div>

          <div class="config-group">
            <div class="config-label">Image Enhancement</div>
            <div style="display:flex;flex-direction:column;gap:6px;">
              <label style="display:flex;align-items:center;gap:8px;font-size:0.82rem;cursor:pointer;">
                <input type="checkbox" id="enhance-contrast" /> Contrast Enhancement
              </label>
              <label style="display:flex;align-items:center;gap:8px;font-size:0.82rem;cursor:pointer;">
                <input type="checkbox" id="enhance-sharpen" /> Sharpening Filter
              </label>
              <label style="display:flex;align-items:center;gap:8px;font-size:0.82rem;cursor:pointer;">
                <input type="checkbox" id="enhance-denoise" checked /> Noise Reduction
              </label>
            </div>
          </div>

          <div class="config-group">
            <div class="config-label">Tile Size <span style="font-size:0.7rem;color:var(--text-muted);">(px)</span></div>
            <select class="form-control" id="tile-size-select" aria-label="Tile size">
              <option value="256">256 × 256</option>
              <option value="512" selected>512 × 512</option>
              <option value="1024">1024 × 1024</option>
            </select>
          </div>

          <div class="config-group">
            <div class="config-label">Tile Overlap</div>
            <select class="form-control" id="overlap-select" aria-label="Tile overlap">
              <option value="0">None</option>
              <option value="0.1">10%</option>
              <option value="0.25" selected>25%</option>
              <option value="0.5">50%</option>
            </select>
          </div>

          <div class="config-group">
            <div class="config-label" style="margin-bottom:8px;">Image Info</div>
            <div style="font-size:0.78rem;color:var(--text-secondary);line-height:2;">
              <div>📁 <strong>Name:</strong> ${imageName.substring(0, 18)}...</div>
              <div>📐 <strong>Size:</strong> ${uploadedImage?.isDemo ? '~4.2 MB' : 'Loaded'}</div>
              <div>🖼 <strong>Mode:</strong> RGB</div>
              <div>📍 <strong>CRS:</strong> ${uploadedImage?.isDemo ? 'Image coords (DEMO)' : 'Unknown'}</div>
            </div>
          </div>

          <div class="card" style="padding:12px;background:rgba(245,158,11,0.08);border-color:rgba(245,158,11,0.3);">
            <div style="font-size:0.72rem;color:#f59e0b;line-height:1.6;">
              ⚠️ <strong>Note:</strong> Processing uses simulated demo analysis. Connect a real ML backend to run actual AI inference.
            </div>
          </div>
        </div>

        <!-- CENTER: Image Viewer -->
        <div class="workspace-viewer" id="workspace-viewer" style="position:relative;background:#000;display:flex;align-items:center;justify-content:center;overflow:hidden;">
          <img
            id="workspace-image"
            src="${imageUrl}"
            alt="Satellite image for building detection"
            style="max-width:100%;max-height:100%;object-fit:contain;"
            onerror="this.src='https://via.placeholder.com/800x600/020b18/38bdf8?text=Satellite+Image'"
          />
          <div class="viewer-controls" aria-label="Viewer controls">
            <button class="btn btn-secondary btn-sm btn-icon" onclick="zoomViewer(1.2)" title="Zoom In" aria-label="Zoom in">🔍+</button>
            <button class="btn btn-secondary btn-sm btn-icon" onclick="zoomViewer(0.8)" title="Zoom Out" aria-label="Zoom out">🔍-</button>
            <button class="btn btn-secondary btn-sm btn-icon" onclick="resetViewer()" title="Reset View" aria-label="Reset view">🔄</button>
          </div>
          <!-- Processing Overlay (hidden) -->
          <div class="processing-overlay hidden" id="processing-overlay" role="status" aria-live="polite" aria-label="Detection processing">
            <div class="processing-spinner" aria-hidden="true"></div>
            <div class="processing-stage" id="processing-stage-text">Initializing...</div>
            <div class="progress-bar-wrapper" style="width:280px;margin-bottom:20px;">
              <div class="progress-bar cyan" id="proc-progress" style="width:0%;transition:width 0.5s ease;"></div>
            </div>
            <div class="processing-stages" role="list">
              ${[
                'Uploading Image',
                'Preprocessing',
                'Running AI Model',
                'Detecting Buildings',
                'Generating Masks',
                'Calculating Statistics',
                'Finalizing Results'
              ].map((s, i) => `
                <div class="stage-item" id="stage-${i}" role="listitem">
                  <span class="stage-icon">⏳</span>
                  <span>${s}</span>
                </div>
              `).join('')}
            </div>
            <div style="margin-top:16px;">
              <span class="badge badge-demo" style="font-size:0.75rem;padding:5px 14px;">⚠ DEMO ANALYSIS — Not real AI inference</span>
            </div>
          </div>
        </div>

        <!-- RIGHT PANEL: Detection Configuration -->
        <div class="workspace-panel">
          <div class="panel-title">Detection Config</div>

          <div class="config-group">
            <div class="config-label">Detection Model</div>
            <div style="display:flex;flex-direction:column;gap:6px;">
              <div class="mode-option ${selectedModel==='segmentation'?'selected':''}" id="model-seg" onclick="selectModel('segmentation')" role="radio" aria-checked="${selectedModel==='segmentation'}" tabindex="0">
                <div class="mode-option-dot"></div>
                <div class="mode-option-info">
                  <div class="mode-option-name">Building Segmentation</div>
                  <div class="mode-option-desc">U-Net semantic segmentation</div>
                </div>
              </div>
              <div class="mode-option ${selectedModel==='detection'?'selected':''}" id="model-det" onclick="selectModel('detection')" role="radio" aria-checked="${selectedModel==='detection'}" tabindex="0">
                <div class="mode-option-dot"></div>
                <div class="mode-option-info">
                  <div class="mode-option-name">Building Detection</div>
                  <div class="mode-option-desc">Object detection + bboxes</div>
                </div>
              </div>
            </div>
          </div>

          <div class="config-group">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
              <div class="config-label">Confidence Threshold</div>
              <span class="font-mono text-cyan" id="conf-display" style="font-size:0.85rem;">${confidence}%</span>
            </div>
            <input
              type="range" id="confidence-slider"
              min="10" max="95" value="${confidence}"
              aria-label="Confidence threshold"
              oninput="updateConfidence(this.value)"
            />
            <div class="slider-labels">
              <span>10% (Low)</span>
              <span>95% (High)</span>
            </div>
            <div style="font-size:0.72rem;color:var(--text-muted);margin-top:6px;">
              Detections below this confidence will be filtered out.
            </div>
          </div>

          <div class="config-group">
            <div class="config-label" style="margin-bottom:8px;">Detection Mode</div>
            ${[
              { id: 'fast', label: 'Fast', desc: 'Lower accuracy, quick results' },
              { id: 'balanced', label: 'Balanced', desc: 'Good accuracy, moderate speed' },
              { id: 'accuracy', label: 'High Accuracy', desc: 'Best results, slower processing' },
            ].map(m => `
              <div class="mode-option ${selectedMode===m.id?'selected':''} mb-8"
                   id="mode-${m.id}" onclick="selectMode('${m.id}')"
                   role="radio" aria-checked="${selectedMode===m.id}" tabindex="0"
                   style="margin-bottom:6px;"
                   onkeydown="if(event.key==='Enter'||event.key===' ')selectMode('${m.id}')">
                <div class="mode-option-dot"></div>
                <div class="mode-option-info">
                  <div class="mode-option-name">${m.label}</div>
                  <div class="mode-option-desc">${m.desc}</div>
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Estimated time -->
          <div class="card" style="padding:12px;margin-top:8px;">
            <div style="font-size:0.78rem;color:var(--text-muted);">
              <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
                <span>Est. Time:</span>
                <span class="font-mono text-cyan" id="est-time">~35s</span>
              </div>
              <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
                <span>Model:</span>
                <span class="font-mono" style="color:var(--accent-purple)" id="model-display">U-Net</span>
              </div>
              <div style="display:flex;justify-content:space-between;">
                <span>Mode:</span>
                <span class="font-mono" id="mode-display">Balanced</span>
              </div>
            </div>
          </div>

          <button class="btn btn-primary w-full" onclick="runDetection()" id="run-btn-right" style="margin-top:12px;padding:12px;">
            🚀 Run Detection
          </button>
        </div>
      </div>
    </div>
  `;

  // Controls
  let zoom = 1;
  window.zoomViewer = function(factor) {
    const img = document.getElementById('workspace-image');
    zoom = Math.max(0.3, Math.min(4, zoom * factor));
    img.style.transform = `scale(${zoom})`;
  };
  window.resetViewer = function() {
    zoom = 1;
    document.getElementById('workspace-image').style.transform = 'scale(1)';
  };

  window.updateConfidence = function(val) {
    confidence = parseInt(val);
    document.getElementById('conf-display').textContent = val + '%';
  };

  window.selectModel = function(model) {
    selectedModel = model;
    document.querySelectorAll('[id^="model-"]').forEach(el => {
      const isSelected = el.id === 'model-' + model;
      el.classList.toggle('selected', isSelected);
      el.querySelector('.mode-option-dot').style.background = isSelected ? 'var(--accent-cyan)' : '';
      el.setAttribute('aria-checked', isSelected);
    });
    document.getElementById('model-display').textContent = model === 'segmentation' ? 'U-Net' : 'YOLOv8';
  };

  window.selectMode = function(mode) {
    selectedMode = mode;
    const times = { fast: '~15s', balanced: '~35s', accuracy: '~60s' };
    document.querySelectorAll('[id^="mode-"]').forEach(el => {
      const isSelected = el.id === 'mode-' + mode;
      el.classList.toggle('selected', isSelected);
      el.setAttribute('aria-checked', isSelected);
    });
    document.getElementById('est-time').textContent = times[mode];
    document.getElementById('mode-display').textContent = mode.charAt(0).toUpperCase() + mode.slice(1);
  };

  window.runDetection = function() {
    window.AppState.detectionConfig = { model: selectedModel, confidence: confidence / 100, mode: selectedMode };
    window.AppState.uploadedImage = window.AppState.uploadedImage || { url: imageUrl, name: imageName, isDemo: true };

    // Show processing overlay
    const overlay = document.getElementById('processing-overlay');
    overlay.classList.remove('hidden');
    document.getElementById('run-detection-btn').disabled = true;
    document.getElementById('run-btn-right').disabled = true;

    // Simulate processing stages
    const stages = [
      { id: 0, label: 'Uploading Image', duration: 600 },
      { id: 1, label: 'Preprocessing', duration: 800 },
      { id: 2, label: 'Running AI Model', duration: 2000 },
      { id: 3, label: 'Detecting Buildings', duration: 1500 },
      { id: 4, label: 'Generating Masks', duration: 800 },
      { id: 5, label: 'Calculating Statistics', duration: 600 },
      { id: 6, label: 'Finalizing Results', duration: 500 }
    ];

    let currentStage = 0;
    const totalTime = stages.reduce((a, s) => a + s.duration, 0);
    let elapsed = 0;

    function runNextStage() {
      if (currentStage >= stages.length) {
        // Done!
        setTimeout(() => {
          overlay.classList.add('hidden');
          window.showToast('Building detection complete! (DEMO ANALYSIS)', 'success', 'Detection Complete');
          navigateTo('results');
        }, 400);
        return;
      }
      const stage = stages[currentStage];
      document.getElementById('processing-stage-text').textContent = stage.label + '...';

      // Update stage indicators
      for (let i = 0; i < currentStage; i++) {
        const el = document.getElementById('stage-' + i);
        if (el) { el.className = 'stage-item done'; el.querySelector('.stage-icon').textContent = '✅'; }
      }
      const cur = document.getElementById('stage-' + currentStage);
      if (cur) { cur.className = 'stage-item current'; cur.querySelector('.stage-icon').textContent = '⏳'; }

      elapsed += stage.duration;
      const pct = Math.round((elapsed / totalTime) * 100);
      document.getElementById('proc-progress').style.width = pct + '%';

      currentStage++;
      setTimeout(runNextStage, stage.duration);
    }

    runNextStage();
  };
}
