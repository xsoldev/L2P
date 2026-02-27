import { describe, it, expect } from 'vitest';
import { render, screen } from '@/__tests__/setup/test-utils';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

describe('Alert Component', () => {
  it('should render alert with title and description', () => {
    // Arrange & Act
    render(
      <Alert>
        <AlertTitle>Alert Title</AlertTitle>
        <AlertDescription>Alert Description</AlertDescription>
      </Alert>
    );

    // Assert
    expect(screen.getByText('Alert Title')).toBeInTheDocument();
    expect(screen.getByText('Alert Description')).toBeInTheDocument();
  });

  it('should have role="alert"', () => {
    // Arrange & Act
    render(
      <Alert>
        <AlertTitle>Warning</AlertTitle>
      </Alert>
    );

    // Assert
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('should apply default variant styling', () => {
    // Arrange & Act
    render(
      <Alert>
        <AlertTitle>Default Alert</AlertTitle>
      </Alert>
    );

    // Assert
    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('bg-card');
  });

  it('should apply destructive variant styling', () => {
    // Arrange & Act
    render(
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
      </Alert>
    );

    // Assert
    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('text-destructive');
  });

  it('should render with icon slot', () => {
    // Arrange & Act
    render(
      <Alert>
        <svg data-testid="alert-icon">
          <circle />
        </svg>
        <AlertTitle>With Icon</AlertTitle>
        <AlertDescription>This alert has an icon</AlertDescription>
      </Alert>
    );

    // Assert
    expect(screen.getByTestId('alert-icon')).toBeInTheDocument();
    expect(screen.getByText('With Icon')).toBeInTheDocument();
  });

  it('should accept custom className', () => {
    // Arrange & Act
    render(
      <Alert className="custom-alert">
        <AlertTitle>Custom</AlertTitle>
      </Alert>
    );

    // Assert
    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('custom-alert');
    expect(alert).toHaveClass('rounded-lg');
  });
});
