import { CheckCircle2 } from "lucide-react";

export default function ImpactTimeline({ activities }) {
  return (
    <section className="panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">PROVEN VALUE</p>
          <h2>Impact Timeline</h2>
        </div>
        <span className="status-pill">2026</span>
      </div>
      <div className="timeline">
        {activities.map((item) => (
          <div className="timeline-item" key={`${item.date}-${item.title}`}>
            <div className="timeline-icon"><CheckCircle2 size={17} /></div>
            <div className="timeline-copy">
              <span>{item.date}</span>
              <strong>{item.title}</strong>
            </div>
            <strong className="timeline-amount">{item.amount}</strong>
          </div>
        ))}
      </div>
      <div className="roi-card">
        <span>SmartLedger value</span>
        <strong>39.4× subscription cost</strong>
        <p>Based on $18,420 YTD savings and a $39 monthly plan.</p>
      </div>
    </section>
  );
}
