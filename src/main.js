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
        <span class="release">ATLAS 20.9.1 · INTELLIGENCE ENGINE</span>
        <div class="profile"><span>BH</span><div><strong>Brian Hess</strong><small>Owner</small></div></div>
      </div>
    </header>

    <section class="demo-strip"><div><span class="live">LIVE DEMO WORKSPACE</span><strong>Atlas Manufacturing Group</strong><span>Fictional but internally consistent data · 9,842 transactions</span></div><button class="outline" id="reloadBtn">Reload demo data</button></section>

    <main class="page" id="mainPage">
      <section class="welcome-card">
        <div>
          <span class="micro">ATLAS EXECUTIVE COMMAND CENTER · RELEASE 20.9.1</span>
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
            <button data-prompt="What changed since yesterday?">What changed since yesterday?</button>
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
  'Explain the top priority': 'Commercial insurance is ranked first because premiums are 18% above comparable manufacturers, no competitive rebid has occurred in 31 months, and two policy riders appear to overlap. Estimated annual savings: $18,300. Recommended next step: request a competitive broker review before renewal.',
  'Show all savings': 'Atlas identified four savings opportunities totaling $46,100 annually: commercial insurance ($18,300), merchant processing ($14,800), software consolidation ($7,900), and freight optimization ($5,100).',
  'What should I do first?': 'Start with commercial insurance. It has the highest estimated impact, the renewal window is approaching, and Atlas confidence is 96%. After that, review merchant processing fees.',
  'What changed since yesterday?': 'Since yesterday, merchant processing fees increased 0.4%, cash on hand improved by $38,200, one new freight savings opportunity was identified, and no new liquidity risk was detected.'
};

function detectIntent(prompt){
  const q=String(prompt||'').toLowerCase().trim();
  if(replies[prompt]) return {type:'exact', reply:replies[prompt]};
  if(/top priority|highest priority|main priority|first priority/.test(q)) return {type:'priority'};
  if(/all savings|show.*savings|saving opportunities|opportunit/.test(q)) return {type:'savings'};
  if(/what.*do first|where.*start|next step|what should i do/.test(q)) return {type:'next'};
  if(/yesterday|what changed|since yesterday|daily change/.test(q)) return {type:'changes'};
  if(/insurance|premium|carrier|broker/.test(q)) return {type:'insurance'};
  if(/merchant|processing fee|credit card fee/.test(q)) return {type:'processing'};
  if(/software|subscription|license|seat/.test(q)) return {type:'software'};
  if(/freight|shipping|logistics/.test(q)) return {type:'freight'};
  if(/cash|liquidity|cash flow/.test(q)) return {type:'cash'};
  if(/vendor|supplier/.test(q)) return {type:'vendor'};
  if(/transaction|charge|payment|invoice/.test(q) && /explain|review|why|unusual|flag/.test(q)) return {type:'transaction'};
  if(/import|csv|excel|quickbooks|upload/.test(q)) return {type:'imports'};
  if(/bill|billing|plan|subscription|299|invoice/.test(q)) return {type:'billing'};
  if(/setting|notification|security|two-factor|memory|preference/.test(q)) return {type:'settings'};
  if(/revenue|sales/.test(q)) return {type:'revenue'};
  if(/risk|warning|concern/.test(q)) return {type:'risk'};
  return {type:'unknown'};
}

function buildReply(prompt){
  const intent=detectIntent(prompt);
  if(intent.reply) return intent.reply;
  switch(intent.type){
    case 'priority': return replies['Explain the top priority'];
    case 'savings': return replies['Show all savings'];
    case 'next': return replies['What should I do first?'];
    case 'changes': return replies['What changed since yesterday?'];
    case 'insurance': return 'Commercial insurance is the largest current opportunity. Premiums are 18% above the peer benchmark, the account has not been competitively rebid in 31 months, and Atlas estimates $18,300 in annual savings. Recommended action: gather the current policy and loss runs, then request three carrier quotes.';
    case 'processing': return 'Merchant processing is the second-largest opportunity. Effective fees increased 11% this quarter, creating an estimated $14,800 annual savings opportunity. Recommended action: calculate the blended rate and request competitive pricing from the processor.';
    case 'software': return 'Atlas found 27 paid software seats with no activity in the last 90 days. Consolidating inactive or overlapping licenses could save about $7,900 annually. Confirm ownership before removing licenses.';
    case 'freight': return 'Freight costs at the west location are 12% above the company average. Atlas estimates $5,100 in annual savings through carrier comparison, lane consolidation, and contract review.';
    case 'cash': return 'Cash on hand is $2.84 million. Atlas currently rates 90-day liquidity risk as low, and cash improved by $38,200 since yesterday. No immediate cash-flow intervention is recommended.';
    case 'vendor': return 'Atlas reviewed 412 active vendors across three locations. The strongest vendor-related opportunities are insurance, merchant processing, software licensing, and freight. No concentration risk currently exceeds the demo alert threshold.';
    case 'transaction': return `For the transaction you referenced, Atlas would evaluate the vendor, amount, category, historical pattern, duplicate risk, and benchmark variance. In this demo, click a transaction row to open its specific analysis. Your question was: “${prompt}”`;
    case 'imports': return 'The latest imports completed successfully: 9,842 records are available for analysis, no import errors require attention, and no duplicate import was detected. CSV, Excel, and QuickBooks workflows are represented in the demo.';
    case 'billing': return 'The Professional Plan is active at $299 per month. Current usage is within plan limits, the next scheduled charge is August 29, 2026, and invoices can be downloaded from Payments & Billing.';
    case 'settings': return 'Daily CEO briefings, conversation context memory, and owner two-factor authentication are enabled. You can review or change these controls on the Settings page.';
    case 'revenue': return 'Annual revenue is $28.4 million in the demo workspace. Atlas currently shows a healthy operating trend and no immediate revenue deterioration signal, while SmartLedger remains focused on cost, cash, and financial intelligence.';
    case 'risk': return 'The highest current business risk is the approaching insurance renewal at above-benchmark pricing. Liquidity risk is low, and the remaining flagged items are savings opportunities rather than critical financial threats.';
    default: return `I understand your question: “${prompt}” I do not yet have enough connected company data to answer it precisely. Try asking about savings, insurance, transactions, vendors, cash flow, imports, billing, settings, risks, or today’s priorities.`;
  }
}

function animateCounts(){
  document.querySelectorAll('.count').forEach(el=>{
    const target=Number(el.dataset.value);
    const start=performance.now();
    const duration=900;
    function tick(now){
      const progress=Math.min((now-start)/duration,1);
      const eased=1-Math.pow(1-progress,3);
      const value=Math.round(target*eased);
      if(el.classList.contains('money')) el.textContent=money.format(value);
      else if(el.classList.contains('percent')) el.textContent=`${value}%`;
      else el.textContent=value.toLocaleString('en-US');
      if(progress<1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
}

function followUpsFor(prompt){
  const type=detectIntent(prompt).type;
  const map={
    insurance:['Show the $18,300 estimate','What should I do first?','Compare carriers'],
    savings:['Explain the top priority','Rank by fastest payoff','What changed since yesterday?'],
    processing:['How was $14,800 calculated?','Show all savings','What should I do first?'],
    cash:['What changed since yesterday?','Show financial risks','Explain cash flow'],
    imports:['Did any imports fail?','How many records were added?','Review transactions'],
    billing:['When is the next charge?','What does the plan include?','Show billing history'],
    settings:['Which alerts are enabled?','Is two-factor active?','How does memory work?'],
    transaction:['Why was it flagged?','Is it a duplicate?','Show related savings']
  };
  return map[type]||['Show all savings','Explain the top priority','What changed since yesterday?'];
}

function renderFollowUps(prompt){
  const row=document.querySelector('.quick-prompts');
  if(!row) return;
  row.innerHTML=followUpsFor(prompt).map(x=>`<button data-prompt="${x.replace(/"/g,'&quot;')}">${x}</button>`).join('');
  row.querySelectorAll('[data-prompt]').forEach(b=>b.addEventListener('click',()=>answer(b.dataset.prompt)));
}

function addMessage(text, who='atlas'){
  const chat=document.querySelector('#chat'); if(!chat) return;
  const div=document.createElement('div'); div.className=`message ${who}`;
  div.innerHTML=who==='atlas'?`<span>A</span><p>${text}</p>`:`<p>${text}</p><span>BH</span>`;
  chat.appendChild(div); chat.scrollTop=chat.scrollHeight;
}
function answer(prompt){
  addMessage(prompt,'user');
  const topic=document.querySelector('#topic'); if(topic) topic.textContent=prompt;
  const typing=document.querySelector('#typing'); typing?.classList.add('show');
  setTimeout(()=>{
    typing?.classList.remove('show');
    addMessage(buildReply(prompt),'atlas');
    renderFollowUps(prompt);
  },650);
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

function downloadFile(filename, content, type='text/plain;charset=utf-8'){
  const blob=new Blob([content],{type});
  const url=URL.createObjectURL(blob);
  const link=document.createElement('a');
  link.href=url; link.download=filename; document.body.appendChild(link); link.click(); link.remove();
  setTimeout(()=>URL.revokeObjectURL(url),500);
}

function exportTransactionsCSV(){
  const rows=[...document.querySelectorAll('#transactionsTable tr')]
    .filter(row=>row.closest('thead') || row.style.display!=='none')
    .map(row=>[...row.querySelectorAll('th,td')].map(cell=>`"${cell.textContent.trim().replace(/"/g,'""')}"`).join(','));
  downloadFile('atlas-transactions-2026-07-30.csv',rows.join('\r\n'),'text/csv;charset=utf-8');
  toast('Transactions exported to CSV');
}

function invoiceHTML(invoice='INV-2026-008', date='August 29, 2026'){
  return `<!doctype html><html><head><meta charset="utf-8"><title>${invoice}</title><style>body{font-family:Arial,sans-serif;max-width:760px;margin:48px auto;color:#172235}header{display:flex;justify-content:space-between;border-bottom:2px solid #caa85e;padding-bottom:18px}.brand{font-size:28px;font-weight:800}.muted{color:#687386}.box{margin-top:32px;padding:24px;background:#f5f7fa;border-radius:12px}.line{display:flex;justify-content:space-between;padding:12px 0;border-bottom:1px solid #dce2ea}.total{font-size:24px;font-weight:800}.paid{color:#19764d;font-weight:700}</style></head><body><header><div><div class="brand">ATLAS AI</div><div class="muted">SmartLedger</div></div><div><strong>INVOICE</strong><div>${invoice}</div></div></header><div class="box"><div><strong>Bill to</strong><p>Atlas Manufacturing Group<br>Demo Workspace</p></div><div class="line"><span>Professional Plan — monthly subscription</span><span>$299.00</span></div><div class="line"><span>Invoice date</span><span>${date}</span></div><div class="line total"><span>Total</span><span>$299.00</span></div><p class="paid">Paid / scheduled by Visa ending 4321</p></div><p class="muted">This is a demonstration invoice generated by Atlas AI Build 20.9.1.</p></body></html>`;
}

function handleBillingAction(action){
  if(action==='Upgrade plan'){
    openModal('Choose your SmartLedger plan',`<div class="brief-grid"><article><span>ESSENTIAL</span><strong>$149/mo</strong><small>1 company · 3 users</small></article><article><span>PROFESSIONAL</span><strong>$299/mo</strong><small>3 companies · 10 users</small></article><article><span>ENTERPRISE</span><strong>Custom</strong><small>Unlimited scale</small></article></div><p>Your current Professional Plan is highlighted. Plan changes are demonstrated here and will connect to secure checkout in production.</p><button class="gold modal-action" id="confirmUpgrade">Select Enterprise</button>`,'PLAN MANAGEMENT');
    setTimeout(()=>document.querySelector('#confirmUpgrade')?.addEventListener('click',()=>{document.querySelector('#modal').classList.remove('open');toast('Enterprise plan selected for review')}),0);
    return;
  }
  if(action==='Update payment method'){
    openModal('Update payment method',`<div class="payment-form"><label>Cardholder name<input id="cardName" value="Brian Hess"></label><label>Card number<input id="cardNumber" value="•••• •••• •••• 4321"></label><div class="form-row"><label>Expiration<input value="04/29"></label><label>Security code<input value="•••"></label></div><button class="gold modal-action" id="savePayment">Save payment method</button></div><p class="form-note">Demo only. No payment information is transmitted or stored.</p>`,'SECURE BILLING');
    setTimeout(()=>document.querySelector('#savePayment')?.addEventListener('click',()=>{document.querySelector('#modal').classList.remove('open');toast('Payment method updated')}),0);
    return;
  }
  if(action==='Download next invoice'){
    downloadFile('Atlas-Invoice-INV-2026-008.html',invoiceHTML(),'text/html;charset=utf-8');
    toast('Next invoice downloaded');
    return;
  }
  if(action.startsWith('Download INV-')){
    const invoice=action.replace('Download ','');
    const dates={'INV-2026-007':'July 29, 2026','INV-2026-006':'June 29, 2026','INV-2026-005':'May 29, 2026'};
    downloadFile(`Atlas-Invoice-${invoice}.html`,invoiceHTML(invoice,dates[invoice]||'2026'),'text/html;charset=utf-8');
    toast(`${invoice} downloaded`);
  }
}


const pageIntelligence = {
  'Financial Imports': ['3 recent imports completed successfully.', '9,842 records are available for analysis.', 'No import errors require attention.'],
  'Transactions': ['Two transactions are marked for review.', 'Merchant processing contains a $14,800 annual savings opportunity.', 'Insurance is the highest-impact category today.'],
  'Import History': ['All 12 imports completed successfully.', 'The latest operating-account import added 4,281 records.', 'No duplicate import was detected.'],
  'Payments & Billing': ['Professional Plan is active.', 'Current usage is within plan limits.', 'The next scheduled charge is $299 on August 29, 2026.'],
  'Settings': ['Daily CEO briefings are enabled.', 'Conversation context memory is enabled.', 'Two-factor authentication is active for the owner account.']
};

function askAtlasAboutPage(name){
  const insights=pageIntelligence[name]||['Atlas has reviewed this workspace.'];
  openModal(`Atlas analysis: ${name}`, `<p>Atlas understands the page you are viewing and has prepared these immediate observations:</p><div class="context-insights">${insights.map((x,i)=>`<article><span>0${i+1}</span><strong>${x}</strong></article>`).join('')}</div><button class="gold modal-action" id="continueContextChat">Continue with Atlas</button>`, 'CONTEXTUAL INTELLIGENCE');
  setTimeout(()=>document.querySelector('#continueContextChat')?.addEventListener('click',()=>{
    document.querySelector('#modal').classList.remove('open');
    showPage('Dashboard');
    setTimeout(()=>{document.querySelector('#atlasPanel')?.scrollIntoView({behavior:'smooth',block:'start'});answer(`Review the ${name} page for me`)},50);
  }),0);
}

function inspectTransaction(row){
  const cells=[...row.querySelectorAll('td')].map(x=>x.textContent.trim());
  const [vendor,date,category,amount,status]=cells;
  const notes=status==='Opportunity'?'Atlas detected above-benchmark fees and recommends a pricing review.':status==='Review'?'This item differs from the expected category pattern and should be verified.':'This transaction matches normal historical behavior.';
  openModal(vendor, `<div class="brief-grid"><article><span>AMOUNT</span><strong>${amount}</strong><small>${date}</small></article><article><span>CATEGORY</span><strong>${category}</strong><small>Imported ledger</small></article><article><span>STATUS</span><strong>${status}</strong><small>Atlas classification</small></article></div><p>${notes}</p><button class="gold modal-action" id="askTransaction">Ask Atlas about this transaction</button>`, 'TRANSACTION INTELLIGENCE');
  setTimeout(()=>document.querySelector('#askTransaction')?.addEventListener('click',()=>{document.querySelector('#modal').classList.remove('open');showPage('Dashboard');setTimeout(()=>answer(`Explain the ${vendor} transaction for ${amount}`),50)}),0);
}

function bindFunctionalPage(name){
  document.querySelectorAll('.ask-page').forEach(b=>b.addEventListener('click',()=>askAtlasAboutPage(b.dataset.page)));
  document.querySelectorAll('.transaction-row').forEach(r=>r.addEventListener('click',()=>inspectTransaction(r)));
  document.querySelectorAll('[data-import]').forEach(b=>b.addEventListener('click',()=>openModal(`Import ${b.dataset.import}`,`<p>Selecting a real file will be connected in the production data-integration phase. This demo confirms the complete import workflow and interface.</p><button class="gold modal-action" id="simulateImport">Simulate successful import</button>`,'FINANCIAL IMPORT')));
  document.addEventListener('click',e=>{if(e.target?.id==='simulateImport'){document.querySelector('#modal').classList.remove('open');toast('Demo import completed successfully')}} ,{once:true});
  const search=document.querySelector('#transactionSearch'); const filter=document.querySelector('#transactionFilter');
  function filterRows(){const q=(search?.value||'').toLowerCase();const f=filter?.value||'All categories';document.querySelectorAll('#transactionsTable tbody tr').forEach(r=>{const txt=r.textContent.toLowerCase();r.style.display=txt.includes(q)&&(f==='All categories'||txt.includes(f.toLowerCase()))?'':'none'})}
  search?.addEventListener('input',filterRows);filter?.addEventListener('change',filterRows);
  document.querySelector('#exportTransactions')?.addEventListener('click',exportTransactionsCSV);
  document.querySelectorAll('.billing-action').forEach(b=>b.addEventListener('click',()=>handleBillingAction(b.dataset.billing)));
  document.querySelector('#saveSettings')?.addEventListener('click',()=>toast('Settings saved'));
  document.querySelectorAll('.settings-action').forEach(b=>b.addEventListener('click',()=>toast(`${b.textContent} opened`)));
}

function signOut(){
  sessionStorage.removeItem('atlasSession');
  app.innerHTML=`<div class="signed-out"><section class="signin-card"><span class="brand-mark large">A</span><span class="micro">ATLAS AI · SMARTLEDGER</span><h1>You are signed out.</h1><p>Choose how you would like to enter Atlas AI. Demo mode will never open automatically.</p><button class="gold" id="demoEntry">Enter demo workspace</button><button class="outline" id="accountEntry">Sign in to an account</button><small>Release 20.9.1 · Secure session cleared</small></section></div>`;
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
