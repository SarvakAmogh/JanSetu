"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getCurrentUser, type AuthUser } from "@/lib/auth";
import { runCheck } from "@/lib/compare";
import type { ComparisonResult, Persona } from "@/lib/types";

const sameValue = (first: string | null, second: string | null): boolean => {
  if (!first || !second) {
    return false;
  }

  return (
    first.trim().replace(/\s+/g, " ").toLowerCase() ===
    second.trim().replace(/\s+/g, " ").toLowerCase()
  );
};

const getPlainFieldName = (comparison: ComparisonResult): string => {
  if (comparison.fieldId === "dateofbirth") {
    return "date of birth";
  }

  return comparison.fieldLabel.toLowerCase();
};

const getProfileValue = (
  persona: Persona,
  comparison: ComparisonResult
): string | null => {
  if (comparison.fieldId === "name") {
    return persona.profile.fullName;
  }

  if (comparison.fieldId === "dateofbirth") {
    return persona.profile.dateOfBirth;
  }

  if (comparison.fieldId === "address") {
    return persona.profile.address;
  }

  return null;
};

function buildExplanation(
  comparisons: ComparisonResult[],
  persona: Persona,
  recoverySteps: string[]
) {
  const issue =
    comparisons.find((comparison) => comparison.result === "mismatch") ||
    comparisons.find((comparison) => comparison.result === "possible_mismatch") ||
    comparisons.find((comparison) => comparison.result === "missing");

  if (!issue) {
    return {
      whatWentWrong: "We could not find a difference in the sample information.",
      correction: "Review the application and supporting document before you continue.",
      nextSteps: recoverySteps.slice(0, 4),
    };
  }

  const fieldName = getPlainFieldName(issue);
  const applicationValue = issue.submittedValue || "not provided";
  const supportingValue = issue.expectedValue || "not provided";
  const profileValue = getProfileValue(persona, issue);

  let correction = "Check which version is correct, then update the application or supporting document so they match.";

  if (sameValue(profileValue, issue.submittedValue) && !sameValue(profileValue, issue.expectedValue)) {
    correction = `The sample profile matches your application. Correct the ${fieldName} in the supporting document so it matches your application.`;
  } else if (sameValue(profileValue, issue.expectedValue) && !sameValue(profileValue, issue.submittedValue)) {
    correction = `The sample profile matches the supporting document. Correct the ${fieldName} in your application so it matches.`;
  } else if (issue.result === "missing") {
    correction = `Add the missing ${fieldName} to the application, then check the details again.`;
  }

  return {
    whatWentWrong:
      issue.result === "missing"
        ? `Your ${fieldName} is not provided in the application.`
        : `The ${fieldName} in your application is ${applicationValue}, but your supporting document shows ${supportingValue}.`,
    correction,
    nextSteps: recoverySteps.slice(0, 4),
  };
}

export default function RejectionPage() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = getCurrentUser();

    setUser(currentUser);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7f8f5] px-6">
        <p className="text-[#587069]">
          Loading rejection details...
        </p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7f8f5] px-6">
        <section className="w-full max-w-xl rounded-2xl border border-[#dde3de] bg-white p-8 text-center shadow-sm">
          <p className="text-sm font-medium text-[#587069]">
            JanSetu
          </p>

          <h1 className="mt-3 text-2xl font-semibold text-[#173d35]">
            Please sign in first
          </h1>

          <p className="mt-3 text-[#4f675f]">
            You need to sign in to view your application rejection details.
          </p>

          <Link
            href="/login"
            className="mt-6 inline-flex min-h-12 items-center justify-center rounded-xl bg-[#145448] px-6 text-sm font-medium text-white"
          >
            Go to login
          </Link>
        </section>
      </main>
    );
  }

  const check = runCheck(user.persona);
  const explanation = buildExplanation(
    check.comparisons,
    user.persona,
    check.resolutionSteps
  );

  return (
    <main className="min-h-screen bg-[#f7f8f5] px-6 py-10">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <header className="mb-8">
          <p className="text-sm font-medium text-[#587069]">
            JanSetu
          </p>

          <h1 className="mt-2 text-3xl font-semibold text-[#173d35]">
            What went wrong?
          </h1>

          <p className="mt-2 max-w-2xl text-[#4f675f]">
            We compared the information in your application with the
            supporting records to identify the reason for rejection.
          </p>
        </header>

        {/* Application */}
        <section className="rounded-2xl border border-[#e2d8c8] bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

            <div>
              <p className="text-sm font-medium text-[#587069]">
                Application requiring attention
              </p>

              <h2 className="mt-2 text-2xl font-semibold text-[#173d35]">
                {user.persona.description}
              </h2>

              <p className="mt-3 text-[#4f675f]">
                {user.persona.rejectionSummary}
              </p>
            </div>

            <span className="inline-flex w-fit rounded-full bg-[#fff0cf] px-4 py-2 text-sm font-medium text-[#916313]">
              Rejected
            </span>

          </div>
        </section>

        {/* Consistency Check */}
        <section className="mt-6 rounded-2xl border border-[#dde3de] bg-white p-6 shadow-sm">

          <div>
            <p className="text-sm font-medium text-[#587069]">
              Consistency check
            </p>

            <h2 className="mt-2 text-xl font-semibold text-[#173d35]">
              {check.summary}
            </h2>

            <p className="mt-3 leading-6 text-[#4f675f]">
              {check.explanation}
            </p>
          </div>

          <div className="mt-6 space-y-4">

            {check.comparisons.map((comparison) => (
              <div
                key={comparison.fieldId}
                className="rounded-xl border border-[#dde3de] bg-[#f8faf8] p-5"
              >

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                  <h3 className="font-semibold text-[#173d35]">
                    {comparison.fieldLabel}
                  </h3>

                  <span
                    className={`w-fit rounded-full px-3 py-1 text-xs font-medium ${
                      comparison.result === "match"
                        ? "bg-[#e2f3e9] text-[#17603f]"
                        : comparison.result === "possible_mismatch"
                          ? "bg-[#fff0cf] text-[#916313]"
                          : "bg-[#fde8e4] text-[#a64634]"
                    }`}
                  >
                    {comparison.result === "match"
                      ? "Match"
                      : comparison.result === "possible_mismatch"
                        ? "Possible mismatch"
                        : comparison.result === "missing"
                          ? "Missing"
                          : "Mismatch"}
                  </span>

                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">

                  <div className="rounded-lg bg-white p-4">
                    <p className="text-xs font-medium uppercase tracking-wide text-[#71837d]">
                      Application
                    </p>

                    <p className="mt-2 text-[#173d35]">
                      {comparison.submittedValue || "Not provided"}
                    </p>
                  </div>

                  <div className="rounded-lg bg-white p-4">
                    <p className="text-xs font-medium uppercase tracking-wide text-[#71837d]">
                      Supporting record
                    </p>

                    <p className="mt-2 text-[#173d35]">
                      {comparison.expectedValue || "Not provided"}
                    </p>
                  </div>

                </div>

                <p className="mt-4 text-sm leading-6 text-[#4f675f]">
                  {comparison.message}
                </p>

              </div>
            ))}

          </div>
        </section>

        {/* Plain-language explanation */}
        <section className="mt-6 rounded-2xl border border-[#cfe0d8] bg-[#f1f7f3] p-6" aria-labelledby="analysis-title">
          <div>
            <p className="text-sm font-medium text-[#426258]">
              JanSetu analysis — demo data
            </p>
            <h2 id="analysis-title" className="mt-2 text-xl font-semibold text-[#173d35]">
              A simple explanation
            </h2>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <section className="rounded-xl bg-white p-4">
              <h3 className="font-semibold text-[#173d35]">What went wrong?</h3>
              <p className="mt-2 text-sm leading-6 text-[#4f675f]">
                {explanation.whatWentWrong}
              </p>
            </section>

            <section className="rounded-xl bg-white p-4">
              <h3 className="font-semibold text-[#173d35]">Why this matters</h3>
              <p className="mt-2 text-sm leading-6 text-[#4f675f]">
                When information does not match, an application can be delayed or may need a correction before it can continue.
              </p>
            </section>

            <section className="rounded-xl bg-white p-4 sm:col-span-2">
              <h3 className="font-semibold text-[#173d35]">What should I correct?</h3>
              <p className="mt-2 text-sm leading-6 text-[#4f675f]">
                {explanation.correction}
              </p>
            </section>
          </div>

          <section className="mt-4 rounded-xl bg-white p-4">
            <h3 className="font-semibold text-[#173d35]">What should I do next?</h3>
            <ol className="mt-3 space-y-2 text-sm leading-6 text-[#4f675f]">
              {explanation.nextSteps.map((step, index) => (
                <li key={step} className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#145448] text-xs font-medium text-white">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            <Link
              href="/recovery"
              className="mt-5 inline-flex min-h-11 items-center justify-center rounded-xl bg-[#145448] px-5 text-sm font-medium text-white"
            >
              Start recovery
            </Link>
          </section>
        </section>

        {/* Recovery Path */}
        <section className="mt-6 rounded-2xl border border-[#dde3de] bg-white p-6 shadow-sm">

          <p className="text-sm font-medium text-[#587069]">
            Your recovery path
          </p>

          <h2 className="mt-2 text-xl font-semibold text-[#173d35]">
            What you should do next
          </h2>

          <ol className="mt-5 space-y-3">

            {check.resolutionSteps.map((step, index) => (
              <li
                key={step}
                className="flex gap-4 rounded-xl bg-[#f8faf8] p-4"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#145448] text-sm font-medium text-white">
                  {index + 1}
                </span>

                <p className="pt-1 leading-6 text-[#36534b]">
                  {step}
                </p>
              </li>
            ))}

          </ol>

          {/* Actions */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">

            <Link
              href="/recovery"
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#145448] px-6 text-sm font-medium text-white"
            >
              Start recovery
            </Link>

            <a
              href={check.grievanceUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#cbd8d3] bg-white px-6 text-sm font-medium text-[#173d35]"
            >
              {check.grievanceLabel}
            </a>

            <Link
              href="/dashboard"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#cbd8d3] bg-white px-6 text-sm font-medium text-[#173d35]"
            >
              Back to dashboard
            </Link>

          </div>

        </section>

        {/* Disclaimer */}
        <p className="mt-6 text-center text-xs leading-5 text-[#71837d]">
          Demo only — JanSetu is not connected to government systems.
        </p>

      </div>
    </main>
  );
}
