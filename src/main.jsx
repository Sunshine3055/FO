 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/src/main.jsx b/src/main.jsx
index e357212908934192c37fad094437a863e45b8ff2..6262bb9b0e9ed6bb3c2e2b1085bdefa8121c4a4c 100644
--- a/src/main.jsx
+++ b/src/main.jsx
@@ -1,287 +1,502 @@
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
-  X
+  X,
+  ArrowRight,
+  CalendarDays,
+  ClipboardCheck,
+  Sparkles
 } from "lucide-react";
 import "./styles.css";
 
 const business = {
   name: "Florence Oasis LLC",
   phone: "(626) 512-0090",
   email: "florenceoasis25@gmail.com",
   serviceArea: "Irvine, Santa Ana, Lake Forest, Duarte & nearby communities"
 };
 
+const routes = {
+  home: "/",
+  services: "/services",
+  portfolio: "/portfolio",
+  about: "/about",
+  contact: "/contact"
+};
+
 const services = [
   {
     icon: Sprout,
     title: "Landscape Consulting & Design",
-    text: "Custom planting plans, outdoor layout guidance, curb appeal upgrades, and practical recommendations for your property."
+    slug: "design",
+    text: "Custom planting plans, outdoor layout guidance, curb appeal upgrades, and practical recommendations for your property.",
+    details: "We help you shape a clear plan before work begins, including plant palettes, layout priorities, water-smart recommendations, and phased improvement options.",
+    bullets: ["Planting concepts for sun, shade, and privacy", "Curb appeal refresh plans", "Budget-conscious project phasing"]
   },
   {
     icon: Leaf,
     title: "Landscape Maintenance",
-    text: "Routine yard care, pruning, edging, cleanup, mulch refresh, seasonal service, and detail-oriented property upkeep."
+    slug: "maintenance",
+    text: "Routine yard care, pruning, edging, cleanup, mulch refresh, seasonal service, and detail-oriented property upkeep.",
+    details: "Maintenance plans keep your yard clean, healthy, and presentable with dependable scheduling and a focus on thoughtful, careful workmanship.",
+    bullets: ["Weekly, bi-weekly, or seasonal service", "Pruning, edging, and cleanup", "Mulch refresh and garden detailing"]
   },
   {
     icon: Lightbulb,
     title: "Outdoor Lighting",
-    text: "Pathway lights, accent lighting, security lighting, low-voltage systems, and warm evening curb appeal."
+    slug: "lighting",
+    text: "Pathway lights, accent lighting, security lighting, low-voltage systems, and warm evening curb appeal.",
+    details: "Lighting upgrades make your home feel welcoming after sunset while improving visibility for walkways, entries, patios, and garden focal points.",
+    bullets: ["Pathway and entry lighting", "Accent lighting for trees and walls", "Low-voltage fixture planning"]
   },
   {
     icon: Droplets,
     title: "Irrigation Systems",
-    text: "Sprinkler service, drip irrigation, smart controllers, repairs, water-saving improvements, and system inspections."
+    slug: "irrigation",
+    text: "Sprinkler service, drip irrigation, smart controllers, repairs, water-saving improvements, and system inspections.",
+    details: "We inspect coverage, diagnose broken zones, suggest water-saving improvements, and tune irrigation so landscapes receive consistent care.",
+    bullets: ["Sprinkler and drip repairs", "Smart controller setup", "Coverage audits and leak checks"]
   },
   {
     icon: Hammer,
     title: "Hardscape Support",
-    text: "Walkway concepts, stone borders, small paver areas, garden edging, and installation coordination."
+    slug: "hardscape",
+    text: "Walkway concepts, stone borders, small paver areas, garden edging, and installation coordination.",
+    details: "Hardscape support adds structure to planting areas with clean edges, useful paths, and coordinated details that complete the landscape design.",
+    bullets: ["Garden edging and borders", "Small paver and pathway concepts", "Installation coordination support"]
   }
 ];
 
 const portfolio = [
   {
     title: "Front Yard Refresh",
     tag: "Design + Maintenance",
-    image: "https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&w=1200&q=80"
+    image: "https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&w=1200&q=80",
+    summary: "A curb appeal plan focused on layered planting, clean edging, mulch refresh, and a dependable maintenance schedule."
   },
   {
     title: "Evening Lighting Upgrade",
     tag: "Outdoor Lighting",
-    image: "https://images.unsplash.com/photo-1598902108854-10e335adac99?auto=format&fit=crop&w=1200&q=80"
+    image: "https://images.unsplash.com/photo-1598902108854-10e335adac99?auto=format&fit=crop&w=1200&q=80",
+    summary: "Warm pathway and accent lighting to highlight the home exterior and make outdoor areas easier to use after sunset."
   },
   {
     title: "Water-Smart Planting",
     tag: "Irrigation + Drought Care",
-    image: "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&w=1200&q=80"
+    image: "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&w=1200&q=80",
+    summary: "Planting and irrigation recommendations designed for Southern California heat, watering restrictions, and long-term resilience."
   }
 ];
 
-function Header() {
+function navigateTo(path) {
+  window.history.pushState({}, "", path);
+  window.dispatchEvent(new PopStateEvent("popstate"));
+  window.scrollTo({ top: 0, behavior: "smooth" });
+}
+
+function PageLink({ href, children, className, onNavigate, ...props }) {
+  return (
+    <a
+      className={className}
+      href={href}
+      {...props}
+      onClick={(event) => {
+        event.preventDefault();
+        onNavigate?.();
+        navigateTo(href);
+      }}
+    >
+      {children}
+    </a>
+  );
+}
+
+function Header({ currentPath }) {
   const [open, setOpen] = React.useState(false);
-  const links = ["Services", "Portfolio", "About", "Contact"];
+  const links = [
+    { label: "Services", href: routes.services },
+    { label: "Portfolio", href: routes.portfolio },
+    { label: "About", href: routes.about },
+    { label: "Contact", href: routes.contact }
+  ];
 
   return (
     <header className="site-header">
-      <a className="brand" href="#home" aria-label={`${business.name} home`}>
+      <PageLink className="brand" href={routes.home} aria-label={`${business.name} home`} onNavigate={() => setOpen(false)}>
         <span className="brand-mark"><Leaf size={22} /></span>
         <span>{business.name}</span>
-      </a>
+      </PageLink>
 
       <button className="menu-button" onClick={() => setOpen(!open)} aria-label="Toggle navigation">
         {open ? <X /> : <Menu />}
       </button>
 
       <nav className={open ? "nav open" : "nav"}>
         {links.map((link) => (
-          <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setOpen(false)}>
-            {link}
-          </a>
+          <PageLink
+            key={link.href}
+            href={link.href}
+            className={currentPath === link.href ? "active" : undefined}
+            onNavigate={() => setOpen(false)}
+          >
+            {link.label}
+          </PageLink>
         ))}
-        <a className="nav-cta" href="#contact" onClick={() => setOpen(false)}>Get Free Estimate</a>
+        <PageLink className="nav-cta" href={routes.contact} onNavigate={() => setOpen(false)}>Get Free Estimate</PageLink>
       </nav>
     </header>
   );
 }
 
 function Hero() {
   return (
-    <section id="home" className="hero">
-      <div className="hero-overlay" />
+    <section className="hero">
       <div className="hero-content">
         <p className="eyebrow">Maintenance • Irrigation • Plant Design • Lighting</p>
         <h1>Transform Your Property Into a Lush, Sustainable Oasis.</h1>
         <p className="hero-text">
           Premium landscaping, meticulous garden maintenance, and smart water-saving irrigation systems for residential properties throughout Orange County and the San Gabriel Valley.
         </p>
         <div className="hero-actions">
-          <a className="button primary" href="#contact">Request a Free Estimate</a>
-          <a className="button secondary" href="#services">View Services</a>
+          <PageLink className="button primary" href={routes.contact}>Request a Free Estimate</PageLink>
+          <PageLink className="button secondary" href={routes.services}>View Services</PageLink>
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
 
+function PageHero({ eyebrow, title, text }) {
+  return (
+    <section className="page-hero">
+      <p className="eyebrow">{eyebrow}</p>
+      <h1>{title}</h1>
+      <p>{text}</p>
+    </section>
+  );
+}
 
-function Services() {
+function ServicesPreview() {
   return (
-    <section id="services" className="section">
-      <div className="section-heading">
-        <p className="eyebrow">What We Do</p>
-        <h2>Complete outdoor service for every stage of your property.</h2>
-        <p>
-          From the first design conversation to weekly care, lighting, and irrigation,
-          the website positions the business as a dependable one-stop partner.
-        </p>
+    <section className="section">
+      <div className="section-heading with-action">
+        <div>
+          <p className="eyebrow">What We Do</p>
+          <h2>Complete outdoor service for every stage of your property.</h2>
+          <p>Each service card now links to a dedicated services page with more detail and a direct path to request an estimate.</p>
+        </div>
+        <PageLink className="text-link" href={routes.services}>Explore all services <ArrowRight size={18} /></PageLink>
       </div>
-
       <div className="service-grid">
-        {services.map((service) => {
-          const Icon = service.icon;
-          return (
-            <article className="service-card" key={service.title}>
-              <Icon className="service-icon" size={34} />
-              <h3>{service.title}</h3>
-              <p>{service.text}</p>
-            </article>
-          );
-        })}
+        {services.map((service) => <ServiceCard service={service} key={service.title} />)}
       </div>
     </section>
   );
 }
 
-function Portfolio() {
+function ServiceCard({ service, detailed = false }) {
+  const Icon = service.icon;
   return (
-    <section id="portfolio" className="section alt">
-      <div className="section-heading">
-        <p className="eyebrow">Portfolio Preview</p>
-        <h2>Show clients the result before they call.</h2>
-        <p>
-          Replace these sample images with your client’s real project photos when available.
-          Real before-and-after photos will increase trust dramatically.
-        </p>
-      </div>
+    <article className={detailed ? "service-card detailed" : "service-card"} id={service.slug}>
+      <Icon className="service-icon" size={34} />
+      <h3>{service.title}</h3>
+      <p>{detailed ? service.details : service.text}</p>
+      {detailed && (
+        <ul className="mini-list">
+          {service.bullets.map((bullet) => <li key={bullet}><CheckCircle size={16} /> {bullet}</li>)}
+        </ul>
+      )}
+      <PageLink className="card-link" href={routes.contact}>Request this service <ArrowRight size={16} /></PageLink>
+    </article>
+  );
+}
 
-      <div className="portfolio-grid">
-        {portfolio.map((item) => (
-          <article className="portfolio-card" key={item.title}>
-            <img src={item.image} alt={item.title} />
-            <div className="portfolio-info">
-              <span>{item.tag}</span>
-              <h3>{item.title}</h3>
-            </div>
-          </article>
-        ))}
+function PortfolioPreview() {
+  return (
+    <section className="section alt">
+      <div className="section-heading with-action">
+        <div>
+          <p className="eyebrow">Portfolio Preview</p>
+          <h2>Show clients the result before they call.</h2>
+          <p>Replace these sample images with real project photos when available. The portfolio page gives each project more room to explain the value.</p>
+        </div>
+        <PageLink className="text-link" href={routes.portfolio}>View portfolio <ArrowRight size={18} /></PageLink>
       </div>
+      <PortfolioGrid />
     </section>
   );
 }
 
-function About() {
+function PortfolioGrid({ expanded = false }) {
   return (
-    <section id="about" className="section split">
-      <div>
-        <p className="eyebrow">About the Company</p>
-        <h2>A dedicated local crew with premium professional standards.</h2>
-        <p>
-          {business.name} helps local homeowners upgrade, protect, and enjoy their outdoor spaces. We built our reputation on dependable communication, immaculate project cleanups, and a deep understanding of unique regional soils and local water optimization guidelines.
-        </p>
-        <ul className="check-list">
-          <li><CheckCircle size={18} /> Upfront transparent estimates & clear scheduling</li>
-          <li><CheckCircle size={18} /> Respectful, quiet service at residential properties</li>
-          <li><CheckCircle size={18} /> Expert solutions for SoCal drought compliance</li>
-          <li><CheckCircle size={18} /> Flexible recurring maintenance plans available</li>
-        </ul>
+    <div className={expanded ? "portfolio-grid expanded" : "portfolio-grid"}>
+      {portfolio.map((item) => (
+        <article className="portfolio-card" key={item.title}>
+          <img src={item.image} alt={item.title} />
+          <div className="portfolio-info">
+            <span>{item.tag}</span>
+            <h3>{item.title}</h3>
+            {expanded && <p>{item.summary}</p>}
+          </div>
+        </article>
+      ))}
+    </div>
+  );
+}
+
+function AboutSection() {
+  return (
+    <section className="section split">
+      <AboutCopy />
+      <TestimonialCard />
+    </section>
+  );
+}
+
+function AboutCopy() {
+  return (
+    <div>
+      <p className="eyebrow">About the Company</p>
+      <h2>A dedicated local crew with premium professional standards.</h2>
+      <p>
+        {business.name} helps local homeowners upgrade, protect, and enjoy their outdoor spaces. We built our reputation on dependable communication, immaculate project cleanups, and a deep understanding of unique regional soils and local water optimization guidelines.
+      </p>
+      <ul className="check-list">
+        <li><CheckCircle size={18} /> Upfront transparent estimates & clear scheduling</li>
+        <li><CheckCircle size={18} /> Respectful, quiet service at residential properties</li>
+        <li><CheckCircle size={18} /> Expert solutions for SoCal drought compliance</li>
+        <li><CheckCircle size={18} /> Flexible recurring maintenance plans available</li>
+      </ul>
+    </div>
+  );
+}
+
+function TestimonialCard() {
+  return (
+    <div className="about-card">
+      <div className="rating">
+        {[1, 2, 3, 4, 5].map((n) => <Star key={n} size={18} fill="currentColor" />)}
       </div>
+      <blockquote>
+        “The response time was incredible for our irrigation repair, and they left the backyard cleaner than it was before they arrived. Highly recommend!”
+      </blockquote>
+      <p className="quote-author">Satisfied Local Homeowner</p>
+    </div>
+  );
+}
 
-      <div className="about-card">
-        <div className="rating">
-          {[1, 2, 3, 4, 5].map((n) => <Star key={n} size={18} fill="currentColor" />)}
-        </div>
-        <blockquote>
-          “The response time was incredible for our irrigation repair, and they left the backyard cleaner than it was before they arrived. Highly recommend!”
-        </blockquote>
-        <p className="quote-author">Satisfied Local Homeowner</p>
+function ProcessSection() {
+  const steps = [
+    { icon: Phone, title: "Tell us what you need", text: "Share your service goals, preferred schedule, and property location." },
+    { icon: CalendarDays, title: "Schedule an estimate", text: "We review the site, answer questions, and confirm the best next step." },
+    { icon: ClipboardCheck, title: "Approve the plan", text: "You receive clear scope, priorities, and timing before work begins." },
+    { icon: Sparkles, title: "Enjoy the results", text: "Our crew completes the work cleanly and keeps your outdoor space maintained." }
+  ];
+
+  return (
+    <section className="section process-section">
+      <div className="section-heading">
+        <p className="eyebrow">Simple Process</p>
+        <h2>From first click to finished yard, every step is clear.</h2>
+      </div>
+      <div className="process-grid">
+        {steps.map((step) => {
+          const Icon = step.icon;
+          return (
+            <article className="process-card" key={step.title}>
+              <Icon size={28} />
+              <h3>{step.title}</h3>
+              <p>{step.text}</p>
+            </article>
+          );
+        })}
       </div>
     </section>
   );
 }
 
-
-function Contact() {
+function ContactSection() {
   return (
-    <section id="contact" className="section contact-section">
+    <section className="section contact-section">
       <div className="contact-panel">
         <div>
           <p className="eyebrow">Get Started</p>
           <h2>Request a free estimate.</h2>
           <p>
             Tell us what you need help with. This form is ready for styling and can later be connected
             to Formspree, Netlify Forms, EmailJS, or a custom backend.
           </p>
           <div className="contact-details">
-            <p><Phone size={18} /> {business.phone}</p>
-            <p><Mail size={18} /> {business.email}</p>
+            <p><Phone size={18} /> <a href={`tel:${business.phone.replace(/[^\d]/g, "")}`}>{business.phone}</a></p>
+            <p><Mail size={18} /> <a href={`mailto:${business.email}`}>{business.email}</a></p>
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
-              <option>Landscape Consulting</option>
-              <option>Maintenance</option>
-              <option>Outdoor Lighting</option>
-              <option>Irrigation System</option>
+              {services.map((service) => <option key={service.title}>{service.title}</option>)}
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
 
+function HomePage() {
+  return (
+    <>
+      <Hero />
+      <ServicesPreview />
+      <PortfolioPreview />
+      <AboutSection />
+      <ProcessSection />
+      <ContactSection />
+    </>
+  );
+}
+
+function ServicesPage() {
+  return (
+    <>
+      <PageHero eyebrow="Services" title="Choose the right outdoor service for your property." text="Detailed service pages make it easier for visitors to understand what you offer and take the next step from the section they care about most." />
+      <section className="section">
+        <div className="service-grid detailed-grid">
+          {services.map((service) => <ServiceCard service={service} detailed key={service.title} />)}
+        </div>
+      </section>
+      <ProcessSection />
+      <ContactSection />
+    </>
+  );
+}
+
+function PortfolioPage() {
+  return (
+    <>
+      <PageHero eyebrow="Portfolio" title="Project examples that help clients picture the possibilities." text="Use this page for project stories, before-and-after photos, and service tags that link visitors back to the estimate form." />
+      <section className="section alt"><PortfolioGrid expanded /></section>
+      <ContactSection />
+    </>
+  );
+}
+
+function AboutPage() {
+  return (
+    <>
+      <PageHero eyebrow="About" title="Local landscaping help built around trust, care, and clear communication." text="This page gives your company story its own home while keeping a strong path back to services and estimates." />
+      <AboutSection />
+      <ProcessSection />
+      <ContactSection />
+    </>
+  );
+}
+
+function ContactPage() {
+  return (
+    <>
+      <PageHero eyebrow="Contact" title="Tell us about your landscape project." text="Use the form, phone number, or email below to request a free estimate for maintenance, irrigation, lighting, design, or hardscape support." />
+      <ContactSection />
+    </>
+  );
+}
+
 function Footer() {
   return (
     <footer className="footer">
       <div>
         <strong>{business.name}</strong>
         <p>Landscaping consulting, maintenance, outdoor lighting, and irrigation systems.</p>
       </div>
+      <nav className="footer-links" aria-label="Footer navigation">
+        <PageLink href={routes.services}>Services</PageLink>
+        <PageLink href={routes.portfolio}>Portfolio</PageLink>
+        <PageLink href={routes.about}>About</PageLink>
+        <PageLink href={routes.contact}>Contact</PageLink>
+      </nav>
       <p>© {new Date().getFullYear()} {business.name}. All rights reserved.</p>
     </footer>
   );
 }
 
+function NotFoundPage() {
+  return (
+    <section className="section not-found">
+      <p className="eyebrow">Page not found</p>
+      <h1>Let’s get you back to the garden.</h1>
+      <p>The page you requested does not exist yet.</p>
+      <PageLink className="button primary" href={routes.home}>Return Home</PageLink>
+    </section>
+  );
+}
+
+function getPage(pathname) {
+  switch (pathname) {
+    case routes.home:
+      return <HomePage />;
+    case routes.services:
+      return <ServicesPage />;
+    case routes.portfolio:
+      return <PortfolioPage />;
+    case routes.about:
+      return <AboutPage />;
+    case routes.contact:
+      return <ContactPage />;
+    default:
+      return <NotFoundPage />;
+  }
+}
+
 function App() {
+  const [currentPath, setCurrentPath] = React.useState(window.location.pathname);
+
+  React.useEffect(() => {
+    const handlePopState = () => setCurrentPath(window.location.pathname);
+    window.addEventListener("popstate", handlePopState);
+    return () => window.removeEventListener("popstate", handlePopState);
+  }, []);
+
   return (
     <>
-      <Header />
-      <main>
-        <Hero />
-        <Services />
-        <Portfolio />
-        <About />
-        <Contact />
-      </main>
+      <Header currentPath={currentPath} />
+      <main>{getPage(currentPath)}</main>
       <Footer />
     </>
   );
 }
 
 createRoot(document.getElementById("root")).render(<App />);
 
EOF
)
