# Ali Public School for Girls — Digital School Experience

A presentation-ready full-stack school website built with a **React** frontend and a **Node.js (Express)** API. It demonstrates the public school experience, online admissions, campus information, events, and inquiry handling.

---

## 🏛️ Features

### Frontend (React.js + Vanilla CSS)
- **Prestigious Academic Branding**: Custom vector SVG crest, gold & obsidian palette, Google Fonts (`Cinzel`, `Playfair Display`, `Plus Jakarta Sans`).
- **Hero Section**: High-impact typography, trust badges, floating real-time metrics, and direct application CTAs.
- **Dynamic Stats Grid**: Key institutional metrics synchronized with the Node.js backend.
- **Comprehensive Academic Continuum**: Interactive tabs for Early Explorers (Pre-K - 2), Primary Excellence (3 - 5), Middle School STEM (6 - 8), and Senior High / IB Diploma.
- **Campus Life & Facilities**: 45-acre campus showcase featuring the Turing AI & Robotics Pavilion, Vance Arts Conservatory, and Aquatics Complex.
- **Events & Announcements**: Real-time news bulletin with interactive event pass reservation (RSVP).
- **Faculty Directory**: Showcase of educators with academic credentials from Oxford, MIT, and Columbia.
- **Testimonials**: Authentic reviews from parents, student council leaders, and alumni.
- **Online Admissions Portal**: Accessible, privacy-conscious application flow with a trackable confirmation receipt.
- **Contact & Inquiries**: Working contact form communicating with the Node.js API.

### Backend (Node.js + Express)
- `GET /api/profile` - School identity, accreditation, and administrative contact
- `GET /api/stats` - Institutional metrics and statistics
- `GET /api/programs` - Academic curriculum levels and learning highlights
- `GET /api/announcements` - Latest news notices and urgency flags
- `GET /api/events` - Upcoming tour dates, events, and seat availability
- `GET /api/faculty` - Faculty member credentials and quotes
- `GET /api/testimonials` - Reviews from students and parents
- `GET /api/inquiries` - Protected administrator-only list (requires `ADMIN_API_KEY` and `x-admin-key`)
- `POST /api/inquiries` - Submit a new student application with validation & auto ID generation
- `POST /api/events/:eventId/rsvp` - Reserve an available visitor pass
- `POST /api/contact` - Route general contact messages
- `GET /api/health` - Server status and uptime health check

---

## 🚀 Running the Project

Start both the backend API and frontend simultaneously:

```bash
npm run dev
```

- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:5000](http://localhost:5000)

### Individual Commands
```bash
npm run dev:client  # Run only Vite React frontend
npm run dev:server  # Run only Node.js Express server
npm run build       # Build production bundle
npm run check       # Run lint checks and production build
```

## Demo configuration

- Public form submissions are kept in memory and reset whenever the API restarts.
- Set `ADMIN_API_KEY` before starting the server to enable authenticated access to admission records.
- Set `ALLOWED_ORIGINS` to a comma-separated list of trusted frontend origins in production.
- All institutional claims, contact details, statistics, and testimonials should be verified by school management before launch.

## Vercel deployment

The repository includes a Vercel serverless entry point and routing configuration. Deploy the project root with the Vite framework preset; `vercel.json` sends `/api/*` requests to the Express function and all remaining routes to the React application.

For a custom production domain, add its full origin (for example `https://school.example.com`) to the `ALLOWED_ORIGINS` environment variable in Vercel. Preview and standard `*.vercel.app` deployment origins are accepted automatically.
