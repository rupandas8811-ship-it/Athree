import React from 'react';
import { SeoHead } from '../components/SeoHead';
import { AppointmentForm } from '../components/AppointmentForm';
import { ATHREE_HOSPITAL_CONFIG } from '../data/hospitalData';
import { Phone, Mail, MapPin, Clock, MessageSquare, ExternalLink, ShieldCheck } from 'lucide-react';

interface ContactPageProps {
  onOpenAppointment: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <SeoHead
        title="Contact Us & Book Appointment | Athree Hospital Bengaluru"
        description="Contact Athree Hospital in Bengaluru. Call +91 74835 20200 or book consultations online & via WhatsApp for General Surgery, Women's Health & Spine care."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Get In Touch
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Contact Athree Hospital
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">
            We are here to assist you with consultation appointments, hospital directions, and medical queries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-cyan-600" />
                Hospital Contact Information
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">Phone Helpline (24/7 Emergency)</div>
                    <a href={`tel:${ATHREE_HOSPITAL_CONFIG.phoneFormatted}`} className="text-blue-900 font-bold hover:underline">
                      {ATHREE_HOSPITAL_CONFIG.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">WhatsApp Support</div>
                    <a
                      href={`https://wa.me/${ATHREE_HOSPITAL_CONFIG.whatsapp}?text=Hello%20Athree%20Hospital,%20I%20have%20an%20enquiry.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 font-bold hover:underline"
                    >
                      +{ATHREE_HOSPITAL_CONFIG.whatsapp}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-900 flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">Email Address</div>
                    <a href={`mailto:${ATHREE_HOSPITAL_CONFIG.email}`} className="text-slate-600 hover:underline">
                      {ATHREE_HOSPITAL_CONFIG.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2 border-t border-slate-100">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">Hospital Location</div>
                    <p className="text-slate-600 text-xs mt-0.5">{ATHREE_HOSPITAL_CONFIG.address.full}</p>
                    <a
                      href={ATHREE_HOSPITAL_CONFIG.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-blue-900 font-bold mt-2 hover:underline"
                    >
                      Open Google Maps <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2 border-t border-slate-100">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">Working Hours</div>
                    <p className="text-slate-600 text-xs mt-0.5">{ATHREE_HOSPITAL_CONFIG.workingHours.opd}</p>
                    <p className="text-cyan-800 font-bold text-xs mt-1">24/7 Casualty & In-Patient Surgical Admissions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Embedded Appointment Form */}
          <div className="lg:col-span-7">
            <AppointmentForm />
          </div>
        </div>
      </div>
    </div>
  );
};
