// Home / Landing Page
export function renderHome(container) {
  container.innerHTML = `
    <div class="landing-page fade-in">

      <!-- HERO SECTION -->
      <section class="hero" aria-labelledby="hero-heading">
        <div class="hero-bg"></div>
        <div class="grid-overlay" aria-hidden="true"></div>

        <div class="hero-content">
          <div class="hero-text">
            <div class="hero-eyebrow" role="doc-subtitle">
              🛰️ &nbsp; AI-Powered Geospatial Platform
            </div>
            <h1 class="hero-title" id="hero-heading">
              Detect Buildings from<br>
              <span class="gradient-text">Satellite Images with AI</span>
            </h1>
            <p class="hero-subtitle">
              Analyze satellite imagery, identify building footprints, visualize detected structures, and generate meaningful geospatial insights — powered by deep learning.
            </p>
            <div class="hero-actions">
              <button class="btn btn-primary btn-lg" onclick="navigateTo('register')" id="hero-start-btn">
                🚀 Start Detection
              </button>
              <button class="btn btn-outline-cyan btn-lg" onclick="startDemo()" id="hero-demo-btn">
                ▶️ Explore Demo
              </button>
            </div>
            <div class="hero-stats" role="list" aria-label="Platform statistics">
              <div class="hero-stat-item" role="listitem">
                <div class="hero-stat-value">U-Net</div>
                <div class="hero-stat-label">Architecture</div>
              </div>
              <div class="hero-stat-item" role="listitem">
                <div class="hero-stat-value">Demo</div>
                <div class="hero-stat-label">Mode Active</div>
              </div>
              <div class="hero-stat-item" role="listitem">
                <div class="hero-stat-value">4+</div>
                <div class="hero-stat-label">Sample Datasets</div>
              </div>
              <div class="hero-stat-item" role="listitem">
                <div class="hero-stat-value">100%</div>
                <div class="hero-stat-label">Open Source Ready</div>
              </div>
            </div>
          </div>

          <div class="hero-visual float-anim" aria-label="Building detection visualization" role="img">
            <div class="hero-visual-card">
              <div class="hero-visual-header">
                <div class="dot red"></div>
                <div class="dot yellow"></div>
                <div class="dot green"></div>
                <span class="window-title">geobuild-ai — detection_workspace.py</span>
              </div>
              <div class="hero-image-container">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Biharwe-aerial.jpg/640px-Biharwe-aerial.jpg"
                  alt="Sample aerial satellite image showing buildings"
                  loading="lazy"
                  onerror="this.src='https://via.placeholder.com/640x400/020b18/38bdf8?text=Satellite+Image'"
                />
                <div class="detection-overlay" aria-hidden="true">
                  <div class="detection-box high" style="top:18%;left:12%;width:18%;height:14%;">
                    <span class="detection-label">BLD_001 — 0.94</span>
                  </div>
                  <div class="detection-box medium" style="top:35%;left:52%;width:22%;height:18%;">
                    <span class="detection-label">BLD_002 — 0.87</span>
                  </div>
                  <div class="detection-box high" style="top:60%;left:20%;width:16%;height:12%;">
                    <span class="detection-label">BLD_003 — 0.92</span>
                  </div>
                  <div class="detection-box low" style="top:72%;left:65%;width:20%;height:16%;">
                    <span class="detection-label">BLD_004 — 0.68</span>
                  </div>
                  <div class="detection-box medium" style="top:10%;left:68%;width:14%;height:10%;">
                    <span class="detection-label">BLD_005 — 0.81</span>
                  </div>
                </div>
              </div>
              <div class="hero-stats-bar" aria-hidden="true">
                <div class="hero-stat-chip">
                  <div class="chip-value">5</div>
                  <div class="chip-label">Detected</div>
                </div>
                <div class="hero-stat-chip">
                  <div class="chip-value">0.84</div>
                  <div class="chip-label">Avg Conf.</div>
                </div>
                <div class="hero-stat-chip">
                  <div class="chip-value">34.2s</div>
                  <div class="chip-label">Process Time</div>
                </div>
                <div class="hero-stat-chip">
                  <div class="chip-value" style="color:var(--accent-orange)">DEMO</div>
                  <div class="chip-label">Mode</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- FEATURES SECTION -->
      <section class="section" aria-labelledby="features-heading">
        <div class="section-header">
          <div class="section-eyebrow">✨ Platform Features</div>
          <h2 class="section-title" id="features-heading">Everything You Need for Building Detection</h2>
          <p class="section-desc">A complete geospatial AI toolkit for analyzing satellite imagery and extracting meaningful urban insights.</p>
        </div>

        <div class="grid grid-3" style="gap:20px;">
          ${[
            { icon: '🏗️', color: 'cyan', title: 'AI Building Detection', desc: 'Deep learning models identify and segment building footprints from high-resolution satellite imagery with configurable confidence thresholds.' },
            { icon: '🛰️', color: 'blue', title: 'Satellite Image Analysis', desc: 'Process various satellite image formats including JPG, PNG, TIFF, and GeoTIFF. Built-in preprocessing and normalization pipeline.' },
            { icon: '🗺️', color: 'teal', title: 'Interactive Maps', desc: 'Visualize detected building polygons on interactive Leaflet maps with layer controls, zoom, and satellite/street view switching.' },
            { icon: '📊', color: 'purple', title: 'Detection Statistics', desc: 'Comprehensive analytics including building counts, coverage area, confidence distributions, and spatial density charts.' },
            { icon: '🔄', color: 'green', title: 'Image Comparison', desc: 'Interactive before/after slider to compare original satellite images with detection overlays and building masks.' },
            { icon: '📥', color: 'orange', title: 'Exportable Results', desc: 'Export detection results as images, CSV, JSON, or GeoJSON. Generate comprehensive PDF analysis reports.' },
          ].map(f => `
            <div class="feature-card">
              <div class="feature-icon" style="background:rgba(56,189,248,0.1);">
                ${f.icon}
              </div>
              <h3 class="feature-title">${f.title}</h3>
              <p class="feature-desc">${f.desc}</p>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- HOW IT WORKS -->
      <div style="background:var(--bg-secondary);padding:2px 0;">
        <section class="section" aria-labelledby="how-heading">
          <div class="section-header">
            <div class="section-eyebrow">📋 Workflow</div>
            <h2 class="section-title" id="how-heading">How It Works</h2>
            <p class="section-desc">A streamlined 6-step pipeline from raw satellite imagery to actionable geospatial insights.</p>
          </div>
          <div class="steps-flow" role="list">
            ${[
              { n: '01', icon: '📤', title: 'Upload Satellite Image' },
              { n: '02', icon: '⚙️', title: 'Preprocess Image' },
              { n: '03', icon: '🤖', title: 'AI Detection' },
              { n: '04', icon: '🏗️', title: 'Generate Building Masks' },
              { n: '05', icon: '📊', title: 'Analyze Results' },
              { n: '06', icon: '📥', title: 'Export Report' },
            ].map(s => `
              <div class="step-item" role="listitem">
                <div class="step-number">${s.n}</div>
                <div class="step-icon">${s.icon}</div>
                <div class="step-title">${s.title}</div>
              </div>
            `).join('')}
          </div>
        </section>
      </div>

      <!-- STATS BAND -->
      <div class="stats-band" aria-labelledby="stats-heading">
        <h2 class="sr-only" id="stats-heading">Platform Overview</h2>
        <div class="stats-band-inner">
          <div class="stats-band-item">
            <div class="stats-band-value">Demo</div>
            <div class="stats-band-label">Satellite Image Analysis</div>
            <div class="stats-band-sublabel">Sample mode active</div>
          </div>
          <div class="stats-band-item">
            <div class="stats-band-value">U-Net</div>
            <div class="stats-band-label">Building Detection Model</div>
            <div class="stats-band-sublabel">Model-dependent accuracy</div>
          </div>
          <div class="stats-band-item">
            <div class="stats-band-value">4+</div>
            <div class="stats-band-label">Geospatial Visualizations</div>
            <div class="stats-band-sublabel">Maps, charts, overlays</div>
          </div>
          <div class="stats-band-item">
            <div class="stats-band-value">AI</div>
            <div class="stats-band-label">AI-Based Segmentation</div>
            <div class="stats-band-sublabel">Semantic segmentation</div>
          </div>
        </div>
      </div>

      <!-- TECHNOLOGY SECTION -->
      <section class="section" aria-labelledby="tech-heading">
        <div class="section-header">
          <div class="section-eyebrow">⚡ Technology</div>
          <h2 class="section-title" id="tech-heading">Powered by Modern AI & Geospatial Tech</h2>
          <p class="section-desc">Built on state-of-the-art computer vision and geospatial analysis technologies.</p>
        </div>
        <div class="tech-grid" role="list">
          ${[
            { icon: '👁️', label: 'Computer Vision' },
            { icon: '🧠', label: 'Deep Learning' },
            { icon: '🛰️', label: 'Satellite Imagery' },
            { icon: '✂️', label: 'Image Segmentation' },
            { icon: '📍', label: 'Geospatial Analysis' },
            { icon: '🗺️', label: 'Interactive Mapping' },
            { icon: '🔢', label: 'Remote Sensing' },
            { icon: '📐', label: 'Feature Extraction' },
            { icon: '🏗️', label: 'U-Net Architecture' },
            { icon: '📡', label: 'Raster Processing' },
          ].map(t => `
            <div class="tech-tag" role="listitem">
              <span class="tag-icon">${t.icon}</span>
              <span>${t.label}</span>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- APPLICATIONS -->
      <div style="background:var(--bg-secondary);padding:2px 0;">
        <section class="section" aria-labelledby="apps-heading">
          <div class="section-header">
            <div class="section-eyebrow">🏙️ Applications</div>
            <h2 class="section-title" id="apps-heading">Real-World Applications</h2>
            <p class="section-desc">Building detection from satellite imagery enables a wide range of geospatial intelligence applications.</p>
          </div>
          <div class="grid grid-3">
            ${[
              { icon: '🏙️', title: 'Urban Planning', desc: 'Analyze building density, land use, and urban growth patterns to support city planning decisions.' },
              { icon: '🌆', title: 'Smart Cities', desc: 'Map infrastructure, monitor urban development, and enable data-driven city management systems.' },
              { icon: '🌊', title: 'Disaster Assessment', desc: 'Rapidly assess building damage after floods, earthquakes, or other disasters for emergency response.' },
              { icon: '🏗️', title: 'Infrastructure Monitoring', desc: 'Track construction progress, monitor building condition, and detect unauthorized structures.' },
              { icon: '🌱', title: 'Land Use Analysis', desc: 'Quantify built-up areas, measure urbanization rates, and analyze land cover changes over time.' },
              { icon: '📈', title: 'Urban Growth Studies', desc: 'Study population density, estimate urban sprawl, and support academic geospatial research.' },
            ].map(a => `
              <div class="application-card">
                <div class="application-icon">${a.icon}</div>
                <h3 class="application-title">${a.title}</h3>
                <p class="application-desc">${a.desc}</p>
              </div>
            `).join('')}
          </div>
        </section>
      </div>

      <!-- FAQ -->
      <section class="section" aria-labelledby="faq-heading">
        <div class="section-header">
          <div class="section-eyebrow">❓ FAQ</div>
          <h2 class="section-title" id="faq-heading">Frequently Asked Questions</h2>
        </div>
        <div class="faq-list" role="list">
          ${[
            { q: 'What is building detection from satellite imagery?', a: 'Building detection is the process of using computer vision and AI algorithms to automatically identify and locate buildings in aerial or satellite images. The system segments image pixels belonging to built structures and generates building footprint polygons.' },
            { q: 'How does the AI detect buildings?', a: 'The platform uses deep learning models (such as U-Net or DeepLabV3) trained on labeled satellite image datasets. The model learns to distinguish building rooftops from surrounding vegetation, roads, and water bodies using visual features extracted from the image.' },
            { q: 'What image formats are supported?', a: 'The platform supports JPG, JPEG, PNG, TIFF, and GeoTIFF formats. For best results, use high-resolution images (minimum 0.5m/pixel GSD). Very large files may need preprocessing for optimal performance.' },
            { q: 'Can I upload my own satellite images?', a: 'Yes! You can upload your own satellite or aerial images in supported formats. The platform will preprocess and analyze the image using the selected detection model and configuration.' },
            { q: 'Is the detection result real-time?', a: 'Demo Mode results are pre-generated and displayed instantly. When connected to a real ML backend, processing time depends on image size and the selected accuracy mode (typically 15–60 seconds per image).' },
            { q: 'Can results be exported?', a: 'Yes. Detection results can be exported as annotated images, CSV (building list), JSON (full detection metadata), GeoJSON (spatial polygons, if coordinates available), and comprehensive PDF reports.' },
            { q: 'Can the platform use a real ML model?', a: 'Yes. The platform is architected with a clean detectionService.js API layer. Connect any Python FastAPI or Node.js backend serving a real segmentation model (U-Net, DeepLabV3, YOLO-Seg, Mask R-CNN) by updating the API endpoint in the service configuration.' },
            { q: 'What is Demo Mode?', a: 'Demo Mode displays pre-generated example results from sample satellite images so you can explore all platform features without a live ML backend. All demo results are clearly labeled "DEMO DATA" and do not represent real AI inference.' },
          ].map((item, i) => `
            <div class="faq-item" role="listitem">
              <button class="faq-question" onclick="toggleFaq(this)" aria-expanded="false" id="faq-q-${i}">
                <span>${item.q}</span>
                <span class="faq-chevron" aria-hidden="true">▼</span>
              </button>
              <div class="faq-answer" role="region" aria-labelledby="faq-q-${i}">${item.a}</div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- CTA SECTION -->
      <section class="cta-section" aria-labelledby="cta-heading">
        <div class="cta-card">
          <h2 class="cta-title" id="cta-heading">Ready to Analyze Satellite Images?</h2>
          <p class="cta-subtitle">Start detecting buildings from your satellite imagery today. No complex setup required.</p>
          <div class="cta-actions">
            <button class="btn btn-primary btn-lg" onclick="navigateTo('register')" id="cta-start-btn">🚀 Get Started Free</button>
            <button class="btn btn-outline-cyan btn-lg" onclick="navigateTo('about')" id="cta-learn-btn">📖 Learn More</button>
          </div>
        </div>
      </section>

      <!-- FOOTER -->
      <footer class="footer" role="contentinfo">
        <div class="footer-inner">
          <div class="footer-grid">
            <div>
              <div class="footer-brand-name">
                <div class="logo-icon" style="width:30px;height:30px;border-radius:7px;background:linear-gradient(135deg,var(--accent-cyan),var(--accent-blue));display:flex;align-items:center;justify-content:center;font-size:15px;">🛰️</div>
                GeoBuild AI
              </div>
              <p class="footer-brand-desc">AI-powered satellite image analysis platform for detecting and visualizing building structures and urban environments.</p>
            </div>
            <div>
              <div class="footer-col-title">Platform</div>
              <nav class="footer-links" aria-label="Platform links">
                <a class="footer-link" href="#" onclick="navigateTo('home');return false;">Home</a>
                <a class="footer-link" href="#" onclick="navigateTo('dashboard');return false;">Dashboard</a>
                <a class="footer-link" href="#" onclick="navigateTo('upload');return false;">Upload Image</a>
                <a class="footer-link" href="#" onclick="navigateTo('detection');return false;">Detection Workspace</a>
                <a class="footer-link" href="#" onclick="navigateTo('map');return false;">Map View</a>
              </nav>
            </div>
            <div>
              <div class="footer-col-title">Learn</div>
              <nav class="footer-links" aria-label="Learn links">
                <a class="footer-link" href="#" onclick="navigateTo('about');return false;">About the Project</a>
                <a class="footer-link" href="#" onclick="scrollToSection('how-heading');return false;">How It Works</a>
                <a class="footer-link" href="#" onclick="scrollToSection('faq-heading');return false;">FAQ</a>
                <a class="footer-link" href="#" onclick="navigateTo('about');return false;">AI Technology</a>
              </nav>
            </div>
            <div>
              <div class="footer-col-title">Tech Stack</div>
              <div class="footer-links">
                <span class="footer-link">Python / OpenCV</span>
                <span class="footer-link">Deep Learning (U-Net)</span>
                <span class="footer-link">Leaflet Maps</span>
                <span class="footer-link">Firebase Ready</span>
                <span class="footer-link">JavaScript ES2023</span>
              </div>
            </div>
          </div>
          <div class="footer-bottom">
            <span>© 2026 GeoBuild AI — Academic Research Project</span>
            <span>Building Detection from Satellite Images | Computer Vision & Geospatial AI</span>
          </div>
        </div>
      </footer>
    </div>
  `;

  // FAQ toggle
  window.toggleFaq = function(btn) {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
    btn.setAttribute('aria-expanded', !isOpen);
  };

  window.scrollToSection = function(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  window.startDemo = function() {
    loginDemo('evaluator@geobuild.ai', 'Project Evaluator', 'Academic Evaluator');
  };
}

