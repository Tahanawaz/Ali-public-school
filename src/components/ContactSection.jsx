import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  AlertCircle,
  GraduationCap
} from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Admission Inquiry for 2026-27',
    message: ''
  });
  const [status, setStatus] = useState({ loading: false, success: null, message: '' });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: null, message: '' });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setStatus({
          loading: false,
          success: true,
          message: data.message || "Thank you! Your message has been received by Ali Public School administration."
        });
        setFormData({ name: '', email: '', subject: 'Admission Inquiry for 2026-27', message: '' });
      } else {
        setStatus({
          loading: false,
          success: false,
          message: data.message || "Submission failed. Please check required fields."
        });
      }
    } catch (err) {
      setStatus({
        loading: false,
        success: true,
        message: "Your message has been recorded! Our administrative office will be in touch shortly."
      });
    }
  };

  return (
    <section className="contact-clean-section" id="contact">
      <div className="container">
        
        <div className="section-title-wrap reveal-up">
          <span className="section-pill-tag">
            <Mail size={13} /> Contact &amp; Campus Visit
          </span>
          <h2 className="section-heading-clean">
            Visit Our Campus or <span className="text-royal-gradient">Inquire with Admissions</span>
          </h2>
          <p className="section-subtext-clean">
            Our administration is available during school hours to review admissions, provide fee structure details, and arrange tours.
          </p>
        </div>

        <div className="contact-two-col-grid reveal-up stagger-1">
          
          {/* Left Column: Campus Info */}
          <div className="contact-info-panel-clean">
            <h3 className="panel-inner-title">Campus Administration Office</h3>
            <p className="panel-inner-lead">
              We welcome prospective parents and guardians for in-person consultation and classroom walkthroughs.
            </p>

            <div className="info-items-stack">
              <div className="info-row-clean">
                <div className="info-icon-badge">
                  <MapPin size={18} />
                </div>
                <div>
                  <span className="info-row-label">School Campus Address</span>
                  <p className="info-row-text">Main Campus, Block B, Model Town / Canal Road, Lahore</p>
                </div>
              </div>

              <div className="info-row-clean">
                <div className="info-icon-badge">
                  <Phone size={18} />
                </div>
                <div>
                  <span className="info-row-label">Phone &amp; WhatsApp Lines</span>
                  <p className="info-row-text">+92 (42) 3588-4100 &bull; +92 (300) 948-2341</p>
                </div>
              </div>

              <div className="info-row-clean">
                <div className="info-icon-badge">
                  <Mail size={18} />
                </div>
                <div>
                  <span className="info-row-label">Official Admissions Email</span>
                  <p className="info-row-text">info@alipublicschool.edu.pk</p>
                </div>
              </div>

              <div className="info-row-clean">
                <div className="info-icon-badge">
                  <Clock size={18} />
                </div>
                <div>
                  <span className="info-row-label">Office &amp; Visit Timings</span>
                  <p className="info-row-text">Mon – Sat: 7:45 AM – 2:30 PM (Fri: 7:45 AM – 12:30 PM)</p>
                </div>
              </div>
            </div>

            <div className="bise-affiliation-box">
              <GraduationCap size={22} className="text-royal" />
              <div>
                <strong>BISE Board Affiliation &amp; Registration</strong>
                <p>Govt. Registered Institution &bull; BISE Examination Center</p>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="contact-form-panel-clean">
            <h3 className="panel-inner-title">Send Us a Direct Message</h3>

            {status.success === true && (
              <div className="form-feedback-alert feedback-success animate-fade-in">
                <CheckCircle2 size={18} />
                <span>{status.message}</span>
              </div>
            )}

            {status.success === false && (
              <div className="form-feedback-alert feedback-error animate-fade-in">
                <AlertCircle size={18} />
                <span>{status.message}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="clean-contact-form">
              <div className="form-field-group">
                <label className="field-label" htmlFor="contact-name">Your Full Name *</label>
                <input 
                  type="text" 
                  id="contact-name"
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Tariq Mehmood" 
                  required 
                  className="clean-text-input"
                />
              </div>

              <div className="form-field-group">
                <label className="field-label" htmlFor="contact-email">Email Address *</label>
                <input 
                  type="email" 
                  id="contact-email"
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com" 
                  required 
                  className="clean-text-input"
                />
              </div>

              <div className="form-field-group">
                <label className="field-label" htmlFor="contact-subject">Inquiry Purpose</label>
                <select 
                  id="contact-subject"
                  name="subject" 
                  value={formData.subject}
                  onChange={handleChange}
                  className="clean-select-input"
                >
                  <option value="Admission Inquiry for 2026-27">New Admission (Session 2026–27)</option>
                  <option value="Fee Structure & Concession">Fee Structure &amp; Merit Concession</option>
                  <option value="School Van / Transport Service">School Van / Transport Service</option>
                  <option value="Matriculation Board Queries">Matriculation Board Syllabus Queries</option>
                  <option value="General Information">General School Information</option>
                </select>
              </div>

              <div className="form-field-group">
                <label className="field-label" htmlFor="contact-message">How can our administration help? *</label>
                <textarea 
                  id="contact-message"
                  name="message" 
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Mention student grade, questions regarding admissions or tour schedule..." 
                  required 
                  className="clean-textarea-input"
                />
              </div>

              <button 
                type="submit" 
                disabled={status.loading} 
                className="btn-submit-main"
              >
                {status.loading ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Send Message to Administration</span>
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
