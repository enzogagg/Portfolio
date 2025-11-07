/**
 * =====================================================================================================
 * TESTS - UTILS MODULE
 * =====================================================================================================
 *
 * Test suite for utils.js
 * Tests utility functions for element visibility and manipulation
 */

import {
  forceElementVisibility,
  forceProjectCardVisibility,
} from "../../assets/js/modules/utils.js";

describe("Utils Module", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  describe("forceElementVisibility", () => {
    test("should force visibility on a single element", () => {
      const element = document.createElement("div");
      document.body.appendChild(element);

      const count = forceElementVisibility(element);

      expect(count).toBe(1);
      expect(element.style.opacity).toBe("1");
      expect(element.style.transform).toBe("translateY(0)");
      expect(element.style.visibility).toBe("visible");
    });

    test("should force visibility on multiple elements", () => {
      const elements = [
        document.createElement("div"),
        document.createElement("div"),
        document.createElement("div"),
      ];

      elements.forEach((el) => document.body.appendChild(el));

      const count = forceElementVisibility(elements);

      expect(count).toBe(3);
      elements.forEach((el) => {
        expect(el.style.opacity).toBe("1");
        expect(el.style.transform).toBe("translateY(0)");
        expect(el.style.visibility).toBe("visible");
      });
    });

    test("should work with NodeList", () => {
      document.body.innerHTML = `
        <div class="test-element"></div>
        <div class="test-element"></div>
      `;

      const nodeList = document.querySelectorAll(".test-element");
      const count = forceElementVisibility(nodeList);

      expect(count).toBe(2);
    });

    test("should add animate-in class by default", () => {
      const element = document.createElement("div");
      document.body.appendChild(element);

      forceElementVisibility(element);

      expect(element.classList.contains("animate-in")).toBe(true);
    });

    test("should remove project-hidden class by default", () => {
      const element = document.createElement("div");
      element.classList.add("project-hidden");
      document.body.appendChild(element);

      forceElementVisibility(element);

      expect(element.classList.contains("project-hidden")).toBe(false);
    });

    test("should remove animation-delay by default", () => {
      const element = document.createElement("div");
      element.style.animationDelay = "0.5s";
      document.body.appendChild(element);

      forceElementVisibility(element);

      expect(element.style.animationDelay).toBe("");
    });

    test("should respect removeAnimationDelay option", () => {
      const element = document.createElement("div");
      element.style.animationDelay = "0.5s";
      document.body.appendChild(element);

      forceElementVisibility(element, { removeAnimationDelay: false });

      expect(element.style.animationDelay).toBe("0.5s");
    });

    test("should respect addAnimateInClass option", () => {
      const element = document.createElement("div");
      document.body.appendChild(element);

      forceElementVisibility(element, { addAnimateInClass: false });

      expect(element.classList.contains("animate-in")).toBe(false);
    });

    test("should respect removeHiddenClass option", () => {
      const element = document.createElement("div");
      element.classList.add("project-hidden");
      document.body.appendChild(element);

      forceElementVisibility(element, { removeHiddenClass: false });

      expect(element.classList.contains("project-hidden")).toBe(true);
    });

    test("should handle null elements gracefully", () => {
      const count = forceElementVisibility(null);
      expect(count).toBe(0);
    });

    test("should handle empty array", () => {
      const count = forceElementVisibility([]);
      expect(count).toBe(0);
    });

    test("should skip non-HTMLElement items", () => {
      const elements = [
        document.createElement("div"),
        null,
        undefined,
        "not an element",
        document.createElement("div"),
      ];

      elements[0] && document.body.appendChild(elements[0]);
      elements[4] && document.body.appendChild(elements[4]);

      const count = forceElementVisibility(elements);

      expect(count).toBe(2);
    });

    test("should use !important priority for inline styles", () => {
      const element = document.createElement("div");
      document.body.appendChild(element);

      forceElementVisibility(element);

      expect(element.style.getPropertyPriority("opacity")).toBe("important");
      expect(element.style.getPropertyPriority("transform")).toBe("important");
      expect(element.style.getPropertyPriority("visibility")).toBe("important");
    });
  });

  describe("forceProjectCardVisibility", () => {
    test("should be a wrapper for forceElementVisibility", () => {
      const element = document.createElement("div");
      element.classList.add("project-card");
      document.body.appendChild(element);

      const count = forceProjectCardVisibility(element);

      expect(count).toBe(1);
      expect(element.style.opacity).toBe("1");
      expect(element.classList.contains("animate-in")).toBe(true);
      expect(element.classList.contains("project-hidden")).toBe(false);
    });

    test("should work with multiple project cards", () => {
      document.body.innerHTML = `
        <div class="project-card project-hidden"></div>
        <div class="project-card project-hidden"></div>
        <div class="project-card project-hidden"></div>
      `;

      const cards = document.querySelectorAll(".project-card");
      const count = forceProjectCardVisibility(cards);

      expect(count).toBe(3);
      cards.forEach((card) => {
        expect(card.style.opacity).toBe("1");
        expect(card.classList.contains("animate-in")).toBe(true);
        expect(card.classList.contains("project-hidden")).toBe(false);
      });
    });

    test("should use project-specific defaults", () => {
      const card = document.createElement("div");
      card.classList.add("project-card", "project-hidden");
      card.style.animationDelay = "0.2s";
      document.body.appendChild(card);

      forceProjectCardVisibility(card);

      // Should remove animation delay
      expect(card.style.animationDelay).toBe("");
      // Should add animate-in class
      expect(card.classList.contains("animate-in")).toBe(true);
      // Should remove project-hidden class
      expect(card.classList.contains("project-hidden")).toBe(false);
    });

    test("should handle empty NodeList", () => {
      const cards = document.querySelectorAll(".nonexistent-class");
      const count = forceProjectCardVisibility(cards);

      expect(count).toBe(0);
    });
  });

  describe("Integration Tests", () => {
    test("should handle mixed element types", () => {
      document.body.innerHTML = `
        <div class="project-card project-hidden"></div>
        <div class="tech-card"></div>
        <button class="filter-btn"></button>
      `;

      const elements = document.querySelectorAll("div, button");
      const count = forceElementVisibility(elements);

      expect(count).toBe(3);
      elements.forEach((el) => {
        expect(el.style.opacity).toBe("1");
        expect(el.style.visibility).toBe("visible");
      });
    });

    test("should preserve existing classes except project-hidden", () => {
      const element = document.createElement("div");
      element.classList.add(
        "project-card",
        "featured",
        "project-hidden",
        "active",
      );
      document.body.appendChild(element);

      forceElementVisibility(element);

      expect(element.classList.contains("project-card")).toBe(true);
      expect(element.classList.contains("featured")).toBe(true);
      expect(element.classList.contains("active")).toBe(true);
      expect(element.classList.contains("project-hidden")).toBe(false);
      expect(element.classList.contains("animate-in")).toBe(true);
    });
  });
});
