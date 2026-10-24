import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { AppointmentModal } from './components/AppointmentModal';
import { LiquidMorphFilter } from './components/LiquidMorphFilter';
import { HomePage } from './pages/HomePage';
import { TreatmentDetailPage } from './pages/TreatmentDetailPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { AboutPage } from './pages/AboutPage';
import { Explorer3DPage } from './pages/Explorer3DPage';

// Helper component to scroll window to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTreatmentId, setSelectedTreatmentId] = useState<string>('');

  const handleOpenAppointment = (treatmentId?: string) => {
    if (treatmentId) {
      setSelectedTreatmentId(treatmentId);
    } else {
      setSelectedTreatmentId('hernia-repair');
    }
    setModalOpen(true);
  };

  return (
    <Router>
      <ScrollToTop />
      {/* Global SVG Liquid Morph Filter */}
      <LiquidMorphFilter />

      <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800 selection:bg-cyan-100 selection:text-blue-900 font-sans">
        {/* Responsive Top Bar Navigation */}
        <Header onOpenAppointment={handleOpenAppointment} />

        {/* Main Content Viewport */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage onOpenAppointment={handleOpenAppointment} />} />
            <Route
              path="/treatments/:treatmentSlug"
              element={<TreatmentDetailPage onOpenAppointment={handleOpenAppointment} />}
            />
            <Route path="/3d-explorer" element={<Explorer3DPage onOpenAppointment={handleOpenAppointment} />} />
            <Route path="/contact" element={<ContactPage onOpenAppointment={handleOpenAppointment} />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/about" element={<AboutPage onOpenAppointment={handleOpenAppointment} />} />
            <Route path="*" element={<HomePage onOpenAppointment={handleOpenAppointment} />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />

        {/* Floating WhatsApp & Sticky Mobile Bar */}
        <FloatingActions onOpenAppointment={handleOpenAppointment} />

        {/* Popup Appointment Booking Modal */}
        <AppointmentModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          initialTreatmentId={selectedTreatmentId}
        />
      </div>
    </Router>
  );
}
