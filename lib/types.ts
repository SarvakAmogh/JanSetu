export type ServiceId =
  | 'aadhaar'
  | 'pan'
  | 'voter-id'
  | 'driving-licence'
  | 'birth-certificate'
  | 'death-certificate'
  | 'pension'
  | 'income-certificate'
  | 'domicile-certificate'
  | 'marriage-certificate';

export type FieldResult = 'match' | 'possible_mismatch' | 'mismatch' | 'missing';

export interface DocumentItem {
  id: string;
  name: string;
  description: string;
  whyNeeded: string;
}

export interface ApplicationField {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'date' | 'select' | 'number' | 'checkbox';
  required: boolean;
  placeholder?: string;
  options?: string[];
  helpText?: string;
}

export interface ServiceDependency {
  sourceServiceId: ServiceId;
  target: 'sample_aadhaar_or_profile';
  relationship: 'prototype_service_relationship';
  fields: string[];
  description: string;
}

export interface RelatedServiceMapping {
  serviceId: ServiceId;
  relatedServiceIds: ServiceId[];
}

export interface Service {
  id: ServiceId;
  name: string;
  nameHi: string;
  description: string;
  eligibility: string[];
  requiredDocuments: DocumentItem[];
  applicationSteps: string[];
  commonMistakes: string[];
  processingTime: string;
  fees: string;
  grievanceUrl: string;
}

export interface Persona {
  id: string;
  displayName: string;
  description: string;
  profile: CitizenProfile;
  applicationData: Record<string, string>;
  documentData: Record<string, string>;
  rejectionSummary: string;
}

export interface ComparisonResult {
  fieldId: string;
  fieldLabel: string;
  expectedValue: string | null;
  submittedValue: string | null;
  result: FieldResult;
  message: string;
}

export interface CheckResult {
  id: string;
  serviceId: ServiceId;
  performedAt: string;
  overallResult: FieldResult;
  comparisons: ComparisonResult[];
  summary: string;
}

export interface DemoUser {
  id: string;
  name: string;
  email: string;
  password: string;
  personaId: string;
  createdAt: string;
}

export interface DemoApplication {
  id: string;
  userId: string;
  serviceId: ServiceId;
  status: 'Rejected';
  issue: string;
  submittedAt: string;
}

export interface RejectionCheck {
  id: string;
  serviceId: ServiceId;
  reason: string;
  possibleCause: string;
  recommendedAction: string;
  createdAt: string;
}

export interface TimelineStep {
  id: string;
  title: string;
  description: string;
  status: 'upcoming' | 'current' | 'complete' | 'attention_needed';
  date?: string;
}

export interface CitizenProfile {
  profileLabel: 'Sample citizen profile information';
  fullName: string;
  dateOfBirth: string;
  address: string;
  state: string;
  district: string;
  preferredLanguage: 'English' | 'Hindi' | 'Telugu';
}

export interface EligibilityQuestion {
  id: string;
  serviceId: ServiceId;
  question: string;
  type: 'single_select' | 'multi_select' | 'boolean' | 'text';
  options?: string[];
  required: boolean;
}

export interface EligibilityAnswer {
  questionId: string;
  value: string | string[] | boolean;
}

export interface EligibilityRecommendation {
  serviceId: ServiceId;
  eligible: boolean;
  summary: string;
  nextSteps: string[];
  missingRequirements: string[];
}
