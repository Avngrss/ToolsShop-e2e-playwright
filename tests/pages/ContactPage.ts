import { Page } from "@playwright/test";
import { Header } from "../components/Header";
import { ContactForm } from "../components/ContactForm";

export class ContactUsPage {
  readonly page: Page;
  readonly header: Header;
  readonly contactForm: ContactForm;

  constructor(page: Page) {
    this.page = page;
    this.header = new Header(page);
    this.contactForm = new ContactForm(page);
  }

  async goto() {
    await this.page.goto("contact");
  }
}
