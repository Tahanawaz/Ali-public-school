import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  Award, 
  Mail
} from 'lucide-react';

export default function FacultySection() {
  const [faculty, setFaculty] = useState([]);

  useEffect(() => {
    fetch('/api/faculty')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setFaculty(data.data);
        }
      })
      .catch(err => console.warn('Faculty fallback:', err));
  }, []);

  return (
    <section className="faculty-clean-section" id="faculty">
      <div className="container">
        
        <div className="section-title-wrap reveal-up">
          <span className="section-pill-tag">
            <GraduationCap size={13} /> Academic Leadership
          </span>
          <h2 className="section-heading-clean">
            Guided by Experienced &amp; <span className="text-royal-gradient">Dedicated Female Faculty</span>
          </h2>
          <p className="section-subtext-clean">
            Our teachers bring decades of certified pedagogical experience, subject-matter mastery, and compassionate moral guidance to every classroom.
          </p>
        </div>

        <div className="faculty-clean-grid">
          {faculty.map((member, idx) => (
            <div key={member.id} className={`faculty-clean-card reveal-up stagger-${(idx % 4) + 1}`}>
              <div className="faculty-card-header">
                <div className="faculty-avatar-circle-clean">
                  <span>{member.name.replace('Begum ', '').replace('Dr. ', '').replace('Mrs. ', '').replace('Ms. ', '').split(' ').map(n => n[0]).join('').slice(0, 2)}</span>
                </div>
                <span className="faculty-dept-badge">{member.department}</span>
              </div>

              <h3 className="faculty-name-clean">{member.name}</h3>
              <div className="faculty-role-clean">{member.role}</div>

              <div className="faculty-qualification-clean">
                <Award size={14} className="text-royal" />
                <span>{member.degree}</span>
              </div>

              <blockquote className="faculty-quote-clean">
                <p>"{member.quote}"</p>
              </blockquote>

              <div className="faculty-footer-clean">
                <span className="experience-tag">{member.experience} Teaching</span>
                <span className="contact-dept-tag">
                  <Mail size={13} /> Contact Dept
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
