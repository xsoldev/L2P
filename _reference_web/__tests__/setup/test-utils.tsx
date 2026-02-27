import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from 'next-themes';

interface ProvidersProps {
  children: React.ReactNode;
}

// Create a custom wrapper with all necessary providers
function AllTheProviders({ children }: ProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      {children}
    </ThemeProvider>
  );
}

// Custom render function that includes providers
function customRender(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return render(ui, { wrapper: AllTheProviders, ...options });
}

// Re-export everything from testing-library
export * from '@testing-library/react';
export { customRender as render };

// Helper function to create mock user data
export function createMockUser(overrides = {}) {
  return {
    id: '1',
    name: 'Test User',
    language: 'en' as const,
    ...overrides,
  };
}

// Helper function to create mock lesson data
export function createMockLesson(overrides = {}) {
  return {
    id: 1,
    title: 'Test Lesson',
    description: 'Test Description',
    difficulty: 'beginner' as const,
    ...overrides,
  };
}

// Helper to wait for async operations
export const waitForAsync = () => new Promise((resolve) => setTimeout(resolve, 0));
