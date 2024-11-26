import { test, expect } from '@playwright/test';
import InventoryPage from '../pages/inventoryPage';  // Adjust the path as needed
import { LoginPage } from '../pages/LoginPage';
import { Utils } from '../utils/test-utils';

test.describe('E-commerce Functionality Tests', () => {
  let inventoryPage: InventoryPage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);

    await test.step('Navigate to the homepage', async () => {
      await Utils.navigateTo(page);
      await loginPage.validLogin();
    });
  });

  // Test 1: Product Sorting - Low to High
  test('Product sorting by price low to high', async ({ page }) => {
    await test.step('Sort products by price low to high', async () => {
      await inventoryPage.sortProductsBy('Price (low to high)');
    });

    await test.step('Verify products are sorted by price ascending', async () => {
      const result = await inventoryPage.isProductSortedByPriceAscending();
      await expect(result).toBe(true);
    });
  });

  // Test 2: Product Sorting - High to Low
  test('Product sorting by price high to low', async ({ page }) => {
    await test.step('Sort products by price high to low', async () => {
      await inventoryPage.sortProductsBy('Price (high to low)');
    });

    await test.step('Verify products are sorted by price descending', async () => {
      const result = await inventoryPage.isProductSortedByPriceDescending();
      await expect(result).toBe(true);
    });
  });

  // Test 3: Product Sorting - A to Z
  test('Product sorting by name A to Z', async ({ page }) => {
    await test.step('Sort products by name A to Z', async () => {
      await inventoryPage.sortProductsBy('Name (A to Z)');
    });

    await test.step('Verify products are sorted by name A to Z', async () => {
      const result = await inventoryPage.isProductSortedByName();
      await expect(result).toBe(true);
    });
  });

  // Test 4: Add multiple items to cart
  test('Add multiple items to cart', async ({ page }) => {
    await test.step('Add first item to the cart', async () => {
      await inventoryPage.addItemToCart(1);
    });

    await test.step('Add second item to the cart', async () => {
      await inventoryPage.addItemToCart(2);
    });

    await test.step('Go to the cart and verify items in cart', async () => {
      await inventoryPage.goToCart();
      const cartItems = await page.locator('.cart_item').count();
      await expect(cartItems).toBe(2);
    });
  });

  // Test 5: Remove items from cart
  test('Remove item from cart', async ({ page }) => {
    await test.step('Add item to the cart', async () => {
      await inventoryPage.addItemToCart(1);
    });

    await test.step('Go to the cart and remove the item', async () => {
      await inventoryPage.goToCart();
      await inventoryPage.removeItemFromCart(0); // Remove first item
    });

    await test.step('Verify no items are left in the cart', async () => {
      const cartItems = await page.locator('.cart_item').count();
      await expect(cartItems).toBe(0); // Assert that no items are left in the cart
    });
  });

  // Test 6: Update cart quantities - Note: This one is not possible as QTY input box is NOT editable. 
  test('Update cart quantities', async ({ page }) => {
    await test.step('Add item to the cart', async () => {
      await inventoryPage.addItemToCart(1); // Add first item
    });

    await test.step('Go to the cart and verify quantity', async () => {
      await inventoryPage.goToCart();
      const quantity = await page.locator('.cart_quantity').first().textContent();
      await expect(quantity).toBe('1');
    });
  });

  // Test 7: Complete Checkout Process
  test('Complete the checkout process and verify order confirmation', async ({ page }) => {
    await test.step('Add item to the cart', async () => {
      await inventoryPage.addItemToCart(1); // Add first item
    });

    await test.step('Go to the cart and start checkout', async () => {
      await inventoryPage.goToCart();
      await inventoryPage.clickCheckout(); // Click checkout
    });

    await test.step('Fill out checkout form and complete checkout', async () => {
      await inventoryPage.proceedToCheckout('Darren', 'Cardwel', '12345'); // Fill out checkout form
    });

    await test.step('Verify checkout is complete', async () => {
      const isComplete = await inventoryPage.isCheckoutComplete();
      await expect(isComplete).toBe(true); // Assert that checkout is complete
    });
  });
});
