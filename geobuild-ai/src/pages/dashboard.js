// Dashboard Page
import { DEMO_DETECTIONS, DEMO_ACTIVITY_LOG, DEMO_STATS, DEMO_PROJECTS } from '../data/demoData.js';

export function renderDashboard(container) {
  const user = window.AppState.currentUser || { name: 'User', role: 'student' };
  const stats = DEMO_STATS;

  function timeAgo(dateStr) {
    const diff = Date.now() - new Date(dateStr).getTime();
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor(diff / 3600000);
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return 'Just now';
  }

  function statusBadge(status) {
    if (status === 'completed') return '<span class="badge badge-success">✓ Completed</span>';
    if (status === 'processing') return '<span class="badge badge-info">⟳ Processing</span>';
    if (status === 'failed')    return '<span class="badge badge-error">✕ Failed</span>';
    return `<span class="badge badge-info">${status}</span>`;
  }

  container.innerHTML = `
    <div class="dashboard-page fade-in">
      <!-- Header -->
      <div class="dashboard-header">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px;">
          <div>
            <div class="welcome-text">Welcome back, <span class="welcome-name">${(user.name || 'User').split(' ')[0]}</span> 👋</div>
            <div class="dashboard-subtitle">Analyze satellite imagery and detect building structures.</div>
          </div>
          <div style="display:flex;gap:10px;align-items:center;">
            <span class="badge badge-demo">DEMO MODE</span>
            <span class="badge badge-purple">${user.role}</span>
          </div>
        </div>
        <div class="quick-actions" role="group" aria-label="Quick actions">
          <button class="btn btn-primary btn-sm" onclick="navigateTo('upload')" id="qa-upload">📤 Upload Image</button>
          <button class="btn btn-secondary btn-sm" onclick="navigateTo('detection')" id="qa-detect">🔍 Start Detection</button>
          <button class="btn btn-secondary btn-sm" onclick="navigateTo('map')" id="qa-map">🗺️ View Map</button>
          <button class="btn btn-secondary btn-sm" onclick="navigateTo('history')" id="qa-history">🕒 View History</button>
          <button class="btn btn-secondary btn-sm" onclick="navigateTo('projects')" id="qa-projects">📁 My Projects</button>
        </div>
      </div>

      <div class="content-area">
        <!-- Stats Cards -->
        <div class="grid grid-4 mb-24">
          <div class="stat-card cyan" role="article" aria-label="Total images analyzed">
            <div class="stat-icon cyan">🛰️</div>
            <div class="stat-value text-cyan">${stats.totalImagesAnalyzed}</div>
            <div class="stat-label">Images Analyzed</div>
            <div class="stat-change up">↑ +3 this week</div>
          </div>
          <div class="stat-card green" role="article" aria-label="Buildings detected">
            <div class="stat-icon green">🏗️</div>
            <div class="stat-value text-green">${stats.totalBuildingsDetected.toLocaleString()}</div>
            <div class="stat-label">Buildings Detected</div>
            <div class="stat-change up">↑ Demo data</div>
          </div>
          <div class="stat-card purple" role="article" aria-label="Projects created">
            <div class="stat-icon purple">📁</div>
            <div class="stat-value" style="color:var(--accent-purple)">${stats.projectsCreated}</div>
            <div class="stat-label">Projects Created</div>
            <div class="stat-change up">↑ 1 new project</div>
          </div>
          <div class="stat-card orange" role="article" aria-label="Detection jobs">
            <div class="stat-icon orange">⚙️</div>
            <div class="stat-value" style="color:var(--accent-orange)">${stats.detectionJobs}</div>
            <div class="stat-label">Detection Jobs</div>
            <div class="stat-change">Success rate: ${Math.round(stats.successRate * 100)}%</div>
          </div>
        </div>

        <div class="grid grid-3" style="grid-template-columns:2fr 1fr;gap:20px;">
          <!-- Recent Detections Table -->
          <div>
            <div class="card card-lg" style="padding:0;overflow:hidden;">
              <div style="padding:20px 24px;border-bottom:1px solid var(--border-color);display:flex;align-items:center;justify-content:space-between;">
                <div>
                  <div class="card-title">Recent Detections</div>
                  <div class="card-subtitle">Your latest satellite image analysis jobs <span class="badge badge-demo" style="margin-left:8px;">DEMO DATA</span></div>
                </div>
                <button class="btn btn-ghost btn-sm" onclick="navigateTo('history')" id="view-all-history">View All →</button>
              </div>
              <div class="table-wrapper" style="border:none;border-radius:0;">
                <table aria-label="Recent detections">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Buildings</th>
                      <th>Confidence</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${DEMO_DETECTIONS.slice(0, 5).map(d => `
                      <tr>
                        <td>
                          <div style="max-width:160px;">
                            <div style="font-size:0.82rem;font-weight:600;truncate;">${d.imageName}</div>
                            <div style="font-size:0.72rem;color:var(--text-muted);">${d.projectName}</div>
                          </div>
                        </td>
                        <td style="font-size:0.78rem;color:var(--text-muted);white-space:nowrap;">${timeAgo(d.date)}</td>
                        <td>${statusBadge(d.status)}</td>
                        <td style="font-family:var(--font-mono);font-weight:600;">
                          ${d.buildingCount !== null ? d.buildingCount : '<span style="color:var(--text-muted);">—</span>'}
                        </td>
                        <td style="font-family:var(--font-mono);">
                          ${d.confidence !== null ? `
                            <div style="display:flex;align-items:center;gap:8px;">
                              <div class="progress-bar-wrapper" style="width:60px;height:5px;">
                                <div class="progress-bar cyan" style="width:${Math.round(d.confidence*100)}%"></div>
                              </div>
                              <span style="font-size:0.78rem;">${Math.round(d.confidence*100)}%</span>
                            </div>
                          ` : '<span style="color:var(--text-muted);">—</span>'}
                        </td>
                        <td>
                          ${d.status === 'completed' ? `
                            <button class="btn btn-ghost btn-sm" onclick="navigateTo('results')" aria-label="View result for ${d.imageName}">View →</button>
                          ` : '<span style="color:var(--text-muted);font-size:0.78rem;">—</span>'}
                        </td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Activity + Quick Stats -->
          <div style="display:flex;flex-direction:column;gap:20px;">
            <!-- Mini stats -->
            <div class="card">
              <div class="card-header">
                <div>
                  <div class="card-title">Detection Metrics</div>
                  <div class="card-subtitle"><span class="badge badge-demo">DEMO</span></div>
                </div>
              </div>
              <div style="display:flex;flex-direction:column;gap:12px;">
                <div>
                  <div style="display:flex;justify-content:space-between;font-size:0.8rem;margin-bottom:5px;">
                    <span>Avg. Confidence</span>
                    <span class="font-mono text-cyan">${Math.round(stats.avgConfidence*100)}%</span>
                  </div>
                  <div class="progress-bar-wrapper">
                    <div class="progress-bar cyan" style="width:${Math.round(stats.avgConfidence*100)}%;"></div>
                  </div>
                </div>
                <div>
                  <div style="display:flex;justify-content:space-between;font-size:0.8rem;margin-bottom:5px;">
                    <span>Success Rate</span>
                    <span class="font-mono text-green">${Math.round(stats.successRate*100)}%</span>
                  </div>
                  <div class="progress-bar-wrapper">
                    <div class="progress-bar green" style="width:${Math.round(stats.successRate*100)}%;"></div>
                  </div>
                </div>
                <div>
                  <div style="display:flex;justify-content:space-between;font-size:0.8rem;margin-bottom:5px;">
                    <span>Avg. Process Time</span>
                    <span class="font-mono" style="color:var(--accent-orange)">${stats.avgProcessingTime}s</span>
                  </div>
                  <div class="progress-bar-wrapper">
                    <div class="progress-bar" style="width:60%;background:var(--accent-orange);"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Activity Timeline -->
            <div class="card" style="flex:1;">
              <div class="card-header">
                <div class="card-title">Activity Timeline</div>
              </div>
              <div class="activity-list" role="list" aria-label="Recent activity">
                ${DEMO_ACTIVITY_LOG.slice(0, 5).map(a => `
                  <div class="activity-item" role="listitem">
                    <div class="activity-icon ${a.status}">${a.type === 'detection' ? '🔍' : a.type === 'upload' ? '📤' : a.type === 'project' ? '📁' : '📥'}</div>
                    <div class="activity-content">
                      <div class="activity-msg" style="font-size:0.8rem;">${a.message}</div>
                      <div class="activity-time">${timeAgo(a.time)}</div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Projects -->
        <div style="margin-top:24px;">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
            <h2 style="font-size:1rem;font-weight:700;">Recent Projects</h2>
            <button class="btn btn-ghost btn-sm" onclick="navigateTo('projects')" id="view-all-projects">View All →</button>
          </div>
          <div class="grid" style="grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:16px;">
            ${DEMO_PROJECTS.slice(0, 4).map(p => `
              <div class="card" style="cursor:pointer;" onclick="navigateTo('projects')" role="button" aria-label="Open project ${p.name}">
                <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:10px;">
                  <div style="font-size:0.9rem;font-weight:700;">${p.name}</div>
                  <span class="badge ${p.status==='active'?'badge-success':p.status==='processing'?'badge-info':'badge-info'}">${p.status}</span>
                </div>
                <p style="font-size:0.78rem;color:var(--text-secondary);margin-bottom:12px;line-height:1.5;">${p.description.substring(0, 70)}...</p>
                <div style="display:flex;gap:16px;font-size:0.75rem;color:var(--text-muted);">
                  <span>🖼 ${p.imageCount} images</span>
                  <span>🏗 ${p.totalBuildings} buildings</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}
