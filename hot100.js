'use strict';
(() => {
  const data = window.HOT100_DATA;
  const $ = id => document.getElementById(id);
  const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  if (!Array.isArray(data) || data.length !== 100) {
    $('lesson').textContent = '题解数据暂未加载，请刷新页面重试。'; return;
  }
  const categories = [...new Set(data.map(p => p.category))];
  const validIds = new Set(data.map(p => String(p.id)));
  const key = 'agent-fieldnotes-hot100-v1';
  const normalize = raw => {
    const result = {done:[],star:[]};
    for (const field of ['done','star']) if (Array.isArray(raw?.[field])) {
      result[field] = [...new Set(raw[field].map(String).filter(id => validIds.has(id)))];
    }
    return result;
  };
  let saved = {done:[],star:[]};
  try { saved = normalize(JSON.parse(localStorage.getItem(key) || '{}')); }
  catch { $('storageNote').textContent = '无法读取本地进度；仍可学习并导出本次进度。'; }
  let current = data[0], method = 0, frame = 0, timer = null;
  const persist = () => { try { localStorage.setItem(key, JSON.stringify(saved)); } catch { $('storageNote').textContent='当前浏览器无法保存进度，请使用「导出进度」备份。'; } };
  const isMarked = type => saved[type].includes(String(current.id));
  const stop = () => { if (timer) clearInterval(timer); timer = null; if ($('play')) $('play').textContent = '▶ 自动播放'; };
  function visibleQuestions() {
    const q = $('search').value.trim().toLowerCase(), category = $('category').value, filter = $('filter').value;
    return data.filter(p => (!q || `${p.id} ${p.title} ${p.category}`.toLowerCase().includes(q)) && (!category || p.category === category) && (filter==='all' || (filter==='todo' ? !saved.done.includes(String(p.id)) : saved[filter].includes(String(p.id)))));
  }
  function renderCatalogue() {
    const visible = visibleQuestions();
    $('visibleCount').textContent = `${visible.length} 题`;
    $('catalogue').innerHTML = visible.length ? categories.map(category => {
      const questions = visible.filter(p => p.category===category);
      if (!questions.length) return '';
      const all = data.filter(p=>p.category===category), completed=all.filter(p=>saved.done.includes(String(p.id))).length;
      return `<div class="category-head">${escape(category)}<span>${completed} / ${all.length}</span></div>`+questions.map(p=>`<button class="question ${p.id===current.id?'active':''}" data-question="${p.id}" ${p.id===current.id?'aria-current="true"':''}><span class="qid">${p.id}</span><span class="qname">${escape(p.title)}</span>${saved.star.includes(String(p.id))?'<span class="star" aria-label="已收藏">★</span>':''}${saved.done.includes(String(p.id))?'<span class="done" aria-label="已学会">✓</span>':''}</button>`).join('');
    }).join('') : '<p class="empty">没有匹配题目。试试清空搜索或切换类型。</p>';
    $('progressText').textContent = `${saved.done.length} / 100`;
    $('progress').value = saved.done.length;
    $('progress').textContent = `${saved.done.length}%`;
  }
  function renderMethod() {
    const m=current.methods[method];
    $('methodTabs').innerHTML=current.methods.map((item,i)=>`<button type="button" role="tab" id="method-${i}" aria-controls="methodPanel" aria-selected="${i===method}" tabindex="${i===method?'0':'-1'}" data-method="${i}"><strong>${current.tiers[i]}</strong><span>${escape(item.name)}</span></button>`).join('');
    $('methodPanel').setAttribute('aria-labelledby',`method-${method}`);
    $('methodPanel').innerHTML=`<div class="complexity"><span>时间 <b>${escape(m.time)}</b></span><span>空间 <b>${escape(m.space)}</b></span></div><ol class="steps">${m.steps.map(s=>`<li>${escape(s)}</li>`).join('')}</ol><p class="reason"><strong>为什么这样做：</strong>${escape(m.reason)}</p>`;
  }
  function cell(value) {
    const hot=/\[[^\]]+\]/.test(value);
    return `<div class="cell ${hot?'hot':''}">${escape(hot ? value.replace(/\[([^\]]+)\]/g,'$1') : value)}</div>`;
  }
  function renderFrame() {
    const f=current.frames[frame], stage=$('traceStage');
    stage.className=`trace-stage kind-${current.kind}`;
    if(current.kind==='matrix') {
      const rows=f.cells.map(row=>row.trim().split(/\s+/));
      const width=rows[0].length;
      if(width>1 && rows.every(row=>row.length===width)) stage.innerHTML=`<div class="matrix-grid" style="grid-template-columns:repeat(${width},minmax(0,1fr))">${rows.flat().map(cell).join('')}</div>`;
      else stage.innerHTML=f.cells.map(cell).join('');
    } else stage.innerHTML=f.cells.map(cell).join('');
    if (f.graph) {
      const g=f.graph, byId=new Map(g.nodes.map(n=>[n.id,n]));
      const edges=g.edges.map(([a,b])=>{const x=byId.get(a),y=byId.get(b);return `<line x1="${x.x}" y1="${x.y}" x2="${y.x}" y2="${y.y}" stroke="#a8b99b" stroke-width="2"/>`;}).join('');
      const nodes=g.nodes.map(n=>`<g><circle cx="${n.x}" cy="${n.y}" r="21" fill="${g.active.includes(n.id)?'#f6d8ba':'#fffefa'}" stroke="${g.active.includes(n.id)?'#bc6939':'#91a57e'}" stroke-width="2"/><text x="${n.x}" y="${n.y+5}" text-anchor="middle" fill="#254c3c" font-size="15">${escape(n.value)}</text></g>`).join('');
      stage.insertAdjacentHTML('afterbegin',`<svg class="tree-diagram" viewBox="0 0 440 200" role="img" aria-label="示例二叉树，橙色节点表示本步关注位置"><title>示例二叉树，橙色节点表示本步关注位置</title>${edges}${nodes}</svg>`);
    }
    $('frameCaption').textContent=f.note;
    $('frameCount').textContent=`STEP ${String(frame+1).padStart(2,'0')} / ${current.frames.length}`;
    $('prevFrame').disabled=frame===0; $('nextFrame').disabled=frame===current.frames.length-1;
    $('frameDots').innerHTML=current.frames.map((_,i)=>`<button data-frame="${i}" class="${i===frame?'active':''}" aria-label="演示第${i+1}步" ${i===frame?'aria-current="step"':''}>${i+1}</button>`).join('');
  }
  function renderMarks() {
    $('markDone').setAttribute('aria-pressed',String(isMarked('done')));
    $('markDone').textContent=isMarked('done')?'✓ 已学会':'标记学会';
    $('markStar').setAttribute('aria-pressed',String(isMarked('star')));
    $('markStar').textContent=isMarked('star')?'★ 已收藏':'☆ 收藏';
  }
  function renderLesson() {
    stop(); frame=0; method=0;
    const p=current, t=p.teaching, index=data.indexOf(p), badge=p.level==='困难'?'hard':p.level==='中等'?'medium':'';
    document.title=`${p.id}. ${p.title} · Hot 100 可视化题解`;
    $('lesson').innerHTML=`<div class="lesson-top"><span class="breadcrumb">${escape(p.category)} / ${String(index+1).padStart(2,'0')} OF 100</span><div class="lesson-actions"><button class="plain-btn" id="markStar" type="button"></button><button class="plain-btn" id="markDone" type="button"></button></div></div>
    <div class="lesson-title"><h2>${p.id}. ${escape(p.title)}</h2><span class="badge ${badge}">${p.level}</span></div><a class="origin" href="${p.url}" target="_blank" rel="noopener noreferrer">查看力扣完整原题与约束 ↗</a><p class="summary">${escape(p.summary)}</p><div class="example"><strong>自编示例</strong>　${escape(p.example)}</div>
    <div class="reading-route" aria-label="本题阅读导航"><span>本题阅读路线</span><button data-section="understand">① 理解思路</button><button data-section="worked">② 手算推导</button><button data-section="solutions">③ 比较解法</button><button data-section="animation">④ 动态演示</button><button data-section="analysis">⑤ 证明与复杂度</button><button data-section="selfCheck">⑥ 自测</button></div>
    <section class="teaching-block" id="understand" tabindex="-1"><h3 class="section-title"><span class="num">01</span>先理解：为什么会想到这个方法？</h3><p>${escape(t.why)}</p><div class="state-notes"><h4>先认清变量与状态</h4><ul>${t.state.split('；').map(item=>`<li>${escape(item)}</li>`).join('')}</ul></div></section>
    <section class="teaching-block" id="worked" tabindex="-1"><h3 class="section-title"><span class="num">02</span>拿着示例，一步一步手算</h3><p class="section-note">先顺着具体数值推一遍，再把过程翻译成下方的算法步骤。</p><ol class="worked-steps">${t.walk.map((step,i)=>`<li><span class="step-index">${String(i+1).padStart(2,'0')}</span><p>${escape(step)}</p></li>`).join('')}</ol></section>
    <section class="teaching-block" id="solutions" tabindex="-1"><h3 class="section-title"><span class="num">03</span>从初级到进阶，究竟优化了什么？</h3><p class="comparison-note">${escape(t.compare)}</p><p class="section-note">按理解门槛分层；高阶不一定更快。步骤为语言无关的算法说明，基线解法会注明题设限制。</p><div class="method-tabs" role="tablist" aria-label="解法层级" id="methodTabs"></div><div class="method-panel" role="tabpanel" tabindex="0" id="methodPanel"></div>
    </section><section id="animation" tabindex="-1"><h3 class="section-title"><span class="num">04</span>让过程动起来</h3><p class="section-note">固定示例的关键状态演示 · 对应「${escape(p.traceMethod)}」；切换上方解法不会更换此演示。</p><div class="visual"><div class="visual-heading"><strong>${escape(p.traceMethod)}</strong><span id="frameCount"></span></div><div id="traceStage" role="group" aria-label="算法状态"></div><div class="frame-caption" id="frameCaption" aria-live="polite"></div><div class="player"><div class="player-buttons"><button id="prevFrame" aria-label="上一步">←</button><button id="play" class="play">▶ 自动播放</button><button id="nextFrame" aria-label="下一步">→</button><button id="resetFrame">重置</button></div><div class="frame-dots" id="frameDots" aria-label="选择演示步骤"></div></div></div>
    </section><div class="pitfall"><b>容易踩的坑</b>${escape(p.pitfall)}</div><section class="teaching-block" id="analysis" tabindex="-1"><h3 class="section-title"><span class="num">05</span>为什么正确？复杂度怎么算？</h3><div class="explain-card"><h4>正确性的关键</h4><p>${escape(t.proof)}</p></div><div class="explain-card"><h4>把时间与空间拆开算</h4><p>${escape(t.cost)}</p></div><div class="table-wrap"><table><thead><tr><th scope="col">解法</th><th scope="col">时间复杂度</th><th scope="col">空间复杂度</th></tr></thead><tbody>${p.methods.map(m=>`<tr><td>${escape(m.name)}</td><td>${escape(m.time)}</td><td>${escape(m.space)}</td></tr>`).join('')}</tbody></table></div><p class="glossary">口径：未特别注明时，空间指额外工作空间（含递归栈，不含返回结果）；表内显式注明「含输出」者按总空间。n 为输入规模，m/n 在双输入或矩阵中分别指两者长度或行列数，h 为树高，w 为最大层宽。其他符号和期望/最坏条件见对应解法说明。数值算法默认定长整数；哈希操作通常按期望 O(1) 估计。</p></section><section class="teaching-block self-check" id="selfCheck" tabindex="-1"><h3 class="section-title"><span class="num">06</span>用一个问题，检查是否真的理解</h3><p class="check-question">${escape(t.question)}</p><details class="check-answer"><summary>想好后，展开参考解释</summary><p>${escape(t.answer)}</p></details><p class="section-note">能独立解释这个问题，再尝试不看步骤写一遍；只记住答案还不等于掌握。</p></section><div class="lesson-bottom"><button id="prevQuestion" ${index===0?'disabled':''}>← ${index>0?escape(data[index-1].title):'已经是第一题'}</button><button id="nextQuestion" ${index===99?'disabled':''}>${index<99?escape(data[index+1].title):'已经是最后一题'} →</button></div><p class="practice-callout">理解以后，亲手实现一次。<a href="./practice.html">进入算法练习场 ↗</a>（基础练习题库）；本页100题可通过上方原题链接到力扣提交代码。</p>`;
    renderMethod();renderFrame();renderMarks();renderCatalogue();
  }
  function choose(id, focus=true) {
    const p=data.find(p=>p.id===Number(id)); if(!p)return;
    current=p;renderLesson();
    if(location.hash!==`#p${p.id}`) history.pushState(null,'',`#p${p.id}`);
    if(focus) {$('lesson').focus({preventScroll:true});$('lesson').scrollIntoView({behavior:'auto',block:'start'});}
  }
  function toggle(type) { const id=String(current.id); saved[type]=saved[type].includes(id)?saved[type].filter(x=>x!==id):[...saved[type],id];persist();renderMarks();renderCatalogue(); }
  $('category').insertAdjacentHTML('beforeend',categories.map(c=>`<option>${escape(c)}</option>`).join(''));
  $('search').addEventListener('input',renderCatalogue);
  $('category').addEventListener('change',renderCatalogue);
  $('filter').addEventListener('change',renderCatalogue);
  $('catalogue').addEventListener('click',event=>{const b=event.target.closest('[data-question]');if(b)choose(b.dataset.question);});
  $('lesson').addEventListener('click',event=>{
    const button=event.target.closest('button');if(!button)return;
    if(button.dataset.section){const section=$(button.dataset.section);if(section){section.scrollIntoView({behavior:'auto',block:'start'});section.focus({preventScroll:true});}return;}
    if(button.dataset.method!==undefined){method=Number(button.dataset.method);renderMethod();$(`method-${method}`).focus();return;}
    if(button.dataset.frame!==undefined){stop();frame=Number(button.dataset.frame);renderFrame();return;}
    switch(button.id){
      case 'markDone':toggle('done');break;case 'markStar':toggle('star');break;
      case 'prevFrame':stop();frame=Math.max(0,frame-1);renderFrame();break;
      case 'nextFrame':stop();frame=Math.min(current.frames.length-1,frame+1);renderFrame();break;
      case 'resetFrame':stop();frame=0;renderFrame();break;
      case 'play':if(timer){stop();break;}if(frame===current.frames.length-1)frame=0;renderFrame();button.textContent='Ⅱ 暂停';timer=setInterval(()=>{frame++;renderFrame();if(frame===current.frames.length-1)stop();},2100);break;
      case 'prevQuestion':choose(data[data.indexOf(current)-1]?.id);break;
      case 'nextQuestion':choose(data[data.indexOf(current)+1]?.id);break;
    }
  });
  $('lesson').addEventListener('keydown',event=>{if(event.target.getAttribute('role')!=='tab')return;const k=event.key;if(!['ArrowLeft','ArrowRight','Home','End'].includes(k))return;event.preventDefault();method=k==='Home'?0:k==='End'?current.methods.length-1:(method+(k==='ArrowRight'?1:-1)+current.methods.length)%current.methods.length;renderMethod();$(`method-${method}`).focus();});
  $('export').addEventListener('click',()=>{const blob=new Blob([JSON.stringify({version:1,exportedAt:new Date().toISOString(),...saved},null,2)],{type:'application/json'});const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='hot100-progress.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});
  $('import').addEventListener('click',()=>$('importFile').click());
  $('importFile').addEventListener('change',async event=>{const file=event.target.files[0];if(!file)return;try{if(file.size>100000)throw new Error();const imported=JSON.parse(await file.text());if(imported.version!==1||!Array.isArray(imported.done)||!Array.isArray(imported.star))throw new Error();const clean=normalize(imported);saved={done:[...new Set([...saved.done,...clean.done])],star:[...new Set([...saved.star,...clean.star])]};$('storageNote').textContent='已合并导入进度。';persist();renderMarks();renderCatalogue();}catch{$('storageNote').textContent='导入失败：请选择本页导出的进度 JSON 文件。';}event.target.value='';});
  function fromHash(focus=false){const match=location.hash.match(/^#p(\d+)$/);choose(match?Number(match[1]):data[0].id,focus);}
  window.addEventListener('popstate',()=>fromHash(false));
  window.addEventListener('hashchange',()=>fromHash(false));
  document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});
  const initial=Number(location.hash.match(/^#p(\d+)$/)?.[1]);
  current=data.find(p=>p.id===initial)||data[0];renderLesson();
})();
