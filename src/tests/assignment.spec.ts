import { AccountOverviewPage } from '@fabric/pages/accounts.page';
import { BillPayPage } from '@fabric/pages/bill-pay.page';
import { DashboardPage } from '@fabric/pages/dashboard.page';
import { LoginPage } from '@fabric/pages/login.page';
import { OpenAccountPage } from '@fabric/pages/open-account.page';
import { RegisterPage, type User } from '@fabric/pages/register.page';
import { TransferPage } from '@fabric/pages/transfer.page';
import { faker } from '@faker-js/faker';
import { expect, test } from '@playwright/test';

const generateRandomUser = (): User => {
  const user: User = {} as User;
  user.firstName = faker.person.firstName();
  user.lastName = faker.person.lastName();
  user.address = faker.location.streetAddress();
  user.street = faker.location.street();
  user.city = faker.location.city();
  user.state = faker.location.state();
  user.zipCode = faker.location.zipCode();
  user.phoneNumber = faker.phone.number({ style: 'national' });
  user.ssn = faker.string.numeric(9);
  user.username = `${user.firstName.toLowerCase()}.${user.lastName.toLowerCase()}`;
  user.password = `${user.firstName}@${faker.string.numeric(3)}`;
  return user;
};

test.describe('Fabric End-to-End Tests', async () => {
  let user: User = {} as User;

  test.beforeAll('Prepare user for test', async () => {
    user = generateRandomUser();
  });

  test('UI scenario', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const accountPage = new AccountOverviewPage(page);
    const openAccountPage = new OpenAccountPage(page);
    const transferPage = new TransferPage(page);
    const billPayPage = new BillPayPage(page);
    let currentAccountNumber: string;
    let newAccountNumber: string;
    const transactionAmount = '50';

    await test.step('Create new user', async () => {
      await test.step('Navigate to register page', async () => {
        await page.goto('https://parabank.parasoft.com/');
        await expect(loginPage.userName).toBeVisible();

        await loginPage.navigateToRegisterPage();
        expect(await registerPage.isPageLoaded()).toBeTruthy();
      });

      await test.step('Register new user', async () => {
        await registerPage.register(user);

        await expect(dashboardPage.sidebar).toBeVisible();
        await expect(dashboardPage.title).toHaveText(
          `Welcome ${user.username}`,
        );
        await expect(dashboardPage.message).toHaveText(
          'Your account was created successfully. You are now logged in.',
        );

        await dashboardPage.openSidebarMenu('Log Out');
        await expect(loginPage.userName).toBeVisible();
      });
    });

    await test.step('Login with new user', async () => {
      await loginPage.login(user.username, user.password);
      await expect(dashboardPage.sidebar).toBeVisible();
    });

    await test.step('Verify global menu working', async () => {
      await dashboardPage.openSidebarMenu('Accounts Overview');
      await expect(accountPage.accountTable).toBeVisible();

      currentAccountNumber = await accountPage
        .getAccountNumber(1)
        .textContent();
    });

    await test.step('Create savings account', async () => {
      await accountPage.openSidebarMenu('Open New Account');
      await expect(openAccountPage.accountTypeLocator).toBeVisible();

      newAccountNumber = await openAccountPage.openNewAccount(
        'SAVINGS',
        currentAccountNumber,
      );

      await expect(openAccountPage.resultTitle).toHaveText('Account Opened!');
      await expect(openAccountPage.resultMessage.first()).toHaveText(
        'Congratulations, your account is now open.',
      );
    });

    await test.step('Validate accounts overview page', async () => {
      await openAccountPage.openSidebarMenu('Accounts Overview');
      await expect(accountPage.getAccountNumber(2)).toHaveText(
        newAccountNumber,
      );
    });

    await test.step('Transfer funds between accounts', async () => {
      await accountPage.openSidebarMenu('Transfer Funds');
      await expect(transferPage.amount).toBeVisible();

      await transferPage.transferFunds(
        newAccountNumber,
        currentAccountNumber,
        transactionAmount,
      );
      await expect(transferPage.resultTitle).toHaveText('Transfer Complete!');
      await expect(transferPage.resultMessage).toHaveText(
        `$${transactionAmount}.00 has been transferred from account #${newAccountNumber} to account #${currentAccountNumber}.`,
      );
    });

    await test.step('Pay the bill with new accounts', async () => {
      await transferPage.openSidebarMenu('Bill Pay');
      await expect(billPayPage.payeeName).toBeVisible();

      const payeeUser = generateRandomUser();
      await billPayPage.payBill(payeeUser, newAccountNumber, transactionAmount);

      await expect(billPayPage.resultTitle).toHaveText('Bill Payment Complete');
      await expect(billPayPage.resultMessage).toContainText(
        `Bill Payment to ${payeeUser.firstName} ${payeeUser.lastName} in the amount of $${transactionAmount}.00 from account ${newAccountNumber} was successful.`,
      );
    });
  });

  // test.skip('API scenario', async ({ request }) => {
  //   test('Search transaction by amount', () => {});
  //   test('Validate details displayed', () => {});
  // });
});
