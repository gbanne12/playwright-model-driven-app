import { expect, defineConfig, devices } from '@playwright/test';
import { Contact } from "./dataverse/entities/contact.js"

// Add custom matchers for use in tests
expect.extend({
  // Custom matcher for checking if Contact records exists in array 
  toContainRecord(contactsArray: Contact[], contact: Contact) {

    let contactExists = false;
    for (const item of contactsArray) {
      const isMatchingContact =
        item?.emailaddress1 === contact.getEmail() &&
        item.lastname === contact.getLastName() &&
        item?.firstname === contact.getFirstName()

      if (isMatchingContact) {
        contactExists = true;
        break;
      }
    }

    if (contactExists) {
      return {
        pass: true,
        message: () => `Found contact: ${contact.getFirstName()} ${contact.getLastName()}`,

      };
    } else {
      return {
        pass: false,
        message: () => `Expected contact to exist, but did not find: ${contact.getFirstName()} ${contact.getLastName()}`,
      };
    }
  }

});



/**
 * Define the config for the tests
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  outputDir: 'test-results',
  timeout:  1 * 60 * 1000, //total time test is allowed to run
  fullyParallel: false,
  workers: 1,
  reporter: 'html',
  use: {
    headless: false,
    screenshot: 'only-on-failure',
  },

  projects: [
    // Setup project logs in to dynamics and stores the session info
    {
      name: 'setup',
      testMatch: /setup\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
      },
    },

    // Main project runs tests in chrome and depends on setup project to log in for the tests
    {
      name: 'main',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
    },

    // Logged-in project assumes the user already has an authenticated session 
    {
      name: 'already-logged-in',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
        storageState: 'playwright/.auth/user.json',
      },
    },
  ],
});