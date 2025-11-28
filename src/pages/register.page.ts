import type { Locator, Page } from '@playwright/test';

export interface User {
  firstName: string;
  lastName: string;
  address: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  phoneNumber: string;
  ssn: string;
  username: string;
  password: string;
}

export class RegisterPage {
  readonly page: Page;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly address: Locator;
  readonly city: Locator;
  readonly state: Locator;
  readonly zipCode: Locator;
  readonly phoneNumber: Locator;
  readonly ssn: Locator;
  readonly username: Locator;
  readonly password: Locator;
  readonly repeatedPassword: Locator;
  readonly registerButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstName = page.locator('id=customer.firstName');
    this.lastName = page.locator('id=customer.lastName');
    this.address = page.locator('id=customer.address.street');
    this.city = page.locator('id=customer.address.city');
    this.state = page.locator('id=customer.address.state');
    this.zipCode = page.locator('id=customer.address.zipCode');
    this.phoneNumber = page.locator('id=customer.phoneNumber');
    this.ssn = page.locator('id=customer.ssn');
    this.username = page.locator('id=customer.username');
    this.password = page.locator('id=customer.password');
    this.repeatedPassword = page.locator('id=repeatedPassword');
    this.registerButton = page.getByRole('button', { name: 'Register' });
  }

  async isPageLoaded(): Promise<boolean> {
    return await this.registerButton.isVisible();
  }

  async register({
    firstName,
    lastName,
    address,
    city,
    state,
    zipCode,
    phoneNumber,
    ssn,
    username,
    password,
  }: User): Promise<void> {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.address.fill(address);
    await this.city.fill(city);
    await this.state.fill(state);
    await this.zipCode.fill(zipCode);
    await this.phoneNumber.fill(phoneNumber);
    await this.ssn.fill(ssn);
    await this.username.fill(username);
    await this.password.fill(password);
    await this.repeatedPassword.fill(password);
    await this.registerButton.click();
  }
}
