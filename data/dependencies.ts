import type { RelatedServiceMapping, ServiceDependency } from '../lib/types';

export const serviceDependencies: ServiceDependency[] = [
  { sourceServiceId: 'pan', target: 'sample_aadhaar_or_profile', relationship: 'prototype_service_relationship', fields: ['Name', 'Date of Birth'], description: 'Prototype service relationship for a consistency check against sample Aadhaar or profile information.' },
];

export const relatedServices: RelatedServiceMapping[] = [
  { serviceId: 'pan', relatedServiceIds: ['aadhaar', 'income-certificate'] },
  { serviceId: 'aadhaar', relatedServiceIds: ['pan', 'voter-id'] },
  { serviceId: 'driving-licence', relatedServiceIds: ['voter-id', 'income-certificate'] },
  { serviceId: 'income-certificate', relatedServiceIds: ['domicile-certificate'] },
  { serviceId: 'pension', relatedServiceIds: ['income-certificate', 'domicile-certificate'] },
  { serviceId: 'birth-certificate', relatedServiceIds: ['death-certificate', 'marriage-certificate'] },
];
