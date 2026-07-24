
import './style.css';

const app = document.querySelector('#app');

app.innerHTML = `
<header class="nav">
  <a class="logo" href="#top"><span class="logo-mark"></span><span>ATLAS AI</span></a>
  <nav>
    <a href="#solutions">Solutions</a>
    <a href="#products">Products</a>
    <a href="#mission">Mission</a>
  </nav>
  <a class="btn btn-outline" href="#contact">Start a conversation</a>
</header>

<main id="top">
  <section class="hero shell">
    <div class="orb orb-a"></div>
    <div class="orb orb-b"></div>

    <div class="hero-copy reveal">
      <p class="kicker">AI THAT WORKS FOR BUSINESS</p>
      <h1>Practical intelligence.<br><span>Powerful results.</span></h1>
      <p class="lead">
        Atlas AI creates clear, useful tools that help small businesses save time,
        uncover opportunities, and make better decisions.
      </p>
      <div class="actions">
        <a class="btn btn-primary" href="#products">Explore our solutions</a>
        <a class="btn btn-secondary" href="#contact">Book a conversation</a>
      </div>
      <div class="trust">
        <span>Built for small business</span>
        <span>Human-centered AI</span>
        <span>Designed in the USA</span>
      </div>
    </div>

    <div class="dashboard reveal delay-1">
      <div class="dash-head">
        <span>ATLAS INTELLIGENCE</span>
        <span class="status">LIVE</span>
      </div>
      <div class="dash-grid">
        <div class="metric">
          <small>Potential monthly savings</small>
          <strong>$2,840</strong>
          <span>12 opportunities identified</span>
        </div>
        <div class="chart">
          <div class="chart-label"><span>Opportunity impact</span><small>6 months</small></div>
          <div class="bars">
            <i style="height:33%"></i><i style="height:47%"></i><i style="height:41%"></i>
            <i style="height:62%"></i><i style="height:56%"></i><i style="height:79%"></i>
          </div>
        </div>
        <div class="insight">
          <b>AI</b>
          <p><strong>New insight</strong><br>Three recurring expenses may be reduced this month.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="ticker">
    <span>FINANCIAL INTELLIGENCE</span>
    <span>OPPORTUNITY DISCOVERY</span>
    <span>SMART AUTOMATION</span>
    <span>DECISION SUPPORT</span>
  </section>

  <section id="solutions" class="section shell">
    <div class="section-heading reveal">
      <p class="kicker">BUILT FOR REAL-WORLD RESULTS</p>
      <h2>AI should make business<br><span>simpler, not harder.</span></h2>
      <p>We focus on practical tools with measurable value: less busywork, stronger visibility, and better decisions.</p>
    </div>
    <div class="cards">
      <article class="card reveal">
        <div class="icon">↗</div>
        <h3>Opportunity Radar</h3>
        <p>Surfaces practical ways to reduce waste, improve margins, and uncover growth opportunities.</p>
        <a href="#products">Explore capability →</a>
      </article>
      <article class="card reveal delay-1">
        <div class="icon">◎</div>
        <h3>Financial Intelligence</h3>
        <p>Turns business activity into clear explanations, forecasts, and next-step recommendations.</p>
        <a href="#products">Explore capability →</a>
      </article>
      <article class="card reveal delay-2">
        <div class="icon">⚡</div>
        <h3>Workflow Automation</h3>
        <p>Eliminates repetitive work so owners can move faster with less administrative drag.</p>
        <a href="#products">Explore capability →</a>
      </article>
    </div>
  </section>

  <section id="products" class="products">
    <div class="shell">
      <div class="section-heading split reveal">
        <div>
          <p class="kicker">THE ATLAS AI PORTFOLIO</p>
          <h2>Products designed to<br><span>move people forward.</span></h2>
        </div>
        <p>Business intelligence, consumer utility, and custom AI systems under one trusted brand.</p>
      </div>

      <div class="product-list">
        <article class="product reveal">
          <div class="num">01</div>
          <div>
            <p class="tag">FLAGSHIP PLATFORM</p>
            <h3>SmartLedger AI</h3>
            <p>A financial intelligence platform that helps small businesses understand spending, monitor risk, and act on savings opportunities.</p>
          </div>
          <div class="points">
            <span>Expense intelligence</span>
            <span>Cash-flow forecasting</span>
            <span>Vendor analysis</span>
          </div>
          <div class="arrow">↗</div>
        </article>

        <article class="product reveal">
          <div class="num">02</div>
          <div>
            <p class="tag">CONSUMER AI</p>
            <h3>What's for Dinner?</h3>
            <p>A personalized meal-planning experience built around budget, time, pantry ingredients, and household preferences.</p>
          </div>
          <div class="points">
            <span>Budget-friendly ideas</span>
            <span>Pantry matching</span>
            <span>Personalized planning</span>
          </div>
          <div class="arrow">↗</div>
        </article>

        <article class="product reveal">
          <div class="num">03</div>
          <div>
            <p class="tag">CUSTOM SOLUTIONS</p>
            <h3>Atlas AI Studio</h3>
            <p>Purpose-built AI systems and automations for companies ready to improve a high-value workflow.</p>
          </div>
          <div class="points">
            <span>Workflow discovery</span>
            <span>Rapid prototyping</span>
            <span>Scalable delivery</span>
          </div>
          <div class="arrow">↗</div>
        </article>
      </div>
    </div>
  </section>

  <section id="mission" class="section shell">
    <div class="mission reveal">
      <div>
        <p class="kicker">OUR MISSION</p>
        <h2>Enterprise-level intelligence.<br><span>Accessible to every business.</span></h2>
        <p>Atlas AI exists to close the gap between powerful technology and the people who need it most. We build clear, useful systems that help small businesses operate with confidence.</p>
      </div>
      <div class="values">
        <div><b>01</b><span>Practical by design</span></div>
        <div><b>02</b><span>Built around people</span></div>
        <div><b>03</b><span>Focused on outcomes</span></div>
      </div>
    </div>
  </section>

  <section id="contact" class="section shell contact">
    <div class="contact-box reveal">
      <div>
        <p class="kicker">START A CONVERSATION</p>
        <h2>Ready to discover what AI<br><span>can do for your business?</span></h2>
        <p>Tell us what is slowing your business down. We will help identify where practical AI can create the greatest value.</p>
      </div>
      <a class="btn btn-primary btn-large" href="mailto:hello@atlasaiusa.com?subject=Atlas%20AI%20Conversation">Contact Atlas AI →</a>
    </div>
  </section>
</main>

<footer class="footer shell">
  <a class="logo" href="#top"><span class="logo-mark"></span><span>ATLAS AI</span></a>
  <p>Practical intelligence for real businesses.</p>
  <div class="footer-links">
    <a href="#solutions">Solutions</a>
    <a href="#products">Products</a>
    <a href="#mission">Mission</a>
    <a href="mailto:hello@atlasaiusa.com">Contact</a>
  </div>
  <small>© ${new Date().getFullYear()} Atlas AI, LLC. All rights reserved.</small>
</footer>
`;

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

window.addEventListener('scroll', () => {
  document.querySelector('.nav')?.classList.toggle('scrolled', window.scrollY > 12);
});
