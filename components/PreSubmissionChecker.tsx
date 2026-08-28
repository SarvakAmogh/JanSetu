'use client';

import { useRef, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
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
      <>
        <Header />
        <main className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-50">
          <div className="section-container py-12">
            <div className="card-elevated border-l-4 border-saffron-500 p-8 sm:p-12">
              <p className="text-sm font-bold text-saffron-600 uppercase tracking-wide">Before You Apply</p>
              <h1 className="mt-3 text-4xl font-bold text-indigo-900">
                Pre-Submission Consistency Check
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-neutral-600">
                Catch issues before they cause rejections. Compare your application details with your supporting documents to ensure everything matches.
              </p>
              <p className="mt-3 text-sm text-neutral-500">
                ℹ️ Demo only — not connected to government systems.
              </p>
              <button
                type="button"
                onClick={() => setHasStarted(true)}
                className="btn-primary-saffron mt-8 text-base"
              >
                Start Consistency Check
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const isReady = hasRunCheck && !needsRerun && issues.length === 0;
  const hasCurrentIssues = hasRunCheck && issues.length > 0;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-50">
        <div className="section-container py-12">
          {/* Header */}
          <div className="mb-8">
            <p className="text-sm font-bold text-saffron-600 uppercase tracking-wide">Application Review</p>
            <h1 className="mt-2 text-4xl font-bold text-indigo-900">
              Pre-Submission Consistency Check
            </h1>
            <p className="mt-3 text-lg text-neutral-600">
              Review sample data to identify any inconsistencies before submission.
            </p>
          </div>

          {/* Sample Profile Info Box */}
          <div className="mb-8 rounded-xl border-2 border-india-green-200 bg-india-green-50 p-6">
            <p className="text-sm font-bold text-india-green-700 uppercase">Sample Profile Information</p>
            <div className="mt-3 flex flex-col gap-2">
              <p className="text-neutral-700">
                <span className="font-semibold">Name:</span> {sampleProfile.fullName}
              </p>
              <p className="text-neutral-700">
                <span className="font-semibold">Address:</span> {sampleProfile.address}
              </p>
            </div>
          </div>

          {/* Form Section */}
          <div className="mb-8 card-elevated p-8">
            <h2 className="text-xl font-bold text-indigo-900">Your Details</h2>

            <div className="mt-6 space-y-6">
              {/* Full Name */}
              <div>
                <label htmlFor="full-name" className="label-base">
                  Full Name
                </label>
                <input
                  ref={nameInputRef}
                  id="full-name"
                  type="text"
                  value={form.fullName}
                  onChange={(event) => {
                    setForm((current) => ({ ...current, fullName: event.target.value }));
                    markForRerun();
                  }}
                  className="input-base mt-2"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Address */}
              <div>
                <label htmlFor="address" className="label-base">
                  Address
                </label>
                <textarea
                  ref={addressInputRef}
                  id="address"
                  value={form.address}
                  onChange={(event) => {
                    setForm((current) => ({ ...current, address: event.target.value }));
                    markForRerun();
                  }}
                  rows={3}
                  className="input-base mt-2"
                  placeholder="Enter your residential address"
                />
              </div>

              {/* Document Checklist */}
              <fieldset className="rounded-xl border-2 border-neutral-200 p-6">
                <legend className="text-sm font-bold text-indigo-900">Document Checklist</legend>
                <div className="mt-4 space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
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
                      className="h-5 w-5 rounded cursor-pointer accent-saffron-500"
                    />
                    <span className="text-neutral-700">Utility bill uploaded</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
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
                      className="h-5 w-5 rounded cursor-pointer accent-danger-500 disabled:opacity-50"
                    />
                    <span className={form.documentUploaded ? 'text-neutral-700' : 'text-neutral-500'}>
                      Utility bill is expired
                    </span>
                  </label>
                </div>
              </fieldset>

              {/* Active Issue Guidance */}
              {activeIssue && (
                <div className="rounded-lg border border-saffron-300 bg-saffron-50 p-4">
                  <p className="text-sm text-saffron-900">
                    <span className="font-semibold">💡 Tip:</span> {correctionGuidance[activeIssue]} Make the correction, then run the check again.
                  </p>
                </div>
              )}

              {/* Run Check Button */}
              <button
                type="button"
                onClick={runCheck}
                className="btn-primary-saffron w-full text-base"
              >
                Run Pre-Submission Check
              </button>
            </div>
          </div>

          {/* Needs Rerun Alert */}
          {needsRerun && (
            <div className="mb-8 rounded-lg border border-saffron-300 bg-saffron-50 p-4">
              <p className="text-sm text-saffron-900">
                ⚡ Your details have changed. Run the Pre-Submission Check again to update the result.
              </p>
            </div>
          )}

          {/* Check Results */}
          {hasCurrentIssues && (
            <div className="mb-8 space-y-6">
              {/* Result Summary */}
              <div className="rounded-xl border-2 border-danger-300 bg-danger-50 p-8">
                <p className="text-sm font-bold text-danger-700 uppercase">❌ Issues Found</p>
                <p className="mt-3 text-lg font-semibold text-neutral-900">
                  {issues.length === 1 ? '1 issue' : `${issues.length} issues`} detected
                </p>
                <p className="mt-2 text-neutral-700">
                  Please review and correct the issues below before submission.
                </p>
              </div>

              {/* Individual Issues */}
              <div className="space-y-3">
                {issues.map((issue) => (
                  <div
                    key={issue.id}
                    className="flex flex-col gap-4 rounded-xl border-2 border-danger-200 bg-danger-50 p-6 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="font-bold text-danger-900">{issue.title}</p>
                      <p className="mt-1 text-sm text-danger-800">{issue.message}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => focusCorrection(issue.id)}
                      aria-controls={controlIdForIssue[issue.id]}
                      className="btn-danger flex-shrink-0 whitespace-nowrap text-base"
                    >
                      Fix This
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Ready to Submit */}
          {isReady && (
            <div className="rounded-xl border-2 border-india-green-300 bg-india-green-50 p-8">
              <p className="text-sm font-bold text-india-green-700 uppercase">✓ Ready</p>
              <h2 className="mt-2 text-2xl font-bold text-india-green-900">
                No Inconsistencies Found
              </h2>
              <p className="mt-3 text-neutral-700">
                The Pre-Submission Check found no remaining issues in this sample application. Your details are consistent with the supporting documents.
              </p>
              <p className="mt-4 text-xs text-neutral-600">
                Note: JanSetu has not submitted this application anywhere. You can now proceed with confidence.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
