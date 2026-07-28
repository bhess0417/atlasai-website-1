import { Bell, Menu, Search } from "lucide-react";

export default function Header({ onMenu }) {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="icon-button menu-button" onClick={onMenu} aria-label="Open menu">
          <Menu size={22} />
        </button>
        <div>
          <p className="eyebrow">EXECUTIVE FINANCIAL DASHBOARD</p>
          <h1>Good afternoon, Brian.</h1>
        </div>
      </div>
      <div className="topbar-actions">
        <label className="search-box">
          <Search size={18} />
          <input aria-label="Search SmartLedger" placeholder="Search SmartLedger" />
        </label>
        <button className="icon-button notification-button" aria-label="Notifications">
          <Bell size={20} />
          <span className="notification-dot" />
        </button>
      </div>
    </header>
  );
}
