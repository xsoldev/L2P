# Testing Infrastructure Documentation

## Overview

This project uses a comprehensive testing strategy with three layers:
- **Unit Tests**: Test individual functions and utilities in isolation
- **Integration Tests**: Test component interactions and UI behavior
- **E2E Tests**: Test complete user flows and navigation

## Tech Stack

### Unit & Integration Testing
- **Vitest**: Fast unit test framework with native ESM support
- **@testing-library/react**: React component testing utilities
- **@testing-library/jest-dom**: Custom jest matchers for DOM assertions
- **@testing-library/user-event**: Advanced user interaction simulation
- **happy-dom**: Lightweight DOM implementation for testing
- **MSW (Mock Service Worker)**: API mocking for realistic testing

### E2E Testing
- **Playwright**: Cross-browser end-to-end testing
- Supports Chromium, WebKit, and Mobile Chrome
- Automatic screenshots/videos on failure

## Quick Start

### Running Tests

```bash
# Run all unit and integration tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui

# Run tests with coverage report
npm run test:coverage

# Run E2E tests
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui

# Run E2E tests in headed mode (see browser)
npm run test:e2e:headed

# Debug E2E tests
npm run test:e2e:debug

# Run all tests (unit + integration + E2E)
npm run test:all
```

## Project Structure

```
__tests__/
├── unit/                      # Unit tests for pure functions
│   ├── lib/
│   │   ├── utils.test.ts      # Tests for utility functions
│   │   ├── i18n.test.ts       # Tests for internationalization
│   │   └── scoring.test.ts    # Tests for scoring logic
│   └── hooks/                 # Tests for custom hooks (future)
│
├── integration/               # Integration tests for components
│   └── components/
│       └── ui/
│           ├── button.test.tsx    # Button component tests
│           ├── card.test.tsx      # Card component tests
│           └── alert.test.tsx     # Alert component tests
│
├── e2e/                       # End-to-end tests
│   ├── welcome.spec.ts        # Welcome screen flows
│   ├── language-switching.spec.ts  # Language switching
│   └── navigation.spec.ts     # Navigation flows
│
└── setup/                     # Test configuration & utilities
    ├── vitest-setup.ts        # Global Vitest configuration
    ├── test-utils.tsx         # Custom render & utilities
    └── msw-handlers.ts        # API mock handlers
```

## Writing Tests

### Unit Tests

Unit tests follow the **AAA pattern** (Arrange, Act, Assert):

```typescript
import { describe, it, expect } from 'vitest';
import { myFunction } from '@/lib/myFunction';

describe('myFunction', () => {
  it('should do something specific', () => {
    // Arrange - set up test data
    const input = 'test';

    // Act - call the function
    const result = myFunction(input);

    // Assert - verify the result
    expect(result).toBe('expected output');
  });
});
```

**Best Practices:**
- One assertion per test (when possible)
- Descriptive test names that explain what's being tested
- Test edge cases and error conditions
- Keep tests independent and isolated

### Integration Tests

Integration tests verify component behavior and user interactions:

```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@/__tests__/setup/test-utils';
import { Button } from '@/components/ui/button';
import userEvent from '@testing-library/user-event';

describe('Button Component', () => {
  it('should handle click events', async () => {
    // Arrange
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    // Act
    await user.click(screen.getByRole('button'));

    // Assert
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

**Best Practices:**
- Use custom render from `test-utils.tsx` for provider setup
- Test user interactions, not implementation details
- Use `userEvent` for realistic user interactions
- Query by role, label, or text (not by class or id)

### E2E Tests

E2E tests verify complete user flows:

```typescript
import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test('should complete the main flow', async ({ page }) => {
    // Arrange
    await page.goto('/');

    // Act
    await page.getByRole('button', { name: 'Start' }).click();

    // Assert
    await expect(page.getByText('Welcome')).toBeVisible();
  });
});
```

**Best Practices:**
- Test complete user journeys
- Use `beforeEach` for common setup
- Wait for elements to be visible before interacting
- Use descriptive test names that match user stories

## Test Utilities

### Custom Render

Use the custom render function for components that need providers:

```typescript
import { render } from '@/__tests__/setup/test-utils';

render(<MyComponent />);
// Automatically wrapped with ThemeProvider and other providers
```

### Mock Data Generators

Helper functions to create test data:

```typescript
import { createMockUser, createMockLesson } from '@/__tests__/setup/test-utils';

const user = createMockUser({ name: 'John Doe' });
const lesson = createMockLesson({ difficulty: 'advanced' });
```

### MSW Handlers

Mock API responses for testing:

```typescript
import { handlers } from '@/__tests__/setup/msw-handlers';
import { setupServer } from 'msw/node';

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

## Coverage Requirements

We aim for **80%+ coverage** across:
- Lines
- Functions
- Branches
- Statements

### Viewing Coverage

```bash
# Generate and view coverage report
npm run test:coverage

# Coverage report will be in ./coverage/index.html
```

### Coverage Exclusions

The following are excluded from coverage:
- `node_modules/`
- `__tests__/`
- Type definition files (`*.d.ts`)
- Configuration files
- Build output directories

## CI/CD Integration

Tests run automatically on:
- Pull requests to `main` or `develop`
- Pushes to `main`, `develop`, or `feature/*` branches

### CI Pipeline

1. **Unit & Integration Tests**
   - Runs on Node.js 20.x
   - Generates coverage report
   - Uploads to Codecov (if configured)
   - Comments on PR with coverage

2. **E2E Tests**
   - Runs on Node.js 20.x
   - Tests on Chromium, WebKit, and Mobile Chrome
   - Uploads test artifacts on failure
   - Retries flaky tests automatically

3. **Test Summary**
   - Aggregates results from all test jobs
   - Fails if any test suite fails

## Debugging Tests

### Unit & Integration Tests

```bash
# Run specific test file
npm test -- utils.test.ts

# Run tests matching pattern
npm test -- --grep "scoring"

# Run with UI for debugging
npm run test:ui
```

### E2E Tests

```bash
# Debug mode (step through tests)
npm run test:e2e:debug

# Headed mode (see browser)
npm run test:e2e:headed

# Run specific test file
npm run test:e2e -- welcome.spec.ts

# Run specific test by name
npm run test:e2e -- --grep "should display"
```

## Common Issues & Solutions

### Issue: Tests timeout

**Solution**: Increase timeout in test or config:
```typescript
test('slow test', async () => {
  // ...
}, { timeout: 10000 });
```

### Issue: Component not rendering

**Solution**: Check if providers are needed:
```typescript
import { render } from '@/__tests__/setup/test-utils';
// Uses custom render with providers
```

### Issue: E2E test can't find element

**Solution**: Add explicit waits:
```typescript
await page.waitForLoadState('networkidle');
await expect(element).toBeVisible();
```

### Issue: Mock not working

**Solution**: Ensure MSW server is set up:
```typescript
import { setupServer } from 'msw/node';
import { handlers } from '@/__tests__/setup/msw-handlers';

const server = setupServer(...handlers);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

## Best Practices

### General
1. **Test behavior, not implementation** - Focus on what users see and do
2. **Keep tests isolated** - Each test should be independent
3. **Use descriptive names** - Test names should explain what's being tested
4. **Follow AAA pattern** - Arrange, Act, Assert
5. **Test edge cases** - Don't just test the happy path

### Unit Tests
- Should be fast (< 100ms each)
- Test pure functions when possible
- Mock external dependencies
- Test one thing per test

### Integration Tests
- Test component interactions
- Use realistic user events
- Query by accessibility roles
- Avoid testing internal state

### E2E Tests
- Test complete user journeys
- Keep tests stable and deterministic
- Use page object pattern for complex pages
- Run in CI on every PR

## Next Steps

To expand test coverage:

1. **Add more unit tests**
   - Test all utility functions
   - Test custom hooks
   - Test data transformations

2. **Add more integration tests**
   - Test all UI components
   - Test form interactions
   - Test error states

3. **Add more E2E tests**
   - Test lesson completion flow
   - Test progress tracking
   - Test certificate generation

4. **Improve test infrastructure**
   - Add visual regression testing
   - Add performance testing
   - Add accessibility testing

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library Docs](https://testing-library.com/)
- [Playwright Documentation](https://playwright.dev/)
- [MSW Documentation](https://mswjs.io/)

## Contributing

When adding new features:
1. Write tests first (TDD approach)
2. Ensure all tests pass
3. Maintain coverage above 80%
4. Update this documentation if needed
