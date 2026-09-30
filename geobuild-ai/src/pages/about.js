// About Page
export function renderAbout(container) {
  container.innerHTML = `
    <div class="fade-in">
      <div class="page-header" style="padding-bottom:0;">
        <h1 class="page-title">About GeoBuild AI</h1>
        <p class="page-subtitle">AI-powered satellite image analysis for intelligent building detection and geospatial insights.</p>
      </div>

      <div class="content-area">
        <!-- Hero Banner -->
        <div class="card" style="background:linear-gradient(135deg,rgba(56,189,248,0.08),rgba(59,130,246,0.05));border-color:rgba(56,189,248,0.2);padding:32px;margin-bottom:24px;">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:32px;align-items:center;">
            <div>
              <div class="section-eyebrow" style="display:inline-flex;margin-bottom:12px;">🛰️ Academic Research Project</div>
              <h2 style="font-size:1.5rem;font-weight:800;margin-bottom:12px;letter-spacing:-0.02em;">Building Detection from Satellite Images</h2>
              <p style="font-size:0.9rem;color:var(--text-secondary);line-height:1.7;">
                GeoBuild AI is an academic platform demonstrating the application of deep learning and computer vision techniques to detect and analyze building structures from satellite and aerial imagery. The project explores geospatial AI workflows from raw image input to structured building footprint extraction.
              </p>
            </div>
            <div style="display:flex;flex-direction:column;gap:12px;">
              ${[
                { icon: '🎓', label: 'Project Type', value: 'Academic / College Project' },
                { icon: '🤖', label: 'AI Approach', value: 'Deep Learning Segmentation' },
                { icon: '🗺️', label: 'Domain', value: 'Geospatial AI & Remote Sensing' },
                { icon: '💻', label: 'Tech Stack', value: 'Python, OpenCV, JavaScript, Leaflet' },
              ].map(i => `
                <div style="display:flex;gap:10px;align-items:center;">
                  <span style="font-size:18px;">${i.icon}</span>
                  <div>
                    <div style="font-size:0.7rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.05em;">${i.label}</div>
                    <div style="font-size:0.85rem;font-weight:600;">${i.value}</div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-bottom:24px;">
          <!-- What is it? -->
          <div class="card card-lg">
            <h2 style="font-size:1.1rem;font-weight:700;margin-bottom:16px;color:var(--accent-cyan);">🛰️ What is Satellite Image Analysis?</h2>
            <p style="font-size:0.875rem;color:var(--text-secondary);line-height:1.8;margin-bottom:12px;">
              Satellite image analysis involves processing imagery captured by Earth observation satellites to extract meaningful information. Modern satellites like Sentinel-2 and commercial providers (Planet, Maxar) capture high-resolution images of Earth's surface at regular intervals.
            </p>
            <p style="font-size:0.875rem;color:var(--text-secondary);line-height:1.8;">
              Analysts use computer vision, machine learning, and geospatial tools to automatically interpret these images — identifying land cover types, detecting changes over time, and extracting human-made structures.
            </p>
          </div>

          <!-- How does AI detect buildings? -->
          <div class="card card-lg">
            <h2 style="font-size:1.1rem;font-weight:700;margin-bottom:16px;color:var(--accent-cyan);">🤖 How Does AI Detect Buildings?</h2>
            <p style="font-size:0.875rem;color:var(--text-secondary);line-height:1.8;margin-bottom:12px;">
              Building detection uses <strong>semantic segmentation</strong> — a deep learning technique that classifies each pixel in an image as either "building" or "non-building." The model learns visual features like roof textures, shadows, and shape regularities from thousands of labeled training examples.
            </p>
            <p style="font-size:0.875rem;color:var(--text-secondary);line-height:1.8;">
              Common architectures include <strong>U-Net</strong> (an encoder-decoder CNN), <strong>DeepLabV3+</strong>, and <strong>Mask R-CNN</strong> for instance segmentation. Post-processing converts pixel masks into building polygons.
            </p>
          </div>
        </div>

        <!-- AI Pipeline -->
        <div class="card card-lg mb-24">
          <h2 style="font-size:1.1rem;font-weight:700;margin-bottom:20px;">⚙️ AI Processing Pipeline</h2>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:32px;">
            <div class="pipeline-flow">
              ${[
                { n: '1', title: 'Input Satellite Image', desc: 'Raw satellite or aerial image in JPG, PNG, TIFF, or GeoTIFF format.' },
                { n: '2', title: 'Image Preprocessing', desc: 'Normalization, contrast enhancement, tile splitting into overlapping patches.' },
                { n: '3', title: 'Feature Extraction', desc: 'CNN encoder extracts multi-scale spatial features from image patches.' },
                { n: '4', title: 'Building Segmentation', desc: 'Decoder generates pixel-level binary mask (building vs. background).' },
                { n: '5', title: 'Post Processing', desc: 'Morphological operations remove noise and smooth building boundaries.' },
                { n: '6', title: 'Polygon Extraction', desc: 'Convert binary mask to vector polygons using contour detection.' },
                { n: '7', title: 'Statistics & Visualization', desc: 'Calculate building count, area, confidence scores, and render overlays.' }
              ].map(s => `
                <div class="pipeline-step">
                  <div class="pipeline-dot">${s.n}</div>
                  <div class="pipeline-content">
                    <div class="pipeline-title">${s.title}</div>
                    <div class="pipeline-desc">${s.desc}</div>
                  </div>
                </div>
              `).join('')}
            </div>
            <div>
              <h3 style="font-size:0.95rem;font-weight:700;margin-bottom:16px;">Key AI/ML Concepts Used</h3>
              <div style="display:flex;flex-direction:column;gap:12px;">
                ${[
                  { icon: '👁️', title: 'Computer Vision', desc: 'Algorithms that enable machines to interpret and analyze visual data from images.' },
                  { icon: '🧠', title: 'Deep Learning', desc: 'Neural networks with multiple layers that learn hierarchical feature representations.' },
                  { icon: '✂️', title: 'Semantic Segmentation', desc: 'Pixel-level classification — each pixel assigned a class label (building/not-building).' },
                  { icon: '📦', title: 'Object Detection', desc: 'Locating and classifying discrete objects (buildings) with bounding boxes.' },
                  { icon: '📡', title: 'Remote Sensing', desc: 'Science of obtaining information about objects from a distance using sensors.' },
                  { icon: '📍', title: 'Geospatial Analysis', desc: 'Spatial data analysis combining GIS concepts with AI-extracted features.' },
                ].map(c => `
                  <div style="display:flex;gap:10px;padding:10px;background:var(--bg-glass);border-radius:var(--radius-sm);border:1px solid var(--border-color);">
                    <span style="font-size:20px;flex-shrink:0;">${c.icon}</span>
                    <div>
                      <div style="font-size:0.85rem;font-weight:600;margin-bottom:2px;">${c.title}</div>
                      <div style="font-size:0.78rem;color:var(--text-secondary);">${c.desc}</div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>

        <!-- Applications -->
        <div class="mb-24">
          <h2 style="font-size:1.1rem;font-weight:700;margin-bottom:16px;">🌍 Real-World Applications</h2>
          <div class="grid grid-3" style="gap:16px;">
            ${[
              { icon: '🏙️', title: 'Urban Planning', desc: 'Analyze building density, zoning compliance, and land use for city planners.' },
              { icon: '🌆', title: 'Smart Cities', desc: 'Infrastructure mapping and real-time urban monitoring systems.' },
              { icon: '🌊', title: 'Disaster Assessment', desc: 'Post-disaster damage assessment for earthquake, flood, and hurricane response.' },
              { icon: '🏗️', title: 'Infrastructure Monitoring', desc: 'Track construction activity, detect illegal buildings, monitor changes.' },
              { icon: '🌱', title: 'Land Use Analysis', desc: 'Measure urbanization, built-up area growth, and green space coverage.' },
              { icon: '📈', title: 'Population Studies', desc: 'Estimate urban population density from building footprint analysis.' },
              { icon: '🛡️', title: 'Security & Defense', desc: 'Border monitoring, facility detection, and area change surveillance.' },
              { icon: '💰', title: 'Real Estate', desc: 'Property assessment, roof area measurement for insurance and taxation.' },
              { icon: '🔬', title: 'Research', desc: 'Academic studies of urban morphology, sprawl patterns, and spatial analytics.' },
            ].map(a => `
              <div class="application-card">
                <div class="application-icon">${a.icon}</div>
                <h3 class="application-title">${a.title}</h3>
                <p class="application-desc">${a.desc}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Tech Stack -->
        <div class="card card-lg mb-24">
          <h2 style="font-size:1.1rem;font-weight:700;margin-bottom:20px;">💻 Technology Stack</h2>
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:20px;">
            ${[
              { category: 'Frontend', icon: '🎨', items: ['HTML5 / CSS3', 'JavaScript ES2023', 'Leaflet.js Maps', 'Chart.js Analytics'] },
              { category: 'AI / ML', icon: '🤖', items: ['Python 3.x', 'OpenCV', 'TensorFlow / PyTorch', 'U-Net / DeepLabV3'] },
              { category: 'Backend (Ready)', icon: '⚙️', items: ['Python FastAPI', 'Node.js Express', 'REST API Layer', 'Firebase Storage'] },
            ].map(t => `
              <div>
                <div style="font-size:0.82rem;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:10px;">${t.icon} ${t.category}</div>
                ${t.items.map(i => `
                  <div style="display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid var(--border-color);font-size:0.82rem;">
                    <span style="color:var(--accent-cyan);">▸</span>${i}
                  </div>
                `).join('')}
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Future Improvements -->
        <div class="card card-lg mb-24">
          <h2 style="font-size:1.1rem;font-weight:700;margin-bottom:16px;">🚀 Future Improvements</h2>
          <div class="grid grid-2" style="gap:12px;">
            ${[
              'Multi-spectral & hyperspectral imagery support',
              'Full GeoTIFF georeferenced processing pipeline',
              'Advanced segmentation models (SAM, Segment Anything)',
              'Change detection between multi-temporal images',
              'Building height estimation from shadow analysis',
              'Urban growth trend analysis and time-series',
              'Cloud-based batch processing for large datasets',
              'Integration with real satellite data APIs (Sentinel Hub, Planet)',
              'Real-time geospatial streaming analytics',
              'Research dataset integration (SpaceNet, INRIA)',
            ].map(f => `
              <div style="display:flex;gap:10px;align-items:flex-start;font-size:0.85rem;">
                <span style="color:var(--accent-cyan);flex-shrink:0;margin-top:1px;">→</span>
                <span style="color:var(--text-secondary);">${f}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- CTA -->
        <div style="text-align:center;padding:24px 0;">
          <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
            <button class="btn btn-primary btn-lg" onclick="navigateTo('detection')" id="about-try-btn">🔍 Try Detection</button>
            <button class="btn btn-outline-cyan btn-lg" onclick="navigateTo('map')" id="about-map-btn">🗺 Explore Map</button>
          </div>
        </div>
      </div>
    </div>
  `;
}
