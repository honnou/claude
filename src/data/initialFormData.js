export const emptyAdult = () => ({
  firstName: '',
  lastName: '',
  dob: '',
  ssn: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  email: '',
  phone: '',
  relationshipRole: '',
})

export const emptyChild = () => ({
  firstName: '',
  lastName: '',
  dob: '',
  biologicalParent1: '',
  biologicalParent2: '',
  legalGuardian: '',
})

export const emptyRealProperty = () => ({
  address: '',
  city: '',
  state: '',
  value: '',
  mortgage: '',
  owners: '',
})

export const emptyBankAccount = () => ({
  institution: '',
  accountType: '',
  balance: '',
  beneficiary: '',
})

export const emptyInvestmentAccount = () => ({
  institution: '',
  type: '',
  balance: '',
  beneficiary: '',
})

export const emptyRetirementAccount = () => ({
  institution: '',
  type: '',
  balance: '',
  beneficiary: '',
})

export const emptyLifeInsurance = () => ({
  provider: '',
  policyType: '',
  faceValue: '',
  beneficiary: '',
  owner: '',
})

export const emptyBusinessInterest = () => ({
  name: '',
  type: '',
  ownershipPct: '',
  estimatedValue: '',
})

export const emptyOtherAsset = () => ({
  description: '',
  value: '',
})

export const emptyDebt = () => ({
  description: '',
  lender: '',
  balance: '',
})

export const emptyBeneficiary = () => ({
  name: '',
  relationship: '',
  percentage: '',
})

export const emptyBequest = () => ({
  item: '',
  recipient: '',
})

export const emptyAdvisor = () => ({
  name: '',
  firm: '',
  phone: '',
  email: '',
})

export const INITIAL_FORM_DATA = {
  // Section 1: Household Members
  adults: [emptyAdult(), emptyAdult(), emptyAdult()],

  // Section 2: Children
  children: [emptyChild()],

  // Section 3: Guardianship
  guardianship: {
    primaryGuardianName: '',
    primaryGuardianRelationship: '',
    primaryGuardianPhone: '',
    alternateGuardianName: '',
    alternateGuardianRelationship: '',
    alternateGuardianPhone: '',
    healthcareDecisionMaker1: '',
    healthcareDecisionMaker2: '',
    healthcareDecisionMaker3: '',
    financialDecisionMaker1: '',
    financialDecisionMaker2: '',
    financialDecisionMaker3: '',
    guardianshipNotes: '',
  },

  // Section 4: Assets
  assets: {
    realProperty: [emptyRealProperty()],
    bankAccounts: [emptyBankAccount()],
    investmentAccounts: [emptyInvestmentAccount()],
    retirementAccounts: [emptyRetirementAccount()],
    lifeInsurance: [emptyLifeInsurance()],
    businessInterests: [emptyBusinessInterest()],
    vehicles: [{ description: '', value: '', owners: '' }],
    otherAssets: [emptyOtherAsset()],
  },

  // Section 5: Debts
  liabilities: {
    mortgages: [emptyDebt()],
    personalLoans: [emptyDebt()],
    creditCards: [emptyDebt()],
    studentLoans: [emptyDebt()],
    otherDebts: [emptyDebt()],
  },

  // Section 6: Current Estate Plan
  currentEstatePlan: {
    hasWill: '',
    hasTrust: '',
    hasHealthcareDirective: '',
    hasDurablePOA: '',
    hasHIPAAAuth: '',
    hasBeneficiaryDesignations: '',
    lastReviewedDate: '',
    attorneyName: '',
    currentIssues: '',
    documentsLocation: '',
  },

  // Section 7: Distribution Intentions
  distribution: {
    primaryBeneficiaries: [emptyBeneficiary()],
    contingentBeneficiaries: [emptyBeneficiary()],
    specificBequests: [emptyBequest()],
    childSupportArrangements: '',
    residualEstateDistribution: '',
    charitableGiving: '',
  },

  // Section 8: Decision-Making Authority
  decisionMaking: {
    adult1HealthcareProxy: '',
    adult1HealthcareProxyAlternate: '',
    adult2HealthcareProxy: '',
    adult2HealthcareProxyAlternate: '',
    adult3HealthcareProxy: '',
    adult3HealthcareProxyAlternate: '',
    adult1FinancialPOA: '',
    adult1FinancialPOAAlternate: '',
    adult2FinancialPOA: '',
    adult2FinancialPOAAlternate: '',
    adult3FinancialPOA: '',
    adult3FinancialPOAAlternate: '',
    adult1HIPAAAuth: '',
    adult2HIPAAAuth: '',
    adult3HIPAAAuth: '',
    adult1EndOfLife: '',
    adult2EndOfLife: '',
    adult3EndOfLife: '',
    lifeSupport: '',
    organDonation: '',
    burialPreferences: '',
  },

  // Section 9: Polyamory-Specific Planning
  polyamory: {
    relationshipStructure: '',
    relationshipStructureOther: '',
    yearsTogethers: '',
    cohabitation: '',
    coParentingArrangement: '',
    householdAssetOwnership: '',
    breakupContingencyPlan: '',
    relationshipStory: '',
    whyEstatePlanning: '',
    dayToDayLife: '',
    whyPolyamory: '',
  },

  // Section 10: Taxes & Financial
  taxes: {
    adult1Income: '',
    adult1FilingStatus: '',
    adult2Income: '',
    adult2FilingStatus: '',
    adult3Income: '',
    adult3FilingStatus: '',
    estimatedEstateTaxExposure: '',
    estateTaxNotes: '',
    giftingStrategy: '',
  },

  // Section 11: Professional Advisors
  advisors: {
    cpa: emptyAdvisor(),
    financialAdvisor: emptyAdvisor(),
    insuranceAgent: emptyAdvisor(),
    otherAdvisor: emptyAdvisor(),
  },

  // Section 12: Special Considerations
  specialConsiderations: {
    healthIssues: '',
    priorMarriages: '',
    priorChildren: '',
    legalHistory: '',
    immigrationStatus: '',
    specialNeedsFamily: '',
    businessSuccession: '',
    digitalAssets: '',
    petCare: '',
    other: '',
  },

  // Section 13: Attorney Meeting Notes
  attorneyNotes: {
    topQuestions: '',
    concerns: '',
    uniqueCircumstances: '',
    documentsWanted: [],
    meetingDate: '',
    additionalNotes: '',
  },

  // Meta
  _meta: {
    createdAt: null,
    lastSaved: null,
    completedSections: [],
    formVersion: '1.0',
  },
}

export const SECTION_TITLES = [
  'Household Members',
  'Child Information',
  'Desired Guardianship',
  'Asset Inventory',
  'Debts & Liabilities',
  'Current Estate Plan',
  'Distribution Intentions',
  'Decision-Making Authority',
  'Polyamory-Specific Planning',
  'Taxes & Financial',
  'Professional Advisors',
  'Special Considerations',
  'Attorney Meeting Notes',
]

export const DOCUMENTS_CHECKLIST = [
  'Last Will & Testament (all three adults)',
  'Revocable Living Trust',
  'Durable Power of Attorney (financial)',
  'Healthcare Power of Attorney / Proxy',
  'Advance Healthcare Directive / Living Will',
  'HIPAA Authorization',
  'Guardianship Designation',
  'Cohabitation Agreement',
  'Domestic Partnership Agreement',
  'Beneficiary Designation Updates',
  'Life Insurance Policy Review',
  'Retirement Account Beneficiary Updates',
  'Real Property Title Review',
  'Business Succession Agreement',
]
