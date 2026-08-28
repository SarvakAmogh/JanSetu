const LANG_KEY = 'jansetu_lang';

type Language = 'en' | 'hi';

type CategoryTranslations = {
  identity: string;
  taxFinancial: string;
  voting: string;
  driving: string;
  documents: string;
  marriage: string;
  pensionSocial: string;
  residenceIncome: string;
};

type TranslationValue = string | CategoryTranslations;

type TranslationDictionary = {
  [key: string]: TranslationValue;
};

const translations: Record<Language, TranslationDictionary> = {
  en: {
    appName: 'JanSetu',
    tagline: 'Know what you need. Understand what went wrong.',
    whatCanIApplyFor: 'What Can I Apply For?',
    findService: 'Find a Service',
    documentRequirements: 'Document Requirements',
    applicationRejected: 'Application Rejected?',
    checkRejection: 'Check Rejection',
    mismatchDetected: 'Possible Mismatch Detected',
    possibleMismatch: 'Possible mismatch',
    match: 'Match',
    missing: 'Missing',
    whatToDoNext: 'What to do next',
    selectApplication: 'Select Application',
    exploreServices: 'Explore Services',
    trySampleCase: 'Try a Sample Case',
    signIn: 'Sign In',
    signOut: 'Sign Out',
    dashboard: 'Dashboard',
    myApplications: 'My Applications',
    myChecks: 'My Checks',
    profile: 'Profile',
    welcomeBack: 'Welcome back',
    resolveIssue: 'Resolve Issue',
    consistencyCheck: 'Consistency Check',
    possibleInconsistency: 'Possible inconsistency',
    noInconsistency: 'No inconsistencies found',
    whyDidThisHappen: 'Why did this happen?',
    whatShouldIDo: 'What should I do?',
    saveService: 'Save Service',
    saved: 'Saved',
    services: 'Services',
    back: 'Back',
    startOver: 'Start Over',
    analyseDocument: 'Analyse Document',
    viewDetails: 'View Details',
    viewResult: 'View Result',
    findServices: 'Find Services',

    eligibilityDisclaimer:
      'These suggestions are based on the information entered into this prototype. They are not an official eligibility decision.',

    youMayWantToExplore: 'You may want to explore this service',

    consistencyCheckNotOfficial:
      'This comparison uses fictional data stored inside the JanSetu prototype. It does not access or verify real government records.',

    prototypeAccounts:
      'Prototype Accounts — Fictional demonstration accounts only. Do not enter real personal information.',

    prototypeData: 'JanSetu Prototype — Demonstration Data',

    demoModeUpload:
      'Demo Mode — This upload is simulated. The prototype uses preloaded fictional sample data.',

    continueMnemonic: 'Continue as',
    email: 'Email',
    password: 'Password',
    logout: 'Logout',

    noSavedServices: 'No saved services yet.',

    noRejectionChecks:
      "You haven't run any rejection checks yet.",

    accountType: 'Account type',
    prototypeAccount: 'Prototype Account',

    disclaimerPrototype:
      'Prototype Account — Demonstration Data. Do not enter real personal information.',

    sampleCitizenProfile: 'Sample citizen profile information',
    fullName: 'Full Name',
    dateOfBirth: 'Date of Birth',
    address: 'Address',
    state: 'State',
    district: 'District',
    preferredLanguage: 'Preferred Language',
    myApplication: 'My Application',
    relatedServiceCheck: 'Related Service Check',
    recentRejectionChecks: 'Recent Rejection Checks',
    savedServices: 'Saved Services',
    quickActions: 'Quick Actions',
    applicationSubmitted: 'Application Submitted',
    documentsReviewed: 'Documents Reviewed',
    informationCheck: 'Information Check',
    applicationStatus: 'Application Status',
    issueIdentified: 'Issue Identified',
    resolution: 'Resolution',
    submit: 'Submit',
    cancel: 'Cancel',
    next: 'Next',
    previous: 'Previous',
    step: 'Step',
    of: 'of',

    invalidCredentials:
      'Invalid email or password. Try a demo account below.',

    orContinueAs: '— or continue as a demo user —',

    whichApplicationHasIssue:
      'Which application has an issue?',

    yourApplicationDetails: 'Your Application Details',

    relatedCitizenProfileInfo:
      'Related Citizen Profile Information',

    noSampleRejectionCase:
      'No sample rejection case is currently loaded for this service.',

    youCanExplore:
      'You can explore the service requirements, documents and common application issues.',

    viewRequirements: 'View Requirements',
    fileGrievance: 'File a grievance on portal',

    grievanceDisclaimer:
      'JanSetu does not submit the grievance. This button opens the relevant external portal.',

    uploadDocument: 'Upload Document',
    analyseDocumentBtn: 'Analyse Document →',
    field: 'Field',
    yourApplication: 'Your Application',
    relatedDocument: 'Related Document',
    result: 'Result',
    statusBanner: 'Possible inconsistency detected',
    statusBannerSuccess: 'No inconsistencies found',
    commonMistakes: 'Common Mistakes',
    applicationSteps: 'Application Steps',
    fees: 'Fees',
    processingTime: 'Processing Time',
    eligibility: 'Eligibility',
    requiredDocuments: 'Required Documents',
    relatedServices: 'Related Services',
    serviceNotFound: 'Service not found',
    servicesDirectory: 'Services Directory',
    searchServices: 'Search services...',
    noServicesFound:
      'No services found. Try another search term.',
    category: 'Category',

    categories: {
      identity: 'Identity',
      taxFinancial: 'Tax & Financial',
      voting: 'Voting',
      driving: 'Driving',
      documents: 'Documents',
      marriage: 'Marriage',
      pensionSocial: 'Pension & Social Security',
      residenceIncome: 'Residence & Income Certificates',
    },

    beforeYouApply: 'Before you apply',

    canHelpYouCheck:
      'JanSetu can help you check whether important information in your sample citizen profile is consistent before starting your application.',

    reviewIssue: 'Review Issue',
    potentialInconsistency: 'Potential inconsistency',
    whyNeeded: 'Why do I need this?',
  },

  hi: {
    appName: 'जनसेतु',

    tagline:
      'जानिए आपको क्या चाहिए। समझिए क्या गलत हुआ।',

    whatCanIApplyFor: 'मैं क्या आवेदन कर सकता हूं?',
    findService: 'एक सेवा खोजें',
    documentRequirements: 'दस्तावेज़ आवश्यकताएं',
    applicationRejected: 'आवेदन अस्वीकार हुआ?',
    checkRejection: 'अस्वीकृति की जांच करें',
    mismatchDetected: 'संभावित बेमेल का पता चला',
    possibleMismatch: 'संभावित बेमेल',
    match: 'मेल',
    missing: 'लुप्त',
    whatToDoNext: 'आगे क्या करें',
    selectApplication: 'आवेदन चुनें',
    exploreServices: 'सेवाएं खोजें',
    trySampleCase: 'नमूना मामले का प्रयास करें',
    signIn: 'साइन इन करें',
    signOut: 'साइन आउट करें',
    dashboard: 'डैशबोर्ड',
    myApplications: 'मेरे आवेदन',
    myChecks: 'मेरी जांचें',
    profile: 'प्रोफ़ाइल',
    welcomeBack: 'स्वागत है',
    resolveIssue: 'समस्या का समाधान करें',
    consistencyCheck: 'सुसंगतता जांच',
    possibleInconsistency: 'संभावित असंगति',
    noInconsistency: 'कोई असंगति नहीं मिली',
    whyDidThisHappen: 'ऐसा क्यों हुआ?',
    whatShouldIDo: 'मुझे क्या करना चाहिए?',
    saveService: 'सेवा सहेजें',
    saved: 'सहेजा गया',
    services: 'सेवाएं',
    back: 'वापस',
    startOver: 'फिर से शुरू करें',
    analyseDocument: 'दस्तावेज़ का विश्लेषण करें',
    viewDetails: 'विवरण देखें',
    viewResult: 'परिणाम देखें',
    findServices: 'सेवाएं खोजें',

    eligibilityDisclaimer:
      'ये सुझाव इस प्रोटोटाइप में दर्ज की गई जानकारी पर आधारित हैं। ये आधिकारिक पात्रता निर्णय नहीं हैं।',

    youMayWantToExplore:
      'आप इस सेवा को खोजना चाह सकते हैं',

    consistencyCheckNotOfficial:
      'यह तुलना जनसेतु प्रोटोटाइप में संग्रहीत काल्पनिक डेटा का उपयोग करती है। यह सरकारी रिकॉर्ड तक पहुंच या सत्यापन नहीं करती है।',

    prototypeAccounts:
      'प्रोटोटाइप खाते — केवल काल्पनिक प्रदर्शन खाते। वास्तविक व्यक्तिगत जानकारी दर्ज न करें।',

    prototypeData:
      'जनसेतु प्रोटोटाइप — प्रदर्शन डेटा',

    demoModeUpload:
      'डेमो मोड — यह अपलोड सिम्युलेट किया गया है। प्रोटोटाइप इस प्रदर्शन के लिए पूर्वलोड किए गए काल्पनिक नमूना डेटा का उपयोग करता है।',

    continueMnemonic: 'इस रूप में जारी रखें',
    email: 'ईमेल',
    password: 'पासवर्ड',
    logout: 'लॉग आउट करें',

    noSavedServices:
      'अभी तक कोई सहेजी गई सेवा नहीं।',

    noRejectionChecks:
      'आपने अभी तक कोई अस्वीकृति जांच नहीं की है।',

    accountType: 'खाता प्रकार',
    prototypeAccount: 'प्रोटोटाइप खाता',

    disclaimerPrototype:
      'प्रोटोटाइप खाता — प्रदर्शन डेटा। वास्तविक व्यक्तिगत जानकारी दर्ज न करें।',

    sampleCitizenProfile:
      'नमूना नागरिक प्रोफ़ाइल जानकारी',

    fullName: 'पूरा नाम',
    dateOfBirth: 'जन्म की तारीख',
    address: 'पता',
    state: 'राज्य',
    district: 'जिला',
    preferredLanguage: 'पसंदीदा भाषा',
    myApplication: 'मेरा आवेदन',
    relatedServiceCheck: 'संबंधित सेवा जांच',
    recentRejectionChecks: 'हाल की अस्वीकृति जांचें',
    savedServices: 'सहेजी गई सेवाएं',
    quickActions: 'त्वरित कार्य',
    applicationSubmitted: 'आवेदन जमा किया गया',
    documentsReviewed: 'दस्तावेजों की समीक्षा की गई',
    informationCheck: 'सूचना जांच',
    applicationStatus: 'आवेदन की स्थिति',
    issueIdentified: 'समस्या की पहचान की गई',
    resolution: 'समाधान',
    submit: 'जमा करें',
    cancel: 'रद्द करें',
    next: 'अगला',
    previous: 'पिछला',
    step: 'चरण',
    of: 'का',

    invalidCredentials:
      'अमान्य ईमेल या पासवर्ड। नीचे डेमो खाते का प्रयास करें।',

    orContinueAs:
      '— या डेमो उपयोगकर्ता के रूप में जारी रखें —',

    whichApplicationHasIssue:
      'किस आवेदन में समस्या है?',

    yourApplicationDetails:
      'आपके आवेदन का विवरण',

    relatedCitizenProfileInfo:
      'संबंधित नागरिक प्रोफ़ाइल जानकारी',

    noSampleRejectionCase:
      'इस सेवा के लिए कोई नमूना अस्वीकृति मामला वर्तमान में लोड नहीं है।',

    youCanExplore:
      'आप सेवा आवश्यकताओं, दस्तावेजों और सामान्य आवेदन समस्याओं को देख सकते हैं।',

    viewRequirements: 'आवश्यकताएं देखें',
    fileGrievance: 'पोर्टल पर शिकायत दर्ज करें',

    grievanceDisclaimer:
      'जनसेतु शिकायत जमा नहीं करता है। यह बटन प्रासंगिक बाहरी पोर्टल खोलता है।',

    uploadDocument: 'दस्तावेज़ अपलोड करें',
    analyseDocumentBtn: 'दस्तावेज़ का विश्लेषण करें →',
    field: 'क्षेत्र',
    yourApplication: 'आपका आवेदन',
    relatedDocument: 'संबंधित दस्तावेज़',
    result: 'परिणाम',
    statusBanner: 'संभावित असंगति का पता चला',
    statusBannerSuccess: 'कोई असंगति नहीं मिली',
    commonMistakes: 'सामान्य गलतियां',
    applicationSteps: 'आवेदन कदम',
    fees: 'शुल्क',
    processingTime: 'प्रसंस्करण समय',
    eligibility: 'पात्रता',
    requiredDocuments: 'आवश्यक दस्तावेज़',
    relatedServices: 'संबंधित सेवाएं',
    serviceNotFound: 'सेवा नहीं मिली',
    servicesDirectory: 'सेवा निर्देशिका',
    searchServices: 'सेवाओं को खोजें...',

    noServicesFound:
      'कोई सेवा नहीं मिली। किसी अन्य खोज शब्द का प्रयास करें।',

    category: 'श्रेणी',

    categories: {
      identity: 'पहचान',
      taxFinancial: 'कर और वित्तीय',
      voting: 'मतदान',
      driving: 'ड्राइविंग',
      documents: 'दस्तावेज़',
      marriage: 'विवाह',
      pensionSocial: 'पेंशन और सामाजिक सुरक्षा',
      residenceIncome: 'निवास और आय प्रमाण पत्र',
    },

    beforeYouApply: 'आवेदन करने से पहले',

    canHelpYouCheck:
      'जनसेतु आपको यह जांचने में मदद कर सकता है कि आपकी नमूना नागरिक प्रोफ़ाइल में महत्वपूर्ण जानकारी आपके आवेदन से पहले सुसंगत है या नहीं।',

    reviewIssue: 'समस्या की समीक्षा करें',
    potentialInconsistency: 'संभावित असंगति',
    whyNeeded: 'मुझे इसकी क्यों जरूरत है?',
  },
};

export function getLang(): Language {
  if (typeof window === 'undefined') {
    return 'en';
  }

  const stored = localStorage.getItem(LANG_KEY);

  return stored === 'hi' ? 'hi' : 'en';
}

export function setLang(lang: Language): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(LANG_KEY, lang);
  }
}

export function t(key: string): string {
  const lang = getLang();
  const value = translations[lang][key];

  if (typeof value === 'string') {
    return value;
  }

  return key;
}

export { translations };