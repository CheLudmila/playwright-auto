

import { test, expect } from '@playwright/test';

test.use({
  storageState: 'storageState.json',
});

test.describe('Cars API', () => {
  test('Create car - positive', async ({ request }) => {
    const response = await request.post('/api/cars', {
      data: {
        carBrandId: 1,
        carModelId: 1,
        mileage: 122
      }
    });

    expect(response.status()).toBe(201);

    const body = await response.json();

    expect(body.status).toBe('ok');
    expect(body.data.carBrandId).toBe(1);
    expect(body.data.carModelId).toBe(1);
    expect(body.data.mileage).toBe(122);
  });

  test('Create car without brandId', async ({ request }) => {
    const response = await request.post('/api/cars', {
      data: {
        carModelId: 1,
        mileage: 122
      }
    });

    expect(response.status()).toBe(400);

    const body = await response.json();

    expect(body.status).toBe('error');
  });

  test('Create car with negative mileage', async ({ request }) => {
    const response = await request.post('/api/cars', {
      data: {
        carBrandId: 1,
        carModelId: 1,
        mileage: -100
      }
    });

    expect(response.status()).toBe(400);

    const body = await response.json();

    expect(body.status).toBe('error');
  });
});