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
    {id:'insurance',title:'Review commercial insurance',impact:18300,confidence:96,decisionScore:96,ease:'High',timeToValue:'30–60 days',evidenceCount:14,timeline:[['4:08 AM','14 policy and payment records synchronized'],['4:12 AM','18% premium increase detected'],['4:15 AM','Payroll and claims context compared'],['4:18 AM','Peer-cost variance modeled'],['4:22 AM','Recommendation ranked #1']],why:'Premiums increased 18% while coverage and claims activity remained stable. A competitive quote review is likely to produce meaningful savings with limited operational disruption.',nextStep:'Request three competitive quotes before the next renewal review.',evidence:['14 insurance payments reviewed','Premium increased 18% over 18 months','Payroll increased only 4%','Claims activity remained stable'],supporting:[{date:'2026-06-01',vendor:'Travelers Insurance',amount:-18650,description:'Commercial package premium'},{date:'2026-05-01',vendor:'Travelers Insurance',amount:-18650,description:'Commercial package premium'},{date:'2026-04-01',vendor:'Travelers Insurance',amount:-18650,description:'Commercial package premium'}]},
    {id:'processing',title:'Renegotiate merchant processing',impact:14800,confidence:94,decisionScore:92,ease:'Medium',timeToValue:'45–90 days',evidenceCount:12,timeline:[['4:09 AM','12 merchant statements synchronized'],['4:13 AM','Blended fee rate calculated'],['4:17 AM','Volume pricing opportunity detected'],['4:21 AM','Annual savings estimate modeled'],['4:24 AM','Recommendation ranked #2']],why:'Effective processing fees are above the modeled peer range for the company’s transaction mix. Contract review and volume-based pricing could lower annual fees.',nextStep:'Request an interchange-plus proposal and compare the blended effective rate.',evidence:['12 monthly statements reviewed','Effective fee rate is above modeled peer range','Transaction volume supports tiered pricing'],supporting:[{date:'2026-06-02',vendor:'Merchant Services',amount:-8420,description:'Monthly processing fees'},{date:'2026-05-02',vendor:'Merchant Services',amount:-8175,description:'Monthly processing fees'}]},
    {id:'energy',title:'Optimize plant energy use',impact:8100,confidence:91,decisionScore:84,ease:'Medium',timeToValue:'60–120 days',evidenceCount:18,timeline:[['4:10 AM','18 utility statements synchronized'],['4:14 AM','Facility usage normalized by output'],['4:18 AM','Ohio plant variance detected'],['4:22 AM','Peak-demand impact calculated'],['4:25 AM','Recommendation ranked #3']],why:'Electricity costs at the Ohio plant are 12% above the company’s other facilities after adjusting for production volume.',nextStep:'Schedule a facility-level demand and peak-usage review.',evidence:['18 utility statements reviewed','Ohio plant cost per unit is 12% higher','Peak demand charges increased for three months'],supporting:[{date:'2026-06-10',vendor:'Ohio Energy Cooperative',amount:-22980,description:'Plant electricity'},{date:'2026-05-10',vendor:'Ohio Energy Cooperative',amount:-22060,description:'Plant electricity'}]},
    {id:'subscriptions',title:'Remove inactive software licenses',impact:4900,confidence:98,decisionScore:81,ease:'High',timeToValue:'7–14 days',evidenceCount:9,timeline:[['4:11 AM','Recurring software charges synchronized'],['4:14 AM','Seat utilization compared'],['4:17 AM','Four inactive licenses detected'],['4:20 AM','Renewal timing verified'],['4:23 AM','Recommendation ranked #4']],why:'Four recurring software licenses have continued billing without corresponding active-user patterns in the demo operating profile.',nextStep:'Confirm ownership, then remove four inactive seats before renewal.',evidence:['9 recurring charges reviewed','Four seats show no modeled activity','Next renewal is within 30 days'],supporting:[{date:'2026-06-12',vendor:'Microsoft',amount:-769,description:'Enterprise software seats'},{date:'2026-06-14',vendor:'Adobe',amount:-685,description:'Creative licenses'}]}
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
