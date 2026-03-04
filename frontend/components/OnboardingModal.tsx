"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "popsip-onboarding-done";

const STEPS = [
  {
    emoji: "🔍",
    title: "Browse Bartenders",
    description:
      "Explore our community of verified professional mixologists. Filter by location, specialty, and price to find your perfect match.",
    action: "Browse Now →",
    href: "/bartenders",
  },
  {
    emoji: "📅",
    title: "Book Your Bartender",
    description:
      "Select a service package that fits your event. Fill in your event details and send a booking request in seconds.",
    action: "See How →",
    href: "/bartenders",
  },
  {
    emoji: "🎉",
    title: "Party Time!",
    description:
      "Your bartender arrives ready to serve. Sit back, relax, and enjoy professionally crafted cocktails at your event.",
    action: "Let's Go! 🍹",
    href: null,
  },
] as const;

interface OnboardingModalProps {
  /** Called from outside (e.g., Header help button) to re-open the modal. */
  open?: boolean;
  onClose?: () => void;
}

export default function OnboardingModal({
  open: controlledOpen,
  onClose,
}: OnboardingModalProps = {}) {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);

  // Show automatically only for first-time visitors.
  useEffect(() => {
    if (controlledOpen !== undefined) return; // externally controlled
    try {
      const done = localStorage.getItem(STORAGE_KEY);
      if (!done) setVisible(true);
    } catch {
      // localStorage not available (SSR / private browsing fallback)
    }
  }, [controlledOpen]);

  // Sync with externally controlled open state.
  useEffect(() => {
    if (controlledOpen === undefined) return;
    if (controlledOpen) {
      setStep(0);
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [controlledOpen]);

  const dismiss = () => {
    setVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore
    }
    onClose?.();
  };

  const next = () => {
    if (step < STEPS.length - 1) {
      setStep((s) => s + 1);
    } else {
      dismiss();
    }
  };

  if (!visible) return null;

  const current = STEPS[step];

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Welcome to PopSip"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={dismiss}
        aria-hidden="true"
      />

      {/* Modal panel */}
      <div className="relative w-full max-w-md glass-card rounded-3xl p-8 shadow-2xl animate-scale-in">
        {/* Step dots */}
        <div className="flex justify-center gap-2 mb-6">
          {STEPS.map((_, i) => (
            <button
              key={i}
              onClick={() => setStep(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i === step
                  ? "bg-orange-500 w-6"
                  : "bg-orange-200 hover:bg-orange-300"
              }`}
              aria-label={`Go to step ${i + 1}`}
            />
          ))}
        </div>

        {/* Close */}
        <button
          onClick={dismiss}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          aria-label="Dismiss onboarding"
        >
          ✕
        </button>

        {/* Content */}
        <div className="text-center mb-8" key={step}>
          <div className="text-6xl mb-4 animate-bounce-gentle">{current.emoji}</div>
          <h2 className="text-2xl font-black mb-3 text-gray-900">
            {current.title}
          </h2>
          <p className="text-gray-600 leading-relaxed">{current.description}</p>
        </div>

        {/* Step counter */}
        <p className="text-center text-xs text-gray-400 mb-6">
          Step {step + 1} of {STEPS.length}
        </p>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={dismiss}
            className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-gray-700 font-medium transition-colors text-sm"
          >
            Skip Tour
          </button>
          {current.href ? (
            <a
              href={current.href}
              onClick={next}
              className="flex-1 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-bold text-sm shadow-lg btn-lift text-center"
            >
              {current.action}
            </a>
          ) : (
            <button
              onClick={next}
              className="flex-1 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-bold text-sm shadow-lg btn-lift"
            >
              {current.action}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Utility – reset onboarding state (useful for testing / settings page).
 */
export function resetOnboarding() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
