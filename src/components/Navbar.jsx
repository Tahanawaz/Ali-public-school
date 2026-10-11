import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Phone, 
  GraduationCap, 
  ChevronRight,
  ShieldCheck,
  Clock
} from 'lucide-react';

export default function Navbar({ onOpenAdmissions }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About APS', href: '#about' },
    { name: 'Academics', href: '#academics' },
    { name: 'Campus Facilities', href: '#facilities' },
    { name: 'Notice Board', href: '#notices' },
    { name: 'Faculty', href: '#faculty' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Sleek Top Utility Strip */}
      <div className="top-utility-bar">
        <div className="container utility-container">
          <div className="utility-left">
            <span className="live-status-dot"></span>
            <span className="utility-highlight">Admissions Open 2026–2027</span>
            <span className="utility-divider">•</span>
            <span className="utility-text">Playgroup, Primary &amp; Matric Science (BISE)</span>
          </div>

          <div className="utility-right">
            <div className="utility-item">
              <Clock size={13} className="text-blue-light" />
              <span>Mon – Sat: 7:45 AM – 2:30 PM</span>
            </div>
            <span className="utility-divider">•</span>
            <a href="tel:+924235884100" className="utility-link">
              <Phone size={13} className="text-blue-light" />
              <span>(042) 3588-4100</span>
            </a>
            <span className="utility-divider">•</span>
            <button
              onClick={onOpenAdmissions}
              className="portal-badge-btn"
              title="Open the secure online admissions form"
            >
              <ShieldCheck size={12} />
              <span>Secure Online Admissions</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Clean Sticky Navbar */}
      <header className={`main-navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
        <div className="container navbar-container">
          
          {/* Logo & School Identity (Transparent logo, perfectly integrated) */}
          <a href="#" className="school-brand-wrapper">
            <img 
              src="/Ali Public School-logo.png" 
              alt="Ali Public School for Girls Logo" 
              className="brand-logo-img" 
            />
            <div className="brand-text-col">
              <span className="brand-title font-serif">ALI PUBLIC SCHOOL</span>
              <span className="brand-sub">
                <span className="brand-sub-main">FOR GIRLS (Regd.)</span>
                <span className="brand-sub-extra">&bull; ESTD. 1995 &bull; <span className="brand-urdu font-urdu">علی پبلک سکول</span></span>
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="desktop-nav-menu">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="nav-item-link"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop Right Action CTA */}
          <div className="navbar-actions-group">
            <button 
              onClick={onOpenAdmissions}
              className="btn-apply-main"
            >
              <GraduationCap size={17} />
              <span>Apply Online</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button 
              className="mobile-hamburger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="mobile-dropdown-menu animate-fade-in">
            <div className="container mobile-dropdown-inner">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  className="mobile-item-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>{link.name}</span>
                  <ChevronRight size={16} />
                </a>
              ))}
              
              <div className="mobile-action-buttons">
                <button 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdmissions();
                  }}
                  className="btn-apply-main"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <GraduationCap size={18} />
                  <span>Start Admission Application</span>
                </button>
                <a
                  href="#contact"
                  className="btn-portal-outline"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}
                >
                  <Phone size={15} />
                  <span>Book a Campus Visit</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
