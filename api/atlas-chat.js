export default async function handler(request,response){
  if(request.method!=='POST')return response.status(405).json({error:'Method not allowed'});
  if(!process.env.OPENAI_API_KEY)return response.status(503).json({error:'Secure Atlas AI is not configured'});
  try{
    const {question,messages=[],memory={},context={}}=request.body||{};
    if(!question||typeof question!=='string')return response.status(400).json({error:'Question is required'});
    const conversation=messages.slice(-12).map(m=>`${m.role==='atlas'?'Assistant':'User'}: ${String(m.text||'').slice(0,1200)}`).join('\n');
    const instructions=`You are Ask Atlas, an executive financial copilot inside SmartLedger. Answer naturally and directly. Use the full conversation to resolve words such as it, these, that, them, and the previous one. Do not force the user into scripted categories. Ask one precise clarification only when the requested fact truly is absent. Never invent company facts. Distinguish modeled estimates from actual amounts. Keep most answers under 130 words and recommend a practical next action when useful.`;
    const prompt=`COMPANY CONTEXT\n${JSON.stringify(context)}\n\nWORKING MEMORY\n${JSON.stringify(memory)}\n\nRECENT CONVERSATION\n${conversation}\n\nLATEST USER QUESTION\n${question}`;
    const apiResponse=await fetch('https://api.openai.com/v1/responses',{method:'POST',headers:{'Authorization':`Bearer ${process.env.OPENAI_API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify({model:process.env.OPENAI_MODEL||'gpt-5-mini',instructions,input:prompt,max_output_tokens:350})});
    const data=await apiResponse.json();
    if(!apiResponse.ok)throw new Error(data?.error?.message||'AI request failed');
    const answer=data.output_text||data.output?.flatMap(item=>item.content||[]).find(item=>item.type==='output_text')?.text;
    if(!answer)throw new Error('No answer returned');
    return response.status(200).json({answer});
  }catch(error){return response.status(500).json({error:error.message||'Atlas could not answer'});}
}
