import { Page } from "@playwright/test";
import { ENDPOINTS } from '../constants/endpoints';
export class LoginPage {
  readonly page: Page;
  readonly usernameInput = "#username";
  readonly passwordInput = "#password";
  readonly loginButton = 'button[type="submit"]';
  readonly flashMessage = "#flash";

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(ENDPOINTS.LOGIN);
  }

  async login(username: string, pass: string) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, pass);
    await this.page.click(this.loginButton);
  }

  async getFlashMessageText() {
    return await this.page.locator(this.flashMessage).textContent();
  }
  readonly logoutButton = 'a[href="/logout"]';
  async logout() {
    await this.page.click(this.logoutButton, { force: true });
  }
}
