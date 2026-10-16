# python test-hot100-examples.py — execute every example against every Python approach.
# Authored examples: (arguments, expected output). Arrays encode linked lists and level-order trees.
E={
1:[([[4,1,9,7],10],[1,2]),([[5,5],10],[0,1]),([[-3,2,8],5],[0,2])],
49:[([['arc','car','rat','cra','']],[['arc','car','cra'],['rat'],['']]),([['']],[['']]),([['ab','ba','bb','b']],[['ab','ba'],['bb'],['b']])],
128:[([[8,2,1,4,3,9]],4),([[]],0),([[1,1,2]],2)],
283:[([[0,4,0,-2,7]],[4,-2,7,0,0]),([[0]],[0]),([[1,2]],[1,2])],
11:[([[2,5,3,4]],8),([[0,0]],0),([[7,7]],7)],
15:[([[-2,0,2,1,1]],[[-2,0,2],[-2,1,1]]),([[0,0,0,0]],[[0,0,0]]),([[1,2,3]],[])],
42:[([[3,0,2,0,4]],7),([[0]],0),([[5,4,3]],0)],
3:[(['abcaef'],5),([''],0),(['abba'],2)],
438:[(['abbac','ab'],[0,2]),(['a','aa'],[]),(['aaaa','aa'],[0,1,2])],
560:[([[2,-1,2],1],2),([[0,0,0],0],6),([[-1],-1],1)],
239:[([[2,1,3,0,4],3],[3,3,4]),([[7],1],[7]),([[3,3,3],2],[3,3])],
76:[(['CABEFAB','ABC'],'CAB'),(['a','aa'],''),(['BBBAAC','AAC'],'AAC')],
53:[([[-3,4,-1,2,-6]],5),([[-3,-1,-5]],-1),([[8]],8)],
56:[([[[5,8],[1,3],[2,4]]],[[1,4],[5,8]]),([[[1,4],[4,6]]],[[1,6]]),([[[0,0]]],[[0,0]])],
189:[([[1,2,3,4,5],2],[4,5,1,2,3]),([[1,2],0],[1,2]),([[1,2,3],4],[3,1,2])],
238:[([[2,3,4]],[12,8,6]),([[0,2,3]],[6,0,0]),([[0,2,0]],[0,0,0])],
41:[([[3,4,-1,1]],2),([[1,2,0]],3),([[7,8,9]],1)],
73:[([[[1,2,3],[4,0,6]]],[[1,0,3],[0,0,0]]),([[[0,2],[3,4]]],[[0,0],[0,4]]),([[[1,2]]],[[1,2]])],
54:[([[[1,2,3],[4,5,6]]],[1,2,3,6,5,4]),([[[9]]],[9]),([[[1],[2],[3]]],[1,2,3])],
48:[([[[1,2],[3,4]]],[[3,1],[4,2]]),([[[7]]],[[7]]),([[[1,2,3],[4,5,6],[7,8,9]]],[[7,4,1],[8,5,2],[9,6,3]])],
240:[([[[1,4,7],[2,5,8]],5],True),([[[1,4,7],[2,5,8]],6],False),([[[3]],3],True)],
160:[([[1,2,7,8],[3,7,8],2,1],7),([[1,2],[3,4],2,2],None),([[5,6],[5,6],0,0],5)],
206:[([[1,2,3]],[3,2,1]),([[]],[]),([[7]],[7])],
234:[([[1,2,2,1]],True),([[1,2]],False),([[7]],True)],
141:[([[1,2,3],1],True),([[1],-1],False),([[1],0],True)],
142:[([[1,2,3],1],1),([[1],-1],None),([[1],0],0)],
21:[([[1,3,5],[2,4]],[1,2,3,4,5]),([[],[]],[]),([[],[2]],[2])],
2:[([[2,4],[8,5]],[0,0,1]),([[0],[0]],[0]),([[9,9],[1]],[0,0,1])],
19:[([[1,2,3],2],[1,3]),([[7],1],[]),([[1,2],2],[2])],
24:[([[1,2,3,4]],[2,1,4,3]),([[1,2,3]],[2,1,3]),([[]],[])],
25:[([[1,2,3,4,5],2],[2,1,4,3,5]),([[1,2,3,4,5],3],[3,2,1,4,5]),([[1],1],[1])],
138:[([[[7,None],[3,0],[5,1]]],[[7,None],[3,0],[5,1]]),([[]],[]),([[[1,0]]],[[1,0]])],
148:[([[4,1,3,2]],[1,2,3,4]),([[]],[]),([[-1,2,-1]],[-1,-1,2])],
23:[([[[1,4],[2,5],[3,6]]],[1,2,3,4,5,6]),([[]],[]),([[[],[2]]],[2])],
146:[([['LRUCache','put','put','get','put','get','get'],[[2],[1,10],[2,20],[1],[3,30],[2],[3]]],[None,None,None,10,None,-1,30]),([['LRUCache','put','put','get'],[[1],[1,10],[1,11],[1]]],[None,None,None,11]),([['LRUCache','get','put','get'],[[1],[9],[2,20],[2]]],[None,-1,None,20])],
94:[([[4,2,6,1,3]],[1,2,3,4,6]),([[]],[]),([[8]],[8])],
104:[([[5,2,8,1]],3),([[]],0),([[8]],1)],
226:[([[5,2,8,1,3]],[5,8,2,None,None,3,1]),([[]],[]),([[8]],[8])],
101:[([[4,2,2,1,3,3,1]],True),([[1,2,2,None,3,None,3]],False),([[1]],True)],
543:[([[5,2,8,1,3]],3),([[1]],0),([[1,2,3,4,None,None,5]],4)],
102:[([[5,2,8,1,3]],[[5],[2,8],[1,3]]),([[]],[]),([[8]],[[8]])],
108:[([[-4,-1,2,7,9]],[2,-4,7,None,-1,None,9]),([[1]],[1]),([[1,2,3]],[2,1,3])],
98:[([[8,4,10,None,None,6,12]],False),([[5,2,8,1,3]],True),([[2,2,3]],False)],
230:[([[5,2,8,1,3],3],3),([[1],1],1),([[2,1,3],3],3)],
199:[([[5,2,8,1,3]],[5,8,3]),([[]],[]),([[1,2,None,3]],[1,2,3])],
114:[([[5,2,8,1,3]],[5,None,2,None,1,None,3,None,8]),([[]],[]),([[8]],[8])],
105:[([[5,2,1,3,8],[1,2,3,5,8]],[5,2,8,1,3]),([[-1],[-1]],[-1]),([[1,2,3],[1,2,3]],[1,None,2,None,3])],
437:[([[1,-1,1,1],1],4),([[0,0,0],0],5),([[],0],0)],
236:[([[5,2,8,1,3],2,1],2),([[5,2,8,1,3],2,8],5),([[2,1],2,1],2)],
124:[([[-5,4,8,None,None,-2,3]],11),([[-3]],-3),([[1,2,3]],6)],
200:[([[['1','1','0'],['0','1','0'],['0','0','1']]],2),([[['0']]],0),([[['1']]],1)],
994:[([[[2,1,1],[0,1,0]]],2),([[[1]]],-1),([[[0,2]]],0)],
207:[([3,[[1,0],[2,1]]],True),([2,[[1,0],[0,1]]],False),([1,[]],True)],
208:[([['Trie','insert','search','search','startsWith'],[[],['cat'],['cat'],['ca'],['ca']]],[None,None,True,False,True]),([['Trie','search','startsWith'],[[],['dog'],['d']]],[None,False,False]),([['Trie','insert','insert','search'],[[],['a'],['ab'],['a']]],[None,None,None,True])],
46:[([[2,4]],[[2,4],[4,2]]),([[3]],[[3]]),([[1,2,3]],[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]])],
78:[([[2,5]],[[],[2],[5],[2,5]]),([[0]],[[],[0]]),([[1,2,3]],[[],[1],[2],[3],[1,2],[1,3],[2,3],[1,2,3]])],
17:[(['24'],['ag','ah','ai','bg','bh','bi','cg','ch','ci']),([''],[]),(['7'],['p','q','r','s'])],
39:[([[2,4],6],[[2,2,2],[2,4]]),([[4],3],[]),([[3],6],[[3,3]])],
22:[([2],['(())','()()']),([1],['()']),([3],['((()))','(()())','(())()','()(())','()()()'])],
79:[([[['A','B'],['D','C']],'ABC'],True),([[['A','B'],['D','C']],'ABA'],False),([[['A']],'A'],True)],
131:[(['aba'],[['a','b','a'],['aba']]),(['a'],[['a']]),(['aa'],[['a','a'],['aa']])],
51:[([4],[['.Q..','...Q','Q...','..Q.'],['..Q.','Q...','...Q','.Q..']]),([1],[['Q']]),([2],[])],
35:[([[2,5,8],6],2),([[2],1],0),([[2],3],1)],
74:[([[[2,4,6],[9,12,15]],12],True),([[[2,4,6],[9,12,15]],8],False),([[[1]],0],False)],
34:[([[1,3,3,3,7],3],[1,3]),([[],0],[-1,-1]),([[2,2],2],[0,1])],
33:[([[6,8,1,3,4],3],3),([[6,8,1,3,4],7],-1),([[1],1],0)],
153:[([[4,5,1,2,3]],1),([[1,2,3]],1),([[7]],7)],
4:[([[1,4],[2]],2.0),([[1,2],[3,4]],2.5),([[],[5]],5.0)],
20:[(['([])'],True),(['([)]'],False),(['('],False)],
155:[([['MinStack','push','push','getMin','pop','top'],[[],[3],[1],[],[],[]]],[None,None,None,1,None,3]),([['MinStack','push','push','pop','getMin'],[[],[-2],[-2],[],[]]],[None,None,None,None,-2]),([['MinStack','push','top','getMin'],[[],[8],[],[]]],[None,None,8,8])],
394:[(['2[a3[b]]'],'abbbabbb'),(['3[x]y'],'xxxy'),(['abc'],'abc')],
739:[([[30,40,35,50]],[1,2,1,0]),([[50,40,30]],[0,0,0]),([[30,30]],[0,0])],
84:[([[2,1,4,5,1,3]],8),([[0]],0),([[3,3]],6)],
215:[([[3,1,5,2,4],2],4),([[5,5,1],2],5),([[7],1],7)],
347:[([[1,1,2,2,2,3],2],[1,2]),([[7],1],[7]),([[-1,-1,2,3],1],[-1])],
295:[([['MedianFinder','addNum','findMedian','addNum','findMedian'],[[],[2],[],[6],[]]],[None,None,2.0,None,4.0]),([['MedianFinder','addNum','addNum','addNum','findMedian'],[[],[-2],[1],[5],[]]],[None,None,None,None,1.0]),([['MedianFinder','addNum','addNum','findMedian'],[[],[3],[3],[]]],[None,None,None,3.0])],
121:[([[5,2,6,1,4]],4),([[5,4,3]],0),([[7]],0)],
55:[([[2,0,1,0]],True),([[1,0,2]],False),([[0]],True)],
45:[([[2,3,1,1,4]],2),([[0]],0),([[1,1,1]],2)],
763:[(['abac'],[3,1]),(['aaaa'],[4]),(['abc'],[1,1,1])],
70:[([4],5),([1],1),([2],2)],
118:[([4],[[1],[1,1],[1,2,1],[1,3,3,1]]),([1],[[1]]),([2],[[1],[1,1]])],
198:[([[3,2,5,1]],8),([[0]],0),([[2,7]],7)],
279:[([18],2),([1],1),([7],4)],
322:[([[2,5,7],11],3),([[2],3],-1),([[1],0],0)],
139:[(['redbluered',['red','blue']],True),(['aaaaab',['a','aa','aaa']],False),(['cars',['car','ca','rs']],True)],
300:[([[4,2,5,3,6]],3),([[2,2,2]],1),([[3,2,1]],1)],
152:[([[-2,3,-4,0,2]],24),([[-2]],-2),([[-2,0,-1]],0)],
416:[([[2,3,4,5]],True),([[1]],False),([[1,2,5]],False)],
32:[(['()(())('],6),([''],0),(['(()'],2)],
62:[([3,4],10),([1,1],1),([1,5],1)],
64:[([[[2,1,4],[3,2,1]]],6),([[[0]]],0),([[[1,2,3]]],6)],
5:[(['zabbay'],'abba'),(['a'],'a'),(['aaaa'],'aaaa')],
1143:[(['abdc','ac'],2),(['a','b'],0),(['abc','abc'],3)],
72:[(['cat','cuts'],2),(['',''],0),(['abc',''],3)],
136:[([[-3,8,-3,5,5]],8),([[0]],0),([[-1,0,0]],-1)],
169:[([[4,1,4,2,4]],4),([[-1]],-1),([[2,2,1]],2)],
75:[([[2,1,0,2,0]],[0,0,1,2,2]),([[0]],[0]),([[2,2,2]],[2,2,2])],
31:[([[1,4,3,2]],[2,1,3,4]),([[3,2,1]],[1,2,3]),([[1,1,5]],[1,5,1])],
287:[([[2,5,1,4,3,5]],5),([[1,1]],1),([[3,3,3,3,3]],3)]
}

import json,ast,copy
from collections import deque
from pathlib import Path

root=Path(__file__).resolve().parent
s=(root/'hot100-data.js').read_text();data=json.loads(s[s.index('['):].rstrip(';\n'))
class ListNode:
 def __init__(self,val=0,next=None):self.val,self.next=val,next
class TreeNode:
 def __init__(self,val=0,left=None,right=None):self.val,self.left,self.right=val,left,right
class Node:
 def __init__(self,val=0,next=None,random=None):self.val,self.next,self.random=val,next,random
def chain(a):
 nodes=[ListNode(v) for v in a]
 for x,y in zip(nodes,nodes[1:]):x.next=y
 return (nodes[0] if nodes else None),nodes
def vals(n):
 a=[]
 while n:a.append(n.val);n=n.next;assert len(a)<100
 return a
def tree(a):
 if not a:return None
 r=TreeNode(a[0]);q=deque([r]);i=1
 while q and i<len(a):
  n=q.popleft()
  for side in ('left','right'):
   if i>=len(a):break
   v=a[i];i+=1
   if v is not None:
    c=TreeNode(v);setattr(n,side,c);q.append(c)
 return r
def serial(r):
 out=[];q=deque([r])
 while q:
  n=q.popleft();out.append(None if n is None else n.val)
  if n:q.extend([n.left,n.right])
 while out and out[-1] is None:out.pop()
 return out
def find(r,v):
 if not r:return None
 return r if r.val==v else find(r.left,v) or find(r.right,v)
classes={146:'LRUCache',155:'MinStack',208:'Trie',295:'MedianFinder'}
trees={94,104,226,101,543,102,98,230,199,114,437,236,124}
lists={206,234,21,2,19,24,25,148}
inplace={283,189,73,48,75,31}
unordered={49,15,46,78,17,39,22,131,51,347}
def norm(i,v):
 if i not in unordered:return v
 if i==49:return sorted(sorted(x) for x in v)
 if i==347:return sorted(v)
 return sorted(v)
def execute(p,m,args):
 i=p['id'];env={'ListNode':ListNode,'TreeNode':TreeNode,'Node':Node};exec(m['python'],env)
 if i in classes:
  ops,argv=args;obj=env[classes[i]](*argv[0]);return [None]+[getattr(obj,op)(*a) for op,a in zip(ops[1:],argv[1:])]
 obj=env['Solution']();methods=[n for n in vars(env['Solution']) if not n.startswith('_')];fn=getattr(obj,methods[0]);a=copy.deepcopy(args)
 if i in trees:
  a[0]=tree(a[0])
  if i==236:a[1:]=[find(a[0],v) for v in a[1:]]
 if i in lists:
  a[0]=chain(a[0])[0]
  if i in {21,2}:a[1]=chain(a[1])[0]
 if i==23:a[0]=[chain(v)[0] for v in a[0]]
 if i==160:
  x,y,sa,sb=a;common=chain(x[sa:])[0];ha,na=chain(x[:sa]);hb,nb=chain(y[:sb]);
  if na:na[-1].next=common
  else:ha=common
  if nb:nb[-1].next=common
  else:hb=common
  got=fn(ha,hb);assert got is common;return got.val if got else None
 if i in {141,142}:
  h,ns=chain(a[0]);pos=a[1]
  if ns and pos>=0:ns[-1].next=ns[pos]
  got=fn(h)
  return got if i==141 else (ns.index(got) if got else None)
 if i==138:
  ns=[Node(v) for v,_ in a[0]]
  for j,n in enumerate(ns):n.next=ns[j+1] if j+1<len(ns) else None;n.random=ns[a[0][j][1]] if a[0][j][1] is not None else None
  got=fn(ns[0] if ns else None);copies=[]
  while got:assert got not in ns;copies.append(got);got=got.next
  return [[n.val,copies.index(n.random) if n.random else None] for n in copies]
 got=fn(*a)
 if i in inplace:return a[0]
 if i==114:return serial(a[0])
 if i in {226,105,108}:return serial(got)
 if i==236:return got.val
 if i in lists-{234} or i==23:return vals(got)
 return got
checks=0
for p in data:
 assert len(E[p['id']])>=3
 for m in p['methods']:
  for args,expected in E[p['id']]:
   got=execute(p,m,args)
   assert norm(p['id'],got)==norm(p['id'],expected),(p['id'],m['key'],args,got,expected)
   checks+=1
print('PASS',checks,'method/example executions')
