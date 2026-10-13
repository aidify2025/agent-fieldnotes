# Agent Fieldnotes · AI Agent 开发手册

从理解原理到构建、评测、部署的中文技术知识站。纯 HTML / CSS / JavaScript，无构建依赖、无后端、无登录、无 API Key。发布至公开 GitHub Pages 后，访客无需 GitHub 或 ChatGPT 账号即可阅读。

## 功能

- 12 篇手册，覆盖原理、构建、评测、部署四个阶段；每篇提供概念、实现步骤、验收方法、误区与伪代码。
- 分类与全文关键字段搜索、收藏、学习进度、上线检查清单。
- Agent Loop 分步演示（固定模拟数据，不调用模型）。
- 任务成功率计算器（本地计算）。
- 响应式布局、原生对话框、键盘操作与减少动态效果支持。

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

访问 `http://localhost:8000`。Windows 也可使用 `py -m http.server 8000`。停止服务按 Ctrl+C。无需 `npm install`；Node 仅用于可选语法检查：`node --check app.js`。

## 目录与维护

| 路径 | 用途 |
| --- | --- |
| `index.html` | 页面结构与文案 |
| `style.css` | 视觉样式与移动端布局 |
| `app.js` | 文章数据与交互逻辑 |
| `.nojekyll` | 分支部署时跳过 Jekyll 处理 |
| `CONTRIBUTING.md` | 内容与代码贡献说明 |
| `LICENSE` | MIT 许可证 |

文章在 `app.js` 顶部的 `articles` 数组中维护。`group` 对应 0 原理、1 构建、2 评测、3 部署。当前文章 ID 使用数组下标，因此修改已有内容不会影响记录；重新排序会改变本地记录对应关系。添加或删除文章时也应更新页面篇数、分类计数、进度分母和“下一篇”边界；扩大规模前建议改为稳定 ID 与动态计数。

## 数据与边界

- 收藏、已学状态与检查清单保存在浏览器 localStorage，键为 `agent-fieldnotes`；不上传服务器、不跨设备同步。清理站点数据会清空记录。从旧域名迁移到 GitHub Pages 后，不会自动迁移旧域名的进度。
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
