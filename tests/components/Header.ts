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
  //Logout locators
  private readonly userMenuToggle: Locator;
  private readonly signOutLink: Locator;
  private readonly myAccountLink: Locator;

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

    this.userMenuToggle = page.getByTestId("nav-menu");
    this.signOutLink = page.getByTestId("nav-sign-out");
    this.myAccountLink = page.getByTestId("nav-my-account");
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

  async logout(): Promise<void> {
    const toggle = this.userMenuToggle;
    await toggle.scrollIntoViewIfNeeded();
    const box = await toggle.boundingBox();
    if (!box) throw new Error("userMenuToggle is not in view");

    await this.page.mouse.click(box.x + 10, box.y + 10);

    await this.signOutLink.waitFor({ state: "visible", timeout: 10000 });
    await this.signOutLink.click();
    await this.userMenuToggle.waitFor({ state: "hidden", timeout: 10000 });
  }

  async isLoggedIn(): Promise<boolean> {
    return await this.userMenuToggle.isVisible({ timeout: 10000 });
  }

  async goToMyAccount(): Promise<void> {
    await this.userMenuToggle.click();
    await this.myAccountLink.click();
  }

  async goToAuthPage(): Promise<void> {
    if (await this.isLoggedIn()) {
      await this.logout();
    }
    await this.signInLink.click();
  }
}
