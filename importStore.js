import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import MetricCard from "./components/MetricCard";
import AtlasCFO from "./components/AtlasCFO";
import OpportunityList from "./components/OpportunityList";
import ImpactTimeline from "./components/ImpactTimeline";
import { CashFlowChart, SavingsChart } from "./components/Charts";
import {
  activities,
  cashFlowData,
  metrics,
  opportunities,
  savingsData,
} from "./data/mockData";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-shell">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="main-content">
        <Header onMenu={() => setSidebarOpen(true)} />

        <div className="dashboard-content">
          <section className="hero-strip">
            <div>
              <p className="eyebrow">SMARTLEDGER AI · BETA 0.9</p>
              <h2>Your money is working smarter.</h2>
              <p>SmartLedger has identified $18,420 in savings this year.</p>
            </div>
            <div className="hero-score">
              <span>Financial Health</span>
              <strong>87</strong>
              <small>Excellent</small>
            </div>
          </section>

          <section className="metrics-grid">
            {metrics.map((metric) => <MetricCard key={metric.label} metric={metric} />)}
          </section>

          <section className="two-column-grid lead-grid">
            <AtlasCFO />
            <ImpactTimeline activities={activities} />
          </section>

          <section className="two-column-grid">
            <CashFlowChart data={cashFlowData} />
            <SavingsChart data={savingsData} />
          </section>

          <OpportunityList opportunities={opportunities} />

          <footer className="dashboard-footer">
            <span>SmartLedger AI · Sprint 9</span>
            <span>Built by Atlas AI, LLC</span>
          </footer>
        </div>
      </main>
    </div>
  );
}
