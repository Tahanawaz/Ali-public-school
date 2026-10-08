import React from 'react';
import { 
  ArrowRight, 
  Compass, 
  CheckCircle2, 
  GraduationCap,
  ShieldCheck,
  Award,
  Sparkles,
  Users
} from 'lucide-react';

export default function HeroSection({ onOpenAdmissions }) {
  return (
    <section className="hero-section" id="about">
      {/* Background ambient lighting blooms */}
      <div className="hero-ambient-orb orb-1"></div>
      <div className="hero-ambient-orb orb-2"></div>

      <div className="container hero-container">
        
        {/* Left Column: Clean Structured Typography & Action */}
        <div className="hero-text-block">
          
          <div className="hero-tag-pill reveal-up">
            <span className="pill-dot animated-radar-dot"></span>
            <span className="pill-text">Registered BISE Institution &bull; Dedicated Girls Campus</span>
            <Sparkles size={13} className="text-royal animate-spin-slow" />
          </div>

          <h1 className="hero-heading reveal-up stagger-1">
            Empowering Young Women with{' '}
            <span className="text-royal-gradient text-shimmer-highlight">Knowledge, Character &amp; Excellence</span>
          </h1>

          <p className="hero-lead-text reveal-up stagger-2">
            Ali Public School for Girls (Regd.) provides a disciplined, nurturing, and modern academic environment from Early Montessori to BISE Matriculation Science and Computer Studies.
          </p>

          <div className="hero-buttons-row reveal-up stagger-3">
            <button 
              onClick={onOpenAdmissions} 
              className="btn-primary-hero btn-animated-glow"
            >
              <span>Admissions Open 2026–27</span>
              <ArrowRight size={17} className="btn-arrow-slide" />
            </button>
            <a href="#academics" className="btn-secondary-hero btn-interactive-tilt">
              <Compass size={17} className="compass-icon-spin" />
              <span>Explore Curriculum</span>
            </a>
          </div>

          {/* Clean 3-Item Trust Row */}
          <div className="hero-trust-bar reveal-up stagger-4">
            <div className="trust-cell">
              <CheckCircle2 size={16} className="trust-icon" />
              <span>100% Board Pass Rate</span>
            </div>
            <div className="trust-divider"></div>
            <div className="trust-cell">
              <CheckCircle2 size={16} className="trust-icon" />
              <span>50+ Female Faculty</span>
            </div>
            <div className="trust-divider"></div>
            <div className="trust-cell">
              <CheckCircle2 size={16} className="trust-icon" />
              <span>2,000+ Enrolled Students</span>
            </div>
          </div>

        </div>

        {/* Right Column: Clean, Elegant Pedestal for School Crest with Floating Physics */}
        <div className="hero-graphic-block reveal-scale">
          <div className="crest-showcase-card crest-floating-card">
            
            {/* Top Badge */}
            <div className="crest-card-header-badge">
              <ShieldCheck size={16} className="text-royal" />
              <span>Established 1995 &bull; Lahore</span>
            </div>
            
            {/* Crest Logo with Ambient Ring */}
            <div className="crest-display-container">
              <div className="crest-ambient-ring"></div>
              <img 
                src="/Ali Public School-logo.png" 
                alt="Ali Public School Official Crest (Transparent)" 
                className="crest-primary-logo crest-pulse-effect" 
              />
            </div>

            <div className="crest-label-group">
              <h2 className="crest-urdu-title font-urdu">علی پبلک سکول فار گرلز</h2>
              <div className="crest-motto-row font-urdu">
                <span>علم</span>
                <span className="motto-sep">•</span>
                <span>اخلاق</span>
                <span className="motto-sep">•</span>
                <span>تربیت</span>
              </div>
            </div>

            {/* Clean Mini-Stats Row */}
            <div className="crest-badges-row">
              <div className="stat-pill-clean stat-pill-hover-bounce">
                <span className="stat-pill-val">100%</span>
                <span className="stat-pill-sub">BISE Pass Rate</span>
              </div>
              <div className="stat-pill-clean stat-pill-hover-bounce">
                <span className="stat-pill-val">2,000+</span>
                <span className="stat-pill-sub">Students</span>
              </div>
              <div className="stat-pill-clean stat-pill-hover-bounce">
                <span className="stat-pill-val">50+</span>
                <span className="stat-pill-sub">Teachers</span>
              </div>
            </div>

            {/* Floating micro badges around card */}
            <div className="floating-micro-badge badge-top-right">
              <Award size={13} className="text-amber-500" />
              <span>A+ Distinction</span>
            </div>
            <div className="floating-micro-badge badge-bottom-left">
              <Users size={13} className="text-blue-600" />
              <span>Girls Campus</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
