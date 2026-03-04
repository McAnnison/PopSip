import { render, screen, fireEvent } from '@testing-library/react';
import Header from '@/components/Header';

// Mock next/link to render a plain anchor
jest.mock('next/link', () => {
  const MockLink = ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: any }) => (
    <a href={href} {...props}>{children}</a>
  );
  MockLink.displayName = 'MockLink';
  return MockLink;
});

describe('Header component', () => {
  it('renders the PopSip brand link', () => {
    render(<Header />);
    expect(screen.getByText('🍹 PopSip')).toBeInTheDocument();
  });

  it('renders desktop navigation links', () => {
    render(<Header />);
    const browseLinks = screen.getAllByText('Browse Bartenders');
    expect(browseLinks.length).toBeGreaterThan(0);
    const becomeLinks = screen.getAllByText('Become a Bartender');
    expect(becomeLinks.length).toBeGreaterThan(0);
    const bookNowLinks = screen.getAllByText('Book Now');
    expect(bookNowLinks.length).toBeGreaterThan(0);
  });

  it('renders the hamburger menu button', () => {
    render(<Header />);
    expect(screen.getByRole('button', { name: /toggle menu/i })).toBeInTheDocument();
  });

  it('toggles mobile navigation on hamburger click', () => {
    render(<Header />);
    const menuButton = screen.getByRole('button', { name: /toggle menu/i });

    // Mobile menu is initially hidden (max-h-0)
    const mobileNav = menuButton.closest('header')!.querySelector('.max-h-0, .max-h-80');
    expect(mobileNav).toHaveClass('max-h-0');

    // Click to open
    fireEvent.click(menuButton);
    expect(mobileNav).toHaveClass('max-h-80');

    // Click to close
    fireEvent.click(menuButton);
    expect(mobileNav).toHaveClass('max-h-0');
  });

  it('closes mobile nav when a link is clicked', () => {
    render(<Header />);
    const menuButton = screen.getByRole('button', { name: /toggle menu/i });

    // Open menu
    fireEvent.click(menuButton);
    const mobileNav = menuButton.closest('header')!.querySelector('.max-h-80');
    expect(mobileNav).toHaveClass('max-h-80');

    // Click a mobile link
    const mobileLinks = screen.getAllByText('Browse Bartenders');
    // The last one is in the mobile nav
    fireEvent.click(mobileLinks[mobileLinks.length - 1]);
    expect(mobileNav).toHaveClass('max-h-0');
  });
});
