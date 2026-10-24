import React from 'react';
import { SeoHead } from '../components/SeoHead';
import { Medical3DViewer } from '../components/Medical3DViewer';
import { Box, Sparkles, ShieldCheck, Calendar, Phone, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ATHREE_HOSPITAL_CONFIG } from '../data/hospitalData';

interface Explorer3DPageProps {
  onOpenAppointment: (treatmentId?: string) => void;
}

export const Explorer3DPage: React.FC<Explorer3DPageProps> = ({ onOpenAppointment }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SeoHead
        title="Interactive 3D Medical Anatomy & Surgical Explorer – Athree Hospital"
        description="Interactive 3D medical anatomy viewer by Athree Hospital. Inspect 3D spinal disc prolapse, keyhole laparoscopic surgical instruments, and knee joint anatomy."
      />

      {/* Header Banner */}
      <div className="bg-slate-900 border-b border-slate-800 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenAppointment()}
                className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-colors inline-flex items-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Consultation</span>
              </button>
              <a
                href={`tel:${ATHREE_HOSPITAL_CONFIG.phoneFormatted}`}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-xl border border-slate-700 transition-colors inline-flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-cyan-400" />
                <span>Call Hospital</span>
              </a>
            </div>
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-300 bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-800">
              <Box className="w-3.5 h-3.5 text-cyan-400" />
              <span>Interactive Patient Education Suite</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
              3D Medical Anatomy & Surgical Instrument Explorer
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-3xl leading-relaxed">
              Examine high-precision 3D anatomical structures in real time. Use exploded layer views, diagnostic heatmap shaders, and 360-degree rotation to visualize keyhole laparoscopic surgery, spinal disc herniations, and ligament repair.
            </p>
          </div>
        </div>
      </div>

      {/* Main 3D Canvas Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <Medical3DViewer
          initialModel="spine-disc"
          height="h-[600px] sm:h-[720px]"
          onOpenAppointment={onOpenAppointment}
        />

        {/* Diagnostic Explanations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
            <span className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400 font-bold text-xs">
              01
            </span>
            <h3 className="text-base font-bold text-white">Spine & Lumbar Disc Prolapse</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Visualizes L4-L5 lumbar vertebrae, the intervertebral gel disc, nerve root compression, and the prolapsed herniated bulge causing sciatica.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
            <span className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400 font-bold text-xs">
              02
            </span>
            <h3 className="text-base font-bold text-white">Laparoscopic Surgical Tool</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Examines keyhole surgical trocar ports, cold LED light fiber-optics, HD camera shaft, and micro-articulated grasper jaws used in laser & hernia surgery.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
            <span className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400 font-bold text-xs">
              03
            </span>
            <h3 className="text-base font-bold text-white">Knee Joint & Ligament Anatomy</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Demonstrates distal femur condyles, tibia plateau, shock-absorbing meniscus pads, and ACL/PCL stabilizing ligaments.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
