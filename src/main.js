import "./style.css";

document.querySelector("#app").innerHTML = `
  <header class="site-header">
    <a class="brand" href="#">
      <span class="brand-mark">A</span>
      <span>Atlas AI</span>
    </a>

    <nav>
      <a href="#features">Features</a>
      <a href="#how-it-works">How it works</a>
      <a href="#contact">Contact</a>
    </nav>

    <a class="primary-button small-button" href="#beta">
      Join the beta
    </a>
  </header>

  <main>
    <section class="hero">
      <div class="hero-copy">
        <p class="eyebrow">FINANCIAL INTELLIGENCE FOR SMALL BUSINESS</p>

        <h1>
          See where your money goes.<br />
          Find where it can work harder.
        </h1>

        <p class="hero-description">
          Atlas AI is your always-on financial copilot—monitoring spending,
          identifying savings opportunities, and turning complex financial
          data into clear next steps.
        </p>

        <div class="hero-actions">
          <a class="primary-button" href="#beta">Join the beta</a>
          <a class="secondary-button" href="#features">Explore features</a>
        </div>
      </div>

      <div class="dashboard-card">
        <div class="dashboard-heading">
          <div>
            <span>Monthly overview</span>
            <strong>$18,420</strong>
          </div>
          <span class="live-badge">Live</span>
        </div>

        <div class="dashboard-stats">
          <div class="stat-card">
            <span>Savings found</span>
            <strong>$1,860</strong>
            <small>Across 6 opportunities</small>
          </div>

          <div class="stat-card">
            <span>Cash runway</span>
            <strong>8.4 mo</strong>
            <small>Up 1.2 months</small>
          </div>
        </div>

        <div class="insight-card">
          <div class="insight-icon">✦</div>
          <div>
            <strong>Atlas insight</strong>
            <p>
              You could save approximately $420 monthly by consolidating
              three overlapping software subscriptions.
            </p>
          </div>
        </div>

        <div class="chart" aria-label="Sample financial chart">
          <span style="height: 28%"></span>
          <span style="height: 50%"></span>
          <span style="height: 36%"></span>
          <span style="height: 72%"></span>
          <span style="height: 55%"></span>
          <span style="height: 88%"></span>
          <span style="height: 67%"></span>
        </div>
      </div>
    </section>

    <section id="features" class="content-section">
      <p class="eyebrow">SMARTER FINANCIAL DECISIONS</p>
      <h2>Know what deserves your attention.</h2>

      <div class="feature-grid">
        <article class="feature-card">
          <span class="feature-number">01</span>
          <h3>Spending monitoring</h3>
          <p>
            See where money is going and quickly identify unusual or
            unnecessary expenses.
          </p>
        </article>

        <article class="feature-card">
          <span class="feature-number">02</span>
          <h3>Savings opportunities</h3>
          <p>
            Discover subscriptions, vendor costs, and spending patterns that
            may be costing your business more than necessary.
          </p>
        </article>

        <article class="feature-card">
          <span class="feature-number">03</span>
          <h3>Clear AI insights</h3>
          <p>
            Turn financial information into practical recommendations you can
            understand and act on.
          </p>
        </article>
      </div>
    </section>

    <section id="how-it-works" class="content-section alternate-section">
      <p class="eyebrow">HOW IT WORKS</p>
      <h2>Financial clarity without the complexity.</h2>

      <div class="steps-grid">
        <article>
          <strong>Connect</strong>
          <p>Securely bring your business financial activity into one view.</p>
        </article>

        <article>
          <strong>Analyze</strong>
          <p>Atlas AI reviews spending, patterns, risks, and opportunities.</p>
        </article>

        <article>
          <strong>Act</strong>
          <p>Receive prioritized insights and clear recommended next steps.</p>
        </article>
      </div>m
    </section>

    <section id="beta" class="beta-section">
      <div class="beta-copy">
        <p class="eyebrow">EARLY ACCESS</p>
        <h2>Help shape the future of small-business financial intelligence.</h2>
        <p>
          Join the Atlas AI beta list for product updates and early-access
          opportunities.
        </p>
      </div>

      <form id="beta-form" class="beta-form">
        <label>
          Your name
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Jane Smith"
            required
          />
        </label>

        <label>
          Business email
          <input
            type="email"
            id="email"
            name="email"
            placeholder="jane@company.com"
            required
          />
        </label>

        <label>
          Company name
          <input
            type="text"
            id="company"
            name="company"
            placeholder="Your company"
          />
        </label>

        <label>
          Biggest financial challenge
          <textarea
            id="challenge"
            name="challenge"
            rows="4"
            placeholder="Tell us what you would like Atlas AI to help solve."
          ></textarea>
        </label>

        <button class="primary-button form-button" type="submit">
          Request beta access
        </button>

        <p id="form-message" class="form-message" aria-live="polite"></p>
      </form>
    </section>
  </main>

  <footer id="contact">
    <div>
      <strong>Atlas AI</strong>
      <p>Financial intelligence built for small businesses.</p>
    </div>

    <a href="mailto:info@atlasaiusa.com">info@atlasaiusa.com</a>
  </footer>
`;

const betaForm = document.querySelector("#beta-form");
const formMessage = document.querySelector("#form-message");

betaForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.querySelector("#name").value.trim();
  const email = document.querySelector("#email").value.trim();

  if (!name || !email) {
    formMessage.textContent = "Please enter your name and business email.";
    formMessage.className = "form-message error-message";
    return;
  }

  formMessage.textContent =
    `Thank you, ${name}! Your beta-access request has been received.`;

  formMessage.className = "form-message success-message";
  betaForm.reset();
});
