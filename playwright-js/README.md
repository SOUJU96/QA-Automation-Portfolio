# Playwright (JavaScript) practice
Run: `npm install && npx playwright install && npx playwright test`; report: `npx playwright show-report`.
Target: https://www.saucedemo.com (public demo shop).

## Planned improvements
1. Add tests: add item to cart, remove item, checkout end-to-end (`CartPage`, `CheckoutPage`).
2. Log in once, save `storageState`, reuse it in other tests (global setup).
3. Write a custom fixture that provides a logged-in `page`.
4. Mock a network response with `page.route` and assert the UI reacts.
5. Force a failure; open the trace with `npx playwright show-trace`.
6. Run with `--workers=1` and `--workers=4`; explain why results/time differ.
7. Add the Allure reporter (`allure-playwright`).
