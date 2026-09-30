// Navbar Component
export function renderNavbar(container, { showHamburger = false, isApp = false } = {}) {
  const state = window.AppState;
  const user = state.currentUser;

  container.innerHTML = `
    <nav class="navbar" role="navigation" aria-label="Main navigation">
      ${showHamburger ? `
        <button class="hamburger" id="hamburger-btn" aria-label="Toggle sidebar" aria-expanded="false">☰</button>
      ` : ''}

      <a class="navbar-brand" href="#" onclick="navigateTo('home');return false;" aria-label="GeoBuild AI Home">
        <div class="logo-icon" aria-hidden="true">🛰️</div>
        <span>GeoBuild AI</span>
      </a>

      ${!isApp ? `
        <nav class="navbar-nav" aria-label="Primary navigation">
          <a class="nav-link ${state.currentPage==='home'?'active':''}" href="#" data-page="home" onclick="navigateTo('home');return false;">Home</a>
          <a class="nav-link ${state.currentPage==='dashboard'?'active':''}" href="#" data-page="dashboard" onclick="navigateTo('dashboard');return false;">Dashboard</a>
          <a class="nav-link ${state.currentPage==='detection'?'active':''}" href="#" data-page="detection" onclick="navigateTo('detection');return false;">Detect</a>
          <a class="nav-link ${state.currentPage==='map'?'active':''}" href="#" data-page="map" onclick="navigateTo('map');return false;">Map</a>
          <a class="nav-link ${state.currentPage==='history'?'active':''}" href="#" data-page="history" onclick="navigateTo('history');return false;">History</a>
          <a class="nav-link ${state.currentPage==='about'?'active':''}" href="#" data-page="about" onclick="navigateTo('about');return false;">About</a>
        </nav>
      ` : ''}

      <div class="navbar-right">
        <button class="theme-toggle" id="theme-toggle-btn" aria-label="Toggle dark/light theme" title="Toggle Theme">
          ${state.theme === 'dark' ? '☀️' : '🌙'}
        </button>
        ${state.isAuthenticated ? `
          <div style="display:flex;align-items:center;gap:10px;">
            <div class="avatar" title="${user.name}" style="cursor:pointer;" onclick="navigateTo('settings')">${user.avatar || user.name.charAt(0)}</div>
            <button class="btn btn-ghost btn-sm" onclick="logout()" id="logout-btn">Logout</button>
          </div>
        ` : `
          <button class="btn btn-ghost btn-sm" onclick="navigateTo('login')" id="navbar-login-btn">Login</button>
          <button class="btn btn-primary btn-sm" onclick="navigateTo('register')" id="navbar-register-btn">Get Started</button>
        `}
      </div>
    </nav>
  `;

  // Theme toggle
  document.getElementById('theme-toggle-btn')?.addEventListener('click', () => {
    const newTheme = window.AppState.theme === 'dark' ? 'light' : 'dark';
    window.applyTheme(newTheme);
    // Update icon
    document.getElementById('theme-toggle-btn').textContent = newTheme === 'dark' ? '☀️' : '🌙';
  });

  // Hamburger
  document.getElementById('hamburger-btn')?.addEventListener('click', () => {
    window.AppState.sidebarOpen = !window.AppState.sidebarOpen;
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
      sidebar.classList.toggle('open', window.AppState.sidebarOpen);
    }
    const btn = document.getElementById('hamburger-btn');
    if (btn) btn.setAttribute('aria-expanded', window.AppState.sidebarOpen);
  });
}
