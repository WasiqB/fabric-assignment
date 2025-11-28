import type { Locator, Page } from '@playwright/test';
import { DashboardPage } from './dashboard.page';

export class TransferPage extends DashboardPage {
  readonly amount: Locator;
  readonly fromAccountLocator: Locator;
  readonly toAccountLocator: Locator;
  readonly transferButton: Locator;
  readonly resultTitle: Locator;
  readonly resultMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.amount = page.locator('css=#transferForm #amount');
    this.fromAccountLocator = page.locator('id=fromAccountId');
    this.toAccountLocator = page.locator('id=toAccountId');
    this.transferButton = page.getByRole('button', {
      name: 'Transfer',
    });
    this.resultTitle = page.locator('css=#showResult h1');
    this.resultMessage = page.locator('css=#showResult p').first();
  }

  async transferFunds(
    fromAccount: string,
    toAccount: string,
    amount: string,
  ): Promise<void> {
    await this.amount.fill(amount);

    await this.fromAccountLocator.selectOption({ label: fromAccount });
    await this.toAccountLocator.selectOption({ label: toAccount });

    await this.transferButton.click();
  }
}
