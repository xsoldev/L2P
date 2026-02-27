import { describe, it, expect } from 'vitest';
import { render, screen } from '@/__tests__/setup/test-utils';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';

describe('Card Component', () => {
  it('should render card with all sections', () => {
    // Arrange & Act
    render(
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>Card Content</CardContent>
        <CardFooter>Card Footer</CardFooter>
      </Card>
    );

    // Assert
    expect(screen.getByText('Card Title')).toBeInTheDocument();
    expect(screen.getByText('Card Description')).toBeInTheDocument();
    expect(screen.getByText('Card Content')).toBeInTheDocument();
    expect(screen.getByText('Card Footer')).toBeInTheDocument();
  });

  it('should apply correct data-slot attributes', () => {
    // Arrange & Act
    render(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
        </CardHeader>
      </Card>
    );

    // Assert
    const cardElement = screen.getByText('Title').closest('[data-slot="card"]');
    expect(cardElement).toBeInTheDocument();
  });

  it('should render CardTitle with proper styling', () => {
    // Arrange & Act
    render(
      <Card>
        <CardHeader>
          <CardTitle>Test Title</CardTitle>
        </CardHeader>
      </Card>
    );

    // Assert
    const title = screen.getByText('Test Title');
    expect(title).toHaveClass('font-semibold');
  });

  it('should render CardDescription with proper styling', () => {
    // Arrange & Act
    render(
      <Card>
        <CardHeader>
          <CardDescription>Test Description</CardDescription>
        </CardHeader>
      </Card>
    );

    // Assert
    const description = screen.getByText('Test Description');
    expect(description).toHaveClass('text-muted-foreground');
  });

  it('should accept and apply custom className', () => {
    // Arrange & Act
    render(<Card className="custom-card">Content</Card>);

    // Assert
    const card = screen.getByText('Content').closest('[data-slot="card"]');
    expect(card).toHaveClass('custom-card');
    expect(card).toHaveClass('rounded-xl');
  });

  it('should compose Card with multiple children', () => {
    // Arrange & Act
    render(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>First paragraph</p>
          <p>Second paragraph</p>
        </CardContent>
        <CardFooter>
          <button>Action</button>
        </CardFooter>
      </Card>
    );

    // Assert
    expect(screen.getByText('First paragraph')).toBeInTheDocument();
    expect(screen.getByText('Second paragraph')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
  });
});
