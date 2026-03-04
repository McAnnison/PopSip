import { render, screen, fireEvent } from '@testing-library/react';
import OnboardingModal, { resetOnboarding } from '@/components/OnboardingModal';

// LocalStorage mock is provided by jest-environment-jsdom.

beforeEach(() => {
  localStorage.clear();
});

describe('OnboardingModal', () => {
  it('renders automatically on first visit (no localStorage key)', () => {
    render(<OnboardingModal />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Browse Bartenders')).toBeInTheDocument();
  });

  it('does NOT render when onboarding key is already set', () => {
    localStorage.setItem('popsip-onboarding-done', '1');
    render(<OnboardingModal />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('shows step 1 content initially', () => {
    render(<OnboardingModal />);
    expect(screen.getByText('Browse Bartenders')).toBeInTheDocument();
    expect(screen.getByText(/Step 1 of 3/i)).toBeInTheDocument();
  });

  it('advances to step 2 when primary action is clicked', () => {
    render(<OnboardingModal />);
    // The first step CTA is an anchor tag rendered as "Browse Now →"
    fireEvent.click(screen.getByText('Browse Now →'));
    expect(screen.getByText('Book Your Bartender')).toBeInTheDocument();
    expect(screen.getByText(/Step 2 of 3/i)).toBeInTheDocument();
  });

  it('dismisses and sets localStorage when Skip Tour is clicked', () => {
    render(<OnboardingModal />);
    fireEvent.click(screen.getByText('Skip Tour'));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(localStorage.getItem('popsip-onboarding-done')).toBe('1');
  });

  it('dismisses when the close (✕) button is clicked', () => {
    render(<OnboardingModal />);
    fireEvent.click(screen.getByLabelText('Dismiss onboarding'));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('dismisses when the backdrop overlay is clicked', () => {
    render(<OnboardingModal />);
    // The overlay sits behind the modal panel
    const overlay = screen.getByRole('dialog').querySelector('[aria-hidden="true"]')!;
    fireEvent.click(overlay);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders in controlled mode when open=true', () => {
    const onClose = jest.fn();
    render(<OnboardingModal open={true} onClose={onClose} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('calls onClose when dismissed in controlled mode', () => {
    const onClose = jest.fn();
    render(<OnboardingModal open={true} onClose={onClose} />);
    fireEvent.click(screen.getByText('Skip Tour'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does NOT render in controlled mode when open=false', () => {
    render(<OnboardingModal open={false} onClose={() => {}} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});

describe('resetOnboarding', () => {
  it('removes the onboarding key from localStorage', () => {
    localStorage.setItem('popsip-onboarding-done', '1');
    resetOnboarding();
    expect(localStorage.getItem('popsip-onboarding-done')).toBeNull();
  });
});
