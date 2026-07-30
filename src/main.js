import './style.css';

const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

const priorities = [
  { level: 'critical', title: 'Review commercial insurance', detail: 'Premiums are 18% above the peer benchmark.', savings: 18300 },
  { level: 'high', title: 'Renegotiate merchant processing', detail: 'Effective fees increased 11% this quarter.', savings: 14800 },
  { level: 'medium', title: 'Consolidate overlapping software', detail: '27 paid seats show no activity in 90 days.', savings: 7900 },
  { level: 'positive', title: 'Cash flow improved', detail: '90-day liquidity risk moved from moderate to low.', savings: 0 },
  { level: 'positive', title: 'New freight savings opportunity', detail: 'West-location freight cost is 12% above average.', savings: 5100 }
];

const intelligence = [
  ['Insurance market', 'Commercial premiums are softening for low-claim manufacturers.', '6 min ago'],
  ['Fuel costs', 'Regional diesel prices are trending 2.1% lower this month.', '18 min ago'],
  ['Steel watch', 'Input prices rose 3.0%; review open purchase orders.', '36 min ago'],
  ['Compliance', 'A new OSHA recordkeeping reminder is approaching.', '1 hr ago'],
  ['Rates', 'Borrowing-cost outlook is stable for the next planning cycle.', '2 hr ago']
];

const app = document.querySelector('#app');
app.innerHTML = `
<div class="app-shell">
  <aside class="sidebar">
    <div class="brand"><span class="brand-mark">A</span><div><strong>ATLAS AI</strong><small>SMARTLEDGER</small></div></div>
    <nav class="sidebar-nav">
      ${['Dashboard','Financial Imports','Transactions','Import History','Payments & Billing','Settings'].map((x,i)=>`<button class="nav-item ${i===0?'active':''}" data-nav="${x}"><span>${['⌂','⇧','≡','◷','$','⚙'][i]}</span>${x}</button>`).join('')}
    </nav>
    <div class="sidebar-bottom">
      <div class="privacy-card"><span>◇</span><div><strong>Private processing</strong><small>Files remain in your browser</small></div></div>
      <button class="signout">↪ Sign out</button>
    </div>
  </aside>

  <div class="workspace">
    <header class="topbar">
      <div><span class="micro">CURRENT WORKSPACE</span><button class="workspace-name">Atlas AI Demo Company⌄</button></div>
      <div class="top-actions">
        <button class="outline" id="presentationBtn">Presentation mode</button>
        <span class="release">ATLAS 20.8 · FUNCTIONAL RELEASE</span>
        <div class="profile"><span>BH</span><div><strong>Brian Hess</strong><small>Owner</small></div></div>
      </div>
    </header>

    <section class="demo-strip"><div><span class="live">LIVE DEMO WORKSPACE</span><strong>Atlas Manufacturing Group</strong><span>Fictional but internally consistent data · 9,842 transactions</span></div><button class="outline" id="reloadBtn">Reload demo data</button></section>

    <main class="page" id="mainPage">
      <section class="welcome-card">
        <div>
          <span class="micro">ATLAS EXECUTIVE COMMAND CENTER · RELEASE 20.8</span>
          <h1>Good evening, Brian.</h1>
          <p>Atlas analyzed 9,842 transactions and prepared your priority list for today.</p>
          <div class="welcome-actions"><button class="gold" id="briefBtn">View executive brief</button><button class="ghost" id="askBtn">Ask Atlas</button></div>
        </div>
        <div class="welcome-stats">
          <article><span>OPPORTUNITIES</span><strong class="count" data-value="4">0</strong><small>Ready for review</small></article>
          <article><span>ANNUAL SAVINGS</span><strong class="count money" data-value="46100">$0</strong><small>Identified by Atlas</small></article>
          <article><span>FINANCIAL HEALTH</span><strong class="count" data-value="92">0</strong><small>Healthy</small></article>
          <article><span>ATLAS CONFIDENCE</span><strong class="count percent" data-value="98">0%</strong><small>High confidence</small></article>
        </div>
      </section>

      <section class="dashboard-grid">
        <div class="main-column">
          <section class="kpi-grid">
            <article class="panel kpi"><span>ANNUAL REVENUE</span><strong class="count money" data-value="28400000">$0</strong><small>Healthy operating trend</small></article>
            <article class="panel kpi"><span>CASH ON HAND</span><strong class="count money" data-value="2840000">$0</strong><small>Low 90-day risk</small></article>
            <article class="panel kpi"><span>ACTIVE VENDORS</span><strong class="count" data-value="412">0</strong><small>Across 3 locations</small></article>
            <article class="panel kpi"><span>SAVINGS IDENTIFIED</span><strong class="count money" data-value="46100">$0</strong><small>4 ranked opportunities</small></article>
          </section>

          <section class="panel action-center">
            <div class="section-head"><div><span class="micro">CEO ACTION CENTER</span><h2>Today's executive priorities</h2></div><span class="ready-pill">RANKED BY ATLAS</span></div>
            <div class="priority-list">
              ${priorities.map((p,i)=>`<button class="priority-row" data-priority="${i}"><span class="priority-dot ${p.level}"></span><span class="priority-rank">${String(i+1).padStart(2,'0')}</span><span class="priority-copy"><strong>${p.title}</strong><small>${p.detail}</small></span><span class="impact">${p.savings?money.format(p.savings):'Positive trend'}</span><span class="arrow">›</span></button>`).join('')}
            </div>
          </section>

          <section class="two-col">
            <article class="panel savings-panel">
              <div class="section-head"><div><span class="micro">SAVINGS TIMELINE</span><h2>Value identified this year</h2></div><strong>$46,100</strong></div>
              <div class="timeline-bars">
                ${[['Jan',4200],['Feb',6300],['Mar',8900],['Apr',11700],['May',6800],['Jun',8200]].map(([m,v])=>`<div><span class="bar" style="--h:${Math.round(v/11700*100)}%"></span><small>${m}</small><b>${money.format(v)}</b></div>`).join('')}
              </div>
            </article>
            <article class="panel intelligence-panel">
              <div class="section-head"><div><span class="micro">ATLAS INTELLIGENCE</span><h2>External signals to watch</h2></div><span class="pulse">● LIVE</span></div>
              <div class="feed">${intelligence.map(([t,d,time])=>`<button class="feed-item"><span class="feed-icon">✦</span><span><strong>${t}</strong><small>${d}</small></span><time>${time}</time></button>`).join('')}</div>
            </article>
          </section>
        </div>

        <aside class="atlas-panel" id="atlasPanel">
          <header><div class="atlas-title"><span class="atlas-logo">A</span><div><span>ATLAS · EXECUTIVE COPILOT</span><h2>Ask Atlas</h2><small>Continue naturally with follow-up questions.</small></div></div><span class="ready-pill green">● READY</span></header>
          <div class="topic-row"><div><span>CURRENTLY DISCUSSING</span><strong id="topic">General business overview</strong></div><button id="newChat">New conversation</button></div>
          <div class="chat" id="chat"><div class="message atlas"><span>A</span><p>Good evening, Brian. I have reviewed the latest demo data. Ask about savings, risk, vendors, cash flow, or today's priorities.</p></div></div>
          <div class="typing" id="typing"><span></span><span></span><span></span><em>Atlas is analyzing…</em></div>
          <div class="quick-prompts">
            <button data-prompt="Explain the top priority">Explain the top priority</button>
            <button data-prompt="Show all savings">Show all savings</button>
            <button data-prompt="What should I do first?">What should I do first?</button>
          </div>
          <form id="chatForm"><input id="chatInput" placeholder="Ask Atlas a question…" autocomplete="off"><button class="gold">Send</button></form>
        </aside>
      </section>
    </main>
  </div>
</div>

<div class="modal" id="modal"><div class="modal-card"><button class="modal-close" id="modalClose">×</button><span class="micro" id="modalEyebrow">EXECUTIVE BRIEF</span><h2 id="modalTitle">Atlas Executive Brief</h2><div id="modalBody"></div></div></div>
<div class="toast" id="toast"></div>
`;

const replies = {
  'Explain the top priority': 'Commercial insurance is ranked first because premiums are 18% above comparable manufacturers, no competitive rebid has occurred in 31 months, and two policy riders appear to overlap. Estimated annual savings: $18,300.',
  'Show all savings': 'Atlas identified four savings opportunities totaling $46,100 annually: commercial insurance ($18,300), merchant processing ($14,800), software consolidation ($7,900), and freight ($5,100).',
  'What should I do first?': 'Start with commercial insurance. The renewal window is approaching, the potential savings are highest, and the evidence confidence is 96%.'
};



const dashboardHTML = document.querySelector('#mainPage').innerHTML;

const pageTemplates = {
  'Financial Imports': `
    <section class="functional-page">
      <div class="page-heading"><div><span class="micro">DATA CONNECTIONS</span><h1>Financial Imports</h1><p>Bring company financial data into SmartLedger for secure analysis.</p></div><span class="status-badge">READY TO IMPORT</span></div>
      <section class="import-grid">
        ${[['CSV file','Upload transaction exports from any bank or accounting platform.'],['Excel workbook','Import structured spreadsheets with automatic column matching.'],['QuickBooks','Prepare a secure QuickBooks connection for company records.'],['Bank statement','Add monthly PDF or CSV bank statements.'],['Credit cards','Import business card activity and identify duplicate spending.']].map(([t,d],i)=>`<button class="panel import-option" data-import="${t}"><span class="import-icon">${['CSV','XLS','QB','PDF','CC'][i]}</span><strong>${t}</strong><small>${d}</small><b>Choose source →</b></button>`).join('')}
      </section>
      <section class="panel data-panel"><div class="section-head"><div><span class="micro">RECENT ACTIVITY</span><h2>Latest imports</h2></div></div>${recentImportsTable()}</section>
    </section>`,
  'Transactions': `
    <section class="functional-page">
      <div class="page-heading"><div><span class="micro">COMPANY LEDGER</span><h1>Transactions</h1><p>Search, filter, and review imported company spending.</p></div><button class="gold" id="exportTransactions">Export CSV</button></div>
      <section class="panel data-panel"><div class="table-tools"><input id="transactionSearch" placeholder="Search vendor or category…"><select id="transactionFilter"><option>All categories</option><option>Insurance</option><option>Software</option><option>Freight</option><option>Payroll</option></select></div>${transactionsTable()}</section>
    </section>`,
  'Import History': `
    <section class="functional-page">
      <div class="page-heading"><div><span class="micro">AUDIT TRAIL</span><h1>Import History</h1><p>A complete record of data added to this workspace.</p></div><span class="status-badge">12 IMPORTS</span></div>
      <section class="panel data-panel">${historyTable()}</section>
    </section>`,
  'Payments & Billing': `
    <section class="functional-page">
      <div class="page-heading"><div><span class="micro">ACCOUNT MANAGEMENT</span><h1>Payments & Billing</h1><p>Manage the SmartLedger subscription, invoices, and payment method.</p></div><span class="status-badge active-plan">● ACTIVE</span></div>
      <section class="billing-grid">
        <article class="panel billing-plan"><span class="micro">CURRENT PLAN</span><h2>Professional Plan</h2><strong>$299<small>/month</small></strong><p>Executive intelligence for growing companies.</p><button class="gold billing-action" data-billing="Upgrade plan">Upgrade plan</button></article>
        <article class="panel billing-card"><span class="micro">PAYMENT METHOD</span><div class="card-visual"><b>VISA</b><strong>•••• 4321</strong><small>Expires 04/29</small></div><button class="outline billing-action" data-billing="Update payment method">Update payment method</button></article>
        <article class="panel billing-card"><span class="micro">NEXT BILLING</span><h2>August 29, 2026</h2><strong class="billing-total">$299.00</strong><small>Automatic payment enabled</small><button class="outline billing-action" data-billing="Download next invoice">Download invoice</button></article>
      </section>
      <section class="usage-grid">${[['Companies','1 of 3',33],['Users','5 of 10',50],['Transactions','9,842 this month',68]].map(([t,v,p])=>`<article class="panel usage-card"><span>${t}</span><strong>${v}</strong><div><i style="width:${p}%"></i></div></article>`).join('')}</section>
      <section class="panel data-panel"><div class="section-head"><div><span class="micro">BILLING HISTORY</span><h2>Recent invoices</h2></div></div>${billingTable()}</section>
    </section>`,
  'Settings': `
    <section class="functional-page">
      <div class="page-heading"><div><span class="micro">WORKSPACE ADMINISTRATION</span><h1>Settings</h1><p>Control company details, notifications, security, and Atlas preferences.</p></div><button class="gold" id="saveSettings">Save changes</button></div>
      <section class="settings-grid">
        <article class="panel settings-card"><h2>Company information</h2><label>Company name<input value="Atlas Manufacturing Group"></label><label>Industry<input value="Manufacturing"></label><label>Fiscal year<select><option>January–December</option></select></label></article>
        <article class="panel settings-card"><h2>Notifications</h2>${['Daily CEO briefing','Savings opportunity alerts','Import completion notices'].map((x,i)=>`<label class="toggle-row"><span>${x}</span><input type="checkbox" ${i<2?'checked':''}></label>`).join('')}</article>
        <article class="panel settings-card"><h2>Security</h2><p>Two-factor authentication is enabled for the owner account.</p><button class="outline settings-action">Review security</button><button class="outline settings-action">Manage users</button></article>
        <article class="panel settings-card"><h2>Atlas preferences</h2><label>Response detail<select><option>Executive summary</option><option>Detailed analysis</option></select></label><label class="toggle-row"><span>Remember conversation context</span><input type="checkbox" checked></label></article>
      </section>
    </section>`
};

function recentImportsTable(){return `<div class="table-wrap"><table><thead><tr><th>Source</th><th>Records</th><th>Status</th><th>Imported</th></tr></thead><tbody><tr><td>Operating Account.csv</td><td>4,281</td><td><span class="table-status success">Complete</span></td><td>Today, 6:42 PM</td></tr><tr><td>Corporate Visa.xlsx</td><td>1,943</td><td><span class="table-status success">Complete</span></td><td>Yesterday</td></tr><tr><td>QuickBooks Q2</td><td>3,618</td><td><span class="table-status success">Complete</span></td><td>July 25</td></tr></tbody></table></div>`}
function transactionsTable(){const rows=[['Harbor Mutual Insurance','Jul 28, 2026','Insurance','$28,450','Review'],['Northstar Software','Jul 27, 2026','Software','$4,812','Approved'],['Midwest Freight Lines','Jul 27, 2026','Freight','$12,690','Review'],['Atlas Payroll Services','Jul 26, 2026','Payroll','$184,220','Approved'],['Metro Energy','Jul 25, 2026','Utilities','$19,740','Approved'],['ClearPay Processing','Jul 24, 2026','Merchant fees','$8,906','Opportunity']];return `<div class="table-wrap"><table id="transactionsTable"><thead><tr><th>Vendor</th><th>Date</th><th>Category</th><th>Amount</th><th>Status</th></tr></thead><tbody>${rows.map(r=>`<tr>${r.map((x,i)=>`<td>${i===4?`<span class="table-status ${x==='Approved'?'success':x==='Opportunity'?'warning':'review'}">${x}</span>`:x}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`}
function historyTable(){return `<div class="table-wrap"><table><thead><tr><th>Date</th><th>Source</th><th>Records</th><th>Status</th><th>Imported by</th></tr></thead><tbody>${[['Jul 28, 2026','Operating Account.csv','4,281'],['Jul 27, 2026','Corporate Visa.xlsx','1,943'],['Jul 25, 2026','QuickBooks Q2','3,618'],['Jul 18, 2026','Payroll Export.csv','824'],['Jul 11, 2026','Fleet Card.csv','702']].map(r=>`<tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td><td><span class="table-status success">Complete</span></td><td>Brian Hess</td></tr>`).join('')}</tbody></table></div>`}
function billingTable(){return `<div class="table-wrap"><table><thead><tr><th>Invoice</th><th>Date</th><th>Amount</th><th>Status</th><th></th></tr></thead><tbody>${[['INV-2026-007','Jul 29, 2026'],['INV-2026-006','Jun 29, 2026'],['INV-2026-005','May 29, 2026']].map(r=>`<tr><td>${r[0]}</td><td>${r[1]}</td><td>$299.00</td><td><span class="table-status success">Paid</span></td><td><button class="table-link billing-action" data-billing="Download ${r[0]}">Download</button></td></tr>`).join('')}</tbody></table></div>`}

function animateCounts(){
  document.querySelectorAll('.count').forEach(el=>{
    const target=Number(el.dataset.value); const start=performance.now(); const duration=900;
    function tick(now){ const p=Math.min((now-start)/duration,1); const eased=1-Math.pow(1-p,3); const value=Math.round(target*eased);
      if(el.classList.contains('money')) el.textContent=money.format(value);
      else if(el.classList.contains('percent')) el.textContent=`${value}%`;
      else el.textContent=value.toLocaleString('en-US');
      if(p<1) requestAnimationFrame(tick);
    } requestAnimationFrame(tick);
  });
}

function addMessage(text, who='atlas'){
  const chat=document.querySelector('#chat'); if(!chat) return;
  const div=document.createElement('div'); div.className=`message ${who}`;
  div.innerHTML=who==='atlas'?`<span>A</span><p>${text}</p>`:`<p>${text}</p><span>BH</span>`;
  chat.appendChild(div); chat.scrollTop=chat.scrollHeight;
}
function answer(prompt){
  addMessage(prompt,'user'); const topic=document.querySelector('#topic'); if(topic) topic.textContent=prompt;
  const typing=document.querySelector('#typing'); typing?.classList.add('show');
  setTimeout(()=>{ typing?.classList.remove('show'); let reply=replies[prompt]; const q=prompt.toLowerCase();
    if(!reply){if(q.includes('cash')) reply='Cash on hand is $2.84 million. Atlas currently rates 90-day liquidity risk as low, with improving operating cash flow.'; else if(q.includes('vendor')) reply='Atlas reviewed 412 active vendors. The strongest vendor-related opportunities are merchant processing and freight pricing.'; else reply='Based on the demo company data, the best next step is to review the ranked CEO Action Center. Commercial insurance remains the highest-impact opportunity.';} addMessage(reply,'atlas');
  },850);
}
function openModal(title, body, eyebrow='EXECUTIVE BRIEF'){document.querySelector('#modalEyebrow').textContent=eyebrow;document.querySelector('#modalTitle').textContent=title;document.querySelector('#modalBody').innerHTML=body;document.querySelector('#modal').classList.add('open')}
function toast(msg){const t=document.querySelector('#toast');t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1700)}

function bindDashboard(){
  animateCounts();
  document.querySelectorAll('[data-prompt]').forEach(b=>b.addEventListener('click',()=>answer(b.dataset.prompt)));
  document.querySelector('#chatForm')?.addEventListener('submit',e=>{e.preventDefault();const i=document.querySelector('#chatInput');const v=i.value.trim();if(v){answer(v);i.value=''}});
  document.querySelector('#newChat')?.addEventListener('click',()=>{document.querySelector('#chat').innerHTML='<div class="message atlas"><span>A</span><p>New conversation started. What would you like to review?</p></div>';document.querySelector('#topic').textContent='New conversation'});
  document.querySelector('#askBtn')?.addEventListener('click',()=>{document.querySelector('#atlasPanel').scrollIntoView({behavior:'smooth',block:'start'});document.querySelector('#chatInput').focus()});
  document.querySelector('#briefBtn')?.addEventListener('click',()=>openModal('Tonight’s Executive Brief',`<div class="brief-grid"><article><span>Financial health</span><strong>92</strong><small>Healthy</small></article><article><span>Annual savings</span><strong>$46,100</strong><small>4 opportunities</small></article><article><span>Top priority</span><strong>Insurance review</strong><small>$18,300 potential</small></article></div><p>Atlas recommends beginning the commercial insurance review first, followed by merchant processing. Cash flow remains healthy and no immediate liquidity risk was detected.</p>`));
  document.querySelectorAll('.priority-row').forEach(row=>row.addEventListener('click',()=>{const p=priorities[Number(row.dataset.priority)];openModal(p.title,`<p>${p.detail}</p><div class="detail-box"><span>Estimated annual impact</span><strong>${p.savings?money.format(p.savings):'Positive operating trend'}</strong></div><button class="gold modal-action" id="askThis">Ask Atlas about this</button>`,'ATLAS INVESTIGATION');setTimeout(()=>document.querySelector('#askThis')?.addEventListener('click',()=>{document.querySelector('#modal').classList.remove('open');answer(`Explain ${p.title}`)}),0)}));
}

function showPage(name){
  document.querySelectorAll('.nav-item').forEach(x=>x.classList.toggle('active',x.dataset.nav===name));
  const main=document.querySelector('#mainPage');
  if(name==='Dashboard'){main.innerHTML=dashboardHTML;bindDashboard();return}
  main.innerHTML=pageTemplates[name]||pageTemplates.Settings;
  window.scrollTo({top:0,behavior:'smooth'});
  bindFunctionalPage(name);
}
function bindFunctionalPage(name){
  document.querySelectorAll('[data-import]').forEach(b=>b.addEventListener('click',()=>openModal(`Import ${b.dataset.import}`,`<p>Selecting a real file will be connected in the production data-integration phase. This demo confirms the complete import workflow and interface.</p><button class="gold modal-action" id="simulateImport">Simulate successful import</button>`,'FINANCIAL IMPORT')));
  document.addEventListener('click',e=>{if(e.target?.id==='simulateImport'){document.querySelector('#modal').classList.remove('open');toast('Demo import completed successfully')}} ,{once:true});
  const search=document.querySelector('#transactionSearch'); const filter=document.querySelector('#transactionFilter');
  function filterRows(){const q=(search?.value||'').toLowerCase();const f=filter?.value||'All categories';document.querySelectorAll('#transactionsTable tbody tr').forEach(r=>{const txt=r.textContent.toLowerCase();r.style.display=txt.includes(q)&&(f==='All categories'||txt.includes(f.toLowerCase()))?'':'none'})}
  search?.addEventListener('input',filterRows);filter?.addEventListener('change',filterRows);
  document.querySelector('#exportTransactions')?.addEventListener('click',()=>toast('Transaction export prepared'));
  document.querySelectorAll('.billing-action').forEach(b=>b.addEventListener('click',()=>toast(`${b.dataset.billing} opened`)));
  document.querySelector('#saveSettings')?.addEventListener('click',()=>toast('Settings saved'));
  document.querySelectorAll('.settings-action').forEach(b=>b.addEventListener('click',()=>toast(`${b.textContent} opened`)));
}

function signOut(){
  sessionStorage.removeItem('atlasSession');
  app.innerHTML=`<div class="signed-out"><section class="signin-card"><span class="brand-mark large">A</span><span class="micro">ATLAS AI · SMARTLEDGER</span><h1>You are signed out.</h1><p>Choose how you would like to enter Atlas AI. Demo mode will never open automatically.</p><button class="gold" id="demoEntry">Enter demo workspace</button><button class="outline" id="accountEntry">Sign in to an account</button><small>Release 20.8 · Secure session cleared</small></section></div>`;
  document.querySelector('#demoEntry').addEventListener('click',()=>location.reload());
  document.querySelector('#accountEntry').addEventListener('click',()=>{document.querySelector('.signin-card').innerHTML=`<span class="brand-mark large">A</span><span class="micro">SECURE ACCOUNT ACCESS</span><h1>Sign in</h1><label class="signin-label">Email<input type="email" placeholder="you@company.com"></label><label class="signin-label">Password<input type="password" placeholder="••••••••"></label><button class="gold" id="signinSubmit">Sign in</button><button class="outline" id="backChoice">Back</button>`;document.querySelector('#signinSubmit').addEventListener('click',()=>toast('Account authentication will connect during production setup'));document.querySelector('#backChoice').addEventListener('click',()=>location.reload())});
}

bindDashboard();
document.querySelectorAll('.nav-item').forEach(b=>b.addEventListener('click',()=>showPage(b.dataset.nav)));
document.querySelector('.signout').addEventListener('click',signOut);
document.querySelector('#reloadBtn').addEventListener('click',()=>{if(document.querySelector('.count'))animateCounts();toast('Demo data reloaded')});
document.querySelector('#presentationBtn').addEventListener('click',()=>{document.body.classList.toggle('presentation');toast(document.body.classList.contains('presentation')?'Presentation mode on':'Presentation mode off')});
document.querySelector('#modalClose').addEventListener('click',()=>document.querySelector('#modal').classList.remove('open'));
document.querySelector('#modal').addEventListener('click',e=>{if(e.target.id==='modal')e.currentTarget.classList.remove('open')});
