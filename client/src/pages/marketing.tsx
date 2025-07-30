import { useEffect, useState } from 'react';

export default function Marketing() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -10% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    setTimeout(() => {
      document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
      });
    }, 100);

    const handleSmoothScroll = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(target.getAttribute('href')!);
        if (targetElement) {
          const headerOffset = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
          setIsMenuOpen(false);
        }
      }
    };

    document.addEventListener('click', handleSmoothScroll);

    return () => {
      document.removeEventListener('click', handleSmoothScroll);
      observer.disconnect();
    };
  }, []);

  const openDemoModal = () => {
    setIsDemoModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeDemoModal = () => {
    setIsDemoModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="modern-website">
      {/* Modern Navigation */}
      <nav className="modern-navbar">
        <div className="nav-wrapper">
          <div className="nav-brand">
            <div className="brand-icon">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="brand-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{stopColor: "#6366f1", stopOpacity: 1}} />
                    <stop offset="50%" style={{stopColor: "#8b5cf6", stopOpacity: 1}} />
                    <stop offset="100%" style={{stopColor: "#d946ef", stopOpacity: 1}} />
                  </linearGradient>
                </defs>
                <circle cx="18" cy="18" r="16" fill="url(#brand-gradient)" opacity="0.15"/>
                <path d="M12 10 C8 10 6 14 6 18 C6 22 8 26 12 26 L12 22 C10 22 10 20 10 18 C10 16 10 14 12 14 L12 10 Z" fill="url(#brand-gradient)"/>
                <circle cx="22" cy="18" r="5" fill="url(#brand-gradient)"/>
                <path d="M19 18 L25 18 M22 15 L22 21" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="brand-name">Pulse HMS</span>
          </div>
          
          <div className={`nav-links ${isMenuOpen ? 'nav-links-open' : ''}`}>
            <a href="#home" className="nav-item">Home</a>
            <a href="#features" className="nav-item">Features</a>
            <a href="#solutions" className="nav-item">Solutions</a>
            <a href="#testimonials" className="nav-item">Reviews</a>
            <a href="#team" className="nav-item">Team</a>
          </div>
          
          <div className="nav-cta">
            <button className="btn-ghost">Sign In</button>
            <button className="btn-gradient" onClick={openDemoModal}>Book Demo</button>
          </div>
          
          <button 
            className={`mobile-menu-btn ${isMenuOpen ? 'menu-open' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero-modern">
        <div className="hero-grid">
          <div className="hero-content animate-on-scroll">
            <div className="hero-badge">
              <div className="badge-icon">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 0L9.5 5.5L15 4L11 8L15 12L9.5 10.5L8 16L6.5 10.5L1 12L5 8L1 4L6.5 5.5L8 0Z" fill="currentColor"/>
                </svg>
              </div>
              <span>Revolutionary AI Healthcare Platform</span>
            </div>
            
            <h1 className="hero-headline">
              The AI-Powered
              <br />
              <span className="text-gradient">Hospital Management</span>
              <br />
              System of the Future
            </h1>
            
            <p className="hero-subtitle">
              Transform your healthcare operations with intelligent automation, predictive analytics, 
              and seamless patient care workflows. Built by <strong>Team Legends</strong>.
            </p>
            
            <div className="hero-actions">
              <button className="btn-primary-large" onClick={openDemoModal}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M6.5 5.5L13.5 10L6.5 14.5V5.5Z" fill="currentColor"/>
                </svg>
                Watch Demo
              </button>
              <button className="btn-secondary-large">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2Z" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M7 10L9 12L13 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Get Started Free
              </button>
            </div>
            
            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-value">50+</div>
                <div className="stat-label">Healthcare Features</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">99.9%</div>
                <div className="stat-label">Uptime SLA</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">24/7</div>
                <div className="stat-label">AI Monitoring</div>
              </div>
            </div>
          </div>
          
          <div className="hero-visual animate-on-scroll">
            <div className="dashboard-preview">
              <div className="preview-header">
                <div className="preview-controls">
                  <div className="control-dot red"></div>
                  <div className="control-dot yellow"></div>
                  <div className="control-dot green"></div>
                </div>
                <div className="preview-title">Pulse HMS Dashboard</div>
                <div className="ai-status">
                  <div className="ai-indicator"></div>
                  <span>AI Active</span>
                </div>
              </div>
              <div className="preview-content">
                <div className="dashboard-ui">
                  <div className="ui-sidebar">
                    <div className="sidebar-item active"></div>
                    <div className="sidebar-item"></div>
                    <div className="sidebar-item"></div>
                    <div className="sidebar-item"></div>
                  </div>
                  <div className="ui-main">
                    <div className="ui-cards">
                      <div className="ui-card card-1"></div>
                      <div className="ui-card card-2"></div>
                      <div className="ui-card card-3"></div>
                    </div>
                    <div className="ui-chart">
                      <div className="chart-bar" style={{height: '60%'}}></div>
                      <div className="chart-bar" style={{height: '80%'}}></div>
                      <div className="chart-bar" style={{height: '45%'}}></div>
                      <div className="chart-bar" style={{height: '95%'}}></div>
                      <div className="chart-bar" style={{height: '70%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="floating-elements">
              <div className="float-card card-1">
                <div className="card-icon">📊</div>
                <div className="card-text">
                  <div className="card-title">Real-time Analytics</div>
                  <div className="card-subtitle">Live patient data</div>
                </div>
              </div>
              <div className="float-card card-2">
                <div className="card-icon">🤖</div>
                <div className="card-text">
                  <div className="card-title">AI Predictions</div>
                  <div className="card-subtitle">Smart insights</div>
                </div>
              </div>
              <div className="float-card card-3">
                <div className="card-icon">⚡</div>
                <div className="card-text">
                  <div className="card-title">Instant Alerts</div>
                  <div className="card-subtitle">Critical updates</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-modern">
        <div className="features-container">
          <div className="section-header animate-on-scroll">
            <h2 className="section-title">
              Intelligent Healthcare 
              <span className="text-gradient"> Automation</span>
            </h2>
            <p className="section-subtitle">
              Experience the power of AI-driven healthcare management that transforms every aspect of patient care.
            </p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card large-card animate-on-scroll">
              <div className="feature-icon">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M16 4C22.6274 4 28 9.37258 28 16C28 22.6274 22.6274 28 16 28C9.37258 28 4 22.6274 4 16C4 9.37258 9.37258 4 16 4Z" fill="url(#feature-gradient-1)" opacity="0.1"/>
                  <path d="M12 16L14.5 18.5L20 13" stroke="url(#feature-gradient-1)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <defs>
                    <linearGradient id="feature-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#6366f1"/>
                      <stop offset="100%" stopColor="#8b5cf6"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <h3>Smart Patient Registration</h3>
              <p>AI-powered intake system with automatic data validation, insurance verification, and intelligent form completion.</p>
              <div className="feature-visual">
                <div className="visual-element pulse-1"></div>
                <div className="visual-element pulse-2"></div>
                <div className="visual-element pulse-3"></div>
              </div>
            </div>

            <div className="feature-card animate-on-scroll">
              <div className="feature-icon">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <rect x="6" y="8" width="20" height="16" rx="2" stroke="url(#feature-gradient-2)" strokeWidth="2"/>
                  <path d="M6 12L16 18L26 12" stroke="url(#feature-gradient-2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <defs>
                    <linearGradient id="feature-gradient-2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#8b5cf6"/>
                      <stop offset="100%" stopColor="#d946ef"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <h3>Predictive Scheduling</h3>
              <p>Machine learning algorithms optimize appointment slots and resource allocation.</p>
            </div>

            <div className="feature-card animate-on-scroll">
              <div className="feature-icon">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M4 16L8 12L12 16L20 8L28 16" stroke="url(#feature-gradient-3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="8" cy="12" r="2" fill="url(#feature-gradient-3)"/>
                  <circle cx="20" cy="8" r="2" fill="url(#feature-gradient-3)"/>
                  <defs>
                    <linearGradient id="feature-gradient-3" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#d946ef"/>
                      <stop offset="100%" stopColor="#f97316"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <h3>Real-time Analytics</h3>
              <p>Live dashboards with actionable insights and automated reporting for better decisions.</p>
            </div>

            <div className="feature-card animate-on-scroll">
              <div className="feature-icon">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <rect x="6" y="6" width="20" height="20" rx="2" stroke="url(#feature-gradient-4)" strokeWidth="2"/>
                  <path d="M16 12V20M12 16H20" stroke="url(#feature-gradient-4)" strokeWidth="2" strokeLinecap="round"/>
                  <defs>
                    <linearGradient id="feature-gradient-4" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f97316"/>
                      <stop offset="100%" stopColor="#6366f1"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <h3>Automated Workflows</h3>
              <p>Streamline clinical processes with intelligent automation and compliance tracking.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="solutions-modern">
        <div className="solutions-container">
          <div className="section-header animate-on-scroll">
            <h2 className="section-title">
              Built for Every
              <span className="text-gradient"> Healthcare Setting</span>
            </h2>
            <p className="section-subtitle">
              From small clinics to large hospital systems, Pulse HMS scales to meet your unique needs.
            </p>
          </div>
          
          <div className="solutions-grid">
            <div className="solution-card animate-on-scroll">
              <div className="solution-image">
                <img src="https://images.unsplash.com/photo-1551190822-a9333d879b1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Large Hospital" />
                <div className="solution-overlay">
                  <div className="solution-icon">🏥</div>
                </div>
              </div>
              <div className="solution-content">
                <h3>Large Hospital Systems</h3>
                <ul>
                  <li>Multi-department coordination</li>
                  <li>Complex patient workflows</li>
                  <li>Enterprise-grade security</li>
                  <li>Advanced reporting suite</li>
                </ul>
              </div>
            </div>

            <div className="solution-card animate-on-scroll">
              <div className="solution-image">
                <img src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Specialty Clinic" />
                <div className="solution-overlay">
                  <div className="solution-icon">🏢</div>
                </div>
              </div>
              <div className="solution-content">
                <h3>Specialty Clinics</h3>
                <ul>
                  <li>Specialized treatment workflows</li>
                  <li>Custom reporting dashboards</li>
                  <li>Patient follow-up automation</li>
                  <li>Integration with existing systems</li>
                </ul>
              </div>
            </div>

            <div className="solution-card animate-on-scroll">
              <div className="solution-image">
                <img src="https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Laboratory" />
                <div className="solution-overlay">
                  <div className="solution-icon">🔬</div>
                </div>
              </div>
              <div className="solution-content">
                <h3>Laboratory Management</h3>
                <ul>
                  <li>AI-powered result analysis</li>
                  <li>Quality control automation</li>
                  <li>Real-time reporting</li>
                  <li>Sample tracking system</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials-modern">
        <div className="testimonials-container">
          <div className="section-header animate-on-scroll">
            <h2 className="section-title">
              Trusted by Healthcare
              <span className="text-gradient"> Leaders Worldwide</span>
            </h2>
            <p className="section-subtitle">
              See how Pulse HMS has transformed healthcare operations and improved patient outcomes.
            </p>
          </div>
          
          <div className="testimonials-grid">
            <div className="testimonial-card animate-on-scroll">
              <div className="testimonial-content">
                <div className="quote-icon">"</div>
                <p>Pulse HMS reduced our patient wait times by 40% and improved our operational efficiency dramatically. The AI insights are truly game-changing for our hospital.</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">
                  <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" alt="Dr. Sarah Johnson" />
                </div>
                <div className="author-info">
                  <h4>Dr. Sarah Johnson</h4>
                  <p>Chief Medical Officer</p>
                  <span>Metro General Hospital</span>
                </div>
              </div>
              <div className="testimonial-stats">
                <div className="stat">
                  <div className="stat-number">40%</div>
                  <div className="stat-label">Faster Processing</div>
                </div>
                <div className="stat">
                  <div className="stat-number">60%</div>
                  <div className="stat-label">Less Admin Work</div>
                </div>
              </div>
            </div>

            <div className="testimonial-card animate-on-scroll">
              <div className="testimonial-content">
                <div className="quote-icon">"</div>
                <p>The AI-powered analytics have given us unprecedented insights into patient care patterns. Our quality scores have never been higher since implementing Pulse HMS.</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">
                  <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" alt="Michael Chen" />
                </div>
                <div className="author-info">
                  <h4>Michael Chen</h4>
                  <p>Hospital Administrator</p>
                  <span>Regional Medical Center</span>
                </div>
              </div>
              <div className="testimonial-stats">
                <div className="stat">
                  <div className="stat-number">25%</div>
                  <div className="stat-label">Quality Improvement</div>
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
      <section id="team" className="team-modern">
        <div className="team-container">
          <div className="section-header animate-on-scroll">
            <h2 className="section-title">
              Meet Team
              <span className="text-gradient"> Legends</span>
            </h2>
            <p className="section-subtitle">
              The visionary minds behind the future of healthcare technology.
            </p>
          </div>
          
          <div className="team-grid">
            <div className="team-card featured animate-on-scroll">
              <div className="team-image">
                <div className="avatar-placeholder">
                  <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                    <circle cx="40" cy="40" r="38" fill="url(#team-gradient)" opacity="0.1"/>
                    <circle cx="40" cy="32" r="12" fill="url(#team-gradient)" opacity="0.8"/>
                    <path d="M20 68C20 58 28 50 40 50C52 50 60 58 60 68" fill="url(#team-gradient)" opacity="0.8"/>
                    <defs>
                      <linearGradient id="team-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#6366f1"/>
                        <stop offset="100%" stopColor="#d946ef"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div className="founder-badge">Founder</div>
              </div>
              <div className="team-info">
                <h3>@Moeed ul Hassan</h3>
                <p className="team-role">Founder & Chief Innovation Officer</p>
                <p className="team-bio">
                  Visionary healthcare technologist with 15+ years of experience in AI and medical systems. 
                  Leading the revolution in intelligent healthcare management solutions.
                </p>
                <div className="team-social">
                  <a href="#" className="social-btn">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" fill="currentColor"/>
                    </svg>
                  </a>
                  <a href="#" className="social-btn">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M20 3.924a8.153 8.153 0 01-2.357.646 4.115 4.115 0 001.804-2.27 8.242 8.242 0 01-2.605.996A4.107 4.107 0 0013.85 2c-2.266 0-4.103 1.837-4.103 4.103 0 .322.036.635.106.935C6.44 6.89 3.416 5.267 1.392 2.755a4.073 4.073 0 00-.555 2.062c0 1.424.724 2.679 1.825 3.415a4.093 4.093 0 01-1.859-.514v.052c0 1.988 1.414 3.647 3.292 4.023a4.128 4.128 0 01-1.853.07c.522 1.63 2.038 2.816 3.833 2.85A8.239 8.239 0 011 16.158a11.611 11.611 0 006.29 1.843c7.547 0 11.675-6.252 11.675-11.675 0-.178-.004-.355-.012-.531A8.348 8.348 0 0020 3.924z" fill="currentColor"/>
                    </svg>
                  </a>
                  <a href="#" className="social-btn">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path fillRule="evenodd" clipRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" fill="currentColor"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-modern">
        <div className="cta-container animate-on-scroll">
          <div className="cta-content">
            <h2>Ready to Transform Your Healthcare Operations?</h2>
            <p>Join thousands of healthcare providers already using Pulse HMS to deliver better patient care.</p>
            <div className="cta-actions">
              <button className="btn-primary-large" onClick={openDemoModal}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M6.5 5.5L13.5 10L6.5 14.5V5.5Z" fill="currentColor"/>
                </svg>
                Watch Demo
              </button>
              <button className="btn-secondary-large">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Schedule Call
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-modern">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="brand-logo">
                <div className="brand-icon">
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="footer-brand-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{stopColor: "#6366f1", stopOpacity: 1}} />
                        <stop offset="50%" style={{stopColor: "#8b5cf6", stopOpacity: 1}} />
                        <stop offset="100%" style={{stopColor: "#d946ef", stopOpacity: 1}} />
                      </linearGradient>
                    </defs>
                    <circle cx="18" cy="18" r="16" fill="url(#footer-brand-gradient)" opacity="0.15"/>
                    <path d="M12 10 C8 10 6 14 6 18 C6 22 8 26 12 26 L12 22 C10 22 10 20 10 18 C10 16 10 14 12 14 L12 10 Z" fill="url(#footer-brand-gradient)"/>
                    <circle cx="22" cy="18" r="5" fill="url(#footer-brand-gradient)"/>
                    <path d="M19 18 L25 18 M22 15 L22 21" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <span className="brand-name">Pulse HMS</span>
              </div>
              <p className="brand-description">
                The future of healthcare management. Intelligent, automated, and built for the modern healthcare landscape.
              </p>
              <div className="team-credits">
                <p>Built with ❤️ by <strong>Team Legends</strong></p>
                <p>Founded by <strong>@Moeed ul Hassan</strong></p>
              </div>
            </div>
            
            <div className="footer-links">
              <div className="footer-column">
                <h4>Product</h4>
                <a href="#features">Features</a>
                <a href="#solutions">Solutions</a>
                <a href="#">Pricing</a>
                <a href="#">Updates</a>
              </div>
              <div className="footer-column">
                <h4>Company</h4>
                <a href="#team">Team</a>
                <a href="#testimonials">Customers</a>
                <a href="#">Careers</a>
                <a href="#">Contact</a>
              </div>
              <div className="footer-column">
                <h4>Resources</h4>
                <a href="#">Documentation</a>
                <a href="#">Support</a>
                <a href="#">API</a>
                <a href="#">Status</a>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; 2024 Pulse HMS by Team Legends. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Demo Modal */}
      {isDemoModalOpen && (
        <div className="modal-overlay" onClick={closeDemoModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={closeDemoModal}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
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
      )}
    </div>
  );
}