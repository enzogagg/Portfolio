const {
  toggleMobileMenu,
  _closeMobileMenu: closeMobileMenu,
} = require("../../assets/js/burger.js");

describe("Burger Menu", () => {
  beforeEach(() => {
    // Mettre en place une simulation du DOM avant chaque test
    document.body.innerHTML = `
      <div class="burger-menu"></div>
      <div class="mobile-menu" id="mobile-menu"></div>
      <header id="main-header"></header>
    `;
  });

  test("toggleMobileMenu should open the menu", () => {
    const burgerMenu = document.querySelector(".burger-menu");
    const mobileMenu = document.querySelector(".mobile-menu");

    toggleMobileMenu();

    expect(burgerMenu.classList.contains("active")).toBe(true);
    expect(mobileMenu.classList.contains("active")).toBe(true);
  });

  test("closeMobileMenu should close the menu", () => {
    // D'abord, on ouvre le menu
    toggleMobileMenu();
    // Ensuite, on le ferme
    closeMobileMenu();

    expect(
      document.querySelector(".burger-menu").classList.contains("active"),
    ).toBe(false);
    expect(
      document.querySelector(".mobile-menu").classList.contains("active"),
    ).toBe(false);
  });
});
