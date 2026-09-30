// Toast Notification System
let toastContainer = null;

export function initToasts() {
  toastContainer = document.getElementById('toast-container');
}

export function showToast(message, type = 'info', title = '', duration = 4000) {
  if (!toastContainer) {
    toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;
  }

  const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };
  const defaultTitles = { success: 'Success', error: 'Error', warning: 'Warning', info: 'Info' };

  const toast = document.createElement('div');
  toast.className = `toast ${type} fade-in`;
  toast.innerHTML = `
    <span class="toast-icon">${icons[type] || 'ℹ️'}</span>
    <div class="toast-body">
      <div class="toast-title">${title || defaultTitles[type]}</div>
      <div class="toast-message">${message}</div>
    </div>
    <button class="toast-close" onclick="this.closest('.toast').remove()">✕</button>
  `;
  toastContainer.appendChild(toast);

  if (duration > 0) {
    setTimeout(() => {
      toast.classList.add('removing');
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }
  return toast;
}

// Expose globally
window.showToast = showToast;
window.initToasts = initToasts;
