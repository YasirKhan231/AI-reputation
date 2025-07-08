// src/types/business-onboarding.ts

export interface FormData {
  // Page 8 - Personal Info
  yourName: string
  emailAddress: string
  phoneNumber: string
  countryCode: string
  password: string
  confirmPassword: string

  // Page 9 - Business Info
  businessName: string
  businessAddress: string
  apartmentSuite: string
  usTaxId: string

  // Page 10-13 - Checkboxes
  rightsPrivacyAcknowledged: boolean
  dataUsageAcknowledged: boolean
  californiaPrivacyAcknowledged: boolean
  dataAnalysisAuthorized: boolean
}

export interface PageProps {
  formData: FormData
  updateFormData: (updates: Partial<FormData>) => void
}
