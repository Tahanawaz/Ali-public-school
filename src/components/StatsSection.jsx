import React, { useState, useEffect, useMemo } from 'react';
import { 
  Users, 
  UserCheck, 
  GraduationCap, 
  Building2, 
  Sparkles, 
  Award,
  TrendingUp,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';

const iconMap = {
  Users: Users,
  UserCheck: UserCheck,
  GraduationCap: GraduationCap,
  Building2: Building2,
  Sparkles: Sparkles,
  Award: Award
};

// Custom animated counter component
function AnimatedNumber({ target, suffix = '', prefix = '', duration = 2200 }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTime = null;
    let animationFrameId;

    const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = easeOutExpo(progress);
      const current = Math.floor(easedProgress * target);
      
      setDisplayValue(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setDisplayValue(target);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [target, duration]);

  // Format with commas (e.g. 2,000)
  const formatted = displayValue.toLocaleString();

  return (
    <span className="animated-counter-val">
      {prefix}{formatted}{suffix}
    </span>
  );
}

export default function StatsSection() {
  const defaultStats = useMemo(() => [
    { 
      id: 1,
      label: "Enrolled Students", 
      numericValue: 2000, 
      suffix: "+", 
      prefix: "",
      change: "Playgroup to BISE Matric Wing", 
      icon: "Users",
      highlight: "2,000+ Girls Empowered",
      percentage: 95,
      color: "#2563eb",
      badge: "Growing Community"
    },
    { 
      id: 2,
      label: "Qualified Teachers", 
      numericValue: 50, 
      suffix: "+", 
      prefix: "",
      change: "Certified female master educators", 
      icon: "UserCheck",
      highlight: "15:1 Mentorship Ratio",
      percentage: 92,
      color: "#16a34a",
      badge: "Female Faculty"
    },
    { 
      id: 3,
      label: "BISE Board Pass Rate", 
      numericValue: 100, 
      suffix: "%", 
      prefix: "",
      change: "Annual Distinctions & A+ Grades", 
      icon: "GraduationCap",
      highlight: "Unbroken 100% Track Record",
      percentage: 100,
      color: "#7c3aed",
      badge: "BISE Lahore"
    },
    { 
      id: 4,
      label: "Years of Academic Trust", 
      numericValue: 30, 
      suffix: "+", 
      prefix: "",
      change: "Pioneering education since 1995", 
      icon: "Award",
      highlight: "3 Decades of Honor",
      percentage: 90,
      color: "#d97706",
      badge: "Est. 1995"
    },
    { 
      id: 5,
      label: "Modern Labs & Classrooms", 
      numericValue: 35, 
      suffix: "+", 
      prefix: "",
      change: "Physics, Chem, Bio & IT Suites", 
      icon: "Building2",
      highlight: "Dedicated Practical Stations",
      percentage: 88,
      color: "#0284c7",
      badge: "Hi-Tech Campus"
    },
    { 
      id: 6,
      label: "Merit & Need Scholarships", 
      numericValue: 500, 
      suffix: "+", 
      prefix: "",
      change: "Deserving & orphan fee concessions", 
      icon: "Sparkles",
      highlight: "35% Average Fee Waivers",
      percentage: 85,
      color: "#e11d48",
      badge: "Social Impact"
    }
  ], []);

  const [stats, setStats] = useState(defaultStats);

  useEffect(() => {
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          // Merge API data with default enhanced structure
          const merged = defaultStats.map((def, idx) => {
            const apiItem = data.data[idx];
            if (!apiItem) return def;
            return {
              ...def,
              label: apiItem.numericValue ? (apiItem.label || def.label) : def.label,
              numericValue: apiItem.numericValue || def.numericValue,
              suffix: apiItem.suffix || def.suffix,
              change: apiItem.change || def.change,
              icon: apiItem.icon || def.icon
            };
          });
          setStats(merged);
        }
      })
      .catch(err => {
        console.warn('API /api/stats fallback:', err);
      });
  }, [defaultStats]);

  const triggerCelebration = (e) => {
    // Trigger small confetti burst
    try {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;

      confetti({
        particleCount: 45,
        spread: 60,
        origin: { x, y },
        colors: ['#2563eb', '#1d4ed8', '#16a34a', '#f59e0b', '#7c3aed']
      });
    } catch {
      // fallback safe
    }
  };

  return (
    <section className="stats-amount-showcase-section" id="milestones">
      {/* Background ambient lighting effects */}
      <div className="stats-ambient-glow stats-glow-1"></div>
      <div className="stats-ambient-glow stats-glow-2"></div>

      <div className="container">
        
        {/* Section Header */}
        <div className="stats-header-wrapper reveal-up">
          <div className="stats-pill-badge">
            <span className="stats-live-dot"></span>
            <Sparkles size={14} className="stats-pill-sparkle" />
            <span>Institutional Milestones &amp; Live Impact</span>
          </div>

          <h2 className="stats-main-heading">
            Excellence in Numbers: Nurturing Over{' '}
            <span className="text-royal-gradient text-shimmer-highlight">2,000+ Students</span> &amp;{' '}
            <span className="text-royal-gradient text-shimmer-highlight">50+ Master Faculty</span>
          </h2>

          <p className="stats-sub-description">
            For more than 30 years, Ali Public School for Girls has set high academic benchmarks with transparent, verified achievements in BISE board examinations, faculty excellence, and student empowerment.
          </p>

          <div className="stats-action-row">
            <div className="stats-verified-pill">
              <ShieldCheck size={14} className="text-emerald" />
              <span>Registered BISE Institution Verified</span>
            </div>
          </div>
        </div>

        {/* 6-Card Animated Amount Grid */}
        <div className="stats-cards-grid">
          {stats.map((item, idx) => {
            const Icon = iconMap[item.icon] || Sparkles;
            const staggerDelay = (idx * 0.12).toFixed(2);

            return (
              <div 
                key={item.id} 
                className={`stat-card-animated reveal-up stagger-${idx + 1}`}
                style={{ animationDelay: `${staggerDelay}s` }}
                onClick={triggerCelebration}
                title="Click to celebrate this achievement!"
              >
                {/* Glow border gradient backdrop */}
                <div className="stat-card-border-glow"></div>

                <div className="stat-card-inner">
                  {/* Top Bar inside card */}
                  <div className="stat-card-top">
                    <div className="stat-icon-wrapper" style={{ color: item.color }}>
                      <Icon size={24} className="stat-lucide-icon" />
                    </div>
                    <span className="stat-mini-pill" style={{ color: item.color, borderColor: `${item.color}33`, background: `${item.color}0f` }}>
                      {item.badge}
                    </span>
                  </div>

                  {/* Main Animated Amount Value */}
                  <div className="stat-counter-box">
                    <AnimatedNumber 
                      target={item.numericValue} 
                      suffix={item.suffix} 
                      prefix={item.prefix}
                      duration={2000 + idx * 200}
                    />
                  </div>

                  {/* Metric Title & Description */}
                  <h3 className="stat-label-text">{item.label}</h3>
                  <p className="stat-desc-text">{item.change}</p>

                  {/* Interactive Progress Bar */}
                  <div className="stat-progress-track">
                    <div 
                      className="stat-progress-fill" 
                      style={{ 
                        width: `${item.percentage}%`,
                        backgroundColor: item.color,
                        transition: `width ${1.8 + idx * 0.2}s cubic-bezier(0.16, 1, 0.3, 1)`
                      }}
                    ></div>
                  </div>

                  {/* Highlight Footer */}
                  <div className="stat-card-footer">
                    <span className="stat-highlight-tag">
                      <CheckCircle2 size={13} className="text-emerald" />
                      <span>{item.highlight}</span>
                    </span>
                    <TrendingUp size={14} className="stat-trend-icon" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust Highlight Banner below stats */}
        <div className="stats-trust-banner reveal-up">
          <div className="stats-trust-item">
            <span className="trust-bullet-icon">🏆</span>
            <div>
              <strong>100% Board Pass Rate:</strong> Consistently achieving A+ grades in BISE Lahore Matric examinations.
            </div>
          </div>
          <div className="stats-trust-separator"></div>
          <div className="stats-trust-item">
            <span className="trust-bullet-icon">👩‍🏫</span>
            <div>
              <strong>50+ Certified Educators:</strong> 100% qualified female faculty ensuring personalized academic care.
            </div>
          </div>
          <div className="stats-trust-separator"></div>
          <div className="stats-trust-item">
            <span className="trust-bullet-icon">🎓</span>
            <div>
              <strong>2,000+ Enrolled Students:</strong> Safe, disciplined, and nurturing environment for girls from Nursery to Grade 10.
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
