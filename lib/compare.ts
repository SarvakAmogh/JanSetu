export type PreSubmissionIssueId =
  | 'missing-name'
  | 'missing-address'
  | 'name-mismatch'
  | 'address-mismatch'
  | 'missing-utility-bill'
  | 'expired-utility-bill';

export interface PreSubmissionInput {
  fullName: string;
  address: string;
  documentUploaded: boolean;
  documentExpired: boolean;
}

export interface SampleProfileInput {
  fullName: string;
  address: string;
}

export interface PreSubmissionIssue {
  id: PreSubmissionIssueId;
  title: string;
  message: string;
}

const normalize = (value: string) => value.trim().replace(/\s+/g, ' ').toLocaleLowerCase();

export function comparePreSubmission(
  input: PreSubmissionInput,
  sampleProfile: SampleProfileInput,
): PreSubmissionIssue[] {
  const issues: PreSubmissionIssue[] = [];

  if (!input.fullName.trim()) {
    issues.push({ id: 'missing-name', title: 'Full name is missing', message: 'Add a full name before running the Consistency Check.' });
  } else if (normalize(input.fullName) !== normalize(sampleProfile.fullName)) {
    issues.push({ id: 'name-mismatch', title: 'Possible mismatch in full name', message: 'The entered name differs from the sample profile information.' });
  }

  if (!input.address.trim()) {
    issues.push({ id: 'missing-address', title: 'Address is missing', message: 'Add a complete address before running the Consistency Check.' });
  } else if (normalize(input.address) !== normalize(sampleProfile.address)) {
    issues.push({ id: 'address-mismatch', title: 'Possible mismatch in address', message: 'The entered address differs from the sample profile information.' });
  }

  if (!input.documentUploaded) {
    issues.push({ id: 'missing-utility-bill', title: 'Utility bill is missing', message: 'Add a current utility bill to the document checklist.' });
  } else if (input.documentExpired) {
    issues.push({ id: 'expired-utility-bill', title: 'Utility bill is expired', message: 'Replace the expired bill with a current sample document.' });
  }

  return issues;
}
