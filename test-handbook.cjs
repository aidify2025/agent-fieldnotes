/* Run: node test-handbook.cjs (Node 18+). No dependencies/network. */
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync(__dirname+'/index.html','utf8');
const scripts=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(x=>x[1]);
assert.equal(scripts.length,3);scripts.forEach(s=>new vm.Script(s));
const ctx={window:{},structuredClone,module:{exports:{}}};vm.createContext(ctx);vm.runInContext(scripts[0],ctx);vm.runInContext(scripts[1],ctx);
const data=ctx.window.HANDBOOK,E=ctx.module.exports;
assert.equal(data.chapters.length,32);assert.equal(data.modules.length,6);
assert.equal(new Set(data.chapters.map(c=>c.id)).size,32);
for(const c of data.chapters){assert(c.why.length>90,c.id);assert(c.example.length>80,c.id);assert(c.steps.length>=4,c.id);assert(c.tests.length>=3,c.id);assert(c.sources.length>0,c.id);assert(c.code.length>100,c.id);assert(c.pitfall.length>30,c.id);for(const r of c.sources)assert(r.url.startsWith('https://'));}
let s=E.loop({max:2,fail:true},'reset');for(let i=0;i<30;i++)s=E.loop(s,'next');assert.equal(s.turn,2);assert.equal(s.status,'budget_exhausted');
s=E.loop({max:1},'reset');for(let i=0;i<5;i++)s=E.loop(s,'next');assert.equal(s.status,'completed');assert.equal(s.turn,1);
for(const idem of [true,false]){s=E.approval({idempotent:idem},'reset');s=E.approval(s,'publish');assert.equal(s.writes,0);for(const action of ['request','approve','publish','crash','resume'])s=E.approval(s,action);assert.equal(s.entries,2);assert.equal(s.writes,idem?1:2);assert.equal(s.status,'done');}
s=E.approval({},'reset');for(const action of ['request','reject','publish'])s=E.approval(s,action);assert.equal(s.writes,0);assert.equal(s.status,'rejected');
s=E.approval({},'reset');for(const action of ['request','approve','edit','publish'])s=E.approval(s,action);assert.equal(s.writes,0);assert.equal(s.approvedVersion,null);assert.equal(s.status,'paused');
assert.equal(E.reducer('keyed').items.length,2);assert.equal(E.reducer('append').items.length,3);assert(E.reducer('overwrite').error.includes('冲突'));
for(const fail of [true,false]){s=E.dag({},'reset');s.fail=fail;for(let i=0;i<12;i++){s=E.dag(s,'tick');if(s.running.some(r=>r.id==='tests'))assert(s.done.includes('api'));if(s.running.some(r=>['api','docs'].includes(r.id)))assert(s.done.includes('schema'));}assert.equal(s.done.length,fail?2:4);if(fail)assert(!s.done.includes('tests'));}
assert.equal(E.retrieval(2,false).conflict,false);assert.equal(E.retrieval(2,true).conflict,true);assert.equal(E.retrieval(3,true).recall,1);assert.equal(E.retrieval(5,true).precision,0.6);
assert.equal(E.evaluate(75).wrong,1);assert.equal(E.evaluate(85).wrong,0);assert.equal(E.evaluate(96).accepted.length,0);
for(const f of ['practice.html','hot100.html']){assert(html.includes('./'+f));assert(fs.existsSync(__dirname+'/'+f));}
assert(!html.includes('src="http'));assert(html.includes('agent-fieldnotes-handbook-v2'));
console.log('PASS: 32 chapters, 6 modules, syntax, bounded loop, approval/rejection/version invalidation, idempotent recovery, reducer semantics, DAG dependencies/failure, retrieval/eval metrics, existing entrypoints.');
