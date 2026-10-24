import React from 'react';
import { Link } from 'react-router-dom';
import { TREATMENT_CATEGORIES, HOSPITAL_FACILITIES, GENERAL_FAQS, WHY_CHOOSE_US_REASONS, ATHREE_HOSPITAL_CONFIG } from '../data/hospitalData';
import { SeoHead } from '../components/SeoHead';
import { FaqAccordion } from '../components/FaqAccordion';
import { AppointmentForm } from '../components/AppointmentForm';
import { LiquidMorphHeroBlobs } from '../components/LiquidMorphHeroBlobs';
import {
  Phone,
  Calendar,
  MessageSquare,
  ShieldCheck,
  ArrowRight,
  Activity,
  HeartHandshake,
  Shield,
  UserCheck,
  Sparkles,
  Clock,
  Award,
  Users,
  FileText,
  Heart,
  CheckCircle2,
  Stethoscope,
  Building2,
  Check
} from 'lucide-react';

interface HomePageProps {
  onOpenAppointment: (treatmentId?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenAppointment }) => {
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Activity': return <Activity className="w-5 h-5 text-cyan-600 shrink-0" />;
      case 'HeartHandshake': return <HeartHandshake className="w-5 h-5 text-purple-600 shrink-0" />;
      case 'Shield': return <Shield className="w-5 h-5 text-blue-600 shrink-0" />;
      default: return <Activity className="w-5 h-5 text-cyan-600 shrink-0" />;
    }
  };

  const getReasonIcon = (idx: number) => {
    switch (idx) {
      case 0: return <FileText className="w-5 h-5 text-blue-900" />;
      case 1: return <Users className="w-5 h-5 text-blue-900" />;
      case 2: return <ShieldCheck className="w-5 h-5 text-blue-900" />;
      case 3: return <Heart className="w-5 h-5 text-blue-900" />;
      default: return <CheckCircle2 className="w-5 h-5 text-blue-900" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 overflow-x-hidden selection:bg-cyan-500 selection:text-slate-950">
      <SeoHead
        title="Athree Hospital – Advanced General Surgery, Women's Health & Spine Care"
        description="Athree Hospital provides patient-friendly healthcare in General Surgery, Women's Health, and Spine Care in Bengaluru. Explore treatment options and book consultations."
      />

      {/* SECTION 1: HERO SECTION WITH LIQUID MORPHING AMBIENT BACKGROUND */}
      <section className="relative bg-gradient-to-br from-blue-950 via-slate-900 to-blue-900 text-white pt-8 sm:pt-14 pb-16 sm:pb-24 overflow-hidden">
        {/* Ambient Liquid Morphing Blobs */}
        <LiquidMorphHeroBlobs />

        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:28px_28px] opacity-10 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Headlines, Trust Signals, and CTAs */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6">
              {/* Unboxed Metadata Tagline */}
              <div className="flex items-center gap-2 text-xs font-semibold text-cyan-300 flex-wrap">
                <span className="flex items-center gap-1.5 text-white font-bold">
                  <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                  Athree Multi-Specialty Hospital
                </span>
                <span className="text-slate-500" aria-hidden="true">·</span>
                <span className="text-cyan-200">NABH Aligned Standards</span>
                <span className="text-slate-500" aria-hidden="true">·</span>
                <span className="text-slate-300">Bengaluru Surgical Center</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.18]">
                The Right Care Starts with the{' '}
                <span className="text-cyan-400 relative inline-block">
                  Right Consultation
                  <span className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-sky-400 to-transparent rounded-full opacity-80"></span>
                </span>
              </h1>

              {/* Supporting Plain-English Text */}
              <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl">
                Looking for treatment for a health problem? Explore treatment options at Athree Hospital and book a consultation with our medical team.
              </p>

              {/* CTAs: Book an Appointment, Call Now, WhatsApp Us */}
              <div className="pt-1 flex flex-col xs:flex-row flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3">
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

              {/* Patient-Focused Benefits Strip */}
              <div className="pt-4 sm:pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px] sm:text-xs">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Award className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>NABH Standard</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>24/7 Casualty Care</span>
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

            {/* Right Column: Hero Doctor Consultation Photograph + Quick Priority Booking Card */}
            <div className="lg:col-span-5 space-y-4">
              <div className="liquid-glass-card rounded-2xl overflow-hidden shadow-2xl border border-white/60 relative">
                {/* Doctor Consultation Realistic Medical Photography: Responsive Aspect Ratio Container */}
                <div className="relative aspect-[16/10] sm:aspect-[4/3] lg:aspect-[16/10] w-full overflow-hidden bg-slate-900">
                  <img
                    src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1000&q=85"
                    alt="Doctor listening attentively to patient during consultation at Athree Hospital"
                    loading="eager"
                    decoding="async"
                    width="1000"
                    height="625"
                    className="w-full h-full object-cover object-[center_28%]"
                  />
                  {/* Subtle readable gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none" />

                  {/* Overlaid consultation badge */}
                  <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white text-xs">
                    <span className="font-semibold text-white flex items-center gap-1.5 drop-shadow-sm">
                      <Stethoscope className="w-4 h-4 text-cyan-400 shrink-0" />
                      Specialist Medical Consultation
                    </span>
                    <span className="text-[11px] font-bold text-cyan-300 bg-slate-900/80 px-2 py-0.5 rounded backdrop-blur-xs">
                      OPD & Day Care
                    </span>
                  </div>
                </div>

                {/* Priority Consultation Form Area */}
                <div className="p-4 sm:p-5">
                  <div className="mb-3 pb-2 border-b border-slate-200/80 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] sm:text-[11px] font-bold text-blue-900 uppercase tracking-wider block">
                        Direct Appointment
                      </span>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900">
                        Schedule Specialist Visit
                      </h3>
                    </div>
                    <span className="text-[11px] text-slate-500 font-medium">Quick Confirmation</span>
                  </div>
                  <AppointmentForm compact onSuccess={() => {}} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: TREATMENT SPECIALTIES (3 RESPONSIVE IMAGE CARDS) */}
      <section id="treatments" className="py-12 sm:py-16 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
            <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-900">
              <span>Center of Excellence</span>
              <span className="text-slate-400">·</span>
              <span>Advanced Keyhole & Laser Procedures</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              Treatment Specialties
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed">
              Explore specialized departments at Athree Hospital. Click any treatment below to read plain-English explanations, symptoms, and surgical or non-surgical options.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {TREATMENT_CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-cyan-300 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Category Photography Container with fixed Aspect Ratio to avoid mobile clipping */}
                  {cat.imageUrl && (
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
                      <img
                        src={cat.imageUrl}
                        alt={cat.imageAlt || cat.name}
                        loading="lazy"
                        decoding="async"
                        width="800"
                        height="450"
                        className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />
                      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-blue-900/90 backdrop-blur-xs flex items-center justify-center text-cyan-300">
                            {getCategoryIcon(cat.iconName)}
                          </div>
                          <span className="text-sm font-bold tracking-tight text-white drop-shadow-xs">
                            {cat.name}
                          </span>
                        </div>
                        <span className="text-[11px] font-semibold text-cyan-300 bg-slate-900/80 px-2 py-0.5 rounded backdrop-blur-xs">
                          {cat.treatments.length} Procedures
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="p-5 sm:p-6 pb-2">
                    <p className="text-slate-600 text-xs sm:text-sm mb-4 leading-relaxed">
                      {cat.description}
                    </p>

                    <div className="space-y-1.5 pt-2 border-t border-slate-100">
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
                </div>

                <div className="p-5 sm:p-6 pt-0">
                  <div className="pt-3 border-t border-slate-100">
                    <Link
                      to={`/treatments/${cat.treatments[0].slug}`}
                      className="w-full py-2.5 px-4 bg-slate-100 hover:bg-blue-900 hover:text-white text-blue-900 font-semibold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-2xs"
                    >
                      <span>Explore {cat.name}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: WHY CHOOSE ATHREE HOSPITAL? (4 ICON CARDS) */}
      <section id="why-choose-us" className="py-12 sm:py-16 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Why Choose Athree Hospital?
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              We deliver compassionate, transparent, patient-centered medical care in South Bengaluru.
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

      {/* SECTION 4: HOW TO GET STARTED (3-STEP SIMPLE JOURNEY) */}
      <section className="py-12 sm:py-16 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-liquid-morph pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-[11px] sm:text-xs font-bold text-cyan-400 uppercase tracking-wider">Patient Journey</span>
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

      {/* SECTION 5: HOSPITAL FACILITIES & INFRASTRUCTURE */}
      <section className="py-12 sm:py-16 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-900">
              <Building2 className="w-4 h-4 text-cyan-600" />
              <span>Modern Infrastructure</span>
              <span className="text-slate-400">·</span>
              <span>NABH & ISO Compliant</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Hospital Facilities
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              Modern keyhole surgical suites, in-house diagnostics, and comfortable patient recovery units.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {HOSPITAL_FACILITIES.map((fac) => (
              <div
                key={fac.id}
                className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col group"
              >
                {fac.imageUrl && (
                  <div className="aspect-[16/10] w-full overflow-hidden relative bg-slate-200">
                    <img
                      src={fac.imageUrl}
                      alt={fac.imageAlt || fac.title}
                      loading="lazy"
                      decoding="async"
                      width="600"
                      height="375"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent pointer-events-none" />
                    <span className="absolute top-3 left-3 px-2.5 py-1 bg-blue-900/90 text-cyan-300 text-[10px] sm:text-[11px] font-bold rounded-lg backdrop-blur-xs shadow-2xs">
                      {fac.badge}
                    </span>
                  </div>
                )}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-blue-900 transition-colors">
                      {fac.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mt-1.5">
                      {fac.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: FAQ ACCORDION */}
      <section className="py-12 sm:py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FaqAccordion faqs={GENERAL_FAQS} />
        </div>
      </section>

      {/* SECTION 7: FINAL CALL-TO-ACTION BANNER WITH LIQUID AMBIENT GLOW */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-blue-950 via-slate-900 to-blue-900 text-white relative overflow-hidden">
        <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-liquid-morph pointer-events-none"></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5 relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
            Take the First Step Toward the Right Care
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Have questions about a condition or treatment? Contact Athree Hospital to discuss your consultation options with our specialists.
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
