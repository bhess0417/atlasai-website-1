import { BarChart3, Bell, BrainCircuit, CreditCard, LayoutDashboard, Lightbulb, Settings, WalletCards, X } from "lucide-react";

export const navigationItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "opportunities", label: "AI Opportunities", icon: Lightbulb },
  { id: "transactions", label: "Transactions", icon: WalletCards },
  { id: "accounts", label: "Accounts", icon: CreditCard },
  { id: "reports", label: "Reports", icon: BarChart3 },
  { id: "cfo", label: "Atlas CFO", icon: BrainCircuit },
  { id: "notifications", label: "Notifications", icon: Bell },
];

export default function Sidebar({ open, onClose, activePage, onNavigate }) {
  const navigate = (page) => {
    onNavigate(page);
    onClose();
  };

  return (
    <>
      <div className={`sidebar-backdrop ${open ? "show" : ""}`} onClick={onClose} aria-hidden="true" />
      <aside className={`sidebar ${open ? "open" : ""}`} aria-label="SmartLedger navigation">
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
          {navigationItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              className={`nav-item ${activePage === id ? "active" : ""}`}
              onClick={() => navigate(id)}
              aria-current={activePage === id ? "page" : undefined}
            >
              <Icon size={19} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button
            className={`nav-item ${activePage === "settings" ? "active" : ""}`}
            onClick={() => navigate("settings")}
            aria-current={activePage === "settings" ? "page" : undefined}
          >
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
