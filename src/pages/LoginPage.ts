// src/pages/LoginPage.ts
import { Page, test } from '@playwright/test';
import credentials from '../data/credentials.json';

export class LoginPage {
  private page: Page;
  private usernameInput = 'input[id="user-name"]';
  private passwordInput = 'input[id="password"]';
  private loginButton = 'input[id="login-button"]';
  private errorMessage = '[data-test="error"]';
  private menuButton = '[id="react-burger-menu-btn"]';
  private logoutButton = '[id="logout_sidebar_link"]';

  constructor(page: Page) {
    this.page = page;
  }

  // Actions
  async validLogin() {
    await test.step('Perform valid login', async () => {
      await this.page.fill(this.usernameInput, credentials.validUsername);
      await this.page.fill(this.passwordInput, credentials.validPassword);
      await this.page.click(this.loginButton);
    });
  }

  async inValidUserNameLogin() {
    await test.step('Attempt login with invalid username', async () => {
      await this.page.fill(this.usernameInput, credentials.invalidUsername);
      await this.page.fill(this.passwordInput, credentials.validPassword);
      await this.page.click(this.loginButton);
    });
  }

  async inValidPasswordLogin() {
    await test.step('Attempt login with invalid password', async () => {
      await this.page.fill(this.usernameInput, credentials.validUsername);
      await this.page.fill(this.passwordInput, credentials.invalidPassword);
      await this.page.click(this.loginButton);
    });
  }

  async logout() {
    await test.step('Logout from the application', async () => {
      await this.page.click(this.menuButton);
      await this.page.click(this.logoutButton);
    });
  }

  // Verifications
  async isErrorMessageDisplayed() {
    return await test.step('Check if error message is displayed', async () => {
      return await this.page.isVisible(this.errorMessage);
    });
  }

  async isLoginSuccessful() {
    return await test.step('Check if login is successful', async () => {
      return await this.page.isVisible('.inventory_list');
    });
  }

  async isLoggedOut() {
    return await test.step('Check if user is logged out', async () => {
      return await this.page.isVisible(this.usernameInput);
    });
  }

  async getErrorMessage() {
    return await test.step('Get the error message text', async () => {
      return await this.page.locator(this.errorMessage).textContent();
    });
  }
}
