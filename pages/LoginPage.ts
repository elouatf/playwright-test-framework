import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly title: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.errorMessage = page.locator('[data-test="error"]');
    this.title = page.locator('.title');
  }

  // Navigates to the login page
  async goto() {
    await this.page.goto('/');
  }

  async isAtLoginPage(): Promise<boolean> {
    return this.loginButton.isVisible();
  }
  
  // Fills in login credentials and submits the form
  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
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
  const titleVisible = await this.title.isVisible();
  
  
  const titleText = await this.title.textContent();
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
    const text = await this.errorMessage.textContent();
    return text ? text.trim() : '';
  }  

}