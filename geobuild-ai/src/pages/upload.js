// Upload Page
export function renderUpload(container) {
  let uploadedFile = null;
  let uploadedDataURL = null;

  container.innerHTML = `
    <div class="fade-in">
      <div class="page-header">
        <div class="breadcrumb">
          <span onclick="navigateTo('dashboard')" style="cursor:pointer;color:var(--text-muted);">Dashboard</span>
          <span class="breadcrumb-sep">›</span>
          <span>Upload Satellite Image</span>
        </div>
        <h1 class="page-title">Upload Satellite Image</h1>
        <p class="page-subtitle">Upload your satellite or aerial image for AI-powered building detection.</p>
      </div>

      <div class="content-area">
        <div style="display:grid;grid-template-columns:1fr 340px;gap:24px;align-items:start;">
          <!-- Main Upload Area -->
          <div>
            <!-- Upload Zone -->
            <div id="upload-zone-wrapper">
              <label
                class="upload-zone"
                id="upload-zone"
                for="file-input"
                role="button"
                aria-label="Upload satellite image — drag and drop or click to browse"
                tabindex="0"
                onkeydown="if(event.key==='Enter'||event.key===' ')document.getElementById('file-input').click()"
              >
                <div class="upload-icon">🛰️</div>
                <div class="upload-title">Drag & Drop your satellite image here</div>
                <p class="upload-subtitle">or click to browse files from your computer</p>
                <div class="upload-formats" role="list" aria-label="Supported formats">
                  <span class="format-chip" role="listitem">JPG</span>
                  <span class="format-chip" role="listitem">JPEG</span>
                  <span class="format-chip" role="listitem">PNG</span>
                  <span class="format-chip" role="listitem">TIFF</span>
                  <span class="format-chip" role="listitem">GeoTIFF*</span>
                </div>
                <p style="margin-top:12px;font-size:0.72rem;color:var(--text-muted);">*GeoTIFF requires backend support. Max file size: 50 MB</p>
                <input type="file" id="file-input" accept=".jpg,.jpeg,.png,.tif,.tiff" aria-label="Choose satellite image file" />
              </label>
            </div>

            <!-- Preview Area (hidden until file selected) -->
            <div id="preview-area" class="hidden" style="margin-top:16px;">
              <div class="upload-preview">
                <img id="preview-img" class="preview-image" src="" alt="Uploaded satellite image preview" />
                <div class="preview-info">
                  <div class="preview-info-item">
                    <div class="preview-info-label">File Name</div>
                    <div class="preview-info-value" id="preview-name">—</div>
                  </div>
                  <div class="preview-info-item">
                    <div class="preview-info-label">File Size</div>
                    <div class="preview-info-value" id="preview-size">—</div>
                  </div>
                  <div class="preview-info-item">
                    <div class="preview-info-label">Dimensions</div>
                    <div class="preview-info-value" id="preview-dims">—</div>
                  </div>
                  <div class="preview-info-item">
                    <div class="preview-info-label">Format</div>
                    <div class="preview-info-value" id="preview-format">—</div>
                  </div>
                </div>
                <div class="upload-progress" id="upload-progress-area">
                  <div style="display:flex;justify-content:space-between;font-size:0.8rem;margin-bottom:6px;">
                    <span id="upload-status-text">Ready to upload</span>
                    <span id="upload-pct">0%</span>
                  </div>
                  <div class="progress-bar-wrapper">
                    <div class="progress-bar cyan" id="upload-progress-bar" style="width:0%;transition:width 0.3s ease;"></div>
                  </div>
                </div>
              </div>
              <div style="display:flex;gap:10px;margin-top:16px;">
                <button class="btn btn-ghost btn-sm" onclick="clearUpload()" id="clear-upload-btn">🗑 Remove</button>
                <button class="btn btn-secondary btn-sm" onclick="replaceFile()" id="replace-upload-btn">🔄 Replace</button>
                <button class="btn btn-primary" onclick="proceedToDetection()" id="continue-detection-btn" style="margin-left:auto;">
                  🔍 Continue to Detection →
                </button>
              </div>
            </div>

            <!-- Error display -->
            <div id="upload-error" class="hidden" style="margin-top:12px;">
              <div class="demo-banner" style="border-color:rgba(239,68,68,0.4);background:rgba(239,68,68,0.1);color:var(--accent-red);">
                <span>❌</span>
                <span id="upload-error-msg">Upload error</span>
              </div>
            </div>
          </div>

          <!-- Right Panel: Demo Samples + Instructions -->
          <div style="display:flex;flex-direction:column;gap:16px;">
            <!-- Demo Mode -->
            <div class="card">
              <div class="card-header">
                <div>
                  <div class="card-title">Demo Sample Images</div>
                  <div class="card-subtitle">Use pre-loaded samples to try the platform</div>
                </div>
                <span class="badge badge-demo">DEMO</span>
              </div>
              <div style="display:flex;flex-direction:column;gap:8px;">
                ${[
                  { id: 'urban', label: '🏙️ Urban Area (Dense)', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Biharwe-aerial.jpg/640px-Biharwe-aerial.jpg', buildings: 247 },
                  { id: 'residential', label: '🏘️ Residential Area', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Adobe_Systems_HQ.jpg/640px-Adobe_Systems_HQ.jpg', buildings: 189 },
                  { id: 'commercial', label: '🏢 Commercial Zone', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Top_of_Haiku_Stairs.jpg/640px-Top_of_Haiku_Stairs.jpg', buildings: 43 },
                  { id: 'mixed', label: '🌆 Mixed Use Area', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Istanbul_panorama_1.jpg/640px-Istanbul_panorama_1.jpg', buildings: 312 },
                ].map(s => `
                  <button class="btn btn-secondary btn-sm" style="justify-content:flex-start;gap:8px;text-align:left;"
                          onclick="loadSampleImage('${s.url}', '${s.label}', ${s.buildings})"
                          id="sample-${s.id}-btn">
                    ${s.label}
                    <span style="margin-left:auto;font-size:0.7rem;color:var(--text-muted);">${s.buildings} bldgs</span>
                  </button>
                `).join('')}
              </div>
            </div>

            <!-- Upload Guidelines -->
            <div class="card">
              <div class="card-title" style="margin-bottom:12px;">📋 Upload Guidelines</div>
              <div style="display:flex;flex-direction:column;gap:10px;font-size:0.82rem;">
                ${[
                  { icon: '✅', text: 'High-resolution images work best (≥ 0.5 m/pixel)' },
                  { icon: '✅', text: 'Nadir (top-down) view preferred' },
                  { icon: '✅', text: 'Clear, cloud-free imagery recommended' },
                  { icon: '✅', text: 'RGB or multispectral bands supported' },
                  { icon: '⚠️', text: 'Very oblique angles may reduce accuracy' },
                  { icon: '⚠️', text: 'Heavy shadows can affect detection' },
                  { icon: '❌', text: 'Files over 50 MB not supported' },
                ].map(g => `
                  <div style="display:flex;gap:8px;align-items:flex-start;">
                    <span>${g.icon}</span>
                    <span style="color:var(--text-secondary);">${g.text}</span>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Supported Formats Detail -->
            <div class="card">
              <div class="card-title" style="margin-bottom:12px;">🗂 Format Details</div>
              <div style="font-size:0.8rem;color:var(--text-secondary);line-height:1.7;">
                <div style="margin-bottom:6px;"><span class="format-chip">JPG/JPEG</span> Standard satellite screenshots</div>
                <div style="margin-bottom:6px;"><span class="format-chip">PNG</span> High-quality lossless imagery</div>
                <div style="margin-bottom:6px;"><span class="format-chip">TIFF</span> Remote sensing standard format</div>
                <div><span class="format-chip">GeoTIFF</span> Georeferenced satellite data (backend required)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Setup drag and drop
  const zone = document.getElementById('upload-zone');

  zone.addEventListener('dragover', (e) => { e.preventDefault(); zone.classList.add('dragover'); });
  zone.addEventListener('dragleave', () => zone.classList.remove('dragover'));
  zone.addEventListener('drop', (e) => {
    e.preventDefault();
    zone.classList.remove('dragover');
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  });

  document.getElementById('file-input').addEventListener('change', (e) => {
    if (e.target.files[0]) handleFile(e.target.files[0]);
  });

  function handleFile(file) {
    // Validate type
    const allowed = ['image/jpeg', 'image/png', 'image/tiff', 'image/jpg'];
    const allowedExt = ['.jpg', '.jpeg', '.png', '.tif', '.tiff'];
    const ext = '.' + file.name.split('.').pop().toLowerCase();

    if (!allowed.includes(file.type) && !allowedExt.includes(ext)) {
      showUploadError('Unsupported file format. Please upload JPG, PNG, or TIFF images.');
      return;
    }
    if (file.size > 50 * 1024 * 1024) {
      showUploadError('File is too large. Maximum allowed size is 50 MB. Please compress the image and try again.');
      return;
    }

    document.getElementById('upload-error').classList.add('hidden');
    uploadedFile = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      uploadedDataURL = e.target.result;
      showPreview(file, uploadedDataURL);
    };
    reader.readAsDataURL(file);
  }

  function showPreview(file, dataURL) {
    document.getElementById('upload-zone-wrapper').classList.add('hidden');
    const previewArea = document.getElementById('preview-area');
    previewArea.classList.remove('hidden');

    document.getElementById('preview-img').src = dataURL;
    document.getElementById('preview-name').textContent = file.name;
    document.getElementById('preview-size').textContent = formatBytes(file.size);
    document.getElementById('preview-format').textContent = file.name.split('.').pop().toUpperCase();

    const img = new Image();
    img.onload = () => {
      document.getElementById('preview-dims').textContent = `${img.naturalWidth} × ${img.naturalHeight}px`;
    };
    img.src = dataURL;

    // Simulate upload progress
    simulateUpload();
  }

  function simulateUpload() {
    const bar = document.getElementById('upload-progress-bar');
    const pct = document.getElementById('upload-pct');
    const txt = document.getElementById('upload-status-text');
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        txt.textContent = '✓ Image loaded successfully';
        window.showToast('Image loaded and ready for detection!', 'success');
      } else {
        txt.textContent = 'Loading image...';
      }
      bar.style.width = Math.min(progress, 100) + '%';
      pct.textContent = Math.round(Math.min(progress, 100)) + '%';
    }, 80);
  }

  function showUploadError(msg) {
    document.getElementById('upload-error').classList.remove('hidden');
    document.getElementById('upload-error-msg').textContent = msg;
    window.showToast(msg, 'error', 'Upload Failed');
  }

  function formatBytes(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024*1024) return (bytes/1024).toFixed(1) + ' KB';
    return (bytes/(1024*1024)).toFixed(2) + ' MB';
  }

  window.clearUpload = function() {
    uploadedFile = null;
    uploadedDataURL = null;
    window.AppState.uploadedImage = null;
    document.getElementById('preview-area').classList.add('hidden');
    document.getElementById('upload-zone-wrapper').classList.remove('hidden');
    document.getElementById('file-input').value = '';
    document.getElementById('upload-error').classList.add('hidden');
  };

  window.replaceFile = function() {
    document.getElementById('file-input').click();
  };

  window.loadSampleImage = function(url, label, buildings) {
    window.AppState.uploadedImage = { url, label, buildings, isDemo: true, name: label + '.jpg' };
    showSamplePreview(url, label);
    window.showToast(`Sample loaded: ${label} — ${buildings} buildings (DEMO)`, 'success', 'Demo Sample');
  };

  function showSamplePreview(url, label) {
    document.getElementById('upload-zone-wrapper').classList.add('hidden');
    const previewArea = document.getElementById('preview-area');
    previewArea.classList.remove('hidden');

    const img = document.getElementById('preview-img');
    img.src = url;
    img.onerror = () => { img.src = 'https://via.placeholder.com/640x400/020b18/38bdf8?text=Sample+Image'; };

    document.getElementById('preview-name').textContent = label.replace(/[🏙️🏘️🏢🌆]/g, '').trim() + '.jpg';
    document.getElementById('preview-size').textContent = '~4.2 MB (Demo)';
    document.getElementById('preview-dims').textContent = '1024 × 768px (Demo)';
    document.getElementById('preview-format').textContent = 'JPG (Demo)';

    // Instant "upload"
    const bar = document.getElementById('upload-progress-bar');
    const pct = document.getElementById('upload-pct');
    const txt = document.getElementById('upload-status-text');
    bar.style.width = '100%';
    pct.textContent = '100%';
    txt.textContent = '✓ Demo sample loaded';
  }

  window.proceedToDetection = function() {
    if (uploadedDataURL) {
      window.AppState.uploadedImage = { url: uploadedDataURL, name: uploadedFile?.name || 'image.jpg', isDemo: false };
    }
    if (!window.AppState.uploadedImage) {
      window.showToast('Please upload an image or select a demo sample first.', 'warning', 'No Image Selected');
      return;
    }
    navigateTo('detection');
  };
}
