import React, { useState } from 'react';
import { ATHREE_HOSPITAL_CONFIG } from '../data/hospitalData';
import { Phone, Calendar, MessageSquare, X } from 'lucide-react';

interface FloatingActionsProps {
  onOpenAppointment: (treatmentId?: string) => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({ onOpenAppointment }) => {
  const [showTooltip, setShowTooltip] = useState(true);

  const whatsappUrl = `https://wa.me/${ATHREE_HOSPITAL_CONFIG.whatsapp}?text=${encodeURIComponent(
    "Hello Athree Hospital, I would like to book a medical consultation."
  )}`;

  return (
    <>
      {/* Floating WhatsApp Button (Bottom Right Desktop & Mobile) */}
      <div className="fixed bottom-18 sm:bottom-20 md:bottom-8 right-3 sm:right-6 z-40 flex flex-col items-end gap-2">
        {showTooltip && (
          <div className="bg-slate-900 text-white text-[11px] sm:text-xs py-1.5 px-3 rounded-xl shadow-xl flex items-center gap-2 border border-slate-700 animate-fade-in">
            <span>Need Help? Chat on WhatsApp</span>
            <button
              onClick={() => setShowTooltip(false)}
              className="text-slate-400 hover:text-white p-0.5"
              aria-label="Dismiss tooltip"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 sm:w-14 sm:h-14 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-xl hover:scale-105 transition-all group relative focus:outline-none focus:ring-4 focus:ring-emerald-300"
          aria-label="Chat on WhatsApp with Athree Hospital"
        >
          <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7 relative z-10 fill-white stroke-emerald-600" />
        </a>
      </div>

      {/* Mobile Sticky Action Bar (<768px) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 px-3 py-2 shadow-2xl flex items-center gap-2 max-h-[14vh]">
        <a
          href={`tel:${ATHREE_HOSPITAL_CONFIG.phoneFormatted}`}
          className="flex-1 min-h-[44px] py-2 px-2.5 bg-slate-100 active:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors border border-slate-200 text-center"
        >
          <Phone className="w-4 h-4 text-cyan-600 shrink-0" />
          <span className="truncate">Call Hospital</span>
        </a>

        <button
          onClick={() => onOpenAppointment()}
          className="flex-1 min-h-[44px] py-2 px-2.5 bg-blue-900 active:bg-blue-800 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-sm text-center"
        >
          <Calendar className="w-4 h-4 shrink-0" />
          <span className="truncate">Book Appointment</span>
        </button>
      </div>
    </>
  );
};
