import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

// Перевірка завантаження .env
console.log('================================');
console.log('BASE_URL:', process.env.BASE_URL);
console.log('HTTP_USERNAME:', process.env.HTTP_USERNAME);
console.log(
  'HTTP_PASSWORD:',
  process.env.HTTP_PASSWORD ? '*****' : undefined
);
console.log('================================');

export default defineConfig({
  testDir: './tests',

  timeout: 30000,

  fullyParallel: true,

  reporter: [['html']],

  use: {
    baseURL: process.env.BASE_URL,

    httpCredentials: {
      username: process.env.HTTP_USERNAME,
      password: process.env.HTTP_PASSWORD,
    },

    headless: false,

    viewport: {
      width: 1280,
      height: 720,
    },

    screenshot: 'only-on-failure',

    video: 'retain-on-failure',

    trace: 'on-first-retry',
  },
});