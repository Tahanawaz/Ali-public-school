import React from 'react';
import { 
  ArrowUp, 
  MapPin, 
  Phone, 
  Mail, 
  GraduationCap
} from 'lucide-react';

const currentYear = new Date().getFullYear();

export default function Footer({ onOpenAdmissions }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="clean-footer">
      <div className="container">
        
        {/* Top Callout Banner */}
        <div className="footer-callout-banner reveal-up">
          <div className="callout-text-block">
            <h3>Admissions Open for Session 2026–2027</h3>
            <p>Visit the campus office or complete our online admission registration for Playgroup through Class 10th.</p>
          </div>
          <div className="callout-actions-block">
            <button onClick={onOpenAdmissions} className="btn-callout-primary">
              <GraduationCap size={18} />
              <span>Apply Online</span>
            </button>
            <a href="#contact" className="btn-callout-secondary">
              <span>Contact Office</span>
            </a>
          </div>
        </div>

        {/* 4-Column Footer Navigation */}
        <div className="footer-main-columns reveal-up stagger-1">
          
          {/* Brand & Crest Column (Original Logo with its complete emblem background) */}
          <div className="footer-brand-column">
            <div className="footer-brand-row">
              <div className="footer-logo-frame">
                <img 
                  src="/Ali Public School-logo-original.png" 
                  alt="Ali Public School Logo" 
                  className="footer-brand-logo" 
                />
              </div>
              <div className="footer-brand-texts">
                <span className="footer-school-title font-serif">ALI PUBLIC SCHOOL</span>
                <span className="footer-school-sub">FOR GIRLS (Regd.) &bull; ESTD. 1995</span>
              </div>
            </div>

            <p className="footer-motto-phrase">
              "Knowledge • Character • Empowerment"<br />
              <span className="footer-urdu-script font-urdu">علی پبلک سکول فار گرلز (رجسٹرڈ)</span>
            </p>

            <div className="footer-badges-list">
              <span className="f-badge">BISE Affiliated</span>
              <span className="f-badge">Govt. Registered</span>
              <span className="f-badge">Girls Campus</span>
            </div>
          </div>

          {/* Academic Links */}
          <div className="footer-links-column">
            <h4 className="footer-col-header">Academics</h4>
            <ul className="footer-links-list">
              <li><a href="#academics">Playgroup &amp; Montessori</a></li>
              <li><a href="#academics">Primary Wing (Classes 1–5)</a></li>
              <li><a href="#academics">Middle Wing (Classes 6–8)</a></li>
              <li><a href="#academics">Matric Science (Biology)</a></li>
              <li><a href="#academics">Computer Science Stream</a></li>
              <li><a href="#academics">BISE Board Examination Prep</a></li>
            </ul>
          </div>

          {/* Campus & Facilities */}
          <div className="footer-links-column">
            <h4 className="footer-col-header">Campus &amp; Facilities</h4>
            <ul className="footer-links-list">
              <li><a href="#facilities">Science &amp; Chemistry Labs</a></li>
              <li><a href="#facilities">Digital Smart IT Hub</a></li>
              <li><a href="#facilities">Central Academic Library</a></li>
              <li><a href="#facilities">Covered Sports Ground</a></li>
              <li><a href="#faculty">Experienced Female Faculty</a></li>
              <li><a href="#about">Our Values &amp; Tarbiyah</a></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="footer-links-column">
            <h4 className="footer-col-header">Campus Office</h4>
            <div className="footer-contact-stack">
              <div className="f-contact-row">
                <MapPin size={16} className="f-contact-icon" />
                <span>Main Campus, Block B, Model Town, Lahore</span>
              </div>
              <div className="f-contact-row">
                <Phone size={16} className="f-contact-icon" />
                <span>(042) 3588-4100 &bull; +92 300 9482341</span>
              </div>
              <div className="f-contact-row">
                <Mail size={16} className="f-contact-icon" />
                <span>info@alipublicschool.edu.pk</span>
              </div>
            </div>

            <button 
              onClick={onOpenAdmissions}
              className="btn-footer-portal"
            >
              Open Online Admissions
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div className="bottom-left-copy">
            <span>&copy; {currentYear} Ali Public School for Girls (Regd.). All Rights Reserved.</span>
            <span className="bottom-dot">•</span>
            <span>Website demonstration • Institutional details subject to school verification</span>
          </div>

          <button onClick={scrollToTop} className="btn-back-top" aria-label="Back to Top">
            <span>Top</span>
            <ArrowUp size={14} />
          </button>
        </div>

      </div>
    </footer>
  );
}
