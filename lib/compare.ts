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
      if (normA[i] !== normB[i]) {
        diffCount++;
      }
    }

    if (diffCount <= 1) {
      return true;
    }
  }

  // Handle one value containing another
  if (normA.includes(normB) || normB.includes(normA)) {
    return true;
  }

  // Handle punctuation and spacing differences
  const cleanA = normA.replace(/[.,\-\s]/g, '');
  const cleanB = normB.replace(/[.,\-\s]/g, '');

  if (cleanA === cleanB) {
    return true;
  }

  return false;
};

const isDateField = (key: string): boolean => {
  const normalizedKey = key.toLowerCase().replace(/[\s_-]/g, '');

  return (
    normalizedKey === 'dateofbirth' ||
    normalizedKey === 'dob' ||
    normalizedKey === 'birthdate'
  );
};

const profileFieldMap: Record<string, string> = {
  name: 'fullName',
};

const getDocumentValue = (
  field: string,
  documentData: Record<string, string>
): string => {
  if (documentData[field]) {
    return documentData[field];
  }

  const mappedField = profileFieldMap[field];

  return mappedField ? documentData[mappedField] || '' : '';
};

const getProfileValue = (
  field: string,
  profileData?: Record<string, string>
): string => {
  if (!profileData) {
    return '';
  }

  const mappedField = profileFieldMap[field] || field;

  return profileData[mappedField] || '';
};

export function compareFields(
  appData: Record<string, string>,
  docData: Record<string, string>,
  profileData?: Record<string, string>
): ComparisonResult[] {
  const results: ComparisonResult[] = [];

  Object.keys(appData).forEach((key) => {
    const appValue = appData[key] || '';
    const docValue = getDocumentValue(key, docData);
    const profValue = getProfileValue(key, profileData);

    // Show the supporting-document value when available. Profile data is only
    // a mapped fallback for application fields the document does not contain.
    const expectedValue = docValue || profValue;
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
    } else if (isDateField(key)) {
      /*
       * Dates are handled strictly.
       *
       * Example:
       * 14/06/2005 vs 14/06/2004
       *
       * Even though the values differ by one character,
       * they represent different dates and therefore must
       * be treated as a real mismatch.
       */
      result = 'mismatch';
      message = `${key} clearly differs between application and supporting information.`;
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
  });

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
  const profileData: Record<string, string> = {
    fullName: persona.profile.fullName,
    dateOfBirth: persona.profile.dateOfBirth,
    address: persona.profile.address,
  };

  const comparisons = compareFields(
    persona.applicationData,
    persona.documentData,
    profileData
  );

  const hasIssues = comparisons.some(
    (comparison) => comparison.result !== 'match'
  );

  const overallResult: FieldResult = hasIssues
    ? comparisons.some(
        (comparison) => comparison.result === 'mismatch'
      )
      ? 'mismatch'
      : 'possible_mismatch'
    : 'match';

  const mismatchCount = comparisons.filter(
    (comparison) => comparison.result === 'mismatch'
  ).length;

  const possibleCount = comparisons.filter(
    (comparison) => comparison.result === 'possible_mismatch'
  ).length;

  const missingCount = comparisons.filter(
    (comparison) => comparison.result === 'missing'
  ).length;

  let summary = `${comparisons.length} field(s) checked: `;

  const parts: string[] = [];

  if (mismatchCount > 0) {
    parts.push(`${mismatchCount} clear mismatch(es)`);
  }

  if (possibleCount > 0) {
    parts.push(`${possibleCount} possible mismatch(es)`);
  }

  if (missingCount > 0) {
    parts.push(`${missingCount} missing field(s)`);
  }

  if (parts.length === 0) {
    parts.push('all match');
  }

  summary += parts.join(', ');

  let explanation = '';

  let resolutionSteps: string[] = [];

  let grievanceUrl = '/rejection';

  let grievanceLabel = 'File a grievance';

  if (persona.id === 'rahul-pan') {
    explanation =
      'Your PAN application contains a different date of birth from the sample Aadhaar/profile information associated with this prototype. Because these values are inconsistent, JanSetu has flagged a mismatch.';

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
      'Your Aadhaar application contains a different name format from the supporting document information. The difference is in the middle initial representation (for example, "Priya Reddy" versus "Priya R. Reddy"), which has flagged a possible mismatch even though the core name is the same.';

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

/* ============================================================
   PRE-SUBMISSION CONSISTENCY CHECK
   ============================================================ */

export interface PreSubmissionInput {
  fullName: string;
  address: string;
  documentUploaded: boolean;
  documentExpired: boolean;
}

export type PreSubmissionIssueId =
  | 'missing-name'
  | 'name-mismatch'
  | 'missing-address'
  | 'address-mismatch'
  | 'missing-utility-bill'
  | 'expired-utility-bill';

export interface PreSubmissionIssue {
  id: PreSubmissionIssueId;
  title: string;
  message: string;
}

interface PreSubmissionProfile {
  fullName: string;
  address: string;
}

export function comparePreSubmission(
  form: PreSubmissionInput,
  profile: PreSubmissionProfile
): PreSubmissionIssue[] {
  const issues: PreSubmissionIssue[] = [];

  const submittedName = form.fullName.trim();
  const expectedName = profile.fullName.trim();

  const submittedAddress = form.address.trim();
  const expectedAddress = profile.address.trim();

  /*
   * Full name
   */
  if (!submittedName) {
    issues.push({
      id: 'missing-name',
      title: 'Full name is missing',
      message: 'Enter your full name before submitting the application.',
    });
  } else if (normalize(submittedName) !== normalize(expectedName)) {
    issues.push({
      id: 'name-mismatch',
      title: 'Name does not match',
      message: `The application name "${submittedName}" does not match the sample profile name "${expectedName}".`,
    });
  }

  /*
   * Address
   */
  if (!submittedAddress) {
    issues.push({
      id: 'missing-address',
      title: 'Address is missing',
      message: 'Enter your residential address before submitting the application.',
    });
  } else if (
    normalize(submittedAddress) !== normalize(expectedAddress)
  ) {
    issues.push({
      id: 'address-mismatch',
      title: 'Address does not match',
      message: `The application address does not match the sample profile address "${expectedAddress}".`,
    });
  }

  /*
   * Utility bill
   */
  if (!form.documentUploaded) {
    issues.push({
      id: 'missing-utility-bill',
      title: 'Utility bill is missing',
      message: 'Upload a utility bill before submitting the application.',
    });
  } else if (form.documentExpired) {
    issues.push({
      id: 'expired-utility-bill',
      title: 'Utility bill is expired',
      message:
        'The uploaded utility bill appears to be expired. Upload a current utility bill before submitting.',
    });
  }

  return issues;
}
