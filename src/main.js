import './style.css';

document.querySelector('#app').innerHTML = `
  <header class="site-header">
    <a class="brand" href="#top" aria-label="Atlas AI home">
      <span class="brand-mark">A</span>
      <span>ATLAS AI</span>
    </a>
    <nav>
      <a href="#solutions">Solutions</a>
      <a href="#about">About</a>
      <a class="nav-cta" href="mailto:hello@atlasaiusa.com">Contact</a>
    </nav>
  </header>

  <main id="top">
    <section class="hero">
      <div class="hero-copy">
        <p class="eyebrow">AI THAT WORKS FOR BUSINESS</p>
        <h1>Practical intelligence.<br><span>Powerful results.</span></h1>
        <p class="hero-text">Atlas AI creates simple, intelligent tools that help small businesses save time, find opportunities, and make better decisions.</p>
        <div class="hero-actions">
          <a class="button primary" href="#solutions">Explore our solutions</a>
          <a class="button secondary" href="mailto:hello@atlasaiusa.com">Start a conversation</a>
        </div>
      </div>
      <div class="hero-card" aria-label="Atlas AI dashboard preview">
        <div class="card-top"><span>ATLAS INTELLIGENCE</span><span class="status">LIVE</span></div>
        <div class="metric"><small>Potential monthly savings</small><strong>$2,840</strong><span>12 opportunities identified</span></div>
        <div class="bars"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
        <div class="insight"><b>AI Insight</b><p>Three recurring expenses may be reduced or eliminated this month.</p></div>
      </div>
    </section>

    <section class="trust-strip">
      <span>BUILT FOR SMALL BUSINESS</span><span>AUTOMATED INSIGHTS</span><span>CLEAR ACTIONS</span><span>SECURE BY DESIGN</span>
    </section>

    <section id="solutions" class="section">
      <p class="eyebrow">OUR SOLUTIONS</p>
      <h2>Smarter tools. Simpler decisions.</h2>
      <div class="grid">
        <article class="feature featured">
          <div class="icon">SL</div>
          <p class="label">FLAGSHIP PLATFORM</p>
          <h3>SmartLedger AI</h3>
          <p>An intelligent financial monitoring platform designed to uncover waste, flag unusual activity, and identify savings opportunities.</p>
          <ul><li>Expense monitoring</li><li>Opportunity detection</li><li>Actionable business insights</li></ul>
        </article>
        <article class="feature">
          <div class="icon">OR</div>
          <p class="label">DISCOVERY ENGINE</p>
          <h3>Opportunity Radar</h3>
          <p>AI-powered monitoring that helps businesses discover new leads, grants, contracts, and growth opportunities.</p>
        </article>
        <article class="feature">
          <div class="icon">AI</div>
          <p class="label">CUSTOM AUTOMATION</p>
          <h3>Atlas AI Services</h3>
          <p>Custom AI workflows that reduce repetitive work and give teams more time to focus on customers and growth.</p>
        </article>
      </div>
    </section>

    <section id="about" class="section split">
      <div>
        <p class="eyebrow">WHY ATLAS AI</p>
        <h2>Technology should make business easier.</h2>
      </div>
      <div class="about-copy">
        <p>We build focused AI products around real business problems—not hype. Every Atlas AI solution is designed to be understandable, useful, and ready to act on.</p>
        <div class="mini-grid"><div><strong>Simple</strong><span>Clear tools without unnecessary complexity.</span></div><div><strong>Practical</strong><span>Solutions built around measurable business value.</span></div><div><strong>Ambitious</strong><span>Technology designed to grow with your company.</span></div></div>
      </div>
    </section>

    <section class="cta">
      <p class="eyebrow">BUILD THE FUTURE WITH US</p>
      <h2>Ready to put AI to work?</h2>
      <p>Let’s explore where intelligent automation can save time, reduce costs, and create new opportunities.</p>
      <a class="button light" href="mailto:hello@atlasaiusa.com">Contact Atlas AI</a>
    </section>
  </main>

  <footer><div class="brand"><span class="brand-mark">A</span><span>ATLAS AI</span></div><p>Atlas AI, LLC · Practical intelligence for modern business.</p><p>© ${new Date().getFullYear()} Atlas AI, LLC</p></footer>
`;
