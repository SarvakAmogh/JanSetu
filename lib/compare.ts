import type { Persona, ComparisonResult, FieldResult } from './types';

const normalize = (value: string): string =>
  value.trim().replace(/\s+/g, ' ').toLowerCase();

const isSimilar = (a: string, b: string): boolean => {
  const normA = normalize(a);
  const normB = normalize(b);

  if (normA === normB) return true;

  // Handle single-character differences
  if (Math.abs(normA.length - normB.length) <= 1) {
    let diffCount = 0;
    const maxLen = Math.max(normA.length, normB.length);
    for (let i = 0; i < maxLen; i++) {
      if (normA[i] !== normB[i]) diffCount++;
    }
    if (diffCount <= 1) return true;
  }

  // Handle one containing another (e.g., "Priya Reddy" vs "Priya R. Reddy")
  if (normA.includes(normB) || normB.includes(normA)) return true;

  // Handle punctuation/spacing differences
  const cleanA = normA.replace(/[.,\-\s]/g, '');
  const cleanB = normB.replace(/[.,\-\s]/g, '');
  if (cleanA === cleanB) return true;

  return false;
};

export function compareFields(
  appData: Record<string, string>,
  docData: Record<string, string>,
  profileData?: Record<string, string>
): ComparisonResult[] {
  const results: ComparisonResult[] = [];
  const allKeys = new Set([...Object.keys(appData), ...Object.keys(docData)]);

  for (const key of allKeys) {
    const appValue = appData[key] || '';
    const docValue = docData[key] || '';
    const profValue = profileData?.[key] || '';

    // Use profile data if available, otherwise use document data
    const expectedValue = profValue || docValue;
    const submittedValue = appValue;

    let result: FieldResult = 'match';
    let message = 'Information matches across records.';

    if (!submittedValue) {
      result = 'missing';
      message = `${key} is missing from the application.`;
    } else if (!expectedValue) {
      result = 'missing';
      message = `${key} is missing from the supporting document or profile.`;
    } else if (normalize(submittedValue) === normalize(expectedValue)) {
      result = 'match';
      message = `${key} matches across records.`;
    } else if (isSimilar(submittedValue, expectedValue)) {
      result = 'possible_mismatch';
      message = `${key} format or spelling differs slightly. Review carefully.`;
    } else {
      result = 'mismatch';
      message = `${key} clearly differs between application and supporting information.`;
    }

    results.push({
      fieldId: key.toLowerCase().replace(/\s+/g, '-'),
      fieldLabel: key.charAt(0).toUpperCase() + key.slice(1),
      expectedValue: expectedValue || null,
      submittedValue: submittedValue || null,
      result,
      message,
    });
  }

  return results;
}

export interface RunCheckResult {
  hasIssues: boolean;
  comparisons: ComparisonResult[];
  summary: string;
  overallResult: FieldResult;
  explanation: string;
  resolutionSteps: string[];
  grievanceUrl: string;
  grievanceLabel: string;
}

export function runCheck(persona: Persona): RunCheckResult {
  const comparisons = compareFields(
    persona.applicationData,
    persona.documentData,
    persona.profile
  );

  const hasIssues = comparisons.some((c) => c.result !== 'match');
  const overallResult: FieldResult = hasIssues
    ? comparisons.some((c) => c.result === 'mismatch')
      ? 'mismatch'
      : 'possible_mismatch'
    : 'match';

  const mismatchCount = comparisons.filter((c) => c.result === 'mismatch').length;
  const possibleCount = comparisons.filter((c) => c.result === 'possible_mismatch').length;
  const missingCount = comparisons.filter((c) => c.result === 'missing').length;

  let summary = `${comparisons.length} field(s) checked: `;
  const parts: string[] = [];
  if (mismatchCount > 0) parts.push(`${mismatchCount} clear mismatch(es)`);
  if (possibleCount > 0) parts.push(`${possibleCount} possible mismatch(es)`);
  if (missingCount > 0) parts.push(`${missingCount} missing field(s)`);
  if (parts.length === 0) parts.push('all match');
  summary += parts.join(', ');

  // Generate explanation and steps based on persona
  let explanation = '';
  let resolutionSteps: string[] = [];
  let grievanceUrl = '/rejection';
  let grievanceLabel = 'File a grievance';

  if (persona.id === 'rahul-pan') {
    explanation =
      'Your PAN application contains a different date of birth from the sample Aadhaar/profile information associated with this prototype. Because these values are inconsistent, JanSetu has flagged a possible mismatch.';
    resolutionSteps = [
      'Check your correct date of birth against your authoritative supporting document.',
      'Determine whether the PAN application or profile information is incorrect.',
      'If Aadhaar/profile information is wrong, follow the Aadhaar correction process.',
      'If the PAN application is wrong, correct it with the accurate date of birth.',
      'Ensure date of birth is consistent across all relevant documents.',
      'Re-run the JanSetu consistency check to confirm the correction.',
      'Continue with your PAN application once the information is consistent.',
      'If the issue persists, use the appropriate official grievance channel.',
    ];
    grievanceUrl = '/rejection?service=pan';
    grievanceLabel = 'PAN Grievance Portal';
  } else if (persona.id === 'arjun-marriage') {
    explanation =
      'Your Marriage Certificate application contains a different address from the supporting document information associated with this prototype. Specifically, the house number differs between the application and supporting documentation, which has flagged a mismatch.';
    resolutionSteps = [
      'Compare the address in your application with the supporting document.',
      'Identify which address is correct — the one in your application or the supporting document.',
      'Correct the address that contains the error.',
      'Ensure all address fields match across the application and supporting documents.',
      'Prepare the corrected supporting document if necessary.',
      'Resubmit your application with the consistent address information.',
      'If the issue persists after resubmission, use the official grievance channel.',
    ];
    grievanceUrl = '/rejection?service=marriage-certificate';
    grievanceLabel = 'Marriage Certificate Grievance Portal';
  } else if (persona.id === 'priya-aadhaar') {
    explanation =
      'Your Aadhaar application contains a different name format from the supporting document information. The difference is in the middle initial representation (e.g., "Priya Reddy" versus "Priya R. Reddy"), which has flagged a possible mismatch even though the core name is the same.';
    resolutionSteps = [
      'Determine your correct legal name from your authoritative supporting document.',
      'Compare the name format across all your documents.',
      'Correct the name record that contains the inconsistency.',
      'Use a consistent name format throughout all your records.',
      'Resubmit your application with the consistent name information.',
      'If the issue persists after resubmission, use the official grievance channel.',
    ];
    grievanceUrl = '/rejection?service=aadhaar';
    grievanceLabel = 'Aadhaar Grievance Portal';
  }

  return {
    hasIssues,
    comparisons,
    summary,
    overallResult,
    explanation,
    resolutionSteps,
    grievanceUrl,
    grievanceLabel,
  };
}
