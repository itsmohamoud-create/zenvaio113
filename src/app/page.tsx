"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/* ─────────────── DATA ─────────────── */

const TICKER_ITEMS = [
  { bg: "#FF7A59", abbr: "HS", name: "HubSpot" },
  { bg: "#00A1E0", abbr: "SF", name: "Salesforce" },
  { bg: "#E42527", abbr: "ZH", name: "Zoho CRM" },
  { bg: "#017737", abbr: "PD", name: "Pipedrive" },
  { bg: "#F87100", abbr: "GH", name: "GoHighLevel" },
  { bg: "#F62B54", abbr: "MD", name: "Monday.com" },
  { bg: "#4285F4", abbr: "GC", name: "Google Calendar" },
  { bg: "#0072C6", abbr: "OL", name: "Outlook" },
  { bg: "#006BFF", abbr: "CL", name: "Calendly" },
  { bg: "#007AFF", abbr: "CA", name: "Cal.com" },
  { bg: "#0B3956", abbr: "AQ", name: "Acuity" },
  { bg: "#F22F46", abbr: "TW", name: "Twilio" },
  { bg: "#25D366", abbr: "WA", name: "WhatsApp" },
  { bg: "#4A154B", abbr: "SL", name: "Slack" },
  { bg: "#EA4335", abbr: "GM", name: "Gmail" },
  { bg: "#0866FF", abbr: "FM", name: "FB Messenger" },
  { bg: "#FFE01B", abbr: "MC", name: "Mailchimp", textDark: true },
  { bg: "#004D91", abbr: "AC", name: "ActiveCampaign" },
  { bg: "#8B5CF6", abbr: "KV", name: "Klaviyo" },
  { bg: "#0AA4AE", abbr: "BR", name: "Brevo" },
  { bg: "#635BFF", abbr: "ST", name: "Stripe" },
  { bg: "#4285F4", abbr: "GA", name: "Google Ads" },
  { bg: "#0866FF", abbr: "FB", name: "Meta Ads" },
  { bg: "#0A66C2", abbr: "LI", name: "LinkedIn" },
  { bg: "#000", abbr: "AI", name: "OpenAI", border: true },
  { bg: "#00FF9D", abbr: "RA", name: "Retell AI" },
  { bg: "#34A853", abbr: "GS", name: "Google Sheets" },
  { bg: "#FFB700", abbr: "AT", name: "Airtable", textDark: true },
  { bg: "#111", abbr: "NO", name: "Notion", border: true },
  { bg: "#21759B", abbr: "WP", name: "WordPress" },
  { bg: "#4353FF", abbr: "WF", name: "Webflow" },
];

const INDUSTRIES = [
  { name: "Real Estate", desc: "Instant lead response for realtors and agencies" },
  { name: "Mortgage Lending", desc: "Speed-to-lead automation for lenders" },
  { name: "Digital Marketing", desc: "Agency lead qualification and booking" },
  { name: "Home Services", desc: "24/7 booking for plumbers, HVAC, electricians" },
  { name: "Pet Services", desc: "Grooming & vet appointment automation" },
  { name: "Healthcare", desc: "Patient booking and after-hours coverage" },
  { name: "Legal Services", desc: "Consultation booking for law firms" },
  { name: "Automotive", desc: "Dealership lead response and test drives" },
  { name: "E-commerce", desc: "Cart recovery and customer reactivation" },
];

const ROTATING_TESTIMONIALS = [
  {
    stars: "★★★★★",
    quote:
      "Zen transformed our lead response time. We went from 47 hours to under 30 seconds. Our conversion rate doubled in the first month!",
    initials: "MT",
    name: "Michael Thompson",
    role: "Real Estate Broker — Chicago, IL",
  },
  {
    stars: "★★★★★",
    quote:
      "Healthcare runs 24/7 and so does Zen. Our after-hours patient bookings increased by 300%. I can finally sleep without missing calls.",
    initials: "DSJ",
    name: "Dr. Sarah Johnson",
    role: "Medical Practice Owner — Atlanta, GA",
  },
  {
    stars: "★★★★★",
    quote:
      "In lending, speed is everything. Zen calls our leads back instantly. We've closed $15M more in loans since implementing Zen.",
    initials: "DK",
    name: "David Kim",
    role: "Mortgage Lender — Los Angeles, CA",
  },
  {
    stars: "★★★★★",
    quote:
      "My agency handles 50+ clients. Zen qualifies every lead before it reaches me. I only talk to serious buyers now. Game changer.",
    initials: "PP",
    name: "Priya Patel",
    role: "Digital Marketing Agency — New York, NY",
  },
  {
    stars: "★★★★★",
    quote:
      "Car buyers call multiple dealerships. Zen calls them back in under 30 seconds. We're now FIRST every time. Sales up 40%.",
    initials: "AH",
    name: "Ahmed Hassan",
    role: "Auto Dealership Owner — Detroit, MI",
  },
  {
    stars: "★★★★★",
    quote:
      "Plumbing emergencies can't wait. Zen answers every call at 2 AM. We've grown from 3 to 12 trucks in 8 months.",
    initials: "CM",
    name: "Carlos Mendez",
    role: "Home Services Owner — Miami, FL",
  },
];

const FAQ_DATA = [
  {
    q: "How do you customise the solution?",
    a: "We start with a strategy call to understand your business, workflows, and goals. Then we configure your AI agent with your brand voice, qualifying questions, and integration requirements.",
  },
  {
    q: "What is the typical implementation timeline?",
    a: "Most systems go live within 14 days. Complex integrations may take up to 21 days. We handle all the technical setup and testing — you don't need to do anything.",
  },
  {
    q: "Do you support multiple languages?",
    a: "Yes! Zen supports English, Spanish, French, and Mandarin. Additional languages available on request for Full Stack clients.",
  },
  {
    q: "What if my business has unique integration needs?",
    a: "We integrate with 50+ tools including HubSpot, Salesforce, Zoho, Pipedrive, Monday, Calendly, and custom APIs. If we don't have it, we'll build it.",
  },
  {
    q: "Can Zen transfer calls to a real person?",
    a: "Absolutely. Zen can warm-transfer qualified leads to your sales team, or escalate urgent calls based on your rules.",
  },
  {
    q: "How does billing work?",
    a: "Simple monthly billing with no hidden fees. Starter plans are month-to-month. Growth and Full Stack plans offer annual discounts.",
  },
];

/* ─────────────── COMPONENT ─────────────── */

export default function Home() {
  /* ---- state ---- */
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeIndustry, setActiveIndustry] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [scrollTopVisible, setScrollTopVisible] = useState(false);
  const [stickyMobileVisible, setStickyMobileVisible] = useState(false);

  // ROI calculator
  const [monthlyCalls, setMonthlyCalls] = useState(1000);
  const [missedRate, setMissedRate] = useState(15);
  const [conversionRate, setConversionRate] = useState(20);
  const [customerValue, setCustomerValue] = useState(500);

  // Form
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Cursor
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const cursorTrailRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const trailPos = useRef({ x: 0, y: 0 });

  /* ---- derived ---- */
  const missedCalls = Math.round(monthlyCalls * (missedRate / 100));
  const lostConversions = Math.round(missedCalls * (conversionRate / 100));
  const revenueLost = lostConversions * customerValue;

  /* ---- cursor animation ---- */
  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = e.clientX + "px";
        cursorDotRef.current.style.top = e.clientY + "px";
      }
      if (cursorRingRef.current) {
        cursorRingRef.current.style.left = e.clientX + "px";
        cursorRingRef.current.style.top = e.clientY + "px";
      }
    };

    let animId: number;
    const animateTrail = () => {
      trailPos.current.x +=
        (mousePos.current.x - trailPos.current.x) * 0.12;
      trailPos.current.y +=
        (mousePos.current.y - trailPos.current.y) * 0.12;
      if (cursorTrailRef.current) {
        cursorTrailRef.current.style.left = trailPos.current.x + "px";
        cursorTrailRef.current.style.top = trailPos.current.y + "px";
      }
      animId = requestAnimationFrame(animateTrail);
    };

    document.addEventListener("mousemove", handleMouseMove);
    animId = requestAnimationFrame(animateTrail);

    // Hover state
    const addHover = () => document.body.classList.add("cursor-hover");
    const removeHover = () => document.body.classList.remove("cursor-hover");

    const interactives = document.querySelectorAll(
      "a, button, input, .card, .industry-tab, .faq-question, .addon-card, .testimonial-card, .metric-card"
    );
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", addHover);
      el.addEventListener("mouseleave", removeHover);
    });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animId);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", addHover);
        el.removeEventListener("mouseleave", removeHover);
      });
    };
  }, []);

  /* ---- scroll listeners ---- */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setNavScrolled(y > 30);
      setScrollTopVisible(y > 500);
      setStickyMobileVisible(
        window.innerWidth <= 1020 && y > 400
      );
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ---- scroll reveal ---- */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(
              () => entry.target.classList.add("visible"),
              i * 70
            );
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* ---- rotating testimonials ---- */
  useEffect(() => {
    const id = setInterval(() => {
      setCurrentTestimonial(
        (prev) => (prev + 1) % ROTATING_TESTIMONIALS.length
      );
    }, 5000);
    return () => clearInterval(id);
  }, []);

  /* ---- close mobile menu on resize ---- */
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 1020) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* ---- body scroll lock when mobile menu open ---- */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  /* ---- handlers ---- */
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleSmoothScroll = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (!href.startsWith("#")) return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const navH = document.getElementById("mainNav")?.offsetHeight ?? 68;
        const top =
          target.getBoundingClientRect().top + window.scrollY - navH - 8;
        window.scrollTo({ top, behavior: "smooth" });
      }
      setMobileOpen(false);
    },
    []
  );

  const handleFormSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setFormSubmitted(true);
      setTimeout(() => setFormSubmitted(false), 4000);
    },
    []
  );

  /* ---- render ---- */
  return (
    <>
      {/* CURSOR */}
      <div id="cursor-dot" ref={cursorDotRef} />
      <div id="cursor-ring" ref={cursorRingRef} />
      <div id="cursor-trail" ref={cursorTrailRef} />

      {/* ANNOUNCEMENT BAR */}
      <div className="announce-bar">
        <span className="stars">★★★★★</span>
        <span className="announce-sep">|</span>
        <span>Trusted by 22+ Companies Worldwide</span>
        <span className="announce-sep">·</span>
        <a href="mailto:hello@zenvaio.com">Book a Free Strategy Call →</a>
      </div>

      {/* NAV - FIXED POSITION TO ELIMINATE BLACK SPACE */}
      <nav 
        className={`zv-nav${navScrolled ? " scrolled" : ""}`} 
        id="mainNav"
        style={{ position: 'fixed', top: '40px', left: 0, right: 0, zIndex: 1000, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(20px)' }}
      >
        <a href="#" className="nav-logo">
          <svg
            className="nav-logo-icon"
            viewBox="0 0 38 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="38" height="38" rx="9" fill="#00FF9D" />
            <text
              x="50%"
              y="54%"
              dominantBaseline="middle"
              textAnchor="middle"
              fontFamily="'Plus Jakarta Sans', Arial, sans-serif"
              fontSize="14"
              fontWeight="800"
              fill="#000000"
            >
              ZV
            </text>
          </svg>
          <span className="nav-logo-text">
            ZEN<span className="accent">V</span>AIO
          </span>
        </a>

        <ul className="nav-center">
          <li className="has-dropdown">
            <button>
              Services
              <span className="nav-chevron">
                <svg viewBox="0 0 10 6" fill="none">
                  <path
                    d="M1 1l4 4 4-4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
            <div className="dropdown">
              <a href="#services" onClick={(e) => handleSmoothScroll(e, "#services")}>
                <span className="dd-icon">🤖</span>
                <span className="dd-text">
                  <strong>AI Front Desk</strong>
                  <span>24/7 AI voice &amp; chat agent</span>
                </span>
              </a>
              <a href="#services" onClick={(e) => handleSmoothScroll(e, "#services")}>
                <span className="dd-icon">⚡</span>
                <span className="dd-text">
                  <strong>Instant Lead Response</strong>
                  <span>Contact leads within 60 seconds</span>
                </span>
              </a>
              <a href="#services" onClick={(e) => handleSmoothScroll(e, "#services")}>
                <span className="dd-icon">📅</span>
                <span className="dd-text">
                  <strong>Appointment Booking</strong>
                  <span>End-to-end scheduling automation</span>
                </span>
              </a>
              <a href="#services" onClick={(e) => handleSmoothScroll(e, "#services")}>
                <span className="dd-icon">🔄</span>
                <span className="dd-text">
                  <strong>Client Reactivation</strong>
                  <span>Re-engage dormant clients automatically</span>
                </span>
              </a>
            </div>
          </li>
          <li className="has-dropdown">
            <button>
              How It Works
              <span className="nav-chevron">
                <svg viewBox="0 0 10 6" fill="none">
                  <path
                    d="M1 1l4 4 4-4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
            <div className="dropdown">
              <a href="#how-it-works" onClick={(e) => handleSmoothScroll(e, "#how-it-works")}>
                <span className="dd-icon">📞</span>
                <span className="dd-text">
                  <strong>Strategy Call</strong>
                  <span>Map your current flow &amp; gaps</span>
                </span>
              </a>
              <a href="#how-it-works" onClick={(e) => handleSmoothScroll(e, "#how-it-works")}>
                <span className="dd-icon">🔧</span>
                <span className="dd-text">
                  <strong>We Build &amp; Test</strong>
                  <span>Full system configured in 14 days</span>
                </span>
              </a>
              <a href="#how-it-works" onClick={(e) => handleSmoothScroll(e, "#how-it-works")}>
                <span className="dd-icon">🚀</span>
                <span className="dd-text">
                  <strong>Go Live &amp; Scale</strong>
                  <span>Monitor, optimise &amp; grow</span>
                </span>
              </a>
            </div>
          </li>
          <li>
            <a href="#results" onClick={(e) => handleSmoothScroll(e, "#results")}>
              Results
            </a>
          </li>
          <li>
            <a href="#roi-calculator" onClick={(e) => handleSmoothScroll(e, "#roi-calculator")}>
              ROI Calc
            </a>
          </li>
          <li>
            <a href="#faq" onClick={(e) => handleSmoothScroll(e, "#faq")}>FAQ</a>
          </li>
        </ul>

        <div className="nav-right">
          <a href="mailto:hello@zenvaio.com" className="btn-nav">
            Book a Free Strategy Call
          </a>
        </div>

        <button
          className="hamburger"
          aria-label="Menu"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span
            style={
              mobileOpen
                ? { transform: "rotate(45deg) translate(5px, 5px)" }
                : undefined
            }
          />
          <span style={mobileOpen ? { opacity: 0 } : undefined} />
          <span
            style={
              mobileOpen
                ? { transform: "rotate(-45deg) translate(5px, -5px)" }
                : undefined
            }
          />
        </button>
      </nav>

      {/* MOBILE MENU */}
      <div className={`mobile-menu${mobileOpen ? " open" : ""}`}>
        <span className="mobile-section-title">Services</span>
        <a href="#services" onClick={(e) => handleSmoothScroll(e, "#services")}>
          🤖 AI Front Desk
        </a>
        <a href="#services" onClick={(e) => handleSmoothScroll(e, "#services")}>
          ⚡ Instant Lead Response
        </a>
        <a href="#services" onClick={(e) => handleSmoothScroll(e, "#services")}>
          📅 Appointment Booking
        </a>
        <a href="#services" onClick={(e) => handleSmoothScroll(e, "#services")}>
          🔄 Client Reactivation
        </a>
        <span className="mobile-section-title">Pages</span>
        <a
          href="#how-it-works"
          onClick={(e) => handleSmoothScroll(e, "#how-it-works")}
        >
          How It Works
        </a>
        <a href="#results" onClick={(e) => handleSmoothScroll(e, "#results")}>
          Results
        </a>
        <a
          href="#roi-calculator"
          onClick={(e) => handleSmoothScroll(e, "#roi-calculator")}
        >
          ROI Calculator
        </a>
        <a href="#faq" onClick={(e) => handleSmoothScroll(e, "#faq")}>FAQ</a>
        <a
          href="mailto:hello@zenvaio.com"
          className="mobile-cta"
          onClick={() => setMobileOpen(false)}
        >
          Book a Free Strategy Call →
        </a>
      </div>

      {/* ────────── HERO - TIGHTENED SPACING ────────── */}
      <section className="hero" style={{ paddingTop: '100px', marginTop: 0 }}>
        <div className="hero-orb-1" />
        <div className="hero-orb-2" />
        <div className="hero-orb-3" />
        <div className="hero-grid-bg" />
        <div className="hero-badge">
          <span className="hero-badge-dot" />
          Done-for-you AI Automation Systems
        </div>
        <h1>
          Grow Your Business Without
          <br />
          <span className="accent-text">Growing Your Workload.</span>
        </h1>
        <p className="hero-sub">
          Zenvaio designs and manages AI-powered automation systems tailored to
          your business — so every lead gets a response, every appointment gets
          booked, and you can focus on the work you love.
        </p>
        <div className="hero-btns">
          <a href="mailto:hello@zenvaio.com" className="btn-primary">
            Book a Free Strategy Call
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
            >
              <path
                d="M2 7h10M8 3l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <a
            href="#how-it-works"
            className="btn-secondary"
            onClick={(e) => handleSmoothScroll(e, "#how-it-works")}
          >
            See How It Works
          </a>
        </div>
        <div className="trusted-bar">
          <span className="trusted-label">
            Trusted by 22+ Companies Worldwide
          </span>
          <div className="stars-row">★★★★★</div>
          <span className="trusted-text">Five-Star Rated on Every Platform</span>
        </div>
        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-number">60s</span>
            <span className="stat-label">Lead Response Time</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">14d</span>
            <span className="stat-label">Days to Go Live</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">24/7</span>
            <span className="stat-label">AI Coverage</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">10–25%</span>
            <span className="stat-label">Lapsed Clients Recovered</span>
          </div>
        </div>
      </section>

      {/* ────────── REVENUE ALERT ────────── */}
      <section className="revenue-alert">
        <div className="section-inner">
          <span className="section-label">Revenue Alert</span>
          <h2>How Much Revenue Are You Missing?</h2>
          <p>
            Most businesses lose 67% of potential sales to slow response times
            and missed calls. See how much you&apos;re leaving on the table.
          </p>
          <div className="revenue-stats">
            <div className="revenue-stat">
              <span className="revenue-stat-number">62%</span>
              <span className="revenue-stat-label">
                of calls to SMEs go unanswered
              </span>
            </div>
            <div className="revenue-stat">
              <span className="revenue-stat-number">47h</span>
              <span className="revenue-stat-label">
                average lead response time
              </span>
            </div>
            <div className="revenue-stat">
              <span className="revenue-stat-number">67%</span>
              <span className="revenue-stat-label">
                of potential sales lost to delays
              </span>
            </div>
          </div>
          <div style={{ textAlign: "center", marginTop: 48 }}>
            <a
              href="#roi-calculator"
              className="btn-primary"
              onClick={(e) => handleSmoothScroll(e, "#roi-calculator")}
            >
              Show Me My Lost Revenue →
            </a>
          </div>
        </div>
      </section>

      {/* ────────── LOGOS TICKER ────────── */}
      <div className="logos-section">
        <div className="logos-label-row">Powered By &amp; Integrates With</div>
        <div className="ticker-wrapper">
          <div className="ticker-track">
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
              <div className="ticker-item" key={`${item.abbr}-${i}`}>
                <div
                  className="ticker-logo"
                  style={{
                    background: item.bg,
                    color: item.textDark ? "#333" : "#fff",
                    border: item.border
                      ? "1px solid #333"
                      : undefined,
                  }}
                >
                  {item.abbr}
                </div>
                <span className="ticker-name">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ────────── SERVICES ────────── */}
      <section className="services" id="services">
        <div className="section-inner">
          <span className="section-label reveal">Our Services</span>
          <h2 className="section-title reveal">
            Four Systems. Zero Manual Work.
          </h2>
          <p className="section-sub reveal">
            Every system is built, tested, and managed by Zenvaio — you just
            show up to the calls.
          </p>
          <div className="cards-grid">
            {/* AI Front Desk */}
            <div className="card reveal">
              <div className="card-header">
                <div className="card-icon">🤖</div>
                <div className="card-top">
                  <h3>AI Front Desk</h3>
                  <div className="card-tags">
                    <span className="tag">Starter</span>
                    <span className="tag">Growth</span>
                    <span className="tag">Full Stack</span>
                  </div>
                </div>
              </div>
              <p className="card-body">
                Replaces your front desk with a 24/7 AI voice and chat agent
                that answers calls, handles FAQs, qualifies leads, and logs
                everything to your CRM automatically.
              </p>
              <ul className="card-bullets">
                <li>Custom AI voice agent (branded persona)</li>
                <li>Handles inbound calls after hours &amp; peak times</li>
                <li>AI chat widget for your website</li>
                <li>Every call logged to CRM with transcript</li>
                <li>Instant SMS/email alert to business owner</li>
              </ul>
            </div>
            {/* Instant Lead Response */}
            <div className="card reveal">
              <div className="card-header">
                <div className="card-icon">⚡</div>
                <div className="card-top">
                  <h3>Instant Lead Response</h3>
                  <div className="card-tags">
                    <span className="tag">Growth</span>
                    <span className="tag">Full Stack</span>
                  </div>
                </div>
              </div>
              <p className="card-body">
                Every new lead — from ads, forms, or missed calls — is contacted
                within 60 seconds via SMS and AI voice call. Eliminates lead
                decay and beats your competition.
              </p>
              <ul className="card-bullets">
                <li>Connects to Facebook Ads, Google Ads, forms</li>
                <li>Personalised SMS within 60 seconds of entry</li>
                <li>Outbound AI voice call if no response in 5 min</li>
                <li>5-email nurture sequence triggered automatically</li>
                <li>Hot lead scoring &amp; instant sales owner alert</li>
              </ul>
            </div>
            {/* Appointment Booking */}
            <div className="card reveal">
              <div className="card-header">
                <div className="card-icon">📅</div>
                <div className="card-top">
                  <h3>Appointment Booking Automation</h3>
                  <div className="card-tags">
                    <span className="tag">Starter</span>
                    <span className="tag">Growth</span>
                    <span className="tag">Full Stack</span>
                  </div>
                </div>
              </div>
              <p className="card-body">
                End-to-end automation of your entire scheduling process — from
                first contact to confirmed booking, reminders, no-show recovery,
                and post-appointment follow-up.
              </p>
              <ul className="card-bullets">
                <li>AI booking agent via voice or chat</li>
                <li>Automated reminders at 48hr &amp; 2hr before</li>
                <li>No-show recovery SMS with one-tap reschedule</li>
                <li>Post-appointment review request (Google)</li>
                <li>Syncs with Google Calendar &amp; Outlook</li>
              </ul>
            </div>
            {/* Dormant Client Reactivation */}
            <div className="card reveal">
              <div className="card-header">
                <div className="card-icon">🔄</div>
                <div className="card-top">
                  <h3>Dormant Client Reactivation</h3>
                  <div className="card-tags">
                    <span className="tag">Full Stack</span>
                    <span className="tag tag-addon">Add-on</span>
                  </div>
                </div>
              </div>
              <p className="card-body">
                Automatically re-engages past clients who have gone quiet —
                turning cold contacts into active revenue. Typically recovers
                10–25% of lapsed clients with zero manual outreach.
              </p>
              <ul className="card-bullets">
                <li>Segments client list by recency &amp; spend tier</li>
                <li>Personalised email &amp; SMS reactivation sequences</li>
                <li>Outbound AI voice calls for high-value clients</li>
                <li>Dynamic offer engine (discounts, bonuses)</li>
                <li>Re-entry routing back into your pipeline</li>
              </ul>
            </div>
          </div>
          <div className="addon-grid">
            <div className="addon-card reveal">
              <span className="addon-badge">Available on All Plans</span>
              <h3>⭐ Google Review Generation</h3>
              <p>
                After every completed appointment or service, an automated SMS
                or email requests a Google review — no manual follow-up needed.
                Build your reputation on autopilot.
              </p>
            </div>
            <div className="addon-card reveal">
              <span className="addon-badge">Enterprise &amp; Custom</span>
              <h3>⚙️ Custom Automations</h3>
              <p>
                Need something bespoke? We build fully custom automation
                workflows tailored to your exact business process — from complex
                multi-step pipelines to unique CRM integrations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ────────── FEATURE STRIP ────────── */}
      <div className="features-strip">
        <div className="features-strip-inner">
          <div className="feature-item reveal">
            <div className="feature-icon-wrap">🎯</div>
            <h4>Built for Your Business</h4>
            <p>
              Every automation is custom-configured to match your industry,
              workflow, and goals.
            </p>
          </div>
          <div className="feature-item reveal">
            <div className="feature-icon-wrap">🔒</div>
            <h4>Fully Managed</h4>
            <p>
              We monitor, optimise, and maintain your systems — no technical
              knowledge required.
            </p>
          </div>
          <div className="feature-item reveal">
            <div className="feature-icon-wrap">⚙️</div>
            <h4>Seamless Integrations</h4>
            <p>
              Connects with your existing CRM, calendar, and marketing tools out
              of the box.
            </p>
          </div>
          <div className="feature-item reveal">
            <div className="feature-icon-wrap">📊</div>
            <h4>Measurable ROI</h4>
            <p>
              Track leads recovered, bookings made, and revenue generated — all
              in one dashboard.
            </p>
          </div>
        </div>
      </div>

      {/* ────────── HOW IT WORKS ────────── */}
      <section className="how-it-works" id="how-it-works">
        <div className="section-inner">
          <span className="section-label reveal">The Process</span>
          <h2 className="section-title reveal">
            Up and Running in 14 Days
          </h2>
          <p className="section-sub reveal">
            We handle the entire build — you don&apos;t need to touch a single
            tool.
          </p>
          <div className="steps-grid">
            <div className="step reveal">
              <div className="step-circle">01</div>
              <h3>Strategy Call</h3>
              <p>
                We map your current lead and booking flow, identify the gaps,
                and design your custom automation system.
              </p>
            </div>
            <div className="step reveal">
              <div className="step-circle">02</div>
              <h3>We Build &amp; Test</h3>
              <p>
                Zenvaio configures your AI voice agent, CRM integrations, and
                automation workflows — all fully tested before launch.
              </p>
            </div>
            <div className="step reveal">
              <div className="step-circle">03</div>
              <h3>Go Live &amp; Scale</h3>
              <p>
                Your system launches. We monitor performance, optimise monthly,
                and scale as your business grows.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ────────── ZEN WORKS ────────── */}
      <section className="zen-works">
        <div className="section-inner">
          <span className="section-label reveal">How Zen Works</span>
          <h2 className="section-title reveal">
            From Lead Submission to Booked Appointment in Minutes
          </h2>
          <p className="section-sub reveal">
            Not days. Zen handles the entire journey automatically.
          </p>
          <div className="zen-steps">
            <div className="zen-step reveal">
              <div className="zen-step-number">01</div>
              <h4>Lead Submits</h4>
              <p>
                A prospect fills out your form, clicks an ad, or enters your
                funnel. Zen is instantly notified.
              </p>
            </div>
            <div className="zen-step reveal">
              <div className="zen-step-number">02</div>
              <h4>Zen Calls</h4>
              <p>
                Within 30 seconds, Zen calls your lead with a natural,
                human-like voice conversation.
              </p>
            </div>
            <div className="zen-step reveal">
              <div className="zen-step-number">03</div>
              <h4>Qualifies Lead</h4>
              <p>
                Zen asks your custom qualifying questions, handles objections,
                and gauges interest level.
              </p>
            </div>
            <div className="zen-step reveal">
              <div className="zen-step-number">04</div>
              <h4>Books Appointment</h4>
              <p>
                Qualified leads are instantly booked into your calendar. You only
                talk to ready-to-buy prospects.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ────────── INDUSTRY SELECTOR ────────── */}
      <section className="industry-selector" id="industry-selector">
        <div className="section-inner">
          <span className="section-label reveal">
            Built for Every Industry
          </span>
          <h2 className="section-title reveal">Experience Zen in Action</h2>
          <p className="section-sub reveal">
            Select your industry and see how Zen engages leads and books
            appointments automatically.
          </p>
          <div className="industry-inner">
            <div className="industry-tabs">
              {INDUSTRIES.map((ind, i) => (
                <button
                  key={ind.name}
                  className={`industry-tab${i === activeIndustry ? " active" : ""}`}
                  onClick={() => setActiveIndustry(i)}
                >
                  {ind.name}
                </button>
              ))}
            </div>
            <div className="industry-form">
              <h3>Get a Call from Zen</h3>
              <p className="selected-industry">
                Selected: {INDUSTRIES[activeIndustry].name} —{" "}
                {INDUSTRIES[activeIndustry].desc}
              </p>
              {formSubmitted ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "40px 0",
                    color: "var(--green)",
                    fontSize: "18px",
                    fontWeight: 700,
                  }}
                >
                  ✓ Thank you! Zen will call you shortly.
                  <br />
                  <span
                    style={{
                      fontSize: "14px",
                      color: "var(--white-50)",
                      fontWeight: 400,
                    }}
                  >
                    Make sure your volume is on!
                  </span>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label>
                        First Name <span>*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your first name"
                        value={formData.firstName}
                        onChange={(e) =>
                          setFormData((d) => ({
                            ...d,
                            firstName: e.target.value,
                          }))
                        }
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>
                        Last Name <span>*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your last name"
                        value={formData.lastName}
                        onChange={(e) =>
                          setFormData((d) => ({
                            ...d,
                            lastName: e.target.value,
                          }))
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>
                        Phone Number <span>*</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData((d) => ({ ...d, phone: e.target.value }))
                        }
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>
                        Email Address <span>*</span>
                      </label>
                      <input
                        type="email"
                        placeholder="Enter your email address"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData((d) => ({ ...d, email: e.target.value }))
                        }
                        required
                      />
                    </div>
                  </div>
                  <button type="submit" className="form-submit">
                    Get a Call from Zen →
                  </button>
                  <p className="form-disclaimer">
                    By submitting, you agree to receive a call from our AI
                    Assistant, Zen. No spam, ever.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ────────── TESTIMONIALS / RESULTS ────────── */}
      <section className="results" id="results">
        <div className="section-inner">
          <span className="section-label reveal">Results</span>
          <h2 className="section-title reveal">
            Businesses Growing With Zenvaio
          </h2>
          <p className="section-sub reveal">
            Real outcomes from real business owners who let AI handle the
            workload.
          </p>
          <div className="testimonials-grid">
            <div className="testimonial-card reveal">
              <div className="stars">★★★★★</div>
              <p className="testimonial-quote">
                &quot;We went from missing half our leads to booking 3x more
                appointments in the first month. The AI front desk answers calls
                we couldn&apos;t — at 2am, on weekends, all of it.&quot;
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">👨‍💼</div>
                <div>
                  <span className="author-name">Marcus T.</span>
                  <span className="author-role">
                    Dental Practice Owner
                  </span>
                </div>
              </div>
            </div>
            <div className="testimonial-card reveal">
              <div className="stars">★★★★★</div>
              <p className="testimonial-quote">
                &quot;The 60-second lead response alone changed everything. We
                were losing clients to competitors because we called back too
                late. Not anymore. Worth every penny.&quot;
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">👩‍💼</div>
                <div>
                  <span className="author-name">Sarah K.</span>
                  <span className="author-role">Real Estate Agency</span>
                </div>
              </div>
            </div>
            <div className="testimonial-card reveal">
              <div className="stars">★★★★★</div>
              <p className="testimonial-quote">
                &quot;The reactivation campaign brought back 18 clients we
                thought were gone forever. That&apos;s over $24k in recovered
                revenue in 6 weeks. Zenvaio paid for itself 8x over.&quot;
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">🧔</div>
                <div>
                  <span className="author-name">James O.</span>
                  <span className="author-role">
                    Fitness Studio Owner
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Rotating testimonials */}
          <div className="rotating-testimonials">
            {ROTATING_TESTIMONIALS.map((t, i) => (
              <div
                key={t.initials}
                className={`rotating-card${i === currentTestimonial ? " active" : ""}`}
              >
                <div className="stars">{t.stars}</div>
                <p className="testimonial-quote">&quot;{t.quote}&quot;</p>
                <div className="testimonial-author">
                  <div className="author-avatar">{t.initials}</div>
                  <div>
                    <span className="author-name">{t.name}</span>
                    <span className="author-role">{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
            <div className="rotating-dots">
              {ROTATING_TESTIMONIALS.map((_, i) => (
                <span
                  key={i}
                  className={`rotating-dot${i === currentTestimonial ? " active" : ""}`}
                  onClick={() => setCurrentTestimonial(i)}
                />
              ))}
            </div>
          </div>

          <div className="results-metrics">
            <div className="metric-card reveal">
              <span className="metric-number">3×</span>
              <span className="metric-label">More appointments booked</span>
            </div>
            <div className="metric-card reveal">
              <span className="metric-number">60s</span>
              <span className="metric-label">Average lead response time</span>
            </div>
            <div className="metric-card reveal">
              <span className="metric-number">18%</span>
              <span className="metric-label">
                Average lapsed clients recovered
              </span>
            </div>
            <div className="metric-card reveal">
              <span className="metric-number">14d</span>
              <span className="metric-label">
                From strategy call to live system
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ────────── ROI CALCULATOR ────────── */}
      <section className="roi-calculator" id="roi-calculator">
        <div className="section-inner">
          <div className="roi-header">
            <span className="section-label">ROI Calculator</span>
            <h2 className="section-title">
              See How Much Revenue You&apos;re Leaving on the Table
            </h2>
            <p className="section-sub">
              Enter your numbers to see the impact of an AI agent that answers
              100% of your calls.
            </p>
          </div>
          <div className="roi-container">
            <div className="roi-grid">
              <div className="roi-inputs">
                <h3>Your Current Numbers</h3>
                <div className="roi-field">
                  <label>Total Monthly Calls</label>
                  <input
                    type="range"
                    min={100}
                    max={10000}
                    value={monthlyCalls}
                    step={100}
                    onChange={(e) =>
                      setMonthlyCalls(Number(e.target.value))
                    }
                  />
                  <div className="roi-value">
                    <span>100</span>
                    <span className="current">
                      {monthlyCalls.toLocaleString()}
                    </span>
                    <span>10,000</span>
                  </div>
                </div>
                <div className="roi-field">
                  <label>Missed Call Rate</label>
                  <input
                    type="range"
                    min={1}
                    max={60}
                    value={missedRate}
                    step={1}
                    onChange={(e) =>
                      setMissedRate(Number(e.target.value))
                    }
                  />
                  <div className="roi-value">
                    <span>1%</span>
                    <span className="current">{missedRate}%</span>
                    <span>60%</span>
                  </div>
                </div>
                <div className="roi-field">
                  <label>Conversion Rate</label>
                  <input
                    type="range"
                    min={1}
                    max={60}
                    value={conversionRate}
                    step={1}
                    onChange={(e) =>
                      setConversionRate(Number(e.target.value))
                    }
                  />
                  <div className="roi-value">
                    <span>1%</span>
                    <span className="current">{conversionRate}%</span>
                    <span>60%</span>
                  </div>
                </div>
                <div className="roi-field">
                  <label>Avg. Customer Value</label>
                  <input
                    type="range"
                    min={50}
                    max={10000}
                    value={customerValue}
                    step={50}
                    onChange={(e) =>
                      setCustomerValue(Number(e.target.value))
                    }
                  />
                  <div className="roi-value">
                    <span>$50</span>
                    <span className="current">
                      ${customerValue.toLocaleString()}
                    </span>
                    <span>$10,000</span>
                  </div>
                </div>
              </div>
              <div className="roi-results">
                <h3>Your Results</h3>
                <div className="roi-result-row">
                  <span className="roi-result-label">
                    Missed Calls / Month
                  </span>
                  <span className="roi-result-value">
                    {missedCalls.toLocaleString()}
                  </span>
                </div>
                <div className="roi-result-row">
                  <span className="roi-result-label">Lost Conversions</span>
                  <span className="roi-result-value">
                    {lostConversions.toLocaleString()}
                  </span>
                </div>
                <div className="roi-result-row">
                  <span className="roi-result-label">
                    Revenue Lost / Month
                  </span>
                  <span className="roi-result-value large highlight">
                    ${revenueLost.toLocaleString()}
                  </span>
                </div>
                <div className="roi-yearly">
                  <div className="roi-yearly-label">
                    Additional Revenue with Zenvaio
                  </div>
                  <div className="roi-yearly-value">
                    +${revenueLost.toLocaleString()}/mo
                  </div>
                  <div
                    className="roi-yearly-label"
                    style={{ marginTop: 6 }}
                  >
                    ${(revenueLost * 12).toLocaleString()} / year
                  </div>
                </div>
              </div>
            </div>
            <div style={{ textAlign: "center", marginTop: 44 }}>
              <a
                href="mailto:hello@zenvaio.com"
                className="btn-primary"
              >
                Book a Free Strategy Call →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ────────── MAP ────────── */}
      <section className="map-section">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d184552.57268578046!2d-79.51814089428225!3d43.71815566213007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4cb90d7c63ba5%3A0x323555502ab4c477!2sToronto%2C%20ON%2C%20Canada!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Zenvaio Headquarters Location"
        />
        <div className="map-overlay">
          <h4>Zenvaio Headquarters</h4>
          <p>
            Toronto, Ontario, Canada
            <br />
            hello@zenvaio.com
          </p>
        </div>
      </section>

      {/* ────────── FAQ ────────── */}
      <section className="faq" id="faq">
        <div className="section-inner">
          <span className="section-label reveal">FAQ</span>
          <h2 className="section-title reveal">
            Everything You Need to Know About Zen
          </h2>
          <p className="section-sub reveal">
            And how it can help your business grow.
          </p>
          <div className="faq-container">
            {FAQ_DATA.map((item, i) => (
              <div
                key={i}
                className={`faq-item${openFAQ === i ? " open" : ""}`}
              >
                <div
                  className="faq-question"
                  onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                >
                  {item.q}
                  <span className="faq-icon">+</span>
                </div>
                <div className="faq-answer">
                  <p>{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────── FINAL CTA ────────── */}
      <section className="cta-banner">
        <h2>
          Wondering What This Could Look Like for Your Business?
        </h2>
        <p>
          Book a free 30-minute strategy call and we&apos;ll map out a custom
          automation system built around your specific needs.
        </p>
        <a href="mailto:hello@zenvaio.com" className="btn-cta">
          Book a Free Strategy Call →
        </a>
      </section>

      {/* ────────── FOOTER ────────── */}
      <footer className="zv-footer">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="#" className="nav-logo">
              <svg
                className="nav-logo-icon"
                viewBox="0 0 38 38"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="38" height="38" rx="9" fill="#00FF9D" />
                <text
                  x="50%"
                  y="54%"
                  dominantBaseline="middle"
                  textAnchor="middle"
                  fontFamily="'Plus Jakarta Sans', Arial, sans-serif"
                  fontSize="14"
                  fontWeight="800"
                  fill="#000000"
                >
                  ZV
                </text>
              </svg>
              <span className="nav-logo-text">
                ZEN<span className="accent">V</span>AIO
              </span>
            </a>
            <p>
              AI-powered automation systems designed and managed for growing
              businesses.
            </p>
            <div className="footer-contact-info">
              <p>
                <a href="mailto:hello@zenvaio.com">hello@zenvaio.com</a>
              </p>
              <p>Toronto, Ontario, Canada</p>
            </div>
          </div>
          <div className="footer-cols">
            <div className="footer-col">
              <h4>Product</h4>
              <a
                href="#how-it-works"
                onClick={(e) => handleSmoothScroll(e, "#how-it-works")}
              >
                How it Works
              </a>
              <a
                href="#services"
                onClick={(e) => handleSmoothScroll(e, "#services")}
              >
                Services
              </a>
              <a
                href="#industry-selector"
                onClick={(e) => handleSmoothScroll(e, "#industry-selector")}
              >
                Try Zen
              </a>
              <a
                href="#roi-calculator"
                onClick={(e) => handleSmoothScroll(e, "#roi-calculator")}
              >
                ROI Calculator
              </a>
            </div>
            <div className="footer-col">
              <h4>Industries</h4>
              <a
                href="#industry-selector"
                onClick={(e) => handleSmoothScroll(e, "#industry-selector")}
              >
                Real Estate
              </a>
              <a
                href="#industry-selector"
                onClick={(e) => handleSmoothScroll(e, "#industry-selector")}
              >
                Mortgage Lending
              </a>
              <a
                href="#industry-selector"
                onClick={(e) => handleSmoothScroll(e, "#industry-selector")}
              >
                Healthcare
              </a>
              <a
                href="#industry-selector"
                onClick={(e) => handleSmoothScroll(e, "#industry-selector")}
              >
                Home Services
              </a>
            </div>
            <div className="footer-col">
              <h4>Company</h4>
              <a
                href="#results"
                onClick={(e) => handleSmoothScroll(e, "#results")}
              >
                Results
              </a>
              <a href="#faq" onClick={(e) => handleSmoothScroll(e, "#faq")}>
                FAQ
              </a>
              <a href="mailto:hello@zenvaio.com">Contact</a>
            </div>
            <div className="footer-col">
              <h4>Legal</h4>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 Zenvaio. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="mailto:hello@zenvaio.com">hello@zenvaio.com</a>
          </div>
        </div>
      </footer>

      {/* SCROLL TOP */}
      <button
        className={`scroll-top${scrollTopVisible ? " visible" : ""}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        ↑
      </button>

      {/* STICKY MOBILE CTA */}
      {stickyMobileVisible && (
        <div className="sticky-mobile-cta">
          <a href="mailto:hello@zenvaio.com">
            Book a Free Strategy Call
          </a>
        </div>
      )}
    </>
  );
}