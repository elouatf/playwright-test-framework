import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { users, urls, ui } from '../config/testConfig';

test.describe('Login functionality', () => {
  
  test('should login successfully with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step('Navigate to login page', async () => {
      await loginPage.goto();
    });

    await test.step('Submit valid credentials', async () => {
      await loginPage.login(users.valid.username, users.valid.password);
    });

    await test.step('Verify successful login', async () => {
      const isLoggedIn = await loginPage.isLoggedIn(urls.afterLogin, ui.titleAfterLogin);
      expect(isLoggedIn).toBe(true);
    });
  });

});