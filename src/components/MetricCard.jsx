import { ArrowUpRight, BadgeDollarSign, BrainCircuit, HeartPulse, Sparkles } from "lucide-react";

const icons = {
  "Savings YTD": BadgeDollarSign,
  "Savings This Month": ArrowUpRight,
  "Financial Health": HeartPulse,
  "AI Opportunities": BrainCircuit,
};

export default function MetricCard({ metric }) {
  const Icon = icons[metric.label] || Sparkles;
  return (
    <article className={`metric-card ${metric.tone}`}>
      <div className="metric-card-top">
        <span className="metric-icon"><Icon size={20} /></span>
        <span className="status-pill">Live</span>
      </div>
      <p>{metric.label}</p>
      <strong>{metric.value}</strong>
      <span className="metric-change">{metric.change}</span>
    </article>
  );
}
