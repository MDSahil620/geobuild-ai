// History Page
import { DEMO_DETECTIONS } from '../data/demoData.js';

export function renderHistory(container) {
  let filteredData = [...DEMO_DETECTIONS];
  let searchQuery = '';
  let statusFilter = 'all';

  function timeStr(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
  }

  function statusBadge(status) {
    if (status === 'completed') return '<span class="badge badge-success">✓ Completed</span>';
    if (status === 'processing') return '<span class="badge badge-info">⟳ Processing</span>';
    if (status === 'failed')    return '<span class="badge badge-error">✕ Failed</span>';
    return `<span class="badge badge-info">${status}</span>`;
  }

  function renderTable() {
    const tbody = document.getElementById('history-tbody');
    if (!tbody) return;

    if (filteredData.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7">
            <div class="empty-state">
              <div class="empty-icon">🔍</div>
              <div class="empty-title">No detections found</div>
              <div class="empty-desc">Try adjusting your filters or search query.</div>
            </div>
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = filteredData.map(d => `
      <tr>
        <td>
          <div style="font-size:0.82rem;font-weight:600;">${d.imageName}</div>
          <div style="font-size:0.7rem;color:var(--text-muted);">${d.projectName}</div>
        </td>
        <td style="font-size:0.78rem;color:var(--text-muted);white-space:nowrap;">${timeStr(d.date)}</td>
        <td>${statusBadge(d.status)}</td>
        <td style="font-family:var(--font-mono);font-weight:600;text-align:center;">
          ${d.buildingCount !== null ? d.buildingCount : '—'}
        </td>
        <td>
          ${d.confidence !== null ? `
            <div style="display:flex;align-items:center;gap:8px;">
              <div class="progress-bar-wrapper" style="width:50px;height:4px;">
                <div class="progress-bar cyan" style="width:${Math.round(d.confidence*100)}%"></div>
              </div>
              <span style="font-size:0.78rem;font-family:var(--font-mono);">${Math.round(d.confidence*100)}%</span>
            </div>
          ` : '<span style="color:var(--text-muted);">—</span>'}
        </td>
        <td style="font-size:0.78rem;color:var(--text-muted);">${d.model || 'Segmentation'}</td>
        <td>
          <div style="display:flex;gap:6px;">
            ${d.status === 'completed' ? `
              <button class="btn btn-ghost btn-sm" onclick="viewDetection('${d.id}')" aria-label="View results for ${d.imageName}">View</button>
              <button class="btn btn-ghost btn-sm" onclick="navigateTo('map')" aria-label="Open map for ${d.imageName}">Map</button>
              <button class="btn btn-ghost btn-sm" onclick="downloadDetection('${d.id}')" aria-label="Download ${d.imageName}">↓</button>
            ` : ''}
            <button class="btn btn-ghost btn-sm" style="color:var(--accent-red);" onclick="deleteDetection('${d.id}')" aria-label="Delete ${d.imageName}">🗑</button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  container.innerHTML = `
    <div class="fade-in">
      <div class="page-header">
        <h1 class="page-title">Detection History</h1>
        <p class="page-subtitle">All your satellite image analysis jobs <span class="badge badge-demo" style="margin-left:8px;">DEMO DATA</span></p>
      </div>

      <!-- Filters -->
      <div class="filter-bar">
        <div class="search-input-wrapper">
          <span class="search-icon">🔍</span>
          <input
            type="search" class="search-input" id="history-search"
            placeholder="Search images or projects..."
            aria-label="Search detection history"
            oninput="filterHistory()"
          />
        </div>
        <select class="filter-select" id="status-filter" onchange="filterHistory()" aria-label="Filter by status">
          <option value="all">All Statuses</option>
          <option value="completed">Completed</option>
          <option value="processing">Processing</option>
          <option value="failed">Failed</option>
        </select>
        <select class="filter-select" id="model-filter" onchange="filterHistory()" aria-label="Filter by model">
          <option value="all">All Models</option>
          <option value="Building Segmentation">Segmentation</option>
          <option value="Building Detection">Detection</option>
        </select>
        <select class="filter-select" id="sort-filter" onchange="filterHistory()" aria-label="Sort by">
          <option value="date-desc">Newest First</option>
          <option value="date-asc">Oldest First</option>
          <option value="buildings-desc">Most Buildings</option>
          <option value="confidence-desc">Highest Confidence</option>
        </select>
        <div style="margin-left:auto;display:flex;gap:8px;">
          <span id="result-count" style="font-size:0.82rem;color:var(--text-muted);align-self:center;">${DEMO_DETECTIONS.length} results</span>
          <button class="btn btn-primary btn-sm" onclick="navigateTo('upload')" id="new-analysis-btn">+ New Analysis</button>
        </div>
      </div>

      <div class="content-area" style="margin-top:16px;">
        <div class="table-wrapper">
          <table aria-label="Detection history table">
            <thead>
              <tr>
                <th>Image / Project</th>
                <th>Date</th>
                <th>Status</th>
                <th style="text-align:center;">Buildings</th>
                <th>Confidence</th>
                <th>Model</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="history-tbody"></tbody>
          </table>
        </div>

        <!-- Summary stats -->
        <div class="grid grid-4" style="margin-top:24px;gap:16px;">
          <div class="card" style="text-align:center;padding:16px;">
            <div style="font-size:1.5rem;font-weight:800;color:var(--accent-cyan);">${DEMO_DETECTIONS.length}</div>
            <div style="font-size:0.78rem;color:var(--text-muted);">Total Jobs</div>
          </div>
          <div class="card" style="text-align:center;padding:16px;">
            <div style="font-size:1.5rem;font-weight:800;color:var(--accent-green);">${DEMO_DETECTIONS.filter(d=>d.status==='completed').length}</div>
            <div style="font-size:0.78rem;color:var(--text-muted);">Completed</div>
          </div>
          <div class="card" style="text-align:center;padding:16px;">
            <div style="font-size:1.5rem;font-weight:800;color:var(--accent-orange);">${DEMO_DETECTIONS.filter(d=>d.status==='failed').length}</div>
            <div style="font-size:0.78rem;color:var(--text-muted);">Failed</div>
          </div>
          <div class="card" style="text-align:center;padding:16px;">
            <div style="font-size:1.5rem;font-weight:800;" style="color:var(--accent-purple);">
              ${DEMO_DETECTIONS.filter(d=>d.buildingCount).reduce((a,d)=>a+d.buildingCount,0).toLocaleString()}
            </div>
            <div style="font-size:0.78rem;color:var(--text-muted);">Total Buildings</div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Render initial table
  renderTable();

  // Filter logic
  window.filterHistory = function() {
    const q = document.getElementById('history-search')?.value.toLowerCase() || '';
    const status = document.getElementById('status-filter')?.value || 'all';
    const model = document.getElementById('model-filter')?.value || 'all';
    const sort = document.getElementById('sort-filter')?.value || 'date-desc';

    filteredData = DEMO_DETECTIONS.filter(d => {
      const matchQ = !q || d.imageName.toLowerCase().includes(q) || d.projectName.toLowerCase().includes(q);
      const matchStatus = status === 'all' || d.status === status;
      const matchModel = model === 'all' || d.model === model;
      return matchQ && matchStatus && matchModel;
    });

    // Sort
    filteredData.sort((a, b) => {
      if (sort === 'date-asc') return new Date(a.date) - new Date(b.date);
      if (sort === 'date-desc') return new Date(b.date) - new Date(a.date);
      if (sort === 'buildings-desc') return (b.buildingCount || 0) - (a.buildingCount || 0);
      if (sort === 'confidence-desc') return (b.confidence || 0) - (a.confidence || 0);
      return 0;
    });

    document.getElementById('result-count').textContent = filteredData.length + ' results';
    renderTable();
  };

  window.viewDetection = function(id) { navigateTo('results'); };

  window.downloadDetection = function(id) {
    const item = DEMO_DETECTIONS.find(d => d.id === id) || DEMO_DETECTIONS[0];
    const blob = new Blob([JSON.stringify(item, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${item.imageName.split('.')[0]}_detection.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    window.showToast(`Downloaded ${item.imageName} detection record!`, 'success');
  };

  window.deleteDetection = function(id) {
    filteredData = filteredData.filter(d => d.id !== id);
    const countEl = document.getElementById('result-count');
    if (countEl) countEl.textContent = filteredData.length + ' results';
    renderTable();
    window.showToast('Detection record removed from history view.', 'info', 'Removed');
  };
}
