import type { DemoApplication } from '../lib/types';

export const demoApplications: DemoApplication[] = [
  { id: 'MARR-DEMO-001', userId: 'arjun-sharma', serviceId: 'marriage-certificate', status: 'Rejected', issue: 'Name/address mismatch between application and supporting information.', submittedAt: '2026-02-01T09:00:00.000Z' },
  { id: 'AADHAAR-DEMO-001', userId: 'priya-reddy', serviceId: 'aadhaar', status: 'Rejected', issue: 'Name format mismatch.', submittedAt: '2026-02-02T09:00:00.000Z' },
  { id: 'PAN-DEMO-001', userId: 'rahul-verma', serviceId: 'pan', status: 'Rejected', issue: 'DOB mismatch between PAN application and sample Aadhaar/profile.', submittedAt: '2026-02-03T09:00:00.000Z' },
];
