import type { DocumentItem, Service } from '../lib/types';

const documentItem = (id: string, name: string, description: string, whyNeeded: string): DocumentItem => ({ id, name, description, whyNeeded });

const prototypeTiming = 'Prototype guidance only; timelines may differ by location and application details.';
const prototypeFee = 'Prototype reference only; charges may differ by location and service channel.';

export const services: Service[] = [
  {
    id: 'aadhaar', name: 'Aadhaar', nameHi: 'आधार', description: 'Prototype navigation for Aadhaar-related update and enrolment guidance.',
    eligibility: ['Use this prototype to review sample eligibility prompts.', 'Requirements can differ by request type and local centre.'],
    requiredDocuments: [documentItem('identity', 'Identity document', 'Sample identity support document.', 'Helps compare the entered name in this prototype.'), documentItem('address', 'Address document', 'Sample address support document.', 'Helps compare the entered address in this prototype.')],
    applicationSteps: ['Choose the request type.', 'Prepare sample supporting information.', 'Run a Consistency Check before continuing.'], commonMistakes: ['Using a shortened name in one field.', 'Entering a different address format across records.'], processingTime: prototypeTiming, fees: prototypeFee, grievanceUrl: '/rejection?service=aadhaar',
  },
  {
    id: 'pan', name: 'PAN Card', nameHi: 'पैन कार्ड', description: 'Prototype navigation for PAN Card application preparation.',
    eligibility: ['Use sample citizen profile information for this prototype.', 'Match name and date of birth across sample records.'],
    requiredDocuments: [documentItem('identity', 'Identity document', 'Sample identity support document.', 'Helps compare name details.'), documentItem('dob', 'Date of birth document', 'Sample date of birth support document.', 'Helps compare date of birth details.')],
    applicationSteps: ['Enter PAN application details.', 'Compare them with sample Aadhaar/profile information.', 'Review possible inconsistencies.'], commonMistakes: ['Typing a different date of birth.', 'Using a name format that differs from supporting information.'], processingTime: prototypeTiming, fees: prototypeFee, grievanceUrl: '/rejection?service=pan',
  },
  {
    id: 'voter-id', name: 'Voter ID', nameHi: 'मतदाता पहचान पत्र', description: 'Prototype navigation for Voter ID enrolment and update preparation.',
    eligibility: ['Age and residence requirements depend on the applicable process.', 'Use the prototype checklist to prepare sample information.'],
    requiredDocuments: [documentItem('age', 'Age document', 'Sample age support document.', 'Supports the age-related checklist.'), documentItem('address', 'Address document', 'Sample address support document.', 'Supports the residence-related checklist.')],
    applicationSteps: ['Review sample eligibility prompts.', 'Prepare supporting information.', 'Check field consistency.'], commonMistakes: ['Leaving residence details incomplete.', 'Using different spellings across records.'], processingTime: prototypeTiming, fees: prototypeFee, grievanceUrl: '/rejection?service=voter-id',
  },
  {
    id: 'driving-licence', name: 'Driving Licence', nameHi: 'ड्राइविंग लाइसेंस', description: 'Prototype navigation for Driving Licence application preparation.',
    eligibility: ['Licence category and age requirements vary.', 'Use this prototype for sample preparation guidance only.'],
    requiredDocuments: [documentItem('identity', 'Identity document', 'Sample identity support document.', 'Supports applicant detail checks.'), documentItem('address', 'Address document', 'Sample address support document.', 'Supports address detail checks.')],
    applicationSteps: ['Select a sample licence category.', 'Review required sample documents.', 'Run a Consistency Check.'], commonMistakes: ['Selecting an unsuitable category.', 'Providing inconsistent address details.'], processingTime: prototypeTiming, fees: prototypeFee, grievanceUrl: '/rejection?service=driving-licence',
  },
  {
    id: 'birth-certificate', name: 'Birth Certificate', nameHi: 'जन्म प्रमाण पत्र', description: 'Prototype navigation for Birth Certificate record requests.',
    eligibility: ['Record availability can depend on registration details.', 'Use sample information only in this prototype.'],
    requiredDocuments: [documentItem('birth-details', 'Birth details', 'Sample date and place information.', 'Helps prepare a record-search request.'), documentItem('applicant-id', 'Applicant identity document', 'Sample applicant identity support document.', 'Helps identify the requester in this prototype.')],
    applicationSteps: ['Enter sample birth details.', 'Review supporting information.', 'Check for possible inconsistencies.'], commonMistakes: ['Entering an incorrect registration area.', 'Using a different date format.'], processingTime: prototypeTiming, fees: prototypeFee, grievanceUrl: '/rejection?service=birth-certificate',
  },
  {
    id: 'death-certificate', name: 'Death Certificate', nameHi: 'मृत्यु प्रमाण पत्र', description: 'Prototype navigation for Death Certificate record requests.',
    eligibility: ['Record availability can depend on registration details.', 'Use sample information only in this prototype.'],
    requiredDocuments: [documentItem('death-details', 'Death details', 'Sample date and place information.', 'Helps prepare a record-search request.'), documentItem('applicant-id', 'Applicant identity document', 'Sample requester identity support document.', 'Helps identify the requester in this prototype.')],
    applicationSteps: ['Enter sample death details.', 'Review supporting information.', 'Check for possible inconsistencies.'], commonMistakes: ['Entering an incorrect registration area.', 'Omitting the requester relationship.'], processingTime: prototypeTiming, fees: prototypeFee, grievanceUrl: '/rejection?service=death-certificate',
  },
  {
    id: 'pension', name: 'Pension', nameHi: 'पेंशन', description: 'Pension & Social Security Scheme Navigation for prototype guidance; this is not one universal scheme.',
    eligibility: ['Scheme requirements can vary by category, location, and circumstances.', 'Use the prototype prompts to identify sample documents to review.'],
    requiredDocuments: [documentItem('identity', 'Identity document', 'Sample identity support document.', 'Helps prepare sample claimant details.'), documentItem('income', 'Income information', 'Sample income support information.', 'May be relevant to certain sample scheme paths.')],
    applicationSteps: ['Choose a sample scheme path.', 'Review sample eligibility prompts.', 'Prepare supporting information.'], commonMistakes: ['Assuming all schemes have the same conditions.', 'Omitting income or residence details.'], processingTime: prototypeTiming, fees: 'Prototype guidance: fees and charges can differ by scheme and channel.', grievanceUrl: '/rejection?service=pension',
  },
  {
    id: 'income-certificate', name: 'Income Certificate', nameHi: 'आय प्रमाण पत्र', description: 'Prototype navigation for Income Certificate application preparation.',
    eligibility: ['Income assessment requirements can vary by local process.', 'Use sample financial information only in this prototype.'],
    requiredDocuments: [documentItem('income-proof', 'Income support document', 'Sample income support information.', 'Helps prepare the income-related fields.'), documentItem('address', 'Address document', 'Sample address support document.', 'Helps prepare residence details.')],
    applicationSteps: ['Enter sample household information.', 'Review income support information.', 'Check consistency across fields.'], commonMistakes: ['Using different household details.', 'Leaving income-period information unclear.'], processingTime: prototypeTiming, fees: prototypeFee, grievanceUrl: '/rejection?service=income-certificate',
  },
  {
    id: 'domicile-certificate', name: 'Domicile Certificate', nameHi: 'निवास प्रमाण पत्र', description: 'Prototype navigation for Domicile Certificate application preparation.',
    eligibility: ['Residence-duration requirements can vary by location.', 'Use sample residence information only in this prototype.'],
    requiredDocuments: [documentItem('address', 'Address document', 'Sample address support document.', 'Helps prepare residence details.'), documentItem('residence-history', 'Residence history', 'Sample duration of residence information.', 'Helps prepare the residence-duration fields.')],
    applicationSteps: ['Enter sample residence details.', 'Review residence history.', 'Check for possible inconsistencies.'], commonMistakes: ['Using different house numbers.', 'Leaving the residence period incomplete.'], processingTime: prototypeTiming, fees: prototypeFee, grievanceUrl: '/rejection?service=domicile-certificate',
  },
  {
    id: 'marriage-certificate', name: 'Marriage Certificate', nameHi: 'विवाह प्रमाण पत्र', description: 'Prototype navigation for Marriage Certificate application preparation.',
    eligibility: ['Registration requirements can vary by location and circumstance.', 'Use sample applicant and supporting information only in this prototype.'],
    requiredDocuments: [documentItem('identity', 'Identity document', 'Sample identity support document.', 'Helps compare applicant names.'), documentItem('address', 'Address document', 'Sample address support document.', 'Helps compare residence details.')],
    applicationSteps: ['Enter sample applicant details.', 'Review supporting information.', 'Run a Consistency Check before continuing.'], commonMistakes: ['Using a different house number in a supporting document.', 'Using different name formats across records.'], processingTime: prototypeTiming, fees: prototypeFee, grievanceUrl: '/rejection?service=marriage-certificate',
  },
];
