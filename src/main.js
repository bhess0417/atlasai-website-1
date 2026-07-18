import './style.css';

const app = document.querySelector('#app');

app.innerHTML = `
  <header class="nav-shell">
    <nav class="nav container">
      <a class="brand" href="#top" aria-label="Atlas AI home">
        <span class="brand-mark">A</span>
        <span>Atlas AI</span>
      </a>
      <div class="nav-links">
        <a href="#features">Features</a>
        <a href="#how-it-works">How it works</a>
        <a href="#contact">Contact</a>
      </div>
      <a class="button button-small" href="#contact">Join the beta</a>
    </nav>
  </header>

  <main id="top">
    <section class="hero container">
      <div class="hero-copy">
        <p class="eyebrow">Financial intelligence for small business</p>
        <h1>See where your money goes. Find where it can work harder.</h1>
        <p class="hero-text">Atlas AI is your always-on financial copilot—monitoring spending, identifying savings opportunities, and turning complex financial data into clear next steps.</p>
        <div class="hero-actions">
          <a class="button" href="#contact">Request early access</a>
          <a class="text-link" href="#features">Explore the platform →</a>
        </div>
        <div class="trust-row">
          <span>Built for owners</span>
          <span>Automated insights</span>
          <span>Clear action plans</span>
        </div>
      </div>

      <div class="dashboard-card" aria-label="Atlas AI dashboard preview">
        <div class="dashboard-top">
          <div>
            <span class="muted">Monthly overview</span>
            <strong>$18,420</strong>
          </div>
          <span class="status">Live</span>
        </div>
        <div class="metric-grid">
          <article>
            <span class="muted">Savings found</span>
            <strong>$1,860</strong>
            <small>Across 6 opportunities</small>
          </article>
          <article>
            <span class="muted">Cash runway</span>
            <strong>8.4 mo</strong>
            <small>Up 1.2 months</small>
          </article>
        </div>
        <div class="insight-card">
          <div class="insight-icon">✦</div>
          <div>
            <strong>Atlas insight</strong>
            <p>You could save approximately $420 monthly by consolidating three overlapping software subscriptions.</p>
          </div>
        </div>
        <div class="bar-chart" aria-hidden="true">
          <span style="height:38%"></span><span style="height:54%"></span><span style="height:46%"></span><span style="height:72%"></span><span style="height:61%"></span><span style="height:84%"></span><span style="height:68%"></span>
        </div>
      </div>
    </section>

    <section id="features" class="section container">
      <div class="section-heading">
        <p class="eyebrow">What Atlas AI does</p>
        <h2>Practical financial clarity, without the busywork.</h2>
      </div>
      <div class="feature-grid">
        <article class="feature-card"><span>01</span><h3>Monitor spending</h3><p>Track business expenses and surface unusual patterns before they become costly.</p></article>
        <article class="feature-card"><span>02</span><h3>Find savings</h3><p>Identify duplicate tools, rising subscriptions, avoidable fees, and negotiation opportunities.</p></article>
        <article class="feature-card"><span>03</span><h3>Explain the numbers</h3><p>Turn financial data into plain-language answers and prioritized recommendations.</p></article>
      </div>
    </section>

    <section id="how-it-works" class="section container split-section">
      <div>
        <p class="eyebrow">How it works</p>
        <h2>Connect. Analyze. Act.</h2>
      </div>
      <div class="steps">
        <article><strong>1</strong><div><h3>Connect your accounts</h3><p>Securely bring your financial activity into one unified view.</p></div></article>
        <article><strong>2</strong><div><h3>Atlas reviews the patterns</h3><p>The platform organizes transactions and looks for savings, risks, and trends.</p></div></article>
        <article><strong>3</strong><div><h3>Get clear recommendations</h3><p>Receive a focused action list showing what matters and what to do next.</p></div></article>
      </div>
    </section>

    <section id="contact" class="cta container">
      <div>
        <p class="eyebrow">Atlas AI beta</p>
        <h2>Build a stronger business with smarter financial visibility.</h2>
      </div>
      <a class="button" href="mailto:hello@atlasaiusa.com?subject=Atlas%20AI%20Beta%20Access">Contact Atlas AI</a>
    </section>
  </main>

  <footer class="footer container">
    <span>© <span id="year"></span> Atlas AI, LLC</span>
    <span>AtlasAIUSA.com</span>
  </footer>
`;

document.querySelector('#year').textContent = new Date().getFullYear();
