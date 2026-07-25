import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import MetricCard from "./components/MetricCard";
import AtlasCFO from "./components/AtlasCFO";
import OpportunityList from "./components/OpportunityList";
import ImpactTimeline from "./components/ImpactTimeline";
import PlaceholderPage from "./components/PlaceholderPage";
import { CashFlowChart, SavingsChart } from "./components/Charts";
import { activities, cashFlowData, metrics, opportunities, savingsData } from "./data/mockData";

const validPages = new Set(["overview", "opportunities", "transactions", "accounts", "reports", "cfo", "notifications", "settings"]);
const titles = {
  overview: "Good afternoon, Brian.", opportunities: "AI Opportunities", transactions: "Transactions",
  accounts: "Accounts", reports: "Reports", cfo: "Atlas CFO", notifications: "Notifications", settings: "Settings",
};

function pageFromHash() {
  const page = window.location.hash.replace("#", "") || "overview";
  return validPages.has(page) ? page : "overview";
}

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState(pageFromHash);
  const [briefingOpen, setBriefingOpen] = useState(false);

  useEffect(() => {
    const onHashChange = () => setActivePage(pageFromHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const navigate = (page) => {
    window.location.hash = page;
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="app-shell">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} activePage={activePage} onNavigate={navigate} />
      <main className="main-content">
        <Header onMenu={() => setSidebarOpen(true)} onNotifications={() => navigate("notifications")} pageTitle={titles[activePage]} />
        <div className="dashboard-content">
          {activePage === "overview" ? (
            <>
              <section className="hero-strip">
                <div>
                  <p className="eyebrow">SMARTLEDGER AI · BETA 0.11.2</p>
                  <h2>Your money is working smarter.</h2>
                  <p>SmartLedger has identified $18,420 in savings this year.</p>
                </div>
                <div className="hero-score"><span>Financial Health</span><strong>87</strong><small>Excellent</small></div>
              </section>
              <section className="metrics-grid">{metrics.map((metric) => <MetricCard key={metric.label} metric={metric} />)}</section>
              <section className="two-column-grid lead-grid">
                <AtlasCFO expanded={briefingOpen} onOpen={() => setBriefingOpen(true)} onClose={() => setBriefingOpen(false)} />
                <ImpactTimeline activities={activities} />
              </section>
              <section className="two-column-grid"><CashFlowChart data={cashFlowData} /><SavingsChart data={savingsData} /></section>
              <OpportunityList opportunities={opportunities} />
            </>
          ) : (
            <PlaceholderPage page={activePage} onBack={() => navigate("overview")} onOpenBriefing={() => setBriefingOpen(true)} />
          )}
          {activePage !== "overview" && <AtlasCFO expanded={briefingOpen} onOpen={() => setBriefingOpen(true)} onClose={() => setBriefingOpen(false)} />}
          <footer className="dashboard-footer"><span>SmartLedger AI · v0.11.2</span><span>Built by Atlas AI, LLC</span></footer>
        </div>
      </main>
    </div>
  );
}
