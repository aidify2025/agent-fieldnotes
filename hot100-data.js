/* Bilingual Hot 100 lessons; stable IDs preserve learning progress. */
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
    "methods": [
      {
        "key": "pairs",
        "name": {
          "zh": "枚举所有下标对（基线）",
          "en": "Enumerate index pairs (baseline)"
        },
        "intuition": {
          "zh": "先固定第一个位置 i，再在它后面寻找第二个位置 j。限制 j>i 同时解决了“不能用同一元素”和“同一对不要重复检查”两件事。这个方法不缓存任何信息，适合先确认问题到底返回数值还是下标。\n\n每个由不同下标构成的无序对都恰好被访问一次，所以合法对一定能被找到。",
          "en": "Fix the first position i, then try every j after it. Requiring j>i prevents self-pairing and avoids checking the same unordered pair twice. This direct baseline makes the distinction between returning values and returning indices explicit. Every unordered pair of different indices is visited exactly once, so the valid pair cannot be missed."
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
        "time": "O(n²)",
        "space": "O(1)",
        "complexity": {
          "zh": "最多检查 n(n−1)/2 对，只保存两个循环变量；返回的两个下标为常数空间。大输入推荐哈希法。",
          "en": "There are n(n−1)/2 possible pairs and only constant working state. The two-index result is constant-sized. Prefer hashing for large inputs."
        },
        "python": "class Solution:\n    def twoSum(self, nums, target):\n        for i in range(len(nums)):\n            for j in range(i + 1, len(nums)):\n                if nums[i] + nums[j] == target:\n                    return [i, j]\n        return []",
        "java": "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        for (int i=0; i<nums.length; i++)\n            for (int j=i+1; j<nums.length; j++)\n                if (nums[i]+nums[j]==target) return new int[]{i,j};\n        return new int[0];\n    }\n}",
        "algorithmNotes": {
          "zh": "i 固定后，j 只检查右侧尚未配对的位置，不能从 0 开始，否则会重复检查或把一个位置用两次。返回的是 [i,j]，不是两个元素的值；找到目标后直接结束两层搜索。",
          "en": "For a fixed i, start j strictly to its right so each pair uses distinct positions and is checked only once. Return [i,j], not the two values; a match ends both loops immediately."
        }
      },
      {
        "key": "hash",
        "name": {
          "zh": "哈希表寻找已出现的补数",
          "en": "Hash previously seen complements"
        },
        "intuition": {
          "zh": "读到 x 时，不再向后反复搜索，而是问“此前是否出现 target−x”。表里存值到下标的映射，才能输出位置。必须先查询再插入：处理 [5,5] 时，第一个 5 先入表，第二个 5 才能与它配对，不能让当前元素命中自己。\n\n查询时映射仅包含更早的位置。任意合法对的后一个元素被扫描时，前一个必在表中；因此既不自配对，也不漏解。",
          "en": "When x arrives, ask whether target−x appeared earlier instead of searching the remaining suffix. Store an index for each value because the result requires positions. Query before inserting: in [5,5], the first 5 is stored and the second matches it, rather than matching itself. At lookup time the map contains only earlier positions. When the later member of the valid pair is reached, its partner is already stored, so the algorithm finds a distinct-index pair."
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
        "time": "O(n) expected",
        "space": "O(n)",
        "complexity": {
          "zh": "扫描一次，哈希插入与查询期望 O(1)；最多记录 n 个值。哈希碰撞严重时不承诺严格线性。",
          "en": "One pass performs expected constant-time hash operations, storing at most n values. Pathological collisions are outside the expected linear bound."
        },
        "python": "class Solution:\n    def twoSum(self, nums, target):\n        seen = {}\n        for i, x in enumerate(nums):\n            if target - x in seen:\n                return [seen[target - x], i]\n            seen[x] = i\n        return []",
        "java": "import java.util.*;\nclass Solution {\n    public int[] twoSum(int[] nums, int target) {\n        Map<Integer,Integer> seen=new HashMap<>();\n        for(int i=0;i<nums.length;i++) {\n            Integer j=seen.get(target-nums[i]);\n            if(j!=null) return new int[]{j,i};\n            seen.put(nums[i],i);\n        }\n        return new int[0];\n    }\n}",
        "algorithmNotes": {
          "zh": "seen 的键是已经扫描过的数，值是它的下标；每轮先计算 need=target−x。先查 need，失败后才写入 x，这个顺序保证两个相等的数也必须来自不同位置。",
          "en": "seen maps each previously scanned value to its index; compute need=target−x at each position. Look up need before storing x, so equal values can form a pair only when they occupy different positions."
        }
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
    },
    "examples": [
      {
        "input": "nums = [4,1,9,7], target = 10",
        "output": "[1,2]"
      },
      {
        "input": "nums = [5,5], target = 10",
        "output": "[0,1]"
      },
      {
        "input": "nums = [-3,2,8], target = 5",
        "output": "[0,2]"
      }
    ]
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
    "methods": [
      {
        "key": "sorted-key",
        "name": {
          "zh": "排序签名分组",
          "en": "Group by a sorted signature"
        },
        "intuition": {
          "zh": "异位词忽略排列，但不能忽略重复次数。把字符排序后，所有排列都会落到同一个规范字符串。例如 arc、car、cra 都得到 acr；把这个签名作为字典键，值存原单词列表，而不是排序后的词。\n\n两个字符串排序结果相同，当且仅当每个字符出现次数相同，所以按签名分组正好对应异位词关系。",
          "en": "Anagrams ignore ordering but retain multiplicities. Sorting produces a canonical signature: arc, car and cra all become acr. Use that signature as a dictionary key, storing the original words rather than their sorted forms. Equal sorted signatures are equivalent to equal character multiplicities, exactly the anagram relation."
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
        "time": "O(n·(k log(k+1)+1))",
        "space": "O(nk+n)",
        "complexity": {
          "zh": "n 为单词数，k 为最大长度。每词排序并生成键；映射最坏保存 n 个长度 k 的键和 n 个引用。原字符串未复制；计入返回列表仍为该上界。",
          "en": "n is the word count and k the maximum length. Sorting and building each key dominate time. Up to n keys of length k and n references are stored; original strings are not copied. The bound includes result lists."
        },
        "python": "class Solution:\n    def groupAnagrams(self, strs):\n        groups = {}\n        for word in strs:\n            key = ''.join(sorted(word))\n            groups.setdefault(key, []).append(word)\n        return list(groups.values())",
        "java": "import java.util.*;\nclass Solution {\n    public List<List<String>> groupAnagrams(String[] strs) {\n        Map<String,List<String>> groups=new HashMap<>();\n        for(String word:strs) {\n            char[] chars=word.toCharArray();\n            Arrays.sort(chars);\n            String key=new String(chars);\n            groups.computeIfAbsent(key,k->new ArrayList<>()).add(word);\n        }\n        return new ArrayList<>(groups.values());\n    }\n}",
        "algorithmNotes": {
          "zh": "分组表的键只用于判断归属，不能替换输出中的原字符串。重复单词仍须逐次追加；空串排序后仍是空串，因此会自然落入同一个空串分组。",
          "en": "The sorted key identifies a group but must not replace the original word in the output. Append every occurrence, including duplicates; empty words naturally share the empty-string key."
        }
      },
      {
        "key": "frequency-key",
        "name": {
          "zh": "26 维频次签名",
          "en": "Group by 26 letter counts"
        },
        "intuition": {
          "zh": "题目把字符集限制为 26 个小写字母，因此没有必要比较字符的顺序。逐字计数后，用完整的 26 维向量标识一个组。Python 用不可变元组；Java 用带 # 分隔的计数字符串，避免 1、11 和 11、1 都拼成 111。\n\n计数向量相同等价于字符及其重数完全一致；签名包含全部 26 个位置，不会遗漏缺席字符或重复字符。",
          "en": "The alphabet has only 26 lowercase letters, so sorting is unnecessary. Count each letter and use the full 26-dimensional vector as the signature. Python uses an immutable tuple; Java separates counts with # so distinct count sequences cannot collapse into the same key. Equal vectors mean every letter has the same multiplicity. Encoding all 26 positions preserves both absent and repeated letters."
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
        "time": "O(n·(k+26)) expected",
        "space": "O(26n+n)",
        "complexity": {
          "zh": "每个字符计数一次、每词处理 26 个计数。题目限制每词至多 100 字符，Java 计数编码长度有界；保存最多 n 个签名和 n 个原词引用，未复制原字符串。",
          "en": "Count each character once and process 26 counts per word. With words limited to 100 characters, Java count encodings have bounded length. Store at most n signatures and n original-string references without copying the strings."
        },
        "python": "class Solution:\n    def groupAnagrams(self, strs):\n        groups = {}\n        for word in strs:\n            counts = [0] * 26\n            for ch in word:\n                counts[ord(ch) - ord('a')] += 1\n            key = tuple(counts)\n            groups.setdefault(key, []).append(word)\n        return list(groups.values())",
        "java": "import java.util.*;\nclass Solution {\n    public List<List<String>> groupAnagrams(String[] strs) {\n        Map<String,List<String>> groups=new HashMap<>();\n        for(String word:strs) {\n            int[] count=new int[26];\n            for(int i=0;i<word.length();i++) count[word.charAt(i)-'a']++;\n            StringBuilder key=new StringBuilder();\n            for(int v:count) key.append('#').append(v);\n            groups.computeIfAbsent(key.toString(),k->new ArrayList<>()).add(word);\n        }\n        return new ArrayList<>(groups.values());\n    }\n}",
        "algorithmNotes": {
          "zh": "每处理一个新单词，都重新创建长度 26 的计数数组，位置 ord(ch)−ord('a') 对应字母 ch。键必须记录全部位置和计数的边界，不能把数字直接无分隔拼接。",
          "en": "Create a fresh 26-entry counter for every word; ord(ch)−ord('a') selects its letter position. Encode every position and preserve count boundaries instead of concatenating unseparated numbers."
        }
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
    },
    "examples": [
      {
        "input": "strs = [\"arc\",\"car\",\"rat\",\"cra\",\"\"]",
        "output": "[[\"arc\",\"car\",\"cra\"],[\"rat\"],[\"\"]]",
        "note": {
          "zh": "这是一个合法输出，题目允许结果按其他合法顺序排列。",
          "en": "This is one valid output; other permitted result orders are accepted."
        }
      },
      {
        "input": "strs = [\"\"]",
        "output": "[[\"\"]]",
        "note": {
          "zh": "这是一个合法输出，题目允许结果按其他合法顺序排列。",
          "en": "This is one valid output; other permitted result orders are accepted."
        }
      },
      {
        "input": "strs = [\"ab\",\"ba\",\"bb\",\"b\"]",
        "output": "[[\"ab\",\"ba\"],[\"bb\"],[\"b\"]]",
        "note": {
          "zh": "这是一个合法输出，题目允许结果按其他合法顺序排列。",
          "en": "This is one valid output; other permitted result orders are accepted."
        }
      }
    ]
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
    "methods": [
      {
        "key": "sort-baseline",
        "name": {
          "zh": "排序扫描（理解基线，不满足线性要求）",
          "en": "Sort and scan (baseline; not linear)"
        },
        "intuition": {
          "zh": "排序后相差 1 的值会相邻，因此可以像统计连续相等段一样统计连续整数段。遇到重复数时跳过，遇到断层才重置长度。它易理解，但排序成本不满足本题 O(n) 要求，应继续学习哈希法。\n\n排序将每个连续值集合聚在一起，重复值被忽略，断层恰好划分不同序列。",
          "en": "Sorting makes consecutive values adjacent, allowing a run counter. Ignore duplicates and reset only when a genuine gap appears. This is an explanatory baseline; its sorting cost does not satisfy the problem’s linear-time requirement. Sorting places every consecutive run together; ignoring duplicates and splitting at gaps counts precisely those runs."
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
        "time": "O(n log n)",
        "space": "O(n)",
        "complexity": {
          "zh": "复制数组需要 O(n)；排序主导时间，扫描 O(n)。此实现不改变输入。",
          "en": "The copied array uses O(n) space; sorting dominates the O(n) scan. The input is left unchanged."
        },
        "python": "class Solution:\n    def longestConsecutive(self, nums):\n        if not nums:\n            return 0\n        a = sorted(nums)\n        run = best = 1\n        for i in range(1, len(a)):\n            if a[i] == a[i-1]:\n                continue\n            run = run + 1 if a[i] == a[i-1] + 1 else 1\n            best = max(best, run)\n        return best",
        "java": "import java.util.*;\nclass Solution {\n    public int longestConsecutive(int[] nums) {\n        if(nums.length==0) return 0;\n        int[] a=nums.clone(); Arrays.sort(a);\n        int run=1,best=1;\n        for(int i=1;i<a.length;i++) {\n            if(a[i]==a[i-1]) continue;\n            run=a[i]==a[i-1]+1 ? run+1 : 1;\n            best=Math.max(best,run);\n        }\n        return best;\n    }\n}",
        "algorithmNotes": {
          "zh": "run 表示以当前不同值结束的连续段长度，best 保存所有已完成或正在扫描的段的最大长度。重复值不改变 run，真正出现断层时才令 run=1；不能把重复数当成断层。",
          "en": "run is the length of the consecutive run ending at the current distinct value; best retains the maximum over all runs. Duplicates leave run unchanged, while a genuine gap resets it to one."
        }
      },
      {
        "key": "set-start",
        "name": {
          "zh": "只从序列起点扩展",
          "en": "Expand only from run starts"
        },
        "intuition": {
          "zh": "集合既去重又支持快速查找。关键不是“对每个数向右找”，而是只在 x−1 不存在时，从 x 向右扩展；否则它属于某个更早起点的序列。这样 [1,2,3,4] 不会分别从 1、2、3、4 重复扫描。\n\n每个非空连续段有唯一最小值，只有它启动扩展。所有值被其所属段扫描一次，不同段不重叠，所以不会漏段或重复累计工作。",
          "en": "A set removes duplicates and supports fast membership checks. Expand from x only if x−1 is absent; otherwise x belongs to a run that has an earlier start. This avoids rescanning [1,2,3,4] separately from 1, 2, 3 and 4. Every run has one smallest value, and only that value starts expansion. Runs partition the set, so all values are covered once by the expansions."
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
        "time": "O(n) expected",
        "space": "O(n)",
        "complexity": {
          "zh": "外层遍历去重集合，所有内层扩展总计不超过不同值数量；不是每个外层都扫描 n 项。哈希操作期望 O(1)。",
          "en": "The outer pass visits distinct values and all inner expansions together visit at most that many values. Expected constant-time hash operations yield linear expected time."
        },
        "python": "class Solution:\n    def longestConsecutive(self, nums):\n        values = set(nums)\n        best = 0\n        for x in values:\n            if x - 1 not in values:\n                y = x\n                while y in values:\n                    y += 1\n                best = max(best, y - x)\n        return best",
        "java": "import java.util.*;\nclass Solution {\n    public int longestConsecutive(int[] nums) {\n        Set<Integer> values=new HashSet<>();\n        for(int x:nums) values.add(x);\n        int best=0;\n        for(int x:values) if(!values.contains(x-1)) {\n            int y=x;\n            while(values.contains(y)) y++;\n            best=Math.max(best,y-x);\n        }\n        return best;\n    }\n}",
        "algorithmNotes": {
          "zh": "若 x−1 在集合中，x 不是起点，直接跳过，不启动内层循环。否则令 y=x，直到 y 首次不在集合中；此时 y 指向段末尾的下一位，段长为 y−x。",
          "en": "If x−1 is present, skip x without starting an expansion. Otherwise advance y from x until it is missing; y is one past the run, so its length is y−x."
        }
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
    },
    "examples": [
      {
        "input": "nums = [8,2,1,4,3,9]",
        "output": "4"
      },
      {
        "input": "nums = []",
        "output": "0"
      },
      {
        "input": "nums = [1,1,2]",
        "output": "2"
      }
    ]
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
    "methods": [
      {
        "key": "compact",
        "name": {
          "zh": "先压紧非零项，再补零",
          "en": "Compact nonzeros, then fill zeros"
        },
        "intuition": {
          "zh": "write 表示下一个非零元素应写入的位置。read 从左到右扫描，遇到非零才写入前缀。write 永远不超过 read，因此写入不会破坏尚未读取的数据；扫描完后，后缀里的旧值已无用，统一填零。\n\n处理任意前缀后，nums[:write] 恰好是该前缀中按原顺序排列的非零值；最后补零恢复总长度且不改变前缀。",
          "en": "write is the destination of the next nonzero value. Read left to right and copy nonzeros into the prefix. Since write never passes read, no unread data is overwritten. Once scanning ends, the remaining suffix can safely be zero-filled. After every processed prefix, nums[:write] is exactly its nonzeros in original order. Filling the suffix preserves that prefix and restores the required zero count."
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
        "time": "O(n)",
        "space": "O(1)",
        "complexity": {
          "zh": "扫描 n 项，写非零及补零总共 n 次写入；只有下标变量，没有切片或副本。",
          "en": "The scan reads n values and the two writing phases total n writes. Only indices are stored; no slices or copies are used."
        },
        "python": "class Solution:\n    def moveZeroes(self, nums):\n        write = 0\n        for read in range(len(nums)):\n            if nums[read] != 0:\n                nums[write] = nums[read]\n                write += 1\n        while write < len(nums):\n            nums[write] = 0\n            write += 1",
        "java": "class Solution {\n    public void moveZeroes(int[] nums) {\n        int write=0;\n        for(int read=0;read<nums.length;read++)\n            if(nums[read]!=0) nums[write++]=nums[read];\n        while(write<nums.length) nums[write++]=0;\n    }\n}",
        "algorithmNotes": {
          "zh": "写指针之前的区域保存了已经遇到的非零元素，且顺序与原数组一致。读完后只有尾部还需处理，把写指针到数组末尾全部填 0，不要在扫描时删除元素。",
          "en": "The prefix before the write pointer contains the nonzero values seen so far in their original order. After scanning, fill the remaining suffix with zeros; deleting entries during the scan is unnecessary."
        }
      },
      {
        "key": "swap",
        "name": {
          "zh": "非零项与首个空位交换",
          "en": "Swap into the earliest zero slot"
        },
        "intuition": {
          "zh": "维护已完成的非零前缀，以及 write 到 read 之间全是零的区域。遇到非零值时，与 write 交换，零自然被送到后方，不需要第二次补零。read==write 时无需交换，因此没有零的数组可以完全不写入。\n\n交换前 write..read−1 全为零，交换不会打乱已经完成的非零前缀；新非零总被追加在其后，故稳定。",
          "en": "Maintain a finished nonzero prefix and an all-zero region between write and read. Swapping a newly encountered nonzero into write moves a zero backward automatically, eliminating the fill pass. Skip the swap when read==write, so an already zero-free array needs no writes. Before each swap the gap contains only zeros. Appending the next nonzero after the finished prefix preserves its order and keeps the remaining gap zero-filled."
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
        "time": "O(n)",
        "space": "O(1)",
        "complexity": {
          "zh": "每个元素检查一次，每个需移动的非零最多一次交换；三个临时整数即可。",
          "en": "One inspection per element and at most one swap per moved nonzero; only constant temporary state is needed."
        },
        "python": "class Solution:\n    def moveZeroes(self, nums):\n        write = 0\n        for read in range(len(nums)):\n            if nums[read] != 0:\n                if read != write:\n                    nums[write], nums[read] = nums[read], nums[write]\n                write += 1",
        "java": "class Solution {\n    public void moveZeroes(int[] nums) {\n        int write=0;\n        for(int read=0;read<nums.length;read++) if(nums[read]!=0) {\n            if(read!=write) {int t=nums[write]; nums[write]=nums[read]; nums[read]=t;}\n            write++;\n        }\n    }\n}",
        "algorithmNotes": {
          "zh": "读指针遇到非零元素时，和最前面的待填位置交换，然后把待填位置向右移动。遇到零时只移动读指针，因此后面的非零元素会依次填补前面的空缺。",
          "en": "When the read pointer finds a nonzero value, swap it into the next output position and advance that position. On a zero, advance only the read pointer so later nonzero values fill the gaps in order."
        }
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
    },
    "examples": [
      {
        "input": "nums = [0,4,0,-2,7]",
        "output": "[4,-2,7,0,0]",
        "note": {
          "zh": "输出展示原地修改后的结构。",
          "en": "The output shows the structure after in-place modification."
        }
      },
      {
        "input": "nums = [0]",
        "output": "[0]",
        "note": {
          "zh": "输出展示原地修改后的结构。",
          "en": "The output shows the structure after in-place modification."
        }
      },
      {
        "input": "nums = [1,2]",
        "output": "[1,2]",
        "note": {
          "zh": "输出展示原地修改后的结构。",
          "en": "The output shows the structure after in-place modification."
        }
      }
    ]
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
    "methods": [
      {
        "key": "pairs",
        "name": {
          "zh": "枚举边界（基线）",
          "en": "Enumerate boundaries (baseline)"
        },
        "intuition": {
          "zh": "面积依赖宽度和短板，两者缺一不可。不能直接选最高两条线，因为它们可能挨得很近。最直接的方法尝试所有左右边界，以公式计算每个候选，作为验证快速方法的基线。\n\n任何可行容器都由唯一的一对不同下标确定，枚举覆盖所有候选。",
          "en": "Both width and the shorter height matter. The two tallest lines may be too close together. Enumerating every boundary pair applies the area formula directly and provides a baseline for checking the faster method. Every feasible container has a unique pair of distinct boundaries, all of which are enumerated."
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
        "time": "O(n²)",
        "space": "O(1)",
        "complexity": {
          "zh": "n(n−1)/2 次常数计算，仅记录最大值；大规模会慢，推荐下一方法。",
          "en": "There are n(n−1)/2 constant-time evaluations and a single running maximum. Use the next method for large inputs."
        },
        "python": "class Solution:\n    def maxArea(self, height):\n        best = 0\n        for i in range(len(height)):\n            for j in range(i+1, len(height)):\n                best = max(best, (j-i)*min(height[i], height[j]))\n        return best",
        "java": "class Solution {\n    public int maxArea(int[] height) {\n        int best=0;\n        for(int i=0;i<height.length;i++) for(int j=i+1;j<height.length;j++)\n            best=Math.max(best,(j-i)*Math.min(height[i],height[j]));\n        return best;\n    }\n}",
        "algorithmNotes": {
          "zh": "一对边界的盛水量由较短柱高乘以两柱下标差得到，宽度不是柱子数量。逐一计算每个 i<j 的面积并更新最大值，不需要把中间柱子的高度加入公式。",
          "en": "For each i<j, multiply the shorter height by j−i, the horizontal distance rather than the number of bars. Update the maximum area; intermediate heights do not enter the formula."
        }
      },
      {
        "key": "two-pointers",
        "name": {
          "zh": "双指针淘汰短板",
          "en": "Discard the shorter boundary"
        },
        "intuition": {
          "zh": "从最宽的区间开始。若左边较矮，保持左边只移动右边会让宽度变小，且高度仍不超过左边，所以不可能超过当前面积。于是可以一次淘汰这个左边界，而不是试完它的所有配对。相等时移任意一边都安全。\n\n每次删除的边界与剩余任一边界配对都不优于已经检查的当前容器，故被删除的候选不可能改善答案。",
          "en": "Begin with maximum width. If the left boundary is shorter, keeping it while moving the right boundary inward only decreases width and cannot raise the limiting height. All remaining pairs using that left boundary are therefore dominated by the current pair. Equal heights allow either boundary to be discarded. Every discarded boundary can only form areas no larger than the currently evaluated container with the remaining boundaries, so no improvement is lost."
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
        "time": "O(n)",
        "space": "O(1)",
        "complexity": {
          "zh": "每轮区间长度减一，至多 n−1 轮；只保存边界和最大面积。",
          "en": "The interval shrinks by one each iteration, for at most n−1 iterations, using constant state."
        },
        "python": "class Solution:\n    def maxArea(self, height):\n        left, right, best = 0, len(height)-1, 0\n        while left < right:\n            best = max(best, (right-left)*min(height[left], height[right]))\n            if height[left] <= height[right]:\n                left += 1\n            else:\n                right -= 1\n        return best",
        "java": "class Solution {\n    public int maxArea(int[] h) {\n        int l=0,r=h.length-1,best=0;\n        while(l<r) {\n            best=Math.max(best,(r-l)*Math.min(h[l],h[r]));\n            if(h[l]<=h[r]) l++; else r--;\n        }\n        return best;\n    }\n}",
        "algorithmNotes": {
          "zh": "每轮先用当前左右端点更新答案，再移动较短的一侧。移动较高一侧只会减小宽度而无法抬高当前短板；两侧等高时移动任意一侧即可，直到两指针相遇。",
          "en": "Update the answer before moving the shorter side. Moving only the taller side reduces width without raising the limiting height; if both heights are equal either side may move, until the pointers meet."
        }
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
    },
    "examples": [
      {
        "input": "height = [2,5,3,4]",
        "output": "8"
      },
      {
        "input": "height = [0,0]",
        "output": "0"
      },
      {
        "input": "height = [7,7]",
        "output": "7"
      }
    ]
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
    "methods": [
      {
        "key": "hash",
        "name": {
          "zh": "固定一个数，哈希寻找另外两个",
          "en": "Fix one value and hash the other pair"
        },
        "intuition": {
          "zh": "枚举第一个位置 i 后，剩下变成目标为 −nums[i] 的两数之和。seen 只记录 i 之后已经扫描的位置，保证三个下标不同。相同值组合可能从不同 i 找到，把三元组内部排序后放入集合统一去重。\n\n任一合法下标三元组按最小下标固定 i；扫描最大下标时，中间的值已入表。集合只合并值相同的答案，不会删除不同答案。",
          "en": "Fixing i reduces the rest to two-sum with target −nums[i]. seen contains only previously scanned positions after i, ensuring distinct indices. Different choices of i can discover the same value triplet, so sort each three-item result and deduplicate it in a set. Fixing the smallest index of any valid triple finds its middle value in seen when the largest index is scanned. Canonical tuple deduplication removes only identical value answers."
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
        "time": "O(n²) expected",
        "space": "O(n+R)",
        "complexity": {
          "zh": "两层扫描 O(n²)，排序固定三个值是 O(1)。seen 最多 n 项，结果集合及返回列表共 O(R)，R 是不同答案数。",
          "en": "Two nested scans give expected O(n²); sorting three values is constant time. The seen set uses O(n), and the result set plus returned lists use O(R) for R triplets."
        },
        "python": "class Solution:\n    def threeSum(self, nums):\n        answers = set()\n        for i in range(len(nums)-2):\n            seen = set()\n            for j in range(i+1, len(nums)):\n                need = -nums[i] - nums[j]\n                if need in seen:\n                    answers.add(tuple(sorted((nums[i], need, nums[j]))))\n                seen.add(nums[j])\n        return [list(t) for t in answers]",
        "java": "import java.util.*;\nclass Solution {\n    public List<List<Integer>> threeSum(int[] nums) {\n        Set<List<Integer>> ans=new HashSet<>();\n        for(int i=0;i<nums.length-2;i++) {\n            Set<Integer> seen=new HashSet<>();\n            for(int j=i+1;j<nums.length;j++) {\n                int need=-nums[i]-nums[j];\n                if(seen.contains(need)) {\n                    int[] t={nums[i],need,nums[j]}; Arrays.sort(t);\n                    ans.add(Arrays.asList(t[0],t[1],t[2]));\n                }\n                seen.add(nums[j]);\n            }\n        }\n        return new ArrayList<>(ans);\n    }\n}",
        "algorithmNotes": {
          "zh": "固定一个数后，把剩余问题看成目标值为其相反数的两数之和。每轮固定位置都要清空 seen；命中时对三个值排序形成规范元组，再用集合去除由重复数产生的相同三元组。",
          "en": "For each fixed value, solve a two-sum problem for its negation using a fresh seen set. Sort every matched triple into a canonical tuple and store it in a result set to eliminate duplicate value triples."
        }
      },
      {
        "key": "sorted-pointers",
        "name": {
          "zh": "排序与双指针，遍历时去重",
          "en": "Sort and use two pointers with skip-based deduplication"
        },
        "intuition": {
          "zh": "排序后固定最左值，另外两个指针夹住后缀。和偏小只能通过增大左值尝试修正；和偏大就减小右值。与哈希法的“找到后再去重”不同，重复的固定值以及命中后的相同左右值直接跳过，避免重复生成答案。\n\n有序性保证被淘汰的一整行或一整列配对不可能达到零；相同固定值和相同命中值仅会产生重复三元组。",
          "en": "After sorting, fix the first value and bracket the suffix with two pointers. A sum that is too small requires a larger left value; a sum that is too large requires a smaller right value. Skip duplicate fixed values and repeated pointer values after a hit, preventing duplicate answers from being generated. Sorted order makes every discarded row or column of pairs unable to reach zero. Reusing the same fixed or matched values would only reproduce an existing triplet."
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
        "time": "O(n²)",
        "space": "O(n+R)",
        "complexity": {
          "zh": "排序副本 O(n)，每个固定位置的双指针总移动 O(n)，合计 O(n²)；R 个答案另占 O(R)。",
          "en": "The sorted copy costs O(n) space. Each fixed position has a linear pointer scan, totaling O(n²). R output triplets add O(R) space."
        },
        "python": "class Solution:\n    def threeSum(self, nums):\n        a = sorted(nums)\n        ans = []\n        for i in range(len(a)-2):\n            if i and a[i] == a[i-1]:\n                continue\n            l, r = i+1, len(a)-1\n            while l < r:\n                total = a[i] + a[l] + a[r]\n                if total < 0:\n                    l += 1\n                elif total > 0:\n                    r -= 1\n                else:\n                    ans.append([a[i], a[l], a[r]])\n                    x, y = a[l], a[r]\n                    while l < r and a[l] == x: l += 1\n                    while l < r and a[r] == y: r -= 1\n        return ans",
        "java": "import java.util.*;\nclass Solution {\n    public List<List<Integer>> threeSum(int[] nums) {\n        int[] a=nums.clone(); Arrays.sort(a);\n        List<List<Integer>> ans=new ArrayList<>();\n        for(int i=0;i<a.length-2;i++) {\n            if(i>0 && a[i]==a[i-1]) continue;\n            int l=i+1,r=a.length-1;\n            while(l<r) {\n                int sum=a[i]+a[l]+a[r];\n                if(sum<0) l++;\n                else if(sum>0) r--;\n                else {\n                    ans.add(Arrays.asList(a[i],a[l],a[r]));\n                    int x=a[l],y=a[r];\n                    while(l<r && a[l]==x) l++;\n                    while(l<r && a[r]==y) r--;\n                }\n            }\n        }\n        return ans;\n    }\n}",
        "algorithmNotes": {
          "zh": "固定位置遇到与前一个相同的值时跳过，避免重复起点。三数和过小就右移左指针，过大就左移右指针；命中后两侧都跨过相等值，确保同一个值组合只输出一次。",
          "en": "Skip duplicate fixed values. Increase the left pointer when the sum is too small and decrease the right pointer when it is too large; after a match, skip equal values on both sides to avoid duplicate triples."
        }
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
    },
    "examples": [
      {
        "input": "nums = [-2,0,2,1,1]",
        "output": "[[-2,0,2],[-2,1,1]]",
        "note": {
          "zh": "这是一个合法输出，题目允许结果按其他合法顺序排列。",
          "en": "This is one valid output; other permitted result orders are accepted."
        }
      },
      {
        "input": "nums = [0,0,0,0]",
        "output": "[[0,0,0]]",
        "note": {
          "zh": "这是一个合法输出，题目允许结果按其他合法顺序排列。",
          "en": "This is one valid output; other permitted result orders are accepted."
        }
      },
      {
        "input": "nums = [1,2,3]",
        "output": "[]",
        "note": {
          "zh": "这是一个合法输出，题目允许结果按其他合法顺序排列。",
          "en": "This is one valid output; other permitted result orders are accepted."
        }
      }
    ]
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
    "methods": [
      {
        "key": "prefix-max",
        "name": {
          "zh": "预计算左右最高柱",
          "en": "Precompute maxima on both sides"
        },
        "intuition": {
          "zh": "某位置能达到的水面由左侧最高墙与右侧最高墙中较矮的一个决定。减去当前位置柱高就是水深。把两边最大值提前算好，避免每个位置都向两边重新搜索；最大值包含当前柱子，水深不会为负。\n\n水面高于任一侧最高墙就会流走，达到较矮最高墙时两侧都有足够挡板，所以公式既是上界也是可达到的水量。",
          "en": "A position’s water level is limited by the shorter of its tallest left and right walls. Subtract its own height to get water depth. Precompute both maxima to avoid repeated searches. Including the current bar in each maximum ensures nonnegative depth. Water above either side’s maximum would escape. At the smaller maximum both sides provide a wall, so this bound is achievable at each position."
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
        "time": "O(n)",
        "space": "O(n)",
        "complexity": {
          "zh": "左右数组各 n 项，三次线性遍历；输出是一个整数。",
          "en": "Two length-n arrays and three linear scans; the result is one integer."
        },
        "python": "class Solution:\n    def trap(self, height):\n        n = len(height)\n        left, right = [0]*n, [0]*n\n        left[0], right[-1] = height[0], height[-1]\n        for i in range(1, n): left[i] = max(left[i-1], height[i])\n        for i in range(n-2, -1, -1): right[i] = max(right[i+1], height[i])\n        return sum(min(left[i], right[i])-height[i] for i in range(n))",
        "java": "class Solution {\n    public int trap(int[] h) {\n        int n=h.length,ans=0;\n        int[] left=new int[n],right=new int[n];\n        left[0]=h[0]; right[n-1]=h[n-1];\n        for(int i=1;i<n;i++) left[i]=Math.max(left[i-1],h[i]);\n        for(int i=n-2;i>=0;i--) right[i]=Math.max(right[i+1],h[i]);\n        for(int i=0;i<n;i++) ans+=Math.min(left[i],right[i])-h[i];\n        return ans;\n    }\n}",
        "algorithmNotes": {
          "zh": "left[i] 和 right[i] 分别记录从两端到 i 的最高柱，可包含当前位置。位置 i 的水面由两侧最大值中较低者决定，减去 height[i] 后累加；两端自然贡献 0。",
          "en": "left[i] and right[i] store the maximum height from each end through i. The lower of these maxima sets the water level; subtract height[i] and accumulate, with the two ends contributing zero."
        }
      },
      {
        "key": "two-maxima",
        "name": {
          "zh": "双指针结算较低水位一侧",
          "en": "Two pointers settle the lower known maximum"
        },
        "intuition": {
          "zh": "维护当前左侧最高墙 lm 与右侧最高墙 rm。若 lm≤rm，左位置右方已确定存在至少 rm 高的墙，所以它的真实右最高值不可能成为更低限制；该位置可以立即按 lm 结算。无需知道中间所有墙的高度。另一侧完全对称。\n\n每次被结算位置的一侧全局最大值已知，另一侧存在不低于它的挡板，因此与左右最大值公式完全一致。每个位置只结算一次。",
          "en": "Maintain the maximum seen from the left, lm, and from the right, rm. When lm≤rm, the current left position already has a right wall at least rm high, so the unknown interior cannot lower its limiting level below lm. Settle that position immediately; the other case is symmetric. For each settled position one side’s maximum is known and the opposite side has an adequate wall. Its contribution equals the two-maxima formula, and each position is counted once."
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
        "time": "O(n)",
        "space": "O(1)",
        "complexity": {
          "zh": "每轮移动一个指针，共 n 轮；只维护两个最高值、两个指针和总和。",
          "en": "Exactly one pointer moves each round, yielding n rounds and constant working state."
        },
        "python": "class Solution:\n    def trap(self, height):\n        l, r = 0, len(height)-1\n        lm = rm = ans = 0\n        while l <= r:\n            lm, rm = max(lm, height[l]), max(rm, height[r])\n            if lm <= rm:\n                ans += lm-height[l]\n                l += 1\n            else:\n                ans += rm-height[r]\n                r -= 1\n        return ans",
        "java": "class Solution {\n    public int trap(int[] h) {\n        int l=0,r=h.length-1,lm=0,rm=0,ans=0;\n        while(l<=r) {\n            lm=Math.max(lm,h[l]); rm=Math.max(rm,h[r]);\n            if(lm<=rm) {ans+=lm-h[l]; l++;}\n            else {ans+=rm-h[r]; r--;}\n        }\n        return ans;\n    }\n}",
        "algorithmNotes": {
          "zh": "左右最大高度记录已扫描边界提供的挡板。当左最大值较小时，左侧水量已能确定，因为右边至少有同样高的挡板；结算左位置后推进左指针，右侧较小时对称处理。",
          "en": "The running maxima represent the boundary walls already seen. When the left maximum is smaller, it determines the left position's water because the right wall is high enough; settle that position and advance left, or handle right symmetrically."
        }
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
    },
    "examples": [
      {
        "input": "height = [3,0,2,0,4]",
        "output": "7"
      },
      {
        "input": "height = [0]",
        "output": "0"
      },
      {
        "input": "height = [5,4,3]",
        "output": "0"
      }
    ]
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
    "methods": [
      {
        "key": "set-window",
        "name": {
          "zh": "集合窗口，逐个移除重复前缀",
          "en": "Set window with incremental shrinking"
        },
        "intuition": {
          "zh": "集合保存当前窗口中的字符。新字符已在集合时，必须从左端逐个删除，直到旧副本被移出，再加入新字符。不能直接清空整个窗口，因为旧副本之后的无重复后缀仍然有价值。\n\n加入新字符后窗口恰好是当前右端结尾的最长无重复后缀；任何更靠左起点都会保留冲突字符，因此无需检查。",
          "en": "A set holds the current window’s characters. If the incoming character already exists, remove characters from the left until the old copy is gone. Do not clear the whole window: the duplicate-free suffix after that copy remains useful. After insertion the window is the longest duplicate-free suffix ending at the current right boundary. Any earlier start would retain a duplicate and cannot be valid."
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
        "time": "O(n) expected",
        "space": "O(min(n,Σ))",
        "complexity": {
          "zh": "两指针只前进，每个字符至多入集合、出集合一次；Σ 为字符集大小，集合最多保存 min(n,Σ) 项。",
          "en": "Both pointers advance only; each character enters and leaves at most once. The set holds at most min(n,Σ) characters for alphabet size Σ."
        },
        "python": "class Solution:\n    def lengthOfLongestSubstring(self, s):\n        seen = set()\n        left = best = 0\n        for right, ch in enumerate(s):\n            while ch in seen:\n                seen.remove(s[left])\n                left += 1\n            seen.add(ch)\n            best = max(best, right-left+1)\n        return best",
        "java": "import java.util.*;\nclass Solution {\n    public int lengthOfLongestSubstring(String s) {\n        Set<Character> seen=new HashSet<>();\n        int left=0,best=0;\n        for(int right=0;right<s.length();right++) {\n            char ch=s.charAt(right);\n            while(seen.contains(ch)) seen.remove(s.charAt(left++));\n            seen.add(ch); best=Math.max(best,right-left+1);\n        }\n        return best;\n    }\n}",
        "algorithmNotes": {
          "zh": "集合只保存当前窗口内的字符。右侧新字符已在集合中时，必须不断删除左端并移动左边界，直到重复消失；然后加入新字符，用包含两端的窗口长度更新最大值。",
          "en": "The set represents exactly the current window. If the next character is already present, repeatedly remove the leftmost character and advance left until the duplicate disappears; then insert the character and update the inclusive window length."
        }
      },
      {
        "key": "last-index",
        "name": {
          "zh": "最近位置表，左边界直接跳跃",
          "en": "Jump left using last-seen indices"
        },
        "intuition": {
          "zh": "用 last[ch] 记录字符最近出现的位置。重复时左边界可直接跳到旧位置之后，而不用逐个删除。关键是取 max(left,last[ch]+1)：旧出现位置可能早已在窗口外，左边界不能后退，例如 abba 最后的 a。\n\n窗口原本无重复，新增字符只可能与它自己的旧副本冲突；跳过旧副本且不后退左端，正好排除唯一新增冲突。",
          "en": "Store each character’s latest index. A repeat lets left jump directly past the old occurrence rather than removing characters one by one. Use max(left,last[ch]+1), since the previous occurrence may already lie outside the window; moving left backward would reintroduce duplicates, as in abba. The old window is duplicate-free, so the new character can conflict only with its own previous copy. Jumping past it without moving backward removes exactly that new conflict."
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
        "time": "O(n) expected",
        "space": "O(min(n,Σ))",
        "complexity": {
          "zh": "每个位置一次映射查询和更新；表存每种已见字符的一个位置，不存整段字符串。",
          "en": "One lookup and update per position; the map stores a single index per distinct character rather than substrings."
        },
        "python": "class Solution:\n    def lengthOfLongestSubstring(self, s):\n        last = {}\n        left = best = 0\n        for right, ch in enumerate(s):\n            left = max(left, last.get(ch, -1)+1)\n            last[ch] = right\n            best = max(best, right-left+1)\n        return best",
        "java": "import java.util.*;\nclass Solution {\n    public int lengthOfLongestSubstring(String s) {\n        Map<Character,Integer> last=new HashMap<>();\n        int left=0,best=0;\n        for(int right=0;right<s.length();right++) {\n            char ch=s.charAt(right);\n            left=Math.max(left,last.getOrDefault(ch,-1)+1);\n            last.put(ch,right); best=Math.max(best,right-left+1);\n        }\n        return best;\n    }\n}",
        "algorithmNotes": {
          "zh": "映射记录字符上一次出现的下标，不需要随左边界删除。遇到重复字符时把 left 更新为 max(left,last[ch]+1)，防止很早以前的重复位置把窗口左边界拉回去。",
          "en": "Keep each character's latest index even after it leaves the window. Update left to max(left,last[ch]+1) on a repeat so an occurrence outside the current window cannot move the boundary backward."
        }
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
    },
    "examples": [
      {
        "input": "s = \"abcaef\"",
        "output": "5"
      },
      {
        "input": "s = \"\"",
        "output": "0"
      },
      {
        "input": "s = \"abba\"",
        "output": "2"
      }
    ]
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
    "methods": [
      {
        "key": "recount",
        "name": {
          "zh": "每个定长窗口重新计数（基线）",
          "en": "Recount each fixed window (baseline)"
        },
        "intuition": {
          "zh": "异位词的长度必须相同，所以只枚举长度 m=|p| 的窗口。为每个窗口统计 26 个字母，再与 p 的统计比较。这比枚举任意子串清晰，但相邻窗口重复统计了 m−1 个字符。\n\n每个合法答案都位于一个长度 m 的窗口中，频次逐项相等是异位词的充要条件。",
          "en": "Anagrams have equal length, so inspect only windows of size m=len(p). Count 26 letters in each window and compare with p’s counts. This avoids arbitrary substring lengths but recounts m−1 shared characters between adjacent windows. Every match is a length-m window, and equality of all letter counts is necessary and sufficient for being an anagram."
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
        "time": "O(m+(n−m+1)·(m+26)) if n≥m",
        "space": "O(26+R)",
        "complexity": {
          "zh": "n=|s|、m=|p|。n<m 时直接返回；否则每窗口重新扫描 m 项。R 为输出下标数，计数数组只占常数空间。",
          "en": "n=len(s), m=len(p). Return immediately if n<m; otherwise each candidate recounts m characters. R is the number of output indices, while count arrays use fixed space."
        },
        "python": "class Solution:\n    def findAnagrams(self, s, p):\n        n, m = len(s), len(p)\n        if n < m: return []\n        need = [0]*26\n        for ch in p: need[ord(ch)-97] += 1\n        ans = []\n        for left in range(n-m+1):\n            have = [0]*26\n            for j in range(left, left+m): have[ord(s[j])-97] += 1\n            if have == need: ans.append(left)\n        return ans",
        "java": "import java.util.*;\nclass Solution {\n    public List<Integer> findAnagrams(String s,String p) {\n        List<Integer> ans=new ArrayList<>(); int n=s.length(),m=p.length();\n        if(n<m) return ans;\n        int[] need=new int[26];\n        for(int j=0;j<m;j++) need[p.charAt(j)-'a']++;\n        for(int l=0;l+m<=n;l++) {\n            int[] have=new int[26];\n            for(int j=l;j<l+m;j++) have[s.charAt(j)-'a']++;\n            if(Arrays.equals(need,have)) ans.add(l);\n        }\n        return ans;\n    }\n}",
        "algorithmNotes": {
          "zh": "候选窗口长度必须恰好等于 p 的长度，过短或过长都不可能是异位词。为每个候选重新统计 26 个字母频次，与 p 的计数逐项比较，相同则记录窗口起点。",
          "en": "Every candidate window must have exactly the length of p. Recount its 26 letter frequencies and compare them with p's counts; record the starting index only when all frequencies match."
        }
      },
      {
        "key": "rolling-count",
        "name": {
          "zh": "定长滑动窗口复用频次",
          "en": "Reuse counts in a fixed sliding window"
        },
        "intuition": {
          "zh": "相邻窗口只差一个离开的字符和一个进入的字符。维护当前窗口频次，右端每前进一格加一；窗口过长时将最左字符减一。长度恰好 m 后比较 26 个计数，重复字符和重叠匹配自然被处理。\n\n每轮完成增减后计数恰好描述最后 m 个字符；对每个完整窗口都检查一次，所以不漏且不重。",
          "en": "Adjacent windows differ by just one outgoing and one incoming character. Increment the entering count and decrement the leaving count once the window is too long. Compare the 26 counts only when a full length-m window exists. This naturally handles repeated letters and overlapping matches. After each update the counts describe exactly the latest m characters. Every complete window is checked once, producing all and only valid starts."
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
        "time": "O(n+m)",
        "space": "O(26+R)",
        "complexity": {
          "zh": "每个字符至多进入、离开一次，每次比较固定 26 项；R 个返回下标另计。",
          "en": "Each character enters and leaves at most once; comparing a fixed 26-element alphabet is constant time. The R returned indices are counted separately."
        },
        "python": "class Solution:\n    def findAnagrams(self, s, p):\n        n, m = len(s), len(p)\n        if n < m: return []\n        need, have = [0]*26, [0]*26\n        for ch in p: need[ord(ch)-97] += 1\n        ans = []\n        for r, ch in enumerate(s):\n            have[ord(ch)-97] += 1\n            if r >= m: have[ord(s[r-m])-97] -= 1\n            if r >= m-1 and have == need: ans.append(r-m+1)\n        return ans",
        "java": "import java.util.*;\nclass Solution {\n    public List<Integer> findAnagrams(String s,String p) {\n        List<Integer> ans=new ArrayList<>(); int n=s.length(),m=p.length();\n        if(n<m) return ans;\n        int[] need=new int[26],have=new int[26];\n        for(int i=0;i<m;i++) need[p.charAt(i)-'a']++;\n        for(int r=0;r<n;r++) {\n            have[s.charAt(r)-'a']++;\n            if(r>=m) have[s.charAt(r-m)-'a']--;\n            if(r>=m-1 && Arrays.equals(need,have)) ans.add(r-m+1);\n        }\n        return ans;\n    }\n}",
        "algorithmNotes": {
          "zh": "滑动时只改变两个字符的计数：把离开左端的字符减一，把新进入右端的字符加一。窗口长度达到 p 的长度后再比较计数；p 比 s 长时没有候选窗口，返回空列表。",
          "en": "Sliding changes only two counts: decrement the outgoing character and increment the incoming one. Compare counts only for a full-length window; if p is longer than s, return an empty list."
        }
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
    },
    "examples": [
      {
        "input": "s = \"abbac\", p = \"ab\"",
        "output": "[0,2]"
      },
      {
        "input": "s = \"a\", p = \"aa\"",
        "output": "[]"
      },
      {
        "input": "s = \"aaaa\", p = \"aa\"",
        "output": "[0,1,2]"
      }
    ]
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
    "methods": [
      {
        "key": "enumerate",
        "name": {
          "zh": "固定起点累加（基线）",
          "en": "Accumulate from each start (baseline)"
        },
        "intuition": {
          "zh": "固定左端后向右逐个累加，不必每次重新求整个区间的和。注意和大于 k 也不能提前停止，因为后面可能出现负数把它降回来；这也是普通“和太大就缩窗”在本题失效的原因。\n\n所有非空区间由其左右端点唯一确定，算法恰好计算每对端点一次。",
          "en": "Fix a start and extend the endpoint while maintaining a running sum. Even when the sum exceeds k, do not stop: later negative values may reduce it. This also explains why an ordinary sum-based shrinking window is invalid here. Each nonempty subarray has one pair of endpoints, and the algorithm evaluates every pair once."
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
        "time": "O(n²)",
        "space": "O(1)",
        "complexity": {
          "zh": "区间数为 n(n+1)/2，每个扩展仅一次加法；不存前缀数组或结果区间。",
          "en": "There are n(n+1)/2 intervals and one addition per extension. No prefix array or interval list is stored."
        },
        "python": "class Solution:\n    def subarraySum(self, nums, k):\n        ans = 0\n        for left in range(len(nums)):\n            total = 0\n            for right in range(left, len(nums)):\n                total += nums[right]\n                if total == k: ans += 1\n        return ans",
        "java": "class Solution {\n    public int subarraySum(int[] nums,int k) {\n        int ans=0;\n        for(int l=0;l<nums.length;l++) {\n            int total=0;\n            for(int r=l;r<nums.length;r++) {\n                total+=nums[r]; if(total==k) ans++;\n            }\n        }\n        return ans;\n    }\n}",
        "algorithmNotes": {
          "zh": "固定左端后把 sum 清零，再逐个延长右端并累加新元素，不必为每段重新求和。即使当前 sum 已大于 k 也不能提前停止，因为后面的负数可能使总和重新等于 k。",
          "en": "Reset sum for each left endpoint, then extend the right endpoint by adding one new value at a time. Do not stop when sum exceeds k: a later negative value can bring it back to k."
        }
      },
      {
        "key": "prefix-frequency",
        "name": {
          "zh": "前缀和与出现次数表",
          "en": "Prefix sums with occurrence counts"
        },
        "intuition": {
          "zh": "设当前前缀和为 S，要使某段和为 k，需要一个更早的前缀和 S−k。相同前缀和可能出现多次，每次都对应不同起点，所以表必须存次数而不是布尔值。预置 0:1 代表空前缀，才能统计从下标 0 开始的区间。\n\n查询的每个旧前缀对应一个且仅一个当前右端结尾的合法非空区间；按右端遍历把所有答案分成不相交的组。",
          "en": "For current prefix sum S, a subarray sums to k exactly when an earlier prefix equals S−k. Repeated prefix sums correspond to distinct starts, so store counts rather than existence. Initialize 0:1 for the empty prefix so ranges beginning at index zero are included. Each counted earlier prefix corresponds to exactly one valid nonempty subarray ending here. Grouping answers by endpoint counts all of them without duplication."
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
        "time": "O(n) expected",
        "space": "O(n)",
        "complexity": {
          "zh": "n 次哈希查找及更新，最多 n+1 种前缀和。负数不影响前缀差公式。",
          "en": "There are n hash lookups and updates and at most n+1 distinct prefix sums. Negative values do not affect the prefix-difference identity."
        },
        "python": "class Solution:\n    def subarraySum(self, nums, k):\n        freq = {0: 1}\n        prefix = ans = 0\n        for x in nums:\n            prefix += x\n            ans += freq.get(prefix-k, 0)\n            freq[prefix] = freq.get(prefix, 0)+1\n        return ans",
        "java": "import java.util.*;\nclass Solution {\n    public int subarraySum(int[] nums,int k) {\n        Map<Integer,Integer> freq=new HashMap<>(); freq.put(0,1);\n        int prefix=0,ans=0;\n        for(int x:nums) {\n            prefix+=x; ans+=freq.getOrDefault(prefix-k,0);\n            freq.put(prefix,freq.getOrDefault(prefix,0)+1);\n        }\n        return ans;\n    }\n}",
        "algorithmNotes": {
          "zh": "先放入频次 {0:1}，表示数组开始前的空前缀。每读一个数形成新前缀 s，先把 freq[s−k] 加入答案，再增加 freq[s]；频次而非是否存在，才能统计相同前缀形成的多个区间。",
          "en": "Initialize frequencies with {0:1} for the empty prefix. For each new prefix sum s, add freq[s−k] before incrementing freq[s]; storing counts rather than membership captures multiple intervals with the same prefix sum."
        }
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
    },
    "examples": [
      {
        "input": "nums = [2,-1,2], k = 1",
        "output": "2"
      },
      {
        "input": "nums = [0,0,0], k = 0",
        "output": "6"
      },
      {
        "input": "nums = [-1], k = -1",
        "output": "1"
      }
    ]
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
    "methods": [
      {
        "key": "scan",
        "name": {
          "zh": "逐窗口扫描（基线）",
          "en": "Scan every window (baseline)"
        },
        "intuition": {
          "zh": "窗口最大值不能仅靠旧最大值与新元素比较：如果旧最大值离开窗口，就需要重新知道次大值。基线方法干脆对每个窗口完整扫描，逻辑简单且适合对照验证，但窗口较大时重复工作很多。\n\n每个窗口所有元素均参与比较，所得最大值精确；窗口顺序与输出顺序一致。",
          "en": "Comparing only the old maximum and the entering value fails when the old maximum leaves: a replacement must be known. The baseline rescans every window completely. It is simple and useful as a reference, but repeats much work for large windows. Every element in each window is compared, so its maximum is exact and outputs follow window order."
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
        "time": "O((n−k+1)·k)",
        "space": "O(1) auxiliary; O(n−k+1) output",
        "complexity": {
          "zh": "不做数组切片，辅助空间为常数；返回数组单独占 n−k+1 项。",
          "en": "No slices are created, so working space is constant. The returned array contains n−k+1 items."
        },
        "python": "class Solution:\n    def maxSlidingWindow(self, nums, k):\n        ans = []\n        for left in range(len(nums)-k+1):\n            best = nums[left]\n            for j in range(left+1, left+k): best = max(best, nums[j])\n            ans.append(best)\n        return ans",
        "java": "class Solution {\n    public int[] maxSlidingWindow(int[] nums,int k) {\n        int[] ans=new int[nums.length-k+1];\n        for(int l=0;l<ans.length;l++) {\n            int best=nums[l];\n            for(int j=l+1;j<l+k;j++) best=Math.max(best,nums[j]);\n            ans[l]=best;\n        }\n        return ans;\n    }\n}",
        "algorithmNotes": {
          "zh": "每个完整窗口从起点 i 到 i+k−1，单独扫描这 k 个值取最大值。窗口数量为 n−k+1；k=1 时每个元素自身就是结果，不能额外生成不完整的尾部窗口。",
          "en": "For each start i, scan exactly k values through i+k−1 and take their maximum. There are n−k+1 full windows; when k=1 every value is its own result, with no incomplete tail windows added."
        }
      },
      {
        "key": "deque",
        "name": {
          "zh": "单调双端队列维护候选",
          "en": "Monotonic deque of candidates"
        },
        "intuition": {
          "zh": "队列存下标，并保持对应数值从大到小。新值比队尾大或相等时，队尾更早过期且不更大，在未来任何共同窗口都不可能胜出，因此可淘汰。队首另按下标删除过期项；不能只存数值，否则无法知道何时离窗。\n\n队列保留所有尚可能成为最大值的候选，按值递减且下标递增；被丢弃者有更晚且不小的替代者，所以队首必是当前最大值。",
          "en": "Store indices whose values decrease from front to back. If a new value is at least the tail’s value, the tail expires earlier and is never better in any future shared window, so remove it. Separately expire indices at the front; values alone cannot identify when an item leaves. The deque keeps every potentially useful candidate in decreasing value and increasing index order. Each discarded candidate has a later no-smaller substitute, making the front the current maximum."
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
        "time": "O(n)",
        "space": "O(k) auxiliary; O(n−k+1) output",
        "complexity": {
          "zh": "每个下标入队一次、出队至多一次，while 循环的总次数 O(n)，不是每轮 O(k)。",
          "en": "Each index enters once and leaves at most once. All while-loop iterations together are O(n), not O(k) per element."
        },
        "python": "from collections import deque\nclass Solution:\n    def maxSlidingWindow(self, nums, k):\n        q, ans = deque(), []\n        for r, x in enumerate(nums):\n            while q and q[0] <= r-k: q.popleft()\n            while q and nums[q[-1]] <= x: q.pop()\n            q.append(r)\n            if r >= k-1: ans.append(nums[q[0]])\n        return ans",
        "java": "import java.util.*;\nclass Solution {\n    public int[] maxSlidingWindow(int[] nums,int k) {\n        Deque<Integer> q=new ArrayDeque<>();\n        int[] ans=new int[nums.length-k+1];\n        for(int r=0;r<nums.length;r++) {\n            while(!q.isEmpty() && q.peekFirst()<=r-k) q.removeFirst();\n            while(!q.isEmpty() && nums[q.peekLast()]<=nums[r]) q.removeLast();\n            q.addLast(r);\n            if(r>=k-1) ans[r-k+1]=nums[q.peekFirst()];\n        }\n        return ans;\n    }\n}",
        "algorithmNotes": {
          "zh": "队列存下标而非数值，才能判断队首是否已离开窗口。新值入队前从队尾删除不大于它的旧值，因为新值更大且更晚过期；窗口形成后队首对应的值就是最大值。",
          "en": "Store indices so expired entries can be removed from the front. Before appending a new index, remove tail entries no larger than its value: the new value is at least as large and expires later; the front gives each full window's maximum."
        }
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
    },
    "examples": [
      {
        "input": "nums = [2,1,3,0,4], k = 3",
        "output": "[3,3,4]"
      },
      {
        "input": "nums = [7], k = 1",
        "output": "[7]"
      },
      {
        "input": "nums = [3,3,3], k = 2",
        "output": "[3,3]"
      }
    ]
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
    "methods": [
      {
        "key": "enumerate",
        "name": {
          "zh": "枚举起点，扩到首次覆盖（基线）",
          "en": "Extend each start until covered (baseline)"
        },
        "intuition": {
          "zh": "对每个左端点，从空频次数组开始向右扩展；首次覆盖就是该左端的最短可行窗口，后面只会更长，可以停止这一轮。覆盖不是“字符出现过”，而是每个所需字符计数都足够，例如 t=AAB 必须有两个 A。\n\n任意最优窗口都有一个起点；该起点首次覆盖的窗口不会比它长，枚举所有起点就包含全局最优。",
          "en": "For each start, build counts while extending right. Its first covering window is the shortest for that start, so further extension is unnecessary. Coverage requires multiplicities, not just presence: t=AAB needs two As. An optimal window has some start. The first covering window from that start is no longer, so considering all starts includes the global optimum."
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
        "time": "O(n²·Σ+m)",
        "space": "O(Σ) auxiliary; O(L) output",
        "complexity": {
          "zh": "n=|s|、m=|t|，Σ≤128 为代码检查的字符表大小，L 为答案长度。窗口中不反复截串，最后仅复制答案。此法大输入不适合。",
          "en": "n=len(s), m=len(t), Σ≤128 is the checked character table, and L is result length. Only the final result is sliced; no candidate substrings are copied. This baseline is unsuitable for large inputs."
        },
        "python": "class Solution:\n    def minWindow(self, s, t):\n        need = [0]*128\n        for ch in t: need[ord(ch)] += 1\n        best_start, best_len = 0, len(s)+1\n        for left in range(len(s)):\n            have = [0]*128\n            for right in range(left, len(s)):\n                have[ord(s[right])] += 1\n                if all(have[c] >= need[c] for c in range(128)):\n                    if right-left+1 < best_len:\n                        best_start, best_len = left, right-left+1\n                    break\n        return '' if best_len > len(s) else s[best_start:best_start+best_len]",
        "java": "class Solution {\n    public String minWindow(String s,String t) {\n        int[] need=new int[128];\n        for(int i=0;i<t.length();i++) need[t.charAt(i)]++;\n        int start=0,len=s.length()+1;\n        for(int l=0;l<s.length();l++) {\n            int[] have=new int[128];\n            for(int r=l;r<s.length();r++) {\n                have[s.charAt(r)]++; boolean ok=true;\n                for(int c=0;c<128;c++) if(have[c]<need[c]) {ok=false;break;}\n                if(ok) {if(r-l+1<len) {start=l;len=r-l+1;} break;}\n            }\n        }\n        return len>s.length()? \"\" : s.substring(start,start+len);\n    }\n}",
        "algorithmNotes": {
          "zh": "每换一个左端都重新统计需求，逐步加入右端字符。只有所有字符的出现次数都满足 t 才算覆盖；对固定左端找到第一个合法右端即可记录并停止扩展，更长窗口不会改善答案。",
          "en": "Reset character counts for each left endpoint and extend right until every required multiplicity is met. The first valid right endpoint is optimal for that left endpoint, so record it and stop extending that candidate."
        }
      },
      {
        "key": "deficit-window",
        "name": {
          "zh": "缺额计数与可收缩窗口",
          "en": "Deficit counts and a shrinking window"
        },
        "intuition": {
          "zh": "need[ch] 表示窗口还缺该字符多少个，负数代表有多余副本；missing 是所有正缺额的总数。右端加入有缺额的字符时 missing 减一。missing=0 后持续缩左端，边缩边记录答案，直到移走一个不可缺少的副本。\n\n每个右端点会尽可能收缩到刚失去覆盖，因而已检查以该右端结尾的最短可行窗口；较早丢弃的起点只会生成更长答案。",
          "en": "need[ch] is the remaining deficit for a character; a negative value means surplus copies. missing counts total unmet character occurrences. An entering needed character reduces missing. Once missing reaches zero, repeatedly record and shrink until removing an essential copy makes coverage fail. For every right endpoint, shrinking reaches the first loss of coverage, examining its shortest valid window. Earlier discarded starts cannot improve later, longer windows."
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
        "time": "O(n+m)",
        "space": "O(Σ) auxiliary; O(L) output",
        "complexity": {
          "zh": "两边界各最多移动 n 次，需求初始化 m 次。固定 128 计数是常数辅助空间；最终字符串复制 L 个字符。",
          "en": "Each boundary moves at most n times and requirements take m updates. The fixed 128-entry table is constant auxiliary space; the final output copies L characters."
        },
        "python": "class Solution:\n    def minWindow(self, s, t):\n        need = [0]*128\n        for ch in t: need[ord(ch)] += 1\n        missing, left = len(t), 0\n        start, length = 0, len(s)+1\n        for right, ch in enumerate(s):\n            c = ord(ch)\n            if need[c] > 0: missing -= 1\n            need[c] -= 1\n            while missing == 0:\n                if right-left+1 < length: start, length = left, right-left+1\n                c = ord(s[left]); need[c] += 1\n                if need[c] > 0: missing += 1\n                left += 1\n        return '' if length > len(s) else s[start:start+length]",
        "java": "class Solution {\n    public String minWindow(String s,String t) {\n        int[] need=new int[128];\n        for(int i=0;i<t.length();i++) need[t.charAt(i)]++;\n        int missing=t.length(),left=0,start=0,len=s.length()+1;\n        for(int right=0;right<s.length();right++) {\n            char c=s.charAt(right);\n            if(need[c]>0) missing--; need[c]--;\n            while(missing==0) {\n                if(right-left+1<len) {start=left;len=right-left+1;}\n                c=s.charAt(left++); need[c]++;\n                if(need[c]>0) missing++;\n            }\n        }\n        return len>s.length()? \"\" : s.substring(start,start+len);\n    }\n}",
        "algorithmNotes": {
          "zh": "计数允许变成负数，负数表示某字符已多出，不能把它当作新的缺口。窗口覆盖后持续收缩左端并更新最短答案；移走必需字符使缺口重新出现时，再恢复扩张右端。",
          "en": "Allow counts to become negative to represent surplus copies rather than missing ones. Once covered, shrink left while recording shorter answers; resume rightward expansion only when removing a required character creates a deficit."
        }
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
    },
    "examples": [
      {
        "input": "s = \"CABEFAB\", t = \"ABC\"",
        "output": "\"CAB\""
      },
      {
        "input": "s = \"a\", t = \"aa\"",
        "output": "\"\""
      },
      {
        "input": "s = \"BBBAAC\", t = \"AAC\"",
        "output": "\"AAC\""
      }
    ]
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
    "methods": [
      {
        "key": "enumerate",
        "name": {
          "zh": "枚举区间累加（基线）",
          "en": "Enumerate intervals with running sums (baseline)"
        },
        "intuition": {
          "zh": "每个区间由左右端点确定。固定左端后，扩展右端时只加入新元素，因此不需要再次扫描已经计算过的区间。最大值初始化为首项而非零，确保全负数组仍返回一个非空区间。\n\n每个非空区间被访问一次，且最大值初始即对应合法区间，因此最终最大值正确。",
          "en": "Each interval has a left and right endpoint. Once the left endpoint is fixed, extend right by adding only the new element. Initialize best from the first element rather than zero so all-negative inputs still select a nonempty interval. Every nonempty interval is visited once, and initialization already represents a valid interval, so the final maximum is valid and complete."
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
        "time": "O(n²)",
        "space": "O(1)",
        "complexity": {
          "zh": "共有 n(n+1)/2 个区间，每次扩展 O(1)；只存总和与最大值。",
          "en": "There are n(n+1)/2 intervals, each extension is O(1), and only a sum and maximum are retained."
        },
        "python": "class Solution:\n    def maxSubArray(self, nums):\n        best = nums[0]\n        for l in range(len(nums)):\n            total = 0\n            for r in range(l, len(nums)):\n                total += nums[r]\n                best = max(best, total)\n        return best",
        "java": "class Solution {\n    public int maxSubArray(int[] nums) {\n        int best=nums[0];\n        for(int l=0;l<nums.length;l++) {\n            int total=0;\n            for(int r=l;r<nums.length;r++) {total+=nums[r];best=Math.max(best,total);}\n        }\n        return best;\n    }\n}",
        "algorithmNotes": {
          "zh": "固定起点后维护当前区间和，每向右一步只加一个数。答案必须用数组内的值或负无穷初始化，不能用 0，否则全为负数时会错误地选择不存在的空子数组。",
          "en": "Maintain a running sum while extending each fixed starting point. Initialize the answer from an actual value or negative infinity, not zero, because an all-negative input still requires a nonempty subarray."
        }
      },
      {
        "key": "kadane",
        "name": {
          "zh": "Kadane：以当前位置结尾的最优和",
          "en": "Kadane: best sum ending at the current position"
        },
        "intuition": {
          "zh": "先约束“必须在当前位置结束”。这样的最优区间只能是当前数自己，或在前一个位置结尾的最优区间后追加当前数。旧和若为负就会拖累，重新开始更好；旧和为正才值得继承。ending 与全局 best 不要混为一谈。\n\n任何以当前位置结尾且长度大于一的区间都由前一位置结尾的区间扩展而来，选择其中最大者不会损失解；全局最优必有一个结尾。",
          "en": "First require the subarray to end at the current position. It either starts here or extends the best subarray ending one position earlier. A negative prior sum is harmful, so restart; a positive one is worth extending. Keep ending separate from the global best. Every longer subarray ending here extends one ending at the previous position. Keeping only the best such predecessor loses no optimal candidate, and every global optimum has some endpoint."
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
        "time": "O(n)",
        "space": "O(1)",
        "complexity": {
          "zh": "每项做固定次加法和比较，不需要 DP 数组，也不创建 nums[1:] 切片。",
          "en": "Constant additions and comparisons per element; no DP array or nums[1:] slice is created."
        },
        "python": "class Solution:\n    def maxSubArray(self, nums):\n        ending = best = nums[0]\n        for i in range(1, len(nums)):\n            ending = max(nums[i], ending+nums[i])\n            best = max(best, ending)\n        return best",
        "java": "class Solution {\n    public int maxSubArray(int[] nums) {\n        int ending=nums[0],best=nums[0];\n        for(int i=1;i<nums.length;i++) {\n            ending=Math.max(nums[i],ending+nums[i]); best=Math.max(best,ending);\n        }\n        return best;\n    }\n}",
        "algorithmNotes": {
          "zh": "ending 只表示必须以当前元素结尾的最大子数组和，不等于全局答案。它在“从当前数重新开始”和“接上前一段”之间取最大，再用这个 ending 更新历史最大值。",
          "en": "The ending state is the best sum required to end at the current element, not the global answer. Choose between starting at this value and extending the previous state, then update the best sum seen anywhere."
        }
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
    },
    "examples": [
      {
        "input": "nums = [-3,4,-1,2,-6]",
        "output": "5"
      },
      {
        "input": "nums = [-3,-1,-5]",
        "output": "-1"
      },
      {
        "input": "nums = [8]",
        "output": "8"
      }
    ]
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
    "methods": [
      {
        "key": "sort-merge",
        "name": {
          "zh": "按起点排序后合并",
          "en": "Sort by start, then merge"
        },
        "intuition": {
          "zh": "按起点排序后，当前新区间只需与最后一个已合并区间比较。如果它的起点大于最后终点，就与所有更早区间也不相交；否则扩大最后终点。终点必须取 max，嵌套区间不能让当前覆盖范围缩小。\n\n结果始终按起点有序且互不重叠；新段只可能与最后段相连，合并保持并集不变，分开则保留真实空隙。",
          "en": "After sorting by start, a new interval only needs comparison with the last merged interval. If its start exceeds the last end, it also misses every earlier interval; otherwise extend that last end. Use max so a nested interval cannot shrink existing coverage. The result stays sorted and disjoint. Only its last interval can connect to the next one; merging preserves the union and separating preserves a genuine gap."
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
        "time": "O(n log n)",
        "space": "O(n)",
        "complexity": {
          "zh": "排序副本和结果最多 n 段；扫描线性，排序决定总体时间，不修改原输入。",
          "en": "The sorted copy and result each contain at most n intervals. The scan is linear and sorting dominates; the original input is not modified."
        },
        "python": "class Solution:\n    def merge(self, intervals):\n        ans = []\n        for start, end in sorted(intervals):\n            if not ans or start > ans[-1][1]: ans.append([start, end])\n            else: ans[-1][1] = max(ans[-1][1], end)\n        return ans",
        "java": "import java.util.*;\nclass Solution {\n    public int[][] merge(int[][] intervals) {\n        int[][] a=new int[intervals.length][];\n        for(int i=0;i<a.length;i++) a[i]=intervals[i].clone();\n        Arrays.sort(a,Comparator.comparingInt(x->x[0]));\n        List<int[]> ans=new ArrayList<>();\n        for(int[] x:a) {\n            if(ans.isEmpty() || x[0]>ans.get(ans.size()-1)[1]) ans.add(x);\n            else {int[] last=ans.get(ans.size()-1);last[1]=Math.max(last[1],x[1]);}\n        }\n        return ans.toArray(new int[ans.size()][]);\n    }\n}",
        "algorithmNotes": {
          "zh": "先按左端排序，输出末段就是唯一可能与当前区间重叠的已有区间。当前左端不大于末段右端时扩张右端为两者最大值；等号也算重叠，否则追加一个新段。",
          "en": "Sort by left endpoint so only the last output interval can overlap the next one. If the next start is at most the last end, extend that end to their maximum; equality counts as overlap, otherwise append a new interval."
        }
      },
      {
        "key": "events",
        "name": {
          "zh": "端点事件扫描线",
          "en": "Sweep start and end events"
        },
        "intuition": {
          "zh": "把每个起点记为进入事件、终点记为离开事件，按坐标排序。active 表示当前有多少区间尚未结束。它从 0 变正时开始一段，从正变 0 时结束一段。同坐标必须先处理起点，再处理终点，才会把端点相接的闭区间合并。\n\nactive>0 的坐标段正是输入并集；起点优先处理确保同坐标不会产生虚假的空隙，包括零长度区间。",
          "en": "Turn starts into entering events and ends into leaving events, sorted by coordinate. active counts intervals currently open. A transition from zero starts a merged interval; a transition back to zero ends it. At equal coordinates process starts first so closed intervals touching at an endpoint merge. Regions with active>0 are exactly the input union. Start-first tie handling avoids false gaps at shared coordinates and also handles zero-length intervals."
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
        "time": "O(n log n)",
        "space": "O(n)",
        "complexity": {
          "zh": "2n 个事件排序，线性扫描；事件数组及输出均为 O(n)。",
          "en": "Sort 2n events and scan them once; both event storage and output are O(n)."
        },
        "python": "class Solution:\n    def merge(self, intervals):\n        events = []\n        for start, end in intervals:\n            events.append((start, 1))\n            events.append((end, -1))\n        events.sort(key=lambda e: (e[0], -e[1]))\n        active, start, ans = 0, 0, []\n        for x, delta in events:\n            if active == 0: start = x\n            active += delta\n            if active == 0: ans.append([start, x])\n        return ans",
        "java": "import java.util.*;\nclass Solution {\n    public int[][] merge(int[][] intervals) {\n        int[][] events=new int[2*intervals.length][2]; int i=0;\n        for(int[] x:intervals) {events[i++]=new int[]{x[0],1};events[i++]=new int[]{x[1],-1};}\n        Arrays.sort(events,(a,b)->a[0]!=b[0]?Integer.compare(a[0],b[0]):Integer.compare(b[1],a[1]));\n        int active=0,start=0; List<int[]> ans=new ArrayList<>();\n        for(int[] e:events) {\n            if(active==0) start=e[0]; active+=e[1];\n            if(active==0) ans.add(new int[]{start,e[0]});\n        }\n        return ans.toArray(new int[ans.size()][]);\n    }\n}",
        "algorithmNotes": {
          "zh": "把每个区间拆成开始和结束事件，用活动区间数判断合并段的边界。同一坐标必须先处理开始再处理结束，这样 [1,4] 和 [4,6] 才会连成一段，零长度区间也不会丢失。",
          "en": "Turn intervals into start and end events and use the active count to detect merged boundaries. Process starts before ends at the same coordinate so touching intervals merge and zero-length intervals are preserved."
        }
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
    },
    "examples": [
      {
        "input": "intervals = [[5,8],[1,3],[2,4]]",
        "output": "[[1,4],[5,8]]"
      },
      {
        "input": "intervals = [[1,4],[4,6]]",
        "output": "[[1,6]]"
      },
      {
        "input": "intervals = [[0,0]]",
        "output": "[[0,0]]"
      }
    ]
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
    "methods": [
      {
        "key": "copy-map",
        "name": {
          "zh": "辅助数组直接定位",
          "en": "Map each value into an auxiliary array"
        },
        "intuition": {
          "zh": "原位置 i 右移后是 (i+k)%n。直接在原数组写会覆盖还没搬走的值，因此先写入独立数组，再逐项复制回来。不是把局部变量 nums 改指向新数组，而是更新调用者传入的数组本身。\n\n模 n 的固定平移是下标集合上的一一映射，每个原元素恰好写到唯一目标位置。",
          "en": "Original index i moves to (i+k)%n. Writing directly would overwrite values not yet moved, so place values in a separate array and copy them back. Update the caller’s actual array rather than merely rebinding a local variable named nums. A fixed shift modulo n is a bijection on indices, so every original value reaches exactly one distinct destination."
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
        "time": "O(n)",
        "space": "O(n)",
        "complexity": {
          "zh": "一次定位、一次写回，共线性工作；辅助数组 n 项。",
          "en": "One placement pass and one copy-back pass use linear time and a length-n auxiliary array."
        },
        "python": "class Solution:\n    def rotate(self, nums, k):\n        n = len(nums)\n        k %= n\n        out = [0]*n\n        for i, x in enumerate(nums): out[(i+k)%n] = x\n        for i in range(n): nums[i] = out[i]",
        "java": "class Solution {\n    public void rotate(int[] nums,int k) {\n        int n=nums.length; k%=n; int[] out=new int[n];\n        for(int i=0;i<n;i++) out[(i+k)%n]=nums[i];\n        for(int i=0;i<n;i++) nums[i]=out[i];\n    }\n}",
        "algorithmNotes": {
          "zh": "先用 k%n 消去完整轮转，再把旧下标 i 的元素写到新数组的 (i+k)%n。必须从旧数组读取，全部写完后再复制回原数组，否则尚未搬走的元素可能被覆盖。",
          "en": "Reduce k modulo n, then place the old value at i into position (i+k)%n in a new array. Read only from the original until all positions are filled, then copy back to avoid overwriting values that still need moving."
        }
      },
      {
        "key": "reverse",
        "name": {
          "zh": "三次原地反转",
          "en": "Three in-place reversals"
        },
        "intuition": {
          "zh": "把数组分为 A（前 n−k 项）和 B（后 k 项），目标是 AB→BA。整个数组反转得到 reverse(B)reverse(A)，再分别反转这两块，内部顺序恢复，位置却已交换。这避免保存整份副本。\n\n整体反转交换两段并倒置各段；后两次只修复段内顺序，因此结果恰是 B 后接 A。",
          "en": "Split the array into A, the first n−k items, and B, the final k items. The target is AB→BA. Reversing everything gives reverse(B)reverse(A); reversing each block restores its internal order while preserving the exchanged positions. No array copy is needed. The first reversal exchanges the blocks and reverses each internally. The last two restore internal order, leaving exactly B followed by A."
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
        "time": "O(n)",
        "space": "O(1)",
        "complexity": {
          "zh": "三段反转访问长度总计 2n，使用下标和单个交换临时值；没有切片。",
          "en": "The three reversed segment lengths total 2n; only indices and a swap temporary are used, with no slicing."
        },
        "python": "class Solution:\n    def rotate(self, nums, k):\n        k %= len(nums)\n        def reverse(l, r):\n            while l < r:\n                nums[l], nums[r] = nums[r], nums[l]\n                l += 1\n                r -= 1\n        reverse(0, len(nums)-1)\n        reverse(0, k-1)\n        reverse(k, len(nums)-1)",
        "java": "class Solution {\n    private void reverse(int[] a,int l,int r) {\n        while(l<r) {int t=a[l];a[l++]=a[r];a[r--]=t;}\n    }\n    public void rotate(int[] nums,int k) {\n        k%=nums.length;\n        reverse(nums,0,nums.length-1); reverse(nums,0,k-1); reverse(nums,k,nums.length-1);\n    }\n}",
        "algorithmNotes": {
          "zh": "右移 k 位后，原来的后 k 个元素应成为前缀。整体反转会把这部分搬到前面但颠倒内部顺序，因此再分别反转前 k 个和剩余 n−k 个元素；k=0 时仍应保持原数组。",
          "en": "After a right rotation the last k elements must lead. Reversing the whole array brings them forward but reverses their order, so reverse the first k and remaining n−k elements separately; k=0 must leave the array unchanged."
        }
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
    },
    "examples": [
      {
        "input": "nums = [1,2,3,4,5], k = 2",
        "output": "[4,5,1,2,3]",
        "note": {
          "zh": "输出展示原地修改后的结构。",
          "en": "The output shows the structure after in-place modification."
        }
      },
      {
        "input": "nums = [1,2], k = 0",
        "output": "[1,2]",
        "note": {
          "zh": "输出展示原地修改后的结构。",
          "en": "The output shows the structure after in-place modification."
        }
      },
      {
        "input": "nums = [1,2,3], k = 4",
        "output": "[3,1,2]",
        "note": {
          "zh": "输出展示原地修改后的结构。",
          "en": "The output shows the structure after in-place modification."
        }
      }
    ]
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
    "methods": [
      {
        "key": "two-arrays",
        "name": {
          "zh": "分别建立左积和右积",
          "en": "Separate left and right product arrays"
        },
        "intuition": {
          "zh": "除自己之外可以拆成“严格在左边的乘积×严格在右边的乘积”。两部分没有交集，也没有漏项。空乘积定义为 1，因此边界不用特殊分支；即使包含零也照常计算，不必分类讨论。\n\n两个递推分别保持不含当前位置的严格前后缀积，它们的乘积恰好覆盖除当前位置以外的所有元素。",
          "en": "Everything except i splits into the product strictly to its left and strictly to its right. The sets are disjoint and cover every required element. An empty product is one, making boundaries natural and handling zeros without special cases. The recurrences maintain products strictly before and after each position. Multiplying them includes all and only the other elements."
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
        "time": "O(n)",
        "space": "O(n) auxiliary + O(n) output",
        "complexity": {
          "zh": "两个长度 n 的辅助数组，三次线性遍历；满足时间及禁除法要求，但没有达到常数辅助空间进阶。",
          "en": "Two auxiliary length-n arrays and three linear scans satisfy the time and no-division requirements, but not the constant-auxiliary-space follow-up."
        },
        "python": "class Solution:\n    def productExceptSelf(self, nums):\n        n = len(nums)\n        left, right = [1]*n, [1]*n\n        for i in range(1, n): left[i] = left[i-1]*nums[i-1]\n        for i in range(n-2, -1, -1): right[i] = right[i+1]*nums[i+1]\n        return [left[i]*right[i] for i in range(n)]",
        "java": "class Solution {\n    public int[] productExceptSelf(int[] nums) {\n        int n=nums.length; int[] left=new int[n],right=new int[n],ans=new int[n];\n        left[0]=1; right[n-1]=1;\n        for(int i=1;i<n;i++) left[i]=left[i-1]*nums[i-1];\n        for(int i=n-2;i>=0;i--) right[i]=right[i+1]*nums[i+1];\n        for(int i=0;i<n;i++) ans[i]=left[i]*right[i];\n        return ans;\n    }\n}",
        "algorithmNotes": {
          "zh": "前缀数组存当前位置左边所有数的乘积，后缀数组存右边所有数的乘积，都不包含 nums[i]。边界外没有元素时乘积设为 1，再逐位置相乘，因此不需要除法也能处理零。",
          "en": "The prefix and suffix products exclude nums[i], covering only values strictly to its left and right. Use one for an empty side, then multiply the two products; this handles zeros without division."
        }
      },
      {
        "key": "output-prefix",
        "name": {
          "zh": "输出复用前缀，滚动维护后缀",
          "en": "Store prefixes in output and roll the suffix"
        },
        "intuition": {
          "zh": "左积无需保留在独立数组，直接写入答案。反向扫描时，右积也只需要一个 suffix 变量，因为从 i 走到 i−1 时只多一个 nums[i]。先让答案乘 suffix，再更新 suffix，确保当前位置不被算进自己的答案。\n\n正向完成后答案保存严格左积；反向处理 i 时 suffix 正好是严格右积，相乘后该项最终正确且不再修改。",
          "en": "Store left products directly in the output. During a reverse scan, a single suffix variable is enough: moving from i to i−1 adds only nums[i]. Multiply the output by suffix before updating suffix, keeping the current value out of its own answer. The forward pass stores strict left products. At reverse position i, suffix is exactly the strict right product; their multiplication finalizes that entry."
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
        "time": "O(n)",
        "space": "O(1) auxiliary + O(n) output",
        "complexity": {
          "zh": "两次扫描各 n 项，仅 prefix、suffix 等常数变量。返回数组本身占 O(n)，按题目进阶约定不计辅助空间。",
          "en": "Two length-n scans use only constant scalar state. The returned array is O(n), excluded from auxiliary space under the follow-up convention."
        },
        "python": "class Solution:\n    def productExceptSelf(self, nums):\n        ans = [1]*len(nums)\n        prefix = 1\n        for i in range(len(nums)):\n            ans[i] = prefix\n            prefix *= nums[i]\n        suffix = 1\n        for i in range(len(nums)-1, -1, -1):\n            ans[i] *= suffix\n            suffix *= nums[i]\n        return ans",
        "java": "class Solution {\n    public int[] productExceptSelf(int[] nums) {\n        int[] ans=new int[nums.length]; int prefix=1,suffix=1;\n        for(int i=0;i<nums.length;i++) {ans[i]=prefix;prefix*=nums[i];}\n        for(int i=nums.length-1;i>=0;i--) {ans[i]*=suffix;suffix*=nums[i];}\n        return ans;\n    }\n}",
        "algorithmNotes": {
          "zh": "第一遍直接把左侧乘积写入输出数组，而不是再分配前缀数组。第二遍从右向左维护 right，先用它乘到输出位置，再令 right*=nums[i]，保证当前位置不会把自己乘进去。",
          "en": "Write left-side products directly into the output on the first pass. On the reverse pass multiply each output entry by right before updating right*=nums[i], ensuring the current element excludes itself."
        }
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
    },
    "examples": [
      {
        "input": "nums = [2,3,4]",
        "output": "[12,8,6]"
      },
      {
        "input": "nums = [0,2,3]",
        "output": "[6,0,0]"
      },
      {
        "input": "nums = [0,2,0]",
        "output": "[0,0,0]"
      }
    ]
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
    "methods": [
      {
        "key": "set",
        "name": {
          "zh": "集合记录（空间不满足要求）",
          "en": "Membership set (space baseline)"
        },
        "intuition": {
          "zh": "先把“出现过哪些值”和“应检查哪个候选数”分开。长度为 n 的数组最多覆盖 n 个不同正数，因此不用无穷地查下去：答案一定落在 1..n+1。集合让每次存在性判断期望为常数时间，便于先验证题意，再思考如何消除额外集合。\n\n检查 x 时，所有小于 x 的正整数已经确认存在；若 x 不存在，它自然是最小缺失值。鸽巢原理保证循环会找到答案。",
          "en": "Separate membership from candidate enumeration. An array of length n cannot contain all n+1 positive integers from 1 through n+1. Thus the first missing candidate is guaranteed to appear in this finite range. A set provides expected constant-time membership and makes a useful baseline before removing its memory cost. Before checking x, every smaller positive integer has been confirmed present. The first absent x is therefore minimal, and the pigeonhole principle guarantees termination."
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
        "time": "Expected O(n)",
        "space": "O(n)",
        "complexity": {
          "zh": "建集合和至多 n+1 次查询均为期望 O(n)；集合最多保存 n 个值，O(n) 辅助空间。",
          "en": "Building the set and at most n+1 expected constant-time lookups take expected O(n) time. Up to n stored values require O(n) auxiliary space."
        },
        "python": "class Solution:\n    def firstMissingPositive(self, nums):\n        seen = set(nums)\n        for x in range(1, len(nums) + 2):\n            if x not in seen:\n                return x\n",
        "java": "import java.util.*;\nclass Solution {\n    public int firstMissingPositive(int[] nums) {\n        Set<Integer> seen = new HashSet<>();\n        for (int x : nums) seen.add(x);\n        for (int x = 1; x <= nums.length + 1; x++)\n            if (!seen.contains(x)) return x;\n        throw new AssertionError();\n    }\n}\n",
        "algorithmNotes": {
          "zh": "只需检查 1 到 n+1，因为 n 个元素不可能同时包含这 n+1 个正整数。负数和零即使在集合中也不会影响查找；从 1 递增，遇到第一个缺失值就返回。",
          "en": "Only candidates 1 through n+1 matter: n entries cannot contain all n+1 of them. Zero and negative values do not affect membership checks for these candidates; return the first missing value in increasing order."
        }
      },
      {
        "key": "placement",
        "name": {
          "zh": "原地归位",
          "en": "In-place placement"
        },
        "intuition": {
          "zh": "把数组下标看作正整数的专属位置：值 x 应放到下标 x-1。只有 1..n 值得归位，其他数都不能改变答案的前 n 个候选。交换后当前位置可能又拿到一个有效值，所以要继续处理而不是立刻前进。目标已等于 x 时必须停止，这正是重复值避免死循环的关键。\n\n每次有效交换都把一个值永久送到正确位置，之后不会把它换走。处理结束时，任何出现过的 1..n 都在对应位置；首个空缺就是答案。",
          "en": "Treat index x-1 as the home of value x. Only values in 1..n matter for these slots. A swap can bring another useful value into the current index, so process it again. If the destination already contains x, stop: swapping equal values would never make progress. Each effective swap permanently fills a correct home. Later swaps cannot evict a correctly placed value. Hence every present value in 1..n occupies its slot, and the first mismatch identifies the missing value."
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
        "time": "O(n)",
        "space": "O(1)",
        "complexity": {
          "zh": "循环虽嵌套，每次交换都新增一个正确位置，因此总交换次数 ≤ n；加扫描 O(n)。仅几个变量，O(1)，但会修改输入数组。",
          "en": "Despite nesting, each swap fixes a new slot, so there are at most n swaps. Scans add O(n) time. Only constant auxiliary storage is used; the input is modified."
        },
        "python": "class Solution:\n    def firstMissingPositive(self, nums):\n        n = len(nums)\n        for i in range(n):\n            while 1 <= nums[i] <= n and nums[nums[i] - 1] != nums[i]:\n                j = nums[i] - 1\n                nums[i], nums[j] = nums[j], nums[i]\n        for i, x in enumerate(nums):\n            if x != i + 1:\n                return i + 1\n        return n + 1\n",
        "java": "class Solution {\n    public int firstMissingPositive(int[] nums) {\n        int n = nums.length;\n        for (int i = 0; i < n; i++) {\n            while (nums[i] >= 1 && nums[i] <= n && nums[nums[i]-1] != nums[i]) {\n                int j = nums[i]-1, t = nums[i];\n                nums[i] = nums[j]; nums[j] = t;\n            }\n        }\n        for (int i = 0; i < n; i++) if (nums[i] != i+1) return i+1;\n        return n+1;\n    }\n}\n",
        "algorithmNotes": {
          "zh": "长度为 n 的数组把值 x 放在下标 x−1 处，但仅处理 1≤x≤n 的值。交换前先判断目标位置是否已有 x，否则重复值会无限交换；完成后第一个 nums[i]≠i+1 的位置就是缺口。",
          "en": "Use index x−1 as the home of x only when 1≤x≤n. Stop relocating when the destination already contains x to avoid an infinite loop with duplicates; the first position with nums[i]≠i+1 identifies the missing value."
        }
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
    },
    "examples": [
      {
        "input": "nums = [3,4,-1,1]",
        "output": "2"
      },
      {
        "input": "nums = [1,2,0]",
        "output": "3"
      },
      {
        "input": "nums = [7,8,9]",
        "output": "1"
      }
    ]
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
    "methods": [
      {
        "key": "markers",
        "name": {
          "zh": "独立行列标记",
          "en": "Separate row and column markers"
        },
        "intuition": {
          "zh": "如果遇到零就立即清行列，后续扫描会误把写入的零当作原始信息。把发现阶段与执行阶段分开：先只读矩阵并记下行列，再统一写零。标记数组只记录“要不要清零”，无需复制所有数值。\n\n第一遍标记准确等价于“这行或列原本含零”；第二遍仅按这些固定标记修改，因此不会引入额外扩散。",
          "en": "Immediate clearing would make newly written zeros look like original ones. Separate discovery from mutation: first record affected rows and columns without changing cells, then apply the markers. Boolean arrays record only the information needed, rather than duplicating the matrix. After discovery a marker is true exactly when its original row or column contained zero. Applying these fixed markers changes precisely the required cells."
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
        "time": "O(mn)",
        "space": "O(m+n)",
        "complexity": {
          "zh": "两次完整扫描 O(mn)，两个布尔数组合计 m+n 个位置。",
          "en": "Two full scans take O(mn); the two boolean arrays occupy m+n positions."
        },
        "python": "class Solution:\n    def setZeroes(self, matrix):\n        m, n = len(matrix), len(matrix[0])\n        rows, cols = [False] * m, [False] * n\n        for r in range(m):\n            for c in range(n):\n                if matrix[r][c] == 0:\n                    rows[r] = cols[c] = True\n        for r in range(m):\n            for c in range(n):\n                if rows[r] or cols[c]:\n                    matrix[r][c] = 0\n",
        "java": "class Solution {\n    public void setZeroes(int[][] matrix) {\n        int m=matrix.length, n=matrix[0].length;\n        boolean[] rows=new boolean[m], cols=new boolean[n];\n        for(int r=0;r<m;r++) for(int c=0;c<n;c++)\n            if(matrix[r][c]==0) { rows[r]=true; cols[c]=true; }\n        for(int r=0;r<m;r++) for(int c=0;c<n;c++)\n            if(rows[r] || cols[c]) matrix[r][c]=0;\n    }\n}\n",
        "algorithmNotes": {
          "zh": "第一遍只记录哪些行列含零，不立刻改矩阵。第二遍检查行标记或列标记，任意一个命中便写零；若边找边修改，新写入的零会误触发额外整行整列清零。",
          "en": "The first pass only records rows and columns containing original zeros. In a separate pass zero a cell if either marker applies; modifying while discovering would let newly written zeros incorrectly propagate."
        }
      },
      {
        "key": "in-place",
        "name": {
          "zh": "首行首列复用标记",
          "en": "Reuse the first row and column"
        },
        "intuition": {
          "zh": "独立标记可以搬进矩阵：第 r 行的状态放在 matrix[r][0]，第 c 列放在 matrix[0][c]。但首行首列自身也需要清零信息，不能让标记覆盖原始事实，因此先用两个布尔值保存它们原本是否含零。内部单元格处理完后，才处理标记区。\n\n内部标记只由原始内部零写入，且使用标记时不改标记区。两个额外布尔值独立保存首行首列信息，补足 matrix[0][0] 无法同时承载的两种状态。",
          "en": "Store row r’s marker at matrix[r][0] and column c’s marker at matrix[0][c]. These cells also belong to actual rows and columns, so first save whether the first row and column originally contained zero. Consume the markers in the interior before clearing the marker region itself. Interior zeros produce exact markers, which remain unchanged while consumed. The saved booleans preserve the two independent original states that matrix[0][0] alone cannot represent."
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
        "time": "O(mn)",
        "space": "O(1)",
        "complexity": {
          "zh": "常数次矩阵扫描是 O(mn)；没有创建新数组，仅保存两个标记与循环下标。",
          "en": "A constant number of scans costs O(mn). Only two flags and loop indices are allocated."
        },
        "python": "class Solution:\n    def setZeroes(self, matrix):\n        m, n = len(matrix), len(matrix[0])\n        row_zero = any(matrix[0][c] == 0 for c in range(n))\n        col_zero = any(matrix[r][0] == 0 for r in range(m))\n        for r in range(1, m):\n            for c in range(1, n):\n                if matrix[r][c] == 0:\n                    matrix[r][0] = matrix[0][c] = 0\n        for r in range(1, m):\n            for c in range(1, n):\n                if matrix[r][0] == 0 or matrix[0][c] == 0:\n                    matrix[r][c] = 0\n        if row_zero:\n            for c in range(n): matrix[0][c] = 0\n        if col_zero:\n            for r in range(m): matrix[r][0] = 0\n",
        "java": "class Solution {\n    public void setZeroes(int[][] a) {\n        int m=a.length,n=a[0].length; boolean rz=false,cz=false;\n        for(int c=0;c<n;c++) if(a[0][c]==0) rz=true;\n        for(int r=0;r<m;r++) if(a[r][0]==0) cz=true;\n        for(int r=1;r<m;r++) for(int c=1;c<n;c++)\n            if(a[r][c]==0) { a[r][0]=0; a[0][c]=0; }\n        for(int r=1;r<m;r++) for(int c=1;c<n;c++)\n            if(a[r][0]==0 || a[0][c]==0) a[r][c]=0;\n        if(rz) for(int c=0;c<n;c++) a[0][c]=0;\n        if(cz) for(int r=0;r<m;r++) a[r][0]=0;\n    }\n}\n",
        "algorithmNotes": {
          "zh": "第一行和第一列用作其他行列的标记，因此要另存它们原本是否含零。先处理内部单元格，再依据标记清内部行列，最后处理首行首列，避免提前抹掉标记信息。",
          "en": "Use the first row and column as markers but separately remember whether they originally contained zero. Mark and clear interior cells first; clear the first row and column last so the markers survive until they are consumed."
        }
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
    },
    "examples": [
      {
        "input": "matrix = [[1,2,3],[4,0,6]]",
        "output": "[[1,0,3],[0,0,0]]",
        "note": {
          "zh": "输出展示原地修改后的结构。",
          "en": "The output shows the structure after in-place modification."
        }
      },
      {
        "input": "matrix = [[0,2],[3,4]]",
        "output": "[[0,0],[0,4]]",
        "note": {
          "zh": "输出展示原地修改后的结构。",
          "en": "The output shows the structure after in-place modification."
        }
      },
      {
        "input": "matrix = [[1,2]]",
        "output": "[[1,2]]",
        "note": {
          "zh": "输出展示原地修改后的结构。",
          "en": "The output shows the structure after in-place modification."
        }
      }
    ]
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
    "methods": [
      {
        "key": "simulation",
        "name": {
          "zh": "方向与访问记录",
          "en": "Direction simulation"
        },
        "intuition": {
          "zh": "把问题当作一支笔走格子，方向依次是右、下、左、上。每次想往前走时先看下一格是否越界或已访问；被挡住才右转。访问记录是避免重复的依据，循环次数固定为格子总数，最后一步不再寻找下一格。\n\n每一步只进入未访问的合法邻格；顺时针转向沿矩形边界推进，再进入内层。固定 mn 次覆盖所有格子且无重复。",
          "en": "Imagine a pen moving right, down, left, then up. Before each move, test whether the next cell is outside the matrix or already visited; turn clockwise only if blocked. A visited grid prevents repeats, and exactly mn iterations avoid searching for a move after the final cell. Each move enters a valid unvisited neighbor. Clockwise turns follow the boundary before proceeding inward. Exactly mn such visits cover the matrix without duplication."
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
        "time": "O(mn)",
        "space": "O(mn)",
        "complexity": {
          "zh": "每格一次访问、常数次转向检查，时间 O(mn)。访问表 O(mn)，返回序列另需 O(mn)。",
          "en": "Each cell incurs constant work, giving O(mn) time. The visited grid takes O(mn) auxiliary space; the returned sequence also occupies O(mn)."
        },
        "python": "class Solution:\n    def spiralOrder(self, matrix):\n        m, n = len(matrix), len(matrix[0])\n        seen = [[False] * n for _ in range(m)]\n        directions = [(0,1),(1,0),(0,-1),(-1,0)]\n        r = c = d = 0\n        answer = []\n        for t in range(m*n):\n            answer.append(matrix[r][c]); seen[r][c] = True\n            if t == m*n - 1: break\n            dr, dc = directions[d]\n            nr, nc = r + dr, c + dc\n            if not (0 <= nr < m and 0 <= nc < n) or seen[nr][nc]:\n                d = (d + 1) % 4\n                dr, dc = directions[d]\n            r, c = r + dr, c + dc\n        return answer\n",
        "java": "import java.util.*;\nclass Solution {\n    public List<Integer> spiralOrder(int[][] a) {\n        int m=a.length,n=a[0].length,r=0,c=0,d=0;\n        int[][] dirs={{0,1},{1,0},{0,-1},{-1,0}};\n        boolean[][] seen=new boolean[m][n]; List<Integer> ans=new ArrayList<>();\n        for(int t=0;t<m*n;t++) {\n            ans.add(a[r][c]); seen[r][c]=true;\n            if(t==m*n-1) break;\n            int nr=r+dirs[d][0],nc=c+dirs[d][1];\n            if(nr<0||nr>=m||nc<0||nc>=n||seen[nr][nc]) d=(d+1)%4;\n            r+=dirs[d][0]; c+=dirs[d][1];\n        }\n        return ans;\n    }\n}\n",
        "algorithmNotes": {
          "zh": "用 visited 区分已经输出的单元格，方向按右、下、左、上循环。每输出一个值先试探下一格，越界或已访问才转向；严格执行 m×n 次输出，避免最后一次继续绕圈。",
          "en": "Track visited cells and cycle directions right, down, left, up. After emitting a value, turn only if the next cell is outside the matrix or already visited; emit exactly m×n values to terminate."
        }
      },
      {
        "key": "boundaries",
        "name": {
          "zh": "四边界逐层收缩",
          "en": "Shrinking boundaries"
        },
        "intuition": {
          "zh": "每走完一条边，剩余未访问区域仍是一个矩形，因此不用逐格存访问状态，只需上下左右四个边界。上边和右边读完后，剩余区域可能已经为空，所以读下边、左边前必须重新检查，尤其单行与单列矩阵。\n\n始终保持边界内是全部且仅有的未访问区域；每次读完整一条边后移除它。有效性检查防止把已经移除的边再次读取。",
          "en": "After consuming a full edge, the unvisited region is still a rectangle. Four boundaries therefore replace the visited grid. Reading the top and right edges may exhaust the region, so recheck before reading the bottom or left edges, especially for a single remaining row or column. The bounds always enclose exactly the unvisited cells. Each traversal consumes one whole edge and removes it; validity checks prevent reusing an exhausted edge."
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
        "time": "O(mn)",
        "space": "O(1) auxiliary; O(mn) output",
        "complexity": {
          "zh": "每格恰好入答案一次；四个边界为常数辅助空间。答案列表的 O(mn) 不计入辅助空间，但计入总空间。",
          "en": "Every cell is appended once. Four bounds need constant auxiliary space; the O(mn) answer is additional output storage."
        },
        "python": "class Solution:\n    def spiralOrder(self, matrix):\n        top, bottom, left, right = 0, len(matrix)-1, 0, len(matrix[0])-1\n        answer = []\n        while top <= bottom and left <= right:\n            for c in range(left, right+1): answer.append(matrix[top][c])\n            top += 1\n            for r in range(top, bottom+1): answer.append(matrix[r][right])\n            right -= 1\n            if top <= bottom:\n                for c in range(right, left-1, -1): answer.append(matrix[bottom][c])\n                bottom -= 1\n            if left <= right:\n                for r in range(bottom, top-1, -1): answer.append(matrix[r][left])\n                left += 1\n        return answer\n",
        "java": "import java.util.*;\nclass Solution {\n    public List<Integer> spiralOrder(int[][] a) {\n        List<Integer> ans=new ArrayList<>(); int t=0,b=a.length-1,l=0,r=a[0].length-1;\n        while(t<=b && l<=r) {\n            for(int c=l;c<=r;c++) ans.add(a[t][c]); t++;\n            for(int row=t;row<=b;row++) ans.add(a[row][r]); r--;\n            if(t<=b) { for(int c=r;c>=l;c--) ans.add(a[b][c]); b--; }\n            if(l<=r) { for(int row=b;row>=t;row--) ans.add(a[row][l]); l++; }\n        }\n        return ans;\n    }\n}\n",
        "algorithmNotes": {
          "zh": "上下左右边界围住尚未输出的矩形，每走完一条边就收缩对应边界。输出底边和左边前再次判断矩形是否还存在，防止只剩一行或一列时重复输出。",
          "en": "Four boundaries enclose the unvisited rectangle; shrink the relevant boundary after traversing each edge. Recheck that rows and columns remain before traversing the bottom and left edges to avoid duplicates in single-row or single-column remnants."
        }
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
    },
    "examples": [
      {
        "input": "matrix = [[1,2,3],[4,5,6]]",
        "output": "[1,2,3,6,5,4]"
      },
      {
        "input": "matrix = [[9]]",
        "output": "[9]"
      },
      {
        "input": "matrix = [[1],[2],[3]]",
        "output": "[1,2,3]"
      }
    ]
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
    "methods": [
      {
        "key": "transpose",
        "name": {
          "zh": "转置后翻转每行",
          "en": "Transpose, then reverse rows"
        },
        "intuition": {
          "zh": "顺时针旋转把 (r,c) 送到 (c,n-1-r)。拆成两步就容易原地做：先转置，把坐标换成 (c,r)；再把每一行左右翻转，把列 r 换成 n-1-r。转置只处理对角线一侧，否则每对元素交换两次会还原。\n\n两次变换的复合严格等于旋转坐标映射；每个交换都是置换，不会丢失元素或创建额外格子。",
          "en": "The desired mapping is (r,c) → (c,n-1-r). Factor it into transposition, producing (c,r), then horizontal row reversal, producing the final column. Transpose only one side of the diagonal: processing both sides would undo every swap. Composing the two coordinate transformations gives exactly the clockwise rotation. Both stages are permutations, preserving all values."
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
        "time": "O(n²)",
        "space": "O(1)",
        "complexity": {
          "zh": "转置和行翻转各进行 O(n²) 次常数操作；代码不切片复制，仅临时保存交换值。",
          "en": "Transposition and row reversal each use O(n²) constant-time operations. No slices or matrix copies are made."
        },
        "python": "class Solution:\n    def rotate(self, matrix):\n        n = len(matrix)\n        for r in range(n):\n            for c in range(r+1, n):\n                matrix[r][c], matrix[c][r] = matrix[c][r], matrix[r][c]\n        for row in matrix:\n            l, r = 0, n-1\n            while l < r:\n                row[l], row[r] = row[r], row[l]\n                l += 1; r -= 1\n",
        "java": "class Solution {\n    public void rotate(int[][] a) {\n        int n=a.length;\n        for(int r=0;r<n;r++) for(int c=r+1;c<n;c++) {\n            int t=a[r][c]; a[r][c]=a[c][r]; a[c][r]=t;\n        }\n        for(int[] row:a) for(int l=0,r=n-1;l<r;l++,r--) {\n            int t=row[l]; row[l]=row[r]; row[r]=t;\n        }\n    }\n}\n",
        "algorithmNotes": {
          "zh": "转置只交换主对角线一侧的格子与其镜像，每对只交换一次。转置后逐行反转列顺序，原位置 (r,c) 最终变成 (c,n−1−r)，正好是顺时针旋转的坐标。",
          "en": "Transpose by swapping only one side of the main diagonal with its mirror so each pair is exchanged once. Reverse each row afterward, mapping original (r,c) to (c,n−1−r), the clockwise-rotation destination."
        }
      },
      {
        "key": "cycles",
        "name": {
          "zh": "每层四点轮换",
          "en": "Four-cell cycles per layer"
        },
        "intuition": {
          "zh": "一个位置旋转四次会回到自身，因此可以把外圈上的四个对应位置视为一组，只存一个临时值完成循环移动。按层处理，当前层上边排除最后一个角点，避免把角点算进两组。奇数阶矩阵中心不移动。\n\n每个四元组恰好沿顺时针方向移动一次，互不重叠且覆盖除中心外的所有位置，因此得到完整旋转。",
          "en": "Four rotations return a cell to itself, so rotate each group of four corresponding cells using one saved value. Work layer by layer and exclude the last corner on the top edge so corners are not processed twice. The center of an odd-sized matrix stays fixed. Each disjoint four-cell cycle moves values clockwise exactly once. These cycles cover every noncentral position, producing the rotation."
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
        "time": "O(n²)",
        "space": "O(1)",
        "complexity": {
          "zh": "各层共覆盖 n² 个量级的格子；一个临时值和常数下标即可。",
          "en": "All layers together cover O(n²) cells. One temporary value and a constant number of indices suffice."
        },
        "python": "class Solution:\n    def rotate(self, matrix):\n        n = len(matrix)\n        for first in range(n//2):\n            last = n-1-first\n            for c in range(first, last):\n                offset = c-first\n                top = matrix[first][c]\n                matrix[first][c] = matrix[last-offset][first]\n                matrix[last-offset][first] = matrix[last][last-offset]\n                matrix[last][last-offset] = matrix[c][last]\n                matrix[c][last] = top\n",
        "java": "class Solution {\n    public void rotate(int[][] a) {\n        int n=a.length;\n        for(int first=0;first<n/2;first++) {\n            int last=n-1-first;\n            for(int c=first;c<last;c++) {\n                int off=c-first,top=a[first][c];\n                a[first][c]=a[last-off][first];\n                a[last-off][first]=a[last][last-off];\n                a[last][last-off]=a[c][last];\n                a[c][last]=top;\n            }\n        }\n    }\n}\n",
        "algorithmNotes": {
          "zh": "每层只遍历上边除最后一个角之外的元素，为每个位置找到右、下、左三个对应点。用临时变量保存一格，再把四格循环搬移；奇数阶矩阵中心元素无需移动。",
          "en": "For each layer visit the top edge excluding its last corner, and identify the matching right, bottom and left positions. Save one value while rotating the four cells; the center of an odd-sized matrix remains unchanged."
        }
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
    },
    "examples": [
      {
        "input": "matrix = [[1,2],[3,4]]",
        "output": "[[3,1],[4,2]]",
        "note": {
          "zh": "输出展示原地修改后的结构。",
          "en": "The output shows the structure after in-place modification."
        }
      },
      {
        "input": "matrix = [[7]]",
        "output": "[[7]]",
        "note": {
          "zh": "输出展示原地修改后的结构。",
          "en": "The output shows the structure after in-place modification."
        }
      },
      {
        "input": "matrix = [[1,2,3],[4,5,6],[7,8,9]]",
        "output": "[[7,4,1],[8,5,2],[9,6,3]]",
        "note": {
          "zh": "输出展示原地修改后的结构。",
          "en": "The output shows the structure after in-place modification."
        }
      }
    ]
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
    "methods": [
      {
        "key": "row-binary",
        "name": {
          "zh": "逐行二分",
          "en": "Binary search each row"
        },
        "intuition": {
          "zh": "先只利用行有序这一条性质：每一行都可独立二分，即使行之间数值范围重叠也不影响。搜索区间使用闭区间，比较中点与 target 后丢弃不可能的一半；所有行都未找到才返回 false。\n\n每行二分始终保留该行所有可能等于 target 的位置；遍历全部行保证不会遗漏其他行中的目标。",
          "en": "Use row ordering alone: each row can be searched independently, even when value ranges overlap across rows. Maintain an inclusive candidate interval and discard the impossible half after each comparison. Return false only after all rows fail. Each binary search preserves every possible occurrence in its row. Searching all rows covers the full matrix."
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
        "time": "O(m log(n+1))",
        "space": "O(1)",
        "complexity": {
          "zh": "m 行各最多 O(log(n+1)) 次比较；用 n+1 写法包含单列时每行仍需一次比较。仅常数下标。",
          "en": "Each of m rows takes O(log(n+1)) comparisons; n+1 also accounts for single-column rows. Only constant index storage is needed."
        },
        "python": "class Solution:\n    def searchMatrix(self, matrix, target):\n        for row in matrix:\n            lo, hi = 0, len(row)-1\n            while lo <= hi:\n                mid = (lo+hi)//2\n                if row[mid] == target: return True\n                if row[mid] < target: lo = mid+1\n                else: hi = mid-1\n        return False\n",
        "java": "class Solution {\n    public boolean searchMatrix(int[][] a,int target) {\n        for(int[] row:a) {\n            int lo=0,hi=row.length-1;\n            while(lo<=hi) {\n                int mid=lo+(hi-lo)/2;\n                if(row[mid]==target) return true;\n                if(row[mid]<target) lo=mid+1; else hi=mid-1;\n            }\n        }\n        return false;\n    }\n}\n",
        "algorithmNotes": {
          "zh": "每一行有序，所以在该行用二分查找 target，但不能把整张矩阵当成全局有序的一维数组。某行找到即可返回 true；所有行都失败后才返回 false。",
          "en": "Binary-search target within each sorted row, but do not flatten the matrix as though all rows formed one sorted sequence. Return true as soon as one row matches, and false only after all rows fail."
        }
      },
      {
        "key": "staircase",
        "name": {
          "zh": "右上角阶梯搜索",
          "en": "Top-right staircase"
        },
        "intuition": {
          "zh": "右上角同时是当前行最大值、当前列最小值。若它太大，下面同列都不会是目标，可以删整列；若它太小，左侧同排都不会是目标，可以删整行。每次只剩一个更小矩形，这是左上角所不具备的单向排除性质。\n\n每次移除的行或列都由单调性证明不可能包含目标；若目标存在，它始终留在剩余矩形内，因此遇到或排空时结论正确。",
          "en": "The top-right cell is the largest value in its remaining row and the smallest in its remaining column. If too large, eliminate its column; if too small, eliminate its row. This corner supports a safe one-directional elimination that the top-left corner does not. Monotonicity proves each removed row or column cannot contain target. Any occurrence remains in the candidate rectangle until found; an empty rectangle proves absence."
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
        "time": "O(m+n)",
        "space": "O(1)",
        "complexity": {
          "zh": "行只增最多 m 次，列只减最多 n 次，总比较 O(m+n)；两个坐标 O(1)。",
          "en": "The row increases at most m times and the column decreases at most n times. Two coordinates require O(1) space."
        },
        "python": "class Solution:\n    def searchMatrix(self, matrix, target):\n        r, c = 0, len(matrix[0])-1\n        while r < len(matrix) and c >= 0:\n            if matrix[r][c] == target: return True\n            if matrix[r][c] > target: c -= 1\n            else: r += 1\n        return False\n",
        "java": "class Solution {\n    public boolean searchMatrix(int[][] a,int target) {\n        int r=0,c=a[0].length-1;\n        while(r<a.length && c>=0) {\n            if(a[r][c]==target) return true;\n            if(a[r][c]>target) c--; else r++;\n        }\n        return false;\n    }\n}\n",
        "algorithmNotes": {
          "zh": "从右上角出发，当前值大于 target 时整列向下都更大，故左移一列。当前值较小时该行向左都更小，故下移一行；每次比较恰好排除一行或一列。",
          "en": "Start at the top-right corner. If the value exceeds target, everything below it is too large, so move left; if smaller, everything to its left is too small, so move down, eliminating a column or row per comparison."
        }
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
    },
    "examples": [
      {
        "input": "matrix = [[1,4,7],[2,5,8]], target = 5",
        "output": "true"
      },
      {
        "input": "matrix = [[1,4,7],[2,5,8]], target = 6",
        "output": "false"
      },
      {
        "input": "matrix = [[3]], target = 3",
        "output": "true"
      }
    ]
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
    "methods": [
      {
        "key": "identity-set",
        "name": {
          "zh": "保存节点身份",
          "en": "Store node identities"
        },
        "intuition": {
          "zh": "相交判断比较的是内存中的节点对象，不能把 val 放进集合。先记住 A 的全部节点，再沿 B 查找，第一个出现在集合中的对象就是公共后缀的起点。Java 使用身份集合明确避免未来节点 equals 定义影响结果。\n\n集合恰好包含 A 中对象；按 B 顺序首次命中必是共享后缀第一个节点。仅读取 next，不修改链表。",
          "en": "Intersection is about node identity, not stored values. Remember all nodes in A, then walk B until an object is found in that set. The first match starts the shared suffix. Java uses an identity-backed set so custom value-based equality cannot change the meaning. The set contains exactly A’s node objects. The earliest match along B is the start of its shared suffix. Links are only read, so both lists are preserved."
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
        "time": "Expected O(m+n)",
        "space": "O(m)",
        "complexity": {
          "zh": "A 建集合 O(m)，B 查询期望 O(n)，集合大小 m。",
          "en": "Building A’s set takes O(m), and B’s lookups take expected O(n). The set holds m references."
        },
        "python": "class Solution:\n    def getIntersectionNode(self, headA, headB):\n        seen = set()\n        p = headA\n        while p:\n            seen.add(p); p = p.next\n        p = headB\n        while p:\n            if p in seen: return p\n            p = p.next\n        return None\n",
        "java": "import java.util.*;\nclass Solution {\n    public ListNode getIntersectionNode(ListNode headA,ListNode headB) {\n        Set<ListNode> seen=Collections.newSetFromMap(new IdentityHashMap<>());\n        for(ListNode p=headA;p!=null;p=p.next) seen.add(p);\n        for(ListNode p=headB;p!=null;p=p.next) if(seen.contains(p)) return p;\n        return null;\n    }\n}\n",
        "algorithmNotes": {
          "zh": "集合中保存节点对象本身，不是节点值，因为不同节点可以具有相同值。遍历第二条链表时，第一个已在集合中的对象就是公共尾部的起点；没有共享对象则返回空。",
          "en": "Store node identities rather than values, since distinct nodes may have equal values. The first node in the second list whose identity is present begins the shared tail; return null when no object is shared."
        }
      },
      {
        "key": "switch-heads",
        "name": {
          "zh": "双指针交换起点",
          "en": "Switch heads to equalize distances"
        },
        "intuition": {
          "zh": "长度不同使两个头同步走时到达公共后缀的时间不同。让 p 走完 A 后走 B，让 q 走完 B 后走 A，相当于各走相同总长度，前缀长度差被抵消。有公共尾部时它们会在入口对齐；完全不相交时会同时变空。比较始终用对象身份。\n\n若独立前缀长为 a、b，公共后缀长为 c，换头后两指针分别跨过 a+c+b 与 b+c+a 个节点到达公共入口，距离相同。无公共后缀则走完两链后同为空。",
          "en": "Different prefix lengths prevent simultaneous arrival at the shared suffix. Let p traverse A then B, and q traverse B then A. Both cover the same combined length, canceling the prefix difference. They align at the shared entry, or become null together if no intersection exists. With private prefix lengths a and b and shared suffix length c, switching heads makes both cover equal prefix-adjusted distances before the shared entry. Without a suffix they both finish the two lists and become null."
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
        "time": "O(m+n)",
        "space": "O(1)",
        "complexity": {
          "zh": "每个指针最多经过两条链和常数次换头；仅存两个引用。",
          "en": "Each pointer crosses at most both lists with constant redirect overhead. Only two references are stored."
        },
        "python": "class Solution:\n    def getIntersectionNode(self, headA, headB):\n        p, q = headA, headB\n        while p is not q:\n            p = p.next if p else headB\n            q = q.next if q else headA\n        return p\n",
        "java": "class Solution {\n    public ListNode getIntersectionNode(ListNode a,ListNode b) {\n        ListNode p=a,q=b;\n        while(p!=q) { p=p==null?b:p.next; q=q==null?a:q.next; }\n        return p;\n    }\n}\n",
        "algorithmNotes": {
          "zh": "两个指针到达空节点时分别跳到另一条链表的头部，各自最终走过 A+B 和 B+A。长度差被抵消后，它们会在同一个公共节点相遇，或同时为空；比较仍是节点身份。",
          "en": "Redirect each pointer to the other head after it reaches null, producing routes A+B and B+A. This cancels the length difference so pointers meet at the same shared node or at null; compare identities throughout."
        }
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
    },
    "examples": [
      {
        "input": "listA = [1,2,7,8], listB = [3,7,8], skipA = 2, skipB = 1",
        "output": "7",
        "note": {
          "zh": "skipA、skipB 是各链表在共享节点前的节点数；相同数值不代表同一节点。输出为交点的值，null 表示不相交。",
          "en": "skipA and skipB count nodes before the shared tail; equal values alone do not imply shared identity. Output shows the intersection value, or null."
        }
      },
      {
        "input": "listA = [1,2], listB = [3,4], skipA = 2, skipB = 2",
        "output": "null",
        "note": {
          "zh": "skipA、skipB 是各链表在共享节点前的节点数；相同数值不代表同一节点。输出为交点的值，null 表示不相交。",
          "en": "skipA and skipB count nodes before the shared tail; equal values alone do not imply shared identity. Output shows the intersection value, or null."
        }
      },
      {
        "input": "listA = [5,6], listB = [5,6], skipA = 0, skipB = 0",
        "output": "5",
        "note": {
          "zh": "skipA、skipB 是各链表在共享节点前的节点数；相同数值不代表同一节点。输出为交点的值，null 表示不相交。",
          "en": "skipA and skipB count nodes before the shared tail; equal values alone do not imply shared identity. Output shows the intersection value, or null."
        }
      }
    ]
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
    "methods": [
      {
        "key": "iterative",
        "name": {
          "zh": "迭代反转指针",
          "en": "Iterative pointer reversal"
        },
        "intuition": {
          "zh": "把链分成已经反转的前缀与尚未处理的后缀。prev 指向反转前缀头，cur 指向后缀头。断开 cur.next 之前必须保存后继，否则会丢失尚未处理的节点。每轮把后缀第一个节点摘下接到反转前缀前面。\n\n每轮后 prev 链恰好是原链已处理前缀的逆序，cur 链仍是完整原始后缀。两部分覆盖全部节点且不丢失，最终只有逆序前缀。",
          "en": "Maintain a reversed prefix headed by prev and an untouched suffix headed by cur. Save cur.next before overwriting it, or the remaining suffix is lost. Each iteration removes the suffix’s first node and prepends it to the reversed prefix. After every iteration, prev is exactly the processed original prefix in reverse order, while cur retains the untouched suffix. Their union preserves all nodes; at termination the reversed prefix is the entire list."
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
        "time": "O(n)",
        "space": "O(1)",
        "complexity": {
          "zh": "每个节点改一次 next，时间 O(n)；只有三个引用。",
          "en": "Each next pointer is changed once, taking O(n) time with three references."
        },
        "python": "class Solution:\n    def reverseList(self, head):\n        prev, cur = None, head\n        while cur:\n            nxt = cur.next\n            cur.next = prev\n            prev, cur = cur, nxt\n        return prev\n",
        "java": "class Solution {\n    public ListNode reverseList(ListNode head) {\n        ListNode prev=null,cur=head;\n        while(cur!=null) {\n            ListNode next=cur.next; cur.next=prev; prev=cur; cur=next;\n        }\n        return prev;\n    }\n}\n",
        "algorithmNotes": {
          "zh": "prev 指向已反转部分的头，cur 指向尚未处理的节点。每轮先保存 cur.next，再令 cur.next=prev，最后推进两个指针；若先改 next 再读取后继，会丢失剩余链表。",
          "en": "prev heads the reversed prefix and cur is the next node to process. Save cur.next before redirecting it to prev, then advance both pointers; reversing the link before saving the successor loses the remaining list."
        }
      },
      {
        "key": "stack",
        "name": {
          "zh": "显式栈倒序重连",
          "en": "Explicit stack and reconnect"
        },
        "intuition": {
          "zh": "栈的后进先出顺序就是链表访问顺序的逆序。保存的是节点引用，弹出后改 next 即可复用原节点。这是把“记住回程”显式存起来的方案，避免长链在 Python 默认递归深度下失败，但需要线性内存。\n\n弹出顺序与原顺序相反，每个原节点只接入一次；最后清空末尾旧指针，确保无环并得到完整逆序链。",
          "en": "A stack pops nodes in reverse visitation order. Store references and reconnect them on pop, reusing the original nodes. This explicitly stores the return path without relying on Python’s recursion limit, at the cost of linear memory. Pop order reverses the original order, and each node is appended once. Clearing the final old pointer prevents a cycle and terminates the reversed list."
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
        "time": "O(n)",
        "space": "O(n)",
        "complexity": {
          "zh": "压栈和弹栈各 n 次；栈存 n 个节点引用。",
          "en": "There are n pushes and n pops; the stack stores n references."
        },
        "python": "class Solution:\n    def reverseList(self, head):\n        stack = []\n        while head:\n            stack.append(head); head = head.next\n        if not stack: return None\n        new_head = tail = stack.pop()\n        while stack:\n            tail.next = stack.pop(); tail = tail.next\n        tail.next = None\n        return new_head\n",
        "java": "import java.util.*;\nclass Solution {\n    public ListNode reverseList(ListNode head) {\n        Deque<ListNode> stack=new ArrayDeque<>();\n        for(ListNode p=head;p!=null;p=p.next) stack.push(p);\n        if(stack.isEmpty()) return null;\n        ListNode ans=stack.pop(),tail=ans;\n        while(!stack.isEmpty()) { tail.next=stack.pop(); tail=tail.next; }\n        tail.next=null; return ans;\n    }\n}\n",
        "algorithmNotes": {
          "zh": "第一遍把节点引用压栈，出栈顺序就是反向顺序。连接相邻出栈节点后，必须把最后一个节点的 next 置空，清除旧链表残留的前向链接，避免形成环。",
          "en": "Push node references onto a stack, then pop them in reverse order and reconnect them. Set the final node's next to null to remove its old forward link and prevent a cycle."
        }
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
    },
    "examples": [
      {
        "input": "head = [1,2,3]",
        "output": "[3,2,1]"
      },
      {
        "input": "head = []",
        "output": "[]"
      },
      {
        "input": "head = [7]",
        "output": "[7]"
      }
    ]
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
    "methods": [
      {
        "key": "values",
        "name": {
          "zh": "值数组与双指针",
          "en": "Value array with two pointers"
        },
        "intuition": {
          "zh": "单链表无法直接从尾部向前走，把值复制到数组后就能随机访问两端。只比较首尾、次首次尾等配对位置即可，不必额外复制一个反转数组。原链完全只读，代价是保存所有值。\n\n数组保持原值顺序，左右指针枚举每一组对称位置。所有配对相等与回文定义完全等价。",
          "en": "A singly linked list cannot move backward. Copy its values into an array to gain random access to both ends. Compare symmetric pairs without constructing another reversed array. The original links stay untouched, but all values require storage. The array preserves list order, and the pointers enumerate every symmetric pair. All pairs matching is exactly the definition of a palindrome."
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
        "time": "O(n)",
        "space": "O(n)",
        "complexity": {
          "zh": "复制 n 个值，比较至多 n/2 对；值数组 O(n)。",
          "en": "Copy n values and compare at most n/2 pairs. The value array needs O(n) storage."
        },
        "python": "class Solution:\n    def isPalindrome(self, head):\n        values = []\n        while head:\n            values.append(head.val); head = head.next\n        l, r = 0, len(values)-1\n        while l < r:\n            if values[l] != values[r]: return False\n            l += 1; r -= 1\n        return True\n",
        "java": "import java.util.*;\nclass Solution {\n    public boolean isPalindrome(ListNode head) {\n        List<Integer> values=new ArrayList<>();\n        for(ListNode p=head;p!=null;p=p.next) values.add(p.val);\n        for(int l=0,r=values.size()-1;l<r;l++,r--)\n            if(!values.get(l).equals(values.get(r))) return false;\n        return true;\n    }\n}\n",
        "algorithmNotes": {
          "zh": "先把整条链表的值复制到数组，再从数组两端向中间比较。比较的是对称位置的值而不是节点对象；任一对不同立即返回 false，全部相等则返回 true。",
          "en": "Copy all node values into an array and compare symmetric positions from both ends. Compare values, not node identities; return false on the first mismatch and true when all pairs agree."
        }
      },
      {
        "key": "half-reverse",
        "name": {
          "zh": "反转后半段并恢复",
          "en": "Reverse the second half, then restore"
        },
        "intuition": {
          "zh": "快慢指针能找到前半段末尾；将它后面的链反转后，就可从两端对应的值开始同步比较。奇数长度中间节点不影响回文，只比较较短的后半段。即使发现不匹配，也先记录结果而不是立即返回，最后把后半段反转回来，避免检查函数破坏输入。\n\n反转后后半段的第 i 个值正是原链倒数第 i 个值，因此同步比较覆盖所有对称配对。第二次反转是第一次的逆操作，恢复原链接。",
          "en": "Find the end of the first half with fast and slow pointers. Reverse the suffix after it so both ends can be compared by forward walks. An odd middle value need not be compared. Record mismatches instead of returning early, then reverse the suffix again to restore the original structure. After reversal, the i-th suffix value is the original i-th value from the end. Parallel comparison checks all symmetric pairs. Applying the same reversal again restores every original link."
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
        "time": "O(n)",
        "space": "O(1)",
        "complexity": {
          "zh": "找中点、两次半链反转与比较都为 O(n) 总量；迭代反转无递归栈，O(1) 辅助空间。",
          "en": "Finding the midpoint, reversing twice, and comparing take O(n) total time. Iterative reversal uses no recursion stack and O(1) auxiliary space."
        },
        "python": "class Solution:\n    def isPalindrome(self, head):\n        if not head or not head.next: return True\n        def reverse(node):\n            prev = None\n            while node:\n                nxt = node.next; node.next = prev\n                prev, node = node, nxt\n            return prev\n        slow = fast = head\n        while fast.next and fast.next.next:\n            slow = slow.next; fast = fast.next.next\n        second = reverse(slow.next)\n        p, q, ok = head, second, True\n        while q:\n            if p.val != q.val: ok = False\n            p, q = p.next, q.next\n        slow.next = reverse(second)\n        return ok\n",
        "java": "class Solution {\n    private ListNode reverse(ListNode p) {\n        ListNode prev=null;\n        while(p!=null) { ListNode next=p.next; p.next=prev; prev=p; p=next; }\n        return prev;\n    }\n    public boolean isPalindrome(ListNode head) {\n        if(head==null || head.next==null) return true;\n        ListNode slow=head,fast=head;\n        while(fast.next!=null && fast.next.next!=null) { slow=slow.next; fast=fast.next.next; }\n        ListNode second=reverse(slow.next),p=head,q=second; boolean ok=true;\n        while(q!=null) { if(p.val!=q.val) ok=false; p=p.next; q=q.next; }\n        slow.next=reverse(second); return ok;\n    }\n}\n",
        "algorithmNotes": {
          "zh": "快指针走两步、慢指针走一步定位中点，只反转后半段。比较时以后半段是否结束为准，奇数长度的中心不用配对；比较完成后再反转回来并接回原链表。",
          "en": "Use fast and slow pointers to locate the middle, then reverse only the second half. Compare until that half ends, leaving an odd middle unpaired; reverse and reconnect the half afterward to restore the input."
        }
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
    },
    "examples": [
      {
        "input": "head = [1,2,2,1]",
        "output": "true"
      },
      {
        "input": "head = [1,2]",
        "output": "false"
      },
      {
        "input": "head = [7]",
        "output": "true"
      }
    ]
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
    "methods": [
      {
        "key": "visited",
        "name": {
          "zh": "访问身份集合",
          "en": "Visited identity set"
        },
        "intuition": {
          "zh": "沿链前进时记录见过的节点引用。如果当前引用已经出现过，就完成了一次绕环；第一次重复的恰是环入口，而不是随机一个环内节点。不能记录节点值，因为两个不同节点可能保存同一个数。\n\n第一次重复前，行走经过非环前缀，再绕环一周；首次重复只能是入口。若走到空，每个节点只经过一次，故无环。",
          "en": "Record node references while advancing. Encountering the same object again proves a loop; the first repeated object is precisely the entry, not an arbitrary node inside the cycle. Values cannot serve as keys because distinct nodes may have equal values. Before any repetition, traversal covers the acyclic prefix and one full cycle. The first repeat is the entry. Reaching null without a repeat proves the list is acyclic."
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
        "time": "Expected O(n)",
        "space": "O(n)",
        "complexity": {
          "zh": "n 为不同节点数；每个节点至多加入一次，至多再做一次重复查询，集合 O(n)。",
          "en": "For n distinct nodes, each is inserted at most once, followed by at most one repeated lookup. The set occupies O(n)."
        },
        "python": "class Solution:\n    def hasCycle(self, head):\n        seen = set()\n        while head:\n            if head in seen: return True\n            seen.add(head); head = head.next\n        return False\n",
        "java": "import java.util.*;\nclass Solution {\n    public boolean hasCycle(ListNode head) {\n        Set<ListNode> seen=Collections.newSetFromMap(new IdentityHashMap<>());\n        while(head!=null) {\n            if(!seen.add(head)) return true;\n            head=head.next;\n        }\n        return false;\n    }\n}\n",
        "algorithmNotes": {
          "zh": "每次处理节点前检查它的引用是否已出现，出现过就说明沿 next 走回了旧位置。先检查再加入集合并前进；如果到达 null，说明链表正常结束而不存在环。",
          "en": "Before visiting a node, check whether its identity was seen; seeing it again means next links have returned to an earlier position. Otherwise record it and advance; reaching null proves there is no cycle."
        }
      },
      {
        "key": "floyd",
        "name": {
          "zh": "快慢指针判环",
          "en": "Floyd cycle detection"
        },
        "intuition": {
          "zh": "slow 每次走一步、fast 两步。无环时 fast 更快碰到空；有环时两者最终都在环中，fast 相对 slow 每轮前进一格。环上的距离按环长取模，因此一定会缩到零。初始化二者相同不算相遇，必须先移动再比较。\n\n入环后相对位置每轮变化 1，至多一圈相遇；无环情况下 fast 只会到达空而不会追上 slow。",
          "en": "Slow advances once and fast twice. In an acyclic list fast reaches null. In a cycle both eventually enter it, and fast gains one position per round modulo the cycle length, so they must meet. Their initial equality is not evidence: compare only after moving. Inside a cycle the relative position changes by one each round, guaranteeing a meeting within one cycle. Without a cycle fast reaches null without revisiting slow."
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
        "time": "O(n)",
        "space": "O(1)",
        "complexity": {
          "zh": "非环前缀和至多一圈的追赶为 O(n)；仅两个指针。",
          "en": "Crossing the prefix and at most one cycle of chasing costs O(n); only two pointers are needed."
        },
        "python": "class Solution:\n    def hasCycle(self, head):\n        slow = fast = head\n        while fast and fast.next:\n            slow = slow.next; fast = fast.next.next\n            if slow is fast: return True\n        return False\n",
        "java": "class Solution {\n    public boolean hasCycle(ListNode head) {\n        ListNode slow=head,fast=head;\n        while(fast!=null && fast.next!=null) {\n            slow=slow.next; fast=fast.next.next;\n            if(slow==fast) return true;\n        }\n        return false;\n    }\n}\n",
        "algorithmNotes": {
          "zh": "循环条件必须同时确认 fast 和 fast.next 非空，才能安全移动两步。移动之后比较 slow 与 fast；无环时 fast 先到空，有环时两者在环内的相对距离每轮改变一步，最终相遇。",
          "en": "Check both fast and fast.next before advancing two links. Compare pointers after moving: fast reaches null without a cycle, while inside a cycle their relative distance changes by one each iteration until they meet."
        }
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
    },
    "examples": [
      {
        "input": "head = [1,2,3], pos = 1",
        "output": "true",
        "note": {
          "zh": "pos 表示尾节点连接的零基下标，−1 表示无环；pos 不作为函数参数。",
          "en": "pos is the zero-based index connected to the tail, or −1 for no cycle; it is not a function argument."
        }
      },
      {
        "input": "head = [1], pos = -1",
        "output": "false",
        "note": {
          "zh": "pos 表示尾节点连接的零基下标，−1 表示无环；pos 不作为函数参数。",
          "en": "pos is the zero-based index connected to the tail, or −1 for no cycle; it is not a function argument."
        }
      },
      {
        "input": "head = [1], pos = 0",
        "output": "true",
        "note": {
          "zh": "pos 表示尾节点连接的零基下标，−1 表示无环；pos 不作为函数参数。",
          "en": "pos is the zero-based index connected to the tail, or −1 for no cycle; it is not a function argument."
        }
      }
    ]
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
    "methods": [
      {
        "key": "visited",
        "name": {
          "zh": "访问身份集合",
          "en": "Visited identity set"
        },
        "intuition": {
          "zh": "沿链前进时记录见过的节点引用。如果当前引用已经出现过，就完成了一次绕环；第一次重复的恰是环入口，而不是随机一个环内节点。不能记录节点值，因为两个不同节点可能保存同一个数。\n\n第一次重复前，行走经过非环前缀，再绕环一周；首次重复只能是入口。若走到空，每个节点只经过一次，故无环。",
          "en": "Record node references while advancing. Encountering the same object again proves a loop; the first repeated object is precisely the entry, not an arbitrary node inside the cycle. Values cannot serve as keys because distinct nodes may have equal values. Before any repetition, traversal covers the acyclic prefix and one full cycle. The first repeat is the entry. Reaching null without a repeat proves the list is acyclic."
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
        "time": "Expected O(n)",
        "space": "O(n)",
        "complexity": {
          "zh": "n 为不同节点数；每个节点至多加入一次，至多再做一次重复查询，集合 O(n)。",
          "en": "For n distinct nodes, each is inserted at most once, followed by at most one repeated lookup. The set occupies O(n)."
        },
        "python": "class Solution:\n    def detectCycle(self, head):\n        seen = set()\n        while head:\n            if head in seen: return head\n            seen.add(head); head = head.next\n        return None\n",
        "java": "import java.util.*;\nclass Solution {\n    public ListNode detectCycle(ListNode head) {\n        Set<ListNode> seen=Collections.newSetFromMap(new IdentityHashMap<>());\n        while(head!=null) {\n            if(!seen.add(head)) return head;\n            head=head.next;\n        }\n        return null;\n    }\n}\n",
        "algorithmNotes": {
          "zh": "遍历时第一次再次遇到的节点就是环入口，因为从头到入口之前的节点均只访问一次。返回该节点对象而非它的值；测试示例中的 pos 只是构造环的位置，不是函数参数。",
          "en": "The first node encountered twice is the entry because nodes before the cycle are visited only once. Return that node object, not its value; pos in examples specifies how to build the cycle and is not a function argument."
        }
      },
      {
        "key": "floyd-entry",
        "name": {
          "zh": "相遇后等速寻找入口",
          "en": "Floyd meeting, then locate entry"
        },
        "intuition": {
          "zh": "快慢指针第一次相遇通常不是入口。设头到入口距离 a，入口到相遇点沿环距离 b，环长 L。相遇时慢指针所走距离是 L 的整数倍，因此 a+b≡0(mod L)。从相遇点再走 a 步正好到入口；同时另一个指针从头走 a 步也到入口，所以重置一个指针后让二者等速走。\n\n相遇方程给出 a+b 为环长整数倍；第二阶段 a 步后两者同到入口。在此之前 entry 仍在无环前缀，不可能与环内 slow 相同。",
          "en": "The first Floyd meeting is usually not the entry. Let a be the prefix length, b the forward distance from entry to meeting, and L the cycle length. At a meeting slow’s traveled distance is a multiple of L, so a+b≡0 mod L. Walking a further steps from the meeting lands at the entry, exactly when a pointer starting at head reaches it. The meeting equation makes a+b a multiple of the cycle length. After a synchronized steps both reach the entry. They cannot meet earlier because entry is then still outside the cycle."
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
        "time": "O(n)",
        "space": "O(1)",
        "complexity": {
          "zh": "判环 O(n)，第二阶段走前缀长度 a，仍为 O(n)；使用常数引用且不改 next。",
          "en": "Detection takes O(n), followed by a prefix-length walk. The method uses constant references and never changes links."
        },
        "python": "class Solution:\n    def detectCycle(self, head):\n        slow = fast = head\n        while fast and fast.next:\n            slow = slow.next; fast = fast.next.next\n            if slow is fast:\n                entry = head\n                while entry is not slow:\n                    entry = entry.next; slow = slow.next\n                return entry\n        return None\n",
        "java": "class Solution {\n    public ListNode detectCycle(ListNode head) {\n        ListNode slow=head,fast=head;\n        while(fast!=null && fast.next!=null) {\n            slow=slow.next; fast=fast.next.next;\n            if(slow==fast) {\n                ListNode entry=head;\n                while(entry!=slow) { entry=entry.next; slow=slow.next; }\n                return entry;\n            }\n        }\n        return null;\n    }\n}\n",
        "algorithmNotes": {
          "zh": "第一阶段只负责找到相遇点，相遇点通常不等于入口。随后把一个指针放回头部，两个指针都改为每次一步；再次相遇的节点才是入口，无环时在第一阶段返回空。",
          "en": "The first phase finds a meeting point that need not be the entry. Reset one pointer to the head and advance both one link at a time; their next meeting is the entry, while an acyclic list returns null in phase one."
        }
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
    },
    "examples": [
      {
        "input": "head = [1,2,3], pos = 1",
        "output": "1",
        "note": {
          "zh": "pos 用于构造环，不作为函数参数。输出为返回节点的零基下标；null 表示无环。",
          "en": "pos builds the cycle and is not a function argument. Output shows the returned node’s zero-based index, or null for no cycle."
        }
      },
      {
        "input": "head = [1], pos = -1",
        "output": "null",
        "note": {
          "zh": "pos 用于构造环，不作为函数参数。输出为返回节点的零基下标；null 表示无环。",
          "en": "pos builds the cycle and is not a function argument. Output shows the returned node’s zero-based index, or null for no cycle."
        }
      },
      {
        "input": "head = [1], pos = 0",
        "output": "0",
        "note": {
          "zh": "pos 用于构造环，不作为函数参数。输出为返回节点的零基下标；null 表示无环。",
          "en": "pos builds the cycle and is not a function argument. Output shows the returned node’s zero-based index, or null for no cycle."
        }
      }
    ]
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
    "methods": [
      {
        "key": "iterative",
        "name": {
          "zh": "哨兵节点迭代归并",
          "en": "Iterative merge with a sentinel"
        },
        "intuition": {
          "zh": "每条链的头都是该链剩余部分的最小值，两头中较小的就是全局下一个值。dummy 让第一次接节点与后续接节点用同一套代码；tail 永远是已完成结果的末尾。某条链耗尽后，另一条本来就有序，可整体接上。\n\n已合并前缀始终有序且包含所有已取节点；每次取剩余最小头维持不变式。尾部剩余链不小于最后选出的值。",
          "en": "Each head is the smallest remaining value in its list, so the smaller head is the next global value. A dummy node removes special handling for the first append, while tail marks the completed prefix. Once one list ends, its sorted counterpart can be attached wholesale. The merged prefix stays sorted and contains exactly the consumed nodes. Choosing the smallest remaining head preserves this invariant; the leftover suffix is no smaller than the final chosen value."
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
        "time": "O(m+n)",
        "space": "O(1)",
        "complexity": {
          "zh": "至多逐个选择 m+n 个节点；复用节点，仅一个哨兵和几个指针。",
          "en": "At most m+n nodes are selected. Nodes are reused; one sentinel and a few pointers require constant auxiliary space."
        },
        "python": "class Solution:\n    def mergeTwoLists(self, list1, list2):\n        dummy = tail = ListNode(0)\n        while list1 and list2:\n            if list1.val <= list2.val:\n                tail.next = list1; list1 = list1.next\n            else:\n                tail.next = list2; list2 = list2.next\n            tail = tail.next\n        tail.next = list1 if list1 else list2\n        return dummy.next\n",
        "java": "class Solution {\n    public ListNode mergeTwoLists(ListNode a,ListNode b) {\n        ListNode dummy=new ListNode(0),tail=dummy;\n        while(a!=null && b!=null) {\n            if(a.val<=b.val) { tail.next=a; a=a.next; }\n            else { tail.next=b; b=b.next; }\n            tail=tail.next;\n        }\n        tail.next=a!=null?a:b; return dummy.next;\n    }\n}\n",
        "algorithmNotes": {
          "zh": "哑节点让“接入第一个节点”和后续连接使用同一逻辑。每轮把值较小的节点接到 tail 后，只推进被选中的链表；一条为空后直接接上另一条剩余部分。",
          "en": "A dummy head makes the first attachment identical to later ones. Attach the smaller current node to tail and advance only its list; when either list ends, attach the entire remainder of the other list."
        }
      },
      {
        "key": "recursive",
        "name": {
          "zh": "递归定义合并结果",
          "en": "Recursive merge definition"
        },
        "intuition": {
          "zh": "结果头一定是两头中较小的节点。选中它后，剩下的问题只是“它后面的链与另一条链如何合并”，规模少一个节点。递归直接表达这个结构，空链是终止条件；代价是每次选择都留下一个等待返回的调用栈帧。 本题链长上限较小，递归深度可控；若复用于长链，应优先迭代版本，以免调用栈或 Python 递归深度超限。\n\n对总节点数归纳：空链成立；较小头是正确首项，递归保证其后的合并有序且完整，故整个结果成立。",
          "en": "The smaller input head must head the result. After choosing it, the only remaining task is merging its suffix with the other list, reducing the problem by one node. Recursion expresses this structure directly, with empty lists as base cases, but every pending choice consumes a stack frame. The small official length bounds keep recursion manageable here. For long-list reuse, prefer the iterative version to avoid call-stack or Python recursion-depth limits. Induct on total length: an empty input is trivial. The smaller head is correct, and the recursive result is a complete sorted merge of the remaining nodes, completing the proof."
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
        "time": "O(m+n)",
        "space": "O(m+n)",
        "complexity": {
          "zh": "每次递归至少消耗一个节点，最多 m+n 层；此题节点较少，但不能把递归空间误写 O(1)。",
          "en": "Each call consumes a node, yielding at most m+n calls and stack frames. This problem’s small limits permit recursion, but its auxiliary space is not constant."
        },
        "python": "class Solution:\n    def mergeTwoLists(self, list1, list2):\n        if not list1: return list2\n        if not list2: return list1\n        if list1.val <= list2.val:\n            list1.next = self.mergeTwoLists(list1.next, list2)\n            return list1\n        list2.next = self.mergeTwoLists(list1, list2.next)\n        return list2\n",
        "java": "class Solution {\n    public ListNode mergeTwoLists(ListNode a,ListNode b) {\n        if(a==null) return b;\n        if(b==null) return a;\n        if(a.val<=b.val) { a.next=mergeTwoLists(a.next,b); return a; }\n        b.next=mergeTwoLists(a,b.next); return b;\n    }\n}\n",
        "algorithmNotes": {
          "zh": "递归函数返回两个剩余链表合并后的头节点。选择较小头节点作为本层结果，把它的 next 接到其余部分的递归结果；某条链表为空时直接返回另一条作为终止条件。",
          "en": "Each call returns the head of the merged remaining lists. Choose the smaller head and connect its next to the recursively merged remainder; if either input is empty, return the other immediately."
        }
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
    },
    "examples": [
      {
        "input": "list1 = [1,3,5], list2 = [2,4]",
        "output": "[1,2,3,4,5]"
      },
      {
        "input": "list1 = [], list2 = []",
        "output": "[]"
      },
      {
        "input": "list1 = [], list2 = [2]",
        "output": "[2]"
      }
    ]
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
    "methods": [
      {
        "key": "carry",
        "name": {
          "zh": "逐位相加与进位",
          "en": "Digit-wise addition with carry"
        },
        "intuition": {
          "zh": "低位在前恰好符合竖式加法的计算顺序，不必翻转，也不必把长整数拼起来。当前位置总和为两位数字与进位之和；除以 10 的余数是结果位，整除 10 是下一位进位。短链用 0 补齐，两条链都结束后仍可能剩一个进位。此处保留一个清晰通用方案，不为凑数量引入大整数转换。\n\n处理第 k 位后，输出前 k 位等于两输入低 k 位相加的低 k 位，carry 保存向更高位的全部影响。循环结束时无未处理数字或进位，所以结果完整。",
          "en": "Least-significant-first storage already matches column addition, so no reversal or whole-number conversion is needed. Add the two current digits and carry; remainder modulo 10 is the output digit, and quotient is the next carry. Treat an exhausted list as zeros, and preserve a final carry after both lists end. One general solution is sufficient here; large-integer conversion adds no useful algorithmic insight. After k columns, the output’s first k digits equal the low k digits of the sum, and carry contains the entire effect on the next column. With no remaining digits or carry, the result is complete."
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
        "time": "O(max(m,n))",
        "space": "O(1) auxiliary; O(max(m,n)) output",
        "complexity": {
          "zh": "每轮消费一个数位，最多 max(m,n)+1 轮。额外变量常数；新结果节点最多 max(m,n)+1 个。",
          "en": "There are at most max(m,n)+1 columns. Auxiliary variables are constant; the new result uses at most max(m,n)+1 nodes."
        },
        "python": "class Solution:\n    def addTwoNumbers(self, l1, l2):\n        dummy = tail = ListNode(0)\n        carry = 0\n        while l1 or l2 or carry:\n            total = carry\n            if l1: total += l1.val; l1 = l1.next\n            if l2: total += l2.val; l2 = l2.next\n            carry, digit = divmod(total, 10)\n            tail.next = ListNode(digit); tail = tail.next\n        return dummy.next\n",
        "java": "class Solution {\n    public ListNode addTwoNumbers(ListNode a,ListNode b) {\n        ListNode dummy=new ListNode(0),tail=dummy; int carry=0;\n        while(a!=null || b!=null || carry!=0) {\n            int total=carry;\n            if(a!=null) { total+=a.val; a=a.next; }\n            if(b!=null) { total+=b.val; b=b.next; }\n            tail.next=new ListNode(total%10); tail=tail.next; carry=total/10;\n        }\n        return dummy.next;\n    }\n}\n",
        "algorithmNotes": {
          "zh": "两个链表按低位到高位相加，缺少的位按 0 处理。新节点值为总和 %10，进位为总和 //10；循环还要覆盖最后的进位，即使两个链表都结束也可能需要再建一个节点。",
          "en": "Process digits from least to most significant, treating missing digits as zero. Emit total%10 and carry total//10; continue when a final carry remains even if both input lists have ended."
        }
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
    },
    "examples": [
      {
        "input": "l1 = [2,4], l2 = [8,5]",
        "output": "[0,0,1]"
      },
      {
        "input": "l1 = [0], l2 = [0]",
        "output": "[0]"
      },
      {
        "input": "l1 = [9,9], l2 = [1]",
        "output": "[0,0,1]"
      }
    ]
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
    "methods": [
      {
        "key": "length",
        "name": {
          "zh": "先计长度再定位",
          "en": "Count length, then locate"
        },
        "intuition": {
          "zh": "倒数第 n 个就是正数第 L-n+1 个。删除节点需要拿到它的前驱，因此从哨兵出发走 L-n 步。哨兵把删头也变成“修改前驱 next”的普通操作，不需要返回特殊分支。\n\n哨兵视为第 0 个位置，走 L-n 步恰好停在第 L-n+1 个目标之前；跨过一次 next 只删除目标且保留其他节点次序。",
          "en": "The n-th from the end is position L-n+1 from the front. Deleting it requires its predecessor, found by walking L-n steps from a sentinel. A sentinel makes head deletion the same next-pointer update as every other deletion. Treating the sentinel as position zero, L-n steps land immediately before the target at L-n+1. Bypassing that one link removes exactly the target while preserving order."
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
        "time": "O(L)",
        "space": "O(1)",
        "complexity": {
          "zh": "计数 L 次，定位至多 L 次，线性时间；一个哨兵与常数变量。",
          "en": "Counting and locating together take at most two linear traversals. A sentinel and constant variables suffice."
        },
        "python": "class Solution:\n    def removeNthFromEnd(self, head, n):\n        length, p = 0, head\n        while p: length += 1; p = p.next\n        dummy = ListNode(0); dummy.next = head\n        prev = dummy\n        for _ in range(length-n): prev = prev.next\n        prev.next = prev.next.next\n        return dummy.next\n",
        "java": "class Solution {\n    public ListNode removeNthFromEnd(ListNode head,int n) {\n        int length=0; for(ListNode p=head;p!=null;p=p.next) length++;\n        ListNode dummy=new ListNode(0); dummy.next=head; ListNode prev=dummy;\n        for(int i=0;i<length-n;i++) prev=prev.next;\n        prev.next=prev.next.next; return dummy.next;\n    }\n}\n",
        "algorithmNotes": {
          "zh": "先统计长度 L，把删除倒数第 n 个转成删除正数第 L−n+1 个。借助哑节点走 L−n 步找到待删节点的前驱，再跳过其 next，因此删除头节点也无需特殊分支。",
          "en": "Count length L, then translate the target to position L−n+1 from the front. Starting at a dummy node, move L−n links to reach its predecessor and bypass its next, including when deleting the head."
        }
      },
      {
        "key": "gap",
        "name": {
          "zh": "保持 n 个节点的间隔",
          "en": "Maintain a fixed pointer gap"
        },
        "intuition": {
          "zh": "不必先知道总长：让 fast 先从哨兵走 n 步，slow 留在哨兵。随后同步移动，直到 fast 到尾节点。此时 slow 距尾 n 条边，正好位于待删除节点前。这里停止条件是 fast.next 为空，不能混用另一种“先走 n+1 步、直到 fast 为空”的写法。\n\n同步移动保持 n 条边的距离；fast 位于第 L 个节点时 slow 位于 L-n，正是目标 L-n+1 的前驱。",
          "en": "Avoid measuring length by moving fast n steps from the sentinel while slow stays there. Advance both until fast is the tail. Slow is then n edges before the tail, exactly the target’s predecessor. This version stops on fast.next being null; do not mix it with the n+1-gap variant that stops on fast itself being null. Synchronized movement preserves a gap of n edges. At fast’s position L, slow is at L-n, immediately before the target at L-n+1."
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
        "time": "O(L)",
        "space": "O(1)",
        "complexity": {
          "zh": "fast 总共走 L 步，slow 不超过 L 步；常数指针空间，满足一次遍历的进阶目标。",
          "en": "Fast advances L times and slow at most L times. Constant pointer storage satisfies the one-pass follow-up."
        },
        "python": "class Solution:\n    def removeNthFromEnd(self, head, n):\n        dummy = ListNode(0); dummy.next = head\n        fast = slow = dummy\n        for _ in range(n): fast = fast.next\n        while fast.next:\n            fast = fast.next; slow = slow.next\n        slow.next = slow.next.next\n        return dummy.next\n",
        "java": "class Solution {\n    public ListNode removeNthFromEnd(ListNode head,int n) {\n        ListNode dummy=new ListNode(0); dummy.next=head;\n        ListNode fast=dummy,slow=dummy;\n        for(int i=0;i<n;i++) fast=fast.next;\n        while(fast.next!=null) { fast=fast.next; slow=slow.next; }\n        slow.next=slow.next.next; return dummy.next;\n    }\n}\n",
        "algorithmNotes": {
          "zh": "先让前指针比后指针多走 n 个节点，后指针从哑节点开始。一起前进直到前指针到达尾部，此时后指针恰在待删节点之前，执行一次 next 跳接后返回哑节点的 next。",
          "en": "Create an n-node lead while the trailing pointer starts at the dummy node. Move together until the leading pointer reaches the end; the trailing pointer then precedes the target, which can be bypassed with one link update."
        }
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
    },
    "examples": [
      {
        "input": "head = [1,2,3], n = 2",
        "output": "[1,3]"
      },
      {
        "input": "head = [7], n = 1",
        "output": "[]"
      },
      {
        "input": "head = [1,2], n = 2",
        "output": "[2]"
      }
    ]
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
    "methods": [
      {
        "key": "iterative",
        "name": {
          "zh": "前驱指针迭代交换",
          "en": "Iterative swaps with a predecessor"
        },
        "intuition": {
          "zh": "交换 a、b 不只是改它们之间的边，还要把前驱接到 b，再让 a 接回后续链。prev 指向当前一对之前的节点，交换后 a 成了这一对的尾，下一轮 prev 应更新为 a。哨兵解决首对交换导致头变化的问题。\n\n已处理前缀中的每对都正确反转；三次连边既交换当前一对又完整保留后缀。未成对的最后节点不进入循环，保持不变。",
          "en": "Swapping a and b requires three boundary updates: predecessor to b, b to a, and a to the remaining suffix. prev identifies the predecessor of the current pair. After swapping, a is the pair’s tail and becomes the next prev. A sentinel handles the changing head. The processed prefix consists of correctly swapped pairs. Three link updates swap the current pair while retaining its suffix. An unpaired final node never enters the loop and stays unchanged."
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
        "time": "O(n)",
        "space": "O(1)",
        "complexity": {
          "zh": "每轮处理两个节点，O(n)；只使用哨兵与常数引用。",
          "en": "Each iteration handles two nodes, giving O(n) time with constant auxiliary references."
        },
        "python": "class Solution:\n    def swapPairs(self, head):\n        dummy = ListNode(0); dummy.next = head\n        prev = dummy\n        while prev.next and prev.next.next:\n            a, b = prev.next, prev.next.next\n            a.next = b.next; b.next = a; prev.next = b\n            prev = a\n        return dummy.next\n",
        "java": "class Solution {\n    public ListNode swapPairs(ListNode head) {\n        ListNode dummy=new ListNode(0); dummy.next=head; ListNode prev=dummy;\n        while(prev.next!=null && prev.next.next!=null) {\n            ListNode a=prev.next,b=a.next;\n            a.next=b.next; b.next=a; prev.next=b; prev=a;\n        }\n        return dummy.next;\n    }\n}\n",
        "algorithmNotes": {
          "zh": "每组暂存 first、second 和后一组的头，先让 first 指向后一组，再让 second 指向 first，最后接上前一组。组前指针移动到交换后的尾 first；不足两个节点时保持原样。",
          "en": "Save the pair and the next group's head, link first to the remaining list, second to first, and the previous group to second. Advance the group predecessor to first; leave a final unpaired node unchanged."
        }
      },
      {
        "key": "recursive",
        "name": {
          "zh": "递归处理剩余成对节点",
          "en": "Recursively swap the suffix"
        },
        "intuition": {
          "zh": "把第一对与后面的链拆开思考：后面的链已经能通过同一个函数正确两两交换，那么只需让第一节点接上这个结果，再让第二节点成为新头。每次递归规模减少两个，空链或单节点直接返回。 本题链长上限较小，递归深度可控；若复用于长链，应优先迭代版本，以免调用栈或 Python 递归深度超限。\n\n递归假设确保第三个节点后的后缀正确；接成 second→head→已交换后缀恰好完成第一对，且没有修改节点值。",
          "en": "Separate the first pair from the suffix. If the same function correctly swaps the suffix, connect the original first node to that result and make the original second node the new head. Each call removes two nodes from the problem; an empty or singleton suffix needs no change. The small official length bounds keep recursion manageable here. For long-list reuse, prefer the iterative version to avoid call-stack or Python recursion-depth limits. The inductive assumption makes the suffix beginning at the third node correct. Connecting second→head→swapped suffix completes the first pair without changing any values."
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
        "time": "O(n)",
        "space": "O(n)",
        "complexity": {
          "zh": "每层常数操作、深度约 n/2，时间 O(n)，调用栈 O(n)。",
          "en": "Each level performs constant work and recursion depth is about n/2, giving O(n) time and stack space."
        },
        "python": "class Solution:\n    def swapPairs(self, head):\n        if not head or not head.next: return head\n        second = head.next\n        head.next = self.swapPairs(second.next)\n        second.next = head\n        return second\n",
        "java": "class Solution {\n    public ListNode swapPairs(ListNode head) {\n        if(head==null || head.next==null) return head;\n        ListNode second=head.next;\n        head.next=swapPairs(second.next); second.next=head;\n        return second;\n    }\n}\n",
        "algorithmNotes": {
          "zh": "当前两个节点交换后，原第一个节点会成为本组尾部。把它的 next 接到第三个节点开始的递归结果，再让第二个节点指向第一个；返回第二个作为本组新头。",
          "en": "After swapping a pair, the original first node becomes its tail. Link it to the recursively swapped suffix starting at the third node, then point the second node to the first and return the second as the new head."
        }
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
    },
    "examples": [
      {
        "input": "head = [1,2,3,4]",
        "output": "[2,1,4,3]"
      },
      {
        "input": "head = [1,2,3]",
        "output": "[2,1,3]"
      },
      {
        "input": "head = []",
        "output": "[]"
      }
    ]
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
    "methods": [
      {
        "key": "group-stack",
        "name": {
          "zh": "组内栈倒序重连",
          "en": "Stack each complete group"
        },
        "intuition": {
          "zh": "先收集最多 k 个节点引用，确认这一组是否完整，再动原连接。完整组按出栈顺序接回；若不足 k 个，当前后缀从未被修改，可以直接接回。这把最容易出错的“尾部不足 k 不反转”规则放在修改之前处理。\n\n每个完整组出栈顺序恰好反向，组与组之间次序不变。不完整组没有任何指针被修改，所以满足尾部保持条件。",
          "en": "Collect up to k references before changing any links. A full group is reconnected in pop order. If fewer than k are available, the suffix is untouched and can be attached as-is. This checks the crucial incomplete-group rule before any mutation occurs. Each full group appears in reverse pop order while group order stays fixed. No links in an incomplete group are changed, preserving the required suffix."
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
        "time": "O(n)",
        "space": "O(k)",
        "complexity": {
          "zh": "每节点入栈、出栈各至多一次，O(n)；栈最多存 k 个引用。",
          "en": "Every node is pushed and popped at most once, for O(n) time. The stack holds at most k references."
        },
        "python": "class Solution:\n    def reverseKGroup(self, head, k):\n        dummy = tail = ListNode(0)\n        cur = head\n        while cur:\n            stack, p = [], cur\n            for _ in range(k):\n                if not p: break\n                stack.append(p); p = p.next\n            if len(stack) < k:\n                tail.next = cur; break\n            while stack:\n                tail.next = stack.pop(); tail = tail.next\n            tail.next = p; cur = p\n        return dummy.next\n",
        "java": "import java.util.*;\nclass Solution {\n    public ListNode reverseKGroup(ListNode head,int k) {\n        ListNode dummy=new ListNode(0),tail=dummy,cur=head;\n        while(cur!=null) {\n            Deque<ListNode> stack=new ArrayDeque<>(); ListNode p=cur;\n            for(int i=0;i<k && p!=null;i++) { stack.push(p); p=p.next; }\n            if(stack.size()<k) { tail.next=cur; break; }\n            while(!stack.isEmpty()) { tail.next=stack.pop(); tail=tail.next; }\n            tail.next=p; cur=p;\n        }\n        return dummy.next;\n    }\n}\n",
        "algorithmNotes": {
          "zh": "先收集最多 k 个节点，只有数量达到 k 才逆序出栈连接。若最后一组不足 k，直接保留其原始链接；完整组连接后还需接回剩余链表，避免把后续节点断开。",
          "en": "Collect up to k nodes and reverse their connections by popping only when a full group is available. Leave a short final group unchanged, and reconnect each reversed full group to the remaining suffix."
        }
      },
      {
        "key": "group-reverse",
        "name": {
          "zh": "定位边界后局部反转",
          "en": "Locate boundaries, then reverse in place"
        },
        "intuition": {
          "zh": "普通整链反转的终止条件是空，这里要改成下一组起点。先找到第 k 个节点 kth，保存 after=kth.next；以 after 为初始 prev，可以让旧组头在反转时直接接好后续链。组外前驱最后连到 kth，旧组头则成为下一轮前驱。\n\n边界检查确保只反转完整组。局部反转不变式保证已处理部分逆序并最终连接 after；两端重连后，完整组与后缀都保留且无丢节点。",
          "en": "Whole-list reversal stops at null; grouped reversal instead stops at the next group’s start. Find kth and save after=kth.next. Starting prev at after immediately gives the old group head its correct final successor. Finally connect the external predecessor to kth and use the old head as the next predecessor. The boundary check restricts reversal to complete groups. The reversal invariant preserves a reversed processed segment eventually connected to after. Reattaching both boundaries preserves all nodes and the untouched suffix."
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
        "time": "O(n)",
        "space": "O(1)",
        "complexity": {
          "zh": "定位和反转各访问每个完整组 O(k) 次，总 O(n)；所有操作迭代，只有常数引用。",
          "en": "Locating and reversing each group both take O(k), totaling O(n). All work is iterative with constant reference storage."
        },
        "python": "class Solution:\n    def reverseKGroup(self, head, k):\n        dummy = ListNode(0); dummy.next = head\n        before = dummy\n        while True:\n            kth = before\n            for _ in range(k):\n                kth = kth.next\n                if not kth: return dummy.next\n            after, first = kth.next, before.next\n            prev, cur = after, first\n            while cur is not after:\n                nxt = cur.next; cur.next = prev\n                prev, cur = cur, nxt\n            before.next = kth; before = first\n",
        "java": "class Solution {\n    public ListNode reverseKGroup(ListNode head,int k) {\n        ListNode dummy=new ListNode(0); dummy.next=head; ListNode before=dummy;\n        while(true) {\n            ListNode kth=before;\n            for(int i=0;i<k;i++) { kth=kth.next; if(kth==null) return dummy.next; }\n            ListNode after=kth.next,first=before.next,prev=after,cur=first;\n            while(cur!=after) {\n                ListNode next=cur.next; cur.next=prev; prev=cur; cur=next;\n            }\n            before.next=kth; before=first;\n        }\n    }\n}\n",
        "algorithmNotes": {
          "zh": "每次先从组前节点向后探测第 k 个节点，未找到就结束。记住下一组头部，以它为反转时的初始后继；完成后更新组前链接，并把原组头作为下一轮的组前节点。",
          "en": "Probe for the kth node before changing any links and stop if it is absent. Save the next group's head as the reversal's initial successor, then reconnect the group and use its old head as the next predecessor."
        }
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
    },
    "examples": [
      {
        "input": "head = [1,2,3,4,5], k = 2",
        "output": "[2,1,4,3,5]"
      },
      {
        "input": "head = [1,2,3,4,5], k = 3",
        "output": "[3,2,1,4,5]"
      },
      {
        "input": "head = [1], k = 1",
        "output": "[1]"
      }
    ]
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
    "methods": [
      {
        "key": "mapping",
        "name": {
          "zh": "旧对象到新对象映射",
          "en": "Map original objects to copies"
        },
        "intuition": {
          "zh": "难点不是复制值，而是拿到旧 random 目标时找到它的新副本。第一遍只创建节点，让所有目标副本都存在；第二遍再连边，就不需要担心 random 指向后方尚未处理的节点。映射键必须是旧对象身份，不能是 val。\n\n映射建立原节点与新节点的一一对应，第二遍对每条边应用相同映射，因此保存完整拓扑；映射值全是新建对象，所以不存在新→旧指针。",
          "en": "The challenge is translating an old random target into its new counterpart. Create all nodes before connecting any edges, so forward random targets already have copies. A second pass translates next and random through the mapping. Keys must be original object identities, not values. The map is a bijection between original and fresh nodes. Translating every edge through it preserves topology, and all targets are new objects, preventing any new-to-old pointer."
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
        "time": "Expected O(n)",
        "space": "O(n) auxiliary; O(n) output",
        "complexity": {
          "zh": "两遍扫描与期望常数映射查询 O(n)；映射 O(n)，新链节点额外作为输出 O(n)。",
          "en": "Two scans and expected constant-time map lookups take O(n). The map uses O(n) auxiliary space, separate from O(n) output nodes."
        },
        "python": "class Solution:\n    def copyRandomList(self, head):\n        copies = {None: None}\n        p = head\n        while p:\n            copies[p] = Node(p.val); p = p.next\n        p = head\n        while p:\n            copies[p].next = copies[p.next]\n            copies[p].random = copies[p.random]\n            p = p.next\n        return copies[head]\n",
        "java": "import java.util.*;\nclass Solution {\n    public Node copyRandomList(Node head) {\n        Map<Node,Node> copies=new IdentityHashMap<>();\n        for(Node p=head;p!=null;p=p.next) copies.put(p,new Node(p.val));\n        for(Node p=head;p!=null;p=p.next) {\n            copies.get(p).next=copies.get(p.next);\n            copies.get(p).random=copies.get(p.random);\n        }\n        return copies.get(head);\n    }\n}\n",
        "algorithmNotes": {
          "zh": "第一遍只为每个旧节点创建对应的新节点，把映射完整建好。第二遍通过映射设置 next 和 random，空引用映射为空；不能把新节点的 random 直接指回旧链表。",
          "en": "First create one new node per original and complete the identity map. Then assign next and random through that map, preserving null links; no copied random pointer may point back into the original list."
        }
      },
      {
        "key": "interleave",
        "name": {
          "zh": "交织副本再拆分",
          "en": "Interleave copies, then detach"
        },
        "intuition": {
          "zh": "把每个副本插在旧节点后面，旧节点.next 就临时充当映射。若旧节点 random 指向 r，那么它的副本 random 应指向 r.next。必须先为全链插完副本，再设置 random；最后拆分两链并恢复所有原 next。此方案会暂时改变输入，不适合并发读取同一链的场景。\n\n交织后每个旧节点的后继唯一对应其副本，因而 random 翻译准确。拆分只撤销临时 next 插入，不改已正确设置的新 random，最终得到两条独立链。",
          "en": "Insert each copy immediately after its original, temporarily using original.next as the mapping. If an original random pointer targets r, the copied random targets r.next. Finish interleaving the entire list before assigning random pointers. Finally detach copies and restore all original links. This temporarily mutates the input, so concurrent readers would require coordination. After interleaving, each original’s successor uniquely identifies its copy, so random translation is exact. Detachment reverses only the temporary next insertions and leaves copied random edges intact, yielding independent lists."
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
        "time": "O(n)",
        "space": "O(1) auxiliary; O(n) output",
        "complexity": {
          "zh": "三次线性遍历 O(n)；除 n 个必需输出节点外，仅常数指针，无映射表。",
          "en": "Three linear passes take O(n). Beyond the n required output nodes, only constant references are stored."
        },
        "python": "class Solution:\n    def copyRandomList(self, head):\n        p = head\n        while p:\n            copy = Node(p.val); copy.next = p.next\n            p.next = copy; p = copy.next\n        p = head\n        while p:\n            p.next.random = p.random.next if p.random else None\n            p = p.next.next\n        new_head = head.next if head else None\n        p = head\n        while p:\n            copy = p.next; nxt = copy.next\n            p.next = nxt\n            copy.next = nxt.next if nxt else None\n            p = nxt\n        return new_head\n",
        "java": "class Solution {\n    public Node copyRandomList(Node head) {\n        Node p=head;\n        while(p!=null) {\n            Node copy=new Node(p.val); copy.next=p.next; p.next=copy; p=copy.next;\n        }\n        for(p=head;p!=null;p=p.next.next)\n            p.next.random=p.random==null?null:p.random.next;\n        Node ans=head==null?null:head.next; p=head;\n        while(p!=null) {\n            Node copy=p.next,next=copy.next; p.next=next;\n            copy.next=next==null?null:next.next; p=next;\n        }\n        return ans;\n    }\n}\n",
        "algorithmNotes": {
          "zh": "把新节点紧接在旧节点后面后，旧节点 random 的后继就是新 random 的目标。先设置全部 random，再拆成两条链表；拆分时既恢复旧 next，也连接新 next，不能只提取值。",
          "en": "Interleave each copy after its original, making original.random.next the copied random target. Assign all random links before splitting the lists, restoring original next links while connecting copied next links."
        }
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
    },
    "examples": [
      {
        "input": "head = [[7,null],[3,0],[5,1]]",
        "output": "[[7,null],[3,0],[5,1]]",
        "note": {
          "zh": "每项为 [节点值, random 指向的下标]，null 表示空引用。输出具有相同结构，但所有节点均为新建。",
          "en": "Each entry is [value, random index], with null for no reference. The output has the same structure but consists entirely of new nodes."
        }
      },
      {
        "input": "head = []",
        "output": "[]",
        "note": {
          "zh": "每项为 [节点值, random 指向的下标]，null 表示空引用。输出具有相同结构，但所有节点均为新建。",
          "en": "Each entry is [value, random index], with null for no reference. The output has the same structure but consists entirely of new nodes."
        }
      },
      {
        "input": "head = [[1,0]]",
        "output": "[[1,0]]",
        "note": {
          "zh": "每项为 [节点值, random 指向的下标]，null 表示空引用。输出具有相同结构，但所有节点均为新建。",
          "en": "Each entry is [value, random index], with null for no reference. The output has the same structure but consists entirely of new nodes."
        }
      }
    ]
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
    "methods": [
      {
        "key": "top-down",
        "name": {
          "zh": "自顶向下归并排序",
          "en": "Top-down merge sort"
        },
        "intuition": {
          "zh": "链表不能廉价随机访问，却能很方便地拆成两段并合并有序链，所以归并排序适合它。快慢指针把链近乎对半分开；必须断开中点 next，否则递归规模没有减少。两个子问题排好后，持续选较小头接回，合并本身使用迭代以避免线性递归栈。\n\n归纳基础是单节点有序；递归保证两半有序，而每次选择剩余较小头的归并保持整体有序且覆盖全部节点。",
          "en": "Linked lists lack cheap random access but split and merge naturally. Fast/slow pointers divide the list nearly in half; cutting the midpoint’s next link is essential to shrink the recursive problem. Sort both halves, then repeatedly select the smaller head. Use iterative merging so the merge phase does not create a linear-depth call stack. Single-node lists establish the base case. Recursive sorting orders each half, and selecting the smaller remaining head merges them into a complete sorted list."
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
        "time": "O(n log(n+1))",
        "space": "O(log(n+1))",
        "complexity": {
          "zh": "每层找中点与归并共 O(n)，平衡拆分约 log n 层。递归栈 O(log n)，归并迭代；不满足常数空间进阶。",
          "en": "Splitting and merging cost O(n) per level over O(log n) balanced levels. The recursion stack uses O(log n); iterative merging adds constant space. This does not meet the constant-space follow-up."
        },
        "python": "class Solution:\n    def sortList(self, head):\n        if not head or not head.next: return head\n        slow, fast = head, head.next\n        while fast and fast.next:\n            slow = slow.next; fast = fast.next.next\n        right = slow.next; slow.next = None\n        a, b = self.sortList(head), self.sortList(right)\n        dummy = tail = ListNode(0)\n        while a and b:\n            if a.val <= b.val: tail.next = a; a = a.next\n            else: tail.next = b; b = b.next\n            tail = tail.next\n        tail.next = a if a else b\n        return dummy.next\n",
        "java": "class Solution {\n    public ListNode sortList(ListNode head) {\n        if(head==null || head.next==null) return head;\n        ListNode slow=head,fast=head.next;\n        while(fast!=null && fast.next!=null) { slow=slow.next; fast=fast.next.next; }\n        ListNode right=slow.next; slow.next=null;\n        ListNode a=sortList(head),b=sortList(right),dummy=new ListNode(0),tail=dummy;\n        while(a!=null && b!=null) {\n            if(a.val<=b.val) { tail.next=a; a=a.next; }\n            else { tail.next=b; b=b.next; }\n            tail=tail.next;\n        }\n        tail.next=a!=null?a:b; return dummy.next;\n    }\n}\n",
        "algorithmNotes": {
          "zh": "快慢指针找到中点后必须切断前半段尾部的 next，否则递归问题没有缩小。分别排序两半，再像合并两个有序链表一样复用节点；空链表或单节点直接返回。",
          "en": "After finding the midpoint, disconnect the first half so recursion operates on smaller lists. Sort both halves and merge them by reusing nodes; empty and single-node lists are the base cases."
        }
      },
      {
        "key": "bottom-up",
        "name": {
          "zh": "自底向上归并排序",
          "en": "Bottom-up merge sort"
        },
        "intuition": {
          "zh": "递归中的“先小段再大段”可以改成外层段长循环：最初每个单节点已排序，归并相邻长度 1 的段，再归并长度 2、4、8 的段。split 负责把长度至多 size 的链切下来并返回剩余头；尾组不足长度也合法。只保留当前两段与拼接尾，就能消除递归栈。\n\n每轮开始时每个长度 size 的段有序；成对归并得到长度至多 2size 的有序段。段长翻倍后不变式继续成立，最终整链为一个有序段。",
          "en": "Replace recursive levels with a run-size loop. Single nodes are already sorted; merge adjacent runs of length 1, then 2, 4, and so on. split detaches a run of at most size nodes and returns the remainder, so short final runs are valid. Tracking only two current runs and the assembled tail eliminates the recursion stack. At each pass, runs of size are sorted. Merging adjacent pairs creates sorted runs of at most 2size, preserving the invariant for the doubled size. Eventually one run spans the entire list."
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
        "time": "O(n log(n+1))",
        "space": "O(1)",
        "complexity": {
          "zh": "每轮切分和归并各遍历 O(n) 节点，轮数 O(log n)。split 与 merge 均迭代；仅常数指针，不创建数组或递归栈。",
          "en": "Splitting and merging visit O(n) nodes per pass over O(log n) passes. Both are iterative, using constant pointers without arrays or a recursion stack."
        },
        "python": "class Solution:\n    def sortList(self, head):\n        def split(node, size):\n            if not node: return None\n            for _ in range(size-1):\n                if not node.next: break\n                node = node.next\n            rest = node.next; node.next = None\n            return rest\n        n, p = 0, head\n        while p: n += 1; p = p.next\n        dummy = ListNode(0); dummy.next = head\n        size = 1\n        while size < n:\n            cur, tail = dummy.next, dummy\n            while cur:\n                left = cur; right = split(left, size); cur = split(right, size)\n                while left or right:\n                    if not right or (left and left.val <= right.val):\n                        tail.next = left; left = left.next\n                    else:\n                        tail.next = right; right = right.next\n                    tail = tail.next\n                tail.next = cur\n            size *= 2\n        return dummy.next\n",
        "java": "class Solution {\n    private ListNode split(ListNode node,int size) {\n        if(node==null) return null;\n        for(int i=1;i<size && node.next!=null;i++) node=node.next;\n        ListNode rest=node.next; node.next=null; return rest;\n    }\n    public ListNode sortList(ListNode head) {\n        int n=0; for(ListNode p=head;p!=null;p=p.next) n++;\n        ListNode dummy=new ListNode(0); dummy.next=head;\n        for(int size=1;size<n;size*=2) {\n            ListNode cur=dummy.next,tail=dummy;\n            while(cur!=null) {\n                ListNode left=cur,right=split(left,size); cur=split(right,size);\n                while(left!=null || right!=null) {\n                    if(right==null || (left!=null && left.val<=right.val)) {\n                        tail.next=left; left=left.next;\n                    } else { tail.next=right; right=right.next; }\n                    tail=tail.next;\n                }\n                tail.next=cur;\n            }\n        }\n        return dummy.next;\n    }\n}\n",
        "algorithmNotes": {
          "zh": "从长度 1 的有序段开始，按 1、2、4……扩大合并宽度。每次切下相邻两段，分别断开与后续的链接，合并后接到输出尾部；最后不足规定长度的段也必须保留。",
          "en": "Merge adjacent sorted runs of widths 1, 2, 4 and so on. Cut each pair away from the following suffix, merge it, and append it to the output tail; preserve any final short run as well."
        }
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
    },
    "examples": [
      {
        "input": "head = [4,1,3,2]",
        "output": "[1,2,3,4]"
      },
      {
        "input": "head = []",
        "output": "[]"
      },
      {
        "input": "head = [-1,2,-1]",
        "output": "[-1,-1,2]"
      }
    ]
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
    "methods": [
      {
        "key": "heap",
        "name": {
          "zh": "最小堆维护候选头",
          "en": "Min-heap of candidate heads"
        },
        "intuition": {
          "zh": "每条链的头就是该链剩余节点中的最小值，因此全局最小节点只可能出现在这些头中。弹出一个头后，仅它所属链的候选发生变化。Python 元组加入递增序号，避免值相同时比较节点对象。\n\n每次追加的是全部剩余节点的最小值；追加前答案有序，追加后仍有序。每个节点只有其前驱弹出后才入堆，因此不重不漏。",
          "en": "The smallest remaining node must be a current list head. A heap compares only these candidates; removing one changes only that list’s candidate. A unique counter prevents Python from comparing node objects when values tie. Each appended node is the minimum among all remaining nodes, preserving sorted order. A node enters only when its predecessor leaves, so every node appears exactly once."
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
        "time": "O(k + N log(k+1))",
        "space": "O(k)",
        "complexity": {
          "zh": "扫描 k 个头需要 O(k)；每节点一次入堆和出堆，堆至多 k 项。复用输入节点，输出链不另分配 N 个节点。",
          "en": "Scanning heads costs O(k); each node is pushed and popped once from a heap of at most k items. Input nodes are reused."
        },
        "python": "from heapq import heapify, heappop, heappush\nfrom itertools import count\nclass Solution:\n    def mergeKLists(self, lists):\n        serial = count()\n        heap = [(n.val, next(serial), n) for n in lists if n]\n        heapify(heap)\n        dummy = tail = ListNode(0)\n        while heap:\n            _, _, node = heappop(heap)\n            nxt = node.next\n            tail.next = node\n            tail = node\n            if nxt:\n                heappush(heap, (nxt.val, next(serial), nxt))\n        tail.next = None\n        return dummy.next\n",
        "java": "import java.util.*;\nclass Solution  {\n    public ListNode mergeKLists(ListNode[] lists)  {\n        PriorityQueue<ListNode> heap = new PriorityQueue<>((a,b)->Integer.compare(a.val,b.val));\n        for (ListNode n: lists) if (n != null) heap.offer(n);\n        ListNode dummy = new ListNode(0), tail = dummy;\n        while (!heap.isEmpty())  {\n            ListNode n = heap.poll(), next = n.next;\n            tail.next = n;\n            tail = n;\n            if (next != null) heap.offer(next);\n        }\n        tail.next = null;\n        return dummy.next;\n    }\n}\n",
        "algorithmNotes": {
          "zh": "堆中最多保留每条未耗尽链表的当前头节点。弹出最小节点后把它接到结果尾部，再把其后继放回堆；相同值需有稳定的辅助比较项，避免直接比较节点对象。",
          "en": "Keep at most one current node from each unfinished list in the heap. Pop the minimum, append it, and push its successor; use a tie-breaker for equal values so node objects need not be ordered."
        }
      },
      {
        "key": "pairwise",
        "name": {
          "zh": "迭代两两归并",
          "en": "Iterative pairwise merging"
        },
        "intuition": {
          "zh": "依次把新链加入大结果会反复扫描早期节点。改为第一轮合并相邻两链，第二轮合并四链的结果，直到只剩一组，让每个节点每一轮最多被扫描一次。\n\n两条有序链归并产生有序且包含全部节点的链。归纳每轮，各位置保存对应整组链的正确归并，最终组覆盖全部输入。",
          "en": "Sequential merging repeatedly scans the growing result. Pairwise rounds merge groups of size two, then four, and so on, limiting each node to one scan per round. Merging two sorted lists preserves order and all nodes. Inductively, each round correctly merges its groups until one group covers every input."
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
        "time": "O(k + N log(k+1))",
        "space": "O(1)",
        "complexity": {
          "zh": "有 O(log(k+1)) 轮，每轮节点扫描不超过 N，列表槽位操作合计 O(k)。原地修改 lists 数组且复用链表节点，无递归栈。",
          "en": "There are O(log(k+1)) rounds with at most N node visits each, plus O(k) slot work overall. The input array is modified and nodes reused; no recursion is used."
        },
        "python": "class Solution:\n    def mergeKLists(self, lists):\n        def merge(a, b):\n            dummy = tail = ListNode(0)\n            while a and b:\n                if a.val <= b.val:\n                    tail.next, a = a, a.next\n                else:\n                    tail.next, b = b, b.next\n                tail = tail.next\n            tail.next = a or b\n            return dummy.next\n        step = 1\n        while step < len(lists):\n            for i in range(0, len(lists)-step, step*2):\n                lists[i] = merge(lists[i], lists[i+step])\n            step *= 2\n        return lists[0] if lists else None\n",
        "java": "import java.util.*;\nclass Solution  {\n    private ListNode merge(ListNode a, ListNode b)  {\n        ListNode dummy=new ListNode(0), t=dummy;\n        while(a!=null && b!=null)  {\n            if(a.val<=b.val) {\n                t.next=a;\n                a=a.next;\n            }\n            else  {\n                t.next=b;\n                b=b.next;\n            }\n            t=t.next;\n        }\n        t.next=a!=null?a:b;\n        return dummy.next;\n    }\n    public ListNode mergeKLists(ListNode[] lists)  {\n        for(int step=1;step<lists.length;step*=2)             for(int i=0;i+step<lists.length;i+=step*2) lists[i]=merge(lists[i],lists[i+step]);\n        return lists.length==0?null:lists[0];\n    }\n}\n",
        "algorithmNotes": {
          "zh": "每轮把链表两两合并，下一轮只处理合并结果，使链表数量约减半。若本轮数量为奇数，最后一条原样带入下一轮；重复直到只剩一条，空输入直接返回空。",
          "en": "Merge lists in pairs each round so the number of lists roughly halves. Carry an unpaired final list into the next round unchanged; repeat until one remains, returning null for an empty collection."
        }
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
    },
    "examples": [
      {
        "input": "lists = [[1,4],[2,5],[3,6]]",
        "output": "[1,2,3,4,5,6]"
      },
      {
        "input": "lists = []",
        "output": "[]"
      },
      {
        "input": "lists = [[],[2]]",
        "output": "[2]"
      }
    ]
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
    "methods": [
      {
        "key": "ordered-map",
        "name": {
          "zh": "有序哈希容器",
          "en": "Ordered hash container"
        },
        "intuition": {
          "zh": "需要同时支持按键定位和使用顺序。Python OrderedDict 提供移动到末尾与删除首项；Java LinkedHashMap 开启 accessOrder 后由库维护访问顺序。普通插入顺序不能自动表达最近使用。\n\n每次成功使用恰好把该键置于末尾，其他键相对顺序不变，所以首项始终最久未使用。",
          "en": "We need key lookup and recency order simultaneously. Python OrderedDict supports moving a key to the end and removing the first item; Java LinkedHashMap with accessOrder maintains access order. Insertion order alone is insufficient. Every successful access moves exactly that key to the end while preserving other entries’ relative order, so the first item is always least recently used."
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
        "time": "O(1) average / operation",
        "space": "O(C)",
        "complexity": {
          "zh": "哈希查找和有序链移动平均常数时间；容器最多 C+1 个瞬时条目，C 是容量。",
          "en": "Hash lookup and order updates take average constant time. At most C+1 entries exist transiently, where C is capacity."
        },
        "python": "from collections import OrderedDict\nclass LRUCache:\n    def __init__(self, capacity):\n        self.capacity = capacity\n        self.data = OrderedDict()\n    def get(self, key):\n        if key not in self.data:\n            return -1\n        self.data.move_to_end(key)\n        return self.data[key]\n    def put(self, key, value):\n        self.data[key] = value\n        self.data.move_to_end(key)\n        if len(self.data) > self.capacity:\n            self.data.popitem(last=False)\n",
        "java": "import java.util.*;\nclass LRUCache  {\n    private final int capacity;\n    private final LinkedHashMap<Integer,Integer> data;\n    public LRUCache(int capacity)  {\n        this.capacity=capacity;\n        data=new LinkedHashMap<>(16,0.75f,true);\n    }\n    public int get(int key) {\n        return data.getOrDefault(key,-1);\n    }\n    public void put(int key,int value) {\n        data.put(key,value);\n        if(data.size()>capacity) {\n            Integer oldest=data.keySet().iterator().next();\n            data.remove(oldest);\n        }\n    }\n}\n",
        "algorithmNotes": {
          "zh": "有序映射同时记录键值和访问顺序，get 命中及 put 更新都要把该键移到最近使用的一端。新插入导致容量超限时删除最久未使用的一端；get 未命中返回 −1，不改变已有顺序。",
          "en": "An ordered map stores values and recency together. Both a successful get and an updating put move the key to the most-recent end; after a new insertion exceeds capacity, evict from the least-recent end, while a miss returns −1 without changing order."
        }
      },
      {
        "key": "linked-map",
        "name": {
          "zh": "哈希表 + 双向链表",
          "en": "Hash table + doubly linked list"
        },
        "intuition": {
          "zh": "自己实现有序容器：map 保存 key 到节点的引用，避免沿链寻找；双向指针让已知节点在 O(1) 时间摘除。头尾哨兵不存数据，消除移动第一项、最后一项时的特殊判断。\n\n映射和链表始终一一对应；移动不改变条目集合，淘汰同步删除。因此既能正确返回值，也保持准确的 LRU 顺序。",
          "en": "Implement the ordering explicitly: a map locates nodes, and two links allow constant-time removal of a known node. Sentinel head and tail nodes eliminate special cases for endpoints. The map and list remain in one-to-one correspondence. Moves preserve entries and synchronized eviction removes exactly the oldest, maintaining correct values and recency."
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
        "time": "O(1) average / operation",
        "space": "O(C)",
        "complexity": {
          "zh": "一次操作只有常数次哈希访问和指针修改。最多保存 C 个数据节点及 C 个映射；哨兵是常数开销。",
          "en": "Each operation performs a constant number of hash accesses and pointer updates. C data nodes and C map entries dominate sentinel overhead."
        },
        "python": "class Node:\n    def __init__(self, key=0, value=0):\n        self.key, self.value = key, value\n        self.prev = self.next = None\nclass LRUCache:\n    def __init__(self, capacity):\n        self.capacity, self.data = capacity, {}\n        self.head, self.tail = Node(), Node()\n        self.head.next, self.tail.prev = self.tail, self.head\n    def remove(self, n):\n        n.prev.next, n.next.prev = n.next, n.prev\n    def append(self, n):\n        n.prev, n.next = self.tail.prev, self.tail\n        self.tail.prev.next = n\n        self.tail.prev = n\n    def get(self, key):\n        n = self.data.get(key)\n        if n is None: return -1\n        self.remove(n); self.append(n)\n        return n.value\n    def put(self, key, value):\n        if key in self.data:\n            n = self.data[key]; n.value = value; self.remove(n)\n        else:\n            n = Node(key, value); self.data[key] = n\n        self.append(n)\n        if len(self.data) > self.capacity:\n            old = self.head.next\n            self.remove(old); del self.data[old.key]\n",
        "java": "import java.util.*;\nclass LRUCache  {\n    static class Node  {\n        int key,value;\n        Node prev,next;\n        Node(int k,int v) {\n            key=k;\n            value=v;\n        }\n    }\n    private final int capacity;\n    private final Map<Integer,Node> data=new HashMap<>();\n    private final Node head=new Node(0,0), tail=new Node(0,0);\n    public LRUCache(int c) {\n        capacity=c;\n        head.next=tail;\n        tail.prev=head;\n    }\n    private void remove(Node n) {\n        n.prev.next=n.next;\n        n.next.prev=n.prev;\n    }\n    private void append(Node n) {\n        n.prev=tail.prev;\n        n.next=tail;\n        tail.prev.next=n;\n        tail.prev=n;\n    }\n    public int get(int key) {\n        Node n=data.get(key);\n        if(n==null)return -1;\n        remove(n);\n        append(n);\n        return n.value;\n    }\n    public void put(int key,int value) {\n        Node n=data.get(key);\n        if(n==null) {\n            n=new Node(key,value);\n            data.put(key,n);\n        }\n        else {\n            n.value=value;\n            remove(n);\n        }\n        append(n);\n        if(data.size()>capacity) {\n            Node old=head.next;\n            remove(old);\n            data.remove(old.key);\n        }\n    }\n}\n",
        "algorithmNotes": {
          "zh": "哈希表负责按键定位节点，双向链表负责常数时间摘除和重插。访问或更新时先摘下再接到最近端；淘汰时同时删除链表节点和哈希记录，两个结构必须始终对应。",
          "en": "Use the hash map to locate nodes and the doubly linked list to detach and reinsert them in constant time. Move accessed or updated nodes to the recent end; eviction must remove both the list node and its map entry."
        }
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
    },
    "examples": [
      {
        "input": "operations = [\"LRUCache\",\"put\",\"put\",\"get\",\"put\",\"get\",\"get\"], arguments = [[2],[1,10],[2,20],[1],[3,30],[2],[3]]",
        "output": "[null,null,null,10,null,-1,30]",
        "note": {
          "zh": "输出逐项对应操作；构造和无返回值的操作用 null 表示。",
          "en": "Outputs correspond to operations; constructors and void operations are shown as null."
        }
      },
      {
        "input": "operations = [\"LRUCache\",\"put\",\"put\",\"get\"], arguments = [[1],[1,10],[1,11],[1]]",
        "output": "[null,null,null,11]",
        "note": {
          "zh": "输出逐项对应操作；构造和无返回值的操作用 null 表示。",
          "en": "Outputs correspond to operations; constructors and void operations are shown as null."
        }
      },
      {
        "input": "operations = [\"LRUCache\",\"get\",\"put\",\"get\"], arguments = [[1],[9],[2,20],[2]]",
        "output": "[null,-1,null,20]",
        "note": {
          "zh": "输出逐项对应操作；构造和无返回值的操作用 null 表示。",
          "en": "Outputs correspond to operations; constructors and void operations are shown as null."
        }
      }
    ]
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
    "methods": [
      {
        "key": "recursive",
        "name": {
          "zh": "递归中序",
          "en": "Recursive inorder"
        },
        "intuition": {
          "zh": "把整棵树的访问要求原样应用到子树即可。访问根的代码必须放在左右递归之间；放在前面会变成前序。答案数组在所有调用间共享，避免反复拼接数组。\n\n假设左右递归各自输出正确中序，把左序列、根、右序列相接恰好符合定义；空树是归纳起点。",
          "en": "Apply the same traversal rule to each subtree. Append the root between the recursive calls, not before them. Share one output array to avoid repeated concatenation. Assuming both children produce correct inorder sequences, placing the root between them satisfies the definition. Null subtrees form the base case."
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
        "time": "O(n)",
        "space": "O(h) auxiliary + O(n) output",
        "complexity": {
          "zh": "每节点一次追加、两次子调用；调用栈最多 h 层。退化链 h=n，平衡树 h=O(log n)。",
          "en": "Each node is appended once. The stack has h frames: n for a chain and O(log n) for a balanced tree."
        },
        "python": "class Solution:\n    def inorderTraversal(self, root):\n        result = []\n        def walk(node):\n            if not node: return\n            walk(node.left)\n            result.append(node.val)\n            walk(node.right)\n        walk(root)\n        return result\n",
        "java": "import java.util.*;\nclass Solution  {\n    public List<Integer> inorderTraversal(TreeNode root) {\n        List<Integer> a=new ArrayList<>();\n        walk(root,a);\n        return a;\n    }\n    private void walk(TreeNode n,List<Integer>a) {\n        if(n==null)return;\n        walk(n.left,a);\n        a.add(n.val);\n        walk(n.right,a);\n    }\n}\n",
        "algorithmNotes": {
          "zh": "递归调用的职责是把某棵子树的中序序列追加到答案。顺序固定为左子树、当前值、右子树；空节点直接返回，不把 null 放入结果。",
          "en": "Each call appends a subtree's inorder traversal to the result. Recurse left, append the current value, then recurse right; an empty node returns without adding null to the output."
        }
      },
      {
        "key": "stack",
        "name": {
          "zh": "显式栈中序",
          "en": "Explicit-stack inorder"
        },
        "intuition": {
          "zh": "向左下降时还不能输出祖先，因为祖先的左侧尚未完成。栈保存这些待访问祖先；下降到空才弹出最近祖先。弹出时其左侧已经处理完，随后转向它的右子树。\n\n每次弹出前左子树已经完成，而右子树尚未访问；因此每个节点的输出时机严格是左、根、右。",
          "en": "Ancestors cannot be emitted while descending left because their left subtrees are unfinished. Save them on a stack. When descent reaches null, pop the nearest pending ancestor and then explore its right subtree. At each pop, the left subtree is complete and the right subtree has not been visited. This enforces left-root-right order for every node."
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
        "time": "O(n)",
        "space": "O(h) auxiliary + O(n) output",
        "complexity": {
          "zh": "每节点入栈出栈各一次；栈只保存一条祖先路径。循环嵌套不意味着平方时间。",
          "en": "Every node is pushed and popped exactly once; nested loops still total linear work. The stack stores an ancestor path."
        },
        "python": "class Solution:\n    def inorderTraversal(self, root):\n        result, stack = [], []\n        cur = root\n        while cur or stack:\n            while cur:\n                stack.append(cur); cur = cur.left\n            cur = stack.pop()\n            result.append(cur.val)\n            cur = cur.right\n        return result\n",
        "java": "import java.util.*;\nclass Solution  {\n    public List<Integer> inorderTraversal(TreeNode root) {\n        List<Integer>a=new ArrayList<>();\n        Deque<TreeNode>s=new ArrayDeque<>();\n        TreeNode cur=root;\n        while(cur!=null||!s.isEmpty()) {\n            while(cur!=null) {\n                s.push(cur);\n                cur=cur.left;\n            }\n            cur=s.pop();\n            a.add(cur.val);\n            cur=cur.right;\n        }\n        return a;\n    }\n}\n",
        "algorithmNotes": {
          "zh": "当前指针沿左链不断压栈，表示暂存尚未输出的祖先。不能再向左时弹出栈顶并输出，然后转向该节点的右子树；当前为空但栈不空时仍要继续。",
          "en": "Push nodes while following left children, saving ancestors not yet emitted. When left descent ends, pop and output a node, then enter its right subtree; continue while either the current pointer or stack is nonempty."
        }
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
    },
    "examples": [
      {
        "input": "root = [4,2,6,1,3]",
        "output": "[1,2,3,4,6]",
        "note": {
          "zh": "树使用层序数组表示，null 表示该位置没有节点。",
          "en": "Trees use level-order arrays; null denotes an absent node."
        }
      },
      {
        "input": "root = []",
        "output": "[]",
        "note": {
          "zh": "树使用层序数组表示，null 表示该位置没有节点。",
          "en": "Trees use level-order arrays; null denotes an absent node."
        }
      },
      {
        "input": "root = [8]",
        "output": "[8]",
        "note": {
          "zh": "树使用层序数组表示，null 表示该位置没有节点。",
          "en": "Trees use level-order arrays; null denotes an absent node."
        }
      }
    ]
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
    "methods": [
      {
        "key": "postorder",
        "name": {
          "zh": "后序计算高度",
          "en": "Postorder height"
        },
        "intuition": {
          "zh": "如果已经知道左右子树的深度，经过当前节点的最长向下路径只需选择较深一侧，再加当前节点的 1。空树设为 0 后，叶子自然得到 1。\n\n任何根到叶路径只能进入一侧子树；选择最大深度即覆盖最优路径，且递归结果由同一定义保证。",
          "en": "Once the child depths are known, the longest downward path chooses the deeper child and adds the current node. Defining null depth as 0 automatically gives a leaf depth of 1. Every root-to-leaf path enters exactly one child. Taking the larger valid child depth therefore yields the optimal depth."
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
        "time": "O(n)",
        "space": "O(h)",
        "complexity": {
          "zh": "每节点常数工作，栈深 h。Python 设置足够递归深度；极深树更适合下一种迭代方法。 实际递归受 Python 递归深度和 Java 线程栈限制；提高 Python 深度不会消除内存开销，极深输入优先用显式栈。",
          "en": "Each node does constant work and the stack reaches h frames. Python raises its recursion limit; iterative traversal is preferable for extremely deep trees. Actual recursion is limited by Python recursion depth and the Java thread stack; raising Python’s limit does not remove memory costs. Prefer an explicit stack for extreme depth."
        },
        "python": "import sys\nclass Solution:\n    def maxDepth(self, root):\n        sys.setrecursionlimit(max(sys.getrecursionlimit(), 30000))\n        def depth(n):\n            return 0 if n is None else 1 + max(depth(n.left), depth(n.right))\n        return depth(root)\n",
        "java": "import java.util.*;\nclass Solution  {\n    public int maxDepth(TreeNode root) {\n        if(root==null)return 0;\n        return 1+Math.max(maxDepth(root.left),maxDepth(root.right));\n    }\n}\n",
        "algorithmNotes": {
          "zh": "把空树的高度定义为 0，叶子的高度自然是 1。先分别求左右子树高度，再返回 1+max(left,right)；加的是当前节点这一层，不能把两边高度相加。",
          "en": "Define an empty subtree's height as zero so a leaf has height one. Compute both child heights and return 1+max(left,right), counting the current level rather than summing separate branches."
        }
      },
      {
        "key": "bfs",
        "name": {
          "zh": "逐层计数",
          "en": "Count BFS layers"
        },
        "intuition": {
          "zh": "深度也就是树一共有多少层。队列初始只放根，每轮记录当前长度，把这一层全部移走，再处理新加入的下一层。长度必须在循环前固定。\n\n每轮开始队列恰好代表下一层；处理后只留下它的孩子。因此轮数等于根到最深叶的节点数。",
          "en": "Depth equals the number of layers. Start the queue with the root, freeze its size at each round, and remove that entire layer before counting the next one. At the start of each round the queue contains one layer; processing it produces the next. The round count therefore equals the deepest root-to-leaf node count."
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
        "time": "O(n)",
        "space": "O(w)",
        "complexity": {
          "zh": "每节点进出队一次；队列可能同时含相邻两层的部分节点，但仍为 O(w)，w 是最大层宽。",
          "en": "Each node enters and leaves once. The queue may mix portions of adjacent layers but remains O(w), where w is maximum width."
        },
        "python": "from collections import deque\nclass Solution:\n    def maxDepth(self, root):\n        if not root: return 0\n        q, depth = deque([root]), 0\n        while q:\n            for _ in range(len(q)):\n                n = q.popleft()\n                if n.left: q.append(n.left)\n                if n.right: q.append(n.right)\n            depth += 1\n        return depth\n",
        "java": "import java.util.*;\nclass Solution  {\n    public int maxDepth(TreeNode root) {\n        if(root==null)return 0;\n        Deque<TreeNode>q=new ArrayDeque<>();\n        q.add(root);\n        int depth=0;\n        while(!q.isEmpty()) {\n            int size=q.size();\n            while(size-->0) {\n                TreeNode n=q.remove();\n                if(n.left!=null)q.add(n.left);\n                if(n.right!=null)q.add(n.right);\n            }\n            depth++;\n        }\n        return depth;\n    }\n}\n",
        "algorithmNotes": {
          "zh": "每轮开始先固定当前队列长度，这些节点属于同一层。只弹出这一批并加入其孩子，然后层数加一；若直接处理到队列空，会把新入队的下一层也算进本层。",
          "en": "Freeze the queue length at the start of each round to delimit one level. Process exactly that batch and enqueue its children, then increment depth; draining an expanding queue would mix multiple levels."
        }
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
    },
    "examples": [
      {
        "input": "root = [5,2,8,1]",
        "output": "3",
        "note": {
          "zh": "树使用层序数组表示，null 表示该位置没有节点。",
          "en": "Trees use level-order arrays; null denotes an absent node."
        }
      },
      {
        "input": "root = []",
        "output": "0",
        "note": {
          "zh": "树使用层序数组表示，null 表示该位置没有节点。",
          "en": "Trees use level-order arrays; null denotes an absent node."
        }
      },
      {
        "input": "root = [8]",
        "output": "1",
        "note": {
          "zh": "树使用层序数组表示，null 表示该位置没有节点。",
          "en": "Trees use level-order arrays; null denotes an absent node."
        }
      }
    ]
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
    "methods": [
      {
        "key": "recursive",
        "name": {
          "zh": "递归交换",
          "en": "Recursive swap"
        },
        "intuition": {
          "zh": "镜像不是只交换根的两个孩子，而是每个节点都交换。先递归得到左右子树的镜像，再把它们交叉放回根上，得到整树镜像。\n\n左右子树内部已镜像，再交换它们相对于根的位置，恰好反转所有节点的左右路径。",
          "en": "Swapping only the root’s children is insufficient. Recursively mirror both subtrees, then attach their results to the opposite sides of the root. Mirroring within each subtree and then exchanging their positions reverses every left/right path from the root."
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
        "time": "O(n)",
        "space": "O(h)",
        "complexity": {
          "zh": "每节点交换一次；栈高度为 h，不新建树节点。",
          "en": "Every node is swapped once. The call stack uses h frames; no new tree nodes are allocated."
        },
        "python": "class Solution:\n    def invertTree(self, root):\n        if root is None: return None\n        left = self.invertTree(root.left)\n        root.left = self.invertTree(root.right)\n        root.right = left\n        return root\n",
        "java": "import java.util.*;\nclass Solution  {\n    public TreeNode invertTree(TreeNode root) {\n        if(root==null)return null;\n        TreeNode left=invertTree(root.left);\n        root.left=invertTree(root.right);\n        root.right=left;\n        return root;\n    }\n}\n",
        "algorithmNotes": {
          "zh": "当前节点交换左右孩子后，继续分别处理交换后的两棵子树。每个节点只执行一次交换；空节点不需要操作，并返回根节点供父层重新连接。",
          "en": "Swap the two children at each node and recursively process both resulting subtrees. Swap once per node, do nothing for null, and return the root so callers can reconnect the result."
        }
      },
      {
        "key": "queue",
        "name": {
          "zh": "队列逐个交换",
          "en": "Queue-driven swaps"
        },
        "intuition": {
          "zh": "每个节点交换一次即可，不依赖后序结果。因此用队列保存还未处理的节点，交换当前孩子后把非空孩子入队，避免递归。\n\n遍历覆盖每个节点一次，并在每个节点反转左右边；全部局部交换合成整树镜像。",
          "en": "A node’s swap does not depend on a returned child value, so any complete traversal works. A queue tracks pending nodes and avoids recursion. The traversal reaches every node once and reverses its two outgoing sides, producing the full mirror."
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
        "time": "O(n)",
        "space": "O(w)",
        "complexity": {
          "zh": "每节点一次出队与交换；队列 O(w)。修改原树，无输出树额外分配。",
          "en": "One dequeue and swap per node gives linear time; the queue uses O(w). The original tree is modified."
        },
        "python": "from collections import deque\nclass Solution:\n    def invertTree(self, root):\n        q = deque([root]) if root else deque()\n        while q:\n            n = q.popleft()\n            n.left, n.right = n.right, n.left\n            if n.left: q.append(n.left)\n            if n.right: q.append(n.right)\n        return root\n",
        "java": "import java.util.*;\nclass Solution  {\n    public TreeNode invertTree(TreeNode root) {\n        Deque<TreeNode>q=new ArrayDeque<>();\n        if(root!=null)q.add(root);\n        while(!q.isEmpty()) {\n            TreeNode n=q.remove(),t=n.left;\n            n.left=n.right;\n            n.right=t;\n            if(n.left!=null)q.add(n.left);\n            if(n.right!=null)q.add(n.right);\n        }\n        return root;\n    }\n}\n",
        "algorithmNotes": {
          "zh": "队列保存尚待翻转的节点，出队时交换其左右引用。把交换后的非空孩子加入队列，直到所有节点处理完；修改的是连接方向，节点值和节点总数都不变。",
          "en": "The queue holds nodes whose child links still need swapping. Swap on removal and enqueue the resulting nonempty children; this changes link directions without changing values or the number of nodes."
        }
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
    },
    "examples": [
      {
        "input": "root = [5,2,8,1,3]",
        "output": "[5,8,2,null,null,3,1]",
        "note": {
          "zh": "树使用层序数组表示，null 表示该位置没有节点。",
          "en": "Trees use level-order arrays; null denotes an absent node."
        }
      },
      {
        "input": "root = []",
        "output": "[]",
        "note": {
          "zh": "树使用层序数组表示，null 表示该位置没有节点。",
          "en": "Trees use level-order arrays; null denotes an absent node."
        }
      },
      {
        "input": "root = [8]",
        "output": "[8]",
        "note": {
          "zh": "树使用层序数组表示，null 表示该位置没有节点。",
          "en": "Trees use level-order arrays; null denotes an absent node."
        }
      }
    ]
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
    "methods": [
      {
        "key": "recursive",
        "name": {
          "zh": "递归比较镜像节点",
          "en": "Recursive mirror pairs"
        },
        "intuition": {
          "zh": "不是比较左树与右树完全相同，而是交叉比较：左树的左孩子对应右树的右孩子。两个空节点匹配；只有一个为空立即失败；其余先比值再继续。\n\n镜像定义可分解为根值相同、外侧镜像、内侧镜像。这三个条件既必要又充分。",
          "en": "Compare opposite directions, not identical directions: the left tree’s left child matches the right tree’s right child. Two nulls match, one null fails, and nonnull nodes must have equal values. Mirror symmetry decomposes exactly into equal root values plus mirrored outer and inner child pairs. These conditions are necessary and sufficient."
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
        "time": "O(n)",
        "space": "O(h)",
        "complexity": {
          "zh": "每个镜像对检查一次，递归深度不超过树高。",
          "en": "Each mirror pair is checked once and recursion depth is bounded by tree height."
        },
        "python": "import sys\nclass Solution:\n    def isSymmetric(self, root):\n        sys.setrecursionlimit(max(sys.getrecursionlimit(), 5000))\n        def mirror(a,b):\n            if a is None or b is None: return a is b\n            return a.val == b.val and mirror(a.left,b.right) and mirror(a.right,b.left)\n        return root is None or mirror(root.left,root.right)\n",
        "java": "import java.util.*;\nclass Solution  {\n    public boolean isSymmetric(TreeNode root) {\n        return root==null||mirror(root.left,root.right);\n    }\n    private boolean mirror(TreeNode a,TreeNode b) {\n        if(a==null||b==null)return a==b;\n        return a.val==b.val&&mirror(a.left,b.right)&&mirror(a.right,b.left);\n    }\n}\n",
        "algorithmNotes": {
          "zh": "比较的不是两棵子树各自是否对称，而是它们是否互为镜像。两边都空则匹配，仅一边空或值不同则失败；继续比较左侧的左孩子与右侧的右孩子，以及另一对内侧孩子。",
          "en": "Test whether two subtrees mirror each other, not whether each is individually symmetric. Two nulls match, one null or unequal values fails; compare the outer children together and the inner children together."
        }
      },
      {
        "key": "queue",
        "name": {
          "zh": "队列保存镜像对",
          "en": "Queue of mirror pairs"
        },
        "intuition": {
          "zh": "队列元素是“一对需要互为镜像的节点”，不是单个节点。必须保留空位置，不能只比较每层非空值，否则会把形状不同的树误判为对称。\n\n队列中的每一对都是镜像条件中尚未验证的子问题，只有全部通过才能返回真。",
          "en": "Each queue item is a pair expected to mirror one another. Preserve null positions; comparing only nonnull values of a layer can falsely accept different shapes. The queue contains precisely the unverified mirror subproblems, so exhausting it without rejection establishes symmetry."
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
        "time": "O(n)",
        "space": "O(w)",
        "complexity": {
          "zh": "总共 O(n) 对，队列宽度为 O(w)。Java 用二元素数组包装 null，避免 ArrayDeque 直接存 null。",
          "en": "There are O(n) pairs and O(w) queued pairs. Java wraps nullable nodes in arrays because ArrayDeque rejects null elements."
        },
        "python": "from collections import deque\nclass Solution:\n    def isSymmetric(self, root):\n        if root is None: return True\n        q = deque([(root.left,root.right)])\n        while q:\n            a,b = q.popleft()\n            if a is None and b is None: continue\n            if a is None or b is None or a.val != b.val: return False\n            q.append((a.left,b.right)); q.append((a.right,b.left))\n        return True\n",
        "java": "import java.util.*;\nclass Solution  {\n    public boolean isSymmetric(TreeNode root) {\n        if(root==null)return true;\n        Deque<TreeNode[]>q=new ArrayDeque<>();\n        q.add(new TreeNode[] {\n            root.left,root.right\n        }\n        );\n        while(!q.isEmpty()) {\n            TreeNode[]p=q.remove();\n            TreeNode a=p[0],b=p[1];\n            if(a==null&&b==null)continue;\n            if(a==null||b==null||a.val!=b.val)return false;\n            q.add(new TreeNode[] {\n                a.left,b.right\n            }\n            );\n            q.add(new TreeNode[] {\n                a.right,b.left\n            }\n            );\n        }\n        return true;\n    }\n}\n",
        "algorithmNotes": {
          "zh": "队列中的元素是一对需要互相镜像的节点，不能只按单节点层序比较值。处理一对后，把外侧孩子作为一对、内侧孩子作为另一对入队，空节点也参与结构匹配。",
          "en": "Queue pairs of nodes that must mirror one another rather than comparing a flat level-order sequence. Enqueue outer-child and inner-child pairs, retaining nulls long enough to verify structural symmetry."
        }
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
    },
    "examples": [
      {
        "input": "root = [4,2,2,1,3,3,1]",
        "output": "true",
        "note": {
          "zh": "树使用层序数组表示，null 表示该位置没有节点。",
          "en": "Trees use level-order arrays; null denotes an absent node."
        }
      },
      {
        "input": "root = [1,2,2,null,3,null,3]",
        "output": "false",
        "note": {
          "zh": "树使用层序数组表示，null 表示该位置没有节点。",
          "en": "Trees use level-order arrays; null denotes an absent node."
        }
      },
      {
        "input": "root = [1]",
        "output": "true",
        "note": {
          "zh": "树使用层序数组表示，null 表示该位置没有节点。",
          "en": "Trees use level-order arrays; null denotes an absent node."
        }
      }
    ]
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
    "methods": [
      {
        "key": "recompute",
        "name": {
          "zh": "枚举转折点并重算高度",
          "en": "Recompute heights at every pivot"
        },
        "intuition": {
          "zh": "任意路径都有一个离根最近的节点，称为转折点。固定转折点时，最长路径向左和向右分别延伸到最深叶，长度是左右高度之和。最直接的方法对每个节点重新计算这两个高度。\n\n枚举所有可能最高节点，每个节点的候选又是通过它的最长路径，因此最大候选就是直径。",
          "en": "Every path has a highest node, its pivot. At a fixed pivot, extend toward a deepest leaf in each child subtree; the edge count equals the two child heights. The baseline recomputes these heights for every pivot. All possible highest nodes are considered, and each contributes its longest crossing path, so their maximum is the diameter."
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
        "time": "O(n²) worst case",
        "space": "O(h)",
        "complexity": {
          "zh": "链状树中高度计算重复扫描 n+(n-1)+… 个节点。遍历栈与高度栈合计仍不超过 O(h)，不是 O(nh) 空间。 实际递归受 Python 递归深度和 Java 线程栈限制；提高 Python 深度不会消除内存开销，极深输入优先用显式栈。 这是便于对比的基准解法，大规模最坏输入可能超时。",
          "en": "On a chain, height computations revisit n+(n-1)+… nodes. Concurrent traversal and height frames remain O(h), not O(nh) space. Actual recursion is limited by Python recursion depth and the Java thread stack; raising Python’s limit does not remove memory costs. Prefer an explicit stack for extreme depth. This comparison baseline may time out on large worst-case inputs."
        },
        "python": "import sys\nclass Solution:\n    def diameterOfBinaryTree(self, root):\n        sys.setrecursionlimit(max(sys.getrecursionlimit(), 30000))\n        def depth(n):\n            return 0 if n is None else 1+max(depth(n.left),depth(n.right))\n        def solve(n):\n            if n is None: return 0\n            return max(depth(n.left)+depth(n.right),solve(n.left),solve(n.right))\n        return solve(root)\n",
        "java": "import java.util.*;\nclass Solution  {\n    private int depth(TreeNode n) {\n        return n==null?0:1+Math.max(depth(n.left),depth(n.right));\n    }\n    public int diameterOfBinaryTree(TreeNode n) {\n        return n==null?0:Math.max(depth(n.left)+depth(n.right),Math.max(diameterOfBinaryTree(n.left),diameterOfBinaryTree(n.right)));\n    }\n}\n",
        "algorithmNotes": {
          "zh": "以每个节点作为路径最高点，候选长度是其左子树高度加右子树高度，这里长度按边计数。还需递归检查左右子树内部的直径，最长路径不一定经过整棵树的根。",
          "en": "Treat every node as a possible highest point of a path, giving a candidate of left height plus right height measured in edges. Also inspect diameters inside both subtrees because the longest path need not pass through the root."
        }
      },
      {
        "key": "postorder",
        "name": {
          "zh": "后序一次计算",
          "en": "One-pass postorder"
        },
        "intuition": {
          "zh": "重复来自子树高度被多个祖先索取。让递归在返回高度的同时更新直径，每棵子树高度只算一次。返回的是单支高度，更新答案则允许左右两支连接，二者不要混用。\n\n孩子高度由归纳正确；L+R 是经过当前节点的最优边数。所有节点都更新一次，覆盖直径的最高节点。",
          "en": "Repeated work comes from ancestors recomputing heights. Return height once while updating the best diameter. The return value extends one branch; the candidate diameter may combine two branches. Correct child heights give the longest crossing path L+R at each node. Visiting every node includes the highest node of the actual diameter."
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
        "time": "O(n)",
        "space": "O(h)",
        "complexity": {
          "zh": "每节点计算两个整数和一次最大值，访问一次。只保留递归路径。 实际递归受 Python 递归深度和 Java 线程栈限制；提高 Python 深度不会消除内存开销，极深输入优先用显式栈。",
          "en": "Each node is visited once and performs constant arithmetic. Only the recursive path is retained. Actual recursion is limited by Python recursion depth and the Java thread stack; raising Python’s limit does not remove memory costs. Prefer an explicit stack for extreme depth."
        },
        "python": "import sys\nclass Solution:\n    def diameterOfBinaryTree(self, root):\n        sys.setrecursionlimit(max(sys.getrecursionlimit(), 30000))\n        answer = 0\n        def depth(n):\n            nonlocal answer\n            if n is None: return 0\n            l,r = depth(n.left),depth(n.right)\n            answer = max(answer,l+r)\n            return 1+max(l,r)\n        depth(root)\n        return answer\n",
        "java": "import java.util.*;\nclass Solution  {\n    private int answer;\n    public int diameterOfBinaryTree(TreeNode root) {\n        answer=0;\n        depth(root);\n        return answer;\n    }\n    private int depth(TreeNode n) {\n        if(n==null)return 0;\n        int l=depth(n.left),r=depth(n.right);\n        answer=Math.max(answer,l+r);\n        return 1+Math.max(l,r);\n    }\n}\n",
        "algorithmNotes": {
          "zh": "同一次后序遍历返回高度并顺便更新直径。向父节点只能返回 1+max(left,right) 的单支高度，而全局直径用 left+right 更新，不能把双支路径继续向上传递。",
          "en": "One postorder traversal returns heights while updating the diameter. Return only 1+max(left,right) to the parent, but update the global diameter with left+right; a two-branch path cannot be extended upward as one branch."
        }
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
    },
    "examples": [
      {
        "input": "root = [5,2,8,1,3]",
        "output": "3",
        "note": {
          "zh": "树使用层序数组表示，null 表示该位置没有节点。",
          "en": "Trees use level-order arrays; null denotes an absent node."
        }
      },
      {
        "input": "root = [1]",
        "output": "0",
        "note": {
          "zh": "树使用层序数组表示，null 表示该位置没有节点。",
          "en": "Trees use level-order arrays; null denotes an absent node."
        }
      },
      {
        "input": "root = [1,2,3,4,null,null,5]",
        "output": "4",
        "note": {
          "zh": "树使用层序数组表示，null 表示该位置没有节点。",
          "en": "Trees use level-order arrays; null denotes an absent node."
        }
      }
    ]
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
    "methods": [
      {
        "key": "queue",
        "name": {
          "zh": "队列按层切分",
          "en": "Queue with layer boundaries"
        },
        "intuition": {
          "zh": "队列天然先处理较浅节点，但还需要知道每层何时结束。每轮固定 size，处理恰好 size 个节点，下一层孩子虽然已经入队，也不能在本轮继续处理。\n\n队列按父节点从左到右的顺序接收左、右孩子，因此下一层也从左到右；固定长度保持层间分隔。",
          "en": "A FIFO queue naturally visits shallow nodes first, but layer boundaries need an explicit size snapshot. Process exactly that many nodes even as their children enter the queue. Enqueuing left then right children of left-to-right parents preserves the next layer’s order; a fixed size keeps layers separate."
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
        "time": "O(n)",
        "space": "O(w) auxiliary + O(n) output",
        "complexity": {
          "zh": "每节点只进出队一次。结果必须保存所有节点值，不能把输出空间遗漏。",
          "en": "Each node is enqueued and dequeued once. The returned values require O(n) space in addition to the queue."
        },
        "python": "from collections import deque\nclass Solution:\n    def levelOrder(self, root):\n        q = deque([root]) if root else deque()\n        result = []\n        while q:\n            row = []\n            for _ in range(len(q)):\n                n=q.popleft(); row.append(n.val)\n                if n.left:q.append(n.left)\n                if n.right:q.append(n.right)\n            result.append(row)\n        return result\n",
        "java": "import java.util.*;\nclass Solution  {\n    public List<List<Integer>> levelOrder(TreeNode root) {\n        List<List<Integer>>a=new ArrayList<>();\n        Deque<TreeNode>q=new ArrayDeque<>();\n        if(root!=null)q.add(root);\n        while(!q.isEmpty()) {\n            int size=q.size();\n            List<Integer>row=new ArrayList<>();\n            while(size-->0) {\n                TreeNode n=q.remove();\n                row.add(n.val);\n                if(n.left!=null)q.add(n.left);\n                if(n.right!=null)q.add(n.right);\n            }\n            a.add(row);\n        }\n        return a;\n    }\n}\n",
        "algorithmNotes": {
          "zh": "每轮固定队列大小并创建新的层数组，依次取出本层节点。把它们的值放入同一层数组，非空孩子从左到右入队；一层处理完再把层数组加入结果。",
          "en": "Freeze the queue size and create a fresh array for the level. Append values from that batch, enqueue nonempty children left to right, and append the completed level array to the result."
        }
      },
      {
        "key": "depth-buckets",
        "name": {
          "zh": "DFS 按深度装入桶",
          "en": "DFS into depth buckets"
        },
        "intuition": {
          "zh": "不必按层执行，按层存放就行。DFS 带上当前深度，把值放进 result[depth]。必须先走左再走右，才能让同深度值的追加顺序从左到右。\n\n每个节点被放入自己的准确深度；左优先 DFS 对同层节点的相对顺序与从左到右一致。",
          "en": "Traversal itself need not be level-by-level if storage is grouped by depth. DFS appends into result[depth], visiting left before right to preserve horizontal order. Each node enters its correct depth bucket, and left-first DFS encounters nodes of any fixed depth in left-to-right order."
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
        "time": "O(n)",
        "space": "O(h) auxiliary + O(n) output",
        "complexity": {
          "zh": "每节点追加一次；递归栈 O(h)，输出 O(n)。Python 提高递归深度以覆盖链形输入。 实际递归受 Python 递归深度和 Java 线程栈限制；提高 Python 深度不会消除内存开销，极深输入优先用显式栈。",
          "en": "One append per node; the stack uses O(h) and output O(n). Python raises its recursion limit for chain-shaped inputs. Actual recursion is limited by Python recursion depth and the Java thread stack; raising Python’s limit does not remove memory costs. Prefer an explicit stack for extreme depth."
        },
        "python": "import sys\nclass Solution:\n    def levelOrder(self, root):\n        sys.setrecursionlimit(max(sys.getrecursionlimit(),6000))\n        result=[]\n        def visit(n,d):\n            if n is None:return\n            if d==len(result):result.append([])\n            result[d].append(n.val)\n            visit(n.left,d+1);visit(n.right,d+1)\n        visit(root,0)\n        return result\n",
        "java": "import java.util.*;\nclass Solution  {\n    public List<List<Integer>> levelOrder(TreeNode root) {\n        List<List<Integer>>a=new ArrayList<>();\n        visit(root,0,a);\n        return a;\n    }\n    private void visit(TreeNode n,int d,List<List<Integer>>a) {\n        if(n==null)return;\n        if(d==a.size())a.add(new ArrayList<>());\n        a.get(d).add(n.val);\n        visit(n.left,d+1,a);\n        visit(n.right,d+1,a);\n    }\n}\n",
        "algorithmNotes": {
          "zh": "递归参数 depth 表示当前层号，根从 0 开始。首次到达某层时创建结果桶，再把当前值追加进去；先左后右递归保证同一层中的顺序仍是从左到右。",
          "en": "Pass depth starting at zero for the root. Create a result bucket when first reaching a depth, append the current value, and recurse left before right to retain left-to-right order within every level."
        }
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
    },
    "examples": [
      {
        "input": "root = [5,2,8,1,3]",
        "output": "[[5],[2,8],[1,3]]",
        "note": {
          "zh": "树使用层序数组表示，null 表示该位置没有节点。",
          "en": "Trees use level-order arrays; null denotes an absent node."
        }
      },
      {
        "input": "root = []",
        "output": "[]",
        "note": {
          "zh": "树使用层序数组表示，null 表示该位置没有节点。",
          "en": "Trees use level-order arrays; null denotes an absent node."
        }
      },
      {
        "input": "root = [8]",
        "output": "[[8]]",
        "note": {
          "zh": "树使用层序数组表示，null 表示该位置没有节点。",
          "en": "Trees use level-order arrays; null denotes an absent node."
        }
      }
    ]
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
    "methods": [
      {
        "key": "midpoint",
        "name": {
          "zh": "中点分治建树",
          "en": "Midpoint divide and conquer"
        },
        "intuition": {
          "zh": "有序数组中任意位置都能作为 BST 的根，但选两端会退化成链。每次选区间中点，使两边数量最多相差一，再对子区间重复。偶数长度选左中点或右中点均可。\n\n左区间所有值更小，右区间所有值更大，故满足 BST。均匀二分令各子树高度最多差一，且递归保持此性质。",
          "en": "Any array position could be a BST root, but endpoints would create a chain. Repeatedly choose the midpoint so child ranges differ in size by at most one. Either middle element works for even lengths. All left-range values are smaller and all right-range values larger. Repeated balanced splits produce child heights differing by at most one at every node."
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
        "time": "O(n)",
        "space": "O(log n) auxiliary + O(n) output",
        "complexity": {
          "zh": "每个值建一个节点；传索引而非切片，避免复制数组。二分栈高 O(log n)，新树 O(n)。",
          "en": "Each value creates one node. Index ranges avoid slice copying; recursion depth is O(log n), while the new tree needs O(n)."
        },
        "python": "class Solution:\n    def sortedArrayToBST(self, nums):\n        def build(lo,hi):\n            if lo>hi:return None\n            mid=(lo+hi)//2\n            n=TreeNode(nums[mid])\n            n.left=build(lo,mid-1);n.right=build(mid+1,hi)\n            return n\n        return build(0,len(nums)-1)\n",
        "java": "import java.util.*;\nclass Solution  {\n    public TreeNode sortedArrayToBST(int[] nums) {\n        return build(nums,0,nums.length-1);\n    }\n    private TreeNode build(int[]a,int lo,int hi) {\n        if(lo>hi)return null;\n        int mid=lo+(hi-lo)/2;\n        TreeNode n=new TreeNode(a[mid]);\n        n.left=build(a,lo,mid-1);\n        n.right=build(a,mid+1,hi);\n        return n;\n    }\n}\n",
        "algorithmNotes": {
          "zh": "中点作为根可以让左右区间的元素个数最多相差 1。对子区间重复同样操作，边界交错时返回空节点；偶数长度可选两个中点中的任一个，因此合法树形可能不唯一。",
          "en": "Choosing the midpoint keeps the left and right sizes within one element. Repeat on each subrange and return null for an empty range; either middle element is valid for an even-sized range, so the output tree need not be unique."
        }
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
    },
    "examples": [
      {
        "input": "nums = [-4,-1,2,7,9]",
        "output": "[2,-4,7,null,-1,null,9]",
        "note": {
          "zh": "树按层序表示，null 表示缺失节点。这是一个合法结果，其他满足平衡条件的 BST 也可。",
          "en": "Trees use level-order arrays with null for absent nodes. This is one valid result; other balanced BSTs are also accepted."
        }
      },
      {
        "input": "nums = [1]",
        "output": "[1]",
        "note": {
          "zh": "树按层序表示，null 表示缺失节点。这是一个合法结果，其他满足平衡条件的 BST 也可。",
          "en": "Trees use level-order arrays with null for absent nodes. This is one valid result; other balanced BSTs are also accepted."
        }
      },
      {
        "input": "nums = [1,2,3]",
        "output": "[2,1,3]",
        "note": {
          "zh": "树按层序表示，null 表示缺失节点。这是一个合法结果，其他满足平衡条件的 BST 也可。",
          "en": "Trees use level-order arrays with null for absent nodes. This is one valid result; other balanced BSTs are also accepted."
        }
      }
    ]
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
    "methods": [
      {
        "key": "bounds",
        "name": {
          "zh": "传递开区间边界",
          "en": "Propagate open bounds"
        },
        "intuition": {
          "zh": "只比较父子会漏掉祖先限制，例如右子树中的 6 虽小于父亲 10，却也必须大于根 8。给每个子问题携带可接受的开区间，并在下行时收紧一边。\n\n范围包含所有祖先施加的限制，逐层收紧且不丢失旧限制。所有节点通过等价于整树的严格 BST 条件。",
          "en": "Parent-child comparisons miss ancestor restrictions: 6 may be below 10 yet still violate root 8’s lower bound. Carry an open interval into every subtree and tighten one endpoint on descent. The interval contains every ancestor restriction. Tightening it preserves old restrictions, so all nodes passing is equivalent to the strict BST property."
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
        "time": "O(n)",
        "space": "O(h)",
        "complexity": {
          "zh": "每节点一次检查。Java 边界用 long，避免 Integer.MIN_VALUE/MAX_VALUE 被错误排除。 实际递归受 Python 递归深度和 Java 线程栈限制；提高 Python 深度不会消除内存开销，极深输入优先用显式栈。",
          "en": "One check per node. Java uses long bounds so valid extreme int values are not accidentally excluded. Actual recursion is limited by Python recursion depth and the Java thread stack; raising Python’s limit does not remove memory costs. Prefer an explicit stack for extreme depth."
        },
        "python": "import sys\nclass Solution:\n    def isValidBST(self, root):\n        sys.setrecursionlimit(max(sys.getrecursionlimit(),30000))\n        def valid(n,lo,hi):\n            if n is None:return True\n            return lo<n.val<hi and valid(n.left,lo,n.val) and valid(n.right,n.val,hi)\n        return valid(root,float('-inf'),float('inf'))\n",
        "java": "import java.util.*;\nclass Solution  {\n    public boolean isValidBST(TreeNode root) {\n        return valid(root,Long.MIN_VALUE,Long.MAX_VALUE);\n    }\n    private boolean valid(TreeNode n,long lo,long hi) {\n        return n==null||(lo<n.val&&n.val<hi&&valid(n.left,lo,n.val)&&valid(n.right,n.val,hi));\n    }\n}\n",
        "algorithmNotes": {
          "zh": "递归携带从所有祖先继承的开区间上下界，而不只是与父节点比较。进入左子树时收紧上界为当前值，进入右子树时收紧下界；值等于边界也不合法，因为 BST 要求严格大小关系。",
          "en": "Carry open lower and upper bounds inherited from every ancestor rather than comparing only with the parent. Tighten the upper bound on the left and lower bound on the right; equality is invalid in a strict BST."
        }
      },
      {
        "key": "inorder",
        "name": {
          "zh": "中序严格递增检查",
          "en": "Strictly increasing inorder"
        },
        "intuition": {
          "zh": "BST 的中序一定严格递增；反过来，若中序严格递增，则任一根前面的整个左子树都更小，后面的整个右子树都更大。只需保存上一个输出值，不必存完整数组。\n\n中序严格递增是严格 BST 的充要条件；相邻元素比较即可验证整个序列递增。",
          "en": "A BST has strictly increasing inorder values. Conversely, a strictly increasing inorder sequence makes each entire left subtree smaller and each right subtree larger. Keep only the previous value. Strictly increasing inorder is equivalent to a strict BST; checking adjacent emitted values proves the entire sequence is increasing."
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
        "time": "O(n)",
        "space": "O(h)",
        "complexity": {
          "zh": "每节点入栈、出栈一次；上一个值是常数空间，没有 O(n) 结果数组。",
          "en": "Each node is pushed and popped once. A single previous value replaces an O(n) output array."
        },
        "python": "class Solution:\n    def isValidBST(self, root):\n        stack=[];cur=root;previous=None\n        while cur or stack:\n            while cur:stack.append(cur);cur=cur.left\n            cur=stack.pop()\n            if previous is not None and cur.val<=previous:return False\n            previous=cur.val;cur=cur.right\n        return True\n",
        "java": "import java.util.*;\nclass Solution  {\n    public boolean isValidBST(TreeNode root) {\n        Deque<TreeNode>s=new ArrayDeque<>();\n        TreeNode cur=root;\n        Long prev=null;\n        while(cur!=null||!s.isEmpty()) {\n            while(cur!=null) {\n                s.push(cur);\n                cur=cur.left;\n            }\n            cur=s.pop();\n            if(prev!=null&&cur.val<=prev)return false;\n            prev=(long)cur.val;\n            cur=cur.right;\n        }\n        return true;\n    }\n}\n",
        "algorithmNotes": {
          "zh": "BST 的中序结果必须严格递增，所以只需比较当前值与上一个访问值。第一个值没有前驱，单独初始化；后续若当前值小于或等于前驱立即失败，重复值不能通过。",
          "en": "A BST's inorder sequence must be strictly increasing. Handle the first value without a predecessor, then fail whenever the current value is less than or equal to the previous one; duplicates are invalid."
        }
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
    },
    "examples": [
      {
        "input": "root = [8,4,10,null,null,6,12]",
        "output": "false",
        "note": {
          "zh": "树使用层序数组表示，null 表示该位置没有节点。",
          "en": "Trees use level-order arrays; null denotes an absent node."
        }
      },
      {
        "input": "root = [5,2,8,1,3]",
        "output": "true",
        "note": {
          "zh": "树使用层序数组表示，null 表示该位置没有节点。",
          "en": "Trees use level-order arrays; null denotes an absent node."
        }
      },
      {
        "input": "root = [2,2,3]",
        "output": "false",
        "note": {
          "zh": "树使用层序数组表示，null 表示该位置没有节点。",
          "en": "Trees use level-order arrays; null denotes an absent node."
        }
      }
    ]
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
    "methods": [
      {
        "key": "all-values",
        "name": {
          "zh": "完整中序后取下标",
          "en": "Collect inorder then index"
        },
        "intuition": {
          "zh": "先把树变成有序数组，排名问题就变成取下标 k-1。这个方法直观，适合作为基准，但即使 k 很小也遍历全部节点。\n\nBST 中序按值递增，数组下标 k-1 的前面恰好有 k-1 个更小节点。",
          "en": "Convert the BST into its sorted inorder array, then select index k-1. This straightforward baseline still visits every node even for a small rank. BST inorder is increasing, so exactly k-1 smaller nodes precede index k-1."
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
        "time": "O(n)",
        "space": "O(n)",
        "complexity": {
          "zh": "结果数组 O(n)，显式栈 O(h) 被 O(n) 包含。",
          "en": "The O(n) array dominates the O(h) traversal stack."
        },
        "python": "class Solution:\n    def kthSmallest(self, root, k):\n        values=[];stack=[];cur=root\n        while cur or stack:\n            while cur:stack.append(cur);cur=cur.left\n            cur=stack.pop();values.append(cur.val);cur=cur.right\n        return values[k-1]\n",
        "java": "import java.util.*;\nclass Solution  {\n    public int kthSmallest(TreeNode root,int k) {\n        List<Integer>a=new ArrayList<>();\n        Deque<TreeNode>s=new ArrayDeque<>();\n        TreeNode c=root;\n        while(c!=null||!s.isEmpty()) {\n            while(c!=null) {\n                s.push(c);\n                c=c.left;\n            }\n            c=s.pop();\n            a.add(c.val);\n            c=c.right;\n        }\n        return a.get(k-1);\n    }\n}\n",
        "algorithmNotes": {
          "zh": "中序遍历将 BST 的值按升序放入列表，题目中的 k 从 1 开始，因此读取下标 k−1。这是先完整收集再取值的方法，即使 k 很小也会遍历所有节点。",
          "en": "An inorder traversal collects BST values in ascending order. Since k is one-based, read index k−1 afterward; this version visits all nodes even when k is small."
        }
      },
      {
        "key": "early-stop",
        "name": {
          "zh": "中序计数提前停止",
          "en": "Stop inorder at rank k"
        },
        "intuition": {
          "zh": "完整数组中只有一个位置有用。中序每弹出一个节点就消耗一个排名，到第 k 次直接返回，不再进入无关右子树。注意入栈不代表已经访问，计数要放在弹出时。\n\n弹出顺序就是递增顺序，所以第 k 次弹出的值是所需排名；提前结束不影响此前顺序。",
          "en": "Only one position in the sorted sequence is needed. Consume one rank at each inorder pop and return on the kth pop. Pushing a node is not an inorder visit, so do not count pushes. Pops occur in sorted order, making the kth pop the requested rank. Stopping cannot affect the prefix already visited."
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
        "time": "O(h+k), bounded by O(n)",
        "space": "O(h)",
        "complexity": {
          "zh": "最多处理前 k 个访问节点和栈上最多 h 个待访问祖先；没有全量结果数组。",
          "en": "Work covers k emitted nodes and at most h pending ancestors, without a full output array."
        },
        "python": "class Solution:\n    def kthSmallest(self, root, k):\n        stack=[];cur=root\n        while cur or stack:\n            while cur:stack.append(cur);cur=cur.left\n            cur=stack.pop();k-=1\n            if k==0:return cur.val\n            cur=cur.right\n        raise ValueError('Invalid rank')\n",
        "java": "import java.util.*;\nclass Solution  {\n    public int kthSmallest(TreeNode root,int k) {\n        Deque<TreeNode>s=new ArrayDeque<>();\n        TreeNode c=root;\n        while(c!=null||!s.isEmpty()) {\n            while(c!=null) {\n                s.push(c);\n                c=c.left;\n            }\n            c=s.pop();\n            if(--k==0)return c.val;\n            c=c.right;\n        }\n        throw new IllegalArgumentException();\n    }\n}\n",
        "algorithmNotes": {
          "zh": "用栈中序遍历，每弹出并访问一个节点就把剩余排名减一。减到 0 时立刻返回当前值，不再探索后续右子树；压栈只是准备访问，不能在压栈时扣减 k。",
          "en": "Perform iterative inorder traversal and decrement the remaining rank when a node is popped and visited. Return immediately at zero; pushing a node only schedules a visit and must not decrement k."
        }
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
    },
    "examples": [
      {
        "input": "root = [5,2,8,1,3], k = 3",
        "output": "3",
        "note": {
          "zh": "树使用层序数组表示，null 表示该位置没有节点。",
          "en": "Trees use level-order arrays; null denotes an absent node."
        }
      },
      {
        "input": "root = [1], k = 1",
        "output": "1",
        "note": {
          "zh": "树使用层序数组表示，null 表示该位置没有节点。",
          "en": "Trees use level-order arrays; null denotes an absent node."
        }
      },
      {
        "input": "root = [2,1,3], k = 3",
        "output": "3",
        "note": {
          "zh": "树使用层序数组表示，null 表示该位置没有节点。",
          "en": "Trees use level-order arrays; null denotes an absent node."
        }
      }
    ]
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
    "methods": [
      {
        "key": "bfs",
        "name": {
          "zh": "每层取最后一个",
          "en": "Last node of each BFS layer"
        },
        "intuition": {
          "zh": "先得到每层从左到右的顺序，再取末尾就是该层右侧能看到的节点。固定当前层的大小，防止把下一层节点误认为本层结尾。\n\n左到右的队列顺序保证每层最后出队者最靠右，每层恰好记录一次。",
          "en": "BFS visits each layer left to right, so the final node in that layer is visible from the right. Freeze the layer size to avoid mixing in newly enqueued children. Left-to-right queue order makes the last removal the rightmost node, with exactly one recorded value per layer."
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
        "time": "O(n)",
        "space": "O(w) auxiliary + O(h) output",
        "complexity": {
          "zh": "队列 O(w)，视图每层一个值共 O(h)；每节点一次进出队。",
          "en": "The queue uses O(w), the view stores O(h) values, and each node is enqueued and dequeued once."
        },
        "python": "from collections import deque\nclass Solution:\n    def rightSideView(self, root):\n        q=deque([root]) if root else deque();result=[]\n        while q:\n            for _ in range(len(q)):\n                n=q.popleft()\n                if n.left:q.append(n.left)\n                if n.right:q.append(n.right)\n            result.append(n.val)\n        return result\n",
        "java": "import java.util.*;\nclass Solution  {\n    public List<Integer> rightSideView(TreeNode root) {\n        List<Integer>a=new ArrayList<>();\n        Deque<TreeNode>q=new ArrayDeque<>();\n        if(root!=null)q.add(root);\n        while(!q.isEmpty()) {\n            int size=q.size();\n            for(int i=0;i<size;i++) {\n                TreeNode n=q.remove();\n                if(n.left!=null)q.add(n.left);\n                if(n.right!=null)q.add(n.right);\n                if(i==size-1)a.add(n.val);\n            }\n        }\n        return a;\n    }\n}\n",
        "algorithmNotes": {
          "zh": "每层队列按从左到右排列，处理到本层最后一个节点时记录其值。下一层仍按左孩子再右孩子入队；只看根节点的右链会漏掉右侧空缺时从左子树露出的节点。",
          "en": "Process each level left to right and record its final node. Enqueue left before right for the next level; following only right-child links would miss visible nodes exposed from the left subtree."
        }
      },
      {
        "key": "right-first",
        "name": {
          "zh": "右优先 DFS 首次记录",
          "en": "First encounter in right-first DFS"
        },
        "intuition": {
          "zh": "把遍历方向改成根、右、左，则每个深度首次遇到的节点就是最右节点。用答案长度判断该深度是否已经记录，不需要额外集合。\n\n在同一深度，右优先遍历先到右侧位置；后续左侧节点不能覆盖先前答案，深层缺失仍会由左侧补齐。",
          "en": "Traverse root, right, then left. The first node encountered at a depth is the rightmost one. The current answer length tells whether that depth has already been recorded. Right-first traversal reaches rightward positions first at a fixed depth. Later left nodes cannot overwrite them, but may fill deeper unseen levels."
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
        "time": "O(n)",
        "space": "O(h) including output",
        "complexity": {
          "zh": "每节点访问一次；栈和每层一个答案都 O(h)。",
          "en": "One visit per node; both the stack and one-value-per-depth output are O(h)."
        },
        "python": "class Solution:\n    def rightSideView(self, root):\n        result=[]\n        def visit(n,d):\n            if n is None:return\n            if d==len(result):result.append(n.val)\n            visit(n.right,d+1);visit(n.left,d+1)\n        visit(root,0)\n        return result\n",
        "java": "import java.util.*;\nclass Solution  {\n    public List<Integer> rightSideView(TreeNode root) {\n        List<Integer>a=new ArrayList<>();\n        visit(root,0,a);\n        return a;\n    }\n    private void visit(TreeNode n,int d,List<Integer>a) {\n        if(n==null)return;\n        if(d==a.size())a.add(n.val);\n        visit(n.right,d+1,a);\n        visit(n.left,d+1,a);\n    }\n}\n",
        "algorithmNotes": {
          "zh": "优先访问右子树，并记录每个深度第一次遇到的节点。只有 depth 等于当前答案长度时才追加；同一深度随后到达的左侧节点不覆盖结果，但仍可贡献更深层的可见节点。",
          "en": "Visit right subtrees first and record only the first node reached at each depth. Append when depth equals the current result length; later left-side nodes cannot replace that depth's value but may reveal deeper levels."
        }
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
    },
    "examples": [
      {
        "input": "root = [5,2,8,1,3]",
        "output": "[5,8,3]",
        "note": {
          "zh": "树使用层序数组表示，null 表示该位置没有节点。",
          "en": "Trees use level-order arrays; null denotes an absent node."
        }
      },
      {
        "input": "root = []",
        "output": "[]",
        "note": {
          "zh": "树使用层序数组表示，null 表示该位置没有节点。",
          "en": "Trees use level-order arrays; null denotes an absent node."
        }
      },
      {
        "input": "root = [1,2,null,3]",
        "output": "[1,2,3]",
        "note": {
          "zh": "树使用层序数组表示，null 表示该位置没有节点。",
          "en": "Trees use level-order arrays; null denotes an absent node."
        }
      }
    ]
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
    "methods": [
      {
        "key": "preorder-stack",
        "name": {
          "zh": "显式栈前序重连",
          "en": "Preorder stack and rewiring"
        },
        "intuition": {
          "zh": "前序顺序确定后，把相邻访问节点连接起来即可。栈后进先出，所以先压右孩子再压左孩子。必须先保存孩子，再清空当前节点指针，否则会丢失尚未访问的子树。\n\n栈保证访问顺序为原树前序；每条新 right 边连接连续访问节点，且每个 left 被清空。",
          "en": "Connect consecutive nodes in preorder. Because a stack is LIFO, push the right child before the left. Save children before clearing pointers to avoid losing unvisited subtrees. The stack preserves original preorder, each new right edge connects consecutive visits, and every left pointer is cleared."
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
        "time": "O(n)",
        "space": "O(h)",
        "complexity": {
          "zh": "每节点入栈出栈一次，DFS 栈保存祖先的待处理兄弟 O(h)；复用节点无新链。",
          "en": "Every node is pushed and popped once; pending siblings along a DFS path require O(h). Nodes are reused."
        },
        "python": "class Solution:\n    def flatten(self, root):\n        stack=[root] if root else [];prev=None\n        while stack:\n            n=stack.pop()\n            if n.right:stack.append(n.right)\n            if n.left:stack.append(n.left)\n            n.left=n.right=None\n            if prev:prev.right=n\n            prev=n\n",
        "java": "import java.util.*;\nclass Solution  {\n    public void flatten(TreeNode root) {\n        Deque<TreeNode>s=new ArrayDeque<>();\n        if(root!=null)s.push(root);\n        TreeNode prev=null;\n        while(!s.isEmpty()) {\n            TreeNode n=s.pop();\n            if(n.right!=null)s.push(n.right);\n            if(n.left!=null)s.push(n.left);\n            n.left=null;\n            n.right=null;\n            if(prev!=null)prev.right=n;\n            prev=n;\n        }\n    }\n}\n",
        "algorithmNotes": {
          "zh": "栈中先压右孩子再压左孩子，出栈顺序才是根、左、右。保存孩子引用后再改链，把前一个节点的 left 清空、right 指向当前节点，避免修改链接后丢失原子树。",
          "en": "Push right before left so popping yields root-left-right order. Save child references before rewiring, then clear the previous node's left link and point its right to the current node without losing an original subtree."
        }
      },
      {
        "key": "splice",
        "name": {
          "zh": "前驱位置拼接",
          "en": "Constant-space splicing"
        },
        "intuition": {
          "zh": "当前节点有左子树时，前序要求整棵左树先于右树。把原右树挂到左树最右链末端，再把左树移到右边。这个末端不一定是最终前序尾节点，但在后续同样重排后，原右树会位于整个左子树之后。\n\n每次变换保留根、整左树、整右树的前序次序。依次消除所有左边，最终右链就是原前序。",
          "en": "Preorder requires the entire left subtree before the original right subtree. Attach the original right subtree to the end of the left subtree’s right spine, then move the left subtree rightward. That spine endpoint need not be the final preorder tail; later splices preserve the required eventual order. Each transformation preserves the preorder sequence root-left-subtree-right-subtree. Eliminating all left links therefore yields that same sequence as a right chain."
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
        "time": "O(n)",
        "space": "O(1)",
        "complexity": {
          "zh": "主指针线性前进；寻找前驱扫描的原始右边总计 O(n)，并非每次都重扫整树。只使用 cur 和 pre。",
          "en": "The main pointer advances linearly; original right-spine edges scanned during predecessor searches total O(n). Only cur and pre are needed."
        },
        "python": "class Solution:\n    def flatten(self, root):\n        cur=root\n        while cur:\n            if cur.left:\n                pre=cur.left\n                while pre.right:pre=pre.right\n                pre.right=cur.right\n                cur.right=cur.left\n                cur.left=None\n            cur=cur.right\n",
        "java": "import java.util.*;\nclass Solution  {\n    public void flatten(TreeNode root) {\n        TreeNode cur=root;\n        while(cur!=null) {\n            if(cur.left!=null) {\n                TreeNode pre=cur.left;\n                while(pre.right!=null)pre=pre.right;\n                pre.right=cur.right;\n                cur.right=cur.left;\n                cur.left=null;\n            }\n            cur=cur.right;\n        }\n    }\n}\n",
        "algorithmNotes": {
          "zh": "有左子树时，找到左子树中沿 right 能到达的最右节点，把原右子树接到那里。再把左子树整体搬到 right，并清空 left；随后沿 right 前进，逐步把结构展开。",
          "en": "When a left subtree exists, find its rightmost node and attach the original right subtree there. Move the left subtree to right, clear left, and continue along right to unfold the tree progressively."
        }
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
    },
    "examples": [
      {
        "input": "root = [5,2,8,1,3]",
        "output": "[5,null,2,null,1,null,3,null,8]",
        "note": {
          "zh": "输出展示原地修改后的结构。",
          "en": "The output shows the structure after in-place modification."
        }
      },
      {
        "input": "root = []",
        "output": "[]",
        "note": {
          "zh": "输出展示原地修改后的结构。",
          "en": "The output shows the structure after in-place modification."
        }
      },
      {
        "input": "root = [8]",
        "output": "[8]",
        "note": {
          "zh": "输出展示原地修改后的结构。",
          "en": "The output shows the structure after in-place modification."
        }
      }
    ]
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
    "methods": [
      {
        "key": "linear-search",
        "name": {
          "zh": "区间递归 + 线性找根",
          "en": "Recursive ranges with root scanning"
        },
        "intuition": {
          "zh": "前序的第一个值是根，中序中根左边恰好属于左子树、右边属于右子树。左右数量决定下一段前序如何分配。先用线性查找理解区间切分；传索引而不切片，避免额外数组。\n\n值唯一使中序切分位置唯一；前序游标按根、左、右推进，因此每个子区间恰好消耗对应节点且结构唯一。",
          "en": "The next preorder value is the root. Its inorder position splits the left and right subtrees. Scan the current inorder range to locate the root. Pass indices instead of slicing arrays. Distinct values make the split unique. Consuming preorder in root-left-right order assigns exactly the correct nodes to each range."
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
        "time": "O(n²) worst case",
        "space": "O(h) auxiliary + O(n) output",
        "complexity": {
          "zh": "链形树中线性找根累计可达 n+(n-1)+…；仅索引与递归栈 O(h)，另有新树 O(n)。 实际递归受 Python 递归深度和 Java 线程栈限制；提高 Python 深度不会消除内存开销，极深输入优先用显式栈。 这是便于对比的基准解法，大规模最坏输入可能超时。",
          "en": "On a chain, root searches can total n+(n-1)+…; index ranges and stack use O(h), with O(n) output nodes. Actual recursion is limited by Python recursion depth and the Java thread stack; raising Python’s limit does not remove memory costs. Prefer an explicit stack for extreme depth. This comparison baseline may time out on large worst-case inputs."
        },
        "python": "import sys\nclass Solution:\n    def buildTree(self, preorder, inorder):\n        sys.setrecursionlimit(max(sys.getrecursionlimit(),10000))\n        cursor=0\n\n        def build(lo,hi):\n            nonlocal cursor\n            if lo>hi:return None\n            value=preorder[cursor];cursor+=1\n            mid=inorder.index(value,lo,hi+1)\n            n=TreeNode(value)\n            n.left=build(lo,mid-1);n.right=build(mid+1,hi)\n            return n\n        return build(0,len(inorder)-1)\n",
        "java": "import java.util.*;\nclass Solution  {\n    private int cursor;\n    public TreeNode buildTree(int[] preorder,int[] inorder) {\n        cursor=0;\n        return build(preorder,inorder,0,inorder.length-1);\n    }\n    private TreeNode build(int[]pre,int[]in,int lo,int hi) {\n        if(lo>hi)return null;\n        int value=pre[cursor++];\n        int mid=lo;\n        while(in[mid]!=value)mid++;\n        TreeNode n=new TreeNode(value);\n        n.left=build(pre,in,lo,mid-1);\n        n.right=build(pre,in,mid+1,hi);\n        return n;\n    }\n}\n",
        "algorithmNotes": {
          "zh": "先序当前区间首元素是根，在中序区间中找到它后，左侧元素数决定左子树大小。用这个大小划分先序的左右区间，再递归构建；不能仅按值大小划分，因为原树不一定是 BST。",
          "en": "The first preorder element is the root; its position within the inorder range determines the left subtree's size. Use that size to split preorder and recurse, rather than partitioning by value as if the tree were a BST."
        }
      },
      {
        "key": "index-map",
        "name": {
          "zh": "哈希下标 + 区间递归",
          "en": "Index map and recursive ranges"
        },
        "intuition": {
          "zh": "前序的第一个值是根，中序中根左边恰好属于左子树、右边属于右子树。左右数量决定下一段前序如何分配。提前建立值到中序下标的表，避免每次扫描；共享前序游标必须先建左再建右。\n\n值唯一使中序切分位置唯一；前序游标按根、左、右推进，因此每个子区间恰好消耗对应节点且结构唯一。",
          "en": "The next preorder value is the root. Its inorder position splits the left and right subtrees. Precompute value-to-inorder-index lookup to eliminate repeated scanning. A shared preorder cursor requires building left before right. Distinct values make the split unique. Consuming preorder in root-left-right order assigns exactly the correct nodes to each range."
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
        "time": "O(n) expected",
        "space": "O(n) auxiliary + O(n) output",
        "complexity": {
          "zh": "每节点一次哈希查询；映射 O(n)，递归 O(h)，新树 O(n)。 实际递归受 Python 递归深度和 Java 线程栈限制；提高 Python 深度不会消除内存开销，极深输入优先用显式栈。",
          "en": "One expected-constant hash lookup per node; map O(n), stack O(h), new tree O(n). Actual recursion is limited by Python recursion depth and the Java thread stack; raising Python’s limit does not remove memory costs. Prefer an explicit stack for extreme depth."
        },
        "python": "import sys\nclass Solution:\n    def buildTree(self, preorder, inorder):\n        sys.setrecursionlimit(max(sys.getrecursionlimit(),10000))\n        cursor=0\n        positions={v:i for i,v in enumerate(inorder)}\n        def build(lo,hi):\n            nonlocal cursor\n            if lo>hi:return None\n            value=preorder[cursor];cursor+=1\n            mid=positions[value]\n            n=TreeNode(value)\n            n.left=build(lo,mid-1);n.right=build(mid+1,hi)\n            return n\n        return build(0,len(inorder)-1)\n",
        "java": "import java.util.*;\nclass Solution  {\n    private int cursor;\n    private Map<Integer,Integer> positions;\n    public TreeNode buildTree(int[] preorder,int[] inorder) {\n        cursor=0;\n        positions=new HashMap<>();\n        for(int i=0;i<inorder.length;i++)positions.put(inorder[i],i);\n        return build(preorder,inorder,0,inorder.length-1);\n    }\n    private TreeNode build(int[]pre,int[]in,int lo,int hi) {\n        if(lo>hi)return null;\n        int value=pre[cursor++];\n        int mid=positions.get(value);\n        TreeNode n=new TreeNode(value);\n        n.left=build(pre,in,lo,mid-1);\n        n.right=build(pre,in,mid+1,hi);\n        return n;\n    }\n}\n",
        "algorithmNotes": {
          "zh": "提前建立“节点值→中序下标”的映射，每次可直接定位根。递归只传区间边界和先序位置，左子树大小由中序下标差计算；利用题目值唯一的保证，避免反复扫描中序区间。",
          "en": "Precompute each value's inorder index for direct root lookup. Pass range boundaries and preorder positions, deriving left size from the inorder index; unique values make the map unambiguous and eliminate repeated scans."
        }
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
    },
    "examples": [
      {
        "input": "preorder = [5,2,1,3,8], inorder = [1,2,3,5,8]",
        "output": "[5,2,8,1,3]",
        "note": {
          "zh": "树使用层序数组表示，null 表示该位置没有节点。",
          "en": "Trees use level-order arrays; null denotes an absent node."
        }
      },
      {
        "input": "preorder = [-1], inorder = [-1]",
        "output": "[-1]",
        "note": {
          "zh": "树使用层序数组表示，null 表示该位置没有节点。",
          "en": "Trees use level-order arrays; null denotes an absent node."
        }
      },
      {
        "input": "preorder = [1,2,3], inorder = [1,2,3]",
        "output": "[1,null,2,null,3]",
        "note": {
          "zh": "树使用层序数组表示，null 表示该位置没有节点。",
          "en": "Trees use level-order arrays; null denotes an absent node."
        }
      }
    ]
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
    "methods": [
      {
        "key": "all-starts",
        "name": {
          "zh": "枚举每个起点",
          "en": "Enumerate every starting node"
        },
        "intuition": {
          "zh": "先固定起点，向下累加可以枚举以它开始的全部路径；再把每个节点都当起点。值可以为负，因此当前和超过目标也不能剪枝；匹配后仍需继续向下寻找更长匹配。\n\n每条合法路径有唯一的起点与终点。外层唯一选中起点，内层唯一走到终点，因此不重不漏。",
          "en": "Fix a starting node and explore every downward endpoint, then repeat for all starts. Negative values forbid pruning when the sum exceeds the target; even after a match, longer matching paths may exist. Every valid path has a unique start and end. The outer traversal selects its start once and the inner traversal reaches its end once."
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
        "time": "O(n²) worst case",
        "space": "O(h)",
        "complexity": {
          "zh": "链形树重复扫描子树导致平方时间。Java 剩余和使用 long，因路径总和可能超出 int；当前同时存在的调用栈 O(h)。 实际递归受 Python 递归深度和 Java 线程栈限制；提高 Python 深度不会消除内存开销，极深输入优先用显式栈。 这是便于对比的基准解法，大规模最坏输入可能超时。",
          "en": "Repeated scans are quadratic on a chain. Java uses long for remaining sums because path totals can exceed int; concurrent stack depth is O(h). Actual recursion is limited by Python recursion depth and the Java thread stack; raising Python’s limit does not remove memory costs. Prefer an explicit stack for extreme depth. This comparison baseline may time out on large worst-case inputs."
        },
        "python": "import sys\nclass Solution:\n    def pathSum(self, root, targetSum):\n        sys.setrecursionlimit(max(sys.getrecursionlimit(),5000))\n        def start(n,remaining):\n            if n is None:return 0\n            remaining-=n.val\n            return int(remaining==0)+start(n.left,remaining)+start(n.right,remaining)\n        def visit(n):\n            if n is None:return 0\n            return start(n,targetSum)+visit(n.left)+visit(n.right)\n        return visit(root)\n",
        "java": "import java.util.*;\nclass Solution  {\n    public int pathSum(TreeNode root,int targetSum) {\n        return visit(root,targetSum);\n    }\n    private int visit(TreeNode n,long target) {\n        return n==null?0:start(n,target)+visit(n.left,target)+visit(n.right,target);\n    }\n    private int start(TreeNode n,long remaining) {\n        if(n==null)return 0;\n        remaining-=n.val;\n        return (remaining==0?1:0)+start(n.left,remaining)+start(n.right,remaining);\n    }\n}\n",
        "algorithmNotes": {
          "zh": "每个节点都可以是路径起点，固定起点后沿孩子方向累加路径和。命中目标也要继续向下，因为零或负数可能产生更多合法路径；随后换下一个起点，不允许路径向上折返。",
          "en": "Try every node as a start and accumulate sums downward. Continue after a match because zero or negative values may produce more matching extensions; then try another start, never turning upward within a path."
        }
      },
      {
        "key": "prefix",
        "name": {
          "zh": "前缀和计数 + 回溯撤销",
          "en": "Prefix counts with rollback"
        },
        "intuition": {
          "zh": "在当前根到节点的路径上，sum−oldPrefix=target 表示一条合法向下路径。用频次表一次性计数所有起点。表里只能保留当前祖先路径：退出节点必须撤销，否则会把兄弟分支拼成不存在的路径。\n\n查询时表中仅含当前节点之前的祖先前缀，故每次命中恰好对应一条非空向下路径；撤销维持该不变量。",
          "en": "Along the active root-to-node path, sum−oldPrefix=target identifies a valid downward path. A frequency map counts all possible starts at once. Remove a prefix when leaving its node so sibling branches never combine into nonexistent paths. At query time the map contains only ancestor prefixes before the current node, so every match is a nonempty downward path. Rollback preserves this invariant across branches."
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
        "time": "O(n) expected",
        "space": "O(h)",
        "complexity": {
          "zh": "每节点常数次哈希操作；删除零频次键使表只保存当前路径 O(h)，递归也是 O(h)。Java 前缀使用 long。 实际递归受 Python 递归深度和 Java 线程栈限制；提高 Python 深度不会消除内存开销，极深输入优先用显式栈。",
          "en": "Constant expected hash work per node. Deleting zero-count keys bounds the map to O(h), matching stack space. Java prefix sums use long. Actual recursion is limited by Python recursion depth and the Java thread stack; raising Python’s limit does not remove memory costs. Prefer an explicit stack for extreme depth."
        },
        "python": "import sys\nclass Solution:\n    def pathSum(self, root, targetSum):\n        sys.setrecursionlimit(max(sys.getrecursionlimit(),5000))\n        counts={0:1}\n        def visit(n,total):\n            if n is None:return 0\n            total+=n.val\n            answer=counts.get(total-targetSum,0)\n            counts[total]=counts.get(total,0)+1\n            answer+=visit(n.left,total)+visit(n.right,total)\n            counts[total]-=1\n            if counts[total]==0:del counts[total]\n            return answer\n        return visit(root,0)\n",
        "java": "import java.util.*;\nclass Solution  {\n    public int pathSum(TreeNode root,int targetSum) {\n        Map<Long,Integer>counts=new HashMap<>();\n        counts.put(0L,1);\n        return visit(root,0L,targetSum,counts);\n    }\n    private int visit(TreeNode n,long total,int target,Map<Long,Integer>c) {\n        if(n==null)return 0;\n        total+=n.val;\n        int a=c.getOrDefault(total-target,0);\n        c.put(total,c.getOrDefault(total,0)+1);\n        a+=visit(n.left,total,target,c)+visit(n.right,total,target,c);\n        int left=c.get(total)-1;\n        if(left==0)c.remove(total);\n        else c.put(total,left);\n        return a;\n    }\n}\n",
        "algorithmNotes": {
          "zh": "频次表只描述从根到当前节点这条路径上的前缀和，初始放入 0 的一次出现。进入节点先查询 sum−target 再加入 sum；离开节点时减回一次，防止兄弟分支之间被错误拼接。",
          "en": "The frequency map contains prefix sums only on the current root-to-node path, initially including zero once. Query sum−target before adding sum, then decrement on exit so unrelated sibling branches cannot form a false path."
        }
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
    },
    "examples": [
      {
        "input": "root = [1,-1,1,1], targetSum = 1",
        "output": "4",
        "note": {
          "zh": "树使用层序数组表示，null 表示该位置没有节点。",
          "en": "Trees use level-order arrays; null denotes an absent node."
        }
      },
      {
        "input": "root = [0,0,0], targetSum = 0",
        "output": "5",
        "note": {
          "zh": "树使用层序数组表示，null 表示该位置没有节点。",
          "en": "Trees use level-order arrays; null denotes an absent node."
        }
      },
      {
        "input": "root = [], targetSum = 0",
        "output": "0",
        "note": {
          "zh": "树使用层序数组表示，null 表示该位置没有节点。",
          "en": "Trees use level-order arrays; null denotes an absent node."
        }
      }
    ]
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
    "methods": [
      {
        "key": "parents",
        "name": {
          "zh": "父指针表 + 祖先集合",
          "en": "Parent map and ancestor set"
        },
        "intuition": {
          "zh": "树只能向下走，先用遍历记录每个节点的父亲，就能向上追溯。将 p 的全部祖先放入集合，再从 q 往上寻找第一个命中者；它比后续公共祖先都更深。\n\n祖先集合包含且仅包含 p 的祖先。q 从下到上首个命中满足共同祖先条件且深度最大。",
          "en": "Record parent references to enable upward movement. Store all ancestors of p, then walk upward from q until the first match. That match is deeper than any later common ancestor. The set contains exactly p’s ancestors. The first hit while ascending from q is common and has the greatest possible depth."
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
        "time": "O(n) expected",
        "space": "O(n)",
        "complexity": {
          "zh": "建父表 O(n)，两次上溯 O(h)；哈希表和集合最多 O(n)。无递归深度风险。",
          "en": "Building parents is O(n), ascending is O(h), and maps/sets take O(n). No recursive depth risk is introduced."
        },
        "python": "class Solution:\n    def lowestCommonAncestor(self, root, p, q):\n        parent={root:None};stack=[root]\n        while stack:\n            n=stack.pop()\n            for child in (n.left,n.right):\n                if child:parent[child]=n;stack.append(child)\n        ancestors=set()\n        while p is not None:ancestors.add(p);p=parent[p]\n        while q not in ancestors:q=parent[q]\n        return q\n",
        "java": "import java.util.*;\nclass Solution  {\n    public TreeNode lowestCommonAncestor(TreeNode root,TreeNode p,TreeNode q) {\n        Map<TreeNode,TreeNode>parent=new IdentityHashMap<>();\n        Deque<TreeNode>s=new ArrayDeque<>();\n        parent.put(root,null);\n        s.push(root);\n        while(!s.isEmpty()) {\n            TreeNode n=s.pop();\n            if(n.left!=null) {\n                parent.put(n.left,n);\n                s.push(n.left);\n            }\n            if(n.right!=null) {\n                parent.put(n.right,n);\n                s.push(n.right);\n            }\n        }\n        Set<TreeNode>a=Collections.newSetFromMap(new IdentityHashMap<TreeNode,Boolean>());\n        while(p!=null) {\n            a.add(p);\n            p=parent.get(p);\n        }\n        while(!a.contains(q))q=parent.get(q);\n        return q;\n    }\n}\n",
        "algorithmNotes": {
          "zh": "遍历树建立每个节点到父节点的映射，再从 p 逐级向上保存所有祖先。让 q 同样向上移动，第一个进入祖先集合的节点就是最近公共祖先；p 或 q 自身也算祖先。",
          "en": "Build parent links, then collect p and every ancestor of p. Walk upward from q until first reaching that set; that node is the lowest common ancestor, with either target allowed to be its own ancestor."
        }
      },
      {
        "key": "postorder",
        "name": {
          "zh": "后序汇合目标",
          "en": "Postorder target convergence"
        },
        "intuition": {
          "zh": "子树向父节点报告有没有目标：空代表没有，非空代表某个目标或已经找到的祖先。如果左右都报告非空，两目标在两侧汇合于当前节点。若当前就是 p 或 q 可直接返回自身，因为题目保证另一目标存在。\n\n目标在不同子树时首次汇合点最低；目标互为祖先时祖先目标本身就是答案。存在性保证使这两种情况覆盖所有输入。",
          "en": "A subtree returns null for no target or a node representing a target or an already found ancestor. Two nonnull child reports converge at the current node. A target node can return immediately because the problem guarantees both targets exist. Separate targets first converge at their lowest shared node; if one target is an ancestor, that target is the answer. Guaranteed existence makes these cases exhaustive."
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
        "time": "O(n)",
        "space": "O(h)",
        "complexity": {
          "zh": "最坏扫描整树；递归深度 h，可能达到 10⁵。此法用于理解递归，深链输入建议用父指针迭代法，避免运行时栈限制。 实际递归受 Python 递归深度和 Java 线程栈限制；提高 Python 深度不会消除内存开销，极深输入优先用显式栈。",
          "en": "Worst case visits the entire tree with h call frames, potentially 10⁵. Use the iterative parent-map method for deep chains to avoid runtime stack limits. Actual recursion is limited by Python recursion depth and the Java thread stack; raising Python’s limit does not remove memory costs. Prefer an explicit stack for extreme depth."
        },
        "python": "import sys\nclass Solution:\n    def lowestCommonAncestor(self, root, p, q):\n        sys.setrecursionlimit(max(sys.getrecursionlimit(),300000))\n        def visit(n):\n            if n is None or n is p or n is q:return n\n            left,right=visit(n.left),visit(n.right)\n            if left and right:return n\n            return left or right\n        return visit(root)\n",
        "java": "import java.util.*;\nclass Solution  {\n    public TreeNode lowestCommonAncestor(TreeNode root,TreeNode p,TreeNode q) {\n        if(root==null||root==p||root==q)return root;\n        TreeNode l=lowestCommonAncestor(root.left,p,q),r=lowestCommonAncestor(root.right,p,q);\n        if(l!=null&&r!=null)return root;\n        return l!=null?l:r;\n    }\n}\n",
        "algorithmNotes": {
          "zh": "遇到 p 或 q 直接把该节点向上返回，空节点返回空。左右递归都返回非空时，当前节点把两个目标分开，是公共祖先；只有一侧非空时把那一侧的结果继续向上传。",
          "en": "Return a target immediately and null for an empty subtree. If both child calls return nonnull, the current node separates the targets and is their ancestor; if only one succeeds, propagate that result upward."
        }
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
    },
    "examples": [
      {
        "input": "root = [5,2,8,1,3], p = 2, q = 1",
        "output": "2",
        "note": {
          "zh": "p、q 以节点值标识，实际传入的是树中对应节点。输出为最近公共祖先的值。",
          "en": "p and q identify node values; the actual arguments are the corresponding tree nodes. Output shows the ancestor’s value."
        }
      },
      {
        "input": "root = [5,2,8,1,3], p = 2, q = 8",
        "output": "5",
        "note": {
          "zh": "p、q 以节点值标识，实际传入的是树中对应节点。输出为最近公共祖先的值。",
          "en": "p and q identify node values; the actual arguments are the corresponding tree nodes. Output shows the ancestor’s value."
        }
      },
      {
        "input": "root = [2,1], p = 2, q = 1",
        "output": "2",
        "note": {
          "zh": "p、q 以节点值标识，实际传入的是树中对应节点。输出为最近公共祖先的值。",
          "en": "p and q identify node values; the actual arguments are the corresponding tree nodes. Output shows the ancestor’s value."
        }
      }
    ]
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
    "methods": [
      {
        "key": "recompute",
        "name": {
          "zh": "枚举转折点重算贡献",
          "en": "Recompute branch gains per pivot"
        },
        "intuition": {
          "zh": "一条路径在最高节点可以连接左右两支，但向父节点延伸时只能带一支，否则会分叉。负贡献应舍弃为 0，完整答案却不能取空路径。先对每个转折点单独计算左右最佳单支，作为理解基准。\n\n任意简单路径都有唯一最高节点，其左右部分均可由最佳非负单支替换而不变差。枚举这些最高节点覆盖所有最优路径；负无穷初值保留全负树的非空答案。",
          "en": "At its highest node a path may join two branches, but a contribution passed to the parent may include only one. Drop negative branches to zero, but never allow an empty overall path. The baseline independently recomputes both branch gains for each pivot. Every simple path has a unique highest node. Replacing each side by its best nonnegative gain cannot hurt, so all pivots cover the optimum. Negative-infinity initialization preserves a valid answer for all-negative trees."
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
        "time": "O(n²) worst case",
        "space": "O(h)",
        "complexity": {
          "zh": "链状树各转折点重算后代，最坏平方时间；栈深 O(h)。此基准用于比较，大输入用一次后序法。 实际递归受 Python 递归深度和 Java 线程栈限制；提高 Python 深度不会消除内存开销，极深输入优先用显式栈。 这是便于对比的基准解法，大规模最坏输入可能超时。",
          "en": "On a chain, repeated descendant scans give quadratic time and O(h) stack depth. This baseline is for comparison; use one-pass postorder for large inputs. Actual recursion is limited by Python recursion depth and the Java thread stack; raising Python’s limit does not remove memory costs. Prefer an explicit stack for extreme depth. This comparison baseline may time out on large worst-case inputs."
        },
        "python": "import sys\nclass Solution:\n    def maxPathSum(self, root):\n        sys.setrecursionlimit(max(sys.getrecursionlimit(),100000))\n        def gain(n):\n            if n is None:return 0\n            return n.val+max(0,gain(n.left),gain(n.right))\n        def solve(n):\n            if n is None:return float('-inf')\n            candidate=n.val+max(0,gain(n.left))+max(0,gain(n.right))\n            return max(candidate,solve(n.left),solve(n.right))\n        return solve(root)\n",
        "java": "import java.util.*;\nclass Solution  {\n    private int gain(TreeNode n) {\n        return n==null?0:n.val+Math.max(0,Math.max(gain(n.left),gain(n.right)));\n    }\n    public int maxPathSum(TreeNode n) {\n        if(n==null)return Integer.MIN_VALUE;\n        int c=n.val+Math.max(0,gain(n.left))+Math.max(0,gain(n.right));\n        return Math.max(c,Math.max(maxPathSum(n.left),maxPathSum(n.right)));\n    }\n}\n",
        "algorithmNotes": {
          "zh": "对每个候选转折点分别求左右子树可提供的最大向下贡献，负贡献按 0 丢弃。候选路径包含当前值和两侧贡献；答案必须允许负数，才能在全负树中返回最大的单个节点。",
          "en": "At each possible turning point, recompute the best downward contribution from each child and discard negative contributions. Combine them with the current value, initializing the answer to allow negative values so an all-negative tree selects one node."
        }
      },
      {
        "key": "postorder",
        "name": {
          "zh": "后序单支贡献",
          "en": "Postorder branch gains"
        },
        "intuition": {
          "zh": "一条路径在最高节点可以连接左右两支，但向父节点延伸时只能带一支，否则会分叉。负贡献应舍弃为 0，完整答案却不能取空路径。一次后序同时返回单支贡献并更新完整路径答案，消除重复。\n\n任意简单路径都有唯一最高节点，其左右部分均可由最佳非负单支替换而不变差。枚举这些最高节点覆盖所有最优路径；负无穷初值保留全负树的非空答案。",
          "en": "At its highest node a path may join two branches, but a contribution passed to the parent may include only one. Drop negative branches to zero, but never allow an empty overall path. One postorder pass returns a branch gain and updates the complete-path answer. Every simple path has a unique highest node. Replacing each side by its best nonnegative gain cannot hurt, so all pivots cover the optimum. Negative-infinity initialization preserves a valid answer for all-negative trees."
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
        "time": "O(n)",
        "space": "O(h)",
        "complexity": {
          "zh": "一次后序每节点常数工作，栈 O(h)。递归可能受深链栈限制；可用显式后序栈实现同样状态转移。 实际递归受 Python 递归深度和 Java 线程栈限制；提高 Python 深度不会消除内存开销，极深输入优先用显式栈。",
          "en": "One postorder visit does constant work per node and uses O(h) frames. An explicit postorder stack avoids deep-call-stack limits. Actual recursion is limited by Python recursion depth and the Java thread stack; raising Python’s limit does not remove memory costs. Prefer an explicit stack for extreme depth."
        },
        "python": "import sys\nclass Solution:\n    def maxPathSum(self, root):\n        sys.setrecursionlimit(max(sys.getrecursionlimit(),100000))\n        answer=float('-inf')\n        def gain(n):\n            nonlocal answer\n            if n is None:return 0\n            l=max(0,gain(n.left));r=max(0,gain(n.right))\n            answer=max(answer,n.val+l+r)\n            return n.val+max(l,r)\n        gain(root)\n        return answer\n",
        "java": "import java.util.*;\nclass Solution  {\n    private int answer;\n    public int maxPathSum(TreeNode root) {\n        answer=Integer.MIN_VALUE;\n        gain(root);\n        return answer;\n    }\n    private int gain(TreeNode n) {\n        if(n==null)return 0;\n        int l=Math.max(0,gain(n.left)),r=Math.max(0,gain(n.right));\n        answer=Math.max(answer,n.val+l+r);\n        return n.val+Math.max(l,r);\n    }\n}\n",
        "algorithmNotes": {
          "zh": "递归返回值只允许选择一侧向下延伸，表示能接到父节点的贡献。全局答案则在当前节点尝试左右两侧同时连接；这两个量分开维护，才能避免向父节点传递发生分叉的路径。",
          "en": "Return a contribution extending through at most one child so it can attach to the parent. Separately update the global answer with both child contributions through the current node, preventing a branched path from being propagated upward."
        }
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
    },
    "examples": [
      {
        "input": "root = [-5,4,8,null,null,-2,3]",
        "output": "11",
        "note": {
          "zh": "树使用层序数组表示，null 表示该位置没有节点。",
          "en": "Trees use level-order arrays; null denotes an absent node."
        }
      },
      {
        "input": "root = [-3]",
        "output": "-3",
        "note": {
          "zh": "树使用层序数组表示，null 表示该位置没有节点。",
          "en": "Trees use level-order arrays; null denotes an absent node."
        }
      },
      {
        "input": "root = [1,2,3]",
        "output": "6",
        "note": {
          "zh": "树使用层序数组表示，null 表示该位置没有节点。",
          "en": "Trees use level-order arrays; null denotes an absent node."
        }
      }
    ]
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
    "methods": [
      {
        "key": "dfs-stack",
        "name": {
          "zh": "显式栈深度优先洪泛",
          "en": "Stack-based flood fill"
        },
        "intuition": {
          "zh": "不要逐格判断岛屿形状，而是把一座岛整体消费掉。扫描到尚未标记的陆地，说明发现了一个新的连通块；工作表负责找到这块陆地的所有邻居。入表时立即改成水，防止同一格被两个邻居重复加入。栈优先沿一条路线深入，使用显式栈避免 Python 深递归限制。\n\n每次洪泛只经过陆地邻接边，且会继续处理每个新发现的格子，因此恰好覆盖一个连通块。扫描为每个连通块启动一次洪泛，所以计数不漏不重。",
          "en": "Treat an island as one unit. An unmarked land cell starts a new component, and a worklist discovers every reachable neighbor. Mark a cell when adding it, so two neighbors cannot enqueue it twice. A stack follows one route deeply without relying on Python recursion. Flood fill stays within land edges and expands every discovered cell, so it visits exactly one component. Each component starts exactly one fill."
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
        "time": "O(mn)",
        "space": "O(mn)",
        "complexity": {
          "zh": "每格最多入表一次，每次检查四邻居；工作表最坏存储 O(mn) 个位置。原地标记省去 visited，但工作表仍需空间。",
          "en": "Each cell enters once and checks four neighbors. The worklist can occupy O(mn); in-place marking removes a visited array, not the worklist."
        },
        "python": "from typing import List\nfrom collections import deque\nclass Solution:\n    def numIslands(self, grid: List[List[str]]) -> int:\n        m, n, count = len(grid), len(grid[0]), 0\n        for r in range(m):\n            for c in range(n):\n                if grid[r][c] != '1': continue\n                count += 1\n                grid[r][c] = '0'\n                work = deque([(r,c)])\n                while work:\n                    x,y = work.pop()\n                    for dx,dy in ((1,0),(-1,0),(0,1),(0,-1)):\n                        a,b = x+dx,y+dy\n                        if 0 <= a < m and 0 <= b < n and grid[a][b] == '1':\n                            grid[a][b] = '0'\n                            work.append((a,b))\n        return count",
        "java": "import java.util.*;\nclass Solution {\n    public int numIslands(char[][] grid) {\n        int m=grid.length,n=grid[0].length,count=0;\n        int[] d={1,0,-1,0,1};\n        Deque<int[]> work=new ArrayDeque<>();\n        for(int r=0;r<m;r++) for(int c=0;c<n;c++) {\n            if(grid[r][c]!='1') continue;\n            count++; grid[r][c]='0'; work.addLast(new int[]{r,c});\n            while(!work.isEmpty()) {\n                int[] v=work.removeLast();\n                for(int k=0;k<4;k++) {\n                    int a=v[0]+d[k],b=v[1]+d[k+1];\n                    if(a>=0 && a<m && b>=0 && b<n && grid[a][b]=='1') {\n                        grid[a][b]='0'; work.addLast(new int[]{a,b});\n                    }\n                }\n            }\n        }\n        return count;\n    }\n}",
        "algorithmNotes": {
          "zh": "扫描到陆地才开始一座新岛，并立即标记已访问后压栈。每次弹出后检查上下左右四邻格，陆地在入栈前就标记，避免被多个邻居重复压入；斜对角不算相连。",
          "en": "Start a new island only at unvisited land and mark it before pushing. Explore four orthogonal neighbors, marking each before adding it so multiple neighbors cannot schedule it twice; diagonals do not connect islands."
        }
      },
      {
        "key": "bfs",
        "name": {
          "zh": "队列广度优先洪泛",
          "en": "Queue-based flood fill"
        },
        "intuition": {
          "zh": "不要逐格判断岛屿形状，而是把一座岛整体消费掉。扫描到尚未标记的陆地，说明发现了一个新的连通块；工作表负责找到这块陆地的所有邻居。入表时立即改成水，防止同一格被两个邻居重复加入。队列按距离扩展，队列清空表示整座岛已处理。\n\n每次洪泛只经过陆地邻接边，且会继续处理每个新发现的格子，因此恰好覆盖一个连通块。扫描为每个连通块启动一次洪泛，所以计数不漏不重。",
          "en": "Treat an island as one unit. An unmarked land cell starts a new component, and a worklist discovers every reachable neighbor. Mark a cell when adding it, so two neighbors cannot enqueue it twice. A queue expands by distance until the island is exhausted. Flood fill stays within land edges and expands every discovered cell, so it visits exactly one component. Each component starts exactly one fill."
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
        "time": "O(mn)",
        "space": "O(mn)",
        "complexity": {
          "zh": "每格最多入表一次，每次检查四邻居；工作表最坏存储 O(mn) 个位置。原地标记省去 visited，但工作表仍需空间。",
          "en": "Each cell enters once and checks four neighbors. The worklist can occupy O(mn); in-place marking removes a visited array, not the worklist."
        },
        "python": "from typing import List\nfrom collections import deque\nclass Solution:\n    def numIslands(self, grid: List[List[str]]) -> int:\n        m, n, count = len(grid), len(grid[0]), 0\n        for r in range(m):\n            for c in range(n):\n                if grid[r][c] != '1': continue\n                count += 1\n                grid[r][c] = '0'\n                work = deque([(r,c)])\n                while work:\n                    x,y = work.popleft()\n                    for dx,dy in ((1,0),(-1,0),(0,1),(0,-1)):\n                        a,b = x+dx,y+dy\n                        if 0 <= a < m and 0 <= b < n and grid[a][b] == '1':\n                            grid[a][b] = '0'\n                            work.append((a,b))\n        return count",
        "java": "import java.util.*;\nclass Solution {\n    public int numIslands(char[][] grid) {\n        int m=grid.length,n=grid[0].length,count=0;\n        int[] d={1,0,-1,0,1};\n        Deque<int[]> work=new ArrayDeque<>();\n        for(int r=0;r<m;r++) for(int c=0;c<n;c++) {\n            if(grid[r][c]!='1') continue;\n            count++; grid[r][c]='0'; work.addLast(new int[]{r,c});\n            while(!work.isEmpty()) {\n                int[] v=work.removeFirst();\n                for(int k=0;k<4;k++) {\n                    int a=v[0]+d[k],b=v[1]+d[k+1];\n                    if(a>=0 && a<m && b>=0 && b<n && grid[a][b]=='1') {\n                        grid[a][b]='0'; work.addLast(new int[]{a,b});\n                    }\n                }\n            }\n        }\n        return count;\n    }\n}",
        "algorithmNotes": {
          "zh": "一遇到未访问陆地就把岛屿数加一，随后用队列清空整块连通陆地。邻居在入队时标记，而非出队时才标记；这保证每个格子只入队一次，直到队列耗尽再继续外层扫描。",
          "en": "Increment the island count when discovering unvisited land, then exhaust its whole component with a queue. Mark neighbors when enqueuing rather than dequeuing so each cell enters once, then resume the outer scan."
        }
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
    },
    "examples": [
      {
        "input": "grid = [[\"1\",\"1\",\"0\"],[\"0\",\"1\",\"0\"],[\"0\",\"0\",\"1\"]]",
        "output": "2"
      },
      {
        "input": "grid = [[\"0\"]]",
        "output": "0"
      },
      {
        "input": "grid = [[\"1\"]]",
        "output": "1"
      }
    ]
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
    "methods": [
      {
        "key": "multi-source-bfs",
        "name": {
          "zh": "多源 BFS 按分钟推进",
          "en": "Multi-source BFS by minute"
        },
        "intuition": {
          "zh": "单个橘子依次传播会漏掉“同时发生”的语义。把全部初始腐烂位置作为第 0 层，下一层才是第 1 分钟感染的位置。维护 fresh 可以在最后一次有效传播后直接停止，避免把最后空转的一轮也算进分钟。\n\nBFS 第 t 层恰好是到最近腐烂源的可达最短距离为 t 的橘子，因此层数与同步感染时间一致。空位不入队，不可达的新鲜橘子不会被误计为感染。",
          "en": "Separate simultaneous events into layers. All initially rotten cells belong to layer zero; their fresh neighbors form minute one. Tracking fresh oranges stops the process after the final useful layer instead of counting an extra empty minute. Layer t contains oranges at shortest reachable distance t from any source. Those are exactly the cells infected at minute t. Empty cells block propagation."
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
        "time": "O(mn)",
        "space": "O(mn)",
        "complexity": {
          "zh": "初始扫描和每格至多一次入队均为 O(mn)；队列最坏 O(mn)。代码原地修改网格。",
          "en": "Initial scanning plus one enqueue per cell is O(mn). The queue needs O(mn) worst-case space. The grid is mutated."
        },
        "python": "from typing import List\nfrom collections import deque\nclass Solution:\n    def orangesRotting(self, grid: List[List[int]]) -> int:\n        m,n=len(grid),len(grid[0]); q=deque(); fresh=0; minutes=0\n        for r in range(m):\n            for c in range(n):\n                if grid[r][c]==2: q.append((r,c))\n                elif grid[r][c]==1: fresh+=1\n        while q and fresh:\n            for _ in range(len(q)):\n                r,c=q.popleft()\n                for dr,dc in ((1,0),(-1,0),(0,1),(0,-1)):\n                    a,b=r+dr,c+dc\n                    if 0<=a<m and 0<=b<n and grid[a][b]==1:\n                        grid[a][b]=2; fresh-=1; q.append((a,b))\n            minutes+=1\n        return minutes if fresh==0 else -1",
        "java": "import java.util.*;\nclass Solution {\n    public int orangesRotting(int[][] grid) {\n        int m=grid.length,n=grid[0].length,fresh=0,minutes=0;\n        int[] d={1,0,-1,0,1}; Deque<int[]> q=new ArrayDeque<>();\n        for(int r=0;r<m;r++) for(int c=0;c<n;c++) {\n            if(grid[r][c]==2) q.addLast(new int[]{r,c});\n            else if(grid[r][c]==1) fresh++;\n        }\n        while(!q.isEmpty() && fresh>0) {\n            int size=q.size();\n            while(size-->0) {\n                int[] v=q.removeFirst();\n                for(int k=0;k<4;k++) {\n                    int a=v[0]+d[k],b=v[1]+d[k+1];\n                    if(a>=0 && a<m && b>=0 && b<n && grid[a][b]==1) {\n                        grid[a][b]=2; fresh--; q.addLast(new int[]{a,b});\n                    }\n                }\n            }\n            minutes++;\n        }\n        return fresh==0 ? minutes : -1;\n    }\n}",
        "algorithmNotes": {
          "zh": "所有初始腐烂橘子同时入队，并另计新鲜橘子总数。每轮只处理当前层，让相邻新鲜橘子变腐并减计数；无新鲜时答案为 0，传播结束仍有新鲜则返回 −1。",
          "en": "Enqueue all initially rotten oranges together and count fresh ones separately. Each round processes one layer, rotting adjacent fresh oranges and decrementing that count; return zero if none were fresh and −1 if some remain unreachable."
        }
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
    },
    "examples": [
      {
        "input": "grid = [[2,1,1],[0,1,0]]",
        "output": "2"
      },
      {
        "input": "grid = [[1]]",
        "output": "-1"
      },
      {
        "input": "grid = [[0,2]]",
        "output": "0"
      }
    ]
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
    "methods": [
      {
        "key": "kahn",
        "name": {
          "zh": "入度消除 / Kahn 拓扑排序",
          "en": "Indegree elimination / Kahn ordering"
        },
        "intuition": {
          "zh": "把“还有几门先修课没完成”存为入度。入度为 0 的课程可以立即学习；完成它等价于删除它的出边。若还有环，环内每门课始终等待另一门课，因此无法进入队列。这个模型也自然处理多条互不相连的依赖链。\n\n队列中的课程没有尚未完成的先修课，所以每一步均合法。若未处理节点仍存在却无零入度节点，沿其先修边不断追溯必重复节点，形成环，无法完成。",
          "en": "Store how many prerequisites remain as each course’s indegree. Zero-indegree courses are ready; finishing one removes its outgoing dependencies. A directed cycle can never unlock its first course, even if unrelated chains finish successfully. Every queued course is legal to take. If unprocessed courses remain with no zero indegree, repeatedly following a remaining prerequisite eventually repeats a vertex, proving a cycle."
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
        "time": "O(V+E)",
        "space": "O(V+E)",
        "complexity": {
          "zh": "V 为课程数，E 为依赖数。每个顶点入队一次、每条边减少一次入度；邻接表保存 V+E 个条目，队列与入度数组 O(V)。",
          "en": "V courses and E edges are processed once. Adjacency storage is O(V+E); queue and indegrees use O(V)."
        },
        "python": "from typing import List\nfrom collections import deque\nclass Solution:\n    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:\n        graph=[[] for _ in range(numCourses)]; degree=[0]*numCourses\n        for a,b in prerequisites: graph[b].append(a); degree[a]+=1\n        q=deque(i for i in range(numCourses) if degree[i]==0); done=0\n        while q:\n            v=q.popleft(); done+=1\n            for w in graph[v]:\n                degree[w]-=1\n                if degree[w]==0: q.append(w)\n        return done==numCourses",
        "java": "import java.util.*;\nclass Solution {\n    public boolean canFinish(int numCourses, int[][] prerequisites) {\n        List<List<Integer>> graph=new ArrayList<>();\n        for(int i=0;i<numCourses;i++) graph.add(new ArrayList<>());\n        int[] degree=new int[numCourses];\n        for(int[] e:prerequisites) {graph.get(e[1]).add(e[0]);degree[e[0]]++;}\n        Deque<Integer> q=new ArrayDeque<>();\n        for(int i=0;i<numCourses;i++) if(degree[i]==0) q.add(i);\n        int done=0;\n        while(!q.isEmpty()) {\n            int v=q.remove();done++;\n            for(int w:graph.get(v)) if(--degree[w]==0) q.add(w);\n        }\n        return done==numCourses;\n    }\n}",
        "algorithmNotes": {
          "zh": "先修边 b→a 表示先完成 b 才能学 a，入度是尚未满足的先修数量。所有入度为 0 的课程入队，完成后递减后继入度；最终完成数等于课程总数才说明没有环。",
          "en": "An edge b→a means b must precede a, and indegree counts unmet prerequisites. Queue all zero-indegree courses and decrement their successors when completed; all courses must be processed for the graph to be acyclic."
        }
      },
      {
        "key": "three-color-dfs",
        "name": {
          "zh": "显式栈三色 DFS 判环",
          "en": "Iterative three-color cycle detection"
        },
        "intuition": {
          "zh": "拓扑排序从可学习课程出发，DFS 则沿依赖链追问是否会回到自己。用 0=未发现、1=当前路径中、2=已处理区分三种状态：只有遇到 1 才是环，遇到 2 只是复用已检查的子图。显式栈还记录每个节点下一个要探索的邻居，避免长链导致 Python 递归深度超限。\n\n栈中的节点构成一条 DFS 路径，指向标记 1 的边与该路径一起组成有向环。没有这样的边时，每个节点的后继均能完成，再将自身完成，所以整个图无环。",
          "en": "Instead of removing ready courses, follow dependency paths and detect a return to the active path. Colors are 0 undiscovered, 1 active and 2 completed. Only an edge to color 1 proves a cycle; color 2 is a previously checked subgraph. Store the next neighbor index in an explicit stack to avoid Python recursion limits on long chains. Active frames form a DFS path, so an edge back to an active vertex closes a directed cycle. Without such edges, each vertex completes after its successors, proving the graph acyclic."
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
        "time": "O(V+E)",
        "space": "O(V+E)",
        "complexity": {
          "zh": "每个节点只入栈一次，每条边只由对应帧扫描一次。邻接表 O(V+E)，颜色数组与显式栈 O(V)；没有语言调用栈深度限制。",
          "en": "Each vertex is pushed once and each edge is scanned once. Adjacency takes O(V+E), colors and frames O(V), without language recursion-depth limits."
        },
        "python": "from typing import List\nclass Solution:\n    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:\n        graph=[[] for _ in range(numCourses)]\n        for a,b in prerequisites: graph[b].append(a)\n        color=[0]*numCourses\n        for start in range(numCourses):\n            if color[start]: continue\n            color[start]=1; stack=[[start,0]]\n            while stack:\n                v,i=stack[-1]\n                if i==len(graph[v]):\n                    color[v]=2; stack.pop(); continue\n                w=graph[v][i]; stack[-1][1]+=1\n                if color[w]==1: return False\n                if color[w]==0:\n                    color[w]=1; stack.append([w,0])\n        return True",
        "java": "import java.util.*;\nclass Solution {\n    public boolean canFinish(int numCourses,int[][] prerequisites) {\n        List<List<Integer>> graph=new ArrayList<>();\n        for(int i=0;i<numCourses;i++) graph.add(new ArrayList<>());\n        for(int[] e:prerequisites) graph.get(e[1]).add(e[0]);\n        int[] color=new int[numCourses];Deque<int[]> stack=new ArrayDeque<>();\n        for(int start=0;start<numCourses;start++) {\n            if(color[start]!=0) continue;\n            color[start]=1;stack.push(new int[]{start,0});\n            while(!stack.isEmpty()) {\n                int[] f=stack.peek();int v=f[0];\n                if(f[1]==graph.get(v).size()) {color[v]=2;stack.pop();continue;}\n                int w=graph.get(v).get(f[1]++);\n                if(color[w]==1) return false;\n                if(color[w]==0) {color[w]=1;stack.push(new int[]{w,0});}\n            }\n        }\n        return true;\n    }\n}",
        "algorithmNotes": {
          "zh": "状态分为未访问、当前递归路径中、已完成。遇到“路径中”的后继才表示回边和环；遇到“已完成”可以跳过，因为它的依赖已经检查完，不能把所有访问过的节点都当作环。",
          "en": "Distinguish unvisited, active on the current recursion path, and finished nodes. An edge to an active node reveals a cycle; a finished node is safe to skip because its dependencies were already checked."
        }
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
    },
    "examples": [
      {
        "input": "numCourses = 3, prerequisites = [[1,0],[2,1]]",
        "output": "true"
      },
      {
        "input": "numCourses = 2, prerequisites = [[1,0],[0,1]]",
        "output": "false"
      },
      {
        "input": "numCourses = 1, prerequisites = []",
        "output": "true"
      }
    ]
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
    "methods": [
      {
        "key": "trie",
        "name": {
          "zh": "逐字符前缀树",
          "en": "Character-by-character trie"
        },
        "intuition": {
          "zh": "公共前缀不必重复保存：cat 与 car 共用 c、a 两条边，到最后一个字母才分叉。节点需要一个独立的终止标记，因为路径 ca 存在并不代表 ca 被插入。Python 用字典按需存孩子，Java 用固定 26 项数组，查询过程中都不创建节点。\n\n根到节点的字符序列唯一确定一个前缀。插入恰好补全该路径并标记单词末尾，因此路径存在等价于前缀存在，路径末尾有标记等价于完整单词存在。",
          "en": "Share common prefixes: cat and car reuse the c and a edges before branching. An end flag distinguishes an inserted word from a mere prefix. Python stores only existing children in dictionaries; Java uses 26-entry child arrays. Queries never create nodes. A root-to-node path uniquely identifies its prefix. Insertion creates precisely that path and marks its end; path existence and terminal marking implement the two distinct queries."
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
        "time": "O(L) per operation",
        "space": "O(S) stored; O(1) query auxiliary",
        "complexity": {
          "zh": "L 是操作字符串长度，S 是所有插入单词长度之和。节点数至多 S+1；26 是常数。Python 字典查询采用平均 O(1) 模型；查询和插入的额外游标空间 O(1)。",
          "en": "L is the operation length and S the sum of inserted lengths. There are at most S+1 nodes; 26 is constant. Python dictionary operations are expected O(1). Traversal uses O(1) auxiliary cursor space."
        },
        "python": "class Trie:\n    def __init__(self):\n        self.children = {}\n        self.end = False\n    def insert(self, word: str) -> None:\n        node = self\n        for ch in word:\n            if ch not in node.children: node.children[ch] = Trie()\n            node = node.children[ch]\n        node.end = True\n    def _walk(self, text):\n        node = self\n        for ch in text:\n            if ch not in node.children: return None\n            node = node.children[ch]\n        return node\n    def search(self, word: str) -> bool:\n        node = self._walk(word)\n        return node is not None and node.end\n    def startsWith(self, prefix: str) -> bool:\n        return self._walk(prefix) is not None",
        "java": "class Trie {\n    private final Trie[] children=new Trie[26];\n    private boolean end;\n    public Trie() {}\n    public void insert(String word) {\n        Trie node=this;\n        for(int i=0;i<word.length();i++) {\n            int k=word.charAt(i)-'a';\n            if(node.children[k]==null) node.children[k]=new Trie();\n            node=node.children[k];\n        }\n        node.end=true;\n    }\n    private Trie walk(String s) {\n        Trie node=this;\n        for(int i=0;i<s.length();i++) {\n            node=node.children[s.charAt(i)-'a'];\n            if(node==null) return null;\n        }\n        return node;\n    }\n    public boolean search(String word) {Trie node=walk(word);return node!=null && node.end;}\n    public boolean startsWith(String prefix) {return walk(prefix)!=null;}\n}",
        "algorithmNotes": {
          "zh": "每条边对应一个字符，节点末尾标记区分完整单词和仅有前缀。insert 沿路径补节点并标记结尾；search 既要路径存在也要末尾标记，startsWith 只要求前缀路径存在。",
          "en": "Each edge represents a character, while an end marker distinguishes a complete word from a prefix. Insert creates missing nodes and marks the end; search requires both the path and marker, whereas startsWith requires only the path."
        }
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
    },
    "examples": [
      {
        "input": "operations = [\"Trie\",\"insert\",\"search\",\"search\",\"startsWith\"], arguments = [[],[\"cat\"],[\"cat\"],[\"ca\"],[\"ca\"]]",
        "output": "[null,null,true,false,true]",
        "note": {
          "zh": "输出逐项对应操作；构造和无返回值的操作用 null 表示。",
          "en": "Outputs correspond to operations; constructors and void operations are shown as null."
        }
      },
      {
        "input": "operations = [\"Trie\",\"search\",\"startsWith\"], arguments = [[],[\"dog\"],[\"d\"]]",
        "output": "[null,false,false]",
        "note": {
          "zh": "输出逐项对应操作；构造和无返回值的操作用 null 表示。",
          "en": "Outputs correspond to operations; constructors and void operations are shown as null."
        }
      },
      {
        "input": "operations = [\"Trie\",\"insert\",\"insert\",\"search\"], arguments = [[],[\"a\"],[\"ab\"],[\"a\"]]",
        "output": "[null,null,null,true]",
        "note": {
          "zh": "输出逐项对应操作；构造和无返回值的操作用 null 表示。",
          "en": "Outputs correspond to operations; constructors and void operations are shown as null."
        }
      }
    ]
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
    "methods": [
      {
        "key": "used-backtrack",
        "name": {
          "zh": "已使用标记回溯",
          "en": "Backtracking with used flags"
        },
        "intuition": {
          "zh": "把排列看成依次填写 n 个位置。每个位置可以填任何尚未使用的数；used 表示本条路径的选择，不能跨分支永久占用。到叶子时复制 path，因为后续撤销操作还会改变同一个列表。\n\n任意排列都有唯一的下标选择序列；每层枚举所有合法选择，且 used 禁止重复用元素，因此完整、无重复。",
          "en": "Fill n positions in order. Each position may take any unused value. used belongs to the current path, not all branches. Copy path at a leaf because later backtracking mutates the same list. Every permutation has one unique index-choice sequence. Enumerating all unused choices generates every valid sequence once."
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
        "time": "O(n·n!)",
        "space": "O(n) auxiliary + O(n·n!) output",
        "complexity": {
          "zh": "n! 个结果各复制 n 项；内部节点扫描 n 个候选也被 O(n·n!) 上界覆盖。栈、path 和 used 各 O(n)。",
          "en": "Copying n! results costs O(n·n!). Candidate scans fit the same bound. Stack, path and used each occupy O(n)."
        },
        "python": "from typing import List\nclass Solution:\n    def permute(self, nums: List[int]) -> List[List[int]]:\n        ans=[]; path=[]; used=[False]*len(nums)\n        def dfs():\n            if len(path)==len(nums): ans.append(path.copy()); return\n            for i,x in enumerate(nums):\n                if used[i]: continue\n                used[i]=True; path.append(x)\n                dfs()\n                path.pop(); used[i]=False\n        dfs()\n        return ans",
        "java": "import java.util.*;\nclass Solution {\n    public List<List<Integer>> permute(int[] nums) {\n        List<List<Integer>> ans=new ArrayList<>();\n        dfs(nums,new boolean[nums.length],new ArrayList<>(),ans);return ans;\n    }\n    private void dfs(int[] a,boolean[] used,List<Integer> path,List<List<Integer>> ans) {\n        if(path.size()==a.length) {ans.add(new ArrayList<>(path));return;}\n        for(int i=0;i<a.length;i++) if(!used[i]) {\n            used[i]=true;path.add(a[i]);dfs(a,used,path,ans);\n            path.remove(path.size()-1);used[i]=false;\n        }\n    }\n}",
        "algorithmNotes": {
          "zh": "path 保存当前排列，used 按下标标记已选择元素。每层尝试所有未使用位置，选入后递归，返回时同时弹出 path 并取消 used；长度等于 n 时复制 path，不能保存同一可变列表引用。",
          "en": "path stores the partial permutation and used tracks selected indices. Choose an unused position, recurse, then undo both changes; at length n append a copy of path, not a reference to the mutable working list."
        }
      },
      {
        "key": "swap",
        "name": {
          "zh": "交换法固定前缀",
          "en": "Fix a prefix with swaps"
        },
        "intuition": {
          "zh": "当数组前 k 位已固定时，后面的元素正好都是未使用元素，因此不必再维护 used。把每个候选交换到 k，再递归处理后缀。交换必须恢复，否则下一次选择面对的数组已变化，容易漏解或重解。\n\n每个分支确定第 k 位的一个不同值，子递归枚举剩余值的所有排列。不同分支的第 k 位不同，不可能重复。",
          "en": "Once the first k positions are fixed, the suffix contains exactly the unused values. Swap each candidate into position k and recurse. Undo each swap so sibling branches start from the same arrangement. Branches choose distinct values for position k; recursion enumerates all suffix permutations. Different choices at k cannot produce the same result."
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
        "time": "O(n·n!)",
        "space": "O(n) auxiliary + O(n·n!) output",
        "complexity": {
          "zh": "叶子复制主导时间。递归深度 n，无 used 数组；原数组被临时交换但返回前恢复。",
          "en": "Leaf copying dominates runtime. Recursion depth is n; the input is temporarily swapped but restored before returning."
        },
        "python": "from typing import List\nclass Solution:\n    def permute(self, nums: List[int]) -> List[List[int]]:\n        ans=[]\n        def dfs(k):\n            if k==len(nums): ans.append(nums.copy()); return\n            for i in range(k,len(nums)):\n                nums[k],nums[i]=nums[i],nums[k]\n                dfs(k+1)\n                nums[k],nums[i]=nums[i],nums[k]\n        dfs(0)\n        return ans",
        "java": "import java.util.*;\nclass Solution {\n    public List<List<Integer>> permute(int[] nums) {\n        List<List<Integer>> ans=new ArrayList<>();dfs(nums,0,ans);return ans;\n    }\n    private void dfs(int[] a,int k,List<List<Integer>> ans) {\n        if(k==a.length) {List<Integer> row=new ArrayList<>();for(int x:a) row.add(x);ans.add(row);return;}\n        for(int i=k;i<a.length;i++) {\n            swap(a,k,i);dfs(a,k+1,ans);swap(a,k,i);\n        }\n    }\n    private void swap(int[] a,int i,int j) {int t=a[i];a[i]=a[j];a[j]=t;}\n}",
        "algorithmNotes": {
          "zh": "递归位置 first 之前已经固定，剩余位置都是本层可选候选。把候选交换到 first，再处理 first+1；递归返回必须交换回来，使后续分支从同一数组状态出发。",
          "en": "Positions before first are fixed and every remaining position is a candidate. Swap one candidate into first, recurse on first+1, then swap back so sibling branches start from the same array state."
        }
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
    },
    "examples": [
      {
        "input": "nums = [2,4]",
        "output": "[[2,4],[4,2]]",
        "note": {
          "zh": "这是一个合法输出，题目允许结果按其他合法顺序排列。",
          "en": "This is one valid output; other permitted result orders are accepted."
        }
      },
      {
        "input": "nums = [3]",
        "output": "[[3]]",
        "note": {
          "zh": "这是一个合法输出，题目允许结果按其他合法顺序排列。",
          "en": "This is one valid output; other permitted result orders are accepted."
        }
      },
      {
        "input": "nums = [1,2,3]",
        "output": "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]",
        "note": {
          "zh": "这是一个合法输出，题目允许结果按其他合法顺序排列。",
          "en": "This is one valid output; other permitted result orders are accepted."
        }
      }
    ]
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
    "methods": [
      {
        "key": "include-exclude",
        "name": {
          "zh": "选或不选的决策树",
          "en": "Include-or-exclude recursion"
        },
        "intuition": {
          "zh": "对子集而言，每个数只需做一次二元决定：要或不要。按数组下标向右处理，保证同一组元素不会因为选择顺序不同被重复生成。只有所有元素都决定完才保存 path，空集来自一路“不选”。\n\n每个子集对应唯一的 n 位选取向量，递归树恰好枚举全部这些向量。",
          "en": "A subset makes one binary decision per element. Moving strictly by index prevents duplicates caused by choosing the same elements in different orders. Save only after all decisions; choosing nothing produces the empty subset. Every subset corresponds to one unique n-bit choice vector, all of which appear in the recursion tree."
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
        "time": "O(n·2^n)",
        "space": "O(n) auxiliary + O(n·2^n) output",
        "complexity": {
          "zh": "有 2^n 个子集，总元素数为 n·2^(n-1)，复制结果决定时间与输出空间。递归和路径 O(n)。",
          "en": "There are 2^n subsets containing n·2^(n-1) total elements. Copying dominates; path and recursion use O(n)."
        },
        "python": "from typing import List\nclass Solution:\n    def subsets(self, nums: List[int]) -> List[List[int]]:\n        ans=[]; path=[]\n        def dfs(i):\n            if i==len(nums): ans.append(path.copy()); return\n            dfs(i+1)\n            path.append(nums[i]); dfs(i+1); path.pop()\n        dfs(0)\n        return ans",
        "java": "import java.util.*;\nclass Solution {\n    public List<List<Integer>> subsets(int[] nums) {\n        List<List<Integer>> ans=new ArrayList<>();dfs(nums,0,new ArrayList<>(),ans);return ans;\n    }\n    private void dfs(int[] a,int i,List<Integer> p,List<List<Integer>> ans) {\n        if(i==a.length) {ans.add(new ArrayList<>(p));return;}\n        dfs(a,i+1,p,ans);p.add(a[i]);dfs(a,i+1,p,ans);p.remove(p.size()-1);\n    }\n}",
        "algorithmNotes": {
          "zh": "每个元素只有“不选”和“选”两条分支，递归位置向后推进一位。到达数组末尾时复制当前子集；选入后的回溯要弹出该元素，因此空集和全集都会自然被枚举。",
          "en": "Branch on excluding or including each element and advance the index. Copy the subset at the end of the array, undoing an inclusion after recursion; both the empty set and full set are naturally generated."
        }
      },
      {
        "key": "doubling",
        "name": {
          "zh": "迭代扩展已有子集",
          "en": "Iteratively double the collection"
        },
        "intuition": {
          "zh": "假设已有前 i 个数的全部子集，处理新数 x 时，旧子集代表“不选 x”；为每个旧子集复制一份并加入 x，就得到“选 x”的全部子集。必须冻结旧集合大小，不能把刚生成的子集再次扩展。\n\n包含 x 与不包含 x 的两组互不相交；由旧子集完整性，两组共同覆盖新前缀的所有子集。",
          "en": "Given all subsets of the processed prefix, keep them as the choices without x. Clone each old subset and append x to form all choices containing it. Freeze the old size so newly created subsets are not expanded again. Subsets containing x and those excluding x are disjoint and together exhaust all subsets of the new prefix."
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
        "time": "O(n·2^n)",
        "space": "O(n) transient + O(n·2^n) output",
        "complexity": {
          "zh": "复制的元素总量 O(n·2^n)。没有递归栈，单次待追加的列表 O(n)；最终答案占 O(n·2^n)。",
          "en": "Total element copying is O(n·2^n). No recursion stack is used; a single new list takes O(n), while results take O(n·2^n)."
        },
        "python": "from typing import List\nclass Solution:\n    def subsets(self, nums: List[int]) -> List[List[int]]:\n        ans=[[]]\n        for x in nums:\n            size=len(ans)\n            for i in range(size): ans.append(ans[i]+[x])\n        return ans",
        "java": "import java.util.*;\nclass Solution {\n    public List<List<Integer>> subsets(int[] nums) {\n        List<List<Integer>> ans=new ArrayList<>();ans.add(new ArrayList<>());\n        for(int x:nums) {\n            int size=ans.size();\n            for(int i=0;i<size;i++) {List<Integer> next=new ArrayList<>(ans.get(i));next.add(x);ans.add(next);}\n        }\n        return ans;\n    }\n}",
        "algorithmNotes": {
          "zh": "开始只有空集，每读到一个新值，给所有旧子集各复制一份并追加这个值。必须先固定旧结果长度，不能一边扩张一边遍历新增项，否则会重复使用当前值并无限扩张。",
          "en": "Start with the empty subset. For each new value, copy every existing subset and append that value; freeze the old result count before extending so newly added subsets are not expanded again with the same value."
        }
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
    },
    "examples": [
      {
        "input": "nums = [2,5]",
        "output": "[[],[2],[5],[2,5]]",
        "note": {
          "zh": "这是一个合法输出，题目允许结果按其他合法顺序排列。",
          "en": "This is one valid output; other permitted result orders are accepted."
        }
      },
      {
        "input": "nums = [0]",
        "output": "[[],[0]]",
        "note": {
          "zh": "这是一个合法输出，题目允许结果按其他合法顺序排列。",
          "en": "This is one valid output; other permitted result orders are accepted."
        }
      },
      {
        "input": "nums = [1,2,3]",
        "output": "[[],[1],[2],[3],[1,2],[1,3],[2,3],[1,2,3]]",
        "note": {
          "zh": "这是一个合法输出，题目允许结果按其他合法顺序排列。",
          "en": "This is one valid output; other permitted result orders are accepted."
        }
      }
    ]
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
    "methods": [
      {
        "key": "digit-dfs",
        "name": {
          "zh": "按数字位置回溯",
          "en": "Backtrack by digit position"
        },
        "intuition": {
          "zh": "字符串第 i 位只能从第 i 个数字的映射中选，不能把不同位置的字母混在一起。固定一个前缀后，后续选择与过去具体选了哪个字母无关，因此可以递归列出所有后缀。使用可变字符缓冲避免每层复制整段前缀。\n\n每种输出与一组逐位置字母选择一一对应；每层枚举且只枚举允许的字母，因此没有遗漏或额外结果。",
          "en": "Position i must use letters mapped from digit i. Once a prefix is fixed, enumerate every suffix choice independently. A mutable character buffer avoids copying the entire prefix at each recursive level. Outputs correspond one-to-one with allowed choices at each position, all enumerated by the recursion."
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
        "time": "O(n·K), K ≤ 4^n",
        "space": "O(n) auxiliary + O(n·K) output",
        "complexity": {
          "zh": "K 为各数字字母数量的乘积。每个结果长度 n，复制花 O(n)；缓冲与调用栈深度均 O(n)。",
          "en": "K is the product of mapped-letter counts. Each length-n result costs O(n) to copy; buffer and stack require O(n)."
        },
        "python": "from typing import List\nclass Solution:\n    def letterCombinations(self, digits: str) -> List[str]:\n        if not digits: return []\n        mapping=['','','abc','def','ghi','jkl','mno','pqrs','tuv','wxyz']\n        ans=[]; buf=['']*len(digits)\n        def dfs(i):\n            if i==len(digits): ans.append(''.join(buf)); return\n            for ch in mapping[int(digits[i])]:\n                buf[i]=ch; dfs(i+1)\n        dfs(0)\n        return ans",
        "java": "import java.util.*;\nclass Solution {\n    public List<String> letterCombinations(String digits) {\n        List<String> ans=new ArrayList<>();if(digits.isEmpty()) return ans;\n        String[] map={\"\",\"\",\"abc\",\"def\",\"ghi\",\"jkl\",\"mno\",\"pqrs\",\"tuv\",\"wxyz\"};\n        dfs(digits,0,map,new char[digits.length()],ans);return ans;\n    }\n    private void dfs(String d,int i,String[] map,char[] buf,List<String> ans) {\n        if(i==d.length()) {ans.add(new String(buf));return;}\n        String letters=map[d.charAt(i)-'0'];\n        for(int k=0;k<letters.length();k++) {buf[i]=letters.charAt(k);dfs(d,i+1,map,buf,ans);}\n    }\n}",
        "algorithmNotes": {
          "zh": "递归深度对应正在处理的数字位置，枚举该数字映射的每个字母。选一个字母进入下一层，返回时撤销；走到 digits 长度时才得到完整组合，空输入单独返回空列表。",
          "en": "The recursion depth selects the current digit, whose mapped letters form the available choices. Append a letter, recurse, and undo; emit a combination only after all digits, and handle empty input with an empty result list."
        }
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
    },
    "examples": [
      {
        "input": "digits = \"24\"",
        "output": "[\"ag\",\"ah\",\"ai\",\"bg\",\"bh\",\"bi\",\"cg\",\"ch\",\"ci\"]",
        "note": {
          "zh": "这是一个合法输出，题目允许结果按其他合法顺序排列。",
          "en": "This is one valid output; other permitted result orders are accepted."
        }
      },
      {
        "input": "digits = \"\"",
        "output": "[]",
        "note": {
          "zh": "这是一个合法输出，题目允许结果按其他合法顺序排列。",
          "en": "This is one valid output; other permitted result orders are accepted."
        }
      },
      {
        "input": "digits = \"7\"",
        "output": "[\"p\",\"q\",\"r\",\"s\"]",
        "note": {
          "zh": "这是一个合法输出，题目允许结果按其他合法顺序排列。",
          "en": "This is one valid output; other permitted result orders are accepted."
        }
      }
    ]
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
    "methods": [
      {
        "key": "sorted-backtrack",
        "name": {
          "zh": "有序候选与起点剪枝",
          "en": "Sorted candidates and start-index pruning"
        },
        "intuition": {
          "zh": "要允许重复选同一个数，又禁止以不同顺序重复同一组合，就把路径限制成非递减。选下标 i 后下一层仍从 i 开始，允许重用；不能从 0 重新枚举。排序还让“当前数大于剩余和”成为整段候选的停止条件。\n\n每个组合按非递减顺序有唯一表示，起点约束恰好枚举这些表示。正数保证剩余和严格减少；剪枝后的候选全更大，不可能组成剩余目标。",
          "en": "Keep each path nondecreasing to allow reuse without duplicate orderings. After selecting index i, recurse from i, not i+1 or zero. Sorting also lets the search stop as soon as a candidate exceeds the remainder. Every combination has one nondecreasing representation. Start-index restriction enumerates it once. Positive values reduce the remainder, and larger-than-remainder choices cannot lead to a solution."
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
        "time": "O(n log n + (n+1)^(D+1) + K·D) upper bound",
        "space": "O(n+D) auxiliary + O(K·D) output",
        "complexity": {
          "zh": "D=floor(target/min(candidates))，K 为解数。搜索深度至多 D，每层最多 n 分支，给出宽松上界；排序副本 O(n)，路径栈 O(D)，输出每条最长 D。 这里用 n+1 的底数给出统一宽松界，也覆盖 n=1 时深度 D 的单链搜索。",
          "en": "D=floor(target/min(candidates)), K is the answer count. Depth is at most D with at most n branches per level, giving a loose bound. Sorted copy uses O(n), stack O(D), and output O(KD). The n+1 base gives a uniform loose bound that also covers a depth-D unary search when n=1."
        },
        "python": "from typing import List\nclass Solution:\n    def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:\n        a=sorted(candidates); ans=[]; path=[]\n        def dfs(start,remain):\n            if remain==0: ans.append(path.copy()); return\n            for i in range(start,len(a)):\n                if a[i]>remain: break\n                path.append(a[i]); dfs(i,remain-a[i]); path.pop()\n        dfs(0,target)\n        return ans",
        "java": "import java.util.*;\nclass Solution {\n    public List<List<Integer>> combinationSum(int[] candidates,int target) {\n        int[] a=candidates.clone();Arrays.sort(a);\n        List<List<Integer>> ans=new ArrayList<>();dfs(a,0,target,new ArrayList<>(),ans);return ans;\n    }\n    private void dfs(int[] a,int start,int left,List<Integer> path,List<List<Integer>> ans) {\n        if(left==0) {ans.add(new ArrayList<>(path));return;}\n        for(int i=start;i<a.length && a[i]<=left;i++) {\n            path.add(a[i]);dfs(a,i,left-a[i],path,ans);path.remove(path.size()-1);\n        }\n    }\n}",
        "algorithmNotes": {
          "zh": "start 限定下次只能选当前或更后的位置，避免同一组合因排列不同而重复。选候选 i 后递归仍传 i 以允许重复使用；排序后若候选大于剩余目标，后面的候选也都可停止。",
          "en": "start restricts choices to the current or later indices, eliminating permutation duplicates. Recurse with i again to allow reuse; after sorting, stop the loop once a candidate exceeds the remaining target."
        }
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
    },
    "examples": [
      {
        "input": "candidates = [2,4], target = 6",
        "output": "[[2,2,2],[2,4]]",
        "note": {
          "zh": "这是一个合法输出，题目允许结果按其他合法顺序排列。",
          "en": "This is one valid output; other permitted result orders are accepted."
        }
      },
      {
        "input": "candidates = [4], target = 3",
        "output": "[]",
        "note": {
          "zh": "这是一个合法输出，题目允许结果按其他合法顺序排列。",
          "en": "This is one valid output; other permitted result orders are accepted."
        }
      },
      {
        "input": "candidates = [3], target = 6",
        "output": "[[3,3]]",
        "note": {
          "zh": "这是一个合法输出，题目允许结果按其他合法顺序排列。",
          "en": "This is one valid output; other permitted result orders are accepted."
        }
      }
    ]
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
    "methods": [
      {
        "key": "balance-backtrack",
        "name": {
          "zh": "只扩展合法前缀",
          "en": "Extend only valid prefixes"
        },
        "intuition": {
          "zh": "与其生成全部 2^(2n) 个串再验证，不如在构造时拒绝不可能修复的前缀。若已经写了 left 个左括号、right 个右括号，只在 left<n 时写左括号，只在 right<left 时写右括号；多写的右括号以后补左括号也无法修复。\n\n规则保持所有前缀合法；长度 2n 且左括号最多 n 就保证最终两种各 n。任一合法串的每个下一步都满足相应规则，故一定被生成。",
          "en": "Instead of validating all binary strings, reject invalid prefixes immediately. Add an opening only while left<n, and a closing only while right<left. A closing with no earlier unmatched opening cannot be repaired by future characters. The rules preserve prefix balance. At length 2n both counts must be n. Every valid string follows allowed choices at every step and is therefore generated."
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
        "time": "O(n·Cₙ)",
        "space": "O(n) auxiliary + O(n·Cₙ) output",
        "complexity": {
          "zh": "Cₙ 是第 n 个卡特兰数，约 4^n/n^(3/2)。每条输出长度 2n，复制时间与存储都不能忽略；递归和缓冲 O(n)。",
          "en": "Cₙ is the nth Catalan number, asymptotically 4^n/n^(3/2). Copying and storing 2n characters per answer costs O(nCₙ); stack and buffer use O(n)."
        },
        "python": "from typing import List\nclass Solution:\n    def generateParenthesis(self, n: int) -> List[str]:\n        ans=[]; path=[]\n        def dfs(left,right):\n            if len(path)==2*n: ans.append(''.join(path)); return\n            if left<n:\n                path.append('('); dfs(left+1,right); path.pop()\n            if right<left:\n                path.append(')'); dfs(left,right+1); path.pop()\n        dfs(0,0)\n        return ans",
        "java": "import java.util.*;\nclass Solution {\n    public List<String> generateParenthesis(int n) {\n        List<String> ans=new ArrayList<>();dfs(n,0,0,new char[2*n],ans);return ans;\n    }\n    private void dfs(int n,int left,int right,char[] buf,List<String> ans) {\n        int k=left+right;\n        if(k==2*n) {ans.add(new String(buf));return;}\n        if(left<n) {buf[k]='(';dfs(n,left+1,right,buf,ans);}\n        if(right<left) {buf[k]=')';dfs(n,left,right+1,buf,ans);}\n    }\n}",
        "algorithmNotes": {
          "zh": "左括号使用数不足 n 时才能继续加左括号，右括号数小于左括号数时才能加右括号。这样每个前缀都不会出现无法匹配的右括号；长度达到 2n 时直接保存，不需事后筛选。",
          "en": "Add an opening parenthesis only while fewer than n are used, and a closing one only while its count is below the opening count. Every prefix stays valid, so a length-2n string can be saved without a later validity filter."
        }
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
    },
    "examples": [
      {
        "input": "n = 2",
        "output": "[\"(())\",\"()()\"]",
        "note": {
          "zh": "这是一个合法输出，题目允许结果按其他合法顺序排列。",
          "en": "This is one valid output; other permitted result orders are accepted."
        }
      },
      {
        "input": "n = 1",
        "output": "[\"()\"]",
        "note": {
          "zh": "这是一个合法输出，题目允许结果按其他合法顺序排列。",
          "en": "This is one valid output; other permitted result orders are accepted."
        }
      },
      {
        "input": "n = 3",
        "output": "[\"((()))\",\"(()())\",\"(())()\",\"()(())\",\"()()()\"]",
        "note": {
          "zh": "这是一个合法输出，题目允许结果按其他合法顺序排列。",
          "en": "This is one valid output; other permitted result orders are accepted."
        }
      }
    ]
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
    "methods": [
      {
        "key": "path-dfs",
        "name": {
          "zh": "路径回溯与临时占用",
          "en": "Path backtracking with temporary marking"
        },
        "intuition": {
          "zh": "普通 visited 会错误阻止其他路径使用这个格子。这里访问状态只属于当前路径：选中格子后暂时替换成特殊字符，递归返回就恢复。每个起点都试一次；匹配第 k 个字符成功后，才尝试四邻居匹配 k+1。\n\n递归路径由相邻且未占用的格子构成，并逐字符匹配，故成功路径合法。所有起点和每步四方向都被尝试，回溯恢复不会排除其他可能路径。",
          "en": "A global visited flag would wrongly block other candidate paths. Mark cells only for the active path, then restore them on return. Try every starting cell; only after matching position k may a neighbor try k+1. A successful recursion uses adjacent distinct cells matching the word. Every start and next direction is tried; restoration prevents one failed path from excluding another."
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
        "time": "O(mn·3^L) upper bound",
        "space": "O(L) auxiliary",
        "complexity": {
          "zh": "L=word.length。第一步最多四方向，之后不能立即走回父格，至多三方向；更宽松写 O(mn·4^L) 也成立。原地标记避免 visited 数组，递归最多 L 层，退出后棋盘恢复。",
          "en": "L is word length. There are at most four first moves and three thereafter because the parent cell is blocked; O(mn·4^L) is a looser bound. Recursion uses O(L), with the board restored."
        },
        "python": "from typing import List\nclass Solution:\n    def exist(self, board: List[List[str]], word: str) -> bool:\n        m,n=len(board),len(board[0])\n        if len(word)>m*n: return False\n        def dfs(r,c,k):\n            if not(0<=r<m and 0<=c<n) or board[r][c]!=word[k]: return False\n            if k==len(word)-1: return True\n            ch=board[r][c]; board[r][c]='#'\n            found=any(dfs(r+dr,c+dc,k+1) for dr,dc in ((1,0),(-1,0),(0,1),(0,-1)))\n            board[r][c]=ch\n            return found\n        return any(dfs(r,c,0) for r in range(m) for c in range(n))",
        "java": "class Solution {\n    public boolean exist(char[][] board,String word) {\n        if(word.length()>board.length*board[0].length) return false;\n        for(int r=0;r<board.length;r++) for(int c=0;c<board[0].length;c++) if(dfs(board,word,r,c,0)) return true;\n        return false;\n    }\n    private boolean dfs(char[][] b,String w,int r,int c,int k) {\n        if(r<0 || r>=b.length || c<0 || c>=b[0].length || b[r][c]!=w.charAt(k)) return false;\n        if(k==w.length()-1) return true;\n        char ch=b[r][c];b[r][c]='#';\n        boolean ok=dfs(b,w,r+1,c,k+1)||dfs(b,w,r-1,c,k+1)||dfs(b,w,r,c+1,k+1)||dfs(b,w,r,c-1,k+1);\n        b[r][c]=ch;return ok;\n    }\n}",
        "algorithmNotes": {
          "zh": "递归状态包括格子位置和待匹配字符下标，先检查边界及字符是否一致。匹配后临时标记当前格子以禁止同一路径重复使用，四方向尝试结束后恢复，方便其他起点或分支继续搜索。",
          "en": "The state contains a cell and the next character index. Check bounds and equality, temporarily mark a matching cell to prevent reuse within the path, then restore it after trying its four neighbors so other branches can use it."
        }
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
    },
    "examples": [
      {
        "input": "board = [[\"A\",\"B\"],[\"D\",\"C\"]], word = \"ABC\"",
        "output": "true"
      },
      {
        "input": "board = [[\"A\",\"B\"],[\"D\",\"C\"]], word = \"ABA\"",
        "output": "false"
      },
      {
        "input": "board = [[\"A\"]], word = \"A\"",
        "output": "true"
      }
    ]
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
    "methods": [
      {
        "key": "check-backtrack",
        "name": {
          "zh": "双指针验证 + 切分回溯",
          "en": "Two-pointer checks + partition DFS"
        },
        "intuition": {
          "zh": "从尚未切分的起点 start 枚举当前片段的终点 end。只有这一段是回文才递归切剩余后缀；这比枚举所有切法后整体验证更早排除非法分支。先用首尾指针向中间比较，直观看出回文条件；它会重复检查一些区间，适合理解基础搜索。\n\n每个切分由唯一的切点序列确定。递归恰好枚举这些序列并过滤非回文片段；合法切分的每一段都会通过检查，因此完整无重复。",
          "en": "Enumerate the end of the next piece from the first unused index. Recurse only when that piece is a palindrome, pruning before constructing a whole invalid partition. Compare matching endpoints inward. This simple check may inspect the same interval repeatedly. Each partition has a unique sequence of cut positions. Recursion enumerates those sequences and only filters nonpalindromic pieces, so all valid partitions appear once."
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
        "time": "O(n²·2^n) upper bound",
        "space": "O(n) auxiliary + O(n·2^n) output",
        "complexity": {
          "zh": "至多 2^(n-1) 种切法，每次区间检查最多 O(n)，给出保守 O(n²·2^n) 上界。输出的字符串总长度最坏 O(n·2^n)，不能只把空间算作递归深度。当前路径所有片段字符总数最多 n。",
          "en": "There are at most 2^(n-1) cut patterns and interval checks take O(n), giving the conservative O(n²·2^n) bound. Output characters occupy O(n·2^n) in the worst case. Active path pieces contain at most n characters."
        },
        "python": "from typing import List\nclass Solution:\n    def partition(self, s: str) -> List[List[str]]:\n        n=len(s); ans=[]; path=[]\n        def valid(l,r):\n            while l<r:\n                if s[l]!=s[r]: return False\n                l+=1; r-=1\n            return True\n        def dfs(start):\n            if start==n: ans.append(path.copy()); return\n            for end in range(start,n):\n                if valid(start,end):\n                    path.append(s[start:end+1]); dfs(end+1); path.pop()\n        dfs(0)\n        return ans",
        "java": "import java.util.*;\nclass Solution {\n    public List<List<String>> partition(String s) {\n        int n=s.length();List<List<String>> ans=new ArrayList<>();\n        boolean[][] pal=null;\n        dfs(s,0,pal,new ArrayList<>(),ans);return ans;\n    }\n    private boolean valid(String s,int l,int r,boolean[][] pal) {\n        while(l<r) if(s.charAt(l++)!=s.charAt(r--)) return false;\n        return true;\n    }\n    private void dfs(String s,int start,boolean[][] pal,List<String> path,List<List<String>> ans) {\n        if(start==s.length()) {ans.add(new ArrayList<>(path));return;}\n        for(int end=start;end<s.length();end++) if(valid(s,start,end,pal)) {\n            path.add(s.substring(start,end+1));dfs(s,end+1,pal,path,ans);path.remove(path.size()-1);\n        }\n    }\n}",
        "algorithmNotes": {
          "zh": "固定当前尚未切分的起点，逐一尝试所有结束位置，只对回文片段继续递归。回文检查从片段两端向中间进行；起点到达字符串末尾时复制当前切分，片段顺序必须保持原字符串顺序。",
          "en": "From the first unpartitioned position, try every end index and recurse only on palindromic pieces. Check each piece from both ends inward; when the start reaches the string's end, copy the partition in original order."
        }
      },
      {
        "key": "dp-backtrack",
        "name": {
          "zh": "回文预处理 + 切分回溯",
          "en": "Palindrome table + partition DFS"
        },
        "intuition": {
          "zh": "从尚未切分的起点 start 枚举当前片段的终点 end。只有这一段是回文才递归切剩余后缀；这比枚举所有切法后整体验证更早排除非法分支。相同区间会在多条路径中被问到，提前用 pal[l][r] 存结果，让每次合法性判断 O(1)。\n\n每个切分由唯一的切点序列确定。递归恰好枚举这些序列并过滤非回文片段；合法切分的每一段都会通过检查，因此完整无重复。",
          "en": "Enumerate the end of the next piece from the first unused index. Recurse only when that piece is a palindrome, pruning before constructing a whole invalid partition. Cache every interval in pal[l][r], since many paths ask about the same substring. Each partition has a unique sequence of cut positions. Recursion enumerates those sequences and only filters nonpalindromic pieces, so all valid partitions appear once."
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
        "time": "O(n²+n·2^n)",
        "space": "O(n²) auxiliary + O(n·2^n) output",
        "complexity": {
          "zh": "预处理 O(n²)，搜索加片段复制可用 O(n·2^n) 上界；回文表 O(n²)。输出的字符串总长度最坏 O(n·2^n)，不能只把空间算作递归深度。当前路径所有片段字符总数最多 n。",
          "en": "Preprocessing costs O(n²); search and substring copying fit O(n·2^n), with an O(n²) table. Output characters occupy O(n·2^n) in the worst case. Active path pieces contain at most n characters."
        },
        "python": "from typing import List\nclass Solution:\n    def partition(self, s: str) -> List[List[str]]:\n        n=len(s); ans=[]; path=[]\n        pal=[[False]*n for _ in range(n)]\n        for l in range(n-1,-1,-1):\n            for r in range(l,n):\n                pal[l][r]=s[l]==s[r] and (r-l<2 or pal[l+1][r-1])\n        def valid(l,r): return pal[l][r]\n        def dfs(start):\n            if start==n: ans.append(path.copy()); return\n            for end in range(start,n):\n                if valid(start,end):\n                    path.append(s[start:end+1]); dfs(end+1); path.pop()\n        dfs(0)\n        return ans",
        "java": "import java.util.*;\nclass Solution {\n    public List<List<String>> partition(String s) {\n        int n=s.length();List<List<String>> ans=new ArrayList<>();\n        boolean[][] pal=new boolean[n][n];\n        for(int l=n-1;l>=0;l--) for(int r=l;r<n;r++) pal[l][r]=s.charAt(l)==s.charAt(r)&&(r-l<2||pal[l+1][r-1]);\n        dfs(s,0,pal,new ArrayList<>(),ans);return ans;\n    }\n    private boolean valid(String s,int l,int r,boolean[][] pal) {\n        return pal[l][r];\n    }\n    private void dfs(String s,int start,boolean[][] pal,List<String> path,List<List<String>> ans) {\n        if(start==s.length()) {ans.add(new ArrayList<>(path));return;}\n        for(int end=start;end<s.length();end++) if(valid(s,start,end,pal)) {\n            path.add(s.substring(start,end+1));dfs(s,end+1,pal,path,ans);path.remove(path.size()-1);\n        }\n    }\n}",
        "algorithmNotes": {
          "zh": "先算 pal[l][r]：两端相等且内部为回文时整个区间才是回文，长度 1 或 2 单独作为短区间处理。回溯时直接查表判断片段，只减少重复判断，不改变切分的枚举方式。",
          "en": "Precompute pal[l][r] from equal endpoints and a palindromic interior, with lengths one and two handled as short cases. Backtracking then uses constant-time lookups without changing which partitions it enumerates."
        }
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
    },
    "examples": [
      {
        "input": "s = \"aba\"",
        "output": "[[\"a\",\"b\",\"a\"],[\"aba\"]]",
        "note": {
          "zh": "这是一个合法输出，题目允许结果按其他合法顺序排列。",
          "en": "This is one valid output; other permitted result orders are accepted."
        }
      },
      {
        "input": "s = \"a\"",
        "output": "[[\"a\"]]",
        "note": {
          "zh": "这是一个合法输出，题目允许结果按其他合法顺序排列。",
          "en": "This is one valid output; other permitted result orders are accepted."
        }
      },
      {
        "input": "s = \"aa\"",
        "output": "[[\"a\",\"a\"],[\"aa\"]]",
        "note": {
          "zh": "这是一个合法输出，题目允许结果按其他合法顺序排列。",
          "en": "This is one valid output; other permitted result orders are accepted."
        }
      }
    ]
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
    "methods": [
      {
        "key": "column-diagonal",
        "name": {
          "zh": "逐行回溯与列、斜线标记",
          "en": "Row DFS with column and diagonal flags"
        },
        "intuition": {
          "zh": "n 个皇后且不能同行，意味着每行恰好一个。第 r 行只需要选择列 c，同行冲突自动消失。同一条斜线的 r-c 或 r+c 相等，用标记数组可在 O(1) 时间发现冲突。路径只存每行列号，找到解时才构造完整棋盘。\n\n标记准确覆盖已放皇后的攻击线，因此每次选择都保持合法。每个布局对应唯一的逐行列号序列，搜索枚举所有无冲突选择，故完整且无重复。",
          "en": "Exactly one queen must occupy each row. Choose only the column c for row r, eliminating row conflicts automatically. Equal r-c or r+c identifies shared diagonals, allowing constant-time conflict checks. Store column choices and build a board only at a solution. The flags describe every attack line of placed queens, preserving validity. Each board has one unique sequence of row-column choices, all legal sequences are explored."
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
        "time": "O(n·n! + K·n²) upper bound",
        "space": "O(n) auxiliary + O(K·n²) output",
        "complexity": {
          "zh": "忽略斜线剪枝时至多排列树规模，每个节点最多检查 n 列，给出 O(n·n!) 的保守界。K 个解各输出 n² 字符，标记、列号、递归深度 O(n)。",
          "en": "Ignoring diagonal pruning leaves a permutation tree; scanning n columns per node gives a conservative O(n·n!) bound. K boards require Kn² characters; flags, choices and recursion use O(n)."
        },
        "python": "from typing import List\nclass Solution:\n    def solveNQueens(self, n: int) -> List[List[str]]:\n        ans=[]; pos=[0]*n; cols=[False]*n; d1=[False]*(2*n-1); d2=[False]*(2*n-1)\n        def dfs(r):\n            if r==n:\n                ans.append(['.'*c+'Q'+'.'*(n-c-1) for c in pos]); return\n            for c in range(n):\n                a,b=r-c+n-1,r+c\n                if cols[c] or d1[a] or d2[b]: continue\n                pos[r]=c; cols[c]=d1[a]=d2[b]=True\n                dfs(r+1)\n                cols[c]=d1[a]=d2[b]=False\n        dfs(0)\n        return ans",
        "java": "import java.util.*;\nclass Solution {\n    public List<List<String>> solveNQueens(int n) {\n        List<List<String>> ans=new ArrayList<>();\n        dfs(0,n,new int[n],new boolean[n],new boolean[2*n-1],new boolean[2*n-1],ans);return ans;\n    }\n    private void dfs(int r,int n,int[] pos,boolean[] cols,boolean[] d1,boolean[] d2,List<List<String>> ans) {\n        if(r==n) {\n            List<String> board=new ArrayList<>();\n            for(int c:pos) {char[] row=new char[n];Arrays.fill(row,'.');row[c]='Q';board.add(new String(row));}\n            ans.add(board);return;\n        }\n        for(int c=0;c<n;c++) {\n            int a=r-c+n-1,b=r+c;\n            if(cols[c]||d1[a]||d2[b]) continue;\n            pos[r]=c;cols[c]=d1[a]=d2[b]=true;\n            dfs(r+1,n,pos,cols,d1,d2,ans);\n            cols[c]=d1[a]=d2[b]=false;\n        }\n    }\n}",
        "algorithmNotes": {
          "zh": "按行放皇后，每行只选一列，列、r−c 和 r+c 分别标记三类冲突。选位置时同时登记三个标记，回溯时同时撤销；放满 n 行后再把列下标转换成带 Q 的棋盘字符串。",
          "en": "Place one queen per row, tracking occupied columns and diagonals r−c and r+c. Set and undo all three markers together; after n rows, convert the chosen column indices into board strings containing Q."
        }
      },
      {
        "key": "bitmask",
        "name": {
          "zh": "位掩码枚举可用列",
          "en": "Enumerate available columns with bit masks"
        },
        "intuition": {
          "zh": "用一个二进制位对应一列，把占用列、当前行受左斜线攻击列、右斜线攻击列压缩成整数。available=full & ~(cols|left|right) 一次计算所有安全列；最低位 available & -available 每次提取一个位置。进入下一行时两组斜线攻击分别左移和右移，表达它们每行偏移一列。\n\n掩码按位记录了上一层所有皇后对当前行的攻击，移位恰好对应斜线的几何移动。补集只枚举不受攻击的列，因此与逐行回溯枚举同一组合法布局。",
          "en": "Represent each column by one bit. Three masks track occupied columns and diagonal attacks on the current row. Compute all safe columns at once with full & ~(cols|left|right), then extract a choice using available & -available. Shift diagonal masks in opposite directions for the next row because attacks move one column per row. The masks encode all attacks on the current row, and shifting matches diagonal geometry. Their complement enumerates exactly safe columns, yielding the same complete set of legal boards."
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
        "time": "O(n! + K·n²) upper bound",
        "space": "O(n) auxiliary + O(K·n²) output",
        "complexity": {
          "zh": "在 n≤9 的约束下掩码可装入机器整数，位操作 O(1)，不再扫描每行全部 n 列，只枚举有效分支。搜索树规模可用 O(n!) 上界；K 个棋盘输出仍需 O(Kn²)，递归与列号数组 O(n)。",
          "en": "For n≤9, masks fit a machine integer and bit operations are O(1). Only available branches are enumerated instead of scanning n columns per node. Search fits O(n!), while K output boards cost O(Kn²). Stack and choices use O(n)."
        },
        "python": "from typing import List\nclass Solution:\n    def solveNQueens(self, n: int) -> List[List[str]]:\n        full=(1<<n)-1; pos=[0]*n; ans=[]\n        def dfs(r,cols,left,right):\n            if r==n:\n                ans.append(['.'*c+'Q'+'.'*(n-c-1) for c in pos]); return\n            available=full & ~(cols|left|right)\n            while available:\n                bit=available & -available; available-=bit\n                pos[r]=bit.bit_length()-1\n                dfs(r+1,cols|bit,((left|bit)<<1)&full,(right|bit)>>1)\n        dfs(0,0,0,0)\n        return ans",
        "java": "import java.util.*;\nclass Solution {\n    public List<List<String>> solveNQueens(int n) {\n        List<List<String>> ans=new ArrayList<>();dfs(0,n,(1<<n)-1,0,0,0,new int[n],ans);return ans;\n    }\n    private void dfs(int r,int n,int full,int cols,int left,int right,int[] pos,List<List<String>> ans) {\n        if(r==n) {\n            List<String> board=new ArrayList<>();\n            for(int c:pos) {char[] row=new char[n];Arrays.fill(row,'.');row[c]='Q';board.add(new String(row));}\n            ans.add(board);return;\n        }\n        int available=full & ~(cols|left|right);\n        while(available!=0) {\n            int bit=available & -available;available-=bit;\n            pos[r]=Integer.numberOfTrailingZeros(bit);\n            dfs(r+1,n,full,cols|bit,((left|bit)<<1)&full,(right|bit)>>>1,pos,ans);\n        }\n    }\n}",
        "algorithmNotes": {
          "zh": "用位集合表示当前行被列和两种斜线禁止的位置，取补集后还要与 n 位掩码相与。每次取最低有效位作为一个候选，进入下一行时把两种斜线分别左移、右移，列掩码保留。",
          "en": "Bitmasks track columns and diagonals forbidden in the current row; mask the complement back to n bits. Select a lowest set bit as a candidate, then shift the diagonal masks in opposite directions for the next row while retaining occupied columns."
        }
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
    },
    "examples": [
      {
        "input": "n = 4",
        "output": "[[\".Q..\",\"...Q\",\"Q...\",\"..Q.\"],[\"..Q.\",\"Q...\",\"...Q\",\".Q..\"]]",
        "note": {
          "zh": "这是一个合法输出，题目允许结果按其他合法顺序排列。",
          "en": "This is one valid output; other permitted result orders are accepted."
        }
      },
      {
        "input": "n = 1",
        "output": "[[\"Q\"]]",
        "note": {
          "zh": "这是一个合法输出，题目允许结果按其他合法顺序排列。",
          "en": "This is one valid output; other permitted result orders are accepted."
        }
      },
      {
        "input": "n = 2",
        "output": "[]",
        "note": {
          "zh": "这是一个合法输出，题目允许结果按其他合法顺序排列。",
          "en": "This is one valid output; other permitted result orders are accepted."
        }
      }
    ]
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
    "methods": [
      {
        "key": "lower-bound",
        "name": {
          "zh": "半开区间下界二分",
          "en": "Half-open lower-bound search"
        },
        "intuition": {
          "zh": "“找现有位置”和“找插入位置”其实都是找第一个不小于 target 的数。如果所有数都更小，答案就是 n。用 [left,right) 保存候选范围，不要把 right 初始化为 n-1 后又混用半开更新规则。\n\n始终保持 left 之前都小于 target，right 及之后都大于等于 target。两端相遇时正好是两类值的分界，亦为插入点。",
          "en": "Both cases ask for the first value at least target. If every value is smaller, the answer is n. Use the half-open interval [left,right) consistently; mixing it with closed-interval updates creates off-by-one errors. Everything before left is smaller than target and everything from right onward is at least target. When they meet, the boundary is exactly the insertion position."
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
        "time": "O(log n)",
        "space": "O(1)",
        "complexity": {
          "zh": "每轮候选区间至少减半，只有几个下标变量；输入不修改。线性扫描可作思考基线，但不满足原题时间要求。",
          "en": "The interval halves each round, using only index variables. The input is unchanged. A linear baseline would violate the required runtime."
        },
        "python": "from typing import List\nclass Solution:\n    def searchInsert(self, nums: List[int], target: int) -> int:\n        left,right=0,len(nums)\n        while left<right:\n            mid=(left+right)//2\n            if nums[mid]<target: left=mid+1\n            else: right=mid\n        return left",
        "java": "class Solution {\n    public int searchInsert(int[] nums,int target) {\n        int left=0,right=nums.length;\n        while(left<right) {\n            int mid=left+(right-left)/2;\n            if(nums[mid]<target) left=mid+1;else right=mid;\n        }\n        return left;\n    }\n}",
        "algorithmNotes": {
          "zh": "寻找第一个不小于 target 的位置，而不只是寻找相等值。中点值小于 target 时排除中点及左侧，否则保留中点到右侧候选范围；最终边界可以等于数组长度，表示插入末尾。",
          "en": "Find the first position whose value is at least target, not merely an equal value. Exclude mid and the left side when its value is smaller; otherwise keep mid among candidates. The final position may equal the array length, indicating insertion at the end."
        }
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
    },
    "examples": [
      {
        "input": "nums = [2,5,8], target = 6",
        "output": "2"
      },
      {
        "input": "nums = [2], target = 1",
        "output": "0"
      },
      {
        "input": "nums = [2], target = 3",
        "output": "1"
      }
    ]
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
    "methods": [
      {
        "key": "flat-binary",
        "name": {
          "zh": "逻辑展开后二分",
          "en": "Binary search on logical flattened indices"
        },
        "intuition": {
          "zh": "按行读取矩阵会得到一个整体有序序列，因此可直接二分下标 0 到 mn-1。没有必要真正复制出一维数组：第 k 项就是 matrix[k//n][k%n]，这里除数必须是列数。\n\n坐标映射不改变按行序列的顺序，而题设确保其整体有序，所以普通二分的排除依据完全成立。",
          "en": "Row-major traversal is globally sorted, so search logical indices 0 through mn-1. No flattened copy is needed: index k maps to matrix[k//n][k%n], using the column count as divisor. The mapping preserves row-major order, which is sorted by the given conditions; ordinary binary-search elimination therefore applies."
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
        "time": "O(log(mn))",
        "space": "O(1)",
        "complexity": {
          "zh": "逻辑长度为 mn，每次减半；坐标换算 O(1)，没有额外数组。",
          "en": "The logical sequence has mn entries and halves each iteration. Coordinate conversion is O(1), without a copied array."
        },
        "python": "from typing import List\nclass Solution:\n    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:\n        n=len(matrix[0]); left,right=0,len(matrix)*n-1\n        while left<=right:\n            mid=(left+right)//2; value=matrix[mid//n][mid%n]\n            if value==target: return True\n            if value<target: left=mid+1\n            else: right=mid-1\n        return False",
        "java": "class Solution {\n    public boolean searchMatrix(int[][] matrix,int target) {\n        int n=matrix[0].length,left=0,right=matrix.length*n-1;\n        while(left<=right) {\n            int mid=left+(right-left)/2,value=matrix[mid/n][mid%n];\n            if(value==target) return true;\n            if(value<target) left=mid+1;else right=mid-1;\n        }\n        return false;\n    }\n}",
        "algorithmNotes": {
          "zh": "每行第一个数大于上一行最后一个数，因此可以按行拼接为全局递增序列。虚拟下标 mid 对应行 mid//列数、列 mid%列数，直接访问矩阵，不需要真的复制出一维数组。",
          "en": "Row boundaries preserve global order, so treat the matrix as one sorted sequence. Map virtual mid to row mid//columns and column mid%columns, accessing the matrix directly without creating a flattened copy."
        }
      },
      {
        "key": "row-then-column",
        "name": {
          "zh": "先定位行，再行内二分",
          "en": "Find a row, then search within it"
        },
        "intuition": {
          "zh": "行与行的值域完全分开，所以先找首元素不大于 target 的最后一行。更后面的行全部太大，更前面的行又都小于这行首元素；target 若存在只能在这一行。再在该行做普通二分。\n\n跨行严格分隔保证最多一行能含 target；首元素边界恰好选出这一候选行，行内二分再精确确认。",
          "en": "Row value ranges do not overlap. Find the last row whose first value is at most target: later rows are too large, while earlier rows end below this row’s first value. Any occurrence must be in that row, which can be searched normally. Strict inter-row separation permits at most one candidate row. The first-element boundary identifies it, and the inner search confirms membership."
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
        "time": "O(log m+log n)=O(log(mn))",
        "space": "O(1)",
        "complexity": {
          "zh": "两次二分时间相加，不是相乘。整个过程只使用行号及左右边界。",
          "en": "The two logarithmic searches add, not multiply. Only a row index and search bounds are stored."
        },
        "python": "from typing import List\nclass Solution:\n    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:\n        left,right=0,len(matrix)\n        while left<right:\n            mid=(left+right)//2\n            if matrix[mid][0]<=target: left=mid+1\n            else: right=mid\n        row=left-1\n        if row<0: return False\n        left,right=0,len(matrix[0])-1\n        while left<=right:\n            mid=(left+right)//2\n            if matrix[row][mid]==target: return True\n            if matrix[row][mid]<target: left=mid+1\n            else: right=mid-1\n        return False",
        "java": "class Solution {\n    public boolean searchMatrix(int[][] matrix,int target) {\n        int left=0,right=matrix.length;\n        while(left<right) {\n            int mid=left+(right-left)/2;\n            if(matrix[mid][0]<=target) left=mid+1;else right=mid;\n        }\n        int row=left-1;if(row<0) return false;\n        left=0;right=matrix[0].length-1;\n        while(left<=right) {\n            int mid=left+(right-left)/2;\n            if(matrix[row][mid]==target) return true;\n            if(matrix[row][mid]<target) left=mid+1;else right=mid-1;\n        }\n        return false;\n    }\n}",
        "algorithmNotes": {
          "zh": "第一轮用各行首元素确定 target 可能属于哪一行；比第一行首值还小时立即排除。第二轮只在候选行里二分查找，找到相等值才返回 true，不能仅凭落在行范围内就认定存在。",
          "en": "First use row starts to locate the only possible row, rejecting a target below the first start. Then binary-search within that row; falling inside its numeric range alone does not establish that the target exists."
        }
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
    },
    "examples": [
      {
        "input": "matrix = [[2,4,6],[9,12,15]], target = 12",
        "output": "true"
      },
      {
        "input": "matrix = [[2,4,6],[9,12,15]], target = 8",
        "output": "false"
      },
      {
        "input": "matrix = [[1]], target = 0",
        "output": "false"
      }
    ]
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
    "methods": [
      {
        "key": "two-bounds",
        "name": {
          "zh": "分别二分左右分界",
          "en": "Binary-search both boundaries"
        },
        "intuition": {
          "zh": "相同值在有序数组中必连续。找第一个 ≥target 的位置 L，再找第一个 >target 的位置 U，目标占据半开区间 [L,U)。区别只在相等时向哪边移动；不用 target+1，也避免在命中后线性向两侧扫描。\n\n下界左侧都小于 target，上界右侧都大于 target；二者之间只能等于 target，恰好覆盖所有出现位置。",
          "en": "Equal values form one contiguous interval. Let L be the first value ≥target and U the first value >target; matches occupy [L,U). Only the equality decision differs. Avoid target+1 and avoid linear expansion after finding one match. Values before L are smaller and values from U onward are larger. Exactly the entries between the boundaries equal target."
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
        "time": "O(log(n+1))",
        "space": "O(1)",
        "complexity": {
          "zh": "两次对数搜索之和仍为对数；n=0 时直接退出循环，使用 log(n+1) 表达空数组情况。只存常数个下标。",
          "en": "Two logarithmic searches remain logarithmic; log(n+1) covers empty input. Only a constant number of indices is stored."
        },
        "python": "from typing import List\nclass Solution:\n    def searchRange(self, nums: List[int], target: int) -> List[int]:\n        def bound(strict):\n            left,right=0,len(nums)\n            while left<right:\n                mid=(left+right)//2\n                if nums[mid]<target or (strict and nums[mid]==target): left=mid+1\n                else: right=mid\n            return left\n        first=bound(False)\n        if first==len(nums) or nums[first]!=target: return [-1,-1]\n        return [first,bound(True)-1]",
        "java": "class Solution {\n    public int[] searchRange(int[] nums,int target) {\n        int first=bound(nums,target,false);\n        if(first==nums.length || nums[first]!=target) return new int[]{-1,-1};\n        return new int[]{first,bound(nums,target,true)-1};\n    }\n    private int bound(int[] a,int target,boolean strict) {\n        int left=0,right=a.length;\n        while(left<right) {\n            int mid=left+(right-left)/2;\n            if(a[mid]<target || (strict && a[mid]==target)) left=mid+1;else right=mid;\n        }\n        return left;\n    }\n}",
        "algorithmNotes": {
          "zh": "分别找第一个 ≥target 和第一个 >target 的位置，前者是左边界，后者减一是右边界。先检查左边界是否越界或对应值不等于 target，不存在时统一返回 [-1,-1]。",
          "en": "Find the first value ≥target and the first value >target; these give the left boundary and one past the right. Check that the left position is in range and equals target before returning the pair, otherwise return [-1,-1]."
        }
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
    },
    "examples": [
      {
        "input": "nums = [1,3,3,3,7], target = 3",
        "output": "[1,3]"
      },
      {
        "input": "nums = [], target = 0",
        "output": "[-1,-1]"
      },
      {
        "input": "nums = [2,2], target = 2",
        "output": "[0,1]"
      }
    ]
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
    "methods": [
      {
        "key": "ordered-half",
        "name": {
          "zh": "识别有序半区",
          "en": "Identify the sorted half"
        },
        "intuition": {
          "zh": "旋转只有一个断点，所以任取中点，总有至少一半是有序的。先找出有序半段，再用端点的数值范围判断 target 是否可能落在其中。若在就保留它，否则丢弃它；不能只根据 mid 值与 target 的大小直接套普通二分。\n\n无重复且只有一个断点保证有序半区可识别。目标落在其端点范围内时，其他半区不可能含相同值；否则有序半区可安全排除。",
          "en": "There is only one rotation break, so at least one half around the midpoint is sorted. Identify that half, then test target against its endpoint range. Keep it if the value belongs there; otherwise discard it. Comparing only mid with target is insufficient. Distinct values and one break identify a sorted half. Its endpoint range decides whether target can lie there; uniqueness makes eliminating the other half safe."
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
        "time": "O(log n)",
        "space": "O(1)",
        "complexity": {
          "zh": "每轮至少丢弃一半候选，常数空间。本结论依赖无重复值；含重复值时不能直接沿用判定。",
          "en": "Each round discards at least half the candidates using constant space. The sorted-half decision relies on distinct values."
        },
        "python": "from typing import List\nclass Solution:\n    def search(self, nums: List[int], target: int) -> int:\n        left,right=0,len(nums)-1\n        while left<=right:\n            mid=(left+right)//2\n            if nums[mid]==target: return mid\n            if nums[left]<=nums[mid]:\n                if nums[left]<=target<nums[mid]: right=mid-1\n                else: left=mid+1\n            else:\n                if nums[mid]<target<=nums[right]: left=mid+1\n                else: right=mid-1\n        return -1",
        "java": "class Solution {\n    public int search(int[] nums,int target) {\n        int left=0,right=nums.length-1;\n        while(left<=right) {\n            int mid=left+(right-left)/2;\n            if(nums[mid]==target) return mid;\n            if(nums[left]<=nums[mid]) {\n                if(nums[left]<=target && target<nums[mid]) right=mid-1;else left=mid+1;\n            } else {\n                if(nums[mid]<target && target<=nums[right]) left=mid+1;else right=mid-1;\n            }\n        }\n        return -1;\n    }\n}",
        "algorithmNotes": {
          "zh": "无重复值保证中点两侧至少一半有序。先判断哪半有序，再检查 target 是否落在该半的端点范围内；只有满足范围才保留这半，否则搜索另一半，不能直接按整个数组普通二分。",
          "en": "Distinct values guarantee at least one half is sorted. Identify it and retain it only if target lies within its endpoint range; otherwise choose the other half instead of applying ordinary binary search to the whole rotated array."
        }
      },
      {
        "key": "pivot",
        "name": {
          "zh": "先找旋转点，再映射二分",
          "en": "Find the pivot, then binary-search mapped indices"
        },
        "intuition": {
          "zh": "最小值的位置是原递增序列的起点。先用 nums[mid] 与右端比较找到它，再把逻辑有序下标 k 映射到 (pivot+k)%n。第二次搜索面对的是完整有序序列，返回时必须返回映射后的真实下标。\n\n第一次二分始终保留唯一最小值；从最小值循环读取恢复原有序序列，第二次二分因此正确，映射保留实际位置。",
          "en": "The minimum marks the start of the original sorted sequence. Locate it by comparing mid with the right endpoint, then map logical index k to (pivot+k)%n. The second search sees a sorted sequence and must return the physical index. The first search retains the unique minimum. Circular traversal from it restores sorted order, making the second binary search valid while preserving physical indices."
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
        "time": "O(log n)",
        "space": "O(1)",
        "complexity": {
          "zh": "两次二分 O(log n)+O(log n)，取模映射为常数操作，不复制或旋转输入。",
          "en": "Two logarithmic searches add to O(log n). Modulo mapping is constant-time and the input is not copied or rotated."
        },
        "python": "from typing import List\nclass Solution:\n    def search(self, nums: List[int], target: int) -> int:\n        n=len(nums); left,right=0,n-1\n        while left<right:\n            mid=(left+right)//2\n            if nums[mid]>nums[right]: left=mid+1\n            else: right=mid\n        pivot=left; left,right=0,n-1\n        while left<=right:\n            mid=(left+right)//2; real=(pivot+mid)%n\n            if nums[real]==target: return real\n            if nums[real]<target: left=mid+1\n            else: right=mid-1\n        return -1",
        "java": "class Solution {\n    public int search(int[] nums,int target) {\n        int n=nums.length,left=0,right=n-1;\n        while(left<right) {\n            int mid=left+(right-left)/2;\n            if(nums[mid]>nums[right]) left=mid+1;else right=mid;\n        }\n        int pivot=left;left=0;right=n-1;\n        while(left<=right) {\n            int mid=left+(right-left)/2,real=(pivot+mid)%n;\n            if(nums[real]==target) return real;\n            if(nums[real]<target) left=mid+1;else right=mid-1;\n        }\n        return -1;\n    }\n}",
        "algorithmNotes": {
          "zh": "先二分找到最小元素下标，作为旋转偏移。随后在虚拟有序区间二分，把逻辑下标 mid 映射到 (mid+偏移)%n 后比较；返回时要返回映射后的真实下标。",
          "en": "Find the minimum's index as the rotation offset. Binary-search the virtual sorted range, comparing at physical index (mid+offset)%n; return that physical index rather than the virtual one."
        }
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
    },
    "examples": [
      {
        "input": "nums = [6,8,1,3,4], target = 3",
        "output": "3"
      },
      {
        "input": "nums = [6,8,1,3,4], target = 7",
        "output": "-1"
      },
      {
        "input": "nums = [1], target = 1",
        "output": "0"
      }
    ]
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
    "methods": [
      {
        "key": "scan",
        "name": {
          "zh": "线性扫描（理解基线，不满足对数要求）",
          "en": "Linear scan (baseline; misses the logarithmic target)"
        },
        "intuition": {
          "zh": "暂时忽略旋转性质，把问题当作普通数组求最小值。维护已经看过元素的最小值，每读一个元素只需与当前答案比较。这个版本用于检验二分结果，不作为满足题目复杂度要求的最终方案。\n\n扫描任意前缀后，best 都等于该前缀的最小值；处理完整数组后即为所求。",
          "en": "Ignore the rotation and maintain the smallest value seen so far. Each new value can only keep or lower that minimum. This is a useful reference implementation for testing the binary search, but it does not meet the requested logarithmic bound. After each prefix, best is its minimum. The complete prefix is the whole input."
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
        "time": "O(n)",
        "space": "O(1)",
        "complexity": {
          "zh": "n 个元素各比较一次，只有一个答案变量；不修改输入。",
          "en": "Each of n elements is checked once; only one running answer is stored. The input is unchanged."
        },
        "python": "class Solution:\n    def findMin(self, nums):\n        best = nums[0]\n        for x in nums:\n            best = min(best, x)\n        return best\n",
        "java": "class Solution {\n    public int findMin(int[] nums) {\n        int best = nums[0];\n        for (int x : nums) best = Math.min(best, x);\n        return best;\n    }\n}\n",
        "algorithmNotes": {
          "zh": "用第一个元素初始化最小值，再把剩余元素逐个与它比较。该方法不利用旋转和有序性质，仍能处理完全未旋转或只有一个元素的情况，但会检查整个数组。",
          "en": "Initialize the minimum from the first element and compare every remaining value. This does not exploit the rotation structure and scans the whole array, but naturally handles an unrotated or single-element input."
        }
      },
      {
        "key": "binary",
        "name": {
          "zh": "保留最小值的二分",
          "en": "Binary search retaining the minimum"
        },
        "intuition": {
          "zh": "旋转后的数组由至多两段递增区间组成。拿中点与右端比较：若中点更大，它属于断点前的高值段，最小值只能在其右侧；否则中点到右端没有跨过下降断点，右侧不会比中点更小，因此保留中点和左半段。\n\n两个分支均只删除不可能包含最小值的部分，且区间严格缩小；最终唯一留下的元素就是最小值。互异条件使比较不会产生重复值歧义。",
          "en": "A rotated array contains at most two increasing runs. If the middle value exceeds the right endpoint, the minimum lies beyond the middle in the lower run. Otherwise the middle-to-right section does not cross the drop: keep the middle and everything to its left. Each branch removes only positions that cannot hold the minimum and strictly shrinks the interval. Distinct values make the comparison decisive."
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
        "time": "O(log n)",
        "space": "O(1)",
        "complexity": {
          "zh": "每次把候选区间缩小约一半；只保存左右边界和中点。",
          "en": "Each iteration roughly halves the candidate interval and uses only three indices."
        },
        "python": "class Solution:\n    def findMin(self, nums):\n        l, r = 0, len(nums) - 1\n        while l < r:\n            mid = (l + r) // 2\n            if nums[mid] > nums[r]:\n                l = mid + 1\n            else:\n                r = mid\n        return nums[l]\n",
        "java": "class Solution {\n    public int findMin(int[] nums) {\n        int l=0, r=nums.length-1;\n        while(l<r) {\n            int mid=l+(r-l)/2;\n            if(nums[mid]>nums[r]) l=mid+1;\n            else r=mid;\n        }\n        return nums[l];\n    }\n}\n",
        "algorithmNotes": {
          "zh": "比较 mid 与右端值：mid 较大说明最小值在其右边，排除 mid；否则最小值可能就是 mid，右边界缩到 mid。左右相遇时该位置就是最小值，不能在后一种情况跳过 mid。",
          "en": "Compare mid with the right endpoint. A larger mid places the minimum strictly to its right; otherwise mid may itself be the minimum, so retain it by setting right=mid. The meeting position is the answer."
        }
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
    },
    "examples": [
      {
        "input": "nums = [4,5,1,2,3]",
        "output": "1"
      },
      {
        "input": "nums = [1,2,3]",
        "output": "1"
      },
      {
        "input": "nums = [7]",
        "output": "7"
      }
    ]
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
    "methods": [
      {
        "key": "merge",
        "name": {
          "zh": "双指针取到中间（线性基线）",
          "en": "Merge only as far as the middle (linear baseline)"
        },
        "intuition": {
          "zh": "完整排序没有必要：两个数组的未读部分中，下一小的数一定是两端头部的较小者。一直取到中间位置，仅保存上一个数和当前数，即可处理奇偶两种长度。此方法不满足对数时间目标。\n\n按头部大小取数等价于归并排序的合并步骤，因此最后保存的一个或两个值恰为合并序列的中间值。",
          "en": "The next smallest unread value is the smaller of the two array heads. Stop at the central index and retain only the last two selected values. This avoids a merged array, but remains a linear baseline rather than the requested logarithmic solution. Head selection produces the combined sorted sequence in order, so the retained values are exactly its middle values."
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
        "time": "O(m+n)",
        "space": "O(1)",
        "complexity": {
          "zh": "最多读取总元素的一半再加一，渐进仍是线性；没有复制或切片数组。",
          "en": "Reading half the elements plus one is still linear; no array copy or slice is created."
        },
        "python": "class Solution:\n    def findMedianSortedArrays(self, nums1, nums2):\n        i = j = 0\n        previous = current = 0\n        total = len(nums1) + len(nums2)\n        for _ in range(total // 2 + 1):\n            previous = current\n            if i < len(nums1) and (j == len(nums2) or nums1[i] <= nums2[j]):\n                current = nums1[i]; i += 1\n            else:\n                current = nums2[j]; j += 1\n        return float(current) if total % 2 else (previous + current) / 2.0\n",
        "java": "class Solution {\n    public double findMedianSortedArrays(int[] a, int[] b) {\n        int i=0,j=0,prev=0,cur=0,total=a.length+b.length;\n        for(int t=0;t<=total/2;t++) {\n            prev=cur;\n            if(i<a.length && (j==b.length || a[i]<=b[j])) cur=a[i++];\n            else cur=b[j++];\n        }\n        return total%2==1 ? cur : ((double)prev+cur)/2;\n    }\n}\n",
        "algorithmNotes": {
          "zh": "用两个指针按升序合并数组，指针耗尽时从另一数组继续取值。总长奇数取中间一个，偶数取中间两个的平均值；平均值必须保留小数，不能使用整数除法截断。",
          "en": "Merge with two pointers, continuing from the other array when one is exhausted. Select one middle value for an odd total or average the middle pair for an even total, using nontruncating division."
        }
      },
      {
        "key": "partition",
        "name": {
          "zh": "二分查找平衡切口",
          "en": "Binary search for a balanced partition"
        },
        "intuition": {
          "zh": "不必知道完整排序，只需把数据分成“左边数量合适且全部不大于右边”的两部分。在短数组放 i 个数到左边后，另一数组的左边数量 j 就被总数决定。每个数组内部已排序，检查切口附近四个数就能判断全局切分是否合法。\n\n每次移动切口都修正唯一违反顺序的方向。合法切口保证数量平衡且所有左值不大于所有右值，因此边界值就是中位数。",
          "en": "We only need a balanced split with every left value no larger than every right value. Choosing i left-side values from the shorter array determines j for the other array. Internal order is already known, so only four values adjacent to the cuts need checking. The failed cross-comparison determines the necessary cut direction. At a valid cut, balanced sizes and global ordering identify the central value or pair."
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
        "time": "O(log(min(m,n)+1))",
        "space": "O(1)",
        "complexity": {
          "zh": "只搜索短数组的 m+1 个切口，数组交换只交换引用，不复制内容。",
          "en": "Search only the shorter array’s m+1 cut positions; swapping references creates no copy."
        },
        "python": "class Solution:\n    def findMedianSortedArrays(self, nums1, nums2):\n        a, b = nums1, nums2\n        if len(a) > len(b): a, b = b, a\n        m, n = len(a), len(b)\n        lo, hi = 0, m\n        while lo <= hi:\n            i = (lo + hi) // 2\n            j = (m + n + 1) // 2 - i\n            al = a[i-1] if i else float('-inf')\n            ar = a[i] if i < m else float('inf')\n            bl = b[j-1] if j else float('-inf')\n            br = b[j] if j < n else float('inf')\n            if al > br: hi = i-1\n            elif bl > ar: lo = i+1\n            else:\n                return float(max(al, bl)) if (m+n)%2 else (max(al,bl)+min(ar,br))/2.0\n",
        "java": "class Solution {\n    public double findMedianSortedArrays(int[] a, int[] b) {\n        if(a.length>b.length) { int[] t=a; a=b; b=t; }\n        int m=a.length,n=b.length,lo=0,hi=m;\n        while(lo<=hi) {\n            int i=(lo+hi)/2,j=(m+n+1)/2-i;\n            double al=i==0?Double.NEGATIVE_INFINITY:a[i-1];\n            double ar=i==m?Double.POSITIVE_INFINITY:a[i];\n            double bl=j==0?Double.NEGATIVE_INFINITY:b[j-1];\n            double br=j==n?Double.POSITIVE_INFINITY:b[j];\n            if(al>br) hi=i-1;\n            else if(bl>ar) lo=i+1;\n            else return (m+n)%2==1?Math.max(al,bl):(Math.max(al,bl)+Math.min(ar,br))/2;\n        }\n        throw new IllegalArgumentException(\"Input must be sorted\");\n    }\n}\n",
        "algorithmNotes": {
          "zh": "只在较短数组上二分切分位置，另一数组切分由左半总长度反推。检查 A 左最大≤B 右最小且 B 左最大≤A 右最小；空侧用无穷边界处理，成立后直接由边界值求中位数。",
          "en": "Binary-search a cut in the shorter array and derive the other cut from the required left-side size. Validate both cross-boundary inequalities, using infinite sentinels for empty sides; once valid, the boundary values determine the median."
        }
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
    },
    "examples": [
      {
        "input": "nums1 = [1,4], nums2 = [2]",
        "output": "2.0"
      },
      {
        "input": "nums1 = [1,2], nums2 = [3,4]",
        "output": "2.5"
      },
      {
        "input": "nums1 = [], nums2 = [5]",
        "output": "5.0"
      }
    ]
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
    "methods": [
      {
        "key": "reduce",
        "name": {
          "zh": "反复消去相邻括号（基线）",
          "en": "Repeated adjacent-pair removal (baseline)"
        },
        "intuition": {
          "zh": "合法嵌套总有一个最内层括号对，它们在当前串中相邻。删掉这样的对不会改变外层是否合法。反复删除直到没有变化，就把嵌套匹配转成了字符串化简；代价是多次扫描和复制。\n\n合法串总能消去一个最内层对，直到空串；每次消去也可逆地插回合法对，因此不能把非法串误变为空串。",
          "en": "A valid nested expression has an innermost adjacent pair. Removing such a pair preserves validity of the enclosing structure. Repeated reduction is intuitive, but rescans and copies strings many times. A valid nonempty string always has a removable innermost pair. Each removal preserves validity in both directions, so only valid strings reduce to empty."
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
        "time": "O(n²)",
        "space": "O(n)",
        "complexity": {
          "zh": "深度 n/2 的嵌套可能需要线性轮数，每轮扫描并复制 O(n) 字符；峰值字符串存储 O(n)。大输入优先用栈。",
          "en": "Linear nesting depth may require O(n) rounds, each scanning and copying O(n) characters. Peak string storage is O(n); prefer the stack for large inputs."
        },
        "python": "class Solution:\n    def isValid(self, s):\n        while True:\n            t = s.replace('()', '').replace('[]', '').replace('{}', '')\n            if len(t) == len(s): return not t\n            s = t\n",
        "java": "class Solution {\n    public boolean isValid(String s) {\n        while(true) {\n            String t=s.replace(\"()\", \"\").replace(\"[]\", \"\").replace(\"{}\", \"\");\n            if(t.length()==s.length()) return t.isEmpty();\n            s=t;\n        }\n    }\n}\n",
        "algorithmNotes": {
          "zh": "不断删除相邻的 ()、[]、{}，每轮可能让原本隔开的匹配括号变成相邻。若一整轮长度不再缩短就停止，最终为空才合法；剩余字符说明无法继续组成匹配对。",
          "en": "Repeatedly remove adjacent matching pairs (), [] and {}, which can expose new neighboring pairs. Stop when a full pass no longer shortens the string; validity requires an empty remainder."
        }
      },
      {
        "key": "stack",
        "name": {
          "zh": "栈保存尚未闭合的括号",
          "en": "Stack of unmatched opening brackets"
        },
        "intuition": {
          "zh": "括号闭合是“后打开、先关闭”。栈顶就是下一个右括号唯一允许匹配的对象；只记录各种括号数量无法判断 ([)] 这种交叉情况。遇到左括号先保存，遇到右括号立即验证。\n\n栈始终按出现顺序保存尚未匹配的左括号。合法嵌套的下一次闭合只能消费栈顶，故局部检查完整覆盖合法性要求。",
          "en": "Nesting closes the most recently opened bracket first. A stack exposes exactly that candidate. Counts alone cannot detect crossed pairs such as ([)]; the stack records the necessary order as well as type. The stack contains exactly the unmatched openers in encounter order. The next valid closer must consume its top, making the local checks sufficient."
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
        "time": "O(n)",
        "space": "O(n)",
        "complexity": {
          "zh": "每个字符至多压栈、弹栈一次；全为左括号时最多保存 n 个字符。",
          "en": "Each character is pushed and popped at most once; all-opening input stores n characters."
        },
        "python": "class Solution:\n    def isValid(self, s):\n        stack = []\n        pairs = {')':'(', ']':'[', '}':'{'}\n        for c in s:\n            if c in '([{': stack.append(c)\n            elif not stack or stack.pop() != pairs[c]: return False\n        return not stack\n",
        "java": "import java.util.*;\nclass Solution {\n    public boolean isValid(String s) {\n        Deque<Character> stack=new ArrayDeque<>();\n        for(int i=0;i<s.length();i++) {\n            char c=s.charAt(i);\n            if(c=='(' || c=='[' || c=='{') stack.push(c);\n            else {\n                if(stack.isEmpty()) return false;\n                char wanted=c==')'?'(':c==']'?'[':'{';\n                if(stack.pop()!=wanted) return false;\n            }\n        }\n        return stack.isEmpty();\n    }\n}\n",
        "algorithmNotes": {
          "zh": "左括号入栈，右括号必须与栈顶的左括号类型一致。遇到右括号时栈为空或类型不匹配都立即失败；扫描完还要检查栈是否为空，防止遗留未闭合左括号。",
          "en": "Push opening brackets; each closing bracket must match the type at the top. Fail on an empty stack or mismatched type, and require an empty stack at the end so no opening bracket remains unclosed."
        }
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
    },
    "examples": [
      {
        "input": "s = \"([])\"",
        "output": "true"
      },
      {
        "input": "s = \"([)]\"",
        "output": "false"
      },
      {
        "input": "s = \"(\"",
        "output": "false"
      }
    ]
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
    "methods": [
      {
        "key": "paired",
        "name": {
          "zh": "每层节点缓存前缀最小值",
          "en": "Cache the prefix minimum in every node"
        },
        "intuition": {
          "zh": "只存一个最小值无法应对“弹出最小值”：旧最小值已经丢失。让每个链表栈节点同时保存自身数值和截至该节点的最小值，弹栈时整个历史快照随头指针自动恢复。使用链表也避免动态数组扩容的摊还分析。\n\n归纳地，每个节点的 minimum 是从该节点往下全部值的最小值。新节点由旧最小值更新；弹出只恢复已正确保存的前缀。",
          "en": "One global minimum loses the previous minimum when its owner is popped. Store both the value and the minimum of the prefix in each linked stack node. Popping restores the previous snapshot automatically; linked nodes avoid dynamic-array resizing costs. Inductively, every node stores the minimum of itself and everything below it. Push preserves this invariant; pop restores an already correct node."
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
        "time": "O(1) per operation",
        "space": "O(n)",
        "complexity": {
          "zh": "每次只分配或移动一个节点，固定次数读写；n 为当前元素数，链式节点总空间 O(n)。",
          "en": "Each operation touches or allocates one node. With n current values, nodes occupy O(n) total space."
        },
        "python": "class MinStack:\n    def __init__(self):\n        self.head = None\n    def push(self, val):\n        low = val if self.head is None else min(val, self.head[1])\n        self.head = (val, low, self.head)\n    def pop(self):\n        self.head = self.head[2]\n    def top(self):\n        return self.head[0]\n    def getMin(self):\n        return self.head[1]\n",
        "java": "class MinStack {\n    private static class Node {\n        int value, minimum; Node next;\n        Node(int v,int m,Node n) { value=v; minimum=m; next=n; }\n    }\n    private Node head;\n    public MinStack() {}\n    public void push(int val) { head=new Node(val,head==null?val:Math.min(val,head.minimum),head); }\n    public void pop() { head=head.next; }\n    public int top() { return head.value; }\n    public int getMin() { return head.minimum; }\n}\n",
        "algorithmNotes": {
          "zh": "每次压入一对“当前值、截至该位置的最小值”，新最小值由当前值和旧栈顶最小值取较小者。弹栈同时删除两项信息，因此上一个位置的历史最小值会自动恢复。",
          "en": "Each entry pairs its value with the minimum up to that position. Compute the new minimum from the value and previous top's minimum; popping removes both pieces together, automatically restoring the prior minimum."
        }
      },
      {
        "key": "two-stacks",
        "name": {
          "zh": "数值栈与历史最小栈",
          "en": "Value stack plus a history-of-minima stack"
        },
        "intuition": {
          "zh": "另一种组织方式把全部数值和最小值变化分开。只有新值不大于当前最小时才进入辅助栈。注意必须使用“不大于”：相同最小值出现两次，弹出其中一个后还应留有另一份记录。\n\n辅助栈记录仍存活的最小值历史，包含重复项。移除当前最小的一份记录后，辅助栈顶恰是剩余元素的最小值。",
          "en": "Separate ordinary values from minimum history. Push into the minimum stack whenever the new value is no greater than the current minimum. Equality matters: two equal minima require two records so popping one does not discard both. The minima stack tracks surviving record minima, including ties. Removing one matching record restores the minimum of the remaining values."
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
        "time": "O(1) per operation",
        "space": "O(n)",
        "complexity": {
          "zh": "链式栈每次固定次数节点操作，最坏 n 个普通节点加 n 个最小值节点。",
          "en": "Linked stacks perform a fixed number of node operations; at most n value nodes and n minimum nodes are needed."
        },
        "python": "class MinStack:\n    def __init__(self):\n        self.values = self.mins = None\n    def push(self, val):\n        self.values = (val, self.values)\n        if self.mins is None or val <= self.mins[0]:\n            self.mins = (val, self.mins)\n    def pop(self):\n        value = self.values[0]\n        self.values = self.values[1]\n        if value == self.mins[0]: self.mins = self.mins[1]\n    def top(self):\n        return self.values[0]\n    def getMin(self):\n        return self.mins[0]\n",
        "java": "import java.util.*;\nclass MinStack {\n    private Deque<Integer> values=new LinkedList<>(), mins=new LinkedList<>();\n    public MinStack() {}\n    public void push(int val) {\n        values.push(val);\n        if(mins.isEmpty() || val<=mins.peek()) mins.push(val);\n    }\n    public void pop() { int v=values.pop(); if(v==mins.peek()) mins.pop(); }\n    public int top() { return values.peek(); }\n    public int getMin() { return mins.peek(); }\n}\n",
        "algorithmNotes": {
          "zh": "普通栈保存全部值，辅助栈只记录刷新或等于当前最小值的元素。相等值也要压入辅助栈；弹出的值等于辅助栈顶时同步弹出，才能正确处理重复最小值。",
          "en": "The main stack stores all values, while the minimum stack records new or equal minima. Include equal values so duplicate minima survive correctly; pop the auxiliary stack whenever its top equals the removed value."
        }
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
    },
    "examples": [
      {
        "input": "operations = [\"MinStack\",\"push\",\"push\",\"getMin\",\"pop\",\"top\"], arguments = [[],[3],[1],[],[],[]]",
        "output": "[null,null,null,1,null,3]",
        "note": {
          "zh": "输出逐项对应操作；构造和无返回值的操作用 null 表示。",
          "en": "Outputs correspond to operations; constructors and void operations are shown as null."
        }
      },
      {
        "input": "operations = [\"MinStack\",\"push\",\"push\",\"pop\",\"getMin\"], arguments = [[],[-2],[-2],[],[]]",
        "output": "[null,null,null,null,-2]",
        "note": {
          "zh": "输出逐项对应操作；构造和无返回值的操作用 null 表示。",
          "en": "Outputs correspond to operations; constructors and void operations are shown as null."
        }
      },
      {
        "input": "operations = [\"MinStack\",\"push\",\"top\",\"getMin\"], arguments = [[],[8],[],[]]",
        "output": "[null,null,8,8]",
        "note": {
          "zh": "输出逐项对应操作；构造和无返回值的操作用 null 表示。",
          "en": "Outputs correspond to operations; constructors and void operations are shown as null."
        }
      }
    ]
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
    "methods": [
      {
        "key": "recursive",
        "name": {
          "zh": "递归下降解析",
          "en": "Recursive-descent parsing"
        },
        "intuition": {
          "zh": "每对方括号定义一个独立子问题：读出这一层的文本，到右括号就返回。共享游标保证字符不会从头重读；数字连续累积，遇到左括号才确定完整倍数。用片段列表或 StringBuilder 避免逐字符不可变拼接。\n\n每次递归恰好消费一个合法括号片段；内层按定义解码后再重复，符合编码语义。顺序追加保留并列片段顺序。",
          "en": "Each bracket pair is a subproblem: parse its text until the matching closer. A shared cursor prevents restarting scans. Accumulate all digits before descending, then append the repeated decoded child using buffered construction. Every call consumes exactly one bracketed fragment. Recursively correct child expansion followed by repetition implements its meaning; sequential appends preserve order."
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
        "time": "O(n + Ld)",
        "space": "O(n + L)",
        "complexity": {
          "zh": "n 为编码长，L 为输出长，d 为最大嵌套深度（至少按 1 计）。同一输出字符可能在 d 层构造中被复制，因此给出保守上界；缓冲及递归栈峰值 O(n+L)，含输出。",
          "en": "Let n be encoded length, L decoded length, and d=max(1,nesting depth). A character may be copied at d levels, giving this conservative bound. Live buffers and recursion require O(n+L), including output."
        },
        "python": "class Solution:\n    def decodeString(self, s):\n        i = 0\n        def parse():\n            nonlocal i\n            pieces = []\n            while i < len(s) and s[i] != ']':\n                if s[i].isdigit():\n                    k = 0\n                    while i < len(s) and s[i].isdigit():\n                        k = k * 10 + int(s[i]); i += 1\n                    i += 1\n                    child = parse()\n                    i += 1\n                    pieces.append(child * k)\n                else:\n                    pieces.append(s[i]); i += 1\n            return ''.join(pieces)\n        return parse()\n",
        "java": "class Solution {\n    private int i;\n    public String decodeString(String s) { i=0; return parse(s); }\n    private String parse(String s) {\n        StringBuilder out=new StringBuilder();\n        while(i<s.length() && s.charAt(i)!=']') {\n            if(Character.isDigit(s.charAt(i))) {\n                int k=0;\n                while(i<s.length() && Character.isDigit(s.charAt(i))) k=k*10+s.charAt(i++)-'0';\n                i++;\n                String child=parse(s); i++;\n                for(int t=0;t<k;t++) out.append(child);\n            } else out.append(s.charAt(i++));\n        }\n        return out.toString();\n    }\n}\n",
        "algorithmNotes": {
          "zh": "递归解析一层字符串，遇到数字先读完全部位数，再进入方括号内的下一层。遇到右括号返回当前片段，调用者把片段重复相应次数；普通字母直接追加到当前结果。",
          "en": "Parse one nesting level per call. Read every digit of a repeat count before recursively parsing its bracketed fragment; return at a closing bracket, letting the caller repeat the fragment, while ordinary letters append directly."
        }
      },
      {
        "key": "stack",
        "name": {
          "zh": "显式栈保存外层上下文",
          "en": "Explicit stack of outer contexts"
        },
        "intuition": {
          "zh": "递归隐藏保存了“外层已构造文本和重复次数”。把它们显式放进栈，就能在读到 [ 时暂停外层、开始内层，在 ] 时恢复外层。整个输入只向前扫描，嵌套深度不再依赖函数调用栈。\n\n栈顶总是最近未闭合括号的外层，所以每个 ] 只完成对应内层；恢复的文本正好是已读前缀的正确展开。",
          "en": "Make the recursive call context explicit: save the outer buffer and repetition count on a stack. An opening bracket starts a fresh inner buffer; a closer restores the outer buffer and appends the repeated inner result. The top frame belongs to the nearest unmatched opener. Each closer finishes exactly its own child and restores the correct decoded prefix."
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
        "time": "O(n + Ld)",
        "space": "O(n + L)",
        "complexity": {
          "zh": "缓冲构造避免普通字符的平方级拼接，但嵌套重复仍可能在多层复制字符，保守 O(n+Ld)；显式栈和当前缓冲总峰值 O(n+L)，含输出。",
          "en": "Buffering avoids quadratic single-character concatenation, though nesting still copies text across levels. The conservative bound is O(n+Ld); live frames and buffers use O(n+L), including output."
        },
        "python": "class Solution:\n    def decodeString(self, s):\n        stack, pieces, k = [], [], 0\n        for c in s:\n            if c.isdigit(): k = 10*k + int(c)\n            elif c == '[':\n                stack.append((pieces, k)); pieces, k = [], 0\n            elif c == ']':\n                child = ''.join(pieces)\n                pieces, count = stack.pop()\n                pieces.append(child * count)\n            else: pieces.append(c)\n        return ''.join(pieces)\n",
        "java": "import java.util.*;\nclass Solution {\n    public String decodeString(String s) {\n        Deque<StringBuilder> buffers=new ArrayDeque<>();\n        Deque<Integer> counts=new ArrayDeque<>();\n        StringBuilder current=new StringBuilder(); int k=0;\n        for(int i=0;i<s.length();i++) {\n            char c=s.charAt(i);\n            if(Character.isDigit(c)) k=10*k+c-'0';\n            else if(c=='[') { buffers.push(current); counts.push(k); current=new StringBuilder(); k=0; }\n            else if(c==']') {\n                String child=current.toString(); current=buffers.pop(); int count=counts.pop();\n                for(int t=0;t<count;t++) current.append(child);\n            } else current.append(c);\n        }\n        return current.toString();\n    }\n}\n",
        "algorithmNotes": {
          "zh": "遇到左括号时保存外层已生成字符串和重复次数，并清空当前片段。遇到右括号时弹出外层状态，将当前片段重复后接回；多位次数需逐位执行 count=count*10+digit。",
          "en": "At an opening bracket, save the outer string and repeat count, then reset the current fragment. At a closing bracket, restore the outer state and append the repeated fragment; accumulate multi-digit counts as count*10+digit."
        }
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
    },
    "examples": [
      {
        "input": "s = \"2[a3[b]]\"",
        "output": "\"abbbabbb\""
      },
      {
        "input": "s = \"3[x]y\"",
        "output": "\"xxxy\""
      },
      {
        "input": "s = \"abc\"",
        "output": "\"abc\""
      }
    ]
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
    "methods": [
      {
        "key": "scan",
        "name": {
          "zh": "逐天向后查找（基线）",
          "en": "Forward search for every day (baseline)"
        },
        "intuition": {
          "zh": "对今天来说，答案不是未来最高温，而是从明天开始第一个更高温。按日期向后搜索，找到就停止。这个直接版本能清楚表达“第一次”，也便于校验栈解法，但降序温度会反复扫描。\n\n按 j 递增检查，第一次成功必定是最近更暖的一天；遍历完仍没找到就按定义保留 0。",
          "en": "The answer is the first warmer day, not the warmest future day. Scan forward from tomorrow and stop at the first qualifying value. This states the requirement directly, but descending temperatures force repeated scans. Checking j in increasing order makes the first success the nearest warmer day; no success means zero."
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
        "time": "O(n²)",
        "space": "O(1) auxiliary; O(n) output",
        "complexity": {
          "zh": "非递增数组需要 n(n−1)/2 次比较。除答案数组外只用下标；此基线在大输入可能超时。",
          "en": "A nonincreasing array requires n(n−1)/2 comparisons. Indices use constant extra space; this baseline may time out on large inputs."
        },
        "python": "class Solution:\n    def dailyTemperatures(self, temperatures):\n        n = len(temperatures); ans = [0]*n\n        for i in range(n):\n            for j in range(i+1, n):\n                if temperatures[j] > temperatures[i]:\n                    ans[i] = j-i; break\n        return ans\n",
        "java": "class Solution {\n    public int[] dailyTemperatures(int[] t) {\n        int n=t.length; int[] ans=new int[n];\n        for(int i=0;i<n;i++) for(int j=i+1;j<n;j++) if(t[j]>t[i]) { ans[i]=j-i; break; }\n        return ans;\n    }\n}\n",
        "algorithmNotes": {
          "zh": "对每一天从次日开始向右搜索，第一个严格更高的温度就决定等待天数。相等温度不能结束搜索；找不到时保留 0，找到后返回的是下标差而不是温度差。",
          "en": "Search forward from the next day for the first strictly higher temperature. Equal values do not qualify; retain zero if none exists, and record the index distance rather than the temperature difference."
        }
      },
      {
        "key": "monotonic",
        "name": {
          "zh": "单调栈批量解决等待中的日期",
          "en": "Monotonic stack of waiting days"
        },
        "intuition": {
          "zh": "把尚未找到更暖日子的下标压入栈，栈中温度从底到顶不递增。当今天更暖时，它能同时回答栈顶的若干日期：这些日期此前都没有遇到更暖日子，今天就是第一次。相等温度不能弹栈。\n\n栈内日期都没有在已扫描范围找到更暖值。第一次触发弹出的温度就是其最近更暖值；栈的单调性允许连续安全弹出。",
          "en": "Keep unresolved days in a stack whose temperatures are nonincreasing. A warmer arrival resolves every cooler day at the top: none found a warmer day earlier, so today is their first answer. Equal values must remain unresolved. Stack entries have no warmer day in the scanned prefix. Their first popping event is therefore their nearest warmer day, and monotonic order makes consecutive pops safe."
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
        "time": "O(n)",
        "space": "O(n) auxiliary; O(n) output",
        "complexity": {
          "zh": "每个下标入栈一次、出栈至多一次；虽然有 while，累计操作仅 O(n)。",
          "en": "Every index is pushed once and popped at most once, so all while-loop iterations together are linear."
        },
        "python": "class Solution:\n    def dailyTemperatures(self, temperatures):\n        ans = [0]*len(temperatures); stack = []\n        for i, value in enumerate(temperatures):\n            while stack and value > temperatures[stack[-1]]:\n                j = stack.pop(); ans[j] = i-j\n            stack.append(i)\n        return ans\n",
        "java": "import java.util.*;\nclass Solution {\n    public int[] dailyTemperatures(int[] t) {\n        int[] ans=new int[t.length]; Deque<Integer> stack=new ArrayDeque<>();\n        for(int i=0;i<t.length;i++) {\n            while(!stack.isEmpty() && t[i]>t[stack.peek()]) { int j=stack.pop(); ans[j]=i-j; }\n            stack.push(i);\n        }\n        return ans;\n    }\n}\n",
        "algorithmNotes": {
          "zh": "栈中保存还没找到更高温度的日期下标，温度从栈底到栈顶不增。新温度更高时连续弹出较低温度日期，并填入当前下标差；未弹出的日期继续等待，最终剩余项为 0。",
          "en": "Store indices of days still awaiting a warmer day, with nonincreasing temperatures. A warmer arrival pops all lower-temperature days and records their index distances; unresolved days remain zero at the end."
        }
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
    },
    "examples": [
      {
        "input": "temperatures = [30,40,35,50]",
        "output": "[1,2,1,0]"
      },
      {
        "input": "temperatures = [50,40,30]",
        "output": "[0,0,0]"
      },
      {
        "input": "temperatures = [30,30]",
        "output": "[0,0]"
      }
    ]
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
    "methods": [
      {
        "key": "intervals",
        "name": {
          "zh": "枚举区间并维护最低高度（基线）",
          "en": "Enumerate intervals with a running minimum (baseline)"
        },
        "intuition": {
          "zh": "每个矩形由一个连续区间和高度决定。区间固定后，选其中最低柱高就是最佳高度。固定左端、逐步右扩，同时更新最低值，避免每次重新扫描整个区间。\n\n每个连续区间都被枚举一次，且计算了该区间可行的最大高度；任意最优矩形的区间必在其中。",
          "en": "A rectangle chooses a consecutive interval. For that interval, the shortest bar gives the greatest feasible height. Fix the left endpoint and extend right while maintaining this minimum, rather than recomputing it from scratch. Every consecutive interval is considered with its maximum feasible height, including the interval of an optimal rectangle."
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
        "time": "O(n²)",
        "space": "O(1)",
        "complexity": {
          "zh": "共有 n(n+1)/2 个区间，每次 O(1) 更新最低值；大输入宜用单调栈。",
          "en": "There are n(n+1)/2 intervals and constant work per extension; use the stack on large input."
        },
        "python": "class Solution:\n    def largestRectangleArea(self, heights):\n        best = 0\n        for l in range(len(heights)):\n            low = heights[l]\n            for r in range(l, len(heights)):\n                low = min(low, heights[r])\n                best = max(best, low*(r-l+1))\n        return best\n",
        "java": "class Solution {\n    public int largestRectangleArea(int[] h) {\n        int best=0;\n        for(int l=0;l<h.length;l++) {\n            int low=h[l];\n            for(int r=l;r<h.length;r++) { low=Math.min(low,h[r]); best=Math.max(best,low*(r-l+1)); }\n        }\n        return best;\n    }\n}\n",
        "algorithmNotes": {
          "zh": "固定区间左端后逐步扩展右端，同时维护区间最小柱高。该最小值乘以区间宽度就是以此区间为底的最大矩形，遍历所有区间并取最大，不要求矩形高度等于某个端点。",
          "en": "Extend each fixed left endpoint rightward while maintaining the interval's minimum height. Multiply it by the interval width for that interval's largest rectangle, and maximize over all intervals, not only endpoint heights."
        }
      },
      {
        "key": "monotonic",
        "name": {
          "zh": "递增栈确定左右边界",
          "en": "Increasing stack to determine boundaries"
        },
        "intuition": {
          "zh": "反过来固定矩形高度：某根柱子能延伸多远？直到遇到更矮柱子。递增下标栈暂存还没确定右边界的柱子；当矮柱到来，较高栈顶的右边界就确定。使用 ≥ 弹栈把相等高度交给更靠右的一根统一覆盖。\n\n弹出时左右边界之间的柱高均不低于该高度，计算面积合法。更高柱遇到真正更矮右界时取到最大宽度；相等柱由最后一根继续承担更宽区间，故不会遗漏最优值。",
          "en": "Fix a candidate height and ask how far it can extend before a shorter bar blocks it. An increasing stack retains bars awaiting a right boundary. A lower arrival settles them. Popping equal heights transfers their full-width opportunity to the later equal bar. Each popped bar yields a feasible rectangle between the boundaries. A strictly lower arrival finalizes its maximal width; equal-height candidates transfer to the last equal bar, preserving any wider optimum."
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
        "time": "O(n)",
        "space": "O(n)",
        "complexity": {
          "zh": "每根柱子只入栈、出栈一次；栈最多 n 个下标，虚拟柱不创建数组副本。",
          "en": "Each bar enters and leaves the stack once. The stack stores up to n indices; the sentinel needs no copied array."
        },
        "python": "class Solution:\n    def largestRectangleArea(self, heights):\n        stack = []; best = 0; n = len(heights)\n        for i in range(n+1):\n            current = heights[i] if i<n else 0\n            while stack and heights[stack[-1]] >= current:\n                h = heights[stack.pop()]\n                left = stack[-1] if stack else -1\n                best = max(best, h*(i-left-1))\n            if i<n: stack.append(i)\n        return best\n",
        "java": "import java.util.*;\nclass Solution {\n    public int largestRectangleArea(int[] h) {\n        Deque<Integer> stack=new ArrayDeque<>(); int best=0,n=h.length;\n        for(int i=0;i<=n;i++) {\n            int cur=i<n?h[i]:0;\n            while(!stack.isEmpty() && h[stack.peek()]>=cur) {\n                int height=h[stack.pop()],left=stack.isEmpty()?-1:stack.peek();\n                best=Math.max(best,height*(i-left-1));\n            }\n            if(i<n) stack.push(i);\n        }\n        return best;\n    }\n}\n",
        "algorithmNotes": {
          "zh": "保持栈中柱高单调，新柱更矮时弹出受限的高柱。弹出柱的高度乘以“当前下标减新栈顶下标减一”得到最大宽度；末尾用高度 0 的哨兵结算未弹出的柱。",
          "en": "Maintain a monotone stack of bar indices and pop taller bars when a lower bar arrives. The popped height spans currentIndex−newStackTop−1 columns; a final zero-height sentinel settles remaining bars."
        }
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
    },
    "examples": [
      {
        "input": "heights = [2,1,4,5,1,3]",
        "output": "8"
      },
      {
        "input": "heights = [0]",
        "output": "0"
      },
      {
        "input": "heights = [3,3]",
        "output": "6"
      }
    ]
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
    "methods": [
      {
        "key": "heap",
        "name": {
          "zh": "容量为 k 的小根堆",
          "en": "Size-k min-heap"
        },
        "intuition": {
          "zh": "只关心最大的 k 个数，不需要它们内部全部有序。堆顶保存这 k 个数中最小者，也就是当前第 k 大。新值进入后若超过 k 个，淘汰最小者；被淘汰的值不可能再成为最终前 k 大。\n\n处理任意前缀后，堆恰保留该前缀最大的 min(k,前缀长度) 个值；加入并淘汰最小值保持此性质。",
          "en": "Keep only the largest k values seen. Their smallest value, exposed by a min-heap, is the kth largest so far. Insert each arrival and discard the minimum when the heap grows past k; discarded candidates can never displace the retained k larger values. After every prefix, the heap retains its largest min(k,prefix length) values. Insert-and-discard preserves the invariant."
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
        "time": "O(n log(k+1))",
        "space": "O(k)",
        "complexity": {
          "zh": "n 次插入和至多 n 次弹出，堆规模不超过 k+1；不修改输入。",
          "en": "There are n insertions and at most n removals in a heap of size at most k+1. The input is unchanged."
        },
        "python": "import heapq\nclass Solution:\n    def findKthLargest(self, nums, k):\n        heap = []\n        for x in nums:\n            heapq.heappush(heap, x)\n            if len(heap)>k: heapq.heappop(heap)\n        return heap[0]\n",
        "java": "import java.util.*;\nclass Solution {\n    public int findKthLargest(int[] nums,int k) {\n        PriorityQueue<Integer> heap=new PriorityQueue<>();\n        for(int x:nums) { heap.offer(x); if(heap.size()>k) heap.poll(); }\n        return heap.peek();\n    }\n}\n",
        "algorithmNotes": {
          "zh": "最小堆只保留当前最大的 k 个元素，堆顶是这 k 个中最小的。每加入一个数，若大小超过 k 就弹出堆顶；最后堆顶恰是第 k 大，重复元素按出现次数参与排名。",
          "en": "Keep the largest k values in a min-heap whose root is the smallest retained value. Pop whenever insertion grows it beyond k; the final root is the kth largest, counting duplicates as separate occurrences."
        }
      },
      {
        "key": "quickselect",
        "name": {
          "zh": "随机三路快速选择",
          "en": "Randomized three-way quickselect"
        },
        "intuition": {
          "zh": "第 k 大等于升序下标 n−k。围绕随机基准把当前区间分成小于、等于、大于三部分：目标落在等值区就结束，否则只继续处理目标所在一侧。三路划分能一次处理大量重复值，不必像排序那样递归两侧。\n\n分区后每个小值排在所有等值和大值之前，因此等值区占据的排名已经确定；只保留包含目标排名的分区不会丢失答案。",
          "en": "The kth largest has ascending index n−k. Partition around a random pivot into smaller, equal, and larger regions. Stop if the target lies in the equal region; otherwise continue only in its side. Three-way partitioning handles duplicates together and avoids sorting irrelevant regions. Partitioning fixes the rank range occupied by pivot-equal values. Keeping the region containing the target rank cannot discard the answer."
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
        "time": "Expected O(n); worst O(n²)",
        "space": "O(1)",
        "complexity": {
          "zh": "随机基准的期望剩余规模使总扫描为 O(n)，极端连续失衡仍可能 O(n²)。迭代实现只用常数变量，原地改变 nums；若要保留输入需另加 O(n) 副本。",
          "en": "Random pivots give expected linear total scanning, but repeatedly poor pivots permit quadratic worst-case time. Iteration uses constant auxiliary space and mutates nums; preserving input would require an O(n) copy."
        },
        "python": "import random\nclass Solution:\n    def findKthLargest(self, nums, k):\n        target = len(nums)-k; lo, hi = 0, len(nums)-1\n        while True:\n            pivot = nums[random.randint(lo, hi)]\n            lt = i = lo; gt = hi\n            while i <= gt:\n                if nums[i] < pivot:\n                    nums[lt], nums[i] = nums[i], nums[lt]; lt += 1; i += 1\n                elif nums[i] > pivot:\n                    nums[i], nums[gt] = nums[gt], nums[i]; gt -= 1\n                else: i += 1\n            if target < lt: hi = lt-1\n            elif target > gt: lo = gt+1\n            else: return pivot\n",
        "java": "import java.util.concurrent.ThreadLocalRandom;\nclass Solution {\n    private void swap(int[] a,int i,int j) { int t=a[i]; a[i]=a[j]; a[j]=t; }\n    public int findKthLargest(int[] a,int k) {\n        int target=a.length-k,lo=0,hi=a.length-1;\n        while(true) {\n            int pivot=a[ThreadLocalRandom.current().nextInt(lo,hi+1)],lt=lo,i=lo,gt=hi;\n            while(i<=gt) {\n                if(a[i]<pivot) swap(a,lt++,i++);\n                else if(a[i]>pivot) swap(a,i,gt--);\n                else i++;\n            }\n            if(target<lt) hi=lt-1;\n            else if(target>gt) lo=gt+1;\n            else return pivot;\n        }\n    }\n}\n",
        "algorithmNotes": {
          "zh": "把第 k 大换算成升序下标 n−k，每次按枢轴把较小、相等、较大的区域分开。目标落在相等区可直接返回，否则只继续处理目标所在的一侧，不必把另一侧完全排好序。",
          "en": "Convert kth largest to ascending index n−k and partition around a pivot into smaller, equal and larger regions. Return if the target lies in the equal region; otherwise continue only on its side without sorting the other side."
        }
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
    },
    "examples": [
      {
        "input": "nums = [3,1,5,2,4], k = 2",
        "output": "4"
      },
      {
        "input": "nums = [5,5,1], k = 2",
        "output": "5"
      },
      {
        "input": "nums = [7], k = 1",
        "output": "7"
      }
    ]
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
    "methods": [
      {
        "key": "heap",
        "name": {
          "zh": "频次表加小根堆",
          "en": "Frequency map and min-heap"
        },
        "intuition": {
          "zh": "先把“原始元素”转成“值、频次”记录。此后问题变成从 u 条记录中选频次最大的 k 条。小根堆顶是当前最容易被淘汰的低频记录，保留 k 条即可，不必对全部记录排序。\n\n频次表准确描述每个值，堆保持已处理记录中最大的 k 个频次；所有记录处理完即得到目标集合。",
          "en": "Convert the input into u (value,frequency) records, then retain the k largest frequencies. A min-heap exposes the weakest retained candidate, allowing selection without sorting every record. The map gives exact counts and the heap retains the k highest counts among processed records, yielding the required set."
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
        "time": "Expected O(n + u log(k+1))",
        "space": "O(u + k)",
        "complexity": {
          "zh": "u 为不同值数。哈希统计期望 O(n)，堆处理 O(u log(k+1))。k 接近 u 时并不保证满足优于 O(n log n) 的进阶要求；桶法更合适。",
          "en": "Here u is the distinct count. Hash counting is expected O(n), followed by heap work. For k near u this does not guarantee the follow-up improvement; buckets do."
        },
        "python": "from collections import Counter\nimport heapq\nclass Solution:\n    def topKFrequent(self, nums, k):\n        heap=[]\n        for value, count in Counter(nums).items():\n            heapq.heappush(heap,(count,value))\n            if len(heap)>k: heapq.heappop(heap)\n        return [value for count,value in heap]\n",
        "java": "import java.util.*;\nclass Solution {\n    public int[] topKFrequent(int[] nums,int k) {\n        Map<Integer,Integer> count=new HashMap<>();\n        for(int x:nums) count.merge(x,1,Integer::sum);\n        PriorityQueue<int[]> heap=new PriorityQueue<>(Comparator.comparingInt(a->a[0]));\n        for(Map.Entry<Integer,Integer> e:count.entrySet()) {\n            heap.offer(new int[]{e.getValue(),e.getKey()}); if(heap.size()>k) heap.poll();\n        }\n        int[] out=new int[k]; for(int i=0;i<k;i++) out[i]=heap.poll()[1];\n        return out;\n    }\n}\n",
        "algorithmNotes": {
          "zh": "先统计频次，堆中保存最多 k 个“频次、数值”条目。按频次而非数值淘汰堆顶，最终提取剩下的数值；题目允许任意顺序输出，不需要再按数值排序。",
          "en": "Count frequencies first, then retain at most k frequency-value entries. Evict by frequency rather than numeric value, and extract the retained values; the output order is unrestricted."
        }
      },
      {
        "key": "bucket",
        "name": {
          "zh": "按频次分桶",
          "en": "Buckets indexed by frequency"
        },
        "intuition": {
          "zh": "一个值的频次只能在 1..n 之间，因此频次本身可以当数组下标。将相同频次的值放在同一桶中，然后从高频桶向低频桶收集，就免去了比较排序与堆维护。\n\n遍历顺序保证先取出的频次不小于后取出的频次；因此前 k 个值就是最高频集合。唯一答案条件排除了截断边界的歧义。",
          "en": "A frequency lies between one and n, so it can be used directly as an array index. Group values by frequency and visit buckets in descending order. This removes both comparison sorting and heap maintenance. Descending bucket order guarantees that no later item has a higher frequency. The first k items form the required set; uniqueness removes ambiguity at the cutoff."
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
        "time": "Expected O(n + u)",
        "space": "O(n + u)",
        "complexity": {
          "zh": "哈希计数期望 O(n)，桶数组初始化及扫描 O(n)，每个不同值入桶一次 O(u)。包括空桶也要计入 O(n) 空间。",
          "en": "Hash counting is expected O(n); allocating and scanning buckets costs O(n), and placing u distinct values costs O(u). Empty buckets still count toward O(n) storage."
        },
        "python": "from collections import Counter\nclass Solution:\n    def topKFrequent(self, nums, k):\n        buckets=[[] for _ in range(len(nums)+1)]\n        for value,count in Counter(nums).items(): buckets[count].append(value)\n        out=[]\n        for count in range(len(nums),0,-1):\n            for value in buckets[count]:\n                out.append(value)\n                if len(out)==k: return out\n",
        "java": "import java.util.*;\nclass Solution {\n    public int[] topKFrequent(int[] nums,int k) {\n        Map<Integer,Integer> count=new HashMap<>();\n        for(int x:nums) count.merge(x,1,Integer::sum);\n        List<List<Integer>> buckets=new ArrayList<>();\n        for(int i=0;i<=nums.length;i++) buckets.add(new ArrayList<>());\n        for(Map.Entry<Integer,Integer> e:count.entrySet()) buckets.get(e.getValue()).add(e.getKey());\n        int[] out=new int[k]; int p=0;\n        for(int c=nums.length;c>0;c--) for(int x:buckets.get(c)) { out[p++]=x; if(p==k) return out; }\n        return out;\n    }\n}\n",
        "algorithmNotes": {
          "zh": "频次不超过数组长度，可以用频次作为桶下标，同频的不同值放进同一桶。由高频桶向低频桶扫描，收集到 k 个值后停止；桶里存的是不同值，不是重复的原数组元素。",
          "en": "A frequency cannot exceed the array length, so use it as a bucket index and group distinct values by count. Scan buckets from high to low until k values are collected; buckets contain distinct values rather than repeated input entries."
        }
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
    },
    "examples": [
      {
        "input": "nums = [1,1,2,2,2,3], k = 2",
        "output": "[1,2]",
        "note": {
          "zh": "这是一个合法输出，题目允许结果按其他合法顺序排列。",
          "en": "This is one valid output; other permitted result orders are accepted."
        }
      },
      {
        "input": "nums = [7], k = 1",
        "output": "[7]",
        "note": {
          "zh": "这是一个合法输出，题目允许结果按其他合法顺序排列。",
          "en": "This is one valid output; other permitted result orders are accepted."
        }
      },
      {
        "input": "nums = [-1,-1,2,3], k = 1",
        "output": "[-1]",
        "note": {
          "zh": "这是一个合法输出，题目允许结果按其他合法顺序排列。",
          "en": "This is one valid output; other permitted result orders are accepted."
        }
      }
    ]
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
    "methods": [
      {
        "key": "ordered",
        "name": {
          "zh": "二分定位，有序数组插入",
          "en": "Binary-search insertion into a sorted list"
        },
        "intuition": {
          "zh": "保持整个序列有序，中位数就能按下标直接读取。插入时可以用二分找到位置，但数组中后面的元素仍需后移，所以插入并不是 O(log n)。这个方案适合解释从排序到双堆的优化。\n\n二分定位后插入保持数组有序，因此中间下标始终符合中位数定义。",
          "en": "Keep the entire sequence sorted so median lookup is direct. Binary search locates each insertion point, but shifting later array entries still costs linear time. This provides a clear baseline for the two-heap improvement. Insertion preserves sorted order, so the central index or pair always satisfies the median definition."
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
        "time": "addNum O(n); findMedian O(1)",
        "space": "O(n)",
        "complexity": {
          "zh": "n 为已有元素数。二分 O(log n)，移动元素最坏 O(n)，总插入时间由移动主导；查询不排序。",
          "en": "For n existing values, binary search is logarithmic but worst-case shifting is linear and dominates insertion. Queries perform no sorting."
        },
        "python": "from bisect import insort_left\nclass MedianFinder:\n    def __init__(self): self.values=[]\n    def addNum(self, num): insort_left(self.values,num)\n    def findMedian(self):\n        n=len(self.values)\n        return float(self.values[n//2]) if n%2 else (self.values[n//2-1]+self.values[n//2])/2.0\n",
        "java": "import java.util.*;\nclass MedianFinder {\n    private List<Integer> values=new ArrayList<>();\n    public MedianFinder() {}\n    public void addNum(int num) {\n        int lo=0,hi=values.size();\n        while(lo<hi) { int m=(lo+hi)/2; if(values.get(m)<num) lo=m+1; else hi=m; }\n        values.add(lo,num);\n    }\n    public double findMedian() {\n        int n=values.size(); return n%2==1?values.get(n/2):((double)values.get(n/2-1)+values.get(n/2))/2;\n    }\n}\n",
        "algorithmNotes": {
          "zh": "插入时二分找到位置，把新数放入有序容器中，重复值也保留。查询中位数只需读取中间一项或两项，但插入后移动后续元素的代价仍是线性，不能因用了二分就称插入为对数时间。",
          "en": "Binary-search an insertion position and retain duplicates in sorted order. Median queries read one or two middle values, but shifting entries still makes insertion linear despite the logarithmic position search."
        }
      },
      {
        "key": "two-heaps",
        "name": {
          "zh": "双堆维护较小半与较大半",
          "en": "Two heaps for the lower and upper halves"
        },
        "intuition": {
          "zh": "中位数只依赖两半的边界，不需要每半内部完全有序。小半用大根堆暴露最大值，大半用小根堆暴露最小值。让小半与大半等长，或仅多一个元素，就能直接从堆顶读取中位数。\n\n移堆顶保持小半所有值≤大半所有值；再平衡保证数量差为 0 或 1。两条不变量共同确定正确中位数。",
          "en": "Only the boundary between the halves matters. A max-heap exposes the largest lower-half value, and a min-heap exposes the smallest upper-half value. Keep the lower half equally sized or one element larger, then read the median from their tops. Transferring extrema preserves lower≤upper ordering, and rebalancing keeps the permitted size difference. Together these invariants identify the correct median."
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
        "time": "addNum O(log n) amortized; findMedian O(1)",
        "space": "O(n)",
        "complexity": {
          "zh": "每次插入固定次数堆操作，堆调整 O(log n)；底层动态数组可能扩容，因此严格说是摊还界。两堆共存储所有 n 个数。",
          "en": "Each insertion uses a constant number of logarithmic heap operations. Dynamic-array resizing makes this an amortized bound. Both heaps together store all n values."
        },
        "python": "import heapq\nclass MedianFinder:\n    def __init__(self): self.low=[]; self.high=[]\n    def addNum(self, num):\n        heapq.heappush(self.low,-num)\n        heapq.heappush(self.high,-heapq.heappop(self.low))\n        if len(self.high)>len(self.low): heapq.heappush(self.low,-heapq.heappop(self.high))\n    def findMedian(self):\n        return float(-self.low[0]) if len(self.low)>len(self.high) else (-self.low[0]+self.high[0])/2.0\n",
        "java": "import java.util.*;\nclass MedianFinder {\n    private PriorityQueue<Integer> low=new PriorityQueue<>(Comparator.reverseOrder());\n    private PriorityQueue<Integer> high=new PriorityQueue<>();\n    public MedianFinder() {}\n    public void addNum(int num) {\n        low.offer(num); high.offer(low.poll());\n        if(high.size()>low.size()) low.offer(high.poll());\n    }\n    public double findMedian() { return low.size()>high.size()?low.peek():((double)low.peek()+high.peek())/2; }\n}\n",
        "algorithmNotes": {
          "zh": "较小一半放最大堆，较大一半放最小堆，且大小差最多 1。插入后通过移动堆顶恢复顺序和大小平衡；奇数个时取较大堆的堆顶，偶数个时取两个堆顶平均。",
          "en": "Use a max-heap for the lower half and min-heap for the upper half, keeping their sizes within one. Rebalance by moving roots after insertion; use the larger heap's root for odd size and average both roots for even size."
        }
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
    },
    "examples": [
      {
        "input": "operations = [\"MedianFinder\",\"addNum\",\"findMedian\",\"addNum\",\"findMedian\"], arguments = [[],[2],[],[6],[]]",
        "output": "[null,null,2.0,null,4.0]",
        "note": {
          "zh": "输出逐项对应操作；构造和无返回值的操作用 null 表示。",
          "en": "Outputs correspond to operations; constructors and void operations are shown as null."
        }
      },
      {
        "input": "operations = [\"MedianFinder\",\"addNum\",\"addNum\",\"addNum\",\"findMedian\"], arguments = [[],[-2],[1],[5],[]]",
        "output": "[null,null,null,null,1.0]",
        "note": {
          "zh": "输出逐项对应操作；构造和无返回值的操作用 null 表示。",
          "en": "Outputs correspond to operations; constructors and void operations are shown as null."
        }
      },
      {
        "input": "operations = [\"MedianFinder\",\"addNum\",\"addNum\",\"findMedian\"], arguments = [[],[3],[3],[]]",
        "output": "[null,null,null,3.0]",
        "note": {
          "zh": "输出逐项对应操作；构造和无返回值的操作用 null 表示。",
          "en": "Outputs correspond to operations; constructors and void operations are shown as null."
        }
      }
    ]
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
    "methods": [
      {
        "key": "pairs",
        "name": {
          "zh": "枚举买卖日（基线）",
          "en": "Enumerate buy/sell pairs (baseline)"
        },
        "intuition": {
          "zh": "把交易看成下标对 (buy,sell)，只枚举 buy<sell。计算所有合法交易的利润，初始答案设为 0 自然涵盖“不交易”。这能避免把全局最小与最大直接相减却忽视时间顺序的错误。\n\n所有合法单次交易恰对应一个被枚举的下标对，因此最大利润不会遗漏。",
          "en": "Treat a transaction as a pair of indices with buy<sell. Evaluate every valid pair and start the best profit at zero to allow no transaction. This avoids incorrectly subtracting global extrema that occur in the wrong order. Every valid single transaction corresponds to an enumerated pair, so the maximum is included."
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
        "time": "O(n²)",
        "space": "O(1)",
        "complexity": {
          "zh": "共有 n(n−1)/2 对日期；只保留最大利润。此基线可能超时。",
          "en": "There are n(n−1)/2 day pairs and only a running maximum is stored. This baseline may time out."
        },
        "python": "class Solution:\n    def maxProfit(self, prices):\n        best=0\n        for i in range(len(prices)):\n            for j in range(i+1,len(prices)): best=max(best,prices[j]-prices[i])\n        return best\n",
        "java": "class Solution {\n    public int maxProfit(int[] p) {\n        int best=0;\n        for(int i=0;i<p.length;i++) for(int j=i+1;j<p.length;j++) best=Math.max(best,p[j]-p[i]);\n        return best;\n    }\n}\n",
        "algorithmNotes": {
          "zh": "买入日 i 必须早于卖出日 j，因此只枚举 i<j。每次利润为 prices[j]−prices[i]，最大利润从 0 开始，表示允许不交易；没有赚钱机会时不能返回负利润。",
          "en": "Enumerate only buy-sell pairs with i<j. Profit is prices[j]−prices[i], and the maximum starts at zero to represent choosing no trade; never return a negative profit."
        }
      },
      {
        "key": "prefix-min",
        "name": {
          "zh": "维护卖出日前的最低价",
          "en": "Maintain the minimum before each selling day"
        },
        "intuition": {
          "zh": "卖出日固定时，最佳买入日就是之前价格最低的一天。向右扫描时缓存这个最低价，所有未来卖出日便能 O(1) 得到自己的最优交易。先计算利润再更新最低价，使买入严格早于卖出。\n\n扫描卖出日 i 时 low 是所有更早日期的最低价，因而该日最优交易被准确计算；对所有卖出日取最大即为全局最优。",
          "en": "For a fixed selling day, the best purchase is the cheapest earlier day. Cache that prefix minimum while scanning so each selling day is evaluated in constant time. Compute profit before updating the minimum to preserve strict chronology. At selling day i, low is the minimum of all earlier prices, so that day’s best transaction is exact. Maximizing over selling days gives the global optimum."
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
        "time": "O(n)",
        "space": "O(1)",
        "complexity": {
          "zh": "每个卖出日两次常数比较；不创建价格切片，额外空间常数。",
          "en": "Each selling day needs constant comparisons. No price slice is created, so auxiliary space is constant."
        },
        "python": "class Solution:\n    def maxProfit(self, prices):\n        low=prices[0]; best=0\n        for i in range(1,len(prices)):\n            best=max(best,prices[i]-low)\n            low=min(low,prices[i])\n        return best\n",
        "java": "class Solution {\n    public int maxProfit(int[] p) {\n        int low=p[0],best=0;\n        for(int i=1;i<p.length;i++) { best=Math.max(best,p[i]-low); low=Math.min(low,p[i]); }\n        return best;\n    }\n}\n",
        "algorithmNotes": {
          "zh": "扫描到某天时，用此前最低买入价计算当天卖出的利润，再维护新的最低价。只保存一个最低值和一个最大利润即可，不需要枚举所有日期对；最低价必须来自当前或更早日期。",
          "en": "Use the lowest price seen so far to evaluate selling today, then update the minimum. A minimum price and best profit replace enumeration of date pairs, while ensuring the purchase never occurs after the sale."
        }
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
    },
    "examples": [
      {
        "input": "prices = [5,2,6,1,4]",
        "output": "4"
      },
      {
        "input": "prices = [5,4,3]",
        "output": "0"
      },
      {
        "input": "prices = [7]",
        "output": "0"
      }
    ]
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
    "methods": [
      {
        "key": "dp",
        "name": {
          "zh": "显式记录可达状态",
          "en": "Explicit reachability DP"
        },
        "intuition": {
          "zh": "令 reach[i] 表示是否存在从起点到 i 的路线。只从已可达的位置向后扩散，把它能跳到的每个落点标记为真。这保留完整的可达性信息，帮助理解贪心到底压缩了什么。\n\n所有边只向右，处理 i 时其前驱已处理完。标记只由真实可达位置产生，且枚举所有允许跳跃，所以状态既不虚报也不遗漏。",
          "en": "Let reach[i] mean that some path reaches i. Expand only from reachable positions and mark every allowed landing position. This keeps the full reachability table and shows what information the greedy version later compresses. All edges go right, so predecessors are processed first. Marks arise only from reachable positions, and every allowed jump is considered, proving soundness and completeness."
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
        "time": "O(n²)",
        "space": "O(n)",
        "complexity": {
          "zh": "最坏每个位置能跳到其后所有位置，枚举 O(n²) 条边；可达表 n 项。",
          "en": "In the worst case every position reaches every later position, producing quadratic edge enumeration and n stored states."
        },
        "python": "class Solution:\n    def canJump(self, nums):\n        n=len(nums); reach=[False]*n; reach[0]=True\n        for i in range(n):\n            if reach[i]:\n                for j in range(i+1,min(n,i+nums[i]+1)): reach[j]=True\n        return reach[-1]\n",
        "java": "class Solution {\n    public boolean canJump(int[] a) {\n        boolean[] reach=new boolean[a.length]; reach[0]=true;\n        for(int i=0;i<a.length;i++) if(reach[i])\n            for(int j=i+1;j<a.length && j<=i+a[i];j++) reach[j]=true;\n        return reach[a.length-1];\n    }\n}\n",
        "algorithmNotes": {
          "zh": "reachable[i] 表示是否存在从起点到 i 的跳法，初始只有下标 0 可达。从可达位置把其最大跳距以内的后续位置标成可达；不可达位置即使数值很大也不能用来扩展。",
          "en": "reachable[i] means some jump sequence reaches i, with only index zero initially reachable. Extend reachability from reachable positions to their allowed successors; a large value at an unreachable position cannot help."
        }
      },
      {
        "key": "greedy",
        "name": {
          "zh": "用最远可达下标压缩状态",
          "en": "Compress reachability into a farthest index"
        },
        "intuition": {
          "zh": "每次允许跳 0 到最大距离之间的任意步数，因此已知可达区域是一段连续前缀。不需要逐个标记前缀内的点，只保存其最右边界 far。扫描到 i>far 表示此前所有可达点都不能越过缺口。\n\n可达前缀不变量由起点成立，每个可达 i 的全部落点延伸这个前缀；出现缺口时再无合法前驱能访问后续位置。",
          "en": "Because every shorter jump is allowed, the reachable region is a continuous prefix. Store only its rightmost index far. Encountering i>far proves that all earlier reachable positions fail to bridge the gap. The reachable-prefix invariant starts at zero and is extended by every reachable position. At a gap no valid predecessor can reach any later position."
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
        "time": "O(n)",
        "space": "O(1)",
        "complexity": {
          "zh": "每个位置最多检查一次，只存 far 和下标。遇到 0 本身不代表失败，只有超出 far 才失败。",
          "en": "Each position is checked once with constant state. A zero is not itself failure; being beyond far is."
        },
        "python": "class Solution:\n    def canJump(self, nums):\n        far=0\n        for i,x in enumerate(nums):\n            if i>far: return False\n            far=max(far,i+x)\n            if far>=len(nums)-1: return True\n        return False\n",
        "java": "class Solution {\n    public boolean canJump(int[] a) {\n        int far=0;\n        for(int i=0;i<a.length;i++) {\n            if(i>far) return false;\n            far=Math.max(far,i+a[i]);\n            if(far>=a.length-1) return true;\n        }\n        return false;\n    }\n}\n",
        "algorithmNotes": {
          "zh": "维护已能到达的最远下标 far，扫描位置 i 若大于 far 就说明中间出现无法跨过的缺口。否则更新 far=max(far,i+nums[i])；一旦覆盖最后下标即可成功，长度 1 的数组无需跳跃。",
          "en": "Track far, the farthest reachable index. If i exceeds far, an uncrossable gap exists; otherwise update far=max(far,i+nums[i]). Reaching the last index succeeds, and a one-element array needs no jump."
        }
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
    },
    "examples": [
      {
        "input": "nums = [2,0,1,0]",
        "output": "true"
      },
      {
        "input": "nums = [1,0,2]",
        "output": "false"
      },
      {
        "input": "nums = [0]",
        "output": "true"
      }
    ]
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
    "methods": [
      {
        "key": "dp",
        "name": {
          "zh": "最少跳数动态规划",
          "en": "Minimum-jump dynamic programming"
        },
        "intuition": {
          "zh": "把每个下标看作图节点，一次允许的跳跃是一条权重为 1 的边。因为边向右，按下标顺序更新最短距离即可。dp[j] 存当前已知到 j 的最少跳数，每个前驱 i 都尝试用 dp[i]+1 改进它。\n\n到 j 的最优路线必从某个更早的 i 最后跳来。所有这些前驱都被考虑，且其距离已求得，因此取最小得到正确最优值。",
          "en": "Treat indices as vertices and legal jumps as unit-cost edges. All edges go right, so forward order is sufficient for shortest-distance updates. Each predecessor i proposes dp[i]+1 for every reachable landing j. An optimal route to j ends with a jump from an earlier i. All such predecessors are examined with already optimal distances, so their minimum is correct."
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
        "time": "O(n²)",
        "space": "O(n)",
        "complexity": {
          "zh": "保守最坏 O(n²)；更具体为 O(n·min(n,M))，M 为最大跳长。距离表需要 n 项。",
          "en": "The general bound is O(n²), more precisely O(n·min(n,M)) for maximum jump length M. The distance table has n entries."
        },
        "python": "class Solution:\n    def jump(self, nums):\n        n=len(nums); dp=[n]*n; dp[0]=0\n        for i in range(n):\n            for j in range(i+1,min(n,i+nums[i]+1)): dp[j]=min(dp[j],dp[i]+1)\n        return dp[-1]\n",
        "java": "import java.util.*;\nclass Solution {\n    public int jump(int[] a) {\n        int n=a.length; int[] dp=new int[n]; Arrays.fill(dp,n); dp[0]=0;\n        for(int i=0;i<n;i++) for(int j=i+1;j<n && j<=i+a[i];j++) dp[j]=Math.min(dp[j],dp[i]+1);\n        return dp[n-1];\n    }\n}\n",
        "algorithmNotes": {
          "zh": "dp[i] 存到达 i 的最少跳数，起点为 0，其余先设不可达。对每个可达前驱枚举允许落点，以 dp[前驱]+1 尝试更新；题目保证终点可达，最终读取最后位置。",
          "en": "dp[i] stores the fewest jumps to i, initialized to zero at the start and infinity elsewhere. For each reachable predecessor, relax its allowed destinations using its count plus one; the problem guarantees the final position is reachable."
        }
      },
      {
        "key": "layers",
        "name": {
          "zh": "按跳数扩展可达区间",
          "en": "Expand reachable intervals by jump count"
        },
        "intuition": {
          "zh": "最少跳数相当于 BFS 层数。一层内所有位置可以在当前跳数内到达，扫描这些位置时收集下一层最远边界。只有走到当前层末尾，才真正把跳数加一；这不是每次选择最远落脚点，而是同时比较本层全部候选。\n\n每次层扩张包含所有再跳一步可达的位置；更少跳数的层已全部处理，所以首次覆盖终点的层数就是最少跳数。",
          "en": "Minimum jumps correspond to BFS levels. Scan all positions covered by the current jump count and collect the farthest next boundary. Increment the count only after completing that level. This evaluates all candidates, rather than committing to one farthest landing. Each expansion includes every position reachable with one more jump. All smaller jump counts have been exhausted, so the first layer reaching the destination is optimal."
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
        "time": "O(n)",
        "space": "O(1)",
        "complexity": {
          "zh": "每个下标只扫描一次，三项整数摘要替代整张距离表。可达保证使边界不会永久停住。",
          "en": "Each index is scanned once; three integers replace the distance table. Guaranteed reachability prevents a permanently stuck boundary."
        },
        "python": "class Solution:\n    def jump(self, nums):\n        steps=end=far=0\n        for i in range(len(nums)-1):\n            far=max(far,i+nums[i])\n            if i==end: steps+=1; end=far\n        return steps\n",
        "java": "class Solution {\n    public int jump(int[] a) {\n        int steps=0,end=0,far=0;\n        for(int i=0;i<a.length-1;i++) {\n            far=Math.max(far,i+a[i]);\n            if(i==end) { steps++; end=far; }\n        }\n        return steps;\n    }\n}\n",
        "algorithmNotes": {
          "zh": "当前边界 end 表示现有跳数可到达的整层范围，扫描这一层时维护下一层最远位置。只有走到 end 才把跳数加一并扩展边界；遍历到倒数第二格即可，避免到终点后再多跳一次。",
          "en": "end bounds all positions reachable with the current jump count. While scanning that layer, compute the next farthest boundary; increment jumps only at end, and stop scanning before the final index to avoid counting an unnecessary jump."
        }
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
    },
    "examples": [
      {
        "input": "nums = [2,3,1,1,4]",
        "output": "2"
      },
      {
        "input": "nums = [0]",
        "output": "0"
      },
      {
        "input": "nums = [1,1,1]",
        "output": "2"
      }
    ]
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
    "methods": [
      {
        "key": "intervals",
        "name": {
          "zh": "字母覆盖区间合并",
          "en": "Merge each letter’s occurrence interval"
        },
        "intuition": {
          "zh": "同一个字母从第一次到最后一次出现之间不能有切口，因此每个字母给出一个不可拆开的覆盖区间。两个区间重叠时也必须归入同一片段。按左端排序并合并重叠区间，得到所有被约束强制连在一起的位置块。\n\n区间内切分会拆开某个字母，重叠区间必须一起保留；不同合并块之间没有字母跨越，因此全部切开合法且段数最多。",
          "en": "No cut may lie between the first and last occurrence of one letter, giving an indivisible interval for each letter. Overlapping intervals must belong to one part. Sorting and merging these intervals reveals exactly the blocks forced together by the constraints. A cut inside an occurrence interval splits a letter, and overlap forces intervals together. No letter crosses distinct merged blocks, so separating all such blocks is valid and maximizes the count."
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
        "time": "O(n + σ log σ)",
        "space": "O(σ) auxiliary; O(σ) output",
        "complexity": {
          "zh": "σ≤26 为不同字母数，统计 O(n)，排序 O(σ log σ)。在固定小写字母表下可写 O(n) 时间、O(1) 辅助空间，但显式保留 σ 更清楚。",
          "en": "σ≤26 is the number of distinct letters. Counting is linear and interval sorting costs O(σ log σ). With the fixed alphabet this simplifies to O(n) time and constant auxiliary space."
        },
        "python": "class Solution:\n    def partitionLabels(self, s):\n        bounds={}\n        for i,c in enumerate(s):\n            if c not in bounds: bounds[c]=[i,i]\n            bounds[c][1]=i\n        intervals=sorted(bounds.values())\n        start,end=intervals[0]; out=[]\n        for l,r in intervals[1:]:\n            if l<=end: end=max(end,r)\n            else: out.append(end-start+1); start,end=l,r\n        out.append(end-start+1)\n        return out\n",
        "java": "import java.util.*;\nclass Solution {\n    public List<Integer> partitionLabels(String s) {\n        int[] first=new int[26],last=new int[26]; Arrays.fill(first,-1);\n        for(int i=0;i<s.length();i++) { int c=s.charAt(i)-'a'; if(first[c]<0) first[c]=i; last[c]=i; }\n        List<int[]> intervals=new ArrayList<>();\n        for(int c=0;c<26;c++) if(first[c]>=0) intervals.add(new int[]{first[c],last[c]});\n        intervals.sort(Comparator.comparingInt(a->a[0]));\n        int start=intervals.get(0)[0],end=intervals.get(0)[1]; List<Integer> out=new ArrayList<>();\n        for(int i=1;i<intervals.size();i++) {\n            int[] a=intervals.get(i);\n            if(a[0]<=end) end=Math.max(end,a[1]);\n            else { out.add(end-start+1); start=a[0]; end=a[1]; }\n        }\n        out.add(end-start+1); return out;\n    }\n}\n",
        "algorithmNotes": {
          "zh": "每个字符从首次到末次出现构成一个必须放在同一片段的区间。按起点排序后合并重叠区间，合并段长度就是分段长度；同一个字符的所有出现位置因此不会跨段。",
          "en": "Each character's first and last occurrence define an interval that must remain in one part. Sort and merge overlapping intervals, then output their inclusive lengths so no character crosses a boundary."
        }
      },
      {
        "key": "last",
        "name": {
          "zh": "最后位置表与最早合法切口",
          "en": "Last positions and the earliest valid cut"
        },
        "intuition": {
          "zh": "当前段一旦包含字母 c，就必须覆盖 c 的最后出现位置。扫描时不断把段尾扩展到已见字母最远的末位置；扫描下标追上这个段尾，说明段内字母都不会再出现在后面，此时立刻切开能留下最多机会。\n\ni<end 时有已见字母尚未结束，不能切；i=end 时所有约束已满足，是最早合法切口。选择更晚切口只会合并合法片段，不可能增加段数。",
          "en": "Once the current part contains c, it must extend through c’s last occurrence. Keep the furthest last position among letters encountered. When the scan reaches that boundary, none of the part’s letters appears later, so cutting immediately preserves the most future opportunities. Before end, a seen letter still appears later, so a cut is invalid. At end the earliest valid cut is reached. Delaying it only merges valid parts and cannot increase their count."
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
        "time": "O(n + σ)",
        "space": "O(σ) auxiliary; O(σ) output",
        "complexity": {
          "zh": "两遍线性扫描，last 表最多 26 项。输出最多 σ 段；σ 固定时辅助空间为 O(1)。",
          "en": "Two linear scans use at most 26 last-position entries. There are at most σ output parts; the fixed alphabet makes auxiliary space constant."
        },
        "python": "class Solution:\n    def partitionLabels(self, s):\n        last={c:i for i,c in enumerate(s)}\n        start=end=0; out=[]\n        for i,c in enumerate(s):\n            end=max(end,last[c])\n            if i==end: out.append(end-start+1); start=i+1\n        return out\n",
        "java": "import java.util.*;\nclass Solution {\n    public List<Integer> partitionLabels(String s) {\n        int[] last=new int[26];\n        for(int i=0;i<s.length();i++) last[s.charAt(i)-'a']=i;\n        int start=0,end=0; List<Integer> out=new ArrayList<>();\n        for(int i=0;i<s.length();i++) {\n            end=Math.max(end,last[s.charAt(i)-'a']);\n            if(i==end) { out.add(end-start+1); start=i+1; }\n        }\n        return out;\n    }\n}\n",
        "algorithmNotes": {
          "zh": "先记录每个字符的最后出现位置，扫描时把片段终点扩到遇到字符的最远末次位置。只有扫描下标到达这个终点时才能切分，此时当前片段中所有字符都不会再次出现。",
          "en": "Record each character's final index, then extend the current partition's end to the farthest last occurrence seen. Cut only when the scan reaches that end, after every character in the part has finished appearing."
        }
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
    },
    "examples": [
      {
        "input": "s = \"abac\"",
        "output": "[3,1]"
      },
      {
        "input": "s = \"aaaa\"",
        "output": "[4]"
      },
      {
        "input": "s = \"abc\"",
        "output": "[1,1,1]"
      }
    ]
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
    "methods": [
      {
        "key": "table",
        "name": {
          "zh": "按最后一步分类的 DP 表",
          "en": "DP table classified by the last move"
        },
        "intuition": {
          "zh": "到第 i 阶的最后一步只能是从 i−1 跨一阶，或从 i−2 跨两阶。这两组走法互不重叠且覆盖全部可能，所以方案数相加。dp[0]=1 表示什么也不走的空序列，是直接跨两阶时所需的起点方案。\n\n删除最后一步把两类路径分别一一对应到前两个状态，既不会重复也不会漏计；按阶数归纳成立。",
          "en": "The last move to i comes from i−1 by one step or i−2 by two. These disjoint cases cover every sequence, so add their counts. dp[0]=1 represents the empty sequence, allowing a direct two-step move to be counted correctly. Removing the last move gives a bijection to one of the preceding two states, with neither omission nor overlap. Induction proves every entry."
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
        "time": "O(n)",
        "space": "O(n)",
        "complexity": {
          "zh": "n−1 次加法和 n+1 个状态；题设 n≤45 时结果可由 Java int 容纳。",
          "en": "There are n−1 additions and n+1 states. Under n≤45, the result fits a Java int."
        },
        "python": "class Solution:\n    def climbStairs(self, n):\n        dp=[0]*(n+1); dp[0]=dp[1]=1\n        for i in range(2,n+1): dp[i]=dp[i-1]+dp[i-2]\n        return dp[n]\n",
        "java": "class Solution {\n    public int climbStairs(int n) {\n        int[] dp=new int[n+1]; dp[0]=dp[1]=1;\n        for(int i=2;i<=n;i++) dp[i]=dp[i-1]+dp[i-2];\n        return dp[n];\n    }\n}\n",
        "algorithmNotes": {
          "zh": "dp[i] 表示到达第 i 阶的方式数，最后一步只能来自 i−1 或 i−2。两种来源互不重复，所以相加；先明确前两阶或空起点的初值，再按阶数递增填表。",
          "en": "dp[i] counts ways to reach stair i; the final move comes from i−1 or i−2. These cases are disjoint, so add them, initializing the first states before filling in increasing stair order."
        }
      },
      {
        "key": "rolling",
        "name": {
          "zh": "滚动保存前两阶",
          "en": "Roll the previous two states"
        },
        "intuition": {
          "zh": "递推只读取前两项，更早的状态计算后不再需要。用 a、b 保存前两阶的方案数，先计算 next，再同时推进它们。空间优化没有改变计数含义，也没有省略路径种类。\n\n每轮开始 a、b 分别等于正确的前两个 DP 状态，转移和完整表一致；更新后不变量继续成立。",
          "en": "The recurrence reads only its last two values, so older states can be discarded. Keep them in a and b, compute next first, then advance both. This changes storage, not the counting argument or the set of paths considered. At each iteration a and b equal the two correct preceding DP states. The same recurrence and careful update preserve the invariant."
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
        "time": "O(n)",
        "space": "O(1)",
        "complexity": {
          "zh": "仍需逐阶计算，但只保存两个旧状态和一个临时值；按题设固定整数范围分析。",
          "en": "The loop still visits each step, but stores only two previous values and one temporary, under the problem’s bounded-integer model."
        },
        "python": "class Solution:\n    def climbStairs(self, n):\n        a=b=1\n        for _ in range(2,n+1): a,b=b,a+b\n        return b\n",
        "java": "class Solution {\n    public int climbStairs(int n) {\n        int a=1,b=1;\n        for(int i=2;i<=n;i++) { int next=a+b; a=b; b=next; }\n        return b;\n    }\n}\n",
        "algorithmNotes": {
          "zh": "每轮只需前两阶的方式数，用两个变量替代整张表。先算它们的和，再整体向前滚动，不能覆盖一个变量后又把更新后的值用于计算同一轮的另一个状态。",
          "en": "Only the previous two counts are needed, so keep two variables. Compute their sum before shifting the pair forward; do not overwrite one value and accidentally reuse the new value in the same transition."
        }
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
    },
    "examples": [
      {
        "input": "n = 4",
        "output": "5"
      },
      {
        "input": "n = 1",
        "output": "1"
      },
      {
        "input": "n = 2",
        "output": "2"
      }
    ]
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
    "methods": [
      {
        "key": "rows",
        "name": {
          "zh": "直接创建每一行",
          "en": "Build each row directly"
        },
        "intuition": {
          "zh": "第 r 行只有 r+1 个数。先把这一行填为 1，边界已经正确；内部位置从上一行相邻两项相加得到。每行用独立数组或列表，因此后面的计算不会改写已经输出的行。\n\n首行与边界符合定义；假设上一行正确，内部相加正是杨辉三角定义，所以归纳得到全部行。",
          "en": "Row r contains r+1 values. Fill it with ones to establish both boundaries, then compute each interior value from adjacent entries in the preceding row. Each row is a separate object, so later computation cannot alter earlier output. The first row and boundaries satisfy the definition. Given a correct previous row, every interior sum is correct, proving all rows by induction."
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
        "time": "O(r²)",
        "space": "O(r²) including output",
        "complexity": {
          "zh": "r=numRows，共输出 r(r+1)/2 个数，时间和总空间都为 Θ(r²)。新行本身属于返回结果，除结果外仅需 O(1) 索引状态。",
          "en": "For r=numRows the output has r(r+1)/2 values, requiring Θ(r²) time and total space. Newly built rows belong to the output; other state is constant."
        },
        "python": "class Solution:\n    def generate(self, numRows):\n        out=[]\n        for r in range(numRows):\n            row=[1]*(r+1)\n            for j in range(1,r): row[j]=out[-1][j-1]+out[-1][j]\n            out.append(row)\n        return out\n",
        "java": "import java.util.*;\nclass Solution {\n    public List<List<Integer>> generate(int numRows) {\n        List<List<Integer>> out=new ArrayList<>();\n        for(int r=0;r<numRows;r++) {\n            List<Integer> row=new ArrayList<>(Collections.nCopies(r+1,1));\n            for(int j=1;j<r;j++) row.set(j,out.get(r-1).get(j-1)+out.get(r-1).get(j));\n            out.add(row);\n        }\n        return out;\n    }\n}\n",
        "algorithmNotes": {
          "zh": "第 r 行长度为 r+1，两端固定为 1，中间位置来自上一行相邻两个数之和。创建新行后只读取上一行，不能把本行刚计算的值当作上一行的数据。",
          "en": "Row r contains r+1 values with ones at both ends. Each interior value sums two adjacent entries from the previous row; build a new row without reading newly written current-row values as predecessors."
        }
      },
      {
        "key": "rolling",
        "name": {
          "zh": "工作行倒序更新并复制输出",
          "en": "Update one working row backwards and copy it"
        },
        "intuition": {
          "zh": "下一行只依赖上一行，可以复用一个工作行。危险在于原地覆盖：从左往右算会读到本轮刚更新的数。必须从右往左更新，让两个来源都仍是上一行的值；加入结果时复制，避免所有行共享同一对象。\n\n倒序更新保证读取的 row[j] 和 row[j−1] 都未被本轮覆盖，因此等价于直接读取上一行；独立副本保证历史行不变。",
          "en": "Reuse one working row because only the previous row is needed. Updating left to right would read already changed values, so move right to left. Copy each completed row into the result; otherwise every output row would reference the same changing object. Backward order leaves both source entries untouched until used, reproducing the previous-row recurrence. Independent copies preserve earlier rows."
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
        "time": "O(r²)",
        "space": "O(r) auxiliary + O(r²) output",
        "complexity": {
          "zh": "各行更新与复制总共 Θ(r²)；工作行 O(r)，全部输出仍为 Θ(r²)。该方法练习空间复用，并不减少完整输出需求。",
          "en": "Updates and copies total Θ(r²). The work row uses O(r), while all output remains Θ(r²). This teaches reuse rather than reducing the required output size."
        },
        "python": "class Solution:\n    def generate(self, numRows):\n        row=[]; out=[]\n        for _ in range(numRows):\n            row.append(1)\n            for j in range(len(row)-2,0,-1): row[j]+=row[j-1]\n            out.append(row.copy())\n        return out\n",
        "java": "import java.util.*;\nclass Solution {\n    public List<List<Integer>> generate(int numRows) {\n        List<Integer> row=new ArrayList<>(); List<List<Integer>> out=new ArrayList<>();\n        for(int r=0;r<numRows;r++) {\n            row.add(1);\n            for(int j=row.size()-2;j>=1;j--) row.set(j,row.get(j)+row.get(j-1));\n            out.add(new ArrayList<>(row));\n        }\n        return out;\n    }\n}\n",
        "algorithmNotes": {
          "zh": "在上一行末尾补 1 后，从右向左更新内部位置，每项加上它左边的旧值。反向更新避免覆盖尚未使用的旧数据；把该行加入答案时要复制，防止后续修改改变已保存的行。",
          "en": "Append a trailing one and update interior entries right to left, adding the old left neighbor. This preserves needed old values; append a copy to the result so later updates do not mutate previously saved rows."
        }
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
    },
    "examples": [
      {
        "input": "numRows = 4",
        "output": "[[1],[1,1],[1,2,1],[1,3,3,1]]"
      },
      {
        "input": "numRows = 1",
        "output": "[[1]]"
      },
      {
        "input": "numRows = 2",
        "output": "[[1],[1,1]]"
      }
    ]
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
    "methods": [
      {
        "key": "table",
        "name": {
          "zh": "前缀最优 DP",
          "en": "Prefix-optimum DP"
        },
        "intuition": {
          "zh": "看最后一间房的选择：不选它，沿用前 i−1 间最优值；选它，就必须跳过紧邻前一间，把金额加到前 i−2 间最优值。两种情况取最大，避免“只选奇数位或偶数位”这种不成立的限制。\n\n每个合法方案要么包含末间，要么不包含；这两类完整且互斥。各类使用对应前缀最优解后取最大，得到整体最优。",
          "en": "Split by the last house: skipping it retains the optimum for i−1 houses; taking it forbids its neighbor and adds its amount to the optimum for i−2 houses. Choose the better case rather than incorrectly restricting choices to odd or even positions. Every valid plan either includes the last house or excludes it. These exhaustive disjoint cases reduce to optimal smaller prefixes, so their maximum is optimal."
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
        "time": "O(n)",
        "space": "O(n)",
        "complexity": {
          "zh": "每间房一次常数转移，存储 n+1 个状态。金额非负，因此初始化首间金额正确。",
          "en": "Each house needs one constant-time transition and n+1 states are stored. Nonnegative amounts justify the first-house initialization."
        },
        "python": "class Solution:\n    def rob(self, nums):\n        dp=[0]*(len(nums)+1); dp[1]=nums[0]\n        for i in range(2,len(nums)+1): dp[i]=max(dp[i-1],dp[i-2]+nums[i-1])\n        return dp[-1]\n",
        "java": "class Solution {\n    public int rob(int[] a) {\n        int[] dp=new int[a.length+1]; dp[1]=a[0];\n        for(int i=2;i<=a.length;i++) dp[i]=Math.max(dp[i-1],dp[i-2]+a[i-1]);\n        return dp[a.length];\n    }\n}\n",
        "algorithmNotes": {
          "zh": "dp[i] 表示前 i 间房可获得的最大金额，当前房有“跳过”和“偷取”两种选择。跳过沿用前一状态，偷取则加上前两间之前的最优金额；比较两者后记录，而不是贪心选择较大单间。",
          "en": "dp[i] is the best amount from the first i houses. Skipping uses the previous state; taking the current house adds its value to the state two positions back. Choose the larger total rather than greedily selecting individual houses."
        }
      },
      {
        "key": "rolling",
        "name": {
          "zh": "滚动前两个最优值",
          "en": "Roll the preceding two optima"
        },
        "intuition": {
          "zh": "转移只依赖前两个前缀的最优金额，保存完整数组不是必需的。older 保存隔一间的最优值，previous 保存紧邻前缀的最优值。先计算 current，再移动变量，确保“选当前房”时不会错误加上相邻房的收益。\n\n两个变量始终等于完整 DP 表中所需的前两个值，转移不变，因此与表格版本得到相同最优解。",
          "en": "Only the preceding two prefix optima are needed. older represents the prefix two steps back and previous the immediately preceding prefix. Compute current before moving either variable, preventing the take-current case from accidentally including an adjacent house. The variables always equal the two required entries of the full DP table. Identical transitions therefore produce the same optimum."
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
        "time": "O(n)",
        "space": "O(1)",
        "complexity": {
          "zh": "每个元素处理一次，固定三个整数；没有切片或递归栈。",
          "en": "Each value is processed once using three integers, with no slices or recursion."
        },
        "python": "class Solution:\n    def rob(self, nums):\n        older=previous=0\n        for x in nums:\n            current=max(previous,older+x)\n            older,previous=previous,current\n        return previous\n",
        "java": "class Solution {\n    public int rob(int[] a) {\n        int older=0,previous=0;\n        for(int x:a) { int current=Math.max(previous,older+x); older=previous; previous=current; }\n        return previous;\n    }\n}\n",
        "algorithmNotes": {
          "zh": "用两个变量保存上一间与上两间处理完的最优金额。新值等于 max(上一间最优,上两间最优+当前金额)，算完再移动窗口；初始都为 0，允许不偷任何房间。",
          "en": "Keep the best totals after the previous one and two positions. Compute max(previousBest,twoBack+currentValue) before shifting the states; initialize both to zero to allow taking no house."
        }
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
    },
    "examples": [
      {
        "input": "nums = [3,2,5,1]",
        "output": "8"
      },
      {
        "input": "nums = [0]",
        "output": "0"
      },
      {
        "input": "nums = [2,7]",
        "output": "7"
      }
    ]
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
    "methods": [
      {
        "key": "dp",
        "name": {
          "zh": "按最后一个平方数做动态规划",
          "en": "DP over the last square"
        },
        "intuition": {
          "zh": "不要先贪心选最大的平方；例如 12 选 9 后还需三个 1，而三个 4 更好。定义 dp[a] 为凑出 a 的最少项数。若最后一项是 j²，前面的和就是 a−j²，于是候选值是 dp[a−j²]+1。对所有不超过 a 的平方取最小，便把全局选择变成已解决的小问题。\n\n任意合法拆分都有最后一项，枚举平方覆盖了所有可能。归纳假设所有较小金额已最优，则每个候选是对应最后一项下的最优值，取最小得到 dp[a] 的最优值。",
          "en": "Choosing the largest square first can waste terms: 12 needs three 4s, whereas starting with 9 needs three extra 1s. Let dp[a] be the fewest terms summing to a. If the last term is j², removing it leaves amount a−j²; the resulting candidate is dp[a−j²]+1. Try every possible last square rather than committing to one greedy choice. Every decomposition has a last square, so the choices are exhaustive. Assuming smaller amounts are optimal, each candidate is optimal among decompositions ending in its chosen square. Their minimum therefore gives the optimum for a."
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
        "time": "O(n√n)",
        "space": "O(n)",
        "complexity": {
          "zh": "n 个状态各检查至多 √n 个平方；一维数组 n+1 项，无递归栈，返回整数为常数空间。",
          "en": "There are n states with at most √n square checks each. The array has n+1 entries; no recursion or decomposition output is stored."
        },
        "python": "from typing import List\nclass Solution:\n    def numSquares(self, n: int) -> int:\n        dp = [0] + [n + 1] * n\n        for a in range(1, n + 1):\n            j = 1\n            while j * j <= a:\n                dp[a] = min(dp[a], dp[a - j * j] + 1)\n                j += 1\n        return dp[n]\n",
        "java": "import java.util.*;\nclass Solution {\n    public int numSquares(int n) {\n        int[] dp = new int[n+1]; Arrays.fill(dp, n+1); dp[0]=0;\n        for(int a=1;a<=n;a++) for(int j=1;j*j<=a;j++)\n            dp[a]=Math.min(dp[a],dp[a-j*j]+1);\n        return dp[n];\n    }\n}\n",
        "algorithmNotes": {
          "zh": "dp[x] 表示组成 x 的最少平方数个数，dp[0]=0。对每个 x 枚举不超过 x 的平方数 s，用 dp[x−s]+1 更新；允许重复选同一个平方数，所以从较小总和逐步递推。",
          "en": "dp[x] is the fewest square terms summing to x, with dp[0]=0. For every square s≤x, try dp[x−s]+1; filling totals upward allows repeated use of the same square."
        }
      },
      {
        "key": "number-theory",
        "name": {
          "zh": "四平方定理与两平方枚举",
          "en": "Four-square theorem and a two-square scan"
        },
        "intuition": {
          "zh": "数学定理把答案限制到 1、2、3、4：每个正整数都可用至多四个平方表示；恰好需要四项的数形如 4ᵃ(8b+7)。先直接检查一项，再去掉 4 的因子判断四项。剩余情况尝试拆成两个平方；如果不能，答案只能为三。这种优化依赖定理，不能把模运算当作凭经验猜出的规律。\n\n四平方定理给出上界 4，三平方判定准确识别必须用四项的情况。单平方与两平方的穷尽检查区分 1、2；未命中者且不需四项，必为 3。",
          "en": "Number theory limits the answer to 1, 2, 3, or 4. Every positive integer is a sum of at most four squares, and exactly four are necessary for numbers of the form 4ᵃ(8b+7). Check one square first, then the four-square condition. Among the remaining numbers, test every first term of a two-square representation; failure leaves exactly three. This optimization requires the theorems, not a heuristic pattern. The four-square theorem gives the upper bound, and the three-square criterion identifies precisely the numbers requiring four. Exhaustive checks for one and two terms distinguish those cases; the only remaining possibility is three."
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
        "time": "O(√n)",
        "space": "O(1)",
        "complexity": {
          "zh": "两平方枚举最多 √n 次，去因子需 O(log n) 次；题目有限整数范围内平方根与乘法按常数代价计，仅保存几个整数。",
          "en": "At most √n pair candidates and O(log n) factor removals are examined. With integers bounded by this problem, square-root checks and arithmetic are constant-cost, and only scalar variables are stored."
        },
        "python": "from math import isqrt\nclass Solution:\n    def numSquares(self, n: int) -> int:\n        def square(v):\n            r = isqrt(v)\n            return r * r == v\n        if square(n): return 1\n        rest = n\n        while rest % 4 == 0: rest //= 4\n        if rest % 8 == 7: return 4\n        for a in range(1, isqrt(n) + 1):\n            if square(n - a * a): return 2\n        return 3\n",
        "java": "class Solution {\n    private boolean square(int v) {\n        int r=(int)Math.sqrt(v); return r*r==v;\n    }\n    public int numSquares(int n) {\n        if(square(n)) return 1;\n        int rest=n; while(rest%4==0) rest/=4;\n        if(rest%8==7) return 4;\n        for(int a=1;a*a<=n;a++) if(square(n-a*a)) return 2;\n        return 3;\n    }\n}\n",
        "algorithmNotes": {
          "zh": "先判断 n 是否本身为平方数。否则除去所有因子 4，若余数模 8 为 7 则由四平方定理判为 4 个；剩下的情况枚举一个平方数，余数若为平方数则返回 2，否则返回 3。",
          "en": "First test whether n is a square. Otherwise remove factors of four; a remainder congruent to seven modulo eight requires four terms. In the remaining cases, test whether subtracting a square leaves a square: return two if so, otherwise three."
        }
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
    },
    "examples": [
      {
        "input": "n = 18",
        "output": "2"
      },
      {
        "input": "n = 1",
        "output": "1"
      },
      {
        "input": "n = 7",
        "output": "4"
      }
    ]
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
    "methods": [
      {
        "key": "dp",
        "name": {
          "zh": "金额动态规划",
          "en": "Amount DP"
        },
        "intuition": {
          "zh": "硬币数量是优化目标，金额是状态。将最后一枚面额设为 c，前面必须最优地凑出 a−c。与平方数问题一样，枚举所有最后选择；不能把无法凑成的金额写成 0，否则会把不存在的方案当成免费前缀。用 amount+1 作哨兵，因为面额至少为 1，任何可达目标的最优枚数都不会超过 amount。\n\n移去任一方案的最后一枚得到更小金额；用该金额的最优方案替换前缀不会变差。枚举所有面额覆盖所有最优方案的最后一枚，按金额归纳成立。",
          "en": "The amount is the state and the coin count is the quantity being minimized. If the last coin is c, the preceding coins must total a−c optimally. Try all last choices. Unreachable amounts must not be initialized to zero, which would invent free prefixes. amount+1 is a safe sentinel because every positive denomination is at least one. Removing the last coin yields a smaller amount. Replacing that prefix by its optimum cannot worsen the solution. Enumerating all denominations covers the final coin of every optimum, giving an induction on amount."
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
        "time": "O(Ak)",
        "space": "O(A)",
        "complexity": {
          "zh": "A=amount，k=面额数。A 个金额各枚举 k 个面额；一维数组 O(A)，无递归，无输入排序或复制。",
          "en": "A is the target and k the number of denominations. Each of A states checks k coins. The array uses O(A) space without recursion, sorting, or copying the input."
        },
        "python": "from typing import List\nclass Solution:\n    def coinChange(self, coins: List[int], amount: int) -> int:\n        dp = [0] + [amount + 1] * amount\n        for a in range(1, amount + 1):\n            for c in coins:\n                if c <= a:\n                    dp[a] = min(dp[a], dp[a-c] + 1)\n        return dp[amount] if dp[amount] <= amount else -1\n",
        "java": "import java.util.*;\nclass Solution {\n    public int coinChange(int[] coins, int amount) {\n        int[] dp=new int[amount+1]; Arrays.fill(dp,amount+1); dp[0]=0;\n        for(int a=1;a<=amount;a++) for(int c:coins)\n            if(c<=a) dp[a]=Math.min(dp[a],dp[a-c]+1);\n        return dp[amount]<=amount?dp[amount]:-1;\n    }\n}\n",
        "algorithmNotes": {
          "zh": "dp[x] 表示凑出金额 x 的最少硬币数，0 元需 0 枚，其余先设为不可达。对每种不超过 x 的硬币 c，尝试 dp[x−c]+1；最终仍不可达则返回 −1，不能把不可达状态当成 0。",
          "en": "dp[x] counts the fewest coins for amount x, initialized to zero for amount zero and infinity elsewhere. Try dp[x−c]+1 for every usable denomination; return −1 if the final state stays unreachable."
        }
      },
      {
        "key": "bfs",
        "name": {
          "zh": "把金额看成图的广度优先搜索",
          "en": "Breadth-first search over amounts"
        },
        "intuition": {
          "zh": "把金额 0 到 amount 当作节点，加入一枚硬币就是一条边。所有边都花费一枚硬币，所以从 0 的 BFS 第 t 层恰好表示用 t 枚能首次到达的金额。先到目标的层数就是最少枚数。visited 在入队时设置，避免同一个金额被不同顺序反复加入。\n\nBFS 按路径边数递增访问，边数就是硬币枚数。所有面额为正，超过目标的状态无法再回到目标，剪枝安全；第一次到达目标即最短路径。",
          "en": "Treat amounts from zero to the target as graph vertices. Adding one coin follows an edge with unit cost. BFS layer t represents amounts first reachable with t coins, so the first visit to the target is optimal. Mark states when enqueuing, not when removing them, to prevent repeated permutations of the same sum. BFS explores paths in increasing edge count, which equals the number of coins. Positive denominations make overshooting irreversible, so pruning is safe. The first target visit is therefore a shortest path."
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
        "time": "O(Ak)",
        "space": "O(A)",
        "complexity": {
          "zh": "最多访问 A+1 个金额，每个试 k 个币，队列与 visited 最多 O(A)。Java 用 c≤amount−a 再求和，避免大面额相加溢出。",
          "en": "At most A+1 states each inspect k coins. Queue and visited storage are O(A). Java checks c≤amount−a before addition, avoiding overflow for very large denominations."
        },
        "python": "from typing import List\nfrom collections import deque\nclass Solution:\n    def coinChange(self, coins: List[int], amount: int) -> int:\n        if amount == 0: return 0\n        q = deque([0]); seen = {0}; depth = 0\n        while q:\n            depth += 1\n            for _ in range(len(q)):\n                a = q.popleft()\n                for c in coins:\n                    if c > amount - a: continue\n                    b = a + c\n                    if b == amount: return depth\n                    if b not in seen:\n                        seen.add(b); q.append(b)\n        return -1\n",
        "java": "import java.util.*;\nclass Solution {\n    public int coinChange(int[] coins, int amount) {\n        if(amount==0) return 0;\n        boolean[] seen=new boolean[amount+1]; seen[0]=true;\n        ArrayDeque<Integer> q=new ArrayDeque<>(); q.add(0); int depth=0;\n        while(!q.isEmpty()) {\n            depth++;\n            for(int size=q.size();size>0;size--) {\n                int a=q.remove();\n                for(int c:coins) {\n                    if(c>amount-a) continue;\n                    int b=a+c; if(b==amount) return depth;\n                    if(!seen[b]) {seen[b]=true;q.add(b);}\n                }\n            }\n        }\n        return -1;\n    }\n}\n",
        "algorithmNotes": {
          "zh": "把金额当作节点，从 0 出发每加一枚硬币就是走一条边，因此 BFS 层数等于硬币数。只加入未访问且不超过目标的金额；第一次达到目标就是最少枚数，队列耗尽仍未达到则无解。",
          "en": "Treat amounts as nodes and adding one coin as an edge, so BFS depth is the coin count. Enqueue only unseen amounts within the target; the first arrival is optimal, while exhausting the queue means no solution."
        }
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
    },
    "examples": [
      {
        "input": "coins = [2,5,7], amount = 11",
        "output": "3"
      },
      {
        "input": "coins = [2], amount = 3",
        "output": "-1"
      },
      {
        "input": "coins = [1], amount = 0",
        "output": "0"
      }
    ]
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
    "methods": [
      {
        "key": "prefix-dp",
        "name": {
          "zh": "前缀可达 DP 与子串查找",
          "en": "Prefix reachability with substring lookup"
        },
        "intuition": {
          "zh": "把切分位置理解为字符之间的缝隙。dp[i] 表示前 i 个字符能完整切分，而不是第 i 个字符属于某个词。若 j 位置可达，并且 s[j:i] 是字典词，就能走到 i。最长词长为 L，因此不必考察距离 i 超过 L 的切分点。子串创建和哈希都不是免费的，这会反映在复杂度中。\n\n合法拆分的最后一个词必从某个可达前缀后开始，因此转移不遗漏；反过来，可达前缀拼接字典词一定合法，所以不会误标。",
          "en": "View positions as boundaries between characters. dp[i] means the entire prefix of length i can be segmented, not merely that character i belongs to a word. A reachable boundary j can reach i when s[j:i] is a dictionary word. If L is the longest word, boundaries farther than L need not be checked. Creating and hashing substrings costs time and must be included. The last word of any valid segmentation follows a reachable prefix, so the transition misses no solution. Conversely, appending a dictionary word to a valid prefix always produces a valid segmentation."
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
        "time": "O(W+nL²)",
        "space": "O(k+n+L)",
        "complexity": {
          "zh": "n=串长，k=词数，W=字典总字符数，L=最长词长。每个末尾至多 L 个候选，每次切片与哈希至多 O(L)，加建集合 O(W)。辅助空间包括 k 个词引用、n 个状态及 O(L) 临时子串；原输入字符串不另复制。",
          "en": "n is string length, k the word count, W total dictionary characters, and L maximum word length. Each end checks up to L substrings costing up to O(L) to copy/hash, plus O(W) set construction. Extra storage is k word references, n states, and an O(L) temporary substring; input words are not copied."
        },
        "python": "from typing import List\nclass Solution:\n    def wordBreak(self, s: str, wordDict: List[str]) -> bool:\n        words = set(wordDict); longest = max(map(len, wordDict))\n        dp = [False] * (len(s)+1); dp[0] = True\n        for i in range(1, len(s)+1):\n            for j in range(max(0, i-longest), i):\n                if dp[j] and s[j:i] in words:\n                    dp[i] = True; break\n        return dp[-1]\n",
        "java": "import java.util.*;\nclass Solution {\n    public boolean wordBreak(String s, List<String> wordDict) {\n        Set<String> words=new HashSet<>(wordDict); int longest=0;\n        for(String w:wordDict) longest=Math.max(longest,w.length());\n        boolean[] dp=new boolean[s.length()+1];dp[0]=true;\n        for(int i=1;i<=s.length();i++) for(int j=Math.max(0,i-longest);j<i;j++)\n            if(dp[j]&&words.contains(s.substring(j,i))) {dp[i]=true;break;}\n        return dp[s.length()];\n    }\n}\n",
        "algorithmNotes": {
          "zh": "dp[i] 表示前 i 个字符能否完整分词，空前缀 dp[0]=true。枚举最后一段的起点 j，只要 dp[j] 为真且 s[j:i] 在词典中即可设 dp[i] 为真；单词允许重复使用。",
          "en": "dp[i] means the first i characters can be segmented, with dp[0]=true. Try a final word starting at j: a reachable prefix dp[j] plus dictionary membership of s[j:i] makes dp[i] true; words may be reused."
        }
      },
      {
        "key": "trie-dp",
        "name": {
          "zh": "字典树沿可达位置扩展",
          "en": "Trie expansion from reachable boundaries"
        },
        "intuition": {
          "zh": "子串 DP 反复复制并哈希同一批字符。把字典建成字典树后，从每个可达位置向右逐字符走，只要路径还存在就继续；走到词尾就标记新边界。共享前缀只走一条路径，不必为每个候选生成子串，也不能遇到第一个词尾就停止，因为更长词可能是唯一正确选择。\n\n树路径精确表示字典前缀，词尾精确表示字典单词。每次扩展都连接一个可拆前缀与一个完整词；所有从可达起点出发的词都被扫描，所以与前缀 DP 的充要条件相同。",
          "en": "Substring DP repeatedly copies and hashes overlapping text. A trie lets us scan characters directly from each reachable boundary. Continue while trie edges exist and mark a new reachable boundary whenever a word ends. Shared prefixes use one path, no substring is constructed, and traversal must continue past a word ending because a longer word may be necessary. Trie paths represent dictionary prefixes and terminal nodes represent complete words. Every expansion joins a valid prefix with one complete word, and every matching word from a reachable boundary is visited, implementing the same necessary-and-sufficient condition as prefix DP."
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
        "time": "O(W+nL)",
        "space": "O(W+n)",
        "complexity": {
          "zh": "构树遍历 W 个字符；每个起点最多沿最长词走 L 次。Python 字典边按期望 O(1)，Java 固定 26 分支；节点总量 O(W)，状态 O(n)，没有子串复制或递归。",
          "en": "Building visits W dictionary characters; each start follows at most L edges. Python dictionary transitions are expected O(1), while Java uses fixed 26-way arrays. Trie nodes use O(W) storage and reachability uses O(n), without substring copies or recursion."
        },
        "python": "from typing import List\nclass Solution:\n    def wordBreak(self, s: str, wordDict: List[str]) -> bool:\n        root = {}\n        for word in wordDict:\n            node = root\n            for ch in word: node = node.setdefault(ch, {})\n            node['#'] = True\n        ok = [False] * (len(s)+1); ok[0] = True\n        for i in range(len(s)):\n            if not ok[i]: continue\n            node = root\n            for j in range(i, len(s)):\n                if s[j] not in node: break\n                node = node[s[j]]\n                if '#' in node: ok[j+1] = True\n        return ok[-1]\n",
        "java": "import java.util.*;\nclass Solution {\n    static class Node {Node[] next=new Node[26];boolean end;}\n    public boolean wordBreak(String s, List<String> wordDict) {\n        Node root=new Node();\n        for(String word:wordDict) {\n            Node p=root;\n            for(int i=0;i<word.length();i++) {\n                int c=word.charAt(i)-'a';\n                if(p.next[c]==null) p.next[c]=new Node();\n                p=p.next[c];\n            }\n            p.end=true;\n        }\n        boolean[] ok=new boolean[s.length()+1];ok[0]=true;\n        for(int i=0;i<s.length();i++) if(ok[i]) {\n            Node p=root;\n            for(int j=i;j<s.length();j++) {\n                p=p.next[s.charAt(j)-'a']; if(p==null) break;\n                if(p.end) ok[j+1]=true;\n            }\n        }\n        return ok[s.length()];\n    }\n}\n",
        "algorithmNotes": {
          "zh": "从每个可达前缀位置沿 Trie 逐字符前进，遇到单词结束标记就把后面的位置标为可达。路径不存在时停止本次扩展，不能只在最长单词处标记，因为短词也可能接出后续合法分词。",
          "en": "From each reachable prefix, follow Trie edges through the remaining text. Mark a new reachable endpoint at every word-ending node and stop on a missing edge; shorter matching words must not be skipped in favor of only the longest match."
        }
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
    },
    "examples": [
      {
        "input": "s = \"redbluered\", wordDict = [\"red\",\"blue\"]",
        "output": "true"
      },
      {
        "input": "s = \"aaaaab\", wordDict = [\"a\",\"aa\",\"aaa\"]",
        "output": "false"
      },
      {
        "input": "s = \"cars\", wordDict = [\"car\",\"ca\",\"rs\"]",
        "output": "true"
      }
    ]
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
    "methods": [
      {
        "key": "end-dp",
        "name": {
          "zh": "以当前位置结尾的 DP",
          "en": "DP by ending position"
        },
        "intuition": {
          "zh": "只记录前缀的最长长度不够，因为结尾较小的短序列可能更容易延长。改为 dp[i] 表示必须以 nums[i] 结尾的最优长度。它可以独立成长度 1，也可以接在任一更早且数值更小的结尾之后；求所有前驱的最大值再加一。\n\n最优序列若长度大于 1，倒数第二个元素必在合法前驱里。替换为该前驱的最优序列后仍可接当前元素，故转移穷尽且最优。",
          "en": "A single best length per prefix loses information: a shorter sequence with a smaller ending value may extend more easily. Instead, dp[i] is the optimum that must end at nums[i]. This value is either a singleton or extends an earlier sequence whose final value is strictly smaller. Any nonsingleton optimum has a penultimate element among the eligible predecessors. Replacing its prefix with the best sequence ending there preserves extendability, making the recurrence exhaustive and optimal."
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
        "time": "O(n²)",
        "space": "O(n)",
        "complexity": {
          "zh": "第 i 个位置检查 i 个前驱，总和为 n(n−1)/2；dp 占 n 项，返回长度不重建序列。",
          "en": "Position i checks i predecessors, totaling n(n−1)/2 checks. The dp array holds n values; only a length is returned."
        },
        "python": "from typing import List\nclass Solution:\n    def lengthOfLIS(self, nums: List[int]) -> int:\n        dp = [1] * len(nums)\n        for i in range(len(nums)):\n            for j in range(i):\n                if nums[j] < nums[i]: dp[i] = max(dp[i], dp[j]+1)\n        return max(dp)\n",
        "java": "import java.util.*;\nclass Solution {\n    public int lengthOfLIS(int[] nums) {\n        int[] dp=new int[nums.length];Arrays.fill(dp,1);int ans=1;\n        for(int i=0;i<nums.length;i++) {\n            for(int j=0;j<i;j++) if(nums[j]<nums[i]) dp[i]=Math.max(dp[i],dp[j]+1);\n            ans=Math.max(ans,dp[i]);\n        }\n        return ans;\n    }\n}\n",
        "algorithmNotes": {
          "zh": "dp[i] 表示必须以 nums[i] 结尾的最长递增子序列长度，初始为 1。枚举更早的 j，只有 nums[j]<nums[i] 才能接上；答案取所有 dp 的最大值，不一定结束在数组末尾。",
          "en": "dp[i] is the longest increasing subsequence ending specifically at nums[i], initially one. Extend only from earlier j with nums[j]<nums[i]; maximize over all endpoints rather than requiring the final array element."
        }
      },
      {
        "key": "tails",
        "name": {
          "zh": "最小结尾与二分",
          "en": "Minimal tails with binary search"
        },
        "intuition": {
          "zh": "同样长的递增序列，结尾越小越有利于未来扩展。tails[k] 保存目前长度 k+1 的递增序列能取得的最小结尾。来一个 x，找到第一个 ≥x 的结尾，用 x 替换；若不存在则追加。替换不是修改真实子序列，而是改善该长度的代表状态，因此 tails 的内容未必就是原数组的一条子序列。\n\n位置 p 前的最小结尾小于 x，因此存在长度 p 的序列可接上 x。长度 p+1 的结尾被改小不会失去任何未来扩展机会，且不能凭此创建更长序列，归纳维持每种长度的最小结尾。",
          "en": "For equal lengths, a smaller ending value is never worse for future extension. tails[k] stores the smallest ending value achievable by a subsequence of length k+1. Replace the first entry at least x with x, or append if none exists. This changes a representative state, not a reconstructed subsequence; tails itself need not be a subsequence of the input. The tail before p is smaller than x, so a length-p sequence can extend with x. Lowering the tail for length p+1 preserves all possible future extensions and creates no unsupported longer length. Induction maintains the minimal-tail invariant."
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
        "time": "O(n log n)",
        "space": "O(n)",
        "complexity": {
          "zh": "每个元素进行一次 O(log n) 二分；tails 最长 n，Python append 摊还 O(1)，不做中间插入。",
          "en": "Each value performs one O(log n) binary search. tails has at most n elements; Python append is amortized O(1), and replacement never shifts a suffix."
        },
        "python": "from typing import List\nfrom bisect import bisect_left\nclass Solution:\n    def lengthOfLIS(self, nums: List[int]) -> int:\n        tails = []\n        for x in nums:\n            p = bisect_left(tails, x)\n            if p == len(tails): tails.append(x)\n            else: tails[p] = x\n        return len(tails)\n",
        "java": "class Solution {\n    public int lengthOfLIS(int[] nums) {\n        int[] tails=new int[nums.length];int size=0;\n        for(int x:nums) {\n            int lo=0,hi=size;\n            while(lo<hi) {int mid=(lo+hi)>>>1;if(tails[mid]<x) lo=mid+1;else hi=mid;}\n            tails[lo]=x;if(lo==size) size++;\n        }\n        return size;\n    }\n}\n",
        "algorithmNotes": {
          "zh": "tails[len−1] 保存长度为 len 的递增子序列可达到的最小尾值，尾值越小越容易接新数。用二分找到首个 ≥x 的位置并替换，找不到就追加；替换不会减少已有长度，且 tails 本身未必是原数组中的一条子序列。",
          "en": "tails[len−1] is the smallest possible tail for a length-len increasing subsequence. Replace the first tail ≥x, or append if none exists; smaller tails permit more extensions, but tails itself need not be a subsequence of the input."
        }
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
    },
    "examples": [
      {
        "input": "nums = [4,2,5,3,6]",
        "output": "3"
      },
      {
        "input": "nums = [2,2,2]",
        "output": "1"
      },
      {
        "input": "nums = [3,2,1]",
        "output": "1"
      }
    ]
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
    "methods": [
      {
        "key": "extrema-arrays",
        "name": {
          "zh": "同时记录最大和最小结尾乘积",
          "en": "DP arrays for maximum and minimum ending products"
        },
        "intuition": {
          "zh": "负数会让最大变最小、最小变最大，只有最大状态不足以处理第二个负数。hi[i] 和 lo[i] 分别是必须在 i 结束的最大、最小乘积。候选只有三类：从 x 自己开始；把旧最大乘 x；把旧最小乘 x。0 会自然把两个状态归零，下一项可以重新开始，不必专门切数组。\n\n任何在 i 结束的区间，要么只有 x，要么把以 i−1 结束的某区间乘 x。乘以固定数的极值必由旧极值产生，因此三候选完整。",
          "en": "A negative multiplier reverses order, so retaining only the largest product loses the value that may become largest after another negative. hi[i] and lo[i] track the extrema of nonempty intervals ending at i. Candidates are x alone, the previous maximum times x, and the previous minimum times x. Zero naturally resets the products, and a later value can start anew. Every interval ending at i is either the singleton x or an interval ending at i−1 extended by x. Multiplying by a fixed number reaches its extrema at previous extrema, so the three candidates suffice."
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
        "time": "O(n)",
        "space": "O(n)",
        "complexity": {
          "zh": "每个位置常数次乘法和比较，两条长度 n 的数组保存状态；题设保证乘积不溢出 32 位。",
          "en": "Constant work is done at each position. Two length-n arrays retain states, and the problem guarantees products fit 32 bits."
        },
        "python": "from typing import List\nclass Solution:\n    def maxProduct(self, nums: List[int]) -> int:\n        hi = [0]*len(nums); lo = [0]*len(nums)\n        hi[0] = lo[0] = ans = nums[0]\n        for i in range(1, len(nums)):\n            x = nums[i]; a = hi[i-1]*x; b = lo[i-1]*x\n            hi[i] = max(x,a,b); lo[i] = min(x,a,b)\n            ans = max(ans,hi[i])\n        return ans\n",
        "java": "class Solution {\n    public int maxProduct(int[] nums) {\n        int[] hi=new int[nums.length],lo=new int[nums.length];\n        int ans=nums[0];hi[0]=lo[0]=ans;\n        for(int i=1;i<nums.length;i++) {\n            int x=nums[i],a=hi[i-1]*x,b=lo[i-1]*x;\n            hi[i]=Math.max(x,Math.max(a,b));lo[i]=Math.min(x,Math.min(a,b));\n            ans=Math.max(ans,hi[i]);\n        }\n        return ans;\n    }\n}\n",
        "algorithmNotes": {
          "zh": "每个位置同时存以它结尾的最大和最小乘积，因为负数会交换大小关系。新状态都从当前值、旧最大乘当前值、旧最小乘当前值三者中选，不能只跟踪最大值；0 会自然重启候选段。",
          "en": "Store both maximum and minimum products ending at each position because a negative value reverses order. Choose each new state from x, oldMax*x and oldMin*x; tracking only the maximum loses valid negative-to-positive transitions, while zero naturally resets candidates."
        }
      },
      {
        "key": "rolling-extrema",
        "name": {
          "zh": "滚动压缩两个极值",
          "en": "Rolling extrema"
        },
        "intuition": {
          "zh": "上面的转移只依赖紧邻上一位置，不需要保留整条数组。用两个变量 hi、lo 保存旧极值，先算 a=hi*x、b=lo*x，再同时更新两个状态。若先覆盖 hi 再拿新 hi 算 lo，会把不同位置混在一起，这正是压缩 DP 最容易出错的地方。\n\n循环前的 hi、lo 始终等于二维状态在上一位置的值；保存两个乘积后再覆盖，转移完全等价于数组版，所以压缩不改变结果。",
          "en": "Only the immediately preceding pair of extrema is needed. Keep hi and lo in scalar variables and compute a=hi*x and b=lo*x before overwriting either state. Updating hi and then using that new value to compute lo would mix different positions, a common rolling-DP error. Before each iteration, hi and lo equal the full DP values at the previous position. Capturing both products before overwriting implements exactly the same recurrence, so compression preserves the result."
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
        "time": "O(n)",
        "space": "O(1)",
        "complexity": {
          "zh": "一次线性扫描，仅保存固定数量的整数。Python 使用下标循环而非 nums[1:]，避免隐藏的 O(n) 切片复制。",
          "en": "A linear scan stores only a fixed number of integers. Python indexes the original list rather than slicing nums[1:], avoiding a hidden O(n) copy."
        },
        "python": "from typing import List\nclass Solution:\n    def maxProduct(self, nums: List[int]) -> int:\n        hi = lo = ans = nums[0]\n        for i in range(1,len(nums)):\n            x = nums[i]; a = hi*x; b = lo*x\n            hi = max(x,a,b); lo = min(x,a,b)\n            ans = max(ans,hi)\n        return ans\n",
        "java": "class Solution {\n    public int maxProduct(int[] nums) {\n        int hi=nums[0],lo=hi,ans=hi;\n        for(int i=1;i<nums.length;i++) {\n            int x=nums[i],a=hi*x,b=lo*x;\n            hi=Math.max(x,Math.max(a,b));lo=Math.min(x,Math.min(a,b));\n            ans=Math.max(ans,hi);\n        }\n        return ans;\n    }\n}\n",
        "algorithmNotes": {
          "zh": "用两个变量代替整组最大最小状态，但计算本轮前必须保存旧值。新的最大和最小都只能依赖上一轮；如果先覆盖最大再计算最小，会把不同轮次的状态混用。",
          "en": "Keep only the previous maximum and minimum, saving both before updating. Compute both new extrema from those old values; overwriting the maximum first and using it for the minimum would mix different iterations."
        }
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
    },
    "examples": [
      {
        "input": "nums = [-2,3,-4,0,2]",
        "output": "24"
      },
      {
        "input": "nums = [-2]",
        "output": "-2"
      },
      {
        "input": "nums = [-2,0,-1]",
        "output": "0"
      }
    ]
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
    "methods": [
      {
        "key": "table-knapsack",
        "name": {
          "zh": "二维 0/1 背包",
          "en": "Two-dimensional 0/1 knapsack"
        },
        "intuition": {
          "zh": "两组相等就意味着每组和为总和的一半；总和为奇数直接不可能。问题转成是否能选出若干位置凑 target。dp[i][s] 表示仅用前 i 个元素能否凑到 s。处理当前 x 时明确分成不选和选两支，且选的前驱必须在上一行，防止一个元素被重复使用。\n\n每个子集对当前元素只有选与不选两个互斥情况，前驱只使用前 i−1 个元素，因此覆盖全部合法子集且不重复使用位置。",
          "en": "Equal groups must each total half the array sum, so an odd total is impossible. The remaining question is whether a subset reaches target. dp[i][s] records reachability using only the first i items. Split each decision into skipping or taking the current x; taking must refer to the previous row so one position cannot be reused. Every subset either takes or skips the current item. Both predecessors use only earlier items, covering all legal subsets without reusing a position."
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
        "time": "O(nT)",
        "space": "O(nT)",
        "complexity": {
          "zh": "T=总和/2；nT 个布尔转移，表含 (n+1)(T+1) 项。只返回布尔值，未保存具体子集。",
          "en": "T is half the total. The table performs nT Boolean transitions and stores (n+1)(T+1) entries; no subset reconstruction is retained."
        },
        "python": "from typing import List\nclass Solution:\n    def canPartition(self, nums: List[int]) -> bool:\n        total = sum(nums)\n        if total % 2: return False\n        t = total//2; n = len(nums)\n        dp = [[False]*(t+1) for _ in range(n+1)]; dp[0][0] = True\n        for i,x in enumerate(nums,1):\n            for s in range(t+1):\n                dp[i][s] = dp[i-1][s] or (s>=x and dp[i-1][s-x])\n        return dp[n][t]\n",
        "java": "class Solution {\n    public boolean canPartition(int[] nums) {\n        int sum=0;for(int x:nums) sum+=x;if(sum%2!=0)return false;\n        int t=sum/2;boolean[][] dp=new boolean[nums.length+1][t+1];dp[0][0]=true;\n        for(int i=1;i<=nums.length;i++) for(int s=0;s<=t;s++)\n            dp[i][s]=dp[i-1][s]||(s>=nums[i-1]&&dp[i-1][s-nums[i-1]]);\n        return dp[nums.length][t];\n    }\n}\n",
        "algorithmNotes": {
          "zh": "总和为奇数直接失败，否则目标是选出和为总和一半的子集。dp[i][s] 表示前 i 个数能否凑出 s，状态来自“不选当前数”或“从上一行凑出 s−当前数后选它”；每个数最多用一次。",
          "en": "Reject an odd total; otherwise seek a subset totaling half. dp[i][s] records whether the first i values can make s, using either omission or a previous-row state at s−value, so each item is used at most once."
        }
      },
      {
        "key": "reverse-knapsack",
        "name": {
          "zh": "倒序容量的一维背包",
          "en": "One-dimensional knapsack with descending sums"
        },
        "intuition": {
          "zh": "只需要上一行，可将二维表折叠成一行。关键不是少开一个数组，而是更新顺序：对当前 x，s 必须从 target 向 x 递减。这样 s−x 尚未在本轮更新，仍代表不含当前元素的上一行。如果正序更新，同一个 x 会通过刚写出的状态被再次使用，变成了无限次选取。\n\n倒序确保读取的较小容量是上一轮状态，不含当前元素。当前 dp[s] 保留不选分支，dp[s−x] 提供选分支，完全等价于二维转移。",
          "en": "The table can be folded into one row, but update order is essential. For current x, visit s from target down to x. Then s−x has not yet been updated this round and still represents earlier items. Ascending updates would reuse the newly written states and accidentally allow the same item multiple times. Descending order ensures the smaller predecessor still belongs to the previous round. The old dp[s] is the skip branch and dp[s−x] supplies the take branch, exactly reproducing the two-dimensional recurrence."
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
        "time": "O(nT)",
        "space": "O(T)",
        "complexity": {
          "zh": "每个元素至多更新 T 个容量；仅一条 T+1 状态数组，没有递归栈或输入复制。",
          "en": "Each of n items updates at most T sums. Only T+1 Boolean states are stored, with no recursion or input copy."
        },
        "python": "from typing import List\nclass Solution:\n    def canPartition(self, nums: List[int]) -> bool:\n        total = sum(nums)\n        if total % 2: return False\n        t = total//2; dp = [False]*(t+1); dp[0] = True\n        for x in nums:\n            for s in range(t,x-1,-1): dp[s] = dp[s] or dp[s-x]\n        return dp[t]\n",
        "java": "class Solution {\n    public boolean canPartition(int[] nums) {\n        int sum=0;for(int x:nums)sum+=x;if(sum%2!=0)return false;\n        int t=sum/2;boolean[] dp=new boolean[t+1];dp[0]=true;\n        for(int x:nums)for(int s=t;s>=x;s--)dp[s]=dp[s]||dp[s-x];\n        return dp[t];\n    }\n}\n",
        "algorithmNotes": {
          "zh": "一维 dp[s] 记录和 s 是否可达，dp[0]=true。处理每个数时金额从目标向下遍历，保证读取的 dp[s−x] 尚未包含本轮的 x；正向遍历会错误地允许同一元素重复使用。",
          "en": "Use dp[s] for reachable sums with dp[0]=true. For each value x, iterate sums downward so dp[s−x] has not yet used this occurrence; an upward loop would incorrectly permit reusing the same item."
        }
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
    },
    "examples": [
      {
        "input": "nums = [2,3,4,5]",
        "output": "true"
      },
      {
        "input": "nums = [1]",
        "output": "false"
      },
      {
        "input": "nums = [1,2,5]",
        "output": "false"
      }
    ]
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
    "methods": [
      {
        "key": "index-stack",
        "name": {
          "zh": "下标栈与失配边界",
          "en": "Index stack with an invalid boundary"
        },
        "intuition": {
          "zh": "栈不仅要知道有没有左括号，还要知道合法片段能从哪里开始。底部保存最近一个无法匹配的右括号下标，初始为 −1；上面保存未匹配的左括号下标。看到右括号弹掉一个位置后，如果还有栈顶，它就是当前合法后缀之前的边界，长度为 i−top；若栈空，当前右括号本身成为新边界。\n\n未匹配括号无法被合法片段跨越。匹配后栈顶是离当前末尾最近的阻挡位置，所以其后到 i 是最长合法后缀；遍历所有末尾即可得到全局最大。",
          "en": "The stack must record boundaries, not just counts. Its bottom is the latest unmatched closing-parenthesis index, initially −1; entries above it are unmatched opening indices. After popping for a closing parenthesis, a surviving top marks the boundary just before the current valid suffix, whose length is i−top. If nothing remains, this closing parenthesis becomes a new invalid boundary. An unmatched bracket cannot lie inside a valid substring. After matching, the remaining top is the nearest blocking position, so the interval after it through i is the longest valid suffix. Checking every ending position finds the global optimum."
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
        "time": "O(n)",
        "space": "O(n)",
        "complexity": {
          "zh": "每个下标至多入栈出栈一次。全为左括号时栈长 n+1；没有构造子串。",
          "en": "Each index is pushed and popped at most once. An all-opening string needs n+1 stack entries; no substrings are constructed."
        },
        "python": "class Solution:\n    def longestValidParentheses(self, s: str) -> int:\n        stack = [-1]; ans = 0\n        for i,ch in enumerate(s):\n            if ch == '(': stack.append(i)\n            else:\n                stack.pop()\n                if not stack: stack.append(i)\n                else: ans = max(ans,i-stack[-1])\n        return ans\n",
        "java": "import java.util.*;\nclass Solution {\n    public int longestValidParentheses(String s) {\n        ArrayDeque<Integer> stack=new ArrayDeque<>();stack.push(-1);int ans=0;\n        for(int i=0;i<s.length();i++) {\n            if(s.charAt(i)=='(')stack.push(i);\n            else {stack.pop();if(stack.isEmpty())stack.push(i);else ans=Math.max(ans,i-stack.peek());}\n        }\n        return ans;\n    }\n}\n",
        "algorithmNotes": {
          "zh": "栈底先放 −1 作为最近无效边界，左括号压下标。右括号弹栈后若栈空，就把该右括号下标设为新边界；否则当前下标减栈顶就是以此结尾的最长有效长度。",
          "en": "Initialize the stack with −1 as the invalid boundary and push opening indices. After a closing bracket pops, an empty stack requires a new boundary at that index; otherwise currentIndex−stackTop gives the valid suffix length."
        }
      },
      {
        "key": "two-scans",
        "name": {
          "zh": "左右两次计数扫描",
          "en": "Two directional counting scans"
        },
        "intuition": {
          "zh": "从左向右统计当前区间内的左右括号数，相等时形成合法片段；右括号更多时不可能被未来左括号补救，必须重置。但左括号过多的前缀会遮住内部答案，例如 (()。因此再从右往左对称扫描，遇到左括号更多时重置，补上第一遍遗漏的情况。\n\n正向只在右括号过量时切断，因此计数相等的未切断区间合法；反向对称。最长合法片段若被多余左括号挡住正向识别，反向会去掉该阻挡，反之亦然，两遍覆盖。",
          "en": "Scan left to right while counting opening and closing brackets. Equal counts give a valid candidate; excess closing brackets cannot be repaired by later openings, so reset. Excess openings can hide an internal optimum, as in ((). A second scan from right to left resets on excess openings and captures the cases the first direction misses. A forward segment with no excess closings and equal final counts is valid; the backward condition is symmetric. An optimum hidden by surplus openings in the forward scan is exposed by the reverse scan, and vice versa. Together the passes cover every maximal candidate."
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
        "time": "O(n)",
        "space": "O(1)",
        "complexity": {
          "zh": "扫描两遍共 2n 次，仅四个计数/下标变量。Python 倒序 range 不产生长度 n 的字符串副本。",
          "en": "The two scans make 2n visits and store only scalar counters. Python uses descending indices, not a reversed string copy."
        },
        "python": "class Solution:\n    def longestValidParentheses(self, s: str) -> int:\n        ans = left = right = 0\n        for ch in s:\n            if ch == '(': left += 1\n            else: right += 1\n            if left == right: ans = max(ans,2*right)\n            elif right > left: left = right = 0\n        left = right = 0\n        for i in range(len(s)-1,-1,-1):\n            if s[i] == '(': left += 1\n            else: right += 1\n            if left == right: ans = max(ans,2*left)\n            elif left > right: left = right = 0\n        return ans\n",
        "java": "class Solution {\n    public int longestValidParentheses(String s) {\n        int ans=0,left=0,right=0;\n        for(int i=0;i<s.length();i++) {\n            if(s.charAt(i)=='(')left++;else right++;\n            if(left==right)ans=Math.max(ans,2*right);else if(right>left)left=right=0;\n        }\n        left=right=0;\n        for(int i=s.length()-1;i>=0;i--) {\n            if(s.charAt(i)=='(')left++;else right++;\n            if(left==right)ans=Math.max(ans,2*left);else if(left>right)left=right=0;\n        }\n        return ans;\n    }\n}\n",
        "algorithmNotes": {
          "zh": "从左向右累计左右括号数，相等时更新长度，右括号更多时清零。仅此方向会漏掉左括号过多的情况，因此再从右向左对称扫描，此时左括号更多才清零。",
          "en": "Scan left to right, updating length when opening and closing counts match and resetting when closings exceed openings. Then scan right to left, resetting for excess openings, to recover cases hidden by surplus opening brackets."
        }
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
    },
    "examples": [
      {
        "input": "s = \"()(())(\"",
        "output": "6"
      },
      {
        "input": "s = \"\"",
        "output": "0"
      },
      {
        "input": "s = \"(()\"",
        "output": "2"
      }
    ]
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
    "methods": [
      {
        "key": "grid-dp",
        "name": {
          "zh": "网格路径计数 DP",
          "en": "Grid path-count DP"
        },
        "intuition": {
          "zh": "抵达某格的最后一步只可能来自上格或左格，两类路线最后一步不同，不会重复。把它们的路线数相加即可。第一行只能一直向右，第一列只能一直向下，路径数均为 1；这也解释了为什么边界不是初始化为 0。\n\n路线按最后一步分成上方、左方两类，不重不漏；边界唯一，按行归纳得到每格正确计数。",
          "en": "The final move into a cell comes either from above or from the left. These route sets are disjoint because their final moves differ, so their counts add. The first row has only rightward routes and the first column only downward routes, giving count one on both boundaries. Partitioning routes by their final move is exhaustive and disjoint. Unique boundary routes establish the base case; row-wise induction gives every count."
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
        "time": "O(mn)",
        "space": "O(mn)",
        "complexity": {
          "zh": "每格至多一次加法，二维表 mn 项；题设答案上界也限制中间格的计数。",
          "en": "At most one addition is performed per cell, and the table holds mn entries. The answer bound also bounds intermediate cell counts."
        },
        "python": "class Solution:\n    def uniquePaths(self, m: int, n: int) -> int:\n        dp = [[1]*n for _ in range(m)]\n        for r in range(1,m):\n            for c in range(1,n): dp[r][c] = dp[r-1][c]+dp[r][c-1]\n        return dp[-1][-1]\n",
        "java": "import java.util.*;\nclass Solution {\n    public int uniquePaths(int m,int n) {\n        int[][] dp=new int[m][n];for(int[] row:dp)Arrays.fill(row,1);\n        for(int r=1;r<m;r++)for(int c=1;c<n;c++)dp[r][c]=dp[r-1][c]+dp[r][c-1];\n        return dp[m-1][n-1];\n    }\n}\n",
        "algorithmNotes": {
          "zh": "dp[r][c] 表示到达格子 (r,c) 的路径数，只能来自上方或左方。首行和首列只能沿单一方向到达，均初始化为 1；其他位置把两个来源相加，终点值就是总路径数。",
          "en": "dp[r][c] counts paths to the cell from above or the left. Initialize the first row and column to one because each has a single route, then sum the two predecessor counts for every interior cell."
        }
      },
      {
        "key": "rolling-row",
        "name": {
          "zh": "滚动一行计数",
          "en": "Rolling-row path counts"
        },
        "intuition": {
          "zh": "一格只依赖上方旧行和左侧当前行，因此一条数组就能同时承载两种角色。更新 dp[c] 前，它还是上格；dp[c−1] 已更新，是当前行左格。必须从左向右更新。网格横竖对称，可让较短维度作为数组长度来进一步节省空间。\n\n更新时旧 dp[c] 与新 dp[c−1] 恰好是二维转移要求的上方和左方，故每轮完成后整行与二维表对应行相同。",
          "en": "One array can hold both the previous row and the current row. Before updating dp[c], it is the count above; dp[c−1] already holds the current row’s left count. Thus updates must go left to right. Grid symmetry lets the shorter dimension be the array width. At every update, the old dp[c] and new dp[c−1] are exactly the upper and left predecessors. Each completed row therefore matches the full table."
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
        "time": "O(mn)",
        "space": "O(min(m,n))",
        "complexity": {
          "zh": "仍访问全部网格状态，但仅保存较短维度的一行；无递归或路径列表输出。",
          "en": "All grid states are still visited, but only one row of the shorter dimension is stored; no recursion or route list is produced."
        },
        "python": "class Solution:\n    def uniquePaths(self, m: int, n: int) -> int:\n        width,height = min(m,n),max(m,n)\n        dp = [1]*width\n        for _ in range(1,height):\n            for c in range(1,width): dp[c] += dp[c-1]\n        return dp[-1]\n",
        "java": "import java.util.*;\nclass Solution {\n    public int uniquePaths(int m,int n) {\n        int width=Math.min(m,n),height=Math.max(m,n);\n        int[] dp=new int[width];Arrays.fill(dp,1);\n        for(int r=1;r<height;r++)for(int c=1;c<width;c++)dp[c]+=dp[c-1];\n        return dp[width-1];\n    }\n}\n",
        "algorithmNotes": {
          "zh": "一维数组更新前 dp[c] 仍代表上方格子，更新后的 dp[c−1] 代表本行左方格子。从左到右做 dp[c]+=dp[c−1] 即可，第一列保持 1；更新方向不能反过来。",
          "en": "Before updating, dp[c] is the count from above while the already updated dp[c−1] is from the left. Traverse left to right with dp[c]+=dp[c−1], keeping the first column at one; reversing direction would use the wrong states."
        }
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
    },
    "examples": [
      {
        "input": "m = 3, n = 4",
        "output": "10"
      },
      {
        "input": "m = 1, n = 1",
        "output": "1"
      },
      {
        "input": "m = 1, n = 5",
        "output": "1"
      }
    ]
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
    "methods": [
      {
        "key": "grid-cost",
        "name": {
          "zh": "二维最小路径 DP",
          "en": "Two-dimensional minimum-cost DP"
        },
        "intuition": {
          "zh": "计数题对前驱求和，这里优化代价，所以应取两个前驱中的较小值，再加当前格。dp[r][c] 含当前格的代价，不能重复加前驱格。首行首列只有一个前驱，要单独处理；给不存在的方向设无穷也能统一表达。\n\n任一到达当前格的路线必由上方或左方进入；若前缀非最优，可替换成更便宜前缀而不改变最后一步。因此取最小前驱得到最优路线。",
          "en": "Unlike path counting, this problem minimizes cost: take the cheaper predecessor and add the current cell. dp[r][c] already includes that cell, so predecessor cells must not be added again. Boundary cells have only one predecessor; infinity can represent the missing direction. Every route enters from above or left. A nonoptimal prefix can be replaced by a cheaper one without changing the final move, so the cheaper optimal predecessor yields an optimal route."
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
        "time": "O(mn)",
        "space": "O(mn)",
        "complexity": {
          "zh": "mn 个状态各作常数次比较和加法，独立二维表占 mn 项，输入不复制到另一网格。",
          "en": "Each of mn states does constant work. A separate table stores mn costs, without modifying the input."
        },
        "python": "from typing import List\nclass Solution:\n    def minPathSum(self, grid: List[List[int]]) -> int:\n        m,n = len(grid),len(grid[0]); dp = [[0]*n for _ in range(m)]\n        for r in range(m):\n            for c in range(n):\n                if r==0 and c==0: dp[r][c]=grid[r][c]; continue\n                up=dp[r-1][c] if r else float('inf')\n                left=dp[r][c-1] if c else float('inf')\n                dp[r][c]=grid[r][c]+min(up,left)\n        return dp[-1][-1]\n",
        "java": "class Solution {\n    public int minPathSum(int[][] grid) {\n        int m=grid.length,n=grid[0].length;int[][] dp=new int[m][n];\n        for(int r=0;r<m;r++)for(int c=0;c<n;c++) {\n            if(r==0&&c==0){dp[r][c]=grid[r][c];continue;}\n            int up=r>0?dp[r-1][c]:Integer.MAX_VALUE;\n            int left=c>0?dp[r][c-1]:Integer.MAX_VALUE;\n            dp[r][c]=grid[r][c]+Math.min(up,left);\n        }\n        return dp[m-1][n-1];\n    }\n}\n",
        "algorithmNotes": {
          "zh": "dp[r][c] 是包含当前格子代价的最小路径和，上方和左方取较小后再加 grid[r][c]。首行和首列只能从唯一前驱累计，不能初始化为 0，否则会凭空跳过路径代价。",
          "en": "dp[r][c] includes the current cell's cost, added to the smaller predecessor from above or left. Accumulate first-row and first-column costs from their only predecessor rather than initializing them to zero."
        }
      },
      {
        "key": "rolling-cost",
        "name": {
          "zh": "滚动一行且保留原网格",
          "en": "Rolling costs without mutating the grid"
        },
        "intuition": {
          "zh": "上方是 dp[c] 的旧值，左方是 dp[c−1] 的新值，因此和路径计数一样可以压缩到一行。初始化全为无穷，仅把 dp[0] 设为 0，第一次处理起点时加上它的值。后续第一列只能沿上方走，其余格比较上方与左方。\n\n旧值和新值分别对应二维表的两个合法前驱，首次起点的虚拟零代价给出正确初值。后续更新与二维递推完全一致。",
          "en": "The old dp[c] is the cost above, while the new dp[c−1] is the cost on the left, permitting one-row compression. Initialize entries to infinity except dp[0]=0 so the first update adds the starting cell. Later first-column cells inherit only from above, and interior cells compare both directions. Old and new entries correspond to the two predecessors in the full table. The initial virtual zero cost correctly initializes the start; all later updates implement the same recurrence."
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
        "time": "O(mn)",
        "space": "O(n)",
        "complexity": {
          "zh": "m 行 n 列，每格一次更新；仅 n 个成本状态。不修改输入，也不存路径，辅助空间并非 O(1)。",
          "en": "For m rows and n columns, each cell is updated once. Only n costs are stored. Input is preserved and no route is reconstructed; auxiliary space is O(n), not O(1)."
        },
        "python": "from typing import List\nclass Solution:\n    def minPathSum(self, grid: List[List[int]]) -> int:\n        n=len(grid[0]);dp=[float('inf')]*n;dp[0]=0\n        for row in grid:\n            for c in range(n):\n                best=dp[c]\n                if c: best=min(best,dp[c-1])\n                dp[c]=best+row[c]\n        return dp[-1]\n",
        "java": "import java.util.*;\nclass Solution {\n    public int minPathSum(int[][] grid) {\n        int n=grid[0].length;int[] dp=new int[n];Arrays.fill(dp,Integer.MAX_VALUE);dp[0]=0;\n        for(int[] row:grid)for(int c=0;c<n;c++) {\n            int best=dp[c];if(c>0)best=Math.min(best,dp[c-1]);\n            dp[c]=best+row[c];\n        }\n        return dp[n-1];\n    }\n}\n",
        "algorithmNotes": {
          "zh": "从左到右更新时，dp[c] 是上一行同列代价，dp[c−1] 已是本行左侧代价。对两者取最小并加当前格子；首行与首列单独按累计处理，避免把不存在的方向当成免费入口。",
          "en": "Updating left to right leaves dp[c] as the cost above and dp[c−1] as the current row's left cost. Add the cell cost to their minimum, handling the first row and column separately so nonexistent predecessors are not free entries."
        }
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
    },
    "examples": [
      {
        "input": "grid = [[2,1,4],[3,2,1]]",
        "output": "6"
      },
      {
        "input": "grid = [[0]]",
        "output": "0"
      },
      {
        "input": "grid = [[1,2,3]]",
        "output": "6"
      }
    ]
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
    "methods": [
      {
        "key": "interval-dp",
        "name": {
          "zh": "区间回文动态规划",
          "en": "Interval palindrome DP"
        },
        "intuition": {
          "zh": "长回文去掉两端后仍是回文，因此可以由短区间推长区间。pal[l][r] 为真需要两端相等，且中间区间为回文；长度 1、2 时中间为空或只剩边界，无需再查。按照区间长度从短到长填写就能保证依赖已准备好，只记录最佳区间的下标，最后才切一次字符串。\n\n回文与“相等端点加回文内层”互为充要条件；短区间基例正确，按长度归纳可判断所有区间，取最长即答案。",
          "en": "Removing matching endpoints from a palindrome leaves a palindrome. Thus pal[l][r] requires equal endpoints and a palindromic interior. Length-one and length-two intervals need no interior lookup. Process intervals by increasing length so dependencies are ready, record only the best indices, and copy the answer once at the end. Equal endpoints surrounding a palindromic interior are necessary and sufficient. Correct short-interval base cases and induction on length classify every interval, so the longest marked interval is optimal."
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
        "time": "O(n²)",
        "space": "O(n²) auxiliary + O(L) output",
        "complexity": {
          "zh": "共有 n(n+1)/2 个区间，转移 O(1)；二维布尔表 O(n²)。最终子串复制 L 个字符占 O(L) 输出，不在循环中反复切片。",
          "en": "There are n(n+1)/2 constant-time transitions and O(n²) table storage. The final substring copies L characters as O(L) output storage; slicing is not repeated inside the loops."
        },
        "python": "class Solution:\n    def longestPalindrome(self, s: str) -> str:\n        n=len(s);pal=[[False]*n for _ in range(n)];start=0;best=1\n        for length in range(1,n+1):\n            for l in range(n-length+1):\n                r=l+length-1\n                if s[l]==s[r] and (length<=2 or pal[l+1][r-1]):\n                    pal[l][r]=True\n                    if length>best: start=l;best=length\n        return s[start:start+best]\n",
        "java": "class Solution {\n    public String longestPalindrome(String s) {\n        int n=s.length(),start=0,best=1;boolean[][] pal=new boolean[n][n];\n        for(int len=1;len<=n;len++)for(int l=0;l+len<=n;l++) {\n            int r=l+len-1;\n            if(s.charAt(l)==s.charAt(r)&&(len<=2||pal[l+1][r-1])) {\n                pal[l][r]=true;if(len>best){start=l;best=len;}\n            }\n        }\n        return s.substring(start,start+best);\n    }\n}\n",
        "algorithmNotes": {
          "zh": "状态 pal[l][r] 依赖内部区间 pal[l+1][r−1]，因此按长度递增计算。两端字符相同且长度不超过 2，或内部已是回文时标真；每次发现更长区间就记录起点和长度。",
          "en": "pal[l][r] depends on its inner interval, so process lengths in increasing order. Matching endpoints form a palindrome when the length is at most two or the interior is palindromic; record the start and length whenever a longer one is found."
        }
      },
      {
        "key": "centers",
        "name": {
          "zh": "奇偶中心向外扩展",
          "en": "Expand around odd and even centers"
        },
        "intuition": {
          "zh": "每个回文都有唯一的几何中心：奇数长度以一个字符为中心，偶数长度以两字符之间为中心。从中心向外比较两端，匹配就继续，不匹配就停止；这样不用保存所有区间真假。必须同时枚举两类中心，否则会漏掉 abba 这种偶数回文。\n\n任意回文都对应被枚举的奇或偶中心，从该中心扩展会到达它。每次更新时两端相等且内部已匹配，所以只记录真回文，最大长度必被找到。",
          "en": "Every palindrome has a center: a character for odd length or a gap for even length. Starting at each center, expand while the two endpoints match and stop at the first mismatch. This avoids storing all interval states. Both center types are required; considering only characters would miss abba. Every palindrome belongs to one enumerated odd or even center and is reached by expanding from it. Each recorded interval has matching endpoints and an already matched interior, so only real palindromes are considered and the maximum is found."
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
        "time": "O(n²)",
        "space": "O(1) auxiliary + O(L) output",
        "complexity": {
          "zh": "最多 2n 个中心，每个最坏扩展 O(n)，如全相同字符。只保存下标，无递归；最终长度 L 的返回字符串占输出空间。",
          "en": "At most 2n centers each expand O(n) in the worst case, such as identical characters. Only indices are stored without recursion; the returned length-L string accounts for output space."
        },
        "python": "class Solution:\n    def longestPalindrome(self, s: str) -> str:\n        start=0;best=1;n=len(s)\n        for i in range(n):\n            for offset in (0,1):\n                l,r=i,i+offset\n                while l>=0 and r<n and s[l]==s[r]:\n                    if r-l+1>best: start=l;best=r-l+1\n                    l-=1;r+=1\n        return s[start:start+best]\n",
        "java": "class Solution {\n    public String longestPalindrome(String s) {\n        int start=0,best=1,n=s.length();\n        for(int i=0;i<n;i++)for(int offset=0;offset<=1;offset++) {\n            int l=i,r=i+offset;\n            while(l>=0&&r<n&&s.charAt(l)==s.charAt(r)) {\n                if(r-l+1>best){start=l;best=r-l+1;}l--;r++;\n            }\n        }\n        return s.substring(start,start+best);\n    }\n}\n",
        "algorithmNotes": {
          "zh": "分别以每个字符和相邻字符之间为中心，覆盖奇数和偶数长度回文。左右字符相等就同时向外扩展，停止时边界已越过最后一个合法字符，因此有效区间是 left+1 到 right−1。",
          "en": "Expand around each character and each gap to cover odd and even lengths. Move outward while characters match; when expansion stops, the valid interval is left+1 through right−1 because the pointers have passed its endpoints."
        }
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
    },
    "examples": [
      {
        "input": "s = \"zabbay\"",
        "output": "\"abba\""
      },
      {
        "input": "s = \"a\"",
        "output": "\"a\""
      },
      {
        "input": "s = \"aaaa\"",
        "output": "\"aaaa\""
      }
    ]
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
    "methods": [
      {
        "key": "prefix-table",
        "name": {
          "zh": "双前缀二维 DP",
          "en": "DP over two prefixes"
        },
        "intuition": {
          "zh": "dp[i][j] 表示两个长度分别为 i、j 的前缀的最长公共子序列。末字符相等时，可以在更短前缀的公共序列后接上这个字符；不等时不可能同时匹配两个末字符，至少丢弃其中一个，因此比较“丢第一串末尾”和“丢第二串末尾”。这里不相等时取最大而非清零，清零是公共子串的思路。\n\n末字符相等时存在包含该匹配的最优解；不等时任何公共序列至少避开一个末字符。对应子问题覆盖所有可能，且构造出的序列都合法。",
          "en": "dp[i][j] is the LCS length of prefixes of lengths i and j. Equal final characters extend an optimum of the two shorter prefixes. Unequal final characters cannot both be matched as the final pair, so discard one end or the other and take the larger result. Do not reset to zero on mismatch: that would model a contiguous common substring instead. When final characters match, an optimum can include that matched pair. When they differ, any common sequence avoids at least one end. The resulting subproblems cover all possibilities and generate only valid common sequences."
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
        "time": "O(mn)",
        "space": "O(mn)",
        "complexity": {
          "zh": "m、n 为两个串长；每对前缀计算一次，表大小 (m+1)(n+1)，不复制子串。",
          "en": "m and n are string lengths. Each prefix pair is evaluated once in a (m+1)(n+1) table, without substring copies."
        },
        "python": "class Solution:\n    def longestCommonSubsequence(self, text1: str, text2: str) -> int:\n        m,n=len(text1),len(text2);dp=[[0]*(n+1) for _ in range(m+1)]\n        for i in range(1,m+1):\n            for j in range(1,n+1):\n                if text1[i-1]==text2[j-1]: dp[i][j]=dp[i-1][j-1]+1\n                else: dp[i][j]=max(dp[i-1][j],dp[i][j-1])\n        return dp[m][n]\n",
        "java": "class Solution {\n    public int longestCommonSubsequence(String a,String b) {\n        int m=a.length(),n=b.length();int[][] dp=new int[m+1][n+1];\n        for(int i=1;i<=m;i++)for(int j=1;j<=n;j++)\n            dp[i][j]=a.charAt(i-1)==b.charAt(j-1)?dp[i-1][j-1]+1:Math.max(dp[i-1][j],dp[i][j-1]);\n        return dp[m][n];\n    }\n}\n",
        "algorithmNotes": {
          "zh": "dp[i][j] 表示两个字符串前 i、j 个字符的最长公共子序列长度。末字符相等时接在 dp[i−1][j−1] 后面加一，否则尝试分别丢弃一个末字符取最大；不是要求连续的公共子串。",
          "en": "dp[i][j] is the LCS length for prefixes of lengths i and j. Equal final characters extend dp[i−1][j−1] by one; otherwise take the better result from dropping either final character. Matching positions need not be contiguous."
        }
      },
      {
        "key": "rolling-lcs",
        "name": {
          "zh": "一行 DP 与旧对角值",
          "en": "One row plus an old diagonal"
        },
        "intuition": {
          "zh": "一行压缩同时需要上、左、左上三种值。更新前 dp[j] 是旧上方，dp[j−1] 是已更新左方；旧左上已经被覆盖，必须额外用 diagonal 保存。每次先把旧 dp[j] 存成 old，更新当前格后令 diagonal=old，为下一列准备。让较短串作为列可以减少空间。\n\n每次更新前的三个变量准确对应二维表的三个前驱；保存旧值再覆盖维护不变式，因此逐格结果与二维版完全一致。",
          "en": "Compressed LCS needs upper, left, and diagonal predecessors. Before updating, dp[j] is the old upper value and dp[j−1] the new left value. The old diagonal has already been overwritten, so retain it in a scalar. Save old dp[j], compute the new cell, then make the saved value the next diagonal. Use the shorter string for columns. The three values before each update correspond exactly to the full table’s three predecessors. Saving before overwriting preserves this invariant, reproducing every two-dimensional result."
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
        "time": "O(mn)",
        "space": "O(min(m,n))",
        "complexity": {
          "zh": "每对字符一次常数更新，只保存短串长度加一的数组和一个对角值；交换的是字符串引用，没有拷贝内容。",
          "en": "Each character pair gets one constant-time update. Storage is one row for the shorter string plus a diagonal scalar; swapping references does not copy string contents."
        },
        "python": "class Solution:\n    def longestCommonSubsequence(self, text1: str, text2: str) -> int:\n        if len(text1)<len(text2): text1,text2=text2,text1\n        dp=[0]*(len(text2)+1)\n        for a in text1:\n            diagonal=0\n            for j in range(1,len(text2)+1):\n                old=dp[j]\n                dp[j]=diagonal+1 if a==text2[j-1] else max(dp[j],dp[j-1])\n                diagonal=old\n        return dp[-1]\n",
        "java": "class Solution {\n    public int longestCommonSubsequence(String a,String b) {\n        if(a.length()<b.length()){String t=a;a=b;b=t;}\n        int[] dp=new int[b.length()+1];\n        for(int i=0;i<a.length();i++) {\n            int diagonal=0;\n            for(int j=1;j<=b.length();j++) {\n                int old=dp[j];dp[j]=a.charAt(i)==b.charAt(j-1)?diagonal+1:Math.max(dp[j],dp[j-1]);diagonal=old;\n            }\n        }\n        return dp[b.length()];\n    }\n}\n",
        "algorithmNotes": {
          "zh": "滚动数组更新会覆盖上一行，因此每轮还要保存左上角旧值。相等时用旧左上加一，不等时比较旧 dp[j] 与已更新 dp[j−1]；保存旧 dp[j] 后再供下一列作左上角。",
          "en": "A rolling row overwrites the previous row, so retain the old diagonal separately. On equality use that diagonal plus one; otherwise compare old dp[j] with updated dp[j−1], preserving old dp[j] as the next column's diagonal."
        }
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
    },
    "examples": [
      {
        "input": "text1 = \"abdc\", text2 = \"ac\"",
        "output": "2"
      },
      {
        "input": "text1 = \"a\", text2 = \"b\"",
        "output": "0"
      },
      {
        "input": "text1 = \"abc\", text2 = \"abc\"",
        "output": "3"
      }
    ]
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
    "methods": [
      {
        "key": "edit-table",
        "name": {
          "zh": "三种编辑的二维 DP",
          "en": "Two-dimensional DP over edit choices"
        },
        "intuition": {
          "zh": "dp[i][j] 是第一串前 i 字符变成第二串前 j 字符的代价。末字符相同就无需处理它们，继承左上。否则考虑最后一次编辑：删掉第一串末字符来自上方，插入目标末字符来自左方，替换来自左上，各加 1。空串到非空串只能逐个插入，反向只能逐个删除，边界因此是下标而非 0。\n\n任意最优编辑对齐的最后部分要么保留相等字符，要么进行插入、删除或替换之一；各自留下对应前缀子问题。最小化这些完备选择得到最优编辑数。",
          "en": "dp[i][j] is the cost to transform the first i source characters into the first j target characters. Equal ends can be retained at the diagonal cost. Otherwise the final edit deletes a source end (upper cell), inserts a target end (left cell), or replaces an end (diagonal), each adding one. Empty-prefix boundaries require one operation per character. The end of an optimal alignment either retains matching characters or uses insertion, deletion, or replacement. Each leaves the corresponding prefix subproblem, and minimizing these complete alternatives gives the optimum."
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
        "time": "O(mn+m+n)",
        "space": "O((m+1)(n+1))",
        "complexity": {
          "zh": "mn 个内部状态加 m+n 个边界；写成含边界的复杂度也涵盖空串。二维表存成本，不存编辑脚本，不切片。",
          "en": "There are mn interior states plus m+n boundary entries; including boundaries handles empty strings. The table stores costs, not an edit script, and uses no slicing."
        },
        "python": "class Solution:\n    def minDistance(self, word1: str, word2: str) -> int:\n        m,n=len(word1),len(word2);dp=[[0]*(n+1) for _ in range(m+1)]\n        for i in range(m+1): dp[i][0]=i\n        for j in range(n+1): dp[0][j]=j\n        for i in range(1,m+1):\n            for j in range(1,n+1):\n                if word1[i-1]==word2[j-1]: dp[i][j]=dp[i-1][j-1]\n                else: dp[i][j]=1+min(dp[i-1][j],dp[i][j-1],dp[i-1][j-1])\n        return dp[m][n]\n",
        "java": "class Solution {\n    public int minDistance(String a,String b) {\n        int m=a.length(),n=b.length();int[][] dp=new int[m+1][n+1];\n        for(int i=0;i<=m;i++)dp[i][0]=i;for(int j=0;j<=n;j++)dp[0][j]=j;\n        for(int i=1;i<=m;i++)for(int j=1;j<=n;j++)\n            dp[i][j]=a.charAt(i-1)==b.charAt(j-1)?dp[i-1][j-1]:1+Math.min(dp[i-1][j-1],Math.min(dp[i-1][j],dp[i][j-1]));\n        return dp[m][n];\n    }\n}\n",
        "algorithmNotes": {
          "zh": "dp[i][j] 是把前 i 个字符变为前 j 个字符的最少操作数。字符相等沿用左上，否则对删除、插入、替换三个前驱取最小再加一；空串边界分别需要 i 次删除或 j 次插入。",
          "en": "dp[i][j] counts edits from a length-i prefix to a length-j prefix. Equal characters use the diagonal unchanged; otherwise minimize deletion, insertion and replacement predecessors plus one. Empty-prefix boundaries require i deletions or j insertions."
        }
      },
      {
        "key": "rolling-edit",
        "name": {
          "zh": "滚动编辑距离",
          "en": "Rolling edit-distance row"
        },
        "intuition": {
          "zh": "编辑距离也只依赖上、左、左上。先用 0..n 初始化“空源串到目标前缀”这一行。每行开始必须把 dp[0] 从 i−1 改成 i，同时用 diagonal 保存改前的值。内部每格先保存旧上方，再按相等或三操作转移，最后推进 diagonal。编辑距离对交换两个字符串对称，可用短串作列。\n\n边界每行正确更新为删除 i 个字符的成本；旧上方、新左方及保存的左上方与二维表一致，因此压缩算法计算同一递推。",
          "en": "Edit distance depends only on upper, left, and diagonal cells. Initialize the row with 0..n for an empty source. At the start of row i, save the old dp[0] as diagonal before changing dp[0] to i. At each cell retain the old upper value, apply the match or edit recurrence, and advance the diagonal. Distance is symmetric, so use the shorter string as columns. The boundary becomes the cost of deleting i characters. Old upper, new left, and saved diagonal values match the full table, so the compressed algorithm evaluates the same recurrence."
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
        "time": "O(mn+m+n)",
        "space": "O(min(m,n)+1)",
        "complexity": {
          "zh": "时间包含空串边界更新；仅保存短串长度加一项和常数临时变量，无递归或字符串副本。",
          "en": "Time includes boundary updates for empty-string cases. Storage is one row of the shorter length plus one, with constant temporaries and no recursion or string copies."
        },
        "python": "class Solution:\n    def minDistance(self, word1: str, word2: str) -> int:\n        if len(word1)<len(word2): word1,word2=word2,word1\n        dp=list(range(len(word2)+1))\n        for i in range(1,len(word1)+1):\n            diagonal=dp[0];dp[0]=i\n            for j in range(1,len(word2)+1):\n                old=dp[j]\n                dp[j]=diagonal if word1[i-1]==word2[j-1] else 1+min(diagonal,dp[j],dp[j-1])\n                diagonal=old\n        return dp[-1]\n",
        "java": "class Solution {\n    public int minDistance(String a,String b) {\n        if(a.length()<b.length()){String t=a;a=b;b=t;}\n        int[] dp=new int[b.length()+1];for(int j=0;j<=b.length();j++)dp[j]=j;\n        for(int i=1;i<=a.length();i++) {\n            int diagonal=dp[0];dp[0]=i;\n            for(int j=1;j<=b.length();j++) {\n                int old=dp[j];dp[j]=a.charAt(i-1)==b.charAt(j-1)?diagonal:1+Math.min(diagonal,Math.min(dp[j],dp[j-1]));diagonal=old;\n            }\n        }\n        return dp[b.length()];\n    }\n}\n",
        "algorithmNotes": {
          "zh": "一维数组初始为把空串变成目标各前缀的代价，逐行处理源串。更新每格前保存旧 dp[j]，它是上方值并会成为下一格左上值；本轮 dp[0] 设为源前缀长度表示全部删除。",
          "en": "Initialize the row with insertion costs from an empty source. Save old dp[j] before overwriting it: it is the upper value and becomes the next diagonal. Set dp[0] each row to the source-prefix length, the cost of deleting all its characters."
        }
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
    },
    "examples": [
      {
        "input": "word1 = \"cat\", word2 = \"cuts\"",
        "output": "2"
      },
      {
        "input": "word1 = \"\", word2 = \"\"",
        "output": "0"
      },
      {
        "input": "word1 = \"abc\", word2 = \"\"",
        "output": "3"
      }
    ]
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
    "methods": [
      {
        "key": "set-baseline",
        "name": {
          "zh": "集合配对抵消（空间不满足题目要求）",
          "en": "Set cancellation (does not meet space requirement)"
        },
        "intuition": {
          "zh": "先用一个直观模型：第一次看到数就放入集合，第二次看到就移除。每个成对出现的值最终都被删除，只剩那个单次值。这个方法让“配对抵消”的含义可见，但集合最坏保存很多值，因此不能作为常数额外空间要求的最终答案。\n\n集合包含且仅包含已扫描部分出现奇数次的值。题设其余数出现两次，所以扫描完成只有单次值满足不变式。",
          "en": "Use an explicit cancellation model: insert a value on its first occurrence and remove it on its second. Every paired value disappears, leaving only the singleton. This makes cancellation tangible but may retain many values simultaneously, so it is a baseline rather than a solution meeting the constant-space requirement. The set contains exactly the values seen an odd number of times. Under the input promise, all paired values have even count at the end, leaving only the singleton."
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
        "time": "O(n) expected",
        "space": "O(n)",
        "complexity": {
          "zh": "哈希增删查期望 O(1)，扫描 n 项；例如所有不同值的第一次出现集中在前半段时，集合达到 O(n)。不满足题目常数空间约束。",
          "en": "Hash operations are expected O(1), giving a linear scan. The set can grow to O(n), for example when first occurrences precede all matching copies. This violates the required constant-space bound."
        },
        "python": "from typing import List\nclass Solution:\n    def singleNumber(self, nums: List[int]) -> int:\n        unmatched=set()\n        for x in nums:\n            if x in unmatched: unmatched.remove(x)\n            else: unmatched.add(x)\n        return next(iter(unmatched))\n",
        "java": "import java.util.*;\nclass Solution {\n    public int singleNumber(int[] nums) {\n        Set<Integer> unmatched=new HashSet<>();\n        for(int x:nums)if(!unmatched.add(x))unmatched.remove(x);\n        return unmatched.iterator().next();\n    }\n}\n",
        "algorithmNotes": {
          "zh": "集合中某值第一次出现就加入，第二次出现就移除，成对值会被抵消。题目保证只有一个值出现一次、其余恰好两次，因此最后集合只剩一个元素；该方法额外占用集合空间。",
          "en": "Toggle each value's membership: insert on its first occurrence and remove on its second. The guarantee of one singleton and all other values occurring twice leaves exactly one element, at the cost of extra set storage."
        }
      },
      {
        "key": "xor",
        "name": {
          "zh": "异或在常数空间内抵消",
          "en": "XOR cancellation in constant space"
        },
        "intuition": {
          "zh": "异或能在每个二进制位上实现无需集合的配对抵消：x XOR x=0，0 XOR x=x，且结合顺序和排列顺序不影响结果。所以把所有元素异或，相同的两份自动消掉，最后只留下单次值。不要把它误用到“其他数出现三次”等不同条件，成对出现是关键。\n\n利用交换律结合律可将相同值分组，每一对异或为 0，所有零与唯一值异或仍为唯一值。",
          "en": "XOR implements pair cancellation independently at each bit: x XOR x=0 and 0 XOR x=x, with order-independent grouping. XORing every element cancels each duplicate pair and leaves the singleton. The pair-count promise is essential; this exact algorithm does not solve variants where other values occur three times. Commutativity and associativity allow equal values to be grouped. Each pair reduces to zero, and XORing the singleton with all these zeros leaves it unchanged."
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
        "time": "O(n)",
        "space": "O(1)",
        "complexity": {
          "zh": "每个数一次异或，只有一个累积变量；题目固定整数范围内每次位运算按常数代价计。",
          "en": "One XOR is performed per value with one accumulator. Bit operations are constant-cost within the problem’s fixed integer range."
        },
        "python": "from typing import List\nclass Solution:\n    def singleNumber(self, nums: List[int]) -> int:\n        ans=0\n        for x in nums: ans ^= x\n        return ans\n",
        "java": "class Solution {\n    public int singleNumber(int[] nums) {\n        int ans=0;for(int x:nums)ans^=x;return ans;\n    }\n}\n",
        "algorithmNotes": {
          "zh": "从 0 开始把所有整数依次异或，同一个数异或两次等于 0，0 与任何数异或仍是该数。异或可交换和结合，所以成对元素不必相邻，负数也按同样的位运算规则抵消。",
          "en": "XOR all values starting from zero. Equal pairs cancel and zero leaves a value unchanged; commutativity and associativity allow pairs anywhere in the array, with negative values canceling under the same bitwise rules."
        }
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
    },
    "examples": [
      {
        "input": "nums = [-3,8,-3,5,5]",
        "output": "8"
      },
      {
        "input": "nums = [0]",
        "output": "0"
      },
      {
        "input": "nums = [-1,0,0]",
        "output": "-1"
      }
    ]
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
    "methods": [
      {
        "key": "frequency",
        "name": {
          "zh": "频次哈希表",
          "en": "Frequency map"
        },
        "intuition": {
          "zh": "直接累积每个值出现次数。由于阈值是全数组长度的一半，扫描中一旦某值超过该阈值就可以返回，后续元素不会减少已看到的次数。这个方法容易核验，也适用于需要完整频率表的场景，但为每个不同值付出额外存储。\n\n返回的值已经在完整数组中至少出现该次数，所以必为严格多数；题设保证多数存在，扫描到它足够多次时一定返回。",
          "en": "Count occurrences explicitly. Once a value exceeds half of the full array length during the scan, it can be returned immediately because later input cannot reduce its count. The method is transparent and useful when a frequency table is needed, at the cost of storing distinct values. A returned value already occurs more than half as often as the full length, making it a strict majority. The existence promise ensures some count eventually crosses the threshold."
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
        "time": "O(n) expected",
        "space": "O(n)",
        "complexity": {
          "zh": "至多 n 次哈希查改，期望线性；最坏保存 O(n) 个不同值，提前返回只改善部分输入。",
          "en": "At most n expected-constant-time map updates are made. The map may store O(n) distinct values; early return only improves some inputs."
        },
        "python": "from typing import List\nclass Solution:\n    def majorityElement(self, nums: List[int]) -> int:\n        counts={}\n        for x in nums:\n            counts[x]=counts.get(x,0)+1\n            if counts[x]>len(nums)//2: return x\n        raise ValueError('Majority promise violated')\n",
        "java": "import java.util.*;\nclass Solution {\n    public int majorityElement(int[] nums) {\n        Map<Integer,Integer> counts=new HashMap<>();\n        for(int x:nums){int count=counts.getOrDefault(x,0)+1;counts.put(x,count);if(count>nums.length/2)return x;}\n        throw new IllegalArgumentException(\"Majority promise violated\");\n    }\n}\n",
        "algorithmNotes": {
          "zh": "用映射记录每个值的出现次数，次数超过 n//2 就可返回。判断的是严格超过一半而不是达到一半；题目保证多数元素存在，因此无需为不存在的情况设计额外输出。",
          "en": "Count occurrences in a map and return when a count exceeds n//2. The threshold is strictly more than half, not exactly half; the problem guarantees such a value exists."
        }
      },
      {
        "key": "vote",
        "name": {
          "zh": "Boyer–Moore 抵消投票",
          "en": "Boyer–Moore cancellation vote"
        },
        "intuition": {
          "zh": "把两个不同值配对删除不会消灭严格多数：即使每次都删掉一个多数值和一个非多数值，多数的净优势仍存在。用 candidate 和 balance 模拟这种删除。balance 为 0 时选新候选，同值增加，不同值抵消。balance 不是候选的真实总出现次数；若没有多数存在的保证，还必须再扫一遍核验。\n\n扫描过程等价于删除若干对不同值，剩余未抵消项全部相同。严格多数在任意这种删除后仍占优势，所以最终未抵消的候选必为多数。",
          "en": "Removing a pair of different values cannot eliminate a strict majority: even if each pair contains one majority and one nonmajority value, its numerical advantage remains. Simulate cancellation with candidate and balance. Choose a new candidate at zero balance, increment for agreement, and decrement for disagreement. Balance is not the candidate’s total frequency; without the existence promise a verification pass would be necessary. The scan removes pairs of unequal values and retains identical unmatched values. A strict majority survives such cancellation with an advantage, so the remaining candidate must be that majority."
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
        "time": "O(n)",
        "space": "O(1)",
        "complexity": {
          "zh": "一次扫描，候选值和余额两个标量；不修改数组，无哈希表或排序空间。",
          "en": "One scan stores a candidate and a balance. No input mutation, hash map, or sorting storage is used."
        },
        "python": "from typing import List\nclass Solution:\n    def majorityElement(self, nums: List[int]) -> int:\n        candidate=0;balance=0\n        for x in nums:\n            if balance==0: candidate=x\n            balance += 1 if x==candidate else -1\n        return candidate\n",
        "java": "class Solution {\n    public int majorityElement(int[] nums) {\n        int candidate=0,balance=0;\n        for(int x:nums){if(balance==0)candidate=x;balance+=x==candidate?1:-1;}\n        return candidate;\n    }\n}\n",
        "algorithmNotes": {
          "zh": "计数为 0 时把当前值设为新候选，遇到相同值加一、不同值减一，相当于抵消不同元素。这里计数不是候选的实际总频次；依赖多数元素必然存在的保证，最终候选可直接返回。",
          "en": "Choose a new candidate when the balance is zero, adding for a match and subtracting otherwise to cancel unlike values. The balance is not its actual frequency; the majority-exists guarantee makes the final candidate sufficient without verification."
        }
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
    },
    "examples": [
      {
        "input": "nums = [4,1,4,2,4]",
        "output": "4"
      },
      {
        "input": "nums = [-1]",
        "output": "-1"
      },
      {
        "input": "nums = [2,2,1]",
        "output": "2"
      }
    ]
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
    "methods": [
      {
        "key": "count-rewrite",
        "name": {
          "zh": "计数后原地重写",
          "en": "Count then overwrite in place"
        },
        "intuition": {
          "zh": "值域只有三个数，不需要通用比较排序。第一遍记录每种颜色的数量，第二遍按 0、1、2 的顺序将对应数量写回原数组。元素没有附带身份信息，重写值不影响题目要求。这是两遍线性解法，满足原地常数空间，但不满足进阶的一遍扫描。\n\n每种值写入的数量与原数组相等，保留了多重集合；颜色按递增顺序分块写入，所以最终有序。",
          "en": "There are only three possible values, so general comparison sorting is unnecessary. Count each color, then write the required number of zeros, ones, and twos into the same array. No extra object identity must be preserved. This is a two-pass, constant-space in-place method, but not the one-pass follow-up. The number of writes for each value equals its original count, preserving the multiset. Writing color blocks in increasing order makes the final array sorted."
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
        "time": "O(n)",
        "space": "O(1)",
        "complexity": {
          "zh": "计数一遍、写回一遍共 2n 次量级操作；3 个计数器不随 n 增长。输出复用输入空间。",
          "en": "One counting pass and one overwrite pass perform O(n) work. Three counters do not grow with n, and output reuses input storage."
        },
        "python": "from typing import List\nclass Solution:\n    def sortColors(self, nums: List[int]) -> None:\n        counts=[0,0,0]\n        for x in nums: counts[x]+=1\n        write=0\n        for color in range(3):\n            for _ in range(counts[color]): nums[write]=color;write+=1\n",
        "java": "class Solution {\n    public void sortColors(int[] nums) {\n        int[] counts=new int[3];for(int x:nums)counts[x]++;\n        int write=0;for(int color=0;color<3;color++)for(int k=0;k<counts[color];k++)nums[write++]=color;\n    }\n}\n",
        "algorithmNotes": {
          "zh": "分别统计 0、1、2 的数量，再按这三个数量顺序覆盖原数组。写回长度之和必须等于原长度，该方法是两趟扫描且只用三个计数器，不需要通用排序或新结果数组。",
          "en": "Count zeros, ones and twos, then overwrite the original array in that order using exactly those counts. Their sum preserves its length; two passes and three counters suffice without a general sort or separate result array."
        }
      },
      {
        "key": "dutch-flag",
        "name": {
          "zh": "荷兰国旗三指针",
          "en": "Dutch national flag partition"
        },
        "intuition": {
          "zh": "维护四段：[0,low) 已是 0，[low,mid) 已是 1，[mid,high] 未知，(high,n) 已是 2。只处理未知段的左端：0 送到 low，1 留中间，2 送到 high。交换 2 后换回的是未知值，所以 mid 不能前进；交换 0 换回的是已知 1（或自身），可以同时推进。\n\n每种操作都保持四段不变式且未知段缩短一个。结束时未知段为空，三个已知段依次为 0、1、2，且交换保持原有元素数量。",
          "en": "Maintain four regions: zeros before low, ones from low to mid, unknown values from mid through high, and twos after high. Inspect only the first unknown value. Move zero left, retain one in the middle, and move two right. After swapping a two, the incoming value is unknown, so mid must stay; after swapping a zero, the incoming value is a known one or itself. Each operation preserves the four-region invariant and shrinks the unknown region by one. At termination only ordered zero, one, and two regions remain, while swaps preserve the multiset."
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
        "time": "O(n)",
        "space": "O(1)",
        "complexity": {
          "zh": "未知区每次减少一个元素，因此恰好线性数量的处理；三个下标及一个交换临时变量为常数空间。",
          "en": "Every iteration removes one unknown position, giving linear work. Three pointers and a swap temporary use constant space."
        },
        "python": "from typing import List\nclass Solution:\n    def sortColors(self, nums: List[int]) -> None:\n        low=mid=0;high=len(nums)-1\n        while mid<=high:\n            if nums[mid]==0:\n                nums[low],nums[mid]=nums[mid],nums[low];low+=1;mid+=1\n            elif nums[mid]==1: mid+=1\n            else:\n                nums[mid],nums[high]=nums[high],nums[mid];high-=1\n",
        "java": "class Solution {\n    public void sortColors(int[] nums) {\n        int low=0,mid=0,high=nums.length-1;\n        while(mid<=high) {\n            if(nums[mid]==0){int t=nums[low];nums[low]=nums[mid];nums[mid]=t;low++;mid++;}\n            else if(nums[mid]==1)mid++;\n            else {int t=nums[mid];nums[mid]=nums[high];nums[high]=t;high--;}\n        }\n    }\n}\n",
        "algorithmNotes": {
          "zh": "维护已确定的 0 前缀、1 中段和 2 后缀，中间剩余部分待检查。遇到 0 与左边界交换并推进两个指针，遇到 2 与右边界交换但不推进检查指针，因为换来的值还未检查。",
          "en": "Maintain a zero prefix, a one region and a two suffix around the unclassified region. On zero, swap left and advance both pointers; on two, swap right but keep the scan pointer because the incoming value still needs classification."
        }
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
    },
    "examples": [
      {
        "input": "nums = [2,1,0,2,0]",
        "output": "[0,0,1,2,2]",
        "note": {
          "zh": "输出展示原地修改后的结构。",
          "en": "The output shows the structure after in-place modification."
        }
      },
      {
        "input": "nums = [0]",
        "output": "[0]",
        "note": {
          "zh": "输出展示原地修改后的结构。",
          "en": "The output shows the structure after in-place modification."
        }
      },
      {
        "input": "nums = [2,2,2]",
        "output": "[2,2,2]",
        "note": {
          "zh": "输出展示原地修改后的结构。",
          "en": "The output shows the structure after in-place modification."
        }
      }
    ]
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
    "methods": [
      {
        "key": "pivot-selection",
        "name": {
          "zh": "最小提升后选择排序后缀",
          "en": "Minimal pivot increase plus suffix selection sort"
        },
        "intuition": {
          "zh": "为了只增大一点，尽量保留最长前缀。右端非递增后缀已是自身的最大排列，无法只改后缀得到更大值，所以必须改变它前面的转折位。选择后缀中比转折值大的最小值交换，再把剩余后缀排升序。这里手写选择排序，作为容易验证且满足常数空间的基线。\n\n最右可提升位置保证最长前缀不变，最小更大值保证该位增幅最小，升序后缀保证余下部分最小。无转折说明已最大，升序全数组正确回绕。",
          "en": "To increase the sequence as little as possible, retain the longest prefix. A nonincreasing suffix is already its greatest arrangement, so a larger permutation must change the pivot immediately before it. Swap the pivot with the smallest greater suffix value, then sort the suffix ascending. Manual selection sort provides a transparent constant-space baseline. The rightmost increasable position preserves the longest prefix; the smallest greater replacement minimizes that position’s increase; an ascending suffix minimizes the remainder. No pivot means the current permutation is maximal and full sorting correctly wraps around."
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
        "time": "O(n²)",
        "space": "O(1)",
        "complexity": {
          "zh": "找转折与候选 O(n)，选择排序后缀最坏 O(n²)，只使用下标及交换变量。没有库排序栈或切片。",
          "en": "Pivot and successor searches are O(n); selection-sorting the suffix is O(n²) worst-case. Only indices and a swap temporary are used, without library sorting or slices."
        },
        "python": "from typing import List\nclass Solution:\n    def nextPermutation(self, nums: List[int]) -> None:\n        n=len(nums);i=n-2\n        while i>=0 and nums[i]>=nums[i+1]: i-=1\n        if i>=0:\n            j=i+1\n            for k in range(i+1,n):\n                if nums[i]<nums[k]<nums[j]: j=k\n            nums[i],nums[j]=nums[j],nums[i]\n        for left in range(i+1,n):\n            smallest=left\n            for k in range(left+1,n):\n                if nums[k]<nums[smallest]: smallest=k\n            nums[left],nums[smallest]=nums[smallest],nums[left]\n",
        "java": "class Solution {\n    public void nextPermutation(int[] nums) {\n        int n=nums.length,i=n-2;while(i>=0&&nums[i]>=nums[i+1])i--;\n        if(i>=0){int j=i+1;for(int k=i+1;k<n;k++)if(nums[k]>nums[i]&&nums[k]<nums[j])j=k;swap(nums,i,j);}\n        for(int left=i+1;left<n;left++){int smallest=left;for(int k=left+1;k<n;k++)if(nums[k]<nums[smallest])smallest=k;swap(nums,left,smallest);}\n    }\n    private void swap(int[] a,int i,int j){int t=a[i];a[i]=a[j];a[j]=t;}\n}\n",
        "algorithmNotes": {
          "zh": "从右往左找首个 nums[i]<nums[i+1] 的位置，后缀此时已不增。在线性扫描后缀时选出严格大于 nums[i] 的最小值交换，再把后缀升序整理；没有这样的 i 则对整个数组执行升序整理。",
          "en": "Find the rightmost ascent nums[i]<nums[i+1], leaving a nonincreasing suffix. Scan that suffix for the smallest value strictly greater than the pivot, swap, and arrange the suffix in ascending order; with no pivot, arrange the entire array in ascending order."
        }
      },
      {
        "key": "pivot-reverse",
        "name": {
          "zh": "利用降序后缀直接反转",
          "en": "Reverse the nonincreasing suffix"
        },
        "intuition": {
          "zh": "基线的排序可以进一步去掉：原后缀已经非递增，从右遇到的第一个大于转折值的数就是最小更大值。选择这个最右候选交换后，后缀仍非递增，于是一次双指针反转就得到升序。重复值时必须用严格大于，才能真正得到下一个不同排列。\n\n最小提升原则与基线相同。选择最右更大值维持后缀非递增，因此反转等价于排序，又不改变已确定的最小前缀增量。",
          "en": "The suffix need not be sorted from scratch. Because it is nonincreasing, its rightmost value greater than the pivot is the smallest valid increase. Swapping with that rightmost candidate keeps the suffix nonincreasing, so a two-pointer reversal makes it ascending. Strict inequality is necessary with duplicates to produce an actual successor. The minimal-increase argument is unchanged. Choosing the rightmost greater value preserves a nonincreasing suffix; reversing it is therefore equivalent to sorting it, while preserving the minimal prefix increase."
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
        "time": "O(n)",
        "space": "O(1)",
        "complexity": {
          "zh": "寻找转折、寻找后继、反转各至多扫描 n 项，总 O(n)。原地交换，无 Python 切片或返回新数组。",
          "en": "Pivot search, successor search, and reversal each scan at most n positions. Swaps are in place, with no Python slices or new result array."
        },
        "python": "from typing import List\nclass Solution:\n    def nextPermutation(self, nums: List[int]) -> None:\n        i=len(nums)-2\n        while i>=0 and nums[i]>=nums[i+1]: i-=1\n        if i>=0:\n            j=len(nums)-1\n            while nums[j]<=nums[i]: j-=1\n            nums[i],nums[j]=nums[j],nums[i]\n        left,right=i+1,len(nums)-1\n        while left<right:\n            nums[left],nums[right]=nums[right],nums[left];left+=1;right-=1\n",
        "java": "class Solution {\n    public void nextPermutation(int[] nums) {\n        int i=nums.length-2;while(i>=0&&nums[i]>=nums[i+1])i--;\n        if(i>=0){int j=nums.length-1;while(nums[j]<=nums[i])j--;swap(nums,i,j);}\n        int left=i+1,right=nums.length-1;while(left<right)swap(nums,left++,right--);\n    }\n    private void swap(int[] a,int i,int j){int t=a[i];a[i]=a[j];a[j]=t;}\n}\n",
        "algorithmNotes": {
          "zh": "不增后缀中从右向左遇到的第一个大于枢轴的数，就是能让排列增幅最小的替换值。交换后后缀仍不增，直接反转即可得到最小后缀，不必重新排序；重复值必须用严格大于判断。",
          "en": "In the nonincreasing suffix, the first value greater than the pivot found from the right is the smallest valid replacement. After swapping, reverse the still-nonincreasing suffix instead of sorting it, using strict comparison even with duplicates."
        }
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
    },
    "examples": [
      {
        "input": "nums = [1,4,3,2]",
        "output": "[2,1,3,4]",
        "note": {
          "zh": "输出展示原地修改后的结构。",
          "en": "The output shows the structure after in-place modification."
        }
      },
      {
        "input": "nums = [3,2,1]",
        "output": "[1,2,3]",
        "note": {
          "zh": "输出展示原地修改后的结构。",
          "en": "The output shows the structure after in-place modification."
        }
      },
      {
        "input": "nums = [1,1,5]",
        "output": "[1,5,1]",
        "note": {
          "zh": "输出展示原地修改后的结构。",
          "en": "The output shows the structure after in-place modification."
        }
      }
    ]
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
    "methods": [
      {
        "key": "value-binary",
        "name": {
          "zh": "按计数二分值域",
          "en": "Binary search the value range by counts"
        },
        "intuition": {
          "zh": "不是对未排序的数组二分，而是对可能的答案值 1..n 二分。记 count(mid) 为不大于 mid 的元素数。若重复值大于 mid，则低半每个值至多一次，count≤mid；若重复值不大于 mid，则缺失值的数量不足以抵消额外副本，count>mid。因此谓词在重复值处从假变真，可以找第一个真值。\n\n若重复值出现 k 次，则在 1..n 中总共缺失 k−2 个值。mid 达到重复值时，count−mid 至少为 (k−1)−(k−2)=1；未达到时不可能超额。故二分判定准确，即使重复多次也成立。",
          "en": "Binary search applies to possible answer values 1..n, not positions in the unsorted array. Let count(mid) count entries at most mid. Below the duplicate, each such value appears at most once, so count≤mid. At or above it, missing values cannot cancel all extra copies, so count>mid. This predicate changes from false to true at the duplicate. If the duplicate occurs k times, exactly k−2 values from 1..n are missing. Once mid includes it, count−mid is at least (k−1)−(k−2)=1; before it, there is no excess. Thus the predicate is correct even for more than two copies."
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
        "time": "O(n log n)",
        "space": "O(1)",
        "complexity": {
          "zh": "每轮 O(n) 扫描，值域最多 O(log n) 轮；仅保存边界、中点和计数，不创建频次数组。",
          "en": "Each iteration scans O(n) entries and there are O(log n) value-range iterations. Only boundaries, a midpoint, and a count are stored."
        },
        "python": "from typing import List\nclass Solution:\n    def findDuplicate(self, nums: List[int]) -> int:\n        lo,hi=1,len(nums)-1\n        while lo<hi:\n            mid=(lo+hi)//2;count=0\n            for x in nums:\n                if x<=mid: count+=1\n            if count>mid: hi=mid\n            else: lo=mid+1\n        return lo\n",
        "java": "class Solution {\n    public int findDuplicate(int[] nums) {\n        int lo=1,hi=nums.length-1;\n        while(lo<hi){int mid=lo+(hi-lo)/2,count=0;for(int x:nums)if(x<=mid)count++;if(count>mid)hi=mid;else lo=mid+1;}\n        return lo;\n    }\n}\n",
        "algorithmNotes": {
          "zh": "在值域 1 到 n 上二分，而不是在数组下标上二分。统计 ≤mid 的元素个数，若超过 mid 个，重复数在左半值域，否则在右半；每轮都重新扫描数组，但不修改数组。",
          "en": "Binary-search values 1 through n rather than indices. Count entries ≤mid; a count exceeding mid places the duplicate in the lower value range, otherwise choose the upper range. Each round rescans the unchanged array."
        }
      },
      {
        "key": "floyd",
        "name": {
          "zh": "函数图与 Floyd 环入口",
          "en": "Functional graph and Floyd cycle entry"
        },
        "intuition": {
          "zh": "把下标 i 指向 nums[i]，就得到每个节点有一条出边的图。从 0 出发永远不能回到 0，因为值域没有 0；有限节点下最终进入环。环入口同时被环前节点和环内前驱指向，代表两个下标保存相同数，因此就是唯一重复值。先用快慢指针找环内相遇点，再从 0 和相遇点同步步进找入口。\n\n设入口距离 μ、环长 λ，首次相遇时慢指针走了 t 步且 t 是 λ 的倍数。再从 0 和相遇点各走 μ 步，会同时到入口。入口有两个不同前驱，其值唯一重复，故答案正确。",
          "en": "Make each index i point to nums[i], producing a graph with one outgoing edge per node. Starting at zero cannot return to zero because zero is absent from the value range, so the path eventually enters a cycle. Its entry has incoming edges from both the preceding tail and a cycle predecessor, revealing a duplicated value. Find a meeting point with fast/slow pointers, then walk from zero and that point at equal speed to locate the entry. Let the tail length be μ and cycle length λ. At the meeting the slow pointer has traveled t steps with t divisible by λ. Advancing from zero and the meeting point by μ steps reaches the entry simultaneously. Its two distinct predecessors identify the uniquely repeated value."
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
        "time": "O(n)",
        "space": "O(1)",
        "complexity": {
          "zh": "尾长加环长不超过 n+1，首次相遇和寻找入口均线性；只使用三个下标，不修改输入，不建立图对象。",
          "en": "Tail plus cycle length is at most n+1, so both phases are linear. Three indices suffice; the input is unchanged and no explicit graph is built."
        },
        "python": "from typing import List\nclass Solution:\n    def findDuplicate(self, nums: List[int]) -> int:\n        slow=fast=0\n        while True:\n            slow=nums[slow];fast=nums[nums[fast]]\n            if slow==fast: break\n        finder=0\n        while finder!=slow:\n            finder=nums[finder];slow=nums[slow]\n        return finder\n",
        "java": "class Solution {\n    public int findDuplicate(int[] nums) {\n        int slow=0,fast=0;\n        do{slow=nums[slow];fast=nums[nums[fast]];}while(slow!=fast);\n        int finder=0;while(finder!=slow){finder=nums[finder];slow=nums[slow];}\n        return finder;\n    }\n}\n",
        "algorithmNotes": {
          "zh": "把下标 i 指向 nums[i] 看成函数图，值均在 1 到 n 内保证沿指针跳转不会越界。先快慢指针找相遇点，再让一个指针回到起点、同速前进找入口；入口的值对应重复数。",
          "en": "Treat i→nums[i] as a functional graph with valid destinations guaranteed by the value range. Use fast and slow pointers to meet, then reset one to the start and move both at equal speed to find the entry, which identifies the duplicate."
        }
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
    },
    "examples": [
      {
        "input": "nums = [2,5,1,4,3,5]",
        "output": "5"
      },
      {
        "input": "nums = [1,1]",
        "output": "1"
      },
      {
        "input": "nums = [3,3,3,3,3]",
        "output": "3"
      }
    ]
  }
];
