import Link from 'next/link';
import PreSubmissionChecker from '../../../../components/PreSubmissionChecker';

interface ServiceDetailPageProps {
  params: { id: string };
}

export default function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  if (params.id === 'domicile-certificate') {
    return <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6"><PreSubmissionChecker /></main>;
  }

  return <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6"><section className="mx-auto max-w-2xl rounded-xl bg-white p-6 shadow-sm"><h1 className="text-2xl font-bold text-slate-900">Service prototype</h1><p className="mt-2 text-slate-600">This service flow is not available in the current prototype.</p><Link href="/services" className="mt-5 inline-block font-semibold text-indigo-700 hover:text-indigo-900">Browse services</Link></section></main>;
}
