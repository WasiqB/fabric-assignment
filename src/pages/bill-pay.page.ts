import { expect, type Locator, type Page } from '@playwright/test';
import { DashboardPage } from './dashboard.page';
import type { User } from './register.page';

export class BillPayPage extends DashboardPage {
  readonly resultTitle: Locator;
  readonly resultMessage: Locator;
  readonly pageForm: Locator;
  readonly payeeName: Locator;
  readonly address: Locator;
  readonly city: Locator;
  readonly state: Locator;
  readonly zipCode: Locator;
  readonly phoneNumber: Locator;
  readonly accountNumber: Locator;
  readonly verifyAccountNumber: Locator;
  readonly amount: Locator;
  readonly fromAccountLocator: Locator;
  readonly sendPaymentButton: Locator;

  constructor(page: Page) {
    super(page);
    this.pageForm = page.locator('id=billpayForm');
    this.resultTitle = page.locator('css=#billpayResult h1');
    this.resultMessage = page.locator('css=#billpayResult p').first();
    this.payeeName = this.pageForm.locator('css=input[name="payee.name"]');
    this.address = this.pageForm.locator(
      'css=input[name="payee.address.street"]',
    );
    this.city = this.pageForm.locator('css=input[name="payee.address.city"]');
    this.state = this.pageForm.locator('css=input[name="payee.address.state"]');
    this.zipCode = this.pageForm.locator(
      'css=input[name="payee.address.zipCode"]',
    );
    this.phoneNumber = this.pageForm.locator(
      'css=input[name="payee.phoneNumber"]',
    );
    this.accountNumber = this.pageForm.locator(
      'css=input[name="payee.accountNumber"]',
    );
    this.verifyAccountNumber = this.pageForm.locator(
      'css=input[name="verifyAccount"]',
    );
    this.amount = this.pageForm.locator('css=input[name="amount"]');
    this.fromAccountLocator = this.pageForm.locator(
      'css=select[name="fromAccountId"]',
    );
    this.sendPaymentButton = this.pageForm
      .locator('css=input[value="Send Payment"]')
      .first();
  }

  async payBill(
    user: User,
    fromAccount: string,
    amount: string,
  ): Promise<void> {
    await this.payeeName.fill(`${user.firstName} ${user.lastName}`);
    await this.address.fill(user.street);
    await this.city.fill(user.city);
    await this.state.fill(user.state);
    await this.zipCode.fill(user.zipCode);
    await this.phoneNumber.fill(user.phoneNumber);
    const accountNum = `${Math.floor(Math.random() * 1000000)}`;
    await this.accountNumber.fill(accountNum);
    await this.verifyAccountNumber.fill(accountNum);
    await this.amount.fill(amount);
    await this.fromAccountLocator.selectOption({ label: fromAccount });

    // Click method is not working for this button, hence using press.
    // await this.sendPaymentButton.click({ force: true, button: 'left' });
    await this.fromAccountLocator.press('Tab', {
      delay: 1000,
    });
    await this.sendPaymentButton.press('Space', {
      delay: 1000,
    });

    await expect(this.resultTitle).not.toBeEmpty({
      timeout: 10000,
    });
  }
}
