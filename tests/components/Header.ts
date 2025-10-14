import { Page, Locator } from "@playwright/test";

export class Header {
  private readonly root: Locator;
  private readonly logoLink: Locator;
  // Navigation
  private readonly homeLink: Locator;
  private readonly categoriesToggle: Locator;
  private readonly contactLink: Locator;
  private readonly signInLink: Locator;
  // List of dropdown Categories
  private readonly handToolsLink: Locator;
  private readonly powerToolsLink: Locator;
  private readonly otherLink: Locator;
  private readonly specialToolsLink: Locator;
  private readonly rentalsLink: Locator;
  // Language switcher
  private readonly languageToggle: Locator;
  private readonly langDe: Locator;
  private readonly langEn: Locator;
  private readonly langEs: Locator;
  private readonly langFr: Locator;
  private readonly langNl: Locator;
  private readonly langTr: Locator;

  constructor(private page: Page) {
    this.root = page.locator("app-header");
    this.logoLink = page.getByRole("link", {
      name: "Practice Software Testing - Toolshop",
    });

    this.homeLink = page.getByTestId("nav-home");
    this.categoriesToggle = page.getByTestId("nav-categories");
    this.contactLink = page.getByTestId("nav-contact");
    this.signInLink = page.getByTestId("nav-sign-in");

    this.handToolsLink = page.getByTestId("nav-hand-tools");
    this.powerToolsLink = page.getByTestId("nav-power-tools");
    this.otherLink = page.getByTestId("nav-other");
    this.specialToolsLink = page.getByTestId("nav-special-tools");
    this.rentalsLink = page.getByTestId("nav-rentals");

    this.languageToggle = page.getByTestId("language-select");
    this.langDe = page.getByTestId("lang-de");
    this.langEn = page.getByTestId("lang-en");
    this.langEs = page.getByTestId("lang-es");
    this.langFr = page.getByTestId("lang-fr");
    this.langNl = page.getByTestId("lang-nl");
    this.langTr = page.getByTestId("lang-tr");
  }

  async goToHome() {
    await this.homeLink.click();
  }

  async openCategories() {
    await this.categoriesToggle.click();
  }

  async goToCategory(
    category:
      | "hand-tools"
      | "power-tools"
      | "other"
      | "special-tools"
      | "rentals"
  ) {
    await this.openCategories();
    const map = {
      "hand-tools": this.handToolsLink,
      "power-tools": this.powerToolsLink,
      other: this.otherLink,
      "special-tools": this.specialToolsLink,
      rentals: this.rentalsLink,
    };
    await map[category].click();
  }

  async goToContact() {
    await this.contactLink.click();
  }

  async goToSignIn() {
    await this.signInLink.click();
  }

  async openLanguageMenu() {
    await this.languageToggle.click();
  }

  async setLanguage(lang: "DE" | "EN" | "ES" | "FR" | "NL" | "TR") {
    await this.openLanguageMenu();
    const langMap = {
      DE: this.langDe,
      EN: this.langEn,
      ES: this.langEs,
      FR: this.langFr,
      NL: this.langNl,
      TR: this.langTr,
    };
    await langMap[lang].click();
  }
}
