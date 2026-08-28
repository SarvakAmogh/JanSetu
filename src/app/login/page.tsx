'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '../../../lib/auth';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');

    const user = login(email.trim(), password);

    if (!user) {
      setError('Invalid email or password.');
      return;
    }

    router.push('/dashboard');
  }

  return (
    <main className="min-h-screen bg-[#f7f8f5] px-4 py-12 text-[#173d35]">
      <div className="mx-auto flex min-h-[80vh] max-w-md items-center">
        <section className="w-full rounded-2xl border border-[#dde3de] bg-white p-8 shadow-sm">
          <div className="mb-8">
            <p className="text-sm font-medium text-[#587069]">
              JanSetu
            </p>

            <h1 className="mt-2 text-3xl font-semibold tracking-tight">
              Welcome back
            </h1>

            <p className="mt-2 text-sm leading-6 text-[#4f625c]">
              Sign in to check your application and understand what to do
              after a rejection.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email"
                required
                className="w-full rounded-xl border border-[#cfd8d3] px-4 py-3 text-sm outline-none transition focus:border-[#173d35] focus:ring-2 focus:ring-[#173d35]/10"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                required
                className="w-full rounded-xl border border-[#cfd8d3] px-4 py-3 text-sm outline-none transition focus:border-[#173d35] focus:ring-2 focus:ring-[#173d35]/10"
              />
            </div>

            {error && (
              <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full rounded-xl bg-[#173d35] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#245348]"
            >
              Sign in
            </button>
          </form>

          <div className="mt-8 rounded-xl bg-[#f3f6f3] p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#587069]">
              Demo account
            </p>

            <p className="mt-2 text-sm text-[#334c45]">
              Rahul Verma
            </p>

            <p className="mt-1 text-xs text-[#587069]">
              rahul.demo@jansetu.test
            </p>

            <p className="mt-1 text-xs text-[#587069]">
              Password: Demo@123
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}