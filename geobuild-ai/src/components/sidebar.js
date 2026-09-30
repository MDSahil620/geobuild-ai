// Sidebar Component
export function renderSidebar(container) {
  const state = window.AppState;
  const user = state.currentUser;
  const p = state.currentPage;

  container.innerHTML = `
    <aside class="sidebar" id="main-sidebar" role="complementary" aria-label="Application sidebar">
      <span class="sidebar-section-label">Main</span>
      <a class="sidebar-link ${p==='dashboard'?'active':''}" href="#" data-page="dashboard" onclick="navigateTo('dashboard');return false;">
        <span class="icon">📊</span> Dashboard
      </a>
      <a class="sidebar-link ${p==='upload'?'active':''}" href="#" data-page="upload" onclick="navigateTo('upload');return false;">
        <span class="icon">📤</span> Upload Image
      </a>
      <a class="sidebar-link ${p==='detection'?'active':''}" href="#" data-page="detection" onclick="navigateTo('detection');return false;">
        <span class="icon">🔍</span> Detection Workspace
      </a>
      <a class="sidebar-link ${p==='results'?'active':''}" href="#" data-page="results" onclick="navigateTo('results');return false;">
        <span class="icon">🏗️</span> Detection Results
      </a>

      <span class="sidebar-section-label">Geospatial</span>
      <a class="sidebar-link ${p==='map'?'active':''}" href="#" data-page="map" onclick="navigateTo('map');return false;">
        <span class="icon">🗺️</span> Map View
      </a>
      <a class="sidebar-link ${p==='history'?'active':''}" href="#" data-page="history" onclick="navigateTo('history');return false;">
        <span class="icon">🕒</span> Detection History
        <span class="sidebar-badge">${window.AppState.demoMode ? 'Demo' : ''}</span>
      </a>
      <a class="sidebar-link ${p==='projects'?'active':''}" href="#" data-page="projects" onclick="navigateTo('projects');return false;">
        <span class="icon">📁</span> Projects
      </a>

      <span class="sidebar-section-label">Account</span>
      <a class="sidebar-link ${p==='settings'?'active':''}" href="#" data-page="settings" onclick="navigateTo('settings');return false;">
        <span class="icon">⚙️</span> Settings
      </a>
      <a class="sidebar-link ${p==='about'?'active':''}" href="#" data-page="about" onclick="navigateTo('about');return false;">
        <span class="icon">ℹ️</span> About
      </a>

      <div class="sidebar-footer">
        <div class="sidebar-user">
          <div class="avatar">${user ? (user.avatar || user.name.charAt(0)) : 'G'}</div>
          <div class="sidebar-user-info">
            <div class="sidebar-user-name">${user ? user.name : 'Guest'}</div>
            <div class="sidebar-user-role">${user ? user.role : 'Visitor'}</div>
          </div>
        </div>
        <button class="btn btn-ghost btn-sm w-full" style="margin-top:8px;" onclick="logout()">
          🚪 Sign Out
        </button>
      </div>
    </aside>
  `;
}
