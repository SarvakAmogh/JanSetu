'use client';

import { useRef, useState } from 'react';
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

const correctionGuidance: Record<PreSubmissionIssueId, string> = {
  'missing-name': 'Enter the full name shown in the sample profile.',
  'name-mismatch': 'Update the full name so it matches the sample profile.',
  'missing-address': 'Enter the residential address shown in the sample profile.',
  'address-mismatch': 'Update the address so the house number and address match the sample profile.',
  'missing-utility-bill': 'Mark the utility bill as uploaded after adding the sample document.',
  'expired-utility-bill': 'Use a current utility bill by clearing the expired bill checkbox.',
};

const controlIdForIssue: Record<PreSubmissionIssueId, string> = {
  'missing-name': 'full-name',
  'name-mismatch': 'full-name',
  'missing-address': 'address',
  'address-mismatch': 'address',
  'missing-utility-bill': 'utility-bill-uploaded',
  'expired-utility-bill': 'utility-bill-expired',
};

export default function PreSubmissionChecker() {
  const [hasStarted, setHasStarted] = useState(false);
  const [form, setForm] = useState<PreSubmissionInput>(initialForm);
  const [issues, setIssues] = useState<PreSubmissionIssue[]>([]);
  const [hasRunCheck, setHasRunCheck] = useState(false);
  const [needsRerun, setNeedsRerun] = useState(false);
  const [activeIssue, setActiveIssue] = useState<PreSubmissionIssueId | null>(null);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const addressInputRef = useRef<HTMLTextAreaElement>(null);
  const uploadedBillRef = useRef<HTMLInputElement>(null);
  const expiredBillRef = useRef<HTMLInputElement>(null);

  const runCheck = () => {
    const nextIssues = comparePreSubmission(form, sampleProfile);
    setIssues(nextIssues);
    setHasRunCheck(true);
    setNeedsRerun(false);
    setActiveIssue(null);
  };

  const markForRerun = () => {
    setNeedsRerun(true);
  };

  const focusCorrection = (issueId: PreSubmissionIssueId) => {
    setActiveIssue(issueId);

    const control =
      issueId === 'missing-name' || issueId === 'name-mismatch'
        ? nameInputRef.current
        : issueId === 'missing-address' || issueId === 'address-mismatch'
          ? addressInputRef.current
          : issueId === 'missing-utility-bill'
            ? uploadedBillRef.current
            : expiredBillRef.current;

    requestAnimationFrame(() => {
      control?.focus();
      control?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  };

  if (!hasStarted) {
    return (
      <section className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-sm font-semibold text-indigo-700">Residence Certificate</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">Start a new application</h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          Use this prototype flow to compare your application details with sample data before submission.
        </p>
        <p className="mt-4 text-xs leading-5 text-slate-500">
          Demo only — not connected to government systems.
        </p>
        <button type="button" onClick={() => setHasStarted(true)} className="mt-6 rounded-lg bg-indigo-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          Start Residence Certificate application
        </button>
      </section>
    );
  }

  const isReady = hasRunCheck && !needsRerun && issues.length === 0;
  const hasCurrentIssues = hasRunCheck && issues.length > 0;

  return (
    <section className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <header className="border-b border-slate-200 pb-5">
        <p className="text-sm font-semibold text-indigo-700">Residence Certificate</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">Pre-submission Consistency Check</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">Sample data only. This prototype highlights possible inconsistencies before submission.</p>
        <p className="mt-2 text-xs leading-5 text-slate-500">Demo only — not connected to government systems.</p>
      </header>

      <div className="mt-6 rounded-xl border border-indigo-100 bg-indigo-50 p-4 text-sm text-indigo-950">
        <p className="font-semibold">Sample citizen profile information</p>
        <p className="mt-1">{sampleProfile.fullName} · {sampleProfile.address}</p>
      </div>

      <div className="mt-6 space-y-5">
        <label className="block text-sm font-medium text-slate-800">
          Full name
          <input
            ref={nameInputRef}
            id="full-name"
            value={form.fullName}
            onChange={(event) => {
              setForm((current) => ({ ...current, fullName: event.target.value }));
              markForRerun();
            }}
            className="mt-1.5 block w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          />
        </label>
        <label className="block text-sm font-medium text-slate-800">
          Address
          <textarea
            ref={addressInputRef}
            id="address"
            value={form.address}
            onChange={(event) => {
              setForm((current) => ({ ...current, address: event.target.value }));
              markForRerun();
            }}
            rows={3}
            className="mt-1.5 block w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          />
        </label>
        <fieldset className="rounded-xl border border-slate-200 p-4">
          <legend className="px-1 text-sm font-semibold text-slate-800">Document checklist</legend>
          <div className="mt-2 flex flex-wrap gap-x-6 gap-y-3">
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input
                ref={uploadedBillRef}
                id="utility-bill-uploaded"
                type="checkbox"
                checked={form.documentUploaded}
                onChange={(event) => {
                  setForm((current) => ({
                    ...current,
                    documentUploaded: event.target.checked,
                    documentExpired: event.target.checked ? current.documentExpired : false,
                  }));
                  markForRerun();
                }}
                className="h-4 w-4 rounded border-slate-300 text-indigo-700 focus:ring-indigo-500"
              />
              Utility bill uploaded
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input
                ref={expiredBillRef}
                id="utility-bill-expired"
                type="checkbox"
                checked={form.documentExpired}
                disabled={!form.documentUploaded}
                onChange={(event) => {
                  setForm((current) => ({ ...current, documentExpired: event.target.checked }));
                  markForRerun();
                }}
                className="h-4 w-4 rounded border-slate-300 text-indigo-700 focus:ring-indigo-500 disabled:cursor-not-allowed"
              />
              Utility bill is expired
            </label>
          </div>
        </fieldset>
        {activeIssue && (
          <p className="rounded-lg border border-indigo-200 bg-indigo-50 p-3 text-sm leading-6 text-indigo-950" role="status">
            {correctionGuidance[activeIssue]} Make the correction, then run the check again.
          </p>
        )}
        <button type="button" onClick={runCheck} className="w-full rounded-lg bg-indigo-700 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          Run Pre-Submission Check
        </button>
      </div>

      {needsRerun && (
        <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900" role="status">
          Your details have changed. Run the Pre-Submission Check again to update the result.
        </p>
      )}

      {hasCurrentIssues && (
        <section className="mt-6" aria-labelledby="check-explanation">
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm font-semibold text-amber-950">Check result</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div>
                <h2 id="check-explanation" className="font-semibold text-slate-900">What went wrong</h2>
                <p className="mt-1 text-sm leading-6 text-slate-700">Some details in this sample application do not match the sample profile, and the utility bill is expired.</p>
              </div>
              <div>
                <h2 className="font-semibold text-slate-900">Why this matters</h2>
                <p className="mt-1 text-sm leading-6 text-slate-700">Different or expired information can delay an application or mean it needs correction before it can continue.</p>
              </div>
              <div>
                <h2 className="font-semibold text-slate-900">What should I correct</h2>
                <p className="mt-1 text-sm leading-6 text-slate-700">Use each Fix this button to go to the matching detail, then update it to match the sample information.</p>
              </div>
              <div>
                <h2 className="font-semibold text-slate-900">What should I do next</h2>
                <p className="mt-1 text-sm leading-6 text-slate-700">Correct every item, then run the check again. JanSetu does not submit this application anywhere.</p>
              </div>
            </div>
          </div>

          <div className="mt-3 space-y-3" aria-live="polite">
            {issues.map((issue) => (
              <div key={issue.id} className="flex flex-col gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-950 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold">{issue.title}</p>
                  <p className="mt-1 text-sm">{issue.message}</p>
                </div>
                <button
                  type="button"
                  onClick={() => focusCorrection(issue.id)}
                  aria-controls={controlIdForIssue[issue.id]}
                  className="min-h-11 shrink-0 rounded-lg bg-indigo-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Fix this
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {isReady && (
        <div className="mt-6 rounded-xl border-2 border-green-300 bg-green-50 p-5 text-green-950" role="status">
          <p className="font-semibold">No inconsistencies found</p>
          <h2 className="mt-2 text-lg font-bold">Ready to Submit</h2>
          <p className="mt-1 text-sm">The Pre-Submission Check found no remaining issues in this sample application. JanSetu has not submitted anything to a government system.</p>
        </div>
      )}
    </section>
  );
}
