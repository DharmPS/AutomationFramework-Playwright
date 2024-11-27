# AutomationFramework-Playwright
Playwright Automation for Saucedemo E-commerce Website
This repository contains an automation framework built using Playwright with TypeScript for testing the SauceDemo e-commerce website (https://www.saucedemo.com) and performing API tests with DummyJSON (https://dummyjson.com/).

Setup Instructions:
1. Clone the repository and then move into folder AutomationFramework-Playwright:
Clone this repository to your local machine using Git.
git clone https://github.com/your-username/AutomationFramework-Playwright.git
cd AutomationFramework-Playwright


2. Install dependencies:
Install the required dependencies, including Playwright, TypeScript.
npm install
npm install playwright --save
Playwright will automatically download the necessary browsers (Chromium, Firefox, WebKit).


Test Execution Commands
1. Run all tests:
You can run all tests (including authentication, e-commerce functionality, and API tests) with the following command:
npx playwright test
This will execute all tests in the project using the default browsers (Chromium and Firefox).

2. Run tests for a specific file:
If you want to run a specific test file, use the following command:
npx playwright test tests/[test-file-name].spec.ts
For example, to run only the e-commerce tests --> npx playwright test tests/ecommerce.spec.ts

3. Run tests with a specific browser:
You can specify the browser to run your tests in by using the --project flag:
npx playwright test --project=chromium
npx playwright test --project=firefox
This will run the tests specifically in Chromium or Firefox.

4. Run tests in headless mode:
By default, the tests run in headless mode. To run them with the browser UI visible, modify the playwright.config.ts file (set headless: false).

Alternatively, you can specify the headless mode in the command:
npx playwright test --headed

Folder and File Descriptions:
1. src/pages/: Contains the Page Object Model classes, which define interactions with different pages (e.g., login, shopping page).
2. tests/: Contains test files. Each test file is organized by functionality (e.g., authentication, e-commerce).
3. playwright.config.ts: Configuration file for Playwright, which defines global settings like base URL, browsers to use, parallel execution settings, etc.
4. tsconfig.json: TypeScript configuration file for compiling TypeScript files.
5. package.json: Contains project dependencies and scripts for test execution.
6. test-results/: Directory where Playwright will generate HTML test reports.
7. data/: This folder contains test data.


Assumptions and Limitations:
Assumptions:
1. The SauceDemo website is publicly available and its functionality remains consistent.
2. The API tests are focused on DummyJSON’s /products endpoint as outlined in the problem statement.

Limitations:
1. The automation framework is built for SauceDemo and DummyJSON, meaning it may not be directly applicable to other e-commerce websites or APIs without modifications.
2. The tests focus on the core functionality as specified in the task. UI responsiveness or complex user behaviors are not covered in the current scope.
3. The tests are designed to run on Chromium and Firefox. Additional browser support (e.g., WebKit) or advanced device-specific testing can be added if needed.


Approach to Solving the Problem
The approach to solving this problem was broken down into several key steps:

Framework Setup:
1. Initialized a Playwright project with TypeScript for writing automation tests.
2. Configured Playwright to run tests across multiple browsers (Chromium and Firefox).
3. Set up the playwright.config.ts file to handle parallel execution, reporting, and other test configurations.

Page Object Model (POM):
1. Implemented the Page Object Model to organize the test code. This allows reusability of page interactions and makes the tests more maintainable.
2. Created two primary page objects: LoginPage for handling login functionality, and InventoryPage for handling product and shopping cart functionalities.

Test Development:
1. Authentication Tests: Created tests for both valid and invalid login scenarios, and handled error message validation.
2. E-commerce Functionality: Automated tests to verify functionality like product sorting, adding/removing items from the cart, and completing the checkout process.
3. API Tests: Created tests for validating the /products API endpoints (GET and POST methods).


Advanced Features:
1. Enabled parallel execution of tests to speed up the execution.
2. Configured cross-browser testing for Chromium and Firefox.
3. Set up screenshot capture on failure for better debugging.
4. This approach was designed to ensure that the automation framework is modular, maintainable, and scalable for future additions or modifications.
