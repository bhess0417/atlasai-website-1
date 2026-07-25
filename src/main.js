import './style.css';
import { supabase, supabaseEnabled } from './supabase.js';

const app = document.querySelector('#app');
const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

const demoCompanies = [
  { id: 'atlas', name: 'Atlas AI Demo Company', plan: 'Professional', role: 'Owner' },
  { id: 'arclight', name: 'ArcLight Customer Trial', plan: 'Enterprise Trial', role: 'Admin' }
];

const state = {
  user: JSON.parse(localStorage.getItem('atlas-user') || 'null'),
  company: localStorage.getItem('atlas-company') || 'atlas',
  view: 'dashboard',
  notifications: 5
};

const opportunities = [
  { title: 'Consolidate software subscriptions', impact: 5040, detail: 'Three overlapping tools can likely be replaced by one platform.', priority: 'High' },
  { title: 'Renegotiate payment processing', impact: 3600, detail: 'Current fees are above the benchmark for your transaction volume.', priority: 'High' },
  { title: 'Remove unused mobile lines', impact: 1344, detail: 'Four lines show no meaningful usage in the last 90 days.', priority: 'Medium' }
];

function toast(message) {
  const el = document.querySelector('#toast');
  if (!el) return;
  el.textContent = message;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 2400);
}

function authScreen(mode = 'login') {
  const isRegister = mode === 'register';
  const isForgot = mode === 'forgot';
  app.innerHTML = `
    <main class="auth-shell">
      <section class="auth-brand-panel">
        <div class="brand-lockup"><span class="brand-mark">A</span><div><strong>ATLAS AI</strong><small>SMARTLEDGER</small></div></div>
        <div class="auth-copy">
          <span class="eyebrow">SECURE FINANCIAL INTELLIGENCE</span>
          <h1>Clarity for every financial decision.</h1>
          <p>One protected workspace for savings opportunities, company reporting, team access, and future Atlas products.</p>
          <div class="auth-proof"><span>✓ Company-level isolation</span><span>✓ Role-based access</span><span>✓ Supabase-ready security</span></div>
        </div>
        <small class="legal">© 2026 Atlas AI, LLC</small>
      </section>
      <section class="auth-form-panel">
        <form id="authForm" class="auth-card">
          <span class="status-chip">Sprint 10</span>
          <h2>${isRegister ? 'Create your workspace' : isForgot ? 'Reset your password' : 'Welcome back'}</h2>
          <p>${isRegister ? 'Start your secure SmartLedger company account.' : isForgot ? 'Enter your email and we will send reset instructions.' : 'Sign in to your Atlas AI command center.'}</p>
          ${isRegister ? '<label>Company name<input id="companyName" required placeholder="Your company"></label>' : ''}
          ${!isForgot ? '<label>Full name<input id="fullName" '+(isRegister ? 'required' : '')+' placeholder="Brian Hess"></label>' : ''}
          <label>Email address<input id="email" type="email" required placeholder="you@company.com"></label>
          ${!isForgot ? '<label>Password<input id="password" type="password" required minlength="6" placeholder="••••••••"></label>' : ''}
          <button class="primary-button" type="submit">${isRegister ? 'Create account' : isForgot ? 'Send reset link' : 'Sign in'}</button>
          ${!isForgot ? '<button class="demo-button" type="button" id="demoLogin">Enter Sprint 10 demo</button>' : ''}
          <div class="auth-links">
            ${mode === 'login' ? '<button type="button" data-auth="forgot">Forgot password?</button><button type="button" data-auth="register">Create account</button>' : '<button type="button" data-auth="login">Back to sign in</button>'}
          </div>
          <small class="configuration">${supabaseEnabled ? '● Supabase connected' : '● Demo mode — add .env values to connect Supabase'}</small>
        </form>
      </section>
    </main>`;

  document.querySelectorAll('[data-auth]').forEach(btn => btn.addEventListener('click', () => authScreen(btn.dataset.auth)));
  document.querySelector('#demoLogin')?.addEventListener('click', () => loginDemo());
  document.querySelector('#authForm').addEventListener('submit', handleAuth);
}

async function handleAuth(event) {
  event.preventDefault();
  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#password')?.value;
  const fullName = document.querySelector('#fullName')?.value.trim() || 'Atlas User';
  const companyName = document.querySelector('#companyName')?.value.trim();
  const heading = document.querySelector('.auth-card h2').textContent;

  if (heading.includes('Reset')) {
    if (supabaseEnabled) await supabase.auth.resetPasswordForEmail(email);
    toast('Password reset instructions prepared.');
    return;
  }
  if (supabaseEnabled) {
    const result = heading.includes('Create')
      ? await supabase.auth.signUp({ email, password, options: { data: { full_name: fullName, company_name: companyName } } })
      : await supabase.auth.signInWithPassword({ email, password });
    if (result.error) return toast(result.error.message);
  }
  state.user = { name: fullName || email.split('@')[0], email, role: 'Owner' };
  localStorage.setItem('atlas-user', JSON.stringify(state.user));
  renderApp();
}

function loginDemo() {
  state.user = { name: 'Brian Hess', email: 'founder@atlasaiusa.com', role: 'Owner' };
  localStorage.setItem('atlas-user', JSON.stringify(state.user));
  renderApp();
}

function renderApp() {
  const company = demoCompanies.find(c => c.id === state.company) || demoCompanies[0];
  app.innerHTML = `
    <div class="app-shell">
      <aside class="sidebar" id="sidebar">
        <div class="brand-lockup sidebar-brand"><span class="brand-mark">A</span><div><strong>ATLAS AI</strong><small>SMARTLEDGER</small></div></div>
        <nav class="side-nav">
          ${navItem('dashboard','⌂','Dashboard')}${navItem('company','▦','Company')}${navItem('team','♙','Team & Roles')}${navItem('notifications','♢','Notifications')}${navItem('billing','◇','Billing')}${navItem('settings','⚙','Settings')}
        </nav>
        <div class="security-card"><span>◈</span><div><strong>Workspace protected</strong><small>Company isolation active</small></div></div>
        <button id="logout" class="logout">↪ Sign out</button>
      </aside>
      <main class="main-area">
        <header class="topbar">
          <button class="menu" id="menu">☰</button>
          <div class="company-select-wrap"><small>CURRENT WORKSPACE</small><select id="companySelect">${demoCompanies.map(c => `<option value="${c.id}" ${c.id === company.id ? 'selected' : ''}>${c.name}</option>`).join('')}</select></div>
          <div class="top-actions"><button id="notificationBell" class="bell">♢<span>${state.notifications}</span></button><div class="user-chip"><span>${initials(state.user.name)}</span><div><strong>${state.user.name}</strong><small>${company.role}</small></div></div></div>
        </header>
        <section id="content"></section>
      </main>
    </div><div id="toast" class="toast"></div>`;
  bindShell();
  renderView();
}

function navItem(view, icon, label) { return `<button class="nav-item ${state.view === view ? 'active' : ''}" data-view="${view}"><span>${icon}</span>${label}</button>`; }
function initials(name) { return name.split(' ').map(x => x[0]).slice(0,2).join('').toUpperCase(); }

function bindShell() {
  document.querySelectorAll('[data-view]').forEach(btn => btn.addEventListener('click', () => { state.view = btn.dataset.view; renderApp(); }));
  document.querySelector('#companySelect').addEventListener('change', e => { state.company = e.target.value; localStorage.setItem('atlas-company', state.company); renderApp(); });
  document.querySelector('#logout').addEventListener('click', async () => { if (supabaseEnabled) await supabase.auth.signOut(); localStorage.removeItem('atlas-user'); state.user = null; authScreen(); });
  document.querySelector('#notificationBell').addEventListener('click', () => { state.view = 'notifications'; renderApp(); });
  document.querySelector('#menu').addEventListener('click', () => document.querySelector('#sidebar').classList.toggle('open'));
}

function renderView() {
  const content = document.querySelector('#content');
  const company = demoCompanies.find(c => c.id === state.company);
  const views = { dashboard, company: companyView, team, notifications, billing, settings };
  content.innerHTML = views[state.view](company);
  bindViewActions();
}

function pageHeader(kicker, title, text) { return `<div class="page-header"><div><span class="eyebrow">${kicker}</span><h1>${title}</h1><p>${text}</p></div><span class="plan-chip">${demoCompanies.find(c => c.id === state.company).plan}</span></div>`; }

function dashboard(company) {
  return `${pageHeader('FINANCIAL COMMAND CENTER', `Good afternoon, ${state.user.name.split(' ')[0]}`, `${company.name} is secure, synced, and ready for review.`)}
  <div class="metrics"><article><small>YTD SAVINGS FOUND</small><strong>${money.format(18462)}</strong><span>↑ 22% vs. target</span></article><article><small>ACTIVE OPPORTUNITIES</small><strong>7</strong><span>${money.format(9984)} annual impact</span></article><article><small>TEAM MEMBERS</small><strong>4</strong><span>2 roles assigned</span></article><article><small>SECURITY STATUS</small><strong class="secure-text">Protected</strong><span>RLS architecture ready</span></article></div>
  <div class="dashboard-grid"><article class="panel opportunity-panel"><div class="panel-heading"><div><small>ATLAS OPPORTUNITY RADAR</small><h2>Prioritized savings</h2></div><button class="text-button" data-action="review">Review all</button></div>${opportunities.map(o => `<div class="opportunity"><span class="priority ${o.priority.toLowerCase()}">${o.priority}</span><div><strong>${o.title}</strong><p>${o.detail}</p></div><b>${money.format(o.impact)}/yr</b></div>`).join('')}</article>
  <article class="panel readiness"><small>SPRINT 10 READINESS</small><h2>Commercial foundation</h2><div class="ring"><strong>82%</strong><span>ready</span></div><ul><li class="done">Authentication foundation</li><li class="done">Company workspaces</li><li class="done">Roles and permissions</li><li>Live Supabase configuration</li></ul></article></div>`;
}

function companyView(company) { return `${pageHeader('COMPANY WORKSPACE','Company profile','Manage the identity and operating details for this protected workspace.')}<form class="panel form-grid" id="companyForm"><label>Company name<input value="${company.name}"></label><label>Workspace ID<input value="${company.id}" disabled></label><label>Industry<select><option>Technology</option><option>Professional Services</option><option>Construction</option><option>Retail</option></select></label><label>Fiscal year begins<select><option>January</option><option>July</option></select></label><label class="wide">Company logo<div class="upload-box">A <span>Upload logo</span></div></label><button class="primary-button fit" type="submit">Save company</button></form>`; }

function team() { const members=[['Brian Hess','Owner','Full access'],['Morgan Lee','Admin','Manage users and accounts'],['Jordan Kim','Accountant','Reports and exports'],['Taylor Reed','Employee','Dashboard view']]; return `${pageHeader('ACCESS CONTROL','Team and roles','Control who can enter this company workspace and what they can do.')}<div class="panel"><div class="panel-heading"><div><small>4 ACTIVE USERS</small><h2>Workspace members</h2></div><button class="primary-button fit" data-action="invite">+ Invite user</button></div><div class="member-list">${members.map(m=>`<div><span class="avatar-small">${initials(m[0])}</span><div><strong>${m[0]}</strong><small>${m[2]}</small></div><select><option selected>${m[1]}</option><option>Owner</option><option>Admin</option><option>Accountant</option><option>Employee</option></select></div>`).join('')}</div></div>`; }

function notifications() { return `${pageHeader('NOTIFICATION CENTER','What needs attention','Five recent events across your SmartLedger workspace.')}<div class="panel notification-list">${[['New savings opportunity','Atlas identified overlapping software subscriptions.','2 min ago'],['Bank sync complete','All connected demo accounts are current.','18 min ago'],['Monthly report ready','Your executive financial summary is prepared.','Today'],['Team member invited','Jordan Kim received workspace access.','Yesterday'],['Security review passed','No cross-company access issues were detected.','Yesterday']].map((n,i)=>`<article><span>${i<2?'●':'○'}</span><div><strong>${n[0]}</strong><p>${n[1]}</p></div><small>${n[2]}</small></article>`).join('')}<button class="demo-button fit" data-action="read">Mark all as read</button></div>`; }

function billing(company) { return `${pageHeader('SUBSCRIPTION FOUNDATION','Billing and plan','The payment connection is staged for a future Stripe integration.')}<div class="billing-grid"><article class="panel current-plan"><small>CURRENT PLAN</small><h2>${company.plan}</h2><strong>Founding customer access</strong><p>Authentication, company workspaces, team roles, reports, and priority support.</p><button class="primary-button" data-action="billing">Manage subscription</button></article><article class="panel"><small>PLANNED TIERS</small><div class="tier"><b>Starter</b><span>Core monitoring</span></div><div class="tier featured"><b>Professional</b><span>AI insights + teams</span></div><div class="tier"><b>Enterprise</b><span>Multi-company controls</span></div></article></div>`; }

function settings() { return `${pageHeader('PERSONAL SETTINGS','Profile and preferences','Manage your account, password, appearance, and alerts.')}<form id="settingsForm" class="panel form-grid"><label>Full name<input value="${state.user.name}"></label><label>Email<input type="email" value="${state.user.email}"></label><label>Role<input value="${state.user.role}" disabled></label><label>Theme<select><option>Atlas Dark</option><option>System default</option></select></label><label class="toggle-row wide"><span><strong>Opportunity alerts</strong><small>Notify me when Atlas finds new savings.</small></span><input type="checkbox" checked></label><label class="toggle-row wide"><span><strong>Monthly reports</strong><small>Prepare an executive summary each month.</small></span><input type="checkbox" checked></label><button class="primary-button fit" type="submit">Save settings</button></form>`; }

function bindViewActions() {
  document.querySelector('#companyForm')?.addEventListener('submit', e => { e.preventDefault(); toast('Company settings saved.'); });
  document.querySelector('#settingsForm')?.addEventListener('submit', e => { e.preventDefault(); toast('Profile settings saved.'); });
  document.querySelectorAll('[data-action]').forEach(btn => btn.addEventListener('click', () => {
    const messages = { review:'Opportunity report opened.', invite:'Invitation workflow is ready for backend connection.', read:'All notifications marked as read.', billing:'Billing portal placeholder opened.' };
    if (btn.dataset.action === 'read') { state.notifications = 0; }
    toast(messages[btn.dataset.action] || 'Action complete.');
  }));
}

if (state.user) renderApp(); else authScreen();
