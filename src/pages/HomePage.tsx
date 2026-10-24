import React from 'react';
import { Link } from 'react-router-dom';
import { TREATMENT_CATEGORIES, DOCTORS, HOSPITAL_FACILITIES, GENERAL_FAQS, WHY_CHOOSE_US_REASONS, ATHREE_HOSPITAL_CONFIG } from '../data/hospitalData';
import { SeoHead } from '../components/SeoHead';
import { FaqAccordion } from '../components/FaqAccordion';
import { AppointmentForm } from '../components/AppointmentForm';
import { LiquidMorphHeroBlobs } from '../components/LiquidMorphHeroBlobs';
import { Phone, Calendar, MessageSquare, ShieldCheck, ArrowRight, Activity, HeartHandshake, Shield, UserCheck, Sparkles, Clock, Award, Users, FileText, Heart, CheckCircle2 } from 'lucide-react';

interface HomePageProps {
  onOpenAppointment: (treatmentId?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenAppointment }) => {
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Activity': return <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-600 shrink-0" />;
      case 'HeartHandshake': return <HeartHandshake className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 shrink-0" />;
      case 'Shield': return <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 shrink-0" />;
      default: return <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-600 shrink-0" />;
    }
  };

  const getReasonIcon = (idx: number) => {
    switch (idx) {
      case 0: return <FileText className="w-6 h-6 text-blue-900" />;
      case 1: return <Users className="w-6 h-6 text-blue-900" />;
      case 2: return <ShieldCheck className="w-6 h-6 text-blue-900" />;
      case 3: return <Heart className="w-6 h-6 text-blue-900" />;
      default: return <CheckCircle2 className="w-6 h-6 text-blue-900" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 overflow-x-hidden">
      <SeoHead
        title="Athree Hospital – Advanced General Surgery, Women's Health & Spine Care"
        description="Athree Hospital provides patient-friendly healthcare in General Surgery, Women's Health, and Spine Care. Explore treatment options and book consultations."
      />

      {/* SECTION 2: HERO SECTION WITH LIQUID MORPHING AMBIENT BACKGROUND */}
      <section className="relative bg-gradient-to-br from-blue-950 via-slate-900 to-blue-900 text-white pt-8 sm:pt-12 pb-16 sm:pb-20 overflow-hidden">
        {/* Liquid Morphing Animated Background Blobs */}
        <LiquidMorphHeroBlobs />

        {/* Subtle grid backdrop overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Headlines & CTAs */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-1.5 rounded-full bg-blue-900/80 border border-blue-700/60 text-cyan-300 text-[11px] sm:text-xs font-semibold backdrop-blur-md flex-wrap shadow-sm">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                  Multi-Specialty Healthcare
                </span>
                <span className="text-slate-400">·</span>
                <span className="text-slate-200">24/7 Casualty Care</span>
              </div>

              <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                The Right Care Starts with the <span className="text-cyan-400 relative inline-block">
                  Right Consultation
                  <span className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-400 to-transparent rounded-full opacity-80"></span>
                </span>
              </h1>

              <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl">
                Looking for treatment for a health problem? Explore treatment options at Athree Hospital and book a consultation with our medical team.
              </p>

              {/* CTAs: Book an Appointment, Call Now, WhatsApp Us */}
              <div className="pt-2 flex flex-col xs:flex-row flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3">
                <button
                  onClick={() => onOpenAppointment()}
                  className="px-5 sm:px-6 py-3.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-lg hover:shadow-cyan-500/25 inline-flex items-center justify-center gap-2 group min-h-[44px]"
                >
                  <Calendar className="w-4 h-4 shrink-0" />
                  <span>Book an Appointment</span>
                </button>

                <a
                  href={`tel:${ATHREE_HOSPITAL_CONFIG.phoneFormatted}`}
                  className="px-5 sm:px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-xs sm:text-sm rounded-xl transition-colors inline-flex items-center justify-center gap-2 min-h-[44px]"
                >
                  <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Call Now</span>
                </a>

                <a
                  href={`https://wa.me/${ATHREE_HOSPITAL_CONFIG.whatsapp}?text=Hello%20Athree%20Hospital,%20I%20would%20like%20to%20book%20a%20consultation.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 sm:px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm rounded-xl transition-colors inline-flex items-center justify-center gap-2 min-h-[44px]"
                >
                  <MessageSquare className="w-4 h-4 shrink-0" />
                  <span>WhatsApp Us</span>
                </a>
              </div>

              {/* Compact Verified Credentials Strip */}
              <div className="pt-4 sm:pt-6 border-t border-slate-800/90 grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px] sm:text-xs">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Award className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>NABH Standard</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>24/7 In-Patient</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <UserCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Senior Specialists</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Keyhole & Laser</span>
                </div>
              </div>
            </div>

            {/* Right Column: Quick Booking Form Card with Liquid Glass Effect */}
            <div className="lg:col-span-5">
              <div className="liquid-glass-card text-slate-900 rounded-2xl p-4 sm:p-6 shadow-2xl border border-white/60 backdrop-blur-md relative overflow-hidden transition-all duration-300 hover:shadow-cyan-500/10">
                <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-400/20 rounded-bl-full opacity-60 pointer-events-none animate-liquid-morph"></div>
                <div className="mb-3 pb-2 border-b border-slate-200/80">
                  <span className="text-[11px] font-bold text-blue-900 uppercase tracking-wider block">Quick Consultation</span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">Schedule Specialist Visit</h3>
                </div>
                <AppointmentForm compact onSuccess={() => {}} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: TREATMENT SPECIALTIES (3 CARDS WITH LIQUID HIGHLIGHTS) */}
      <section id="treatments" className="py-12 sm:py-16 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-2.5">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              Specialized Medical Centers
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              Treatment Specialties
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed">
              Click any treatment below to read simple explanations, common symptoms, diagnostic checks, and treatment options.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {TREATMENT_CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-cyan-200 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Subtle Liquid accent glow on hover */}
                <div className="absolute -top-12 -right-12 w-28 h-28 bg-cyan-100/50 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500 pointer-events-none"></div>

                <div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-3 sm:mb-4 border border-blue-100 group-hover:bg-cyan-50 group-hover:border-cyan-200 transition-colors">
                    {getCategoryIcon(cat.iconName)}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1.5">{cat.name}</h3>
                  <p className="text-slate-600 text-xs sm:text-sm mb-4 leading-relaxed">
                    {cat.description}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    {cat.treatments.map((t) => (
                      <Link
                        key={t.id}
                        to={`/treatments/${t.slug}`}
                        className="group/item flex items-start justify-between p-2 sm:p-2.5 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200"
                      >
                        <div className="pr-2">
                          <div className="text-xs sm:text-sm font-semibold text-slate-900 group-hover/item:text-blue-900 transition-colors">
                            {t.title}
                          </div>
                          <div className="text-[11px] sm:text-xs text-slate-500 line-clamp-1">{t.shortDesc}</div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover/item:text-blue-900 group-hover/item:translate-x-1 transition-all shrink-0 mt-1" />
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100">
                  <Link
                    to={`/treatments/${cat.treatments[0].slug}`}
                    className="w-full py-2.5 px-4 bg-slate-100 hover:bg-blue-900 hover:text-white text-blue-900 font-semibold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <span>Explore Treatments</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: WHY CHOOSE ATHREE HOSPITAL? (4 ICON CARDS) */}
      <section id="why-choose-us" className="py-12 sm:py-16 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Why Choose Athree Hospital?
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              We deliver compassionate, transparent, patient-centered medical care.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {WHY_CHOOSE_US_REASONS.map((reason, idx) => (
              <div
                key={idx}
                className="bg-slate-50 rounded-2xl p-5 sm:p-6 border border-slate-200/80 hover:bg-white hover:shadow-lg hover:border-cyan-200 transition-all duration-300 space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-100/70 flex items-center justify-center">
                  {getReasonIcon(idx)}
                </div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900">{reason.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {reason.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: HOW TO GET STARTED (3-STEP PROCESS) */}
      <section className="py-12 sm:py-16 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-liquid-morph pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-[11px] sm:text-xs font-bold text-cyan-400 uppercase tracking-wider">Simple Process</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">How to Get Started</h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              Taking the next step toward better health is simple and straightforward.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-slate-800/80 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-slate-700/80 space-y-2 relative group hover:border-cyan-400/50 transition-colors">
              <div className="w-10 h-10 rounded-full bg-cyan-500 text-slate-950 font-black text-lg flex items-center justify-center mb-3 shadow-md shadow-cyan-500/20">
                1
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white">Choose Your Treatment</h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Select the treatment page relevant to your concern to understand symptoms and diagnostic checks in plain language.
              </p>
            </div>

            <div className="bg-slate-800/80 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-slate-700/80 space-y-2 relative group hover:border-cyan-400/50 transition-colors">
              <div className="w-10 h-10 rounded-full bg-cyan-500 text-slate-950 font-black text-lg flex items-center justify-center mb-3 shadow-md shadow-cyan-500/20">
                2
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white">Book a Consultation</h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Fill out our quick appointment enquiry form, give us a call, or message us directly on WhatsApp to pick a time slot.
              </p>
            </div>

            <div className="bg-slate-800/80 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-slate-700/80 space-y-2 relative group hover:border-cyan-400/50 transition-colors">
              <div className="w-10 h-10 rounded-full bg-cyan-500 text-slate-950 font-black text-lg flex items-center justify-center mb-3 shadow-md shadow-cyan-500/20">
                3
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white">Discuss Your Treatment Options</h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Consult with our medical team, review your diagnosis, and receive clear explanations of all non-surgical and surgical options.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: DOCTOR PROFILES */}
      <section className="py-12 sm:py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-50 px-3 py-1 rounded-full">
              Medical Team
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Meet Our Doctors</h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              Consult with verified, highly experienced surgical and clinical consultants.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {DOCTORS.map((doc) => (
              <div
                key={doc.id}
                className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-blue-900 text-white font-extrabold text-lg sm:text-xl flex items-center justify-center mb-3 shadow-sm">
                    {doc.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">{doc.name}</h3>
                  <div className="text-xs font-semibold text-blue-900 mt-0.5">{doc.specialty}</div>
                  <div className="text-xs text-slate-500 font-medium mt-1">{doc.qualifications}</div>
                  <div className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                    {doc.bio}
                  </div>
                </div>

                <div className="pt-3.5 mt-3.5 border-t border-slate-200/80 space-y-2.5 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Verified Experience:</span>
                    <span className="font-semibold text-slate-900">{doc.experienceYears}+ Years</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>OPD Hours:</span>
                    <span className="font-medium text-slate-800 text-right">{doc.timings}</span>
                  </div>
                  <button
                    onClick={() => onOpenAppointment()}
                    className="w-full min-h-[44px] py-2.5 px-4 bg-blue-900 hover:bg-blue-800 text-white font-semibold text-xs rounded-xl transition-colors shadow-xs"
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: HOSPITAL FACILITIES */}
      <section className="py-12 sm:py-16 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Hospital Facilities</h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              Modern keyhole surgical suites, in-house diagnostics, and comfortable patient recovery units.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {HOSPITAL_FACILITIES.map((fac) => (
              <div key={fac.id} className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-sm space-y-2.5">
                <span className="inline-block px-2.5 py-0.5 bg-cyan-50 text-cyan-800 text-[10px] sm:text-[11px] font-bold rounded-md">
                  {fac.badge}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-slate-900">{fac.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{fac.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: FAQ ACCORDION */}
      <section className="py-12 sm:py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FaqAccordion faqs={GENERAL_FAQS} />
        </div>
      </section>

      {/* SECTION 9: FINAL CTA NAVY BANNER WITH LIQUID AMBIENT GLOW */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-blue-950 via-slate-900 to-blue-900 text-white relative overflow-hidden">
        <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-liquid-morph pointer-events-none"></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5 relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
            Take the First Step Toward the Right Care
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Have questions about a condition or treatment? Contact Athree Hospital to discuss your consultation options.
          </p>

          <div className="pt-2 flex flex-col xs:flex-row flex-wrap justify-center gap-3">
            <button
              onClick={() => onOpenAppointment()}
              className="px-5 sm:px-6 py-3.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-lg inline-flex items-center justify-center gap-2 min-h-[44px]"
            >
              <Calendar className="w-4 h-4 shrink-0" />
              <span>Book an Appointment</span>
            </button>

            <a
              href={`tel:${ATHREE_HOSPITAL_CONFIG.phoneFormatted}`}
              className="px-5 sm:px-6 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs sm:text-sm rounded-xl transition-colors inline-flex items-center justify-center gap-2 min-h-[44px]"
            >
              <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Call Now</span>
            </a>

            <a
              href={`https://wa.me/${ATHREE_HOSPITAL_CONFIG.whatsapp}?text=Hello%20Athree%20Hospital,%20I%20would%20like%20to%20book%20a%20consultation.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 sm:px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm rounded-xl transition-colors inline-flex items-center justify-center gap-2 min-h-[44px]"
            >
              <MessageSquare className="w-4 h-4 shrink-0" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
