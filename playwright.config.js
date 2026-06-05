import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  timeout: 30000,

  fullyParallel: true,

  reporter: [['html']],

  use: {
    baseURL: 'https://qauto.forstudy.space',

    httpCredentials: {
      username: 'guest',
      password: 'welcome2qauto',
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