import React from 'react';
import { Link } from 'react-router-dom';
import { AthreeLogo } from './AthreeLogo';
import { ATHREE_HOSPITAL_CONFIG } from '../data/hospitalData';
import { Phone, MessageSquare, Mail, MapPin, Clock, ExternalLink, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 sm:pt-16 pb-28 md:pb-12 border-t border-slate-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 pb-10 border-b border-slate-800">
          {/* Col 1 & 2: Hospital Info & Logo */}
          <div className="sm:col-span-2 space-y-4">
            <AthreeLogo variant="dark" size="md" />
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Athree Hospital is a premier multi-specialty healthcare facility delivering patient-centered surgical excellence in General & Laparoscopic Surgery, Women's Health, and Spine Care.
            </p>
            <div className="pt-1 text-xs text-slate-400 font-medium space-y-0.5">
              <span className="block text-slate-300 font-semibold">{ATHREE_HOSPITAL_CONFIG.parentCompany}</span>
              <span className="block text-slate-400">NABH & ISO Standard Surgical Infrastructure</span>
            </div>
            <div className="pt-2 flex flex-wrap items-center gap-2.5">
              <a
                href={`tel:${ATHREE_HOSPITAL_CONFIG.phoneFormatted}`}
                className="px-3 py-2 bg-blue-950 hover:bg-blue-900 border border-blue-800/80 text-white text-xs font-semibold rounded-xl transition-colors inline-flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-cyan-400" />
                Call Helpline
              </a>
              <a
                href={`https://wa.me/${ATHREE_HOSPITAL_CONFIG.whatsapp}?text=Hello%20Athree%20Hospital,%20I%20would%20like%20to%20enquire%20about%20consultations.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 bg-emerald-950 hover:bg-emerald-900 border border-emerald-800/80 text-white text-xs font-semibold rounded-xl transition-colors inline-flex items-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                WhatsApp Us
              </a>
            </div>
          </div>

          {/* Col 3: General & Laparoscopic Surgery */}
          <div className="space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider border-b border-slate-800 pb-2">
              Laparoscopic & Proctology
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <Link to="/treatments/hernia-repair" className="hover:text-cyan-400 transition-colors inline-block py-0.5">Hernia Repair</Link>
              </li>
              <li>
                <Link to="/treatments/gallstones" className="hover:text-cyan-400 transition-colors inline-block py-0.5">Gallstones Treatment</Link>
              </li>
              <li>
                <Link to="/treatments/piles" className="hover:text-cyan-400 transition-colors inline-block py-0.5">Piles Laser Surgery</Link>
              </li>
              <li>
                <Link to="/treatments/anal-fissure" className="hover:text-cyan-400 transition-colors inline-block py-0.5">Anal Fissure Care</Link>
              </li>
              <li>
                <Link to="/treatments/anal-fistula" className="hover:text-cyan-400 transition-colors inline-block py-0.5">Anal Fistula FiLaC</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Women & Spine Care */}
          <div className="space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider border-b border-slate-800 pb-2">
              Women & Spine Care
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <Link to="/treatments/uterine-fibroids" className="hover:text-cyan-400 transition-colors inline-block py-0.5">Uterine Fibroids</Link>
              </li>
              <li>
                <Link to="/treatments/hysterectomy" className="hover:text-cyan-400 transition-colors inline-block py-0.5">Laparoscopic Hysterectomy</Link>
              </li>
              <li>
                <Link to="/treatments/ovarian-cysts" className="hover:text-cyan-400 transition-colors inline-block py-0.5">Ovarian Cysts</Link>
              </li>
              <li>
                <Link to="/treatments/endometriosis" className="hover:text-cyan-400 transition-colors inline-block py-0.5">Endometriosis Care</Link>
              </li>
              <li>
                <Link to="/treatments/lumbar-disc-prolapse" className="hover:text-cyan-400 transition-colors inline-block py-0.5">Lumbar Disc Prolapse</Link>
              </li>
              <li>
                <Link to="/treatments/cervical-disc-disease" className="hover:text-cyan-400 transition-colors inline-block py-0.5">Cervical Disc Disease</Link>
              </li>
              <li>
                <Link to="/treatments/vertebral-compression-fractures" className="hover:text-cyan-400 transition-colors inline-block py-0.5">Kyphoplasty & Fractures</Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Contact & Location */}
          <div className="space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider border-b border-slate-800 pb-2">
              Address & Hours
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span className="leading-snug">{ATHREE_HOSPITAL_CONFIG.address.full}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{ATHREE_HOSPITAL_CONFIG.workingHours.opd}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="break-all">{ATHREE_HOSPITAL_CONFIG.email}</span>
              </div>
              <div className="pt-1">
                <a
                  href={ATHREE_HOSPITAL_CONFIG.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 transition-colors inline-flex items-center gap-1 text-xs font-semibold py-1"
                >
                  View Location on Google Maps
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} {ATHREE_HOSPITAL_CONFIG.name}. All Rights Reserved.
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <Link to="/privacy" className="hover:text-slate-300 transition-colors py-1">Privacy Policy</Link>
            <Link to="/contact" className="hover:text-slate-300 transition-colors py-1">Contact Us</Link>
            <span className="flex items-center gap-1 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Verified Medical Facility
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
