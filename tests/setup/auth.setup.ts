// // auth.setup.ts
 import { test as setup } from '@playwright/test';
 import { LoginPage } from '../pages/login-page.js';
 import { environment } from '../../environment.config.js'

const authFile = 'playwright/.auth/user.json';

// Log in and save the authentication state to the above file for the tests to re-use
setup('authenticate', async ({ page }) => {
  await page.goto(environment.appUrl);
  const login = new LoginPage(page);
  await login.withCredentials(environment.email, environment.password, environment.secret);

  await page.context().storageState({ path: authFile });
  await page.close();
});

