# End-to-End Automated Testing Framework

## Project Overview

This automated End-to-End (E2E) testing framework is built using Playwright and TypeScript. It validates the complete user authentication lifecycle—including user registration, sign-in, sign-out, and comprehensive negative/validation error scenarios—tested against the target web application: https://practice.expandtesting.com.

---

## Framework Architecture & Design

- **Base URL Configuration:** The `baseURL` has been centrally defined in the Playwright configuration file (`playwright.config.ts`). This allows the framework to automatically resolve and handle navigation routes without requiring repetitive hardcoding of URLs across individual test files.
- **Page Object Model (POM):** The project follows a modular architecture, cleanly separating test cases from page locators and interaction methods.

```text
├── constants/
│   └── endpoints.ts           # Route URL definitions
├── pages/                     # Page Object Model Structure
│   ├── BasePage.ts            # Base page wrapper with common actions
│   ├── LoginPage.ts           # Login page actions and locators
│   └── RegisterPage.ts        # Registration page actions and locators
├── tests/
│   └── auth.spec.ts           # Grouped E2E test suites
├── playwright.config.ts       # Global Playwright settings & CI config
├── package.json
└── README.md
```

---

## Documented Test Cases

| ID         | Test Suite   | Scenario / Objective                            | Expected Result                           |
| ---------- | ------------ | ----------------------------------------------- | ----------------------------------------- |
| **REG-01** | Registration | Register with empty fields                      | Shows `"All fields are required"` error   |
| **REG-02** | Registration | Register with invalid username format           | Shows `"Invalid username"` error          |
| **REG-03** | Registration | Register with non-matching passwords            | Shows `"Passwords do not match."` error   |
| **REG-04** | Registration | Register a new user successfully                | Account created & redirected to Login URL |
| **LOG-01** | Login        | Sign in with invalid username                   | Shows `"Your password is invalid!"` error |
| **LOG-02** | Login        | Sign in with valid user & incorrect password    | Shows `"Invalid password"` error          |
| **LOG-03** | E2E Journey  | Complete Lifecycle: Register -> Login -> Logout | Full user journey executed cleanly        |

---

## Test Execution Results and Artifacts

- **Execution Reports:** Detailed and interactive test execution reports are generated and stored within the `playwright-report` directory.
- **Execution Videos:** Recorded video walkthroughs and failure traces are automatically captured and saved in the `test-results` folder for debugging purposes.

---

## Cross-Browser and Multi-Device Testing

The test suites are configured to execute across multiple browser engines (Chromium, Firefox, WebKit) as well as emulated mobile viewports, ensuring application stability and responsiveness across diverse environments and devices.

---

## Getting Started & Execution Guide

### 1. Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/TasneemKhebbiyeh/playwright-e2e-framework.git
cd playwright-e2e-framework
npm install
npx playwright install
```

### 2. Running Tests

- **Run all tests:**
  ```bash
  npx playwright test
  ```
- **Run on a single browser worker (Desktop Chrome):**
  ```bash
  npx playwright test --project=chromium --workers=1
  ```
- **View interactive HTML report:**
  ```bash
  npx playwright show-report
  ```

---

## CI/CD Pipeline Integration (GitHub Actions)

- **Current Implementation:** CI/CD pipeline settings (via GitHub Actions) have been configured to automatically trigger and execute the test suite upon every push or modification made to the test codebase.
- **Future Scalability:** When working on projects where we own the full source code repository, these CI/CD settings can be scaled so that tests run automatically and continuously whenever developers add, update, or modify any part of the application source code.
