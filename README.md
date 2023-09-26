# playwright-model-driven-app
Tests for a Dynamics 365 model driven app


Example project structure created via the npm init playwright command
Added example of page object pattern to test calculator site

1) npm install playwright (as admin)  - install playwright if required
2) npm init playwright [projectName]  - initiate project
3) npx playwright test --debug      - run all tests in debug
4) npx playwright show-report  - show the test report

Project expects a file named environment.config.ts to exist and contain the following envirnment information for accessing the model driven app:

export const environment = {
    webApiUrl: "https://****.dynamics.com/api/data/v9.2",
    appUrl: "https://****.crm11.dynamics.com/main.aspx?appid=0cec2ad9-9b95-ed11-aad1-0022481b5127",
    email: 'username@email.com',
    password: "users-password",
    secret: "client-secret-for-mfa",
};
