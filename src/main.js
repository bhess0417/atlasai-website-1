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
      ${['Dashboard','Financial Imports','Transactions','Import History','Settings'].map((x,i)=>`<button class="nav-item ${i===0?'active':''}" data-nav="${x}"><span>${['⌂','⇧','≡','◷','⚙'][i]}</span>${x}</button>`).join('')}
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
        <span class="release">ATLAS 20.7 · EXECUTIVE EXPERIENCE</span>
        <div class="profile"><span>BH</span><div><strong>Brian Hess</strong><small>Owner</small></div></div>
      </div>
    </header>

    <section class="demo-strip"><div><span class="live">LIVE DEMO WORKSPACE</span><strong>Atlas Manufacturing Group</strong><span>Fictional but internally consistent data · 9,842 transactions</span></div><button class="outline" id="reloadBtn">Reload demo data</button></section>

    <main class="page">
      <section class="welcome-card">
        <div>
          <span class="micro">ATLAS EXECUTIVE COMMAND CENTER · RELEASE 20.7</span>
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
  const chat=document.querySelector('#chat');
  const div=document.createElement('div'); div.className=`message ${who}`;
  div.innerHTML=who==='atlas'?`<span>A</span><p>${text}</p>`:`<p>${text}</p><span>BH</span>`;
  chat.appendChild(div); chat.scrollTop=chat.scrollHeight;
}
function answer(prompt){
  addMessage(prompt,'user'); document.querySelector('#topic').textContent=prompt;
  const typing=document.querySelector('#typing'); typing.classList.add('show');
  setTimeout(()=>{ typing.classList.remove('show'); let reply=replies[prompt];
    if(!reply){ const q=prompt.toLowerCase();
      if(q.includes('cash')) reply='Cash on hand is $2.84 million. Atlas currently rates 90-day liquidity risk as low, with improving operating cash flow.';
      else if(q.includes('vendor')) reply='Atlas reviewed 412 active vendors. The strongest vendor-related opportunities are merchant processing and freight pricing.';
      else reply='Based on the demo company data, the best next step is to review the ranked CEO Action Center. Commercial insurance remains the highest-impact opportunity.';
    }
    addMessage(reply,'atlas');
  },850);
}

function openModal(title, body, eyebrow='EXECUTIVE BRIEF'){
  document.querySelector('#modalEyebrow').textContent=eyebrow;
  document.querySelector('#modalTitle').textContent=title;
  document.querySelector('#modalBody').innerHTML=body;
  document.querySelector('#modal').classList.add('open');
}
function toast(msg){ const t=document.querySelector('#toast'); t.textContent=msg; t.classList.add('show'); setTimeout(()=>t.classList.remove('show'),1500); }

animateCounts();

document.querySelectorAll('[data-prompt]').forEach(b=>b.addEventListener('click',()=>answer(b.dataset.prompt)));
document.querySelector('#chatForm').addEventListener('submit',e=>{e.preventDefault();const i=document.querySelector('#chatInput');const v=i.value.trim();if(v){answer(v);i.value='';}});
document.querySelector('#newChat').addEventListener('click',()=>{document.querySelector('#chat').innerHTML='<div class="message atlas"><span>A</span><p>New conversation started. What would you like to review?</p></div>';document.querySelector('#topic').textContent='New conversation';});
document.querySelector('#askBtn').addEventListener('click',()=>{document.querySelector('#atlasPanel').scrollIntoView({behavior:'smooth',block:'start'});document.querySelector('#chatInput').focus();});
document.querySelector('#briefBtn').addEventListener('click',()=>openModal('Tonight’s Executive Brief',`<div class="brief-grid"><article><span>Financial health</span><strong>92</strong><small>Healthy</small></article><article><span>Annual savings</span><strong>$46,100</strong><small>4 opportunities</small></article><article><span>Top priority</span><strong>Insurance review</strong><small>$18,300 potential</small></article></div><p>Atlas recommends beginning the commercial insurance review first, followed by merchant processing. Cash flow remains healthy and no immediate liquidity risk was detected.</p>`));
document.querySelector('#modalClose').addEventListener('click',()=>document.querySelector('#modal').classList.remove('open'));
document.querySelector('#modal').addEventListener('click',e=>{if(e.target.id==='modal')e.currentTarget.classList.remove('open')});
document.querySelectorAll('.priority-row').forEach(row=>row.addEventListener('click',()=>{const p=priorities[Number(row.dataset.priority)];openModal(p.title,`<p>${p.detail}</p><div class="detail-box"><span>Estimated annual impact</span><strong>${p.savings?money.format(p.savings):'Positive operating trend'}</strong></div><button class="gold modal-action" id="askThis">Ask Atlas about this</button>`,'ATLAS INVESTIGATION');setTimeout(()=>document.querySelector('#askThis')?.addEventListener('click',()=>{document.querySelector('#modal').classList.remove('open');answer(`Explain ${p.title}`)}),0)}));
document.querySelectorAll('.nav-item').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.nav-item').forEach(x=>x.classList.remove('active'));b.classList.add('active');toast(`${b.dataset.nav} selected`)}));
document.querySelector('#reloadBtn').addEventListener('click',()=>{animateCounts();toast('Demo data reloaded')});
document.querySelector('#presentationBtn').addEventListener('click',()=>{document.body.classList.toggle('presentation');toast(document.body.classList.contains('presentation')?'Presentation mode on':'Presentation mode off')});
