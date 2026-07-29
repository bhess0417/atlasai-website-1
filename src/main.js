
import './style.css';

const money = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0
});

const opportunities = [
  {
    id: 'insurance',
    rank: 1,
    title: 'Review commercial insurance',
    impact: 18300,
    score: 96,
    confidence: 96,
    window: '20–60 days',
    status: 'Investigation ready',
    summary: 'Commercial insurance costs are 18% above the peer benchmark.',
    reasoning: [
      'Premiums are 18% above comparable manufacturers with similar revenue and headcount.',
      'No competitive rebid has occurred in 31 months.',
      'Two policy riders appear to overlap with existing coverage.'
    ],
    evidence: [
      ['Premium history', '36 months reviewed', 'verified'],
      ['Policy renewal dates', 'Next renewal in 74 days', 'verified'],
      ['Carrier comparison', '4 peer carriers matched', 'verified'],
      ['Coverage overlap', '2 overlapping riders detected', 'attention'],
      ['Claims history', 'Loss ratio remains favorable', 'verified'],
      ['Industry benchmark', 'Manufacturing peer set', 'verified']
    ],
    action: 'Request three competitive quotes before the renewal date.',
    timeline: '21 days',
    emailSubject: 'Request for competitive commercial insurance quotes',
    emailBody: 'We are reviewing our commercial insurance program ahead of renewal and would like three competitive quote options with a line-by-line comparison of coverage, limits, deductibles, exclusions, and fees.'
  },
  {
    id: 'processing',
    rank: 2,
    title: 'Renegotiate merchant processing',
    impact: 14800,
    score: 92,
    confidence: 94,
    window: '45–90 days',
    status: 'Investigation ready',
    summary: 'Effective processing fees increased 11% this quarter.',
    reasoning: [
      'The blended effective rate increased from 2.61% to 2.90%.',
      'Two avoidable gateway fees are charged across three locations.',
      'Current volume qualifies the company for a stronger pricing tier.'
    ],
    evidence: [
      ['Processing statements', '12 months reviewed', 'verified'],
      ['Fee schedule', '18 fee types categorized', 'verified'],
      ['Volume tier', '$7.3M annual card volume', 'verified'],
      ['Gateway duplication', '2 overlapping fees', 'attention'],
      ['Chargeback history', 'Below peer median', 'verified'],
      ['Provider benchmark', '5 processors compared', 'verified']
    ],
    action: 'Request interchange-plus pricing and remove duplicate gateway fees.',
    timeline: '30 days',
    emailSubject: 'Merchant processing pricing review',
    emailBody: 'Please provide a revised interchange-plus proposal based on our current annual card volume, including removal of duplicate gateway fees and a full schedule of monthly and transaction-level charges.'
  },
  {
    id: 'software',
    rank: 3,
    title: 'Consolidate overlapping software',
    impact: 7900,
    score: 89,
    confidence: 91,
    window: '10–30 days',
    status: 'Investigation ready',
    summary: 'Atlas found duplicate functions across six software subscriptions.',
    reasoning: [
      'Three collaboration tools provide substantially overlapping functionality.',
      'Twenty-seven paid seats show no activity in the last 90 days.',
      'Two annual renewals occur within the next 45 days.'
    ],
    evidence: [
      ['Subscription ledger', '64 subscriptions reviewed', 'verified'],
      ['Seat utilization', '27 inactive seats', 'attention'],
      ['Feature overlap', '6 products matched', 'verified'],
      ['Renewal calendar', '2 renewals within 45 days', 'verified'],
      ['Department ownership', 'All owners identified', 'verified'],
      ['Contract terms', '4 cancellation windows open', 'verified']
    ],
    action: 'Cancel inactive seats and consolidate collaboration tools before renewal.',
    timeline: '14 days',
    emailSubject: 'Software subscription consolidation review',
    emailBody: 'We are reviewing software usage and renewals. Please confirm active users, business owner, renewal date, cancellation deadline, and required functionality for each subscription assigned to your department.'
  },
  {
    id: 'freight',
    rank: 4,
    title: 'Rebid freight and logistics',
    impact: 5100,
    score: 84,
    confidence: 88,
    window: '30–75 days',
    status: 'Investigation ready',
    summary: 'Freight cost per shipment is 12% higher at the West location.',
    reasoning: [
      'The West location pays a higher average cost on comparable lanes.',
      'Fuel surcharges increased without a corresponding contract review.',
      'Shipment volume is sufficient for a regional bid.'
    ],
    evidence: [
      ['Freight invoices', '1,284 shipments reviewed', 'verified'],
      ['Lane comparison', '19 recurring lanes matched', 'verified'],
      ['Fuel surcharge', '12-month trend analyzed', 'attention'],
      ['Location variance', 'West location +12%', 'attention'],
      ['Carrier concentration', '68% with one carrier', 'verified'],
      ['Regional benchmark', '3 carrier bids modeled', 'verified']
    ],
    action: 'Issue a regional bid for recurring freight lanes.',
    timeline: '35 days',
    emailSubject: 'Request for freight lane proposal',
    emailBody: 'We are requesting updated pricing for our recurring freight lanes. Please include base rate, fuel surcharge methodology, accessorial charges, service commitments, and volume-based discounts.'
  }
];

let selectedOpportunity = null;
let currentMode = 'chat';

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
          <span class="release-pill">ATLAS 20.2 · VERIFIED SAVINGS</span>
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
            <span>ATLAS EXECUTIVE WORKSPACE · RELEASE 20.2</span>
            <h1>Atlas Manufacturing Group</h1>
            <small>187 employees · 3 locations · 9,842 transactions</small>
          </div>
          <button class="outline-button">Presentation mode</button>
        </div>

        <div class="dashboard-grid">
          <div class="content-column">
            <section id="dashboard-section" class="panel executive-brief">
              <div class="brief-message">
                <span class="eyebrow">OVERNIGHT BRIEF · 4:17 AM</span>
                <h2>Good morning,<br>Brian.</h2>
                <p>Atlas reviewed 9,842 transactions and found 4 items requiring attention.</p>
              </div>
              <div class="brief-stat"><span>HEALTH</span><strong class="green">92</strong><small>Healthy</small></div>
              <div class="brief-stat"><span>SAVINGS</span><strong>$46,100.00</strong><small>Annual opportunity</small></div>
              <div class="brief-priority"><span>TOP PRIORITY</span><strong>Review commercial insurance</strong><button data-open-investigation="insurance">Explain →</button></div>
              <button id="fullReportButton" class="gold-button full-report">Full CEO report</button>
            </section>

            <section id="financial-imports-section" class="kpi-grid">
              <article class="panel kpi"><span>ANNUAL REVENUE</span><strong>$28,400,000.00</strong><small class="green">Healthy operating trend</small></article>
              <article class="panel kpi"><span>CASH ON HAND</span><strong>$2.84M</strong><small class="green">Low 90-day risk</small></article>
              <article class="panel kpi"><span>ACTIVE VENDORS</span><strong>412</strong><small class="green">Across 3 locations</small></article>
              <article class="panel kpi"><span>SAVINGS IDENTIFIED</span><strong>$46,100.00</strong><small class="green">4 ranked opportunities</small></article>
            </section>

            <section class="panel savings-proof-panel">
              <div class="section-title">
                <div><span>VALUE DELIVERED</span><h3>Atlas proves its financial impact</h3></div>
                <span class="verified-pill">VERIFIED BY ATLAS</span>
              </div>
              <div class="savings-proof-grid">
                <article><span>SAVINGS IDENTIFIED</span><strong>$46,100</strong><small>4 ranked opportunities</small></article>
                <article><span>VERIFIED SAVINGS</span><strong>$18,400</strong><small>Implemented and confirmed</small></article>
                <article><span>SAVINGS YTD</span><strong>$127,800</strong><small>January through July</small></article>
                <article><span>ROI MULTIPLE</span><strong>12.8×</strong><small>Value versus subscription cost</small></article>
              </div>
            </section>

            <section id="transactions-section" class="panel confidence-panel">
              <div class="section-title">
                <div><span>ANALYSIS CONFIDENCE</span><h3>Atlas has enough evidence to act</h3></div>
                <span class="confidence-badge">94% OVERALL</span>
              </div>
              <div class="confidence-grid">
                <article><strong>9,842</strong><span>Transactions analyzed</span><div class="meter"><i style="width:100%"></i></div></article>
                <article><strong>412</strong><span>Vendors reviewed</span><div class="meter"><i style="width:97%"></i></div></article>
                <article><strong>87%</strong><span>Benchmark coverage</span><div class="meter"><i style="width:87%"></i></div></article>
                <article><strong>4:17 AM</strong><span>Last analysis completed</span><div class="meter"><i style="width:94%"></i></div></article>
              </div>
            </section>

            <section id="import-history-section" class="panel action-center">
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
                      <button class="text-button" data-open-investigation="${o.id}">Investigate →</button>
                    </div>
                  </article>`).join('')}
              </div>
            </section>

            <section id="settings-section" class="panel trends-panel">
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
            <section id="atlasPanel" class="atlas-panel"></section>
          </aside>
        </div>
      </main>
    </div>
  </div>


  <div id="reportModal" class="reportModal" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,.7);z-index:999;align-items:center;justify-content:center;">
    <div style="background:#0d2235;color:white;padding:24px;border-radius:16px;max-width:700px;width:90%">
      <h2>CEO Executive Report</h2>
      <p><strong>Business Health:</strong> 92</p>
      <p><strong>Revenue:</strong> $28.4M</p>
      <p><strong>Cash:</strong> $2.84M</p>
      <p><strong>Savings Identified:</strong> $46,100</p>
      <h3>Top Priority</h3>
      <p>Review commercial insurance before renewal.</p>
      <button id="investigateTop">Investigate Top Priority</button>
      <button id="closeReport">Close</button>
    </div>
  </div>
  <div id="toast" class="toast"></div>
`;

function renderChat() {
  currentMode = 'chat';
  const panel = document.querySelector('#atlasPanel');
  panel.innerHTML = `
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
        <p>I am ready to help. Open any opportunity to see the evidence, reasoning, confidence, and next action.</p>
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
  `;
  bindChatEvents();
}

function renderInvestigation(opportunity) {
  selectedOpportunity = opportunity;
  currentMode = 'investigation';
  const panel = document.querySelector('#atlasPanel');
  panel.innerHTML = `
    <header class="investigation-header">
      <button class="back-button" id="backToAtlas">← Ask Atlas</button>
      <span class="ready-status">● ${opportunity.status.toUpperCase()}</span>
    </header>

    <div class="investigation-scroll">
      <div class="investigation-title">
        <span class="atlas-logo">A</span>
        <div>
          <span>EXECUTIVE INVESTIGATION · PRIORITY ${opportunity.rank}</span>
          <h2>${opportunity.title}</h2>
          <p>${opportunity.summary}</p>
        </div>
      </div>

      <div class="investigation-metrics">
        <article><span>ESTIMATED ANNUAL SAVINGS</span><strong>${money.format(opportunity.impact)}</strong></article>
        <article><span>CONFIDENCE</span><strong>${opportunity.confidence}%</strong></article>
        <article><span>EXPECTED TIMELINE</span><strong>${opportunity.timeline}</strong></article>
      </div>

      <section class="investigation-section">
        <div class="investigation-section-heading">
          <div><span>EVIDENCE REVIEWED</span><h3>What Atlas used</h3></div>
          <span class="evidence-count">${opportunity.evidence.length} SOURCES</span>
        </div>
        <div class="evidence-list">
          ${opportunity.evidence.map(([name, detail, state]) => `
            <button class="evidence-row" data-evidence="${name}: ${detail}">
              <span class="evidence-check ${state}">${state === 'attention' ? '!' : '✓'}</span>
              <span><strong>${name}</strong><small>${detail}</small></span>
              <span class="chevron">›</span>
            </button>
          `).join('')}
        </div>
      </section>

      <section class="investigation-section">
        <span>ATLAS REASONING</span>
        <h3>Why this is ranked #${opportunity.rank}</h3>
        <ol class="reasoning-list">
          ${opportunity.reasoning.map(item => `<li>${item}</li>`).join('')}
        </ol>
      </section>

      <section class="recommendation-box">
        <span>RECOMMENDED ACTION</span>
        <h3>${opportunity.action}</h3>
        <p>Expected implementation: <strong>${opportunity.timeline}</strong></p>
      </section>

      <div class="action-stack">
        <button class="gold-button action-button" id="draftEmail">Draft email</button>
        <button class="outline-button action-button" id="buildPlan">Build action plan</button>
        <button class="outline-button action-button" id="askWhy">Ask Atlas why</button>
        <button class="outline-button action-button muted-action" id="markComplete">Mark complete</button>
      </div>

      <div id="investigationOutput" class="investigation-output"></div>
    </div>
  `;
  bindInvestigationEvents(opportunity);
}

function bindInvestigationEvents(opportunity) {
  document.querySelector('#backToAtlas').addEventListener('click', renderChat);

  document.querySelectorAll('[data-evidence]').forEach(button => {
    button.addEventListener('click', () => {
      const output = document.querySelector('#investigationOutput');
      output.innerHTML = `<div class="output-card"><span>SUPPORTING EVIDENCE</span><p>${button.dataset.evidence}</p><small>Verified in the Atlas demo dataset.</small></div>`;
      output.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  });

  document.querySelector('#draftEmail').addEventListener('click', () => {
    const output = document.querySelector('#investigationOutput');
    output.innerHTML = `
      <div class="output-card">
        <span>DRAFT EMAIL</span>
        <label>Subject</label>
        <input value="${opportunity.emailSubject}" />
        <label>Message</label>
        <textarea rows="7">${opportunity.emailBody}</textarea>
        <button class="gold-button" id="copyDraft">Copy draft</button>
      </div>`;
    document.querySelector('#copyDraft').addEventListener('click', async () => {
      const text = `Subject: ${opportunity.emailSubject}\n\n${opportunity.emailBody}`;
      try { await navigator.clipboard.writeText(text); showToast('Draft copied'); }
      catch { showToast('Draft ready to copy'); }
    });
    output.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  document.querySelector('#buildPlan').addEventListener('click', () => {
    const output = document.querySelector('#investigationOutput');
    output.innerHTML = `
      <div class="output-card">
        <span>ACTION PLAN</span>
        <ol class="action-plan">
          <li>Assign an executive owner.</li>
          <li>Validate the highlighted evidence.</li>
          <li>Request competitive pricing or cancellation terms.</li>
          <li>Compare total cost, risk, and implementation effort.</li>
          <li>Record the final decision and verified savings.</li>
        </ol>
      </div>`;
    output.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  document.querySelector('#askWhy').addEventListener('click', () => {
    renderChat();
    setTimeout(() => answer(`Why is ${opportunity.title} ranked #${opportunity.rank}?`), 50);
  });

  document.querySelector('#markComplete').addEventListener('click', (event) => {
    event.currentTarget.textContent = '✓ Completed';
    event.currentTarget.classList.add('completed-action');
    showToast('Opportunity marked complete');
  });
}

function bindChatEvents() {
  const replies = {
    'Explain the top priority': 'Commercial insurance is ranked first because premiums are 18% above the peer benchmark, no competitive rebid has occurred in 31 months, and two overlapping riders were detected. Estimated annual savings: $18,300.',
    'Where can we find savings?': 'Atlas identified four ranked opportunities totaling $46,100 annually: commercial insurance, merchant processing, overlapping software, and freight contracts.',
    'What should I watch this week?': 'Watch the insurance renewal window, merchant-processing fee growth, and the 12% freight-cost variance at the West location.'
  };

  document.querySelectorAll('[data-prompt]').forEach(btn =>
    btn.addEventListener('click', () => answer(btn.dataset.prompt, replies))
  );

  document.querySelector('#atlasForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const input = document.querySelector('#atlasInput');
    const value = input.value.trim();
    if (!value) return;
    answer(value, replies);
    input.value = '';
  });
}

function addMessage(text, who = 'atlas') {
  const chat = document.querySelector('#chat');
  if (!chat) return;
  const wrapper = document.createElement('div');
  wrapper.className = `message ${who === 'atlas' ? 'atlas-message' : 'user-message'}`;
  wrapper.innerHTML = who === 'atlas'
    ? `<span class="avatar atlas-avatar">A</span><p>${text}</p>`
    : `<p>${text}</p><span class="avatar user-avatar">BH</span>`;
  chat.appendChild(wrapper);
  chat.scrollTop = chat.scrollHeight;
}

function answer(prompt, replies = {}) {
  addMessage(prompt, 'user');
  setTimeout(() => {
    let response = replies[prompt];

    if (!response && selectedOpportunity && prompt.toLowerCase().includes('why')) {
      response = `${selectedOpportunity.title} is ranked #${selectedOpportunity.rank} because ${selectedOpportunity.reasoning.join(' ')}`;
    }

    if (!response) {
      response = 'I reviewed the demo company’s 9,842 transactions. The strongest next action is to investigate commercial insurance first, followed by merchant processing. Open an opportunity to review the supporting evidence.';
    }

    addMessage(response, 'atlas');
  }, 250);
}

function showToast(message) {
  const toast = document.querySelector('#toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 1600);
}

document.querySelectorAll('[data-open-investigation]').forEach(button => {
  button.addEventListener('click', () => {
    const opportunity = opportunities.find(item => item.id === button.dataset.openInvestigation);
    if (opportunity) renderInvestigation(opportunity);
  });
});

const sectionMap={'Dashboard':'dashboard-section','Financial Imports':'financial-imports-section','Transactions':'transactions-section','Import History':'import-history-section','Settings':'settings-section'};
document.querySelectorAll('.nav-item').forEach(btn=>btn.addEventListener('click',()=>{
 document.querySelectorAll('.nav-item').forEach(b=>b.classList.remove('active'));
 btn.classList.add('active');
 const el=document.getElementById(sectionMap[btn.dataset.section]); if(el) el.scrollIntoView({behavior:'smooth'});
}));
const rpt=document.getElementById('reportModal');
document.getElementById('fullReportButton').addEventListener('click',()=>{rpt.style.display='flex';});
document.getElementById('closeReport').addEventListener('click',()=>rpt.style.display='none');
rpt.addEventListener('click',e=>{if(e.target===rpt) rpt.style.display='none';});
document.getElementById('investigateTop').addEventListener('click',()=>{rpt.style.display='none'; const o=opportunities.find(x=>x.id==='insurance'); if(o) renderInvestigation(o);});
document.addEventListener('keydown',e=>{if(e.key==='Escape') rpt.style.display='none';});
renderChat();
