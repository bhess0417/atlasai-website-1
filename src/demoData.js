export const demoProfile = {
  company: 'Atlas Manufacturing Group',
  industry: 'Precision manufacturing',
  employees: 187,
  locations: 3,
  vendors: 412,
  annualTransactions: 9842,
  revenue: 28400000,
  cash: 2840000,
  margin: 21.4,
  completedAt: '4:17 AM',
  confidence: 97,
  sources: ['Banking','Credit Cards','Accounts Payable','Accounts Receivable','Payroll','Vendor Activity']
};

export const demoBrief = {
  generatedAt: new Date().toISOString(),
  transactionCount: 9842,
  confidence: 97,
  healthScore: 92,
  annualSavings: 46100,
  cashStatus: 'Healthy',
  summary: 'Atlas completed the overnight review. Financial health is strong, with four issues worth executive attention this morning.',
  priorities: [
    {id:'insurance',title:'Review commercial insurance',impact:18300,confidence:96,why:'Premiums increased 18% while coverage and claims activity remained stable. A competitive quote review is likely to produce meaningful savings with limited operational disruption.'},
    {id:'processing',title:'Renegotiate merchant processing',impact:14800,confidence:94,why:'Effective processing fees are above the modeled peer range for the company’s transaction mix. Contract review and volume-based pricing could lower annual fees.'},
    {id:'energy',title:'Optimize plant energy use',impact:8100,confidence:91,why:'Electricity costs at the Ohio plant are 12% above the company’s other facilities after adjusting for production volume.'},
    {id:'subscriptions',title:'Remove inactive software licenses',impact:4900,confidence:98,why:'Four recurring software licenses have continued billing without corresponding active-user patterns in the demo operating profile.'}
  ]
};
demoBrief.nextAction = demoBrief.priorities[0];

export const demoIndustryNews = [
  {level:'HIGH',title:'Specialty steel prices moved higher',impact:'Potential margin pressure on Q4 production',why:'Steel represents 31% of modeled direct-material spending.',action:'Review supplier commitments and consider locking pricing for critical grades.'},
  {level:'HIGH',title:'Proposed freight rule may raise regional carrier costs',impact:'Inbound logistics costs could increase 3–5%',why:'Two primary suppliers rely on affected regional routes.',action:'Request updated freight schedules and compare alternate carriers before renewals.'}
];

const vendors = [
  ['Midwest Steel Supply','Raw Materials'],['Great Lakes Alloy','Raw Materials'],['Grainger','Maintenance'],['Fastenal','Maintenance'],
  ['Ohio Energy Cooperative','Utilities'],['FedEx Freight','Freight'],['UPS Supply Chain','Freight'],['Microsoft','Software'],
  ['Adobe','Software'],['Travelers Insurance','Insurance'],['Gusto Payroll','Payroll'],['Shell Fleet','Fuel']
];

export function createDemoTransactions(count=9842){
  const rows=[];
  const start=new Date('2026-01-01T12:00:00');
  for(let i=0;i<count;i++){
    const [vendor,category]=vendors[i%vendors.length];
    const d=new Date(start);d.setDate(d.getDate()+Math.floor(i/3));
    let amount=-(220+(i%17)*83.45);
    if(category==='Raw Materials') amount=-(12400+(i%9)*1180);
    if(category==='Payroll') amount=-(128000+(i%4)*4500);
    if(category==='Insurance') amount=-18650;
    if(category==='Utilities') amount=-(18400+(i%6)*920);
    if(category==='Software') amount=-(349+(i%5)*84);
    rows.push({id:`demo-${i}`,date:d.toISOString().slice(0,10),vendor,description:`${category} operating expense`,amount:Number(amount.toFixed(2)),category,valid:true,duplicate:false});
  }
  rows.push({id:'demo-dup-1',date:'2026-06-18',vendor:'Adobe',description:'Enterprise license renewal',amount:-1249,category:'Software',valid:true,duplicate:true});
  rows.push({id:'demo-dup-2',date:'2026-06-18',vendor:'Adobe',description:'Enterprise license renewal',amount:-1249,category:'Software',valid:true,duplicate:true});
  return rows;
}
