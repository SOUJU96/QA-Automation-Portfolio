const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

test.describe('Login', () => {
  test('valid user lands on products page', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory/);
    await expect(page.locator('.inventory_item')).toHaveCount(6);
  });

  test('locked out user sees an error', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('locked_out_user', 'secret_sauce');
    await expect(login.error).toContainText('locked out');
  });

  // Data-driven: one test per row
  for (const { user, pass, msg } of [
    { user: '', pass: '', msg: 'Username is required' },
    { user: 'standard_user', pass: '', msg: 'Password is required' },
    { user: 'standard_user', pass: 'wrong', msg: 'do not match' },
  ]) {
    test(`invalid login "${user}"/"${pass}"`, async ({ page }) => {
      const login = new LoginPage(page);
      await login.goto();
      await login.login(user, pass);
      await expect(login.error).toContainText(msg);
    });
  }
});
