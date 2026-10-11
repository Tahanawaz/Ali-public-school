import React, { useEffect, useRef, useState } from 'react';
import {
  AlertCircle, BookOpen, Calendar, CheckCircle2, GraduationCap, LockKeyhole,
  Mail, Phone, Send, ShieldCheck, Sparkles, User, X
} from 'lucide-react';

const emptyForm = {
  parentName: '', email: '', phone: '', studentName: '',
  gradeApplying: 'Class 9th (Matric Science - Bio/Math)',
  academicYear: 'Session 2026-2027 (New Admissions)', message: ''
};

export default function AdmissionsModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const dialogRef = useRef(null);
  const firstFieldRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    firstFieldRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll(
          'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href]'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
      previousFocus?.focus?.();
    };
  }, [isOpen, onClose]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setResult(null);
    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.message || 'Application could not be submitted.');
      setResult({ success: true, inquiry: data.data, message: data.message });
      setFormData(emptyForm);
    } catch (error) {
      setResult({
        success: false,
        message: error.message === 'Failed to fetch'
          ? 'The admissions service is temporarily unavailable. Please call the campus office or try again shortly.'
          : error.message
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="clean-modal-backdrop" onMouseDown={onClose}>
      <div ref={dialogRef} className="clean-modal-box animate-fade-in" role="dialog" aria-modal="true"
        aria-labelledby="admissions-title" aria-describedby="admissions-description"
        onMouseDown={(event) => event.stopPropagation()}>
        <div className="clean-modal-header">
          <div className="clean-modal-brand">
            <img src="/Ali Public School-logo.png" alt="" className="modal-crest-logo" />
            <div>
              <h3 id="admissions-title" className="modal-heading-title font-serif">Online Admissions Desk</h3>
              <p id="admissions-description" className="modal-heading-subtitle">Session 2026–2027 • Girls Campus (Regd.)</p>
            </div>
          </div>
          <button className="btn-modal-close" onClick={onClose} aria-label="Close admissions form"><X size={20} /></button>
        </div>

        <div className="admissions-confidence-bar">
          <span><ShieldCheck size={14} /> Private application</span>
          <span><Sparkles size={14} /> Priority response</span>
          <span><Phone size={14} /> Follow-up within 24 hours</span>
        </div>

        <div className="clean-modal-body">
          {result?.success ? (
            <div className="modal-success-card animate-fade-in" role="status">
              <div className="success-icon-badge"><CheckCircle2 size={48} className="text-royal" /></div>
              <span className="section-pill-tag">Application received</span>
              <h4>Thank you, {result.inquiry.parentName}</h4>
              <div className="tracking-id-pill">Application ID: <strong>{result.inquiry.id}</strong></div>
              <p className="success-instruction-text">{result.message} Please save your application ID for follow-up.</p>
              <div className="application-receipt">
                <div><span>Student</span><strong>{result.inquiry.studentName}</strong></div>
                <div><span>Applying for</span><strong>{result.inquiry.gradeApplying}</strong></div>
                <div><span>Status</span><strong>{result.inquiry.status}</strong></div>
              </div>
              <div className="success-btns-row">
                <button onClick={onClose} className="btn-primary-hero">Done</button>
                <button onClick={() => setResult(null)} className="btn-secondary-hero">New Application</button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="modal-admissions-form">
              <div className="modal-form-intro">
                <span className="section-pill-tag"><GraduationCap size={13} /> Start her journey</span>
                <h4>Register your interest</h4>
                <p>Complete this short form and our team will guide you through assessment, documents, fees, and the campus visit.</p>
              </div>

              {result?.success === false && <div className="form-feedback-alert feedback-error" role="alert"><AlertCircle size={18} /><span>{result.message}</span></div>}

              <div className="two-inputs-row">
                <div className="form-field-group">
                  <label className="field-label" htmlFor="parentName"><User size={13} /> Parent / Guardian Name *</label>
                  <input ref={firstFieldRef} type="text" id="parentName" name="parentName" value={formData.parentName} onChange={handleChange} autoComplete="name" maxLength={80} placeholder="e.g. Tariq Mehmood" required className="clean-text-input" />
                </div>
                <div className="form-field-group">
                  <label className="field-label" htmlFor="studentName"><GraduationCap size={13} /> Student Full Name *</label>
                  <input type="text" id="studentName" name="studentName" value={formData.studentName} onChange={handleChange} maxLength={80} placeholder="e.g. Aiman Tariq" required className="clean-text-input" />
                </div>
              </div>
              <div className="two-inputs-row">
                <div className="form-field-group">
                  <label className="field-label" htmlFor="email"><Mail size={13} /> Email Address *</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} autoComplete="email" maxLength={120} placeholder="parent@example.com" required className="clean-text-input" />
                </div>
                <div className="form-field-group">
                  <label className="field-label" htmlFor="phone"><Phone size={13} /> Mobile / WhatsApp *</label>
                  <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} autoComplete="tel" maxLength={24} pattern="[+0-9() -]{7,24}" placeholder="+92 300 1234567" required className="clean-text-input" />
                </div>
              </div>
              <div className="two-inputs-row">
                <div className="form-field-group">
                  <label className="field-label" htmlFor="gradeApplying"><BookOpen size={13} /> Class / Grade *</label>
                  <select id="gradeApplying" name="gradeApplying" value={formData.gradeApplying} onChange={handleChange} className="clean-select-input">
                    <option>Playgroup / Nursery (Early Years)</option><option>Prep (Montessori Advance)</option>
                    <option>Class 1 to 3 (Primary Wing)</option><option>Class 4 to 5 (Primary Wing)</option>
                    <option>Class 6 to 8 (Middle Wing)</option><option>Class 9th (Matric Science - Bio/Math)</option>
                    <option>Class 9th (Computer Science)</option><option>Class 10th (Matric Science)</option>
                  </select>
                </div>
                <div className="form-field-group">
                  <label className="field-label" htmlFor="academicYear"><Calendar size={13} /> Academic Term</label>
                  <select id="academicYear" name="academicYear" value={formData.academicYear} onChange={handleChange} className="clean-select-input">
                    <option>Session 2026-2027 (New Admissions)</option><option>Mid-Term Transfer (2026)</option>
                  </select>
                </div>
              </div>
              <div className="form-field-group">
                <label className="field-label" htmlFor="message">Previous School, Remarks or Transport Inquiry</label>
                <textarea id="message" name="message" value={formData.message} onChange={handleChange} maxLength={500} placeholder="Share any details that will help our admissions team..." className="clean-textarea-input" rows={3} />
              </div>
              <div className="modal-footer-actions">
                <p className="modal-note-text"><LockKeyhole size={13} /> Your details are kept private and used only for admission follow-up.</p>
                <button type="submit" disabled={submitting} className="btn-submit-main">
                  {submitting ? <span>Registering Application...</span> : <><Send size={16} /><span>Register Admission Interest</span></>}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
