import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@/__tests__/setup/test-utils';
import { Button } from '@/components/ui/button';
import userEvent from '@testing-library/user-event';

describe('Button Component', () => {
  it('should render button with text', () => {
    // Arrange & Act
    render(<Button>Click me</Button>);

    // Assert
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

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

  it('should apply variant classes correctly', () => {
    // Arrange & Act
    render(<Button variant="destructive">Delete</Button>);

    // Assert
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-destructive');
  });

  it('should apply size classes correctly', () => {
    // Arrange & Act
    render(<Button size="lg">Large Button</Button>);

    // Assert
    const button = screen.getByRole('button');
    expect(button).toHaveClass('h-10');
  });

  it('should be disabled when disabled prop is true', () => {
    // Arrange & Act
    render(<Button disabled>Disabled</Button>);

    // Assert
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should not trigger onClick when disabled', async () => {
    // Arrange
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button disabled onClick={handleClick}>Disabled</Button>);

    // Act
    await user.click(screen.getByRole('button'));

    // Assert
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('should merge custom className with default classes', () => {
    // Arrange & Act
    render(<Button className="custom-class">Button</Button>);

    // Assert
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
    expect(button).toHaveClass('inline-flex');
  });
});
