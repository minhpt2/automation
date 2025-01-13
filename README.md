# Playwright Test Project

This project contains end-to-end tests using [Playwright](https://playwright.dev/).

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:
  ```sh
  git clone https://github.com/your-username/your-repo.git
  ```
2. Navigate to the project directory:
  ```sh
  cd your-repo
  ```
3. Install the dependencies:
  ```sh
  npm install
  ```
  or
  ```sh
  yarn install
  ```

### Running Tests

To run the tests, use the following command:
```sh
npx playwright test
```

### Writing Tests

Tests are located in the `tests` directory. You can add new test files with the `.spec.ts` or `.spec.js` extension.

Example test file:
```javascript
const { test, expect } = require('@playwright/test');

test('basic test', async ({ page }) => {
  await page.goto('https://example.com');
  const title = await page.title();
  expect(title).toBe('Example Domain');
});
```

### Configuration

Configuration options can be found in the `playwright.config.js` file. You can customize the test runner, browser options, and more.

### Resources

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Playwright GitHub Repository](https://github.com/microsoft/playwright)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.