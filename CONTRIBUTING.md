# 贡献指南 / Contributing

欢迎报告事实错误、修复交互问题或补充教学内容。请通过 Issue 说明问题，或 Fork 后提交 Pull Request。

## 内容与双语维护

- 每个技术点包含概念边界、实现步骤、具体例子、代码解释、常见误区、验收项与来源。
- 同步维护 `index.html` 与 `index-en.html` 中的 `window.HANDBOOK`。章节以稳定 ID 保存记录，不要随意更改已有 ID。
- Hot 100 的中英文内容共存在 `hot100-data.js`，每种解法的 Java/Python 代码与演示状态一起维护；`hot100.js` 共用。练习场中文数据在 `problems.js`，英文数据内嵌于 `practice-en.html`。题目 ID、函数签名与测试数据保持一致。
- 当前练习交互脚本内嵌在 `practice.html` 与 `practice-en.html`；仅修改旧的 `practice.js` 不会更新线上页面。
- 代码片段、伪代码、模拟实验需要明确标注；框架 API 和版本相关结论附官方来源。不要提交密钥、真实合同或无权转载的全文。

## 开发与检查

1. Fork，创建分支，修改源文件。资源路径使用相对路径。
2. 内容变更后运行 `node build-seo.cjs`，同步静态专题与元数据。Fork 部署请传入你自己的 HTTPS 站点根地址。
3. 执行 `node test-handbook.cjs`、`node test-i18n.cjs`、`node test-seo.cjs`、`node test-hot100.cjs`（Node 18+）。
4. 用 `python -m http.server 8000` 启动本地站点。检查桌面和手机布局、中英文切换、当前章节/题目保持、收藏和进度，以及受影响的交互实验。
5. 新增教程页应有完整静态正文、唯一 title / description、自指 canonical、双向 hreflang、可点击的站内入口，并纳入 sitemap。元数据应描述真实内容。
6. PR 说明改动目的、涉及页面、验证结果和截图。不要以无关重构掩盖内容改动。

无需模型 API Key 或后端。程序练习仅支持浏览器内 JavaScript；不要承诺服务端判题能力。

## English contribution notes

Keep Chinese and English content in sync. Preserve stable chapter/problem IDs and shared local-storage keys. Update the embedded scripts actually used by each page, regenerate standalone tutorials with `node build-seo.cjs`, and run all four checks above. Include the reason for your change, test results and screenshots in the PR. Mark pseudocode and simulations clearly, cite primary sources, and contribute only material you may license under MIT.

贡献者应确保有权按项目 MIT 许可证提交所贡献的内容。
