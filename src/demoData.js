:root {
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  color: #edf4ff;
  background: #06101d;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  --bg: #06101d;
  --sidebar: #071524;
  --panel: rgba(12, 27, 46, 0.82);
  --panel-strong: #0c1b2e;
  --border: rgba(148, 163, 184, 0.15);
  --muted: #8fa2bc;
  --green: #4de0b4;
  --gold: #f2c96d;
  --blue: #6d8dff;
  --danger: #ff7f8f;
}

* { box-sizing: border-box; }
body { margin: 0; min-width: 320px; min-height: 100vh; background:
  radial-gradient(circle at 75% 0%, rgba(51, 88, 170, .18), transparent 34%),
  radial-gradient(circle at 15% 100%, rgba(22, 121, 104, .12), transparent 30%),
  var(--bg);
}
button, input { font: inherit; }
button { cursor: pointer; }

.app-shell { display: flex; min-height: 100vh; }
.sidebar {
  width: 252px; min-height: 100vh; position: fixed; inset: 0 auto 0 0; z-index: 30;
  padding: 22px 16px; display: flex; flex-direction: column;
  background: linear-gradient(180deg, rgba(9, 27, 46, .98), rgba(5, 18, 32, .98));
  border-right: 1px solid var(--border);
}
.brand { display: flex; align-items: center; gap: 12px; padding: 2px 8px 26px; }
.brand-mark {
  width: 40px; height: 40px; border-radius: 13px; display: grid; place-items: center;
  font-weight: 900; font-size: 21px; color: #07111f;
  background: linear-gradient(135deg, var(--gold), #fff0b1);
  box-shadow: 0 10px 28px rgba(242, 201, 109, .18);
}
.brand strong { display: block; font-size: 16px; }
.brand span, .account-card span { display: block; color: var(--muted); font-size: 12px; margin-top: 2px; }
.nav-list { display: grid; gap: 5px; }
.nav-item {
  width: 100%; display: flex; align-items: center; gap: 12px; border: 0; border-radius: 12px;
  padding: 12px 13px; color: var(--muted); background: transparent; text-align: left;
}
.nav-item:hover, .nav-item.active { color: #fff; background: rgba(109, 141, 255, .12); }
.nav-item.active { box-shadow: inset 3px 0 0 var(--blue); }
.sidebar-footer { margin-top: auto; }
.account-card {
  margin-top: 12px; padding: 14px 10px; display: flex; align-items: center; gap: 10px;
  border-top: 1px solid var(--border);
}
.avatar { width: 36px; height: 36px; border-radius: 50%; display: grid; place-items: center; background: #193456; font-size: 13px; font-weight: 800; }
.close-sidebar { display: none !important; margin-left: auto; }
.sidebar-backdrop { display: none; }

.main-content { margin-left: 252px; width: calc(100% - 252px); }
.topbar {
  min-height: 88px; padding: 18px 28px; display: flex; align-items: center; justify-content: space-between;
  position: sticky; top: 0; z-index: 20; backdrop-filter: blur(18px);
  background: rgba(6, 16, 29, .76); border-bottom: 1px solid var(--border);
}
.topbar-left { display: flex; align-items: center; gap: 14px; }
.topbar h1 { margin: 3px 0 0; font-size: clamp(22px, 2vw, 30px); }
.eyebrow { color: var(--green) !important; font-size: 11px !important; font-weight: 800; letter-spacing: .13em; margin: 0; }
.topbar-actions { display: flex; gap: 10px; align-items: center; }
.search-box {
  width: 250px; height: 42px; display: flex; align-items: center; gap: 9px; padding: 0 13px;
  border: 1px solid var(--border); border-radius: 12px; color: var(--muted); background: rgba(12, 27, 46, .7);
}
.search-box input { width: 100%; border: 0; outline: 0; color: #fff; background: transparent; }
.icon-button {
  width: 40px; height: 40px; display: inline-grid; place-items: center; border: 1px solid var(--border);
  border-radius: 12px; color: #dce9fb; background: rgba(12, 27, 46, .8);
}
.notification-button { position: relative; }
.notification-dot { position: absolute; width: 7px; height: 7px; border-radius: 50%; background: var(--gold); right: 8px; top: 8px; }
.menu-button { display: none; }

.dashboard-content { padding: 26px 28px 36px; max-width: 1500px; margin: 0 auto; }
.hero-strip {
  display: flex; align-items: center; justify-content: space-between; gap: 20px;
  padding: 28px; border: 1px solid rgba(77, 224, 180, .2); border-radius: 22px;
  background:
    linear-gradient(110deg, rgba(13, 50, 57, .88), rgba(18, 31, 58, .88)),
    var(--panel);
  box-shadow: 0 22px 50px rgba(0, 0, 0, .22);
}
.hero-strip h2 { font-size: clamp(27px, 3vw, 42px); margin: 7px 0 8px; }
.hero-strip p { color: #bdd0e7; margin-bottom: 0; }
.hero-score { min-width: 150px; text-align: center; padding: 18px; border-left: 1px solid rgba(255,255,255,.12); }
.hero-score span, .hero-score small { display: block; color: var(--muted); }
.hero-score strong { display: block; font-size: 48px; line-height: 1; margin: 7px 0; color: var(--green); }

.metrics-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; margin: 18px 0; }
.metric-card, .panel {
  border: 1px solid var(--border); border-radius: 18px; background: var(--panel);
  box-shadow: 0 14px 32px rgba(0, 0, 0, .16);
}
.metric-card { padding: 20px; min-height: 174px; position: relative; overflow: hidden; }
.metric-card::after { content: ""; position: absolute; width: 90px; height: 90px; border-radius: 50%; right: -34px; bottom: -42px; background: rgba(77, 224, 180, .1); }
.metric-card.accent::after { background: rgba(109, 141, 255, .15); }
.metric-card-top { display: flex; align-items: center; justify-content: space-between; }
.metric-icon { width: 39px; height: 39px; border-radius: 12px; display: grid; place-items: center; color: var(--green); background: rgba(77, 224, 180, .11); }
.status-pill, .ai-badge, .priority-pill {
  display: inline-flex; align-items: center; gap: 5px; padding: 5px 9px; border-radius: 999px;
  font-size: 11px; font-weight: 750; color: #b9cae0; background: rgba(148,163,184,.1);
}
.metric-card > p { color: var(--muted); font-size: 13px; margin: 18px 0 5px; }
.metric-card > strong { display: block; font-size: 30px; }
.metric-change { color: var(--green); font-size: 12px; display: block; margin-top: 8px; }

.two-column-grid { display: grid; grid-template-columns: 1.25fr 1fr; gap: 18px; margin-bottom: 18px; }
.lead-grid { grid-template-columns: 1.35fr .85fr; }
.panel { padding: 22px; }
.panel-heading { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; margin-bottom: 20px; }
.panel-heading h2 { margin: 4px 0 0; font-size: 20px; }
.ai-badge { color: #d6c7ff; background: rgba(145, 111, 255, .12); }
.cfo-message { display: flex; gap: 14px; padding: 18px; border-radius: 15px; background: rgba(109, 141, 255, .08); border: 1px solid rgba(109, 141, 255, .14); }
.cfo-avatar { width: 45px; height: 45px; flex: 0 0 45px; display: grid; place-items: center; border-radius: 14px; color: #d8e0ff; background: rgba(109,141,255,.18); }
.cfo-message h3 { margin: 0 0 7px; font-size: 17px; }
.cfo-message p { color: #aebfd5; line-height: 1.55; margin: 0; font-size: 14px; }
.cfo-message strong { color: #fff; }
.briefing-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin: 16px 0; }
.briefing-grid div { padding: 13px; border-radius: 12px; background: rgba(255,255,255,.025); border: 1px solid var(--border); }
.briefing-grid span { display: block; color: var(--muted); font-size: 11px; margin-bottom: 6px; }
.briefing-grid strong { font-size: 14px; }
.success-text { color: var(--green); }
.primary-button {
  display: inline-flex; align-items: center; gap: 8px; border: 0; border-radius: 11px;
  padding: 11px 15px; color: #07111f; font-weight: 800; background: linear-gradient(135deg, var(--green), #8af2d2);
}
.text-button { border: 0; color: #aabfff; background: transparent; }

.timeline { display: grid; gap: 3px; }
.timeline-item { display: grid; grid-template-columns: 34px 1fr auto; gap: 10px; align-items: center; padding: 10px 0; border-bottom: 1px solid rgba(148,163,184,.1); }
.timeline-icon { width: 29px; height: 29px; border-radius: 50%; display: grid; place-items: center; color: var(--green); background: rgba(77,224,180,.1); }
.timeline-copy span { display: block; color: var(--muted); font-size: 10px; }
.timeline-copy strong, .timeline-amount { font-size: 12px; }
.timeline-amount { color: var(--green); }
.roi-card { margin-top: 16px; padding: 15px; border-radius: 13px; background: linear-gradient(120deg, rgba(242,201,109,.12), rgba(109,141,255,.07)); border: 1px solid rgba(242,201,109,.18); }
.roi-card span { display: block; color: var(--muted); font-size: 11px; }
.roi-card strong { display: block; font-size: 19px; margin: 4px 0; color: var(--gold); }
.roi-card p { margin: 0; color: #9fb1c8; font-size: 11px; }

.chart-panel { min-height: 370px; }
.chart-wrap { height: 285px; color: var(--green); }
.chart-total { color: var(--gold); font-size: 20px; }

.opportunity-list { display: grid; gap: 11px; }
.opportunity-card {
  display: grid; grid-template-columns: 1fr auto; gap: 20px; align-items: center;
  padding: 17px; border: 1px solid var(--border); border-radius: 15px; background: rgba(255,255,255,.018);
}
.opportunity-main { display: flex; gap: 13px; }
.priority-marker { width: 4px; border-radius: 99px; background: linear-gradient(var(--gold), var(--green)); }
.opportunity-title-row { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.opportunity-title-row h3 { margin: 0; font-size: 15px; }
.priority-pill.high { color: #ffd5da; background: rgba(255,127,143,.12); }
.priority-pill.medium { color: #ffebb1; background: rgba(242,201,109,.12); }
.opportunity-card p { color: var(--muted); font-size: 13px; margin: 7px 0 10px; }
.opportunity-meta { display: flex; flex-wrap: wrap; gap: 13px; color: #99aac0; font-size: 11px; }
.opportunity-meta span { display: inline-flex; align-items: center; gap: 5px; }
.opportunity-value { min-width: 165px; display: grid; grid-template-columns: auto 1fr; align-items: center; column-gap: 8px; }
.opportunity-value > span { color: var(--muted); font-size: 10px; }
.opportunity-value > strong { grid-column: 1 / 3; font-size: 18px; margin: 4px 0 9px; color: var(--green); }
.opportunity-value .icon-button { grid-column: 2; justify-self: end; width: 34px; height: 34px; }

.dashboard-footer { display: flex; justify-content: space-between; color: #71859f; font-size: 11px; padding: 22px 3px 0; }

@media (max-width: 1180px) {
  .metrics-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .two-column-grid, .lead-grid { grid-template-columns: 1fr; }
}
@media (max-width: 820px) {
  .sidebar { transform: translateX(-100%); transition: transform .24s ease; }
  .sidebar.open { transform: translateX(0); }
  .sidebar-backdrop.show { display: block; position: fixed; inset: 0; background: rgba(0,0,0,.52); z-index: 25; }
  .close-sidebar, .menu-button { display: inline-grid !important; }
  .main-content { margin-left: 0; width: 100%; }
  .topbar { padding: 16px 18px; }
  .search-box { display: none; }
  .dashboard-content { padding: 18px; }
}
@media (max-width: 620px) {
  .hero-strip { align-items: flex-start; padding: 22px; }
  .hero-score { min-width: 94px; padding: 10px; }
  .hero-score strong { font-size: 38px; }
  .metrics-grid { grid-template-columns: 1fr; }
  .briefing-grid { grid-template-columns: 1fr; }
  .opportunity-card { grid-template-columns: 1fr; }
  .opportunity-value { border-top: 1px solid var(--border); padding-top: 12px; }
  .topbar h1 { font-size: 20px; }
  .dashboard-footer { flex-direction: column; gap: 5px; }
}
