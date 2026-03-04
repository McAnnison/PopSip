import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

// Mock Next.js components
jest.mock('next/link', () => {
  const MockLink = ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: any }) => (
    <a href={href} {...props}>{children}</a>
  );
  MockLink.displayName = 'MockLink';
  return MockLink;
});

jest.mock('next/image', () => {
  const MockImage = ({ src, alt, ...props }: { src: string; alt: string; [key: string]: any }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} {...props} />
  );
  MockImage.displayName = 'MockImage';
  return MockImage;
});

// Mock the Header component
jest.mock('@/components/Header', () => {
  const MockHeader = () => <header data-testid="header">Header</header>;
  MockHeader.displayName = 'MockHeader';
  return MockHeader;
});

describe('Home page', () => {
  it('renders the hero heading', () => {
    render(<Home />);
    expect(screen.getByText('Your Party,')).toBeInTheDocument();
    expect(screen.getByText('Your Bartender')).toBeInTheDocument();
  });

  it('renders the Find Bartenders CTA link', () => {
    render(<Home />);
    const findLinks = screen.getAllByText(/Find Bartenders/i);
    expect(findLinks.length).toBeGreaterThan(0);
    expect(findLinks[0].closest('a')).toHaveAttribute('href', '/bartenders');
  });

  it('renders the Join as Bartender CTA link', () => {
    render(<Home />);
    const joinLinks = screen.getAllByText(/Join as Bartender/i);
    expect(joinLinks.length).toBeGreaterThan(0);
    expect(joinLinks[0].closest('a')).toHaveAttribute('href', '/join');
  });

  it('renders the Why PopSip? section', () => {
    render(<Home />);
    expect(screen.getByText('Why PopSip?')).toBeInTheDocument();
  });

  it('renders the How It Works section', () => {
    render(<Home />);
    const howItWorksElements = screen.getAllByText('How It Works');
    expect(howItWorksElements.length).toBeGreaterThan(0);
  });

  it('renders the footer', () => {
    render(<Home />);
    expect(screen.getByText(/PopSip. All rights reserved./i)).toBeInTheDocument();
  });

  it('renders the header component', () => {
    render(<Home />);
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });
});
