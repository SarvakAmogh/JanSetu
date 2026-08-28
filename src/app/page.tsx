'use client';

import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function HomePage() {
  const stats = [
    { label: 'Services Supported', value: '100+', icon: '📋' },
    { label: 'Applications Processed', value: '50K+', icon: '✅' },
    { label: 'Rejections Prevented', value: '40%', icon: '🛡️' },
    { label: 'Citizens Helped', value: '25K+', icon: '👥' },
  ];

  const features = [
    {
      icon: '🔍',
      title: 'Find Services',
      description: 'Browse and search government services that match your needs.',
    },
    {
      icon: '✓',
      title: 'Check Before You Apply',
      description: 'Verify your eligibility and requirements before submission.',
    },
    {
      icon: '🛡️',
      title: 'Understand Rejections',
      description: 'Get clear explanations if your application is rejected.',
    },
    {
      icon: '🔗',
      title: 'Find Mismatches',
      description: 'Identify inconsistencies between documents and applications.',
    },
    {
      icon: '🔧',
      title: 'Know What To Fix',
      description: 'Follow step-by-step guidance to correct issues.',
    },
    {
      icon: '📱',
      title: 'Track Applications',
      description: 'Monitor your application status and next steps.',
    },
  ];

  const janSetuFlow = [
    { step: '1', label: 'Profile', desc: 'Create your profile' },
    { step: '2', label: 'Requirements', desc: 'Check requirements' },
    { step: '3', label: 'Documents', desc: 'Upload documents' },
    { step: '4', label: 'Apply', desc: 'Submit application' },
    { step: '5', label: 'Status', desc: 'Track status' },
    { step: '6', label: 'Support', desc: 'Get help if needed' },
  ];

  const services = [
    { name: 'PAN Card', desc: 'Permanent Account Number' },
    { name: 'Aadhaar', desc: 'Digital Identity' },
    { name: 'Passport', desc: 'Travel Document' },
    { name: 'Driving License', desc: 'Vehicle License' },
    { name: 'Voter ID', desc: 'Electoral Registration' },
    { name: 'Marriage Certificate', desc: 'Civil Registration' },
  ];

  return (
    <>
      <Header />
      <main className="bg-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-900 py-20 text-white sm:py-32">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,153,51,0.3)_1px,transparent_1px)]" style={{ backgroundSize: '40px 40px' }} />
          </div>

          <div className="section-container relative z-10">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-lg font-semibold text-saffron-300">Digital India Initiative</p>
              <h1 className="mt-4 text-5xl font-bold tracking-tight sm:text-6xl">
                One Profile.
                <br />
                Every Government Service.
              </h1>
              <p className="mt-6 text-xl text-indigo-100">
                JanSetu simplifies government service applications. Check your eligibility, understand rejections, and fix issues—all in one place.
              </p>

              {/* CTA Buttons */}
              <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                <Link href="/login" className="btn-primary-saffron text-lg px-8 py-4">
                  Get Started
                </Link>
                <a href="#services" className="btn-secondary text-lg px-8 py-4 bg-white text-indigo-900 border-0">
                  Explore Services
                </a>
              </div>

              {/* Search Bar */}
              <div className="mt-12 flex flex-col gap-3 sm:flex-row">
                <input
                  type="text"
                  placeholder="Search services (e.g., PAN, Aadhaar, Passport)"
                  className="flex-1 rounded-lg border-0 bg-white px-6 py-3 text-neutral-900 placeholder-neutral-500 focus:ring-2 focus:ring-saffron-400"
                />
                <button className="btn-primary-saffron px-8">Search</button>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="bg-gradient-to-b from-white to-neutral-50 py-16 sm:py-24">
          <div className="section-container">
            <div className="mb-12 text-center">
              <p className="text-sm font-bold text-saffron-600 uppercase tracking-wide">Why JanSetu</p>
              <h2 className="mt-2 text-4xl font-bold text-indigo-900">
                Trusted by Citizens Across India
              </h2>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, idx) => (
                <div key={idx} className="card-elevated p-8 text-center">
                  <div className="text-5xl">{stat.icon}</div>
                  <p className="mt-4 text-3xl font-bold text-indigo-900">{stat.value}</p>
                  <p className="mt-2 text-sm text-neutral-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Problem & Solution Section */}
        <section className="bg-white py-16 sm:py-24">
          <div className="section-container">
            <div className="grid gap-12 lg:grid-cols-2">
              {/* Problem */}
              <div>
                <p className="text-sm font-bold text-danger-600 uppercase tracking-wide">The Problem</p>
                <h2 className="mt-2 text-3xl font-bold text-indigo-900">
                  Government Services Shouldn&apos;t Require Guesswork
                </h2>
                <ul className="mt-6 space-y-4">
                  <li className="flex gap-3">
                    <span className="text-2xl">❌</span>
                    <div>
                      <p className="font-semibold text-neutral-900">Unclear Requirements</p>
                      <p className="text-sm text-neutral-600">Don&apos;t know what documents are needed</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-2xl">❌</span>
                    <div>
                      <p className="font-semibold text-neutral-900">Inconsistent Data</p>
                      <p className="text-sm text-neutral-600">Information mismatch between documents</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-2xl">❌</span>
                    <div>
                      <p className="font-semibold text-neutral-900">Confusing Rejections</p>
                      <p className="text-sm text-neutral-600">No clear explanation of what went wrong</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-2xl">❌</span>
                    <div>
                      <p className="font-semibold text-neutral-900">No Recovery Path</p>
                      <p className="text-sm text-neutral-600">Stuck without guidance on how to fix issues</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Solution */}
              <div>
                <p className="text-sm font-bold text-india-green-600 uppercase tracking-wide">The Solution</p>
                <h2 className="mt-2 text-3xl font-bold text-indigo-900">
                  JanSetu: Clarity at Every Step
                </h2>
                <ul className="mt-6 space-y-4">
                  <li className="flex gap-3">
                    <span className="text-2xl">✅</span>
                    <div>
                      <p className="font-semibold text-neutral-900">Check Before You Apply</p>
                      <p className="text-sm text-neutral-600">Verify eligibility and requirements upfront</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-2xl">✅</span>
                    <div>
                      <p className="font-semibold text-neutral-900">Consistency Checks</p>
                      <p className="text-sm text-neutral-600">Find and fix mismatches before submission</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-2xl">✅</span>
                    <div>
                      <p className="font-semibold text-neutral-900">Clear Explanations</p>
                      <p className="text-sm text-neutral-600">Understand exactly why rejections happen</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-2xl">✅</span>
                    <div>
                      <p className="font-semibold text-neutral-900">Step-by-Step Guidance</p>
                      <p className="text-sm text-neutral-600">Follow clear paths to resolve issues</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* JanSetu Flow Visualization */}
        <section className="bg-gradient-to-b from-neutral-50 to-white py-16 sm:py-24">
          <div className="section-container">
            <div className="mb-12 text-center">
              <p className="text-sm font-bold text-saffron-600 uppercase tracking-wide">How It Works</p>
              <h2 className="mt-2 text-4xl font-bold text-indigo-900">
                Your Journey with JanSetu
              </h2>
            </div>

            <div className="flex flex-wrap justify-between gap-4">
              {janSetuFlow.map((item, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-saffron-500 bg-saffron-50 font-bold text-2xl text-saffron-600">
                    {item.step}
                  </div>
                  <p className="mt-3 font-semibold text-neutral-900">{item.label}</p>
                  <p className="text-xs text-neutral-600">{item.desc}</p>
                  {idx < janSetuFlow.length - 1 && (
                    <div className="mt-4 hidden h-8 w-1 bg-gradient-to-b from-saffron-500 to-transparent sm:block" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="services" className="bg-white py-16 sm:py-24">
          <div className="section-container">
            <div className="mb-12 text-center">
              <p className="text-sm font-bold text-india-green-600 uppercase tracking-wide">Features</p>
              <h2 className="mt-2 text-4xl font-bold text-indigo-900">
                Everything You Need
              </h2>
              <p className="mt-3 text-lg text-neutral-600">
                Comprehensive tools to navigate government services with confidence
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, idx) => (
                <div key={idx} className="card-elevated p-8">
                  <div className="text-4xl">{feature.icon}</div>
                  <h3 className="mt-4 text-xl font-bold text-indigo-900">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-neutral-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Services */}
        <section className="bg-gradient-to-b from-white to-neutral-50 py-16 sm:py-24">
          <div className="section-container">
            <div className="mb-12 text-center">
              <p className="text-sm font-bold text-saffron-600 uppercase tracking-wide">Popular Services</p>
              <h2 className="mt-2 text-4xl font-bold text-indigo-900">
                Government Services on JanSetu
              </h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service, idx) => (
                <Link
                  key={idx}
                  href="/services"
                  className="card-elevated group overflow-hidden p-6 hover:border-saffron-300"
                >
                  <p className="text-2xl font-bold text-indigo-900 group-hover:text-saffron-600 smooth-transition">
                    {service.name}
                  </p>
                  <p className="mt-2 text-sm text-neutral-600">{service.desc}</p>
                  <div className="mt-4 flex items-center text-sm font-semibold text-saffron-600 opacity-0 group-hover:opacity-100 smooth-transition">
                    Learn More →
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-indigo-900 py-20 text-white">
          <div className="section-container text-center">
            <h2 className="text-4xl font-bold">Ready to Apply with Confidence?</h2>
            <p className="mt-4 text-lg text-indigo-100">
              Start your journey now and avoid rejection delays
            </p>
            <Link href="/login" className="btn-primary-saffron mt-8 text-lg px-8 py-4">
              Get Started Free
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
