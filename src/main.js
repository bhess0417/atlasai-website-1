import './style.css';

const features = [
  { icon: '↗', title: 'Opportunity Radar', text: 'Continuously surfaces practical ways to reduce waste, improve margins, and uncover hidden growth opportunities.' },
  { icon: '◎', title: 'Financial Intelligence', text: 'Turns transactions and business activity into clear explanations, forecasts, and next-step recommendations.' },
  { icon: '⚡', title: 'Workflow Automation', text: 'Eliminates repetitive work so owners can move faster with less administrative drag.' }
];

const products = [
  { tag: 'FLAGSHIP PLATFORM', title: 'SmartLedger AI', text: 'A financial intelligence platform designed to help small businesses understand spending, monitor risk, and act on savings opportunities.', stats: ['Expense intelligence', 'Cash-flow forecasting', 'Vendor analysis'] },
  { tag: 'CONSUMER AI', title: "What's for Dinner?", text: 'A personalized meal-planning experience built around budget, time, pantry ingredients, and household preferences.', stats: ['Budget-friendly ideas', 'Pantry matching', 'Personalized planning'] },
  { tag: 'CUSTOM SOLUTIONS', title: 'Atlas AI Studio', text: 'Purpose-built AI systems and automations for companies ready to improve a high-value workflow.', stats: ['Workflow discovery', 'Rapid prototyping', 'Scalable delivery'] }
];

const app = document.querySelector('#app');
app.innerHTML = `
  <header class="site-header">
    <a class="brand" href="#top" aria-label="Atlas AI home"><span class="brand-mark"><span></span></span><span>ATLAS AI</span></a>
    <nav class="desktop-nav" aria-label="Primary navigation"><a href="#solutions">Solutions</a><a href="#products">Products</a><a href="#about">About</a></nav>
    <a class="button button-small button-outline" href="#contact">Start a conversation</a>
  </header>

  <main id="top">
    <section class="hero section">
      <div class="hero-glow hero-glow-one"></div><div class="hero-glow hero-glow-two"></div>
      <div class="hero-content reveal">
        <p class="eyebrow">AI THAT WORKS FOR BUSINESS</p>
        <h1>Practical intelligence.<br><span>Powerful results.</span></h1>
        <p class="hero-copy">Atlas AI creates simple, intelligent tools that help small businesses save time, find opportunities, and make better decisions.</p>
        <div class="hero-actions"><a class="button button-primary" href="#products">Explore our solutions</a><a class="button button-ghost" href="#contact">Book a conversation</a></div>
        <div class="trust-row"><span>Built for small business</span><span>Human-centered AI</span><span>Designed in the USA</span></div>
      </div>

      <div class="hero-visual reveal delay-1" aria-label="SmartLedger AI interface preview">
        <div class="dashboard-shell">
          <div class="dashboard-topbar"><div class="mini-brand"><span></span> ATLAS INTELLIGENCE</div><span class="live-pill">LIVE</span></div>
          <div class="dashboard-body">
            <div class="metric-card featured-metric"><span>Potential monthly savings</span><strong>$2,840</strong><small>12 opportunities identified</small></div>
            <div class="chart-card"><div class="chart-title"><span>Opportunity impact</span><small>Last 6 months</small></div><div class="bars"><i style="height:32%"></i><i style="height:46%"></i><i style="height:42%"></i><i style="height:61%"></i><i style="height:55%"></i><i style="height:78%"></i></div></div>
            <div class="insight-card"><span class="insight-icon">AI</span><p><strong>New insight</strong><br>Three recurring expenses may be reduced or eliminated this month.</p></div>
          </div>
        </div>
      </div>
    </section>

    <section class="signal-strip"><span>FINANCIAL INTELLIGENCE</span><span>OPPORTUNITY DISCOVERY</span><span>SMART AUTOMATION</span><span>DECISION SUPPORT</span></section>

    <section id="solutions" class="section solutions-section">
      <div class="section-heading reveal"><p class="eyebrow">BUILT FOR REAL-WORLD RESULTS</p><h2>AI should make business<br><span>simpler, not harder.</span></h2><p>We focus on practical tools with clear value: less busywork, stronger visibility, and better decisions.</p></div>
      <div class="feature-grid">${features.map((f,i)=>`<article class="feature-card reveal delay-${i+1}"><div class="feature-icon">${f.icon}</div><h3>${f.title}</h3><p>${f.text}</p><span class="card-link">Explore capability <b>→</b></span></article>`).join('')}</div>
    </section>

    <section id="products" class="products-section">
      <div class="section-heading split-heading reveal"><div><p class="eyebrow">THE ATLAS AI PORTFOLIO</p><h2>Products designed to<br><span>move people forward.</span></h2></div><p>Our portfolio combines business intelligence, consumer utility, and custom AI systems under one trusted brand.</p></div>
      <div class="product-stack">${products.map((p,i)=>`<article class="product-card reveal"><div class="product-number">0${i+1}</div><div class="product-content"><p class="product-tag">${p.tag}</p><h3>${p.title}</h3><p>${p.text}</p></div><div class="product-points">${p.stats.map(s=>`<span>${s}</span>`).join('')}</div><div class="product-arrow">↗</div></article>`).join('')}</div>
    </section>

    <section id="about" class="section about-section"><div class="about-panel reveal"><div class="about-copy"><p class="eyebrow">OUR MISSION</p><h2>Enterprise-level intelligence.<br><span>Accessible to every business.</span></h2><p>Atlas AI exists to close the gap between powerful technology and the people who need it most. We build clear, useful systems that help small businesses operate with more confidence.</p></div><div class="about-values"><div><strong>01</strong><span>Practical by design</span></div><div><strong>02</strong><span>Built around people</span></div><div><strong>03</strong><span>Focused on outcomes</span></div></div></div></section>

    <section id="contact" class="section contact-section"><div class="contact-panel reveal"><div><p class="eyebrow">START A CONVERSATION</p><h2>Ready to discover what AI<br><span>can do for your business?</span></h2><p>Tell us what is slowing your business down. We will help identify where practical AI can create the greatest value.</p></div><a class="button button-primary button-large" href="mailto:hello@atlasaiusa.com?subject=Atlas%20AI%20Conversation">Contact Atlas AI <span>→</span></a></div></section>
  </main>

  <footer class="site-footer"><a class="brand" href="#top"><span class="brand-mark"><span></span></span><span>ATLAS AI</span></a><p>Practical intelligence for real businesses.</p><div class="footer-links"><a href="#solutions">Solutions</a><a href="#products">Products</a><a href="#about">About</a><a href="mailto:hello@atlasaiusa.com">Contact</a></div><p class="copyright">© ${new Date().getFullYear()} Atlas AI, LLC. All rights reserved.</p></footer>
`;

const observer = new IntersectionObserver((entries) => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
window.addEventListener('scroll', () => document.querySelector('.site-header')?.classList.toggle('scrolled', window.scrollY > 16));
