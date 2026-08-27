import type { Persona } from '../lib/types';

export const personas: Persona[] = [
  {
    id: 'arjun-marriage',
    displayName: 'Arjun Sharma',
    description: 'Prototype rejection case for a Marriage Certificate application.',
    profile: { profileLabel: 'Sample citizen profile information', fullName: 'Arjun Sharma', dateOfBirth: '22/08/1999', address: '12-4-89, Himayatnagar, Hyderabad', state: 'Telangana', district: 'Hyderabad', preferredLanguage: 'English' },
    applicationData: { name: 'Arjun Sharma', address: '12-4-89, Himayatnagar, Hyderabad' },
    documentData: { name: 'Arjun Sharma', address: '12-4-98, Himayatnagar, Hyderabad' },
    rejectionSummary: 'House number mismatch between application and supporting document.',
  },
  {
    id: 'priya-aadhaar',
    displayName: 'Priya Reddy',
    description: 'Prototype rejection case for an Aadhaar application.',
    profile: { profileLabel: 'Sample citizen profile information', fullName: 'Priya Reddy', dateOfBirth: '05/11/2000', address: 'Flat 4B, Kondapur, Hyderabad', state: 'Telangana', district: 'Hyderabad', preferredLanguage: 'Telugu' },
    applicationData: { name: 'Priya Reddy', dateOfBirth: '05/11/2000', address: 'Flat 4B, Kondapur, Hyderabad' },
    documentData: { name: 'Priya R. Reddy', dateOfBirth: '05/11/2000', address: 'Flat 4B, Kondapur, Hyderabad' },
    rejectionSummary: 'Name format mismatch; date of birth and address align.',
  },
  {
    id: 'rahul-pan',
    displayName: 'Rahul Verma',
    description: 'Centerpiece prototype rejection case for a PAN application.',
    profile: { profileLabel: 'Sample citizen profile information', fullName: 'Rahul Verma', dateOfBirth: '14/06/2004', address: 'B-12, Sector 4, Dwarka, New Delhi', state: 'Delhi', district: 'New Delhi', preferredLanguage: 'Hindi' },
    applicationData: { name: 'Rahul Verma', dateOfBirth: '14/06/2005', address: 'B-12, Sector 4, Dwarka, New Delhi' },
    documentData: { name: 'Rahul Verma', dateOfBirth: '14/06/2004', address: 'B-12, Sector 4, Dwarka, New Delhi' },
    rejectionSummary: 'Date of birth differs between the PAN application and sample Aadhaar/profile.',
  },
];
