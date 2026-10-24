import React from 'react';
import { SeoHead } from '../components/SeoHead';
import { ATHREE_HOSPITAL_CONFIG } from '../data/hospitalData';
import { ShieldCheck, Lock, FileText, PhoneCall } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <SeoHead
        title={`Privacy Policy | ${ATHREE_HOSPITAL_CONFIG.name}`}
        description="Patient Privacy Policy and medical data confidentiality terms at Athree Hospital."
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-50 px-3 py-1 rounded-full">
            Legal & Patient Data Protection
          </span>
          <h1 className="text-3xl font-bold text-slate-900 mt-2">Privacy Policy</h1>
          <p className="text-xs text-slate-500 mt-1">Last Updated: October 2026 | Athree Hospital ({ATHREE_HOSPITAL_CONFIG.parentCompany})</p>
        </div>

        <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 space-y-4 leading-relaxed">
          <p>
            At <strong>{ATHREE_HOSPITAL_CONFIG.name}</strong>, we respect your privacy and are committed to protecting your personal health information (PHI) and contact details. This Privacy Policy outlines how we collect, use, and protect the information you submit through our website and appointment forms.
          </p>

          <h3 className="text-base font-bold text-slate-900 pt-2">1. Information We Collect</h3>
          <p>
            When you request an appointment or submit an enquiry through our website, we may collect basic contact information including your full name, mobile phone number, preferred appointment date, selected specialty, and optional symptom notes.
          </p>

          <h3 className="text-base font-bold text-slate-900 pt-2">2. How We Use Your Information</h3>
          <p>
            Your information is used strictly for:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Scheduling and confirming your medical appointment with appropriate specialists.</li>
            <li>Contacting you via phone call or SMS/WhatsApp regarding your appointment status.</li>
            <li>Improving our hospital services and patient coordination.</li>
          </ul>

          <h3 className="text-base font-bold text-slate-900 pt-2">3. Confidentiality and Non-Disclosure</h3>
          <p>
            We do not sell, rent, or trade your personal health details or contact information to third parties. All medical information submitted is treated under strict patient confidentiality standards.
          </p>

          <h3 className="text-base font-bold text-slate-900 pt-2">4. Data Security</h3>
          <p>
            We implement administrative, technical, and physical safeguards to prevent unauthorized access, disclosure, or alteration of patient enquiry records.
          </p>

          <h3 className="text-base font-bold text-slate-900 pt-2">5. Contact Us Regarding Privacy</h3>
          <p>
            If you have any questions regarding this privacy policy or wish to request data updates, please contact our hospital administration at <a href={`mailto:${ATHREE_HOSPITAL_CONFIG.email}`} className="text-blue-900 font-bold">{ATHREE_HOSPITAL_CONFIG.email}</a> or call <a href={`tel:${ATHREE_HOSPITAL_CONFIG.phoneFormatted}`} className="text-blue-900 font-bold">{ATHREE_HOSPITAL_CONFIG.phone}</a>.
          </p>
        </div>
      </div>
    </div>
  );
};
