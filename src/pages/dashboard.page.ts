import type { Locator, Page } from '@playwright/test';

type SidebarMenu =
  | 'Open New Account'
  | 'Accounts Overview'
  | 'Transfer Funds'
  | 'Bill Pay'
  | 'Find Transactions'
  | 'Update Contact Info'
  | 'Request Loan'
  | 'Log Out';

export class DashboardPage {
  readonly page: Page;
  readonly sidebar: Locator;
  readonly title: Locator;
  readonly message: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sidebar = page.locator('id=leftPanel');
    this.title = page.locator('css=div#rightPanel h1');
    this.message = page.locator('css=div#rightPanel p');
  }

  async openSidebarMenu(menuItem: SidebarMenu): Promise<void> {
    await this.sidebar.getByText(menuItem).click();
  }

  async getWelcomeMessage(): Promise<string> {
    return (await this.message.textContent()) ?? '';
  }

  async isSidebarVisible(): Promise<boolean> {
    return await this.sidebar.isVisible();
  }
}
