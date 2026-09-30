// Settings Page — GeoBuild AI
export function renderSettings(container) {
  const state = window.AppState;
  const user = state.currentUser || {
    name: 'Demo Student',
    email: 'student@geobuild.ai',
    role: 'Student / Researcher',
    institution: 'National Institute of Technology'
  };

  // Saved preferences or defaults
  const savedSettings = JSON.parse(localStorage.getItem('geobuild-settings') || '{}');
  const activeTab = savedSettings.lastTab || 'profile';

  container.innerHTML = `
    <div class="fade-in">
      <div class="page-header">
        <div class="breadcrumb">
          <span>App</span>
          <span class="sep">/</span>
          <span class="current">Settings</span>
        </div>
        <h1 class="page-title">Platform Settings</h1>
        <p class="page-subtitle">Configure your profile, AI detection defaults, geospatial coordinates, and display preferences.</p>
      </div>

      <!-- Settings Layout -->
      <div style="display: grid; grid-template-columns: 240px 1fr; gap: 24px; align-items: start;">
        
        <!-- Navigation Pills -->
        <div class="card" style="padding: 12px; display: flex; flex-direction: column; gap: 4px;">
          <button class="settings-nav-btn ${activeTab === 'profile' ? 'active' : ''}" data-tab="profile">
            <span>👤</span> Profile & Account
          </button>
          <button class="settings-nav-btn ${activeTab === 'model' ? 'active' : ''}" data-tab="model">
            <span>🧠</span> AI & Model Inference
          </button>
          <button class="settings-nav-btn ${activeTab === 'geospatial' ? 'active' : ''}" data-tab="geospatial">
            <span>🗺️</span> GIS & Map Defaults
          </button>
          <button class="settings-nav-btn ${activeTab === 'appearance' ? 'active' : ''}" data-tab="appearance">
            <span>🎨</span> Appearance & Theme
          </button>
          <button class="settings-nav-btn ${activeTab === 'data' ? 'active' : ''}" data-tab="data">
            <span>💾</span> Data & Diagnostics
          </button>
        </div>

        <!-- Settings Content Panes -->
        <div id="settings-tab-content">
          <!-- Dynamically filled based on active tab -->
        </div>

      </div>
    </div>
  `;

  // Internal tab renderer
  function renderTab(tabKey) {
    const content = container.querySelector('#settings-tab-content');
    if (!content) return;

    // Update active tab buttons
    container.querySelectorAll('.settings-nav-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabKey);
    });

    // Save active tab
    savedSettings.lastTab = tabKey;
    localStorage.setItem('geobuild-settings', JSON.stringify(savedSettings));

    if (tabKey === 'profile') {
      content.innerHTML = `
        <div class="card card-lg fade-in">
          <div class="card-header">
            <div>
              <div class="card-title">User Profile & Institutional Credentials</div>
              <div class="card-subtitle">Manage your account information and academic affiliation</div>
            </div>
            <span class="badge ${state.isAuthenticated ? 'badge-success' : 'badge-warning'}">
              ${state.isAuthenticated ? 'Active Session' : 'Guest Mode'}
            </span>
          </div>

          <form id="profile-form" onsubmit="return false;">
            <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 24px; padding-bottom: 20px; border-bottom: 1px solid var(--border-color);">
              <div class="avatar" style="width: 64px; height: 64px; font-size: 1.5rem; font-weight: 700;">
                ${(user.name || 'U').charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 style="margin: 0 0 4px 0; font-size: 1.1rem; color: var(--text-primary);">${user.name || 'User'}</h3>
                <p style="margin: 0; font-size: 0.85rem; color: var(--text-muted);">${user.email || 'No email provided'}</p>
                <div style="margin-top: 6px; display: flex; gap: 8px;">
                  <span class="badge" style="background: rgba(56,189,248,0.15); color: var(--accent-cyan); border: 1px solid rgba(56,189,248,0.3); font-size: 0.75rem;">
                    ${user.role || 'Student / Researcher'}
                  </span>
                  <span class="badge" style="background: rgba(34,197,94,0.15); color: var(--accent-green); font-size: 0.75rem;">
                    Academic License
                  </span>
                </div>
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
              <div class="form-group">
                <label class="form-label" for="setting-name">Full Name</label>
                <input class="form-control" type="text" id="setting-name" value="${user.name || ''}" placeholder="Dr. Jane Doe" />
              </div>

              <div class="form-group">
                <label class="form-label" for="setting-email">Email Address</label>
                <input class="form-control" type="email" id="setting-email" value="${user.email || ''}" placeholder="jane@university.edu" />
              </div>

              <div class="form-group">
                <label class="form-label" for="setting-role">Primary Role</label>
                <select class="form-control" id="setting-role">
                  <option value="Student / Researcher" ${user.role === 'Student / Researcher' ? 'selected' : ''}>Student / Researcher</option>
                  <option value="Urban Planner" ${user.role === 'Urban Planner' ? 'selected' : ''}>Urban Planner</option>
                  <option value="GIS Specialist" ${user.role === 'GIS Specialist' ? 'selected' : ''}>GIS Specialist</option>
                  <option value="Computer Vision Engineer" ${user.role === 'Computer Vision Engineer' ? 'selected' : ''}>Computer Vision Engineer</option>
                  <option value="Academic Evaluator" ${user.role === 'Academic Evaluator' ? 'selected' : ''}>Academic Evaluator</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label" for="setting-institution">Institution / Department</label>
                <input class="form-control" type="text" id="setting-institution" value="${user.institution || 'Department of Computer Science & Geospatial Studies'}" />
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" for="setting-bio">Academic Research Focus / Bio</label>
              <textarea class="form-control" id="setting-bio" rows="3" placeholder="Brief description of your research work in building footprint extraction, remote sensing, and satellite CV...">${user.bio || 'Automated feature extraction and semantic segmentation of built environments from multi-spectral high-resolution satellite imagery.'}</textarea>
            </div>

            <div style="display: flex; justify-content: flex-end; gap: 12px; margin-top: 20px;">
              <button type="button" class="btn btn-secondary" onclick="renderSettings(document.getElementById('main-content'))">Reset Changes</button>
              <button type="button" class="btn btn-primary" id="save-profile-btn">💾 Save Profile</button>
            </div>
          </form>
        </div>
      `;

      content.querySelector('#save-profile-btn').addEventListener('click', () => {
        const updatedName = content.querySelector('#setting-name').value.trim();
        const updatedEmail = content.querySelector('#setting-email').value.trim();
        const updatedRole = content.querySelector('#setting-role').value;
        const updatedInst = content.querySelector('#setting-institution').value.trim();
        const updatedBio = content.querySelector('#setting-bio').value.trim();

        if (!updatedName) {
          window.showToast('Please enter your full name', 'warning');
          return;
        }

        const newUser = {
          ...user,
          name: updatedName,
          email: updatedEmail,
          role: updatedRole,
          institution: updatedInst,
          bio: updatedBio,
          avatar: updatedName.charAt(0).toUpperCase()
        };

        state.currentUser = newUser;
        sessionStorage.setItem('geobuild-user', JSON.stringify(newUser));
        window.showToast('Profile updated successfully!', 'success', 'Changes Saved');

        // Re-render navbar & sidebar if user changed
        const navContainer = document.getElementById('navbar-container');
        const sideContainer = document.getElementById('sidebar-container');
        if (navContainer) {
          import('../components/navbar.js').then(m => m.renderNavbar(navContainer, { showHamburger: true, isApp: true }));
        }
        if (sideContainer) {
          import('../components/sidebar.js').then(m => m.renderSidebar(sideContainer));
        }
        renderTab('profile');
      });

    } else if (tabKey === 'model') {
      const config = state.detectionConfig || { model: 'segmentation', confidence: 0.5, mode: 'balanced' };

      content.innerHTML = `
        <div class="card card-lg fade-in">
          <div class="card-header">
            <div>
              <div class="card-title">AI Model & Neural Inference Settings</div>
              <div class="card-subtitle">Default parameters for building detection pipeline, segmentation architecture, and post-processing</div>
            </div>
            <span class="badge badge-primary">Deep Learning</span>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <div class="form-group">
              <label class="form-label">Default Segmentation Architecture</label>
              <select class="form-control" id="default-model-select">
                <option value="unet-resnet34" ${config.model === 'unet-resnet34' || config.model === 'segmentation' ? 'selected' : ''}>U-Net with ResNet-34 Backbone (F1: 0.89)</option>
                <option value="mask-rcnn" ${config.model === 'mask-rcnn' ? 'selected' : ''}>Mask R-CNN Instance Segmentation (F1: 0.91)</option>
                <option value="segnet" ${config.model === 'segnet' ? 'selected' : ''}>SegNet Deep Convolutional (F1: 0.85)</option>
                <option value="yolov8-obb" ${config.model === 'yolov8-obb' ? 'selected' : ''}>YOLOv8-OBB Oriented Bounding Box (Fast)</option>
              </select>
              <small style="color: var(--text-muted); font-size: 0.75rem; display: block; margin-top: 4px;">Pre-trained weights initialized from SpaceNet 7 & Inria Aerial Dataset.</small>
            </div>

            <div class="form-group">
              <label class="form-label">Inference Execution Mode</label>
              <select class="form-control" id="default-mode-select">
                <option value="balanced" ${config.mode === 'balanced' ? 'selected' : ''}>Balanced (512×512 tiles, 50% overlap)</option>
                <option value="accuracy" ${config.mode === 'accuracy' ? 'selected' : ''}>High Precision (1024×1024 multi-scale TTA)</option>
                <option value="fast" ${config.mode === 'fast' ? 'selected' : ''}>Fast Preview (256×256 low latency)</option>
              </select>
            </div>
          </div>

          <div class="form-group" style="margin-top: 10px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <label class="form-label" style="margin: 0;">Default Confidence Threshold: <span id="conf-val" style="color: var(--accent-cyan); font-weight: 700;">${Math.round((config.confidence || 0.5) * 100)}%</span></label>
              <span style="font-size: 0.75rem; color: var(--text-muted);">Lower = more detections; Higher = fewer false positives</span>
            </div>
            <input type="range" class="form-control" id="default-conf-range" min="10" max="95" value="${Math.round((config.confidence || 0.5) * 100)}" style="accent-color: var(--accent-cyan);" />
          </div>

          <div style="margin-top: 24px; padding-top: 20px; border-top: 1px solid var(--border-color);">
            <h4 style="margin: 0 0 14px 0; font-size: 0.95rem; color: var(--text-primary);">Post-Processing & Polygon Refinement</h4>
            
            <div style="display: flex; flex-direction: column; gap: 12px;">
              <label style="display: flex; align-items: center; gap: 12px; cursor: pointer;">
                <input type="checkbox" id="setting-douglas-peucker" checked style="accent-color: var(--accent-cyan); width: 18px; height: 18px;" />
                <div>
                  <div style="font-size: 0.875rem; font-weight: 600; color: var(--text-primary);">Douglas-Peucker Polygon Simplification</div>
                  <div style="font-size: 0.75rem; color: var(--text-muted);">Reduces jagged raster stair-stepping to sharp vector building footprints (ε = 1.5m).</div>
                </div>
              </label>

              <label style="display: flex; align-items: center; gap: 12px; cursor: pointer;">
                <input type="checkbox" id="setting-nms" checked style="accent-color: var(--accent-cyan); width: 18px; height: 18px;" />
                <div>
                  <div style="font-size: 0.875rem; font-weight: 600; color: var(--text-primary);">Non-Maximum Suppression (NMS) Overlap Pruning</div>
                  <div style="font-size: 0.75rem; color: var(--text-muted);">Eliminates duplicate overlapping footprints at tile seams (IoU threshold = 0.45).</div>
                </div>
              </label>

              <label style="display: flex; align-items: center; gap: 12px; cursor: pointer;">
                <input type="checkbox" id="setting-min-area" checked style="accent-color: var(--accent-cyan); width: 18px; height: 18px;" />
                <div>
                  <div style="font-size: 0.875rem; font-weight: 600; color: var(--text-primary);">Minimum Area Filter (Suppress Objects < 25 m²)</div>
                  <div style="font-size: 0.75rem; color: var(--text-muted);">Filters out small noise, vehicles, and tree crowns that resemble small structures.</div>
                </div>
              </label>

              <label style="display: flex; align-items: center; gap: 12px; cursor: pointer;">
                <input type="checkbox" id="setting-gpu-accel" checked style="accent-color: var(--accent-cyan); width: 18px; height: 18px;" />
                <div>
                  <div style="font-size: 0.875rem; font-weight: 600; color: var(--text-primary);">Simulated Hardware Acceleration (WebGL / WASM Pipeline)</div>
                  <div style="font-size: 0.75rem; color: var(--text-muted);">Simulate high-throughput GPU matrix multiplications for fast preview response.</div>
                </div>
              </label>
            </div>
          </div>

          <div style="display: flex; justify-content: flex-end; gap: 12px; margin-top: 24px;">
            <button type="button" class="btn btn-secondary" onclick="renderSettings(document.getElementById('main-content'))">Reset Defaults</button>
            <button type="button" class="btn btn-primary" id="save-model-btn">💾 Save Model Config</button>
          </div>
        </div>
      `;

      const confSlider = content.querySelector('#default-conf-range');
      const confVal = content.querySelector('#conf-val');
      confSlider.addEventListener('input', (e) => {
        confVal.textContent = e.target.value + '%';
      });

      content.querySelector('#save-model-btn').addEventListener('click', () => {
        const selectedModel = content.querySelector('#default-model-select').value;
        const selectedMode = content.querySelector('#default-mode-select').value;
        const selectedConf = parseInt(confSlider.value, 10) / 100;

        state.detectionConfig = {
          model: selectedModel,
          mode: selectedMode,
          confidence: selectedConf
        };

        savedSettings.detectionConfig = state.detectionConfig;
        localStorage.setItem('geobuild-settings', JSON.stringify(savedSettings));

        window.showToast('Model preferences saved!', 'success', 'Inference Config');
      });

    } else if (tabKey === 'geospatial') {
      content.innerHTML = `
        <div class="card card-lg fade-in">
          <div class="card-header">
            <div>
              <div class="card-title">Geospatial Information Systems (GIS) & Map Configuration</div>
              <div class="card-subtitle">Coordinate reference systems, satellite base layer providers, and vector rendering styles</div>
            </div>
            <span class="badge" style="background: rgba(20,184,166,0.15); color: var(--accent-teal);">GIS Engine</span>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <div class="form-group">
              <label class="form-label">Default Coordinate Reference System (CRS)</label>
              <select class="form-control" id="setting-crs">
                <option value="EPSG:4326" selected>EPSG:4326 — WGS 84 (GPS standard coordinates)</option>
                <option value="EPSG:3857">EPSG:3857 — Pseudo-Mercator (Web maps standard)</option>
                <option value="EPSG:32643">EPSG:32643 — UTM Zone 43N (India West)</option>
                <option value="EPSG:32644">EPSG:32644 — UTM Zone 44N (India Central)</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Satellite Imagery Basemap Provider</label>
              <select class="form-control" id="setting-basemap">
                <option value="esri" selected>Esri World Imagery (High-Res True Color Satellite)</option>
                <option value="carto-dark">CartoDB Dark Matter (Dark GIS Theme)</option>
                <option value="osm">OpenStreetMap Standard (Vector Street Layer)</option>
              </select>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <div class="form-group">
              <label class="form-label">Default Region of Interest (ROI)</label>
              <select class="form-control" id="setting-default-city">
                <option value="ahmedabad" selected>Ahmedabad, Gujarat [23.0225° N, 72.5714° E]</option>
                <option value="mumbai">Mumbai Suburban [19.0760° N, 72.8777° E]</option>
                <option value="delhi">Delhi NCR Industrial Belt [28.6139° N, 77.2090° E]</option>
                <option value="bengaluru">Bengaluru Tech Corridor [12.9716° N, 77.5946° E]</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Default Vector Polygon Outline Color</label>
              <div style="display: flex; gap: 10px; align-items: center; margin-top: 4px;">
                <input type="color" id="setting-poly-color" value="#38bdf8" style="width: 44px; height: 38px; border: 1px solid var(--border-color); border-radius: var(--radius-sm); cursor: pointer; background: transparent;" />
                <span style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--text-secondary);">#38bdf8 (Geo Cyan)</span>
              </div>
            </div>
          </div>

          <div style="display: flex; justify-content: flex-end; gap: 12px; margin-top: 24px;">
            <button type="button" class="btn btn-secondary" onclick="renderSettings(document.getElementById('main-content'))">Reset</button>
            <button type="button" class="btn btn-primary" id="save-gis-btn">💾 Save GIS Settings</button>
          </div>
        </div>
      `;

      content.querySelector('#save-gis-btn').addEventListener('click', () => {
        window.showToast('GIS & Map defaults successfully saved!', 'success');
      });

    } else if (tabKey === 'appearance') {
      const currentTheme = state.theme || 'dark';

      content.innerHTML = `
        <div class="card card-lg fade-in">
          <div class="card-header">
            <div>
              <div class="card-title">User Interface Appearance & Themes</div>
              <div class="card-subtitle">Personalize your color palette, dark mode contrast, and visual density</div>
            </div>
            <span class="badge badge-primary">UI Theme</span>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px;">
            <!-- Dark Theme Option -->
            <div id="theme-card-dark" style="border: 2px solid ${currentTheme === 'dark' ? 'var(--accent-cyan)' : 'var(--border-color)'}; border-radius: var(--radius-md); padding: 18px; cursor: pointer; background: #020b18; transition: var(--transition);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                <span style="font-weight: 700; color: #f0f6ff; font-size: 1rem;">🌌 Deep Space Dark</span>
                <span style="color: var(--accent-cyan); font-size: 1.2rem;">${currentTheme === 'dark' ? '✓' : ''}</span>
              </div>
              <p style="font-size: 0.8rem; color: #94b4d4; margin: 0 0 12px 0;">Optimized for satellite imagery inspection, reducing eye fatigue during long sessions.</p>
              <div style="display: flex; gap: 6px;">
                <span style="display:inline-block; width: 24px; height: 12px; border-radius: 4px; background: #38bdf8;"></span>
                <span style="display:inline-block; width: 24px; height: 12px; border-radius: 4px; background: #3b82f6;"></span>
                <span style="display:inline-block; width: 24px; height: 12px; border-radius: 4px; background: #22c55e;"></span>
              </div>
            </div>

            <!-- Light Theme Option -->
            <div id="theme-card-light" style="border: 2px solid ${currentTheme === 'light' ? 'var(--accent-cyan)' : 'var(--border-color)'}; border-radius: var(--radius-md); padding: 18px; cursor: pointer; background: #f0f4f8; transition: var(--transition);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                <span style="font-weight: 700; color: #020b18; font-size: 1rem;">☀️ Academic Light</span>
                <span style="color: var(--accent-cyan); font-size: 1.2rem;">${currentTheme === 'light' ? '✓' : ''}</span>
              </div>
              <p style="font-size: 0.8rem; color: #4b5563; margin: 0 0 12px 0;">Clean, high-contrast academic print layout ideal for classroom projectors & daytime presentations.</p>
              <div style="display: flex; gap: 6px;">
                <span style="display:inline-block; width: 24px; height: 12px; border-radius: 4px; background: #0284c7;"></span>
                <span style="display:inline-block; width: 24px; height: 12px; border-radius: 4px; background: #2563eb;"></span>
                <span style="display:inline-block; width: 24px; height: 12px; border-radius: 4px; background: #16a34a;"></span>
              </div>
            </div>
          </div>

          <div style="padding-top: 16px; border-top: 1px solid var(--border-color);">
            <div class="form-group">
              <label class="form-label">Interface Animation Level</label>
              <select class="form-control" id="setting-anim">
                <option value="full" selected>Full Cinematic Micro-animations & Glows (Default)</option>
                <option value="reduced">Reduced Motion (Accessible & High Performance)</option>
              </select>
            </div>
          </div>

          <div style="display: flex; justify-content: flex-end; gap: 12px; margin-top: 24px;">
            <button type="button" class="btn btn-primary" id="save-appearance-btn">💾 Apply Theme</button>
          </div>
        </div>
      `;

      content.querySelector('#theme-card-dark').addEventListener('click', () => {
        window.applyTheme('dark');
        renderTab('appearance');
        window.showToast('Switched to Dark Theme', 'info');
      });

      content.querySelector('#theme-card-light').addEventListener('click', () => {
        window.applyTheme('light');
        renderTab('appearance');
        window.showToast('Switched to Light Theme', 'info');
      });

      content.querySelector('#save-appearance-btn').addEventListener('click', () => {
        window.showToast('Appearance settings saved!', 'success');
      });

    } else if (tabKey === 'data') {
      content.innerHTML = `
        <div class="card card-lg fade-in">
          <div class="card-header">
            <div>
              <div class="card-title">Data Storage, Demo State & Diagnostics</div>
              <div class="card-subtitle">Manage browser session storage, reset demo datasets, or export full diagnostic telemetry</div>
            </div>
            <span class="badge badge-primary">Cache Management</span>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; margin-bottom: 24px;">
            <div class="card card-glass" style="padding: 16px;">
              <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 4px;">LocalStorage Footprint</div>
              <div style="font-size: 1.4rem; font-weight: 800; color: var(--accent-cyan); font-family: var(--font-mono);">
                ${((JSON.stringify(localStorage).length) / 1024).toFixed(1)} KB
              </div>
            </div>
            <div class="card card-glass" style="padding: 16px;">
              <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 4px;">Active Session Cache</div>
              <div style="font-size: 1.4rem; font-weight: 800; color: var(--accent-green); font-family: var(--font-mono);">
                ${((JSON.stringify(sessionStorage).length) / 1024).toFixed(1)} KB
              </div>
            </div>
            <div class="card card-glass" style="padding: 16px;">
              <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 4px;">Demo Records Loaded</div>
              <div style="font-size: 1.4rem; font-weight: 800; color: var(--accent-purple); font-family: var(--font-mono);">
                28 Items
              </div>
            </div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 16px;">
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 16px; border: 1px solid var(--border-color); border-radius: var(--radius-sm); background: var(--bg-card);">
              <div>
                <div style="font-weight: 600; color: var(--text-primary); font-size: 0.95rem;">Export Complete GeoBuild AI Bundle</div>
                <div style="font-size: 0.8rem; color: var(--text-muted);">Download detection history, configured projects, and model parameters as JSON.</div>
              </div>
              <button class="btn btn-secondary btn-sm" id="export-json-btn">⬇ Export JSON</button>
            </div>

            <div style="display: flex; align-items: center; justify-content: space-between; padding: 16px; border: 1px solid var(--border-color); border-radius: var(--radius-sm); background: var(--bg-card);">
              <div>
                <div style="font-weight: 600; color: var(--text-primary); font-size: 0.95rem;">Reset Demo State to Clean Baseline</div>
                <div style="font-size: 0.8rem; color: var(--text-muted);">Re-initialize all demo datasets, reset uploaded image cache, and restore defaults.</div>
              </div>
              <button class="btn btn-ghost btn-sm" id="reset-demo-btn">🔄 Reset Demo Data</button>
            </div>

            <div style="display: flex; align-items: center; justify-content: space-between; padding: 16px; border: 1px solid rgba(239,68,68,0.3); border-radius: var(--radius-sm); background: rgba(239,68,68,0.05);">
              <div>
                <div style="font-weight: 600; color: var(--accent-red); font-size: 0.95rem;">Clear All Local Application Data</div>
                <div style="font-size: 0.8rem; color: var(--text-muted);">Wipes all localStorage items, clears active session, and logs out.</div>
              </div>
              <button class="btn btn-danger btn-sm" id="wipe-data-btn">🗑 Wipe Local Cache</button>
            </div>
          </div>
        </div>
      `;

      content.querySelector('#export-json-btn').addEventListener('click', () => {
        import('../data/demoData.js').then(m => {
          const exportData = {
            exportedAt: new Date().toISOString(),
            app: 'GeoBuild AI',
            version: '1.0.0',
            user: state.currentUser,
            settings: state.detectionConfig,
            projects: m.DEMO_PROJECTS,
            detections: m.DEMO_DETECTIONS,
            stats: m.DEMO_STATS
          };
          const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `geobuild_ai_export_${Date.now()}.json`;
          a.click();
          URL.revokeObjectURL(url);
          window.showToast('Project bundle downloaded!', 'success');
        });
      });

      content.querySelector('#reset-demo-btn').addEventListener('click', () => {
        state.uploadedImage = null;
        window.showToast('Demo data reset to clean college demonstration baseline!', 'success');
      });

      content.querySelector('#wipe-data-btn').addEventListener('click', () => {
        if (confirm('Are you sure you want to clear all stored preferences and cache?')) {
          localStorage.clear();
          sessionStorage.clear();
          window.showToast('Cache cleared. Reloading...', 'info');
          setTimeout(() => {
            window.location.reload();
          }, 800);
        }
      });
    }
  }

  // Bind tab nav buttons
  container.querySelectorAll('.settings-nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      renderTab(btn.dataset.tab);
    });
  });

  // Render initial tab
  renderTab(activeTab);
}
