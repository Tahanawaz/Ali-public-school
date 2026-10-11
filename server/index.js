import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;
const ADMIN_API_KEY = process.env.ADMIN_API_KEY;
const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim());

app.disable('x-powered-by');
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Origin is not allowed by CORS'));
  }
}));
app.use(express.json({ limit: '20kb' }));
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

const submissionWindows = new Map();
const submissionLimiter = (req, res, next) => {
  const now = Date.now();
  const key = req.ip;
  const recent = (submissionWindows.get(key) || []).filter((time) => now - time < 10 * 60 * 1000);
  if (recent.length >= 8) {
    return res.status(429).json({ success: false, message: 'Too many submissions. Please try again in a few minutes.' });
  }
  recent.push(now);
  submissionWindows.set(key, recent);
  next();
};

const cleanText = (value, maxLength = 200) => typeof value === 'string'
  ? value.trim().replace(/\s+/g, ' ').slice(0, maxLength)
  : '';
const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

// In-memory database with pre-populated records for Ali Public School
const schoolData = {
  profile: {
    name: "Ali Public School for Girls (Regd.)",
    shortName: "APS",
    urduName: "علی پبلک سکول",
    registrationNo: "APS-REG-4892",
    motto: "Knowledge • Character • Empowerment",
    established: 1995,
    accreditation: "Registered Board of Intermediate and Secondary Education (BISE)",
    contact: {
      phone: "+92 (42) 3588-4100 / +92 (300) 948-2341",
      email: "admissions@alipublicschool.edu.pk",
      address: "Main Education Campus, Block B, Model Town / Canal Road, Lahore",
      officeHours: "Monday - Saturday: 7:45 AM - 2:30 PM",
      principal: "Begum Farzana Ali (M.A., M.Ed.)"
    },
    socialLinks: {
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      youtube: "https://youtube.com"
    }
  },
  stats: [
    { label: "Enrolled Students", value: "2,000+", numericValue: 2000, suffix: "+", change: "Playgroup to Matric Wing", icon: "Users", color: "#2563eb" },
    { label: "Qualified Teachers", value: "50+", numericValue: 50, suffix: "+", change: "Certified master female faculty", icon: "UserCheck", color: "#16a34a" },
    { label: "BISE Board Success", value: "100%", numericValue: 100, suffix: "%", change: "Distinctions & A+ Grades", icon: "GraduationCap", color: "#7c3aed" },
    { label: "Years of Excellence", value: "30+", numericValue: 30, suffix: "+", change: "Academic trust since 1995", icon: "Award", color: "#d97706" },
    { label: "Modern Classrooms & Labs", value: "35+", numericValue: 35, suffix: "+", change: "Science, IT & Multimedia blocks", icon: "Building2", color: "#0284c7" },
    { label: "Merit Scholarships", value: "500+", numericValue: 500, suffix: "+", change: "Deserving & orphan fee waivers", icon: "Sparkles", color: "#e11d48" }
  ],
  programs: [
    {
      id: "kindergarten-montessori",
      title: "Early Montessori & Kindergarten",
      grades: "Playgroup to Prep",
      ageRange: "Ages 3 - 5",
      tagline: "A nurturing, safe, and joyful introduction to phonics, numerals, Islamic values, and creative play.",
      highlights: [
        "Activity-based sensory learning and phonics foundations",
        "Safe, climate-controlled colorful kindergarten activity suites",
        "Early habit formation, moral etiquette & storytelling",
        "Small cohort sizes with caring certified female educators"
      ],
      badge: "Early Childhood"
    },
    {
      id: "primary-wing",
      title: "Primary Academic Wing",
      grades: "Grade 1 to Grade 5",
      ageRange: "Ages 6 - 10",
      tagline: "Solidifying reading comprehension, mathematical confidence, bilingual fluency, and scientific curiosity.",
      highlights: [
        "Rigorous English, Urdu, Mathematics, and General Science core",
        "Hands-on Junior Computer Lab with digital literacy",
        "Tajweed & Nazra Quran with essential Tarbiyah studies",
        "Annual arts exhibition, mental arithmetic, and sports day"
      ],
      badge: "Primary Foundation"
    },
    {
      id: "middle-school",
      title: "Middle School Wing",
      grades: "Grade 6 to Grade 8",
      ageRange: "Ages 11 - 13",
      tagline: "Cultivating analytical rigor, logical thinking, public speaking, and leadership confidence.",
      highlights: [
        "Pre-Matriculation foundational coursework in Physics, Chemistry & Biology",
        "Modern IT training: Coding fundamentals, Scratch & office productivity",
        "Bilingual Parliamentary Debate Club (Urdu & English)",
        "Inter-house sports competitions (Badminton, Table Tennis, Athletics)"
      ],
      badge: "Middle Years"
    },
    {
      id: "matric-high",
      title: "Senior High & Matriculation (BISE)",
      grades: "Grade 9 to Grade 10 (Science & Arts)",
      ageRange: "Ages 14 - 16",
      tagline: "Guaranteed Board preparation, full practical laboratory syllabus, and distinction mentorship.",
      highlights: [
        "Pure Science Group (Biology / Physics / Chemistry / Math)",
        "Computer Science Group (Modern Programming & Computer Systems)",
        "Daily revision drills, past-paper workshops, and mock examinations",
        "Individual career counseling and college admissions orientation"
      ],
      badge: "Matric Science & CS"
    }
  ],
  announcements: [
    {
      id: "ann-1",
      title: "Admissions Open for Session 2026-2027",
      category: "Admissions",
      date: "October 01, 2026",
      urgent: true,
      summary: "Registration forms are now available for Playgroup, Nursery, Primary, and Class 9th (Science / Computer Science)."
    },
    {
      id: "ann-2",
      title: "Outstanding BISE Board Matriculation Results",
      category: "Academic Honours",
      date: "September 20, 2026",
      urgent: false,
      summary: "Ali Public School students achieved a 100% overall pass rate with 84% students securing A+ Grade."
    },
    {
      id: "ann-3",
      title: "Annual Qirat, Naat & Bilingual Speech Contest",
      category: "Co-Curricular",
      date: "October 25, 2026",
      urgent: false,
      summary: "Inter-school championship with certificates and gold medals awarded by distinguished guest scholars."
    },
    {
      id: "ann-4",
      title: "State-of-the-Art Digital Smart Lab Inauguration",
      category: "Campus Upgrade",
      date: "September 10, 2026",
      urgent: false,
      summary: "New modern computer lab equipped with high-speed internet and interactive smart boards for senior classes."
    }
  ],
  events: [
    {
      id: "ev-1",
      title: "Admissions Open House & Campus Guided Tour",
      date: "Oct 15, 2026",
      time: "09:00 AM - 1:00 PM",
      location: "Main Auditorium & Primary Wing",
      type: "Prospective Parents",
      seatsLeft: 45
    },
    {
      id: "ev-2",
      title: "Annual Science, Art & Heritage Exhibition",
      date: "Nov 08, 2026",
      time: "10:00 AM - 3:00 PM",
      location: "APS Senior Science Block",
      type: "School Exhibition",
      seatsLeft: 150
    },
    {
      id: "ev-3",
      title: "Parent-Teacher Term Evaluation Meeting (PTM)",
      date: "Nov 22, 2026",
      time: "08:30 AM - 1:30 PM",
      location: "All Classrooms & Academic Office",
      type: "Academic Review",
      seatsLeft: 0
    },
    {
      id: "ev-4",
      title: "Annual Sports Day & Prize Distribution",
      date: "Dec 18, 2026",
      time: "09:30 AM - 2:00 PM",
      location: "APS Sports Grounds",
      type: "Athletics & Honors",
      seatsLeft: 100
    }
  ],
  faculty: [
    {
      id: "fac-1",
      name: "Begum Farzana Ali",
      role: "Head of School & Principal",
      department: "Administration & Leadership",
      degree: "M.A. English Literature, M.Ed. (Punjab University)",
      experience: "28+ Years",
      quote: "Educating a girl is illuminating an entire generation with wisdom, dignity, and faith."
    },
    {
      id: "fac-2",
      name: "Dr. Samina Kausar",
      role: "Vice Principal & Head of Science",
      department: "Biology & Chemistry",
      degree: "Ph.D. Biochemistry (QAU)",
      experience: "19 Years",
      quote: "Our laboratories train young women to question, experiment, and pioneer scientific solutions."
    },
    {
      id: "fac-3",
      name: "Mrs. Nighat Sultana",
      role: "Senior Academic Coordinator",
      department: "Mathematics & Physics",
      degree: "M.Sc. Applied Mathematics",
      experience: "16 Years",
      quote: "Conceptual clarity and consistent practice turn difficult equations into pure confidence."
    },
    {
      id: "fac-4",
      name: "Ms. Ayesha Siddiqa",
      role: "Head of Computer Science & Robotics",
      department: "Information Technology",
      degree: "MS Computer Science (FAST-NUCES)",
      experience: "11 Years",
      quote: "Equipping our girls with coding and software fluency prepares them to lead the digital era."
    }
  ],
  testimonials: [
    {
      id: "t-1",
      name: "Muhammad Rashid & Family",
      role: "Parents of Fatima (Matric Science Topper)",
      avatar: "MR",
      text: "The moral atmosphere and academic standard at Ali Public School is unparalleled. My daughter secured 1060 marks in BISE exams thanks to the tireless guidance of her teachers.",
      rating: 5
    },
    {
      id: "t-2",
      name: "Dr. Hina Tariq",
      role: "Alumna (Doctor of Medicine, KEMU)",
      avatar: "HT",
      text: "Ali Public School gave me the foundation, discipline, and belief that women can achieve greatness in science and medicine. I am forever grateful to Begum Farzana and all our mentors.",
      rating: 5
    },
    {
      id: "t-3",
      name: "Zainab Malik",
      role: "Head Girl (Class 10th - Science)",
      avatar: "ZM",
      text: "APS provides us with a secure, inspiring campus where we can excel in our academics, win national debate trophies, and grow into confident leaders.",
      rating: 5
    }
  ],
  inquiries: [
    {
      id: "APS-2001",
      parentName: "Tariq Mehmood",
      email: "tariq.mehmood@example.com",
      phone: "+92 301 4567890",
      studentName: "Aiman Tariq",
      gradeApplying: "Class 9th (Matric Science)",
      academicYear: "2026-2027",
      message: "Interested in the pre-medical track with biology laboratory focus.",
      submittedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      status: "Interview Scheduled"
    },
    {
      id: "APS-2002",
      parentName: "Khadija Bibi",
      email: "khadija.b@example.com",
      phone: "+92 321 9876543",
      studentName: "Noor Fatima",
      gradeApplying: "Grade 1 (Primary)",
      academicYear: "2026-2027",
      message: "Seeking admission for new session; need details on school transport facility.",
      submittedAt: new Date(Date.now() - 86400000).toISOString(),
      status: "Application Reviewed"
    }
  ],
  messages: []
};

// Routes
// 1. School Profile & Stats
app.get('/api/profile', (req, res) => {
  res.json({ success: true, data: schoolData.profile });
});

app.get('/api/stats', (req, res) => {
  res.json({ success: true, data: schoolData.stats });
});

// 2. Programs / Curriculum
app.get('/api/programs', (req, res) => {
  res.json({ success: true, data: schoolData.programs });
});

// 3. Announcements
app.get('/api/announcements', (req, res) => {
  res.json({ success: true, data: schoolData.announcements });
});

// 4. Events
app.get('/api/events', (req, res) => {
  res.json({ success: true, data: schoolData.events });
});

// 5. Faculty
app.get('/api/faculty', (req, res) => {
  res.json({ success: true, data: schoolData.faculty });
});

// 6. Testimonials
app.get('/api/testimonials', (req, res) => {
  res.json({ success: true, data: schoolData.testimonials });
});

// 7. Admissions Inquiry Submission
app.get('/api/inquiries', (req, res) => {
  if (!ADMIN_API_KEY || req.get('x-admin-key') !== ADMIN_API_KEY) {
    return res.status(401).json({ success: false, message: 'Administrator authentication required.' });
  }
  res.json({ 
    success: true, 
    total: schoolData.inquiries.length,
    data: schoolData.inquiries 
  });
});

app.post('/api/inquiries', submissionLimiter, (req, res) => {
  const parentName = cleanText(req.body.parentName, 80);
  const email = cleanText(req.body.email, 120).toLowerCase();
  const phone = cleanText(req.body.phone, 24);
  const studentName = cleanText(req.body.studentName, 80);
  const gradeApplying = cleanText(req.body.gradeApplying, 80);
  const academicYear = cleanText(req.body.academicYear, 60);
  const message = cleanText(req.body.message, 500);

  if (!parentName || !isEmail(email) || !phone || !studentName || !gradeApplying) {
    return res.status(400).json({
      success: false,
      message: 'Please provide valid parent, student, email, phone, and grade details.'
    });
  }

  const newInquiry = {
    id: `APS-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`,
    parentName,
    email,
    phone: phone || "Not provided",
    studentName,
    gradeApplying,
    academicYear: academicYear || "2026-2027",
    message: message || "No additional comments",
    submittedAt: new Date().toISOString(),
    status: "Received - Admissions Office Notified"
  };

  schoolData.inquiries.unshift(newInquiry);

  res.status(201).json({
    success: true,
    message: "Admissions inquiry submitted successfully to Ali Public School! Our office will contact you within 24 hours.",
    data: newInquiry
  });
});

app.post('/api/events/:eventId/rsvp', submissionLimiter, (req, res) => {
  const event = schoolData.events.find((item) => item.id === req.params.eventId);
  if (!event) return res.status(404).json({ success: false, message: 'Event not found.' });
  if (event.seatsLeft <= 0) return res.status(409).json({ success: false, message: 'Registration is closed for this event.' });

  event.seatsLeft -= 1;
  return res.json({
    success: true,
    message: 'Your visitor pass has been reserved for this demo session.',
    data: { eventId: event.id, seatsLeft: event.seatsLeft }
  });
});

// 8. Contact message
app.post('/api/contact', submissionLimiter, (req, res) => {
  const name = cleanText(req.body.name, 80);
  const email = cleanText(req.body.email, 120).toLowerCase();
  const subject = cleanText(req.body.subject, 100);
  const message = cleanText(req.body.message, 800);
  if (!name || !isEmail(email) || !message) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid name, email address, and message.'
    });
  }

  const newMessage = {
    id: `MSG-${Date.now()}`,
    name,
    email,
    subject: subject || "General Inquiry",
    message,
    receivedAt: new Date().toISOString()
  };

  schoolData.messages.push(newMessage);

  res.json({
    success: true,
    message: "Thank you for contacting Ali Public School for Girls. We have received your query.",
    data: newMessage
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: "online",
    school: schoolData.profile.name,
    timestamp: new Date().toISOString(),
    version: "1.0.0"
  });
});

app.listen(PORT, () => {
  console.log(`[APS Backend] Express API server running on http://localhost:${PORT}`);
});
