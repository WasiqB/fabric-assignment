import { DashboardPage } from '@fabric/pages/dashboard.page';
import { LoginPage } from '@fabric/pages/login.page';
import { RegisterPage, type User } from '@fabric/pages/register.page';
import { faker } from '@faker-js/faker';
import { expect, test } from '@playwright/test';

test.describe('Fabric End-to-End Tests', async () => {
  const user: User = {} as User;

  test.beforeAll('Prepare user for test', async () => {
    user.firstName = faker.person.firstName();
    user.lastName = faker.person.lastName();
    user.address = faker.location.streetAddress();
    user.city = faker.location.city();
    user.state = faker.location.state();
    user.zipCode = faker.location.zipCode();
    user.phoneNumber = faker.phone.number({ style: 'national' });
    user.ssn = faker.string.numeric(9);
    user.username = `${user.firstName.toLowerCase()}.${user.lastName.toLowerCase()}`;
    user.password = `${user.firstName}@${faker.string.numeric(3)}`;
  });

  test('UI scenario', async ({ page }) => {
    await test.step('Create new user', async () => {
      const registerPage = new RegisterPage(page);
      const loginPage = new LoginPage(page);
      const dashboardPage = new DashboardPage(page);

      await test.step('Navigate to register page', async () => {
        await page.goto('https://parabank.parasoft.com/');
        expect(await loginPage.isPageLoaded()).toBeTruthy();

        await loginPage.navigateToRegisterPage();
        expect(await registerPage.isPageLoaded()).toBeTruthy();
      });

      await test.step('Register new user', async () => {
        await registerPage.register(user);

        expect(await dashboardPage.isSidebarVisible()).toBeTruthy();
        await expect(dashboardPage.title).toHaveText(
          `Welcome ${user.username}`,
        );
        await expect(dashboardPage.message).toHaveText(
          'Your account was created successfully. You are now logged in.',
        );

        await dashboardPage.openSidebarMenu('Log Out');
        expect(await loginPage.isPageLoaded()).toBeTruthy();
      });
    });
    // test.skip('Login with new user', () => {});
    // test.skip('Verify global menu working', () => {});
    // test.skip('Create savings account', () => {});
    // test.skip('Validate accounts overview page', () => {});
    // test.skip('Transfer funds between accounts', () => {});
    // test.skip('Pay the bill with new accounts', () => {});
  });

  // test.skip('API scenario', async ({ request }) => {
  //   test('Search transaction by amount', () => {});
  //   test('Validate details displayed', () => {});
  // });
});
