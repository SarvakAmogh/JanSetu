'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getCurrentUser, type AuthUser } from '@/lib/auth';

export default function DashboardPage() {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  if (!user) {
    return (
      <main className="min-h-screen bg-[#f7f8f5] flex items-center justify-center px-6">
        <section className="w-full max-w-xl rounded-2xl border border-[#d9e0dc] bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-semibold text-[#173d35]">
            Please sign in
          </h1>

          <p className="mt-3 text-[#587069]">
            Sign in to view your JanSetu applications.
          </p>

          <Link
            href="/login"
            className="mt-6 inline-flex min-h-11 items-center justify-center rounded-xl bg-[#164e43] px-6 text-sm font-medium text-white"
          >
            Go to login
          </Link>
        </section>
      </main>
    );
  }

  const { persona } = user;

  return (
    <main className="min-h-screen bg-[#f7f8f5] px-6 py-10">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-[#587069]">JanSetu</p>

            <h1 className="mt-1 text-3xl font-semibold text-[#173d35]">
              Welcome, {user.name}
            </h1>

            <p className="mt-2 text-[#587069]">
              Understand your application status and what to do next.
            </p>
          </div>

          <Link
            href="/profile"
            className="inline-flex min-h-10 items-center justify-center rounded-xl border border-[#cbd6d1] bg-white px-5 text-sm font-medium text-[#173d35]"
          >
            View profile
          </Link>
        </header>

        {/* Choose a journey */}
        <section className="mt-8 grid gap-4 lg:grid-cols-2" aria-label="Choose how JanSetu can help">
          <article className="rounded-2xl border border-[#e1d8c9] bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-[#805b16]">Already rejected?</p>
            <h2 className="mt-2 text-2xl font-semibold text-[#173d35]">
              Find out what went wrong
            </h2>
            <p className="mt-3 leading-6 text-[#587069]">
              Review the issue in your current application and follow clear recovery steps.
            </p>
            <Link
              href="/my-checks"
              className="mt-5 inline-flex min-h-12 items-center justify-center rounded-xl bg-[#164e43] px-5 text-sm font-medium text-white"
            >
              Check what went wrong
            </Link>
          </article>

          <article className="rounded-2xl border border-[#cbded6] bg-[#edf4f0] p-6 shadow-sm">
            <p className="text-sm font-medium text-[#376158]">Applying for a new service?</p>
            <h2 className="mt-2 text-2xl font-semibold text-[#173d35]">
              Start a new application
            </h2>
            <p className="mt-3 leading-6 text-[#587069]">
              Check your details before submitting a sample application.
            </p>
            <Link
              href="/services"
              className="mt-5 inline-flex min-h-12 items-center justify-center rounded-xl bg-[#164e43] px-5 text-sm font-medium text-white"
            >
              Start a new application
            </Link>
          </article>
        </section>

        {/* Rejection card */}
        <section className="mt-8 rounded-2xl border border-[#e1d8c9] bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-medium text-[#587069]">
                Application requiring attention
              </p>

              <h2 className="mt-2 text-2xl font-semibold text-[#173d35]">
                {persona.description}
              </h2>

              <p className="mt-3 text-[#587069]">
                {persona.rejectionSummary}
              </p>
            </div>

            <span className="inline-flex w-fit rounded-full bg-[#fff1d6] px-4 py-2 text-sm font-medium text-[#805b16]">
              Rejected
            </span>
          </div>

          {/* Rejection reason */}
          <div className="mt-6 rounded-xl bg-[#f7f8f5] p-5">
            <p className="text-sm font-medium text-[#587069]">
              Why was this flagged?
            </p>

            <p className="mt-2 text-[#173d35]">
              {persona.rejectionSummary}
            </p>
          </div>

          {/* CTA */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/my-checks"
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#164e43] px-6 text-sm font-medium text-white"
            >
              Check what went wrong
            </Link>

            <Link
              href="/my-applications"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#cbd6d1] bg-white px-6 text-sm font-medium text-[#173d35]"
            >
              View my applications
            </Link>
          </div>
        </section>

        {/* Quick overview */}
        <section className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-[#d9e0dc] bg-white p-5">
            <p className="text-sm text-[#587069]">Application</p>
            <p className="mt-2 font-semibold text-[#173d35]">
              {persona.id === 'rahul-pan'
                ? 'PAN Application'
                : persona.id === 'priya-aadhaar'
                  ? 'Aadhaar Application'
                  : 'Marriage Certificate'}
            </p>
          </div>

          <div className="rounded-2xl border border-[#d9e0dc] bg-white p-5">
            <p className="text-sm text-[#587069]">Status</p>
            <p className="mt-2 font-semibold text-[#9a4b36]">
              Needs correction
            </p>
          </div>

          <div className="rounded-2xl border border-[#d9e0dc] bg-white p-5">
            <p className="text-sm text-[#587069]">Next step</p>
            <p className="mt-2 font-semibold text-[#173d35]">
              Run consistency check
            </p>
          </div>
        </section>

        {/* JanSetu explanation */}
        <section className="mt-6 rounded-2xl border border-[#d9e0dc] bg-[#edf4f0] p-6">
          <p className="text-sm font-semibold text-[#173d35]">
            What JanSetu does
          </p>

          <p className="mt-2 max-w-3xl leading-7 text-[#587069]">
            JanSetu compares the information in your application with your
            supporting records, explains the mismatch in simple language, and
            gives you a clear recovery path.
          </p>
        </section>

        <p className="mt-6 text-center text-xs leading-5 text-[#71837d]">
          Demo only — not connected to government systems.
        </p>
      </div>
    </main>
  );
}
