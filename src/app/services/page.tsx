import Link from 'next/link';

const serviceOptions = [
  {
    id: 'pan',
    name: 'PAN',
    description: 'Prepare sample application details before you continue.',
    href: '/services/pan',
    available: false,
  },
  {
    id: 'aadhaar',
    name: 'Aadhaar',
    description: 'Review sample information before you continue.',
    href: '/services/aadhaar',
    available: false,
  },
  {
    id: 'marriage-certificate',
    name: 'Marriage Certificate',
    description: 'Check sample details for a certificate application.',
    href: '/services/marriage-certificate',
    available: false,
  },
  {
    id: 'residence-certificate',
    name: 'Residence Certificate',
    description: 'Check your sample details before submitting your application.',
    href: '/services/domicile-certificate',
    available: true,
  },
] as const;

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <header className="max-w-2xl">
          <p className="text-sm font-semibold text-indigo-700">JanSetu</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            Choose a service
          </h1>
          <p className="mt-3 leading-6 text-slate-600">
            Select a service to start a sample application and check your details before submitting.
          </p>
        </header>

        <section className="mt-8 grid gap-4 sm:grid-cols-2" aria-label="Available services">
          {serviceOptions.map((service) => (
            <article key={service.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-xl font-bold text-slate-900">{service.name}</h2>
                <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                  service.available
                    ? 'bg-emerald-50 text-emerald-800'
                    : 'bg-slate-100 text-slate-600'
                }`}>
                  {service.available ? 'Available in demo' : 'Prototype only'}
                </span>
              </div>
              <p className="mt-2 min-h-12 text-sm leading-6 text-slate-600">
                {service.description}
              </p>
              <Link
                href={service.href}
                className="mt-5 inline-flex min-h-11 items-center justify-center rounded-lg bg-indigo-700 px-4 text-sm font-semibold text-white transition hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Start application
              </Link>
            </article>
          ))}
        </section>

        <p className="mt-8 text-center text-xs leading-5 text-slate-500">
          Demo only — not connected to government systems.
        </p>
      </div>
    </main>
  );
}
