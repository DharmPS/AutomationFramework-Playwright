import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { Utils } from '../utils/test-utils';
import testData from '../data/testData.json';

// Test 1: Valid Login - Correct Username & password
test('should login successfully with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  
  await test.step('Navigate to the homepage', async () => {
    await Utils.navigateTo(page);
  });

  await test.step('Perform valid login with correct credentials', async () => {
    await loginPage.validLogin();
  });

  await test.step(`Verify that the URL ${testData.inventoryURL} is correct after login`, async () => {
    await expect(page).toHaveURL(testData.inventoryURL);
  });

  await test.step('Verify login success', async () => {
    await expect(loginPage.isLoginSuccessful()).toBeTruthy();
  });
});

// Test 2: Invalid Login - Incorrect Username
test('Invalid login with incorrect username', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await test.step('Navigate to the homepage', async () => {
    await Utils.navigateTo(page);
  });

  await test.step('Attempt login with incorrect username', async () => {
    await loginPage.inValidUserNameLogin();
  });

  await test.step('Check if error message is displayed', async () => {
    expect(await loginPage.isErrorMessageDisplayed()).toBeTruthy();
  });

  await test.step('Verify the error message text', async () => {
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBe(testData.loginErrorMsg);
  });
});

// Test 3: Invalid Login - Incorrect Password
test('Invalid login with incorrect password', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await test.step('Navigate to the homepage', async () => {
    await Utils.navigateTo(page);
  });

  await test.step('Attempt login with incorrect password', async () => {
    await loginPage.inValidPasswordLogin();
  });

  await test.step('Check if error message is displayed', async () => {
    expect(await loginPage.isErrorMessageDisplayed()).toBeTruthy();
  });

  await test.step('Verify the error message text', async () => {
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBe(testData.loginErrorMsg);
  });
});

// Test 4: Logout functionality
test('Logout functionality', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await test.step('Navigate to the homepage', async () => {
    await Utils.navigateTo(page);
  });

  await test.step('Perform valid login', async () => {
    await loginPage.validLogin();
  });

  await test.step('Verify login success', async () => {
    expect(await loginPage.isLoginSuccessful()).toBeTruthy();
  });

  await test.step('Perform logout', async () => {
    await loginPage.logout();
  });

  await test.step('Verify user is logged out and redirected to login page', async () => {
    expect(await loginPage.isLoggedOut()).toBeTruthy();
    await expect(page).toHaveURL('/');
  });
});
