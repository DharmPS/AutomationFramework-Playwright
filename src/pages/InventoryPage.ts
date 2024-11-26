import { Page, test } from '@playwright/test';

export default class InventoryPage {
  constructor(private page: Page) {}

  // Selectors
  private productSortDropdown = '[data-test="product-sort-container"]';
  private productList = '.inventory_item';
  private addToCartButtons = this.page.getByRole('button', { name: 'Add to cart' });
  private cartButton = '.shopping_cart_link';
  private cartQuantityInput = '.cart_quantity_input';
  private checkoutButton = this.page.getByRole('button', { name: 'Checkout' });
  private firstNameInput = '[data-test="firstName"]';
  private lastNameInput = '[data-test="lastName"]';
  private postalCodeInput = '[data-test="postalCode"]';
  private continueButton = '[data-test="continue"]';
  private finishButton = '[data-test="finish"]';
  private orderConfirmationMessage = '.complete-header';
  private btnRemoveCart = this.page.getByRole('button', { name: 'Remove' });

  // Actions
  async sortProductsBy(option: string) {
    await test.step(`Sort products by ${option}`, async () => {
      await this.page.selectOption(this.productSortDropdown, { label: option });
    });
  }

  async addItemToCart(index: number) {
    await test.step(`Add item at index ${index} to cart`, async () => {
      await this.addToCartButtons.nth(index).click();
    });
  }

  async goToCart() {
    await test.step('Go to the shopping cart', async () => {
      await this.page.click(this.cartButton);
    });
  }

  async removeItemFromCart(index: number) {
    await test.step(`Remove item at index ${index} from cart`, async () => {
      await this.btnRemoveCart.nth(index).click();
    });
  }

  async proceedToCheckout(firstName: string, lastName: string, postalCode: string) {
    await test.step('Fill checkout form and complete checkout', async () => {
      await this.page.fill(this.firstNameInput, firstName);
      await this.page.fill(this.lastNameInput, lastName);
      await this.page.fill(this.postalCodeInput, postalCode);
      await this.page.click(this.continueButton);
      await this.page.click(this.finishButton);
    });
  }

  // Verifications
  async isProductSortedByPriceAscending() {
    return await test.step('Check if products are sorted by price ascending', async () => {
      const prices = await this.page.locator('.inventory_item_price').allTextContents();
      const priceNumbers = prices.map((price) => parseFloat(price.replace('$', '')));
      return priceNumbers.every((value, i, arr) => (i === 0 || arr[i - 1] <= value));
    });
  }

  async isProductSortedByPriceDescending() {
    return await test.step('Check if products are sorted by price descending', async () => {
      const prices = await this.page.locator('.inventory_item_price').allTextContents();
      const priceNumbers = prices.map((price) => parseFloat(price.replace('$', '')));
      return priceNumbers.every((value, i, arr) => (i === 0 || arr[i - 1] >= value));
    });
  }

  async isProductSortedByName() {
    return await test.step('Check if products are sorted by name', async () => {
      const names = await this.page.locator('.inventory_item_name').allTextContents();
      const sortedNames = names.sort();
      return names.every((name, i) => name === sortedNames[i]);
    });
  }

  async isCheckoutComplete() {
    return await test.step('Check if checkout is complete', async () => {
      return await this.page.locator(this.orderConfirmationMessage).isVisible();
    });
  }

  async clickCheckout() {
    return await test.step('Click on the checkout button', async () => {
      await this.checkoutButton.click();
    });
  }
}
