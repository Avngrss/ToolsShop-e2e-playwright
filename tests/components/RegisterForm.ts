import { Page, Locator } from "@playwright/test";
import { User } from "../../types/User";

export class RegisterForm {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly dateOfBirthInput: Locator;
  readonly streetInput: Locator;
  readonly postalCodeInput: Locator;
  readonly cityInput: Locator;
  readonly stateInput: Locator;
  readonly countryInput: Locator;
  readonly phoneInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly togglePasswordButton: Locator;
  readonly registerButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.getByLabel("First name");
    this.lastNameInput = page.getByLabel("Last name");
    this.dateOfBirthInput = page.getByLabel("Date of Birth *");
    this.streetInput = page.getByLabel("Street");
    this.postalCodeInput = page.getByLabel("Postal code");
    this.cityInput = page.getByLabel("City");
    this.stateInput = page.getByLabel("State");
    this.countryInput = page.getByLabel("Country");
    this.phoneInput = page.getByLabel("Phone");
    this.emailInput = page.getByLabel("Email");
    this.passwordInput = page.getByTestId("password");
    this.togglePasswordButton = page.locator(
      'button:has(svg[data-icon="eye"]), button:has(svg[data-icon="eye-slash"])'
    );
    this.registerButton = page.getByTestId("register-submit");
  }

  async fillForm(user: User) {
    await this.firstNameInput.fill(user.firstName);
    await this.lastNameInput.fill(user.lastName);
    await this.dateOfBirthInput.fill(user.dateOfBirth);
    await this.streetInput.fill(user.street);
    await this.postalCodeInput.fill(user.postalCode);
    await this.cityInput.fill(user.city);
    await this.stateInput.fill(user.state);
    await this.countryInput.selectOption(user.country);
    await this.phoneInput.fill(user.phone);
    await this.emailInput.fill(user.email);
    await this.passwordInput.fill(user.password);
  }

  async submit() {
    await this.registerButton.click();
  }

  async togglePasswordVisibility() {
    await this.togglePasswordButton.waitFor({ state: "visible" });
    await this.togglePasswordButton.click();
  }
}
