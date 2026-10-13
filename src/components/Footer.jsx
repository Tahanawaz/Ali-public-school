import React from 'react';
import { 
  ArrowUp, 
  MapPin, 
  Phone, 
  Mail, 
  GraduationCap
} from 'lucide-react';

const currentYear = new Date().getFullYear();
const socialLinks = {
  facebook: 'https://www.facebook.com/profile.php?id=100069327015477',
  instagram: 'https://instagram.com/ali_public_school_raiwind?srtk=MTV3NDVzb3c2MnBzNQ%3D%3D'
};

function FacebookLogo({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.5 22v-9h3l.5-3.5h-3.5V7.25c0-1 .28-1.75 1.78-1.75H17V2.14A23 23 0 0 0 14.39 2C11.8 2 10 3.58 10 6.48V9.5H7V13h3v9h3.5Z" />
    </svg>
  );
}

function InstagramLogo({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

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
                <span>Ali Public High School, Railway Colony, Raiwind, Lahore</span>
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

            <div className="footer-social-block" aria-label="School social media">
              <span className="footer-social-label">Follow the school</span>
              <div className="footer-social-links">
                <a
                  className={`footer-social-link ${!socialLinks.facebook ? 'is-placeholder' : ''}`}
                  href={socialLinks.facebook || undefined}
                  target={socialLinks.facebook ? '_blank' : undefined}
                  rel={socialLinks.facebook ? 'noreferrer' : undefined}
                  aria-label="Ali Public School on Facebook"
                  title="Visit Ali Public School on Facebook"
                >
                  <FacebookLogo />
                  <span>Facebook</span>
                </a>
                <a
                  className={`footer-social-link ${!socialLinks.instagram ? 'is-placeholder' : ''}`}
                  href={socialLinks.instagram || undefined}
                  target={socialLinks.instagram ? '_blank' : undefined}
                  rel={socialLinks.instagram ? 'noreferrer' : undefined}
                  aria-label="Ali Public School on Instagram"
                  title="Visit Ali Public School on Instagram"
                >
                  <InstagramLogo />
                  <span>Instagram</span>
                </a>
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
