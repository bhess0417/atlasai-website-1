import { useEffect } from "react";
import { ArrowRight, Bot, CheckCircle2, Sparkles, X } from "lucide-react";

export default function AtlasCFO({ expanded, onOpen, onClose }) {
  useEffect(() => {
    if (!expanded) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.classList.add("modal-open");
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("modal-open");
    };
  }, [expanded, onClose]);

  return (
    <>
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

        <button className="primary-button" onClick={onOpen}>
          Open full briefing <ArrowRight size={17} />
        </button>
      </section>

      {expanded && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
          <section className="report-modal" role="dialog" aria-modal="true" aria-labelledby="cfo-report-title">
            <button className="icon-button modal-close" onClick={onClose} aria-label="Close full briefing"><X size={20} /></button>
            <p className="eyebrow">EXECUTIVE BRIEF · TODAY</p>
            <h2 id="cfo-report-title">CEO Financial Briefing</h2>
            <p className="report-lead">SmartLedger reviewed your recent activity and prioritized the actions with the greatest financial impact.</p>

            <div className="report-summary-grid">
              <article><span>Potential annual savings</span><strong>$6,194</strong><small>Across 3 priority actions</small></article>
              <article><span>30-day cash outlook</span><strong>$171,440</strong><small className="success-text">Low risk</small></article>
              <article><span>Financial health</span><strong>87 / 100</strong><small>Up 3 points</small></article>
            </div>

            <div className="report-section">
              <h3>Top recommendations</h3>
              <div className="report-actions">
                <div><CheckCircle2 size={18} /><span><strong>Renegotiate payment processing</strong><small>Estimated savings: $3,240/year</small></span></div>
                <div><CheckCircle2 size={18} /><span><strong>Review overlapping software subscriptions</strong><small>Estimated savings: $1,680/year</small></span></div>
                <div><CheckCircle2 size={18} /><span><strong>Request new commercial insurance quotes</strong><small>Estimated savings: $1,274/year</small></span></div>
              </div>
            </div>

            <div className="report-callout">
              <strong>Atlas recommendation</strong>
              <p>Start with payment processing. It offers the highest savings potential and can likely be completed within one week.</p>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
