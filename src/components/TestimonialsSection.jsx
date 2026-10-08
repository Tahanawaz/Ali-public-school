import React, { useState, useEffect } from 'react';
import { Star, MessageSquareQuote } from 'lucide-react';

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetch('/api/testimonials')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setTestimonials(data.data);
        }
      })
      .catch(err => console.warn('Testimonials fallback:', err));
  }, []);

  return (
    <section className="testimonials-clean-section">
      <div className="container">
        
        <div className="section-title-wrap reveal-up">
          <span className="section-pill-tag">
            <MessageSquareQuote size={13} /> Community Voices
          </span>
          <h2 className="section-heading-clean">
            Trusted by Generations of <span className="text-royal-gradient">Parents &amp; Alumni</span>
          </h2>
          <p className="section-subtext-clean">
            Hear from families and students whose academic and personal development was nurtured at Ali Public School for Girls.
          </p>
        </div>

        <div className="testimonials-clean-grid">
          {testimonials.map((t, idx) => (
            <div key={t.id} className={`testimonial-card-clean reveal-up stagger-${(idx % 3) + 1}`}>
              <div className="testimonial-stars-row">
                {[...Array(t.rating || 5)].map((_, i) => (
                  <Star key={i} size={15} fill="#f59e0b" color="#f59e0b" />
                ))}
              </div>

              <p className="testimonial-quote-text">"{t.text}"</p>

              <div className="testimonial-person-row">
                <div className="person-avatar-circle">{t.avatar}</div>
                <div className="person-info-col">
                  <h4 className="person-name">{t.name}</h4>
                  <span className="person-role">{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
