/**
 * Contact module
 * Handles contact form submission on contact page
 */
"use strict";

import { forceElementVisibility } from "./utils.js";

const API_BASE =
  (globalThis && globalThis.API_BASE) || (window && window.API_BASE) || "";

// Build API endpoint robustly using the URL constructor to avoid malformed URLs
let API_ENDPOINT;
try {
  if (API_BASE) {
    // If API_BASE is absolute use it as-is, otherwise resolve against current origin
    const base = /^https?:\/\//i.test(API_BASE)
      ? new URL(API_BASE)
      : new URL(API_BASE, window.location.origin);
    // Append path relative to the base so existing base paths are preserved
    API_ENDPOINT = new URL("api/v1/contact", base).toString();
  } else {
    // Fallback to same-origin absolute path
    API_ENDPOINT = "/api/v1/contact";
  }
} catch (e) {
  // Last-resort fallback to the previous behaviour (trim trailing slash)
  API_ENDPOINT =
    (API_BASE ? API_BASE.replace(/\/$/, "") : "") + "/api/v1/contact";
}

const contactModule = {
  init() {
    try {
      const form = document.querySelector("form[action='#'][method='POST']");
      if (!form) return;

      // Ensure form fields are visible when module initializes
      forceElementVisibility(form);

      const submitBtn = form.querySelector("button[type=submit]");
      const nameInput = form.querySelector("#name");
      const emailInput = form.querySelector("#email");
      const subjectInput = form.querySelector("#subject");
      const messageInput = form.querySelector("#message");

      form.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Simple client-side validation
        if (!nameInput.value || !emailInput.value || !messageInput.value) {
          showToast("Veuillez remplir tous les champs obligatoires.", "error");
          return;
        }

        // Disable button
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.classList.add("opacity-60", "cursor-not-allowed");
        }

        const payload = {
          name: nameInput.value.trim(),
          email: emailInput.value.trim(),
          subject: subjectInput.value,
          message: messageInput.value.trim(),
        };

        try {
          const resp = await fetch(API_ENDPOINT, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });

          const data = await resp.json().catch(() => ({}));

          if (!resp.ok) {
            const msg =
              data.error ||
              data.message ||
              "Erreur lors de l'envoi du message.";
            showToast(msg, "error");
          } else {
            showToast("Message envoyé avec succès !", "success");
            form.reset();
          }
        } catch (err) {
          console.error("Contact submit error:", err);
          showToast("Impossible de contacter le serveur.", "error");
        } finally {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.classList.remove("opacity-60", "cursor-not-allowed");
          }
        }
      });
    } catch (err) {
      console.error("contactModule init error:", err);
    }
  },
};

function showToast(message, type = "info") {
  // minimal toast: use alert() fallback for simplicity
  try {
    const existing = document.getElementById("contact-toast");
    if (existing) existing.remove();

    const toast = document.createElement("div");
    toast.id = "contact-toast";
    toast.className = `fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-xl text-sm font-semibold shadow-lg ${
      type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"
    }`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 4500);
  } catch (e) {
    alert(message);
  }
}

export { contactModule };
