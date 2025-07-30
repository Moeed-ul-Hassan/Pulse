import { useEffect } from 'react';

// Marketing landing page component
export default function Marketing() {
  useEffect(() => {
    // Initialize smooth scrolling and animations
    const handleSmoothScroll = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(target.getAttribute('href')!);
        if (targetElement) {
          const headerOffset = 70;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    };

    // Mobile navigation toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    const toggleNav = () => {
      navMenu?.classList.toggle('active');
      hamburger?.classList.toggle('active');
    };

    // Scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observe all animatable elements
    document.querySelectorAll('.step, .use-case-card, .testimonial-card, .team-member').forEach(el => {
      observer.observe(el);
    });

    // Modal functionality
    const openDemoModal = () => {
      const modal = document.getElementById('demo-modal');
      modal?.classList.add('active');
      document.body.style.overflow = 'hidden';
    };

    const closeDemoModal = () => {
      const modal = document.getElementById('demo-modal');
      modal?.classList.remove('active');
      document.body.style.overflow = 'auto';
      
      // Stop video
      const iframe = modal?.querySelector('iframe') as HTMLIFrameElement;
      if (iframe) {
        iframe.src = iframe.src;
      }
    };

    // Event listeners
    document.addEventListener('click', handleSmoothScroll);
    hamburger?.addEventListener('click', toggleNav);
    document.getElementById('watch-demo-btn')?.addEventListener('click', openDemoModal);
    document.getElementById('demo-modal')?.addEventListener('click', (e) => {
      if (e.target === e.currentTarget) closeDemoModal();
    });
    document.querySelector('.modal-close')?.addEventListener('click', closeDemoModal);

    // Cleanup
    return () => {
      document.removeEventListener('click', handleSmoothScroll);
      hamburger?.removeEventListener('click', toggleNav);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="marketing-website">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <div className="logo-svg">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{stopColor: "#4a9eff", stopOpacity: 1}} />
                    <stop offset="100%" style={{stopColor: "#357abd", stopOpacity: 1}} />
                  </linearGradient>
                </defs>
                <circle cx="16" cy="16" r="14" fill="url(#logo-gradient)" opacity="0.2"/>
                <path d="M12 8 C8 8 6 12 6 16 C6 20 8 24 12 24 L12 20 C10 20 10 18 10 16 C10 14 10 12 12 12 L12 8 Z" fill="url(#logo-gradient)"/>
                <circle cx="20" cy="16" r="4" fill="url(#logo-gradient)"/>
                <path d="M18 16 L22 16 M20 14 L20 18" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="logo-text">Pulse</span>
          </div>
          <div className="nav-menu" id="nav-menu">
            <a href="#home" className="nav-link">Home</a>
            <a href="#features" className="nav-link">Features</a>
            <a href="#use-cases" className="nav-link">Use Cases</a>
            <a href="#customers" className="nav-link">Customers</a>
            <a href="#team" className="nav-link">Team</a>
            <a href="#contact" className="nav-link">Contact</a>
          </div>
          <div className="nav-actions">
            <button className="btn-secondary">Login</button>
            <button className="btn-primary">Get Started</button>
          </div>
          <div className="hamburger" id="hamburger">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-background">
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
          <div className="gradient-orb orb-3"></div>
        </div>
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <i className="fas fa-star"></i>
              <span>The Future of Healthcare Management</span>
            </div>
            <h1 className="hero-title">
              Pulse, the AI <br />
              <span className="gradient-text">Hospital Management System</span>
            </h1>
            <p className="hero-description">
              Revolutionize your healthcare operations with AI-powered patient management, 
              intelligent workflows, and advanced analytics. The first HMS that truly understands healthcare.
            </p>
            <div className="hero-actions">
              <button className="btn-primary btn-large" id="watch-demo-btn">
                <i className="fas fa-play"></i>
                Watch Demo
              </button>
              <button className="btn-secondary btn-large">
                <i className="fas fa-calendar"></i>
                Schedule Consultation
              </button>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <div className="stat-number">50+</div>
                <div className="stat-label">Healthcare Features</div>
              </div>
              <div className="stat">
                <div className="stat-number">99.9%</div>
                <div className="stat-label">System Uptime</div>
              </div>
              <div className="stat">
                <div className="stat-number">24/7</div>
                <div className="stat-label">AI Monitoring</div>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="dashboard-mockup">
              <div className="mockup-header">
                <div className="mockup-controls">
                  <span className="control red"></span>
                  <span className="control yellow"></span>
                  <span className="control green"></span>
                </div>
                <div className="mockup-title">Pulse HMS Dashboard</div>
              </div>
              <div className="mockup-content">
                <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Hospital Technology Dashboard" className="dashboard-image" />
                <div className="overlay-elements">
                  <div className="ai-indicator">
                    <div className="ai-pulse"></div>
                    <span>AI Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section id="features" className="workflow">
        <div className="container">
          <div className="section-header">
            <h2>How Pulse HMS Works</h2>
            <p>From patient registration to discharge, Pulse handles your entire healthcare workflow with AI precision.</p>
          </div>
          <div className="workflow-steps">
            <div className="step" data-step="1">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Patient Registration</h3>
                <p>AI-powered patient intake with automatic data validation and insurance verification</p>
                <div className="step-visual">
                  <img src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Healthcare Professional Using Digital System" />
                </div>
              </div>
            </div>
            <div className="step" data-step="2">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Smart Scheduling</h3>
                <p>Intelligent appointment scheduling with AI-optimized resource allocation and queue management</p>
                <div className="step-visual">
                  <img src="https://images.unsplash.com/photo-1551190822-a9333d879b1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Medical AI Interface" />
                </div>
              </div>
            </div>
            <div className="step" data-step="3">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Clinical Analytics</h3>
                <p>Real-time health monitoring with AI-generated insights and predictive analytics</p>
                <div className="step-visual">
                  <img src="https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Hospital Technology Dashboard" />
                </div>
              </div>
            </div>
            <div className="step" data-step="4">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Automated Reporting</h3>
                <p>Comprehensive reporting and compliance tracking with automated audit trails</p>
                <div className="step-visual">
                  <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Healthcare Analytics Dashboard" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section id="use-cases" className="use-cases">
        <div className="container">
          <div className="section-header">
            <h2>Use Cases</h2>
            <p>From small clinics to large hospital systems, Pulse HMS adapts to your healthcare needs.</p>
          </div>
          <div className="use-cases-grid">
            <div className="use-case-card">
              <div className="card-icon">
                <i className="fas fa-hospital"></i>
              </div>
              <h3>Large Hospital Systems</h3>
              <ul>
                <li>Multi-department coordination</li>
                <li>Complex patient workflows</li>
                <li>Enterprise-grade security</li>
              </ul>
              <img src="https://images.unsplash.com/photo-1551190822-a9333d879b1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Hospital System" />
            </div>
            <div className="use-case-card">
              <div className="card-icon">
                <i className="fas fa-clinic-medical"></i>
              </div>
              <h3>Specialty Clinics</h3>
              <ul>
                <li>Specialized treatment workflows</li>
                <li>Custom reporting dashboards</li>
                <li>Patient follow-up automation</li>
              </ul>
              <img src="https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Medical Clinic" />
            </div>
            <div className="use-case-card">
              <div className="card-icon">
                <i className="fas fa-microscope"></i>
              </div>
              <h3>Laboratory Management</h3>
              <ul>
                <li>AI-powered result analysis</li>
                <li>Quality control automation</li>
                <li>Real-time reporting</li>
              </ul>
              <img src="https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Medical Laboratory" />
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section id="customers" className="testimonials">
        <div className="container">
          <div className="section-header">
            <h2>Trusted by Healthcare Leaders</h2>
            <p>See how Pulse HMS has transformed healthcare operations worldwide.</p>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"Pulse HMS reduced our patient wait times by 40% and improved our operational efficiency dramatically. The AI insights are game-changing."</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">
                  <i className="fas fa-user-md"></i>
                </div>
                <div className="author-info">
                  <div className="author-name">Dr. Sarah Johnson</div>
                  <div className="author-title">Chief Medical Officer, Metro General Hospital</div>
                </div>
              </div>
              <div className="testimonial-stats">
                <div className="stat">
                  <div className="stat-number">40%</div>
                  <div className="stat-label">Faster Patient Processing</div>
                </div>
                <div className="stat">
                  <div className="stat-number">60%</div>
                  <div className="stat-label">Reduced Administrative Work</div>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"The AI-powered analytics have given us unprecedented insights into patient care patterns. Our quality scores have never been higher."</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">
                  <i className="fas fa-user-tie"></i>
                </div>
                <div className="author-info">
                  <div className="author-name">Michael Chen</div>
                  <div className="author-title">Hospital Administrator, Regional Medical Center</div>
                </div>
              </div>
              <div className="testimonial-stats">
                <div className="stat">
                  <div className="stat-number">25%</div>
                  <div className="stat-label">Improved Quality Scores</div>
                </div>
                <div className="stat">
                  <div className="stat-number">90%</div>
                  <div className="stat-label">Staff Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="team">
        <div className="container">
          <div className="section-header">
            <h2>Meet the Team Legends</h2>
            <p>The visionary minds behind Pulse HMS innovation.</p>
          </div>
          <div className="team-grid">
            <div className="team-member featured">
              <div className="member-avatar">
                <div className="avatar-placeholder">
                  <i className="fas fa-user-circle"></i>
                </div>
                <div className="member-badge">Founder</div>
              </div>
              <div className="member-info">
                <h3>@Moeed ul Hassan</h3>
                <p className="member-title">Founder & Chief Innovation Officer</p>
                <p className="member-description">
                  Visionary healthcare technologist with 15+ years of experience in AI and medical systems. 
                  Leading the revolution in intelligent healthcare management.
                </p>
                <div className="member-social">
                  <a href="#" className="social-link"><i className="fab fa-linkedin"></i></a>
                  <a href="#" className="social-link"><i className="fab fa-twitter"></i></a>
                  <a href="#" className="social-link"><i className="fab fa-github"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <div className="section-header">
            <h2>Ready to Transform Your Healthcare Operations?</h2>
            <p>Get in touch with our team to learn how Pulse HMS can revolutionize your healthcare management.</p>
          </div>
          <div className="contact-content">
            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fas fa-envelope"></i>
                </div>
                <div className="contact-details">
                  <h4>Email Us</h4>
                  <p>hello@pulsehms.ai</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fas fa-phone"></i>
                </div>
                <div className="contact-details">
                  <h4>Call Us</h4>
                  <p>+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div className="contact-details">
                  <h4>Visit Us</h4>
                  <p>Healthcare Innovation Center<br />San Francisco, CA</p>
                </div>
              </div>
            </div>
            <form className="contact-form">
              <div className="form-group">
                <input type="text" placeholder="Your Name" required />
              </div>
              <div className="form-group">
                <input type="email" placeholder="Your Email" required />
              </div>
              <div className="form-group">
                <input type="text" placeholder="Organization" />
              </div>
              <div className="form-group">
                <textarea placeholder="Tell us about your healthcare management needs..." rows={5} required></textarea>
              </div>
              <button type="submit" className="btn-primary btn-large">
                <i className="fas fa-paper-plane"></i>
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="footer-logo">
                <div className="logo-svg">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="footer-logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{stopColor: "#4a9eff", stopOpacity: 1}} />
                        <stop offset="100%" style={{stopColor: "#357abd", stopOpacity: 1}} />
                      </linearGradient>
                    </defs>
                    <circle cx="16" cy="16" r="14" fill="url(#footer-logo-gradient)" opacity="0.2"/>
                    <path d="M12 8 C8 8 6 12 6 16 C6 20 8 24 12 24 L12 20 C10 20 10 18 10 16 C10 14 10 12 12 12 L12 8 Z" fill="url(#footer-logo-gradient)"/>
                    <circle cx="20" cy="16" r="4" fill="url(#footer-logo-gradient)"/>
                    <path d="M18 16 L22 16 M20 14 L20 18" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <span className="logo-text">Pulse HMS</span>
              </div>
              <p>Revolutionizing healthcare management with AI-powered solutions.</p>
              <div className="team-credit">
                <p>Built with ❤️ by <strong>Team Legends</strong></p>
                <p>Founded by <strong>@Moeed ul Hassan</strong></p>
              </div>
            </div>
            <div className="footer-links">
              <div className="footer-column">
                <h4>Product</h4>
                <a href="#features">Features</a>
                <a href="#use-cases">Use Cases</a>
                <a href="#customers">Customers</a>
              </div>
              <div className="footer-column">
                <h4>Company</h4>
                <a href="#team">Team</a>
                <a href="#contact">Contact</a>
                <a href="#">Privacy Policy</a>
              </div>
              <div className="footer-column">
                <h4>Resources</h4>
                <a href="#">Documentation</a>
                <a href="#">Support</a>
                <a href="#">API</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Pulse HMS by Team Legends. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Demo Modal */}
      <div id="demo-modal" className="modal">
        <div className="modal-content">
          <button className="modal-close">&times;</button>
          <div className="modal-header">
            <h3>Pulse HMS Demo</h3>
            <p>See how Pulse HMS transforms healthcare management</p>
          </div>
          <div className="modal-video">
            <iframe 
              src="https://www.loom.com/embed/9c0ec4c1a8a84f8b9a93ff0b5c9c5e1a?sid=a1b2c3d4-e5f6-7890-abcd-ef1234567890" 
              frameBorder="0" 
              allowFullScreen
              title="Pulse HMS Demo Video"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}