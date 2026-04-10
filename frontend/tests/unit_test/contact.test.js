/**
 * Tests for contact module
 */

import { contactModule } from "../../assets/js/modules/contact.js";
import * as utils from "../../assets/js/modules/utils.js";

jest.mock("../../assets/js/modules/utils.js", () => ({
  forceElementVisibility: jest.fn(),
}));

describe("Contact Module", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
    jest.clearAllMocks();
  });

  test("init should call forceElementVisibility on the contact form", () => {
    // Arrange: create a form that matches the selector used in the module
    const form = document.createElement("form");
    form.setAttribute("action", "#");
    form.setAttribute("method", "POST");
    document.body.appendChild(form);

    // Act
    contactModule.init();

    // Assert
    expect(utils.forceElementVisibility).toHaveBeenCalledTimes(1);
    expect(utils.forceElementVisibility).toHaveBeenCalledWith(form);
  });

  test("init should not throw when no form exists and should not call forceElementVisibility", () => {
    // No form in DOM
    expect(() => contactModule.init()).not.toThrow();
    expect(utils.forceElementVisibility).not.toHaveBeenCalled();
  });
});
