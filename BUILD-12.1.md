import { ArrowUpRight, Clock3, Gauge, PiggyBank } from "lucide-react";

export default function OpportunityList({ opportunities }) {
  return (
    <section className="panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">RECOMMENDED ACTIONS</p>
          <h2>Opportunity Center</h2>
        </div>
        <button className="text-button">View all</button>
      </div>

      <div className="opportunity-list">
        {opportunities.map((item) => (
          <article className="opportunity-card" key={item.id}>
            <div className="opportunity-main">
              <div className="priority-marker" />
              <div>
                <div className="opportunity-title-row">
                  <h3>{item.title}</h3>
                  <span className={`priority-pill ${item.priority.toLowerCase()}`}>{item.priority}</span>
                </div>
                <p>{item.description}</p>
                <div className="opportunity-meta">
                  <span><Gauge size={15} /> {item.confidence}% confidence</span>
                  <span><Clock3 size={15} /> {item.time}</span>
                  <span>{item.effort} effort</span>
                </div>
              </div>
            </div>
            <div className="opportunity-value">
              <PiggyBank size={18} />
              <span>Potential savings</span>
              <strong>${item.annualSavings.toLocaleString("en-US")}/yr</strong>
              <button className="icon-button" aria-label={`Open ${item.title}`}>
                <ArrowUpRight size={18} />
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
