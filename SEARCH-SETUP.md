# 搜索引擎验证与收录配置

公开站点：https://aidify2025.github.io/agent-fieldnotes/
站点地图：https://aidify2025.github.io/agent-fieldnotes/sitemap.xml

这些文件只完成站点侧准备，不代表已验证所有权、已提交站点地图或已被收录。搜索引擎自行决定抓取和索引。

## Google Search Console

1. 用站点所有者自己的 Google 账号打开 https://search.google.com/search-console/ 。
2. 新增 **网址前缀 / URL prefix** 资源，准确填写 `https://aidify2025.github.io/agent-fieldnotes/`。GitHub 项目站无法配置 `github.io` 的 DNS，勿选择需要 DNS 验证的网域资源。
3. 选择 HTML 文件验证：下载 Search Console 给出的文件，保持文件名和内容原样，将它放在仓库根目录并提交。也可选择 HTML 标记，将它提供的确切 verification meta 加入入口首页。
4. 等 Pages 发布后打开验证文件的公开 URL 确认可访问，再在 Search Console 点击验证。保留验证文件/标记，以便后续复核。
5. 在 Sitemaps 提交上述站点地图 URL。用 URL Inspection 检查一篇中文和英文专题页，查看 Google 选择的 canonical 与抓取状态。

## Bing Webmaster Tools

1. 打开 https://www.bing.com/webmasters/ ，使用站点所有者自己的账号。
2. 若已验证 Google Search Console，可选择产品提供的导入流程；否则添加上面的项目站 URL。
3. 按后台给出的 HTML/XML 文件或 meta 标记完成验证，使用实际生成的文件名和令牌，不要填示例值。
4. 验证通过后提交 sitemap URL，并检查抓取/索引报告。

不要在聊天或仓库中提交账号密码、验证码、访问令牌。搜索引擎提供的公开站点验证 HTML 文件或 meta 标记可按上述方式部署。

## GitHub Pages 的 robots.txt 限制

`robots.txt` 只在主机根目录 `https://aidify2025.github.io/robots.txt` 生效。这个项目仓库只能发布 `/agent-fieldnotes/robots.txt`，该路径不能作为全站 robots 控制文件。因此本项目不添加一个看似生效的 robots 文件；通过后台提交 sitemap 即可。若以后维护用户主页仓库，可在那里添加正确的 sitemap 声明。

## 维护与参考

新增或修改教程后执行 `node build-seo.cjs`。新增 URL 后重新生成 sitemap；不要为了“新鲜度”给未修改页面伪造 lastmod。不要以 `#chapter=...` 作为独立索引 URL。

- https://developers.google.com/search/docs/fundamentals/get-started-developers
- https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- https://developers.google.com/search/docs/specialty/international/localized-versions
- https://support.google.com/webmasters/answer/9008080
- https://www.bing.com/webmasters/help/add-and-verify-site-12184f8b
