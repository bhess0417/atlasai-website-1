
import './style.css';

const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

const opportunities = [
  { rank: 1, title: 'Review commercial insurance', impact: 18300, score: 96, confidence: 96, window: '20–60 days' },
  { rank: 2, title: 'Renegotiate merchant processing', impact: 14800, score: 92, confidence: 94, window: '45–90 days' },
  { rank: 3, title: 'Consolidate overlapping software', impact: 7900, score: 89, confidence: 91, window: '10–30 days' },
  { rank: 4, title: 'Rebid freight and logistics', impact: 5100, score: 84, confidence: 88, window: '30–75 days' },
];

document.querySelector('#app').innerHTML = `
  <div class="app-shell">
    <aside class="sidebar">
      <div class="brand">
        <div class="brand-mark">A</div>
        <div>
          <strong>ATLAS AI</strong>
          <span>SMARTLEDGER</span>
        </div>
      </div>

      <nav class="sidebar-nav" aria-label="Primary navigation">
        ${['Dashboard','Financial Imports','Transactions','Import History','Settings'].map((item, i) => `
          <button class="nav-item ${i === 0 ? 'active' : ''}" data-section="${item}">
            <span class="nav-icon">${['⌂','⇧','≡','◷','⚙'][i]}</span>
            <span>${item}</span>
          </button>`).join('')}
      </nav>

      <div class="sidebar-bottom">
        <div class="privacy-card">
          <span class="privacy-icon">◇</span>
          <div><strong>Private processing</strong><small>Files remain in your browser</small></div>
        </div>
        <button class="signout">↪ <span>Sign out</span></button>
      </div>
    </aside>

    <div class="workspace">
      <header class="topbar">
        <div>
          <span class="top-label">CURRENT WORKSPACE</span>
          <button class="workspace-button">Atlas AI Demo Company⌄</button>
        </div>
        <div class="top-actions">
          <button class="outline-button">Presentation mode</button>
          <span class="release-pill">ATLAS 19 · FINAL LAYOUT</span>
          <div class="profile">
            <span>BH</span>
            <div><strong>Brian Hess</strong><small>Owner</small></div>
          </div>
        </div>
      </header>

      <section class="demo-strip">
        <div>
          <span class="live-pill">LIVE DEMO WORKSPACE</span>
          <strong>Atlas Manufacturing Group</strong>
          <span>Fictional but internally consistent manufacturing data · 9,842 transactions</span>
        </div>
        <button class="outline-button">Reload demo data</button>
      </section>

      <main class="page">
        <div class="page-heading">
          <div>
            <span>ATLAS EXECUTIVE WORKSPACE · RELEASE 19</span>
            <h1>Atlas Manufacturing Group</h1>
            <small>187 employees · 3 locations · 9,842 transactions</small>
          </div>
          <button class="outline-button">Presentation mode</button>
        </div>

        <div class="dashboard-grid">
          <div class="content-column">
            <section class="panel executive-brief">
              <div class="brief-message">
                <span class="eyebrow">OVERNIGHT BRIEF · 4:17 AM</span>
                <h2>Good morning,<br>Brian.</h2>
                <p>Atlas reviewed 9,842 transactions and found 4 items requiring attention.</p>
              </div>
              <div class="brief-stat"><span>HEALTH</span><strong class="green">92</strong><small>Healthy</small></div>
              <div class="brief-stat"><span>SAVINGS</span><strong>$46,100.00</strong><small>Annual opportunity</small></div>
              <div class="brief-priority"><span>TOP PRIORITY</span><strong>Review commercial insurance</strong><button>Explain →</button></div>
              <button class="gold-button full-report">Full CEO report</button>
            </section>

            <section class="kpi-grid">
              <article class="panel kpi"><span>ANNUAL REVENUE</span><strong>$28,400,000.00</strong><small class="green">Healthy operating trend</small></article>
              <article class="panel kpi"><span>CASH ON HAND</span><strong>$2.84M</strong><small class="green">Low 90-day risk</small></article>
              <article class="panel kpi"><span>ACTIVE VENDORS</span><strong>412</strong><small class="green">Across 3 locations</small></article>
              <article class="panel kpi"><span>SAVINGS IDENTIFIED</span><strong>$46,100.00</strong><small class="green">4 ranked opportunities</small></article>
            </section>

            <section class="panel action-center">
              <div class="section-title">
                <div><span>TODAY'S ACTION CENTER</span><h3>Decisions with the greatest financial impact</h3></div>
                <span class="ranked-pill">RANKED BY ATLAS</span>
              </div>
              <div class="opportunity-grid">
                ${opportunities.map(o => `
                  <article class="opportunity-card">
                    <div class="opp-top"><span class="ready-pill">INVESTIGATION READY</span><small>${12 + o.rank * 2} evidence points</small></div>
                    <div class="opp-content">
                      <span class="rank">${o.rank}</span>
                      <div>
                        <small>${money.format(o.impact)} ESTIMATED ANNUAL IMPACT</small>
                        <h4>${o.title}</h4>
                        <div class="score-row"><span>Decision Score ${o.score}</span><span>${o.confidence}% confidence</span></div>
                        <small>${o.window}</small>
                      </div>
                      <button class="text-button" data-opportunity="${o.title}">Investigate →</button>
                    </div>
                  </article>`).join('')}
              </div>
            </section>

            <section class="panel trends-panel">
              <div class="section-title">
                <div><span>FINANCIAL TREND</span><h3>Monthly operating performance</h3></div>
                <button class="outline-button small">Last 6 months</button>
              </div>
              <div class="trend-chart" aria-label="Monthly operating performance chart">
                ${[58,66,62,73,81,88].map((h,i)=>`<div><span style="height:${h}%"></span><small>${['Feb','Mar','Apr','May','Jun','Jul'][i]}</small></div>`).join('')}
              </div>
            </section>

            <section class="panel evidence-panel">
              <div class="section-title">
                <div><span>EVIDENCE LIBRARY</span><h3>What Atlas reviewed</h3></div>
              </div>
              <div class="evidence-grid">
                <article><strong>9,842</strong><span>Transactions analyzed</span></article>
                <article><strong>412</strong><span>Active vendors reviewed</span></article>
                <article><strong>24</strong><span>Contracts compared</span></article>
                <article><strong>4</strong><span>Priority opportunities</span></article>
              </div>
            </section>
          </div>

          <aside class="atlas-column">
            <section class="atlas-panel">
              <header>
                <div class="atlas-title">
                  <span class="atlas-logo">A</span>
                  <div><span>ATLAS · EXECUTIVE COPILOT</span><strong>Ask Atlas</strong><small>Follow up on the brief without leaving your dashboard.</small></div>
                </div>
                <span class="ready-status">● READY</span>
              </header>

              <div id="chat" class="chat">
                <div class="message atlas-message">
                  <span class="avatar atlas-avatar">A</span>
                  <p>I am ready to help. Ask about savings, risk, vendors, cash flow, or any ranked opportunity.</p>
                </div>
              </div>

              <div class="quick-actions">
                <button data-prompt="Explain the top priority">Explain top priority</button>
                <button data-prompt="Where can we find savings?">Find savings</button>
                <button data-prompt="What should I watch this week?">Industry watch</button>
              </div>

              <form id="atlasForm" class="atlas-form">
                <input id="atlasInput" placeholder="Ask Atlas a question..." autocomplete="off" />
                <button class="gold-button" type="submit">Send →</button>
              </form>
              <small class="grounding">Demo answers are grounded in Atlas Manufacturing Group data.</small>
            </section>
          </aside>
        </div>
      </main>
    </div>
  </div>

  <div id="toast" class="toast"></div>
`;

const replies = {
  'Explain the top priority': 'Commercial insurance is the highest-ranked opportunity because Atlas found premiums 18% above the peer benchmark, two overlapping riders, and no competitive rebid in 31 months. Estimated annual savings: $18,300.',
  'Where can we find savings?': 'Atlas identified four ranked opportunities totaling $46,100 annually: commercial insurance, merchant processing, overlapping software, and freight contracts.',
  'What should I watch this week?': 'Watch merchant-processing fees, the upcoming insurance renewal window, and a 12% rise in freight cost per shipment at the West location.',
};

function addMessage(text, who = 'atlas') {
  const chat = document.querySelector('#chat');
  const wrapper = document.createElement('div');
  wrapper.className = `message ${who === 'atlas' ? 'atlas-message' : 'user-message'}`;
  wrapper.innerHTML = who === 'atlas'
    ? `<span class="avatar atlas-avatar">A</span><p>${text}</p>`
    : `<p>${text}</p><span class="avatar user-avatar">BH</span>`;
  chat.appendChild(wrapper);
  chat.scrollTop = chat.scrollHeight;
}

function answer(prompt) {
  addMessage(prompt, 'user');
  setTimeout(() => {
    const response = replies[prompt] || `I reviewed the demo company's 9,842 transactions. Based on the current evidence, the strongest next action is to investigate commercial insurance first, followed by merchant processing.`;
    addMessage(response, 'atlas');
  }, 250);
}

document.querySelectorAll('[data-prompt]').forEach(btn => btn.addEventListener('click', () => answer(btn.dataset.prompt)));
document.querySelectorAll('[data-opportunity]').forEach(btn => btn.addEventListener('click', () => answer(`Tell me about ${btn.dataset.opportunity}`)));

document.querySelector('#atlasForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const input = document.querySelector('#atlasInput');
  const value = input.value.trim();
  if (!value) return;
  answer(value);
  input.value = '';
});

document.querySelectorAll('.nav-item').forEach(btn => btn.addEventListener('click', () => {
  document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const toast = document.querySelector('#toast');
  toast.textContent = `${btn.dataset.section} selected`;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 1600);
}));
