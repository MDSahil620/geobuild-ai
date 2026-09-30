// ============================================================
// GeoBuild AI — Main Application
// ============================================================
import { demoData } from './data/demoData.js';
import { renderHome } from './pages/home.js';
import { renderLogin, renderRegister } from './pages/auth.js';
import { renderDashboard } from './pages/dashboard.js';
import { renderUpload } from './pages/upload.js';
import { renderDetection } from './pages/detection.js';
import { renderResults } from './pages/results.js';
import { renderMap } from './pages/map.js';
import { renderHistory } from './pages/history.js';
import { renderProjects } from './pages/projects.js';
import { renderAbout } from './pages/about.js';
import { renderSettings } from './pages/settings.js';
import { renderNavbar } from './components/navbar.js';
import { renderSidebar } from './components/sidebar.js';
import { initToasts } from './components/toast.js';

// ============================================================
// Application State
// ============================================================
const AppState = {
  currentPage: 'home',
  isAuthenticated: false,
  currentUser: null,
  theme: localStorage.getItem('geobuild-theme') || 'dark',
  demoMode: true,
  currentDetection: null,
  sidebarOpen: false,
  uploadedImage: null,
  detectionConfig: {
    model: 'segmentation',
    confidence: 0.5,
    mode: 'balanced'
  }
};

// Expose globally for inter-module use
window.AppState = AppState;

// ============================================================
// Theme Management
// ============================================================
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  AppState.theme = theme;
  localStorage.setItem('geobuild-theme', theme);
}
window.applyTheme = applyTheme;
applyTheme(AppState.theme);

// ============================================================
// Authentication (Demo / Firebase-ready)
// ============================================================
function loginDemo(email, name, role = 'student') {
  AppState.isAuthenticated = true;
  AppState.currentUser = {
    uid: 'demo-' + Date.now(),
    email: email || 'demo@geobuild.ai',
    name: name || 'Demo User',
    role: role,
    createdAt: new Date().toISOString(),
    avatar: (name || 'D').charAt(0).toUpperCase()
  };
  sessionStorage.setItem('geobuild-user', JSON.stringify(AppState.currentUser));
  window.showToast('Logged in successfully!', 'success', 'Welcome to GeoBuild AI');
  navigateTo('dashboard');
}
window.loginDemo = loginDemo;

function logout() {
  AppState.isAuthenticated = false;
  AppState.currentUser = null;
  sessionStorage.removeItem('geobuild-user');
  window.showToast('Logged out', 'info');
  navigateTo('home');
}
window.logout = logout;

// Restore session
const savedUser = sessionStorage.getItem('geobuild-user');
if (savedUser) {
  try {
    AppState.currentUser = JSON.parse(savedUser);
    AppState.isAuthenticated = true;
  } catch(e) {}
}

// ============================================================
// Router
// ============================================================
const PROTECTED_ROUTES = ['dashboard', 'upload', 'detection', 'results', 'map', 'history', 'projects', 'settings'];

function navigateTo(page, options = {}) {
  // Auth guard
  if (PROTECTED_ROUTES.includes(page) && !AppState.isAuthenticated) {
    window.showToast('Please log in to access this page.', 'warning');
    page = 'login';
  }

  AppState.currentPage = page;
  AppState.sidebarOpen = false;

  // Update URL hash
  history.pushState({ page, options }, '', '#' + page);
  renderPage(page, options);
  scrollTo(0, 0);
  updateNavActiveState(page);
  updateSidebar();
}
window.navigateTo = navigateTo;

function renderPage(page, options = {}) {
  const app = document.getElementById('app');
  const isAppPage = PROTECTED_ROUTES.includes(page);

  if (isAppPage) {
    // Render shell with navbar + sidebar + main content
    app.innerHTML = `
      <div id="navbar-container"></div>
      <div class="app-layout">
        <div id="sidebar-container"></div>
        <main class="main-content" id="main-content"></main>
      </div>
      <div id="toast-container" class="toast-container"></div>
    `;
    renderNavbar(document.getElementById('navbar-container'), { showHamburger: true, isApp: true });
    renderSidebar(document.getElementById('sidebar-container'));
  } else {
    app.innerHTML = `
      <div id="navbar-container"></div>
      <div id="main-content"></div>
      <div id="toast-container" class="toast-container"></div>
    `;
    renderNavbar(document.getElementById('navbar-container'), { showHamburger: false, isApp: false });
  }

  const mainEl = document.getElementById('main-content');

  switch (page) {
    case 'home':     renderHome(mainEl); break;
    case 'login':    renderLogin(mainEl); break;
    case 'register': renderRegister(mainEl); break;
    case 'dashboard':  renderDashboard(mainEl); break;
    case 'upload':     renderUpload(mainEl); break;
    case 'detection':  renderDetection(mainEl); break;
    case 'results':    renderResults(mainEl, options); break;
    case 'map':        renderMap(mainEl); break;
    case 'history':    renderHistory(mainEl); break;
    case 'projects':   renderProjects(mainEl); break;
    case 'about':      renderAbout(mainEl); break;
    case 'settings':   renderSettings(mainEl); break;
    default:           renderHome(mainEl);
  }

  // Re-init toasts in the new container
  initToasts();
}

function updateNavActiveState(page) {
  document.querySelectorAll('.nav-link, .sidebar-link').forEach(el => {
    el.classList.toggle('active', el.dataset.page === page);
  });
}

function updateSidebar() {
  const sidebar = document.getElementById('sidebar-container');
  if (sidebar) {
    const sidebarEl = sidebar.querySelector('.sidebar');
    if (sidebarEl) sidebarEl.classList.toggle('open', AppState.sidebarOpen);
  }
}

// Hash-based routing
window.addEventListener('popstate', (e) => {
  const page = (e.state && e.state.page) || 'home';
  renderPage(page, (e.state && e.state.options) || {});
  updateNavActiveState(page);
  updateSidebar();
});

// ============================================================
// Initial Render
// ============================================================
const initPage = location.hash.replace('#', '') || 'home';
navigateTo(initPage);
