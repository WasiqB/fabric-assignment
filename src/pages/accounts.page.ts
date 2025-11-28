import type { Locator, Page } from '@playwright/test';
import { DashboardPage } from './dashboard.page';

export class AccountOverviewPage extends DashboardPage {
  readonly accountTable: Locator;

  constructor(page: Page) {
    super(page);
    this.accountTable = page.locator('id=accountTable');
  }

  getAccountNumber(index: number): Locator {
    if (index < 1) {
      throw new Error('Index must be greater than or equal to 1');
    }
    return this.page
      .locator(
        `css=table[id="accountTable"] > tbody > tr:nth-child(${index}) > td > a`,
      )
      .first();
  }
}
