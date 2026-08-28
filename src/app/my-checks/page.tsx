'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';

export default function MyChecksPage() {
  const router = useRouter();
  const [user, setUser] = useState<ReturnType<typeof getCurrentUser>>(null);

  useEffect(() => {
    const currentUser = getCurrentUser();

    if (!currentUser) {
      router.push('/login');
      return;
    }

    setUser(currentUser);
  }, [router]);

  if (!user) {
    return null;
  }

  const { persona } = user;

  return (
    <main className="min-h-screen bg-[#f7f8f6] px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <p className="text-sm text-[#58736d]">JanSetu</p>
          <h1 className="mt-2 text-3xl font-bold text-[#173f38]">
            My Checks
          </h1>
          <p className="mt-2 text-[#58736d]">
            Review consistency checks performed on your application.
          </p>
        </div>

        <section className="rounded-2xl border border-[#d8dfdc] bg-white p-7 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm text-[#58736d]">Application</p>
              <h2 className="mt-1 text-xl font-bold text-[#173f38]">
                {persona.description}
              </h2>
            </div>

            <span className="w-fit rounded-full bg-[#fff0d2] px-4 py-2 text-sm font-medium text-[#936316]">
              Needs correction
            </span>
          </div>

          <div className="mt-7 rounded-xl bg-[#f5f7f5] p-5">
            <p className="text-sm text-[#58736d]">Issue detected</p>
            <p className="mt-2 text-lg text-[#173f38]">
              {persona.rejectionSummary}
            </p>
          </div>

          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-[#d8dfdc] p-5">
              <p className="text-sm text-[#58736d]">Application details</p>
              <pre className="mt-3 whitespace-pre-wrap font-sans text-[#173f38]">
                {JSON.stringify(persona.applicationData, null, 2)}
              </pre>
            </div>

            <div className="rounded-xl border border-[#d8dfdc] p-5">
              <p className="text-sm text-[#58736d]">Supporting document</p>
              <pre className="mt-3 whitespace-pre-wrap font-sans text-[#173f38]">
                {JSON.stringify(persona.documentData, null, 2)}
              </pre>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <button
              onClick={() => router.push('/recovery')}
              className="rounded-xl bg-[#14584e] px-5 py-3 text-white hover:bg-[#10483f]"
            >
              See recovery steps
            </button>

            <button
              onClick={() => router.push('/dashboard')}
              className="rounded-xl border border-[#cbd6d2] bg-white px-5 py-3 text-[#173f38]"
            >
              Back to dashboard
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
