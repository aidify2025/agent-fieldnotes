/* Original bilingual Hot 100 lessons. Stable IDs preserve existing progress. */
window.HOT100_DATA = [
  {
    "id": 1,
    "statement": {
      "zh": "给定整数数组 nums 和目标 target，找出两个不同下标，使对应元素相加等于 target，返回这两个下标，顺序不限。每个输入恰好只有一对合法下标；不能重复使用同一位置。",
      "en": "Return two distinct indices in nums whose values add to target. Each input has exactly one valid pair; either index order is accepted. An index cannot be reused."
    },
    "constraints": {
      "zh": [
        "2 ≤ n ≤ 10⁴",
        "−10⁹ ≤ nums[i], target ≤ 10⁹",
        "恰好存在一组合法下标"
      ],
      "en": [
        "2 ≤ n ≤ 10⁴",
        "−10⁹ ≤ nums[i], target ≤ 10⁹",
        "Exactly one index pair is valid"
      ]
    },
    "example": {
      "zh": "nums=[4,1,9,7], target=10 → [1,2]。只有 1+9 满足条件。",
      "en": "nums=[4,1,9,7], target=10 → [1,2]. Only 1+9 reaches the target."
    },
    "methods": [
      {
        "key": "pairs",
        "name": {
          "zh": "枚举所有下标对（基线）",
          "en": "Enumerate index pairs (baseline)"
        },
        "intuition": {
          "zh": "先固定第一个位置 i，再在它后面寻找第二个位置 j。限制 j>i 同时解决了“不能用同一元素”和“同一对不要重复检查”两件事。这个方法不缓存任何信息，适合先确认问题到底返回数值还是下标。",
          "en": "Fix the first position i, then try every j after it. Requiring j>i prevents self-pairing and avoids checking the same unordered pair twice. This direct baseline makes the distinction between returning values and returning indices explicit."
        },
        "steps": {
          "zh": [
            "外层枚举 i，内层从 i+1 开始。",
            "计算 nums[i]+nums[j] 并与 target 比较。",
            "一旦相等立即返回下标；唯一解保证不必继续。"
          ],
          "en": [
            "Enumerate i and start j at i+1.",
            "Compare the pair sum with target.",
            "Return the indices immediately on equality; uniqueness removes any need to keep searching."
          ]
        },
        "correctness": {
          "zh": "每个由不同下标构成的无序对都恰好被访问一次，所以合法对一定能被找到。",
          "en": "Every unordered pair of different indices is visited exactly once, so the valid pair cannot be missed."
        },
        "time": "O(n²)",
        "space": "O(1)",
        "complexity": {
          "zh": "最多检查 n(n−1)/2 对，只保存两个循环变量；返回的两个下标为常数空间。大输入推荐哈希法。",
          "en": "There are n(n−1)/2 possible pairs and only constant working state. The two-index result is constant-sized. Prefer hashing for large inputs."
        },
        "python": "class Solution:\n    def twoSum(self, nums, target):\n        for i in range(len(nums)):\n            for j in range(i + 1, len(nums)):\n                if nums[i] + nums[j] == target:\n                    return [i, j]\n        return []",
        "java": "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        for (int i=0; i<nums.length; i++)\n            for (int j=i+1; j<nums.length; j++)\n                if (nums[i]+nums[j]==target) return new int[]{i,j};\n        return new int[0];\n    }\n}",
        "trace": [
          {
            "cells": [
              "i=0",
              "4+1=5",
              "4+9=13",
              "4+7=11"
            ],
            "note": {
              "zh": "固定下标 0 的三个候选都不是 10。",
              "en": "All three pairs using index 0 miss 10."
            }
          },
          {
            "cells": [
              "i=1",
              "j=2",
              "1+9=10"
            ],
            "note": {
              "zh": "固定下标 1 后，第一个候选就命中。",
              "en": "With index 1 fixed, the first candidate matches."
            }
          },
          {
            "cells": [
              "answer=[1,2]"
            ],
            "note": {
              "zh": "返回下标，不是数值 [1,9]。",
              "en": "Return indices, not the values [1,9]."
            }
          }
        ]
      },
      {
        "key": "hash",
        "name": {
          "zh": "哈希表寻找已出现的补数",
          "en": "Hash previously seen complements"
        },
        "intuition": {
          "zh": "读到 x 时，不再向后反复搜索，而是问“此前是否出现 target−x”。表里存值到下标的映射，才能输出位置。必须先查询再插入：处理 [5,5] 时，第一个 5 先入表，第二个 5 才能与它配对，不能让当前元素命中自己。",
          "en": "When x arrives, ask whether target−x appeared earlier instead of searching the remaining suffix. Store an index for each value because the result requires positions. Query before inserting: in [5,5], the first 5 is stored and the second matches it, rather than matching itself."
        },
        "steps": {
          "zh": [
            "初始化空映射 seen。",
            "读取下标 i 的 x，若 seen 含 target−x，返回旧下标与 i。",
            "否则记录 seen[x]=i，继续向右扫描。"
          ],
          "en": [
            "Start with an empty seen map.",
            "At index i, return the stored complement index and i if target−x exists.",
            "Otherwise store seen[x]=i and continue."
          ]
        },
        "correctness": {
          "zh": "查询时映射仅包含更早的位置。任意合法对的后一个元素被扫描时，前一个必在表中；因此既不自配对，也不漏解。",
          "en": "At lookup time the map contains only earlier positions. When the later member of the valid pair is reached, its partner is already stored, so the algorithm finds a distinct-index pair."
        },
        "time": "O(n) expected",
        "space": "O(n)",
        "complexity": {
          "zh": "扫描一次，哈希插入与查询期望 O(1)；最多记录 n 个值。哈希碰撞严重时不承诺严格线性。",
          "en": "One pass performs expected constant-time hash operations, storing at most n values. Pathological collisions are outside the expected linear bound."
        },
        "python": "class Solution:\n    def twoSum(self, nums, target):\n        seen = {}\n        for i, x in enumerate(nums):\n            if target - x in seen:\n                return [seen[target - x], i]\n            seen[x] = i\n        return []",
        "java": "import java.util.*;\nclass Solution {\n    public int[] twoSum(int[] nums, int target) {\n        Map<Integer,Integer> seen=new HashMap<>();\n        for(int i=0;i<nums.length;i++) {\n            Integer j=seen.get(target-nums[i]);\n            if(j!=null) return new int[]{j,i};\n            seen.put(nums[i],i);\n        }\n        return new int[0];\n    }\n}",
        "trace": [
          {
            "cells": [
              "x=4",
              "need=6",
              "seen={4:0}"
            ],
            "note": {
              "zh": "补数不存在，记录 4 的位置。",
              "en": "The complement is absent; store the position of 4."
            }
          },
          {
            "cells": [
              "x=1",
              "need=9",
              "seen={4:0,1:1}"
            ],
            "note": {
              "zh": "9 还没出现，继续保存当前值。",
              "en": "9 has not appeared; store the current value."
            }
          },
          {
            "cells": [
              "x=9",
              "need=1",
              "answer=[1,2]"
            ],
            "note": {
              "zh": "表中 1 来自下标 1，与当前下标 2 配对。",
              "en": "Stored 1 comes from index 1 and pairs with current index 2."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/two-sum/"
      }
    ],
    "slug": "two-sum",
    "title": {
      "zh": "两数之和",
      "en": "Two Sum"
    },
    "category": {
      "zh": "哈希",
      "en": "Hashing"
    },
    "level": {
      "zh": "简单",
      "en": "Easy"
    }
  },
  {
    "id": 49,
    "statement": {
      "zh": "把 strs 中只改变字符排列就能互相得到的单词放入同一组。保留原字符串及重复项；组的顺序和组内顺序均不限，空字符串也需要分组。",
      "en": "Partition strs by character multiplicities: strings belong together when rearranging one produces the other. Preserve original strings and duplicates. Group order and within-group order are unrestricted; empty strings are valid."
    },
    "constraints": {
      "zh": [
        "1 ≤ 单词数 n ≤ 10⁴",
        "0 ≤ 每个单词长度 ≤ 100",
        "仅包含小写英文字母"
      ],
      "en": [
        "1 ≤ word count n ≤ 10⁴",
        "Each word has 0–100 characters",
        "Only lowercase English letters"
      ]
    },
    "example": {
      "zh": "[\"arc\",\"car\",\"rat\",\"cra\",\"\"] → [[\"arc\",\"car\",\"cra\"],[\"rat\"],[\"\"]]",
      "en": "[\"arc\",\"car\",\"rat\",\"cra\",\"\"] → [[\"arc\",\"car\",\"cra\"],[\"rat\"],[\"\"]]"
    },
    "methods": [
      {
        "key": "sorted-key",
        "name": {
          "zh": "排序签名分组",
          "en": "Group by a sorted signature"
        },
        "intuition": {
          "zh": "异位词忽略排列，但不能忽略重复次数。把字符排序后，所有排列都会落到同一个规范字符串。例如 arc、car、cra 都得到 acr；把这个签名作为字典键，值存原单词列表，而不是排序后的词。",
          "en": "Anagrams ignore ordering but retain multiplicities. Sorting produces a canonical signature: arc, car and cra all become acr. Use that signature as a dictionary key, storing the original words rather than their sorted forms."
        },
        "steps": {
          "zh": [
            "对每个 word 排序字符，生成 key。",
            "若 key 首次出现，建立空分组。",
            "将原 word 加入该组，最后返回所有组。"
          ],
          "en": [
            "Sort the characters of each word to make a key.",
            "Create a group when the key first appears.",
            "Append the original word and finally return all groups."
          ]
        },
        "correctness": {
          "zh": "两个字符串排序结果相同，当且仅当每个字符出现次数相同，所以按签名分组正好对应异位词关系。",
          "en": "Equal sorted signatures are equivalent to equal character multiplicities, exactly the anagram relation."
        },
        "time": "O(n·(k log(k+1)+1))",
        "space": "O(nk+n)",
        "complexity": {
          "zh": "n 为单词数，k 为最大长度。每词排序并生成键；映射最坏保存 n 个长度 k 的键和 n 个引用。原字符串未复制；计入返回列表仍为该上界。",
          "en": "n is the word count and k the maximum length. Sorting and building each key dominate time. Up to n keys of length k and n references are stored; original strings are not copied. The bound includes result lists."
        },
        "python": "class Solution:\n    def groupAnagrams(self, strs):\n        groups = {}\n        for word in strs:\n            key = ''.join(sorted(word))\n            groups.setdefault(key, []).append(word)\n        return list(groups.values())",
        "java": "import java.util.*;\nclass Solution {\n    public List<List<String>> groupAnagrams(String[] strs) {\n        Map<String,List<String>> groups=new HashMap<>();\n        for(String word:strs) {\n            char[] chars=word.toCharArray();\n            Arrays.sort(chars);\n            String key=new String(chars);\n            groups.computeIfAbsent(key,k->new ArrayList<>()).add(word);\n        }\n        return new ArrayList<>(groups.values());\n    }\n}",
        "trace": [
          {
            "cells": [
              "arc → acr",
              "car → acr"
            ],
            "note": {
              "zh": "不同排列生成相同排序键。",
              "en": "Different permutations produce the same sorted key."
            }
          },
          {
            "cells": [
              "rat → art",
              "cra → acr"
            ],
            "note": {
              "zh": "rat 新建一组，cra 加入 acr 组。",
              "en": "rat starts another group; cra joins acr."
            }
          },
          {
            "cells": [
              "acr:arc,car,cra",
              "art:rat",
              "\"\":\"\""
            ],
            "note": {
              "zh": "空字符串的键仍为空，独立成组。",
              "en": "The empty string has an empty key and its own group."
            }
          }
        ]
      },
      {
        "key": "frequency-key",
        "name": {
          "zh": "26 维频次签名",
          "en": "Group by 26 letter counts"
        },
        "intuition": {
          "zh": "题目把字符集限制为 26 个小写字母，因此没有必要比较字符的顺序。逐字计数后，用完整的 26 维向量标识一个组。Python 用不可变元组；Java 用带 # 分隔的计数字符串，避免 1、11 和 11、1 都拼成 111。",
          "en": "The alphabet has only 26 lowercase letters, so sorting is unnecessary. Count each letter and use the full 26-dimensional vector as the signature. Python uses an immutable tuple; Java separates counts with # so distinct count sequences cannot collapse into the same key."
        },
        "steps": {
          "zh": [
            "创建 26 个零计数，扫描单词逐项加一。",
            "把完整计数转为无歧义、可哈希的键。",
            "按键追加原单词，返回所有分组。"
          ],
          "en": [
            "Initialize 26 zero counts and increment them while scanning a word.",
            "Convert the complete vector into an unambiguous hashable key.",
            "Append the original word to that key’s group and return the groups."
          ]
        },
        "correctness": {
          "zh": "计数向量相同等价于字符及其重数完全一致；签名包含全部 26 个位置，不会遗漏缺席字符或重复字符。",
          "en": "Equal vectors mean every letter has the same multiplicity. Encoding all 26 positions preserves both absent and repeated letters."
        },
        "time": "O(n·(k+26)) expected",
        "space": "O(26n+n)",
        "complexity": {
          "zh": "每个字符计数一次、每词处理 26 个计数。题目限制每词至多 100 字符，Java 计数编码长度有界；保存最多 n 个签名和 n 个原词引用，未复制原字符串。",
          "en": "Count each character once and process 26 counts per word. With words limited to 100 characters, Java count encodings have bounded length. Store at most n signatures and n original-string references without copying the strings."
        },
        "python": "class Solution:\n    def groupAnagrams(self, strs):\n        groups = {}\n        for word in strs:\n            counts = [0] * 26\n            for ch in word:\n                counts[ord(ch) - ord('a')] += 1\n            key = tuple(counts)\n            groups.setdefault(key, []).append(word)\n        return list(groups.values())",
        "java": "import java.util.*;\nclass Solution {\n    public List<List<String>> groupAnagrams(String[] strs) {\n        Map<String,List<String>> groups=new HashMap<>();\n        for(String word:strs) {\n            int[] count=new int[26];\n            for(int i=0;i<word.length();i++) count[word.charAt(i)-'a']++;\n            StringBuilder key=new StringBuilder();\n            for(int v:count) key.append('#').append(v);\n            groups.computeIfAbsent(key.toString(),k->new ArrayList<>()).add(word);\n        }\n        return new ArrayList<>(groups.values());\n    }\n}",
        "trace": [
          {
            "cells": [
              "arc:a1,c1,r1",
              "car:a1,c1,r1"
            ],
            "note": {
              "zh": "这两个词的 26 项计数完全相同。",
              "en": "Their complete 26-entry count vectors match."
            }
          },
          {
            "cells": [
              "rat:a1,r1,t1",
              "cra:a1,c1,r1"
            ],
            "note": {
              "zh": "计数保留字符种类，t 与 c 不会混淆。",
              "en": "Counts distinguish t from c, so rat has a different key."
            }
          },
          {
            "cells": [
              "G1=arc,car,cra",
              "G2=rat",
              "G3=\"\""
            ],
            "note": {
              "zh": "全零向量对应空字符串组。",
              "en": "The all-zero vector identifies the empty-string group."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/group-anagrams/"
      }
    ],
    "slug": "group-anagrams",
    "title": {
      "zh": "字母异位词分组",
      "en": "Group Anagrams"
    },
    "category": {
      "zh": "哈希",
      "en": "Hashing"
    },
    "level": {
      "zh": "中等",
      "en": "Medium"
    }
  },
  {
    "id": 128,
    "statement": {
      "zh": "在未排序的 nums 中，选择若干数构成整数值逐一递增 1 的最长序列，返回长度；这些数在原数组中不必相邻，重复值不会延长序列。题目要求线性时间算法，空数组返回 0。",
      "en": "Find the longest run of consecutive integer values present in unsorted nums. Positions need not be adjacent, and duplicates do not extend a run. Return its length, or zero for an empty array. A linear-time algorithm is required."
    },
    "constraints": {
      "zh": [
        "0 ≤ n ≤ 10⁵",
        "−10⁹ ≤ nums[i] ≤ 10⁹",
        "要求 O(n) 时间"
      ],
      "en": [
        "0 ≤ n ≤ 10⁵",
        "−10⁹ ≤ nums[i] ≤ 10⁹",
        "Required time: O(n)"
      ]
    },
    "example": {
      "zh": "[8,2,1,4,3,9] → 4，对应 1,2,3,4。",
      "en": "[8,2,1,4,3,9] → 4, from the run 1,2,3,4."
    },
    "methods": [
      {
        "key": "sort-baseline",
        "name": {
          "zh": "排序扫描（理解基线，不满足线性要求）",
          "en": "Sort and scan (baseline; not linear)"
        },
        "intuition": {
          "zh": "排序后相差 1 的值会相邻，因此可以像统计连续相等段一样统计连续整数段。遇到重复数时跳过，遇到断层才重置长度。它易理解，但排序成本不满足本题 O(n) 要求，应继续学习哈希法。",
          "en": "Sorting makes consecutive values adjacent, allowing a run counter. Ignore duplicates and reset only when a genuine gap appears. This is an explanatory baseline; its sorting cost does not satisfy the problem’s linear-time requirement."
        },
        "steps": {
          "zh": [
            "复制并排序，空数组直接返回 0。",
            "相同值跳过；相差 1 则延长，否则重新从长度 1 开始。",
            "不断记录历史最长长度。"
          ],
          "en": [
            "Copy and sort; return zero for an empty input.",
            "Skip equal neighbors, extend on a difference of one, otherwise reset to one.",
            "Track the largest run length."
          ]
        },
        "correctness": {
          "zh": "排序将每个连续值集合聚在一起，重复值被忽略，断层恰好划分不同序列。",
          "en": "Sorting places every consecutive run together; ignoring duplicates and splitting at gaps counts precisely those runs."
        },
        "time": "O(n log n)",
        "space": "O(n)",
        "complexity": {
          "zh": "复制数组需要 O(n)；排序主导时间，扫描 O(n)。此实现不改变输入。",
          "en": "The copied array uses O(n) space; sorting dominates the O(n) scan. The input is left unchanged."
        },
        "python": "class Solution:\n    def longestConsecutive(self, nums):\n        if not nums:\n            return 0\n        a = sorted(nums)\n        run = best = 1\n        for i in range(1, len(a)):\n            if a[i] == a[i-1]:\n                continue\n            run = run + 1 if a[i] == a[i-1] + 1 else 1\n            best = max(best, run)\n        return best",
        "java": "import java.util.*;\nclass Solution {\n    public int longestConsecutive(int[] nums) {\n        if(nums.length==0) return 0;\n        int[] a=nums.clone(); Arrays.sort(a);\n        int run=1,best=1;\n        for(int i=1;i<a.length;i++) {\n            if(a[i]==a[i-1]) continue;\n            run=a[i]==a[i-1]+1 ? run+1 : 1;\n            best=Math.max(best,run);\n        }\n        return best;\n    }\n}",
        "trace": [
          {
            "cells": [
              "[1,2,3,4,8,9]"
            ],
            "note": {
              "zh": "排序副本使连续整数相邻。",
              "en": "The sorted copy makes consecutive integers adjacent."
            }
          },
          {
            "cells": [
              "1→2→3→4",
              "run=4",
              "best=4"
            ],
            "note": {
              "zh": "相差 1 时持续增加段长。",
              "en": "Extend the run whenever the difference is one."
            }
          },
          {
            "cells": [
              "8→9",
              "run=2",
              "best=4"
            ],
            "note": {
              "zh": "4 到 8 出现断层，重新计数后仍保留最大 4。",
              "en": "The gap from 4 to 8 resets the run; best remains 4."
            }
          }
        ]
      },
      {
        "key": "set-start",
        "name": {
          "zh": "只从序列起点扩展",
          "en": "Expand only from run starts"
        },
        "intuition": {
          "zh": "集合既去重又支持快速查找。关键不是“对每个数向右找”，而是只在 x−1 不存在时，从 x 向右扩展；否则它属于某个更早起点的序列。这样 [1,2,3,4] 不会分别从 1、2、3、4 重复扫描。",
          "en": "A set removes duplicates and supports fast membership checks. Expand from x only if x−1 is absent; otherwise x belongs to a run that has an earlier start. This avoids rescanning [1,2,3,4] separately from 1, 2, 3 and 4."
        },
        "steps": {
          "zh": [
            "把所有值放入集合。",
            "遍历集合；有前驱 x−1 的值跳过。",
            "从真正起点不断查 x+1、x+2，记录最长长度。"
          ],
          "en": [
            "Insert all values into a set.",
            "Skip a value if its predecessor is present.",
            "From each true start, follow successive values and record the longest run."
          ]
        },
        "correctness": {
          "zh": "每个非空连续段有唯一最小值，只有它启动扩展。所有值被其所属段扫描一次，不同段不重叠，所以不会漏段或重复累计工作。",
          "en": "Every run has one smallest value, and only that value starts expansion. Runs partition the set, so all values are covered once by the expansions."
        },
        "time": "O(n) expected",
        "space": "O(n)",
        "complexity": {
          "zh": "外层遍历去重集合，所有内层扩展总计不超过不同值数量；不是每个外层都扫描 n 项。哈希操作期望 O(1)。",
          "en": "The outer pass visits distinct values and all inner expansions together visit at most that many values. Expected constant-time hash operations yield linear expected time."
        },
        "python": "class Solution:\n    def longestConsecutive(self, nums):\n        values = set(nums)\n        best = 0\n        for x in values:\n            if x - 1 not in values:\n                y = x\n                while y in values:\n                    y += 1\n                best = max(best, y - x)\n        return best",
        "java": "import java.util.*;\nclass Solution {\n    public int longestConsecutive(int[] nums) {\n        Set<Integer> values=new HashSet<>();\n        for(int x:nums) values.add(x);\n        int best=0;\n        for(int x:values) if(!values.contains(x-1)) {\n            int y=x;\n            while(values.contains(y)) y++;\n            best=Math.max(best,y-x);\n        }\n        return best;\n    }\n}",
        "trace": [
          {
            "cells": [
              "S={1,2,3,4,8,9}",
              "starts={1,8}"
            ],
            "note": {
              "zh": "只有 1 和 8 没有前驱；集合遍历次序无关。",
              "en": "Only 1 and 8 lack predecessors; set iteration order does not matter."
            }
          },
          {
            "cells": [
              "1→2→3→4",
              "5 absent",
              "length=4"
            ],
            "note": {
              "zh": "从 1 扩到 5 缺席为止。",
              "en": "Expand from 1 until missing value 5."
            }
          },
          {
            "cells": [
              "8→9",
              "10 absent",
              "best=4"
            ],
            "note": {
              "zh": "另一个序列长度 2，返回两段最大长度。",
              "en": "The other run has length 2; return the larger length."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/longest-consecutive-sequence/"
      }
    ],
    "slug": "longest-consecutive-sequence",
    "title": {
      "zh": "最长连续序列",
      "en": "Longest Consecutive Sequence"
    },
    "category": {
      "zh": "哈希",
      "en": "Hashing"
    },
    "level": {
      "zh": "中等",
      "en": "Medium"
    }
  },
  {
    "id": 283,
    "statement": {
      "zh": "直接修改 nums，把所有零移到末尾，并保持非零元素之间原有的先后顺序。不能另建数组作为结果；函数无需返回新数组。",
      "en": "Modify nums in place so all zeros come last while nonzero values keep their relative order. Do not construct a replacement array; the operation returns no new array."
    },
    "constraints": {
      "zh": [
        "1 ≤ n ≤ 10⁴",
        "元素为有符号 32 位整数",
        "必须原地，非零元素稳定有序"
      ],
      "en": [
        "1 ≤ n ≤ 10⁴",
        "Signed 32-bit integer values",
        "In-place, preserving nonzero order"
      ]
    },
    "example": {
      "zh": "[0,4,0,-2,7] → [4,-2,7,0,0]",
      "en": "[0,4,0,-2,7] → [4,-2,7,0,0]"
    },
    "methods": [
      {
        "key": "compact",
        "name": {
          "zh": "先压紧非零项，再补零",
          "en": "Compact nonzeros, then fill zeros"
        },
        "intuition": {
          "zh": "write 表示下一个非零元素应写入的位置。read 从左到右扫描，遇到非零才写入前缀。write 永远不超过 read，因此写入不会破坏尚未读取的数据；扫描完后，后缀里的旧值已无用，统一填零。",
          "en": "write is the destination of the next nonzero value. Read left to right and copy nonzeros into the prefix. Since write never passes read, no unread data is overwritten. Once scanning ends, the remaining suffix can safely be zero-filled."
        },
        "steps": {
          "zh": [
            "write=0，逐项扫描。",
            "遇到非零值写入 nums[write]，write 加一。",
            "把从 write 到末尾的位置全部设为零。"
          ],
          "en": [
            "Set write=0 and scan the array.",
            "Write each nonzero to nums[write] and advance write.",
            "Fill every remaining position with zero."
          ]
        },
        "correctness": {
          "zh": "处理任意前缀后，nums[:write] 恰好是该前缀中按原顺序排列的非零值；最后补零恢复总长度且不改变前缀。",
          "en": "After every processed prefix, nums[:write] is exactly its nonzeros in original order. Filling the suffix preserves that prefix and restores the required zero count."
        },
        "time": "O(n)",
        "space": "O(1)",
        "complexity": {
          "zh": "扫描 n 项，写非零及补零总共 n 次写入；只有下标变量，没有切片或副本。",
          "en": "The scan reads n values and the two writing phases total n writes. Only indices are stored; no slices or copies are used."
        },
        "python": "class Solution:\n    def moveZeroes(self, nums):\n        write = 0\n        for read in range(len(nums)):\n            if nums[read] != 0:\n                nums[write] = nums[read]\n                write += 1\n        while write < len(nums):\n            nums[write] = 0\n            write += 1",
        "java": "class Solution {\n    public void moveZeroes(int[] nums) {\n        int write=0;\n        for(int read=0;read<nums.length;read++)\n            if(nums[read]!=0) nums[write++]=nums[read];\n        while(write<nums.length) nums[write++]=0;\n    }\n}",
        "trace": [
          {
            "cells": [
              "read=1",
              "write=1",
              "[4,4,0,-2,7]"
            ],
            "note": {
              "zh": "把 4 写到首位；旧位置稍后会被覆盖。",
              "en": "Copy 4 to the first slot; its old copy will be overwritten later."
            }
          },
          {
            "cells": [
              "read=4",
              "write=3",
              "[4,-2,7,-2,7]"
            ],
            "note": {
              "zh": "非零项已按原顺序压到前三位。",
              "en": "All nonzeros are compacted into the first three slots in order."
            }
          },
          {
            "cells": [
              "[4,-2,7,0,0]"
            ],
            "note": {
              "zh": "把 write 后的两个位置补零。",
              "en": "Fill the two remaining slots with zero."
            }
          }
        ]
      },
      {
        "key": "swap",
        "name": {
          "zh": "非零项与首个空位交换",
          "en": "Swap into the earliest zero slot"
        },
        "intuition": {
          "zh": "维护已完成的非零前缀，以及 write 到 read 之间全是零的区域。遇到非零值时，与 write 交换，零自然被送到后方，不需要第二次补零。read==write 时无需交换，因此没有零的数组可以完全不写入。",
          "en": "Maintain a finished nonzero prefix and an all-zero region between write and read. Swapping a newly encountered nonzero into write moves a zero backward automatically, eliminating the fill pass. Skip the swap when read==write, so an already zero-free array needs no writes."
        },
        "steps": {
          "zh": [
            "write=0，从左往右检查 read。",
            "若当前值非零且 read≠write，交换两位置。",
            "对每个非零值都推进 write；零仅推进 read。"
          ],
          "en": [
            "Start write at zero and scan with read.",
            "For a nonzero with read≠write, swap the two positions.",
            "Advance write for each nonzero; zeros advance only the scan."
          ]
        },
        "correctness": {
          "zh": "交换前 write..read−1 全为零，交换不会打乱已经完成的非零前缀；新非零总被追加在其后，故稳定。",
          "en": "Before each swap the gap contains only zeros. Appending the next nonzero after the finished prefix preserves its order and keeps the remaining gap zero-filled."
        },
        "time": "O(n)",
        "space": "O(1)",
        "complexity": {
          "zh": "每个元素检查一次，每个需移动的非零最多一次交换；三个临时整数即可。",
          "en": "One inspection per element and at most one swap per moved nonzero; only constant temporary state is needed."
        },
        "python": "class Solution:\n    def moveZeroes(self, nums):\n        write = 0\n        for read in range(len(nums)):\n            if nums[read] != 0:\n                if read != write:\n                    nums[write], nums[read] = nums[read], nums[write]\n                write += 1",
        "java": "class Solution {\n    public void moveZeroes(int[] nums) {\n        int write=0;\n        for(int read=0;read<nums.length;read++) if(nums[read]!=0) {\n            if(read!=write) {int t=nums[write]; nums[write]=nums[read]; nums[read]=t;}\n            write++;\n        }\n    }\n}",
        "trace": [
          {
            "cells": [
              "read=1",
              "[4,0,0,-2,7]"
            ],
            "note": {
              "zh": "4 与最早的零交换。",
              "en": "Swap 4 with the earliest zero."
            }
          },
          {
            "cells": [
              "read=3",
              "[4,-2,0,0,7]"
            ],
            "note": {
              "zh": "−2 追加到非零前缀，零仍留在后方。",
              "en": "Append −2 to the nonzero prefix, keeping zeros behind it."
            }
          },
          {
            "cells": [
              "read=4",
              "[4,-2,7,0,0]"
            ],
            "note": {
              "zh": "最后一次交换后无需补零。",
              "en": "The final swap completes the array without a fill pass."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/move-zeroes/"
      }
    ],
    "slug": "move-zeroes",
    "title": {
      "zh": "移动零",
      "en": "Move Zeroes"
    },
    "category": {
      "zh": "双指针",
      "en": "Two Pointers"
    },
    "level": {
      "zh": "简单",
      "en": "Easy"
    }
  },
  {
    "id": 11,
    "statement": {
      "zh": "在下标 i 处有一条高度为 height[i] 的竖线。选两条竖线与水平轴构成不倾斜的容器，返回最大容量：两线间距离乘较矮线的高度。中间的线不影响这两条边围成的容量。",
      "en": "Choose two vertical lines at integer positions to form an upright container with the horizontal axis. Return the largest area, equal to their distance times the shorter height. Lines between the chosen boundaries do not reduce this container’s capacity."
    },
    "constraints": {
      "zh": [
        "2 ≤ n ≤ 10⁵",
        "0 ≤ height[i] ≤ 10⁴"
      ],
      "en": [
        "2 ≤ n ≤ 10⁵",
        "0 ≤ height[i] ≤ 10⁴"
      ]
    },
    "example": {
      "zh": "height=[2,5,3,4] → 8，选择下标 1、3：2×4=8。",
      "en": "height=[2,5,3,4] → 8, using indices 1 and 3: 2×4=8."
    },
    "methods": [
      {
        "key": "pairs",
        "name": {
          "zh": "枚举边界（基线）",
          "en": "Enumerate boundaries (baseline)"
        },
        "intuition": {
          "zh": "面积依赖宽度和短板，两者缺一不可。不能直接选最高两条线，因为它们可能挨得很近。最直接的方法尝试所有左右边界，以公式计算每个候选，作为验证快速方法的基线。",
          "en": "Both width and the shorter height matter. The two tallest lines may be too close together. Enumerating every boundary pair applies the area formula directly and provides a baseline for checking the faster method."
        },
        "steps": {
          "zh": [
            "枚举左边界 i。",
            "枚举 j>i，计算 (j−i)×min(height[i],height[j])。",
            "取所有面积最大值。"
          ],
          "en": [
            "Enumerate a left boundary i.",
            "Try j>i and calculate (j−i)×min(height[i],height[j]).",
            "Keep the maximum area."
          ]
        },
        "correctness": {
          "zh": "任何可行容器都由唯一的一对不同下标确定，枚举覆盖所有候选。",
          "en": "Every feasible container has a unique pair of distinct boundaries, all of which are enumerated."
        },
        "time": "O(n²)",
        "space": "O(1)",
        "complexity": {
          "zh": "n(n−1)/2 次常数计算，仅记录最大值；大规模会慢，推荐下一方法。",
          "en": "There are n(n−1)/2 constant-time evaluations and a single running maximum. Use the next method for large inputs."
        },
        "python": "class Solution:\n    def maxArea(self, height):\n        best = 0\n        for i in range(len(height)):\n            for j in range(i+1, len(height)):\n                best = max(best, (j-i)*min(height[i], height[j]))\n        return best",
        "java": "class Solution {\n    public int maxArea(int[] height) {\n        int best=0;\n        for(int i=0;i<height.length;i++) for(int j=i+1;j<height.length;j++)\n            best=Math.max(best,(j-i)*Math.min(height[i],height[j]));\n        return best;\n    }\n}",
        "trace": [
          {
            "cells": [
              "i=0",
              "areas=2,4,6",
              "best=6"
            ],
            "note": {
              "zh": "先检查高度 2 与后三条线的配对。",
              "en": "Check the height-2 line against each later line."
            }
          },
          {
            "cells": [
              "i=1",
              "j=2:3",
              "j=3:8",
              "best=8"
            ],
            "note": {
              "zh": "下标 1、3 的宽为 2、短板为 4。",
              "en": "Indices 1 and 3 have width 2 and limiting height 4."
            }
          },
          {
            "cells": [
              "i=2",
              "j=3:3",
              "answer=8"
            ],
            "note": {
              "zh": "最后一对不改善最大值。",
              "en": "The final pair does not improve the maximum."
            }
          }
        ]
      },
      {
        "key": "two-pointers",
        "name": {
          "zh": "双指针淘汰短板",
          "en": "Discard the shorter boundary"
        },
        "intuition": {
          "zh": "从最宽的区间开始。若左边较矮，保持左边只移动右边会让宽度变小，且高度仍不超过左边，所以不可能超过当前面积。于是可以一次淘汰这个左边界，而不是试完它的所有配对。相等时移任意一边都安全。",
          "en": "Begin with maximum width. If the left boundary is shorter, keeping it while moving the right boundary inward only decreases width and cannot raise the limiting height. All remaining pairs using that left boundary are therefore dominated by the current pair. Equal heights allow either boundary to be discarded."
        },
        "steps": {
          "zh": [
            "left=0，right=n−1。",
            "计算当前面积并更新 best。",
            "移动较矮的一侧；两指针相遇时返回。"
          ],
          "en": [
            "Set left=0 and right=n−1.",
            "Evaluate the current area and update best.",
            "Move the shorter side inward until the pointers meet."
          ]
        },
        "correctness": {
          "zh": "每次删除的边界与剩余任一边界配对都不优于已经检查的当前容器，故被删除的候选不可能改善答案。",
          "en": "Every discarded boundary can only form areas no larger than the currently evaluated container with the remaining boundaries, so no improvement is lost."
        },
        "time": "O(n)",
        "space": "O(1)",
        "complexity": {
          "zh": "每轮区间长度减一，至多 n−1 轮；只保存边界和最大面积。",
          "en": "The interval shrinks by one each iteration, for at most n−1 iterations, using constant state."
        },
        "python": "class Solution:\n    def maxArea(self, height):\n        left, right, best = 0, len(height)-1, 0\n        while left < right:\n            best = max(best, (right-left)*min(height[left], height[right]))\n            if height[left] <= height[right]:\n                left += 1\n            else:\n                right -= 1\n        return best",
        "java": "class Solution {\n    public int maxArea(int[] h) {\n        int l=0,r=h.length-1,best=0;\n        while(l<r) {\n            best=Math.max(best,(r-l)*Math.min(h[l],h[r]));\n            if(h[l]<=h[r]) l++; else r--;\n        }\n        return best;\n    }\n}",
        "trace": [
          {
            "cells": [
              "l=0,r=3",
              "area=3×2=6"
            ],
            "note": {
              "zh": "左边更矮，淘汰左边界 0。",
              "en": "The left wall is shorter; discard boundary 0."
            }
          },
          {
            "cells": [
              "l=1,r=3",
              "area=2×4=8"
            ],
            "note": {
              "zh": "右边更矮，更新最大值并移动右端。",
              "en": "The right wall is shorter; update best and move right inward."
            }
          },
          {
            "cells": [
              "l=1,r=2",
              "area=1×3=3",
              "answer=8"
            ],
            "note": {
              "zh": "剩余宽度更小，本轮不改善答案。",
              "en": "The remaining pair is narrower and does not improve best."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/container-with-most-water/"
      }
    ],
    "slug": "container-with-most-water",
    "title": {
      "zh": "盛最多水的容器",
      "en": "Container With Most Water"
    },
    "category": {
      "zh": "双指针",
      "en": "Two Pointers"
    },
    "level": {
      "zh": "中等",
      "en": "Medium"
    }
  },
  {
    "id": 15,
    "statement": {
      "zh": "从 nums 的三个不同下标取值，使三数之和为 0，返回所有不同的数值三元组。重复值可以来自不同位置，但同一数值组合只能返回一次；输出顺序不限。",
      "en": "Return every distinct value triplet summing to zero, using three different indices. Equal values may be used when they occur at different positions, but identical value combinations must be returned only once. Output order is unrestricted."
    },
    "constraints": {
      "zh": [
        "3 ≤ n ≤ 3000",
        "−10⁵ ≤ nums[i] ≤ 10⁵"
      ],
      "en": [
        "3 ≤ n ≤ 3000",
        "−10⁵ ≤ nums[i] ≤ 10⁵"
      ]
    },
    "example": {
      "zh": "[-2,0,2,1,1] → [[-2,0,2],[-2,1,1]]",
      "en": "[-2,0,2,1,1] → [[-2,0,2],[-2,1,1]]"
    },
    "methods": [
      {
        "key": "hash",
        "name": {
          "zh": "固定一个数，哈希寻找另外两个",
          "en": "Fix one value and hash the other pair"
        },
        "intuition": {
          "zh": "枚举第一个位置 i 后，剩下变成目标为 −nums[i] 的两数之和。seen 只记录 i 之后已经扫描的位置，保证三个下标不同。相同值组合可能从不同 i 找到，把三元组内部排序后放入集合统一去重。",
          "en": "Fixing i reduces the rest to two-sum with target −nums[i]. seen contains only previously scanned positions after i, ensuring distinct indices. Different choices of i can discover the same value triplet, so sort each three-item result and deduplicate it in a set."
        },
        "steps": {
          "zh": [
            "每个 i 建一个新 seen 集合。",
            "扫描 j>i，先查询补数，再加入 nums[j]。",
            "命中后对三个值排序，将规范三元组加入结果集合。"
          ],
          "en": [
            "Create a fresh seen set for each i.",
            "Scan j>i, querying the complement before inserting nums[j].",
            "Sort each matching three-value tuple and insert it into the result set."
          ]
        },
        "correctness": {
          "zh": "任一合法下标三元组按最小下标固定 i；扫描最大下标时，中间的值已入表。集合只合并值相同的答案，不会删除不同答案。",
          "en": "Fixing the smallest index of any valid triple finds its middle value in seen when the largest index is scanned. Canonical tuple deduplication removes only identical value answers."
        },
        "time": "O(n²) expected",
        "space": "O(n+R)",
        "complexity": {
          "zh": "两层扫描 O(n²)，排序固定三个值是 O(1)。seen 最多 n 项，结果集合及返回列表共 O(R)，R 是不同答案数。",
          "en": "Two nested scans give expected O(n²); sorting three values is constant time. The seen set uses O(n), and the result set plus returned lists use O(R) for R triplets."
        },
        "python": "class Solution:\n    def threeSum(self, nums):\n        answers = set()\n        for i in range(len(nums)-2):\n            seen = set()\n            for j in range(i+1, len(nums)):\n                need = -nums[i] - nums[j]\n                if need in seen:\n                    answers.add(tuple(sorted((nums[i], need, nums[j]))))\n                seen.add(nums[j])\n        return [list(t) for t in answers]",
        "java": "import java.util.*;\nclass Solution {\n    public List<List<Integer>> threeSum(int[] nums) {\n        Set<List<Integer>> ans=new HashSet<>();\n        for(int i=0;i<nums.length-2;i++) {\n            Set<Integer> seen=new HashSet<>();\n            for(int j=i+1;j<nums.length;j++) {\n                int need=-nums[i]-nums[j];\n                if(seen.contains(need)) {\n                    int[] t={nums[i],need,nums[j]}; Arrays.sort(t);\n                    ans.add(Arrays.asList(t[0],t[1],t[2]));\n                }\n                seen.add(nums[j]);\n            }\n        }\n        return new ArrayList<>(ans);\n    }\n}",
        "trace": [
          {
            "cells": [
              "i=0,x=-2",
              "j=1,x=0",
              "seen={0}"
            ],
            "note": {
              "zh": "固定 −2，后两个数要凑成 2。",
              "en": "Fix −2; the remaining pair must sum to 2."
            }
          },
          {
            "cells": [
              "j=2,x=2",
              "need=0",
              "[-2,0,2]"
            ],
            "note": {
              "zh": "0 已在表中，找到第一组三元组。",
              "en": "0 is already stored, yielding the first triplet."
            }
          },
          {
            "cells": [
              "j=3:store 1",
              "j=4:need 1",
              "[-2,1,1]"
            ],
            "note": {
              "zh": "第二个 1 命中第一个 1；两者下标不同。",
              "en": "The second 1 matches the first at a distinct index."
            }
          },
          {
            "cells": [
              "{(-2,0,2),(-2,1,1)}"
            ],
            "note": {
              "zh": "其余固定位置即使重复找到组合，也由集合去重。",
              "en": "Any repeated discoveries from later fixed positions are deduplicated."
            }
          }
        ]
      },
      {
        "key": "sorted-pointers",
        "name": {
          "zh": "排序与双指针，遍历时去重",
          "en": "Sort and use two pointers with skip-based deduplication"
        },
        "intuition": {
          "zh": "排序后固定最左值，另外两个指针夹住后缀。和偏小只能通过增大左值尝试修正；和偏大就减小右值。与哈希法的“找到后再去重”不同，重复的固定值以及命中后的相同左右值直接跳过，避免重复生成答案。",
          "en": "After sorting, fix the first value and bracket the suffix with two pointers. A sum that is too small requires a larger left value; a sum that is too large requires a smaller right value. Skip duplicate fixed values and repeated pointer values after a hit, preventing duplicate answers from being generated."
        },
        "steps": {
          "zh": [
            "复制排序 nums，跳过与前一个相同的固定值。",
            "left=i+1，right=n−1；按和的正负移动边界。",
            "和为零时保存三元组，推进两端并跳过刚用过的值。"
          ],
          "en": [
            "Sort a copy and skip duplicate fixed values.",
            "Start left=i+1 and right=n−1; move according to the sum’s sign.",
            "On zero, save the triplet and skip repetitions of both matched values."
          ]
        },
        "correctness": {
          "zh": "有序性保证被淘汰的一整行或一整列配对不可能达到零；相同固定值和相同命中值仅会产生重复三元组。",
          "en": "Sorted order makes every discarded row or column of pairs unable to reach zero. Reusing the same fixed or matched values would only reproduce an existing triplet."
        },
        "time": "O(n²)",
        "space": "O(n+R)",
        "complexity": {
          "zh": "排序副本 O(n)，每个固定位置的双指针总移动 O(n)，合计 O(n²)；R 个答案另占 O(R)。",
          "en": "The sorted copy costs O(n) space. Each fixed position has a linear pointer scan, totaling O(n²). R output triplets add O(R) space."
        },
        "python": "class Solution:\n    def threeSum(self, nums):\n        a = sorted(nums)\n        ans = []\n        for i in range(len(a)-2):\n            if i and a[i] == a[i-1]:\n                continue\n            l, r = i+1, len(a)-1\n            while l < r:\n                total = a[i] + a[l] + a[r]\n                if total < 0:\n                    l += 1\n                elif total > 0:\n                    r -= 1\n                else:\n                    ans.append([a[i], a[l], a[r]])\n                    x, y = a[l], a[r]\n                    while l < r and a[l] == x: l += 1\n                    while l < r and a[r] == y: r -= 1\n        return ans",
        "java": "import java.util.*;\nclass Solution {\n    public List<List<Integer>> threeSum(int[] nums) {\n        int[] a=nums.clone(); Arrays.sort(a);\n        List<List<Integer>> ans=new ArrayList<>();\n        for(int i=0;i<a.length-2;i++) {\n            if(i>0 && a[i]==a[i-1]) continue;\n            int l=i+1,r=a.length-1;\n            while(l<r) {\n                int sum=a[i]+a[l]+a[r];\n                if(sum<0) l++;\n                else if(sum>0) r--;\n                else {\n                    ans.add(Arrays.asList(a[i],a[l],a[r]));\n                    int x=a[l],y=a[r];\n                    while(l<r && a[l]==x) l++;\n                    while(l<r && a[r]==y) r--;\n                }\n            }\n        }\n        return ans;\n    }\n}",
        "trace": [
          {
            "cells": [
              "[-2,0,1,1,2]",
              "i=0,l=1,r=4"
            ],
            "note": {
              "zh": "排序后固定 −2，从最外侧配对开始。",
              "en": "After sorting, fix −2 and start with the widest suffix pair."
            }
          },
          {
            "cells": [
              "-2+0+2=0",
              "[-2,0,2]"
            ],
            "note": {
              "zh": "命中后跳过 0 和 2，向内移动。",
              "en": "After the hit, skip 0 and 2 and move inward."
            }
          },
          {
            "cells": [
              "-2+1+1=0",
              "[-2,1,1]"
            ],
            "note": {
              "zh": "两个 1 来自不同位置，合法；后续固定值没有新解。",
              "en": "The two 1s occupy different indices; later fixed values add no solutions."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/3sum/"
      }
    ],
    "slug": "3sum",
    "title": {
      "zh": "三数之和",
      "en": "3Sum"
    },
    "category": {
      "zh": "双指针",
      "en": "Two Pointers"
    },
    "level": {
      "zh": "中等",
      "en": "Medium"
    }
  },
  {
    "id": 42,
    "statement": {
      "zh": "height 描述一排宽度均为 1 的柱子，柱高非负。雨水只能被左右的较高柱子围住，求所有柱子上方能保留的水量之和，而不是只选择两根柱子求容器面积。",
      "en": "height describes adjacent unit-width bars with nonnegative heights. Compute the total water retained above them after rain, using surrounding bars as walls. This sums water over all positions rather than selecting a single container."
    },
    "constraints": {
      "zh": [
        "1 ≤ n ≤ 2×10⁴",
        "0 ≤ height[i] ≤ 10⁵"
      ],
      "en": [
        "1 ≤ n ≤ 2×10⁴",
        "0 ≤ height[i] ≤ 10⁵"
      ]
    },
    "example": {
      "zh": "height=[3,0,2,0,4] → 7，各位置水量 [0,3,1,3,0]。",
      "en": "height=[3,0,2,0,4] → 7, with per-position water [0,3,1,3,0]."
    },
    "methods": [
      {
        "key": "prefix-max",
        "name": {
          "zh": "预计算左右最高柱",
          "en": "Precompute maxima on both sides"
        },
        "intuition": {
          "zh": "某位置能达到的水面由左侧最高墙与右侧最高墙中较矮的一个决定。减去当前位置柱高就是水深。把两边最大值提前算好，避免每个位置都向两边重新搜索；最大值包含当前柱子，水深不会为负。",
          "en": "A position’s water level is limited by the shorter of its tallest left and right walls. Subtract its own height to get water depth. Precompute both maxima to avoid repeated searches. Including the current bar in each maximum ensures nonnegative depth."
        },
        "steps": {
          "zh": [
            "从左到右计算 left[i]=max(left[i−1],height[i])。",
            "从右到左计算对应 right[i]。",
            "累加 min(left[i],right[i])−height[i]。"
          ],
          "en": [
            "Scan left to right to compute left[i]=max(left[i−1],height[i]).",
            "Compute right maxima in the reverse direction.",
            "Sum min(left[i],right[i])−height[i]."
          ]
        },
        "correctness": {
          "zh": "水面高于任一侧最高墙就会流走，达到较矮最高墙时两侧都有足够挡板，所以公式既是上界也是可达到的水量。",
          "en": "Water above either side’s maximum would escape. At the smaller maximum both sides provide a wall, so this bound is achievable at each position."
        },
        "time": "O(n)",
        "space": "O(n)",
        "complexity": {
          "zh": "左右数组各 n 项，三次线性遍历；输出是一个整数。",
          "en": "Two length-n arrays and three linear scans; the result is one integer."
        },
        "python": "class Solution:\n    def trap(self, height):\n        n = len(height)\n        left, right = [0]*n, [0]*n\n        left[0], right[-1] = height[0], height[-1]\n        for i in range(1, n): left[i] = max(left[i-1], height[i])\n        for i in range(n-2, -1, -1): right[i] = max(right[i+1], height[i])\n        return sum(min(left[i], right[i])-height[i] for i in range(n))",
        "java": "class Solution {\n    public int trap(int[] h) {\n        int n=h.length,ans=0;\n        int[] left=new int[n],right=new int[n];\n        left[0]=h[0]; right[n-1]=h[n-1];\n        for(int i=1;i<n;i++) left[i]=Math.max(left[i-1],h[i]);\n        for(int i=n-2;i>=0;i--) right[i]=Math.max(right[i+1],h[i]);\n        for(int i=0;i<n;i++) ans+=Math.min(left[i],right[i])-h[i];\n        return ans;\n    }\n}",
        "trace": [
          {
            "cells": [
              "left=[3,3,3,3,4]"
            ],
            "note": {
              "zh": "从左扫描，每项保留目前最高柱。",
              "en": "Scan leftward prefixes, retaining the highest bar so far."
            }
          },
          {
            "cells": [
              "right=[4,4,4,4,4]"
            ],
            "note": {
              "zh": "最右柱高 4，因此每个后缀最大值都是 4。",
              "en": "The rightmost height is 4, so every suffix maximum is 4."
            }
          },
          {
            "cells": [
              "water=[0,3,1,3,0]",
              "sum=7"
            ],
            "note": {
              "zh": "逐列较矮最高墙减去柱高，再求和。",
              "en": "Subtract each bar height from its lower boundary maximum, then sum."
            }
          }
        ]
      },
      {
        "key": "two-maxima",
        "name": {
          "zh": "双指针结算较低水位一侧",
          "en": "Two pointers settle the lower known maximum"
        },
        "intuition": {
          "zh": "维护当前左侧最高墙 lm 与右侧最高墙 rm。若 lm≤rm，左位置右方已确定存在至少 rm 高的墙，所以它的真实右最高值不可能成为更低限制；该位置可以立即按 lm 结算。无需知道中间所有墙的高度。另一侧完全对称。",
          "en": "Maintain the maximum seen from the left, lm, and from the right, rm. When lm≤rm, the current left position already has a right wall at least rm high, so the unknown interior cannot lower its limiting level below lm. Settle that position immediately; the other case is symmetric."
        },
        "steps": {
          "zh": [
            "两端指针向内，先更新 lm、rm，包含当前端点。",
            "若 lm≤rm，累加 lm−height[left] 并移动左指针。",
            "否则累加 rm−height[right] 并移动右指针，直到全部位置结算。"
          ],
          "en": [
            "Use inward pointers and update both maxima to include the current endpoints.",
            "If lm≤rm, add lm−height[left] and move left.",
            "Otherwise add rm−height[right] and move right until all positions are settled."
          ]
        },
        "correctness": {
          "zh": "每次被结算位置的一侧全局最大值已知，另一侧存在不低于它的挡板，因此与左右最大值公式完全一致。每个位置只结算一次。",
          "en": "For each settled position one side’s maximum is known and the opposite side has an adequate wall. Its contribution equals the two-maxima formula, and each position is counted once."
        },
        "time": "O(n)",
        "space": "O(1)",
        "complexity": {
          "zh": "每轮移动一个指针，共 n 轮；只维护两个最高值、两个指针和总和。",
          "en": "Exactly one pointer moves each round, yielding n rounds and constant working state."
        },
        "python": "class Solution:\n    def trap(self, height):\n        l, r = 0, len(height)-1\n        lm = rm = ans = 0\n        while l <= r:\n            lm, rm = max(lm, height[l]), max(rm, height[r])\n            if lm <= rm:\n                ans += lm-height[l]\n                l += 1\n            else:\n                ans += rm-height[r]\n                r -= 1\n        return ans",
        "java": "class Solution {\n    public int trap(int[] h) {\n        int l=0,r=h.length-1,lm=0,rm=0,ans=0;\n        while(l<=r) {\n            lm=Math.max(lm,h[l]); rm=Math.max(rm,h[r]);\n            if(lm<=rm) {ans+=lm-h[l]; l++;}\n            else {ans+=rm-h[r]; r--;}\n        }\n        return ans;\n    }\n}",
        "trace": [
          {
            "cells": [
              "l=0,r=4",
              "lm=3,rm=4",
              "add=0"
            ],
            "note": {
              "zh": "左侧最高值更低，先结算位置 0。",
              "en": "The left maximum is lower, so settle position 0 first."
            }
          },
          {
            "cells": [
              "l=1,2,3",
              "add=3,1,3",
              "sum=7"
            ],
            "note": {
              "zh": "右侧已知高墙 4 足够，三个左位置可依次结算。",
              "en": "The known right wall of height 4 is enough to settle these left positions."
            }
          },
          {
            "cells": [
              "l=4,r=4",
              "lm=4,rm=4",
              "add=0",
              "answer=7"
            ],
            "note": {
              "zh": "最后柱子自身无水，完成扫描。",
              "en": "The last bar holds no water, completing the scan."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/trapping-rain-water/"
      }
    ],
    "slug": "trapping-rain-water",
    "title": {
      "zh": "接雨水",
      "en": "Trapping Rain Water"
    },
    "category": {
      "zh": "双指针",
      "en": "Two Pointers"
    },
    "level": {
      "zh": "困难",
      "en": "Hard"
    }
  },
  {
    "id": 3,
    "statement": {
      "zh": "返回 s 中不含重复字符的最长连续片段的长度。必须连续，不能跳过中间字符；大小写、数字、符号和空格都按字符参与判断。空串答案为 0。",
      "en": "Return the length of the longest contiguous part of s with no repeated character. Characters cannot be skipped. Letters, digits, punctuation and spaces all participate in duplicate checking; an empty string has answer zero."
    },
    "constraints": {
      "zh": [
        "0 ≤ |s| ≤ 10⁵",
        "字符由英文字母、数字、符号和空格组成"
      ],
      "en": [
        "0 ≤ |s| ≤ 10⁵",
        "English letters, digits, symbols and spaces"
      ]
    },
    "example": {
      "zh": "s=\"abcaef\" → 5，最长片段为 \"bcaef\"。",
      "en": "s=\"abcaef\" → 5, from \"bcaef\"."
    },
    "methods": [
      {
        "key": "set-window",
        "name": {
          "zh": "集合窗口，逐个移除重复前缀",
          "en": "Set window with incremental shrinking"
        },
        "intuition": {
          "zh": "集合保存当前窗口中的字符。新字符已在集合时，必须从左端逐个删除，直到旧副本被移出，再加入新字符。不能直接清空整个窗口，因为旧副本之后的无重复后缀仍然有价值。",
          "en": "A set holds the current window’s characters. If the incoming character already exists, remove characters from the left until the old copy is gone. Do not clear the whole window: the duplicate-free suffix after that copy remains useful."
        },
        "steps": {
          "zh": [
            "left=0，集合为空。",
            "每个新字符到来时，循环删除左端直到集合不含它。",
            "加入新字符，使用 right−left+1 更新最大长度。"
          ],
          "en": [
            "Start with left=0 and an empty set.",
            "Remove leftmost characters until the incoming character is absent.",
            "Insert it and update the maximum with right−left+1."
          ]
        },
        "correctness": {
          "zh": "加入新字符后窗口恰好是当前右端结尾的最长无重复后缀；任何更靠左起点都会保留冲突字符，因此无需检查。",
          "en": "After insertion the window is the longest duplicate-free suffix ending at the current right boundary. Any earlier start would retain a duplicate and cannot be valid."
        },
        "time": "O(n) expected",
        "space": "O(min(n,Σ))",
        "complexity": {
          "zh": "两指针只前进，每个字符至多入集合、出集合一次；Σ 为字符集大小，集合最多保存 min(n,Σ) 项。",
          "en": "Both pointers advance only; each character enters and leaves at most once. The set holds at most min(n,Σ) characters for alphabet size Σ."
        },
        "python": "class Solution:\n    def lengthOfLongestSubstring(self, s):\n        seen = set()\n        left = best = 0\n        for right, ch in enumerate(s):\n            while ch in seen:\n                seen.remove(s[left])\n                left += 1\n            seen.add(ch)\n            best = max(best, right-left+1)\n        return best",
        "java": "import java.util.*;\nclass Solution {\n    public int lengthOfLongestSubstring(String s) {\n        Set<Character> seen=new HashSet<>();\n        int left=0,best=0;\n        for(int right=0;right<s.length();right++) {\n            char ch=s.charAt(right);\n            while(seen.contains(ch)) seen.remove(s.charAt(left++));\n            seen.add(ch); best=Math.max(best,right-left+1);\n        }\n        return best;\n    }\n}",
        "trace": [
          {
            "cells": [
              "window=abc",
              "left=0",
              "best=3"
            ],
            "note": {
              "zh": "前三个字符均不同。",
              "en": "The first three characters are distinct."
            }
          },
          {
            "cells": [
              "incoming=a",
              "remove old a",
              "window=bca",
              "left=1"
            ],
            "note": {
              "zh": "只删到旧 a 被移走，保留 b、c。",
              "en": "Remove only through the old a, retaining b and c."
            }
          },
          {
            "cells": [
              "window=bcaef",
              "best=5"
            ],
            "note": {
              "zh": "继续加入 e、f，长度变为 5。",
              "en": "Adding e and f extends the window to length 5."
            }
          }
        ]
      },
      {
        "key": "last-index",
        "name": {
          "zh": "最近位置表，左边界直接跳跃",
          "en": "Jump left using last-seen indices"
        },
        "intuition": {
          "zh": "用 last[ch] 记录字符最近出现的位置。重复时左边界可直接跳到旧位置之后，而不用逐个删除。关键是取 max(left,last[ch]+1)：旧出现位置可能早已在窗口外，左边界不能后退，例如 abba 最后的 a。",
          "en": "Store each character’s latest index. A repeat lets left jump directly past the old occurrence rather than removing characters one by one. Use max(left,last[ch]+1), since the previous occurrence may already lie outside the window; moving left backward would reintroduce duplicates, as in abba."
        },
        "steps": {
          "zh": [
            "每个字符查询旧位置，默认 −1。",
            "left=max(left,旧位置+1)，再更新最近位置。",
            "用当前合法窗口长度更新 best。"
          ],
          "en": [
            "Look up the previous index, defaulting to −1.",
            "Set left=max(left,previous+1), then store the current index.",
            "Update best from the resulting valid window."
          ]
        },
        "correctness": {
          "zh": "窗口原本无重复，新增字符只可能与它自己的旧副本冲突；跳过旧副本且不后退左端，正好排除唯一新增冲突。",
          "en": "The old window is duplicate-free, so the new character can conflict only with its own previous copy. Jumping past it without moving backward removes exactly that new conflict."
        },
        "time": "O(n) expected",
        "space": "O(min(n,Σ))",
        "complexity": {
          "zh": "每个位置一次映射查询和更新；表存每种已见字符的一个位置，不存整段字符串。",
          "en": "One lookup and update per position; the map stores a single index per distinct character rather than substrings."
        },
        "python": "class Solution:\n    def lengthOfLongestSubstring(self, s):\n        last = {}\n        left = best = 0\n        for right, ch in enumerate(s):\n            left = max(left, last.get(ch, -1)+1)\n            last[ch] = right\n            best = max(best, right-left+1)\n        return best",
        "java": "import java.util.*;\nclass Solution {\n    public int lengthOfLongestSubstring(String s) {\n        Map<Character,Integer> last=new HashMap<>();\n        int left=0,best=0;\n        for(int right=0;right<s.length();right++) {\n            char ch=s.charAt(right);\n            left=Math.max(left,last.getOrDefault(ch,-1)+1);\n            last.put(ch,right); best=Math.max(best,right-left+1);\n        }\n        return best;\n    }\n}",
        "trace": [
          {
            "cells": [
              "last={a:0,b:1,c:2}",
              "left=0"
            ],
            "note": {
              "zh": "保存每个字符最近位置。",
              "en": "Record the latest position of each character."
            }
          },
          {
            "cells": [
              "r=3,a",
              "left=max(0,0+1)=1"
            ],
            "note": {
              "zh": "直接跳过旧 a，而不用逐个删除映射项。",
              "en": "Jump past the previous a without deleting map entries."
            }
          },
          {
            "cells": [
              "r=5,f",
              "left=1",
              "length=5"
            ],
            "note": {
              "zh": "其余字符没有窗口内重复，最终答案 5。",
              "en": "No remaining character repeats inside the window; the answer is 5."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/longest-substring-without-repeating-characters/"
      }
    ],
    "slug": "longest-substring-without-repeating-characters",
    "title": {
      "zh": "无重复字符的最长子串",
      "en": "Longest Substring Without Repeating Characters"
    },
    "category": {
      "zh": "滑动窗口",
      "en": "Sliding Window"
    },
    "level": {
      "zh": "中等",
      "en": "Medium"
    }
  },
  {
    "id": 438,
    "statement": {
      "zh": "找出 s 中所有与 p 的字符及出现次数完全相同的连续片段，返回它们的起始下标。片段必须长度等于 p，允许互相重叠，答案顺序不限。",
      "en": "Find all contiguous substrings of s with exactly the same character multiplicities as p, and return their starting indices. Each has length len(p), matches may overlap, and output order is unrestricted."
    },
    "constraints": {
      "zh": [
        "1 ≤ |s|,|p| ≤ 3×10⁴",
        "s、p 仅含小写英文字母"
      ],
      "en": [
        "1 ≤ |s|,|p| ≤ 3×10⁴",
        "Both strings contain only lowercase English letters"
      ]
    },
    "example": {
      "zh": "s=\"abbac\", p=\"ab\" → [0,2]，对应 \"ab\"、\"ba\"。",
      "en": "s=\"abbac\", p=\"ab\" → [0,2], matching \"ab\" and \"ba\"."
    },
    "methods": [
      {
        "key": "recount",
        "name": {
          "zh": "每个定长窗口重新计数（基线）",
          "en": "Recount each fixed window (baseline)"
        },
        "intuition": {
          "zh": "异位词的长度必须相同，所以只枚举长度 m=|p| 的窗口。为每个窗口统计 26 个字母，再与 p 的统计比较。这比枚举任意子串清晰，但相邻窗口重复统计了 m−1 个字符。",
          "en": "Anagrams have equal length, so inspect only windows of size m=len(p). Count 26 letters in each window and compare with p’s counts. This avoids arbitrary substring lengths but recounts m−1 shared characters between adjacent windows."
        },
        "steps": {
          "zh": [
            "统计 p 的目标频次。",
            "依次枚举每个能容纳 m 个字符的起点。",
            "重新计数窗口，26 项完全相等时记录起点。"
          ],
          "en": [
            "Count the target frequencies in p.",
            "Enumerate every start with room for m characters.",
            "Count the window afresh and record the start if all 26 counts match."
          ]
        },
        "correctness": {
          "zh": "每个合法答案都位于一个长度 m 的窗口中，频次逐项相等是异位词的充要条件。",
          "en": "Every match is a length-m window, and equality of all letter counts is necessary and sufficient for being an anagram."
        },
        "time": "O(m+(n−m+1)·(m+26)) if n≥m",
        "space": "O(26+R)",
        "complexity": {
          "zh": "n=|s|、m=|p|。n<m 时直接返回；否则每窗口重新扫描 m 项。R 为输出下标数，计数数组只占常数空间。",
          "en": "n=len(s), m=len(p). Return immediately if n<m; otherwise each candidate recounts m characters. R is the number of output indices, while count arrays use fixed space."
        },
        "python": "class Solution:\n    def findAnagrams(self, s, p):\n        n, m = len(s), len(p)\n        if n < m: return []\n        need = [0]*26\n        for ch in p: need[ord(ch)-97] += 1\n        ans = []\n        for left in range(n-m+1):\n            have = [0]*26\n            for j in range(left, left+m): have[ord(s[j])-97] += 1\n            if have == need: ans.append(left)\n        return ans",
        "java": "import java.util.*;\nclass Solution {\n    public List<Integer> findAnagrams(String s,String p) {\n        List<Integer> ans=new ArrayList<>(); int n=s.length(),m=p.length();\n        if(n<m) return ans;\n        int[] need=new int[26];\n        for(int j=0;j<m;j++) need[p.charAt(j)-'a']++;\n        for(int l=0;l+m<=n;l++) {\n            int[] have=new int[26];\n            for(int j=l;j<l+m;j++) have[s.charAt(j)-'a']++;\n            if(Arrays.equals(need,have)) ans.add(l);\n        }\n        return ans;\n    }\n}",
        "trace": [
          {
            "cells": [
              "[ab]bac",
              "a1,b1",
              "start=0"
            ],
            "note": {
              "zh": "第一窗口计数吻合，记录 0。",
              "en": "The first window matches the required counts; record 0."
            }
          },
          {
            "cells": [
              "a[bb]ac",
              "b2",
              "reject"
            ],
            "note": {
              "zh": "第二窗口缺 a，多一个 b。",
              "en": "The second window lacks a and has an extra b."
            }
          },
          {
            "cells": [
              "ab[ba]c",
              "start=2",
              "abb[ac]",
              "answer=[0,2]"
            ],
            "note": {
              "zh": "ba 匹配，ac 不匹配。",
              "en": "ba matches; ac does not."
            }
          }
        ]
      },
      {
        "key": "rolling-count",
        "name": {
          "zh": "定长滑动窗口复用频次",
          "en": "Reuse counts in a fixed sliding window"
        },
        "intuition": {
          "zh": "相邻窗口只差一个离开的字符和一个进入的字符。维护当前窗口频次，右端每前进一格加一；窗口过长时将最左字符减一。长度恰好 m 后比较 26 个计数，重复字符和重叠匹配自然被处理。",
          "en": "Adjacent windows differ by just one outgoing and one incoming character. Increment the entering count and decrement the leaving count once the window is too long. Compare the 26 counts only when a full length-m window exists. This naturally handles repeated letters and overlapping matches."
        },
        "steps": {
          "zh": [
            "统计 p 的频次，初始化空窗口。",
            "加入 s[right]；right≥m 时移除 s[right−m]。",
            "right≥m−1 且频次一致时记录 right−m+1。"
          ],
          "en": [
            "Count p and initialize an empty window.",
            "Add s[right]; if right≥m, remove s[right−m].",
            "For right≥m−1, record right−m+1 when the count vectors agree."
          ]
        },
        "correctness": {
          "zh": "每轮完成增减后计数恰好描述最后 m 个字符；对每个完整窗口都检查一次，所以不漏且不重。",
          "en": "After each update the counts describe exactly the latest m characters. Every complete window is checked once, producing all and only valid starts."
        },
        "time": "O(n+m)",
        "space": "O(26+R)",
        "complexity": {
          "zh": "每个字符至多进入、离开一次，每次比较固定 26 项；R 个返回下标另计。",
          "en": "Each character enters and leaves at most once; comparing a fixed 26-element alphabet is constant time. The R returned indices are counted separately."
        },
        "python": "class Solution:\n    def findAnagrams(self, s, p):\n        n, m = len(s), len(p)\n        if n < m: return []\n        need, have = [0]*26, [0]*26\n        for ch in p: need[ord(ch)-97] += 1\n        ans = []\n        for r, ch in enumerate(s):\n            have[ord(ch)-97] += 1\n            if r >= m: have[ord(s[r-m])-97] -= 1\n            if r >= m-1 and have == need: ans.append(r-m+1)\n        return ans",
        "java": "import java.util.*;\nclass Solution {\n    public List<Integer> findAnagrams(String s,String p) {\n        List<Integer> ans=new ArrayList<>(); int n=s.length(),m=p.length();\n        if(n<m) return ans;\n        int[] need=new int[26],have=new int[26];\n        for(int i=0;i<m;i++) need[p.charAt(i)-'a']++;\n        for(int r=0;r<n;r++) {\n            have[s.charAt(r)-'a']++;\n            if(r>=m) have[s.charAt(r-m)-'a']--;\n            if(r>=m-1 && Arrays.equals(need,have)) ans.add(r-m+1);\n        }\n        return ans;\n    }\n}",
        "trace": [
          {
            "cells": [
              "window=ab",
              "a1,b1",
              "answer=[0]"
            ],
            "note": {
              "zh": "形成第一个完整窗口。",
              "en": "The first complete window matches."
            }
          },
          {
            "cells": [
              "-a,+b",
              "window=bb",
              "b2"
            ],
            "note": {
              "zh": "只更新离开和进入的字符。",
              "en": "Update only the leaving and entering characters."
            }
          },
          {
            "cells": [
              "-b,+a",
              "window=ba",
              "answer=[0,2]"
            ],
            "note": {
              "zh": "计数恢复匹配；下一窗口 ac 不匹配。",
              "en": "Counts match again; the subsequent ac window does not."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/find-all-anagrams-in-a-string/"
      }
    ],
    "slug": "find-all-anagrams-in-a-string",
    "title": {
      "zh": "找到字符串中所有字母异位词",
      "en": "Find All Anagrams in a String"
    },
    "category": {
      "zh": "滑动窗口",
      "en": "Sliding Window"
    },
    "level": {
      "zh": "中等",
      "en": "Medium"
    }
  },
  {
    "id": 560,
    "statement": {
      "zh": "统计 nums 中元素和为 k 的非空连续子数组个数。不同起止下标分别计数，即使元素内容相同；数组可能有负数或零。",
      "en": "Count nonempty contiguous subarrays of nums whose sum is k. Different index ranges count separately even when their values match. Negative numbers and zeros are allowed."
    },
    "constraints": {
      "zh": [
        "1 ≤ n ≤ 2×10⁴",
        "−1000 ≤ nums[i] ≤ 1000",
        "−10⁷ ≤ k ≤ 10⁷"
      ],
      "en": [
        "1 ≤ n ≤ 2×10⁴",
        "−1000 ≤ nums[i] ≤ 1000",
        "−10⁷ ≤ k ≤ 10⁷"
      ]
    },
    "example": {
      "zh": "nums=[2,-1,2], k=1 → 2，区间 [0,1] 和 [1,2]。",
      "en": "nums=[2,-1,2], k=1 → 2, from ranges [0,1] and [1,2]."
    },
    "methods": [
      {
        "key": "enumerate",
        "name": {
          "zh": "固定起点累加（基线）",
          "en": "Accumulate from each start (baseline)"
        },
        "intuition": {
          "zh": "固定左端后向右逐个累加，不必每次重新求整个区间的和。注意和大于 k 也不能提前停止，因为后面可能出现负数把它降回来；这也是普通“和太大就缩窗”在本题失效的原因。",
          "en": "Fix a start and extend the endpoint while maintaining a running sum. Even when the sum exceeds k, do not stop: later negative values may reduce it. This also explains why an ordinary sum-based shrinking window is invalid here."
        },
        "steps": {
          "zh": [
            "枚举 left，total 清零。",
            "从 left 开始延伸 right，将当前数加入 total。",
            "每次 total==k 就将答案加一，继续扩展。"
          ],
          "en": [
            "Enumerate left and reset total to zero.",
            "Extend right from left, adding each value.",
            "Increment the answer on every total==k and keep extending."
          ]
        },
        "correctness": {
          "zh": "所有非空区间由其左右端点唯一确定，算法恰好计算每对端点一次。",
          "en": "Each nonempty subarray has one pair of endpoints, and the algorithm evaluates every pair once."
        },
        "time": "O(n²)",
        "space": "O(1)",
        "complexity": {
          "zh": "区间数为 n(n+1)/2，每个扩展仅一次加法；不存前缀数组或结果区间。",
          "en": "There are n(n+1)/2 intervals and one addition per extension. No prefix array or interval list is stored."
        },
        "python": "class Solution:\n    def subarraySum(self, nums, k):\n        ans = 0\n        for left in range(len(nums)):\n            total = 0\n            for right in range(left, len(nums)):\n                total += nums[right]\n                if total == k: ans += 1\n        return ans",
        "java": "class Solution {\n    public int subarraySum(int[] nums,int k) {\n        int ans=0;\n        for(int l=0;l<nums.length;l++) {\n            int total=0;\n            for(int r=l;r<nums.length;r++) {\n                total+=nums[r]; if(total==k) ans++;\n            }\n        }\n        return ans;\n    }\n}",
        "trace": [
          {
            "cells": [
              "left=0",
              "sums=2,1,3",
              "count=1"
            ],
            "note": {
              "zh": "固定起点 0，仅到下标 1 的区间和为 1。",
              "en": "For start 0, only the interval ending at 1 sums to 1."
            }
          },
          {
            "cells": [
              "left=1",
              "sums=-1,1",
              "count=2"
            ],
            "note": {
              "zh": "负数起点扩展后也可命中。",
              "en": "Extending the negative starting value yields another match."
            }
          },
          {
            "cells": [
              "left=2",
              "sum=2",
              "answer=2"
            ],
            "note": {
              "zh": "最后单元素不匹配。",
              "en": "The final single-element interval does not match."
            }
          }
        ]
      },
      {
        "key": "prefix-frequency",
        "name": {
          "zh": "前缀和与出现次数表",
          "en": "Prefix sums with occurrence counts"
        },
        "intuition": {
          "zh": "设当前前缀和为 S，要使某段和为 k，需要一个更早的前缀和 S−k。相同前缀和可能出现多次，每次都对应不同起点，所以表必须存次数而不是布尔值。预置 0:1 代表空前缀，才能统计从下标 0 开始的区间。",
          "en": "For current prefix sum S, a subarray sums to k exactly when an earlier prefix equals S−k. Repeated prefix sums correspond to distinct starts, so store counts rather than existence. Initialize 0:1 for the empty prefix so ranges beginning at index zero are included."
        },
        "steps": {
          "zh": [
            "freq={0:1}，prefix=0。",
            "读入 x 更新 prefix，将 freq[prefix−k] 加入答案。",
            "最后才把当前 prefix 的次数加一，避免 k=0 时把空区间算入。"
          ],
          "en": [
            "Initialize freq={0:1} and prefix=0.",
            "Add x to prefix and add freq[prefix−k] to the answer.",
            "Only then increment freq[prefix], avoiding an empty interval when k=0."
          ]
        },
        "correctness": {
          "zh": "查询的每个旧前缀对应一个且仅一个当前右端结尾的合法非空区间；按右端遍历把所有答案分成不相交的组。",
          "en": "Each counted earlier prefix corresponds to exactly one valid nonempty subarray ending here. Grouping answers by endpoint counts all of them without duplication."
        },
        "time": "O(n) expected",
        "space": "O(n)",
        "complexity": {
          "zh": "n 次哈希查找及更新，最多 n+1 种前缀和。负数不影响前缀差公式。",
          "en": "There are n hash lookups and updates and at most n+1 distinct prefix sums. Negative values do not affect the prefix-difference identity."
        },
        "python": "class Solution:\n    def subarraySum(self, nums, k):\n        freq = {0: 1}\n        prefix = ans = 0\n        for x in nums:\n            prefix += x\n            ans += freq.get(prefix-k, 0)\n            freq[prefix] = freq.get(prefix, 0)+1\n        return ans",
        "java": "import java.util.*;\nclass Solution {\n    public int subarraySum(int[] nums,int k) {\n        Map<Integer,Integer> freq=new HashMap<>(); freq.put(0,1);\n        int prefix=0,ans=0;\n        for(int x:nums) {\n            prefix+=x; ans+=freq.getOrDefault(prefix-k,0);\n            freq.put(prefix,freq.getOrDefault(prefix,0)+1);\n        }\n        return ans;\n    }\n}",
        "trace": [
          {
            "cells": [
              "freq={0:1}",
              "S=2",
              "need=1",
              "ans=0"
            ],
            "note": {
              "zh": "旧前缀中没有 1，记录当前前缀 2。",
              "en": "No earlier prefix is 1; record prefix 2."
            }
          },
          {
            "cells": [
              "S=1",
              "need=0",
              "ans=1"
            ],
            "note": {
              "zh": "空前缀 0 对应从下标 0 开始的合法区间。",
              "en": "The empty prefix 0 gives a valid interval starting at index 0."
            }
          },
          {
            "cells": [
              "S=3",
              "need=2",
              "ans=2"
            ],
            "note": {
              "zh": "此前的前缀 2 对应区间 [1,2]。",
              "en": "The earlier prefix 2 gives range [1,2]."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/subarray-sum-equals-k/"
      }
    ],
    "slug": "subarray-sum-equals-k",
    "title": {
      "zh": "和为 K 的子数组",
      "en": "Subarray Sum Equals K"
    },
    "category": {
      "zh": "子串",
      "en": "Substrings"
    },
    "level": {
      "zh": "中等",
      "en": "Medium"
    }
  },
  {
    "id": 239,
    "statement": {
      "zh": "长度为 k 的连续窗口从 nums 最左端开始，每次向右移动一个位置。按窗口出现顺序返回每个窗口的最大值，共 n−k+1 个结果。",
      "en": "Slide a length-k contiguous window across nums, moving one index at a time. Return each window’s maximum in left-to-right order, producing n−k+1 values."
    },
    "constraints": {
      "zh": [
        "1 ≤ n ≤ 10⁵",
        "−10⁴ ≤ nums[i] ≤ 10⁴",
        "1 ≤ k ≤ n"
      ],
      "en": [
        "1 ≤ n ≤ 10⁵",
        "−10⁴ ≤ nums[i] ≤ 10⁴",
        "1 ≤ k ≤ n"
      ]
    },
    "example": {
      "zh": "nums=[2,1,3,0,4], k=3 → [3,3,4]",
      "en": "nums=[2,1,3,0,4], k=3 → [3,3,4]"
    },
    "methods": [
      {
        "key": "scan",
        "name": {
          "zh": "逐窗口扫描（基线）",
          "en": "Scan every window (baseline)"
        },
        "intuition": {
          "zh": "窗口最大值不能仅靠旧最大值与新元素比较：如果旧最大值离开窗口，就需要重新知道次大值。基线方法干脆对每个窗口完整扫描，逻辑简单且适合对照验证，但窗口较大时重复工作很多。",
          "en": "Comparing only the old maximum and the entering value fails when the old maximum leaves: a replacement must be known. The baseline rescans every window completely. It is simple and useful as a reference, but repeats much work for large windows."
        },
        "steps": {
          "zh": [
            "枚举 n−k+1 个窗口起点。",
            "以窗口首项初始化最大值，扫描剩余 k−1 项。",
            "将最大值按顺序追加到结果。"
          ],
          "en": [
            "Enumerate the n−k+1 window starts.",
            "Initialize the maximum from the first item and scan the remaining k−1 items.",
            "Append each maximum in order."
          ]
        },
        "correctness": {
          "zh": "每个窗口所有元素均参与比较，所得最大值精确；窗口顺序与输出顺序一致。",
          "en": "Every element in each window is compared, so its maximum is exact and outputs follow window order."
        },
        "time": "O((n−k+1)·k)",
        "space": "O(1) auxiliary; O(n−k+1) output",
        "complexity": {
          "zh": "不做数组切片，辅助空间为常数；返回数组单独占 n−k+1 项。",
          "en": "No slices are created, so working space is constant. The returned array contains n−k+1 items."
        },
        "python": "class Solution:\n    def maxSlidingWindow(self, nums, k):\n        ans = []\n        for left in range(len(nums)-k+1):\n            best = nums[left]\n            for j in range(left+1, left+k): best = max(best, nums[j])\n            ans.append(best)\n        return ans",
        "java": "class Solution {\n    public int[] maxSlidingWindow(int[] nums,int k) {\n        int[] ans=new int[nums.length-k+1];\n        for(int l=0;l<ans.length;l++) {\n            int best=nums[l];\n            for(int j=l+1;j<l+k;j++) best=Math.max(best,nums[j]);\n            ans[l]=best;\n        }\n        return ans;\n    }\n}",
        "trace": [
          {
            "cells": [
              "[2,1,3]",
              "max=3"
            ],
            "note": {
              "zh": "完整扫描首个窗口。",
              "en": "Scan the whole first window."
            }
          },
          {
            "cells": [
              "[1,3,0]",
              "max=3"
            ],
            "note": {
              "zh": "移动一位后再次扫描。",
              "en": "Move one step and rescan."
            }
          },
          {
            "cells": [
              "[3,0,4]",
              "max=4",
              "answer=[3,3,4]"
            ],
            "note": {
              "zh": "最后窗口最大值为 4。",
              "en": "The last window has maximum 4."
            }
          }
        ]
      },
      {
        "key": "deque",
        "name": {
          "zh": "单调双端队列维护候选",
          "en": "Monotonic deque of candidates"
        },
        "intuition": {
          "zh": "队列存下标，并保持对应数值从大到小。新值比队尾大或相等时，队尾更早过期且不更大，在未来任何共同窗口都不可能胜出，因此可淘汰。队首另按下标删除过期项；不能只存数值，否则无法知道何时离窗。",
          "en": "Store indices whose values decrease from front to back. If a new value is at least the tail’s value, the tail expires earlier and is never better in any future shared window, so remove it. Separately expire indices at the front; values alone cannot identify when an item leaves."
        },
        "steps": {
          "zh": [
            "删除队首所有 ≤right−k 的过期下标。",
            "删除值 ≤ 当前值的队尾下标，再把当前下标入队。",
            "形成完整窗口后，以队首对应值作为该窗口最大值。"
          ],
          "en": [
            "Remove front indices ≤right−k because they expired.",
            "Remove tails with values ≤ the new value, then append its index.",
            "Once a full window exists, output the front value."
          ]
        },
        "correctness": {
          "zh": "队列保留所有尚可能成为最大值的候选，按值递减且下标递增；被丢弃者有更晚且不小的替代者，所以队首必是当前最大值。",
          "en": "The deque keeps every potentially useful candidate in decreasing value and increasing index order. Each discarded candidate has a later no-smaller substitute, making the front the current maximum."
        },
        "time": "O(n)",
        "space": "O(k) auxiliary; O(n−k+1) output",
        "complexity": {
          "zh": "每个下标入队一次、出队至多一次，while 循环的总次数 O(n)，不是每轮 O(k)。",
          "en": "Each index enters once and leaves at most once. All while-loop iterations together are O(n), not O(k) per element."
        },
        "python": "from collections import deque\nclass Solution:\n    def maxSlidingWindow(self, nums, k):\n        q, ans = deque(), []\n        for r, x in enumerate(nums):\n            while q and q[0] <= r-k: q.popleft()\n            while q and nums[q[-1]] <= x: q.pop()\n            q.append(r)\n            if r >= k-1: ans.append(nums[q[0]])\n        return ans",
        "java": "import java.util.*;\nclass Solution {\n    public int[] maxSlidingWindow(int[] nums,int k) {\n        Deque<Integer> q=new ArrayDeque<>();\n        int[] ans=new int[nums.length-k+1];\n        for(int r=0;r<nums.length;r++) {\n            while(!q.isEmpty() && q.peekFirst()<=r-k) q.removeFirst();\n            while(!q.isEmpty() && nums[q.peekLast()]<=nums[r]) q.removeLast();\n            q.addLast(r);\n            if(r>=k-1) ans[r-k+1]=nums[q.peekFirst()];\n        }\n        return ans;\n    }\n}",
        "trace": [
          {
            "cells": [
              "r=0,1",
              "q indices=[0,1]",
              "values=[2,1]"
            ],
            "note": {
              "zh": "两个值递减，暂时都可能有用。",
              "en": "Values decrease, so both remain potential candidates."
            }
          },
          {
            "cells": [
              "r=2,x=3",
              "q=[2]",
              "output=3"
            ],
            "note": {
              "zh": "新 3 淘汰较小的 1、2。",
              "en": "The new 3 dominates the older 1 and 2."
            }
          },
          {
            "cells": [
              "r=3,x=0",
              "q=[2,3]",
              "output=3"
            ],
            "note": {
              "zh": "0 不能淘汰 3，排在后面等待。",
              "en": "0 cannot dominate 3, so it waits behind it."
            }
          },
          {
            "cells": [
              "r=4,x=4",
              "q=[4]",
              "output=4"
            ],
            "note": {
              "zh": "新 4 淘汰旧候选，得到 [3,3,4]。",
              "en": "The new 4 replaces the old candidates, finishing [3,3,4]."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/sliding-window-maximum/"
      }
    ],
    "slug": "sliding-window-maximum",
    "title": {
      "zh": "滑动窗口最大值",
      "en": "Sliding Window Maximum"
    },
    "category": {
      "zh": "子串",
      "en": "Substrings"
    },
    "level": {
      "zh": "困难",
      "en": "Hard"
    }
  },
  {
    "id": 76,
    "statement": {
      "zh": "从 s 中找出最短连续片段，包含 t 所需的全部字符及重复次数，返回这个片段；没有则返回空字符串。大小写不同。测试输入保证存在答案时最短答案唯一。",
      "en": "Return the shortest contiguous substring of s containing every character of t with at least its required multiplicity. Matching is case-sensitive. Return an empty string if impossible; test cases guarantee a unique minimum answer when one exists."
    },
    "constraints": {
      "zh": [
        "1 ≤ |s|,|t| ≤ 10⁵",
        "仅含大小写英文字母",
        "重复字符必须满足次数；最短答案唯一"
      ],
      "en": [
        "1 ≤ |s|,|t| ≤ 10⁵",
        "Only uppercase and lowercase English letters",
        "Respect repeated counts; the minimum answer is unique"
      ]
    },
    "example": {
      "zh": "s=\"CABEFAB\", t=\"ABC\" → \"CAB\"。末尾 AB 缺少 C。",
      "en": "s=\"CABEFAB\", t=\"ABC\" → \"CAB\". The final AB lacks C."
    },
    "methods": [
      {
        "key": "enumerate",
        "name": {
          "zh": "枚举起点，扩到首次覆盖（基线）",
          "en": "Extend each start until covered (baseline)"
        },
        "intuition": {
          "zh": "对每个左端点，从空频次数组开始向右扩展；首次覆盖就是该左端的最短可行窗口，后面只会更长，可以停止这一轮。覆盖不是“字符出现过”，而是每个所需字符计数都足够，例如 t=AAB 必须有两个 A。",
          "en": "For each start, build counts while extending right. Its first covering window is the shortest for that start, so further extension is unnecessary. Coverage requires multiplicities, not just presence: t=AAB needs two As."
        },
        "steps": {
          "zh": [
            "统计 t 的需求。",
            "对每个 left 清空 have，逐渐加入右侧字符。",
            "满足全部需求时更新最短边界并停止该起点，最后只截取一次答案。"
          ],
          "en": [
            "Count the requirements of t.",
            "For each left, reset have and extend right incrementally.",
            "On first coverage, update best boundaries and stop that start; slice the final answer once."
          ]
        },
        "correctness": {
          "zh": "任意最优窗口都有一个起点；该起点首次覆盖的窗口不会比它长，枚举所有起点就包含全局最优。",
          "en": "An optimal window has some start. The first covering window from that start is no longer, so considering all starts includes the global optimum."
        },
        "time": "O(n²·Σ+m)",
        "space": "O(Σ) auxiliary; O(L) output",
        "complexity": {
          "zh": "n=|s|、m=|t|，Σ≤128 为代码检查的字符表大小，L 为答案长度。窗口中不反复截串，最后仅复制答案。此法大输入不适合。",
          "en": "n=len(s), m=len(t), Σ≤128 is the checked character table, and L is result length. Only the final result is sliced; no candidate substrings are copied. This baseline is unsuitable for large inputs."
        },
        "python": "class Solution:\n    def minWindow(self, s, t):\n        need = [0]*128\n        for ch in t: need[ord(ch)] += 1\n        best_start, best_len = 0, len(s)+1\n        for left in range(len(s)):\n            have = [0]*128\n            for right in range(left, len(s)):\n                have[ord(s[right])] += 1\n                if all(have[c] >= need[c] for c in range(128)):\n                    if right-left+1 < best_len:\n                        best_start, best_len = left, right-left+1\n                    break\n        return '' if best_len > len(s) else s[best_start:best_start+best_len]",
        "java": "class Solution {\n    public String minWindow(String s,String t) {\n        int[] need=new int[128];\n        for(int i=0;i<t.length();i++) need[t.charAt(i)]++;\n        int start=0,len=s.length()+1;\n        for(int l=0;l<s.length();l++) {\n            int[] have=new int[128];\n            for(int r=l;r<s.length();r++) {\n                have[s.charAt(r)]++; boolean ok=true;\n                for(int c=0;c<128;c++) if(have[c]<need[c]) {ok=false;break;}\n                if(ok) {if(r-l+1<len) {start=l;len=r-l+1;} break;}\n            }\n        }\n        return len>s.length()? \"\" : s.substring(start,start+len);\n    }\n}",
        "trace": [
          {
            "cells": [
              "left=0",
              "C→CA→CAB",
              "best=CAB"
            ],
            "note": {
              "zh": "起点 0 的首次覆盖长 3。",
              "en": "The first covering window from start 0 has length 3."
            }
          },
          {
            "cells": [
              "left=1..6",
              "no C"
            ],
            "note": {
              "zh": "后面的起点都失去唯一的 C，无法覆盖。",
              "en": "Every later start excludes the only C and cannot cover t."
            }
          },
          {
            "cells": [
              "answer=CAB"
            ],
            "note": {
              "zh": "保留唯一最短窗口。",
              "en": "Keep the unique shortest window."
            }
          }
        ]
      },
      {
        "key": "deficit-window",
        "name": {
          "zh": "缺额计数与可收缩窗口",
          "en": "Deficit counts and a shrinking window"
        },
        "intuition": {
          "zh": "need[ch] 表示窗口还缺该字符多少个，负数代表有多余副本；missing 是所有正缺额的总数。右端加入有缺额的字符时 missing 减一。missing=0 后持续缩左端，边缩边记录答案，直到移走一个不可缺少的副本。",
          "en": "need[ch] is the remaining deficit for a character; a negative value means surplus copies. missing counts total unmet character occurrences. An entering needed character reduces missing. Once missing reaches zero, repeatedly record and shrink until removing an essential copy makes coverage fail."
        },
        "steps": {
          "zh": [
            "初始化 need 与 missing=|t|，left=0。",
            "加入右端字符，若其旧缺额为正则 missing 减一，再令缺额减一。",
            "覆盖时保存更短边界，移除左端并恢复缺额；恢复为正时 missing 加一。"
          ],
          "en": [
            "Initialize deficits, missing=len(t), and left=0.",
            "For an entering character, reduce missing if its old deficit is positive, then decrement the deficit.",
            "While covered, save better boundaries and remove the left character; if its restored deficit becomes positive, increase missing."
          ]
        },
        "correctness": {
          "zh": "每个右端点会尽可能收缩到刚失去覆盖，因而已检查以该右端结尾的最短可行窗口；较早丢弃的起点只会生成更长答案。",
          "en": "For every right endpoint, shrinking reaches the first loss of coverage, examining its shortest valid window. Earlier discarded starts cannot improve later, longer windows."
        },
        "time": "O(n+m)",
        "space": "O(Σ) auxiliary; O(L) output",
        "complexity": {
          "zh": "两边界各最多移动 n 次，需求初始化 m 次。固定 128 计数是常数辅助空间；最终字符串复制 L 个字符。",
          "en": "Each boundary moves at most n times and requirements take m updates. The fixed 128-entry table is constant auxiliary space; the final output copies L characters."
        },
        "python": "class Solution:\n    def minWindow(self, s, t):\n        need = [0]*128\n        for ch in t: need[ord(ch)] += 1\n        missing, left = len(t), 0\n        start, length = 0, len(s)+1\n        for right, ch in enumerate(s):\n            c = ord(ch)\n            if need[c] > 0: missing -= 1\n            need[c] -= 1\n            while missing == 0:\n                if right-left+1 < length: start, length = left, right-left+1\n                c = ord(s[left]); need[c] += 1\n                if need[c] > 0: missing += 1\n                left += 1\n        return '' if length > len(s) else s[start:start+length]",
        "java": "class Solution {\n    public String minWindow(String s,String t) {\n        int[] need=new int[128];\n        for(int i=0;i<t.length();i++) need[t.charAt(i)]++;\n        int missing=t.length(),left=0,start=0,len=s.length()+1;\n        for(int right=0;right<s.length();right++) {\n            char c=s.charAt(right);\n            if(need[c]>0) missing--; need[c]--;\n            while(missing==0) {\n                if(right-left+1<len) {start=left;len=right-left+1;}\n                c=s.charAt(left++); need[c]++;\n                if(need[c]>0) missing++;\n            }\n        }\n        return len>s.length()? \"\" : s.substring(start,start+len);\n    }\n}",
        "trace": [
          {
            "cells": [
              "C:missing=2",
              "A:missing=1",
              "B:missing=0"
            ],
            "note": {
              "zh": "读到 CAB 时所有需求满足。",
              "en": "All deficits are met when CAB has been read."
            }
          },
          {
            "cells": [
              "best=CAB",
              "remove C",
              "missing=1",
              "left=1"
            ],
            "note": {
              "zh": "记录后收缩，移出 C 导致缺额恢复。",
              "en": "Record the result, then removing C restores a deficit."
            }
          },
          {
            "cells": [
              "incoming=E,F,A,B",
              "missing=1",
              "answer=CAB"
            ],
            "note": {
              "zh": "后面没有 C，无法再次覆盖。",
              "en": "No later C arrives, so coverage is never restored."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/minimum-window-substring/"
      }
    ],
    "slug": "minimum-window-substring",
    "title": {
      "zh": "最小覆盖子串",
      "en": "Minimum Window Substring"
    },
    "category": {
      "zh": "子串",
      "en": "Substrings"
    },
    "level": {
      "zh": "困难",
      "en": "Hard"
    }
  },
  {
    "id": 53,
    "statement": {
      "zh": "在 nums 中选一个非空且连续的子数组，返回能取得的最大元素和。不能跳过中间元素，也不能用空数组的和 0 替代全负数情况下的答案。",
      "en": "Return the largest sum of any nonempty contiguous subarray of nums. Elements cannot be skipped, and the empty sum zero is not an allowed substitute when every element is negative."
    },
    "constraints": {
      "zh": [
        "1 ≤ n ≤ 10⁵",
        "−10⁴ ≤ nums[i] ≤ 10⁴"
      ],
      "en": [
        "1 ≤ n ≤ 10⁵",
        "−10⁴ ≤ nums[i] ≤ 10⁴"
      ]
    },
    "example": {
      "zh": "nums=[-3,4,-1,2,-6] → 5，来自 [4,-1,2]。",
      "en": "nums=[-3,4,-1,2,-6] → 5, from [4,-1,2]."
    },
    "methods": [
      {
        "key": "enumerate",
        "name": {
          "zh": "枚举区间累加（基线）",
          "en": "Enumerate intervals with running sums (baseline)"
        },
        "intuition": {
          "zh": "每个区间由左右端点确定。固定左端后，扩展右端时只加入新元素，因此不需要再次扫描已经计算过的区间。最大值初始化为首项而非零，确保全负数组仍返回一个非空区间。",
          "en": "Each interval has a left and right endpoint. Once the left endpoint is fixed, extend right by adding only the new element. Initialize best from the first element rather than zero so all-negative inputs still select a nonempty interval."
        },
        "steps": {
          "zh": [
            "best=nums[0]。",
            "枚举 left，并从 total=0 开始向右累加。",
            "每得到一个非空区间和，就更新 best。"
          ],
          "en": [
            "Initialize best=nums[0].",
            "For each left, start total=0 and accumulate toward the right.",
            "Update best for every nonempty interval."
          ]
        },
        "correctness": {
          "zh": "每个非空区间被访问一次，且最大值初始即对应合法区间，因此最终最大值正确。",
          "en": "Every nonempty interval is visited once, and initialization already represents a valid interval, so the final maximum is valid and complete."
        },
        "time": "O(n²)",
        "space": "O(1)",
        "complexity": {
          "zh": "共有 n(n+1)/2 个区间，每次扩展 O(1)；只存总和与最大值。",
          "en": "There are n(n+1)/2 intervals, each extension is O(1), and only a sum and maximum are retained."
        },
        "python": "class Solution:\n    def maxSubArray(self, nums):\n        best = nums[0]\n        for l in range(len(nums)):\n            total = 0\n            for r in range(l, len(nums)):\n                total += nums[r]\n                best = max(best, total)\n        return best",
        "java": "class Solution {\n    public int maxSubArray(int[] nums) {\n        int best=nums[0];\n        for(int l=0;l<nums.length;l++) {\n            int total=0;\n            for(int r=l;r<nums.length;r++) {total+=nums[r];best=Math.max(best,total);}\n        }\n        return best;\n    }\n}",
        "trace": [
          {
            "cells": [
              "left=0",
              "sums=-3,1,0,2,-4",
              "best=2"
            ],
            "note": {
              "zh": "固定起点 0 时最大只能达到 2。",
              "en": "With start 0, the largest running sum is 2."
            }
          },
          {
            "cells": [
              "left=1",
              "sums=4,3,5,-1",
              "best=5"
            ],
            "note": {
              "zh": "起点 1 扩到下标 3 得到 5。",
              "en": "Extending start 1 through index 3 yields 5."
            }
          },
          {
            "cells": [
              "left=2..4",
              "max=2",
              "answer=5"
            ],
            "note": {
              "zh": "剩余起点无法超过已经保存的 5。",
              "en": "The remaining starts cannot improve the saved 5."
            }
          }
        ]
      },
      {
        "key": "kadane",
        "name": {
          "zh": "Kadane：以当前位置结尾的最优和",
          "en": "Kadane: best sum ending at the current position"
        },
        "intuition": {
          "zh": "先约束“必须在当前位置结束”。这样的最优区间只能是当前数自己，或在前一个位置结尾的最优区间后追加当前数。旧和若为负就会拖累，重新开始更好；旧和为正才值得继承。ending 与全局 best 不要混为一谈。",
          "en": "First require the subarray to end at the current position. It either starts here or extends the best subarray ending one position earlier. A negative prior sum is harmful, so restart; a positive one is worth extending. Keep ending separate from the global best."
        },
        "steps": {
          "zh": [
            "ending=best=nums[0]。",
            "对后续 x，计算 ending=max(x,ending+x)。",
            "best=max(best,ending)，扫描结束返回 best。"
          ],
          "en": [
            "Initialize ending=best=nums[0].",
            "For each later x, set ending=max(x,ending+x).",
            "Update best=max(best,ending) and return best after the scan."
          ]
        },
        "correctness": {
          "zh": "任何以当前位置结尾且长度大于一的区间都由前一位置结尾的区间扩展而来，选择其中最大者不会损失解；全局最优必有一个结尾。",
          "en": "Every longer subarray ending here extends one ending at the previous position. Keeping only the best such predecessor loses no optimal candidate, and every global optimum has some endpoint."
        },
        "time": "O(n)",
        "space": "O(1)",
        "complexity": {
          "zh": "每项做固定次加法和比较，不需要 DP 数组，也不创建 nums[1:] 切片。",
          "en": "Constant additions and comparisons per element; no DP array or nums[1:] slice is created."
        },
        "python": "class Solution:\n    def maxSubArray(self, nums):\n        ending = best = nums[0]\n        for i in range(1, len(nums)):\n            ending = max(nums[i], ending+nums[i])\n            best = max(best, ending)\n        return best",
        "java": "class Solution {\n    public int maxSubArray(int[] nums) {\n        int ending=nums[0],best=nums[0];\n        for(int i=1;i<nums.length;i++) {\n            ending=Math.max(nums[i],ending+nums[i]); best=Math.max(best,ending);\n        }\n        return best;\n    }\n}",
        "trace": [
          {
            "cells": [
              "x=-3",
              "ending=-3",
              "best=-3"
            ],
            "note": {
              "zh": "初始化为首项，排除空区间。",
              "en": "Initialize from the first item, excluding empty intervals."
            }
          },
          {
            "cells": [
              "x=4",
              "ending=max(4,1)=4",
              "best=4"
            ],
            "note": {
              "zh": "旧负和应丢弃，从 4 重开。",
              "en": "Discard the negative predecessor and restart at 4."
            }
          },
          {
            "cells": [
              "x=-1→2",
              "ending=3→5",
              "best=5"
            ],
            "note": {
              "zh": "接续当前区间优于重开。",
              "en": "Extending the current interval is better than restarting."
            }
          },
          {
            "cells": [
              "x=-6",
              "ending=-1",
              "best=5"
            ],
            "note": {
              "zh": "当前结束值下降不影响历史最优。",
              "en": "A worse current ending does not erase the global best."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/maximum-subarray/"
      }
    ],
    "slug": "maximum-subarray",
    "title": {
      "zh": "最大子数组和",
      "en": "Maximum Subarray"
    },
    "category": {
      "zh": "普通数组",
      "en": "Arrays"
    },
    "level": {
      "zh": "中等",
      "en": "Medium"
    }
  },
  {
    "id": 56,
    "statement": {
      "zh": "输入若干闭区间 [start,end]，将所有直接或间接重叠的区间合并，返回互不重叠且覆盖范围与原输入完全一致的区间集合。端点相接也算重叠，例如 [1,4] 与 [4,6]。",
      "en": "Merge closed intervals that overlap directly or through a chain. Return disjoint intervals with exactly the same union as the input. Touching endpoints count as overlap, for example [1,4] and [4,6]."
    },
    "constraints": {
      "zh": [
        "1 ≤ 区间数 n ≤ 10⁴",
        "每个区间有两个端点",
        "0 ≤ start ≤ end ≤ 10⁴"
      ],
      "en": [
        "1 ≤ interval count n ≤ 10⁴",
        "Each interval has two endpoints",
        "0 ≤ start ≤ end ≤ 10⁴"
      ]
    },
    "example": {
      "zh": "[[5,8],[1,3],[2,4]] → [[1,4],[5,8]]",
      "en": "[[5,8],[1,3],[2,4]] → [[1,4],[5,8]]"
    },
    "methods": [
      {
        "key": "sort-merge",
        "name": {
          "zh": "按起点排序后合并",
          "en": "Sort by start, then merge"
        },
        "intuition": {
          "zh": "按起点排序后，当前新区间只需与最后一个已合并区间比较。如果它的起点大于最后终点，就与所有更早区间也不相交；否则扩大最后终点。终点必须取 max，嵌套区间不能让当前覆盖范围缩小。",
          "en": "After sorting by start, a new interval only needs comparison with the last merged interval. If its start exceeds the last end, it also misses every earlier interval; otherwise extend that last end. Use max so a nested interval cannot shrink existing coverage."
        },
        "steps": {
          "zh": [
            "复制区间并按起点排序。",
            "结果为空或新起点大于最后终点时，加入新区间。",
            "否则把最后终点更新为两者终点最大值。"
          ],
          "en": [
            "Copy intervals and sort by start.",
            "Append when the result is empty or the new start exceeds the last end.",
            "Otherwise replace the last end with the greater endpoint."
          ]
        },
        "correctness": {
          "zh": "结果始终按起点有序且互不重叠；新段只可能与最后段相连，合并保持并集不变，分开则保留真实空隙。",
          "en": "The result stays sorted and disjoint. Only its last interval can connect to the next one; merging preserves the union and separating preserves a genuine gap."
        },
        "time": "O(n log n)",
        "space": "O(n)",
        "complexity": {
          "zh": "排序副本和结果最多 n 段；扫描线性，排序决定总体时间，不修改原输入。",
          "en": "The sorted copy and result each contain at most n intervals. The scan is linear and sorting dominates; the original input is not modified."
        },
        "python": "class Solution:\n    def merge(self, intervals):\n        ans = []\n        for start, end in sorted(intervals):\n            if not ans or start > ans[-1][1]: ans.append([start, end])\n            else: ans[-1][1] = max(ans[-1][1], end)\n        return ans",
        "java": "import java.util.*;\nclass Solution {\n    public int[][] merge(int[][] intervals) {\n        int[][] a=new int[intervals.length][];\n        for(int i=0;i<a.length;i++) a[i]=intervals[i].clone();\n        Arrays.sort(a,Comparator.comparingInt(x->x[0]));\n        List<int[]> ans=new ArrayList<>();\n        for(int[] x:a) {\n            if(ans.isEmpty() || x[0]>ans.get(ans.size()-1)[1]) ans.add(x);\n            else {int[] last=ans.get(ans.size()-1);last[1]=Math.max(last[1],x[1]);}\n        }\n        return ans.toArray(new int[ans.size()][]);\n    }\n}",
        "trace": [
          {
            "cells": [
              "[1,3],[2,4],[5,8]"
            ],
            "note": {
              "zh": "按左端排序副本。",
              "en": "Sort the copied intervals by start."
            }
          },
          {
            "cells": [
              "2≤3",
              "merge → [1,4]"
            ],
            "note": {
              "zh": "下一起点落入已有覆盖，扩大终点。",
              "en": "The next start lies inside the current coverage, so extend its end."
            }
          },
          {
            "cells": [
              "5>4",
              "[[1,4],[5,8]]"
            ],
            "note": {
              "zh": "出现真实空隙，开启新区间。",
              "en": "A genuine gap starts a new interval."
            }
          }
        ]
      },
      {
        "key": "events",
        "name": {
          "zh": "端点事件扫描线",
          "en": "Sweep start and end events"
        },
        "intuition": {
          "zh": "把每个起点记为进入事件、终点记为离开事件，按坐标排序。active 表示当前有多少区间尚未结束。它从 0 变正时开始一段，从正变 0 时结束一段。同坐标必须先处理起点，再处理终点，才会把端点相接的闭区间合并。",
          "en": "Turn starts into entering events and ends into leaving events, sorted by coordinate. active counts intervals currently open. A transition from zero starts a merged interval; a transition back to zero ends it. At equal coordinates process starts first so closed intervals touching at an endpoint merge."
        },
        "steps": {
          "zh": [
            "构建 (start,+1)、(end,−1) 事件。",
            "按坐标升序，同坐标 +1 优先。",
            "active 为零时记录起点，累加事件后回到零时输出区间。"
          ],
          "en": [
            "Create (start,+1) and (end,−1) events.",
            "Sort by coordinate, placing +1 before −1 on ties.",
            "Record a start when active is zero; emit an interval when applying an event returns it to zero."
          ]
        },
        "correctness": {
          "zh": "active>0 的坐标段正是输入并集；起点优先处理确保同坐标不会产生虚假的空隙，包括零长度区间。",
          "en": "Regions with active>0 are exactly the input union. Start-first tie handling avoids false gaps at shared coordinates and also handles zero-length intervals."
        },
        "time": "O(n log n)",
        "space": "O(n)",
        "complexity": {
          "zh": "2n 个事件排序，线性扫描；事件数组及输出均为 O(n)。",
          "en": "Sort 2n events and scan them once; both event storage and output are O(n)."
        },
        "python": "class Solution:\n    def merge(self, intervals):\n        events = []\n        for start, end in intervals:\n            events.append((start, 1))\n            events.append((end, -1))\n        events.sort(key=lambda e: (e[0], -e[1]))\n        active, start, ans = 0, 0, []\n        for x, delta in events:\n            if active == 0: start = x\n            active += delta\n            if active == 0: ans.append([start, x])\n        return ans",
        "java": "import java.util.*;\nclass Solution {\n    public int[][] merge(int[][] intervals) {\n        int[][] events=new int[2*intervals.length][2]; int i=0;\n        for(int[] x:intervals) {events[i++]=new int[]{x[0],1};events[i++]=new int[]{x[1],-1};}\n        Arrays.sort(events,(a,b)->a[0]!=b[0]?Integer.compare(a[0],b[0]):Integer.compare(b[1],a[1]));\n        int active=0,start=0; List<int[]> ans=new ArrayList<>();\n        for(int[] e:events) {\n            if(active==0) start=e[0]; active+=e[1];\n            if(active==0) ans.add(new int[]{start,e[0]});\n        }\n        return ans.toArray(new int[ans.size()][]);\n    }\n}",
        "trace": [
          {
            "cells": [
              "1:+1",
              "2:+1",
              "3:-1",
              "4:-1",
              "5:+1",
              "8:-1"
            ],
            "note": {
              "zh": "先把端点转为有序进入/离开事件。",
              "en": "Convert endpoints into ordered enter/leave events."
            }
          },
          {
            "cells": [
              "x=1,2,3,4",
              "active=1,2,1,0",
              "emit=[1,4]"
            ],
            "note": {
              "zh": "直到 4 才回到零，因此前两段连成一段。",
              "en": "Activity returns to zero only at 4, joining the first two intervals."
            }
          },
          {
            "cells": [
              "x=5,8",
              "active=1,0",
              "emit=[5,8]"
            ],
            "note": {
              "zh": "重新从 5 开始并在 8 结束。",
              "en": "A new covered region begins at 5 and ends at 8."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/merge-intervals/"
      }
    ],
    "slug": "merge-intervals",
    "title": {
      "zh": "合并区间",
      "en": "Merge Intervals"
    },
    "category": {
      "zh": "普通数组",
      "en": "Arrays"
    },
    "level": {
      "zh": "中等",
      "en": "Medium"
    }
  },
  {
    "id": 189,
    "statement": {
      "zh": "把 nums 向右循环移动 k 个位置，直接更新原数组。右端越界的元素从左端重新进入，所有元素的循环相对顺序保持不变；k 是非负整数。",
      "en": "Rotate nums right by k positions by updating the original array. Values passing the right edge wrap around to the left, preserving cyclic order. k is nonnegative."
    },
    "constraints": {
      "zh": [
        "1 ≤ n ≤ 10⁵",
        "元素为有符号 32 位整数",
        "0 ≤ k ≤ 10⁵；进阶要求 O(1) 额外空间"
      ],
      "en": [
        "1 ≤ n ≤ 10⁵",
        "Signed 32-bit integer values",
        "0 ≤ k ≤ 10⁵; follow-up: O(1) extra space"
      ]
    },
    "example": {
      "zh": "nums=[1,2,3,4,5], k=2 → [4,5,1,2,3]",
      "en": "nums=[1,2,3,4,5], k=2 → [4,5,1,2,3]"
    },
    "methods": [
      {
        "key": "copy-map",
        "name": {
          "zh": "辅助数组直接定位",
          "en": "Map each value into an auxiliary array"
        },
        "intuition": {
          "zh": "原位置 i 右移后是 (i+k)%n。直接在原数组写会覆盖还没搬走的值，因此先写入独立数组，再逐项复制回来。不是把局部变量 nums 改指向新数组，而是更新调用者传入的数组本身。",
          "en": "Original index i moves to (i+k)%n. Writing directly would overwrite values not yet moved, so place values in a separate array and copy them back. Update the caller’s actual array rather than merely rebinding a local variable named nums."
        },
        "steps": {
          "zh": [
            "k%=n，消除完整转圈。",
            "为每个 i 设置 out[(i+k)%n]=nums[i]。",
            "逐项把 out 写回 nums。"
          ],
          "en": [
            "Reduce k modulo n to remove full rotations.",
            "Set out[(i+k)%n]=nums[i] for each i.",
            "Copy out back into nums element by element."
          ]
        },
        "correctness": {
          "zh": "模 n 的固定平移是下标集合上的一一映射，每个原元素恰好写到唯一目标位置。",
          "en": "A fixed shift modulo n is a bijection on indices, so every original value reaches exactly one distinct destination."
        },
        "time": "O(n)",
        "space": "O(n)",
        "complexity": {
          "zh": "一次定位、一次写回，共线性工作；辅助数组 n 项。",
          "en": "One placement pass and one copy-back pass use linear time and a length-n auxiliary array."
        },
        "python": "class Solution:\n    def rotate(self, nums, k):\n        n = len(nums)\n        k %= n\n        out = [0]*n\n        for i, x in enumerate(nums): out[(i+k)%n] = x\n        for i in range(n): nums[i] = out[i]",
        "java": "class Solution {\n    public void rotate(int[] nums,int k) {\n        int n=nums.length; k%=n; int[] out=new int[n];\n        for(int i=0;i<n;i++) out[(i+k)%n]=nums[i];\n        for(int i=0;i<n;i++) nums[i]=out[i];\n    }\n}",
        "trace": [
          {
            "cells": [
              "i=0,1,2",
              "dest=2,3,4",
              "out=[_,_,1,2,3]"
            ],
            "note": {
              "zh": "前三项向右移动两个位置。",
              "en": "The first three values move two positions right."
            }
          },
          {
            "cells": [
              "i=3,4",
              "dest=0,1",
              "out=[4,5,1,2,3]"
            ],
            "note": {
              "zh": "后两项取模回到前端。",
              "en": "The last two wrap around to the front."
            }
          },
          {
            "cells": [
              "nums=[4,5,1,2,3]"
            ],
            "note": {
              "zh": "逐项写回原数组，调用者才看到变化。",
              "en": "Copy back into the original array so the caller observes the change."
            }
          }
        ]
      },
      {
        "key": "reverse",
        "name": {
          "zh": "三次原地反转",
          "en": "Three in-place reversals"
        },
        "intuition": {
          "zh": "把数组分为 A（前 n−k 项）和 B（后 k 项），目标是 AB→BA。整个数组反转得到 reverse(B)reverse(A)，再分别反转这两块，内部顺序恢复，位置却已交换。这避免保存整份副本。",
          "en": "Split the array into A, the first n−k items, and B, the final k items. The target is AB→BA. Reversing everything gives reverse(B)reverse(A); reversing each block restores its internal order while preserving the exchanged positions. No array copy is needed."
        },
        "steps": {
          "zh": [
            "k%=n，双指针反转整个数组。",
            "反转下标 0..k−1。",
            "反转下标 k..n−1；k=0 时空段不做任何交换。"
          ],
          "en": [
            "Reduce k modulo n and reverse the whole array with endpoint swaps.",
            "Reverse indices 0..k−1.",
            "Reverse indices k..n−1; an empty segment when k=0 performs no swaps."
          ]
        },
        "correctness": {
          "zh": "整体反转交换两段并倒置各段；后两次只修复段内顺序，因此结果恰是 B 后接 A。",
          "en": "The first reversal exchanges the blocks and reverses each internally. The last two restore internal order, leaving exactly B followed by A."
        },
        "time": "O(n)",
        "space": "O(1)",
        "complexity": {
          "zh": "三段反转访问长度总计 2n，使用下标和单个交换临时值；没有切片。",
          "en": "The three reversed segment lengths total 2n; only indices and a swap temporary are used, with no slicing."
        },
        "python": "class Solution:\n    def rotate(self, nums, k):\n        k %= len(nums)\n        def reverse(l, r):\n            while l < r:\n                nums[l], nums[r] = nums[r], nums[l]\n                l += 1\n                r -= 1\n        reverse(0, len(nums)-1)\n        reverse(0, k-1)\n        reverse(k, len(nums)-1)",
        "java": "class Solution {\n    private void reverse(int[] a,int l,int r) {\n        while(l<r) {int t=a[l];a[l++]=a[r];a[r--]=t;}\n    }\n    public void rotate(int[] nums,int k) {\n        k%=nums.length;\n        reverse(nums,0,nums.length-1); reverse(nums,0,k-1); reverse(nums,k,nums.length-1);\n    }\n}",
        "trace": [
          {
            "cells": [
              "[5,4,3,2,1]"
            ],
            "note": {
              "zh": "整体反转，两块顺序互换但内部也反了。",
              "en": "Reverse everything: block order and internal order both flip."
            }
          },
          {
            "cells": [
              "[4,5,3,2,1]"
            ],
            "note": {
              "zh": "反转前 k=2 项，恢复 B。",
              "en": "Reverse the first k=2 items to restore B."
            }
          },
          {
            "cells": [
              "[4,5,1,2,3]"
            ],
            "note": {
              "zh": "反转剩余部分，恢复 A。",
              "en": "Reverse the remainder to restore A."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/rotate-array/"
      }
    ],
    "slug": "rotate-array",
    "title": {
      "zh": "轮转数组",
      "en": "Rotate Array"
    },
    "category": {
      "zh": "普通数组",
      "en": "Arrays"
    },
    "level": {
      "zh": "中等",
      "en": "Medium"
    }
  },
  {
    "id": 238,
    "statement": {
      "zh": "返回数组 answer，其中 answer[i] 是 nums 中除下标 i 外所有元素的乘积。不得使用除法，必须 O(n) 时间。输入可含零或负数；前缀积、后缀积及每个答案保证能用有符号 32 位整数表示。",
      "en": "Return answer where answer[i] multiplies every input element except the one at index i. Division is forbidden and O(n) time is required. Zeros and negative values are allowed; prefix products, suffix products and answers fit signed 32-bit integers."
    },
    "constraints": {
      "zh": [
        "2 ≤ n ≤ 10⁵",
        "−30 ≤ nums[i] ≤ 30",
        "前后缀积及答案适合 32 位整数",
        "禁止除法；要求 O(n)，进阶 O(1) 辅助空间（不含输出）"
      ],
      "en": [
        "2 ≤ n ≤ 10⁵",
        "−30 ≤ nums[i] ≤ 30",
        "Prefix/suffix products and answers fit 32-bit integers",
        "No division; O(n) time; follow-up O(1) auxiliary space excluding output"
      ]
    },
    "example": {
      "zh": "nums=[2,3,4] → [12,8,6]",
      "en": "nums=[2,3,4] → [12,8,6]"
    },
    "methods": [
      {
        "key": "two-arrays",
        "name": {
          "zh": "分别建立左积和右积",
          "en": "Separate left and right product arrays"
        },
        "intuition": {
          "zh": "除自己之外可以拆成“严格在左边的乘积×严格在右边的乘积”。两部分没有交集，也没有漏项。空乘积定义为 1，因此边界不用特殊分支；即使包含零也照常计算，不必分类讨论。",
          "en": "Everything except i splits into the product strictly to its left and strictly to its right. The sets are disjoint and cover every required element. An empty product is one, making boundaries natural and handling zeros without special cases."
        },
        "steps": {
          "zh": [
            "left[0]=1，left[i]=left[i−1]×nums[i−1]。",
            "right[n−1]=1，right[i]=right[i+1]×nums[i+1]。",
            "逐项返回 left[i]×right[i]。"
          ],
          "en": [
            "Set left[0]=1 and left[i]=left[i−1]×nums[i−1].",
            "Set right[n−1]=1 and right[i]=right[i+1]×nums[i+1].",
            "Return left[i]×right[i] for each position."
          ]
        },
        "correctness": {
          "zh": "两个递推分别保持不含当前位置的严格前后缀积，它们的乘积恰好覆盖除当前位置以外的所有元素。",
          "en": "The recurrences maintain products strictly before and after each position. Multiplying them includes all and only the other elements."
        },
        "time": "O(n)",
        "space": "O(n) auxiliary + O(n) output",
        "complexity": {
          "zh": "两个长度 n 的辅助数组，三次线性遍历；满足时间及禁除法要求，但没有达到常数辅助空间进阶。",
          "en": "Two auxiliary length-n arrays and three linear scans satisfy the time and no-division requirements, but not the constant-auxiliary-space follow-up."
        },
        "python": "class Solution:\n    def productExceptSelf(self, nums):\n        n = len(nums)\n        left, right = [1]*n, [1]*n\n        for i in range(1, n): left[i] = left[i-1]*nums[i-1]\n        for i in range(n-2, -1, -1): right[i] = right[i+1]*nums[i+1]\n        return [left[i]*right[i] for i in range(n)]",
        "java": "class Solution {\n    public int[] productExceptSelf(int[] nums) {\n        int n=nums.length; int[] left=new int[n],right=new int[n],ans=new int[n];\n        left[0]=1; right[n-1]=1;\n        for(int i=1;i<n;i++) left[i]=left[i-1]*nums[i-1];\n        for(int i=n-2;i>=0;i--) right[i]=right[i+1]*nums[i+1];\n        for(int i=0;i<n;i++) ans[i]=left[i]*right[i];\n        return ans;\n    }\n}",
        "trace": [
          {
            "cells": [
              "left=[1,2,6]"
            ],
            "note": {
              "zh": "每项只包含严格左侧的乘积。",
              "en": "Each entry contains only the product strictly to its left."
            }
          },
          {
            "cells": [
              "right=[12,4,1]"
            ],
            "note": {
              "zh": "右侧同理，边界空乘积为 1。",
              "en": "Apply the same rule on the right; an empty product is 1."
            }
          },
          {
            "cells": [
              "1×12",
              "2×4",
              "6×1",
              "[12,8,6]"
            ],
            "note": {
              "zh": "对应左右乘积相乘。",
              "en": "Multiply corresponding left and right products."
            }
          }
        ]
      },
      {
        "key": "output-prefix",
        "name": {
          "zh": "输出复用前缀，滚动维护后缀",
          "en": "Store prefixes in output and roll the suffix"
        },
        "intuition": {
          "zh": "左积无需保留在独立数组，直接写入答案。反向扫描时，右积也只需要一个 suffix 变量，因为从 i 走到 i−1 时只多一个 nums[i]。先让答案乘 suffix，再更新 suffix，确保当前位置不被算进自己的答案。",
          "en": "Store left products directly in the output. During a reverse scan, a single suffix variable is enough: moving from i to i−1 adds only nums[i]. Multiply the output by suffix before updating suffix, keeping the current value out of its own answer."
        },
        "steps": {
          "zh": [
            "第一次正向扫描，先写 prefix，再让 prefix 乘当前数。",
            "suffix=1，反向扫描，先让 ans[i] 乘 suffix。",
            "随后 suffix*=nums[i]，继续到左端。"
          ],
          "en": [
            "Scan forward, writing prefix before multiplying it by the current value.",
            "Start suffix=1 and scan backward, multiplying ans[i] by suffix.",
            "Then update suffix*=nums[i] and continue left."
          ]
        },
        "correctness": {
          "zh": "正向完成后答案保存严格左积；反向处理 i 时 suffix 正好是严格右积，相乘后该项最终正确且不再修改。",
          "en": "The forward pass stores strict left products. At reverse position i, suffix is exactly the strict right product; their multiplication finalizes that entry."
        },
        "time": "O(n)",
        "space": "O(1) auxiliary + O(n) output",
        "complexity": {
          "zh": "两次扫描各 n 项，仅 prefix、suffix 等常数变量。返回数组本身占 O(n)，按题目进阶约定不计辅助空间。",
          "en": "Two length-n scans use only constant scalar state. The returned array is O(n), excluded from auxiliary space under the follow-up convention."
        },
        "python": "class Solution:\n    def productExceptSelf(self, nums):\n        ans = [1]*len(nums)\n        prefix = 1\n        for i in range(len(nums)):\n            ans[i] = prefix\n            prefix *= nums[i]\n        suffix = 1\n        for i in range(len(nums)-1, -1, -1):\n            ans[i] *= suffix\n            suffix *= nums[i]\n        return ans",
        "java": "class Solution {\n    public int[] productExceptSelf(int[] nums) {\n        int[] ans=new int[nums.length]; int prefix=1,suffix=1;\n        for(int i=0;i<nums.length;i++) {ans[i]=prefix;prefix*=nums[i];}\n        for(int i=nums.length-1;i>=0;i--) {ans[i]*=suffix;suffix*=nums[i];}\n        return ans;\n    }\n}",
        "trace": [
          {
            "cells": [
              "ans=[1,2,6]",
              "suffix=1"
            ],
            "note": {
              "zh": "答案先临时保存左积。",
              "en": "Temporarily store left products in the output."
            }
          },
          {
            "cells": [
              "i=2:6×1=6",
              "suffix=4",
              "i=1:2×4=8",
              "suffix=12"
            ],
            "note": {
              "zh": "先乘旧 suffix，再把当前值纳入 suffix。",
              "en": "Multiply by the old suffix before including the current value."
            }
          },
          {
            "cells": [
              "i=0:1×12=12",
              "ans=[12,8,6]"
            ],
            "note": {
              "zh": "最后一项也只乘右侧元素。",
              "en": "The final update likewise uses only right-side values."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/product-of-array-except-self/"
      }
    ],
    "slug": "product-of-array-except-self",
    "title": {
      "zh": "除了自身以外数组的乘积",
      "en": "Product of Array Except Self"
    },
    "category": {
      "zh": "普通数组",
      "en": "Arrays"
    },
    "level": {
      "zh": "中等",
      "en": "Medium"
    }
  },
  {
    "id": 41,
    "statement": {
      "zh": "在无序整数数组 nums 中寻找未出现过的最小正整数。负数、0 和重复值都可能存在。最终方案必须达到线性时间、常数辅助空间；集合方案仅用于理解，不满足空间要求。",
      "en": "Find the least positive integer absent from an unsorted integer array. Values may repeat or be nonpositive. The required solution must use linear time and constant auxiliary space; the set version is a learning baseline that fails the space requirement."
    },
    "constraints": {
      "zh": [
        "1 ≤ n ≤ 100000；n 为数组长度。",
        "元素在有符号 32 位整数范围内。"
      ],
      "en": [
        "1 ≤ n ≤ 100000, where n is the array length.",
        "Values fit in signed 32-bit integers."
      ]
    },
    "example": {
      "zh": "nums=[2,5,1,2] → 3。1、2 已出现，3 尚未出现。",
      "en": "nums=[2,5,1,2] → 3. Both 1 and 2 occur, while 3 does not."
    },
    "methods": [
      {
        "key": "set",
        "name": {
          "zh": "集合记录（空间不满足要求）",
          "en": "Membership set (space baseline)"
        },
        "intuition": {
          "zh": "先把“出现过哪些值”和“应检查哪个候选数”分开。长度为 n 的数组最多覆盖 n 个不同正数，因此不用无穷地查下去：答案一定落在 1..n+1。集合让每次存在性判断期望为常数时间，便于先验证题意，再思考如何消除额外集合。",
          "en": "Separate membership from candidate enumeration. An array of length n cannot contain all n+1 positive integers from 1 through n+1. Thus the first missing candidate is guaranteed to appear in this finite range. A set provides expected constant-time membership and makes a useful baseline before removing its memory cost."
        },
        "steps": {
          "zh": [
            "把所有元素放入集合；负数不会影响后续只查正数的过程。",
            "按 1、2、…、n+1 查询，第一次查不到就返回。"
          ],
          "en": [
            "Insert all values into a set; nonpositive entries are harmless.",
            "Check 1 through n+1 in increasing order and return the first absent value."
          ]
        },
        "correctness": {
          "zh": "检查 x 时，所有小于 x 的正整数已经确认存在；若 x 不存在，它自然是最小缺失值。鸽巢原理保证循环会找到答案。",
          "en": "Before checking x, every smaller positive integer has been confirmed present. The first absent x is therefore minimal, and the pigeonhole principle guarantees termination."
        },
        "time": "Expected O(n)",
        "space": "O(n)",
        "complexity": {
          "zh": "建集合和至多 n+1 次查询均为期望 O(n)；集合最多保存 n 个值，O(n) 辅助空间。",
          "en": "Building the set and at most n+1 expected constant-time lookups take expected O(n) time. Up to n stored values require O(n) auxiliary space."
        },
        "python": "class Solution:\n    def firstMissingPositive(self, nums):\n        seen = set(nums)\n        for x in range(1, len(nums) + 2):\n            if x not in seen:\n                return x\n",
        "java": "import java.util.*;\nclass Solution {\n    public int firstMissingPositive(int[] nums) {\n        Set<Integer> seen = new HashSet<>();\n        for (int x : nums) seen.add(x);\n        for (int x = 1; x <= nums.length + 1; x++)\n            if (!seen.contains(x)) return x;\n        throw new AssertionError();\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "[2,5,1,2]",
              "seen={1,2,5}"
            ],
            "note": {
              "zh": "重复的 2 只占一个集合位置。",
              "en": "Duplicate 2 occupies only one set entry."
            }
          },
          {
            "cells": [
              "x=1 ✓",
              "x=2 ✓"
            ],
            "note": {
              "zh": "从最小正数向上检查，1 和 2 都存在。",
              "en": "Check upward from one: both 1 and 2 exist."
            }
          },
          {
            "cells": [
              "x=3 ✗",
              "answer=3"
            ],
            "note": {
              "zh": "第一次缺失的候选就是最小缺失正数。",
              "en": "The first missing candidate is the answer."
            }
          }
        ]
      },
      {
        "key": "placement",
        "name": {
          "zh": "原地归位",
          "en": "In-place placement"
        },
        "intuition": {
          "zh": "把数组下标看作正整数的专属位置：值 x 应放到下标 x-1。只有 1..n 值得归位，其他数都不能改变答案的前 n 个候选。交换后当前位置可能又拿到一个有效值，所以要继续处理而不是立刻前进。目标已等于 x 时必须停止，这正是重复值避免死循环的关键。",
          "en": "Treat index x-1 as the home of value x. Only values in 1..n matter for these slots. A swap can bring another useful value into the current index, so process it again. If the destination already contains x, stop: swapping equal values would never make progress."
        },
        "steps": {
          "zh": [
            "遍历 i；当 nums[i] 在 1..n 内且目标位置不是同值时，把它交换到目标位置。",
            "完成所有归位后，从左到右找第一个 nums[i] != i+1，返回 i+1。",
            "若每个位置正确，1..n 都存在，返回 n+1。"
          ],
          "en": [
            "At each i, repeatedly move an in-range value to its home unless that home already holds the same value.",
            "Scan for the first index with nums[i] != i+1 and return i+1.",
            "If every slot matches, return n+1."
          ]
        },
        "correctness": {
          "zh": "每次有效交换都把一个值永久送到正确位置，之后不会把它换走。处理结束时，任何出现过的 1..n 都在对应位置；首个空缺就是答案。",
          "en": "Each effective swap permanently fills a correct home. Later swaps cannot evict a correctly placed value. Hence every present value in 1..n occupies its slot, and the first mismatch identifies the missing value."
        },
        "time": "O(n)",
        "space": "O(1)",
        "complexity": {
          "zh": "循环虽嵌套，每次交换都新增一个正确位置，因此总交换次数 ≤ n；加扫描 O(n)。仅几个变量，O(1)，但会修改输入数组。",
          "en": "Despite nesting, each swap fixes a new slot, so there are at most n swaps. Scans add O(n) time. Only constant auxiliary storage is used; the input is modified."
        },
        "python": "class Solution:\n    def firstMissingPositive(self, nums):\n        n = len(nums)\n        for i in range(n):\n            while 1 <= nums[i] <= n and nums[nums[i] - 1] != nums[i]:\n                j = nums[i] - 1\n                nums[i], nums[j] = nums[j], nums[i]\n        for i, x in enumerate(nums):\n            if x != i + 1:\n                return i + 1\n        return n + 1\n",
        "java": "class Solution {\n    public int firstMissingPositive(int[] nums) {\n        int n = nums.length;\n        for (int i = 0; i < n; i++) {\n            while (nums[i] >= 1 && nums[i] <= n && nums[nums[i]-1] != nums[i]) {\n                int j = nums[i]-1, t = nums[i];\n                nums[i] = nums[j]; nums[j] = t;\n            }\n        }\n        for (int i = 0; i < n; i++) if (nums[i] != i+1) return i+1;\n        return n+1;\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "[2,5,1,2]",
              "i=0: 2 → index 1"
            ],
            "note": {
              "zh": "2 的正确位置是下标 1。",
              "en": "Value 2 belongs at index 1."
            }
          },
          {
            "cells": [
              "[5,2,1,2]",
              "i=2: 1 → index 0"
            ],
            "note": {
              "zh": "5 越界不处理，随后把 1 放回下标 0。",
              "en": "Ignore out-of-range 5, then move 1 to index 0."
            }
          },
          {
            "cells": [
              "[1,2,5,2]",
              "index 2 ≠ 3",
              "answer=3"
            ],
            "note": {
              "zh": "重复的 2 不再交换，扫描发现 3 缺失。",
              "en": "Do not swap the duplicate 2; scanning finds 3 absent."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/first-missing-positive/description/"
      },
      {
        "label": {
          "zh": "力扣原题（中文）",
          "en": "LeetCode problem (Chinese)"
        },
        "url": "https://leetcode.cn/problems/first-missing-positive/"
      }
    ],
    "slug": "first-missing-positive",
    "title": {
      "zh": "缺失的第一个正数",
      "en": "First Missing Positive"
    },
    "category": {
      "zh": "普通数组",
      "en": "Arrays"
    },
    "level": {
      "zh": "困难",
      "en": "Hard"
    }
  },
  {
    "id": 73,
    "statement": {
      "zh": "直接修改 m×n 的 matrix：原始矩阵中只要某格为 0，它所在整行与整列都要变成 0。判断依据必须是修改前的零，不能让新增的零继续扩散。无需返回新矩阵。",
      "en": "Modify matrix directly so that every row or column containing an original zero becomes zero throughout. Newly written zeros must not trigger further changes. No replacement matrix is returned."
    },
    "constraints": {
      "zh": [
        "1 ≤ m,n ≤ 200。",
        "元素在有符号 32 位整数范围内；进阶要求 O(1) 辅助空间。"
      ],
      "en": [
        "1 ≤ m,n ≤ 200.",
        "Entries fit in signed 32-bit integers; the follow-up asks for constant auxiliary space."
      ]
    },
    "example": {
      "zh": "[[4,0,6],[7,8,9]] → [[0,0,0],[7,0,9]]。",
      "en": "[[4,0,6],[7,8,9]] → [[0,0,0],[7,0,9]]."
    },
    "methods": [
      {
        "key": "markers",
        "name": {
          "zh": "独立行列标记",
          "en": "Separate row and column markers"
        },
        "intuition": {
          "zh": "如果遇到零就立即清行列，后续扫描会误把写入的零当作原始信息。把发现阶段与执行阶段分开：先只读矩阵并记下行列，再统一写零。标记数组只记录“要不要清零”，无需复制所有数值。",
          "en": "Immediate clearing would make newly written zeros look like original ones. Separate discovery from mutation: first record affected rows and columns without changing cells, then apply the markers. Boolean arrays record only the information needed, rather than duplicating the matrix."
        },
        "steps": {
          "zh": [
            "分配 m 个行标记和 n 个列标记，初始均为 false。",
            "扫描全部单元格，原值为 0 就标记其行与列。",
            "再次扫描，行标记或列标记为 true 时写 0。"
          ],
          "en": [
            "Allocate m row flags and n column flags, initially false.",
            "Read every cell; a zero marks its row and column.",
            "Scan again and clear a cell if either marker is true."
          ]
        },
        "correctness": {
          "zh": "第一遍标记准确等价于“这行或列原本含零”；第二遍仅按这些固定标记修改，因此不会引入额外扩散。",
          "en": "After discovery a marker is true exactly when its original row or column contained zero. Applying these fixed markers changes precisely the required cells."
        },
        "time": "O(mn)",
        "space": "O(m+n)",
        "complexity": {
          "zh": "两次完整扫描 O(mn)，两个布尔数组合计 m+n 个位置。",
          "en": "Two full scans take O(mn); the two boolean arrays occupy m+n positions."
        },
        "python": "class Solution:\n    def setZeroes(self, matrix):\n        m, n = len(matrix), len(matrix[0])\n        rows, cols = [False] * m, [False] * n\n        for r in range(m):\n            for c in range(n):\n                if matrix[r][c] == 0:\n                    rows[r] = cols[c] = True\n        for r in range(m):\n            for c in range(n):\n                if rows[r] or cols[c]:\n                    matrix[r][c] = 0\n",
        "java": "class Solution {\n    public void setZeroes(int[][] matrix) {\n        int m=matrix.length, n=matrix[0].length;\n        boolean[] rows=new boolean[m], cols=new boolean[n];\n        for(int r=0;r<m;r++) for(int c=0;c<n;c++)\n            if(matrix[r][c]==0) { rows[r]=true; cols[c]=true; }\n        for(int r=0;r<m;r++) for(int c=0;c<n;c++)\n            if(rows[r] || cols[c]) matrix[r][c]=0;\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "[4,0,6]",
              "[7,8,9]"
            ],
            "note": {
              "zh": "原始零只有 (0,1)。",
              "en": "The only original zero is at (0,1)."
            }
          },
          {
            "cells": [
              "rows=[true,false]",
              "cols=[false,true,false]"
            ],
            "note": {
              "zh": "记录第 0 行和第 1 列，尚未修改数据。",
              "en": "Record row 0 and column 1 before mutation."
            }
          },
          {
            "cells": [
              "[0,0,0]",
              "[7,0,9]"
            ],
            "note": {
              "zh": "第二遍按行标记或列标记写零。",
              "en": "Apply row-or-column markers in the second pass."
            }
          }
        ]
      },
      {
        "key": "in-place",
        "name": {
          "zh": "首行首列复用标记",
          "en": "Reuse the first row and column"
        },
        "intuition": {
          "zh": "独立标记可以搬进矩阵：第 r 行的状态放在 matrix[r][0]，第 c 列放在 matrix[0][c]。但首行首列自身也需要清零信息，不能让标记覆盖原始事实，因此先用两个布尔值保存它们原本是否含零。内部单元格处理完后，才处理标记区。",
          "en": "Store row r’s marker at matrix[r][0] and column c’s marker at matrix[0][c]. These cells also belong to actual rows and columns, so first save whether the first row and column originally contained zero. Consume the markers in the interior before clearing the marker region itself."
        },
        "steps": {
          "zh": [
            "先独立扫描首行和首列，保存两个布尔值。",
            "仅扫描内部区域，遇零便把对应首行、首列位置置零。",
            "根据首行首列标记清内部单元格。",
            "最后按保存的布尔值清首行和首列。"
          ],
          "en": [
            "Save two booleans for original zeros in the first row and first column.",
            "Scan the interior and write zero markers along its row and column.",
            "Clear interior cells using those markers.",
            "Finally clear the first row and column according to the saved booleans."
          ]
        },
        "correctness": {
          "zh": "内部标记只由原始内部零写入，且使用标记时不改标记区。两个额外布尔值独立保存首行首列信息，补足 matrix[0][0] 无法同时承载的两种状态。",
          "en": "Interior zeros produce exact markers, which remain unchanged while consumed. The saved booleans preserve the two independent original states that matrix[0][0] alone cannot represent."
        },
        "time": "O(mn)",
        "space": "O(1)",
        "complexity": {
          "zh": "常数次矩阵扫描是 O(mn)；没有创建新数组，仅保存两个标记与循环下标。",
          "en": "A constant number of scans costs O(mn). Only two flags and loop indices are allocated."
        },
        "python": "class Solution:\n    def setZeroes(self, matrix):\n        m, n = len(matrix), len(matrix[0])\n        row_zero = any(matrix[0][c] == 0 for c in range(n))\n        col_zero = any(matrix[r][0] == 0 for r in range(m))\n        for r in range(1, m):\n            for c in range(1, n):\n                if matrix[r][c] == 0:\n                    matrix[r][0] = matrix[0][c] = 0\n        for r in range(1, m):\n            for c in range(1, n):\n                if matrix[r][0] == 0 or matrix[0][c] == 0:\n                    matrix[r][c] = 0\n        if row_zero:\n            for c in range(n): matrix[0][c] = 0\n        if col_zero:\n            for r in range(m): matrix[r][0] = 0\n",
        "java": "class Solution {\n    public void setZeroes(int[][] a) {\n        int m=a.length,n=a[0].length; boolean rz=false,cz=false;\n        for(int c=0;c<n;c++) if(a[0][c]==0) rz=true;\n        for(int r=0;r<m;r++) if(a[r][0]==0) cz=true;\n        for(int r=1;r<m;r++) for(int c=1;c<n;c++)\n            if(a[r][c]==0) { a[r][0]=0; a[0][c]=0; }\n        for(int r=1;r<m;r++) for(int c=1;c<n;c++)\n            if(a[r][0]==0 || a[0][c]==0) a[r][c]=0;\n        if(rz) for(int c=0;c<n;c++) a[0][c]=0;\n        if(cz) for(int r=0;r<m;r++) a[r][0]=0;\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "[4,0,6]",
              "[7,8,9]",
              "rowZero=true, colZero=false"
            ],
            "note": {
              "zh": "先保存首行首列状态。",
              "en": "Save the first-row and first-column states."
            }
          },
          {
            "cells": [
              "[4,0,6]",
              "[7,0,9]"
            ],
            "note": {
              "zh": "内部没有原始零；首行的零标记让 (1,1) 清零。",
              "en": "No interior original zeros; the first-row marker clears (1,1)."
            }
          },
          {
            "cells": [
              "[0,0,0]",
              "[7,0,9]"
            ],
            "note": {
              "zh": "最后清首行，首列不整体清零。",
              "en": "Clear the first row last; do not clear the entire first column."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/set-matrix-zeroes/description/"
      },
      {
        "label": {
          "zh": "力扣原题（中文）",
          "en": "LeetCode problem (Chinese)"
        },
        "url": "https://leetcode.cn/problems/set-matrix-zeroes/"
      }
    ],
    "slug": "set-matrix-zeroes",
    "title": {
      "zh": "矩阵置零",
      "en": "Set Matrix Zeroes"
    },
    "category": {
      "zh": "矩阵",
      "en": "Matrices"
    },
    "level": {
      "zh": "中等",
      "en": "Medium"
    }
  },
  {
    "id": 54,
    "statement": {
      "zh": "返回 m×n 矩阵按顺时针螺旋顺序访问得到的一维序列：从左上角向右开始，沿外圈行走，再进入下一圈，直到每个格子恰好访问一次。",
      "en": "Return the values of an m-by-n matrix in clockwise spiral order, starting at the top-left and moving right. Complete each outer boundary before entering the remaining rectangle, visiting every cell once."
    },
    "constraints": {
      "zh": [
        "1 ≤ m,n ≤ 10。",
        "每个元素在 -100..100 内。"
      ],
      "en": [
        "1 ≤ m,n ≤ 10.",
        "Each entry lies in -100..100."
      ]
    },
    "example": {
      "zh": "[[2,4,6],[8,10,12]] → [2,4,6,12,10,8]。",
      "en": "[[2,4,6],[8,10,12]] → [2,4,6,12,10,8]."
    },
    "methods": [
      {
        "key": "simulation",
        "name": {
          "zh": "方向与访问记录",
          "en": "Direction simulation"
        },
        "intuition": {
          "zh": "把问题当作一支笔走格子，方向依次是右、下、左、上。每次想往前走时先看下一格是否越界或已访问；被挡住才右转。访问记录是避免重复的依据，循环次数固定为格子总数，最后一步不再寻找下一格。",
          "en": "Imagine a pen moving right, down, left, then up. Before each move, test whether the next cell is outside the matrix or already visited; turn clockwise only if blocked. A visited grid prevents repeats, and exactly mn iterations avoid searching for a move after the final cell."
        },
        "steps": {
          "zh": [
            "初始化位置 (0,0)、方向向右，以及访问表。",
            "记录当前值并标记已访问。",
            "若尚未完成全部格子，检查下一格；被挡住则转向，再移动。"
          ],
          "en": [
            "Start at (0,0), facing right, with an empty visited grid.",
            "Append the current value and mark its cell.",
            "Unless finished, inspect the next cell, turn if blocked, and move."
          ]
        },
        "correctness": {
          "zh": "每一步只进入未访问的合法邻格；顺时针转向沿矩形边界推进，再进入内层。固定 mn 次覆盖所有格子且无重复。",
          "en": "Each move enters a valid unvisited neighbor. Clockwise turns follow the boundary before proceeding inward. Exactly mn such visits cover the matrix without duplication."
        },
        "time": "O(mn)",
        "space": "O(mn)",
        "complexity": {
          "zh": "每格一次访问、常数次转向检查，时间 O(mn)。访问表 O(mn)，返回序列另需 O(mn)。",
          "en": "Each cell incurs constant work, giving O(mn) time. The visited grid takes O(mn) auxiliary space; the returned sequence also occupies O(mn)."
        },
        "python": "class Solution:\n    def spiralOrder(self, matrix):\n        m, n = len(matrix), len(matrix[0])\n        seen = [[False] * n for _ in range(m)]\n        directions = [(0,1),(1,0),(0,-1),(-1,0)]\n        r = c = d = 0\n        answer = []\n        for t in range(m*n):\n            answer.append(matrix[r][c]); seen[r][c] = True\n            if t == m*n - 1: break\n            dr, dc = directions[d]\n            nr, nc = r + dr, c + dc\n            if not (0 <= nr < m and 0 <= nc < n) or seen[nr][nc]:\n                d = (d + 1) % 4\n                dr, dc = directions[d]\n            r, c = r + dr, c + dc\n        return answer\n",
        "java": "import java.util.*;\nclass Solution {\n    public List<Integer> spiralOrder(int[][] a) {\n        int m=a.length,n=a[0].length,r=0,c=0,d=0;\n        int[][] dirs={{0,1},{1,0},{0,-1},{-1,0}};\n        boolean[][] seen=new boolean[m][n]; List<Integer> ans=new ArrayList<>();\n        for(int t=0;t<m*n;t++) {\n            ans.add(a[r][c]); seen[r][c]=true;\n            if(t==m*n-1) break;\n            int nr=r+dirs[d][0],nc=c+dirs[d][1];\n            if(nr<0||nr>=m||nc<0||nc>=n||seen[nr][nc]) d=(d+1)%4;\n            r+=dirs[d][0]; c+=dirs[d][1];\n        }\n        return ans;\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "[2,4,6]",
              "[8,10,12]",
              "out=[2,4,6]"
            ],
            "note": {
              "zh": "向右走到边界，下一个方向是向下。",
              "en": "Move right to the boundary, then turn down."
            }
          },
          {
            "cells": [
              "out=[2,4,6,12]",
              "direction=left"
            ],
            "note": {
              "zh": "读到 12 后下方越界，转向左。",
              "en": "After 12, the next downward cell is outside; turn left."
            }
          },
          {
            "cells": [
              "out=[2,4,6,12,10,8]",
              "visited=6/6"
            ],
            "note": {
              "zh": "访问全部六格后结束，不再尝试移动。",
              "en": "Stop after six visits without attempting another move."
            }
          }
        ]
      },
      {
        "key": "boundaries",
        "name": {
          "zh": "四边界逐层收缩",
          "en": "Shrinking boundaries"
        },
        "intuition": {
          "zh": "每走完一条边，剩余未访问区域仍是一个矩形，因此不用逐格存访问状态，只需上下左右四个边界。上边和右边读完后，剩余区域可能已经为空，所以读下边、左边前必须重新检查，尤其单行与单列矩阵。",
          "en": "After consuming a full edge, the unvisited region is still a rectangle. Four boundaries therefore replace the visited grid. Reading the top and right edges may exhaust the region, so recheck before reading the bottom or left edges, especially for a single remaining row or column."
        },
        "steps": {
          "zh": [
            "设置 top、bottom、left、right 描述闭区间。",
            "向右读上边并增加 top；向下读右边并减少 right。",
            "若仍有行，向左读下边并减少 bottom；若仍有列，向上读左边并增加 left。",
            "重复直到行或列边界交错。"
          ],
          "en": [
            "Initialize inclusive top, bottom, left, and right bounds.",
            "Read the top edge rightward and advance top; read the right edge downward and decrease right.",
            "If rows remain, read the bottom leftward; if columns remain, read the left upward, updating both bounds.",
            "Repeat until either dimension is empty."
          ]
        },
        "correctness": {
          "zh": "始终保持边界内是全部且仅有的未访问区域；每次读完整一条边后移除它。有效性检查防止把已经移除的边再次读取。",
          "en": "The bounds always enclose exactly the unvisited cells. Each traversal consumes one whole edge and removes it; validity checks prevent reusing an exhausted edge."
        },
        "time": "O(mn)",
        "space": "O(1) auxiliary; O(mn) output",
        "complexity": {
          "zh": "每格恰好入答案一次；四个边界为常数辅助空间。答案列表的 O(mn) 不计入辅助空间，但计入总空间。",
          "en": "Every cell is appended once. Four bounds need constant auxiliary space; the O(mn) answer is additional output storage."
        },
        "python": "class Solution:\n    def spiralOrder(self, matrix):\n        top, bottom, left, right = 0, len(matrix)-1, 0, len(matrix[0])-1\n        answer = []\n        while top <= bottom and left <= right:\n            for c in range(left, right+1): answer.append(matrix[top][c])\n            top += 1\n            for r in range(top, bottom+1): answer.append(matrix[r][right])\n            right -= 1\n            if top <= bottom:\n                for c in range(right, left-1, -1): answer.append(matrix[bottom][c])\n                bottom -= 1\n            if left <= right:\n                for r in range(bottom, top-1, -1): answer.append(matrix[r][left])\n                left += 1\n        return answer\n",
        "java": "import java.util.*;\nclass Solution {\n    public List<Integer> spiralOrder(int[][] a) {\n        List<Integer> ans=new ArrayList<>(); int t=0,b=a.length-1,l=0,r=a[0].length-1;\n        while(t<=b && l<=r) {\n            for(int c=l;c<=r;c++) ans.add(a[t][c]); t++;\n            for(int row=t;row<=b;row++) ans.add(a[row][r]); r--;\n            if(t<=b) { for(int c=r;c>=l;c--) ans.add(a[b][c]); b--; }\n            if(l<=r) { for(int row=b;row>=t;row--) ans.add(a[row][l]); l++; }\n        }\n        return ans;\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "top=0,bottom=1,left=0,right=2",
              "out=[2,4,6]"
            ],
            "note": {
              "zh": "读上边后 top 变成 1。",
              "en": "After the top edge, top becomes 1."
            }
          },
          {
            "cells": [
              "top=1,bottom=1,left=0,right=1",
              "out=[2,4,6,12]"
            ],
            "note": {
              "zh": "读右边后 right 变成 1。",
              "en": "After the right edge, right becomes 1."
            }
          },
          {
            "cells": [
              "out=[2,4,6,12,10,8]",
              "top=1,bottom=0"
            ],
            "note": {
              "zh": "读下边后行区间为空，左边没有剩余格子。",
              "en": "The bottom edge empties the row interval; no left-edge cells remain."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/spiral-matrix/description/"
      },
      {
        "label": {
          "zh": "力扣原题（中文）",
          "en": "LeetCode problem (Chinese)"
        },
        "url": "https://leetcode.cn/problems/spiral-matrix/"
      }
    ],
    "slug": "spiral-matrix",
    "title": {
      "zh": "螺旋矩阵",
      "en": "Spiral Matrix"
    },
    "category": {
      "zh": "矩阵",
      "en": "Matrices"
    },
    "level": {
      "zh": "中等",
      "en": "Medium"
    }
  },
  {
    "id": 48,
    "statement": {
      "zh": "将 n×n 方阵顺时针旋转 90°。必须直接修改原矩阵，不能新建另一张二维矩阵来存放旋转结果。",
      "en": "Rotate a square n-by-n matrix 90 degrees clockwise by changing the original matrix. Allocating another two-dimensional matrix for the rotated result is not allowed."
    },
    "constraints": {
      "zh": [
        "1 ≤ n ≤ 20。",
        "元素在 -1000..1000 内。"
      ],
      "en": [
        "1 ≤ n ≤ 20.",
        "Entries lie in -1000..1000."
      ]
    },
    "example": {
      "zh": "[[2,5],[7,9]] → [[7,2],[9,5]]。",
      "en": "[[2,5],[7,9]] → [[7,2],[9,5]]."
    },
    "methods": [
      {
        "key": "transpose",
        "name": {
          "zh": "转置后翻转每行",
          "en": "Transpose, then reverse rows"
        },
        "intuition": {
          "zh": "顺时针旋转把 (r,c) 送到 (c,n-1-r)。拆成两步就容易原地做：先转置，把坐标换成 (c,r)；再把每一行左右翻转，把列 r 换成 n-1-r。转置只处理对角线一侧，否则每对元素交换两次会还原。",
          "en": "The desired mapping is (r,c) → (c,n-1-r). Factor it into transposition, producing (c,r), then horizontal row reversal, producing the final column. Transpose only one side of the diagonal: processing both sides would undo every swap."
        },
        "steps": {
          "zh": [
            "对 r<c 的位置交换 matrix[r][c] 与 matrix[c][r]。",
            "对每行用左右双指针交换，直到相遇。"
          ],
          "en": [
            "Swap matrix[r][c] with matrix[c][r] only when r<c.",
            "Reverse each row in place with two pointers."
          ]
        },
        "correctness": {
          "zh": "两次变换的复合严格等于旋转坐标映射；每个交换都是置换，不会丢失元素或创建额外格子。",
          "en": "Composing the two coordinate transformations gives exactly the clockwise rotation. Both stages are permutations, preserving all values."
        },
        "time": "O(n²)",
        "space": "O(1)",
        "complexity": {
          "zh": "转置和行翻转各进行 O(n²) 次常数操作；代码不切片复制，仅临时保存交换值。",
          "en": "Transposition and row reversal each use O(n²) constant-time operations. No slices or matrix copies are made."
        },
        "python": "class Solution:\n    def rotate(self, matrix):\n        n = len(matrix)\n        for r in range(n):\n            for c in range(r+1, n):\n                matrix[r][c], matrix[c][r] = matrix[c][r], matrix[r][c]\n        for row in matrix:\n            l, r = 0, n-1\n            while l < r:\n                row[l], row[r] = row[r], row[l]\n                l += 1; r -= 1\n",
        "java": "class Solution {\n    public void rotate(int[][] a) {\n        int n=a.length;\n        for(int r=0;r<n;r++) for(int c=r+1;c<n;c++) {\n            int t=a[r][c]; a[r][c]=a[c][r]; a[c][r]=t;\n        }\n        for(int[] row:a) for(int l=0,r=n-1;l<r;l++,r--) {\n            int t=row[l]; row[l]=row[r]; row[r]=t;\n        }\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "[2,5]",
              "[7,9]"
            ],
            "note": {
              "zh": "目标坐标是 (r,c)→(c,1-r)。",
              "en": "The target mapping is (r,c)→(c,1-r)."
            }
          },
          {
            "cells": [
              "[2,7]",
              "[5,9]"
            ],
            "note": {
              "zh": "交换非对角线上的 5 和 7，完成转置。",
              "en": "Swap off-diagonal 5 and 7 to transpose."
            }
          },
          {
            "cells": [
              "[7,2]",
              "[9,5]"
            ],
            "note": {
              "zh": "左右翻转每行，完成顺时针旋转。",
              "en": "Reverse each row to finish the clockwise rotation."
            }
          }
        ]
      },
      {
        "key": "cycles",
        "name": {
          "zh": "每层四点轮换",
          "en": "Four-cell cycles per layer"
        },
        "intuition": {
          "zh": "一个位置旋转四次会回到自身，因此可以把外圈上的四个对应位置视为一组，只存一个临时值完成循环移动。按层处理，当前层上边排除最后一个角点，避免把角点算进两组。奇数阶矩阵中心不移动。",
          "en": "Four rotations return a cell to itself, so rotate each group of four corresponding cells using one saved value. Work layer by layer and exclude the last corner on the top edge so corners are not processed twice. The center of an odd-sized matrix stays fixed."
        },
        "steps": {
          "zh": [
            "令 first 为层号，last=n-1-first。",
            "遍历上边列 c∈[first,last)，计算 offset=c-first。",
            "保存上格，依次将左→上、下→左、右→下、保存值→右。"
          ],
          "en": [
            "For each layer set first and last=n-1-first.",
            "Visit top-edge columns c in [first,last) and compute offset=c-first.",
            "Save the top value; move left to top, bottom to left, right to bottom, and saved top to right."
          ]
        },
        "correctness": {
          "zh": "每个四元组恰好沿顺时针方向移动一次，互不重叠且覆盖除中心外的所有位置，因此得到完整旋转。",
          "en": "Each disjoint four-cell cycle moves values clockwise exactly once. These cycles cover every noncentral position, producing the rotation."
        },
        "time": "O(n²)",
        "space": "O(1)",
        "complexity": {
          "zh": "各层共覆盖 n² 个量级的格子；一个临时值和常数下标即可。",
          "en": "All layers together cover O(n²) cells. One temporary value and a constant number of indices suffice."
        },
        "python": "class Solution:\n    def rotate(self, matrix):\n        n = len(matrix)\n        for first in range(n//2):\n            last = n-1-first\n            for c in range(first, last):\n                offset = c-first\n                top = matrix[first][c]\n                matrix[first][c] = matrix[last-offset][first]\n                matrix[last-offset][first] = matrix[last][last-offset]\n                matrix[last][last-offset] = matrix[c][last]\n                matrix[c][last] = top\n",
        "java": "class Solution {\n    public void rotate(int[][] a) {\n        int n=a.length;\n        for(int first=0;first<n/2;first++) {\n            int last=n-1-first;\n            for(int c=first;c<last;c++) {\n                int off=c-first,top=a[first][c];\n                a[first][c]=a[last-off][first];\n                a[last-off][first]=a[last][last-off];\n                a[last][last-off]=a[c][last];\n                a[c][last]=top;\n            }\n        }\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "top=2",
              "left=7",
              "bottom=9",
              "right=5"
            ],
            "note": {
              "zh": "保存上方 2，这一组覆盖整个 2×2 方阵。",
              "en": "Save top value 2; one cycle covers this 2×2 matrix."
            }
          },
          {
            "cells": [
              "top←7",
              "left←9",
              "bottom←5",
              "saved=2"
            ],
            "note": {
              "zh": "按逆向赋值顺序搬运，避免覆盖尚未读取的值。",
              "en": "Move values in reverse assignment order to avoid losing unread values."
            }
          },
          {
            "cells": [
              "[7,2]",
              "[9,5]"
            ],
            "note": {
              "zh": "把保存的 2 放到右上角，完成四点轮换。",
              "en": "Put saved 2 at the top-right to finish the cycle."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/rotate-image/description/"
      },
      {
        "label": {
          "zh": "力扣原题（中文）",
          "en": "LeetCode problem (Chinese)"
        },
        "url": "https://leetcode.cn/problems/rotate-image/"
      }
    ],
    "slug": "rotate-image",
    "title": {
      "zh": "旋转图像",
      "en": "Rotate Image"
    },
    "category": {
      "zh": "矩阵",
      "en": "Matrices"
    },
    "level": {
      "zh": "中等",
      "en": "Medium"
    }
  },
  {
    "id": 240,
    "statement": {
      "zh": "给定行和列都按非递减顺序排列的 m×n 整数矩阵，判断 target 是否出现。每行从左到右有序、每列从上到下有序，但不保证下一行首项大于上一行末项，因此不能直接当作整体排序数组二分。",
      "en": "Determine whether target occurs in an m-by-n matrix whose rows and columns are individually nondecreasing. A row’s first value need not exceed the previous row’s last value, so flattening it does not create a globally sorted array."
    },
    "constraints": {
      "zh": [
        "1 ≤ m,n ≤ 300。",
        "矩阵值与 target 都在 -10⁹..10⁹ 内。"
      ],
      "en": [
        "1 ≤ m,n ≤ 300.",
        "Matrix entries and target lie in -10⁹..10⁹."
      ]
    },
    "example": {
      "zh": "matrix=[[1,3,8],[2,6,10]], target=6 → true；target=7 → false。",
      "en": "matrix=[[1,3,8],[2,6,10]], target=6 → true; target=7 → false."
    },
    "methods": [
      {
        "key": "row-binary",
        "name": {
          "zh": "逐行二分",
          "en": "Binary search each row"
        },
        "intuition": {
          "zh": "先只利用行有序这一条性质：每一行都可独立二分，即使行之间数值范围重叠也不影响。搜索区间使用闭区间，比较中点与 target 后丢弃不可能的一半；所有行都未找到才返回 false。",
          "en": "Use row ordering alone: each row can be searched independently, even when value ranges overlap across rows. Maintain an inclusive candidate interval and discard the impossible half after each comparison. Return false only after all rows fail."
        },
        "steps": {
          "zh": [
            "逐行设置 lo=0、hi=n-1。",
            "中点等于 target 则返回 true；较小则 lo=mid+1，否则 hi=mid-1。",
            "所有行搜索结束后返回 false。"
          ],
          "en": [
            "For each row initialize lo=0 and hi=n-1.",
            "Return true on equality; otherwise move lo right or hi left according to the comparison.",
            "Return false after every row is exhausted."
          ]
        },
        "correctness": {
          "zh": "每行二分始终保留该行所有可能等于 target 的位置；遍历全部行保证不会遗漏其他行中的目标。",
          "en": "Each binary search preserves every possible occurrence in its row. Searching all rows covers the full matrix."
        },
        "time": "O(m log(n+1))",
        "space": "O(1)",
        "complexity": {
          "zh": "m 行各最多 O(log(n+1)) 次比较；用 n+1 写法包含单列时每行仍需一次比较。仅常数下标。",
          "en": "Each of m rows takes O(log(n+1)) comparisons; n+1 also accounts for single-column rows. Only constant index storage is needed."
        },
        "python": "class Solution:\n    def searchMatrix(self, matrix, target):\n        for row in matrix:\n            lo, hi = 0, len(row)-1\n            while lo <= hi:\n                mid = (lo+hi)//2\n                if row[mid] == target: return True\n                if row[mid] < target: lo = mid+1\n                else: hi = mid-1\n        return False\n",
        "java": "class Solution {\n    public boolean searchMatrix(int[][] a,int target) {\n        for(int[] row:a) {\n            int lo=0,hi=row.length-1;\n            while(lo<=hi) {\n                int mid=lo+(hi-lo)/2;\n                if(row[mid]==target) return true;\n                if(row[mid]<target) lo=mid+1; else hi=mid-1;\n            }\n        }\n        return false;\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "target=6",
              "row0=[1,3,8]",
              "mid=1 → 3"
            ],
            "note": {
              "zh": "3 小于 6，仅保留该行右半部分。",
              "en": "3 is below 6; keep the right half of this row."
            }
          },
          {
            "cells": [
              "row0: 8>6 → empty",
              "row1=[2,6,10]"
            ],
            "note": {
              "zh": "第一行未找到，继续第二行。",
              "en": "The first row fails; continue to the second."
            }
          },
          {
            "cells": [
              "row1: mid=1 → 6",
              "answer=true"
            ],
            "note": {
              "zh": "第二行中点命中。",
              "en": "The second row’s midpoint matches."
            }
          }
        ]
      },
      {
        "key": "staircase",
        "name": {
          "zh": "右上角阶梯搜索",
          "en": "Top-right staircase"
        },
        "intuition": {
          "zh": "右上角同时是当前行最大值、当前列最小值。若它太大，下面同列都不会是目标，可以删整列；若它太小，左侧同排都不会是目标，可以删整行。每次只剩一个更小矩形，这是左上角所不具备的单向排除性质。",
          "en": "The top-right cell is the largest value in its remaining row and the smallest in its remaining column. If too large, eliminate its column; if too small, eliminate its row. This corner supports a safe one-directional elimination that the top-left corner does not."
        },
        "steps": {
          "zh": [
            "从 r=0、c=n-1 开始。",
            "当前值大于目标则 c--；小于目标则 r++；相等返回 true。",
            "r 越过最后一行或 c 变负时返回 false。"
          ],
          "en": [
            "Start at row 0, column n-1.",
            "Move left if the value is too large, down if too small, and return true on equality.",
            "Return false when the candidate rectangle becomes empty."
          ]
        },
        "correctness": {
          "zh": "每次移除的行或列都由单调性证明不可能包含目标；若目标存在，它始终留在剩余矩形内，因此遇到或排空时结论正确。",
          "en": "Monotonicity proves each removed row or column cannot contain target. Any occurrence remains in the candidate rectangle until found; an empty rectangle proves absence."
        },
        "time": "O(m+n)",
        "space": "O(1)",
        "complexity": {
          "zh": "行只增最多 m 次，列只减最多 n 次，总比较 O(m+n)；两个坐标 O(1)。",
          "en": "The row increases at most m times and the column decreases at most n times. Two coordinates require O(1) space."
        },
        "python": "class Solution:\n    def searchMatrix(self, matrix, target):\n        r, c = 0, len(matrix[0])-1\n        while r < len(matrix) and c >= 0:\n            if matrix[r][c] == target: return True\n            if matrix[r][c] > target: c -= 1\n            else: r += 1\n        return False\n",
        "java": "class Solution {\n    public boolean searchMatrix(int[][] a,int target) {\n        int r=0,c=a[0].length-1;\n        while(r<a.length && c>=0) {\n            if(a[r][c]==target) return true;\n            if(a[r][c]>target) c--; else r++;\n        }\n        return false;\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "target=6",
              "(0,2)=8"
            ],
            "note": {
              "zh": "8 大于 6，整列从当前位置向下都不可能匹配。",
              "en": "8 exceeds 6, so eliminate its remaining column."
            }
          },
          {
            "cells": [
              "(0,1)=3",
              "row 0 removed"
            ],
            "note": {
              "zh": "3 小于 6，该行剩余元素也都太小。",
              "en": "3 is below 6; the remaining row is too small."
            }
          },
          {
            "cells": [
              "(1,1)=6",
              "answer=true"
            ],
            "note": {
              "zh": "向下到第二行命中目标。",
              "en": "Moving down reaches the target."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/search-a-2d-matrix-ii/description/"
      },
      {
        "label": {
          "zh": "力扣原题（中文）",
          "en": "LeetCode problem (Chinese)"
        },
        "url": "https://leetcode.cn/problems/search-a-2d-matrix-ii/"
      }
    ],
    "slug": "search-a-2d-matrix-ii",
    "title": {
      "zh": "搜索二维矩阵 II",
      "en": "Search a 2D Matrix II"
    },
    "category": {
      "zh": "矩阵",
      "en": "Matrices"
    },
    "level": {
      "zh": "中等",
      "en": "Medium"
    }
  },
  {
    "id": 160,
    "statement": {
      "zh": "给定两条无环单链表的头 headA、headB，返回它们第一次共享的节点对象；没有共享节点就返回空。节点值相同不等于相交；相交后两条链共享同一段后缀。函数结束后必须保留原链结构。",
      "en": "Given two acyclic singly linked lists, return the first node object shared by both, or null if they are disjoint. Equal values do not imply intersection. An intersection means a physically shared suffix, and the original links must remain intact."
    },
    "constraints": {
      "zh": [
        "两条链长度 m,n 均在 1..30000 内。",
        "节点值在 1..100000 内；输入结构无环。",
        "判题中的 skipA、skipB 仅描述共享结构，不是函数参数。"
      ],
      "en": [
        "Both lengths m,n lie in 1..30000.",
        "Values lie in 1..100000; the structure has no cycles.",
        "Judge fields skipA and skipB describe the structure, not function parameters."
      ]
    },
    "example": {
      "zh": "A: a(2)→c(7)→d(9)，B: b(4)→e(5)→c(7)→d(9)。c、d 是同一批对象，返回 c。",
      "en": "A: a(2)→c(7)→d(9), B: b(4)→e(5)→c(7)→d(9). Both lists share the very same c and d objects; return c."
    },
    "methods": [
      {
        "key": "identity-set",
        "name": {
          "zh": "保存节点身份",
          "en": "Store node identities"
        },
        "intuition": {
          "zh": "相交判断比较的是内存中的节点对象，不能把 val 放进集合。先记住 A 的全部节点，再沿 B 查找，第一个出现在集合中的对象就是公共后缀的起点。Java 使用身份集合明确避免未来节点 equals 定义影响结果。",
          "en": "Intersection is about node identity, not stored values. Remember all nodes in A, then walk B until an object is found in that set. The first match starts the shared suffix. Java uses an identity-backed set so custom value-based equality cannot change the meaning."
        },
        "steps": {
          "zh": [
            "遍历 A，将每个节点引用加入集合。",
            "从 B 头开始检查引用是否在集合；第一次命中就返回该节点。",
            "走到空仍未命中则返回空。"
          ],
          "en": [
            "Insert every node reference from A into a set.",
            "Walk B and return the first node reference present in the set.",
            "Return null if B ends without a match."
          ]
        },
        "correctness": {
          "zh": "集合恰好包含 A 中对象；按 B 顺序首次命中必是共享后缀第一个节点。仅读取 next，不修改链表。",
          "en": "The set contains exactly A’s node objects. The earliest match along B is the start of its shared suffix. Links are only read, so both lists are preserved."
        },
        "time": "Expected O(m+n)",
        "space": "O(m)",
        "complexity": {
          "zh": "A 建集合 O(m)，B 查询期望 O(n)，集合大小 m。",
          "en": "Building A’s set takes O(m), and B’s lookups take expected O(n). The set holds m references."
        },
        "python": "class Solution:\n    def getIntersectionNode(self, headA, headB):\n        seen = set()\n        p = headA\n        while p:\n            seen.add(p); p = p.next\n        p = headB\n        while p:\n            if p in seen: return p\n            p = p.next\n        return None\n",
        "java": "import java.util.*;\nclass Solution {\n    public ListNode getIntersectionNode(ListNode headA,ListNode headB) {\n        Set<ListNode> seen=Collections.newSetFromMap(new IdentityHashMap<>());\n        for(ListNode p=headA;p!=null;p=p.next) seen.add(p);\n        for(ListNode p=headB;p!=null;p=p.next) if(seen.contains(p)) return p;\n        return null;\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "A: a→c→d",
              "B: b→e→c→d",
              "seen={a,c,d}"
            ],
            "note": {
              "zh": "集合存对象身份，c、d 为共享对象。",
              "en": "Store identities; c and d are shared objects."
            }
          },
          {
            "cells": [
              "B: b ✗",
              "B: e ✗"
            ],
            "note": {
              "zh": "B 的前两个节点是独立前缀。",
              "en": "B’s first two nodes form its private prefix."
            }
          },
          {
            "cells": [
              "B: c ✓",
              "answer=c"
            ],
            "note": {
              "zh": "首次命中共享入口 c，而不是仅比较值 7。",
              "en": "The first identity match is c, not merely the value 7."
            }
          }
        ]
      },
      {
        "key": "switch-heads",
        "name": {
          "zh": "双指针交换起点",
          "en": "Switch heads to equalize distances"
        },
        "intuition": {
          "zh": "长度不同使两个头同步走时到达公共后缀的时间不同。让 p 走完 A 后走 B，让 q 走完 B 后走 A，相当于各走相同总长度，前缀长度差被抵消。有公共尾部时它们会在入口对齐；完全不相交时会同时变空。比较始终用对象身份。",
          "en": "Different prefix lengths prevent simultaneous arrival at the shared suffix. Let p traverse A then B, and q traverse B then A. Both cover the same combined length, canceling the prefix difference. They align at the shared entry, or become null together if no intersection exists."
        },
        "steps": {
          "zh": [
            "p=headA，q=headB。",
            "当 p 与 q 不是同一对象：非空指针走 next；空指针换到另一条链头。",
            "循环退出时返回 p，可能是共享节点，也可能为空。"
          ],
          "en": [
            "Set p=headA and q=headB.",
            "While identities differ, advance nonnull pointers; redirect a null pointer to the other head.",
            "Return p when they agree, including agreement at null."
          ]
        },
        "correctness": {
          "zh": "若独立前缀长为 a、b，公共后缀长为 c，换头后两指针分别跨过 a+c+b 与 b+c+a 个节点到达公共入口，距离相同。无公共后缀则走完两链后同为空。",
          "en": "With private prefix lengths a and b and shared suffix length c, switching heads makes both cover equal prefix-adjusted distances before the shared entry. Without a suffix they both finish the two lists and become null."
        },
        "time": "O(m+n)",
        "space": "O(1)",
        "complexity": {
          "zh": "每个指针最多经过两条链和常数次换头；仅存两个引用。",
          "en": "Each pointer crosses at most both lists with constant redirect overhead. Only two references are stored."
        },
        "python": "class Solution:\n    def getIntersectionNode(self, headA, headB):\n        p, q = headA, headB\n        while p is not q:\n            p = p.next if p else headB\n            q = q.next if q else headA\n        return p\n",
        "java": "class Solution {\n    public ListNode getIntersectionNode(ListNode a,ListNode b) {\n        ListNode p=a,q=b;\n        while(p!=q) { p=p==null?b:p.next; q=q==null?a:q.next; }\n        return p;\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "p=a",
              "q=b"
            ],
            "note": {
              "zh": "两指针从不同长度的链头出发。",
              "en": "Start at heads with different prefix lengths."
            }
          },
          {
            "cells": [
              "(p,q): (c,e)→(d,c)→(null,d)→(b,null)"
            ],
            "note": {
              "zh": "走到空时下一步换到另一条链头。",
              "en": "After reaching null, redirect on the next step."
            }
          },
          {
            "cells": [
              "(p,q): (e,a)→(c,c)",
              "answer=c"
            ],
            "note": {
              "zh": "换头抵消前缀长度差，最终同时到 c。",
              "en": "Switching cancels the prefix difference; both reach c."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/intersection-of-two-linked-lists/description/"
      },
      {
        "label": {
          "zh": "力扣原题（中文）",
          "en": "LeetCode problem (Chinese)"
        },
        "url": "https://leetcode.cn/problems/intersection-of-two-linked-lists/"
      }
    ],
    "slug": "intersection-of-two-linked-lists",
    "title": {
      "zh": "相交链表",
      "en": "Intersection of Two Linked Lists"
    },
    "category": {
      "zh": "链表",
      "en": "Linked Lists"
    },
    "level": {
      "zh": "简单",
      "en": "Easy"
    }
  },
  {
    "id": 206,
    "statement": {
      "zh": "改变单链表的 next 连接，使节点顺序完全反转，并返回新头。空链返回空；不是把节点值倒着打印，而是返回反向连接的链。",
      "en": "Reverse a singly linked list by reconnecting its next pointers, and return the new head. Return null for an empty list; the result is a linked structure, not merely values printed backward."
    },
    "constraints": {
      "zh": [
        "节点数在 0..5000 内。",
        "节点值在 -5000..5000 内。"
      ],
      "en": [
        "The list contains 0..5000 nodes.",
        "Values lie in -5000..5000."
      ]
    },
    "example": {
      "zh": "2→6→9 → 9→6→2。",
      "en": "2→6→9 → 9→6→2."
    },
    "methods": [
      {
        "key": "iterative",
        "name": {
          "zh": "迭代反转指针",
          "en": "Iterative pointer reversal"
        },
        "intuition": {
          "zh": "把链分成已经反转的前缀与尚未处理的后缀。prev 指向反转前缀头，cur 指向后缀头。断开 cur.next 之前必须保存后继，否则会丢失尚未处理的节点。每轮把后缀第一个节点摘下接到反转前缀前面。",
          "en": "Maintain a reversed prefix headed by prev and an untouched suffix headed by cur. Save cur.next before overwriting it, or the remaining suffix is lost. Each iteration removes the suffix’s first node and prepends it to the reversed prefix."
        },
        "steps": {
          "zh": [
            "初始化 prev 为空、cur=head。",
            "保存 nxt=cur.next；令 cur.next=prev。",
            "依次移动 prev=cur、cur=nxt；后缀为空时返回 prev。"
          ],
          "en": [
            "Initialize prev=null and cur=head.",
            "Save nxt=cur.next, then point cur.next to prev.",
            "Advance prev to cur and cur to nxt; return prev when the suffix is empty."
          ]
        },
        "correctness": {
          "zh": "每轮后 prev 链恰好是原链已处理前缀的逆序，cur 链仍是完整原始后缀。两部分覆盖全部节点且不丢失，最终只有逆序前缀。",
          "en": "After every iteration, prev is exactly the processed original prefix in reverse order, while cur retains the untouched suffix. Their union preserves all nodes; at termination the reversed prefix is the entire list."
        },
        "time": "O(n)",
        "space": "O(1)",
        "complexity": {
          "zh": "每个节点改一次 next，时间 O(n)；只有三个引用。",
          "en": "Each next pointer is changed once, taking O(n) time with three references."
        },
        "python": "class Solution:\n    def reverseList(self, head):\n        prev, cur = None, head\n        while cur:\n            nxt = cur.next\n            cur.next = prev\n            prev, cur = cur, nxt\n        return prev\n",
        "java": "class Solution {\n    public ListNode reverseList(ListNode head) {\n        ListNode prev=null,cur=head;\n        while(cur!=null) {\n            ListNode next=cur.next; cur.next=prev; prev=cur; cur=next;\n        }\n        return prev;\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "prev=null",
              "cur: 2→6→9"
            ],
            "note": {
              "zh": "反转前缀开始为空。",
              "en": "The reversed prefix starts empty."
            }
          },
          {
            "cells": [
              "prev: 2→null",
              "cur: 6→9"
            ],
            "note": {
              "zh": "先保存 6，再让 2 指向空。",
              "en": "Save 6 before pointing 2 to null."
            }
          },
          {
            "cells": [
              "prev: 6→2→null",
              "cur: 9"
            ],
            "note": {
              "zh": "把 6 接到已反转前缀前。",
              "en": "Prepend 6 to the reversed prefix."
            }
          },
          {
            "cells": [
              "prev: 9→6→2→null",
              "cur=null"
            ],
            "note": {
              "zh": "后缀耗尽，prev 就是新头。",
              "en": "The suffix is exhausted; prev is the new head."
            }
          }
        ]
      },
      {
        "key": "stack",
        "name": {
          "zh": "显式栈倒序重连",
          "en": "Explicit stack and reconnect"
        },
        "intuition": {
          "zh": "栈的后进先出顺序就是链表访问顺序的逆序。保存的是节点引用，弹出后改 next 即可复用原节点。这是把“记住回程”显式存起来的方案，避免长链在 Python 默认递归深度下失败，但需要线性内存。",
          "en": "A stack pops nodes in reverse visitation order. Store references and reconnect them on pop, reusing the original nodes. This explicitly stores the return path without relying on Python’s recursion limit, at the cost of linear memory."
        },
        "steps": {
          "zh": [
            "按原顺序把节点压栈；空栈直接返回空。",
            "首次弹出为新头，以 tail 记录已重连部分末尾。",
            "继续弹栈接到 tail.next；最终 tail.next 必须置空，断开旧边。"
          ],
          "en": [
            "Push every node in original order; return null for an empty stack.",
            "The first pop is the new head; track the rebuilt tail.",
            "Append remaining pops and explicitly terminate the final node with null."
          ]
        },
        "correctness": {
          "zh": "弹出顺序与原顺序相反，每个原节点只接入一次；最后清空末尾旧指针，确保无环并得到完整逆序链。",
          "en": "Pop order reverses the original order, and each node is appended once. Clearing the final old pointer prevents a cycle and terminates the reversed list."
        },
        "time": "O(n)",
        "space": "O(n)",
        "complexity": {
          "zh": "压栈和弹栈各 n 次；栈存 n 个节点引用。",
          "en": "There are n pushes and n pops; the stack stores n references."
        },
        "python": "class Solution:\n    def reverseList(self, head):\n        stack = []\n        while head:\n            stack.append(head); head = head.next\n        if not stack: return None\n        new_head = tail = stack.pop()\n        while stack:\n            tail.next = stack.pop(); tail = tail.next\n        tail.next = None\n        return new_head\n",
        "java": "import java.util.*;\nclass Solution {\n    public ListNode reverseList(ListNode head) {\n        Deque<ListNode> stack=new ArrayDeque<>();\n        for(ListNode p=head;p!=null;p=p.next) stack.push(p);\n        if(stack.isEmpty()) return null;\n        ListNode ans=stack.pop(),tail=ans;\n        while(!stack.isEmpty()) { tail.next=stack.pop(); tail=tail.next; }\n        tail.next=null; return ans;\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "stack=[2,6,9]"
            ],
            "note": {
              "zh": "栈中保存三个原节点引用，右端为栈顶。",
              "en": "Store the three original references, top at the right."
            }
          },
          {
            "cells": [
              "pop 9 → pop 6",
              "new: 9→6"
            ],
            "note": {
              "zh": "按出栈顺序重连。",
              "en": "Reconnect in pop order."
            }
          },
          {
            "cells": [
              "pop 2",
              "new: 9→6→2→null"
            ],
            "note": {
              "zh": "最后将 2.next 清空，防止沿旧边回到 6。",
              "en": "Clear 2.next to prevent following the old edge back to 6."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/reverse-linked-list/description/"
      },
      {
        "label": {
          "zh": "力扣原题（中文）",
          "en": "LeetCode problem (Chinese)"
        },
        "url": "https://leetcode.cn/problems/reverse-linked-list/"
      }
    ],
    "slug": "reverse-linked-list",
    "title": {
      "zh": "反转链表",
      "en": "Reverse Linked List"
    },
    "category": {
      "zh": "链表",
      "en": "Linked Lists"
    },
    "level": {
      "zh": "简单",
      "en": "Easy"
    }
  },
  {
    "id": 234,
    "statement": {
      "zh": "判断单链表的节点值从前往后与从后往前是否完全一致，返回布尔值。比较的是值序列，不要求对称位置是同一节点。",
      "en": "Return whether the sequence of values in a singly linked list reads identically forward and backward. Symmetric positions must have equal values, not be the same node object."
    },
    "constraints": {
      "zh": [
        "节点数在 1..100000 内。",
        "每个值在 0..9 内；进阶要求线性时间和常数辅助空间。"
      ],
      "en": [
        "There are 1..100000 nodes.",
        "Values lie in 0..9; the follow-up requests linear time and constant auxiliary space."
      ]
    },
    "example": {
      "zh": "3→8→5→8→3 → true；3→8→5→2→3 → false。",
      "en": "3→8→5→8→3 → true; 3→8→5→2→3 → false."
    },
    "methods": [
      {
        "key": "values",
        "name": {
          "zh": "值数组与双指针",
          "en": "Value array with two pointers"
        },
        "intuition": {
          "zh": "单链表无法直接从尾部向前走，把值复制到数组后就能随机访问两端。只比较首尾、次首次尾等配对位置即可，不必额外复制一个反转数组。原链完全只读，代价是保存所有值。",
          "en": "A singly linked list cannot move backward. Copy its values into an array to gain random access to both ends. Compare symmetric pairs without constructing another reversed array. The original links stay untouched, but all values require storage."
        },
        "steps": {
          "zh": [
            "遍历链表，将 val 依次加入数组。",
            "设置左右指针，若对应值不同立即返回 false。",
            "相同则两端内缩；相遇或交错后返回 true。"
          ],
          "en": [
            "Append values to an array in list order.",
            "Compare values at the two ends and return false on a mismatch.",
            "Move inward after each match; return true once the pointers meet or cross."
          ]
        },
        "correctness": {
          "zh": "数组保持原值顺序，左右指针枚举每一组对称位置。所有配对相等与回文定义完全等价。",
          "en": "The array preserves list order, and the pointers enumerate every symmetric pair. All pairs matching is exactly the definition of a palindrome."
        },
        "time": "O(n)",
        "space": "O(n)",
        "complexity": {
          "zh": "复制 n 个值，比较至多 n/2 对；值数组 O(n)。",
          "en": "Copy n values and compare at most n/2 pairs. The value array needs O(n) storage."
        },
        "python": "class Solution:\n    def isPalindrome(self, head):\n        values = []\n        while head:\n            values.append(head.val); head = head.next\n        l, r = 0, len(values)-1\n        while l < r:\n            if values[l] != values[r]: return False\n            l += 1; r -= 1\n        return True\n",
        "java": "import java.util.*;\nclass Solution {\n    public boolean isPalindrome(ListNode head) {\n        List<Integer> values=new ArrayList<>();\n        for(ListNode p=head;p!=null;p=p.next) values.add(p.val);\n        for(int l=0,r=values.size()-1;l<r;l++,r--)\n            if(!values.get(l).equals(values.get(r))) return false;\n        return true;\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "values=[3,8,5,8,3]"
            ],
            "note": {
              "zh": "复制值以便从左右两端读取。",
              "en": "Copy values for access from both ends."
            }
          },
          {
            "cells": [
              "values[0]=3 = values[4]=3",
              "values[1]=8 = values[3]=8"
            ],
            "note": {
              "zh": "两组对称值分别相同。",
              "en": "Both symmetric pairs match."
            }
          },
          {
            "cells": [
              "left=right=2",
              "answer=true"
            ],
            "note": {
              "zh": "中央值 5 不需要配对。",
              "en": "The middle value 5 needs no partner."
            }
          }
        ]
      },
      {
        "key": "half-reverse",
        "name": {
          "zh": "反转后半段并恢复",
          "en": "Reverse the second half, then restore"
        },
        "intuition": {
          "zh": "快慢指针能找到前半段末尾；将它后面的链反转后，就可从两端对应的值开始同步比较。奇数长度中间节点不影响回文，只比较较短的后半段。即使发现不匹配，也先记录结果而不是立即返回，最后把后半段反转回来，避免检查函数破坏输入。",
          "en": "Find the end of the first half with fast and slow pointers. Reverse the suffix after it so both ends can be compared by forward walks. An odd middle value need not be compared. Record mismatches instead of returning early, then reverse the suffix again to restore the original structure."
        },
        "steps": {
          "zh": [
            "fast 每轮两步、slow 一步，结束时 slow 在前半段末尾。",
            "反转 slow.next 得到 second。",
            "从 head 与 second 同步比较，直到 second 一侧走完。",
            "再次反转后半段并接回 slow.next，返回保存的比较结果。"
          ],
          "en": [
            "Move fast twice and slow once until slow marks the end of the first half.",
            "Reverse slow.next to obtain second.",
            "Compare head and second in parallel until the second half ends.",
            "Reverse the second half again, reconnect it, and return the recorded result."
          ]
        },
        "correctness": {
          "zh": "反转后后半段的第 i 个值正是原链倒数第 i 个值，因此同步比较覆盖所有对称配对。第二次反转是第一次的逆操作，恢复原链接。",
          "en": "After reversal, the i-th suffix value is the original i-th value from the end. Parallel comparison checks all symmetric pairs. Applying the same reversal again restores every original link."
        },
        "time": "O(n)",
        "space": "O(1)",
        "complexity": {
          "zh": "找中点、两次半链反转与比较都为 O(n) 总量；迭代反转无递归栈，O(1) 辅助空间。",
          "en": "Finding the midpoint, reversing twice, and comparing take O(n) total time. Iterative reversal uses no recursion stack and O(1) auxiliary space."
        },
        "python": "class Solution:\n    def isPalindrome(self, head):\n        if not head or not head.next: return True\n        def reverse(node):\n            prev = None\n            while node:\n                nxt = node.next; node.next = prev\n                prev, node = node, nxt\n            return prev\n        slow = fast = head\n        while fast.next and fast.next.next:\n            slow = slow.next; fast = fast.next.next\n        second = reverse(slow.next)\n        p, q, ok = head, second, True\n        while q:\n            if p.val != q.val: ok = False\n            p, q = p.next, q.next\n        slow.next = reverse(second)\n        return ok\n",
        "java": "class Solution {\n    private ListNode reverse(ListNode p) {\n        ListNode prev=null;\n        while(p!=null) { ListNode next=p.next; p.next=prev; prev=p; p=next; }\n        return prev;\n    }\n    public boolean isPalindrome(ListNode head) {\n        if(head==null || head.next==null) return true;\n        ListNode slow=head,fast=head;\n        while(fast.next!=null && fast.next.next!=null) { slow=slow.next; fast=fast.next.next; }\n        ListNode second=reverse(slow.next),p=head,q=second; boolean ok=true;\n        while(q!=null) { if(p.val!=q.val) ok=false; p=p.next; q=q.next; }\n        slow.next=reverse(second); return ok;\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "slow=5",
              "second: 8→3"
            ],
            "note": {
              "zh": "快慢指针把 slow 留在中间，后半段从 8 开始。",
              "en": "Slow reaches the middle; the second half starts at 8."
            }
          },
          {
            "cells": [
              "second reversed: 3→8",
              "pairs: (3,3),(8,8)"
            ],
            "note": {
              "zh": "反转后半段并比较，忽略中间 5。",
              "en": "Reverse the suffix and compare, excluding middle 5."
            }
          },
          {
            "cells": [
              "restored: 3→8→5→8→3",
              "answer=true"
            ],
            "note": {
              "zh": "恢复后半段后再返回。",
              "en": "Restore the second half before returning."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/palindrome-linked-list/description/"
      },
      {
        "label": {
          "zh": "力扣原题（中文）",
          "en": "LeetCode problem (Chinese)"
        },
        "url": "https://leetcode.cn/problems/palindrome-linked-list/"
      }
    ],
    "slug": "palindrome-linked-list",
    "title": {
      "zh": "回文链表",
      "en": "Palindrome Linked List"
    },
    "category": {
      "zh": "链表",
      "en": "Linked Lists"
    },
    "level": {
      "zh": "简单",
      "en": "Easy"
    }
  },
  {
    "id": 141,
    "statement": {
      "zh": "沿 next 走下去，判断是否会再次到达同一个节点对象。有环返回 true，无环返回 false。相同节点值不代表成环。示例中的 pos 只用于描述尾部连接位置，不传入函数。",
      "en": "Determine whether following next pointers revisits a node object. Return true for a cycle and false otherwise; repeated values alone do not imply a cycle. The example field pos describes the tail connection and is not a function parameter."
    },
    "constraints": {
      "zh": [
        "节点数在 0..10000 内，值在 -100000..100000 内。",
        "pos=-1 表示无环，否则是尾节点 next 指向的合法下标。"
      ],
      "en": [
        "There are 0..10000 nodes with values in -100000..100000.",
        "pos=-1 means no cycle; otherwise it is a valid target index for the tail link."
      ]
    },
    "example": {
      "zh": "a(4)→b(7)→c(9)→b，返回 true。",
      "en": "a(4)→b(7)→c(9)→b: return true."
    },
    "methods": [
      {
        "key": "visited",
        "name": {
          "zh": "访问身份集合",
          "en": "Visited identity set"
        },
        "intuition": {
          "zh": "沿链前进时记录见过的节点引用。如果当前引用已经出现过，就完成了一次绕环；第一次重复的恰是环入口，而不是随机一个环内节点。不能记录节点值，因为两个不同节点可能保存同一个数。",
          "en": "Record node references while advancing. Encountering the same object again proves a loop; the first repeated object is precisely the entry, not an arbitrary node inside the cycle. Values cannot serve as keys because distinct nodes may have equal values."
        },
        "steps": {
          "zh": [
            "创建节点身份集合，从 head 开始。",
            "若当前节点已在集合，返回true。",
            "否则加入集合并走 next；走到空则返回false。"
          ],
          "en": [
            "Create an identity set and start from head.",
            "If the current object is already present, return true.",
            "Otherwise record it and advance; return false at the end."
          ]
        },
        "correctness": {
          "zh": "第一次重复前，行走经过非环前缀，再绕环一周；首次重复只能是入口。若走到空，每个节点只经过一次，故无环。",
          "en": "Before any repetition, traversal covers the acyclic prefix and one full cycle. The first repeat is the entry. Reaching null without a repeat proves the list is acyclic."
        },
        "time": "Expected O(n)",
        "space": "O(n)",
        "complexity": {
          "zh": "n 为不同节点数；每个节点至多加入一次，至多再做一次重复查询，集合 O(n)。",
          "en": "For n distinct nodes, each is inserted at most once, followed by at most one repeated lookup. The set occupies O(n)."
        },
        "python": "class Solution:\n    def hasCycle(self, head):\n        seen = set()\n        while head:\n            if head in seen: return True\n            seen.add(head); head = head.next\n        return False\n",
        "java": "import java.util.*;\nclass Solution {\n    public boolean hasCycle(ListNode head) {\n        Set<ListNode> seen=Collections.newSetFromMap(new IdentityHashMap<>());\n        while(head!=null) {\n            if(!seen.add(head)) return true;\n            head=head.next;\n        }\n        return false;\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "a→b→c→b",
              "seen={}"
            ],
            "note": {
              "zh": "从 a 开始跟随 next。",
              "en": "Follow next starting at a."
            }
          },
          {
            "cells": [
              "seen={a,b,c}",
              "next=b"
            ],
            "note": {
              "zh": "依次记录三种对象身份。",
              "en": "Record the three distinct identities."
            }
          },
          {
            "cells": [
              "b ∈ seen",
              "answer=true"
            ],
            "note": {
              "zh": "再次遇到 b；第一次重复就是环入口。",
              "en": "Revisit b; the first repeat is the cycle entry."
            }
          }
        ]
      },
      {
        "key": "floyd",
        "name": {
          "zh": "快慢指针判环",
          "en": "Floyd cycle detection"
        },
        "intuition": {
          "zh": "slow 每次走一步、fast 两步。无环时 fast 更快碰到空；有环时两者最终都在环中，fast 相对 slow 每轮前进一格。环上的距离按环长取模，因此一定会缩到零。初始化二者相同不算相遇，必须先移动再比较。",
          "en": "Slow advances once and fast twice. In an acyclic list fast reaches null. In a cycle both eventually enter it, and fast gains one position per round modulo the cycle length, so they must meet. Their initial equality is not evidence: compare only after moving."
        },
        "steps": {
          "zh": [
            "slow、fast 从头开始。",
            "确认 fast 与 fast.next 非空后，分别前进一步与两步。",
            "移动后若引用相等返回 true；循环因空结束则返回 false。"
          ],
          "en": [
            "Initialize both pointers at head.",
            "While fast and fast.next exist, advance slow once and fast twice.",
            "Return true on identity equality after moving; return false when fast reaches the end."
          ]
        },
        "correctness": {
          "zh": "入环后相对位置每轮变化 1，至多一圈相遇；无环情况下 fast 只会到达空而不会追上 slow。",
          "en": "Inside a cycle the relative position changes by one each round, guaranteeing a meeting within one cycle. Without a cycle fast reaches null without revisiting slow."
        },
        "time": "O(n)",
        "space": "O(1)",
        "complexity": {
          "zh": "非环前缀和至多一圈的追赶为 O(n)；仅两个指针。",
          "en": "Crossing the prefix and at most one cycle of chasing costs O(n); only two pointers are needed."
        },
        "python": "class Solution:\n    def hasCycle(self, head):\n        slow = fast = head\n        while fast and fast.next:\n            slow = slow.next; fast = fast.next.next\n            if slow is fast: return True\n        return False\n",
        "java": "class Solution {\n    public boolean hasCycle(ListNode head) {\n        ListNode slow=head,fast=head;\n        while(fast!=null && fast.next!=null) {\n            slow=slow.next; fast=fast.next.next;\n            if(slow==fast) return true;\n        }\n        return false;\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "slow=a",
              "fast=a"
            ],
            "note": {
              "zh": "初始化相同不能作为判环依据。",
              "en": "Initial equality is not a cycle test."
            }
          },
          {
            "cells": [
              "round1: slow=b, fast=c"
            ],
            "note": {
              "zh": "先移动再比较，尚未相遇。",
              "en": "Move first, then compare; no meeting yet."
            }
          },
          {
            "cells": [
              "round2: slow=c, fast=c",
              "answer=true"
            ],
            "note": {
              "zh": "快指针沿 c→b→c，追上慢指针。",
              "en": "Fast follows c→b→c and catches slow."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/linked-list-cycle/description/"
      },
      {
        "label": {
          "zh": "力扣原题（中文）",
          "en": "LeetCode problem (Chinese)"
        },
        "url": "https://leetcode.cn/problems/linked-list-cycle/"
      }
    ],
    "slug": "linked-list-cycle",
    "title": {
      "zh": "环形链表",
      "en": "Linked List Cycle"
    },
    "category": {
      "zh": "链表",
      "en": "Linked Lists"
    },
    "level": {
      "zh": "简单",
      "en": "Easy"
    }
  },
  {
    "id": 142,
    "statement": {
      "zh": "沿 next 走下去，若会再次到达某个节点，说明链表有环。返回环入口的节点对象；无环返回空，不能修改链表。示例中的 pos 只用于描述尾部连接位置，不传入函数。",
      "en": "Following next pointers may revisit a node. Return the cycle-entry node object, or null when acyclic, without modifying links. The example field pos describes the tail connection and is not a function parameter."
    },
    "constraints": {
      "zh": [
        "节点数在 0..10000 内，值在 -100000..100000 内。",
        "pos=-1 表示无环，否则是尾节点 next 指向的合法下标。"
      ],
      "en": [
        "There are 0..10000 nodes with values in -100000..100000.",
        "pos=-1 means no cycle; otherwise it is a valid target index for the tail link."
      ]
    },
    "example": {
      "zh": "a(4)→b(7)→c(9)→b，返回 b（下标 1）。",
      "en": "a(4)→b(7)→c(9)→b: return b (index 1)."
    },
    "methods": [
      {
        "key": "visited",
        "name": {
          "zh": "访问身份集合",
          "en": "Visited identity set"
        },
        "intuition": {
          "zh": "沿链前进时记录见过的节点引用。如果当前引用已经出现过，就完成了一次绕环；第一次重复的恰是环入口，而不是随机一个环内节点。不能记录节点值，因为两个不同节点可能保存同一个数。",
          "en": "Record node references while advancing. Encountering the same object again proves a loop; the first repeated object is precisely the entry, not an arbitrary node inside the cycle. Values cannot serve as keys because distinct nodes may have equal values."
        },
        "steps": {
          "zh": [
            "创建节点身份集合，从 head 开始。",
            "若当前节点已在集合，返回该节点。",
            "否则加入集合并走 next；走到空则返回空。"
          ],
          "en": [
            "Create an identity set and start from head.",
            "If the current object is already present, return that node.",
            "Otherwise record it and advance; return null at the end."
          ]
        },
        "correctness": {
          "zh": "第一次重复前，行走经过非环前缀，再绕环一周；首次重复只能是入口。若走到空，每个节点只经过一次，故无环。",
          "en": "Before any repetition, traversal covers the acyclic prefix and one full cycle. The first repeat is the entry. Reaching null without a repeat proves the list is acyclic."
        },
        "time": "Expected O(n)",
        "space": "O(n)",
        "complexity": {
          "zh": "n 为不同节点数；每个节点至多加入一次，至多再做一次重复查询，集合 O(n)。",
          "en": "For n distinct nodes, each is inserted at most once, followed by at most one repeated lookup. The set occupies O(n)."
        },
        "python": "class Solution:\n    def detectCycle(self, head):\n        seen = set()\n        while head:\n            if head in seen: return head\n            seen.add(head); head = head.next\n        return None\n",
        "java": "import java.util.*;\nclass Solution {\n    public ListNode detectCycle(ListNode head) {\n        Set<ListNode> seen=Collections.newSetFromMap(new IdentityHashMap<>());\n        while(head!=null) {\n            if(!seen.add(head)) return head;\n            head=head.next;\n        }\n        return null;\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "a→b→c→b",
              "seen={}"
            ],
            "note": {
              "zh": "从 a 开始跟随 next。",
              "en": "Follow next starting at a."
            }
          },
          {
            "cells": [
              "seen={a,b,c}",
              "next=b"
            ],
            "note": {
              "zh": "依次记录三种对象身份。",
              "en": "Record the three distinct identities."
            }
          },
          {
            "cells": [
              "b ∈ seen",
              "answer=b"
            ],
            "note": {
              "zh": "再次遇到 b；第一次重复就是环入口。",
              "en": "Revisit b; the first repeat is the cycle entry."
            }
          }
        ]
      },
      {
        "key": "floyd-entry",
        "name": {
          "zh": "相遇后等速寻找入口",
          "en": "Floyd meeting, then locate entry"
        },
        "intuition": {
          "zh": "快慢指针第一次相遇通常不是入口。设头到入口距离 a，入口到相遇点沿环距离 b，环长 L。相遇时慢指针所走距离是 L 的整数倍，因此 a+b≡0(mod L)。从相遇点再走 a 步正好到入口；同时另一个指针从头走 a 步也到入口，所以重置一个指针后让二者等速走。",
          "en": "The first Floyd meeting is usually not the entry. Let a be the prefix length, b the forward distance from entry to meeting, and L the cycle length. At a meeting slow’s traveled distance is a multiple of L, so a+b≡0 mod L. Walking a further steps from the meeting lands at the entry, exactly when a pointer starting at head reaches it."
        },
        "steps": {
          "zh": [
            "先运行一步/两步快慢指针，若 fast 走空则返回空。",
            "相遇后令 entry=head，slow 留在相遇点。",
            "entry 与 slow 每次各走一步，首次引用相同处返回。"
          ],
          "en": [
            "Run one-step/two-step pointers; return null if fast reaches the end.",
            "After meeting, set entry=head and leave slow at the meeting point.",
            "Advance entry and slow one step each; return their first common object."
          ]
        },
        "correctness": {
          "zh": "相遇方程给出 a+b 为环长整数倍；第二阶段 a 步后两者同到入口。在此之前 entry 仍在无环前缀，不可能与环内 slow 相同。",
          "en": "The meeting equation makes a+b a multiple of the cycle length. After a synchronized steps both reach the entry. They cannot meet earlier because entry is then still outside the cycle."
        },
        "time": "O(n)",
        "space": "O(1)",
        "complexity": {
          "zh": "判环 O(n)，第二阶段走前缀长度 a，仍为 O(n)；使用常数引用且不改 next。",
          "en": "Detection takes O(n), followed by a prefix-length walk. The method uses constant references and never changes links."
        },
        "python": "class Solution:\n    def detectCycle(self, head):\n        slow = fast = head\n        while fast and fast.next:\n            slow = slow.next; fast = fast.next.next\n            if slow is fast:\n                entry = head\n                while entry is not slow:\n                    entry = entry.next; slow = slow.next\n                return entry\n        return None\n",
        "java": "class Solution {\n    public ListNode detectCycle(ListNode head) {\n        ListNode slow=head,fast=head;\n        while(fast!=null && fast.next!=null) {\n            slow=slow.next; fast=fast.next.next;\n            if(slow==fast) {\n                ListNode entry=head;\n                while(entry!=slow) { entry=entry.next; slow=slow.next; }\n                return entry;\n            }\n        }\n        return null;\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "round1: slow=b, fast=c",
              "round2: slow=c, fast=c"
            ],
            "note": {
              "zh": "首次相遇在 c，并不是入口 b。",
              "en": "The first meeting is at c, not entry b."
            }
          },
          {
            "cells": [
              "entry=a",
              "slow=c"
            ],
            "note": {
              "zh": "把一个指针重置回头，另一个保留在相遇点。",
              "en": "Reset one pointer to head and retain the meeting pointer."
            }
          },
          {
            "cells": [
              "entry=b",
              "slow=b",
              "answer=b"
            ],
            "note": {
              "zh": "二者同速一步后在入口 b 相遇。",
              "en": "One synchronized step brings both to entry b."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/linked-list-cycle-ii/description/"
      },
      {
        "label": {
          "zh": "力扣原题（中文）",
          "en": "LeetCode problem (Chinese)"
        },
        "url": "https://leetcode.cn/problems/linked-list-cycle-ii/"
      }
    ],
    "slug": "linked-list-cycle-ii",
    "title": {
      "zh": "环形链表 II",
      "en": "Linked List Cycle II"
    },
    "category": {
      "zh": "链表",
      "en": "Linked Lists"
    },
    "level": {
      "zh": "中等",
      "en": "Medium"
    }
  },
  {
    "id": 21,
    "statement": {
      "zh": "将两条值为非递减顺序的单链表合并成一条非递减链，返回结果头。通过重连输入节点构造结果，重复值全部保留；任一输入可以为空。",
      "en": "Merge two nondecreasing singly linked lists into one nondecreasing list by reconnecting the input nodes. Keep all duplicates and return the merged head. Either input may be empty."
    },
    "constraints": {
      "zh": [
        "每条链节点数在 0..50 内。",
        "节点值在 -100..100 内，两条输入链分别有序。"
      ],
      "en": [
        "Each input contains 0..50 nodes.",
        "Values lie in -100..100; both input lists are individually sorted."
      ]
    },
    "example": {
      "zh": "[2,5,8] 与 [1,5,9] → [1,2,5,5,8,9]。",
      "en": "[2,5,8] and [1,5,9] → [1,2,5,5,8,9]."
    },
    "methods": [
      {
        "key": "iterative",
        "name": {
          "zh": "哨兵节点迭代归并",
          "en": "Iterative merge with a sentinel"
        },
        "intuition": {
          "zh": "每条链的头都是该链剩余部分的最小值，两头中较小的就是全局下一个值。dummy 让第一次接节点与后续接节点用同一套代码；tail 永远是已完成结果的末尾。某条链耗尽后，另一条本来就有序，可整体接上。",
          "en": "Each head is the smallest remaining value in its list, so the smaller head is the next global value. A dummy node removes special handling for the first append, while tail marks the completed prefix. Once one list ends, its sorted counterpart can be attached wholesale."
        },
        "steps": {
          "zh": [
            "建立 dummy 与 tail。",
            "比较两头，将较小节点接到 tail 后，前移对应链指针，再前移 tail。",
            "一条链空时接上另一条剩余链，返回 dummy.next。"
          ],
          "en": [
            "Create dummy and tail.",
            "Append the smaller head, advance that source pointer, then advance tail.",
            "Attach the remaining suffix when one list ends; return dummy.next."
          ]
        },
        "correctness": {
          "zh": "已合并前缀始终有序且包含所有已取节点；每次取剩余最小头维持不变式。尾部剩余链不小于最后选出的值。",
          "en": "The merged prefix stays sorted and contains exactly the consumed nodes. Choosing the smallest remaining head preserves this invariant; the leftover suffix is no smaller than the final chosen value."
        },
        "time": "O(m+n)",
        "space": "O(1)",
        "complexity": {
          "zh": "至多逐个选择 m+n 个节点；复用节点，仅一个哨兵和几个指针。",
          "en": "At most m+n nodes are selected. Nodes are reused; one sentinel and a few pointers require constant auxiliary space."
        },
        "python": "class Solution:\n    def mergeTwoLists(self, list1, list2):\n        dummy = tail = ListNode(0)\n        while list1 and list2:\n            if list1.val <= list2.val:\n                tail.next = list1; list1 = list1.next\n            else:\n                tail.next = list2; list2 = list2.next\n            tail = tail.next\n        tail.next = list1 if list1 else list2\n        return dummy.next\n",
        "java": "class Solution {\n    public ListNode mergeTwoLists(ListNode a,ListNode b) {\n        ListNode dummy=new ListNode(0),tail=dummy;\n        while(a!=null && b!=null) {\n            if(a.val<=b.val) { tail.next=a; a=a.next; }\n            else { tail.next=b; b=b.next; }\n            tail=tail.next;\n        }\n        tail.next=a!=null?a:b; return dummy.next;\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "A: 2→5→8",
              "B: 1→5→9",
              "out: 1"
            ],
            "note": {
              "zh": "1 比 2 小，先接 B 的头节点。",
              "en": "1 is smaller than 2; append B’s head."
            }
          },
          {
            "cells": [
              "out: 1→2→5→5",
              "A: 8",
              "B: 9"
            ],
            "note": {
              "zh": "继续选较小头；两个 5 都保留。",
              "en": "Continue selecting smaller heads; preserve both fives."
            }
          },
          {
            "cells": [
              "out: 1→2→5→5→8→9"
            ],
            "note": {
              "zh": "接 8 后 A 耗尽，整体接上 B 的 9。",
              "en": "After 8 exhausts A, attach B’s remaining 9."
            }
          }
        ]
      },
      {
        "key": "recursive",
        "name": {
          "zh": "递归定义合并结果",
          "en": "Recursive merge definition"
        },
        "intuition": {
          "zh": "结果头一定是两头中较小的节点。选中它后，剩下的问题只是“它后面的链与另一条链如何合并”，规模少一个节点。递归直接表达这个结构，空链是终止条件；代价是每次选择都留下一个等待返回的调用栈帧。 本题链长上限较小，递归深度可控；若复用于长链，应优先迭代版本，以免调用栈或 Python 递归深度超限。",
          "en": "The smaller input head must head the result. After choosing it, the only remaining task is merging its suffix with the other list, reducing the problem by one node. Recursion expresses this structure directly, with empty lists as base cases, but every pending choice consumes a stack frame. The small official length bounds keep recursion manageable here. For long-list reuse, prefer the iterative version to avoid call-stack or Python recursion-depth limits."
        },
        "steps": {
          "zh": [
            "一条链为空时返回另一条。",
            "若 a.val≤b.val，令 a.next=merge(a.next,b)，返回 a。",
            "否则令 b.next=merge(a,b.next)，返回 b。"
          ],
          "en": [
            "Return the other list if either input is empty.",
            "If a.val≤b.val, set a.next=merge(a.next,b) and return a.",
            "Otherwise set b.next=merge(a,b.next) and return b."
          ]
        },
        "correctness": {
          "zh": "对总节点数归纳：空链成立；较小头是正确首项，递归保证其后的合并有序且完整，故整个结果成立。",
          "en": "Induct on total length: an empty input is trivial. The smaller head is correct, and the recursive result is a complete sorted merge of the remaining nodes, completing the proof."
        },
        "time": "O(m+n)",
        "space": "O(m+n)",
        "complexity": {
          "zh": "每次递归至少消耗一个节点，最多 m+n 层；此题节点较少，但不能把递归空间误写 O(1)。",
          "en": "Each call consumes a node, yielding at most m+n calls and stack frames. This problem’s small limits permit recursion, but its auxiliary space is not constant."
        },
        "python": "class Solution:\n    def mergeTwoLists(self, list1, list2):\n        if not list1: return list2\n        if not list2: return list1\n        if list1.val <= list2.val:\n            list1.next = self.mergeTwoLists(list1.next, list2)\n            return list1\n        list2.next = self.mergeTwoLists(list1, list2.next)\n        return list2\n",
        "java": "class Solution {\n    public ListNode mergeTwoLists(ListNode a,ListNode b) {\n        if(a==null) return b;\n        if(b==null) return a;\n        if(a.val<=b.val) { a.next=mergeTwoLists(a.next,b); return a; }\n        b.next=mergeTwoLists(a,b.next); return b;\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "merge([2,5,8],[1,5,9])",
              "head=1"
            ],
            "note": {
              "zh": "较小头 1 成为结果头，它的 next 等待子问题。",
              "en": "Smaller head 1 becomes the result head; its next awaits the subproblem."
            }
          },
          {
            "cells": [
              "1→merge([2,5,8],[5,9])",
              "1→2→merge([5,8],[5,9])"
            ],
            "note": {
              "zh": "每次递归确定一个头，把剩余部分交给下一层。",
              "en": "Each call chooses one head and delegates the remainder."
            }
          },
          {
            "cells": [
              "1→2→5→5→8→9"
            ],
            "note": {
              "zh": "空链基础情况接回剩余后缀，逐层返回完整链。",
              "en": "The empty-list base case returns the suffix; unwinding completes the list."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/merge-two-sorted-lists/description/"
      },
      {
        "label": {
          "zh": "力扣原题（中文）",
          "en": "LeetCode problem (Chinese)"
        },
        "url": "https://leetcode.cn/problems/merge-two-sorted-lists/"
      }
    ],
    "slug": "merge-two-sorted-lists",
    "title": {
      "zh": "合并两个有序链表",
      "en": "Merge Two Sorted Lists"
    },
    "category": {
      "zh": "链表",
      "en": "Linked Lists"
    },
    "level": {
      "zh": "简单",
      "en": "Easy"
    }
  },
  {
    "id": 2,
    "statement": {
      "zh": "两条非空链表分别表示非负整数，每个节点是一位十进制数字，低位在前。返回两数之和的同样逆序数字链。除数值 0 外，输入整数没有前导零，因此链尾不会有多余高位零。",
      "en": "Two nonempty linked lists encode nonnegative integers with one decimal digit per node, least significant digit first. Return their sum in the same reversed-digit representation. Except for zero itself, the encoded numbers have no leading zeros."
    },
    "constraints": {
      "zh": [
        "每条链长度在 1..100 内。",
        "节点值为 0..9；除数字 0 外，没有多余的高位零。"
      ],
      "en": [
        "Each list contains 1..100 digits.",
        "Digits are 0..9; no redundant high-order zeros occur except in the number zero itself."
      ]
    },
    "example": {
      "zh": "[8,6] 与 [7,5] 表示 68+57=125，返回 [5,2,1]。",
      "en": "[8,6] and [7,5] encode 68+57=125, so return [5,2,1]."
    },
    "methods": [
      {
        "key": "carry",
        "name": {
          "zh": "逐位相加与进位",
          "en": "Digit-wise addition with carry"
        },
        "intuition": {
          "zh": "低位在前恰好符合竖式加法的计算顺序，不必翻转，也不必把长整数拼起来。当前位置总和为两位数字与进位之和；除以 10 的余数是结果位，整除 10 是下一位进位。短链用 0 补齐，两条链都结束后仍可能剩一个进位。此处保留一个清晰通用方案，不为凑数量引入大整数转换。",
          "en": "Least-significant-first storage already matches column addition, so no reversal or whole-number conversion is needed. Add the two current digits and carry; remainder modulo 10 is the output digit, and quotient is the next carry. Treat an exhausted list as zeros, and preserve a final carry after both lists end. One general solution is sufficient here; large-integer conversion adds no useful algorithmic insight."
        },
        "steps": {
          "zh": [
            "创建结果哨兵、尾指针和 carry=0。",
            "循环条件为 l1、l2、carry 至少一个仍非空/非零。",
            "累加当前两位（缺失位按 0），追加 total%10，更新 carry=total//10。",
            "移动有值的输入指针，最终返回结果头。"
          ],
          "en": [
            "Initialize an output sentinel, tail, and zero carry.",
            "Continue while either list or carry remains.",
            "Add available digits and carry, append total%10, and set carry=total//10.",
            "Advance available inputs and finally return the output head."
          ]
        },
        "correctness": {
          "zh": "处理第 k 位后，输出前 k 位等于两输入低 k 位相加的低 k 位，carry 保存向更高位的全部影响。循环结束时无未处理数字或进位，所以结果完整。",
          "en": "After k columns, the output’s first k digits equal the low k digits of the sum, and carry contains the entire effect on the next column. With no remaining digits or carry, the result is complete."
        },
        "time": "O(max(m,n))",
        "space": "O(1) auxiliary; O(max(m,n)) output",
        "complexity": {
          "zh": "每轮消费一个数位，最多 max(m,n)+1 轮。额外变量常数；新结果节点最多 max(m,n)+1 个。",
          "en": "There are at most max(m,n)+1 columns. Auxiliary variables are constant; the new result uses at most max(m,n)+1 nodes."
        },
        "python": "class Solution:\n    def addTwoNumbers(self, l1, l2):\n        dummy = tail = ListNode(0)\n        carry = 0\n        while l1 or l2 or carry:\n            total = carry\n            if l1: total += l1.val; l1 = l1.next\n            if l2: total += l2.val; l2 = l2.next\n            carry, digit = divmod(total, 10)\n            tail.next = ListNode(digit); tail = tail.next\n        return dummy.next\n",
        "java": "class Solution {\n    public ListNode addTwoNumbers(ListNode a,ListNode b) {\n        ListNode dummy=new ListNode(0),tail=dummy; int carry=0;\n        while(a!=null || b!=null || carry!=0) {\n            int total=carry;\n            if(a!=null) { total+=a.val; a=a.next; }\n            if(b!=null) { total+=b.val; b=b.next; }\n            tail.next=new ListNode(total%10); tail=tail.next; carry=total/10;\n        }\n        return dummy.next;\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "8+7+0=15",
              "digit=5, carry=1",
              "out=[5]"
            ],
            "note": {
              "zh": "个位相加产生进位。",
              "en": "Units addition produces a carry."
            }
          },
          {
            "cells": [
              "6+5+1=12",
              "digit=2, carry=1",
              "out=[5,2]"
            ],
            "note": {
              "zh": "十位需要包含上一轮进位。",
              "en": "Tens addition includes the previous carry."
            }
          },
          {
            "cells": [
              "0+0+1=1",
              "out=[5,2,1]"
            ],
            "note": {
              "zh": "输入都结束，仍追加最后进位，结果表示 125。",
              "en": "Inputs end, but append the final carry; the result encodes 125."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/add-two-numbers/description/"
      },
      {
        "label": {
          "zh": "力扣原题（中文）",
          "en": "LeetCode problem (Chinese)"
        },
        "url": "https://leetcode.cn/problems/add-two-numbers/"
      }
    ],
    "slug": "add-two-numbers",
    "title": {
      "zh": "两数相加",
      "en": "Add Two Numbers"
    },
    "category": {
      "zh": "链表",
      "en": "Linked Lists"
    },
    "level": {
      "zh": "中等",
      "en": "Medium"
    }
  },
  {
    "id": 19,
    "statement": {
      "zh": "删除非空单链表倒数第 n 个节点，返回删除后的头。n=1 删除末尾，n 等于长度则删除头；n 保证合法。",
      "en": "Remove the n-th node counted backward from the end of a nonempty singly linked list and return its new head. n=1 removes the tail; n equal to the length removes the head. n is always valid."
    },
    "constraints": {
      "zh": [
        "链长 L 在 1..30 内，1 ≤ n ≤ L。",
        "节点值在 0..100 内。"
      ],
      "en": [
        "Length L is in 1..30 and 1 ≤ n ≤ L.",
        "Node values lie in 0..100."
      ]
    },
    "example": {
      "zh": "[4,8,2,6]，n=3 → [4,2,6]。删除的是值为 8 的节点。",
      "en": "[4,8,2,6], n=3 → [4,2,6]. Remove the node holding 8."
    },
    "methods": [
      {
        "key": "length",
        "name": {
          "zh": "先计长度再定位",
          "en": "Count length, then locate"
        },
        "intuition": {
          "zh": "倒数第 n 个就是正数第 L-n+1 个。删除节点需要拿到它的前驱，因此从哨兵出发走 L-n 步。哨兵把删头也变成“修改前驱 next”的普通操作，不需要返回特殊分支。",
          "en": "The n-th from the end is position L-n+1 from the front. Deleting it requires its predecessor, found by walking L-n steps from a sentinel. A sentinel makes head deletion the same next-pointer update as every other deletion."
        },
        "steps": {
          "zh": [
            "第一遍数出长度 L。",
            "令 dummy.next=head，从 dummy 出发前进 L-n 次找到 prev。",
            "执行 prev.next=prev.next.next，返回 dummy.next。"
          ],
          "en": [
            "Count L in a first traversal.",
            "Link dummy to head and advance prev from dummy by L-n steps.",
            "Bypass prev.next and return dummy.next."
          ]
        },
        "correctness": {
          "zh": "哨兵视为第 0 个位置，走 L-n 步恰好停在第 L-n+1 个目标之前；跨过一次 next 只删除目标且保留其他节点次序。",
          "en": "Treating the sentinel as position zero, L-n steps land immediately before the target at L-n+1. Bypassing that one link removes exactly the target while preserving order."
        },
        "time": "O(L)",
        "space": "O(1)",
        "complexity": {
          "zh": "计数 L 次，定位至多 L 次，线性时间；一个哨兵与常数变量。",
          "en": "Counting and locating together take at most two linear traversals. A sentinel and constant variables suffice."
        },
        "python": "class Solution:\n    def removeNthFromEnd(self, head, n):\n        length, p = 0, head\n        while p: length += 1; p = p.next\n        dummy = ListNode(0); dummy.next = head\n        prev = dummy\n        for _ in range(length-n): prev = prev.next\n        prev.next = prev.next.next\n        return dummy.next\n",
        "java": "class Solution {\n    public ListNode removeNthFromEnd(ListNode head,int n) {\n        int length=0; for(ListNode p=head;p!=null;p=p.next) length++;\n        ListNode dummy=new ListNode(0); dummy.next=head; ListNode prev=dummy;\n        for(int i=0;i<length-n;i++) prev=prev.next;\n        prev.next=prev.next.next; return dummy.next;\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "4→8→2→6",
              "L=4,n=3"
            ],
            "note": {
              "zh": "倒数第 3 个对应正数第 2 个。",
              "en": "Third from the end is second from the start."
            }
          },
          {
            "cells": [
              "D→4→8→2→6",
              "prev=4"
            ],
            "note": {
              "zh": "从哨兵走 L-n=1 步找到前驱。",
              "en": "Walk L-n=1 step from the sentinel to the predecessor."
            }
          },
          {
            "cells": [
              "4.next=2",
              "4→2→6"
            ],
            "note": {
              "zh": "跨过值为 8 的目标节点。",
              "en": "Bypass the target node holding 8."
            }
          }
        ]
      },
      {
        "key": "gap",
        "name": {
          "zh": "保持 n 个节点的间隔",
          "en": "Maintain a fixed pointer gap"
        },
        "intuition": {
          "zh": "不必先知道总长：让 fast 先从哨兵走 n 步，slow 留在哨兵。随后同步移动，直到 fast 到尾节点。此时 slow 距尾 n 条边，正好位于待删除节点前。这里停止条件是 fast.next 为空，不能混用另一种“先走 n+1 步、直到 fast 为空”的写法。",
          "en": "Avoid measuring length by moving fast n steps from the sentinel while slow stays there. Advance both until fast is the tail. Slow is then n edges before the tail, exactly the target’s predecessor. This version stops on fast.next being null; do not mix it with the n+1-gap variant that stops on fast itself being null."
        },
        "steps": {
          "zh": [
            "创建哨兵，fast=slow=dummy。",
            "fast 先走 n 步，建立间隔。",
            "当 fast.next 非空时同步走一步。",
            "slow.next 指向目标，跨过它并返回新头。"
          ],
          "en": [
            "Create a sentinel and initialize fast=slow=dummy.",
            "Advance fast n times to create the gap.",
            "While fast.next exists, advance both once.",
            "Bypass slow.next and return the sentinel’s successor."
          ]
        },
        "correctness": {
          "zh": "同步移动保持 n 条边的距离；fast 位于第 L 个节点时 slow 位于 L-n，正是目标 L-n+1 的前驱。",
          "en": "Synchronized movement preserves a gap of n edges. At fast’s position L, slow is at L-n, immediately before the target at L-n+1."
        },
        "time": "O(L)",
        "space": "O(1)",
        "complexity": {
          "zh": "fast 总共走 L 步，slow 不超过 L 步；常数指针空间，满足一次遍历的进阶目标。",
          "en": "Fast advances L times and slow at most L times. Constant pointer storage satisfies the one-pass follow-up."
        },
        "python": "class Solution:\n    def removeNthFromEnd(self, head, n):\n        dummy = ListNode(0); dummy.next = head\n        fast = slow = dummy\n        for _ in range(n): fast = fast.next\n        while fast.next:\n            fast = fast.next; slow = slow.next\n        slow.next = slow.next.next\n        return dummy.next\n",
        "java": "class Solution {\n    public ListNode removeNthFromEnd(ListNode head,int n) {\n        ListNode dummy=new ListNode(0); dummy.next=head;\n        ListNode fast=dummy,slow=dummy;\n        for(int i=0;i<n;i++) fast=fast.next;\n        while(fast.next!=null) { fast=fast.next; slow=slow.next; }\n        slow.next=slow.next.next; return dummy.next;\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "D→4→8→2→6",
              "slow=D,fast=2"
            ],
            "note": {
              "zh": "fast 从哨兵先走 3 步，保持三条边间隔。",
              "en": "Advance fast three edges from the sentinel."
            }
          },
          {
            "cells": [
              "slow=4,fast=6"
            ],
            "note": {
              "zh": "同步一步，fast 到尾，slow 正好是目标前驱。",
              "en": "One synchronized step puts fast at the tail and slow before the target."
            }
          },
          {
            "cells": [
              "4→2→6"
            ],
            "note": {
              "zh": "令 slow.next 越过 8，返回结果。",
              "en": "Make slow.next bypass 8 and return the result."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/remove-nth-node-from-end-of-list/description/"
      },
      {
        "label": {
          "zh": "力扣原题（中文）",
          "en": "LeetCode problem (Chinese)"
        },
        "url": "https://leetcode.cn/problems/remove-nth-node-from-end-of-list/"
      }
    ],
    "slug": "remove-nth-node-from-end-of-list",
    "title": {
      "zh": "删除链表的倒数第 N 个结点",
      "en": "Remove Nth Node From End of List"
    },
    "category": {
      "zh": "链表",
      "en": "Linked Lists"
    },
    "level": {
      "zh": "中等",
      "en": "Medium"
    }
  },
  {
    "id": 24,
    "statement": {
      "zh": "将单链表中的相邻节点两两交换，返回新头。只能重连节点，不能交换节点里的值。若长度为奇数，最后落单的节点保持原位。",
      "en": "Swap every adjacent pair of nodes and return the new head. Change links rather than swapping stored values. A final unpaired node in an odd-length list stays in place."
    },
    "constraints": {
      "zh": [
        "节点数在 0..100 内。",
        "节点值在 0..100 内。"
      ],
      "en": [
        "There are 0..100 nodes.",
        "Node values lie in 0..100."
      ]
    },
    "example": {
      "zh": "[4,7,2,8,6] → [7,4,8,2,6]。",
      "en": "[4,7,2,8,6] → [7,4,8,2,6]."
    },
    "methods": [
      {
        "key": "iterative",
        "name": {
          "zh": "前驱指针迭代交换",
          "en": "Iterative swaps with a predecessor"
        },
        "intuition": {
          "zh": "交换 a、b 不只是改它们之间的边，还要把前驱接到 b，再让 a 接回后续链。prev 指向当前一对之前的节点，交换后 a 成了这一对的尾，下一轮 prev 应更新为 a。哨兵解决首对交换导致头变化的问题。",
          "en": "Swapping a and b requires three boundary updates: predecessor to b, b to a, and a to the remaining suffix. prev identifies the predecessor of the current pair. After swapping, a is the pair’s tail and becomes the next prev. A sentinel handles the changing head."
        },
        "steps": {
          "zh": [
            "dummy 接原头，prev=dummy。",
            "只有 prev.next 和它的 next 都存在才交换；命名为 a、b。",
            "令 a.next=b.next，b.next=a，prev.next=b。",
            "prev=a 后继续；返回 dummy.next。"
          ],
          "en": [
            "Link a sentinel to head and set prev=dummy.",
            "Proceed only when two nodes exist after prev; name them a and b.",
            "Set a.next=b.next, b.next=a, and prev.next=b.",
            "Advance prev to a and repeat; return dummy.next."
          ]
        },
        "correctness": {
          "zh": "已处理前缀中的每对都正确反转；三次连边既交换当前一对又完整保留后缀。未成对的最后节点不进入循环，保持不变。",
          "en": "The processed prefix consists of correctly swapped pairs. Three link updates swap the current pair while retaining its suffix. An unpaired final node never enters the loop and stays unchanged."
        },
        "time": "O(n)",
        "space": "O(1)",
        "complexity": {
          "zh": "每轮处理两个节点，O(n)；只使用哨兵与常数引用。",
          "en": "Each iteration handles two nodes, giving O(n) time with constant auxiliary references."
        },
        "python": "class Solution:\n    def swapPairs(self, head):\n        dummy = ListNode(0); dummy.next = head\n        prev = dummy\n        while prev.next and prev.next.next:\n            a, b = prev.next, prev.next.next\n            a.next = b.next; b.next = a; prev.next = b\n            prev = a\n        return dummy.next\n",
        "java": "class Solution {\n    public ListNode swapPairs(ListNode head) {\n        ListNode dummy=new ListNode(0); dummy.next=head; ListNode prev=dummy;\n        while(prev.next!=null && prev.next.next!=null) {\n            ListNode a=prev.next,b=a.next;\n            a.next=b.next; b.next=a; prev.next=b; prev=a;\n        }\n        return dummy.next;\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "D→4→7→2→8→6",
              "prev=D,a=4,b=7"
            ],
            "note": {
              "zh": "三条边改写前先定位当前一对。",
              "en": "Identify the current pair before updating its three links."
            }
          },
          {
            "cells": [
              "D→7→4→2→8→6",
              "prev=4"
            ],
            "note": {
              "zh": "交换首对，前驱移动到新的组尾 4。",
              "en": "Swap the first pair; move prev to its new tail 4."
            }
          },
          {
            "cells": [
              "D→7→4→8→2→6"
            ],
            "note": {
              "zh": "再交换 2、8；最后的 6 不足一对。",
              "en": "Swap 2 and 8; the final 6 is unpaired."
            }
          }
        ]
      },
      {
        "key": "recursive",
        "name": {
          "zh": "递归处理剩余成对节点",
          "en": "Recursively swap the suffix"
        },
        "intuition": {
          "zh": "把第一对与后面的链拆开思考：后面的链已经能通过同一个函数正确两两交换，那么只需让第一节点接上这个结果，再让第二节点成为新头。每次递归规模减少两个，空链或单节点直接返回。 本题链长上限较小，递归深度可控；若复用于长链，应优先迭代版本，以免调用栈或 Python 递归深度超限。",
          "en": "Separate the first pair from the suffix. If the same function correctly swaps the suffix, connect the original first node to that result and make the original second node the new head. Each call removes two nodes from the problem; an empty or singleton suffix needs no change. The small official length bounds keep recursion manageable here. For long-list reuse, prefer the iterative version to avoid call-stack or Python recursion-depth limits."
        },
        "steps": {
          "zh": [
            "若不足两个节点，直接返回 head。",
            "保存 second=head.next。",
            "head.next=swapPairs(second.next)，随后 second.next=head。",
            "返回 second 作为这一段的新头。"
          ],
          "en": [
            "Return head when fewer than two nodes remain.",
            "Save second=head.next.",
            "Set head.next=swapPairs(second.next), then second.next=head.",
            "Return second as this segment’s new head."
          ]
        },
        "correctness": {
          "zh": "递归假设确保第三个节点后的后缀正确；接成 second→head→已交换后缀恰好完成第一对，且没有修改节点值。",
          "en": "The inductive assumption makes the suffix beginning at the third node correct. Connecting second→head→swapped suffix completes the first pair without changing any values."
        },
        "time": "O(n)",
        "space": "O(n)",
        "complexity": {
          "zh": "每层常数操作、深度约 n/2，时间 O(n)，调用栈 O(n)。",
          "en": "Each level performs constant work and recursion depth is about n/2, giving O(n) time and stack space."
        },
        "python": "class Solution:\n    def swapPairs(self, head):\n        if not head or not head.next: return head\n        second = head.next\n        head.next = self.swapPairs(second.next)\n        second.next = head\n        return second\n",
        "java": "class Solution {\n    public ListNode swapPairs(ListNode head) {\n        if(head==null || head.next==null) return head;\n        ListNode second=head.next;\n        head.next=swapPairs(second.next); second.next=head;\n        return second;\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "swap(4→7→2→8→6)",
              "second=7"
            ],
            "note": {
              "zh": "保存第一对的第二节点 7。",
              "en": "Save 7 as the second node of the first pair."
            }
          },
          {
            "cells": [
              "swap(2→8→6)=8→2→6"
            ],
            "note": {
              "zh": "递归后缀中 6 为单节点基础情况。",
              "en": "The suffix recursion uses singleton 6 as its base case."
            }
          },
          {
            "cells": [
              "7→4→8→2→6"
            ],
            "note": {
              "zh": "4 接已交换后缀，7 再接 4。",
              "en": "Connect 4 to the swapped suffix, then 7 to 4."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/swap-nodes-in-pairs/description/"
      },
      {
        "label": {
          "zh": "力扣原题（中文）",
          "en": "LeetCode problem (Chinese)"
        },
        "url": "https://leetcode.cn/problems/swap-nodes-in-pairs/"
      }
    ],
    "slug": "swap-nodes-in-pairs",
    "title": {
      "zh": "两两交换链表中的节点",
      "en": "Swap Nodes in Pairs"
    },
    "category": {
      "zh": "链表",
      "en": "Linked Lists"
    },
    "level": {
      "zh": "中等",
      "en": "Medium"
    }
  },
  {
    "id": 25,
    "statement": {
      "zh": "从头开始每 k 个节点作为一组，将完整组内的节点顺序反转。末尾不足 k 个的部分保持原样。只能修改连接，不能交换节点值；返回新头。",
      "en": "Partition the list from its head into groups of k nodes and reverse each complete group. Leave a final incomplete group unchanged. Reconnect nodes without swapping values, and return the new head."
    },
    "constraints": {
      "zh": [
        "1 ≤ k ≤ 节点数 n ≤ 5000。",
        "节点值在 0..1000 内；进阶要求常数辅助空间。"
      ],
      "en": [
        "1 ≤ k ≤ node count n ≤ 5000.",
        "Values lie in 0..1000; the follow-up requests constant auxiliary space."
      ]
    },
    "example": {
      "zh": "[2,4,6,8,10]，k=2 → [4,2,8,6,10]。末尾 10 不足一组。",
      "en": "[2,4,6,8,10], k=2 → [4,2,8,6,10]. The final 10 is an incomplete group."
    },
    "methods": [
      {
        "key": "group-stack",
        "name": {
          "zh": "组内栈倒序重连",
          "en": "Stack each complete group"
        },
        "intuition": {
          "zh": "先收集最多 k 个节点引用，确认这一组是否完整，再动原连接。完整组按出栈顺序接回；若不足 k 个，当前后缀从未被修改，可以直接接回。这把最容易出错的“尾部不足 k 不反转”规则放在修改之前处理。",
          "en": "Collect up to k references before changing any links. A full group is reconnected in pop order. If fewer than k are available, the suffix is untouched and can be attached as-is. This checks the crucial incomplete-group rule before any mutation occurs."
        },
        "steps": {
          "zh": [
            "从 cur 收集至多 k 个节点到栈，同时保存下一组起点。",
            "不足 k 时让 tail.next=cur 并结束。",
            "完整组逐个弹出接到 tail 后，再把尾接到下一组起点。"
          ],
          "en": [
            "Collect up to k nodes starting at cur while preserving the next group’s start.",
            "If the group is incomplete, attach cur unchanged and stop.",
            "Otherwise append nodes in pop order, then connect the new tail to the next group."
          ]
        },
        "correctness": {
          "zh": "每个完整组出栈顺序恰好反向，组与组之间次序不变。不完整组没有任何指针被修改，所以满足尾部保持条件。",
          "en": "Each full group appears in reverse pop order while group order stays fixed. No links in an incomplete group are changed, preserving the required suffix."
        },
        "time": "O(n)",
        "space": "O(k)",
        "complexity": {
          "zh": "每节点入栈、出栈各至多一次，O(n)；栈最多存 k 个引用。",
          "en": "Every node is pushed and popped at most once, for O(n) time. The stack holds at most k references."
        },
        "python": "class Solution:\n    def reverseKGroup(self, head, k):\n        dummy = tail = ListNode(0)\n        cur = head\n        while cur:\n            stack, p = [], cur\n            for _ in range(k):\n                if not p: break\n                stack.append(p); p = p.next\n            if len(stack) < k:\n                tail.next = cur; break\n            while stack:\n                tail.next = stack.pop(); tail = tail.next\n            tail.next = p; cur = p\n        return dummy.next\n",
        "java": "import java.util.*;\nclass Solution {\n    public ListNode reverseKGroup(ListNode head,int k) {\n        ListNode dummy=new ListNode(0),tail=dummy,cur=head;\n        while(cur!=null) {\n            Deque<ListNode> stack=new ArrayDeque<>(); ListNode p=cur;\n            for(int i=0;i<k && p!=null;i++) { stack.push(p); p=p.next; }\n            if(stack.size()<k) { tail.next=cur; break; }\n            while(!stack.isEmpty()) { tail.next=stack.pop(); tail=tail.next; }\n            tail.next=p; cur=p;\n        }\n        return dummy.next;\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "stack=[2,4]",
              "next=6"
            ],
            "note": {
              "zh": "第一组已凑足 k=2，才开始修改连接。",
              "en": "The first group has k=2 nodes before any mutation."
            }
          },
          {
            "cells": [
              "out: 4→2→8→6",
              "next=10"
            ],
            "note": {
              "zh": "两次完整组按出栈顺序连接。",
              "en": "Reconnect two full groups in pop order."
            }
          },
          {
            "cells": [
              "stack=[10] < k",
              "out: 4→2→8→6→10"
            ],
            "note": {
              "zh": "最后一组不完整，10 原样接回。",
              "en": "The last group is incomplete; attach 10 unchanged."
            }
          }
        ]
      },
      {
        "key": "group-reverse",
        "name": {
          "zh": "定位边界后局部反转",
          "en": "Locate boundaries, then reverse in place"
        },
        "intuition": {
          "zh": "普通整链反转的终止条件是空，这里要改成下一组起点。先找到第 k 个节点 kth，保存 after=kth.next；以 after 为初始 prev，可以让旧组头在反转时直接接好后续链。组外前驱最后连到 kth，旧组头则成为下一轮前驱。",
          "en": "Whole-list reversal stops at null; grouped reversal instead stops at the next group’s start. Find kth and save after=kth.next. Starting prev at after immediately gives the old group head its correct final successor. Finally connect the external predecessor to kth and use the old head as the next predecessor."
        },
        "steps": {
          "zh": [
            "从 before 前进 k 次寻找 kth；不足 k 个立即结束。",
            "保存 after=kth.next 与 first=before.next。",
            "从 first 迭代反转直到 cur is after，prev 初始设为 after。",
            "before.next=kth，随后 before=first，进入下一组。"
          ],
          "en": [
            "Find kth by walking k times from before; stop if insufficient nodes remain.",
            "Save after=kth.next and first=before.next.",
            "Reverse from first until cur is after, initializing prev=after.",
            "Connect before.next=kth and move before to first for the next group."
          ]
        },
        "correctness": {
          "zh": "边界检查确保只反转完整组。局部反转不变式保证已处理部分逆序并最终连接 after；两端重连后，完整组与后缀都保留且无丢节点。",
          "en": "The boundary check restricts reversal to complete groups. The reversal invariant preserves a reversed processed segment eventually connected to after. Reattaching both boundaries preserves all nodes and the untouched suffix."
        },
        "time": "O(n)",
        "space": "O(1)",
        "complexity": {
          "zh": "定位和反转各访问每个完整组 O(k) 次，总 O(n)；所有操作迭代，只有常数引用。",
          "en": "Locating and reversing each group both take O(k), totaling O(n). All work is iterative with constant reference storage."
        },
        "python": "class Solution:\n    def reverseKGroup(self, head, k):\n        dummy = ListNode(0); dummy.next = head\n        before = dummy\n        while True:\n            kth = before\n            for _ in range(k):\n                kth = kth.next\n                if not kth: return dummy.next\n            after, first = kth.next, before.next\n            prev, cur = after, first\n            while cur is not after:\n                nxt = cur.next; cur.next = prev\n                prev, cur = cur, nxt\n            before.next = kth; before = first\n",
        "java": "class Solution {\n    public ListNode reverseKGroup(ListNode head,int k) {\n        ListNode dummy=new ListNode(0); dummy.next=head; ListNode before=dummy;\n        while(true) {\n            ListNode kth=before;\n            for(int i=0;i<k;i++) { kth=kth.next; if(kth==null) return dummy.next; }\n            ListNode after=kth.next,first=before.next,prev=after,cur=first;\n            while(cur!=after) {\n                ListNode next=cur.next; cur.next=prev; prev=cur; cur=next;\n            }\n            before.next=kth; before=first;\n        }\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "D→2→4→6→8→10",
              "kth=4,after=6"
            ],
            "note": {
              "zh": "先确认第一组边界。",
              "en": "Locate the first complete group’s boundaries."
            }
          },
          {
            "cells": [
              "D→4→2→6→8→10",
              "before=2"
            ],
            "note": {
              "zh": "以 6 为反转的初始 prev，旧组头 2 自动接回 6。",
              "en": "Using 6 as initial prev reconnects old head 2 to 6."
            }
          },
          {
            "cells": [
              "D→4→2→8→6→10",
              "before=6"
            ],
            "note": {
              "zh": "第二组反转后，余下只有 10，不足 k，结束。",
              "en": "After reversing the second group only 10 remains, so stop."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/reverse-nodes-in-k-group/description/"
      },
      {
        "label": {
          "zh": "力扣原题（中文）",
          "en": "LeetCode problem (Chinese)"
        },
        "url": "https://leetcode.cn/problems/reverse-nodes-in-k-group/"
      }
    ],
    "slug": "reverse-nodes-in-k-group",
    "title": {
      "zh": "K 个一组翻转链表",
      "en": "Reverse Nodes in k-Group"
    },
    "category": {
      "zh": "链表",
      "en": "Linked Lists"
    },
    "level": {
      "zh": "困难",
      "en": "Hard"
    }
  },
  {
    "id": 138,
    "statement": {
      "zh": "复制带 next 与 random 两种指针的链表，返回完全独立的新链头。每个原节点恰好对应一个新节点，值相同，next 与 random 的连接关系也要一一对应；新链的指针不能引用任何原节点。random 可以为空或指向链中任意节点，包括自身。",
      "en": "Deep-copy a list whose nodes have both next and random pointers. Create exactly one new node for each original, preserving values and the corresponding next/random relationships. No copied pointer may refer to an original node. A random pointer may be null or point anywhere in the list, including to itself."
    },
    "constraints": {
      "zh": [
        "节点数 0..1000，值 -10000..10000。",
        "输入表示中的 [val,random_index] 是序列化格式，函数实际只接收 head。"
      ],
      "en": [
        "There are 0..1000 nodes with values in -10000..10000.",
        "Pairs [val,random_index] are a serialization format; the function receives only head."
      ]
    },
    "example": {
      "zh": "[[4,2],[7,0],[9,null]] → 相同序列化结果，但全部是新节点。a.random=c，b.random=a。",
      "en": "[[4,2],[7,0],[9,null]] → the same serialization using entirely new nodes. a.random=c and b.random=a."
    },
    "methods": [
      {
        "key": "mapping",
        "name": {
          "zh": "旧对象到新对象映射",
          "en": "Map original objects to copies"
        },
        "intuition": {
          "zh": "难点不是复制值，而是拿到旧 random 目标时找到它的新副本。第一遍只创建节点，让所有目标副本都存在；第二遍再连边，就不需要担心 random 指向后方尚未处理的节点。映射键必须是旧对象身份，不能是 val。",
          "en": "The challenge is translating an old random target into its new counterpart. Create all nodes before connecting any edges, so forward random targets already have copies. A second pass translates next and random through the mapping. Keys must be original object identities, not values."
        },
        "steps": {
          "zh": [
            "第一遍为每个旧节点建立全新 Node，并存入映射。",
            "第二遍令 copy.next=map[old.next]、copy.random=map[old.random]，空目标对应空。",
            "返回 head 对应的新节点；空链返回空。"
          ],
          "en": [
            "Create a fresh Node for each original and record it in an identity map.",
            "Translate next and random through the map; null maps to null.",
            "Return the copy of head, or null for an empty list."
          ]
        },
        "correctness": {
          "zh": "映射建立原节点与新节点的一一对应，第二遍对每条边应用相同映射，因此保存完整拓扑；映射值全是新建对象，所以不存在新→旧指针。",
          "en": "The map is a bijection between original and fresh nodes. Translating every edge through it preserves topology, and all targets are new objects, preventing any new-to-old pointer."
        },
        "time": "Expected O(n)",
        "space": "O(n) auxiliary; O(n) output",
        "complexity": {
          "zh": "两遍扫描与期望常数映射查询 O(n)；映射 O(n)，新链节点额外作为输出 O(n)。",
          "en": "Two scans and expected constant-time map lookups take O(n). The map uses O(n) auxiliary space, separate from O(n) output nodes."
        },
        "python": "class Solution:\n    def copyRandomList(self, head):\n        copies = {None: None}\n        p = head\n        while p:\n            copies[p] = Node(p.val); p = p.next\n        p = head\n        while p:\n            copies[p].next = copies[p.next]\n            copies[p].random = copies[p.random]\n            p = p.next\n        return copies[head]\n",
        "java": "import java.util.*;\nclass Solution {\n    public Node copyRandomList(Node head) {\n        Map<Node,Node> copies=new IdentityHashMap<>();\n        for(Node p=head;p!=null;p=p.next) copies.put(p,new Node(p.val));\n        for(Node p=head;p!=null;p=p.next) {\n            copies.get(p).next=copies.get(p.next);\n            copies.get(p).random=copies.get(p.random);\n        }\n        return copies.get(head);\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "a(4)→b(7)→c(9)",
              "map: a→A,b→B,c→C"
            ],
            "note": {
              "zh": "先创建三个独立副本，大小写表示新旧身份。",
              "en": "Create three independent copies; letter case distinguishes identities."
            }
          },
          {
            "cells": [
              "A.next=B, B.next=C",
              "A.random=C, B.random=A"
            ],
            "note": {
              "zh": "通过映射同时翻译 next 与 random。",
              "en": "Translate both next and random through the map."
            }
          },
          {
            "cells": [
              "copy: [[4,2],[7,0],[9,null]]",
              "A,B,C ≠ a,b,c"
            ],
            "note": {
              "zh": "序列化相同，但新链没有指向旧节点的边。",
              "en": "Serialization matches, but no copied edge points to an old node."
            }
          }
        ]
      },
      {
        "key": "interleave",
        "name": {
          "zh": "交织副本再拆分",
          "en": "Interleave copies, then detach"
        },
        "intuition": {
          "zh": "把每个副本插在旧节点后面，旧节点.next 就临时充当映射。若旧节点 random 指向 r，那么它的副本 random 应指向 r.next。必须先为全链插完副本，再设置 random；最后拆分两链并恢复所有原 next。此方案会暂时改变输入，不适合并发读取同一链的场景。",
          "en": "Insert each copy immediately after its original, temporarily using original.next as the mapping. If an original random pointer targets r, the copied random targets r.next. Finish interleaving the entire list before assigning random pointers. Finally detach copies and restore all original links. This temporarily mutates the input, so concurrent readers would require coordination."
        },
        "steps": {
          "zh": [
            "第一遍把 old→next 改成 old→copy→next。",
            "第二遍按 old.random.next 设置 copy.random，空 random 保持空。",
            "第三遍恢复 old.next，并让 copy.next 指向下一个副本。",
            "保存并返回首副本，原链完全恢复。"
          ],
          "en": [
            "Replace each old→next edge with old→copy→next.",
            "Assign copy.random using old.random.next, or null.",
            "Restore old.next while connecting copy.next to the next copy.",
            "Return the saved first copy after the original list is fully restored."
          ]
        },
        "correctness": {
          "zh": "交织后每个旧节点的后继唯一对应其副本，因而 random 翻译准确。拆分只撤销临时 next 插入，不改已正确设置的新 random，最终得到两条独立链。",
          "en": "After interleaving, each original’s successor uniquely identifies its copy, so random translation is exact. Detachment reverses only the temporary next insertions and leaves copied random edges intact, yielding independent lists."
        },
        "time": "O(n)",
        "space": "O(1) auxiliary; O(n) output",
        "complexity": {
          "zh": "三次线性遍历 O(n)；除 n 个必需输出节点外，仅常数指针，无映射表。",
          "en": "Three linear passes take O(n). Beyond the n required output nodes, only constant references are stored."
        },
        "python": "class Solution:\n    def copyRandomList(self, head):\n        p = head\n        while p:\n            copy = Node(p.val); copy.next = p.next\n            p.next = copy; p = copy.next\n        p = head\n        while p:\n            p.next.random = p.random.next if p.random else None\n            p = p.next.next\n        new_head = head.next if head else None\n        p = head\n        while p:\n            copy = p.next; nxt = copy.next\n            p.next = nxt\n            copy.next = nxt.next if nxt else None\n            p = nxt\n        return new_head\n",
        "java": "class Solution {\n    public Node copyRandomList(Node head) {\n        Node p=head;\n        while(p!=null) {\n            Node copy=new Node(p.val); copy.next=p.next; p.next=copy; p=copy.next;\n        }\n        for(p=head;p!=null;p=p.next.next)\n            p.next.random=p.random==null?null:p.random.next;\n        Node ans=head==null?null:head.next; p=head;\n        while(p!=null) {\n            Node copy=p.next,next=copy.next; p.next=next;\n            copy.next=next==null?null:next.next; p=next;\n        }\n        return ans;\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "a→A→b→B→c→C"
            ],
            "note": {
              "zh": "把副本插到旧节点后，建立临时映射。",
              "en": "Insert each copy after its original as a temporary mapping."
            }
          },
          {
            "cells": [
              "A.random=c.next=C",
              "B.random=a.next=A"
            ],
            "note": {
              "zh": "旧 random 目标的 next 正是它的副本。",
              "en": "The old random target’s next is its copy."
            }
          },
          {
            "cells": [
              "old: a→b→c",
              "copy: A→B→C",
              "random: A→C, B→A"
            ],
            "note": {
              "zh": "拆分同时恢复原链，副本 random 保持正确。",
              "en": "Detach copies and restore originals while preserving copied random edges."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/copy-list-with-random-pointer/description/"
      },
      {
        "label": {
          "zh": "力扣原题（中文）",
          "en": "LeetCode problem (Chinese)"
        },
        "url": "https://leetcode.cn/problems/copy-list-with-random-pointer/"
      }
    ],
    "slug": "copy-list-with-random-pointer",
    "title": {
      "zh": "随机链表的复制",
      "en": "Copy List with Random Pointer"
    },
    "category": {
      "zh": "链表",
      "en": "Linked Lists"
    },
    "level": {
      "zh": "中等",
      "en": "Medium"
    }
  },
  {
    "id": 148,
    "statement": {
      "zh": "将单链表按节点值从小到大排序并返回新头。重复值需要保留，空链仍返回空。进阶目标为 O(n log n) 时间、O(1) 辅助空间。",
      "en": "Sort a singly linked list into nondecreasing value order and return its head. Preserve duplicates and return null for an empty list. The follow-up asks for O(n log n) time and O(1) auxiliary space."
    },
    "constraints": {
      "zh": [
        "节点数 n 在 0..50000 内。",
        "节点值在 -100000..100000 内。"
      ],
      "en": [
        "Node count n lies in 0..50000.",
        "Values lie in -100000..100000."
      ]
    },
    "example": {
      "zh": "[7,2,6,1] → [1,2,6,7]。",
      "en": "[7,2,6,1] → [1,2,6,7]."
    },
    "methods": [
      {
        "key": "top-down",
        "name": {
          "zh": "自顶向下归并排序",
          "en": "Top-down merge sort"
        },
        "intuition": {
          "zh": "链表不能廉价随机访问，却能很方便地拆成两段并合并有序链，所以归并排序适合它。快慢指针把链近乎对半分开；必须断开中点 next，否则递归规模没有减少。两个子问题排好后，持续选较小头接回，合并本身使用迭代以避免线性递归栈。",
          "en": "Linked lists lack cheap random access but split and merge naturally. Fast/slow pointers divide the list nearly in half; cutting the midpoint’s next link is essential to shrink the recursive problem. Sort both halves, then repeatedly select the smaller head. Use iterative merging so the merge phase does not create a linear-depth call stack."
        },
        "steps": {
          "zh": [
            "空链或单节点直接返回。",
            "slow=head、fast=head.next 找到左半段末尾，保存右头并断链。",
            "递归排序左右两段。",
            "用哨兵和双指针迭代归并，返回合并头。"
          ],
          "en": [
            "Return immediately for empty or singleton lists.",
            "Find the left half’s tail using slow=head, fast=head.next; save the right head and cut the link.",
            "Recursively sort both halves.",
            "Merge them iteratively using a sentinel and return the merged head."
          ]
        },
        "correctness": {
          "zh": "归纳基础是单节点有序；递归保证两半有序，而每次选择剩余较小头的归并保持整体有序且覆盖全部节点。",
          "en": "Single-node lists establish the base case. Recursive sorting orders each half, and selecting the smaller remaining head merges them into a complete sorted list."
        },
        "time": "O(n log(n+1))",
        "space": "O(log(n+1))",
        "complexity": {
          "zh": "每层找中点与归并共 O(n)，平衡拆分约 log n 层。递归栈 O(log n)，归并迭代；不满足常数空间进阶。",
          "en": "Splitting and merging cost O(n) per level over O(log n) balanced levels. The recursion stack uses O(log n); iterative merging adds constant space. This does not meet the constant-space follow-up."
        },
        "python": "class Solution:\n    def sortList(self, head):\n        if not head or not head.next: return head\n        slow, fast = head, head.next\n        while fast and fast.next:\n            slow = slow.next; fast = fast.next.next\n        right = slow.next; slow.next = None\n        a, b = self.sortList(head), self.sortList(right)\n        dummy = tail = ListNode(0)\n        while a and b:\n            if a.val <= b.val: tail.next = a; a = a.next\n            else: tail.next = b; b = b.next\n            tail = tail.next\n        tail.next = a if a else b\n        return dummy.next\n",
        "java": "class Solution {\n    public ListNode sortList(ListNode head) {\n        if(head==null || head.next==null) return head;\n        ListNode slow=head,fast=head.next;\n        while(fast!=null && fast.next!=null) { slow=slow.next; fast=fast.next.next; }\n        ListNode right=slow.next; slow.next=null;\n        ListNode a=sortList(head),b=sortList(right),dummy=new ListNode(0),tail=dummy;\n        while(a!=null && b!=null) {\n            if(a.val<=b.val) { tail.next=a; a=a.next; }\n            else { tail.next=b; b=b.next; }\n            tail=tail.next;\n        }\n        tail.next=a!=null?a:b; return dummy.next;\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "[7,2] | [6,1]"
            ],
            "note": {
              "zh": "快慢指针将四节点链拆成两半。",
              "en": "Fast/slow pointers split the four-node list in half."
            }
          },
          {
            "cells": [
              "[2,7] | [1,6]"
            ],
            "note": {
              "zh": "两半各自递归拆到单节点再归并。",
              "en": "Each half is split to singleton nodes and merged."
            }
          },
          {
            "cells": [
              "1→2→6→7"
            ],
            "note": {
              "zh": "比较两半当前头，依次取 1、2、6、7。",
              "en": "Compare the two heads and select 1, 2, 6, then 7."
            }
          }
        ]
      },
      {
        "key": "bottom-up",
        "name": {
          "zh": "自底向上归并排序",
          "en": "Bottom-up merge sort"
        },
        "intuition": {
          "zh": "递归中的“先小段再大段”可以改成外层段长循环：最初每个单节点已排序，归并相邻长度 1 的段，再归并长度 2、4、8 的段。split 负责把长度至多 size 的链切下来并返回剩余头；尾组不足长度也合法。只保留当前两段与拼接尾，就能消除递归栈。",
          "en": "Replace recursive levels with a run-size loop. Single nodes are already sorted; merge adjacent runs of length 1, then 2, 4, and so on. split detaches a run of at most size nodes and returns the remainder, so short final runs are valid. Tracking only two current runs and the assembled tail eliminates the recursion stack."
        },
        "steps": {
          "zh": [
            "先统计长度 n，设置 size=1，哨兵接原链。",
            "每轮反复用 split 切下 left、right 两段，并保存后续 cur。",
            "把两段按较小头依次接到 tail 后，处理完后继续下一对。",
            "整轮完成后 size 翻倍；size≥n 时返回。"
          ],
          "en": [
            "Count n, set size=1, and attach the list to a sentinel.",
            "Repeatedly split left and right runs, saving the following cur.",
            "Append the smaller remaining head to tail until both runs are consumed.",
            "After a full pass double size; return when size≥n."
          ]
        },
        "correctness": {
          "zh": "每轮开始时每个长度 size 的段有序；成对归并得到长度至多 2size 的有序段。段长翻倍后不变式继续成立，最终整链为一个有序段。",
          "en": "At each pass, runs of size are sorted. Merging adjacent pairs creates sorted runs of at most 2size, preserving the invariant for the doubled size. Eventually one run spans the entire list."
        },
        "time": "O(n log(n+1))",
        "space": "O(1)",
        "complexity": {
          "zh": "每轮切分和归并各遍历 O(n) 节点，轮数 O(log n)。split 与 merge 均迭代；仅常数指针，不创建数组或递归栈。",
          "en": "Splitting and merging visit O(n) nodes per pass over O(log n) passes. Both are iterative, using constant pointers without arrays or a recursion stack."
        },
        "python": "class Solution:\n    def sortList(self, head):\n        def split(node, size):\n            if not node: return None\n            for _ in range(size-1):\n                if not node.next: break\n                node = node.next\n            rest = node.next; node.next = None\n            return rest\n        n, p = 0, head\n        while p: n += 1; p = p.next\n        dummy = ListNode(0); dummy.next = head\n        size = 1\n        while size < n:\n            cur, tail = dummy.next, dummy\n            while cur:\n                left = cur; right = split(left, size); cur = split(right, size)\n                while left or right:\n                    if not right or (left and left.val <= right.val):\n                        tail.next = left; left = left.next\n                    else:\n                        tail.next = right; right = right.next\n                    tail = tail.next\n                tail.next = cur\n            size *= 2\n        return dummy.next\n",
        "java": "class Solution {\n    private ListNode split(ListNode node,int size) {\n        if(node==null) return null;\n        for(int i=1;i<size && node.next!=null;i++) node=node.next;\n        ListNode rest=node.next; node.next=null; return rest;\n    }\n    public ListNode sortList(ListNode head) {\n        int n=0; for(ListNode p=head;p!=null;p=p.next) n++;\n        ListNode dummy=new ListNode(0); dummy.next=head;\n        for(int size=1;size<n;size*=2) {\n            ListNode cur=dummy.next,tail=dummy;\n            while(cur!=null) {\n                ListNode left=cur,right=split(left,size); cur=split(right,size);\n                while(left!=null || right!=null) {\n                    if(right==null || (left!=null && left.val<=right.val)) {\n                        tail.next=left; left=left.next;\n                    } else { tail.next=right; right=right.next; }\n                    tail=tail.next;\n                }\n                tail.next=cur;\n            }\n        }\n        return dummy.next;\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "size=1",
              "7 | 2 | 6 | 1"
            ],
            "note": {
              "zh": "每个单节点天然有序。",
              "en": "Each singleton run is already sorted."
            }
          },
          {
            "cells": [
              "size=2",
              "2→7 | 1→6"
            ],
            "note": {
              "zh": "两两合并长度 1 的段，形成长度 2 的有序段。",
              "en": "Merge pairs of size-one runs into sorted size-two runs."
            }
          },
          {
            "cells": [
              "size=4",
              "1→2→6→7"
            ],
            "note": {
              "zh": "再合并两个长度 2 的段，整条链排序完成。",
              "en": "Merge the two size-two runs to finish the entire list."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/sort-list/description/"
      },
      {
        "label": {
          "zh": "力扣原题（中文）",
          "en": "LeetCode problem (Chinese)"
        },
        "url": "https://leetcode.cn/problems/sort-list/"
      }
    ],
    "slug": "sort-list",
    "title": {
      "zh": "排序链表",
      "en": "Sort List"
    },
    "category": {
      "zh": "链表",
      "en": "Linked Lists"
    },
    "level": {
      "zh": "中等",
      "en": "Medium"
    }
  },
  {
    "id": 23,
    "statement": {
      "zh": "给出 k 个单链表的头节点，每条链表都按非递减顺序排列。将所有节点合成一条非递减链表，返回其头节点；空数组和空链表都合法。",
      "en": "Combine the nodes from k nondecreasing linked lists into one nondecreasing list and return its head. Both an empty array and empty individual lists are valid."
    },
    "constraints": {
      "zh": [
        "0 ≤ k ≤ 10⁴；每条链最多 500 个节点",
        "总节点数 N ≤ 10⁴；节点值在 [-10⁴,10⁴]"
      ],
      "en": [
        "0 ≤ k ≤ 10⁴; each list has at most 500 nodes",
        "Total node count N ≤ 10⁴; values lie in [-10⁴,10⁴]"
      ]
    },
    "example": {
      "zh": "[[1,4],[2,5],[3,6]] → [1,2,3,4,5,6]",
      "en": "[[1,4],[2,5],[3,6]] → [1,2,3,4,5,6]"
    },
    "methods": [
      {
        "key": "heap",
        "name": {
          "zh": "最小堆维护候选头",
          "en": "Min-heap of candidate heads"
        },
        "intuition": {
          "zh": "每条链的头就是该链剩余节点中的最小值，因此全局最小节点只可能出现在这些头中。弹出一个头后，仅它所属链的候选发生变化。Python 元组加入递增序号，避免值相同时比较节点对象。",
          "en": "The smallest remaining node must be a current list head. A heap compares only these candidates; removing one changes only that list’s candidate. A unique counter prevents Python from comparing node objects when values tie."
        },
        "steps": {
          "zh": [
            "把所有非空头加入堆并 heapify",
            "弹出最小节点，将它接到 tail 后面",
            "若有后继，将后继加入堆；重复到堆空"
          ],
          "en": [
            "Heapify all nonempty heads",
            "Pop the minimum and append it after tail",
            "Insert its successor if present; repeat until empty"
          ]
        },
        "correctness": {
          "zh": "每次追加的是全部剩余节点的最小值；追加前答案有序，追加后仍有序。每个节点只有其前驱弹出后才入堆，因此不重不漏。",
          "en": "Each appended node is the minimum among all remaining nodes, preserving sorted order. A node enters only when its predecessor leaves, so every node appears exactly once."
        },
        "time": "O(k + N log(k+1))",
        "space": "O(k)",
        "complexity": {
          "zh": "扫描 k 个头需要 O(k)；每节点一次入堆和出堆，堆至多 k 项。复用输入节点，输出链不另分配 N 个节点。",
          "en": "Scanning heads costs O(k); each node is pushed and popped once from a heap of at most k items. Input nodes are reused."
        },
        "python": "from heapq import heapify, heappop, heappush\nfrom itertools import count\nclass Solution:\n    def mergeKLists(self, lists):\n        serial = count()\n        heap = [(n.val, next(serial), n) for n in lists if n]\n        heapify(heap)\n        dummy = tail = ListNode(0)\n        while heap:\n            _, _, node = heappop(heap)\n            nxt = node.next\n            tail.next = node\n            tail = node\n            if nxt:\n                heappush(heap, (nxt.val, next(serial), nxt))\n        tail.next = None\n        return dummy.next\n",
        "java": "import java.util.*;\nclass Solution  {\n    public ListNode mergeKLists(ListNode[] lists)  {\n        PriorityQueue<ListNode> heap = new PriorityQueue<>((a,b)->Integer.compare(a.val,b.val));\n        for (ListNode n: lists) if (n != null) heap.offer(n);\n        ListNode dummy = new ListNode(0), tail = dummy;\n        while (!heap.isEmpty())  {\n            ListNode n = heap.poll(), next = n.next;\n            tail.next = n;\n            tail = n;\n            if (next != null) heap.offer(next);\n        }\n        tail.next = null;\n        return dummy.next;\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "heap=1,2,3",
              "out=[]"
            ],
            "note": {
              "zh": "三个候选来自三条链头。",
              "en": "Three list heads form the candidates."
            }
          },
          {
            "cells": [
              "pop=1",
              "push=4",
              "heap=2,3,4",
              "out=[1]"
            ],
            "note": {
              "zh": "取 1 后只补它的后继 4。",
              "en": "After taking 1, insert only its successor 4."
            }
          },
          {
            "cells": [
              "out=[1,2,3]",
              "heap=4,5,6"
            ],
            "note": {
              "zh": "取 2 补 5，取 3 补 6。",
              "en": "Take 2 and insert 5, then take 3 and insert 6."
            }
          },
          {
            "cells": [
              "out=[1,2,3,4,5,6]",
              "heap=[]"
            ],
            "note": {
              "zh": "依次弹出剩余候选。",
              "en": "Pop the remaining candidates in order."
            }
          }
        ]
      },
      {
        "key": "pairwise",
        "name": {
          "zh": "迭代两两归并",
          "en": "Iterative pairwise merging"
        },
        "intuition": {
          "zh": "依次把新链加入大结果会反复扫描早期节点。改为第一轮合并相邻两链，第二轮合并四链的结果，直到只剩一组，让每个节点每一轮最多被扫描一次。",
          "en": "Sequential merging repeatedly scans the growing result. Pairwise rounds merge groups of size two, then four, and so on, limiting each node to one scan per round."
        },
        "steps": {
          "zh": [
            "步长从 1 开始，合并 lists[i] 与 lists[i+step]",
            "双指针总是取较小头，剩余整段直接接上",
            "步长翻倍；最终 lists[0] 是答案，输入为空则返回空"
          ],
          "en": [
            "Start with stride 1 and merge lists[i] with lists[i+stride]",
            "Take the smaller head repeatedly, then attach the remaining suffix",
            "Double the stride; return lists[0], or null for empty input"
          ]
        },
        "correctness": {
          "zh": "两条有序链归并产生有序且包含全部节点的链。归纳每轮，各位置保存对应整组链的正确归并，最终组覆盖全部输入。",
          "en": "Merging two sorted lists preserves order and all nodes. Inductively, each round correctly merges its groups until one group covers every input."
        },
        "time": "O(k + N log(k+1))",
        "space": "O(1)",
        "complexity": {
          "zh": "有 O(log(k+1)) 轮，每轮节点扫描不超过 N，列表槽位操作合计 O(k)。原地修改 lists 数组且复用链表节点，无递归栈。",
          "en": "There are O(log(k+1)) rounds with at most N node visits each, plus O(k) slot work overall. The input array is modified and nodes reused; no recursion is used."
        },
        "python": "class Solution:\n    def mergeKLists(self, lists):\n        def merge(a, b):\n            dummy = tail = ListNode(0)\n            while a and b:\n                if a.val <= b.val:\n                    tail.next, a = a, a.next\n                else:\n                    tail.next, b = b, b.next\n                tail = tail.next\n            tail.next = a or b\n            return dummy.next\n        step = 1\n        while step < len(lists):\n            for i in range(0, len(lists)-step, step*2):\n                lists[i] = merge(lists[i], lists[i+step])\n            step *= 2\n        return lists[0] if lists else None\n",
        "java": "import java.util.*;\nclass Solution  {\n    private ListNode merge(ListNode a, ListNode b)  {\n        ListNode dummy=new ListNode(0), t=dummy;\n        while(a!=null && b!=null)  {\n            if(a.val<=b.val) {\n                t.next=a;\n                a=a.next;\n            }\n            else  {\n                t.next=b;\n                b=b.next;\n            }\n            t=t.next;\n        }\n        t.next=a!=null?a:b;\n        return dummy.next;\n    }\n    public ListNode mergeKLists(ListNode[] lists)  {\n        for(int step=1;step<lists.length;step*=2)             for(int i=0;i+step<lists.length;i+=step*2) lists[i]=merge(lists[i],lists[i+step]);\n        return lists.length==0?null:lists[0];\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "step=1",
              "[1,4] + [2,5]"
            ],
            "note": {
              "zh": "首先归并前两条链。",
              "en": "First merge the first two lists."
            }
          },
          {
            "cells": [
              "[1,2,4,5]",
              "[3,6]",
              "step=2"
            ],
            "note": {
              "zh": "第三条链等待下一轮。",
              "en": "The third list waits for the next round."
            }
          },
          {
            "cells": [
              "[1,2,3,4,5,6]"
            ],
            "note": {
              "zh": "归并两组，得到全部节点。",
              "en": "Merge both groups to obtain every node."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/merge-k-sorted-lists/description/"
      }
    ],
    "slug": "merge-k-sorted-lists",
    "title": {
      "zh": "合并 K 个升序链表",
      "en": "Merge k Sorted Lists"
    },
    "category": {
      "zh": "链表",
      "en": "Linked Lists"
    },
    "level": {
      "zh": "困难",
      "en": "Hard"
    }
  },
  {
    "id": 146,
    "statement": {
      "zh": "实现 LRUCache(capacity)、get(key)、put(key,value)。读取不存在的键返回 -1；成功读取和写入都刷新使用顺序。新增键导致超容量时删除最久未使用的键，更新已有键不增加条目数。两项操作均要求平均 O(1)。",
      "en": "Implement LRUCache(capacity), get(key), and put(key,value). Missing reads return -1. Successful reads and writes refresh recency. Evict the least recently used key when inserting exceeds capacity; updating a key does not increase size. Both operations require average O(1) time."
    },
    "constraints": {
      "zh": [
        "1 ≤ capacity ≤ 3000",
        "0 ≤ key ≤ 10⁴；0 ≤ value ≤ 10⁵",
        "总 get/put 次数不超过 2×10⁵"
      ],
      "en": [
        "1 ≤ capacity ≤ 3000",
        "0 ≤ key ≤ 10⁴; 0 ≤ value ≤ 10⁵",
        "At most 2×10⁵ get/put calls"
      ]
    },
    "example": {
      "zh": "容量 2：put(7,70), put(8,80), get(7)=70, put(9,90), get(8)=-1。读取 7 后，8 成为最久未使用。",
      "en": "Capacity 2: put(7,70), put(8,80), get(7)=70, put(9,90), get(8)=-1. Reading 7 makes 8 the eviction candidate."
    },
    "methods": [
      {
        "key": "ordered-map",
        "name": {
          "zh": "有序哈希容器",
          "en": "Ordered hash container"
        },
        "intuition": {
          "zh": "需要同时支持按键定位和使用顺序。Python OrderedDict 提供移动到末尾与删除首项；Java LinkedHashMap 开启 accessOrder 后由库维护访问顺序。普通插入顺序不能自动表达最近使用。",
          "en": "We need key lookup and recency order simultaneously. Python OrderedDict supports moving a key to the end and removing the first item; Java LinkedHashMap with accessOrder maintains access order. Insertion order alone is insufficient."
        },
        "steps": {
          "zh": [
            "容器从最久到最近排列",
            "命中 get 或更新 put 后，将键移动到最近端",
            "插入新键后若超容量，删除最久端"
          ],
          "en": [
            "Order entries from least to most recently used",
            "Move successful reads and updated writes to the recent end",
            "After insertion, remove the oldest entry if over capacity"
          ]
        },
        "correctness": {
          "zh": "每次成功使用恰好把该键置于末尾，其他键相对顺序不变，所以首项始终最久未使用。",
          "en": "Every successful access moves exactly that key to the end while preserving other entries’ relative order, so the first item is always least recently used."
        },
        "time": "O(1) average / operation",
        "space": "O(C)",
        "complexity": {
          "zh": "哈希查找和有序链移动平均常数时间；容器最多 C+1 个瞬时条目，C 是容量。",
          "en": "Hash lookup and order updates take average constant time. At most C+1 entries exist transiently, where C is capacity."
        },
        "python": "from collections import OrderedDict\nclass LRUCache:\n    def __init__(self, capacity):\n        self.capacity = capacity\n        self.data = OrderedDict()\n    def get(self, key):\n        if key not in self.data:\n            return -1\n        self.data.move_to_end(key)\n        return self.data[key]\n    def put(self, key, value):\n        self.data[key] = value\n        self.data.move_to_end(key)\n        if len(self.data) > self.capacity:\n            self.data.popitem(last=False)\n",
        "java": "import java.util.*;\nclass LRUCache  {\n    private final int capacity;\n    private final LinkedHashMap<Integer,Integer> data;\n    public LRUCache(int capacity)  {\n        this.capacity=capacity;\n        data=new LinkedHashMap<>(16,0.75f,true);\n    }\n    public int get(int key) {\n        return data.getOrDefault(key,-1);\n    }\n    public void put(int key,int value) {\n        data.put(key,value);\n        if(data.size()>capacity) {\n            Integer oldest=data.keySet().iterator().next();\n            data.remove(oldest);\n        }\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "C=2",
              "7:70 → 8:80"
            ],
            "note": {
              "zh": "写入 7 和 8，左侧最久。",
              "en": "Insert 7 and 8; oldest is on the left."
            }
          },
          {
            "cells": [
              "get(7)=70",
              "8:80 → 7:70"
            ],
            "note": {
              "zh": "访问 7，把它移动到末尾。",
              "en": "Access 7 and move it to the end."
            }
          },
          {
            "cells": [
              "put(9,90)",
              "7:70 → 9:90",
              "get(8)=-1"
            ],
            "note": {
              "zh": "容量不足，移除最久的 8。",
              "en": "Evict oldest key 8 when capacity is exceeded."
            }
          }
        ]
      },
      {
        "key": "linked-map",
        "name": {
          "zh": "哈希表 + 双向链表",
          "en": "Hash table + doubly linked list"
        },
        "intuition": {
          "zh": "自己实现有序容器：map 保存 key 到节点的引用，避免沿链寻找；双向指针让已知节点在 O(1) 时间摘除。头尾哨兵不存数据，消除移动第一项、最后一项时的特殊判断。",
          "en": "Implement the ordering explicitly: a map locates nodes, and two links allow constant-time removal of a known node. Sentinel head and tail nodes eliminate special cases for endpoints."
        },
        "steps": {
          "zh": [
            "head.next 为最久，tail.prev 为最近",
            "命中后摘下节点，插入 tail 前",
            "新键建立映射和节点；超容量时同时删除 head.next 及对应映射"
          ],
          "en": [
            "head.next is oldest; tail.prev is newest",
            "Detach a hit and insert it immediately before tail",
            "Insert new nodes into both structures; evict head.next from both if needed"
          ]
        },
        "correctness": {
          "zh": "映射和链表始终一一对应；移动不改变条目集合，淘汰同步删除。因此既能正确返回值，也保持准确的 LRU 顺序。",
          "en": "The map and list remain in one-to-one correspondence. Moves preserve entries and synchronized eviction removes exactly the oldest, maintaining correct values and recency."
        },
        "time": "O(1) average / operation",
        "space": "O(C)",
        "complexity": {
          "zh": "一次操作只有常数次哈希访问和指针修改。最多保存 C 个数据节点及 C 个映射；哨兵是常数开销。",
          "en": "Each operation performs a constant number of hash accesses and pointer updates. C data nodes and C map entries dominate sentinel overhead."
        },
        "python": "class Node:\n    def __init__(self, key=0, value=0):\n        self.key, self.value = key, value\n        self.prev = self.next = None\nclass LRUCache:\n    def __init__(self, capacity):\n        self.capacity, self.data = capacity, {}\n        self.head, self.tail = Node(), Node()\n        self.head.next, self.tail.prev = self.tail, self.head\n    def remove(self, n):\n        n.prev.next, n.next.prev = n.next, n.prev\n    def append(self, n):\n        n.prev, n.next = self.tail.prev, self.tail\n        self.tail.prev.next = n\n        self.tail.prev = n\n    def get(self, key):\n        n = self.data.get(key)\n        if n is None: return -1\n        self.remove(n); self.append(n)\n        return n.value\n    def put(self, key, value):\n        if key in self.data:\n            n = self.data[key]; n.value = value; self.remove(n)\n        else:\n            n = Node(key, value); self.data[key] = n\n        self.append(n)\n        if len(self.data) > self.capacity:\n            old = self.head.next\n            self.remove(old); del self.data[old.key]\n",
        "java": "import java.util.*;\nclass LRUCache  {\n    static class Node  {\n        int key,value;\n        Node prev,next;\n        Node(int k,int v) {\n            key=k;\n            value=v;\n        }\n    }\n    private final int capacity;\n    private final Map<Integer,Node> data=new HashMap<>();\n    private final Node head=new Node(0,0), tail=new Node(0,0);\n    public LRUCache(int c) {\n        capacity=c;\n        head.next=tail;\n        tail.prev=head;\n    }\n    private void remove(Node n) {\n        n.prev.next=n.next;\n        n.next.prev=n.prev;\n    }\n    private void append(Node n) {\n        n.prev=tail.prev;\n        n.next=tail;\n        tail.prev.next=n;\n        tail.prev=n;\n    }\n    public int get(int key) {\n        Node n=data.get(key);\n        if(n==null)return -1;\n        remove(n);\n        append(n);\n        return n.value;\n    }\n    public void put(int key,int value) {\n        Node n=data.get(key);\n        if(n==null) {\n            n=new Node(key,value);\n            data.put(key,n);\n        }\n        else {\n            n.value=value;\n            remove(n);\n        }\n        append(n);\n        if(data.size()>capacity) {\n            Node old=head.next;\n            remove(old);\n            data.remove(old.key);\n        }\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "head ↔ 7 ↔ 8 ↔ tail",
              "map={7,8}"
            ],
            "note": {
              "zh": "链表与哈希表对应两个数据节点。",
              "en": "The list and map represent the same two entries."
            }
          },
          {
            "cells": [
              "get(7)=70",
              "head ↔ 8 ↔ 7 ↔ tail"
            ],
            "note": {
              "zh": "摘下 7 再插到 tail 前。",
              "en": "Detach 7 and insert it before tail."
            }
          },
          {
            "cells": [
              "head ↔ 7 ↔ 9 ↔ tail",
              "map={7,9}",
              "get(8)=-1"
            ],
            "note": {
              "zh": "插入 9 后，同时从链表和 map 淘汰 8。",
              "en": "After inserting 9, evict 8 from both structures."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/lru-cache/description/"
      }
    ],
    "slug": "lru-cache",
    "title": {
      "zh": "LRU 缓存",
      "en": "LRU Cache"
    },
    "category": {
      "zh": "链表",
      "en": "Linked Lists"
    },
    "level": {
      "zh": "中等",
      "en": "Medium"
    }
  },
  {
    "id": 94,
    "statement": {
      "zh": "返回二叉树节点值的中序序列：每棵子树都先访问左子树，再访问根，最后访问右子树。空树返回空数组。",
      "en": "Return node values in inorder: complete the left subtree, visit the root, then complete the right subtree. An empty tree produces an empty array."
    },
    "constraints": {
      "zh": [
        "0 ≤ n ≤ 100；节点值范围 [-100,100]"
      ],
      "en": [
        "0 ≤ n ≤ 100; node values in [-100,100]"
      ]
    },
    "example": {
      "zh": "root=[4,2,6,1,3] → [1,2,3,4,6]",
      "en": "root=[4,2,6,1,3] → [1,2,3,4,6]"
    },
    "methods": [
      {
        "key": "recursive",
        "name": {
          "zh": "递归中序",
          "en": "Recursive inorder"
        },
        "intuition": {
          "zh": "把整棵树的访问要求原样应用到子树即可。访问根的代码必须放在左右递归之间；放在前面会变成前序。答案数组在所有调用间共享，避免反复拼接数组。",
          "en": "Apply the same traversal rule to each subtree. Append the root between the recursive calls, not before them. Share one output array to avoid repeated concatenation."
        },
        "steps": {
          "zh": [
            "空节点不做任何事",
            "递归完成左子树",
            "追加当前值，再递归右子树"
          ],
          "en": [
            "Return immediately for a null node",
            "Finish the left subtree recursively",
            "Append the current value, then traverse the right subtree"
          ]
        },
        "correctness": {
          "zh": "假设左右递归各自输出正确中序，把左序列、根、右序列相接恰好符合定义；空树是归纳起点。",
          "en": "Assuming both children produce correct inorder sequences, placing the root between them satisfies the definition. Null subtrees form the base case."
        },
        "time": "O(n)",
        "space": "O(h) auxiliary + O(n) output",
        "complexity": {
          "zh": "每节点一次追加、两次子调用；调用栈最多 h 层。退化链 h=n，平衡树 h=O(log n)。",
          "en": "Each node is appended once. The stack has h frames: n for a chain and O(log n) for a balanced tree."
        },
        "python": "class Solution:\n    def inorderTraversal(self, root):\n        result = []\n        def walk(node):\n            if not node: return\n            walk(node.left)\n            result.append(node.val)\n            walk(node.right)\n        walk(root)\n        return result\n",
        "java": "import java.util.*;\nclass Solution  {\n    public List<Integer> inorderTraversal(TreeNode root) {\n        List<Integer> a=new ArrayList<>();\n        walk(root,a);\n        return a;\n    }\n    private void walk(TreeNode n,List<Integer>a) {\n        if(n==null)return;\n        walk(n.left,a);\n        a.add(n.val);\n        walk(n.right,a);\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "walk(4) → walk(2) → walk(1)"
            ],
            "note": {
              "zh": "先递归到最左叶。",
              "en": "Recurse to the leftmost leaf."
            }
          },
          {
            "cells": [
              "out=[1,2,3]"
            ],
            "note": {
              "zh": "完成 2 的左、根、右。",
              "en": "Complete left-root-right around node 2."
            }
          },
          {
            "cells": [
              "out=[1,2,3,4,6]"
            ],
            "note": {
              "zh": "返回根 4，再处理右侧 6。",
              "en": "Return to 4, then process 6."
            }
          }
        ]
      },
      {
        "key": "stack",
        "name": {
          "zh": "显式栈中序",
          "en": "Explicit-stack inorder"
        },
        "intuition": {
          "zh": "向左下降时还不能输出祖先，因为祖先的左侧尚未完成。栈保存这些待访问祖先；下降到空才弹出最近祖先。弹出时其左侧已经处理完，随后转向它的右子树。",
          "en": "Ancestors cannot be emitted while descending left because their left subtrees are unfinished. Save them on a stack. When descent reaches null, pop the nearest pending ancestor and then explore its right subtree."
        },
        "steps": {
          "zh": [
            "当前节点和栈同时为空才结束",
            "沿左链入栈直到空",
            "弹出、输出，然后把当前节点改为其右孩子"
          ],
          "en": [
            "Stop only when both current node and stack are empty",
            "Push the entire left spine",
            "Pop and emit a node, then move to its right child"
          ]
        },
        "correctness": {
          "zh": "每次弹出前左子树已经完成，而右子树尚未访问；因此每个节点的输出时机严格是左、根、右。",
          "en": "At each pop, the left subtree is complete and the right subtree has not been visited. This enforces left-root-right order for every node."
        },
        "time": "O(n)",
        "space": "O(h) auxiliary + O(n) output",
        "complexity": {
          "zh": "每节点入栈出栈各一次；栈只保存一条祖先路径。循环嵌套不意味着平方时间。",
          "en": "Every node is pushed and popped exactly once; nested loops still total linear work. The stack stores an ancestor path."
        },
        "python": "class Solution:\n    def inorderTraversal(self, root):\n        result, stack = [], []\n        cur = root\n        while cur or stack:\n            while cur:\n                stack.append(cur); cur = cur.left\n            cur = stack.pop()\n            result.append(cur.val)\n            cur = cur.right\n        return result\n",
        "java": "import java.util.*;\nclass Solution  {\n    public List<Integer> inorderTraversal(TreeNode root) {\n        List<Integer>a=new ArrayList<>();\n        Deque<TreeNode>s=new ArrayDeque<>();\n        TreeNode cur=root;\n        while(cur!=null||!s.isEmpty()) {\n            while(cur!=null) {\n                s.push(cur);\n                cur=cur.left;\n            }\n            cur=s.pop();\n            a.add(cur.val);\n            cur=cur.right;\n        }\n        return a;\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "stack=[4,2,1]",
              "out=[]"
            ],
            "note": {
              "zh": "栈从底到顶保存左链。",
              "en": "The stack stores the left spine bottom to top."
            }
          },
          {
            "cells": [
              "pop=1",
              "pop=2",
              "cur=3",
              "out=[1,2]"
            ],
            "note": {
              "zh": "弹出才输出，接着处理 2 的右子树。",
              "en": "Emit on pop, then process 2’s right subtree."
            }
          },
          {
            "cells": [
              "out=[1,2,3,4,6]",
              "stack=[]"
            ],
            "note": {
              "zh": "依次处理 3、4、6。",
              "en": "Finish 3, 4, and 6 in order."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/binary-tree-inorder-traversal/description/"
      }
    ],
    "slug": "binary-tree-inorder-traversal",
    "title": {
      "zh": "二叉树的中序遍历",
      "en": "Binary Tree Inorder Traversal"
    },
    "category": {
      "zh": "二叉树",
      "en": "Binary Trees"
    },
    "level": {
      "zh": "简单",
      "en": "Easy"
    }
  },
  {
    "id": 104,
    "statement": {
      "zh": "计算从根到最远叶子的路径所包含的节点数；空树的深度为 0。这里统计节点，不是边。",
      "en": "Compute the number of nodes on a longest root-to-leaf path. The empty tree has depth 0; depth counts nodes rather than edges."
    },
    "constraints": {
      "zh": [
        "0 ≤ n ≤ 10⁴；节点值范围 [-100,100]"
      ],
      "en": [
        "0 ≤ n ≤ 10⁴; node values in [-100,100]"
      ]
    },
    "example": {
      "zh": "root=[5,2,8,1] → 3",
      "en": "root=[5,2,8,1] → 3"
    },
    "methods": [
      {
        "key": "postorder",
        "name": {
          "zh": "后序计算高度",
          "en": "Postorder height"
        },
        "intuition": {
          "zh": "如果已经知道左右子树的深度，经过当前节点的最长向下路径只需选择较深一侧，再加当前节点的 1。空树设为 0 后，叶子自然得到 1。",
          "en": "Once the child depths are known, the longest downward path chooses the deeper child and adds the current node. Defining null depth as 0 automatically gives a leaf depth of 1."
        },
        "steps": {
          "zh": [
            "空节点返回 0",
            "分别求左右深度",
            "返回 1 + max(left,right)"
          ],
          "en": [
            "Return 0 for null",
            "Compute both child depths",
            "Return 1 + max(left,right)"
          ]
        },
        "correctness": {
          "zh": "任何根到叶路径只能进入一侧子树；选择最大深度即覆盖最优路径，且递归结果由同一定义保证。",
          "en": "Every root-to-leaf path enters exactly one child. Taking the larger valid child depth therefore yields the optimal depth."
        },
        "time": "O(n)",
        "space": "O(h)",
        "complexity": {
          "zh": "每节点常数工作，栈深 h。Python 设置足够递归深度；极深树更适合下一种迭代方法。 实际递归受 Python 递归深度和 Java 线程栈限制；提高 Python 深度不会消除内存开销，极深输入优先用显式栈。",
          "en": "Each node does constant work and the stack reaches h frames. Python raises its recursion limit; iterative traversal is preferable for extremely deep trees. Actual recursion is limited by Python recursion depth and the Java thread stack; raising Python’s limit does not remove memory costs. Prefer an explicit stack for extreme depth."
        },
        "python": "import sys\nclass Solution:\n    def maxDepth(self, root):\n        sys.setrecursionlimit(max(sys.getrecursionlimit(), 30000))\n        def depth(n):\n            return 0 if n is None else 1 + max(depth(n.left), depth(n.right))\n        return depth(root)\n",
        "java": "import java.util.*;\nclass Solution  {\n    public int maxDepth(TreeNode root) {\n        if(root==null)return 0;\n        return 1+Math.max(maxDepth(root.left),maxDepth(root.right));\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "depth(1)=1",
              "depth(null)=0"
            ],
            "note": {
              "zh": "叶子由空孩子返回的 0 得到高度 1。",
              "en": "A leaf obtains height 1 from null-child heights 0."
            }
          },
          {
            "cells": [
              "depth(2)=2",
              "depth(8)=1"
            ],
            "note": {
              "zh": "节点 2 选更深的左侧。",
              "en": "Node 2 chooses its deeper left side."
            }
          },
          {
            "cells": [
              "depth(5)=1+max(2,1)=3"
            ],
            "note": {
              "zh": "根将最大子树高度加一。",
              "en": "The root adds one to its largest child height."
            }
          }
        ]
      },
      {
        "key": "bfs",
        "name": {
          "zh": "逐层计数",
          "en": "Count BFS layers"
        },
        "intuition": {
          "zh": "深度也就是树一共有多少层。队列初始只放根，每轮记录当前长度，把这一层全部移走，再处理新加入的下一层。长度必须在循环前固定。",
          "en": "Depth equals the number of layers. Start the queue with the root, freeze its size at each round, and remove that entire layer before counting the next one."
        },
        "steps": {
          "zh": [
            "空树直接返回 0",
            "记录队列长度，逐个取出这一层节点并加入非空孩子",
            "每轮深度加 1，队列空时结束"
          ],
          "en": [
            "Return 0 for an empty tree",
            "Freeze queue size; remove that many nodes and enqueue their children",
            "Increment depth once per round until the queue is empty"
          ]
        },
        "correctness": {
          "zh": "每轮开始队列恰好代表下一层；处理后只留下它的孩子。因此轮数等于根到最深叶的节点数。",
          "en": "At the start of each round the queue contains one layer; processing it produces the next. The round count therefore equals the deepest root-to-leaf node count."
        },
        "time": "O(n)",
        "space": "O(w)",
        "complexity": {
          "zh": "每节点进出队一次；队列可能同时含相邻两层的部分节点，但仍为 O(w)，w 是最大层宽。",
          "en": "Each node enters and leaves once. The queue may mix portions of adjacent layers but remains O(w), where w is maximum width."
        },
        "python": "from collections import deque\nclass Solution:\n    def maxDepth(self, root):\n        if not root: return 0\n        q, depth = deque([root]), 0\n        while q:\n            for _ in range(len(q)):\n                n = q.popleft()\n                if n.left: q.append(n.left)\n                if n.right: q.append(n.right)\n            depth += 1\n        return depth\n",
        "java": "import java.util.*;\nclass Solution  {\n    public int maxDepth(TreeNode root) {\n        if(root==null)return 0;\n        Deque<TreeNode>q=new ArrayDeque<>();\n        q.add(root);\n        int depth=0;\n        while(!q.isEmpty()) {\n            int size=q.size();\n            while(size-->0) {\n                TreeNode n=q.remove();\n                if(n.left!=null)q.add(n.left);\n                if(n.right!=null)q.add(n.right);\n            }\n            depth++;\n        }\n        return depth;\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "queue=[5]",
              "depth=0"
            ],
            "note": {
              "zh": "根作为第 1 层待处理。",
              "en": "Root waits as the first layer."
            }
          },
          {
            "cells": [
              "queue=[2,8]",
              "depth=1"
            ],
            "note": {
              "zh": "第一轮结束，只留下第 2 层。",
              "en": "After one round only layer two remains."
            }
          },
          {
            "cells": [
              "queue=[1]",
              "depth=2"
            ],
            "note": {
              "zh": "处理 2 与 8 后进入第 3 层。",
              "en": "Processing 2 and 8 produces layer three."
            }
          },
          {
            "cells": [
              "queue=[]",
              "depth=3"
            ],
            "note": {
              "zh": "第三轮后队列为空。",
              "en": "The queue is empty after round three."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/maximum-depth-of-binary-tree/description/"
      }
    ],
    "slug": "maximum-depth-of-binary-tree",
    "title": {
      "zh": "二叉树的最大深度",
      "en": "Maximum Depth of Binary Tree"
    },
    "category": {
      "zh": "二叉树",
      "en": "Binary Trees"
    },
    "level": {
      "zh": "简单",
      "en": "Easy"
    }
  },
  {
    "id": 226,
    "statement": {
      "zh": "把二叉树左右镜像翻转：每个节点的左右子树都交换位置，并对子树执行同样处理，返回翻转后的根。",
      "en": "Mirror a binary tree by exchanging the left and right subtrees of every node, and return the resulting root."
    },
    "constraints": {
      "zh": [
        "0 ≤ n ≤ 100；节点值范围 [-100,100]"
      ],
      "en": [
        "0 ≤ n ≤ 100; node values in [-100,100]"
      ]
    },
    "example": {
      "zh": "root=[5,2,8,1,3] → [5,8,2,null,null,3,1]",
      "en": "root=[5,2,8,1,3] → [5,8,2,null,null,3,1]"
    },
    "methods": [
      {
        "key": "recursive",
        "name": {
          "zh": "递归交换",
          "en": "Recursive swap"
        },
        "intuition": {
          "zh": "镜像不是只交换根的两个孩子，而是每个节点都交换。先递归得到左右子树的镜像，再把它们交叉放回根上，得到整树镜像。",
          "en": "Swapping only the root’s children is insufficient. Recursively mirror both subtrees, then attach their results to the opposite sides of the root."
        },
        "steps": {
          "zh": [
            "空节点返回空",
            "保存原左子树翻转后的根",
            "右子树镜像接到左侧，保存的左子树镜像接到右侧"
          ],
          "en": [
            "Return null for a null node",
            "Save the mirrored original left subtree",
            "Attach the mirrored right subtree on the left and the saved subtree on the right"
          ]
        },
        "correctness": {
          "zh": "左右子树内部已镜像，再交换它们相对于根的位置，恰好反转所有节点的左右路径。",
          "en": "Mirroring within each subtree and then exchanging their positions reverses every left/right path from the root."
        },
        "time": "O(n)",
        "space": "O(h)",
        "complexity": {
          "zh": "每节点交换一次；栈高度为 h，不新建树节点。",
          "en": "Every node is swapped once. The call stack uses h frames; no new tree nodes are allocated."
        },
        "python": "class Solution:\n    def invertTree(self, root):\n        if root is None: return None\n        left = self.invertTree(root.left)\n        root.left = self.invertTree(root.right)\n        root.right = left\n        return root\n",
        "java": "import java.util.*;\nclass Solution  {\n    public TreeNode invertTree(TreeNode root) {\n        if(root==null)return null;\n        TreeNode left=invertTree(root.left);\n        root.left=invertTree(root.right);\n        root.right=left;\n        return root;\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "2:(1,3) → 2:(3,1)"
            ],
            "note": {
              "zh": "先完成左子树镜像。",
              "en": "Mirror the left subtree first."
            }
          },
          {
            "cells": [
              "8:(null,null)"
            ],
            "note": {
              "zh": "右叶镜像不变。",
              "en": "The right leaf is unchanged."
            }
          },
          {
            "cells": [
              "5:(8,2)",
              "2:(3,1)"
            ],
            "note": {
              "zh": "根的左右镜像交叉接回。",
              "en": "Attach mirrored subtrees to opposite sides of 5."
            }
          }
        ]
      },
      {
        "key": "queue",
        "name": {
          "zh": "队列逐个交换",
          "en": "Queue-driven swaps"
        },
        "intuition": {
          "zh": "每个节点交换一次即可，不依赖后序结果。因此用队列保存还未处理的节点，交换当前孩子后把非空孩子入队，避免递归。",
          "en": "A node’s swap does not depend on a returned child value, so any complete traversal works. A queue tracks pending nodes and avoids recursion."
        },
        "steps": {
          "zh": [
            "根非空才入队",
            "出队后交换左右指针",
            "把交换后的非空孩子入队，直到队列空"
          ],
          "en": [
            "Enqueue a nonnull root",
            "Remove a node and swap its child pointers",
            "Enqueue its nonnull children and continue"
          ]
        },
        "correctness": {
          "zh": "遍历覆盖每个节点一次，并在每个节点反转左右边；全部局部交换合成整树镜像。",
          "en": "The traversal reaches every node once and reverses its two outgoing sides, producing the full mirror."
        },
        "time": "O(n)",
        "space": "O(w)",
        "complexity": {
          "zh": "每节点一次出队与交换；队列 O(w)。修改原树，无输出树额外分配。",
          "en": "One dequeue and swap per node gives linear time; the queue uses O(w). The original tree is modified."
        },
        "python": "from collections import deque\nclass Solution:\n    def invertTree(self, root):\n        q = deque([root]) if root else deque()\n        while q:\n            n = q.popleft()\n            n.left, n.right = n.right, n.left\n            if n.left: q.append(n.left)\n            if n.right: q.append(n.right)\n        return root\n",
        "java": "import java.util.*;\nclass Solution  {\n    public TreeNode invertTree(TreeNode root) {\n        Deque<TreeNode>q=new ArrayDeque<>();\n        if(root!=null)q.add(root);\n        while(!q.isEmpty()) {\n            TreeNode n=q.remove(),t=n.left;\n            n.left=n.right;\n            n.right=t;\n            if(n.left!=null)q.add(n.left);\n            if(n.right!=null)q.add(n.right);\n        }\n        return root;\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "5:(8,2)",
              "queue=[8,2]"
            ],
            "note": {
              "zh": "在根交换并把孩子入队。",
              "en": "Swap at the root and enqueue its children."
            }
          },
          {
            "cells": [
              "2:(3,1)",
              "queue=[3,1]"
            ],
            "note": {
              "zh": "处理 8 后，在 2 处再交换。",
              "en": "After 8, swap children at 2."
            }
          },
          {
            "cells": [
              "root=[5,8,2,null,null,3,1]"
            ],
            "note": {
              "zh": "叶子处理完成，所有节点都交换过。",
              "en": "After visiting leaves, all nodes have been swapped."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/invert-binary-tree/description/"
      }
    ],
    "slug": "invert-binary-tree",
    "title": {
      "zh": "翻转二叉树",
      "en": "Invert Binary Tree"
    },
    "category": {
      "zh": "二叉树",
      "en": "Binary Trees"
    },
    "level": {
      "zh": "简单",
      "en": "Easy"
    }
  },
  {
    "id": 101,
    "statement": {
      "zh": "判断二叉树是否关于根的中心轴对称。镜像位置不仅值要相同，空节点的位置也必须对应。",
      "en": "Determine whether a tree mirrors itself around its root. Values and missing-child positions must both match across the mirror."
    },
    "constraints": {
      "zh": [
        "1 ≤ n ≤ 1000；节点值范围 [-100,100]"
      ],
      "en": [
        "1 ≤ n ≤ 1000; node values in [-100,100]"
      ]
    },
    "example": {
      "zh": "root=[4,2,2,1,3,3,1] → true",
      "en": "root=[4,2,2,1,3,3,1] → true"
    },
    "methods": [
      {
        "key": "recursive",
        "name": {
          "zh": "递归比较镜像节点",
          "en": "Recursive mirror pairs"
        },
        "intuition": {
          "zh": "不是比较左树与右树完全相同，而是交叉比较：左树的左孩子对应右树的右孩子。两个空节点匹配；只有一个为空立即失败；其余先比值再继续。",
          "en": "Compare opposite directions, not identical directions: the left tree’s left child matches the right tree’s right child. Two nulls match, one null fails, and nonnull nodes must have equal values."
        },
        "steps": {
          "zh": [
            "以 root.left 和 root.right 为一对",
            "检查空值与节点值",
            "递归比较外侧对和内侧对，两对都成功才成功"
          ],
          "en": [
            "Start with root.left and root.right",
            "Check null positions and values",
            "Recursively validate outer and inner pairs"
          ]
        },
        "correctness": {
          "zh": "镜像定义可分解为根值相同、外侧镜像、内侧镜像。这三个条件既必要又充分。",
          "en": "Mirror symmetry decomposes exactly into equal root values plus mirrored outer and inner child pairs. These conditions are necessary and sufficient."
        },
        "time": "O(n)",
        "space": "O(h)",
        "complexity": {
          "zh": "每个镜像对检查一次，递归深度不超过树高。",
          "en": "Each mirror pair is checked once and recursion depth is bounded by tree height."
        },
        "python": "import sys\nclass Solution:\n    def isSymmetric(self, root):\n        sys.setrecursionlimit(max(sys.getrecursionlimit(), 5000))\n        def mirror(a,b):\n            if a is None or b is None: return a is b\n            return a.val == b.val and mirror(a.left,b.right) and mirror(a.right,b.left)\n        return root is None or mirror(root.left,root.right)\n",
        "java": "import java.util.*;\nclass Solution  {\n    public boolean isSymmetric(TreeNode root) {\n        return root==null||mirror(root.left,root.right);\n    }\n    private boolean mirror(TreeNode a,TreeNode b) {\n        if(a==null||b==null)return a==b;\n        return a.val==b.val&&mirror(a.left,b.right)&&mirror(a.right,b.left);\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "pair=(2L,2R)",
              "2=2"
            ],
            "note": {
              "zh": "根的两棵子树先比较值。",
              "en": "Compare the two child-root values."
            }
          },
          {
            "cells": [
              "outer=(1L,1R)",
              "inner=(3L,3R)"
            ],
            "note": {
              "zh": "递归交叉配对。",
              "en": "Recurse on crossing mirror pairs."
            }
          },
          {
            "cells": [
              "null ↔ null",
              "result=true"
            ],
            "note": {
              "zh": "叶子的空孩子也都对称。",
              "en": "Leaf null-child positions also match."
            }
          }
        ]
      },
      {
        "key": "queue",
        "name": {
          "zh": "队列保存镜像对",
          "en": "Queue of mirror pairs"
        },
        "intuition": {
          "zh": "队列元素是“一对需要互为镜像的节点”，不是单个节点。必须保留空位置，不能只比较每层非空值，否则会把形状不同的树误判为对称。",
          "en": "Each queue item is a pair expected to mirror one another. Preserve null positions; comparing only nonnull values of a layer can falsely accept different shapes."
        },
        "steps": {
          "zh": [
            "把根的两个孩子作为一对入队",
            "两个都空跳过；单空或值不同返回 false",
            "加入外侧与内侧两对，队列耗尽返回 true"
          ],
          "en": [
            "Enqueue the root’s two children as a pair",
            "Skip two nulls; reject one null or unequal values",
            "Enqueue outer and inner pairs; accept when exhausted"
          ]
        },
        "correctness": {
          "zh": "队列中的每一对都是镜像条件中尚未验证的子问题，只有全部通过才能返回真。",
          "en": "The queue contains precisely the unverified mirror subproblems, so exhausting it without rejection establishes symmetry."
        },
        "time": "O(n)",
        "space": "O(w)",
        "complexity": {
          "zh": "总共 O(n) 对，队列宽度为 O(w)。Java 用二元素数组包装 null，避免 ArrayDeque 直接存 null。",
          "en": "There are O(n) pairs and O(w) queued pairs. Java wraps nullable nodes in arrays because ArrayDeque rejects null elements."
        },
        "python": "from collections import deque\nclass Solution:\n    def isSymmetric(self, root):\n        if root is None: return True\n        q = deque([(root.left,root.right)])\n        while q:\n            a,b = q.popleft()\n            if a is None and b is None: continue\n            if a is None or b is None or a.val != b.val: return False\n            q.append((a.left,b.right)); q.append((a.right,b.left))\n        return True\n",
        "java": "import java.util.*;\nclass Solution  {\n    public boolean isSymmetric(TreeNode root) {\n        if(root==null)return true;\n        Deque<TreeNode[]>q=new ArrayDeque<>();\n        q.add(new TreeNode[] {\n            root.left,root.right\n        }\n        );\n        while(!q.isEmpty()) {\n            TreeNode[]p=q.remove();\n            TreeNode a=p[0],b=p[1];\n            if(a==null&&b==null)continue;\n            if(a==null||b==null||a.val!=b.val)return false;\n            q.add(new TreeNode[] {\n                a.left,b.right\n            }\n            );\n            q.add(new TreeNode[] {\n                a.right,b.left\n            }\n            );\n        }\n        return true;\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "queue=[(2L,2R)]"
            ],
            "note": {
              "zh": "队列装节点对。",
              "en": "Queue pairs of nodes."
            }
          },
          {
            "cells": [
              "queue=[(1L,1R),(3L,3R)]"
            ],
            "note": {
              "zh": "检查第一对后加入外侧和内侧。",
              "en": "After the first pair, enqueue outer and inner pairs."
            }
          },
          {
            "cells": [
              "all pairs matched",
              "result=true"
            ],
            "note": {
              "zh": "值和空位置都匹配。",
              "en": "Both values and null positions match."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/symmetric-tree/description/"
      }
    ],
    "slug": "symmetric-tree",
    "title": {
      "zh": "对称二叉树",
      "en": "Symmetric Tree"
    },
    "category": {
      "zh": "二叉树",
      "en": "Binary Trees"
    },
    "level": {
      "zh": "简单",
      "en": "Easy"
    }
  },
  {
    "id": 543,
    "statement": {
      "zh": "返回树中任意两节点之间最长简单路径的边数。路径可以不经过根；单节点树的答案是 0。",
      "en": "Return the largest number of edges on a simple path between any two tree nodes. The path need not include the root; a single node gives 0."
    },
    "constraints": {
      "zh": [
        "1 ≤ n ≤ 10⁴；节点值范围 [-100,100]"
      ],
      "en": [
        "1 ≤ n ≤ 10⁴; node values in [-100,100]"
      ]
    },
    "example": {
      "zh": "root=[5,2,8,1,3] → 3；例如 1→2→5→8。",
      "en": "root=[5,2,8,1,3] → 3, for example 1→2→5→8."
    },
    "methods": [
      {
        "key": "recompute",
        "name": {
          "zh": "枚举转折点并重算高度",
          "en": "Recompute heights at every pivot"
        },
        "intuition": {
          "zh": "任意路径都有一个离根最近的节点，称为转折点。固定转折点时，最长路径向左和向右分别延伸到最深叶，长度是左右高度之和。最直接的方法对每个节点重新计算这两个高度。",
          "en": "Every path has a highest node, its pivot. At a fixed pivot, extend toward a deepest leaf in each child subtree; the edge count equals the two child heights. The baseline recomputes these heights for every pivot."
        },
        "steps": {
          "zh": [
            "用 depth 求一棵子树的节点高度",
            "遍历每个节点，以 depth(left)+depth(right) 更新答案",
            "递归检查左右所有转折点"
          ],
          "en": [
            "Compute subtree node height with depth",
            "For each node, consider depth(left)+depth(right)",
            "Inspect pivots in both subtrees"
          ]
        },
        "correctness": {
          "zh": "枚举所有可能最高节点，每个节点的候选又是通过它的最长路径，因此最大候选就是直径。",
          "en": "All possible highest nodes are considered, and each contributes its longest crossing path, so their maximum is the diameter."
        },
        "time": "O(n²) worst case",
        "space": "O(h)",
        "complexity": {
          "zh": "链状树中高度计算重复扫描 n+(n-1)+… 个节点。遍历栈与高度栈合计仍不超过 O(h)，不是 O(nh) 空间。 实际递归受 Python 递归深度和 Java 线程栈限制；提高 Python 深度不会消除内存开销，极深输入优先用显式栈。 这是便于对比的基准解法，大规模最坏输入可能超时。",
          "en": "On a chain, height computations revisit n+(n-1)+… nodes. Concurrent traversal and height frames remain O(h), not O(nh) space. Actual recursion is limited by Python recursion depth and the Java thread stack; raising Python’s limit does not remove memory costs. Prefer an explicit stack for extreme depth. This comparison baseline may time out on large worst-case inputs."
        },
        "python": "import sys\nclass Solution:\n    def diameterOfBinaryTree(self, root):\n        sys.setrecursionlimit(max(sys.getrecursionlimit(), 30000))\n        def depth(n):\n            return 0 if n is None else 1+max(depth(n.left),depth(n.right))\n        def solve(n):\n            if n is None: return 0\n            return max(depth(n.left)+depth(n.right),solve(n.left),solve(n.right))\n        return solve(root)\n",
        "java": "import java.util.*;\nclass Solution  {\n    private int depth(TreeNode n) {\n        return n==null?0:1+Math.max(depth(n.left),depth(n.right));\n    }\n    public int diameterOfBinaryTree(TreeNode n) {\n        return n==null?0:Math.max(depth(n.left)+depth(n.right),Math.max(diameterOfBinaryTree(n.left),diameterOfBinaryTree(n.right)));\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "pivot=5",
              "depth(2)=2",
              "depth(8)=1",
              "candidate=3"
            ],
            "note": {
              "zh": "从根重新求两侧高度，候选 3 条边。",
              "en": "Recompute child heights at root: candidate 3 edges."
            }
          },
          {
            "cells": [
              "pivot=2",
              "depth(1)=1",
              "depth(3)=1",
              "candidate=2"
            ],
            "note": {
              "zh": "到节点 2 时又计算它的孩子高度。",
              "en": "At node 2, recompute its child heights."
            }
          },
          {
            "cells": [
              "leaf candidate=0",
              "answer=3"
            ],
            "note": {
              "zh": "比较所有转折点得到 3。",
              "en": "The maximum across pivots is 3."
            }
          }
        ]
      },
      {
        "key": "postorder",
        "name": {
          "zh": "后序一次计算",
          "en": "One-pass postorder"
        },
        "intuition": {
          "zh": "重复来自子树高度被多个祖先索取。让递归在返回高度的同时更新直径，每棵子树高度只算一次。返回的是单支高度，更新答案则允许左右两支连接，二者不要混用。",
          "en": "Repeated work comes from ancestors recomputing heights. Return height once while updating the best diameter. The return value extends one branch; the candidate diameter may combine two branches."
        },
        "steps": {
          "zh": [
            "空节点高度 0",
            "后序取得 L 和 R，用 L+R 更新全局答案",
            "向父节点返回 1+max(L,R)"
          ],
          "en": [
            "Null height is 0",
            "Obtain L and R, then update the best with L+R",
            "Return 1+max(L,R) to the parent"
          ]
        },
        "correctness": {
          "zh": "孩子高度由归纳正确；L+R 是经过当前节点的最优边数。所有节点都更新一次，覆盖直径的最高节点。",
          "en": "Correct child heights give the longest crossing path L+R at each node. Visiting every node includes the highest node of the actual diameter."
        },
        "time": "O(n)",
        "space": "O(h)",
        "complexity": {
          "zh": "每节点计算两个整数和一次最大值，访问一次。只保留递归路径。 实际递归受 Python 递归深度和 Java 线程栈限制；提高 Python 深度不会消除内存开销，极深输入优先用显式栈。",
          "en": "Each node is visited once and performs constant arithmetic. Only the recursive path is retained. Actual recursion is limited by Python recursion depth and the Java thread stack; raising Python’s limit does not remove memory costs. Prefer an explicit stack for extreme depth."
        },
        "python": "import sys\nclass Solution:\n    def diameterOfBinaryTree(self, root):\n        sys.setrecursionlimit(max(sys.getrecursionlimit(), 30000))\n        answer = 0\n        def depth(n):\n            nonlocal answer\n            if n is None: return 0\n            l,r = depth(n.left),depth(n.right)\n            answer = max(answer,l+r)\n            return 1+max(l,r)\n        depth(root)\n        return answer\n",
        "java": "import java.util.*;\nclass Solution  {\n    private int answer;\n    public int diameterOfBinaryTree(TreeNode root) {\n        answer=0;\n        depth(root);\n        return answer;\n    }\n    private int depth(TreeNode n) {\n        if(n==null)return 0;\n        int l=depth(n.left),r=depth(n.right);\n        answer=Math.max(answer,l+r);\n        return 1+Math.max(l,r);\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "depth(1)=1",
              "depth(3)=1"
            ],
            "note": {
              "zh": "叶子各算一次。",
              "en": "Compute each leaf once."
            }
          },
          {
            "cells": [
              "node=2",
              "height=2",
              "answer=2"
            ],
            "note": {
              "zh": "高度返回 2，经过 2 的路径也是 2 条边。",
              "en": "Return height 2; the crossing path has 2 edges."
            }
          },
          {
            "cells": [
              "node=5",
              "L=2",
              "R=1",
              "answer=3"
            ],
            "note": {
              "zh": "根用已有高度更新为 3。",
              "en": "Use returned child heights to update the root candidate to 3."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/diameter-of-binary-tree/description/"
      }
    ],
    "slug": "diameter-of-binary-tree",
    "title": {
      "zh": "二叉树的直径",
      "en": "Diameter of Binary Tree"
    },
    "category": {
      "zh": "二叉树",
      "en": "Binary Trees"
    },
    "level": {
      "zh": "简单",
      "en": "Easy"
    }
  },
  {
    "id": 102,
    "statement": {
      "zh": "从上到下逐层返回节点值，每一层内部按从左到右排列。结果是二维数组；空树返回空数组。",
      "en": "Return a list of layers from top to bottom, with values ordered left to right within each layer. Return an empty list for an empty tree."
    },
    "constraints": {
      "zh": [
        "0 ≤ n ≤ 2000；节点值范围 [-1000,1000]"
      ],
      "en": [
        "0 ≤ n ≤ 2000; node values in [-1000,1000]"
      ]
    },
    "example": {
      "zh": "root=[5,2,8,1,3] → [[5],[2,8],[1,3]]",
      "en": "root=[5,2,8,1,3] → [[5],[2,8],[1,3]]"
    },
    "methods": [
      {
        "key": "queue",
        "name": {
          "zh": "队列按层切分",
          "en": "Queue with layer boundaries"
        },
        "intuition": {
          "zh": "队列天然先处理较浅节点，但还需要知道每层何时结束。每轮固定 size，处理恰好 size 个节点，下一层孩子虽然已经入队，也不能在本轮继续处理。",
          "en": "A FIFO queue naturally visits shallow nodes first, but layer boundaries need an explicit size snapshot. Process exactly that many nodes even as their children enter the queue."
        },
        "steps": {
          "zh": [
            "根入队；每轮创建新的层数组",
            "固定队列长度，取出这些节点并记录值",
            "按左、右顺序入队孩子，追加整层结果"
          ],
          "en": [
            "Enqueue the root and create a fresh layer each round",
            "Freeze queue length and record exactly those nodes",
            "Enqueue left then right children and append the completed layer"
          ]
        },
        "correctness": {
          "zh": "队列按父节点从左到右的顺序接收左、右孩子，因此下一层也从左到右；固定长度保持层间分隔。",
          "en": "Enqueuing left then right children of left-to-right parents preserves the next layer’s order; a fixed size keeps layers separate."
        },
        "time": "O(n)",
        "space": "O(w) auxiliary + O(n) output",
        "complexity": {
          "zh": "每节点只进出队一次。结果必须保存所有节点值，不能把输出空间遗漏。",
          "en": "Each node is enqueued and dequeued once. The returned values require O(n) space in addition to the queue."
        },
        "python": "from collections import deque\nclass Solution:\n    def levelOrder(self, root):\n        q = deque([root]) if root else deque()\n        result = []\n        while q:\n            row = []\n            for _ in range(len(q)):\n                n=q.popleft(); row.append(n.val)\n                if n.left:q.append(n.left)\n                if n.right:q.append(n.right)\n            result.append(row)\n        return result\n",
        "java": "import java.util.*;\nclass Solution  {\n    public List<List<Integer>> levelOrder(TreeNode root) {\n        List<List<Integer>>a=new ArrayList<>();\n        Deque<TreeNode>q=new ArrayDeque<>();\n        if(root!=null)q.add(root);\n        while(!q.isEmpty()) {\n            int size=q.size();\n            List<Integer>row=new ArrayList<>();\n            while(size-->0) {\n                TreeNode n=q.remove();\n                row.add(n.val);\n                if(n.left!=null)q.add(n.left);\n                if(n.right!=null)q.add(n.right);\n            }\n            a.add(row);\n        }\n        return a;\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "queue=[5]",
              "result=[[5]]"
            ],
            "note": {
              "zh": "记录第一层。",
              "en": "Record layer one."
            }
          },
          {
            "cells": [
              "queue=[2,8]",
              "result=[[5],[2,8]]"
            ],
            "note": {
              "zh": "冻结长度 2，整层出队。",
              "en": "Freeze size 2 and process the whole layer."
            }
          },
          {
            "cells": [
              "queue=[1,3]",
              "result=[[5],[2,8],[1,3]]"
            ],
            "note": {
              "zh": "第三层仍保持左到右。",
              "en": "Layer three remains left-to-right."
            }
          }
        ]
      },
      {
        "key": "depth-buckets",
        "name": {
          "zh": "DFS 按深度装入桶",
          "en": "DFS into depth buckets"
        },
        "intuition": {
          "zh": "不必按层执行，按层存放就行。DFS 带上当前深度，把值放进 result[depth]。必须先走左再走右，才能让同深度值的追加顺序从左到右。",
          "en": "Traversal itself need not be level-by-level if storage is grouped by depth. DFS appends into result[depth], visiting left before right to preserve horizontal order."
        },
        "steps": {
          "zh": [
            "DFS 参数为节点和深度，根深度 0",
            "第一次遇到某深度时创建层数组",
            "追加节点值，再访问左和右孩子，深度加 1"
          ],
          "en": [
            "Carry node and depth, starting at depth 0",
            "Create a bucket when a depth is first reached",
            "Append the value, then visit left and right at depth+1"
          ]
        },
        "correctness": {
          "zh": "每个节点被放入自己的准确深度；左优先 DFS 对同层节点的相对顺序与从左到右一致。",
          "en": "Each node enters its correct depth bucket, and left-first DFS encounters nodes of any fixed depth in left-to-right order."
        },
        "time": "O(n)",
        "space": "O(h) auxiliary + O(n) output",
        "complexity": {
          "zh": "每节点追加一次；递归栈 O(h)，输出 O(n)。Python 提高递归深度以覆盖链形输入。 实际递归受 Python 递归深度和 Java 线程栈限制；提高 Python 深度不会消除内存开销，极深输入优先用显式栈。",
          "en": "One append per node; the stack uses O(h) and output O(n). Python raises its recursion limit for chain-shaped inputs. Actual recursion is limited by Python recursion depth and the Java thread stack; raising Python’s limit does not remove memory costs. Prefer an explicit stack for extreme depth."
        },
        "python": "import sys\nclass Solution:\n    def levelOrder(self, root):\n        sys.setrecursionlimit(max(sys.getrecursionlimit(),6000))\n        result=[]\n        def visit(n,d):\n            if n is None:return\n            if d==len(result):result.append([])\n            result[d].append(n.val)\n            visit(n.left,d+1);visit(n.right,d+1)\n        visit(root,0)\n        return result\n",
        "java": "import java.util.*;\nclass Solution  {\n    public List<List<Integer>> levelOrder(TreeNode root) {\n        List<List<Integer>>a=new ArrayList<>();\n        visit(root,0,a);\n        return a;\n    }\n    private void visit(TreeNode n,int d,List<List<Integer>>a) {\n        if(n==null)return;\n        if(d==a.size())a.add(new ArrayList<>());\n        a.get(d).add(n.val);\n        visit(n.left,d+1,a);\n        visit(n.right,d+1,a);\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "visit(5,0)",
              "result=[[5]]"
            ],
            "note": {
              "zh": "深度 0 新建桶。",
              "en": "Create bucket 0."
            }
          },
          {
            "cells": [
              "visit(2,1),visit(1,2),visit(3,2)",
              "result=[[5],[2],[1,3]]"
            ],
            "note": {
              "zh": "先走左树，按深度追加。",
              "en": "Traverse left first and append by depth."
            }
          },
          {
            "cells": [
              "visit(8,1)",
              "result=[[5],[2,8],[1,3]]"
            ],
            "note": {
              "zh": "8 虽晚访问，仍放进深度 1 的桶。",
              "en": "Although visited later, 8 goes into depth bucket 1."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/binary-tree-level-order-traversal/description/"
      }
    ],
    "slug": "binary-tree-level-order-traversal",
    "title": {
      "zh": "二叉树的层序遍历",
      "en": "Binary Tree Level Order Traversal"
    },
    "category": {
      "zh": "二叉树",
      "en": "Binary Trees"
    },
    "level": {
      "zh": "中等",
      "en": "Medium"
    }
  },
  {
    "id": 108,
    "statement": {
      "zh": "将严格递增的整数数组构造成高度平衡的二叉搜索树并返回根。每个节点的左右子树高度差都不能超过 1；合法答案可能有多个。",
      "en": "Build a height-balanced binary search tree from a strictly increasing array. Every node must have child-subtree heights differing by at most 1. Multiple valid answers may exist."
    },
    "constraints": {
      "zh": [
        "1 ≤ n ≤ 10⁴；-10⁴ ≤ nums[i] ≤ 10⁴",
        "数组严格递增，无重复值"
      ],
      "en": [
        "1 ≤ n ≤ 10⁴; -10⁴ ≤ nums[i] ≤ 10⁴",
        "Values are strictly increasing and distinct"
      ]
    },
    "example": {
      "zh": "nums=[-4,-1,2,7,9] → [2,-4,7,null,-1,null,9]，这是一个合法答案。",
      "en": "nums=[-4,-1,2,7,9] → [2,-4,7,null,-1,null,9], one valid answer."
    },
    "methods": [
      {
        "key": "midpoint",
        "name": {
          "zh": "中点分治建树",
          "en": "Midpoint divide and conquer"
        },
        "intuition": {
          "zh": "有序数组中任意位置都能作为 BST 的根，但选两端会退化成链。每次选区间中点，使两边数量最多相差一，再对子区间重复。偶数长度选左中点或右中点均可。",
          "en": "Any array position could be a BST root, but endpoints would create a chain. Repeatedly choose the midpoint so child ranges differ in size by at most one. Either middle element works for even lengths."
        },
        "steps": {
          "zh": [
            "用闭区间 [lo,hi] 描述子问题，lo>hi 返回空",
            "选 mid，建立值为 nums[mid] 的节点",
            "分别递归 [lo,mid-1] 和 [mid+1,hi] 作为左右孩子"
          ],
          "en": [
            "Represent a subproblem by inclusive indices [lo,hi]; return null when empty",
            "Create a node for the midpoint value",
            "Build the left and right child ranges recursively"
          ]
        },
        "correctness": {
          "zh": "左区间所有值更小，右区间所有值更大，故满足 BST。均匀二分令各子树高度最多差一，且递归保持此性质。",
          "en": "All left-range values are smaller and all right-range values larger. Repeated balanced splits produce child heights differing by at most one at every node."
        },
        "time": "O(n)",
        "space": "O(log n) auxiliary + O(n) output",
        "complexity": {
          "zh": "每个值建一个节点；传索引而非切片，避免复制数组。二分栈高 O(log n)，新树 O(n)。",
          "en": "Each value creates one node. Index ranges avoid slice copying; recursion depth is O(log n), while the new tree needs O(n)."
        },
        "python": "class Solution:\n    def sortedArrayToBST(self, nums):\n        def build(lo,hi):\n            if lo>hi:return None\n            mid=(lo+hi)//2\n            n=TreeNode(nums[mid])\n            n.left=build(lo,mid-1);n.right=build(mid+1,hi)\n            return n\n        return build(0,len(nums)-1)\n",
        "java": "import java.util.*;\nclass Solution  {\n    public TreeNode sortedArrayToBST(int[] nums) {\n        return build(nums,0,nums.length-1);\n    }\n    private TreeNode build(int[]a,int lo,int hi) {\n        if(lo>hi)return null;\n        int mid=lo+(hi-lo)/2;\n        TreeNode n=new TreeNode(a[mid]);\n        n.left=build(a,lo,mid-1);\n        n.right=build(a,mid+1,hi);\n        return n;\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "range=[0,4]",
              "mid=2",
              "root=2"
            ],
            "note": {
              "zh": "选整个数组中点 2 为根。",
              "en": "Choose midpoint value 2 as root."
            }
          },
          {
            "cells": [
              "left=[-4,-1]",
              "right=[7,9]"
            ],
            "note": {
              "zh": "划分成两个长度 2 的区间。",
              "en": "Split into two ranges of length 2."
            }
          },
          {
            "cells": [
              "-4.right=-1",
              "7.right=9",
              "root=[2,-4,7,null,-1,null,9]"
            ],
            "note": {
              "zh": "子区间继续选左中点，得到高度平衡树。",
              "en": "Choose lower midpoints recursively to obtain a balanced tree."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/description/"
      }
    ],
    "slug": "convert-sorted-array-to-binary-search-tree",
    "title": {
      "zh": "将有序数组转换为二叉搜索树",
      "en": "Convert Sorted Array to Binary Search Tree"
    },
    "category": {
      "zh": "二叉树",
      "en": "Binary Trees"
    },
    "level": {
      "zh": "简单",
      "en": "Easy"
    }
  },
  {
    "id": 98,
    "statement": {
      "zh": "判断整棵树是否是严格二叉搜索树：每个节点的左子树所有值都小于它，右子树所有值都大于它，且两侧也必须满足同样规则。重复值不合法。",
      "en": "Check the strict BST property throughout the tree: every value in a node’s left subtree must be smaller, every value in its right subtree larger, and both subtrees must obey the same rule. Duplicate values are invalid."
    },
    "constraints": {
      "zh": [
        "1 ≤ n ≤ 10⁴；节点值范围 [-2³¹,2³¹-1]"
      ],
      "en": [
        "1 ≤ n ≤ 10⁴; node values in [-2³¹,2³¹-1]"
      ]
    },
    "example": {
      "zh": "root=[8,4,10,null,null,6,12] → false；6 在 8 的右子树却小于 8。",
      "en": "root=[8,4,10,null,null,6,12] → false: 6 is in 8’s right subtree but is smaller than 8."
    },
    "methods": [
      {
        "key": "bounds",
        "name": {
          "zh": "传递开区间边界",
          "en": "Propagate open bounds"
        },
        "intuition": {
          "zh": "只比较父子会漏掉祖先限制，例如右子树中的 6 虽小于父亲 10，却也必须大于根 8。给每个子问题携带可接受的开区间，并在下行时收紧一边。",
          "en": "Parent-child comparisons miss ancestor restrictions: 6 may be below 10 yet still violate root 8’s lower bound. Carry an open interval into every subtree and tighten one endpoint on descent."
        },
        "steps": {
          "zh": [
            "初始范围为负无穷到正无穷",
            "当前值不严格落在范围内则失败",
            "左孩子上界改为当前值，右孩子下界改为当前值"
          ],
          "en": [
            "Start with unbounded limits",
            "Reject values outside the strict open interval",
            "Set the left upper bound and right lower bound to the current value"
          ]
        },
        "correctness": {
          "zh": "范围包含所有祖先施加的限制，逐层收紧且不丢失旧限制。所有节点通过等价于整树的严格 BST 条件。",
          "en": "The interval contains every ancestor restriction. Tightening it preserves old restrictions, so all nodes passing is equivalent to the strict BST property."
        },
        "time": "O(n)",
        "space": "O(h)",
        "complexity": {
          "zh": "每节点一次检查。Java 边界用 long，避免 Integer.MIN_VALUE/MAX_VALUE 被错误排除。 实际递归受 Python 递归深度和 Java 线程栈限制；提高 Python 深度不会消除内存开销，极深输入优先用显式栈。",
          "en": "One check per node. Java uses long bounds so valid extreme int values are not accidentally excluded. Actual recursion is limited by Python recursion depth and the Java thread stack; raising Python’s limit does not remove memory costs. Prefer an explicit stack for extreme depth."
        },
        "python": "import sys\nclass Solution:\n    def isValidBST(self, root):\n        sys.setrecursionlimit(max(sys.getrecursionlimit(),30000))\n        def valid(n,lo,hi):\n            if n is None:return True\n            return lo<n.val<hi and valid(n.left,lo,n.val) and valid(n.right,n.val,hi)\n        return valid(root,float('-inf'),float('inf'))\n",
        "java": "import java.util.*;\nclass Solution  {\n    public boolean isValidBST(TreeNode root) {\n        return valid(root,Long.MIN_VALUE,Long.MAX_VALUE);\n    }\n    private boolean valid(TreeNode n,long lo,long hi) {\n        return n==null||(lo<n.val&&n.val<hi&&valid(n.left,lo,n.val)&&valid(n.right,n.val,hi));\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "node=8",
              "range=(-∞,+∞)"
            ],
            "note": {
              "zh": "根接受无界范围。",
              "en": "Root accepts the unbounded range."
            }
          },
          {
            "cells": [
              "node=10",
              "range=(8,+∞)"
            ],
            "note": {
              "zh": "右子树继承下界 8。",
              "en": "The right subtree inherits lower bound 8."
            }
          },
          {
            "cells": [
              "node=6",
              "range=(8,10)",
              "result=false"
            ],
            "note": {
              "zh": "6 不在开区间内，立即失败。",
              "en": "6 lies outside its allowed open interval."
            }
          }
        ]
      },
      {
        "key": "inorder",
        "name": {
          "zh": "中序严格递增检查",
          "en": "Strictly increasing inorder"
        },
        "intuition": {
          "zh": "BST 的中序一定严格递增；反过来，若中序严格递增，则任一根前面的整个左子树都更小，后面的整个右子树都更大。只需保存上一个输出值，不必存完整数组。",
          "en": "A BST has strictly increasing inorder values. Conversely, a strictly increasing inorder sequence makes each entire left subtree smaller and each right subtree larger. Keep only the previous value."
        },
        "steps": {
          "zh": [
            "用显式栈执行中序",
            "每次弹出节点，若值 ≤ 上一个值则失败",
            "更新 previous，继续右子树，遍历完返回 true"
          ],
          "en": [
            "Perform iterative inorder traversal",
            "Reject an emitted value ≤ the previous one",
            "Update previous, continue right, and accept after completion"
          ]
        },
        "correctness": {
          "zh": "中序严格递增是严格 BST 的充要条件；相邻元素比较即可验证整个序列递增。",
          "en": "Strictly increasing inorder is equivalent to a strict BST; checking adjacent emitted values proves the entire sequence is increasing."
        },
        "time": "O(n)",
        "space": "O(h)",
        "complexity": {
          "zh": "每节点入栈、出栈一次；上一个值是常数空间，没有 O(n) 结果数组。",
          "en": "Each node is pushed and popped once. A single previous value replaces an O(n) output array."
        },
        "python": "class Solution:\n    def isValidBST(self, root):\n        stack=[];cur=root;previous=None\n        while cur or stack:\n            while cur:stack.append(cur);cur=cur.left\n            cur=stack.pop()\n            if previous is not None and cur.val<=previous:return False\n            previous=cur.val;cur=cur.right\n        return True\n",
        "java": "import java.util.*;\nclass Solution  {\n    public boolean isValidBST(TreeNode root) {\n        Deque<TreeNode>s=new ArrayDeque<>();\n        TreeNode cur=root;\n        Long prev=null;\n        while(cur!=null||!s.isEmpty()) {\n            while(cur!=null) {\n                s.push(cur);\n                cur=cur.left;\n            }\n            cur=s.pop();\n            if(prev!=null&&cur.val<=prev)return false;\n            prev=(long)cur.val;\n            cur=cur.right;\n        }\n        return true;\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "out=[4,8]",
              "prev=8"
            ],
            "note": {
              "zh": "中序先得到 4、8。",
              "en": "Inorder first emits 4 and 8."
            }
          },
          {
            "cells": [
              "next=6",
              "6 <= 8"
            ],
            "note": {
              "zh": "右子树最左节点 6 违反递增。",
              "en": "The leftmost node of the right subtree violates increasing order."
            }
          },
          {
            "cells": [
              "result=false"
            ],
            "note": {
              "zh": "无需继续处理 10 和 12。",
              "en": "There is no need to continue to 10 or 12."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/validate-binary-search-tree/description/"
      }
    ],
    "slug": "validate-binary-search-tree",
    "title": {
      "zh": "验证二叉搜索树",
      "en": "Validate Binary Search Tree"
    },
    "category": {
      "zh": "二叉树",
      "en": "Binary Trees"
    },
    "level": {
      "zh": "中等",
      "en": "Medium"
    }
  },
  {
    "id": 230,
    "statement": {
      "zh": "给定二叉搜索树和从 1 开始的排名 k，返回所有节点值中第 k 小的值。题目保证 k 有效。",
      "en": "Given a BST and a one-based rank k, return its kth smallest node value. The rank is guaranteed to be valid."
    },
    "constraints": {
      "zh": [
        "1 ≤ n ≤ 10⁴；节点值范围 [0,10⁴]",
        "1 ≤ k ≤ n"
      ],
      "en": [
        "1 ≤ n ≤ 10⁴; node values in [0,10⁴]",
        "1 ≤ k ≤ n"
      ]
    },
    "example": {
      "zh": "root=[5,2,8,1,3], k=3 → 3",
      "en": "root=[5,2,8,1,3], k=3 → 3"
    },
    "methods": [
      {
        "key": "all-values",
        "name": {
          "zh": "完整中序后取下标",
          "en": "Collect inorder then index"
        },
        "intuition": {
          "zh": "先把树变成有序数组，排名问题就变成取下标 k-1。这个方法直观，适合作为基准，但即使 k 很小也遍历全部节点。",
          "en": "Convert the BST into its sorted inorder array, then select index k-1. This straightforward baseline still visits every node even for a small rank."
        },
        "steps": {
          "zh": [
            "中序遍历并收集全部值",
            "将 1-based 的 k 转成 0-based 下标 k-1",
            "返回数组中对应值"
          ],
          "en": [
            "Collect all inorder values",
            "Convert one-based k to index k-1",
            "Return that indexed value"
          ]
        },
        "correctness": {
          "zh": "BST 中序按值递增，数组下标 k-1 的前面恰好有 k-1 个更小节点。",
          "en": "BST inorder is increasing, so exactly k-1 smaller nodes precede index k-1."
        },
        "time": "O(n)",
        "space": "O(n)",
        "complexity": {
          "zh": "结果数组 O(n)，显式栈 O(h) 被 O(n) 包含。",
          "en": "The O(n) array dominates the O(h) traversal stack."
        },
        "python": "class Solution:\n    def kthSmallest(self, root, k):\n        values=[];stack=[];cur=root\n        while cur or stack:\n            while cur:stack.append(cur);cur=cur.left\n            cur=stack.pop();values.append(cur.val);cur=cur.right\n        return values[k-1]\n",
        "java": "import java.util.*;\nclass Solution  {\n    public int kthSmallest(TreeNode root,int k) {\n        List<Integer>a=new ArrayList<>();\n        Deque<TreeNode>s=new ArrayDeque<>();\n        TreeNode c=root;\n        while(c!=null||!s.isEmpty()) {\n            while(c!=null) {\n                s.push(c);\n                c=c.left;\n            }\n            c=s.pop();\n            a.add(c.val);\n            c=c.right;\n        }\n        return a.get(k-1);\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "stack=[5,2,1]"
            ],
            "note": {
              "zh": "沿左链开始中序。",
              "en": "Start inorder along the left spine."
            }
          },
          {
            "cells": [
              "values=[1,2,3,5,8]"
            ],
            "note": {
              "zh": "完整收集所有值。",
              "en": "Collect every value."
            }
          },
          {
            "cells": [
              "k=3",
              "index=2",
              "answer=3"
            ],
            "note": {
              "zh": "排名减一作为数组下标。",
              "en": "Subtract one from rank for the array index."
            }
          }
        ]
      },
      {
        "key": "early-stop",
        "name": {
          "zh": "中序计数提前停止",
          "en": "Stop inorder at rank k"
        },
        "intuition": {
          "zh": "完整数组中只有一个位置有用。中序每弹出一个节点就消耗一个排名，到第 k 次直接返回，不再进入无关右子树。注意入栈不代表已经访问，计数要放在弹出时。",
          "en": "Only one position in the sorted sequence is needed. Consume one rank at each inorder pop and return on the kth pop. Pushing a node is not an inorder visit, so do not count pushes."
        },
        "steps": {
          "zh": [
            "沿左链入栈",
            "弹出时 k 减 1；为 0 就返回值",
            "否则转向右孩子继续中序"
          ],
          "en": [
            "Push the left spine",
            "Decrement k on pop and return if it reaches zero",
            "Otherwise continue with the right child"
          ]
        },
        "correctness": {
          "zh": "弹出顺序就是递增顺序，所以第 k 次弹出的值是所需排名；提前结束不影响此前顺序。",
          "en": "Pops occur in sorted order, making the kth pop the requested rank. Stopping cannot affect the prefix already visited."
        },
        "time": "O(h+k), bounded by O(n)",
        "space": "O(h)",
        "complexity": {
          "zh": "最多处理前 k 个访问节点和栈上最多 h 个待访问祖先；没有全量结果数组。",
          "en": "Work covers k emitted nodes and at most h pending ancestors, without a full output array."
        },
        "python": "class Solution:\n    def kthSmallest(self, root, k):\n        stack=[];cur=root\n        while cur or stack:\n            while cur:stack.append(cur);cur=cur.left\n            cur=stack.pop();k-=1\n            if k==0:return cur.val\n            cur=cur.right\n        raise ValueError('Invalid rank')\n",
        "java": "import java.util.*;\nclass Solution  {\n    public int kthSmallest(TreeNode root,int k) {\n        Deque<TreeNode>s=new ArrayDeque<>();\n        TreeNode c=root;\n        while(c!=null||!s.isEmpty()) {\n            while(c!=null) {\n                s.push(c);\n                c=c.left;\n            }\n            c=s.pop();\n            if(--k==0)return c.val;\n            c=c.right;\n        }\n        throw new IllegalArgumentException();\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "stack=[5,2,1]",
              "k=3"
            ],
            "note": {
              "zh": "还未输出任何节点。",
              "en": "No node has been emitted yet."
            }
          },
          {
            "cells": [
              "pop=1",
              "k=2",
              "pop=2",
              "k=1"
            ],
            "note": {
              "zh": "每弹出一个节点消耗一个排名。",
              "en": "Each pop consumes one rank."
            }
          },
          {
            "cells": [
              "pop=3",
              "k=0",
              "answer=3"
            ],
            "note": {
              "zh": "返回，5 与 8 无需输出。",
              "en": "Return without emitting 5 or 8."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/kth-smallest-element-in-a-bst/description/"
      }
    ],
    "slug": "kth-smallest-element-in-a-bst",
    "title": {
      "zh": "二叉搜索树中第 K 小的元素",
      "en": "Kth Smallest Element in a BST"
    },
    "category": {
      "zh": "二叉树",
      "en": "Binary Trees"
    },
    "level": {
      "zh": "中等",
      "en": "Medium"
    }
  },
  {
    "id": 199,
    "statement": {
      "zh": "从树的右侧观察，按从上到下返回每一层最右边的节点值。若右子树较浅，更深层可由左子树贡献；不是只沿 right 指针行走。",
      "en": "Return the rightmost node value at every depth, from top to bottom. Deeper visible nodes may come from the left subtree, so following only right pointers is insufficient."
    },
    "constraints": {
      "zh": [
        "0 ≤ n ≤ 100；节点值范围 [-100,100]"
      ],
      "en": [
        "0 ≤ n ≤ 100; node values in [-100,100]"
      ]
    },
    "example": {
      "zh": "root=[5,2,8,1,3] → [5,8,3]",
      "en": "root=[5,2,8,1,3] → [5,8,3]"
    },
    "methods": [
      {
        "key": "bfs",
        "name": {
          "zh": "每层取最后一个",
          "en": "Last node of each BFS layer"
        },
        "intuition": {
          "zh": "先得到每层从左到右的顺序，再取末尾就是该层右侧能看到的节点。固定当前层的大小，防止把下一层节点误认为本层结尾。",
          "en": "BFS visits each layer left to right, so the final node in that layer is visible from the right. Freeze the layer size to avoid mixing in newly enqueued children."
        },
        "steps": {
          "zh": [
            "每轮记录队列长度",
            "出队时先加入左孩子再右孩子",
            "本轮最后出队的值加入答案"
          ],
          "en": [
            "Snapshot the layer size",
            "Enqueue left before right as nodes are removed",
            "Append the final removed value in the round"
          ]
        },
        "correctness": {
          "zh": "左到右的队列顺序保证每层最后出队者最靠右，每层恰好记录一次。",
          "en": "Left-to-right queue order makes the last removal the rightmost node, with exactly one recorded value per layer."
        },
        "time": "O(n)",
        "space": "O(w) auxiliary + O(h) output",
        "complexity": {
          "zh": "队列 O(w)，视图每层一个值共 O(h)；每节点一次进出队。",
          "en": "The queue uses O(w), the view stores O(h) values, and each node is enqueued and dequeued once."
        },
        "python": "from collections import deque\nclass Solution:\n    def rightSideView(self, root):\n        q=deque([root]) if root else deque();result=[]\n        while q:\n            for _ in range(len(q)):\n                n=q.popleft()\n                if n.left:q.append(n.left)\n                if n.right:q.append(n.right)\n            result.append(n.val)\n        return result\n",
        "java": "import java.util.*;\nclass Solution  {\n    public List<Integer> rightSideView(TreeNode root) {\n        List<Integer>a=new ArrayList<>();\n        Deque<TreeNode>q=new ArrayDeque<>();\n        if(root!=null)q.add(root);\n        while(!q.isEmpty()) {\n            int size=q.size();\n            for(int i=0;i<size;i++) {\n                TreeNode n=q.remove();\n                if(n.left!=null)q.add(n.left);\n                if(n.right!=null)q.add(n.right);\n                if(i==size-1)a.add(n.val);\n            }\n        }\n        return a;\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "layer=[5]",
              "view=[5]"
            ],
            "note": {
              "zh": "第一层最后一个是根。",
              "en": "The root is last in layer one."
            }
          },
          {
            "cells": [
              "layer=[2,8]",
              "view=[5,8]"
            ],
            "note": {
              "zh": "第二层选择 8。",
              "en": "Choose 8 from layer two."
            }
          },
          {
            "cells": [
              "layer=[1,3]",
              "view=[5,8,3]"
            ],
            "note": {
              "zh": "第三层虽来自左树，仍选最右的 3。",
              "en": "Layer three comes from the left subtree; its rightmost node is 3."
            }
          }
        ]
      },
      {
        "key": "right-first",
        "name": {
          "zh": "右优先 DFS 首次记录",
          "en": "First encounter in right-first DFS"
        },
        "intuition": {
          "zh": "把遍历方向改成根、右、左，则每个深度首次遇到的节点就是最右节点。用答案长度判断该深度是否已经记录，不需要额外集合。",
          "en": "Traverse root, right, then left. The first node encountered at a depth is the rightmost one. The current answer length tells whether that depth has already been recorded."
        },
        "steps": {
          "zh": [
            "访问节点时带深度 d",
            "若 d 等于答案长度，追加当前值",
            "先递归右，再递归左"
          ],
          "en": [
            "Carry depth d",
            "Append only when d equals the answer length",
            "Recurse right before left"
          ]
        },
        "correctness": {
          "zh": "在同一深度，右优先遍历先到右侧位置；后续左侧节点不能覆盖先前答案，深层缺失仍会由左侧补齐。",
          "en": "Right-first traversal reaches rightward positions first at a fixed depth. Later left nodes cannot overwrite them, but may fill deeper unseen levels."
        },
        "time": "O(n)",
        "space": "O(h) including output",
        "complexity": {
          "zh": "每节点访问一次；栈和每层一个答案都 O(h)。",
          "en": "One visit per node; both the stack and one-value-per-depth output are O(h)."
        },
        "python": "class Solution:\n    def rightSideView(self, root):\n        result=[]\n        def visit(n,d):\n            if n is None:return\n            if d==len(result):result.append(n.val)\n            visit(n.right,d+1);visit(n.left,d+1)\n        visit(root,0)\n        return result\n",
        "java": "import java.util.*;\nclass Solution  {\n    public List<Integer> rightSideView(TreeNode root) {\n        List<Integer>a=new ArrayList<>();\n        visit(root,0,a);\n        return a;\n    }\n    private void visit(TreeNode n,int d,List<Integer>a) {\n        if(n==null)return;\n        if(d==a.size())a.add(n.val);\n        visit(n.right,d+1,a);\n        visit(n.left,d+1,a);\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "visit=5",
              "depth=0",
              "view=[5]"
            ],
            "note": {
              "zh": "每个深度只记录首次访问。",
              "en": "Record only the first visit at each depth."
            }
          },
          {
            "cells": [
              "visit=8",
              "depth=1",
              "view=[5,8]"
            ],
            "note": {
              "zh": "优先走右边记录 8。",
              "en": "Visit right first to record 8."
            }
          },
          {
            "cells": [
              "visit=2 → 3 → 1",
              "view=[5,8,3]"
            ],
            "note": {
              "zh": "2 的深度已记录，3 首次填充深度 2，1 不覆盖它。",
              "en": "Depth 1 is filled; 3 fills depth 2 and 1 cannot overwrite it."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/binary-tree-right-side-view/description/"
      }
    ],
    "slug": "binary-tree-right-side-view",
    "title": {
      "zh": "二叉树的右视图",
      "en": "Binary Tree Right Side View"
    },
    "category": {
      "zh": "二叉树",
      "en": "Binary Trees"
    },
    "level": {
      "zh": "中等",
      "en": "Medium"
    }
  },
  {
    "id": 114,
    "statement": {
      "zh": "原地修改二叉树，使所有 left 指针为空，right 指针串成链。链上必须复用原节点，顺序等于原树的前序遍历（根、左、右）。函数不需要返回链表。",
      "en": "Modify the tree in place so every left pointer is null and right pointers form a chain reusing the original nodes in preorder (root-left-right). The function returns no list."
    },
    "constraints": {
      "zh": [
        "0 ≤ n ≤ 2000；节点值范围 [-100,100]"
      ],
      "en": [
        "0 ≤ n ≤ 2000; node values in [-100,100]"
      ]
    },
    "example": {
      "zh": "root=[5,2,8,1,3] → 5→2→1→3→8；所有 left=null。",
      "en": "root=[5,2,8,1,3] → 5→2→1→3→8; every left=null."
    },
    "methods": [
      {
        "key": "preorder-stack",
        "name": {
          "zh": "显式栈前序重连",
          "en": "Preorder stack and rewiring"
        },
        "intuition": {
          "zh": "前序顺序确定后，把相邻访问节点连接起来即可。栈后进先出，所以先压右孩子再压左孩子。必须先保存孩子，再清空当前节点指针，否则会丢失尚未访问的子树。",
          "en": "Connect consecutive nodes in preorder. Because a stack is LIFO, push the right child before the left. Save children before clearing pointers to avoid losing unvisited subtrees."
        },
        "steps": {
          "zh": [
            "根入栈，prev 初始为空",
            "弹出节点，先保存右、左孩子到栈",
            "清空它的左右指针，把 prev.right 指向它，并更新 prev"
          ],
          "en": [
            "Push root and initialize prev to null",
            "Pop a node; push its right then left child",
            "Clear its pointers, connect prev.right to it, and advance prev"
          ]
        },
        "correctness": {
          "zh": "栈保证访问顺序为原树前序；每条新 right 边连接连续访问节点，且每个 left 被清空。",
          "en": "The stack preserves original preorder, each new right edge connects consecutive visits, and every left pointer is cleared."
        },
        "time": "O(n)",
        "space": "O(h)",
        "complexity": {
          "zh": "每节点入栈出栈一次，DFS 栈保存祖先的待处理兄弟 O(h)；复用节点无新链。",
          "en": "Every node is pushed and popped once; pending siblings along a DFS path require O(h). Nodes are reused."
        },
        "python": "class Solution:\n    def flatten(self, root):\n        stack=[root] if root else [];prev=None\n        while stack:\n            n=stack.pop()\n            if n.right:stack.append(n.right)\n            if n.left:stack.append(n.left)\n            n.left=n.right=None\n            if prev:prev.right=n\n            prev=n\n",
        "java": "import java.util.*;\nclass Solution  {\n    public void flatten(TreeNode root) {\n        Deque<TreeNode>s=new ArrayDeque<>();\n        if(root!=null)s.push(root);\n        TreeNode prev=null;\n        while(!s.isEmpty()) {\n            TreeNode n=s.pop();\n            if(n.right!=null)s.push(n.right);\n            if(n.left!=null)s.push(n.left);\n            n.left=null;\n            n.right=null;\n            if(prev!=null)prev.right=n;\n            prev=n;\n        }\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "pop=5",
              "stack=[8,2]",
              "chain=5"
            ],
            "note": {
              "zh": "先压右再压左，下一次弹出 2。",
              "en": "Push right then left, so 2 is popped next."
            }
          },
          {
            "cells": [
              "pop=2",
              "stack=[8,3,1]",
              "chain=5→2"
            ],
            "note": {
              "zh": "保存 2 的孩子后再清指针。",
              "en": "Save 2’s children before clearing its links."
            }
          },
          {
            "cells": [
              "chain=5→2→1→3→8",
              "all left=null"
            ],
            "note": {
              "zh": "连续访问节点被串在 right 上。",
              "en": "Consecutive visits form the right chain."
            }
          }
        ]
      },
      {
        "key": "splice",
        "name": {
          "zh": "前驱位置拼接",
          "en": "Constant-space splicing"
        },
        "intuition": {
          "zh": "当前节点有左子树时，前序要求整棵左树先于右树。把原右树挂到左树最右链末端，再把左树移到右边。这个末端不一定是最终前序尾节点，但在后续同样重排后，原右树会位于整个左子树之后。",
          "en": "Preorder requires the entire left subtree before the original right subtree. Attach the original right subtree to the end of the left subtree’s right spine, then move the left subtree rightward. That spine endpoint need not be the final preorder tail; later splices preserve the required eventual order."
        },
        "steps": {
          "zh": [
            "若 cur.left 非空，沿其 right 链找 pre",
            "pre.right 接原 cur.right；cur.right 接 cur.left；清空 cur.left",
            "沿 cur.right 前进，直到空"
          ],
          "en": [
            "If cur.left exists, follow its right spine to pre",
            "Attach original cur.right to pre.right; move cur.left to cur.right and clear cur.left",
            "Advance along cur.right until null"
          ]
        },
        "correctness": {
          "zh": "每次变换保留根、整左树、整右树的前序次序。依次消除所有左边，最终右链就是原前序。",
          "en": "Each transformation preserves the preorder sequence root-left-subtree-right-subtree. Eliminating all left links therefore yields that same sequence as a right chain."
        },
        "time": "O(n)",
        "space": "O(1)",
        "complexity": {
          "zh": "主指针线性前进；寻找前驱扫描的原始右边总计 O(n)，并非每次都重扫整树。只使用 cur 和 pre。",
          "en": "The main pointer advances linearly; original right-spine edges scanned during predecessor searches total O(n). Only cur and pre are needed."
        },
        "python": "class Solution:\n    def flatten(self, root):\n        cur=root\n        while cur:\n            if cur.left:\n                pre=cur.left\n                while pre.right:pre=pre.right\n                pre.right=cur.right\n                cur.right=cur.left\n                cur.left=None\n            cur=cur.right\n",
        "java": "import java.util.*;\nclass Solution  {\n    public void flatten(TreeNode root) {\n        TreeNode cur=root;\n        while(cur!=null) {\n            if(cur.left!=null) {\n                TreeNode pre=cur.left;\n                while(pre.right!=null)pre=pre.right;\n                pre.right=cur.right;\n                cur.right=cur.left;\n                cur.left=null;\n            }\n            cur=cur.right;\n        }\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "cur=5",
              "pre=3",
              "3.right=8"
            ],
            "note": {
              "zh": "沿左子树右链找到 3，挂上原右树 8。",
              "en": "Find 3 on the left subtree’s right spine and attach 8."
            }
          },
          {
            "cells": [
              "5.right=2",
              "cur=2",
              "1.right=3"
            ],
            "note": {
              "zh": "把 2 移到根右侧；在 2 处把原右树 3 挂到 1 后。",
              "en": "Move 2 rightward; at 2, attach subtree 3 after 1."
            }
          },
          {
            "cells": [
              "chain=5→2→1→3→8",
              "all left=null"
            ],
            "note": {
              "zh": "剩余节点没有左孩子，沿右链结束。",
              "en": "Remaining nodes have no left child; follow the right chain to finish."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/flatten-binary-tree-to-linked-list/description/"
      }
    ],
    "slug": "flatten-binary-tree-to-linked-list",
    "title": {
      "zh": "二叉树展开为链表",
      "en": "Flatten Binary Tree to Linked List"
    },
    "category": {
      "zh": "二叉树",
      "en": "Binary Trees"
    },
    "level": {
      "zh": "中等",
      "en": "Medium"
    }
  },
  {
    "id": 105,
    "statement": {
      "zh": "给出同一棵二叉树的前序数组 preorder 和中序数组 inorder，节点值互不相同。恢复这棵树并返回根；输入保证是合法且相互匹配的遍历。",
      "en": "Reconstruct a binary tree from matching preorder and inorder arrays with distinct values. The traversals are guaranteed valid and describe the same tree."
    },
    "constraints": {
      "zh": [
        "1 ≤ n ≤ 3000；两个数组长度都为 n",
        "值在 [-3000,3000] 且不重复，两个数组包含相同值"
      ],
      "en": [
        "1 ≤ n ≤ 3000; both arrays have length n",
        "Distinct values in [-3000,3000]; both arrays contain the same values"
      ]
    },
    "example": {
      "zh": "preorder=[5,2,1,3,8], inorder=[1,2,3,5,8] → root=[5,2,8,1,3]",
      "en": "preorder=[5,2,1,3,8], inorder=[1,2,3,5,8] → root=[5,2,8,1,3]"
    },
    "methods": [
      {
        "key": "linear-search",
        "name": {
          "zh": "区间递归 + 线性找根",
          "en": "Recursive ranges with root scanning"
        },
        "intuition": {
          "zh": "前序的第一个值是根，中序中根左边恰好属于左子树、右边属于右子树。左右数量决定下一段前序如何分配。先用线性查找理解区间切分；传索引而不切片，避免额外数组。",
          "en": "The next preorder value is the root. Its inorder position splits the left and right subtrees. Scan the current inorder range to locate the root. Pass indices instead of slicing arrays."
        },
        "steps": {
          "zh": [
            "空中序区间返回空",
            "取下一个前序值建根，在中序定位根",
            "递归构建左区间再右区间，返回根"
          ],
          "en": [
            "Return null for an empty inorder range",
            "Consume the next preorder value and locate it in inorder",
            "Build the left range before the right range, then return the root"
          ]
        },
        "correctness": {
          "zh": "值唯一使中序切分位置唯一；前序游标按根、左、右推进，因此每个子区间恰好消耗对应节点且结构唯一。",
          "en": "Distinct values make the split unique. Consuming preorder in root-left-right order assigns exactly the correct nodes to each range."
        },
        "time": "O(n²) worst case",
        "space": "O(h) auxiliary + O(n) output",
        "complexity": {
          "zh": "链形树中线性找根累计可达 n+(n-1)+…；仅索引与递归栈 O(h)，另有新树 O(n)。 实际递归受 Python 递归深度和 Java 线程栈限制；提高 Python 深度不会消除内存开销，极深输入优先用显式栈。 这是便于对比的基准解法，大规模最坏输入可能超时。",
          "en": "On a chain, root searches can total n+(n-1)+…; index ranges and stack use O(h), with O(n) output nodes. Actual recursion is limited by Python recursion depth and the Java thread stack; raising Python’s limit does not remove memory costs. Prefer an explicit stack for extreme depth. This comparison baseline may time out on large worst-case inputs."
        },
        "python": "import sys\nclass Solution:\n    def buildTree(self, preorder, inorder):\n        sys.setrecursionlimit(max(sys.getrecursionlimit(),10000))\n        cursor=0\n\n        def build(lo,hi):\n            nonlocal cursor\n            if lo>hi:return None\n            value=preorder[cursor];cursor+=1\n            mid=inorder.index(value,lo,hi+1)\n            n=TreeNode(value)\n            n.left=build(lo,mid-1);n.right=build(mid+1,hi)\n            return n\n        return build(0,len(inorder)-1)\n",
        "java": "import java.util.*;\nclass Solution  {\n    private int cursor;\n    public TreeNode buildTree(int[] preorder,int[] inorder) {\n        cursor=0;\n        return build(preorder,inorder,0,inorder.length-1);\n    }\n    private TreeNode build(int[]pre,int[]in,int lo,int hi) {\n        if(lo>hi)return null;\n        int value=pre[cursor++];\n        int mid=lo;\n        while(in[mid]!=value)mid++;\n        TreeNode n=new TreeNode(value);\n        n.left=build(pre,in,lo,mid-1);\n        n.right=build(pre,in,mid+1,hi);\n        return n;\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "root=5",
              "in=[1,2,3 | 5 | 8]"
            ],
            "note": {
              "zh": "定位 5，将中序分成左右两段。",
              "en": "Locate 5 to split inorder into two ranges."
            }
          },
          {
            "cells": [
              "root.left=2",
              "in-left=[1 | 2 | 3]"
            ],
            "note": {
              "zh": "下一个前序值 2 是左树根。",
              "en": "The next preorder value 2 roots the left subtree."
            }
          },
          {
            "cells": [
              "2.left=1",
              "2.right=3",
              "5.right=8"
            ],
            "note": {
              "zh": "先耗尽左树前序，再建立右树 8。",
              "en": "Consume left-subtree preorder before building right node 8."
            }
          }
        ]
      },
      {
        "key": "index-map",
        "name": {
          "zh": "哈希下标 + 区间递归",
          "en": "Index map and recursive ranges"
        },
        "intuition": {
          "zh": "前序的第一个值是根，中序中根左边恰好属于左子树、右边属于右子树。左右数量决定下一段前序如何分配。提前建立值到中序下标的表，避免每次扫描；共享前序游标必须先建左再建右。",
          "en": "The next preorder value is the root. Its inorder position splits the left and right subtrees. Precompute value-to-inorder-index lookup to eliminate repeated scanning. A shared preorder cursor requires building left before right."
        },
        "steps": {
          "zh": [
            "空中序区间返回空",
            "取下一个前序值建根，在中序定位根",
            "递归构建左区间再右区间，返回根"
          ],
          "en": [
            "Return null for an empty inorder range",
            "Consume the next preorder value and locate it in inorder",
            "Build the left range before the right range, then return the root"
          ]
        },
        "correctness": {
          "zh": "值唯一使中序切分位置唯一；前序游标按根、左、右推进，因此每个子区间恰好消耗对应节点且结构唯一。",
          "en": "Distinct values make the split unique. Consuming preorder in root-left-right order assigns exactly the correct nodes to each range."
        },
        "time": "O(n) expected",
        "space": "O(n) auxiliary + O(n) output",
        "complexity": {
          "zh": "每节点一次哈希查询；映射 O(n)，递归 O(h)，新树 O(n)。 实际递归受 Python 递归深度和 Java 线程栈限制；提高 Python 深度不会消除内存开销，极深输入优先用显式栈。",
          "en": "One expected-constant hash lookup per node; map O(n), stack O(h), new tree O(n). Actual recursion is limited by Python recursion depth and the Java thread stack; raising Python’s limit does not remove memory costs. Prefer an explicit stack for extreme depth."
        },
        "python": "import sys\nclass Solution:\n    def buildTree(self, preorder, inorder):\n        sys.setrecursionlimit(max(sys.getrecursionlimit(),10000))\n        cursor=0\n        positions={v:i for i,v in enumerate(inorder)}\n        def build(lo,hi):\n            nonlocal cursor\n            if lo>hi:return None\n            value=preorder[cursor];cursor+=1\n            mid=positions[value]\n            n=TreeNode(value)\n            n.left=build(lo,mid-1);n.right=build(mid+1,hi)\n            return n\n        return build(0,len(inorder)-1)\n",
        "java": "import java.util.*;\nclass Solution  {\n    private int cursor;\n    private Map<Integer,Integer> positions;\n    public TreeNode buildTree(int[] preorder,int[] inorder) {\n        cursor=0;\n        positions=new HashMap<>();\n        for(int i=0;i<inorder.length;i++)positions.put(inorder[i],i);\n        return build(preorder,inorder,0,inorder.length-1);\n    }\n    private TreeNode build(int[]pre,int[]in,int lo,int hi) {\n        if(lo>hi)return null;\n        int value=pre[cursor++];\n        int mid=positions.get(value);\n        TreeNode n=new TreeNode(value);\n        n.left=build(pre,in,lo,mid-1);\n        n.right=build(pre,in,mid+1,hi);\n        return n;\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "pos={1:0,2:1,3:2,5:3,8:4}",
              "cursor=0"
            ],
            "note": {
              "zh": "先建中序值到位置的映射。",
              "en": "Build inorder value-to-position lookup."
            }
          },
          {
            "cells": [
              "value=5",
              "mid=3",
              "left=[0,2]",
              "right=[4,4]"
            ],
            "note": {
              "zh": "常数查询得到根切分位置。",
              "en": "Locate the root split with one lookup."
            }
          },
          {
            "cells": [
              "preorder consumed=5,2,1,3,8",
              "root=[5,2,8,1,3]"
            ],
            "note": {
              "zh": "游标按根、左、右单向推进。",
              "en": "The cursor moves forward in root-left-right order."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/description/"
      }
    ],
    "slug": "construct-binary-tree-from-preorder-and-inorder-traversal",
    "title": {
      "zh": "从前序与中序遍历序列构造二叉树",
      "en": "Construct Binary Tree from Preorder and Inorder Traversal"
    },
    "category": {
      "zh": "二叉树",
      "en": "Binary Trees"
    },
    "level": {
      "zh": "中等",
      "en": "Medium"
    }
  },
  {
    "id": 437,
    "statement": {
      "zh": "统计节点值之和恰好等于 targetSum 的非空路径条数。路径必须沿父节点到子节点向下连续行走，但起点不必是根，终点不必是叶。",
      "en": "Count nonempty downward paths whose node values sum to targetSum. A path follows parent-to-child edges, but may start and end anywhere."
    },
    "constraints": {
      "zh": [
        "0 ≤ n ≤ 1000；节点值范围 [-10⁹,10⁹]",
        "-1000 ≤ targetSum ≤ 1000"
      ],
      "en": [
        "0 ≤ n ≤ 1000; node values in [-10⁹,10⁹]",
        "-1000 ≤ targetSum ≤ 1000"
      ]
    },
    "example": {
      "zh": "root=[1,-1,1,1], targetSum=1 → 4；根、左叶、右叶各一条，加上根→-1→左叶。",
      "en": "root=[1,-1,1,1], targetSum=1 → 4: the root, both leaves valued 1, and root→-1→left leaf."
    },
    "methods": [
      {
        "key": "all-starts",
        "name": {
          "zh": "枚举每个起点",
          "en": "Enumerate every starting node"
        },
        "intuition": {
          "zh": "先固定起点，向下累加可以枚举以它开始的全部路径；再把每个节点都当起点。值可以为负，因此当前和超过目标也不能剪枝；匹配后仍需继续向下寻找更长匹配。",
          "en": "Fix a starting node and explore every downward endpoint, then repeat for all starts. Negative values forbid pruning when the sum exceeds the target; even after a match, longer matching paths may exist."
        },
        "steps": {
          "zh": [
            "fromNode 递归累计从当前起点的剩余目标",
            "命中目标记一条，仍继续左右孩子",
            "外层遍历每个起点，将计数相加"
          ],
          "en": [
            "Count matches from one start using a remaining target",
            "Record a match but still explore both children",
            "Run this count from every node and add the results"
          ]
        },
        "correctness": {
          "zh": "每条合法路径有唯一的起点与终点。外层唯一选中起点，内层唯一走到终点，因此不重不漏。",
          "en": "Every valid path has a unique start and end. The outer traversal selects its start once and the inner traversal reaches its end once."
        },
        "time": "O(n²) worst case",
        "space": "O(h)",
        "complexity": {
          "zh": "链形树重复扫描子树导致平方时间。Java 剩余和使用 long，因路径总和可能超出 int；当前同时存在的调用栈 O(h)。 实际递归受 Python 递归深度和 Java 线程栈限制；提高 Python 深度不会消除内存开销，极深输入优先用显式栈。 这是便于对比的基准解法，大规模最坏输入可能超时。",
          "en": "Repeated scans are quadratic on a chain. Java uses long for remaining sums because path totals can exceed int; concurrent stack depth is O(h). Actual recursion is limited by Python recursion depth and the Java thread stack; raising Python’s limit does not remove memory costs. Prefer an explicit stack for extreme depth. This comparison baseline may time out on large worst-case inputs."
        },
        "python": "import sys\nclass Solution:\n    def pathSum(self, root, targetSum):\n        sys.setrecursionlimit(max(sys.getrecursionlimit(),5000))\n        def start(n,remaining):\n            if n is None:return 0\n            remaining-=n.val\n            return int(remaining==0)+start(n.left,remaining)+start(n.right,remaining)\n        def visit(n):\n            if n is None:return 0\n            return start(n,targetSum)+visit(n.left)+visit(n.right)\n        return visit(root)\n",
        "java": "import java.util.*;\nclass Solution  {\n    public int pathSum(TreeNode root,int targetSum) {\n        return visit(root,targetSum);\n    }\n    private int visit(TreeNode n,long target) {\n        return n==null?0:start(n,target)+visit(n.left,target)+visit(n.right,target);\n    }\n    private int start(TreeNode n,long remaining) {\n        if(n==null)return 0;\n        remaining-=n.val;\n        return (remaining==0?1:0)+start(n.left,remaining)+start(n.right,remaining);\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "start=root(1)",
              "matches=2"
            ],
            "note": {
              "zh": "从根出发，根自身及 1→-1→1 两条命中。",
              "en": "From the root, its singleton and 1→-1→1 match."
            }
          },
          {
            "cells": [
              "start=-1",
              "matches=0",
              "start=left-leaf(1)",
              "matches=1"
            ],
            "note": {
              "zh": "-1 出发没有命中，左叶自身命中。",
              "en": "No path from -1 matches; the left leaf itself does."
            }
          },
          {
            "cells": [
              "start=right-leaf(1)",
              "matches=1",
              "total=4"
            ],
            "note": {
              "zh": "右叶贡献最后一条，共 4。",
              "en": "The right leaf contributes one more, totaling 4."
            }
          }
        ]
      },
      {
        "key": "prefix",
        "name": {
          "zh": "前缀和计数 + 回溯撤销",
          "en": "Prefix counts with rollback"
        },
        "intuition": {
          "zh": "在当前根到节点的路径上，sum−oldPrefix=target 表示一条合法向下路径。用频次表一次性计数所有起点。表里只能保留当前祖先路径：退出节点必须撤销，否则会把兄弟分支拼成不存在的路径。",
          "en": "Along the active root-to-node path, sum−oldPrefix=target identifies a valid downward path. A frequency map counts all possible starts at once. Remove a prefix when leaving its node so sibling branches never combine into nonexistent paths."
        },
        "steps": {
          "zh": [
            "频次表初始 {0:1}，代表根之前的空前缀",
            "先查询 sum-target 的次数，再增加当前 sum 的频次",
            "递归左右后撤销当前 sum；频次归零时删除键"
          ],
          "en": [
            "Initialize counts with {0:1} for the prefix before the root",
            "Query sum-target before inserting the current sum",
            "After both children, undo the current prefix and delete zero-count keys"
          ]
        },
        "correctness": {
          "zh": "查询时表中仅含当前节点之前的祖先前缀，故每次命中恰好对应一条非空向下路径；撤销维持该不变量。",
          "en": "At query time the map contains only ancestor prefixes before the current node, so every match is a nonempty downward path. Rollback preserves this invariant across branches."
        },
        "time": "O(n) expected",
        "space": "O(h)",
        "complexity": {
          "zh": "每节点常数次哈希操作；删除零频次键使表只保存当前路径 O(h)，递归也是 O(h)。Java 前缀使用 long。 实际递归受 Python 递归深度和 Java 线程栈限制；提高 Python 深度不会消除内存开销，极深输入优先用显式栈。",
          "en": "Constant expected hash work per node. Deleting zero-count keys bounds the map to O(h), matching stack space. Java prefix sums use long. Actual recursion is limited by Python recursion depth and the Java thread stack; raising Python’s limit does not remove memory costs. Prefer an explicit stack for extreme depth."
        },
        "python": "import sys\nclass Solution:\n    def pathSum(self, root, targetSum):\n        sys.setrecursionlimit(max(sys.getrecursionlimit(),5000))\n        counts={0:1}\n        def visit(n,total):\n            if n is None:return 0\n            total+=n.val\n            answer=counts.get(total-targetSum,0)\n            counts[total]=counts.get(total,0)+1\n            answer+=visit(n.left,total)+visit(n.right,total)\n            counts[total]-=1\n            if counts[total]==0:del counts[total]\n            return answer\n        return visit(root,0)\n",
        "java": "import java.util.*;\nclass Solution  {\n    public int pathSum(TreeNode root,int targetSum) {\n        Map<Long,Integer>counts=new HashMap<>();\n        counts.put(0L,1);\n        return visit(root,0L,targetSum,counts);\n    }\n    private int visit(TreeNode n,long total,int target,Map<Long,Integer>c) {\n        if(n==null)return 0;\n        total+=n.val;\n        int a=c.getOrDefault(total-target,0);\n        c.put(total,c.getOrDefault(total,0)+1);\n        a+=visit(n.left,total,target,c)+visit(n.right,total,target,c);\n        int left=c.get(total)-1;\n        if(left==0)c.remove(total);\n        else c.put(total,left);\n        return a;\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "counts={0:1}",
              "root sum=1",
              "answer=1"
            ],
            "note": {
              "zh": "根先查询 0，命中空前缀一次。",
              "en": "Root queries prefix 0 and matches once."
            }
          },
          {
            "cells": [
              "left sum=0",
              "counts[0]=2"
            ],
            "note": {
              "zh": "走到 -1 后累计和为 0，空前缀与该前缀都保留。",
              "en": "At -1 the sum is 0; both the empty and current prefixes count."
            }
          },
          {
            "cells": [
              "left-leaf sum=1",
              "add=2",
              "answer=3"
            ],
            "note": {
              "zh": "左叶查询 0 命中两次，对应自身及从根开始的路径。",
              "en": "The left leaf finds two zero prefixes: its singleton and the root-started path."
            }
          },
          {
            "cells": [
              "rollback left",
              "right-leaf sum=2",
              "add=1",
              "answer=4"
            ],
            "note": {
              "zh": "撤销左树前缀后，右叶只命中根前缀 1。",
              "en": "After rolling back the left branch, the right leaf matches only prefix 1."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/path-sum-iii/description/"
      }
    ],
    "slug": "path-sum-iii",
    "title": {
      "zh": "路径总和 III",
      "en": "Path Sum III"
    },
    "category": {
      "zh": "二叉树",
      "en": "Binary Trees"
    },
    "level": {
      "zh": "中等",
      "en": "Medium"
    }
  },
  {
    "id": 236,
    "statement": {
      "zh": "给定普通二叉树及其中两个不同节点 p、q，返回它们最深的公共祖先节点。节点可以作为自己的祖先；p、q 是节点引用，不是要新建的值节点。",
      "en": "Given a general binary tree and two distinct existing nodes p and q, return their deepest common ancestor node. A node counts as its own ancestor; return an existing node reference."
    },
    "constraints": {
      "zh": [
        "2 ≤ n ≤ 10⁵；节点值范围 [-10⁹,10⁹]",
        "值互不相同；p≠q 且两者都存在于树中"
      ],
      "en": [
        "2 ≤ n ≤ 10⁵; node values in [-10⁹,10⁹]",
        "Values are distinct; p≠q and both nodes exist in the tree"
      ]
    },
    "example": {
      "zh": "root=[5,2,8,1,3], p=2, q=1 → 节点 2。",
      "en": "root=[5,2,8,1,3], p=2, q=1 → node 2."
    },
    "methods": [
      {
        "key": "parents",
        "name": {
          "zh": "父指针表 + 祖先集合",
          "en": "Parent map and ancestor set"
        },
        "intuition": {
          "zh": "树只能向下走，先用遍历记录每个节点的父亲，就能向上追溯。将 p 的全部祖先放入集合，再从 q 往上寻找第一个命中者；它比后续公共祖先都更深。",
          "en": "Record parent references to enable upward movement. Store all ancestors of p, then walk upward from q until the first match. That match is deeper than any later common ancestor."
        },
        "steps": {
          "zh": [
            "用栈遍历建立 child→parent，根映射到空",
            "从 p 向上记录直到根",
            "从 q 向上，第一个出现在集合的节点就是答案"
          ],
          "en": [
            "Traverse iteratively to build child→parent, with root mapped to null",
            "Record ancestors from p to the root",
            "Walk upward from q and return the first recorded ancestor"
          ]
        },
        "correctness": {
          "zh": "祖先集合包含且仅包含 p 的祖先。q 从下到上首个命中满足共同祖先条件且深度最大。",
          "en": "The set contains exactly p’s ancestors. The first hit while ascending from q is common and has the greatest possible depth."
        },
        "time": "O(n) expected",
        "space": "O(n)",
        "complexity": {
          "zh": "建父表 O(n)，两次上溯 O(h)；哈希表和集合最多 O(n)。无递归深度风险。",
          "en": "Building parents is O(n), ascending is O(h), and maps/sets take O(n). No recursive depth risk is introduced."
        },
        "python": "class Solution:\n    def lowestCommonAncestor(self, root, p, q):\n        parent={root:None};stack=[root]\n        while stack:\n            n=stack.pop()\n            for child in (n.left,n.right):\n                if child:parent[child]=n;stack.append(child)\n        ancestors=set()\n        while p is not None:ancestors.add(p);p=parent[p]\n        while q not in ancestors:q=parent[q]\n        return q\n",
        "java": "import java.util.*;\nclass Solution  {\n    public TreeNode lowestCommonAncestor(TreeNode root,TreeNode p,TreeNode q) {\n        Map<TreeNode,TreeNode>parent=new IdentityHashMap<>();\n        Deque<TreeNode>s=new ArrayDeque<>();\n        parent.put(root,null);\n        s.push(root);\n        while(!s.isEmpty()) {\n            TreeNode n=s.pop();\n            if(n.left!=null) {\n                parent.put(n.left,n);\n                s.push(n.left);\n            }\n            if(n.right!=null) {\n                parent.put(n.right,n);\n                s.push(n.right);\n            }\n        }\n        Set<TreeNode>a=Collections.newSetFromMap(new IdentityHashMap<TreeNode,Boolean>());\n        while(p!=null) {\n            a.add(p);\n            p=parent.get(p);\n        }\n        while(!a.contains(q))q=parent.get(q);\n        return q;\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "parent[1]=2",
              "parent[2]=5",
              "parent[5]=null"
            ],
            "note": {
              "zh": "记录祖先关系。",
              "en": "Record parent relationships."
            }
          },
          {
            "cells": [
              "p=2",
              "ancestors={2,5}"
            ],
            "note": {
              "zh": "收集 p 的所有祖先，包含它自己。",
              "en": "Collect p’s ancestors, including itself."
            }
          },
          {
            "cells": [
              "q:1 → 2",
              "answer=node(2)"
            ],
            "note": {
              "zh": "q 向上第一个命中 2。",
              "en": "Ascending from q first hits 2."
            }
          }
        ]
      },
      {
        "key": "postorder",
        "name": {
          "zh": "后序汇合目标",
          "en": "Postorder target convergence"
        },
        "intuition": {
          "zh": "子树向父节点报告有没有目标：空代表没有，非空代表某个目标或已经找到的祖先。如果左右都报告非空，两目标在两侧汇合于当前节点。若当前就是 p 或 q 可直接返回自身，因为题目保证另一目标存在。",
          "en": "A subtree returns null for no target or a node representing a target or an already found ancestor. Two nonnull child reports converge at the current node. A target node can return immediately because the problem guarantees both targets exist."
        },
        "steps": {
          "zh": [
            "空节点返回空；命中 p 或 q 返回自身",
            "递归取得左右报告 L、R",
            "两者都非空返回当前，否则返回非空一侧"
          ],
          "en": [
            "Return null for null, or the node itself when it is p or q",
            "Obtain reports L and R recursively",
            "Return current if both are nonnull, otherwise return the nonnull report"
          ]
        },
        "correctness": {
          "zh": "目标在不同子树时首次汇合点最低；目标互为祖先时祖先目标本身就是答案。存在性保证使这两种情况覆盖所有输入。",
          "en": "Separate targets first converge at their lowest shared node; if one target is an ancestor, that target is the answer. Guaranteed existence makes these cases exhaustive."
        },
        "time": "O(n)",
        "space": "O(h)",
        "complexity": {
          "zh": "最坏扫描整树；递归深度 h，可能达到 10⁵。此法用于理解递归，深链输入建议用父指针迭代法，避免运行时栈限制。 实际递归受 Python 递归深度和 Java 线程栈限制；提高 Python 深度不会消除内存开销，极深输入优先用显式栈。",
          "en": "Worst case visits the entire tree with h call frames, potentially 10⁵. Use the iterative parent-map method for deep chains to avoid runtime stack limits. Actual recursion is limited by Python recursion depth and the Java thread stack; raising Python’s limit does not remove memory costs. Prefer an explicit stack for extreme depth."
        },
        "python": "import sys\nclass Solution:\n    def lowestCommonAncestor(self, root, p, q):\n        sys.setrecursionlimit(max(sys.getrecursionlimit(),300000))\n        def visit(n):\n            if n is None or n is p or n is q:return n\n            left,right=visit(n.left),visit(n.right)\n            if left and right:return n\n            return left or right\n        return visit(root)\n",
        "java": "import java.util.*;\nclass Solution  {\n    public TreeNode lowestCommonAncestor(TreeNode root,TreeNode p,TreeNode q) {\n        if(root==null||root==p||root==q)return root;\n        TreeNode l=lowestCommonAncestor(root.left,p,q),r=lowestCommonAncestor(root.right,p,q);\n        if(l!=null&&r!=null)return root;\n        return l!=null?l:r;\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "visit(5)",
              "left=visit(2)"
            ],
            "note": {
              "zh": "从根向左搜索。",
              "en": "Search left from the root."
            }
          },
          {
            "cells": [
              "visit(2) returns node(2)",
              "visit(8) returns null"
            ],
            "note": {
              "zh": "2 命中目标，右树没有目标。",
              "en": "2 is a target; the right subtree contains no target."
            }
          },
          {
            "cells": [
              "L=node(2)",
              "R=null",
              "answer=node(2)"
            ],
            "note": {
              "zh": "只有左侧非空，向上传递节点 2。",
              "en": "Only the left report is nonnull, so propagate node 2."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/description/"
      }
    ],
    "slug": "lowest-common-ancestor-of-a-binary-tree",
    "title": {
      "zh": "二叉树的最近公共祖先",
      "en": "Lowest Common Ancestor of a Binary Tree"
    },
    "category": {
      "zh": "二叉树",
      "en": "Binary Trees"
    },
    "level": {
      "zh": "中等",
      "en": "Medium"
    }
  },
  {
    "id": 124,
    "statement": {
      "zh": "在二叉树中选择一条非空简单路径，使节点值总和最大，返回这个和。相邻节点必须有边连接，节点不能重复；路径不必经过根，也不必从根到叶。",
      "en": "Find the maximum sum of a nonempty simple path in a binary tree. Consecutive nodes must share an edge, no node may repeat, and the path need not include the root or end at leaves."
    },
    "constraints": {
      "zh": [
        "1 ≤ n ≤ 3×10⁴；节点值范围 [-1000,1000]"
      ],
      "en": [
        "1 ≤ n ≤ 3×10⁴; node values in [-1000,1000]"
      ]
    },
    "example": {
      "zh": "root=[-5,4,8,null,null,-2,3] → 11，最佳路径 8→3。",
      "en": "root=[-5,4,8,null,null,-2,3] → 11, from path 8→3."
    },
    "methods": [
      {
        "key": "recompute",
        "name": {
          "zh": "枚举转折点重算贡献",
          "en": "Recompute branch gains per pivot"
        },
        "intuition": {
          "zh": "一条路径在最高节点可以连接左右两支，但向父节点延伸时只能带一支，否则会分叉。负贡献应舍弃为 0，完整答案却不能取空路径。先对每个转折点单独计算左右最佳单支，作为理解基准。",
          "en": "At its highest node a path may join two branches, but a contribution passed to the parent may include only one. Drop negative branches to zero, but never allow an empty overall path. The baseline independently recomputes both branch gains for each pivot."
        },
        "steps": {
          "zh": [
            "用 gain 表示必须包含当前节点的最佳向下单支和",
            "L=max(0,gain(left))，R 同理；候选为 val+L+R",
            "向父返回 val+max(L,R)，答案初值为负无穷"
          ],
          "en": [
            "Define gain as the best downward single-branch sum including the node",
            "Let L=max(0,gain(left)) and similarly R; consider val+L+R",
            "Return val+max(L,R) upward; initialize the answer to negative infinity"
          ]
        },
        "correctness": {
          "zh": "任意简单路径都有唯一最高节点，其左右部分均可由最佳非负单支替换而不变差。枚举这些最高节点覆盖所有最优路径；负无穷初值保留全负树的非空答案。",
          "en": "Every simple path has a unique highest node. Replacing each side by its best nonnegative gain cannot hurt, so all pivots cover the optimum. Negative-infinity initialization preserves a valid answer for all-negative trees."
        },
        "time": "O(n²) worst case",
        "space": "O(h)",
        "complexity": {
          "zh": "链状树各转折点重算后代，最坏平方时间；栈深 O(h)。此基准用于比较，大输入用一次后序法。 实际递归受 Python 递归深度和 Java 线程栈限制；提高 Python 深度不会消除内存开销，极深输入优先用显式栈。 这是便于对比的基准解法，大规模最坏输入可能超时。",
          "en": "On a chain, repeated descendant scans give quadratic time and O(h) stack depth. This baseline is for comparison; use one-pass postorder for large inputs. Actual recursion is limited by Python recursion depth and the Java thread stack; raising Python’s limit does not remove memory costs. Prefer an explicit stack for extreme depth. This comparison baseline may time out on large worst-case inputs."
        },
        "python": "import sys\nclass Solution:\n    def maxPathSum(self, root):\n        sys.setrecursionlimit(max(sys.getrecursionlimit(),100000))\n        def gain(n):\n            if n is None:return 0\n            return n.val+max(0,gain(n.left),gain(n.right))\n        def solve(n):\n            if n is None:return float('-inf')\n            candidate=n.val+max(0,gain(n.left))+max(0,gain(n.right))\n            return max(candidate,solve(n.left),solve(n.right))\n        return solve(root)\n",
        "java": "import java.util.*;\nclass Solution  {\n    private int gain(TreeNode n) {\n        return n==null?0:n.val+Math.max(0,Math.max(gain(n.left),gain(n.right)));\n    }\n    public int maxPathSum(TreeNode n) {\n        if(n==null)return Integer.MIN_VALUE;\n        int c=n.val+Math.max(0,gain(n.left))+Math.max(0,gain(n.right));\n        return Math.max(c,Math.max(maxPathSum(n.left),maxPathSum(n.right)));\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "pivot=-5",
              "gain(4)=4",
              "gain(8)=11",
              "candidate=10"
            ],
            "note": {
              "zh": "对根重算左右单支，候选和为 10。",
              "en": "Recompute root branches; the crossing candidate is 10."
            }
          },
          {
            "cells": [
              "pivot=8",
              "gain(-2)=-2 → 0",
              "gain(3)=3",
              "candidate=11"
            ],
            "note": {
              "zh": "转折点 8 舍弃负分支，得到 11。",
              "en": "At pivot 8, drop the negative branch to obtain 11."
            }
          },
          {
            "cells": [
              "leaf candidates=4,-2,3",
              "answer=11"
            ],
            "note": {
              "zh": "其他转折点没有更大结果。",
              "en": "Other pivots cannot improve 11."
            }
          }
        ]
      },
      {
        "key": "postorder",
        "name": {
          "zh": "后序单支贡献",
          "en": "Postorder branch gains"
        },
        "intuition": {
          "zh": "一条路径在最高节点可以连接左右两支，但向父节点延伸时只能带一支，否则会分叉。负贡献应舍弃为 0，完整答案却不能取空路径。一次后序同时返回单支贡献并更新完整路径答案，消除重复。",
          "en": "At its highest node a path may join two branches, but a contribution passed to the parent may include only one. Drop negative branches to zero, but never allow an empty overall path. One postorder pass returns a branch gain and updates the complete-path answer."
        },
        "steps": {
          "zh": [
            "用 gain 表示必须包含当前节点的最佳向下单支和",
            "L=max(0,gain(left))，R 同理；候选为 val+L+R",
            "向父返回 val+max(L,R)，答案初值为负无穷"
          ],
          "en": [
            "Define gain as the best downward single-branch sum including the node",
            "Let L=max(0,gain(left)) and similarly R; consider val+L+R",
            "Return val+max(L,R) upward; initialize the answer to negative infinity"
          ]
        },
        "correctness": {
          "zh": "任意简单路径都有唯一最高节点，其左右部分均可由最佳非负单支替换而不变差。枚举这些最高节点覆盖所有最优路径；负无穷初值保留全负树的非空答案。",
          "en": "Every simple path has a unique highest node. Replacing each side by its best nonnegative gain cannot hurt, so all pivots cover the optimum. Negative-infinity initialization preserves a valid answer for all-negative trees."
        },
        "time": "O(n)",
        "space": "O(h)",
        "complexity": {
          "zh": "一次后序每节点常数工作，栈 O(h)。递归可能受深链栈限制；可用显式后序栈实现同样状态转移。 实际递归受 Python 递归深度和 Java 线程栈限制；提高 Python 深度不会消除内存开销，极深输入优先用显式栈。",
          "en": "One postorder visit does constant work per node and uses O(h) frames. An explicit postorder stack avoids deep-call-stack limits. Actual recursion is limited by Python recursion depth and the Java thread stack; raising Python’s limit does not remove memory costs. Prefer an explicit stack for extreme depth."
        },
        "python": "import sys\nclass Solution:\n    def maxPathSum(self, root):\n        sys.setrecursionlimit(max(sys.getrecursionlimit(),100000))\n        answer=float('-inf')\n        def gain(n):\n            nonlocal answer\n            if n is None:return 0\n            l=max(0,gain(n.left));r=max(0,gain(n.right))\n            answer=max(answer,n.val+l+r)\n            return n.val+max(l,r)\n        gain(root)\n        return answer\n",
        "java": "import java.util.*;\nclass Solution  {\n    private int answer;\n    public int maxPathSum(TreeNode root) {\n        answer=Integer.MIN_VALUE;\n        gain(root);\n        return answer;\n    }\n    private int gain(TreeNode n) {\n        if(n==null)return 0;\n        int l=Math.max(0,gain(n.left)),r=Math.max(0,gain(n.right));\n        answer=Math.max(answer,n.val+l+r);\n        return n.val+Math.max(l,r);\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "gain(4)=4",
              "gain(-2)=-2",
              "gain(3)=3"
            ],
            "note": {
              "zh": "叶子返回自身值，负值暂时也正常返回。",
              "en": "Leaves return their own values, including negatives."
            }
          },
          {
            "cells": [
              "node=8",
              "L=0",
              "R=3",
              "candidate=11",
              "return=11"
            ],
            "note": {
              "zh": "8 处舍弃负左支，更新答案。",
              "en": "At 8, discard the negative left gain and update the best."
            }
          },
          {
            "cells": [
              "node=-5",
              "L=4",
              "R=11",
              "candidate=10",
              "answer=11"
            ],
            "note": {
              "zh": "根连接两支只有 10，保留之前的 11。",
              "en": "The root’s crossing sum is 10, so retain 11."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/binary-tree-maximum-path-sum/description/"
      }
    ],
    "slug": "binary-tree-maximum-path-sum",
    "title": {
      "zh": "二叉树中的最大路径和",
      "en": "Binary Tree Maximum Path Sum"
    },
    "category": {
      "zh": "二叉树",
      "en": "Binary Trees"
    },
    "level": {
      "zh": "困难",
      "en": "Hard"
    }
  },
  {
    "id": 200,
    "statement": {
      "zh": "给定 m×n 的字符网格，字符 1 表示陆地、0 表示水。只通过上、下、左、右相邻的陆地连接，求独立陆地区域的数量。网格外均视为水；斜角接触不算连接。",
      "en": "Count the connected land regions in an m-by-n character grid: 1 is land and 0 is water. Land connects only across shared edges, never corners; everything outside the grid is water."
    },
    "constraints": {
      "zh": [
        "1 ≤ m,n ≤ 300",
        "网格为矩形；每格是字符 \"0\" 或 \"1\"。"
      ],
      "en": [
        "1 ≤ m,n ≤ 300",
        "Rectangular grid containing characters \"0\" and \"1\"."
      ]
    },
    "example": {
      "zh": "grid=[list(\"110\"),list(\"010\"),list(\"001\")] → 2。左上三格相连，右下单独一座岛。",
      "en": "grid=[list(\"110\"),list(\"010\"),list(\"001\")] → 2. Three connected cells form one island; the lower-right cell forms another."
    },
    "methods": [
      {
        "key": "dfs-stack",
        "name": {
          "zh": "显式栈深度优先洪泛",
          "en": "Stack-based flood fill"
        },
        "intuition": {
          "zh": "不要逐格判断岛屿形状，而是把一座岛整体消费掉。扫描到尚未标记的陆地，说明发现了一个新的连通块；工作表负责找到这块陆地的所有邻居。入表时立即改成水，防止同一格被两个邻居重复加入。栈优先沿一条路线深入，使用显式栈避免 Python 深递归限制。",
          "en": "Treat an island as one unit. An unmarked land cell starts a new component, and a worklist discovers every reachable neighbor. Mark a cell when adding it, so two neighbors cannot enqueue it twice. A stack follows one route deeply without relying on Python recursion."
        },
        "steps": {
          "zh": [
            "逐行扫描，水格跳过。",
            "发现陆地时计数加一，先改为水再加入工作表。",
            "反复取出位置，检查四个方向；只加入界内且仍为陆地的位置。",
            "工作表清空后继续扫描。本实现会修改 grid。"
          ],
          "en": [
            "Scan the grid and skip water.",
            "Count each new land seed; mark it before adding it to the worklist.",
            "Remove positions and discover unmarked land among their four neighbors.",
            "Resume scanning after exhaustion. This implementation mutates grid."
          ]
        },
        "correctness": {
          "zh": "每次洪泛只经过陆地邻接边，且会继续处理每个新发现的格子，因此恰好覆盖一个连通块。扫描为每个连通块启动一次洪泛，所以计数不漏不重。",
          "en": "Flood fill stays within land edges and expands every discovered cell, so it visits exactly one component. Each component starts exactly one fill."
        },
        "time": "O(mn)",
        "space": "O(mn)",
        "complexity": {
          "zh": "每格最多入表一次，每次检查四邻居；工作表最坏存储 O(mn) 个位置。原地标记省去 visited，但工作表仍需空间。",
          "en": "Each cell enters once and checks four neighbors. The worklist can occupy O(mn); in-place marking removes a visited array, not the worklist."
        },
        "python": "from typing import List\nfrom collections import deque\nclass Solution:\n    def numIslands(self, grid: List[List[str]]) -> int:\n        m, n, count = len(grid), len(grid[0]), 0\n        for r in range(m):\n            for c in range(n):\n                if grid[r][c] != '1': continue\n                count += 1\n                grid[r][c] = '0'\n                work = deque([(r,c)])\n                while work:\n                    x,y = work.pop()\n                    for dx,dy in ((1,0),(-1,0),(0,1),(0,-1)):\n                        a,b = x+dx,y+dy\n                        if 0 <= a < m and 0 <= b < n and grid[a][b] == '1':\n                            grid[a][b] = '0'\n                            work.append((a,b))\n        return count",
        "java": "import java.util.*;\nclass Solution {\n    public int numIslands(char[][] grid) {\n        int m=grid.length,n=grid[0].length,count=0;\n        int[] d={1,0,-1,0,1};\n        Deque<int[]> work=new ArrayDeque<>();\n        for(int r=0;r<m;r++) for(int c=0;c<n;c++) {\n            if(grid[r][c]!='1') continue;\n            count++; grid[r][c]='0'; work.addLast(new int[]{r,c});\n            while(!work.isEmpty()) {\n                int[] v=work.removeLast();\n                for(int k=0;k<4;k++) {\n                    int a=v[0]+d[k],b=v[1]+d[k+1];\n                    if(a>=0 && a<m && b>=0 && b<n && grid[a][b]=='1') {\n                        grid[a][b]='0'; work.addLast(new int[]{a,b});\n                    }\n                }\n            }\n        }\n        return count;\n    }\n}",
        "trace": [
          {
            "cells": [
              "110",
              "010",
              "001",
              "count=0"
            ],
            "note": {
              "zh": "开始扫描；对角格子不连通。",
              "en": "Start scanning; diagonal cells are disconnected."
            }
          },
          {
            "cells": [
              "000",
              "000",
              "001",
              "count=1"
            ],
            "note": {
              "zh": "从左上出发，整个三格连通块被标记。",
              "en": "Starting at the upper left marks its three-cell component."
            }
          },
          {
            "cells": [
              "000",
              "000",
              "000",
              "count=2"
            ],
            "note": {
              "zh": "右下格触发第二次洪泛，答案为 2。",
              "en": "The lower-right cell starts a second fill; answer 2."
            }
          }
        ]
      },
      {
        "key": "bfs",
        "name": {
          "zh": "队列广度优先洪泛",
          "en": "Queue-based flood fill"
        },
        "intuition": {
          "zh": "不要逐格判断岛屿形状，而是把一座岛整体消费掉。扫描到尚未标记的陆地，说明发现了一个新的连通块；工作表负责找到这块陆地的所有邻居。入表时立即改成水，防止同一格被两个邻居重复加入。队列按距离扩展，队列清空表示整座岛已处理。",
          "en": "Treat an island as one unit. An unmarked land cell starts a new component, and a worklist discovers every reachable neighbor. Mark a cell when adding it, so two neighbors cannot enqueue it twice. A queue expands by distance until the island is exhausted."
        },
        "steps": {
          "zh": [
            "逐行扫描，水格跳过。",
            "发现陆地时计数加一，先改为水再加入工作表。",
            "反复取出位置，检查四个方向；只加入界内且仍为陆地的位置。",
            "工作表清空后继续扫描。本实现会修改 grid。"
          ],
          "en": [
            "Scan the grid and skip water.",
            "Count each new land seed; mark it before adding it to the worklist.",
            "Remove positions and discover unmarked land among their four neighbors.",
            "Resume scanning after exhaustion. This implementation mutates grid."
          ]
        },
        "correctness": {
          "zh": "每次洪泛只经过陆地邻接边，且会继续处理每个新发现的格子，因此恰好覆盖一个连通块。扫描为每个连通块启动一次洪泛，所以计数不漏不重。",
          "en": "Flood fill stays within land edges and expands every discovered cell, so it visits exactly one component. Each component starts exactly one fill."
        },
        "time": "O(mn)",
        "space": "O(mn)",
        "complexity": {
          "zh": "每格最多入表一次，每次检查四邻居；工作表最坏存储 O(mn) 个位置。原地标记省去 visited，但工作表仍需空间。",
          "en": "Each cell enters once and checks four neighbors. The worklist can occupy O(mn); in-place marking removes a visited array, not the worklist."
        },
        "python": "from typing import List\nfrom collections import deque\nclass Solution:\n    def numIslands(self, grid: List[List[str]]) -> int:\n        m, n, count = len(grid), len(grid[0]), 0\n        for r in range(m):\n            for c in range(n):\n                if grid[r][c] != '1': continue\n                count += 1\n                grid[r][c] = '0'\n                work = deque([(r,c)])\n                while work:\n                    x,y = work.popleft()\n                    for dx,dy in ((1,0),(-1,0),(0,1),(0,-1)):\n                        a,b = x+dx,y+dy\n                        if 0 <= a < m and 0 <= b < n and grid[a][b] == '1':\n                            grid[a][b] = '0'\n                            work.append((a,b))\n        return count",
        "java": "import java.util.*;\nclass Solution {\n    public int numIslands(char[][] grid) {\n        int m=grid.length,n=grid[0].length,count=0;\n        int[] d={1,0,-1,0,1};\n        Deque<int[]> work=new ArrayDeque<>();\n        for(int r=0;r<m;r++) for(int c=0;c<n;c++) {\n            if(grid[r][c]!='1') continue;\n            count++; grid[r][c]='0'; work.addLast(new int[]{r,c});\n            while(!work.isEmpty()) {\n                int[] v=work.removeFirst();\n                for(int k=0;k<4;k++) {\n                    int a=v[0]+d[k],b=v[1]+d[k+1];\n                    if(a>=0 && a<m && b>=0 && b<n && grid[a][b]=='1') {\n                        grid[a][b]='0'; work.addLast(new int[]{a,b});\n                    }\n                }\n            }\n        }\n        return count;\n    }\n}",
        "trace": [
          {
            "cells": [
              "110",
              "010",
              "001",
              "count=0"
            ],
            "note": {
              "zh": "开始扫描；对角格子不连通。",
              "en": "Start scanning; diagonal cells are disconnected."
            }
          },
          {
            "cells": [
              "000",
              "000",
              "001",
              "count=1"
            ],
            "note": {
              "zh": "从左上出发，整个三格连通块被标记。",
              "en": "Starting at the upper left marks its three-cell component."
            }
          },
          {
            "cells": [
              "000",
              "000",
              "000",
              "count=2"
            ],
            "note": {
              "zh": "右下格触发第二次洪泛，答案为 2。",
              "en": "The lower-right cell starts a second fill; answer 2."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/number-of-islands/"
      }
    ],
    "slug": "number-of-islands",
    "title": {
      "zh": "岛屿数量",
      "en": "Number of Islands"
    },
    "category": {
      "zh": "图论",
      "en": "Graphs"
    },
    "level": {
      "zh": "中等",
      "en": "Medium"
    }
  },
  {
    "id": 994,
    "statement": {
      "zh": "矩形网格中 0 是空位，1 是新鲜橘子，2 是腐烂橘子。每过一分钟，所有腐烂橘子同时感染上下左右的新鲜邻居。求没有新鲜橘子时最少经过的分钟数；无法全部感染返回 -1，一开始没有新鲜橘子返回 0。",
      "en": "In a rectangular grid, 0 is empty, 1 is fresh and 2 is rotten. Once per minute, every rotten orange simultaneously infects its fresh edge-neighbors. Return the earliest minute with no fresh oranges, or -1 if unreachable; return 0 when none are fresh initially."
    },
    "constraints": {
      "zh": [
        "1 ≤ m,n ≤ 10",
        "每格值为 0、1 或 2。"
      ],
      "en": [
        "1 ≤ m,n ≤ 10",
        "Every cell is 0, 1 or 2."
      ]
    },
    "example": {
      "zh": "[[2,1,1],[0,1,0]] → 2；第一分钟上中感染，第二分钟右上和下中同时感染。",
      "en": "[[2,1,1],[0,1,0]] → 2. The upper middle cell rots first; two neighbors rot in minute two."
    },
    "methods": [
      {
        "key": "multi-source-bfs",
        "name": {
          "zh": "多源 BFS 按分钟推进",
          "en": "Multi-source BFS by minute"
        },
        "intuition": {
          "zh": "单个橘子依次传播会漏掉“同时发生”的语义。把全部初始腐烂位置作为第 0 层，下一层才是第 1 分钟感染的位置。维护 fresh 可以在最后一次有效传播后直接停止，避免把最后空转的一轮也算进分钟。",
          "en": "Separate simultaneous events into layers. All initially rotten cells belong to layer zero; their fresh neighbors form minute one. Tracking fresh oranges stops the process after the final useful layer instead of counting an extra empty minute."
        },
        "steps": {
          "zh": [
            "扫描并收集全部腐烂起点，统计 fresh。",
            "每轮固定当前队列大小，只处理这一批位置。",
            "邻居从 1 改 2 时立即减 fresh 并入队；新入队的下一轮才处理。",
            "每轮分钟加一；结束后 fresh 为零返回分钟，否则返回 -1。"
          ],
          "en": [
            "Collect all rotten sources and count fresh cells.",
            "Freeze the queue size at the beginning of each minute.",
            "Mark fresh neighbors rotten immediately, decrement fresh and enqueue for the next layer.",
            "Increment minutes per layer; return -1 if fresh cells remain after the queue empties."
          ]
        },
        "correctness": {
          "zh": "BFS 第 t 层恰好是到最近腐烂源的可达最短距离为 t 的橘子，因此层数与同步感染时间一致。空位不入队，不可达的新鲜橘子不会被误计为感染。",
          "en": "Layer t contains oranges at shortest reachable distance t from any source. Those are exactly the cells infected at minute t. Empty cells block propagation."
        },
        "time": "O(mn)",
        "space": "O(mn)",
        "complexity": {
          "zh": "初始扫描和每格至多一次入队均为 O(mn)；队列最坏 O(mn)。代码原地修改网格。",
          "en": "Initial scanning plus one enqueue per cell is O(mn). The queue needs O(mn) worst-case space. The grid is mutated."
        },
        "python": "from typing import List\nfrom collections import deque\nclass Solution:\n    def orangesRotting(self, grid: List[List[int]]) -> int:\n        m,n=len(grid),len(grid[0]); q=deque(); fresh=0; minutes=0\n        for r in range(m):\n            for c in range(n):\n                if grid[r][c]==2: q.append((r,c))\n                elif grid[r][c]==1: fresh+=1\n        while q and fresh:\n            for _ in range(len(q)):\n                r,c=q.popleft()\n                for dr,dc in ((1,0),(-1,0),(0,1),(0,-1)):\n                    a,b=r+dr,c+dc\n                    if 0<=a<m and 0<=b<n and grid[a][b]==1:\n                        grid[a][b]=2; fresh-=1; q.append((a,b))\n            minutes+=1\n        return minutes if fresh==0 else -1",
        "java": "import java.util.*;\nclass Solution {\n    public int orangesRotting(int[][] grid) {\n        int m=grid.length,n=grid[0].length,fresh=0,minutes=0;\n        int[] d={1,0,-1,0,1}; Deque<int[]> q=new ArrayDeque<>();\n        for(int r=0;r<m;r++) for(int c=0;c<n;c++) {\n            if(grid[r][c]==2) q.addLast(new int[]{r,c});\n            else if(grid[r][c]==1) fresh++;\n        }\n        while(!q.isEmpty() && fresh>0) {\n            int size=q.size();\n            while(size-->0) {\n                int[] v=q.removeFirst();\n                for(int k=0;k<4;k++) {\n                    int a=v[0]+d[k],b=v[1]+d[k+1];\n                    if(a>=0 && a<m && b>=0 && b<n && grid[a][b]==1) {\n                        grid[a][b]=2; fresh--; q.addLast(new int[]{a,b});\n                    }\n                }\n            }\n            minutes++;\n        }\n        return fresh==0 ? minutes : -1;\n    }\n}",
        "trace": [
          {
            "cells": [
              "211",
              "010",
              "t=0; fresh=3"
            ],
            "note": {
              "zh": "全部初始腐烂橘子同时入队。",
              "en": "Enqueue all initially rotten oranges."
            }
          },
          {
            "cells": [
              "221",
              "010",
              "t=1; fresh=2"
            ],
            "note": {
              "zh": "这一分钟只感染上中，不能立刻再传播。",
              "en": "Only the upper middle rots this minute; no immediate second hop."
            }
          },
          {
            "cells": [
              "222",
              "020",
              "t=2; fresh=0"
            ],
            "note": {
              "zh": "下一层同时感染两格，剩余新鲜数归零。",
              "en": "The next layer infects two cells simultaneously; no fresh oranges remain."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/rotting-oranges/"
      }
    ],
    "slug": "rotting-oranges",
    "title": {
      "zh": "腐烂的橘子",
      "en": "Rotting Oranges"
    },
    "category": {
      "zh": "图论",
      "en": "Graphs"
    },
    "level": {
      "zh": "中等",
      "en": "Medium"
    }
  },
  {
    "id": 207,
    "statement": {
      "zh": "课程编号为 0 到 numCourses-1。每个依赖 [a,b] 表示必须先完成 b 才能学习 a。判断是否存在一种安排使所有课程都能完成；没有依赖的课程也必须计入。",
      "en": "Courses are numbered from 0 to numCourses-1. A pair [a,b] requires completing b before a. Decide whether some ordering completes every course, including isolated courses."
    },
    "constraints": {
      "zh": [
        "1 ≤ numCourses ≤ 2000",
        "0 ≤ prerequisites.length ≤ 5000；每项含两个合法课程编号。",
        "依赖对互不重复。"
      ],
      "en": [
        "1 ≤ numCourses ≤ 2000",
        "0 ≤ prerequisites.length ≤ 5000; each pair contains valid course IDs.",
        "Dependency pairs are distinct."
      ]
    },
    "example": {
      "zh": "numCourses=3, prerequisites=[[1,0],[2,1]] → true；可按 0,1,2 完成。",
      "en": "numCourses=3, prerequisites=[[1,0],[2,1]] → true; take 0, then 1, then 2."
    },
    "methods": [
      {
        "key": "kahn",
        "name": {
          "zh": "入度消除 / Kahn 拓扑排序",
          "en": "Indegree elimination / Kahn ordering"
        },
        "intuition": {
          "zh": "把“还有几门先修课没完成”存为入度。入度为 0 的课程可以立即学习；完成它等价于删除它的出边。若还有环，环内每门课始终等待另一门课，因此无法进入队列。这个模型也自然处理多条互不相连的依赖链。",
          "en": "Store how many prerequisites remain as each course’s indegree. Zero-indegree courses are ready; finishing one removes its outgoing dependencies. A directed cycle can never unlock its first course, even if unrelated chains finish successfully."
        },
        "steps": {
          "zh": [
            "按 b→a 建邻接表，并给 a 入度加一。",
            "所有入度为零课程入队，不仅是课程 0。",
            "出队一门就增加完成数，减少其后续课程入度。",
            "后续课程恰好降到零才入队；最终比较完成数和总课程数。"
          ],
          "en": [
            "Build edges b→a and increase indegree[a].",
            "Enqueue every zero-indegree course.",
            "Pop one course, count it and reduce indegrees of its successors.",
            "Enqueue successors exactly when they reach zero; compare processed count with all courses."
          ]
        },
        "correctness": {
          "zh": "队列中的课程没有尚未完成的先修课，所以每一步均合法。若未处理节点仍存在却无零入度节点，沿其先修边不断追溯必重复节点，形成环，无法完成。",
          "en": "Every queued course is legal to take. If unprocessed courses remain with no zero indegree, repeatedly following a remaining prerequisite eventually repeats a vertex, proving a cycle."
        },
        "time": "O(V+E)",
        "space": "O(V+E)",
        "complexity": {
          "zh": "V 为课程数，E 为依赖数。每个顶点入队一次、每条边减少一次入度；邻接表保存 V+E 个条目，队列与入度数组 O(V)。",
          "en": "V courses and E edges are processed once. Adjacency storage is O(V+E); queue and indegrees use O(V)."
        },
        "python": "from typing import List\nfrom collections import deque\nclass Solution:\n    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:\n        graph=[[] for _ in range(numCourses)]; degree=[0]*numCourses\n        for a,b in prerequisites: graph[b].append(a); degree[a]+=1\n        q=deque(i for i in range(numCourses) if degree[i]==0); done=0\n        while q:\n            v=q.popleft(); done+=1\n            for w in graph[v]:\n                degree[w]-=1\n                if degree[w]==0: q.append(w)\n        return done==numCourses",
        "java": "import java.util.*;\nclass Solution {\n    public boolean canFinish(int numCourses, int[][] prerequisites) {\n        List<List<Integer>> graph=new ArrayList<>();\n        for(int i=0;i<numCourses;i++) graph.add(new ArrayList<>());\n        int[] degree=new int[numCourses];\n        for(int[] e:prerequisites) {graph.get(e[1]).add(e[0]);degree[e[0]]++;}\n        Deque<Integer> q=new ArrayDeque<>();\n        for(int i=0;i<numCourses;i++) if(degree[i]==0) q.add(i);\n        int done=0;\n        while(!q.isEmpty()) {\n            int v=q.remove();done++;\n            for(int w:graph.get(v)) if(--degree[w]==0) q.add(w);\n        }\n        return done==numCourses;\n    }\n}",
        "trace": [
          {
            "cells": [
              "0 -> 1 -> 2",
              "degree=[0,1,1]",
              "queue=[0]"
            ],
            "note": {
              "zh": "只有课程 0 无待完成先修课。",
              "en": "Only course 0 has no outstanding prerequisite."
            }
          },
          {
            "cells": [
              "done=[0]",
              "degree=[0,0,1]",
              "queue=[1]"
            ],
            "note": {
              "zh": "完成 0 后释放 1。",
              "en": "Finishing 0 unlocks 1."
            }
          },
          {
            "cells": [
              "done=[0,1]",
              "degree=[0,0,0]",
              "queue=[2]"
            ],
            "note": {
              "zh": "完成 1 后释放 2。",
              "en": "Finishing 1 unlocks 2."
            }
          },
          {
            "cells": [
              "done=[0,1,2]",
              "3 == numCourses",
              "true"
            ],
            "note": {
              "zh": "完成数等于课程总数。",
              "en": "Processed count equals all courses."
            }
          }
        ]
      },
      {
        "key": "three-color-dfs",
        "name": {
          "zh": "显式栈三色 DFS 判环",
          "en": "Iterative three-color cycle detection"
        },
        "intuition": {
          "zh": "拓扑排序从可学习课程出发，DFS 则沿依赖链追问是否会回到自己。用 0=未发现、1=当前路径中、2=已处理区分三种状态：只有遇到 1 才是环，遇到 2 只是复用已检查的子图。显式栈还记录每个节点下一个要探索的邻居，避免长链导致 Python 递归深度超限。",
          "en": "Instead of removing ready courses, follow dependency paths and detect a return to the active path. Colors are 0 undiscovered, 1 active and 2 completed. Only an edge to color 1 proves a cycle; color 2 is a previously checked subgraph. Store the next neighbor index in an explicit stack to avoid Python recursion limits on long chains."
        },
        "steps": {
          "zh": [
            "建 b→a 邻接表，并将所有节点标 0。",
            "对每个未发现节点启动栈，入栈时标 1。",
            "栈顶还有未检查邻居时，遇 1 返回 false，遇 0 则标记入栈。",
            "邻居全部检查完才标 2 并出栈；所有分量都结束则 true。"
          ],
          "en": [
            "Build b→a adjacency lists and initialize all colors to 0.",
            "Start a stack from every undiscovered vertex and mark it active.",
            "Advance the top frame’s next edge: color 1 means a cycle; push color 0.",
            "After all neighbors finish, mark the vertex 2 and pop; accept if all components finish."
          ]
        },
        "correctness": {
          "zh": "栈中的节点构成一条 DFS 路径，指向标记 1 的边与该路径一起组成有向环。没有这样的边时，每个节点的后继均能完成，再将自身完成，所以整个图无环。",
          "en": "Active frames form a DFS path, so an edge back to an active vertex closes a directed cycle. Without such edges, each vertex completes after its successors, proving the graph acyclic."
        },
        "time": "O(V+E)",
        "space": "O(V+E)",
        "complexity": {
          "zh": "每个节点只入栈一次，每条边只由对应帧扫描一次。邻接表 O(V+E)，颜色数组与显式栈 O(V)；没有语言调用栈深度限制。",
          "en": "Each vertex is pushed once and each edge is scanned once. Adjacency takes O(V+E), colors and frames O(V), without language recursion-depth limits."
        },
        "python": "from typing import List\nclass Solution:\n    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:\n        graph=[[] for _ in range(numCourses)]\n        for a,b in prerequisites: graph[b].append(a)\n        color=[0]*numCourses\n        for start in range(numCourses):\n            if color[start]: continue\n            color[start]=1; stack=[[start,0]]\n            while stack:\n                v,i=stack[-1]\n                if i==len(graph[v]):\n                    color[v]=2; stack.pop(); continue\n                w=graph[v][i]; stack[-1][1]+=1\n                if color[w]==1: return False\n                if color[w]==0:\n                    color[w]=1; stack.append([w,0])\n        return True",
        "java": "import java.util.*;\nclass Solution {\n    public boolean canFinish(int numCourses,int[][] prerequisites) {\n        List<List<Integer>> graph=new ArrayList<>();\n        for(int i=0;i<numCourses;i++) graph.add(new ArrayList<>());\n        for(int[] e:prerequisites) graph.get(e[1]).add(e[0]);\n        int[] color=new int[numCourses];Deque<int[]> stack=new ArrayDeque<>();\n        for(int start=0;start<numCourses;start++) {\n            if(color[start]!=0) continue;\n            color[start]=1;stack.push(new int[]{start,0});\n            while(!stack.isEmpty()) {\n                int[] f=stack.peek();int v=f[0];\n                if(f[1]==graph.get(v).size()) {color[v]=2;stack.pop();continue;}\n                int w=graph.get(v).get(f[1]++);\n                if(color[w]==1) return false;\n                if(color[w]==0) {color[w]=1;stack.push(new int[]{w,0});}\n            }\n        }\n        return true;\n    }\n}",
        "trace": [
          {
            "cells": [
              "0 -> 1 -> 2",
              "color=[0,0,0]"
            ],
            "note": {
              "zh": "开始时全部未发现。",
              "en": "All vertices begin undiscovered."
            }
          },
          {
            "cells": [
              "stack=[0,1,2]",
              "color=[1,1,1]"
            ],
            "note": {
              "zh": "沿依赖边深入，没有遇到当前路径内的回边。",
              "en": "Follow the path without encountering a back edge."
            }
          },
          {
            "cells": [
              "pop 2, then 1, then 0",
              "color=[2,2,2]",
              "true"
            ],
            "note": {
              "zh": "后继检查完逐个退出，所有课程完成 DFS。",
              "en": "Finish successors and pop each frame; all vertices complete."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/course-schedule/"
      }
    ],
    "slug": "course-schedule",
    "title": {
      "zh": "课程表",
      "en": "Course Schedule"
    },
    "category": {
      "zh": "图论",
      "en": "Graphs"
    },
    "level": {
      "zh": "中等",
      "en": "Medium"
    }
  },
  {
    "id": 208,
    "statement": {
      "zh": "实现 Trie 类：构造空字典，insert(word) 插入单词，search(word) 判断完整单词是否曾插入，startsWith(prefix) 判断是否有已插入单词以该前缀开头。完整单词与仅存在的前缀必须区分。",
      "en": "Implement Trie with an empty constructor, insert(word), search(word) for whole-word membership, and startsWith(prefix) for a prefix of any inserted word. A path may exist even when it is not a complete inserted word."
    },
    "constraints": {
      "zh": [
        "word 与 prefix 长度为 1 到 2000，只含小写英文字母。",
        "三种操作总调用次数不超过 30000。"
      ],
      "en": [
        "word and prefix have length 1–2000 and contain lowercase English letters.",
        "At most 30000 total calls to the three operations."
      ]
    },
    "example": {
      "zh": "insert(\"cat\") 后 search(\"ca\")=false，startsWith(\"ca\")=true；再 insert(\"ca\") 后 search(\"ca\")=true。",
      "en": "After insert(\"cat\"), search(\"ca\") is false but startsWith(\"ca\") is true. Inserting \"ca\" makes search(\"ca\") true."
    },
    "methods": [
      {
        "key": "trie",
        "name": {
          "zh": "逐字符前缀树",
          "en": "Character-by-character trie"
        },
        "intuition": {
          "zh": "公共前缀不必重复保存：cat 与 car 共用 c、a 两条边，到最后一个字母才分叉。节点需要一个独立的终止标记，因为路径 ca 存在并不代表 ca 被插入。Python 用字典按需存孩子，Java 用固定 26 项数组，查询过程中都不创建节点。",
          "en": "Share common prefixes: cat and car reuse the c and a edges before branching. An end flag distinguishes an inserted word from a mere prefix. Python stores only existing children in dictionaries; Java uses 26-entry child arrays. Queries never create nodes."
        },
        "steps": {
          "zh": [
            "插入从根出发，缺少字符边时创建孩子。",
            "走完 word 后在当前节点标记 end。",
            "查找使用公共 walk：任一字符边不存在就失败。",
            "search 还检查 end；startsWith 只检查路径是否存在。"
          ],
          "en": [
            "Insert walks from the root and creates missing edges.",
            "Mark the final node as an end of word.",
            "A shared walk helper fails on the first missing edge.",
            "search checks the end flag; startsWith only checks that the path exists."
          ]
        },
        "correctness": {
          "zh": "根到节点的字符序列唯一确定一个前缀。插入恰好补全该路径并标记单词末尾，因此路径存在等价于前缀存在，路径末尾有标记等价于完整单词存在。",
          "en": "A root-to-node path uniquely identifies its prefix. Insertion creates precisely that path and marks its end; path existence and terminal marking implement the two distinct queries."
        },
        "time": "O(L) per operation",
        "space": "O(S) stored; O(1) query auxiliary",
        "complexity": {
          "zh": "L 是操作字符串长度，S 是所有插入单词长度之和。节点数至多 S+1；26 是常数。Python 字典查询采用平均 O(1) 模型；查询和插入的额外游标空间 O(1)。",
          "en": "L is the operation length and S the sum of inserted lengths. There are at most S+1 nodes; 26 is constant. Python dictionary operations are expected O(1). Traversal uses O(1) auxiliary cursor space."
        },
        "python": "class Trie:\n    def __init__(self):\n        self.children = {}\n        self.end = False\n    def insert(self, word: str) -> None:\n        node = self\n        for ch in word:\n            if ch not in node.children: node.children[ch] = Trie()\n            node = node.children[ch]\n        node.end = True\n    def _walk(self, text):\n        node = self\n        for ch in text:\n            if ch not in node.children: return None\n            node = node.children[ch]\n        return node\n    def search(self, word: str) -> bool:\n        node = self._walk(word)\n        return node is not None and node.end\n    def startsWith(self, prefix: str) -> bool:\n        return self._walk(prefix) is not None",
        "java": "class Trie {\n    private final Trie[] children=new Trie[26];\n    private boolean end;\n    public Trie() {}\n    public void insert(String word) {\n        Trie node=this;\n        for(int i=0;i<word.length();i++) {\n            int k=word.charAt(i)-'a';\n            if(node.children[k]==null) node.children[k]=new Trie();\n            node=node.children[k];\n        }\n        node.end=true;\n    }\n    private Trie walk(String s) {\n        Trie node=this;\n        for(int i=0;i<s.length();i++) {\n            node=node.children[s.charAt(i)-'a'];\n            if(node==null) return null;\n        }\n        return node;\n    }\n    public boolean search(String word) {Trie node=walk(word);return node!=null && node.end;}\n    public boolean startsWith(String prefix) {return walk(prefix)!=null;}\n}",
        "trace": [
          {
            "cells": [
              "root -> c -> a -> t*"
            ],
            "note": {
              "zh": "插入 cat；星号代表完整单词末尾。",
              "en": "Insert cat; the star marks a complete word."
            }
          },
          {
            "cells": [
              "search(ca)=false",
              "startsWith(ca)=true"
            ],
            "note": {
              "zh": "ca 路径存在，但 a 没有终止标记。",
              "en": "The ca path exists, but a is not terminal."
            }
          },
          {
            "cells": [
              "root -> c -> a* -> t*",
              "search(ca)=true"
            ],
            "note": {
              "zh": "插入 ca 只需给已有 a 节点加标记。",
              "en": "Inserting ca only marks the existing a node."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/implement-trie-prefix-tree/"
      }
    ],
    "slug": "implement-trie-prefix-tree",
    "title": {
      "zh": "实现 Trie (前缀树)",
      "en": "Implement Trie (Prefix Tree)"
    },
    "category": {
      "zh": "图论",
      "en": "Graphs"
    },
    "level": {
      "zh": "中等",
      "en": "Medium"
    }
  },
  {
    "id": 46,
    "statement": {
      "zh": "输入互不相同的整数数组 nums，返回所有使用每个元素恰好一次的排列。元素顺序不同就是不同排列，结果顺序不限。",
      "en": "Return every ordering of the distinct integers in nums, using each element exactly once. The order of returned permutations does not matter."
    },
    "constraints": {
      "zh": [
        "1 ≤ n ≤ 6",
        "-10 ≤ nums[i] ≤ 10，元素互不相同。"
      ],
      "en": [
        "1 ≤ n ≤ 6",
        "-10 ≤ nums[i] ≤ 10; all elements differ."
      ]
    },
    "example": {
      "zh": "nums=[2,4] → [[2,4],[4,2]]。",
      "en": "nums=[2,4] → [[2,4],[4,2]]."
    },
    "methods": [
      {
        "key": "used-backtrack",
        "name": {
          "zh": "已使用标记回溯",
          "en": "Backtracking with used flags"
        },
        "intuition": {
          "zh": "把排列看成依次填写 n 个位置。每个位置可以填任何尚未使用的数；used 表示本条路径的选择，不能跨分支永久占用。到叶子时复制 path，因为后续撤销操作还会改变同一个列表。",
          "en": "Fill n positions in order. Each position may take any unused value. used belongs to the current path, not all branches. Copy path at a leaf because later backtracking mutates the same list."
        },
        "steps": {
          "zh": [
            "维护 path 与 used[n]。",
            "枚举未使用下标，标记并把数加入 path。",
            "递归填下一位；返回时弹出并清除标记。",
            "path 长度为 n 时复制到答案。"
          ],
          "en": [
            "Maintain path and used[n].",
            "Choose an unused index, mark it and append its value.",
            "Recurse, then pop the value and clear the flag.",
            "Copy a length-n path to the answer."
          ]
        },
        "correctness": {
          "zh": "任意排列都有唯一的下标选择序列；每层枚举所有合法选择，且 used 禁止重复用元素，因此完整、无重复。",
          "en": "Every permutation has one unique index-choice sequence. Enumerating all unused choices generates every valid sequence once."
        },
        "time": "O(n·n!)",
        "space": "O(n) auxiliary + O(n·n!) output",
        "complexity": {
          "zh": "n! 个结果各复制 n 项；内部节点扫描 n 个候选也被 O(n·n!) 上界覆盖。栈、path 和 used 各 O(n)。",
          "en": "Copying n! results costs O(n·n!). Candidate scans fit the same bound. Stack, path and used each occupy O(n)."
        },
        "python": "from typing import List\nclass Solution:\n    def permute(self, nums: List[int]) -> List[List[int]]:\n        ans=[]; path=[]; used=[False]*len(nums)\n        def dfs():\n            if len(path)==len(nums): ans.append(path.copy()); return\n            for i,x in enumerate(nums):\n                if used[i]: continue\n                used[i]=True; path.append(x)\n                dfs()\n                path.pop(); used[i]=False\n        dfs()\n        return ans",
        "java": "import java.util.*;\nclass Solution {\n    public List<List<Integer>> permute(int[] nums) {\n        List<List<Integer>> ans=new ArrayList<>();\n        dfs(nums,new boolean[nums.length],new ArrayList<>(),ans);return ans;\n    }\n    private void dfs(int[] a,boolean[] used,List<Integer> path,List<List<Integer>> ans) {\n        if(path.size()==a.length) {ans.add(new ArrayList<>(path));return;}\n        for(int i=0;i<a.length;i++) if(!used[i]) {\n            used[i]=true;path.add(a[i]);dfs(a,used,path,ans);\n            path.remove(path.size()-1);used[i]=false;\n        }\n    }\n}",
        "trace": [
          {
            "cells": [
              "path=[]",
              "choices=[2,4]"
            ],
            "note": {
              "zh": "第一个位置可选两个值。",
              "en": "Either value can fill the first position."
            }
          },
          {
            "cells": [
              "path=[2,4]",
              "save [2,4]"
            ],
            "note": {
              "zh": "先选 2，剩余位置只能选 4，保存结果。",
              "en": "Choose 2, then the remaining 4; save the result."
            }
          },
          {
            "cells": [
              "path=[]",
              "path=[4,2]",
              "save [4,2]"
            ],
            "note": {
              "zh": "撤销第一条路径，再以 4 开头，得到另一种排列。",
              "en": "Undo the first path and choose 4 first to obtain the other permutation."
            }
          }
        ]
      },
      {
        "key": "swap",
        "name": {
          "zh": "交换法固定前缀",
          "en": "Fix a prefix with swaps"
        },
        "intuition": {
          "zh": "当数组前 k 位已固定时，后面的元素正好都是未使用元素，因此不必再维护 used。把每个候选交换到 k，再递归处理后缀。交换必须恢复，否则下一次选择面对的数组已变化，容易漏解或重解。",
          "en": "Once the first k positions are fixed, the suffix contains exactly the unused values. Swap each candidate into position k and recurse. Undo each swap so sibling branches start from the same arrangement."
        },
        "steps": {
          "zh": [
            "从 k=0 开始。",
            "将下标 i∈[k,n) 的元素交换到 k。",
            "递归 k+1，再交换回来。",
            "k=n 时复制整个数组。"
          ],
          "en": [
            "Start with k=0.",
            "Swap each candidate i in [k,n) into k.",
            "Recurse on k+1 and undo the swap.",
            "Copy the array when k=n."
          ]
        },
        "correctness": {
          "zh": "每个分支确定第 k 位的一个不同值，子递归枚举剩余值的所有排列。不同分支的第 k 位不同，不可能重复。",
          "en": "Branches choose distinct values for position k; recursion enumerates all suffix permutations. Different choices at k cannot produce the same result."
        },
        "time": "O(n·n!)",
        "space": "O(n) auxiliary + O(n·n!) output",
        "complexity": {
          "zh": "叶子复制主导时间。递归深度 n，无 used 数组；原数组被临时交换但返回前恢复。",
          "en": "Leaf copying dominates runtime. Recursion depth is n; the input is temporarily swapped but restored before returning."
        },
        "python": "from typing import List\nclass Solution:\n    def permute(self, nums: List[int]) -> List[List[int]]:\n        ans=[]\n        def dfs(k):\n            if k==len(nums): ans.append(nums.copy()); return\n            for i in range(k,len(nums)):\n                nums[k],nums[i]=nums[i],nums[k]\n                dfs(k+1)\n                nums[k],nums[i]=nums[i],nums[k]\n        dfs(0)\n        return ans",
        "java": "import java.util.*;\nclass Solution {\n    public List<List<Integer>> permute(int[] nums) {\n        List<List<Integer>> ans=new ArrayList<>();dfs(nums,0,ans);return ans;\n    }\n    private void dfs(int[] a,int k,List<List<Integer>> ans) {\n        if(k==a.length) {List<Integer> row=new ArrayList<>();for(int x:a) row.add(x);ans.add(row);return;}\n        for(int i=k;i<a.length;i++) {\n            swap(a,k,i);dfs(a,k+1,ans);swap(a,k,i);\n        }\n    }\n    private void swap(int[] a,int i,int j) {int t=a[i];a[i]=a[j];a[j]=t;}\n}",
        "trace": [
          {
            "cells": [
              "[2,4]",
              "k=0"
            ],
            "note": {
              "zh": "第一位先与自身交换。",
              "en": "First swap position zero with itself."
            }
          },
          {
            "cells": [
              "[2,4]",
              "k=2; save"
            ],
            "note": {
              "zh": "剩余一位固定后保存。",
              "en": "Fix the remaining position and save."
            }
          },
          {
            "cells": [
              "swap(0,1): [4,2]",
              "k=2; save"
            ],
            "note": {
              "zh": "撤销后把 4 换到首位，得到另一排列。",
              "en": "Undo, then swap 4 into the first position for the other permutation."
            }
          },
          {
            "cells": [
              "restore: [2,4]"
            ],
            "note": {
              "zh": "全部交换撤销，输入恢复。",
              "en": "Undo all swaps to restore the input."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/permutations/"
      }
    ],
    "slug": "permutations",
    "title": {
      "zh": "全排列",
      "en": "Permutations"
    },
    "category": {
      "zh": "回溯",
      "en": "Backtracking"
    },
    "level": {
      "zh": "中等",
      "en": "Medium"
    }
  },
  {
    "id": 78,
    "statement": {
      "zh": "给定没有重复元素的 nums，返回所有子集，包含空集和全集。子集不考虑顺序，答案中不能出现同一子集的重复表示；结果排列顺序不限。",
      "en": "Return every subset of distinct nums, including the empty set and the full set. Subset order is irrelevant, and each subset must appear once."
    },
    "constraints": {
      "zh": [
        "1 ≤ n ≤ 10",
        "-10 ≤ nums[i] ≤ 10，元素互不相同。"
      ],
      "en": [
        "1 ≤ n ≤ 10",
        "-10 ≤ nums[i] ≤ 10; elements are distinct."
      ]
    },
    "example": {
      "zh": "nums=[2,5] → [[],[2],[5],[2,5]]。",
      "en": "nums=[2,5] → [[],[2],[5],[2,5]]."
    },
    "methods": [
      {
        "key": "include-exclude",
        "name": {
          "zh": "选或不选的决策树",
          "en": "Include-or-exclude recursion"
        },
        "intuition": {
          "zh": "对子集而言，每个数只需做一次二元决定：要或不要。按数组下标向右处理，保证同一组元素不会因为选择顺序不同被重复生成。只有所有元素都决定完才保存 path，空集来自一路“不选”。",
          "en": "A subset makes one binary decision per element. Moving strictly by index prevents duplicates caused by choosing the same elements in different orders. Save only after all decisions; choosing nothing produces the empty subset."
        },
        "steps": {
          "zh": [
            "dfs(i) 处理第 i 个数。",
            "先不选，递归 i+1。",
            "再加入 nums[i]，递归 i+1，返回后撤销。",
            "i=n 时复制 path。"
          ],
          "en": [
            "dfs(i) decides about element i.",
            "Recurse without it.",
            "Append it, recurse, then undo.",
            "Copy path when i=n."
          ]
        },
        "correctness": {
          "zh": "每个子集对应唯一的 n 位选取向量，递归树恰好枚举全部这些向量。",
          "en": "Every subset corresponds to one unique n-bit choice vector, all of which appear in the recursion tree."
        },
        "time": "O(n·2^n)",
        "space": "O(n) auxiliary + O(n·2^n) output",
        "complexity": {
          "zh": "有 2^n 个子集，总元素数为 n·2^(n-1)，复制结果决定时间与输出空间。递归和路径 O(n)。",
          "en": "There are 2^n subsets containing n·2^(n-1) total elements. Copying dominates; path and recursion use O(n)."
        },
        "python": "from typing import List\nclass Solution:\n    def subsets(self, nums: List[int]) -> List[List[int]]:\n        ans=[]; path=[]\n        def dfs(i):\n            if i==len(nums): ans.append(path.copy()); return\n            dfs(i+1)\n            path.append(nums[i]); dfs(i+1); path.pop()\n        dfs(0)\n        return ans",
        "java": "import java.util.*;\nclass Solution {\n    public List<List<Integer>> subsets(int[] nums) {\n        List<List<Integer>> ans=new ArrayList<>();dfs(nums,0,new ArrayList<>(),ans);return ans;\n    }\n    private void dfs(int[] a,int i,List<Integer> p,List<List<Integer>> ans) {\n        if(i==a.length) {ans.add(new ArrayList<>(p));return;}\n        dfs(a,i+1,p,ans);p.add(a[i]);dfs(a,i+1,p,ans);p.remove(p.size()-1);\n    }\n}",
        "trace": [
          {
            "cells": [
              "i=0",
              "path=[]"
            ],
            "note": {
              "zh": "两个位置分别做选或不选决定。",
              "en": "Make include-or-exclude decisions for the two positions."
            }
          },
          {
            "cells": [
              "skip 2: [] / [5]"
            ],
            "note": {
              "zh": "第一位不选 2，第二位产生空集和 [5]。",
              "en": "Excluding 2 leaves [] and [5] after deciding about 5."
            }
          },
          {
            "cells": [
              "take 2: [2] / [2,5]"
            ],
            "note": {
              "zh": "第一位选 2，第二位产生另外两个子集。",
              "en": "Including 2 produces [2] and [2,5]."
            }
          }
        ]
      },
      {
        "key": "doubling",
        "name": {
          "zh": "迭代扩展已有子集",
          "en": "Iteratively double the collection"
        },
        "intuition": {
          "zh": "假设已有前 i 个数的全部子集，处理新数 x 时，旧子集代表“不选 x”；为每个旧子集复制一份并加入 x，就得到“选 x”的全部子集。必须冻结旧集合大小，不能把刚生成的子集再次扩展。",
          "en": "Given all subsets of the processed prefix, keep them as the choices without x. Clone each old subset and append x to form all choices containing it. Freeze the old size so newly created subsets are not expanded again."
        },
        "steps": {
          "zh": [
            "以只含空集的答案开始。",
            "对每个 x，记录旧答案数量 size。",
            "只复制前 size 个子集并追加 x。",
            "处理完所有数后返回答案。"
          ],
          "en": [
            "Begin with one empty subset.",
            "For each x, record the old result size.",
            "Clone exactly those old subsets and append x.",
            "Return after processing every element."
          ]
        },
        "correctness": {
          "zh": "包含 x 与不包含 x 的两组互不相交；由旧子集完整性，两组共同覆盖新前缀的所有子集。",
          "en": "Subsets containing x and those excluding x are disjoint and together exhaust all subsets of the new prefix."
        },
        "time": "O(n·2^n)",
        "space": "O(n) transient + O(n·2^n) output",
        "complexity": {
          "zh": "复制的元素总量 O(n·2^n)。没有递归栈，单次待追加的列表 O(n)；最终答案占 O(n·2^n)。",
          "en": "Total element copying is O(n·2^n). No recursion stack is used; a single new list takes O(n), while results take O(n·2^n)."
        },
        "python": "from typing import List\nclass Solution:\n    def subsets(self, nums: List[int]) -> List[List[int]]:\n        ans=[[]]\n        for x in nums:\n            size=len(ans)\n            for i in range(size): ans.append(ans[i]+[x])\n        return ans",
        "java": "import java.util.*;\nclass Solution {\n    public List<List<Integer>> subsets(int[] nums) {\n        List<List<Integer>> ans=new ArrayList<>();ans.add(new ArrayList<>());\n        for(int x:nums) {\n            int size=ans.size();\n            for(int i=0;i<size;i++) {List<Integer> next=new ArrayList<>(ans.get(i));next.add(x);ans.add(next);}\n        }\n        return ans;\n    }\n}",
        "trace": [
          {
            "cells": [
              "ans=[[]]"
            ],
            "note": {
              "zh": "先拥有空集。",
              "en": "Begin with the empty subset."
            }
          },
          {
            "cells": [
              "x=2",
              "ans=[[],[2]]"
            ],
            "note": {
              "zh": "从旧空集复制一份并添加 2。",
              "en": "Clone the old empty subset and append 2."
            }
          },
          {
            "cells": [
              "x=5",
              "old=[[],[2]]",
              "new=[[5],[2,5]]"
            ],
            "note": {
              "zh": "只扩展本轮开始的两个子集。",
              "en": "Extend only the two subsets present at the start of this round."
            }
          },
          {
            "cells": [
              "ans=[[],[2],[5],[2,5]]"
            ],
            "note": {
              "zh": "合并保留和新增两组。",
              "en": "Combine retained and newly extended subsets."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/subsets/"
      }
    ],
    "slug": "subsets",
    "title": {
      "zh": "子集",
      "en": "Subsets"
    },
    "category": {
      "zh": "回溯",
      "en": "Backtracking"
    },
    "level": {
      "zh": "中等",
      "en": "Medium"
    }
  },
  {
    "id": 17,
    "statement": {
      "zh": "给定由数字 2 到 9 组成的字符串，按电话按键映射，返回每个数字各取一个字母并按原次序连接的所有字符串。映射为 2:abc、3:def、4:ghi、5:jkl、6:mno、7:pqrs、8:tuv、9:wxyz；答案顺序不限。",
      "en": "For a string of digits 2–9, choose one mapped letter per digit and concatenate in digit order. Return all choices using 2:abc, 3:def, 4:ghi, 5:jkl, 6:mno, 7:pqrs, 8:tuv, 9:wxyz, in any order."
    },
    "constraints": {
      "zh": [
        "当前英文原题：1 ≤ digits.length ≤ 4。",
        "字符只能为 2 到 9；实现也兼容历史版本的空字符串，返回 []。"
      ],
      "en": [
        "Current English statement: 1 ≤ digits.length ≤ 4.",
        "Only digits 2–9; the implementation also handles the historical empty-input case with []."
      ]
    },
    "example": {
      "zh": "digits=\"24\" → [\"ag\",\"ah\",\"ai\",\"bg\",\"bh\",\"bi\",\"cg\",\"ch\",\"ci\"]。",
      "en": "digits=\"24\" → [\"ag\",\"ah\",\"ai\",\"bg\",\"bh\",\"bi\",\"cg\",\"ch\",\"ci\"]."
    },
    "methods": [
      {
        "key": "digit-dfs",
        "name": {
          "zh": "按数字位置回溯",
          "en": "Backtrack by digit position"
        },
        "intuition": {
          "zh": "字符串第 i 位只能从第 i 个数字的映射中选，不能把不同位置的字母混在一起。固定一个前缀后，后续选择与过去具体选了哪个字母无关，因此可以递归列出所有后缀。使用可变字符缓冲避免每层复制整段前缀。",
          "en": "Position i must use letters mapped from digit i. Once a prefix is fixed, enumerate every suffix choice independently. A mutable character buffer avoids copying the entire prefix at each recursive level."
        },
        "steps": {
          "zh": [
            "空输入直接返回 []。",
            "dfs(i) 枚举第 i 位数字对应的字母。",
            "写入缓冲的第 i 位，然后递归 i+1。",
            "i 等于数字长度时将缓冲复制为字符串。"
          ],
          "en": [
            "Return [] for empty input.",
            "dfs(i) enumerates letters mapped from digit i.",
            "Write buffer[i] and recurse on i+1.",
            "Convert the complete buffer to a string at a leaf."
          ]
        },
        "correctness": {
          "zh": "每种输出与一组逐位置字母选择一一对应；每层枚举且只枚举允许的字母，因此没有遗漏或额外结果。",
          "en": "Outputs correspond one-to-one with allowed choices at each position, all enumerated by the recursion."
        },
        "time": "O(n·K), K ≤ 4^n",
        "space": "O(n) auxiliary + O(n·K) output",
        "complexity": {
          "zh": "K 为各数字字母数量的乘积。每个结果长度 n，复制花 O(n)；缓冲与调用栈深度均 O(n)。",
          "en": "K is the product of mapped-letter counts. Each length-n result costs O(n) to copy; buffer and stack require O(n)."
        },
        "python": "from typing import List\nclass Solution:\n    def letterCombinations(self, digits: str) -> List[str]:\n        if not digits: return []\n        mapping=['','','abc','def','ghi','jkl','mno','pqrs','tuv','wxyz']\n        ans=[]; buf=['']*len(digits)\n        def dfs(i):\n            if i==len(digits): ans.append(''.join(buf)); return\n            for ch in mapping[int(digits[i])]:\n                buf[i]=ch; dfs(i+1)\n        dfs(0)\n        return ans",
        "java": "import java.util.*;\nclass Solution {\n    public List<String> letterCombinations(String digits) {\n        List<String> ans=new ArrayList<>();if(digits.isEmpty()) return ans;\n        String[] map={\"\",\"\",\"abc\",\"def\",\"ghi\",\"jkl\",\"mno\",\"pqrs\",\"tuv\",\"wxyz\"};\n        dfs(digits,0,map,new char[digits.length()],ans);return ans;\n    }\n    private void dfs(String d,int i,String[] map,char[] buf,List<String> ans) {\n        if(i==d.length()) {ans.add(new String(buf));return;}\n        String letters=map[d.charAt(i)-'0'];\n        for(int k=0;k<letters.length();k++) {buf[i]=letters.charAt(k);dfs(d,i+1,map,buf,ans);}\n    }\n}",
        "trace": [
          {
            "cells": [
              "digits=24",
              "2: a b c",
              "4: g h i"
            ],
            "note": {
              "zh": "每个位置使用自己的映射，不能换位。",
              "en": "Each position uses its own mapping."
            }
          },
          {
            "cells": [
              "a -> ag, ah, ai"
            ],
            "note": {
              "zh": "固定 a 后枚举第二位全部字母。",
              "en": "With a fixed, enumerate every second-position letter."
            }
          },
          {
            "cells": [
              "b -> bg, bh, bi",
              "c -> cg, ch, ci",
              "K=9"
            ],
            "note": {
              "zh": "恢复并依次选择 b、c，共九个结果。",
              "en": "Then choose b and c; there are nine results."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/letter-combinations-of-a-phone-number/"
      }
    ],
    "slug": "letter-combinations-of-a-phone-number",
    "title": {
      "zh": "电话号码的字母组合",
      "en": "Letter Combinations of a Phone Number"
    },
    "category": {
      "zh": "回溯",
      "en": "Backtracking"
    },
    "level": {
      "zh": "中等",
      "en": "Medium"
    }
  },
  {
    "id": 39,
    "statement": {
      "zh": "从互不相同的正整数 candidates 中选数，使总和恰好等于 target。每个候选可重复使用任意次；只按每个数使用次数区分组合，不把不同排列当成新答案。返回全部组合，顺序不限。",
      "en": "Choose numbers from distinct positive candidates to total target. Candidates may be reused without limit. Combinations differ by value multiplicities, not ordering; return all combinations in any order."
    },
    "constraints": {
      "zh": [
        "1 ≤ candidates.length ≤ 30",
        "2 ≤ candidates[i] ≤ 40，候选互不相同；1 ≤ target ≤ 40。",
        "测试保证满足条件的组合数少于 150。"
      ],
      "en": [
        "1 ≤ candidates.length ≤ 30",
        "2 ≤ candidates[i] ≤ 40, distinct; 1 ≤ target ≤ 40.",
        "The number of valid combinations is below 150."
      ]
    },
    "example": {
      "zh": "candidates=[2,4], target=6 → [[2,2,2],[2,4]]；[4,2] 不另计。",
      "en": "candidates=[2,4], target=6 → [[2,2,2],[2,4]]; [4,2] is not a new combination."
    },
    "methods": [
      {
        "key": "sorted-backtrack",
        "name": {
          "zh": "有序候选与起点剪枝",
          "en": "Sorted candidates and start-index pruning"
        },
        "intuition": {
          "zh": "要允许重复选同一个数，又禁止以不同顺序重复同一组合，就把路径限制成非递减。选下标 i 后下一层仍从 i 开始，允许重用；不能从 0 重新枚举。排序还让“当前数大于剩余和”成为整段候选的停止条件。",
          "en": "Keep each path nondecreasing to allow reuse without duplicate orderings. After selecting index i, recurse from i, not i+1 or zero. Sorting also lets the search stop as soon as a candidate exceeds the remainder."
        },
        "steps": {
          "zh": [
            "复制排序 candidates，维护 start、remain 和 path。",
            "remain=0 时保存路径。",
            "从 start 起枚举，值超过 remain 即结束循环。",
            "选 i 后递归 dfs(i,remain-value)，返回撤销。"
          ],
          "en": [
            "Sort a copy and track start, remain and path.",
            "Save path when remain reaches zero.",
            "Enumerate from start and break when a value exceeds remain.",
            "Choose i, recurse from i with reduced remainder, then undo."
          ]
        },
        "correctness": {
          "zh": "每个组合按非递减顺序有唯一表示，起点约束恰好枚举这些表示。正数保证剩余和严格减少；剪枝后的候选全更大，不可能组成剩余目标。",
          "en": "Every combination has one nondecreasing representation. Start-index restriction enumerates it once. Positive values reduce the remainder, and larger-than-remainder choices cannot lead to a solution."
        },
        "time": "O(n log n + (n+1)^(D+1) + K·D) upper bound",
        "space": "O(n+D) auxiliary + O(K·D) output",
        "complexity": {
          "zh": "D=floor(target/min(candidates))，K 为解数。搜索深度至多 D，每层最多 n 分支，给出宽松上界；排序副本 O(n)，路径栈 O(D)，输出每条最长 D。 这里用 n+1 的底数给出统一宽松界，也覆盖 n=1 时深度 D 的单链搜索。",
          "en": "D=floor(target/min(candidates)), K is the answer count. Depth is at most D with at most n branches per level, giving a loose bound. Sorted copy uses O(n), stack O(D), and output O(KD). The n+1 base gives a uniform loose bound that also covers a depth-D unary search when n=1."
        },
        "python": "from typing import List\nclass Solution:\n    def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:\n        a=sorted(candidates); ans=[]; path=[]\n        def dfs(start,remain):\n            if remain==0: ans.append(path.copy()); return\n            for i in range(start,len(a)):\n                if a[i]>remain: break\n                path.append(a[i]); dfs(i,remain-a[i]); path.pop()\n        dfs(0,target)\n        return ans",
        "java": "import java.util.*;\nclass Solution {\n    public List<List<Integer>> combinationSum(int[] candidates,int target) {\n        int[] a=candidates.clone();Arrays.sort(a);\n        List<List<Integer>> ans=new ArrayList<>();dfs(a,0,target,new ArrayList<>(),ans);return ans;\n    }\n    private void dfs(int[] a,int start,int left,List<Integer> path,List<List<Integer>> ans) {\n        if(left==0) {ans.add(new ArrayList<>(path));return;}\n        for(int i=start;i<a.length && a[i]<=left;i++) {\n            path.add(a[i]);dfs(a,i,left-a[i],path,ans);path.remove(path.size()-1);\n        }\n    }\n}",
        "trace": [
          {
            "cells": [
              "a=[2,4]",
              "remain=6",
              "path=[]"
            ],
            "note": {
              "zh": "从最小可用下标开始，路径保持非递减。",
              "en": "Start from the smallest allowed index to keep the path nondecreasing."
            }
          },
          {
            "cells": [
              "[2] -> [2,2] -> [2,2,2]",
              "remain: 4 -> 2 -> 0"
            ],
            "note": {
              "zh": "重用下标 0，得到三个 2。",
              "en": "Reuse index 0 to choose three 2s."
            }
          },
          {
            "cells": [
              "[2] -> [2,4]",
              "remain: 4 -> 0"
            ],
            "note": {
              "zh": "回到 [2] 后换选 4，得到第二个解。",
              "en": "Backtrack to [2], then choose 4 for the second answer."
            }
          },
          {
            "cells": [
              "[4], remain=2",
              "4 > 2: stop"
            ],
            "note": {
              "zh": "以 4 开头不能再回头选 2，因此不会重复生成 [4,2]。",
              "en": "A path beginning with 4 cannot return to 2, avoiding [4,2]."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/combination-sum/"
      }
    ],
    "slug": "combination-sum",
    "title": {
      "zh": "组合总和",
      "en": "Combination Sum"
    },
    "category": {
      "zh": "回溯",
      "en": "Backtracking"
    },
    "level": {
      "zh": "中等",
      "en": "Medium"
    }
  },
  {
    "id": 22,
    "statement": {
      "zh": "输入括号对数 n，返回使用恰好 n 个左括号和 n 个右括号构成的所有合法括号串。合法意味着从左到右任一前缀中右括号都不多于左括号，最终两者数量相同。",
      "en": "Generate all balanced strings using exactly n opening and n closing parentheses. Every prefix must have at least as many openings as closings, and totals must match."
    },
    "constraints": {
      "zh": [
        "1 ≤ n ≤ 8"
      ],
      "en": [
        "1 ≤ n ≤ 8"
      ]
    },
    "example": {
      "zh": "n=2 → [\"(())\",\"()()\"]。",
      "en": "n=2 → [\"(())\",\"()()\"]."
    },
    "methods": [
      {
        "key": "balance-backtrack",
        "name": {
          "zh": "只扩展合法前缀",
          "en": "Extend only valid prefixes"
        },
        "intuition": {
          "zh": "与其生成全部 2^(2n) 个串再验证，不如在构造时拒绝不可能修复的前缀。若已经写了 left 个左括号、right 个右括号，只在 left<n 时写左括号，只在 right<left 时写右括号；多写的右括号以后补左括号也无法修复。",
          "en": "Instead of validating all binary strings, reject invalid prefixes immediately. Add an opening only while left<n, and a closing only while right<left. A closing with no earlier unmatched opening cannot be repaired by future characters."
        },
        "steps": {
          "zh": [
            "用字符缓冲保存当前前缀。",
            "允许左括号时加入，递归并撤销。",
            "允许右括号时加入，递归并撤销。",
            "长度达到 2n 时复制为答案。"
          ],
          "en": [
            "Keep the current prefix in a buffer.",
            "Append an opening when allowed, recurse and undo.",
            "Append a closing when allowed, recurse and undo.",
            "Copy the completed 2n-character string."
          ]
        },
        "correctness": {
          "zh": "规则保持所有前缀合法；长度 2n 且左括号最多 n 就保证最终两种各 n。任一合法串的每个下一步都满足相应规则，故一定被生成。",
          "en": "The rules preserve prefix balance. At length 2n both counts must be n. Every valid string follows allowed choices at every step and is therefore generated."
        },
        "time": "O(n·Cₙ)",
        "space": "O(n) auxiliary + O(n·Cₙ) output",
        "complexity": {
          "zh": "Cₙ 是第 n 个卡特兰数，约 4^n/n^(3/2)。每条输出长度 2n，复制时间与存储都不能忽略；递归和缓冲 O(n)。",
          "en": "Cₙ is the nth Catalan number, asymptotically 4^n/n^(3/2). Copying and storing 2n characters per answer costs O(nCₙ); stack and buffer use O(n)."
        },
        "python": "from typing import List\nclass Solution:\n    def generateParenthesis(self, n: int) -> List[str]:\n        ans=[]; path=[]\n        def dfs(left,right):\n            if len(path)==2*n: ans.append(''.join(path)); return\n            if left<n:\n                path.append('('); dfs(left+1,right); path.pop()\n            if right<left:\n                path.append(')'); dfs(left,right+1); path.pop()\n        dfs(0,0)\n        return ans",
        "java": "import java.util.*;\nclass Solution {\n    public List<String> generateParenthesis(int n) {\n        List<String> ans=new ArrayList<>();dfs(n,0,0,new char[2*n],ans);return ans;\n    }\n    private void dfs(int n,int left,int right,char[] buf,List<String> ans) {\n        int k=left+right;\n        if(k==2*n) {ans.add(new String(buf));return;}\n        if(left<n) {buf[k]='(';dfs(n,left+1,right,buf,ans);}\n        if(right<left) {buf[k]=')';dfs(n,left,right+1,buf,ans);}\n    }\n}",
        "trace": [
          {
            "cells": [
              "left=0,right=0",
              "\"\" -> \"(\""
            ],
            "note": {
              "zh": "开头不能放右括号，只能放左括号。",
              "en": "The first character must open a pair."
            }
          },
          {
            "cells": [
              "\"(\" -> \"((\" -> \"(()\" -> \"(())\""
            ],
            "note": {
              "zh": "先尝试第二个左括号，再补两个右括号。",
              "en": "Try a second opening, then close both pairs."
            }
          },
          {
            "cells": [
              "\"(\" -> \"()\" -> \"()(\" -> \"()()\""
            ],
            "note": {
              "zh": "回溯后先闭合第一对，再构造第二对。",
              "en": "Backtrack, close the first pair, then form another pair."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/generate-parentheses/"
      }
    ],
    "slug": "generate-parentheses",
    "title": {
      "zh": "括号生成",
      "en": "Generate Parentheses"
    },
    "category": {
      "zh": "回溯",
      "en": "Backtracking"
    },
    "level": {
      "zh": "中等",
      "en": "Medium"
    }
  },
  {
    "id": 79,
    "statement": {
      "zh": "给定字符矩阵 board 和字符串 word，判断能否沿相邻格子依次拼出 word。每一步只能上下左右移动，同一次匹配中每个格子最多使用一次；不同尝试之间可以重新使用格子，大小写有区别。",
      "en": "Decide whether word can be spelled by an edge-adjacent path in board. Move only up, down, left or right, and use each cell at most once in a single path. Separate attempts may reuse cells; matching is case-sensitive."
    },
    "constraints": {
      "zh": [
        "1 ≤ m,n ≤ 6",
        "1 ≤ word.length ≤ 15",
        "board 和 word 只含大小写英文字母。"
      ],
      "en": [
        "1 ≤ m,n ≤ 6",
        "1 ≤ word.length ≤ 15",
        "board and word contain uppercase and lowercase English letters."
      ]
    },
    "example": {
      "zh": "board=[[\"A\",\"B\"],[\"D\",\"C\"]], word=\"ABC\" → true，路径 (0,0)→(0,1)→(1,1)。",
      "en": "board=[[\"A\",\"B\"],[\"D\",\"C\"]], word=\"ABC\" → true along (0,0)→(0,1)→(1,1)."
    },
    "methods": [
      {
        "key": "path-dfs",
        "name": {
          "zh": "路径回溯与临时占用",
          "en": "Path backtracking with temporary marking"
        },
        "intuition": {
          "zh": "普通 visited 会错误阻止其他路径使用这个格子。这里访问状态只属于当前路径：选中格子后暂时替换成特殊字符，递归返回就恢复。每个起点都试一次；匹配第 k 个字符成功后，才尝试四邻居匹配 k+1。",
          "en": "A global visited flag would wrongly block other candidate paths. Mark cells only for the active path, then restore them on return. Try every starting cell; only after matching position k may a neighbor try k+1."
        },
        "steps": {
          "zh": [
            "长度超过格子总数直接失败。",
            "逐格尝试 dfs(r,c,k=0)。",
            "越界或字符不符返回 false；最后一个字符匹配则成功。",
            "暂存并标记当前格，尝试四方向，始终恢复后返回结果。"
          ],
          "en": [
            "Reject a word longer than the cell count.",
            "Try dfs(r,c,0) from every cell.",
            "Reject bounds or character mismatches; matching the final character succeeds.",
            "Temporarily mark the cell, explore neighbors, restore it before returning."
          ]
        },
        "correctness": {
          "zh": "递归路径由相邻且未占用的格子构成，并逐字符匹配，故成功路径合法。所有起点和每步四方向都被尝试，回溯恢复不会排除其他可能路径。",
          "en": "A successful recursion uses adjacent distinct cells matching the word. Every start and next direction is tried; restoration prevents one failed path from excluding another."
        },
        "time": "O(mn·3^L) upper bound",
        "space": "O(L) auxiliary",
        "complexity": {
          "zh": "L=word.length。第一步最多四方向，之后不能立即走回父格，至多三方向；更宽松写 O(mn·4^L) 也成立。原地标记避免 visited 数组，递归最多 L 层，退出后棋盘恢复。",
          "en": "L is word length. There are at most four first moves and three thereafter because the parent cell is blocked; O(mn·4^L) is a looser bound. Recursion uses O(L), with the board restored."
        },
        "python": "from typing import List\nclass Solution:\n    def exist(self, board: List[List[str]], word: str) -> bool:\n        m,n=len(board),len(board[0])\n        if len(word)>m*n: return False\n        def dfs(r,c,k):\n            if not(0<=r<m and 0<=c<n) or board[r][c]!=word[k]: return False\n            if k==len(word)-1: return True\n            ch=board[r][c]; board[r][c]='#'\n            found=any(dfs(r+dr,c+dc,k+1) for dr,dc in ((1,0),(-1,0),(0,1),(0,-1)))\n            board[r][c]=ch\n            return found\n        return any(dfs(r,c,0) for r in range(m) for c in range(n))",
        "java": "class Solution {\n    public boolean exist(char[][] board,String word) {\n        if(word.length()>board.length*board[0].length) return false;\n        for(int r=0;r<board.length;r++) for(int c=0;c<board[0].length;c++) if(dfs(board,word,r,c,0)) return true;\n        return false;\n    }\n    private boolean dfs(char[][] b,String w,int r,int c,int k) {\n        if(r<0 || r>=b.length || c<0 || c>=b[0].length || b[r][c]!=w.charAt(k)) return false;\n        if(k==w.length()-1) return true;\n        char ch=b[r][c];b[r][c]='#';\n        boolean ok=dfs(b,w,r+1,c,k+1)||dfs(b,w,r-1,c,k+1)||dfs(b,w,r,c+1,k+1)||dfs(b,w,r,c-1,k+1);\n        b[r][c]=ch;return ok;\n    }\n}",
        "trace": [
          {
            "cells": [
              "A B",
              "D C",
              "word=ABC"
            ],
            "note": {
              "zh": "从匹配 A 的左上格开始。",
              "en": "Start at the upper-left A."
            }
          },
          {
            "cells": [
              "# B",
              "D C",
              "k=1"
            ],
            "note": {
              "zh": "A 暂时占用，向下 D 不匹配，向右 B 匹配。",
              "en": "Mark A; D fails the next character, while B matches."
            }
          },
          {
            "cells": [
              "# #",
              "D C",
              "k=2; C matches"
            ],
            "note": {
              "zh": "从 B 向下找到 C，完整匹配成功。",
              "en": "From B, move down to C to complete the word."
            }
          },
          {
            "cells": [
              "A B",
              "D C",
              "true"
            ],
            "note": {
              "zh": "返回前恢复所有临时标记。",
              "en": "Restore every temporary mark before returning."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/word-search/"
      }
    ],
    "slug": "word-search",
    "title": {
      "zh": "单词搜索",
      "en": "Word Search"
    },
    "category": {
      "zh": "回溯",
      "en": "Backtracking"
    },
    "level": {
      "zh": "中等",
      "en": "Medium"
    }
  },
  {
    "id": 131,
    "statement": {
      "zh": "把字符串 s 切成若干非空连续片段，片段按原顺序连接必须恢复 s，且每个片段都要是回文。返回所有这样的切分方案，而不是最长回文或最少切分数。",
      "en": "Split s into nonempty contiguous pieces that concatenate to s in order, with every piece a palindrome. Return all partitions, not just a longest palindrome or a minimum cut count."
    },
    "constraints": {
      "zh": [
        "1 ≤ s.length ≤ 16",
        "只含小写英文字母。"
      ],
      "en": [
        "1 ≤ s.length ≤ 16",
        "Lowercase English letters only."
      ]
    },
    "example": {
      "zh": "s=\"aba\" → [[\"a\",\"b\",\"a\"],[\"aba\"]]。",
      "en": "s=\"aba\" → [[\"a\",\"b\",\"a\"],[\"aba\"]]."
    },
    "methods": [
      {
        "key": "check-backtrack",
        "name": {
          "zh": "双指针验证 + 切分回溯",
          "en": "Two-pointer checks + partition DFS"
        },
        "intuition": {
          "zh": "从尚未切分的起点 start 枚举当前片段的终点 end。只有这一段是回文才递归切剩余后缀；这比枚举所有切法后整体验证更早排除非法分支。先用首尾指针向中间比较，直观看出回文条件；它会重复检查一些区间，适合理解基础搜索。",
          "en": "Enumerate the end of the next piece from the first unused index. Recurse only when that piece is a palindrome, pruning before constructing a whole invalid partition. Compare matching endpoints inward. This simple check may inspect the same interval repeatedly."
        },
        "steps": {
          "zh": [
            "写双指针回文函数，遇到不等立即失败。",
            "dfs(start) 枚举 end≥start，只选回文片段。",
            "将 s[start:end+1] 加入 path，递归 end+1 后撤销。",
            "start=n 时复制当前切分。"
          ],
          "en": [
            "Check a candidate using inward-moving pointers.",
            "dfs(start) tries every end≥start and accepts only palindrome pieces.",
            "Append the substring, recurse from end+1, then undo.",
            "Copy the partition when start=n."
          ]
        },
        "correctness": {
          "zh": "每个切分由唯一的切点序列确定。递归恰好枚举这些序列并过滤非回文片段；合法切分的每一段都会通过检查，因此完整无重复。",
          "en": "Each partition has a unique sequence of cut positions. Recursion enumerates those sequences and only filters nonpalindromic pieces, so all valid partitions appear once."
        },
        "time": "O(n²·2^n) upper bound",
        "space": "O(n) auxiliary + O(n·2^n) output",
        "complexity": {
          "zh": "至多 2^(n-1) 种切法，每次区间检查最多 O(n)，给出保守 O(n²·2^n) 上界。输出的字符串总长度最坏 O(n·2^n)，不能只把空间算作递归深度。当前路径所有片段字符总数最多 n。",
          "en": "There are at most 2^(n-1) cut patterns and interval checks take O(n), giving the conservative O(n²·2^n) bound. Output characters occupy O(n·2^n) in the worst case. Active path pieces contain at most n characters."
        },
        "python": "from typing import List\nclass Solution:\n    def partition(self, s: str) -> List[List[str]]:\n        n=len(s); ans=[]; path=[]\n        def valid(l,r):\n            while l<r:\n                if s[l]!=s[r]: return False\n                l+=1; r-=1\n            return True\n        def dfs(start):\n            if start==n: ans.append(path.copy()); return\n            for end in range(start,n):\n                if valid(start,end):\n                    path.append(s[start:end+1]); dfs(end+1); path.pop()\n        dfs(0)\n        return ans",
        "java": "import java.util.*;\nclass Solution {\n    public List<List<String>> partition(String s) {\n        int n=s.length();List<List<String>> ans=new ArrayList<>();\n        boolean[][] pal=null;\n        dfs(s,0,pal,new ArrayList<>(),ans);return ans;\n    }\n    private boolean valid(String s,int l,int r,boolean[][] pal) {\n        while(l<r) if(s.charAt(l++)!=s.charAt(r--)) return false;\n        return true;\n    }\n    private void dfs(String s,int start,boolean[][] pal,List<String> path,List<List<String>> ans) {\n        if(start==s.length()) {ans.add(new ArrayList<>(path));return;}\n        for(int end=start;end<s.length();end++) if(valid(s,start,end,pal)) {\n            path.add(s.substring(start,end+1));dfs(s,end+1,pal,path,ans);path.remove(path.size()-1);\n        }\n    }\n}",
        "trace": [
          {
            "cells": [
              "s=aba",
              "start=0",
              "path=[]"
            ],
            "note": {
              "zh": "从第一个字符开始枚举片段。",
              "en": "Try pieces from the first character."
            }
          },
          {
            "cells": [
              "a | b | a",
              "save"
            ],
            "note": {
              "zh": "三个单字符都是回文，得到一个切分。",
              "en": "Each single character is a palindrome; save this partition."
            }
          },
          {
            "cells": [
              "ab: false",
              "aba: true",
              "[aba]"
            ],
            "note": {
              "zh": "ab 失败；整个 aba 成立，得到另一切分。",
              "en": "Reject ab; the entire aba is a palindrome and forms another partition."
            }
          }
        ]
      },
      {
        "key": "dp-backtrack",
        "name": {
          "zh": "回文预处理 + 切分回溯",
          "en": "Palindrome table + partition DFS"
        },
        "intuition": {
          "zh": "从尚未切分的起点 start 枚举当前片段的终点 end。只有这一段是回文才递归切剩余后缀；这比枚举所有切法后整体验证更早排除非法分支。相同区间会在多条路径中被问到，提前用 pal[l][r] 存结果，让每次合法性判断 O(1)。",
          "en": "Enumerate the end of the next piece from the first unused index. Recurse only when that piece is a palindrome, pruning before constructing a whole invalid partition. Cache every interval in pal[l][r], since many paths ask about the same substring."
        },
        "steps": {
          "zh": [
            "按左端点递减顺序计算 pal[l][r]，两端相等且内部回文才为真。",
            "dfs(start) 枚举 end≥start，只选回文片段。",
            "将 s[start:end+1] 加入 path，递归 end+1 后撤销。",
            "start=n 时复制当前切分。"
          ],
          "en": [
            "Fill pal from larger left endpoints to smaller ones using equal endpoints and a palindromic interior.",
            "dfs(start) tries every end≥start and accepts only palindrome pieces.",
            "Append the substring, recurse from end+1, then undo.",
            "Copy the partition when start=n."
          ]
        },
        "correctness": {
          "zh": "每个切分由唯一的切点序列确定。递归恰好枚举这些序列并过滤非回文片段；合法切分的每一段都会通过检查，因此完整无重复。",
          "en": "Each partition has a unique sequence of cut positions. Recursion enumerates those sequences and only filters nonpalindromic pieces, so all valid partitions appear once."
        },
        "time": "O(n²+n·2^n)",
        "space": "O(n²) auxiliary + O(n·2^n) output",
        "complexity": {
          "zh": "预处理 O(n²)，搜索加片段复制可用 O(n·2^n) 上界；回文表 O(n²)。输出的字符串总长度最坏 O(n·2^n)，不能只把空间算作递归深度。当前路径所有片段字符总数最多 n。",
          "en": "Preprocessing costs O(n²); search and substring copying fit O(n·2^n), with an O(n²) table. Output characters occupy O(n·2^n) in the worst case. Active path pieces contain at most n characters."
        },
        "python": "from typing import List\nclass Solution:\n    def partition(self, s: str) -> List[List[str]]:\n        n=len(s); ans=[]; path=[]\n        pal=[[False]*n for _ in range(n)]\n        for l in range(n-1,-1,-1):\n            for r in range(l,n):\n                pal[l][r]=s[l]==s[r] and (r-l<2 or pal[l+1][r-1])\n        def valid(l,r): return pal[l][r]\n        def dfs(start):\n            if start==n: ans.append(path.copy()); return\n            for end in range(start,n):\n                if valid(start,end):\n                    path.append(s[start:end+1]); dfs(end+1); path.pop()\n        dfs(0)\n        return ans",
        "java": "import java.util.*;\nclass Solution {\n    public List<List<String>> partition(String s) {\n        int n=s.length();List<List<String>> ans=new ArrayList<>();\n        boolean[][] pal=new boolean[n][n];\n        for(int l=n-1;l>=0;l--) for(int r=l;r<n;r++) pal[l][r]=s.charAt(l)==s.charAt(r)&&(r-l<2||pal[l+1][r-1]);\n        dfs(s,0,pal,new ArrayList<>(),ans);return ans;\n    }\n    private boolean valid(String s,int l,int r,boolean[][] pal) {\n        return pal[l][r];\n    }\n    private void dfs(String s,int start,boolean[][] pal,List<String> path,List<List<String>> ans) {\n        if(start==s.length()) {ans.add(new ArrayList<>(path));return;}\n        for(int end=start;end<s.length();end++) if(valid(s,start,end,pal)) {\n            path.add(s.substring(start,end+1));dfs(s,end+1,pal,path,ans);path.remove(path.size()-1);\n        }\n    }\n}",
        "trace": [
          {
            "cells": [
              "pal[2][2]=true",
              "pal[1][1]=true",
              "pal[0][0]=true"
            ],
            "note": {
              "zh": "单字符区间先成为回文基础。",
              "en": "Single-character intervals form the base cases."
            }
          },
          {
            "cells": [
              "pal[0][2]=(a==a) && pal[1][1]",
              "pal[0][2]=true"
            ],
            "note": {
              "zh": "由内部 b 推出整个 aba 是回文。",
              "en": "The interior b proves that aba is a palindrome."
            }
          },
          {
            "cells": [
              "a | b | a",
              "aba"
            ],
            "note": {
              "zh": "回溯查表后得到两个切分，ab 与 ba 被表拒绝。",
              "en": "Table-backed backtracking produces both partitions and rejects ab and ba."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/palindrome-partitioning/"
      }
    ],
    "slug": "palindrome-partitioning",
    "title": {
      "zh": "分割回文串",
      "en": "Palindrome Partitioning"
    },
    "category": {
      "zh": "回溯",
      "en": "Backtracking"
    },
    "level": {
      "zh": "中等",
      "en": "Medium"
    }
  },
  {
    "id": 51,
    "statement": {
      "zh": "在 n×n 棋盘放置 n 个皇后，使任意两个皇后不在同一行、同一列或同一斜线上。返回全部不同棋盘布局，每行用字符串表示，Q 为皇后、. 为空格；结果顺序不限。",
      "en": "Place n queens on an n-by-n board with no shared row, column or diagonal. Return every distinct board as row strings using Q for a queen and . for an empty square, in any order."
    },
    "constraints": {
      "zh": [
        "1 ≤ n ≤ 9"
      ],
      "en": [
        "1 ≤ n ≤ 9"
      ]
    },
    "example": {
      "zh": "n=4 → [[\".Q..\",\"...Q\",\"Q...\",\"..Q.\"],[\"..Q.\",\"Q...\",\"...Q\",\".Q..\"]]，共两种布局。",
      "en": "n=4 → [[\".Q..\",\"...Q\",\"Q...\",\"..Q.\"],[\"..Q.\",\"Q...\",\"...Q\",\".Q..\"]], two layouts."
    },
    "methods": [
      {
        "key": "column-diagonal",
        "name": {
          "zh": "逐行回溯与列、斜线标记",
          "en": "Row DFS with column and diagonal flags"
        },
        "intuition": {
          "zh": "n 个皇后且不能同行，意味着每行恰好一个。第 r 行只需要选择列 c，同行冲突自动消失。同一条斜线的 r-c 或 r+c 相等，用标记数组可在 O(1) 时间发现冲突。路径只存每行列号，找到解时才构造完整棋盘。",
          "en": "Exactly one queen must occupy each row. Choose only the column c for row r, eliminating row conflicts automatically. Equal r-c or r+c identifies shared diagonals, allowing constant-time conflict checks. Store column choices and build a board only at a solution."
        },
        "steps": {
          "zh": [
            "维护 col、diag1(r-c+n-1)、diag2(r+c)。",
            "逐行枚举列，任一标记已占用就跳过。",
            "占用三种标记并递归下一行，返回后全部撤销。",
            "放完 n 行后根据列号构造 n 个长度 n 的字符串。"
          ],
          "en": [
            "Track occupied columns and diagonals r-c+n-1 and r+c.",
            "Try every column of the current row; skip any conflict.",
            "Mark all three lines, recurse to the next row and undo.",
            "Build n row strings after assigning all rows."
          ]
        },
        "correctness": {
          "zh": "标记准确覆盖已放皇后的攻击线，因此每次选择都保持合法。每个布局对应唯一的逐行列号序列，搜索枚举所有无冲突选择，故完整且无重复。",
          "en": "The flags describe every attack line of placed queens, preserving validity. Each board has one unique sequence of row-column choices, all legal sequences are explored."
        },
        "time": "O(n·n! + K·n²) upper bound",
        "space": "O(n) auxiliary + O(K·n²) output",
        "complexity": {
          "zh": "忽略斜线剪枝时至多排列树规模，每个节点最多检查 n 列，给出 O(n·n!) 的保守界。K 个解各输出 n² 字符，标记、列号、递归深度 O(n)。",
          "en": "Ignoring diagonal pruning leaves a permutation tree; scanning n columns per node gives a conservative O(n·n!) bound. K boards require Kn² characters; flags, choices and recursion use O(n)."
        },
        "python": "from typing import List\nclass Solution:\n    def solveNQueens(self, n: int) -> List[List[str]]:\n        ans=[]; pos=[0]*n; cols=[False]*n; d1=[False]*(2*n-1); d2=[False]*(2*n-1)\n        def dfs(r):\n            if r==n:\n                ans.append(['.'*c+'Q'+'.'*(n-c-1) for c in pos]); return\n            for c in range(n):\n                a,b=r-c+n-1,r+c\n                if cols[c] or d1[a] or d2[b]: continue\n                pos[r]=c; cols[c]=d1[a]=d2[b]=True\n                dfs(r+1)\n                cols[c]=d1[a]=d2[b]=False\n        dfs(0)\n        return ans",
        "java": "import java.util.*;\nclass Solution {\n    public List<List<String>> solveNQueens(int n) {\n        List<List<String>> ans=new ArrayList<>();\n        dfs(0,n,new int[n],new boolean[n],new boolean[2*n-1],new boolean[2*n-1],ans);return ans;\n    }\n    private void dfs(int r,int n,int[] pos,boolean[] cols,boolean[] d1,boolean[] d2,List<List<String>> ans) {\n        if(r==n) {\n            List<String> board=new ArrayList<>();\n            for(int c:pos) {char[] row=new char[n];Arrays.fill(row,'.');row[c]='Q';board.add(new String(row));}\n            ans.add(board);return;\n        }\n        for(int c=0;c<n;c++) {\n            int a=r-c+n-1,b=r+c;\n            if(cols[c]||d1[a]||d2[b]) continue;\n            pos[r]=c;cols[c]=d1[a]=d2[b]=true;\n            dfs(r+1,n,pos,cols,d1,d2,ans);\n            cols[c]=d1[a]=d2[b]=false;\n        }\n    }\n}",
        "trace": [
          {
            "cells": [
              "r=0,c=1",
              ".Q.."
            ],
            "note": {
              "zh": "尝试第一行放第 1 列，标记列和两条斜线。",
              "en": "Try column 1 in row 0 and mark its column and diagonals."
            }
          },
          {
            "cells": [
              "pos=[1,3,0]",
              ".Q..",
              "...Q",
              "Q..."
            ],
            "note": {
              "zh": "接着选择第 3 列、第 0 列，均不冲突。",
              "en": "Columns 3 and 0 for the next rows introduce no conflicts."
            }
          },
          {
            "cells": [
              "pos=[1,3,0,2]",
              "..Q.",
              "save"
            ],
            "note": {
              "zh": "最后一行第 2 列合法，保存第一种布局。",
              "en": "Column 2 in the last row completes the first board."
            }
          },
          {
            "cells": [
              "pos=[2,0,3,1]",
              "save; K=2"
            ],
            "note": {
              "zh": "撤销并继续搜索，找到另一布局；两者之外的分支都冲突。",
              "en": "Continue after undoing choices; the other solution has these columns."
            }
          }
        ]
      },
      {
        "key": "bitmask",
        "name": {
          "zh": "位掩码枚举可用列",
          "en": "Enumerate available columns with bit masks"
        },
        "intuition": {
          "zh": "用一个二进制位对应一列，把占用列、当前行受左斜线攻击列、右斜线攻击列压缩成整数。available=full & ~(cols|left|right) 一次计算所有安全列；最低位 available & -available 每次提取一个位置。进入下一行时两组斜线攻击分别左移和右移，表达它们每行偏移一列。",
          "en": "Represent each column by one bit. Three masks track occupied columns and diagonal attacks on the current row. Compute all safe columns at once with full & ~(cols|left|right), then extract a choice using available & -available. Shift diagonal masks in opposite directions for the next row because attacks move one column per row."
        },
        "steps": {
          "zh": [
            "full=(1<<n)-1，屏蔽棋盘外的位。",
            "计算当前安全列 available，并循环取最低置位 bit。",
            "记录列号，递归传入 cols|bit、(left|bit)<<1、(right|bit)>>1。",
            "参数按值传递无需撤销掩码；达到 n 行后构造完整棋盘。"
          ],
          "en": [
            "Set full=(1<<n)-1 to mask off out-of-board bits.",
            "Compute available columns and repeatedly extract its lowest set bit.",
            "Record the column and recurse with updated column and shifted diagonal masks.",
            "Masks are passed by value; build a board after assigning all rows."
          ]
        },
        "correctness": {
          "zh": "掩码按位记录了上一层所有皇后对当前行的攻击，移位恰好对应斜线的几何移动。补集只枚举不受攻击的列，因此与逐行回溯枚举同一组合法布局。",
          "en": "The masks encode all attacks on the current row, and shifting matches diagonal geometry. Their complement enumerates exactly safe columns, yielding the same complete set of legal boards."
        },
        "time": "O(n! + K·n²) upper bound",
        "space": "O(n) auxiliary + O(K·n²) output",
        "complexity": {
          "zh": "在 n≤9 的约束下掩码可装入机器整数，位操作 O(1)，不再扫描每行全部 n 列，只枚举有效分支。搜索树规模可用 O(n!) 上界；K 个棋盘输出仍需 O(Kn²)，递归与列号数组 O(n)。",
          "en": "For n≤9, masks fit a machine integer and bit operations are O(1). Only available branches are enumerated instead of scanning n columns per node. Search fits O(n!), while K output boards cost O(Kn²). Stack and choices use O(n)."
        },
        "python": "from typing import List\nclass Solution:\n    def solveNQueens(self, n: int) -> List[List[str]]:\n        full=(1<<n)-1; pos=[0]*n; ans=[]\n        def dfs(r,cols,left,right):\n            if r==n:\n                ans.append(['.'*c+'Q'+'.'*(n-c-1) for c in pos]); return\n            available=full & ~(cols|left|right)\n            while available:\n                bit=available & -available; available-=bit\n                pos[r]=bit.bit_length()-1\n                dfs(r+1,cols|bit,((left|bit)<<1)&full,(right|bit)>>1)\n        dfs(0,0,0,0)\n        return ans",
        "java": "import java.util.*;\nclass Solution {\n    public List<List<String>> solveNQueens(int n) {\n        List<List<String>> ans=new ArrayList<>();dfs(0,n,(1<<n)-1,0,0,0,new int[n],ans);return ans;\n    }\n    private void dfs(int r,int n,int full,int cols,int left,int right,int[] pos,List<List<String>> ans) {\n        if(r==n) {\n            List<String> board=new ArrayList<>();\n            for(int c:pos) {char[] row=new char[n];Arrays.fill(row,'.');row[c]='Q';board.add(new String(row));}\n            ans.add(board);return;\n        }\n        int available=full & ~(cols|left|right);\n        while(available!=0) {\n            int bit=available & -available;available-=bit;\n            pos[r]=Integer.numberOfTrailingZeros(bit);\n            dfs(r+1,n,full,cols|bit,((left|bit)<<1)&full,(right|bit)>>>1,pos,ans);\n        }\n    }\n}",
        "trace": [
          {
            "cells": [
              "n=4; full=1111",
              "r=0; bit=0010; c=1"
            ],
            "note": {
              "zh": "展示以第 1 列为起点的成功分支。",
              "en": "Follow the successful branch starting in column 1."
            }
          },
          {
            "cells": [
              "r=1",
              "cols=0010; left=0100; right=0001",
              "available=1000; c=3"
            ],
            "note": {
              "zh": "位掩码计算出下一行只剩第 3 列。",
              "en": "Masks leave only column 3 available in the next row."
            }
          },
          {
            "cells": [
              "r=2",
              "cols=1010; left=1000; right=0100",
              "available=0001; c=0"
            ],
            "note": {
              "zh": "下一行只可选第 0 列。",
              "en": "Only column 0 remains safe in row two."
            }
          },
          {
            "cells": [
              "r=3",
              "cols=1011; left=0010; right=0010",
              "available=0100; c=2",
              "pos=[1,3,0,2]"
            ],
            "note": {
              "zh": "最后选择第 2 列，构造布局；其余分支继续搜索。",
              "en": "Choose column 2 to complete the board, then explore remaining branches."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/n-queens/"
      }
    ],
    "slug": "n-queens",
    "title": {
      "zh": "N 皇后",
      "en": "N-Queens"
    },
    "category": {
      "zh": "回溯",
      "en": "Backtracking"
    },
    "level": {
      "zh": "困难",
      "en": "Hard"
    }
  },
  {
    "id": 35,
    "statement": {
      "zh": "在严格递增的整数数组 nums 中查找 target。存在则返回其下标，否则返回插入 target 后仍保持有序的位置，下标允许等于数组长度。要求使用对数时间算法。",
      "en": "Find target in a strictly increasing integer array. Return its index if present; otherwise return the insertion index preserving sorted order, possibly the array length. A logarithmic-time solution is required."
    },
    "constraints": {
      "zh": [
        "1 ≤ nums.length ≤ 10000",
        "nums 严格递增；nums[i] 和 target 均在 [-10000,10000]。",
        "要求 O(log n) 时间。"
      ],
      "en": [
        "1 ≤ nums.length ≤ 10000",
        "Strictly increasing nums; values and target are in [-10000,10000].",
        "Required time: O(log n)."
      ]
    },
    "example": {
      "zh": "nums=[2,5,8], target=6 → 2，在 5 和 8 之间插入。",
      "en": "nums=[2,5,8], target=6 → 2, between 5 and 8."
    },
    "methods": [
      {
        "key": "lower-bound",
        "name": {
          "zh": "半开区间下界二分",
          "en": "Half-open lower-bound search"
        },
        "intuition": {
          "zh": "“找现有位置”和“找插入位置”其实都是找第一个不小于 target 的数。如果所有数都更小，答案就是 n。用 [left,right) 保存候选范围，不要把 right 初始化为 n-1 后又混用半开更新规则。",
          "en": "Both cases ask for the first value at least target. If every value is smaller, the answer is n. Use the half-open interval [left,right) consistently; mixing it with closed-interval updates creates off-by-one errors."
        },
        "steps": {
          "zh": [
            "left=0,right=n。",
            "mid 值小于 target 时，mid 及其左侧都太小，left=mid+1。",
            "否则 mid 仍可能是第一个满足位置，right=mid。",
            "left=right 时该边界就是答案，无需额外判断相等。"
          ],
          "en": [
            "Initialize left=0, right=n.",
            "If nums[mid]<target, discard mid and everything earlier.",
            "Otherwise keep mid as a possible boundary by setting right=mid.",
            "Return the common boundary when the interval becomes empty."
          ]
        },
        "correctness": {
          "zh": "始终保持 left 之前都小于 target，right 及之后都大于等于 target。两端相遇时正好是两类值的分界，亦为插入点。",
          "en": "Everything before left is smaller than target and everything from right onward is at least target. When they meet, the boundary is exactly the insertion position."
        },
        "time": "O(log n)",
        "space": "O(1)",
        "complexity": {
          "zh": "每轮候选区间至少减半，只有几个下标变量；输入不修改。线性扫描可作思考基线，但不满足原题时间要求。",
          "en": "The interval halves each round, using only index variables. The input is unchanged. A linear baseline would violate the required runtime."
        },
        "python": "from typing import List\nclass Solution:\n    def searchInsert(self, nums: List[int], target: int) -> int:\n        left,right=0,len(nums)\n        while left<right:\n            mid=(left+right)//2\n            if nums[mid]<target: left=mid+1\n            else: right=mid\n        return left",
        "java": "class Solution {\n    public int searchInsert(int[] nums,int target) {\n        int left=0,right=nums.length;\n        while(left<right) {\n            int mid=left+(right-left)/2;\n            if(nums[mid]<target) left=mid+1;else right=mid;\n        }\n        return left;\n    }\n}",
        "trace": [
          {
            "cells": [
              "[2,5,8]",
              "target=6",
              "left=0,right=3"
            ],
            "note": {
              "zh": "寻找第一个不小于 6 的位置。",
              "en": "Find the first position whose value is at least 6."
            }
          },
          {
            "cells": [
              "mid=1",
              "5 < 6",
              "left=2,right=3"
            ],
            "note": {
              "zh": "5 和它左边都太小。",
              "en": "5 and all earlier values are too small."
            }
          },
          {
            "cells": [
              "mid=2",
              "8 >= 6",
              "left=2,right=2",
              "answer=2"
            ],
            "note": {
              "zh": "保留边界 2，区间收缩完成。",
              "en": "Keep boundary 2; the interval is now empty."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/search-insert-position/"
      }
    ],
    "slug": "search-insert-position",
    "title": {
      "zh": "搜索插入位置",
      "en": "Search Insert Position"
    },
    "category": {
      "zh": "二分查找",
      "en": "Binary Search"
    },
    "level": {
      "zh": "简单",
      "en": "Easy"
    }
  },
  {
    "id": 74,
    "statement": {
      "zh": "给定 m×n 矩阵，每行从左到右非递减，且每行首元素严格大于上一行末元素。判断 target 是否出现，要求 O(log(mn)) 时间。这里的跨行条件比“行列分别有序”更强。",
      "en": "Given an m-by-n matrix with nondecreasing rows and every row’s first value strictly greater than the previous row’s last value, decide whether target occurs in O(log(mn)) time. This is stronger than merely sorted rows and columns."
    },
    "constraints": {
      "zh": [
        "1 ≤ m,n ≤ 100",
        "matrix[i][j] 和 target 均在 [-10000,10000]。",
        "矩阵为矩形，满足行内非递减和跨行严格分隔。"
      ],
      "en": [
        "1 ≤ m,n ≤ 100",
        "Matrix values and target are in [-10000,10000].",
        "Rectangular matrix, nondecreasing rows, strict separation between successive rows."
      ]
    },
    "example": {
      "zh": "matrix=[[2,4,6],[9,12,15]], target=12 → true。",
      "en": "matrix=[[2,4,6],[9,12,15]], target=12 → true."
    },
    "methods": [
      {
        "key": "flat-binary",
        "name": {
          "zh": "逻辑展开后二分",
          "en": "Binary search on logical flattened indices"
        },
        "intuition": {
          "zh": "按行读取矩阵会得到一个整体有序序列，因此可直接二分下标 0 到 mn-1。没有必要真正复制出一维数组：第 k 项就是 matrix[k//n][k%n]，这里除数必须是列数。",
          "en": "Row-major traversal is globally sorted, so search logical indices 0 through mn-1. No flattened copy is needed: index k maps to matrix[k//n][k%n], using the column count as divisor."
        },
        "steps": {
          "zh": [
            "设置闭区间 left=0,right=mn-1。",
            "把 mid 映射成行 mid//n、列 mid%n。",
            "比较矩阵值与 target，命中返回 true，否则排除一半。",
            "区间为空返回 false。"
          ],
          "en": [
            "Initialize closed interval [0,mn-1].",
            "Map mid to row mid//n and column mid%n.",
            "Return true on equality; otherwise discard the impossible half.",
            "Return false when the interval empties."
          ]
        },
        "correctness": {
          "zh": "坐标映射不改变按行序列的顺序，而题设确保其整体有序，所以普通二分的排除依据完全成立。",
          "en": "The mapping preserves row-major order, which is sorted by the given conditions; ordinary binary-search elimination therefore applies."
        },
        "time": "O(log(mn))",
        "space": "O(1)",
        "complexity": {
          "zh": "逻辑长度为 mn，每次减半；坐标换算 O(1)，没有额外数组。",
          "en": "The logical sequence has mn entries and halves each iteration. Coordinate conversion is O(1), without a copied array."
        },
        "python": "from typing import List\nclass Solution:\n    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:\n        n=len(matrix[0]); left,right=0,len(matrix)*n-1\n        while left<=right:\n            mid=(left+right)//2; value=matrix[mid//n][mid%n]\n            if value==target: return True\n            if value<target: left=mid+1\n            else: right=mid-1\n        return False",
        "java": "class Solution {\n    public boolean searchMatrix(int[][] matrix,int target) {\n        int n=matrix[0].length,left=0,right=matrix.length*n-1;\n        while(left<=right) {\n            int mid=left+(right-left)/2,value=matrix[mid/n][mid%n];\n            if(value==target) return true;\n            if(value<target) left=mid+1;else right=mid-1;\n        }\n        return false;\n    }\n}",
        "trace": [
          {
            "cells": [
              "[2,4,6,9,12,15]",
              "left=0,right=5"
            ],
            "note": {
              "zh": "逻辑序列有序，但没有真正复制数组。",
              "en": "The logical sequence is sorted without making a copy."
            }
          },
          {
            "cells": [
              "mid=2 -> (0,2)",
              "6 < 12",
              "left=3,right=5"
            ],
            "note": {
              "zh": "排除前半段。",
              "en": "Discard the lower half."
            }
          },
          {
            "cells": [
              "mid=4 -> (1,1)",
              "12 == 12",
              "true"
            ],
            "note": {
              "zh": "逻辑下标映射到目标格子。",
              "en": "Map the logical index to the matching cell."
            }
          }
        ]
      },
      {
        "key": "row-then-column",
        "name": {
          "zh": "先定位行，再行内二分",
          "en": "Find a row, then search within it"
        },
        "intuition": {
          "zh": "行与行的值域完全分开，所以先找首元素不大于 target 的最后一行。更后面的行全部太大，更前面的行又都小于这行首元素；target 若存在只能在这一行。再在该行做普通二分。",
          "en": "Row value ranges do not overlap. Find the last row whose first value is at most target: later rows are too large, while earlier rows end below this row’s first value. Any occurrence must be in that row, which can be searched normally."
        },
        "steps": {
          "zh": [
            "对各行首元素求第一个大于 target 的位置 left。",
            "候选行 row=left-1；row<0 说明目标小于矩阵最小值。",
            "在候选行中闭区间二分查 target。",
            "命中返回 true，否则 false。"
          ],
          "en": [
            "Find the first row starting above target.",
            "Its predecessor is the candidate; a negative predecessor means no answer.",
            "Binary-search that row.",
            "Return whether a match is found."
          ]
        },
        "correctness": {
          "zh": "跨行严格分隔保证最多一行能含 target；首元素边界恰好选出这一候选行，行内二分再精确确认。",
          "en": "Strict inter-row separation permits at most one candidate row. The first-element boundary identifies it, and the inner search confirms membership."
        },
        "time": "O(log m+log n)=O(log(mn))",
        "space": "O(1)",
        "complexity": {
          "zh": "两次二分时间相加，不是相乘。整个过程只使用行号及左右边界。",
          "en": "The two logarithmic searches add, not multiply. Only a row index and search bounds are stored."
        },
        "python": "from typing import List\nclass Solution:\n    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:\n        left,right=0,len(matrix)\n        while left<right:\n            mid=(left+right)//2\n            if matrix[mid][0]<=target: left=mid+1\n            else: right=mid\n        row=left-1\n        if row<0: return False\n        left,right=0,len(matrix[0])-1\n        while left<=right:\n            mid=(left+right)//2\n            if matrix[row][mid]==target: return True\n            if matrix[row][mid]<target: left=mid+1\n            else: right=mid-1\n        return False",
        "java": "class Solution {\n    public boolean searchMatrix(int[][] matrix,int target) {\n        int left=0,right=matrix.length;\n        while(left<right) {\n            int mid=left+(right-left)/2;\n            if(matrix[mid][0]<=target) left=mid+1;else right=mid;\n        }\n        int row=left-1;if(row<0) return false;\n        left=0;right=matrix[0].length-1;\n        while(left<=right) {\n            int mid=left+(right-left)/2;\n            if(matrix[row][mid]==target) return true;\n            if(matrix[row][mid]<target) left=mid+1;else right=mid-1;\n        }\n        return false;\n    }\n}",
        "trace": [
          {
            "cells": [
              "row starts=[2,9]",
              "target=12",
              "left=0,right=2"
            ],
            "note": {
              "zh": "先在行首元素上找首个大于 12 的行。",
              "en": "Find the first row starting above 12."
            }
          },
          {
            "cells": [
              "mid=1: 9<=12",
              "left=2",
              "row=1"
            ],
            "note": {
              "zh": "行首上界为 2，因此候选行为 1。",
              "en": "The upper bound is 2, so candidate row is 1."
            }
          },
          {
            "cells": [
              "row=[9,12,15]",
              "mid=1: 12",
              "true"
            ],
            "note": {
              "zh": "行内二分一次命中。",
              "en": "One inner binary-search probe matches."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/search-a-2d-matrix/"
      }
    ],
    "slug": "search-a-2d-matrix",
    "title": {
      "zh": "搜索二维矩阵",
      "en": "Search a 2D Matrix"
    },
    "category": {
      "zh": "二分查找",
      "en": "Binary Search"
    },
    "level": {
      "zh": "中等",
      "en": "Medium"
    }
  },
  {
    "id": 34,
    "statement": {
      "zh": "给定允许重复的非递减数组 nums 和 target，返回 target 第一次和最后一次出现的下标。没有出现则返回 [-1,-1]。数组可以为空，要求 O(log n) 时间。",
      "en": "For a nondecreasing array that may contain duplicates, return target’s first and last indices, or [-1,-1] if absent. Empty input is allowed; the required runtime is O(log n)."
    },
    "constraints": {
      "zh": [
        "0 ≤ nums.length ≤ 100000",
        "nums[i] 和 target 均在 [-10^9,10^9]。",
        "nums 非递减；要求 O(log n)。"
      ],
      "en": [
        "0 ≤ nums.length ≤ 100000",
        "Values and target are within [-10^9,10^9].",
        "nums is nondecreasing; required time is O(log n)."
      ]
    },
    "example": {
      "zh": "nums=[1,3,3,3,7], target=3 → [1,3]。",
      "en": "nums=[1,3,3,3,7], target=3 → [1,3]."
    },
    "methods": [
      {
        "key": "two-bounds",
        "name": {
          "zh": "分别二分左右分界",
          "en": "Binary-search both boundaries"
        },
        "intuition": {
          "zh": "相同值在有序数组中必连续。找第一个 ≥target 的位置 L，再找第一个 >target 的位置 U，目标占据半开区间 [L,U)。区别只在相等时向哪边移动；不用 target+1，也避免在命中后线性向两侧扫描。",
          "en": "Equal values form one contiguous interval. Let L be the first value ≥target and U the first value >target; matches occupy [L,U). Only the equality decision differs. Avoid target+1 and avoid linear expansion after finding one match."
        },
        "steps": {
          "zh": [
            "实现 bound(strict)，strict=false 找 ≥，true 找 >。",
            "用 [left,right) 搜索；被判定为太小的 mid 使 left=mid+1。",
            "先算 L；若 L=n 或 nums[L] 不等 target，返回 [-1,-1]。",
            "再求 U，返回 [L,U-1]。"
          ],
          "en": [
            "Implement bound(strict): false means ≥, true means >.",
            "Use [left,right); discard values on the too-small side.",
            "Compute L and return [-1,-1] if it is not a target occurrence.",
            "Compute U and return [L,U-1]."
          ]
        },
        "correctness": {
          "zh": "下界左侧都小于 target，上界右侧都大于 target；二者之间只能等于 target，恰好覆盖所有出现位置。",
          "en": "Values before L are smaller and values from U onward are larger. Exactly the entries between the boundaries equal target."
        },
        "time": "O(log(n+1))",
        "space": "O(1)",
        "complexity": {
          "zh": "两次对数搜索之和仍为对数；n=0 时直接退出循环，使用 log(n+1) 表达空数组情况。只存常数个下标。",
          "en": "Two logarithmic searches remain logarithmic; log(n+1) covers empty input. Only a constant number of indices is stored."
        },
        "python": "from typing import List\nclass Solution:\n    def searchRange(self, nums: List[int], target: int) -> List[int]:\n        def bound(strict):\n            left,right=0,len(nums)\n            while left<right:\n                mid=(left+right)//2\n                if nums[mid]<target or (strict and nums[mid]==target): left=mid+1\n                else: right=mid\n            return left\n        first=bound(False)\n        if first==len(nums) or nums[first]!=target: return [-1,-1]\n        return [first,bound(True)-1]",
        "java": "class Solution {\n    public int[] searchRange(int[] nums,int target) {\n        int first=bound(nums,target,false);\n        if(first==nums.length || nums[first]!=target) return new int[]{-1,-1};\n        return new int[]{first,bound(nums,target,true)-1};\n    }\n    private int bound(int[] a,int target,boolean strict) {\n        int left=0,right=a.length;\n        while(left<right) {\n            int mid=left+(right-left)/2;\n            if(a[mid]<target || (strict && a[mid]==target)) left=mid+1;else right=mid;\n        }\n        return left;\n    }\n}",
        "trace": [
          {
            "cells": [
              "[1,3,3,3,7]",
              "target=3"
            ],
            "note": {
              "zh": "重复的目标形成连续段。",
              "en": "The repeated target forms a contiguous run."
            }
          },
          {
            "cells": [
              "lower: mid=2 -> right=2",
              "mid=1 -> right=1",
              "mid=0 -> left=1",
              "L=1"
            ],
            "note": {
              "zh": "寻找第一个 ≥3 的位置，相等时继续向左。",
              "en": "Find the first ≥3; equality keeps searching left."
            }
          },
          {
            "cells": [
              "upper: mid=2 -> left=3",
              "mid=4 -> right=4",
              "mid=3 -> left=4",
              "U=4"
            ],
            "note": {
              "zh": "寻找第一个 >3 的位置，相等时向右排除。",
              "en": "Find the first >3; equality is discarded on the left."
            }
          },
          {
            "cells": [
              "[L,U)=[1,4)",
              "answer=[1,3]"
            ],
            "note": {
              "zh": "把右开边界减一得到最后位置。",
              "en": "Subtract one from the exclusive boundary for the last position."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/"
      }
    ],
    "slug": "find-first-and-last-position-of-element-in-sorted-array",
    "title": {
      "zh": "在排序数组中查找元素的第一个和最后一个位置",
      "en": "Find First and Last Position of Element in Sorted Array"
    },
    "category": {
      "zh": "二分查找",
      "en": "Binary Search"
    },
    "level": {
      "zh": "中等",
      "en": "Medium"
    }
  },
  {
    "id": 33,
    "statement": {
      "zh": "一个互不相同、原本严格递增的数组可能在某处旋转，也可能保持原状。输入旋转后的 nums 和 target，返回目标在当前数组中的下标，不存在返回 -1。要求 O(log n) 时间。",
      "en": "A distinct, initially increasing array may have been rotated at one split point or left unchanged. Return target’s index in the current array, or -1 if absent, in O(log n) time."
    },
    "constraints": {
      "zh": [
        "1 ≤ nums.length ≤ 5000",
        "nums[i] 和 target 均在 [-10000,10000]。",
        "nums 无重复；由严格递增数组旋转或保持原状得到。"
      ],
      "en": [
        "1 ≤ nums.length ≤ 5000",
        "Values and target are within [-10000,10000].",
        "Distinct values; nums is a rotation of an increasing array, including no rotation."
      ]
    },
    "example": {
      "zh": "nums=[6,8,1,3,4], target=3 → 3。",
      "en": "nums=[6,8,1,3,4], target=3 → 3."
    },
    "methods": [
      {
        "key": "ordered-half",
        "name": {
          "zh": "识别有序半区",
          "en": "Identify the sorted half"
        },
        "intuition": {
          "zh": "旋转只有一个断点，所以任取中点，总有至少一半是有序的。先找出有序半段，再用端点的数值范围判断 target 是否可能落在其中。若在就保留它，否则丢弃它；不能只根据 mid 值与 target 的大小直接套普通二分。",
          "en": "There is only one rotation break, so at least one half around the midpoint is sorted. Identify that half, then test target against its endpoint range. Keep it if the value belongs there; otherwise discard it. Comparing only mid with target is insufficient."
        },
        "steps": {
          "zh": [
            "闭区间搜索，先检查 mid 是否命中。",
            "若 nums[left]≤nums[mid]，左半有序，检查 nums[left]≤target<nums[mid]。",
            "否则右半有序，检查 nums[mid]<target≤nums[right]。",
            "按范围保留一半，区间为空返回 -1。"
          ],
          "en": [
            "Use a closed interval and test mid for equality first.",
            "If nums[left]≤nums[mid], test target against the sorted left range.",
            "Otherwise test it against the sorted right range.",
            "Keep the possible half, or return -1 when empty."
          ]
        },
        "correctness": {
          "zh": "无重复且只有一个断点保证有序半区可识别。目标落在其端点范围内时，其他半区不可能含相同值；否则有序半区可安全排除。",
          "en": "Distinct values and one break identify a sorted half. Its endpoint range decides whether target can lie there; uniqueness makes eliminating the other half safe."
        },
        "time": "O(log n)",
        "space": "O(1)",
        "complexity": {
          "zh": "每轮至少丢弃一半候选，常数空间。本结论依赖无重复值；含重复值时不能直接沿用判定。",
          "en": "Each round discards at least half the candidates using constant space. The sorted-half decision relies on distinct values."
        },
        "python": "from typing import List\nclass Solution:\n    def search(self, nums: List[int], target: int) -> int:\n        left,right=0,len(nums)-1\n        while left<=right:\n            mid=(left+right)//2\n            if nums[mid]==target: return mid\n            if nums[left]<=nums[mid]:\n                if nums[left]<=target<nums[mid]: right=mid-1\n                else: left=mid+1\n            else:\n                if nums[mid]<target<=nums[right]: left=mid+1\n                else: right=mid-1\n        return -1",
        "java": "class Solution {\n    public int search(int[] nums,int target) {\n        int left=0,right=nums.length-1;\n        while(left<=right) {\n            int mid=left+(right-left)/2;\n            if(nums[mid]==target) return mid;\n            if(nums[left]<=nums[mid]) {\n                if(nums[left]<=target && target<nums[mid]) right=mid-1;else left=mid+1;\n            } else {\n                if(nums[mid]<target && target<=nums[right]) left=mid+1;else right=mid-1;\n            }\n        }\n        return -1;\n    }\n}",
        "trace": [
          {
            "cells": [
              "[6,8,1,3,4]",
              "left=0,right=4",
              "mid=2: 1"
            ],
            "note": {
              "zh": "左半跨过旋转点，右半 [1,3,4] 有序。",
              "en": "The left half crosses the break; the right half [1,3,4] is sorted."
            }
          },
          {
            "cells": [
              "1 < 3 <= 4",
              "left=3,right=4"
            ],
            "note": {
              "zh": "目标在有序右半的值域内，保留右侧。",
              "en": "Target belongs to the right half’s range; keep that half."
            }
          },
          {
            "cells": [
              "mid=3",
              "nums[3]=3",
              "answer=3"
            ],
            "note": {
              "zh": "新中点命中，返回当前数组下标 3。",
              "en": "The next midpoint matches; return physical index 3."
            }
          }
        ]
      },
      {
        "key": "pivot",
        "name": {
          "zh": "先找旋转点，再映射二分",
          "en": "Find the pivot, then binary-search mapped indices"
        },
        "intuition": {
          "zh": "最小值的位置是原递增序列的起点。先用 nums[mid] 与右端比较找到它，再把逻辑有序下标 k 映射到 (pivot+k)%n。第二次搜索面对的是完整有序序列，返回时必须返回映射后的真实下标。",
          "en": "The minimum marks the start of the original sorted sequence. Locate it by comparing mid with the right endpoint, then map logical index k to (pivot+k)%n. The second search sees a sorted sequence and must return the physical index."
        },
        "steps": {
          "zh": [
            "用闭区间找最小值：mid>right 的值时最小值在右侧，否则保留左侧含 mid。",
            "记录 pivot。",
            "对逻辑区间 [0,n-1] 二分，比较 nums[(pivot+mid)%n]。",
            "命中返回实际下标，找不到返回 -1。"
          ],
          "en": [
            "Locate the minimum: if nums[mid]>nums[right], move left past mid; otherwise keep mid.",
            "Record pivot.",
            "Search logical indices [0,n-1] through nums[(pivot+mid)%n].",
            "Return the mapped index on equality, or -1."
          ]
        },
        "correctness": {
          "zh": "第一次二分始终保留唯一最小值；从最小值循环读取恢复原有序序列，第二次二分因此正确，映射保留实际位置。",
          "en": "The first search retains the unique minimum. Circular traversal from it restores sorted order, making the second binary search valid while preserving physical indices."
        },
        "time": "O(log n)",
        "space": "O(1)",
        "complexity": {
          "zh": "两次二分 O(log n)+O(log n)，取模映射为常数操作，不复制或旋转输入。",
          "en": "Two logarithmic searches add to O(log n). Modulo mapping is constant-time and the input is not copied or rotated."
        },
        "python": "from typing import List\nclass Solution:\n    def search(self, nums: List[int], target: int) -> int:\n        n=len(nums); left,right=0,n-1\n        while left<right:\n            mid=(left+right)//2\n            if nums[mid]>nums[right]: left=mid+1\n            else: right=mid\n        pivot=left; left,right=0,n-1\n        while left<=right:\n            mid=(left+right)//2; real=(pivot+mid)%n\n            if nums[real]==target: return real\n            if nums[real]<target: left=mid+1\n            else: right=mid-1\n        return -1",
        "java": "class Solution {\n    public int search(int[] nums,int target) {\n        int n=nums.length,left=0,right=n-1;\n        while(left<right) {\n            int mid=left+(right-left)/2;\n            if(nums[mid]>nums[right]) left=mid+1;else right=mid;\n        }\n        int pivot=left;left=0;right=n-1;\n        while(left<=right) {\n            int mid=left+(right-left)/2,real=(pivot+mid)%n;\n            if(nums[real]==target) return real;\n            if(nums[real]<target) left=mid+1;else right=mid-1;\n        }\n        return -1;\n    }\n}",
        "trace": [
          {
            "cells": [
              "left=0,right=4",
              "mid=2: 1<=4",
              "right=2"
            ],
            "note": {
              "zh": "最小值在左侧含中点区间。",
              "en": "The minimum lies at or left of mid."
            }
          },
          {
            "cells": [
              "mid=1: 8>1",
              "left=2",
              "pivot=2"
            ],
            "note": {
              "zh": "旋转点确定为下标 2。",
              "en": "The pivot is index 2."
            }
          },
          {
            "cells": [
              "logical=[1,3,4,6,8]",
              "mid=2 -> real=4 -> value=4",
              "right=1"
            ],
            "note": {
              "zh": "映射二分先排除大于目标的一侧。",
              "en": "Mapped binary search first discards the larger side."
            }
          },
          {
            "cells": [
              "mid=0 -> real=2 -> value=1",
              "left=1",
              "mid=1 -> real=3 -> value=3",
              "answer=3"
            ],
            "note": {
              "zh": "下一步跳过 1，再命中 3，返回真实下标。",
              "en": "Skip 1, then match 3 and return its physical index."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/search-in-rotated-sorted-array/"
      }
    ],
    "slug": "search-in-rotated-sorted-array",
    "title": {
      "zh": "搜索旋转排序数组",
      "en": "Search in Rotated Sorted Array"
    },
    "category": {
      "zh": "二分查找",
      "en": "Binary Search"
    },
    "level": {
      "zh": "中等",
      "en": "Medium"
    }
  },
  {
    "id": 153,
    "statement": {
      "zh": "一个元素互不相同的递增整数数组经过循环右移，得到 nums。右移次数可以等于数组长度，因此输入也可能仍然递增。返回数组最小元素；目标时间复杂度为 O(log n)。",
      "en": "An ascending array of distinct integers is circularly shifted to form nums. A full-length shift is allowed, so the input may still be sorted. Return its minimum, targeting O(log n) time."
    },
    "constraints": {
      "zh": [
        "1 ≤ n ≤ 5000；n = nums.length",
        "−5000 ≤ nums[i] ≤ 5000；元素互异",
        "输入是递增数组经过 1 至 n 次循环右移的结果"
      ],
      "en": [
        "1 ≤ n ≤ 5000; n = nums.length",
        "−5000 ≤ nums[i] ≤ 5000; values are distinct",
        "The input is an ascending array rotated right 1 through n times"
      ]
    },
    "example": {
      "zh": "nums=[8,11,2,5] → 2；旋转断点处的 2 是最小值。",
      "en": "nums=[8,11,2,5] → 2; the minimum is at the rotation boundary."
    },
    "methods": [
      {
        "key": "scan",
        "name": {
          "zh": "线性扫描（理解基线，不满足对数要求）",
          "en": "Linear scan (baseline; misses the logarithmic target)"
        },
        "intuition": {
          "zh": "暂时忽略旋转性质，把问题当作普通数组求最小值。维护已经看过元素的最小值，每读一个元素只需与当前答案比较。这个版本用于检验二分结果，不作为满足题目复杂度要求的最终方案。",
          "en": "Ignore the rotation and maintain the smallest value seen so far. Each new value can only keep or lower that minimum. This is a useful reference implementation for testing the binary search, but it does not meet the requested logarithmic bound."
        },
        "steps": {
          "zh": [
            "把首项设为 best，避免错误地用 0 初始化。",
            "依次比较每个元素；更小时替换 best。",
            "扫描结束返回 best。"
          ],
          "en": [
            "Initialize best from the first element, not zero.",
            "Compare every value with best and replace it when smaller.",
            "Return best after the scan."
          ]
        },
        "correctness": {
          "zh": "扫描任意前缀后，best 都等于该前缀的最小值；处理完整数组后即为所求。",
          "en": "After each prefix, best is its minimum. The complete prefix is the whole input."
        },
        "time": "O(n)",
        "space": "O(1)",
        "complexity": {
          "zh": "n 个元素各比较一次，只有一个答案变量；不修改输入。",
          "en": "Each of n elements is checked once; only one running answer is stored. The input is unchanged."
        },
        "python": "class Solution:\n    def findMin(self, nums):\n        best = nums[0]\n        for x in nums:\n            best = min(best, x)\n        return best\n",
        "java": "class Solution {\n    public int findMin(int[] nums) {\n        int best = nums[0];\n        for (int x : nums) best = Math.min(best, x);\n        return best;\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "best=8"
            ],
            "note": {
              "zh": "从首项开始，8 是当前最小。",
              "en": "Start with the first value, 8."
            }
          },
          {
            "cells": [
              "x=11",
              "best=8"
            ],
            "note": {
              "zh": "11 不会降低最小值。",
              "en": "11 does not lower the minimum."
            }
          },
          {
            "cells": [
              "x=2",
              "best=2"
            ],
            "note": {
              "zh": "遇到 2 更新，最后的 5 不再改变答案。",
              "en": "Update at 2; the final 5 leaves the answer unchanged."
            }
          }
        ]
      },
      {
        "key": "binary",
        "name": {
          "zh": "保留最小值的二分",
          "en": "Binary search retaining the minimum"
        },
        "intuition": {
          "zh": "旋转后的数组由至多两段递增区间组成。拿中点与右端比较：若中点更大，它属于断点前的高值段，最小值只能在其右侧；否则中点到右端没有跨过下降断点，右侧不会比中点更小，因此保留中点和左半段。",
          "en": "A rotated array contains at most two increasing runs. If the middle value exceeds the right endpoint, the minimum lies beyond the middle in the lower run. Otherwise the middle-to-right section does not cross the drop: keep the middle and everything to its left."
        },
        "steps": {
          "zh": [
            "令 l=0、r=n−1，始终让最小值位于闭区间 [l,r]。",
            "取 mid=l+(r−l)//2；nums[mid]>nums[r] 时令 l=mid+1。",
            "否则令 r=mid，不能减 1，因为 mid 本身可能最小。",
            "l=r 时返回 nums[l]；单元素与未旋转数组同样适用。"
          ],
          "en": [
            "Start with l=0 and r=n−1; the minimum stays inside [l,r].",
            "Compute mid; when nums[mid]>nums[r], set l=mid+1.",
            "Otherwise set r=mid, preserving mid as a possible minimum.",
            "Return nums[l] when both endpoints meet."
          ]
        },
        "correctness": {
          "zh": "两个分支均只删除不可能包含最小值的部分，且区间严格缩小；最终唯一留下的元素就是最小值。互异条件使比较不会产生重复值歧义。",
          "en": "Each branch removes only positions that cannot hold the minimum and strictly shrinks the interval. Distinct values make the comparison decisive."
        },
        "time": "O(log n)",
        "space": "O(1)",
        "complexity": {
          "zh": "每次把候选区间缩小约一半；只保存左右边界和中点。",
          "en": "Each iteration roughly halves the candidate interval and uses only three indices."
        },
        "python": "class Solution:\n    def findMin(self, nums):\n        l, r = 0, len(nums) - 1\n        while l < r:\n            mid = (l + r) // 2\n            if nums[mid] > nums[r]:\n                l = mid + 1\n            else:\n                r = mid\n        return nums[l]\n",
        "java": "class Solution {\n    public int findMin(int[] nums) {\n        int l=0, r=nums.length-1;\n        while(l<r) {\n            int mid=l+(r-l)/2;\n            if(nums[mid]>nums[r]) l=mid+1;\n            else r=mid;\n        }\n        return nums[l];\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "l=0",
              "r=3",
              "mid=1"
            ],
            "note": {
              "zh": "11>5，最小值在中点右侧。",
              "en": "11>5, so the minimum is right of the midpoint."
            }
          },
          {
            "cells": [
              "l=2",
              "r=3",
              "mid=2"
            ],
            "note": {
              "zh": "2<5，保留中点，令 r=2。",
              "en": "2<5: retain the midpoint and set r=2."
            }
          },
          {
            "cells": [
              "l=r=2",
              "answer=2"
            ],
            "note": {
              "zh": "区间只剩最小值。",
              "en": "Only the minimum remains."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/"
      }
    ],
    "slug": "find-minimum-in-rotated-sorted-array",
    "title": {
      "zh": "寻找旋转排序数组中的最小值",
      "en": "Find Minimum in Rotated Sorted Array"
    },
    "category": {
      "zh": "二分查找",
      "en": "Binary Search"
    },
    "level": {
      "zh": "中等",
      "en": "Medium"
    }
  },
  {
    "id": 4,
    "statement": {
      "zh": "nums1、nums2 各自按非递减顺序排列。求把两数组的所有元素合在一起后的中位数，重复值也计数；总长度为偶数时取中间两数的平均值。要求对数时间。",
      "en": "Given two nondecreasing arrays, find the median of their combined multiset, counting duplicates. For an even total length, average the two middle values. The requested running time is logarithmic."
    },
    "constraints": {
      "zh": [
        "0 ≤ m,n ≤ 1000；1 ≤ m+n ≤ 2000",
        "元素范围 −10^6 至 10^6；两个数组各自有序"
      ],
      "en": [
        "0 ≤ m,n ≤ 1000; 1 ≤ m+n ≤ 2000",
        "Values range from −10^6 to 10^6; each array is sorted"
      ]
    },
    "example": {
      "zh": "nums1=[2,6], nums2=[3,9] → 4.5；中间两个数是 3 和 6。",
      "en": "nums1=[2,6], nums2=[3,9] → 4.5; the middle values are 3 and 6."
    },
    "methods": [
      {
        "key": "merge",
        "name": {
          "zh": "双指针取到中间（线性基线）",
          "en": "Merge only as far as the middle (linear baseline)"
        },
        "intuition": {
          "zh": "完整排序没有必要：两个数组的未读部分中，下一小的数一定是两端头部的较小者。一直取到中间位置，仅保存上一个数和当前数，即可处理奇偶两种长度。此方法不满足对数时间目标。",
          "en": "The next smallest unread value is the smaller of the two array heads. Stop at the central index and retain only the last two selected values. This avoids a merged array, but remains a linear baseline rather than the requested logarithmic solution."
        },
        "steps": {
          "zh": [
            "i、j 分别指向两个数组的首个未读元素。",
            "重复取较小头部，总共取 floor((m+n)/2)+1 次；一个数组耗尽时从另一个取。",
            "每次将 current 移入 previous，再更新 current。",
            "奇数返回 current，偶数返回 (previous+current)/2。"
          ],
          "en": [
            "Use i and j as the next unread positions.",
            "Select the smaller head floor((m+n)/2)+1 times, handling an exhausted array.",
            "Save the previous selected value before replacing current.",
            "Return current for an odd length, or their mean for an even length."
          ]
        },
        "correctness": {
          "zh": "按头部大小取数等价于归并排序的合并步骤，因此最后保存的一个或两个值恰为合并序列的中间值。",
          "en": "Head selection produces the combined sorted sequence in order, so the retained values are exactly its middle values."
        },
        "time": "O(m+n)",
        "space": "O(1)",
        "complexity": {
          "zh": "最多读取总元素的一半再加一，渐进仍是线性；没有复制或切片数组。",
          "en": "Reading half the elements plus one is still linear; no array copy or slice is created."
        },
        "python": "class Solution:\n    def findMedianSortedArrays(self, nums1, nums2):\n        i = j = 0\n        previous = current = 0\n        total = len(nums1) + len(nums2)\n        for _ in range(total // 2 + 1):\n            previous = current\n            if i < len(nums1) and (j == len(nums2) or nums1[i] <= nums2[j]):\n                current = nums1[i]; i += 1\n            else:\n                current = nums2[j]; j += 1\n        return float(current) if total % 2 else (previous + current) / 2.0\n",
        "java": "class Solution {\n    public double findMedianSortedArrays(int[] a, int[] b) {\n        int i=0,j=0,prev=0,cur=0,total=a.length+b.length;\n        for(int t=0;t<=total/2;t++) {\n            prev=cur;\n            if(i<a.length && (j==b.length || a[i]<=b[j])) cur=a[i++];\n            else cur=b[j++];\n        }\n        return total%2==1 ? cur : ((double)prev+cur)/2;\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "i=1",
              "j=0",
              "current=2"
            ],
            "note": {
              "zh": "取两个头部中较小的 2。",
              "en": "Take the smaller head, 2."
            }
          },
          {
            "cells": [
              "i=1",
              "j=1",
              "previous=2",
              "current=3"
            ],
            "note": {
              "zh": "下一项是 3。",
              "en": "The next value is 3."
            }
          },
          {
            "cells": [
              "previous=3",
              "current=6",
              "median=4.5"
            ],
            "note": {
              "zh": "第三次取 6，中间两项均值为 4.5。",
              "en": "Take 6 third; average the central pair to get 4.5."
            }
          }
        ]
      },
      {
        "key": "partition",
        "name": {
          "zh": "二分查找平衡切口",
          "en": "Binary search for a balanced partition"
        },
        "intuition": {
          "zh": "不必知道完整排序，只需把数据分成“左边数量合适且全部不大于右边”的两部分。在短数组放 i 个数到左边后，另一数组的左边数量 j 就被总数决定。每个数组内部已排序，检查切口附近四个数就能判断全局切分是否合法。",
          "en": "We only need a balanced split with every left value no larger than every right value. Choosing i left-side values from the shorter array determines j for the other array. Internal order is already known, so only four values adjacent to the cuts need checking."
        },
        "steps": {
          "zh": [
            "交换引用，让 a 是短数组；二分 i∈[0,m]。",
            "令 j=(m+n+1)//2−i，让左边在奇数长度时多一个。",
            "空边界用负无穷或正无穷表示；若 aLeft>bRight，减少 i；若 bLeft>aRight，增加 i。",
            "两条跨数组比较都成立时，奇数返回左侧最大，偶数取左侧最大与右侧最小的均值。"
          ],
          "en": [
            "Use the shorter array as a and search i from 0 through m.",
            "Set j=(m+n+1)//2−i so the left side gets the extra odd element.",
            "Use infinity sentinels at empty boundaries. Move left if aLeft>bRight and right if bLeft>aRight.",
            "At a valid cut, return the left maximum or average the two central boundaries."
          ]
        },
        "correctness": {
          "zh": "每次移动切口都修正唯一违反顺序的方向。合法切口保证数量平衡且所有左值不大于所有右值，因此边界值就是中位数。",
          "en": "The failed cross-comparison determines the necessary cut direction. At a valid cut, balanced sizes and global ordering identify the central value or pair."
        },
        "time": "O(log(min(m,n)+1))",
        "space": "O(1)",
        "complexity": {
          "zh": "只搜索短数组的 m+1 个切口，数组交换只交换引用，不复制内容。",
          "en": "Search only the shorter array’s m+1 cut positions; swapping references creates no copy."
        },
        "python": "class Solution:\n    def findMedianSortedArrays(self, nums1, nums2):\n        a, b = nums1, nums2\n        if len(a) > len(b): a, b = b, a\n        m, n = len(a), len(b)\n        lo, hi = 0, m\n        while lo <= hi:\n            i = (lo + hi) // 2\n            j = (m + n + 1) // 2 - i\n            al = a[i-1] if i else float('-inf')\n            ar = a[i] if i < m else float('inf')\n            bl = b[j-1] if j else float('-inf')\n            br = b[j] if j < n else float('inf')\n            if al > br: hi = i-1\n            elif bl > ar: lo = i+1\n            else:\n                return float(max(al, bl)) if (m+n)%2 else (max(al,bl)+min(ar,br))/2.0\n",
        "java": "class Solution {\n    public double findMedianSortedArrays(int[] a, int[] b) {\n        if(a.length>b.length) { int[] t=a; a=b; b=t; }\n        int m=a.length,n=b.length,lo=0,hi=m;\n        while(lo<=hi) {\n            int i=(lo+hi)/2,j=(m+n+1)/2-i;\n            double al=i==0?Double.NEGATIVE_INFINITY:a[i-1];\n            double ar=i==m?Double.POSITIVE_INFINITY:a[i];\n            double bl=j==0?Double.NEGATIVE_INFINITY:b[j-1];\n            double br=j==n?Double.POSITIVE_INFINITY:b[j];\n            if(al>br) hi=i-1;\n            else if(bl>ar) lo=i+1;\n            else return (m+n)%2==1?Math.max(al,bl):(Math.max(al,bl)+Math.min(ar,br))/2;\n        }\n        throw new IllegalArgumentException(\"Input must be sorted\");\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "a=[2,6]",
              "b=[3,9]",
              "leftSize=2"
            ],
            "note": {
              "zh": "两侧各需两个元素。",
              "en": "Each side needs two elements."
            }
          },
          {
            "cells": [
              "i=1",
              "j=1",
              "2|6",
              "3|9"
            ],
            "note": {
              "zh": "尝试在两个数组各取一个到左边。",
              "en": "Place one element from each array on the left."
            }
          },
          {
            "cells": [
              "2<=9",
              "3<=6",
              "median=(3+6)/2=4.5"
            ],
            "note": {
              "zh": "交叉比较成立，取两侧边界均值。",
              "en": "Cross-comparisons hold; average the central boundaries."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/median-of-two-sorted-arrays/"
      }
    ],
    "slug": "median-of-two-sorted-arrays",
    "title": {
      "zh": "寻找两个正序数组的中位数",
      "en": "Median of Two Sorted Arrays"
    },
    "category": {
      "zh": "二分查找",
      "en": "Binary Search"
    },
    "level": {
      "zh": "困难",
      "en": "Hard"
    }
  },
  {
    "id": 20,
    "statement": {
      "zh": "字符串只含圆括号、方括号和花括号。判断能否把所有括号配对，使每个右括号关闭最近尚未关闭、且类型相同的左括号；不能遗留未配对的括号。",
      "en": "The string contains only round, square and curly brackets. Decide whether every closer matches the most recent unmatched opener of its type, with no brackets left unmatched."
    },
    "constraints": {
      "zh": [
        "1 ≤ s.length ≤ 10^4",
        "仅含 ()[]{} 六种字符"
      ],
      "en": [
        "1 ≤ s.length ≤ 10^4",
        "Only the six characters ()[]{} occur"
      ]
    },
    "example": {
      "zh": "s=\"[{}()]\" → true；s=\"[(])\" → false，后者闭合顺序错误。",
      "en": "s=\"[{}()]\" → true; s=\"[(])\" → false because closures cross."
    },
    "methods": [
      {
        "key": "reduce",
        "name": {
          "zh": "反复消去相邻括号（基线）",
          "en": "Repeated adjacent-pair removal (baseline)"
        },
        "intuition": {
          "zh": "合法嵌套总有一个最内层括号对，它们在当前串中相邻。删掉这样的对不会改变外层是否合法。反复删除直到没有变化，就把嵌套匹配转成了字符串化简；代价是多次扫描和复制。",
          "en": "A valid nested expression has an innermost adjacent pair. Removing such a pair preserves validity of the enclosing structure. Repeated reduction is intuitive, but rescans and copies strings many times."
        },
        "steps": {
          "zh": [
            "依次删除当前串中的 ()、[]、{}。",
            "一轮后长度减小则继续；不再变化则停止。",
            "只有最终字符串为空才返回 true。"
          ],
          "en": [
            "Remove occurrences of (), [], and {}.",
            "Repeat while a round reduces the length.",
            "Return true only if the final string is empty."
          ]
        },
        "correctness": {
          "zh": "合法串总能消去一个最内层对，直到空串；每次消去也可逆地插回合法对，因此不能把非法串误变为空串。",
          "en": "A valid nonempty string always has a removable innermost pair. Each removal preserves validity in both directions, so only valid strings reduce to empty."
        },
        "time": "O(n²)",
        "space": "O(n)",
        "complexity": {
          "zh": "深度 n/2 的嵌套可能需要线性轮数，每轮扫描并复制 O(n) 字符；峰值字符串存储 O(n)。大输入优先用栈。",
          "en": "Linear nesting depth may require O(n) rounds, each scanning and copying O(n) characters. Peak string storage is O(n); prefer the stack for large inputs."
        },
        "python": "class Solution:\n    def isValid(self, s):\n        while True:\n            t = s.replace('()', '').replace('[]', '').replace('{}', '')\n            if len(t) == len(s): return not t\n            s = t\n",
        "java": "class Solution {\n    public boolean isValid(String s) {\n        while(true) {\n            String t=s.replace(\"()\", \"\").replace(\"[]\", \"\").replace(\"{}\", \"\");\n            if(t.length()==s.length()) return t.isEmpty();\n            s=t;\n        }\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "[{}()]"
            ],
            "note": {
              "zh": "内层有 {} 和 () 可直接消去。",
              "en": "The innermost {} and () pairs can be removed."
            }
          },
          {
            "cells": [
              "[]"
            ],
            "note": {
              "zh": "一轮删除两对后只剩方括号。",
              "en": "Removing both pairs leaves square brackets."
            }
          },
          {
            "cells": [
              "empty",
              "true"
            ],
            "note": {
              "zh": "再删除 []，得到空串。",
              "en": "Remove [] to obtain the empty string."
            }
          }
        ]
      },
      {
        "key": "stack",
        "name": {
          "zh": "栈保存尚未闭合的括号",
          "en": "Stack of unmatched opening brackets"
        },
        "intuition": {
          "zh": "括号闭合是“后打开、先关闭”。栈顶就是下一个右括号唯一允许匹配的对象；只记录各种括号数量无法判断 ([)] 这种交叉情况。遇到左括号先保存，遇到右括号立即验证。",
          "en": "Nesting closes the most recently opened bracket first. A stack exposes exactly that candidate. Counts alone cannot detect crossed pairs such as ([)]; the stack records the necessary order as well as type."
        },
        "steps": {
          "zh": [
            "左括号压栈。",
            "右括号到来时，栈空立即失败；否则弹出并检查类型。",
            "任意类型不匹配立即失败。",
            "遍历结束检查栈为空，防止漏掉未关闭的左括号。"
          ],
          "en": [
            "Push every opening bracket.",
            "For a closer, fail if the stack is empty; otherwise pop its opener.",
            "Fail immediately if types differ.",
            "At the end require an empty stack."
          ]
        },
        "correctness": {
          "zh": "栈始终按出现顺序保存尚未匹配的左括号。合法嵌套的下一次闭合只能消费栈顶，故局部检查完整覆盖合法性要求。",
          "en": "The stack contains exactly the unmatched openers in encounter order. The next valid closer must consume its top, making the local checks sufficient."
        },
        "time": "O(n)",
        "space": "O(n)",
        "complexity": {
          "zh": "每个字符至多压栈、弹栈一次；全为左括号时最多保存 n 个字符。",
          "en": "Each character is pushed and popped at most once; all-opening input stores n characters."
        },
        "python": "class Solution:\n    def isValid(self, s):\n        stack = []\n        pairs = {')':'(', ']':'[', '}':'{'}\n        for c in s:\n            if c in '([{': stack.append(c)\n            elif not stack or stack.pop() != pairs[c]: return False\n        return not stack\n",
        "java": "import java.util.*;\nclass Solution {\n    public boolean isValid(String s) {\n        Deque<Character> stack=new ArrayDeque<>();\n        for(int i=0;i<s.length();i++) {\n            char c=s.charAt(i);\n            if(c=='(' || c=='[' || c=='{') stack.push(c);\n            else {\n                if(stack.isEmpty()) return false;\n                char wanted=c==')'?'(':c==']'?'[':'{';\n                if(stack.pop()!=wanted) return false;\n            }\n        }\n        return stack.isEmpty();\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "read=[{",
              "stack=[,{"
            ],
            "note": {
              "zh": "尚未闭合的左括号入栈。",
              "en": "Push unmatched opening brackets."
            }
          },
          {
            "cells": [
              "read=[{}()",
              "stack=["
            ],
            "note": {
              "zh": "花括号和圆括号分别匹配弹出。",
              "en": "The curly and round pairs are matched and popped."
            }
          },
          {
            "cells": [
              "read=[{}()]",
              "stack=empty",
              "true"
            ],
            "note": {
              "zh": "最后右方括号匹配，栈空。",
              "en": "The final square bracket matches; the stack is empty."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/valid-parentheses/"
      }
    ],
    "slug": "valid-parentheses",
    "title": {
      "zh": "有效的括号",
      "en": "Valid Parentheses"
    },
    "category": {
      "zh": "栈",
      "en": "Stacks"
    },
    "level": {
      "zh": "简单",
      "en": "Easy"
    }
  },
  {
    "id": 155,
    "statement": {
      "zh": "实现 MinStack：push(val) 压入值，pop() 删除栈顶，top() 返回栈顶，getMin() 返回当前最小值。所有操作要求常数时间；构造时为空栈。",
      "en": "Implement MinStack with push(val), pop(), top(), and getMin(). The last operation reads the current minimum. Start empty and support each operation in constant time."
    },
    "constraints": {
      "zh": [
        "−2^31 ≤ val ≤ 2^31−1",
        "总调用次数不超过 3×10^4",
        "pop、top、getMin 只会在非空栈上调用"
      ],
      "en": [
        "−2^31 ≤ val ≤ 2^31−1",
        "At most 3×10^4 operation calls",
        "pop, top, and getMin are called only on a nonempty stack"
      ]
    },
    "example": {
      "zh": "push(4), push(1), push(1), pop(), getMin() → 1；重复最小值仍需保留。",
      "en": "push(4), push(1), push(1), pop(), getMin() → 1; one copy of the minimum remains."
    },
    "methods": [
      {
        "key": "paired",
        "name": {
          "zh": "每层节点缓存前缀最小值",
          "en": "Cache the prefix minimum in every node"
        },
        "intuition": {
          "zh": "只存一个最小值无法应对“弹出最小值”：旧最小值已经丢失。让每个链表栈节点同时保存自身数值和截至该节点的最小值，弹栈时整个历史快照随头指针自动恢复。使用链表也避免动态数组扩容的摊还分析。",
          "en": "One global minimum loses the previous minimum when its owner is popped. Store both the value and the minimum of the prefix in each linked stack node. Popping restores the previous snapshot automatically; linked nodes avoid dynamic-array resizing costs."
        },
        "steps": {
          "zh": [
            "节点包含 value、minimum 和 next。",
            "push 时计算 min(val,旧头.minimum)，新节点指向旧头。",
            "pop 将头移到 next。",
            "top 读 value，getMin 读 minimum。"
          ],
          "en": [
            "Each node stores value, minimum, and next.",
            "For push, cache min(value, old minimum) and link to the old head.",
            "For pop, advance the head.",
            "Read value for top and minimum for getMin."
          ]
        },
        "correctness": {
          "zh": "归纳地，每个节点的 minimum 是从该节点往下全部值的最小值。新节点由旧最小值更新；弹出只恢复已正确保存的前缀。",
          "en": "Inductively, every node stores the minimum of itself and everything below it. Push preserves this invariant; pop restores an already correct node."
        },
        "time": "O(1) per operation",
        "space": "O(n)",
        "complexity": {
          "zh": "每次只分配或移动一个节点，固定次数读写；n 为当前元素数，链式节点总空间 O(n)。",
          "en": "Each operation touches or allocates one node. With n current values, nodes occupy O(n) total space."
        },
        "python": "class MinStack:\n    def __init__(self):\n        self.head = None\n    def push(self, val):\n        low = val if self.head is None else min(val, self.head[1])\n        self.head = (val, low, self.head)\n    def pop(self):\n        self.head = self.head[2]\n    def top(self):\n        return self.head[0]\n    def getMin(self):\n        return self.head[1]\n",
        "java": "class MinStack {\n    private static class Node {\n        int value, minimum; Node next;\n        Node(int v,int m,Node n) { value=v; minimum=m; next=n; }\n    }\n    private Node head;\n    public MinStack() {}\n    public void push(int val) { head=new Node(val,head==null?val:Math.min(val,head.minimum),head); }\n    public void pop() { head=head.next; }\n    public int top() { return head.value; }\n    public int getMin() { return head.minimum; }\n}\n",
        "trace": [
          {
            "cells": [
              "(4,4)"
            ],
            "note": {
              "zh": "第一层同时保存数值与最小值。",
              "en": "The first node stores value and minimum."
            }
          },
          {
            "cells": [
              "(1,1)->(1,1)->(4,4)"
            ],
            "note": {
              "zh": "两次压入 1，各自保存一层快照。",
              "en": "Each pushed 1 has its own minimum snapshot."
            }
          },
          {
            "cells": [
              "pop",
              "head=(1,1)",
              "getMin=1"
            ],
            "note": {
              "zh": "弹出一层后，另一层最小值仍为 1。",
              "en": "After one pop, the other node still records minimum 1."
            }
          }
        ]
      },
      {
        "key": "two-stacks",
        "name": {
          "zh": "数值栈与历史最小栈",
          "en": "Value stack plus a history-of-minima stack"
        },
        "intuition": {
          "zh": "另一种组织方式把全部数值和最小值变化分开。只有新值不大于当前最小时才进入辅助栈。注意必须使用“不大于”：相同最小值出现两次，弹出其中一个后还应留有另一份记录。",
          "en": "Separate ordinary values from minimum history. Push into the minimum stack whenever the new value is no greater than the current minimum. Equality matters: two equal minima require two records so popping one does not discard both."
        },
        "steps": {
          "zh": [
            "push 将值压入普通链式栈；若辅助栈空或 val≤当前最小，也压入辅助栈。",
            "pop 普通栈；若弹出值等于辅助栈顶，同时弹出辅助栈。",
            "top 从普通栈读取，getMin 从辅助栈读取。"
          ],
          "en": [
            "Push every value onto the value stack; also push it onto minima if it is no greater than the current minimum.",
            "When popping a value equal to the minimum, pop both stacks.",
            "Read top from values and getMin from minima."
          ]
        },
        "correctness": {
          "zh": "辅助栈记录仍存活的最小值历史，包含重复项。移除当前最小的一份记录后，辅助栈顶恰是剩余元素的最小值。",
          "en": "The minima stack tracks surviving record minima, including ties. Removing one matching record restores the minimum of the remaining values."
        },
        "time": "O(1) per operation",
        "space": "O(n)",
        "complexity": {
          "zh": "链式栈每次固定次数节点操作，最坏 n 个普通节点加 n 个最小值节点。",
          "en": "Linked stacks perform a fixed number of node operations; at most n value nodes and n minimum nodes are needed."
        },
        "python": "class MinStack:\n    def __init__(self):\n        self.values = self.mins = None\n    def push(self, val):\n        self.values = (val, self.values)\n        if self.mins is None or val <= self.mins[0]:\n            self.mins = (val, self.mins)\n    def pop(self):\n        value = self.values[0]\n        self.values = self.values[1]\n        if value == self.mins[0]: self.mins = self.mins[1]\n    def top(self):\n        return self.values[0]\n    def getMin(self):\n        return self.mins[0]\n",
        "java": "import java.util.*;\nclass MinStack {\n    private Deque<Integer> values=new LinkedList<>(), mins=new LinkedList<>();\n    public MinStack() {}\n    public void push(int val) {\n        values.push(val);\n        if(mins.isEmpty() || val<=mins.peek()) mins.push(val);\n    }\n    public void pop() { int v=values.pop(); if(v==mins.peek()) mins.pop(); }\n    public int top() { return values.peek(); }\n    public int getMin() { return mins.peek(); }\n}\n",
        "trace": [
          {
            "cells": [
              "values=[4]",
              "mins=[4]"
            ],
            "note": {
              "zh": "两个栈同时记录首值。",
              "en": "Both stacks record the first value."
            }
          },
          {
            "cells": [
              "values=[4,1,1]",
              "mins=[4,1,1]"
            ],
            "note": {
              "zh": "相等最小值也必须压入辅助栈。",
              "en": "Equal minima must also enter the auxiliary stack."
            }
          },
          {
            "cells": [
              "values=[4,1]",
              "mins=[4,1]",
              "min=1"
            ],
            "note": {
              "zh": "弹出一个 1 时，两栈各删除一份。",
              "en": "Popping one 1 removes one record from each stack."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/min-stack/"
      }
    ],
    "slug": "min-stack",
    "title": {
      "zh": "最小栈",
      "en": "Min Stack"
    },
    "category": {
      "zh": "栈",
      "en": "Stacks"
    },
    "level": {
      "zh": "中等",
      "en": "Medium"
    }
  },
  {
    "id": 394,
    "statement": {
      "zh": "将合法编码字符串展开：k[片段] 表示把片段解码后重复 k 次，片段内可以继续嵌套编码。数字只用于重复次数，原始文本由小写字母组成；返回完整解码字符串。",
      "en": "Expand a valid encoded string: k[fragment] repeats the decoded fragment k times. Fragments may nest. Digits represent repetition counts only; the original text consists of lowercase letters. Return the complete expansion."
    },
    "constraints": {
      "zh": [
        "1 ≤ s.length ≤ 30；仅含小写字母、数字、方括号",
        "编码合法，无额外空白；重复次数在 1 至 300",
        "最终输出长度不超过 10^5"
      ],
      "en": [
        "1 ≤ s.length ≤ 30; lowercase letters, digits, and square brackets only",
        "Valid encoding without extra whitespace; repeat counts are 1 through 300",
        "Decoded length is at most 10^5"
      ]
    },
    "example": {
      "zh": "s=\"2[x2[y]]z\" → \"xyyxyyz\"；先展开内层 yy，再重复 xyy 两次。",
      "en": "s=\"2[x2[y]]z\" → \"xyyxyyz\"; expand yy, repeat xyy twice, then append z."
    },
    "methods": [
      {
        "key": "recursive",
        "name": {
          "zh": "递归下降解析",
          "en": "Recursive-descent parsing"
        },
        "intuition": {
          "zh": "每对方括号定义一个独立子问题：读出这一层的文本，到右括号就返回。共享游标保证字符不会从头重读；数字连续累积，遇到左括号才确定完整倍数。用片段列表或 StringBuilder 避免逐字符不可变拼接。",
          "en": "Each bracket pair is a subproblem: parse its text until the matching closer. A shared cursor prevents restarting scans. Accumulate all digits before descending, then append the repeated decoded child using buffered construction."
        },
        "steps": {
          "zh": [
            "parse 读取到 ] 或输入结束。",
            "字母直接追加；数字用 k=10k+digit 累积。",
            "数字结束后跳过 [，递归解析子片段，再跳过 ]。",
            "重复子片段 k 次加入本层；合并并返回。"
          ],
          "en": [
            "Parse until ] or end of input.",
            "Append letters and accumulate multi-digit counts.",
            "Skip [, recursively parse the child, then skip ].",
            "Append k copies of the child and return the assembled text."
          ]
        },
        "correctness": {
          "zh": "每次递归恰好消费一个合法括号片段；内层按定义解码后再重复，符合编码语义。顺序追加保留并列片段顺序。",
          "en": "Every call consumes exactly one bracketed fragment. Recursively correct child expansion followed by repetition implements its meaning; sequential appends preserve order."
        },
        "time": "O(n + Ld)",
        "space": "O(n + L)",
        "complexity": {
          "zh": "n 为编码长，L 为输出长，d 为最大嵌套深度（至少按 1 计）。同一输出字符可能在 d 层构造中被复制，因此给出保守上界；缓冲及递归栈峰值 O(n+L)，含输出。",
          "en": "Let n be encoded length, L decoded length, and d=max(1,nesting depth). A character may be copied at d levels, giving this conservative bound. Live buffers and recursion require O(n+L), including output."
        },
        "python": "class Solution:\n    def decodeString(self, s):\n        i = 0\n        def parse():\n            nonlocal i\n            pieces = []\n            while i < len(s) and s[i] != ']':\n                if s[i].isdigit():\n                    k = 0\n                    while i < len(s) and s[i].isdigit():\n                        k = k * 10 + int(s[i]); i += 1\n                    i += 1\n                    child = parse()\n                    i += 1\n                    pieces.append(child * k)\n                else:\n                    pieces.append(s[i]); i += 1\n            return ''.join(pieces)\n        return parse()\n",
        "java": "class Solution {\n    private int i;\n    public String decodeString(String s) { i=0; return parse(s); }\n    private String parse(String s) {\n        StringBuilder out=new StringBuilder();\n        while(i<s.length() && s.charAt(i)!=']') {\n            if(Character.isDigit(s.charAt(i))) {\n                int k=0;\n                while(i<s.length() && Character.isDigit(s.charAt(i))) k=k*10+s.charAt(i++)-'0';\n                i++;\n                String child=parse(s); i++;\n                for(int t=0;t<k;t++) out.append(child);\n            } else out.append(s.charAt(i++));\n        }\n        return out.toString();\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "parse: 2[ x 2[y] ] z"
            ],
            "note": {
              "zh": "外层倍数 2，进入子解析。",
              "en": "Read outer count 2 and descend."
            }
          },
          {
            "cells": [
              "inner=y",
              "repeated=yy",
              "child=xyy"
            ],
            "note": {
              "zh": "内层返回 y，重复后与 x 合并。",
              "en": "The inner call returns y; repeat it and append to x."
            }
          },
          {
            "cells": [
              "xyy*2 + z = xyyxyyz"
            ],
            "note": {
              "zh": "外层子串重复两次，再接尾字母 z。",
              "en": "Repeat the outer child twice, then append z."
            }
          }
        ]
      },
      {
        "key": "stack",
        "name": {
          "zh": "显式栈保存外层上下文",
          "en": "Explicit stack of outer contexts"
        },
        "intuition": {
          "zh": "递归隐藏保存了“外层已构造文本和重复次数”。把它们显式放进栈，就能在读到 [ 时暂停外层、开始内层，在 ] 时恢复外层。整个输入只向前扫描，嵌套深度不再依赖函数调用栈。",
          "en": "Make the recursive call context explicit: save the outer buffer and repetition count on a stack. An opening bracket starts a fresh inner buffer; a closer restores the outer buffer and appends the repeated inner result."
        },
        "steps": {
          "zh": [
            "数字累积到 k。",
            "遇 [ 保存 (当前缓冲,k)，然后开启空缓冲并重置 k。",
            "遇 ] 弹出外层，将当前结果重复相应次数后追加到外层。",
            "字母追加到当前层；结束后合并当前缓冲。"
          ],
          "en": [
            "Accumulate digits in k.",
            "At [, save (buffer,k), then reset both for the inner level.",
            "At ], pop the outer context and append repeated inner text.",
            "Append letters normally and finish the final buffer."
          ]
        },
        "correctness": {
          "zh": "栈顶总是最近未闭合括号的外层，所以每个 ] 只完成对应内层；恢复的文本正好是已读前缀的正确展开。",
          "en": "The top frame belongs to the nearest unmatched opener. Each closer finishes exactly its own child and restores the correct decoded prefix."
        },
        "time": "O(n + Ld)",
        "space": "O(n + L)",
        "complexity": {
          "zh": "缓冲构造避免普通字符的平方级拼接，但嵌套重复仍可能在多层复制字符，保守 O(n+Ld)；显式栈和当前缓冲总峰值 O(n+L)，含输出。",
          "en": "Buffering avoids quadratic single-character concatenation, though nesting still copies text across levels. The conservative bound is O(n+Ld); live frames and buffers use O(n+L), including output."
        },
        "python": "class Solution:\n    def decodeString(self, s):\n        stack, pieces, k = [], [], 0\n        for c in s:\n            if c.isdigit(): k = 10*k + int(c)\n            elif c == '[':\n                stack.append((pieces, k)); pieces, k = [], 0\n            elif c == ']':\n                child = ''.join(pieces)\n                pieces, count = stack.pop()\n                pieces.append(child * count)\n            else: pieces.append(c)\n        return ''.join(pieces)\n",
        "java": "import java.util.*;\nclass Solution {\n    public String decodeString(String s) {\n        Deque<StringBuilder> buffers=new ArrayDeque<>();\n        Deque<Integer> counts=new ArrayDeque<>();\n        StringBuilder current=new StringBuilder(); int k=0;\n        for(int i=0;i<s.length();i++) {\n            char c=s.charAt(i);\n            if(Character.isDigit(c)) k=10*k+c-'0';\n            else if(c=='[') { buffers.push(current); counts.push(k); current=new StringBuilder(); k=0; }\n            else if(c==']') {\n                String child=current.toString(); current=buffers.pop(); int count=counts.pop();\n                for(int t=0;t<count;t++) current.append(child);\n            } else current.append(c);\n        }\n        return current.toString();\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "stack=[([],2)]",
              "current=x"
            ],
            "note": {
              "zh": "进入外层后保存倍数，当前读到 x。",
              "en": "Save the outer count and read x."
            }
          },
          {
            "cells": [
              "stack=[([],2)]",
              "current=xyy"
            ],
            "note": {
              "zh": "内层 ] 取回 x 和倍数 2，拼出 xyy。",
              "en": "The inner closer restores x and count 2, forming xyy."
            }
          },
          {
            "cells": [
              "stack=[]",
              "current=xyyxyyz"
            ],
            "note": {
              "zh": "外层 ] 重复 xyy 两次，继续读 z。",
              "en": "The outer closer repeats xyy twice; then read z."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/decode-string/"
      }
    ],
    "slug": "decode-string",
    "title": {
      "zh": "字符串解码",
      "en": "Decode String"
    },
    "category": {
      "zh": "栈",
      "en": "Stacks"
    },
    "level": {
      "zh": "中等",
      "en": "Medium"
    }
  },
  {
    "id": 739,
    "statement": {
      "zh": "temperatures[i] 是第 i 天的温度。对每一天，找出未来第一次严格更暖的日子，返回等待天数；若未来都不更暖，该位置返回 0。",
      "en": "For each daily temperature, return how many days pass before the first strictly warmer day. Use zero when no future day is warmer."
    },
    "constraints": {
      "zh": [
        "1 ≤ temperatures.length ≤ 10^5",
        "30 ≤ temperatures[i] ≤ 100"
      ],
      "en": [
        "1 ≤ temperatures.length ≤ 10^5",
        "30 ≤ temperatures[i] ≤ 100"
      ]
    },
    "example": {
      "zh": "[40,42,41,45] → [1,2,1,0]；42 要等到 45，等待两天。",
      "en": "[40,42,41,45] → [1,2,1,0]; 42 waits two days for 45."
    },
    "methods": [
      {
        "key": "scan",
        "name": {
          "zh": "逐天向后查找（基线）",
          "en": "Forward search for every day (baseline)"
        },
        "intuition": {
          "zh": "对今天来说，答案不是未来最高温，而是从明天开始第一个更高温。按日期向后搜索，找到就停止。这个直接版本能清楚表达“第一次”，也便于校验栈解法，但降序温度会反复扫描。",
          "en": "The answer is the first warmer day, not the warmest future day. Scan forward from tomorrow and stop at the first qualifying value. This states the requirement directly, but descending temperatures force repeated scans."
        },
        "steps": {
          "zh": [
            "答案数组初始化为 0。",
            "对每个 i，从 i+1 起寻找 temperatures[j]>temperatures[i]。",
            "找到后记录 j−i 并结束该次内循环。"
          ],
          "en": [
            "Initialize answers to zero.",
            "For each i, scan j from i+1 until its temperature is greater.",
            "Store j−i and stop that inner search."
          ]
        },
        "correctness": {
          "zh": "按 j 递增检查，第一次成功必定是最近更暖的一天；遍历完仍没找到就按定义保留 0。",
          "en": "Checking j in increasing order makes the first success the nearest warmer day; no success means zero."
        },
        "time": "O(n²)",
        "space": "O(1) auxiliary; O(n) output",
        "complexity": {
          "zh": "非递增数组需要 n(n−1)/2 次比较。除答案数组外只用下标；此基线在大输入可能超时。",
          "en": "A nonincreasing array requires n(n−1)/2 comparisons. Indices use constant extra space; this baseline may time out on large inputs."
        },
        "python": "class Solution:\n    def dailyTemperatures(self, temperatures):\n        n = len(temperatures); ans = [0]*n\n        for i in range(n):\n            for j in range(i+1, n):\n                if temperatures[j] > temperatures[i]:\n                    ans[i] = j-i; break\n        return ans\n",
        "java": "class Solution {\n    public int[] dailyTemperatures(int[] t) {\n        int n=t.length; int[] ans=new int[n];\n        for(int i=0;i<n;i++) for(int j=i+1;j<n;j++) if(t[j]>t[i]) { ans[i]=j-i; break; }\n        return ans;\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "i=0",
              "40<42",
              "ans[0]=1"
            ],
            "note": {
              "zh": "第一天往后一步就找到更暖值。",
              "en": "Day zero finds a warmer day immediately."
            }
          },
          {
            "cells": [
              "i=1",
              "41<=42",
              "45>42",
              "ans[1]=2"
            ],
            "note": {
              "zh": "42 跳过 41，再找到 45。",
              "en": "For 42, skip 41 and find 45."
            }
          },
          {
            "cells": [
              "ans=[1,2,1,0]"
            ],
            "note": {
              "zh": "41 等一天，45 后面没有日期。",
              "en": "41 waits one day; no day follows 45."
            }
          }
        ]
      },
      {
        "key": "monotonic",
        "name": {
          "zh": "单调栈批量解决等待中的日期",
          "en": "Monotonic stack of waiting days"
        },
        "intuition": {
          "zh": "把尚未找到更暖日子的下标压入栈，栈中温度从底到顶不递增。当今天更暖时，它能同时回答栈顶的若干日期：这些日期此前都没有遇到更暖日子，今天就是第一次。相等温度不能弹栈。",
          "en": "Keep unresolved days in a stack whose temperatures are nonincreasing. A warmer arrival resolves every cooler day at the top: none found a warmer day earlier, so today is their first answer. Equal values must remain unresolved."
        },
        "steps": {
          "zh": [
            "遍历当前下标 i。",
            "只要栈非空且当前温度严格大于栈顶温度，弹出 j，写 ans[j]=i−j。",
            "将 i 压栈；剩余未弹出的日期最终保持 0。"
          ],
          "en": [
            "Visit each index i.",
            "While today is strictly warmer than the top, pop j and set ans[j]=i−j.",
            "Push i; unresolved entries retain zero at the end."
          ]
        },
        "correctness": {
          "zh": "栈内日期都没有在已扫描范围找到更暖值。第一次触发弹出的温度就是其最近更暖值；栈的单调性允许连续安全弹出。",
          "en": "Stack entries have no warmer day in the scanned prefix. Their first popping event is therefore their nearest warmer day, and monotonic order makes consecutive pops safe."
        },
        "time": "O(n)",
        "space": "O(n) auxiliary; O(n) output",
        "complexity": {
          "zh": "每个下标入栈一次、出栈至多一次；虽然有 while，累计操作仅 O(n)。",
          "en": "Every index is pushed once and popped at most once, so all while-loop iterations together are linear."
        },
        "python": "class Solution:\n    def dailyTemperatures(self, temperatures):\n        ans = [0]*len(temperatures); stack = []\n        for i, value in enumerate(temperatures):\n            while stack and value > temperatures[stack[-1]]:\n                j = stack.pop(); ans[j] = i-j\n            stack.append(i)\n        return ans\n",
        "java": "import java.util.*;\nclass Solution {\n    public int[] dailyTemperatures(int[] t) {\n        int[] ans=new int[t.length]; Deque<Integer> stack=new ArrayDeque<>();\n        for(int i=0;i<t.length;i++) {\n            while(!stack.isEmpty() && t[i]>t[stack.peek()]) { int j=stack.pop(); ans[j]=i-j; }\n            stack.push(i);\n        }\n        return ans;\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "i=1",
              "pop=0",
              "ans[0]=1"
            ],
            "note": {
              "zh": "42 解决等待中的 40。",
              "en": "42 resolves the waiting 40."
            }
          },
          {
            "cells": [
              "i=2",
              "stack=[1,2]"
            ],
            "note": {
              "zh": "41 不高于 42，继续等待。",
              "en": "41 is not warmer than 42, so both wait."
            }
          },
          {
            "cells": [
              "i=3",
              "pop=2,1",
              "ans=[1,2,1,0]"
            ],
            "note": {
              "zh": "45 连续解决 41 与 42。",
              "en": "45 resolves 41 and 42 consecutively."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/daily-temperatures/"
      }
    ],
    "slug": "daily-temperatures",
    "title": {
      "zh": "每日温度",
      "en": "Daily Temperatures"
    },
    "category": {
      "zh": "栈",
      "en": "Stacks"
    },
    "level": {
      "zh": "中等",
      "en": "Medium"
    }
  },
  {
    "id": 84,
    "statement": {
      "zh": "一排相邻柱子的宽度均为 1，高度为 heights。求完全落在这些柱子覆盖区域内的最大轴对齐矩形面积；矩形可以横跨多个连续柱子，其高度不能超过其中最矮柱子。",
      "en": "Adjacent bars have width one and heights given by heights. Find the largest axis-aligned rectangle contained in their combined area. Across a consecutive range, its height cannot exceed the shortest bar."
    },
    "constraints": {
      "zh": [
        "1 ≤ heights.length ≤ 10^5",
        "0 ≤ heights[i] ≤ 10^4"
      ],
      "en": [
        "1 ≤ heights.length ≤ 10^5",
        "0 ≤ heights[i] ≤ 10^4"
      ]
    },
    "example": {
      "zh": "heights=[3,1,4,4,2] → 8；中间两根高度 4 的柱子形成宽 2、高 4 的矩形。",
      "en": "heights=[3,1,4,4,2] → 8; the two height-four bars form a 2×4 rectangle."
    },
    "methods": [
      {
        "key": "intervals",
        "name": {
          "zh": "枚举区间并维护最低高度（基线）",
          "en": "Enumerate intervals with a running minimum (baseline)"
        },
        "intuition": {
          "zh": "每个矩形由一个连续区间和高度决定。区间固定后，选其中最低柱高就是最佳高度。固定左端、逐步右扩，同时更新最低值，避免每次重新扫描整个区间。",
          "en": "A rectangle chooses a consecutive interval. For that interval, the shortest bar gives the greatest feasible height. Fix the left endpoint and extend right while maintaining this minimum, rather than recomputing it from scratch."
        },
        "steps": {
          "zh": [
            "枚举左端 l，初始化 low=heights[l]。",
            "右端 r 从 l 递增，令 low=min(low,heights[r])。",
            "用 low×(r−l+1) 更新最大面积。"
          ],
          "en": [
            "Choose l and initialize low to heights[l].",
            "Extend r and update low with heights[r].",
            "Maximize low×(r−l+1)."
          ]
        },
        "correctness": {
          "zh": "每个连续区间都被枚举一次，且计算了该区间可行的最大高度；任意最优矩形的区间必在其中。",
          "en": "Every consecutive interval is considered with its maximum feasible height, including the interval of an optimal rectangle."
        },
        "time": "O(n²)",
        "space": "O(1)",
        "complexity": {
          "zh": "共有 n(n+1)/2 个区间，每次 O(1) 更新最低值；大输入宜用单调栈。",
          "en": "There are n(n+1)/2 intervals and constant work per extension; use the stack on large input."
        },
        "python": "class Solution:\n    def largestRectangleArea(self, heights):\n        best = 0\n        for l in range(len(heights)):\n            low = heights[l]\n            for r in range(l, len(heights)):\n                low = min(low, heights[r])\n                best = max(best, low*(r-l+1))\n        return best\n",
        "java": "class Solution {\n    public int largestRectangleArea(int[] h) {\n        int best=0;\n        for(int l=0;l<h.length;l++) {\n            int low=h[l];\n            for(int r=l;r<h.length;r++) { low=Math.min(low,h[r]); best=Math.max(best,low*(r-l+1)); }\n        }\n        return best;\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "l=0",
              "widths=1..5",
              "best=5"
            ],
            "note": {
              "zh": "从首柱延伸，最低高度降为 1，最大面积 5。",
              "en": "Extending from the first bar lowers the minimum to 1; best area is 5."
            }
          },
          {
            "cells": [
              "l=2",
              "r=3",
              "min=4",
              "area=8"
            ],
            "note": {
              "zh": "区间 [2,3] 高 4 宽 2。",
              "en": "Interval [2,3] has height 4 and width 2."
            }
          },
          {
            "cells": [
              "l=2",
              "r=4",
              "min=2",
              "area=6",
              "answer=8"
            ],
            "note": {
              "zh": "再扩展高度降为 2，面积不如 8；其余区间也不更大。",
              "en": "Extending lowers the height to 2 and area to 6; no other interval beats 8."
            }
          }
        ]
      },
      {
        "key": "monotonic",
        "name": {
          "zh": "递增栈确定左右边界",
          "en": "Increasing stack to determine boundaries"
        },
        "intuition": {
          "zh": "反过来固定矩形高度：某根柱子能延伸多远？直到遇到更矮柱子。递增下标栈暂存还没确定右边界的柱子；当矮柱到来，较高栈顶的右边界就确定。使用 ≥ 弹栈把相等高度交给更靠右的一根统一覆盖。",
          "en": "Fix a candidate height and ask how far it can extend before a shorter bar blocks it. An increasing stack retains bars awaiting a right boundary. A lower arrival settles them. Popping equal heights transfers their full-width opportunity to the later equal bar."
        },
        "steps": {
          "zh": [
            "扫描 i=0..n，i=n 时用虚拟高度 0 收尾，不修改输入。",
            "栈顶高度≥当前高度时弹出 j。新栈顶是左边界 l；栈空则 l=−1。",
            "计算 heights[j]×(i−l−1)，更新答案。",
            "真实下标才入栈；相同高度的旧柱弹出后，新柱继承更远左界。"
          ],
          "en": [
            "Scan through n, using a virtual zero at n without changing the input.",
            "Pop while the top height is at least the current height; the new top is l, or −1.",
            "Update area with heights[j]×(i−l−1).",
            "Push only real indices; later equal bars inherit the wider left extent."
          ]
        },
        "correctness": {
          "zh": "弹出时左右边界之间的柱高均不低于该高度，计算面积合法。更高柱遇到真正更矮右界时取到最大宽度；相等柱由最后一根继续承担更宽区间，故不会遗漏最优值。",
          "en": "Each popped bar yields a feasible rectangle between the boundaries. A strictly lower arrival finalizes its maximal width; equal-height candidates transfer to the last equal bar, preserving any wider optimum."
        },
        "time": "O(n)",
        "space": "O(n)",
        "complexity": {
          "zh": "每根柱子只入栈、出栈一次；栈最多 n 个下标，虚拟柱不创建数组副本。",
          "en": "Each bar enters and leaves the stack once. The stack stores up to n indices; the sentinel needs no copied array."
        },
        "python": "class Solution:\n    def largestRectangleArea(self, heights):\n        stack = []; best = 0; n = len(heights)\n        for i in range(n+1):\n            current = heights[i] if i<n else 0\n            while stack and heights[stack[-1]] >= current:\n                h = heights[stack.pop()]\n                left = stack[-1] if stack else -1\n                best = max(best, h*(i-left-1))\n            if i<n: stack.append(i)\n        return best\n",
        "java": "import java.util.*;\nclass Solution {\n    public int largestRectangleArea(int[] h) {\n        Deque<Integer> stack=new ArrayDeque<>(); int best=0,n=h.length;\n        for(int i=0;i<=n;i++) {\n            int cur=i<n?h[i]:0;\n            while(!stack.isEmpty() && h[stack.peek()]>=cur) {\n                int height=h[stack.pop()],left=stack.isEmpty()?-1:stack.peek();\n                best=Math.max(best,height*(i-left-1));\n            }\n            if(i<n) stack.push(i);\n        }\n        return best;\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "i=1",
              "pop h=3",
              "area=3"
            ],
            "note": {
              "zh": "高度 1 确定首柱的右边界。",
              "en": "Height 1 settles the first bar’s right boundary."
            }
          },
          {
            "cells": [
              "i=3",
              "pop h=4",
              "area=4"
            ],
            "note": {
              "zh": "相等高度弹出旧柱，新柱接管其左侧范围。",
              "en": "The equal height pops the old bar and inherits its left extent."
            }
          },
          {
            "cells": [
              "i=4",
              "pop h=4",
              "left=1",
              "width=2",
              "area=8"
            ],
            "note": {
              "zh": "高度 2 让高度 4 的最大宽度确定为 2。",
              "en": "Height 2 finalizes width 2 for height 4."
            }
          },
          {
            "cells": [
              "i=5",
              "area(2)=6",
              "area(1)=5",
              "answer=8"
            ],
            "note": {
              "zh": "虚拟末尾清栈，最大值仍为 8。",
              "en": "The virtual end drains the stack; the maximum stays 8."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/largest-rectangle-in-histogram/"
      }
    ],
    "slug": "largest-rectangle-in-histogram",
    "title": {
      "zh": "柱状图中最大的矩形",
      "en": "Largest Rectangle in Histogram"
    },
    "category": {
      "zh": "栈",
      "en": "Stacks"
    },
    "level": {
      "zh": "困难",
      "en": "Hard"
    }
  },
  {
    "id": 215,
    "statement": {
      "zh": "返回 nums 按从大到小排列时第 k 个位置的数。重复值占各自的位置，不是求第 k 个不同值；题目进一步要求尝试不整体排序。",
      "en": "Return the value at position k in descending order, counting repeated values separately. This is not the kth distinct value; try to avoid sorting the entire input."
    },
    "constraints": {
      "zh": [
        "1 ≤ k ≤ nums.length ≤ 10^5",
        "−10^4 ≤ nums[i] ≤ 10^4"
      ],
      "en": [
        "1 ≤ k ≤ nums.length ≤ 10^5",
        "−10^4 ≤ nums[i] ≤ 10^4"
      ]
    },
    "example": {
      "zh": "nums=[7,2,7,4,9], k=3 → 7；降序为 [9,7,7,4,2]。",
      "en": "nums=[7,2,7,4,9], k=3 → 7; descending order is [9,7,7,4,2]."
    },
    "methods": [
      {
        "key": "heap",
        "name": {
          "zh": "容量为 k 的小根堆",
          "en": "Size-k min-heap"
        },
        "intuition": {
          "zh": "只关心最大的 k 个数，不需要它们内部全部有序。堆顶保存这 k 个数中最小者，也就是当前第 k 大。新值进入后若超过 k 个，淘汰最小者；被淘汰的值不可能再成为最终前 k 大。",
          "en": "Keep only the largest k values seen. Their smallest value, exposed by a min-heap, is the kth largest so far. Insert each arrival and discard the minimum when the heap grows past k; discarded candidates can never displace the retained k larger values."
        },
        "steps": {
          "zh": [
            "建立空小根堆。",
            "逐个入堆；堆大小超过 k 就弹出最小值。",
            "处理完所有元素，返回堆顶。"
          ],
          "en": [
            "Start an empty min-heap.",
            "Insert each value; remove the minimum if size exceeds k.",
            "Return the final minimum."
          ]
        },
        "correctness": {
          "zh": "处理任意前缀后，堆恰保留该前缀最大的 min(k,前缀长度) 个值；加入并淘汰最小值保持此性质。",
          "en": "After every prefix, the heap retains its largest min(k,prefix length) values. Insert-and-discard preserves the invariant."
        },
        "time": "O(n log(k+1))",
        "space": "O(k)",
        "complexity": {
          "zh": "n 次插入和至多 n 次弹出，堆规模不超过 k+1；不修改输入。",
          "en": "There are n insertions and at most n removals in a heap of size at most k+1. The input is unchanged."
        },
        "python": "import heapq\nclass Solution:\n    def findKthLargest(self, nums, k):\n        heap = []\n        for x in nums:\n            heapq.heappush(heap, x)\n            if len(heap)>k: heapq.heappop(heap)\n        return heap[0]\n",
        "java": "import java.util.*;\nclass Solution {\n    public int findKthLargest(int[] nums,int k) {\n        PriorityQueue<Integer> heap=new PriorityQueue<>();\n        for(int x:nums) { heap.offer(x); if(heap.size()>k) heap.poll(); }\n        return heap.peek();\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "k=3",
              "heap values={2,7,7}"
            ],
            "note": {
              "zh": "前三个数填满容量。",
              "en": "The first three values fill the heap."
            }
          },
          {
            "cells": [
              "read=4",
              "keep={4,7,7}"
            ],
            "note": {
              "zh": "加入 4 后淘汰 2。",
              "en": "After inserting 4, discard 2."
            }
          },
          {
            "cells": [
              "read=9",
              "keep={7,7,9}",
              "top=7"
            ],
            "note": {
              "zh": "加入 9 后淘汰 4，堆顶即第三大。",
              "en": "Insert 9 and discard 4; the top is the third largest."
            }
          }
        ]
      },
      {
        "key": "quickselect",
        "name": {
          "zh": "随机三路快速选择",
          "en": "Randomized three-way quickselect"
        },
        "intuition": {
          "zh": "第 k 大等于升序下标 n−k。围绕随机基准把当前区间分成小于、等于、大于三部分：目标落在等值区就结束，否则只继续处理目标所在一侧。三路划分能一次处理大量重复值，不必像排序那样递归两侧。",
          "en": "The kth largest has ascending index n−k. Partition around a random pivot into smaller, equal, and larger regions. Stop if the target lies in the equal region; otherwise continue only in its side. Three-way partitioning handles duplicates together and avoids sorting irrelevant regions."
        },
        "steps": {
          "zh": [
            "target=n−k，初始处理整个数组。",
            "随机选基准，lt/i/gt 三指针原地分区；交换大值后 i 不前进，因为换来的值尚未检查。",
            "target<lt 则缩到左边；target>gt 则缩到右边。",
            "target 落在 [lt,gt] 时返回基准。"
          ],
          "en": [
            "Set target=n−k and start with the whole array.",
            "Partition in place with lt, i, and gt. After swapping a large value right, recheck i.",
            "Keep only the left or right side if it contains target.",
            "Return the pivot when target lies in the equal range."
          ]
        },
        "correctness": {
          "zh": "分区后每个小值排在所有等值和大值之前，因此等值区占据的排名已经确定；只保留包含目标排名的分区不会丢失答案。",
          "en": "Partitioning fixes the rank range occupied by pivot-equal values. Keeping the region containing the target rank cannot discard the answer."
        },
        "time": "Expected O(n); worst O(n²)",
        "space": "O(1)",
        "complexity": {
          "zh": "随机基准的期望剩余规模使总扫描为 O(n)，极端连续失衡仍可能 O(n²)。迭代实现只用常数变量，原地改变 nums；若要保留输入需另加 O(n) 副本。",
          "en": "Random pivots give expected linear total scanning, but repeatedly poor pivots permit quadratic worst-case time. Iteration uses constant auxiliary space and mutates nums; preserving input would require an O(n) copy."
        },
        "python": "import random\nclass Solution:\n    def findKthLargest(self, nums, k):\n        target = len(nums)-k; lo, hi = 0, len(nums)-1\n        while True:\n            pivot = nums[random.randint(lo, hi)]\n            lt = i = lo; gt = hi\n            while i <= gt:\n                if nums[i] < pivot:\n                    nums[lt], nums[i] = nums[i], nums[lt]; lt += 1; i += 1\n                elif nums[i] > pivot:\n                    nums[i], nums[gt] = nums[gt], nums[i]; gt -= 1\n                else: i += 1\n            if target < lt: hi = lt-1\n            elif target > gt: lo = gt+1\n            else: return pivot\n",
        "java": "import java.util.concurrent.ThreadLocalRandom;\nclass Solution {\n    private void swap(int[] a,int i,int j) { int t=a[i]; a[i]=a[j]; a[j]=t; }\n    public int findKthLargest(int[] a,int k) {\n        int target=a.length-k,lo=0,hi=a.length-1;\n        while(true) {\n            int pivot=a[ThreadLocalRandom.current().nextInt(lo,hi+1)],lt=lo,i=lo,gt=hi;\n            while(i<=gt) {\n                if(a[i]<pivot) swap(a,lt++,i++);\n                else if(a[i]>pivot) swap(a,i,gt--);\n                else i++;\n            }\n            if(target<lt) hi=lt-1;\n            else if(target>gt) lo=gt+1;\n            else return pivot;\n        }\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "target=2",
              "pivot=7"
            ],
            "note": {
              "zh": "本次演示随机基准选中 7。",
              "en": "This demonstration selects random pivot 7."
            }
          },
          {
            "cells": [
              "<7:{2,4}",
              "=7:{7,7}",
              ">7:{9}"
            ],
            "note": {
              "zh": "三路分区后等值区覆盖升序下标 2、3。",
              "en": "The equal region covers ascending indices 2 and 3."
            }
          },
          {
            "cells": [
              "target in [2,3]",
              "answer=7"
            ],
            "note": {
              "zh": "目标落在等值区，无需再处理两侧。",
              "en": "The target is inside the equal region; neither side needs further work."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/kth-largest-element-in-an-array/"
      }
    ],
    "slug": "kth-largest-element-in-an-array",
    "title": {
      "zh": "数组中的第K个最大元素",
      "en": "Kth Largest Element in an Array"
    },
    "category": {
      "zh": "堆",
      "en": "Heaps"
    },
    "level": {
      "zh": "中等",
      "en": "Medium"
    }
  },
  {
    "id": 347,
    "statement": {
      "zh": "统计 nums 中每个不同整数的出现次数，返回出现次数最多的 k 个整数。答案的排列顺序任意，测试保证应选的集合唯一。进阶目标是优于 O(n log n)。",
      "en": "Count occurrences of each distinct integer and return the k most frequent values in any order. The selected set is guaranteed unique. The follow-up asks for better than O(n log n) time."
    },
    "constraints": {
      "zh": [
        "1 ≤ nums.length ≤ 10^5；−10^4 ≤ nums[i] ≤ 10^4",
        "1 ≤ k ≤ 不同整数数量；答案集合唯一"
      ],
      "en": [
        "1 ≤ nums.length ≤ 10^5; −10^4 ≤ nums[i] ≤ 10^4",
        "1 ≤ k ≤ distinct-value count; the answer set is unique"
      ]
    },
    "example": {
      "zh": "nums=[4,4,4,7,7,2], k=2 → [4,7]；频次分别是 3 和 2。",
      "en": "nums=[4,4,4,7,7,2], k=2 → [4,7]; their frequencies are three and two."
    },
    "methods": [
      {
        "key": "heap",
        "name": {
          "zh": "频次表加小根堆",
          "en": "Frequency map and min-heap"
        },
        "intuition": {
          "zh": "先把“原始元素”转成“值、频次”记录。此后问题变成从 u 条记录中选频次最大的 k 条。小根堆顶是当前最容易被淘汰的低频记录，保留 k 条即可，不必对全部记录排序。",
          "en": "Convert the input into u (value,frequency) records, then retain the k largest frequencies. A min-heap exposes the weakest retained candidate, allowing selection without sorting every record."
        },
        "steps": {
          "zh": [
            "哈希表统计频次。",
            "把 (频次,值) 放入小根堆；超过 k 条就删除最小频次记录。",
            "提取堆中的值，顺序不影响答案。"
          ],
          "en": [
            "Count values in a hash map.",
            "Push (frequency,value) records into a min-heap and remove the minimum above size k.",
            "Return the retained values in any order."
          ]
        },
        "correctness": {
          "zh": "频次表准确描述每个值，堆保持已处理记录中最大的 k 个频次；所有记录处理完即得到目标集合。",
          "en": "The map gives exact counts and the heap retains the k highest counts among processed records, yielding the required set."
        },
        "time": "Expected O(n + u log(k+1))",
        "space": "O(u + k)",
        "complexity": {
          "zh": "u 为不同值数。哈希统计期望 O(n)，堆处理 O(u log(k+1))。k 接近 u 时并不保证满足优于 O(n log n) 的进阶要求；桶法更合适。",
          "en": "Here u is the distinct count. Hash counting is expected O(n), followed by heap work. For k near u this does not guarantee the follow-up improvement; buckets do."
        },
        "python": "from collections import Counter\nimport heapq\nclass Solution:\n    def topKFrequent(self, nums, k):\n        heap=[]\n        for value, count in Counter(nums).items():\n            heapq.heappush(heap,(count,value))\n            if len(heap)>k: heapq.heappop(heap)\n        return [value for count,value in heap]\n",
        "java": "import java.util.*;\nclass Solution {\n    public int[] topKFrequent(int[] nums,int k) {\n        Map<Integer,Integer> count=new HashMap<>();\n        for(int x:nums) count.merge(x,1,Integer::sum);\n        PriorityQueue<int[]> heap=new PriorityQueue<>(Comparator.comparingInt(a->a[0]));\n        for(Map.Entry<Integer,Integer> e:count.entrySet()) {\n            heap.offer(new int[]{e.getValue(),e.getKey()}); if(heap.size()>k) heap.poll();\n        }\n        int[] out=new int[k]; for(int i=0;i<k;i++) out[i]=heap.poll()[1];\n        return out;\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "count={4:3,7:2,2:1}"
            ],
            "note": {
              "zh": "先把数组转成频次记录。",
              "en": "Convert the input to frequency records."
            }
          },
          {
            "cells": [
              "heap={(2,7),(3,4)}"
            ],
            "note": {
              "zh": "保留 4 与 7 后，小频次 2 在堆顶。",
              "en": "After retaining 4 and 7, frequency 2 is at the top."
            }
          },
          {
            "cells": [
              "read=(1,2)",
              "discard=(1,2)",
              "result={4,7}"
            ],
            "note": {
              "zh": "频次 1 的记录加入后立即被淘汰。",
              "en": "The frequency-one record is inserted and immediately removed."
            }
          }
        ]
      },
      {
        "key": "bucket",
        "name": {
          "zh": "按频次分桶",
          "en": "Buckets indexed by frequency"
        },
        "intuition": {
          "zh": "一个值的频次只能在 1..n 之间，因此频次本身可以当数组下标。将相同频次的值放在同一桶中，然后从高频桶向低频桶收集，就免去了比较排序与堆维护。",
          "en": "A frequency lies between one and n, so it can be used directly as an array index. Group values by frequency and visit buckets in descending order. This removes both comparison sorting and heap maintenance."
        },
        "steps": {
          "zh": [
            "先统计每个值的频次。",
            "创建 n+1 个桶，把 value 放入 buckets[count[value]]。",
            "从频次 n 倒序访问桶，每取到一个值加入结果。",
            "结果达到 k 个立即返回。"
          ],
          "en": [
            "Count each value.",
            "Create n+1 buckets and place each value in its frequency bucket.",
            "Traverse buckets from n downward.",
            "Return immediately after collecting k values."
          ]
        },
        "correctness": {
          "zh": "遍历顺序保证先取出的频次不小于后取出的频次；因此前 k 个值就是最高频集合。唯一答案条件排除了截断边界的歧义。",
          "en": "Descending bucket order guarantees that no later item has a higher frequency. The first k items form the required set; uniqueness removes ambiguity at the cutoff."
        },
        "time": "Expected O(n + u)",
        "space": "O(n + u)",
        "complexity": {
          "zh": "哈希计数期望 O(n)，桶数组初始化及扫描 O(n)，每个不同值入桶一次 O(u)。包括空桶也要计入 O(n) 空间。",
          "en": "Hash counting is expected O(n); allocating and scanning buckets costs O(n), and placing u distinct values costs O(u). Empty buckets still count toward O(n) storage."
        },
        "python": "from collections import Counter\nclass Solution:\n    def topKFrequent(self, nums, k):\n        buckets=[[] for _ in range(len(nums)+1)]\n        for value,count in Counter(nums).items(): buckets[count].append(value)\n        out=[]\n        for count in range(len(nums),0,-1):\n            for value in buckets[count]:\n                out.append(value)\n                if len(out)==k: return out\n",
        "java": "import java.util.*;\nclass Solution {\n    public int[] topKFrequent(int[] nums,int k) {\n        Map<Integer,Integer> count=new HashMap<>();\n        for(int x:nums) count.merge(x,1,Integer::sum);\n        List<List<Integer>> buckets=new ArrayList<>();\n        for(int i=0;i<=nums.length;i++) buckets.add(new ArrayList<>());\n        for(Map.Entry<Integer,Integer> e:count.entrySet()) buckets.get(e.getValue()).add(e.getKey());\n        int[] out=new int[k]; int p=0;\n        for(int c=nums.length;c>0;c--) for(int x:buckets.get(c)) { out[p++]=x; if(p==k) return out; }\n        return out;\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "bucket[1]=[2]",
              "bucket[2]=[7]",
              "bucket[3]=[4]"
            ],
            "note": {
              "zh": "按频次索引装桶。",
              "en": "Place values into frequency-indexed buckets."
            }
          },
          {
            "cells": [
              "scan 6..3",
              "result=[4]"
            ],
            "note": {
              "zh": "跳过空桶，先取频次 3 的 4。",
              "en": "Skip empty buckets and take 4 at frequency 3."
            }
          },
          {
            "cells": [
              "scan 2",
              "result=[4,7]"
            ],
            "note": {
              "zh": "取到第二个值后停止。",
              "en": "Stop after collecting the second value."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/top-k-frequent-elements/"
      }
    ],
    "slug": "top-k-frequent-elements",
    "title": {
      "zh": "前 K 个高频元素",
      "en": "Top K Frequent Elements"
    },
    "category": {
      "zh": "堆",
      "en": "Heaps"
    },
    "level": {
      "zh": "中等",
      "en": "Medium"
    }
  },
  {
    "id": 295,
    "statement": {
      "zh": "实现 MedianFinder：addNum(num) 把整数加入数据流，findMedian() 返回目前所有数排序后的中位数。数量为偶数时返回中间两数均值。",
      "en": "Implement MedianFinder: addNum(num) inserts an integer, and findMedian() returns the median of all values so far, averaging the central pair for an even count."
    },
    "constraints": {
      "zh": [
        "−10^5 ≤ num ≤ 10^5",
        "两种方法总调用不超过 5×10^4 次",
        "查询中位数时至少已有一个值；允许绝对误差 10^−5"
      ],
      "en": [
        "−10^5 ≤ num ≤ 10^5",
        "At most 5×10^4 total calls",
        "Median queries have at least one value; accepted error is 10^−5"
      ]
    },
    "example": {
      "zh": "addNum(8), addNum(2), findMedian() → 5；再 addNum(5)，中位数仍为 5。",
      "en": "Insert 8 and 2: the median is 5. Insert 5 next: the median remains 5."
    },
    "methods": [
      {
        "key": "ordered",
        "name": {
          "zh": "二分定位，有序数组插入",
          "en": "Binary-search insertion into a sorted list"
        },
        "intuition": {
          "zh": "保持整个序列有序，中位数就能按下标直接读取。插入时可以用二分找到位置，但数组中后面的元素仍需后移，所以插入并不是 O(log n)。这个方案适合解释从排序到双堆的优化。",
          "en": "Keep the entire sequence sorted so median lookup is direct. Binary search locates each insertion point, but shifting later array entries still costs linear time. This provides a clear baseline for the two-heap improvement."
        },
        "steps": {
          "zh": [
            "addNum 二分查找第一个不小于 num 的位置。",
            "在该位置插入，保留非递减顺序。",
            "查询时奇数读 n//2；偶数平均 n//2−1 和 n//2。"
          ],
          "en": [
            "Find the first position no smaller than num.",
            "Insert there while preserving sorted order.",
            "Read the central element or average the central pair."
          ]
        },
        "correctness": {
          "zh": "二分定位后插入保持数组有序，因此中间下标始终符合中位数定义。",
          "en": "Insertion preserves sorted order, so the central index or pair always satisfies the median definition."
        },
        "time": "addNum O(n); findMedian O(1)",
        "space": "O(n)",
        "complexity": {
          "zh": "n 为已有元素数。二分 O(log n)，移动元素最坏 O(n)，总插入时间由移动主导；查询不排序。",
          "en": "For n existing values, binary search is logarithmic but worst-case shifting is linear and dominates insertion. Queries perform no sorting."
        },
        "python": "from bisect import insort_left\nclass MedianFinder:\n    def __init__(self): self.values=[]\n    def addNum(self, num): insort_left(self.values,num)\n    def findMedian(self):\n        n=len(self.values)\n        return float(self.values[n//2]) if n%2 else (self.values[n//2-1]+self.values[n//2])/2.0\n",
        "java": "import java.util.*;\nclass MedianFinder {\n    private List<Integer> values=new ArrayList<>();\n    public MedianFinder() {}\n    public void addNum(int num) {\n        int lo=0,hi=values.size();\n        while(lo<hi) { int m=(lo+hi)/2; if(values.get(m)<num) lo=m+1; else hi=m; }\n        values.add(lo,num);\n    }\n    public double findMedian() {\n        int n=values.size(); return n%2==1?values.get(n/2):((double)values.get(n/2-1)+values.get(n/2))/2;\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "insert 8",
              "values=[8]"
            ],
            "note": {
              "zh": "空序列插入首值。",
              "en": "Insert the first value into the empty list."
            }
          },
          {
            "cells": [
              "insert 2 at 0",
              "values=[2,8]",
              "median=5"
            ],
            "note": {
              "zh": "二分位置为 0，移动 8 后插入 2。",
              "en": "The insertion point is zero; shift 8 and insert 2."
            }
          },
          {
            "cells": [
              "insert 5 at 1",
              "values=[2,5,8]",
              "median=5"
            ],
            "note": {
              "zh": "插入中间位置后读取中项。",
              "en": "Insert in the middle and read the central value."
            }
          }
        ]
      },
      {
        "key": "two-heaps",
        "name": {
          "zh": "双堆维护较小半与较大半",
          "en": "Two heaps for the lower and upper halves"
        },
        "intuition": {
          "zh": "中位数只依赖两半的边界，不需要每半内部完全有序。小半用大根堆暴露最大值，大半用小根堆暴露最小值。让小半与大半等长，或仅多一个元素，就能直接从堆顶读取中位数。",
          "en": "Only the boundary between the halves matters. A max-heap exposes the largest lower-half value, and a min-heap exposes the smallest upper-half value. Keep the lower half equally sized or one element larger, then read the median from their tops."
        },
        "steps": {
          "zh": [
            "先把新数放入小半大根堆。",
            "把小半最大值移到大半，保证两半大小顺序。",
            "若大半数量更多，把其最小值移回小半。",
            "小半多一个时返回其堆顶；等长时返回两堆顶平均值。"
          ],
          "en": [
            "Push the new value into the lower max-heap.",
            "Move its maximum to the upper min-heap to enforce ordering.",
            "If upper is larger, move its minimum back.",
            "Read the lower top for an odd count, otherwise average both tops."
          ]
        },
        "correctness": {
          "zh": "移堆顶保持小半所有值≤大半所有值；再平衡保证数量差为 0 或 1。两条不变量共同确定正确中位数。",
          "en": "Transferring extrema preserves lower≤upper ordering, and rebalancing keeps the permitted size difference. Together these invariants identify the correct median."
        },
        "time": "addNum O(log n) amortized; findMedian O(1)",
        "space": "O(n)",
        "complexity": {
          "zh": "每次插入固定次数堆操作，堆调整 O(log n)；底层动态数组可能扩容，因此严格说是摊还界。两堆共存储所有 n 个数。",
          "en": "Each insertion uses a constant number of logarithmic heap operations. Dynamic-array resizing makes this an amortized bound. Both heaps together store all n values."
        },
        "python": "import heapq\nclass MedianFinder:\n    def __init__(self): self.low=[]; self.high=[]\n    def addNum(self, num):\n        heapq.heappush(self.low,-num)\n        heapq.heappush(self.high,-heapq.heappop(self.low))\n        if len(self.high)>len(self.low): heapq.heappush(self.low,-heapq.heappop(self.high))\n    def findMedian(self):\n        return float(-self.low[0]) if len(self.low)>len(self.high) else (-self.low[0]+self.high[0])/2.0\n",
        "java": "import java.util.*;\nclass MedianFinder {\n    private PriorityQueue<Integer> low=new PriorityQueue<>(Comparator.reverseOrder());\n    private PriorityQueue<Integer> high=new PriorityQueue<>();\n    public MedianFinder() {}\n    public void addNum(int num) {\n        low.offer(num); high.offer(low.poll());\n        if(high.size()>low.size()) low.offer(high.poll());\n    }\n    public double findMedian() { return low.size()>high.size()?low.peek():((double)low.peek()+high.peek())/2; }\n}\n",
        "trace": [
          {
            "cells": [
              "low={8}",
              "high={}"
            ],
            "note": {
              "zh": "首值平衡后留在小半堆。",
              "en": "After balancing, the first value remains in the lower heap."
            }
          },
          {
            "cells": [
              "low={2}",
              "high={8}",
              "median=5"
            ],
            "note": {
              "zh": "加入 2 后，8 移到大半，两边等长。",
              "en": "After inserting 2, move 8 to the upper half; sizes match."
            }
          },
          {
            "cells": [
              "low={2,5}",
              "high={8}",
              "median=5"
            ],
            "note": {
              "zh": "加入 5 并平衡，小半多一个，读最大值 5。",
              "en": "Insert and rebalance; lower has one extra value, so read its maximum 5."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/find-median-from-data-stream/"
      }
    ],
    "slug": "find-median-from-data-stream",
    "title": {
      "zh": "数据流的中位数",
      "en": "Find Median from Data Stream"
    },
    "category": {
      "zh": "堆",
      "en": "Heaps"
    },
    "level": {
      "zh": "困难",
      "en": "Hard"
    }
  },
  {
    "id": 121,
    "statement": {
      "zh": "prices[i] 表示第 i 天股价。最多选择一次买入和其后某一天的一次卖出，求最大利润；不盈利时可以不交易，返回 0。买入必须早于卖出。",
      "en": "prices[i] is the price on day i. Make at most one purchase followed on a later day by one sale. Return the greatest profit, or zero if no profitable transaction exists."
    },
    "constraints": {
      "zh": [
        "1 ≤ prices.length ≤ 10^5",
        "0 ≤ prices[i] ≤ 10^4"
      ],
      "en": [
        "1 ≤ prices.length ≤ 10^5",
        "0 ≤ prices[i] ≤ 10^4"
      ]
    },
    "example": {
      "zh": "prices=[8,3,6,2,7] → 5；在价格 2 时买入，之后以 7 卖出。",
      "en": "prices=[8,3,6,2,7] → 5; buy at 2 and later sell at 7."
    },
    "methods": [
      {
        "key": "pairs",
        "name": {
          "zh": "枚举买卖日（基线）",
          "en": "Enumerate buy/sell pairs (baseline)"
        },
        "intuition": {
          "zh": "把交易看成下标对 (buy,sell)，只枚举 buy<sell。计算所有合法交易的利润，初始答案设为 0 自然涵盖“不交易”。这能避免把全局最小与最大直接相减却忽视时间顺序的错误。",
          "en": "Treat a transaction as a pair of indices with buy<sell. Evaluate every valid pair and start the best profit at zero to allow no transaction. This avoids incorrectly subtracting global extrema that occur in the wrong order."
        },
        "steps": {
          "zh": [
            "枚举买入日 i。",
            "卖出日 j 从 i+1 开始枚举。",
            "用 prices[j]−prices[i] 更新 best，最后返回。"
          ],
          "en": [
            "Choose each buying day i.",
            "Enumerate selling days j from i+1.",
            "Maximize prices[j]−prices[i] against zero."
          ]
        },
        "correctness": {
          "zh": "所有合法单次交易恰对应一个被枚举的下标对，因此最大利润不会遗漏。",
          "en": "Every valid single transaction corresponds to an enumerated pair, so the maximum is included."
        },
        "time": "O(n²)",
        "space": "O(1)",
        "complexity": {
          "zh": "共有 n(n−1)/2 对日期；只保留最大利润。此基线可能超时。",
          "en": "There are n(n−1)/2 day pairs and only a running maximum is stored. This baseline may time out."
        },
        "python": "class Solution:\n    def maxProfit(self, prices):\n        best=0\n        for i in range(len(prices)):\n            for j in range(i+1,len(prices)): best=max(best,prices[j]-prices[i])\n        return best\n",
        "java": "class Solution {\n    public int maxProfit(int[] p) {\n        int best=0;\n        for(int i=0;i<p.length;i++) for(int j=i+1;j<p.length;j++) best=Math.max(best,p[j]-p[i]);\n        return best;\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "buy=0",
              "price=8",
              "best=0"
            ],
            "note": {
              "zh": "第一天买入的所有交易都不盈利。",
              "en": "No sale after buying at 8 is profitable."
            }
          },
          {
            "cells": [
              "buy=1",
              "sell=4",
              "profit=4"
            ],
            "note": {
              "zh": "价格 3 买入、7 卖出，利润 4。",
              "en": "Buying at 3 and selling at 7 gives profit 4."
            }
          },
          {
            "cells": [
              "buy=3",
              "sell=4",
              "profit=5",
              "answer=5"
            ],
            "note": {
              "zh": "枚举到 2 买入、7 卖出，更新到 5。",
              "en": "The pair buying at 2 and selling at 7 improves the answer to 5."
            }
          }
        ]
      },
      {
        "key": "prefix-min",
        "name": {
          "zh": "维护卖出日前的最低价",
          "en": "Maintain the minimum before each selling day"
        },
        "intuition": {
          "zh": "卖出日固定时，最佳买入日就是之前价格最低的一天。向右扫描时缓存这个最低价，所有未来卖出日便能 O(1) 得到自己的最优交易。先计算利润再更新最低价，使买入严格早于卖出。",
          "en": "For a fixed selling day, the best purchase is the cheapest earlier day. Cache that prefix minimum while scanning so each selling day is evaluated in constant time. Compute profit before updating the minimum to preserve strict chronology."
        },
        "steps": {
          "zh": [
            "low=prices[0]，best=0。",
            "从第 2 天开始，用 prices[i]−low 更新 best。",
            "再用当天价格更新 low。",
            "返回 best；只有一天时循环不执行，返回 0。"
          ],
          "en": [
            "Initialize low from day zero and best to zero.",
            "From day one, update best with prices[i]−low.",
            "Then update low using today’s price.",
            "Return best; a single day naturally yields zero."
          ]
        },
        "correctness": {
          "zh": "扫描卖出日 i 时 low 是所有更早日期的最低价，因而该日最优交易被准确计算；对所有卖出日取最大即为全局最优。",
          "en": "At selling day i, low is the minimum of all earlier prices, so that day’s best transaction is exact. Maximizing over selling days gives the global optimum."
        },
        "time": "O(n)",
        "space": "O(1)",
        "complexity": {
          "zh": "每个卖出日两次常数比较；不创建价格切片，额外空间常数。",
          "en": "Each selling day needs constant comparisons. No price slice is created, so auxiliary space is constant."
        },
        "python": "class Solution:\n    def maxProfit(self, prices):\n        low=prices[0]; best=0\n        for i in range(1,len(prices)):\n            best=max(best,prices[i]-low)\n            low=min(low,prices[i])\n        return best\n",
        "java": "class Solution {\n    public int maxProfit(int[] p) {\n        int low=p[0],best=0;\n        for(int i=1;i<p.length;i++) { best=Math.max(best,p[i]-low); low=Math.min(low,p[i]); }\n        return best;\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "sell=1",
              "price=3",
              "low=3",
              "best=0"
            ],
            "note": {
              "zh": "卖出不盈利，随后把最低价更新为 3。",
              "en": "The sale is unprofitable; then update the minimum to 3."
            }
          },
          {
            "cells": [
              "sell=2",
              "price=6",
              "low=3",
              "best=3"
            ],
            "note": {
              "zh": "以此前最低价 3 买入可赚 3。",
              "en": "Buying at the earlier minimum 3 earns 3."
            }
          },
          {
            "cells": [
              "sell=3",
              "price=2",
              "low=2",
              "best=3"
            ],
            "note": {
              "zh": "遇到新低，仅更新未来可用的买入价。",
              "en": "A new low updates the purchase option for later days."
            }
          },
          {
            "cells": [
              "sell=4",
              "price=7",
              "best=5"
            ],
            "note": {
              "zh": "最后一天利用最低价 2 得到利润 5。",
              "en": "The last day uses minimum 2 to earn 5."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/"
      }
    ],
    "slug": "best-time-to-buy-and-sell-stock",
    "title": {
      "zh": "买卖股票的最佳时机",
      "en": "Best Time to Buy and Sell Stock"
    },
    "category": {
      "zh": "贪心算法",
      "en": "Greedy"
    },
    "level": {
      "zh": "简单",
      "en": "Easy"
    }
  },
  {
    "id": 55,
    "statement": {
      "zh": "从 nums 的下标 0 出发。位于 i 时可以向前跳不超过 nums[i] 的距离，落点必须在数组内。判断是否存在一条跳跃路线到达最后一个下标；长度为 1 时已经到达。",
      "en": "Start at index zero. From i, jump forward by any distance up to nums[i] while remaining in the array. Decide whether the final index can be reached; a one-element array is already at the destination."
    },
    "constraints": {
      "zh": [
        "1 ≤ nums.length ≤ 10^4",
        "0 ≤ nums[i] ≤ 10^5"
      ],
      "en": [
        "1 ≤ nums.length ≤ 10^4",
        "0 ≤ nums[i] ≤ 10^5"
      ]
    },
    "example": {
      "zh": "nums=[2,0,2,0,1] → true；路线 0→2→4 可以到达。",
      "en": "nums=[2,0,2,0,1] → true via indices 0→2→4."
    },
    "methods": [
      {
        "key": "dp",
        "name": {
          "zh": "显式记录可达状态",
          "en": "Explicit reachability DP"
        },
        "intuition": {
          "zh": "令 reach[i] 表示是否存在从起点到 i 的路线。只从已可达的位置向后扩散，把它能跳到的每个落点标记为真。这保留完整的可达性信息，帮助理解贪心到底压缩了什么。",
          "en": "Let reach[i] mean that some path reaches i. Expand only from reachable positions and mark every allowed landing position. This keeps the full reachability table and shows what information the greedy version later compresses."
        },
        "steps": {
          "zh": [
            "reach[0]=true，其他位置为 false。",
            "按下标递增遍历，跳过不可达位置。",
            "对 i+1..min(n−1,i+nums[i]) 全部置 true。",
            "返回 reach[n−1]。"
          ],
          "en": [
            "Set reach[0]=true and all others false.",
            "Scan forward, skipping unreachable positions.",
            "Mark every landing index from i+1 through min(n−1,i+nums[i]).",
            "Return the final reachability entry."
          ]
        },
        "correctness": {
          "zh": "所有边只向右，处理 i 时其前驱已处理完。标记只由真实可达位置产生，且枚举所有允许跳跃，所以状态既不虚报也不遗漏。",
          "en": "All edges go right, so predecessors are processed first. Marks arise only from reachable positions, and every allowed jump is considered, proving soundness and completeness."
        },
        "time": "O(n²)",
        "space": "O(n)",
        "complexity": {
          "zh": "最坏每个位置能跳到其后所有位置，枚举 O(n²) 条边；可达表 n 项。",
          "en": "In the worst case every position reaches every later position, producing quadratic edge enumeration and n stored states."
        },
        "python": "class Solution:\n    def canJump(self, nums):\n        n=len(nums); reach=[False]*n; reach[0]=True\n        for i in range(n):\n            if reach[i]:\n                for j in range(i+1,min(n,i+nums[i]+1)): reach[j]=True\n        return reach[-1]\n",
        "java": "class Solution {\n    public boolean canJump(int[] a) {\n        boolean[] reach=new boolean[a.length]; reach[0]=true;\n        for(int i=0;i<a.length;i++) if(reach[i])\n            for(int j=i+1;j<a.length && j<=i+a[i];j++) reach[j]=true;\n        return reach[a.length-1];\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "reach=[T,F,F,F,F]"
            ],
            "note": {
              "zh": "起点可达。",
              "en": "The start is reachable."
            }
          },
          {
            "cells": [
              "i=0",
              "reach=[T,T,T,F,F]"
            ],
            "note": {
              "zh": "起点可跳到 1 或 2。",
              "en": "The start reaches indices 1 and 2."
            }
          },
          {
            "cells": [
              "i=2",
              "reach=[T,T,T,T,T]"
            ],
            "note": {
              "zh": "从 2 扩展到末尾，答案 true。",
              "en": "Index 2 extends reachability to the end, giving true."
            }
          }
        ]
      },
      {
        "key": "greedy",
        "name": {
          "zh": "用最远可达下标压缩状态",
          "en": "Compress reachability into a farthest index"
        },
        "intuition": {
          "zh": "每次允许跳 0 到最大距离之间的任意步数，因此已知可达区域是一段连续前缀。不需要逐个标记前缀内的点，只保存其最右边界 far。扫描到 i>far 表示此前所有可达点都不能越过缺口。",
          "en": "Because every shorter jump is allowed, the reachable region is a continuous prefix. Store only its rightmost index far. Encountering i>far proves that all earlier reachable positions fail to bridge the gap."
        },
        "steps": {
          "zh": [
            "far=0，从左到右扫描。",
            "若 i>far，立即返回 false，不能用不可达位置扩张。",
            "更新 far=max(far,i+nums[i])。",
            "far≥n−1 时立即 true。"
          ],
          "en": [
            "Start far=0 and scan left to right.",
            "If i>far, return false without expanding from an unreachable point.",
            "Update far=max(far,i+nums[i]).",
            "Return true once far covers n−1."
          ]
        },
        "correctness": {
          "zh": "可达前缀不变量由起点成立，每个可达 i 的全部落点延伸这个前缀；出现缺口时再无合法前驱能访问后续位置。",
          "en": "The reachable-prefix invariant starts at zero and is extended by every reachable position. At a gap no valid predecessor can reach any later position."
        },
        "time": "O(n)",
        "space": "O(1)",
        "complexity": {
          "zh": "每个位置最多检查一次，只存 far 和下标。遇到 0 本身不代表失败，只有超出 far 才失败。",
          "en": "Each position is checked once with constant state. A zero is not itself failure; being beyond far is."
        },
        "python": "class Solution:\n    def canJump(self, nums):\n        far=0\n        for i,x in enumerate(nums):\n            if i>far: return False\n            far=max(far,i+x)\n            if far>=len(nums)-1: return True\n        return False\n",
        "java": "class Solution {\n    public boolean canJump(int[] a) {\n        int far=0;\n        for(int i=0;i<a.length;i++) {\n            if(i>far) return false;\n            far=Math.max(far,i+a[i]);\n            if(far>=a.length-1) return true;\n        }\n        return false;\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "i=0",
              "far=2"
            ],
            "note": {
              "zh": "起点覆盖到下标 2。",
              "en": "The start covers through index 2."
            }
          },
          {
            "cells": [
              "i=1",
              "far=2"
            ],
            "note": {
              "zh": "下标 1 可达但不能扩大范围。",
              "en": "Index 1 is reachable but does not extend coverage."
            }
          },
          {
            "cells": [
              "i=2",
              "far=4",
              "true"
            ],
            "note": {
              "zh": "下标 2 把前缀扩展到末尾。",
              "en": "Index 2 extends the reachable prefix to the destination."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/jump-game/"
      }
    ],
    "slug": "jump-game",
    "title": {
      "zh": "跳跃游戏",
      "en": "Jump Game"
    },
    "category": {
      "zh": "贪心算法",
      "en": "Greedy"
    },
    "level": {
      "zh": "中等",
      "en": "Medium"
    }
  },
  {
    "id": 45,
    "statement": {
      "zh": "从数组下标 0 开始，每次从 i 向前跳至数组内任意位置 i+j，其中 0≤j≤nums[i]。输入保证能够到达最后下标，求所需的最少跳跃次数。",
      "en": "Starting at index zero, jump from i to an in-bounds i+j with 0≤j≤nums[i]. The final index is guaranteed reachable. Return the fewest jumps needed."
    },
    "constraints": {
      "zh": [
        "1 ≤ nums.length ≤ 10^4",
        "0 ≤ nums[i] ≤ 1000；保证末尾可达"
      ],
      "en": [
        "1 ≤ nums.length ≤ 10^4",
        "0 ≤ nums[i] ≤ 1000; the destination is reachable"
      ]
    },
    "example": {
      "zh": "nums=[2,1,3,1,1,0] → 2；路线 0→2→5。",
      "en": "nums=[2,1,3,1,1,0] → 2 via indices 0→2→5."
    },
    "methods": [
      {
        "key": "dp",
        "name": {
          "zh": "最少跳数动态规划",
          "en": "Minimum-jump dynamic programming"
        },
        "intuition": {
          "zh": "把每个下标看作图节点，一次允许的跳跃是一条权重为 1 的边。因为边向右，按下标顺序更新最短距离即可。dp[j] 存当前已知到 j 的最少跳数，每个前驱 i 都尝试用 dp[i]+1 改进它。",
          "en": "Treat indices as vertices and legal jumps as unit-cost edges. All edges go right, so forward order is sufficient for shortest-distance updates. Each predecessor i proposes dp[i]+1 for every reachable landing j."
        },
        "steps": {
          "zh": [
            "dp[0]=0，其余设为 n 作为安全上界。",
            "依次处理 i，枚举所有合法 j>i。",
            "令 dp[j]=min(dp[j],dp[i]+1)。",
            "返回最后状态；n=1 时为 0。"
          ],
          "en": [
            "Set dp[0]=0 and use n as the unreachable sentinel.",
            "Process i and enumerate all legal later landings.",
            "Relax dp[j]=min(dp[j],dp[i]+1).",
            "Return the last entry; a single element needs zero jumps."
          ]
        },
        "correctness": {
          "zh": "到 j 的最优路线必从某个更早的 i 最后跳来。所有这些前驱都被考虑，且其距离已求得，因此取最小得到正确最优值。",
          "en": "An optimal route to j ends with a jump from an earlier i. All such predecessors are examined with already optimal distances, so their minimum is correct."
        },
        "time": "O(n²)",
        "space": "O(n)",
        "complexity": {
          "zh": "保守最坏 O(n²)；更具体为 O(n·min(n,M))，M 为最大跳长。距离表需要 n 项。",
          "en": "The general bound is O(n²), more precisely O(n·min(n,M)) for maximum jump length M. The distance table has n entries."
        },
        "python": "class Solution:\n    def jump(self, nums):\n        n=len(nums); dp=[n]*n; dp[0]=0\n        for i in range(n):\n            for j in range(i+1,min(n,i+nums[i]+1)): dp[j]=min(dp[j],dp[i]+1)\n        return dp[-1]\n",
        "java": "import java.util.*;\nclass Solution {\n    public int jump(int[] a) {\n        int n=a.length; int[] dp=new int[n]; Arrays.fill(dp,n); dp[0]=0;\n        for(int i=0;i<n;i++) for(int j=i+1;j<n && j<=i+a[i];j++) dp[j]=Math.min(dp[j],dp[i]+1);\n        return dp[n-1];\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "dp=[0,6,6,6,6,6]"
            ],
            "note": {
              "zh": "6 作为未确定距离的上界标记。",
              "en": "Use 6 as the initial unknown-distance sentinel."
            }
          },
          {
            "cells": [
              "i=0",
              "dp=[0,1,1,6,6,6]"
            ],
            "note": {
              "zh": "第一跳可到 1 或 2。",
              "en": "One jump reaches 1 or 2."
            }
          },
          {
            "cells": [
              "i=2",
              "dp=[0,1,1,2,2,2]"
            ],
            "note": {
              "zh": "从 2 再跳一次覆盖 3、4、5，终点距离 2。",
              "en": "From 2, one more jump reaches 3,4,5; destination distance is 2."
            }
          }
        ]
      },
      {
        "key": "layers",
        "name": {
          "zh": "按跳数扩展可达区间",
          "en": "Expand reachable intervals by jump count"
        },
        "intuition": {
          "zh": "最少跳数相当于 BFS 层数。一层内所有位置可以在当前跳数内到达，扫描这些位置时收集下一层最远边界。只有走到当前层末尾，才真正把跳数加一；这不是每次选择最远落脚点，而是同时比较本层全部候选。",
          "en": "Minimum jumps correspond to BFS levels. Scan all positions covered by the current jump count and collect the farthest next boundary. Increment the count only after completing that level. This evaluates all candidates, rather than committing to one farthest landing."
        },
        "steps": {
          "zh": [
            "steps=end=far=0。",
            "只遍历 0..n−2；更新 far=max(far,i+nums[i])。",
            "当 i=end 时当前层结束，steps++，end=far。",
            "返回 steps；最后位置不需再跳出去。"
          ],
          "en": [
            "Initialize steps=end=far=0.",
            "Visit only 0 through n−2, extending far.",
            "When i=end, finish a level: increment steps and set end=far.",
            "Return steps; no jump out of the destination is needed."
          ]
        },
        "correctness": {
          "zh": "每次层扩张包含所有再跳一步可达的位置；更少跳数的层已全部处理，所以首次覆盖终点的层数就是最少跳数。",
          "en": "Each expansion includes every position reachable with one more jump. All smaller jump counts have been exhausted, so the first layer reaching the destination is optimal."
        },
        "time": "O(n)",
        "space": "O(1)",
        "complexity": {
          "zh": "每个下标只扫描一次，三项整数摘要替代整张距离表。可达保证使边界不会永久停住。",
          "en": "Each index is scanned once; three integers replace the distance table. Guaranteed reachability prevents a permanently stuck boundary."
        },
        "python": "class Solution:\n    def jump(self, nums):\n        steps=end=far=0\n        for i in range(len(nums)-1):\n            far=max(far,i+nums[i])\n            if i==end: steps+=1; end=far\n        return steps\n",
        "java": "class Solution {\n    public int jump(int[] a) {\n        int steps=0,end=0,far=0;\n        for(int i=0;i<a.length-1;i++) {\n            far=Math.max(far,i+a[i]);\n            if(i==end) { steps++; end=far; }\n        }\n        return steps;\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "i=0",
              "steps=1",
              "end=2"
            ],
            "note": {
              "zh": "扫描起点后第一层边界为 2。",
              "en": "After the start, the one-jump boundary is 2."
            }
          },
          {
            "cells": [
              "i=1",
              "far=2"
            ],
            "note": {
              "zh": "扫描本层位置 1，下一层暂未扩张。",
              "en": "Scanning position 1 does not extend the next boundary."
            }
          },
          {
            "cells": [
              "i=2",
              "far=5",
              "steps=2",
              "end=5"
            ],
            "note": {
              "zh": "完成本层，下一层覆盖终点，最少两跳。",
              "en": "Finish the level; the next covers the destination in two jumps."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/jump-game-ii/"
      }
    ],
    "slug": "jump-game-ii",
    "title": {
      "zh": "跳跃游戏 II",
      "en": "Jump Game II"
    },
    "category": {
      "zh": "贪心算法",
      "en": "Greedy"
    },
    "level": {
      "zh": "中等",
      "en": "Medium"
    }
  },
  {
    "id": 763,
    "statement": {
      "zh": "把 s 切成尽可能多的非空连续片段，要求任何一个字母的全部出现只能属于同一片段。按原顺序返回各片段长度；拼接所有片段仍须得到 s。",
      "en": "Split s into as many nonempty consecutive parts as possible, with every occurrence of each letter confined to one part. Return part lengths in order; concatenating the parts must reproduce s."
    },
    "constraints": {
      "zh": [
        "1 ≤ s.length ≤ 500",
        "s 只含小写英文字母"
      ],
      "en": [
        "1 ≤ s.length ≤ 500",
        "s contains only lowercase English letters"
      ]
    },
    "example": {
      "zh": "s=\"abacdefe\" → [3,1,1,3]，切分为 aba | c | d | efe。",
      "en": "s=\"abacdefe\" → [3,1,1,3], corresponding to aba | c | d | efe."
    },
    "methods": [
      {
        "key": "intervals",
        "name": {
          "zh": "字母覆盖区间合并",
          "en": "Merge each letter’s occurrence interval"
        },
        "intuition": {
          "zh": "同一个字母从第一次到最后一次出现之间不能有切口，因此每个字母给出一个不可拆开的覆盖区间。两个区间重叠时也必须归入同一片段。按左端排序并合并重叠区间，得到所有被约束强制连在一起的位置块。",
          "en": "No cut may lie between the first and last occurrence of one letter, giving an indivisible interval for each letter. Overlapping intervals must belong to one part. Sorting and merging these intervals reveals exactly the blocks forced together by the constraints."
        },
        "steps": {
          "zh": [
            "统计每种字母的首末下标。",
            "按首下标排序所有区间。",
            "新区间左端≤当前右端时合并，否则结束当前段并开始新段。",
            "将每个最终区间的长度加入答案。"
          ],
          "en": [
            "Record first and last positions for every letter.",
            "Sort these intervals by first position.",
            "Merge overlaps; a disjoint interval starts a new part.",
            "Output each merged interval’s length."
          ]
        },
        "correctness": {
          "zh": "区间内切分会拆开某个字母，重叠区间必须一起保留；不同合并块之间没有字母跨越，因此全部切开合法且段数最多。",
          "en": "A cut inside an occurrence interval splits a letter, and overlap forces intervals together. No letter crosses distinct merged blocks, so separating all such blocks is valid and maximizes the count."
        },
        "time": "O(n + σ log σ)",
        "space": "O(σ) auxiliary; O(σ) output",
        "complexity": {
          "zh": "σ≤26 为不同字母数，统计 O(n)，排序 O(σ log σ)。在固定小写字母表下可写 O(n) 时间、O(1) 辅助空间，但显式保留 σ 更清楚。",
          "en": "σ≤26 is the number of distinct letters. Counting is linear and interval sorting costs O(σ log σ). With the fixed alphabet this simplifies to O(n) time and constant auxiliary space."
        },
        "python": "class Solution:\n    def partitionLabels(self, s):\n        bounds={}\n        for i,c in enumerate(s):\n            if c not in bounds: bounds[c]=[i,i]\n            bounds[c][1]=i\n        intervals=sorted(bounds.values())\n        start,end=intervals[0]; out=[]\n        for l,r in intervals[1:]:\n            if l<=end: end=max(end,r)\n            else: out.append(end-start+1); start,end=l,r\n        out.append(end-start+1)\n        return out\n",
        "java": "import java.util.*;\nclass Solution {\n    public List<Integer> partitionLabels(String s) {\n        int[] first=new int[26],last=new int[26]; Arrays.fill(first,-1);\n        for(int i=0;i<s.length();i++) { int c=s.charAt(i)-'a'; if(first[c]<0) first[c]=i; last[c]=i; }\n        List<int[]> intervals=new ArrayList<>();\n        for(int c=0;c<26;c++) if(first[c]>=0) intervals.add(new int[]{first[c],last[c]});\n        intervals.sort(Comparator.comparingInt(a->a[0]));\n        int start=intervals.get(0)[0],end=intervals.get(0)[1]; List<Integer> out=new ArrayList<>();\n        for(int i=1;i<intervals.size();i++) {\n            int[] a=intervals.get(i);\n            if(a[0]<=end) end=Math.max(end,a[1]);\n            else { out.add(end-start+1); start=a[0]; end=a[1]; }\n        }\n        out.add(end-start+1); return out;\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "a:[0,2]",
              "b:[1,1]",
              "c:[3,3]",
              "d:[4,4]",
              "e:[5,7]",
              "f:[6,6]"
            ],
            "note": {
              "zh": "每个字母形成不可分割的覆盖区间。",
              "en": "Each letter creates an indivisible occurrence interval."
            }
          },
          {
            "cells": [
              "[0,2] | [3,3] | [4,4] | [5,7]"
            ],
            "note": {
              "zh": "重叠区间合并，独立的相邻区间无需合并。",
              "en": "Merge overlaps; adjacent disjoint intervals need not merge."
            }
          },
          {
            "cells": [
              "lengths=[3,1,1,3]"
            ],
            "note": {
              "zh": "输出各个合并区间的长度。",
              "en": "Output each merged interval length."
            }
          }
        ]
      },
      {
        "key": "last",
        "name": {
          "zh": "最后位置表与最早合法切口",
          "en": "Last positions and the earliest valid cut"
        },
        "intuition": {
          "zh": "当前段一旦包含字母 c，就必须覆盖 c 的最后出现位置。扫描时不断把段尾扩展到已见字母最远的末位置；扫描下标追上这个段尾，说明段内字母都不会再出现在后面，此时立刻切开能留下最多机会。",
          "en": "Once the current part contains c, it must extend through c’s last occurrence. Keep the furthest last position among letters encountered. When the scan reaches that boundary, none of the part’s letters appears later, so cutting immediately preserves the most future opportunities."
        },
        "steps": {
          "zh": [
            "预扫描记录 last[c]。",
            "start=0、end=0，再从左到右读字符。",
            "end=max(end,last[c])；若 i=end，输出 end−start+1。",
            "把 start 设为 i+1，继续下一段。"
          ],
          "en": [
            "Precompute last[c].",
            "Scan with start=0 and end=0.",
            "Extend end to last[c]; at i=end output end−start+1.",
            "Set start=i+1 and continue."
          ]
        },
        "correctness": {
          "zh": "i<end 时有已见字母尚未结束，不能切；i=end 时所有约束已满足，是最早合法切口。选择更晚切口只会合并合法片段，不可能增加段数。",
          "en": "Before end, a seen letter still appears later, so a cut is invalid. At end the earliest valid cut is reached. Delaying it only merges valid parts and cannot increase their count."
        },
        "time": "O(n + σ)",
        "space": "O(σ) auxiliary; O(σ) output",
        "complexity": {
          "zh": "两遍线性扫描，last 表最多 26 项。输出最多 σ 段；σ 固定时辅助空间为 O(1)。",
          "en": "Two linear scans use at most 26 last-position entries. There are at most σ output parts; the fixed alphabet makes auxiliary space constant."
        },
        "python": "class Solution:\n    def partitionLabels(self, s):\n        last={c:i for i,c in enumerate(s)}\n        start=end=0; out=[]\n        for i,c in enumerate(s):\n            end=max(end,last[c])\n            if i==end: out.append(end-start+1); start=i+1\n        return out\n",
        "java": "import java.util.*;\nclass Solution {\n    public List<Integer> partitionLabels(String s) {\n        int[] last=new int[26];\n        for(int i=0;i<s.length();i++) last[s.charAt(i)-'a']=i;\n        int start=0,end=0; List<Integer> out=new ArrayList<>();\n        for(int i=0;i<s.length();i++) {\n            end=Math.max(end,last[s.charAt(i)-'a']);\n            if(i==end) { out.add(end-start+1); start=i+1; }\n        }\n        return out;\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "i=0..2",
              "end=2",
              "output=[3]"
            ],
            "note": {
              "zh": "a 的末位置为 2，在此完成第一段。",
              "en": "The last a is at 2, completing the first part there."
            }
          },
          {
            "cells": [
              "i=3..4",
              "output=[3,1,1]"
            ],
            "note": {
              "zh": "c 和 d 均只出现一次，各自成段。",
              "en": "c and d each occur once and form separate parts."
            }
          },
          {
            "cells": [
              "i=5..7",
              "end=7",
              "output=[3,1,1,3]"
            ],
            "note": {
              "zh": "e 的末位置使末段包含 f 和另一个 e。",
              "en": "The last e forces the final part to include f and both e occurrences."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/partition-labels/"
      }
    ],
    "slug": "partition-labels",
    "title": {
      "zh": "划分字母区间",
      "en": "Partition Labels"
    },
    "category": {
      "zh": "贪心算法",
      "en": "Greedy"
    },
    "level": {
      "zh": "中等",
      "en": "Medium"
    }
  },
  {
    "id": 70,
    "statement": {
      "zh": "从第 0 阶走到第 n 阶，每次只能上 1 阶或 2 阶。求恰好到达顶端的不同步长序列数量；顺序不同也算不同走法。",
      "en": "Starting at step zero, reach step n using moves of one or two steps. Count distinct move sequences that land exactly at the top; different orders count separately."
    },
    "constraints": {
      "zh": [
        "1 ≤ n ≤ 45"
      ],
      "en": [
        "1 ≤ n ≤ 45"
      ]
    },
    "example": {
      "zh": "n=4 → 5：1111、112、121、211、22。",
      "en": "n=4 → 5: 1111, 112, 121, 211, and 22."
    },
    "methods": [
      {
        "key": "table",
        "name": {
          "zh": "按最后一步分类的 DP 表",
          "en": "DP table classified by the last move"
        },
        "intuition": {
          "zh": "到第 i 阶的最后一步只能是从 i−1 跨一阶，或从 i−2 跨两阶。这两组走法互不重叠且覆盖全部可能，所以方案数相加。dp[0]=1 表示什么也不走的空序列，是直接跨两阶时所需的起点方案。",
          "en": "The last move to i comes from i−1 by one step or i−2 by two. These disjoint cases cover every sequence, so add their counts. dp[0]=1 represents the empty sequence, allowing a direct two-step move to be counted correctly."
        },
        "steps": {
          "zh": [
            "初始化 dp[0]=dp[1]=1。",
            "对 i=2..n，计算 dp[i]=dp[i−1]+dp[i−2]。",
            "返回 dp[n]。"
          ],
          "en": [
            "Initialize dp[0]=dp[1]=1.",
            "For i=2..n, add the previous two states.",
            "Return dp[n]."
          ]
        },
        "correctness": {
          "zh": "删除最后一步把两类路径分别一一对应到前两个状态，既不会重复也不会漏计；按阶数归纳成立。",
          "en": "Removing the last move gives a bijection to one of the preceding two states, with neither omission nor overlap. Induction proves every entry."
        },
        "time": "O(n)",
        "space": "O(n)",
        "complexity": {
          "zh": "n−1 次加法和 n+1 个状态；题设 n≤45 时结果可由 Java int 容纳。",
          "en": "There are n−1 additions and n+1 states. Under n≤45, the result fits a Java int."
        },
        "python": "class Solution:\n    def climbStairs(self, n):\n        dp=[0]*(n+1); dp[0]=dp[1]=1\n        for i in range(2,n+1): dp[i]=dp[i-1]+dp[i-2]\n        return dp[n]\n",
        "java": "class Solution {\n    public int climbStairs(int n) {\n        int[] dp=new int[n+1]; dp[0]=dp[1]=1;\n        for(int i=2;i<=n;i++) dp[i]=dp[i-1]+dp[i-2];\n        return dp[n];\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "dp[0]=1",
              "dp[1]=1"
            ],
            "note": {
              "zh": "空走法和单阶走法各一种。",
              "en": "There is one empty path and one one-step path."
            }
          },
          {
            "cells": [
              "dp[2]=2",
              "dp[3]=3"
            ],
            "note": {
              "zh": "依次由前两个状态相加。",
              "en": "Add the preceding two states in order."
            }
          },
          {
            "cells": [
              "dp[4]=3+2=5"
            ],
            "note": {
              "zh": "最后一阶按末步分类共 5 种。",
              "en": "The final last-move split gives five paths."
            }
          }
        ]
      },
      {
        "key": "rolling",
        "name": {
          "zh": "滚动保存前两阶",
          "en": "Roll the previous two states"
        },
        "intuition": {
          "zh": "递推只读取前两项，更早的状态计算后不再需要。用 a、b 保存前两阶的方案数，先计算 next，再同时推进它们。空间优化没有改变计数含义，也没有省略路径种类。",
          "en": "The recurrence reads only its last two values, so older states can be discarded. Keep them in a and b, compute next first, then advance both. This changes storage, not the counting argument or the set of paths considered."
        },
        "steps": {
          "zh": [
            "a=b=1，分别表示第 0 和第 1 阶。",
            "每次 next=a+b。",
            "令 a=b、b=next，必须保留旧 b。",
            "处理到 n 后返回 b。"
          ],
          "en": [
            "Start a=b=1 for steps zero and one.",
            "Compute next=a+b.",
            "Assign a=old b and b=next.",
            "Return b after reaching n."
          ]
        },
        "correctness": {
          "zh": "每轮开始 a、b 分别等于正确的前两个 DP 状态，转移和完整表一致；更新后不变量继续成立。",
          "en": "At each iteration a and b equal the two correct preceding DP states. The same recurrence and careful update preserve the invariant."
        },
        "time": "O(n)",
        "space": "O(1)",
        "complexity": {
          "zh": "仍需逐阶计算，但只保存两个旧状态和一个临时值；按题设固定整数范围分析。",
          "en": "The loop still visits each step, but stores only two previous values and one temporary, under the problem’s bounded-integer model."
        },
        "python": "class Solution:\n    def climbStairs(self, n):\n        a=b=1\n        for _ in range(2,n+1): a,b=b,a+b\n        return b\n",
        "java": "class Solution {\n    public int climbStairs(int n) {\n        int a=1,b=1;\n        for(int i=2;i<=n;i++) { int next=a+b; a=b; b=next; }\n        return b;\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "a=1",
              "b=1"
            ],
            "note": {
              "zh": "两个变量对应第 0、1 阶。",
              "en": "The variables represent steps zero and one."
            }
          },
          {
            "cells": [
              "i=2: a=1,b=2",
              "i=3: a=2,b=3"
            ],
            "note": {
              "zh": "每次先求和，再滑动状态。",
              "en": "Compute each sum before shifting the states."
            }
          },
          {
            "cells": [
              "i=4: a=3,b=5",
              "answer=5"
            ],
            "note": {
              "zh": "最后 b 保存第 4 阶答案。",
              "en": "Finally b stores the answer for step four."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/climbing-stairs/"
      }
    ],
    "slug": "climbing-stairs",
    "title": {
      "zh": "爬楼梯",
      "en": "Climbing Stairs"
    },
    "category": {
      "zh": "动态规划",
      "en": "Dynamic Programming"
    },
    "level": {
      "zh": "简单",
      "en": "Easy"
    }
  },
  {
    "id": 118,
    "statement": {
      "zh": "返回杨辉三角从顶端开始的前 numRows 行。首行为 [1]，每行两端为 1，内部元素等于上一行左上方和右上方两个数之和。",
      "en": "Return the first numRows rows of Pascal’s triangle, starting with [1]. Each row has ones at both ends; each interior entry is the sum of the two entries above it."
    },
    "constraints": {
      "zh": [
        "1 ≤ numRows ≤ 30"
      ],
      "en": [
        "1 ≤ numRows ≤ 30"
      ]
    },
    "example": {
      "zh": "numRows=4 → [[1],[1,1],[1,2,1],[1,3,3,1]]。",
      "en": "numRows=4 → [[1],[1,1],[1,2,1],[1,3,3,1]]."
    },
    "methods": [
      {
        "key": "rows",
        "name": {
          "zh": "直接创建每一行",
          "en": "Build each row directly"
        },
        "intuition": {
          "zh": "第 r 行只有 r+1 个数。先把这一行填为 1，边界已经正确；内部位置从上一行相邻两项相加得到。每行用独立数组或列表，因此后面的计算不会改写已经输出的行。",
          "en": "Row r contains r+1 values. Fill it with ones to establish both boundaries, then compute each interior value from adjacent entries in the preceding row. Each row is a separate object, so later computation cannot alter earlier output."
        },
        "steps": {
          "zh": [
            "按 r=0..numRows−1 创建长度 r+1 的全 1 行。",
            "内部 j=1..r−1 取 result[r−1][j−1]+result[r−1][j]。",
            "将新行加入结果。"
          ],
          "en": [
            "Create a row of r+1 ones for each r.",
            "Fill interior j from the previous row’s j−1 and j entries.",
            "Append this independent row to the result."
          ]
        },
        "correctness": {
          "zh": "首行与边界符合定义；假设上一行正确，内部相加正是杨辉三角定义，所以归纳得到全部行。",
          "en": "The first row and boundaries satisfy the definition. Given a correct previous row, every interior sum is correct, proving all rows by induction."
        },
        "time": "O(r²)",
        "space": "O(r²) including output",
        "complexity": {
          "zh": "r=numRows，共输出 r(r+1)/2 个数，时间和总空间都为 Θ(r²)。新行本身属于返回结果，除结果外仅需 O(1) 索引状态。",
          "en": "For r=numRows the output has r(r+1)/2 values, requiring Θ(r²) time and total space. Newly built rows belong to the output; other state is constant."
        },
        "python": "class Solution:\n    def generate(self, numRows):\n        out=[]\n        for r in range(numRows):\n            row=[1]*(r+1)\n            for j in range(1,r): row[j]=out[-1][j-1]+out[-1][j]\n            out.append(row)\n        return out\n",
        "java": "import java.util.*;\nclass Solution {\n    public List<List<Integer>> generate(int numRows) {\n        List<List<Integer>> out=new ArrayList<>();\n        for(int r=0;r<numRows;r++) {\n            List<Integer> row=new ArrayList<>(Collections.nCopies(r+1,1));\n            for(int j=1;j<r;j++) row.set(j,out.get(r-1).get(j-1)+out.get(r-1).get(j));\n            out.add(row);\n        }\n        return out;\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "out=[[1],[1,1]]"
            ],
            "note": {
              "zh": "前两行仅由边界 1 组成。",
              "en": "The first two rows contain only boundary ones."
            }
          },
          {
            "cells": [
              "row=[1,1+1,1]=[1,2,1]"
            ],
            "note": {
              "zh": "第三行内部来自上一行的 1+1。",
              "en": "The third row’s interior is 1+1 from the previous row."
            }
          },
          {
            "cells": [
              "row=[1,1+2,2+1,1]=[1,3,3,1]"
            ],
            "note": {
              "zh": "第四行两个内部位置分别相加。",
              "en": "Compute the fourth row’s two interior sums."
            }
          }
        ]
      },
      {
        "key": "rolling",
        "name": {
          "zh": "工作行倒序更新并复制输出",
          "en": "Update one working row backwards and copy it"
        },
        "intuition": {
          "zh": "下一行只依赖上一行，可以复用一个工作行。危险在于原地覆盖：从左往右算会读到本轮刚更新的数。必须从右往左更新，让两个来源都仍是上一行的值；加入结果时复制，避免所有行共享同一对象。",
          "en": "Reuse one working row because only the previous row is needed. Updating left to right would read already changed values, so move right to left. Copy each completed row into the result; otherwise every output row would reference the same changing object."
        },
        "steps": {
          "zh": [
            "工作行初始为空，每轮先在末尾添加 1。",
            "从倒数第二项向左更新到下标 1：row[j]+=row[j−1]。",
            "首项保持 1。",
            "复制工作行加入结果，不保存原引用。"
          ],
          "en": [
            "Start with an empty working row and append one each round.",
            "From the second-last position down to one, add row[j−1] into row[j].",
            "Leave the first entry as one.",
            "Append a copy of the working row."
          ]
        },
        "correctness": {
          "zh": "倒序更新保证读取的 row[j] 和 row[j−1] 都未被本轮覆盖，因此等价于直接读取上一行；独立副本保证历史行不变。",
          "en": "Backward order leaves both source entries untouched until used, reproducing the previous-row recurrence. Independent copies preserve earlier rows."
        },
        "time": "O(r²)",
        "space": "O(r) auxiliary + O(r²) output",
        "complexity": {
          "zh": "各行更新与复制总共 Θ(r²)；工作行 O(r)，全部输出仍为 Θ(r²)。该方法练习空间复用，并不减少完整输出需求。",
          "en": "Updates and copies total Θ(r²). The work row uses O(r), while all output remains Θ(r²). This teaches reuse rather than reducing the required output size."
        },
        "python": "class Solution:\n    def generate(self, numRows):\n        row=[]; out=[]\n        for _ in range(numRows):\n            row.append(1)\n            for j in range(len(row)-2,0,-1): row[j]+=row[j-1]\n            out.append(row.copy())\n        return out\n",
        "java": "import java.util.*;\nclass Solution {\n    public List<List<Integer>> generate(int numRows) {\n        List<Integer> row=new ArrayList<>(); List<List<Integer>> out=new ArrayList<>();\n        for(int r=0;r<numRows;r++) {\n            row.add(1);\n            for(int j=row.size()-2;j>=1;j--) row.set(j,row.get(j)+row.get(j-1));\n            out.add(new ArrayList<>(row));\n        }\n        return out;\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "work=[1,2,1]",
              "saved 3 rows"
            ],
            "note": {
              "zh": "第三行已复制保存。",
              "en": "The third row has been copied into the output."
            }
          },
          {
            "cells": [
              "append 1: [1,2,1,1]",
              "j=2: [1,2,3,1]"
            ],
            "note": {
              "zh": "从右更新，读取未变化的旧值 1 和 2。",
              "en": "Update from the right using unchanged old values 1 and 2."
            }
          },
          {
            "cells": [
              "j=1: [1,3,3,1]",
              "copy"
            ],
            "note": {
              "zh": "更新左侧内部值后复制，历史行不受影响。",
              "en": "Update the remaining interior value and copy, preserving earlier rows."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/pascals-triangle/"
      }
    ],
    "slug": "pascals-triangle",
    "title": {
      "zh": "杨辉三角",
      "en": "Pascal's Triangle"
    },
    "category": {
      "zh": "动态规划",
      "en": "Dynamic Programming"
    },
    "level": {
      "zh": "简单",
      "en": "Easy"
    }
  },
  {
    "id": 198,
    "statement": {
      "zh": "nums 按街道顺序给出各房屋金额。选择若干房屋，使被选房屋中没有任何相邻的两间，返回所选金额总和的最大值。",
      "en": "nums lists house amounts in street order. Choose houses with no two adjacent houses selected and maximize the total amount."
    },
    "constraints": {
      "zh": [
        "1 ≤ nums.length ≤ 100",
        "0 ≤ nums[i] ≤ 400"
      ],
      "en": [
        "1 ≤ nums.length ≤ 100",
        "0 ≤ nums[i] ≤ 400"
      ]
    },
    "example": {
      "zh": "nums=[4,2,6,3] → 10，选择下标 0 和 2 的金额 4+6。",
      "en": "nums=[4,2,6,3] → 10 by choosing indices 0 and 2, worth 4+6."
    },
    "methods": [
      {
        "key": "table",
        "name": {
          "zh": "前缀最优 DP",
          "en": "Prefix-optimum DP"
        },
        "intuition": {
          "zh": "看最后一间房的选择：不选它，沿用前 i−1 间最优值；选它，就必须跳过紧邻前一间，把金额加到前 i−2 间最优值。两种情况取最大，避免“只选奇数位或偶数位”这种不成立的限制。",
          "en": "Split by the last house: skipping it retains the optimum for i−1 houses; taking it forbids its neighbor and adds its amount to the optimum for i−2 houses. Choose the better case rather than incorrectly restricting choices to odd or even positions."
        },
        "steps": {
          "zh": [
            "dp[i] 表示前 i 间房可获得的最大总额。",
            "dp[0]=0、dp[1]=nums[0]。",
            "i≥2 时令 dp[i]=max(dp[i−1],dp[i−2]+nums[i−1])。",
            "返回 dp[n]。"
          ],
          "en": [
            "Define dp[i] as the optimum for the first i houses.",
            "Initialize dp[0]=0 and dp[1]=nums[0].",
            "For i≥2, choose max(dp[i−1],dp[i−2]+nums[i−1]).",
            "Return dp[n]."
          ]
        },
        "correctness": {
          "zh": "每个合法方案要么包含末间，要么不包含；这两类完整且互斥。各类使用对应前缀最优解后取最大，得到整体最优。",
          "en": "Every valid plan either includes the last house or excludes it. These exhaustive disjoint cases reduce to optimal smaller prefixes, so their maximum is optimal."
        },
        "time": "O(n)",
        "space": "O(n)",
        "complexity": {
          "zh": "每间房一次常数转移，存储 n+1 个状态。金额非负，因此初始化首间金额正确。",
          "en": "Each house needs one constant-time transition and n+1 states are stored. Nonnegative amounts justify the first-house initialization."
        },
        "python": "class Solution:\n    def rob(self, nums):\n        dp=[0]*(len(nums)+1); dp[1]=nums[0]\n        for i in range(2,len(nums)+1): dp[i]=max(dp[i-1],dp[i-2]+nums[i-1])\n        return dp[-1]\n",
        "java": "class Solution {\n    public int rob(int[] a) {\n        int[] dp=new int[a.length+1]; dp[1]=a[0];\n        for(int i=2;i<=a.length;i++) dp[i]=Math.max(dp[i-1],dp[i-2]+a[i-1]);\n        return dp[a.length];\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "dp[0]=0",
              "dp[1]=4"
            ],
            "note": {
              "zh": "前一间最佳为 4。",
              "en": "The first house gives optimum 4."
            }
          },
          {
            "cells": [
              "dp[2]=max(4,2)=4",
              "dp[3]=max(4,4+6)=10"
            ],
            "note": {
              "zh": "第三间可与第一间搭配。",
              "en": "The third house can be paired with the first."
            }
          },
          {
            "cells": [
              "dp[4]=max(10,4+3)=10"
            ],
            "note": {
              "zh": "末间不选更好，答案为 10。",
              "en": "Skipping the last house is better, leaving 10."
            }
          }
        ]
      },
      {
        "key": "rolling",
        "name": {
          "zh": "滚动前两个最优值",
          "en": "Roll the preceding two optima"
        },
        "intuition": {
          "zh": "转移只依赖前两个前缀的最优金额，保存完整数组不是必需的。older 保存隔一间的最优值，previous 保存紧邻前缀的最优值。先计算 current，再移动变量，确保“选当前房”时不会错误加上相邻房的收益。",
          "en": "Only the preceding two prefix optima are needed. older represents the prefix two steps back and previous the immediately preceding prefix. Compute current before moving either variable, preventing the take-current case from accidentally including an adjacent house."
        },
        "steps": {
          "zh": [
            "older=previous=0。",
            "对每个金额 x，计算 current=max(previous,older+x)。",
            "将 older 更新为旧 previous，再把 previous 更新为 current。",
            "返回 previous。"
          ],
          "en": [
            "Initialize older=previous=0.",
            "For each x, compute current=max(previous,older+x).",
            "Shift older to old previous, then previous to current.",
            "Return previous."
          ]
        },
        "correctness": {
          "zh": "两个变量始终等于完整 DP 表中所需的前两个值，转移不变，因此与表格版本得到相同最优解。",
          "en": "The variables always equal the two required entries of the full DP table. Identical transitions therefore produce the same optimum."
        },
        "time": "O(n)",
        "space": "O(1)",
        "complexity": {
          "zh": "每个元素处理一次，固定三个整数；没有切片或递归栈。",
          "en": "Each value is processed once using three integers, with no slices or recursion."
        },
        "python": "class Solution:\n    def rob(self, nums):\n        older=previous=0\n        for x in nums:\n            current=max(previous,older+x)\n            older,previous=previous,current\n        return previous\n",
        "java": "class Solution {\n    public int rob(int[] a) {\n        int older=0,previous=0;\n        for(int x:a) { int current=Math.max(previous,older+x); older=previous; previous=current; }\n        return previous;\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "x=4: older=0,previous=4"
            ],
            "note": {
              "zh": "处理首间后保留两个前缀最优值。",
              "en": "After the first house, retain the two prefix optima."
            }
          },
          {
            "cells": [
              "x=2: older=4,previous=4"
            ],
            "note": {
              "zh": "跳过金额 2 的房子更好。",
              "en": "Skipping the house worth 2 is better."
            }
          },
          {
            "cells": [
              "x=6: older=4,previous=10"
            ],
            "note": {
              "zh": "隔一间的最优值 4 加上 6。",
              "en": "Add 6 to the optimum 4 from two prefixes back."
            }
          },
          {
            "cells": [
              "x=3: older=10,previous=10"
            ],
            "note": {
              "zh": "保持 10，不选择末间。",
              "en": "Keep 10 by skipping the last house."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/house-robber/"
      }
    ],
    "slug": "house-robber",
    "title": {
      "zh": "打家劫舍",
      "en": "House Robber"
    },
    "category": {
      "zh": "动态规划",
      "en": "Dynamic Programming"
    },
    "level": {
      "zh": "中等",
      "en": "Medium"
    }
  },
  {
    "id": 279,
    "statement": {
      "zh": "给定正整数 n，允许反复使用正整数的平方作为加数，返回加数总和恰好为 n 时所需的最少项数。返回项数，不需要返回具体拆分。",
      "en": "For a positive integer n, choose positive integer squares, allowing repetition, whose sum is n. Return the smallest number of chosen terms; the decomposition itself is not required."
    },
    "constraints": {
      "zh": [
        "1 ≤ n ≤ 10⁴",
        "同一个平方数可以使用多次。"
      ],
      "en": [
        "1 ≤ n ≤ 10⁴",
        "A square may be selected repeatedly."
      ]
    },
    "example": {
      "zh": "n=18 → 2；9+9 可以实现，18 本身不是平方，因此不能只用一项。",
      "en": "n=18 → 2: 9+9 works, and 18 is not itself a square, so one term is impossible."
    },
    "methods": [
      {
        "key": "dp",
        "name": {
          "zh": "按最后一个平方数做动态规划",
          "en": "DP over the last square"
        },
        "intuition": {
          "zh": "不要先贪心选最大的平方；例如 12 选 9 后还需三个 1，而三个 4 更好。定义 dp[a] 为凑出 a 的最少项数。若最后一项是 j²，前面的和就是 a−j²，于是候选值是 dp[a−j²]+1。对所有不超过 a 的平方取最小，便把全局选择变成已解决的小问题。",
          "en": "Choosing the largest square first can waste terms: 12 needs three 4s, whereas starting with 9 needs three extra 1s. Let dp[a] be the fewest terms summing to a. If the last term is j², removing it leaves amount a−j²; the resulting candidate is dp[a−j²]+1. Try every possible last square rather than committing to one greedy choice."
        },
        "steps": {
          "zh": [
            "dp[0]=0；其余先设为 n+1，表示尚未找到方案。",
            "金额 a 从 1 增至 n，枚举 j=1 到 floor(√a)。",
            "用 dp[a−j²]+1 改善 dp[a]；小金额已算好，可再次使用相同平方。",
            "返回 dp[n]；比如 a=18 时 j=3 给出 dp[9]+1=2。"
          ],
          "en": [
            "Set dp[0]=0 and initialize other entries to n+1.",
            "Process amounts a from 1 through n and enumerate j with j²≤a.",
            "Minimize dp[a] using dp[a−j²]+1; earlier amounts already allow repeated squares.",
            "Return dp[n]; for a=18, j=3 gives dp[9]+1=2."
          ]
        },
        "correctness": {
          "zh": "任意合法拆分都有最后一项，枚举平方覆盖了所有可能。归纳假设所有较小金额已最优，则每个候选是对应最后一项下的最优值，取最小得到 dp[a] 的最优值。",
          "en": "Every decomposition has a last square, so the choices are exhaustive. Assuming smaller amounts are optimal, each candidate is optimal among decompositions ending in its chosen square. Their minimum therefore gives the optimum for a."
        },
        "time": "O(n√n)",
        "space": "O(n)",
        "complexity": {
          "zh": "n 个状态各检查至多 √n 个平方；一维数组 n+1 项，无递归栈，返回整数为常数空间。",
          "en": "There are n states with at most √n square checks each. The array has n+1 entries; no recursion or decomposition output is stored."
        },
        "python": "from typing import List\nclass Solution:\n    def numSquares(self, n: int) -> int:\n        dp = [0] + [n + 1] * n\n        for a in range(1, n + 1):\n            j = 1\n            while j * j <= a:\n                dp[a] = min(dp[a], dp[a - j * j] + 1)\n                j += 1\n        return dp[n]\n",
        "java": "import java.util.*;\nclass Solution {\n    public int numSquares(int n) {\n        int[] dp = new int[n+1]; Arrays.fill(dp, n+1); dp[0]=0;\n        for(int a=1;a<=n;a++) for(int j=1;j*j<=a;j++)\n            dp[a]=Math.min(dp[a],dp[a-j*j]+1);\n        return dp[n];\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "n=18",
              "dp[0]=0"
            ],
            "note": {
              "zh": "先从空和开始，小金额将成为大金额的前驱。",
              "en": "Start with the empty sum; smaller amounts will supply predecessors."
            }
          },
          {
            "cells": [
              "dp[4]=1",
              "dp[9]=1",
              "dp[16]=1"
            ],
            "note": {
              "zh": "平方本身都只需一项，后续允许重复使用它们。",
              "en": "Each square takes one term and may be reused later."
            }
          },
          {
            "cells": [
              "dp[17]=2",
              "dp[14]=3",
              "dp[9]=1",
              "dp[2]=2"
            ],
            "note": {
              "zh": "计算 18 时，最后平方为 1、4、9、16，对应这些前驱。",
              "en": "For 18, last squares 1, 4, 9, and 16 lead to these predecessors."
            }
          },
          {
            "cells": [
              "min(3,4,2,3)=2",
              "18=9+9"
            ],
            "note": {
              "zh": "最后取 9 得到最少两项。",
              "en": "Choosing 9 last gives the minimum of two terms."
            }
          }
        ]
      },
      {
        "key": "number-theory",
        "name": {
          "zh": "四平方定理与两平方枚举",
          "en": "Four-square theorem and a two-square scan"
        },
        "intuition": {
          "zh": "数学定理把答案限制到 1、2、3、4：每个正整数都可用至多四个平方表示；恰好需要四项的数形如 4ᵃ(8b+7)。先直接检查一项，再去掉 4 的因子判断四项。剩余情况尝试拆成两个平方；如果不能，答案只能为三。这种优化依赖定理，不能把模运算当作凭经验猜出的规律。",
          "en": "Number theory limits the answer to 1, 2, 3, or 4. Every positive integer is a sum of at most four squares, and exactly four are necessary for numbers of the form 4ᵃ(8b+7). Check one square first, then the four-square condition. Among the remaining numbers, test every first term of a two-square representation; failure leaves exactly three. This optimization requires the theorems, not a heuristic pattern."
        },
        "steps": {
          "zh": [
            "用整数平方根检查 n 是否为平方，是则返回 1。",
            "复制 n 到 rest，反复整除 4；若 rest mod 8=7，返回 4。",
            "枚举 a≥1，检查 n−a² 是否是平方；找到则返回 2。",
            "排除 1、2、4 后返回 3；原始 n 始终保留给两平方检查。"
          ],
          "en": [
            "Test whether n is a square using an integer square-root check; if so return 1.",
            "Copy n to rest, remove all factors of 4, and return 4 if rest mod 8 is 7.",
            "Enumerate positive a and test whether n−a² is a square; return 2 on success.",
            "After excluding 1, 2, and 4, return 3; use the original n for the pair scan."
          ]
        },
        "correctness": {
          "zh": "四平方定理给出上界 4，三平方判定准确识别必须用四项的情况。单平方与两平方的穷尽检查区分 1、2；未命中者且不需四项，必为 3。",
          "en": "The four-square theorem gives the upper bound, and the three-square criterion identifies precisely the numbers requiring four. Exhaustive checks for one and two terms distinguish those cases; the only remaining possibility is three."
        },
        "time": "O(√n)",
        "space": "O(1)",
        "complexity": {
          "zh": "两平方枚举最多 √n 次，去因子需 O(log n) 次；题目有限整数范围内平方根与乘法按常数代价计，仅保存几个整数。",
          "en": "At most √n pair candidates and O(log n) factor removals are examined. With integers bounded by this problem, square-root checks and arithmetic are constant-cost, and only scalar variables are stored."
        },
        "python": "from math import isqrt\nclass Solution:\n    def numSquares(self, n: int) -> int:\n        def square(v):\n            r = isqrt(v)\n            return r * r == v\n        if square(n): return 1\n        rest = n\n        while rest % 4 == 0: rest //= 4\n        if rest % 8 == 7: return 4\n        for a in range(1, isqrt(n) + 1):\n            if square(n - a * a): return 2\n        return 3\n",
        "java": "class Solution {\n    private boolean square(int v) {\n        int r=(int)Math.sqrt(v); return r*r==v;\n    }\n    public int numSquares(int n) {\n        if(square(n)) return 1;\n        int rest=n; while(rest%4==0) rest/=4;\n        if(rest%8==7) return 4;\n        for(int a=1;a*a<=n;a++) if(square(n-a*a)) return 2;\n        return 3;\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "n=18",
              "4²<18<5²"
            ],
            "note": {
              "zh": "18 不是单平方。",
              "en": "18 is not one square."
            }
          },
          {
            "cells": [
              "rest=18",
              "18 mod 8=2"
            ],
            "note": {
              "zh": "没有 4 的因子，不属于必须四项的类型。",
              "en": "There is no factor of four and the four-term condition fails."
            }
          },
          {
            "cells": [
              "a=1 → 17",
              "a=2 → 14",
              "a=3 → 9=3²"
            ],
            "note": {
              "zh": "前两项试探失败，a=3 找到另一个平方。",
              "en": "The first two candidates fail; a=3 leaves a square."
            }
          },
          {
            "cells": [
              "18=3²+3²",
              "answer=2"
            ],
            "note": {
              "zh": "已排除一项，因此两项最优。",
              "en": "One term was excluded, so two is optimal."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/perfect-squares/description/"
      }
    ],
    "slug": "perfect-squares",
    "title": {
      "zh": "完全平方数",
      "en": "Perfect Squares"
    },
    "category": {
      "zh": "动态规划",
      "en": "Dynamic Programming"
    },
    "level": {
      "zh": "中等",
      "en": "Medium"
    }
  },
  {
    "id": 322,
    "statement": {
      "zh": "给定正整数面额 coins 和非负目标 amount。每种面额数量不限，求恰好凑到目标所需的最少硬币枚数；无法凑成返回 −1，目标为 0 时返回 0。",
      "en": "Given positive coin denominations and a nonnegative target amount, find the fewest coins totaling exactly that amount. Each denomination is available without limit. Return −1 when impossible and 0 for a zero target."
    },
    "constraints": {
      "zh": [
        "1 ≤ coins.length ≤ 12",
        "1 ≤ coins[i] ≤ 2³¹−1",
        "0 ≤ amount ≤ 10⁴"
      ],
      "en": [
        "1 ≤ coins.length ≤ 12",
        "1 ≤ coins[i] ≤ 2³¹−1",
        "0 ≤ amount ≤ 10⁴"
      ]
    },
    "example": {
      "zh": "coins=[2,5,7], amount=11 → 3；可以取 7+2+2，任何两枚之和都不是 11。",
      "en": "coins=[2,5,7], amount=11 → 3: 7+2+2 works, while no pair totals 11."
    },
    "methods": [
      {
        "key": "dp",
        "name": {
          "zh": "金额动态规划",
          "en": "Amount DP"
        },
        "intuition": {
          "zh": "硬币数量是优化目标，金额是状态。将最后一枚面额设为 c，前面必须最优地凑出 a−c。与平方数问题一样，枚举所有最后选择；不能把无法凑成的金额写成 0，否则会把不存在的方案当成免费前缀。用 amount+1 作哨兵，因为面额至少为 1，任何可达目标的最优枚数都不会超过 amount。",
          "en": "The amount is the state and the coin count is the quantity being minimized. If the last coin is c, the preceding coins must total a−c optimally. Try all last choices. Unreachable amounts must not be initialized to zero, which would invent free prefixes. amount+1 is a safe sentinel because every positive denomination is at least one."
        },
        "steps": {
          "zh": [
            "初始化 dp[0]=0，其余为 amount+1。",
            "从小到大处理金额 a，只考虑 c≤a，避免负下标。",
            "候选 dp[a−c]+1 与当前值取小；不可达前缀不会改善哨兵。",
            "最终超过 amount 的值表示不可达，转为 −1。"
          ],
          "en": [
            "Initialize dp[0]=0 and all other entries to amount+1.",
            "Process amounts in ascending order, considering only coins c≤a.",
            "Minimize with dp[a−c]+1; an unreachable predecessor cannot improve the sentinel.",
            "Convert an answer exceeding amount into −1."
          ]
        },
        "correctness": {
          "zh": "移去任一方案的最后一枚得到更小金额；用该金额的最优方案替换前缀不会变差。枚举所有面额覆盖所有最优方案的最后一枚，按金额归纳成立。",
          "en": "Removing the last coin yields a smaller amount. Replacing that prefix by its optimum cannot worsen the solution. Enumerating all denominations covers the final coin of every optimum, giving an induction on amount."
        },
        "time": "O(Ak)",
        "space": "O(A)",
        "complexity": {
          "zh": "A=amount，k=面额数。A 个金额各枚举 k 个面额；一维数组 O(A)，无递归，无输入排序或复制。",
          "en": "A is the target and k the number of denominations. Each of A states checks k coins. The array uses O(A) space without recursion, sorting, or copying the input."
        },
        "python": "from typing import List\nclass Solution:\n    def coinChange(self, coins: List[int], amount: int) -> int:\n        dp = [0] + [amount + 1] * amount\n        for a in range(1, amount + 1):\n            for c in coins:\n                if c <= a:\n                    dp[a] = min(dp[a], dp[a-c] + 1)\n        return dp[amount] if dp[amount] <= amount else -1\n",
        "java": "import java.util.*;\nclass Solution {\n    public int coinChange(int[] coins, int amount) {\n        int[] dp=new int[amount+1]; Arrays.fill(dp,amount+1); dp[0]=0;\n        for(int a=1;a<=amount;a++) for(int c:coins)\n            if(c<=a) dp[a]=Math.min(dp[a],dp[a-c]+1);\n        return dp[amount]<=amount?dp[amount]:-1;\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "coins=2,5,7",
              "dp[0]=0",
              "A=11"
            ],
            "note": {
              "zh": "面额可重复使用；不可达状态保留哨兵。",
              "en": "Coins may repeat; unreachable states retain the sentinel."
            }
          },
          {
            "cells": [
              "dp[4]=2",
              "dp[6]=3",
              "dp[7]=1",
              "dp[9]=2"
            ],
            "note": {
              "zh": "先算更小金额，9 可由 7+2 得到。",
              "en": "Compute smaller amounts first; 9 uses 7+2."
            }
          },
          {
            "cells": [
              "dp[11]=min(dp[9],dp[6],dp[4])+1",
              "min(2,3,2)+1=3"
            ],
            "note": {
              "zh": "分别尝试最后一枚 2、5、7，最小为三枚。",
              "en": "Try final coins 2, 5, and 7; the minimum is three coins."
            }
          }
        ]
      },
      {
        "key": "bfs",
        "name": {
          "zh": "把金额看成图的广度优先搜索",
          "en": "Breadth-first search over amounts"
        },
        "intuition": {
          "zh": "把金额 0 到 amount 当作节点，加入一枚硬币就是一条边。所有边都花费一枚硬币，所以从 0 的 BFS 第 t 层恰好表示用 t 枚能首次到达的金额。先到目标的层数就是最少枚数。visited 在入队时设置，避免同一个金额被不同顺序反复加入。",
          "en": "Treat amounts from zero to the target as graph vertices. Adding one coin follows an edge with unit cost. BFS layer t represents amounts first reachable with t coins, so the first visit to the target is optimal. Mark states when enqueuing, not when removing them, to prevent repeated permutations of the same sum."
        },
        "steps": {
          "zh": [
            "目标为 0 直接返回 0；队列从金额 0 开始。",
            "每次处理当前队列长度对应的一层，同时枚数加一。",
            "对每个金额尝试加币；超过目标或已访问则跳过。",
            "遇到目标立即返回层数；队列耗尽仍未到达则返回 −1。"
          ],
          "en": [
            "Return zero immediately for a zero target; otherwise enqueue amount zero.",
            "Process one complete queue layer at a time and increment the coin count.",
            "Try each coin from each state, skipping sums beyond the target and visited sums.",
            "Return the layer on reaching the target; return −1 if the queue empties."
          ]
        },
        "correctness": {
          "zh": "BFS 按路径边数递增访问，边数就是硬币枚数。所有面额为正，超过目标的状态无法再回到目标，剪枝安全；第一次到达目标即最短路径。",
          "en": "BFS explores paths in increasing edge count, which equals the number of coins. Positive denominations make overshooting irreversible, so pruning is safe. The first target visit is therefore a shortest path."
        },
        "time": "O(Ak)",
        "space": "O(A)",
        "complexity": {
          "zh": "最多访问 A+1 个金额，每个试 k 个币，队列与 visited 最多 O(A)。Java 用 c≤amount−a 再求和，避免大面额相加溢出。",
          "en": "At most A+1 states each inspect k coins. Queue and visited storage are O(A). Java checks c≤amount−a before addition, avoiding overflow for very large denominations."
        },
        "python": "from typing import List\nfrom collections import deque\nclass Solution:\n    def coinChange(self, coins: List[int], amount: int) -> int:\n        if amount == 0: return 0\n        q = deque([0]); seen = {0}; depth = 0\n        while q:\n            depth += 1\n            for _ in range(len(q)):\n                a = q.popleft()\n                for c in coins:\n                    if c > amount - a: continue\n                    b = a + c\n                    if b == amount: return depth\n                    if b not in seen:\n                        seen.add(b); q.append(b)\n        return -1\n",
        "java": "import java.util.*;\nclass Solution {\n    public int coinChange(int[] coins, int amount) {\n        if(amount==0) return 0;\n        boolean[] seen=new boolean[amount+1]; seen[0]=true;\n        ArrayDeque<Integer> q=new ArrayDeque<>(); q.add(0); int depth=0;\n        while(!q.isEmpty()) {\n            depth++;\n            for(int size=q.size();size>0;size--) {\n                int a=q.remove();\n                for(int c:coins) {\n                    if(c>amount-a) continue;\n                    int b=a+c; if(b==amount) return depth;\n                    if(!seen[b]) {seen[b]=true;q.add(b);}\n                }\n            }\n        }\n        return -1;\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "depth=0",
              "frontier={0}"
            ],
            "note": {
              "zh": "零枚硬币只能到金额 0。",
              "en": "Zero coins reach only amount zero."
            }
          },
          {
            "cells": [
              "depth=1",
              "frontier={2,5,7}"
            ],
            "note": {
              "zh": "一条边加入一枚硬币。",
              "en": "Each edge adds one coin."
            }
          },
          {
            "cells": [
              "depth=2",
              "new={4,9,10}"
            ],
            "note": {
              "zh": "7 已访问，不重复入队；超过 11 的和剪掉。",
              "en": "Amount 7 is already seen; sums above 11 are discarded."
            }
          },
          {
            "cells": [
              "depth=3",
              "4+7=11",
              "answer=3"
            ],
            "note": {
              "zh": "第三层首次抵达目标，保证枚数最少。",
              "en": "The first target visit occurs in layer three, proving optimality."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/coin-change/description/"
      }
    ],
    "slug": "coin-change",
    "title": {
      "zh": "零钱兑换",
      "en": "Coin Change"
    },
    "category": {
      "zh": "动态规划",
      "en": "Dynamic Programming"
    },
    "level": {
      "zh": "中等",
      "en": "Medium"
    }
  },
  {
    "id": 139,
    "statement": {
      "zh": "给定字符串 s 和互不重复的单词表 wordDict，判断能否把 s 的全部字符按原顺序切成若干非空词，每段都在词表里。词可以重复使用，不要求用完词表；不能跳过字符。",
      "en": "Decide whether all of s can be split, in order and without skipping characters, into nonempty words from wordDict. Dictionary words may be reused, and unused words are allowed."
    },
    "constraints": {
      "zh": [
        "1 ≤ s.length ≤ 300",
        "1 ≤ wordDict.length ≤ 1000",
        "1 ≤ wordDict[i].length ≤ 20",
        "s 和所有单词只含小写英文字母；字典单词互不重复。"
      ],
      "en": [
        "1 ≤ s.length ≤ 300",
        "1 ≤ wordDict.length ≤ 1000",
        "1 ≤ wordDict[i].length ≤ 20",
        "Only lowercase English letters; dictionary entries are distinct."
      ]
    },
    "example": {
      "zh": "s=\"redbluered\", wordDict=[\"red\",\"blue\"] → true；可切成 red | blue | red。",
      "en": "s=\"redbluered\", wordDict=[\"red\",\"blue\"] → true via red | blue | red."
    },
    "methods": [
      {
        "key": "prefix-dp",
        "name": {
          "zh": "前缀可达 DP 与子串查找",
          "en": "Prefix reachability with substring lookup"
        },
        "intuition": {
          "zh": "把切分位置理解为字符之间的缝隙。dp[i] 表示前 i 个字符能完整切分，而不是第 i 个字符属于某个词。若 j 位置可达，并且 s[j:i] 是字典词，就能走到 i。最长词长为 L，因此不必考察距离 i 超过 L 的切分点。子串创建和哈希都不是免费的，这会反映在复杂度中。",
          "en": "View positions as boundaries between characters. dp[i] means the entire prefix of length i can be segmented, not merely that character i belongs to a word. A reachable boundary j can reach i when s[j:i] is a dictionary word. If L is the longest word, boundaries farther than L need not be checked. Creating and hashing substrings costs time and must be included."
        },
        "steps": {
          "zh": [
            "将词表放入哈希集合，计算最长词长 L。",
            "dp[0]=true，空前缀是拼接第一个词的起点。",
            "对末尾 i 检查 max(0,i−L)≤j<i；同时满足 dp[j] 和词存在才标记。",
            "第一次找到合法前驱即停止该状态的查找，返回 dp[n]。"
          ],
          "en": [
            "Build a word set and determine maximum word length L.",
            "Set dp[0]=true so the first word can start at the empty prefix.",
            "For each end i, inspect max(0,i−L)≤j<i; require both dp[j] and dictionary membership.",
            "Stop checking a state after the first valid predecessor and return dp[n]."
          ]
        },
        "correctness": {
          "zh": "合法拆分的最后一个词必从某个可达前缀后开始，因此转移不遗漏；反过来，可达前缀拼接字典词一定合法，所以不会误标。",
          "en": "The last word of any valid segmentation follows a reachable prefix, so the transition misses no solution. Conversely, appending a dictionary word to a valid prefix always produces a valid segmentation."
        },
        "time": "O(W+nL²)",
        "space": "O(k+n+L)",
        "complexity": {
          "zh": "n=串长，k=词数，W=字典总字符数，L=最长词长。每个末尾至多 L 个候选，每次切片与哈希至多 O(L)，加建集合 O(W)。辅助空间包括 k 个词引用、n 个状态及 O(L) 临时子串；原输入字符串不另复制。",
          "en": "n is string length, k the word count, W total dictionary characters, and L maximum word length. Each end checks up to L substrings costing up to O(L) to copy/hash, plus O(W) set construction. Extra storage is k word references, n states, and an O(L) temporary substring; input words are not copied."
        },
        "python": "from typing import List\nclass Solution:\n    def wordBreak(self, s: str, wordDict: List[str]) -> bool:\n        words = set(wordDict); longest = max(map(len, wordDict))\n        dp = [False] * (len(s)+1); dp[0] = True\n        for i in range(1, len(s)+1):\n            for j in range(max(0, i-longest), i):\n                if dp[j] and s[j:i] in words:\n                    dp[i] = True; break\n        return dp[-1]\n",
        "java": "import java.util.*;\nclass Solution {\n    public boolean wordBreak(String s, List<String> wordDict) {\n        Set<String> words=new HashSet<>(wordDict); int longest=0;\n        for(String w:wordDict) longest=Math.max(longest,w.length());\n        boolean[] dp=new boolean[s.length()+1];dp[0]=true;\n        for(int i=1;i<=s.length();i++) for(int j=Math.max(0,i-longest);j<i;j++)\n            if(dp[j]&&words.contains(s.substring(j,i))) {dp[i]=true;break;}\n        return dp[s.length()];\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "s=redbluered",
              "dp[0]=true",
              "L=4"
            ],
            "note": {
              "zh": "从空前缀开始，最后一个词最多长 4。",
              "en": "Start from the empty prefix; a final word has length at most four."
            }
          },
          {
            "cells": [
              "red | bluered",
              "dp[3]=true"
            ],
            "note": {
              "zh": "red 在字典且起点 0 可达。",
              "en": "red is in the dictionary and boundary zero is reachable."
            }
          },
          {
            "cells": [
              "red | blue | red",
              "dp[7]=true"
            ],
            "note": {
              "zh": "从可达位置 3 加上 blue。",
              "en": "Append blue from reachable boundary three."
            }
          },
          {
            "cells": [
              "dp[10]=true",
              "answer=true"
            ],
            "note": {
              "zh": "再次使用 red，全部字符都被覆盖。",
              "en": "Reuse red to cover every character."
            }
          }
        ]
      },
      {
        "key": "trie-dp",
        "name": {
          "zh": "字典树沿可达位置扩展",
          "en": "Trie expansion from reachable boundaries"
        },
        "intuition": {
          "zh": "子串 DP 反复复制并哈希同一批字符。把字典建成字典树后，从每个可达位置向右逐字符走，只要路径还存在就继续；走到词尾就标记新边界。共享前缀只走一条路径，不必为每个候选生成子串，也不能遇到第一个词尾就停止，因为更长词可能是唯一正确选择。",
          "en": "Substring DP repeatedly copies and hashes overlapping text. A trie lets us scan characters directly from each reachable boundary. Continue while trie edges exist and mark a new reachable boundary whenever a word ends. Shared prefixes use one path, no substring is constructed, and traversal must continue past a word ending because a longer word may be necessary."
        },
        "steps": {
          "zh": [
            "按字符插入每个词，词尾单独标记。",
            "ok[0]=true；从左往右只处理 ok[i] 为真的起点。",
            "从根沿 s[i],s[i+1]… 前进，缺少边时停止。",
            "经过词尾即设置 ok[j+1]=true；最后检查 ok[n]。"
          ],
          "en": [
            "Insert each word character by character and mark terminal nodes.",
            "Set ok[0]=true and process only reachable starting positions.",
            "Walk from the trie root along s[i],s[i+1],… until an edge is missing.",
            "At each terminal node mark ok[j+1]=true; return ok[n]."
          ]
        },
        "correctness": {
          "zh": "树路径精确表示字典前缀，词尾精确表示字典单词。每次扩展都连接一个可拆前缀与一个完整词；所有从可达起点出发的词都被扫描，所以与前缀 DP 的充要条件相同。",
          "en": "Trie paths represent dictionary prefixes and terminal nodes represent complete words. Every expansion joins a valid prefix with one complete word, and every matching word from a reachable boundary is visited, implementing the same necessary-and-sufficient condition as prefix DP."
        },
        "time": "O(W+nL)",
        "space": "O(W+n)",
        "complexity": {
          "zh": "构树遍历 W 个字符；每个起点最多沿最长词走 L 次。Python 字典边按期望 O(1)，Java 固定 26 分支；节点总量 O(W)，状态 O(n)，没有子串复制或递归。",
          "en": "Building visits W dictionary characters; each start follows at most L edges. Python dictionary transitions are expected O(1), while Java uses fixed 26-way arrays. Trie nodes use O(W) storage and reachability uses O(n), without substring copies or recursion."
        },
        "python": "from typing import List\nclass Solution:\n    def wordBreak(self, s: str, wordDict: List[str]) -> bool:\n        root = {}\n        for word in wordDict:\n            node = root\n            for ch in word: node = node.setdefault(ch, {})\n            node['#'] = True\n        ok = [False] * (len(s)+1); ok[0] = True\n        for i in range(len(s)):\n            if not ok[i]: continue\n            node = root\n            for j in range(i, len(s)):\n                if s[j] not in node: break\n                node = node[s[j]]\n                if '#' in node: ok[j+1] = True\n        return ok[-1]\n",
        "java": "import java.util.*;\nclass Solution {\n    static class Node {Node[] next=new Node[26];boolean end;}\n    public boolean wordBreak(String s, List<String> wordDict) {\n        Node root=new Node();\n        for(String word:wordDict) {\n            Node p=root;\n            for(int i=0;i<word.length();i++) {\n                int c=word.charAt(i)-'a';\n                if(p.next[c]==null) p.next[c]=new Node();\n                p=p.next[c];\n            }\n            p.end=true;\n        }\n        boolean[] ok=new boolean[s.length()+1];ok[0]=true;\n        for(int i=0;i<s.length();i++) if(ok[i]) {\n            Node p=root;\n            for(int j=i;j<s.length();j++) {\n                p=p.next[s.charAt(j)-'a']; if(p==null) break;\n                if(p.end) ok[j+1]=true;\n            }\n        }\n        return ok[s.length()];\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "root→r→e→d*",
              "root→b→l→u→e*",
              "ok[0]=true"
            ],
            "note": {
              "zh": "星号为词尾，字典共两条路径。",
              "en": "Stars mark word ends; the trie has two word paths."
            }
          },
          {
            "cells": [
              "i=0",
              "r→e→d*",
              "ok[3]=true"
            ],
            "note": {
              "zh": "从起点走到 red 词尾，标记边界 3。",
              "en": "Walking red from zero marks boundary three."
            }
          },
          {
            "cells": [
              "i=3",
              "b→l→u→e*",
              "ok[7]=true"
            ],
            "note": {
              "zh": "从位置 3 沿 blue 路径扩展。",
              "en": "At position three follow the blue path."
            }
          },
          {
            "cells": [
              "i=7",
              "r→e→d*",
              "ok[10]=true"
            ],
            "note": {
              "zh": "再次走 red 路径，终点可达。",
              "en": "Following red again reaches the final boundary."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/word-break/description/"
      }
    ],
    "slug": "word-break",
    "title": {
      "zh": "单词拆分",
      "en": "Word Break"
    },
    "category": {
      "zh": "动态规划",
      "en": "Dynamic Programming"
    },
    "level": {
      "zh": "中等",
      "en": "Medium"
    }
  },
  {
    "id": 300,
    "statement": {
      "zh": "从 nums 删除任意多个元素但不改变保留元素的先后次序，使剩下的序列严格递增，求最多能保留多少个。元素不必相邻，相等的值不能连续计入递增长度。",
      "en": "Find the largest number of elements that can be retained from nums in their original order so that each retained value is strictly larger than the previous one. Retained positions need not be adjacent, and equal values do not extend the sequence."
    },
    "constraints": {
      "zh": [
        "1 ≤ nums.length ≤ 2500",
        "−10⁴ ≤ nums[i] ≤ 10⁴"
      ],
      "en": [
        "1 ≤ nums.length ≤ 2500",
        "−10⁴ ≤ nums[i] ≤ 10⁴"
      ]
    },
    "example": {
      "zh": "nums=[4,2,5,3,6] → 3；例如 [2,3,6]。",
      "en": "nums=[4,2,5,3,6] → 3, for example [2,3,6]."
    },
    "methods": [
      {
        "key": "end-dp",
        "name": {
          "zh": "以当前位置结尾的 DP",
          "en": "DP by ending position"
        },
        "intuition": {
          "zh": "只记录前缀的最长长度不够，因为结尾较小的短序列可能更容易延长。改为 dp[i] 表示必须以 nums[i] 结尾的最优长度。它可以独立成长度 1，也可以接在任一更早且数值更小的结尾之后；求所有前驱的最大值再加一。",
          "en": "A single best length per prefix loses information: a shorter sequence with a smaller ending value may extend more easily. Instead, dp[i] is the optimum that must end at nums[i]. This value is either a singleton or extends an earlier sequence whose final value is strictly smaller."
        },
        "steps": {
          "zh": [
            "所有 dp[i] 初值为 1，表示只选自身。",
            "按 i 从左到右扫描，枚举 j<i。",
            "只有 nums[j]<nums[i] 才用 dp[j]+1 更新 dp[i]。",
            "答案取整个 dp 的最大值，而非最后一格。"
          ],
          "en": [
            "Initialize every dp[i] to one for the singleton sequence.",
            "Scan i left to right and inspect every j<i.",
            "Only when nums[j]<nums[i], consider dp[j]+1.",
            "Return the maximum over all endings, not just the last entry."
          ]
        },
        "correctness": {
          "zh": "最优序列若长度大于 1，倒数第二个元素必在合法前驱里。替换为该前驱的最优序列后仍可接当前元素，故转移穷尽且最优。",
          "en": "Any nonsingleton optimum has a penultimate element among the eligible predecessors. Replacing its prefix with the best sequence ending there preserves extendability, making the recurrence exhaustive and optimal."
        },
        "time": "O(n²)",
        "space": "O(n)",
        "complexity": {
          "zh": "第 i 个位置检查 i 个前驱，总和为 n(n−1)/2；dp 占 n 项，返回长度不重建序列。",
          "en": "Position i checks i predecessors, totaling n(n−1)/2 checks. The dp array holds n values; only a length is returned."
        },
        "python": "from typing import List\nclass Solution:\n    def lengthOfLIS(self, nums: List[int]) -> int:\n        dp = [1] * len(nums)\n        for i in range(len(nums)):\n            for j in range(i):\n                if nums[j] < nums[i]: dp[i] = max(dp[i], dp[j]+1)\n        return max(dp)\n",
        "java": "import java.util.*;\nclass Solution {\n    public int lengthOfLIS(int[] nums) {\n        int[] dp=new int[nums.length];Arrays.fill(dp,1);int ans=1;\n        for(int i=0;i<nums.length;i++) {\n            for(int j=0;j<i;j++) if(nums[j]<nums[i]) dp[i]=Math.max(dp[i],dp[j]+1);\n            ans=Math.max(ans,dp[i]);\n        }\n        return ans;\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "nums=4,2,5,3,6",
              "dp=1,1,1,1,1"
            ],
            "note": {
              "zh": "每个位置都能单独形成长度 1。",
              "en": "Every position supports a singleton."
            }
          },
          {
            "cells": [
              "i=2,x=5",
              "dp[2]=2"
            ],
            "note": {
              "zh": "5 能接在 4 或 2 后面。",
              "en": "5 can follow either 4 or 2."
            }
          },
          {
            "cells": [
              "i=3,x=3",
              "dp[3]=2"
            ],
            "note": {
              "zh": "3 只能接较早的 2，不能接 5。",
              "en": "3 can follow the earlier 2, but not 5."
            }
          },
          {
            "cells": [
              "i=4,x=6",
              "dp=1,1,2,2,3"
            ],
            "note": {
              "zh": "6 延长长度 2 的前驱，最长为 3。",
              "en": "6 extends a length-two predecessor; the maximum is three."
            }
          }
        ]
      },
      {
        "key": "tails",
        "name": {
          "zh": "最小结尾与二分",
          "en": "Minimal tails with binary search"
        },
        "intuition": {
          "zh": "同样长的递增序列，结尾越小越有利于未来扩展。tails[k] 保存目前长度 k+1 的递增序列能取得的最小结尾。来一个 x，找到第一个 ≥x 的结尾，用 x 替换；若不存在则追加。替换不是修改真实子序列，而是改善该长度的代表状态，因此 tails 的内容未必就是原数组的一条子序列。",
          "en": "For equal lengths, a smaller ending value is never worse for future extension. tails[k] stores the smallest ending value achievable by a subsequence of length k+1. Replace the first entry at least x with x, or append if none exists. This changes a representative state, not a reconstructed subsequence; tails itself need not be a subsequence of the input."
        },
        "steps": {
          "zh": [
            "初始 tails 为空。",
            "对每个 x 二分寻找第一个 tails[p]≥x 的位置。",
            "p 等于当前长度时追加；否则仅替换 tails[p]。",
            "最终 tails 长度即答案，相等值替换而非追加保证严格递增。"
          ],
          "en": [
            "Start with an empty tails structure.",
            "For each x, binary-search the first tails[p]≥x.",
            "Append when p equals the current size; otherwise replace that entry.",
            "Return the size; equal values replace rather than append, enforcing strict increase."
          ]
        },
        "correctness": {
          "zh": "位置 p 前的最小结尾小于 x，因此存在长度 p 的序列可接上 x。长度 p+1 的结尾被改小不会失去任何未来扩展机会，且不能凭此创建更长序列，归纳维持每种长度的最小结尾。",
          "en": "The tail before p is smaller than x, so a length-p sequence can extend with x. Lowering the tail for length p+1 preserves all possible future extensions and creates no unsupported longer length. Induction maintains the minimal-tail invariant."
        },
        "time": "O(n log n)",
        "space": "O(n)",
        "complexity": {
          "zh": "每个元素进行一次 O(log n) 二分；tails 最长 n，Python append 摊还 O(1)，不做中间插入。",
          "en": "Each value performs one O(log n) binary search. tails has at most n elements; Python append is amortized O(1), and replacement never shifts a suffix."
        },
        "python": "from typing import List\nfrom bisect import bisect_left\nclass Solution:\n    def lengthOfLIS(self, nums: List[int]) -> int:\n        tails = []\n        for x in nums:\n            p = bisect_left(tails, x)\n            if p == len(tails): tails.append(x)\n            else: tails[p] = x\n        return len(tails)\n",
        "java": "class Solution {\n    public int lengthOfLIS(int[] nums) {\n        int[] tails=new int[nums.length];int size=0;\n        for(int x:nums) {\n            int lo=0,hi=size;\n            while(lo<hi) {int mid=(lo+hi)>>>1;if(tails[mid]<x) lo=mid+1;else hi=mid;}\n            tails[lo]=x;if(lo==size) size++;\n        }\n        return size;\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "x=4 → [4]",
              "x=2 → [2]"
            ],
            "note": {
              "zh": "相同长度用更小结尾替代。",
              "en": "Replace the tail of the same length with a smaller value."
            }
          },
          {
            "cells": [
              "x=5 → [2,5]"
            ],
            "note": {
              "zh": "5 大于所有结尾，新增长度 2。",
              "en": "5 exceeds every tail and creates length two."
            }
          },
          {
            "cells": [
              "x=3 → [2,3]"
            ],
            "note": {
              "zh": "把长度 2 的结尾从 5 改善为 3。",
              "en": "Improve the length-two tail from 5 to 3."
            }
          },
          {
            "cells": [
              "x=6 → [2,3,6]",
              "answer=3"
            ],
            "note": {
              "zh": "6 新增长度 3。",
              "en": "6 creates length three."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/longest-increasing-subsequence/description/"
      }
    ],
    "slug": "longest-increasing-subsequence",
    "title": {
      "zh": "最长递增子序列",
      "en": "Longest Increasing Subsequence"
    },
    "category": {
      "zh": "动态规划",
      "en": "Dynamic Programming"
    },
    "level": {
      "zh": "中等",
      "en": "Medium"
    }
  },
  {
    "id": 152,
    "statement": {
      "zh": "从非空整数数组 nums 中选择一个非空、连续的区间，返回区间元素乘积的最大值。不能跳过区间中的元素；只取一个元素时乘积就是该元素。",
      "en": "Choose a nonempty contiguous interval of nums and return the largest possible product of its elements. Interior elements cannot be skipped; a one-element interval has that element as its product."
    },
    "constraints": {
      "zh": [
        "1 ≤ nums.length ≤ 2×10⁴",
        "−10 ≤ nums[i] ≤ 10",
        "任意连续子数组的乘积均可用 32 位有符号整数表示。"
      ],
      "en": [
        "1 ≤ nums.length ≤ 2×10⁴",
        "−10 ≤ nums[i] ≤ 10",
        "Every contiguous subarray product fits a signed 32-bit integer."
      ]
    },
    "example": {
      "zh": "nums=[−2,3,−4,0,2] → 24；前三项的乘积为 24。",
      "en": "nums=[−2,3,−4,0,2] → 24, the product of the first three entries."
    },
    "methods": [
      {
        "key": "extrema-arrays",
        "name": {
          "zh": "同时记录最大和最小结尾乘积",
          "en": "DP arrays for maximum and minimum ending products"
        },
        "intuition": {
          "zh": "负数会让最大变最小、最小变最大，只有最大状态不足以处理第二个负数。hi[i] 和 lo[i] 分别是必须在 i 结束的最大、最小乘积。候选只有三类：从 x 自己开始；把旧最大乘 x；把旧最小乘 x。0 会自然把两个状态归零，下一项可以重新开始，不必专门切数组。",
          "en": "A negative multiplier reverses order, so retaining only the largest product loses the value that may become largest after another negative. hi[i] and lo[i] track the extrema of nonempty intervals ending at i. Candidates are x alone, the previous maximum times x, and the previous minimum times x. Zero naturally resets the products, and a later value can start anew."
        },
        "steps": {
          "zh": [
            "首元素同时初始化 hi、lo 与答案，避免把空子数组 0 当候选。",
            "对每个后续 x 从上一位置的两个状态计算三个候选。",
            "分别取最大、最小，更新全局答案。",
            "结果来自所有结束位置的 hi 最大值。"
          ],
          "en": [
            "Initialize hi, lo, and the answer with the first value, excluding empty intervals.",
            "For each later x, form the three candidates from the previous states.",
            "Store both extrema and update the global answer.",
            "Return the largest hi across all ending positions."
          ]
        },
        "correctness": {
          "zh": "任何在 i 结束的区间，要么只有 x，要么把以 i−1 结束的某区间乘 x。乘以固定数的极值必由旧极值产生，因此三候选完整。",
          "en": "Every interval ending at i is either the singleton x or an interval ending at i−1 extended by x. Multiplying by a fixed number reaches its extrema at previous extrema, so the three candidates suffice."
        },
        "time": "O(n)",
        "space": "O(n)",
        "complexity": {
          "zh": "每个位置常数次乘法和比较，两条长度 n 的数组保存状态；题设保证乘积不溢出 32 位。",
          "en": "Constant work is done at each position. Two length-n arrays retain states, and the problem guarantees products fit 32 bits."
        },
        "python": "from typing import List\nclass Solution:\n    def maxProduct(self, nums: List[int]) -> int:\n        hi = [0]*len(nums); lo = [0]*len(nums)\n        hi[0] = lo[0] = ans = nums[0]\n        for i in range(1, len(nums)):\n            x = nums[i]; a = hi[i-1]*x; b = lo[i-1]*x\n            hi[i] = max(x,a,b); lo[i] = min(x,a,b)\n            ans = max(ans,hi[i])\n        return ans\n",
        "java": "class Solution {\n    public int maxProduct(int[] nums) {\n        int[] hi=new int[nums.length],lo=new int[nums.length];\n        int ans=nums[0];hi[0]=lo[0]=ans;\n        for(int i=1;i<nums.length;i++) {\n            int x=nums[i],a=hi[i-1]*x,b=lo[i-1]*x;\n            hi[i]=Math.max(x,Math.max(a,b));lo[i]=Math.min(x,Math.min(a,b));\n            ans=Math.max(ans,hi[i]);\n        }\n        return ans;\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "x=-2",
              "hi=-2",
              "lo=-2",
              "ans=-2"
            ],
            "note": {
              "zh": "非空区间从第一项初始化。",
              "en": "Initialize from the first value to enforce a nonempty interval."
            }
          },
          {
            "cells": [
              "x=3",
              "candidates=3,-6,-6",
              "hi=3",
              "lo=-6"
            ],
            "note": {
              "zh": "负乘积也要保存，可能被下一个负数翻转。",
              "en": "Keep the negative product, which another negative may reverse."
            }
          },
          {
            "cells": [
              "x=-4",
              "candidates=-4,-12,24",
              "hi=24",
              "lo=-12"
            ],
            "note": {
              "zh": "旧最小值 −6 乘 −4 成为新最大 24。",
              "en": "The old minimum −6 times −4 becomes the new maximum 24."
            }
          },
          {
            "cells": [
              "x=0 → hi=lo=0",
              "x=2 → hi=2,lo=0",
              "ans=24"
            ],
            "note": {
              "zh": "零重置当前区间，但全局答案保留 24。",
              "en": "Zero resets ending products while the global best remains 24."
            }
          }
        ]
      },
      {
        "key": "rolling-extrema",
        "name": {
          "zh": "滚动压缩两个极值",
          "en": "Rolling extrema"
        },
        "intuition": {
          "zh": "上面的转移只依赖紧邻上一位置，不需要保留整条数组。用两个变量 hi、lo 保存旧极值，先算 a=hi*x、b=lo*x，再同时更新两个状态。若先覆盖 hi 再拿新 hi 算 lo，会把不同位置混在一起，这正是压缩 DP 最容易出错的地方。",
          "en": "Only the immediately preceding pair of extrema is needed. Keep hi and lo in scalar variables and compute a=hi*x and b=lo*x before overwriting either state. Updating hi and then using that new value to compute lo would mix different positions, a common rolling-DP error."
        },
        "steps": {
          "zh": [
            "hi=lo=ans=nums[0]。",
            "逐个读后续值，先用旧 hi、lo 算乘积 a、b。",
            "令 hi=max(x,a,b)，lo=min(x,a,b)。",
            "用 hi 更新 ans；所有循环结束返回 ans。"
          ],
          "en": [
            "Set hi=lo=ans=nums[0].",
            "For each later value, calculate a and b from the old extrema first.",
            "Set hi=max(x,a,b) and lo=min(x,a,b).",
            "Update ans with hi and return ans after the scan."
          ]
        },
        "correctness": {
          "zh": "循环前的 hi、lo 始终等于二维状态在上一位置的值；保存两个乘积后再覆盖，转移完全等价于数组版，所以压缩不改变结果。",
          "en": "Before each iteration, hi and lo equal the full DP values at the previous position. Capturing both products before overwriting implements exactly the same recurrence, so compression preserves the result."
        },
        "time": "O(n)",
        "space": "O(1)",
        "complexity": {
          "zh": "一次线性扫描，仅保存固定数量的整数。Python 使用下标循环而非 nums[1:]，避免隐藏的 O(n) 切片复制。",
          "en": "A linear scan stores only a fixed number of integers. Python indexes the original list rather than slicing nums[1:], avoiding a hidden O(n) copy."
        },
        "python": "from typing import List\nclass Solution:\n    def maxProduct(self, nums: List[int]) -> int:\n        hi = lo = ans = nums[0]\n        for i in range(1,len(nums)):\n            x = nums[i]; a = hi*x; b = lo*x\n            hi = max(x,a,b); lo = min(x,a,b)\n            ans = max(ans,hi)\n        return ans\n",
        "java": "class Solution {\n    public int maxProduct(int[] nums) {\n        int hi=nums[0],lo=hi,ans=hi;\n        for(int i=1;i<nums.length;i++) {\n            int x=nums[i],a=hi*x,b=lo*x;\n            hi=Math.max(x,Math.max(a,b));lo=Math.min(x,Math.min(a,b));\n            ans=Math.max(ans,hi);\n        }\n        return ans;\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "x=-2",
              "hi=-2",
              "lo=-2",
              "ans=-2"
            ],
            "note": {
              "zh": "非空区间从第一项初始化。",
              "en": "Initialize from the first value to enforce a nonempty interval."
            }
          },
          {
            "cells": [
              "x=3",
              "candidates=3,-6,-6",
              "hi=3",
              "lo=-6"
            ],
            "note": {
              "zh": "负乘积也要保存，可能被下一个负数翻转。",
              "en": "Keep the negative product, which another negative may reverse."
            }
          },
          {
            "cells": [
              "x=-4",
              "candidates=-4,-12,24",
              "hi=24",
              "lo=-12"
            ],
            "note": {
              "zh": "旧最小值 −6 乘 −4 成为新最大 24。",
              "en": "The old minimum −6 times −4 becomes the new maximum 24."
            }
          },
          {
            "cells": [
              "x=0 → hi=lo=0",
              "x=2 → hi=2,lo=0",
              "ans=24"
            ],
            "note": {
              "zh": "零重置当前区间，但全局答案保留 24。",
              "en": "Zero resets ending products while the global best remains 24."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/maximum-product-subarray/description/"
      }
    ],
    "slug": "maximum-product-subarray",
    "title": {
      "zh": "乘积最大子数组",
      "en": "Maximum Product Subarray"
    },
    "category": {
      "zh": "动态规划",
      "en": "Dynamic Programming"
    },
    "level": {
      "zh": "中等",
      "en": "Medium"
    }
  },
  {
    "id": 416,
    "statement": {
      "zh": "判断能否把正整数数组的所有元素分成两组，使两组元素和相同。每个数组位置只能归入其中一组；相同数值的不同位置仍是不同元素。只返回是否可行，不返回分组。",
      "en": "Determine whether all entries of a positive-integer array can be assigned to two groups with equal sums. Each position belongs to exactly one group, and equal values at different positions are separate items. Return feasibility, not the groups."
    },
    "constraints": {
      "zh": [
        "1 ≤ nums.length ≤ 200",
        "1 ≤ nums[i] ≤ 100"
      ],
      "en": [
        "1 ≤ nums.length ≤ 200",
        "1 ≤ nums[i] ≤ 100"
      ]
    },
    "example": {
      "zh": "nums=[2,3,4,5] → true；2+5=3+4=7。",
      "en": "nums=[2,3,4,5] → true because 2+5=3+4=7."
    },
    "methods": [
      {
        "key": "table-knapsack",
        "name": {
          "zh": "二维 0/1 背包",
          "en": "Two-dimensional 0/1 knapsack"
        },
        "intuition": {
          "zh": "两组相等就意味着每组和为总和的一半；总和为奇数直接不可能。问题转成是否能选出若干位置凑 target。dp[i][s] 表示仅用前 i 个元素能否凑到 s。处理当前 x 时明确分成不选和选两支，且选的前驱必须在上一行，防止一个元素被重复使用。",
          "en": "Equal groups must each total half the array sum, so an odd total is impossible. The remaining question is whether a subset reaches target. dp[i][s] records reachability using only the first i items. Split each decision into skipping or taking the current x; taking must refer to the previous row so one position cannot be reused."
        },
        "steps": {
          "zh": [
            "求总和，奇数返回 false，否则 target=sum/2。",
            "建立 n+1 行，dp[0][0]=true。",
            "dp[i][s]=dp[i−1][s] 或（s≥x 且 dp[i−1][s−x]）。",
            "返回 dp[n][target]；剩余未选元素自动组成另一组。"
          ],
          "en": [
            "Reject odd totals; otherwise set target=sum/2.",
            "Create n+1 rows with dp[0][0]=true.",
            "Use dp[i][s]=dp[i−1][s] OR (s≥x AND dp[i−1][s−x]).",
            "Return dp[n][target]; unchosen items automatically form the other half."
          ]
        },
        "correctness": {
          "zh": "每个子集对当前元素只有选与不选两个互斥情况，前驱只使用前 i−1 个元素，因此覆盖全部合法子集且不重复使用位置。",
          "en": "Every subset either takes or skips the current item. Both predecessors use only earlier items, covering all legal subsets without reusing a position."
        },
        "time": "O(nT)",
        "space": "O(nT)",
        "complexity": {
          "zh": "T=总和/2；nT 个布尔转移，表含 (n+1)(T+1) 项。只返回布尔值，未保存具体子集。",
          "en": "T is half the total. The table performs nT Boolean transitions and stores (n+1)(T+1) entries; no subset reconstruction is retained."
        },
        "python": "from typing import List\nclass Solution:\n    def canPartition(self, nums: List[int]) -> bool:\n        total = sum(nums)\n        if total % 2: return False\n        t = total//2; n = len(nums)\n        dp = [[False]*(t+1) for _ in range(n+1)]; dp[0][0] = True\n        for i,x in enumerate(nums,1):\n            for s in range(t+1):\n                dp[i][s] = dp[i-1][s] or (s>=x and dp[i-1][s-x])\n        return dp[n][t]\n",
        "java": "class Solution {\n    public boolean canPartition(int[] nums) {\n        int sum=0;for(int x:nums) sum+=x;if(sum%2!=0)return false;\n        int t=sum/2;boolean[][] dp=new boolean[nums.length+1][t+1];dp[0][0]=true;\n        for(int i=1;i<=nums.length;i++) for(int s=0;s<=t;s++)\n            dp[i][s]=dp[i-1][s]||(s>=nums[i-1]&&dp[i-1][s-nums[i-1]]);\n        return dp[nums.length][t];\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "nums=2,3,4,5",
              "total=14",
              "T=7",
              "row0={0}"
            ],
            "note": {
              "zh": "总和偶数，转化成找和为 7 的子集。",
              "en": "The even total reduces the task to finding subset sum seven."
            }
          },
          {
            "cells": [
              "row1={0,2}",
              "row2={0,2,3,5}"
            ],
            "note": {
              "zh": "处理 2、3 时，每行只读取上一行。",
              "en": "For 2 and 3, each row reads only the preceding row."
            }
          },
          {
            "cells": [
              "row3={0,2,3,4,5,6,7}",
              "3+4=7"
            ],
            "note": {
              "zh": "加入 4 后 7 可达。",
              "en": "Adding 4 makes seven reachable."
            }
          },
          {
            "cells": [
              "row4 includes 7",
              "2+5=7",
              "answer=true"
            ],
            "note": {
              "zh": "加入 5 也能得到另一种分组。",
              "en": "Adding 5 offers another grouping with the same target."
            }
          }
        ]
      },
      {
        "key": "reverse-knapsack",
        "name": {
          "zh": "倒序容量的一维背包",
          "en": "One-dimensional knapsack with descending sums"
        },
        "intuition": {
          "zh": "只需要上一行，可将二维表折叠成一行。关键不是少开一个数组，而是更新顺序：对当前 x，s 必须从 target 向 x 递减。这样 s−x 尚未在本轮更新，仍代表不含当前元素的上一行。如果正序更新，同一个 x 会通过刚写出的状态被再次使用，变成了无限次选取。",
          "en": "The table can be folded into one row, but update order is essential. For current x, visit s from target down to x. Then s−x has not yet been updated this round and still represents earlier items. Ascending updates would reuse the newly written states and accidentally allow the same item multiple times."
        },
        "steps": {
          "zh": [
            "总和奇数直接拒绝，否则创建 target+1 个布尔状态。",
            "dp[0]=true，表示空集凑出 0。",
            "每个 x 对 s 从 target 倒序到 x，执行 dp[s] |= dp[s−x]。",
            "处理完所有位置后返回 dp[target]。"
          ],
          "en": [
            "Reject an odd total, otherwise allocate target+1 Boolean states.",
            "Set dp[0]=true for the empty subset.",
            "For each x, descend from target to x and set dp[s] |= dp[s−x].",
            "Return dp[target] after processing all positions."
          ]
        },
        "correctness": {
          "zh": "倒序确保读取的较小容量是上一轮状态，不含当前元素。当前 dp[s] 保留不选分支，dp[s−x] 提供选分支，完全等价于二维转移。",
          "en": "Descending order ensures the smaller predecessor still belongs to the previous round. The old dp[s] is the skip branch and dp[s−x] supplies the take branch, exactly reproducing the two-dimensional recurrence."
        },
        "time": "O(nT)",
        "space": "O(T)",
        "complexity": {
          "zh": "每个元素至多更新 T 个容量；仅一条 T+1 状态数组，没有递归栈或输入复制。",
          "en": "Each of n items updates at most T sums. Only T+1 Boolean states are stored, with no recursion or input copy."
        },
        "python": "from typing import List\nclass Solution:\n    def canPartition(self, nums: List[int]) -> bool:\n        total = sum(nums)\n        if total % 2: return False\n        t = total//2; dp = [False]*(t+1); dp[0] = True\n        for x in nums:\n            for s in range(t,x-1,-1): dp[s] = dp[s] or dp[s-x]\n        return dp[t]\n",
        "java": "class Solution {\n    public boolean canPartition(int[] nums) {\n        int sum=0;for(int x:nums)sum+=x;if(sum%2!=0)return false;\n        int t=sum/2;boolean[] dp=new boolean[t+1];dp[0]=true;\n        for(int x:nums)for(int s=t;s>=x;s--)dp[s]=dp[s]||dp[s-x];\n        return dp[t];\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "T=7",
              "reachable={0}"
            ],
            "note": {
              "zh": "一维状态只记录当前可达和。",
              "en": "A single row records currently reachable sums."
            }
          },
          {
            "cells": [
              "x=2 → {0,2}",
              "x=3 → {0,2,3,5}"
            ],
            "note": {
              "zh": "每轮倒序读取，2 或 3 不会被重复使用。",
              "en": "Descending updates prevent reusing 2 or 3 in its own round."
            }
          },
          {
            "cells": [
              "x=4",
              "dp[7] ← old dp[3]",
              "reachable={0,2,3,4,5,6,7}"
            ],
            "note": {
              "zh": "先更新 7，所以读取的 3 仍来自旧轮。",
              "en": "Update seven first, so its predecessor three is still from the old round."
            }
          },
          {
            "cells": [
              "x=5",
              "dp[7]=true",
              "answer=true"
            ],
            "note": {
              "zh": "处理全部位置后目标仍可达。",
              "en": "After all positions the target remains reachable."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/partition-equal-subset-sum/description/"
      }
    ],
    "slug": "partition-equal-subset-sum",
    "title": {
      "zh": "分割等和子集",
      "en": "Partition Equal Subset Sum"
    },
    "category": {
      "zh": "动态规划",
      "en": "Dynamic Programming"
    },
    "level": {
      "zh": "中等",
      "en": "Medium"
    }
  },
  {
    "id": 32,
    "statement": {
      "zh": "在只含左右圆括号的字符串中，找出最长的连续合法括号片段，返回其字符数。合法表示每个左括号都有其后匹配的右括号，且匹配可以正确嵌套。没有合法片段则返回 0。",
      "en": "Return the character length of the longest contiguous substring forming a well-nested, fully matched parentheses sequence. The input contains only round parentheses; return zero when no valid nonempty substring exists."
    },
    "constraints": {
      "zh": [
        "0 ≤ s.length ≤ 3×10⁴",
        "字符仅为 ( 或 )。"
      ],
      "en": [
        "0 ≤ s.length ≤ 3×10⁴",
        "Characters are only ( and )."
      ]
    },
    "example": {
      "zh": "s=\"()(())(\" → 6；前六个字符构成合法片段，末尾左括号没有配对。",
      "en": "s=\"()(())(\" → 6: the first six characters form a valid sequence; the final opening parenthesis is unmatched."
    },
    "methods": [
      {
        "key": "index-stack",
        "name": {
          "zh": "下标栈与失配边界",
          "en": "Index stack with an invalid boundary"
        },
        "intuition": {
          "zh": "栈不仅要知道有没有左括号，还要知道合法片段能从哪里开始。底部保存最近一个无法匹配的右括号下标，初始为 −1；上面保存未匹配的左括号下标。看到右括号弹掉一个位置后，如果还有栈顶，它就是当前合法后缀之前的边界，长度为 i−top；若栈空，当前右括号本身成为新边界。",
          "en": "The stack must record boundaries, not just counts. Its bottom is the latest unmatched closing-parenthesis index, initially −1; entries above it are unmatched opening indices. After popping for a closing parenthesis, a surviving top marks the boundary just before the current valid suffix, whose length is i−top. If nothing remains, this closing parenthesis becomes a new invalid boundary."
        },
        "steps": {
          "zh": [
            "栈放 −1，答案为 0。",
            "左括号下标入栈。",
            "右括号先弹栈；若空则将当前 i 入栈作为分隔点。",
            "否则用 i−栈顶 更新最长长度。"
          ],
          "en": [
            "Initialize the stack with −1 and the answer with zero.",
            "Push indices of opening parentheses.",
            "On a closing parenthesis, pop; if empty, push i as the new separator.",
            "Otherwise update the answer with i minus the remaining top."
          ]
        },
        "correctness": {
          "zh": "未匹配括号无法被合法片段跨越。匹配后栈顶是离当前末尾最近的阻挡位置，所以其后到 i 是最长合法后缀；遍历所有末尾即可得到全局最大。",
          "en": "An unmatched bracket cannot lie inside a valid substring. After matching, the remaining top is the nearest blocking position, so the interval after it through i is the longest valid suffix. Checking every ending position finds the global optimum."
        },
        "time": "O(n)",
        "space": "O(n)",
        "complexity": {
          "zh": "每个下标至多入栈出栈一次。全为左括号时栈长 n+1；没有构造子串。",
          "en": "Each index is pushed and popped at most once. An all-opening string needs n+1 stack entries; no substrings are constructed."
        },
        "python": "class Solution:\n    def longestValidParentheses(self, s: str) -> int:\n        stack = [-1]; ans = 0\n        for i,ch in enumerate(s):\n            if ch == '(': stack.append(i)\n            else:\n                stack.pop()\n                if not stack: stack.append(i)\n                else: ans = max(ans,i-stack[-1])\n        return ans\n",
        "java": "import java.util.*;\nclass Solution {\n    public int longestValidParentheses(String s) {\n        ArrayDeque<Integer> stack=new ArrayDeque<>();stack.push(-1);int ans=0;\n        for(int i=0;i<s.length();i++) {\n            if(s.charAt(i)=='(')stack.push(i);\n            else {stack.pop();if(stack.isEmpty())stack.push(i);else ans=Math.max(ans,i-stack.peek());}\n        }\n        return ans;\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "s=()(())(",
              "stack=[-1]"
            ],
            "note": {
              "zh": "−1 是开头之前的边界。",
              "en": "−1 marks the boundary before the string."
            }
          },
          {
            "cells": [
              "i=1",
              "stack=[-1]",
              "ans=2"
            ],
            "note": {
              "zh": "匹配首个 () 后，长度 1−(−1)=2。",
              "en": "After matching the first pair, the length is 1−(−1)=2."
            }
          },
          {
            "cells": [
              "i=4",
              "stack=[-1,2]",
              "suffix length=2"
            ],
            "note": {
              "zh": "内层括号配对，位置 2 仍是未匹配左括号。",
              "en": "The inner pair matches while opening index two remains unmatched."
            }
          },
          {
            "cells": [
              "i=5 → ans=6",
              "i=6 → stack=[-1,6]",
              "answer=6"
            ],
            "note": {
              "zh": "外层闭合连接前面的 ()，末尾未匹配不影响已有答案。",
              "en": "Closing the outer pair joins the earlier pair; the final unmatched opening does not erase the best."
            }
          }
        ]
      },
      {
        "key": "two-scans",
        "name": {
          "zh": "左右两次计数扫描",
          "en": "Two directional counting scans"
        },
        "intuition": {
          "zh": "从左向右统计当前区间内的左右括号数，相等时形成合法片段；右括号更多时不可能被未来左括号补救，必须重置。但左括号过多的前缀会遮住内部答案，例如 (()。因此再从右往左对称扫描，遇到左括号更多时重置，补上第一遍遗漏的情况。",
          "en": "Scan left to right while counting opening and closing brackets. Equal counts give a valid candidate; excess closing brackets cannot be repaired by later openings, so reset. Excess openings can hide an internal optimum, as in ((). A second scan from right to left resets on excess openings and captures the cases the first direction misses."
        },
        "steps": {
          "zh": [
            "正向扫描：左括号数 left、右括号数 right 初始为 0。",
            "left=right 时以 2×right 更新答案；right>left 时两者清零。",
            "反向扫描并重新计数，相等时更新；left>right 时清零。",
            "返回两遍所得最大值，不复制反转字符串。"
          ],
          "en": [
            "In the forward pass, count opening and closing brackets from zero.",
            "On equality update with 2×right; reset when right>left.",
            "Scan backward with fresh counters, updating on equality and resetting when left>right.",
            "Return the maximum across both passes without creating a reversed string."
          ]
        },
        "correctness": {
          "zh": "正向只在右括号过量时切断，因此计数相等的未切断区间合法；反向对称。最长合法片段若被多余左括号挡住正向识别，反向会去掉该阻挡，反之亦然，两遍覆盖。",
          "en": "A forward segment with no excess closings and equal final counts is valid; the backward condition is symmetric. An optimum hidden by surplus openings in the forward scan is exposed by the reverse scan, and vice versa. Together the passes cover every maximal candidate."
        },
        "time": "O(n)",
        "space": "O(1)",
        "complexity": {
          "zh": "扫描两遍共 2n 次，仅四个计数/下标变量。Python 倒序 range 不产生长度 n 的字符串副本。",
          "en": "The two scans make 2n visits and store only scalar counters. Python uses descending indices, not a reversed string copy."
        },
        "python": "class Solution:\n    def longestValidParentheses(self, s: str) -> int:\n        ans = left = right = 0\n        for ch in s:\n            if ch == '(': left += 1\n            else: right += 1\n            if left == right: ans = max(ans,2*right)\n            elif right > left: left = right = 0\n        left = right = 0\n        for i in range(len(s)-1,-1,-1):\n            if s[i] == '(': left += 1\n            else: right += 1\n            if left == right: ans = max(ans,2*left)\n            elif left > right: left = right = 0\n        return ans\n",
        "java": "class Solution {\n    public int longestValidParentheses(String s) {\n        int ans=0,left=0,right=0;\n        for(int i=0;i<s.length();i++) {\n            if(s.charAt(i)=='(')left++;else right++;\n            if(left==right)ans=Math.max(ans,2*right);else if(right>left)left=right=0;\n        }\n        left=right=0;\n        for(int i=s.length()-1;i>=0;i--) {\n            if(s.charAt(i)=='(')left++;else right++;\n            if(left==right)ans=Math.max(ans,2*left);else if(left>right)left=right=0;\n        }\n        return ans;\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "s=()(())(",
              "forward i=1",
              "left=1,right=1",
              "ans=2"
            ],
            "note": {
              "zh": "第一对括号计数相等。",
              "en": "The first pair balances the counts."
            }
          },
          {
            "cells": [
              "forward i=5",
              "left=3,right=3",
              "ans=6"
            ],
            "note": {
              "zh": "前六个字符左右数相等且未出现右侧过量。",
              "en": "The first six characters balance without an earlier excess of closings."
            }
          },
          {
            "cells": [
              "forward i=6",
              "left=4,right=3",
              "ans=6"
            ],
            "note": {
              "zh": "多余左括号不能扩充合法区间。",
              "en": "The extra opening cannot extend the valid interval."
            }
          },
          {
            "cells": [
              "reverse i=6 → reset",
              "reverse i=0 → left=3,right=3",
              "ans=6"
            ],
            "note": {
              "zh": "反扫先剔除末尾左括号，重新确认长度 6。",
              "en": "The reverse scan discards the trailing opening and confirms length six."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/longest-valid-parentheses/description/"
      }
    ],
    "slug": "longest-valid-parentheses",
    "title": {
      "zh": "最长有效括号",
      "en": "Longest Valid Parentheses"
    },
    "category": {
      "zh": "动态规划",
      "en": "Dynamic Programming"
    },
    "level": {
      "zh": "困难",
      "en": "Hard"
    }
  },
  {
    "id": 62,
    "statement": {
      "zh": "一个 m 行 n 列的无障碍网格，起点在左上格，终点在右下格，每步只能向右或向下一格。返回从起点到终点的不同移动路线数；1×1 网格的空移动路线也算一种。",
      "en": "Count routes from the top-left cell to the bottom-right cell of an obstacle-free m-by-n grid, moving one cell right or down at each step. A 1-by-1 grid has one route requiring no moves."
    },
    "constraints": {
      "zh": [
        "1 ≤ m,n ≤ 100",
        "测试输入保证答案 ≤ 2×10⁹。"
      ],
      "en": [
        "1 ≤ m,n ≤ 100",
        "Inputs guarantee an answer ≤ 2×10⁹."
      ]
    },
    "example": {
      "zh": "m=3,n=4 → 10；每条路线含 2 次向下和 3 次向右。",
      "en": "m=3,n=4 → 10; every route contains two downward and three rightward moves."
    },
    "methods": [
      {
        "key": "grid-dp",
        "name": {
          "zh": "网格路径计数 DP",
          "en": "Grid path-count DP"
        },
        "intuition": {
          "zh": "抵达某格的最后一步只可能来自上格或左格，两类路线最后一步不同，不会重复。把它们的路线数相加即可。第一行只能一直向右，第一列只能一直向下，路径数均为 1；这也解释了为什么边界不是初始化为 0。",
          "en": "The final move into a cell comes either from above or from the left. These route sets are disjoint because their final moves differ, so their counts add. The first row has only rightward routes and the first column only downward routes, giving count one on both boundaries."
        },
        "steps": {
          "zh": [
            "创建 m×n 的表并把全部项初始化为 1。",
            "从第二行第二列起，dp[r][c]=dp[r−1][c]+dp[r][c−1]。",
            "按行扫描保证上格与左格已完成。",
            "返回右下角的计数。"
          ],
          "en": [
            "Allocate an m-by-n table initialized to one.",
            "Starting at row and column one, set dp[r][c]=dp[r−1][c]+dp[r][c−1].",
            "Row-major order ensures both predecessors are ready.",
            "Return the bottom-right count."
          ]
        },
        "correctness": {
          "zh": "路线按最后一步分成上方、左方两类，不重不漏；边界唯一，按行归纳得到每格正确计数。",
          "en": "Partitioning routes by their final move is exhaustive and disjoint. Unique boundary routes establish the base case; row-wise induction gives every count."
        },
        "time": "O(mn)",
        "space": "O(mn)",
        "complexity": {
          "zh": "每格至多一次加法，二维表 mn 项；题设答案上界也限制中间格的计数。",
          "en": "At most one addition is performed per cell, and the table holds mn entries. The answer bound also bounds intermediate cell counts."
        },
        "python": "class Solution:\n    def uniquePaths(self, m: int, n: int) -> int:\n        dp = [[1]*n for _ in range(m)]\n        for r in range(1,m):\n            for c in range(1,n): dp[r][c] = dp[r-1][c]+dp[r][c-1]\n        return dp[-1][-1]\n",
        "java": "import java.util.*;\nclass Solution {\n    public int uniquePaths(int m,int n) {\n        int[][] dp=new int[m][n];for(int[] row:dp)Arrays.fill(row,1);\n        for(int r=1;r<m;r++)for(int c=1;c<n;c++)dp[r][c]=dp[r-1][c]+dp[r][c-1];\n        return dp[m-1][n-1];\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "m=3,n=4",
              "row0=1,1,1,1"
            ],
            "note": {
              "zh": "首行只有一直向右的一种走法。",
              "en": "The first row has only the all-right route."
            }
          },
          {
            "cells": [
              "row1=1,2,3,4"
            ],
            "note": {
              "zh": "每格把上方与左方路径数相加。",
              "en": "Each cell adds upper and left counts."
            }
          },
          {
            "cells": [
              "row2=1,3,6,10",
              "answer=10"
            ],
            "note": {
              "zh": "右下格为 4+6=10。",
              "en": "The destination count is 4+6=10."
            }
          }
        ]
      },
      {
        "key": "rolling-row",
        "name": {
          "zh": "滚动一行计数",
          "en": "Rolling-row path counts"
        },
        "intuition": {
          "zh": "一格只依赖上方旧行和左侧当前行，因此一条数组就能同时承载两种角色。更新 dp[c] 前，它还是上格；dp[c−1] 已更新，是当前行左格。必须从左向右更新。网格横竖对称，可让较短维度作为数组长度来进一步节省空间。",
          "en": "One array can hold both the previous row and the current row. Before updating dp[c], it is the count above; dp[c−1] already holds the current row’s left count. Thus updates must go left to right. Grid symmetry lets the shorter dimension be the array width."
        },
        "steps": {
          "zh": [
            "令 width=min(m,n)，height=max(m,n)。",
            "一维 dp 全置 1，代表首行。",
            "其余行从 c=1 递增更新 dp[c]+=dp[c−1]，首列保持 1。",
            "末项就是终点路线数。"
          ],
          "en": [
            "Use width=min(m,n) and height=max(m,n).",
            "Initialize one row of counts to one.",
            "For each later row, update dp[c]+=dp[c−1] left to right from c=1.",
            "The last entry is the destination count."
          ]
        },
        "correctness": {
          "zh": "更新时旧 dp[c] 与新 dp[c−1] 恰好是二维转移要求的上方和左方，故每轮完成后整行与二维表对应行相同。",
          "en": "At every update, the old dp[c] and new dp[c−1] are exactly the upper and left predecessors. Each completed row therefore matches the full table."
        },
        "time": "O(mn)",
        "space": "O(min(m,n))",
        "complexity": {
          "zh": "仍访问全部网格状态，但仅保存较短维度的一行；无递归或路径列表输出。",
          "en": "All grid states are still visited, but only one row of the shorter dimension is stored; no recursion or route list is produced."
        },
        "python": "class Solution:\n    def uniquePaths(self, m: int, n: int) -> int:\n        width,height = min(m,n),max(m,n)\n        dp = [1]*width\n        for _ in range(1,height):\n            for c in range(1,width): dp[c] += dp[c-1]\n        return dp[-1]\n",
        "java": "import java.util.*;\nclass Solution {\n    public int uniquePaths(int m,int n) {\n        int width=Math.min(m,n),height=Math.max(m,n);\n        int[] dp=new int[width];Arrays.fill(dp,1);\n        for(int r=1;r<height;r++)for(int c=1;c<width;c++)dp[c]+=dp[c-1];\n        return dp[width-1];\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "width=3,height=4",
              "dp=1,1,1"
            ],
            "note": {
              "zh": "交换维度利用对称性，数组长度取 3。",
              "en": "Use grid symmetry to store the shorter width of three."
            }
          },
          {
            "cells": [
              "r=1 → [1,2,3]",
              "r=2 → [1,3,6]"
            ],
            "note": {
              "zh": "每格旧值是上方，新左值是当前行。",
              "en": "Each old entry is above; the updated left entry belongs to the current row."
            }
          },
          {
            "cells": [
              "r=3 → [1,4,10]",
              "answer=10"
            ],
            "note": {
              "zh": "最后一项得到同样的十条路线。",
              "en": "The last entry gives the same ten routes."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/unique-paths/description/"
      }
    ],
    "slug": "unique-paths",
    "title": {
      "zh": "不同路径",
      "en": "Unique Paths"
    },
    "category": {
      "zh": "多维动态规划",
      "en": "Multidimensional DP"
    },
    "level": {
      "zh": "中等",
      "en": "Medium"
    }
  },
  {
    "id": 64,
    "statement": {
      "zh": "在非负整数矩形网格中，从左上格走到右下格，每步只能向右或向下。路线代价是经过的所有格子数值之和，包含起点与终点；求最小代价。",
      "en": "Find the smallest sum along a route from the top-left cell to the bottom-right cell of a rectangular nonnegative grid. Moves go only right or down, and the sum includes both endpoint cells."
    },
    "constraints": {
      "zh": [
        "1 ≤ 行数,列数 ≤ 200",
        "每行长度一致。",
        "0 ≤ grid[r][c] ≤ 200"
      ],
      "en": [
        "1 ≤ row count,column count ≤ 200",
        "All rows have the same length.",
        "0 ≤ grid[r][c] ≤ 200"
      ]
    },
    "example": {
      "zh": "grid=[[2,1,4],[3,2,1]] → 6；路线 2→1→2→1。",
      "en": "grid=[[2,1,4],[3,2,1]] → 6 via 2→1→2→1."
    },
    "methods": [
      {
        "key": "grid-cost",
        "name": {
          "zh": "二维最小路径 DP",
          "en": "Two-dimensional minimum-cost DP"
        },
        "intuition": {
          "zh": "计数题对前驱求和，这里优化代价，所以应取两个前驱中的较小值，再加当前格。dp[r][c] 含当前格的代价，不能重复加前驱格。首行首列只有一个前驱，要单独处理；给不存在的方向设无穷也能统一表达。",
          "en": "Unlike path counting, this problem minimizes cost: take the cheaper predecessor and add the current cell. dp[r][c] already includes that cell, so predecessor cells must not be added again. Boundary cells have only one predecessor; infinity can represent the missing direction."
        },
        "steps": {
          "zh": [
            "先设起点 dp[0][0]=grid[0][0]。",
            "按行扫描其他格，读取合法的上方、左方；不存在设为无穷。",
            "当前值=grid[r][c]+min(上方,左方)。",
            "返回 dp[m−1][n−1]，原网格不修改。"
          ],
          "en": [
            "Initialize dp[0][0] with the starting cell value.",
            "Scan other cells row-wise, reading upper and left costs; treat missing predecessors as infinity.",
            "Set the current cost to grid[r][c]+min(upper,left).",
            "Return the destination cost without modifying grid."
          ]
        },
        "correctness": {
          "zh": "任一到达当前格的路线必由上方或左方进入；若前缀非最优，可替换成更便宜前缀而不改变最后一步。因此取最小前驱得到最优路线。",
          "en": "Every route enters from above or left. A nonoptimal prefix can be replaced by a cheaper one without changing the final move, so the cheaper optimal predecessor yields an optimal route."
        },
        "time": "O(mn)",
        "space": "O(mn)",
        "complexity": {
          "zh": "mn 个状态各作常数次比较和加法，独立二维表占 mn 项，输入不复制到另一网格。",
          "en": "Each of mn states does constant work. A separate table stores mn costs, without modifying the input."
        },
        "python": "from typing import List\nclass Solution:\n    def minPathSum(self, grid: List[List[int]]) -> int:\n        m,n = len(grid),len(grid[0]); dp = [[0]*n for _ in range(m)]\n        for r in range(m):\n            for c in range(n):\n                if r==0 and c==0: dp[r][c]=grid[r][c]; continue\n                up=dp[r-1][c] if r else float('inf')\n                left=dp[r][c-1] if c else float('inf')\n                dp[r][c]=grid[r][c]+min(up,left)\n        return dp[-1][-1]\n",
        "java": "class Solution {\n    public int minPathSum(int[][] grid) {\n        int m=grid.length,n=grid[0].length;int[][] dp=new int[m][n];\n        for(int r=0;r<m;r++)for(int c=0;c<n;c++) {\n            if(r==0&&c==0){dp[r][c]=grid[r][c];continue;}\n            int up=r>0?dp[r-1][c]:Integer.MAX_VALUE;\n            int left=c>0?dp[r][c-1]:Integer.MAX_VALUE;\n            dp[r][c]=grid[r][c]+Math.min(up,left);\n        }\n        return dp[m-1][n-1];\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "grid row0=2,1,4",
              "cost row0=2,3,7"
            ],
            "note": {
              "zh": "首行只能右行，逐项累加。",
              "en": "Only rightward moves are possible in the first row."
            }
          },
          {
            "cells": [
              "grid row1=3,2,1",
              "cost[1][0]=5"
            ],
            "note": {
              "zh": "第一列只能从上方 2 进入，得到 5。",
              "en": "The first column comes from upper cost two, giving five."
            }
          },
          {
            "cells": [
              "cost[1][1]=2+min(3,5)=5"
            ],
            "note": {
              "zh": "中间格比较上方与左方。",
              "en": "The middle cell compares upper and left costs."
            }
          },
          {
            "cells": [
              "cost[1][2]=1+min(7,5)=6",
              "answer=6"
            ],
            "note": {
              "zh": "最后一步从左进入更便宜。",
              "en": "Entering the final cell from the left is cheaper."
            }
          }
        ]
      },
      {
        "key": "rolling-cost",
        "name": {
          "zh": "滚动一行且保留原网格",
          "en": "Rolling costs without mutating the grid"
        },
        "intuition": {
          "zh": "上方是 dp[c] 的旧值，左方是 dp[c−1] 的新值，因此和路径计数一样可以压缩到一行。初始化全为无穷，仅把 dp[0] 设为 0，第一次处理起点时加上它的值。后续第一列只能沿上方走，其余格比较上方与左方。",
          "en": "The old dp[c] is the cost above, while the new dp[c−1] is the cost on the left, permitting one-row compression. Initialize entries to infinity except dp[0]=0 so the first update adds the starting cell. Later first-column cells inherit only from above, and interior cells compare both directions."
        },
        "steps": {
          "zh": [
            "dp 长度为列数，初始无穷，dp[0]=0。",
            "每行从左到右处理。",
            "先取旧 dp[c]，若 c>0 再与新 dp[c−1] 取小。",
            "加上当前格并写回 dp[c]；最终返回末项。"
          ],
          "en": [
            "Allocate one row initialized to infinity and set dp[0]=0.",
            "Process every row from left to right.",
            "Start from old dp[c]; when c>0, compare it with new dp[c−1].",
            "Add the current cell, write back, and return the last entry after all rows."
          ]
        },
        "correctness": {
          "zh": "旧值和新值分别对应二维表的两个合法前驱，首次起点的虚拟零代价给出正确初值。后续更新与二维递推完全一致。",
          "en": "Old and new entries correspond to the two predecessors in the full table. The initial virtual zero cost correctly initializes the start; all later updates implement the same recurrence."
        },
        "time": "O(mn)",
        "space": "O(n)",
        "complexity": {
          "zh": "m 行 n 列，每格一次更新；仅 n 个成本状态。不修改输入，也不存路径，辅助空间并非 O(1)。",
          "en": "For m rows and n columns, each cell is updated once. Only n costs are stored. Input is preserved and no route is reconstructed; auxiliary space is O(n), not O(1)."
        },
        "python": "from typing import List\nclass Solution:\n    def minPathSum(self, grid: List[List[int]]) -> int:\n        n=len(grid[0]);dp=[float('inf')]*n;dp[0]=0\n        for row in grid:\n            for c in range(n):\n                best=dp[c]\n                if c: best=min(best,dp[c-1])\n                dp[c]=best+row[c]\n        return dp[-1]\n",
        "java": "import java.util.*;\nclass Solution {\n    public int minPathSum(int[][] grid) {\n        int n=grid[0].length;int[] dp=new int[n];Arrays.fill(dp,Integer.MAX_VALUE);dp[0]=0;\n        for(int[] row:grid)for(int c=0;c<n;c++) {\n            int best=dp[c];if(c>0)best=Math.min(best,dp[c-1]);\n            dp[c]=best+row[c];\n        }\n        return dp[n-1];\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "grid row0=2,1,4",
              "cost row0=2,3,7"
            ],
            "note": {
              "zh": "首行只能右行，逐项累加。",
              "en": "Only rightward moves are possible in the first row."
            }
          },
          {
            "cells": [
              "grid row1=3,2,1",
              "cost[1][0]=5"
            ],
            "note": {
              "zh": "第一列只能从上方 2 进入，得到 5。",
              "en": "The first column comes from upper cost two, giving five."
            }
          },
          {
            "cells": [
              "cost[1][1]=2+min(3,5)=5"
            ],
            "note": {
              "zh": "中间格比较上方与左方。",
              "en": "The middle cell compares upper and left costs."
            }
          },
          {
            "cells": [
              "cost[1][2]=1+min(7,5)=6",
              "answer=6"
            ],
            "note": {
              "zh": "最后一步从左进入更便宜。",
              "en": "Entering the final cell from the left is cheaper."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/minimum-path-sum/description/"
      }
    ],
    "slug": "minimum-path-sum",
    "title": {
      "zh": "最小路径和",
      "en": "Minimum Path Sum"
    },
    "category": {
      "zh": "多维动态规划",
      "en": "Multidimensional DP"
    },
    "level": {
      "zh": "中等",
      "en": "Medium"
    }
  },
  {
    "id": 5,
    "statement": {
      "zh": "在字符串 s 中寻找最长的连续回文片段并返回该片段。回文要求从左向右与从右向左读完全一致，区分大小写；若存在多个最长答案，可返回任意一个。",
      "en": "Return a longest contiguous palindromic substring of s. A palindrome reads identically in both directions with case-sensitive comparison. Any longest answer is acceptable when tied."
    },
    "constraints": {
      "zh": [
        "1 ≤ s.length ≤ 1000",
        "字符为英文字母或数字。"
      ],
      "en": [
        "1 ≤ s.length ≤ 1000",
        "Characters are English letters or digits."
      ]
    },
    "example": {
      "zh": "s=\"zabbay\" → \"abba\"；中心是两个 b 之间，向外匹配 a。",
      "en": "s=\"zabbay\" → \"abba\"; its center lies between the two b characters, with matching a characters outside."
    },
    "methods": [
      {
        "key": "interval-dp",
        "name": {
          "zh": "区间回文动态规划",
          "en": "Interval palindrome DP"
        },
        "intuition": {
          "zh": "长回文去掉两端后仍是回文，因此可以由短区间推长区间。pal[l][r] 为真需要两端相等，且中间区间为回文；长度 1、2 时中间为空或只剩边界，无需再查。按照区间长度从短到长填写就能保证依赖已准备好，只记录最佳区间的下标，最后才切一次字符串。",
          "en": "Removing matching endpoints from a palindrome leaves a palindrome. Thus pal[l][r] requires equal endpoints and a palindromic interior. Length-one and length-two intervals need no interior lookup. Process intervals by increasing length so dependencies are ready, record only the best indices, and copy the answer once at the end."
        },
        "steps": {
          "zh": [
            "布尔表初始 false，最佳长度先设 1。",
            "长度从 1 到 n，枚举合法左端 l 并计算 r。",
            "若端点相等，且长度≤2 或 pal[l+1][r−1] 为真，就标为回文。",
            "更长时更新最佳起点与长度，末尾一次取子串。"
          ],
          "en": [
            "Initialize the Boolean table and a best length of one.",
            "Enumerate lengths from one to n, then each valid left endpoint.",
            "Mark an interval when endpoints match and its length≤2 or its interior is palindromic.",
            "Update the best indices only for a longer result and slice once at the end."
          ]
        },
        "correctness": {
          "zh": "回文与“相等端点加回文内层”互为充要条件；短区间基例正确，按长度归纳可判断所有区间，取最长即答案。",
          "en": "Equal endpoints surrounding a palindromic interior are necessary and sufficient. Correct short-interval base cases and induction on length classify every interval, so the longest marked interval is optimal."
        },
        "time": "O(n²)",
        "space": "O(n²) auxiliary + O(L) output",
        "complexity": {
          "zh": "共有 n(n+1)/2 个区间，转移 O(1)；二维布尔表 O(n²)。最终子串复制 L 个字符占 O(L) 输出，不在循环中反复切片。",
          "en": "There are n(n+1)/2 constant-time transitions and O(n²) table storage. The final substring copies L characters as O(L) output storage; slicing is not repeated inside the loops."
        },
        "python": "class Solution:\n    def longestPalindrome(self, s: str) -> str:\n        n=len(s);pal=[[False]*n for _ in range(n)];start=0;best=1\n        for length in range(1,n+1):\n            for l in range(n-length+1):\n                r=l+length-1\n                if s[l]==s[r] and (length<=2 or pal[l+1][r-1]):\n                    pal[l][r]=True\n                    if length>best: start=l;best=length\n        return s[start:start+best]\n",
        "java": "class Solution {\n    public String longestPalindrome(String s) {\n        int n=s.length(),start=0,best=1;boolean[][] pal=new boolean[n][n];\n        for(int len=1;len<=n;len++)for(int l=0;l+len<=n;l++) {\n            int r=l+len-1;\n            if(s.charAt(l)==s.charAt(r)&&(len<=2||pal[l+1][r-1])) {\n                pal[l][r]=true;if(len>best){start=l;best=len;}\n            }\n        }\n        return s.substring(start,start+best);\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "s=zabbay",
              "pal[i][i]=true"
            ],
            "note": {
              "zh": "所有单字符区间都是回文。",
              "en": "All single-character intervals are palindromes."
            }
          },
          {
            "cells": [
              "length=2",
              "pal[2][3]=true",
              "bb"
            ],
            "note": {
              "zh": "两个 b 相等，找到长度 2。",
              "en": "The matching b characters form a length-two palindrome."
            }
          },
          {
            "cells": [
              "length=4",
              "s[1]=s[4]=a",
              "pal[1][4]=true",
              "abba"
            ],
            "note": {
              "zh": "相等的 a 包住已知回文 bb。",
              "en": "Matching a characters surround the known palindrome bb."
            }
          },
          {
            "cells": [
              "length=6",
              "z ≠ y",
              "answer=abba"
            ],
            "note": {
              "zh": "无法扩展到全串，最长仍为 abba。",
              "en": "The entire string fails at z versus y; abba remains longest."
            }
          }
        ]
      },
      {
        "key": "centers",
        "name": {
          "zh": "奇偶中心向外扩展",
          "en": "Expand around odd and even centers"
        },
        "intuition": {
          "zh": "每个回文都有唯一的几何中心：奇数长度以一个字符为中心，偶数长度以两字符之间为中心。从中心向外比较两端，匹配就继续，不匹配就停止；这样不用保存所有区间真假。必须同时枚举两类中心，否则会漏掉 abba 这种偶数回文。",
          "en": "Every palindrome has a center: a character for odd length or a gap for even length. Starting at each center, expand while the two endpoints match and stop at the first mismatch. This avoids storing all interval states. Both center types are required; considering only characters would miss abba."
        },
        "steps": {
          "zh": [
            "对每个位置分别从 (i,i) 与 (i,i+1) 开始。",
            "两端在界内且相等时，更新最佳区间并向外移一格。",
            "某中心失败就进入下一个中心，不生成中间子串。",
            "所有中心处理完，返回最佳下标对应的子串。"
          ],
          "en": [
            "For each position, start expansions at (i,i) and (i,i+1).",
            "While endpoints are valid and equal, update the best interval and expand outward.",
            "After a mismatch, move to the next center without generating temporary substrings.",
            "Return the substring indexed by the best interval."
          ]
        },
        "correctness": {
          "zh": "任意回文都对应被枚举的奇或偶中心，从该中心扩展会到达它。每次更新时两端相等且内部已匹配，所以只记录真回文，最大长度必被找到。",
          "en": "Every palindrome belongs to one enumerated odd or even center and is reached by expanding from it. Each recorded interval has matching endpoints and an already matched interior, so only real palindromes are considered and the maximum is found."
        },
        "time": "O(n²)",
        "space": "O(1) auxiliary + O(L) output",
        "complexity": {
          "zh": "最多 2n 个中心，每个最坏扩展 O(n)，如全相同字符。只保存下标，无递归；最终长度 L 的返回字符串占输出空间。",
          "en": "At most 2n centers each expand O(n) in the worst case, such as identical characters. Only indices are stored without recursion; the returned length-L string accounts for output space."
        },
        "python": "class Solution:\n    def longestPalindrome(self, s: str) -> str:\n        start=0;best=1;n=len(s)\n        for i in range(n):\n            for offset in (0,1):\n                l,r=i,i+offset\n                while l>=0 and r<n and s[l]==s[r]:\n                    if r-l+1>best: start=l;best=r-l+1\n                    l-=1;r+=1\n        return s[start:start+best]\n",
        "java": "class Solution {\n    public String longestPalindrome(String s) {\n        int start=0,best=1,n=s.length();\n        for(int i=0;i<n;i++)for(int offset=0;offset<=1;offset++) {\n            int l=i,r=i+offset;\n            while(l>=0&&r<n&&s.charAt(l)==s.charAt(r)) {\n                if(r-l+1>best){start=l;best=r-l+1;}l--;r++;\n            }\n        }\n        return s.substring(start,start+best);\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "s=zabbay",
              "center=(2,3)"
            ],
            "note": {
              "zh": "偶数中心落在两个 b 之间。",
              "en": "The even center lies between the two b characters."
            }
          },
          {
            "cells": [
              "l=2,r=3",
              "bb",
              "best=2"
            ],
            "note": {
              "zh": "第一层匹配。",
              "en": "The first layer matches."
            }
          },
          {
            "cells": [
              "l=1,r=4",
              "abba",
              "best=4"
            ],
            "note": {
              "zh": "外层两个 a 也匹配。",
              "en": "The next outer a characters also match."
            }
          },
          {
            "cells": [
              "l=0,r=5",
              "z ≠ y",
              "answer=abba"
            ],
            "note": {
              "zh": "再扩一层失败，所有其他中心都不更长。",
              "en": "The next expansion fails; no other center yields a longer palindrome."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/longest-palindromic-substring/description/"
      }
    ],
    "slug": "longest-palindromic-substring",
    "title": {
      "zh": "最长回文子串",
      "en": "Longest Palindromic Substring"
    },
    "category": {
      "zh": "多维动态规划",
      "en": "Multidimensional DP"
    },
    "level": {
      "zh": "中等",
      "en": "Medium"
    }
  },
  {
    "id": 1143,
    "statement": {
      "zh": "给定两个字符串，求它们最长公共子序列的长度。子序列允许删除字符，但必须保留原有相对顺序，不要求连续；没有共同字符时答案为 0，只返回长度。",
      "en": "Return the length of the longest sequence obtainable from both strings by deleting characters without changing the order of the remaining ones. Positions need not be contiguous. Return zero when there is no common character; the sequence itself is not required."
    },
    "constraints": {
      "zh": [
        "1 ≤ text1.length,text2.length ≤ 1000",
        "两个字符串都只含小写英文字母。"
      ],
      "en": [
        "1 ≤ text1.length,text2.length ≤ 1000",
        "Both strings contain only lowercase English letters."
      ]
    },
    "example": {
      "zh": "text1=\"abdc\", text2=\"ac\" → 2；保留第一个串的 a、c 即可。",
      "en": "text1=\"abdc\", text2=\"ac\" → 2 by keeping a and c from the first string."
    },
    "methods": [
      {
        "key": "prefix-table",
        "name": {
          "zh": "双前缀二维 DP",
          "en": "DP over two prefixes"
        },
        "intuition": {
          "zh": "dp[i][j] 表示两个长度分别为 i、j 的前缀的最长公共子序列。末字符相等时，可以在更短前缀的公共序列后接上这个字符；不等时不可能同时匹配两个末字符，至少丢弃其中一个，因此比较“丢第一串末尾”和“丢第二串末尾”。这里不相等时取最大而非清零，清零是公共子串的思路。",
          "en": "dp[i][j] is the LCS length of prefixes of lengths i and j. Equal final characters extend an optimum of the two shorter prefixes. Unequal final characters cannot both be matched as the final pair, so discard one end or the other and take the larger result. Do not reset to zero on mismatch: that would model a contiguous common substring instead."
        },
        "steps": {
          "zh": [
            "增加空前缀行列并置 0。",
            "i、j 从 1 递增，比较 text1[i−1] 与 text2[j−1]。",
            "相等取左上加 1，不等取上方和左方最大值。",
            "返回 dp[m][n]。"
          ],
          "en": [
            "Add a zero row and column for empty prefixes.",
            "Increase i and j from one, comparing characters at i−1 and j−1.",
            "On equality use diagonal+1; otherwise take max(upper,left).",
            "Return dp[m][n]."
          ]
        },
        "correctness": {
          "zh": "末字符相等时存在包含该匹配的最优解；不等时任何公共序列至少避开一个末字符。对应子问题覆盖所有可能，且构造出的序列都合法。",
          "en": "When final characters match, an optimum can include that matched pair. When they differ, any common sequence avoids at least one end. The resulting subproblems cover all possibilities and generate only valid common sequences."
        },
        "time": "O(mn)",
        "space": "O(mn)",
        "complexity": {
          "zh": "m、n 为两个串长；每对前缀计算一次，表大小 (m+1)(n+1)，不复制子串。",
          "en": "m and n are string lengths. Each prefix pair is evaluated once in a (m+1)(n+1) table, without substring copies."
        },
        "python": "class Solution:\n    def longestCommonSubsequence(self, text1: str, text2: str) -> int:\n        m,n=len(text1),len(text2);dp=[[0]*(n+1) for _ in range(m+1)]\n        for i in range(1,m+1):\n            for j in range(1,n+1):\n                if text1[i-1]==text2[j-1]: dp[i][j]=dp[i-1][j-1]+1\n                else: dp[i][j]=max(dp[i-1][j],dp[i][j-1])\n        return dp[m][n]\n",
        "java": "class Solution {\n    public int longestCommonSubsequence(String a,String b) {\n        int m=a.length(),n=b.length();int[][] dp=new int[m+1][n+1];\n        for(int i=1;i<=m;i++)for(int j=1;j<=n;j++)\n            dp[i][j]=a.charAt(i-1)==b.charAt(j-1)?dp[i-1][j-1]+1:Math.max(dp[i-1][j],dp[i][j-1]);\n        return dp[m][n];\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "text1=abdc",
              "text2=ac",
              "row0=0,0,0"
            ],
            "note": {
              "zh": "空前缀没有公共字符。",
              "en": "Empty prefixes have zero common length."
            }
          },
          {
            "cells": [
              "row(a)=0,1,1"
            ],
            "note": {
              "zh": "a 与 a 匹配，面对 ac 仍只有长度 1。",
              "en": "a matches a; against ac the best length is still one."
            }
          },
          {
            "cells": [
              "row(ab)=0,1,1",
              "row(abd)=0,1,1"
            ],
            "note": {
              "zh": "b、d 不匹配时继承已有长度，不清零。",
              "en": "For b and d, retain existing lengths instead of resetting on mismatch."
            }
          },
          {
            "cells": [
              "row(abdc)=0,1,2",
              "answer=2"
            ],
            "note": {
              "zh": "c 匹配 c，左上 1 加一。",
              "en": "Matching c extends the diagonal length one to two."
            }
          }
        ]
      },
      {
        "key": "rolling-lcs",
        "name": {
          "zh": "一行 DP 与旧对角值",
          "en": "One row plus an old diagonal"
        },
        "intuition": {
          "zh": "一行压缩同时需要上、左、左上三种值。更新前 dp[j] 是旧上方，dp[j−1] 是已更新左方；旧左上已经被覆盖，必须额外用 diagonal 保存。每次先把旧 dp[j] 存成 old，更新当前格后令 diagonal=old，为下一列准备。让较短串作为列可以减少空间。",
          "en": "Compressed LCS needs upper, left, and diagonal predecessors. Before updating, dp[j] is the old upper value and dp[j−1] the new left value. The old diagonal has already been overwritten, so retain it in a scalar. Save old dp[j], compute the new cell, then make the saved value the next diagonal. Use the shorter string for columns."
        },
        "steps": {
          "zh": [
            "必要时交换两串引用，让第二串较短。",
            "一行 dp 初始 0，每个新行 diagonal=0。",
            "保存 old=dp[j]；字符相等取 diagonal+1，否则取 max(dp[j],dp[j−1])。",
            "将 diagonal 改为 old；最后返回 dp[n]。"
          ],
          "en": [
            "Swap string references if needed so the second string is shorter.",
            "Initialize one zero row; reset diagonal=0 for each new row.",
            "Save old=dp[j]; use diagonal+1 for a match or max(dp[j],dp[j−1]) otherwise.",
            "Set diagonal=old and return dp[n] after all rows."
          ]
        },
        "correctness": {
          "zh": "每次更新前的三个变量准确对应二维表的三个前驱；保存旧值再覆盖维护不变式，因此逐格结果与二维版完全一致。",
          "en": "The three values before each update correspond exactly to the full table’s three predecessors. Saving before overwriting preserves this invariant, reproducing every two-dimensional result."
        },
        "time": "O(mn)",
        "space": "O(min(m,n))",
        "complexity": {
          "zh": "每对字符一次常数更新，只保存短串长度加一的数组和一个对角值；交换的是字符串引用，没有拷贝内容。",
          "en": "Each character pair gets one constant-time update. Storage is one row for the shorter string plus a diagonal scalar; swapping references does not copy string contents."
        },
        "python": "class Solution:\n    def longestCommonSubsequence(self, text1: str, text2: str) -> int:\n        if len(text1)<len(text2): text1,text2=text2,text1\n        dp=[0]*(len(text2)+1)\n        for a in text1:\n            diagonal=0\n            for j in range(1,len(text2)+1):\n                old=dp[j]\n                dp[j]=diagonal+1 if a==text2[j-1] else max(dp[j],dp[j-1])\n                diagonal=old\n        return dp[-1]\n",
        "java": "class Solution {\n    public int longestCommonSubsequence(String a,String b) {\n        if(a.length()<b.length()){String t=a;a=b;b=t;}\n        int[] dp=new int[b.length()+1];\n        for(int i=0;i<a.length();i++) {\n            int diagonal=0;\n            for(int j=1;j<=b.length();j++) {\n                int old=dp[j];dp[j]=a.charAt(i)==b.charAt(j-1)?diagonal+1:Math.max(dp[j],dp[j-1]);diagonal=old;\n            }\n        }\n        return dp[b.length()];\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "text1=abdc",
              "text2=ac",
              "dp=0,0,0"
            ],
            "note": {
              "zh": "短串 ac 决定数组长度。",
              "en": "The shorter string ac determines row width."
            }
          },
          {
            "cells": [
              "after a: dp=0,1,1",
              "after b,d: dp=0,1,1"
            ],
            "note": {
              "zh": "不同字符只保留较优上方或左方。",
              "en": "Mismatches retain the better upper or left value."
            }
          },
          {
            "cells": [
              "current c,j=2",
              "diagonal=1",
              "dp[2]=2"
            ],
            "note": {
              "zh": "先保存旧对角值，匹配时加一。",
              "en": "Use the saved old diagonal and add one on the match."
            }
          },
          {
            "cells": [
              "dp=0,1,2",
              "answer=2"
            ],
            "note": {
              "zh": "一行给出和二维表相同的答案。",
              "en": "One row produces the same answer as the full table."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/longest-common-subsequence/description/"
      }
    ],
    "slug": "longest-common-subsequence",
    "title": {
      "zh": "最长公共子序列",
      "en": "Longest Common Subsequence"
    },
    "category": {
      "zh": "多维动态规划",
      "en": "Multidimensional DP"
    },
    "level": {
      "zh": "中等",
      "en": "Medium"
    }
  },
  {
    "id": 72,
    "statement": {
      "zh": "把 word1 变成 word2，每次可以插入一个字符、删除一个字符或把一个字符替换为另一个字符，每种操作代价都是 1。返回完成转换的最小操作数；两个字符串可以为空。",
      "en": "Transform word1 into word2 using single-character insertion, deletion, or replacement, each costing one. Return the minimum total number of operations. Either string may be empty."
    },
    "constraints": {
      "zh": [
        "0 ≤ word1.length,word2.length ≤ 500",
        "字符仅为小写英文字母。"
      ],
      "en": [
        "0 ≤ word1.length,word2.length ≤ 500",
        "Characters are lowercase English letters."
      ]
    },
    "example": {
      "zh": "word1=\"cat\",word2=\"cuts\" → 2；cat→cut（替换 a），cut→cuts（插入 s）。",
      "en": "word1=\"cat\",word2=\"cuts\" → 2: replace a to obtain cut, then insert s."
    },
    "methods": [
      {
        "key": "edit-table",
        "name": {
          "zh": "三种编辑的二维 DP",
          "en": "Two-dimensional DP over edit choices"
        },
        "intuition": {
          "zh": "dp[i][j] 是第一串前 i 字符变成第二串前 j 字符的代价。末字符相同就无需处理它们，继承左上。否则考虑最后一次编辑：删掉第一串末字符来自上方，插入目标末字符来自左方，替换来自左上，各加 1。空串到非空串只能逐个插入，反向只能逐个删除，边界因此是下标而非 0。",
          "en": "dp[i][j] is the cost to transform the first i source characters into the first j target characters. Equal ends can be retained at the diagonal cost. Otherwise the final edit deletes a source end (upper cell), inserts a target end (left cell), or replaces an end (diagonal), each adding one. Empty-prefix boundaries require one operation per character."
        },
        "steps": {
          "zh": [
            "dp[i][0]=i，dp[0][j]=j。",
            "依次计算非空前缀组合。",
            "末字符相同取 dp[i−1][j−1]；否则三前驱最小值加 1。",
            "返回 dp[m][n]；不需要实际生成中间字符串。"
          ],
          "en": [
            "Set dp[i][0]=i and dp[0][j]=j.",
            "Process all nonempty prefix pairs.",
            "Matching ends use dp[i−1][j−1]; otherwise take one plus the minimum of three predecessors.",
            "Return dp[m][n] without constructing intermediate strings."
          ]
        },
        "correctness": {
          "zh": "任意最优编辑对齐的最后部分要么保留相等字符，要么进行插入、删除或替换之一；各自留下对应前缀子问题。最小化这些完备选择得到最优编辑数。",
          "en": "The end of an optimal alignment either retains matching characters or uses insertion, deletion, or replacement. Each leaves the corresponding prefix subproblem, and minimizing these complete alternatives gives the optimum."
        },
        "time": "O(mn+m+n)",
        "space": "O((m+1)(n+1))",
        "complexity": {
          "zh": "mn 个内部状态加 m+n 个边界；写成含边界的复杂度也涵盖空串。二维表存成本，不存编辑脚本，不切片。",
          "en": "There are mn interior states plus m+n boundary entries; including boundaries handles empty strings. The table stores costs, not an edit script, and uses no slicing."
        },
        "python": "class Solution:\n    def minDistance(self, word1: str, word2: str) -> int:\n        m,n=len(word1),len(word2);dp=[[0]*(n+1) for _ in range(m+1)]\n        for i in range(m+1): dp[i][0]=i\n        for j in range(n+1): dp[0][j]=j\n        for i in range(1,m+1):\n            for j in range(1,n+1):\n                if word1[i-1]==word2[j-1]: dp[i][j]=dp[i-1][j-1]\n                else: dp[i][j]=1+min(dp[i-1][j],dp[i][j-1],dp[i-1][j-1])\n        return dp[m][n]\n",
        "java": "class Solution {\n    public int minDistance(String a,String b) {\n        int m=a.length(),n=b.length();int[][] dp=new int[m+1][n+1];\n        for(int i=0;i<=m;i++)dp[i][0]=i;for(int j=0;j<=n;j++)dp[0][j]=j;\n        for(int i=1;i<=m;i++)for(int j=1;j<=n;j++)\n            dp[i][j]=a.charAt(i-1)==b.charAt(j-1)?dp[i-1][j-1]:1+Math.min(dp[i-1][j-1],Math.min(dp[i-1][j],dp[i][j-1]));\n        return dp[m][n];\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "source=cat",
              "target=cuts",
              "row0=0,1,2,3,4"
            ],
            "note": {
              "zh": "空源串到各目标前缀的成本是插入次数。",
              "en": "The empty-source row counts insertions into each target prefix."
            }
          },
          {
            "cells": [
              "row(c)=1,0,1,2,3"
            ],
            "note": {
              "zh": "c 匹配后剩余目标字符需要插入。",
              "en": "After matching c, remaining target characters require insertion."
            }
          },
          {
            "cells": [
              "row(ca)=2,1,1,2,3"
            ],
            "note": {
              "zh": "a 替换为 u 的成本为 1。",
              "en": "Replacing a with u gives cost one."
            }
          },
          {
            "cells": [
              "row(cat)=3,2,2,1,2",
              "answer=2"
            ],
            "note": {
              "zh": "t 保留，再插入 s，总成本 2。",
              "en": "Retain t and insert s, for a total cost of two."
            }
          }
        ]
      },
      {
        "key": "rolling-edit",
        "name": {
          "zh": "滚动编辑距离",
          "en": "Rolling edit-distance row"
        },
        "intuition": {
          "zh": "编辑距离也只依赖上、左、左上。先用 0..n 初始化“空源串到目标前缀”这一行。每行开始必须把 dp[0] 从 i−1 改成 i，同时用 diagonal 保存改前的值。内部每格先保存旧上方，再按相等或三操作转移，最后推进 diagonal。编辑距离对交换两个字符串对称，可用短串作列。",
          "en": "Edit distance depends only on upper, left, and diagonal cells. Initialize the row with 0..n for an empty source. At the start of row i, save the old dp[0] as diagonal before changing dp[0] to i. At each cell retain the old upper value, apply the match or edit recurrence, and advance the diagonal. Distance is symmetric, so use the shorter string as columns."
        },
        "steps": {
          "zh": [
            "交换引用使第二串较短，dp[j]=j。",
            "新行先保存 diagonal=dp[0]，再设置 dp[0]=i。",
            "保存 old=dp[j]，根据字符相等与否更新 dp[j]。",
            "diagonal=old，最终末项即距离。"
          ],
          "en": [
            "Swap references so the second string is shorter; initialize dp[j]=j.",
            "For a new row, save diagonal=dp[0], then set dp[0]=i.",
            "Save old=dp[j] and update dp[j] based on character equality.",
            "Move diagonal to old and return the final last entry."
          ]
        },
        "correctness": {
          "zh": "边界每行正确更新为删除 i 个字符的成本；旧上方、新左方及保存的左上方与二维表一致，因此压缩算法计算同一递推。",
          "en": "The boundary becomes the cost of deleting i characters. Old upper, new left, and saved diagonal values match the full table, so the compressed algorithm evaluates the same recurrence."
        },
        "time": "O(mn+m+n)",
        "space": "O(min(m,n)+1)",
        "complexity": {
          "zh": "时间包含空串边界更新；仅保存短串长度加一项和常数临时变量，无递归或字符串副本。",
          "en": "Time includes boundary updates for empty-string cases. Storage is one row of the shorter length plus one, with constant temporaries and no recursion or string copies."
        },
        "python": "class Solution:\n    def minDistance(self, word1: str, word2: str) -> int:\n        if len(word1)<len(word2): word1,word2=word2,word1\n        dp=list(range(len(word2)+1))\n        for i in range(1,len(word1)+1):\n            diagonal=dp[0];dp[0]=i\n            for j in range(1,len(word2)+1):\n                old=dp[j]\n                dp[j]=diagonal if word1[i-1]==word2[j-1] else 1+min(diagonal,dp[j],dp[j-1])\n                diagonal=old\n        return dp[-1]\n",
        "java": "class Solution {\n    public int minDistance(String a,String b) {\n        if(a.length()<b.length()){String t=a;a=b;b=t;}\n        int[] dp=new int[b.length()+1];for(int j=0;j<=b.length();j++)dp[j]=j;\n        for(int i=1;i<=a.length();i++) {\n            int diagonal=dp[0];dp[0]=i;\n            for(int j=1;j<=b.length();j++) {\n                int old=dp[j];dp[j]=a.charAt(i-1)==b.charAt(j-1)?diagonal:1+Math.min(diagonal,Math.min(dp[j],dp[j-1]));diagonal=old;\n            }\n        }\n        return dp[b.length()];\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "source=cat",
              "target=cuts",
              "row0=0,1,2,3,4"
            ],
            "note": {
              "zh": "空源串到各目标前缀的成本是插入次数。",
              "en": "The empty-source row counts insertions into each target prefix."
            }
          },
          {
            "cells": [
              "row(c)=1,0,1,2,3"
            ],
            "note": {
              "zh": "c 匹配后剩余目标字符需要插入。",
              "en": "After matching c, remaining target characters require insertion."
            }
          },
          {
            "cells": [
              "row(ca)=2,1,1,2,3"
            ],
            "note": {
              "zh": "a 替换为 u 的成本为 1。",
              "en": "Replacing a with u gives cost one."
            }
          },
          {
            "cells": [
              "row(cat)=3,2,2,1,2",
              "answer=2"
            ],
            "note": {
              "zh": "t 保留，再插入 s，总成本 2。",
              "en": "Retain t and insert s, for a total cost of two."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/edit-distance/description/"
      }
    ],
    "slug": "edit-distance",
    "title": {
      "zh": "编辑距离",
      "en": "Edit Distance"
    },
    "category": {
      "zh": "多维动态规划",
      "en": "Multidimensional DP"
    },
    "level": {
      "zh": "中等",
      "en": "Medium"
    }
  },
  {
    "id": 136,
    "statement": {
      "zh": "非空整数数组中，恰有一个数出现一次，其余每个数都出现两次。找出那个只出现一次的值。题目要求线性时间和常数额外空间；哈希方法仅用于理解基线。",
      "en": "Exactly one value in a nonempty integer array occurs once, while every other value occurs twice. Find the unique value. The required solution is linear-time with constant extra space; hashing is included only as a learning baseline."
    },
    "constraints": {
      "zh": [
        "1 ≤ nums.length ≤ 3×10⁴",
        "−3×10⁴ ≤ nums[i] ≤ 3×10⁴",
        "恰好一个值出现一次，其余值各出现两次。"
      ],
      "en": [
        "1 ≤ nums.length ≤ 3×10⁴",
        "−3×10⁴ ≤ nums[i] ≤ 3×10⁴",
        "Exactly one value occurs once; all other values occur twice."
      ]
    },
    "example": {
      "zh": "nums=[−3,8,−3,5,5] → 8。",
      "en": "nums=[−3,8,−3,5,5] → 8."
    },
    "methods": [
      {
        "key": "set-baseline",
        "name": {
          "zh": "集合配对抵消（空间不满足题目要求）",
          "en": "Set cancellation (does not meet space requirement)"
        },
        "intuition": {
          "zh": "先用一个直观模型：第一次看到数就放入集合，第二次看到就移除。每个成对出现的值最终都被删除，只剩那个单次值。这个方法让“配对抵消”的含义可见，但集合最坏保存很多值，因此不能作为常数额外空间要求的最终答案。",
          "en": "Use an explicit cancellation model: insert a value on its first occurrence and remove it on its second. Every paired value disappears, leaving only the singleton. This makes cancellation tangible but may retain many values simultaneously, so it is a baseline rather than a solution meeting the constant-space requirement."
        },
        "steps": {
          "zh": [
            "建立空集合。",
            "扫描 x：若已存在则删除，否则加入。",
            "完成后集合恰好含一个值，取它返回。"
          ],
          "en": [
            "Create an empty set.",
            "For each x, remove it if present; otherwise insert it.",
            "After the scan, return the sole remaining value."
          ]
        },
        "correctness": {
          "zh": "集合包含且仅包含已扫描部分出现奇数次的值。题设其余数出现两次，所以扫描完成只有单次值满足不变式。",
          "en": "The set contains exactly the values seen an odd number of times. Under the input promise, all paired values have even count at the end, leaving only the singleton."
        },
        "time": "O(n) expected",
        "space": "O(n)",
        "complexity": {
          "zh": "哈希增删查期望 O(1)，扫描 n 项；例如所有不同值的第一次出现集中在前半段时，集合达到 O(n)。不满足题目常数空间约束。",
          "en": "Hash operations are expected O(1), giving a linear scan. The set can grow to O(n), for example when first occurrences precede all matching copies. This violates the required constant-space bound."
        },
        "python": "from typing import List\nclass Solution:\n    def singleNumber(self, nums: List[int]) -> int:\n        unmatched=set()\n        for x in nums:\n            if x in unmatched: unmatched.remove(x)\n            else: unmatched.add(x)\n        return next(iter(unmatched))\n",
        "java": "import java.util.*;\nclass Solution {\n    public int singleNumber(int[] nums) {\n        Set<Integer> unmatched=new HashSet<>();\n        for(int x:nums)if(!unmatched.add(x))unmatched.remove(x);\n        return unmatched.iterator().next();\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "nums=-3,8,-3,5,5",
              "set={}"
            ],
            "note": {
              "zh": "集合显示尚未配对的值。",
              "en": "The set shows unmatched values."
            }
          },
          {
            "cells": [
              "after -3,8: {-3,8}",
              "after -3: {8}"
            ],
            "note": {
              "zh": "第二个 −3 抵消第一个。",
              "en": "The second −3 cancels the first."
            }
          },
          {
            "cells": [
              "after 5: {8,5}",
              "after 5: {8}",
              "answer=8"
            ],
            "note": {
              "zh": "两个 5 也抵消，只剩 8。",
              "en": "The pair of fives cancels, leaving eight."
            }
          }
        ]
      },
      {
        "key": "xor",
        "name": {
          "zh": "异或在常数空间内抵消",
          "en": "XOR cancellation in constant space"
        },
        "intuition": {
          "zh": "异或能在每个二进制位上实现无需集合的配对抵消：x XOR x=0，0 XOR x=x，且结合顺序和排列顺序不影响结果。所以把所有元素异或，相同的两份自动消掉，最后只留下单次值。不要把它误用到“其他数出现三次”等不同条件，成对出现是关键。",
          "en": "XOR implements pair cancellation independently at each bit: x XOR x=0 and 0 XOR x=x, with order-independent grouping. XORing every element cancels each duplicate pair and leaves the singleton. The pair-count promise is essential; this exact algorithm does not solve variants where other values occur three times."
        },
        "steps": {
          "zh": [
            "累积值 ans=0。",
            "逐个元素执行 ans ^= x。",
            "遍历完成直接返回 ans；负数也遵循相同异或恒等式。"
          ],
          "en": [
            "Initialize ans=0.",
            "Apply ans ^= x for every element.",
            "Return ans; the XOR identities also hold for negative integers."
          ]
        },
        "correctness": {
          "zh": "利用交换律结合律可将相同值分组，每一对异或为 0，所有零与唯一值异或仍为唯一值。",
          "en": "Commutativity and associativity allow equal values to be grouped. Each pair reduces to zero, and XORing the singleton with all these zeros leaves it unchanged."
        },
        "time": "O(n)",
        "space": "O(1)",
        "complexity": {
          "zh": "每个数一次异或，只有一个累积变量；题目固定整数范围内每次位运算按常数代价计。",
          "en": "One XOR is performed per value with one accumulator. Bit operations are constant-cost within the problem’s fixed integer range."
        },
        "python": "from typing import List\nclass Solution:\n    def singleNumber(self, nums: List[int]) -> int:\n        ans=0\n        for x in nums: ans ^= x\n        return ans\n",
        "java": "class Solution {\n    public int singleNumber(int[] nums) {\n        int ans=0;for(int x:nums)ans^=x;return ans;\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "nums=-3,8,-3,5,5",
              "ans=0"
            ],
            "note": {
              "zh": "从异或单位元 0 开始。",
              "en": "Start with XOR identity zero."
            }
          },
          {
            "cells": [
              "after -3: -3",
              "after 8: -11",
              "after -3: 8"
            ],
            "note": {
              "zh": "相隔的两个 −3 仍能抵消。",
              "en": "The separated copies of −3 still cancel."
            }
          },
          {
            "cells": [
              "after 5: 13",
              "after 5: 8",
              "answer=8"
            ],
            "note": {
              "zh": "两次异或 5 恢复成 8。",
              "en": "XORing five twice returns the accumulator to eight."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/single-number/description/"
      }
    ],
    "slug": "single-number",
    "title": {
      "zh": "只出现一次的数字",
      "en": "Single Number"
    },
    "category": {
      "zh": "技巧",
      "en": "Tricks"
    },
    "level": {
      "zh": "简单",
      "en": "Easy"
    }
  },
  {
    "id": 169,
    "statement": {
      "zh": "数组中保证存在某个值，其出现次数严格大于数组长度的一半，返回该值。这里的多数不是“次数最多就行”，必须超过一半；无需处理不存在多数的输入。",
      "en": "Return the value whose frequency is strictly greater than half the array length. Such a value is guaranteed to exist. Merely having the highest frequency is insufficient; it must exceed half."
    },
    "constraints": {
      "zh": [
        "1 ≤ nums.length ≤ 5×10⁴",
        "−10⁹ ≤ nums[i] ≤ 10⁹",
        "输入保证存在严格多数元素。"
      ],
      "en": [
        "1 ≤ nums.length ≤ 5×10⁴",
        "−10⁹ ≤ nums[i] ≤ 10⁹",
        "A strict majority element is guaranteed."
      ]
    },
    "example": {
      "zh": "nums=[4,1,4,2,4] → 4；出现 3 次，超过 5/2。",
      "en": "nums=[4,1,4,2,4] → 4; its three occurrences exceed half of five."
    },
    "methods": [
      {
        "key": "frequency",
        "name": {
          "zh": "频次哈希表",
          "en": "Frequency map"
        },
        "intuition": {
          "zh": "直接累积每个值出现次数。由于阈值是全数组长度的一半，扫描中一旦某值超过该阈值就可以返回，后续元素不会减少已看到的次数。这个方法容易核验，也适用于需要完整频率表的场景，但为每个不同值付出额外存储。",
          "en": "Count occurrences explicitly. Once a value exceeds half of the full array length during the scan, it can be returned immediately because later input cannot reduce its count. The method is transparent and useful when a frequency table is needed, at the cost of storing distinct values."
        },
        "steps": {
          "zh": [
            "记录固定阈值 floor(n/2)。",
            "每读到 x，把其频次加一。",
            "新频次超过阈值时返回 x。"
          ],
          "en": [
            "Compute the fixed threshold floor(n/2).",
            "Increment the frequency of each incoming value.",
            "Return x as soon as its count exceeds the threshold."
          ]
        },
        "correctness": {
          "zh": "返回的值已经在完整数组中至少出现该次数，所以必为严格多数；题设保证多数存在，扫描到它足够多次时一定返回。",
          "en": "A returned value already occurs more than half as often as the full length, making it a strict majority. The existence promise ensures some count eventually crosses the threshold."
        },
        "time": "O(n) expected",
        "space": "O(n)",
        "complexity": {
          "zh": "至多 n 次哈希查改，期望线性；最坏保存 O(n) 个不同值，提前返回只改善部分输入。",
          "en": "At most n expected-constant-time map updates are made. The map may store O(n) distinct values; early return only improves some inputs."
        },
        "python": "from typing import List\nclass Solution:\n    def majorityElement(self, nums: List[int]) -> int:\n        counts={}\n        for x in nums:\n            counts[x]=counts.get(x,0)+1\n            if counts[x]>len(nums)//2: return x\n        raise ValueError('Majority promise violated')\n",
        "java": "import java.util.*;\nclass Solution {\n    public int majorityElement(int[] nums) {\n        Map<Integer,Integer> counts=new HashMap<>();\n        for(int x:nums){int count=counts.getOrDefault(x,0)+1;counts.put(x,count);if(count>nums.length/2)return x;}\n        throw new IllegalArgumentException(\"Majority promise violated\");\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "nums=4,1,4,2,4",
              "threshold=2"
            ],
            "note": {
              "zh": "超过 2 次才是多数。",
              "en": "A count exceeding two is needed."
            }
          },
          {
            "cells": [
              "after 4,1,4",
              "count(4)=2",
              "count(1)=1"
            ],
            "note": {
              "zh": "当前两次尚未超过阈值。",
              "en": "Two occurrences do not yet exceed the threshold."
            }
          },
          {
            "cells": [
              "after 2,4",
              "count(4)=3",
              "answer=4"
            ],
            "note": {
              "zh": "第三次出现即可返回。",
              "en": "The third occurrence proves the majority."
            }
          }
        ]
      },
      {
        "key": "vote",
        "name": {
          "zh": "Boyer–Moore 抵消投票",
          "en": "Boyer–Moore cancellation vote"
        },
        "intuition": {
          "zh": "把两个不同值配对删除不会消灭严格多数：即使每次都删掉一个多数值和一个非多数值，多数的净优势仍存在。用 candidate 和 balance 模拟这种删除。balance 为 0 时选新候选，同值增加，不同值抵消。balance 不是候选的真实总出现次数；若没有多数存在的保证，还必须再扫一遍核验。",
          "en": "Removing a pair of different values cannot eliminate a strict majority: even if each pair contains one majority and one nonmajority value, its numerical advantage remains. Simulate cancellation with candidate and balance. Choose a new candidate at zero balance, increment for agreement, and decrement for disagreement. Balance is not the candidate’s total frequency; without the existence promise a verification pass would be necessary."
        },
        "steps": {
          "zh": [
            "balance=0。",
            "若 balance=0，当前值成为 candidate。",
            "当前值等于候选则 balance+1，否则 balance−1。",
            "返回最终候选；本题保证存在多数，因此无需第二次验证。"
          ],
          "en": [
            "Start with balance=0.",
            "When balance is zero, adopt the current value as candidate.",
            "Increment for equality with the candidate, otherwise decrement.",
            "Return the final candidate; the problem’s majority promise removes the need for verification."
          ]
        },
        "correctness": {
          "zh": "扫描过程等价于删除若干对不同值，剩余未抵消项全部相同。严格多数在任意这种删除后仍占优势，所以最终未抵消的候选必为多数。",
          "en": "The scan removes pairs of unequal values and retains identical unmatched values. A strict majority survives such cancellation with an advantage, so the remaining candidate must be that majority."
        },
        "time": "O(n)",
        "space": "O(1)",
        "complexity": {
          "zh": "一次扫描，候选值和余额两个标量；不修改数组，无哈希表或排序空间。",
          "en": "One scan stores a candidate and a balance. No input mutation, hash map, or sorting storage is used."
        },
        "python": "from typing import List\nclass Solution:\n    def majorityElement(self, nums: List[int]) -> int:\n        candidate=0;balance=0\n        for x in nums:\n            if balance==0: candidate=x\n            balance += 1 if x==candidate else -1\n        return candidate\n",
        "java": "class Solution {\n    public int majorityElement(int[] nums) {\n        int candidate=0,balance=0;\n        for(int x:nums){if(balance==0)candidate=x;balance+=x==candidate?1:-1;}\n        return candidate;\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "x=4 → candidate=4,balance=1",
              "x=1 → balance=0"
            ],
            "note": {
              "zh": "4 与 1 抵消成一对。",
              "en": "4 and 1 cancel as an unequal pair."
            }
          },
          {
            "cells": [
              "x=4 → candidate=4,balance=1",
              "x=2 → balance=0"
            ],
            "note": {
              "zh": "新的 4 与 2 再抵消。",
              "en": "The next 4 cancels with 2."
            }
          },
          {
            "cells": [
              "x=4 → candidate=4,balance=1",
              "answer=4"
            ],
            "note": {
              "zh": "最后留存 4；余额 1 不是其真实频次 3。",
              "en": "4 remains; balance one is not its actual frequency of three."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/majority-element/description/"
      }
    ],
    "slug": "majority-element",
    "title": {
      "zh": "多数元素",
      "en": "Majority Element"
    },
    "category": {
      "zh": "技巧",
      "en": "Tricks"
    },
    "level": {
      "zh": "简单",
      "en": "Easy"
    }
  },
  {
    "id": 75,
    "statement": {
      "zh": "数组元素 0、1、2 分别代表三种颜色。请原地调整数组，使所有 0 在前、1 居中、2 在后；不能调用库排序。方法通过修改输入生效，不返回新数组。",
      "en": "Rearrange an array containing only 0, 1, and 2 so all zeros precede ones, which precede twos. Modify the input in place without a library sorting function. The method does not return a new array."
    },
    "constraints": {
      "zh": [
        "1 ≤ nums.length ≤ 300",
        "nums[i] ∈ {0,1,2}",
        "进阶目标：一次扫描且常数额外空间。"
      ],
      "en": [
        "1 ≤ nums.length ≤ 300",
        "nums[i] ∈ {0,1,2}",
        "Follow-up: one pass with constant extra space."
      ]
    },
    "example": {
      "zh": "nums=[2,1,0,2,0] → [0,0,1,2,2]。",
      "en": "nums=[2,1,0,2,0] → [0,0,1,2,2]."
    },
    "methods": [
      {
        "key": "count-rewrite",
        "name": {
          "zh": "计数后原地重写",
          "en": "Count then overwrite in place"
        },
        "intuition": {
          "zh": "值域只有三个数，不需要通用比较排序。第一遍记录每种颜色的数量，第二遍按 0、1、2 的顺序将对应数量写回原数组。元素没有附带身份信息，重写值不影响题目要求。这是两遍线性解法，满足原地常数空间，但不满足进阶的一遍扫描。",
          "en": "There are only three possible values, so general comparison sorting is unnecessary. Count each color, then write the required number of zeros, ones, and twos into the same array. No extra object identity must be preserved. This is a two-pass, constant-space in-place method, but not the one-pass follow-up."
        },
        "steps": {
          "zh": [
            "用固定长度 3 的数组计数。",
            "写指针从 0 开始。",
            "按颜色从 0 到 2，将 count[color] 个值逐个写回。",
            "不创建结果数组，也不调用排序函数。"
          ],
          "en": [
            "Count values in a fixed three-entry array.",
            "Start a write pointer at zero.",
            "For colors zero through two, overwrite count[color] positions.",
            "Create no result array and call no sorting function."
          ]
        },
        "correctness": {
          "zh": "每种值写入的数量与原数组相等，保留了多重集合；颜色按递增顺序分块写入，所以最终有序。",
          "en": "The number of writes for each value equals its original count, preserving the multiset. Writing color blocks in increasing order makes the final array sorted."
        },
        "time": "O(n)",
        "space": "O(1)",
        "complexity": {
          "zh": "计数一遍、写回一遍共 2n 次量级操作；3 个计数器不随 n 增长。输出复用输入空间。",
          "en": "One counting pass and one overwrite pass perform O(n) work. Three counters do not grow with n, and output reuses input storage."
        },
        "python": "from typing import List\nclass Solution:\n    def sortColors(self, nums: List[int]) -> None:\n        counts=[0,0,0]\n        for x in nums: counts[x]+=1\n        write=0\n        for color in range(3):\n            for _ in range(counts[color]): nums[write]=color;write+=1\n",
        "java": "class Solution {\n    public void sortColors(int[] nums) {\n        int[] counts=new int[3];for(int x:nums)counts[x]++;\n        int write=0;for(int color=0;color<3;color++)for(int k=0;k<counts[color];k++)nums[write++]=color;\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "nums=2,1,0,2,0",
              "counts=2,1,2"
            ],
            "note": {
              "zh": "先得到三种值的数量。",
              "en": "Count the three values first."
            }
          },
          {
            "cells": [
              "write 0,0",
              "nums=0,0,0,2,0"
            ],
            "note": {
              "zh": "只把前两格写为 0，尚未完成的后缀可暂时无序。",
              "en": "Write two zeros first; the unwritten suffix may remain unordered."
            }
          },
          {
            "cells": [
              "write 1,2,2",
              "nums=0,0,1,2,2"
            ],
            "note": {
              "zh": "继续按数量写入 1 和 2。",
              "en": "Write the required one and two blocks."
            }
          }
        ]
      },
      {
        "key": "dutch-flag",
        "name": {
          "zh": "荷兰国旗三指针",
          "en": "Dutch national flag partition"
        },
        "intuition": {
          "zh": "维护四段：[0,low) 已是 0，[low,mid) 已是 1，[mid,high] 未知，(high,n) 已是 2。只处理未知段的左端：0 送到 low，1 留中间，2 送到 high。交换 2 后换回的是未知值，所以 mid 不能前进；交换 0 换回的是已知 1（或自身），可以同时推进。",
          "en": "Maintain four regions: zeros before low, ones from low to mid, unknown values from mid through high, and twos after high. Inspect only the first unknown value. Move zero left, retain one in the middle, and move two right. After swapping a two, the incoming value is unknown, so mid must stay; after swapping a zero, the incoming value is a known one or itself."
        },
        "steps": {
          "zh": [
            "low=mid=0，high=n−1。",
            "遇 0：与 low 交换，low 与 mid 同时加一。",
            "遇 1：仅 mid 加一；遇 2：与 high 交换，仅 high 减一。",
            "直到 mid>high，未知段为空。"
          ],
          "en": [
            "Initialize low=mid=0 and high=n−1.",
            "For zero, swap with low and increment both low and mid.",
            "For one, increment mid; for two, swap with high and decrement only high.",
            "Stop when mid>high and no unknown region remains."
          ]
        },
        "correctness": {
          "zh": "每种操作都保持四段不变式且未知段缩短一个。结束时未知段为空，三个已知段依次为 0、1、2，且交换保持原有元素数量。",
          "en": "Each operation preserves the four-region invariant and shrinks the unknown region by one. At termination only ordered zero, one, and two regions remain, while swaps preserve the multiset."
        },
        "time": "O(n)",
        "space": "O(1)",
        "complexity": {
          "zh": "未知区每次减少一个元素，因此恰好线性数量的处理；三个下标及一个交换临时变量为常数空间。",
          "en": "Every iteration removes one unknown position, giving linear work. Three pointers and a swap temporary use constant space."
        },
        "python": "from typing import List\nclass Solution:\n    def sortColors(self, nums: List[int]) -> None:\n        low=mid=0;high=len(nums)-1\n        while mid<=high:\n            if nums[mid]==0:\n                nums[low],nums[mid]=nums[mid],nums[low];low+=1;mid+=1\n            elif nums[mid]==1: mid+=1\n            else:\n                nums[mid],nums[high]=nums[high],nums[mid];high-=1\n",
        "java": "class Solution {\n    public void sortColors(int[] nums) {\n        int low=0,mid=0,high=nums.length-1;\n        while(mid<=high) {\n            if(nums[mid]==0){int t=nums[low];nums[low]=nums[mid];nums[mid]=t;low++;mid++;}\n            else if(nums[mid]==1)mid++;\n            else {int t=nums[mid];nums[mid]=nums[high];nums[high]=t;high--;}\n        }\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "nums=2,1,0,2,0",
              "low=0,mid=0,high=4"
            ],
            "note": {
              "zh": "中间全为未知。",
              "en": "Initially the entire array is unknown."
            }
          },
          {
            "cells": [
              "nums=0,1,0,2,2",
              "low=0,mid=0,high=3"
            ],
            "note": {
              "zh": "2 交换到右端，mid 不变，重查换来的 0。",
              "en": "Move two right and keep mid to inspect the incoming zero."
            }
          },
          {
            "cells": [
              "nums=0,0,1,2,2",
              "low=2,mid=3,high=3"
            ],
            "note": {
              "zh": "处理 0、1、0，左边已分为零区和一区。",
              "en": "Process zero, one, then zero; the left side is partitioned."
            }
          },
          {
            "cells": [
              "low=2,mid=3,high=2",
              "nums=0,0,1,2,2"
            ],
            "note": {
              "zh": "最后的 2 归位，未知区清空。",
              "en": "The final two is placed and the unknown region disappears."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/sort-colors/description/"
      }
    ],
    "slug": "sort-colors",
    "title": {
      "zh": "颜色分类",
      "en": "Sort Colors"
    },
    "category": {
      "zh": "技巧",
      "en": "Tricks"
    },
    "level": {
      "zh": "中等",
      "en": "Medium"
    }
  },
  {
    "id": 31,
    "statement": {
      "zh": "将整数数组原地变成字典序中紧邻其后的排列。字典序比较从左侧第一个不同元素决定大小；如果当前已是最大排列，则改成最小的升序排列。允许重复值，必须只用常数额外空间。",
      "en": "Replace the array in place by its immediate successor in lexicographic order, where the first differing position determines order. If it is already the greatest arrangement, wrap to ascending order. Repeated values are allowed, and extra space must be constant."
    },
    "constraints": {
      "zh": [
        "1 ≤ nums.length ≤ 100",
        "0 ≤ nums[i] ≤ 100",
        "原地修改，额外空间 O(1)。"
      ],
      "en": [
        "1 ≤ nums.length ≤ 100",
        "0 ≤ nums[i] ≤ 100",
        "Modify in place with O(1) extra space."
      ]
    },
    "example": {
      "zh": "nums=[1,4,3,2] → [2,1,3,4]；1 提升成后缀中最小的更大值 2，再把后缀变最小。",
      "en": "nums=[1,4,3,2] → [2,1,3,4]: raise 1 to the smallest greater suffix value, 2, then minimize the suffix."
    },
    "methods": [
      {
        "key": "pivot-selection",
        "name": {
          "zh": "最小提升后选择排序后缀",
          "en": "Minimal pivot increase plus suffix selection sort"
        },
        "intuition": {
          "zh": "为了只增大一点，尽量保留最长前缀。右端非递增后缀已是自身的最大排列，无法只改后缀得到更大值，所以必须改变它前面的转折位。选择后缀中比转折值大的最小值交换，再把剩余后缀排升序。这里手写选择排序，作为容易验证且满足常数空间的基线。",
          "en": "To increase the sequence as little as possible, retain the longest prefix. A nonincreasing suffix is already its greatest arrangement, so a larger permutation must change the pivot immediately before it. Swap the pivot with the smallest greater suffix value, then sort the suffix ascending. Manual selection sort provides a transparent constant-space baseline."
        },
        "steps": {
          "zh": [
            "从右找首个 nums[i]<nums[i+1]。",
            "若存在，扫描后缀找到大于 nums[i] 的最小值并交换。",
            "从 i+1 开始用选择排序原地排升序；若无转折，起点为 0。",
            "整个过程不生成排列列表。"
          ],
          "en": [
            "Find the rightmost i with nums[i]<nums[i+1].",
            "If found, scan the suffix for the smallest value greater than nums[i] and swap.",
            "Selection-sort the suffix from i+1; when no pivot exists, sort from zero.",
            "Never generate a list of permutations."
          ]
        },
        "correctness": {
          "zh": "最右可提升位置保证最长前缀不变，最小更大值保证该位增幅最小，升序后缀保证余下部分最小。无转折说明已最大，升序全数组正确回绕。",
          "en": "The rightmost increasable position preserves the longest prefix; the smallest greater replacement minimizes that position’s increase; an ascending suffix minimizes the remainder. No pivot means the current permutation is maximal and full sorting correctly wraps around."
        },
        "time": "O(n²)",
        "space": "O(1)",
        "complexity": {
          "zh": "找转折与候选 O(n)，选择排序后缀最坏 O(n²)，只使用下标及交换变量。没有库排序栈或切片。",
          "en": "Pivot and successor searches are O(n); selection-sorting the suffix is O(n²) worst-case. Only indices and a swap temporary are used, without library sorting or slices."
        },
        "python": "from typing import List\nclass Solution:\n    def nextPermutation(self, nums: List[int]) -> None:\n        n=len(nums);i=n-2\n        while i>=0 and nums[i]>=nums[i+1]: i-=1\n        if i>=0:\n            j=i+1\n            for k in range(i+1,n):\n                if nums[i]<nums[k]<nums[j]: j=k\n            nums[i],nums[j]=nums[j],nums[i]\n        for left in range(i+1,n):\n            smallest=left\n            for k in range(left+1,n):\n                if nums[k]<nums[smallest]: smallest=k\n            nums[left],nums[smallest]=nums[smallest],nums[left]\n",
        "java": "class Solution {\n    public void nextPermutation(int[] nums) {\n        int n=nums.length,i=n-2;while(i>=0&&nums[i]>=nums[i+1])i--;\n        if(i>=0){int j=i+1;for(int k=i+1;k<n;k++)if(nums[k]>nums[i]&&nums[k]<nums[j])j=k;swap(nums,i,j);}\n        for(int left=i+1;left<n;left++){int smallest=left;for(int k=left+1;k<n;k++)if(nums[k]<nums[smallest])smallest=k;swap(nums,left,smallest);}\n    }\n    private void swap(int[] a,int i,int j){int t=a[i];a[i]=a[j];a[j]=t;}\n}\n",
        "trace": [
          {
            "cells": [
              "nums=1,4,3,2",
              "pivot=0"
            ],
            "note": {
              "zh": "后缀 4,3,2 已是最大排列，必须提升前面的 1。",
              "en": "Suffix 4,3,2 is maximal, so the preceding one must increase."
            }
          },
          {
            "cells": [
              "successor=2",
              "after swap=2,4,3,1"
            ],
            "note": {
              "zh": "最小更大值是 2。",
              "en": "Two is the smallest greater replacement."
            }
          },
          {
            "cells": [
              "select min=1",
              "nums=2,1,3,4"
            ],
            "note": {
              "zh": "选择排序第一步把 1 放到后缀开头。",
              "en": "The first selection-sort step places one at the suffix start."
            }
          },
          {
            "cells": [
              "suffix=1,3,4",
              "answer=2,1,3,4"
            ],
            "note": {
              "zh": "剩余后缀已升序，下一个排列完成。",
              "en": "The remaining suffix is ascending, completing the successor."
            }
          }
        ]
      },
      {
        "key": "pivot-reverse",
        "name": {
          "zh": "利用降序后缀直接反转",
          "en": "Reverse the nonincreasing suffix"
        },
        "intuition": {
          "zh": "基线的排序可以进一步去掉：原后缀已经非递增，从右遇到的第一个大于转折值的数就是最小更大值。选择这个最右候选交换后，后缀仍非递增，于是一次双指针反转就得到升序。重复值时必须用严格大于，才能真正得到下一个不同排列。",
          "en": "The suffix need not be sorted from scratch. Because it is nonincreasing, its rightmost value greater than the pivot is the smallest valid increase. Swapping with that rightmost candidate keeps the suffix nonincreasing, so a two-pointer reversal makes it ascending. Strict inequality is necessary with duplicates to produce an actual successor."
        },
        "steps": {
          "zh": [
            "从右找首个上升相邻对，左侧下标为 pivot。",
            "存在 pivot 时，从最右找第一个严格更大的值交换。",
            "用双指针反转 pivot+1 到末尾。",
            "没有 pivot 时反转全数组，回到最小排列。"
          ],
          "en": [
            "Locate the rightmost rising adjacent pair; its left index is the pivot.",
            "If a pivot exists, swap it with the rightmost strictly greater value.",
            "Reverse the suffix after the pivot with two pointers.",
            "Without a pivot, reverse the whole array to the smallest arrangement."
          ]
        },
        "correctness": {
          "zh": "最小提升原则与基线相同。选择最右更大值维持后缀非递增，因此反转等价于排序，又不改变已确定的最小前缀增量。",
          "en": "The minimal-increase argument is unchanged. Choosing the rightmost greater value preserves a nonincreasing suffix; reversing it is therefore equivalent to sorting it, while preserving the minimal prefix increase."
        },
        "time": "O(n)",
        "space": "O(1)",
        "complexity": {
          "zh": "寻找转折、寻找后继、反转各至多扫描 n 项，总 O(n)。原地交换，无 Python 切片或返回新数组。",
          "en": "Pivot search, successor search, and reversal each scan at most n positions. Swaps are in place, with no Python slices or new result array."
        },
        "python": "from typing import List\nclass Solution:\n    def nextPermutation(self, nums: List[int]) -> None:\n        i=len(nums)-2\n        while i>=0 and nums[i]>=nums[i+1]: i-=1\n        if i>=0:\n            j=len(nums)-1\n            while nums[j]<=nums[i]: j-=1\n            nums[i],nums[j]=nums[j],nums[i]\n        left,right=i+1,len(nums)-1\n        while left<right:\n            nums[left],nums[right]=nums[right],nums[left];left+=1;right-=1\n",
        "java": "class Solution {\n    public void nextPermutation(int[] nums) {\n        int i=nums.length-2;while(i>=0&&nums[i]>=nums[i+1])i--;\n        if(i>=0){int j=nums.length-1;while(nums[j]<=nums[i])j--;swap(nums,i,j);}\n        int left=i+1,right=nums.length-1;while(left<right)swap(nums,left++,right--);\n    }\n    private void swap(int[] a,int i,int j){int t=a[i];a[i]=a[j];a[j]=t;}\n}\n",
        "trace": [
          {
            "cells": [
              "nums=1,4,3,2",
              "pivot=0"
            ],
            "note": {
              "zh": "从右找到唯一可提升的转折位。",
              "en": "Find the rightmost increasable pivot."
            }
          },
          {
            "cells": [
              "rightmost >1 is 2",
              "after swap=2,4,3,1"
            ],
            "note": {
              "zh": "选择最右更大值，后缀仍非递增。",
              "en": "Choosing the rightmost greater value leaves a nonincreasing suffix."
            }
          },
          {
            "cells": [
              "reverse 4,3,1 → 1,3,4",
              "answer=2,1,3,4"
            ],
            "note": {
              "zh": "反转直接得到最小后缀。",
              "en": "Reversal directly produces the minimal suffix."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/next-permutation/description/"
      }
    ],
    "slug": "next-permutation",
    "title": {
      "zh": "下一个排列",
      "en": "Next Permutation"
    },
    "category": {
      "zh": "技巧",
      "en": "Tricks"
    },
    "level": {
      "zh": "中等",
      "en": "Medium"
    }
  },
  {
    "id": 287,
    "statement": {
      "zh": "长度为 n+1 的数组中，所有值都在 1 到 n 之间，恰好一个不同的值出现了至少两次，其他出现的值各出现一次。返回这个重复值；不得修改数组，并要求常数额外空间。重复值可能出现不止两次，某些值也可能没有出现。",
      "en": "An array of length n+1 contains values between 1 and n. Exactly one distinct value appears at least twice; every other present value appears once. Return the repeated value without modifying the array and with constant extra space. The duplicate may occur more than twice, and some values may be absent."
    },
    "constraints": {
      "zh": [
        "1 ≤ n ≤ 10⁵",
        "nums.length=n+1，1 ≤ nums[i] ≤ n",
        "仅一个值重复，重复次数至少 2。",
        "不得修改输入；额外空间 O(1)。"
      ],
      "en": [
        "1 ≤ n ≤ 10⁵",
        "nums.length=n+1 and 1 ≤ nums[i] ≤ n",
        "Exactly one value repeats, at least twice.",
        "Do not modify input; use O(1) extra space."
      ]
    },
    "example": {
      "zh": "nums=[2,5,1,4,3,5] → 5；下标映射从 0 出发为 0→2→1→5→5。",
      "en": "nums=[2,5,1,4,3,5] → 5; the index mapping from zero is 0→2→1→5→5."
    },
    "methods": [
      {
        "key": "value-binary",
        "name": {
          "zh": "按计数二分值域",
          "en": "Binary search the value range by counts"
        },
        "intuition": {
          "zh": "不是对未排序的数组二分，而是对可能的答案值 1..n 二分。记 count(mid) 为不大于 mid 的元素数。若重复值大于 mid，则低半每个值至多一次，count≤mid；若重复值不大于 mid，则缺失值的数量不足以抵消额外副本，count>mid。因此谓词在重复值处从假变真，可以找第一个真值。",
          "en": "Binary search applies to possible answer values 1..n, not positions in the unsorted array. Let count(mid) count entries at most mid. Below the duplicate, each such value appears at most once, so count≤mid. At or above it, missing values cannot cancel all extra copies, so count>mid. This predicate changes from false to true at the duplicate."
        },
        "steps": {
          "zh": [
            "lo=1，hi=n。",
            "取 mid，完整扫描数组统计值≤mid 的数量。",
            "count>mid 时 hi=mid，否则 lo=mid+1。",
            "区间收缩到一个值后返回，不对数组排序或改写。"
          ],
          "en": [
            "Initialize lo=1 and hi=n.",
            "Choose mid and scan the array to count values≤mid.",
            "If count>mid set hi=mid; otherwise set lo=mid+1.",
            "Return the sole remaining value without sorting or mutating the array."
          ]
        },
        "correctness": {
          "zh": "若重复值出现 k 次，则在 1..n 中总共缺失 k−2 个值。mid 达到重复值时，count−mid 至少为 (k−1)−(k−2)=1；未达到时不可能超额。故二分判定准确，即使重复多次也成立。",
          "en": "If the duplicate occurs k times, exactly k−2 values from 1..n are missing. Once mid includes it, count−mid is at least (k−1)−(k−2)=1; before it, there is no excess. Thus the predicate is correct even for more than two copies."
        },
        "time": "O(n log n)",
        "space": "O(1)",
        "complexity": {
          "zh": "每轮 O(n) 扫描，值域最多 O(log n) 轮；仅保存边界、中点和计数，不创建频次数组。",
          "en": "Each iteration scans O(n) entries and there are O(log n) value-range iterations. Only boundaries, a midpoint, and a count are stored."
        },
        "python": "from typing import List\nclass Solution:\n    def findDuplicate(self, nums: List[int]) -> int:\n        lo,hi=1,len(nums)-1\n        while lo<hi:\n            mid=(lo+hi)//2;count=0\n            for x in nums:\n                if x<=mid: count+=1\n            if count>mid: hi=mid\n            else: lo=mid+1\n        return lo\n",
        "java": "class Solution {\n    public int findDuplicate(int[] nums) {\n        int lo=1,hi=nums.length-1;\n        while(lo<hi){int mid=lo+(hi-lo)/2,count=0;for(int x:nums)if(x<=mid)count++;if(count>mid)hi=mid;else lo=mid+1;}\n        return lo;\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "nums=2,5,1,4,3,5",
              "lo=1,hi=5",
              "mid=3,count=3"
            ],
            "note": {
              "zh": "小于等于 3 的数没有超额，重复值在右半。",
              "en": "Values at most three show no excess, so search right."
            }
          },
          {
            "cells": [
              "lo=4,hi=5",
              "mid=4,count=4"
            ],
            "note": {
              "zh": "仍未超额，继续向右收缩。",
              "en": "There is still no excess, so narrow right again."
            }
          },
          {
            "cells": [
              "lo=hi=5",
              "answer=5"
            ],
            "note": {
              "zh": "单一候选 5 即重复数。",
              "en": "The remaining candidate five is the duplicate."
            }
          }
        ]
      },
      {
        "key": "floyd",
        "name": {
          "zh": "函数图与 Floyd 环入口",
          "en": "Functional graph and Floyd cycle entry"
        },
        "intuition": {
          "zh": "把下标 i 指向 nums[i]，就得到每个节点有一条出边的图。从 0 出发永远不能回到 0，因为值域没有 0；有限节点下最终进入环。环入口同时被环前节点和环内前驱指向，代表两个下标保存相同数，因此就是唯一重复值。先用快慢指针找环内相遇点，再从 0 和相遇点同步步进找入口。",
          "en": "Make each index i point to nums[i], producing a graph with one outgoing edge per node. Starting at zero cannot return to zero because zero is absent from the value range, so the path eventually enters a cycle. Its entry has incoming edges from both the preceding tail and a cycle predecessor, revealing a duplicated value. Find a meeting point with fast/slow pointers, then walk from zero and that point at equal speed to locate the entry."
        },
        "steps": {
          "zh": [
            "slow=fast=0，先移动再比较：slow 走一步，fast 走两步。",
            "首次相遇后不要直接返回，该点一般不是入口。",
            "finder=0，与 slow 每次都走一步，直到再次相等。",
            "返回相等时的下标值，即环入口与重复数。"
          ],
          "en": [
            "Start slow=fast=0; move before comparing, one step versus two.",
            "The first meeting is generally not the entry, so do not return it.",
            "Start finder=0 and move finder and slow one step at a time until equal.",
            "Return that node value, the cycle entry and duplicate."
          ]
        },
        "correctness": {
          "zh": "设入口距离 μ、环长 λ，首次相遇时慢指针走了 t 步且 t 是 λ 的倍数。再从 0 和相遇点各走 μ 步，会同时到入口。入口有两个不同前驱，其值唯一重复，故答案正确。",
          "en": "Let the tail length be μ and cycle length λ. At the meeting the slow pointer has traveled t steps with t divisible by λ. Advancing from zero and the meeting point by μ steps reaches the entry simultaneously. Its two distinct predecessors identify the uniquely repeated value."
        },
        "time": "O(n)",
        "space": "O(1)",
        "complexity": {
          "zh": "尾长加环长不超过 n+1，首次相遇和寻找入口均线性；只使用三个下标，不修改输入，不建立图对象。",
          "en": "Tail plus cycle length is at most n+1, so both phases are linear. Three indices suffice; the input is unchanged and no explicit graph is built."
        },
        "python": "from typing import List\nclass Solution:\n    def findDuplicate(self, nums: List[int]) -> int:\n        slow=fast=0\n        while True:\n            slow=nums[slow];fast=nums[nums[fast]]\n            if slow==fast: break\n        finder=0\n        while finder!=slow:\n            finder=nums[finder];slow=nums[slow]\n        return finder\n",
        "java": "class Solution {\n    public int findDuplicate(int[] nums) {\n        int slow=0,fast=0;\n        do{slow=nums[slow];fast=nums[nums[fast]];}while(slow!=fast);\n        int finder=0;while(finder!=slow){finder=nums[finder];slow=nums[slow];}\n        return finder;\n    }\n}\n",
        "trace": [
          {
            "cells": [
              "0→2→1→5→5",
              "slow=fast=0"
            ],
            "note": {
              "zh": "函数图从 0 出发，环入口为 5。",
              "en": "The path from zero enters a cycle at five."
            }
          },
          {
            "cells": [
              "step1: slow=2,fast=1",
              "step2: slow=1,fast=5",
              "step3: slow=5,fast=5"
            ],
            "note": {
              "zh": "第一阶段在 5 相遇，此例恰好也是入口。",
              "en": "The first phase meets at five, which happens to be the entry here."
            }
          },
          {
            "cells": [
              "finder: 0→2→1→5",
              "slow: 5→5→5→5"
            ],
            "note": {
              "zh": "第二阶段按规则从 0 与相遇点各走一步。",
              "en": "In phase two, advance from zero and the meeting point equally."
            }
          },
          {
            "cells": [
              "finder=slow=5",
              "answer=5"
            ],
            "note": {
              "zh": "相等时返回入口值。",
              "en": "Return the entry when the pointers meet."
            }
          }
        ]
      }
    ],
    "sources": [
      {
        "label": {
          "zh": "LeetCode 原题（已核对题意与约束）",
          "en": "LeetCode problem — requirements verified"
        },
        "url": "https://leetcode.com/problems/find-the-duplicate-number/description/"
      }
    ],
    "slug": "find-the-duplicate-number",
    "title": {
      "zh": "寻找重复数",
      "en": "Find the Duplicate Number"
    },
    "category": {
      "zh": "技巧",
      "en": "Tricks"
    },
    "level": {
      "zh": "中等",
      "en": "Medium"
    }
  }
];
