import { test, expect } from '@playwright/test';
import testData from '../data/testData.json';

// Test 1: GET /products - Fetch Products List
test('GET /products should return a list of products', async ({ request }) => {
  let  responseBody: { products: any[]; };
  await test.step('Send GET request to /products endpoint', async () => {
    const response = await request.get(`${testData.endPoint}products`);

    // Validate status code and content type
    await test.step('Validate response status and content type', async () => {
      expect(response.status()).toBe(200);
      expect(response.headers()['content-type']).toContain('application/json');
    });

    // Validate that the response body contains a list of products
    await test.step('Validate response body contains products', async () => {
      responseBody = await response.json();
      expect(responseBody).toHaveProperty('products');
      expect(Array.isArray(responseBody.products)).toBe(true);
    });

    // Validate the schema of the first product
    await test.step('Validate the schema of the first product', async () => {
      const product = responseBody.products[0];
      expect(product).toHaveProperty('id');
      expect(product).toHaveProperty('title');
      expect(product).toHaveProperty('price');
      expect(product).toHaveProperty('category');
    });
  });
});

// Test 2: POST /products/add - Add a New Product
test('POST /products/add should successfully add a new product', async ({ request }) => {
  const newProduct = {
    title: "Pencil",
    price: 123.45,
  };

  await test.step('Send POST request to /products/add endpoint with new product data', async () => {
    const response = await request.post(`${testData.endPoint}products/add`, {
      data: newProduct,
    });

    // Validate status code and content type
    await test.step('Validate response status and content type', async () => {
      expect(response.status()).toBe(201);
      expect(response.headers()['content-type']).toContain('application/json');
    });

    // Validate the response contains the newly added product
    await test.step('Validate response contains the newly added product', async () => {
      const responseBody = await response.json();
      expect(responseBody).toHaveProperty('id');
      expect(responseBody.title).toBe(newProduct.title);
      expect(responseBody.price).toBe(newProduct.price);
    });
  });
});
