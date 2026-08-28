'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '../../../lib/auth';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    const user = login(email.trim(), password);

    if (!user) {
      setError('Invalid email or password.');
      setIsLoading(false);
      return;
    }

    router.push('/dashboard');
  }

  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col bg-gradient-to-br from-neutral-50 via-white to-neutral-50">
        <div className="flex flex-1 items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
          <div className="w-full max-w-md">
            {/* Logo Section */}
            <div className="mb-8 text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-900 text-3xl font-bold text-white">
                J
              </div>
              <h1 className="text-3xl font-bold text-indigo-900">
                Welcome to JanSetu
              </h1>
              <p className="mt-2 text-sm text-neutral-600">
                Navigate government services with clarity
              </p>
            </div>

            {/* Login Card */}
            <div className="card-elevated p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="label-base">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                    required
                    className="input-base mt-2"
                  />
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="label-base">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="••••••••"
                    required
                    className="input-base mt-2"
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <div className="rounded-lg border border-danger-200 bg-danger-50 px-4 py-3 text-sm text-danger-700">
                    {error}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary-saffron w-full text-base font-semibold"
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </button>

                {/* Forgot Password Link */}
                <div className="text-center">
                  <a
                    href="#"
                    className="text-sm text-indigo-900 smooth-transition hover:text-saffron-500"
                  >
                    Forgot your password?
                  </a>
                </div>
              </form>
            </div>

            {/* Demo Credentials Section */}
            <div className="mt-8 rounded-lg border border-saffron-200 bg-saffron-50 p-6">
              <p className="text-xs font-bold uppercase tracking-wide text-saffron-700">
                📋 Demo Credentials
              </p>

              <div className="mt-4 space-y-3">
                <div>
                  <p className="text-sm font-semibold text-neutral-900">
                    Rahul Verma
                  </p>
                  <p className="mt-1 text-xs text-neutral-600">
                    rahul.demo@jansetu.test
                  </p>
                  <p className="mt-0.5 text-xs text-neutral-600">
                    Password: <code className="font-mono">Demo@123</code>
                  </p>
                </div>
              </div>

              <p className="mt-4 text-xs text-neutral-500">
                Demo only — not connected to government systems.
              </p>
            </div>

            {/* Help Text */}
            <p className="mt-8 text-center text-xs text-neutral-500">
              Need help?{' '}
              <a href="#" className="text-indigo-900 smooth-transition hover:text-saffron-500">
                Contact support
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
