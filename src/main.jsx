import React from "react";
import { createRoot } from "react-dom/client";
import {
  Leaf,
  Sprout,
  Droplets,
  Lightbulb,
  Hammer,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  Star,
  Menu,
  X
} from "lucide-react";
import "./styles.css";

const business = {
  name: "Florence Oasis LLC",
  phone: "(626) 512-0090",
  email: "florenceoasis25@gmail.com",
  serviceArea: "Irvine, Santa Ana, Lake Forest, Duarte & nearby communities"
};

const services = [
  {
    icon: Sprout,
    title: "Landscape Consulting & Design",
    text: "Custom planting plans, outdoor layout guidance, curb appeal upgrades, and practical recommendations for your property."
  },
  {
    icon: Leaf,
    title: "Landscape Maintenance",
    text: "Routine yard care, pruning, edging, cleanup, mulch refresh, seasonal service, and detail-oriented property upkeep."
  },
  {
    icon: Lightbulb,
    title: "Outdoor Lighting",
    text: "Pathway lights, accent lighting, security lighting, low-voltage systems, and warm evening curb appeal."
  },
  {
    icon: Droplets,
    title: "Irrigation Systems",
    text: "Sprinkler service, drip irrigation, smart controllers, repairs, water-saving improvements, and system inspections."
  },
  {
    icon: Hammer,
    title: "Hardscape Support",
    text: "Walkway concepts, stone borders, small paver areas, garden edging, and installation coordination."
  }
];

const portfolio = [
  {
    title: "Front Yard Refresh",
    tag: "Design + Maintenance",
    image: "https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Evening Lighting Upgrade",
    tag: "Outdoor Lighting",
    image: "https://images.unsplash.com/photo-1598902108854-10e335adac99?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Water-Smart Planting",
    tag: "Irrigation + Drought Care",
    image: "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&w=1200&q=80"
  }
];

function Header() {
  const [open, setOpen] = React.useState(false);
  const links = ["Services", "Portfolio", "About", "Contact"];

  return (
    <header className="site-header">
      <a className="brand" href="#home" aria-label={`${business.name} home`}>
        <span className="brand-mark"><Leaf size={22} /></span>
        <span>{business.name}</span>
      </a>

      <button className="menu-button" onClick={() => setOpen(!open)} aria-label="Toggle navigation">
        {open ? <X /> : <Menu />}
      </button>

      <nav className={open ? "nav open" : "nav"}>
        {links.map((link) => (
          <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setOpen(false)}>
            {link}
          </a>
        ))}
        <a className="nav-cta" href="#contact" onClick={() => setOpen(false)}>Get Free Estimate</a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-overlay" />
      <div className="hero-content">
        <p className="eyebrow">Maintenance • Irrigation • Plant Design • Lighting</p>
        <h1>Transform Your Property Into a Lush, Sustainable Oasis.</h1>
        <p className="hero-text">
          Premium landscaping, meticulous garden maintenance, and smart water-saving irrigation systems for residential properties throughout Orange County and the San Gabriel Valley.
        </p>
        <div className="hero-actions">
          <a className="button primary" href="#contact">Request a Free Estimate</a>
          <a className="button secondary" href="#services">View Services</a>
        </div>
        <div className="trust-row">
          <span><CheckCircle size={18} /> Southern California Local</span>
          <span><CheckCircle size={18} /> Clean Workmanship</span>
          <span><CheckCircle size={18} /> Water-Smart Solutions</span>
        </div>
      </div>
    </section>
  );
}


function Services() {
  return (
    <section id="services" className="section">
      <div className="section-heading">
        <p className="eyebrow">What We Do</p>
        <h2>Complete outdoor service for every stage of your property.</h2>
        <p>
          From the first design conversation to weekly care, lighting, and irrigation,
          the website positions the business as a dependable one-stop partner.
        </p>
      </div>

      <div className="service-grid">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <article className="service-card" key={service.title}>
              <Icon className="service-icon" size={34} />
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function Portfolio() {
  return (
    <section id="portfolio" className="section alt">
      <div className="section-heading">
        <p className="eyebrow">Portfolio Preview</p>
        <h2>Show clients the result before they call.</h2>
        <p>
          Replace these sample images with your client’s real project photos when available.
          Real before-and-after photos will increase trust dramatically.
        </p>
      </div>

      <div className="portfolio-grid">
        {portfolio.map((item) => (
          <article className="portfolio-card" key={item.title}>
            <img src={item.image} alt={item.title} />
            <div className="portfolio-info">
              <span>{item.tag}</span>
              <h3>{item.title}</h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section split">
      <div>
        <p className="eyebrow">About the Company</p>
        <h2>A dedicated local crew with premium professional standards.</h2>
        <p>
          {business.name} helps local homeowners upgrade, protect, and enjoy their outdoor spaces. We built our reputation on dependable communication, immaculate project cleanups, and a deep understanding of unique regional soils and local water optimization guidelines.
        </p>
        <ul className="check-list">
          <li><CheckCircle size={18} /> Upfront transparent estimates & clear scheduling</li>
          <li><CheckCircle size={18} /> Respectful, quiet service at residential properties</li>
          <li><CheckCircle size={18} /> Expert solutions for SoCal drought compliance</li>
          <li><CheckCircle size={18} /> Flexible recurring maintenance plans available</li>
        </ul>
      </div>

      <div className="about-card">
        <div className="rating">
          {[1, 2, 3, 4, 5].map((n) => <Star key={n} size={18} fill="currentColor" />)}
        </div>
        <blockquote>
          “The response time was incredible for our irrigation repair, and they left the backyard cleaner than it was before they arrived. Highly recommend!”
        </blockquote>
        <p className="quote-author">Satisfied Local Homeowner</p>
      </div>
    </section>
  );
}


function Contact() {
  return (
    <section id="contact" className="section contact-section">
      <div className="contact-panel">
        <div>
          <p className="eyebrow">Get Started</p>
          <h2>Request a free estimate.</h2>
          <p>
            Tell us what you need help with. This form is ready for styling and can later be connected
            to Formspree, Netlify Forms, EmailJS, or a custom backend.
          </p>
          <div className="contact-details">
            <p><Phone size={18} /> {business.phone}</p>
            <p><Mail size={18} /> {business.email}</p>
            <p><MapPin size={18} /> {business.serviceArea}</p>
          </div>
        </div>

        <form className="quote-form" onSubmit={(e) => e.preventDefault()}>
          <label>
            Full Name
            <input type="text" placeholder="Your name" />
          </label>
          <label>
            Phone
            <input type="tel" placeholder="Your phone number" />
          </label>
          <label>
            Service Needed
            <select defaultValue="">
              <option value="" disabled>Select a service</option>
              <option>Landscape Consulting</option>
              <option>Maintenance</option>
              <option>Outdoor Lighting</option>
              <option>Irrigation System</option>
              <option>Other</option>
            </select>
          </label>
          <label>
            Message
            <textarea rows="4" placeholder="Briefly describe the project..." />
          </label>
          <button className="button primary full" type="submit">Submit Request</button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div>
        <strong>{business.name}</strong>
        <p>Landscaping consulting, maintenance, outdoor lighting, and irrigation systems.</p>
      </div>
      <p>© {new Date().getFullYear()} {business.name}. All rights reserved.</p>
    </footer>
  );
}

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
