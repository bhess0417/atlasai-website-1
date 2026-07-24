
import React, { useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const icons = {
  dashboard: '⌂',
  radar: '◉',
  transactions: '↔',
  advisor: '✦',
  reports: '▤',
  automations: '⚡',
  settings: '⚙',
  search: '⌕',
  bell: '◌',
  chevron: '›',
  trendUp: '↗',
  trendDown: '↘',
}

const navItems = [
  ['dashboard', 'Dashboard'],
  ['radar', 'Opportunity Radar'],
  ['transactions', 'Transactions'],
  ['advisor', 'AI Advisor'],
  ['reports', 'Reports'],
  ['automations', 'Automations'],
  ['settings', 'Settings'],
]

const opportunities = [
  {
    id: 1,
    title: 'Merchant processing fees',
    category: 'Vendor savings',
    savings: '$218/mo',
    annual: '$2,616/year',
    confidence: 94,
    priority: 'High',
    description: 'Your effective processing rate is above similar businesses in your category.',
    action: 'Compare providers'
  },
  {
    id: 2,
    title: 'Duplicate software subscription',
    category: 'Subscription review',
    savings: '$47/mo',
    annual: '$564/year',
    confidence: 98,
    priority: 'High',
    description: 'Two active project-management subscriptions appear to overlap.',
    action: 'Review subscriptions'
  },
  {
    id: 3,
    title: 'Business insurance review',
    category: 'Policy optimization',
    savings: '$1,300/yr',
    annual: '$1,300/year',
    confidence: 82,
    priority: 'Medium',
    description: 'Your current premium has increased 18% since the last renewal.',
    action: 'Prepare review'
  },
  {
    id: 4,
    title: 'Internet service contract',
    category: 'Recurring expense',
    savings: '$71/mo',
    annual: '$852/year',
    confidence: 89,
    priority: 'Medium',
    description: 'Comparable business plans may reduce cost without lowering bandwidth.',
    action: 'Research options'
  },
]

const transactions = [
  ['Jul 24', 'Stripe', 'Payment processing', '-$1,284.12', 'Expense'],
  ['Jul 23', 'Client payment', 'Revenue', '+$8,400.00', 'Income'],
  ['Jul 22', 'Adobe', 'Software', '-$89.98', 'Expense'],
  ['Jul 21', 'Payroll', 'Payroll', '-$12,740.00', 'Expense'],
  ['Jul 20', 'Client payment', 'Revenue', '+$5,250.00', 'Income'],
  ['Jul 18', 'Verizon Business', 'Utilities', '-$192.44', 'Expense'],
]

const reports = [
  ['Monthly Financial Summary', 'July 2026', 'Ready'],
  ['Cash Flow Analysis', 'Q3 2026', 'Ready'],
  ['Savings Opportunity Report', 'July 2026', 'Ready'],
  ['Tax Preparation Summary', '2026 YTD', 'Draft'],
]

function Sidebar({ active, setActive }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark"><span /></div>
        <div>
          <strong>SmartLedger</strong>
          <small>by Atlas AI</small>
        </div>
      </div>

      <nav className="side-nav">
        <p className="nav-label">WORKSPACE</p>
        {navItems.map(([id, label]) => (
          <button
            key={id}
            className={active === id ? 'active' : ''}
            onClick={() => setActive(id)}
          >
            <span className="nav-icon">{icons[id]}</span>
            <span>{label}</span>
            {id === 'radar' && <em>4</em>}
          </button>
        ))}
      </nav>

      <div className="sidebar-card">
        <span>SMARTLEDGER BETA 0.2</span>
        <strong>Financial clarity, every day.</strong>
        <p>Connected accounts are using demonstration data.</p>
      </div>

      <div className="profile-mini">
        <div className="avatar">BH</div>
        <div>
          <strong>Brian Hess</strong>
          <small>Atlas AI, LLC</small>
        </div>
        <span>⋮</span>
      </div>
    </aside>
  )
}

function Topbar({ title, onSignOut, setActive }) {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <header className="topbar">
      <div><span className="eyebrow">SMARTLEDGER AI</span><h1>{title}</h1></div>
      <div className="top-actions">
        <label className="search"><span>{icons.search}</span><input placeholder="Search anything..." /><kbd>⌘ K</kbd></label>
        <button className="circle-button">{icons.bell}<i /></button>
        <div className="account-wrap">
          <button className="account-button" onClick={() => setMenuOpen(!menuOpen)}><div className="avatar small">BH</div><span>Brian</span><b>⌄</b></button>
          {menuOpen && <div className="account-menu">
            <button onClick={() => { setActive('settings'); setMenuOpen(false) }}>My Profile</button>
            <button onClick={() => { setActive('settings'); setMenuOpen(false) }}>Account Settings</button>
            <button disabled>Billing <span>Coming soon</span></button><hr />
            <button className="signout" onClick={onSignOut}>Sign Out</button>
          </div>}
        </div>
      </div>
    </header>
  )
}

function Metric({ label, value, delta, positive = true, detail }) {
  return (
    <article className="metric-card">
      <div className="metric-head">
        <span>{label}</span>
        <button>•••</button>
      </div>
      <strong>{value}</strong>
      <div className={`delta ${positive ? 'positive' : 'negative'}`}>
        <span>{positive ? icons.trendUp : icons.trendDown} {delta}</span>
        <small>{detail}</small>
      </div>
    </article>
  )
}

function LineChart() {
  return (
    <div className="chart-wrap">
      <div className="chart-grid">
        {[0,1,2,3].map(i => <span key={i} />)}
      </div>
      <svg viewBox="0 0 700 260" role="img" aria-label="Revenue and expense trend chart">
        <defs>
          <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#59ddcb" stopOpacity=".28" />
            <stop offset="100%" stopColor="#59ddcb" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path className="area" d="M0 215 C70 185,95 200,145 165 S240 145,280 155 S375 120,420 92 S510 115,550 72 S645 74,700 35 L700 260 L0 260 Z" />
        <path className="revenue-line" d="M0 215 C70 185,95 200,145 165 S240 145,280 155 S375 120,420 92 S510 115,550 72 S645 74,700 35" />
        <path className="expense-line" d="M0 205 C70 215,110 180,155 190 S250 175,300 188 S395 150,445 170 S535 140,585 152 S650 125,700 138" />
      </svg>
      <div className="chart-labels">
        <span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span>
      </div>
    </div>
  )
}

function Dashboard({ setActive, openOpportunity }) {
  return (
    <>
      <section className="briefing">
        <div className="ai-badge">AI</div>
        <div>
          <span className="eyebrow">MORNING BRIEFING</span>
          <h2>Good morning, Brian.</h2>
          <p>Since your last visit, revenue increased 4.2%, one unusually large expense was detected, and three new savings opportunities were found. Cash flow remains healthy.</p><div className="briefing-total"><small>Estimated annual savings available</small><strong>$5,332</strong></div>
        </div>
        <button className="primary" onClick={() => setActive('advisor')}>Review Today’s Priorities <span>→</span></button>
      </section>

      <section className="metrics">
        <Metric label="Monthly revenue" value="$42,680" delta="6.2%" detail="vs. last month" />
        <Metric label="Monthly expenses" value="$28,940" delta="2.1%" positive={false} detail="vs. last month" />
        <Metric label="Net cash flow" value="$13,740" delta="15.8%" detail="vs. last month" />
        <Metric label="Net margin" value="32.2%" delta="3.4%" detail="vs. last month" />
      </section>

      <section className="dashboard-grid">
        <article className="panel chart-panel">
          <div className="panel-head">
            <div>
              <span className="eyebrow">FINANCIAL PERFORMANCE</span>
              <h3>Revenue & expenses</h3>
            </div>
            <div className="legend">
              <span><i className="rev-dot" />Revenue</span>
              <span><i className="exp-dot" />Expenses</span>
              <button>Last 6 months ⌄</button>
            </div>
          </div>
          <LineChart />
        </article>

        <article className="panel health-panel">
          <div className="panel-head">
            <div>
              <span className="eyebrow">BUSINESS HEALTH</span>
              <h3>Financial score</h3>
            </div>
            <button>•••</button>
          </div>
          <div className="score-ring">
            <div><strong>86</strong><span>Excellent</span></div>
          </div>
          <div className="health-list">
            <div><span>Cash flow stability</span><b>92</b></div>
            <div><span>Expense control</span><b>81</b></div>
            <div><span>Revenue momentum</span><b>88</b></div>
          </div>
        </article>
      </section>

      <section className="panel opportunities-panel">
        <div className="panel-head">
          <div>
            <span className="eyebrow">OPPORTUNITY RADAR</span>
            <h3>Recommended actions</h3>
          </div>
          <button className="text-button" onClick={() => setActive('radar')}>View all opportunities →</button>
        </div>
        <div className="opportunity-grid">
          {opportunities.slice(0,3).map(item => (
            <OpportunityCard key={item.id} item={item} onOpen={() => openOpportunity(item)} />
          ))}
        </div>
      </section>
    </>
  )
}

function OpportunityCard({ item, onOpen }) {
  return (
    <article className="opportunity-card">
      <div className="opp-top">
        <span className={`priority ${item.priority.toLowerCase()}`}>{item.priority}</span>
        <span className="confidence">{item.confidence}% confidence</span>
      </div>
      <div className="opp-icon">↗</div>
      <span className="eyebrow">{item.category}</span>
      <h4>{item.title}</h4>
      <p>{item.description}</p>
      <div className="saving">
        <small>Potential savings</small>
        <strong>{item.savings}</strong>
      </div>
      <button onClick={onOpen}>{item.action}<span>→</span></button>
    </article>
  )
}

function Radar({ openOpportunity }) {
  const [filter, setFilter] = useState('All')
  const filters = ['All', 'High priority', 'Recurring', 'Annual']
  const visible = useMemo(() => opportunities.filter(o => {
    if (filter === 'High priority') return o.priority === 'High'
    if (filter === 'Recurring') return o.savings.includes('/mo')
    if (filter === 'Annual') return o.savings.includes('/yr')
    return true
  }), [filter])

  return (
    <>
      <section className="page-intro">
        <div>
          <span className="eyebrow">4 ACTIVE OPPORTUNITIES</span>
          <h2>Estimated annual savings: <strong>$5,332</strong></h2>
          <p>SmartLedger continuously reviews your business activity for practical ways to save money and improve performance.</p>
        </div>
        <button className="primary">Run new analysis <span>↻</span></button>
      </section>
      <div className="filters">
        {filters.map(f => <button key={f} onClick={() => setFilter(f)} className={filter === f ? 'active' : ''}>{f}</button>)}
      </div>
      <section className="opportunity-grid large">
        {visible.map(item => <OpportunityCard key={item.id} item={item} onOpen={() => openOpportunity(item)} />)}
      </section>
    </>
  )
}

function Transactions() {
  return (
    <section className="panel table-panel">
      <div className="panel-head">
        <div>
          <span className="eyebrow">RECENT ACTIVITY</span>
          <h3>Transactions</h3>
        </div>
        <div className="table-actions"><button>Filter</button><button>Export</button></div>
      </div>
      <div className="table">
        <div className="table-row table-header">
          <span>Date</span><span>Description</span><span>Category</span><span>Amount</span><span>Type</span>
        </div>
        {transactions.map((row, index) => (
          <div className="table-row" key={index}>
            {row.map((cell, i) => <span key={i} className={i === 3 ? (cell.startsWith('+') ? 'income' : 'expense') : ''}>{cell}</span>)}
          </div>
        ))}
      </div>
    </section>
  )
}

function Advisor() {
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Good morning, Brian. I reviewed your latest activity. Revenue is trending upward, but merchant processing and software expenses deserve attention.' },
    { role: 'user', text: 'What should I focus on first?' },
    { role: 'ai', text: 'Start with merchant processing fees. It has the highest near-term impact and could save approximately $2,616 per year without changing daily operations.' },
  ])
  const [input, setInput] = useState('')

  const send = () => {
    const value = input.trim()
    if (!value) return
    setMessages([...messages, { role: 'user', text: value }, { role: 'ai', text: 'Based on the demonstration data, I would compare current vendor costs, confirm contract terms, and prioritize changes with no operational disruption.' }])
    setInput('')
  }

  return (
    <section className="advisor-layout">
      <article className="panel advisor-panel">
        <div className="panel-head">
          <div><span className="eyebrow">ATLAS INTELLIGENCE</span><h3>AI Advisor</h3></div>
          <span className="live-status">● Online</span>
        </div>
        <div className="messages">
          {messages.map((m, i) => (
            <div className={`message ${m.role}`} key={i}>
              <div className="avatar small">{m.role === 'ai' ? 'AI' : 'BH'}</div>
              <p>{m.text}</p>
            </div>
          ))}
        </div>
        <div className="composer">
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Review Today’s Priorities about your business..." />
          <button onClick={send}>Send ↑</button>
        </div>
      </article>
      <aside className="panel suggested-panel">
        <span className="eyebrow">SUGGESTED QUESTIONS</span>
        {[
          'Why did expenses increase?',
          'Where can I save money?',
          'Summarize this month',
          'What needs attention today?'
        ].map(q => <button key={q} onClick={() => setInput(q)}>{q}<span>→</span></button>)}
      </aside>
    </section>
  )
}

function Reports() {
  return (
    <section className="panel table-panel">
      <div className="panel-head">
        <div><span className="eyebrow">BUSINESS REPORTING</span><h3>Reports</h3></div>
        <button className="primary">Generate report +</button>
      </div>
      <div className="report-grid">
        {reports.map(([name, period, status]) => (
          <article className="report-card" key={name}>
            <div className="report-icon">▤</div>
            <div><h4>{name}</h4><p>{period}</p></div>
            <span className={status.toLowerCase()}>{status}</span>
            <button>Open →</button>
          </article>
        ))}
      </div>
    </section>
  )
}

function Automations() {
  const [enabled, setEnabled] = useState([true, true, false])
  const automations = [
    ['Weekly financial briefing', 'Every Monday at 8:00 AM'],
    ['Large expense alert', 'When an expense exceeds $2,500'],
    ['Vendor renewal reminder', '30 days before renewal'],
  ]
  return (
    <section className="panel automation-panel">
      <div className="panel-head">
        <div><span className="eyebrow">SMART WORKFLOWS</span><h3>Automations</h3></div>
        <button className="primary">Create automation +</button>
      </div>
      {automations.map((a, i) => (
        <div className="automation-row" key={a[0]}>
          <div className="automation-icon">⚡</div>
          <div><h4>{a[0]}</h4><p>{a[1]}</p></div>
          <button className={`toggle ${enabled[i] ? 'on' : ''}`} onClick={() => setEnabled(enabled.map((v, idx) => idx === i ? !v : v))}><span /></button>
        </div>
      ))}
    </section>
  )
}

function Settings() {
  return (
    <section className="settings-grid">
      <article className="panel settings-card">
        <span className="eyebrow">PROFILE</span>
        <h3>Business account</h3>
        <label>Business name<input defaultValue="Atlas AI, LLC" /></label>
        <label>Owner name<input defaultValue="Brian Hess" /></label>
        <label>Email<input defaultValue="hello@atlasaiusa.com" /></label>
        <button className="primary">Save changes</button>
      </article>
      <article className="panel settings-card">
        <span className="eyebrow">PREFERENCES</span>
        <h3>Notifications</h3>
        {['Opportunity alerts', 'Weekly financial briefing', 'Large transaction alerts'].map((x, i) => (
          <label className="check-row" key={x}><span>{x}</span><input type="checkbox" defaultChecked={i < 2} /></label>
        ))}
      </article>
    </section>
  )
}

function OpportunityModal({ item, onClose }) {
  if (!item) return null
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <article className="modal" onClick={e => e.stopPropagation()}>
        <button className="close" onClick={onClose}>×</button>
        <span className="eyebrow">{item.category}</span>
        <h2>{item.title}</h2>
        <p>{item.description}</p>
        <div className="modal-stats">
          <div><small>Estimated savings</small><strong>{item.annual}</strong></div>
          <div><small>Confidence</small><strong>{item.confidence}%</strong></div>
          <div><small>Priority</small><strong>{item.priority}</strong></div>
        </div>
        <div className="analysis-box">
          <span>SMARTLEDGER ANALYSIS</span>
          <p>This recommendation is based on simulated transaction patterns, recurring vendor charges, and estimated market benchmarks for comparable small businesses.</p>
        </div>
        <div className="modal-actions">
          <button className="secondary" onClick={onClose}>Remind me later</button>
          <button className="primary">{item.action} →</button>
        </div>
      </article>
    </div>
  )
}

function LoadingScreen() {
  return <div className="loading-screen"><div className="loading-brand"><div className="brand-mark"><span /></div><div><strong>SmartLedger AI</strong><small>by Atlas AI</small></div></div><div className="loading-line"><span /></div><p>Loading your workspace...</p></div>
}

function AuthScreen({ onAuthenticate }) {
  const [mode,setMode]=useState('signin'); const [email,setEmail]=useState('brian@atlasaiusa.com'); const [password,setPassword]=useState('smartledger'); const [name,setName]=useState('Brian Hess'); const [business,setBusiness]=useState('Atlas AI, LLC'); const [notice,setNotice]=useState('')
  const submit=e=>{e.preventDefault(); if(mode==='forgot'){setNotice('Password-reset instructions are ready to connect to the live authentication service.');return} if(!email||!password){setNotice('Please complete all required fields.');return} onAuthenticate({email,name,business})}
  return <div className="auth-shell">
    <section className="auth-visual"><div className="auth-brand"><div className="brand-mark"><span /></div><div><strong>SmartLedger</strong><small>by Atlas AI</small></div></div><div className="auth-message"><span className="eyebrow">FINANCIAL INTELLIGENCE FOR SMALL BUSINESS</span><h1>Clarity today.<br/>Better decisions tomorrow.</h1><p>SmartLedger watches the numbers, identifies opportunities, and helps business owners take action.</p><div className="auth-proof"><div><strong>$5,332</strong><span>Estimated annual savings</span></div><div><strong>86</strong><span>Financial health score</span></div></div></div><small className="auth-footer">SmartLedger AI Beta 0.2 · Atlas AI, LLC</small></section>
    <section className="auth-panel"><form className="auth-form" onSubmit={submit}><span className="eyebrow">{mode==='signup'?'CREATE YOUR WORKSPACE':mode==='forgot'?'ACCOUNT RECOVERY':'WELCOME BACK'}</span><h2>{mode==='signup'?'Create your account':mode==='forgot'?'Reset your password':'Sign in to SmartLedger'}</h2><p>{mode==='signup'?'Start your private SmartLedger workspace.':mode==='forgot'?'Enter your email to receive reset instructions.':'Access your business financial workspace.'}</p>
    {mode==='signup'&&<><label>Full name<input value={name} onChange={e=>setName(e.target.value)}/></label><label>Business name<input value={business} onChange={e=>setBusiness(e.target.value)}/></label></>}
    <label>Email address<input type="email" value={email} onChange={e=>setEmail(e.target.value)}/></label>{mode!=='forgot'&&<label>Password<input type="password" value={password} onChange={e=>setPassword(e.target.value)}/></label>}
    {mode==='signin'&&<div className="auth-options"><label className="remember"><input type="checkbox" defaultChecked/> Remember me</label><button type="button" onClick={()=>setMode('forgot')}>Forgot password?</button></div>}
    {notice&&<div className="auth-notice">{notice}</div>}<button className="primary auth-submit" type="submit">{mode==='signup'?'Create account':mode==='forgot'?'Send reset instructions':'Sign in securely'} <span>→</span></button>
    <div className="auth-switch">{mode==='signin'&&<>New to SmartLedger? <button type="button" onClick={()=>setMode('signup')}>Create an account</button></>}{mode==='signup'&&<>Already have an account? <button type="button" onClick={()=>setMode('signin')}>Sign in</button></>}{mode==='forgot'&&<button type="button" onClick={()=>setMode('signin')}>← Return to sign in</button>}</div><small className="demo-note">Beta demonstration: authentication is stored only in this browser until Supabase is connected.</small></form></section>
  </div>
}

function ProductApp({onSignOut}) {
  const [active,setActive]=useState('dashboard'); const [selectedOpportunity,setSelectedOpportunity]=useState(null)
  const titles={dashboard:'Dashboard',radar:'Opportunity Radar',transactions:'Transactions',advisor:'AI Advisor',reports:'Reports',automations:'Automations',settings:'Settings'}
  let content
  if(active==='dashboard') content=<Dashboard setActive={setActive} openOpportunity={setSelectedOpportunity}/>
  if(active==='radar') content=<Radar openOpportunity={setSelectedOpportunity}/>
  if(active==='transactions') content=<Transactions/>; if(active==='advisor') content=<Advisor/>; if(active==='reports') content=<Reports/>; if(active==='automations') content=<Automations/>; if(active==='settings') content=<Settings/>
  return <div className="app-shell"><Sidebar active={active} setActive={setActive}/><main className="main"><Topbar title={titles[active]} onSignOut={onSignOut} setActive={setActive}/><div className="content">{content}</div></main><OpportunityModal item={selectedOpportunity} onClose={()=>setSelectedOpportunity(null)}/></div>
}

function App(){
 const [session,setSession]=useState(()=>{try{return JSON.parse(localStorage.getItem('smartledger-session'))}catch{return null}}); const [loading,setLoading]=useState(Boolean(session))
 React.useEffect(()=>{if(!session)return; const t=setTimeout(()=>setLoading(false),1200); return()=>clearTimeout(t)},[session])
 const authenticate=user=>{localStorage.setItem('smartledger-session',JSON.stringify(user));setSession(user);setLoading(true)}
 const signOut=()=>{localStorage.removeItem('smartledger-session');setSession(null);setLoading(false)}
 if(!session)return <AuthScreen onAuthenticate={authenticate}/>; if(loading)return <LoadingScreen/>; return <ProductApp onSignOut={signOut}/>
}
createRoot(document.getElementById('root')).render(<App />)
