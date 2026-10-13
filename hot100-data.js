/* Original teaching notes. Catalogue: LeetCode Top 100 Liked. */
window.HOT100_DATA = [
  {
    "id": 1,
    "title": "两数之和",
    "slug": "two-sum",
    "level": "简单",
    "category": "哈希",
    "summary": "在数组中选两个不同位置，使数值之和为指定目标，返回位置。",
    "example": "nums=[4,1,9,6], target=10 → [1,2]",
    "pitfall": "先查询补数，再记录当前值，才能避免同一位置被使用两次。",
    "methods": [
      {
        "name": "枚举配对",
        "time": "O(n²)",
        "space": "O(1)",
        "steps": [
          "遍历 i=0..n-1",
          "遍历 j=i+1..n-1",
          "若 nums[i]+nums[j]=target，返回 [i,j]"
        ],
        "reason": "约 n(n-1)/2 个配对，每次判断为常数时间。"
      },
      {
        "name": "哈希表记住过去",
        "time": "期望 O(n)",
        "space": "O(n)",
        "steps": [
          "seen={}",
          "依次读取 x=nums[i]，查询 target-x",
          "若存在，返回 [seen[target-x],i]",
          "否则记录 seen[x]=i"
        ],
        "reason": "遍历一次，哈希查询平均常数时间，最多保存 n 项。"
      }
    ],
    "frames": [
      {
        "note": "目标为 10，橙色位置表示当前读取项。",
        "cells": [
          "4",
          "1",
          "9",
          "6"
        ]
      },
      {
        "note": "读 4，补数 6 不在表中。保存 4→0。",
        "cells": [
          "[4]",
          "seen={4:0}"
        ]
      },
      {
        "note": "读 1，补数 9 不在表中。保存 1→1。",
        "cells": [
          "4",
          "[1]",
          "seen={4:0,1:1}"
        ]
      },
      {
        "note": "读 9，补数 1 已存在，位置 1 与 2 配对。",
        "cells": [
          "1@下标1",
          "+",
          "9@下标2",
          "=10"
        ]
      }
    ],
    "kind": "array",
    "traceMethod": "哈希表记住过去",
    "tiers": [
      "初级",
      "进阶"
    ],
    "url": "https://leetcode.cn/problems/two-sum/"
  },
  {
    "id": 49,
    "title": "字母异位词分组",
    "slug": "group-anagrams",
    "level": "中等",
    "category": "哈希",
    "summary": "把字母组成完全相同、顺序可以不同的字符串归入同一组。",
    "example": "[\"eat\",\"tea\",\"bat\",\"ate\"] → [[\"eat\",\"tea\",\"ate\"],[\"bat\"]]",
    "pitfall": "键必须无歧义。字符计数要加分隔符，不能直接拼接十进制数字。",
    "methods": [
      {
        "name": "排序作为签名",
        "time": "O(n·k log k)",
        "space": "O(nk)",
        "steps": [
          "对每个单词的字符排序得到 key",
          "groups[key] 追加原单词",
          "返回所有分组"
        ],
        "reason": "n 个单词，最大长度 k；排序每个单词花 O(k log k)，存储分组及键。"
      },
      {
        "name": "字符频次作为签名",
        "time": "O(nk)",
        "space": "O(nk)",
        "steps": [
          "为每个单词建立 26 个小写字母计数",
          "计数元组作为 key",
          "相同 key 放在同一列表"
        ],
        "reason": "小写字母表固定，计数 O(k)；结果本身需要 O(nk) 存储。"
      }
    ],
    "frames": [
      {
        "note": "用字符计数代替单词顺序。",
        "cells": [
          "eat",
          "tea",
          "bat",
          "ate"
        ]
      },
      {
        "note": "eat 的关键计数为 a:1,e:1,t:1。",
        "cells": [
          "a=1",
          "e=1",
          "t=1"
        ]
      },
      {
        "note": "tea 与 ate 的计数相同，合入同一组。",
        "cells": [
          "eat → A",
          "tea → A",
          "ate → A"
        ]
      },
      {
        "note": "bat 具有 b 而没有 e，单独成为 B 组。",
        "cells": [
          "A: eat,tea,ate",
          "B: bat"
        ]
      }
    ],
    "kind": "buckets",
    "traceMethod": "字符频次作为签名",
    "tiers": [
      "初级",
      "进阶"
    ],
    "url": "https://leetcode.cn/problems/group-anagrams/"
  },
  {
    "id": 128,
    "title": "最长连续序列",
    "slug": "longest-consecutive-sequence",
    "level": "中等",
    "category": "哈希",
    "summary": "在未排序数组中找最长的连续整数集合，返回其长度；数组中的位置不必连续。",
    "example": "[8,2,1,4,3,9] → 4，对应 1,2,3,4",
    "pitfall": "去重后只从没有前驱 x-1 的数字开始扩展；否则会反复扫描同一序列。",
    "methods": [
      {
        "name": "排序后扫描",
        "time": "O(n log n)",
        "space": "O(n)",
        "steps": [
          "复制并排序数组",
          "忽略重复值",
          "相邻差 1 时长度加一，否则重置为 1",
          "维护最长长度"
        ],
        "reason": "排序占主要时间；复制数组 O(n)，不依赖语言排序是否原地。"
      },
      {
        "name": "集合中的起点扩展",
        "time": "期望 O(n)",
        "space": "O(n)",
        "steps": [
          "S=set(nums)",
          "对 S 中每个 x，仅在 x-1 不存在时向右走",
          "连续检查 x,x+1,...",
          "更新最长长度"
        ],
        "reason": "每个数只在其所属连续段中扩展一次；集合操作为期望常数时间。"
      }
    ],
    "frames": [
      {
        "note": "先将输入变成集合。",
        "cells": [
          "{1,2,3,4,8,9}"
        ]
      },
      {
        "note": "1 没有前驱 0，因此是起点。",
        "cells": [
          "[1]",
          "2",
          "3",
          "4"
        ]
      },
      {
        "note": "连续找到 2、3、4，长度为 4。",
        "cells": [
          "1 → 2 → 3 → 4",
          "长度4"
        ]
      },
      {
        "note": "8 是另一起点，段长度 2；答案仍为 4。",
        "cells": [
          "8 → 9",
          "max(4,2)=4"
        ]
      }
    ],
    "kind": "array",
    "traceMethod": "集合中的起点扩展",
    "tiers": [
      "初级",
      "进阶"
    ],
    "url": "https://leetcode.cn/problems/longest-consecutive-sequence/"
  },
  {
    "id": 283,
    "title": "移动零",
    "slug": "move-zeroes",
    "level": "简单",
    "category": "双指针",
    "summary": "原地把所有 0 移到数组末尾，非零元素保持原有相对顺序。",
    "example": "[0,4,0,2,7] → [4,2,7,0,0]",
    "pitfall": "不能用排序；排序会打乱非零元素顺序。",
    "methods": [
      {
        "name": "借助临时数组",
        "time": "O(n)",
        "space": "O(n)",
        "steps": [
          "收集全部非零值到 temp",
          "补足相应数量的 0",
          "写回 nums"
        ],
        "reason": "读写各一遍，但额外保存 n 项。"
      },
      {
        "name": "读写双指针",
        "time": "O(n)",
        "space": "O(1)",
        "steps": [
          "write=0",
          "read 向右扫描，非零则写入 nums[write++]",
          "扫描结束后将 write 之后的位置填 0"
        ],
        "reason": "write 左侧始终是已经收集的非零序列，最多写入 n 项。"
      }
    ],
    "frames": [
      {
        "note": "读指针向右，写指针从 0 开始。",
        "cells": [
          "0",
          "4",
          "0",
          "2",
          "7"
        ]
      },
      {
        "note": "4 写入位置 0。write=1。",
        "cells": [
          "[4]",
          "4",
          "0",
          "2",
          "7"
        ]
      },
      {
        "note": "依次写入 2 和 7。write=3。",
        "cells": [
          "4",
          "2",
          "[7]",
          "2",
          "7"
        ]
      },
      {
        "note": "剩余位置补 0，保持非零值顺序。",
        "cells": [
          "4",
          "2",
          "7",
          "0",
          "0"
        ]
      }
    ],
    "kind": "array",
    "traceMethod": "读写双指针",
    "tiers": [
      "初级",
      "进阶"
    ],
    "url": "https://leetcode.cn/problems/move-zeroes/"
  },
  {
    "id": 11,
    "title": "盛最多水的容器",
    "slug": "container-with-most-water",
    "level": "中等",
    "category": "双指针",
    "summary": "选择两根竖线作为两侧，用较短高度乘两线距离计算容量，求最大值。",
    "example": "[2,5,3,4] → 8，选择下标 1 与 3",
    "pitfall": "移动较高的一侧不能提高当前短板，还会缩小宽度，因此应移动较矮侧。",
    "methods": [
      {
        "name": "枚举边界",
        "time": "O(n²)",
        "space": "O(1)",
        "steps": [
          "枚举每一对 l<r",
          "area=min(h[l],h[r])·(r-l)",
          "取最大 area"
        ],
        "reason": "共有二次方数量的边界组合。"
      },
      {
        "name": "两端向内收缩",
        "time": "O(n)",
        "space": "O(1)",
        "steps": [
          "l=0,r=n-1",
          "更新 area",
          "若 h[l]<h[r] 则 l++，否则 r--",
          "直到 l=r"
        ],
        "reason": "每一步排除一个不可能带来更优解的边界，共 n-1 步。"
      }
    ],
    "frames": [
      {
        "note": "两端 2 和 4，宽 3，容量 6。",
        "cells": [
          "L:2",
          "5",
          "3",
          "R:4",
          "面积6"
        ]
      },
      {
        "note": "左侧更矮，移动左指针到 5。",
        "cells": [
          "2",
          "L:5",
          "3",
          "R:4"
        ]
      },
      {
        "note": "高度 min(5,4)=4，宽 2，容量 8。",
        "cells": [
          "高度4",
          "宽2",
          "最佳8"
        ]
      },
      {
        "note": "移动右侧，剩余容量不超过 8。",
        "cells": [
          "L:5",
          "R:3",
          "答案8"
        ]
      }
    ],
    "kind": "array",
    "traceMethod": "两端向内收缩",
    "tiers": [
      "初级",
      "进阶"
    ],
    "url": "https://leetcode.cn/problems/container-with-most-water/"
  },
  {
    "id": 15,
    "title": "三数之和",
    "slug": "3sum",
    "level": "中等",
    "category": "双指针",
    "summary": "找出数组中和为 0 的所有三元组，答案不能包含重复的数值组合。",
    "example": "[-2,0,2,1,1] → [[-2,0,2],[-2,1,1]]",
    "pitfall": "固定数和左右指针都需要去重；不同下标可能产生相同数值三元组。",
    "methods": [
      {
        "name": "三层枚举加去重",
        "time": "O(n³)",
        "space": "O(r)",
        "steps": [
          "枚举 i<j<k",
          "和为 0 则将排序后的三元组放入集合",
          "返回集合"
        ],
        "reason": "r 为不同答案数；集合存储输出所需空间。"
      },
      {
        "name": "排序后固定一个数",
        "time": "O(n²)",
        "space": "O(n+r)",
        "steps": [
          "复制并排序",
          "枚举不重复的 nums[i]，l=i+1,r=n-1",
          "和偏小移动 l，偏大移动 r",
          "相等则记录，并跳过左右重复值"
        ],
        "reason": "每个 i 的双指针最多扫描 n 项；复制数组 O(n)，输出 O(r)。"
      }
    ],
    "frames": [
      {
        "note": "排序后固定 -2，需要另外两数和为 2。",
        "cells": [
          "固定:-2",
          "L:0",
          "1",
          "1",
          "R:2"
        ]
      },
      {
        "note": "-2+0+2=0，收集第一组。",
        "cells": [
          "[-2,0,2]"
        ]
      },
      {
        "note": "向内移动，两个 1 构成第二组。",
        "cells": [
          "固定:-2",
          "L:1",
          "R:1",
          "[-2,1,1]"
        ]
      },
      {
        "note": "后续固定数跳过重复，得到两个不同组合。",
        "cells": [
          "[-2,0,2]",
          "[-2,1,1]"
        ]
      }
    ],
    "kind": "array",
    "traceMethod": "排序后固定一个数",
    "tiers": [
      "初级",
      "进阶"
    ],
    "url": "https://leetcode.cn/problems/3sum/"
  },
  {
    "id": 42,
    "title": "接雨水",
    "slug": "trapping-rain-water",
    "level": "困难",
    "category": "双指针",
    "summary": "每个单位宽度柱子的高度已知，计算下雨后柱间能留住的总水量。",
    "example": "[3,0,2,0,4] → 7",
    "pitfall": "每格水面由左右最高柱的较小值决定，不是相邻柱的较小值。",
    "methods": [
      {
        "name": "逐格寻找左右最高柱",
        "time": "O(n²)",
        "space": "O(1)",
        "steps": [
          "对每格 i 扫描左侧最大值 L 和右侧最大值 R",
          "累加 min(L,R)-h[i]"
        ],
        "reason": "每格都重新扫描两侧。"
      },
      {
        "name": "前后缀最高值",
        "time": "O(n)",
        "space": "O(n)",
        "steps": [
          "正向构造 leftMax",
          "反向构造 rightMax",
          "逐格累加 min(leftMax[i],rightMax[i])-h[i]"
        ],
        "reason": "用两个数组消除重复扫描。"
      },
      {
        "name": "双指针确定短板",
        "time": "O(n)",
        "space": "O(1)",
        "steps": [
          "l=0,r=n-1,L=R=0",
          "更新 L=max(L,h[l]),R=max(R,h[r])",
          "若 L<=R，累加 L-h[l] 并 l++",
          "否则累加 R-h[r] 并 r--"
        ],
        "reason": "较小的已知最高边界足以决定这一侧的水位。"
      }
    ],
    "frames": [
      {
        "note": "两端为 3 和 4，内部水面不超过 3。",
        "cells": [
          "3",
          "0",
          "2",
          "0",
          "4"
        ]
      },
      {
        "note": "位置 1 能存 3-0=3 单位水。",
        "cells": [
          "柱0",
          "水3",
          "累计3"
        ]
      },
      {
        "note": "位置 2 能存 3-2=1 单位水。",
        "cells": [
          "柱2",
          "水1",
          "累计4"
        ]
      },
      {
        "note": "位置 3 再存 3，合计 7。",
        "cells": [
          "水量:[0,3,1,3,0]",
          "总量7"
        ]
      }
    ],
    "kind": "array",
    "traceMethod": "双指针确定短板",
    "tiers": [
      "初级",
      "进阶",
      "高阶"
    ],
    "url": "https://leetcode.cn/problems/trapping-rain-water/"
  },
  {
    "id": 3,
    "title": "无重复字符的最长子串",
    "slug": "longest-substring-without-repeating-characters",
    "level": "中等",
    "category": "滑动窗口",
    "summary": "找一个连续片段，使其中字符互不重复，返回最长长度。",
    "example": "\"abcaef\" → 5，片段 \"bcaef\"",
    "pitfall": "left 只能前进，遇到窗口外的旧字符时不能后退。",
    "methods": [
      {
        "name": "枚举起点再扩展",
        "time": "O(n²)",
        "space": "O(k)",
        "steps": [
          "从每个起点出发",
          "用集合记录字符，重复就停止",
          "更新最大长度"
        ],
        "reason": "k 为字符种类数，扩展每个起点最坏需 O(n)。"
      },
      {
        "name": "最后出现位置跳跃",
        "time": "O(n)",
        "space": "O(k)",
        "steps": [
          "last={}，left=0",
          "读 s[right]，令 left=max(left,last[c]+1)",
          "更新 last[c]=right",
          "答案=max(答案,right-left+1)"
        ],
        "reason": "每个字符访问一次，左边界直接跳过冲突位置。"
      }
    ],
    "frames": [
      {
        "note": "依次读 a、b、c，窗口长度 3。",
        "cells": [
          "[a b c]",
          "a",
          "e",
          "f"
        ]
      },
      {
        "note": "读到第二个 a，旧 a 的位置为 0。",
        "cells": [
          "冲突:a@0",
          "新a@3"
        ]
      },
      {
        "note": "left 跳到 1，窗口成为 bca。",
        "cells": [
          "a",
          "[b c a]"
        ]
      },
      {
        "note": "加入 e、f，得到 bcaef，长度 5。",
        "cells": [
          "a",
          "[b c a e f]",
          "答案5"
        ]
      }
    ],
    "kind": "array",
    "traceMethod": "最后出现位置跳跃",
    "tiers": [
      "初级",
      "进阶"
    ],
    "url": "https://leetcode.cn/problems/longest-substring-without-repeating-characters/"
  },
  {
    "id": 438,
    "title": "找到字符串中所有字母异位词",
    "slug": "find-all-anagrams-in-a-string",
    "level": "中等",
    "category": "滑动窗口",
    "summary": "在字符串 s 中找出所有长度等于 p、字符频次与 p 一致的连续窗口，返回起点。",
    "example": "s=\"abacb\", p=\"abc\" → [1,2]",
    "pitfall": "窗口长度固定；每次右侧进入字符时，左侧离开字符也要减掉。",
    "methods": [
      {
        "name": "每个窗口排序比较",
        "time": "O(n·m log m)",
        "space": "O(m)",
        "steps": [
          "将 p 排序",
          "取 s 的每个长度 m 的片段并排序",
          "相等则记录起点"
        ],
        "reason": "n=|s|，m=|p|，包含片段复制成本；输出另计。"
      },
      {
        "name": "固定长度频次数组",
        "time": "O(n+m)",
        "space": "O(1)",
        "steps": [
          "建立 p 的 26 字母频次",
          "滑动长度 m 的窗口，更新进出字符计数",
          "每次比较 26 个计数",
          "相同则记录起点"
        ],
        "reason": "小写字母表固定为 26；每次比较是常数，输出另计。"
      }
    ],
    "frames": [
      {
        "note": "目标频次 a:1,b:1,c:1。",
        "cells": [
          "a",
          "b",
          "c"
        ]
      },
      {
        "note": "窗口 aba 有两个 a，没有 c，不匹配。",
        "cells": [
          "[a b a]",
          "c",
          "b"
        ]
      },
      {
        "note": "移出首个 a，加入 c，窗口 bac 匹配，起点1。",
        "cells": [
          "a",
          "[b a c]",
          "b"
        ]
      },
      {
        "note": "再滑动，窗口 acb 匹配，起点2。",
        "cells": [
          "a",
          "b",
          "[a c b]",
          "答案[1,2]"
        ]
      }
    ],
    "kind": "array",
    "traceMethod": "固定长度频次数组",
    "tiers": [
      "初级",
      "进阶"
    ],
    "url": "https://leetcode.cn/problems/find-all-anagrams-in-a-string/"
  },
  {
    "id": 560,
    "title": "和为 K 的子数组",
    "slug": "subarray-sum-equals-k",
    "level": "中等",
    "category": "子串",
    "summary": "统计和恰好等于 k 的连续非空子数组数量，数组可以含负数。",
    "example": "nums=[1,-1,1], k=1 → 3",
    "pitfall": "存在负数时普通滑动窗口不成立。前缀和 0 必须先记录一次。",
    "methods": [
      {
        "name": "枚举起点累加",
        "time": "O(n²)",
        "space": "O(1)",
        "steps": [
          "对每个起点将 sum=0",
          "依次向右累加",
          "sum=k 就计数"
        ],
        "reason": "不用重复求区间和，仍需枚举所有区间。"
      },
      {
        "name": "前缀和频次表",
        "time": "期望 O(n)",
        "space": "O(n)",
        "steps": [
          "freq={0:1},prefix=0",
          "读 x 后 prefix+=x",
          "答案+=freq[prefix-k]",
          "最后 freq[prefix]++"
        ],
        "reason": "区间和为 k 等价于两个前缀和相差 k，频次保留所有可选起点。"
      }
    ],
    "frames": [
      {
        "note": "初始前缀和 0 出现 1 次。",
        "cells": [
          "freq{0:1}",
          "答案0"
        ]
      },
      {
        "note": "读 1，prefix=1，找 0，新增1个。",
        "cells": [
          "prefix1",
          "freq{0:1,1:1}",
          "答案1"
        ]
      },
      {
        "note": "读 -1，prefix=0，找 -1 未出现。",
        "cells": [
          "prefix0",
          "freq{0:2,1:1}",
          "答案1"
        ]
      },
      {
        "note": "再读 1，prefix=1，前缀0出现2次，新增2个。",
        "cells": [
          "[1]",
          "[1,-1,1]",
          "最后的[1]",
          "答案3"
        ]
      }
    ],
    "kind": "array",
    "traceMethod": "前缀和频次表",
    "tiers": [
      "初级",
      "进阶"
    ],
    "url": "https://leetcode.cn/problems/subarray-sum-equals-k/"
  },
  {
    "id": 239,
    "title": "滑动窗口最大值",
    "slug": "sliding-window-maximum",
    "level": "困难",
    "category": "子串",
    "summary": "长度为 k 的窗口从左向右滑动，返回每个窗口中的最大值。",
    "example": "nums=[2,1,3,0,4], k=3 → [3,3,4]",
    "pitfall": "队列存下标而不是只存值，才能判断元素是否已离开窗口。",
    "methods": [
      {
        "name": "每个窗口遍历找最大",
        "time": "O(nk)",
        "space": "O(1)",
        "steps": [
          "枚举窗口起点",
          "扫描窗口的 k 个值",
          "记录最大值"
        ],
        "reason": "输出 O(n-k+1) 另计。"
      },
      {
        "name": "带过期清理的最大堆",
        "time": "O(n log n)",
        "space": "O(n)",
        "steps": [
          "每个元素以 值,下标 入堆",
          "堆顶下标过期时弹出",
          "窗口形成后读堆顶"
        ],
        "reason": "懒删除可能保留很多非堆顶过期项，空间不是 O(k)。"
      },
      {
        "name": "单调双端队列",
        "time": "O(n)",
        "space": "O(k)",
        "steps": [
          "删除队首过期下标",
          "从队尾删除不大于当前值的下标",
          "将当前下标加入队尾",
          "窗口形成后输出队首值"
        ],
        "reason": "每个下标最多入队一次、出队一次；使用真正的双端队列。"
      }
    ],
    "frames": [
      {
        "note": "读 2，候选队列 [2]。",
        "cells": [
          "2"
        ]
      },
      {
        "note": "读 1，候选队列 [2,1]。",
        "cells": [
          "2",
          "1"
        ]
      },
      {
        "note": "读 3，2和1都被更晚且更大的3淘汰，输出3。",
        "cells": [
          "[3]",
          "输出[3]"
        ]
      },
      {
        "note": "读0后队列[3,0]，输出3；读4后只剩4。",
        "cells": [
          "[4]",
          "输出[3,3,4]"
        ]
      }
    ],
    "kind": "queue",
    "traceMethod": "单调双端队列",
    "tiers": [
      "初级",
      "进阶",
      "高阶"
    ],
    "url": "https://leetcode.cn/problems/sliding-window-maximum/"
  },
  {
    "id": 76,
    "title": "最小覆盖子串",
    "slug": "minimum-window-substring",
    "level": "困难",
    "category": "子串",
    "summary": "在 s 中找最短连续片段，使其字符频次足以覆盖 t 的所有字符；不存在返回空串。",
    "example": "s=\"CABEFABC\", t=\"ABC\" → \"CAB\"（\"ABC\" 也是长度3的最优片段）",
    "pitfall": "覆盖要求包含重复次数；只比较字符是否出现不够。",
    "methods": [
      {
        "name": "枚举区间检查覆盖",
        "time": "O(n²·k)",
        "space": "O(k)",
        "steps": [
          "对每个起点不断扩展区间并累计频次",
          "逐项检查 t 的需求",
          "覆盖时更新最短区间"
        ],
        "reason": "n=|s|，k 为 t 中不同字符数；固定字母表时可简化为 O(n²)。"
      },
      {
        "name": "满足后收缩的窗口",
        "time": "O(n+m)",
        "space": "O(k)",
        "steps": [
          "统计 t 的需求及尚缺数量 missing",
          "right 扩张更新频次",
          "missing=0 时尝试更新答案并移动 left",
          "移走必需字符后继续扩张"
        ],
        "reason": "每个字符最多进入和离开窗口一次，m=|t|。"
      }
    ],
    "frames": [
      {
        "note": "目标为 A、B、C 各一次。",
        "cells": [
          "need A1",
          "need B1",
          "need C1"
        ]
      },
      {
        "note": "右边界读到 CAB，刚好满足需求。",
        "cells": [
          "[C A B]",
          "E",
          "F",
          "A",
          "B",
          "C"
        ]
      },
      {
        "note": "收缩左边界会丢掉 C，因此保存 CAB。",
        "cells": [
          "最佳:CAB",
          "长度3"
        ]
      },
      {
        "note": "继续扫描，末尾 ABC 也覆盖；最短长度仍为3。",
        "cells": [
          "C A B E F",
          "[A B C]"
        ]
      }
    ],
    "kind": "array",
    "traceMethod": "满足后收缩的窗口",
    "tiers": [
      "初级",
      "进阶"
    ],
    "url": "https://leetcode.cn/problems/minimum-window-substring/"
  },
  {
    "id": 53,
    "title": "最大子数组和",
    "slug": "maximum-subarray",
    "level": "中等",
    "category": "普通数组",
    "summary": "在数组中选取非空连续区间，返回最大区间和。",
    "example": "[-3,4,-1,2,-6] → 5",
    "pitfall": "全负数组不能返回 0，初值应来自数组中的数字。",
    "methods": [
      {
        "name": "枚举区间累加",
        "time": "O(n²)",
        "space": "O(1)",
        "steps": [
          "枚举起点",
          "向右累加 sum",
          "每次用 sum 更新最大值"
        ],
        "reason": "每个区间都检查一次。"
      },
      {
        "name": "以当前位置结尾的 DP",
        "time": "O(n)",
        "space": "O(1)",
        "steps": [
          "ending=best=nums[0]",
          "对后续 x：ending=max(x,ending+x)",
          "best=max(best,ending)"
        ],
        "reason": "负贡献不如丢弃，当前状态只依赖前一项。"
      }
    ],
    "frames": [
      {
        "note": "起始 -3，最佳为 -3。",
        "cells": [
          "ending=-3",
          "best=-3"
        ]
      },
      {
        "note": "读4：重新开始比 -3+4 更好。",
        "cells": [
          "ending=4",
          "best=4"
        ]
      },
      {
        "note": "读-1再读2：以当前位置结尾的和依次为3、5。",
        "cells": [
          "4",
          "-1",
          "2",
          "best=5"
        ]
      },
      {
        "note": "读-6，ending=-1，历史最佳保留5。",
        "cells": [
          "ending=-1",
          "best=5"
        ]
      }
    ],
    "kind": "dp",
    "traceMethod": "以当前位置结尾的 DP",
    "tiers": [
      "初级",
      "进阶"
    ],
    "url": "https://leetcode.cn/problems/maximum-subarray/"
  },
  {
    "id": 56,
    "title": "合并区间",
    "slug": "merge-intervals",
    "level": "中等",
    "category": "普通数组",
    "summary": "将互相重叠的闭区间合并，返回互不重叠的覆盖结果。",
    "example": "[[5,8],[1,3],[2,4]] → [[1,4],[5,8]]",
    "pitfall": "闭区间端点相等也算重叠；合并时终点取最大值。",
    "methods": [
      {
        "name": "反复两两合并",
        "time": "O(n³)",
        "space": "O(n)",
        "steps": [
          "复制区间列表",
          "每轮寻找任意一对重叠区间并合并",
          "没有可合并对时停止"
        ],
        "reason": "最多合并 n-1 次，每次重新检查 O(n²) 对，最终可排序输出。"
      },
      {
        "name": "排序后一次扫描",
        "time": "O(n log n)",
        "space": "O(n)",
        "steps": [
          "复制并按起点排序",
          "若当前起点<=最后区间终点则延长终点",
          "否则追加新区间"
        ],
        "reason": "排序后所有可能重叠区间相邻，输出及排序副本占 O(n)。"
      }
    ],
    "frames": [
      {
        "note": "按起点排序。",
        "cells": [
          "[1,3]",
          "[2,4]",
          "[5,8]"
        ]
      },
      {
        "note": "2<=3，前两个区间重叠。",
        "cells": [
          "1 — 3",
          "2 — 4"
        ]
      },
      {
        "note": "合并为 [1,4]。",
        "cells": [
          "[1,4]",
          "[5,8]"
        ]
      },
      {
        "note": "5>4，另开区间，得到最终结果。",
        "cells": [
          "[1,4]",
          "[5,8]"
        ]
      }
    ],
    "kind": "interval",
    "traceMethod": "排序后一次扫描",
    "tiers": [
      "初级",
      "进阶"
    ],
    "url": "https://leetcode.cn/problems/merge-intervals/"
  },
  {
    "id": 189,
    "title": "轮转数组",
    "slug": "rotate-array",
    "level": "中等",
    "category": "普通数组",
    "summary": "将数组向右循环移动 k 个位置，要求修改原数组。",
    "example": "[1,2,3,4,5], k=2 → [4,5,1,2,3]",
    "pitfall": "先取 k %= n；n=0 的扩展场景需要先返回，不能取模0。",
    "methods": [
      {
        "name": "辅助数组定位",
        "time": "O(n)",
        "space": "O(n)",
        "steps": [
          "创建 out",
          "对每个 i，将 nums[i] 写入 out[(i+k)%n]",
          "将 out 写回 nums"
        ],
        "reason": "每个元素直接定位一次。"
      },
      {
        "name": "三次反转",
        "time": "O(n)",
        "space": "O(1)",
        "steps": [
          "k%=n",
          "原地反转整个数组",
          "反转前 k 项",
          "反转剩余 n-k 项"
        ],
        "reason": "整体倒序先交换两段位置，两段再倒序恢复内部顺序。"
      }
    ],
    "frames": [
      {
        "note": "原数组，后2项将成为新前缀。",
        "cells": [
          "1",
          "2",
          "3",
          "4",
          "5"
        ]
      },
      {
        "note": "整体反转。",
        "cells": [
          "5",
          "4",
          "3",
          "2",
          "1"
        ]
      },
      {
        "note": "反转前2项。",
        "cells": [
          "4",
          "5",
          "3",
          "2",
          "1"
        ]
      },
      {
        "note": "反转剩余3项。",
        "cells": [
          "4",
          "5",
          "1",
          "2",
          "3"
        ]
      }
    ],
    "kind": "array",
    "traceMethod": "三次反转",
    "tiers": [
      "初级",
      "进阶"
    ],
    "url": "https://leetcode.cn/problems/rotate-array/"
  },
  {
    "id": 238,
    "title": "除了自身以外数组的乘积",
    "slug": "product-of-array-except-self",
    "level": "中等",
    "category": "普通数组",
    "summary": "为每个位置计算除当前位置以外所有数字的乘积，不使用除法。",
    "example": "[2,3,4] → [12,8,6]",
    "pitfall": "使用除法会遇到0且不符合题意；前缀积与后缀积都应排除当前位置。",
    "methods": [
      {
        "name": "逐位置遍历其他元素",
        "time": "O(n²)",
        "space": "O(1)，输出 O(n)",
        "steps": [
          "枚举 i",
          "令 product=1",
          "遍历 j≠i，累乘 nums[j]",
          "out[i]=product"
        ],
        "reason": "每个输出都重算 n-1 次乘法。"
      },
      {
        "name": "前缀输出加滚动后缀",
        "time": "O(n)",
        "space": "O(1)，输出 O(n)",
        "steps": [
          "out[i] 保存 i 左侧乘积",
          "suffix=1，从右到左遍历",
          "out[i]*=suffix",
          "suffix*=nums[i]"
        ],
        "reason": "输出数组复用前缀信息，只额外维护一个后缀积。"
      }
    ],
    "frames": [
      {
        "note": "输入为 2、3、4。",
        "cells": [
          "2",
          "3",
          "4"
        ]
      },
      {
        "note": "每项左侧乘积：[1,2,6]。",
        "cells": [
          "1",
          "2",
          "6"
        ]
      },
      {
        "note": "从右向左乘后缀：位置2乘1，位置1乘4。",
        "cells": [
          "1",
          "8",
          "6"
        ]
      },
      {
        "note": "位置0乘12，得到 [12,8,6]。",
        "cells": [
          "12",
          "8",
          "6"
        ]
      }
    ],
    "kind": "array",
    "traceMethod": "前缀输出加滚动后缀",
    "tiers": [
      "初级",
      "进阶"
    ],
    "url": "https://leetcode.cn/problems/product-of-array-except-self/"
  },
  {
    "id": 41,
    "title": "缺失的第一个正数",
    "slug": "first-missing-positive",
    "level": "困难",
    "category": "普通数组",
    "summary": "从无序数组中找出没有出现的最小正整数，目标线性时间、常数额外空间。",
    "example": "[3,4,-1,1] → 2",
    "pitfall": "只把 1..n 放回对应位置；交换前检查目标位置，防止重复值导致死循环。",
    "methods": [
      {
        "name": "集合查缺",
        "time": "期望 O(n)",
        "space": "O(n)",
        "steps": [
          "将数字放入集合",
          "从1开始递增查询",
          "第一个不在集合中的数就是答案"
        ],
        "reason": "n 个数字不可能覆盖 1..n+1，所以最多查询 n+1 次。"
      },
      {
        "name": "把值放回它的座位",
        "time": "O(n)",
        "space": "O(1)",
        "steps": [
          "对每个 i：当 1<=nums[i]<=n 且 nums[nums[i]-1]≠nums[i] 时交换",
          "扫描第一个 nums[i]≠i+1 的位置",
          "返回 i+1，若全匹配返回 n+1"
        ],
        "reason": "每次交换至少把一个有效值放到最终位置，总交换次数 O(n)。"
      }
    ],
    "frames": [
      {
        "note": "值 v 对应座位 v-1。",
        "cells": [
          "3",
          "4",
          "-1",
          "1"
        ]
      },
      {
        "note": "把3放到下标2。",
        "cells": [
          "-1",
          "4",
          "3",
          "1"
        ]
      },
      {
        "note": "把4放到下标3，再把1放到下标0。",
        "cells": [
          "1",
          "-1",
          "3",
          "4"
        ]
      },
      {
        "note": "下标1应当是2，却不是，因此缺失2。",
        "cells": [
          "1",
          "[缺2]",
          "3",
          "4"
        ]
      }
    ],
    "kind": "array",
    "traceMethod": "把值放回它的座位",
    "tiers": [
      "初级",
      "进阶"
    ],
    "url": "https://leetcode.cn/problems/first-missing-positive/"
  },
  {
    "id": 73,
    "title": "矩阵置零",
    "slug": "set-matrix-zeroes",
    "level": "中等",
    "category": "矩阵",
    "summary": "若矩阵某格原先为0，则把它所在的整行、整列全部变为0。",
    "example": "[[1,2,3],[4,0,6]] → [[1,0,3],[0,0,0]]",
    "pitfall": "不能发现0就立即修改，否则新写入的0会扩散成错误标记。",
    "methods": [
      {
        "name": "独立行列标记",
        "time": "O(mn)",
        "space": "O(m+n)",
        "steps": [
          "扫描原矩阵，记录需要清零的行和列",
          "第二遍根据记录清零"
        ],
        "reason": "分离发现与修改，避免状态污染。"
      },
      {
        "name": "首行首列充当标记",
        "time": "O(mn)",
        "space": "O(1)",
        "steps": [
          "先保存首行、首列原本是否含0",
          "用首行首列标记内部0",
          "根据标记清零内部",
          "最后处理首行首列"
        ],
        "reason": "复用矩阵存储信息，只额外保留两个布尔值。"
      }
    ],
    "frames": [
      {
        "note": "原矩阵中的0位于第1行、第1列。",
        "cells": [
          "1  2  3",
          "4  0  6"
        ]
      },
      {
        "note": "标记需清零的行列，不立即扩散。",
        "cells": [
          "行1→清零",
          "列1→清零"
        ]
      },
      {
        "note": "第1行全部变0。",
        "cells": [
          "1  2  3",
          "0  0  0"
        ]
      },
      {
        "note": "第1列也变0。",
        "cells": [
          "1  0  3",
          "0  0  0"
        ]
      }
    ],
    "kind": "matrix",
    "traceMethod": "首行首列充当标记",
    "tiers": [
      "初级",
      "进阶"
    ],
    "url": "https://leetcode.cn/problems/set-matrix-zeroes/"
  },
  {
    "id": 54,
    "title": "螺旋矩阵",
    "slug": "spiral-matrix",
    "level": "中等",
    "category": "矩阵",
    "summary": "沿外圈顺时针读取矩阵，逐层向内，返回访问序列。",
    "example": "[[1,2,3],[4,5,6],[7,8,9]] → [1,2,3,6,9,8,7,4,5]",
    "pitfall": "每收缩一个方向都要检查边界；单行或单列时不能重复读取。",
    "methods": [
      {
        "name": "方向模拟与访问表",
        "time": "O(mn)",
        "space": "O(mn)",
        "steps": [
          "方向按右下左上轮换",
          "记录每格是否访问",
          "遇边界或已访问格时转向",
          "共访问 mn 次"
        ],
        "reason": "访问表用于防止重复，输出另计。"
      },
      {
        "name": "四个边界逐层收缩",
        "time": "O(mn)",
        "space": "O(1)，输出 O(mn)",
        "steps": [
          "设 top,bottom,left,right",
          "读上边后 top++，读右边后 right--",
          "边界有效时读下边、左边并收缩",
          "重复直到边界相交"
        ],
        "reason": "每个格子恰读一次，不需要访问矩阵。"
      }
    ],
    "frames": [
      {
        "note": "先读顶边。",
        "cells": [
          "[1 2 3]",
          "4 5 6",
          "7 8 9"
        ]
      },
      {
        "note": "再读右边。",
        "cells": [
          "已读1,2,3",
          "6 ↓ 9"
        ]
      },
      {
        "note": "读底边与左边。",
        "cells": [
          "9 ← 8 ← 7",
          "4 ↑"
        ]
      },
      {
        "note": "剩下中心5。",
        "cells": [
          "输出1,2,3,6,9,8,7,4,5"
        ]
      }
    ],
    "kind": "matrix",
    "traceMethod": "四个边界逐层收缩",
    "tiers": [
      "初级",
      "进阶"
    ],
    "url": "https://leetcode.cn/problems/spiral-matrix/"
  },
  {
    "id": 48,
    "title": "旋转图像",
    "slug": "rotate-image",
    "level": "中等",
    "category": "矩阵",
    "summary": "把 n×n 方阵顺时针转90度，并原地修改矩阵。",
    "example": "[[1,2],[3,4]] → [[3,1],[4,2]]",
    "pitfall": "必须是方阵。转置后应反转每一行，而不是再次反转列。",
    "methods": [
      {
        "name": "按坐标写新矩阵",
        "time": "O(n²)",
        "space": "O(n²)",
        "steps": [
          "为每个 (r,c) 写 out[c][n-1-r]=matrix[r][c]",
          "将 out 写回"
        ],
        "reason": "旋转后的坐标是列变行、行变反向列。"
      },
      {
        "name": "转置再反转各行",
        "time": "O(n²)",
        "space": "O(1)",
        "steps": [
          "只交换主对角线一侧的 matrix[r][c] 与 matrix[c][r]",
          "每一行用双指针反转"
        ],
        "reason": "两次反射等价于顺时针90度旋转，每格处理常数次。"
      }
    ],
    "frames": [
      {
        "note": "原矩阵。",
        "cells": [
          "1 2",
          "3 4"
        ]
      },
      {
        "note": "交换对角线两侧的2与3。",
        "cells": [
          "1 3",
          "2 4"
        ]
      },
      {
        "note": "反转第一行。",
        "cells": [
          "3 1",
          "2 4"
        ]
      },
      {
        "note": "反转第二行完成旋转。",
        "cells": [
          "3 1",
          "4 2"
        ]
      }
    ],
    "kind": "matrix",
    "traceMethod": "转置再反转各行",
    "tiers": [
      "初级",
      "进阶"
    ],
    "url": "https://leetcode.cn/problems/rotate-image/"
  },
  {
    "id": 240,
    "title": "搜索二维矩阵 II",
    "slug": "search-a-2d-matrix-ii",
    "level": "中等",
    "category": "矩阵",
    "summary": "矩阵每行与每列都递增，判断目标值是否存在。",
    "example": "[[1,4,7],[2,5,8],[3,6,9]], target=6 → true",
    "pitfall": "行列递增不代表按行展开后的整个数组有序，不能直接整体二分。",
    "methods": [
      {
        "name": "逐行二分",
        "time": "O(m log n)",
        "space": "O(1)",
        "steps": [
          "对每行分别执行二分搜索",
          "任意一行找到即返回 true"
        ],
        "reason": "m 行，每行二分 n 项。"
      },
      {
        "name": "右上角阶梯搜索",
        "time": "O(m+n)",
        "space": "O(1)",
        "steps": [
          "从右上角开始",
          "当前值大于目标则左移",
          "小于目标则下移",
          "相等返回 true"
        ],
        "reason": "左移排除一列，下移排除一行，最多走 m+n 步。"
      }
    ],
    "frames": [
      {
        "note": "从右上角7开始，目标6。",
        "cells": [
          "1 4 [7]",
          "2 5 8",
          "3 6 9"
        ]
      },
      {
        "note": "7>6，向左到4。",
        "cells": [
          "1 [4] 7",
          "2 5 8",
          "3 6 9"
        ]
      },
      {
        "note": "4<6向下到5，仍小于6，再向下。",
        "cells": [
          "1 4 7",
          "2 [5] 8",
          "3 6 9"
        ]
      },
      {
        "note": "找到6。",
        "cells": [
          "1 4 7",
          "2 5 8",
          "3 [6] 9"
        ]
      }
    ],
    "kind": "matrix",
    "traceMethod": "右上角阶梯搜索",
    "tiers": [
      "初级",
      "进阶"
    ],
    "url": "https://leetcode.cn/problems/search-a-2d-matrix-ii/"
  },
  {
    "id": 160,
    "title": "相交链表",
    "slug": "intersection-of-two-linked-lists",
    "level": "简单",
    "category": "链表",
    "summary": "两个无环单链表可能共享尾部节点，返回第一个共同节点，没有则返回空。",
    "example": "A:a→c→d，B:b→x→c→d → 节点c",
    "pitfall": "相交按节点身份比较，不是比较节点的值。",
    "methods": [
      {
        "name": "节点集合",
        "time": "O(m+n)",
        "space": "O(m)",
        "steps": [
          "把 A 的所有节点地址放入集合",
          "遍历 B，遇到集合中的节点即返回"
        ],
        "reason": "集合保留身份，不是节点值。"
      },
      {
        "name": "交换起点的双指针",
        "time": "O(m+n)",
        "space": "O(1)",
        "steps": [
          "p=A,q=B",
          "p 到末尾后转向 B，q 到末尾后转向 A",
          "每步同时移动，直到 p=q"
        ],
        "reason": "两人都走过 m+n 的总路程，前缀长度差被抵消。"
      }
    ],
    "frames": [
      {
        "note": "两条链共享 c→d。",
        "cells": [
          "A: a → c → d",
          "B: b → x → c → d"
        ]
      },
      {
        "note": "指针每次走一步，短链先走到尾部。",
        "cells": [
          "p:null",
          "q:d"
        ]
      },
      {
        "note": "到末尾后分别切换到另一条链。",
        "cells": [
          "p走B",
          "q走A"
        ]
      },
      {
        "note": "长度差抵消后在同一节点c相遇。",
        "cells": [
          "p=q=c",
          "共同尾部 c→d"
        ]
      }
    ],
    "kind": "linked",
    "traceMethod": "交换起点的双指针",
    "tiers": [
      "初级",
      "进阶"
    ],
    "url": "https://leetcode.cn/problems/intersection-of-two-linked-lists/"
  },
  {
    "id": 206,
    "title": "反转链表",
    "slug": "reverse-linked-list",
    "level": "简单",
    "category": "链表",
    "summary": "将单链表每条 next 指针反向，返回新的头节点。",
    "example": "1→4→7→null → 7→4→1→null",
    "pitfall": "改 next 前必须保存原后继，否则会失去剩余链。",
    "methods": [
      {
        "name": "递归反转后缀",
        "time": "O(n)",
        "space": "O(n)",
        "steps": [
          "递归反转 head.next 得到新头",
          "令 head.next.next=head",
          "令 head.next=null",
          "返回新头"
        ],
        "reason": "每个节点一次，调用栈最坏 n 层。"
      },
      {
        "name": "三指针迭代",
        "time": "O(n)",
        "space": "O(1)",
        "steps": [
          "prev=null,cur=head",
          "next=cur.next",
          "cur.next=prev",
          "prev=cur,cur=next",
          "最终返回 prev"
        ],
        "reason": "prev 代表已反转前缀，cur 代表待处理后缀。"
      }
    ],
    "frames": [
      {
        "note": "prev 为空，cur 在1。",
        "cells": [
          "prev:null",
          "1 → 4 → 7"
        ]
      },
      {
        "note": "保存4，反转1的指向。",
        "cells": [
          "null ← 1",
          "cur:4 → 7"
        ]
      },
      {
        "note": "保存7，让4指向1。",
        "cells": [
          "null ← 1 ← 4",
          "cur:7"
        ]
      },
      {
        "note": "7指向4，新头为7。",
        "cells": [
          "7 → 4 → 1 → null"
        ]
      }
    ],
    "kind": "linked",
    "traceMethod": "三指针迭代",
    "tiers": [
      "初级",
      "进阶"
    ],
    "url": "https://leetcode.cn/problems/reverse-linked-list/"
  },
  {
    "id": 234,
    "title": "回文链表",
    "slug": "palindrome-linked-list",
    "level": "简单",
    "category": "链表",
    "summary": "判断单链表从前到后读取的值是否与从后到前一致。",
    "example": "1→2→2→1 → true",
    "pitfall": "比较后将后半段再反转一次恢复原链，避免留下意外副作用。",
    "methods": [
      {
        "name": "复制到数组比较",
        "time": "O(n)",
        "space": "O(n)",
        "steps": [
          "遍历链表收集值",
          "数组左右指针比较",
          "不相等立即返回 false"
        ],
        "reason": "额外数组换来直接的随机访问。"
      },
      {
        "name": "找中点并反转后半段",
        "time": "O(n)",
        "space": "O(1)",
        "steps": [
          "快慢指针找到前半段末尾",
          "反转后半段",
          "逐个比较前半与后半",
          "恢复后半段并返回比较结果"
        ],
        "reason": "三次线性操作相加仍为 O(n)，只维护少量指针。"
      }
    ],
    "frames": [
      {
        "note": "链表为1,2,2,1。",
        "cells": [
          "1 → 2 → 2 → 1"
        ]
      },
      {
        "note": "快慢指针找到两段分界。",
        "cells": [
          "前半1→2",
          "后半2→1"
        ]
      },
      {
        "note": "反转后半段后为1→2。",
        "cells": [
          "前半1→2",
          "后半1→2"
        ]
      },
      {
        "note": "逐项相等，恢复后返回true。",
        "cells": [
          "1=1",
          "2=2",
          "true"
        ]
      }
    ],
    "kind": "linked",
    "traceMethod": "找中点并反转后半段",
    "tiers": [
      "初级",
      "进阶"
    ],
    "url": "https://leetcode.cn/problems/palindrome-linked-list/"
  },
  {
    "id": 141,
    "title": "环形链表",
    "slug": "linked-list-cycle",
    "level": "简单",
    "category": "链表",
    "summary": "判断沿单链表 next 不断前进是否会重复经过同一个节点。",
    "example": "a→b→c→b → true",
    "pitfall": "有环与否取决于节点引用是否重复，而不是值是否重复。",
    "methods": [
      {
        "name": "访问集合",
        "time": "O(n)",
        "space": "O(n)",
        "steps": [
          "遍历节点",
          "已在 seen 中则有环",
          "否则加入并前进",
          "到 null 则无环"
        ],
        "reason": "每个可达节点最多记录一次。"
      },
      {
        "name": "快慢指针追赶",
        "time": "O(n)",
        "space": "O(1)",
        "steps": [
          "slow 每次走1步，fast 每次走2步",
          "fast 或 fast.next 为空则无环",
          "走动后两者相同则有环"
        ],
        "reason": "环中相对速度为1，至多绕一圈就能相遇。"
      }
    ],
    "frames": [
      {
        "note": "链：a→b→c→b，b与c组成环。",
        "cells": [
          "a",
          "b ↔ c"
        ]
      },
      {
        "note": "初始两指针在a，先移动再比较。",
        "cells": [
          "slow:a",
          "fast:a"
        ]
      },
      {
        "note": "第一轮 slow=b，fast=c。",
        "cells": [
          "slow:b",
          "fast:c"
        ]
      },
      {
        "note": "第二轮两者都在c，发现环。",
        "cells": [
          "slow=fast=c",
          "有环"
        ]
      }
    ],
    "kind": "linked",
    "traceMethod": "快慢指针追赶",
    "tiers": [
      "初级",
      "进阶"
    ],
    "url": "https://leetcode.cn/problems/linked-list-cycle/"
  },
  {
    "id": 142,
    "title": "环形链表 II",
    "slug": "linked-list-cycle-ii",
    "level": "中等",
    "category": "链表",
    "summary": "若链表存在环，返回环的入口节点；无环则返回空。",
    "example": "a→b→c→d→b → 入口b",
    "pitfall": "快慢指针相遇点通常不是入口，需要第二阶段。",
    "methods": [
      {
        "name": "首次重复节点",
        "time": "O(n)",
        "space": "O(n)",
        "steps": [
          "沿 next 前进并记录节点",
          "第一次重复出现的节点即入口"
        ],
        "reason": "从头行走最先重复的节点一定是环入口。"
      },
      {
        "name": "Floyd 两阶段",
        "time": "O(n)",
        "space": "O(1)",
        "steps": [
          "快慢指针先在环内相遇",
          "一个指针移回头节点",
          "两指针改为每次走一步",
          "再次相遇的节点就是入口"
        ],
        "reason": "由快指针路程是慢指针两倍可得，头到入口距离与相遇点到入口距离模环长相等。"
      }
    ],
    "frames": [
      {
        "note": "入口b，环为 b→c→d→b。",
        "cells": [
          "a → b → c → d",
          "d.next=b"
        ]
      },
      {
        "note": "第一次快慢相遇在d。",
        "cells": [
          "slow=fast=d"
        ]
      },
      {
        "note": "一人回到a，两人每次走一步。",
        "cells": [
          "p:a → b",
          "q:d → b"
        ]
      },
      {
        "note": "在b再次相遇，得到入口。",
        "cells": [
          "入口b"
        ]
      }
    ],
    "kind": "linked",
    "traceMethod": "Floyd 两阶段",
    "tiers": [
      "初级",
      "进阶"
    ],
    "url": "https://leetcode.cn/problems/linked-list-cycle-ii/"
  },
  {
    "id": 21,
    "title": "合并两个有序链表",
    "slug": "merge-two-sorted-lists",
    "level": "简单",
    "category": "链表",
    "summary": "合并两个已经递增的单链表，返回合并后的有序链表。",
    "example": "1→5 与 2→3 → 1→2→3→5",
    "pitfall": "接完一个节点后推进对应输入指针和结果尾指针。",
    "methods": [
      {
        "name": "递归选择较小头节点",
        "time": "O(m+n)",
        "space": "O(m+n)",
        "steps": [
          "若某链为空返回另一链",
          "选较小头作为结果头",
          "其 next 接递归合并的剩余链"
        ],
        "reason": "递归深度可能达到两链总长度。"
      },
      {
        "name": "哨兵与尾指针",
        "time": "O(m+n)",
        "space": "O(1)",
        "steps": [
          "建立 dummy 和 tail",
          "反复把较小头节点接到 tail",
          "推进对应链与 tail",
          "最后接上未耗尽的链"
        ],
        "reason": "复用原节点，额外空间不随长度增长。"
      }
    ],
    "frames": [
      {
        "note": "两个有序输入。",
        "cells": [
          "A:1→5",
          "B:2→3"
        ]
      },
      {
        "note": "先接较小的1。",
        "cells": [
          "结果1",
          "A:5",
          "B:2→3"
        ]
      },
      {
        "note": "继续接2、3。",
        "cells": [
          "结果1→2→3",
          "A:5"
        ]
      },
      {
        "note": "把剩余5接到尾部。",
        "cells": [
          "1→2→3→5"
        ]
      }
    ],
    "kind": "linked",
    "traceMethod": "哨兵与尾指针",
    "tiers": [
      "初级",
      "进阶"
    ],
    "url": "https://leetcode.cn/problems/merge-two-sorted-lists/"
  },
  {
    "id": 2,
    "title": "两数相加",
    "slug": "add-two-numbers",
    "level": "中等",
    "category": "链表",
    "summary": "两条链表按低位到高位存放非负整数的各位，计算和并以相同形式返回。",
    "example": "[7,5]+[8,6] 表示57+68 → [5,2,1]",
    "pitfall": "两链都遍历完后若还有进位，必须额外创建节点。",
    "methods": [
      {
        "name": "转成大整数再相加",
        "time": "O(n²) 保守位操作上界",
        "space": "O(n)",
        "steps": [
          "读取每一位构造任意精度整数",
          "相加",
          "再按低位拆成链表"
        ],
        "reason": "原生定长整数可能溢出；任意精度整数操作并非恒定时间，不推荐用它绕过链表过程。"
      },
      {
        "name": "逐位加法与进位",
        "time": "O(m+n)",
        "space": "O(1)，输出 O(max(m,n))",
        "steps": [
          "carry=0",
          "只要任一链非空或 carry≠0 就继续",
          "sum=两节点值+carry",
          "写入 sum%10，carry=sum//10",
          "推进非空指针"
        ],
        "reason": "每个位只处理一次，模拟手算加法。"
      }
    ],
    "frames": [
      {
        "note": "低位在前，先算7+8。",
        "cells": [
          "7→5",
          "8→6"
        ]
      },
      {
        "note": "7+8=15，写5，进位1。",
        "cells": [
          "输出5",
          "carry1"
        ]
      },
      {
        "note": "5+6+1=12，写2，进位1。",
        "cells": [
          "输出5→2",
          "carry1"
        ]
      },
      {
        "note": "两链结束，补上进位1。",
        "cells": [
          "5→2→1",
          "即125"
        ]
      }
    ],
    "kind": "linked",
    "traceMethod": "逐位加法与进位",
    "tiers": [
      "初级",
      "进阶"
    ],
    "url": "https://leetcode.cn/problems/add-two-numbers/"
  },
  {
    "id": 19,
    "title": "删除链表的倒数第 N 个结点",
    "slug": "remove-nth-node-from-end-of-list",
    "level": "中等",
    "category": "链表",
    "summary": "删除单链表倒数第 n 个节点，返回新的头节点。",
    "example": "1→2→3→4，n=2 → 1→2→4",
    "pitfall": "使用 dummy 统一删除头节点的情况，注意指针间距和停止条件要配套。",
    "methods": [
      {
        "name": "先数长度",
        "time": "O(L)",
        "space": "O(1)",
        "steps": [
          "第一次遍历得到长度 L",
          "从 dummy 再走 L-n 步到前驱",
          "跳过目标节点"
        ],
        "reason": "两次线性遍历仍是 O(L)。"
      },
      {
        "name": "固定间隔双指针",
        "time": "O(L)",
        "space": "O(1)",
        "steps": [
          "slow=fast=dummy",
          "fast 先走 n+1 步",
          "两者一起走到 fast=null",
          "令 slow.next=slow.next.next"
        ],
        "reason": "fast 与 slow 的距离固定，使 slow 停在待删节点的前驱。"
      }
    ],
    "frames": [
      {
        "note": "dummy帮助处理头节点。",
        "cells": [
          "D→1→2→3→4",
          "n=2"
        ]
      },
      {
        "note": "fast先走3步到3，slow仍在D。",
        "cells": [
          "slow:D",
          "fast:3"
        ]
      },
      {
        "note": "一起前进直到fast为空，slow停在2。",
        "cells": [
          "slow:2",
          "fast:null"
        ]
      },
      {
        "note": "将2.next从3改为4。",
        "cells": [
          "1→2→4"
        ]
      }
    ],
    "kind": "linked",
    "traceMethod": "固定间隔双指针",
    "tiers": [
      "初级",
      "进阶"
    ],
    "url": "https://leetcode.cn/problems/remove-nth-node-from-end-of-list/"
  },
  {
    "id": 24,
    "title": "两两交换链表中的节点",
    "slug": "swap-nodes-in-pairs",
    "level": "中等",
    "category": "链表",
    "summary": "把链表中每相邻两节点交换位置，不能只交换节点值。",
    "example": "1→2→3→4→5 → 2→1→4→3→5",
    "pitfall": "奇数个节点时最后一个不动，连接下一组前保存后继。",
    "methods": [
      {
        "name": "递归交换一组",
        "time": "O(n)",
        "space": "O(n)",
        "steps": [
          "不足两个节点直接返回",
          "a=head,b=head.next",
          "a.next=递归(b.next)",
          "b.next=a，返回 b"
        ],
        "reason": "每层处理两个节点，递归栈 O(n)。"
      },
      {
        "name": "哨兵迭代重连",
        "time": "O(n)",
        "space": "O(1)",
        "steps": [
          "prev=dummy",
          "令 a=prev.next,b=a.next",
          "a.next=b.next,b.next=a,prev.next=b",
          "prev=a 进入下一组"
        ],
        "reason": "每组固定次数改指针。"
      }
    ],
    "frames": [
      {
        "note": "第一组1与2。",
        "cells": [
          "D→1→2→3→4→5"
        ]
      },
      {
        "note": "1接向3，2接向1，D接向2。",
        "cells": [
          "D→2→1→3→4→5"
        ]
      },
      {
        "note": "前驱移动到1，交换3和4。",
        "cells": [
          "D→2→1→4→3→5"
        ]
      },
      {
        "note": "5不足一组，保持不动。",
        "cells": [
          "2→1→4→3→5"
        ]
      }
    ],
    "kind": "linked",
    "traceMethod": "哨兵迭代重连",
    "tiers": [
      "初级",
      "进阶"
    ],
    "url": "https://leetcode.cn/problems/swap-nodes-in-pairs/"
  },
  {
    "id": 25,
    "title": "K 个一组翻转链表",
    "slug": "reverse-nodes-in-k-group",
    "level": "困难",
    "category": "链表",
    "summary": "每 k 个节点为一组反转，最后不足 k 个的部分保持原状。",
    "example": "1→2→3→4→5，k=3 → 3→2→1→4→5",
    "pitfall": "先确认这一组有 k 个节点，不能把不足一组的尾部也翻转。",
    "methods": [
      {
        "name": "每组入栈再重连",
        "time": "O(n)",
        "space": "O(k)",
        "steps": [
          "查看接下来是否有 k 个节点",
          "完整一组入栈",
          "弹栈顺序重连",
          "剩余不足 k 项直接接回"
        ],
        "reason": "栈显式保存一组节点引用。"
      },
      {
        "name": "分组边界加局部反转",
        "time": "O(n)",
        "space": "O(1)",
        "steps": [
          "从组前驱寻找第 k 个节点 kth",
          "记 groupNext=kth.next",
          "以 groupNext 为 prev 反转组内指针",
          "连接组前驱并移到新组尾"
        ],
        "reason": "每个节点被定位和翻转常数次，dummy避免头部特判。"
      }
    ],
    "frames": [
      {
        "note": "k=3，先确认1,2,3完整。",
        "cells": [
          "D→[1→2→3]→4→5"
        ]
      },
      {
        "note": "记住下一组的起点4。",
        "cells": [
          "groupNext=4"
        ]
      },
      {
        "note": "反转这一组并连接。",
        "cells": [
          "D→3→2→1→4→5"
        ]
      },
      {
        "note": "下一组只有4,5，保持原状。",
        "cells": [
          "3→2→1→[4→5]"
        ]
      }
    ],
    "kind": "linked",
    "traceMethod": "分组边界加局部反转",
    "tiers": [
      "初级",
      "进阶"
    ],
    "url": "https://leetcode.cn/problems/reverse-nodes-in-k-group/"
  },
  {
    "id": 138,
    "title": "随机链表的复制",
    "slug": "copy-list-with-random-pointer",
    "level": "中等",
    "category": "链表",
    "summary": "复制带 next 和 random 指针的链表，要求新旧节点完全独立但连接关系相同。",
    "example": "a.next=b，a.random=b，b.random=a → a′、b′ 保留同样关系",
    "pitfall": "random 指向的必须是新节点，不能混入原链表节点。",
    "methods": [
      {
        "name": "旧节点到新节点的映射",
        "time": "O(n)",
        "space": "O(n)，输出另计",
        "steps": [
          "第一遍给每个旧节点创建新节点并存入 map",
          "第二遍通过 map 连接 next 和 random"
        ],
        "reason": "映射把指针翻译问题变成常数查询。"
      },
      {
        "name": "交织复制与拆分",
        "time": "O(n)",
        "space": "O(1)，输出 O(n)",
        "steps": [
          "把新节点插在每个旧节点后面",
          "copy.random=old.random.next（若非空）",
          "把交织链拆成旧链和新链并恢复旧链"
        ],
        "reason": "旧节点的 next 暂时兼任映射，最后必须还原。"
      }
    ],
    "frames": [
      {
        "note": "旧链a→b，random互指。",
        "cells": [
          "a ⇄random b",
          "next:a→b"
        ]
      },
      {
        "note": "在旧节点后插入副本。",
        "cells": [
          "a→a′→b→b′"
        ]
      },
      {
        "note": "a′.random=b.next=b′；b′.random=a′。",
        "cells": [
          "a′ ⇄random b′"
        ]
      },
      {
        "note": "拆分并恢复原链。",
        "cells": [
          "旧:a→b",
          "新:a′→b′"
        ]
      }
    ],
    "kind": "linked",
    "traceMethod": "交织复制与拆分",
    "tiers": [
      "初级",
      "进阶"
    ],
    "url": "https://leetcode.cn/problems/copy-list-with-random-pointer/"
  },
  {
    "id": 148,
    "title": "排序链表",
    "slug": "sort-list",
    "level": "中等",
    "category": "链表",
    "summary": "将无序单链表按节点值升序排列。",
    "example": "4→1→3→2 → 1→2→3→4",
    "pitfall": "归并时复用节点；寻找中点后断开前半段，否则递归无法缩小。",
    "methods": [
      {
        "name": "收集节点再排序",
        "time": "O(n log n)",
        "space": "O(n)",
        "steps": [
          "将所有节点引用放入数组",
          "按 val 排序",
          "按数组顺序重连并把末尾 next 置空"
        ],
        "reason": "数组提供随机访问，额外空间 O(n)。"
      },
      {
        "name": "自顶向下归并",
        "time": "O(n log n)",
        "space": "O(log n)",
        "steps": [
          "快慢指针分成两半并断开",
          "递归排序左右",
          "线性合并有序链"
        ],
        "reason": "每层 O(n)，层数 O(log n)，调用栈同样深度。"
      },
      {
        "name": "自底向上归并",
        "time": "O(n log n)",
        "space": "O(1)",
        "steps": [
          "先统计长度",
          "按1,2,4,8...长度切出相邻两段",
          "逐对归并并接回",
          "段长翻倍直到覆盖全链"
        ],
        "reason": "避免递归栈，用指针管理各段。"
      }
    ],
    "frames": [
      {
        "note": "段长1，按相邻节点合并。",
        "cells": [
          "4 | 1 | 3 | 2"
        ]
      },
      {
        "note": "得到两个长度2的有序段。",
        "cells": [
          "1→4",
          "2→3"
        ]
      },
      {
        "note": "段长2，两段一起归并。",
        "cells": [
          "选1",
          "再选2",
          "再选3",
          "最后4"
        ]
      },
      {
        "note": "整个链表已排序。",
        "cells": [
          "1→2→3→4"
        ]
      }
    ],
    "kind": "linked",
    "traceMethod": "自底向上归并",
    "tiers": [
      "初级",
      "进阶",
      "高阶"
    ],
    "url": "https://leetcode.cn/problems/sort-list/"
  },
  {
    "id": 23,
    "title": "合并 K 个升序链表",
    "slug": "merge-k-sorted-lists",
    "level": "困难",
    "category": "链表",
    "summary": "把 k 条有序链表合并成一条有序链表。",
    "example": "[1→4,2→5,3→6] → 1→2→3→4→5→6",
    "pitfall": "堆里只保留每条链当前头节点；相同值需要用序号打破比较歧义。",
    "methods": [
      {
        "name": "依次合并所有链",
        "time": "O(Nk)",
        "space": "O(1)",
        "steps": [
          "结果从空链开始",
          "逐条与当前结果合并"
        ],
        "reason": "N 是总节点数，已合并的大链可能被重复扫描 k 次。"
      },
      {
        "name": "小根堆选择下一节点",
        "time": "O(N log k)",
        "space": "O(k)",
        "steps": [
          "把各非空头节点放进小根堆",
          "弹出最小节点接到结果",
          "将该节点的 next 入堆",
          "直到堆空"
        ],
        "reason": "每个节点进出堆一次，堆大小最多 k。"
      },
      {
        "name": "分治两两归并",
        "time": "O(N log k)",
        "space": "O(log k)",
        "steps": [
          "把链表列表分成两半",
          "递归合并两半",
          "最后合并两个结果链"
        ],
        "reason": "每层扫描所有节点，层数 log k；合并过程迭代，空间为分治栈。"
      }
    ],
    "frames": [
      {
        "note": "堆里是三条链的头1、2、3。",
        "cells": [
          "heap:1,2,3"
        ]
      },
      {
        "note": "取1，补入同一条链后继4。",
        "cells": [
          "输出1",
          "heap:2,3,4"
        ]
      },
      {
        "note": "依次取2补5、取3补6。",
        "cells": [
          "输出1→2→3",
          "heap:4,5,6"
        ]
      },
      {
        "note": "继续弹出4、5、6。",
        "cells": [
          "1→2→3→4→5→6"
        ]
      }
    ],
    "kind": "heap",
    "traceMethod": "小根堆选择下一节点",
    "tiers": [
      "初级",
      "进阶",
      "高阶"
    ],
    "url": "https://leetcode.cn/problems/merge-k-sorted-lists/"
  },
  {
    "id": 146,
    "title": "LRU 缓存",
    "slug": "lru-cache",
    "level": "中等",
    "category": "链表",
    "summary": "实现固定容量缓存：读取与写入都更新最近使用顺序，满容量时淘汰最久未使用项。",
    "example": "容量2：put(A),put(B),get(A),put(C) → 淘汰B",
    "pitfall": "更新已有键也要移动到最近端；读取不存在的键不能改变顺序。",
    "methods": [
      {
        "name": "数组维护使用顺序",
        "time": "每次 O(C)",
        "space": "O(C)",
        "steps": [
          "查找键后移到数组尾部",
          "新键写到尾部",
          "超过容量则删除头部"
        ],
        "reason": "C 是容量，查找和移动可能线性。"
      },
      {
        "name": "哈希表加双向链表",
        "time": "每次期望 O(1)",
        "space": "O(C)",
        "steps": [
          "map 将键映射到节点",
          "get 或更新时摘下并接到最近端",
          "新增节点并记录 map",
          "满容量时删除最久端且删除 map 键"
        ],
        "reason": "哈希定位、双链表摘插均为常数操作；map与链表必须同步。"
      }
    ],
    "frames": [
      {
        "note": "容量2，左边最久，右边最近。",
        "cells": [
          "空缓存"
        ]
      },
      {
        "note": "写入A、B。",
        "cells": [
          "A → B"
        ]
      },
      {
        "note": "读取A，将A移到最近端。",
        "cells": [
          "B → A"
        ]
      },
      {
        "note": "写入C，淘汰最左侧B。",
        "cells": [
          "A → C",
          "淘汰B"
        ]
      }
    ],
    "kind": "linked",
    "traceMethod": "哈希表加双向链表",
    "tiers": [
      "初级",
      "进阶"
    ],
    "url": "https://leetcode.cn/problems/lru-cache/"
  },
  {
    "id": 94,
    "title": "二叉树的中序遍历",
    "slug": "binary-tree-inorder-traversal",
    "level": "简单",
    "category": "二叉树",
    "summary": "按左子树、根、右子树的顺序返回二叉树节点值。",
    "example": "树 2(左1,右3) → [1,2,3]",
    "pitfall": "入栈代表尚未访问；弹栈时才输出根，随后转入右子树。",
    "methods": [
      {
        "name": "递归中序",
        "time": "O(n)",
        "space": "O(h)，不含输出",
        "steps": [
          "visit(left)",
          "输出 node.val",
          "visit(right)",
          "空节点直接返回"
        ],
        "reason": "每个节点访问一次，调用栈等于树高 h。"
      },
      {
        "name": "显式栈",
        "time": "O(n)",
        "space": "O(h)，不含输出",
        "steps": [
          "沿左链逐个入栈",
          "弹出栈顶并输出",
          "转向其右孩子",
          "重复直到当前为空且栈空"
        ],
        "reason": "栈保存尚未输出的祖先，每个节点入栈出栈一次。"
      }
    ],
    "frames": [
      {
        "note": "从根2开始向左下降。",
        "cells": [
          "根2",
          "左1",
          "右3"
        ],
        "graph": {
          "nodes": [
            {
              "id": "r",
              "value": "2",
              "x": 220,
              "y": 35
            },
            {
              "id": "l",
              "value": "1",
              "x": 110,
              "y": 110
            },
            {
              "id": "q",
              "value": "3",
              "x": 330,
              "y": 110
            }
          ],
          "edges": [
            [
              "r",
              "l"
            ],
            [
              "r",
              "q"
            ]
          ],
          "active": [
            "r"
          ]
        }
      },
      {
        "note": "沿左链入栈。",
        "cells": [
          "栈底2",
          "栈顶1"
        ],
        "graph": {
          "nodes": [
            {
              "id": "r",
              "value": "2",
              "x": 220,
              "y": 35
            },
            {
              "id": "l",
              "value": "1",
              "x": 110,
              "y": 110
            },
            {
              "id": "q",
              "value": "3",
              "x": 330,
              "y": 110
            }
          ],
          "edges": [
            [
              "r",
              "l"
            ],
            [
              "r",
              "q"
            ]
          ],
          "active": [
            "r",
            "l"
          ]
        }
      },
      {
        "note": "弹出1再弹出2。",
        "cells": [
          "输出1 → 2",
          "当前=右孩子3"
        ],
        "graph": {
          "nodes": [
            {
              "id": "r",
              "value": "2",
              "x": 220,
              "y": 35
            },
            {
              "id": "l",
              "value": "1",
              "x": 110,
              "y": 110
            },
            {
              "id": "q",
              "value": "3",
              "x": 330,
              "y": 110
            }
          ],
          "edges": [
            [
              "r",
              "l"
            ],
            [
              "r",
              "q"
            ]
          ],
          "active": [
            "l",
            "r"
          ]
        }
      },
      {
        "note": "3入栈后弹出。",
        "cells": [
          "输出1 → 2 → 3"
        ],
        "graph": {
          "nodes": [
            {
              "id": "r",
              "value": "2",
              "x": 220,
              "y": 35
            },
            {
              "id": "l",
              "value": "1",
              "x": 110,
              "y": 110
            },
            {
              "id": "q",
              "value": "3",
              "x": 330,
              "y": 110
            }
          ],
          "edges": [
            [
              "r",
              "l"
            ],
            [
              "r",
              "q"
            ]
          ],
          "active": [
            "q"
          ]
        }
      }
    ],
    "kind": "linked",
    "traceMethod": "显式栈",
    "tiers": [
      "初级",
      "进阶"
    ],
    "url": "https://leetcode.cn/problems/binary-tree-inorder-traversal/"
  },
  {
    "id": 104,
    "title": "二叉树的最大深度",
    "slug": "maximum-depth-of-binary-tree",
    "level": "简单",
    "category": "二叉树",
    "summary": "求从根到最远叶子经过的节点数。",
    "example": "树 5(左2(左1),右8) → 3",
    "pitfall": "空树深度为0；节点数量与边数量相差1。",
    "methods": [
      {
        "name": "递归计算高度",
        "time": "O(n)",
        "space": "O(h)",
        "steps": [
          "空节点返回0",
          "计算左右深度",
          "返回 1+max(left,right)"
        ],
        "reason": "后序返回的是子树高度，每节点做常数工作。"
      },
      {
        "name": "逐层广度遍历",
        "time": "O(n)",
        "space": "O(w)",
        "steps": [
          "根入队",
          "每轮固定当前队列长度",
          "处理该层并把孩子入队",
          "层数加1"
        ],
        "reason": "w 是最大层宽，队列保存相邻层的节点。"
      }
    ],
    "frames": [
      {
        "note": "从根开始，层数0。",
        "cells": [
          "队列[5]"
        ],
        "graph": {
          "nodes": [
            {
              "id": "r",
              "value": "5",
              "x": 220,
              "y": 30
            },
            {
              "id": "l",
              "value": "2",
              "x": 110,
              "y": 100
            },
            {
              "id": "q",
              "value": "8",
              "x": 330,
              "y": 100
            },
            {
              "id": "a",
              "value": "1",
              "x": 55,
              "y": 170
            }
          ],
          "edges": [
            [
              "r",
              "l"
            ],
            [
              "r",
              "q"
            ],
            [
              "l",
              "a"
            ]
          ],
          "active": [
            "r"
          ]
        }
      },
      {
        "note": "第1层出队5。",
        "cells": [
          "第1层:5",
          "下一层:2,8"
        ],
        "graph": {
          "nodes": [
            {
              "id": "r",
              "value": "5",
              "x": 220,
              "y": 30
            },
            {
              "id": "l",
              "value": "2",
              "x": 110,
              "y": 100
            },
            {
              "id": "q",
              "value": "8",
              "x": 330,
              "y": 100
            },
            {
              "id": "a",
              "value": "1",
              "x": 55,
              "y": 170
            }
          ],
          "edges": [
            [
              "r",
              "l"
            ],
            [
              "r",
              "q"
            ],
            [
              "l",
              "a"
            ]
          ],
          "active": [
            "r"
          ]
        }
      },
      {
        "note": "第2层出队2与8。",
        "cells": [
          "第2层:2,8",
          "下一层:1"
        ],
        "graph": {
          "nodes": [
            {
              "id": "r",
              "value": "5",
              "x": 220,
              "y": 30
            },
            {
              "id": "l",
              "value": "2",
              "x": 110,
              "y": 100
            },
            {
              "id": "q",
              "value": "8",
              "x": 330,
              "y": 100
            },
            {
              "id": "a",
              "value": "1",
              "x": 55,
              "y": 170
            }
          ],
          "edges": [
            [
              "r",
              "l"
            ],
            [
              "r",
              "q"
            ],
            [
              "l",
              "a"
            ]
          ],
          "active": [
            "l",
            "q"
          ]
        }
      },
      {
        "note": "第3层出队1后队列空。",
        "cells": [
          "第3层:1",
          "深度=3"
        ],
        "graph": {
          "nodes": [
            {
              "id": "r",
              "value": "5",
              "x": 220,
              "y": 30
            },
            {
              "id": "l",
              "value": "2",
              "x": 110,
              "y": 100
            },
            {
              "id": "q",
              "value": "8",
              "x": 330,
              "y": 100
            },
            {
              "id": "a",
              "value": "1",
              "x": 55,
              "y": 170
            }
          ],
          "edges": [
            [
              "r",
              "l"
            ],
            [
              "r",
              "q"
            ],
            [
              "l",
              "a"
            ]
          ],
          "active": [
            "a"
          ]
        }
      }
    ],
    "kind": "queue",
    "traceMethod": "逐层广度遍历",
    "tiers": [
      "初级",
      "进阶"
    ],
    "url": "https://leetcode.cn/problems/maximum-depth-of-binary-tree/"
  },
  {
    "id": 226,
    "title": "翻转二叉树",
    "slug": "invert-binary-tree",
    "level": "简单",
    "category": "二叉树",
    "summary": "交换每个节点的左右子树，得到原树的镜像。",
    "example": "树 4(左2,右7) → 4(左7,右2)",
    "pitfall": "必须处理每个节点，不能只交换根的两个孩子。",
    "methods": [
      {
        "name": "递归交换",
        "time": "O(n)",
        "space": "O(h)",
        "steps": [
          "空节点返回",
          "交换 node.left 与 node.right",
          "递归处理两个孩子",
          "返回根"
        ],
        "reason": "每个节点进行一次交换，栈深 h。"
      },
      {
        "name": "队列逐层交换",
        "time": "O(n)",
        "space": "O(w)",
        "steps": [
          "根入队",
          "出队节点并交换左右孩子",
          "非空孩子入队",
          "直到队列为空"
        ],
        "reason": "每个节点出入队一次，最大队列与层宽同阶。"
      }
    ],
    "frames": [
      {
        "note": "原树。",
        "cells": [
          "4 → 左2 / 右7"
        ],
        "graph": {
          "nodes": [
            {
              "id": "r",
              "value": "4",
              "x": 220,
              "y": 35
            },
            {
              "id": "l",
              "value": "2",
              "x": 110,
              "y": 110
            },
            {
              "id": "q",
              "value": "7",
              "x": 330,
              "y": 110
            }
          ],
          "edges": [
            [
              "r",
              "l"
            ],
            [
              "r",
              "q"
            ]
          ],
          "active": [
            "r"
          ]
        }
      },
      {
        "note": "根4出队，交换两个引用。",
        "cells": [
          "4 → 左7 / 右2"
        ],
        "graph": {
          "nodes": [
            {
              "id": "r",
              "value": "4",
              "x": 220,
              "y": 35
            },
            {
              "id": "l",
              "value": "2",
              "x": 330,
              "y": 110
            },
            {
              "id": "q",
              "value": "7",
              "x": 110,
              "y": 110
            }
          ],
          "edges": [
            [
              "r",
              "l"
            ],
            [
              "r",
              "q"
            ]
          ],
          "active": [
            "r"
          ]
        }
      },
      {
        "note": "7出队，其空孩子交换不变。",
        "cells": [
          "已处理4,7",
          "队列[2]"
        ],
        "graph": {
          "nodes": [
            {
              "id": "r",
              "value": "4",
              "x": 220,
              "y": 35
            },
            {
              "id": "l",
              "value": "2",
              "x": 330,
              "y": 110
            },
            {
              "id": "q",
              "value": "7",
              "x": 110,
              "y": 110
            }
          ],
          "edges": [
            [
              "r",
              "l"
            ],
            [
              "r",
              "q"
            ]
          ],
          "active": [
            "q"
          ]
        }
      },
      {
        "note": "2也处理完，得到镜像。",
        "cells": [
          "4 → 左7 / 右2"
        ],
        "graph": {
          "nodes": [
            {
              "id": "r",
              "value": "4",
              "x": 220,
              "y": 35
            },
            {
              "id": "l",
              "value": "2",
              "x": 330,
              "y": 110
            },
            {
              "id": "q",
              "value": "7",
              "x": 110,
              "y": 110
            }
          ],
          "edges": [
            [
              "r",
              "l"
            ],
            [
              "r",
              "q"
            ]
          ],
          "active": [
            "l"
          ]
        }
      }
    ],
    "kind": "linked",
    "traceMethod": "队列逐层交换",
    "tiers": [
      "初级",
      "进阶"
    ],
    "url": "https://leetcode.cn/problems/invert-binary-tree/"
  },
  {
    "id": 101,
    "title": "对称二叉树",
    "slug": "symmetric-tree",
    "level": "简单",
    "category": "二叉树",
    "summary": "判断一棵树沿根的中轴翻转后，结构和值是否保持一致。",
    "example": "根1，左2(左3)，右2(右3) → true",
    "pitfall": "镜像比较是左对右、右对左；相同前序值并不足以保证结构对称。",
    "methods": [
      {
        "name": "递归比较镜像对",
        "time": "O(n)",
        "space": "O(h)",
        "steps": [
          "两节点都空返回true",
          "仅一个为空或值不同返回false",
          "同时检查 a.left 对 b.right 与 a.right 对 b.left"
        ],
        "reason": "递归直接表达镜像定义。"
      },
      {
        "name": "队列存节点对",
        "time": "O(n)",
        "space": "O(w)",
        "steps": [
          "将根的左右孩子作为一对入队",
          "每次检查空与值",
          "将外侧一对和内侧一对入队",
          "全部通过返回true"
        ],
        "reason": "始终成对处理，避免丢失结构信息。"
      }
    ],
    "frames": [
      {
        "note": "取根的左右孩子。",
        "cells": [
          "左2 ↔ 右2"
        ],
        "graph": {
          "nodes": [
            {
              "id": "r",
              "value": "1",
              "x": 220,
              "y": 30
            },
            {
              "id": "l",
              "value": "2",
              "x": 110,
              "y": 100
            },
            {
              "id": "q",
              "value": "2",
              "x": 330,
              "y": 100
            },
            {
              "id": "a",
              "value": "3",
              "x": 55,
              "y": 170
            },
            {
              "id": "b",
              "value": "3",
              "x": 385,
              "y": 170
            }
          ],
          "edges": [
            [
              "r",
              "l"
            ],
            [
              "r",
              "q"
            ],
            [
              "l",
              "a"
            ],
            [
              "q",
              "b"
            ]
          ],
          "active": [
            "l",
            "q"
          ]
        }
      },
      {
        "note": "值相等，比较外侧。",
        "cells": [
          "左侧的左3 ↔ 右侧的右3"
        ],
        "graph": {
          "nodes": [
            {
              "id": "r",
              "value": "1",
              "x": 220,
              "y": 30
            },
            {
              "id": "l",
              "value": "2",
              "x": 110,
              "y": 100
            },
            {
              "id": "q",
              "value": "2",
              "x": 330,
              "y": 100
            },
            {
              "id": "a",
              "value": "3",
              "x": 55,
              "y": 170
            },
            {
              "id": "b",
              "value": "3",
              "x": 385,
              "y": 170
            }
          ],
          "edges": [
            [
              "r",
              "l"
            ],
            [
              "r",
              "q"
            ],
            [
              "l",
              "a"
            ],
            [
              "q",
              "b"
            ]
          ],
          "active": [
            "a",
            "b"
          ]
        }
      },
      {
        "note": "比较内侧，均为空。",
        "cells": [
          "null ↔ null"
        ],
        "graph": {
          "nodes": [
            {
              "id": "r",
              "value": "1",
              "x": 220,
              "y": 30
            },
            {
              "id": "l",
              "value": "2",
              "x": 110,
              "y": 100
            },
            {
              "id": "q",
              "value": "2",
              "x": 330,
              "y": 100
            },
            {
              "id": "a",
              "value": "3",
              "x": 55,
              "y": 170
            },
            {
              "id": "b",
              "value": "3",
              "x": 385,
              "y": 170
            }
          ],
          "edges": [
            [
              "r",
              "l"
            ],
            [
              "r",
              "q"
            ],
            [
              "l",
              "a"
            ],
            [
              "q",
              "b"
            ]
          ],
          "active": [
            "l",
            "q"
          ]
        }
      },
      {
        "note": "3的孩子也成对为空。",
        "cells": [
          "所有镜像对匹配",
          "true"
        ],
        "graph": {
          "nodes": [
            {
              "id": "r",
              "value": "1",
              "x": 220,
              "y": 30
            },
            {
              "id": "l",
              "value": "2",
              "x": 110,
              "y": 100
            },
            {
              "id": "q",
              "value": "2",
              "x": 330,
              "y": 100
            },
            {
              "id": "a",
              "value": "3",
              "x": 55,
              "y": 170
            },
            {
              "id": "b",
              "value": "3",
              "x": 385,
              "y": 170
            }
          ],
          "edges": [
            [
              "r",
              "l"
            ],
            [
              "r",
              "q"
            ],
            [
              "l",
              "a"
            ],
            [
              "q",
              "b"
            ]
          ],
          "active": [
            "a",
            "b"
          ]
        }
      }
    ],
    "kind": "linked",
    "traceMethod": "队列存节点对",
    "tiers": [
      "初级",
      "进阶"
    ],
    "url": "https://leetcode.cn/problems/symmetric-tree/"
  },
  {
    "id": 543,
    "title": "二叉树的直径",
    "slug": "diameter-of-binary-tree",
    "level": "简单",
    "category": "二叉树",
    "summary": "求二叉树中任意两节点间最长简单路径的边数，路径不必经过根。",
    "example": "树1(左2(左4,右5),右3) → 3条边",
    "pitfall": "高度按节点计数时，穿过当前点的边数正好是 leftHeight+rightHeight。",
    "methods": [
      {
        "name": "逐节点重算高度",
        "time": "O(n²)",
        "space": "O(h)",
        "steps": [
          "对每个节点计算左右子树高度",
          "用左右高度和更新答案",
          "继续遍历所有节点"
        ],
        "reason": "退化链上大量高度被重复计算。"
      },
      {
        "name": "一次后序合并",
        "time": "O(n)",
        "space": "O(h)",
        "steps": [
          "空节点高度0",
          "后序取得 L,R",
          "ans=max(ans,L+R)",
          "向父节点返回1+max(L,R)"
        ],
        "reason": "答案可用两支，向上传递只能选一支。"
      }
    ],
    "frames": [
      {
        "note": "叶4、5、3的高度均为1。",
        "cells": [
          "h(4)=1",
          "h(5)=1",
          "h(3)=1"
        ],
        "graph": {
          "nodes": [
            {
              "id": "r",
              "value": "1",
              "x": 220,
              "y": 30
            },
            {
              "id": "l",
              "value": "2",
              "x": 110,
              "y": 100
            },
            {
              "id": "q",
              "value": "3",
              "x": 330,
              "y": 100
            },
            {
              "id": "a",
              "value": "4",
              "x": 55,
              "y": 170
            },
            {
              "id": "b",
              "value": "5",
              "x": 165,
              "y": 170
            }
          ],
          "edges": [
            [
              "r",
              "l"
            ],
            [
              "r",
              "q"
            ],
            [
              "l",
              "a"
            ],
            [
              "l",
              "b"
            ]
          ],
          "active": [
            "a",
            "b",
            "q"
          ]
        }
      },
      {
        "note": "节点2合并两支。",
        "cells": [
          "L=1,R=1",
          "直径候选2",
          "h(2)=2"
        ],
        "graph": {
          "nodes": [
            {
              "id": "r",
              "value": "1",
              "x": 220,
              "y": 30
            },
            {
              "id": "l",
              "value": "2",
              "x": 110,
              "y": 100
            },
            {
              "id": "q",
              "value": "3",
              "x": 330,
              "y": 100
            },
            {
              "id": "a",
              "value": "4",
              "x": 55,
              "y": 170
            },
            {
              "id": "b",
              "value": "5",
              "x": 165,
              "y": 170
            }
          ],
          "edges": [
            [
              "r",
              "l"
            ],
            [
              "r",
              "q"
            ],
            [
              "l",
              "a"
            ],
            [
              "l",
              "b"
            ]
          ],
          "active": [
            "l",
            "a",
            "b"
          ]
        }
      },
      {
        "note": "根1合并。",
        "cells": [
          "L=2,R=1",
          "候选3"
        ],
        "graph": {
          "nodes": [
            {
              "id": "r",
              "value": "1",
              "x": 220,
              "y": 30
            },
            {
              "id": "l",
              "value": "2",
              "x": 110,
              "y": 100
            },
            {
              "id": "q",
              "value": "3",
              "x": 330,
              "y": 100
            },
            {
              "id": "a",
              "value": "4",
              "x": 55,
              "y": 170
            },
            {
              "id": "b",
              "value": "5",
              "x": 165,
              "y": 170
            }
          ],
          "edges": [
            [
              "r",
              "l"
            ],
            [
              "r",
              "q"
            ],
            [
              "l",
              "a"
            ],
            [
              "l",
              "b"
            ]
          ],
          "active": [
            "r",
            "l",
            "q"
          ]
        }
      },
      {
        "note": "路径4→2→1→3共有3条边。",
        "cells": [
          "4 → 2 → 1 → 3",
          "答案3"
        ],
        "graph": {
          "nodes": [
            {
              "id": "r",
              "value": "1",
              "x": 220,
              "y": 30
            },
            {
              "id": "l",
              "value": "2",
              "x": 110,
              "y": 100
            },
            {
              "id": "q",
              "value": "3",
              "x": 330,
              "y": 100
            },
            {
              "id": "a",
              "value": "4",
              "x": 55,
              "y": 170
            },
            {
              "id": "b",
              "value": "5",
              "x": 165,
              "y": 170
            }
          ],
          "edges": [
            [
              "r",
              "l"
            ],
            [
              "r",
              "q"
            ],
            [
              "l",
              "a"
            ],
            [
              "l",
              "b"
            ]
          ],
          "active": [
            "a",
            "l",
            "r",
            "q"
          ]
        }
      }
    ],
    "kind": "linked",
    "traceMethod": "一次后序合并",
    "tiers": [
      "初级",
      "进阶"
    ],
    "url": "https://leetcode.cn/problems/diameter-of-binary-tree/"
  },
  {
    "id": 102,
    "title": "二叉树的层序遍历",
    "slug": "binary-tree-level-order-traversal",
    "level": "中等",
    "category": "二叉树",
    "summary": "把二叉树按从上到下、同层从左到右分组返回。",
    "example": "树6(左3,右9(左8)) → [[6],[3,9],[8]]",
    "pitfall": "每一层开始时固定队列长度，避免把下一层也混入当前层。",
    "methods": [
      {
        "name": "DFS按深度归组",
        "time": "O(n)",
        "space": "O(h)，不含输出",
        "steps": [
          "dfs(node,depth)",
          "把节点值追加到 result[depth]",
          "先左后右递归 depth+1"
        ],
        "reason": "深度作为分组键；先左保证同层顺序。"
      },
      {
        "name": "BFS按层出队",
        "time": "O(n)",
        "space": "O(w)，不含输出",
        "steps": [
          "根入队",
          "记录 size=queue.length",
          "取出恰好size个节点构成本层",
          "孩子按左后右入队"
        ],
        "reason": "队列顺序天然匹配层序。"
      }
    ],
    "frames": [
      {
        "note": "队列初始化。",
        "cells": [
          "[6]"
        ],
        "graph": {
          "nodes": [
            {
              "id": "r",
              "value": "6",
              "x": 220,
              "y": 30
            },
            {
              "id": "l",
              "value": "3",
              "x": 110,
              "y": 100
            },
            {
              "id": "q",
              "value": "9",
              "x": 330,
              "y": 100
            },
            {
              "id": "a",
              "value": "8",
              "x": 275,
              "y": 170
            }
          ],
          "edges": [
            [
              "r",
              "l"
            ],
            [
              "r",
              "q"
            ],
            [
              "q",
              "a"
            ]
          ],
          "active": [
            "r"
          ]
        }
      },
      {
        "note": "固定size=1，只处理根。",
        "cells": [
          "本层[6]",
          "新队列[3,9]"
        ],
        "graph": {
          "nodes": [
            {
              "id": "r",
              "value": "6",
              "x": 220,
              "y": 30
            },
            {
              "id": "l",
              "value": "3",
              "x": 110,
              "y": 100
            },
            {
              "id": "q",
              "value": "9",
              "x": 330,
              "y": 100
            },
            {
              "id": "a",
              "value": "8",
              "x": 275,
              "y": 170
            }
          ],
          "edges": [
            [
              "r",
              "l"
            ],
            [
              "r",
              "q"
            ],
            [
              "q",
              "a"
            ]
          ],
          "active": [
            "r"
          ]
        }
      },
      {
        "note": "固定size=2，处理3与9。",
        "cells": [
          "本层[3,9]",
          "新队列[8]"
        ],
        "graph": {
          "nodes": [
            {
              "id": "r",
              "value": "6",
              "x": 220,
              "y": 30
            },
            {
              "id": "l",
              "value": "3",
              "x": 110,
              "y": 100
            },
            {
              "id": "q",
              "value": "9",
              "x": 330,
              "y": 100
            },
            {
              "id": "a",
              "value": "8",
              "x": 275,
              "y": 170
            }
          ],
          "edges": [
            [
              "r",
              "l"
            ],
            [
              "r",
              "q"
            ],
            [
              "q",
              "a"
            ]
          ],
          "active": [
            "l",
            "q"
          ]
        }
      },
      {
        "note": "最后处理8。",
        "cells": [
          "[[6],[3,9],[8]]"
        ],
        "graph": {
          "nodes": [
            {
              "id": "r",
              "value": "6",
              "x": 220,
              "y": 30
            },
            {
              "id": "l",
              "value": "3",
              "x": 110,
              "y": 100
            },
            {
              "id": "q",
              "value": "9",
              "x": 330,
              "y": 100
            },
            {
              "id": "a",
              "value": "8",
              "x": 275,
              "y": 170
            }
          ],
          "edges": [
            [
              "r",
              "l"
            ],
            [
              "r",
              "q"
            ],
            [
              "q",
              "a"
            ]
          ],
          "active": [
            "a"
          ]
        }
      }
    ],
    "kind": "queue",
    "traceMethod": "BFS按层出队",
    "tiers": [
      "初级",
      "进阶"
    ],
    "url": "https://leetcode.cn/problems/binary-tree-level-order-traversal/"
  },
  {
    "id": 108,
    "title": "将有序数组转换为二叉搜索树",
    "slug": "convert-sorted-array-to-binary-search-tree",
    "level": "简单",
    "category": "二叉树",
    "summary": "把严格递增数组转换成左右子树高度差至多1的二叉搜索树。",
    "example": "[1,3,5,7,9] → 根5，左右各由两元素构树",
    "pitfall": "偶数长度可选任一中点，因此答案可能不唯一。",
    "methods": [
      {
        "name": "切片递归",
        "time": "O(n log n)",
        "space": "O(n)",
        "steps": [
          "取中点作为根",
          "左右切片各递归建树",
          "接回左右孩子"
        ],
        "reason": "每层切片总量 O(n)，共 log n 层；不含输出树时峰值切片 O(n)。"
      },
      {
        "name": "区间索引递归",
        "time": "O(n)",
        "space": "O(log n)，不含输出树",
        "steps": [
          "build(l,r)，l>r返回空",
          "mid=floor((l+r)/2)",
          "根取nums[mid]",
          "递归[l,mid-1]与[mid+1,r]"
        ],
        "reason": "用索引代替切片，每元素建一个节点。"
      }
    ],
    "frames": [
      {
        "note": "完整区间[0,4]。",
        "cells": [
          "1",
          "3",
          "[5]",
          "7",
          "9"
        ],
        "graph": {
          "nodes": [
            {
              "id": "r",
              "value": "5",
              "x": 220,
              "y": 30
            }
          ],
          "edges": [],
          "active": [
            "r"
          ]
        }
      },
      {
        "note": "5作为根，区间一分为二。",
        "cells": [
          "左[1,3]",
          "根5",
          "右[7,9]"
        ],
        "graph": {
          "nodes": [
            {
              "id": "r",
              "value": "5",
              "x": 220,
              "y": 30
            }
          ],
          "edges": [],
          "active": [
            "r"
          ]
        }
      },
      {
        "note": "左区间取1、右区间取7。",
        "cells": [
          "5 → 左1 / 右7"
        ],
        "graph": {
          "nodes": [
            {
              "id": "r",
              "value": "5",
              "x": 220,
              "y": 30
            },
            {
              "id": "l",
              "value": "1",
              "x": 110,
              "y": 100
            },
            {
              "id": "q",
              "value": "7",
              "x": 330,
              "y": 100
            }
          ],
          "edges": [
            [
              "r",
              "l"
            ],
            [
              "r",
              "q"
            ]
          ],
          "active": [
            "l",
            "q"
          ]
        }
      },
      {
        "note": "各剩余值接到右侧。",
        "cells": [
          "1 → 右3",
          "7 → 右9",
          "平衡高度3"
        ],
        "graph": {
          "nodes": [
            {
              "id": "r",
              "value": "5",
              "x": 220,
              "y": 30
            },
            {
              "id": "l",
              "value": "1",
              "x": 110,
              "y": 100
            },
            {
              "id": "q",
              "value": "7",
              "x": 330,
              "y": 100
            },
            {
              "id": "a",
              "value": "3",
              "x": 165,
              "y": 170
            },
            {
              "id": "b",
              "value": "9",
              "x": 385,
              "y": 170
            }
          ],
          "edges": [
            [
              "r",
              "l"
            ],
            [
              "r",
              "q"
            ],
            [
              "l",
              "a"
            ],
            [
              "q",
              "b"
            ]
          ],
          "active": [
            "a",
            "b"
          ]
        }
      }
    ],
    "kind": "linked",
    "traceMethod": "区间索引递归",
    "tiers": [
      "初级",
      "进阶"
    ],
    "url": "https://leetcode.cn/problems/convert-sorted-array-to-binary-search-tree/"
  },
  {
    "id": 98,
    "title": "验证二叉搜索树",
    "slug": "validate-binary-search-tree",
    "level": "中等",
    "category": "二叉树",
    "summary": "检查二叉树是否满足每个节点左侧所有值更小、右侧所有值更大。",
    "example": "根5，左3，右8(左4) → false",
    "pitfall": "只比较父子值不够；右子树中的4也必须大于根5。",
    "methods": [
      {
        "name": "逐节点检查整棵子树",
        "time": "O(n²)",
        "space": "O(h)",
        "steps": [
          "每个节点扫描左子树最大值与右子树最小值",
          "验证严格不等式",
          "递归验证两个子树"
        ],
        "reason": "退化树会重复扫描子树。"
      },
      {
        "name": "递归传递开区间",
        "time": "O(n)",
        "space": "O(h)",
        "steps": [
          "根允许范围(-∞,+∞)",
          "要求 low<val<high",
          "左孩子范围(low,val)",
          "右孩子范围(val,high)"
        ],
        "reason": "祖先约束随区间传递，重复值会被严格不等式拒绝。"
      }
    ],
    "frames": [
      {
        "note": "根5允许任意值。",
        "cells": [
          "5 ∈ (-∞,+∞)"
        ],
        "graph": {
          "nodes": [
            {
              "id": "r",
              "value": "5",
              "x": 220,
              "y": 30
            },
            {
              "id": "l",
              "value": "3",
              "x": 110,
              "y": 100
            },
            {
              "id": "q",
              "value": "8",
              "x": 330,
              "y": 100
            },
            {
              "id": "a",
              "value": "4",
              "x": 275,
              "y": 170
            }
          ],
          "edges": [
            [
              "r",
              "l"
            ],
            [
              "r",
              "q"
            ],
            [
              "q",
              "a"
            ]
          ],
          "active": [
            "r"
          ]
        }
      },
      {
        "note": "左3满足限制。",
        "cells": [
          "3 ∈ (-∞,5)"
        ],
        "graph": {
          "nodes": [
            {
              "id": "r",
              "value": "5",
              "x": 220,
              "y": 30
            },
            {
              "id": "l",
              "value": "3",
              "x": 110,
              "y": 100
            },
            {
              "id": "q",
              "value": "8",
              "x": 330,
              "y": 100
            },
            {
              "id": "a",
              "value": "4",
              "x": 275,
              "y": 170
            }
          ],
          "edges": [
            [
              "r",
              "l"
            ],
            [
              "r",
              "q"
            ],
            [
              "q",
              "a"
            ]
          ],
          "active": [
            "l"
          ]
        }
      },
      {
        "note": "右8满足限制。",
        "cells": [
          "8 ∈ (5,+∞)"
        ],
        "graph": {
          "nodes": [
            {
              "id": "r",
              "value": "5",
              "x": 220,
              "y": 30
            },
            {
              "id": "l",
              "value": "3",
              "x": 110,
              "y": 100
            },
            {
              "id": "q",
              "value": "8",
              "x": 330,
              "y": 100
            },
            {
              "id": "a",
              "value": "4",
              "x": 275,
              "y": 170
            }
          ],
          "edges": [
            [
              "r",
              "l"
            ],
            [
              "r",
              "q"
            ],
            [
              "q",
              "a"
            ]
          ],
          "active": [
            "q"
          ]
        }
      },
      {
        "note": "8的左孩子4仍受根5约束。",
        "cells": [
          "4 ∉ (5,8)",
          "false"
        ],
        "graph": {
          "nodes": [
            {
              "id": "r",
              "value": "5",
              "x": 220,
              "y": 30
            },
            {
              "id": "l",
              "value": "3",
              "x": 110,
              "y": 100
            },
            {
              "id": "q",
              "value": "8",
              "x": 330,
              "y": 100
            },
            {
              "id": "a",
              "value": "4",
              "x": 275,
              "y": 170
            }
          ],
          "edges": [
            [
              "r",
              "l"
            ],
            [
              "r",
              "q"
            ],
            [
              "q",
              "a"
            ]
          ],
          "active": [
            "a"
          ]
        }
      }
    ],
    "kind": "interval",
    "traceMethod": "递归传递开区间",
    "tiers": [
      "初级",
      "进阶"
    ],
    "url": "https://leetcode.cn/problems/validate-binary-search-tree/"
  },
  {
    "id": 230,
    "title": "二叉搜索树中第 K 小的元素",
    "slug": "kth-smallest-element-in-a-bst",
    "level": "中等",
    "category": "二叉树",
    "summary": "给定二叉搜索树，返回按升序排列后的第k个值，k从1开始。",
    "example": "BST根4(左2(左1,右3),右6)，k=3 → 3",
    "pitfall": "只有BST的中序序列保证递增；k是名次而非数组下标。",
    "methods": [
      {
        "name": "完整中序数组",
        "time": "O(n)",
        "space": "O(n)",
        "steps": [
          "中序遍历得到升序数组",
          "返回arr[k-1]"
        ],
        "reason": "存下全部节点后直接索引。"
      },
      {
        "name": "迭代中序提前停止",
        "time": "O(h+k)",
        "space": "O(h)",
        "steps": [
          "沿左链入栈",
          "弹出一个节点，k减1",
          "k=0时返回值",
          "否则转右并重复"
        ],
        "reason": "先走至最小节点，再取出前k个；最坏仍 O(n)。"
      }
    ],
    "frames": [
      {
        "note": "沿左链入栈4,2,1。",
        "cells": [
          "栈[4,2,1]",
          "k=3"
        ],
        "graph": {
          "nodes": [
            {
              "id": "r",
              "value": "4",
              "x": 220,
              "y": 30
            },
            {
              "id": "l",
              "value": "2",
              "x": 110,
              "y": 100
            },
            {
              "id": "q",
              "value": "6",
              "x": 330,
              "y": 100
            },
            {
              "id": "a",
              "value": "1",
              "x": 55,
              "y": 170
            },
            {
              "id": "b",
              "value": "3",
              "x": 165,
              "y": 170
            }
          ],
          "edges": [
            [
              "r",
              "l"
            ],
            [
              "r",
              "q"
            ],
            [
              "l",
              "a"
            ],
            [
              "l",
              "b"
            ]
          ],
          "active": [
            "r",
            "l",
            "a"
          ]
        }
      },
      {
        "note": "弹出1。",
        "cells": [
          "第1小=1",
          "k=2"
        ],
        "graph": {
          "nodes": [
            {
              "id": "r",
              "value": "4",
              "x": 220,
              "y": 30
            },
            {
              "id": "l",
              "value": "2",
              "x": 110,
              "y": 100
            },
            {
              "id": "q",
              "value": "6",
              "x": 330,
              "y": 100
            },
            {
              "id": "a",
              "value": "1",
              "x": 55,
              "y": 170
            },
            {
              "id": "b",
              "value": "3",
              "x": 165,
              "y": 170
            }
          ],
          "edges": [
            [
              "r",
              "l"
            ],
            [
              "r",
              "q"
            ],
            [
              "l",
              "a"
            ],
            [
              "l",
              "b"
            ]
          ],
          "active": [
            "a"
          ]
        }
      },
      {
        "note": "弹出2并把右孩子3入栈。",
        "cells": [
          "第2小=2",
          "栈[4,3]"
        ],
        "graph": {
          "nodes": [
            {
              "id": "r",
              "value": "4",
              "x": 220,
              "y": 30
            },
            {
              "id": "l",
              "value": "2",
              "x": 110,
              "y": 100
            },
            {
              "id": "q",
              "value": "6",
              "x": 330,
              "y": 100
            },
            {
              "id": "a",
              "value": "1",
              "x": 55,
              "y": 170
            },
            {
              "id": "b",
              "value": "3",
              "x": 165,
              "y": 170
            }
          ],
          "edges": [
            [
              "r",
              "l"
            ],
            [
              "r",
              "q"
            ],
            [
              "l",
              "a"
            ],
            [
              "l",
              "b"
            ]
          ],
          "active": [
            "l"
          ]
        }
      },
      {
        "note": "弹出3，立即返回。",
        "cells": [
          "第3小=3"
        ],
        "graph": {
          "nodes": [
            {
              "id": "r",
              "value": "4",
              "x": 220,
              "y": 30
            },
            {
              "id": "l",
              "value": "2",
              "x": 110,
              "y": 100
            },
            {
              "id": "q",
              "value": "6",
              "x": 330,
              "y": 100
            },
            {
              "id": "a",
              "value": "1",
              "x": 55,
              "y": 170
            },
            {
              "id": "b",
              "value": "3",
              "x": 165,
              "y": 170
            }
          ],
          "edges": [
            [
              "r",
              "l"
            ],
            [
              "r",
              "q"
            ],
            [
              "l",
              "a"
            ],
            [
              "l",
              "b"
            ]
          ],
          "active": [
            "b"
          ]
        }
      }
    ],
    "kind": "linked",
    "traceMethod": "迭代中序提前停止",
    "tiers": [
      "初级",
      "进阶"
    ],
    "url": "https://leetcode.cn/problems/kth-smallest-element-in-a-bst/"
  },
  {
    "id": 199,
    "title": "二叉树的右视图",
    "slug": "binary-tree-right-side-view",
    "level": "中等",
    "category": "二叉树",
    "summary": "站在二叉树右侧，每层只看见最靠右的一个节点，返回这些节点值。",
    "example": "树1(左2(右5),右3) → [1,3,5]",
    "pitfall": "右侧视图不等于一直沿右孩子走；更深处可能来自左子树。",
    "methods": [
      {
        "name": "BFS取每层末尾",
        "time": "O(n)",
        "space": "O(w)",
        "steps": [
          "逐层遍历",
          "将本层最后出队的值加入答案",
          "左孩子先入队、右孩子后入队"
        ],
        "reason": "每层末尾即最右节点。"
      },
      {
        "name": "右优先DFS",
        "time": "O(n)",
        "space": "O(h)",
        "steps": [
          "先访问当前节点",
          "若depth等于答案长度则记录",
          "递归右孩子，再递归左孩子"
        ],
        "reason": "同一深度第一次访问的就是最右节点；宽树时省队列空间。"
      }
    ],
    "frames": [
      {
        "note": "右优先访问根。",
        "cells": [
          "depth0 → 1"
        ],
        "graph": {
          "nodes": [
            {
              "id": "r",
              "value": "1",
              "x": 220,
              "y": 30
            },
            {
              "id": "l",
              "value": "2",
              "x": 110,
              "y": 100
            },
            {
              "id": "q",
              "value": "3",
              "x": 330,
              "y": 100
            },
            {
              "id": "a",
              "value": "5",
              "x": 165,
              "y": 170
            }
          ],
          "edges": [
            [
              "r",
              "l"
            ],
            [
              "r",
              "q"
            ],
            [
              "l",
              "a"
            ]
          ],
          "active": [
            "r"
          ]
        }
      },
      {
        "note": "先进入右孩子3。",
        "cells": [
          "depth1 → 3"
        ],
        "graph": {
          "nodes": [
            {
              "id": "r",
              "value": "1",
              "x": 220,
              "y": 30
            },
            {
              "id": "l",
              "value": "2",
              "x": 110,
              "y": 100
            },
            {
              "id": "q",
              "value": "3",
              "x": 330,
              "y": 100
            },
            {
              "id": "a",
              "value": "5",
              "x": 165,
              "y": 170
            }
          ],
          "edges": [
            [
              "r",
              "l"
            ],
            [
              "r",
              "q"
            ],
            [
              "l",
              "a"
            ]
          ],
          "active": [
            "q"
          ]
        }
      },
      {
        "note": "回到左孩子2，同深度已有记录。",
        "cells": [
          "depth1 的2跳过"
        ],
        "graph": {
          "nodes": [
            {
              "id": "r",
              "value": "1",
              "x": 220,
              "y": 30
            },
            {
              "id": "l",
              "value": "2",
              "x": 110,
              "y": 100
            },
            {
              "id": "q",
              "value": "3",
              "x": 330,
              "y": 100
            },
            {
              "id": "a",
              "value": "5",
              "x": 165,
              "y": 170
            }
          ],
          "edges": [
            [
              "r",
              "l"
            ],
            [
              "r",
              "q"
            ],
            [
              "l",
              "a"
            ]
          ],
          "active": [
            "l"
          ]
        }
      },
      {
        "note": "2的右孩子5在新深度首次出现。",
        "cells": [
          "depth2 → 5",
          "[1,3,5]"
        ],
        "graph": {
          "nodes": [
            {
              "id": "r",
              "value": "1",
              "x": 220,
              "y": 30
            },
            {
              "id": "l",
              "value": "2",
              "x": 110,
              "y": 100
            },
            {
              "id": "q",
              "value": "3",
              "x": 330,
              "y": 100
            },
            {
              "id": "a",
              "value": "5",
              "x": 165,
              "y": 170
            }
          ],
          "edges": [
            [
              "r",
              "l"
            ],
            [
              "r",
              "q"
            ],
            [
              "l",
              "a"
            ]
          ],
          "active": [
            "a"
          ]
        }
      }
    ],
    "kind": "linked",
    "traceMethod": "右优先DFS",
    "tiers": [
      "初级",
      "进阶"
    ],
    "url": "https://leetcode.cn/problems/binary-tree-right-side-view/"
  },
  {
    "id": 114,
    "title": "二叉树展开为链表",
    "slug": "flatten-binary-tree-to-linked-list",
    "level": "中等",
    "category": "二叉树",
    "summary": "原地把二叉树改成仅使用右指针的链，节点顺序等于原树前序遍历。",
    "example": "树1(左2(左3),右4) → 1→2→3→4",
    "pitfall": "连接右链前先保留原右子树，否则会丢节点；最终所有left都应为空。",
    "methods": [
      {
        "name": "保存前序序列再连接",
        "time": "O(n)",
        "space": "O(n)",
        "steps": [
          "前序收集节点引用",
          "依次把left置空、right接下一个",
          "末节点right置空"
        ],
        "reason": "不新建树节点，但节点数组需要 O(n)。"
      },
      {
        "name": "寻找左子树最右节点",
        "time": "O(n)",
        "space": "O(1)",
        "steps": [
          "当前节点有左子树时，找到左子树最右节点",
          "把原右子树接在该节点右侧",
          "当前right改为left并清空left",
          "沿right前进"
        ],
        "reason": "左子树先整体插入，再逐步展开；寻找前驱的边遍历可摊还为线性。"
      }
    ],
    "frames": [
      {
        "note": "原前序为1,2,3,4。",
        "cells": [
          "1 → 左2 / 右4",
          "2 → 左3"
        ]
      },
      {
        "note": "1的左子树最右点为2，将4接到2右。",
        "cells": [
          "2 → 左3 / 右4"
        ]
      },
      {
        "note": "1的left清空，right改为2。",
        "cells": [
          "1 → 2",
          "2 → 左3 / 右4"
        ]
      },
      {
        "note": "在2处同样把3插入4之前。",
        "cells": [
          "1 → 2 → 3 → 4"
        ]
      }
    ],
    "kind": "linked",
    "traceMethod": "寻找左子树最右节点",
    "tiers": [
      "初级",
      "进阶"
    ],
    "url": "https://leetcode.cn/problems/flatten-binary-tree-to-linked-list/"
  },
  {
    "id": 105,
    "title": "从前序与中序遍历序列构造二叉树",
    "slug": "construct-binary-tree-from-preorder-and-inorder-traversal",
    "level": "中等",
    "category": "二叉树",
    "summary": "根据节点值不重复的前序和中序序列重建二叉树。",
    "example": "前序[4,2,1,6]，中序[1,2,4,6] → 根4",
    "pitfall": "前序首项确定根，中序根的位置确定左右子树大小；不能按值大小划分普通树。",
    "methods": [
      {
        "name": "扫描中序并切片",
        "time": "O(n²)",
        "space": "O(n²)，退化时切片峰值",
        "steps": [
          "前序首项为根",
          "在中序查找根位置",
          "按左子树长度切开两组序列",
          "分别递归构建"
        ],
        "reason": "退化树反复扫描、复制长数组，保留的递归切片可能达平方空间。"
      },
      {
        "name": "索引表加区间递归",
        "time": "O(n)",
        "space": "O(n)",
        "steps": [
          "预存中序值到下标的映射",
          "维护前序游标p",
          "build(l,r)取pre[p++]为根",
          "先建左区间再建右区间"
        ],
        "reason": "映射 O(n)，每节点只构建一次；包含递归栈，不含输出树。"
      }
    ],
    "frames": [
      {
        "note": "前序首项4是根。",
        "cells": [
          "中序1,2 | 4 | 6"
        ],
        "graph": {
          "nodes": [
            {
              "id": "r",
              "value": "4",
              "x": 220,
              "y": 30
            }
          ],
          "edges": [],
          "active": [
            "r"
          ]
        }
      },
      {
        "note": "左区间[1,2]，下一前序值2为根。",
        "cells": [
          "1 | 2"
        ],
        "graph": {
          "nodes": [
            {
              "id": "r",
              "value": "4",
              "x": 220,
              "y": 30
            },
            {
              "id": "l",
              "value": "2",
              "x": 110,
              "y": 100
            }
          ],
          "edges": [
            [
              "r",
              "l"
            ]
          ],
          "active": [
            "l"
          ]
        }
      },
      {
        "note": "继续左区间，取前序值1。",
        "cells": [
          "4 → 左2",
          "2 → 左1"
        ],
        "graph": {
          "nodes": [
            {
              "id": "r",
              "value": "4",
              "x": 220,
              "y": 30
            },
            {
              "id": "l",
              "value": "2",
              "x": 110,
              "y": 100
            },
            {
              "id": "a",
              "value": "1",
              "x": 55,
              "y": 170
            }
          ],
          "edges": [
            [
              "r",
              "l"
            ],
            [
              "l",
              "a"
            ]
          ],
          "active": [
            "a"
          ]
        }
      },
      {
        "note": "回到4的右区间，取值6。",
        "cells": [
          "4 → 右6",
          "重建完成"
        ],
        "graph": {
          "nodes": [
            {
              "id": "r",
              "value": "4",
              "x": 220,
              "y": 30
            },
            {
              "id": "l",
              "value": "2",
              "x": 110,
              "y": 100
            },
            {
              "id": "q",
              "value": "6",
              "x": 330,
              "y": 100
            },
            {
              "id": "a",
              "value": "1",
              "x": 55,
              "y": 170
            }
          ],
          "edges": [
            [
              "r",
              "l"
            ],
            [
              "r",
              "q"
            ],
            [
              "l",
              "a"
            ]
          ],
          "active": [
            "q"
          ]
        }
      }
    ],
    "kind": "linked",
    "traceMethod": "索引表加区间递归",
    "tiers": [
      "初级",
      "进阶"
    ],
    "url": "https://leetcode.cn/problems/construct-binary-tree-from-preorder-and-inorder-traversal/"
  },
  {
    "id": 437,
    "title": "路径总和 III",
    "slug": "path-sum-iii",
    "level": "中等",
    "category": "二叉树",
    "summary": "统计二叉树中沿父到子方向、节点值之和等于目标的连续路径数，起终点任意。",
    "example": "根1(左-1(左1),右1)，target=1 → 4条",
    "pitfall": "前缀计数只保留当前根到节点路径；退出节点时必须减去自己的前缀。",
    "methods": [
      {
        "name": "从每个节点重新向下搜索",
        "time": "O(n²)",
        "space": "O(h)",
        "steps": [
          "每个节点作为起点",
          "向下累计路径和并计数",
          "遍历所有起点"
        ],
        "reason": "退化树需要检查 O(n²) 条路径。"
      },
      {
        "name": "前缀和与回溯计数",
        "time": "期望 O(n)",
        "space": "O(h)",
        "steps": [
          "cnt[0]=1",
          "进入节点令sum+=val，答案加cnt[sum-target]",
          "cnt[sum]加1后递归孩子",
          "退出时cnt[sum]减1并可删除零计数"
        ],
        "reason": "sum-target 的祖先前缀界定一条有效路径；及时撤销防止串到兄弟分支。"
      }
    ],
    "frames": [
      {
        "note": "初始空前缀。",
        "cells": [
          "cnt{0:1}",
          "答案0"
        ],
        "graph": {
          "nodes": [
            {
              "id": "r",
              "value": "1",
              "x": 220,
              "y": 30
            },
            {
              "id": "l",
              "value": "-1",
              "x": 110,
              "y": 100
            },
            {
              "id": "q",
              "value": "1",
              "x": 330,
              "y": 100
            },
            {
              "id": "a",
              "value": "1",
              "x": 55,
              "y": 170
            }
          ],
          "edges": [
            [
              "r",
              "l"
            ],
            [
              "r",
              "q"
            ],
            [
              "l",
              "a"
            ]
          ],
          "active": []
        }
      },
      {
        "note": "访问根1，sum=1，命中前缀0。",
        "cells": [
          "路径[根1]",
          "答案1"
        ],
        "graph": {
          "nodes": [
            {
              "id": "r",
              "value": "1",
              "x": 220,
              "y": 30
            },
            {
              "id": "l",
              "value": "-1",
              "x": 110,
              "y": 100
            },
            {
              "id": "q",
              "value": "1",
              "x": 330,
              "y": 100
            },
            {
              "id": "a",
              "value": "1",
              "x": 55,
              "y": 170
            }
          ],
          "edges": [
            [
              "r",
              "l"
            ],
            [
              "r",
              "q"
            ],
            [
              "l",
              "a"
            ]
          ],
          "active": [
            "r"
          ]
        }
      },
      {
        "note": "左-1后到左叶1，sum又为1；前缀0出现两次。",
        "cells": [
          "路径[根1,-1,1]",
          "路径[叶1]",
          "答案3"
        ],
        "graph": {
          "nodes": [
            {
              "id": "r",
              "value": "1",
              "x": 220,
              "y": 30
            },
            {
              "id": "l",
              "value": "-1",
              "x": 110,
              "y": 100
            },
            {
              "id": "q",
              "value": "1",
              "x": 330,
              "y": 100
            },
            {
              "id": "a",
              "value": "1",
              "x": 55,
              "y": 170
            }
          ],
          "edges": [
            [
              "r",
              "l"
            ],
            [
              "r",
              "q"
            ],
            [
              "l",
              "a"
            ]
          ],
          "active": [
            "r",
            "l",
            "a"
          ]
        }
      },
      {
        "note": "撤销左分支，再访问右1，命中前缀1。",
        "cells": [
          "路径[右1]",
          "答案4"
        ],
        "graph": {
          "nodes": [
            {
              "id": "r",
              "value": "1",
              "x": 220,
              "y": 30
            },
            {
              "id": "l",
              "value": "-1",
              "x": 110,
              "y": 100
            },
            {
              "id": "q",
              "value": "1",
              "x": 330,
              "y": 100
            },
            {
              "id": "a",
              "value": "1",
              "x": 55,
              "y": 170
            }
          ],
          "edges": [
            [
              "r",
              "l"
            ],
            [
              "r",
              "q"
            ],
            [
              "l",
              "a"
            ]
          ],
          "active": [
            "q"
          ]
        }
      }
    ],
    "kind": "linked",
    "traceMethod": "前缀和与回溯计数",
    "tiers": [
      "初级",
      "进阶"
    ],
    "url": "https://leetcode.cn/problems/path-sum-iii/"
  },
  {
    "id": 236,
    "title": "二叉树的最近公共祖先",
    "slug": "lowest-common-ancestor-of-a-binary-tree",
    "level": "中等",
    "category": "二叉树",
    "summary": "给定普通二叉树中两个不同节点，寻找同时包含它们的最深祖先；节点可以是自己的祖先。",
    "example": "树3(左2(左1),右5)，p=2,q=1 → 2",
    "pitfall": "比较节点身份；普通树不能用BST的大小关系向下搜索。",
    "methods": [
      {
        "name": "父指针加祖先集合",
        "time": "O(n)",
        "space": "O(n)",
        "steps": [
          "遍历记录每个节点的父亲",
          "把p到根的祖先放集合",
          "q向上走到第一个集合成员"
        ],
        "reason": "第一个公共节点就是最低公共祖先。"
      },
      {
        "name": "后序返回命中节点",
        "time": "O(n)",
        "space": "O(h)",
        "steps": [
          "遇空返回空，遇p或q返回自身",
          "递归左右得到L,R",
          "两边非空返回当前",
          "否则返回非空的一边"
        ],
        "reason": "在题设两节点存在的前提下，首次合流点或命中祖先即答案。"
      }
    ],
    "frames": [
      {
        "note": "目标是节点2与其后代1。",
        "cells": [
          "3 → 左2 / 右5",
          "2 → 左1"
        ],
        "graph": {
          "nodes": [
            {
              "id": "r",
              "value": "3",
              "x": 220,
              "y": 30
            },
            {
              "id": "l",
              "value": "2",
              "x": 110,
              "y": 100
            },
            {
              "id": "q",
              "value": "5",
              "x": 330,
              "y": 100
            },
            {
              "id": "a",
              "value": "1",
              "x": 55,
              "y": 170
            }
          ],
          "edges": [
            [
              "r",
              "l"
            ],
            [
              "r",
              "q"
            ],
            [
              "l",
              "a"
            ]
          ],
          "active": [
            "l",
            "a"
          ]
        }
      },
      {
        "note": "递归到2，直接返回命中的节点2。",
        "cells": [
          "左返回2"
        ],
        "graph": {
          "nodes": [
            {
              "id": "r",
              "value": "3",
              "x": 220,
              "y": 30
            },
            {
              "id": "l",
              "value": "2",
              "x": 110,
              "y": 100
            },
            {
              "id": "q",
              "value": "5",
              "x": 330,
              "y": 100
            },
            {
              "id": "a",
              "value": "1",
              "x": 55,
              "y": 170
            }
          ],
          "edges": [
            [
              "r",
              "l"
            ],
            [
              "r",
              "q"
            ],
            [
              "l",
              "a"
            ]
          ],
          "active": [
            "l"
          ]
        }
      },
      {
        "note": "右子树5无目标，返回空。",
        "cells": [
          "右返回null"
        ],
        "graph": {
          "nodes": [
            {
              "id": "r",
              "value": "3",
              "x": 220,
              "y": 30
            },
            {
              "id": "l",
              "value": "2",
              "x": 110,
              "y": 100
            },
            {
              "id": "q",
              "value": "5",
              "x": 330,
              "y": 100
            },
            {
              "id": "a",
              "value": "1",
              "x": 55,
              "y": 170
            }
          ],
          "edges": [
            [
              "r",
              "l"
            ],
            [
              "r",
              "q"
            ],
            [
              "l",
              "a"
            ]
          ],
          "active": [
            "q"
          ]
        }
      },
      {
        "note": "根只有左侧非空，因此返回2。",
        "cells": [
          "LCA=2"
        ],
        "graph": {
          "nodes": [
            {
              "id": "r",
              "value": "3",
              "x": 220,
              "y": 30
            },
            {
              "id": "l",
              "value": "2",
              "x": 110,
              "y": 100
            },
            {
              "id": "q",
              "value": "5",
              "x": 330,
              "y": 100
            },
            {
              "id": "a",
              "value": "1",
              "x": 55,
              "y": 170
            }
          ],
          "edges": [
            [
              "r",
              "l"
            ],
            [
              "r",
              "q"
            ],
            [
              "l",
              "a"
            ]
          ],
          "active": [
            "l"
          ]
        }
      }
    ],
    "kind": "linked",
    "traceMethod": "后序返回命中节点",
    "tiers": [
      "初级",
      "进阶"
    ],
    "url": "https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree/"
  },
  {
    "id": 124,
    "title": "二叉树中的最大路径和",
    "slug": "binary-tree-maximum-path-sum",
    "level": "困难",
    "category": "二叉树",
    "summary": "求二叉树中任意非空简单路径的最大节点值总和，可在任意节点转折一次。",
    "example": "树-5(左4,右8(左-2,右3)) → 11",
    "pitfall": "答案初始化为负无穷而非0；向父节点返回的贡献只能取一侧。",
    "methods": [
      {
        "name": "每个节点枚举向下路径贡献",
        "time": "O(n²)",
        "space": "O(h)",
        "steps": [
          "对每个转折点重新计算左右最大单支贡献",
          "负贡献按0",
          "更新val+left+right"
        ],
        "reason": "重复计算子树贡献导致最坏平方时间。"
      },
      {
        "name": "后序最大贡献",
        "time": "O(n)",
        "space": "O(h)",
        "steps": [
          "L=max(0,dfs(left)), R=max(0,dfs(right))",
          "ans=max(ans,val+L+R)",
          "返回val+max(L,R)"
        ],
        "reason": "局部答案可以两支合流，返回值只能一支，保证路径没有分叉。"
      }
    ],
    "frames": [
      {
        "note": "叶4,-2,3分别返回自身值。",
        "cells": [
          "4",
          "-2",
          "3"
        ],
        "graph": {
          "nodes": [
            {
              "id": "r",
              "value": "-5",
              "x": 220,
              "y": 30
            },
            {
              "id": "l",
              "value": "4",
              "x": 110,
              "y": 100
            },
            {
              "id": "q",
              "value": "8",
              "x": 330,
              "y": 100
            },
            {
              "id": "a",
              "value": "-2",
              "x": 275,
              "y": 170
            },
            {
              "id": "b",
              "value": "3",
              "x": 385,
              "y": 170
            }
          ],
          "edges": [
            [
              "r",
              "l"
            ],
            [
              "r",
              "q"
            ],
            [
              "q",
              "a"
            ],
            [
              "q",
              "b"
            ]
          ],
          "active": [
            "l",
            "a",
            "b"
          ]
        }
      },
      {
        "note": "节点8忽略负的-2，保留3。",
        "cells": [
          "候选8+0+3=11",
          "返回11"
        ],
        "graph": {
          "nodes": [
            {
              "id": "r",
              "value": "-5",
              "x": 220,
              "y": 30
            },
            {
              "id": "l",
              "value": "4",
              "x": 110,
              "y": 100
            },
            {
              "id": "q",
              "value": "8",
              "x": 330,
              "y": 100
            },
            {
              "id": "a",
              "value": "-2",
              "x": 275,
              "y": 170
            },
            {
              "id": "b",
              "value": "3",
              "x": 385,
              "y": 170
            }
          ],
          "edges": [
            [
              "r",
              "l"
            ],
            [
              "r",
              "q"
            ],
            [
              "q",
              "a"
            ],
            [
              "q",
              "b"
            ]
          ],
          "active": [
            "q",
            "b"
          ]
        }
      },
      {
        "note": "根-5连接4与右侧11。",
        "cells": [
          "候选-5+4+11=10"
        ],
        "graph": {
          "nodes": [
            {
              "id": "r",
              "value": "-5",
              "x": 220,
              "y": 30
            },
            {
              "id": "l",
              "value": "4",
              "x": 110,
              "y": 100
            },
            {
              "id": "q",
              "value": "8",
              "x": 330,
              "y": 100
            },
            {
              "id": "a",
              "value": "-2",
              "x": 275,
              "y": 170
            },
            {
              "id": "b",
              "value": "3",
              "x": 385,
              "y": 170
            }
          ],
          "edges": [
            [
              "r",
              "l"
            ],
            [
              "r",
              "q"
            ],
            [
              "q",
              "a"
            ],
            [
              "q",
              "b"
            ]
          ],
          "active": [
            "r",
            "l",
            "q",
            "b"
          ]
        }
      },
      {
        "note": "比较所有候选，最大为11。",
        "cells": [
          "8 → 3",
          "答案11"
        ],
        "graph": {
          "nodes": [
            {
              "id": "r",
              "value": "-5",
              "x": 220,
              "y": 30
            },
            {
              "id": "l",
              "value": "4",
              "x": 110,
              "y": 100
            },
            {
              "id": "q",
              "value": "8",
              "x": 330,
              "y": 100
            },
            {
              "id": "a",
              "value": "-2",
              "x": 275,
              "y": 170
            },
            {
              "id": "b",
              "value": "3",
              "x": 385,
              "y": 170
            }
          ],
          "edges": [
            [
              "r",
              "l"
            ],
            [
              "r",
              "q"
            ],
            [
              "q",
              "a"
            ],
            [
              "q",
              "b"
            ]
          ],
          "active": [
            "q",
            "b"
          ]
        }
      }
    ],
    "kind": "linked",
    "traceMethod": "后序最大贡献",
    "tiers": [
      "初级",
      "进阶"
    ],
    "url": "https://leetcode.cn/problems/binary-tree-maximum-path-sum/"
  },
  {
    "id": 200,
    "title": "岛屿数量",
    "slug": "number-of-islands",
    "level": "中等",
    "category": "图论",
    "summary": "在由陆地与水组成的网格中，统计上下左右连通的陆地块数。",
    "example": "网格[110,010,001] → 2座岛",
    "pitfall": "对角线不连通；原地改为水会改变输入，若要保留请用visited数组。",
    "methods": [
      {
        "name": "DFS淹没连通块",
        "time": "O(mn)",
        "space": "O(mn)",
        "steps": [
          "扫描每个格子",
          "遇陆地答案加1",
          "DFS把所有四邻接陆地标为已访问"
        ],
        "reason": "每格仅访问一次；全陆地时递归深度可达 mn。"
      },
      {
        "name": "BFS迭代洪泛",
        "time": "O(mn)",
        "space": "O(mn)",
        "steps": [
          "发现陆地就标记并入队",
          "出队并扩展四邻接陆地",
          "队列清空表示一座岛结束"
        ],
        "reason": "入队时标记避免重复入队；适合避免递归栈溢出。"
      }
    ],
    "frames": [
      {
        "note": "原网格，1是陆地。",
        "cells": [
          "1 1 0",
          "0 1 0",
          "0 0 1"
        ]
      },
      {
        "note": "发现(0,0)，岛数加1。",
        "cells": [
          "[1] 1 0",
          "0 1 0",
          "0 0 1"
        ]
      },
      {
        "note": "洪泛消除与它相连的三个格子。",
        "cells": [
          "0 0 0",
          "0 0 0",
          "0 0 1"
        ]
      },
      {
        "note": "右下格是新连通块，岛数2。",
        "cells": [
          "0 0 0",
          "0 0 0",
          "0 0 [1]"
        ]
      }
    ],
    "kind": "matrix",
    "traceMethod": "BFS迭代洪泛",
    "tiers": [
      "初级",
      "进阶"
    ],
    "url": "https://leetcode.cn/problems/number-of-islands/"
  },
  {
    "id": 994,
    "title": "腐烂的橘子",
    "slug": "rotting-oranges",
    "level": "中等",
    "category": "图论",
    "summary": "每分钟，腐烂橘子会使四邻接的新鲜橘子腐烂；求全部腐烂所需分钟，无法完成返回-1。",
    "example": "网格[211,010] → 2分钟",
    "pitfall": "必须多源同时扩散；按一整层推进一分钟。没有新鲜橘子时答案为0。",
    "methods": [
      {
        "name": "反复扫描并暂存变化",
        "time": "O((mn)²)",
        "space": "O(mn)",
        "steps": [
          "每轮扫描所有腐烂橘子的邻居",
          "暂存本轮新腐烂位置",
          "整轮后一起修改",
          "直到无变化"
        ],
        "reason": "最多 mn 轮，每轮扫描 mn 格；即时修改会错误地一轮扩散多步。"
      },
      {
        "name": "多源BFS",
        "time": "O(mn)",
        "space": "O(mn)",
        "steps": [
          "所有初始腐烂格同时入队",
          "统计新鲜数",
          "每层感染邻居并减少新鲜数",
          "最后检查是否还剩新鲜格"
        ],
        "reason": "每个格只入队一次，层号就是最早感染时间。"
      }
    ],
    "frames": [
      {
        "note": "2为腐烂，1为新鲜，0为空。",
        "cells": [
          "2 1 1",
          "0 1 0"
        ]
      },
      {
        "note": "第0分钟，队列只有左上。",
        "cells": [
          "[2] 1 1",
          "0 1 0"
        ]
      },
      {
        "note": "第1分钟，顶行中间腐烂。",
        "cells": [
          "2 [2] 1",
          "0 1 0"
        ]
      },
      {
        "note": "第2分钟，右上和下中同时腐烂。",
        "cells": [
          "2 2 [2]",
          "0 [2] 0"
        ]
      }
    ],
    "kind": "matrix",
    "traceMethod": "多源BFS",
    "tiers": [
      "初级",
      "进阶"
    ],
    "url": "https://leetcode.cn/problems/rotting-oranges/"
  },
  {
    "id": 207,
    "title": "课程表",
    "slug": "course-schedule",
    "level": "中等",
    "category": "图论",
    "summary": "课程存在先修依赖，判断是否能安排顺序完成全部课程。",
    "example": "依赖0→1,1→2,2→1 → false",
    "pitfall": "边应从先修课指向后续课；环中的课程无法使入度降到0。",
    "methods": [
      {
        "name": "三色DFS检测有向环",
        "time": "O(V+E)",
        "space": "O(V+E)",
        "steps": [
          "0=未访问，1=当前递归栈，2=已完成",
          "进入节点标1",
          "遇标1邻居说明有环",
          "退出标2"
        ],
        "reason": "递归栈上的回边形成环；邻接表空间包含边。"
      },
      {
        "name": "Kahn拓扑排序",
        "time": "O(V+E)",
        "space": "O(V+E)",
        "steps": [
          "建邻接表与入度",
          "所有入度0课程入队",
          "弹出并减小后继入度",
          "完成数等于V才可全部修完"
        ],
        "reason": "只能处理没有未完成前置课程的节点；环使部分节点永不入队。"
      }
    ],
    "frames": [
      {
        "note": "构建有向依赖。",
        "cells": [
          "0 → 1",
          "1 → 2",
          "2 → 1"
        ]
      },
      {
        "note": "计算入度。",
        "cells": [
          "度0=0",
          "度1=2",
          "度2=1"
        ]
      },
      {
        "note": "只能取出课程0，课程1入度降到1。",
        "cells": [
          "已完成[0]",
          "度1=1",
          "度2=1"
        ]
      },
      {
        "note": "队列为空但还有两门课。",
        "cells": [
          "环1 ↔ 2",
          "false"
        ]
      }
    ],
    "kind": "linked",
    "traceMethod": "Kahn拓扑排序",
    "tiers": [
      "初级",
      "进阶"
    ],
    "url": "https://leetcode.cn/problems/course-schedule/"
  },
  {
    "id": 208,
    "title": "实现 Trie (前缀树)",
    "slug": "implement-trie-prefix-tree",
    "level": "中等",
    "category": "图论",
    "summary": "设计前缀树，支持插入单词、查询完整单词和查询前缀。",
    "example": "插入cat、car：search(ca)=false，startsWith(ca)=true",
    "pitfall": "路径存在只说明前缀存在；完整单词还必须检查终止标志。",
    "methods": [
      {
        "name": "列表逐词比较",
        "time": "插入O(L)，查询O(NL)",
        "space": "O(NL)",
        "steps": [
          "保存所有单词",
          "完整查询逐个比较",
          "前缀查询逐个检查开头"
        ],
        "reason": "N个词、最大长度L，每次查询最坏扫全部。"
      },
      {
        "name": "Trie字符路径",
        "time": "每操作O(L)",
        "space": "O(总字符数)",
        "steps": [
          "每个节点存children与isEnd",
          "插入时逐字符建边，末端标记",
          "查询逐字符走边",
          "search额外检查isEnd"
        ],
        "reason": "共享相同前缀，查询只与当前词长有关；固定字母表可用定长孩子数组。"
      }
    ],
    "frames": [
      {
        "note": "从空根插入cat。",
        "cells": [
          "root → c → a → t★"
        ]
      },
      {
        "note": "插入car，共用c与a。",
        "cells": [
          "a → t★",
          "a → r★"
        ]
      },
      {
        "note": "查询ca，路径存在但a没有终止标志。",
        "cells": [
          "search(ca)=false"
        ]
      },
      {
        "note": "查前缀ca，只要求路径存在。",
        "cells": [
          "startsWith(ca)=true"
        ]
      }
    ],
    "kind": "linked",
    "traceMethod": "Trie字符路径",
    "tiers": [
      "初级",
      "进阶"
    ],
    "url": "https://leetcode.cn/problems/implement-trie-prefix-tree/"
  },
  {
    "id": 46,
    "title": "全排列",
    "slug": "permutations",
    "level": "中等",
    "category": "回溯",
    "summary": "列出互不相同的整数的全部排列，每个元素恰好用一次。",
    "example": "[1,2,3] → 6种排列",
    "pitfall": "每次递归结束要撤销选择；保存答案时复制路径，不要保存同一可变引用。",
    "methods": [
      {
        "name": "剩余元素切片递归",
        "time": "O(n·n!)",
        "space": "O(n²)，不含输出",
        "steps": [
          "依次选择一个剩余元素",
          "复制去掉它的剩余列表",
          "递归填下一个位置",
          "填满时复制答案"
        ],
        "reason": "输出本身有 n·n! 个值；递归保留的切片总长度为平方。"
      },
      {
        "name": "原地交换回溯",
        "time": "O(n·n!)",
        "space": "O(n)，不含输出",
        "steps": [
          "dfs(pos)遍历i=pos..n-1",
          "交换nums[pos]与nums[i]",
          "递归pos+1",
          "交换回来",
          "pos=n时复制数组"
        ],
        "reason": "原地维护已选前缀，空间只需递归栈；输入会在结束时还原。"
      }
    ],
    "frames": [
      {
        "note": "固定第0位为1。",
        "cells": [
          "[1]",
          "2",
          "3"
        ]
      },
      {
        "note": "固定第1位为2，得到一个答案。",
        "cells": [
          "1 → 2 → 3",
          "收集123"
        ]
      },
      {
        "note": "回退，交换第1位与第2位。",
        "cells": [
          "1 → 3 → 2",
          "收集132"
        ]
      },
      {
        "note": "第0位依次选2和3，扩展其分支。",
        "cells": [
          "213",
          "231",
          "321",
          "312"
        ]
      }
    ],
    "kind": "linked",
    "traceMethod": "原地交换回溯",
    "tiers": [
      "初级",
      "进阶"
    ],
    "url": "https://leetcode.cn/problems/permutations/"
  },
  {
    "id": 78,
    "title": "子集",
    "slug": "subsets",
    "level": "中等",
    "category": "回溯",
    "summary": "返回不重复整数数组的所有子集，包含空集与全集。",
    "example": "[2,5] → [[],[2],[5],[2,5]]",
    "pitfall": "子集不关心顺序；每个元素仅决定选或不选。",
    "methods": [
      {
        "name": "位掩码枚举",
        "time": "O(n·2ⁿ)",
        "space": "O(n)，不含输出",
        "steps": [
          "枚举mask=0..2ⁿ-1",
          "检查每个二进制位",
          "位为1则加入对应元素",
          "保存子集"
        ],
        "reason": "每个掩码唯一对应一个子集；语言位运算可能有位数上限。"
      },
      {
        "name": "回溯选择树",
        "time": "O(n·2ⁿ)",
        "space": "O(n)，不含输出",
        "steps": [
          "dfs(i)先走不选nums[i]分支",
          "加入nums[i]后走选分支",
          "退出撤销",
          "i=n时复制路径"
        ],
        "reason": "树有2ⁿ片叶子，复制输出决定总时间。"
      }
    ],
    "frames": [
      {
        "note": "根节点：路径为空。",
        "cells": [
          "[]"
        ]
      },
      {
        "note": "对2做不选/选的分叉。",
        "cells": [
          "不选2 → []",
          "选2 → [2]"
        ]
      },
      {
        "note": "空路径再对5分叉。",
        "cells": [
          "[]",
          "[5]"
        ]
      },
      {
        "note": "含2路径再对5分叉。",
        "cells": [
          "[2]",
          "[2,5]",
          "共4个子集"
        ]
      }
    ],
    "kind": "buckets",
    "traceMethod": "回溯选择树",
    "tiers": [
      "初级",
      "进阶"
    ],
    "url": "https://leetcode.cn/problems/subsets/"
  },
  {
    "id": 17,
    "title": "电话号码的字母组合",
    "slug": "letter-combinations-of-a-phone-number",
    "level": "中等",
    "category": "回溯",
    "summary": "给定只含2到9的数字串，生成电话键盘上每个数字对应字母的所有组合。",
    "example": "\"23\" → ad,ae,af,bd,be,bf,cd,ce,cf",
    "pitfall": "空输入应返回空列表；数字0和1不在题设映射中。",
    "methods": [
      {
        "name": "逐层扩展组合列表",
        "time": "O(n·4ⁿ)",
        "space": "O(n·4ⁿ)，含中间列表",
        "steps": [
          "从一个空前缀开始",
          "对每个数字，把当前所有前缀与其每个字母拼接",
          "替换组合列表"
        ],
        "reason": "每位最多4选，组合总数最多4ⁿ；字符串复制需计长度。"
      },
      {
        "name": "固定路径回溯",
        "time": "O(n·4ⁿ)",
        "space": "O(n)，不含输出",
        "steps": [
          "按位置选择当前数字的一个字母",
          "写入路径",
          "递归下一位",
          "走完时复制为字符串"
        ],
        "reason": "路径长n，递归深n；不保留所有中间层。"
      }
    ],
    "frames": [
      {
        "note": "数字2映射a,b,c。",
        "cells": [
          "a",
          "b",
          "c"
        ]
      },
      {
        "note": "先固定a，处理数字3。",
        "cells": [
          "a → d",
          "a → e",
          "a → f"
        ]
      },
      {
        "note": "回退到b，再组合。",
        "cells": [
          "bd",
          "be",
          "bf"
        ]
      },
      {
        "note": "回退到c，得到最后三个。",
        "cells": [
          "cd",
          "ce",
          "cf",
          "共9种"
        ]
      }
    ],
    "kind": "buckets",
    "traceMethod": "固定路径回溯",
    "tiers": [
      "初级",
      "进阶"
    ],
    "url": "https://leetcode.cn/problems/letter-combinations-of-a-phone-number/"
  },
  {
    "id": 39,
    "title": "组合总和",
    "slug": "combination-sum",
    "level": "中等",
    "category": "回溯",
    "summary": "从互不相同的正整数中选若干个凑成目标，每个数可重复使用，返回不同组合。",
    "example": "候选[2,3,5]，目标7 → [[2,2,3],[2,5]]",
    "pitfall": "只允许从当前下标及之后继续选，才能避免把排列重复算成组合。",
    "methods": [
      {
        "name": "枚举每个数的使用次数",
        "time": "粗上界O((d+1)ⁿ·(n+d))",
        "space": "O(n+d)，不含输出",
        "steps": [
          "对第i个数枚举0..floor(remain/value)次",
          "转入下一个数",
          "所有数处理完且余量0时收集"
        ],
        "reason": "n为候选数，d=floor(target/minValue)，粗上界覆盖计数选择与结果复制。"
      },
      {
        "name": "排序剪枝回溯",
        "time": "粗上界O(nᵈ·(n+d)+n log n)",
        "space": "O(n+d)，不含输出",
        "steps": [
          "复制并排序候选",
          "dfs(start,remain)",
          "从start向右选择，值大于remain立即停止",
          "递归仍传i允许重复",
          "remain=0时收集"
        ],
        "reason": "最大路径长d；非降序路径消除重复，正数使余量严格下降。"
      }
    ],
    "frames": [
      {
        "note": "从最小候选2开始。",
        "cells": [
          "余量7",
          "路径[]"
        ]
      },
      {
        "note": "连续选择2、2。",
        "cells": [
          "路径[2,2]",
          "余量3"
        ]
      },
      {
        "note": "选3恰好完成，回退。",
        "cells": [
          "[2,2,3]",
          "余量0"
        ]
      },
      {
        "note": "回到仅选2的分支，再选5。",
        "cells": [
          "[2,5]",
          "余量0"
        ]
      }
    ],
    "kind": "linked",
    "traceMethod": "排序剪枝回溯",
    "tiers": [
      "初级",
      "进阶"
    ],
    "url": "https://leetcode.cn/problems/combination-sum/"
  },
  {
    "id": 22,
    "title": "括号生成",
    "slug": "generate-parentheses",
    "level": "中等",
    "category": "回溯",
    "summary": "生成由n对括号组成的所有合法括号串。",
    "example": "n=2 → [\"(())\",\"()()\"]",
    "pitfall": "任何前缀中右括号数都不能超过左括号数；只在末尾检查会浪费大量搜索。",
    "methods": [
      {
        "name": "枚举全部串再验证",
        "time": "O(n·4ⁿ)",
        "space": "O(n)，不含输出",
        "steps": [
          "生成长度2n的左右括号串",
          "扫描余额，负数判无效",
          "末尾余额0才保存"
        ],
        "reason": "全部串有2^(2n)种，每种验证O(n)。"
      },
      {
        "name": "合法前缀回溯",
        "time": "O(n·Cₙ)",
        "space": "O(n)，不含输出",
        "steps": [
          "left<n时可放左括号",
          "right<left时可放右括号",
          "左右均为n时保存",
          "回溯撤销"
        ],
        "reason": "Cₙ为第n个卡特兰数；只扩展仍可能合法的前缀，输出长度2n。"
      }
    ],
    "frames": [
      {
        "note": "空串只能先放左括号。",
        "cells": [
          "("
        ]
      },
      {
        "note": "再放左括号，已用尽两个左括号。",
        "cells": [
          "(("
        ]
      },
      {
        "note": "连续补右括号得到首个答案。",
        "cells": [
          "(())"
        ]
      },
      {
        "note": "回退到首个左括号后先闭合，再开一对。",
        "cells": [
          "() → ()(",
          "()()"
        ]
      }
    ],
    "kind": "linked",
    "traceMethod": "合法前缀回溯",
    "tiers": [
      "初级",
      "进阶"
    ],
    "url": "https://leetcode.cn/problems/generate-parentheses/"
  },
  {
    "id": 79,
    "title": "单词搜索",
    "slug": "word-search",
    "level": "中等",
    "category": "回溯",
    "summary": "在字符网格中找出能沿四邻接路径拼成目标词的路径，同一格不能重复使用。",
    "example": "网格[AB,CD]，词ABD → true",
    "pitfall": "成功或失败返回前都要还原访问状态，否则后续起点可能被错误阻塞。",
    "methods": [
      {
        "name": "复制已访问集合的DFS",
        "time": "O(mn·4ᴸ·L)",
        "space": "O(L²)",
        "steps": [
          "每个匹配首字母的格作为起点",
          "尝试四邻格",
          "复制路径访问集合传入下一层",
          "完整匹配则成功"
        ],
        "reason": "L为词长，复制集合增添L因子；这是宽松最坏上界。"
      },
      {
        "name": "原地标记回溯",
        "time": "O(mn·4ᴸ)",
        "space": "O(L)",
        "steps": [
          "检查边界、字符和访问状态",
          "临时标记当前格",
          "递归四邻格找下一个字母",
          "恢复当前字符"
        ],
        "reason": "复用同一网格，递归深度不超过词长；4ᴸ是便于理解的保守上界。"
      }
    ],
    "frames": [
      {
        "note": "查找A→B→D。",
        "cells": [
          "A B",
          "C D"
        ]
      },
      {
        "note": "从左上A开始并标记。",
        "cells": [
          "[A] B",
          "C D"
        ]
      },
      {
        "note": "走右侧B，下一目标D。",
        "cells": [
          "✓ [B]",
          "C D"
        ]
      },
      {
        "note": "向下到D，完整匹配后还原网格。",
        "cells": [
          "A B",
          "C [D]"
        ]
      }
    ],
    "kind": "matrix",
    "traceMethod": "原地标记回溯",
    "tiers": [
      "初级",
      "进阶"
    ],
    "url": "https://leetcode.cn/problems/word-search/"
  },
  {
    "id": 131,
    "title": "分割回文串",
    "slug": "palindrome-partitioning",
    "level": "中等",
    "category": "回溯",
    "summary": "把字符串切成若干连续片段，使每段都是回文，列出所有切分。",
    "example": "\"aab\" → [[\"a\",\"a\",\"b\"],[\"aa\",\"b\"]]",
    "pitfall": "每次只切当前起点开始的前缀；不是从字符串中随意挑字符。",
    "methods": [
      {
        "name": "回溯时双指针验回文",
        "time": "O(n²·2ⁿ)，保守上界",
        "space": "O(n)，不含输出",
        "steps": [
          "枚举当前起点的所有终点",
          "用双指针检查片段",
          "回文则加入路径并递归终点+1",
          "末尾收集"
        ],
        "reason": "最坏有指数种切法，重复回文检查增加开销。"
      },
      {
        "name": "预处理回文表再回溯",
        "time": "O(n²+n·2ⁿ)",
        "space": "O(n²)，不含输出",
        "steps": [
          "从短区间到长区间计算 pal[i][j]",
          "转移为s[i]=s[j]且内部回文",
          "回溯时O(1)查表",
          "复制每个完整切分"
        ],
        "reason": "预处理平方，输出最坏指数；无法把全部结果降为多项式大小。"
      }
    ],
    "frames": [
      {
        "note": "预处理发现a、a、b、aa为回文。",
        "cells": [
          "a",
          "a",
          "b",
          "aa"
        ]
      },
      {
        "note": "选择第一个a，再选第二个a。",
        "cells": [
          "a | a | 待切b"
        ]
      },
      {
        "note": "加入b，收集第一个结果。",
        "cells": [
          "a | a | b"
        ]
      },
      {
        "note": "回到开头选择aa，再接b。",
        "cells": [
          "aa | b"
        ]
      }
    ],
    "kind": "buckets",
    "traceMethod": "预处理回文表再回溯",
    "tiers": [
      "初级",
      "进阶"
    ],
    "url": "https://leetcode.cn/problems/palindrome-partitioning/"
  },
  {
    "id": 51,
    "title": "N 皇后",
    "slug": "n-queens",
    "level": "困难",
    "category": "回溯",
    "summary": "在n×n棋盘放n个皇后，使它们不同行、不同列、不同对角线，返回所有棋盘。",
    "example": "n=4，一种解的列索引为[1,3,0,2]",
    "pitfall": "两条对角线由row-col和row+col标识；递归退出必须撤销列和对角线标记。",
    "methods": [
      {
        "name": "逐行回溯扫描已放皇后",
        "time": "搜索O(n²·n!)，另加输出",
        "space": "O(n)，不含输出",
        "steps": [
          "每行尝试各列",
          "扫描前面各行判断列与对角线冲突",
          "安全才递归下一行",
          "放满后生成棋盘"
        ],
        "reason": "每次合法性检查O(n)，给出宽松搜索上界；输出Q个棋盘另需O(Qn²)。"
      },
      {
        "name": "集合记录攻击线",
        "time": "搜索O(n·n!)，另加输出",
        "space": "O(n)，不含输出",
        "steps": [
          "维护cols、row-col、row+col集合",
          "候选位置三者均未占用才放",
          "递归下一行",
          "撤销三个标记"
        ],
        "reason": "冲突判断期望O(1)，候选仍有n列；输出Q个棋盘需O(Qn²)。"
      },
      {
        "name": "位掩码枚举可用列",
        "time": "搜索O(n!)，另加输出",
        "space": "O(n)，不含输出",
        "steps": [
          "available=mask & ~(cols|diagL|diagR)",
          "取最低有效位p",
          "递归更新cols|p、(diagL|p)<<1、(diagR|p)>>1",
          "依次清除p"
        ],
        "reason": "按机器字能容纳n位时的常数位操作估计；多字长大整数有额外成本。"
      }
    ],
    "frames": [
      {
        "note": "第一行选择第2列，索引1。",
        "cells": [
          ". Q . .",
          ". . . .",
          ". . . .",
          ". . . ."
        ]
      },
      {
        "note": "第二行选择索引3。",
        "cells": [
          ". Q . .",
          ". . . Q",
          ". . . .",
          ". . . ."
        ]
      },
      {
        "note": "第三行选择索引0。",
        "cells": [
          ". Q . .",
          ". . . Q",
          "Q . . .",
          ". . . ."
        ]
      },
      {
        "note": "第四行选择索引2，得到一种解。",
        "cells": [
          ". Q . .",
          ". . . Q",
          "Q . . .",
          ". . Q ."
        ]
      }
    ],
    "kind": "matrix",
    "traceMethod": "位掩码枚举可用列",
    "tiers": [
      "初级",
      "进阶",
      "高阶"
    ],
    "url": "https://leetcode.cn/problems/n-queens/"
  },
  {
    "id": 35,
    "title": "搜索插入位置",
    "slug": "search-insert-position",
    "level": "简单",
    "category": "二分查找",
    "summary": "在递增且无重复值的数组中找到目标位置；不存在时返回保持顺序的插入位置。",
    "example": "[1,4,7,9]，target=6 → 2",
    "pitfall": "寻找第一个大于等于target的位置，答案可能等于数组长度。",
    "methods": [
      {
        "name": "顺序扫描",
        "time": "O(n)",
        "space": "O(1)",
        "steps": [
          "从左到右找第一个nums[i]>=target",
          "找到返回i",
          "否则返回n"
        ],
        "reason": "直接实现插入位置定义。"
      },
      {
        "name": "半开区间下界二分",
        "time": "O(log n)",
        "space": "O(1)",
        "steps": [
          "l=0,r=n",
          "while l<r，mid=floor((l+r)/2)",
          "nums[mid]<target则l=mid+1，否则r=mid",
          "返回l"
        ],
        "reason": "始终保留第一个不小于目标的位置，区间长度不断减半。"
      }
    ],
    "frames": [
      {
        "note": "查找第一个>=6的下标。",
        "cells": [
          "1",
          "4",
          "7",
          "9"
        ]
      },
      {
        "note": "l=0,r=4，mid=2，7>=6。",
        "cells": [
          "l=0",
          "[mid=2]",
          "r←2"
        ]
      },
      {
        "note": "l=0,r=2，mid=1，4<6。",
        "cells": [
          "mid=1",
          "l←2"
        ]
      },
      {
        "note": "l=r=2，插入于7前。",
        "cells": [
          "1",
          "4",
          "[6]",
          "7",
          "9"
        ]
      }
    ],
    "kind": "interval",
    "traceMethod": "半开区间下界二分",
    "tiers": [
      "初级",
      "进阶"
    ],
    "url": "https://leetcode.cn/problems/search-insert-position/"
  },
  {
    "id": 74,
    "title": "搜索二维矩阵",
    "slug": "search-a-2d-matrix",
    "level": "中等",
    "category": "二分查找",
    "summary": "矩阵每行递增，且下一行首值大于上一行末值，判断是否包含目标。",
    "example": "矩阵[1,3,5;7,9,11]，target=9 → true",
    "pitfall": "本题可整体看成有序数组；只行列有序的240题不具备这一条件。",
    "methods": [
      {
        "name": "逐行二分",
        "time": "O(m log n)",
        "space": "O(1)",
        "steps": [
          "对每一行执行标准二分",
          "任一行找到则true",
          "全部找不到返回false"
        ],
        "reason": "m行，每行长度n。"
      },
      {
        "name": "一维映射二分",
        "time": "O(log(mn))",
        "space": "O(1)",
        "steps": [
          "在[0,mn-1]二分",
          "mid对应行floor(mid/n)、列mid%n",
          "比较矩阵值后缩小区间"
        ],
        "reason": "整体有序，映射不需要真正展开数组。"
      }
    ],
    "frames": [
      {
        "note": "按行展开后的逻辑顺序。",
        "cells": [
          "1",
          "3",
          "5",
          "7",
          "9",
          "11"
        ]
      },
      {
        "note": "l=0,r=5，mid=2，值5小于9。",
        "cells": [
          "舍弃1,3,5",
          "区间[3,5]"
        ]
      },
      {
        "note": "mid=4，对应行1列1。",
        "cells": [
          "7",
          "[9]",
          "11"
        ]
      },
      {
        "note": "命中目标。",
        "cells": [
          "matrix[1][1]=9",
          "true"
        ]
      }
    ],
    "kind": "interval",
    "traceMethod": "一维映射二分",
    "tiers": [
      "初级",
      "进阶"
    ],
    "url": "https://leetcode.cn/problems/search-a-2d-matrix/"
  },
  {
    "id": 34,
    "title": "在排序数组中查找元素的第一个和最后一个位置",
    "slug": "find-first-and-last-position-of-element-in-sorted-array",
    "level": "中等",
    "category": "二分查找",
    "summary": "在非递减数组中返回目标值的首次与末次出现位置，不存在返回[-1,-1]。",
    "example": "[1,2,2,2,5]，target=2 → [1,3]",
    "pitfall": "找到任意一个目标后向两侧扫描会退化为线性；应分别二分两个边界。",
    "methods": [
      {
        "name": "完整扫描记录首尾",
        "time": "O(n)",
        "space": "O(1)",
        "steps": [
          "遇目标时首次记录left",
          "每次更新right",
          "未遇到则保持-1"
        ],
        "reason": "相同元素再多也只扫描一次，但没有利用排序。"
      },
      {
        "name": "两次下界二分",
        "time": "O(log n)",
        "space": "O(1)",
        "steps": [
          "L=第一个>=target的位置",
          "U=第一个>target的位置",
          "若L=n或nums[L]!=target则无解",
          "否则返回[L,U-1]"
        ],
        "reason": "用两个单调条件避免target+1带来的数值溢出。"
      }
    ],
    "frames": [
      {
        "note": "目标2的区间。",
        "cells": [
          "1",
          "2",
          "2",
          "2",
          "5"
        ]
      },
      {
        "note": "先找第一个>=2的位置。",
        "cells": [
          "L=1"
        ]
      },
      {
        "note": "再找第一个>2的位置。",
        "cells": [
          "U=4"
        ]
      },
      {
        "note": "闭区间右端是U-1。",
        "cells": [
          "[1,3]"
        ]
      }
    ],
    "kind": "interval",
    "traceMethod": "两次下界二分",
    "tiers": [
      "初级",
      "进阶"
    ],
    "url": "https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/"
  },
  {
    "id": 33,
    "title": "搜索旋转排序数组",
    "slug": "search-in-rotated-sorted-array",
    "level": "中等",
    "category": "二分查找",
    "summary": "严格递增数组经过一次旋转，返回目标下标，不存在返回-1。",
    "example": "[6,8,1,3,4]，target=3 → 3",
    "pitfall": "本题无重复元素；有重复时判定哪半有序可能失效。",
    "methods": [
      {
        "name": "线性查找",
        "time": "O(n)",
        "space": "O(1)",
        "steps": [
          "逐个比较目标",
          "找到返回下标",
          "扫描结束返回-1"
        ],
        "reason": "不依赖旋转结构。"
      },
      {
        "name": "识别有序半区二分",
        "time": "O(log n)",
        "space": "O(1)",
        "steps": [
          "mid相等直接返回",
          "若nums[l]<=nums[mid]，左半有序",
          "判断target是否在有序半范围内",
          "保留可能包含目标的一半"
        ],
        "reason": "每轮至少一半有序，能排除另一半或有序半。"
      }
    ],
    "frames": [
      {
        "note": "l=0,r=4，mid=2值1。",
        "cells": [
          "6",
          "8",
          "[1]",
          "3",
          "4"
        ]
      },
      {
        "note": "右半[1,3,4]有序，3在其中。",
        "cells": [
          "l←3",
          "r=4"
        ]
      },
      {
        "note": "mid=3，值为3。",
        "cells": [
          "[3]",
          "4"
        ]
      },
      {
        "note": "返回原数组下标。",
        "cells": [
          "答案3"
        ]
      }
    ],
    "kind": "interval",
    "traceMethod": "识别有序半区二分",
    "tiers": [
      "初级",
      "进阶"
    ],
    "url": "https://leetcode.cn/problems/search-in-rotated-sorted-array/"
  },
  {
    "id": 153,
    "title": "寻找旋转排序数组中的最小值",
    "slug": "find-minimum-in-rotated-sorted-array",
    "level": "中等",
    "category": "二分查找",
    "summary": "严格递增数组旋转后，求最小值。",
    "example": "[5,7,9,1,3] → 1",
    "pitfall": "比较mid与右端，不是与目标；保留mid可能是最小值的情况。",
    "methods": [
      {
        "name": "遍历取最小",
        "time": "O(n)",
        "space": "O(1)",
        "steps": [
          "初始化最小为首项",
          "扫描并更新最小值"
        ],
        "reason": "简单基线，未使用旋转性质。"
      },
      {
        "name": "与右端比较的二分",
        "time": "O(log n)",
        "space": "O(1)",
        "steps": [
          "l=0,r=n-1",
          "mid=floor((l+r)/2)",
          "nums[mid]>nums[r]则l=mid+1，否则r=mid",
          "返回nums[l]"
        ],
        "reason": "mid大于右端说明断点在右；否则最小值在mid及其左侧。"
      }
    ],
    "frames": [
      {
        "note": "mid=2，9>右端3。",
        "cells": [
          "5",
          "7",
          "[9]",
          "1",
          "3"
        ]
      },
      {
        "note": "最小值必在右侧，l=3。",
        "cells": [
          "区间[1,3]"
        ]
      },
      {
        "note": "mid=3，值1<=右端3，r=3。",
        "cells": [
          "[1]"
        ]
      },
      {
        "note": "l=r，返回1。",
        "cells": [
          "答案1"
        ]
      }
    ],
    "kind": "interval",
    "traceMethod": "与右端比较的二分",
    "tiers": [
      "初级",
      "进阶"
    ],
    "url": "https://leetcode.cn/problems/find-minimum-in-rotated-sorted-array/"
  },
  {
    "id": 4,
    "title": "寻找两个正序数组的中位数",
    "slug": "median-of-two-sorted-arrays",
    "level": "困难",
    "category": "二分查找",
    "summary": "给定两个有序数组，求合并后的中位数，至少有一个数组非空。",
    "example": "A=[1,4]，B=[2,3,8] → 3",
    "pitfall": "必须在较短数组二分；切分两侧为空时使用正负无穷哨兵。",
    "methods": [
      {
        "name": "合并到中间位置",
        "time": "O(m+n)",
        "space": "O(1)",
        "steps": [
          "双指针按升序取数",
          "只保留最近两个值",
          "走到总长度的一半",
          "奇数取当前，偶数取两值均值"
        ],
        "reason": "无需保存完整合并数组，最坏走过一半总元素。"
      },
      {
        "name": "二分平衡切分",
        "time": "O(log(min(m,n)+1))",
        "space": "O(1)",
        "steps": [
          "让A为短数组",
          "二分A左侧个数i，B左侧个数j=floor((m+n+1)/2)-i",
          "要求Aleft<=Bright且Bleft<=Aright",
          "过大向左、过小向右",
          "从边界取中位数"
        ],
        "reason": "左半元素数固定，满足交叉大小关系后左右整体有序。"
      }
    ],
    "frames": [
      {
        "note": "总共5个数，左半需要3个。",
        "cells": [
          "A:1,4",
          "B:2,3,8"
        ]
      },
      {
        "note": "取i=1,j=2进行切分。",
        "cells": [
          "A:1 | 4",
          "B:2,3 | 8"
        ]
      },
      {
        "note": "检查两条交叉不等式。",
        "cells": [
          "1<=8",
          "3<=4"
        ]
      },
      {
        "note": "奇数总长，中位数是左半最大值。",
        "cells": [
          "max(1,3)=3"
        ]
      }
    ],
    "kind": "interval",
    "traceMethod": "二分平衡切分",
    "tiers": [
      "初级",
      "进阶"
    ],
    "url": "https://leetcode.cn/problems/median-of-two-sorted-arrays/"
  },
  {
    "id": 20,
    "title": "有效的括号",
    "slug": "valid-parentheses",
    "level": "简单",
    "category": "栈",
    "summary": "判断仅由三种括号组成的字符串是否正确配对且嵌套合法。",
    "example": "\"{[()]}\" → true；\"([)]\" → false",
    "pitfall": "右括号必须匹配最近尚未闭合的左括号；计数相等不代表嵌套合法。",
    "methods": [
      {
        "name": "反复删除相邻合法对",
        "time": "O(n²)",
        "space": "O(n)",
        "steps": [
          "反复删除()、[]、{}",
          "若长度不再变化则停止",
          "剩余为空才合法"
        ],
        "reason": "每轮扫描与复制，嵌套串可能需要n/2轮。"
      },
      {
        "name": "栈匹配",
        "time": "O(n)",
        "space": "O(n)",
        "steps": [
          "左括号入栈",
          "遇右括号检查栈顶是否匹配",
          "不匹配或栈空直接false",
          "匹配则弹出",
          "结束必须栈空"
        ],
        "reason": "后进先出恰好符合括号嵌套顺序。"
      }
    ],
    "frames": [
      {
        "note": "依次读取左括号并入栈。",
        "cells": [
          "栈底{",
          "[",
          "栈顶("
        ]
      },
      {
        "note": "读到)，匹配并弹出(。",
        "cells": [
          "栈{,["
        ]
      },
      {
        "note": "读到]，匹配并弹出[。",
        "cells": [
          "栈{"
        ]
      },
      {
        "note": "读到}，栈清空。",
        "cells": [
          "空栈",
          "true"
        ]
      }
    ],
    "kind": "queue",
    "traceMethod": "栈匹配",
    "tiers": [
      "初级",
      "进阶"
    ],
    "url": "https://leetcode.cn/problems/valid-parentheses/"
  },
  {
    "id": 155,
    "title": "最小栈",
    "slug": "min-stack",
    "level": "中等",
    "category": "栈",
    "summary": "设计支持入栈、出栈、查看栈顶和取最小值的栈，要求每个操作常数时间。",
    "example": "push(3),push(1),push(2),pop() → min仍为1",
    "pitfall": "最小值重复入栈时也要记录；否则弹出一个最小值可能丢失另一个。",
    "methods": [
      {
        "name": "查询时遍历栈（基线）",
        "time": "getMin O(n)，其他O(1)",
        "space": "O(n)",
        "steps": [
          "普通数组保存栈",
          "最小值查询扫描所有元素"
        ],
        "reason": "容易理解但不满足所有操作O(1)的题目要求。"
      },
      {
        "name": "每层保存当前最小值",
        "time": "每操作O(1)",
        "space": "O(n)",
        "steps": [
          "push(x)时保存(x,min(x,原最小))",
          "pop删除一对",
          "top返回首项",
          "getMin返回第二项"
        ],
        "reason": "每层缓存对应前缀最小值，弹栈后自然恢复旧最小值。"
      }
    ],
    "frames": [
      {
        "note": "压入3。",
        "cells": [
          "(值3,最小3)"
        ]
      },
      {
        "note": "压入1。",
        "cells": [
          "(3,3)",
          "(1,1)"
        ]
      },
      {
        "note": "压入2，最小值仍为1。",
        "cells": [
          "(3,3)",
          "(1,1)",
          "(2,1)"
        ]
      },
      {
        "note": "弹出2，看新的栈顶附带最小值。",
        "cells": [
          "(3,3)",
          "(1,1)",
          "min=1"
        ]
      }
    ],
    "kind": "queue",
    "traceMethod": "每层保存当前最小值",
    "tiers": [
      "初级",
      "进阶"
    ],
    "url": "https://leetcode.cn/problems/min-stack/"
  },
  {
    "id": 394,
    "title": "字符串解码",
    "slug": "decode-string",
    "level": "中等",
    "category": "栈",
    "summary": "展开形如k[片段]的嵌套编码，数字表示片段重复次数。",
    "example": "\"2[a3[b]]\" → \"abbbabbb\"",
    "pitfall": "倍数可能是多位数；遇到左括号需保存外层结果和倍数。",
    "methods": [
      {
        "name": "递归下降解析",
        "time": "O(n+L·d)，保守上界",
        "space": "O(n+L)",
        "steps": [
          "共享游标解析到右括号",
          "累积多位数字",
          "递归获取括号内片段",
          "重复并追加到本层"
        ],
        "reason": "n为输入长、L为输出长、d为嵌套深度；朴素字符串拼接/多层复制会重复处理字符。"
      },
      {
        "name": "显式栈保存外层",
        "time": "O(n+L·d)，保守上界",
        "space": "O(n+L)",
        "steps": [
          "数字令k=10k+digit",
          "遇[压入(当前片段,k)并清空",
          "遇]弹出外层，把当前片段重复k次拼回",
          "普通字符追加"
        ],
        "reason": "与递归同一解析结构；避免调用栈限制，实际耗时依赖字符串构造方式。"
      }
    ],
    "frames": [
      {
        "note": "读2[，保存外层空串与倍数2。",
        "cells": [
          "栈[(空,2)]",
          "当前空"
        ]
      },
      {
        "note": "读a3[，保存a与倍数3。",
        "cells": [
          "栈[(空,2),(a,3)]"
        ]
      },
      {
        "note": "读b]，构造a+bbb。",
        "cells": [
          "当前abbb",
          "栈[(空,2)]"
        ]
      },
      {
        "note": "读最后]，重复两次。",
        "cells": [
          "abbb | abbb"
        ]
      }
    ],
    "kind": "queue",
    "traceMethod": "显式栈保存外层",
    "tiers": [
      "初级",
      "进阶"
    ],
    "url": "https://leetcode.cn/problems/decode-string/"
  },
  {
    "id": 739,
    "title": "每日温度",
    "slug": "daily-temperatures",
    "level": "中等",
    "category": "栈",
    "summary": "对每天温度求还要等几天才出现更高温度，没有则记0。",
    "example": "[30,32,31,35] → [1,2,1,0]",
    "pitfall": "弹栈条件是严格更高；相等温度不能作为答案。",
    "methods": [
      {
        "name": "每天向后扫描",
        "time": "O(n²)",
        "space": "O(1)，不含输出",
        "steps": [
          "对每个i找首个j>i且T[j]>T[i]",
          "记录j-i",
          "找不到记0"
        ],
        "reason": "降序输入会检查所有后续位置。"
      },
      {
        "name": "单调递减下标栈",
        "time": "O(n)",
        "space": "O(n)，不含输出",
        "steps": [
          "遍历i",
          "当前温度高于栈顶时弹出j，ans[j]=i-j",
          "重复直到不再更高",
          "把i入栈"
        ],
        "reason": "栈内是未找到答案的日期，每个下标至多入栈出栈一次。"
      }
    ],
    "frames": [
      {
        "note": "第0天30入栈。",
        "cells": [
          "栈[0:30]"
        ]
      },
      {
        "note": "第1天32弹出30，等待1天。",
        "cells": [
          "ans[0]=1",
          "栈[1:32]"
        ]
      },
      {
        "note": "第2天31入栈，保持递减。",
        "cells": [
          "栈[1:32,2:31]"
        ]
      },
      {
        "note": "第3天35连续弹出31与32。",
        "cells": [
          "ans[2]=1",
          "ans[1]=2",
          "[1,2,1,0]"
        ]
      }
    ],
    "kind": "queue",
    "traceMethod": "单调递减下标栈",
    "tiers": [
      "初级",
      "进阶"
    ],
    "url": "https://leetcode.cn/problems/daily-temperatures/"
  },
  {
    "id": 84,
    "title": "柱状图中最大的矩形",
    "slug": "largest-rectangle-in-histogram",
    "level": "困难",
    "category": "栈",
    "summary": "柱宽均为1的直方图中，求由连续柱子共同覆盖的最大矩形面积。",
    "example": "[2,1,4,5,1] → 8",
    "pitfall": "弹出高度时，宽度由新的栈顶和当前下标决定，不是只看相邻柱子。",
    "methods": [
      {
        "name": "枚举左右端点维护最小高度",
        "time": "O(n²)",
        "space": "O(1)",
        "steps": [
          "固定左端l",
          "向右扩展r，维护区间最小高度",
          "用minHeight*(r-l+1)更新答案"
        ],
        "reason": "所有连续区间各检查一次。"
      },
      {
        "name": "单调递增栈",
        "time": "O(n)",
        "space": "O(n)",
        "steps": [
          "栈底放下标-1",
          "末尾视作高度0",
          "遇更矮柱时弹出j",
          "宽度=i-stack.top-1，更新h[j]*宽度",
          "最后把i入栈"
        ],
        "reason": "每柱弹出时确定右侧首个更低位置与左边界，每个下标进出栈一次。"
      }
    ],
    "frames": [
      {
        "note": "扫描到4、5，栈高度递增。",
        "cells": [
          "栈[-1,1:1,2:4,3:5]"
        ]
      },
      {
        "note": "遇i=4的高度1，弹出高度5。",
        "cells": [
          "宽=4-2-1=1",
          "面积5"
        ]
      },
      {
        "note": "继续弹出高度4。",
        "cells": [
          "宽=4-1-1=2",
          "面积8"
        ]
      },
      {
        "note": "尾部哨兵结算剩余柱子。",
        "cells": [
          "最大矩形高4×宽2",
          "答案8"
        ]
      }
    ],
    "kind": "queue",
    "traceMethod": "单调递增栈",
    "tiers": [
      "初级",
      "进阶"
    ],
    "url": "https://leetcode.cn/problems/largest-rectangle-in-histogram/"
  },
  {
    "id": 215,
    "title": "数组中的第K个最大元素",
    "slug": "kth-largest-element-in-an-array",
    "level": "中等",
    "category": "堆",
    "summary": "求数组按降序排序后的第k个元素，重复值分别计数。",
    "example": "[4,1,6,6,2]，k=2 → 6",
    "pitfall": "不是第k个不同值；快速选择的最坏时间仍可能平方。",
    "methods": [
      {
        "name": "复制排序",
        "time": "O(n log n)",
        "space": "O(n)",
        "steps": [
          "复制数组并按数值排序",
          "返回升序下标n-k"
        ],
        "reason": "复制保留输入；语言排序务必使用数值比较。"
      },
      {
        "name": "大小k的小根堆",
        "time": "O(n log(k+1))",
        "space": "O(k)",
        "steps": [
          "遍历元素入小根堆",
          "大小超过k则弹出最小值",
          "结束时堆顶就是第k大"
        ],
        "reason": "堆中始终保留已见元素的前k大，适合流式输入。"
      },
      {
        "name": "随机三路快速选择",
        "time": "期望O(n)，最坏O(n²)",
        "space": "迭代分区O(1)",
        "steps": [
          "目标下标n-k",
          "随机选pivot并划分小于、等于、大于三区",
          "目标落在哪区就保留哪区",
          "落在等值区直接返回"
        ],
        "reason": "原地分区改变输入，随机化改善期望性能；三路分区适合大量重复值。"
      }
    ],
    "frames": [
      {
        "note": "演示快速选择，目标升序下标3。",
        "cells": [
          "4",
          "1",
          "6",
          "6",
          "2"
        ]
      },
      {
        "note": "以4划分。",
        "cells": [
          "小于:[1,2]",
          "等于:[4]",
          "大于:[6,6]"
        ]
      },
      {
        "note": "目标3在右区，继续划分右区。",
        "cells": [
          "等于6的区间[3,4]"
        ]
      },
      {
        "note": "目标落在等值区，返回6。",
        "cells": [
          "第2大=6"
        ]
      }
    ],
    "kind": "buckets",
    "traceMethod": "随机三路快速选择",
    "tiers": [
      "初级",
      "进阶",
      "高阶"
    ],
    "url": "https://leetcode.cn/problems/kth-largest-element-in-an-array/"
  },
  {
    "id": 347,
    "title": "前 K 个高频元素",
    "slug": "top-k-frequent-elements",
    "level": "中等",
    "category": "堆",
    "summary": "找出数组中出现次数最多的k个不同元素，返回顺序任意。",
    "example": "[2,2,2,5,5,8]，k=2 → [2,5]",
    "pitfall": "先统计元素频率，再对频率排序；频率相同时不应把元素混淆为同一项。",
    "methods": [
      {
        "name": "频率表后排序",
        "time": "O(n+u log u)",
        "space": "O(u)",
        "steps": [
          "统计每个值出现次数",
          "对u个不同值按次数降序排序",
          "取前k项"
        ],
        "reason": "n为长度，u为不同值个数。"
      },
      {
        "name": "频率小根堆",
        "time": "O(n+u log(k+1))",
        "space": "O(u+k)",
        "steps": [
          "统计频率",
          "维护大小k的频率小根堆",
          "超过k时删除最低频率元素"
        ],
        "reason": "比完整排序更适合k远小于u。"
      },
      {
        "name": "按频率桶分组",
        "time": "O(n)",
        "space": "O(n)",
        "steps": [
          "统计频率",
          "bucket[f]收集出现f次的值",
          "从高频桶往低频桶收集",
          "够k个停止"
        ],
        "reason": "频率最多n，因此可以直接桶化，不需要比较排序。"
      }
    ],
    "frames": [
      {
        "note": "频率统计。",
        "cells": [
          "2:3次",
          "5:2次",
          "8:1次"
        ]
      },
      {
        "note": "按频率进入桶。",
        "cells": [
          "桶3:[2]",
          "桶2:[5]",
          "桶1:[8]"
        ]
      },
      {
        "note": "从高频桶先取2。",
        "cells": [
          "结果[2]"
        ]
      },
      {
        "note": "再取5，已满k=2。",
        "cells": [
          "结果[2,5]"
        ]
      }
    ],
    "kind": "buckets",
    "traceMethod": "按频率桶分组",
    "tiers": [
      "初级",
      "进阶",
      "高阶"
    ],
    "url": "https://leetcode.cn/problems/top-k-frequent-elements/"
  },
  {
    "id": 295,
    "title": "数据流的中位数",
    "slug": "find-median-from-data-stream",
    "level": "困难",
    "category": "堆",
    "summary": "设计数据流结构，支持随时添加整数并查询当前所有数的中位数。",
    "example": "依次加入5,1,8：中位数依次5,3,5",
    "pitfall": "左半最大堆、右半最小堆；先保证元素大小关系，再保证数量相差不超过1。",
    "methods": [
      {
        "name": "有序数组插入",
        "time": "插入O(n)，查询O(1)",
        "space": "O(n)",
        "steps": [
          "二分定位插入点",
          "移动后续元素插入",
          "按长度奇偶取中央值"
        ],
        "reason": "二分定位快，但数组挪动仍然线性。"
      },
      {
        "name": "双堆维护两半",
        "time": "插入O(log n)，查询O(1)",
        "space": "O(n)",
        "steps": [
          "小的一半进最大堆L，大的一半进最小堆R",
          "必要时移动堆顶重新平衡",
          "保持|L|=|R|或|L|=|R|+1",
          "奇数取L顶，偶数取两堆顶均值"
        ],
        "reason": "两堆顶正是中间边界；可用比较器或取负数模拟最大堆。"
      }
    ],
    "frames": [
      {
        "note": "加入5。",
        "cells": [
          "L:[5]",
          "R:[]",
          "中位数5"
        ]
      },
      {
        "note": "加入1后左堆过大，移5到右堆。",
        "cells": [
          "L:[1]",
          "R:[5]"
        ]
      },
      {
        "note": "两边等长，中位数取均值。",
        "cells": [
          "(1+5)/2=3"
        ]
      },
      {
        "note": "加入8再平衡，5移动到左堆。",
        "cells": [
          "L:[5,1]",
          "R:[8]",
          "中位数5"
        ]
      }
    ],
    "kind": "heap",
    "traceMethod": "双堆维护两半",
    "tiers": [
      "初级",
      "进阶"
    ],
    "url": "https://leetcode.cn/problems/find-median-from-data-stream/"
  },
  {
    "id": 121,
    "title": "买卖股票的最佳时机",
    "slug": "best-time-to-buy-and-sell-stock",
    "level": "简单",
    "category": "贪心算法",
    "summary": "只能先买入一次再卖出一次，求最大利润；不交易时利润为0。",
    "example": "价格[7,2,5,1,6] → 5",
    "pitfall": "最低买价只能来自当前日期之前，不能使用未来价格。",
    "methods": [
      {
        "name": "枚举买卖日期",
        "time": "O(n²)",
        "space": "O(1)",
        "steps": [
          "枚举buy",
          "枚举sell>buy",
          "更新price[sell]-price[buy]的最大值"
        ],
        "reason": "所有合法时间先后配对。"
      },
      {
        "name": "前缀最低价",
        "time": "O(n)",
        "space": "O(1)",
        "steps": [
          "minPrice=∞，profit=0",
          "逐日先用price-minPrice更新利润",
          "再更新minPrice",
          "返回profit"
        ],
        "reason": "对固定卖出日，最优买入价一定是此前最低价。"
      }
    ],
    "frames": [
      {
        "note": "第1天7，记录最低价。",
        "cells": [
          "min=7",
          "profit=0"
        ]
      },
      {
        "note": "第2天2刷新最低价，第3天5卖可赚3。",
        "cells": [
          "min=2",
          "profit=3"
        ]
      },
      {
        "note": "第4天1刷新最低价。",
        "cells": [
          "min=1",
          "profit=3"
        ]
      },
      {
        "note": "第5天6卖出赚5。",
        "cells": [
          "6-1=5",
          "profit=5"
        ]
      }
    ],
    "kind": "array",
    "traceMethod": "前缀最低价",
    "tiers": [
      "初级",
      "进阶"
    ],
    "url": "https://leetcode.cn/problems/best-time-to-buy-and-sell-stock/"
  },
  {
    "id": 55,
    "title": "跳跃游戏",
    "slug": "jump-game",
    "level": "中等",
    "category": "贪心算法",
    "summary": "每个位置的数表示最大可向右跳的距离，判断能否从起点到达最后一个位置。",
    "example": "[2,0,2,0,1] → true",
    "pitfall": "只能利用已经可达的位置更新最远距离；遇i>farthest立即失败。",
    "methods": [
      {
        "name": "可达状态DP",
        "time": "O(n²)",
        "space": "O(n)",
        "steps": [
          "reachable[0]=true",
          "每个可达i将i+1到i+nums[i]标为可达",
          "返回末位状态"
        ],
        "reason": "显式枚举所有跳转。"
      },
      {
        "name": "最远可达范围",
        "time": "O(n)",
        "space": "O(1)",
        "steps": [
          "far=0",
          "从左向右扫描i",
          "若i>far返回false",
          "far=max(far,i+nums[i])",
          "far>=n-1即可true"
        ],
        "reason": "当前可达位置形成连续区间，仅保存右端即可。"
      }
    ],
    "frames": [
      {
        "note": "起点0最多跳2格。",
        "cells": [
          "far=2",
          "可达[0,2]"
        ]
      },
      {
        "note": "位置1值0，不能扩张。",
        "cells": [
          "far仍2"
        ]
      },
      {
        "note": "位置2值2，范围扩到4。",
        "cells": [
          "far=max(2,2+2)=4"
        ]
      },
      {
        "note": "最后下标4已覆盖。",
        "cells": [
          "true"
        ]
      }
    ],
    "kind": "interval",
    "traceMethod": "最远可达范围",
    "tiers": [
      "初级",
      "进阶"
    ],
    "url": "https://leetcode.cn/problems/jump-game/"
  },
  {
    "id": 45,
    "title": "跳跃游戏 II",
    "slug": "jump-game-ii",
    "level": "中等",
    "category": "贪心算法",
    "summary": "数组保证能够到达末尾，求从起点到末尾所需的最少跳跃次数。",
    "example": "[2,3,1,1,4] → 2次",
    "pitfall": "扫描到当前层边界才增加跳数；不处理最后一个位置，避免多计一次。",
    "methods": [
      {
        "name": "最少步数DP",
        "time": "O(n²)",
        "space": "O(n)",
        "steps": [
          "dp[0]=0，其余∞",
          "从每个i更新可跳到的j",
          "dp[j]=min(dp[j],dp[i]+1)"
        ],
        "reason": "枚举所有可达边，相当于有向图最短路。"
      },
      {
        "name": "按可达区间分层",
        "time": "O(n)",
        "space": "O(1)",
        "steps": [
          "end=far=steps=0",
          "扫描i=0..n-2，更新far=max(far,i+nums[i])",
          "i=end时steps加1且end=far"
        ],
        "reason": "end是当前跳数的覆盖边界，far是下一跳的覆盖边界。"
      }
    ],
    "frames": [
      {
        "note": "初始层只有下标0。",
        "cells": [
          "end=0",
          "steps=0"
        ]
      },
      {
        "note": "扫描0得到far=2，走到边界，跳数1。",
        "cells": [
          "end=2",
          "steps=1"
        ]
      },
      {
        "note": "扫描1时far扩至4，再扫描2。",
        "cells": [
          "下一层最远4"
        ]
      },
      {
        "note": "到达旧边界2，跳数2，新边界4。",
        "cells": [
          "路径0 → 1 → 4",
          "答案2"
        ]
      }
    ],
    "kind": "interval",
    "traceMethod": "按可达区间分层",
    "tiers": [
      "初级",
      "进阶"
    ],
    "url": "https://leetcode.cn/problems/jump-game-ii/"
  },
  {
    "id": 763,
    "title": "划分字母区间",
    "slug": "partition-labels",
    "level": "中等",
    "category": "贪心算法",
    "summary": "将字符串划分为尽可能多的连续段，使每个字母只出现在一个段中，返回段长度。",
    "example": "\"abacdefe\" → [3,1,1,3]",
    "pitfall": "当前片段必须延伸到已见字母最后一次出现的位置，不能只看相邻字符。",
    "methods": [
      {
        "name": "每次向后查最后位置",
        "time": "O(n²)",
        "space": "O(1)，不含输出",
        "steps": [
          "逐字符扫描",
          "向后查该字母最后位置",
          "维护片段右端",
          "当前下标等于右端时切分"
        ],
        "reason": "避免存表但重复扫描尾部。"
      },
      {
        "name": "预存最后位置贪心",
        "time": "O(n)",
        "space": "O(Σ)，不含输出",
        "steps": [
          "先记录last[ch]",
          "再扫描令end=max(end,last[ch])",
          "i=end时输出end-start+1并start=i+1"
        ],
        "reason": "此时段内所有字母已全部出现完，立刻切分让段数最大；Σ为字符种数。"
      }
    ],
    "frames": [
      {
        "note": "a最后出现在2，b在1。",
        "cells": [
          "a b a | c d e f e"
        ]
      },
      {
        "note": "扫到2达到当前end，切长度3。",
        "cells": [
          "aba",
          "剩cdefe"
        ]
      },
      {
        "note": "c与d各只出现一次，可各自切开。",
        "cells": [
          "aba | c | d"
        ]
      },
      {
        "note": "e最后在7，使末段包含f。",
        "cells": [
          "aba | c | d | efe",
          "[3,1,1,3]"
        ]
      }
    ],
    "kind": "interval",
    "traceMethod": "预存最后位置贪心",
    "tiers": [
      "初级",
      "进阶"
    ],
    "url": "https://leetcode.cn/problems/partition-labels/"
  },
  {
    "id": 70,
    "title": "爬楼梯",
    "slug": "climbing-stairs",
    "level": "简单",
    "category": "动态规划",
    "summary": "每次爬1或2阶，求恰好爬到n阶的不同走法数。",
    "example": "n=4 → 5种",
    "pitfall": "最后一步要么来自n-1，要么来自n-2，两个集合没有重叠。",
    "methods": [
      {
        "name": "递归枚举最后一步",
        "time": "O(2ⁿ)",
        "space": "O(n)",
        "steps": [
          "f(0)=1，f(1)=1",
          "f(n)=f(n-1)+f(n-2)"
        ],
        "reason": "重复求解大量相同子问题，仅作为理解递推的基线。"
      },
      {
        "name": "一维DP",
        "time": "O(n)",
        "space": "O(n)",
        "steps": [
          "dp[0]=dp[1]=1",
          "对i=2..n令dp[i]=dp[i-1]+dp[i-2]",
          "返回dp[n]"
        ],
        "reason": "每个状态只计算一次。"
      },
      {
        "name": "滚动两个状态",
        "time": "O(n)",
        "space": "O(1)",
        "steps": [
          "a=b=1",
          "从2到n，next=a+b",
          "a=b，b=next",
          "返回b"
        ],
        "reason": "当前只依赖前两个状态；n=0可单独返回1。"
      }
    ],
    "frames": [
      {
        "note": "阶0与阶1各有1种。",
        "cells": [
          "f0=1",
          "f1=1"
        ]
      },
      {
        "note": "到阶2来自阶0或阶1。",
        "cells": [
          "f2=1+1=2"
        ]
      },
      {
        "note": "到阶3。",
        "cells": [
          "f3=1+2=3"
        ]
      },
      {
        "note": "到阶4。",
        "cells": [
          "f4=2+3=5"
        ]
      }
    ],
    "kind": "dp",
    "traceMethod": "滚动两个状态",
    "tiers": [
      "初级",
      "进阶",
      "高阶"
    ],
    "url": "https://leetcode.cn/problems/climbing-stairs/"
  },
  {
    "id": 118,
    "title": "杨辉三角",
    "slug": "pascals-triangle",
    "level": "简单",
    "category": "动态规划",
    "summary": "生成前numRows行杨辉三角，两边为1，内部等于上一行相邻两数之和。",
    "example": "numRows=4 → [[1],[1,1],[1,2,1],[1,3,3,1]]",
    "pitfall": "输出本身有Θ(r²)个数，因此完整生成无法做到线性总时间。",
    "methods": [
      {
        "name": "二维逐行构建",
        "time": "O(r²)",
        "space": "O(r²)，包含输出",
        "steps": [
          "首行[1]",
          "每行首尾填1",
          "内部row[j]=prev[j-1]+prev[j]",
          "把新行加入结果"
        ],
        "reason": "输出量决定时间空间下界。"
      },
      {
        "name": "滚动行倒序更新",
        "time": "O(r²)",
        "space": "O(r)辅助，输出O(r²)",
        "steps": [
          "工作行末尾追加1",
          "内部从右往左更新row[j]+=row[j-1]",
          "每行复制进结果"
        ],
        "reason": "倒序防止覆盖仍需要的上一行值；教学价值是理解滚动状态，而非减少输出。"
      }
    ],
    "frames": [
      {
        "note": "首行。",
        "cells": [
          "1"
        ]
      },
      {
        "note": "扩展到第2行。",
        "cells": [
          "1 1"
        ]
      },
      {
        "note": "中间等于1+1。",
        "cells": [
          "1 2 1"
        ]
      },
      {
        "note": "两处内部值分别1+2、2+1。",
        "cells": [
          "1 3 3 1"
        ]
      }
    ],
    "kind": "dp",
    "traceMethod": "滚动行倒序更新",
    "tiers": [
      "初级",
      "进阶"
    ],
    "url": "https://leetcode.cn/problems/pascals-triangle/"
  },
  {
    "id": 198,
    "title": "打家劫舍",
    "slug": "house-robber",
    "level": "中等",
    "category": "动态规划",
    "summary": "一排房屋有不同金额，不能选择相邻房屋，求可取得的最大总额。",
    "example": "[3,2,5,4] → 8",
    "pitfall": "不能只选奇数或偶数位置；最优方案可能在不同区间改变选择。",
    "methods": [
      {
        "name": "前缀最优DP",
        "time": "O(n)",
        "space": "O(n)",
        "steps": [
          "dp[0]=0，dp[1]=nums[0]",
          "dp[i]=max(dp[i-1],dp[i-2]+nums[i-1])",
          "返回dp[n]"
        ],
        "reason": "对最后一间分为不选与选，两种覆盖所有合法情况。"
      },
      {
        "name": "滚动前两项",
        "time": "O(n)",
        "space": "O(1)",
        "steps": [
          "prev2=prev1=0",
          "每个金额x令cur=max(prev1,prev2+x)",
          "prev2=prev1，prev1=cur"
        ],
        "reason": "仅依赖前两个前缀最优值。"
      }
    ],
    "frames": [
      {
        "note": "考虑金额3。",
        "cells": [
          "max(0,0+3)=3"
        ]
      },
      {
        "note": "考虑金额2。",
        "cells": [
          "max(3,0+2)=3"
        ]
      },
      {
        "note": "考虑金额5。",
        "cells": [
          "max(3,3+5)=8"
        ]
      },
      {
        "note": "考虑金额4。",
        "cells": [
          "max(8,3+4)=8",
          "选择3与5"
        ]
      }
    ],
    "kind": "dp",
    "traceMethod": "滚动前两项",
    "tiers": [
      "初级",
      "进阶"
    ],
    "url": "https://leetcode.cn/problems/house-robber/"
  },
  {
    "id": 279,
    "title": "完全平方数",
    "slug": "perfect-squares",
    "level": "中等",
    "category": "动态规划",
    "summary": "把正整数n表示为若干完全平方数之和，求最少项数。",
    "example": "n=13 → 2，因为4+9",
    "pitfall": "平方数可重复选；大平方数优先的贪心不总正确，例如12。",
    "methods": [
      {
        "name": "完全背包DP",
        "time": "O(n√n)",
        "space": "O(n)",
        "steps": [
          "dp[0]=0，其余∞",
          "对i=1..n枚举j²<=i",
          "dp[i]=min(dp[i],dp[i-j²]+1)"
        ],
        "reason": "最后选的平方数枚举完即可覆盖所有表达。"
      },
      {
        "name": "数论判定",
        "time": "O(√n)",
        "space": "O(1)",
        "steps": [
          "若n为平方返回1",
          "不断除以4后若余数模8为7返回4",
          "枚举a检查n-a²是否平方，能则返回2",
          "否则返回3"
        ],
        "reason": "依据四平方和定理与三平方和判定；平方检查应使用整数运算避免浮点误差。"
      }
    ],
    "frames": [
      {
        "note": "演示数论：13不是完全平方。",
        "cells": [
          "3²=9",
          "4²=16"
        ]
      },
      {
        "note": "13不能再除4，13 mod8=5，不必用4项。",
        "cells": [
          "候选2或3"
        ]
      },
      {
        "note": "试a=1，13-1=12不是平方。",
        "cells": [
          "1² + 12"
        ]
      },
      {
        "note": "试a=2，13-4=9是平方。",
        "cells": [
          "2²+3²=13",
          "答案2"
        ]
      }
    ],
    "kind": "array",
    "traceMethod": "数论判定",
    "tiers": [
      "初级",
      "进阶"
    ],
    "url": "https://leetcode.cn/problems/perfect-squares/"
  },
  {
    "id": 322,
    "title": "零钱兑换",
    "slug": "coin-change",
    "level": "中等",
    "category": "动态规划",
    "summary": "硬币面额可重复使用，求凑出指定金额的最少硬币数，无法凑出返回-1。",
    "example": "coins=[1,3,4]，amount=6 → 2（3+3）",
    "pitfall": "最大面额优先会选4+1+1，未必最优；不可达状态应设为∞。",
    "methods": [
      {
        "name": "记忆化递归",
        "time": "O(Ak)",
        "space": "O(A)",
        "steps": [
          "f(0)=0，f(负数)=∞",
          "f(a)=1+min(f(a-c))",
          "缓存每个金额结果",
          "无穷转为-1"
        ],
        "reason": "A为金额、k为面额数，每状态枚举k个币；递归深度最多A（正整数面额）。"
      },
      {
        "name": "自底向上DP",
        "time": "O(Ak)",
        "space": "O(A)",
        "steps": [
          "dp[0]=0，其余∞",
          "金额a从1到A",
          "枚举c<=a更新dp[a]=min(dp[a],dp[a-c]+1)",
          "返回可达结果"
        ],
        "reason": "先算较小金额，可重复使用同一面额；避免深递归。"
      }
    ],
    "frames": [
      {
        "note": "初始化。",
        "cells": [
          "dp[0]=0",
          "其他∞"
        ]
      },
      {
        "note": "算到金额3。",
        "cells": [
          "dp1=1",
          "dp2=2",
          "dp3=1"
        ]
      },
      {
        "note": "算到金额5。",
        "cells": [
          "dp4=1",
          "dp5=2"
        ]
      },
      {
        "note": "金额6选最后一枚3。",
        "cells": [
          "dp6=dp3+1=2",
          "3+3"
        ]
      }
    ],
    "kind": "dp",
    "traceMethod": "自底向上DP",
    "tiers": [
      "初级",
      "进阶"
    ],
    "url": "https://leetcode.cn/problems/coin-change/"
  },
  {
    "id": 139,
    "title": "单词拆分",
    "slug": "word-break",
    "level": "中等",
    "category": "动态规划",
    "summary": "判断字符串能否切分成字典里的若干单词，字典单词可以重复使用。",
    "example": "s=\"applepenapple\"，字典[apple,pen] → true",
    "pitfall": "DP表示前缀可拆分，不是某一段在字典里就足够；要同时检查切分点之前可达。",
    "methods": [
      {
        "name": "回溯枚举切分（基线）",
        "time": "O(n·2ⁿ)，保守上界",
        "space": "O(n)递归，另加字典",
        "steps": [
          "从当前位置枚举下一个单词末尾",
          "片段在字典中则递归",
          "到字符串末尾成功"
        ],
        "reason": "失败输入会重复尝试相同后缀；子串构造按线性代价计。"
      },
      {
        "name": "前缀可达DP",
        "time": "O(n²L)，保守上界",
        "space": "O(n+字典大小)",
        "steps": [
          "dp[0]=true",
          "对每个末尾i枚举j<i且i-j<=L",
          "dp[j]且s[j:i]在字典中则dp[i]=true",
          "返回dp[n]"
        ],
        "reason": "L为最长单词长度；这里保守计入子串构造/哈希O(L)，不会笼统宣称所有语言都是O(n²)。"
      }
    ],
    "frames": [
      {
        "note": "空前缀可拆分。",
        "cells": [
          "dp[0]=true"
        ]
      },
      {
        "note": "apple在字典中，从0到5可达。",
        "cells": [
          "apple | penapple",
          "dp[5]=true"
        ]
      },
      {
        "note": "pen在字典中，从5到8可达。",
        "cells": [
          "apple | pen | apple",
          "dp[8]=true"
        ]
      },
      {
        "note": "最后一个apple从8到13可达。",
        "cells": [
          "dp[13]=true",
          "答案true"
        ]
      }
    ],
    "kind": "dp",
    "traceMethod": "前缀可达DP",
    "tiers": [
      "初级",
      "进阶"
    ],
    "url": "https://leetcode.cn/problems/word-break/"
  },
  {
    "id": 300,
    "title": "最长递增子序列",
    "slug": "longest-increasing-subsequence",
    "level": "中等",
    "category": "动态规划",
    "summary": "在数组中保留相对顺序选出严格递增子序列，返回最大长度，元素不必连续。",
    "example": "[4,1,3,2,5] → 3",
    "pitfall": "tails数组用于证明长度，不一定就是原数组里实际的一条最长子序列。",
    "methods": [
      {
        "name": "以每个位置结尾的DP",
        "time": "O(n²)",
        "space": "O(n)",
        "steps": [
          "dp[i]=1",
          "枚举j<i且nums[j]<nums[i]",
          "dp[i]=max(dp[i],dp[j]+1)",
          "答案取所有dp最大"
        ],
        "reason": "固定末尾枚举倒数第二个元素。"
      },
      {
        "name": "最小结尾数组加二分",
        "time": "O(n log n)",
        "space": "O(n)",
        "steps": [
          "tails[len-1]存长度len的最小结尾",
          "每个x二分找首个>=x的位置",
          "替换该值或在末尾追加",
          "答案为tails长度"
        ],
        "reason": "相同长度结尾越小越容易延伸；严格递增要用>=的下界。"
      }
    ],
    "frames": [
      {
        "note": "读4，再读1，用更小结尾替代。",
        "cells": [
          "tails=[1]"
        ]
      },
      {
        "note": "读3，追加新长度。",
        "cells": [
          "tails=[1,3]"
        ]
      },
      {
        "note": "读2，替换长度2的结尾。",
        "cells": [
          "tails=[1,2]"
        ]
      },
      {
        "note": "读5，得到长度3。",
        "cells": [
          "tails=[1,2,5]",
          "答案3"
        ]
      }
    ],
    "kind": "array",
    "traceMethod": "最小结尾数组加二分",
    "tiers": [
      "初级",
      "进阶"
    ],
    "url": "https://leetcode.cn/problems/longest-increasing-subsequence/"
  },
  {
    "id": 152,
    "title": "乘积最大子数组",
    "slug": "maximum-product-subarray",
    "level": "中等",
    "category": "动态规划",
    "summary": "在数组中找乘积最大的非空连续子数组，元素可能为负或0。",
    "example": "[-2,3,-4] → 24",
    "pitfall": "负数会交换最大与最小乘积的角色；更新时必须保留旧的两值。",
    "methods": [
      {
        "name": "枚举所有连续区间",
        "time": "O(n²)",
        "space": "O(1)",
        "steps": [
          "固定左端",
          "向右扩展并累乘",
          "每次更新全局最大值"
        ],
        "reason": "不需要每次重新乘整个区间。"
      },
      {
        "name": "同时保存最大与最小结尾乘积",
        "time": "O(n)",
        "space": "O(1)",
        "steps": [
          "mx=mn=ans=首项",
          "对x保存oldMx,oldMn",
          "mx=max(x,oldMx*x,oldMn*x)",
          "mn=min同三项",
          "ans=max(ans,mx)"
        ],
        "reason": "以当前位置结尾的最优值可能来自此前最小值乘负数。"
      }
    ],
    "frames": [
      {
        "note": "首项-2初始化。",
        "cells": [
          "mx=-2",
          "mn=-2",
          "ans=-2"
        ]
      },
      {
        "note": "读3，候选3,-6,-6。",
        "cells": [
          "mx=3",
          "mn=-6",
          "ans=3"
        ]
      },
      {
        "note": "读-4，候选-4,-12,24。",
        "cells": [
          "mx=24",
          "mn=-12"
        ]
      },
      {
        "note": "保留全局最大值。",
        "cells": [
          "(-2)×3×(-4)=24"
        ]
      }
    ],
    "kind": "dp",
    "traceMethod": "同时保存最大与最小结尾乘积",
    "tiers": [
      "初级",
      "进阶"
    ],
    "url": "https://leetcode.cn/problems/maximum-product-subarray/"
  },
  {
    "id": 416,
    "title": "分割等和子集",
    "slug": "partition-equal-subset-sum",
    "level": "中等",
    "category": "动态规划",
    "summary": "判断正整数数组能否分成两个和相等的子集，每个元素必须且只能属于一边。",
    "example": "[1,5,11,5] → true，11与1+5+5",
    "pitfall": "滚动背包容量必须倒序，否则同一个元素会被重复使用。",
    "methods": [
      {
        "name": "二维0/1背包",
        "time": "O(nS)",
        "space": "O(nS)",
        "steps": [
          "总和为奇数直接false",
          "S=总和/2",
          "dp[i][s]表示前i个数能否凑s",
          "不选或从dp[i-1][s-x]选当前数"
        ],
        "reason": "每个元素只能用一次，状态依赖上一行。"
      },
      {
        "name": "倒序滚动背包",
        "time": "O(nS)",
        "space": "O(S)",
        "steps": [
          "dp[0]=true",
          "对每个x，s从S降到x",
          "dp[s]=dp[s]或dp[s-x]",
          "返回dp[S]"
        ],
        "reason": "倒序使dp[s-x]仍是未使用当前元素的旧状态。"
      }
    ],
    "frames": [
      {
        "note": "总和22，目标11。",
        "cells": [
          "可达{0}"
        ]
      },
      {
        "note": "处理1。",
        "cells": [
          "可达{0,1}"
        ]
      },
      {
        "note": "处理第一个5。",
        "cells": [
          "可达{0,1,5,6}"
        ]
      },
      {
        "note": "处理11，目标直接可达。",
        "cells": [
          "11 | 1+5+5",
          "true"
        ]
      }
    ],
    "kind": "dp",
    "traceMethod": "倒序滚动背包",
    "tiers": [
      "初级",
      "进阶"
    ],
    "url": "https://leetcode.cn/problems/partition-equal-subset-sum/"
  },
  {
    "id": 32,
    "title": "最长有效括号",
    "slug": "longest-valid-parentheses",
    "level": "困难",
    "category": "动态规划",
    "summary": "求括号字符串中最长的连续有效括号子串长度。",
    "example": "\")()())\" → 4",
    "pitfall": "栈底保存最后一个无法匹配的右括号位置，作为有效段左边界。",
    "methods": [
      {
        "name": "枚举起点并扫描余额",
        "time": "O(n²)",
        "space": "O(1)",
        "steps": [
          "每个起点向右扫描",
          "左括号余额+1，右括号-1",
          "余额负数停止",
          "余额0时更新长度"
        ],
        "reason": "每个起点都检查其可能的有效结尾。"
      },
      {
        "name": "下标栈与边界哨兵",
        "time": "O(n)",
        "space": "O(n)",
        "steps": [
          "栈初始化[-1]",
          "左括号下标入栈",
          "右括号先弹栈",
          "若栈空就把当前下标入栈作为边界",
          "否则更新i-stack.top"
        ],
        "reason": "匹配后剩余栈顶是当前有效后缀之前的位置。"
      },
      {
        "name": "左右各扫描一次",
        "time": "O(n)",
        "space": "O(1)",
        "steps": [
          "从左计左右括号，相等时更新，右多则清零",
          "从右再计数，相等更新，左多则清零"
        ],
        "reason": "两遍互补处理多余左括号和多余右括号。"
      }
    ],
    "frames": [
      {
        "note": "演示双向计数，首个)使计数清零。",
        "cells": [
          "边界在下标0"
        ]
      },
      {
        "note": "扫描下标1..2的()。",
        "cells": [
          "left=1",
          "right=1",
          "最长2"
        ]
      },
      {
        "note": "扫描到下标4。",
        "cells": [
          "left=2",
          "right=2",
          "最长4"
        ]
      },
      {
        "note": "下标5多出右括号；反向扫描确认无更长段。",
        "cells": [
          ") | ()() | )",
          "答案4"
        ]
      }
    ],
    "kind": "array",
    "traceMethod": "左右各扫描一次",
    "tiers": [
      "初级",
      "进阶",
      "高阶"
    ],
    "url": "https://leetcode.cn/problems/longest-valid-parentheses/"
  },
  {
    "id": 62,
    "title": "不同路径",
    "slug": "unique-paths",
    "level": "中等",
    "category": "多维动态规划",
    "summary": "在m×n网格中只能向右或向下，从左上到右下有多少条路径。",
    "example": "m=3,n=3 → 6",
    "pitfall": "第一行和第一列只有一种到达方式；这道题没有障碍物。",
    "methods": [
      {
        "name": "二维路径DP",
        "time": "O(mn)",
        "space": "O(mn)",
        "steps": [
          "首行首列填1",
          "dp[r][c]=dp[r-1][c]+dp[r][c-1]",
          "返回右下角"
        ],
        "reason": "到达当前格的最后一步只能来自上方或左方。"
      },
      {
        "name": "一行滚动DP",
        "time": "O(mn)",
        "space": "O(n)",
        "steps": [
          "dp数组全1",
          "从第2行起，列c从1往右",
          "dp[c]+=dp[c-1]",
          "返回dp[n-1]"
        ],
        "reason": "旧dp[c]是上方，新dp[c-1]是左方；可选短边滚动至O(min(m,n))。"
      },
      {
        "name": "组合数",
        "time": "O(min(m,n))次算术操作",
        "space": "O(1)数值变量",
        "steps": [
          "共需m-1次向下和n-1次向右",
          "计算C(m+n-2,min(m-1,n-1))",
          "逐项乘除且保持整数"
        ],
        "reason": "操作数按定长整数口径；大整数位复杂度另计，避免浮点舍入。"
      }
    ],
    "frames": [
      {
        "note": "演示组合计数：3×3要走4步。",
        "cells": [
          "右R",
          "右R",
          "下D",
          "下D"
        ]
      },
      {
        "note": "选择两个位置放D，剩余放R。",
        "cells": [
          "DDRR",
          "DRDR",
          "DRRD"
        ]
      },
      {
        "note": "另外三种位置选择。",
        "cells": [
          "RDDR",
          "RDRD",
          "RRDD"
        ]
      },
      {
        "note": "组合数给出总数。",
        "cells": [
          "C(4,2)=4×3÷2=6"
        ]
      }
    ],
    "kind": "buckets",
    "traceMethod": "组合数",
    "tiers": [
      "初级",
      "进阶",
      "高阶"
    ],
    "url": "https://leetcode.cn/problems/unique-paths/"
  },
  {
    "id": 64,
    "title": "最小路径和",
    "slug": "minimum-path-sum",
    "level": "中等",
    "category": "多维动态规划",
    "summary": "非负权重网格中只能向右或向下，求左上到右下路径上的最小数字总和。",
    "example": "网格[1,3,1;1,5,1] → 6",
    "pitfall": "与路径计数不同，这里用min而非加两种方案；起点权重也计入。",
    "methods": [
      {
        "name": "二维最小代价DP",
        "time": "O(mn)",
        "space": "O(mn)",
        "steps": [
          "dp[0][0]=grid[0][0]",
          "首行首列累加",
          "其余dp[r][c]=grid[r][c]+min(上,左)"
        ],
        "reason": "按最后一步来源取最小代价。"
      },
      {
        "name": "滚动一行",
        "time": "O(mn)",
        "space": "O(n)",
        "steps": [
          "dp初为∞，dp[0]=0",
          "逐行逐列更新dp[c]=grid[r][c]+min(dp[c],c>0?dp[c-1]:∞)",
          "返回末项"
        ],
        "reason": "更新前同列值来自上一行，左边值来自当前行。"
      }
    ],
    "frames": [
      {
        "note": "初始权重网格。",
        "cells": [
          "1 3 1",
          "1 5 1"
        ]
      },
      {
        "note": "第一行累积。",
        "cells": [
          "dp:1 4 5"
        ]
      },
      {
        "note": "第二行前两格。",
        "cells": [
          "dp0=2",
          "dp1=5+min(4,2)=7"
        ]
      },
      {
        "note": "右下角取上方更小代价。",
        "cells": [
          "dp2=1+min(5,7)=6",
          "路径右→右→下"
        ]
      }
    ],
    "kind": "dp",
    "traceMethod": "滚动一行",
    "tiers": [
      "初级",
      "进阶"
    ],
    "url": "https://leetcode.cn/problems/minimum-path-sum/"
  },
  {
    "id": 5,
    "title": "最长回文子串",
    "slug": "longest-palindromic-substring",
    "level": "中等",
    "category": "多维动态规划",
    "summary": "找字符串中最长的连续回文片段，若有多个可返回任意一个。",
    "example": "\"cabbad\" → \"abba\"",
    "pitfall": "回文可能为奇数或偶数长度，中心需要同时考虑单个字符与字符间隙。",
    "methods": [
      {
        "name": "枚举片段并检查",
        "time": "O(n³)",
        "space": "O(1)，不含返回片段",
        "steps": [
          "枚举左右端点",
          "双指针向内比较",
          "回文时更新最长区间"
        ],
        "reason": "O(n²)个区间，每个检查O(n)。"
      },
      {
        "name": "中心扩展",
        "time": "O(n²)",
        "space": "O(1)，不含返回片段",
        "steps": [
          "每个位置扩展(i,i)与(i,i+1)",
          "两端相等且未越界就继续",
          "记录最长左右边界"
        ],
        "reason": "最多2n-1个中心，每个最坏扩展n次。"
      },
      {
        "name": "Manacher回文半径",
        "time": "O(n)",
        "space": "O(n)",
        "steps": [
          "用分隔符统一奇偶中心",
          "维护最右回文边界R和中心C",
          "在R内用镜像半径初始化",
          "继续扩展并更新C,R",
          "换算原串区间"
        ],
        "reason": "镜像复用已知匹配，右边界总共只向右推进O(n)；哨兵不能与原字符冲突。"
      }
    ],
    "frames": [
      {
        "note": "演示Manacher，插入分隔符。",
        "cells": [
          "# c # a # b # b # a # d #"
        ]
      },
      {
        "note": "到下标6的#中心，向两侧扩展。",
        "cells": [
          "b ← # → b",
          "半径先到1"
        ]
      },
      {
        "note": "依次匹配#、a、#，再遇c与d失配。",
        "cells": [
          "a b | b a",
          "P[6]=4"
        ]
      },
      {
        "note": "按中心和半径映回原串。",
        "cells": [
          "start=(6-4)/2=1",
          "长度4",
          "abba"
        ]
      }
    ],
    "kind": "array",
    "traceMethod": "Manacher回文半径",
    "tiers": [
      "初级",
      "进阶",
      "高阶"
    ],
    "url": "https://leetcode.cn/problems/longest-palindromic-substring/"
  },
  {
    "id": 1143,
    "title": "最长公共子序列",
    "slug": "longest-common-subsequence",
    "level": "中等",
    "category": "多维动态规划",
    "summary": "给定两个字符串，返回最长公共子序列长度，允许删除字符但不能改变相对顺序。",
    "example": "\"abcde\"与\"ace\" → 3",
    "pitfall": "子序列不要求连续；字符不相等时可以跳过任意一侧，但不能同时盲目跳过。",
    "methods": [
      {
        "name": "二维前缀DP",
        "time": "O(mn)",
        "space": "O(mn)",
        "steps": [
          "dp首行首列0",
          "相等时dp[i][j]=dp[i-1][j-1]+1",
          "否则取max(dp[i-1][j],dp[i][j-1])"
        ],
        "reason": "相等可接到较短前缀的公共子序列上，不等则舍弃一侧末字符。"
      },
      {
        "name": "滚动行并保存左上角",
        "time": "O(mn)",
        "space": "O(min(m,n))",
        "steps": [
          "以短串为列",
          "每行令diag=0",
          "更新前保存old=dp[j]",
          "相等用diag+1，否则max(dp[j],dp[j-1])",
          "diag=old"
        ],
        "reason": "当前格依赖上、左、左上三个位置，左上必须提前缓存。"
      }
    ],
    "frames": [
      {
        "note": "列为a,c,e，初始全0。",
        "cells": [
          "dp=[0,0,0,0]"
        ]
      },
      {
        "note": "处理a，再处理b。",
        "cells": [
          "a后[0,1,1,1]",
          "b后[0,1,1,1]"
        ]
      },
      {
        "note": "处理c，再处理d。",
        "cells": [
          "c后[0,1,2,2]",
          "d后[0,1,2,2]"
        ]
      },
      {
        "note": "处理e，末格为3。",
        "cells": [
          "[0,1,2,3]",
          "公共子序列ace"
        ]
      }
    ],
    "kind": "dp",
    "traceMethod": "滚动行并保存左上角",
    "tiers": [
      "初级",
      "进阶"
    ],
    "url": "https://leetcode.cn/problems/longest-common-subsequence/"
  },
  {
    "id": 72,
    "title": "编辑距离",
    "slug": "edit-distance",
    "level": "中等",
    "category": "多维动态规划",
    "summary": "把一个字符串变为另一个，允许插入、删除或替换单个字符，求最少操作数。",
    "example": "\"cat\" → \"cut\"，只替换a为u，答案1",
    "pitfall": "dp[i][0]=i与dp[0][j]=j不是0；空串变换同样需要插入或删除。",
    "methods": [
      {
        "name": "二维编辑距离DP",
        "time": "O(mn)",
        "space": "O(mn)",
        "steps": [
          "初始化空前缀边界",
          "字符相同取左上",
          "不同取1+min(上,左,左上)",
          "分别对应删除、插入、替换"
        ],
        "reason": "每个最优转换的最后一步属于这三类之一。"
      },
      {
        "name": "滚动行保留对角旧值",
        "time": "O(mn)",
        "space": "O(min(m,n))",
        "steps": [
          "短串作为列，dp[j]=j",
          "新行dp[0]=i并保存旧左上",
          "相等取diag",
          "不同取1+min(旧dp[j],新dp[j-1],diag)",
          "更新diag"
        ],
        "reason": "空间压缩不会保留具体编辑路径；如需回溯操作可用完整表。"
      }
    ],
    "frames": [
      {
        "note": "目标cut为列，空源串代价。",
        "cells": [
          "[0,1,2,3]"
        ]
      },
      {
        "note": "处理源字符c。",
        "cells": [
          "[1,0,1,2]"
        ]
      },
      {
        "note": "处理源前缀ca。",
        "cells": [
          "[2,1,1,2]",
          "a→u贡献1"
        ]
      },
      {
        "note": "处理cat，t与t相等取左上。",
        "cells": [
          "[3,2,2,1]",
          "距离1"
        ]
      }
    ],
    "kind": "dp",
    "traceMethod": "滚动行保留对角旧值",
    "tiers": [
      "初级",
      "进阶"
    ],
    "url": "https://leetcode.cn/problems/edit-distance/"
  },
  {
    "id": 136,
    "title": "只出现一次的数字",
    "slug": "single-number",
    "level": "简单",
    "category": "技巧",
    "summary": "数组中除一个值出现一次外，其余值都恰好出现两次，找出单独的值。",
    "example": "[7,2,7,9,9] → 2",
    "pitfall": "异或方法依赖其余值恰好出现两次；三个重复或多个单例不能直接套用。",
    "methods": [
      {
        "name": "哈希计数",
        "time": "期望O(n)",
        "space": "O(n)",
        "steps": [
          "统计每个值出现次数",
          "返回次数为1的值"
        ],
        "reason": "通用但没有利用成对抵消的性质。"
      },
      {
        "name": "整体异或",
        "time": "O(n)",
        "space": "O(1)",
        "steps": [
          "ans=0",
          "依次令ans=ans XOR x",
          "返回ans"
        ],
        "reason": "x XOR x=0、x XOR 0=x，交换结合律让成对值全部抵消。"
      }
    ],
    "frames": [
      {
        "note": "初始累积值0。",
        "cells": [
          "ans=0"
        ]
      },
      {
        "note": "读7，再读2。",
        "cells": [
          "0 XOR 7=7",
          "7 XOR 2=5"
        ]
      },
      {
        "note": "再读7，成对的7抵消。",
        "cells": [
          "5 XOR 7=2"
        ]
      },
      {
        "note": "两个9也抵消，剩下2。",
        "cells": [
          "2 XOR 9 XOR 9=2"
        ]
      }
    ],
    "kind": "array",
    "traceMethod": "整体异或",
    "tiers": [
      "初级",
      "进阶"
    ],
    "url": "https://leetcode.cn/problems/single-number/"
  },
  {
    "id": 169,
    "title": "多数元素",
    "slug": "majority-element",
    "level": "简单",
    "category": "技巧",
    "summary": "数组保证有一个值出现次数超过长度一半，返回该多数元素。",
    "example": "[2,1,2,3,2] → 2",
    "pitfall": "Boyer–Moore依赖多数存在的保证；一般场景需要再扫描验证候选。",
    "methods": [
      {
        "name": "哈希计数",
        "time": "期望O(n)",
        "space": "O(n)",
        "steps": [
          "逐项计数",
          "某值次数超过n/2时返回"
        ],
        "reason": "直接使用定义判断。"
      },
      {
        "name": "排序取中位位置",
        "time": "O(n log n)",
        "space": "O(n)",
        "steps": [
          "复制并排序",
          "返回nums[floor(n/2)]"
        ],
        "reason": "多数占据超过半数区间，必然覆盖中间位置。"
      },
      {
        "name": "Boyer–Moore抵消投票",
        "time": "O(n)",
        "space": "O(1)",
        "steps": [
          "count=0",
          "count=0时候选改为当前值",
          "当前值等于候选则count++，否则count--",
          "返回候选"
        ],
        "reason": "每次抵消两个不同值不会改变真正多数最终胜出的事实。"
      }
    ],
    "frames": [
      {
        "note": "读2，候选2，票数1。",
        "cells": [
          "candidate=2",
          "count=1"
        ]
      },
      {
        "note": "读1，与候选不同，抵消。",
        "cells": [
          "count=0"
        ]
      },
      {
        "note": "读2重新候选，随后3抵消。",
        "cells": [
          "2 ↔ 3",
          "count=0"
        ]
      },
      {
        "note": "最后读2，候选为2。",
        "cells": [
          "candidate=2",
          "count=1"
        ]
      }
    ],
    "kind": "array",
    "traceMethod": "Boyer–Moore抵消投票",
    "tiers": [
      "初级",
      "进阶",
      "高阶"
    ],
    "url": "https://leetcode.cn/problems/majority-element/"
  },
  {
    "id": 75,
    "title": "颜色分类",
    "slug": "sort-colors",
    "level": "中等",
    "category": "技巧",
    "summary": "原地把只含0、1、2的数组排序，使相同颜色相邻并按0、1、2排列。",
    "example": "[2,0,1,2,0] → [0,0,1,2,2]",
    "pitfall": "与右端交换得到的新值还未检查，不能立刻增加扫描指针。",
    "methods": [
      {
        "name": "计数后覆盖",
        "time": "O(n)",
        "space": "O(1)",
        "steps": [
          "统计三种值数量",
          "依次写入对应数量的0、1、2"
        ],
        "reason": "两遍扫描，常数三个计数器。"
      },
      {
        "name": "荷兰国旗三指针",
        "time": "O(n)",
        "space": "O(1)",
        "steps": [
          "low=mid=0，high=n-1",
          "0与low交换并low++,mid++",
          "1只mid++",
          "2与high交换并high--",
          "直到mid>high"
        ],
        "reason": "[0,low)为0，[low,mid)为1，(high,n)为2，中间未知。"
      }
    ],
    "frames": [
      {
        "note": "low=mid=0，high=4。",
        "cells": [
          "[2]",
          "0",
          "1",
          "2",
          "0"
        ]
      },
      {
        "note": "2与右端0交换，high减1，mid不动。",
        "cells": [
          "[0]",
          "0",
          "1",
          "2",
          "2"
        ]
      },
      {
        "note": "两个0归左，1跳过。",
        "cells": [
          "0",
          "0",
          "1",
          "[2]",
          "2"
        ]
      },
      {
        "note": "最后2归右，未知区清空。",
        "cells": [
          "0",
          "0",
          "1",
          "2",
          "2"
        ]
      }
    ],
    "kind": "array",
    "traceMethod": "荷兰国旗三指针",
    "tiers": [
      "初级",
      "进阶"
    ],
    "url": "https://leetcode.cn/problems/sort-colors/"
  },
  {
    "id": 31,
    "title": "下一个排列",
    "slug": "next-permutation",
    "level": "中等",
    "category": "技巧",
    "summary": "原地把数组改为字典序紧邻其后的排列；若已是最大排列，则改为最小排列。",
    "example": "[1,3,2] → [2,1,3]",
    "pitfall": "从右寻找首个上升相邻对；后缀下降，因此从右找第一个更大值即可最小提升。",
    "methods": [
      {
        "name": "枚举全部排列并排序（基线）",
        "time": "O(n·n!·log(n!))",
        "space": "O(n·n!)",
        "steps": [
          "生成所有不同排列",
          "按字典序排序",
          "找到当前排列的后一个",
          "末尾则回到第一个"
        ],
        "reason": "为理解定义的极慢基线，不满足实用的原地常数空间要求。"
      },
      {
        "name": "找转折点、交换、反转后缀",
        "time": "O(n)",
        "space": "O(1)",
        "steps": [
          "从右找首个i使a[i]<a[i+1]",
          "若存在，从右找首个a[j]>a[i]并交换",
          "反转i+1到末尾",
          "无i则反转全数组"
        ],
        "reason": "尽量保留长前缀，把转折位最小提升，再令后缀最小。"
      }
    ],
    "frames": [
      {
        "note": "从右找转折点：1<3。",
        "cells": [
          "[1]",
          "3",
          "2"
        ]
      },
      {
        "note": "后缀中最小且大于1的值是2。",
        "cells": [
          "1",
          "3",
          "[2]"
        ]
      },
      {
        "note": "交换1与2。",
        "cells": [
          "2",
          "3",
          "1"
        ]
      },
      {
        "note": "反转后缀[3,1]。",
        "cells": [
          "2",
          "1",
          "3"
        ]
      }
    ],
    "kind": "array",
    "traceMethod": "找转折点、交换、反转后缀",
    "tiers": [
      "初级",
      "进阶"
    ],
    "url": "https://leetcode.cn/problems/next-permutation/"
  },
  {
    "id": 287,
    "title": "寻找重复数",
    "slug": "find-the-duplicate-number",
    "level": "中等",
    "category": "技巧",
    "summary": "长度n+1的数组取值均在1到n，只有一个值重复，找出它；不能修改数组且要求常数额外空间。",
    "example": "[1,3,4,2,2] → 2",
    "pitfall": "把下标到数值视作函数图；第二阶段从下标0出发，必须与第一阶段的初始化约定一致。",
    "methods": [
      {
        "name": "集合查重（基线）",
        "time": "期望O(n)",
        "space": "O(n)",
        "steps": [
          "逐项检查是否已在集合",
          "存在则返回",
          "否则加入集合"
        ],
        "reason": "易懂但不满足常数额外空间要求。"
      },
      {
        "name": "值域二分与抽屉原理",
        "time": "O(n log n)",
        "space": "O(1)",
        "steps": [
          "在值域[1,n]二分mid",
          "统计<=mid的元素个数",
          "若count>mid，重复值在左半，否则右半",
          "收缩到一点"
        ],
        "reason": "不修改数组；重复值可出现多于两次，此计数条件仍成立。"
      },
      {
        "name": "Floyd环入口",
        "time": "O(n)",
        "space": "O(1)",
        "steps": [
          "slow=fast=0",
          "do slow=nums[slow],fast=nums[nums[fast]] until相遇",
          "finder=0",
          "finder与slow各走一步直到再次相遇",
          "返回相遇值"
        ],
        "reason": "0无入边，重复值让路径进入环；环入口就是重复数，利用链表判环结论。"
      }
    ],
    "frames": [
      {
        "note": "函数图由下标指向数值。",
        "cells": [
          "0 → 1 → 3 → 2 → 4 → 2"
        ]
      },
      {
        "note": "快慢指针从0出发，首次更新到1与3。",
        "cells": [
          "slow=1",
          "fast=3"
        ]
      },
      {
        "note": "继续推进，第4轮在节点4相遇。",
        "cells": [
          "第2轮:3,4",
          "第3轮:2,4",
          "第4轮:4,4"
        ]
      },
      {
        "note": "finder从0与slow从4各走一步，3步后在2会合。",
        "cells": [
          "0→1→3→2",
          "4→2→4→2",
          "重复数2"
        ]
      }
    ],
    "kind": "linked",
    "traceMethod": "Floyd环入口",
    "tiers": [
      "初级",
      "进阶",
      "高阶"
    ],
    "url": "https://leetcode.cn/problems/find-the-duplicate-number/"
  }
];
