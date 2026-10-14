# Agent Fieldnotes · AI Agent 开发手册

从理解原理到构建、评测、部署的中文技术知识站。纯 HTML / CSS / JavaScript，无构建依赖、无后端、无登录、无 API Key。发布至公开 GitHub Pages 后，访客无需 GitHub 或 ChatGPT 账号即可阅读。

## 功能

- **32 章、6 个模块**：运行时基础；工具、权限与上下文；LangGraph；任务协作；RAG 与完整应用；评测、安全与上线。
- 每章包含原理、分步实现、具体场景、注释代码、交互实验、误区、验收项与来源链接。
- **8 类确定性本地实验**：Agent Loop、上下文压缩、跨会话记忆、Reducer、审批与崩溃恢复、依赖 DAG、证据召回、评测门槛。
- 章节搜索、模块筛选、收藏、学习进度、独立章节链接、代码复制与上线清单。
- 保留算法练习场与 Hot 100 可视化详解，原页面和学习记录不受影响。
- 无模型调用、无真实外部写入、无上传合同功能；实验是机制教学，不是框架运行或产品基准。

## 参考与内容边界（2026-10-14）

- [learn-claude-code](https://github.com/shareAI-lab/learn-claude-code/tree/ce8f9f186058939da54c9d6fead78dfb5d0fd6c3)：当前根目录 s01–s17，不混用旧 agents/docs 12课编号。
- [langgraph-in-action](https://github.com/webup/langgraph-in-action/tree/9f02d60e115dd1c4d9b5231a0d415e9fe785e3cc)：chapter2–7，原依赖基线 Python>=3.13、LangGraph>=0.6.6、LangChain>=0.3.27。框架 API 迁移另链接官方文档。
- 本站原创解释、场景、示意代码与交互实现；未整段复制第三方教程。每章标出具体参考。RAG、安全、评测与生产工程是原创扩展，不声称参考项目已实现全部能力。
- 明确区分 mock MCP 与真实传输、worktree 与安全沙箱、内存存档与持久存储、节点重跑与外部幂等。

## GitHub Pages 部署

本仓库使用 GitHub Pages 原生分支部署，不需要自定义工作流。

1. 在 Settings → Pages → Build and deployment 中选择 **Deploy from a branch**。
2. 选择 **main** 和 **/(root)**，点击 Save。
3. GitHub 自动构建和发布。后续提交到 main 会自动更新网站。

实际发布地址请以 Settings → Pages 中显示的地址为准。访客无需 GitHub 或 ChatGPT 登录。

Fork 本仓库后，在你自己的仓库按以上步骤启用 Pages 即可。所有资源使用相对路径，支持项目路径。

## 本地运行

在项目根目录运行：

```bash
python -m http.server 8000
```

访问 `http://localhost:8000`。Windows 也可使用 `py -m http.server 8000`。停止服务按 Ctrl+C。无需 `npm install`；Node 用于运行手册回归检查：`node test-handbook.cjs`（建议 Node 18+）。

## 目录与维护

| 路径 | 用途 |
| --- | --- |
| `index.html` | 自包含手册：样式、HANDBOOK 数据、纯实验引擎、阅读交互，均为可读源码 |
| `test-handbook.cjs` | 从首页提取脚本，校验章节完整性与实验关键不变量 |
| `style.css` / `app.js` | 旧版首页资源，当前手册已不加载；保留便于历史对照 |
| `.nojekyll` | 静态 Pages 部署 |
| `CONTRIBUTING.md` / `LICENSE` | 贡献说明 / MIT 许可证 |

在 `index.html` 的 `window.HANDBOOK` 中维护模块和章节。每章使用稳定 `id`，新增章节时同步维护章节编号与首页介绍统计；列表和学习进度按数据动态计算。`Engines` 中的模拟逻辑为纯函数，`mountLab` 负责交互展示，阅读器负责目录、深链接和本地进度。单文件首页无需构建，也避免部署缓存造成新旧数据与脚本不匹配。章节链接形如 `#chapter=interrupt`。

## 数据与边界

- 收藏、已学状态与检查清单保存在浏览器 localStorage，新手册键为 `agent-fieldnotes-handbook-v2`；不上传服务器、不跨设备同步。清理站点数据会清空记录。从旧域名迁移到 GitHub Pages 后，不会自动迁移旧域名的进度。
- 首次打开新手册时，将旧 `agent-fieldnotes` 中12章的已学/收藏按对应主题迁移到稳定 ID；旧键保留，算法页面存储不变。旧版上线检查清单不自动勾选新版验收条件。
- 无统计跟踪脚本、远程字体或 CDN 运行依赖。官方资料链接仅在点击后访问对应网站。
- GitHub Pages 托管的是静态网站；没有在线编辑后台、用户系统或真实模型推理服务。修改内容通过提交代码完成。
- 本包不含原托管平台配置、原站点标识、Git 历史、账号信息或凭证。它是可独立部署的源码副本。
- 已检查 JavaScript 语法、相对资源路径及部署目录；部署进度可在仓库 Actions 中查看。若失败，请检查 Pages 的 Source 设置、分支与目录。

## 开源许可

本项目代码与随附原创文档采用 MIT License，见 `LICENSE`。外链官方资料的内容与商标仍归原权利人；链接不意味着其内容也使用本项目许可证。

## 官方部署资料

- https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
- https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## 算法练习场

打开 `practice.html`，或从首页的“算法练习”入口进入。首批 8 道原创表述的经典算法练习，支持 JavaScript 编码、样例运行、完整测试集提交、自定义 JSON 参数、题解、代码草稿和提交历史。

- `problems.js`：题库，使用稳定 ID；每题定义函数名、参数、约束、样例、测试及参考解法。
- `practice.js`：编辑器交互、本地判题与存储；`practice.css`：响应式布局。
- 用户代码在带 CSP 的 sandbox iframe 内部 Web Worker 运行，不在页面主线程执行；不开放网络，执行超时会终止。
- 保存键为 `agent-fieldnotes-coding-v1`。保留最近 40 次提交，本地数据不跨设备同步。
- 前端测试集公开，适合个人学习，不能用作可信竞赛排名。仅支持 JavaScript；Python/Java 等需要另外接入语言运行时或服务端判题。
- 单次 Worker 限时 2 秒，整个运行器响应上限 5 秒。没有操作系统级内存配额；不要运行来源不明的代码。运行耗时仅供本机参考，不代表复杂度证明。


## Hot 100 可视化题解

访问 [`hot100.html`](./hot100.html)：按官方题单的17类组织完整100题，提供213种分层算法说明、复杂度分析和400个关键状态演示。支持搜索、收藏、学习标记、进度JSON导入/导出，以及 `#p题号` 深链接。全部功能在浏览器端运行，无需ChatGPT或账号登录。

题号、题名和链接用于识别力扣题目；题意、示例、方法和演示为原创教学内容，不转载完整题面。目录核对来源：https://leetcode.cn/studyplan/top-100-liked/ （2026-10-13）。本站与力扣没有官方关联。完整约束和代码提交请访问每题原题链接。

- `hot100-data.js`：每题的题意、自编示例、陷阱、多解法与逐步状态。
- `hot100.js`：目录、解法切换、演示播放器、学习记录。
- `hot100.css`：响应式独立样式，未使用外部字体或CDN。
- `hot100.html`：独立入口，可直接部署到GitHub Pages。

演示是选定解法的固定输入关键步骤，不是任意代码执行器；完整解法以语言无关步骤讲解。方法层级表示理解门槛，不代表所有高阶方法都更快。复杂度会标明输出空间、期望与最坏情况等口径。进度保存在当前浏览器，可导出到JSON并在另一浏览器导入合并。


### 详细教学版

100题均新增：思路来源、变量/状态含义、逐步手算、解法间的优化关系、正确性说明、复杂度推导，以及可展开参考解释的理解自测。新增讲解约4.6万中文字符（含公式与符号），每题有6段阅读导航；原有解法标签、400步演示及学习记录继续可用。内容保存在 `hot100-data.js` 的 `teaching` 字段，渲染由 `hot100.js` 负责。
