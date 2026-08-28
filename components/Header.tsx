'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [showUtilityMenu, setShowUtilityMenu] = useState(false);

  return (
    <>
      {/* Government of India Utility Bar */}
      <div className="border-b border-neutral-200 bg-indigo-900 text-white">
        <div className="section-container flex flex-col items-start justify-between gap-3 py-2 sm:flex-row sm:items-center">
          <div className="text-xs font-medium">Government of India</div>
          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={() => setShowUtilityMenu(!showUtilityMenu)}
              className="smooth-transition hover:text-saffron-300 focus:outline-none focus:ring-2 focus:ring-saffron-300"
              aria-expanded={showUtilityMenu}
              aria-label="Accessibility options"
            >
              Accessibility (A-)
            </button>
            <a href="#" className="smooth-transition hover:text-saffron-300">
              Skip to main
            </a>
            <a href="#" className="smooth-transition hover:text-saffron-300">
              हिंदी
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="border-b border-neutral-200 bg-white shadow-sm">
        <div className="section-container flex flex-col items-start justify-between gap-4 py-4 sm:flex-row sm:items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-900 text-white font-bold">
              J
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-indigo-900">JanSetu</span>
              <span className="text-xs text-neutral-500">Government Services</span>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="flex flex-wrap items-center gap-6">
            <Link
              href="/"
              className="text-sm font-medium text-neutral-700 smooth-transition hover:text-indigo-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-saffron-500"
            >
              Home
            </Link>
            <Link
              href="/services"
              className="text-sm font-medium text-neutral-700 smooth-transition hover:text-indigo-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-saffron-500"
            >
              Services
            </Link>
            <Link
              href="/my-applications"
              className="text-sm font-medium text-neutral-700 smooth-transition hover:text-indigo-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-saffron-500"
            >
              Applications
            </Link>
            <Link
              href="/profile"
              className="text-sm font-medium text-neutral-700 smooth-transition hover:text-indigo-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-saffron-500"
            >
              Profile
            </Link>
            <Link
              href="/login"
              className="btn-primary text-sm"
            >
              Sign In
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
