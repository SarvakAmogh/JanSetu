"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser, type AuthUser } from "@/lib/auth";

export default function MyApplicationsPage() {
  const router = useRouter();

  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = getCurrentUser();

    if (!currentUser) {
      router.push("/login");
      return;
    }

    setUser(currentUser);
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7f8f6] px-6">
        <p className="text-[#58736d]">
          Loading your applications...
        </p>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  const { persona } = user;

  const applicationName =
    persona.id === "rahul-pan"
      ? "PAN Application"
      : persona.id === "priya-aadhaar"
        ? "Aadhaar Application"
        : "Marriage Certificate";

  return (
    <main className="min-h-screen bg-[#f7f8f6] px-6 py-10">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <header className="mb-8">
          <p className="text-sm font-medium text-[#58736d]">
            JanSetu
          </p>

          <h1 className="mt-2 text-3xl font-semibold text-[#173f38]">
            My Applications
          </h1>

          <p className="mt-2 text-[#58736d]">
            View your applications and understand their current status.
          </p>
        </header>

        {/* Application Card */}
        <section className="rounded-2xl border border-[#d8dfdc] bg-white p-7 shadow-sm">

          {/* Application Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

            <div>
              <p className="text-sm font-medium text-[#58736d]">
                Application
              </p>

              <h2 className="mt-2 text-2xl font-semibold text-[#173f38]">
                {applicationName}
              </h2>

              <p className="mt-2 text-sm text-[#58736d]">
                {persona.description}
              </p>
            </div>

            <span className="w-fit rounded-full bg-[#fff0d2] px-4 py-2 text-sm font-medium text-[#936316]">
              Rejected
            </span>

          </div>

          {/* Application Details */}
          <div className="mt-7 grid gap-4 sm:grid-cols-3">

            <div className="rounded-xl border border-[#d8dfdc] p-5">
              <p className="text-sm text-[#58736d]">
                Applicant
              </p>

              <p className="mt-2 font-semibold text-[#173f38]">
                {persona.profile.fullName}
              </p>
            </div>

            <div className="rounded-xl border border-[#d8dfdc] p-5">
              <p className="text-sm text-[#58736d]">
                State
              </p>

              <p className="mt-2 font-semibold text-[#173f38]">
                {persona.profile.state}
              </p>
            </div>

            <div className="rounded-xl border border-[#d8dfdc] p-5">
              <p className="text-sm text-[#58736d]">
                Status
              </p>

              <p className="mt-2 font-semibold text-[#a64d36]">
                Needs correction
              </p>
            </div>

          </div>

          {/* Rejection Reason */}
          <div className="mt-7 rounded-xl bg-[#f5f7f5] p-5">

            <p className="text-sm font-medium text-[#58736d]">
              Reason for rejection
            </p>

            <p className="mt-2 leading-6 text-[#173f38]">
              {persona.rejectionSummary}
            </p>

          </div>

          {/* What JanSetu Found */}
          <div className="mt-6 rounded-xl border border-[#d8dfdc] p-5">

            <p className="text-sm font-medium text-[#58736d]">
              JanSetu analysis
            </p>

            <p className="mt-2 leading-6 text-[#4f615c]">
              Your application has been reviewed by JanSetu. You can view
              the detected inconsistency and follow the recommended
              recovery steps.
            </p>

          </div>

          {/* Actions */}
          <div className="mt-7 flex flex-wrap gap-3">

            <button
              onClick={() => router.push("/rejection")}
              className="rounded-xl bg-[#14584e] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#10483f]"
            >
              View rejection
            </button>

            <button
              onClick={() => router.push("/my-checks")}
              className="rounded-xl border border-[#cbd6d2] bg-white px-5 py-3 text-sm font-medium text-[#173f38] transition hover:bg-[#f5f7f5]"
            >
              View consistency check
            </button>

            <button
              onClick={() => router.push("/recovery")}
              className="rounded-xl border border-[#cbd6d2] bg-white px-5 py-3 text-sm font-medium text-[#173f38] transition hover:bg-[#f5f7f5]"
            >
              Recovery steps
            </button>

            <button
              onClick={() => router.push("/dashboard")}
              className="rounded-xl border border-[#cbd6d2] bg-white px-5 py-3 text-sm font-medium text-[#173f38] transition hover:bg-[#f5f7f5]"
            >
              Back to dashboard
            </button>

          </div>

        </section>

        {/* Disclaimer */}
        <p className="mt-6 text-center text-xs leading-5 text-[#6b7b76]">
          Demo only — JanSetu is not connected to government systems.
        </p>

      </div>
    </main>
  );
}