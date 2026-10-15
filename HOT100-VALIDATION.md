# Hot 100 validation — 2026-10-15

This revision replaces the six-section lesson format with 100 bilingual, method-oriented lessons: 190 approaches, 380 Java/Python implementations, and 613 explanatory trace states.

## Content and provenance

All 100 public LeetCode problem descriptions were reviewed for requirements and constraints. Statements, examples, explanations, traces and implementations are independently written. Source links are stored with each lesson. Editorial probes exposed sign-in/navigation shells, so this revision does not claim to reproduce or verify the full official editorial text.

Methods identify educational baselines that do not satisfy a required or follow-up time/space bound. Complexity explanations distinguish auxiliary/output storage, expected/worst-case bounds and recursion-stack costs where applicable. Traces show selected states for the displayed example; they are not an arbitrary-input execution engine.

## Local implementation checks

Each of the 190 Python implementations was executed against example and boundary cases. Each of the 190 Java implementations was compiled with JDK 17 and executed in a judge-type harness. Additional checks include seeded differential tests for arrays, windows, lists and dynamic programming, exhaustive small binary-search cases, random-tree comparisons, and linked-list identity/restoration checks.

These checks are not LeetCode judge submissions and do not establish that all educational baseline methods meet online judge limits.

## Reproducible site regression checks

Run from the repository root with Node 18 or later:

```sh
node test-hot100.cjs
node test-i18n.cjs
node test-handbook.cjs
node test-seo.cjs
```

`test-hot100.cjs` validates all bilingual records, code/trace completeness, and executes the shared renderer's actual problem/method/code/trace handlers for every method in both locales using a minimal DOM fixture. It verifies stable progress keys. This fixture is not browser layout testing. The other checks cover the existing handbook experiments, bilingual navigation/data, coding exercises, sitemap and static tutorial pages.

The online release is additionally checked in a browser for language navigation, method switching, Java/Python switching and trace navigation. Java/Python listings are study/submission code, not executable within this static page.
