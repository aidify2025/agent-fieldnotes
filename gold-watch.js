/* Optional, local-only preference. No network request until enabled. */
(() => {
  'use strict';
  const en = document.documentElement.lang === 'en';
  const t = (zh, english) => en ? english : zh;
  const config = window.GOLD_WATCH_CONFIG || {};
  const interval = Math.max(1000, Number(config.httpRefreshInterval) || 3000);
  const proxy = String(config.proxyBase || '').replace(/\/$/, '');
  const endpoints = {
    minsheng: 'https://api.jdjygold.com/gw/generic/hj/h5/m/latestPrice',
    zheshang: 'https://api.jdjygold.com/gw2/generic/jrm/h5/m/stdLatestPrice?productSku=1961543816'
  };
  const host = document.createElement('aside');
  host.id = 'gold-watch';
  host.setAttribute('aria-label', t('黄金盯盘', 'Gold watch'));
  // Shadow DOM prevents the handbook/algorithm page button styles leaking in.
  const root = host.attachShadow({mode:'open'});
  root.innerHTML = `<style>
    :host{position:fixed;left:max(10px,env(safe-area-inset-left));bottom:calc(10px + env(safe-area-inset-bottom));z-index:50;font:11px/1.6 system-ui,-apple-system,sans-serif;color:#54675c}
    *{box-sizing:border-box}button{font:inherit;color:inherit;cursor:pointer;touch-action:manipulation}
    .toggle{display:flex;align-items:center;gap:6px;min-height:32px;padding:4px 9px;background:#f3f3eb;border:1px solid #dfe3d8;border-radius:6px}
    .dot{width:5px;height:5px;background:#9ba89c;border-radius:50%}.toggle[aria-checked=true] .dot{background:#59705c}
    button:focus-visible{outline:2px solid #687e69;outline-offset:3px}
    .panel{width:204px;max-width:calc(100vw - 24px);padding:10px 12px;margin-bottom:5px;border:1px solid #dfe3d8;border-radius:7px;background:#f6f5ef;box-shadow:0 2px 8px #223d3509}
    [hidden]{display:none!important}.row{display:grid;grid-template-columns:1fr auto auto;gap:8px;align-items:baseline;padding:3px 0}.price{font-variant-numeric:tabular-nums;color:#3f5748}.rate{font-variant-numeric:tabular-nums;font-size:10px}.up{color:#9b6752}.down{color:#5b7864}.status{margin-top:4px;font-size:10px;line-height:1.5;color:#6e7a73}.stale .price,.stale .rate{opacity:.65}.unit{font-size:9px;color:#78847a;text-align:right}
    @media(max-width:480px){.panel{width:190px}.toggle{min-height:34px}}
  </style><section class="panel" id="panel" hidden aria-label="${t('黄金价格','Gold prices')}">
    <div class="unit">${t('元 / 克','CNY / g')}</div>
    <div class="row" id="minsheng"><span>${t('民生','Minsheng')}</span><span class="price">—</span><span class="rate">—</span></div>
    <div class="row" id="zheshang"><span>${t('浙商','Zheshang')}</span><span class="price">—</span><span class="rate">—</span></div>
    <div class="status" id="status"></div>
  </section><button class="toggle" id="toggle" role="switch" aria-checked="false" aria-controls="panel" aria-label="${t('黄金盯盘开关','Toggle gold watch')}" title="${t('黄金盯盘','Gold watch')}"><span class="dot" aria-hidden="true"></span><span>Au</span></button>`;
  document.body.append(host);
  const $ = id => root.getElementById(id);
  const records = {minsheng:null,zheshang:null};
  let enabled = false, generation = 0, timer, controllers = [];
  function stop() {
    generation++;
    clearTimeout(timer);
    controllers.forEach(c=>c.abort());
    controllers=[];
  }
  async function request(source, signal) {
    const init = {signal,credentials:'omit',cache:'no-store',referrerPolicy:'no-referrer'};
    if (!proxy && source === 'zheshang') {
      init.method='POST';init.headers={'Content-Type':'application/json'};
      init.body=JSON.stringify({reqData:{productSku:'1961543816'}});
    }
    const response=await fetch(proxy ? `${proxy}/?source=${source}` : endpoints[source],init);
    if (!response.ok) throw new Error('HTTP');
    const json=await response.json();
    const d=json.resultData?.datas;
    if(json.success!==true || json.resultData?.status!=='SUCCESS' || !d || !/^\d+(\.\d+)?$/.test(String(d.price)) || !/^[+-]?\d+(\.\d+)?%$/.test(String(d.upAndDownRate))) throw new Error('Invalid quote');
    const timestamp=Number(d.time);
    if(!Number.isFinite(timestamp)||timestamp<=0)throw new Error('Invalid time');
    return {price:Number(d.price).toFixed(2),rate:d.upAndDownRate,time:timestamp};
  }
  const fetchGoldPrice = signal => request('minsheng',signal);
  const fetchZSGoldPrice = signal => request('zheshang',signal);
  function render(errors=[]) {
    for (const source of Object.keys(records)) {
      const row=$(source),r=records[source];
      row.classList.toggle('stale',errors.includes(source));
      if(r){row.querySelector('.price').textContent=r.price;const rate=row.querySelector('.rate');rate.textContent=r.rate;rate.className='rate '+(parseFloat(r.rate)>0?'up':parseFloat(r.rate)<0?'down':'');row.title=new Date(r.time).toLocaleString(en?'en-GB':'zh-CN');}
    }
    const times=Object.values(records).filter(Boolean).map(r=>r.time);
    if(errors.length) $('status').textContent=t('连接暂不可用 · 旧报价保留','Connection unavailable · previous quotes retained');
    else if(times.length) {
      const time=Math.min(...times),stale=Date.now()-time>60000;
      $('status').textContent=(stale?t('报价未更新 · ','Quote unchanged · '):'')+new Date(time).toLocaleTimeString(en?'en-GB':'zh-CN',{hour12:false})+' · '+(interval/1000)+'s';
    } else $('status').textContent=t('连接中…','Connecting…');
  }
  async function poll() {
    if(!enabled||document.hidden)return;
    const g=generation,started=Date.now();
    const errors=[];
    await Promise.all(Object.entries({minsheng:fetchGoldPrice,zheshang:fetchZSGoldPrice}).map(async([source,fn])=>{
      const controller=new AbortController();controllers.push(controller);
      const timeout=setTimeout(()=>controller.abort(),18000);
      try{const r=await fn(controller.signal);if(g===generation)records[source]=r;}
      catch{errors.push(source);}
      finally{clearTimeout(timeout);controllers=controllers.filter(c=>c!==controller);}
    }));
    if(g!==generation||!enabled||document.hidden)return;
    render(errors);
    timer=setTimeout(poll,Math.max(0,interval-(Date.now()-started)));
  }
  function setEnabled(value) {
    stop();enabled=value;
    $('toggle').setAttribute('aria-checked',String(value));$('panel').hidden=!value;
    try{localStorage.setItem('agent-fieldnotes-gold-watch',value?'on':'off');}catch{}
    if(value){render();poll();}
  }
  $('toggle').addEventListener('click',()=>setEnabled(!enabled));
  document.addEventListener('visibilitychange',()=>{stop();if(enabled&&!document.hidden)poll();});
  window.addEventListener('pagehide',stop);
  window.addEventListener('pageshow',event=>{if(event.persisted&&enabled){stop();poll();}});
  try{if(localStorage.getItem('agent-fieldnotes-gold-watch')==='on')setEnabled(true);}catch{}
})();
