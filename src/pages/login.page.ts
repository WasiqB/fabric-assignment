import type { Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly pageLogo: Locator;
  readonly userName: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  readonly registerLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageLogo = page.getByAltText('ParaBank');
    this.userName = page.locator('css=input[name="username"]');
    this.password = page.locator("css=input[name='password']");
    this.loginButton = page.locator("css=input[type='submit']");
    this.registerLink = page.getByText('Register');
  }

  async login(username: string, password: string): Promise<void> {
    await this.userName.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }

  async navigateToRegisterPage(): Promise<void> {
    await this.registerLink.click();
  }
}
