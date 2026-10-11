import React, { useState, useEffect, useMemo } from 'react';
import { 
  GraduationCap, 
  ArrowRight, 
  Layers,
  CheckCircle2
} from 'lucide-react';

export default function ProgramsSection({ onOpenAdmissions }) {
  const [programs, setPrograms] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

  const defaultPrograms = useMemo(() => [
    {
      id: "kindergarten-montessori",
      title: "Early Montessori & Kindergarten",
      grades: "Playgroup to Prep",
      ageRange: "Ages 3 – 5",
      tagline: "A gentle, stimulating introduction to reading phonics, numeracy, Islamic moral values, and creative exploration.",
      highlights: [
        "Sensory, activity-driven Montessori learning tools",
        "Safe, climate-controlled junior activity classrooms",
        "Foundational phonics, basic numerals & story sessions",
        "Individual nurturing attention by trained female educators"
      ],
      badge: "Early Years"
    },
    {
      id: "primary-wing",
      title: "Primary Academic Wing",
      grades: "Grade 1 to Grade 5",
      ageRange: "Ages 6 – 10",
      tagline: "Building core fluency in English, Urdu, Mathematics, and General Science alongside strong character development.",
      highlights: [
        "Comprehensive bilingual syllabus with clear conceptual drills",
        "Junior Computer Science & interactive digital literacy",
        "Daily Tajweed, Nazra Quran and moral etiquette (Tarbiyah)",
        "Annual science projects, handwriting contests, and sports"
      ],
      badge: "Primary Wing"
    },
    {
      id: "middle-school",
      title: "Middle School Wing",
      grades: "Grade 6 to Grade 8",
      ageRange: "Ages 11 – 13",
      tagline: "Cultivating analytical thinking, practical science skills, English and Urdu debate eloquence, and leadership.",
      highlights: [
        "Early preparation for Matriculation Physics, Chemistry & Biology",
        "Computer programming foundations (Scratch, basic logic, IT)",
        "Inter-house sports, badminton, table tennis & athletics",
        "Debating society, creative writing and speech declamations"
      ],
      badge: "Middle Years"
    },
    {
      id: "matric-high",
      title: "Senior Matriculation Wing (BISE)",
      grades: "Class 9th & 10th (Science / Computer)",
      ageRange: "Ages 14 – 16",
      tagline: "Rigorous preparation for Board examinations with 100% practical lab syllabus coverage and distinction counseling.",
      highlights: [
        "Pure Science Group (Biology, Physics, Chemistry & Math)",
        "Computer Science Group (Modern Programming & Computer Systems)",
        "Daily revision tests, past-paper workshops, and mock exams",
        "Personalized career guidance for Pre-Medical & Pre-Engineering"
      ],
      badge: "Matric Science & CS"
    }
  ], []);

  useEffect(() => {
    fetch('/api/programs')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data && data.data.length > 0) {
          setPrograms(data.data);
        } else {
          setPrograms(defaultPrograms);
        }
      })
      .catch(() => {
        setPrograms(defaultPrograms);
      });
  }, [defaultPrograms]);

  const programList = programs.length > 0 ? programs : defaultPrograms;
  const currentProgram = programList[activeTab] || defaultPrograms[0];

  return (
    <section className="programs-clean-section" id="academics">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-title-wrap reveal-up">
          <span className="section-pill-tag">
            <Layers size={13} /> Academic Continuum
          </span>
          <h2 className="section-heading-clean">
            Structured Pathways from <span className="text-royal-gradient">Montessori to Matriculation</span>
          </h2>
          <p className="section-subtext-clean">
            Our curriculum balances government BISE standards with modern science laboratories, computer fluency, and ethical values.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="program-tabs-row reveal-up stagger-1">
          {programList.map((prog, idx) => (
            <button
              key={prog.id}
              onClick={() => setActiveTab(idx)}
              className={`clean-tab-btn ${activeTab === idx ? 'tab-btn-selected' : ''}`}
            >
              <span className="tab-pill-badge">{prog.badge}</span>
              <span className="tab-main-name">{prog.title}</span>
              <span className="tab-sub-grades">{prog.grades}</span>
            </button>
          ))}
        </div>

        {/* Selected Program Showcase Card */}
        {currentProgram && (
          <div className="program-spotlight-box animate-fade-in reveal-up stagger-2">
            <div className="spotlight-left-content">
              <div className="spotlight-tag-row">
                <span className="meta-pill-blue">{currentProgram.ageRange}</span>
                <span className="meta-pill-navy">{currentProgram.grades}</span>
              </div>

              <h3 className="spotlight-program-title">{currentProgram.title}</h3>
              <p className="spotlight-program-tagline">{currentProgram.tagline}</p>

              <div className="features-checklist-block">
                <h4 className="checklist-heading">Curriculum &amp; Learning Highlights</h4>
                <div className="checklist-grid">
                  {currentProgram.highlights.map((item, i) => (
                    <div key={i} className="checklist-item">
                      <CheckCircle2 size={16} className="checklist-check-icon" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="spotlight-actions-row">
                <button 
                  onClick={onOpenAdmissions}
                  className="btn-primary-hero"
                >
                  <GraduationCap size={17} />
                  <span>Apply for {currentProgram.grades}</span>
                </button>
                <a href="#contact" className="btn-secondary-hero">
                  <span>Inquire with Coordinator</span>
                  <ArrowRight size={15} />
                </a>
              </div>
            </div>

            <div className="spotlight-right-sidebar">
              <div className="sidebar-card-clean">
                <h4 className="sidebar-title">Academic Standards</h4>
                
                <div className="sidebar-stat-row">
                  <div className="sidebar-stat">
                    <span className="sidebar-val">100%</span>
                    <span className="sidebar-lbl">Board Success Rate</span>
                  </div>
                  <div className="sidebar-stat">
                    <span className="sidebar-val">15 : 1</span>
                    <span className="sidebar-lbl">Student-Faculty Ratio</span>
                  </div>
                </div>

                <div className="sidebar-detail-list">
                  <div className="sidebar-detail-item">
                    <strong>Affiliation:</strong> BISE Lahore (Registered)
                  </div>
                  <div className="sidebar-detail-item">
                    <strong>Medium:</strong> English &amp; Urdu Bilingual
                  </div>
                  <div className="sidebar-detail-item">
                    <strong>Faculty:</strong> 100% Certified Female Teachers
                  </div>
                </div>

                <div className="sidebar-quote-pill">
                  "Empowering young women through character building, academic excellence, and modern skills."
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
