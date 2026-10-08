import React, { useState, useEffect } from 'react';
import { 
  X, 
  GraduationCap, 
  CheckCircle2, 
  AlertCircle, 
  Send, 
  Database, 
  Calendar,
  Sparkles,
  User,
  Mail,
  Phone,
  BookOpen
} from 'lucide-react';

export default function AdmissionsModal({ isOpen, onClose, initialTab = 'form' }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [inquiries, setInquiries] = useState([]);
  const [loadingInquiries, setLoadingInquiries] = useState(false);

  const [formData, setFormData] = useState({
    parentName: '',
    email: '',
    phone: '',
    studentName: '',
    gradeApplying: 'Class 9th (Matric Science)',
    academicYear: 'Session 2026-2027',
    message: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    if (isOpen && activeTab === 'inquiries') {
      fetchInquiries();
    }
  }, [isOpen, activeTab]);

  const fetchInquiries = async () => {
    setLoadingInquiries(true);
    try {
      const res = await fetch('/api/inquiries');
      const data = await res.json();
      if (data.success && data.data) {
        setInquiries(data.data);
      }
    } catch (err) {
      console.warn('Inquiries fetch error:', err);
    } finally {
      setLoadingInquiries(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setResult(null);

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setResult({
          success: true,
          inquiryId: data.data.id,
          message: data.message
        });
        setFormData({
          parentName: '',
          email: '',
          phone: '',
          studentName: '',
          gradeApplying: 'Class 9th (Matric Science)',
          academicYear: 'Session 2026-2027',
          message: ''
        });
      } else {
        setResult({
          success: false,
          message: data.message || "Failed to submit inquiry. Please check required fields."
        });
      }
    } catch (err) {
      setResult({
        success: false,
        message: "Network error connecting to Node.js backend on http://localhost:5000."
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="clean-modal-backdrop" onClick={onClose}>
      <div className="clean-modal-box animate-fade-in" onClick={(e) => e.stopPropagation()}>
        
        {/* Modal Header */}
        <div className="clean-modal-header">
          <div className="clean-modal-brand">
            <img 
              src="/Ali Public School-logo.png" 
              alt="Ali Public School Logo (Transparent)" 
              className="modal-crest-logo" 
            />
            <div>
              <h3 className="modal-heading-title font-serif">Ali Public School Admissions</h3>
              <p className="modal-heading-subtitle">Session 2026–2027 &bull; Girls Campus (Regd.)</p>
            </div>
          </div>

          <button className="btn-modal-close" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {/* Modal Tab Switcher */}
        <div className="clean-modal-tabs">
          <button 
            className={`modal-switcher-btn ${activeTab === 'form' ? 'switcher-active' : ''}`}
            onClick={() => setActiveTab('form')}
          >
            <Sparkles size={15} />
            <span>Admission Application</span>
          </button>
          <button 
            className={`modal-switcher-btn ${activeTab === 'inquiries' ? 'switcher-active' : ''}`}
            onClick={() => {
              setActiveTab('inquiries');
              fetchInquiries();
            }}
          >
            <Database size={15} />
            <span>Live Database Records</span>
          </button>
        </div>

        {/* Tab 1: Application Form */}
        {activeTab === 'form' && (
          <div className="clean-modal-body">
            {result?.success ? (
              <div className="modal-success-card animate-fade-in">
                <div className="success-icon-badge">
                  <CheckCircle2 size={46} className="text-royal" />
                </div>
                <h4>Admission Application Registered</h4>
                <div className="tracking-id-pill">
                  Application ID: <strong>{result.inquiryId}</strong>
                </div>
                <p className="success-instruction-text">
                  {result.message}
                </p>
                <div className="success-btns-row">
                  <button 
                    onClick={() => {
                      setResult(null);
                      setActiveTab('inquiries');
                      fetchInquiries();
                    }}
                    className="btn-primary-hero"
                  >
                    View in Database Portal
                  </button>
                  <button 
                    onClick={() => setResult(null)} 
                    className="btn-secondary-hero"
                  >
                    Submit Another Application
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="modal-admissions-form">
                {result?.success === false && (
                  <div className="form-feedback-alert feedback-error">
                    <AlertCircle size={18} />
                    <span>{result.message}</span>
                  </div>
                )}

                <div className="two-inputs-row">
                  <div className="form-field-group">
                    <label className="field-label" htmlFor="parentName">
                      <User size={13} /> Father / Guardian Name *
                    </label>
                    <input 
                      type="text" 
                      id="parentName"
                      name="parentName" 
                      value={formData.parentName}
                      onChange={handleChange}
                      placeholder="e.g. Tariq Mehmood" 
                      required 
                      className="clean-text-input"
                    />
                  </div>

                  <div className="form-field-group">
                    <label className="field-label" htmlFor="studentName">
                      <GraduationCap size={13} /> Student (Daughter's) Full Name *
                    </label>
                    <input 
                      type="text" 
                      id="studentName"
                      name="studentName" 
                      value={formData.studentName}
                      onChange={handleChange}
                      placeholder="e.g. Aiman Tariq" 
                      required 
                      className="clean-text-input"
                    />
                  </div>
                </div>

                <div className="two-inputs-row">
                  <div className="form-field-group">
                    <label className="field-label" htmlFor="email">
                      <Mail size={13} /> Email Address *
                    </label>
                    <input 
                      type="email" 
                      id="email"
                      name="email" 
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="tariq@example.com" 
                      required 
                      className="clean-text-input"
                    />
                  </div>

                  <div className="form-field-group">
                    <label className="field-label" htmlFor="phone">
                      <Phone size={13} /> Mobile / WhatsApp Number *
                    </label>
                    <input 
                      type="tel" 
                      id="phone"
                      name="phone" 
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+92 300 1234567" 
                      required 
                      className="clean-text-input"
                    />
                  </div>
                </div>

                <div className="two-inputs-row">
                  <div className="form-field-group">
                    <label className="field-label" htmlFor="gradeApplying">
                      <BookOpen size={13} /> Class / Grade Applying For *
                    </label>
                    <select 
                      id="gradeApplying"
                      name="gradeApplying" 
                      value={formData.gradeApplying}
                      onChange={handleChange}
                      className="clean-select-input"
                    >
                      <option value="Playgroup / Nursery (Early Years)">Playgroup / Nursery (Early Years)</option>
                      <option value="Prep (Montessori Advance)">Prep (Montessori Advance)</option>
                      <option value="Class 1 to 3 (Primary Wing)">Class 1 to 3 (Primary Wing)</option>
                      <option value="Class 4 to 5 (Primary Wing)">Class 4 to 5 (Primary Wing)</option>
                      <option value="Class 6 to 8 (Middle Wing)">Class 6 to 8 (Middle Wing)</option>
                      <option value="Class 9th (Matric Science - Bio/Math)">Class 9th (Matric Science - Bio/Math)</option>
                      <option value="Class 9th (Computer Science)">Class 9th (Computer Science)</option>
                      <option value="Class 10th (Matric Science)">Class 10th (Matric Science)</option>
                    </select>
                  </div>

                  <div className="form-field-group">
                    <label className="field-label" htmlFor="academicYear">
                      <Calendar size={13} /> Academic Term
                    </label>
                    <select 
                      id="academicYear"
                      name="academicYear" 
                      value={formData.academicYear}
                      onChange={handleChange}
                      className="clean-select-input"
                    >
                      <option value="Session 2026-2027 (New Admissions)">Session 2026–2027 (New Admissions)</option>
                      <option value="Mid-Term Transfer (2026)">Mid-Term Transfer (2026)</option>
                    </select>
                  </div>
                </div>

                <div className="form-field-group">
                  <label className="field-label" htmlFor="message">
                    Previous School, Remarks or Transport Inquiries
                  </label>
                  <textarea 
                    id="message"
                    name="message" 
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Enter previous school details, fee concession queries, or school van requests..." 
                    className="clean-textarea-input"
                    rows={3}
                  />
                </div>

                <div className="modal-footer-actions">
                  <p className="modal-note-text">
                    * Submitting saves this record to the Node.js backend. Our administration will contact you to schedule the interview.
                  </p>
                  <button 
                    type="submit" 
                    disabled={submitting} 
                    className="btn-submit-main"
                  >
                    {submitting ? (
                      <span>Saving to Server...</span>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>Submit Admission Application</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Tab 2: Live Inquiries from Node.js Backend */}
        {activeTab === 'inquiries' && (
          <div className="clean-modal-body">
            <div className="inquiries-panel-header">
              <div>
                <h4>Live Registered Applications (Node.js API)</h4>
                <p>Real-time records from <code>/api/inquiries</code></p>
              </div>
              <button 
                onClick={fetchInquiries} 
                className="btn-refresh-portal"
                disabled={loadingInquiries}
              >
                {loadingInquiries ? 'Refreshing...' : 'Refresh Records'}
              </button>
            </div>

            {loadingInquiries ? (
              <div className="inquiries-empty-state">Connecting to backend server...</div>
            ) : inquiries.length === 0 ? (
              <div className="inquiries-empty-state">No inquiries found in database yet.</div>
            ) : (
              <div className="inquiries-clean-list">
                {inquiries.map((inq) => (
                  <div key={inq.id} className="inquiry-record-card">
                    <div className="record-header">
                      <div className="record-id-tag">{inq.id}</div>
                      <span className="record-status-pill">{inq.status}</span>
                    </div>

                    <div className="record-grid">
                      <div>
                        <span className="rec-lbl">Student:</span>
                        <strong>{inq.studentName}</strong> ({inq.gradeApplying})
                      </div>
                      <div>
                        <span className="rec-lbl">Parent:</span>
                        <span>{inq.parentName}</span>
                      </div>
                      <div>
                        <span className="rec-lbl">Email:</span>
                        <span>{inq.email}</span>
                      </div>
                      <div>
                        <span className="rec-lbl">Phone:</span>
                        <span>{inq.phone}</span>
                      </div>
                    </div>

                    {inq.message && inq.message !== 'No additional comments' && (
                      <div className="record-note">
                        <span className="rec-lbl">Remarks:</span> "{inq.message}"
                      </div>
                    )}

                    <div className="record-footer">
                      <span>Submitted: {new Date(inq.submittedAt).toLocaleString()}</span>
                      <span>Term: {inq.academicYear}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
