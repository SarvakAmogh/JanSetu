'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200 bg-indigo-900 text-white">
      <div className="section-container py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* About */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wide">About JanSetu</h3>
            <p className="text-sm leading-relaxed text-neutral-300">
              JanSetu helps citizens navigate government services with clarity, reducing confusion and rejection rates.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wide">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/services" className="smooth-transition text-neutral-300 hover:text-saffron-300">
                  Browse Services
                </a>
              </li>
              <li>
                <a href="/my-applications" className="smooth-transition text-neutral-300 hover:text-saffron-300">
                  My Applications
                </a>
              </li>
              <li>
                <a href="/profile" className="smooth-transition text-neutral-300 hover:text-saffron-300">
                  My Profile
                </a>
              </li>
              <li>
                <a href="#" className="smooth-transition text-neutral-300 hover:text-saffron-300">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Government Links */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wide">Government</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="smooth-transition text-neutral-300 hover:text-saffron-300">
                  Digital India
                </a>
              </li>
              <li>
                <a href="#" className="smooth-transition text-neutral-300 hover:text-saffron-300">
                  e-Governance
                </a>
              </li>
              <li>
                <a href="#" className="smooth-transition text-neutral-300 hover:text-saffron-300">
                  Public Services
                </a>
              </li>
              <li>
                <a href="#" className="smooth-transition text-neutral-300 hover:text-saffron-300">
                  Grievance Portal
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wide">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="smooth-transition text-neutral-300 hover:text-saffron-300">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="smooth-transition text-neutral-300 hover:text-saffron-300">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="smooth-transition text-neutral-300 hover:text-saffron-300">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="smooth-transition text-neutral-300 hover:text-saffron-300">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-indigo-800" />

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between gap-4 text-sm text-neutral-400 sm:flex-row">
          <p>
            © {currentYear} JanSetu. A Digital India Initiative. All rights reserved.
          </p>
          <p className="text-xs">
            Demo only — not connected to government systems.
          </p>
        </div>
      </div>
    </footer>
  );
}
