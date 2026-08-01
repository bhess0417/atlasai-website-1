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
        <span class="release">ATLAS 21.2.2 RECOVERY · PRODUCT READINESS</span>
        <div class="profile"><span>BH</span><div><strong>Brian Hess</strong><small>Owner</small></div></div>
      </div>
    </header>

    <section class="demo-strip"><div><span class="live">LIVE DEMO WORKSPACE</span><strong>Atlas Manufacturing Group</strong><span>Fictional but internally consistent data · 9,842 transactions</span></div><button class="outline" id="reloadBtn">Reload demo data</button></section>

    <main class="page" id="mainPage">
      <section class="welcome-card">
        <div>
          <span class="micro">ATLAS EXECUTIVE COMMAND CENTER · RELEASE 21.2.2 RECOVERY</span>
          <h1 id="dynamicGreeting">Good afternoon, Brian.</h1>
          <p>Atlas completed your executive review and prepared the changes that need your attention.</p>
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
          <header><div class="atlas-title"><span class="atlas-logo">A</span><div><span>ATLAS · EXECUTIVE COPILOT</span><h2>Ask Atlas</h2><small>Proactive briefings, follow-ups, and remembered context.</small></div></div><div class="copilot-status"><span class="ready-pill green">● READY</span><span class="memory-pill">● MEMORY ON</span></div></header>
          <div class="topic-row"><div><span>CURRENTLY DISCUSSING</span><strong id="topic">General business overview</strong></div><button id="newChat">New conversation</button></div>
          <div class="copilot-brief" id="copilotBrief"><span class="micro">SINCE YOUR LAST LOGIN</span><strong>4 executive changes detected</strong><small>Insurance renewal risk, new freight savings, stronger cash, and one invoice review.</small><button class="ghost" id="reviewChangesBtn">Review changes</button></div>
          <div class="chat" id="chat"></div>
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
function transactionsTable(){const rows=[['Harbor Mutual Insurance','Jul 28, 2026','Insurance','$28,450','Review'],['Northstar Software','Jul 27, 2026','Software','$4,812','Approved'],['Midwest Freight Lines','Jul 27, 2026','Freight','$12,690','Review'],['Atlas Payroll Services','Jul 26, 2026','Payroll','$184,220','Approved'],['Metro Energy','Jul 25, 2026','Utilities','$19,740','Approved'],['ClearPay Processing','Jul 24, 2026','Merchant fees','$8,906','Opportunity']];return `<div class="table-wrap"><table id="transactionsTable"><thead><tr><th>Vendor</th><th>Date</th><th>Category</th><th>Amount</th><th>Status</th></tr></thead><tbody>${rows.map(r=>`<tr class="transaction-row">${r.map((x,i)=>`<td>${i===4?`<span class="table-status ${x==='Approved'?'success':x==='Opportunity'?'warning':'review'}">${x}</span>`:x}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`}
function historyTable(){return `<div class="table-wrap"><table><thead><tr><th>Date</th><th>Source</th><th>Records</th><th>Status</th><th>Imported by</th></tr></thead><tbody>${[['Jul 28, 2026','Operating Account.csv','4,281'],['Jul 27, 2026','Corporate Visa.xlsx','1,943'],['Jul 25, 2026','QuickBooks Q2','3,618'],['Jul 18, 2026','Payroll Export.csv','824'],['Jul 11, 2026','Fleet Card.csv','702']].map(r=>`<tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td><td><span class="table-status success">Complete</span></td><td>Brian Hess</td></tr>`).join('')}</tbody></table></div>`}
function billingTable(){return `<div class="table-wrap"><table><thead><tr><th>Invoice</th><th>Date</th><th>Amount</th><th>Status</th><th></th></tr></thead><tbody>${[['INV-2026-007','Jul 29, 2026'],['INV-2026-006','Jun 29, 2026'],['INV-2026-005','May 29, 2026']].map(r=>`<tr><td>${r[0]}</td><td>${r[1]}</td><td>$299.00</td><td><span class="table-status success">Paid</span></td><td><button class="table-link billing-action" data-billing="Download ${r[0]}">Download</button></td></tr>`).join('')}</tbody></table></div>`}


const replies = {
  'Explain the top priority': 'Commercial insurance is ranked first because premiums are 18% above comparable manufacturers, no competitive rebid has occurred in 31 months, and two policy riders appear to overlap. Estimated annual savings: $18,300.',
  'Show all savings': 'Atlas identified four savings opportunities totaling $46,100 annually: commercial insurance ($18,300), merchant processing ($14,800), software consolidation ($7,900), and freight optimization ($5,100).',
  'What should I do first?': 'Start with commercial insurance. It has the highest estimated impact, the renewal window is approaching, and Atlas confidence is 96%.',
  'What changed since yesterday?': 'Since yesterday, merchant processing fees increased 0.4%, cash on hand improved by $38,200, one new freight savings opportunity was identified, and no new liquidity risk was detected.'
};

const MEMORY_KEY='atlasNaturalConversation21_2_2_recovery';
const conversationState={topic:'general',entity:'business overview',lastIntent:'overview',lastAnswer:'',recommendation:'Review the highest-impact savings opportunity first.'};

function loadMemory(){
  try{Object.assign(conversationState,JSON.parse(localStorage.getItem(MEMORY_KEY)||'{}'));}catch{}
}
function saveMemory(){localStorage.setItem(MEMORY_KEY,JSON.stringify(conversationState));}
function resetMemory(){
  Object.assign(conversationState,{topic:'general',entity:'business overview',lastIntent:'overview',lastAnswer:'',recommendation:'Review the highest-impact savings opportunity first.'});
  localStorage.removeItem(MEMORY_KEY);
}
function setContext(topic,entity,intent,recommendation=''){
  conversationState.topic=topic;
  conversationState.entity=entity||topic;
  conversationState.lastIntent=intent;
  if(recommendation) conversationState.recommendation=recommendation;
  saveMemory();
}
function isFollowUp(q){return /^(why|how|tell me more|explain (it|that|this)|what next|what should i do next|what do you recommend|compare (it|them|those)|draft (an )?email|do that|which one|is that important|how much|what caused it)[?.!]*$/i.test(q.trim());}

function detectIntent(prompt){
  const q=String(prompt||'').toLowerCase().trim();
  if(replies[prompt]) return {type:'exact',reply:replies[prompt]};
  if(/draft.*email|write.*email/.test(q)) return {type:'draft'};
  if(/compare carriers|compare them|carrier quotes/.test(q)) return {type:'carriers'};
  if(/why|what caused|reason/.test(q) && isFollowUp(q)) return {type:'why'};
  if(/what next|what should i do next|what do you recommend|do first|where.*start/.test(q)) return {type:'next'};
  if(/tell me more|explain (it|that|this)|more detail/.test(q)) return {type:'more'};
  if(/which one|biggest|largest/.test(q) && isFollowUp(q)) return {type:'which'};
  if(/top priority|highest priority|main priority|first priority/.test(q)) return {type:'priority'};
  if(/all savings|show.*savings|saving opportunities|opportunit/.test(q)) return {type:'savings'};
  if(/yesterday|what changed|since yesterday|daily change/.test(q)) return {type:'changes'};
  if(/18,300|estimate.*insurance|insurance.*estimate/.test(q)) return {type:'insuranceEstimate'};
  if(/invoice.*review|review.*invoice|vendor invoice/.test(q)) return {type:'invoiceReview'};
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
  if(/revenue|sales|top line|bookings/.test(q)) return {type:'revenue'};
  if(/profit|margin|ebitda|gross margin|net income|earnings/.test(q)) return {type:'profitability'};
  if(/payroll|labor|wages|overtime|headcount|employee cost/.test(q)) return {type:'payroll'};
  if(/tax|irs|sales tax|estimated tax/.test(q)) return {type:'taxes'};
  if(/compliance|osha|regulation|regulatory|audit/.test(q)) return {type:'compliance'};
  if(/receivable|accounts receivable|ar aging|collections|customer payment|days sales outstanding|dso/.test(q)) return {type:'receivables'};
  if(/payable|accounts payable|ap aging|supplier payment/.test(q)) return {type:'payables'};
  if(/inventory|stock level|slow moving|obsolete/.test(q)) return {type:'inventory'};
  if(/debt|loan|interest|credit line|borrowing/.test(q)) return {type:'debt'};
  if(/runway|how long.*cash|months of cash/.test(q)) return {type:'runway'};
  if(/forecast|projection|outlook|next quarter|year end/.test(q)) return {type:'forecast'};
  if(/budget|variance|over budget|under budget/.test(q)) return {type:'budget'};
  if(/location|branch|site|division/.test(q)) return {type:'locations'};
  if(/customer|client|concentration|churn/.test(q)) return {type:'customers'};
  if(/duplicate|double charge/.test(q)) return {type:'duplicate'};
  if(/anomal|unusual|outlier|suspicious/.test(q)) return {type:'anomalies'};
  if(/largest expense|biggest expense|top cost|where.*spend/.test(q)) return {type:'expenses'};
  if(/risk|warning|concern/.test(q)) return {type:'risk'};
  if(isFollowUp(q)) return {type:'followup'};
  return {type:'unknown'};
}

function contextualFollowUp(type){
  const topic=conversationState.topic;
  if(type==='why'){
    const reasons={
      insurance:'The increase appears tied to renewal pricing, a long gap since the last competitive bid, and two overlapping riders. Claims history does not appear to be the primary driver.',
      processing:'The effective rate rose because transaction mix shifted toward higher-cost card types and the current agreement has not been repriced recently.',
      software:'The opportunity exists because 27 paid seats show no activity in 90 days and several tools have overlapping functions.',
      freight:'The west location is using higher-cost lanes and more fragmented shipments than the other locations.',
      cash:'Cash improved because collections exceeded outgoing payments since yesterday, while no unusually large disbursement posted.',
      invoice:'The invoice was flagged because it is 22% above the vendor’s six-month average and includes an unusual freight surcharge.',
      payroll:'Payroll rose because overtime increased at the west location and two temporary roles converted to full-time positions.',
      profitability:'Margin pressure is coming mainly from insurance, processing fees, and west-location freight rather than a decline in revenue.',
      receivables:'Receivables aged because three larger customers paid later than their normal pattern, increasing DSO.',
      inventory:'Inventory is elevated because several slow-moving SKUs have not matched recent sales velocity.'
    };
    return reasons[topic]||'I can explain the reason, but I need to know which item you mean. Are you referring to insurance, merchant processing, software, freight, cash flow, or the vendor invoice?';
  }
  if(type==='next'){
    const actions={
      insurance:'First, gather the current policy, loss runs, and coverage schedule. Then request three like-for-like quotes before renewal. Compare exclusions and deductibles—not only price.',
      processing:'Calculate the blended processing rate from the latest statement, identify surcharges, and request repricing from the current provider plus one competitor.',
      software:'Send the inactive-seat list to department owners, confirm which licenses are still required, and cancel unused seats before the next renewal.',
      freight:'Compare the west location’s top five lanes, consolidate shipments where possible, and request updated carrier quotes.',
      invoice:'Hold approval temporarily, match the invoice to the purchase order, and ask the vendor to explain the freight surcharge.',
      savings:'Begin with insurance, then merchant processing. Together they represent $33,100 of the $46,100 annual opportunity.',
      payroll:'Review overtime by department and compare staffing schedules before changing headcount.',
      profitability:'Protect margin by acting on the top two savings opportunities before considering broad cost cuts.',
      receivables:'Contact the three largest overdue accounts and tighten follow-up at 15, 30, and 45 days.',
      inventory:'Pause reorders for slow-moving SKUs and validate demand before discounting inventory.'
    };
    return actions[topic]||conversationState.recommendation;
  }
  if(type==='more'){
    const details={
      insurance:'Here’s what stands out: premiums are 18% above the peer benchmark, the account has not been rebid in 31 months, and two riders may overlap. Atlas estimates an achievable 8–12% reduction, equal to about $18,300 annually.',
      processing:'The $14,800 estimate comes from the recent increase in the effective fee rate and the volume processed. A merchant statement would let Atlas separate interchange, assessments, and processor markup.',
      software:'The estimate assumes removal or renegotiation of inactive seats only. Atlas is not recommending removal of software that has active users or a clear operational purpose.',
      freight:'The opportunity is concentrated at the west location, where cost per shipment is 12% above the company average. Lane consolidation is likely the fastest first test.',
      invoice:'The charge has not been labeled fraudulent or duplicate. It is a review item because its amount and surcharge differ from the vendor’s normal pattern.',
      payroll:'Payroll is 4.2% above the prior month, led by overtime at the west location. Base wages remain close to plan.',
      profitability:'Gross margin is 31.6%, down 0.8 percentage points from the prior period. The largest recoverable drivers are insurance and processing fees.',
      receivables:'Accounts receivable totals $1.74 million; $286,000 is over 45 days. Three customers account for most of the aging.',
      inventory:'Inventory totals $3.1 million, with about $214,000 classified as slow-moving in the demo data.'
    };
    return details[topic]||`We are currently discussing ${conversationState.entity}. Ask “why,” “what should I do next,” or name the detail you want me to examine.`;
  }
  if(type==='draft'){
    if(topic==='insurance') return 'Subject: Request for commercial insurance review\n\nHello,\n\nWe are reviewing our upcoming commercial insurance renewal and would like a complete comparison of our current coverage, premiums, deductibles, exclusions, and policy riders. Please provide our current policy schedule and loss runs, then prepare competitive options using equivalent coverage assumptions.\n\nPlease also identify any overlapping riders or coverage that may be consolidated.\n\nThank you,\nBrian K. Hess';
    if(topic==='invoice') return 'Subject: Question regarding recent invoice\n\nHello,\n\nWe are reviewing your recent invoice, which is above our typical six-month average and includes a freight surcharge we would like to verify. Please provide the related purchase order, shipment detail, and an explanation of the surcharge before we approve payment.\n\nThank you,\nBrian K. Hess';
    return 'I can draft that. Should the email address the insurance broker, payment processor, software owner, freight carrier, or invoice vendor?';
  }
  if(type==='carriers') return 'Use the same coverage schedule and loss-run package for all three quotes. Compare total premium, deductibles, exclusions, carrier rating, claims service, and overlapping riders. Atlas would not choose the lowest price if the coverage is materially weaker.';
  return `I’m still following the ${conversationState.entity} discussion. Would you like the reason, the financial impact, the recommended next step, or a draft communication?`;
}

function buildReply(prompt){
  const intent=detectIntent(prompt);
  if(intent.reply){
    if(prompt==='Show all savings') setContext('savings','four savings opportunities','savings','Begin with insurance, then merchant processing.');
    if(prompt==='Explain the top priority') setContext('insurance','commercial insurance opportunity','priority','Request three competitive quotes before renewal.');
    if(prompt==='What should I do first?') setContext('insurance','commercial insurance opportunity','next','Request three competitive quotes before renewal.');
    return intent.reply+'\n\nExecutive recommendation: '+conversationState.recommendation;
  }
  if(['why','next','more','draft','carriers','followup','which'].includes(intent.type)){
    if(intent.type==='which') return 'Commercial insurance is the largest opportunity at $18,300 annually, followed by merchant processing at $14,800.';
    return contextualFollowUp(intent.type);
  }
  switch(intent.type){
    case 'priority': setContext('insurance','commercial insurance opportunity','priority','Request three competitive quotes before renewal.'); return replies['Explain the top priority']+'\n\nExecutive recommendation: Request three like-for-like quotes before renewal. Confidence: 96%.';
    case 'savings': setContext('savings','four savings opportunities','savings','Begin with insurance, then merchant processing.'); return replies['Show all savings']+'\n\nThe first two opportunities represent $33,100, or roughly 72% of the total.';
    case 'changes': setContext('changes','changes since yesterday','changes','Review the new freight opportunity and flagged invoice.'); return replies['What changed since yesterday?']+'\n\nNothing requires an emergency response, but the vendor invoice should be reviewed before approval.';
    case 'insuranceEstimate': setContext('insurance','commercial insurance opportunity','insuranceEstimate','Request three competitive quotes before renewal.'); return 'The $18,300 estimate is based on current pricing being 18% above the peer benchmark, a 31-month gap since the last bid, and two potentially overlapping riders. Atlas uses a conservative achievable reduction rather than the full benchmark gap.';
    case 'invoiceReview': setContext('invoice','flagged vendor invoice','invoiceReview','Match it to the purchase order before approving payment.'); return 'One vendor invoice is 22% above that vendor’s six-month average. It also includes an unusual freight surcharge. Atlas recommends verifying the purchase order and requesting supporting detail before payment.';
    case 'insurance': setContext('insurance','commercial insurance opportunity','insurance','Request three competitive quotes before renewal.'); return 'Commercial insurance is the largest current opportunity. Premiums are 18% above the peer benchmark, no competitive rebid has occurred in 31 months, and Atlas estimates $18,300 in annual savings.\n\nThe first thing I would do is gather the current policy and loss runs.';
    case 'processing': setContext('processing','merchant processing opportunity','processing','Calculate the blended rate and request repricing.'); return 'Merchant processing is the second-largest opportunity. Effective fees increased 11% this quarter, creating an estimated $14,800 annual savings opportunity.\n\nI would calculate the blended rate before negotiating so you know exactly where the markup sits.';
    case 'software': setContext('software','software subscription opportunity','software','Confirm ownership and cancel inactive seats before renewal.'); return 'Atlas found 27 paid software seats with no activity in the last 90 days. Consolidating inactive or overlapping licenses could save about $7,900 annually.\n\nI would confirm ownership before removing any license.';
    case 'freight': setContext('freight','freight savings opportunity','freight','Compare the west location’s top five lanes.'); return 'Freight costs at the west location are 12% above the company average. Atlas estimates $5,100 in annual savings through carrier comparison, lane consolidation, and contract review.';
    case 'cash': setContext('cash','cash-flow position','cash','Continue monitoring; no intervention is needed today.'); return 'Cash on hand is $2.84 million. Atlas rates 90-day liquidity risk as low, and cash improved by $38,200 since yesterday.\n\nNo immediate cash-flow intervention is recommended.';
    case 'vendor': setContext('vendor','vendor portfolio','vendor','Review the flagged invoice and highest-cost contracts.'); return 'Atlas reviewed 412 active vendors across three locations. The strongest vendor-related opportunities are insurance, merchant processing, software licensing, and freight. No concentration risk currently exceeds the demo alert threshold.';
    case 'transaction': setContext('transaction','selected transaction','transaction','Open the transaction details and verify supporting documentation.'); return `I would evaluate that transaction against the vendor’s history, category pattern, duplicate risk, and benchmark variance. Open the transaction row for the specific evidence behind the flag.`;
    case 'imports': setContext('imports','latest financial import','imports','Review warnings before the next upload.'); return 'The latest imports completed successfully: 9,842 records are available, no import errors require attention, and no duplicate import was detected.';
    case 'billing': setContext('billing','Professional Plan billing','billing','No billing action is required today.'); return 'The Professional Plan is active at $299 per month. Usage is within plan limits, the next scheduled charge is August 29, 2026, and invoices are available on Payments & Billing.';
    case 'settings': setContext('settings','Atlas settings','settings','Keep daily briefings and two-factor authentication enabled.'); return 'Daily CEO briefings, conversation memory, and owner two-factor authentication are enabled. You can change these controls on the Settings page.';
    case 'revenue': setContext('revenue','annual revenue trend','revenue','Continue monitoring; no deterioration signal is present.'); return 'Annual revenue is $28.4 million in the demo workspace, up 6.4% year over year. The strongest contribution comes from the central location, while the west location is growing more slowly. No immediate top-line deterioration signal is present.';
    case 'profitability': setContext('profitability','profitability and margins','profitability','Act on insurance and processing costs before broad cuts.'); return 'Gross margin is 31.6%, down 0.8 percentage points from the prior period. Revenue remains healthy; the pressure is concentrated in insurance, merchant processing, and west-location freight. Addressing the top two savings opportunities could recover a meaningful portion of the decline.';
    case 'payroll': setContext('payroll','payroll and labor costs','payroll','Review overtime by department before changing headcount.'); return 'Payroll is 4.2% above the prior month. Most of the increase comes from overtime at the west location and two temporary roles moving to full-time status. Base wage expense remains close to plan.';
    case 'taxes': setContext('taxes','tax obligations','taxes','Confirm filing dates with your tax professional.'); return 'The demo workspace shows no overdue tax item. Estimated payments and sales-tax obligations appear current, but Atlas should not replace your tax professional. The next step is to confirm filing dates and reconcile taxable sales before submission.';
    case 'compliance': setContext('compliance','compliance status','compliance','Review the OSHA update and document ownership.'); return 'No critical compliance breach is shown in the demo data. One OSHA-related policy update should be reviewed, assigned to an owner, and documented before the next internal audit.';
    case 'receivables': setContext('receivables','accounts receivable','receivables','Contact the three largest overdue accounts.'); return 'Accounts receivable totals $1.74 million, with $286,000 over 45 days. Three customers account for most of the aging. Collections are not yet a liquidity threat, but focused follow-up could improve cash conversion.';
    case 'payables': setContext('payables','accounts payable','payables','Preserve discounts while avoiding early payments without benefit.'); return 'Accounts payable is within the normal range. Atlas found no immediate payment bottleneck. The best opportunity is to capture available early-payment discounts without paying suppliers early when no discount exists.';
    case 'inventory': setContext('inventory','inventory position','inventory','Pause reorders on slow-moving SKUs.'); return 'Inventory totals $3.1 million. About $214,000 is slow-moving based on recent sales velocity. Atlas recommends pausing reorders for those SKUs and validating demand before using discounts.';
    case 'debt': setContext('debt','debt and borrowing costs','debt','Review variable-rate exposure before refinancing.'); return 'Debt service is manageable in the demo workspace. The main watch item is variable-rate exposure on the operating line. A rate comparison may be worthwhile, but there is no current covenant or liquidity warning.';
    case 'runway': setContext('runway','cash runway','runway','Continue monitoring; no immediate capital action is needed.'); return 'Based on current cash and the recent operating pattern, the demo company has more than 12 months of operating coverage. Because the company is cash-flow positive in this scenario, a traditional startup runway calculation is less useful than monitoring liquidity and collections.';
    case 'forecast': setContext('forecast','financial forecast','forecast','Refresh the forecast after insurance quotes and collections updates.'); return 'The current outlook supports continued revenue growth with modest margin pressure. The biggest forecast variables are the insurance renewal, merchant processing costs, and collection timing on three large accounts.';
    case 'budget': setContext('budget','budget performance','budget','Correct concentrated variances instead of broad cuts.'); return 'Overall spending is close to plan, but insurance, processing fees, and west-location freight are above budget. Payroll is modestly elevated due to overtime. Atlas recommends targeted corrections rather than across-the-board reductions.';
    case 'locations': setContext('locations','location performance','locations','Review west-location freight and overtime.'); return 'The central location is the strongest contributor. The west location has two pressure points: freight cost per shipment is 12% above average and overtime is elevated. The east location is performing close to plan.';
    case 'customers': setContext('customers','customer portfolio','customers','Monitor the three largest overdue accounts.'); return 'Customer concentration is within the demo alert threshold, but three larger accounts drive most receivable aging. Atlas sees a collections issue to manage, not a broad churn signal.';
    case 'duplicate': setContext('duplicate','duplicate-payment review','duplicate','Verify invoice number, amount, and date before paying.'); return 'Atlas has not confirmed a duplicate payment in the demo data. One invoice deserves review because the amount and surcharge differ from the vendor’s normal pattern. Match invoice number, amount, purchase order, and payment status before approval.';
    case 'anomalies': setContext('anomalies','financial anomalies','anomalies','Review the flagged invoice and west-location cost variances.'); return 'The most important anomalies are one vendor invoice 22% above its six-month average, west-location freight 12% above the company average, and elevated overtime. None is labeled fraud; each requires supporting-document review.';
    case 'expenses': setContext('expenses','largest business expenses','expenses','Start with costs that are both large and negotiable.'); return 'The largest controllable cost areas in the demo are payroll, insurance, freight, merchant processing, and software. Payroll is largest overall, but insurance and processing offer the fastest near-term savings without reducing staff.';
    case 'risk': setContext('risk','current business risks','risk','Address the insurance renewal before the deadline.'); return 'The highest current risk is the approaching insurance renewal at above-benchmark pricing. Secondary risks are receivable aging, west-location freight and overtime, and the flagged vendor invoice. Liquidity risk remains low.';
    default: return `I understand the question, but I need a little more context to answer it responsibly. Are you asking about savings, revenue, profitability, payroll, cash flow, receivables, inventory, vendors, transactions, taxes, compliance, imports, billing, or risk?`;
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
    carriers:['Show the $18,300 estimate','Draft broker questions','What should I do first?'],
    insuranceEstimate:['Compare carriers','Explain the top priority','Show all savings'],
    invoiceReview:['Why was it flagged?','Is it a duplicate?','What should I do first?'],
    savings:['Explain the top priority','Rank by fastest payoff','What changed since yesterday?'],
    processing:['How was $14,800 calculated?','Show all savings','What should I do first?'],
    cash:['What changed since yesterday?','Show financial risks','Explain cash flow'],
    imports:['Did any imports fail?','How many records were added?','Review transactions'],
    billing:['When is the next charge?','What does the plan include?','Show billing history'],
    settings:['Which alerts are enabled?','Is two-factor active?','How does memory work?'],
    transaction:['Why was it flagged?','Is it a duplicate?','Show related savings'],
    profitability:['Why did margin decline?','What should I do next?','Show all savings'],
    payroll:['Why did payroll rise?','What should I do next?','Compare locations'],
    receivables:['Which customers are overdue?','What should I do next?','Explain cash flow'],
    inventory:['What is slow-moving?','What should I do next?','Show business risks'],
    forecast:['What could change the forecast?','What should I do next?','Show business risks'],
    anomalies:['Why was it flagged?','What should I do next?','Is it a duplicate?'],
    expenses:['Which cost can I reduce first?','Show all savings','Explain profitability']
  };
  return map[type]||['Show all savings','Explain the top priority','What changed since yesterday?'];
}

function renderFollowUps(prompt){
  const row=document.querySelector('.quick-prompts');
  if(!row) return;
  row.innerHTML=followUpsFor(prompt).map(x=>`<button data-prompt="${x.replace(/"/g,'&quot;')}">${x}</button>`).join('');
  row.querySelectorAll('[data-prompt]').forEach(b=>b.addEventListener('click',()=>answer(b.dataset.prompt)));
}

const COPILOT_STORAGE_KEY='atlasCopilotConversation21_2_2_recovery';
const defaultCopilotMessage='I completed your executive review. Since your last login, I found four changes: insurance remains the largest savings opportunity, a new $5,100 freight opportunity appeared, cash improved by $38,200, and one vendor invoice needs review. Which should we examine first?';

function escapeMessage(text){return String(text).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));}
function loadConversation(){
  try{const saved=JSON.parse(localStorage.getItem(COPILOT_STORAGE_KEY)||'[]');return Array.isArray(saved)&&saved.length?saved:[{who:'atlas',text:defaultCopilotMessage}]}catch{return [{who:'atlas',text:defaultCopilotMessage}]}
}
function saveConversation(){
  const items=[...document.querySelectorAll('#chat .message')].map(el=>({who:el.classList.contains('user')?'user':'atlas',text:el.querySelector('p')?.textContent||''}));
  localStorage.setItem(COPILOT_STORAGE_KEY,JSON.stringify(items.slice(-20)));
}
function restoreConversation(){
  const chat=document.querySelector('#chat'); if(!chat) return; chat.innerHTML='';
  loadConversation().forEach(m=>addMessage(m.text,m.who,false));
}
function setGreeting(){
  const h=new Date().getHours(); const part=h<12?'morning':h<17?'afternoon':'evening';
  const el=document.querySelector('#dynamicGreeting'); if(el) el.textContent=`Good ${part}, Brian.`;
}
function addMessage(text, who='atlas', persist=true){
  const chat=document.querySelector('#chat'); if(!chat) return;
  const div=document.createElement('div'); div.className=`message ${who}`;
  const safe=escapeMessage(text).replace(/\n/g,'<br>');
  div.innerHTML=who==='atlas'?`<span>A</span><p>${safe}</p>`:`<p>${safe}</p><span>BH</span>`;
  chat.appendChild(div); chat.scrollTop=chat.scrollHeight;
  if(persist) saveConversation();
}
function answer(prompt){
  loadMemory();
  addMessage(prompt,'user');
  const topic=document.querySelector('#topic'); if(topic) topic.textContent=prompt;
  const typing=document.querySelector('#typing'); typing?.classList.add('show');
  setTimeout(()=>{
    typing?.classList.remove('show');
    const response=buildReply(prompt);
    conversationState.lastAnswer=response; saveMemory();
    addMessage(response,'atlas');
    renderFollowUps(prompt);
  },650);
}
function openModal(title, body, eyebrow='EXECUTIVE BRIEF'){document.querySelector('#modalEyebrow').textContent=eyebrow;document.querySelector('#modalTitle').textContent=title;document.querySelector('#modalBody').innerHTML=body;document.querySelector('#modal').classList.add('open')}
function toast(msg){const t=document.querySelector('#toast');t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1700)}

function bindDashboard(){
  animateCounts();
  setGreeting();
  restoreConversation();
  document.querySelectorAll('[data-prompt]').forEach(b=>b.addEventListener('click',()=>answer(b.dataset.prompt)));
  document.querySelector('#chatForm')?.addEventListener('submit',e=>{e.preventDefault();const i=document.querySelector('#chatInput');const v=i.value.trim();if(v){answer(v);i.value=''}});
  document.querySelector('#newChat')?.addEventListener('click',()=>{localStorage.removeItem(COPILOT_STORAGE_KEY);resetMemory();document.querySelector('#chat').innerHTML='';addMessage('New conversation started. I still have the current executive data available. What would you like to review?','atlas');document.querySelector('#topic').textContent='New conversation'});
  document.querySelector('#reviewChangesBtn')?.addEventListener('click',()=>answer('What changed since yesterday?'));
  document.querySelector('#askBtn')?.addEventListener('click',()=>{document.querySelector('#atlasPanel').scrollIntoView({behavior:'smooth',block:'start'});document.querySelector('#chatInput').focus()});
  document.querySelector('#briefBtn')?.addEventListener('click',()=>openModal('Tonight’s Executive Brief',`<div class="brief-grid"><article><span>Financial health</span><strong>92</strong><small>Healthy</small></article><article><span>Annual savings</span><strong>$46,100</strong><small>4 opportunities</small></article><article><span>Top priority</span><strong>Insurance review</strong><small>$18,300 potential</small></article></div><p>Atlas recommends beginning the commercial insurance review first, followed by merchant processing. Cash flow remains healthy and no immediate liquidity risk was detected.</p>`));
  document.querySelectorAll('.priority-row').forEach(row=>row.addEventListener('click',()=>navigatePriority(Number(row.dataset.priority))));
}


function focusTransaction(searchTerm, category='All categories'){
  showPage('Transactions');
  requestAnimationFrame(()=>{
    const search=document.querySelector('#transactionSearch');
    const filter=document.querySelector('#transactionFilter');
    if(search){search.value=searchTerm||'';search.dispatchEvent(new Event('input',{bubbles:true}));}
    if(filter && category){filter.value=category;filter.dispatchEvent(new Event('change',{bubbles:true}));}
    document.querySelector('#transactionsTable')?.scrollIntoView({behavior:'smooth',block:'start'});
  });
}

function navigatePriority(index){
  const routes={
    0:()=>focusTransaction('Harbor Mutual','Insurance'),
    1:()=>focusTransaction('ClearPay','All categories'),
    2:()=>focusTransaction('Northstar','Software'),
    3:()=>{showPage('Dashboard');setTimeout(()=>{document.querySelector('#atlasPanel')?.scrollIntoView({behavior:'smooth',block:'start'});answer('Explain the cash flow improvement')},80)},
    4:()=>focusTransaction('Midwest Freight','Freight')
  };
  (routes[index]||routes[0])();
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
  return `<!doctype html><html><head><meta charset="utf-8"><title>${invoice}</title><style>body{font-family:Arial,sans-serif;max-width:760px;margin:48px auto;color:#172235}header{display:flex;justify-content:space-between;border-bottom:2px solid #caa85e;padding-bottom:18px}.brand{font-size:28px;font-weight:800}.muted{color:#687386}.box{margin-top:32px;padding:24px;background:#f5f7fa;border-radius:12px}.line{display:flex;justify-content:space-between;padding:12px 0;border-bottom:1px solid #dce2ea}.total{font-size:24px;font-weight:800}.paid{color:#19764d;font-weight:700}</style></head><body><header><div><div class="brand">ATLAS AI</div><div class="muted">SmartLedger</div></div><div><strong>INVOICE</strong><div>${invoice}</div></div></header><div class="box"><div><strong>Bill to</strong><p>Atlas Manufacturing Group<br>Demo Workspace</p></div><div class="line"><span>Professional Plan — monthly subscription</span><span>$299.00</span></div><div class="line"><span>Invoice date</span><span>${date}</span></div><div class="line total"><span>Total</span><span>$299.00</span></div><p class="paid">Paid / scheduled by Visa ending 4321</p></div><p class="muted">This is a demonstration invoice generated by Atlas AI Build 21.2.2 Recovery.</p></body></html>`;
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

const USER_STORE_KEY='atlasLocalDemoUsers';
const SESSION_KEY='atlasSession';
let inactivityTimer=null;
let warningTimer=null;
const INACTIVITY_LIMIT=5*60*1000;
const WARNING_AT=4*60*1000;

function getLocalUsers(){
  try{return JSON.parse(localStorage.getItem(USER_STORE_KEY)||'{}')}catch{return {}}
}
function saveLocalUsers(users){localStorage.setItem(USER_STORE_KEY,JSON.stringify(users));}
function setSession(email,mode='customer'){
  sessionStorage.setItem(SESSION_KEY,JSON.stringify({email,mode,signedInAt:Date.now()}));
  localStorage.removeItem('atlasRequireAuth');
}
function showAuthMessage(message,type='error'){
  const el=document.querySelector('#signinMessage');
  if(el){el.textContent=message;el.className=`signin-message ${type}`;}
}
function authShell(content){
  app.innerHTML=`<div class="signed-out"><section class="signin-card">${content}</section></div>`;
}
function showSignedOut(reason=''){
  authShell(`<span class="brand-mark large">A</span><span class="micro">ATLAS AI · SMARTLEDGER</span><h1>You are signed out.</h1><p>${reason||'Choose how you would like to enter Atlas AI. Demo mode will never open automatically.'}</p><button class="gold" id="demoEntry">Enter demo workspace</button><button class="outline" id="accountEntry">Sign in or create account</button><small>Release 21.2.2 Recovery · Secure session cleared</small>`);
  document.querySelector('#demoEntry')?.addEventListener('click',()=>{setSession('demo@atlasaiusa.com','demo');location.reload()});
  document.querySelector('#accountEntry')?.addEventListener('click',showAccountAccess);
}
function showAccountAccess(mode='signin'){
  const create=mode==='create';
  authShell(`<span class="brand-mark large">A</span><span class="micro">SECURE ACCOUNT ACCESS</span><h1>${create?'Create an account':'Sign in'}</h1><p>${create?'Create a local test account for this browser.':'Use the founder demo credentials or an account created here.'}</p>${create?'<label class="signin-label">Name<input id="signinName" autocomplete="name" placeholder="Your name"></label>':''}<label class="signin-label">Email<input id="signinEmail" type="email" autocomplete="email" value="${create?'':'demo@atlasaiusa.com'}" placeholder="you@company.com"></label><label class="signin-label">Password<input id="signinPassword" type="password" autocomplete="${create?'new-password':'current-password'}" value="${create?'':'AtlasDemo!2026'}" placeholder="At least 8 characters"></label><div id="signinMessage" class="signin-message" aria-live="polite"></div><button class="gold" id="signinSubmit">${create?'Create account':'Sign in'}</button><button class="outline" id="switchAuth">${create?'Already have an account? Sign in':'New user? Create account'}</button><button class="outline" id="backChoice">Back</button><small>Founder demo: demo@atlasaiusa.com / AtlasDemo!2026</small>`);
  document.querySelector('#switchAuth')?.addEventListener('click',()=>showAccountAccess(create?'signin':'create'));
  document.querySelector('#backChoice')?.addEventListener('click',()=>showSignedOut());
  document.querySelector('#signinSubmit')?.addEventListener('click',()=>{
    const email=(document.querySelector('#signinEmail')?.value||'').trim().toLowerCase();
    const password=document.querySelector('#signinPassword')?.value||'';
    if(!email.includes('@')) return showAuthMessage('Enter a valid email address.');
    if(password.length<8) return showAuthMessage('Password must contain at least 8 characters.');
    if(create){
      const name=(document.querySelector('#signinName')?.value||'').trim();
      if(!name) return showAuthMessage('Enter your name.');
      const users=getLocalUsers();
      if(users[email]) return showAuthMessage('An account with this email already exists.');
      users[email]={name,password,createdAt:new Date().toISOString()};
      saveLocalUsers(users);setSession(email,'customer');showAuthMessage('Account created. Opening SmartLedger…','success');setTimeout(()=>location.reload(),500);return;
    }
    const demoOk=email==='demo@atlasaiusa.com'&&password==='AtlasDemo!2026';
    const user=getLocalUsers()[email];
    if(!demoOk && (!user||user.password!==password)) return showAuthMessage('Email or password is incorrect.');
    setSession(email,demoOk?'demo':'customer');showAuthMessage('Sign-in successful. Opening SmartLedger…','success');setTimeout(()=>location.reload(),350);
  });
}
function signOut(reason=''){
  clearTimeout(inactivityTimer);clearTimeout(warningTimer);
  sessionStorage.removeItem(SESSION_KEY);
  localStorage.setItem('atlasRequireAuth','1');
  showSignedOut(reason);
}
function resetInactivityTimer(){
  clearTimeout(inactivityTimer);clearTimeout(warningTimer);
  warningTimer=setTimeout(()=>{
    openModal('Session expiring soon','<p>For your security, SmartLedger will sign out in 60 seconds because no activity was detected.</p><button class="gold modal-action" id="staySignedIn">Stay signed in</button>','SECURITY NOTICE');
    setTimeout(()=>document.querySelector('#staySignedIn')?.addEventListener('click',()=>{document.querySelector('#modal')?.classList.remove('open');resetInactivityTimer();toast('Session extended')}),0);
  },WARNING_AT);
  inactivityTimer=setTimeout(()=>signOut('Your session expired after five minutes of inactivity.'),INACTIVITY_LIMIT);
}
function startInactivityTracking(){
  ['click','keydown','mousemove','touchstart','scroll'].forEach(evt=>window.addEventListener(evt,resetInactivityTimer,{passive:true}));
  resetInactivityTimer();
}

bindDashboard();
document.querySelectorAll('.nav-item').forEach(b=>b.addEventListener('click',()=>showPage(b.dataset.nav)));
document.querySelector('.signout')?.addEventListener('click',()=>signOut());
document.querySelector('#reloadBtn')?.addEventListener('click',()=>{if(document.querySelector('.count'))animateCounts();toast('Demo data reloaded')});
document.querySelector('#presentationBtn')?.addEventListener('click',()=>{document.body.classList.toggle('presentation');toast(document.body.classList.contains('presentation')?'Presentation mode on':'Presentation mode off')});
document.querySelector('#modalClose')?.addEventListener('click',()=>document.querySelector('#modal').classList.remove('open'));
document.querySelector('#modal')?.addEventListener('click',e=>{if(e.target.id==='modal')e.currentTarget.classList.remove('open')});

if(localStorage.getItem('atlasRequireAuth')==='1' && !sessionStorage.getItem(SESSION_KEY)){
  showSignedOut();
}else{
  startInactivityTracking();
}
