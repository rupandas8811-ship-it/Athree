import React from 'react';
import { SeoHead } from '../components/SeoHead';
import { ATHREE_HOSPITAL_CONFIG, DOCTORS, HOSPITAL_FACILITIES } from '../data/hospitalData';
import { ShieldCheck, Award, HeartHandshake, CheckCircle2, Building, Calendar } from 'lucide-react';

interface AboutPageProps {
  onOpenAppointment: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenAppointment }) => {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <SeoHead
        title={`About Us | ${ATHREE_HOSPITAL_CONFIG.name}`}
        description="Learn about Athree Hospital, a unit of Sri Srinivasa Therapeutic Services Pvt Ltd, delivering advanced 3D laparoscopic, women's health, and spine surgical care."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <span className="inline-block px-3 py-1 bg-cyan-950 border border-cyan-800 text-cyan-300 text-xs font-bold rounded-full">
              {ATHREE_HOSPITAL_CONFIG.parentCompany}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              About Athree Hospital
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Founded on the principles of medical excellence, compassionate care, and transparent clinical guidance, Athree Hospital is a modern multi-specialty healthcare destination.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onOpenAppointment()}
                className="px-5 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition-all inline-flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                Book an Appointment
              </button>
            </div>
          </div>
        </div>

        {/* Mission & Vision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Clinical Excellence</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Utilizing state-of-the-art 3D laparoscopic cameras, German laser units, and high-resolution diagnostic equipment.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-900 flex items-center justify-center font-bold">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Patient Centered</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We treat patients with dignity, offering clear explanations of conditions, recovery expectations, and treatment options.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-900 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Safety & Standards</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Strict infection control protocols, air-filtered operating theatres, and 24/7 casualty & intensive care monitoring.
            </p>
          </div>
        </div>

        {/* Doctors Overview */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-2xl font-bold text-slate-900">Clinical Leadership</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DOCTORS.map((doc) => (
              <div key={doc.id} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
                <h3 className="font-bold text-slate-900 text-base">{doc.name}</h3>
                <div className="text-xs font-semibold text-blue-900">{doc.specialty}</div>
                <div className="text-xs text-slate-500">{doc.qualifications}</div>
                <p className="text-xs text-slate-600 leading-relaxed pt-2 border-t border-slate-200/80">
                  {doc.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
