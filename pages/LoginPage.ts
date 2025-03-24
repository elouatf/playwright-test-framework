import { Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Navigates to the login page
  async goto() {
    await this.page.goto('/');
  }

  // Fills in login credentials and submits the form
  async login(username: string, password: string) {
    await this.page.fill('#user-name', username);
    await this.page.fill('#password', password);
    await this.page.click('#login-button');
  }

 /**
   * Checks if the user is successfully logged in by:
   * - Verifying the redirected URL
   * - Verifying that the expected page title is visible
   */
  async isLoggedIn(urlAfterLogin: string, titleAfterLogin: string): Promise<boolean> {
    const isOnRightPage = this.page.url().includes(urlAfterLogin);
    const titleLocator = this.page.locator('.title');

    const titleVisible = await titleLocator.isVisible();
    const titleText = await titleLocator.textContent();
    
    // Ensure the title text is defined before applying .trim()
    const hasCorrectTitle = titleText
      ? titleText.trim().includes(titleAfterLogin)
      : false;

    return isOnRightPage && titleVisible && hasCorrectTitle;
  }
  
  /**
   * Retrieves the login error message from the UI.
   * Returns an empty string if the error element is not found.
   */
  async getErrorMessage(): Promise<string> {
    const text = await this.page.locator('[data-test="error"]').textContent();
    return text ? text.trim() : '';
  }  

}