import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AthreeLogo } from './AthreeLogo';
import { TREATMENT_CATEGORIES, ATHREE_HOSPITAL_CONFIG } from '../data/hospitalData';
import { Phone, ChevronDown, Menu, X, Calendar, Activity, HeartHandshake, Shield } from 'lucide-react';

interface HeaderProps {
  onOpenAppointment: (treatmentId?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAppointment }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMobileCategory, setActiveMobileCategory] = useState<string | null>('general-surgery');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent background body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Click outside to close desktop dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Activity': return <Activity className="w-4 h-4 text-cyan-600 shrink-0" />;
      case 'HeartHandshake': return <HeartHandshake className="w-4 h-4 text-purple-600 shrink-0" />;
      case 'Shield': return <Shield className="w-4 h-4 text-blue-600 shrink-0" />;
      default: return <Activity className="w-4 h-4 text-cyan-600 shrink-0" />;
    }
  };

  return (
    <header className={`sticky top-0 z-40 bg-white transition-all duration-200 ${isScrolled ? 'shadow-md border-b border-slate-200/80 py-2 sm:py-2.5' : 'border-b border-slate-100 py-2.5 sm:py-3.5'}`}>
      {/* Top emergency announcement ticker bar (desktop/tablet) */}
      <div className="bg-slate-900 text-white text-xs py-1.5 px-4 hidden lg:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center font-medium">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-cyan-300">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              24/7 Casualty & Surgical Emergency Unit
            </span>
            <span className="text-slate-300">
              {ATHREE_HOSPITAL_CONFIG.parentCompany}
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a href={`tel:${ATHREE_HOSPITAL_CONFIG.phoneFormatted}`} className="hover:text-cyan-300 transition-colors flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-cyan-400" />
              Emergency Line: <strong className="font-bold text-white">{ATHREE_HOSPITAL_CONFIG.phone}</strong>
            </a>
            <span className="text-slate-400">|</span>
            <span className="text-slate-300">Poornaprajna Layout, Uttarahalli Hobli, Bengaluru</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Zone 1: Logo Wordmark */}
          <AthreeLogo />

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 text-xs lg:text-sm font-semibold text-slate-700">
            <Link
              to="/"
              className={`px-2.5 lg:px-3 py-2 rounded-lg transition-colors whitespace-nowrap shrink-0 ${location.pathname === '/' ? 'text-blue-900 bg-blue-50 font-bold' : 'hover:text-blue-900 hover:bg-slate-50'}`}
            >
              Home
            </Link>

            <Link
              to="/about"
              className={`px-2.5 lg:px-3 py-2 rounded-lg transition-colors whitespace-nowrap shrink-0 ${location.pathname === '/about' ? 'text-blue-900 bg-blue-50 font-bold' : 'hover:text-blue-900 hover:bg-slate-50'}`}
            >
              About Us
            </Link>

            {/* Categorized Treatments Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`px-2.5 lg:px-3 py-2 rounded-lg transition-colors inline-flex items-center gap-1 whitespace-nowrap shrink-0 ${location.pathname.startsWith('/treatments') ? 'text-blue-900 bg-blue-50 font-bold' : 'hover:text-blue-900 hover:bg-slate-50'}`}
                aria-expanded={dropdownOpen}
              >
                Treatments
                <ChevronDown className={`w-3.5 h-3.5 lg:w-4 lg:h-4 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {dropdownOpen && (
                <div className="absolute left-0 mt-2 w-96 lg:w-[520px] bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-4 z-50 grid grid-cols-1 lg:grid-cols-2 gap-4 animate-fade-in">
                  {TREATMENT_CATEGORIES.map((cat) => (
                    <div key={cat.id} className="space-y-1.5">
                      <div className="flex items-center gap-2 pb-1 border-b border-slate-100 font-bold text-xs uppercase tracking-wider text-slate-900">
                        {getCategoryIcon(cat.iconName)}
                        <span>{cat.name}</span>
                      </div>
                      <div className="space-y-0.5">
                        {cat.treatments.map((t) => (
                          <Link
                            key={t.id}
                            to={`/treatments/${t.slug}`}
                            className="block px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-700 hover:text-blue-900 hover:bg-blue-50/70 transition-colors"
                          >
                            {t.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <a
              href="#why-choose-us"
              className="px-2.5 lg:px-3 py-2 rounded-lg transition-colors hover:text-blue-900 hover:bg-slate-50 whitespace-nowrap shrink-0"
            >
              Why Choose Us
            </a>

            <Link
              to="/contact"
              className={`px-2.5 lg:px-3 py-2 rounded-lg transition-colors whitespace-nowrap shrink-0 ${location.pathname === '/contact' ? 'text-blue-900 bg-blue-50 font-bold' : 'hover:text-blue-900 hover:bg-slate-50'}`}
            >
              Contact Us
            </Link>
          </nav>

          {/* Zone 3: CTA Button (Desktop) */}
          <div className="hidden md:flex items-center gap-2 lg:gap-3 shrink-0">
            <a
              href={`tel:${ATHREE_HOSPITAL_CONFIG.phoneFormatted}`}
              className="hidden xl:inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-blue-900 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-cyan-600" />
              <span>Call: {ATHREE_HOSPITAL_CONFIG.phone}</span>
            </a>
            <button
              onClick={() => onOpenAppointment()}
              className="px-3.5 lg:px-4 py-2 lg:py-2.5 bg-blue-900 hover:bg-blue-800 text-white text-xs lg:text-sm font-semibold rounded-xl transition-all shadow-sm hover:shadow inline-flex items-center gap-1.5 lg:gap-2 whitespace-nowrap shrink-0"
            >
              <Calendar className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
              Book Appointment
            </button>
          </div>

          {/* Mobile Right Controls (<768px) */}
          <div className="flex md:hidden items-center gap-1.5 shrink-0">
            <button
              onClick={() => onOpenAppointment()}
              className="px-2.5 py-1.5 bg-blue-900 text-white text-xs font-bold rounded-lg shadow-sm flex items-center gap-1 shrink-0"
              aria-label="Book Appointment"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-800 hover:bg-slate-100 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center shrink-0"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-slate-900" /> : <Menu className="w-6 h-6 text-slate-900" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[53px] z-50 bg-slate-900/50 backdrop-blur-xs md:hidden flex flex-col">
          <div className="bg-white w-full max-h-[calc(100vh-53px)] overflow-y-auto px-4 pt-3 pb-24 shadow-2xl space-y-4">
            {/* Primary Nav Links */}
            <div className="space-y-1 border-b border-slate-100 pb-3">
              <Link
                to="/"
                className="flex items-center min-h-[44px] px-3 rounded-xl text-sm font-semibold text-slate-900 hover:bg-slate-50"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="flex items-center min-h-[44px] px-3 rounded-xl text-sm font-semibold text-slate-900 hover:bg-slate-50"
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className="flex items-center min-h-[44px] px-3 rounded-xl text-sm font-semibold text-slate-900 hover:bg-slate-50"
              >
                Contact Us
              </Link>
            </div>

            {/* Treatment Specialties Mobile Accordion */}
            <div className="space-y-2">
              <div className="px-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                Specialized Treatments (12 Landing Pages)
              </div>

              <div className="space-y-2">
                {TREATMENT_CATEGORIES.map((cat) => {
                  const isOpen = activeMobileCategory === cat.id;
                  return (
                    <div key={cat.id} className="bg-slate-50 rounded-xl border border-slate-200/80 overflow-hidden">
                      <button
                        onClick={() => setActiveMobileCategory(isOpen ? null : cat.id)}
                        className="w-full flex items-center justify-between min-h-[44px] px-3 py-2 font-bold text-xs sm:text-sm text-slate-900 text-left"
                      >
                        <div className="flex items-center gap-2">
                          {getCategoryIcon(cat.iconName)}
                          <span>{cat.name}</span>
                        </div>
                        <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {isOpen && (
                        <div className="px-3 pb-3 space-y-1 bg-white border-t border-slate-100 pt-2">
                          {cat.treatments.map((t) => (
                            <Link
                              key={t.id}
                              to={`/treatments/${t.slug}`}
                              className="flex items-center justify-between min-h-[40px] px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-700 hover:text-blue-900 hover:bg-blue-50"
                            >
                              <span>{t.title}</span>
                              <ChevronDown className="w-3 h-3 text-slate-400 -rotate-90" />
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <a
                href={`tel:${ATHREE_HOSPITAL_CONFIG.phoneFormatted}`}
                className="w-full min-h-[44px] py-2.5 px-4 bg-slate-100 text-slate-800 text-xs font-bold rounded-xl flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-cyan-600" />
                Call Helpline: {ATHREE_HOSPITAL_CONFIG.phone}
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAppointment();
                }}
                className="w-full min-h-[44px] py-3 px-4 bg-blue-900 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-sm"
              >
                <Calendar className="w-4 h-4" />
                Book an Appointment
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
