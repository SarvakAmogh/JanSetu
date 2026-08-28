'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getCurrentUser } from '../../../lib/auth';
import { runCheck } from '../../../lib/compare';

export default function RecoveryPage() {
  const [user, setUser] = useState<ReturnType<typeof getCurrentUser>>(null);
  const [completedSteps, setCompletedSteps] = useState<boolean[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  // Get current user
  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  // Load saved recovery progress
  useEffect(() => {
    const saved = localStorage.getItem('jansetu_recovery_steps');

    if (saved) {
      try {
        const parsed: boolean[] = JSON.parse(saved);

        if (Array.isArray(parsed)) {
          setCompletedSteps(parsed);
        }
      } catch {
        setCompletedSteps([]);
      }
    }

    setHasLoaded(true);
  }, []);

  // Save recovery progress
  useEffect(() => {
    if (!hasLoaded) {
      return;
    }

    localStorage.setItem(
      'jansetu_recovery_steps',
      JSON.stringify(completedSteps)
    );
  }, [completedSteps, hasLoaded]);

  if (!user) {
    return (
      <main className="min-h-screen bg-[#f7f8f5] flex items-center justify-center p-6">
        <section className="w-full max-w-xl rounded-2xl border border-[#dde3de] bg-white p-8 text-center">
          <p className="text-sm font-medium text-[#587069]">
            JanSetu
          </p>

          <h1 className="mt-3 text-2xl font-semibold text-[#173d35]">
            Please sign in first
          </h1>

          <p className="mt-3 text-[#4f675f]">
            You need to sign in to continue with the recovery process.
          </p>

          <Link
            href="/login"
            className="mt-6 inline-flex min-h-12 items-center justify-center rounded-xl bg-[#145448] px-6 text-sm font-medium text-white hover:bg-[#10483f]"
          >
            Go to login
          </Link>
        </section>
      </main>
    );
  }

  const check = runCheck(user.persona);
  const steps = check.resolutionSteps;

  const toggleStep = (index: number) => {
    setCompletedSteps((current) => {
      const next = [...current];

      next[index] = !next[index];

      return next;
    });
  };

  const completedCount = completedSteps.filter(Boolean).length;

  const progress =
    steps.length > 0
      ? Math.round((completedCount / steps.length) * 100)
      : 0;

  const isComplete =
    steps.length > 0 && completedCount === steps.length;

  const resetRecovery = () => {
    setCompletedSteps([]);
    localStorage.removeItem('jansetu_recovery_steps');
  };

  return (
    <main className="min-h-screen bg-[#f7f8f5] px-6 py-10">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-medium text-[#587069]">
            JanSetu
          </p>

          <h1 className="mt-2 text-3xl font-semibold text-[#173d35]">
            Recovery Assistant
          </h1>

          <p className="mt-2 max-w-2xl text-[#4f675f]">
            Follow the steps below to resolve the issue identified in your
            application and prepare it for resubmission.
          </p>
        </div>

        {/* Application summary */}
        <section className="rounded-2xl border border-[#dde3de] bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

            <div>
              <p className="text-sm font-medium text-[#587069]">
                Application
              </p>

              <h2 className="mt-2 text-2xl font-semibold text-[#173d35]">
                {user.persona.description}
              </h2>

              <p className="mt-3 text-[#4f675f]">
                {user.persona.rejectionSummary}
              </p>
            </div>

            <span className="inline-flex w-fit rounded-full bg-[#fff0cf] px-4 py-2 text-sm font-medium text-[#916313]">
              Recovery in progress
            </span>

          </div>
        </section>

        {/* Progress */}
        <section className="mt-6 rounded-2xl border border-[#dde3de] bg-white p-6">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm font-medium text-[#587069]">
                Recovery progress
              </p>

              <h2 className="mt-1 text-xl font-semibold text-[#173d35]">
                {completedCount} of {steps.length} steps completed
              </h2>
            </div>

            <span className="text-lg font-semibold text-[#145448]">
              {progress}%
            </span>

          </div>

          <div className="mt-4 h-3 overflow-hidden rounded-full bg-[#e7ece9]">
            <div
              className="h-full rounded-full bg-[#145448] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

        </section>

        {/* Recovery steps */}
        <section className="mt-6 rounded-2xl border border-[#dde3de] bg-white p-6">

          <div>
            <p className="text-sm font-medium text-[#587069]">
              Your recovery path
            </p>

            <h2 className="mt-2 text-xl font-semibold text-[#173d35]">
              Resolve the issue step by step
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#4f675f]">
              Complete each step and mark it as done. Your progress is saved
              automatically in this prototype.
            </p>
          </div>

          <div className="mt-6 space-y-4">

            {steps.map((step, index) => {
              const completed = completedSteps[index] === true;

              return (
                <div
                  key={`${index}-${step}`}
                  className={`rounded-xl border p-5 transition ${
                    completed
                      ? 'border-[#b9d8c8] bg-[#f0f8f3]'
                      : 'border-[#dde3de] bg-[#f8faf8]'
                  }`}
                >

                  <div className="flex gap-4">

                    {/* Step number */}
                    <button
                      type="button"
                      onClick={() => toggleStep(index)}
                      aria-label={
                        completed
                          ? `Mark step ${index + 1} as incomplete`
                          : `Mark step ${index + 1} as complete`
                      }
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition ${
                        completed
                          ? 'bg-[#145448] text-white'
                          : 'bg-[#e8eeeb] text-[#36534b] hover:bg-[#dce5e1]'
                      }`}
                    >
                      {completed ? '✓' : index + 1}
                    </button>

                    <div className="flex-1">

                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">

                        <div>
                          <p className="text-xs font-medium uppercase tracking-wide text-[#71837d]">
                            Step {index + 1}
                          </p>

                          <p
                            className={`mt-1 text-base leading-6 ${
                              completed
                                ? 'text-[#36534b] line-through'
                                : 'text-[#173d35]'
                            }`}
                          >
                            {step}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => toggleStep(index)}
                          className={`w-fit rounded-lg px-4 py-2 text-sm font-medium ${
                            completed
                              ? 'border border-[#cbd8d3] bg-white text-[#36534b]'
                              : 'bg-[#145448] text-white hover:bg-[#10483f]'
                          }`}
                        >
                          {completed
                            ? 'Completed'
                            : 'Mark complete'}
                        </button>

                      </div>

                    </div>

                  </div>

                </div>
              );
            })}

          </div>

        </section>

        {/* Completion message */}
        {isComplete && (
          <section
            className="mt-6 rounded-2xl border-2 border-[#a8d5ba] bg-[#f0f8f3] p-6"
            role="status"
          >

            <div className="flex gap-4">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#145448] text-lg text-white">
                ✓
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#173d35]">
                  Recovery steps completed
                </h2>

                <p className="mt-2 text-[#36534b]">
                  You have completed all the recommended recovery steps.
                  Re-run the consistency check before resubmitting your
                  application.
                </p>
              </div>

            </div>

          </section>
        )}

        {/* Actions */}
        <section className="mt-6 rounded-2xl border border-[#dde3de] bg-white p-6">

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">

            <Link
              href="/my-checks"
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#145448] px-6 text-sm font-medium text-white hover:bg-[#10483f]"
            >
              Re-run consistency check
            </Link>

            <Link
              href="/rejection"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#cbd8d3] bg-white px-6 text-sm font-medium text-[#173d35] hover:bg-[#f8faf8]"
            >
              View rejection details
            </Link>

            <button
              type="button"
              onClick={resetRecovery}
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#cbd8d3] bg-white px-6 text-sm font-medium text-[#173d35] hover:bg-[#f8faf8]"
            >
              Reset recovery progress
            </button>

            <Link
              href="/dashboard"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#cbd8d3] bg-white px-6 text-sm font-medium text-[#173d35] hover:bg-[#f8faf8]"
            >
              Back to dashboard
            </Link>

          </div>

        </section>

        <p className="mt-6 text-center text-xs leading-5 text-[#71837d]">
          Demo only — JanSetu is not connected to government systems.
        </p>

      </div>
    </main>
  );
}