import { ArrowRight, Bot, Sparkles } from "lucide-react";

export default function AtlasCFO() {
  return (
    <section className="panel cfo-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">DAILY BRIEFING</p>
          <h2>Atlas CFO</h2>
        </div>
        <span className="ai-badge"><Sparkles size={14} /> AI powered</span>
      </div>

      <div className="cfo-message">
        <div className="cfo-avatar"><Bot size={24} /></div>
        <div>
          <h3>Your business is financially healthy.</h3>
          <p>
            I found <strong>3 high-priority opportunities</strong> worth an estimated
            <strong> $6,194 annually</strong>. Your best next move is reducing payment
            processing fees.
          </p>
        </div>
      </div>

      <div className="briefing-grid">
        <div><span>Yesterday’s spending</span><strong>$8,274</strong></div>
        <div><span>Cash flow status</span><strong className="success-text">Healthy</strong></div>
        <div><span>Health score change</span><strong>+3 points</strong></div>
      </div>

      <button className="primary-button">
        Open full briefing <ArrowRight size={17} />
      </button>
    </section>
  );
}
