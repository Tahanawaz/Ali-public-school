import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import StatsSection from './components/StatsSection';
import ProgramsSection from './components/ProgramsSection';
import CampusLife from './components/CampusLife';
import AnnouncementsEvents from './components/AnnouncementsEvents';
import FacultySection from './components/FacultySection';
import TestimonialsSection from './components/TestimonialsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import AdmissionsModal from './components/AdmissionsModal';
import { useScrollReveal } from './hooks/useScrollReveal';
import { ArrowUp, Sparkles, MessageCircle } from 'lucide-react';
import './App.css';

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState('form'); // 'form' or 'inquiries'
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Initialize global scroll-triggered animations
  useScrollReveal();

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${(totalScroll / windowHeight) * 100}%`;
      
      setScrollProgress((totalScroll / windowHeight) * 100);
      setShowScrollTop(totalScroll > 320);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleOpenAdmissions = () => {
    setModalTab('form');
    setModalOpen(true);
  };

  const handleOpenInquiriesList = () => {
    setModalTab('inquiries');
    setModalOpen(true);
  };

  return (
    <div className="school-app-wrapper">
      {/* Top Reading Progress Bar */}
      <div 
        className="global-scroll-progress-bar" 
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Clean Navigation Header */}
      <Navbar 
        onOpenAdmissions={handleOpenAdmissions} 
        onOpenInquiriesList={handleOpenInquiriesList}
      />

      {/* Main Page Sections with Scroll Reveals */}
      <main>
        <HeroSection onOpenAdmissions={handleOpenAdmissions} />
        <StatsSection />
        <ProgramsSection onOpenAdmissions={handleOpenAdmissions} />
        <CampusLife />
        <AnnouncementsEvents onOpenAdmissions={handleOpenAdmissions} />
        <FacultySection />
        <TestimonialsSection />
        <ContactSection />
      </main>

      {/* Professional Footer */}
      <Footer onOpenAdmissions={handleOpenAdmissions} />

      {/* Admissions & Database Portal Modal */}
      <AdmissionsModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)}
        initialTab={modalTab}
      />

      {/* Floating Action Button: Scroll to Top with Progress */}
      {showScrollTop && (
        <button 
          onClick={scrollToTop} 
          className="floating-back-to-top animate-fade-in"
          aria-label="Back to top"
          title="Back to Top"
        >
          <ArrowUp size={20} className="arrow-up-bounce" />
          <span className="tooltip-top-text">Back to top</span>
        </button>
      )}

      {/* Floating Quick Admission Pill on Desktop */}
      <div className="floating-quick-apply-strip">
        <button 
          onClick={handleOpenAdmissions}
          className="floating-apply-cta"
        >
          <span className="pulse-ping-dot"></span>
          <Sparkles size={15} className="cta-sparkle-spin" />
          <span>Apply 2026–27</span>
        </button>
      </div>
    </div>
  );
}
