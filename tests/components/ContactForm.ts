import { Page, Locator } from "@playwright/test";
import { ContactFormData } from "../../types/ContactFormData";

export class ContactForm {
  readonly firstNameField: Locator;
  readonly lastNameField: Locator;
  readonly emailField: Locator;
  readonly subjectDropdown: Locator;
  readonly messageField: Locator;
  readonly attachmentField: Locator;
  readonly contactSubmitBtn: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.firstNameField = page.getByTestId("first-name");
    this.lastNameField = page.getByTestId("last-name");
    this.emailField = page.getByTestId("email");
    this.subjectDropdown = page.getByTestId("subject");
    this.messageField = page.getByTestId("message");
    this.attachmentField = page.getByTestId("attachment");
    this.contactSubmitBtn = page.getByTestId("contact-submit");
    this.successMessage = page.locator('div[role="alert"]');
  }

  async submitContactForm(contactData: ContactFormData) {
    await this.firstNameField.fill(contactData.firstName);
    await this.lastNameField.fill(contactData.lastName);
    await this.emailField.fill(contactData.email);
    await this.subjectDropdown.selectOption(contactData.subject);
    await this.messageField.fill(contactData.message);

    if (contactData.attachmentPath) {
      await this.attachmentField.setInputFiles(contactData.attachmentPath);
    }

    await this.contactSubmitBtn.click();
  }
}
