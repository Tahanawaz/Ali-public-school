import React from 'react';
import { 
  Building2, 
  Cpu, 
  BookOpen, 
  Trophy, 
  CheckCircle2, 
  ShieldCheck 
} from 'lucide-react';

export default function CampusLife() {
  const facilities = [
    {
      id: "science-lab",
      name: "Fatima Jinnah Science & Practical Laboratories",
      category: "Physics, Chemistry & Biology",
      icon: Cpu,
      stats: "Fully Equipped Practical Suites • Certified Apparatus",
      description: "Dedicated science labs designed specifically for matriculation syllabus experiments, equipped with compound optical microscopes, safe chemical reagent benches, and circuit boards.",
      features: [
        "Individual student test workstations",
        "Strict lab safety standards & protective equipment",
        "Supervised by experienced female science demonstrators"
      ]
    },
    {
      id: "it-lab",
      name: "Digital IT & Computer Science Learning Hub",
      category: "Computer Studies & Coding",
      icon: Building2,
      stats: "Modern Workstations • High-Speed Connectivity",
      description: "A modern, climate-controlled computer laboratory providing girls with essential hands-on software skills, programming fundamentals, office suites, and monitored educational internet access.",
      features: [
        "1:1 dedicated computer workstation for each student in lab hours",
        "Interactive smart projection for programming demonstrations",
        "Safe, filtered broadband access for curriculum research"
      ]
    },
    {
      id: "library-reading",
      name: "Central Academic Library & Reading Hall",
      category: "Research, Literature & Tarbiyah",
      icon: BookOpen,
      stats: "8,500+ Reference Volumes • Board Past Papers",
      description: "A serene, naturally lit study sanctuary housing board past papers, reference books in sciences and humanities, Urdu & English classic literature, and Islamic biographical texts.",
      features: [
        "Comprehensive board syllabus references & solved model papers",
        "Quiet personal study desks and group reading circles",
        "Bilingual collection of children's and young adult literature"
      ]
    },
    {
      id: "sports-health",
      name: "Indoor Sports & Physical Fitness Courtyard",
      category: "Physical Fitness & Assembly",
      icon: Trophy,
      stats: "Covered Private Assembly Ground • Badminton & TT",
      description: "Promoting physical health, teamwork, and sportsmanship in an entirely secure, secluded campus setting with morning exercises, badminton tournaments, and annual sports days.",
      features: [
        "Secure covered quadrangle for morning assembly and drill",
        "Badminton courts, table tennis tables, and track events",
        "Annual sports championship with trophies and certificates"
      ]
    }
  ];

  return (
    <section className="facilities-clean-section" id="facilities">
      <div className="container">
        
        <div className="section-title-wrap reveal-up">
          <span className="section-pill-tag">
            <Building2 size={13} /> Infrastructure
          </span>
          <h2 className="section-heading-clean">
            Purpose-Built Facilities for <span className="text-royal-gradient">Comprehensive Learning</span>
          </h2>
          <p className="section-subtext-clean">
            Our campus is specifically engineered to provide girls with a safe, dignified, and fully equipped academic environment.
          </p>
        </div>

        <div className="facilities-clean-grid">
          {facilities.map((fac, idx) => {
            const Icon = fac.icon;
            return (
              <div key={fac.id} className={`clean-facility-card reveal-up stagger-${(idx % 4) + 1}`}>
                <div className="card-top-header">
                  <div className="card-icon-box">
                    <Icon size={22} />
                  </div>
                  <span className="card-category-tag">{fac.category}</span>
                </div>

                <h3 className="card-facility-title">{fac.name}</h3>
                <div className="card-facility-specs">{fac.stats}</div>
                <p className="card-facility-desc">{fac.description}</p>

                <div className="card-facility-bullets">
                  {fac.features.map((feat, i) => (
                    <div key={i} className="bullet-row">
                      <CheckCircle2 size={15} className="bullet-check" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="card-facility-footer">
                  <span className="footer-tag">Campus Tour Available</span>
                  <ShieldCheck size={16} className="text-royal" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
