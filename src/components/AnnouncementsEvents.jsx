import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  Calendar as CalendarIcon, 
  MapPin, 
  Clock, 
  ArrowUpRight, 
  CheckCircle,
  FileText
} from 'lucide-react';

export default function AnnouncementsEvents({ onOpenAdmissions }) {
  const [announcements, setAnnouncements] = useState([]);
  const [events, setEvents] = useState([]);
  const [rsvpState, setRsvpState] = useState({});

  useEffect(() => {
    fetch('/api/announcements')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setAnnouncements(data.data);
        }
      })
      .catch(err => console.warn('Announcements fallback:', err));

    fetch('/api/events')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setEvents(data.data);
        }
      })
      .catch(err => console.warn('Events fallback:', err));
  }, []);

  const handleRSVP = (eventId) => {
    setRsvpState(prev => ({
      ...prev,
      [eventId]: true
    }));
  };

  return (
    <section className="notices-clean-section" id="notices">
      <div className="container">
        
        <div className="section-title-wrap reveal-up">
          <span className="section-pill-tag">
            <Bell size={13} /> Official Bulletins
          </span>
          <h2 className="section-heading-clean">
            Notice Board &amp; <span className="text-royal-gradient">Campus Calendar</span>
          </h2>
          <p className="section-subtext-clean">
            Stay informed with verified academic notices, board exam timetables, admissions announcements, and school events.
          </p>
        </div>

        <div className="notices-two-col-layout reveal-up stagger-1">
          
          {/* Left Column: Official Notices */}
          <div className="notices-column">
            <div className="column-header-bar">
              <div className="column-title-item">
                <Bell size={18} className="text-royal" />
                <h3>Official School Notices</h3>
              </div>
              <span className="live-badge-pill">Live Feed</span>
            </div>

            <div className="notices-card-stack">
              {announcements.map((ann) => (
                <div 
                  key={ann.id} 
                  className={`notice-card-clean ${ann.urgent ? 'notice-card-urgent' : ''}`}
                >
                  <div className="notice-meta-row">
                    <span className="notice-date-text">{ann.date}</span>
                    <span className={`category-tag ${ann.urgent ? 'tag-red' : 'tag-blue'}`}>
                      {ann.category}
                    </span>
                  </div>

                  <h4 className="notice-card-title">{ann.title}</h4>
                  <p className="notice-card-desc">{ann.summary}</p>

                  <div className="notice-footer-row">
                    {ann.category === 'Admissions' ? (
                      <button onClick={onOpenAdmissions} className="btn-link-action">
                        <span>Admissions Portal</span>
                        <ArrowUpRight size={14} />
                      </button>
                    ) : (
                      <span className="notice-office-tag">Verified by Principal's Office</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Events Calendar */}
          <div className="events-column">
            <div className="column-header-bar">
              <div className="column-title-item">
                <CalendarIcon size={18} className="text-royal" />
                <h3>Upcoming School Events</h3>
              </div>
              <span className="calendar-status-pill">Parents Welcome</span>
            </div>

            <div className="events-card-stack">
              {events.map((ev) => {
                const isRsvpd = rsvpState[ev.id];
                return (
                  <div key={ev.id} className="event-item-card">
                    <div className="event-date-box-clean">
                      <span className="date-month">{ev.date.split(' ')[0]}</span>
                      <span className="date-num">{ev.date.split(' ')[1]?.replace(',', '')}</span>
                    </div>

                    <div className="event-body-col">
                      <div className="event-meta-chips">
                        <span className="event-type-pill">{ev.type}</span>
                        {ev.seatsLeft > 0 ? (
                          <span className="seats-available-text">{ev.seatsLeft} visitor seats</span>
                        ) : (
                          <span className="seats-full-text">Registration Closed</span>
                        )}
                      </div>

                      <h4 className="event-item-title">{ev.title}</h4>

                      <div className="event-schedule-row">
                        <span className="schedule-detail">
                          <Clock size={13} /> {ev.time}
                        </span>
                        <span className="schedule-detail">
                          <MapPin size={13} /> {ev.location}
                        </span>
                      </div>

                      <div className="event-footer-action">
                        {isRsvpd ? (
                          <div className="rsvp-confirmed-pill">
                            <CheckCircle size={14} />
                            <span>Visitor Pass Reserved</span>
                          </div>
                        ) : (
                          <button 
                            onClick={() => handleRSVP(ev.id)}
                            className="btn-reserve-pass"
                          >
                            <span>Reserve Free Visitor Pass</span>
                            <ArrowUpRight size={13} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
