# API automation (Playwright `request` + Ajv, JavaScript)

Replaces "manual API checks in Postman" with automated, repeatable tests that run in CI.
Target: https://restful-booker.herokuapp.com (free practice API; its docs list every endpoint).

Run: `npm install && npx playwright test` then `npx playwright show-report`.

## What it demonstrates (say this in interviews)
- Auth token handling in a **fixture**
- A **client class** (`support/booking.js`) separating HTTP details from test intent
- **Lifecycle/chained** tests (create -> read -> update -> delete)
- **JSON schema** validation (Ajv), **negative** tests, **data-driven** tests
- Runs headless in CI (see `.github/workflows/tests.yml`)

## Planned improvements
1. Add `GET /booking?firstname=...` filter tests; assert every result matches.
2. Add PATCH (partial update) tests.
3. Assert response headers (`content-type`) and response time (< 2s).
4. Replace the "observe" data-driven test with real expected behaviour once you've explored the API in Postman.
5. Move base URL + credentials into env vars (`process.env`) and `.env` (git-ignored).
6. Add a DB check: after create, query your own SQLite copy (pretend DB) to practise "API -> DB" validation.
7. Re-implement the same suite with **REST Assured (Java)**, a very common SDET interview ask.
8. Export your Postman collection and run it with `newman` to compare the two approaches.
