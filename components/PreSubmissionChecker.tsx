'use client';

import { useState } from 'react';
import {
  comparePreSubmission,
  type PreSubmissionInput,
  type PreSubmissionIssue,
  type PreSubmissionIssueId,
} from '../lib/compare';

const sampleProfile = {
  fullName: 'Arjun Sharma',
  address: '12-4-89, Himayatnagar, Hyderabad',
};

const initialForm: PreSubmissionInput = {
  fullName: 'Arjun Sharm',
  address: '12-4-98, Himayatnagar, Hyderabad',
  documentUploaded: true,
  documentExpired: true,
};

export default function PreSubmissionChecker() {
  const [hasStarted, setHasStarted] = useState(false);
  const [form, setForm] = useState<PreSubmissionInput>(initialForm);
  const [issues, setIssues] = useState<PreSubmissionIssue[]>([]);
  const [hasRunCheck, setHasRunCheck] = useState(false);
  const [needsRerun, setNeedsRerun] = useState(false);

  const runCheck = () => {
    const nextIssues = comparePreSubmission(form, sampleProfile);
    setIssues(nextIssues);
    setHasRunCheck(true);
    setNeedsRerun(false);
  };

  const fixIssue = (issueId: PreSubmissionIssueId) => {
    setForm((current) => {
      switch (issueId) {
        case 'missing-name':
        case 'name-mismatch':
          return { ...current, fullName: sampleProfile.fullName };
        case 'missing-address':
        case 'address-mismatch':
          return { ...current, address: sampleProfile.address };
        case 'missing-utility-bill':
          return { ...current, documentUploaded: true, documentExpired: false };
        case 'expired-utility-bill':
          return { ...current, documentExpired: false };
      }
    });
    setIssues([]);
    setHasRunCheck(false);
    setNeedsRerun(true);
  };

  if (!hasStarted) {
    return (
      <section className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-sm font-semibold text-indigo-700">Residence Certificate</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">Start a new application</h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          Use this prototype flow to compare your application details with sample data before submission.
        </p>
        <button type="button" onClick={() => setHasStarted(true)} className="mt-6 rounded-lg bg-indigo-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          Start Residence Certificate application
        </button>
      </section>
    );
  }

  const isReady = hasRunCheck && issues.length === 0;

  return (
    <section className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <header className="border-b border-slate-200 pb-5">
        <p className="text-sm font-semibold text-indigo-700">Residence Certificate</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">Pre-submission Consistency Check</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">Sample data only. This prototype highlights possible inconsistencies before submission.</p>
      </header>

      <div className="mt-6 rounded-xl border border-indigo-100 bg-indigo-50 p-4 text-sm text-indigo-950">
        <p className="font-semibold">Sample citizen profile information</p>
        <p className="mt-1">{sampleProfile.fullName} · {sampleProfile.address}</p>
      </div>

      <div className="mt-6 space-y-5">
        <label className="block text-sm font-medium text-slate-800">
          Full name
          <input value={form.fullName} onChange={(event) => setForm((current) => ({ ...current, fullName: event.target.value }))} className="mt-1.5 block w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" />
        </label>
        <label className="block text-sm font-medium text-slate-800">
          Address
          <textarea value={form.address} onChange={(event) => setForm((current) => ({ ...current, address: event.target.value }))} rows={3} className="mt-1.5 block w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" />
        </label>
        <fieldset className="rounded-xl border border-slate-200 p-4">
          <legend className="px-1 text-sm font-semibold text-slate-800">Document checklist</legend>
          <div className="mt-2 flex flex-wrap gap-x-6 gap-y-3">
            <label className="flex items-center gap-2 text-sm text-slate-700"><input type="checkbox" checked={form.documentUploaded} onChange={(event) => setForm((current) => ({ ...current, documentUploaded: event.target.checked, documentExpired: event.target.checked ? current.documentExpired : false }))} className="h-4 w-4 rounded border-slate-300 text-indigo-700 focus:ring-indigo-500" />Utility bill uploaded</label>
            <label className="flex items-center gap-2 text-sm text-slate-700"><input type="checkbox" checked={form.documentExpired} disabled={!form.documentUploaded} onChange={(event) => setForm((current) => ({ ...current, documentExpired: event.target.checked }))} className="h-4 w-4 rounded border-slate-300 text-indigo-700 focus:ring-indigo-500 disabled:cursor-not-allowed" />Utility bill is expired</label>
          </div>
        </fieldset>
        <button type="button" onClick={runCheck} className="w-full rounded-lg bg-indigo-700 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Run Pre-Submission Check</button>
      </div>

      {needsRerun && <p className="mt-4 rounded-lg bg-amber-50 p-3 text-sm text-amber-900">A correction was applied. Run the Consistency Check again to update the result.</p>}

      {hasRunCheck && issues.length > 0 && <div className="mt-6 space-y-3" aria-live="polite">{issues.map((issue) => <div key={issue.id} className="flex flex-col gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-950 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-semibold">{issue.title}</p><p className="mt-1 text-sm">{issue.message}</p></div><button type="button" onClick={() => fixIssue(issue.id)} className="shrink-0 rounded-md bg-red-700 px-3 py-2 text-sm font-semibold text-white hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2">Fix this</button></div>)}</div>}

      {isReady && <div className="mt-6 rounded-xl border-2 border-green-300 bg-green-50 p-5 text-green-950" role="status"><h2 className="text-lg font-bold">Ready to Submit</h2><p className="mt-1 text-sm">The Consistency Check found no remaining issues in this sample application.</p></div>}
    </section>
  );
}
