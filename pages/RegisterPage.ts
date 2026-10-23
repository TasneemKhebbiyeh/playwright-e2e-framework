import { Page, expect } from '@playwright/test';
import { ENDPOINTS } from '../constants/endpoints';
export class RegisterPage {
  readonly page: Page;
  readonly usernameInput = '#username';
  readonly passwordInput = '#password';
  readonly confirmPasswordInput = '#confirmPassword';
  readonly registerButton = 'button[type="submit"]';
  readonly alertMessage = '.alert';
  readonly flashMessage = "#flash";
  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(ENDPOINTS.REGISTER);
  }

  async register(username: string, pass: string,confirmPassword:string) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, pass);
    await this.page.fill(this.confirmPasswordInput,confirmPassword);
    await this.page.click(this.registerButton);
  }

  async getAlertText() {
    return await this.page.locator(this.flashMessage).textContent();
  }
}