'use strict';
(() => {
const data = window.PRACTICE_PROBLEMS, $ = s => document.querySelector(s);
const key = 'agent-fieldnotes-coding-v1'; let state = {code:{}, solved:[], history:[]};
try { const x = JSON.parse(localStorage.getItem(key)); if(x && typeof x === 'object') state = {code:x.code && typeof x.code === 'object'?x.code:{},solved:Array.isArray(x.solved)?x.solved:[],history:Array.isArray(x.history)?x.history.slice(0,40):[]}; } catch {}
let current = data.find(p => '#'+p.id === location.hash) || data[0], activeTab = 'description', activeRun = null;
const escape = s => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const json = v => {try {const s=JSON.stringify(v); return s === undefined?'undefined':s.length>2500?s.slice(0,2500)+'…':s;}catch{return '[无法序列化的结果]'}};
const template = p => `/**\n * ${p.title}\n * 请返回结果，不要只使用 console.log。\n */\nfunction ${p.fn}(${p.params}) {\n  // 在这里编写你的解法\n  \n}\n`;
function save() { try { localStorage.setItem(key,JSON.stringify(state)); $('#save-status').textContent='已自动保存 · 仅当前浏览器'; } catch { $('#save-status').textContent='浏览器存储不可用，请自行备份代码'; } }
function list() {
 const solved=data.filter(p=>state.solved.includes(p.id)).length; $('#solved').textContent=`${solved} / ${data.length}`;$('#bar').style.width=solved/data.length*100+'%';
 const q=$('#query').value.trim().toLowerCase(), level=$('#difficulty').value, status=$('#status').value;
 const rows=data.filter(p=>(!level||p.level===level)&&(!status||(status==='done')===state.solved.includes(p.id))&&[p.title,...p.tags,p.fn].join(' ').toLowerCase().includes(q));
 $('#problems').innerHTML=rows.length?rows.map(p=>`<button class="problem ${p.id===current.id?'active':''}" data-id="${p.id}" aria-current="${p.id===current.id}"><span class="number">${String(data.indexOf(p)+1).padStart(2,'0')}</span><span><strong>${p.title}</strong><small>${p.level} · ${p.tags.join(' / ')}</small></span>${state.solved.includes(p.id)?'<span class="done">✓</span>':''}</button>`).join(''):'<p class="empty">没有匹配题目，试试其他筛选条件。</p>';
}
function question() {
 const p=current;document.querySelectorAll('[data-tab]').forEach(b=>b.classList.toggle('active',b.dataset.tab===activeTab));
 let body=`<h2>${String(data.indexOf(p)+1).padStart(2,'0')}. ${p.title}</h2><span class="badge ${p.level==='中等'?'medium':''}">${p.level}</span>${p.tags.map(t=>`<span class="badge">${t}</span>`).join('')}`;
 if(activeTab==='description')body+=`<p>${p.description}</p><h3>函数约定</h3><pre class="example">${p.fn}(${p.params})</pre>`+p.tests.slice(0,2).map((t,i)=>`<h3>示例 ${i+1}</h3><pre class="example">输入参数：${escape(json(t.args))}\n预期返回：${escape(json(t.expected))}</pre>`).join('')+`<h3>约束</h3><ul>${p.constraints.map(c=>`<li>${c}</li>`).join('')}</ul><div class="note">运行样例检查前 2 个用例；提交判题检查全部 ${p.tests.length} 个用例。测试集公开，计时仅供本机参考。</div>`;
 else if(activeTab==='hint')body+=`<h3>解题提示</h3><p>${p.hint}</p><h3>复杂度分析</h3><p>${p.complexity}</p><details><summary>展开参考解法（建议先独立尝试）</summary><pre class="solution">${escape(p.solution)}</pre></details><p>可以对照思路修改自己的代码。参考解法不会自动填入编辑器。</p>`;
 else {const history=state.history.filter(h=>h.id===p.id);body+=`<p>仅保留当前浏览器最近 40 次提交；运行样例不计入记录。${state.solved.includes(p.id)?'本题曾通过完整测试集。':''}</p>`;body+=history.length?history.map(h=>`<div class="history-item"><button class="btn" data-restore="${escape(h.key)}">载入代码</button><b class="${h.ok?'pass':'fail'}">${escape(h.status)}</b><small>${escape(new Date(h.at).toLocaleString())} · ${escape(h.passed)} / ${escape(h.total)} 通过</small></div>`).join(''):'<p>还没有提交记录。</p>';}
 $('#question-content').innerHTML=body;
}
function lines(){ $('#lines').textContent=Array.from({length:$('#editor').value.split('\n').length},(_,i)=>i+1).join('\n');$('#lines').scrollTop=$('#editor').scrollTop; }
function select(p){ if(activeRun)stop('已切换题目，执行已停止。');current=p;history.replaceState(null,'','#'+p.id);$('#editor').value=typeof state.code[p.id]==='string'?state.code[p.id]:template(p);$('#signature').textContent=p.fn+'()';$('#custom').value=json(p.tests[0].args);$('#result').innerHTML='<div class="idle">⌘<h3>准备好开始了吗？</h3><p>编写代码后，点击运行样例或提交判题。</p></div>';lines();list();question(); }
function busy(value){ ['run','submit','custom-run','reset'].forEach(id=>$('#'+id).disabled=value);$('#stop').hidden=!value; }
function cleanup(){if(!activeRun)return;clearTimeout(activeRun.timer);window.removeEventListener('message',activeRun.listener);activeRun.frame.remove();activeRun=null;busy(false);}
function stop(message='执行已停止。'){cleanup();$('#result').innerHTML=`<p class="error">${escape(message)}</p>`;}
function equal(a,b){return JSON.stringify(a)===JSON.stringify(b);}
// 执行代码位于 opaque-origin sandbox iframe 内的 Worker 中，不在网站主窗口执行。
// CSP 禁止网络访问。Worker 2 秒限时；主窗口另设 5 秒启动/响应限时。
function run(mode){
 if(activeRun)return; const p=current, code=$('#editor').value;let cases=mode==='samples'?p.tests.slice(0,2):p.tests;
 if(!code.trim()){ $('#result').textContent='请先编写代码。';return; }if(code.length>30000){$('#result').textContent='代码超过 30,000 字符限制。';return;}
 if(mode==='custom'){try{if($('#custom').value.length>10000)throw Error('自定义输入不能超过 10,000 字符');const args=JSON.parse($('#custom').value);if(!Array.isArray(args)||args.length!==p.params.split(',').length)throw Error('请输入参数数组，参数数量必须与函数签名一致');cases=[{args}];}catch(e){$('#result').innerHTML=`<p class="error">${escape(e.message)}</p>`;return;}}
 state.code[p.id]=code;save();busy(true);$('#result').textContent='正在运行…';
 const frame=document.createElement('iframe');frame.setAttribute('sandbox','allow-scripts');frame.hidden=true;frame.setAttribute('aria-hidden','true');
 const runId=crypto.randomUUID();
 const workerCode=`'use strict';\nconst send = self.postMessage.bind(self);\nself.onmessage = async ({data}) => {\n const logs=[]; const format=x=>{try{return typeof x==='string'?x:JSON.stringify(x)}catch{return '[不可序列化]'}};\n console.log=(...args)=>{if(logs.length<20)logs.push(args.map(format).join(' ').slice(0,500))};\n try {\n  const results=[]; const start=performance.now();\n  for (const args of data.inputs) {\n   const fn=new Function(data.code+'\\n;return typeof '+data.fn+' === "function" ? '+data.fn+' : null;')();\n   if(!fn) throw Error('请定义函数 '+data.fn);\n   const value=await fn(...args);\n   const text=JSON.stringify(value);\n   if(text!==undefined && text.length>100000) throw Error('返回结果过大');\n   results.push(text===undefined?{undefined:true}:{value:JSON.parse(text)});\n  }\n  send({ok:true,results,logs,ms:performance.now()-start});\n } catch(e) {send({ok:false,error:String(e && e.message || e).slice(0,1500),logs});}\n};`;
 const payload={code,fn:p.fn,inputs:cases.map(t=>t.args)};
 const script=`const id=${JSON.stringify(runId)};const report=data=>parent.postMessage({id,...data},'*');let worker;try{const blob=new Blob([${JSON.stringify(workerCode)}],{type:'text/javascript'});const url=URL.createObjectURL(blob);worker=new Worker(url);const timer=setTimeout(()=>{worker.terminate();URL.revokeObjectURL(url);report({ok:false,error:'运行超过 2 秒，已终止。检查死循环或算法复杂度。',timeout:true})},2000);worker.onmessage=e=>{clearTimeout(timer);worker.terminate();URL.revokeObjectURL(url);report(e.data)};worker.onerror=e=>{clearTimeout(timer);worker.terminate();report({ok:false,error:e.message||'代码执行失败'})};worker.postMessage(${JSON.stringify(payload)});}catch(e){report({ok:false,error:e.message||'当前浏览器不支持本地运行'})}`;
 frame.srcdoc=`<!doctype html><meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-inline' 'unsafe-eval'; worker-src blob:; connect-src 'none';"><script>${script.replace(/<\/script/gi,'<\\/script')}<\/script>`;
 const finish=d=>{
  const results=Array.isArray(d.results)?d.results:[]; const valid=d.ok===true && results.length===cases.length;const passed=valid?results.filter((r,i)=>mode==='custom'||(!r.undefined&&equal(r.value,cases[i].expected))).length:0;const ok=valid&&passed===cases.length;
  const label=d.timeout?'运行超时':!valid?'运行错误':mode==='custom'?'执行完成':ok?(mode==='submit'?'全部通过':'样例通过'):'答案不匹配';
  cleanup();let html=`<div class="result-heading"><b class="${ok?'pass':'fail'}">${label}</b><span>${mode==='custom'?'自定义用例':passed+' / '+cases.length+' 通过'}${valid&&Number.isFinite(d.ms)?' · '+d.ms.toFixed(2)+' ms':''}</span></div>`;
  if(!valid)html+=`<p class="error">${escape(d.error||'运行器未返回完整结果。')}</p>`;
  else html+=results.map((r,i)=>{const match=mode==='custom'||(!r.undefined&&equal(r.value,cases[i].expected));return `<details class="case" ${match?'':'open'}><summary class="${match?'pass':'fail'}">${match?'✓':'×'} 用例 ${i+1} · ${mode==='custom'?'输出':match?'通过':'未通过'}</summary><pre>输入参数：${escape(json(cases[i].args))}\n实际返回：${escape(r.undefined?'undefined':json(r.value))}${mode==='custom'?'':'\n预期返回：'+escape(json(cases[i].expected))}</pre></details>`}).join('');
  if(Array.isArray(d.logs)&&d.logs.length)html+='<details class="case"><summary>console.log 输出</summary><pre>'+escape(d.logs.slice(0,20).join('\n'))+'</pre></details>';
  if(mode==='samples'&&ok)html+='<p>样例通过了，提交判题以检查边界用例。</p>';
  $('#result').innerHTML=html;
  if(mode==='submit'){if(ok&&!state.solved.includes(p.id))state.solved.push(p.id);state.history.unshift({key:runId,id:p.id,at:Date.now(),ok,status:label,passed,total:cases.length,code});state.history=state.history.slice(0,40);save();list();if(activeTab==='history')question();}
 };
 const listener=e=>{if(e.source===frame.contentWindow&&e.data?.id===runId)finish(e.data)};
 activeRun={frame,listener,timer:setTimeout(()=>finish({ok:false,timeout:true,error:'运行器未及时响应，已停止。请重试或检查浏览器对 Worker 的支持。'}),5000)};
 window.addEventListener('message',listener);document.body.append(frame);
}
$('#editor').addEventListener('input',()=>{state.code[current.id]=$('#editor').value;save();lines()});$('#editor').addEventListener('scroll',()=>$('#lines').scrollTop=$('#editor').scrollTop);
$('#editor').addEventListener('keydown',e=>{if(e.key==='Tab'){e.preventDefault();const el=e.target;el.setRangeText('  ',el.selectionStart,el.selectionEnd,'end');el.dispatchEvent(new Event('input'));}if(e.key==='Enter'&&(e.ctrlKey||e.metaKey)){e.preventDefault();run('samples')}});
$('#query').oninput=list;$('#difficulty').onchange=list;$('#status').onchange=list;
$('#problems').onclick=e=>{const id=e.target.closest('[data-id]')?.dataset.id;const p=data.find(p=>p.id===id);if(p)select(p)};
document.querySelector('.question-tabs').onclick=e=>{if(e.target.dataset.tab){activeTab=e.target.dataset.tab;question()}};
$('#question-content').onclick=e=>{const id=e.target.closest('[data-restore]')?.dataset.restore;if(!id)return;const h=state.history.find(h=>h.key===id);if(h){if(activeRun)stop();$('#editor').value=h.code;state.code[current.id]=h.code;save();lines();}};
$('#run').onclick=()=>run('samples');$('#submit').onclick=()=>run('submit');$('#custom-run').onclick=()=>run('custom');$('#stop').onclick=()=>stop();
$('#custom-toggle').onclick=()=>{const open=$('#custom-box').hidden;$('#custom-box').hidden=!open;$('#custom-toggle').setAttribute('aria-expanded',String(open))};
$('#reset').onclick=()=>$('#reset-dialog').showModal();$('#cancel-reset').onclick=()=>$('#reset-dialog').close();$('#confirm-reset').onclick=()=>{$('#editor').value=template(current);state.code[current.id]=$('#editor').value;save();lines();$('#reset-dialog').close()};
window.addEventListener('hashchange',()=>{const p=data.find(p=>'#'+p.id===location.hash);if(p)select(p)});window.addEventListener('pagehide',cleanup);select(current);
})();
