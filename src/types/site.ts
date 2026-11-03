export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  proposedScopePoints: string[];
  suitableSpaces: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'Warehouse' | 'Manufacturing' | 'Commercial' | 'Metal Installation';
  description: string;
  image: string;
  imageAlt: string;
  isIllustrative: boolean;
}

export interface IndustryItem {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  featured?: boolean;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface CompanyConfig {
  companyName: string;
  verifiedAddress: string;
  shortLocation: string;
  phone: string;
  whatsappNumber: string;
  email: string;
  businessHours: string;
  linkedinUrl: string;
  facebookUrl: string;
  instagramUrl: string;
  showVerificationNotes: boolean;
}

export interface EnquiryFormData {
  fullName: string;
  companyName: string;
  mobileNumber: string;
  emailAddress: string;
  serviceRequired: string;
  projectLocation: string;
  projectRequirements: string;
}

export type CustomizerTab = 'contact' | 'services' | 'projects';
