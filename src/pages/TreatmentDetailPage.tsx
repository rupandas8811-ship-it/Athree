import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { TREATMENTS, ATHREE_HOSPITAL_CONFIG } from '../data/hospitalData';
import { SeoHead } from '../components/SeoHead';
import { FaqAccordion } from '../components/FaqAccordion';
import { AppointmentForm } from '../components/AppointmentForm';
import { Phone, Calendar, MessageSquare, ShieldCheck, ChevronRight, AlertTriangle, Stethoscope, CheckCircle2, ArrowRight } from 'lucide-react';

interface TreatmentDetailPageProps {
  onOpenAppointment: (treatmentId?: string) => void;
}

export const TreatmentDetailPage: React.FC<TreatmentDetailPageProps> = ({ onOpenAppointment }) => {
  const { treatmentSlug } = useParams<{ treatmentSlug: string }>();

  const treatment = treatmentSlug ? TREATMENTS[treatmentSlug] : undefined;

  if (!treatment) {
    return <Navigate to="/" replace />;
  }

  const breadcrumbs = [
    { name: 'Home', item: '/' },
    { name: 'Treatments', item: '/' },
    { name: treatment.title, item: `/treatments/${treatment.slug}` }
  ];

  const conditionSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": treatment.title,
    "description": treatment.seoDescription,
    "image": treatment.imageUrl ? `https://athreehospital.com${treatment.imageUrl}` : undefined,
    "about": {
      "@type": "MedicalCondition",
      "name": treatment.title,
      "possibleTreatment": treatment.treatmentOptions.map(opt => ({
        "@type": "MedicalTherapy",
        "name": opt.title,
        "description": opt.description
      }))
    }
  };

  // Get related treatment objects
  const relatedTreatments = treatment.relatedSlugs
    .map(slug => TREATMENTS[slug])
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-slate-50 overflow-x-hidden">
      <SeoHead
        title={treatment.seoTitle}
        description={treatment.seoDescription}
        breadcrumbs={breadcrumbs}
        schemaData={conditionSchema}
      />

      {/* BREADCRUMB NAVIGATION */}
      <div className="bg-white border-b border-slate-200 py-2.5 sm:py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs font-medium text-slate-500 flex items-center gap-1.5 sm:gap-2 overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-blue-900 transition-colors shrink-0">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="text-slate-600 shrink-0">{treatment.categoryTitle}</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="text-blue-900 font-bold shrink-0">{treatment.title}</span>
        </div>
      </div>

      {/* 1. CLEAR HEADLINE & 2. SHORT PLAIN ENGLISH INTRO */}
      <section className="bg-gradient-to-br from-blue-950 via-slate-900 to-blue-900 text-white py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            <div className="lg:col-span-7 space-y-4 sm:space-y-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-950/80 border border-cyan-800 text-cyan-300 text-[11px] sm:text-xs font-bold rounded-full">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>{treatment.categoryTitle}</span>
              </div>

              {/* H1 Heading */}
              <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                {treatment.heroHeadline}
              </h1>

              {/* 2-3 sentence plain English intro */}
              <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl">
                {treatment.plainEnglishIntro}
              </p>

              <div className="pt-2 flex flex-col xs:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
                <button
                  onClick={() => onOpenAppointment(treatment.id)}
                  className="px-5 sm:px-6 py-3.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-lg inline-flex items-center justify-center gap-2 min-h-[44px]"
                >
                  <Calendar className="w-4 h-4 shrink-0" />
                  <span>Book Consultation</span>
                </button>

                <a
                  href={`tel:${ATHREE_HOSPITAL_CONFIG.phoneFormatted}`}
                  className="px-5 sm:px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-xs sm:text-sm rounded-xl transition-colors inline-flex items-center justify-center gap-2 min-h-[44px]"
                >
                  <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Call Hospital</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white/95 text-slate-900 p-4 sm:p-6 rounded-2xl shadow-xl border border-slate-100">
              <span className="text-[11px] font-bold text-blue-900 uppercase tracking-wider block mb-1">Direct Consultation</span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 sm:mb-3">Enquire for {treatment.title}</h3>
              <AppointmentForm initialTreatmentId={treatment.id} compact />
            </div>
          </div>
        </div>
      </section>

      {/* OVERVIEW / UNDERSTANDING THE CONDITION */}
      <section className="py-10 sm:py-14 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-blue-900">
                <Stethoscope className="w-4 h-4 text-cyan-600 shrink-0" />
                <span>Understanding The Health Problem</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                What is {treatment.title}?
              </h2>
              <p className="text-slate-700 text-xs sm:text-sm md:text-base leading-relaxed">
                {treatment.overview}
              </p>
              <div className="pt-2 flex items-center gap-3 text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1 text-cyan-700 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-cyan-600" />
                  Evidence-Based Clinical Protocol
                </span>
                <span>·</span>
                <span>Bengaluru Surgical Center</span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm bg-white relative group">
                {/* Responsive Non-Cropping Treatment Image Presentation */}
                <div className="relative w-full h-[280px] xs:h-[320px] sm:h-[350px] md:h-[380px] lg:h-[400px] overflow-hidden bg-slate-950 flex items-center justify-center select-none">
                  {/* Ambient blurred backdrop matching the image so the container is filled gracefully */}
                  <img
                    src={treatment.imageUrl || `/assets/treatments/${treatment.slug}.jpg`}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-40 scale-125 pointer-events-none select-none"
                  />

                  {/* Fully visible, uncropped medical photography / diagnostic scan */}
                  <picture className="relative z-10 w-full h-full flex items-center justify-center p-2.5 sm:p-4">
                    <source srcSet={`/assets/treatments/${treatment.slug}.webp`} type="image/webp" />
                    <img
                      src={treatment.imageUrl || `/assets/treatments/${treatment.slug}.jpg`}
                      alt={treatment.imageAlt || `${treatment.title} care and consultation at Athree Hospital`}
                      loading="lazy"
                      decoding="async"
                      className="max-w-full max-h-full w-auto h-auto object-contain rounded-xl drop-shadow-lg transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  </picture>

                  {/* Gradient shadow for caption readability */}
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent pointer-events-none z-15" />

                  {/* Dynamic caption & accreditation badge */}
                  <div className="absolute bottom-3 left-3.5 right-3.5 text-white text-xs font-semibold drop-shadow-md z-20 flex items-center justify-between pointer-events-none">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900/90 backdrop-blur-md border border-white/15 text-cyan-300 font-medium text-[11px] sm:text-xs">
                      {treatment.imageCaption || 'Bengaluru Surgical Center'}
                    </span>
                    <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[11px] bg-slate-800/80 backdrop-blur-md text-slate-300 border border-white/10 font-normal">
                      Athree Hospital Bengaluru
                    </span>
                  </div>
                </div>

                <div className="p-3 sm:p-3.5 bg-white border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                  <span className="font-semibold text-slate-900">{treatment.categoryTitle}</span>
                  <span className="text-cyan-700 font-medium flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-cyan-600" />
                    Minimally Invasive Care
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. COMMON SYMPTOMS & 4. WHEN TO SEE A DOCTOR */}
      <section className="py-10 sm:py-12 bg-slate-50 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Symptoms Card */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-3 sm:space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">
              Common Symptoms
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-500 italic">
              Note: Symptoms can vary from person to person. Only a qualified clinician can establish an accurate diagnosis.
            </p>
            <ul className="space-y-2 sm:space-y-2.5">
              {treatment.symptoms.map((symptom, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                  <span>{symptom}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* When to Consult Card */}
          <div className="bg-amber-50/60 rounded-2xl p-5 sm:p-6 border border-amber-200/80 shadow-sm space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-sm sm:text-base border-b border-amber-200 pb-2">
              <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 shrink-0" />
              <span>When to See a Doctor</span>
            </div>
            <p className="text-[11px] sm:text-xs text-amber-800">
              Consider seeking medical assessment if you notice any of the following triggers:
            </p>
            <ul className="space-y-2 sm:space-y-2.5">
              {treatment.whenToConsult.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0 mt-2"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 5. HOW THE CONDITION IS DIAGNOSED */}
      <section className="py-10 sm:py-12 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 sm:space-y-6">
          <div>
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-blue-900">Diagnosis & Tests</span>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">How the Condition is Diagnosed</h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              Your doctor will recommend specific checks based on your evaluation. Not every test is needed for every patient.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {treatment.diagnosisMethods.map((method, idx) => (
              <div key={idx} className="bg-slate-50 p-3.5 sm:p-4 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed font-medium">
                {method}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TREATMENT OPTIONS */}
      <section className="py-10 sm:py-12 bg-slate-50 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 sm:space-y-6">
          <div>
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-blue-900">Treatment Pathways</span>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">Treatment Options</h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              Options depend on condition severity, medical history, and doctor recommendations. Not every patient requires surgery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {treatment.treatmentOptions.map((opt, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-2">
                <span className="text-[10px] sm:text-[11px] font-bold text-cyan-800 uppercase tracking-wider bg-cyan-50 px-2.5 py-1 rounded-md inline-block">
                  {opt.type}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-slate-900">{opt.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{opt.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. WHY CONSULT ATHREE HOSPITAL? */}
      <section className="py-10 sm:py-12 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 sm:space-y-6">
          <h2 className="text-2xl font-bold text-slate-900">Why Consult Athree Hospital for {treatment.title}?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {treatment.whyChooseAthree.map((reason, idx) => (
              <div key={idx} className="flex items-start gap-2.5 bg-slate-50 p-3.5 sm:p-4 rounded-xl border border-slate-200/80">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-medium text-slate-800">{reason}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FREQUENTLY ASKED QUESTIONS */}
      <section className="py-10 sm:py-12 bg-slate-50 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FaqAccordion
            faqs={treatment.faqs}
            title={`Frequently Asked Questions (${treatment.title})`}
            subtitle="Common questions asked by patients regarding symptoms, procedure, and recovery."
          />
        </div>
      </section>

      {/* 10. RELATED TREATMENTS CROSS-LINKS */}
      {relatedTreatments.length > 0 && (
        <section className="py-10 sm:py-12 bg-white border-b border-slate-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
            <h3 className="text-xl font-bold text-slate-900">Related Treatments & Care Options</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedTreatments.map((rel) => (
                <Link
                  key={rel.id}
                  to={`/treatments/${rel.slug}`}
                  className="bg-slate-50 p-4 rounded-2xl border border-slate-200/90 hover:border-blue-300 hover:bg-blue-50/50 transition-all group space-y-1"
                >
                  <div className="font-bold text-sm text-slate-900 group-hover:text-blue-900 flex items-center justify-between">
                    <span>{rel.title}</span>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-900 group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-2">{rel.shortDesc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 9. APPOINTMENT CTA */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-blue-950 to-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-5">
          <h2 className="text-2xl sm:text-3xl font-extrabold">
            Take the First Step Toward Relief
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Book a confidential consultation with our medical team at Athree Hospital to discuss your options for {treatment.title}.
          </p>

          <div className="pt-2 flex flex-col xs:flex-row flex-wrap justify-center gap-3">
            <button
              onClick={() => onOpenAppointment(treatment.id)}
              className="px-5 sm:px-6 py-3.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md inline-flex items-center justify-center gap-2 min-h-[44px]"
            >
              <Calendar className="w-4 h-4 shrink-0" />
              <span>Book an Appointment</span>
            </button>

            <a
              href={`tel:${ATHREE_HOSPITAL_CONFIG.phoneFormatted}`}
              className="px-5 sm:px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-xs sm:text-sm rounded-xl transition-colors inline-flex items-center justify-center gap-2 min-h-[44px]"
            >
              <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Call Hospital</span>
            </a>

            <a
              href={`https://wa.me/${ATHREE_HOSPITAL_CONFIG.whatsapp}?text=${encodeURIComponent(
                `Hello Athree Hospital, I am inquiring about ${treatment.title} consultation.`
              )}`}
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
