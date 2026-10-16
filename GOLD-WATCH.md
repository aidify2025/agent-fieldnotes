# Gold quote proxy

The public GitHub Pages site cannot read these upstream responses directly: on 2026-10-16 both GET/POST probes succeeded, but responses and the POST preflight omitted `Access-Control-Allow-Origin` for `https://aidify2025.github.io`. GitHub Pages has no server runtime. A deployed proxy is required; do not disable browser security or use `no-cors` (its response body is unreadable).

## Deployment

1. Deploy `gold-proxy-worker.js` as a Cloudflare Worker using your own account, through the dashboard code editor.
2. Keep `ALLOWED_ORIGIN=https://aidify2025.github.io`. This is origin-level CORS, not authentication or an abuse-prevention mechanism. Configure provider quotas/rate limits as appropriate for your account.
3. Put the resulting Worker URL into `proxyBase` in the repository-root `gold-watch-config.js`.
4. Check both `/?source=minsheng` and `/?source=zheshang` from the GitHub Pages origin. Both must return successful quote JSON and the configured CORS header.
5. Publish the prepared HTML files, `build-seo.cjs`, `gold-watch-config.js` and `gold-watch.js` together to GitHub Pages. The existing website remains static and public.

The proxy only accepts two fixed source names. It forwards no visitor credentials/cookies and does not accept arbitrary URLs. The Zheshang upstream request uses POST with the specified JSON body. Each request times out after 15 seconds. Only price, percentage change and quote time are returned.

## Widget behavior

- A small fixed `Au` switch in the bottom-left; default off. Its preference is saved locally.
- The panel uses the site's cream/green palette and supports Chinese and English.
- Default refresh interval: 3000 ms, configured by `httpRefreshInterval`.
- Pauses and aborts pending requests when disabled or when the tab is hidden; resumes on return.
- No overlapping poll cycles. Requests taking longer than the interval delay the next cycle.
- Error status preserves previous quotes; it never substitutes sample prices. A source time more than one minute old is labeled unchanged.
- All 14 HTML entrypoints load the shared widget; the SEO generator retains the integration.

Run `node test-gold-watch.cjs` from the repository root. The test uses controlled responses to verify the UI lifecycle and proxy contract; it does not establish browser connectivity to a deployed proxy. Both deployed proxy routes returned HTTP 200 and successful quote JSON during verification on 2026-10-16. Use redirect: manual for Cloudflare Workers compatibility.
