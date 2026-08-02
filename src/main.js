import './style.css';
import { supabase, supabaseEnabled } from './supabase.js';
import { parseCsv, detectMapping, normalizeTransactions, validateTransactions } from './csv.js';
import { getImportHistory, saveImport, removeImport, clearImports } from './importStore.js';
import { buildExecutiveBrief } from './intelligence.js';
import { demoProfile, demoBrief, demoIndustryNews, createDemoTransactions } from './demoData.js';

const app = document.querySelector('#app');
const money = new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'});
const dateFmt = new Intl.DateTimeFormat('en-US',{month:'short',day:'numeric',year:'numeric'});
const companies=[{id:'atlas',name:'Atlas AI Demo Company',plan:'Professional',role:'Owner'},{id:'arclight',name:'ArcLight Customer Trial',plan:'Enterprise Trial',role:'Admin'}];
const allowedViews=['dashboard','imports','transactions','history','settings'];
const initialView=allowedViews.includes(location.hash.slice(1))?location.hash.slice(1):'dashboard';
const state={presentation:localStorage.getItem('atlas-presentation')==='true',user:JSON.parse(localStorage.getItem('atlas-user')||'null'),company:localStorage.getItem('atlas-company')||'atlas',view:initialView,step:1,file:null,raw:null,mapping:{},validation:null,authMode:'signup',onboardingStep:1};

function isDemoWorkspace(){return state.company==='atlas'}
function seedDemoWorkspace(force=false){
  localStorage.setItem('atlas-demo-mode','true');
  const existing=JSON.parse(localStorage.getItem('atlas-demo-transactions')||'[]');
  if(force||existing.length<demoProfile.annualTransactions){
    localStorage.setItem('atlas-demo-transactions',JSON.stringify(createDemoTransactions(demoProfile.annualTransactions)));
  }
  const demoHistory=[{id:'demo-annual-review',filename:'Atlas Manufacturing Group · Consolidated Financial Activity',createdAt:'2026-07-26T04:17:00.000Z',rows:demoProfile.annualTransactions,validRate:99,debits:22165000,credits:28400000,demo:true}];
  localStorage.setItem('atlas-demo-import-history',JSON.stringify(demoHistory));
}
function currentTransactions(){
  if(isDemoWorkspace()){
    seedDemoWorkspace();
    return JSON.parse(localStorage.getItem('atlas-demo-transactions')||'[]');
  }
  return JSON.parse(localStorage.getItem('atlas-transactions')||'[]');
}
function currentImportHistory(){
  if(isDemoWorkspace()){
    seedDemoWorkspace();
    return JSON.parse(localStorage.getItem('atlas-demo-import-history')||'[]');
  }
  return getImportHistory();
}

function toast(message){const el=document.querySelector('#toast');if(!el)return;el.textContent=message;el.classList.add('show');setTimeout(()=>el.classList.remove('show'),2200)}
function initials(name){return name.split(' ').map(x=>x[0]).slice(0,2).join('').toUpperCase()}
function getAccounts(){try{return JSON.parse(localStorage.getItem('atlas-accounts')||'[]')}catch{return []}}
function saveAccounts(accounts){localStorage.setItem('atlas-accounts',JSON.stringify(accounts))}
function setSession(user){state.user=user;localStorage.setItem('atlas-user',JSON.stringify(user));renderApp()}
function loginDemo(){state.company='atlas';localStorage.setItem('atlas-company','atlas');seedDemoWorkspace(true);setSession({name:'Brian Hess',email:'founder@atlasaiusa.com',role:'Owner',company:demoProfile.company})}
function customerLogin(email,password){
  const account=getAccounts().find(a=>a.email.toLowerCase()===email.toLowerCase()&&a.password===password);
  if(!account){showAuthMessage('Email or password was not recognized.','error');return}
  setSession({name:account.name,email:account.email,role:'Owner',company:account.company});
}
function customerSignup(form){
  const data=Object.fromEntries(new FormData(form));
  if(!data.name||!data.email||!data.company||!data.password){showAuthMessage('Complete all required fields.','error');return}
  if(String(data.password).length<8){showAuthMessage('Use at least 8 characters for the password.','error');return}
  const accounts=getAccounts();
  if(accounts.some(a=>a.email.toLowerCase()===String(data.email).toLowerCase())){showAuthMessage('An account already exists for this email.','error');return}
  const account={id:crypto.randomUUID(),name:data.name.trim(),email:data.email.trim(),company:data.company.trim(),password:data.password,createdAt:new Date().toISOString(),trialEndsAt:new Date(Date.now()+14*86400000).toISOString()};
  accounts.push(account);saveAccounts(accounts);
  localStorage.setItem('atlas-pending-account',JSON.stringify(account));
  state.onboardingStep=1;renderOnboarding(account);
}
function showAuthMessage(message,type='success'){const el=document.querySelector('#authMessage');if(!el)return;el.textContent=message;el.className=`auth-message ${type}`}
function authScreen(){
  const mode=state.authMode;
  app.innerHTML=`<main class="auth-shell customer-auth"><section class="auth-brand-panel"><div class="brand-lockup"><span class="brand-mark">A</span><div><strong>ATLAS AI</strong><small>SMARTLEDGER</small></div></div><div class="auth-copy"><span class="eyebrow">SMARTLEDGER CUSTOMER ACCESS</span><h1>Your financial copilot starts here.</h1><p>Create your company workspace, import financial activity, and let Atlas identify the actions with the greatest financial impact.</p><div class="auth-proof"><span>✓ 14-day free trial</span><span>✓ No credit card required</span><span>✓ Private browser-based demo</span></div></div><small class="legal">© 2026 Atlas AI, LLC</small></section><section class="auth-form-panel"><div class="auth-card signup-card"><div class="auth-tabs"><button type="button" data-auth-mode="signup" class="${mode==='signup'?'active':''}">Create account</button><button type="button" data-auth-mode="login" class="${mode==='login'?'active':''}">Sign in</button></div>${mode==='signup'?`<span class="status-chip">14-DAY FREE TRIAL</span><h2>Create your SmartLedger workspace</h2><p>Start with your name and company. Atlas will guide the first setup.</p><form id="signupForm" class="auth-fields"><label>Full name<input name="name" autocomplete="name" required placeholder="Your name"></label><label>Company name<input name="company" autocomplete="organization" required placeholder="Your business"></label><label>Work email<input type="email" name="email" autocomplete="email" required placeholder="you@company.com"></label><label>Password<input type="password" name="password" autocomplete="new-password" minlength="8" required placeholder="At least 8 characters"></label><button class="primary-button" type="submit">Start free trial</button></form>`:`<span class="status-chip">WELCOME BACK</span><h2>Sign in to SmartLedger</h2><p>Continue to your Atlas financial workspace.</p><form id="loginForm" class="auth-fields"><label>Work email<input type="email" name="email" autocomplete="email" required></label><label>Password<input type="password" name="password" autocomplete="current-password" required></label><button class="primary-button" type="submit">Sign in</button></form><button type="button" id="forgotPassword" class="text-button auth-link">Forgot password?</button>`}<div id="authMessage" class="auth-message" aria-live="polite"></div><div class="auth-divider"><span>or preview the product</span></div><button id="demoLogin" class="demo-button full-width">Enter founder demo</button><small class="configuration">${supabaseEnabled?'● Supabase connected':'● Customer-access prototype · accounts remain in this browser'}</small></div></section></main>`;
  document.querySelectorAll('[data-auth-mode]').forEach(btn=>btn.onclick=()=>{state.authMode=btn.dataset.authMode;authScreen()});
  document.querySelector('#demoLogin').onclick=loginDemo;
  document.querySelector('#signupForm')?.addEventListener('submit',e=>{e.preventDefault();customerSignup(e.currentTarget)});
  document.querySelector('#loginForm')?.addEventListener('submit',e=>{e.preventDefault();const d=Object.fromEntries(new FormData(e.currentTarget));customerLogin(d.email,d.password)});
  document.querySelector('#forgotPassword')?.addEventListener('click',()=>showAuthMessage('Password reset instructions would be sent by email in the production Supabase connection.'));
}
function renderOnboarding(account){
  const steps=[['Welcome to SmartLedger',`Atlas is ready to build the first financial brief for ${escapeHtml(account.company)}.`],['Choose your starting point','Import a CSV statement now or begin with the guided demo data.'],['Your workspace is ready','Atlas will greet you by name and keep your dashboard and conversation side by side.']];
  const [title,copy]=steps[state.onboardingStep-1];
  app.innerHTML=`<main class="onboarding-shell"><section class="onboarding-card"><div class="brand-lockup centered"><span class="brand-mark">A</span><div><strong>ATLAS AI</strong><small>SMARTLEDGER</small></div></div><div class="onboarding-progress">${steps.map((_,i)=>`<span class="${i<state.onboardingStep?'complete':''} ${i===state.onboardingStep-1?'active':''}"></span>`).join('')}</div><span class="eyebrow">STEP ${state.onboardingStep} OF ${steps.length}</span><h1>${title}</h1><p>${copy}</p>${state.onboardingStep===1?`<div class="welcome-person"><span>${initials(account.name)}</span><div><strong>${escapeHtml(account.name)}</strong><small>${escapeHtml(account.company)} · Owner</small></div></div>`:''}${state.onboardingStep===2?`<div class="onboarding-options"><button type="button" data-start="imports"><strong>Import company transactions</strong><span>Upload a bank or credit-card CSV.</span></button><button type="button" data-start="demo"><strong>Explore with demo data</strong><span>See Atlas before uploading anything.</span></button></div>`:''}<div class="onboarding-actions">${state.onboardingStep>1?'<button type="button" id="onboardingBack" class="demo-button fit">Back</button>':''}<button type="button" id="onboardingNext" class="primary-button fit">${state.onboardingStep===3?'Open SmartLedger':'Continue'}</button></div></section></main>`;
  let startView='dashboard';document.querySelectorAll('[data-start]').forEach(btn=>btn.onclick=()=>{startView=btn.dataset.start==='imports'?'imports':'dashboard';document.querySelectorAll('[data-start]').forEach(x=>x.classList.remove('selected'));btn.classList.add('selected')});
  document.querySelector('#onboardingBack')?.addEventListener('click',()=>{state.onboardingStep--;renderOnboarding(account)});
  document.querySelector('#onboardingNext').onclick=()=>{if(state.onboardingStep<3){state.onboardingStep++;renderOnboarding(account)}else{state.view=startView;localStorage.removeItem('atlas-pending-account');setSession({name:account.name,email:account.email,role:'Owner',company:account.company})}};
}
function navItem(view,icon,label){return `<button type="button" class="nav-item ${state.view===view?'active':''}" data-view="${view}" aria-current="${state.view===view?'page':'false'}"><span aria-hidden="true">${icon}</span>${label}</button>`}
function renderApp(){const company=companies.find(c=>c.id===state.company)||companies[0];app.innerHTML=`<div class="app-shell ${state.presentation?'presentation-mode':''}"><aside class="sidebar" id="sidebar"><div class="brand-lockup sidebar-brand"><span class="brand-mark">A</span><div><strong>ATLAS AI</strong><small>SMARTLEDGER</small></div></div><nav class="side-nav">${navItem('dashboard','⌂','Dashboard')}${navItem('imports','⇧','Financial Imports')}${navItem('transactions','≡','Transactions')}${navItem('history','◷','Import History')}${navItem('settings','⚙','Settings')}</nav><div class="security-card"><span>◈</span><div><strong>Private processing</strong><small>Files remain in your browser</small></div></div><button id="logout" class="logout">↪ Sign out</button></aside><main class="main-area"><header class="topbar"><button class="menu" id="menu">☰</button><div class="company-select-wrap"><small>CURRENT WORKSPACE</small><select id="companySelect">${companies.map(c=>`<option value="${c.id}" ${c.id===company.id?'selected':''}>${c.name}</option>`).join('')}</select></div><div class="top-actions"><button type="button" class="presentation-toggle" data-action="presentation">${state.presentation?'Exit presentation':'Presentation mode'}</button><span class="sprint-chip">ATLAS 24.2.1</span><div class="user-chip"><span>${initials(state.user.name)}</span><div><strong>${state.user.name}</strong><small>${company.role}</small></div></div></div></header>${isDemoWorkspace()?`<div class="demo-workspace-banner"><div><span>LIVE DEMO WORKSPACE</span><strong>${demoProfile.company}</strong><small>Fictional but internally consistent manufacturing data · ${demoProfile.annualTransactions.toLocaleString('en-US')} transactions</small></div><button type="button" class="demo-button fit" data-action="reset-demo">Reload demo data</button></div>`:''}<section id="content"></section></main></div><dialog id="ceoReportDialog" class="report-dialog"><article><button type="button" class="dialog-close" data-close-report aria-label="Close CEO report">×</button><span class="eyebrow">CEO EXECUTIVE BRIEF</span><h2>Financial position and recommended actions</h2><div class="report-summary"><div><small>CASH POSITION</small><strong>$2,840,000</strong><span>Healthy</span></div><div><small>PROJECTED ANNUAL SAVINGS</small><strong>$46,100</strong><span>4 executive priorities</span></div><div><small>30-DAY OUTLOOK</small><strong>$2,510,000</strong><span>Low risk</span></div></div><section class="report-section"><h3>What deserves attention</h3><p>Commercial insurance and merchant-processing fees are the two largest near-term savings opportunities. Steel and freight inflation remain the most important operating risks.</p></section><section class="report-section"><h3>Recommended next actions</h3><ol><li>Request competitive insurance quotes.</li><li>Renegotiate merchant-processing terms.</li><li>Review steel purchase commitments and freight contracts.</li></ol></section></article></dialog><dialog id="intelligenceDialog" class="report-dialog intelligence-dialog"><article><button type="button" class="dialog-close" data-close-intelligence aria-label="Close Atlas explanation">×</button><span class="eyebrow">ATLAS INVESTIGATION MODE</span><h2 id="intelligenceTitle">Executive investigation</h2><div id="intelligenceBody"></div></article></dialog><div id="toast" class="toast"></div>`;bindShell();renderView()}
function bindShell(){document.querySelector('[data-action="presentation"]')?.addEventListener('click',()=>action('presentation'));document.querySelector('[data-action="reset-demo"]')?.addEventListener('click',()=>{seedDemoWorkspace(true);localStorage.removeItem('atlas-conversation');renderApp();toast('Demo company reloaded')});document.querySelectorAll('[data-view]').forEach(b=>b.onclick=()=>navigate(b.dataset.view));document.querySelector('#companySelect').onchange=e=>{state.company=e.target.value;localStorage.setItem('atlas-company',state.company);if(isDemoWorkspace())seedDemoWorkspace();else localStorage.setItem('atlas-demo-mode','false');state.view='dashboard';renderApp()};document.querySelector('#logout').onclick=async()=>{if(supabaseEnabled)await supabase.auth.signOut();localStorage.removeItem('atlas-user');state.user=null;authScreen()};document.querySelector('#menu').onclick=()=>document.querySelector('#sidebar').classList.toggle('open');window.onhashchange=()=>{const next=location.hash.slice(1);if(allowedViews.includes(next)&&next!==state.view){state.view=next;renderApp()}};document.addEventListener('keydown',handleGlobalKeydown,{once:true})}
function navigate(view){if(!allowedViews.includes(view))return;state.view=view;location.hash=view;renderApp()}
function handleGlobalKeydown(e){if(e.key==='Escape'){document.querySelector('#sidebar')?.classList.remove('open');document.querySelector('#ceoReportDialog')?.close()}document.addEventListener('keydown',handleGlobalKeydown,{once:true})}
function header(k,t,p){return `<div class="page-header"><div><span class="eyebrow">${k}</span><h1>${t}</h1><p>${p}</p></div><span class="plan-chip">Financial Data Hub</span></div>`}
function renderView(){const content=document.querySelector('#content');const views={dashboard,imports,transactions,history,settings};content.innerHTML=views[state.view]();bindView()}

function escapeHtml(value){return String(value??'').replace(/[&<>'"]/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]))}
function getAtlasConversation(){
  try{return JSON.parse(localStorage.getItem('atlas-conversation')||'[]')}catch{return []}
}
function saveAtlasConversation(messages){localStorage.setItem('atlas-conversation',JSON.stringify(messages.slice(-30)))}
function getAtlasMemory(){try{return JSON.parse(localStorage.getItem('atlas-conversation-memory')||'{}')}catch{return {}}}
function saveAtlasMemory(memory){localStorage.setItem('atlas-conversation-memory',JSON.stringify({...memory,updatedAt:new Date().toISOString()}))}
function detectAtlasIntent(question){
  const q=String(question||'').toLowerCase();
  const domains={
    industry:['news','industry','outside','market','economy','regulation'],forecast:['forecast','next quarter','future','outlook','project'],
    insurance:['insurance','carrier','premium','policy','renewal','broker'],savings:['save','saving','opportunity','priority','reduce','cut','waste'],
    vendors:['vendor','supplier','merchant','biggest','largest expense','spend'],duplicates:['duplicate','double','twice'],cash:['cash','liquidity','balance'],
    subscriptions:['software','subscription','license','seat','saas'],summary:['summary','brief','changed','today','yesterday','overview'],
    payroll:['payroll','salary','overtime','labor','employee'],freight:['freight','shipping','carrier cost'],steel:['steel','material','raw material']
  };
  let best=['general',0];
  Object.entries(domains).forEach(([intent,terms])=>{const score=terms.reduce((n,t)=>n+(q.includes(t)?1:0),0);if(score>best[1])best=[intent,score]});
  return best[0];
}
function resolveAtlasQuestion(question){
  const raw=String(question||'').trim();
  const memory=getAtlasMemory();
  const recent=getAtlasConversation().slice(-8).map(m=>`${m.role}: ${m.text}`).join('\n');
  return {raw,topic:detectAtlasIntent(raw)!=='general'?detectAtlasIntent(raw):(memory.activeTopic||memory.lastIntent||'general'),recent};
}
function buildAtlasContext(brief,transactions){
  const expenses=transactions.filter(tx=>Number(tx.amount)<0);
  const totalExpenses=expenses.reduce((sum,tx)=>sum+Math.abs(Number(tx.amount)||0),0);
  const byVendor={};const byCategory={};
  expenses.forEach(tx=>{const amount=Math.abs(Number(tx.amount)||0);const vendor=tx.vendor||tx.description||'Unknown vendor';const category=tx.category||'Uncategorized';byVendor[vendor]=(byVendor[vendor]||0)+amount;byCategory[category]=(byCategory[category]||0)+amount});
  const topVendors=Object.entries(byVendor).sort((a,b)=>b[1]-a[1]).slice(0,8);
  const topCategories=Object.entries(byCategory).sort((a,b)=>b[1]-a[1]).slice(0,8);
  return {company:isDemoWorkspace()?demoProfile.company:(state.user?.company||'Customer company'),demoMode:isDemoWorkspace(),brief:{summary:brief?.summary,healthScore:brief?.healthScore,cashStatus:brief?.cashStatus,annualSavings:brief?.annualSavings,transactionCount:brief?.transactionCount,nextAction:brief?.nextAction,priorities:(brief?.priorities||[]).map(x=>({id:x.id,title:x.title,impact:x.impact,confidence:x.confidence,why:x.why,nextStep:x.nextStep}))},financials:{totalExpenses,topVendors,topCategories},demoFacts:isDemoWorkspace()?{cashOnHand:2840000,projected30DayCash:2510000,revenue:demoProfile.revenue,employees:187,locations:3,savingsRealizedYTD:73860,softwareSeatsInactive:27,softwareAnnualOpportunity:7900,merchantFeeIncreasePercent:0.4,freightSavingsOpportunity:9200}:null};
}
async function callAtlasService(question,brief,transactions,messages){
  const response=await fetch('/api/atlas-chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({question,messages:messages.slice(-12),memory:getAtlasMemory(),context:buildAtlasContext(brief,transactions)})});
  if(!response.ok)throw new Error(`Atlas service ${response.status}`);
  const data=await response.json();
  if(!data.answer)throw new Error('Atlas returned no answer');
  return data;
}
function localConversationalResponse(question,brief,transactions){
  const {raw,topic,recent}=resolveAtlasQuestion(question);const q=raw.toLowerCase();const context=buildAtlasContext(brief,transactions);const facts=context.demoFacts;
  const lastAtlas=getAtlasConversation().slice().reverse().find(m=>m.role==='atlas')?.text||'';
  const refersBack=/\b(it|this|that|these|those|them|they|each|one|ones|same|there)\b/i.test(raw)||q.split(/\s+/).length<6;
  const active=topic==='general'&&refersBack?(getAtlasMemory().activeTopic||detectAtlasIntent(lastAtlas)):topic;
  const moneyValue=n=>money.format(Number(n)||0);
  if(active==='subscriptions'||/seat|license|software|subscription/.test(`${q} ${lastAtlas.toLowerCase()}`)){
    if(/month|monthly|each month/.test(q))return `The 27 inactive software seats represent about ${moneyValue(facts.softwareAnnualOpportunity/12)} per month, based on the modeled ${moneyValue(facts.softwareAnnualOpportunity)} annual opportunity. That is the amount Atlas believes can likely be removed—not necessarily the company’s entire software bill.`;
    if(/each|per seat|one seat/.test(q))return `The modeled avoidable cost averages about ${moneyValue(facts.softwareAnnualOpportunity/27/12)} per inactive seat each month. Actual seat prices will vary by vendor and plan.`;
    if(/which|vendor|breakdown|who/.test(q))return `The current demo identifies 27 inactive or overlapping seats, but it does not yet contain a trustworthy vendor-by-vendor seat ledger. The responsible next step is to match the licenses to owners and renewal records before cancellation.`;
    if(/cancel|remove|do next|what next|recommend/.test(q))return `Confirm the owner of each inactive seat, check contract and renewal dates, then cancel or reassign only the seats with no business owner. That protects access while pursuing the ${moneyValue(facts.softwareAnnualOpportunity)} annual opportunity.`;
    return `Atlas found 27 paid software seats with no activity in the last 90 days. The modeled avoidable cost is ${moneyValue(facts.softwareAnnualOpportunity)} annually, or about ${moneyValue(facts.softwareAnnualOpportunity/12)} monthly.`;
  }
  if(active==='insurance')return /next|do|how/.test(q)?`Ask the broker for the current loss-run report and three comparable quotes using identical coverage limits. Then compare premium, deductibles, exclusions, and claims support—not price alone.`:`Commercial insurance remains the highest-impact modeled opportunity at about ${moneyValue(18700)} annually because the renewal is 11% above the prior term.`;
  if(active==='cash')return `Cash on hand is ${moneyValue(facts.cashOnHand)}, with a modeled 30-day balance of ${moneyValue(facts.projected30DayCash)}. Atlas currently classifies near-term liquidity risk as low.`;
  if(active==='freight')return `Atlas identified about ${moneyValue(facts.freightSavingsOpportunity)} in annual freight savings. The best next step is to compare lane-level rates, accessorial charges, and minimum-volume commitments before renegotiating.`;
  if(active==='savings')return `Atlas currently models ${moneyValue(brief.annualSavings)} in annual opportunities. The highest-impact action is ${brief.nextAction?.title||'reviewing the top ranked opportunity'}, followed by software-seat cleanup and merchant-fee review.`;
  if(active==='vendors'){
    const [vendor,amount]=context.financials.topVendors[0]||[];return vendor?`${vendor} is the largest vendor in the available transaction data at ${moneyValue(amount)}. I can also compare it with the next vendors or explain what drove the total.`:`I do not have enough vendor detail to rank spending yet.`;
  }
  if(active==='summary')return `Since the prior review, merchant-processing fees increased ${facts.merchantFeeIncreasePercent}%, cash improved to ${moneyValue(facts.cashOnHand)}, a ${moneyValue(facts.freightSavingsOpportunity)} freight opportunity was identified, and 27 inactive software seats remain the clearest immediate cleanup item.`;
  if(/why/.test(q)&&lastAtlas)return `The main reason is financial impact combined with ease of action. Atlas ranks items higher when the records show recurring cost, a credible savings path, and a next step that can be verified before money or access is changed.`;
  if(/what (do you mean|are you talking about)|explain/.test(q)&&lastAtlas)return `I’m referring to the subject in my previous answer. In this conversation, the active subject is ${String(getAtlasMemory().activeTopic||'the latest financial finding').replace(/_/g,' ')}. I’ll keep using that context until you change topics.`;
  return `I read that as a question about ${active==='general'?'the current executive brief':active}. Based on the available company data, ${brief.nextAction?.title||'the top ranked financial action'} deserves attention first. You can ask naturally—for example, “why is that first,” “what would it save monthly,” or “what should we do next?”`;
}
function atlasChat(brief,transactions){
  const stored=getAtlasConversation();
  const firstName=(state.user?.name||'there').split(' ')[0];
  const messages=stored.length?stored:[{role:'atlas',text:`Good morning, ${firstName}. I finished the overnight review. Commercial insurance is the highest-impact item today. What would you like to examine?`}];
  window.__atlasConversation=messages;
  window.__atlasTransactions=transactions;
  const visibleMessages=messages.slice(-4);
  const memory=getAtlasMemory();const engineLabel=memory.responseSource==='secure-ai'?'● SECURE AI':'● CONVERSATION READY';
  return `<aside class="atlas-command" aria-label="Ask Atlas"><div class="atlas-command-head"><div class="atlas-orb" aria-hidden="true">A</div><div><small>ATLAS · EXECUTIVE COPILOT</small><h2>Ask Atlas</h2><p>Follow up on the brief without leaving your dashboard.</p></div><div class="atlas-chat-tools"><span class="ai-live">${engineLabel}</span><button type="button" class="text-button" data-clear-chat>New conversation</button></div></div><div class="chat-messages" id="atlasMessages" aria-live="polite">${visibleMessages.map(message=>`<div class="chat-message ${message.role}"><span>${message.role==='atlas'?'A':'BH'}</span><p>${escapeHtml(message.text).replace(/\n/g,'<br>')}</p></div>`).join('')}${window.__atlasThinking?'<div class="chat-message atlas atlas-thinking"><span>A</span><p>Atlas is reviewing the conversation and company context…</p></div>':''}</div><div class="suggested-prompts"><button type="button" data-prompt="Explain the top recommendation">Explain top priority</button><button type="button" data-prompt="Where can I save money?">Find savings</button><button type="button" data-prompt="What important industry news affects this business?">Industry watch</button></div><form id="atlasChatForm" class="atlas-chat-form"><label class="sr-only" for="atlasQuestion">Ask Atlas</label><input id="atlasQuestion" autocomplete="off" placeholder="Ask Atlas a question..." maxlength="300"><button type="submit" aria-label="Send question">Send <span aria-hidden="true">→</span></button></form><small class="chat-disclaimer">Answers use conversation history and available company data. Secure AI activates when the server key is configured.</small></aside>`;
}
async function submitAtlasQuestion(question){
  const clean=String(question||'').trim();if(!clean)return;
  const brief=window.__atlasBrief;const transactions=window.__atlasTransactions||[];
  const messages=getAtlasConversation();messages.push({role:'user',text:clean});saveAtlasConversation(messages);
  window.__atlasThinking=true;renderApp();
  let answer;let source='local';
  try{const result=await callAtlasService(clean,brief,transactions,messages);answer=result.answer;source='secure-ai'}catch(error){console.info('Using Atlas local intelligence fallback:',error.message);answer=localConversationalResponse(clean,brief,transactions)}
  const updated=getAtlasConversation();updated.push({role:'atlas',text:answer});saveAtlasConversation(updated);
  const detected=detectAtlasIntent(`${clean} ${answer}`);const previous=getAtlasMemory();
  saveAtlasMemory({lastIntent:detected,lastQuestion:clean,lastAnswer:answer,activeTopic:detected==='general'?(previous.activeTopic||'executive brief'):detected,turnCount:(previous.turnCount||0)+1,responseSource:source});
  window.__atlasThinking=false;renderApp();
  requestAnimationFrame(()=>{const box=document.querySelector('#atlasMessages');if(box)box.scrollTop=box.scrollHeight;document.querySelector('#atlasQuestion')?.focus()});
}

function overnightExecutiveBrief(brief){
  const firstName=(state.user?.name||'there').split(' ')[0];
  return `<section class="morning-brief-v3"><div class="morning-message"><span class="eyebrow">OVERNIGHT BRIEF · ${demoProfile.completedAt}</span><h1>Good morning, ${escapeHtml(firstName)}.</h1><p>Atlas reviewed ${demoProfile.annualTransactions.toLocaleString('en-US')} transactions and found ${brief.priorities.length} items requiring attention.</p></div><div class="morning-summary"><div><small>HEALTH</small><strong>${brief.healthScore}</strong><span>${brief.cashStatus}</span></div><div><small>SAVINGS</small><strong>${money.format(brief.annualSavings)}</strong><span>Annual opportunity</span></div><div class="morning-priority-v3"><small>TOP PRIORITY</small><strong>${brief.nextAction?.title||'Review priorities'}</strong><button type="button" class="text-button" data-explain="${brief.nextAction?.id||''}">Explain →</button></div><button type="button" class="primary-button compact-report-button" data-action="open-report">Full CEO report</button></div></section>`;
}
function dashboard(){
  const demoMode=isDemoWorkspace();
  if(demoMode)seedDemoWorkspace();
  const h=currentImportHistory();
  const tx=currentTransactions();
  const total=h.reduce((sum,item)=>sum+item.rows,0);
  const brief=demoMode?{...demoBrief,generatedAt:new Date().toISOString()}:buildExecutiveBrief(tx,h);
  window.__atlasBrief=brief;
  const priorityCards=brief.priorities.map((item,index)=>`<article class="action-card intelligence-card"><div class="action-rank">${index+1}</div><div class="action-copy"><div class="investigation-status"><span>INVESTIGATION READY</span><small>${item.evidenceCount||item.evidence?.length||0} evidence points</small></div><small>${money.format(item.impact)} ESTIMATED ANNUAL IMPACT</small><h3>${item.title}</h3><div class="decision-meta"><span class="decision-score">Decision Score ${item.decisionScore||'—'}</span><span>${item.confidence}% confidence</span><span>${item.timeToValue||'30–90 days'}</span></div></div><button type="button" class="text-button investigation-button" data-explain="${item.id}">Investigate →</button></article>`).join('');
  const news=demoIndustryNews.map(item=>`<article class="news-card"><span>${item.level}</span><div><h3>${item.title}</h3><p>${item.impact}</p><small>${item.why}</small></div></article>`).join('');
  const firstName=(state.user?.name||'there').split(' ')[0];
  const metrics=`<section class="metric-ribbon"><article><small>ANNUAL REVENUE</small><strong>${demoMode?money.format(demoProfile.revenue):'—'}</strong><span>Healthy operating trend</span></article><article><small>CASH ON HAND</small><strong>${demoMode?'$2.84M':'—'}</strong><span>Low 90-day risk</span></article><article><small>ACTIVE VENDORS</small><strong>${demoMode?demoProfile.vendors:total.toLocaleString()}</strong><span>${demoMode?'Across 3 locations':'Imported activity'}</span></article><article><small>SAVINGS IDENTIFIED</small><strong>${money.format(brief.annualSavings)}</strong><span>${brief.priorities.length} ranked opportunities</span></article></section>`;
  const left=`<div class="workspace-main">${demoMode?overnightExecutiveBrief(brief):''}${metrics}<section class="panel executive-actions"><div class="panel-heading"><div><small>TODAY’S ACTION CENTER</small><h2>Decisions with the greatest financial impact</h2></div><span class="row-chip">RANKED BY ATLAS</span></div><div class="action-list">${priorityCards}</div></section><section class="panel business-pulse"><div class="panel-heading"><div><small>BUSINESS PULSE</small><h2>What the dashboard says at a glance</h2></div></div><div class="pulse-grid"><div><span>Revenue trend</span><strong>+8.2%</strong><small>Year over year</small></div><div><span>Operating margin</span><strong>21.4%</strong><small>Above plan</small></div><div><span>30-day cash</span><strong>$2.51M</strong><small>Projected balance</small></div><div><span>Savings realized</span><strong>$73,860</strong><small>Year to date</small></div></div></section>${demoMode?`<section class="panel executive-news"><div class="panel-heading"><div><small>INDUSTRY WATCH</small><h2>Only developments that may change a decision</h2></div><span class="row-chip">2 IMPORTANT</span></div><div class="news-grid">${news}</div><small class="industry-note">Fictional demonstration intelligence. Production results will use current, cited sources.</small></section>`:''}</div>`;
  const title=`<div class="workspace-title-v3"><div><span class="eyebrow">ATLAS EXECUTIVE WORKSPACE · RELEASE 24.2.1</span><strong>${demoMode?demoProfile.company:'Good afternoon, '+escapeHtml(firstName)+'.'}</strong><span>${demoMode?'187 employees · 3 locations · 9,842 transactions':'Dashboard and Atlas, together.'}</span></div><button type="button" class="presentation-toggle" data-action="presentation">${state.presentation?'Exit presentation':'Presentation mode'}</button></div>`;
  return `${title}<section class="workspace-layout-v2 release16-layout">${left}${atlasChat(brief,tx)}</section><footer class="release-footer"><span>Atlas SmartLedger · Release 24.2.1</span><span>Evidence-Based Executive Intelligence</span></footer>`;
}
function imports(){return `${header('FINANCIAL IMPORT CENTER','Import financial transactions','Upload, map, validate, preview, and save a CSV statement in five guided steps.')}<div class="stepper">${['Upload','Map columns','Validate','Preview','Complete'].map((x,i)=>`<div class="step ${state.step===i+1?'active':''} ${state.step>i+1?'done':''}"><span>${state.step>i+1?'✓':i+1}</span><b>${x}</b></div>`).join('')}</div><article class="panel import-panel">${importStep()}</article>`}
function importStep(){if(state.step===1)return `<div class="import-intro"><span class="upload-icon">⇧</span><h2>Upload a CSV statement</h2><p>Use a transaction export from your bank, credit card, or accounting system.</p><label class="drop-zone" id="dropZone"><input id="fileInput" type="file" accept=".csv,text/csv"><strong>Drop CSV file here</strong><span>or click to browse</span><small>Maximum recommended size: 10 MB</small></label><button class="demo-button sample-button" data-action="sample">Use included sample data</button></div>`;
if(state.step===2)return `<div class="mapping"><div class="panel-heading"><div><small>FILE</small><h2>${state.file?.name||'sample-transactions.csv'}</h2></div><span class="row-chip">${state.raw.rows.length} rows detected</span></div><p class="muted">Confirm which source column belongs to each SmartLedger field.</p><div class="mapping-grid">${[['date','Transaction date',true],['vendor','Vendor / merchant',false],['description','Description',true],['amount','Debit / amount',true],['credit','Credit / deposit',false],['category','Category',false],['balance','Balance',false]].map(([key,label,required])=>`<label>${label}${required?' *':''}<select data-map="${key}"><option value="">Not mapped</option>${state.raw.headers.map(h=>`<option value="${h}" ${state.mapping[key]===h?'selected':''}>${h}</option>`).join('')}</select></label>`).join('')}</div><div class="wizard-actions"><button class="demo-button fit" data-action="back">Back</button><button class="primary-button fit" data-action="validate">Validate transactions</button></div></div>`;
if(state.step===3){const s=state.validation.summary;return `<div><div class="validation-hero ${s.invalid?'warning':'success'}"><span>${s.invalid?'!':'✓'}</span><div><h2>${s.invalid?'Review recommended':'Validation passed'}</h2><p>${s.valid} of ${s.total} rows are ready to import.</p></div></div><div class="validation-grid"><article><small>TOTAL ROWS</small><strong>${s.total}</strong></article><article><small>VALID</small><strong>${s.valid}</strong></article><article><small>NEEDS REVIEW</small><strong>${s.invalid}</strong></article><article><small>POSSIBLE DUPLICATES</small><strong>${s.duplicates}</strong></article><article><small>DEBITS</small><strong>${money.format(s.debits)}</strong></article><article><small>CREDITS</small><strong>${money.format(s.credits)}</strong></article></div><div class="wizard-actions"><button class="demo-button fit" data-action="back">Back</button><button class="primary-button fit" data-action="preview">Preview import</button></div></div>`}
if(state.step===4)return `<div><div class="panel-heading"><div><small>TRANSACTION PREVIEW</small><h2>Confirm before import</h2></div><span class="row-chip">Showing first 12 rows</span></div>${transactionTable(state.validation.rows.slice(0,12))}<div class="wizard-actions"><button class="demo-button fit" data-action="back">Back</button><button class="primary-button fit" data-action="commit">Import ${state.validation.summary.valid} transactions</button></div></div>`;
return `<div class="completion"><span>✓</span><h2>Import complete</h2><p>${state.validation.summary.valid} transactions are now available to SmartLedger.</p><div class="completion-card"><small>WHAT HAPPENS NEXT</small><strong>Sprint 11B will categorize transactions, normalize vendors, and detect duplicate payments.</strong></div><button class="primary-button fit" data-action="another">Import another CSV</button><button class="demo-button fit" data-action="view-history">View import history</button></div>`}

function transactionTable(rows){return `<div class="table-wrap"><table><thead><tr><th>Status</th><th>Date</th><th>Vendor</th><th>Description</th><th>Amount</th><th>Category</th></tr></thead><tbody>${rows.map(tx=>`<tr><td><span class="status-dot ${tx.valid?'ok':'bad'}"></span>${tx.duplicate?'Duplicate?':tx.valid?'Ready':'Review'}</td><td>${tx.date||tx.dateRaw||'—'}</td><td>${tx.vendor}</td><td>${tx.description}</td><td class="amount ${tx.amount>=0?'credit':'debit'}">${money.format(tx.amount)}</td><td>${tx.category}</td></tr>`).join('')}</tbody></table></div>`}
function transactions(){const tx=currentTransactions();return `${header('TRANSACTIONS','Imported transaction ledger','Review the latest transactions stored by the Financial Import Center.')}<article class="panel">${tx.length?transactionTable(tx.slice(0,100)):`<div class="empty"><h2>No transactions yet</h2><p>Complete a CSV import to populate this ledger.</p><button class="primary-button fit" data-action="new-import">Start import</button></div>`}</article>`}
function history(){const h=currentImportHistory();return `${header('IMPORT HISTORY','Every import, clearly documented','Review source files, quality results, and completed transaction counts.')}<article class="panel"><div class="panel-heading"><div><small>AUDIT TRAIL</small><h2>${h.length} completed imports</h2></div>${h.length&&!isDemoWorkspace()?'<button class="text-button" data-action="clear">Clear import history</button>':''}</div>${h.length?`<div class="history-list">${h.map(x=>`<div><span class="file-badge">CSV</span><div><strong>${x.filename}</strong><small>${dateFmt.format(new Date(x.createdAt))} · ${x.rows} transactions · ${x.validRate}% valid</small></div><b>${money.format(x.debits)} debits</b><button class="icon-button" data-remove="${x.id}" title="Remove record">×</button></div>`).join('')}</div>`:`<div class="empty"><h2>No imports recorded</h2><p>Your completed CSV imports will appear here.</p></div>`}</article>`}
function settings(){return `${header('IMPORT SETTINGS','Financial data preferences','Configure safe defaults for future SmartLedger imports.')}<article class="panel form-grid"><label>Default currency<select><option>USD — US Dollar</option></select></label><label>Date format<select><option>Automatic detection</option><option>MM/DD/YYYY</option><option>YYYY-MM-DD</option></select></label><label class="toggle-row wide"><div><strong>Duplicate detection</strong><small>Flag matching date, vendor, and amount combinations.</small></div><input type="checkbox" checked></label><label class="toggle-row wide"><div><strong>Skip invalid rows</strong><small>Only import transactions that pass validation.</small></div><input type="checkbox" checked></label><button class="primary-button fit" data-action="save">Save settings</button></article>`}

function bindView(){document.querySelector('[data-clear-chat]')?.addEventListener('click',()=>{localStorage.removeItem('atlas-conversation');localStorage.removeItem('atlas-conversation-memory');renderApp();toast('New Atlas conversation started')});document.querySelectorAll('[data-action]').forEach(btn=>btn.onclick=()=>action(btn.dataset.action));document.querySelectorAll('[data-prompt]').forEach(btn=>btn.onclick=()=>submitAtlasQuestion(btn.dataset.prompt));const chatForm=document.querySelector('#atlasChatForm');if(chatForm)chatForm.onsubmit=e=>{e.preventDefault();submitAtlasQuestion(document.querySelector('#atlasQuestion')?.value)};document.querySelectorAll('[data-explain]').forEach(btn=>btn.onclick=()=>openExplanation(btn.dataset.explain));document.querySelectorAll('[data-investigation-action]').forEach(btn=>btn.onclick=()=>handleInvestigationAction(btn.dataset.investigationAction,btn.dataset.itemId));document.querySelectorAll('[data-close-report]').forEach(btn=>btn.onclick=()=>document.querySelector('#ceoReportDialog')?.close());document.querySelectorAll('[data-close-intelligence]').forEach(btn=>btn.onclick=()=>document.querySelector('#intelligenceDialog')?.close());document.querySelectorAll('[data-remove]').forEach(btn=>btn.onclick=()=>{removeImport(btn.dataset.remove);renderApp();toast('Import record removed')});document.querySelectorAll('[data-map]').forEach(sel=>sel.onchange=e=>state.mapping[e.target.dataset.map]=e.target.value);const input=document.querySelector('#fileInput');if(input)input.onchange=e=>loadFile(e.target.files[0]);const drop=document.querySelector('#dropZone');if(drop){['dragenter','dragover'].forEach(ev=>drop.addEventListener(ev,e=>{e.preventDefault();drop.classList.add('dragging')}));['dragleave','drop'].forEach(ev=>drop.addEventListener(ev,e=>{e.preventDefault();drop.classList.remove('dragging')}));drop.addEventListener('drop',e=>loadFile(e.dataTransfer.files[0]))}}
function investigationTimeline(item){
  const defaultTimeline=[
    ['4:08 AM','Source records synchronized'],
    ['4:12 AM',`${item.evidenceCount||item.evidence?.length||0} evidence points reviewed`],
    ['4:16 AM','Cost trend and operating context compared'],
    ['4:20 AM',`Savings estimate calculated at ${money.format(item.impact)}`],
    ['4:24 AM',`Recommendation ranked with Decision Score ${item.decisionScore||'—'}`]
  ];
  return (item.timeline||defaultTimeline).map(([time,label],index)=>`<li><span>${escapeHtml(time)}</span><div><b>${index===defaultTimeline.length-1?'Investigation completed':'Analysis step completed'}</b><p>${escapeHtml(label)}</p></div></li>`).join('');
}
function openExplanation(id){
  const item=window.__atlasBrief?.priorities?.find(priority=>priority.id===id);
  if(!item)return;
  window.__atlasInvestigation=item;
  const dialog=document.querySelector('#intelligenceDialog');
  document.querySelector('#intelligenceTitle').textContent=item.title;
  const evidence=(item.evidence||[item.why]).map(entry=>`<li>${escapeHtml(entry)}</li>`).join('');
  const rows=(item.supporting||[]).map(tx=>`<tr><td>${escapeHtml(tx.date||'—')}</td><td>${escapeHtml(tx.vendor||'—')}</td><td>${escapeHtml(tx.description||'Supporting record')}</td><td>${money.format(Math.abs(Number(tx.amount)||0))}</td></tr>`).join('');
  const monthly=Number(item.impact||0)/12;
  document.querySelector('#intelligenceBody').innerHTML=`<div class="investigation-ready-banner"><span>INVESTIGATION READY</span><strong>Atlas has assembled the evidence and recommended next steps.</strong></div><div class="decision-hero investigation-hero"><div><small>EXECUTIVE DECISION SCORE</small><strong>${item.decisionScore||'—'}</strong><span>out of 100</span></div><div><small>ESTIMATED ANNUAL IMPACT</small><strong>${money.format(item.impact)}</strong><span>${money.format(monthly)} per month</span></div><div><small>CONFIDENCE</small><strong>${item.confidence}%</strong><span>${escapeHtml(item.ease||'Medium')} effort · ${escapeHtml(item.timeToValue||'30–90 days')}</span></div></div><section class="report-section"><h3>Atlas executive summary</h3><p>${escapeHtml(item.why)}</p><div class="business-impact-grid"><div><small>FINANCIAL IMPACT</small><strong>${money.format(item.impact)}</strong><span>Modeled annual opportunity</span></div><div><small>TIME TO VALUE</small><strong>${escapeHtml(item.timeToValue||'30–90 days')}</strong><span>After executive approval</span></div><div><small>IMPLEMENTATION</small><strong>${escapeHtml(item.ease||'Medium')}</strong><span>Estimated effort</span></div></div></section><section class="report-section"><h3>Evidence reviewed</h3><ul class="evidence-list">${evidence}</ul></section><section class="report-section"><h3>Overnight investigation timeline</h3><ol class="investigation-timeline">${investigationTimeline(item)}</ol></section><section class="report-section"><h3>Next best action</h3><p>${escapeHtml(item.nextStep||'Review the supporting records, confirm the opportunity, and track realized savings.')}</p><div class="investigation-actions"><button class="primary-button fit" data-investigation-action="transactions" data-item-id="${item.id}">View supporting transactions</button><button class="demo-button fit" data-investigation-action="draft" data-item-id="${item.id}">Draft outreach email</button><button class="demo-button fit" data-investigation-action="reminder" data-item-id="${item.id}">Create follow-up</button><button class="text-button" data-investigation-action="export" data-item-id="${item.id}">Export investigation</button></div></section>${rows?`<section class="report-section"><h3>Supporting records</h3><div class="evidence-table-wrap"><table class="evidence-table"><thead><tr><th>Date</th><th>Vendor</th><th>Evidence</th><th>Amount</th></tr></thead><tbody>${rows}</tbody></table></div></section>`:''}`;
  document.querySelectorAll('[data-investigation-action]').forEach(btn=>btn.onclick=()=>handleInvestigationAction(btn.dataset.investigationAction,btn.dataset.itemId));
  dialog?.showModal();
}
function downloadText(filename,content){
  const blob=new Blob([content],{type:'text/plain;charset=utf-8'});
  const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=filename;document.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(url);
}
function handleInvestigationAction(actionName,itemId){
  const item=window.__atlasBrief?.priorities?.find(priority=>priority.id===itemId)||window.__atlasInvestigation;
  if(!item)return;
  if(actionName==='transactions'){
    document.querySelector('#intelligenceDialog')?.close();
    state.view='transactions';location.hash='transactions';renderApp();toast(`Showing records related to ${item.title}`);return;
  }
  if(actionName==='draft'){
    const subject=`SmartLedger follow-up: ${item.title}`;
    const body=`Subject: ${subject}\n\nHello,\n\nAtlas identified a financial improvement opportunity related to ${item.title.toLowerCase()}. The modeled annual impact is ${money.format(item.impact)} with ${item.confidence}% confidence.\n\nKey finding: ${item.why}\n\nRequested next step: ${item.nextStep}\n\nPlease provide the information or options needed for us to review this opportunity.\n\nThank you.`;
    downloadText(`Atlas-${item.id}-outreach.txt`,body);toast('Draft outreach email downloaded');return;
  }
  if(actionName==='reminder'){
    const reminders=JSON.parse(localStorage.getItem('atlas-follow-ups')||'[]');
    reminders.push({id:crypto.randomUUID(),itemId:item.id,title:item.title,dueAt:new Date(Date.now()+7*86400000).toISOString(),createdAt:new Date().toISOString()});
    localStorage.setItem('atlas-follow-ups',JSON.stringify(reminders));toast('Follow-up created for 7 days from now');return;
  }
  if(actionName==='export'){
    const evidence=(item.evidence||[]).map(x=>`- ${x}`).join('\n');
    const content=`ATLAS 18 EXECUTIVE INVESTIGATION\n\n${item.title}\nDecision Score: ${item.decisionScore||'—'}/100\nConfidence: ${item.confidence}%\nEstimated annual impact: ${money.format(item.impact)}\nTime to value: ${item.timeToValue||'30–90 days'}\nImplementation effort: ${item.ease||'Medium'}\n\nATLAS REASONING\n${item.why}\n\nEVIDENCE\n${evidence}\n\nNEXT BEST ACTION\n${item.nextStep}`;
    downloadText(`Atlas-Investigation-${item.id}.txt`,content);toast('Investigation exported');
  }
}

async function loadFile(file){if(!file)return;if(!file.name.toLowerCase().endsWith('.csv'))return toast('Please choose a CSV file');if(file.size>10*1024*1024)return toast('CSV is larger than 10 MB');const raw=parseCsv(await file.text());if(!raw.rows.length)return toast('No transaction rows found');state.file=file;state.raw=raw;state.mapping=detectMapping(raw.headers);state.step=2;renderApp()}
function useSample(){const text=`Date,Description,Vendor,Debit,Credit,Category,Balance\n07/01/2026,Adobe Creative Cloud,ADOBE,64.99,,Software,18435.01\n07/02/2026,Customer payment,ACME CLIENT,,4250.00,Income,22685.01\n07/03/2026,Fuel purchase,SHELL 0421,186.42,,Fuel,22498.59\n07/03/2026,Fuel purchase,SHELL 0421,186.42,,Fuel,22312.17\n07/05/2026,Office supplies,AMZN MKTPLACE,242.18,,Office Supplies,22069.99\n07/06/2026,Electric utility,CITY ELECTRIC,584.10,,Utilities,21485.89\n07/08/2026,Payroll processing,GUSTO,8450.00,,Payroll,13035.89\n07/09/2026,Consulting revenue,NORTHSTAR LLC,,6200.00,Income,19235.89`;state.file={name:'sample-transactions.csv',size:text.length};state.raw=parseCsv(text);state.mapping=detectMapping(state.raw.headers);state.step=2;renderApp()}
function action(name){if(name==='reset-demo'){seedDemoWorkspace(true);localStorage.removeItem('atlas-conversation');renderApp();return}if(name==='presentation'){state.presentation=!state.presentation;localStorage.setItem('atlas-presentation',String(state.presentation));renderApp();return}if(name==='open-report'){document.querySelector('#ceoReportDialog')?.showModal();return}if(name==='sample')return useSample();if(name==='new-import'){state.view='imports';state.step=1;renderApp();return}if(name==='back'){state.step=Math.max(1,state.step-1);renderApp();return}if(name==='validate'){if(!state.mapping.date||!state.mapping.description||!state.mapping.amount)return toast('Map date, description, and amount');state.validation=validateTransactions(normalizeTransactions(state.raw.rows,state.mapping));state.step=3;renderApp();return}if(name==='preview'){state.step=4;renderApp();return}if(name==='commit'){const valid=state.validation.rows.filter(x=>x.valid);const s=state.validation.summary;saveImport({id:crypto.randomUUID(),filename:state.file?.name||'statement.csv',createdAt:new Date().toISOString(),rows:valid.length,validRate:Math.round((s.valid/s.total)*100),debits:s.debits,credits:s.credits},valid);state.step=5;renderApp();return}if(name==='another'){state.step=1;state.file=null;state.raw=null;state.mapping={};state.validation=null;renderApp();return}if(name==='view-history'){state.view='history';renderApp();return}if(name==='clear'){clearImports();renderApp();toast('Demo import data cleared');return}if(name==='save')toast('Import settings saved')}

if(state.user&&isDemoWorkspace())seedDemoWorkspace();
state.user?renderApp():authScreen();
