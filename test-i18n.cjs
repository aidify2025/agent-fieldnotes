/* node test-i18n.cjs — dependency-free bilingual regression checks. */
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const read=n=>fs.readFileSync(__dirname+'/'+n,'utf8');
const scripts=h=>[...h.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
function dataset(file,key){const s=scripts(read(file)).find(x=>x.includes('window.'+key+' ='));assert(s,file+' dataset missing');const c={window:{}};vm.createContext(c);vm.runInContext(s,c);return JSON.parse(JSON.stringify(c.window[key]));}
function datafile(file,key){const c={window:{}};vm.createContext(c);vm.runInContext(read(file),c);return JSON.parse(JSON.stringify(c.window[key]));}
function strings(o,fn){if(typeof o==='string')fn(o);else if(o&&typeof o==='object')Object.values(o).forEach(x=>strings(x,fn));}
for(const name of ['index','hot100','practice']){
 const zh=read(name+'.html'),en=read(name+'-en.html');
 assert(en.includes('<html lang="en">'));assert(zh.includes('<html lang="zh-CN">'));
 for(const h of [zh,en]){assert(h.includes('data-language="zh"'));assert(h.includes('data-language="en"'));assert(h.includes('agent-fieldnotes-language'));assert(h.includes('u.hash=location.hash'));scripts(h).forEach(s=>new vm.Script(s));}
 // User-facing English code and content have no untranslated CJK strings, except the language selector.
 const stripped=en.replace(/<nav class="language-switch"[\s\S]*?<\/nav>/g,'');assert(!/[\u3400-\u9fff]/.test(stripped),name+' untranslated text');
}
const zh=dataset('index.html','HANDBOOK'),en=dataset('index-en.html','HANDBOOK');assert.equal(en.chapters.length,32);assert.deepEqual(en.chapters.map(c=>c.id),zh.chapters.map(c=>c.id));
for(let i=0;i<32;i++){const a=zh.chapters[i],b=en.chapters[i];assert.equal(a.steps.length,b.steps.length);assert.equal(a.tests.length,b.tests.length);assert.equal(a.lab,b.lab);assert.deepEqual(a.sources.map(x=>x.url),b.sources.map(x=>x.url));assert(b.why.length>100);}
const hzh=datafile('hot100-data.js','HOT100_DATA'),hen=dataset('hot100-en.html','HOT100_DATA');assert.equal(hen.length,100);assert.equal(new Set(hen.map(x=>x.category)).size,17);
for(let i=0;i<100;i++){const a=hzh[i],b=hen[i];assert.equal(a.id,b.id);assert.equal(a.slug,b.slug);assert.equal(a.methods.length,b.methods.length);assert.equal(a.frames.length,b.frames.length);assert.equal(a.teaching.walk.length,b.teaching.walk.length);assert(b.teaching.why.length>40);assert(['Easy','Medium','Hard'].includes(b.level));assert(b.url.includes('leetcode.com/problems/'));}
const pzh=datafile('problems.js','PRACTICE_PROBLEMS'),pen=dataset('practice-en.html','PRACTICE_PROBLEMS');assert.equal(pen.length,8);
for(let i=0;i<8;i++){const a=pzh[i],b=pen[i];assert.equal(a.id,b.id);assert.equal(a.fn,b.fn);assert.equal(a.params,b.params);assert.deepEqual(a.tests,b.tests);assert.equal(a.solution,b.solution);const fn=new Function(b.solution+';return '+b.fn)();for(const t of b.tests)assert.deepEqual(fn(...structuredClone(t.args)),t.expected);}
// Run translated state engines too: string-localization must not alter branching.
const c={window:{},module:{exports:{}},structuredClone};vm.createContext(c);vm.runInContext(scripts(read('index-en.html')).find(x=>x.includes('const Engines =')),c);const E=c.module.exports;
let s=E.approval({},'reset');for(const a of ['request','approve','publish','crash','resume'])s=E.approval(s,a);assert.equal(s.writes,1);assert.equal(s.entries,2);assert.equal(s.status,'done');
s=E.loop({max:2,fail:true},'reset');for(let i=0;i<30;i++)s=E.loop(s,'next');assert.equal(s.status,'budget_exhausted');assert.equal(s.turn,2);
console.log('PASS: 3 bilingual page pairs; 32 chapters; 100 full lessons / 17 categories; 8 unchanged exercise test suites; syntax, language links, stable IDs and translated lab logic.');
