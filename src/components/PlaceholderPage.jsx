import { ArrowLeft, Construction } from "lucide-react";

const copy = {
  opportunities: ["AI Opportunities", "Review prioritized savings recommendations, confidence scores, and expected annual impact."],
  transactions: ["Transactions", "Search, review, and categorize imported financial activity."],
  accounts: ["Accounts", "Manage connected bank, card, and financial accounts."],
  reports: ["Reports", "Open executive summaries, savings reports, and financial exports."],
  cfo: ["Atlas CFO", "Your always-on financial briefing and recommended next actions."],
  notifications: ["Notifications", "Review new savings opportunities, account alerts, and completed imports."],
  settings: ["Settings", "Manage your profile, company workspace, security, and notification preferences."],
};

export default function PlaceholderPage({ page, onBack, onOpenBriefing }) {
  const [title, description] = copy[page] || ["SmartLedger", "This workspace is being prepared."];
  return (
    <section className="placeholder-page panel">
      <div className="placeholder-icon"><Construction size={28} /></div>
      <p className="eyebrow">SPRINT 11A.2</p>
      <h2>{title}</h2>
      <p>{description}</p>
      <div className="placeholder-actions">
        <button className="secondary-button" onClick={onBack}><ArrowLeft size={17} /> Return to overview</button>
        {page === "cfo" && <button className="primary-button" onClick={onOpenBriefing}>Open CEO briefing</button>}
      </div>
      <small>This page is connected and ready for its next feature build. It is no longer a dead control.</small>
    </section>
  );
}
