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
 * Checks the login status by validating:
 * - The URL redirection
 * - The visibility of the page title
 * - The correctness of the title text
 */
async getLoginStatus(urlAfterLogin: string, titleAfterLogin: string): Promise<{
  isOnRightPage: boolean;
  titleVisible: boolean;
  hasCorrectTitle: boolean;
}> {
  const isOnRightPage = this.page.url().includes(urlAfterLogin);
  
  const titleLocator = this.page.locator('.title');
  const titleVisible = await titleLocator.isVisible();
  
  const titleText = await titleLocator.textContent();
  const hasCorrectTitle = titleText
    ? titleText.trim().includes(titleAfterLogin)
    : false;

  return { isOnRightPage, titleVisible, hasCorrectTitle };
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