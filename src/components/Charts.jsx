import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const money = (value) => `$${(value / 1000).toFixed(0)}k`;

export function CashFlowChart({ data }) {
  return (
    <section className="panel chart-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">LAST 6 MONTHS</p>
          <h2>Cash Flow</h2>
        </div>
        <span className="status-pill">Monthly</span>
      </div>
      <div className="chart-wrap">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 8, left: -12, bottom: 0 }}>
            <defs>
              <linearGradient id="incomeFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="currentColor" stopOpacity={0.28}/>
                <stop offset="95%" stopColor="currentColor" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148,163,184,.14)" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#8fa2bc", fontSize: 12 }} />
            <YAxis tickFormatter={money} axisLine={false} tickLine={false} tick={{ fill: "#8fa2bc", fontSize: 12 }} />
            <Tooltip formatter={(value) => `$${value.toLocaleString("en-US")}`} contentStyle={{ background: "#0c192b", border: "1px solid rgba(148,163,184,.2)", borderRadius: 12 }} />
            <Legend />
            <Area type="monotone" dataKey="income" stroke="#4de0b4" fill="url(#incomeFill)" strokeWidth={3} />
            <Area type="monotone" dataKey="expenses" stroke="#6d8dff" fill="transparent" strokeWidth={2.5} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export function SavingsChart({ data }) {
  return (
    <section className="panel chart-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">YEAR TO DATE</p>
          <h2>Savings Growth</h2>
        </div>
        <strong className="chart-total">$18,420</strong>
      </div>
      <div className="chart-wrap">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 8, left: -12, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148,163,184,.14)" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#8fa2bc", fontSize: 12 }} />
            <YAxis tickFormatter={money} axisLine={false} tickLine={false} tick={{ fill: "#8fa2bc", fontSize: 12 }} />
            <Tooltip formatter={(value) => `$${value.toLocaleString("en-US")}`} contentStyle={{ background: "#0c192b", border: "1px solid rgba(148,163,184,.2)", borderRadius: 12 }} />
            <Line type="monotone" dataKey="savings" stroke="#f2c96d" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
