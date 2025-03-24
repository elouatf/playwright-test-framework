import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { users, urls, ui } from '../config/testConfig';

test.describe('Login functionality', () => {
  
  test('should login successfully with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step('Navigate to login page', async () => {
      await loginPage.goto();
      expect(await loginPage.isAtLoginPage()).toBe(true);
    });

    await test.step('Submit valid credentials', async () => {
      await loginPage.login(users.valid.username, users.valid.password);
    });

    await test.step('Verify login status', async () => {
      const status = await loginPage.getLoginStatus(urls.afterLogin, ui.titleAfterLogin);
  
      expect(status.isOnRightPage).toBe(true);
      expect(status.titleVisible).toBe(true);
      expect(status.hasCorrectTitle).toBe(true);
    });
  });

});