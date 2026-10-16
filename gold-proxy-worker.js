/* Cloudflare Worker: fixed upstreams only; never an arbitrary URL proxy. */
const UPSTREAMS = {
  minsheng: 'https://api.jdjygold.com/gw/generic/hj/h5/m/latestPrice',
  zheshang: 'https://api.jdjygold.com/gw2/generic/jrm/h5/m/stdLatestPrice?productSku=1961543816'
};
export default {
  async fetch(request,env={}) {
    const allowedOrigin=env.ALLOWED_ORIGIN || 'https://aidify2025.github.io';
    const origin=request.headers.get('Origin');
    const headers={'Content-Type':'application/json; charset=utf-8','Access-Control-Allow-Origin':allowedOrigin,'Vary':'Origin','Cache-Control':'no-store'};
    const reply=(data,status=200)=>new Response(JSON.stringify(data),{status,headers});
    if(origin && origin!==allowedOrigin)return reply({error:'Origin not allowed'},403);
    if(request.method==='OPTIONS')return new Response(null,{status:204,headers:{...headers,'Access-Control-Allow-Methods':'GET, OPTIONS','Access-Control-Max-Age':'600'}});
    if(request.method!=='GET')return reply({error:'Method not allowed'},405);
    const url=new URL(request.url),source=url.searchParams.get('source');
    if(url.pathname!=='/'||!Object.hasOwn(UPSTREAMS,source))return reply({error:'Unknown source'},400);
    const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),15000);
    try {
      const init={signal:controller.signal,redirect:'manual',headers:{'Accept':'application/json'}};
      if(source==='zheshang'){init.method='POST';init.headers['Content-Type']='application/json';init.body=JSON.stringify({reqData:{productSku:'1961543816'}});}
      const response=await fetch(UPSTREAMS[source],init);
      if(!response.ok)return reply({error:'Upstream unavailable'},502);
      const json=await response.json(),data=json.resultData?.datas;
      if(json.success!==true||json.resultData?.status!=='SUCCESS'||!data)return reply({error:'Invalid upstream response'},502);
      // Do not forward cookies, account data or unused upstream fields.
      return reply({success:true,resultData:{status:'SUCCESS',datas:{price:data.price,upAndDownRate:data.upAndDownRate,time:data.time}}});
    }catch{return reply({error:'Upstream unavailable'},502);}finally{clearTimeout(timeout);}
  }
};
