// Projects Page
import { DEMO_PROJECTS } from '../data/demoData.js';

export function renderProjects(container) {
  let showNewProjectModal = false;

  function timeStr(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
  }

  container.innerHTML = `
    <div class="fade-in">
      <div class="page-header">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;">
          <div>
            <h1 class="page-title">Projects</h1>
            <p class="page-subtitle">Organize your satellite image analysis projects <span class="badge badge-demo" style="margin-left:8px;">DEMO DATA</span></p>
          </div>
          <button class="btn btn-primary" onclick="openNewProjectModal()" id="new-project-btn">
            ＋ New Project
          </button>
        </div>
      </div>

      <div class="content-area">
        <!-- Project summary -->
        <div class="grid grid-4 mb-24">
          <div class="stat-card cyan">
            <div class="stat-icon cyan">📁</div>
            <div class="stat-value text-cyan">${DEMO_PROJECTS.length}</div>
            <div class="stat-label">Total Projects</div>
          </div>
          <div class="stat-card green">
            <div class="stat-icon green">✅</div>
            <div class="stat-value text-green">${DEMO_PROJECTS.filter(p=>p.status==='completed').length}</div>
            <div class="stat-label">Completed</div>
          </div>
          <div class="stat-card purple">
            <div class="stat-icon purple">⚡</div>
            <div class="stat-value" style="color:var(--accent-purple);">${DEMO_PROJECTS.filter(p=>p.status==='active').length}</div>
            <div class="stat-label">Active</div>
          </div>
          <div class="stat-card orange">
            <div class="stat-icon orange">🏗️</div>
            <div class="stat-value" style="color:var(--accent-orange);">${DEMO_PROJECTS.reduce((a,p)=>a+p.totalBuildings,0).toLocaleString()}</div>
            <div class="stat-label">Total Buildings</div>
          </div>
        </div>

        <!-- Projects Grid -->
        <div class="grid grid-2" style="gap:20px;">
          ${DEMO_PROJECTS.map(p => `
            <div class="project-card" onclick="openProject('${p.id}')" role="button" tabindex="0" aria-label="Open project ${p.name}" onkeydown="if(event.key==='Enter')openProject('${p.id}')">
              <div class="project-card-header">
                <div class="project-name">${p.name}</div>
                <span class="badge ${p.status==='active'?'badge-success':p.status==='processing'?'badge-info':'badge-info'}">${p.status}</span>
              </div>
              <p class="project-desc">${p.description}</p>

              <div class="project-meta">
                <span class="project-meta-item">📅 ${timeStr(p.createdAt)}</span>
                <span class="project-meta-item">🖼 ${p.imageCount} images</span>
                <span class="project-meta-item">🔍 ${p.detectionCount} detections</span>
                <span class="project-meta-item">🏗 ${p.totalBuildings.toLocaleString()} buildings</span>
                <span class="project-meta-item">📍 ${p.coverageArea}</span>
              </div>

              <div style="margin-top:12px;display:flex;flex-wrap:wrap;gap:6px;">
                ${p.tags.map(t => `<span style="background:rgba(56,189,248,0.1);border:1px solid rgba(56,189,248,0.2);color:var(--accent-cyan);font-size:0.7rem;padding:2px 8px;border-radius:20px;">${t}</span>`).join('')}
              </div>

              <div class="project-actions" onclick="event.stopPropagation()">
                <button class="btn btn-primary btn-sm" onclick="openProject('${p.id}')" id="open-${p.id}-btn">Open Project</button>
                <button class="btn btn-ghost btn-sm" onclick="navigateTo('upload')" id="add-img-${p.id}-btn">+ Add Image</button>
                <button class="btn btn-ghost btn-sm" onclick="navigateTo('history')" id="view-detections-${p.id}-btn">View Detections</button>
                <button class="btn btn-ghost btn-sm" style="color:var(--accent-red);margin-left:auto;" onclick="deleteProject('${p.id}')" id="del-${p.id}-btn" aria-label="Delete project ${p.name}">🗑</button>
              </div>
            </div>
          `).join('')}

          <!-- New Project Card -->
          <div class="project-card" style="border-style:dashed;border-color:var(--border-color);cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:220px;background:transparent;"
               onclick="openNewProjectModal()" role="button" tabindex="0" aria-label="Create new project" onkeydown="if(event.key==='Enter')openNewProjectModal()">
            <div style="font-size:40px;margin-bottom:12px;opacity:0.4;">＋</div>
            <div style="font-weight:600;color:var(--text-muted);">Create New Project</div>
            <div style="font-size:0.8rem;color:var(--text-muted);margin-top:4px;text-align:center;padding:0 20px;">
              Organize your satellite analyses in a structured project
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- New Project Modal -->
    <div class="modal-overlay" id="new-project-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div class="modal">
        <div class="modal-header">
          <div class="modal-title" id="modal-title">Create New Project</div>
          <button class="modal-close" onclick="closeProjectModal()" aria-label="Close modal">✕</button>
        </div>
        <div class="modal-body">
          <form id="new-project-form" novalidate>
            <div class="form-group">
              <label class="form-label" for="proj-name">Project Name *</label>
              <input class="form-control" type="text" id="proj-name" placeholder="e.g. Ahmedabad Urban Study" required aria-required="true" />
              <div class="form-error hidden" id="proj-name-error">⚠ Project name is required.</div>
            </div>
            <div class="form-group">
              <label class="form-label" for="proj-desc">Description</label>
              <textarea class="form-control" id="proj-desc" rows="3" placeholder="Describe the purpose and scope of this project..."></textarea>
            </div>
            <div class="form-group">
              <label class="form-label" for="proj-location">Location / Area</label>
              <input class="form-control" type="text" id="proj-location" placeholder="e.g. Sector 7, Ahmedabad, Gujarat" />
            </div>
            <div class="form-group">
              <label class="form-label">Tags (comma-separated)</label>
              <input class="form-control" type="text" id="proj-tags" placeholder="e.g. urban, residential, high-density" />
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button class="btn btn-ghost" onclick="closeProjectModal()" id="cancel-project-btn">Cancel</button>
          <button class="btn btn-primary" onclick="createProject()" id="create-project-btn">🚀 Create Project</button>
        </div>
      </div>
    </div>
  `;

  window.openProject = function(id) {
    const p = DEMO_PROJECTS.find(p => p.id === id);
    window.showToast(`Opening project: ${p?.name || id} (Demo mode)`, 'info', 'Project');
    navigateTo('history');
  };

  window.deleteProject = function(id) {
    const idx = DEMO_PROJECTS.findIndex(p => p.id === id);
    if (idx !== -1) {
      const removed = DEMO_PROJECTS.splice(idx, 1)[0];
      renderProjects(container);
      window.showToast(`Project "${removed.name}" removed.`, 'warning', 'Deleted');
    }
  };

  window.openNewProjectModal = function() {
    document.getElementById('new-project-modal').classList.add('open');
  };

  window.closeProjectModal = function() {
    document.getElementById('new-project-modal').classList.remove('open');
  };

  window.createProject = function() {
    const name = document.getElementById('proj-name').value.trim();
    const desc = document.getElementById('proj-desc').value.trim() || 'Custom satellite building detection project.';
    const tags = document.getElementById('proj-tags').value.split(',').map(t => t.trim()).filter(Boolean);
    const err = document.getElementById('proj-name-error');
    if (!name) { err.classList.remove('hidden'); return; }
    err.classList.add('hidden');

    const newProj = {
      id: 'proj-' + Date.now(),
      name: name,
      description: desc,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'active',
      imageCount: 1,
      detectionCount: 1,
      totalBuildings: 120,
      coverageArea: '3.5 km²',
      tags: tags.length ? tags : ['urban', 'survey']
    };
    DEMO_PROJECTS.unshift(newProj);
    closeProjectModal();
    renderProjects(container);
    window.showToast(`Project "${name}" created successfully!`, 'success', 'Project Created');
  };

  // Close modal on overlay click
  document.getElementById('new-project-modal').addEventListener('click', (e) => {
    if (e.target.id === 'new-project-modal') window.closeProjectModal();
  });
}
