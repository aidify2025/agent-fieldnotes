const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const path=require('node:path');
const read=n=>fs.readFileSync(path.join(__dirname,n),'utf8');
const quote={success:true,resultData:{status:'SUCCESS',datas:{price:'1051.73',upAndDownRate:'+2.42%',time:String(Date.now())}}};
(async()=>{
 const worker=(await import('data:text/javascript;base64,'+Buffer.from(read('gold-proxy-worker.js')).toString('base64'))).default;
 const original=global.fetch;const calls=[];
 global.fetch=async(url,options)=>{calls.push({url,options});return Response.json(quote);};
 let response=await worker.fetch(new Request('https://proxy.example/?source=zheshang',{headers:{Origin:'https://aidify2025.github.io'}}));
 assert.equal(response.status,200);assert.equal(response.headers.get('Access-Control-Allow-Origin'),'https://aidify2025.github.io');
 assert.equal(calls[0].options.method,'POST');assert.deepEqual(JSON.parse(calls[0].options.body),{reqData:{productSku:'1961543816'}});
 assert.equal((await response.json()).resultData.datas.price,'1051.73');
 assert.equal((await worker.fetch(new Request('https://proxy.example/?source=https://other.example/'))).status,400);
 assert.equal((await worker.fetch(new Request('https://proxy.example/?source=minsheng',{headers:{Origin:'https://other.example'}}))).status,403);
 await worker.fetch(new Request('https://proxy.example/?source=minsheng'));assert.equal(calls.at(-1).options.method,undefined);
 global.fetch=async()=>{throw Error('offline');};assert.equal((await worker.fetch(new Request('https://proxy.example/?source=minsheng'))).status,502);global.fetch=original;
 const elements=new Map(),events={},timers=new Map(),requests=[];let sequence=0;
 class E{constructor(){this.attrs={};this.handlers={};this.hidden=false;this.parts={};this.classList={toggle(){}};}setAttribute(k,v){this.attrs[k]=v}addEventListener(k,v){this.handlers[k]=v}querySelector(s){return this.parts[s]??=new E()}attachShadow(){return {set innerHTML(v){},getElementById(id){if(!elements.has(id))elements.set(id,new E());return elements.get(id);}}}}
 const document={documentElement:{lang:'zh-CN'},body:{append(){}},createElement:()=>new E(),hidden:false,addEventListener:(k,f)=>events[k]=f};
 const context={document,window:{GOLD_WATCH_CONFIG:{proxyBase:'https://proxy.example',httpRefreshInterval:3000},addEventListener(){}},localStorage:{getItem:()=>null,setItem(){}},AbortController,Date,console,setTimeout:(f,ms)=>{timers.set(++sequence,{f,ms});return sequence},clearTimeout:id=>timers.delete(id),fetch:async(url,init)=>{requests.push({url,init});return {ok:true,json:async()=>quote}}};
 vm.runInNewContext(read('gold-watch.js'),context);assert.equal(requests.length,0,'default off makes no requests');
 elements.get('toggle').handlers.click();await new Promise(setImmediate);assert.equal(requests.length,2);assert.equal(elements.get('minsheng').parts['.price'].textContent,'1051.73');assert.equal(elements.get('toggle').attrs['aria-checked'],'true');
 assert([...timers.values()].some(t=>t.ms<=3000));
 document.hidden=true;events.visibilitychange();assert.equal(timers.size,0,'hidden tab pauses polling');
 document.hidden=false;events.visibilitychange();await new Promise(setImmediate);assert.equal(requests.length,4);
 elements.get('toggle').handlers.click();assert.equal(timers.size,0);assert.equal(elements.get('panel').hidden,true);assert.equal(elements.get('toggle').attrs['aria-checked'],'false');
 for(const file of fs.readdirSync(__dirname).filter(n=>n.endsWith('.html')))assert(read(file).includes('gold-watch.js'),file);
 console.log('PASS: default-off/no fetch, enable quotes, hidden/resume/off polling; proxy fixed routes, POST payload, CORS, origin rejection and upstream failure.');
})().catch(e=>{console.error(e);process.exitCode=1});
