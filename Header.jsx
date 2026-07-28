import { BarChart3, Bell, BrainCircuit, CreditCard, LayoutDashboard, Lightbulb, Settings, WalletCards, X } from "lucide-react";

const links = [
  { label: "Overview", icon: LayoutDashboard, active: true },
  { label: "AI Opportunities", icon: Lightbulb },
  { label: "Transactions", icon: WalletCards },
  { label: "Accounts", icon: CreditCard },
  { label: "Reports", icon: BarChart3 },
  { label: "Atlas CFO", icon: BrainCircuit },
  { label: "Notifications", icon: Bell },
];

export default function Sidebar({ open, onClose }) {
  return (
    <>
      <div className={`sidebar-backdrop ${open ? "show" : ""}`} onClick={onClose} />
      <aside className={`sidebar ${open ? "open" : ""}`}>
        <div className="brand">
          <div className="brand-mark">A</div>
          <div>
            <strong>SmartLedger</strong>
            <span>by Atlas AI</span>
          </div>
          <button className="icon-button close-sidebar" onClick={onClose} aria-label="Close menu">
            <X size={20} />
          </button>
        </div>

        <nav className="nav-list" aria-label="Main navigation">
          {links.map(({ label, icon: Icon, active }) => (
            <button key={label} className={`nav-item ${active ? "active" : ""}`}>
              <Icon size={19} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="nav-item">
            <Settings size={19} />
            <span>Settings</span>
          </button>
          <div className="account-card">
            <div className="avatar">BH</div>
            <div>
              <strong>Brian Hess</strong>
              <span>Administrator</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
