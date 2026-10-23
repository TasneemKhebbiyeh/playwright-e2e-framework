import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { ENDPOINTS } from "../constants/endpoints";

test.describe("Authentication Module - End-to-End Tests", () => {
  /* ===================================================
   * 1. REGISTRATION TESTS (Validation & Happy Path)
   * =================================================== */
  test.describe("User Registration", () => {
    test("Should show error when registration fields are empty", async ({
      page,
    }) => {
      const registerPage = new RegisterPage(page);
      await registerPage.goto();
      await registerPage.register("", "", "");

      const message = await registerPage.getAlertText();
      expect(message).toContain("All fields are required");
    });

    test("Should show error when registering with invalid username format", async ({
      page,
    }) => {
      const registerPage = new RegisterPage(page);
      await registerPage.goto();
      await registerPage.register(
        "invalid user @!",
        "Password123!",
        "Password123!",
      );

      const alertText = await registerPage.getAlertText();
      expect(alertText).toContain("Invalid username");
    });

    test("Should show error when passwords do not match during registration", async ({
      page,
    }) => {
      const registerPage = new RegisterPage(page);
      await registerPage.goto();
      await registerPage.register(
        `user-tester${Date.now()}`,
        "Password123!",
        "DifferentPassword123!",
      );

      const alertText = await registerPage.getAlertText();
      expect(alertText).toContain("Passwords do not match.");
    });
  });

  /* ===================================================
   * 2. LOGIN TESTS (Validation & Error Handling)
   * =================================================== */
  test.describe("User Login", () => {
    test("Should show error when logging in with invalid username", async ({
      page,
    }) => {
      const loginPage = new LoginPage(page);
      await loginPage.goto();
      await expect(page).toHaveURL(ENDPOINTS.LOGIN);

      await loginPage.login("wrongUser", "SuperSecretPassword!");
      const message = await loginPage.getFlashMessageText();
      expect(message).toContain("Your password is invalid!");
      await expect(page).toHaveURL(ENDPOINTS.LOGIN);
    });

    test("Should show error when logging in with invalid password", async ({
      page,
    }) => {
      const loginPage = new LoginPage(page);
      await loginPage.goto();
      await expect(page).toHaveURL(ENDPOINTS.LOGIN);

      await loginPage.login("practice", "WrongPassword");
      const message = await loginPage.getFlashMessageText();
      expect(message).toContain("Your password is invalid!");
      await expect(page).toHaveURL(ENDPOINTS.LOGIN);
    });

    test("Should show error when signing in with valid username but incorrect password", async ({
      page,
    }) => {
      const registerPage = new RegisterPage(page);
      const loginPage = new LoginPage(page);
      const username = `user-pwd${Date.now()}`;
      const correctPassword = "Password123!";
      const wrongPassword = "WrongPassword999!";

      // Register test user first
      await registerPage.goto();
      await registerPage.register(username, correctPassword, correctPassword);

      // Attempt login with wrong password
      await loginPage.goto();
      await loginPage.login(username, wrongPassword);

      const message = await loginPage.getFlashMessageText();
      expect(message).toContain("Your password is invalid!");
    });
  });

  /* ===================================================
   * 3. END-TO-END FLOW (Full User Journey)
   * =================================================== */
  test.describe("Full Authentication Lifecycle", () => {
    test("Should successfully register, login, and logout a new user", async ({
      page,
    }) => {
      const registerPage = new RegisterPage(page);
      const loginPage = new LoginPage(page);
      const username = `user-tester${Date.now()}`;
      const password = "Password123!";

      // 1. Register Flow
      await registerPage.goto();
      await registerPage.register(username, password, password);

      const alertText = await registerPage.getAlertText();
      expect(alertText).toContain(
        "Successfully registered, you can log in now.",
      );
      await expect(page).toHaveURL(ENDPOINTS.LOGIN);

      // 2. Login Flow
      await loginPage.login(username, password);
      await expect(page).toHaveURL(ENDPOINTS.SECURE);

      const alertLoginText = await loginPage.getFlashMessageText();
      expect(alertLoginText).toContain("You logged into a secure area!");

      // 3. Logout Flow
      await loginPage.logout();
      await expect(page).toHaveURL(ENDPOINTS.LOGIN);
    });
  });
});
