// Auth Pages — Login & Register
export function renderLogin(container) {
  container.innerHTML = `
    <div class="auth-page fade-in" role="main">
      <div class="auth-grid-bg" aria-hidden="true"></div>
      <div class="auth-container">
        <!-- Back to home -->
        <div style="text-align:center;margin-bottom:20px;">
          <button class="btn btn-ghost btn-sm" onclick="navigateTo('home')" id="back-home-btn">← Back to Home</button>
        </div>

        <div class="auth-card">
          <div class="auth-logo">
            <div class="logo-icon">🛰️</div>
            <span>GeoBuild AI</span>
          </div>
          <h1 class="auth-title">Welcome back</h1>
          <p class="auth-subtitle">Sign in to your account to continue building detection.</p>

          <!-- Google Login -->
          <button class="btn-google" onclick="handleGoogleLogin()" id="google-login-btn" aria-label="Continue with Google">
            <svg class="google-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          <div class="divider">
            <div class="divider-line"></div>
            <span class="divider-text">or sign in with email</span>
            <div class="divider-line"></div>
          </div>

          <form id="login-form" novalidate>
            <div class="form-group">
              <label class="form-label" for="login-email">Email Address</label>
              <input
                class="form-control" type="email" id="login-email"
                placeholder="you@example.com"
                autocomplete="email" required
                aria-required="true"
              />
              <div class="form-error hidden" id="login-email-error" role="alert">⚠ Please enter a valid email address.</div>
            </div>

            <div class="form-group">
              <label class="form-label" for="login-password">Password</label>
              <div class="input-group">
                <input
                  class="form-control" type="password" id="login-password"
                  placeholder="Enter your password"
                  autocomplete="current-password" required
                  aria-required="true"
                />
                <button type="button" class="input-group-icon" onclick="togglePassword('login-password', this)" aria-label="Toggle password visibility">👁</button>
              </div>
              <div class="form-error hidden" id="login-password-error" role="alert">⚠ Password is required.</div>
            </div>

            <div style="text-align:right;margin-bottom:16px;">
              <a href="#" class="auth-link" style="font-size:0.82rem;" onclick="showForgotPassword();return false;">Forgot Password?</a>
            </div>

            <button type="submit" class="btn btn-primary w-full" id="login-submit-btn" style="padding:12px;">
              Sign In to GeoBuild AI
            </button>

            <button type="button" class="btn btn-outline-cyan w-full" id="instant-demo-btn" style="margin-top:10px; padding:10px;" onclick="loginDemo('evaluator@geobuild.ai', 'Project Evaluator', 'Academic Evaluator')">
              ⚡ Instant Demo Sign-In (For Evaluators)
            </button>

            <div class="demo-banner" style="margin-top:16px;">
              💡 <strong>Demo:</strong> Enter any email &amp; password or click Instant Demo Sign-In to evaluate the platform.
            </div>
          </form>

          <div class="auth-footer">
            Don't have an account?
            <span class="auth-link" onclick="navigateTo('register')" role="button" tabindex="0">Create Account</span>
          </div>
        </div>
      </div>
    </div>
  `;

  // Form submission
  document.getElementById('login-form').addEventListener('submit', handleLoginSubmit);

  window.handleLoginSubmit = function(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;
    let valid = true;

    // Validate email
    const emailEl = document.getElementById('login-email-error');
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      emailEl.classList.remove('hidden');
      valid = false;
    } else {
      emailEl.classList.add('hidden');
    }

    // Validate password
    const passEl = document.getElementById('login-password-error');
    if (!password) {
      passEl.classList.remove('hidden');
      valid = false;
    } else {
      passEl.classList.add('hidden');
    }

    if (!valid) return;

    const btn = document.getElementById('login-submit-btn');
    btn.disabled = true;
    btn.textContent = '⏳ Signing in...';

    // Simulate auth (replace with Firebase Authentication)
    setTimeout(() => {
      const name = email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      window.loginDemo(email, name, 'student');
    }, 1200);
  };

  window.handleGoogleLogin = function() {
    window.showToast('Google Authentication requires Firebase setup. Using demo login.', 'info', 'Firebase Not Configured');
    setTimeout(() => window.loginDemo('demo@gmail.com', 'Google User', 'student'), 800);
  };

  window.showForgotPassword = function() {
    window.showToast('Password reset requires Firebase Authentication to be configured.', 'info', 'Firebase Required');
  };

  window.togglePassword = function(id, btn) {
    const input = document.getElementById(id);
    if (input.type === 'password') { input.type = 'text'; btn.textContent = '🙈'; }
    else { input.type = 'password'; btn.textContent = '👁'; }
  };
}

export function renderRegister(container) {
  let selectedRole = 'student';

  container.innerHTML = `
    <div class="auth-page fade-in" role="main">
      <div class="auth-grid-bg" aria-hidden="true"></div>
      <div class="auth-container" style="max-width:500px;">
        <div style="text-align:center;margin-bottom:20px;">
          <button class="btn btn-ghost btn-sm" onclick="navigateTo('home')" id="back-home-reg-btn">← Back to Home</button>
        </div>

        <div class="auth-card">
          <div class="auth-logo">
            <div class="logo-icon">🛰️</div>
            <span>GeoBuild AI</span>
          </div>
          <h1 class="auth-title">Create your account</h1>
          <p class="auth-subtitle">Join GeoBuild AI and start analyzing satellite imagery.</p>

          <button class="btn-google" onclick="handleGoogleRegister()" id="google-reg-btn" aria-label="Continue with Google">
            <svg class="google-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          <div class="divider">
            <div class="divider-line"></div>
            <span class="divider-text">or create with email</span>
            <div class="divider-line"></div>
          </div>

          <form id="register-form" novalidate>
            <div class="form-group">
              <label class="form-label" for="reg-name">Full Name</label>
              <input class="form-control" type="text" id="reg-name" placeholder="Your full name" autocomplete="name" required aria-required="true" />
              <div class="form-error hidden" id="reg-name-error" role="alert">⚠ Full name is required.</div>
            </div>

            <div class="form-group">
              <label class="form-label" for="reg-email">Email Address</label>
              <input class="form-control" type="email" id="reg-email" placeholder="you@example.com" autocomplete="email" required aria-required="true" />
              <div class="form-error hidden" id="reg-email-error" role="alert">⚠ Please enter a valid email address.</div>
            </div>

            <div class="form-group">
              <label class="form-label" for="reg-institution">Institution / College <span style="color:var(--text-muted);font-weight:400">(Optional)</span></label>
              <input class="form-control" type="text" id="reg-institution" placeholder="e.g. IIT Ahmedabad" autocomplete="organization" />
            </div>

            <div class="form-group">
              <label class="form-label" for="reg-password">Password</label>
              <div class="input-group">
                <input class="form-control" type="password" id="reg-password" placeholder="Min. 8 characters" autocomplete="new-password" required aria-required="true" />
                <button type="button" class="input-group-icon" onclick="togglePassword('reg-password', this)" aria-label="Toggle password visibility">👁</button>
              </div>
              <div class="form-error hidden" id="reg-password-error" role="alert">⚠ Password must be at least 8 characters.</div>
            </div>

            <div class="form-group">
              <label class="form-label" for="reg-confirm">Confirm Password</label>
              <div class="input-group">
                <input class="form-control" type="password" id="reg-confirm" placeholder="Repeat your password" autocomplete="new-password" required aria-required="true" />
                <button type="button" class="input-group-icon" onclick="togglePassword('reg-confirm', this)" aria-label="Toggle confirm password visibility">👁</button>
              </div>
              <div class="form-error hidden" id="reg-confirm-error" role="alert">⚠ Passwords do not match.</div>
            </div>

            <div class="form-group">
              <label class="form-label">Select Your Role</label>
              <div class="role-grid" role="group" aria-label="User role selection">
                ${[
                  { id: 'student', icon: '🎓', label: 'Student' },
                  { id: 'researcher', icon: '🔬', label: 'Researcher' },
                  { id: 'teacher', icon: '📚', label: 'Teacher' },
                  { id: 'admin', icon: '⚙️', label: 'Admin' },
                ].map(r => `
                  <div class="role-option ${r.id==='student'?'selected':''}"
                       data-role="${r.id}"
                       onclick="selectRole('${r.id}')"
                       role="radio" aria-checked="${r.id==='student'}"
                       tabindex="0"
                       onkeydown="if(event.key==='Enter'||event.key===' ')selectRole('${r.id}')">
                    <div class="role-icon">${r.icon}</div>
                    <div>${r.label}</div>
                  </div>
                `).join('')}
              </div>
            </div>

            <button type="submit" class="btn btn-primary w-full" id="register-submit-btn" style="padding:12px;">
              🚀 Create Account
            </button>

            <div class="demo-banner" style="margin-top:16px;">
              💡 <strong>Demo:</strong> Registration uses demo mode — no real Firebase configured.
            </div>
          </form>

          <div class="auth-footer">
            Already have an account?
            <span class="auth-link" onclick="navigateTo('login')" role="button" tabindex="0">Sign In</span>
          </div>
        </div>
      </div>
    </div>
  `;

  window.selectRole = function(role) {
    selectedRole = role;
    document.querySelectorAll('.role-option').forEach(el => {
      const isSelected = el.dataset.role === role;
      el.classList.toggle('selected', isSelected);
      el.setAttribute('aria-checked', isSelected);
    });
  };

  window.handleGoogleRegister = function() {
    window.showToast('Google Authentication requires Firebase setup. Using demo.', 'info', 'Firebase Not Configured');
    setTimeout(() => window.loginDemo('demo@gmail.com', 'Google User', selectedRole), 800);
  };

  document.getElementById('register-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('reg-name').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const password = document.getElementById('reg-password').value;
    const confirm = document.getElementById('reg-confirm').value;
    let valid = true;

    const nameErr = document.getElementById('reg-name-error');
    if (!name) { nameErr.classList.remove('hidden'); valid = false; } else nameErr.classList.add('hidden');

    const emailErr = document.getElementById('reg-email-error');
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { emailErr.classList.remove('hidden'); valid = false; } else emailErr.classList.add('hidden');

    const passErr = document.getElementById('reg-password-error');
    if (!password || password.length < 8) { passErr.classList.remove('hidden'); valid = false; } else passErr.classList.add('hidden');

    const confErr = document.getElementById('reg-confirm-error');
    if (password !== confirm) { confErr.classList.remove('hidden'); valid = false; } else confErr.classList.add('hidden');

    if (!valid) return;

    const btn = document.getElementById('register-submit-btn');
    btn.disabled = true;
    btn.textContent = '⏳ Creating account...';

    setTimeout(() => {
      window.loginDemo(email, name, selectedRole);
    }, 1400);
  });
}
