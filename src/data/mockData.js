export const company = {
  name: "Hess Enterprises",
  owner: "Brian",
  plan: "SmartLedger Pro",
};

export const metrics = [
  { label: "Savings YTD", value: "$18,420", change: "+$2,140 this month", tone: "positive" },
  { label: "Savings This Month", value: "$2,140", change: "+18.4% vs. last month", tone: "positive" },
  { label: "Financial Health", value: "87", change: "Excellent · up 3 points", tone: "positive" },
  { label: "AI Opportunities", value: "14", change: "$8,760 potential annual value", tone: "accent" },
];

export const opportunities = [
  {
    id: 1,
    title: "Reduce payment processing fees",
    description: "Your blended processing rate is above similar businesses in your category.",
    annualSavings: 1846,
    confidence: 96,
    effort: "Easy",
    time: "20 minutes",
    priority: "High",
  },
  {
    id: 2,
    title: "Cancel duplicate software licenses",
    description: "Three overlapping subscriptions appear to cover the same workflow.",
    annualSavings: 948,
    confidence: 99,
    effort: "Easy",
    time: "10 minutes",
    priority: "High",
  },
  {
    id: 3,
    title: "Renegotiate commercial insurance",
    description: "Renewal pricing increased faster than your business risk profile.",
    annualSavings: 3400,
    confidence: 84,
    effort: "Medium",
    time: "1–2 hours",
    priority: "Medium",
  },
];

export const activities = [
  { date: "Jul 22", title: "Duplicate license removed", amount: "+$240/year" },
  { date: "Jul 16", title: "Vendor contract renegotiated", amount: "+$1,200/year" },
  { date: "Jul 08", title: "Processing plan optimized", amount: "+$1,100/year" },
  { date: "Jun 27", title: "Unused subscription canceled", amount: "+$480/year" },
];

export const cashFlowData = [
  { month: "Feb", income: 72000, expenses: 51000 },
  { month: "Mar", income: 76000, expenses: 54000 },
  { month: "Apr", income: 74500, expenses: 52500 },
  { month: "May", income: 81000, expenses: 57000 },
  { month: "Jun", income: 84500, expenses: 58800 },
  { month: "Jul", income: 89200, expenses: 60600 },
];

export const savingsData = [
  { month: "Feb", savings: 8200 },
  { month: "Mar", savings: 10100 },
  { month: "Apr", savings: 12350 },
  { month: "May", savings: 14680 },
  { month: "Jun", savings: 16280 },
  { month: "Jul", savings: 18420 },
];
