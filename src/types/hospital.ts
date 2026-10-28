export type CategoryId = 'general-surgery' | 'womens-health' | 'spine-orthopedics';

export interface FAQ {
  question: string;
  answer: string;
}

export interface TreatmentOption {
  type: string;
  title: string;
  description: string;
}

export interface Treatment {
  id: string;
  slug: string;
  title: string;
  heroHeadline: string;
  categoryId: CategoryId;
  categoryTitle: string;
  shortDesc: string;
  overview: string;
  symptoms: string[];
  whenToConsult: string[];
  diagnosisMethods: string[];
  treatmentOptions: TreatmentOption[];
  whyChooseAthree: string[];
  faqs: FAQ[];
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  badgeText?: string;
  imageUrl?: string;
  imageAlt?: string;
  imageCaption?: string;
}

export interface TreatmentCategory {
  id: CategoryId;
  name: string;
  description: string;
  iconName: string;
  imageUrl?: string;
  imageAlt?: string;
  treatments: {
    id: string;
    slug: string;
    title: string;
    shortDesc: string;
  }[];
}

export interface HospitalFacility {
  id: string;
  title: string;
  description: string;
  badge: string;
  imageUrl?: string;
  imageAlt?: string;
}

export interface Doctor {
  id: string;
  name: string;
  qualifications: string;
  specialty: string;
  categoryId: CategoryId;
  experienceYears: number;
  consultationFee: string;
  timings: string;
  bio: string;
  imageAlt: string;
}

export interface AppointmentRequest {
  id?: string;
  patientName: string;
  mobileNumber: string;
  preferredDate: string;
  preferredTime?: string;
  treatmentId: string;
  treatmentTitle: string;
  notes?: string;
  consent: boolean;
  status?: 'pending' | 'confirmed' | 'completed';
  createdAt?: string;
}

export interface HospitalConfig {
  name: string;
  tagline: string;
  parentCompany: string;
  phone: string;
  phoneFormatted: string;
  whatsapp: string;
  email: string;
  address: {
    street: string;
    landmark: string;
    city: string;
    state: string;
    pincode: string;
    full: string;
  };
  googleMapsUrl: string;
  workingHours: {
    emergency: string;
    opd: string;
  };
}
