import { expect, type Locator, type Page } from '@playwright/test';
import { DashboardPage } from './dashboard.page';

type AccountType = 'SAVINGS' | 'CHECKING';

export class OpenAccountPage extends DashboardPage {
  readonly resultTitle: Locator;
  readonly resultMessage: Locator;
  readonly accountTypeLocator: Locator;
  readonly fromAccount: Locator;
  readonly openNewAccountButton: Locator;
  readonly newAccountNumberLocator: Locator;

  constructor(page: Page) {
    super(page);
    this.resultTitle = page.locator('css=#openAccountResult > h1');
    this.resultMessage = page.locator('css=#openAccountResult > p');
    this.accountTypeLocator = page.locator('id=type');
    this.fromAccount = page.locator('id=fromAccountId');
    this.openNewAccountButton = page.locator(
      'css=#openAccountForm input[value="Open New Account"]',
    );
    this.newAccountNumberLocator = page.locator('id=newAccountId');
  }

  async openNewAccount(
    accountType: AccountType,
    fromAccountId: string,
  ): Promise<string> {
    await this.accountTypeLocator.selectOption({ label: accountType });
    await this.fromAccount.selectOption({
      label: fromAccountId,
    });

    // Click not working properly and the execution moves ahead before the click is processed.
    // await this.openNewAccountButton.click();

    // Following is the workaround to make it work.
    await this.fromAccount.press('Tab');
    await this.openNewAccountButton.press('Space');

    await expect(this.newAccountNumberLocator).not.toBeEmpty({
      timeout: 10000,
    });

    return await this.newAccountNumberLocator.textContent();
  }
}
