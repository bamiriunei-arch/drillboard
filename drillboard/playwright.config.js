// ドリルボードの自動テストの設定
// ・index.html をこのフォルダから小さなサーバーで配って、Chromium で開いてテストします
// ・GitHub Actions（.github/workflows/test.yml）でも同じ設定で動きます
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 90_000,
  expect: { timeout: 10_000 },
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: 'http://127.0.0.1:8123/',
    trace: 'retain-on-failure',
    // 自分のパソコンにある Chromium を使うとき：PW_CHROMIUM=/path/to/chrome npx playwright test
    launchOptions: process.env.PW_CHROMIUM ? { executablePath: process.env.PW_CHROMIUM } : {},
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'], viewport: { width: 1400, height: 900 } } }],
  webServer: {
    command: 'python3 -m http.server 8123 --bind 127.0.0.1',
    url: 'http://127.0.0.1:8123/index.html',
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
});
