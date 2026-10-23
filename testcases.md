# Test Cases Specification Document

## Module: Authentication (Registration, Login & Session Management)

**Target System:** https://practice.expandtesting.com  
**Author:** QA Automation Engineer  
**Automation Tool:** Playwright + TypeScript

---

### Test Suite 1: User Registration Validation & Flow

#### TC-REG-01: Registration with Empty Fields

- **Description:** Verify that the system prevents account creation when inputs are left empty.
- **Pre-conditions:** Navigate to the Registration page (`/register`).
- **Test Data:**
  - Username: `""`
  - Password: `""`
  - Confirm Password: `""`
- **Test Steps:**
  1. Open the Registration page.
  2. Click the "Register" button with empty fields.
- **Expected Result:** An alert/error message is displayed containing `"All fields are required"`.

---

#### TC-REG-02: Registration with Invalid Username Format

- **Description:** Verify that the system validates username format constraints upon registration.
- **Pre-conditions:** Navigate to the Registration page (`/register`).
- **Test Data:**
  - Username: `"invalid user @!"`
  - Password: `"Password123!"`
  - Confirm Password: `"Password123!"`
- **Test Steps:**
  1. Open the Registration page.
  2. Enter the invalid username format along with valid passwords.
  3. Click the "Register" button.
- **Expected Result:** An alert message is displayed containing `"Invalid username"`.

---

#### TC-REG-03: Registration with Mismatched Passwords

- **Description:** Verify that registration fails when the confirmation password does not match the initial password.
- **Pre-conditions:** Navigate to the Registration page (`/register`).
- **Test Data:**
  - Username: `user-tester<timestamp>`
  - Password: `"Password123!"`
  - Confirm Password: `"DifferentPassword123!"`
- **Test Steps:**
  1. Open the Registration page.
  2. Enter a unique username.
  3. Enter two different passwords in the password and confirm password fields.
  4. Click the "Register" button.
- **Expected Result:** An alert message is displayed containing `"Passwords do not match."`.

---

### Test Suite 2: User Login Validation & Error Handling

#### TC-LOG-01: Login with Non-Existent Username

- **Description:** Verify authentication behavior when attempting to log in with an unregistered username.
- **Pre-conditions:** Navigate to the Login page (`/login`).
- **Test Data:**
  - Username: `"wrongUser"`
  - Password: `"SuperSecretPassword!"`
- **Test Steps:**
  1. Open the Login page.
  2. Input unregistered username and any password.
  3. Click the "Login" button.
- **Expected Result:**
  - Flash message displays `"Your password is invalid!"`.
  - User remains on the Login URL (`/login`).

---

#### TC-LOG-02: Login with Valid Username Format but Invalid Password

- **Description:** Verify authentication error handling when providing an incorrect password.
- **Pre-conditions:** Navigate to the Login page (`/login`).
- **Test Data:**
  - Username: `"practice"`
  - Password: `"WrongPassword"`
- **Test Steps:**
  1. Open the Login page.
  2. Enter the existing username `"practice"` and an incorrect password.
  3. Click the "Login" button.
- **Expected Result:**
  - Flash message displays `"Your password is invalid!"`.
  - User remains on the Login URL (`/login`).

---

#### TC-LOG-03: Login with Newly Registered User using Incorrect Password

- **Description:** Verify that a registered user cannot authenticate using an invalid password.
- **Pre-conditions:** Create a newly registered user dynamically via the Registration page.
- **Test Data:**
  - Username: `user-pwd<timestamp>`
  - Correct Password: `"Password123!"`
  - Incorrect Password: `"WrongPassword999!"`
- **Test Steps:**
  1. Register a new valid account.
  2. Navigate to the Login page.
  3. Input the newly created username and the incorrect password.
  4. Click the "Login" button.
- **Expected Result:** Flash message displays `"Your password is invalid!"`.

---

### Test Suite 3: End-to-End Authentication Lifecycle

#### TC-E2E-01: Successful Full Journey (Register -> Login -> Logout)

- **Description:** Verify the happy-path journey of user account creation, session initiation, and successful logout.
- **Pre-conditions:** System is operational; database accepts new account registrations.
- **Test Data:**
  - Username: `user-tester<timestamp>`
  - Password: `"Password123!"`
- **Test Steps:**
  1. Navigate to Registration page (`/register`).
  2. Fill out valid details and submit the registration form.
  3. Verify success notification `"Successfully registered, you can log in now."` and URL redirection to `/login`.
  4. Perform login with the newly created credentials.
  5. Verify successful redirection to secure area (`/secure`) and flash message `"You logged into a secure area!"`.
  6. Click the "Logout" button.
- **Expected Result:**
  - Session is successfully terminated.
  - User is redirected back to the Login page (`/login`).
